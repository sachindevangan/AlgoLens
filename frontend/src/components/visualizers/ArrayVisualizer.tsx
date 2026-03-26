import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type Pointer = { name: string; index: number; color: string };
type HighlightIndex = { index: number; color: string; label?: string };

type ArrayVisualizerProps = {
  values: (number | string | null)[];
  pointers?: Pointer[];
  highlightIndices?: HighlightIndex[];
  label?: string;
};

type HighlightScheme = {
  border: string;
  bg: string;
  text: string;
  boxShadow: string;
};

function getHighlightScheme(color: string): HighlightScheme | null {
  const c = color.toLowerCase();
  if (c === "#10b981") {
    return {
      border: "border-success",
      bg: "bg-success/10",
      text: "text-success",
      boxShadow: "0 0 0 2px #10B981, 0 0 16px #10B981",
    };
  }
  if (c === "#06b6d4") {
    return {
      border: "border-cyan",
      bg: "bg-cyan/10",
      text: "text-cyan",
      boxShadow: "0 0 0 2px #06B6D4, 0 0 16px #06B6D4",
    };
  }
  if (c === "#f59e0b") {
    return {
      border: "border-warning",
      bg: "bg-warning/10",
      text: "text-warning",
      boxShadow: "0 0 0 2px #F59E0B, 0 0 16px #F59E0B",
    };
  }

  return null;
}

function safeBoxValue(v: number | string | null): string {
  if (v === null) return "null";
  return String(v);
}

function triangleColorClasses(color: string): { triangle: string; label: string } {
  const c = color.toLowerCase();
  if (c === "#06b6d4") {
    return {
      triangle:
        "bg-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.65)]",
      label: "text-cyan",
    };
  }
  if (c === "#f59e0b") {
    return {
      triangle:
        "bg-warning drop-shadow-[0_0_10px_rgba(245,158,11,0.65)]",
      label: "text-warning",
    };
  }
  if (c === "#10b981") {
    return {
      triangle:
        "bg-success drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]",
      label: "text-success",
    };
  }
  return {
    triangle: "bg-primary drop-shadow-[0_0_10px_rgba(124,58,237,0.6)]",
    label: "text-primary",
  };
}

