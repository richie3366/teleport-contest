# Rotated from AGENT-LOOP-JOURNAL.md after #1477 D-1162 rloc_to make_angry_shk

## 2026-08-17 09:22 — #1462 D-1150 domove walk invocation_message

**Objective:** Open — `hack.c` `domove` `invocation_message` (named).
Not teleds.
**C locus:** `hack.c` `domove` 2964–2973; callee
`invocation_message` 3064–3085 / `invocation_pos` 982–986.
**Change:** after `vision_recalc(1)`, await `invocation_message`
when `ux0!=ux||uy0!=uy`. Callee already D-1141. Did not place
`mkmaze.c` `inv_pos`, share `dungeon.c` `Invocation_lev`, or fold
apply.js clone. Filled review **109** D-1149 hash `cdaccd3a`.
Rotated #1447. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1460** **44**/44; next
@**#1465**).
**Verified:** private canary **19**/19 (walk onto inv_pos feet +
nomul; off-square; On_stairs; not Invocation_lev; unset inv_pos;
Lev/Fly/blocked-Lev; steed; spe==7 glow; Blind throb; walk away;
STONE; diagonal); green+strict seed8000/0900; cohort **23**/23
(0012 vault + 0004 pony + 0002/0006/0007/0009/0014/0017/0030/
0060/0102/0106/0108/0116/0360/0367/0373/0383/0700/1500/1800/
2200/4500) + isolated strict 0014/0012/0360/4500/2200/0030/
0004/0002/0006/0367. Path public-unhit on Invocation_lev.
**Next:** Open `hack.c` `classify_terrain` (named from
switch_terrain). Not invocation. Audit @**#1465**.
**Blocked:** none.
