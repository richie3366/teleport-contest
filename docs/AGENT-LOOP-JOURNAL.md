# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-29 — D-3074 zap.c breadth cluster: boxlock_invent + item_what + zhitu ports; obj_shudders/adtyp_to_prop/zombie_can_dig verified complete

**C locus:** - `boxlock_invent`: nethack-c/upstream/src/zap.c:2687–2702
**JS:** js/lock.js `boxlock_invent`; js/invent.js `item_what` (+`adtyp_to_prop` verified); js/do_wear.js `boots_simple_name` export; js/zap.js `zhitu` (+`obj_shudders`, `zombie_can_dig` verified)
**Change:** - `boxlock_invent`: `boxing` flag in C order (`:2691–2699`, snapshot ≡ `nextobj` pre-fetch) + `update_inventory()` when hit (`:2700–2701`); added to the existing lock→invent import (no new edge)
**Verify:** `node scripts/verify.mjs --fn boxlock_invent,obj_shudders,adtyp_to_prop,item_what,zombie_can_dig,zhitu` → VERIFY: PASS — syntax 4 files · rule2 clean · hidden: no corpus session blocked on any (expected for coverage rows) · reach: zhitu 17/17 baseline-PASS reachers PASS → REACH-OK, other five smoke spread 24/24 each → REACH-OK · green 2/2 · strict seed8000 + seed0900 · cohort 7/7 · full skipped by detector so ran `node frozen/ps_test_runner.mjs sessions` → 44/44 PASS (RNG 792,838/792,838, screens 11,405/11,405). No new headless test — the maintained gate for breadth ports is per-function REACH + full suite (D-3070–3072 precedent); a query_color-style test is disproportionate here since every new arm is session-reached.
**Named:** - `boxlock_invent`: none — whole body; `!obj` guard kept (C NONNULLARG1, defensive)
**Next:** pop the next Open — coverage row
## 2026-09-29 — D-3073 `query_color` PICK_ONE menu-earlier (review 2031 C-wrong)

**C locus:** nethack-c/upstream/src/coloratt.c:505–508 (`query_color` pick_cnt==2 arm) + win/tty/wintty.c:1755–1759 (letter-press toggles + finishes, no PICK_ONE deselect) and :2808–2817 (picks gathered in menu order) ⇒ C ≡ menu-earlier(preselected, explicit)
**JS:** js/options.js `query_color` (:5209) + corrected doc comment; new headless test scripts/query-color-pick-one.test.mjs (5 cases: both menu orders, NO_COLOR path, Enter-preselected, ESC)
**Change:** after the helper returns explicit Y with dflt X≠NO_COLOR, index-compare in MENU_COLORNAMES (≡ C colornames[] pre-alias order, verified both sides) and return X when Y sorts strictly after X; NO_COLOR-default path unchanged (C then always yields explicit — picks[0]=Y since "no color" sorts last). Enter/ESC/own-letter arms unchanged (same values as C pick_cnt==1/0/-1).
**Verify:** `node --test scripts/query-color-pick-one.test.mjs` → 1 fail pre-fix (black+green-letter), 5/5 post-fix. `node scripts/verify.mjs --fn query_color` → VERIFY: PASS — syntax 1 file (js/options.js) · rule2 clean · hidden: no corpus session blocked (expected — review found it by audit, no corpus reach) · reach: no RNG-tagged reach, smoke spread 24/24 PASS → REACH-OK · green 2/2 · strict seed8000 + seed0900 · cohort 7/7 · full 44/44 (auto: shared file changed)
**Named:** none new — whole readback now C-faithful; botl.c:4234 caller stays with the pre-existing `status_hilite_menu_add` omission
**Next:** none — Must-fix closed; review 2031 stamped
## 2026-09-29 — Audit 2024–2032 (D-3064..D-3072): 8 ACCEPT, 1 QUALITY-RISK; full cadence

