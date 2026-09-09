# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-09-09 — D-2174 `uhitm.c` mhitm_ad_ench mhitu arm: JS skipped the non-verbose MC gate (and hitmsg) before knockback (Knight-92034 PASS; Monk-92013 residual is More-only)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-09 — D-2173 `steed.c` put_saddle_on_mon: local pick_saddle linked minvent without where/ocarry, hanging relobj_on_death on the first saddled-mon death (2 js-throw sessions move to later owners)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-09 — D-2172 `objnam.c` readobjnam wishing-abuse deny arm: quest artifacts skip the `rn2(nartifact_exist())` roll in C (`||` short-circuit), JS rolled unconditionally (Rogue-92221 PASS)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-09 — Audit D-2167…D-2171 (reviews 1133–1137) + cadence 44/44

3 ACCEPT (doopen_indir envelope, newman dead arm, exercise lifesave+blank paper), 2 ACCEPT-WITH-DEBT with review-pointed one-line debts (1136: domove_bump_mon uses do_name.js sticky-flat Hallucination instead of display.js D-1493 timeout-only; 1137: save.js:747 misses await on newly-async restore_waterlevel — sync-complete today, latent). Every D-log corpus claim re-measured via `hidden-proxy verify --base` — all reproduced (pick_lock 1 moved, newman 1 moved, exercise 1 PASS+1 moved, distfleeck 2 PASS+1 re-attributed+3 known-other-writer, goodpos same-step re-attribution with +23-draw prefix growth). Cadence: full sessions 44/44, Scr 11,405/11,405, RNG 792,838/792,838, speed 56+0.35/turn. Filled 6 missing Addressed short hashes from git log (D-2097/2099/2100 retire credits, D-1996/2020/2048 fix SHAs). No Must-fix (no QUALITY-RISK/REJECT); queue stays 8 Open, no refill.
**Next:** (see LOOP-QUEUE)
## 2026-09-09 — D-2171 `mkmaze.c` movebubbles/mv_bubble water cons pickup+deposit: arrival bubbles never deposited, C eel mnearto→goodpos rn2(13) had no JS counterpart (1 session moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-09 — D-2170 `hack.c` domove_bump_mon: m-prefix bump onto monsters printed swap/attack instead of Pardon/move-right-into (2 sessions PASS)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
