# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-21 — D-1321 objnam.c doname W_WEP body_part(HAND) poly

**Objective:** Open `objnam.c` doname W_WEP `body_part(HAND)` poly
(named from D-1295). Not MEAT_RING.
**C locus:** `objnam.c` `doname_base` W_WEP `:1578–1595`
`body_part(HAND)` + bimanual `makeplural` / URIGHTY ConcatF2;
SWAPWEP `:1616`; RING `:1499`. `polyself.c` `body_part`.
**Change:** late-bind `set_body_part`; wielded/swap/ring use form
noun (`paw`/`hands`). AKLYS tether / warn_obj / `mrg_to_wielded`
named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1675**.
**Verified:** canary **28**/28; green+strict seed8000/0900; cohort
**8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361.
Filled D-1320 archive hash `cf309315`.
**Next:** Open `zap.c` bhit THROWN_TETHERED_WEAPON / isqrt (named
from D-1311). Not throwit tether.
**Blocked:** none.
## 2026-08-20 — D-1320 objnam.c doname POTION POT_OIL (lit)

**Objective:** Open `objnam.c` doname POTION POT_OIL (lit) (named from
D-1308). Not candle.
**C locus:** `objnam.c` `doname_base` POTION `:1488–1491` after TOOL
charges before RING; `otyp==POT_OIL && lamplit` Concat `" (lit)"`.
**Change:** suffix on lit oil; no known gate; xname bare; W_WEP after.
`mksobj` `MAX_OIL_IN_FLASK` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1675**.
**Verified:** canary **33**/33; green+strict seed8000/0900; cohort
**8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361.
Filled D-1319 archive hash `cd867647`.
**Next:** Open `objnam.c` doname W_WEP `body_part(HAND)` poly (named
from D-1295). Not MEAT_RING.
**Blocked:** none.
## 2026-08-20 — D-1319 objnam.c doname LEASH attached

**Objective:** Open `objnam.c` doname LEASH attached (named from
D-1308). Not candle.
**C locus:** `objnam.c` `doname_base` TOOL `:1431–1445` after worn
before candelabrum; `light.c` `find_mid` FM_FMON skip DEADMONSTER;
`do_name.c` `noit_mon_nam`.
**Change:** `" (attached to %s)"` for live fmon; missing/dead
clears `leashmon`; worn skip; xname bare. `impossible` pline
named (doname sync). POT_OIL `(lit)` named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit
@**#1675**.
**Verified:** canary **30**/30; green+strict seed8000/0900; cohort
**8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361.
**Next:** Open `objnam.c` doname POTION POT_OIL (lit) (named from
D-1308). Not candle.
**Blocked:** none.
## 2026-08-20 — #1670 review D-1315–D-1318 + cadence

**Objective:** audit — C-fidelity reviews **277–280** of JS SHAs
since `e176215d`, plus full `sessions` score. No `js/` port.
**C locus:** `dothrow.c` throwit → `throwit_mon_hit`; throwit
ACURRSTR urange; `objnam.c` doname CANDELABRUM; TOOL worn.
**Change:** four reviews ACCEPT-WITH-DEBT. **275** caller miss is
wired (D-1315). No Must-fix. Filled D-1318 archive hash
`ccdc8670`. Cadence **44**/44 Scr **11,405**/11,405 RNG
**792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85) at
`ccdc8670`. Rule #2: no fs.
**Score:** fortress held. Next audit @**#1675**.
**Verified:** `node frozen/ps_test_runner.mjs sessions` (this iter).
**Next:** Open `objnam.c` doname LEASH attached (named from D-1308).
Not candle.
**Blocked:** none.
## 2026-08-20 — D-1318 objnam.c doname TOOL W_TOOL|W_SADDLE worn

**Objective:** Open `objnam.c` doname TOOL W_TOOL|W_SADDLE worn (named
from D-1308). Not candle.
**C locus:** `objnam.c` `doname_base` TOOL `:1427–1429` first arm.
**Change:** `" (being worn)"` then break before leash / candelabrum /
lamp / charges. xname stays bare. Leash / POT_OIL `(lit)` named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1670**.
**Verified:** canary **27**/27; green+strict seed8000/0900; cohort
**8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361.
Filled D-1317 archive hash `9b1b4ba4`.
**Next:** Open `objnam.c` doname LEASH attached (named from D-1308).
Not candle.
**Blocked:** none.
## 2026-08-20 — D-1317 objnam.c doname CANDELABRUM (n of 7)

**Objective:** Open `objnam.c` doname CANDELABRUM (n of 7) (named from
D-1308). Not candle.
**C locus:** `objnam.c` `doname_base` TOOL `:1447–1454` after worn/leash
before lamp/candle.
**Change:** `" (n of 7 candle%s)"` with `plur(spe)` + unlit
`" attached"` / lit `", lit"`; break before lamp `(lit)` / charges.
xname stays bare. Leash / W_TOOL worn / POT_OIL `(lit)` named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit). Next audit @**#1670**.
**Verified:** canary **32**/32; green+strict seed8000/0900; cohort
**8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361.
Filled D-1316 archive hash `75c08164`.
**Next:** Open `objnam.c` doname TOOL W_TOOL|W_SADDLE worn (named from
D-1308). Not candle.
**Blocked:** none.
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
