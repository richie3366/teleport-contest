# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-21 — review D-1346–D-1349 (audit #1710)

**Objective:** audit — C-fidelity reviews **308–311** of JS SHAs
since `a684ed50`, plus full `sessions` score. No `js/` port.
**C locus:** `dothrow.c` throwit `:1747`; `objnam.c` doname
`:1599–1609`; `uhitm.c` `mhitm_ad_wrap` `:3344–3375`;
`dokick.c` `kickdmg` `:70–76`.
**Change:** **308–311** ACCEPT-WITH-DEBT. No Must-fix. Filled
D-1349 archive hash `533e732f`. Cadence **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`37+0.30/turn` (R² 0.85) at `533e732f`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1715**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` this iter.
**Next:** Open `dokick.c` martial knockback (named from D-1332).
Not abuse_dog.
**Blocked:** none.

## 2026-08-21 — D-1349 dokick.c kickdmg abuse_dog

**Objective:** Open `dokick.c` `abuse_dog` (named from D-1332).
Not kickstr.
**C locus:** `dokick.c` `kickdmg` `:70–76`. Callees `dog.c`
`abuse_dog` (D-0836) + `monmove.c` `monflee`. Caller
`kick_monster` after evade, non-poly.
**Change:** after `check_caitiff`, tame `abuse_dog` then
still-tame `monflee(dmg?rnd(dmg):1)` else `mflee=0`, before
`rnd(dmg)`. Shade return still skips. Martial knockback
named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session kicks a pet). Next audit @**#1710**.
**Verified:** canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `dokick.c` martial knockback (named from
D-1332). Not abuse_dog.
**Blocked:** none.

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
