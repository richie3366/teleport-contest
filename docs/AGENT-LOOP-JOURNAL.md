# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-22 — Grow #26 @3b74ec586: fresh 53450000 ×160 160/160 (100.0 %) on arrival; calibration family `vault`

**Fresh:** RNG 100.0 %, screens 100.0 %, every family 100 %; nothing folded. Gap to held-out 20.5 pts > 20: added wave-3 `vault` (public seed0012 vault escort): probe 8/20 (40 %), +80 @53456000 35/80. 57 failing folded under 6 owners (invault 35, m_move 12, newsym 4, gd_letknow 3, impossible 2, domonnoise 1); 42 to reserve. Board 716/773.
**Next:** the cliffs head (invault).
## 2026-10-22 — D-4223 dothrow.c hero_breaks decides whether the hero sees a breakage from youprop.h Blind ≡ (HBlinded || EBlinded) && !BBlinded (`:2424`). js/dothrow.js gated its sight checks on a local Blind() clone that read the phantom fields u.Blind / u.ublind, so a blindfolded, levitating hero whose wished-for potion slipped to the floor read «A potion shatters!» where C prints «You hear something shatter!». Clearing the mirror family in the same file also fixes throw_obj's multishot gate (phantom u.Confusion / u.Stunned / game.Fumbling, on an RNG path) and folds three divergent Deaf copies into one C-exact Deaf

**C locus:** dothrow.c hero_breaks `:2417–2436` (in_view `:2424`), breaks `:2444–2455`, breakmsg `:2612–2650`; throw_obj multishot `:158–176` (`!(Confusion || Stunned)`, `Fumbling`); youprop.h Blind `:103`, Confusion `:84`, Stunned `:81`, Fumbling `:129`, Deaf `:125`.
**JS:** js/dothrow.js imports `:56`, `:71`; throw_obj `:1094–1099`; Deaf `:1197–1201`; throw_impaired `:1783–1790`; hero_breaks `:1503–1517` (body unchanged).
**Change:** the Blind clone is deleted and dothrow.js imports the live invent.js Blind (an existing import edge). throw_obj gates on HConfusion / HStun and the live attrib.js Fumbling(). throw_impaired drops the phantoms. Deaf is C's `HDeaf || EDeaf || uroleplay.deaf`, used by thitmonst `:649`, boomhit «Klonk!» `:2160` and throwit `:2510`. Deaf_youprop / Deaf_boom and the now-unused DEAF import are removed.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-sweep-Rogue-53250089.session.json` → PASS (RNG 29057/29057, Screen 1373/1373).
**Named:** none in dothrow.js. The other 25 Blind clones and 13 Deaf clones in other files are not touched (sym.mjs lists them).
**Next:** cliffs empty after Grow #25's three folds (D-4221..D-4223); the next slot is a grow.
## 2026-10-22 — D-4222 polyself.c poly_gender returns 2 (no gender) while the hero is polymorphed into a neuter or non-humanoid form (`:2149–2157`), and apply.c beautiful picks «handsome»/«amiable» for anything but 1 (`:1003–1011`). JS beautiful called a local poly_gender clone that returned flags.female only, so a polymorphed female hero refusing to rename herself (#name on her own square) read «This beautiful creature is called wizard…» where C says «This handsome creature…». Three more clones (detect.js, dokick.js, sounds.js) had the same gap, sounds.js's on an RNG path

