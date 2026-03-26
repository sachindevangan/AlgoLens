import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
  BackgroundVariant,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export type GraphVisualizerProps = {
  adjacencyList: Record<string, (string | number)[]>;
  highlightNodes?: (string | number)[];
  highlightEdges?: [string | number, string | number][];
  directed?: boolean;
  label?: string;
};

type GraphNodeData = { label: string; highlighted: boolean };
type GraphNodeItem = Node<GraphNodeData, "graphNode">;
type GraphNodeViewProps = NodeProps<GraphNodeItem>;

function GraphNodeView(props: GraphNodeViewProps) {
  const { data } = props;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      className={[
        "w-[44px] h-[44px] rounded-full flex items-center justify-center",
        "bg-[#0F0F1A] border-[1.5px] border-[#2D2D3D]",
        "transition-colors",
        data.highlighted
          ? "border-[#7C3AED] shadow-[0_0_0_2px_rgba(124,58,237,0.25),0_0_20px_rgba(124,58,237,0.45)]"
          : "hover:border-[#06B6D4]",
      ].join(" ")}
    >
      <div className="font-mono text-[14px] text-white select-none">
        {data.label}
      </div>
    </motion.div>
  );
}

type LoopNodeData = { label?: string };
type LoopNodeItem = Node<LoopNodeData, "loopNode">;
type LoopNodeViewProps = NodeProps<LoopNodeItem>;

function LoopNodeView(props: LoopNodeViewProps) {
  void props;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-[10px] h-[10px] rounded-full bg-[#7C3AED] shadow-[0_0_16px_rgba(124,58,237,0.55)]"
    />
  );
}

function edgeKey(a: string, b: string) {
  return `${a}::${b}`;
}

function selfLoopNodesKey(nodeId: string) {
  return `loop-${nodeId}`;
}

export default function GraphVisualizer({
  adjacencyList,
  highlightNodes = [],
  highlightEdges,
  directed = false,
  label,
}: GraphVisualizerProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const rfRef = useRef<{ fitView: (opts: { padding: number }) => void } | null>(null);

  const highlightNodeSet = useMemo(
    () => new Set(highlightNodes.map(String)),
    [highlightNodes],
  );

  const nodeTypes = useMemo(
    () => ({
      graphNode: GraphNodeView,
      loopNode: LoopNodeView,
    }),
    [],
  );

  useEffect(() => {
    const record = adjacencyList ?? {};
    const allNodes = new Set<string>();
    for (const [k, vs] of Object.entries(record)) {
      allNodes.add(k);
      vs.forEach((v) => allNodes.add(String(v)));
    }

    const nodeList = Array.from(allNodes);
    const nodeCount = nodeList.length;
    const nextNodes: Node[] = [];
    const nextEdges: Edge[] = [];

    const radius = 150;
    const center = { x: 200, y: 200 };

    const gridCols = Math.ceil(Math.sqrt(Math.max(1, nodeCount)));
    const cell = 180;

    const posById = new Map<string, { x: number; y: number }>();

    nodeList.forEach((id, idx) => {
      if (nodeCount <= 8) {
        const angle = (Math.PI * 2 * idx) / nodeCount;
        posById.set(id, {
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),
        });
      } else {
        const row = Math.floor(idx / gridCols);
        const col = idx % gridCols;
        posById.set(id, { x: 100 + col * cell, y: 100 + row * cell });
      }
    });

    for (const id of nodeList) {
      const highlighted = highlightNodeSet.has(id);
      const pos = posById.get(id) ?? { x: 0, y: 0 };
      nextNodes.push({
        id,
        type: "graphNode",
        position: pos,
        data: { label: id, highlighted },
      });
    }

    const edgeSeen = new Set<string>();

    for (const [from, toList] of Object.entries(record)) {
      for (const to of toList) {
        const toStr = String(to);

        if (from === toStr) {
          // Self-loop: render a small circle above the node.
          const basePos = posById.get(from) ?? { x: 200, y: 200 };
          nextNodes.push({
            id: `${selfLoopNodesKey(from)}-${toStr}-${nextNodes.length}`,
            type: "loopNode",
            position: { x: basePos.x, y: basePos.y - 40 },
            data: {},
          });
          continue;
        }

        if (!directed) {
          const a = from;
          const b = toStr;
          const key = a < b ? edgeKey(a, b) : edgeKey(b, a);
          if (edgeSeen.has(key)) continue;
          edgeSeen.add(key);
        }

        const fromHighlighted =
          highlightNodeSet.has(String(from)) && highlightNodeSet.has(String(toStr));

        const highlight = (() => {
          if (highlightEdges && highlightEdges.length > 0) {
            for (const [a, b] of highlightEdges) {
              if (String(a) === String(from) && String(b) === String(toStr)) return true;
              if (!directed && String(b) === String(from) && String(a) === String(toStr))
                return true;
            }
          }
          // Fallback: highlight edges between highlighted nodes.
          return fromHighlighted;
        })();

        nextEdges.push({
          id: `e-${from}-${toStr}-${nextEdges.length}`,
          source: String(from),
          target: String(toStr),
          animated: highlight,
          markerEnd: directed ? "arrowclosed" : undefined,
          style: highlight
            ? {
                stroke: "#06B6D4",
                strokeWidth: 2.5,
                strokeDasharray: "4 4",
              }
            : {
                stroke: "#2D2D3D",
                strokeWidth: 1.5,
              },
        });
      }
    }

    setNodes(nextNodes);
    setEdges(nextEdges);

    const t = window.setTimeout(() => {
      rfRef.current?.fitView({ padding: 0.3 });
    }, 100);

    return () => window.clearTimeout(t);
  }, [adjacencyList, highlightNodeSet, highlightEdges, directed]);

  if (!adjacencyList || Object.keys(adjacencyList).length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        {label ? (
          <div className="text-muted text-sm font-mono mb-3">{label}</div>
        ) : null}
        <div className="text-muted font-mono">Empty Graph</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-0 overflow-hidden">
      {label ? (
        <div className="px-4 pt-4 text-muted text-sm font-mono">{label}</div>
      ) : null}
      <div className="w-full min-h-[300px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          panOnDrag
          zoomOnScroll
          fitView
          fitViewOptions={{ padding: 0.3 }}
          edgesFocusable={false}
          proOptions={{ hideAttribution: true }}
          onInit={(instance) => {
            rfRef.current = instance as unknown as {
              fitView: (opts: { padding: number }) => void;
            };
          }}
        >
          <Background color="#1E1E2E" gap={20} variant={BackgroundVariant.Dots} />
          <Controls showFitView className="!bg-surface !border-border" />
        </ReactFlow>
      </div>
    </div>
  );
}

