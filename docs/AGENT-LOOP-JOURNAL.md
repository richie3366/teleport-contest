# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
