import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type Pointer = { name: string; index: number; color: string };
type HighlightIndex = { index: number; color: string; label?: string };

type ArrayVisualizerProps = {
  values: (number | string | null)[];
  pointers?: Pointer[];
  highlightIndices?: HighlightIndex[];
  label?: string;
};

const highlightColorClasses = (color: string) => {
  switch (color.toLowerCase()) {
    case "#06b6d4":
      return {
        border: "border-cyan",
        bg: "bg-cyan/10",
        glow:
          "shadow-[0_0_18px_rgba(6,182,212,0.35)] border-cyan/40",
        pillBg: "bg-cyan/10",
        pillBorder: "border-cyan/25",
        pillText: "text-cyan",
        triangle: "text-cyan",
      };
    case "#f59e0b":
      return {
        border: "border-warning",
        bg: "bg-warning/10",
        glow:
          "shadow-[0_0_18px_rgba(245,158,11,0.30)] border-warning/40",
        pillBg: "bg-warning/10",
        pillBorder: "border-warning/25",
        pillText: "text-warning",
        triangle: "text-warning",
      };
    case "#10b981":
      return {
        border: "border-success",
        bg: "bg-success/10",
        glow:
          "shadow-[0_0_18px_rgba(16,185,129,0.30)] border-success/40",
        pillBg: "bg-success/10",
        pillBorder: "border-success/25",
        pillText: "text-success",
        triangle: "text-success",
      };
    case "#7c3aed":
    case "#8b5cf6":
      return {
        border: "border-primary",
        bg: "bg-primary/10",
        glow: "shadow-[0_0_18px_rgba(124,58,237,0.35)] border-primary/40",
        pillBg: "bg-primary/10",
        pillBorder: "border-primary/25",
        pillText: "text-primary",
        triangle: "text-primary",
      };
    default:
      return {
        border: "border-primary",
        bg: "bg-primary/10",
        glow: "shadow-[0_0_18px_rgba(124,58,237,0.35)] border-primary/40",
        pillBg: "bg-primary/10",
        pillBorder: "border-primary/25",
        pillText: "text-primary",
        triangle: "text-primary",
      };
  }
};

function safeBoxValue(v: number | string | null): string {
  if (v === null) return "null";
  return String(v);
}

export default function ArrayVisualizer({
  values,
  pointers,
  highlightIndices,
  label,
}: ArrayVisualizerProps) {
  const displayed = useMemo(() => {
    const n = values.length;
    if (n <= 20) {
      return { kind: "full" as const, items: values.map((v, i) => ({ index: i, value: v })) };
    }
    const first = values.slice(0, 10).map((v, i) => ({ index: i, value: v }));
    const last = values.slice(n - 5).map((v, offset) => ({
      index: n - 5 + offset,
      value: v,
    }));
    return { kind: "trimmed" as const, items: [{ index: -1, value: "..." }, ...first as Array<{ index: number; value: number | string | null }>, ...last as Array<{ index: number; value: number | string | null }>] };
  }, [values]);

  const pointerList = useMemo(() => pointers ?? [], [pointers]);
  const highlightList = useMemo(() => highlightIndices ?? [], [highlightIndices]);

  const highlightByIndex = useMemo(() => {
    const map = new Map<number, HighlightIndex>();
    for (const h of highlightList) {
      if (!Number.isInteger(h.index)) continue;
      if (!map.has(h.index)) map.set(h.index, h);
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

  const prevValueRef = useRef<Record<number, string>>({});

  const { changedByIndex, nextPrevSnapshot } = useMemo(() => {
    const changed: Record<number, boolean> = {};
    const nextPrev: Record<number, string> = { ...prevValueRef.current };
    for (const item of displayed.items) {
      if (item.index < 0) continue;
      const serialized = safeBoxValue(item.value as number | string | null);
      const prevSerialized = prevValueRef.current[item.index];
      changed[item.index] = prevSerialized !== serialized;
      nextPrev[item.index] = serialized;
    }
    return { changedByIndex: changed, nextPrevSnapshot: nextPrev };
  }, [displayed.items]);

  useEffect(() => {
    prevValueRef.current = nextPrevSnapshot;
  }, [nextPrevSnapshot]);

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {label ? (
        <div className="text-muted text-sm font-mono mb-3">{label}</div>
      ) : null}

      <div className="flex flex-row gap-2 overflow-x-auto pb-2">
        {displayed.items.map((item) => {
          if (item.index === -1) {
            return (
              <div key="ellipsis" className="flex flex-col items-center min-w-[52px]">
                <div className="w-[52px] h-[52px] rounded-lg border border-border bg-surface flex items-center justify-center font-mono text-muted text-[14px]">
                  ...
                </div>
                <div className="text-muted text-[11px] font-mono mt-1"> </div>
              </div>
            );
          }

          const index = item.index;
          const val = item.value;
          const highlight = highlightByIndex.get(index);
          const pointerListForIndex = pointersByIndex.get(index) ?? [];
          const color = highlight?.color ?? "#7C3AED";
          const colorClasses = highlightColorClasses(color);

          const shouldHighlight = Boolean(highlight);
          const shouldPulse = Boolean(changedByIndex[index]);

          return (
            <div key={index} className="flex flex-col items-center min-w-[52px]">
              {highlight?.label ? (
                <div
                  className={[
                    "px-2 py-0.5 rounded-full border text-[11px] font-mono mb-1 mt-1",
                    colorClasses.pillBg,
                    colorClasses.pillBorder,
                    colorClasses.pillText,
                  ].join(" ")}
                >
                  {highlight.label}
                </div>
              ) : (
                <div className="h-[20px] mb-1" />
              )}

              <motion.div
                layout="position"
                animate={
                  shouldPulse
                    ? { scale: [1, 1.12, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={[
                  "w-[52px] h-[52px] rounded-lg border flex items-center justify-center font-mono",
                  "bg-surface",
                  shouldHighlight ? "border-2" : "border border-border",
                  shouldHighlight ? `${colorClasses.border}` : "border-border",
                  shouldHighlight ? colorClasses.bg : "",
                  shouldHighlight ? colorClasses.glow : "",
                ].join(" ")}
              >
                <span className="text-white text-[16px]">{safeBoxValue(val)}</span>
              </motion.div>

              <div className="text-muted text-[11px] font-mono mt-1">
                {index}
              </div>

              <div className="min-h-[28px] flex flex-col items-center justify-start mt-1">
                {pointerListForIndex.slice(0, 3).map((p) => (
                  <motion.div
                    key={p.name}
                    layoutId={`pointer-${p.name}`}
                    className="flex flex-col items-center leading-[10px]"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div
                      className={[
                        "text-[12px] leading-[14px]",
                        highlightColorClasses(p.color).triangle,
                      ].join(" ")}
                    >
                      ▲
                    </div>
                    <div className="text-[10px] font-mono text-text">
                      {p.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

