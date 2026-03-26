import { useMemo } from "react";
import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  value: string;
  onChange: (val: string) => void;
  readOnly?: boolean;
};

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
}: CodeEditorProps) {
  const theme = useMemo(() => "algolens-dark", []);

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

