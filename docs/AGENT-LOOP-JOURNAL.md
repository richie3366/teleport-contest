# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-28 — D-3046 `Hello` Valkyrie mail-daemon `Hallo` arm

**C locus:** - `Hello`: nethack-c/upstream/src/role.c:2120–2140 — Role_switch Knight :2123–2124, Samurai shk-gated :2126–2128, Tourist :2130–2131, Valkyrie mail-daemon-gated :2133–2136, default :2137–2138.
**JS:** - `Hello`: js/roles.js:767 (Valkyrie block :779–787); scripts/hello.test.mjs is new (4 node:test cases pinning the whole body in C order).
**Change:** expanded the Valkyrie arm in C order with per-arm `:line` cites: `mtmp && mtmp.data?.name === 'PM_MAIL_DAEMON'` → `'Hallo'`, else `'Velkommen'` — mirrors the Samurai arm's permonst identity check in the same function (monst `.data` is the mons() ptr object carrying `.name`; makemon.js:3279 / mondata.js:98 verified). No new imports, no new cross-module edges.
**Verify:** `node scripts/verify.mjs --fn Hello` → VERIFY: PASS — syntax 1 changed js file; Rule #2 clean; hidden note (no corpus session blocked — coverage row, expected); REACH smoke spread 24/24 PASS (Hello draws no RNG → REACH-OK); green 2/2; strict seed8000 + seed0900; cohort 7/7; full skipped (no shared file changed). Focused: `node --test scripts/hello.test.mjs` 4/4 — the Hallo subtest failed before the fix, passes after.
**Named:** - `Hello`: none — every arm ported, every callee live (0 C callees), every C caller wired.
**Next:** `handler_menu_headings` (options.c:5780–5792) heads the regenerated coverage block; `Goodbye` (role.c:2143–2157) verified complete in JS (all five farewell arms, js/roles.js:784) — stale-eligible, not shipped here.
## 2026-09-28 — D-3045 `furniture_detect` whole restart + `map_redisplay` C-order restore

**C locus:** - `furniture_detect`: nethack-c/upstream/src/detect.c:1091–1134 (staticfn; whole body in C order).
**JS:** js/detect.js `furniture_detect` :2461, `map_redisplay` :1327; imports extended (display.js: `glyph_to_cmap, There, Your, under_water, under_ground`; const.js: `M_AP_FURNITURE, S_upstair, S_fountain`); header omission lines updated.
**Change:** restarted `furniture_detect` whole with per-arm `:line` cites — `unconstrain_map()` :1097, `glyph_at`/`glyph_to_cmap` reads :1101–1102, `IS_FURNITURE(levl typ)` :1103–1105, `is_cmap_furniture` arm as the sym.h:104 macro expansion (`sym >= S_upstair && sym <= S_fountain`, not a function row — getpos.js:283 holds an equivalent local for its own use) with `m_at`/M_AP_FURNITURE/`seemimic` + `!mon || !canspotmon → map_invisible` :1107–1112, `glyph_at` re-read `revealed` :1114–1115, `There`/`Your` :1118–1123, `browse_map(TER_DETECT|TER_MAP|TER_TRP|TER_OBJ|TER_MON,"location")` :1129–1130, `map_redisplay` :1132, `return 0` :1133. Completed `map_redisplay` in C order: `reconstrain_map()` :96, `docrt()` :97, `Underwater → under_water(2)` :98–99, `uburied → under_ground(2)` :100–101; `flush_screen(1)` retained (pre-existing screen-model flush). No new cross-module edges (display.js/const.js already statically imported; `imports.mjs --can` confirms).
**Verify:** `node scripts/verify.mjs --fn furniture_detect,map_redisplay` → VERIFY: PASS — syntax 1 file; Rule #2 clean; hidden: no corpus session blocked on either (coverage rows, expected); REACH smoke spread 24/24 PASS both (REACH-OK); green 2/2; strict seed8000 + seed0900; cohort 7/7; full skipped (no shared file changed).
**Named:** - `furniture_detect`: C :1126 `display_nhwindow(WIN_MAP, TRUE)` — no JS `display_nhwindow` export exists (sym.mjs); `!revealed` arm falls through to `map_redisplay`.
**Next:** `def_char_is_furniture` `}` fountain gap (review 81 §furniture_detect) still routes `}` gazes to objclass/level_detects + `rn2(4)`; own row, different file (drawing.c).
## 2026-09-28 — D-3044 `cloak_simple_name` caller wiring + `cannot_push_msg` stale

