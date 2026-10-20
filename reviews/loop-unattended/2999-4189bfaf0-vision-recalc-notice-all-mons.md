# Review 2999 — 4189bfaf0 — vision_recalc ends in notice_all_mons; postmov notices

- SHA: `4189bfaf0` (cliff; board head use_mirror, a message-owner label for
  «You see …», 3 options rows; writers vision.c vision_recalc tail and
  monmove.c postmov entry)
- D-entry: D-4159; Ledger: vision_recalc ported; notice_all_mons ported
- `js/` diff: 28 files, +110 −98 (mostly `await` at call sites)

## Intent vs deliverable

Promise: vision_recalc's `skip:` tail ends in `notice_all_mons(TRUE)`
(vision.c :856), and postmov begins with `notice_mon(mtmp)` (monmove.c
:1470). With spot_monsters on, those two calls print «You see your
kitten.». JS vision_recalc was sync with no tail, and postmov had
`// notice_mon deferred`.

Diff: vision_recalc becomes `async` and awaits notice_all_mons on both
exits. postmov awaits notice_mon on entry. 44 call sites in 22 files
gain `await`. Three sync wrappers become async: vpline_flush_vision,
unblock_door and migrate_to_level. The human lifted the hot-pack "do not
notice_all_mons" guard for this entry (2026-10-20). The promise matches
the diff.

## Inventory

- `vision_recalc` — vision.js:1085–1300; C vision.c:512–857.
- `postmov` — monmove.js:1701+; C monmove.c:1462–1470 (entry).
- `unblock_door` — monmove.js:1354 (C UnblockDoor macro, 3 callers in
  postmov, all awaited).
- `vpline_flush_vision` — display.js:10388 (4 callers, each `if
  (game.vision_full_recalc) await …`).
- `migrate_to_level` — teleport.js:2839 (16 of 17 callers awaited).
- Callees `notice_all_mons` / `notice_mon` — hack.js (exported, LIVE;
  C-exact since D-1142/D-1194/D-1200).

C callers (`csym --callers`): notice_all_mons has allmain.c:848,
do.c:1972, teleport.c:571 and vision.c:856, all four now wired.
notice_mon has hack.c:1778 and monmove.c:1470, both wired. The hack.js
doc comment drops the old "Named omit: read.c / wizcmds.c / save.c".
Pinned C has no such callers, so the drop is a correction, not a lost
omission.

## C ↔ JS fidelity

**Exits.** C returns early at :531 (`in_mklev || in_getlev ||
!vision_inited`), before `skip:`, and JS does the same. The only `goto
skip` (:583) is the Blind arm. JS's Blind branch now ends with the
`newsym(u.ux, u.uy)` + notice tail. The normal end runs `viz_rmin/rmax`,
then the notice. The order is C's.

**Async shape.** Everything before the final `await` runs synchronously,
as before. A caller that does not await gets the vision update
immediately and only loses the order of a notice message. A grep for
unawaited calls finds none to `vision_recalc(`. The one unawaited
wrapper is `migrate_to_level` at mklev.js:2513 (migrate_orc). Its only
`await` is the last statement (`if (emits_light) await vision_recalc(0)`,
C dog.c tail), and during mklev vision_recalc returns at the :531 gate.
So the unawaited call changes nothing, as the D-log says.

**postmov.** C computes canseeit/didseeit, then calls notice_mon, then
`if (mmoved == MMOVE_MOVED)`. JS calls notice_mon first and computes
canseeit inside the arm. notice_mon only prints and sets `mspotted`, and
cansee does not depend on either, so the two orders are equivalent.

## Hallucinations / overclaim

None in the port. One latent JS bug is **masked, not fixed**. The D-log
says an unconditional `await vpline_flush_vision()` (one microtask per
pline) broke 4 sessions: the cold-damage «freezes and shatters!» path
painted post-damage HP, plus an options `--More--`. That means some pline
chain on those paths is not awaited, and its order depends on scheduling.
The `if (vision_full_recalc)` guard is semantically neutral, because the
wrapper is a no-op otherwise. But the race is still there and will come
back when anything on that path yields. The D-log names it as a Lead,
with probe scen-sweep-Priest-95316 s679 (memory: async-conversion
microtask yield). No session fails today, so this is debt, not a
Must-fix (§10.19).

## Density

Two missing C calls. The sync→async ripple is the necessary cost, and
the call-site edits carry no logic.

## Verification

```text
verify use_mirror,vision_recalc,notice_all_mons,postmov --base 4189bfaf0~1 --no-reach
  use_mirror: 3 PASS (scen-options-Archeologist-51451011, -Priest-50557401,
              -Wizard-49959001) → PROGRESS
  vision_recalc / notice_all_mons / postmov: 0 blocked (vacuous)
```

This reproduces the claim. The D-log's sweep of 676 baseline PASS (0
regressed with the guard) is re-checked by this audit's full rescore.

## Actionable C-wrongs

None queued. Debt: an unawaited pline chain on the destroy_items cold
path (probe: drop the vpline guard → scen-sweep-Priest-95316 s679).

Verdict: **ACCEPT-WITH-DEBT**
