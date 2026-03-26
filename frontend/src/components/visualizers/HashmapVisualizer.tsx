import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type HashmapVisualizerProps = {
  data: Record<string, unknown>;
  highlightKeys?: string[];
  label?: string;
};

function safeValue(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export default function HashmapVisualizer({
  data,
  highlightKeys,
  label,
}: HashmapVisualizerProps) {
  const highlightSet = useMemo(() => new Set(highlightKeys ?? []), [highlightKeys]);
  const entries = useMemo(() => Object.entries(data), [data]);

  const prevSnapshotRef = useRef<Record<string, string>>({});

  const changedKeys = useMemo(() => {
    const prev = prevSnapshotRef.current;
    const changed = new Set<string>();
    for (const [k, v] of entries) {
      const current = safeValue(v);
      if (prev[k] !== current) changed.add(k);
    }
    return changed;
  }, [entries]);

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const [k, v] of entries) {
      next[k] = safeValue(v);
    }
    prevSnapshotRef.current = next;
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        {label ? (
          <div className="text-muted text-sm font-mono mb-3">{label}</div>
        ) : null}
        <div className="text-muted font-mono">{`Empty HashMap`}</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {label ? (
        <div className="text-muted text-sm font-mono mb-3">{label}</div>
      ) : null}

      <div className="rounded-lg overflow-hidden border border-border bg-bg/20">
        <div className="h-[40px] flex items-center justify-between px-3 bg-surface border-b border-border">
          <div className="text-muted text-[11px] font-mono uppercase tracking-wider">
            Key
          </div>
          <div className="text-muted text-[11px] font-mono uppercase tracking-wider">
            Value
          </div>
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {entries.map(([k, v]) => {
              const isHighlighted = highlightSet.has(k);
              const isChanged = changedKeys.has(k);

              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={[
                    "relative h-[40px] flex items-center border-b border-border px-3",
                    isHighlighted
                      ? "border-l-[3px] border-primary bg-primary/10"
                      : "border-l-[3px] border-transparent",
                  ].join(" ")}
                >
                  <div className="absolute inset-0 pointer-events-none">
                    {isChanged ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.9, 0] }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="h-full w-full bg-primary/20"
                      />
                    ) : null}
                  </div>

                  <div
                    className={[
                      "flex-1 pr-2 overflow-hidden",
                    ].join(" ")}
                  >
                    <span className="font-mono text-cyan text-[13px] truncate">
                      {k}
                    </span>
                  </div>
                  <div className="flex-[1.4] overflow-hidden">
                    <span className="font-mono text-text text-[13px] truncate">
                      {safeValue(v)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

