# Rotated from AGENT-LOOP-JOURNAL.md after #1401 D-1101

## 2026-08-16 16:50 — #1386 D-1089 rndcurse Antimagic via uprops

**Objective:** Must-fix from review **48** — `sit.c` `rndcurse`
`Antimagic()` via `uprops[ANTIMAGIC]` (invent.js `hero_Antimagic`
shape). Not `is_pool`. Not `update_inventory` / hcolor.
**C locus:** `youprop.h` Antimagic 55–57; `sit.c` `rndcurse`
581–593; confer `oc_oprop` ANTIMAGIC (cloak / gray DSM).
**Change:** sit `Antimagic()` ORs flats **and**
`uprops[ANTIMAGIC]` intrinsic/extrinsic. Did not rewrite
`confer_oc_oprop` or other `Antimagic()` clones. Stamped review
**48** **Addressed:** D-1089. Rotated #1372 to archive. Open 9
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1385** **44**/44; next
@**#1390**).
**Verified:** private canary **21**/21 (`setworn` cloak W_ARMC
extrinsic, `EAntimagic` unset, 21 frames + `rnd(3)`; no-cloak 0
+ `rnd(6)`; gray DSM; cloak+Half `rnd(2)`; `HAntimagic`);
green+strict seed8000/0900; cohort **9**/9
(0106/0107/0108/4500/1500/1800/0017/0360/2200) + sit strict.
Path public-unhit for worn-cloak `rndcurse`.
**Next:** Open `dbridge.c` `is_pool` / `is_moat` DRAWBRIDGE_UP +
`DB_MOAT`. Audit @**#1390**.
**Blocked:** none.
