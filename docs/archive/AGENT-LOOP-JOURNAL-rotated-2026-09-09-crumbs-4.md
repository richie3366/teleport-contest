# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-09 — Audit 0b6f3f56..58d11e0f (reviews 1138-1145: 8 ACCEPT, 0 Must-fix) + cadence 44/44

**Scope:** 8 js-touching SHAs since 1137 (D-2172..D-2179); 71c6e030 (queue stamp) + 2dcdffa1 (park) docs-only, skipped. Each re-measured against pinned C with hidden-proxy verify --base: every D-log corpus claim reproduced exactly (1139's Knight-92034 now fully PASS at HEAD, better than logged; 1140's Monk residual moved 79→121 via D-2175, as logged).
**Debts/notes:** 1138 `want !== 0` guard (unreachable, all roles have questarti); 1145 parked gnostic fix not re-applied (park falsifier owns it). No Must-fix prepended; Next cluster advances to Open head (`pager.c` lookat).
**Cadence:** full `sessions` 44/44, Scr 11405/11405, RNG 792838/792838, speed `60+0.36/turn` (R² 0.79).

## 2026-09-09 — D-2179 `detect.c` find_trap: clutter check must read memory `levl[][].glyph`, not gbuf `glyph_at` (Priest-92096 step 75→149)

**C locus:** `detect.c find_trap :1936–1962` (`tseen=1`, `exercise(A_WIS)`, `feel_newsym`, then `if (Hallucination || levl[tx][ty].glyph != trap_to_glyph)` → `cls(); map_trap(trap,1); display_self(); cleared=TRUE`, `set_msg_xy`, `You("find %s.")`, `if (cleared) { display_nhwindow(WIN_MAP,TRUE); docrt(); }`) + `display.c feel_newsym/newsym/_map_location/map_trap` (memory is `levl[][].glyph`; `_map_location(x,y,show=FALSE)` under a monster still stores the trap via `map_trap(trap,0)` while gbuf shows the monster) + `wintty.c tty_display_nhwindow` NHW_MAP blocking (`end_glyphout`, topline non-empty → NEED_MORE, message wait — the `--More--`).
**JS:** `js/detect.js` only (+10/−3 in `find_trap` + comment), under the 600/10 caps. Rule #2 clean.
**Change:** `js/detect.js find_trap` now reads the memory glyph — `(game.level.at(tx,ty).remembered_glyph.glyph|0)` defaulting to `NO_GLYPH` when absent (matches C mismatch for unseen/no-memory cells; `map_*` skip the store when `hero_memory` is off on both sides) — and compares it to `tgid`. Comment cites the C memory-vs-gbuf distinction and the monster-cover case. No new module edge (`game`, `NO_GLYPH` already imported; `glyph_at` stays imported — still used at :1547/:1581/:1597/:2181).
**Verify:** `node scripts/verify.mjs --fn find_trap` → PASS syntax (1 changed js file: js/detect.js) · PASS rule2 · PASS hidden: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS (scen-intrinsic-Priest-92096: moved → doturn at step 149, was 75) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed). VERIFY: PASS. Post-fix replay: JS step-75 screen keeps the room (`┌───┐`, `│@^·│`, `│·f·│`) under the identical `--More--` topline.
**Named:** none new. `do_mapping` browse_map/`map_redisplay` partial (the `^F` gap) stays named in `turns.md:129–226`; `mthrowu.c monshoot` drift stays map debt (D-2037).
**Next:** row addressed; residual doturn@149 («You are not able to call upon Raijin…» More) is the parked `pray.c doturn` row (stale owner; genuine `uconduct.gnostic` fix + proof in that park entry — re-apply once its map precondition holds). Do not re-pop `find_trap` for Priest-92096.

## 2026-09-09 — D-2178 `muse.c` you_aggravate: WIN_MAP blocking needs more(), not flush+nhgetch (Wizard-92048 step 88→113)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-09-09 — D-2177 `polyself.c` polyself: non-force controllable getlin was a named omission, so poly-control + POLY_NOFLAGS went random (Ranger-92133 PASS)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-09-09 — D-2176 `engrave.c` doengrave mix-up predicates: local `Blind()` missed timed `HBlinded`, skipping every `rn2(11)` (Samurai-92071 PASS)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-09-09 — D-2175 `mcastu.c` castmu fumble arm: JS burned the fumble `rn2(ml*10)` but skipped the air-crackles pline, losing the `--More--` (Monk-92013 step 79→121)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
