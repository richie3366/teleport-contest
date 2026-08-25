# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
