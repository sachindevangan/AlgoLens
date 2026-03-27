from __future__ import annotations

import ast
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
    a_norm = normalize_output(str(actual))
    e_norm = normalize_output(expected)
    if a_norm == e_norm:
        return True

    # Float tolerance
    try:
        a_f = float(actual)
        e_f = float(expected)
        return abs(a_f - e_f) <= 0.001
    except Exception:
        pass

    # Try parsing as lists and sorting
    try:
        a_parsed = _try_parse_literal(str(actual))
        e_parsed = _try_parse_literal(expected)
        if isinstance(a_parsed, list) and isinstance(e_parsed, list):
            return sorted(str(x) for x in a_parsed) == sorted(str(x) for x in e_parsed)
    except Exception:
        pass

    return False


def run_tests(code: str, function_name: str, test_cases: list[TestCase]) -> TestRunResponse:
    ns: dict[str, Any] = {}
    exec(code, ns, ns)

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

