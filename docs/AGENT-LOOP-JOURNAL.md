# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-21 — D-1372 allmain.c DEX timeout u_wipe_engr(rnd(3))

**Objective:** Open `allmain.c` `u_wipe_engr` DEX timeout
caller (named from D-1360). Not dokick. Not uhitm.
**C locus:** `allmain.c` `moveloop` `:360–361`; callee
`engrave.c` `u_wipe_engr` `:264–268`.
**Change:** replace `rnd(3)` stub with `u_wipe_engr(rnd(3))`
behind `!rn2(40+ACURR(A_DEX)*3)`. Import live callee.
`amulet()` / udemigod still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session is on a wipeable engraving when the DEX timeout fires).
**Verified:** private canary **29**/29; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `u_wipe_engr` attacker caller
(named from D-1360). Not allmain.
**Blocked:** none.
## 2026-08-21 — D-1371 zap.js Shock_resistance() uprops[SHOCK_RES]

**Objective:** Must-fix review **328** zap.js `Shock_resistance()`
via `uprops[SHOCK_RES]` (D-1089). Not confer rewrite. Not
allmain wipe.
**C locus:** `youprop.h:42–44`; `zap.c` `maybe_destroy_item`
`:5859–5860` / `:5939–5940`; WAN_LIGHTNING `:2733`.
**Change:** OR `uprops[SHOCK_RES]` intrinsic||extrinsic. Worn
shock-ring / shock-shield exploding-wand `"You aren't hurt!"`
(still `rnd(10)`). Did not rewrite confer. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session elec-destroys while wearing shock-res).
**Verified:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `allmain.c` `u_wipe_engr` DEX timeout caller
(named from D-1360). Not dokick.
**Blocked:** none.
## 2026-08-21 — review D-1367–D-1370 (audit #1740)

**Objective:** audit — C-fidelity reviews **327–330** of JS SHAs
`463e151d` / `9df30ee3` / `46c4e1b0` / `90eca343` plus full
`sessions` score.
**C locus:** `youprop.h:55–57` Antimagic; `zap.c`
`maybe_destroy_item` `:5858–5879`; `zapyourself` `:2825–2842`;
`dokick.c` `kick_dumb` `:876–877` / `kick_ouch` `:904–905`.
**Change:** no `js/` edits. **327/329/330** ACCEPT-WITH-DEBT.
**328** QUALITY-RISK: AD_ELEC `Shock_resistance()` sticky clone
misses `uprops[SHOCK_RES]` (D-1089). Must-fix prepended. Filled
archive D-1370 `90eca343`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `37+0.30/turn` (R² 0.84).
**Verified:** full `sessions` at HEAD `90eca343`; public-unhit on
conferral MR bounce / elec destroy / make-invisible / air kick.
**Next:** Must-fix zap.js `Shock_resistance()` via
`uprops[SHOCK_RES]`. Not confer rewrite. Not allmain wipe.
**Blocked:** none.
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
