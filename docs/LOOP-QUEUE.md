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
not enqueue parked D-0006 or parked `dog_invent`.

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

- [ ] `dogmove.c` mnum_leashable — leashable-monster predicate singleton (HELDOUT Tier C singletons; no JS symbol).
- [ ] `do.c` better_not_try_to_drop_that — corpse-drop guard singleton (HELDOUT Tier C singletons; no JS symbol).
- [ ] `dungeon.c` avoid_ceiling — ceiling-ambiguity predicate singleton (HELDOUT Tier C singletons; no JS symbol).
- [ ] `region.c` inside_rect — rect-containment predicate singleton (HELDOUT Tier C singletons; no JS symbol).
- [ ] `weapon.c` give_may_advance_msg — skill-advance message singleton (HELDOUT Tier C singletons; no JS symbol, named omit in js/weapon.js).
- [ ] `display.c` row_refresh — glyph-row repaint singleton (HELDOUT Tier C singletons; no JS symbol, comment-only refs in js/display.js).
- [ ] `allmain.c` init_sound_disp_gamewindows — window-system init singleton (HELDOUT Tier C singletons; no JS symbol anywhere in js/).
- [ ] `nhlsel.c` l_selection_iterate — selection-iterate Lua-C singleton (HELDOUT Tier C singletons; no JS symbol, comment-only refs in js/mklev.js).

## Parked (do not pop)

- `insight.c` show_conduct — STALE premise + misattributed owner (parked 2026-09-05, HEAD c209ccc7). Row was queued at baf24c95 as "859 conduct-text vs yn prompt"; at HEAD the session diverges at **824 x_monnam** (do_name.c:967): C row 0 `@ a human or elf (human wizard called wizard)--More--` (message-more, map intact, 35 frozen steps) vs JS row 0 Ebenezum `wizard` data.base entry menu (offx 18). Owner `insight.c:2122` is a C **comment** line — C screen is the pager.c checkfile `* wizard` entry, never conduct text. True C chain (all read at HEAD): getpos ':' → LOOK_VERBOSE (hack.h:544-546 "show more info w/o asking") → do_look `:1942-1952` `checkfile(temp_buf=firstmatch, pm, chkfilDontAsk, …)` → pass 1 alt="wizard" displays Ebenezum entry, pass 0 dbase="human wizard" same-offset-skipped; the message-more pending from putmixed is serviced (blocking, 34 bell keys + space at 859) before the menu paints. Proven: `(ans==LOOK_VERBOSE)?chkfilDontAsk:0` alone REGRESSES 859→824 (verify show_conduct), because JS reaches checkfile during turn 824 — its look pline saw `_toplin=NON_EMPTY` (traced) where C had NEED_MORE — so the load-bearing gap is topline-more/window-display timing (does tty_display_nhwindow flush a pending message-more first? cmdq REPEAT interplay from yn_function:1607?), not the flags. Do not pop until: re-baselined `hidden-proxy verify` shows a post-824 owner, or a display-timing iteration takes the do_look+topline envelope together. Do not "fix" with a yn-gate or coordinate seed-gate (D-1831/D-1849).
- `steal.c` mdrop_obj — capture-point divergence, not game logic (parked iter ~2279). explore-seed1500-rogue-explore-move-d7877f7d step 30 (key H): C frame is a MID-TURN --More-- pause (kitten glyph @x70 pre-move, dart pre-place, cursor parked at topline col 32, then 58 rng=0 repeats); JS frame is post-turn (kitten@x69, dart@x70 = JS end-state). C vs JS RNG identical through the session incl. all 48 drop-turn draws site-by-site (drop gates, 2× rn2(8) APPORT arms failed → appr=0 both, loop rn2(1..7) first-accepted/rest-rejected both). Falsified: flooreffects, stay-square accept, appr≠0, ALLOW_U, region veto, digweapon, stale-glyph, sound/pickup/curse extra line. Full mdrop_obj port is a proven no-op here → NO MOVEMENT on verify. Falsifier: C post-turn state (rebuilt-recorder dog_move dump) contradicting JS, or a re-record. Do not contort display (D-1831). See NOTES.md Active `mdrop_obj park`. Do not pop until that measurement exists.

- `hack.c` dopush — misattributed owner: the step-127 cell is a giant mimic's memory/viz, not the push. explore-seed0116-wizard-wear-shop-cfabc006 step 127/175, single cell r13c32 (map 33,12): C `` ` `` vs JS `·`, RNG 12853/12853, screens re-match at 128. Falsifier: C-side viz at step 127 (`cansee(33,12)` / IN_SIGHT bit) or JS `view_from` boundary audit around wall gap (32,11). See NOTES.md Active `dopush park`. Do not pop until that measurement exists.
- `dogmove.c` dog_invent — misattributed corpus owner (shared `"%s picks up %s."`; both hits are `mon.c mpickstuff`). Iter 2278. Do not pop. Falsifier: `node scripts/hidden-proxy.mjs verify dog_invent` (NO MOVEMENT until proxy rescore). Needs C `movement[]`/`mtrack` on tour-Priest-70006 step 44–45 (also Barbarian step 34: 0 dogmove draws, RNG match).
- D-0006 seed1800 pet movement — needs C state/candidate capture.
