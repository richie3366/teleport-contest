# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-30 — D-3148 `spell.c` remainder: spelltypemnemonic impossible arm + dowizcast/show_spells/book_substitution (coverage)

**C locus:** - `spelltypemnemonic`: `spell.c:832–853` (7 skill arms, default impossible-then-"" `:852–853`).
**JS:** `js/spell.js` only — spelltypemnemonic `:499`, SPELLMENU_DUMP `:270`, show_spells `:1645`, book_substitution `:1805`, dowizcast `:1948`; no new imports (all edges already present).
**Change:** default arm now `void impossible('Unknown spell skill, %d;', skill)` then `return ''` (fire-and-forget keeps it sync, dungeon.js correct_branch_type precedent); added `SPELLMENU_DUMP = -3` + DUMP heading unindent in dospellmenu (C `:2104`; PICK_ONE key flow already DUMP-correct, return ignored per nhUse); new `show_spells`/`book_substitution`/`dowizcast` in C order over live in-file/imported callees (dowizcast menu via the dospellmenu corner-menu pattern; OBJ_NAME ≡ objectNameStrs like spellname()).
**Verify:** `node scripts/verify.mjs --fn spelltypemnemonic,dowizcast,show_spells,book_substitution,age_spells,spell_idx` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7).
**Named:** - `spelltypemnemonic`: none — whole body, sole callee live (impossible).
**Next:** pop the next Open — coverage row.

## 2026-09-30 — D-3147 `invent.c` display_cinventory restart + cinv_ansimpleoname (coverage)

**C locus:** - `display_cinventory`: `invent.c:5446–5473` (safe_qbuf title `:5453–5457`, cobj → query_objlist INVORDER_SORT/PICK_NONE/allow_all `:5459–5461`, empty → invdisp_nothing + n=0 `:5462–5464`, n>0 selected[0] `:5466–5470`, cknown `:5471`, return `:5472`).
**JS:** `js/invent.js` only — `cinv_ansimpleoname` `:4576`, `display_cinventory` `:4603`; import names added on existing objnam.js/pickup.js edges (`imports.mjs --can`: ALREADY).
**Change:** restarted `display_cinventory` in C order over live `safe_qbuf(null, 'Contents of ', ':', obj, cinv_doname, cinv_ansimpleoname, 'that')` (same-module edge, already imported from objnam.js) and live `query_objlist(qbuf, items, INVORDER_SORT, PICK_NONE, allow_all)` (pickup.js edge, already imported); chain order into an array; `n>0 → pick_list[0].obj else null`; kept the split `invdisp_nothing` inline (hdr/''/'(empty)' PICK_NONE) and `obj.cknown = 1`. New module-local `cinv_ansimpleoname` in C order over live `ansimpleoname`/`strsubst`, keeping the mismatch-fired `strncmp` arms verbatim (no `!` in C) and spelling the empty-orig arm as an explicit prepend (C `strstr(bp,"")` hits; JS `strsubst` no-ops on empty orig).
**Verify:** `node scripts/verify.mjs --fn display_cinventory,cinv_ansimpleoname` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7).
**Named:** - `display_cinventory`: none — whole body, every callee live (safe_qbuf, query_objlist, allow_all) or ledger-split inline (invdisp_nothing).
**Next:** pop the next Open — coverage row.

## 2026-09-30 — D-3146 `options.c` msgtype_parse_add error arms + sscanf fidelity (coverage)

**C locus:** - `handler_disclose`: `options.c:5674–5777` (category PICK_ANY `:5696–5714`, per-category PICK_ONE `:5717–5771`, v/g `#`+`?` rows, n>1 keep-second `:5769–5770`) — stale, body complete.
**JS:** `js/options.js` only — msgtype_parse_add `:693` (+doc `:688–692`).
**Change:** restarted `msgtype_parse_add` in C order: `if (m)` keeps the hit path, miss arm calls live `config_error_add("Unknown message type '%s'")` (`:7860`), else arm calls `config_error_add('Malformed MSGTYPE')` (`:7862`), `return false` (`:7864`); class is now `{1,255}` per `%255[^"]`. 8-case node probe (hit/unknown/empty-pattern/garbage/long-token/unterminated) all C-agreeing.
**Verify:** `node scripts/verify.mjs --fn handler_disclose,all_options_msgtypes,handler_align_misc,msgtype_parse_add,determine_ambiguities` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7; full 44/44 auto on shared-file change).
**Named:** - `handler_disclose`: n>1 keep-second pick (`:5769–5770`) folded into select_menu_pick_one; nul_glyphinfo; sinks (D-2788/R1747, unchanged).
**Next:** pop the next Open — coverage row.

