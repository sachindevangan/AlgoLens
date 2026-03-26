import { useMemo } from "react";
import { useTraceStore } from "../../store/traceStore";
import ArrayVisualizer from "./ArrayVisualizer";
import StackVisualizer from "./StackVisualizer";
import HashmapVisualizer from "./HashmapVisualizer";
import TreeVisualizer from "./TreeVisualizer";
import GraphVisualizer from "./GraphVisualizer";
import GridVisualizer from "./GridVisualizer";
import LinkedListVisualizer, {
  flattenLinkedList,
} from "./LinkedListVisualizer";

type VisualizerRouterProps = {
  detectedTypes: Record<string, string>;
};

type RenderType =
  | "array"
  | "stack"
  | "hashmap"
  | "tree"
  | "linkedlist"
  | "graph"
  | "array2d";

type VisualizableVar = {
  name: string;
  value: unknown;
  vizType: RenderType;
  badgeType: string;
};

type PointerCandidate = { name: string; value: number };
type TreeLikeNode = { val: unknown; left?: unknown; right?: unknown };

function isIntegerNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v);
}

function isTreeLikeNode(v: unknown): v is TreeLikeNode {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    "val" in (v as Record<string, unknown>)
  );
}

function toPrimitiveArray(
  v: unknown,
): (number | string | null)[] | null {
  if (!Array.isArray(v)) return null;
  return v.map((item) => {
    if (item === null) return null;
    if (typeof item === "number") return item;
    if (typeof item === "string") return item;
    if (typeof item === "boolean") return String(item);
    return String(item);
  });
}

function toStringStack(v: unknown): (number | string)[] | null {
  if (!Array.isArray(v)) return null;
  return v.map((item) => {
    if (typeof item === "number" || typeof item === "string") return item;
    if (typeof item === "boolean") return String(item);
    return String(item);
  });
}

function toHashmap(v: unknown): Record<string, unknown> | null {
  if (typeof v !== "object" || v === null) return null;
  if (Array.isArray(v)) return null;
  return v as Record<string, unknown>;
}

const pointerNames = [
  "i",
  "j",
  "left",
  "right",
  "lo",
  "hi",
  "mid",
  "start",
  "end",
  "slow",
  "fast",
  "ptr",
  "head",
  "tail",
  "top",
  "bot",
  "p",
  "q",
  "l",
  "r",
] as const;

const pointerColors = ["#06B6D4", "#F59E0B", "#10B981"] as const;

