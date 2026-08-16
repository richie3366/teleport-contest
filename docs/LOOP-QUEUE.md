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

- [ ] `mon.c` `kill_eggs` after genocide (named from sit D-1034). Not seffects SCR_GENOCIDE.
- [ ] `read.c` `seffects` SCR_GENOCIDE (named from sit). Not kill_eggs.
- [ ] `teleport.c` `goodpos` youmonst Swimming/Amphibious/Levitation/Flying/Wwalking pool and lava arms (named). Not `passes_walls`.
- [ ] `teleport.c` `goodpos` `passes_walls` + `may_passwall` early-out (named). Not youmonst swim.
- [ ] `teleport.c` `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone` (named). Not `onscary`.
- [ ] `teleport.c` `goodpos_onscary` Elbereth / SCR_SCARE_MONSTER / altar-vampire (named). Not `is_pool`.
- [ ] `dbridge.c` `db_under_typ` / `hack.c` `waterbody_name` SURFACE_AT (named from D-1077 review 38). Not `goodpos`.
- [ ] `fountain.c` `dryup` `angry_guards` after real dryup (named). Not wizard yn.
- [ ] `fountain.c` `watchman_warn_fountain` Deaf shake/wave (named). Not dryup yn.
- [ ] `fountain.c` `dryup` cansee cloud-glyph skip of dryup pline (named). Not angry_guards.
- [ ] `fountain.c` `dipfountain` Excalibur LONG_SWORD body (named). Not wash_hands.
- [ ] `fountain.c` `wash_hands` (named). Not Excalibur.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
