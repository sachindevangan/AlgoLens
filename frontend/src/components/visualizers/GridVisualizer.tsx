import { motion } from "framer-motion";
import { useMemo, useRef } from "react";

type HighlightCell = { row: number; col: number; color: string };

export type GridVisualizerProps = {
  grid: unknown[][];
  highlightCells?: HighlightCell[];
  label?: string;
};

function safeCellValue(v: unknown): string {
  if (v === null) return "null";
  if (v === undefined) return "";
  return String(v);
}

function clampCellSize(cols: number): number {
  // max(36px, min(56px, 400/cols))
  const raw = Math.floor(400 / Math.max(1, cols));
  return Math.max(36, Math.min(56, raw));
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.trim().toLowerCase();
  if (!h.startsWith("#")) return `rgba(124,58,237,${alpha})`;
  const normalized = h.slice(1);
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const intVal = Number.parseInt(full, 16);
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function GridVisualizer({
  grid,
  highlightCells = [],
  label,
}: GridVisualizerProps) {
  const rows = grid.length;
  const cols = rows > 0 ? grid[0]?.length ?? 0 : 0;

  if (rows === 0 || cols === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        {label ? (
          <div className="text-muted text-sm font-mono mb-3">{label}</div>
        ) : null}
        <div className="text-muted font-mono">Empty Grid</div>
      </div>
    );
  }

  if (rows > 15 || cols > 15) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4 overflow-hidden">
        {label ? (
          <div className="text-muted text-sm font-mono mb-3">{label}</div>
        ) : null}
        <div className="text-muted font-mono">
          {`Grid too large to display (${rows}x${cols})`}
        </div>
      </div>
    );
  }

  const displayRows = rows;
  const displayCols = cols;
  const cellSize = clampCellSize(displayCols);

  const highlightMap = useMemo(() => {
    const map = new Map<string, HighlightCell>();
    for (const h of highlightCells) {
      map.set(`${h.row}:${h.col}`, h);
    }
    return map;
  }, [highlightCells]);

  const prevRef = useRef<Map<string, string>>(new Map());

  const { valueMap, changedMap } = useMemo(() => {
    const next = new Map<string, string>();
    const changed = new Map<string, boolean>();
    const prev = prevRef.current;

    for (let r = 0; r < displayRows; r += 1) {
      for (let c = 0; c < displayCols; c += 1) {
        const key = `${r}:${c}`;
        const v = safeCellValue(grid[r]?.[c]);
        next.set(key, v);
        changed.set(key, prev.get(key) !== v);
      }
    }
    return { valueMap: next, changedMap: changed };
  }, [grid, displayRows, displayCols]);

  // Update snapshot after render.
  prevRef.current = valueMap;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {label ? (
        <div className="text-muted text-sm font-mono mb-3">{label}</div>
      ) : null}

      <div className="overflow-x-auto">
        <div className="inline-block">
          <div className="relative">
            <div
              className="grid gap-0"
              style={{
                gridTemplateColumns: `40px repeat(${displayCols}, ${cellSize}px)`,
              }}
            >
              {/* Column headers */}
              <div />
              {Array.from({ length: displayCols }, (_, c) => (
                <div
                  key={`h-${c}`}
                  className="h-[22px] flex items-center justify-center text-muted text-[11px] font-mono"
                  style={{ width: cellSize }}
                >
                  {c}
                </div>
              ))}

              {Array.from({ length: displayRows }, (_, r) => (
                <div key={`row-${r}`}>
                  <div className="h-[22px] flex items-center justify-center text-muted text-[11px] font-mono">
                    {r}
                  </div>
                  {Array.from({ length: displayCols }, (_, c) => {
                    const key = `${r}:${c}`;
                    const v = valueMap.get(key) ?? "";
                    const isChanged = changedMap.get(key) ?? false;
                    const h = highlightMap.get(key);
                    const borderColor = h?.color ?? "#1E1E2E";
                    const bg = h ? hexToRgba(h.color, 0.2) : "#0F0F1A";

                    return (
                      <motion.div
                        key={`cell-${r}-${c}`}
                        initial={false}
                        animate={
                          isChanged
                            ? { scale: [1, 1.08, 1], backgroundColor: bg }
                            : { backgroundColor: bg, scale: 1 }
                        }
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="flex items-center justify-center font-mono text-[13px] border border-[#1E1E2E]"
                        style={{
                          width: cellSize,
                          height: cellSize,
                          borderColor,
                          backgroundColor: bg,
                        }}
                      >
                        {v}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

