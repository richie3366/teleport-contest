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

- [ ] Match C `dat/Bar-goal.lua` `:44–57` fourteen `des.object()` after the Heart, instead of `load_bar_goal` looping 15 extra `splev_create_object` / `mkobj_at` RNG. Source: reviews/loop-unattended/789-fc103c7f-bar-goal.md

## Open (map-driven, after Must-fix is empty)

Tier A rows 1–12 of `docs/PORT-GAP-HELDOUT.md` (cheapest × most-reached
first). Pop in order; that file's Tier B then Tier C refill this list.
`docs/PORT-GAP-TOP30.md` stays valid for *depth in a reached function*;
alternate between the two as this list drains. **Port content rows from
`nethack-c/upstream/dat/*.lua` only — never from another fork.**
Falsifier for content rows: the `tour-*` corpus sessions blocked at level
generation (`node scripts/hidden-proxy.mjs verify build_room` /
`selection_filter_percent`; `docs/HIDDEN-PROXY.md`). Refill order when
this drains: `node scripts/hidden-proxy.mjs queue`, then Tier B, then
`PORT-GAP-TOP30.md`.

- [ ] `mcastu.c` castmu remaining spell arms: the 14 `mcast_*` / `touch_of_death` cases past the `default:` fallthrough. Not buzzmu.
- [ ] `mkmaze.c` makemaz `medusa-2`/`-4` — completes Medusa 4/4; 50% blank → 0%. From `dat/medusa-{2,4}.lua` (129/152 ln).
- [ ] `mkmaze.c` makemaz `water` + `mkmaze.c` save_waterlevel/restore_waterlevel/unsetup_waterlevel/set_wportal — endgame plane 4 of 5. From `dat/water.lua` (102 ln).
- [ ] `mkmaze.c` makemaz `astral` — endgame plane 5 of 5. From `dat/astral.lua` (187 ln).
- [ ] `mkmaze.c` makemaz `Kni-strt`/`-loca`/`-fila`/`-filb` — Knight quest; only `Kni-goal` exists. Knight is 5/44 public sessions (321 ln total).
- [ ] `mkmaze.c` makemaz `Rog-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Rogue quest, 0/5. Rogue is 6/44 public sessions, the largest uncovered role (503 ln total).
- [ ] `wintty.c` process_menu_window — 21 corpus blocks; tty menu clears only from its own left column.
- [ ] `iactions.c` itemactions — 14 corpus blocks; Engrave vs Write, cookie vs cookies.
- [ ] `invent.c` getobj — 7 corpus blocks; "You don't have anything else to wear." vs re-prompt.
- [ ] `pickup.c` describe_decor — 5 corpus blocks; "There is a pit here." before the object list.
- [ ] `sp_lev.c` build_room — 4 corpus blocks; C themed-room script vs JS `rnd_rect` (level-content cliff).

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
