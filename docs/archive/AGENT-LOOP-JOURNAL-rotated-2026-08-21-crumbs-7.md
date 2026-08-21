# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-21 — D-1363 mkobj.c mksobj_migr_to_species / stolen_booty

**Objective:** Open `dokick.c` `obj_delivery` stolen_booty /
`mksobj_migr_to_species` (named from D-1177). Not no_kick.
**C locus:** `mkobj.c` `mksobj_migr_to_species` `:253–265`;
`mkmaze.c` `migr_booty_item`/`stolen_booty`/`migrate_orc`/
`shiny_orc_stuff`; caller `fixup_special` `:694–695`;
`do_name.c` `new_oname`.
**Change:** queue orctown loot as `MIGR_TO_SPECIES` overlay
cargo; gang oname lowercase; captain leftovers + extra
orcs `MIGR_RANDOM`. Local orc `fruitadd`. Filled D-1361
index row. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until
minetn-1 loader).
**Verified:** private canary **24**/24; green+strict
seed8000/0900; focused seed0060; cohort **8**/8 + strict
1500/1800/0012/0004/0007/2200/0383 + seed0060.
**Next:** Open `zap.c` `zapyourself` WAN_MAGIC_MISSILE
(named). Not WAN_LIGHTNING.
**Blocked:** none.

## 2026-08-21 — review D-1361–D-1362 (audit #1730)

**Objective:** audit — C-fidelity reviews **321–322** of JS SHAs
`a895ac7e` / `a979a9ac` plus full `sessions` score.
**C locus:** `dokick.c` `kick_ouch` `:892–897`; `dokick` `:1265–1310`
+ `steed.c` `kick_steed` `:402–449`.
**Change:** no `js/` edits. Both **ACCEPT-WITH-DEBT**. Named: hurtle;
swallow/pit-brace/Lev; `monverbself` vtense. Filled archive
D-1362 `a979a9ac`. Must-fix empty. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `37+0.30/turn` (R² 0.85).
**Verified:** full `sessions` at HEAD `a979a9ac`; public-unhit on
portcullis/poly/steed kick.
**Next:** Open `dokick.c` `obj_delivery` stolen_booty /
`mksobj_migr_to_species` (named from D-1177).
**Blocked:** none.

## 2026-08-21 — D-1362 dokick.c no_kick poly/steed/lizard/uinwater/boulder

**Objective:** Open `dokick.c` no_kick poly/steed/lizard/
uinwater/boulder (named from D-0786). Not Wounded_legs.
**C locus:** `dokick.c` `dokick` `:1265–1310`; callee
`steed.c` `kick_steed` `:402–449`.
**Change:** C-order no_kick chain; steed yn+`kick_steed`;
utrap pit `Passes_walls` / WEB|BEARTRAP. Filled D-1361
archive hash `a895ac7e`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
poly/mount/lizard/swim/boulder kick).
**Verified:** private canary **60**/60; green+strict
seed8000/0900; focused seed0060; cohort **8**/8 + strict
1500/1800/0012/0004/0007/2200/0383 + seed0060.
**Next:** Open `dokick.c` `obj_delivery` stolen_booty /
`mksobj_migr_to_species` (named from D-1177).
**Blocked:** none.

## 2026-08-21 — D-1361 dokick.c kick_ouch find_drawbridge remap

**Objective:** Open `dokick.c` kick_ouch drawbridge
`find_drawbridge` remap (named from D-1343). Not no_kick.
**C locus:** `dokick.c` `kick_ouch` `:892–897`; callees
`dbridge.c` `is_drawbridge_wall` / `find_drawbridge`.
**Change:** portcullis `pline_The` + remap `gm.maploc`/x,y
before `wake_nearto`/`kickstr`. Live dbridge helpers. Filled
D-1360 archive hash `bdf4c27e`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session kicks a portcullis).
**Verified:** private canary **22**/22; green+strict seed8000/0900;
focused seed0060; cohort **8**/8 + strict 1500/1800/0012/0004/
0007/2200/0383 + seed0060.
**Next:** Open `dokick.c` no_kick poly/steed/lizard/uinwater/
boulder (named from D-0786). Not Wounded_legs.
**Blocked:** none.

## 2026-08-21 — D-1360 dokick.c dokick u_wipe_engr(2)

**Objective:** Open `dokick.c` `u_wipe_engr` caller (C `:1384`;
body D-1051). Not knockback.
**C locus:** `dokick.c` `dokick` `:1384`; callee `engrave.c`
`u_wipe_engr` `:264–268`.
**Change:** after `wake_nearby(FALSE)`, call live `u_wipe_engr(2)`
before `isok` / `kick_monster`. Declined peaceful still returns
first. Filled D-1359 archive/review hash `0ff8d15e`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless kick
on a wipeable engraving).
**Verified:** private canary **15**/15; green+strict seed8000/0900;
focused seed0060; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `dokick.c` kick_ouch drawbridge `find_drawbridge`
remap (named from D-1343).
**Blocked:** none.

## 2026-08-21 — D-1359 fountain.c drinkfountain fate<10 uhunger+=

**Objective:** Must-fix review **318** `fountain.c` `drinkfountain`
fate<10 `uhunger += rnd(10)` + `newuhs(FALSE)` (C `:279–282`).
Not eat.c lesshungry.
**C locus:** `fountain.c` `drinkfountain` `:279–282`.
**Change:** replace `await lesshungry(rnd(10))` with raw add +
`newuhs(false)`. Water no longer chokes or steals a turn at 1500.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit on 1500+ water;
seed0014 PASS below 1500).
**Verified:** private canary **16**/16; green+strict seed8000/0900;
focused seed0014; cohort **7**/7 + strict 1500/1800/0012/0004/0007/
2200/0383.
**Next:** Open `dokick.c` `u_wipe_engr` caller (C `:1384`).
**Blocked:** none.
