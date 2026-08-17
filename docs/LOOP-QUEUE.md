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

- [ ] `teleport.c` `rloc_to_core` wand `makeknown` (named). Not ustuck-together.
- [ ] `teleport.c` `rloc_to_core` `set_msg_xy` (named). Not makeknown.
- [ ] `teleport.c` `scrolltele` W-tower Override yn (named). Not make_blinded.
- [ ] `dog.c` `migrate_to_level` `In_W_tower` xyflags bit 2 (named). Not mon_arrive.
- [ ] `dog.c` `mon_arrive` `my=xyflags` before rloc (named). Not migrate bit.
- [ ] `allmain.c` `newgame` `notice_mon_off` (named). Not wizkit.
- [ ] `artifact.c` `init_artifacts` (named). Not wizkit.
- [ ] `timeout.c` REVIVE/ZOMBIFY (named). Not run_timers.
- [ ] `cmd.c` `wiz_level_change` (named). Not notice_mon_off.
- [ ] `eat.c` `eatspecial` (named). Not doeat_nonfood.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
