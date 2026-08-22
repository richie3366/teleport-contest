# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).

## 2026-08-22 — D-1413 potion.c peffect_enlightenment

**Objective:** Open `potion.c` `peffect_enlightenment` (named
from D-1395). Not full healing.
**C locus:** `potion.c` `peffect_enlightenment` `:794–808`;
caller `peffects` `:1349`; callee `zap.c`
`do_enlightenment_effect` D-1395.
**Change:** quaff enlightenment now cursed uneasy+WIS
exercise, else blessed INT then WIS then MAGIC helper.
Artifact invoke / mix / remaining peffects still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs enlightenment).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhitm` WAN_MAKE_INVISIBLE (named
from D-1369). Not zapyourself speed.
**Blocked:** none.
## 2026-08-22 — D-1412 zap.c zapnodir SPE_DETECT_UNSEEN

**Objective:** Open `zap.c` `zapnodir` SPE_DETECT_UNSEEN
(named from D-1404). Not stasis.
**C locus:** `zap.c` `zapnodir` `:2552–2558`; caller
`spell.c` `:1474` NODIR `weffects`; callee `findit` D-0074.
**Change:** SPE_DETECT_UNSEEN shares SECRET_DOOR `findit`
+ `known=!!dknown`. SPBOOK skips `learnwand`. spell.js
routes to `wand_duplicate_weffects`. SPE_LIGHT cast /
enlightenment still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts detect unseen).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_enlightenment` (named
from D-1395). Not full healing.
**Blocked:** none.
## 2026-08-22 — D-1411 potion.c peffect_full_healing

**Objective:** Open `potion.c` `peffect_full_healing` (named).
Not haste.
**C locus:** `potion.c` `peffect_full_healing` `:1144–1162`;
caller `peffects` `:1401–1402`; callee `exper.c` `pluslvl`.
**Change:** quaff full healing now `healup(400,4+4*bcsign)`
then blessed lost-level `ulevelmax--`/`pluslvl(FALSE)`, hallu,
STR then CON, wounded legs (blessed even riding). potionhit /
breathe / mix / enlightenment still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs full healing).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapnodir` SPE_DETECT_UNSEEN (named
from D-1404). Not stasis.
**Blocked:** none.
## 2026-08-22 — D-1410 zap.c zapyourself WAN_SPEED_MONSTER

**Objective:** Open `zap.c` `zapyourself` WAN_SPEED_MONSTER
(named from D-1369). Not make invisible.
**C locus:** `zap.c` `zapyourself` `:2845–2849`; callee
`potion.c` `speed_up` `:2918–2928` (D-1408). Caller
`dozap` self-dir.
**Change:** self-zap now `speed_up(rn1(25,50))` then always
`learnwand`. No FROMOUTSIDE. WAN_SLOW / bhitm speed /
zap_steed still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session self-zaps speed).
**Verified:** private canary **11**/11; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_full_healing` (named).
Not haste.
**Blocked:** none.
## 2026-08-22 — D-1409 spell.c spell_backfire

**Objective:** Open `spell.c` `spell_backfire` (named). Not
peffects.
**C locus:** `spell.c` `spell_backfire` `:1179–1217`; caller
`spelleffects_check` `:1251–1260`.
**Change:** forgotten `spellknow<=0` now `rn2(10)` confuse/stun
TIMEOUT increment (talk FALSE) then `rnd(energy)` Pw debit.
Callees live `make_confused`/`make_stunned`. Remaining
peffects named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts a forgotten spell).
**Verified:** private canary **14**/14; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapyourself` WAN_SPEED_MONSTER (named
from D-1369). Not make invisible.
**Blocked:** none.
## 2026-08-22 — D-1408 spell.c SPE_HASTE_SELF peffects

**Objective:** Open `spell.c` `spelleffects` SPE_HASTE_SELF
peffects (named). Not mapping.
**C locus:** `spell.c` `spelleffects` `:1534–1546`; callee
`potion.c` `peffects` / `peffect_speed` `:1052–1070` /
`speed_up` `:2918–2928`.
**Change:** skilled bless then `peffects(pseudo)`. Callee
`speed_up(rn1(10,100+60*bcsign))` + POT_SPEED wounded
`heal_legs` / FROMOUTSIDE. Siblings still named. Rule #2:
no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts haste self).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spell_backfire` (named). Not
peffects.
**Blocked:** none.
## 2026-08-22 — D-1407 spell.c SPE_MAGIC_MAPPING seffects

