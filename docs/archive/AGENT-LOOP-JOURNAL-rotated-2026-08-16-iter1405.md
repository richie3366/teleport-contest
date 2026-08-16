# Rotated from AGENT-LOOP-JOURNAL.md after #1405 review D-1101–D-1104

## 2026-08-16 17:30 — #1390 review D-1089–D-1092 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `youprop.h` Antimagic 55–57 / `sit.c` `rndcurse`
576–593; `dbridge.c` `is_pool` 46–58 / `is_moat` 100–113;
`teleport.c` `goodpos` 134–175; `makemon.c` mlet 1335–1342 /
`you.h` `Race_if` / `mondata.h` `is_unicorn`.
**Change:** reviews **50** ACCEPT D-1089 (sit `Antimagic()`
uprops), **51** ACCEPT D-1090 (`is_pool`/`is_moat` UP+`DB_MOAT`),
**52** ACCEPT D-1091 (`goodpos` `is_pool()`/`is_lava()`),
**53** ACCEPT D-1092 (S_ORC/S_UNICORN mlet). Must-fix empty.
Filled D-1092 archive hash `c3f28bfd`. Inserted missing
D-1091 index row. Rotated #1375. Open 11 (no refill). Rule #2:
no fs.
**Score:** cadence **#1390** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1395**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `dogmove.c` pal/target numeric `ptr.msound` not
`'MS_LEADER'`.
**Blocked:** none.
