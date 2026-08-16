# Rotated from AGENT-LOOP-JOURNAL.md after #1407 D-1106 dryup cloud-glyph skip

## 2026-08-16 18:00 — #1392 D-1094 MS_NEMESIS mitem ptr.msound

**Objective:** Open queue — `makemon.c` `m_initweap` MS_NEMESIS
mitem `ptr.msound` not `urole.neminum` (named). Not S_ORC peace.
**C locus:** `role.c` `role_init` 2027–2061; `makemon.c` mitem
1378; gender/leader_m_id `ptr->msound && quest_info`.
**Change:** `role_init_quest_pm_fixup` overlays live `mons[]`
msound/flags/maligntyp on `game.pm_fixup` (`resetGame` = fresh
C process). mitem / leader_m_id / gender use `ptr.msound`.
Did not pull PM_NINJA weap or `mon_learns_traps(ALL_TRAPS)`.
Stamped reviews **14**/**49**/**53**. Filled D-1093 hash
`e0b68f1d`. Rotated #1377. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1390** **44**/44; next
@**#1395**).
**Verified:** private canary **30**/30 (Tourist thief 37 hostile
Bell; reset 36; Rogue thief leader / assassin Bell; Arc
Carnarvon maligntyp 3); green+strict seed8000/0900; cohort
**20**/20 + strict 1800/0361/0367/0360/0014/2200/0004. Path
public-unhit (Tourist quest nemesis).
**Next:** Open `potion.c` `split_mon` trap rust / `minliquid` /
uhitm AD_COLD.
**Blocked:** none.
