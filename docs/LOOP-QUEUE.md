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

- [ ] `spell.c` unskilled SPE_FIREBALL/CONE `getdir` cancel must leave previous `u.dx/u.dy/u.dz` like C `getdir((char*)0)` (`cmd.c` `:4095–4111`); `getdir_spell` zeros then always self-zaps. Use live `lock.js` `getdir` or stop zeroing. Do not add trailing `confdir` to shared `getdir`. Source: reviews/loop-unattended/346-1f94d5e3-unskilled-fireball-weffects.md.

## Open (map-driven, after Must-fix is empty)

- [ ] `spell.c` `spelleffects` SPE_FORCE_BOLT (named). Not fireball.
- [ ] `spell.c` `spelleffects` SPE_CREATE_FAMILIAR (named). Not force bolt.
- [ ] `spell.c` `cast_protection` SPE_PROTECTION (named). Not familiar.
- [ ] `spell.c` `spelleffects` SPE_CLAIRVOYANCE (named). Not protection.
- [ ] `zap.c` `bhit` M_AP_OBJECT skip (named from D-1383). Not WEB.
- [ ] `zap.c` `bhit` WEB stick (named from D-1383). Not M_AP_OBJECT.
- [ ] `uhitm.c` `mhitm_ad_phys` shade_miss (named from D-1341). Not hmon.
- [ ] `zap.c` `zapnodir` WAN_ENLIGHTENMENT (named from D-1380). Not stasis.
- [ ] `mhitm.c` `mdamagem` AD_STUN leftover (named from D-1352). Not CONF.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
