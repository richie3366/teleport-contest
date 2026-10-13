#!/usr/bin/env python3
"""Embed every per-role quest.lua message into js/generated/quest_text.js.

Contest Rule #2: scored js/ must not read dat/ at runtime. questpgr.c
com_pager_core looks a msgid up in questtext[filecode] for the hero's
role; every role table in dat/quest.lua carries the same 28 msgids
(goal_alt on five roles). A msgid missing from the JS table makes the
lookup return FALSE silently where C shows a pager window, so the next
keys of the session are consumed by the wrong prompt (D-3913, D-3917,
D-3920, D-3922, D-3928 shipped such bodies one role at a time).

Shape: QUEST_ROLE_MSGS[msgid][Role] is either a string array (the
com_pager_core rn2(nelems) arm: discourage, guardtalk_*) or
{ text, synopsis?, output? } exactly as written in quest.lua.

Parser helpers are shared with extract-quest-nemesis.py.
"""
from __future__ import annotations

import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "nethack-c" / "upstream" / "dat" / "quest.lua"
OUT = ROOT / "js" / "generated" / "quest_text.js"

_spec = importlib.util.spec_from_file_location(
    "extract_quest_nemesis", ROOT / "scripts" / "extract-quest-nemesis.py")
_qn = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_qn)

ROLES = _qn.ROLES


def role_keys(body: str) -> list[str]:
    """Top-level keys of one role table (6-space indent, `key = {`)."""
    keys: list[str] = []
    i = 1  # skip the role table's own '{'
    n = len(body)
    while i < n:
        i = _qn.skip_ws(body, i)
        if i >= n or body[i] == "}":
            break
        j = i
        while j < n and (body[j].isalnum() or body[j] == "_"):
            j += 1
        name = body[i:j]
        if not name:
            raise SystemExit(f"unexpected char {body[i]!r} at {i}")
        k = _qn.skip_ws(body, j)
        if body[k] != "=":
            raise SystemExit(f"expected '=' after {name}")
        _, i = _qn.parse_table(body, k + 1)
        keys.append(name)
        i = _qn.skip_ws(body, i)
        if i < n and body[i] == ",":
            i += 1
    return keys


def normalize(val: object, role: str, key: str) -> object:
    if isinstance(val, list):
        if len(val) < 1:
            raise SystemExit(f"{role}.{key} is an empty array")
        return val
    if not isinstance(val, dict) or "text" not in val:
        raise SystemExit(f"{role}.{key} has no text")
    extra = set(val) - {"text", "synopsis", "output"}
    if extra:
        raise SystemExit(f"{role}.{key} unexpected fields {extra}")
    out: dict[str, str] = {"text": val["text"]}
    if "synopsis" in val:
        out["synopsis"] = val["synopsis"]
    if "output" in val:
        out["output"] = val["output"]
    return out


def main() -> None:
    src = SRC.read_text(encoding="utf-8")
    msgs: dict[str, dict[str, object]] = {}
    for role in ROLES:
        a, b = _qn.role_span(src, role)
        body = src[a:b]
        for key in role_keys(body):
            msgs.setdefault(key, {})[role] = normalize(
                _qn.extract_key(body, key), role, key)

    full = [k for k, v in msgs.items() if len(v) == len(ROLES)]
    assert len(full) == 28, sorted(full)
    assert sorted(msgs["goal_alt"]) == sorted(r for r in ROLES if r in msgs["goal_alt"])
    assert msgs["gotit"]["Arc"]["text"].startswith("The power of %o flows through your body!")
    assert isinstance(msgs["discourage"]["Arc"], list)

    ordered = {k: {r: msgs[k][r] for r in ROLES if r in msgs[k]} for k in sorted(msgs)}
    body = json.dumps(ordered, ensure_ascii=False, indent=2)
    OUT.write_text(
        "// AUTO-GENERATED from nethack-c/upstream/dat/quest.lua\n"
        "// Regenerate: python3 scripts/extract-quest-text.py\n"
        "// Contest Rule #2: in-process only — no runtime filesystem.\n"
        "// QUEST_ROLE_MSGS[msgid][Role]: string array (com_pager_core rn2 arm)\n"
        "// or { text, synopsis?, output? } as written in the role table.\n"
        f"export const QUEST_ROLE_MSGS = {body};\n",
        encoding="utf-8",
    )
    n = sum(len(v) for v in ordered.values())
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes, {len(ordered)} msgids, {n} entries)")


if __name__ == "__main__":
    main()
