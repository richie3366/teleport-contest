# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-21 — D-1348 uhitm.c mhitm_ad_wrap you-as-agr

**Objective:** Open `uhitm.c` `m_slips_free` AD_WRAP (uhitm
you-as-agr; named from D-1331). Not mhitu wrap.
**C locus:** `uhitm.c` `mhitm_ad_wrap` `:3344–3375` (uhitm arm).
Callee `m_slips_free` `:2053–2093` (already D-1307). Caller
`damageum` → `mhitm_adtyping`.
**Change:** wire AD_WRAP in `damageum_adtyping`. Match C
`tailmiss=!notonhead`; slip/`!rn2(10)` coil-or-swing grab; pool
`!cant_drown` drown; AT_HUGS crush; verbose brush. mhitm brush
named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless wrap
poly hits `notonhead`). Next audit @**#1710**.
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` `abuse_dog` (named from D-1332). Not
kickstr.
**Blocked:** none.
## 2026-08-21 — D-1347 objnam.c doname warn_obj glow

**Objective:** Open `objnam.c` warn_obj glow (named from D-1322).
Not killer_xname.
**C locus:** `objnam.c` `doname_base` `:1599–1609` (W_WEP else
after ConcatF2). Callees `glow_verb`/`glow_color`;
`arti_light_description`.
**Change:** overwrite closing `)` with `, glimmering light blue)`
or `, brilliantly lit)`. artilist `acolor` extracted. doname
inlines glow helpers (no objnam→artifact import). `see_monsters`
cnt / SPFX_WARN / ARMOR `:1412` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless glowing
Sting / lit Sunsword `doname`). Next audit @**#1710**.
**Verified:** canary **35**/35; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `m_slips_free` AD_WRAP (named from
D-1331). Not mhitu wrap.
**Blocked:** none.
## 2026-08-21 — D-1346 dothrow.c throwit killer_xname

**Objective:** Open `dothrow.c` throwit `losehp` `killer_xname`
(C `:1747`). Not zap.
**C locus:** `dothrow.c` `throwit` `:1747–1748` (returning-missile
arm-hit after `artifact_hit`).
**Change:** `losehp(Maybe_Half_Phys(dmg), killer_xname(obj),
KILLED_BY)` not `xname`. throw_obj `:139–148` petrify named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
returning-missile arm-hit death). Next audit @**#1710**.
**Verified:** canary **28**/28; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `objnam.c` warn_obj glow (named from D-1322).
Not killer_xname.
**Blocked:** none.
## 2026-08-21 — review D-1342–D-1345 (audit #1705)

**Objective:** audit — C-fidelity reviews **304–307** of JS SHAs
since `36035cf8`, plus full `sessions` score. No `js/` port.
**C locus:** `artifact.c` `arti_reflects`; `dokick.c` `kickstr`;
`eat.c` `choke`; `zap.c` `dozap` `killer_xname`.
**Change:** **304–307** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1345 archive hash `2a5e72e0`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`37+0.29/turn` (R² 0.85) at `2a5e72e0`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1710**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` this iter.
**Next:** Open `dothrow.c` throwit `losehp` `killer_xname`
(C `:1747`). Not zap.
**Blocked:** none.
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
