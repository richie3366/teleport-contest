# Rotated from AGENT-LOOP-JOURNAL.md after #1536 D-1209 dotelecmd m-prefix

## 2026-08-18 04:35 — #1521 D-1197 scrolltele W-tower Override yn

**Objective:** Open — `teleport.c` `scrolltele` W-tower Override yn
(named). Not make_blinded.
**C locus:** `teleport.c` `scrolltele` 865–870 after make_blinded.
`y_n` ≡ `yn_function(..., ynchars, 'n', TRUE)`. `On_W_tower_level`
wiz1/2/3. Callers `tele()` / `seffects` SCR_TELEPORTATION.
**Change:** gate is `amulet || On_W_tower_level` then `!rn2(3)`
`You_feel`; `!wizard || yn_function('Override?') !== 'y'` return
(no learnscroll). `!wizard` short-circuits yn. Did not pull
unconscious or steed whobuf. Filled no prior missing archive
hash. Rotated #1506. Open 7 after archive; refilled to 12.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1520** **44**/44; next
@**#1525**).
**Verified:** private canary **44**/44; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004.
**Next:** Open `dog.c` `migrate_to_level` `In_W_tower` xyflags
bit 2 (named). Not mon_arrive.
**Blocked:** none.
