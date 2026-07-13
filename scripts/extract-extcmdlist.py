#!/usr/bin/env python3
"""Regenerate js/generated/extcmdlist_data.js from pinned cmd.c extcmdlist[].

Parses default key / ef_txt / ef_desc / flags for dokeylist. Feature flags
mirror the contest MacOS tty recorder (CRASHREPORT/SHELL/SUSPEND on;
DEBUG off; released status).
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "nethack-c/upstream/src/cmd.c"
OUT = ROOT / "js/generated/extcmdlist_data.js"

# Contest recorder build features for dokeylist text.
FLAGS = {
    "CRASHREPORT": True,
    "SHELL": True,
    "SUSPEND": True,
    "DEBUG": False,
    "DEBUG_MIGRATING_MONS": False,
    # NH_DEVEL_STATUS == NH_STATUS_RELEASED → skip NH_DEVEL-only entries
    "NH_DEVEL_STATUS_RELEASED": True,
}

FLAG_NAMES = {
    "IFBURIED": 0x0001,
    "AUTOCOMPLETE": 0x0002,
    "WIZMODECMD": 0x0004,
    "GENERALCMD": 0x0008,
    "CMD_NOT_AVAILABLE": 0x0010,
    "NOFUZZERCMD": 0x0020,
    "INTERNALCMD": 0x0040,
    "CMD_M_PREFIX": 0x0080,
    "CMD_gGF_PREFIX": 0x0100,
    "CMD_MOVE_PREFIXES": 0x0080 | 0x0100,
    "PREFIXCMD": 0x0200,
    "MOVEMENTCMD": 0x0400,
    "MOUSECMD": 0x0800,
    "CMD_INSANE": 0x1000,
    "AUTOCOMP_ADJ": 0x2000,
    "CMD_PARAM": 0x4000,
}

# C def_oc_syms / classic class glyphs used as extcmdlist keys.
OC_SYMS = {
    "WEAPON_SYM": ")",
    "ARMOR_SYM": "[",
    "RING_SYM": "=",
    "AMULET_SYM": '"',
    "TOOL_SYM": "(",
    "FOOD_SYM": "%",
    "POTION_SYM": "!",
    "SCROLL_SYM": "?",
    "SPBOOK_SYM": "+",
    "WAND_SYM": "/",
    "GOLD_SYM": "$",
    "GEM_SYM": "*",
    "ROCK_SYM": "`",
    "BALL_SYM": "0",
    "CHAIN_SYM": "_",
    "VENOM_SYM": ".",
}


def eval_key(expr: str) -> int:
    expr = expr.strip()
    if expr in ("'\\0'", "0", "NULL", "(char *) 0", "'\\0'"):
        return 0
    if expr in OC_SYMS:
        return ord(OC_SYMS[expr])
    m = re.fullmatch(r"M\('(.)'\)", expr)
    if m:
        return 0x80 | ord(m.group(1))
    m = re.fullmatch(r"C\('(.)'\)", expr)
    if m:
        return 0x1F & ord(m.group(1))
    m = re.fullmatch(r"C\('_'\)", expr)
    if m:
        return 0x1F & ord("_")
    if expr == "'\\033'":
        return 27
    if expr == "'\\177'":
        return 0x7F
    if expr == "'\\n'":
        return 10
    m = re.fullmatch(r"'(.)'", expr)
    if m:
        return ord(m.group(1))
    m = re.fullmatch(r"'\\(.)'", expr)
    if m:
        ch = m.group(1)
        esc = {"n": 10, "r": 13, "t": 9, "0": 0, "e": 27}.get(ch)
        if esc is not None:
            return esc
        return ord(ch)
    raise ValueError(f"unparsed key expr: {expr!r}")


def eval_flags(expr: str) -> int:
    expr = expr.strip()
    if expr == "0":
        return 0
    # Strip nested parens used for ifdef flag composition
    while expr.startswith("(") and expr.endswith(")"):
        # only peel if balanced outer
        depth = 0
        ok = True
        for i, ch in enumerate(expr):
            if ch == "(":
                depth += 1
            elif ch == ")":
                depth -= 1
                if depth == 0 and i != len(expr) - 1:
                    ok = False
                    break
        if ok and depth == 0:
            expr = expr[1:-1].strip()
        else:
            break
    total = 0
    # Remove CPP comments
    expr = re.sub(r"/\*.*?\*/", "", expr, flags=re.S)
    parts = re.split(r"\s*\|\s*", expr)
    for p in parts:
        p = p.strip()
        if not p:
            continue
        if p in FLAG_NAMES:
            total |= FLAG_NAMES[p]
        else:
            raise ValueError(f"unparsed flag token: {p!r} in {expr!r}")
    return total


def strip_ifdef_blocks(text: str) -> str:
    """Apply FLAGS to #ifdef / #if / #ifndef / #else / #endif (one level + nested)."""
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    stack: list[bool] = []  # whether current branch is active

    def active() -> bool:
        return all(stack) if stack else True

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.lstrip()
        if stripped.startswith("#ifdef"):
            name = stripped.split(None, 1)[1].strip()
            stack.append(active() and bool(FLAGS.get(name, False)))
        elif stripped.startswith("#ifndef"):
            name = stripped.split(None, 1)[1].strip()
            stack.append(active() and not bool(FLAGS.get(name, False)))
        elif stripped.startswith("#if"):
            cond = stripped[3:].strip()
            # Only the patterns we need from extcmdlist
            if "NH_DEVEL_STATUS" in cond:
                # (NH_DEVEL_STATUS != NH_STATUS_RELEASED) || defined(DEBUG)
                take = (not FLAGS["NH_DEVEL_STATUS_RELEASED"]) or FLAGS["DEBUG"]
                stack.append(active() and take)
            elif cond.startswith("defined("):
                m = re.match(r"defined\((\w+)\)", cond)
                take = bool(FLAGS.get(m.group(1), False)) if m else False
                stack.append(active() and take)
            else:
                # Unknown: keep (fail open for safety on simple 0/1)
                stack.append(active() and True)
        elif stripped.startswith("#else"):
            if not stack:
                raise RuntimeError("#else without ifdef")
            parent = all(stack[:-1]) if len(stack) > 1 else True
            stack[-1] = parent and (not stack[-1])
        elif stripped.startswith("#endif"):
            if not stack:
                raise RuntimeError("#endif without ifdef")
            stack.pop()
        else:
            if active():
                out.append(line)
        i += 1
    return "".join(out)


