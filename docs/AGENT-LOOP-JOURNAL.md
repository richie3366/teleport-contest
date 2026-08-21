# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-21 — D-1370 dokick.c kick_ouch/kick_dumb air/Lev hurtle

**Objective:** Open `dokick.c` kick_ouch/kick_dumb airlevel/Levitation
`hurtle` (named from D-1361). Not no_kick.
**C locus:** `dokick.c` `kick_dumb` `:876–877`; `kick_ouch`
`:904–905`; `youprop.h` Levitation; callee `dothrow.c` `hurtle`.
**Change:** youprop `(H||E)&&!B`; dumb `rn2(2)` range 1; ouch
`rn1(2,4)` after losehp noreturn skip. Live `hurtle`. Filled
D-1369 archive hash `46c4e1b0`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session kicks while air/lev).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; focused seed0060; cohort **8**/8 + strict
1500/1800/0012/0004/0007/2200/0383 + seed0060.
**Next:** Open `allmain.c` `u_wipe_engr` DEX timeout caller
(named from D-1360). Not dokick.
**Blocked:** none.
## 2026-08-21 — D-1369 zap.c zapyourself WAN_MAKE_INVISIBLE

**Objective:** Open `zap.c` `zapyourself` WAN_MAKE_INVISIBLE
(named). Not lightning.
**C locus:** `zap.c` `zapyourself` `:2825–2842`; `potion.c`
`incr_itimeout` / `self_invis_message`; `youprop.h` Invis.
**Change:** msg snapshot; wrapping itchy absorb; `rn1(15,31)`
timeout on HInvis+uprops; learn+newsym+self_invis_message.
Filled D-1368 archive hash `9df30ee3`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session self-zaps make-invisible).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` kick_ouch/kick_dumb air/Lev `hurtle`
(named from D-1361). Not no_kick.
**Blocked:** none.
## 2026-08-21 — D-1368 zap.c maybe_destroy_item AD_ELEC

**Objective:** Open `zap.c` `maybe_destroy_item` AD_ELEC
(named). Not zapyourself lightning.
**C locus:** `zap.c` `maybe_destroy_item` `:5858–5879` +
`destroyable` `:5641–5644`; chargeit `read.c` `recharge`
RING `curse_bless==0`.
**Change:** immune RIN_SHOCK/WAN_LIGHTNING; gloves skip;
charged ring chargeit spin/explode; wand `rnd(10)` + Shock
aren't-hurt; worn Ring_gone/setnotworn. Filled D-1367
archive hash `463e151d`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session elec-destroys rings/wands).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapyourself` WAN_MAKE_INVISIBLE
(named). Not lightning.
**Blocked:** none.
## 2026-08-21 — D-1367 zap.js Antimagic() uprops[ANTIMAGIC]

**Objective:** Must-fix review **324** — zap.c `zapyourself`
WAN/SPE_MAGIC_MISSILE `Antimagic()` via `youprop.h`
`uprops[ANTIMAGIC]` (D-1089), not sticky clone.
**C locus:** `youprop.h:55–57`; `zap.c` `zapyourself` `:2790–2802`
(+ WAN_STRIKING `:2715`).
**Change:** OR uprops intrinsic||extrinsic. Cloak-of-MR / gray
DSM bounce with no `d(4,6)`. Did not rewrite confer. Filled
no prior missing `%h`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session self-zaps missile under conferral MR).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `maybe_destroy_item` AD_ELEC (named).
Not zapyourself lightning.
**Blocked:** none.
## 2026-08-21 — review D-1363–D-1366 (audit #1735)

**Objective:** audit — C-fidelity reviews **323–326** of JS SHAs
`c10f4246` / `17a0937c` / `d8f4fba6` / `9a144895` plus full
`sessions` score.
**C locus:** `mkobj.c` `mksobj_migr_to_species` `:253–265` +
`mkmaze.c` `stolen_booty`; `zap.c` `zapyourself` `:2790–2802`
/ `:2748–2751`; `lightdamage` `:3024–3056`.
**Change:** no `js/` edits. **323/325/326** ACCEPT-WITH-DEBT.
**324** QUALITY-RISK: MAGIC_MISSILE `Antimagic()` sticky clone
misses `uprops[ANTIMAGIC]` (D-1089). Must-fix prepended. Filled
archive D-1366 `9a144895`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `36+0.29/turn` (R² 0.85).
**Verified:** full `sessions` at HEAD `9a144895`; public-unhit on
orctown / missile self-zap / fireball / wand of light.
**Next:** Must-fix zap.js `zapyourself` WAN/SPE_MAGIC_MISSILE
`Antimagic()` via `uprops[ANTIMAGIC]`. Not confer rewrite.
**Blocked:** none.
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
