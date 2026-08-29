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

## Open (map-driven, after Must-fix is empty)

- [ ] `sounds.c` peaceful MS_HUMANOID (named). Not mplayer_talk.
- [ ] `do_wear.c` `take_off` occupation (named). Not ggetobj.
- [ ] `pickup.c` floor `query_classes` (named). Not traditional_loot.
- [ ] `invent.c` `adjust_split` GC_ECHOFIRST|GC_CONDHIST caller (named). Not get_count.
- [ ] `questpgr.c` `com_pager_core` synopsis (named). Not restore_msghistory.
- [ ] `topl.c` `tty_yn_function` post-answer `toplines=prompt+key` (named). Not yn ^P.
- [ ] `getline.c` EDIT_GETLIN (named). Not getline ^P.
- [ ] `cmd.c` `doextlist` (named). Not #seeall EXT_CMDS.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
