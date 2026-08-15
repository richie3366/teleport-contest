# Rotated from AGENT-LOOP-JOURNAL.md after D-1021 / #1290

## 2026-07-22 05:49 — #1277 D-1006 mon_poly mon-defender

**Objective:** map-driven — mon_poly monster-defender + newcham
null-mdat (CURRENT next cluster).
**C locus:** `mhitm.c` mon_poly; `uhitm.c` mhitm_ad_poly; `mon.c`
newcham; `makemon.c` mbirth_limit; resists_magm / resist WAND_CLASS.
**Change:** port mon-defender resists/resist/shock/newcham/tele +
mspec_used; wire mdamagem AD_POLY; allow newcham(null) for ordinary
non-cham + Nazgul/Erinys mbirth_limit — D-1006.
**Verified:** green+strict PASS; poly/combat cohort **15**/16
(seed0009 Scr 72/73 pre-existing; seed0398 wandpoly PASS). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or saddle/whistle.
**Blocked:** none.
