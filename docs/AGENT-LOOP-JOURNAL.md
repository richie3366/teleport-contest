# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-05 — D-1859 hack.c moverock_core Sokoban diagonal won't-roll

**C locus:** `hack.c` `moverock_core` `:441–448` (`Sokoban && u.dx && u.dy` → Blind `feel_location(sx,sy)`, `pline("%s won't roll diagonally on this %s.", The(xname(otmp)), surface(sx,sy))`, `cannot_push`); `surface` `dungeon.c:1750`; `Sokoban` ≡ `level.flags.sokoban_rules` (`rm.h:538`).
**JS:** `js/hack.js` `moverock_core` + `surface` import; `js/sit.js` `surface` export.
**Change:** port the arm in C order (inside clear-dest branch, after ttmp/mtmp fetch, before revive_nasty/monster): `Sokoban_here() && u.dx && u.dy` → Blind `feel_location`, awaited pline with `The(xname(otmp))` + shared `surface(sx,sy)`, `return cannot_push(...)`. Promote `sit.js` `surface` (fullest `dungeon.c` clone: air/cloud/fountain/altar/headstone/wall/doorway/floor/ground) to the shared export instead of writing clone #5; import in `hack.js` (same 87-module SCC, runtime-only call, no top-level read).
**Verify:** `node scripts/verify.mjs --fn moverock_core` → PASS syntax (2 files) · rule2 · hidden 2 PASS / 0 moved / 0 unchanged / 0 worse → PROGRESS (both sessions PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed).
**Named:** shop `costly` computation, `revive_nasty`, trap/teleport/pool arms, Levitation/verysmall Blind feels, tunneling chew, `y_monnam` steed wording (all still deferred in the `moverock_core` envelope).
**Next:** Open `mkroom.c` `fill_zoo` (queue head after this ships).
## 2026-09-05 — D-1858 mkmaze.c makemaz Sam-strt/loca/goal/fila/filb load_special (Samurai quest 5/5)

**C locus:** `dat/Sam-strt.lua` / `Sam-loca.lua` / `Sam-goal.lua` /
**JS:** `js/mklev.js` `load_sam_strt` / `load_sam_loca` / `load_sam_fila` /
**Change:** `load_sam_strt` from the lua body: solidfill STONE +
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location` for water-likers;
**Next:** Open `hack.c` `moverock_core` (2 corpus blocks). Not Sam.
## 2026-09-05 — D-1857 uhitm.c mhitm_ad_slee sleep attack (mhitu rn2(5) vs knockback rn2(3))

**C locus:** `uhitm.c:3479–3522` `mhitm_ad_slee` (homunculus
**JS:** `js/mhitm.js` `mhitm_ad_slee` + `mdamagem` AD_SLEE case
**Change:** port the three arms with C branch/RNG order. `js/mhitm.js`
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_slee` → PASS
**Named:** `defended(mon, AD_SLEE)` orange-scales/artifact
**Next:** Open `mkmaze.c` makemaz `Sam-strt`/`-loca`/`-goal`/`-fila`/`-filb`
## 2026-09-05 — Audit reviews 818–826 (D-1848…D-1856, no port)

**Scope:** every `js/` commit since review 817, oldest first, one file
per SHA written as that SHA finished. 818 ACCEPT (813 Must-fix held:
2 PASS + 2 moved past on re-run). 819 ACCEPT (mineralize 2 PASS
reproduced). 820 ACCEPT (PICK_ONE/PICK_NONE = `wintty.c:1353/:1738`).
821 ACCEPT (full `dofire` envelope, 2 PASS reproduced). 822
ACCEPT-WITH-DEBT (Val 5/5 maps byte-equal; flip-lregion stays standing
`data.md:696` debt). 823 ACCEPT (knox uses storing `l_levregion`,
flipped correctly). 824 ACCEPT (collapse = prefix+found=5 chain, 2
PASS + 2 moved reproduced). 825 ACCEPT (callee live, not stubbed).
826 ACCEPT (bigrm-2 arms mirror unlit rects, 1 moved reproduced).
**No Must-fix, no STOP.** Rule #2 clean.
**Score:** full `sessions` 44/44, Scr 11,405/11,405, RNG
792,838/792,838, speed `47+0.36/turn`. Hidden proxy 230/265 (86.8%)
excl. 13 env; RNG 99.44%, screens 99.2%. Top: hitum/moverock/`mhitm_ad_phys`/remarm/`!`/dog_invent 2.
**Next:** Open `uhitm.c` mhitm_ad_slee (1 corpus block) per queue.
**Scoreboard note:** full `hidden-proxy score` reproduced 230/278 twice
(deterministic); two still-failing rows match more screens on current
code (seed0015-eb7e90ad 33→70/72, seed2200-d38fcac6 217→256/258) —
downstream realignment, unattributed to one SHA. Not staged: this
commit stays docs-only; the next port iter refreshes those rows with
its own verify. PASS/RNG/screen aggregates cited above are identical
with or without that file.
## 2026-09-05 — D-1856 sp_lev.c lspo_replace_terrain bigrm-2 ice replace on darkness:grow()

**C locus:** `dat/bigrm-2.lua` (`des.replace_terrain({ selection =
**JS:** `js/mklev.js` `load_bigrm_2` (+22/−2).
**Change:** build the darkness selection per choice arm (absolute
**Verify:** `node scripts/verify.mjs --fn lspo_replace_terrain` → PASS
**Named:** none new. bigrm-2 `flip_level_rnd` (noflip),
**Next:** Open `uhitm.c` mhitm_ad_slee (1 corpus block); new owner
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
