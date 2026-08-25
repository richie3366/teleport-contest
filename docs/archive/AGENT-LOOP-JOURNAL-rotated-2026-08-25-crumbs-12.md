# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-25 — D-1490 mklev.c minetn-1 load_special Orcish Town

**Objective:** Open `mklev.c` `minetn-1` load_special (named).
Not minetn-5.
**C locus:** `dat/minetn-1.lua` via `mkmaze.c` `makemaz` /
`check_ransacked` + `sp_lev.c` `load_special`.
**Change:** Live Orcish Town (mines+map+bars+orcs+rubble);
no-temple altar skips priestini; army `percent` then
`rndcoord`. minetn-6/7 / dog leftovers / `add_to_minv`
named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit; no public
session rolls `rnd(7)=1` for minetn).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `worm.c` `worm_move` (named). Not initworm.
**Blocked:** none.

## 2026-08-25 — D-1489 zap.c zap_map lateral drawbridge / bhit

**Objective:** Open `zap.c` `zap_map` lateral drawbridge / bhit
(named). Not engraving.
**C locus:** `zap.c` `zap_map` `:3685–3717`; caller `bhit`
`:3919–3924`. Callees already live (`dbridge.js`).
**Change:** `!u.dz` OPENING/LOCKING/STRIKING drawbridge +
`bhit` ZAPPED_WAND `zap_map` before `m_at`. force_decor /
draft_message / Invocation_lev named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `mklev.c` `minetn-1` load_special (named).
Not minetn-5.
**Blocked:** none.

## 2026-08-25 — D-1488 artifact.c arti_invoke remaining inv_prop

**Objective:** Open `artifact.c` `doinvoke` remaining `inv_prop`
(named). Not BLINDING_RAY.
**C locus:** `artifact.c` `arti_invoke` `:2154–2228`; helpers
`:1779–2051`. Cost already D-1377.
**Change:** Live HEALING/ENERGY_BOOST/UNTRAP/LEV_TELE/
ENLIGHTENING/CREATE_AMMO/FLING_POISON/FIRESTORM/SNOWSTORM +
CONFLICT/LEVITATION/INVIS xor `W_ARTI`. TAMING/CHARGE_OBJ/
CREATE_PORTAL/BANISH named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `zap.c` `zap_map` lateral drawbridge / bhit
(named). Not engraving.
**Blocked:** none.

## 2026-08-25 — D-1487 objnam.c the() fruit_from_name + artifact_name

**Objective:** Open `objnam.c` `the()` fruit_from_name +
artifact_name (named). Not CapitalMon.
**C locus:** `objnam.c` `the()` `:2191–2193`; callee
`fruit_from_name` `:443–519`; `artifact.c` `artifact_name`
`:329–353` (`fuzzy=FALSE`).
**Change:** Port `fruit_from_name` into `objnam.js`. Local
`artifact_name` copy via `artilistRaw` (no invent cycle).
Named fruit takes `"the "` unless pname artifact.
`fruit_from_indx` / options fruitadd walker named. Rule #2:
no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **29**/29; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `artifact.c` `doinvoke` remaining `inv_prop`
(named). Not BLINDING_RAY.
**Blocked:** none.

## 2026-08-25 — D-1486 potion.c potion_dip unicorn/amethyst mix

**Objective:** Open `potion.c` `potion_dip` unicorn/amethyst mix
(named). Not mixtype.
**C locus:** `potion.c` `potion_dip` `:2726–2787`. Callee
`mixtype` already D-1457; `hold_potion` already live.
**Change:** After mix `else if`, `in_use=FALSE` then unicorn
horn / amethyst `mixtype` transform (sickness→fruit juice;
hallu/blind/conf→water; amethyst+booze→juice), `COST_NUTRLZ`,
juggle `hold_potion`. Poison-coat / oil/lamp / `poly_obj` /
`dip_into` named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `objnam.c` `the()` fruit_from_name + artifact_name
(named). Not CapitalMon.
**Blocked:** none.

## 2026-08-25 — D-1485 zap.c zap_updown default break

**Objective:** Must-fix `zap.c` `zap_updown` `default` `break`
into down `bhitpile`+`zap_map` (C `:3378–3389`). Not probing.
Not lateral `bhit`. Source: review **437**.
**C locus:** `zap.c` `zap_updown` `:3378–3389`. Caller
`weffects` `:3445–3446`. Callee `zap_map` already D-1476.
**Change:** JS `default: return false` → `break` so unmounted
down POLY/cancel/invis/tele hit D-1476 arms. Riding-down still
`zap_steed`. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `potion.c` `potion_dip` unicorn/amethyst mix
(named). Not mixtype.
**Blocked:** none.
