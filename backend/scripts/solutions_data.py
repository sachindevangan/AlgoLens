"""
Solutions loader for backend QA scripts.

Reads `frontend/src/data/solutions.ts` and extracts all Python solution strings
from both:
- the initial exported `SOLUTIONS` object literal
- later `SOLUTIONS["slug"] = `...`` assignments

Exports:
  SOLUTIONS: dict[str, str]
"""

from __future__ import annotations

import os
import re
from typing import Dict


def _repo_root() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def _read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def load_solutions() -> Dict[str, str]:
    root = _repo_root()
    solutions_path = os.path.join(root, "frontend", "src", "data", "solutions.ts")
    ts = _read_text(solutions_path)

    out: dict[str, str] = {}

    # 1) Object-literal entries: "slug": `...`
    for m in re.finditer(r'"([^"]+)"\s*:\s*`([\s\S]*?)`\s*,', ts):
        slug = m.group(1)
        code = m.group(2)
        out[slug] = code

    # 2) Assignments: SOLUTIONS["slug"] = `...`;
    for m in re.finditer(r'SOLUTIONS\["([^"]+)"\]\s*=\s*`([\s\S]*?)`;\s*', ts):
        slug = m.group(1)
        code = m.group(2)
        out[slug] = code

    return out


SOLUTIONS: Dict[str, str] = load_solutions()

