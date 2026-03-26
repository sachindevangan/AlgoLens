import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  PlayCircle,
  Loader2,
  X,
} from "lucide-react";
import { useTraceStore } from "../../store/traceStore";
import CodeEditor from "../../components/editor/CodeEditor";
import StepControls from "../../components/controls/StepControls";
import VariablePanel from "../../components/editor/VariablePanel";
import type { VariableType, TraceResult } from "../../types";

const DEFAULT_CODE = `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

result = two_sum([2, 7, 11, 15], 9)
print(result)
`;

const sampleChips = [
  {
    key: "two-sum",
    label: "Two Sum",
    code: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

result = two_sum([2, 7, 11, 15], 9)
print(result)
`,
  },
  {
    key: "binary-search",
    label: "Binary Search",
    code: `def binary_search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

result = binary_search([-1, 0, 3, 5, 9, 12], 9)
print(result)
`,
  },
  {
    key: "valid-parentheses",
    label: "Valid Parentheses",
    code: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack

result = is_valid("()[]{}")
print(result)
`,
  },
] as const;

function normalizeVariableType(type: string): VariableType {
  if (type === "pointer") return "primitive";
  if (
    type === "array" ||
    type === "array2d" ||
    type === "stack" ||
    type === "queue" ||
    type === "tree" ||
    type === "linkedlist" ||
    type === "graph" ||
    type === "hashmap" ||
    type === "primitive" ||
    type === "string" ||
    type === "unknown"
  ) {
    return type;
  }
  return "unknown";
}

type ExecuteResponsePayload = {
  trace: TraceResult;
  detected_types: Record<string, string>;
};

