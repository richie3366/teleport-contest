## 2026-07-22 03:28 — #1258 D-0988 kick_object + bhit KICKED

**Objective:** map-driven — `kick_object` + `bhit` KICKED_WEAPON
(CURRENT next cluster after D-0987 flooreffects).
**C locus:** `dokick.c` kick_object/really_kick_object; `zap.c` bhit
KICKED_WEAPON.
**Changed:** kick envelope + bhit kicked flight/land; export
thitmonst / costly_adjacent — D-0988. Deferred: box lock/trap;
ghitm; costly_gold; hits_bars; petrify barefoot; tmp_at flash.
**Verified:** green+strict PASS; kick cohort **19**/20 (seed0009 Scr
72/73 pre-existing); seed0060 kick-search PASS. Rule #2: no fs.
**Next:** Is_box kick arms / ghitm / hits_bars; or flooreffects
fire_damage/globby; or absent.md thin (potion/scroll/vault).
**Blocked:** none.
## 2026-07-22 03:20 — #1257 D-0987 flooreffects

**Objective:** map-driven — `flooreffects` pit/shaft/pool/lava
(CURRENT next cluster; kick_object prerequisite).
**C locus:** `do.c` flooreffects / boulder_hits_pool; `trap.c`
lava_damage / uteetering_at_seen_pit / uescaped_shaft.
**Changed:** flooreffects core + boulder_hits_pool; wire dropz /
throwit Splash+flooreffects / drop_throw — D-0987. Deferred:
fire_damage; globby/altar/hot potion; kick_object+bhit KICKED_WEAPON.
**Verified:** green+strict PASS; drop/throw cohort **20**/21
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** kick_object + bhit KICKED_WEAPON; or absent.md thin.
**Blocked:** none.
