# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-21 — D-1335 objnam.c killer_xname (dokick kickobjnam)

**Objective:** Open `dokick.c` `killer_xname` (kickobjnam still
xname). Not special_dmgval.
**C locus:** `objnam.c` `killer_xname` `:1942–2005`; callers
`dokick.c` `kick_object` `:498` and petrify `:551–554`.
**Change:** kickobjnam and barefoot petrify now use
`killer_xname` (full ID, article, corpse type, slime mold
"deadly", restore). `kickstr` still named. Remaining eat/zap/
dothrow callers named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1695**.
**Verified:** canary **29**/29; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` `maybe_mnexto` evade (named from
D-1310). Not kickstr.
**Blocked:** none.

## 2026-08-21 — D-1334 mthrowu.c return_from_mtoss snuff_candle

**Objective:** Open `mthrowu.c` `snuff_candle` (C `:942` notcaught
land). Not throwit land.
**C locus:** `mthrowu.c` `return_from_mtoss` `:942`; callee
`apply.c` `snuff_candle` `:1472–1491`; caller `m_throw` `:829`.
**Change:** notcaught return land now snuffs candles/candelabrum
before `ship_object`/`flooreffects("drop")`. Tethered AKLYS
`m_throw` sets `return_flightpath` instead of `drop_throw`.
Lamps stay lit. `thrwmu` always_toss / polearm still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1695**.
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` `killer_xname` (kickobjnam still xname).
Not special_dmgval.
**Blocked:** none.

## 2026-08-21 — #1690 review D-1330–D-1333 + cadence

**Objective:** audit — C-fidelity reviews **292–295** of JS SHAs
since `6b844816`, plus full `sessions` score. No `js/` port.
**C locus:** `uhitm.c` mhitm AD_DRIN; mhitu AD_WRAP; `dokick.c`
kickdmg `special_dmgval`; `dothrow.c` throwit land `snuff_candle`.
**Change:** **292–295** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1333 archive hash `b82375a7`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`37+0.30/turn` (R² 0.85) at `b82375a7`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1695**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` (this iter).
**Next:** Open `mthrowu.c` `snuff_candle` (C `:942` notcaught
land). Not throwit land.
**Blocked:** none.

## 2026-08-21 — D-1333 dothrow.c throwit land snuff_candle

**Objective:** Open `dothrow.c` throwit land `snuff_candle` (C
`:1818`). Not mthrowu.
**C locus:** `dothrow.c` `throwit` `:1818`; callee `apply.c`
`snuff_candle` `:1472–1491`.
**Change:** a thrown lit candle/candelabrum that misses now
snuffs before `ship_object`/`place_object`. Lamps stay lit.
mthrowu `:942` still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1690**.
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mthrowu.c` `snuff_candle` (C `:942` notcaught
land). Not throwit land.
**Blocked:** none.

## 2026-08-21 — D-1332 dokick.c kickdmg special_dmgval

**Objective:** Open `dokick.c` kickdmg `special_dmgval` (named
from D-1310). Not snuff_candle.
**C locus:** `dokick.c` `kickdmg` `:56` / `:90`; callee
`weapon.c` `special_dmgval`.
**Change:** a blessed-boot kick now rolls `rnd(4)` vs
undead/demon and can hurt a shade. JS no longer stubs
`specialdmg = 0`. `maybe_mnexto` / `abuse_dog` still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1690**.
**Verified:** canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` throwit land `snuff_candle` (C
`:1818`). Not mthrowu.
**Blocked:** none.

## 2026-08-21 — D-1331 mhitu.c AD_WRAP

**Objective:** Open `mhitu.c` `u_slip_free` AD_WRAP (named from
D-1307). Not AD_DRIN.
**C locus:** `uhitm.c` `mhitm_ad_wrap` mhitu `:3376–3417`; callee
`mhitu.c` `u_slip_free`; caller `mhitm_adtyping`.
**Change:** an eel/python wrap now slips, grabs (coil/swing),
drowns in a pool, crushes on AT_HUGS, or brushes (verbose). JS
no longer zeros AD_WRAP in `mhitm_adtyping_u`. uhitm/mhitm wrap
arms still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1690**.
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` kickdmg `special_dmgval` (named from
D-1310). Not snuff_candle.
**Blocked:** none.
