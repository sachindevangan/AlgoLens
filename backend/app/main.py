from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import ExecuteRequest, ExecuteResponse, TestRunRequest, TestRunResponse
from app.tracer import trace_code
from app.detector import detect_variable_types
from app.test_runner import run_tests

app = FastAPI(title="AlgoLens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/execute", response_model=ExecuteResponse)
def execute(request: ExecuteRequest):
    result = trace_code(request.code, request.timeout)
    detected = detect_variable_types(result.steps)
    return ExecuteResponse(trace=result, detected_types=detected)


@app.post("/run-tests", response_model=TestRunResponse)
def run_tests_endpoint(request: TestRunRequest):
    return run_tests(request.code, request.function_name, request.test_cases)