**C locus:** - `cannot_push_msg`: nethack-c/upstream/src/hack.c:247–259 — `the(xname)`, usteed `YMonnam` arm, `You` arm, `Blind → feel_location`. Stale, no code change.
**JS:** - `cannot_push_msg`: js/hack.js:234 unchanged (stale).
**Change:** deleted both twins, added `cloak_simple_name` to the existing `./do_wear.js` imports (both edges already existed — no new cycle); wired the five do_wear arms with per-arm `:line` cites (shirt arm keeps C `(uarm && !uarmc) ? c_armor("armor")` ternary); W_ARMC arm calls the canonical. Same-statement suit guard arm wired to live `suit_simple_name` (C do_wear.c:1787–1789, C-verbatim port).
**Verify:** - `cannot_push_msg`: stale — no verify (ledger note only).
**Named:** - `cannot_push_msg`: none.
**Next:** `furniture_detect` (detect.c:1091–1134) heads the regenerated coverage block.
## 2026-09-28 — D-3043 `read.c` stale pair + `end.c` save_killers/restore_killers JSON-analogue pair

**C locus:** - `hawaiian_motif`: nethack-c/upstream/src/read.c:189–221 — 16-entry `hawaiian_motifs[]` `:192–209`, `motif = o_id ^ ubirthday` `:217`, index `% SIZE` `:219`. Stale, no code change.
**JS:** - `hawaiian_motif`: js/objnam.js:588 export, sync — unchanged.
**Change:** stale pair untouched (ledger notes only). New sync exports `save_killers`/`restore_killers` in js/end.js after `dealloc_killer` (C-adjacent): JSON analogues on the save_oracles precedent — records carry the struct's data fields (hack.h `:598–606` id, format, name), sentinel first, C-order loop; VFS always writes so no update_file gate. Wired into js/save.js via the existing lazy save→end edge: `killers: save_killers()` in the dosave0 payload (save.c `:293` analogue) + `restore_killers(payload.killers)` after `restore_oracles` in try_restore_save (restore.c `:653` analogue).
**Verify:** `node scripts/verify.mjs --fn save_killers,restore_killers` → VERIFY: PASS — hidden: none blocked on either (expected for coverage rows); REACH-OK ×2 (smoke spread 24 PASS each); syntax 2 files (js/end.js js/save.js); rule2 clean; green 2/2; strict ×2; cohort 7/7. Plus: /tmp killer round-trip probe (3-node chain → records → rebuild → identical; missing/empty key keeps live sentinel; `find_delayed_killer` walks restored chain) KILLER-ROUNDTRIP-OK; seed0013 save-then-restore direct: PASS RNG 4804/4804 screens 99/99.
**Named:** - `hawaiian_motif`: `hawaiian_design` (read.c:223–252, different `~ubirthday` hash + `hawaiian_bgs[]`) — unported staticfn, sole unwired caller; already cited in the JS doc comment + read.js map header.
**Next:** head moves to `hack.c` cannot_push_msg (next coverage row after save_killers ships).
## 2026-09-28 — D-3042 `muse.c` necrophiliac by-design (`#if 0`) + `explode.c` adtyp_to_expltype whole

