import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Variable as VariableIcon } from "lucide-react";
import { useTraceStore } from "../../store/traceStore";
import type { VariableType } from "../../types";

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function safePrettyStringify(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function normalizeType(type: string | undefined | null): VariableType {
  if (!type) return "unknown";
  if (type === "pointer") return "primitive"; // backend pointer ints -> treat as primitive for UI
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

export default function VariablePanel() {
  const trace = useTraceStore((s) => s.trace);
  const currentStep = useTraceStore((s) => s.currentStep);
  const detectedTypes = useTraceStore((s) => s.detectedTypes);

  const step = trace?.steps[currentStep] ?? null;
  const variables = step?.variables ?? null;
  const stdout = step?.stdout ?? [];

  const prevSnapshotRef = useRef<Record<string, string>>({});

  const snapshot = useMemo(() => {
    if (!variables) return {};
    const next: Record<string, string> = {};
    for (const [key, value] of Object.entries(variables)) {
      next[key] = safeStringify(value);
    }
    return next;
  }, [variables]);

  const changedMap = useMemo(() => {
    const prev = prevSnapshotRef.current;
    const out: Record<string, boolean> = {};
    for (const key of Object.keys(snapshot)) {
      out[key] = prev[key] !== snapshot[key];
    }
    return out;
  }, [snapshot]);

  const newKeys = useMemo(() => {
    const prev = prevSnapshotRef.current;
    const out: Set<string> = new Set();
    for (const key of Object.keys(snapshot)) {
      if (!(key in prev)) out.add(key);
    }
    return out;
  }, [snapshot]);

  useEffect(() => {
    if (!variables) return;
    prevSnapshotRef.current = snapshot;
  }, [currentStep, trace, snapshot, variables]);

  if (!trace || !step || !variables) {
    return (
      <div className="h-full overflow-y-auto p-4 border-l border-border">
        <div className="h-full flex flex-col items-center justify-center gap-2 text-center">
          <VariableIcon className="h-6 w-6 text-muted" />
          <div className="text-muted font-mono">
            Run your code to inspect variables
          </div>
        </div>
      </div>
    );
  }

  const entries = Object.entries(variables);

  return (
    <div className="h-full overflow-y-auto p-4 border-l border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="text-white font-semibold">Variables</div>
        <div className="px-2 py-1 rounded-full bg-primary text-white text-[11px] font-mono">
          Line {step.line}
        </div>
      </div>

      <div className="flex flex-col">
        {entries.map(([name, value]) => {
          const detected = normalizeType(detectedTypes[name]);
          const shouldGlow = Boolean(changedMap[name]);
          const isNew = newKeys.has(name);

          return (
            <motion.div
              key={name}
              className="relative mb-2 rounded-xl border border-border bg-surface p-3 overflow-hidden"
              initial={isNew ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl border border-primary/60 shadow-[0_0_18px_rgba(124,58,237,0.45)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: shouldGlow ? [0, 1, 0] : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-between gap-2 mb-2">
                <div className="text-cyan font-mono text-sm truncate">
                  {name}
                </div>
                <div className="px-2 py-0.5 rounded-full bg-primary text-white text-[11px] font-mono">
                  {detected}
                </div>
              </div>

              <div className="relative">
                {detected === "primitive" ? (
                  <div className="text-text text-xl font-mono">
                    {value === null ? "null" : String(value)}
                  </div>
                ) : null}

                {detected === "string" ? (
                  <div className="text-success text-lg font-mono">
                    &quot;{String(value)}&quot;
                  </div>
                ) : null}

                {detected === "array" ? (
                  Array.isArray(value) && value.length <= 20 ? (
                    <div className="flex flex-wrap gap-2">
                      {value.map((item, idx) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${name}-${idx}`}
                          className="w-7 h-7 border border-border rounded-sm flex items-center justify-center font-mono text-[11px] text-text"
                        >
                          {item === null ? "null" : String(item)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted font-mono">
                      [Array of {Array.isArray(value) ? value.length : 0} items]
                    </div>
                  )
                ) : null}

                {detected === "hashmap" || detected === "tree" || detected === "linkedlist" || detected === "graph" ? (
                  typeof value === "object" && value !== null && !Array.isArray(value) ? (
                    <div className="font-mono text-sm">
                      {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
                        <div key={`${name}-${k}`} className="py-0.5">
                          <span className="text-cyan">{k}:</span>{" "}
                          <span className="text-text">{typeof v === "string" ? v : safeStringify(v)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <pre className="text-sm text-text whitespace-pre-wrap bg-bg border border-border rounded-lg p-3 font-mono">
                      {safePrettyStringify(value)}
                    </pre>
                  )
                ) : null}

                {detected !== "primitive" &&
                detected !== "string" &&
                detected !== "array" &&
                detected !== "hashmap" &&
                detected !== "tree" &&
                detected !== "linkedlist" &&
                detected !== "graph" ? (
                  <pre className="text-sm text-text whitespace-pre-wrap bg-bg border border-border rounded-lg p-3 font-mono">
                    {safePrettyStringify(value)}
                  </pre>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>

      {stdout.length > 0 ? (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2 text-white">
            <Terminal className="h-4 w-4 text-cyan" />
            <div className="font-semibold">Output</div>
          </div>
          <div className="flex flex-col gap-2">
            {stdout.map((line, idx) => (
              <div
                key={`${name}-${idx}`}
                className="bg-surface border border-border rounded-lg px-3 py-2 text-success font-mono text-sm whitespace-pre-wrap"
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

