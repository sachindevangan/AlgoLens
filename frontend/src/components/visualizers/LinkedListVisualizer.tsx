import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

export type LinkedListNode = { val: unknown; next?: unknown };

export function flattenLinkedList(
  node: LinkedListNode | null | undefined,
) {
  const out: LinkedListNode[] = [];
  let current: LinkedListNode | null | undefined = node;
  let steps = 0;
  const visited = new WeakSet<object>();

  while (current && steps < 20) {
    if (typeof current === "object") {
      if (visited.has(current)) break;
      visited.add(current);
    }

    out.push(current);
    steps += 1;

    const next = current.next as LinkedListNode | null | undefined;
    if (!next) break;

    current = next;
  }

  return out;
}

type LinkedListVisualizerProps = {
  nodes: LinkedListNode[] | null;
  highlightIndices?: number[];
  label?: string;
};

function Arrow({
  highlighted,
}: {
  highlighted: boolean;
}) {
  return (
    <motion.svg
      className="h-6 w-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.line
        x1="0"
        y1="18"
        x2="90"
        y2="18"
        stroke={highlighted ? "#06B6D4" : "#2D2D3D"}
        strokeWidth={highlighted ? 2.5 : 1.5}
        strokeLinecap="round"
        animate={
          highlighted
            ? {
                filter: [
                  "drop-shadow(0 0 0px rgba(6,182,212,0))",
                  "drop-shadow(0 0 10px rgba(6,182,212,0.35))",
                  "drop-shadow(0 0 0px rgba(6,182,212,0))",
                ],
              }
            : undefined
        }
      />
      <motion.polygon
        points="88,12 100,18 88,24"
        fill={highlighted ? "#06B6D4" : "#2D2D3D"}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      />
    </motion.svg>
  );
}

type DisplayItem =
  | { kind: "node"; idx: number; node: LinkedListNode; value: unknown }
  | { kind: "ellipsis"; key: string; start: number; end: number };

export default function LinkedListVisualizer({
  nodes,
  highlightIndices = [],
  label,
}: LinkedListVisualizerProps) {
  const highlightSet = useMemo(
    () => new Set(highlightIndices),
    [highlightIndices],
  );

  const displayItems = useMemo(() => {
    const list = nodes ?? [];
    if (list.length <= 12) {
      return list.map((node, idx) => ({
        kind: "node" as const,
        idx,
        node,
        value: node.val,
      }));
    }

    const first = list.slice(0, 8);
    const last = list.slice(list.length - 3);

    const items: DisplayItem[] = [];
    first.forEach((node, idx) => {
      items.push({ kind: "node", idx, node, value: node.val });
    });
    items.push({
      kind: "ellipsis",
      key: "ellipsis",
      start: 8,
      end: list.length - 3,
    });
    last.forEach((node, offset) => {
      const idx = list.length - 3 + offset;
      items.push({ kind: "node", idx, node, value: node.val });
    });
    return items;
  }, [nodes]);

  const total = nodes?.length ?? 0;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {label ? (
        <div className="text-muted text-sm font-mono mb-3">{label}</div>
      ) : null}

      <div className="overflow-x-auto">
        <div className="flex items-center gap-4 pb-2">
          <AnimatePresence initial={false}>
            {displayItems.map((item, i) => {
              if (item.kind === "ellipsis") {
                const prev = i > 0 ? displayItems[i - 1] : null;
                const next = i < displayItems.length - 1 ? displayItems[i + 1] : null;
                const prevIdx = prev && prev.kind === "node" ? prev.idx : null;
                const nextIdx = next && next.kind === "node" ? next.idx : null;
                const highlightedArrow =
                  (prevIdx !== null && highlightSet.has(prevIdx)) ||
                  (nextIdx !== null && highlightSet.has(nextIdx));

                return (
                  <div key={item.key} className="flex items-center gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.08 }}
                      className="w-[140px] h-[48px] rounded-lg border border-border bg-[#0F0F1A] flex items-center justify-center"
                    >
                      <div className="font-mono text-muted text-[14px]">...</div>
                    </motion.div>
                    {i < displayItems.length - 1 ? (
                      <Arrow highlighted={highlightedArrow} />
                    ) : null}
                  </div>
                );
              }

              const isHighlighted = highlightSet.has(item.idx);
              const isLastRealNode = item.idx === total - 1;

              return (
                <div key={item.idx} className="flex items-center gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.08 }}
                    className={[
                      "h-[48px] rounded-lg border bg-[#0F0F1A] flex items-stretch",
                      "border-[#1E1E2E]",
                      isHighlighted
                        ? "border-[#7C3AED] shadow-[0_0_18px_rgba(124,58,237,0.35)]"
                        : "",
                    ].join(" ")}
                  >
                    <div className="w-[60px] flex items-center justify-center font-mono text-white text-[14px] rounded-l-lg">
                      {String(item.value)}
                    </div>
                    <div
                      className={[
                        "w-[36px] flex items-center justify-center font-mono text-[14px] rounded-r-lg",
                        isLastRealNode ? "text-[#EF4444]" : "text-muted",
                      ].join(" ")}
                    >
                      {isLastRealNode ? "null" : "→"}
                    </div>
                  </motion.div>

                  {i < displayItems.length - 1 ? (
                    (() => {
                      const next = displayItems[i + 1];
                      const nextIdx =
                        next.kind === "node" ? next.idx : null;
                      const highlightedArrow =
                        highlightSet.has(item.idx) ||
                        (nextIdx !== null && highlightSet.has(nextIdx));
                      return (
                        <Arrow highlighted={highlightedArrow} />
                      );
                    })()
                  ) : null}
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

