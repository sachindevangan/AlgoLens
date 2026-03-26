import { motion } from "framer-motion";
import {
  AlignJustify,
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  Binary,
  Calculator,
  Database,
  GalleryHorizontal,
  GitBranch,
  Grid,
  Layers,
  Lightbulb,
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
import { useMemo, type ComponentType } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NEETCODE_PROBLEMS } from "../../data/neetcode";
import { PATTERNS, type Pattern } from "../../data/patterns";

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

function AnimatedPatternVisual({ pattern }: { pattern: Pattern }) {
  if (pattern.slug === "two-pointers") {
    return (
      <svg viewBox="0 0 320 100" className="w-full h-28">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={20 + i * 35} y={42} width={24} height={18} rx={4} fill="#1E1E2E" />
        ))}
        <motion.circle
          cx={32}
          cy={35}
          r={7}
          fill="#06B6D4"
          animate={{ cx: [32, 145, 32] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.circle
          cx={285}
          cy={35}
          r={7}
          fill="#06B6D4"
          animate={{ cx: [285, 175, 285] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (pattern.slug === "sliding-window") {
    return (
      <svg viewBox="0 0 360 100" className="w-full h-28">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={14 + i * 33} y={42} width={24} height={18} rx={4} fill="#1E1E2E" />
        ))}
        <motion.rect
          x={14}
          y={38}
          width={66}
          height={26}
          rx={6}
          fill="#7C3AED44"
          stroke="#7C3AED"
          animate={{ x: [14, 210, 14], width: [66, 100, 66] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (pattern.slug === "binary-search") {
    return (
      <svg viewBox="0 0 360 110" className="w-full h-28">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={14 + i * 33} y={48} width={24} height={18} rx={4} fill="#1E1E2E" />
        ))}
        <motion.circle
          cy={35}
          r={6}
          fill="#06B6D4"
          animate={{ cx: [20, 130, 20] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.circle
          cy={35}
          r={6}
          fill="#F59E0B"
          animate={{ cx: [180, 180, 180] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.circle
          cy={35}
          r={6}
          fill="#EF4444"
          animate={{ cx: [340, 230, 340] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      </svg>
    );
  }

  if (pattern.slug === "trees") {
    const order = [0, 1, 2];
    const positions = [
      { x: 160, y: 24 },
      { x: 110, y: 72 },
      { x: 210, y: 72 },
    ];
    return (
      <svg viewBox="0 0 320 110" className="w-full h-28">
        <line x1="160" y1="24" x2="110" y2="72" stroke="#1E1E2E" strokeWidth="2" />
        <line x1="160" y1="24" x2="210" y2="72" stroke="#1E1E2E" strokeWidth="2" />
        {positions.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={11}
            fill="#0F0F1A"
            stroke="#1E1E2E"
            strokeWidth={2}
            animate={{
              stroke: ["#1E1E2E", "#06B6D4", "#1E1E2E"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: order[i] * 0.35,
            }}
          />
        ))}
      </svg>
    );
  }

  if (pattern.slug === "graphs") {
    const pts = [
      [160, 20],
      [240, 48],
      [210, 94],
      [110, 94],
      [80, 48],
    ];
    return (
      <svg viewBox="0 0 320 120" className="w-full h-28">
        {pts.map((p, i) => {
          const q = pts[(i + 1) % pts.length];
          return (
            <motion.line
              key={`${i}-line`}
              x1={p[0]}
              y1={p[1]}
              x2={q[0]}
              y2={q[1]}
              stroke="#1E1E2E"
              strokeWidth={2}
              animate={{ stroke: ["#1E1E2E", "#06B6D4", "#1E1E2E"] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
            />
          );
        })}
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={8} fill="#0F0F1A" stroke="#2D2D3D" strokeWidth={2} />
        ))}
      </svg>
    );
  }

  if (pattern.slug === "1d-dynamic-programming") {
    return (
      <svg viewBox="0 0 320 100" className="w-full h-28">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.rect
            key={i}
            x={20 + i * 35}
            y={42}
            width={24}
            height={18}
            rx={4}
            initial={{ fill: "#1E1E2E" }}
            animate={{ fill: ["#1E1E2E", "#7C3AED", "#1E1E2E"] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.15,
            }}
          />
        ))}
      </svg>
    );
  }

  const Icon = iconMap[pattern.icon] ?? Database;
  return (
    <motion.div
      animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
      className="w-16 h-16 rounded-xl flex items-center justify-center"
      style={{
        background: `${pattern.color}22`,
        boxShadow: `0 0 20px ${pattern.color}44`,
      }}
    >
      <Icon size={30} style={{ color: pattern.color }} />
    </motion.div>
  );
}

function difficultyClass(diff: Pattern["difficulty"]) {
  if (diff === "beginner") return "bg-[#10B98122] text-[#10B981] border-[#10B98155]";
  if (diff === "advanced") return "bg-[#EF444422] text-[#EF4444] border-[#EF444455]";
  return "bg-[#F59E0B22] text-[#F59E0B] border-[#F59E0B55]";
}

function problemDifficultyColor(difficulty: "easy" | "medium" | "hard") {
  if (difficulty === "easy") return "bg-[#10B981]";
  if (difficulty === "hard") return "bg-[#EF4444]";
  return "bg-[#F59E0B]";
}

export default function PatternDetailPage() {
  const { patternSlug } = useParams<{ patternSlug: string }>();
  const navigate = useNavigate();

  const pattern = useMemo(
    () => PATTERNS.find((p) => p.slug === patternSlug),
    [patternSlug],
  );

  if (!pattern) {
    return (
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-white">Pattern not found</h1>
      </div>
    );
  }

  const Icon = iconMap[pattern.icon] ?? Database;
  const problems = NEETCODE_PROBLEMS[pattern.slug] ?? [];

  return (
    <div className="px-6 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[38%_62%] gap-6">
        <div className="xl:sticky xl:top-6 self-start rounded-xl border border-border bg-surface p-5">
          <button
            type="button"
            onClick={() => navigate("/patterns")}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Patterns
          </button>

          <div
            className="mt-4 w-[52px] h-[52px] rounded-xl flex items-center justify-center"
            style={{ background: `${pattern.color}22` }}
          >
            <Icon size={28} style={{ color: pattern.color }} />
          </div>
          <h1 className="mt-3 text-2xl font-bold text-white">{pattern.title}</h1>
          <span
            className={`mt-2 inline-block px-2.5 py-1 rounded-full border text-xs capitalize ${difficultyClass(pattern.difficulty)}`}
          >
            {pattern.difficulty}
          </span>

          <div className="my-4 border-t border-border" />

          <div className="rounded-lg border border-[#F59E0B33] bg-[#F59E0B14] p-3">
            <div className="flex items-center gap-2 text-[#F59E0B] text-sm font-medium">
              <Lightbulb size={16} />
              Key Insight
            </div>
            <p className="mt-1 text-sm text-white leading-relaxed">{pattern.keyInsight}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-white text-sm font-medium">When to Use</h3>
            <div className="mt-2 space-y-2">
              {pattern.whenToUse.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-border bg-[#0F0F1A] px-3 py-2 text-sm text-muted flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-full px-3 py-1 text-xs bg-[#06B6D422] text-[#06B6D4] border border-[#06B6D455]">
              Time: {pattern.timeComplexity}
            </div>
            <div className="rounded-full px-3 py-1 text-xs bg-[#7C3AED22] text-[#8B5CF6] border border-[#7C3AED55]">
              Space: {pattern.spaceComplexity}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-border bg-[#0F0F1A] p-3">
            <AnimatedPatternVisual pattern={pattern} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="border-b border-border pb-3">
            <button
              type="button"
              className="px-3 py-1 rounded-full text-sm bg-[#7C3AED22] text-[#8B5CF6] border border-[#7C3AED55]"
            >
              Problems
            </button>
          </div>

          <div className="mt-1">
            {problems.map((problem) => (
              <button
                type="button"
                key={problem.slug}
                onClick={() => navigate(`/neetcode/${problem.slug}`)}
                className="w-full flex items-center justify-between px-2 py-3 border-b border-border hover:bg-[#0F0F1A] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${problemDifficultyColor(problem.difficulty)}`} />
                  <span className="text-white hover:text-[#8B5CF6] transition-colors">
                    {problem.title}
                  </span>
                </div>
                <ArrowRight size={16} className="text-muted" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

