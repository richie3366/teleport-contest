# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-25 — D-1441 spell.c SPE_DIG RAY wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_DIG wand-duplicate
(named from D-1427). Not IMMEDIATE.
**C locus:** `spell.c` `spelleffects` `:1467–1514`; callee
`zap.c` `weffects` `:3459–3460` `zap_dig()`; `zapyourself`
`:2955–2959` no-op.
**Change:** route SPE_DIG through `wand_duplicate_weffects`
(RAY weffects → zap_dig). Self-dir zapyourself no-op.
MAGIC_MISSILE / FINGER / IMMEDIATE still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts dig).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_phys` rustm leftover
(named from D-1415). Not poison.
**Blocked:** none.
## 2026-08-25 — review D-1432–D-1440 (audit #1810)

**Objective:** audit — C-fidelity reviews **392–400** of JS SHAs
`b19bcf7a` / `07c5ee30` / `4488f535` / `ebe912e0` /
`e413754d` / `af184f1e` / `abdbcad6` / `f6dd492b` /
`530eaa3c` plus full `sessions` score.
**C locus:** `potion.c` `peffect_blindness` `:1073–1080`;
`zap.c` `zapyourself` `:2868–2874` / `:2948–2954` /
`:2960–2965`; `bhitm` `:521–544`; `potion.c`
`:901–911` / `:1030–1048` / `:696–714`; `spell.c`
`:1462–1514`.
**Change:** no `js/` edits. **392–400** ACCEPT-WITH-DEBT.
Filled archive D-1440 `530eaa3c`. Must-fix empty. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `36+0.30/turn` (R² 0.857).
**Verified:** full `sessions` at HEAD `530eaa3c`; public-unhit
on blindness / slow-self / locking / probing / drain /
sleeping / gain ability / hallucination / sleep-cast.
**Next:** Open `zap.c` `weffects` SPE_DIG wand-duplicate
(named from D-1427). Not IMMEDIATE.
**Blocked:** none.
## 2026-08-25 — D-1440 spell.c SPE_SLEEP RAY wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_SLEEP wand-duplicate
(named from D-1427). Not DIG.
**C locus:** `spell.c` `spelleffects` `:1462–1514`; callee
`zap.c` `weffects` `:3456–3468` `ubuzz(BZ_U_SPELL, ulevel/2+1)`.
**Change:** route SPE_SLEEP through `wand_duplicate_weffects`
(RAY weffects). Self-dir zapyourself already live. DIG still
named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts sleep).
**Verified:** private canary **36**/36; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_DIG wand-duplicate
(named from D-1427). Not IMMEDIATE.
**Blocked:** none.
## 2026-08-25 — D-1439 potion.c peffect_hallucination

**Objective:** Open `potion.c` `peffect_hallucination` (named).
Not remaining mix.
**C locus:** `potion.c` `peffect_hallucination` `:696–714`
/ `peffects` `:1340–1342`. Callees `make_hallucinated`;
`invent.js` `enlightenment`.
**Change:** Halluc_resistance nothing+return; else
already-hallu nothing then still make_hallucinated
rn1(200, 600-300*bcsign) talk TRUE mask 0; blessed
!rn2(3) else !cursed && !rn2(6) MAGIC enlightenment.
potionhit / potionbreathe / mix still named. Rule #2:
no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs hallucination).
**Verified:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_SLEEP wand-duplicate
(named from D-1427). Not DIG.
**Blocked:** none.
## 2026-08-25 — D-1438 potion.c peffect_gain_ability

**Objective:** Open `potion.c` `peffect_gain_ability` (named).
Not hallucination.
**C locus:** `potion.c` `peffect_gain_ability` `:1030–1048`
/ `peffects` `:1382–1384`. Callee `attrib.c` `adjattrib`.
**Change:** cursed Ulch+unkn; Fixed_abil (extrinsic)
potion_nothing; else blessed adjattrib all A_MAX
msgflg 0, uncursed rn2 tries msgflg -1 then last 0,
break on first success. potionhit / potionbreathe /
mix still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs gain ability).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_hallucination` (named).
Not remaining mix.
**Blocked:** none.
## 2026-08-25 — D-1437 potion.c peffect_sleeping

