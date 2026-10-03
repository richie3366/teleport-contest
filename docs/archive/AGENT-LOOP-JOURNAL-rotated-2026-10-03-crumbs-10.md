# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-03 — D-3369 `restore.c` reset_oattached_mids whole port + both getlev tails wired

**C locus:** nethack-c/upstream/src/restore.c:1510–1530 (`reset_oattached_mids`; sole C caller getlev :1301, after relink_timers / relink_light_sources, before clear_id_mapping :1304).
**JS:** js/restore.js:237 `export function reset_oattached_mids(ghostly)`; wired js/bones.js:695 (`reset_oattached_mids(true)` after rest_track, before clear_bones_ids — C :1301→:1304 order, map populated by remapMonChainIds) and js/save.js:1007 (`reset_oattached_mids(false)` right after relink_light_sources — faithful no-op walk, both arms gated; game.fobj installed before both tails: bones.js:666, save.js:925).
**Change:** whole C body in C order at C-home js/restore.js:237 — fobj chain walk, ghostly-gated omonst arm (`m_id = 0`, `mpeaceful = mtame = 0`), ghostly-gated omid arm (oldid → lookup → assign, else free_omid). Every callee live, no clone: has_omonst/OMONST/has_omid/OMID (const.js), lookup_bones_id (bones.js ledger-split shape — boolean+out-param collapsed to id-or-null, region.js reset_region_mids precedent), free_omid (mkobj.js); OMID assign ⇔ oextra.omid (shk.js:4228 precedent; has_omid guarantees oextra). serObj/deserObjChain persist oextra wholesale (lev_json.js:101/127), so both arms are live on bones loads. New edges restore→bones, restore→mkobj, bones→restore, save→restore all `imports.mjs --can` SAFE/ALREADY (hoisted function declarations, same SCC).
**Verify:** `node scripts/verify.mjs --fn reset_oattached_mids` → VERIFY: PASS: syntax (3 files: bones/restore/save) · rule2 · hidden note (0 blocked — normal for coverage) · reach: no RNG-tagged reach, smoke 24/24 PASS → REACH-OK · green 2/2 · strict ×2 · cohort 7/7. New scripts/reset-oattached-mids.test.mjs 4/4 pass (omonst zeroing, omid remap/free, non-ghostly no-op, null chain). /tmp/reset-oattached-probe.mjs PROBE PASS (kept).
**Named:** none in-body — whole C body live. Single-function cluster (density exception: restore.c holds no other Open row — coverage block + missing-arm checked this session; callee lookup_id_mapping ledger-split, live via lookup_bones_id).
**Next:** coverage block continues (save.c savelevchn, save_bc).

## 2026-10-03 — D-3368 `mhitm.c` slept_monst unwired C callers (review 2317 C-wrong 2)

**C locus:** - `music`: nethack-c/upstream/src/music.c:84–98 (put_monsters_to_sleep; :95 slept_monst after sleep_monst + msleeping=1).
**JS:** js/music.js:62,273; js/potion.js:196,3995; js/zap.js:565,4470–4497; js/mhitm.js:1414–1421 doc; tests scripts/dobuzz-slept-monst.test.mjs:146–211.
**Change:** deleted both clones; js/music.js:62 + js/potion.js:196 import the canonical export (`imports.mjs --can` SAFE — hoisted function declaration; zap→mhitm ALREADY). New bhitm WAN_SLEEP arm (js/zap.js:4470–4497) in C order: reveal_invis; d(1+spe,12) drawn first (call args); mimic reveal unless asleep/paralyzed; resists_sleep_slee || defended(AD_SLEE; new :565 const = 4) || resist(WAND_CLASS) → shieldeff, else sleep_monst_zap tail (zhitm ZT_SLEEP precedent); slept_monst on success; Blind_props-gated learn. Updated the mhitm.js:1414–1421 caller doc (all 5 C sites wired).
**Verify:** `node scripts/verify.mjs --fn slept_monst,bhitm` → syntax PASS (4 files) · rule2 PASS · hidden notes (0 blocked each, expected — Must-fix, not corpus) · reach slept_monst: no RNG-tagged reach, smoke 24/24 → REACH-OK · reach bhitm: 2 reach, 2 PASS → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. Test file 9/9 (2 new arm tests: sleep-lands asserts d(1,12)-before-rn2(111) order + release + learn; mr=127 control asserts shield/no-sleep/grip-kept/learn). Direct `import()` of music/potion/zap/mhitm loads clean (new static edges).
**Named:** none new. Sleep uses the zhitm-precedent inline (no canonical sleep_monst export; sleep_monst_zap meating=0 vs C finish_meating is pre-existing house style, not introduced here); music/potion sleep_monst_* clones untouched (row named only the slept_monst clones).
**Next:** Open — coverage head (generated block).

## 2026-10-03 — D-3367 `zap.c` dobuzz steed-redirect tail-skip (review 2317 C-wrong 1)

