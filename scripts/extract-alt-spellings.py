#!/usr/bin/env python3
"""Extract objnam.c alt_spellings[] into js/generated/alt_spellings.js.

Reads the C table (wish alternate spellings, used by readobjnam_postparse1
before the random srch path, so it consumes no RNG) and emits [sp, OBNAME]
pairs in C order. The JS consumer resolves OBNAME via objectNames.indexOf,
so C-object order is preserved without hard-coding indices.

Regenerate: python3 scripts/extract-alt-spellings.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "nethack-c/upstream/src/objnam.c"
DST = ROOT / "js/generated/alt_spellings.js"

text = SRC.read_text()
m = re.search(r"\} spellings\[\] = \{(.*?)\{ \(const char \*\) 0, 0 \},",
              text, re.S)
if not m:
    sys.exit("spellings[] table not found in objnam.c")
pairs = re.findall(r'\{\s*"([^"]+)",\s*([A-Z][A-Z0-9_]*)\s*\},', m.group(1))
if not pairs:
    sys.exit("no spellings entries parsed")

lines = [
    "// AUTO-GENERATED from nethack-c/upstream/src/objnam.c spellings[] — do not edit.",
    "// Regenerate: python3 scripts/extract-alt-spellings.py",
    "// C ref: objnam.c readobjnam_postparse1 — alternate spellings checked",
    "// with wishymatch(bp, sp, TRUE) in table order before the srch path.",
    "export const ALT_SPELLINGS = [",
]
for sp, ob in pairs:
    lines.append(f'    ["{sp}", "{ob}"],')
lines.append("];")
lines.append(f"export const N_ALT_SPELLINGS = {len(pairs)};")
DST.write_text("\n".join(lines) + "\n")
print(f"wrote {DST} ({len(pairs)} entries)")
