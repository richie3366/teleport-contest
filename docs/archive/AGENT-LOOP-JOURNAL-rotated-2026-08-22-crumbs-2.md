# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-22 — D-1404 zap.c zapnodir WAN_STASIS

**Objective:** Open `zap.c` `zapnodir` WAN_STASIS (named from
D-1380). Not enlightenment.
**C locus:** `zap.c` `zapnodir` `:2559–2568`; consumers
`teleport.c` `noteleport_level`, `apply.c` magic whistle,
`do.c` `revive_mon` displacer already live.
**Change:** silent `stasis_until` max `moves+rn1(21,10)`;
`known` stays FALSE (no learnwand). SPE_DETECT_UNSEEN named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps WAN_STASIS).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_fire` leftover (named
from D-1385). Not STUN.
**Blocked:** none.

## 2026-08-22 — D-1403 uhitm.c mhitm_ad_phys AT_KICK thick_skinned

**Objective:** Open `uhitm.c` `mhitm_ad_phys` AT_KICK
thick_skinned (named). Not mwep.
**C locus:** `uhitm.c` `mhitm_ad_phys` mhitm `:4138–4141`
after D-1394 shade, before D-1402 mwep; callee
`mondata.h` `thick_skinned`.
**Change:** AT_KICK vs thick hide zeros leftover `d()`
(mwep already nulled). artifact_hit / rustm / poison /
worm-shrieker named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has mon-vs-mon AT_KICK AD_PHYS vs thick hide).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapnodir` WAN_STASIS (named from
D-1380). Not enlightenment.
**Blocked:** none.

## 2026-08-21 — D-1402 uhitm.c mhitm_ad_phys mwep dmgval

**Objective:** Open `uhitm.c` `mhitm_ad_phys` mwep dmgval
(named). Not shade_miss.
**C locus:** `uhitm.c` `mhitm_ad_phys` mhitm `:4142–4157`
after D-1394 shade; callee `weapon.c` `dmgval` +
`which_armor(W_ARMG)` + `do_stone_mon`.
**Change:** AT_WEAP/AT_CLAW `mwep` corpse then `dmgval` + GOP
`rn1(4,3)` + min 1. Kick thick / artifact_hit / rustm /
poison named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has mon-vs-mon AT_WEAP/AT_CLAW AD_PHYS).
**Verified:** private canary **13**/13; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_phys` AT_KICK
thick_skinned (named). Not mwep.
**Blocked:** none.

## 2026-08-21 — D-1401 spell.c SPE_CREATE_MONSTER seffects

**Objective:** Open `spell.c` `spelleffects` SPE_CREATE_MONSTER
seffects (named). Not chain.
**C locus:** `spell.c` `spelleffects` `:1528–1531`
`(void) seffects(pseudo)` (no skilled bless). Callee
`read.c` `seffect_create_monster` `:1608–1624` →
`create_critters` (D-1379).
**Change:** SPE_CREATE_MONSTER → `seffects(pseudo)`. Live
`seffect_create_monster` count/blob + doread SCR gate. Dynamic
`read.js`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts create monster).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_phys` mwep dmgval
(named). Not shade_miss.
**Blocked:** none.

## 2026-08-21 — D-1400 spell.c SPE_CHAIN_LIGHTNING cast_chain_lightning

**Objective:** Open `spell.c` `spelleffects` SPE_CHAIN_LIGHTNING
(named). Not cure.
**C locus:** `spell.c` `spelleffects` `:1588–1590`; body
`cast_chain_lightning` `:1002–1100` + `propagate_chain_lightning`
`:951–1000`. Callee `zap.c` `zhitm` `BZ_U_SPELL(AD_ELEC-1)` nd=2.
**Change:** SPE_CHAIN_LIGHTNING → `cast_chain_lightning()`. BFS
queue, peaceful skip, closed-door/WATER block, pool/open-door
spread, swallow TODO, extra Pw on chain-past-mon. Exported
`zhitm`/`resists_elec`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts chain lightning).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_CREATE_MONSTER
seffects (named). Not chain.
**Blocked:** none.

## 2026-08-21 — D-1399 spell.c SPE_CURE_BLINDNESS healup cream+blind+deaf

**Objective:** Open `spell.c` `spelleffects` SPE_CURE_BLINDNESS
(named). Not sickness.
**C locus:** `spell.c` `spelleffects` `:1549–1551`; callee
`potion.c` `healup` `:1444–1450` cream + `make_blinded` + `make_deaf`.
**Change:** SPE_CURE_BLINDNESS → `healup(0,0,FALSE,TRUE)`. healup
cureblind now calls `make_deaf(0,TRUE)` (was TIMEOUT clear only).
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts cure blindness).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_CHAIN_LIGHTNING
(named). Not cure.
**Blocked:** none.
