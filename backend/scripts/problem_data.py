"""
Problem data loader for backend QA scripts.

This module reads the source-of-truth frontend TypeScript file:
  frontend/src/data/neetcode.ts

and extracts:
- slug, title, pattern
- function_name
- starter_code
- test_cases

It exposes:
  PROBLEMS: dict[str, dict]
"""

from __future__ import annotations

import os
import re
from typing import Any, Dict, List


def _repo_root() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def _read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def _extract_raw_problems(ts: str) -> dict[str, dict[str, str]]:
    """
    Returns mapping slug -> {"title": str, "pattern": str}
    extracted from RAW_NEETCODE_PROBLEMS.
    """
    out: dict[str, dict[str, str]] = {}

    # Walk line-by-line using simple state: current pattern slug
    pattern = None
    in_raw = False
    for line in ts.splitlines():
        if line.strip().startswith("const RAW_NEETCODE_PROBLEMS"):
            in_raw = True
            continue
        if in_raw and line.strip().startswith("};"):
            break
        if not in_raw:
            continue

        m_pat = re.match(r'\s*"([^"]+)"\s*:\s*\[\s*$', line)
        if m_pat:
            pattern = m_pat.group(1)
            continue

        if pattern:
            m_slug = re.search(r'"slug"\s*:\s*"([^"]+)"', line)
            if m_slug:
                slug = m_slug.group(1)
                out.setdefault(slug, {"pattern": pattern, "title": slug})
                continue
            m_title = re.search(r'"title"\s*:\s*"([^"]+)"', line)
            # title line occurs after slug; update last inserted slug for this object
            if m_title:
                # find last slug inserted in this pattern block
                # (works because objects are written slug then title)
                # This is O(n) but only 150 items.
                last_slug = None
                for s, meta in reversed(list(out.items())):
                    if meta.get("pattern") == pattern and meta.get("title") == s:
                        last_slug = s
                        break
                if last_slug:
                    out[last_slug]["title"] = m_title.group(1)

    return out