**C locus:** polyself.c poly_gender `:2149–2157`; apply.c beautiful `:997–1013`; do_name.c do_mgivenname `:222–223`. Other poly_gender callers whose JS used clones: detect.c (the «babe»/«dude» crystal-ball line), dokick.c (gend), sounds.c (domonnoise seduction swval, rn2(3)).
**JS:** js/apply.js beautiful `:670–680`, import `:142`; js/detect.js import `:79` (use `:2710`); js/dokick.js import `:136` (use `:738`); js/sounds.js import `:50` (uses `:1685–1687`).
**Change:** the four clones are deleted, and each file imports the live polyself.js poly_gender (all four already import polyself.js). beautiful itself was already C-shaped.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-extcmd-Healer-53250042.session.json` → PASS (RNG 12921/12921, Screen 1113/1113).
**Named:** none.
**Next:** the cliffs head (hornoplenty).
## 2026-10-22 — D-4221 zap.c dobuzz's Rider arm (the `buzzmonst:` label, a closure in JS dobuzz), when a death ray from a breath disintegrates a Rider, prints «%s body reintegrates before your %s!» with body_part(EYE) (`:4887–4897`). JS used `EYE` without importing it from const.js, so the first Rider hit by a breathed death ray threw `ReferenceError: EYE is not defined` and voided the rest of the session

**C locus:** zap.c dobuzz `:4780–5037`, Rider / ZT_BREATH(ZT_DEATH) arm `:4887–4899` (body_part(EYE) `:4895–4896`); you.h/const EYE.
**JS:** js/zap.js import `:389`.
**Change:** `EYE` added to zap.js's const.js import (const.js `:582`, same edge). The arm is otherwise C-shaped.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-worldtour-Wizard-53250033.session.json` → PASS (RNG 25253/25253, Screen 246/246).
**Named:** none. D-4220's Verify gains its sweep line here (run after its commit: 713 re-run, 0 regressed).
**Next:** the cliffs head (do_mgivenname / hornoplenty).
## 2026-10-22 — Grow #25 @fbbb271b4: fresh 53250000 ×160 157/160 (98.1 %) on arrival

**Fresh:** RNG 99.4 %, screens 99.7 %; extcmd 7/8, sweep 8/9, worldtour 8/9, every other family 100 %. Gap to held-out 18.6 pts: no calibration family.
**Folded:** scen-worldtour-Wizard-53250033 (JS throw `EYE is not defined` zap.js buzzmonst → Must-fix), scen-sweep-Rogue-53250089 (hornoplenty «You hear something shatter!» s900), scen-extcmd-Healer-53250042 (do_mgivenname «handsome» vs «beautiful» s1103). Board 713/716.
**Next:** the Must-fix (buzzmonst EYE import).
## 2026-10-22 — D-4220 do.c polymorph_sink tracks a `sym` per outcome and names it with `an(defsyms[sym].explanation)` (`:449–450`). For S_throne that explanation is the PCHAR2 desc «opulent throne» (defsym.h `:132`). JS hard-coded «throne», so a ring of polymorph dropped down a sink printed «The sink transforms into a throne!» where C prints «…into an opulent throne!»

**C locus:** do.c polymorph_sink `:402–455` (sym `:406`, arms `:418–446`, message `:449–452`); defsym.h PCHAR2 `:75` (desc → explanation), S_throne `:132`.
**JS:** js/fountain.js polymorph_sink `:1027–1069`, imports `:84–85`.
**Change:** C's `sym` (S_sink, then S_fountain / S_throne / S_altar / S_room / S_grave) named through uhitm.js defsym_explanation, the live defsyms[].explanation table, which already holds «opulent throne».
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-symset-Wizard-53050007.session.json` → PASS (RNG 8466/8466, Screen 506/506).
**Named:** none.
**Next:** cliffs empty after Grow #24's three folds (D-4215..D-4220); the next slot is a grow.
## 2026-10-22 — D-4219 u_init.c u_init_misc zeroes the whole `struct you` (`:954` memset), so u.uconduct exists with every counter at 0 from the first turn (you.h `:147–167`). JS created u.uconduct lazily at about 20 sites, and do.c doaltarobj's `!gnostic++` arm (`:370–373`) was guarded by `if (uc)`. With no conduct broken yet, the object did not exist, so dropping 4 cram rations on a wished-for altar at turn 3 never livelogged «eschewed atheism, by dropping … on an altar», and #chronicle lacked C's «3: eschewed atheism…» row

**C locus:** u_init.c u_init_misc `:944–1036` (memset `:954`); you.h struct u_conduct `:147–167`; do.c doaltarobj `:363–390` (conduct `:368–373`).
**JS:** js/u_init.js u_init_misc `:1968–1979`; js/do.js doaltarobj `:724–745`.
**Change:** u_init_misc creates u.uconduct with all 18 struct u_conduct fields at 0, as C's memset leaves them. doaltarobj is back in C's shape: `!mon_moving && !(uconduct.gnostic++)` (the increment short-circuits with mon_moving, as in C), then the livelog.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-symset-Ranger-53050029.session.json` → PASS (RNG 24550/24550, Screen 908/908).
**Named:** u_init_misc still does not reset the rest of `u`. JS relies on unset fields reading as 0 (`| 0`) on a fresh game object.
**Next:** the cliffs head (polymorph_sink).
## 2026-10-22 — D-4218 dungeon.c print_mapseen adds each level row with add_menu (`:3583`) and each feature, place, branch and cemetery line with add_menu_str (`:3635–3723`); windows.c add_menu applies menucolors to all of them (`:1803–1807`), and only the dungeon name goes through add_menu_heading. JS pushed those rows plain, so after a menucolor «e» → white, the end-of-game overview («Level 1: <- You were here.», «Final resting place for», «you, killed by a potion of holy water.») stayed gray where C paints it white

