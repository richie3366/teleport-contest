# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-09 — D-2180 `objnam.c` wish fruit path: C renames SLIME_MOLD to "fruit" at init, JS matched "slime mold" in srch and drew `rn2(76)` (5 wish sessions PASS/move)

**C locus:** `options.c:7329–7341` (`fruitadd(pl_fruit)` then `obj_descr[SLIME_MOLD].oc_name = "fruit"` — "Remove \"slime mold\" from list of object names ... prevent it from being wished unless it's actually present as a named (or default) fruit") + `objnam.c` postparse3: srch chain `:4749–4760` (`rnd_otyp_by_namedesc` ×4, draws only on match), fruit loop `:4806–4868` (case-insensitive food-prefix strip, then case-sensitive `strcmp`/`makesingular`/`makeplural` vs `ffruit`, sets `typ=SLIME_MOLD`, BUC/halfeaten, `cnt=cntf` with singular→1/plural→2 default, `ftype=fid`), `readobjnam :4926` (`fruitbuf` saved post-mungspaces, pre-preparse), `readobjnam_init :3958` (`ftype=current_fruit`), quan arm `:5071–5083`, `spe=ftype :5137–5138`, halfeaten bite `:5383–5393`, preparse `:4092–4094` (`partly/partially eaten` → halfeaten), `mksobj_init` FOOD tail `:969–973` (`!rn2(6)` → quan 2, already live in JS).
**JS:** `js/options.js` (+8), `js/readobjnam.js` (+~85), `js/eat.js` (2 `export` keywords), under the 600/10 caps. Rule #2 clean.
**Change:** `js/options.js init_fruit_chain` now sets the SLIME_MOLD name entry to `"fruit"` (idempotent, before the existing early-return — mirrors C init order fruitadd-then-rename; display is unaffected, it already uses ffruit fname per D-1511); `js/readobjnam.js` ports the fruit loop verbatim (prefix strip with `continue` after digits exactly like C's `l=0` fallthrough, case-sensitive triple match, cnt overwrite incl. 0, fid), saves `fruitbuf`/`ftype`/`halfeaten` on `d`, adds the preparse partly/partially-eaten arm, sets `spe=ftype` in the SLIME_MOLD case, and ports the `:5383–5393` oeaten bite (exports `obj_nutrition`/`consume_oeaten` from `js/eat.js`, extending the existing readobjnam→eat edge). No DIAG/FORCE/seed gates.
**Verify:** `node scripts/verify.mjs --fn next_ident` → PASS syntax (3 changed js files: js/eat.js js/options.js js/readobjnam.js) · PASS rule2 · PASS hidden: 2 PASS, 3 moved past (1 still next_ident at a later step), 4 unchanged, 0 worse → PROGRESS (scen-wish-Healer-92010 PASS; scen-wish-Knight-92105 PASS incl. «2 slime molds.»; scen-wish-Archeologist-92238 moved 42→obj_resists@166; scen-wish-Knight-92130 moved 90→dosearch0@179; scen-genesis-Knight-92224 moved 20→next_ident@77) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed). VERIFY: PASS.
**Named:** none new. Postparse3 Japanese-item / armor-` mail`-retry / spinach arms and the wider preparse `historic`/`diluted` arms stay deferred (pre-existing gaps, no corpus session reaches them through this path).
**Next:** residual 4 death/genesis sessions still blocked on next_ident (scen-death-Wizard-92120@57, scen-death-Wizard-92187@48, scen-genesis-Knight-92068@96, scen-wish-Wizard-92048@113 — stepFns next_ident/newmonhp/makemon/drop_upon_death, prev `rn2(1) @ can_make_bones`, JS draws `rn2(5) @ drop_upon_death` / `rn2(5) @ distfleeck`) are a different writer: death-path makemon/newmonhp ordering vs the inventory drop (likely `bones.c` savebones ghost-creation vs `drop_upon_death` order; those recipes contain no fruit wishes and never reach the ported arm). Falsifier: `node scripts/hidden-proxy.mjs verify next_ident`; re-queue under the writer it names — never re-pop the fruit path for them. Leftovers 92238→obj_resists@166 and 92130→dosearch0@179 belong to their new owners.
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