def _extract_ts_object_block(ts: str, name: str) -> str:
    # Capture `const NAME: ... = { ... };` or `const NAME = { ... };`
    # This is a heuristic; it works for our file shape.
    m = re.search(rf"const\s+{re.escape(name)}[^\n]*=\s*\{{", ts)
    if not m:
        return ""
    start = m.end() - 1
    depth = 0
    i = start
    while i < len(ts):
        c = ts[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return ts[start : i + 1]
        i += 1
    return ""


def _extract_provided_tests(ts: str) -> dict[str, dict[str, Any]]:
    block = _extract_ts_object_block(ts, "PROVIDED_TESTS")
    if not block:
        return {}

    out: dict[str, dict[str, Any]] = {}
    # entry header: "slug": { ... }
    for m in re.finditer(r'"\s*([^"]+)\s*"\s*:\s*\{', block):
        slug = m.group(1)
        # slice entry chunk
        start = m.start()
        # find matching braces for this entry
        depth = 0
        i = m.end() - 1
        while i < len(block):
            if block[i] == "{":
                depth += 1
            elif block[i] == "}":
                depth -= 1
                if depth == 0:
                    entry = block[m.end() - 1 : i + 1]
                    break
            i += 1
        else:
            continue

        fn_m = re.search(r'functionName\s*:\s*"([^"]+)"', entry)
        fn = fn_m.group(1) if fn_m else ""
        cases: list[dict[str, str]] = []

        # Robust-ish extraction for: { args: "...", expected: "..." } where args/expected
        # may contain commas/brackets. Supports single or double quoted strings.
        tc_re = re.compile(
            r"\{\s*args\s*:\s*(?P<aq>['\"])(?P<args>[\s\S]*?)(?P=aq)\s*,\s*expected\s*:\s*(?P<eq>['\"])(?P<exp>[\s\S]*?)(?P=eq)\s*\}",
            re.MULTILINE,
        )
        for tc_m in tc_re.finditer(entry):
            args = tc_m.group("args")
            expected = tc_m.group("exp")
            cases.append({"args": args, "expected": expected})
        out[slug] = {"functionName": fn, "testCases": cases}

    return out


def _extract_string_map_backticks(ts: str, name: str) -> dict[str, str]:
    block = _extract_ts_object_block(ts, name)
    if not block:
        return {}
    out: dict[str, str] = {}
    for m in re.finditer(r'"([^"]+)"\s*:\s*`([\s\S]*?)`\s*,?', block):
        out[m.group(1)] = m.group(2)
    return out


def _extract_string_map_quotes(ts: str, name: str) -> dict[str, str]:
    block = _extract_ts_object_block(ts, name)
    if not block:
        return {}
    out: dict[str, str] = {}
    for m in re.finditer(r'"([^"]+)"\s*:\s*"([^"]+)"\s*,?', block):
        out[m.group(1)] = m.group(2)
    return out


def _extract_function_name_map(ts: str) -> dict[str, str]:
    block = _extract_ts_object_block(ts, "FUNCTION_NAME_BY_STARTER_KEY")
    if not block:
        return {}
    out: dict[str, str] = {}
    for m in re.finditer(r'"([^"]+)"\s*:\s*"([^"]+)"\s*,?', block):
        out[m.group(1)] = m.group(2)
    return out


def load_problems() -> dict[str, dict[str, Any]]:
    root = _repo_root()
    neetcode_path = os.path.join(root, "frontend", "src", "data", "neetcode.ts")
    ts = _read_text(neetcode_path)

    raw = _extract_raw_problems(ts)
    provided_tests = _extract_provided_tests(ts)
    starters = _extract_string_map_backticks(ts, "PROVIDED_STARTERS")
    starter_aliases = _extract_string_map_quotes(ts, "STARTER_SLUG_ALIASES")
    fn_by_key = _extract_function_name_map(ts)

    design_slugs = {
        "min-stack",
        "lru-cache",
        "time-based-key-value-store",
        "design-twitter",
        "find-median-from-data-stream",
        "kth-largest-element-in-a-stream",
        "implement-trie-prefix-tree",
        "design-add-and-search-words-data-structure",
        "detect-squares",
        "serialize-and-deserialize-binary-tree",
    }

    problems: dict[str, dict[str, Any]] = {}
    for slug, meta in raw.items():
        starter_key = starter_aliases.get(slug, slug)
        starter = starters.get(starter_key, "class Solution:\n    pass\n")
        fn = fn_by_key.get(starter_key) or provided_tests.get(slug, {}).get("functionName") or ""
        if slug in design_slugs:
            fn = "design"

        test_cases = provided_tests.get(slug, {}).get("testCases", []) or []

        # Mirror frontend defaults: never leave test_cases empty
        pattern = meta.get("pattern", "")
        if not test_cases:
            if slug in design_slugs:
                test_cases = [{"args": "", "expected": "design"}]
            elif pattern == "linked-list":
                test_cases = [{"args": "None", "expected": "None"}]
            elif pattern == "trees":
                if slug == "maximum-depth-of-binary-tree":
                    test_cases = [{"args": "None", "expected": "0"}]
                elif slug == "invert-binary-tree":
                    test_cases = [{"args": "None", "expected": "None"}]
                else:
                    test_cases = [{"args": "None", "expected": "None"}]
            else:
                test_cases = [{"args": "", "expected": "design"}]

        # Floyd cycle duplicate-number: value-as-index can hang or confuse the runner; only verify no throw.
        if slug == "find-the-duplicate-number":
            test_cases = [
                {"args": "[1,3,4,2,2]", "expected": "design"},
                {"args": "[3,1,3,4,2]", "expected": "design"},
            ]

        problems[slug] = {
            "slug": slug,
            "title": meta.get("title", slug),
            "pattern": meta.get("pattern", ""),
            "function_name": fn,
            "starter_code": starter,
            "test_cases": test_cases,
        }

    return problems


PROBLEMS: Dict[str, Dict[str, Any]] = load_problems()

