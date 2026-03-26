import { motion, AnimatePresence } from "framer-motion";

type StackVisualizerProps = {
  values: (number | string)[];
  label?: string;
};

export default function StackVisualizer({ values, label }: StackVisualizerProps) {
  const display = values.map((v, idx) => ({ v, idx })).reverse(); // newest on top

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {label ? (
        <div className="text-muted text-sm font-mono mb-3">{label}</div>
      ) : null}

      <div className="flex flex-col items-center">
        {display.length === 0 ? (
          <motion.div
            className="w-[200px] h-[44px] border border-border border-dashed rounded-[6px] flex items-center justify-center text-muted font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            animate-pulse
          >
            Push elements to fill the stack
          </motion.div>
        ) : (
          <AnimatePresence initial={false}>
            {display.map((item, displayIndex) => {
              const isTop = displayIndex === 0;
              return (
                <motion.div
                  key={item.idx}
                  layout="position"
                  initial={{ opacity: 0, y: -30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={[
                    "w-[200px] h-[44px] rounded-[6px] border border-border bg-surface flex items-center",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "h-[44px] w-[3px] rounded-l-[6px] bg-primary",
                      isTop
                        ? "bg-cyan shadow-[0_0_12px_#06B6D422]"
                        : "bg-primary",
                    ].join(" ")}
                  />

                  <div className="flex-1 flex items-center justify-center font-mono text-white text-[14px]">
                    {String(item.v)}
                  </div>

                  {isTop ? (
                    <div className="mr-2 px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-[10px] font-mono">
                      TOP
                    </div>
                  ) : null}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        <div className="w-[200px] mt-3 flex flex-col items-center">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent rounded-full" />
          <div className="text-primary/70 text-[10px] font-mono mt-1">STACK</div>
        </div>
      </div>
    </div>
  );
}

