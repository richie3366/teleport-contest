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

- [ ] `pickup.c` describe_decor — 5 corpus blocks; "There is a pit here." before the object list.
- [ ] `sp_lev.c` build_room — 4 corpus blocks; C themed-room script vs JS `rnd_rect` (level-content cliff).
- [ ] `pickup.c` doloot_core — 4 corpus blocks; "You don't find anything here to loot." vs "You see no door there."
- [ ] `hack.c` pickup_checks — 3 corpus blocks; "The stairs are solidly affixed." vs "There is nothing here to pick up."
- [ ] `insight.c` attributes_enlightenment — 3 corpus blocks; quest-leader telepathy name vs colon.
- [ ] `selvar.c` selection_filter_percent — 2 corpus blocks; C themed-room `rn2(100)` vs JS `rnd_rect` (level-content cliff).
- [ ] `mkmaze.c` makemaz `fakewiz1`/`fakewiz2` — Wizard-of-Yendor path; 44+44 ln. From `dat/fakewiz{1,2}.lua`.
- [ ] `botl.c` do_statusline1 — 4 corpus blocks; leftover WIN_STATUS under item-action menu (same step as D-1833 re-attr).
- [ ] `pager.c` lookat — 3 corpus blocks; "unexplored area" vs "unexplored".
- [ ] `mhitu.c` summonmu — 2 corpus blocks; C were-summon `rn2(5)` vs JS `rnd(20)` in `mattacku`.
- [ ] `getpos.c` getpos — 2 corpus blocks; "Can't find dungeon feature '/'." vs unknown direction.
- [ ] `teleport.c` level_tele — 2 corpus blocks; named-level `^V` materialize (screen match, later RNG).

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
