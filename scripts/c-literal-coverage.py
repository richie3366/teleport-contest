#!/usr/bin/env python3
"""Message literals in the pinned C that no js/ file contains.

A C message the JS tree cannot print is an arm that was never ported
(Constitution §10.20, completeness audit). For every string literal of
14+ characters on a line of upstream src/*.c that calls a message or
prompt function, the longest %-free chunk (>= 10 chars) is searched in
js/*.js + js/generated/*.js. Heuristic: a hit can be a coincidence and
error/environment paths (files.c, mail.c, restore.c, nhlua.c) are
expected misses; read the C before porting.

    python3 scripts/c-literal-coverage.py            # per-file counts + one example
    python3 scripts/c-literal-coverage.py --all      # every missing literal
    python3 scripts/c-literal-coverage.py --file dig.c
"""
from __future__ import annotations

import collections
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CALLS = re.compile(
    r"\b(pline|You|Your|You_feel|You_hear|You_see|You_cant|pline_The|There|Norep|"
    r"verbalize|Sprintf|Strcpy|Strcat|com_pager|custompline|urgent_pline|putstr|"
    r"yn_function|getlin)\b")
SKIP = re.compile(r"\b(impossible|raw_printf|panic|debugpline\d?)\b")
LIT = re.compile(r'"((?:[^"\\\n]|\\.)*)"')
FMT = re.compile(r"%[-+ #0-9.*]*[a-zA-Z]")


def main() -> None:
    args = sys.argv[1:]
    show_all = "--all" in args
    only = args[args.index("--file") + 1] if "--file" in args else None
    js = "".join(p.read_text(encoding="utf-8", errors="ignore")
                 for p in [*ROOT.glob("js/*.js"), *ROOT.glob("js/generated/*.js")])
    js = js.replace('\\"', '"').replace("\\'", "'")
    missing: dict[str, list[str]] = collections.defaultdict(list)
    total: collections.Counter[str] = collections.Counter()
    for f in sorted(ROOT.glob("nethack-c/upstream/src/*.c")):
        if only and f.name != only:
            continue
        src = re.sub(r"/\*.*?\*/", "", f.read_text(encoding="utf-8", errors="ignore"), flags=re.S)
        for line in src.split("\n"):
            if not CALLS.search(line) or SKIP.search(line):
                continue
            for m in LIT.finditer(line):
                s = m.group(1).replace('\\"', '"')
                if len(s) < 14 or " " not in s:
                    continue
                chunks = [c for c in FMT.split(s) if len(c.strip()) >= 10]
                if not chunks:
                    continue
                total[f.name] += 1
                if max(chunks, key=len) not in js:
                    missing[f.name].append(s)
    n_miss = sum(len(v) for v in missing.values())
    print(f"{n_miss} of {sum(total.values())} C message literals absent from js/")
    for name, lits in sorted(missing.items(), key=lambda kv: -len(kv[1])):
        if show_all or only:
            print(f"{name}  {len(lits)}/{total[name]}")
            for s in lits:
                print(f"    {s}")
        else:
            print(f"{name:16} {len(lits):4}/{total[name]:<4}  e.g. {lits[0][:70]!r}")


if __name__ == "__main__":
    main()
