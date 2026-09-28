# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
