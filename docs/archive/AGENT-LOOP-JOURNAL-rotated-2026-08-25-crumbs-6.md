# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-25 — D-1452 spell.c SPE_WIZARD_LOCK IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_WIZARD_LOCK IMMEDIATE
wand-duplicate (named). Not POLYMORPH.
**C locus:** `spell.c` `spelleffects` `:1466–1514`; callee
`zap.c` `weffects` `:3440–3451` IMMEDIATE `bhit`/`bhitm`.
**Change:** route SPE_WIZARD_LOCK through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-1434;
bhitm already D-1425. TURN named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts wizard lock).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhito` SPE_DRAIN_LIFE `drain_item`
(named). Not probing.
**Blocked:** none.

## 2026-08-25 — D-1451 spell.c SPE_SLOW_MONSTER IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_SLOW_MONSTER IMMEDIATE
wand-duplicate (named). Not LOCK.
**C locus:** `spell.c` `spelleffects` `:1465–1514`; callee
`zap.c` `weffects` `:3440–3451` IMMEDIATE `bhit`/`bhitm`.
**Change:** route SPE_SLOW_MONSTER through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-1433;
bhitm already D-1424. LOCK named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts slow monster).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_WIZARD_LOCK IMMEDIATE
wand-duplicate (named). Not POLYMORPH.
**Blocked:** none.

## 2026-08-25 — D-1450 spell.c SPE_KNOCK IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_KNOCK IMMEDIATE
wand-duplicate (named from D-1427). Not SLOW.
**C locus:** `spell.c` `spelleffects` `:1464–1514`; callee
`zap.c` `weffects` `:3440–3451` IMMEDIATE `bhit`/`bhitm`.
**Change:** route SPE_KNOCK through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-0981.
SLOW/LOCK named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts knock).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_SLOW_MONSTER IMMEDIATE
wand-duplicate (named). Not LOCK.
**Blocked:** none.

## 2026-08-25 — review D-1441–D-1449 (audit #1820)

**Objective:** audit — C-fidelity reviews **401–409** of JS SHAs
`b8ef02c3` / `892be171` / `4a0aa5cc` / `ae0cf7f4` /
`7628b03e` / `ed218e86` / `4dde6eeb` / `20f59004` /
`70c2b8e6` plus full `sessions` score.
**C locus:** `spell.c` `spelleffects` `:1457–1514`;
`uhitm.c` `mhitm_ad_phys` `:4182–4189` / `:3104–3118` /
`:1260–1280`; `zap.c` `zap_steed` `:3099–3103`;
`zap_updown` `:3236–3262`; `bhito` `:2222–2274`;
`zapyourself` `:2817–2823`.
**Change:** no `js/` edits. **401–409** ACCEPT-WITH-DEBT.
Filled archive D-1449 `70c2b8e6`. Must-fix empty. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `36+0.30/turn` (R² 0.857).
**Verified:** full `sessions` at HEAD `70c2b8e6`; public-unhit
on dig-cast / rustm / steed-probe / updown-probe / bhito-probe /
self-drain / poison leftover / missile-cast / finger-cast.
**Next:** Open `zap.c` `weffects` SPE_KNOCK IMMEDIATE
wand-duplicate (named from D-1427). Not SLOW.
**Blocked:** none.

## 2026-08-25 — D-1449 spell.c SPE_FINGER_OF_DEATH RAY wand-duplicate

**Objective:** Open `spell.c` SPE_FINGER_OF_DEATH wand-duplicate
RAY (named from D-1440). Not MAGIC_MISSILE.
**C locus:** `spell.c` `spelleffects` `:1472–1514`; callee
`zap.c` `weffects` `:3461–3462` `ubuzz` BZ_U_SPELL nd=ulevel/2+1.
**Change:** route SPE_FINGER_OF_DEATH through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-0156.
IMMEDIATE named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts finger of death).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_KNOCK IMMEDIATE
wand-duplicate (named from D-1427). Not SLOW.
**Blocked:** none.

## 2026-08-25 — D-1448 spell.c SPE_MAGIC_MISSILE RAY wand-duplicate

**Objective:** Open `spell.c` SPE_MAGIC_MISSILE wand-duplicate
RAY (named from D-1440). Not FINGER.
**C locus:** `spell.c` `spelleffects` `:1463–1514`; callee
`zap.c` `weffects` `:3461–3462` `ubuzz` BZ_U_SPELL nd=ulevel/2+1.
**Change:** route SPE_MAGIC_MISSILE through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-1364.
FINGER / IMMEDIATE named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts magic missile).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` SPE_FINGER_OF_DEATH wand-duplicate
RAY (named from D-1440). Not MAGIC_MISSILE.
**Blocked:** none.
