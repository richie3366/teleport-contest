# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-01 — D-3234 `region.c` gas-creation family: selection membership via live export + `create_gas_cloud` impossible arm (coverage)

**C locus:** - `create_gas_cloud_selection`: region.c:1313–1336 (bounds `:1323`, create_region `:1325`, x-outer/y bitmap loop `:1326–1332`, make `:1334`).
**JS:** `js/region.js` create_gas_cloud_selection `:1215` (call `:1225`), create_gas_cloud `:1129` (arm `:1144–1148`), make_gas_cloud `:608`, is_hero_inside_gas_cloud `:388`, create_region `:214`.
**Change:** deleted the local; `selection_getpoint` joins the existing `from './mklev.js'` import (line 58 — no new module edge) and the loop calls the live export (sel-scoped wid/hei, `!sel.pts` guard, C selvar.c:172–175). Oversize arm gains `await impossible(\`create_gas_cloud: cloud too large (${cloudsize})!\`)` before the clamp (`impossible` already imported, async fn so awaited; disorder path, no live caller passes >150).
**Verify:** `node scripts/verify.mjs --fn create_gas_cloud_selection,create_gas_cloud,make_gas_cloud,is_hero_inside_gas_cloud,create_region` → PASS syntax (js/region.js) · PASS rule2 · hidden ×5: no corpus session blocked (coverage rows, expected) · REACH-OK ×5 (create_gas_cloud: 60/60 reaching baseline-PASS sessions; other four: smoke spread 24/24 each) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `create_gas_cloud_selection`: none — whole body live, membership now the live export.
**Next:** `inside_gas_cloud` + `expire_gas_cloud` (unknown, measured ok, D-1146/D-1155) are the natural next closure; queue block regenerates via finish (2 rows left + refill).

## 2026-10-01 — Audit 2185–2194: review D-3225–D-3233 + hotfix (10 ACCEPT) + full score

**Reviews:** 2185 e45cb9654 save_light bad-type fix / 2186 cf2801fa2 doread six arms / 2187 e0549fe8b ephemeral VFS hotfix / 2188 0fcd10790 eatfood stolen guard / 2189 1633dc128 mktrap breaktest retire / 2190 b4ca336ef is_ok_location override / 2191 5bdc19f37 hilite closure / 2192 516e71ff9 menucolor closure / 2193 e5887aa2a optfn sinks / 2194 07cfb4831 prompt inverse+blank — all ACCEPT, 0 Must-fix families. Every D-log PROGRESS claim re-measured identical (doread 1+2, prompt-style 0+4).
**Score:** public 44/44 (Scr 11,405, RNG 792,838, `323+1.63/turn`); corpus 672/953 (70.5 %), RNG 97.02 %, screens 91.7 %, 0 PASS losses, +1 vs last audit (Tourist-94350 doread PASS); held-out 14/44 unchanged (last scored 13:15Z).
**Ledger sample:** 5 seeded ported rows briefed — 4 exact (some_armor, noteleport_level, deliver_by_window, sanitize_name); doeat_nonfood → partial (MAIL arm C :2757–2761 absent: JS gives oc_nutrition 5 where C zeroes).
**Refill:** coverage block unchanged (3 rows); appended 7 eligible corpus-residual rows (read_engr_at, digactualhole, dig_up_grave, water_damage, wipeout_text, self_lookat, flooreffects) → 10 eligible, in band.

## 2026-10-01 — D-3233 end_menu prompt style: handler_rebind_keys + handle_add_list_remove + handler_rebind_keys_add paint inverse + blank (4 scen-options blocks move)

**C locus:** - `handler_rebind_keys`: cmd.c:2407–2446 (menu `:2417–2430`, end_menu prompt `:2432`, select/destroy `:2433–2434`, dispatch `:2435–2444`).
**JS:** `js/cmd.js` handler_rebind_keys `:2429` (raw `:2436–2441`), handler_rebind_keys_add `:2320` (prompt `:2367–2373`); `js/options.js` handle_add_list_remove `:6739` (raw `:6751–6758`). ATR_INVERSE already imported in both files; no new edges.
**Change:** each prompt header gains `attr: ATR_INVERSE` plus a following `{ text: '', selectable: false }` blank, in C order [prompt, blank, items] (handler_pickup_burden / pickup.js precedent). Paint only: selectors, counts and pick logic untouched.
**Verify:** `node scripts/verify.mjs --fn handler_rebind_keys,handle_add_list_remove,handler_rebind_keys_add` → PASS syntax (2 files) · PASS rule2 · PASS hidden handler_rebind_keys: 0 PASS, 4 moved past, 0 unchanged, 0 worse → PROGRESS (94011 → handler_autounlock step 16; 94091 → do_statusline2 step 38; 94211 → do_statusline2 step 41; 94151 → status_enlightenment step 40) · REACH-OK ×3 (no RNG-tagged reach; smoke 24/24 each) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** - `handler_rebind_keys`: C key-0+param NULL-deref crash path stays named (JS stays total; key 0 returns at _add :2307). The bind->param store omit is retired (live bind_param_set js/cmd.js:1733, display D-3222).
**Next:** queue regenerates (3 rows left; eligible pool still below the 8–12 band — picker move stays a human call per D-3232 Next). The 4 sessions' later owners (handler_autounlock, do_statusline2 ×2, status_enlightenment) are future rows, not this cluster.

