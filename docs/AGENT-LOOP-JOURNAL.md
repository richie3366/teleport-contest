# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-24 — D-1420 spell.c SPE_RESTORE_ABILITY peffects

**Objective:** Open `spell.c` `spelleffects` SPE_RESTORE_ABILITY
peffects (named from D-1408). Not INVISIBILITY.
**C locus:** `spell.c` `spelleffects` `:1534–1546`; `potion.c`
`peffect_restore_ability` `:646–693`; `apply.c`
`unfixable_trouble_count` `:4431–4469`.
**Change:** skilled bless then `peffects`; Wow/Ulch; ABASE=AMAX
+ AEXE max 0; potion `pluslvl`; spell skips levels. INVIS still
named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts restore ability).
**Verified:** private canary **41**/41; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_INVISIBILITY
peffects (named from D-1408). Not amulet drain.
**Blocked:** none.
## 2026-08-24 — D-1419 spell.c SPE_LEVITATION peffects

**Objective:** Open `spell.c` `spelleffects` SPE_LEVITATION
peffects (named from D-1408). Not RESTORE_ABILITY.
**C locus:** `spell.c` `spelleffects` `:1534–1546`; `potion.c`
`peffect_levitation` `:1165–1221`; `timeout.c` `:794–803`.
**Change:** skilled bless then `peffects`; `float_up` +
timeout/I_SPECIAL; cursed ceiling/`doup`; expiry
`float_down`. RESTORE still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts levitation).
**Verified:** private canary **24**/24; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_RESTORE_ABILITY
peffects (named from D-1408). Not INVISIBILITY.
**Blocked:** none.
## 2026-08-22 — D-1418 spell.c SPE_DETECT_MONSTERS peffects

**Objective:** Open `spell.c` `spelleffects` SPE_DETECT_MONSTERS
peffects (named from D-1408). Not LEVITATION.
**C locus:** `spell.c` `spelleffects` `:1534–1546`; `potion.c`
`peffect_monster_detection` `:914–952`; callee `detect.c`
`monster_detect` `:798–862`; `timeout.c` `:932–934`.
**Change:** skilled bless then `peffects`; blessed timeout +
lonely; empty `strange_feeling` threatened; expiry
`see_monsters`. LEVITATION still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts detect monsters).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_LEVITATION
peffects (named from D-1408). Not RESTORE_ABILITY.
**Blocked:** none.
## 2026-08-22 — D-1417 spell.c SPE_DETECT_TREASURE peffects

**Objective:** Open `spell.c` `spelleffects` SPE_DETECT_TREASURE
peffects (named from D-1408). Not DETECT_MONSTERS.
**C locus:** `spell.c` `spelleffects` `:1534–1546`; `potion.c`
`peffect_object_detection` `:954–961`; callee `detect.c`
`object_detect` `:603–788`.
**Change:** skilled bless then `peffects`; object_detect
do_dknown invent+floor; empty `strange_feeling` return 1.
DETECT_MONSTERS still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts detect treasure).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_DETECT_MONSTERS
peffects (named from D-1408). Not LEVITATION.
**Blocked:** none.
## 2026-08-22 — D-1416 zap.c backfire

**Objective:** Open `zap.c` `backfire` (named). Not zapyourself.
**C locus:** `zap.c` `backfire` `:2605–2614`; caller `dozap`
`:2647–2652`; callee `invent.c` `useupall` `:1312–1317`.
**Change:** cursed `!rn2(100)` now explodes via `The(xname)`,
`d(spe+2,6)`, `losehp` exploding wand, `useupall`, then
exercise STR. Dust spe<0 still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps a cursed wand that rolls `rn2(100)==0`).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_DETECT_TREASURE
peffects (named from D-1408). Not DETECT_MONSTERS.
**Blocked:** none.
## 2026-08-22 — D-1415 uhitm.c mhitm_ad_phys artifact_hit leftover

**Objective:** Open `uhitm.c` `mhitm_ad_phys` artifact_hit leftover
(named from D-1403). Not rustm.
**C locus:** `uhitm.c` `mhitm_ad_phys` `:4158–4180`; caller
`mhitm.c` `hitmm` `:698–701`; callee `artifact.c` `artifact_hit`
D-0613.
**Change:** mwep artifact now `artifact_hit` after dmgval;
hitmm skips default hits; delayed `gv.vis` hits iff false;
DEADMONSTER `grow_up` done. rustm / poison / worm-shrieker
still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has mon-vs-mon artifact wep).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `backfire` (named). Not zapyourself.
**Blocked:** none.
## 2026-08-22 — D-1414 zap.c bhitm WAN_MAKE_INVISIBLE

**Objective:** Open `zap.c` `bhitm` WAN_MAKE_INVISIBLE (named
from D-1369). Not zapyourself speed.
**C locus:** `zap.c` `bhitm` `:348–368`; callee `worn.c`
`mon_set_minvis` `:474–484`; `display.h` `_knowninvisible`.
**Change:** monster-aimed make-invisible now `seemimic`, snapshot
`Monnam`, `mon_set_minvis(FALSE)`, then transparent+learn iff
`!oldinvis && knowninvisible` else vanish iff `couldsee &&
!canseemon`. zap_updown / zap_steed / speed / worm segs still
named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps make-invisible at a monster).
**Verified:** private canary **10**/10; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_phys` artifact_hit leftover
(named from D-1403). Not rustm.
**Blocked:** none.
## 2026-08-22 — review D-1405–D-1413 (audit #1780)

**Objective:** audit — C-fidelity reviews **365–373** of JS SHAs
`7c3921f2` / `61936a70` / `6ec1c72d` / `5c71fc34` /
`fa039634` / `55259f2b` / `71ee9186` / `fb872749` /
`285218b2` plus full `sessions` score.
**C locus:** `uhitm.c:2588–2621` / `:3418–3426`;
`spell.c:1528–1531` / `:1534–1546` / `:1179–1217`;
`zap.c:2845–2849` / `:2552–2558`; `potion.c:1144–1162` /
`:794–808`.
**Change:** no `js/` edits. **365–373** ACCEPT-WITH-DEBT.
No Must-fix. Filled archive D-1413 `285218b2`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `38+0.31/turn` (R² 0.85).
**Verified:** full `sessions` at HEAD `285218b2`; public-unhit
on FIRE leftover / wrap brush / haste / backfire / wand speed /
full healing / detect unseen / enlightenment; mapping hit via
seed2200 scroll.
**Next:** Open `zap.c` `bhitm` WAN_MAKE_INVISIBLE.
Not zapyourself speed.
**Blocked:** none.
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
