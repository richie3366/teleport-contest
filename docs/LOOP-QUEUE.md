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

- [ ] `dog.c` cant_go_back FREEING (named). Not update_mlstmv.
- [ ] `sp_lev.c` lspo_object non-merge quan repeat (named). Not oc_merge.
- [ ] `dungeon.c` recalc_mapseen sokosolved / roguelevel / quest flags (named). Not DRAWBRIDGE_UP lastseentyp.
- [ ] `calendar.c` hhmmss (named). Not yyyymmddhhmmss.
- [ ] `display.c` display_monster M_AP_FURNITURE cmap_to_glyph lastseentyp (named). Not update_lastseentyp.
- [ ] `invent.c` useupall / obfree (named). Not observe_object FIRST_OBJECT skip.
- [ ] `cmd.c` yn_function_menu query_menu (named). Not yn_function addcmdq.
- [ ] `cmd.c` getdir CQ_REPEAT (named). Not yn_function_menu.
- [ ] `end.c` artifact_score (named). Not hidden_gold.
- [ ] `invent.c` doprgold hidden_gold (named). Not currency.
- [ ] `objects.h` is_multigen / is_poisonable (named). Not oc_merge.
- [ ] `shk.c` choose_stairs / u_left_shop leave verbalize (named). Not remote_burglary.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
