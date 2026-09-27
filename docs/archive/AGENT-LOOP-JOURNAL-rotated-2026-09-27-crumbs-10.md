# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-27 — D-2953 `add_mon_to_reg` keeps one id and grows the monster list by five

**C locus:** `nethack-c/upstream/src/region.c:161–186` `add_mon_to_reg`. `mon_in_region` (`:209–218`) scans `i < n_monst`. A hit on anything other than `&mons[PM_LONG_WORM]` calls `impossible` with `m_monnam` and `m_id`, then returns; a long worm returns quietly so each segment is listed once (`:167–174`). When `max_monst <= n_monst`, `alloc` grows the buffer by `MONST_INC` (`region.h:55`, 5), the old ids are copied, the old buffer is `free`d, and `max_monst` increases (`:175–183`). The id is stored at `monsters[n_monst++]` (`:185`).
**JS:** `js/region.js` `mon_in_region` `:420`. `add_mon_to_reg` `:443`. Duplicate arm `:444–451`. Grow `:455–463`. Store `:465–466`. `MONST_INC` `:65`. `PM_LONG_WORM` `:69`. `remove_mon_from_reg` `:474`. Death shrink `:1074–1090`.
**Change:** One file-local `add_mon_to_reg` in that C order. `mon_in_region` scans `n_monst`. The long-worm arm returns.
**Verify:** `node scripts/verify.mjs --fn add_mon_to_reg` → PASS syntax (1 changed js file: js/region.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed; pass --full to force) · VERIFY: PASS.
**Named:** No arm of `add_mon_to_reg` is omitted. `replace_mon_regions` stays unwired (`#if 0`).
**Next:** `attrib.c` `redist_attr` (next Open — coverage row). Eight coverage rows remain after this archive, at the floor of 8, so nothing was refilled.

## 2026-09-27 — D-2952 `tty_putstr` clears `WIN_NOSTOP` on every message