**C locus:** - `necrophiliac`: nethack-c/upstream/src/muse.c:2688–2703 — whole body sits inside `#if 0 … #endif` (identical in recorder tree); the only other reference is the comment at :1309, so it is never compiled and has no live caller.
**JS:** - `necrophiliac`: none — by-design, no symbol added.
**Change:** `necrophiliac` declared by-design, no code (porting `#if 0` C would add dead JS C never executes). Restarted `adtyp_to_expltype` whole as a C-order switch (same export name; now async since the default arm awaits the live async `impossible`). New file-local AD consts at js/explode.js:114–121 with monattk.h values (DREN 16, DRDX 30, DRCO 31, DISE 33, PEST 38, ENCH 41, SPEL 241).
**Verify:** `node scripts/verify.mjs --fn necrophiliac,adtyp_to_expltype` → VERIFY: PASS — hidden: none blocked on either (expected for coverage rows); REACH-OK ×2 (smoke spread 24 PASS each); syntax 2 files; rule2 clean; green 2/2; strict ×2; cohort 7/7.
**Named:** - `necrophiliac`: whole function — C `#if 0`, never compiled (muse.c:2688/2703, both trees).
**Next:** head moves to `read.c` hawaiian_motif (next coverage row after adtyp_to_expltype ships).
## 2026-09-28 — D-3041 `do.c` drop whole + `finesse_ahriman` port

**C locus:** - `drop`: nethack-c/upstream/src/do.c:714–780 — guards `:716–721`, unwield + welded weldmsg `:722–728`, quiver/swap `:729–734`, swallowed verbose into-monster pline `:736–751`, sink ring `:753–757`, levitating freeinv + hitfloor with levhack `:758–772`, altar-gated pline `:774–775`, how_lost + dropx `:777–779`.
**JS:** - `drop`: js/do.js:2887 export, async (pline/More reach).
**Change:** restarted `drop` whole in C order with per-arm `:line` cites (same export name/signature); new sync `finesse_ahriman` export in js/artifact.js in C position (after `get_artifact`, before `arti_speak`, mirroring artifact.c order). `ELevitation = W_ART` writes the flat and the uprops table slot (set_spfx_extrinsic convention); the probe saves/clears/restores both stores synchronously. New imports ride existing edges (do.js already imports artifact/do_name/objnam/polyself/wield/const modules; `s_suffix` taken from canonical do_name.js, not the mthrowu.js clone per D-2268).
**Verify:** `node scripts/verify.mjs --fn drop,finesse_ahriman` → VERIFY: PASS — hidden: none blocked on either (expected for coverage rows); REACH-OK ×2 (smoke spread 24 PASS each); syntax 2 files; rule2 clean; green 2/2; strict ×2; cohort 7/7; full 44/44 (auto: shared file changed).
**Named:** - `drop`: none — every arm ported, every callee live.
**Next:** head moves to `muse.c` necrophiliac (next coverage row).
## 2026-09-28 — D-3040 `options.c` mod-status family whole + donning stale

**C locus:** - `set_option_mod_status`: nethack-c/upstream/src/options.c:9854–9869 — `SET__IS_VALUE_VALID` guard + impossible `:9859–9861`, first prefix match sets `setwhere` `:9864–9867`.
**JS:** - `set_option_mod_status`: js/options.js:1087 export, sync.
**Change:** new exports in js/options.js in C order with per-arm `:line` cites. `SET__IS_VALUE_VALID` (global.h:603) reads valid but means invalid — ported as `status < SET_IN_SYSCONF || status > SET_WIZNOFUZ` (in-file consts, C values 0/6, verified against global.h:581–586). Sync like C; `void impossible(...)` per file precedent (disclosure arm).
**Verify:** `node scripts/verify.mjs --fn set_option_mod_status,set_wc_option_mod_status,set_wc2_option_mod_status` → VERIFY: PASS — hidden: none blocked (expected for coverage rows); REACH-OK ×3 (smoke spread 24 PASS each); green 2/2; strict ×2; cohort 7/7; full 44/44 (auto: shared file changed). Headless probe: allopt rows `perm_invent` idx127 / `perminv_mode` idx128 adjacent (first-match-wins verified — no earlier row prefix-matches; `perminv_mode` does not prefix-match `perm_invent`); valid/invalid/out-of-range statuses + full-mask wc fan-out run without throw.
**Named:** - `set_option_mod_status`: wintty.c:2965 `set_option_mod_status("perm_invent", set_gameview)` — compiled out (`#define RESIZABLE` wintty.c:39, call sits under `#ifndef RESIZABLE` :2964); no JS site by C design.
**Next:** pop the queue head next (refill regenerates the coverage block). Density note: ~66 js/ insertions — under the ~80 guide, but the head's file and callee closure hold nothing more Open (options.c has no other queue row; callees `impossible`/`str_start_is` are live), and the 2 same-file caller siblings shipped so every in-port caller of the head is wired.
## 2026-09-28 — D-3039 `quest.c` quest_chat whole + nemesis/guardian staticfns