**Objective:** Open `potion.c` `peffect_sleeping` (named).
Not remaining peffects.
**C locus:** `potion.c` `peffect_sleeping` `:901–911` /
`peffects` `:1363–1365`. Callees `timeout.c` `fall_asleep`
`:951–974`; `mondata.c` `monstseesu`/`monstunseesu`.
**Change:** resist (Sleep_resistance||Free_action) yawn +
monstseesu; else fall_asleep(-rn1(10, 25-12*bcsign), TRUE).
potionhit / potionbreathe still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs sleeping).
**Verified:** private canary **38**/38; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_gain_ability` (named).
Not hallucination.
**Blocked:** none.
## 2026-08-25 — D-1436 zap.c bhitm SPE_DRAIN_LIFE

**Objective:** Open `zap.c` `bhitm` SPE_DRAIN_LIFE
(named). Not zapyourself slow.
**C locus:** `zap.c` `bhitm` `:521–544`; callees
`monhp_per_lvl`, `resists_drli`, `shieldeff_mon`,
`resist` NOTELL; caller `spell.c` `:1477` weffects.
**Change:** drain-life on a monster seemimic + HP/level
strip (or undead shield). Spell wand-duplicate dispatch.
zapyourself drain / bhito drain_item still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts drain at a monster).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_sleeping` (named).
Not remaining peffects.
**Blocked:** none.
## 2026-08-25 — D-1435 zap.c zapyourself WAN_PROBING

**Objective:** Open `zap.c` `zapyourself` WAN_PROBING
(named). Not drain.
**C locus:** `zap.c` `zapyourself` `:2960–2965`; callees
`probe_objchain` `:611–623` (D-1426), `invent.c`
`update_inventory`, `insight.c` `ustatusline`.
**Change:** probe invent (JS Array D-1017) then
update_inventory; always learn; ustatusline. Not
probe_monster. SPE_DRAIN / zap_steed / zap_updown /
bhito still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session self-zaps probing).
**Verified:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhitm` SPE_DRAIN_LIFE (named).
Not zapyourself slow.
**Blocked:** none.
## 2026-08-25 — D-1434 zap.c zapyourself WAN_LOCKING

**Objective:** Open `zap.c` `zapyourself` WAN_LOCKING
(named). Not probing self.
**C locus:** `zap.c` `zapyourself` `:2948–2954`; callees
`boxlock_invent` `:2687–2702`, `lock.c` `boxlock`,
`trap.c` `closeholdingtrap` `:6210–6247` (D-1425).
**Change:** utrap || !closeholdingtrap then
boxlock_invent. Trap-hit skips chests; already-trapped
still locks. noticed→learn (Klunk does not). Probing /
drain still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session self-zaps locking).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapyourself` WAN_PROBING (named).
Not drain.
**Blocked:** none.
## 2026-08-25 — D-1433 zap.c zapyourself WAN_SLOW_MONSTER

**Objective:** Open `zap.c` `zapyourself` WAN_SLOW_MONSTER
(named from D-1424). Not locking self.
**C locus:** `zap.c` `zapyourself` `:2868–2874`; callee
`mhitu.c` `u_slow_down` `:161–171`.
**Change:** HFast&(TIMEOUT|INTRINSIC) then learn +
u_slow_down (HFast=0; !Fast You slow down else boots
less natural; exercise DEX FALSE). EFast-only / FROM_FORM
miss. Locking / probing / drain still named. Rule #2:
no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session self-zaps slow).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapyourself` WAN_LOCKING (named).
Not probing self.
**Blocked:** none.
## 2026-08-25 — D-1432 potion.c peffect_blindness

**Objective:** Open `potion.c` `peffect_blindness` (named).
Not sleeping.
**C locus:** `potion.c` `peffect_blindness` `:1073–1080` /
`peffects` `:1389–1390`; callee `make_blinded`
`:261–331` (JS `do.js`).
**Change:** already Blind or (H||E)&&BBlinded →
potion_nothing++; always make_blinded(itimeout_incr(
BlindedTimeout, rn1(200, 250-125*bcsign)), !Blind).
Sleeping still named. potionhit/mix named. Rule #2:
no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs blindness).
**Verified:** private canary **14**/14; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapyourself` WAN_SLOW_MONSTER
(named from D-1424). Not locking self.
**Blocked:** none.
## 2026-08-25 — review D-1423–D-1431 (audit #1800)

**Objective:** audit — C-fidelity reviews **383–391** of JS SHAs
`1200fdb0` / `faa5f3f3` / `8f334efb` / `e50968db` /
`91c11733` / `19c24f62` / `4a16af4e` / `3e742468` /
`66254727` plus full `sessions` score.
**C locus:** `display.h` `_knowninvisible`; `zap.c` `bhitm`
`:218–232` / `:370–375` / `:376–381`; `spell.c` `:1473–1514`;
`potion.c` `:1318–1330` / `:1224–1257` / `:1297–1314` /
`:1083–1116`.
**Change:** no `js/` edits. **383–391** ACCEPT-WITH-DEBT.
Filled archive D-1431 `66254727`. Must-fix empty. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `37+0.30/turn` (R² 0.85).
**Verified:** full `sessions` at HEAD `66254727`; public-unhit
on conferral SI / slow / locking / probing / light / polymorph
/ gain energy / acid / gain level.
**Next:** Open `potion.c` `peffect_blindness` (named). Not
sleeping.
**Blocked:** none.
