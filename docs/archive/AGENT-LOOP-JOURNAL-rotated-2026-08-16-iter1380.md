# Rotated from AGENT-LOOP-JOURNAL.md after #1380 review + cadence

## 2026-08-16 11:32 — #1366 D-1075 dosit lay_an_egg after throne

**Objective:** Open queue — `sit.c` `dosit` `lay_an_egg` at end of
function. Not hider / reach / ustuck. Review 35 named omit 1.
**C locus:** `sit.c` `lay_an_egg` (~357–396) / `dosit` (~559–560);
`mon.c` `egg_type_from_parent`.
**Change:** oviparous `#sit` returns `lay_an_egg()` instead of
having-fun. Male / hunger `<` 80 / dry tetra / Upolyd giant or
electric eel Sargasso → `ECMD_OK`. Else typed egg (`spe=1`,
`egg_type_from_parent(umonnum,FALSE)` in `mon.js`, `dropy` /
`stackobj` / `morehungry`). Did not pull `clone_mon` / wizard
getlin / `shieldeff`. Stamped review 35 **Addressed:** D-1075.
Rule #2: no fs. Rotated refill #1351 to archive.
**Verified:** private canary (male/hungry/tetra/Sargasso `ECMD_OK`;
pyrolisk egg parent+timed; queen→killer bee; human having-fun);
green+strict seed8000/0900; cohort seed1500/1800/0060/0102/0700/0017.
**Next:** Open `trap.c` hero pit/hole `dotrap` VIASITTING.
**Blocked:** none.
