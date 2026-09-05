# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-05 — D-1855 cmd.c '&' dispatches dowhatdoes (was Unknown command)

**C locus:** `cmd.c:1934–1935` — `{ '&', "whatdoes", …, dowhatdoes,
**JS:** `js/pager.js` (export one word), `js/cmd.js` (import + 5-line arm).
**Change:** export `dowhatdoes` from `js/pager.js`, import it in
**Verify:** `node scripts/verify.mjs --fn dowhatdoes` → PASS
**Named:** `dowhatdoes` ALTMETA ESC-double path
**Next:** Open `sp_lev.c` `lspo_replace_terrain` (1 corpus block).

## 2026-09-05 — D-1854 pager.c do_screen_description blank-sym collapse ("can be many things (unexplored area)")

**C locus:** `pager.c` `do_screen_description` `:1246–1627` — looked sym
**JS:** `js/pager.js` `describe_looked` (~+15/−1).
**Change:** that branch now prints 9-space `can be many things (${look})`
**Verify:** `node scripts/verify.mjs --fn do_screen_description` → PASS
**Named:** full `do_screen_description` cmap/symbol table
**Next:** Open `pager.c` `dowhatdoes` (2 corpus blocks).

## 2026-09-05 — D-1853 mkmaze.c makemaz knox load_special (Fort Ludios magic-portal vault)

**C locus:** `dat/knox.lua`; `mkmaze.c` `makemaz` `:1127–1223`
**JS:** `js/mklev.js` `load_knox` / `load_special_proto` (+ `knox` in
**Change:** `load_knox` from the lua body in order: solidfill STONE +
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location` for water-likers;
**Next:** Open `pager.c` `do_screen_description` (4 corpus blocks).

## 2026-09-05 — D-1852 mkmaze.c makemaz Val-strt/loca/goal/fila/filb load_special (Valkyrie quest 5/5)

**C locus:** `dat/Val-strt.lua` / `Val-loca.lua` / `Val-goal.lua` /
**JS:** `js/mklev.js` `load_val_strt` / `load_val_loca` / `load_val_fila` /
**Change:** `load_val_strt` from the lua body: solidfill ICE +
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `ensure_way_out`;
**Next:** Open `mkmaze.c` `makemaz` `knox` (Fort Ludios). Not Sam.

## 2026-09-05 — D-1851 dothrow.c dofire empty-quiver You() NEED_MORE before getobj

**C locus:** `dothrow.c` `dofire` `:510–554` (`You("have no ammunition readied.")` then `doquiver_core("fire")`); `wield.c` `doquiver_core`; `invent.c` `getobj` / `win/tty/getline.c` `hooked_tty_getlin` `:53–54` / `topl.c` `tty_yn_function` (`toplin == NEED_MORE` → `more()` before the prompt). Also `:381–441` `autoquiver`; `:447–465` `find_launcher`; `:506–508` throw-and-return; `:512–525` pole/whip/uswap pole; `:557–579` fireassist; `:297–300` `ok_to_throw` shotlimit.
**JS:** `js/dothrow.js` `dofire` / `autoquiver` / `find_launcher` / `ok_to_throw`; `js/apply.js` `use_pole` / `use_whip` export.
**Change:** drop the pre-doquiver `mark_topline_seen` so `You()` leaves NEED_MORE and `doquiver_core` waits like C. Port C order: throw-and-return, empty-quiver pole/whip/swap/`You()`, autoquiver, `in_doagain=0`, doquiver, fireassist `could_pole_mon` / launcher swap / `find_launcher` canned wield, `throw_obj(shotlimit)`. Keep D-0485 mark after a successful ready so getdir does not More-eat direction keys.
**Verify:** `node scripts/verify.mjs --fn dofire` → PASS syntax (2 js files: js/apply.js js/dothrow.js); PASS rule2; PASS hidden verify dofire: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (random-seed0200-monk-north-search-d169ccc2 PASS; random-seed1500-rogue-explore-move-2a788f95 PASS); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file changed). VERIFY: PASS
**Named:** `ok_to_throw` `check_capacity((char *)0)` still. getdir remains in the JS caller (`throw_obj` assumes dx/dy). D-0485 `mark_topline_seen` after ready still.
**Next:** Open `mkmaze.c` `makemaz` `Val-strt`/`-loca`/`-goal`/`-fila`/`-filb`. Do not reopen the empty-quiver More skip (D-0484).

## 2026-09-05 — D-1850 invent.c display_inventory → display_pickinv PICK_ONE; farlook `i` "Weapons" stays

**C locus:** `invent.c` `display_inventory` `:3427–3452` (`cmdq_pop` then `display_pickinv(lets, 0, 0, FALSE, want_reply, 0)`); `display_pickinv` `:3380–3382` `select_menu(want_reply ? PICK_ONE : PICK_NONE)`; `wintty.c` `process_menu_window` `:1738–1740` (`PICK_NONE || !strchr(resp, morc)` → `tty_nhbell`, stay); `windows.c` `add_menu_heading` `:1815–1828` (`program_state.gameover` → `ATR_NONE`); `pager.c` `do_look` `:1822–1840` (`display_inventory(NULL, TRUE)`); callers `pickup.c:223` / `end.c:592` pass TRUE.
**JS:** `js/invent.js` `display_inventory` / `display_pickinv_reply` / `add_menu_heading_attr` / `dismiss_nhw_menu({ keep_status })`; `js/pickup.js` / `js/end.js` `display_inventory(null, true)`.
**Change:** `display_inventory` calls `display_pickinv_reply` with `want_reply`. PICK_NONE bells letters. Headings use `add_menu_heading` gameover `ATR_NONE`.
**Verify:** `node scripts/verify.mjs --fn inuse_classify --full` → PASS syntax (3 js files); PASS rule2; PASS hidden verify inuse_classify: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS (explore-seed0015-valk-level2-pit-dog-wait-49ecd01f PASS; explore-seed0700-samurai-explore-descend-b922c948 PASS); PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (--full). VERIFY: PASS
**Named:** `inuse_classify` body was already D-1589 (not this C-wrong). perm_invent `InvInUse` still D-1600. `invent_lines` remains exported. n==0 pickinv `"Not carrying anything appropriate."` vs C `"Not carrying anything."` for full invent.
**Next:** Open `dothrow.c` `dofire` (2 corpus blocks). Do not reopen the one-shot `display_inventory` dismiss or gameover heading inverse.
