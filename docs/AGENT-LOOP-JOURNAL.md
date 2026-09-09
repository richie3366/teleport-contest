# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-09 — D-2169 `attrib.c` exercise row: lifesaved touch_artifact blast skipped `exercise(A_WIS,FALSE)` + blank-paper read took no time (1 PASS + 1 moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-08 — D-2168 `polyself.c` newman dead arm: urgent_pline + done(DIED) lifesave (row named newman; 1 session moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-08 — D-2167 `lock.c` doopen_indir !IS_DOOR envelope: Blind feel/see + mapseen/newsym + drawbridge/container (row named pick_lock; true writer measured, 1 session moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-08 — Audit b46928ff..fae41579 (reviews 1127–1132: 6 ACCEPT, 0 Must-fix) + cadence 44/44

Each of the 6 JS-touching SHAs (D-2161..D-2166) audited against pinned
C with csym ranges, sym resolution, imports rulecheck/cycle checks,
and hidden-proxy re-verify at --base HASH~1: all 6 D-log Verify claims
confirm PROGRESS (gulpmu moved, do_statusline1 moved, newmonhp moved,
maybe_destroy_item PASS, yn_function PASS, use_pick_axe moved 11→68;
the step-68 "js-throw" label is the owner-null fallback — show reports
kind=screen, error null). No C-wrongs, no hallucinations. Cadence: full
sessions 44/44 (Scr 11405/11405, RNG 792838/792838). Rule #2 clean.
Open queue at 9 rows, no refill owed.
## 2026-09-08 — D-2166 `dig.c` use_pick_axe: direction prompt listed `[kyu>]` instead of C `[yku>]` (1 session moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-08 — D-2165 `zap.c` zhitu ZT_DEATH: bounced death ray printed a spurious "You die..." before the wizard "Die?" prompt (1 session PASS)

