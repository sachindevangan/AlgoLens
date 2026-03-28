"""
AlgoLens QA Check — All 150 NeetCode Problems

Usage:
  cd backend/scripts
  python qa_check.py

Outputs:
  - One line per problem as it runs (PASS/FAIL + issues), flushed for real-time logs
  - `qa_report.json` with full details

Options:
  - `--run-tests` — execute solutions against test cases (slower)
"""

from __future__ import annotations

import json
import os
import sys
import threading
from typing import Any, Callable

from problem_data import PROBLEMS
from solutions_data import SOLUTIONS

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.models import TestCase  # noqa: E402
from app.test_runner import run_tests  # noqa: E402

PROBLEM_CHECK_TIMEOUT_SEC = 5


def run_with_timeout(
    func: Callable[..., Any],
    args: tuple[Any, ...] = (),
    kwargs: dict[str, Any] | None = None,
    timeout: float = PROBLEM_CHECK_TIMEOUT_SEC,
) -> tuple[Any, str | None]:
    """Run func in a daemon thread; return (result, None) or (None, error_message)."""
    kwargs = kwargs or {}
    result: list[Any | None] = [None]
    error: list[str | None] = [None]

    def target() -> None:
        try:
            result[0] = func(*args, **kwargs)
        except BaseException as e:
            error[0] = f"{type(e).__name__}: {e}"

    thread = threading.Thread(target=target, daemon=True)
    thread.start()
    thread.join(timeout)

    if thread.is_alive():
        return None, f"TIMEOUT after {timeout}s"
    if error[0] is not None:
        return None, error[0]
    return result[0], None


RESULTS: dict[str, list[str]] = {
    "passed": [],
    "failed": [],
    "warnings": [],
    "skipped": [],
}

BOILERPLATE = """
from typing import List, Optional, Dict, Tuple
from collections import defaultdict, deque
import heapq
import math

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Node:
    def __init__(self, val=0, neighbors=None, next=None, random=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
        self.next = next
        self.random = random
"""


