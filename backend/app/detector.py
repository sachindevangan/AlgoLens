from typing import Any

from app.models import TraceStep


def _is_int(value: Any) -> bool:
    # bool is a subclass of int; treat it separately.
    return type(value) is int


def _is_primitive(value: Any) -> bool:
    return value is None or isinstance(value, (str, int, float, bool))


def detect_variable_types(steps: list[TraceStep]) -> dict[str, str]:
    if not steps:
        return {}

    final_vars: dict[str, Any] = steps[-1].variables
    detected: dict[str, str] = {}

    pointer_names = {"i", "j", "left", "right", "lo", "hi", "mid", "start", "end"}

    def classify_base(name: str, value: Any) -> str:
        # 1. list of lists -> array2d
        if isinstance(value, list) and value and all(isinstance(v, list) for v in value):
            return "array2d"

        # 2. dict with val + left + right keys -> tree
        if isinstance(value, dict) and {"val", "left", "right"}.issubset(value.keys()):
            return "tree"

        # 3. dict with val + next keys -> linkedlist
        if isinstance(value, dict) and {"val", "next"}.issubset(value.keys()):
            return "linkedlist"

        # 4. list of primitives -> array
        if isinstance(value, list):
            if not value or all(_is_primitive(v) for v in value):
                return "array"

        # 5. dict -> hashmap
        if isinstance(value, dict):
            return "hashmap"

        # 8. str -> string
        if isinstance(value, str):
            return "string"

        # 9. int/float/bool/None -> primitive
        if _is_primitive(value):
            return "primitive"

        # 10. default -> unknown
        return "unknown"

    for name, value in final_vars.items():
        detected[name] = classify_base(name, value)

    # 6/7. list + variable name includes stack/queue
    for name, value in final_vars.items():
        if not isinstance(value, list):
            continue
        lowered = name.lower()
        if "stack" in lowered:
            detected[name] = "stack"
        elif "queue" in lowered:
            detected[name] = "queue"

    # Pointer detection overrides base classification.
    for name in pointer_names:
        if name not in final_vars:
            continue
        if not _is_int(final_vars[name]):
            continue

        seen_int_values: set[int] = set()
        for step in steps:
            if name not in step.variables:
                continue
            v = step.variables.get(name)
            if _is_int(v):
                seen_int_values.add(v)
        if len(seen_int_values) >= 2:
            detected[name] = "pointer"

    return detected

