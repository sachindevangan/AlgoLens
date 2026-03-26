import { useEffect, useMemo, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useTraceStore } from "../../store/traceStore";

type CodeEditorProps = {
  value: string;
  onChange: (val: string) => void;
  readOnly?: boolean;
};

type IStandaloneCodeEditor = import("monaco-editor").editor.IStandaloneCodeEditor;
type MonacoNamespace = typeof import("monaco-editor");

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
}: CodeEditorProps) {
  const theme = useMemo(() => "algolens-dark", []);
  const trace = useTraceStore((s) => s.trace);
  const currentStep = useTraceStore((s) => s.currentStep);
  const currentLine = trace?.steps[currentStep]?.line ?? null;

  const editorInstanceRef = useRef<IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<MonacoNamespace | null>(null);
  const decorationIdsRef = useRef<string[]>([]);

  useEffect(() => {
    const editor = editorInstanceRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    if (!currentLine || currentLine <= 0) {
      editor.deltaDecorations(decorationIdsRef.current, []);
      decorationIdsRef.current = [];
      return;
    }

    const range = new monaco.Range(currentLine, 1, currentLine, 1);
    decorationIdsRef.current = editor.deltaDecorations(decorationIdsRef.current, [
      {
        range,
        options: {
          isWholeLine: true,
          className: "current-line-highlight",
          glyphMarginClassName: "current-line-highlight-gutter",
        },
      },
    ]);
  }, [currentLine]);

  return (
    <div className="h-full rounded-xl overflow-hidden border border-border bg-surface">
      <Editor
        value={value}
        language="python"
        theme={theme}
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
          smoothScrolling: true,
          scrollBeyondLastLine: false,
          readOnly,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 14,
          lineHeight: 22,
          automaticLayout: true,
        }}
        height="100%"
        onChange={(val) => onChange(val ?? "")}
        onMount={(editor, monaco) => {
          editorInstanceRef.current = editor;
          monacoRef.current = monaco;

          const { editor: editorApi } = monaco;

          editorApi.defineTheme("algolens-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [
              { token: "keyword", foreground: "#8B5CF6" },
              { token: "string", foreground: "#10B981" },
              { token: "number", foreground: "#F59E0B" },
              { token: "comment", foreground: "#64748B" },
              { token: "function", foreground: "#06B6D4" },
              { token: "operator", foreground: "#E2E8F0" },
            ],
            colors: {
              "editor.background": "#08080F",
              "editor.foreground": "#E2E8F0",
              "editor.lineHighlightBackground": "#0F0F1A",
              "editor.selectionBackground": "#7C3AED33",
            },
          });

          editorApi.setTheme("algolens-dark");
          editor.focus();
        }}
      />
    </div>
  );
}

