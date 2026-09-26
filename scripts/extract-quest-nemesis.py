#!/usr/bin/env python3
"""Embed quest.lua nemesis speech tables into js/generated/quest_nemesis_speech.js.

Contest Rule #2: scored js/ must not read dat/ at runtime. The five msgids
nemesis_speaks passes to qt_pager live on each role table in dat/quest.lua.
discourage is a string array (com_pager_core draws rn2(nelems)). The four
nemesis_* entries are {text, synopsis?, output?} tables.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "nethack-c" / "upstream" / "dat" / "quest.lua"
OUT = ROOT / "js" / "generated" / "quest_nemesis_speech.js"

ROLES = (
    "Arc", "Bar", "Cav", "Hea", "Kni", "Mon", "Pri",
    "Ran", "Rog", "Sam", "Tou", "Val", "Wiz",
)
KEYS = (
    "discourage",
    "nemesis_first",
    "nemesis_next",
    "nemesis_other",
    "nemesis_wantsit",
)


def skip_ws(s: str, i: int) -> int:
    n = len(s)
    while i < n:
        c = s[i]
        if c in " \t\r\n":
            i += 1
            continue
        if s.startswith("--", i):
            if s.startswith("--[[", i) or s.startswith("--[=", i):
                # long comment: --[==[ ... ]==]
                j = i + 3
                eqs = 0
                while j < n and s[j] == "=":
                    eqs += 1
                    j += 1
                if j < n and s[j] == "[":
                    closer = "]" + ("=" * eqs) + "]"
                    end = s.find(closer, j + 1)
                    if end < 0:
                        raise SystemExit(f"unclosed long comment at {i}")
                    i = end + len(closer)
                    continue
            nl = s.find("\n", i)
            i = n if nl < 0 else nl + 1
            continue
        break
    return i


def parse_long(s: str, i: int) -> tuple[str, int]:
    """i at the opening '[' of a long bracket."""
    if s[i] != "[":
        raise SystemExit(f"expected long bracket at {i}")
    j = i + 1
    eqs = 0
    while j < len(s) and s[j] == "=":
        eqs += 1
        j += 1
    if j >= len(s) or s[j] != "[":
        raise SystemExit(f"bad long bracket at {i}")
    start = j + 1
    if s.startswith("\r\n", start):
        start += 2
    elif s.startswith("\n", start):
        start += 1
    closer = "]" + ("=" * eqs) + "]"
    end = s.find(closer, start)
    if end < 0:
        raise SystemExit(f"unclosed long string at {i}")
    return s[start:end], end + len(closer)


def parse_short(s: str, i: int) -> tuple[str, int]:
    q = s[i]
    if q not in "\"'":
        raise SystemExit(f"expected short string at {i}")
    i += 1
    out: list[str] = []
    while i < len(s):
        c = s[i]
        if c == "\\":
            n = s[i + 1]
            mapping = {
                "n": "\n", "t": "\t", "r": "\r", "a": "\a", "b": "\b",
                "f": "\f", "v": "\v", "\\": "\\", "\"": "\"", "'": "'",
                "\n": "", "\r": "",
            }
            if n in mapping:
                out.append(mapping[n])
                i += 2
                if n == "\r" and i < len(s) and s[i] == "\n":
                    i += 1
                continue
            if n.isdigit():
                k = i + 1
                digits = ""
                while k < len(s) and s[k].isdigit() and len(digits) < 3:
                    digits += s[k]
                    k += 1
                out.append(chr(int(digits)))
                i = k
                continue
            raise SystemExit(f"unknown lua escape \\{n} at {i}")
        if c == q:
            return "".join(out), i + 1
        if c == "\n":
            raise SystemExit(f"raw newline in short string at {i}")
        out.append(c)
        i += 1
    raise SystemExit("unclosed short string")


def parse_string(s: str, i: int) -> tuple[str, int]:
    i = skip_ws(s, i)
    if s.startswith("[[", i) or (s[i] == "[" and i + 1 < len(s) and s[i + 1] == "="):
        return parse_long(s, i)
    return parse_short(s, i)


def parse_table(s: str, i: int) -> tuple[object, int]:
    """Parse a { ... } that is either a string array or a string-field map."""
    i = skip_ws(s, i)
    if s[i] != "{":
        raise SystemExit(f"expected table at {i}")
    i += 1
    fields: dict[str, str] = {}
    arr: list[str] = []
    named = False
    while True:
        i = skip_ws(s, i)
        if i >= len(s):
            raise SystemExit("unclosed table")
        if s[i] == "}":
            i += 1
            if named and arr:
                raise SystemExit("mixed array and fields")
            return (fields if named else arr), i
        if s[i].isalpha() or s[i] == "_":
            j = i + 1
            while j < len(s) and (s[j].isalnum() or s[j] == "_"):
                j += 1
            name = s[i:j]
            k = skip_ws(s, j)
            if k < len(s) and s[k] == "=":
                named = True
                val, i = parse_string(s, k + 1)
                fields[name] = val
                i = skip_ws(s, i)
                if i < len(s) and s[i] == ",":
                    i += 1
                continue
        val, i = parse_string(s, i)
        arr.append(val)
        i = skip_ws(s, i)
        if i < len(s) and s[i] == ",":
            i += 1


def role_span(s: str, role: str) -> tuple[int, int]:
    needle = f"\n   {role} = {{"
    at = s.find(needle)
    if at < 0:
        raise SystemExit(f"role {role} not found")
    open_at = at + len(needle) - 1
    depth = 0
    i = open_at
    while i < len(s):
        if s.startswith("--", i):
            i = skip_ws(s, i)
            continue
        if s.startswith("[[", i) or (s[i] == "[" and s[i + 1] == "="):
            _, i = parse_long(s, i)
            continue
        if s[i] in "\"'":
            _, i = parse_short(s, i)
            continue
        if s[i] == "{":
            depth += 1
        elif s[i] == "}":
            depth -= 1
            if depth == 0:
                return open_at, i + 1
        i += 1
    raise SystemExit(f"unclosed role {role}")


def extract_key(body: str, key: str) -> object:
    needle = f"\n      {key} = "
    at = body.find(needle)
    if at < 0:
        raise SystemExit(f"missing {key}")
    i = at + len(needle)
    val, _ = parse_table(body, i)
    return val


def normalize(val: object, role: str, key: str) -> object:
    if isinstance(val, list):
        if key != "discourage":
            raise SystemExit(f"{role}.{key} is an array; expected a text table")
        if len(val) < 2:
            raise SystemExit(f"{role}.discourage has {len(val)} strings (<2)")
        return val
    if not isinstance(val, dict) or "text" not in val:
        raise SystemExit(f"{role}.{key} has no text")
    if key == "discourage":
        raise SystemExit(f"{role}.discourage is a text table; expected an array")
    out: dict[str, str] = {"text": val["text"]}
    if "synopsis" in val:
        out["synopsis"] = val["synopsis"]
    if "output" in val:
        out["output"] = val["output"]
    extra = set(val) - {"text", "synopsis", "output"}
    if extra:
        raise SystemExit(f"{role}.{key} unexpected fields {extra}")
    return out


def main() -> None:
    src = SRC.read_text(encoding="utf-8")
    speech: dict[str, dict[str, object]] = {k: {} for k in KEYS}
    for role in ROLES:
        a, b = role_span(src, role)
        body = src[a:b]
        for key in KEYS:
            speech[key][role] = normalize(extract_key(body, key), role, key)

    # Arc discourage is the review's anchor (quest.lua:232–242, 10 lines).
    arc_d = speech["discourage"]["Arc"]
    assert isinstance(arc_d, list) and len(arc_d) == 10
    assert arc_d[0] == '"Try your best, %p.  You cannot defeat me."'
    arc_first = speech["nemesis_first"]["Arc"]
    assert isinstance(arc_first, dict)
    assert arc_first["text"].startswith('"So, %p, you think that you can succeed')
    assert arc_first["output"] == "text"
    assert "synopsis" in arc_first

    body = json.dumps(speech, ensure_ascii=False, indent=2)
    OUT.write_text(
        "// AUTO-GENERATED from nethack-c/upstream/dat/quest.lua\n"
        "// Regenerate: python3 scripts/extract-quest-nemesis.py\n"
        "// Contest Rule #2: in-process only — no runtime filesystem.\n"
        "// C: questtext[filecode].discourage is a string array (rn2(nelems)).\n"
        "// nemesis_wantsit / nemesis_first / nemesis_next / nemesis_other are\n"
        "// { text, synopsis?, output? } so the first com_pager_core(filecode) hits.\n"
        f"export const QUEST_NEMESIS_SPEECH = {body};\n",
        encoding="utf-8",
    )
    nlines = OUT.read_text(encoding="utf-8").count("\n")
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes, {nlines} lines, {len(ROLES)} roles)")


if __name__ == "__main__":
    main()
