from __future__ import annotations

import ast
import textwrap
from typing import Any

from app.models import TestCase, TestCaseResult, TestRunResponse


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


def run_tests(code: str, function_name: str, test_cases: list[TestCase]) -> TestRunResponse:
    # Normalize indentation
    code = textwrap.dedent(code)
    # Remove any leading/trailing blank lines
    code = code.strip()
    ns: dict[str, Any] = {}
    try:
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

    results: list[TestCaseResult] = []
    passed = 0

    for i, tc in enumerate(test_cases, start=1):
        actual_str = ""
        err: str | None = None
        ok = False
        try:
            expr = f"{function_name}({tc.args})"
            result = eval(expr, ns, ns)
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