export default function VisualizerRouter({
  detectedTypes,
}: VisualizerRouterProps) {
  const trace = useTraceStore((s) => s.trace);
  const currentStep = useTraceStore((s) => s.currentStep);

  const variables = trace?.steps[currentStep]?.variables ?? null;

  const pointerIntValues = useMemo(() => {
    if (!variables) return [];
    const record = variables as Record<string, unknown>;
    const out: number[] = [];
    for (const pointerName of pointerNames) {
      if (!(pointerName in record)) continue;
      const v = record[pointerName];
      if (isIntegerNumber(v)) out.push(v);
    }
    return out;
  }, [variables]);

  const visualizable = useMemo(() => {
    if (!variables) return [];
    const record = variables as Record<string, unknown>;

    const out: VisualizableVar[] = [];

    const isPrimitive =
      (val: unknown): val is number | boolean | string =>
        typeof val === "number" || typeof val === "boolean" || typeof val === "string";

    const isPlainObject = (val: unknown): val is Record<string, unknown> =>
      typeof val === "object" && val !== null && !Array.isArray(val);

    const shouldSkipValue = (val: unknown): boolean => {
      if (val === null || val === undefined) return true;
      if (typeof val === "string" && val.includes("<function>")) return true;
      if (isPrimitive(val)) return true;
      return false;
    };

    for (const [name, value] of Object.entries(record)) {
      if (shouldSkipValue(value)) continue;

      const detectedType = detectedTypes[name];

      const renderAsArray =
        Array.isArray(value) && value.length > 0;
      const renderAsHashmap =
        isPlainObject(value) && Object.keys(value).length > 0;

      // Detected type takes priority.
      if (detectedType) {
        if (detectedType === "unknown") continue;

        if (detectedType === "array" || detectedType === "queue") {
          if (!renderAsArray) continue;
          out.push({
            name,
            value,
            vizType: "array",
            badgeType: detectedType,
          });
          continue;
        }

        if (detectedType === "stack") {
          if (!renderAsArray) continue;
          out.push({
            name,
            value,
            vizType: "stack",
            badgeType: detectedType,
          });
          continue;
        }

        if (detectedType === "hashmap") {
          if (!renderAsHashmap) continue;
          out.push({
            name,
            value,
            vizType: "hashmap",
            badgeType: detectedType,
          });
          continue;
        }

        if (detectedType === "array2d") {
          if (!renderAsArray) continue;
          out.push({
            name,
            value,
            vizType: "array2d",
            badgeType: detectedType,
          });
          continue;
        }

        if (detectedType === "tree") {
          if (!isPlainObject(value)) continue;
          out.push({ name, value, vizType: "tree", badgeType: detectedType });
          continue;
        }

        if (detectedType === "linkedlist") {
          if (!isPlainObject(value)) continue;
          out.push({
            name,
            value,
            vizType: "linkedlist",
            badgeType: detectedType,
          });
          continue;
        }

        if (detectedType === "graph") {
          if (!isPlainObject(value)) continue;
          out.push({ name, value, vizType: "graph", badgeType: detectedType });
          continue;
        }

        // Unrecognized detected type -> skip
        continue;
      }

      // Fallback inference if the variable name is not present in detectedTypes.
      if (Array.isArray(value)) {
        if (value.length === 0) continue;
        out.push({ name, value, vizType: "array", badgeType: "array" });
        continue;
      }

      if (isPlainObject(value)) {
        if (Object.keys(value).length === 0) continue;
        out.push({ name, value, vizType: "hashmap", badgeType: "hashmap" });
      }
    }

    return out;
  }, [variables, detectedTypes]);

  const pointersByArrayVar = useMemo(() => {
    if (!variables) return new Map<string, PointerCandidate[]>();

    const record = variables as Record<string, unknown>;
    const candidates: PointerCandidate[] = [];
    for (const pointerName of pointerNames) {
      if (!(pointerName in record)) continue;
      const v = record[pointerName];
      if (!isIntegerNumber(v)) continue;
      candidates.push({ name: pointerName, value: v });
    }

    const arrays = visualizable.filter((x) => x.vizType === "array");

    const map = new Map<string, PointerCandidate[]>();
    for (const arr of arrays) {
      const asArray = toPrimitiveArray(arr.value);
      if (!asArray) continue;

      const match = candidates
        .filter((c) => c.value >= 0 && c.value < asArray.length)
        .slice(0, pointerColors.length);

      map.set(arr.name, match);
    }

    return map;
  }, [variables, visualizable]);

  if (!visualizable.length) return null;

  return (
    <div className="h-full overflow-y-auto pb-24 pr-2">
      <div className="flex flex-col gap-6">
        {visualizable.map(({ name, value, vizType, badgeType }) => {
          const t = vizType;
          const pointersForVar = pointersByArrayVar.get(name) ?? [];
          const record = variables as Record<string, unknown>;

          const pointers =
            pointersForVar.length > 0
              ? pointersForVar.map((p, idx) => ({
                  name: p.name,
                  index: p.value,
                  color: pointerColors[idx] ?? pointerColors[0],
                }))
              : undefined;

          const highlightIndices =
            pointers?.length
              ? pointers.map((p) => ({
                  index: p.index,
                  color: p.color,
                  label: p.name,
                }))
              : undefined;

          const linkedNodes =
            t === "linkedlist"
              ? flattenLinkedList(
                  value as unknown as { val: unknown; next?: unknown } | null,
                )
              : null;

          const linkedHighlightIndices =
            t === "linkedlist" && linkedNodes
              ? pointerIntValues.filter(
                  (idx) => idx >= 0 && idx < linkedNodes.length,
                )
              : undefined;

          const treeHighlightValues =
            t === "tree"
              ? (() => {
                  const highlighted: unknown[] = [];
                  const visitLikeNames = ["node", "curr", "current", "visiting"];
                  for (const candidateName of visitLikeNames) {
                    const candidateValue = record[candidateName];
                    if (isTreeLikeNode(candidateValue)) {
                      highlighted.push(candidateValue.val);
                    }
                  }

                  // During initial construction, briefly highlight root if present.
                  if (currentStep <= 4) {
                    const rootValue = record.root;
                    if (isTreeLikeNode(rootValue)) highlighted.push(rootValue.val);
                  }

                  return highlighted;
                })()
              : [];

          return (
            <div key={name} className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-cyan font-mono text-sm truncate">
                  {name}
                </div>
                <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-mono">
                  {badgeType}
                </div>
              </div>

              {t === "array" ? (
                <ArrayVisualizer
                  values={toPrimitiveArray(value) ?? []}
                  pointers={pointers}
                  highlightIndices={highlightIndices}
                />
              ) : null}

              {t === "stack" ? (
                <StackVisualizer
                  values={toStringStack(value) ?? []}
                />
              ) : null}

              {t === "hashmap" ? (
                <HashmapVisualizer
                  data={toHashmap(value) ?? {}}
                />
              ) : null}

              {t === "tree" ? (
                <TreeVisualizer
                  treeData={
                    (value as { val: unknown; left?: unknown; right?: unknown }) ??
                    null
                  }
                  highlightValues={treeHighlightValues}
                  label={undefined}
                />
              ) : null}

              {t === "linkedlist" ? (
                <LinkedListVisualizer
                  nodes={linkedNodes}
                  label={undefined}
                  highlightIndices={linkedHighlightIndices}
                />
              ) : null}

              {t === "graph" ? (
                <GraphVisualizer
                  adjacencyList={
                    (value as Record<string, (string | number)[]>) ?? {}
                  }
                  directed={
                    name.toLowerCase().includes("directed") ||
                    name.toLowerCase().includes("digraph")
                  }
                  highlightNodes={pointerIntValues}
                  label={undefined}
                />
              ) : null}

              {t === "array2d" ? (
                <GridVisualizer
                  grid={value as unknown[][]}
                  label={undefined}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

