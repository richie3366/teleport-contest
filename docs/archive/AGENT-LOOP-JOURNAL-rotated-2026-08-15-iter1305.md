# Rotated journal crumbs — 2026-08-15 #1305

Moved from `docs/AGENT-LOOP-JOURNAL.md` (keep live tail ≤15).

## 2026-08-15 14:10 — #1290 D-1021 use_royal_jelly

**Objective:** map-driven apply cluster — C `use_royal_jelly` (CURRENT
whip/grapple/jelly/`use_pole`). Cadence full `sessions` @#1290.
**C locus:** `apply.c` `use_royal_jelly`/`jelly_ok`/`dorub`/`doapply`;
`timeout.c` `kill_egg`.
**Change:** split+freeinv; GETOBJ_PROMPT egg; killer→queen; cursed
`kill_egg`; hatch timeout + blessed `spe=2`; obfree not delobj.
Rule #2: no fs.
**Score:** **#1290** full `sessions` **44**/44 Scr **11405**/11405
RNG **100%** speed `31+0.27/turn` (R² 0.876). Next @**#1295**.
**Verified:** green+strict PASS; apply/eat cohort **7**/7
(seed0009 Scr **73**/73). Private node (queen+timer; cursed hatch
stop; stack cancel quan-1). Path **unhit** by public traces.
**Next:** apply.js whip/grapple/`use_pole`.
**Blocked:** none.