**C locus:** dungeon.c print_mapseen `:3516–3728` (add_menu_heading `:3553`, level add_menu `:3583`, add_menu_str `:3635`, `:3672`, `:3677`, `:3692`, `:3705`, `:3717`, `:3723`); show_overview `:3305–3341`; windows.c add_menu `:1803–1807`.
**JS:** js/dungeon.js add_overview_str `:2930–2935`, print_mapseen level row `:3111–3120`, cemetery/feature calls `:3122–3129`, show_overview ctx `:3279–3282`.
**Change:** add_overview_str and the non-selectable level row (why != -1) spread ctx.menu_row_coloring (options.js, reached through show_overview's existing dynamic import and ctx). The why == -1 selectable level row is coloured by select_menu_pick_one, as before.
**Verify:** - `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-options-Priest-53051011.session.json` → PASS (RNG 2736/2736, Screen 115/115).
**Named:** none in print_mapseen. The nhl_text ledger note left stale by D-4217 is corrected in this commit.
**Next:** the cliffs head (show_gamelog / polymorph_sink).
## 2026-10-22 — D-4217 nhlua.c nhl_text, behind nhcore.lua's show_getpos_tip, adds each line of the tip with add_menu_str (`:836`), so windows.c add_menu applies menucolors to every line (`:1803–1807`). JS painted the tip's lines as bare strings, so after a menucolor «e» → white, the first-getpos tip («Tip: Farlooking or selecting a map location» and its body) stayed gray where C paints it white

**C locus:** nhlua.c nhl_text `:810–851` (line split `:824–837`, add_menu_str `:836`, end_menu with no prompt `:845`, select_menu PICK_NONE `:846`); nhcore.lua show_getpos_tip `:108–120`; windows.c add_menu `:1803–1807`, add_menu_str `:1832–1838`.
**JS:** js/getpos.js show_getpos_tip `:1324–1343`, import `:78`; js/options.js menu_row_coloring export `:6291`.
**Change:** each line becomes a row carrying menu_row_coloring(str), the add_menu_str colouring from D-4216, which is now exported from options.js (an existing import edge). The line split is unchanged: the 8 lines equal nhl_text's split of the nhcore.lua text (every line is under 76 chars).
**Verify:** - `node scripts/verify.mjs --fn furniture_detect,show_getpos_tip --full` → `verify furniture_detect: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-options-Priest-53051011 → save_dungeon at step 111, was 87) · reach REACH-OK ×2 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** nhl_text's generic 76-column word wrap is not ported; JS keeps the pre-split lines of its sole scored caller.
**Next:** this session's step 111 is the end-of-game dungeon overview («Level 1: <- You were here.», «Final resting place for…»): dungeon.c identifier-less overview rows without menucolors. Then show_gamelog / polymorph_sink.
## 2026-10-22 — D-4216 options.c doset adds its help text with add_menu_str (`:8798–8802`), its non-settable booleans with a zero-identifier add_menu (`:8851–8860`), and its gameview compounds through doset_add_menu with indexoffset 0 (`:9060–9065`). windows.c add_menu applies menucolors to all of these (`:1803–1807`); only add_menu_heading skips them. JS painted those identifier-less rows plain, so after a menucolor «e» → white, «    blind  [false]» and the help lines stayed gray in the full `O` menu where C paints them white

**C locus:** options.c doset `:8758–8960` (helptext loop `:8790–8810`, pass-0 bools `:8851–8860`, compounds `:8871–8880`); doset_add_menu `:9026–9065`; windows.c add_menu `:1803–1807`, add_menu_str `:1832–1838`, add_menu_heading `:1816–1828` (SKIPMENUCOLORS).
**JS:** js/options.js menu_row_coloring `:6281–6294`, doset_add_menu `:10863–10875`, doset helptext loop `:11571–11593`, pass-0 rows `:11613`; js/display.js serialize_for_scoring `:7944–7962`.
**Change:** a menu_row_coloring helper (windows.c add_menu's menucolor step for an identifier-less row) is spread onto doset's help rows (now C's helptext loop, "%4s%.75s"), the pass-0 boolean rows and doset_add_menu's indexoffset-0 rows. serialize_for_scoring treats a coloured space as row content when it finds the first column, as the capture does (` \e[97m    For…`).
**Verify:** - `node scripts/verify.mjs --fn doset,doset_add_menu,serialize_for_scoring --full` → `verify doset: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-options-Priest-53051011 → furniture_detect at step 87, was 73) · reach REACH-OK ×3 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** none in doset. In other files, not touched: other JS menus that push identifier-less add_menu rows as plain non-selectable rows (pickup.js `:4736` already colours its row).
**Next:** this session's step 87 tip window («Tip: Farlooking…», C white) is the next writer; then show_gamelog / polymorph_sink.
## 2026-10-22 — D-4215 spell.c dospellmenu builds its menu with add_menu_heading, add_menu and end_menu, then calls select_menu (`:2075–2168`). windows.c add_menu replaces a row's colour and attr with the first matching menucolor (`:1803–1807`). JS dospellmenu painted its own fixed rows, so after `O` added a menucolor, «Choose which spell to cast» showed «a - healing …» in gray where C paints it bright white. The JS swap menu also broke out of #showspells on ESC, or when the player typed the preselected letter. In C, both return n <= 0, the `splaction >= 0` arm returns TRUE with spell_no = splaction, and the list is shown again

**C locus:** spell.c dospellmenu `:2075–2168` (heading `:2103–2116`, rows `:2117–2131`, VIEW sort row / PICK_NONE `:2133–2143`, end_menu `:2144`, result arms `:2146–2167`); spellsortmenu `:1978–2017`; windows.c add_menu `:1803–1807`; wintty.c process_menu_window `:1744–1761` (a letter toggles its row: toggle_menu_curr / invert_all), tty_select_menu (n = selected count, -1 on ESC).
**JS:** js/spell.js spellsortmenu `:1618–1650`, dospellmenu `:1667–1756`, imports `:130–131` (+select_menu_pick_none; options.js select_menu_pick_one / menu_prompt_style / menu_heading_style / get_menu_coloring / cattr_to_cell, SAFE per imports.mjs), const.js PICK_NONE/PICK_ONE `:241`; js/options.js select_menu_pick_one `:10209–10215`; js/display.js serialize_for_scoring `:7966–7988`.
**Change:** dospellmenu restarted in C order on the generic tty menus: select_menu_pick_one (PICK_ONE, menucolors) / select_menu_pick_none (PICK_NONE, rows pre-coloured past attr_n 4), menu_prompt_style prompt, menu_heading_style heading, menu_tab_sep formats, wizard «turns», preselect, and C's result arms (n <= 0 with splaction >= 0 → TRUE, #showspells loops). spellsortmenu likewise. select_menu_pick_one: a letter on a preselected row cancels (tty toggle, n = 0). serialize_for_scoring: every >4-space run is CUF, mid-row inverse included.
**Verify:** - `node scripts/verify.mjs --fn getspell,dospellmenu,spellsortmenu,select_menu_pick_one,serialize_for_scoring` → `verify getspell: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-options-Priest-53051011 → doset at step 73, was 51) · reach REACH-OK ×5 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** dowizcast (`:787–815`, no C call sites) keeps its hand-painted menu. In other C files, not touched: doset's identifier-less text rows («    For a brief explanation…», «    blind [false]») and handler_autounlock's padded rows also skip menucolors.
**Next:** the cliffs head (show_gamelog / polymorph_sink); doset menucolor rows if it surfaces.
