#!/usr/bin/env python3
"""Extract symbols.c loadsyms[] order into js/generated/glyphsyms_data.js.

loadsyms[] (symbols.c) is the parse table glyphs.c parse_id() scans:
8 SYM_CONTROL entries, then defsym.h PCHAR/PCHAR2 (cmap), OBJCLASS/OBJCLASS2
(obj classes) and MONSYM (monster classes) runs, then 6 SYM_OTH entries and
a {SYM_INVALID,0,NULL} fencepost. parse_id only reads .range and .name
(.idx is unused there), so the table is emitted as [range, name] pairs in
C order; the JS consumer drops the fencepost (array length terminates).

Regenerate: python3 scripts/extract-glyphsyms.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFSYM = ROOT / "nethack-c/upstream/include/defsym.h"
DST = ROOT / "js/generated/glyphsyms_data.js"

# C ref: sym.h enum symparse_range.
SYM_INVALID, SYM_CONTROL, SYM_PCHAR, SYM_OC, SYM_MON, SYM_OTH = 0, 1, 2, 3, 4, 5

# C ref: symbols.c loadsyms[] head — 8 SYM_CONTROL entries before PCHAR_PARSE.
CONTROL = [
    "start", "begin", "finish", "handling",
    "description", "color", "colour", "restrictions",
]
# C ref: symbols.c loadsyms[] tail — 6 SYM_OTH entries after MONSYMS_PARSE.
OTH = [
    "S_nothing", "S_unexplored", "S_boulder",
    "S_invisible", "S_pet_override", "S_hero_override",
]


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


def collect(text, macro, sym_arg):
    """Join continuation lines, return [sym, ...] for ^    MACRO( entries."""
    invocs = []
    buf, depth, active = "", 0, False
    for line in text.split("\n"):
        if not active:
            m = re.match(r"    " + macro + r"2?\(\s*(.*)$", line)
            if not m:
                continue
            buf, active = m.group(1), True
            bare = strip_literals(buf)
            depth = 1 + bare.count("(") - bare.count(")")
        else:
            buf += " " + line.strip()
            bare = strip_literals(line)
            depth += bare.count("(") - bare.count(")")
        if active and depth <= 0:
            invocs.append(buf[: buf.rfind(")")])
            buf, active = "", False
    syms = []
    for inv in invocs:
        args = split_top_commas(inv)
        # Skip doc-comment shapes (e.g. `MONSYM(idx, ch, sym desc)`):
        # real invocations lead with a numeric idx.
        if not args or not re.match(r"^\d+$", args[0]):
            continue
        syms.append(args[sym_arg])
    return syms


text = DEFSYM.read_text()
# C ref: defsym.h PCHAR_PARSE — { SYM_PCHAR, sym, #sym }; PCHAR2 delegates
# to PCHAR so its sym is likewise the 3rd argument.
pchars = collect(text, "PCHAR", 2)
# C ref: defsym.h OBJCLASS_PARSE — { SYM_OC, sym + SYM_OFF_O, #sym };
# OBJCLASS2 delegates to OBJCLASS (extra sname arg) so its sym is the 5th
# argument. Both are collected in document order — C order.
oc_syms = []
buf, depth, active, is_oc2 = "", 0, False, False
for line in text.split("\n"):
    if not active:
        m = re.match(r"    OBJCLASS(2)?\(\s*(.*)$", line)
        if not m:
            continue
        is_oc2 = m.group(1) == "2"
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
            oc_syms.append(args[4] if is_oc2 else args[3])
        buf, active = "", False
# C ref: defsym.h MONSYMS_PARSE — { SYM_MON, sym + SYM_OFF_M, #sym }.
monsyms = collect(text, "MONSYM", 3)

# C ref: sym.h MAXPCHARS (S_water - S_stone + 1); S_expl_br + 1 == 105.
if len(pchars) != 105:
    sys.exit(f"PCHAR count {len(pchars)}, expected 105 (MAXPCHARS)")
print(f"PCHAR {len(pchars)}, OBJCLASS {len(oc_syms)}, "
      f"MONSYM {len(monsyms)}", file=sys.stderr)

entries = (
    [(SYM_CONTROL, n) for n in CONTROL]
    + [(SYM_PCHAR, n) for n in pchars]
    + [(SYM_OC, n) for n in oc_syms]
    + [(SYM_MON, n) for n in monsyms]
    + [(SYM_OTH, n) for n in OTH]
)

lines = [
    "// AUTO-GENERATED from nethack-c/upstream/src/symbols.c loadsyms[] +",
    "// nethack-c/upstream/include/defsym.h — do not edit.",
    "// Regenerate: python3 scripts/extract-glyphsyms.py",
    "// C ref: symbols.c loadsyms[] (control + PCHAR_PARSE + OBJCLASS_PARSE +",
    "// MONSYMS_PARSE + SYM_OTH runs). Each entry is [range, name] ≡",
    "// symparse {.range, .name}; .idx is omitted (glyphs.c parse_id never",
    "// reads it). The C {SYM_INVALID,0,NULL} fencepost is omitted — JS uses",
    "// array length as the terminator (cf. `while (loadsyms[i].range)`).",
    "export const SYM_INVALID = 0;",
    "export const SYM_CONTROL = 1;",
    "export const SYM_PCHAR = 2;",
    "export const SYM_OC = 3;",
    "export const SYM_MON = 4;",
    "export const SYM_OTH = 5;",
    "export const LOADSYMS = [",
]
for r, n in entries:
    lines.append(f"    [{r}, \"{n}\"],")
lines.append("];")
DST.write_text("\n".join(lines) + "\n")
print(f"wrote {DST} ({len(entries)} entries)")
