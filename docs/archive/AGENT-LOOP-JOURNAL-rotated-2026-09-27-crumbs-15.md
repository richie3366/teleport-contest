# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-27 — D-2979 `itemactions_pushkeys` queues the m-prefix before `#quaff`

**C locus:** `nethack-c/upstream/src/iactions.c:140–274` `itemactions_pushkeys`. `IA_QUAFF_OBJ` (`:207–212`) is `cmdq_add_ec(CQ_CANNED, do_reqmenu)`, then `dodrink`, then `otmp->invlet`. `IA_NONE` (`:146–147`) queues nothing. `default` (`:144–145`) is `impossible("Unknown item action %d", act)`. The only call is `itemactions` after `select_menu` (`:707`).
**JS:** `js/iactions.js` `itemactions_pushkeys` `:51` (signature `(act, otmp)`). `IA_NONE` `:53`. `IA_QUAFF_OBJ` `:127`. `do_reqmenu` `:132`. `dodrink` `:133`. invlet `:134`. `impossible` `:261`.
**Change:** `IA_QUAFF_OBJ` queues `do_reqmenu`, then `dodrink`, then the invlet. `cmdq_add_ec` looks up `do_reqmenu` (`reqmenu`, `PREFIXCMD` 512) and `dodrink` (`quaff`, `CMD_M_PREFIX` 128), so `rhack` runs the prefix and leaves `menu_requested` set for `dodrink`. `IA_NONE` breaks.
**Verify:** `node scripts/verify.mjs --fn itemactions_pushkeys` → PASS syntax (1 changed js file(s): js/iactions.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.4s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** No arm of `itemactions_pushkeys` is omitted.
**Next:** `objnam.c` `singular` (next Open — coverage row).

## 2026-09-27 — D-2978 `ext_func_tab_from_func` maps `doloot` and `dotip`

**C locus:** `nethack-c/upstream/src/cmd.c:3015–3025` `ext_func_tab_from_func`. Walk `extcmdlist` while `ef_txt` is set and return the first row whose `ef_funct` is `fn`, including `INTERNALCMD`, or NULL. `"loot"` is `doloot` (`:1762`). `"tip"` is `dotip` (`:1905`).
**JS:** `js/cmd.js` `FUNCT_TXT` `doloot` `:1716`, `dotip` `:1701`. `ext_func_tab_from_func` `:1850`. `cmdq_add_ec` stores the row `:432`. Here-menu `MCMD_LOOT` / `MCMD_TIP` `:2417–2418`. Container click `:2498`. Saddle `#loot` `:2680`. `act_on_act` loot `:2732`, tip `:2735`. `js/iactions.js` `IA_TIP_CONTAINER` `:204`.
**Change:** `FUNCT_TXT` maps `doloot` to `"loot"` and `dotip` to `"tip"`. The existing walk returns those `EXTCMDLIST` rows, so `txt` and flags 130 come from the table. No new import (`pickup.js` was already on `cmd.js`).
**Verify:** `node scripts/verify.mjs --fn ext_func_tab_from_func --reach-all` → PASS syntax (1 changed js file(s): js/cmd.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script shared-file list does not include js/cmd.js) · VERIFY: PASS.
**Named:** No arm of `ext_func_tab_from_func` is omitted. `hack.c:1105` stays the `test_move` omission (`doopen_indir` returns a boolean, and `cmdq_peek` is local to `cmd.js`).
**Next:** `iactions.c` `itemactions_pushkeys` (next Must-fix).

## 2026-09-27 — audit 1928–1936 (D-2969–D-2977)

Reviewed the nine `js/` commits since `a974add93`. Seven ACCEPT (1928–1934). Two QUALITY-RISK: 1935 `IA_QUAFF_OBJ` skips `do_reqmenu` before `dodrink` (`iactions.c:207–212`); 1936 `FUNCT_TXT` omits `doloot` and `dotip` (`cmd.c:1762`, `:1905`). Must-fix those two. Next cluster is `ext_func_tab_from_func`. Public `sessions` on `8d2439c0f`: 44/44, screens 11,405/11,405, RNG 792,838/792,838, speed `260+1.59/turn` (R² 0.766). Held-out still 12/44 (6,442/11,265 pts, RNG 31.5 %, rngSteps 85.3 %, screens 57.2 %; board 2026-09-27T13:26Z, last scored 2026-09-27T13:02Z). `hidden-proxy score` 12/12 on the private sessions present (RNG 75,151/75,151, screens 653/653); `.cache/hidden/sessions` absent, so 614/940 was not re-measured. Five seeded `ported` briefs (`hliquid`, `interest_mapseen`, `noteleport_level`, `mstatusline`, `mhitm_ad_acid`) each have a live JS body. No `js/` edits.

## 2026-09-27 — D-2977 `cmdq_add_ec` stores the extcmdlist row for the queued function

**C locus:** `nethack-c/upstream/src/cmd.c:253–270` `cmdq_add_ec`. Allocate a node, set `typ = CMDQ_EXTCMD`, `ec_entry = ext_func_tab_from_func(fn)`, `next = NULL`, walk `command_queue[q]` to the tail, and link the node or install it as the head. `ext_func_tab_from_func` (`cmd.c:3015–3025`) returns the first `extcmdlist` row whose `ef_funct` is `fn`, including `INTERNALCMD`, or NULL.
**JS:** `js/cmd.js` `cmdq_add_ec` `:428`. Lookup `:432`. `ec_entry` `:439`. `FUNCT_TXT` `:1669`. `ext_func_tab_from_func` `:1848`. `act_on_act_here` `:2405`. `domouseaction` `:2463`. `act_on_act` `:2594`. `rhack` `CQ_REPEAT` `:4874`. `js/shk.js` `shk_full_get_obj_location` `:1068`, `:2407`, `:3408`.
**Change:** `cmdq_add_ec` calls `ext_func_tab_from_func` first and stores that row's `txt`, `flags`, and `ec_entry`. A caller tab is used only when the lookup misses. `FUNCT_TXT` is the `ef_funct` identity (the generated table has `ef_txt`, not pointers), including alternate rows (`altdip`, `altunwield`, `alttakeoff`, `altadjust`) and `do_move_*` / `dotravel_target` / `doclicklook`.
**Verify:** `node scripts/verify.mjs --fn cmdq_add_ec --reach-all` → PASS syntax (2 changed js file(s): js/cmd.js js/shk.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.4s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script shared-file list does not include js/cmd.js or js/shk.js) · VERIFY: PASS. Extra: seed0101, seed0106, seed0116 PASS.
**Named:** `cmd.c:4727` `doidtrap` is still a dynamic import; `pager.js` does not export it, so it is not in `FUNCT_TXT`. `cmd.c:4912` mouse-button `ef_funct` stays unwired (`bind_mousebtn` unset).
**Next:** `objnam.c` `singular` (next Open — coverage row).

## 2026-09-27 — D-2976 `cmdq_add_key` appends a key on the named command queue

**C locus:** `nethack-c/upstream/src/cmd.c:274–290` `cmdq_add_key`. Allocate a node (`alloc`, GC here), set `typ = CMDQ_KEY`, `key`, `next = NULL`, walk `command_queue[q]` to the tail, and link the node or install it as the head. `cmdq_add_ec` (`cmd.c:253–270`) is the same append with `typ = CMDQ_EXTCMD` and `ec_entry = ext_func_tab_from_func(fn)`.
**JS:** `js/invent.js` `cmdq_add_key` `:8574`. Node `:8577`. Append `:8583`. `js/cmd.js` `cmdq_add_ec` `:424`. `js/spell.js` `docast` `:2851`. `js/getpos.js` `:1395`. `js/apply.js` `use_whip` `:3303`, `use_pole` `:3771`, `use_grapple` `:3921`, `dorub` `:5246`. `js/dig.js` `use_pick_axe` `:2480`. `js/dothrow.js` `:2727` and `:2780`. `js/iactions.js` `itemactions_pushkeys` `:58`.
**Change:** One `cmdq_add_key` keeps the C order on the array queues (`push` is the tail walk; `cmdq_pop` shifts the head). Callers pass `CQ_CANNED` or `CQ_REPEAT`. Keys are one-character strings.
**Verify:** `node scripts/verify.mjs --fn cmdq_add_key` → PASS syntax (8 changed js file(s): js/apply.js js/cmd.js js/dig.js js/dothrow.js js/getpos.js js/iactions.js js/invent.js js/spell.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.4s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script shared-file list does not include these files) · VERIFY: PASS.
**Named:** No arm of `cmdq_add_key` is omitted. `allmain.c:494` is `#if defined(MICRO) || defined(WIN32CON)`; neither macro is defined in this tree.
**Next:** `worn.c` `which_armor` (next Open — coverage row).

## 2026-09-27 — D-2975 `wiz_show_stats` totals objects, monsters, overview, and misc memory

**C locus:** `nethack-c/upstream/src/wizcmds.c:1616–1697` `wiz_show_stats`. Title, then objects (`obj_chain` of invent and fobj forced, buried / migrating / billobjs only when nonzero, `mon_invent_chain` of fmon and migrating monsters, `contained_stats`), monsters (`mon_chain` of fmon forced, migrating, and mydogs when the pointer is set; worm segments only for the `"fmon"` label), overview (`overview_stats`), miscellaneous (`misc_stats`), and the grand total. `size_obj` (`:1117–1132`) and `size_monst` (`:1228–1254`) add the LP64 struct sizes plus name, mail command, attached monster, and mextra extensions. `count_obj` (`:1135–1151`) counts the chain and, when asked, recurses into `cobj`.
**JS:** `js/wizcmds.js` `size_obj` `:1251`. `count_obj` `:1277`. `obj_chain` `:1305`. `mon_invent_chain` `:1327`. `contained_stats` `:1350`. `size_monst` `:1381`. `size_wseg` call `:1386`. `mon_chain` `:1411`. `wiz_show_stats` `:1438`. Object rows `:1448–1455`. Monster rows `:1464–1467`. `overview_stats` `:1475`. `misc_stats` `:1483`. Grand total `:1490`. `js/worm.js` `size_wseg` `:147`. `js/getline.js` runner `:908`.
**Change:** One exported `wiz_show_stats` keeps that C order and calls the file-local helpers. `size_wseg` is `count_wsegs * 16`. Struct sizes are the gcc LP64 probe of the pinned headers (obj 112, monst 192, eshk 4960, and the rest named beside `SIZEOF_TRAP`).
**Verify:** `node scripts/verify.mjs --fn wiz_show_stats` → PASS syntax (3 changed js file(s): js/getline.js js/wizcmds.js js/worm.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script shared-file list does not include js/getline.js, js/wizcmds.js, or js/worm.js) · VERIFY: PASS.
**Named:** No compiled arm of `wiz_show_stats` or the chain helpers is omitted. `show_borlandc_stats` is `#if defined(__BORLANDC__) && !defined(_WIN32)` and is not in this build.
**Next:** `cmd.c` `cmdq_add_key` (next Open — coverage row). No other `wizcmds.c` Open row.
