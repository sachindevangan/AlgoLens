import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
} from "lucide-react";
import React, { Component, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "../../components/editor/CodeEditor";
import VariablePanel from "../../components/editor/VariablePanel";
import StepControls from "../../components/controls/StepControls";
import VisualizerRouter from "../../components/visualizers/VisualizerRouter";
import { NEETCODE_PROBLEMS } from "../../data/neetcode";
import { PATTERNS } from "../../data/patterns";
import { SOLUTIONS } from "../../data/solutions";
import { storage } from "../../lib/storage";
import { useTraceStore } from "../../store/traceStore";
import type { TraceResult } from "../../types";

type ExecuteResponsePayload = {
  trace: TraceResult;
  detected_types: Record<string, string>;
};

function normalizeVariableType(type: string): string {
  if (type === "pointer") return "primitive";
  return type;
}

function patternHints(patternSlug: string): string[] {
  const map: Record<string, string[]> = {
    "arrays-hashing": [
      "Try using a hash map for O(1) lookup.",
      "Think about what you need to store vs what you need to find.",
    ],
    "two-pointers": [
      "Start with one pointer at each end.",
      "Move the pointer that gives you a better result.",
    ],
    "sliding-window": [
      "Think about what makes a valid window.",
      "Expand right, shrink left when window becomes invalid.",
    ],
    stack: ["Use a stack to preserve order/state.", "Define the pop condition carefully."],
    "binary-search": ["Search a monotonic space.", "Track boundaries with mid updates."],
    "linked-list": ["Use dummy nodes to simplify edges.", "Track prev/current pointers."],
    trees: ["DFS recursion is often simplest.", "Return useful info from children."],
    "heap-priority-queue": ["Use heap for top-k behavior.", "Push/pop keeps best candidates."],
    backtracking: ["Choose -> Explore -> Unchoose.", "Prune branches early."],
    tries: ["Traverse by characters.", "Store end-of-word flags."],
    graphs: ["Model neighbors explicitly.", "Use BFS/DFS with visited set."],
    "advanced-graphs": ["Priority queues often help.", "Track best known distance/state."],
    "1d-dynamic-programming": ["Write recurrence first.", "Cache previous states."],
    "2d-dynamic-programming": ["Define table dimensions.", "Transition from adjacent states."],
    greedy: ["Make locally optimal choice.", "Prove exchange argument mentally."],
    intervals: ["Sort intervals first.", "Merge when overlapping."],
    "math-geometry": ["Look for invariants and transforms.", "Avoid floating precision when possible."],
    "bit-manipulation": ["Use XOR/bit masks.", "Check set/unset with shifts."],
  };
  return map[patternSlug] ?? ["Start with brute force.", "Then optimize with the target pattern."];
}

function isPrimitiveValue(value: unknown): boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint" ||
    value === null ||
    value === undefined
  );
}

class ProblemPageErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMessage: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown render error";
    return { hasError: true, errorMessage: msg };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error("[ProblemPageErrorBoundary]", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className="max-w-xl text-center">
            <p className="text-white text-lg font-semibold">Something went wrong.</p>
            <p className="text-muted text-sm mt-2 break-words">{this.state.errorMessage}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ProblemPage() {
  const { problemSlug } = useParams<{ problemSlug: string }>();
  const navigate = useNavigate();

  // One-time migration: clear all old solution drafts
  const ONE_TIME_KEY = "algolens_drafts_cleared_v2";
  if (typeof window !== "undefined" && !localStorage.getItem(ONE_TIME_KEY)) {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("draft-")) {
        const val = localStorage.getItem(key);
        if (val?.trim().startsWith("# Pattern:")) {
          localStorage.removeItem(key);
        }
      }
    });
    localStorage.setItem(ONE_TIME_KEY, "1");
  }

  const [tab, setTab] = useState<"description" | "hints">("description");
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showSolved, setShowSolved] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [showRevealConfirm, setShowRevealConfirm] = useState(false);

  const code = useTraceStore((s) => s.code);
  const trace = useTraceStore((s) => s.trace);
  const detectedTypes = useTraceStore((s) => s.detectedTypes);
  const isRunning = useTraceStore((s) => s.isRunning);
  const currentStep = useTraceStore((s) => s.currentStep);
  const isPlaying = useTraceStore((s) => s.isPlaying);
  const playSpeed = useTraceStore((s) => s.playSpeed);
  const setCode = useTraceStore((s) => s.setCode);
  const setTrace = useTraceStore((s) => s.setTrace);
  const setDetectedTypes = useTraceStore((s) => s.setDetectedTypes);
  const setCurrentStep = useTraceStore((s) => s.setCurrentStep);
  const setIsRunning = useTraceStore((s) => s.setIsRunning);
  const setError = useTraceStore((s) => s.setError);
  const setIsPlaying = useTraceStore((s) => s.setIsPlaying);
  const setPlaySpeed = useTraceStore((s) => s.setPlaySpeed);
  const nextStep = useTraceStore((s) => s.nextStep);
  const prevStep = useTraceStore((s) => s.prevStep);
  const reset = useTraceStore((s) => s.reset);

  // Find problem across all patterns
  const problem =
    Object.values(NEETCODE_PROBLEMS)
      .flat()
      .find((p) => p.slug === problemSlug) ?? null;

  // Find which pattern this problem belongs to
  const patternEntry = Object.entries(NEETCODE_PROBLEMS).find(([, problems]) =>
    problems.some((p) => p.slug === problemSlug),
  );
  const patternSlugResolved = patternEntry?.[0] ?? "";
  const patternSlug = patternSlugResolved;
  const patternProblems = patternEntry?.[1] ?? [];
  const problemIndex = patternProblems.findIndex((p) => p.slug === problemSlug);

  // Get solution (fallback to placeholder)
  const solution = SOLUTIONS[problemSlug ?? ""];
  // eslint-disable-next-line no-console
  console.log("[Solution]", {
    problemSlug,
    hasSolution: !!SOLUTIONS[problemSlug ?? ""],
    solutionPreview: SOLUTIONS[problemSlug ?? ""]?.slice(0, 50),
  });
  // eslint-disable-next-line no-console
  console.log(Object.keys(SOLUTIONS).slice(0, 10));
  if (
    !solution ||
    solution.includes("coming soon") ||
    solution.includes("Template solution")
  ) {
    // eslint-disable-next-line no-console
    console.warn("[Solution] Missing/placeholder solution", {
      problemSlug,
      solutionPreview: solution?.slice(0, 80),
    });
  }

  // Resolve pattern (for badges/UI)
  const pattern = PATTERNS.find((p) => p.slug === patternSlugResolved) ?? null;
  const prevProblem =
    problemIndex > 0 ? patternProblems[problemIndex - 1] : null;
  const nextProblem =
    problemIndex >= 0 && problemIndex < patternProblems.length - 1
      ? patternProblems[problemIndex + 1]
      : null;

  // eslint-disable-next-line no-console
  console.log("[ProblemPage]", { problemSlug, problem, solution });

  const notFoundContent = (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="text-white text-lg">Problem not found</p>
        <p className="text-muted text-sm mt-2">{problemSlug}</p>
        <button
          type="button"
          onClick={() => navigate("/neetcode")}
          className="mt-4 text-primary hover:underline"
        >
          ← Back to NeetCode 150
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!problemSlug) return;
    // eslint-disable-next-line no-console
    console.log("Loading starter for:", problemSlug);
    setSolutionRevealed(false);
    reset();
    // Clear old solution drafts — if saved code looks like a solution (starts with "# Pattern:"), don't load it
    const existingDraft = storage.getDraft(problemSlug ?? "");
    const safeDraft =
      existingDraft && !existingDraft.trim().startsWith("# Pattern:")
        ? existingDraft
        : null;
    const patternDisplay = patternSlug
      .split("-")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const starter = `# ${problem?.title ?? problemSlug}\n# Pattern: ${patternDisplay}\n# Write your solution below\n\ndef solution():\n    pass\n\nprint(solution())`;
    setCode(safeDraft ?? starter);
  }, [problemSlug]);

  useEffect(() => {
    if (!problemSlug || !code) return;
    if (solutionRevealed && code === solution) return;
    const timer = setTimeout(() => {
      storage.saveDraft(problemSlug, code);
    }, 1000);
    return () => clearTimeout(timer);
  }, [code, problemSlug, solutionRevealed, solution]);

  const runCode = async () => {
    if (!problem) return;
    const latestCode = useTraceStore.getState().code;
    setIsRunning(true);
    setError(null);
    try {
      const response = await axios.post<ExecuteResponsePayload>("http://localhost:8000/execute", {
        code: latestCode,
        timeout: 10,
      });
      const payload = response.data;
      const normalized: Record<string, string> = {};
      for (const [k, v] of Object.entries(payload.detected_types)) {
        normalized[k] = normalizeVariableType(v);
      }
      setTrace(payload.trace);
      setDetectedTypes(normalized);
      setCurrentStep(0);
      setIsPlaying(false);
      if (payload.trace.steps.length > 0) {
        setIsVisualizing(true);
      }
      if (!payload.trace.error) {
        storage.markComplete(problem.slug);
        setShowSolved(true);
        window.setTimeout(() => setShowSolved(false), 3000);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Execution failed");
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    const handler = () => void runCode();
    window.addEventListener("algolens:run", handler);
    return () => window.removeEventListener("algolens:run", handler);
  }, [problemSlug]);

  const speedOptions = [
    { key: "0.5x", mult: 0.5 },
    { key: "1x", mult: 1 },
    { key: "2x", mult: 2 },
    { key: "4x", mult: 4 },
  ] as const;
  const hints = problem ? patternHints(patternSlugResolved) : [];
  const totalSteps = trace?.total_steps ?? 0;
  const lastIndex = trace ? Math.max(0, trace.steps.length - 1) : 0;
  const stepLabel = trace && totalSteps > 0 ? `Step ${currentStep + 1} / ${totalSteps}` : "Step 0 / 0";
  const currentVariables = trace?.steps[currentStep]?.variables ?? {};
  const primitiveVariableChips = Object.entries(currentVariables)
    .filter(([, value]) => isPrimitiveValue(value))
    .slice(0, 4);
  const showVisualizeMode = isVisualizing && !!trace;
  const difficultyBadgeClass = problem
    ? problem.difficulty === "easy"
      ? "text-[#10B981] border-[#10B98155] bg-[#10B98122]"
      : problem.difficulty === "medium"
        ? "text-[#F59E0B] border-[#F59E0B55] bg-[#F59E0B22]"
        : "text-[#EF4444] border-[#EF444455] bg-[#EF444422]"
    : "";

  useEffect(() => {
    if (!showVisualizeMode || !trace || !isPlaying) return;
    const intervalId = window.setInterval(() => {
      const { currentStep: cs } = useTraceStore.getState();
      if (cs >= lastIndex) {
        useTraceStore.getState().setIsPlaying(false);
        return;
      }
      useTraceStore.getState().nextStep();
      const afterStep = useTraceStore.getState().currentStep;
      if (afterStep >= lastIndex) {
        useTraceStore.getState().setIsPlaying(false);
      }
    }, playSpeed);
    return () => window.clearInterval(intervalId);
  }, [showVisualizeMode, trace, isPlaying, playSpeed, lastIndex]);

  return (
    <ProblemPageErrorBoundary>
      {problem ? (
        <div className="h-screen bg-[#08080F] overflow-hidden relative">
          <AnimatePresence mode="wait">
            {!showVisualizeMode ? (
              <motion.div
                key="study-mode"
                className="h-full grid grid-cols-[42%_58%] min-h-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.section
                  initial={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-full overflow-y-auto p-6 border-r border-[#1E1E2E] bg-[#0F0F1A]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="inline-flex items-center gap-2 text-sm text-muted hover:text-white"
                    >
                      <ArrowLeft size={14} />
                      ← Back
                    </button>
                    <div className="flex items-center gap-2 text-sm">
                      <button
                        type="button"
                        disabled={!prevProblem}
                        onClick={() => prevProblem && navigate(`/neetcode/${prevProblem.slug}`)}
                        className="text-muted hover:text-white disabled:opacity-40"
                      >
                        Prev
                      </button>
                      <span className="text-muted">|</span>
                      <button
                        type="button"
                        disabled={!nextProblem}
                        onClick={() => nextProblem && navigate(`/neetcode/${nextProblem.slug}`)}
                        className="text-muted hover:text-white disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h1 className="text-white text-xl font-semibold leading-tight">{problem.title}</h1>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`px-2 py-0.5 rounded-full border text-xs capitalize ${difficultyBadgeClass}`}>
                        {problem.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded-full border border-primary/40 text-primary text-xs">
                        {pattern?.title ?? patternSlugResolved}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 mb-3">
                    <button
                      type="button"
                      onClick={() => setTab("description")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        tab === "description" ? "bg-primary text-white" : "bg-surface text-muted"
                      }`}
                    >
                      Description
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab("hints")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        tab === "hints" ? "bg-primary text-white" : "bg-surface text-muted"
                      }`}
                    >
                      Hints
                    </button>
                  </div>

                  {tab === "description" ? (
                    <>
                      <p className="text-sm text-muted leading-relaxed">{problem.description}</p>
                      <div className="mt-5">
                        <h3 className="text-white font-medium mb-2">Examples</h3>
                        <div className="space-y-3">
                          {problem.examples.slice(0, 2).map((ex, idx) => (
                            <div
                              key={`${ex.input}-${idx}`}
                              className="bg-[#08080F] border border-border rounded-lg p-3 space-y-3"
                            >
                              <div className="text-xs text-muted font-mono">Example {idx + 1}</div>

                              <div>
                                <div className="text-xs text-muted mb-1">Input</div>
                                <pre className="text-sm text-white font-mono whitespace-pre-wrap">{ex.input}</pre>
                              </div>

                              <div>
                                <div className="text-xs text-muted mb-1">Output</div>
                                <pre className="text-sm text-white font-mono whitespace-pre-wrap">{ex.output}</pre>
                              </div>

                              {ex.explanation ? (
                                <div className="text-sm text-muted leading-relaxed">{ex.explanation}</div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-5">
                        <h3 className="text-white font-medium mb-2">Constraints</h3>
                        <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                          {problem.constraints.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setShowHint1(true)}
                        className="px-3 py-2 rounded-lg bg-surface border border-border text-white"
                      >
                        Show Hint 1
                      </button>
                      {showHint1 ? <div className="text-sm text-muted">{hints[0]}</div> : null}
                      {showHint1 ? (
                        <button
                          type="button"
                          onClick={() => setShowHint2(true)}
                          className="px-3 py-2 rounded-lg bg-surface border border-border text-white"
                        >
                          Show Hint 2
                        </button>
                      ) : null}
                      {showHint2 ? <div className="text-sm text-muted">{hints[1]}</div> : null}
                    </div>
                  )}
                </motion.section>

                <motion.section
                  initial={{ x: 0 }}
                  exit={{ x: "-30%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-full flex flex-col min-h-0 bg-[#0F0F1A]"
                >
                  <div className="px-3 py-3 border-b border-[#1E1E2E] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void runCode()}
                      disabled={isRunning}
                      className="h-9 px-3 rounded-md bg-primary text-white inline-flex items-center gap-2"
                    >
                      <Play size={14} />
                      Run & Visualize
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const draft = problemSlug ? storage.getDraft(problemSlug) : null;
                        const patternDisplay = patternSlug
                          .split("-")
                          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ");
                        const starter = `# ${problem?.title ?? problemSlug ?? ""}\n# Pattern: ${patternDisplay}\n# Write your solution below\n\ndef solution():\n    pass\n\nprint(solution())`;
                        setCode(draft ?? starter);
                      }}
                      className="h-9 px-3 rounded-md border border-[#1E1E2E] text-muted inline-flex items-center gap-2 hover:text-white"
                    >
                      <RotateCcw size={14} />
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!problemSlug) return;
                        if (!solutionRevealed) {
                          setShowRevealConfirm(true);
                          return;
                        }
                        const draft = storage.getDraft(problemSlug);
                        setSolutionRevealed(false);
                        setShowRevealConfirm(false);
                        const patternDisplay = patternSlug
                          .split("-")
                          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ");
                        const starter = `# ${problem?.title ?? problemSlug}\n# Pattern: ${patternDisplay}\n# Write your solution below\n\ndef solution():\n    pass\n\nprint(solution())`;
                        setCode(draft ?? starter);
                      }}
                      className="h-9 px-3 rounded-md border border-[#1E1E2E] text-muted inline-flex items-center gap-2 hover:text-white"
                    >
                      {solutionRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                      {solutionRevealed ? "Hide Solution" : "Show Solution"}
                    </button>
                  </div>
                  <div className="flex-1 min-h-0">
                    <CodeEditor value={code} onChange={setCode} />
                  </div>
                  <div className="relative h-[120px] opacity-40 pointer-events-none">
                    <StepControls />
                  </div>
                </motion.section>
              </motion.div>
            ) : (
              <motion.div
                key="visualize-mode"
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="h-[calc(100%-56px)] grid grid-cols-[38%_62%] min-h-0">
                  <motion.section
                    initial={{ x: "0%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-full min-h-0 border-r border-[#1E1E2E] bg-[#0F0F1A] flex flex-col"
                  >
                    <div className="px-4 py-3 border-b border-[#1E1E2E]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsVisualizing(false);
                          reset();
                        }}
                        className="text-sm text-muted hover:text-white"
                      >
                        ← Problem
                      </button>
                    </div>
                    <div className="flex-1 min-h-0">
                      <CodeEditor value={code} onChange={setCode} readOnly />
                    </div>
                  </motion.section>

                  <motion.section
                    initial={{ x: "100%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-full min-h-0 bg-[#08080F] overflow-y-auto p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {Object.entries(detectedTypes).map(([name, type]) => (
                        <span
                          key={`type-${name}`}
                          className="px-2 py-1 rounded-full border border-[#1E1E2E] text-xs text-primary font-mono"
                        >
                          {name}: {type}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {Object.keys(currentVariables).map((name) => (
                        <span
                          key={`var-${name}`}
                          className="px-2 py-1 rounded-full bg-[#1E1E2E] text-xs text-white font-mono"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                    <div className="min-h-[360px] h-[60%]">
                      <VisualizerRouter detectedTypes={detectedTypes} />
                    </div>
                    <div className="mt-4 border-t border-[#1E1E2E] pt-4">
                      <VariablePanel />
                    </div>
                  </motion.section>
                </div>

                <div className="h-14 border-t border-[#1E1E2E] bg-surface px-4 flex items-center justify-between gap-3">
                  <div className="text-sm text-muted font-mono min-w-[120px]">{stepLabel}</div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(0)}
                      className="h-8 px-2 rounded border border-border text-muted hover:text-white"
                    >
                      <SkipBack size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => prevStep()}
                      className="h-8 w-8 rounded border border-border text-muted hover:text-white"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-8 w-8 rounded border border-border text-muted hover:text-white"
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => nextStep()}
                      className="h-8 w-8 rounded border border-border text-muted hover:text-white"
                    >
                      <ChevronRight size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(lastIndex)}
                      className="h-8 px-2 rounded border border-border text-muted hover:text-white"
                    >
                      <SkipForward size={14} />
                    </button>
                    <div className="ml-2 flex items-center border border-border rounded-full overflow-hidden">
                      {speedOptions.map((opt) => {
                        const active = Math.round(playSpeed) === Math.round(500 / opt.mult);
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => setPlaySpeed(Math.round(500 / opt.mult))}
                            className={`px-2 py-1 text-xs font-mono ${active ? "bg-primary text-white" : "text-muted"}`}
                          >
                            {opt.key}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 max-w-[40%] overflow-x-auto">
                    {primitiveVariableChips.map(([name, value]) => (
                      <span
                        key={`chip-${name}`}
                        className="shrink-0 bg-[#1E1E2E] rounded-full px-[10px] py-1 text-sm text-white font-mono"
                      >
                        {name} = {String(value)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSolved ? (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="fixed right-6 bottom-6 bg-[#10B981] text-white px-3 py-2 rounded-full font-medium shadow-lg"
              >
                ✓ Solved!
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {showRevealConfirm ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center"
              >
                <button
                  type="button"
                  aria-label="Close reveal solution confirmation"
                  onClick={() => setShowRevealConfirm(false)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ y: 8, scale: 0.98, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  exit={{ y: 8, scale: 0.98, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="relative w-[420px] max-w-[calc(100vw-32px)] rounded-xl border border-border bg-surface p-6 shadow-xl"
                >
                  <div className="text-white font-semibold">Reveal solution?</div>
                  <div className="mt-2 text-sm text-amber-400">
                    Are you sure? This will reveal the optimal solution.
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSolutionRevealed(true);
                        setShowRevealConfirm(false);
                        setCode(solution ?? "# Solution coming soon\npass");
                      }}
                      className="h-9 rounded-md bg-primary text-white"
                    >
                      Yes, show me
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRevealConfirm(false)}
                      className="h-9 rounded-md border border-border text-muted hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ) : (
        notFoundContent
      )}
    </ProblemPageErrorBoundary>
  );
}

