# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-28 — D-3022 `savenames` + `restnames` whole (o_init.c names chunk as a JSON-analogue pair; blob moved under the C entry points)

**C locus:** - `savenames`: `nethack-c/upstream/src/o_init.c:375–407` whole in C order — `:380` `update_file` gate, `:381–383` bases[MAXOCLASSES+2] (`names-bases`), `:384–386` disco[NUM_OBJECTS] (`names-disco`), `:387–389` objclass per object (`names-objclass`), `:394–406` uname loop (len+chars only for non-null, `release_data` free). Sfo_* is structlevel raw-struct + `norm_ptrs` (`sfstruct.c` SF_C); oc_uname is genericptr-opaque to sftags (`util/sftags.c:1465`), hence the separate string loop.
**JS:** - `savenames`: `js/o_init.js:358`.
**Change:** new `export function savenames` (`js/o_init.js:358`) returning `{objects, bases, disco}` in C order (bases copy, disco copy, per-entry objclass mutables + `oc_uname: string|null` inline — the uname length prefix rides in the entry, JSON analogue of the separate loop); new `export function restnames(saved)` (`js/o_init.js:390`) overlaying bases/disco/objclass in C order with the set-only uname marker arm. `js/save.js` calls `savenames()` in dosave0 (`js/save.js:519`, keeps payload key order) and `restnames(payload)` in `try_restore_save` (`js/save.js:795`, after the pre-existing `objects_globals_init`). Import joins the existing 99-module SCC (`imports.mjs --can`: runtime calls only, no top-level read).
**Verify:** `node scripts/verify.mjs --fn savenames,restnames` → VERIFY: PASS — syntax 2 files; rule2 PASS; hidden notes (0 blocked each, expected for a coverage pair); reach REACH-OK ×2 (no RNG tags; smoke 24/24 each); green 2/2; strict ×2; cohort 7/7. `node frozen/ps_test_runner.mjs sessions` → full 44/44 PASS (`266+1.64/turn`, R² 0.774). `node --test scripts/names-save-restore.test.mjs` → 4/4 pass.
**Named:** - `savenames`: Sfo_* binary encode (stash/JSON architecture, msghistory precedent); `update_file` gate (VFS always writes); `release_data` free — GC no-op, live table keeps names; FREE_ALL_MEMORY `freenames()` (compiled out).
**Next:** coverage head leaves the block on finish; refill tops up. restnames had no row (below the 12-row cut) and ships as the same-file restore counterpart — msghistory pair precedent.

## 2026-09-28 — D-3021 mtele_trap screen flip at scen-tour-Samurai-91113 step 54: owner misattribution; writer is the movemon `:1332–1333` any_light_source arm

**C locus:** - `mtele_trap`: `nethack-c/upstream/src/teleport.c:1962–2002` whole, examined — no change needed (see JS was).
**JS:** - `mtele_trap`: unchanged — `js/teleport.js:1362` + caller `js/trap.js:5245–5264`.
**Change:** new `export function any_light_source` (`js/light.js:491`, `!!(light_base.length)` — array emptiness, not identity) + the `:1332–1333` arm in `js/mon.js:3824` in C order (before the bypass/split clears). Import joins no new edge beyond the existing 99-module SCC (`imports.mjs --can`: hoisted fn, runtime use only — the D-3014 may_dig precedent). Mechanism (bisect-measured, not inferred): file-level swap of `js/mon.js` to `fda3d415d` restores PASS while `display.js`/`dogmove.js`+`monmove.js` swaps stay FAIL; arm-level isolation shows only the `:1258` `vision_recalc(0)` line matters.
**Verify:** - `mtele_trap`: `node scripts/verify.mjs --fn mtele_trap,movemon,any_light_source` → VERIFY: PASS — syntax 2 files; rule2 PASS; hidden `verify mtele_trap`: 1 PASS (scen-tour-Samurai-91113 PASS, scrM 63/63), 0 worse → PROGRESS; reach REACH-OK ×3 (no RNG tags; smoke 24/24 each); green 2/2; strict ×2; cohort 7/7; full skipped (tool heuristic). `node frozen/ps_test_runner.mjs sessions` → full 44/44 PASS (`265+1.66/turn`, R² 0.777). New `scripts/movemon-light-recalc.test.mjs` 3/3 pass; `scripts/movemon-singlemon.test.mjs` 2/2 still pass.
**Named:** - `mtele_trap`: Monnam timing — JS names the monster before `teleport_pet`, C after (`:1972`); same call order otherwise, toplines match. Not touched: out of this flip's causal chain.
**Next:** Must-fix row addressed; queue regenerates. D-3012's named omission is retired (sibling test comment updated). 2af820a38 stands — its `:1258` arm is C-exact; the flip was the latent omission it exposed, not a bad port.

## 2026-09-28 — Audit 1972–1980 (D-3012…D-3020): 9 ACCEPT, 1 Must-fix

9 SHAs re-audited vs pinned C (bodies + callers + sym + re-measure): all arms branch-exact, zero REGRESSED. Cadence: public 44/44; held-out 12/44 (6452 pts, RNG 33.2 %, scr 57.3 %); corpus 629/953 full:true with 1 flip → Must-fix mtele_trap (Samurai-91113 @54). Ledger sample: 5 seeded ported rows (prscore, some_armor, mhitm_ad_poly, domonnoise, parse_status_hl2) all resolve via sym — no wrong rows (node v20, no sqlite; jsonl-shuf + brief ×5). Next: pop the Must-fix.

## 2026-09-28 — D-3020 `wiz_display_macros` whole (display-macro range validator; C caller wired via EXT_CMDS)

