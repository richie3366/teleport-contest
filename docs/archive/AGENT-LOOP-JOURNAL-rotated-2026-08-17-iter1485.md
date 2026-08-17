# Rotated from AGENT-LOOP-JOURNAL.md after #1485 review D-1165–D-1168 + cadence

## 2026-08-17 13:20 — #1470 review D-1153–D-1156 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `vault_tele` 772–783 / `tele` 841–845;
`mkmaze.c` `pick_vibrasquare_location` 1042–1093 /
`sp_lev.c` `create_trap` VS 1818–1821 / `hellfill.lua` 437–441 /
`mklev.c` `occupied` 1806–1811; `region.c` `expire_gas_cloud`
1046–1087 / `run_regions` 419–473; `mkmaze.c` `fumaroles`
1484–1514 / `region.h` `clear_heros_fault`.
**Change:** reviews **114** ACCEPT D-1153 (`tele()` else after
vault `teleds`; `dotele` teledest named), **115** ACCEPT D-1154
(hellfill picker + VS `maketrap`; `makemaz("")` named),
**116** ACCEPT D-1155 (thin around-you / You_see; thick half+ttl=2),
**117** ACCEPT D-1156 (`clear_heros_fault` + Norep whoosh;
moveloop named). Must-fix empty. Filled D-1156 archive hash
`16e8d88b`. Rotated #1455. Open 8 (no refill). Rule #2: no fs.
**Score:** cadence **#1470** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1475**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `hack.c` walk `in_out_region` (named). Not teleds.
**Blocked:** none.