**C locus:** nethack-c/upstream/src/zap.c:4956–4991 (steed `goto buzzmonst` + hero-hit chain + u_at tail; body read via sed — csym misses the K&R signature).
**JS:** js/zap.js:2577–2643 u_at branch (steed arm :2584–2587; tail :2635–2640); tests scripts/dobuzz-slept-monst.test.mjs:78–147.
**Change:** restructured the u_at block into if/else: the steed arm (:2584–2587) ends the branch after buzzmonst (break on Rider/PM_DEATH absorb preserved); the hero-hit/blind-miss chain + the :4988–4991 tail nest in the else (:2588–2641, reindented only — no arm text changed). Swept both stale comments; buzzmonst doc now notes the tail skip. RNG order unchanged on all non-steed paths (rn2(3) still drawn only when mounted, in C position).
**Verify:** `node scripts/verify.mjs --fn dobuzz` → syntax PASS (1 file: js/zap.js) · rule2 PASS · hidden note (0 blocked, expected — Must-fix, not corpus; review notes no corpus session rides into a bolt) · reach: 40 baseline-PASS reach it, 40 PASS, 0 regressed → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. Focused test 7/7 post-fix; pre-fix replay (HEAD zap.js) fails exactly the redirect test (6/7), control passes both ways. Redirect proof: notonhead sentinel flips; tail skip: HBlinded stays 0, occupation fn intact, RNG log lacks d(6,50).
**Named:** none new (D-3361 omits stand: AD_MAGM..ACID explode combat → explode.js; flash_str nohallu suppression).
**Next:** Must-fix 2317/2 (slept_monst music/potion/bhitm callers).

## 2026-10-03 — D-3366 `detect.c` reveal-terrain committed probe deletion (review 2318 C-wrong 1)

**C locus:** nethack-c/upstream/src/detect.c:2166–2288 (reveal_terrain_getglyph; no C change — deletion of JS-only DIAG).
**JS:** js/display.js:4366 reveal_terrain_getglyph (capture block gone; tail return :4553–4555).
**Change:** deleted both blocks; restored the pre-6da1640bc direct `return reveal_terrain_cmap_hack(...)` tail (verified against `git show 6da1640bc~1:js/display.js`). Repo-wide grep: no remaining `__probe` / `__probe_reveal` in `js/` or tests — nothing read the global.
**Verify:** `node scripts/verify.mjs --fn reveal_terrain_getglyph` → syntax PASS (1 file: js/display.js) · rule2 PASS · hidden note (0 blocked, expected — Must-fix, not corpus) · reach: no RNG-tagged reach, smoke 24/24 PASS → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** none (deletion only; the reveal id arms and their D-3363 omissions stand).
**Next:** Must-fix 2317/1 (dobuzz steed tail-skip) + 2317/2 (slept_monst callers).

## 2026-10-03 — D-3365 `symbols.c` set_symhandling CURS/MAC indices (dedup to C-exact KNOWN_HANDLING)

**C locus:** nethack-c/upstream/src/symbols.c:657–669 (set_symhandling: H_UNK default + strcmpi scan) over known_handling[] :376–384 (UNKNOWN/IBM/DEC/CURS/MAC/UTF8 + NUL).
**JS:** js/const.js:2918 set_symhandling (+ C-citing comment :2916–2917).
**Change:** deleted the stale duplicate; `set_symhandling` iterates KNOWN_HANDLING (identical null-terminated scan + case-insensitive compare). Probe: UNKNOWN 0, IBM 1, DEC 2, CURS 3, MAC 4, UTF8 5, utf8 5, bogus→H_UNK 0.
**Verify:** `node scripts/verify.mjs --fn set_symhandling` → syntax PASS (1 file: js/const.js) · rule2 PASS · hidden note (0 blocked, expected) · reach: no RNG-tagged reach, smoke 24/24 PASS → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS.
**Named:** parse_sym_line (sole C caller; unported — ships via its own coverage row when eligible).
**Next:** Must-fix 2318 (reveal-terrain probe deletion in js/display.js).

## 2026-10-03 — Audit 2312–2319: review D-3356–D-3364 (5 ACCEPT, 3 QUALITY-RISK) + full score

**Reviews:** 8 js/ SHAs audited against pinned C (D-3362 docs-only skipped): upstart mthrowu+read (identical), dmgtype_fromattack canonical + 5 (AT_ANY arm restored, latent), upstart ×6 (identical), attacktype_aatyp ×2 (identical), highc/upstart/s_suffix ×8 (identical + 1 safe new edge), dobuzz completion + slept_monst (QUALITY-RISK: steed redirect falls through to flashburn/stop_occupation/nomul — C goto exits the branch; slept music/potion/bhitm callers unwired), def_char_is_furniture + reveal arms (QUALITY-RISK: committed (42,15) __probe DIAG falsely called "reverted"), assign_graphics + 8 siblings (QUALITY-RISK: set_symhandling stale declare drops CURS/MAC, UTF8 misnumbered). Every verify re-run: dobuzz PROGRESS (Rogue-94110 → rnd_hallublast same step), Tourist-94120 PASS, 0 REGRESSED anywhere. 4 Must-fix queued (probe, steed, slept callers, symhandling). Pattern noted: "queued next" promises evaporate (no rows written); commit-message Verify truncation continues.
**Cadence:** public 44/44 (336+1.61/turn); corpus 707/953 (+1 Tourist-94120, 0 lost), full:true @2026-10-03T08:26:38Z; held-out 15/44 (+0). Ledger snapshot + 5 seeded ported rows sampled (all whole; PARTIAL tags are debugpline/decl/devel-ifdef noise). Backfilled D-3364 DONE stamp. Refilled 4 Open rows (dokeylist highc numeric caveat + 3 s_suffix rewires, sym/edge verified).