## 2026-09-30 — D-3145 `dungeon.c` branch-type default arm + mapseen traverse stale (coverage)

**C locus:** - `correct_branch_type`: `dungeon.c:439–454` (TBR_STAIR/NO_UP/NO_DOWN/PORTAL `:443–450`, impossible + BR_STAIR default `:452–453`).
**JS:** `js/dungeon.js` only — correct_branch_type `:497` (+cite comment `:494–496`, impossible `:504`).
**Change:** default arm now `void impossible('correct_branch_type: unknown branch type')` then `return BR_STAIR` in C order (live `display.js` export, already imported `:154`; void-fire keeps the predicate sync — `In_W_tower` `:1289` / `mkobj.js` precedent).
**Verify:** `node scripts/verify.mjs --fn correct_branch_type,traverse_mapseenchn` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7).
**Named:** - `correct_branch_type`: none — whole body, every callee live.
**Next:** pop the next Open — coverage row.

## 2026-09-30 — Audit 2096–2104 (D-3136..D-3144): 9 ACCEPT; full cadence

Reviews 2096–2104 audit 92b27a5b5..dbe017e06 against pinned C (quit cluster, botl hilite
closure, glyphrep pair closing 1510 Debt 1, lspo des bindings, takeoff pair, attrib pair,
wizcmds septet, quest quartet, there-menu trio). All corpus claims re-measured with
--reach-all (all vacuous + REACH-OK, no REGRESSED). No Must-fix — queue stays empty.
Observations (not queued): 2098 map mega-lines still name match_glyph/glyphrep (stale as to
these two); seeded sample 5/5 live (pet_ranged_attk cmd.c:941 caller is map-named under
domonability; shuffle_customizations `c` cites the dead #if 0 arm — inventory-level, `set`
recomputes the same range and would clobber `seed@`, so left for an inventory fix).
Cadence: public 44/44, corpus 648/953 (0 flips, full:true), held-out 13/44 flat.
Ledger snapshot + 5/5 seeded-ported sample live (0 fixed).

## 2026-09-30 — D-3144 `cmd.c` there-menu trio: next2u + far builders, whole-menu restart (coverage)

**C locus:** - `there_cmd_menu_far`: `cmd.c:4623–4636` (CLICK_1 `:4628`, linedup+dist2 throw `:4629–4631`, travel `:4633`).
**JS:** `js/cmd.js` only — next2u `:3072`, there_cmd_menu_next2u `:3089`, there_cmd_menu_far `:3182`, there_cmd_menu `:3232`.
**Change:** new module-local `next2u` (you.h:558 macro, squared dist2, no isok guard like C); new `there_cmd_menu_next2u` in C order over live exports (carrying/t_at/m_at/x_monnam/mon_nam/upstart/glyph_at/glyph_is_invisible_id/canspotmon/dist2 + has_mgivenname/W_SADDLE/D_ISOPEN consts + can_saddle on the existing steed edge; levl glyph ≡ remembered_glyph per detect.js; C `int *act` ≡ actOut box); new `there_cmd_menu_far` over live linedup (new SAFE mthrowu edge) + dist2; restarted `there_cmd_menu` whole in C order (test_move awaited, move_funcs[dir][MV_WALK] ≡ move_funcs_walk, travelcmd ≡ flags.travel default-On, pickAct ≡ npick/picks); deleted the dead `act_on_act_here` shim (sole caller was the menu); added which_armor (new SAFE worn edge).
**Verify:** `node scripts/verify.mjs --fn there_cmd_menu_far,there_cmd_menu_next2u,there_cmd_menu` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7).
**Named:** - `there_cmd_menu_far`: none — whole body, every callee live.
**Next:** pop the next Open — coverage row.
