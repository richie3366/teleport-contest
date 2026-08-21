# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-21 — D-1330 mhitm.c AD_DRIN

**Objective:** Open `mhitm.c` AD_DRIN (named from D-1307). Not mhitu.
**C locus:** `uhitm.c` `mhitm_ad_drin` mhitm `:3272–3301`; `mhitm.c`
`mattackm` AT_TENT `:425`; `hitmm` tentacles suck; `eat_brains`.
**Change:** a mind-flayer tentacle now eats another monster's brain
(headless skipdrin, helm `W_ARMH&&rn2(8)` literal helmet,
`eat_brains(gv.vis)`, lifsav skipdrin). `mattackm` AT_TENT no
longer falls out of the switch. AD_WRAP still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1690**.
**Verified:** canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` `u_slip_free` AD_WRAP (named from D-1307).
**Blocked:** none.

## 2026-08-21 — #1685 review D-1326–D-1329 + cadence

**Objective:** audit — C-fidelity reviews **288–291** of JS SHAs
since `7fcaa15e`, plus full `sessions` score. No `js/` port.
**C locus:** `mhitu.c` explmu / AT_EXPL; `mattacku` AT_HUGS +
`u_slip_free`; `gazemu` / AT_GAZE; `uhitm.c` `mhitm_ad_drin` mhitu.
**Change:** **288–291** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1329 archive hash `a7a5a835`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`37+0.30/turn` (R² 0.84) at `a7a5a835`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1690**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` (this iter).
**Next:** Open `mhitm.c` AD_DRIN (named from D-1307). Not mhitu.
**Blocked:** none.

## 2026-08-21 — D-1329 mhitu.c AD_DRIN

**Objective:** Open `mhitu.c` AD_DRIN (named from D-1309). Not gazemu.
**C locus:** `uhitm.c` `mhitm_ad_drin` mhitu `:3222–3271`; callees
`eat_brains`, `u_slip_free`, `losespells`, `drain_weapon_skill`,
`adjattrib` dunce. Caller `mhitm_adtyping_u`.
**Change:** a mind-flayer tentacle now drains (hitmsg, headless
skipdrin, greased helm slip, `uarmh` `rn2(8)` hat/helm, Half then
`mdamageu` and zero leftover dice, `eat_brains` unless dunce,
`adjattrib(A_INT,-rnd(2),FALSE)`, 1/5 spells / 1/5 skill). mhitm
AD_DRIN still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1685**.
**Verified:** canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitm.c` AD_DRIN (named from D-1307). Not mhitu.
**Blocked:** none.

## 2026-08-21 — D-1328 mhitu.c gazemu

**Objective:** Open `mhitu.c` gazemu (named from D-1314). Not explmu.
**C locus:** `mhitu.c` `gazemu` `:1668–1898`; `mattacku` AT_GAZE
`:832–837`; `mon.c` `m_respond_medusa` `:4109–4118`.
**Change:** AT_GAZE now gazes (skip Medusa in `mattacku`;
`m_respond_medusa` dynamic-imports `gazemu`). AD_STON
reflect/stone, CONF/STUN/BLND/FIRE, cancelled looks-X, Hallu
`rn2(4)`. BEHOLDER AD_SLEE/AD_SLOW stay compiled out. mhitu
AD_DRIN still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1685**.
**Verified:** canary **20**/20; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` AD_DRIN (named from D-1309). Not gazemu.
**Blocked:** none.

## 2026-08-21 — D-1327 mhitu.c mattacku AT_HUGS

**Objective:** Open `mhitu.c` AT_HUGS (named). Not explmu.
**C locus:** `mhitu.c` `mattacku` AT_HUGS `:823–830`; `u_slip_free`
`:1045–1085`; `uhitm.c` `mhitm_ad_phys` mhitu `:4023–4037`.
**Change:** hug auto-hits after two prior successes or while
ustuck; `failed_grab` pline; `rn2(2)` grab / `u_slip_free` /
crush; rope golem choke. gazemu / AD_WRAP caller still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1685**.
**Verified:** canary **27**/27; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` gazemu (named from D-1314). Not explmu.
**Blocked:** none.

## 2026-08-21 — D-1326 mhitu.c explmu + mattacku AT_EXPL

**Objective:** Open `mhitu.c` explmu (named). Not AT_HUGS.
**C locus:** `mhitu.c` `explmu` `:1591–1664`; `mattacku` AT_EXPL
`:839–842`.
**Change:** adjacent AT_EXPL now explodes (`mcan` miss before `d()`,
thin-air/`empty water` vs `hitmsg`, elemental `mon_explodes`,
BLND visible skip-`rnd`, HALU kaleidoscope/`mondead`,
`ugolemeffects`, `wake_nearto 7*7`). `defended` / gazemu / AT_HUGS
still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1685**.
**Verified:** canary **29**/29; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` AT_HUGS (named). Not explmu.
**Blocked:** none.
