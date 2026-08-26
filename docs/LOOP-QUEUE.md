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

- [ ] `detect.c` `map_monst` / `monster_detect`: compare long-worm by `mndx`/`mnum`, not `mtmp.data === mons(PM_LONG_WORM)` (`mons()` allocates a new ptr so `detect_wsegs` never runs). Source: reviews/loop-unattended/506-adfba7fc-detect-wsegs.md
- [ ] `mon.c` `monkilled`: `js/trap.js` clone still `cansee(head)`; use `wormno ? worm_known : cansee(head)` like `mhitm.js`. Source: reviews/loop-unattended/509-9b53440e-worm-known.md

## Open (map-driven, after Must-fix is empty)

- [ ] `invent.c` canned CMDQ_INT (named). Not ALLOWCNT.
- [ ] `cmd.c` INTERNALCMD Eyes `is_plural` (named). Not #altdip.
- [ ] `sp_lev.c` `splev_create_monster` RANDOM-only (named). Not mk_roamer.
- [ ] `pager.c` `mhidden_description` (named). Not that_is_a_mimic.
- [ ] `do_name.c` `namefloorobj` (named). Not that_is_a_mimic.
- [ ] `makemon.c` `set_mimic_sym` DELPHI `S_fountain` (named). Not furnsyms.
- [ ] `makemon.c` `set_mimic_sym` `block_point` (named). Not DELPHI.
- [ ] `artifact.c` SEARCH/REGEN/XRAY conferral (named). Not cspfx.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
