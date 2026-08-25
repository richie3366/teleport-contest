# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
