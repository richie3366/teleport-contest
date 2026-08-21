# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-21 — D-1393 zap.c bhit WEB stick

**Objective:** Open `zap.c` `bhit` WEB stick
(named from D-1383). Not M_AP_OBJECT.
**C locus:** `zap.c` `bhit` `:3926–3938` after `m_at`/`t_at`,
before shade/M_AP_OBJECT.
**Change:** empty WEB + thrown/kicked `!rn2(3)` sticks
(Yname2 pline, tseen, newsym, clear returning). Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session throws/kicks over a WEB via `bhit`).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_phys` shade_miss
(named from D-1341). Not hmon.
**Blocked:** none.

## 2026-08-21 — D-1392 zap.c bhit M_AP_OBJECT skip

**Objective:** Open `zap.c` `bhit` M_AP_OBJECT skip
(named from D-1383). Not WEB.
**C locus:** `zap.c` `bhit` `:3986–3992` (same `if` as
D-1383 shade); display.h `glyph_is_*` on `glyph_at`.
**Change:** thrown/kicked mimic-as-object with no
monster/warning/I gbuf glyph (or FLASHED_LIGHT
M_AP_OBJECT) clears mtmp and keeps flying. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session throws/kicks over a mimic via `bhit`).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhit` WEB stick
(named from D-1383). Not M_AP_OBJECT.
**Blocked:** none.

## 2026-08-21 — D-1391 spell.c SPE_CLAIRVOYANCE do_vicinity_map

**Objective:** Open `spell.c` `spelleffects` SPE_CLAIRVOYANCE
(named). Not protection.
**C locus:** `spell.c` `spelleffects` `:1572–1580`; callee
`detect.c` `do_vicinity_map` `:1448–1585`.
**Change:** `!BClairvoyant` skilled bless + vicinity map;
cornuthaum hat. Unskilled hero_memory silent. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts clairvoyance).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhit` M_AP_OBJECT skip
(named from D-1383). Not WEB.
**Blocked:** none.

## 2026-08-21 — D-1390 spell.c SPE_PROTECTION cast_protection

**Objective:** Open `spell.c` `cast_protection` SPE_PROTECTION
(named). Not familiar.
**C locus:** `spell.c` `cast_protection` `:1104–1177`; caller
`spelleffects` `:1581–1583`; callee `timeout.c` `:652–661`
usptime tick + `find_ac`.
**Change:** SPE_PROTECTION calls `cast_protection` (log2 gain,
expert 20 else 10, find_ac via dynamic u_init). timeout
dissipates. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts protection).
**Verified:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_CLAIRVOYANCE
(named). Not protection.
**Blocked:** none.

## 2026-08-21 — D-1389 spell.c SPE_CREATE_FAMILIAR make_familiar

**Objective:** Open `spell.c` `spelleffects` SPE_CREATE_FAMILIAR
(named). Not force bolt.
**C locus:** `spell.c` `spelleffects` `:1569–1571`; callee
`dog.c` `make_familiar` / `pick_familiar_pm` `!rn2(3)`
`pet_type` else `rndmonst_adj`.
**Change:** CREATE_FAMILIAR calls `make_familiar(null, ux, uy,
false)` via dynamic import (dog→weapon→spell). Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts create familiar).
**Verified:** private canary **13**/13; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `cast_protection` SPE_PROTECTION
(named). Not familiar.
**Blocked:** none.

## 2026-08-21 — D-1388 spell.c SPE_FORCE_BOLT IMMEDIATE bhit

**Objective:** Open `spell.c` `spelleffects` SPE_FORCE_BOLT
(named). Not fireball.
**C locus:** `spell.c` `spelleffects` `:1458–1514`; callee
`zap.c` `weffects` IMMEDIATE `bhit(rn1(8,6))` + `bhitm`
`spell_damage_bonus`.
**Change:** FORCE_BOLT getdir + self/`weffects` IMMEDIATE
`bhit`; `bhitm` INT bonus. Not RAY `ubuzz`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts force bolt).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_CREATE_FAMILIAR
(named). Not force bolt.
**Blocked:** none.
