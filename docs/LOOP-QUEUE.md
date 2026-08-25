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

- [ ] `potion.c` remaining mix alchemy (named from D-1439). Not peffects.
- [ ] `zap.c` `weffects` SPE_TURN_UNDEAD IMMEDIATE wand-duplicate (named). Not POLYMORPH.
- [ ] `zap.c` `weffects` SPE_POLYMORPH IMMEDIATE wand-duplicate (named). Not CANCELLATION.
- [ ] `zap.c` `weffects` SPE_CANCELLATION IMMEDIATE wand-duplicate (named). Not STONE.
- [ ] `zap.c` `weffects` SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate (named). Not mix.
- [ ] `zap.c` `bhit` doorlock WAN_OPENING/SPE_KNOCK (named). Not boxlock.
- [ ] `zap.c` `zap_steed` WAN_OPENING/SPE_KNOCK via bhitm (named). Not teleport.
- [ ] `zap.c` `zap_steed` SPE_DRAIN_LIFE via bhitm (named). Not OPENING.
- [ ] `zap.c` `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK (named). Not STRIKING.
- [ ] `zap.c` `zap_updown` WAN_STONE_TO_FLESH (named). Not LOCKING.
- [ ] `zap.c` `bhito` boxlock WAN_OPENING/WAN_LOCKING (named). Not doorlock.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
