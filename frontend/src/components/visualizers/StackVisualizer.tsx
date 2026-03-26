import { motion, AnimatePresence } from "framer-motion";

type StackVisualizerProps = {
  values: (number | string)[];
  label?: string;
};

export default function StackVisualizer({ values, label }: StackVisualizerProps) {
  const display = values
    .map((v, idx) => ({ v, idx }))
    .reverse(); // newest item on TOP

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {label ? (
        <div className="text-muted text-sm font-mono mb-3">{label}</div>
      ) : null}

      <div className="flex flex-col items-center">
        {display.length === 0 ? (
          <div className="w-[200px] h-[44px] border border-border border-dashed rounded-[6px] flex items-center justify-center text-muted font-mono text-sm">
            Empty
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {display.map((item, displayIndex) => {
              const isTop = displayIndex === 0;
              return (
                <motion.div
                  key={item.idx}
                  layout="position"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={[
                    "w-[200px] h-[44px] rounded-[6px] border border-border bg-surface flex items-center",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "h-[44px] w-[3px] rounded-l-[6px] bg-primary/100",
                      isTop
                        ? "bg-cyan shadow-[0_0_18px_rgba(6,182,212,0.25)]"
                        : "bg-primary",
                    ].join(" ")}
                  />
                  <div className="flex-1 flex items-center justify-center font-mono text-white text-[14px]">
                    {String(item.v)}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        <div className="w-[200px] mt-3 flex flex-col items-center">
          <div className="h-[2px] bg-border w-full rounded-full" />
          <div className="text-muted text-[10px] font-mono mt-1">STACK</div>
        </div>
      </div>
    </div>
  );
}

