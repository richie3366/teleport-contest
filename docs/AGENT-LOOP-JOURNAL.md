# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-25 — D-1431 potion.c peffect_gain_level

**Objective:** Open `potion.c` `peffect_gain_level` (named).
Not blindness.
**C locus:** `potion.c` `peffect_gain_level` `:1083–1116` /
`peffects` `:1392–1393`; callee `dungeon.c`
`Can_rise_up` `:1674–1687`; `exper.c` `pluslvl` /
`rndexp`; `do.c` `goto_level`.
**Change:** cursed potion_unkn++ then ledger 1+amulet →
earth_level else Can_rise_up → get_level(depth-1);
same-level It tasted bad; else You rise through
ceiling + goto_level else uneasy. Uncursed/blessed
pluslvl(FALSE); blessed uexp=rndexp(TRUE). Blindness
still named. potionhit/mix named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs gain level).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_blindness` (named). Not
sleeping.
**Blocked:** none.
## 2026-08-25 — D-1430 potion.c peffect_acid

**Objective:** Open `potion.c` `peffect_acid` (named).
Not gain level.
**C locus:** `potion.c` `peffect_acid` `:1297–1314` /
`peffects` `:1414–1415`; callee `eat.c`
`fix_petrification` `:867–877`.
**Change:** Acid_resistance tastes tangy/sour else burns
a little/a lot/like acid; `d(cursed?2:1, blessed?4:8)`
losehp Maybe_Half_Phys KILLED_BY_AN; exercise CON FALSE;
Stoned fix_petrification; potion_unkn++. Gain level still
named. potionhit/mix named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs acid).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_gain_level` (named). Not
blindness.
**Blocked:** none.
## 2026-08-25 — D-1429 potion.c peffect_gain_energy

**Objective:** Open `potion.c` `peffect_gain_energy` (named).
Not acid.
**C locus:** `potion.c` `peffect_gain_energy` `:1224–1257` /
`peffects` `:1408–1409`.
**Change:** cursed You_feel lackluster else Magical energies;
`d(blessed?3:!cursed?2:1,6)` ±uenmax + 3*num uen clamp
0/max; uenpeak; botl; exercise WIS TRUE. Acid still named.
potionhit/mix named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs gain energy).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_acid` (named). Not gain
level.
**Blocked:** none.
## 2026-08-25 — D-1428 potion.c peffect_polymorph

**Objective:** Open `potion.c` `peffect_polymorph` (named).
Not gain energy.
**C locus:** `potion.c` `peffect_polymorph` `:1318–1330` /
`peffects` `:1417–1418`; callee `polyself.c` `:506–508`
LOW_CTRL forcecontrol downgrade.
**Change:** You_feel little strange/normal; `!Unchanging`
POLY_NOFLAGS unless blessed original form
POLY_CONTROLLED|POLY_LOW_CTRL then mtimedone min
rn2(15)+10. Unchanging skips polyself. SPE_POLYMORPH
not this case. potionhit named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session quaffs polymorph).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_gain_energy` (named). Not
acid.
**Blocked:** none.
## 2026-08-25 — D-1427 spell.c SPE_LIGHT NODIR wand-duplicate

**Objective:** Open `zap.c` `zapnodir` remaining SPE_LIGHT
wand-duplicate (named from D-1412). Not detect unseen.
**C locus:** `spell.c` `spelleffects` `:1473–1514` (NODIR
`weffects`); callee `zap.c` `zapnodir` `:2544–2550` (D-1366
`litroom` + `lightdamage`); `weffects` `:3453–3454`.
**Change:** route SPE_LIGHT through `wand_duplicate_weffects`
(same NODIR arm as SPE_DETECT_UNSEEN). Fake SPBOOK skips
`learnwand`. SLEEP / DIG / IMMEDIATE still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts light).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `peffect_polymorph` (named). Not
gain energy.
**Blocked:** none.
## 2026-08-25 — D-1426 zap.c bhitm WAN_PROBING

**Objective:** Open `zap.c` `bhitm` WAN_PROBING (named from
D-1369). Not locking.
**C locus:** `zap.c` `bhitm` `:376–381`; callees
`probe_monster` `:625–640`, `probe_objchain` `:611–623`;
`invent.c` `display_minventory` `:5340–5386`.
**Change:** wake FALSE, reveal_invis, probe_monster, always
learn. probe_objchain observe + container lknown/cknown
(SchroedingersBox skips cknown) + tin known; notonhead
skips minvent; empty "not carrying". Thin display_minventory
MINV_ALL|PICK_NONE. bhitm map_invisible epilogue wired.
zapyourself / zap_steed / zap_updown / bhito named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps probing at a monster).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapnodir` remaining SPE_LIGHT
wand-duplicate (named from D-1412). Not detect unseen.
**Blocked:** none.
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