**C locus:** `nethack-c/upstream/src/wizcmds.c:1705–1778` whole in C order —
**JS:** - `wiz_display_macros`: `js/wizcmds.js:1527` + EXT_CMDS entry `js/getline.js:852–860`. Export name matches C; signature async (pager wait), like every sibling `wiz_*`.
**Change:** new `export async function wiz_display_macros` (`js/wizcmds.js:1527`) in C order against live exports — `glyph_is_cmap`/`glyph_to_cmap`/`glyph_is_cmap_zap`/`glyph_to_mon`/`glyph_is_object`/`glyph_to_obj`/`NO_GLYPH`/`MAX_GLYPH`/`MAXPCHARS` join the existing `display.js` import (no new edge), `NUMMONS` joins the `monsters.js` import, `S_vbeam`/`S_rslant` join the `const.js` import. `SIZE(defsyms)` is `MAXPCHARS + 1` (`drawing.c:64` fencepost); `IndexOk` inlined as `0 <= test < defsyms_size`; `!trouble++` header-once shape kept; each C `putstr` is one collected line; `display_nhwindow(win, FALSE)` via `show_text_pages` (the `wiz_show_stats` NHW_TEXT idiom). New EXT_CMDS runnable entry `wizdispmacros` (`js/getline.js:852`, wiz + autocomplete, lazy `wizcmds.js` import like its neighbors).
**Verify:** - `wiz_display_macros`: `node scripts/verify.mjs --fn wiz_display_macros` → VERIFY: PASS — syntax 2 files; rule2 PASS; hidden note (no corpus session blocked, expected for a coverage row); reach REACH-OK (no RNG tags; smoke 24/24 PASS); green 2/2; strict both sessions; cohort 7/7; full skipped (no shared file). Headless probe of the real export (recording `nhDisplay` fake + one space key): `rc= 0`, row0 `"No display macro issues detected."` — JS tables self-consistent, as C reports on a consistent build.
**Named:** - `wiz_display_macros`: none — every arm ported, every callee live, the C caller wired.
**Next:** queue regenerates; `wizcmds.c` holds no further Open rows (this was the sole wizcmds.c coverage row; all callees already ported).

## 2026-09-28 — D-3019 `free_glyphid_cache` C-order re-port (per-entry id-null loop; 1 C caller wired, 5 named)

**C locus:** `nethack-c/upstream/src/glyphs.c:355–369` whole in C order —
**JS:** - `free_glyphid_cache`: `js/glyphs.js:185` (comment `:179–184`, cites corrected to `:355–369` with per-arm `:35x` cites). Export name/signature kept; sole JS call site untouched.
**Change:** restarted the export in C order: guard, `for` over `glyphidCacheSize` (mirrors C's bound; `init_glyph_cache` fills exactly that many entries so the index stays in range like C), per-entry `id = null` (JS analogue of `free`; GC reclaims), table `= null` (analogue of `free` + `= NULL`).
**Verify:** - `free_glyphid_cache`: `node scripts/verify.mjs --fn free_glyphid_cache` → VERIFY: PASS — syntax 1 file; rule2 PASS; hidden note (no corpus session blocked, expected for a coverage row); reach REACH-OK (no RNG tags; smoke 24/24 PASS); green 2/2; strict both sessions; cohort 7/7; full skipped (no shared file).
**Named:** - `free_glyphid_cache`: none in the body — every arm ported, no live callee. Five C callers named above (callers unported or arms unported); the single live caller is wired.
**Next:** queue regenerates; `glyphs.c` holds no further Open rows (remaining `unknown` ledger entries are live in `js/` under the same names, e.g. `fill_glyphid_cache` `js/glyphs.js:752`).

## 2026-09-28 — D-3018 `arti_speak` whole + both C callers wired (wield tail, doapply tail at 5 artifact-eligible arms)

**C locus:** `nethack-c/upstream/src/artifact.c:2279–2296` whole in C order — `:2281` get_artifact, `:2286–2287` non-artifact / no-SPEAK guard (`||` short-circuit kept), `:2289` getrumor(bcsign, buf, TRUE), `:2290–2291` renovation fallback, `:2292` Tobjnam-whisper pline, `:2293` SetVoice 0/0/80/talking-artifact, `:2294` verbalize1 (= verbalize("%s") per hack.h:1029), `:2295` ECMD_TIME.
**JS:** `js/artifact.js:arti_speak` (exported async — pline/verbalize are async in JS) + `getrumor`/`bcsign` (rumors.js) and `SetVoice`/`voice_talking_artifact` (sndprocs.js) added to imports (`imports.mjs --can`: rumors SAFE-hoisted, sndprocs no-cycle; wield/apply→artifact ALREADY). `verbalize` joined the existing display.js import (no new edge).
**Change:** new `arti_speak` in C order; wire wield unconditionally (single site, C shape); wire doapply via one `doapply_arti_tail` helper at the 5 artifact-eligible arms, guard-dead arms cited below.
**Verify:** `node scripts/verify.mjs --fn arti_speak --full` → syntax 3 files · Rule #2 clean · hidden note (no corpus session blocked — expected for a coverage row) · REACH-OK (no RNG-tagged reach; smoke 24/24) · green 2/2 + strict ×2 · cohort 7/7 · full 44/44. VERIFY: PASS. Live probe: guard arms (`null`/`oartifact:0`/Excalibur) all return ECMD_OK with no output.
**Named:** none in the body — every arm ported, every callee live (`get_artifact`, `getrumor`, `bcsign`, `pline`, `Tobjnam`, `SetVoice`, `verbalize`).
**Next:** next coverage head (`glyphs.c` free_glyphid_cache).
