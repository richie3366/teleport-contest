#!/usr/bin/env python3
"""Regenerate js/generated/seffects_data.js from pinned seffects.h.

C ref: include/sndprocs.h enum sound_effect_entries —
se_zero_invalid = 0, then the seffect() X-macro, then
number_of_se_entries. Contest recorder has no SND_LIB_* so
Soundeffect() is an empty macro; the enum values are still the
call-site identity.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "nethack-c/upstream/include/seffects.h"
OUT = ROOT / "js/generated/seffects_data.js"

SEFFECT_RE = re.compile(r"^\s+seffect\((\w+)\)\s*,?\s*$")


def parse_basenames(text: str) -> list[str]:
    names: list[str] = []
    for line in text.splitlines():
        stripped = line.lstrip()
        if stripped.startswith("#"):
            continue
        m = SEFFECT_RE.match(line)
        if m:
            names.append(m.group(1))
    if not names:
        raise SystemExit(f"no seffect() rows in {SRC}")
    if names[0] != "air_crackles" or names[-1] != "zap_then_explosion":
        raise SystemExit(
            f"unexpected seffects envelope: first={names[0]!r} last={names[-1]!r}"
        )
    return names


def main() -> int:
    names = parse_basenames(SRC.read_text())
    lines = [
        "// AUTO-GENERATED from nethack-c/upstream/include/seffects.h",
        "// Regenerate: python3 scripts/extract-seffects.py",
        "// C ref: sndprocs.h enum sound_effect_entries (se_zero_invalid=0).",
        "export const se_zero_invalid = 0;",
    ]
    for i, name in enumerate(names, start=1):
        lines.append(f"export const se_{name} = {i};")
    nentries = len(names) + 1
    lines.append(f"export const number_of_se_entries = {nentries};")
    lines.append("")
    OUT.write_text("\n".join(lines))
    print(
        f"wrote {OUT.relative_to(ROOT)} "
        f"({len(names)} seffects, number_of_se_entries={nentries})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
