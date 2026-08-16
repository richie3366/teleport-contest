# Loop work queue

Unattended **port** iterations pop the **first unchecked** item, preferring
**Must-fix** over Open. Do not combine items. Do not invent a substitute.
Live file is **unchecked-only**. Done rows live in
`docs/archive/LOOP-QUEUE-DONE.md`.

**Keep 8–12 open `- [ ]` rows.** If Must-fix+Open drops below **8**
(including after you archive this iter’s item), **refill Open** in the
**same commit** up to **12**. Sources: named omits in the subsystem
`docs/c-js-map/*.md` row you are in (prefer `data.md` / `debt.md`, then
`absent.md`). One C function/family per line; cite C file + function.
Do not duplicate live or archived rows. Do not invent FAIL peels. Do
not enqueue parked D-0006.

## Must-fix (from reviews) — pop first

Written reviews are not theater. Each item is a Keep’d **C-wrong** (JS
contradicts C, not a named omit). After shipping: stamp the cited review
`**Addressed:** D-NNNN` (D-id only), mark the queue line `- [x]`, then
run `node scripts/archive-loop-queue-done.mjs` **in this same commit**.
Do **not** leave `- [x]` in this file. Do **not** put this commit’s hash
in the same SHA (chicken-egg), amend, or make a stamp-only follow-up.
The **next** real commit fills the short hash on the review (and on the
archive row) from `git log -1 --format=%h` of the fix.

Review iterations **prepend** new Keep’d C-wrongs here (not under Open).

## Open (map-driven, after Must-fix is empty)

- [ ] `fountain.c` `dipfountain` Excalibur LONG_SWORD body (named). Not wash_hands.
- [ ] `fountain.c` `wash_hands` (named). Not Excalibur.
- [ ] `sp_lev.c` `lspo_exclusion` populate `exclusion_zones` from `des.exclusion` (named). Not `goodpos`.
- [ ] `teleport.c` `goodpos` live-mon `onscary` when `m_id != 0` (named). Not `goodpos_onscary`.
- [ ] `teleport.c` `teleok` vibrating / pit-fly (named). Not `rloc`.
- [ ] `teleport.c` `mlevel_tele_trap` MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP arms (named). Not hole path.
- [ ] `fountain.c` `dipsink` (named). Not wash_hands.
- [ ] `fountain.c` `dipfountain` cases 17–20 uncurse (named). Not Excalibur.
- [ ] `fountain.c` `dipfountain` case 29 `mkgold` coins (named). Not wash_hands.
- [ ] `fountain.c` `drinkfountain` enlightenment body (named). Not dryup.
- [ ] `fountain.c` `gush` `minliquid` body (named). Not dogushforth.
- [ ] `fountain.c` `drinksink` case 10 `polyself` (named). Not dipsink.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