export default function ArrayVisualizer({
  values,
  pointers,
  highlightIndices,
  label,
}: ArrayVisualizerProps) {
  const trimmed = useMemo(() => {
    const n = values.length;
    if (n <= 20) {
      return { kind: "full" as const, items: values.map((v, i) => ({ index: i, value: v, ellipsis: false })) };
    }

    const first = values.slice(0, 10).map((v, i) => ({ index: i, value: v, ellipsis: false }));
    const last = values.slice(n - 5).map((v, offset) => ({
      index: n - 5 + offset,
      value: v,
      ellipsis: false,
    }));

    return {
      kind: "trimmed" as const,
      items: [
        ...first,
        { index: -1, value: null, ellipsis: true },
        ...last,
      ] as Array<{ index: number; value: number | string | null; ellipsis: boolean }>,
    };
  }, [values]);

  const pointerList = useMemo(() => pointers ?? [], [pointers]);
  const highlightList = useMemo(() => highlightIndices ?? [], [highlightIndices]);

  const highlightByIndex = useMemo(() => {
    const map = new Map<number, HighlightIndex>();
    for (const h of highlightList) {
      if (Number.isInteger(h.index) && !map.has(h.index)) map.set(h.index, h);
    }
    return map;
  }, [highlightList]);

  const pointersByIndex = useMemo(() => {
    const map = new Map<number, Pointer[]>();
    for (const p of pointerList) {
      if (!Number.isInteger(p.index)) continue;
      if (!map.has(p.index)) map.set(p.index, []);
      map.get(p.index)!.push(p);
    }
    return map;
  }, [pointerList]);

  const prevSnapshotRef = useRef<Record<number, string>>({});
  const changedByIndex = useMemo(() => {
    const changed: Record<number, boolean> = {};
    const next: Record<number, string> = { ...prevSnapshotRef.current };

    for (const item of trimmed.items) {
      if (item.ellipsis || item.index < 0) continue;
      const serialized = safeBoxValue(item.value);
      const prev = prevSnapshotRef.current[item.index];
      changed[item.index] = prev !== serialized;
      next[item.index] = serialized;
    }

    return { changed, next };
  }, [trimmed.items]);

  useEffect(() => {
    prevSnapshotRef.current = changedByIndex.next;
  }, [changedByIndex.next]);

  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-[#0F0F1A] to-[#0A0A14] p-4 group transition-colors hover:border-primary/20">
      {label ? (
        <div className="text-muted text-sm font-mono mb-3">{label}</div>
      ) : null}

      <div className="flex flex-row gap-2 overflow-x-auto pb-2">
        <AnimatePresence initial={false}>
          {trimmed.items.map((item, i) => {
            if (item.ellipsis) {
              return (
                <motion.div
                  key="ellipsis"
                  className="flex flex-col items-center min-w-[52px]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
                >
                  <div className="w-[52px] h-[52px] rounded-lg border border-border bg-surface flex items-center justify-center font-mono text-muted text-[14px]">
                    ...
                  </div>
                  <div className="text-muted text-[11px] font-mono mt-1"> </div>
                </motion.div>
              );
            }

            const index = item.index;
            const val = item.value;
            const highlight = highlightByIndex.get(index);
            const pointerListForIndex = pointersByIndex.get(index) ?? [];
            const highlightColor = highlight?.color ?? "";
            const scheme = highlight ? getHighlightScheme(highlightColor) : null;

            const isHighlighted = Boolean(scheme);
            const changed = Boolean(changedByIndex.changed[index]);
            const glowColor = scheme ? highlightColor : "#7C3AED";

            return (
              <div key={index} className="flex flex-col items-center min-w-[52px]">
                {highlight?.label ? (
                  <div
                    className={[
                      "px-2 py-0.5 rounded-full border text-[11px] font-mono mb-2 mt-1",
                      scheme ? scheme.bg : "bg-primary/10 border-primary/20 text-primary",
                      scheme ? scheme.border : "border-primary/25",
                    ].join(" ")}
                  >
                    {highlight.label}
                  </div>
                ) : (
                  <div className="h-[20px] mb-2" />
                )}

                <motion.div
                  whileHover={{ scale: 1.08, y: -4 }}
                  initial={{ opacity: 0, y: 16 }}
                  layout="position"
                  className={[
                    "w-[52px] h-[52px] rounded-lg border flex items-center justify-center font-mono transition-colors",
                    isHighlighted ? "border-2" : "border border-border",
                    isHighlighted && scheme ? scheme.border : "",
                    isHighlighted && scheme ? scheme.bg : "bg-surface",
                  ].join(" ")}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: changed ? [1, 1.15, 1] : 1,
                    boxShadow: changed
                      ? [
                          `0 0 0px ${glowColor}`,
                          `0 0 20px ${glowColor}`,
                          `0 0 0px ${glowColor}`,
                        ]
                      : isHighlighted && scheme
                        ? scheme.boxShadow
                        : "0 0 0px transparent",
                  }}
                  transition={{
                    duration: changed ? 0.45 : 0.35,
                    ease: "easeOut",
                    delay: i * 0.05,
                  }}
                >
                  <span className="text-white text-[16px]">{safeBoxValue(val)}</span>
                </motion.div>

                <div className="text-muted text-[11px] font-mono mt-1">{index}</div>

                <div className="min-h-[28px] flex flex-col items-center justify-start mt-1">
                  <AnimatePresence initial={false}>
                    {pointerListForIndex.slice(0, 3).map((p) => {
                      const t = triangleColorClasses(p.color);
                      return (
                        <motion.div
                          key={p.name}
                          layoutId={`pointer-${p.name}`}
                          className="flex flex-col items-center leading-[10px]"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          <motion.div
                            className={[
                              "w-[12px] h-[8px] mb-0.5",
                              t.triangle,
                              "[clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]",
                            ].join(" ")}
                            layout
                          />
                          <div className={["text-[10px] font-mono text-text", t.label].join(" ")}>
                            {p.name}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

