# Rotated from AGENT-LOOP-JOURNAL.md after #1507 D-1186 g PREFIXCMD

## 2026-08-17 19:57 — #1492 D-1174 mdisplacem update_monster_region

**Objective:** Open — `mhitm.c` `mdisplacem` `update_monster_region`
(named). Not rloc_to.
**C locus:** `mhitm.c` `mdisplacem` 178–267 / region 256–257;
callee `region.c` 598–611; caller `monmove.c` `m_move` 2025–2037.
**Change:** port `mdisplacem` (sanity, `rn2(7)`, grid-bug, unhide,
wake, petrify, swap); after both `place_monster` and defender
worm tail, `update_monster_region` each. Wire ALLOW_MDISP return
bits. Keep `should_displace` false. Did not pull dogmove caller
or dbridge. Filled D-1173 archive hash `e07eeae7`. Rotated #1477.
Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1490** **44**/44; next
@**#1495**).
**Verified:** private canary **46**/46 (C/JS tail-before-region;
sanity no rng; 1-in-7 miss; swap enter/leave/stay; attach_2_m;
unhide/wake/meating/seemimic; grid-bug diagonal vs cardinal;
petrify died/gloves/golem-poly/`resists_ston`; thenable; m_move
caller bits; no fs/FORCE); green+strict seed8000/0900; cohort
**43**/43 (CURRENT shared + 0014/0383/4500/2600 + green) + strict
0101/0012/0360/4500/2200/0014/0004/0103/0104/0367/0373/0002/0700/
0015/0116/0106. Path public-unhit while `should_displace` is false.
**Next:** Open `allmain.c` `m_everyturn_effect` youmonst (named).
Not m_postmove_effect.
**Blocked:** none.
