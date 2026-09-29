# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-29 — D-3092 wiz_show_vision + wiz_mon_diff EXT_CMDS runners: #vision/#wizmondiff dispatch (Must-fix review 2045)

**C locus:** - `wiz_show_vision`: nethack-c/upstream/src/cmd.c:1928–1929 "vision" IFBURIED|AUTOCOMPLETE|WIZMODECMD (unconditional) → wiz_show_vision
**JS:** js/getline.js EXT_CMDS vision:945, wizmondiff:958; scripts/vision-wizmondiff-runners.test.mjs (new, 3 its).
**Change:** - `wiz_show_vision`: new EXT_CMDS row — wiz:true, autocomplete:true, lazy `import('./wizcmds.js')` → wiz_show_vision() (D-2779 sibling pattern; dynamic import, no new static edge).
**Verify:** `node --test scripts/vision-wizmondiff-runners.test.mjs` → null runners pre-fix, 3/3 pass post-fix. `node scripts/verify.mjs --fn wiz_show_vision,wiz_mon_diff` → PASS syntax (1 changed js file: js/getline.js) · PASS rule2 · note hidden ×2 (no corpus session blocked at baseline — review 2045 notes the corpus cannot reach wizard extcmds) · PASS reach ×2 (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS.
**Named:** - `wiz_show_vision`: none — runner-only change; body unchanged since D-3085 ACCEPT.
**Next:** Must-fix queue empty; resume coverage block (head: uhitm.c mhitm_ad_ssex THIN).

## 2026-09-29 — D-3091 wiz_custom + wiz_kill EXT_CMDS runners: #wizcustom/#wizkill dispatch (Must-fix review 2049)

**C locus:** - `wiz_custom`: nethack-c/upstream/src/cmd.c:1951–1952 "wizcustom" IFBURIED|WIZMODECMD|NOFUZZERCMD (no AUTOCOMPLETE) → wiz_custom
**JS:** js/getline.js EXT_CMDS wizcustom:782, wizkill:795; scripts/wizcustom-wizkill-runners.test.mjs (new, 3 its).
**Change:** - `wiz_custom`: new EXT_CMDS row — wiz:true, autocomplete:false, lazy `import('./wizcmds.js')` → wiz_custom() (D-2779 sibling pattern; dynamic import, no new static edge).
**Verify:** `node --test scripts/wizcustom-wizkill-runners.test.mjs` → 2 fail pre-fix (null runners), 3/3 pass post-fix. `node scripts/verify.mjs --fn wiz_custom,wiz_kill` → PASS syntax (1 changed js file: js/getline.js) · PASS rule2 · note hidden ×2 (no corpus session blocked at baseline — review 2049 notes the corpus cannot reach wizard extcmds) · PASS reach ×2 (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS.
**Named:** - `wiz_custom`: none — runner-only change; body unchanged since D-3089 ACCEPT.
**Next:** Must-fix vision+wizmondiff runners (review 2045) remain queued; bodies live since D-3085.

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