**C locus:** `nethack-c/upstream/win/tty/wintty.c:2226–2301` `tty_putstr` `NHW_MESSAGE`. Urgent and `WIN_STOP` clears the window and the stop bit, then sets `WIN_NOSTOP` (`:2277–2282`). History off is `remember_topl` then `show_topl`; otherwise `update_topl`. `:2300` clears `WIN_NOSTOP` on every message, including one that did not set the urgent attribute. `tty_procs.wincap2` (`:111–125`) includes `WC2_URGENT_MESG | WC2_SUPPRESS_HIST` at `:119`. `putmesg` (`pline.c:72–77`) ORs `ATR_URGENT` / `ATR_NOHISTORY` only when those bits are set.
**JS:** `js/display.js` `putstr` `:8126`. Urgent arm `:8133–8146`. Clear `:8147–8151`. `install_tty_wincap2` `:8170`. `putmesg` `:8190`. Capability read `:8193`. Caller `pline_after_consume` `:8232`. Install at `js/allmain.js:207`. Fallback `js/options.js` `windowprocs_wincap2` `:1068`.
**Change:** `install_tty_wincap2` stores only those two bits. `putmesg` reads that value, so `URGENT_MESSAGE` sets `ATR_URGENT` and `SUPPRESS_HISTORY` sets `ATR_NOHISTORY`. `putstr` clears `_win_nostop` at the end of every message-window call, after `update_topl`'s own `more()` and before the trailer.
**Verify:** `node scripts/verify.mjs --fn tty_putstr` → PASS syntax (4 changed js files: js/allmain.js js/cmd.js js/display.js js/options.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `HUPSKIP`; `WIN_ERR` / missing-window `tty_raw_print`; `compress_str` on non-message windows; `end_glyphout`; `NHW_STATUS` / `NHW_MAP` / `NHW_BASE` / `NHW_MENU` / `NHW_TEXT` (including the `:2416` wrap). The rest of `tty_procs.wincap2` (`:111–118` and `:120–125`: select-saved, hilite/flush/reset status, darkgray, statuslines, utf8, petattr, extracolors, extrastatus) stays off.
**Next:** `region.c` `add_mon_to_reg` (next Open — coverage row). Nine coverage rows remain after this archive, above the floor of 8, so nothing was refilled.

## 2026-09-27 — D-2951 `hliquid` gates on the timeout hallucination intrinsic

**C locus:** `nethack-c/upstream/src/do_name.c:1493–1510` `hliquid`. `hallucinate` is `Hallucination && !program_state.gameover` (`do_name.c:1496`). `Hallucination` is `youprop.h:116–120`: `u.uprops[HALLUC].intrinsic && !Halluc_resistance` (timeout only). The roll runs when that is true or `liquidpref` is null or empty. `count` starts at `SIZE(hliquids)` and increments when the pref is non-empty. `rn2_on_display_rng` (`rnd.c`). `IndexOk` (`hack.h:1498–1499`) failure returns `liquidpref`.
**JS:** `js/do_name.js` `hliquid` `:391`. Gate `:392` (`js/display.js:1095`). Empty arm `:394`. Extra choice `:398–400`. Display roll `:401`. `IndexOk` `:403–405`. Return pref `:407`.
**Change:** One exported `hliquid` keeps that C order and calls `display.js` `Hallucination`. `imports.mjs --can js/do_name.js js/display.js Hallucination` was ALREADY. The import is aliased because this file still exports the sticky reader.
**Verify:** `node scripts/verify.mjs --fn hliquid` → PASS syntax (1 changed js file: js/do_name.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (do_name.js is not on the shared-file list) · VERIFY: PASS.
**Named:** No arm of `hliquid` is omitted. The same-file `Hallucination` (`do_name.js:265`) stays the sticky reader; `hcolor`, `rndcolor`, `x_monnam`, and `distant_monnam` in this file, plus importers in `hack.js`, `uhitm.js`, `apply.js`, `zap.js`, `dothrow.js`, `teleport.js`, and `spell.js`, still call it.
**Next:** `wintty.c` `tty_putstr` (next Must-fix). Nine coverage rows remain after this archive, above the floor of 8, so nothing was refilled.

## 2026-09-27 — Audit 1901–1909 (D-2942…D-2950)

Nine JS SHAs after review 1900 (`e2b2ded6d`). Seven **ACCEPT**: `can_fog`, `reset_justpicked`, `deliver_by_window`, `dungeon_branch`, `Shirt_on`, `maybe_reset_pick`, `mkfount`. Two **QUALITY-RISK**: `hliquid` (sticky `Hallucination` at `do_name.js:260`, not `youprop.h:116–120`) and `putmesg` (`putstr` clears `WIN_NOSTOP` only when `ATR_URGENT` is set; tty `wincap2` at `wintty.c:119` is unset). Must-fix prepended; next is `hliquid`. Public `sessions` 44/44, Scr 11,405/11,405, RNG 792,838/792,838, speed `257+1.53/turn` (R² 0.762). Held-out still 12/44 (6,442/11,265, RNG 31.5 %, screens 57.2 %). Private corpus 12/12.

## 2026-09-27 — D-2950 `mkfount` places the fountain through set_levltyp before the blessed draw

**C locus:** `nethack-c/upstream/src/mklev.c:2285–2300` `mkfount`. `find_okay_roompos` (`mklev.c:2302–2314`) failing returns before any terrain write. `set_levltyp(m.x, m.y, FOUNTAIN)` (`mkmaze.c:76–121`) failing returns before `rn2(7)` and before `nfountains++`. `!rn2(7)` sets `blessedftn`, which is the `horizontal` bit (`rm.h:404`). Then `svl.level.flags.nfountains++`.
**JS:** `js/mklev.js` `mkfount` `:32456`. Position `:32457`. `find_okay_roompos` `:32459` (body `:32282`). `set_levltyp` `:32463` (`js/trap.js:864`). `rn2(7)` `:32466`. Blessed writes `:32467–32469`. `nfountains++` `:32472`.
**Change:** One file-local `mkfount` in that C order. `set_levltyp` is the existing `trap.js` export (already imported). A false return skips the draw and the increment.
**Verify:** `node scripts/verify.mjs --fn mkfount` → PASS syntax (1 changed js file: js/mklev.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (8 baseline-PASS sessions reach it, 8 run, 2.9s: 8 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** No arm of `mkfount` is omitted. `set_levltyp` still adjusts `nfountains`/`nsinks` by ±1 instead of `count_level_features` (`mklev.c:828–841`) and still omits SDOOR→AIR.
**Next:** `region.c` `add_mon_to_reg` (next Open — coverage row). Nine coverage rows remain after this archive, above the floor of 8, so nothing was refilled.

## 2026-09-27 — D-2949 `maybe_reset_pick` clears lock context for a deleted or left-behind box

**C locus:** `nethack-c/upstream/src/lock.c:269–285` `maybe_reset_pick`. A non-null `container` resets only when `container == gx.xlock.box`. A null `container` resets when `!gx.xlock.box || !carried(gx.xlock.box)`. `carried` is `obj.h:332` (`where == OBJ_INVENT`). The only callee is `reset_pick`.
**JS:** `js/lock.js` `maybe_reset_pick` `:367`. Box read `:379`. Ternary `:380–381`. `carried` `:381` (`js/eat.js:2617`). `reset_pick` `:382` (body `:347`).
**Change:** One exported `maybe_reset_pick` in `js/lock.js` in that C order. The null arm calls `eat.js` `carried` (hoisted; `imports.mjs --can lock.js eat.js carried` SAFE). `reset_pick` is the same-file export.
**Verify:** `node scripts/verify.mjs --fn maybe_reset_pick` → PASS syntax (5 changed js files: js/do.js js/lock.js js/mkobj.js js/shk.js js/wizcmds.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** No arm of `maybe_reset_pick` is omitted. A missing `game.xlock` is a null box; C's `gx.xlock` is a struct.
**Next:** `mklev.c` `mkfount` (next Open — coverage row). Ten coverage rows remain after this archive, above the floor of 8, so nothing was refilled.