**C locus:** - `quest_chat`: nethack-c/upstream/src/quest.c:472–492 — leader compare `:475`, chat `:476`, pissed follow-up `:478–479`, early return `:480`, msound switch `:482–491` (nemesis `:483–485`, guardian `:486–488`, impossible default `:490`).
**JS:** - `quest_chat`: js/quest.js export, restarted whole in C order (async — callees async).
**Change:** restarted `quest_chat` whole in C order with per-arm `:line` cites (bare `m_id` compare per C; `await setmangry(mtmp, false)` for C `FALSE`; `mtmp.data?.msound|0` switch with both arms + async `impossible('quest_chat: Unknown quest character %s.', mon_nam(mtmp))` default); new file-local `chat_with_nemesis` / `chat_with_guardian` staticfns in C order (C staticfns, sole caller `quest_chat`); `Qstat(met_nemesis++)` as `((qs.met_nemesis|0)+1)` under the `!qs.met_nemesis` guard; new `MS_GUARDIAN = 38` local const beside `MS_NEMESIS`; `setmangry` + `mon_nam` folded into the existing mon.js / do_name.js imports (no new edge); header omission lines retired.
**Verify:** `node scripts/verify.mjs --fn quest_chat,chat_with_nemesis,chat_with_guardian` → VERIFY: PASS — syntax (1 changed file) · Rule #2 · hidden notes (no corpus session blocked on any of the three at baseline) · REACH-OK all three (no RNG-tagged reach; smoke spread 24/24 PASS each) · green 2/2 + strict · cohort 7/7.
**Named:** - `quest_chat`: none — every arm ported, every callee live (`chat_with_leader`, `setmangry`, `qt_pager`, `impossible`, `mon_nam`).
**Next:** `quest.c` holds no further Open coverage rows (only quest_chat was queue-eligible; callees ported in-closure); review 1805's QUALITY-RISK (per-role nemesis/discourage tables for `com_pager_core`) stays with the questpgr extractor, not this cluster.
## 2026-09-28 — Audit 1990–1998 (D-3030…D-3038): 9 ACCEPT, 0 Must-fix; full cadence

**Scope:** all 9 js-touching SHAs since audit 1981–1989 (`2972f3ad5`…`a7a0f55e5`; docs-only `953aea809` skipped per the js-only rule). Each re-measured with `hidden-proxy verify --base <SHA>~1 --reach-all`: every claim matched (honest vacuous + smoke REACH-OK, zero REGRESSED).
**Finds:** none queueable. Two tool notes: `sym.mjs` misses export-list syntax (`bhito`, js/zap.js:6276 — verified live by direct read + module load); `lspo_region` comment block cites `:5603–5606` vs pinned `:5601–5604` (pre-existing +2 drift, comment-only).
**Score:** public 44/44 (RNG 792,838/792,838, Scr 11,405/11,405, `270+1.59/turn`); corpus 631/953 (66.2 %), RNG 96.04 %, screens 88.9 %, 0 unrecorded, 0 flips, board `full: true` @13:45Z; held-out 12/44, points 6,452→6,880 (RNG 33.6 %, screens 61.1 %). Ledger sample: 5 ported rows checked, 2 stale notes fixed (`restnames`, `find_montype` — both truly ported, statuses unchanged).
**Next:** pop the queue head (Must-fix empty).
## 2026-09-28 — D-3038 `o_init.c` objdescr_is whole: canonical export + 4-clone fold