**Reviews:** 2024 fd2badce9 ACCEPT, 2025 709b8aea7 ACCEPT, 2026 1b84498a2 ACCEPT, 2027 b93547133 ACCEPT, 2028 774d64d58 ACCEPT, 2029 3bee10e1d ACCEPT, 2030 9e3e6255b ACCEPT, 2031 7e25e3c42 QUALITY-RISK (query_color PICK_ONE resolves explicit-pick-after-default to explicit; C coloratt.c:505–508 resolves to menu-earlier — D-3071 "provably dead" proof insufficient, review-2007 citation empty; Must-fix prepended), 2032 aa12e06ff ACCEPT.
**Cadence:** public 44/44 (Scr 11,405/11,405, RNG 792,838/792,838, `267+1.61/turn` R² 0.77); corpus rescore 631/953, RNG 96.04 %, screens 88.9 %, 0 flips, `full: true`; held-out 12/44 (board 2026-09-28T19:33Z, unchanged); ledger snapshot + seeded sample 5/5 sound.
**Next:** Must-fix query_color menu-earlier ships alone next port iter.
## 2026-09-29 — D-3072 sounds.c `release_sound_mappings` port; `mcould_eat_tin` + `get_dgn_align` retired stale

**C locus:** - `release_sound_mappings`: nethack-c/upstream/src/sounds.c:1675–1690 (`#ifdef USER_SOUNDS`, source-level port per the D-2776 file note)
**JS:** js/sounds.js `release_sound_mappings` (after `add_sound_mapping`, file order); no new import (`regex_free` already used at add_sound_mapping `:1596` arm)
**Change:** - `release_sound_mappings`: new export in js/sounds.js in C order — `:1678` nextsound pre-NULL, `:1680–1686` while-loop (next `:1681`, live `regex_free` `:1682`, frees-as-unlink `:1683–1684`, advance `:1685`), `:1688–1689` sounddir null under the if; C `free` ≡ unlink (GC collects, free_menu_coloring D-3071 precedent)
**Verify:** `node scripts/verify.mjs --fn release_sound_mappings` → VERIFY: PASS — syntax 1 file (js/sounds.js) · rule2 clean · hidden: no corpus session blocked (expected for a coverage row) · reach: no RNG-tagged reach, smoke spread 24/24 PASS → REACH-OK · green 2/2 · strict seed8000 + seed0900 · cohort 7/7 · full skipped (no shared file)
**Named:** - `release_sound_mappings`: none in-body — whole body; sole C caller `freedynamicdata` unported (save-freeing teardown, map-named)
**Next:** pop the next Open — coverage row (`zap.c boxlock_invent` at ship time)
## 2026-09-29 — D-3071 coloratt.c breadth cluster: free_menu_coloring port; query_attr/query_color verified complete; add_menu_coloring_parsed partial; alternative_palette by-design

**C locus:** - `free_menu_coloring`: nethack-c/upstream/src/coloratt.c:664–680
**JS:** - `free_menu_coloring`: js/options.js:4505 (exported)
**Change:** - `free_menu_coloring`: new export in C order — do-loop over both chains (`:668–679`), regex_free per node, unlink ≡ C free (GC)
**Verify:** `node scripts/verify.mjs --fn free_menu_coloring,query_attr,query_color,add_menu_coloring_parsed` → VERIFY: PASS
**Named:** - `free_menu_coloring`: none in-body — whole body; sole C caller `freedynamicdata` unported (see Callers)
**Next:** pop the regenerated head.
## 2026-09-28 — D-3070 teleport.c enexto_core null-mdat arm + set_mon_data; tele_jump_ok, dotelecmd, m_blocks_teleporting verified complete

