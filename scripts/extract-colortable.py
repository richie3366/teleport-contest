#!/usr/bin/env python3
"""Extract coloratt.c colortable[] into js/generated/colortable_data.js.

colortable[] (coloratt.c) is the name table check_enhanced_colors()
fuzzymatches: 16 nh_color basics (tableindex 0..15, incl. the NOC
"nocolor" slot at 8) plus the rgb_color extended names. Entries are
{ colortyp, tableindex, rgbindex, name, r, g, b } with NHC/NOC/RGBC
shorthand defines; two entries (bright-green, bright-magenta) wrap
onto two source lines, so the whole initializer is scanned as one
string. colortable_to_int32() only reads .colortyp/.tableindex/.r/.g/.b
but .rgbindex is carried for fidelity.

Regenerate: python3 scripts/extract-colortable.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "nethack-c/upstream/src/coloratt.c"
DST = ROOT / "js/generated/colortable_data.js"

# C ref: include/color.h `enum nhcolortype { no_color, nh_color, rgb_color }`.
TYP = {"NOC": 0, "NHC": 1, "RGBC": 2}

ENTRY = re.compile(
    r"\{\s*(NHC|NOC|RGBC)\s*,\s*(\d+)\s*,\s*(\d+)\s*,"
    r'\s*"([^"]+)"\s*,\s*(0[xX][0-9a-fA-F]+)\s*,'
    r"\s*(0[xX][0-9a-fA-F]+)\s*,\s*(0[xX][0-9a-fA-F]+)\s*\}"
)


def js_str(s: str) -> str:
    return '"%s"' % s.replace("\\", "\\\\").replace('"', '\\"')


def main() -> int:
    text = SRC.read_text()
    start = text.index("const struct nethack_color colortable[] = {")
    end = text.index("};", start)
    body = text[start:end]
    rows = []
    for m in ENTRY.finditer(body):
        typ, tidx, ridx, name, r, g, b = m.groups()
        rows.append(
            (TYP[typ], int(tidx), int(ridx), name,
             int(r, 16), int(g, 16), int(b, 16))
        )
    if not rows:
        print("extract-colortable: no entries parsed", file=sys.stderr)
        return 1
    # C order guard: tableindex runs 0..N-1 with no gaps.
    for i, row in enumerate(rows):
        if row[1] != i:
            print(
                "extract-colortable: tableindex gap at row %d (got %d)"
                % (i, row[1]),
                file=sys.stderr,
            )
            return 1
    lines = [
        "// AUTO-GENERATED from nethack-c/upstream/src/coloratt.c"
        " colortable[] at 16ff59115",
        "// Regenerate: python3 scripts/extract-colortable.py",
        "export const COLORTABLE = [",
    ]
    for typ, tidx, ridx, name, r, g, b in rows:
        lines.append(
            "    { colortyp: %d, tableindex: %d, rgbindex: %d,"
            " name: %s, r: %d, g: %d, b: %d },"
            % (typ, tidx, ridx, js_str(name), r, g, b)
        )
    lines.append("];")
    lines.append("")
    DST.write_text("\n".join(lines))
    print("extract-colortable: %d entries -> %s" % (len(rows), DST))
    return 0


if __name__ == "__main__":
    sys.exit(main())
