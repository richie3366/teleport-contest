# Rotated from AGENT-LOOP-JOURNAL.md after review #1320

## 2026-08-15 21:05 — #1307 D-1041 thitmonst weapon hit-vs-miss

**Objective:** Must-fix D-1022 risk 4 — pole `thitmonst` hit-vs-miss
envelope (combat RNG), not always-`tmiss`.
**C locus:** `dothrow.c` `thitmonst` tmp+dieroll WEAPON/weptool/GEM;
`uhitm.c` `hmon_hitmon_msg_hit` thrown/APPLIED + `first_weapon_hit`.
**Change:** C to-hit (Luck/DEX/`distmin`/`omon_adj` `!rn2(10)`);
kicked/ammo/thrown/applied bonuses; hit `hmon`+`exercise`+mulch+
`passive_obj`; miss `tmiss` + APPLIED `wakeup`. Thrown hit pline.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; throw/kick/combat cohort **10**/10
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick). Private
node **10**/10 (AC hit/miss; APPLIED wakeup; frozen `rn2(10)` before
dieroll; pie DEX; armor skip; hook weptool). Path **unhit** by public
traces.
**Next:** Must-fix whip/pole/grapple `yname`/`Amonnam`/`mbodypart`
(D-1022 risk 5).
**Blocked:** none.

## 2026-08-15 20:50 — #1306 D-1040 pole glyph_at targeting

**Objective:** Must-fix D-1022 risk 3 — `glyph_is_poleable_at` /
`find_poleable_mon` follow C `glyph_at`, not live `m_at`.
**C locus:** `apply.c` find_poleable_mon / get_valid_polearm_position /
use_pole; `display.c` glyph_at; `display.h` glyph_is_monster/statue/
invisible.
**Change:** classify shown layer (monster glyph / I / statue glyph);
skip tame/peaceful only when `glyph_is_monster` && `m_at`; statue/
boulder hit = glyph_at && sobj_at. `map_object` tags statue/boulder
memory. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; apply/combat/display cohort **10**/10
(seed0361 Scr **366**/366; seed0399 Scr **532**/532). Private node
**12**/12 (hidden `m_at`; `I`; tame skip; peaceful `I`; statue not
autotarget). Path **unhit** by public traces.
**Next:** Must-fix pole `thitmonst` hit-vs-miss (D-1022 risk 4).
**Blocked:** none.
