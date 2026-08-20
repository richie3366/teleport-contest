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

- [ ] `stairs.c` `u_on_sstairs` → `u_on_rndspot` (named from D-1278). Not cmd wiz.
- [ ] `cmd.c` wiz-level `u_on_rndspot` (named from D-1278). Not sstairs.
- [ ] `objnam.c` wizterrainwish traps (named from D-1279). Not door/wall.
- [ ] `objnam.c` wizterrainwish door/wall (named from D-1279). Not traps.
- [ ] `mhitu.c` `wildmiss` `pline_mon` (named from D-1261). Not missmu.
- [ ] `dothrow.c` throwit slip (named from D-1283). Not stamina.
- [ ] `dothrow.c` throwit stamina (named from D-1283). Not slip.
- [ ] `hack.c` moverock next_boulder (named from D-1281). Not Blind feel.
- [ ] `objnam.c` doname MEAT_RING (named from D-1276). Not candle.
- [ ] `trap.c` maketrap DRAWBRIDGE_UP ice (named from D-1280). Not shop add_damage.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
