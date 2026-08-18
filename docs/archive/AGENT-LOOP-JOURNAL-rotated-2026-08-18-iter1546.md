# Rotated from AGENT-LOOP-JOURNAL.md after #1546 D-1217 dolookaround

## 2026-08-18 06:48 — #1531 D-1205 scrolltele unconscious

**Objective:** Open — `teleport.c` `scrolltele` unconscious (named).
Not Override yn.
**C locus:** `teleport.c` `scrolltele` 874–876 / `trap.c`
`unconscious` 6776–6786 after Override before steed whobuf.
**Change:** local `unconscious()` clone; fail pline then
fall through `learnscroll`+`safe_teleds` (no getpos). Did not
pull steed whobuf. D-1204 archive already `dbd3a08b`. Rotated
#1516. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1530** **44**/44; next
@**#1535**).
**Verified:** private canary **37**/37; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004. Public-unhit unless controlled teleport
while `multi<0` sleep or a matching wake `nomovemsg`.
**Next:** Open `teleport.c` `scrolltele` steed whobuf (named).
Not unconscious.
**Blocked:** none.
