# Rotated from AGENT-LOOP-JOURNAL.md after #1488 D-1171 rloc_pos_ok room lock

## 2026-08-17 14:11 — #1473 D-1159 mfndpos m_poisongas_ok vamp/eel/breath

**Objective:** Open — `mon.c` `m_poisongas_ok` mfndpos vamp/eel/breath
(named). Not inside_f.
**C locus:** `mon.c` `m_poisongas_ok` 330–357; `mfndpos` 2172/2240.
**Change:** port C order in `js/mon.js`: vampshifter / Hezrou|Vrock
/ eel-or-waterlevel+pool / AT_BREA AD_DRST|RBRE → OK; youmonst
invuln/Breathless/Underwater → OK; resist → MINOR; else BAD.
mfndpos still `=== OK`. region.js keeps a local clone. Did not
pull Resists_Elem worn/artifact or `rloc_to` `set_apparxy`.
Filled D-1158 archive hash `7cc347fc`. Rotated #1458. Open 10
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1470** **44**/44; next
@**#1475**).
**Verified:** private canary **32**/32; green+strict seed8000/0900;
cohort **39**/39 (CURRENT shared + 0014/0383). Path public-unhit
on vamp/eel/breath walking into poisoncloud.
**Next:** Open `teleport.c` `rloc_to` `set_apparxy` (named). Not
vanish-msg. Audit @**#1475**.
**Blocked:** none.
