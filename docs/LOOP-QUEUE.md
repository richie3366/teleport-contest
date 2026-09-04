# Loop work queue

Unattended **port** iterations pop the **first unchecked** item, preferring
**Must-fix** over Open. Do not combine **unrelated** items. Consecutive
Open rows that share one C `file.c:function` may ship in one port iff
every C callee those arms reach is **live** (imported, C body), a
**clone** matched to C in this commit, or **named omitted** in the map
in this commit. A **stub** in a live arm → split that arm back out.
Must-fix stays **one item, first, not glued** to Open. Do not invent a
substitute.
Live file is **unchecked-only**. Done rows live in
`docs/archive/LOOP-QUEUE-DONE.md`.

**Keep 8–12 open `- [ ]` rows** (`check-hot-docs.mjs` reports the count). If Must-fix+Open drops below **8**
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

- [ ] Match C `cmd.c` `getdir` `:4098` `iflags.cmdassist` (Options/`O` writes `game.iflags`) so `!cmdassist` skips `help_dir` and takes the strange-direction pline, instead of `game.flags?.cmdassist !== false`. Source: reviews/loop-unattended/775-2ac1a112-getdir.md

## Open (map-driven, after Must-fix is empty)

Rows 1–12 of `docs/PORT-GAP-TOP30.md` (hidden-score risk order). Pop in
order; rows 13–30 of that file refill this list.

- [ ] `trap.c` lava_effects remaining: Fire_resistance / Wwalking / inventory burn / sink-and-die. Not drown.
- [ ] `mon.c` newcham remaining: monst_to_any / NC_VIA_WAND_OR_SPELL mon_break_armor / boulder. Not make_corpse.
- [ ] `steed.c` dismount_steed remaining: poly / engulfed / water and lava steed death. Not mount.
- [ ] `uhitm.c` hmonas remaining: polymorphed-hero attack switch. Not hmon.
- [ ] `artifact.c` artifact_hit remaining: realizes_damage / destroy_items / drain-life / blinding. Not spec_abon.
- [ ] `hack.c` findtravelpath remaining: TEST_TRAV / GUESS / travelmap. Not adjacent greedy.
- [ ] `getpos.c` getpos remaining body. Not pager fakeobj.
- [ ] `mhitm.c` mattackm remaining. Not mattacku.
- [ ] `worn.c` mon_break_armor. Not possibly_unwield.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
