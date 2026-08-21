# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
