#!/usr/bin/env python3
"""Special-level audit, static half (dynamic half: scripts/level-audit.mjs).

See reviews/level-audit/2026-10-20-special-levels.md.

1. Dispatch: every dat/<level>.lua has a load_* loader in js/mklev.js.
2. Maps: every Lua [[...]] map is in js/mklev.js byte-for-byte (template
   literal, '\\n' string, or ['row', ...].join('\\n') array form).
3. Call sequences (filler / room-style levels): des.room/stair/object/
   monster/trap/random_corridors in Lua order vs the loader's splev_*
   calls (for-loops unrolled). Usage: level-audit-static.py [level ...]
   (default: every *-fila/*-filb plus minefill).
4. Epilogue: which sp_lev.c load_special :6464-6494 steps each loader
   inlines (link_doors_rooms, remove_boundary_syms, ensure_way_out,
   map_cleanup, wallification, flip_level_rnd, solidify, fixup_special,
   premap) next to the Lua flags that require them.
"""
import difflib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DAT = ROOT / 'nethack-c/upstream/dat'
JS = (ROOT / 'js/mklev.js').read_text(encoding='utf-8', errors='replace')
LINES = JS.split('\n')
NONLEVEL = {'dungeon', 'nhcore', 'nhlib', 'quest', 'themerms'}

fdef = {}
for i, l in enumerate(LINES):
    m = re.match(r'^(?:export )?(?:async )?function ([A-Za-z0-9_]+)\s*\(', l)
    if m:
        fdef[m.group(1)] = i
starts = sorted(fdef.values())


def fn_body(name):
    i = fdef[name]
    nxt = next((s for s in starts if s > i), len(LINES))
    return re.split(r'\n/\*\*', '\n'.join(LINES[i:nxt]))[0]


def loader_body(fn, depth=2):
    """Loader + same-file helpers it calls whose names start with load_/soko_/hellfill_."""
    seen, out, todo = set(), [], [(fn, 0)]
    while todo:
        f, d = todo.pop()
        if f in seen or f not in fdef:
            continue
        seen.add(f)
        b = fn_body(f)
        out.append(b)
        if d < depth:
            for c in set(re.findall(r'\b((?:load_|soko_|hellfill_)[A-Za-z0-9_]+)\(', b)):
                todo.append((c, d + 1))
    return '\n'.join(out)


dispatch = dict(re.findall(
    r"protofile === '([^']+)'\)\s*\{\s*(?:\{\s*const p = |await )(load_[A-Za-z0-9_]+)\(", JS))
levels = sorted(p.stem for p in DAT.glob('*.lua') if p.stem not in NONLEVEL)


def rows(s):
    return [r.rstrip() for r in s.strip('\n').split('\n')]


def js_map_literals():
    lits = []
    expand = lambda t: re.sub(r"\$\{'(.)'\.repeat\((\d+)\)\}", lambda m: m.group(1) * int(m.group(2)), t)
    for m in re.finditer(r'`([^`]*)`', JS):
        lits.append(rows(expand(m.group(1)).replace('\\\\', '\\')))
    for m in re.finditer(r"'((?:[^'\\\n]|\\.)*\\n(?:[^'\\\n]|\\.)*)'", JS):
        lits.append(rows(m.group(1).encode().decode('unicode_escape')))
    for m in re.finditer(r"\[\s*(?://[^\n]*\n\s*)?((?:'(?:[^'\\\n]|\\.)*'\s*,\s*)+'(?:[^'\\\n]|\\.)*'\s*,?\s*)\]", JS):
        lits.append([r.replace('\\\\', '\\').rstrip() for r in re.findall(r"'((?:[^'\\\n]|\\.)*)'", m.group(1))])
    return lits


def lua_code(p):
    t = re.sub(r'--\[\[.*?\]\]', '', (DAT / f'{p}.lua').read_text(), flags=re.S)
    return t


def arg1(s):
    m = re.match(r'\s*["\']([^"\']*)["\']', s)
    return m.group(1) if m else ''


def lua_seq(p):
    t = '\n'.join(l.split('--')[0] for l in lua_code(p).split('\n'))
    seq = []
    for m in re.finditer(r'des\.(room|stair|object|monster|trap|random_corridors)\s*\(([^\n]*)', t):
        k, a = m.group(1), m.group(2)
        if k == 'room':
            tm = re.search(r'type\s*=\s*"([^"]+)"', a)
            seq.append('room:' + (tm.group(1) if tm else 'ordinary'))
        elif k == 'stair':
            seq.append('stair:' + arg1(a))
        elif k in ('object', 'monster', 'trap'):
            im = re.search(r'(?:id|class)\s*=\s*"([^"]+)"', a) or re.search(r'\band\s+"([^"]+)"', a)
            seq.append(k + ':' + (im.group(1) if im else arg1(a)))
        else:
            seq.append('corr')
    return seq


JS_OBJ_CONST = {'GEM_CLASS': '*', 'TOOL_CLASS': '(', 'null': ''}


