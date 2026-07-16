#!/usr/bin/env python3
"""Embed pager dat text files into js/generated/dat_text.js.

Contest Rule #2: no filesystem at runtime. pager.js used to read
nethack-c/upstream/dat/* via Node fs; those texts must live in-process.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DAT = ROOT / "nethack-c" / "upstream" / "dat"
OUT = ROOT / "js" / "generated" / "dat_text.js"

# Logical name → source file under dat/
# "data" is C DATAFILE built from data.base; pager looks up encyclopedia there.
FILES = {
    "data": "data.base",
    "keyhelp": "keyhelp",
    "help": "help",
    "hh": "hh",
    "history": "history",
    "opthelp": "opthelp",
    "optmenu": "optmenu",
    "cmdhelp": "cmdhelp",
    "usagehlp": "usagehlp",
    "license": "license",
    "wizhelp": "wizhelp",
}


def main() -> None:
    texts: dict[str, str] = {}
    for logical, fname in FILES.items():
        path = DAT / fname
        if not path.is_file():
            raise SystemExit(f"missing {path}")
        raw = path.read_text(encoding="utf-8", errors="replace")
        texts[logical] = raw.replace("\r\n", "\n").replace("\r", "\n")

    body = json.dumps(texts, ensure_ascii=False, indent=2)
    OUT.write_text(
        "// AUTO-GENERATED from nethack-c/upstream/dat/* for pager display_file/checkfile\n"
        "// Regenerate: python3 scripts/extract-dat-text.py\n"
        "// Contest Rule #2: in-process only — no runtime filesystem.\n"
        f"export const DAT_TEXT = {body};\n",
        encoding="utf-8",
    )
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes, {len(texts)} files)")


if __name__ == "__main__":
    main()
