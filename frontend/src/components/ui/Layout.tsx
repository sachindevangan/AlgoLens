import type { ComponentType } from "react";
import { Eye, BookOpen, Code2, Terminal } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

type NavItem = {
  to: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  end?: boolean;
};

export default function Layout() {
  const location = useLocation();

  const navItems: NavItem[] = [
    { to: "/playground", label: "Playground", Icon: Terminal, end: true },
    { to: "/patterns", label: "Patterns", Icon: BookOpen },
    { to: "/neetcode", label: "NeetCode 150", Icon: Code2 },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <aside className="fixed left-0 top-0 h-screen w-[240px] border-r border-border bg-surface flex flex-col">
        <div className="px-6 py-5 flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          <div className="text-lg font-semibold font-mono text-primary">
            AlgoLens
          </div>
        </div>

        <nav className="flex-1 px-2 mt-2 flex flex-col gap-1">
          {navItems.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  "group relative flex items-center gap-3 px-5 py-2 rounded-none transition-colors",
                  isActive ? "bg-surface text-white" : "text-muted hover:text-white hover:bg-surface",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute left-0 top-0 h-full w-[3px] bg-primary"
                    />
                  ) : null}
                  <Icon
                    className={
                      isActive
                        ? "h-4 w-4 text-white"
                        : "h-4 w-4 text-muted group-hover:text-white"
                    }
                  />
                  <span className="text-sm font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-sm text-white">Backend connected</span>
          </div>
          <div className="mt-3 text-[11px] text-muted font-mono">
            Built for interview prep
          </div>
        </div>
      </aside>

      <main className="ml-[240px] w-[calc(100vw-240px)] h-screen overflow-y-auto border-t border-border">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-6"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

