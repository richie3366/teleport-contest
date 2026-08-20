# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-20 — D-1316 dothrow.c throwit ACURRSTR urange

**Objective:** Open `dothrow.c` throwit ACURRSTR urange (named). Not
tether.
**C locus:** `dothrow.c` `throwit` `:1613–1672` + `:1680–1682`
hurtle leftover; `attrib.h` `ACURRSTR`; `youprop.h` Levitation /
Underwater.
**Change:** `throwit_calc_range` from strength/weight/ammo/air-lev
/boulder/Mjollnir/uball/underwater; post-fly recoil `hurtle`;
hand-throw pline uses `skill_name`/`weapon_descr`/`body_part(HAND)`.
`isqrt` tether named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1670**.
**Verified:** canary **24**/24; green+strict seed8000/0900; focused
seed1800; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1315 archive/review hash `44a786aa`.
**Next:** Open `objnam.c` doname CANDELABRUM (n of 7) (named from
D-1308). Not candle.
**Blocked:** none.

## 2026-08-20 — D-1315 dothrow.c throwit → throwit_mon_hit

**Objective:** Must-fix `dothrow.c` throwit → `throwit_mon_hit` (not
`thitmonst`) so snuff/`hot_pursuit` fire. Source: review **275**.
**C locus:** `dothrow.c` `throwit` `:1695`; callee `throwit_mon_hit`
`:1482–1506` (D-1313).
**Change:** after swallow/bhit/boomhit always `throwit_mon_hit`;
TRUE → `throwit_return(true)`; sync `bhitpos` from fly/swallow
locals. boomhit already-hit still NULL (no double hit). dokick
snuff / vanish pline / ACURRSTR named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1670**.
**Verified:** canary **10**/10; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` throwit ACURRSTR urange (named). Not tether.
**Blocked:** none.

## 2026-08-20 — #1665 review D-1311–D-1314 + cadence

**Objective:** audit — C-fidelity reviews **273–276** of JS SHAs
since `59177f02`, plus full `sessions` score. No `js/` port.
**C locus:** `dothrow.c` throwit TETHER/BACKTRACK; thitmonst
leader catch / `finish_quest`; `throwit_mon_hit` snuff/`hot_pursuit`;
`mon.c` `m_respond`.
**Change:** **273/274/276** ACCEPT-WITH-DEBT; **275** QUALITY-RISK
— `throwit` still calls `thitmonst` so snuff/pursuit never run on
thrown missiles. Must-fix prepended. Filled D-1314 archive hash
`a1d48196`. Rule #2: no fs.
**Score:** cadence **#1665** HEAD `a1d48196` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`37+0.32/turn` (R² 0.85). seed0383 PASS. Next audit @**#1670**.
**Verified:** `__RESULTS_JSON__` at HEAD `a1d48196`; branch-by-branch
vs pinned C (TETHER cord + BACKTRACK; catch-before-`rnd(20)`;
helper snuff vs throwit miss; shrieker `rn2(10)` / Erinys;
gazemu named).
**Next:** Must-fix `dothrow.c` throwit → `throwit_mon_hit`. Not
ACURRSTR urange.
**Blocked:** none.

## 2026-08-20 — D-1314 mon.c m_respond

**Objective:** Open `mon.c` m_respond (named from D-1301). Not
snuff_candle.
**C locus:** `mon.c` `m_respond` `:4120–4131` + shrieker/medusa
helpers; callers `dochug` / boomhit / `bhitm`.
**Change:** adjacent `MS_SHRIEK` shriek + 1/10 summon + always
`aggravate`; Medusa `couldsee` AT_GAZE walk (**gazemu named**);
hostile Erinys `m_canseeu` `aggravate`; `bhitm` `!*ushops`
`hot_pursuit`. Compare mndx. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1665**.
**Verified:** canary **14**/14; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1313 archive hash `27751021`.
**Next:** Open `dothrow.c` throwit ACURRSTR urange (named). Not tether.
**Blocked:** none.

## 2026-08-20 — D-1313 dothrow.c throwit_mon_hit snuff_candle / hot_pursuit

**Objective:** Open `dothrow.c` throwit_mon_hit snuff_candle /
hot_pursuit (named from D-1301). Not m_respond.
**C locus:** `dothrow.c` `throwit_mon_hit` `:1482–1506`;
`apply.c` `snuff_candle`; `shk.c` `hot_pursuit` / `inside_shop`.
**Change:** snuff candles/candelabrum before `thitmonst`; then
`m_at` + shk `!inside_shop` / `!strchr` `hot_pursuit`. Lamps
not snuffed. `inside_shop` exported. m_respond named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1665**.
**Verified:** canary **16**/16; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1312 archive hash `77606a78`.
**Next:** Open `mon.c` m_respond (named from D-1301). Not snuff_candle.
**Blocked:** none.

## 2026-08-20 — D-1312 dothrow.c thitmonst leader catch / finish_quest

**Objective:** Open `dothrow.c` thitmonst leader catch /
finish_quest (named). Not vanish pline.
**C locus:** `dothrow.c` `thitmonst` `:2104–2149`; `quest.c`
`finish_quest` `:226–279`.
**Change:** catch when `mcanmove`; keep invoked unique≠AoY or
angry; else `finish_quest` + hands/tosses + `!next2u` FLASH
walk + addinv. `quest_complete_no_bell` live. offeredit bodies
/ chat got_thanks named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1665**.
**Verified:** canary **16**/16; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1311 archive hash `3633eb61`.
**Next:** Open `dothrow.c` throwit_mon_hit snuff_candle / hot_pursuit.
Not m_respond.
**Blocked:** none.
