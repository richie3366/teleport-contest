#!/usr/bin/env python3
"""Regenerate js/generated/bogusmon_data.js from pinned NetHack bogusmon.txt.

Mirrors util/makedefs.c do_rnd_access_file(BOGUSMONFILE) + mdgrep MAIL=1:
plaintext don't-edit header (omitted from buffer), default line, then
pad+xcrypt of non-comment source lines with ^ control lines applied.
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMIT = "16ff59115"
MD_PAD = 20
# Contest / recorder build: MAIL defined (util/mdgrep.h).
GREP_DEFS = {"MAIL": True}
DEFAULT = "grue\n"
OUT = ROOT / "js/generated/bogusmon_data.js"


def padline(line: str) -> str:
    length = len(line)  # includes newline
    if length <= MD_PAD:
        content = line[:-1]
        while length < MD_PAD:
            content += "_"
            length += 1
        return content + "\n"
    return line


def xcrypt(s: str) -> str:
    bitmask = 1
    out: list[str] = []
    for ch in s:
        c = ord(ch)
        if c & (32 | 64):
            c ^= bitmask
        out.append(chr(c))
        bitmask <<= 1
        if bitmask >= 32:
            bitmask = 1
    return "".join(out)


def apply_grep(text: str) -> list[str]:
    """Minimal mdgrep: ^?NAME / ^!NAME / ^. control lines (makedefs.c)."""
    out: list[str] = []
    skip_depth = 0
    for line in text.splitlines(True):
        if not line.endswith("\n"):
            line += "\n"
        if line.startswith("^"):
            cmd = line[1:].strip()
            if cmd.startswith("?"):
                name = cmd[1:].split()[0] if cmd[1:] else ""
                if not GREP_DEFS.get(name, False):
                    skip_depth += 1
            elif cmd.startswith("!"):
                name = cmd[1:].split()[0] if cmd[1:] else ""
                if GREP_DEFS.get(name, False):
                    skip_depth += 1
            elif cmd.startswith(".") or cmd == "":
                if skip_depth > 0:
                    skip_depth -= 1
            continue
        if skip_depth == 0:
            out.append(line)
    return out


def build() -> str:
    raw = subprocess.check_output(
        [
            "git",
            "-C",
            str(ROOT / "nethack-c/upstream"),
            "show",
            f"{COMMIT}:dat/bogusmon.txt",
        ]
    )
    text = raw.decode("latin-1")
    buf = xcrypt(padline(DEFAULT))
    for line in apply_grep(text):
        if line[0] in "#\n":
            continue
        buf += xcrypt(padline(line))
    return buf


def main() -> int:
    buf = build()
    OUT.write_text(
        f"// AUTO-GENERATED from nethack-c bogusmon.txt at {COMMIT}\n"
        f"// via makedefs do_rnd_access_file pad+xcrypt (MAIL=1)\n"
        f"// Regenerate: python3 scripts/extract-bogusmon.py\n"
        f"export const BOGUSMON_BUF = {json.dumps(buf)};\n"
        f"export const MD_PAD_BOGUSMON = {MD_PAD};\n"
    )
    print(f"wrote {OUT} (chunk={len(buf)})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
