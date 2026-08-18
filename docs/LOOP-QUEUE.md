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

- [ ] `hack.c` cannot_push squeeze (named from D-1226). Not run>=2 boulder.
- [ ] `uhitm.c` remaining `pline_mon` (named). Not troll_baned.
- [ ] `mhitm.c` `passivemm` AD_RBRE shock `monkilled` (named). Not troll_baned.
- [ ] `mhitm.c` gulpmm `snuff_lit` minvent (named). Not `m_at` swap.
- [ ] `mhitm.c` gulpmm `!goodpos` return-home (named). Not snuff_lit.
- [ ] `mhitm.c` gulpmm AD_DGST eat (named). Not passivemm.
- [ ] `hack.c` hideunder after impact (named from D-1229). Not container_impact.
- [ ] `monmove.c` `bee_eat_jelly` (named). Not mind_blast.
- [ ] `monmove.c` postmov iron bars (named). Not bee_eat.
- [ ] `monmove.c` `mon_yells` (named). Not iron bars.
- [ ] `hack.c` `container_impact_dmg` (named from D-1229). Not hideunder.
- [ ] `uhitm.c` AT_HUGS (named from D-1233). Not remaining `pline_mon`.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
