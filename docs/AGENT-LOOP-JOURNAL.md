# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-29 — Audit 2042–2050: 7A/2Q; public 44/44, corpus 648/953 (+9, 0 flips, full)

**Reviews:** 2042 A, 2043 A, 2044 A, 2045 Q (unwired vision/wizmondiff runners — Must-fix), 2046 A, 2047 A, 2048 A (own 1230/1230 byte-diff; D-log "1251" wrong, immaterial), 2049 Q (unwired wizcustom/wizkill runners — Must-fix), 2050 A. All re-measures REACH-OK, 0 regressed. Held-out 13/44 flat. 5 ledger rows briefed, sound (sqlite absent, NOTES-known). Next: 2049 runner Must-fix, then 2045's.
## 2026-09-29 — D-3090 lose_weapon_skill + abon + show_skills: weapon.c head + clone unification (coverage)

**C locus:** - `lose_weapon_skill`: nethack-c/upstream/src/weapon.c:1453–1473 (slots-first :1459–1461, record pop :1462, panic :1463–1464, rank-- :1465, refund :1467)
**JS:** js/weapon.js:lose_weapon_skill:1081, abon:1362 (new); js/attrib.js adjabil tail:1004–1012 (wired); js/dig.js:69 import; js/uhitm.js:47 import.
**Change:** - `lose_weapon_skill`: new sync export in C order — free-slots-first, record pop, P_SKILL-- via setter, slots_required-1 refund, panic ≡ loud throw (insert_branch precedent).
**Verify:** - `lose_weapon_skill`: hidden note (no sessions blocked), REACH-OK (smoke 24/24).
**Named:** - `lose_weapon_skill`: none in-body — whole body, every callee live (slots_required, P_SKILL/set_P_SKILL).
**Next:** postadjabil in adjabil stays deferred (pre-existing, untouched); queue continues from the generated block.
## 2026-09-29 — D-3089 wiz_custom + wiz_kill + ecname_from_fn: wizcmds MISSING pair + cmd lookup (coverage)

**C locus:** - `wiz_custom`: nethack-c/upstream/src/wizcmds.c:1934–1984 (wizard gate :1938, cache fill :1946–1947, menu build :1951–1955, bufa :1956–1964, dead buf copy :1965, fill :1967, end/select/destroy :1968–1970, free :1974–1975, cache drop :1976–1977, docrt :1978, else :1982–1983)
**JS:** js/wizcmds.js:wiz_custom:2109, wiz_kill:2149 (new); js/dokeylist.js:ecname_from_fn:652, UNAVAILCMD:641 (new); js/const.js:KNOWN_HANDLING:2881 (new).
**Change:** - `wiz_custom`: new async export in C order — sibling wizard gate, cache fill, raw-array win (create/start), verbatim heading, bufa (`#wizcustom: colorcount=N name|default`, `, active` with BSS-0 currentgraphics, `, handler=` via new KNOWN_HANDLING), dead `:1965` copy dropped (buf never read), live `wizcustom_glyphids` fill, prompt-last (tty_end_menu idiom), `select_menu_pick_none` (= end+select+destroy), free arm noted (no allocation), cache drop, `docrt`, ECMD_OK; else arm is the first live `pline(UNAVAILCMD, ecname_from_fn('wizcustom'))` call site.
**Verify:** - `wiz_custom`: /tmp/wiz_probe.mjs — non-wizard arm → ECMD_OK (pline headless-clean); cache fill→glyphids→free cycle no-throw, 0 items on default game (C-correct: nothing customized). `verify --fn`: hidden note (no sessions blocked), REACH-OK (smoke 24/24).
**Named:** - `wiz_custom`: none in-body — whole body, every callee live or house-mapped (menu verbs → raw array + `select_menu_pick_none`; dead `:1965` copy and `free` have no JS analogue).
**Next:** wire the 8 unported `ecname_from_fn` hosts when their wiz arms land; `game.gs.symset`/`gc.currentgraphics`/`iflags.colorcount` writers (init_symbols/symset path) will light up the `, active`/handler arms.
## 2026-09-29 — D-3088 dump_enums: earlyarg.c `--dumpenums` enum tables (coverage)

**C locus:** - `dump_enums`: nethack-c/upstream/src/earlyarg.c:706–801 (tables :624–703, loop :777–800)
**JS:** js/earlyarg.js:dump_enums (file-local), dump_enums_tables (exported for the oracle probe); js/generated/enumdumps_data.js (new); js/mcastu.js:MCASTU_SPELL_DEFS; js/display.js:MAXMCLASSES.
**Change:** - `dump_enums`: new file-local in C order — 11 `edmp` tables via exported `dump_enums_tables()` assembler (monsdump from live monsterNames slice(3) + 5 fenceposts with HIGH_PM≡NUMMONS-1 per permonst.h:22; objdump from live objectNames + NUM_OBJECTS; omdump 15 rows from objects_data consts + indexOf MARKER anchors + objclass.h:180–181 gem counts; six defsym tables from new js/generated/enumdumps_data.js; arti from artilistRaw bn + NROFARTIFACTS+1 per hack.h:102/106; mcast from new MCASTU_SPELL_DEFS), prefix/unprefixed/nmwidth/comment logic verbatim, rows pre-formatted (`padEnd` ≡ negative-width `%*s`, `padStart(3)` ≡ `%3d`) through `raw_printf('%s', …)` (early_version_info precedent; vpline_expand strips width per D-2573). Extended scripts/extract-glyphsyms.py (owns defsym.h parsing) to emit enumdumps_data.js with density + OBJCLASS2 + printability asserts; added MAXMCLASSES=61 (sym.h:24) to js/display.js. Wired the ARG_DUMPENUMS arm (returns 2, as C).
**Verify:** - `dump_enums`: /tmp/dumpenums_probe.mjs rebuilt all 11 tables (388+482+15+106+61+60+17+18+17+35+20 rows) from the real `dump_enums_tables()` and byte-diffed 1251/1251 lines vs `./nethack --dumpenums` (recorder binary) — BYTE-EXACT; `argcheck(2,['nethack','--dumpenums'],ARG_DUMPENUMS)` → 2, no throw. `verify --fn dump_enums`: hidden note (no sessions blocked), REACH-OK (smoke 24/24), green 2/2, strict ×2, cohort 7/7, full 44/44 → VERIFY: PASS.
**Named:** - `dump_enums`: `raw_print` `:797–798`,`:800` stdout sink (no pre-window channel in dual-runtime ESM; `vraw_printf` `:577` sink-omit precedent — routing through `raw_printf` would invent +2 early_raw_messages counts per line that C never records).
**Next:** ARG_DUMPGLYPHIDS/ARG_DUMPMONGEN/ARG_DUMPWEIGHTS arms stay named (dump_all_glyphids, dump_mongen, dump_weights unported).
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
