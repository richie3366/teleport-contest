# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-20 — D-1311 dothrow.c throwit tethered DISP_TETHER / BACKTRACK

**Objective:** Open `dothrow.c` throwit tethered DISP_TETHER /
BACKTRACK (named from D-1303). Not leader catch.
**C locus:** `dothrow.c` throwit `:1523` / `:1577–1578` /
`:1712–1713` / `:1761–1762`; `display.c` `tether_glyph` +
tmp_at TETHER/BACKTRACK; `zap.c` bhit open (JS fly stands in).
**Change:** live cord (`tether_glyph` zap type 2) + BACKTRACK
delay walk; swallow/fly open DISP_TETHER; fail/consumed END 0.
Leader `finish_quest` / zap bhit THROWN_TETHERED / isqrt named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1665**.
**Verified:** canary **31**/31; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1310 archive hash `734449dc`.
**Next:** Open `dothrow.c` thitmonst leader catch / finish_quest.
Not vanish pline.
**Blocked:** none.

## 2026-08-20 — #1660 review D-1307–D-1310 + cadence

**Objective:** audit — C-fidelity reviews **269–272** of JS SHAs
since `3ecd2824` / `49dab44b`, plus full `sessions` score. No `js/`
port.
**C locus:** `uhitm.c` helmet / `m_slips_free`; `objnam.c` doname
candle / lamp `(lit)`; `mhitu.c` `mattacku` AT_TENT; `dokick.c`
`kick_monster` poly AT_KICK.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: mhitu AD_DRIN / candelabrum / explmu / AT_HUGS
/ `find_roll_to_hit` mlevel / tether BACKTRACK). Filled D-1310
archive hash `734449dc`. Open first row still throwit tethered
DISP_TETHER / BACKTRACK. Rule #2: no fs.
**Score:** cadence **#1660** HEAD `734449dc` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.85). seed0383 PASS. Next audit @**#1665**.
**Verified:** `__RESULTS_JSON__` at HEAD `734449dc`; branch-by-branch
vs pinned C (slip then `rn2(8)` then `eat_brains`; candle `<` +
peek reconstruct; TENT `rnd(20+i)` not INT drain; NATTK KICK then
return).
**Next:** Open `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK.
Not leader catch.
**Blocked:** none.

## 2026-08-20 — D-1310 dokick.c kick_monster poly AT_KICK

**Objective:** Open `dokick.c` poly AT_KICK loop (named). Not
hmonas pit kick.
**C locus:** `dokick.c` `kick_monster` `:183–223` `Upolyd &&
attacktype(AT_KICK)` then return; `uhitm.c` `find_roll_to_hit`
AT_KICK martial_bonus.
**Change:** NATTK KICK-only `rnd(20)` / `special_dmgval(W_ARMF)` /
shade break / `damageum`+`passive` or `missum`+`passive`. kickdmg
`special_dmgval` / `maybe_mnexto` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1660**.
**Verified:** canary **17**/17; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1309 archive hash `07ac10e0`.
**Next:** Open `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK.
Not leader catch.
**Blocked:** none.

## 2026-08-20 — D-1309 mhitu.c mattacku AT_TENT melee

**Objective:** Open `mhitu.c` AT_TENT melee (named from D-1261).
Not mswings.
**C locus:** `mhitu.c` `mattacku` `:793–821` `case AT_TENT:` with
claw/kick/bite; pit kick; weapon/petrify gate; `failed_grab`;
thick-skinned kick skip `hitmu`.
**Change:** add AT_TENT to HTH switch; port same-arm gates.
Local `Conflict()`. explmu / AT_HUGS / mhitu AD_DRIN / mattackm
AT_TENT named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1660**.
**Verified:** canary **22**/22; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
Filled D-1308 archive hash `2b9c2c6a`.
**Next:** Open `dokick.c` poly AT_KICK loop. Not hmonas pit kick.
**Blocked:** none.

## 2026-08-20 — D-1308 objnam candle partly used / lamp (lit)

**Objective:** Open `objnam.c` candle `partly used` (named from
D-1295). Not MEAT_RING.
**C locus:** `objnam.c` `doname_base` TOOL `:1455–1478`;
`mkobj.c` `mksobj_init` `:989–993`.
**Change:** `"partly used "` from remaining burn vs `20*oc_cost`
(lit reconstructs via `peek_timer(BURN_OBJECT)-moves`); lamp/candle
`" (lit)"`; `mksobj` tallow 200 / wax 400. Candelabrum / leash /
W_TOOL / POT_OIL named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1660**.
**Verified:** canary **35**/35; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383; seed0361 PASS.
Filled D-1307 archive hash `b97b1fc6`.
**Next:** Open `mhitu.c` AT_TENT melee. Not mswings.
**Blocked:** none.

## 2026-08-20 — D-1307 uhitm helmet / m_slips_free

**Objective:** Open `uhitm.c` mhitm_ad_drin helmet / m_slips_free
(named from D-1298). Not eat_brains.
**C locus:** `uhitm.c` `m_slips_free` `:2053–2093`; `mhitm_ad_drin`
uhitm `:3204–3220` after headless `:3202`.
**Change:** port `m_slips_free`; headed path slip → helmet `rn2(8)`
→ eat_brains → lifsav skipdrin. Slip/helmet do not skipdrin.
mhitu+mhitm / AD_WRAP caller named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1660**.
**Verified:** canary **25**/25; green+strict seed8000/0900; cohort
**7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `objnam.c` candle `partly used`. Not MEAT_RING.
**Blocked:** none.
