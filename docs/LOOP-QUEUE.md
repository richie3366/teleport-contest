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
`absent.md`). One C function/family per line; cite C file + function. A level-gen owner
(`mineralize`, `bound_digging`, `wallification`, `place_lregion`…) is where
C *noticed* the difference: its falsifier is `node scripts/geom-probe.mjs
<session>`, and the shipped D-log cites the C writer actually changed.
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

- [ ] `mkmaze.c` makemaz `knox` — Fort Ludios magic-portal vault. From `dat/knox.lua` (167 ln).
- [ ] `pager.c` do_screen_description — 4 corpus blocks; C «can be many things (unexplored area)» vs JS «unexplored area».
- [ ] `pager.c` dowhatdoes — 2 corpus blocks; C «Ask about '&' or '?' to get more info.» vs JS «Unknown command '&'.».
- [ ] `sp_lev.c` lspo_replace_terrain — 1 corpus block; C `rn2(100)` vs JS `get_location_random` `rn2(75)`.
- [ ] `uhitm.c` mhitm_ad_slee — 1 corpus block; C `rn2(5)` vs JS `mhitm_knockback` `rn2(3)`.
- [ ] `mkmaze.c` makemaz `Sam-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Samurai quest, 0/5. From `dat/Sam-*.lua`.
- [ ] `hack.c` moverock_core — 2 corpus blocks; C «The boulder won't roll diagonally on this floor.» vs JS «With great effort you move the boulder.».
- [ ] `mkroom.c` fill_zoo — 1 corpus block; C `rn2(3)` vs JS `next_ident` `rnd(2)`.
- [ ] `dungeon.c` induced_align — 1 corpus block; C `rn2(3)` vs JS `rnd_rect` `rn2(4)`.
- [ ] `uhitm.c` hitum — 1 corpus block; C `rnd(20)` vs JS `spec_abon` `rnd(5)`.
- [ ] `mthrowu.c` linedup — 1 corpus block; C `rn2(2)` vs JS `m_move` `rn2(16)`.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
