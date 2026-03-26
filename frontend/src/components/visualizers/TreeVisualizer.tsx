import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TreeNodeData = {
  val: unknown;
  left?: unknown;
  right?: unknown;
};

export type TreeVisualizerProps = {
  treeData: TreeNodeData | null;
  highlightValues?: unknown[];
  label?: string;
};

const TreeNodeComponent = ({
  data,
}: {
  data: { val: unknown; highlighted: boolean; visited: boolean };
}) => {
  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          data.highlighted
            ? { scale: [1, 1.1, 1], opacity: 1 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: data.highlighted ? "#0A1A1F" : "#0F0F1A",
          border: data.highlighted ? "2px solid #06B6D4" : "2px solid #2D2D3D",
          boxShadow: data.highlighted
            ? "0 0 0 3px #06B6D444, 0 0 24px #06B6D488"
            : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 15,
          fontWeight: 500,
          color: "#E2E8F0",
          cursor: "default",
          userSelect: "none",
        }}
      >
        {String(data.val)}
      </motion.div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  );
};

const NullNodeComponent = () => {
  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px dashed #1E1E2E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          color: "#64748B",
          background: "transparent",
          userSelect: "none",
        }}
      >
        ∅
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  );
};

const nodeTypes = { treeNode: TreeNodeComponent, nullNode: NullNodeComponent };

function buildTreeLayout(
  node: TreeNodeData | null,
  x: number,
  y: number,
  level: number,
  spread: number,
  nodes: Node[],
  edges: Edge[],
  highlightValues: unknown[],
  parentId?: string,
): string | null {
  void level;
  if (node === null) {
    if (parentId) {
      const nullId = `null-${Math.random().toString(36).slice(2)}`;
      nodes.push({
        id: nullId,
        type: "nullNode",
        position: { x: x - 16, y: y - 16 },
        data: {},
      });
      edges.push({
        id: `e-${parentId}-${nullId}`,
        source: parentId,
        target: nullId,
        type: "straight",
        style: { stroke: "#1E1E2E", strokeWidth: 1 },
        markerEnd: undefined,
      });
    }
    return null;
  }

  const nodeId = `node-${nodes.length}`;
  const isHighlighted = highlightValues?.includes(node.val);
  nodes.push({
    id: nodeId,
    type: "treeNode",
    position: { x: x - 24, y: y - 24 }, // center the 48px node
    data: {
      val: node.val,
      highlighted: isHighlighted ?? false,
      visited: false, // for future use
    },
  });

  if (parentId) {
    edges.push({
      id: `e-${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
      type: "straight",
      style: { stroke: "#2D2D3D", strokeWidth: 1.5 },
      markerEnd: undefined,
    });
  }

  const nextSpread = spread / 2;
  const nextY = y + 90;

  buildTreeLayout(
    (node.left as TreeNodeData | null) ?? null,
    x - spread,
    nextY,
    level + 1,
    nextSpread,
    nodes,
    edges,
    highlightValues,
    nodeId,
  );
  buildTreeLayout(
    (node.right as TreeNodeData | null) ?? null,
    x + spread,
    nextY,
    level + 1,
    nextSpread,
    nodes,
    edges,
    highlightValues,
    nodeId,
  );

  return nodeId;
}

export default function TreeVisualizer({
  treeData,
  highlightValues = [],
  label,
}: TreeVisualizerProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const rfRef = useRef<{ fitView: (opts: { padding: number }) => void } | null>(null);

  useEffect(() => {
    if (!treeData) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const nextNodes: Node[] = [];
    const nextEdges: Edge[] = [];

    buildTreeLayout(
      treeData,
      300,
      50,
      0,
      150,
      nextNodes,
      nextEdges,
      highlightValues,
      undefined,
    );

    console.log("[TreeVisualizer] build", { treeData, nodes: nextNodes, edges: nextEdges });

    setNodes(nextNodes);
    setEdges(nextEdges);

    const t = window.setTimeout(() => {
      rfRef.current?.fitView({ padding: 0.3 });
    }, 100);

    return () => window.clearTimeout(t);
  }, [treeData, highlightValues]);

  useEffect(() => {
    console.log("[TreeVisualizer] state", { treeData, nodes, edges });
  }, [treeData, nodes, edges]);

  if (!treeData) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        {label ? (
          <div className="text-muted text-sm font-mono mb-3">{label}</div>
        ) : null}
        <div className="text-muted font-mono">Empty Tree</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-0 overflow-hidden">
      {label ? (
        <div className="px-4 pt-4 text-muted text-sm font-mono">{label}</div>
      ) : null}
      <div style={{ width: "100%", height: "380px", position: "relative" }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            panOnDrag
            zoomOnScroll
            edgesFocusable={false}
            proOptions={{ hideAttribution: true }}
            onInit={(instance) => {
              rfRef.current = instance as unknown as {
                fitView: (opts: { padding: number }) => void;
              };
            }}
          >
            <Background color="#1E1E2E" gap={20} variant={BackgroundVariant.Dots} />
            <Controls
              style={{
                background: "#0F0F1A",
                border: "1px solid #1E1E2E",
                borderRadius: 8,
              }}
            />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

