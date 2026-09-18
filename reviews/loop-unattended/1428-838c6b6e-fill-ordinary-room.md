# Review 1428 — 838c6b6e — fill_ordinary_room whole-body restart (D-2469)

Metadata: SHA `838c6b6e`, `js/mklev.js` only (152 ins / 133 del —
a restart, not an addition). D-log: D-2469.

## Intent vs deliverable

Promise: whole `fill_ordinary_room` (`mklev.c:936–1171`, 236 L) in
C order — amulet/WEB sleeper, live `mktrap`, rogue skip, new
`mksink`, `mkgrave` rename with dobell/curse, supply-chest arms.
Diff ships exactly that; the deleted lines are the thin prior port
(`mktrap_room` clone, inline sink, `mkgrave_room`, amulet-blind
sleeper, rogue-gateless dressing). No second subsystem.

## Inventory

- Rewrote: `async function fill_ordinary_room` (module-local; C
  staticfn — local scope correct).
- Added: module-local `mksink` (C staticfn `:2316–2329`), rewrote
  module-local `mkgrave` (C staticfn `:2352–2397`, now async for
  awaited `curse`).
- Deleted: `mktrap_room` clone → live same-file `mktrap(0,
  MKTRAP_NOFLAGS, croom, null)`; `mkgrave_room` → `mkgrave`.
- `sym.mjs` (required, deleted/re-pointed symbols):
  `mktrap_room NOT FOUND in js/**`; `mkgrave_room NOT FOUND in
  js/**` — both fully retired, no second clone.
- `mktrap`/`mktrap_seen_victim`/`traptype_rnd` resolve to mklev.js
  locals — these are the D-2304 ports of C **mklev.c**'s own
  `mktrap` dispatcher family (same C file, same module), not drift.
  `maketrap` is sync (`js/trap.js:933`), so the new un-awaited
  `maketrap(...)` inside sync `mktrap` drops no await (the old
  `await` was on a sync value). `curse` is ASYNC (`js/mkobj.js:544`)
  and is awaited in `mkgrave`.

## C ↔ JS fidelity

- Entry: rtype OROOM/THEMEROOM gate, subrooms recurse before
  needfill, null-subroom now `await impossible` + return (old port
  silently returned — a fix toward C) — exact.
- Sleeper: `(amulet || !rn2(3))` short-circuit (old port always drew
  — fixed), `makemon(null, x, y, MM_NOGRP)`, spider check
  (`mndx === PM_GIANT_SPIDER` = C `data == &mons[…]` idiom) +
  `!occupied` → `maketrap(WEB)`, return discarded — exact.
- Trap loop: `x = 8 - trunc(difficulty/6)`, `x<=1 → 2`,
  `while (!rn2(x) && ++trycnt < 1000)` + live dispatcher (rogue
  kinds, Gehennom fire bias, hole→rocktrap, occupied/boulder retry,
  seen/victim tail) — exact; the old clone's missing arms are the
  point of the restart.
- Rogue: `if (!Is_rogue_level)` wraps fount/sink/altar/grave/statue/
  bonus/chest/graffiti = C `goto skip_nonrogue` (old port had no
  gate at all — fixed); random-object tail outside — exact.
- `mksink`: find_okay_roompos + `typ = SINK` + `nsinks++`. C calls
  `set_levltyp` (recount + ice-melt arms). Analyzed, not a wrong:
  `somexyspace` yields only ROOM/CORR/ICE (`mkroom.c:743–756`), so
  the LADDER/STAIRS FALSE arm cannot fire; ICE melt arms
  (`obj_ice_effects`, `spot_stop_timers`) are no-ops on a fresh
  level with no corpses/timers; the count delta is the named
  recount omit (shared with trap.js `set_levltyp`, which is live).
- `mkgrave`: `dobell = !rn2(10)` drawn **before** the OROOM gate
  (preserves THEMEROOM draw consumption — called out in-code);
  buried-gold formula `rnd(20)+difficulty*rnd(5)` (not mkgold's);
  `for (tryct = rn2(5); …)` + null→return + awaited curse +
  `add_to_buried`; dobell → `mksobj_at(BELL,…,TRUE,FALSE)` — exact.
- Supply chest: `rn2(5)<3` food ladder, `rn2(3)` chest/large-box
  reversal, `olocked = !!rn2(6)`, `rn2(2) ? POT_HEALING :
  supply[rn2(9)]` (9 items — matches C's 9), quan-2 arm, `++tryct
  >= 50` + impossible + break (= C `== 50` after unit increments),
  `while (cursed || !rn2(5))`, `rn2(3)` extra-class arm with the
  10-entry table (3× SPBOOK_no_NOVEL) and depth-gated
  lower-book bias — exact.
- Chest `rn2(3) ? LARGE_BOX : CHEST` (reversed vs supply — = C),
  `rn2(nroom*5/2)`, graffiti `rn2(27+3*|depth|)` with the
  ROOM-break-before-`rn2(40)` loop (= C short-circuit order), tail
  `trycnt > 100` + `overflow4` — exact.

## Hallucinations / overclaim

None. "Every callee live" holds modulo the disclosed recount omit;
the old clone's silent arms (amulet, rogue, spider) are fixed, not
renamed.

## Density

One 236-line C function restarted, one module: right-sized (net
+19 lines for a full-arm port).

## Verification

- `hidden-proxy verify fill_ordinary_room --base 838c6b6e~1
  --reach-all` (re-run): 0 blocked both sides — vacuous, as the
  D-log states. Reach: 495 baseline-PASS reach, 495 run,
  0 regressed → REACH-OK. Matches the D-log exactly.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