## 2026-10-01 — D-3232 `options.c` config_error_add-sink closure: 4 optfn diagnostics wired + 3 queued bodies verified whole (coverage)

**C locus:** - `handler_whatis_coord`: options.c:6205–6276 (5 add_menu rows `:6219–6245`, info strings `:6246–6250` + non-tty `:6251–6253` + COL80ARG `:6254–6262`, end/select `:6264–6266`, pick + pick_cnt>1 `:6267–6271`).
**JS:** js/options.js:1848 (msg_window `:2494–2495`), :1984–1985 (menu_objsyms `:2253–2254`), :2301–2302 (whatis_coord `:4724–4725`), :2419–2420 (number_pad `:2600–2601`).
**Change:** each sink is one live `config_error_add("<Unknown|Illegal> %s parameter '%s'", allopt_name(optidx), op)` call with the exact C format string (import already present js/options.js:247, allopt_name same-module :1792, no new edge — D-3231 precedent); both `void optidx` placeholders removed (optidx now feeds the diagnostic like C); 4 map clauses retired (data.md:2049). Handlers/doc untouched (verified comment-accurate as briefed).
**Verify:** `node scripts/verify.mjs --fn handler_whatis_coord,initoptions_finish,handler_menu_objsyms,optfn_whatis_coord,optfn_menu_objsyms,optfn_msg_window,optfn_number_pad` → PASS syntax (1 file: js/options.js) · PASS rule2 · note hidden ×7 (vacuous: 0 blocked — coverage rows) · REACH-OK ×7 (no RNG-tagged reach; smoke 24/24 PASS each) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** - `handler_whatis_coord`: menu glyph columns + pick_cnt>1 folded into select_menu_pick_one (D-2762 helper adaptation, permanent); none in-body.
**Next:** queue regenerates (head: handler_rebind_keys); options.c parseoptions 6-site sink family (D-2561 omit, sink now live) + measured-ok unknown declaration sweep are future same-file work.

## 2026-10-01 — D-3231 `coloratt.c` MENUCOLOR closure: sink wired + 4 verified-complete, palette by-design (coverage)

**C locus:** - `add_menu_coloring`: coloratt.c:617–660 (strncpy `:623–624`, `=` split + Malformed arm `:626–628`, mungspace + `&` split `:631–634`, clr `:636–638`, attr `:640–644`, quote-strip `:648–657`, parsed `:659`).
**JS:** js/options.js:5939 sink + :5929–5931 doc; verified-untouched js/botl.js:1667/:1691, js/artifact.js:877, js/cfgfiles.js:705.
**Change:** the sink is one live `config_error_add('Malformed MENUCOLOR')` call (C `:627`; import already present js/options.js:247, no new edge); doc + map clause retired (startup.md:11). Siblings untouched (comment-accurate as briefed; clr2colorname's C NULL OOB arm stays `''` — all C callers pass valid colors, C would strcpy-crash otherwise, and every JS caller flows into strNsubst/template).
**Verify:** `node scripts/verify.mjs --fn add_menu_coloring,match_str2clr,match_str2attr,clr2colorname,cnf_line_MENUCOLOR` → PASS syntax (1 file: js/options.js) · PASS rule2 · note hidden ×5 (vacuous: 0 blocked — coverage rows) · REACH-OK ×5 (no RNG-tagged reach; smoke 24/24 PASS each) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** - `add_menu_coloring`: none — sink live, sole caller wired.
**Next:** next coverage head after finish regenerates the block.

## 2026-10-01 — D-3230 `botl.c` status-hilite closure: hilite2str impossible arms live + 3 verified-complete (coverage)

**C locus:** - `status_hilite2str`: botl.c:3590–3669 (null guard `:3600–3601`, op table `:3606–3611`, 8 behavior arms `:3614–3656` with 5 impossible else-arms `:3617`/`:3627`/`:3633`/`:3639`/`:3645`, split/clrbuf `:3659–3663`, fmt `:3665–3667`).
**JS:** js/botl.js:3098/:3104/:3108/:3112/:3116 arms, js/botl.js:3081–3084 doc; siblings js/botl.js:3174, js/botl.js:3554, js/options.js:12896 (verified, untouched).
**Change:** the 5 arms are live `else void impossible('hl->behavior=…')` one-liners with exact C strings, un-awaited per the same-file status_initialize `:357` precedent (sync caller; corrupt-rule-only arms no ported path reaches — no async cascade into the sync gather/count/options-strbuf callers). Doc comment updated (D-3137 drop note retired). Siblings untouched (comment-accurate as briefed).
**Verify:** `node scripts/verify.mjs --fn status_hilite2str,status_hilite_menu_choose_updownboth,status_hilite_menu,all_options_statushilites` → PASS syntax (1 file: js/botl.js) · PASS rule2 · note hidden ×4 (vacuous: 0 blocked — coverage rows) · REACH-OK ×4 (no RNG-tagged reach; smoke 24/24 PASS each) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (forced follow-up: display-path file) → VERIFY: PASS.
**Named:** - `status_hilite2str`: `:4289`/`:4298` menu_add callers (caller by-design); none in-body — all 5 impossible arms live.
**Next:** next coverage head after finish regenerates the block.
