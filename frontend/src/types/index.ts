export interface TraceStep {
  step: number;
  line: number;
  variables: Record<string, unknown>;
  stdout: string[];
  event: "call" | "line" | "return" | "exception";
  function_name: string;
}

export interface TraceResult {
  steps: TraceStep[];
  error: string | null;
  total_steps: number;
}

export type VariableType =
  | "array"
  | "array2d"
  | "stack"
  | "queue"
  | "tree"
  | "linkedlist"
  | "graph"
  | "hashmap"
  | "primitive"
  | "string"
  | "unknown";

export interface DetectedVariable {
  name: string;
  type: VariableType;
  value: unknown;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  pattern: string;
  description: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  starterCode: string;
  solution: string;
}

export interface Pattern {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  problems: Problem[];
}

