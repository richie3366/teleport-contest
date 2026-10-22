# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-22 — Grow #24 @4498679f7: fresh 53050000 ×160 157/160 (98.1 %) on arrival

**Fresh:** RNG 100.0 %, screens 100.0 %; options 1/2, symset 7/9, every other family 100 %. Gap to held-out 18.6 pts: no calibration family.
**Folded:** scen-options-Priest-53051011 (getspell menu row s51, 5 screens), scen-symset-Ranger-53050029 (show_gamelog «3: eschewed atheism…» entry missing s261), scen-symset-Wizard-53050007 (polymorph_sink «an opulent throne» s325). Board 710/713, reserve 0.
**Next:** the cliffs head (getspell).

## 2026-10-21 — D-4214 mhitu.c doseduce's refused-payment line names the seducer through noit_mhim (`:2265–2266`), which is pronoun_gender(PRONOUN_NO_IT | PRONOUN_HALLU) and draws rn2(4) while the hero hallucinates (mondata.c `:1199–1200`). JS hard-coded `mon.female ? 'her' : 'him'`, so a hallucinating hero's «… demands that you pay her, but you refuse...» skipped that draw, and every later draw in the session was off by one

**C locus:** mhitu.c doseduce `:1985–2305`, refused-payment arm `:2264–2266` (`noit_Monnam(mon), noit_mhim(mon)`); you.h `:328–329` noit_mhim; mondata.c pronoun_gender `:1188–1206`.
**JS:** js/mhitu.js doseduce refused-payment arm `:1466–1471`, import `:90`.
**Change:** the line calls the live mondata.js noit_mhim (one more name on mhitu.js's existing mondata.js import).
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-hallu-Healer-52850063.session.json` → PASS (RNG 12331/12331, Screen 1112/1112).
**Named:** none in doseduce. Same family in other C files, not touched: monmove.js `:1222–1233` and mhitm.js mhis_disp `:2228–2236` are local mhis clones (mhitm's lacks pronoun_gender's canspotmon and type_is_pname arms and reads the flat game.u.Hallucination).
**Next:** cliffs empty again; the next slot is a grow. The two mhis clones above are candidates if a hallucination cliff points at them.

## 2026-10-21 — Grow #23 @59ee75eee: fresh 52850000 ×160 159/160 (99.4 %) on arrival

**Fresh:** RNG 100.0 %, screens 100.0 %; hallu 7/8, every other family 100 %. Gap to held-out 19.9 pts: no calibration family. First cohort on recorder patch 007 (contest rc path).
**Folded:** scen-hallu-Healer-52850063 (pronoun_gender ← doseduce mhitu.js:1506, s1086). tier promoted the 29 reserve rows that pass since patch 007 (reserve 29 → 0). Board 709/710.
**Next:** the cliffs head (pronoun_gender / doseduce).

## 2026-10-21 — D-4213 detect.c detect_obj_traps, called by findone for each square of a #wizdetect / wand-of-secret-door-detection sweep, flashes the TRAPPED_CHEST glyph and then calls foundone for every trapped box it finds (`:937–947`). foundone's in-sight newsym shows what lies on the square: the box «(», not the trap. JS had dropped both calls as a named omit and kept only sense_trap, so the square was left as the sensed trap «^» where C draws «(»

**C locus:** detect.c detect_obj_traps `:906–953` (trapglyph `:923`, flash `:937–939`, sense_trap `:940–943`, foundone + num_traps `:944–947`); foundone `:1610–1622`.
**JS:** js/detect.js detect_obj_traps `:2350–2398` and its call sites.
**Change:** restarted in C order. trapglyph = trap_to_glyph(TRAPPED_CHEST) when ft is set, then `await flash_glyph_at` and foundone at C's positions. The function is now async, and all 13 call sites (findone ×4, display_trap_map ×4, trap_detect ×4, the contents recursion) await it. All are already in async functions in detect.js, and there are no other callers.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-extcmd-Archeologist-52650042.session.json` → PASS (RNG 13679/13679, Screen 1012/1012).
**Named:** none.
**Next:** cliffs empty again; the next slot is a grow.

## 2026-10-21 — Grow #22 @c085e5ef5: fresh 52650000 ×159 158/159 (99.4 %) on arrival

**Fresh:** RNG 99.7 %, screens 99.3 %; extcmd 7/8, every other family 100 % (159 authored: mixed wrote 31/32). Gap to held-out 19.9 pts: no calibration family.
**Folded:** scen-extcmd-Archeologist-52650042 (findit region row s387: C «│·(·│» vs JS «│·^·│», 9.8k RNG lost). Board 676/680 active.
**Next:** the cliffs head (findit).

## 2026-10-21 — D-4212 optlist.h stores the `safe_pet` boolean in flags.safe_dog (`:633–634`), and display.h is_safemon reads flags.safe_dog (`:159–161`). JS doset's boolean address map (DOSET_BOOL_ADDR) wrote `O`-menu toggles of safe_pet to a phantom flags.safe_pet that nothing reads. So after `O` turned safe_pet off, travelling onto the adjacent tame dog still treated it as safe: the run check in domove_core did not stop the hero, and domove_bump_mon printed «Pardon me, little dog.» where C stops silently and keeps «tame little dog» from getpos. The same map put eight_bit_tty in a phantom iflags.eight_bit_tty instead of C's iflags.wc_eight_bit_input (flag.h `:505`)

**C locus:** optlist.h `:633–634` NHOPTB(safe_pet … &flags.safe_dog), `:300–301` NHOPTB(eight_bit_tty … &iflags.wc_eight_bit_input); flag.h `:505` `#define eight_bit_tty wc_eight_bit_input`; display.h `:159–161` _is_safemon; wintty.c g_putch `:3754` (iflags.eight_bit_tty).
**JS:** js/options.js DOSET_BOOL_ADDR (eight_bit_tty, safe_pet rows); js/display.js symset_render_char `:4044`.
**Change:** DOSET_BOOL_ADDR maps safe_pet → flags.safe_dog and eight_bit_tty → iflags.wc_eight_bit_input, as in C's allopt addr. symset_render_char reads iflags.wc_eight_bit_input (C g_putch's eight_bit_tty macro). Each option now has a single home for rc, `O` and gameplay.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-options-Tourist-52451031.session.json` → PASS (RNG 2896/2896, Screen 131/131).
**Named:** none; the other 92 DOSET_BOOL_ADDR rows agree with the allopt addr column.
**Next:** the cliffs block is empty after this; the next slot is a grow (§10.19–20).
