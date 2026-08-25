# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-25 — D-1425 zap.c bhitm WAN_LOCKING

**Objective:** Open `zap.c` `bhitm` WAN_LOCKING (named from
D-1369). Not probing.
**C locus:** `zap.c` `bhitm` `:370–375`; callee `trap.c`
`closeholdingtrap` `:6210–6247`.
**Change:** box_or_door + seemimic then
`wake = closeholdingtrap`; learn iff noticed. Ported
closeholdingtrap (BEAR_TRAP/WEB; hero dotrap FORCETRAP;
mon mintrap FORCETRAP). that_is_a_mimic pline named.
zapyourself WAN_LOCKING / probing still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps locking at a monster).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhitm` WAN_PROBING (named from
D-1369). Not locking.
**Blocked:** none.

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
