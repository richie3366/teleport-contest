# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-29 — D-3087 doborn + enlght_halfdmg + cause_known + walking_on_water: insight.c census + enlightenment leaves (coverage)

**C locus:** - `doborn`: nethack-c/upstream/src/insight.c:3145–3176 (fmt :3147, header :3153, census loop :3154–3167, E/G/X flag :3159–3162, blank+totals :3169–3170, display :3172–3173)
**JS:** js/insight.js:1578 doborn; js/getline.js:754 'wizborn' EXT_CMDS entry; js/invent.js:5335 cause_known, js/invent.js:5348/5355 Half_physical/spell_damage guards (youprop.h, allmain.js shape), js/invent.js:5367 walking_on_water, js/invent.js:5674 enlght_halfdmg_lines; js/dbridge.js:317 hero_Wwalking export. Imports: +HALF_PHDAM/+HALF_SPDAM/+WWALKING (same const.js edge), +Levitation/+Flying (mhitu.js, imports.mjs SAFE), +hero_Wwalking (existing dbridge edge).
**Change:** - `doborn`: new async export in C order — fmt closure (`%4i %4i %c %-30s` via padStart/padEnd), header, LOW_PM..NUMMONS census over game.mvitals (born/died/G_GONE skip, E/G/X/blank flag, pmname_neutral≡pmnames[NEUTRAL]), blank, totals row, NHW_TEXT via show_text_pages, ECMD_OK.
**Verify:** `node scripts/verify.mjs --fn doborn,enlght_halfdmg,cause_known,walking_on_water` → VERIFY: PASS (syntax 4 files js/dbridge.js js/getline.js js/insight.js js/invent.js; rule2; green 2/2; strict ×2; cohort 7/7; full skipped — no shared file). Full `sessions` forced: 44/44 PASS (RNG + screens exact).
**Named:** - `doborn`: none in-body — whole body, every callee live or const (show_text_pages, pmname_neutral, game.mvitals); sole C caller wired.
**Next:** pop the regenerated block head (characteristics_enlightenment row already resolved split this iteration).

## 2026-09-29 — D-3086 cmdq_print + bind_mousebtn + get_adjacent_loc: cmd.c MISSING pair + restart (coverage)

**C locus:** - `cmdq_print`: nethack-c/upstream/src/cmd.c:220–249 (queue head :223, CQ header :225, KEY :228–230, EXTCMD :231–233, DIR :234–236, USER_INPUT :237–239, INT :240–242, default :243–245)
**JS:** js/cmd.js:481 cmdq_print, js/cmd.js:1676 bind_mousebtn, js/cmd.js:1991–1992 commands_init wiring; js/lock.js:766 get_adjacent_loc. Imports: +CMDQ_INT/+MOUSECMD (same const.js edge), +isok/+Never_mind (same const.js edge) — no new module edges. Tests: scripts/bind-mousebtn.test.mjs (7), scripts/get-adjacent-loc.test.mjs (3).
**Change:** - `cmdq_print`: new async export in C order — queue via cmdq_qname, CQ header, full 5-arm switch + default; KEY code from string-or-number node key into live key2txt (buf out-param≡GC); EXTCMD ec_entry ef_txt with wrapper-txt fallback; async because pline awaits.
**Verify:** `node scripts/verify.mjs --fn cmdq_print,bind_mousebtn,get_adjacent_loc` → VERIFY: PASS (syntax 2 files js/cmd.js js/lock.js; rule2; green 2/2; strict ×2; cohort 7/7; full skipped — no shared file). `node --test scripts/bind-mousebtn.test.mjs scripts/get-adjacent-loc.test.mjs` → 10/10 pass.
**Named:** - `cmdq_print`: none in-body — whole body, every callee live (pline, key2txt); 0 callers both sides.
**Next:** pop the regenerated block head.

## 2026-09-29 — D-3085 wiz_mon_diff + wiz_show_vision: wizcmds MISSING pair (coverage)