**C locus:** - `objdescr_is`: nethack-c/upstream/src/o_init.c:352–365 — null guard `:356-359`, OBJ_DESCR fetch `:361` (objclass.h `:191`: obj_descr[oc_descr_idx].oc_descr), null-descr fallthrough `:362-363`, strcmp match `:364`.
**JS:** - `objdescr_is`: js/apply.js canonical export, restarted whole in C order.
**Change:** restarted the export whole in C order with per-arm `:line` cites; null arm keeps the `return FALSE` control flow and cites the impossible pline as omitted (async screen side effect in a sync hot path, D-2608 wall_angle precedent); split the null-descr fallthrough onto its own line; folded all 4 clones onto the canonical import (eat.js gains an apply.js edge inside the existing SCC, runtime-only use — no TDZ read).
**Verify:** `node scripts/verify.mjs --fn objdescr_is` → VERIFY: PASS — syntax (5 changed files), Rule #2, hidden note (no corpus session blocked), REACH-OK (no RNG-tagged reach; smoke spread 24/24 PASS), green 2/2, strict 2/2, cohort 7/7. No per-function unit file: the repo has no such harness; the maintained check is the session suite driven by verify (no new framework per durable-test-collateral).
**Named:** - `objdescr_is`: C `:357` impossible("objdescr_is: null obj") pline — omitted: impossible() is async while all 9 C call sites are sync boolean tests; return-FALSE control flow preserved; null path unreachable (extern.h notes callers rely on the FALSE return).
**Next:** o_init.c holds no further Open coverage rows (`rows --file o_init.c` = 0 eligible; remaining unknowns measured ok) and callee impossible() is partial, not Open — single-function cluster ships alone under the density exception (net -21 lines).
## 2026-09-28 — D-3037 `decl.c` decl_globals_init whole; `version.c` validate stale

**C locus:** - `decl_globals_init`: `decl.c:1080–1187` — 26 `g_init_*` copies (`:1085–1110`), 20 `init_sv*` copies (`:1111–1130`), valuables wiring (`:1132–1137`), 26 `MAGICCHECK`s (`:1142–1167`), `gs.subrooms` (`:1169`), seven `ZERO`s (`:1171–1177`), 17 worn-slot NULLs (`:1179–1181`), `WIN_* = WIN_ERR` (`:1183`), `urole`/`urace` sentinels (`:1185–1186`).
**JS:** `js/decl.js:1` (`decl_globals_init` at `js/decl.js:59`); call wired in `js/jsmain.js:103`.
**Change:** new `js/decl.js` `decl_globals_init()` in C order with per-arm `:line` cites: modeled `game.g*` namespaces (`ga,gb,gc,gd,gf,gg,gh,gi,gm,gn,go,gp,gr,gs,gu,gw`) + `svi`/`svc` return to fresh `{}` (C assigns unconditionally; `UNDEFINED_PTR/VALUE` are NULL/0 per `hack.h:1092–1094` and all use-site guards create bare `{}`); `flags`/`iflags`/`disp` fresh, `u` fresh with the 17 worn NULLs on it (worn slots live on `u` in JS), `ubirthday` 0, `urealtime` zeros, `WIN_* = WIN_ERR` (later `init_sound_disp_gamewindows` installs real ids).
**Verify:** `node scripts/verify.mjs --fn decl_globals_init` → VERIFY: PASS — syntax (2 files) · Rule #2 · hidden note (nothing blocked) · REACH-OK (no RNG-tagged reach; smoke 24/24) · green 2/2 + strict · cohort 7/7 · full 44/44 (auto: shared file changed).
**Named:** - `decl_globals_init`: unmodeled `g*` namespaces `ge,gj,gk,gl,gq,gt,gv,gx,gy,gz` (no JS readers/writers — nothing to reset); unmodeled `sv*` namespaces (only `svi`/`svc` modeled); 26 `MAGICCHECK`s incl. `raw_printf`+`exit` failure path (compile-time static-init validation; a JS literal either evaluates or throws at load); `gs.subrooms` freelist head (JS rooms are arrays + `nsubroom` counts); `gb.bones`/`gb.bughack` nonzero members (no JS readers); `ZERO(a11y)` (jsmain options parse owns zero-then-fill — pre-creating `{}` would suppress its `msg_loc` default guarded by `!g.a11y`); `urole`/`urace` sentinel tables split (`jsmain.js:214–215` placeholders + `roles.js:1296–1297` selection copy); `valuables` wiring split (`end.js reset_valuables`, lazily ensured); `dump_weights` caller (no JS counterpart).
**Next:** continue breadth queue head; `monst_globals_init` (`monst.c:72`, same `early_init` chain) is still unported in JS when its coverage row surfaces.
## 2026-09-28 — D-3036 `botl.c` stat_update_time + status_finish whole; t_warn stale

