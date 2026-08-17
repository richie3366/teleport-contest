# Rotated from AGENT-LOOP-JOURNAL.md after #1487 D-1170 rloc_to occupation dochugw

## 2026-08-17 13:55 — #1472 D-1158 create_gas_cloud_selection

**Objective:** Open — `region.c` `create_gas_cloud_selection`
(named). Not BFS create.
**C locus:** `region.c` `create_gas_cloud_selection` 1311–1336;
`sp_lev.c` `lspo_gas_cloud` 4928–4965; `themerms.lua` Cloud
room 61–69.
**Change:** bitmap 1×1 rects then `make_gas_cloud`; ttl stays −1
(no Fisher-Yates / no `rn1`). `lspo_gas_cloud` xy/`coord` →
size-1 BFS else selection; `ttl > -2` overwrite. Cloud fill:
`selection.room()` + `floor(n/4)` asleep fog + `des.gas_cloud`.
Did not pull Ice/Boulder/… fills or mfndpos `m_poisongas_ok`.
Filled D-1157 archive hash `ed28eef1`. Rotated #1457. Open 11
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1470** **44**/44; next
@**#1475**).
**Verified:** private canary **41**/41; green+strict seed8000/0900;
cohort **39**/39 (CURRENT shared + 0014/0383). Path public-unhit
on Cloud fill (reservoir pick already burned).
**Next:** Open `mon.c` `m_poisongas_ok` mfndpos vamp/eel/breath
(named). Not inside_f. Audit @**#1475**.
**Blocked:** none.
