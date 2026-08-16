# Rotated from AGENT-LOOP-JOURNAL.md after #1388 D-1091 goodpos is_pool/is_lava

## 2026-08-16 13:25 — #1373 D-1079 peace_minded/set_malign ptr.msound

**Objective:** Open queue — `makemon.c` `peace_minded` / `set_malign`
read `ptr.msound` (`msounds[]` exists, D-1053).
**C locus:** `makemon.c` `peace_minded` 2268–2308; `set_malign`
2321–2366; `monflag.h` MS_LEADER=36 / NEMESIS=37 / GUARDIAN=38.
**Change:** `peace_minded` returns true for LEADER/GUARDIAN and
false for NEMESIS after always_* before PM_ERINYS. `set_malign`
MS_LEADER −20 before A_NONE / always_peaceful. Did not pull
`m_initweap` mndx gates. Filled D-1078 Addressed hash `c7dcd80a`.
Rotated #1358 to archive. Refilled Open to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1370** **44**/44; next
@**#1375**).
**Verified:** private canary (Twoflower 36 malign −20; synth
LEADER/GUARDIAN no `rn2`; Erinys D-0905); green+strict
seed8000/0900; cohort **18**/18 (incl. 0361/0367/0373 quest) +
strict 0014/4500/0360/0361/0367/0373/2200. Kill-malign public-unhit.
**Next:** Open `shk.c` `u_entered_shop` deserted / angry / Invis /
pickaxe doorway. Audit @**#1375**.
**Blocked:** none.
