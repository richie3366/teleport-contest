# Rotated from AGENT-LOOP-JOURNAL.md after #1469 D-1156 fumaroles whoosh

## 2026-08-17 07:12 — #1454 D-1144 djinni_from_bottle mongrantswish

**Objective:** Open queue — `potion.c` `djinni_from_bottle`
`mongrantswish` (named). Not bottle chance RNG.
**C locus:** `potion.c` `djinni_from_bottle` 2815–2868 / `mongrantswish`
2845; `apply.c` `dorub` MAGIC_LAMP 1816–1831.
**Change:** port makemon djinni, Blind cloud/smell, `rn2(5)` BUC remap,
wish `mongrantswish` / `tamedog` / peace / vanish `mongone` / hostile.
MAGIC_LAMP: unpaid + OIL_LAMP transform + `begin_burn` if lamplit then
djinni then `makeknown`/`update_inventory`. Did not wire dodrink smoky
occupant chance. SetVoice / full `mongone` named. Filled D-1143 archive
hash `bb8585ec`. Rotated #1439. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1450** **44**/44; next
@**#1455**).
**Verified:** private canary **33**/33; green+strict seed8000/0900;
cohort **24**/24 (0108 `#rub` lamp + 0105 lamp + 0006 demon + 0014
fountain + 0002 drinksink + 0007 snake + 2200/4500/0360/0030/0004/
0009/0012/1500/1800/0060/0116/0361/0367/0373/0383/5002/0106/0399)
+ strict 8000/0900/0108/0006/0014/0002/0105/2200/4500/0360/0030/0004.
Path public-unhit on djinni release.
**Next:** Open `fountain.c` Excalibur `:441` `update_inventory`.
Not artidisco save.
**Blocked:** none.
