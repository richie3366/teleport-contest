#!/usr/bin/env python3
"""Extract defsym.h PCHAR/PCHAR2 rows into js/generated/defsyms_data.js.

C ref: drawing.c defsyms[MAXPCHARS + 1] (PCHAR_DRAWING over defsym.h).
PCHAR(idx, ch, sym, desc, clr) expands to { ch, desc, clr }; PCHAR2
delegates to PCHAR with its own desc argument, so the explanation is
the 4th PCHAR argument / 5th PCHAR2 argument and the tilenm (4th PCHAR2
argument) is dropped, exactly as C does. The S_* enum value equals the
idx argument (sym = idx per the PCHAR_S_ENUM expansion), so the table
is emitted in C order and the JS index is the S_* value.

Regenerate: python3 scripts/extract-defsyms.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFSYM = ROOT / "nethack-c/upstream/include/defsym.h"
DST = ROOT / "js/generated/defsyms_data.js"


def split_top_commas(s):
    # Top-level comma split that ignores commas, quotes and parens inside
    # C string literals ("...") and char literals ('x', including '"',
    # ')' and '\'' shapes used by defsym.h PCHAR entries).
    parts, depth, cur = [], 0, ""
    instr, inchar, esc = False, False, False
    for ch in s:
        cur += ch
        if esc:
            esc = False
        elif instr:
            if ch == '"':
                instr = False
        elif inchar:
            if ch == "\\":
                esc = True
            elif ch == "'":
                inchar = False
        elif ch == '"':
            instr = True
        elif ch == "'":
            inchar = True
        elif ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        elif ch == "," and depth == 0:
            parts.append(cur[:-1].strip())
            cur = ""
    parts.append(cur.strip())
    return parts


def strip_literals(line):
    """Blank C string/char literals so paren counting ignores '"', ')', etc."""
    out = []
    i, instr, inchar = 0, False, False
    while i < len(line):
        ch = line[i]
        if instr:
            if ch == "\\":
                i += 1
            elif ch == '"':
                instr = False
            out.append(" ")
        elif inchar:
            if ch == "\\":
                i += 1
            elif ch == "'":
                inchar = False
            out.append(" ")
        elif ch == '"':
            instr = True
            out.append(" ")
        elif ch == "'":
            inchar = True
            out.append(" ")
        else:
            out.append(ch)
        i += 1
    return "".join(out)


def collect(text):
    """Join continuation lines; return [(is_pchar2, args), ...] for real
    `    PCHAR(2)?(` invocations (numeric idx; doc shapes skipped)."""
    rows = []
    buf, depth, active, is_p2 = "", 0, False, False
    for line in text.split("\n"):
        if not active:
            m = re.match(r"    PCHAR(2)?\(\s*(.*)$", line)
            if not m:
                continue
            is_p2 = m.group(1) == "2"
            buf, active = m.group(2), True
            bare = strip_literals(buf)
            depth = 1 + bare.count("(") - bare.count(")")
        else:
            buf += " " + line.strip()
            bare = strip_literals(line)
            depth += bare.count("(") - bare.count(")")
        if active and depth <= 0:
            args = split_top_commas(buf[: buf.rfind(")")])
            if args and re.match(r"^\d+$", args[0]):
                rows.append((is_p2, args))
            buf, active = "", False
    return rows


def char_text(lit):
    """C char literal ('a', ']' — incl. backslash/quote escapes) to text."""
    lit = lit.strip()
    assert len(lit) >= 3 and lit[0] == "'" and lit[-1] == "'", lit
    body = lit[1:-1]
    if len(body) == 1:
        return body
    esc = {"\\\\": "\\", "\\'": "'", '\\"': '"', "\\n": "\n", "\\t": "\t",
           "\\r": "\r", "\\0": "\0"}
    assert body in esc, lit
    return esc[body]


def cstring_text(lit):
    """C string literal to text (handles \" and \\ escapes)."""
    lit = lit.strip()
    assert len(lit) >= 2 and lit[0] == '"' and lit[-1] == '"', lit
    body = lit[1:-1]
    out = []
    i = 0
    while i < len(body):
        if body[i] == "\\" and i + 1 < len(body):
            nxt = body[i + 1]
            out.append({"n": "\n", "t": "\t", "r": "\r", '"': '"',
                        "'": "'", "\\": "\\"}.get(nxt, nxt))
            i += 2
        else:
            out.append(body[i])
            i += 1
    return "".join(out)


text = DEFSYM.read_text()
rows = collect(text)

entries = []  # (idx, sym, name, explanation)
for is_p2, args in rows:
    # PCHAR(idx, ch, sym, desc, clr) / PCHAR2(idx, ch, sym, tilenm, desc, clr)
    want = 6 if is_p2 else 5
    assert len(args) == want, args
    idx = int(args[0])
    ch = char_text(args[1])
    name = args[2]
    desc = cstring_text(args[4] if is_p2 else args[3])
    assert re.match(r"^S_[A-Za-z0-9_]+$", name), name
    assert len(ch) == 1 and 32 <= ord(ch) <= 126, (idx, args[1])
    entries.append((idx, ch, name, desc))

# C ref: sym.h MAXPCHARS (S_expl_br 104 fencepost + 1 == 105).
if len(entries) != 105:
    sys.exit(f"PCHAR count {len(entries)}, expected 105 (MAXPCHARS)")
if sorted(i for i, _, _, _ in entries) != list(range(105)):
    sys.exit("PCHAR idx args are not dense 0..104")

lines = [
    "// AUTO-GENERATED from nethack-c/upstream/include/defsym.h — do not edit.",
    "// Regenerate: python3 scripts/extract-defsyms.py",
    "// C ref: drawing.c defsyms[MAXPCHARS + 1] (PCHAR_DRAWING; PCHAR2",
    "// delegates to PCHAR with its desc argument, so explanation is the",
    "// 4th PCHAR / 5th PCHAR2 argument and tilenm is dropped, as in C).",
    "// Each entry is [sym, name, explanation]; the index is the S_* enum",
    "// value (sym = idx). The C { 0, NULL } fencepost at [MAXPCHARS] is",
    "// omitted — consumers loop i < DEFSYMS.length (=== MAXPCHARS).",
    "export const DEFSYMS = [",
]
ordered = [e for e in entries]
ordered.sort()
if [e[0] for e in ordered] != list(range(105)):
    sys.exit("sort check failed")
# Rewrite in idx order (document order already is, but enforce it).
lines = lines[:9]
for idx, ch, name, desc in ordered:
    lines.append(f"    {json.dumps([ch, name, desc])},")
lines.append("];")
DST.write_text("\n".join(lines) + "\n")
by_idx = {i: (c, n, d) for i, c, n, d in ordered}
print(f"wrote {DST} ({len(ordered)} entries)", file=sys.stderr)
print(f"[25]={by_idx[25]} [37]={by_idx[37]}", file=sys.stderr)
