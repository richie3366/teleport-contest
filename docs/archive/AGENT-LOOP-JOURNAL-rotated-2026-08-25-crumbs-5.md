# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-25 — D-1447 uhitm.c mhitm_ad_phys poison leftover

**Objective:** Open `uhitm.c` `mhitm_ad_phys` poison leftover
(named from D-1415). Not rustm.
**C locus:** `uhitm.c` `mhitm_ad_phys` `:4184–4189`; callee
`mhitm_really_poison` `:3104–3118`.
**Change:** after rustm, poisoned/Grimtooth wep `!rn2(4)` →
vis poisoned pline, resist skip or `rn1(10,6)` + deadly.
mhitu `poisoned()` / AD_DRST 1/8 / worm-shrieker named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session has mon-vs-mon poisoned wep).
**Verified:** private canary **14**/14; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` SPE_MAGIC_MISSILE wand-duplicate
RAY (named from D-1440). Not FINGER.
**Blocked:** none.

## 2026-08-25 — D-1446 zap.c zapyourself SPE_DRAIN_LIFE

**Objective:** Open `zap.c` `zapyourself` SPE_DRAIN_LIFE
(named). Not bhitm drain.
**C locus:** `zap.c` `zapyourself` `:2817–2823`; caller
`spell.c` `:1500–1508`; callee `exper.c` `losexp`.
**Change:** `!Drain_resistance` (youprop H||E / uprops)
then `learn_it` + `losexp("life drainage")`; damage 0.
bhito `drain_item` / zap_steed drain named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session self-zaps drain life).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_phys` poison leftover
(named from D-1415). Not rustm.
**Blocked:** none.

## 2026-08-25 — D-1445 zap.c bhito WAN_PROBING

**Objective:** Open `zap.c` `bhito` WAN_PROBING
(named). Not updown.
**C locus:** `zap.c` `bhito` `:2222–2274`; callers
`bhitpile`/`bhit`/`zap_updown` down; callee
`invent.c` `display_cinventory` `:5446–5473`.
**Change:** WAN_PROBING observe + container/statue peek
(empty/Schroedinger/`display_cinventory`) + tin/egg;
learn iff `res`. drain_item / other updown otyps named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session probes a floor object).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapyourself` SPE_DRAIN_LIFE
(named). Not bhitm drain.
**Blocked:** none.

## 2026-08-25 — D-1444 zap.c zap_updown WAN_PROBING

**Objective:** Open `zap.c` `zap_updown` WAN_PROBING
(named). Not steed.
**C locus:** `zap.c` `zap_updown` `:3236–3262`; caller
`weffects` `:3440–3446`; callees `zap_map` probing
`:3720–3796`, `invent.c` `display_binventory`
`:5488–5546`, `dungeon.c` `update_mapseen_for`.
**Change:** weffects `u.dz` → `zap_updown` WAN_PROBING
ceiling/beneath + `bhitpile` + `zap_map` + buried
menu; always disclose. Other updown otyps / bhito
probing / force_decor named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session zaps probing up/down unmounted).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhito` WAN_PROBING (named).
Not updown.
**Blocked:** none.

## 2026-08-25 — D-1443 zap.c zap_steed WAN_PROBING

**Objective:** Open `zap.c` `zap_steed` WAN_PROBING
(named). Not zapyourself.
**C locus:** `zap.c` `zap_steed` `:3099–3103`; caller
`weffects` `:3437–3439`; callee `probe_monster` D-1426.
**Change:** weffects mounted-down prefix + WAN_PROBING
`probe_monster(usteed)` + `learnwand`. Teleport / bhitm
routing still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session probes downward while mounted).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_updown` WAN_PROBING (named).
Not steed.
**Blocked:** none.

## 2026-08-25 — D-1442 uhitm.c mhitm_ad_phys rustm leftover

**Objective:** Open `uhitm.c` `mhitm_ad_phys` rustm leftover
(named from D-1415). Not poison.
**C locus:** `uhitm.c` `mhitm_ad_phys` `:4182–4183`; callee
`mhitm.c` `rustm` `:1260–1280` AD_CORR / AD_RUST / AD_FIRE
except steam vortex then `erode_obj` GREASE|VERBOSE.
**Change:** leftover damage after artifact_hit → `rustm(mdef,
mwep)`. Poison / mhitu rustm / worm-shrieker still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has mon-vs-mon wep vs rust/corr/fire).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` WAN_PROBING (named). Not
zapyourself.
**Blocked:** none.
