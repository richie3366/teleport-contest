# Rotated from AGENT-LOOP-JOURNAL.md after #1484 D-1168 moveloop fumaroles

## 2026-08-17 13:05 — #1469 D-1156 fumaroles clear_heros_fault / Norep whoosh

**Objective:** Open — `mklev.c` `fumaroles` `clear_heros_fault` /
Norep whoosh (named). Not expire dissipation.
**C locus:** `mkmaze.c` `fumaroles` 1484–1514; `region.h`
`clear_heros_fault`; `do.c` `goto_level` 1833–1834.
**Change:** after lava `create_gas_cloud`, `clear_heros_fault` so
natural steam is not the hero's. `snd`/`loud` (`distu<15`); `!Deaf`
Norep whoosh / loud whoosh. Exported `clear_heros_fault`. Did not
pull allmain moveloop caller, selection create, or walk
`in_out_region`. Filled D-1155 archive hash `df99ab32`. Rotated
#1454. Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1465** **44**/44; next
@**#1470**).
**Verified:** private canary **36**/36 (src order; bit; player-made
then clear; fire+hot REG_NOT_HEROS + template; Deaf/EDeaf/uroleplay
silent; no lava / !flag; far not-loud; close loud; sticky;
in_mklev; temp0 nmax=0); green+strict seed8000/0900; cohort
**14**/14 (0373 fire + 0002 drinksink + 0014 fountain + 0361/0383
fog + 0360/2200/0004/0006/0012/1500/1800/0030/0108) + strict
8000/0900/0373/0002/0014/0361/0383/0360/2200/0030/0004/0006 +
0012 alone. Path public-unhit on whoosh.
**Next:** Open `hack.c` walk `in_out_region` (named). Not teleds.
**Blocked:** none.
