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

- [ ] `potion.c` `potionbreathe` remaining otyps (named). Not potionhit.
- [ ] `zap.c` `zap_steed` WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via bhitm (named). Not STRIKING.
- [ ] `zap.c` `zap_steed` WAN_SPEED_MONSTER via bhitm (named). Not SLOW.
- [ ] `zap.c` `zap_steed` SPE_CURE_SICKNESS via bhitm (named). Not SPEED.
- [ ] `zap.c` `bhito` uchain unpunish WAN_OPENING (named). Not boxlock.
- [ ] `zap.c` `bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT (named). Not LOCKING.
- [ ] `zap.c` `bhito` poly-arm boxlock `reset_pick` (named). Not uchain.
- [ ] `muse.c` `mbhit` doorlock (named). Not hero `bhit`.
- [ ] `potion.c` `potion_dip` unicorn/amethyst mix (named). Not mixtype.
- [ ] `objnam.c` `the()` fruit_from_name + artifact_name (named). Not CapitalMon.
- [ ] `artifact.c` `doinvoke` remaining `inv_prop` (named). Not BLINDING_RAY.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
