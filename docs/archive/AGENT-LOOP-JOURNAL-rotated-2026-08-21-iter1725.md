# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
