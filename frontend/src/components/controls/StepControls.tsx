import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import { useTraceStore } from "../../store/traceStore";

const speedOptions = [
  { key: "0.5x", mult: 0.5 },
  { key: "1x", mult: 1 },
  { key: "2x", mult: 2 },
  { key: "4x", mult: 4 },
] as const;

export default function StepControls() {
  const trace = useTraceStore((s) => s.trace);
  const currentStep = useTraceStore((s) => s.currentStep);
  const isPlaying = useTraceStore((s) => s.isPlaying);
  const playSpeed = useTraceStore((s) => s.playSpeed);

  const nextStep = useTraceStore((s) => s.nextStep);
  const prevStep = useTraceStore((s) => s.prevStep);
  const setIsPlaying = useTraceStore((s) => s.setIsPlaying);
  const setCurrentStep = useTraceStore((s) => s.setCurrentStep);
  const setPlaySpeed = useTraceStore((s) => s.setPlaySpeed);

  const totalSteps = trace?.total_steps ?? 0;
  const lastIndex = trace ? Math.max(0, trace.steps.length - 1) : 0;
  const stepLabel =
    trace && totalSteps > 0 ? `Step ${currentStep + 1} / ${totalSteps}` : `Step 0 / 0`;

  const progress = trace && totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  useEffect(() => {
    if (!trace || !isPlaying) return;
    const intervalId = window.setInterval(() => {
      const { currentStep: cs, setIsPlaying: setPlay } = useTraceStore.getState();
      if (cs >= lastIndex) {
        setPlay(false);
        return;
      }
      useTraceStore.getState().nextStep();
      const afterStep = useTraceStore.getState().currentStep;
      if (afterStep >= lastIndex) {
        useTraceStore.getState().setIsPlaying(false);
      }
    }, playSpeed);

    return () => window.clearInterval(intervalId);
  }, [isPlaying, playSpeed, trace, lastIndex]);

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-surface">
      <div className="h-[2px] bg-[#1E1E2E]">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-cyan"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>

      <div
        className={[
          "px-4 py-3 flex items-center justify-between gap-4",
          trace ? "opacity-100" : "opacity-40 pointer-events-none",
        ].join(" ")}
      >
        <motion.div
          key={`step-${currentStep}`}
          className="text-sm text-muted font-mono flex items-center gap-3"
          initial={{ opacity: 0, y: 4, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.08, 1] }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <span>{stepLabel}</span>
          {isPlaying ? (
            <motion.span
              className="text-[11px] text-muted font-mono"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              ▶ Playing
            </motion.span>
          ) : null}
        </motion.div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => setCurrentStep(0)}
            whileTap={{ scale: 0.95 }}
            className="h-9 px-3 rounded-md bg-surface border border-border text-text hover:bg-surface active:scale-95"
          >
            <SkipBack className="h-4 w-4" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => prevStep()}
            whileTap={{ scale: 0.95 }}
            className="h-9 w-9 rounded-md bg-surface border border-border text-text hover:bg-surface active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            whileTap={{ scale: 0.95 }}
            className="h-9 w-9 rounded-md bg-surface border border-border text-text hover:bg-surface active:scale-95"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </motion.button>
          <motion.button
            type="button"
            onClick={() => nextStep()}
            whileTap={{ scale: 0.95 }}
            className="h-9 w-9 rounded-md bg-surface border border-border text-text hover:bg-surface active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setCurrentStep(lastIndex)}
            whileTap={{ scale: 0.95 }}
            className="h-9 px-3 rounded-md bg-surface border border-border text-text hover:bg-surface active:scale-95"
          >
            <SkipForward className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-muted font-mono">Speed</div>
          <div className="flex items-center border border-border rounded-full overflow-hidden">
            {speedOptions.map((opt) => {
              const active =
                Math.round(playSpeed) === Math.round(500 / opt.mult);
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setPlaySpeed(Math.round(500 / opt.mult))}
                  className={[
                    "px-3 py-1.5 text-sm font-mono transition-colors",
                    active
                      ? "bg-primary text-white"
                      : "bg-surface text-muted hover:text-white",
                  ].join(" ")}
                >
                  {opt.key}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

