import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/ui/Layout";

import PlaygroundPage from "./pages/playground/PlaygroundPage";
import PatternsPage from "./pages/patterns/PatternsPage";
import PatternDetailPage from "./pages/patterns/PatternDetailPage";
import NeetCodePage from "./pages/neetcode/NeetCodePage";
import ProblemPage from "./pages/neetcode/ProblemPage";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/playground" replace />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/patterns" element={<PatternsPage />} />
          <Route
            path="/patterns/:patternSlug"
            element={<PatternDetailPage />}
          />
          <Route path="/neetcode" element={<NeetCodePage />} />
          <Route
            path="/neetcode/:problemSlug"
            element={<ProblemPage />}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