**C locus:** - `enexto_core`: nethack-c/upstream/src/teleport.c:219–276 (NEW_ENEXTO live; `:281–376` is the uncompiled `#else`)
**JS:** - `enexto_core`: js/teleport.js:631 (exported)
**Change:** - `enexto_core`: null-mdat default via live `mons(game.u?.umonster)`; zeromonst-literal + live `set_mon_data` import (imports.mjs SAFE, hoisted, call-time use); `:227–229` no-mask and `:274–276` fail-arm cites
**Verify:** `node scripts/verify.mjs --fn enexto_core,enexto,enexto_gpflags,tele_jump_ok,dotelecmd,m_blocks_teleporting --reach-all` → VERIFY: PASS
**Named:** - `enexto_core`: `:232` debugpline0 + `:274` debugpline4 (D_DEBUG-only, repo precedent); `:281–376` `#else` body not compiled (live build is NEW_ENEXTO)
**Next:** pop the regenerated head.
## 2026-09-28 — D-3069 options.c visuals/windowcolors closure: reset_needed_visuals + wc_set_window_colors + optfn_windowcolors + wc_color_name + reset_customcolors + clear_all_glyphmap_colors

**C locus:** - `reset_needed_visuals`: nethack-c/upstream/src/options.c:8979–9014
**JS:** - `reset_needed_visuals`: js/options.js:8652 (local, async — docrt/bot)
**Change:** - `reset_needed_visuals`: restarted whole in C order — full 4-flag gate, palette clear, customcolors/customsymbols/redraw arms with reglyph_darkroom, promptstyle guard, botl, all five clears
**Verify:** `node scripts/verify.mjs --fn reset_needed_visuals,optfn_windowcolors,wc_set_window_colors,wc_color_name,reset_customcolors,clear_all_glyphmap_colors` → VERIFY: PASS
**Named:** - `reset_needed_visuals`: reset_glyphmap(gm_optionchange) `:8983` (CURRENT ban); change_palette() `:8989` (`#ifdef CHANGE_COLOR` not compiled — windconf.h:29 commented out, only Amiga amiconf.h:165 defines it; sole other caller allmain.c:716 is inside the same ifdef); adjust_menu_promptstyle `:9004` (by-design, no scored analogue)
**Next:** pop the regenerated head.
## 2026-09-28 — D-3068 timeout.c trio: print_queue VERBOSE arm + cleanup_burn + property_by_index

