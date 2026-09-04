#!/usr/bin/env python3
"""Embed dat/oracles.txt + makedefs special_oracle into js/generated/oracles_data.js.

Contest Rule #2: no filesystem at runtime. rumors.c outoracle opens
ORACLEFILE via dlb; Chrome cannot read dat/. Records are plaintext
(C xcrypt is an involution applied at pack and display).
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "nethack-c" / "upstream" / "dat" / "oracles.txt"
OUT = ROOT / "js" / "generated" / "oracles_data.js"

# C util/makedefs.c special_oracle[] — first outoracle record (cheapskate).
# Adjacent string literals concatenate, including the 10-space pad.
SPECIAL_ORACLE = [
    '"...it is rather disconcerting to be confronted with the',
    "following theorem from [Baker, Gill, and Solovay, 1975].",
    "",
    "Theorem 7.18  There exist recursive languages A and B such that",
    "  (1)  P(A) == NP(A), and",
    "  (2)  P(B) != NP(B)",
    "",
    "This provides impressive evidence that the techniques that are",
    "currently available will not suffice for proving that P != NP or          ",
    'that P == NP."  [Garey and Johnson, p. 185.]',
]


def parse_oracles_txt(text: str) -> list[list[str]]:
    records: list[list[str]] = []
    cur: list[str] = []
    in_oracle = False
    for raw in text.splitlines():
        line = raw.rstrip("\r")
        if line.startswith("#"):
            continue
        if line.startswith("-----"):
            if not in_oracle:
                continue
            in_oracle = False
            records.append(cur)
            cur = []
        else:
            in_oracle = True
            cur.append(line)
    if in_oracle and cur:
        records.append(cur)
    return records


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"missing {SRC}")
    raw = SRC.read_text(encoding="utf-8", errors="replace")
    recs = [SPECIAL_ORACLE, *parse_oracles_txt(raw)]
    body = json.dumps(recs, ensure_ascii=False)
    OUT.write_text(
        "// AUTO-GENERATED from nethack-c/upstream/dat/oracles.txt"
        " + makedefs special_oracle\n"
        "// Regenerate: python3 scripts/extract-oracles.py\n"
        "// Contest Rule #2: in-process only — no runtime filesystem.\n"
        f"export const ORACLE_RECORDS = {body};\n",
        encoding="utf-8",
    )
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes, {len(recs)} records)")


if __name__ == "__main__":
    main()
