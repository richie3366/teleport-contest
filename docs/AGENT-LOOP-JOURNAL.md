# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-21 — D-1366 zap.c lightdamage WAN_LIGHT/camera

**Objective:** Open `zap.c` `lightdamage` (named; WAN_LIGHT/camera).
Not flashburn lightning.
**C locus:** `zap.c` `lightdamage` `:3024–3056`. Callers
`zapnodir` `:2544–2550`; `zapyourself` `:2915–2928`.
**Change:** gremlin rnd/cap/Ow/losehp; zapnodir WAN/SPE_LIGHT
litroom+amt 5; WAN_LIGHT FALLTHROUGH CAMERA + rnd(25)
flashburn(FALSE) damage 0. Filled D-1365 archive hash.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps light / self-photos).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `maybe_destroy_item` AD_ELEC (named).
Not zapyourself lightning.
**Blocked:** none.
## 2026-08-21 — D-1365 zap.c zapyourself SPE_FIREBALL

**Objective:** Open `zap.c` `zapyourself` SPE_FIREBALL (named).
Not lightning.
**C locus:** `zap.c` `zapyourself` `:2748–2751`. Callee
`explode.c` `explode` (type 11 / WAND_CLASS).
**Change:** You explode on self then `explode(ux,uy,11,d(6,6),
WAND_CLASS,EXPL_FIERY)`. No `learn_it`; return 0. Filled
D-1364 archive hash. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until
`spelleffects` wires SPE_FIREBALL).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `lightdamage` (named; WAN_LIGHT/camera).
Not flashburn lightning.
**Blocked:** none.
## 2026-08-21 — D-1364 zap.c zapyourself WAN/SPE_MAGIC_MISSILE

**Objective:** Open `zap.c` `zapyourself` WAN_MAGIC_MISSILE
(named). Not WAN_LIGHTNING.
**C locus:** `zap.c` `zapyourself` `:2790–2802` (WAN + SPE
same case). Caller `dozap` `:2658–2663`.
**Change:** always learn; Antimagic `pline_The` bounce with
no `d()`; else `d(4,6)` + Idiot (two spaces). Bounce is not
zhitu `"bounce off"`. Filled D-1363 archive hash.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session self-zaps magic missile).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapyourself` SPE_FIREBALL (named).
Not lightning.
**Blocked:** none.
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
## 2026-08-21 — review D-1355–D-1358 (audit #1725)

**Objective:** audit — C-fidelity reviews **317–320** of JS SHAs
`0be6d98e`…`fbfc72d9` since `262f16f5`, plus full `sessions`
score. No `js/` port.
**C locus:** `zap.c` `zapyourself` `:2730–2746`; `eat.c`
`lesshungry` `:3289–3333`; `objnam.c` `the()` `:2171–2231`;
`dokick.c` `dokick` `:1383`.
**Change:** **317/319/320** ACCEPT-WITH-DEBT; **318**
QUALITY-RISK. Must-fix: fountain fate<10 raw `uhunger +=`
(`:279–282`). Filled D-1358 archive hash `fbfc72d9`.
Cadence **44**/44 Scr **11,405**/11,405 RNG
**792,838**/792,838 (100%) speed `37+0.32/turn` (R² 0.85)
at `fbfc72d9`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1730**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` this iter.
**Next:** Must-fix `fountain.c` `drinkfountain` fate<10
`uhunger += rnd(10)` + `newuhs(FALSE)`. Not eat.c lesshungry.
**Blocked:** none.
## 2026-08-21 — D-1358 dokick.c wake_nearby caller

**Objective:** Open `dokick.c` `wake_nearby` caller (C `:1383`
after maybe_kick; callee live). Not knockback.
**C locus:** `dokick.c` `dokick` `:1383`; callee `mon.c`
`wake_nearby` `:4367–4370` / `wake_nearto_core`.
**Change:** after maybe_kick succeeds (or no mtmp),
`await wake_nearby(false)` before isok / kick_monster.
Declined peaceful still returns first. `u_wipe_engr(2)` named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session kicks near a sleeper). Next audit @**#1725**.
**Verified:** canary **23**/23; green+strict seed8000/0900;
focused seed0060; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` `u_wipe_engr` caller (C `:1384`;
body D-1051). Not knockback.
**Blocked:** none.
## 2026-08-21 — D-1357 objnam.c the() CapitalMon

**Objective:** Open `objnam.c` `the()` CapitalMon (named from
D-1335). Not warn_obj.
**C locus:** `rumors.c` `CapitalMon` `:791–822` /
`init_CapMons` `:829–935`; `objnam.c` `the()` `:2171–2231`.
**Change:** capitalized type/title names get `"the "`
(Oracle/Archon); pname uniques stay bare (Medusa); first-space
`" of "` + PYEC. fruit_from_name + artifact_name named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session names a capitalized type via `the()`). Next audit
@**#1725**.
**Verified:** canary **26**/26; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` `wake_nearby` caller (C `:1383`;
callee live). Not knockback.
**Blocked:** none.
## 2026-08-21 — D-1356 eat.c lesshungry/bite choke callers

**Objective:** Open `eat.c` lesshungry/bite choke callers (named
from D-1344). Not zap.
**C locus:** `eat.c` `lesshungry` `:3289–3333`; `bite`
`:3133–3158`; `doeat` canchoke `:3077`; `reset_eat` `:308–318`.
**Change:** choke at 2000 (`iseating` eatfood/`force_save_hs`
or `!canchoke` skip while eating); tin/`null` snack when not
eating; fullwarn 1500 + paranoid Continue; `doeat` SATIATED
canchoke snapshot. adj_victual_nutrition / `do_reset_eat`
touchfood named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session chokes). Next audit @**#1725**.
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `objnam.c` `the()` CapitalMon (named from
D-1335). Not warn_obj.
**Blocked:** none.
## 2026-08-21 — D-1355 zap.c zapyourself WAN_LIGHTNING

**Objective:** Open `zap.c` `zapyourself` WAN_LIGHTNING (named).
Not killer_xname.
**C locus:** `zap.c` `zapyourself` `:2730–2746`; callee
`flashburn` `:3059–3079`.
**Change:** learn + `d(12,6)` + Shock shock/exercise vs unharmed;
`destroy_items` AD_ELEC; `flashburn(rnd(100), TRUE)` Blind/Unaware
`make_blinded` talk=FALSE. ugolemeffects / AD_ELEC body /
MAGIC_MISSILE named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session self-zaps lightning). Next audit @**#1725**.
**Verified:** canary **25**/25; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `eat.c` lesshungry/bite choke callers (named
from D-1344). Not zap.
**Blocked:** none.
## 2026-08-21 — review D-1351–D-1354 (audit #1720)

**Objective:** audit — C-fidelity reviews **313–316** of JS SHAs
`48f2f0a2`…`6570ddba` since `35dfdd85`, plus full `sessions`
score. No `js/` port.
**C locus:** `mhitm.c` `hitmm` `:706–726`; `uhitm.c`
`mhitm_ad_ston` `:4254–4261`; `muse.c` `ureflects` `:2850–2864`;
`weapon.c` `dmgval` `:307–308`.
**Change:** **313–316** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1354 archive hash `6570ddba`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`37+0.31/turn` (R² 0.85) at `6570ddba`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1725**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` this iter.
**Next:** Open `zap.c` `zapyourself` WAN_LIGHTNING (named).
Not killer_xname.
**Blocked:** none.
