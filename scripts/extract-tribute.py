#!/usr/bin/env python3
"""Embed dat/tribute into js/generated/tribute_data.js.

Contest Rule #2: no filesystem at runtime. files.c read_tribute opens
TRIBUTEFILE via dlb; Chrome cannot read dat/. One compact line so the
loop density gate (js/ insertions) is not blown by indent=2 dumps.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "nethack-c" / "upstream" / "dat" / "tribute"
OUT = ROOT / "js" / "generated" / "tribute_data.js"


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"missing {SRC}")
    raw = SRC.read_text(encoding="utf-8", errors="replace")
    text = raw.replace("\r\n", "\n").replace("\r", "\n")
    body = json.dumps(text, ensure_ascii=False)
    OUT.write_text(
        "// AUTO-GENERATED from nethack-c/upstream/dat/tribute\n"
        "// Regenerate: python3 scripts/extract-tribute.py\n"
        "// Contest Rule #2: in-process only — no runtime filesystem.\n"
        f"export const TRIBUTE_TEXT = {body};\n",
        encoding="utf-8",
    )
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
