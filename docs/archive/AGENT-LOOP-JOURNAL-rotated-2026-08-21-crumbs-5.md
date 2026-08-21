# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-21 — D-1345 zap.c dozap killer_xname

**Objective:** Open `zap.c` zapyourself `killer_xname` (remaining).
Not eat choke.
**C locus:** `zap.c` `dozap` `:2658–2663` (`uhim()` +
`killer_xname`); callee `zapyourself` returns damage.
**Change:** self-zap tombstone uses `killer_xname` + `uhim()`
+ `NO_KILLER_PREFIX` (not `xname` / `u.female`). dothrow
`:1747` / pickup / wield named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
self-zap death). Next audit @**#1705**.
**Verified:** canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dothrow.c` throwit `losehp` `killer_xname`
(C `:1747`). Not zap.
**Blocked:** none.

## 2026-08-21 — D-1344 eat.c choke killer_xname

**Objective:** Open `eat.c` choke `killer_xname` (remaining caller).
Not dokick kickobjnam.
**C locus:** `eat.c` `choke` `:245–288`; killer `:268–284`
(`:279` `killer_xname`); caller `eataccessory` AoS `:2387`.
**Change:** non-coin food tombstone uses `killer_xname` +
`KILLED_BY` (article in name). Coins `"very rich meal"` /
null `"quick snack"` already matched. lesshungry/bite +
zap/dothrow named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless choke
death). Next audit @**#1705**.
**Verified:** canary **45**/45; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` zapyourself `killer_xname` (remaining).
Not eat choke.
**Blocked:** none.

## 2026-08-21 — D-1343 dokick.c kickstr

**Objective:** Open `dokick.c` `kickstr` (named; kick_ouch still
raw kickobjnam). Not maybe_mnexto.
**C locus:** `dokick.c` `kickstr` `:794–830`; caller `kick_ouch`
`:903`; dokick sets `gm.maploc` `:1387`/`:1391`.
**Change:** `losehp` killer is `"kicking "` + kickobjnam or
terrain noun (nowhere `"nothing"`, door/tree/wall/rock/…).
Drawbridge maploc remap / eat·zap·dothrow `killer_xname` named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless kick
death). Next audit @**#1705**.
**Verified:** canary **41**/41; green+strict seed8000/0900;
cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383 +
seed0060.
**Next:** Open `eat.c` choke `killer_xname` (remaining caller).
Not dokick kickobjnam.
**Blocked:** none.

## 2026-08-21 — D-1342 artifact.c arti_reflects W_WEP

**Objective:** Open `artifact.c` `arti_reflects` W_WEP (named from
D-1328). Not gazemu.
**C locus:** `artifact.c` `arti_reflects` `:537–550`;
`set_artifact_intrinsic` SPFX_REFLECT W_WEP `:867–872`; caller
`muse.c` `mon_reflects` `:2807`.
**Change:** wielded Dragonbane/Longbow of Diana reflect. Hero
`EReflecting&W_WEP`; `mon_reflects` MON_WEP between shield and
amulet. cspfx extract / zap·pray AMUL·ARM named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1705**.
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` `kickstr` (named; kick_ouch still raw
kickobjnam). Not maybe_mnexto.
**Blocked:** none.

## 2026-08-21 — review D-1338–D-1341 (audit #1700)

**Objective:** audit — C-fidelity reviews **300–303** of JS SHAs
since `38b3ff39`, plus full `sessions` score. No `js/` port.
**C locus:** `mhitm.c` gazemm / explmm / AT_HUGS; `uhitm.c`
`shade_miss` + `hitmm`.
**Change:** **300–303** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1341 archive hash `e3a30202`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.29/turn` (R² 0.85) at `e3a30202`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1705**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` (this iter).
**Next:** Open `artifact.c` `arti_reflects` W_WEP (named from
D-1328). Not gazemu.
**Blocked:** none.

## 2026-08-21 — D-1341 uhitm.c shade_miss + hitmm

**Objective:** Open `mhitm.c` hitmm `shade_miss` (named from D-0887).
Not AT_HUGS.
**C locus:** `uhitm.c` `shade_miss` `:2016–2051`; caller `mhitm.c`
`hitmm` `:659–661`.
**Change:** unarmed (and dmgval-0) melee vs a shade returns
`M_ATTK_MISS` with harmlessly-through and wakes. `dmgval`
shade/`shade_glare` still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1700**.
**Verified:** canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `artifact.c` `arti_reflects` W_WEP (named from
D-1328). Not gazemu.
**Blocked:** none.
