from __future__ import annotations

import ast
import io
import sys
import textwrap
import threading
from typing import Any, Optional

from app.models import TestCase, TestCaseResult, TestRunResponse

BOILERPLATE = """
from typing import List, Optional, Dict, Tuple
from collections import defaultdict, deque
import heapq
import math

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    def __repr__(self):
        return f"ListNode({self.val})"

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    def __repr__(self):
        return f"TreeNode({self.val})"

class Node:
    def __init__(self, val=0, neighbors=None, next=None, random=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
        self.next = next
        self.random = random
"""


def normalize_output(val: str) -> str:
    val = val.strip().lower()
    val = val.replace(" ", "")
    return val


def _try_parse_literal(s: str) -> Any:
    try:
        return ast.literal_eval(s)
    except Exception:
        return None


def outputs_match(actual: str, expected: str) -> bool:
    a_str = normalize_output(str(actual))
    e_str = normalize_output(expected)
    if a_str == e_str:
        return True
    try:
        a_parsed = ast.literal_eval(str(actual))
        e_parsed = ast.literal_eval(expected)

        # Both are lists of lists — sort inner lists then sort outer list
        # for order-independent comparison.
        if isinstance(a_parsed, list) and isinstance(e_parsed, list):
            if all(isinstance(x, list) for x in a_parsed) and all(isinstance(x, list) for x in e_parsed):
                a_sorted = sorted([sorted(str(i) for i in inner) for inner in a_parsed])
                e_sorted = sorted([sorted(str(i) for i in inner) for inner in e_parsed])
                return a_sorted == e_sorted
            # Flat lists — sort and compare
            return sorted(str(x) for x in a_parsed) == sorted(str(x) for x in e_parsed)

        # Float comparison
        if isinstance(a_parsed, float) or isinstance(e_parsed, float):
            return abs(float(str(actual)) - float(expected)) < 0.001

    except Exception:
        pass
    return False


def _exec_with_timeout_tracer(
    boilerplate: str,
    code: str,
    ns: dict[str, Any],
    timeout: int,
) -> None:
    """Run exec phase with tracer + Timer, same pattern as tracer.trace_code."""
    timeout_event = threading.Event()

    def on_timeout() -> None:
        timeout_event.set()

    timer: Optional[threading.Timer] = None

    def line_tracer(frame: Any, event: str, arg: Any) -> Any:
        if event != "line":
            return line_tracer
        if timeout_event.is_set():
            raise TimeoutError(f"Execution exceeded timeout of {timeout} seconds")
        if frame.f_code.co_filename != "<string>":
            return line_tracer
        return line_tracer

    try:
        sys.settrace(line_tracer)
        timer = threading.Timer(float(timeout), on_timeout)
        timer.start()
        exec(boilerplate, ns, ns)
        exec(code, ns, ns)
    finally:
        if timer is not None:
            timer.cancel()
        sys.settrace(None)


def run_tests(
    code: str,
    function_name: str,
    test_cases: list[TestCase],
    timeout: int | None = None,
) -> TestRunResponse:
    # Normalize indentation
    code = textwrap.dedent(code)
    # Remove any leading/trailing blank lines
    code = code.strip()

    ns: dict[str, Any] = {}
    old_stdout = sys.stdout
    captured = io.StringIO()
    sys.stdout = captured
    try:
        if timeout is not None:
            _exec_with_timeout_tracer(BOILERPLATE, code, ns, timeout)
        else:
            exec(BOILERPLATE, ns, ns)
            exec(code, ns, ns)
    except IndentationError as e:
        results = [
            TestCaseResult(
                case_number=i + 1,
                args=tc.args,
                expected=tc.expected,
                actual="",
                passed=False,
                error=f"IndentationError: {str(e)}",
            )
            for i, tc in enumerate(test_cases)
        ]
        return TestRunResponse(
            results=results,
            passed=0,
            total=len(test_cases),
            all_passed=False,
        )
    except TimeoutError as e:
        results = [
            TestCaseResult(
                case_number=i + 1,
                args=tc.args,
                expected=tc.expected,
                actual="",
                passed=False,
                error=str(e),
            )
            for i, tc in enumerate(test_cases)
        ]
        return TestRunResponse(
            results=results,
            passed=0,
            total=len(test_cases),
            all_passed=False,
        )
    except SystemExit:
        pass  # ignore sys.exit() calls in solutions
    except Exception:
        pass
    finally:
        sys.stdout = old_stdout

    results: list[TestCaseResult] = []
    passed = 0

    design_problem_classes = {
        "MinStack",
        "LRUCache",
        "TimeMap",
        "Twitter",
        "MedianFinder",
        "KthLargest",
        "Trie",
        "WordDictionary",
        "DetectSquares",
        "Codec",
    }

    is_solution_class = "class Solution" in code
    is_design_problem = any((f"class {name}" in code) for name in design_problem_classes)

    sol = None
    if is_solution_class and "Solution" in ns:
        try:
            sol = ns["Solution"]()
        except Exception:
            sol = None

    for i, tc in enumerate(test_cases, start=1):
        actual_str = ""
        err: str | None = None
        ok = False
        try:
            if tc.expected.strip().lower() == "design":
                # "design" means: just verify the call doesn't throw.
                if is_design_problem:
                    actual_str = "No error"
                    err = "Design problem — test via Run & Visualize"
                    ok = True
                elif is_solution_class and sol is not None:
                    try:
                        parsed = ast.literal_eval(f"({tc.args},)")
                        getattr(sol, function_name)(*parsed)
                    except Exception:
                        eval(f"sol.{function_name}({tc.args})", {"sol": sol, **ns}, ns)
                    actual_str = "No error"
                    ok = True
                else:
                    try:
                        parsed = ast.literal_eval(f"({tc.args},)")
                        ns[function_name](*parsed)
                    except Exception:
                        eval(f"{function_name}({tc.args})", ns, ns)
                    actual_str = "No error"
                    ok = True
            elif is_design_problem:
                actual_str = "N/A"
                err = "Design problem — test via Run & Visualize"
                ok = True
            elif is_solution_class and sol is not None:
                try:
                    parsed = ast.literal_eval(f"({tc.args},)")
                    result = getattr(sol, function_name)(*parsed)
                except Exception:
                    result = eval(f"sol.{function_name}({tc.args})", {"sol": sol, **ns}, ns)
                actual_str = str(result)
                ok = outputs_match(actual_str, tc.expected)
            else:
                try:
                    parsed = ast.literal_eval(f"({tc.args},)")
                    result = ns[function_name](*parsed)
                except Exception:
                    result = eval(f"{function_name}({tc.args})", ns, ns)
                actual_str = str(result)
                ok = outputs_match(actual_str, tc.expected)
        except Exception as e:
            err = str(e)
            actual_str = ""
            ok = False

        if ok:
            passed += 1

        results.append(
            TestCaseResult(
                case_number=i,
                args=tc.args,
                expected=tc.expected,
                actual=actual_str,
                passed=ok,
                error=err,
            )
        )

    total = len(test_cases)
    return TestRunResponse(results=results, passed=passed, total=total, all_passed=(passed == total))

