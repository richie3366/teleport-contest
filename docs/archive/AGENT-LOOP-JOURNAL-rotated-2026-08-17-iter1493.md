# Rotated from AGENT-LOOP-JOURNAL.md after #1493 D-1175 youmonst m_everyturn_effect

## 2026-08-17 15:34 — #1478 D-1163 rloc_to minvent shop bill

**Objective:** Open — `teleport.c` `rloc_to` minvent shop bill
(named). Not shk-home.
**C locus:** `teleport.c` `rloc_to_core` 1742–1758; `shk.c`
`find_objowner` / `onshopbill` / `stolen_value` / `costly_spot`.
**Change:** after angry, dest `!costly_spot` walks minvent: clear
`no_charge` else `stolen_value` for `onshopbill`. Export
`onshopbill`; import `Norep` on stolen_value's angry arm. Did
not pull occupation `dochugw` / trapped `mintrap`. Filled D-1162
archive hash `38353d8a`. Rotated #1463. Open 11 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1475** **44**/44; next
@**#1480**).
**Verified:** private canary **44**/44 (billed debit; no_charge;
shop-to-shop; same-shop; ordinary unpaid; no minvent; same-cell;
corridor; shk-home; chain; no_charge-beats-bill; angry robbed;
flag; null; migrating; credit; two billed); green+strict
seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002. Path public-unhit on billed-minvent rloc
out of shop.
**Next:** Open `teleport.c` `rloc_to` trapped `mintrap` (named).
Not occupation.
**Blocked:** none.
