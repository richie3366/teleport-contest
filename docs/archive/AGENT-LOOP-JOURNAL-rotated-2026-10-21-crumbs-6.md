# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-21 — D-4201 pickup.c menus paint their end_menu prompts in tty_menu_promptstyle and their class/engulfer headings through add_menu_heading. Both carry the live menu_headings colour (wintty.c `:2685–2689`, windows.c `:1815–1828`). JS hard-coded ATR_INVERSE with no colour at all seven sites, so after `O` set menu_headings white, #tip's «Where to tip the contents of …» prompt lost its colour. tipcontainer_gettarget is restarted on select_menu_pick_one; it was a hand loop that also skipped menucolors and re-dismissed the window on every key

**C locus:** pickup.c tipcontainer_gettarget `:3871–3948` (end_menu `:3925`), query_objlist headings `:1125` / `:1153` and end_menu `:1166`, query_category end_menu `:1448`, in_or_out_menu end_menu `:3465`, doloot_core end_menu «Loot which containers?» `:2255`, choose_tip_container_menu end_menu `:3536`. wintty.c tty_end_menu prompt `:2685–2689`; windows.c add_menu_heading `:1815–1828`, add_menu menucolors `:1803–1807`.
**JS:** js/pickup.js tipcontainer_gettarget (restart), query_objlist `:855–860` / `:924–928` / `:946`, query_category `:711`, in_or_out_menu `:2614`, loot_which_containers_menu `:4239`, choose_tip_container_menu `:5158`, import `:104`.
**Change:** prompts spread `menu_prompt_style()`, headings spread `menu_heading_style()` (the D-4186 helpers). tipcontainer_gettarget is restarted in C order: the floor row (selector `-`, preselected), a blank, then the containers. Excluded targets are identifier-less rows with their menucolor. The prompt is the doname(box) line, and select_menu_pick_one does the paint, menucolors and PICK_ONE finish.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-options-Rogue-51151031.session.json` → PASS (RNG 4315/4315, Screen 222/222).
**Named:** none in pickup.c. The remaining add_menu_heading drift from the D-4199 list is cmd.c `:674`, botl.c `:1411` (D-3631), o_init.c `:1169`, shk.c `:1699/:1707`, spell.c `:2117` and wizcmds.c `:1953`.
**Next:** the regenerated cliffs head.

## 2026-10-21 — D-4200 wintty.c set_item_state repaints a toggled entry's mark (`-`/`+`/`#` at str[2]) in the item's own attr and colour (`:1175–1194`). The page paint leaves the mark plain, because the attr starts at attr_n. Every runtime toggle calls it: toggle_menu_curr, set/unset_all_on_page, invert_all_on_page, for both select and deselect. JS select_menu_pick_any repainted the whole page with the mark always plain, so after `b` in query_attr's PICK_ANY menu C showed «b + bold» with a bold `+` and JS a plain one

**C locus:** wintty.c set_item_state `:1175–1194`, called from toggle_menu_curr `:1126/:1132/:1140/:1145`, set_all_on_page `:1212`, unset_all_on_page `:1233`, invert_all_on_page `:1264`. The item attr/colour come from tty_add_menu `:2616–2617`, after windows.c add_menu's menucolor replacement `:1803–1807`.
**JS:** js/options.js select_menu_pick_any (entry `markStyle`, toggle/unselect/search sites), invert_pick_any_matching; js/invent.js paint_corner_nhw_menu (corner + fullscreen markStyle), paint_overlay.
**Change:** `_retoggled` now means "set_item_state repainted this entry since the last page paint". It is set on every set_item_state-equivalent action: a letter toggle when toggle_menu_curr returns true, invert (both arms), unselect page/all, and any entry a search changed. The page-change clear is unchanged.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-options-Caveman-50151031.session.json` → PASS (RNG 2330/2330, Screen 182/182).
**Named:** choose_classes' own PICK_ANY loop (js/options.js `:5953`) keeps a plain mark, which is net-identical because its items are always ATR_NONE/NO_COLOR. set_all_on_page's select arm is already `_retoggled`.
**Next:** the regenerated cliffs head (tipcontainer_gettarget s153; pickup.c headings are one of the D-4199 add_menu_heading files).

## 2026-10-21 — D-4199 dungeon.c builds its menu headings with add_menu_heading: the overview's dungeon line (print_mapseen `:3553`) and the level-teleport menu's dungeon lines (print_dungeon `:2331`). add_menu_heading paints with the live `iflags.menu_headings` attr and colour, which are cleared during final disclosure (windows.c `:1815–1828`). JS hard-coded ATR_INVERSE with no colour, so after `O` set menu_headings to green the ^O overview showed «The Dungeons of Doom:» inverse-only where C draws it inverse green. The level-teleport prompt also gets tty_menu_promptstyle now, as end_menu gives it (`:2369`)

**C locus:** dungeon.c print_mapseen `:3538–3554` (`add_menu_heading(win, buf)`), print_dungeon `:2330–2333` (bymenu → add_menu_heading, else putstr attr 0), `:2369` `end_menu(win, "Level teleport to where:")`. windows.c add_menu_heading `:1815–1828`.
**JS:** js/dungeon.js print_mapseen `:3081–3086`, show_overview `:3274–3277`, print_dungeon `:3548–3554` and `:3585`.
**Change:** both heading sites spread the live `menu_heading_style()` (options.js, the D-4186 port of add_menu_heading, gameover → none/no-colour inside). The prompt row spreads `menu_prompt_style()` (tty_menu_promptstyle, as in D-4186). show_overview passes the helper through `ctx`. The now-unused ATR_INVERSE import is dropped.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-options-Barbarian-50355007.session.json` → PASS (RNG 2989/2989, Screen 97/97).
**Named:** none in dungeon.c. Other C files' add_menu_heading callers still hard-code the style in JS: cmd.c `:674`, botl.c `:1411` (D-3631), o_init.c `:1169`, pickup.c `:1125/:1153`, shk.c `:1699/:1707`, spell.c `:2117`, wizcmds.c `:1953`.
**Next:** the regenerated cliffs head (status_hilite_menu_add s40 and tipcontainer_gettarget s153 are both region-heuristic heading rows, likely the same add_menu_heading drift in botl.c / pickup.c).

