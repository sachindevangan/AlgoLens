import sys
import threading
from copy import deepcopy
from io import StringIO
from typing import Any, Optional

from app.models import TraceResult, TraceStep


def _is_primitive(value: Any) -> bool:
    return value is None or isinstance(value, (str, int, float, bool))


def _serialize_value(value: Any, *, _visited: set[int], _depth: int, _max_depth: int) -> Any:
    if _depth > _max_depth:
        return {"type": "max_depth"}

    function_like_type_names = {
        "function",
        "method",
        "builtin_function_or_method",
        "module",
        "type",
        "classobj",
    }
    try:
        if callable(value):
            return "<function>"
    except Exception:
        # If `callable()` fails for any reason, fall through to type-name checks.
        pass
    if type(value).__name__ in function_like_type_names:
        return "<function>"
    if isinstance(value, type):
        return "<function>"

    if _is_primitive(value):
        return value

    value_id = id(value)
    if value_id in _visited:
        return {"type": "cycle"}

    # Mark as visited for container/object types; keep primitives as-is.
    if isinstance(value, (dict, list, tuple, set)) or hasattr(value, "left") or hasattr(value, "right") or hasattr(value, "next"):
        _visited.add(value_id)

    try:
        if isinstance(value, dict):
            out: dict[str, Any] = {}
            for k, v in value.items():
                key_out: str
                if _is_primitive(k):
                    key_out = str(k)
                else:
                    key_out = repr(k)
                out[key_out] = _serialize_value(v, _visited=_visited, _depth=_depth + 1, _max_depth=_max_depth)
            return out

        if isinstance(value, (list, tuple)):
            return [
                _serialize_value(v, _visited=_visited, _depth=_depth + 1, _max_depth=_max_depth)
                for v in value
            ]

        if isinstance(value, set):
            # Convert to a sorted list for stable output where possible.
            as_list = list(value)
            try:
                as_list.sort(key=lambda x: repr(x))
            except Exception:
                pass
            return [
                _serialize_value(v, _visited=_visited, _depth=_depth + 1, _max_depth=_max_depth)
                for v in as_list
            ]

        # Tree-like node: { val, left, right }
        if hasattr(value, "left") and hasattr(value, "right"):
            node_val = getattr(value, "val", getattr(value, "value", None))
            left = getattr(value, "left", None)
            right = getattr(value, "right", None)
            return {
                "val": _serialize_value(node_val, _visited=_visited, _depth=_depth + 1, _max_depth=_max_depth),
                "left": _serialize_value(left, _visited=_visited, _depth=_depth + 1, _max_depth=_max_depth),
                "right": _serialize_value(right, _visited=_visited, _depth=_depth + 1, _max_depth=_max_depth),
            }

        # Linked-list-like node: { val, next }
        if hasattr(value, "next"):
            node_val = getattr(value, "val", getattr(value, "value", None))
            nxt = getattr(value, "next", None)
            return {
                "val": _serialize_value(node_val, _visited=_visited, _depth=_depth + 1, _max_depth=_max_depth),
                "next": _serialize_value(nxt, _visited=_visited, _depth=_depth + 1, _max_depth=_max_depth),
            }

        # Fallback: represent custom objects safely.
        return {"type": value.__class__.__name__, "repr": repr(value)}
    finally:
        if isinstance(value, (dict, list, tuple, set)) or hasattr(value, "left") or hasattr(value, "right") or hasattr(value, "next"):
            # Note: keep visited entries to prevent deep cycles across branches;
            # removing here would allow re-entrance and could loop again.
            pass


def trace_code(code: str, timeout: int) -> TraceResult:
    steps: list[TraceStep] = []
    error_msg: Optional[str] = None

    timeout_event = threading.Event()

    # Capture stdout from the executed code.
    stdout_buffer = StringIO()
    original_stdout = sys.stdout

    # Isolated namespace for exec().
    sandbox_globals: dict[str, Any] = {"__builtins__": __builtins__}

    max_steps = 500
    step_count = 0

    def on_timeout() -> None:
        timeout_event.set()

    timer: Optional[threading.Timer] = None

    def tracer(frame: Any, event: str, arg: Any) -> Any:
        nonlocal step_count

        if event != "line":
            return tracer

        if timeout_event.is_set():
            raise TimeoutError(f"Execution exceeded timeout of {timeout} seconds")

        if step_count >= max_steps:
            raise RuntimeError(f"Max trace steps exceeded ({max_steps})")

        # When exec() is run from a string, the code filename is typically "<string>".
        if frame.f_code.co_filename != "<string>":
            return tracer

        try:
            local_vars = deepcopy(frame.f_locals)
        except Exception:
            # Deepcopy is required, but if it fails we still want the execution to progress safely.
            local_vars = dict(frame.f_locals)

        variables: dict[str, Any] = {}
        for name, value in local_vars.items():
            if name.startswith("__"):
                continue
            function_like_type_names = {
                "function",
                "method",
                "builtin_function_or_method",
                "module",
                "type",
                "classobj",
            }
            # Skip function/method/module/class/builtin values.
            if callable(value):
                continue
            if type(value).__name__ in function_like_type_names:
                continue
            if isinstance(value, type):
                continue
            variables[name] = _serialize_value(
                value,
                _visited=set(),
                _depth=0,
                _max_depth=10,
            )

        current_stdout = stdout_buffer.getvalue()
        stdout_list = current_stdout.splitlines() if current_stdout else []

        step_count += 1
        steps.append(
            TraceStep(
                step=step_count,
                line=frame.f_lineno,
                variables=variables,
                stdout=stdout_list,
                event=event,
                function_name=frame.f_code.co_name,
            )
        )

        return tracer

    try:
        sys.stdout = stdout_buffer
        sys.settrace(tracer)
        timer = threading.Timer(timeout, on_timeout)
        timer.start()
        exec(code, sandbox_globals, sandbox_globals)
    except Exception as e:
        error_msg = str(e)
    finally:
        if timer is not None:
            timer.cancel()
        sys.settrace(None)
        sys.stdout = original_stdout

    return TraceResult(steps=steps, error=error_msg, total_steps=len(steps))

