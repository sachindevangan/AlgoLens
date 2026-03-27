import { useEffect } from "react";
import { useTraceStore } from "../store/traceStore";

function shouldSkipTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea") return true;
  if (target.classList.contains("monaco-editor")) return true;
  if (target.closest(".monaco-editor")) return true;
  return false;
}

export function useKeyboardShortcuts() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (shouldSkipTarget(event.target)) return;

      const traceLoaded = Boolean(useTraceStore.getState().trace);
      const key = event.key;

      if ((event.ctrlKey || event.metaKey) && key === "Enter") {
        event.preventDefault();
        window.dispatchEvent(new CustomEvent("algolens:run"));
        return;
      }

      if (!traceLoaded) return;

      if (key === "ArrowRight") {
        event.preventDefault();
        useTraceStore.getState().nextStep();
        return;
      }

      if (key === "ArrowLeft") {
        event.preventDefault();
        useTraceStore.getState().prevStep();
        return;
      }

      if (key === " ") {
        event.preventDefault();
        const { isPlaying, setIsPlaying } = useTraceStore.getState();
        setIsPlaying(!isPlaying);
        return;
      }

      if (key === "Escape") {
        event.preventDefault();
        useTraceStore.getState().setIsPlaying(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