**C locus:** - `print_queue`: nethack-c/upstream/src/timeout.c:2014–2037 (live arm `:2024–2028` under unconditional `#define VERBOSE_TIMER :1963`; names from timeout_funcs `:1978–1990` in enum timeout_types order)
**JS:** js/timeout.js:1828 `cleanup_burn`, js/timeout.js:2531 `property_by_index`, js/timeout.js:2590 `print_queue` (+ fmt_timer_arg TIMER_MONSTER arm); js/mkobj.js:1452 `TIMEOUT_FUNC_NAMES` export; js/ +81/−93 across 3 files; scripts/timeout-trio.test.mjs (8 its)
**Change:** print_queue prints the live `name(ptr)` arm via the shared TIMEOUT_FUNC_NAMES (newly exported from mkobj.js — no clone #2); new exported `cleanup_burn` in timeout.js (C order, end_burn `void impossible` precedent for the async-in-sync arm), stop_timer/obj_stop_timers/spot_stop_timers dispatch on the doomed/node func_index like C; new exported `property_by_index` in timeout.js with sentinel-synthesis clamp, both wizintrinsic sites call it, wizcmds table clone deleted (−70 lines, tables diffed identical first)
**Verify:** - `print_queue`: `verify --fn` hidden note (no corpus session blocked, expected for coverage) + REACH-OK (no RNG-tagged reach; smoke spread 24/24 PASS)
**Named:** - `print_queue`: none — the `!VERBOSE_TIMER #%d` arm is not compiled (C :1963); %p renders o_id/m_id/a_long (no heap pointers in JS — live fmt_ptr precedent)
**Next:** burn_object (timeout.c:1383–1680, ledger unknown PARTIAL C209/JS154) is the remaining same-file gap — hot lamp function, 19 C callees, ships as its own iteration
## 2026-09-28 — D-3067 `unmakemon` (makemon.c:1514–1539) + `nasty` caller wiring

**C locus:** `unmakemon`: nethack-c/upstream/src/makemon.c:1514–1539 (countbirth :1519, mndx :1520, born untally :1525–1528 with the 255-cap carve-out, unique un-extinct :1529–1530, mhp=0 :1532, discard_minvent(TRUE) :1536, mongone :1538, return 0 :1539); sole C caller wizard.c:677 `nasty`
**JS:** js/makemon.js:3656 (`unmakemon`; `monsndx` + `discard_minvent`/`mongone` added to pre-existing mondata/mon imports — no new edges); js/wizard.js:7,154 (import + wired call)
**Change:** new exported `async unmakemon(mon, mmflags)` in js/makemon.js in C order with per-arm `:line` cites — countbirth from MM_NOCOUNTBIRTH (:1519), mndx via live `monsndx` (:1520), mvitals entry ensured like `propagate` (C svm.mvitals[] always present), born decrement guarded `> 0 && < 255` (:1525–1528), G_UNIQ → mvflags `&= ~G_EXTINCT` (:1529–1530), mhp=0 (:1532), live `discard_minvent(mon, true)` (:1536), `await` live `mongone(mon)` (:1538, async only for its unstuck/mdrop_special_objs awaits), return null (:1539); wired the `nasty` arm to `mtmp = await unmakemon(mtmp, NO_MM_FLAGS)`
**Verify:** `node scripts/verify.mjs --fn unmakemon` → VERIFY: PASS (syntax 2 files; rule2 clean; hidden note — no corpus session blocked, expected for coverage rows; reach — no RNG-tagged reach, fixed smoke spread 24/24 PASS → REACH-OK; green 2/2; strict both; cohort 7/7; full 44/44 auto on shared change). New scripts/unmakemon.test.mjs: 4/4 pass (unmake+unt tally, MM_NOCOUNTBIRTH, 0/255 bounds, unique un-extinct)
**Named:** `unmakemon`: none — every arm ported, every callee live (`monsndx`, `discard_minvent`, `mongone`)
**Next:** pop the regenerated coverage head
## 2026-09-28 — D-3066 shk.c breadth cluster: onbill/restshk/cad/pacify_shk/rouse_shk/use_unpaid_trapobj + 9 stale

**C locus:** - `onbill`: nethack-c/upstream/src/shk.c:1136–1155 (whole body — shkp-guarded billct walk `:1140–1150`, paid-on-bill impossible `:1147–1148`, unpaid-not-on-bill impossible `:1152–1154`).
**JS:** js/shk.js:245 (pacify_shk), :271 (new restshk), :1878 (cad), :3769 (onbill), :4950 (rouse_shk); js/apply.js:4902 (use_unpaid_trapobj); js/do.js:1338 (assign_level export); js/lev_json.js:32 (import), :195 (deserMon ghostly), :799 (fmon); js/bones.js:650 (ghostly opt).
**Change:** onbill restructured to C order with fire-and-forget impossible arms (same_price precedent); new exported restshk in shk.js (strncmpi/assign_level/poly_gender/muteshk imports — all pre-existing edges; assign_level/muteshk newly exported) wired in lev_json.js deserMon replacing the inline arm, with ghostly threaded deserLevel opts ← getlev_bones; cad rewritten in C order on the live poly_gender export (poly_gender_shk removed — it returned 0/1 where C returns 2 for neuter); pacify_shk walks bill_p/bill with `(price+3)/4` floor math; rouse_shk async with the verbosely pline + 6 site awaits; use_unpaid_trapobj full port (Deaf_hero/find_objowner/muteshk/SetVoice).
**Verify:** `node scripts/verify.mjs --fn onbill,restshk,cad,pacify_shk,rouse_shk,use_unpaid_trapobj` → VERIFY: PASS (syntax 5 files; rule2 clean; hidden notes — no corpus session blocked, expected for coverage rows; reach — no RNG-tagged reach, fixed smoke spread 24/24 PASS → REACH-OK all six; green 2/2; strict both; cohort 7/7; full 44/44 auto on shared change).
**Named:** - `onbill`: none — whole body, sole callee live, all C callers wired.
**Next:** dropped paints nothing further — shk.c eligible remainder is sub-threshold one-liners (replshk/is_fshk/sasc_bug/clear_no_charge*) and D-history secondary pool (remote_burglary, bill_box_content, cheapest_item); head moves to makemon.c unmakemon.
