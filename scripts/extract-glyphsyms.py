#!/usr/bin/env python3
"""Extract symbols.c loadsyms[] order into js/generated/glyphsyms_data.js.

loadsyms[] (symbols.c) is the parse table glyphs.c parse_id() scans:
8 SYM_CONTROL entries, then defsym.h PCHAR/PCHAR2 (cmap), OBJCLASS/OBJCLASS2
(obj classes) and MONSYM (monster classes) runs, then 6 SYM_OTH entries and
a {SYM_INVALID,0,NULL} fencepost. parse_id only reads .range and .name,
but symbols.c match_sym() callers need .idx
(PCHAR: sym enum value; OBJCLASS: sym + SYM_OFF_O; MONSYM: sym + SYM_OFF_M;
SYM_OTH: SYM_* + SYM_OFF_X), so the table is emitted as [range, idx, name]
triples in C order; the JS consumer drops the fencepost (array length
terminates). Readers that only need [range, name] (parse_id family) ignore
element [2].

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

# C ref: symbols.c loadsyms[] head — 8 SYM_CONTROL entries before PCHAR_PARSE
# (symbols.c:404–411; idx is the literal second field, not the position).
CONTROL = [
    ("start", 0), ("begin", 0), ("finish", 1), ("handling", 2),
    ("description", 3), ("color", 4), ("colour", 4), ("restrictions", 5),
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
    """Join continuation lines, return [(idx, sym), ...] for ^    MACRO(
    entries. idx is the numeric first macro argument (the S_* enum value
    per the *_S_ENUM expansions: `sym = idx`)."""
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
        syms.append((int(args[0]), args[sym_arg]))
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
            oc_syms.append((int(args[0]), args[4] if is_oc2 else args[3]))
        buf, active = "", False
# C ref: defsym.h MONSYMS_PARSE — { SYM_MON, sym + SYM_OFF_M, #sym }.
monsyms = collect(text, "MONSYM", 3)

# C ref: hack.h:1081–1082 symbol offsets — SYM_OFF_P 0 + MAXPCHARS 105
# (S_expl_br 104 fencepost + 1) gives SYM_OFF_O 105; + MAXOCLASSES 18
# gives SYM_OFF_M 123. C ref: sym.h:112–117 SYM_NOTHING 0 ..
# SYM_HERO_OVERRIDE 5 + hack.h:1084 SYM_OFF_X 190 gives SYM_OTH idx.
SYM_OFF_O = 105
SYM_OFF_M = 123
SYM_OFF_X = 190

# C ref: sym.h MAXPCHARS (S_water - S_stone + 1); S_expl_br + 1 == 105.
if len(pchars) != 105:
    sys.exit(f"PCHAR count {len(pchars)}, expected 105 (MAXPCHARS)")
if sorted(i for i, _ in pchars) != list(range(105)):
    sys.exit("PCHAR idx args are not dense 0..104")
if len(oc_syms) != 17 or sorted(i for i, _ in oc_syms) != list(range(1, 18)):
    sys.exit(f"OBJCLASS count/idx {[i for i, _ in oc_syms]}, expected 1..17")
if len(monsyms) != 60 or sorted(i for i, _ in monsyms) != list(range(1, 61)):
    sys.exit(f"MONSYM count/idx {[i for i, _ in monsyms]}, expected 1..60")
print(f"PCHAR {len(pchars)}, OBJCLASS {len(oc_syms)}, "
      f"MONSYM {len(monsyms)}", file=sys.stderr)

entries = (
    [(SYM_CONTROL, idx, n) for n, idx in CONTROL]
    + [(SYM_PCHAR, idx, n) for idx, n in pchars]
    + [(SYM_OC, idx + SYM_OFF_O, n) for idx, n in oc_syms]
    + [(SYM_MON, idx + SYM_OFF_M, n) for idx, n in monsyms]
    + [(SYM_OTH, k + SYM_OFF_X, n) for k, n in enumerate(OTH)]
)

lines = [
    "// AUTO-GENERATED from nethack-c/upstream/src/symbols.c loadsyms[] +",
    "// nethack-c/upstream/include/defsym.h — do not edit.",
    "// Regenerate: python3 scripts/extract-glyphsyms.py",
    "// C ref: symbols.c loadsyms[] (control + PCHAR_PARSE + OBJCLASS_PARSE +",
    "// MONSYMS_PARSE + SYM_OTH runs). Each entry is [range, idx, name] ≡",
    "// symparse {.range, .idx, .name}; glyphs.c parse_id reads [0] and [2] only.",
    "// The C {SYM_INVALID,0,NULL} fencepost is omitted — JS uses",
    "// array length as the terminator (cf. `while (loadsyms[i].range)`).",
    "export const SYM_INVALID = 0;",
    "export const SYM_CONTROL = 1;",
    "export const SYM_PCHAR = 2;",
    "export const SYM_OC = 3;",
    "export const SYM_MON = 4;",
    "export const SYM_OTH = 5;",
    "export const LOADSYMS = [",
]
for r, i, n in entries:
    lines.append(f"    [{r}, {i}, \"{n}\"],")
lines.append("];")
DST.write_text("\n".join(lines) + "\n")
print(f"wrote {DST} ({len(entries)} entries)")
