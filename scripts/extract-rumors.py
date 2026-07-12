#!/usr/bin/env python3
"""Regenerate js/generated/rumors_data.js from pinned NetHack rumor sources."""
from __future__ import annotations
import json, subprocess, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
COMMIT = "16ff59115"
MD_PAD = 60
OUT = ROOT / "js/generated/rumors_data.js"

def padline(line: str) -> str:
    length = len(line)
    if length <= MD_PAD:
        content = line[:-1]
        while length < MD_PAD:
            content += "_"
            length += 1
        return content + "\n"
    return line

def xcrypt(s: str) -> str:
    bitmask = 1
    out = []
    for ch in s:
        c = ord(ch)
        if c & (32 | 64):
            c ^= bitmask
        out.append(chr(c))
        bitmask <<= 1
        if bitmask >= 32:
            bitmask = 1
    return "".join(out)

def build(ext: str) -> str:
    raw = subprocess.check_output(
        ["git", "-C", str(ROOT / "nethack-c/upstream"), "show", f"{COMMIT}:dat/rumors{ext}"]
    )
    text = raw.decode("latin-1")
    buf = ""
    for line in text.splitlines(True):
        if not line.endswith("\n"):
            line += "\n"
        buf += xcrypt(padline(line))
    return buf

def main() -> int:
    true_buf, false_buf = build(".tru"), build(".fal")
    OUT.write_text(
        f"// AUTO-GENERATED from nethack-c rumors at {COMMIT} via makedefs pad+xcrypt\n"
        f"// Regenerate: python3 scripts/extract-rumors.py\n"
        f"export const TRUE_RUMOR_BUF = {json.dumps(true_buf)};\n"
        f"export const FALSE_RUMOR_BUF = {json.dumps(false_buf)};\n"
        f"export const MD_PAD_RUMORS = {MD_PAD};\n"
    )
    print(f"wrote {OUT} (true={len(true_buf)}, false={len(false_buf)})")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