def js_seq(body):
    body = re.sub(r'for \(let i = 0[^;]*; i < (\d+); i\+\+\)\s*([^\n;]*;)',
                  lambda m: '\n'.join([m.group(2)] * int(m.group(1))), body)
    seq = []
    pat = (r'\b(splev_ordinary_room|splev_des_room|splev_room_stair|splev_create_stair|'
           r'splev_room_object\w*|splev_create_object|splev_room_monster\w*|splev_create_monster|'
           r'splev_room_trap|splev_create_trap|splev_create_boulder|makecorridors)\s*\(([^\n]*)')
    for m in re.finditer(pat, body):
        k, a = m.group(1), m.group(2)
        q = re.search(r"'([^']+)'", a)
        if k == 'splev_ordinary_room':
            seq.append('room:ordinary')
        elif k == 'splev_des_room':
            tm = re.search(r"type:\s*'([^']+)'", a)
            seq.append('room:' + (tm.group(1) if tm else 'ordinary'))
        elif 'stair' in k:
            seq.append('stair:' + ('up' if 'true' in a else 'down'))
        elif 'object' in k:
            c = re.match(r'\s*(?:r,\s*)?([A-Z_]+|null)', a)
            seq.append('object:' + (q.group(1) if q else JS_OBJ_CONST.get(c.group(1), '?') if c else ''))
        elif 'monster' in k:
            seq.append('monster:' + (q.group(1) if q else ''))
        elif k == 'splev_create_boulder':
            seq.append('object:boulder')
        elif 'trap' in k:
            c = re.match(r'\s*(?:r,\s*)?([A-Z_]+)_TRAP\b', a)
            seq.append('trap:' + (q.group(1) if q else c.group(1).lower().replace('_', ' ') if c else ''))
        else:
            seq.append('corr')
    return seq


def main():
    missing = [l for l in levels if l not in dispatch]
    print(f'1. dispatch: {len(levels) - len(missing)}/{len(levels)} levels have a JS loader'
          + (f'; missing: {missing}' if missing else ''))

    lits = js_map_literals()
    n = bad = 0
    for p in levels + ['themerms']:
        for m in re.finditer(r'\[\[(.*?)\]\]', lua_code(p), flags=re.S):
            if '\n' not in m.group(1).strip('\n'):
                continue
            n += 1
            mp = rows(m.group(1))
            if mp in lits or m.group(1).lstrip('\n').rstrip() in JS:
                continue
            if p == 'water' and len(mp) == 20 and all(r == 'W' * 76 for r in mp):
                continue  # js builds it as 'W'.repeat(76) x 20
            bad += 1
            print(f'   MAP NOT FOUND: {p}: {mp[:2]}')
    print(f'2. maps: {n - bad}/{n} Lua maps found byte-exact in js/mklev.js')

    targets = sys.argv[1:] or [l for l in levels if l.endswith(('-fila', '-filb'))] + ['minefill']
    print('3. call sequences (Lua des.* order vs loader splev_* order):')
    for p in targets:
        a, b = lua_seq(p), js_seq(loader_body(dispatch[p]))
        if a == b:
            print(f'   {p}: identical ({len(a)} calls)')
            continue
        print(f'   {p}: DIFF lua={len(a)} js={len(b)} (check by hand; inline door/trap code is not tokenized)')
        for l in difflib.unified_diff(a, b, lineterm='', n=0):
            if not l.startswith(('---', '+++', '@@')):
                print('      ', l)

    print('4. epilogue steps inlined per loader (C sp_lev.c load_special :6464-6494):')
    steps = ['link_doors_rooms', 'remove_boundary_syms', 'ensure_way_out', 'map_cleanup',
             'wallification', 'flip_level_rnd', 'solidify', 'fixup_special', 'premap']
    count = {s: 0 for s in steps}
    for p in levels:
        b = loader_body(dispatch[p])
        flags = set()
        for fl in re.findall(r'des\.level_flags\(([^)]*)\)', lua_code(p)):
            flags |= set(re.findall(r'"([a-z_]+)"', fl))
        have = {s: bool(re.search(r'\b' + s + r'\w*\(', b)) or (s == 'solidify' and 'W_NONPASSWALL' in b)
                for s in steps}
        for s in steps:
            count[s] += have[s]
        probs = []
        if 'inaccessibles' in flags and not have['ensure_way_out']:
            probs.append('inaccessibles without ensure_way_out')
        if 'solidify' in flags and not have['solidify']:
            probs.append('solidify flag without solidify')
        if 'premapped' in flags and not have['premap']:
            probs.append('premapped flag without premap')
        if any('B' in r for r in re.findall(r'\[\[(.*?)\]\]', lua_code(p), flags=re.S)) and not have['remove_boundary_syms']:
            probs.append("map has 'B' (CROSSWALL) but no remove_boundary_syms")
        if probs:
            print(f'   {p}: {"; ".join(probs)}')
    print('   loaders inlining each step: ' + ', '.join(f'{s} {c}/{len(levels)}' for s, c in count.items()))


main()
