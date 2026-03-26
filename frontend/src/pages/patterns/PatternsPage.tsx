import { motion } from "framer-motion";
import {
  AlignJustify,
  ArrowLeftRight,
  ArrowRight,
  Binary,
  Calculator,
  Database,
  GalleryHorizontal,
  GitBranch,
  Grid,
  Layers,
  Link,
  Network,
  Search,
  TreePine,
  Triangle,
  TrendingUp,
  Type,
  Waypoints,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { NEETCODE_PROBLEMS } from "../../data/neetcode";
import { PATTERNS } from "../../data/patterns";

const iconMap: Record<string, ComponentType<any>> = {
  Database,
  ArrowLeftRight,
  GalleryHorizontal,
  Layers,
  Search,
  Link,
  TreePine,
  Triangle,
  GitBranch,
  Type,
  Network,
  Waypoints,
  TrendingUp,
  Grid,
  Zap,
  AlignJustify,
  Calculator,
  Binary,
};

function difficultyClass(diff: string) {
  if (diff === "beginner") return "bg-[#10B98122] text-[#10B981] border-[#10B98155]";
  if (diff === "advanced") return "bg-[#EF444422] text-[#EF4444] border-[#EF444455]";
  return "bg-[#F59E0B22] text-[#F59E0B] border-[#F59E0B55]";
}

export default function PatternsPage() {
  const navigate = useNavigate();
  const totalProblems = Object.values(NEETCODE_PROBLEMS).reduce(
    (sum, items) => sum + items.length,
    0,
  );

  return (
    <div className="px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white">Pattern Library</h1>
        <p className="mt-2 text-muted text-base">
          Master the 18 patterns that crack any DSA interview
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            `${PATTERNS.length} Patterns`,
            `${totalProblems} Problems`,
            "NeetCode 150 Coverage",
          ].map((label, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1, duration: 0.25 }}
              className="px-3 py-1 rounded-full bg-surface border border-border text-xs text-muted"
            >
              {label}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {PATTERNS.map((pattern, index) => {
            const Icon = iconMap[pattern.icon] ?? Database;
            return (
              <motion.button
                key={pattern.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/patterns/${pattern.slug}`)}
                className="group text-left bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl p-5 h-full flex flex-col"
                style={{ boxShadow: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${pattern.color}66`;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${pattern.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1E1E2E";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: `${pattern.color}26` }}
                  >
                    <Icon size={18} style={{ color: pattern.color }} />
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-xs capitalize ${difficultyClass(pattern.difficulty)}`}
                  >
                    {pattern.difficulty}
                  </span>
                </div>

                <h3 className="mt-3 text-white text-base font-semibold">{pattern.title}</h3>
                <p className="mt-1.5 text-[13px] text-muted line-clamp-2">{pattern.keyInsight}</p>

                <div className="mt-auto pt-3 flex items-center justify-between">
                  <span className="text-xs text-muted">{pattern.problemCount} problems</span>
                  <motion.div
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    initial={false}
                  >
                    <ArrowRight size={16} className="text-muted" />
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

