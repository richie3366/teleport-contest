# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-21 — review D-1375–D-1378 (audit #1750)

**Objective:** audit — C-fidelity reviews **335–338** of JS SHAs
`8a2a32bd` / `61c15769` / `e785f5bb` / `12953730` plus full
`sessions` score.
**C locus:** `dig.c:1328–1335`; `muse.c:1566–1574` /
`:1938–1955`; `artifact.c:2054–2128`; `spell.c:1419–1454` /
`:1655–1701`.
**Change:** no `js/` edits. All four **ACCEPT-WITH-DEBT**.
Filled archive D-1378 `12953730`. Must-fix empty. Next Open
`zapnodir` WAN_CREATE_MONSTER. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `38+0.31/turn` (R² 0.84).
**Verified:** full `sessions` at HEAD `12953730`; public-unhit
on axe wipe / monster camera / Sunsword invoke / skilled scatter.
**Next:** Open `zap.c` `zapnodir` WAN_CREATE_MONSTER (named).
Not light.
**Blocked:** none.
## 2026-08-21 — D-1378 spell.c skilled SPE_FIREBALL scatter

**Objective:** Open `spell.c` skilled SPE_FIREBALL scatter
(named from D-1365). Not zapyourself explode.
**C locus:** `spell.c` `spelleffects` `:1419–1454` +
`throwspell` `:1655–1701`; `zap.c` `spell_damage_bonus`
`:3479–3502`. Callee `explode`.
**Change:** skilled FIREBALL/CONE `throwspell` then
`rnd(8)+1` explode scatter olet 0 + Int/level bonus.
Unskilled FALLTHROUGH weffects named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts skilled fireball).
**Verified:** private canary **23**/23; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapnodir` WAN_CREATE_MONSTER (named).
Not light.
**Blocked:** none.
## 2026-08-21 — D-1377 artifact.c invoke_blinding_ray

**Objective:** Open `artifact.c` `invoke_blinding_ray`
(named from D-1366). Not camera.
**C locus:** `artifact.c` `invoke_blinding_ray` `:2054–2086`
+ `arti_invoke_cost` `:2088–2128`; callees `do_blinding_ray`
/ `litroom` Sunsword radius-0 / `lightdamage`+`flashburn`.
**Change:** extract `inv_prop`; BLINDING_RAY getdir ray /
spot / self / cancel refund. Other specials named. Rule #2:
no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session `#invoke`s Sunsword).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` skilled SPE_FIREBALL scatter
(named from D-1365). Not zapyourself explode.
**Blocked:** none.
## 2026-08-21 — D-1376 muse.c MUSE_CAMERA lightdamage

**Objective:** Open `muse.c` MUSE_CAMERA `lightdamage`
(named from D-1366). Not zapnodir.
**C locus:** `muse.c` `find_offensive` `:1566–1574` +
`use_offensive` `:1938–1955`; callee `zap.c` `lightdamage`.
**Change:** camera select (`!rn2(6)` after sight/gremlin +
dist2<=2 + spe>0) and use (Hallu cheese / picture / flash
`rnd(51)` / `lightdamage` / spe-- / return 1). SCR_EARTH
and Sunsword invoke still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
hostile fires a charged camera adjacent).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `artifact.c` `invoke_blinding_ray` (named
from D-1366). Not camera.
**Blocked:** none.
## 2026-08-21 — D-1375 dig.c use_pick_axe2 u_wipe_engr(3)

**Objective:** Open `dig.c` `u_wipe_engr` caller
(named from D-1360). Not dothrow.
**C locus:** `dig.c` `use_pick_axe2` `:1328–1335`; callee
`engrave.c` `u_wipe_engr` `:264–268`.
**Change:** axe-scratch arm (`!ispick` and not LANDMINE/
BEAR_TRAP) calls live `u_wipe_engr(3)` after the scratch
pline. Pick-down / axe on those traps still start digging.
uteetering still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session chops down with an axe on a wipeable engraving).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `muse.c` MUSE_CAMERA `lightdamage` (named
from D-1366). Not zapnodir.
**Blocked:** none.
## 2026-08-21 — review D-1371–D-1374 (audit #1745)

**Objective:** audit — C-fidelity reviews **331–334** of JS SHAs
`211485a0` / `b3fe3015` / `d5614c8a` / `08007958` plus full
`sessions` score.
**C locus:** `youprop.h:42–44` Shock_resistance; `allmain.c`
`:360–361`; `uhitm.c` `:551–553`; `dothrow.c` `:138`.
**Change:** no `js/` edits. All four **ACCEPT-WITH-DEBT**.
Filled archive D-1374 `08007958`. Must-fix empty. Next Open
`dig.c` wipe. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `40+0.33/turn` (R² 0.86).
**Verified:** full `sessions` at HEAD `08007958`; public-unhit
on conferral shock / EOT wipe / melee wipe / throw wipe.
**Next:** Open `dig.c` `u_wipe_engr` caller (named from
D-1360). Not dothrow.
**Blocked:** none.
## 2026-08-21 — D-1374 dothrow.c throw_obj u_wipe_engr(2)

**Objective:** Open `dothrow.c` `u_wipe_engr` caller
(named from D-1360). Not uhitm. Not dig.
**C locus:** `dothrow.c` `throw_obj` `:138`; callee
`engrave.c` `u_wipe_engr` `:264–268`.
**Change:** after self refuse, call live `u_wipe_engr(2)`
before named petrify / multishot. Import live callee.
dig still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session throws on a wipeable engraving).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dig.c` `u_wipe_engr` caller
(named from D-1360). Not dothrow.
**Blocked:** none.
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
