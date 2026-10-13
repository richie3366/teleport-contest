# Review 2763 — 6cd92781b — find_lev_obj rebuild trio via place_object

- SHA: `6cd92781bd4a630b2078b6ca17f4a9f6a2f94108`
- Subject: D-3910 find_lev_obj `:70–107` naive prepend left corpse over boulder (Healer-585512 s781 → PASS)
- Type: cliff (≤10 functions), whole Method on the three sites
- D-entry: `## D-3910` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: the `rebuildObjectsAt` trio rebuilt piles by naive prepend
without place_object's boulder threading. Fix restarts all three as
the C body in C order (zero, reverse+FREE, re-place oldest-first via
live place_object, gated ball/chain fixup); Healer-585512 s781 → FULL
PASS.

Diff actually adds: `js/do.js` + `js/save.js` + `js/bones.js` (3
restarts, 85+/36−, same names/signatures) + new focused test
`scripts/find-lev-obj-boulder-top.test.mjs`. Imports only extend
existing edges.

## Inventory

| JS site | C locus | Status |
|---|---|---|
| rebuildObjectsAt js/do.js:1445 | restore.c:70–107 (csym) | restarted |
| rebuildObjectsAt js/save.js:215 | restore.c:70–107 (csym) | restarted |
| rebuildObjectsAt js/bones.js:587 | restore.c:70–107 (csym) | restarted |

## C ↔ JS fidelity

C (`restore.c:70–107`, csym): zero grid (`:77–79`) → reverse fobj with
OBJ_FREE each (`:86–91`) → pop + `place_object(otmp, ox, oy)` (`:95–98`)
→ `u.uz.dlevel`-gated `setworn` for W_BALL|W_CHAIN (`:101–105`). All
three JS sites now match line-for-line, including pop-before-place
(place rewrites nobj) and the dlevel gate shape.

Dependency audit (the fix stands or falls on these): `place_object`
(js/mkobj.js:2966, LIVE export) carries the under-boulder rule
(`:3002–3008`, last-consecutive-boulder threading), rebuilds
`game.fobj` (`:3023–3024` — the dance restores original chain order),
and gates on OBJ_FREE (`:2985` — hence the FREE pass). `setworn`
(js/do_wear.js:653, LIVE) with the W_BALL|W_CHAIN consts. Call-site
order verified at all three: rooms via rest_rooms before rebuild
(costly_spot inside place), `game.fobj = info.fobj` before
(do.js:2083/2104, save.js:1132/1153, bones.js:706/720).

Sole C caller restore.c:1168 (getlev, incl. ghostly) → the three JS
getlev twins, all restarted; no fourth rebuild exists (do.js:2017 is
teardown detach, mklev.js:2956 is fresh level-gen — both correctly
untouched). No RNG in C or JS here.

Helper classification: `place_object`/`setworn` LIVE imports
(`--can` bones→do_wear: ALREADY, no new edge; save/bones mkobj and
const extensions all ALREADY). No clones, no stubs. Nothing deleted or
re-pointed. Grep: zero `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seeds/
coords.

## Hallucinations / overclaim

None. The archaeology (s526 first-seen, s538–780 off-level, no creation
draws at s781, rot refuted) genuinely isolates load-rebuild as the
writer. The restore_timers-vs-rebuild ordering gap is named as
reviewed-but-untouched with its blast radius (ice-cell corpses, no ice
here) — honest, and correctly not queued (no session evidence; getlev
sequencing, not this function).

## Density

Cliff phase: level_tele row-2 (D-3902's own Next named s781 as its
future cliff — this closes exactly it), head UNPORTABLE-terminal; owner
symptom-only, writer whole including the shipped ledger omit.
`Ledger: find_lev_obj ported` with the triple js-site present. Not a no-op.

## Verification

D-log: focused test 1/1; `verify level_tele: 1 PASS`, reach 23/23,
green/strict/cohort, full 44/44 (shared file).
Audit re-measure (`verify level_tele,find_lev_obj --base 6cd92781b~1
--reach-all`): `scen-sweep-Healer-585512: PASS`;
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`; reach 23/23 →
REACH-OK; find_lev_obj vacuous-note honest + smoke 24/24. Claim
confirmed verbatim. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
