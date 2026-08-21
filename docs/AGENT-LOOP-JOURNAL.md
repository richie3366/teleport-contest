# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-21 — #1680 review D-1322–D-1325 + cadence

**Objective:** audit — C-fidelity reviews **284–287** of JS SHAs
since `758ab9b1`, plus full `sessions` score. No `js/` port.
**C locus:** `objnam.c` doname W_WEP `!mrg_to_wielded` + AKLYS
tethered; `zap.c` bhit THROWN_TETHERED / isqrt; `dothrow.c`
thitmonst vanish; `dokick.c` `snuff_candle`.
**Change:** **284–287** ACCEPT-WITH-DEBT. Review **283** closed by
D-1322. No Must-fix. Filled D-1325 archive hash `2cdf2b1f`.
Cadence **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `37+0.30/turn` (R² 0.84) at `2cdf2b1f`. Rule #2: no
fs.
**Score:** fortress held. Next audit @**#1685**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` (this iter).
**Next:** Open `mhitu.c` explmu (named). Not AT_HUGS.
**Blocked:** none.
## 2026-08-21 — D-1325 dokick.c really_kick_object snuff_candle

**Objective:** Open `dokick.c` snuff_candle (named from D-1242).
Not throwit_mon_hit.
**C locus:** `dokick.c` `really_kick_object` `:733–736`;
`apply.c` `snuff_candle` `:1472–1491`.
**Change:** extract then `snuff_candle` then newsym then
`bhit(KICKED_WEAPON)`. Lamps stay lit. Throwit land / mthrowu /
killer_xname still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1680**.
**Verified:** canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1324 archive hash `1d5b0b66`.
**Next:** Open `mhitu.c` explmu (named). Not AT_HUGS.
**Blocked:** none.
## 2026-08-21 — D-1324 dothrow.c thitmonst swallow vanish pline

**Objective:** Open `dothrow.c` thitmonst vanish pline (named from
D-1312). Not leader catch.
**C locus:** `dothrow.c` `thitmonst` `:2276–2298`.
**Change:** wakeup then cockatrice `minstapetrify`/`delobj`;
`Tobjnam` vanish into entrails/currents/`mon_nam`. potionhit /
ball / boulder still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1680**.
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1323 archive hash `b50daaea`.
**Next:** Open `dokick.c` snuff_candle (named from D-1242). Not
throwit_mon_hit.
**Blocked:** none.
## 2026-08-21 — D-1323 zap.c bhit THROWN_TETHERED_WEAPON / isqrt

**Objective:** Open `zap.c` bhit THROWN_TETHERED_WEAPON / isqrt
(named from D-1311). Not throwit tether.
**C locus:** `zap.c` bhit `:3863–4127`; `dothrow.c` throwit
`:1664–1677`; `hacklib.c` `isqrt`.
**Change:** remap+DISP_TETHER, skip END for caller; throwit
`min(range, isqrt(arw->range))` and calls `bhit`. THROWN_WEAPON
fly stand-in still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1680**.
**Verified:** canary **25**/25; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1322 archive/review **283** hash `843343cc`.
**Next:** Open `dothrow.c` thitmonst vanish pline (named from
D-1312). Not leader catch.
**Blocked:** none.
## 2026-08-21 — D-1322 objnam.c doname W_WEP !mrg_to_wielded + AKLYS tethered

**Objective:** Must-fix `objnam.c` doname W_WEP `!mrg_to_wielded`
+ AKLYS `"tethered to"` (review **283**). Not warn_obj.
**C locus:** `objnam.c` `doname_base` W_WEP `:1561` conjunct +
`:1563` / `:1591–1595` 3-arm ConcatF2; `pickup.c:1881` flag.
**Change:** restore live `!game.mrg_to_wielded` on the rewritten
if; `otyp==AKLYS` `"tethered to"` before twoweap/`weapon in`.
warn_obj / `artifact_light` still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1680**.
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled none (D-1321 archive already `b7a0c3c7`).
**Next:** Open `zap.c` bhit THROWN_TETHERED_WEAPON / isqrt
(named from D-1311). Not throwit tether.
**Blocked:** none.
## 2026-08-21 — #1675 review D-1319–D-1321 + cadence

**Objective:** audit — C-fidelity reviews **281–283** of JS SHAs
since `a40f5920`, plus full `sessions` score. No `js/` port.
**C locus:** `objnam.c` doname LEASH attached; POT_OIL `(lit)`;
W_WEP `body_part(HAND)`.
**Change:** **281–282** ACCEPT-WITH-DEBT. **283** QUALITY-RISK —
rewritten W_WEP `if` dropped live `!mrg_to_wielded` and AKLYS
`"tethered to"`. Must-fix prepended. Filled D-1321 archive hash
`b7a0c3c7`. Cadence **44**/44 Scr **11,405**/11,405 RNG
**792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85) at
`b7a0c3c7`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1680**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` (this iter).
**Next:** Must-fix `objnam.c` doname W_WEP `!mrg_to_wielded` +
AKLYS `"tethered to"` (review **283**). Not zap bhit.
**Blocked:** none.
