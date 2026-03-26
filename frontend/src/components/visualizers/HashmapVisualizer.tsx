import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type HashmapVisualizerProps = {
  data: Record<string, unknown>;
  highlightKeys?: string[];
  label?: string;
};

function safeValue(v: unknown): string {
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function bucketIndexFromKey(key: string): number {
  if (!key.length) return 0;
  return key.charCodeAt(0) % 8;
}

export default function HashmapVisualizer({
  data,
  highlightKeys,
  label,
}: HashmapVisualizerProps) {
  const entries = useMemo(() => Object.entries(data), [data]);

  const highlightSet = useMemo(
    () => new Set(highlightKeys ?? []),
    [highlightKeys],
  );

  const prevSnapshotRef = useRef<Record<string, string>>({});

  const [bucketTicks, setBucketTicks] = useState<Record<number, number>>({});

  const { changedKeys, newKeys } = useMemo(() => {
    const prev = prevSnapshotRef.current;
    const changed = new Set<string>();
    const newK = new Set<string>();

    for (const [k, v] of entries) {
      const cur = safeValue(v);
      if (!(k in prev)) newK.add(k);
      else if (prev[k] !== cur) changed.add(k);
    }
    return { changedKeys: changed, newKeys: newK };
  }, [entries]);

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const [k, v] of entries) {
      next[k] = safeValue(v);
    }
    prevSnapshotRef.current = next;

    if (newKeys.size > 0) {
      const bucketSet = new Set<number>();
      for (const k of newKeys) bucketSet.add(bucketIndexFromKey(k));
      setBucketTicks((prev) => {
        const out = { ...prev };
        for (const b of bucketSet) out[b] = (out[b] ?? 0) + 1;
        return out;
      });
    }
  }, [entries, newKeys]);

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        {label ? (
          <div className="text-muted text-sm font-mono mb-3">{label}</div>
        ) : null}
        <div className="text-muted font-mono">Empty HashMap</div>
      </div>
    );
  }

  const bucketIndices = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {label ? (
        <div className="text-muted text-sm font-mono mb-3">{label}</div>
      ) : null}

      <div className="mb-4">
        <div className="text-[11px] text-muted font-mono mb-2">
          Buckets
        </div>
        <div className="flex items-center gap-2">
          {bucketIndices.map((b) => {
            const tick = bucketTicks[b] ?? 0;
            return (
              <motion.div
                // key ensures the animation re-triggers on pulse tick
                key={`bucket-${b}-${tick}`}
                initial={false}
                className="w-3 h-3 rounded-sm bg-bg/30 border border-border"
                animate={
                  tick > 0
                    ? {
                        boxShadow: [
                          "0 0 0px rgba(124,58,237,0.0)",
                          "0 0 12px rgba(124,58,237,0.55)",
                          "0 0 0px rgba(124,58,237,0.0)",
                        ],
                        scale: [1, 1, 0.65],
                      }
                    : { boxShadow: "none", scale: 1 }
                }
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      </div>

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
            {entries.map(([k, v], idx) => {
              const isHighlighted = highlightSet.has(k);
              const isChanged = changedKeys.has(k);
              const isNew = newKeys.has(k);

              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: idx * 0.02,
                  }}
                  className={[
                    "relative h-[40px] flex items-center border-b border-border",
                    "bg-surface",
                    isHighlighted
                      ? "border-l-[3px] border-primary/100 bg-primary/5"
                      : isNew
                        ? "border-l-[3px] border-primary/100"
                      : "border-l-[3px] border-transparent",
                  ].join(" ")}
                >
                  {isChanged ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 bg-[#F59E0B22]"
                      aria-hidden="true"
                    />
                  ) : null}

                  {/* New key cyan left-border flash, then settle back to violet */}
                  {isNew ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: [1, 1, 0] }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan/100 shadow-[0_0_14px_rgba(6,182,212,0.35)]"
                      aria-hidden="true"
                    />
                  ) : null}

                  <div className="flex-1 px-3 overflow-hidden">
                    <span className="font-mono text-cyan text-[13px] truncate">
                      {k}
                    </span>
                  </div>
                  <div className="flex-[1.4] px-3 overflow-hidden">
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