def parse_string(s: str) -> str:
    s = s.strip()
    if not (s.startswith('"') and s.endswith('"')):
        # multi-token adjacent strings already joined by caller
        raise ValueError(f"not a string: {s!r}")
    # Use unicode_escape via codecs after wrapping
    body = s[1:-1]
    return bytes(body, "utf-8").decode("unicode_escape")


def join_c_strings(chunk: str) -> str:
    """Join adjacent C string literals inside a field."""
    parts = re.findall(r'"(?:\\.|[^"\\])*"', chunk)
    if not parts:
        return ""
    return "".join(parse_string(p) for p in parts)


def main() -> None:
    src = SRC.read_text()
    m = re.search(
        r"struct ext_func_tab extcmdlist\[\] = \{([\s\S]*?)\n\};",
        src,
    )
    if not m:
        raise SystemExit("extcmdlist[] not found")
    body = strip_ifdef_blocks(m.group(1))

    # Split top-level { ... }, entries
    entries = []
    i = 0
    n = len(body)
    while i < n:
        while i < n and body[i] in " \t\n\r,":
            i += 1
        if i >= n:
            break
        if body[i] != "{":
            # trailing comment / leftover
            if body[i:i + 2] == "/*":
                j = body.find("*/", i)
                i = j + 2 if j >= 0 else n
                continue
            raise SystemExit(f"expected '{{' at {i}: {body[i:i+40]!r}")
        depth = 0
        j = i
        in_str = False
        esc = False
        while j < n:
            ch = body[j]
            if in_str:
                if esc:
                    esc = False
                elif ch == "\\":
                    esc = True
                elif ch == '"':
                    in_str = False
            else:
                if ch == '"':
                    in_str = True
                elif ch == "{":
                    depth += 1
                elif ch == "}":
                    depth -= 1
                    if depth == 0:
                        j += 1
                        break
            j += 1
        chunk = body[i + 1 : j - 1]
        i = j
        # Strip C comments so parentheses inside /* */ do not skew field splits
        # (e.g. up-entry "dodown() above" left depth>0 and dropped the entry).
        chunk = re.sub(r"/\*.*?\*/", "", chunk, flags=re.S)

        # Split fields on top-level commas (respect "..." and '...' literals)
        fields: list[str] = []
        cur: list[str] = []
        depth = 0
        in_str = False
        in_char = False
        esc = False
        k = 0
        while k < len(chunk):
            ch = chunk[k]
            if in_str or in_char:
                cur.append(ch)
                if esc:
                    esc = False
                elif ch == "\\":
                    esc = True
                elif in_str and ch == '"':
                    in_str = False
                elif in_char and ch == "'":
                    in_char = False
                k += 1
                continue
            if ch == '"':
                in_str = True
                cur.append(ch)
                k += 1
                continue
            if ch == "'":
                in_char = True
                cur.append(ch)
                k += 1
                continue
            if ch in "({":
                depth += 1
                cur.append(ch)
                k += 1
                continue
            if ch in ")}":
                depth -= 1
                cur.append(ch)
                k += 1
                continue
            if ch == "," and depth == 0:
                fields.append("".join(cur).strip())
                cur = []
                k += 1
                continue
            cur.append(ch)
            k += 1
        if cur:
            fields.append("".join(cur).strip())

        # key, ef_txt, ef_desc, ef_funct, flags, f_text
        if len(fields) < 5:
            continue
        key_expr = fields[0]
        txt = join_c_strings(fields[1])
        if txt == "" and "0" in fields[1]:
            # sentinel
            continue
        desc = join_c_strings(fields[2])
        flags = eval_flags(fields[4])
        # Skip CMD_NOT_AVAILABLE (non-functional shell etc. when disabled)
        # Still include when SHELL off would set the flag — we strip ifdefs so
        # CMD_NOT_AVAILABLE only appears when the feature is off.
        if flags & FLAG_NAMES["CMD_NOT_AVAILABLE"]:
            continue
        if flags & FLAG_NAMES["INTERNALCMD"]:
            continue
        key = eval_key(key_expr)
        entries.append(
            {
                "key": key,
                "txt": txt,
                "desc": desc,
                "flags": flags,
            }
        )

    lines = [
        "// Generated by scripts/extract-extcmdlist.py — do not edit.",
        "// Source: nethack-c/upstream/src/cmd.c extcmdlist[].",
        "export const EXTCMDLIST = [",
    ]
    for e in entries:
        desc = json_escape(e["desc"])
        txt = json_escape(e["txt"])
        lines.append(
            f'  {{ key: {e["key"]}, txt: "{txt}", desc: "{desc}", flags: {e["flags"]} }},'
        )
    lines.append("];")
    lines.append("")
    lines.append("export const IFBURIED = 0x0001;")
    lines.append("export const AUTOCOMPLETE = 0x0002;")
    lines.append("export const WIZMODECMD = 0x0004;")
    lines.append("export const GENERALCMD = 0x0008;")
    lines.append("export const NOFUZZERCMD = 0x0020;")
    lines.append("export const INTERNALCMD = 0x0040;")
    lines.append("export const PREFIXCMD = 0x0200;")
    lines.append("export const MOVEMENTCMD = 0x0400;")
    lines.append("export const CMD_PARAM = 0x4000;")
    lines.append("")
    OUT.write_text("\n".join(lines) + "\n")
    print(f"wrote {OUT} ({len(entries)} entries)")


def json_escape(s: str) -> str:
    return (
        s.replace("\\", "\\\\")
        .replace('"', '\\"')
        .replace("\n", "\\n")
        .replace("\r", "\\r")
        .replace("\t", "\\t")
    )


if __name__ == "__main__":
    main()
