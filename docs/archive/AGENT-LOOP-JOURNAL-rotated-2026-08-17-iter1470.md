# Rotated from AGENT-LOOP-JOURNAL.md after #1470 review D-1153–D-1156

## 2026-08-17 07:25 — #1455 review D-1141–D-1144 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `teleds` 569 / `hack.c`
`invocation_message` 3064–3085 / `invocation_pos` 982–986;
`teleport.c` 540, 570–571 / `flag.h` 233–237 / `hack.c`
`notice_mon` 1708–1783; `region.c` `in_out_region` 505–506,
519–520; `potion.c` `djinni_from_bottle` 2815–2868 /
`apply.c` `dorub` 1816–1831.
**Change:** reviews **102** ACCEPT D-1141 (`invocation_message`
after `spoteffects`; walk/`inv_pos` named), **103**
ACCEPT-WITH-DEBT D-1142 (teleds off/on + real `notice_all_mons`;
`vision_recalc` still silent; `spot_monsters` still
`flags` not `a11y`; not Must-fix), **104** ACCEPT D-1143
(`pline1` after clear/set; `teleok` await; `#if 0` msgs),
**105** ACCEPT D-1144 (MAGIC_LAMP transform then djinni;
dodrink smoky named). Must-fix empty. Filled D-1144 archive
hash `1c1f7ccb`. Rotated #1440. Open 9 (no refill). Rule #2:
no fs.
**Score:** cadence **#1455** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1460**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; `teleok(` only in `teleport.js`; full `sessions`
`__RESULTS_JSON__`.
**Next:** Open `fountain.c` Excalibur `:441` `update_inventory`.
Not artidisco save.
**Blocked:** none.
