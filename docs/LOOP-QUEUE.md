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

- [ ] `uhitm.c` AT_EXPL (named from D-1233). Not AT_HUGS.
- [ ] `makemon.c` `demonpet` spawn (named from D-1233). Not AT_EXPL.
- [ ] `hack.c` giant pickup/maneuver (named from D-1239). Not cannot_push.
- [ ] `objnam.c` glob / doname CXN_ARTICLE|CXN_NOCORPSE (named from D-1234). Not unique/pname adjective.
- [ ] `trap.c` landmine·pit mid-roll (named from D-1237). Not rolling-boulder TELEP.
- [ ] `monmove.c` `gelcube_digests` (named from D-1246). Not `mon_yells`.
- [ ] `monmove.c` ALLOW_BARS rust/corr/metallivore (named from D-1247). Not gelcube.
- [ ] `hack.c` `switch_terrain` from `dissolve_bars` (named from D-1247). Not ALLOW_BARS.
- [ ] `hack.c` mimic unhide (named from D-1245). Not hideunder.
- [ ] `mhitu.c` `hitmsg` (named from D-1240). Not remaining uhitm `pline_mon`.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
