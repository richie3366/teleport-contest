#!/usr/bin/env python3
"""Embed dat/symbols into js/generated/symbols_text.js.

Contest Rule #2: no filesystem at runtime. files.c read_sym_file opens the
SYMBOLS datafile; the JS port feeds this embedded text through the ported
parse_conf_file/parse_sym_line instead (D-0477 precedent).
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "nethack-c" / "upstream" / "dat" / "symbols"
OUT = ROOT / "js" / "generated" / "symbols_text.js"


def main() -> None:
    text = SRC.read_text(encoding="utf-8")
    # Sanity: the pinned file's symset roster (start: lines) must survive.
    starts = [ln for ln in text.splitlines() if ln.startswith("start:")]
    assert len(starts) >= 14, f"expected >= 14 symsets, got {len(starts)}"
    body = (
        "// AUTO-GENERATED from nethack-c/upstream/dat/symbols — do not edit.\n"
        "// Regenerate: python3 scripts/extract-symbols.py\n"
        "// C ref: files.c fopen_sym_file/read_sym_file — the SYMBOLS datafile\n"
        "// read_sym_file parses via parse_conf_file(proc_symset_line).\n"
        "// Contest Rule #2: in-process only — no runtime filesystem.\n"
        f"export const SYMBOLS_TEXT = {json.dumps(text)};\n"
    )
    OUT.write_text(body, encoding="utf-8")
    print(f"wrote {OUT} ({len(text)} chars, {len(starts)} symsets)")


if __name__ == "__main__":
    main()
