# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-25 — D-1424 zap.c bhitm WAN_SLOW_MONSTER

**Objective:** Open `zap.c` `bhitm` WAN_SLOW_MONSTER (named).
Not speed.
**C locus:** `zap.c` `bhitm` `:218–232`; callee `worn.c`
`mon_adjust_speed` `:488–564`; `mon.c` `check_gear_next_turn`.
**Change:** resist NOTELL then seemimic + mon_adjust_speed(-1)
+ check_gear_next_turn; whirly engulf expels. No
helpful_gesture (can anger). SPE_SLOW same case.
zapyourself WAN_SLOW / locking still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps slow at a monster).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhitm` WAN_LOCKING (named from
D-1369). Not probing.
**Blocked:** none.
## 2026-08-25 — D-1423 zap.js knowninvisible conferral See_invisible

**Objective:** Must-fix `zap.c` `bhitm` WAN_MAKE_INVISIBLE
`knowninvisible` conferral `See_invisible` (review **374**).
Not slow.
**C locus:** `display.h` `_knowninvisible` `:146–151`;
`youprop.h` `See_invisible` `:150–152` /
`Detect_monsters` `:188–190`.
**Change:** OR `uprops[SEE_INVIS]`/`DETECT_MONSTERS` in
`knowninvisible` (same as `timeout.js` `See_invisible()`).
Did not rewrite `canseemon` or `confer_oc_oprop`. WAN_SLOW
still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps make-invisible while wearing conferral SI).
**Verified:** private canary **13**/13; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhitm` WAN_SLOW_MONSTER (named). Not
locking.
**Blocked:** none.
## 2026-08-24 — review D-1414–D-1422 (audit #1790)

**Objective:** audit — C-fidelity reviews **374–382** of JS SHAs
`f968904d` / `081c5c6a` / `22e87b3b` / `e78d7780` /
`e611ef84` / `89f05e45` / `9ab114b4` / `d6d910c2` /
`9f2a3a08` plus full `sessions` score.
**C locus:** `zap.c` `bhitm` `:348–368` / `:233–242`;
`uhitm.c` `:4158–4180`; `zap.c` `backfire` `:2605–2614`;
`spell.c` `:1534–1546` / `:1544–1546`; `potion.c`
`:914–952` / `:1165–1221` / `:646–693` / `:811–838`.
**Change:** no `js/` edits. **374** QUALITY-RISK (Must-fix:
conferral See_invisible `knowninvisible`). **375–382**
ACCEPT-WITH-DEBT. Filled archive D-1422 `9f2a3a08`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `38+0.30/turn` (R² 0.83).
**Verified:** full `sessions` at HEAD `9f2a3a08`; public-unhit
on make-invisible / artifact leftover / backfire / detect treasure
/ detect monsters / levitation / restore / invisibility / speed wand.
**Next:** Must-fix `zap.c` `bhitm` WAN_MAKE_INVISIBLE
`knowninvisible` conferral `See_invisible` (review **374**).
Not slow.
**Blocked:** none.
## 2026-08-24 — D-1422 zap.c bhitm WAN_SPEED_MONSTER

**Objective:** Open `zap.c` `bhitm` WAN_SPEED_MONSTER (named
from D-1410). Not slow.
**C locus:** `zap.c` `bhitm` `:233–242`; callee `worn.c`
`mon_adjust_speed` `:488–564`; `mon.c` `check_gear_next_turn`.
**Change:** resist NOTELL then seemimic + mon_adjust_speed(+1)
+ check_gear_next_turn; helpful_gesture always. WAN_SLOW
still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps speed at a monster).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhitm` WAN_SLOW_MONSTER (named). Not
speed.
**Blocked:** none.
## 2026-08-24 — D-1421 spell.c SPE_INVISIBILITY peffects

**Objective:** Open `spell.c` `spelleffects` SPE_INVISIBILITY
peffects (named from D-1408). Not amulet drain.
**C locus:** `spell.c` `spelleffects` `:1544–1546` FALLTHROUGH
`peffects` (no skilled bless); `potion.c`
`peffect_invisibility` `:811–838`; `timeout.c` `:759–767`.
**Change:** separate invis arm (uncursed even when skilled);
wrapping itchy return; timeout / FROMOUTSIDE; cursed
aggravate; INVIS expiry You. Remaining peffects still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts invisibility).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhitm` WAN_SPEED_MONSTER (named from
D-1410). Not slow.
**Blocked:** none.
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