export default function PlaygroundPage() {
  const code = useTraceStore((s) => s.code);
  const trace = useTraceStore((s) => s.trace);
  const detectedTypes = useTraceStore((s) => s.detectedTypes);
  const error = useTraceStore((s) => s.error);
  const isRunning = useTraceStore((s) => s.isRunning);

  const setCode = useTraceStore((s) => s.setCode);
  const setTrace = useTraceStore((s) => s.setTrace);
  const setDetectedTypes = useTraceStore((s) => s.setDetectedTypes);
  const setCurrentStep = useTraceStore((s) => s.setCurrentStep);
  const setIsRunning = useTraceStore((s) => s.setIsRunning);
  const setError = useTraceStore((s) => s.setError);
  const reset = useTraceStore((s) => s.reset);

  const [dismissedTraceError, setDismissedTraceError] = useState(false);

  useEffect(() => {
    // Pre-load default code and ensure store starts clean.
    reset();
    setCode(DEFAULT_CODE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!trace?.error) return;
    setError(trace.error);
    setDismissedTraceError(false);
  }, [trace?.error, setError]);

  const lineCount = useMemo(() => {
    const parts = code.split(/\r\n|\r|\n/);
    return parts.length;
  }, [code]);

  const charCount = code.length;

  const visualizationTypes = useMemo(() => {
    if (!trace) return [];
    const unique = new Set<VariableType>();
    for (const type of Object.values(detectedTypes)) {
      unique.add(normalizeVariableType(type));
    }
    return Array.from(unique.values());
  }, [detectedTypes, trace]);

  const typeLabel = (t: VariableType) => {
    switch (t) {
      case "array":
        return "Array";
      case "array2d":
        return "Array2D";
      case "hashmap":
        return "HashMap";
      case "linkedlist":
        return "LinkedList";
      case "primitive":
        return "Primitive";
      case "string":
        return "String";
      case "tree":
        return "Tree";
      case "stack":
        return "Stack";
      case "queue":
        return "Queue";
      case "graph":
        return "Graph";
      case "unknown":
      default:
        return "Unknown";
    }
  };

  const onLoadSample = (nextCode: string) => {
    reset();
    setCode(nextCode);
  };

  const onRun = async () => {
    setDismissedTraceError(false);
    setError(null);
    setIsRunning(true);
    try {
      const response = await axios.post<ExecuteResponsePayload>(
        "http://localhost:8000/execute",
        { code, timeout: 10 },
      );

      const payload = response.data;
      const normalizedDetected: Record<string, VariableType> = {};
      for (const [name, t] of Object.entries(payload.detected_types)) {
        normalizedDetected[name] = normalizeVariableType(t);
      }

      setTrace(payload.trace);
      setDetectedTypes(normalizedDetected);
      setCurrentStep(0);
      useTraceStore.getState().setIsPlaying(false);
      setError(payload.trace.error);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data: unknown = e.response?.data;
        if (data && typeof data === "object" && "detail" in data) {
          const detail = (data as { detail?: unknown }).detail;
          if (typeof detail === "string") {
            setError(detail);
            return;
          }
        }
        setError(e.message || "Request failed");
        return;
      }
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="h-[52px] border-b border-border bg-surface flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="text-white font-semibold">Playground</div>
          <div className="px-2 py-1 rounded-full bg-border text-muted text-[12px] font-mono">
            Python 3.13
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              reset();
              setCode(DEFAULT_CODE);
              setError(null);
            }}
            className="h-9 px-3 rounded-md text-muted border border-border bg-surface hover:bg-bg transition-colors"
            disabled={isRunning}
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => void onRun()}
            disabled={isRunning}
            className="h-9 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-primary to-cyan hover:brightness-110 transition disabled:opacity-40 disabled:hover:brightness-100 flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Run &amp; Visualize</span>
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && !dismissedTraceError ? (
          <motion.div
            key="error-banner"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-danger/10 border border-danger text-danger px-4 py-3 flex items-start justify-between gap-3"
          >
            <div className="text-sm font-mono whitespace-pre-wrap">{error}</div>
            <button
              type="button"
              onClick={() => setDismissedTraceError(true)}
              className="h-7 w-7 rounded-md bg-danger/20 border border-danger/40 hover:bg-danger/30 flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex-1 grid grid-cols-[42%_35%_23%] gap-4 overflow-hidden px-0 pt-4">
        <section className="overflow-hidden flex flex-col h-full">
          <div className="flex-1 min-h-0">
            <CodeEditor value={code} onChange={setCode} readOnly={false} />
          </div>

          <div className="h-[32px] flex items-center justify-between px-3 border-t border-border bg-surface text-muted text-[12px] font-mono">
            <span>Lines: {lineCount}</span>
            <span>Chars: {charCount}</span>
          </div>
        </section>

        <section className="overflow-hidden flex flex-col h-full rounded-xl">
          <div className="border border-border bg-surface rounded-xl overflow-hidden flex flex-col h-full">
            <div className="h-[44px] flex items-center justify-between px-4 border-b border-border bg-surface">
              <div className="flex items-center gap-2">
                <div className="text-white font-semibold">Visualization</div>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {trace
                  ? visualizationTypes.map((t) => (
                      <div
                        key={t}
                        className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[12px] font-mono"
                      >
                        {typeLabel(t)}
                      </div>
                    ))
                  : null}
              </div>
            </div>

            <div className="relative flex-1 min-h-0 overflow-hidden">
              <div className="h-full overflow-y-auto">
                {!trace ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-3 px-6">
                    <PlayCircle className="h-14 w-14 text-muted" />
                    <div className="text-white text-xl font-semibold font-mono">
                      Write code and hit Run &amp; Visualize
                    </div>
                    <div className="mt-4 flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        {sampleChips.map((chip) => (
                          <motion.button
                            key={chip.key}
                            type="button"
                            onClick={() => onLoadSample(chip.code)}
                            whileTap={{ scale: 0.97 }}
                            className="px-3 py-2 rounded-full border border-border text-muted hover:text-white hover:bg-bg font-mono text-sm"
                          >
                            {chip.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center px-10">
                    <div className="max-w-md">
                      <div className="text-white text-lg font-semibold font-mono">
                        Visualizer coming in next step
                      </div>
                      <div className="mt-2 text-muted text-sm font-mono">
                        Your traced execution is already available in the right
                        Variables panel. Use the controls below to step through
                        execution state.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <StepControls />
            </div>
          </div>
        </section>

        <aside className="h-full overflow-hidden rounded-xl bg-surface">
          <VariablePanel />
        </aside>
      </div>
    </div>
  );
}


