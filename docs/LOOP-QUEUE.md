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

- [ ] `uhitm.c` mhitm_mgc_atk_negated — 1 corpus block; C `rn2(10)` vs JS `mhitm_knockback` `rn2(6)`.
- [ ] `hack.c` dopush — 1 corpus block screen-first at step 127 («With great effort you move the boulder.»).
- [ ] `sounds.c` zoo_mon_sound — 1 corpus block screen-first at step 134 («You hear a sound reminiscent of a seal barking.» vs empty).
- [ ] `objnam.c` minimal_xname — 1 corpus block screen-first at step 827 («d - an uncursed +1 ring of gain constitution» vs «Amulets»).
- [ ] `artifact.c` artifact_hit — 2 corpus blocks; screen-first at artifact.c:1515 («The massive hammer hits the Aleax.» vs empty; explore-seed0360-wizard-world-tour-19199bfa step 848, 5dfef5c4 step 842). Same-step continuation after the hitum `spec_abon` phantom roll was removed (see DIVERGENCE-LOG D-1862 Next; restored to live queue — never addressed).
- [ ] `trap.c` trapeffect_rolling_boulder_trap — 1 corpus block screen-first at step 347 («^a trap (rolling boulder trap)» vs «^a rolling boulder trap»; explore-seed0367-priest-quest-tour-b0096089).
- [ ] `steal.c` mdrop_obj — 1 corpus block screen-first at step 29 («The kitten drops a dart.--More--» vs same-plus; explore-seed1500-rogue-explore-move-d7877f7d).
- [ ] `do_wear.c` glibr — 1 corpus block screen-first at step 29 («Your kitten eats a goblin corpse.» vs empty; ind-Tourist-666025142-d17728db).
- [ ] `mkmaze.c` makemaz `kni-strt`/`-loca`/`-fila`/`-filb` — Knight quest 1/5 → 5/5 (only `kni-goal` exists; Knight is 5/44 sessions). From `dat/kni-*.lua` (HELDOUT Tier A #10).
- [ ] `mkmaze.c` makemaz `rog-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Rogue quest 0/5 → 5/5 (largest 0/5 role, 6/44 sessions). From `dat/rog-*.lua` (HELDOUT Tier A #11).

## Parked (do not pop)

- `dogmove.c` dog_invent — misattributed corpus owner (shared `"%s picks up %s."`; both hits are `mon.c mpickstuff`). Iter 2278. Do not pop. Falsifier: `node scripts/hidden-proxy.mjs verify dog_invent` (NO MOVEMENT until proxy rescore). Needs C `movement[]`/`mtrack` on tour-Priest-70006 step 44–45.
- D-0006 seed1800 pet movement — needs C state/candidate capture.