**Objective:** Open `spell.c` `spelleffects` SPE_MAGIC_MAPPING
seffects (named). Not create monster.
**C locus:** `spell.c` `spelleffects` `:1528–1531`; callee
`read.c` `seffects` `:2263–2265` / `seffect_magic_mapping`
`:2102–2153`; `detect.c` `do_mapping`.
**Change:** same `seffects(pseudo)` arm as CREATE_MONSTER (no
skilled bless). Callee nommap `make_confused(HConfusion+rnd(30))`
+ `body_part(HEAD)` + `notice_mon_off/on` around live
`do_mapping`. SCR path D-0075. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts magic mapping; seed2200 scroll mapping still PASS).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_HASTE_SELF peffects
(named). Not mapping.
**Blocked:** none.
## 2026-08-22 — D-1406 uhitm.c mhitm_ad_wrap mhitm brush

**Objective:** Open `mhitm.c` `mhitm_ad_wrap` brush (named from
D-1348). Not uhitm wrap.
**C locus:** `uhitm.c` `mhitm_ad_wrap` mhitm `:3418–3426`; caller
`mhitm.c` `mdamagem` `:1059`.
**Change:** `mcan` zeros leftover; vis
`Some_Monnam`/`some_mon_nam` brush iff leftover is 0. Live leftover
`d()` kept (no grab/drown). uhitm/mhitu already live. AUGMENT_IT
named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a session
has vis cancelled/zero-dice mon-vs-mon AD_WRAP).
**Verified:** private canary **14**/14; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_MAGIC_MAPPING seffects
(named). Not create monster.
**Blocked:** none.
## 2026-08-22 — D-1405 uhitm.c mhitm_ad_fire leftover

**Objective:** Open `uhitm.c` `mhitm_ad_fire` leftover (named from
D-1385). Not STUN.
**C locus:** `uhitm.c` `mhitm_ad_fire` mhitm `:2588–2621`; caller
`mhitm.c` `mdamagem` `:1059`; callees `on_fire` / `completelyburns`
/ `destroy_items` / `ignite_items` already live.
**Change:** MC zeros leftover (unlike STUN); vis on_fire pline;
paper/straw `monkilled`+`grow_up` done; `resists_fire` zeros then
`destroy_items(orig)`+`ignite_items`. uhitm/mhitu / `defended`
named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a session
has vis mon-vs-mon AD_FIRE leftover).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` `mhitm_ad_wrap` brush (named from
D-1348). Not uhitm wrap.
**Blocked:** none.
## 2026-08-22 — review D-1396–D-1404 (audit #1770)

**Objective:** audit — C-fidelity reviews **356–364** of JS SHAs
`66018a5a` / `f5e00af7` / `a938a5b9` / `64d4d089` /
`dce9ac86` / `88587b68` / `2a3da9b9` / `d9134735` /
`cc7284d4` plus full `sessions` score.
**C locus:** `uhitm.c:4410–4420` / `:4142–4157` / `:4138–4141`;
`spell.c:1584–1587` / `:1552–1567` / `:1549–1551` /
`:1588–1590` / `:1528–1531`; `zap.c:2559–2568`.
**Change:** no `js/` edits. **356–364** ACCEPT-WITH-DEBT.
No Must-fix. Filled archive D-1404 `cc7284d4`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `39+0.31/turn` (R² 0.85).
**Verified:** full `sessions` at HEAD `cc7284d4`; public-unhit
on STUN leftover / JUMPING / CURE_SICKNESS / CURE_BLINDNESS /
CHAIN / CREATE_MONSTER / mwep dmgval / kick-thick / WAN_STASIS.
**Next:** Open `uhitm.c` `mhitm_ad_fire` leftover.
Not STUN.
**Blocked:** none.
