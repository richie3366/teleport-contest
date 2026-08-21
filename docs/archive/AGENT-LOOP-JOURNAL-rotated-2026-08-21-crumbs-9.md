# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-21 — D-1373 uhitm.c do_attack u_wipe_engr(3)

**Objective:** Open `uhitm.c` `u_wipe_engr` attacker caller
(named from D-1360). Not allmain. Not dothrow.
**C locus:** `uhitm.c` `do_attack` `:551–553`; callee
`engrave.c` `u_wipe_engr` `:264–268`.
**Change:** replace stub comment with `u_wipe_engr(3)` after
`exercise(A_STR,true)` before named leprechaun/`hitum`. Import
live callee. dothrow/dig still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session melees on a wipeable engraving).
**Verified:** private canary **28**/28; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` `u_wipe_engr` caller
(named from D-1360). Not uhitm.
**Blocked:** none.

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
