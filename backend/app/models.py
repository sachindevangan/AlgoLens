from pydantic import BaseModel
from typing import Any, Optional


class ExecuteRequest(BaseModel):
    code: str
    timeout: int = 10


class TraceStep(BaseModel):
    step: int
    line: int
    variables: dict[str, Any]
    stdout: list[str]
    event: str
    function_name: str


class TraceResult(BaseModel):
    steps: list[TraceStep]
    error: Optional[str] = None
    total_steps: int


class ExecuteResponse(BaseModel):
    trace: TraceResult
    detected_types: dict[str, str]