**C locus:** - `t_warn` (stale): `display.c:3452–3498` — 10-case typ→name switch + `impossible(warn_str, wname, wall_info & WM_MASK, seenv)` report.
**JS:** - `t_warn`: `js/display.js:3170` (file-local, unchanged).
**Change:** - `t_warn`: no code change — stale confirmed (switch whole, both C callers wired, `impossible()` cite per D-2608: `impossible()` is async, `wall_angle` a sync hot path).
**Verify:** `node scripts/verify.mjs --fn stat_update_time,status_finish` → VERIFY: PASS — syntax 2 files; rule2 clean; hidden notes (no corpus session blocked on either); REACH-OK both (no RNG-tagged reach; smoke 24 run, 24 PASS, 0 regressed each); green 2/2 + strict 2/2; cohort 7/7; full 44/44 (auto: shared file changed).
**Named:** - `stat_update_time`: `windowprocs.wincap2` registry (caps read 0; FLUSH arm skips as with a status-incapable windowport in C); `gv.valset` global mirror (fresh false shelf — only `[fld]` consumed); `status_update` dispatch stays the throwing named omit (`js/botl.js:905`).
**Next:** next coverage row.
## 2026-09-28 — D-3035 `stairs.c` stairway_add whole: exported extern + C-order restart

**C locus:** - `stairway_add`: `stairs.c:8–24` whole in C order — `:15` memset-zero then field assigns, `:16–17` sx/sy, `:18–19` up/isladder, `:20` u_traversed FALSE, `:21` assign_level tolev, `:22–23` prepend to gs.stairs.
**JS:** `js/mklev.js:395` `export function stairway_add`.
**Change:** restarted the export whole (`js/mklev.js:395`) with per-arm `:line` cites — `|0` on x/y (C `coordxy`), `!!` on up/isladder (C `boolean`; every reader uses truthiness), `tolev` copies dnum/dlevel only (assign_level-exact), prepend to `game.stairs`.
**Verify:** `node scripts/verify.mjs --fn stairway_add` → VERIFY: PASS — syntax 1 file; rule2 clean; hidden note (no corpus session blocked); REACH-OK (no RNG-tagged reach; smoke 24 run, 24 PASS, 0 regressed); green 2/2 + strict 2/2; cohort 7/7; full 44/44 (auto: shared file changed).
**Named:** - `stairway_add`: reststairs NHFILE restore loop (restore.c:978 + `u_traversed` fixup `:980–982`) — JS stash architecture, no NHFILE reader; getlev castle fixup (restore.c:1243–1255) — getlev-row work, not this function.
**Next:** next coverage row.
## 2026-09-28 — D-3034 `mkmaze.c` wall-spine closure: fix_wall_spines panic arm + C-name helpers

**C locus:** - `fix_wall_spines`: `mkmaze.c:229–287` whole in C order — `:243–246` spine table, `:252–253` bounds panic (new), `:256–261` wall/!DBWALL gate, `:264–268` loc_f pick, `:269–276` locale, `:278–281` NSEW bits via iswall, `:284–285` free-standing keep.
**JS:** - `fix_wall_spines`: `js/mklev.js:32463` (export, same signature).
**Change:** - `fix_wall_spines`: restarted export (`js/mklev.js:32463`) with per-arm `:line` cites; panic → `throw new Error('wall_extends: ...')` (NORETURN→throw matches trap.js deltrap idiom; keeps C's `wall_extends` message text); `if (!map) return` kept and marked JS-only (C levl always exists); panic check first in C order.
**Verify:** `node scripts/verify.mjs --fn fix_wall_spines,iswall,iswall_or_stone,okay,check_ransacked` tail pasted verbatim:
**Named:** none — every arm ported, every callee live, every C caller wired. (`extend_spine` pre-existing ledger-ported D-3014, untouched.)
**Next:** `mkmaze.c` holds no more Open (absent 4 resolved, PARTIAL head ported); queue head moves on.