**C locus:** `zap.c:4502–4509` (`zhitu` ZT_DEATH non-breath arm: `monstunseesu(M_SEEN_MAGR)`, killer `KILLED_BY_AN` + beam text, `ugrave_arise = NON_PM`, `done(DIED)` — no "You die..." pline; that pline lives only in `done_in_by` monster-kill and `zapyourself` self-zap `urgent_pline` paths), NOT `cmd.c yn_function` (`:5470–5583`, already faithful per D-1805 — JS reaches the same «Die? [yn] (n)» once the extra screen is gone).
**JS:** `js/zap.js` zhitu ZT_DEATH arm + header comment (`done` import; `losehp`/`finish_losehp_done` imports kept — other arms still use them).
**Change:** port the C arm in exact order — `monstunseesu(M_SEEN_MAGR)` (live import), killer format/name, `ugrave_arise = NON_PM`, `await done(DIED)`, `return` (lifesaved resumes `dobuzz`; `done` added to the existing static `end.js` import — edge already present, no new module, no TDZ: call-time use only).
**Verify:** `node scripts/verify.mjs --fn yn_function` → PASS syntax (1 changed js file: js/zap.js) · PASS rule2 (no fs/path/url/node: imports, no DIAG/FORCE/seed gates) · PASS hidden (scen-wish-Barbarian-92054: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · full skipped (no shared file changed). VERIFY: PASS. /tmp probes stay out of the repo per runbook.
**Named:** ZT_DEATH disintegration-breath arm (C zap.c:4465–4490: Disint_resistance, inventory_resistance_check, uarms/uarm destroy — no live JS imports; map-named in `turns.md` zap section).
**Next:** `dig.c` use_pick_axe (next Open row); queue 11→10, no refill owed (8–12 band).
## 2026-09-08 — D-2164 `invent.c` useup: local clones omitted the `in_use = FALSE` clear, freezing victims out of `destroy_items` (1 session PASS)

**C locus:** `invent.c:1321–1333` (`useup`: `if (obj->quan > 1L) { obj->in_use = FALSE; /* no longer in use */ obj->quan--; …`), NOT `zap.c maybe_destroy_item` (`:5798–5954`, already faithful arm-for-arm — AD_COLD/FIRE/ELEC branches, `rn2(3)` loop, pline, `useup`/`m_useup`, losehp — verified against the brief; a body port guarantees NO MOVEMENT). Owner maybe_destroy_item is the draw site; the writer is `useup`. Measured, not theorized: JS prefix replay through step 163 (keys-concat == moves verified, RNG 19849/19849 in sync) shows exactly one cold-eligible potion (POT_EXTRA_HEALING, quan 1) with `in_use=true` — `destroyable` (`zap.c:5619` / `js/zap.js:1489`, both `in_use && quan==1 → FALSE`) correctly excludes it on both sides. Per-turn flag trace: the stack was quan 2 `in_use=false` at game start, flipped to quan 1 `in_use=true` at the early quaff (iter 2) and stuck — C `dodrink` (`potion.c:599`, "you've opened the stopper") + `dopotion` (`:622`) set it, and C `useup` (`:1326`) cleared it on the partial consume; the JS quaff path (`js/potion.js` local `useup`) never cleared it. C `m_useup` (`mthrowu.c:1162–1170`) has no such clear, so monster-path clones are already faithful and untouched.
**JS:** `js/potion.js` + `js/detect.js` + `js/read.js` + `js/spell.js` + `js/zap.js` (1 line each). Insertions ≈5, under the 600 cap.
**Change:** one line per clone — `otmp/obj.in_use = false; /* C invent.c:1326 — no longer in use */` as the first statement of the quan>1 branch. No new imports, no new edges (clone-local fix; replacing clones with the canonical export would also change `setnotworn`/`freeinv`/`obfree`/shop-billing behavior — out of scope). Small diff by nature: C `useup` is 13 lines.
**Verify:** `node scripts/verify.mjs --fn maybe_destroy_item` → PASS syntax (5 changed js files) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · PASS hidden (scen-tour-Tourist-91101 PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · full skipped (no shared file changed). VERIFY: PASS. /tmp probes stay out of the repo per runbook.
**Named:** none new — the clones stay clones (still missing `update_inventory`/`setnotworn`/`freeinv`/`obfree` vs canonical, pre-existing and map-named); only the `:1326` line is retired from the omit. Quaff/dip/read/spell/detect consume paths otherwise untouched.
**Next:** `cmd.c` yn_function (next Open row); queue 12→11, no refill owed (8–12 band).
## 2026-09-08 — D-2163 `sp_lev.c` link_doors_rooms: wizard3 epilogue missed the global door linkage (beehive queen 4th, not 8th)

**C locus:** `sp_lev.c` lspo_finalize_level/load_lua epilogue (`link_doors_rooms()` before `map_cleanup`/`wallification`/`flip_level_rnd`, `:6022`/`:6464`), NOT `makemon.c newmonhp` (`:1012–1054`, already faithful arm-for-arm — it drew C-matching d(13,8) twice earlier in the same step at C-index 14775/16305). Owner newmonhp is the draw site (symptom owner, same class as parked m_move/minliquid_core/spoteffects). True writer is door linkage: the arrival room's west secret door (wizard3.lua arrival `des.door` secret, `percent(50)`→west; pre-flip (44,16)) sits on the beehive's west wall (lx−1) with neighbor (43,16) carrying the beehive roomno, so C links it via `shared_with_room` (`sp_lev.c:1089–1107`) inside the global `link_doors_rooms` scan (`:1122–1145`, y-outer/x-inner; north (43,10) first, west second → prepend `add_door` puts fdoor on the west door). C `fill_zoo` (`mkroom.c:340–360` regular-room arm: skip `!SPACE_POS` or fdoor-adjacent) then skips the whole west column → 6 placed, queen 4th. JS `load_wizard3` ran per-region `add_doors_to_room` at creation (the arrival door doesn't exist yet) and its epilogue cited a truncated C order (`map_cleanup → wallify → flip`, no global link) → beehive doorct=1 fdoor=north (37,10) → skips north row only → 10 placed, queen 8th. Measured, not theorized: JS replay probe (reverted) showed room (37..38,11..16) regular, queen 8th, doors [(49,15),(37,10)], SDOOR terrain at (37,10)+(36,16); flip c=2 over extends (2..78,2..20) is a rigid motion (preserves counts), and PM_QUEEN_BEE/m_lev data verified correct (JS draws d(13,8) at its 8th) — leaving linkage as the unique writer.
**JS:** `js/mklev.js` only (comment + 2 calls). Insertions ≈5, under the 600 cap.
**Change:** `link_doors_rooms(); remove_boundary_syms();` before `map_cleanup()` in `load_wizard3`, C order + house comment (remove_boundary is a no-op here — no CROSSWALL in wizard3's map — kept for epilogue fidelity). Both draw-free: only doorct/fdoor linkage changes. Wiring-only fix at a single C call site (≈5 insertions; density owed to diagnosis, not code).
**Verify:** `node scripts/verify.mjs --fn newmonhp` → PASS syntax (1 changed file: js/mklev.js) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · PASS hidden (scen-tour-Tourist-92134 moved newmonhp@47 → mcast_death_touch@71, later owner) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed). VERIFY: PASS.
**Named:** other des loaders still lack the epilogue `link_doors_rooms()` (tower1/2/3, wiz_fila/filb, bigrm-*, quest loaders — same shape); only wizard3 fixed here (the corpus-cited level) to bound blast radius — re-queue per loader if the corpus names them. `ensure_way_out` stays named-omitted per loader headers.
**Next:** `zap.c` maybe_destroy_item (next Open row); queue 8→7, refilled +5 to 12 (distfleeck/exercise/goodpos/touch_artifact residuals + new mcast_death_touch@71 row from this verify).
## 2026-09-08 — D-2162 `attrib.c` acurr/extremeattr A_CON: wielded Ogresmasher pins CON at 25 (1 session moved past)

**C locus:** `attrib.c:1225–1227` (acurr A_CON arm: `if (u_wield_art(ART_OGRESMASHER)) result = 25`) + `attrib.c:1280–1282` (extremeattr A_CON arm: `lolimit = hilimit`). Owner `do_statusline1(botl.c:85)` is the status painter (sole cMsgOwner); the writer is acurr — the recipe wishes and wields Ogresmasher (`h Ogresmasher`, both sides print «(weapon in right hand)»), so C pins effective CON at 25.
**JS:** `js/attrib.js` only (2 import names + 2 one-line arms). Insertions ≈6, under the 600 cap.
**Change:** `if (u_wield_art(ART_OGRESMASHER)) result = 25;` in acurr; `if (u_wield_art(ART_OGRESMASHER)) lolimit = hilimit;` in extremeattr, in exact C branch position. `u_wield_art` is the live `js/artifact.js` export (C obj.h `is_art(uwep, art)` shape; `imports.mjs --can`: ALREADY, same existing edge); `ART_OGRESMASHER` from `js/generated/artifacts_data.js` (checked-in extractor output, zero-import leaf, same class as the existing monsters_data edge).
**Verify:** `node scripts/verify.mjs --fn do_statusline1` → PASS syntax (1 changed file: js/attrib.js) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · PASS hidden (scen-wish-Valkyrie-92206 moved do_statusline1@253 → exercise@313, later owner) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · full skipped (no shared file changed). VERIFY: PASS.
**Named:** none in these arms — both C branches are live. (Sibling acurr arms STR-GoP / CHA-nymph / INT-WIS-Dunce already live per D-0797/D-2057; DEX has no C arm; extremeattr STR/INT-WIS untouched.)
**Next:** `polyself.c` break_armor (next Open row); queue 10→9, no refill owed (8–12 band).
## 2026-09-08 — D-2161 `mhitu.c` gulpmu AD_DREN + `trap.c` drain_en: engulf energy-drain draw (1 session moved past)

**C locus:** `mhitu.c:1537–1542` (gulpmu `case AD_DREN`: «AC magic cancellation doesn't help when engulfed», `if (!mtmp->mcan && rn2(4)) drain_en(tmp, FALSE); tmp = 0`) + `trap.c:5201–5244` (`drain_en`: uenmax<1 zero-out vs throttle `n = rnd(n)` when `n > (uen+uenmax)/3`, `!` punct when `n > uen`, `uenmax -= rnd(-uen)` spill, `disp.botl`, then `You_feel` after state so status repaints first).
**JS:** `js/trap.js` + `js/mhitu.js` (import name + 4-line arm + doc-comment omission update). Insertions ≈50, under the 600 cap.
**Change:** new exported async `drain_en(n, max_already_drained)` in `js/trap.js` (C-faithful home; `rnd`/`You_feel`/`game.disp.botl` already live there) in exact C order and short-circuit (`|0` int reads, `Math.trunc` for the C `/3`, house `await You_feel(`${mesg}${punct}`)`); wired at the C site in gulpmu with `if (!(mtmp.mcan | 0) && rn2(4)) await drain_en(tmp, false)` (`imports.mjs --can`: ALREADY, same existing trap.js edge, no new edge).
**Verify:** `node scripts/verify.mjs --fn gulpmu` → PASS syntax (2 changed files: js/mhitu.js js/trap.js) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · PASS hidden (scen-wish-Monk-92194 moved gulpmu@87 → do_statusline2@88, later owner) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · full skipped (no shared file changed). VERIFY: PASS.
**Named:** none in this arm — every C branch of AD_DREN + drain_en is live. (Pre-existing gulpmu omissions unchanged: Punished ball, steed DISMOUNT_ENGULFED, leashes, petrify, snuff_lit invent, Slow_digestion, ugolemeffects/monstseesu, Half_physical polish.)
**Next:** `timeout.c` vomiting_dialogue (next Open row); queue drops 8→7, refill owed to ~12.
## 2026-09-08 — Audit 756b0fe9..344fe348 (reviews 1123–1126: 4 ACCEPT, 0 Must-fix) + cadence 44/44

Review iter over the 4 JS-touching SHAs since bfebf129 (5 park/audit commits docs-only, skipped per method). Each verify claim re-measured with `hidden-proxy verify <fn> --base <sha>~1`: use_lamp 0 PASS/1 moved (PROGRESS), escape_from_sticky_mon 1 PASS, fprefx 0 PASS/1 moved (PROGRESS), sickness_dialogue 1 PASS — all match the D-logs, no vacuous checks, no regressions. No C-wrongs, no Must-fix, no queue/CURRENT-Next change (Open stays 8, in band). Cadence: full `sessions` 44/44, Scr 11,405/11,405, RNG 792,838/792,838, speed 55+0.35/turn (R² 0.79).
## 2026-09-08 — D-2160 `timeout.c` SICK expiry: missing "die from your illness" death arm (1 session PASS)

**C locus:** `timeout.c:692–724` (nh_timeout uprops-expiry `case SICK`), NOT `sickness_dialogue` (`:322–345`, already faithful arm-for-arm). The owner string is a topline-literal tie-break across sickness_dialogue:334/trapmove:1572/wiz_intrinsic:953 — same misattribution class as parked doname_base/zapyourself/spoteffects. More mechanism (measured, not theorized): the count-run turns j=7,5 append «feels worse.»+«severe.» (49 chars, fits), j=3 «door.» (24) doesn't fit (25+49+3≥72) → more() → step-64 capture; after space, «You die from your illness.» refuses the append path via C `notdied=strncmp(bp,"You die",7)` (topl.c:261–265: "messages like 'You die...' deserve their own line") → else-branch → NEED_MORE → more() on the «door.» line → step-65 capture. JS `pline_after_consume` already mirrors that veto — but JS never printed the death line at all.
**JS:** `js/timeout.js` only (8 import names + ~45-line arm); no new file. Insertions ≈50, under the 600 cap.
**Change:** new `p === SICK` arm in exact C order and short-circuit: `find_delayed_killer(SICK)`; food poisoning (`!(usick_type&SICK_NONVOMITABLE)`, short-circuits before the draw) with `rn2(100) < acurr(A_CON)` → «You have recovered from your illness.» + `make_sick(0,null,false,SICK_ALL)` + `exercise(A_CON)` + `adjattrib(A_CON,-1,1)` (recovery `break` skips the death tail, so `usick_type=0` stays death-path-only per C); else `urgent_pline('You die from your illness.')` + killer (delayed entry, else KILLED_BY_AN/empty) + `dealloc_killer` + `name_to_mon`/`type_is_pname`/`the()` G_UNIQ block + `done_timeout(POISONING, SICK)` + gameover return + `u.usick_type = 0`. C `You()` via house `await pline('You …')`; C `mons[m_idx]` via house `mons(m_idx)` (function, cf. do_name.js:294); `NON_PM(-1) < LOW_PM(0)` keeps the `>= LOW_PM` gate exact. All 8 names join ALREADY edges (const/potion/attrib/mondata/objnam/do_name); no new module edge.
**Verify:** `node scripts/verify.mjs --fn sickness_dialogue` → PASS syntax (1 changed file: js/timeout.js) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · PASS hidden (scen-intrinsic-Rogue-91111 PASS, rngM 3495/3495 scrM 134/134) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · full skipped (no shared file changed). VERIFY: PASS.
**Named:** none in this arm — every C branch is live. (Pre-existing `make_sick` cure-condition shape untouched, irrelevant here since usick_type≠0 on the recovery path.)
**Next:** `detect.c` do_mapping (next Open row); queue stays ≥8 Open (10→9), no refill owed.
