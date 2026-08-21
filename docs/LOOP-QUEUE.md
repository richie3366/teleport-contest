# Loop work queue

Unattended **port** iterations pop the **first unchecked** item, preferring
**Must-fix** over Open. Do not combine items. Do not invent a substitute.
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

- [ ] `mhitm.c` hitmm silver sear (named from D-0887). Not shade_miss.
- [ ] `mhitm.c` `mdamagem` AD_STON leftover (named from D-1338). Not shade_miss.
- [ ] `zap.c` `ureflects` W_AMUL/W_ARM/dragon (named from D-1342). Not W_WEP.
- [ ] `weapon.c` `dmgval` shade/`shade_glare` (named from D-1341). Not hitmm shade_miss.
- [ ] `zap.c` `zapyourself` WAN_LIGHTNING (named). Not killer_xname.
- [ ] `eat.c` lesshungry/bite choke callers (named from D-1344). Not zap.
- [ ] `objnam.c` `the()` CapitalMon (named from D-1335). Not warn_obj.
- [ ] `dokick.c` `wake_nearby` caller (C `:1383` after maybe_kick; callee live). Not knockback.
- [ ] `dokick.c` `u_wipe_engr` caller (C `:1384`; body D-1051). Not knockback.
- [ ] `dokick.c` kick_ouch drawbridge `find_drawbridge` remap (named from D-1343).
- [ ] `dokick.c` no_kick poly/steed/lizard/uinwater/boulder (named from D-0786). Not Wounded_legs.
- [ ] `dokick.c` `obj_delivery` stolen_booty / `mksobj_migr_to_species` (named from D-1177).

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
