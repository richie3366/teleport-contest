# Rotated from AGENT-LOOP-JOURNAL.md after #1397 D-1098

## 2026-08-16 15:32 — #1382 D-1086 steal.c remove_worn_item armor *_off

**Objective:** Open queue — `steal.c` `remove_worn_item` armor
`*_off` / `unpunish` / `setnotworn` pointer-walk (named from sit
take_gold D-1049).
**C locus:** `steal.c` `remove_worn_item` (~213–290); `do_wear.c`
`Armor_off`/`Cloak_off`/`Boots_off`/`Gloves_off`/`Helmet_off`/
`Shield_off`/`Shirt_off`; `worn.c` `setnotworn`; `read.c` `unpunish`.
**Change:** steal.js export matches C dispatch (W_ARMOR `*_off`,
W_WEAPONS `*gone`, unchain → `unpunish`, leftover → `setnotworn`).
Exported `Armor_off`/`Shirt_off`. sit `take_gold` dynamic-imports
it. Filled D-1085 hash `3e1a74e8`. Rotated #1368 to archive.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1380** **44**/44; next
@**#1385**).
**Verified:** private canary 24/24 (fedora luck; DSM drain; five
other armor slots; stale quiver pointer-walk; live `*gone`/
`unweapon`; unpunish TRUE vs FALSE; take_gold quiver); green+strict
seed8000/0900; cohort **9**/9 (0106/0107/0108/4500/1500/1800/0017/
0360/2200) + sit strict.
**Next:** Open `sit.c` `rndcurse` `shieldeff`.
**Blocked:** none.
