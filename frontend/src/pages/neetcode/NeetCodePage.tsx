import { motion } from "framer-motion";
import {
  AlignJustify,
  ArrowLeftRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
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
  Binary,
  Calculator,
} from "lucide-react";
import { Fragment, useEffect, useMemo, useState, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { NEETCODE_PROBLEMS } from "../../data/neetcode";
import { PATTERNS } from "../../data/patterns";
import { storage } from "../../lib/storage";

type Diff = "all" | "easy" | "medium" | "hard";

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

export default function NeetCodePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Diff>("all");
  const [patternFilter, setPatternFilter] = useState("all");
  const [completed, setCompleted] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCompleted(storage.getCompletedProblems());
  }, []);

  const grouped = useMemo(() => {
    let globalIndex = 0;
    return PATTERNS.map((pattern) => {
      const source = NEETCODE_PROBLEMS[pattern.slug] ?? [];
      const rows = source
        .map((problem) => {
          globalIndex += 1;
          return { ...problem, index: globalIndex, pattern };
        })
        .filter((p) => {
          const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase());
          const matchesDifficulty = difficulty === "all" || p.difficulty === difficulty;
          const matchesPattern = patternFilter === "all" || pattern.slug === patternFilter;
          return matchesSearch && matchesDifficulty && matchesPattern;
        });
      return { pattern, rows };
    }).filter((group) => group.rows.length > 0);
  }, [query, difficulty, patternFilter]);

  const activeFilters = query.trim() !== "" || difficulty !== "all" || patternFilter !== "all";
  const matchCount = grouped.reduce((sum, g) => sum + g.rows.length, 0);
  const percent = Math.round((completed.length / 150) * 100);

  return (
    <div className="px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[28px] leading-tight font-bold text-white">NeetCode 150</h1>
        <p className="mt-1 text-muted">The definitive problem set for technical interviews</p>

        <div className="mt-4 border border-border rounded-xl bg-surface p-4">
          <div className="flex items-center justify-between text-sm font-mono text-muted">
            <span>{completed.length} / 150 completed</span>
            <span>{percent}%</span>
          </div>
          <div className="mt-2 h-1.5 bg-[#1E1E2E] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
              animate={{ width: `${percent}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems..."
              className="w-[280px] pl-9 pr-3 h-10 rounded-lg bg-surface border border-border text-white placeholder:text-muted outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {(["all", "easy", "medium", "hard"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={[
                  "px-3 h-9 rounded-full border text-sm capitalize",
                  difficulty === d
                    ? "bg-primary text-white border-primary"
                    : "bg-surface text-muted border-border",
                ].join(" ")}
              >
                {d}
              </button>
            ))}
          </div>

          <select
            value={patternFilter}
            onChange={(e) => setPatternFilter(e.target.value)}
            className="h-10 rounded-lg bg-surface border border-border text-white px-3"
          >
            <option value="all">All Patterns</option>
            {PATTERNS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {activeFilters ? (
          <div className="mt-3 text-sm text-muted">{matchCount} problems match</div>
        ) : null}

        <div className="mt-4 border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0F0F1A] border-b border-border">
              <tr className="text-muted text-left">
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Problem</th>
                <th className="px-3 py-2 font-medium">Pattern</th>
                <th className="px-3 py-2 font-medium">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {grouped.map(({ pattern, rows }) => {
                const Icon = iconMap[pattern.icon] ?? Database;
                const isCollapsed = collapsed[pattern.slug] ?? false;
                return (
                  <Fragment key={pattern.slug}>
                    <tr
                      className="bg-[#121220] border-y border-border cursor-pointer"
                      onClick={() =>
                        setCollapsed((prev) => ({ ...prev, [pattern.slug]: !isCollapsed }))
                      }
                    >
                      <td colSpan={5} className="h-11 px-3">
                        <div className="flex items-center gap-2 border-l-2 border-primary pl-2">
                          {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                          <Icon size={14} className="text-primary" />
                          <span className="text-white">{pattern.title}</span>
                          <span className="text-muted text-xs">({rows.length})</span>
                        </div>
                      </td>
                    </tr>
                    {!isCollapsed
                      ? rows.map((problem) => (
                          <tr
                            key={problem.slug}
                            className="h-11 border-b border-[#1E1E2E] hover:bg-surface/80 transition-colors"
                          >
                            <td className="px-3">
                              {completed.includes(problem.slug) ? (
                                <CheckCircle2 size={16} className="text-[#10B981]" />
                              ) : (
                                <Circle size={16} className="text-muted" />
                              )}
                            </td>
                            <td className="px-3 text-muted font-mono">{problem.index}</td>
                            <td className="px-3">
                              <button
                                type="button"
                                onClick={() => navigate(`/neetcode/${problem.slug}`)}
                                className="text-white hover:text-primary transition-colors"
                              >
                                {problem.title}
                              </button>
                            </td>
                            <td className="px-3">
                              <span className="px-2 py-0.5 rounded-full text-xs bg-[#1E1E2E] text-muted">
                                {pattern.title}
                              </span>
                            </td>
                            <td
                              className={[
                                "px-3 capitalize",
                                problem.difficulty === "easy"
                                  ? "text-[#10B981]"
                                  : problem.difficulty === "medium"
                                    ? "text-[#F59E0B]"
                                    : "text-[#EF4444]",
                              ].join(" ")}
                            >
                              {problem.difficulty}
                            </td>
                          </tr>
                        ))
                      : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