## 2026-10-21 — D-4198 wield.c ready_weapon sets disp.botl at its tail only when the bare-handed state changed **and** the opt-in `barehanded` status condition is enabled (`:270–271`). Every arm reaches that tail. JS set botl on any bare-handed change, without the condtests gate, so moveloop_core's botl arm (curs_on_u → flush_screen) painted the map one monster move early. A fireassist canned dowield followed by dofire's getdir --More-- then showed a grid bug a square ahead of C

**C locus:** wield.c ready_weapon `:168–273`, tail `:270–271` `if ((had_wep != (uwep != 0)) && condtests[bl_bareh].enabled) disp.botl = TRUE;`. allmain.c moveloop_core `:473–479` (bot + curs_on_u only under botl/botlx/time_botl). topl.c tty_yn_function more() without a flush.
**JS:** js/wield.js ready_weapon `:548–652`, tail `:647`, import `:41`.
**Change:** restarted in C's single-exit shape. `res` starts at ECMD_OK, and the arms are the C if/else-if chain (no weapon / corpse / bimanual+shield / retouch / wield). `res |= arti_speak(wep)`.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-chain-Priest-50557210.session.json` → PASS (RNG 86374/86374, Screen 1219/1219).
**Named:** none. C `retouch_object(&wep, FALSE)` can null `wep`; JS passes the object by value, as before (artifact.js retouch_object signature).
**Next:** the regenerated cliffs head.

## 2026-10-21 — audit 3028–3037 @f0e447897: review D-4188..D-4197 (7A/3D/0Q, 0 Must-fix) + full rescore 671/714 (0 PASS→FAIL)

**Reviews:** the owner re-measures (`verify … --base HASH~1 --no-reach`) reproduce every cliff D-log: slimed_to_death, reveal_terrain, newsym, findit, enhance_weapon_skill, container_contents, doclassdisco, impossible PASS. D-4196/4197 rows were unattributed (verify vacuous); hidden-worker on HEAD passes Rogue-51650031, Wizard-95340, container-Barbarian-94326. D-4196's own Verify claimed PASS from the frozen runner, which skips the final frame. That was false at 6918c5874, and D-4197 corrected and closed it in-window, so nothing is queued. Debt (no session): D-4193's callee clear_message_window_menu_overlay zeroes curx/cury even on EMPTY toplin (C wintty.c:1047–1056; now in the tty_clear_nhwindow ledger omit); D-4196 keeps settty's clear in really_done, not in tty_exit_nhwindows; D-4189 keeps the live reconstruction for GLYPH_UNEXPLORED. Tooling: `csym.mjs postmov` finds no definition (monmove.c:1454–1455), so postmov has no ledger row.
**Rescore:** `record`: all sessions present. Unfiltered `score` gave 677/691 (677/688 excl. 3 env-only; RNG 99.99 %, screens 100.0 %), 0 PASS→FAIL vs the committed board. `archive` moved 6 PASS out → 671/714, unrecorded 0, reserve 29 → 29.
**Score:** public 44/44 (792838 RNG, 11405 screens, 95+0.51/turn); held-out 35/44, 10,849 pts (judge 07:23Z, +0). Ledger snapshot taken. Seeded sample precheck/count_feat_lastseentyp/reverse_loot/m_consume_obj/mount_steed: 5/5 hold.
**Next:** Must-fix is empty → the cliffs head.

## 2026-10-21 — D-4197 wintty.c tty_exit_nhwindows starts with tty_suspend_nhwindows(str), which ends `if (!str) tty_raw_print("")` (upstream `:808–813`). While ttyDisplay is up and raw mode is off, the recorder skips an empty raw print. After a nomux_out overflow has set raw_active it is a newline that advances the raw row. JS tty_exit_nhwindows skipped the call, so the final nh_terminate frame of a wizard death after an overflow reported raw row +2 where C has +3. D-4196 follow-up

**C locus:** wintty.c tty_exit_nhwindows (upstream `:810`) → tty_suspend_nhwindows `:808–813` (settty, then `tty_raw_print("")` when str is NULL); recorder termcap.c nomux_raw_emit `:916–946` (the empty skip applies only while `!nomux_raw_active`).
**JS:** js/cmd.js tty_exit_nhwindows (`:326–330`, import `:23`).
**Change:** `if (!str) tty_raw_print('');` at the head, in C order. The JS raw model already skips it when ttyDisplay is alive and raw mode is off (every non-overflow game), so the only effect is the overflowed raw row.
**Verify:** - `node scripts/lib/hidden-worker.mjs` → scen-sweep-Rogue-51650031, scen-sweep-Wizard-95340, scen-container-Barbarian-94326, scen-caster-Healer-50551009: all `passed: true`. `node scripts/hidden-proxy.mjs score --ids scen-sweep-Rogue-51650031,scen-sweep-Wizard-95340` → board PASS for both.
**Named:** settty's `if (s) raw_print(s)` for a non-NULL str (no JS caller passes one).
**Next:** the regenerated cliffs head (doname_base s1048, scen-chain-Priest-50557210).
