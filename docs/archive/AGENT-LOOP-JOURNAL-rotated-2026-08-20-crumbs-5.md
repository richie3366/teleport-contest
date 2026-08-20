# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-20 — D-1287 stairs.c u_on_sstairs → u_on_rndspot

**Objective:** Open `stairs.c` `u_on_sstairs` → `u_on_rndspot`
(named from D-1278). Not cmd wiz.
**C locus:** `stairs.c` `u_on_sstairs` `:111–120`;
`u_on_upstairs` `:125–132`; `u_on_dnstairs` `:137–144`.
Callers `do.c` `goto_level` newdungeon; `allmain.c` newgame.
**Change:** missing special stairs call live `u_on_rndspot(upflag)`
(updest/dndest + `switch_terrain`). upstairs/dnstairs wrappers;
`goto_level` awaits; special-dir C boolean `!=`. Named: cmd wiz;
`On_W_tower_level`; W-tower bit 2. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless arrival via missing
sstairs with leftover Lev/Fly FROMOUTSIDE. Next audit @**#1635**.
**Verified:** private canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `cmd.c` wiz-level `u_on_rndspot` (named from
D-1278). Not sstairs.
**Blocked:** none.

## 2026-08-20 — #1630 review D-1283–D-1286 + cadence

**Objective:** audit — C-fidelity reviews **245–248** of JS SHAs
since `ad42d04e`, plus full `sessions` score. No `js/` port.
**C locus:** `dothrow.c` swallowit; `mon.c` `meatobj`; `mon.c`
`meatcorpse`; `mhitu.c` `missmu` `pline_mon`.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: throw_gold swallow/slip; meatbox/poly;
`mon_would_consume_item`; wildmiss `set_msg_xy`). Filled D-1286
archive hash `9486280d`. Open 10 (no refill). Rule #2: no fs.
**Score:** cadence **#1630** HEAD `9486280d` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.85). seed0383 PASS. Next audit @**#1635**.
**Verified:** `__RESULTS_JSON__` at HEAD `9486280d`; branch-by-branch
vs pinned C (uswallow before `u.dz` + live `mpickobj`; cube
engulf/devour; corpse_eater one CORPSE; missmu both arms
`pline_mon`).
**Next:** Open `stairs.c` `u_on_sstairs` → `u_on_rndspot` (named
from D-1278). Not cmd wiz.
**Blocked:** none.

## 2026-08-20 — D-1286 mhitu.c missmu pline_mon

**Objective:** Open `mhitu.c` `missmu` `pline_mon` (named from
D-1261). Not wildmiss.
**C locus:** `mhitu.c` `missmu` `:83–99`; callee `pline.c`
`pline_mon` `:137–150`. Callers `mattacku` melee/ENGL/WEAP miss.
**Change:** seduce pretend + `"just "` miss both `pline_mon` so
`a11y.msg_loc` is mx,my. `map_invisible` / `stop_occupation` /
hitmsg_mid clear unchanged. Named: wildmiss C `set_msg_xy` then
`pline`; mswings; AT_ENGL gulps/lunges. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless `accessiblemsg` On.
Next audit @**#1630**.
**Verified:** private canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `stairs.c` `u_on_sstairs` → `u_on_rndspot` (named
from D-1278). Not cmd wiz.
**Blocked:** none.

## 2026-08-20 — D-1285 mon.c meatcorpse

**Objective:** Open `mon.c` `meatcorpse` (named from D-1271). Not
meatobj.
**C locus:** `mon.c` `meatcorpse` `:1653–1722`; caller `monmove.c`
`postmov` `:1674–1678` (`corpse_eater`); `mondata.h` `:243–247`.
**Change:** non-pet corpse_eater `sobj_at(CORPSE)` skips vegan /
petrify; rider `revive_corpse`; `splitobj` quan>1; devour
`m_consume_obj` (masticating). Return 2 if data gone. Named:
`mon_would_consume_item`; consume meatbox/poly/uball. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a corpse_eater
`postmov`s onto a CORPSE. Next audit @**#1630**.
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` `missmu` `pline_mon` (named from D-1261).
Not wildmiss.
**Blocked:** none.

## 2026-08-20 — D-1284 mon.c meatobj

**Objective:** Open `mon.c` `meatobj` (named from D-1271). Not
meatcorpse.
**C locus:** `mon.c` `meatobj` `:1531–1648`; caller `monmove.c`
`postmov` `:1669–1672` (`PM_GELATINOUS_CUBE`).
**Change:** non-pet cube prize-skips; rider `revive_corpse`;
rock/ball/scare/petrify-corpse continue; else engulf `mpickobj` or
devour `m_consume_obj` (YUM YUM). Return 2 if data gone. Named:
meatcorpse; consume meatbox/poly/uball. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a cube `postmov`s
onto a floor pile. Next audit @**#1630**.
**Verified:** private canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mon.c` `meatcorpse` (named from D-1271). Not meatobj.
**Blocked:** none.

## 2026-08-20 — D-1283 dothrow.c throwit swallowit

**Objective:** Open `dothrow.c` throwit swallowit (named from
D-1274). Not returning_missile.
**C locus:** `dothrow.c` `swallowit` `:1468–1475`; `throwit`
`:1569–1578` before `u.dz`; `:1704–1706`; fail-path `:1751/:1772`.
**Change:** swallowed throw skips `u.dz`/bhit; `thitmonst(ustuck)`
then `mpickobj`; AutoReturn fail-catch / fail-to-return swallowit
not dropy/land. `mpickobj` clears `thrownobj`. Named: slip;
stamina; steed; boomhit; throw_gold swallow; vanish pline.
Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a session throws
while swallowed. Next audit @**#1630**.
**Verified:** private canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mon.c` `meatobj` (named from D-1271). Not meatcorpse.
**Blocked:** none.