**C locus:** - `wiz_mon_diff`: nethack-c/upstream/src/wizcmds.c:1789–1828 (title :1792, mons walk :1804, mstrength/difficulty :1805–1807, trouble post-incr :1809–1810, mlev clamp :1811–1813, format :1814–1818, no-discrepancies :1822)
**JS:** js/wizcmds.js:1992 (§ banner), wiz_mon_diff :2002, wiz_show_vision :2045; imports: +pmnames (same generated edge), +mstrength (new mondata.js edge, `--can` SAFE), +COULD_SEE/IN_SIGHT/TEMP_LIT/NEUTRAL (same const.js edge).
**Change:** - `wiz_mon_diff`: new async export in C order — title const, NUMMONS-bounded walk with verbatim `!mlet` sentinel break (C's table carries the sentinel so the bound never fires first), live `mstrength` + `difficulty`, post-incr trouble gate, mlev 50-clamp, printf→padEnd/padStart format (no-truncation parity both sides, `%+d` sign arm), collected lines + `show_text_pages` (file NHW_TEXT idiom), ECMD_OK. Names via generated `pmnames[i][NEUTRAL]` (ptr carries no names in JS).
**Verify:** `node scripts/verify.mjs --fn wiz_mon_diff,wiz_show_vision` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7; full skipped — no shared file). No new test script: both need live UI paging + full game state and have 0 callers (sessions/** frozen) — D-3084 precedent; the verify gates are the maintained coverage.
**Named:** - `wiz_mon_diff`: none in-body — whole body, every callee live (mstrength; putstr/display/destroy via show_text_pages idiom); `d()` is mstrength's transitive callee, live, untouched.
**Next:** pop the regenerated block head.

## 2026-09-29 — D-3084 mimic_hit_msg restart: C switch + live simple_typename (coverage)

**C locus:** - `mimic_hit_msg`: nethack-c/upstream/src/mon.c:5776–5793 (ap :5779, M_AP_TYPE switch :5781–5792, SPE_HEALING gate :5786, pline_mon :5787–5790); color table decl.c c_obj_colors :21–37
**JS:** js/zap.js:3871 (import +1 name at :244).
**Change:** - `mimic_hit_msg`: restarted whole in C order — `ap = mappearance` first (`:5779`), full 4-case M_AP_TYPE switch (`:5781–5792`, no-ops verbatim), otyp gate (`:5786`), `pline_mon(The(simple_typename(ap)), c_obj_colors[objects[ap].oc_color])` (`:5787–5790`) via live `The` (already imported) + newly imported live `simple_typename` (same objnam.js edge, no new module link) and the verified `C_OBJ_COLORS_ZAP` table (`?.` subscript keeps the old no-throw on corrupt ap; C-valid inputs index directly). No new scripts/*.test.mjs: the message needs a live mimicking monster mid-bhitm and sessions/** is loop-agent-frozen — the verify gates below are the maintained coverage.
**Verify:** `node scripts/verify.mjs --fn mimic_hit_msg` → PASS syntax (1 file: js/zap.js) · PASS rule2 · `no corpus session is blocked` (expected — coverage row, 0 blocks) + smoke-spread REACH-OK (24 run, 24 PASS, 0 regressed) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 → VERIFY: PASS.
**Named:** - `mimic_hit_msg`: none in-body — whole body, every callee live (pline_mon, The, simple_typename; c_obj_colors data table verified against decl.c).
**Next:** none — coverage row leaves the block via finish-iteration. Cluster stayed one function: no other mon.c row is queue-eligible and all three C callees are live/ported.

## 2026-09-29 — D-3083 create_particular_creation whole: class-d mkclass + randmonst + post-flags (review 2035 Must-fix)

**C locus:** - `create_particular_creation`: nethack-c/upstream/src/read.c:3252–3357 (Must-fix arm :3278–3281; `*` arm :3281; post-flags :3313–3347)
**JS:** js/read.js:2866 (imports +2 lines: steed.js, muse.js); js/muse.js:1348 flash_mon export + doc.
**Change:** - `create_particular_creation`: restarted whole in C order — firstchoice/NON_PM + cant_revive named gate (`:3261–3273`), per-iteration `mkclass(d.monclass, 0)` (`:3279`, S_* string ≡ C mlet) / `rndmonst()` (`:3281`) select, unchanged gender arms (`:3282–3312`, citations re-anchored to pinned lines), `MM_MINVIS` (`:3313`), break-if-named / continue-if-class on makemon failure (`:3316–3322`), tame (`:3324–3325`, await live tamedog) / peaceful|hostile (`:3326–3329`, mtame=0 + set_malign), saddled (`:3331–3334`, live can_saddle/which_armor/put_saddle_on_mon), hidden (`:3335–3340`, live is_hider/hides_under/OBJ_AT/is_pool, S_MIMIC/S_EEL literals), sleeping (`:3341–3342`), hidden|invisible flash_mon when !canspotmon (`:3343–3347`, newly exported from muse.js — no muse↔read cycle, lazy call), doppelganger newcham fixup (`:3349–3354`). makemon_appear_msg stays per-iteration post-makemon (D-2096). No new scripts/*.test.mjs: creation needs a live level (enexto/makemon/tamedog/flash) and sessions/** is loop-agent-frozen — the verify gates below are the maintained coverage.
**Verify:** `node scripts/verify.mjs --fn create_particular_creation` → PASS syntax (2 files: js/muse.js js/read.js) · PASS rule2 · `no corpus session is blocked` (expected — review row, 0 blocks) + smoke-spread REACH-OK (24 run, 24 PASS, 0 regressed) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 → VERIFY: PASS.
**Named:** - `create_particular_creation`: none in-body — whole body, every callee live (mkclass, rndmonst, cant_revive, makemon, tamedog, set_malign, can_saddle, which_armor, put_saddle_on_mon, is_hider, hides_under, OBJ_AT, is_pool, canspotmon, flash_mon, newcham, y_n).
**Next:** none — Must-fix closed. Queue line marked `- [x]` + archive in this commit; review 2035 stamped by finish-iteration.

## 2026-09-29 — D-3082 get_uchars wait_synch: named omit + ledger partial (review 2041 Must-fix)

**C locus:** - `get_uchars`: nethack-c/upstream/src/cfgfiles.c:380–437 (error arm :427–435)
**JS:** js/cfgfiles.js:442 doc, :479 inline; new scripts/get-uchars.test.mjs (3 node:test cases driving the error arm via exported parse_config_line).
**Change:** - `get_uchars`: named the omit in the doc comment (windowed input boundary; game build blocks in tty_wait_synch; the config parser stays sync — parseautocomplete js/cmd.js:2265 precedent) + inline `// C :433 wait_synch — named omission`. No behavior change: wiring the async tty_wait_synch would cascade async through both handlers, the configLineStmt table, parse_config_line and parse_conf_buf for a malformed-config error arm.
**Verify:** `node --test scripts/get-uchars.test.mjs` 3/3 · `node scripts/verify.mjs --fn get_uchars` → PASS syntax (1 file: js/cfgfiles.js) · PASS rule2 · `no corpus session is blocked` + smoke-spread REACH-OK (24 run, 24 PASS, 0 regressed) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 → VERIFY: PASS.
**Named:** - `get_uchars`: wait_synch `:433` (windowed input boundary; game build blocks in tty_wait_synch wintty.c:3624–3631; config parser stays sync — parseautocomplete precedent).
**Next:** none — Must-fix closed; wiring live tty_wait_synch would need an async config-parser campaign, not queued (phase 2).
