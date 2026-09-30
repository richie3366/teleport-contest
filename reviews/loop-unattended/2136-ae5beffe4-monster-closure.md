# Review 2136 — ae5beffe4 — monster iterator and carrying closure

SHA `ae5beffe4`, D-3176; 2026-09-30; +149 JS. No review closure.

## Intent vs deliverable

“Monster iteration, pickup capacity and normal-shape closure” adds canonical
iterator, restarts pickup/carry/load/shape bodies, removes dokick iterator
clone and replaces cant_squeeze_thru's inventory walk with imported load.

## Inventory — get_iter_mons_xy

New async export; mon_offmap LIVE, callback awaited; local clone deleted.

## C ↔ JS fidelity — get_iter_mons_xy

mon.c:4559–4576 saves successor before callback, skips dead/offmap,
returns first match. Coordinates narrow signed-16. dokick.c:968 caller
awaits canonical export. Array identity lookup survives current-node unlink.

## Inventory — mpickstuff

Changed private body; predicate, split/name/extract/pickup/display callees
LIVE; can_touch_safely verified local CLONE using touch_artifact_mon.

## C ↔ JS fidelity — mpickstuff

mon.c:1846–1910 shopkeeper→non-tame-shop rn2(25)→reach guards, saved
nexthere, prize→wanted→corpse→touch→carry sequence matches. Split then name
original object even without verbose, await pline_mon, extract→pick→gear→
newsym→return. monmove.c:1680 postmov caller retained.

## Inventory — can_carry

Changed export; touch CLONE/load callees LIVE.

## C ↔ JS fidelity — can_carry

mon.c:1989–2053 notake/touch before quantity draw; quan>32767 calls
rn2(12768) once before hands/glomper, steed, shopkeeper, peaceful,
boulder/nymph and weight checks. Seven executable C callers remain wired.

## Inventory — curr_mon_load

Changed export; throws_rocks LIVE.

## C ↔ JS fidelity — curr_mon_load

mon.c:1912–1924 linked walk/boulder exemption preserved; signed-int
accumulation replaces broad JS sum. Five callers wired.

## Inventory — max_mon_load

Changed/exported body; strongmonst LIVE.

## C ↔ JS fidelity — max_mon_load

mon.c:1926–1954 zero-weight size scaling, weak/heavy corpse scaling,
strong default, sequential truncating half, clamp then int return match.
Both C callers use canonical body; no RNG.

## Inventory — normal_shape

Changed async export; newcham/new_were/seemimic/finish_meating imported or
real same-file callees, not empty stubs.

## C ↔ JS fidelity — normal_shape

mon.c:4430–4462 cham→mcan→newsym→were→mimic order represented, meal
termination matches dogmove.c:1447–1457. Both C callers await it. However
new_were (were.c:95–138) calls pline before set_mon_data/heal/armor;
js/were.js:164 uses `void pline` and immediately mutates the monster.
Awaiting its returned armor chain does **not** await this initial message.
This newly wired arm therefore lacks C's input boundary before mutation.

## Inventory — cant_squeeze_thru

Changed existing export; load clone replaced by canonical import.

## C ↔ JS fidelity — cant_squeeze_thru

hack.c:949–979 passwalls→size→load→Sokoban order retained. Imported load
matches :969; can_fog :964 remains explicitly map-named absent, not closed
by this commit. Three caller sites queried; existing wiring retained.

## Hallucinations / overclaim

“Message-producing transformations finish before subsequent mutations”
and “none” for normal_shape overclaim the unawaited new_were message.
No dispatch with empty stub, but callee fidelity still fails.
Required historical sym output:

```text
get_iter_mons_xy js/monmove.js:242 ASYNC — await required
curr_mon_load js/monmove.js:308 sync
max_mon_load js/monmove.js:323 sync
normal_shape js/mon.js:1204 ASYNC — await required
new_were js/were.js:143 sync
finish_meating js/dogmove.js:1675 sync
pline_mon js/display.js:7808 ASYNC — await required
```

new_were is sync-or-promise despite sym's sync label. Full Rule #2 clean;
mon→monmove ALREADY. Diff scan empty; no cycle-forced clone claim.

## Density

Six whole mon.c bodies plus a load-caller replacement form one closure:

- Ledger: get_iter_mons_xy ported — ACCEPT.
- Ledger: mpickstuff ported — ACCEPT.
- Ledger: can_carry ported — ACCEPT.
- Ledger: curr_mon_load ported — ACCEPT.
- Ledger: max_mon_load ported — ACCEPT.
- Ledger: normal_shape ported — QUALITY-RISK.
- Ledger: cant_squeeze_thru existing partial — ACCEPT-WITH-DEBT.

Per-function Verify/Ledger present for six ports. Named inherited can_fog
debt is explicit; generic “independent implementation debt” does not
establish new_were's message fidelity.

## Verification

Historical seven together, `--base ae5beffe4~1 --reach-all`:

| Function | verify | reach/smoke |
|---|---|---|
| get_iter_mons_xy | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| mpickstuff | 0 blocked, vacuous | 3 reaching PASS, 0 regressed, REACH-OK |
| can_carry | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| curr_mon_load | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| max_mon_load | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| normal_shape | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| cant_squeeze_thru | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |

D-log green/strict, cohort 7/7, full 44/44; smoke does not exercise this
visible were-transformation message boundary.

## Actionable C-wrongs

1. Close normal_shape→new_were's message continuation: complete visible
transformation pline before monster mutation, armor, scared-tail RNG and
mimic processing; propagate completion through its callers.

Verdict: **QUALITY-RISK**
