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

- [ ] `eat.c` `vomit` cantvomit/Sick/acid poly arms (named from drinkfountain). Not dryup.
- [ ] `potion.c` pool dip yn (named from dipsink). Not drinkfountain.
- [ ] `teleport.c` `teleds` `switch_terrain` (named). Not fill_pit.
- [ ] `teleport.c` `teleds` `update_player_regions` (named). Not teleok in_out_region.
- [ ] `teleport.c` `teleds` `hideunder` / mimic (named). Not swallow docrt.
- [ ] `teleport.c` `teleds` `buried_ball_to_punishment` (named). Not Punished ball.
- [ ] `teleport.c` `tele()` / trap teledest (named). Not tele_trap wrenching.
- [ ] `fountain.c` `dipfountain` `update_inventory` after switch (named). Not Excalibur gift.
- [ ] `do_name.c` `hcolor` Hallucination drinksink synonyms (named). Not hliquid.
- [ ] `fountain.c` `mongrantswish` `tmp_at` glyph hide (named). Not dowaterdemon makemon.
- [ ] `region.c` `make_gas_cloud` enveloped pline (named). Not create_gas_cloud size-1.
- [ ] `fountain.c` `gush` lava `fire_damage_chain` / `xkilled` (named). Not minliquid.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