def check_problem(slug: str, data: dict, *, run_execution_tests: bool) -> dict:
    result = {"slug": slug, "title": data.get("title", slug), "checks": {}}

    starter = data.get("starter_code", "")
    function_name = data.get("function_name", "")
    test_cases = data.get("test_cases", []) or []

    result["checks"]["has_starter"] = bool(starter and len(starter) > 10)
    if function_name == "design":
        result["checks"]["function_in_starter"] = True
    else:
        result["checks"]["function_in_starter"] = bool(function_name and function_name in starter)

    solution = SOLUTIONS.get(slug, "")
    has_solution = bool(
        solution
        and "coming soon" not in solution.lower()
        and "template solution" not in solution.lower()
        and "replace this body" not in solution.lower()
    )
    result["checks"]["has_solution"] = has_solution

    result["checks"]["has_test_cases"] = len(test_cases) > 0
    result["checks"]["test_case_count"] = len(test_cases)

    if run_execution_tests and has_solution and test_cases and function_name:
        design_slugs = {
            "min-stack",
            "lru-cache",
            "time-based-key-value-store",
            "design-twitter",
            "find-median-data-stream",
            "kth-largest-stream",
            "implement-trie",
            "design-add-search-words",
            "detect-squares",
            "serialize-deserialize-binary-tree",
            "copy-list-random-pointer",
        }

        if slug in design_slugs:
            result["checks"]["tests_pass"] = "skipped_design"
            result["checks"]["test_details"] = []
        else:
            tc_objects = [
                TestCase(args=tc["args"], expected=tc["expected"])
                for tc in test_cases
                if tc.get("expected") != "design"
            ]

            if not tc_objects:
                result["checks"]["tests_pass"] = "skipped_no_runnable_cases"
                result["checks"]["test_details"] = []
            else:
                full_code = BOILERPLATE + "\n" + solution
                try:
                    run_result = run_tests(
                        full_code, function_name, tc_objects, timeout=PROBLEM_CHECK_TIMEOUT_SEC
                    )
                except SystemExit as e:
                    result["checks"]["tests_pass"] = False
                    result["checks"]["test_error"] = f"SystemExit: {str(e)}"
                except KeyboardInterrupt:
                    raise
                except Exception as e:
                    result["checks"]["tests_pass"] = False
                    result["checks"]["test_error"] = str(e)
                else:
                    result["checks"]["tests_pass"] = run_result.all_passed
                    result["checks"]["tests_passed_count"] = run_result.passed
                    result["checks"]["tests_total"] = run_result.total
                    result["checks"]["test_details"] = [
                        {
                            "case": r.case_number,
                            "args": (r.args or "")[:50],
                            "expected": (r.expected or "")[:30],
                            "actual": (str(r.actual) if r.actual else "")[:30],
                            "passed": r.passed,
                            "error": r.error,
                        }
                        for r in run_result.results
                    ]
    else:
        result["checks"]["tests_pass"] = "skipped"

    return result


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        except (OSError, ValueError):
            pass

    print("=" * 70)
    print("AlgoLens QA Check — All 150 NeetCode Problems")
    print("=" * 70)

    all_results: list[dict] = []
    run_execution_tests = "--run-tests" in sys.argv

    for slug, data in PROBLEMS.items():
        result, err = run_with_timeout(
            check_problem,
            args=(slug, data),
            kwargs={"run_execution_tests": run_execution_tests},
            timeout=PROBLEM_CHECK_TIMEOUT_SEC,
        )

        if err is not None:
            if err.startswith("TIMEOUT after"):
                print(f"⏱️ TIMEOUT | {slug:<50} | {err}")
            else:
                print(f"❌ CRASH | {slug:<50} | {err}")
            sys.stdout.flush()
            RESULTS["failed"].append(slug)
            continue

        all_results.append(result)

        checks = result["checks"]
        issues: list[str] = []

        if not checks.get("has_starter"):
            issues.append("NO STARTER CODE")
        if data.get("function_name") and not checks.get("function_in_starter"):
            issues.append(f"FUNCTION '{data.get('function_name')}' NOT IN STARTER")
        if not checks.get("has_solution"):
            issues.append("NO SOLUTION")
        if not checks.get("has_test_cases"):
            issues.append("NO TEST CASES")

        tests_pass = checks.get("tests_pass")
        if tests_pass is False:
            if checks.get("test_error"):
                issues.append(f"TEST RUN ERROR: {checks['test_error']}")
            else:
                passed = checks.get("tests_passed_count", 0)
                total = checks.get("tests_total", 0)
                issues.append(f"TESTS FAILING {passed}/{total}")

        if issues:
            status = "FAIL"
            RESULTS["failed"].append(slug)
        else:
            status = "PASS"
            RESULTS["passed"].append(slug)

        line_status = "❌ FAIL" if issues else "✅ PASS"
        line_detail = ", ".join(issues) if issues else "all checks passed"
        print(f"{line_status} | {slug:<50} | {line_detail}")
        sys.stdout.flush()

    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Passed: {len(RESULTS['passed'])}/150")
    print(f"Failed: {len(RESULTS['failed'])}/150")

    if RESULTS["failed"]:
        print("\nFAILED PROBLEMS:")
        for slug in RESULTS["failed"]:
            result = next((r for r in all_results if r["slug"] == slug), None)
            if result is None:
                print(f"\n  {slug}:")
                print("    - QA script error (see CRASH line above)")
                continue
            checks = result["checks"]
            print(f"\n  {slug}:")
            if not checks.get("has_starter"):
                print("    - Missing starter code")
            if not checks.get("function_in_starter"):
                print(f"    - Function '{PROBLEMS[slug].get('function_name')}' not found in starter")
            if not checks.get("has_solution"):
                print("    - Missing or placeholder solution")
            if not checks.get("has_test_cases"):
                print("    - No test cases defined")
            if checks.get("tests_pass") is False:
                if checks.get("test_error"):
                    print(f"    - Test run error: {checks['test_error']}")
                else:
                    print(f"    - Tests failing: {checks.get('tests_passed_count', 0)}/{checks.get('tests_total', 0)}")
                for detail in checks.get("test_details", []):
                    if not detail["passed"]:
                        print(f"      Case {detail['case']}: args={detail['args']}")
                        print(f"        Expected: {detail['expected']}")
                        print(f"        Got:      {detail['actual']}")
                        if detail.get("error"):
                            print(f"        Error:    {detail['error']}")

    report_path = os.path.join(os.path.dirname(__file__), "qa_report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(all_results, f, indent=2)
    print(f"\nFull report saved to {report_path}")


if __name__ == "__main__":
    main()

