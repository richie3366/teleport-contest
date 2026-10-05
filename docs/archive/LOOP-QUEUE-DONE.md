# Loop queue done

Append-only archive of checked `LOOP-QUEUE.md` items. Newest date
first. Do not pop work from here. Live queue is unchecked-only.

## 2026-10-05

- [x] `apply.c` use_camera — C apply.c:97–98 s_suffix(mon_nam)+mbodypart(STOMACH) absent from js/apply.js:1036 (hardcoded `'s stomach`; s_suffix_apply live same-file; mbodypart ported; message-only; brief-read 2026-10-05) @18077a1c0
- [x] `pickup.c` carry_count — C pickup.c:1687 `gi.invent||umoney` NULL arm absent from js/pickup.js:1476 (`game.invent||umoney` — empty array truthy; message-only; brief-read 2026-10-05) @18077a1c0
- [x] `wintty.c` docorner — C wintty.c:3686 cl_end skip + :3716 botlx gate when ystart_between_menu_pages!=0 absent from js/display.js:7619–7634 (unconditional blank + bot; refresh-only paging arm; brief-read 2026-10-05) @18077a1c0
- [x] `apply.c` use_cream_pie — C apply.c:3584 live can_blnd(NULL,you,AT_WEAP,pie) absent from js/apply.js:1117 (can_blnd_cream_self subset :1070–1077 adds non-C ublindf gate — C pie checks EBlinded only :344–346; live can_blnd js/uhitm.js:359; toss-subset twin; brief-read 2026-10-05) @18077a1c0


- [x] D-3430 6-row repair: direct `ledger.mjs set` ×6, no JS (D-3427 protocol) — newgame/strncmpi/doset/Strlen_ ← D-3430 Named; sanity_check minus retired clause (by-design per review 2376); record_achievement ← SoundAchievement clause only. Source: reviews/loop-unattended/2375-9ec606a36-batch-d3430.md. **Addressed:** D-3440 `9e1efbc82`


- [x] `lock.c` doopen_indir — C lock.c:832–840 door->glyph learned half (oldglyph snapshot + newsym + glyph-compare → ECMD_TIME) absent from js/lock.js:doopen_indir (:919–923: lastseentyp half only; pick_lock :1421 cellGlyph precedent; brief-read 2026-10-05) @52e6ce3d0
- [x] `dothrow.c` toss_up — C dothrow.c:1297 live can_blnd AT_WEAP call; mondata.c:327–328 raven-self + :344–351 EBlinded(pie)/ublindf/ucreamed/visor(venom) gates absent from js/dothrow.js:can_blnd_toss_self subset (:1298–1304, caller :1655–1659; live can_blnd js/uhitm.js:359 covers all; brief-read 2026-10-05) @52e6ce3d0
- [x] `dokick.c` dokick — C dokick.c:1417–1418 unconditional show_glyph(x,y,oldglyph) restore absent from js/dokick.js:1725 in the !oldmem case (`&& oldmem` gate; review 1682 §1; display-only corner; brief-read 2026-10-05) @52e6ce3d0
- [x] `topl.c` more — C win/tty/topl.c:209–210 `if (iflags.debug_fuzzer) return` skip absent from js/display.js:more (:7871–7873: doc names it, only inmore guard live; flag live in JS; fuzzer-only; brief-read 2026-10-05) @52e6ce3d0


- [x] D-3431 `domove_core`/`goto_level` rows: direct `ledger.mjs set` ×2, no JS (D-3427 protocol) — restore D-3431 Named texts reconciled with D-3432 extensions (review 2377 verifies; details in review). Source: reviews/loop-unattended/2376-801b58f13-batch-d3431.md. **Addressed:** D-3438 `18077a1c0`


- [x] `ball.c` litter setnotworn bypass: js/ball.js:litter inlines a slot-nulling subset (drops twoweap/extrinsic/artifact/botl effects) — replace with the live `setnotworn` import from do.js (ALREADY edge; sync). Verify: gates + `verify litter` + wielded-artifact case. Source: reviews/loop-unattended/2374-adae017b4-batch-d3429.md. **Addressed:** D-3437 `12c181c41`
- [x] `do_wear.c` Helmet_on — C do_wear.c:465–472 HELM_OF_OPPOSITE_ALIGNMENT arm (uchangealign flip + fallthrough glow/curse) absent from js/do_wear.js:Helmet_on (:1307–1386: :1353–1355 deferred comment, uchangealign unported; brief-read 2026-10-04) @ca5a16a92 **Addressed:** D-3437 `12c181c41` (stale: arm live js/do_wear.js:1353–1364, D-3426)
- [x] `worn.c` setnotworn — C worn.c:182 update_inventory() absent from js/do.js:setnotworn (:516–556: tail :550–555 carries tux_penalty/botl/recalc, no update_inventory; doc :513 names it; brief-read 2026-10-04) @ca5a16a92 **Addressed:** D-3437 `12c181c41` (stale: live js/do.js:555, D-3426)
- [x] `trap.c` maketrap — C trap.c:482 LEVEL_TELEP && single_level_branch (Knox) refuse gate absent from js/trap.js:maketrap (:955–1097: :983 named omission; brief-read 2026-10-04) @ca5a16a92 **Addressed:** D-3437 `12c181c41` (stale: live js/trap.js:992, D-3431)
- [x] `trap.c` chest_trap — C trap.c:6361–6362 inside_shop(ux,uy) insider gate absent from js/trap.js:chest_trap (:7970–8161: :8009–8013 ushops/rooms-only insider, no inside_shop call; brief-read 2026-10-04) @ca5a16a92 **Addressed:** D-3437 `12c181c41` (stale: live js/trap.js:8079–8084)
- [x] `muse.c` find_misc — C muse.c:2151 nomore(x) (`if (has_misc == x) continue`, skips rest of obj) absent from js/muse.js:find_misc (:2222–2346: doc :2219–2220 names per-check `!==` instead of continue — later viable objs override earlier priority vs C first-arm-priority; brief-read 2026-10-04) @6e056005c **Addressed:** D-3437 `12c181c41` (stale: all 8 nomore continues live js/muse.js:2278–2339, D-3426)
- [x] `muse.c` use_misc — C muse.c:2453 `if (canspotmon(mtmp))` transparency gate absent from js/muse.js:use_misc (:3160–3187 INVIS arm tests `canseemon(mtmp)` at :3171, misrouting telepathy/sensemon-sensed monsters to the cannot-see + map_invisible branch; brief-read 2026-10-04) @011b251ee **Addressed:** D-3437 `12c181c41` (stale: live js/muse.js:3183, D-3426)
- [x] `wizard.c` pick_nasty — C wizard.c:547–549 rogue-level uppercase re-ROLL (Is_rogue_level && monsym not A-Z → second ROLL_FROM) absent from js/makemon.js:pick_nasty (:1196–1222: :1198 deferred comment, monsym table not wired; brief-read 2026-10-04) @c4d4e5278 **Addressed:** D-3437 `12c181c41` (stale: live js/makemon.js:1199 + monsym_isupper :1338, all 3 C callers wired)


- [x] D-3434 `getpos` row: direct `ledger.mjs set` ×1, no JS (D-3427 protocol) — restore getposx/y + muse/restore clean-room text (re-verified, quoted in review). Source: reviews/loop-unattended/2379-c62203c66-batch-d3434.md. **Addressed:** D-3436 `52e6ce3d0`

## 2026-10-04

- [x] launch_obj extras contradict C: (a) drop `|| IS_OBSTRUCTED(typ)` from the wall-stop (trap.js:2909; C trap.c:3556 stops at STWALL/TREE only — boulders roll through SDOOR/SCORR); (b) drop the tail `stackobj` (C :3568-72 has none; boulders never stack). Verify: gates + `hidden-proxy verify launch_obj --reach-all` + a targeted boulder-vs-secret-door test. Source: reviews/loop-unattended/2372-54eac58c5-batch-d3426.md (Must-fix 2).


- [x] D-3426 ledger truth: direct `ledger.mjs set` ×3 restoring the D-3426 Named omit texts on makemon (m_dowear fire-and-forget + starting-pet in_mklev observable-match), maketrap (TELEP_TRAP fixed-dest launchplace arm trap.c:566-574), mk_trap_statue (mongone donor cleanup stands in as local mongone_statue_donor) — all three rows currently carry doset's wc2_supported paste; re-verify each sub-omit still unshipped (D-3419 protocol), no JS change. Source: reviews/loop-unattended/2372-54eac58c5-batch-d3426.md (Must-fix 1).


- [x] `mons()` identity-compare family always-constant — `mons()` allocates a fresh object per call (measured: `mons(10)!==mons(10)`), so every pure `===/!== mons(PM_X)` is dead: js/dog.js:748 mon_arrive long-worm arm never fires (C dog.c:437–443 get_wormno/initworm lost on migration) + js/eat.js:2744,2745,2748 + js/trap.js:343 (C trap.c:753 pointer compare) + js/zap.js:3563,5276,5313 + js/wizard.js:158,159,429 — fix: mndx compare per site (meatbox/newcham idiom), each verified vs its C pointer-compare locus; leave or trim the dead arms at the 4 already-safe mndx-fallback sites (potion.js:3783, zap.js:3828/4480, priest.js:505) + verify incl. full (shared files). Source: reviews/loop-unattended/2355-e77f3975a-batch-d3401-vision-dungeon.md


- [x] `display.h` canseemon divergent clones — C display.h:117–120 `_canseemon` is `(worm?worm_known:(cansee||see_with_infrared))&&mon_visible` but js/dig.js:207 + js/monmove.js:1326 drop the infravision arm and use `!minvis` instead of mon_visible (no See_invisible/undetected), both CALLED (dig.js ×5:833/887/982/1131/1138; monmove :1112); js/monmove.js:1337 `canspotmon` drops the sensemon arm (C: canseemon||sensemon), called at :1601; live js/display.js:1097 + :1408 verified whole — fix: delete all 5 canseemon locals (dig/monmove/mthrowu:271/muse:331/trap:1132, last 3 exact dupes) + monmove canspotmon → import live exports; `ledger.mjs set canseemon ported --js js/display.js:canseemon` (D-3401 row wrongly points at the dig.js clone) + verify incl. full (shared files). Source: reviews/loop-unattended/2355-e77f3975a-batch-d3401-vision-dungeon.md


- [x] D-3410 ledger remainder homes missing (2362.1 still open after two iters) — makemon + wiz_show_nhuuid rows carry `- \`m_initgrp\`: none — whole.` instead of their D-3410 Named remainders: makemon m_dowear fire-and-forget (makemon.c:1445, js/makemon.js:3761 un-awaited) + starting-pet in_mklev observable-match (dog.js makedog awaits no appear msg); wiz_show_nhuuid svn.nhuuid value itself unported (js/wizcmds.js:2275-2278 doc); refresh m_initgrp's stale D-3409 note on the now-ported row — fix: direct `ledger.mjs set` ×3 (verify each sub-omit still unshipped first, NOT via finish-iteration — D-3409/D-3410 both stamped one clause across rows) + `hidden-proxy verify` on the 3 rows. Source: reviews/loop-unattended/2363-c7fcf5bd7-m-initgrp-drain.md


- [x] D-3416 ledger truth (8 omit-pastes + 3 stale notes; statuses correct) — use_camera/doset/mon_would_take_item/intemple rows carry `- \`stairs_description\`: none.` instead of D-3416 Named text (camera zapyourself-CAMERA + flash mimic/gremlin polish; doset wc2_supported + optfn perm_invent gate + D-1701; mon_would FOOD corpse/tin/egg callee arms; intemple SetVoice pitch); add_custom_nhcolor_entry/purge_all_custom_entries/wizcustom_glyphids/parse_id rows carry the same paste over live pre-row omits (recoverable ONLY from git pre-rows: wizcustom_callback/callers/saveload; freedynamicdata/clear_symsetentry/writers; find_struct consumers); dobugreport/crashreport_bidshow/panictrace_handler notes falsely claim "measured MISSING" (exports exist) — fix: direct `ledger.mjs set` ×11 (verify each sub-omit still unshipped first, NOT via finish-iteration — seven iters prove it stamps one Named line across rows) + `hidden-proxy verify` on the touched rows. Source: reviews/loop-unattended/2366-b127042af-batch-d3416.md


- [x] `topl.c` topl_putsym — C topl.c:305–344 absent from js/ (no JS symbol, comment refs only, js-grep 2026-10-04; ledger unknown C 28/JS 0 MISSING; callers 2 — rows --all 2026-10-04) @e2943671c
- [x] `muse.c` find_offensive — partial js/muse.js:find_offensive: C muse.c:1431–1437 early returns (`in_your_sanctuary` + AD_HEAL-vs-naked-hero) absent from js/muse.js:645 (`deferred → treat as open` comment; full body brief-read 2026-10-04; ledger omit; batch-preview 2026-10-04) @89ee696e3
- [x] `muse.c` mbhitm — C muse.c:1597–1703 arms (WAN_CANCELLATION/SPE_CANCELLATION + seemimic + shieldeff + mon-target resists_magm/find_mac/hit-miss plines) absent from js/muse.js:785 local clone (named in :781–782 doc; brief-read 2026-10-04; ledger omit; batch-preview 2026-10-04) @89ee696e3


- [x] D-3415 repair misfire (flagged by D-3417 crumb, verified this iter) — domove_swap_with_pet + domove_core rows carry test_move's omit text (a1eee6cb2 stamped test_move's single Named line into all 3 rows; 2358.2's Addressed stamp is false); true texts in D-3404 Named bullet (swap: C :2147 assert-implied-by-mtrapped, no JS assert export; core: displaceu middle-skip + upstream travel + CLIPPING) — fix: direct `ledger.mjs set` ×2 to those texts (verify each sub-omit still unshipped first, NOT via finish-iteration) + `hidden-proxy verify` on the 2 rows. Source: reviews/loop-unattended/2366-b127042af-batch-d3416.md (mechanism) + D-3417 journal crumb **Addressed:** D-3419 `3043e75f2`


- [x] `sfbase.c` norm_ptrs_u_roleplay — C sfbase.c:1087–1089 absent from js/ (no JS symbol, js-grep 2026-10-04; ledger absent C 0; `{ }` stub; 64 siblings ported 2026-10-04) @e2943671c
- [x] `sfbase.c` norm_ptrs_version_info — C sfbase.c:1092–1094 absent from js/ (no JS symbol, js-grep 2026-10-04; ledger absent C 0; `{ }` stub; 64 siblings ported 2026-10-04) @e2943671c
- [x] `sfbase.c` norm_ptrs_you — C sfbase.c:1107–1109 absent from js/ (no JS symbol, js-grep 2026-10-04; ledger absent C 0; `{ }` stub; 64 siblings ported 2026-10-04) @e2943671c
- [x] `hacklib.c` strncmpi — partial js/hacklib.js:strncmpi (D-2967): call-site wiring arms in artifact.c, attrib.c, botl.c, cmd.c, coloratt.c, do.c, do_name.c, dungeon.c, … absent from js/ (full list in ledger omit; batch-preview 2026-10-04) @e2943671c
- [x] `hacklib.c` strstri — partial js/hacklib.js:strstri (D-2877): C apply.c:1412 attach-prompt `\033`-strip arm absent from js/apply.js:4813 (batch-preview 2026-10-04) @e2943671c
- [x] `hacklib.c` unicodeval_to_utf8str — partial js/hacklib.js:unicodeval_to_utf8str (D-2892): C glyphs.c:52–104 + utf8map.c:18–34,148–207 callee arms absent from js/ (full omit in ledger; batch-preview 2026-10-04) @e2943671c


- [x] D-3402 declaration repair — `hmon_hitmon_splitmon` declared `ported` with no diff and no retired omit (body verified whole in review 2356; twin defect really_done already healed by D-3403, misc_obj pasted omit already healed by D-3406 — confirm both): `ledger.mjs set hmon_hitmon_splitmon ported --note "audited D-3402: whole vs C"` + audit the remaining 101 D-3402 rows for present accurate notes + verify. Source: reviews/loop-unattended/2356-7a3ae7a92-batch-d3402-display-uhitm.md **Addressed:** D-3417 `428fab59b`


- [x] D-3404 pasted-omit ledger corruption — `test_move`, `domove_swap_with_pet`, `domove_core` rows carry moverock_core's omit text instead of their own (pre-rows at 198b7a2a7~1 + D-3404 D-log C-locus hold truth): `ledger.mjs set` each row to its true omit, verifying each sub-omit still unshipped (test_move minus stale block_door/block_entry) + re-run `hidden-proxy verify` on the three + confirm no other D-3404 row mislabels. Source: reviews/loop-unattended/2358-198b7a2a7-batch-d3404-hack-sfbase.md


- [x] `u.Underwater` never-written alias family (2348.1's deferred brief) — C `Underwater` ≡ `u.uinwater` (youprop.h:279) but 12 read sites test `u.Underwater`, which zero code port-wide ever writes: js/hack.js:2320 swim_move_danger entry guard + js/monmove.js:1017,1452 + js/mondata.js:1090 + js/read.js:436 + js/pager.js:1410,2099,2146 + js/pickup.js:1062,1086,1965 + js/apply.js:819 — fix: flip each to `(u.uinwater|0)` (D-3400 idiom) after verifying its C locus says Underwater + verify incl. full (shared files). Source: reviews/loop-unattended/2358-198b7a2a7-batch-d3404-hack-sfbase.md


- [x] `switch_symbols` ledger reconciliation (D-3405 shipped it live with no row touch) — row still `by-design` "seed: no scored analogue (file)" but display.js exports it, wired in both cnf handlers (C cfgfiles.c:1194/:1205): `ledger.mjs set switch_symbols partial --js js/display.js:switch_symbols` + omit map (FALSE-arm options.c callers unported; clear_symsetentry desc/purge/glyphmap + restriction-bits tail; graphics-mode callbacks null) + verify. Source: reviews/loop-unattended/2359-44ce1ba38-batch-d3405-eat-engrave.md


- [x] eat.js:2741 `the_unique_pm` divergent clone — delete + import live objnam.js:2784 (C objnam.c:1120-1140): clone's `ptr === mons(PM_*)` arms are always-false (`mons()` fresh object per call, monsters.js:227) vs canonical mndx compares; eat.js already imports objnam.js (no new edge); fixes High Priest corpse "The…"/"This…" taste line + tin which=2 (eat.js:2697/3833); subsumes the eat.js:2744/2745/2748 sites in the mons-identity row below + verify. Source: reviews/loop-unattended/2359-44ce1ba38-batch-d3405-eat-engrave.md


- [x] D-3407 false ledger certifications (14 rows stamped "cannot ship"/"whole vs C" for shipped code) — drop stale omits + flip to ported: 7 replmon-unstuck rows (sanity_check_single_mon, dmonsfree, monkilled, unstuck, xkilled, setmangry, iter_mons_safe), setuwep (:1103 live uhitm.js:1840), start_timer (wish-corpse live readobjnam.js:2366), mkinvokearea (deadbook live spell.js:842), arti_invoke (6 retouch callers live), fill_ordinary_room (recount live), record_achievement (drop ACH_INVK sub-omit only), restore_timers (→ partial + ghostly bones omit); re-verify the 14. Source: reviews/loop-unattended/2361-c075fb861-batch-d3407-timeout-read.md


- [x] D-3408 ledger remainder homes (4 rows) — m_initgrp → partial + group-member-Norep omit (sync, unawaitable); makemon omit += m_dowear fire-and-forget + dog starting-pet + group-msg pointer; newmextra → ported (body whole); wiz_show_nhuuid omit := nhuuid-value text (replace wiz_telekinesis paste error); re-verify the 4. Source: reviews/loop-unattended/2362-952e46e04-batch-d3408-zap-makemon.md


- [x] `sfbase.c` norm_ptrs_bill_x — C sfbase.c:767–769 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:676, no live callers; 0 C callees — brief 2026-10-03) @0e2f1273f
- [x] `sfbase.c` norm_ptrs_branch — C sfbase.c:772–774 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:677, no live callers; 0 C callees — brief 2026-10-03) @0e2f1273f
- [x] `sfbase.c` norm_ptrs_bubble — C sfbase.c:777–779 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:678, no live callers; 0 C callees — brief 2026-10-03) @0e2f1273f
- [x] `sfbase.c` norm_ptrs_cemetery — C sfbase.c:782–784 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:679, no live callers; 0 C callees — brief 2026-10-03) @0e2f1273f
- [x] `sfbase.c` norm_ptrs_context_info — C sfbase.c:787–789 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:680, no live callers; 0 C callees — brief 2026-10-03) @0e2f1273f
- [x] `sfbase.c` norm_ptrs_achievement_tracking — C sfbase.c:792–794 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:681, no live callers; 0 C callees — brief 2026-10-03) @0e2f1273f
- [x] `sfbase.c` norm_ptrs_book_info — C sfbase.c:797–799 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:683, no live callers; 0 C callees — brief 2026-10-03) @0e2f1273f
- [x] `sfbase.c` norm_ptrs_dig_info — C sfbase.c:802–804 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:684, no live callers; 0 C callees — brief 2026-10-03) @0e2f1273f

## 2026-10-03

- [x] `display.c` feel_location Underwater gate reads never-written field — C display.c:769–772 returns when `Underwater && !Is_waterlevel && !pool/lava && !ice` but js/display.js:5138 tests `(u.Underwater|0)`, which no code port-wide ever writes (live field is `u.uinwater`, youprop.h:279; writer `set_uinwater` js/hack.js:3453; zero assigns/bracket-writes/save-writes — review 2348); fix: flip :5138 to `(u.uinwater|0)` (D-3393 newsym :5375 idiom) + verify incl. full (shared file); do NOT expand to the ~20-site alias family. Source: reviews/loop-unattended/2348-d428e2b04-newsym-guards.md **Addressed:** D-3400 `1ae9cc180`


- [x] `shk.c` sasc_bug — C shk.c:5945–5948 absent from js/ (no JS symbol; ledger absent C 1; `#ifdef __SASC` Amiga-compiler op->unpaid=x workaround; 0 C refs; compiled out on pinned platform → by-design verdict — brief 2026-10-03) @4ea047f25
- [x] `mhitm.c` mdamagem !damage tail — C mhitm.c:1070–1071 (`if (!mhm.damage) return mhm.hitflags;`) absent from js/mhitm.js:5653 mdamagem (:4605; `if (!damage) return hitflags === M_ATTK_AGR_DIED ? M_ATTK_AGR_DIED : M_ATTK_HIT;` — returns HIT where C returns hitflags, MISS when unset e.g. negated AD_STCK; no new callee, pure return-code fix; ledger partial names this arm — brief 2026-10-03) @d428e2b04
- [x] `dokick.c` really_kick_object pit/web reveal+message — C dokick.c:521–529 (pit/web block: `if (!trap->tseen) find_trap(trap)` :523–524 + Hallucination 'tizzy' variant :526–528) absent from js/dokick.js:1271–1274 really_kick_object (:1261; :1272 `find_trap deferred` comment, :1273 web/pit only; callee find_trap js/detect.js:340 local async — needs export; ledger partial names this arm — brief 2026-10-03) @d428e2b04
- [x] `sfbase.c` norm_ptrs_any — C sfbase.c:748–750 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:672 + util/sftags.c generator refs, no live scored callers; 0 C callees — brief 2026-10-03) @34473e95a
- [x] `sfbase.c` norm_ptrs_align — C sfbase.c:752–754 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:673, no live callers; 0 C callees — brief 2026-10-03) @34473e95a
- [x] `files.c` free_convert_filenames — C files.c:2168–2175 absent from js/ (no JS symbol; ledger unknown C 5; frees converted/unconverted_filename + cvtinit=FALSE; sole C caller save.c:1168 inside live FREE_ALL_MEMORY (config.h:632); module filenames live js/files.js, cvtinit (static files.c:2053, write-only in game build) absent — new state; 0 C callees; named omit in review 1539 ACCEPT — brief 2026-10-03) @2a53139d7
- [x] `sfbase.c` norm_ptrs_arti_info — C sfbase.c:757–759 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:674, no live callers; 0 C callees — brief 2026-10-03) @7636db97b
- [x] `sfbase.c` norm_ptrs_attribs — C sfbase.c:762–764 absent from js/ (no JS symbol; ledger absent C 0; empty no-op stub body; decl-only C ref sfbase.c:675, no live callers; 0 C callees — brief 2026-10-03) @7636db97b


- [x] `mdlib.c` mkstemp — C mdlib.c:375–385 absent from js/ (no JS symbol; ledger absent C 7; `#ifdef _MSC_VER` MSVC-only temp-file open; sole live caller util/makedefs.c:492 build tool, decl-only mdlib.c:71; compiled out on pinned platform → by-design verdict — brief 2026-10-03) @4ea047f25


- [x] `u_init.c` knows_object pauper gate — C u_init.c:578–579 (if (u.uroleplay.pauper && !override_pauper) return) absent from js/u_init.js:1277 knows_object (param named _override_pauper, ignored; unconditionally discover_object so paupers wrongly discover role/race items; callee discover_object js/invent.js:4734 live; 39 C call sites incl. :715/:924 TRUE overrides; ledger partial names this arm — brief 2026-10-03) @4ea047f25


- [x] `files.c` nh_sfunconvert — C files.c:2079–2082 absent from js/ (no JS symbol; ledger unknown C 1; doconvert_file(filename,0,TRUE) unconvert hook; 0 C refs; callee doconvert_file module-local live same-file js/files.js (same-file call, not a clone) — brief 2026-10-03) @14e98dbc1


- [x] `cmd.c` dummyfunction — C cmd.c:5699–5702 absent from js/ (no JS symbol; ledger absent C 1; staticfn returning ECMD_CANCEL; decl-only C ref cmd.c:151, no live callers; 0 C callees — brief 2026-10-03) @14e98dbc1 **Addressed:** D-3395 `2a53139d7`
- [x] `cmd.c` redraw_cmd generic-bind arm — C cmd.c:3911–3918 (cmdbind_get(uc)->ef_funct==doredraw lookup) absent from js/getpos.js:118 redraw_cmd (hardcodes C-r/C-l so rebound redraw keys diverge; callee cmdbind_get js/dokeylist.js:386 live; C callers cmd.c:4013 getdir + getpos.c:945; ledger partial names this arm — brief 2026-10-03) @d6a4a5312 **Addressed:** D-3395 `2a53139d7`


- [x] `priest.c` move_special shop re-entry arm — C priest.c:125–126 (isshk && !in_his_shop && inhishop → check_special_room(FALSE)) absent from js/shk.js:4495 move_special (post-move block :4512–4517 m_at/u_at + newsym + return 1, no shop check; callee check_special_room js/hack.js:3035 live async; ledger partial names this arm — brief 2026-10-03) @41ae7cfca
- [x] `priest.c` forget_temple_entry impossible diagnostic — C priest.c:550 (impossible("attempting to manipulate shrine data for non-priest?")) absent from js/priest.js:62 forget_temple_entry (:64 bare `if (!epri_p) return`, timer zeroing live; impossible js/display.js:8717 is async, this fn sync — sync-context verdict or call-site wiring; ledger partial names this arm; C callers mkobj.c:2160 + save.c:894 — brief 2026-10-03) @4ea047f25


- [x] `display.c` fn_cmap_to_glyph — C display.c:3796–3800 absent from js/ (no JS symbol; ledger absent C 1; cmap_to_glyph(cmap) wrapper; 0 C refs — brief 2026-10-03) @bd0144c89 **Addressed:** D-3393 `d428e2b04`
- [x] `display.c` newsym flux + Underwater gates — C display.c:928–929 (_suppress_map_output early return) + :943–948 (Underwater !Is_waterlevel → pool/lava/ice + next2u gate) absent from js/display.js:5348 newsym (head :5348–5356 loc-null → uswallow, no guards; callees suppress_map_output js/display.js:5101 + Is_waterlevel js/const.js:3243 + is_ice js/zap.js:887 live, next2u/is_pool_or_lava resolve at pop-time brief; ledger partial D-1745/D-1737 — brief 2026-10-03) @41ae7cfca **Addressed:** D-3393 `d428e2b04`


- [x] `monmove.c` postmov after_shk_move MOVED|DONE guard — C monmove.c:1700–1702 inside `:1660 if (mmoved == MMOVE_MOVED || MMOVE_DONE)` absent from js/monmove.js:1878–1881 (fires on MMOVE_NOTHING entries via :2355; resets bill_p + rechecks occupancy where C holds the sentinel; fix: guard the new call only, not the pre-existing tail — brief 2339). Source: reviews/loop-unattended/2339-bec62f3b9-after-shk-move-guard.md **Addressed:** D-3392 `4ea047f25`
- [x] `invent.c` repopulate_perminvent — C invent.c:3455–3460 absent from js/ (no JS symbol; ledger absent C 2; display_pickinv(NULL,0,0,FALSE,FALSE,0) wrapper; 0 C refs; callee display_pickinv split across invent.js builders D-1559 — brief 2026-10-03) @bd0144c89 **Addressed:** D-3392 `4ea047f25`
- [x] `invent.c` only_here — C invent.c:5476–5480 absent from js/ (no JS symbol; ledger absent C 1; staticfn ox/oy vs go.only; decl-only C ref invent.c:20, no live callers; 0 C callees — brief 2026-10-03) @bd0144c89 **Addressed:** D-3392 `4ea047f25`


- [x] `files.c` recover_savefile compiled-out port — C files.c:2864–3082 under `#ifdef SELF_RECOVER` (files.c:2858; unixconf.h:126 leaves it undefined; sole caller sys/unix/unixunix.c:216–219 inside the same ifdef) shipped live + flipped ported instead of by-design (RUNBOOK §4; Placebc/adjust_prefix/CHANGE_COLOR precedent); fix: ledger by-design + delete dead JS (recover + recover-only sfo_int/sfvalue_int, no callers) + verify incl. full — brief 2344. Source: reviews/loop-unattended/2344-d6a4a5312-recover-scope.md **Addressed:** D-3391 `6d194731e`


- [x] `bones.c` free_ebones — C bones.c:832–839 absent from js/ (no JS symbol; ledger absent C 3; mextra+EBONES free+null; decl-only C ref extern.h:260, no live callers; sfctool.c:1050 dup body is the tool; 0 C callees — brief 2026-10-03) @bd0144c89


- [x] `files.c` compress_bonesfile — C files.c:1005–1010 absent from js/ (no JS symbol; ledger unknown C 2; nh_sfconvert + nh_compress over fqname(gb.bones); 5 C refs bones.c:430/:624/:673/:688/:741 savebones/getbones; callees fqname + nh_compress live, C :1008 nh_sfconvert unresolved by brief — pop-time brief resolves — brief 2026-10-03) @bd0144c89 **Addressed:** D-3389 `d6a4a5312`
- [x] `files.c` recover_savefile — C files.c:2864–3082 absent from js/ (no JS symbol; ledger unknown C 140; self-recover scan; sole caller sys/unix/unixunix.c:219 platform; callees open_levelfile/raw_printf/set_savefile_name/fqname/close+create+delete_savefile/store_version/set_levelfile_name live, bufoff/copy_bytes/bufon by-design — brief 2026-10-03) @bd0144c89 **Addressed:** D-3389 `d6a4a5312`


- [x] `hack.c` losehp showdamage ×2 + rehumanize arms — C hack.c:4269–4280 (Upolyd/normal showdamage(n) + mh<1 rehumanize) absent from js/hack.js:1881 losehp (sync; doc :1864/:1871–1872 defers both, mh<1 sets gameover :1896–1904; callees showdamage js/hack.js:1874 + rehumanize js/polyself.js:1224 live async — brief 2026-10-03) @787f6ade
- [x] `hack.c` check_special_room BARRACKS-abandoned + wake_msg arms — C hack.c:3702–3710 (monstinroom SOLDIER/SERGEANT/LIEUTENANT/CAPTAIN → military else abandoned) / :3773 wake_msg(mtmp,FALSE) absent from js/hack.js:3053 check_special_room (always-military :3054–3055 + sleep-clear-only :3113–3116 defer comments — brief 2026-10-03; callees monstinroom local js/hack.js:2948 + wake_msg js/mon.js:1616 live) @2d0bcb97


- [x] `files.c` rewind_nhfile — C files.c:534–545 absent from js/ (no JS symbol; ledger unknown; structlevel lseek(fd,0,0) vs fieldlevel rewind(fpdef); 4 C refs, sole in-game caller restore.c:891 dorecover unported; 0 C callees — brief 2026-10-03) @c4bd1edaa
- [x] `files.c` commit_bonesfile — C files.c:915–937 absent from js/ (no JS symbol; ledger unknown; set_bonesfile_name + fqname×2 + set_bonestemp_name + rename + wizard pline; sole in-game caller bones.c:623 savebones; callees set_bonesfile_name js/bones.js:375 + fqname live, set_bonestemp_name missing, pline async — brief 2026-10-03) @c4bd1edaa
- [x] `files.c` set_bonestemp_name — C files.c:818–830 absent from js/ (no JS symbol; ledger unknown C 7; staticfn gl.lock “.bn” suffix; callers files.c:845 create_bonesfile + :922 commit_bonesfile; callee eos live js/hacklib.js:275 — brief 2026-10-03) @bec62f3b9
- [x] `files.c` create_bonesfile — C files.c:833–911 absent from js/ (no JS symbol; ledger unknown C 43; bonesid + tempname + NHF_BONESFILE creat; sole in-game caller bones.c:600 savebones; callees set_bonesfile_name js/bones.js:375 + fqname/new_nhfile live, set_bonestemp_name missing, viable_nhfile local clone js/files.js:735 — brief 2026-10-03) @bec62f3b9
- [x] `files.c` open_bonesfile — C files.c:940–990 absent from js/ (no JS symbol; ledger unknown C 31; nh_uncompress + NHF_BONESFILE open; callers bones.c:417 getbones + :652; callees set_bonesfile_name js/bones.js:375 + fqname/nh_uncompress/new_nhfile live, viable_nhfile local clone js/files.js:735 — brief 2026-10-03) @bec62f3b9


- [x] `invent.c` getobj cmdq HANDS_SYM verdict in getobj_dip — C invent.c:1790–1794 (CMDQ_KEY HANDS_SYM → obj_ok(NULL) SUGGEST/DOWNPLAY → &hands_obj) absent from js/potion.js:2394 getobj_dip (no cmdq path; sibling getobj_dip_ok :2654 consults cmdq_pop_getobj_key :2454 — read 2026-10-03) @4a4cc3e73
- [x] `invent.c` getobj ?/* pickinv in getobj_dip — C invent.c:1963–1992 (`?`/`*` → display_pickinv + handsbuf + ESC Never_mind) absent from js/potion.js:2424 getobj_dip `?`/`*` arm (plines 'Never mind.' + null; sibling getobj_dip_ok :2687 has the full arm — read 2026-10-03) @4a4cc3e73


- [x] `attrib.c` poisoned blast shieldeff + killer-polish + towel-halving arms — C attrib.c:339-340 shieldeff / :346-350 name_to_mon G_UNIQ-the() / :385+389-390 cloud + Half_gas_damage halving absent from js/attrib.js:414 poisoned (:428/:433-439/:470 defer comments — brief 2026-10-03; callees shieldeff js/display.js:4837 + name_to_mon js/mondata.js:881 + Half_gas_damage js/potion.js:2773 live) @e27333c36
- [x] `attrib.c` is_innate FROM_FORM arm — C attrib.c:896-898 (BLINDED&&!haseyes / BLND_RES&FROMFORM → FROM_FORM) absent from js/attrib.js:1205 is_innate (falls to FROM_NONE :1219; named omit in doc :1201-1203 — brief 2026-10-03; callee haseyes live js/monsters.js:411) @e27333c36


- [x] `shk.c` after_shk_move occupancy re-check — C shk.c:5005–5006 (!gameover → check_special_room(FALSE)) absent from js/shk.js:4971 after_shk_move (named omit in doc :4969; bill_p reset only; check_special_room live async js/hack.js:2977 — brief 2026-10-03) @d133940a7 **Addressed:** D-3384 `bec62f3b9`


- [x] bhit iron-ball stops unreachable — C zap.c:4095–4119 (boulder-hit msg + chained-uball test_move halt + Sokoban pit/hole stop, THROWN_WEAPON guard) live only in js/zap.js:6469 bhit, but C dothrow.c:1674 non-tethered throws inline the fly at js/dothrow.js:2444–2482 with no stops, and bhit's only THROWN_WEAPON JS caller is throw_gold (gold otyp, guard dead) — port the three stops into the inline loop in C order (or route non-tether through bhit); ride-along: splash cites `:1786–1794` → `:1793–1801`; do not reflip ledger until a thrown ball observably stops. Source: reviews/loop-unattended/2337-355829ea2-throwit-bhit-landing.md @355829ea2 **Addressed:** D-3383 `2d0bcb973`


- [x] `dothrow.c` throwit shk pick-snatch arm — C dothrow.c:1809–1817 (mon->isshk && is_pick: snatch pline + check_shop_obj + mpickobj + throwit_return) absent from js/dothrow.js:2307 throwit (named omit comment :2568; callee mpickobj live js/makemon.js:2254 — brief 2026-10-03) @30ce39631
- [x] `zap.c` bhit iron-ball range limit — C zap.c:4095–4119 (THROWN_WEAPON HEAVY_IRON_BALL: boulder-hit msg + uball test_move halt + Sokoban pit stop, range=0) absent from js/zap.js:6162 bhit (named omit in doc :6156–6157 — brief 2026-10-03) @30ce39631


- [x] `files.c` close_nhfile — C files.c:518–531 absent from js/ (no JS symbol; ledger unknown; structlevel fd→-1 / fpdef→null + fplog/fpdebug closes + free_nhfile; 49 C refs incl. do.c:1712 save.c:388 restore.c:899; callee free_nhfile live js/files.js:677 — brief 2026-10-03) @952f7c273 **Addressed:** D-3381 `787f6adee`


- [x] `potion.c` dip_hands_ok — C potion.c:2231–2237 absent from js/ (no JS symbol; ledger absent; !obj Glib+can_reach_floor → GETOBJ_SUGGEST else dip_ok; live C caller potion.c:2279 getobj callback; callees can_reach_floor + dip_ok live — brief 2026-10-03) @952f7c273 **Addressed:** D-3380 `c4bd1edaa`
- [x] `potion.c` peffect_see_invisible reveal tail — C potion.c:871-877 (set_mimic_blocking + see_monsters + newsym + Invisible self-msg + unkn--) absent from js/potion.js:437 peffect_see_invisible (:475 defer comment, fn ends without tail — brief 2026-10-03; callees set_mimic_blocking js/vision.js:195 + see_monsters js/display.js:5663 + newsym js/display.js:5348 live) @e27333c36 **Addressed:** D-3380 `c4bd1edaa`


- [x] `attrib.c` poison_strdmg killer path — C attrib.c:274–278 knam/k_format (losestr + losehp killer attribution) absent from js/eat.js:1386 poison_strdmg (2-arg; raw uhp decrement, gameover without done() killer — brief 2026-10-03) @647728e87 **Addressed:** D-3379 `4a4cc3e73`


- [x] `apply.c` use_cream_pie COST_SPLAT bill — C apply.c:3599 costly_alteration(obj, COST_SPLAT) absent from js/apply.js:1142 use_cream_pie (deferred comment; freeinv+delobj only — brief 2026-10-03) @647728e87
- [x] `apply.c` doapply BANANA arm — C apply.c:4400–4404 (hallu "It rings!" + turn cost) absent from js/apply.js doapply (only GETOBJ_DOWNPLAY :337, no case — brief 2026-10-03) @647728e87


- [x] `artifact.c` glow_color hcolor wrap — C artifact.c:2432 `hcolor(clr2colorname)` absent from js/artifact.js:891 glow_color (returns clr2colorname directly; hcolor live js/do_name.js:347 — brief 2026-10-03) @647728e87 **Addressed:** D-3377 `649b09c00`


- [x] `mthrowu.c` m_throw misfire + dknown arms — C mthrowu.c:619–620 (clear_dknown when thrower unseen) + :623–629 (cursed/greased rn2(7) misfire pline + dx/dy rn2(3)−1 re-roll) absent from js/mthrowu.js (no clear_dknown/misfires/slips; D-2399 shipped flight-stop/catch only — brief 2026-10-03) @647728e87 **Addressed:** D-3376 `d133940a7`
- [x] `mthrowu.c` breathwep_name — blocks 1/953 (scen-impaired-Rogue-94110 step 89 kind=rng: C `rn2(96)=60` via the Hallucination arm vs JS `rn2(20)=16` from zap_hit; C mthrowu.c:1085–1086 absent from js/mthrowu.js:383 breathwep_name, Hallucination arm deferred; rnd_hallublast itself ledger-ported 2026-10-03, ex-row @9dc9139eb) @bbe63333a **Addressed:** D-3376 `d133940a7`


- [x] `save.c` tricked_fileremoved — C save.c:336–347 absent from js/ (no JS symbol; ledger absent; !nhfp arm: pline1(whynot) + killer-name + done(TRICKED); 2 C call sites do.c:1705 + save.c:377; callees pline + done live — brief 2026-10-03) @7feedbbb2 **Addressed:** D-3375 `30ce39631`


- [x] `restore.c` rest_adjust_levelflags — C restore.c:1314–1318 absent from js/ (no JS symbol; 1-line relative_time_to_moves(&level.flags.stasis_until), C callers getlev :1117 + savelev :520–522 pair; callee live js/restore.js:133; wire caveat: lev_json.js:800 copies absolute stasis_until verbatim, literal add-back would double — brief 2026-10-03) @33bc41ba1 **Addressed:** D-3374 `952f7c273`


- [x] `mkobj.c` set_corpsenm — absent from js/ (no JS symbol; seed-declared ported, location unresolved); C mkobj.c:1317–1367 egg-timer/oeaten/corpsenm/timeout/weight arms, all 8 callees live (brief 2026-10-03; 23 C call sites) @9dc9139eb
- [x] `hacklib.c` highc dokeylist clone removal — C hacklib.c:75–79 ASCII highc absent from js/dokeylist.js as an import (local clone :51 const-arrow numeric-code variant takes/returns char codes, body read this session; 1 site :340 binds numeric key codes instead of the live char export js/hacklib.js:455 read this session; C body in brief highc this session; dokeylist→hacklib edge ALREADY :43) — rewire + adapt site to char domain or declare distinct. @79f8032a6
- [x] `hacklib.c` s_suffix eat.js clone removal — C hacklib.c:344–359 4-arm possessive absent from js/eat.js as an import (local clone :3370 s_suffix_eat body-identical to live, body read this session; 4 sites instead of the live export js/do_name.js:418 read this session; C body via csym s_suffix this session; eat→do_name edge ALREADY) — rewire sites to the live export, delete clone. @79f8032a6
- [x] `hacklib.c` s_suffix zap.js clone removal — C hacklib.c:344–359 4-arm possessive absent from js/zap.js as an import (local clone :2793 s_suffix_zap body-identical to live, body read this session; 3 sites instead of the live export js/do_name.js:418; C body via csym s_suffix this session; zap→do_name edge ALREADY) — rewire sites to the live export, delete clone. @79f8032a6
- [x] `hacklib.c` s_suffix mhitm.js clone removal — C hacklib.c:344–359 4-arm possessive absent from js/mhitm.js as an import (local clone :5808 s_suffix_mm body-identical to live, body read this session; 16 sites instead of the live export js/do_name.js:418; C body via csym s_suffix this session; mhitm→do_name edge ALREADY) — rewire sites to the live export, delete clone. @79f8032a6


- [x] `windows.c` choose_classes_menu — C windows.c:1665–1675 category=0 (monclass) arm + generic prompt/way params absent from js/options.js:5557 local (autopickup-only reimplementation; C extern unexported; brief 2026-10-03) @9dc9139eb **Addressed:** D-3372 `348c0ffa4`


- [x] `mhitm.c` slept_monst unwired C callers — music.c:95 + potion.c:1806 still call local clones (js/music.js:268, js/potion.js:3745 slept_monst_pot; sticks-deferred, hand-clearing ustuck) and zap.c:486 bhitm WAN_SLEEP arm has no JS call site; canonical js/mhitm.js:1422 exact (`csym --callers` 7 refs, 3 sites unwired; Ledger says ported). Source: reviews/loop-unattended/2317-52fc04909-dobuzz-slept-monst.md @79f8032a6 **Addressed:** D-3368 `794aa26a5`


- [x] `zap.c` dobuzz steed-redirect tail-skip — C zap.c:4956–4959 `goto buzzmonst` exits the u_at branch, skipping flashburn :4988–4989 + stop_occupation :4990 + nomul :4991; JS js/zap.js:2586 `buzzmonst(usteed)` falls through to the tail :2630–2634 (extra d(nd,50) RNG + flashburn + occupation stop on the steed path; stale "still named" comment :2590 to sweep). Source: reviews/loop-unattended/2317-52fc04909-dobuzz-slept-monst.md @79f8032a6 **Addressed:** D-3367 `2c22a94c3`


- [x] `detect.c` reveal_terrain_getglyph committed probe — js/display.js:4369 `((x|0)===42 && (y|0)===15)` capture + :4563–4567 `globalThis.__probe_reveal` write (recorded session coordinate hardcoded in scored `js/`; behavior-neutral DIAG, nothing reads it; D-3363 "(reverted)" false — added by 6da1640bc, live at HEAD). Delete both blocks. Source: reviews/loop-unattended/2318-6da1640bc-def-char-is-furniture-reveal.md @79f8032a6 **Addressed:** D-3366 `f1f60014e`


- [x] `symbols.c` set_symhandling missing CURS/MAC arms — js/const.js:2917 known_handling holds 4 strings, C symbols.c:376–384 holds 6 ("CURS"/"MAC" absent, so "UTF8" resolves to 3 not H_UTF8=5 while JS H_* consts are C-exact; reader options.js:12798 compares === H_UTF8; Ledger says ported but measures C 7/JS 5 PARTIAL). Add the 2 strings in C order (no JS callers — behavior-neutral). Source: reviews/loop-unattended/2319-79f8032a6-assign-graphics-siblings.md @79f8032a6 **Addressed:** D-3365 `8b1162c17`


- [x] `symbols.c` assign_graphics — C symbols.c:224–227 + :236–239 showsyms table copy absent from js/display.js:assign_graphics (brief 2026-10-03; reset_glyphmap :249 guarded per NOTES, excluded) @9dc9139eb **Addressed:** D-3364 `79f8032a6`


- [x] `drawing.c` def_char_is_furniture — blocks 1/953 (scen-terrain-Tourist-94120 step 97/121 kind=screen: C «branch staircase up» vs JS «unexplored area»); C drawing.c:119–142 full defsyms scan deferred at js/detect.js:313 local (brief 2026-10-03). Source: reviews/loop-unattended/1028-61843507-terrain-browse-describe.md @9dc9139eb **Addressed:** D-3363 `6da1640bc`


- [x] `js` js-throw — blocks 1/953 (scen-longrun-Archeologist-94094, step undefined): corpus worker/js-throw owner per `hidden-proxy.mjs queue --limit 200` (run `hidden-proxy verify js-throw` + brief the throwing call; forfeits every later screen, Constitution §10.14) @9dc9139eb **Addressed:** D-3362 `ddf5ed1`


- [x] `zap.c` dobuzz — C zap.c:4804–4821 uswallow, :4874–4884 mon_reflects, :4887–4911 Rider/PM_DEATH, :4934–4941 otmp-else, :4956–4959 steed absent from js/zap.js:dobuzz (brief 2026-10-03; hdmgtype/invis/mines/bhitpos micro-arms same commit) @9dc9139eb
- [x] `mhitm.c` slept_monst — no JS export (3 local clones: js/music.js:268, js/mhitm.js:1381 slept_slee_mm, js/potion.js:3730); C mhitm.c:1249–1257 + dobuzz :4946 caller unwired (brief 2026-10-03) @9dc9139eb


- [x] `hacklib.c` highc botl.js clone removal — C hacklib.c:75–79 a-z-only char absent from js/botl.js as an import (local clone :2231 ASCII-compare shape vs live charCode-highc js/hacklib.js:455, 3 live sites :2452 status-msg, :2563 name-cap C botl.c:990-shape, :2575 title-cap C botl.c:1005-shape; C body + 66 refs in brief highc this session, clone body + sites + live body read this session; same-named census 2 definers; botl→hacklib edge ALREADY :92; `imports.mjs --can` ALREADY this session) — rewire sites to the live export, delete clone.
- [x] `hacklib.c` upstart potion.js upstart_pot rename-clone removal — C hacklib.c:113–119 highc-first-char absent from js/potion.js as an import (local clone :3011 `upstart_pot` `if (!str)`+toUpperCase shape vs live String()+highc, 1 live site :3931 saddle-dip C potion.c:1713-shape instead of the live export js/hacklib.js:498; C body in brief upstart this session, clone body + site + live body read this session; variant census this session: 2 upstart definers (live + this); potion→hacklib edge ALREADY :177; `imports.mjs --can` ALREADY this session) — rewire site to the live export, delete clone.
- [x] `hacklib.c` s_suffix mthrowu.js clone removal — C hacklib.c:344–359 it/you/Xs/X possessive absent from js/mthrowu.js as an import (local clone :195 4-arm C-faithful, 2 live sites :410 dry-rattle, :1056 Tobjnam-return instead of the live export js/do_name.js:418; C body in brief s_suffix this session, clone body + sites + live body read this session; js-wide census this session: 7 definers = 1 live + 6 clones; mthrowu→do_name edge ALREADY :50 — already imports `s_suffix as s_suffix_ucatch`, extend with the plain name; `imports.mjs --can` ALREADY this session) — rewire sites to the live export, delete clone.
- [x] `hacklib.c` s_suffix minion.js clone removal — C hacklib.c:344–359 it/you/Xs/X possessive absent from js/minion.js as an import (local clone :83 4-arm C-faithful, 1 live site :247 Deaf-voice instead of the live export js/do_name.js:418; C body in brief s_suffix this session, clone body + site + live body read this session; js-wide census this session: 7 definers = 1 live + 6 clones; minion→do_name edge ALREADY :9; `imports.mjs --can` ALREADY this session) — rewire site to the live export, delete clone.
- [x] `hacklib.c` s_suffix explode.js clone removal — C hacklib.c:344–359 it/you/Xs/X possessive absent from js/explode.js as an import (local clone :146 4-arm C-faithful, 3 live sites :629/:715 hallu-explosion C explode.c:499/:598-shape, :851 killer-name C explode.c:1059-shape instead of the live export js/do_name.js:418; C body in brief s_suffix this session, clone body + sites + live body read this session; js-wide census this session: 7 definers = 1 live + 6 clones; explode→do_name edge ALREADY :47; `imports.mjs --can` ALREADY this session) — rewire sites to the live export, delete clone.
- [x] `hacklib.c` s_suffix shk.js clone removal — C hacklib.c:344–359 it/you/Xs/X possessive absent from js/shk.js as an import (local clone :244 4-arm C-faithful, 8 live sites :528/:736/:752/:772/:777/:1141/:4946/:6309 shkname possessives instead of the live export js/do_name.js:418; C body in brief s_suffix this session, clone body + sites + live body read this session; js-wide census this session: 7 definers = 1 live + 6 clones; shk→do_name edge ALREADY :78; `imports.mjs --can` ALREADY this session) — rewire sites to the live export, delete clone.
- [x] `hacklib.c` s_suffix questpgr.js clone removal — C hacklib.c:344–359 it/you/Xs/X possessive absent from js/questpgr.js as an import (local clone :673 4-arm C-faithful, 1 live site :859 convert instead of the live export js/do_name.js:418; C body in brief s_suffix this session, clone body + site + live body read this session; js-wide census this session: 7 definers = 1 live + 6 clones; questpgr→do_name edge NEW — no do_name import; `imports.mjs --can` verdict this session: "Same shape as the 1866 edges already in js/") — add the import, rewire site to the live export, delete clone.
- [x] `hacklib.c` s_suffix potion.js s_suffix_pot rename-clone removal — C hacklib.c:344–359 it/you/Xs/X possessive absent from js/potion.js as an import (local clone :3000 `s_suffix_pot`, 3 live sites :3882/:3885/:3931 saddle-dip instead of the live export js/do_name.js:418; C body in brief s_suffix this session, clone body + sites + live body read this session; js-wide census this session: 7 definers = 1 live + 6 clones; potion→do_name edge ALREADY :181; `imports.mjs --can` ALREADY this session) — rewire sites to the live export, delete clone.


- [x] `mondata.c` attacktype mhitu.js attacktype_aatyp rename-clone removal — C mondata.c:54–57 1-line fordmg call absent from js/mhitu.js (local clone :1122 `attacktype_aatyp` some-scan, body read this session; 4 sites :1128/:1129 sticks WRAP/HUGS C mondata.c:657-658-shape, :1616/:1617 caught ENGL/HUGS C mon.c:3463-3464-shape instead of the live export js/mondata.js:81 read this session; C body in brief attacktype this session; js-wide census this session: 2 aatyp definers mhitu+uhitm; mhitu→mondata edge ALREADY :86) — rewire sites to the live export, delete clone.
- [x] `mondata.c` attacktype uhitm.js attacktype_aatyp rename-clone removal — C mondata.c:54–57 1-line fordmg call absent from js/uhitm.js (local clone :623 `attacktype_aatyp` !!fordmg(-1) 1-liner, body read this session; 3 sites :636 mswallower ENGL C mon.c:3189-shape, :3941/:3942 MAGC/BREA C mhitm.c:1464-1465-shape instead of the live export js/mondata.js:81 read this session; C body in brief attacktype this session; js-wide census this session: 2 aatyp definers mhitu+uhitm; uhitm→mondata edge ALREADY :114) — rewire sites to the live export, delete clone.


- [x] `hacklib.c` upstart trap.js clone removal — C hacklib.c:113–119 highc-first-char absent from js/trap.js as an import (local clone :226 with `if (!str)`+toUpperCase shape vs live String()+highc, 3 live sites :421 animate_statue C trap.c:834, :2038 yname, :2321 steed-pit C trap.c:1909 instead of the live export js/hacklib.js:497; C body in brief upstart this session, clone body + sites + live body read this session; trap→hacklib edge ALREADY :146; `imports.mjs --can` ALREADY this session) — rewire sites to the live export, delete clone.
- [x] `hacklib.c` upstart pickup.js clone removal — C hacklib.c:113–119 highc-first-char absent from js/pickup.js as an import (local clone :291 with `if (!str)`+toUpperCase shape vs live String()+highc, 5 live sites :231 ysimple_name, :1062 dfeature C pickup.c:405, :4197 theArt-locked, :4878 thesimpleoname-locked C pickup.c:3979, :4968 thesimpleoname-empty C pickup.c:4049 instead of the live export js/hacklib.js:497; C body in brief upstart this session, clone body + sites + live body read this session; pickup→hacklib edge ALREADY :121; `imports.mjs --can` ALREADY this session) — rewire sites to the live export, delete clone.
- [x] `hacklib.c` upstart apply.js clone removal — C hacklib.c:113–119 highc-first-char absent from js/apply.js as an import (local clone :1828 with `if (!str)`+toUpperCase shape vs live String()+highc, 4 live sites :899 mhe-takes-it C apply.c:1160, :1937/:1946/:1956 shift/appear/disappear C apply.c:650/:662/:678 instead of the live export js/hacklib.js:498; C body in brief upstart this session, clone body + sites + live body read this session; apply→hacklib edge ALREADY :146) — rewire sites to the live export, delete clone.
- [x] `hacklib.c` upstart do_name.js clone removal — C hacklib.c:113–119 highc-first-char absent from js/do_name.js as an import (local clone :1447 returning '' on falsy + toUpperCase vs live String()+highc, 8 live sites :493/:508/:511/:521 naming-refusal C do_name.c:166/:182/:185/:191, :607/:620 no-names C do_name.c:267/:278, :1501/:1504 orc-name C do_name.c:1575/:1576/:1579 instead of the live export js/hacklib.js:498; C body in brief upstart this session, clone body + sites + live body read this session; do_name→hacklib edge ALREADY :88) — rewire sites to the live export, delete clone.
- [x] `hacklib.c` upstart monmove.js clone removal — C hacklib.c:113–119 highc-first-char absent from js/monmove.js as an import (local clone :284 with String()+toUpperCase shape vs live String()+highc, 2 live sites :1606 web-spin C monmove.c:1286, :1747 door-ooze instead of the live export js/hacklib.js:498; C body in brief upstart this session, clone body + sites + live body read this session; monmove→hacklib edge ALREADY :119) — rewire sites to the live export, delete clone.
- [x] `hacklib.c` upstart readobjnam.js clone removal — C hacklib.c:113–119 highc-first-char absent from js/readobjnam.js as an import (local clone :256 with String()+toUpperCase shape vs live String()+highc, 3 live sites :708 ice-descr C objnam.c:3684, :805/:809 door-terrain C objnam.c:3815/:3819 instead of the live export js/hacklib.js:498; C body in brief upstart this session, clone body + sites + live body read this session; readobjnam→hacklib edge ALREADY :9) — rewire sites to the live export, delete clone.


- [x] `mondata.c` dmgtype mhitm.js clone removal — C mondata.c:712–715 1-line fromattack call absent from js/mhitm.js (local clone :785 |0-folded for-of adtyp scan, body in brief dmgtype this session; 9 sites :571/:574 resists_magm AD_MAGM/RBRE C mondata.c:223-224, :1869/:1871/:1873 rust/corr/fire C mhitm.c:1267-1271, :2174/:2175 SSEX/SEDU, :2866/:2867 sticks AD_STCK/WRAP, :3113 seduce C mon.c:556 instead of the live export js/monsters.js:565 read this session; mhitm→monsters edge ALREADY :120) — rewire sites to the live export, delete clone.
- [x] `mondata.c` dmgtype mhitu.js clone removal — C mondata.c:712–715 1-line fromattack call absent from js/mhitu.js (local clone :1098 |0-folded for-of adtyp scan, body read this session; 5 sites :1149/:1150 sticks AD_STCK/WRAP, :1637 STCK arm C uhitm.c:239-shape, :2134 SEDU/SSEX C mhitu.c:1963-1964, :3847 STUN C mhitu.c:1639 instead of the live export js/monsters.js:565 read this session; mhitu→monsters edge ALREADY :70) — rewire sites to the live export, delete clone.
- [x] `mondata.c` dmgtype monmove.js clone removal — C mondata.c:712–715 1-line fromattack call absent from js/monmove.js (local clone :1400 |0-folded for-of adtyp scan, body read this session; 1 site :1817 RUST/CORR C monmove.c:1629 instead of the live export js/monsters.js:565 read this session; monmove→monsters edge ALREADY :15) — rewire site to the live export, delete clone.
- [x] `mondata.c` dmgtype zap.js dmgtype_zap rename-clone removal — C mondata.c:712–715 1-line fromattack call absent from js/zap.js (local clone :2903 `dmgtype_zap` NATTK-bounded |0 scan, body read this session; 2 sites :2987/:2988 SEDU/SSEX C zap.c:802-803 instead of the live export js/monsters.js:565 read this session; zap→monsters edge ALREADY :263) — rewire sites to the live export, delete clone.
- [x] `mondata.c` attacktype mhitm.js attacktype_mm rename-clone removal — C mondata.c:54–57 1-line fordmg call absent from js/mhitm.js (local clone :2992 `attacktype_mm` |0-folded for-of aatyp scan, body read this session; 4 sites :2865 ENGL/HUGS, :3055 mswallower ENGL C mon.c:3189, :3560/:3561 EXPL/BOOM C mon.c:2855-2856 instead of the live export js/mondata.js:79 read this session; mhitm→mondata edge ALREADY :15) — rewire sites to the live export, delete clone.
- [x] `mondata.c` dmgtype_fromattack canonical export + mhitm/mhitu rewire — C mondata.c:700–708 mattk scan returning struct attack* or NULL absent from js/ as an export (body in brief dmgtype_fromattack this session; JS clones return boolean — ship iteration decides C-shape; brief sym census: mhitm.js:795 + mhitu.js:657 clones, bodies read this session; mondata.js:44 imports the mhitm clone, polyself.js:22 also names it); 4 sites mhitm :817/:818 + mhitu :675/:676 BLND EXPL/GAZE C mondata.c:260-261 — port canonical export at C-home, rewire clones.


- [x] `hacklib.c` upstart mthrowu.js clone removal — C hacklib.c:113–119 highc-first-char absent from js/mthrowu.js as an import (local clone :287 with `if (!str)`+toUpperCase shape vs live String()+highc, 1 live site :657 thitu wide-miss arm instead of the live export js/hacklib.js:497; C body in brief upstart this session, clone body + site + live body read this session; mthrowu→hacklib edge ALREADY :11; live doc keep-theirs note is pre-campaign) — rewire site to the live export, delete clone.
- [x] `hacklib.c` upstart read.js clone removal — C hacklib.c:113–119 highc-first-char absent from js/read.js as an import (local clone :2558 undocumented, `if (!str)`+toUpperCase shape vs live String()+highc, 1 live site :2720 genocide-nonexistent arm instead of the live export js/hacklib.js:497; C body in brief upstart this session, clone body + site + live body read this session; read→hacklib edge ALREADY :142; live doc keep-theirs note is pre-campaign) — rewire site to the live export, delete clone.


- [x] `mondata.c` attacktype makemon.js clone removal — C mondata.c:54–57 1-line fordmg call absent from js/makemon.js (local clone :2846 with a raw `===` scan, 5 live sites :1870/:2277/:2335/:2863/:2922 AT_ENGL/AT_EXPL arms instead of the live export js/mondata.js:79; C body in brief attacktype this session, clone body + sites read this session; makemon→mondata edge ALREADY :100) — rewire sites to the live export, delete clone. **Addressed:** D-3355 `18773ed32`.
- [x] `mondata.c` attacktype muse.js clone removal — C mondata.c:54–57 1-line fordmg call absent from js/muse.js (local clone :338 with a `mattk||[]` raw-`===` scan, 5 live sites :372/:402/:740/:2272/:2280 AT_GAZE arms instead of the live export js/mondata.js:79; C body in brief attacktype this session, clone body + sites read this session; muse→mondata edge ALREADY :53) — rewire sites to the live export, delete clone. **Addressed:** D-3355 `18773ed32`.
- [x] `mondata.c` attacktype polyself.js clone removal — C mondata.c:54–57 1-line fordmg call absent from js/polyself.js (local clone :371 with a raw `===` scan, 6 live sites :382 can_breathe wrapper/:567/:1927/:1933/:3016/:3020 AT_BREA/AT_CLAW/AT_SPIT/AT_GAZE arms instead of the live export js/mondata.js:79; C body in brief attacktype this session, clone body + sites read this session; polyself→mondata edge ALREADY :40) — rewire sites to the live export, delete clone. **Addressed:** D-3355 `18773ed32`.
- [x] `mondata.c` attacktype trap.js clone removal — C mondata.c:54–57 1-line fordmg call absent from js/trap.js (local clone :5578 with a `|0`-folded scan, 4 live sites :1909/:1910/:5683/:5684 AT_MAGC/AT_BREA arms instead of the live export js/mondata.js:79; C body in brief attacktype this session, clone body + sites read this session; trap→mondata edge ALREADY :148) — rewire sites to the live export, delete clone. **Addressed:** D-3355 `18773ed32`.
- [x] `mondata.c` dmgtype engrave.js clone removal — C mondata.c:712–715 1-line fromattack call absent from js/engrave.js (local clone :559 raw `===` adtyp scan without |0 folding, 2 live sites :575/:576 sticks AD_STCK/AD_WRAP arms C mondata.c:656–657 instead of the live export js/monsters.js:565 |0-folded AT_ANY scan; C body in brief dmgtype + sym 5-clone census this session, clone body + sites + live body read this session; engrave→monsters edge ALREADY :83; sibling clones eat/mhitm/mhitu/monmove stay for follow-up rows) — rewire sites to the live export, delete clone. **Addressed:** D-3355 `18773ed32`.
- [x] `mondata.c` dmgtype eat.js clone removal — C mondata.c:712–715 1-line fromattack call absent from js/eat.js (local clone :387 raw `===` adtyp scan without |0 folding, 2 live sites :418 polyfood AD_POLY arm C obj.h:324/:2093 C eat.c:1303 AD_STUN/AD_HALU instead of the live export js/monsters.js:565 |0-folded AT_ANY scan; C body in brief dmgtype + sym 5-clone census this session, clone body + sites + live body read this session; eat→monsters edge ALREADY :74; sibling clones mhitm/mhitu/monmove stay for follow-up rows) — rewire sites to the live export, delete clone. **Addressed:** D-3355 `18773ed32`.


- [x] `stairs.c` On_stairs dogmove.js + apply.js clone removal — C stairs.c:148–151 stairway_at!=NULL absent from js/dogmove.js + js/apply.js as imports (local clones js/dogmove.js:150 same-named upstair/dnstair/ladder+typ scan 1 live site :745 dog-apport, js/apply.js:4156 stairway_at wrapper 2 live sites :4205 use_bell/:4784 candelabrum-burn instead of the live export js/hack.js:3409 game.stairs walk; C body in brief On_stairs this session, clone bodies + sites + live body read this session; dogmove→hack :63, apply→hack :83 edges ALREADY) — rewire sites to the live export, delete clones. **Addressed:** D-3354 `191ed4aea`.


- [x] `hack.c` invocation_pos mklev.js + apply.js clone removal — C hack.c:982–986 Invocation_lev+svi.inv_pos absent from js/mklev.js + js/apply.js as imports (local clones js/mklev.js:20848 1 live site :33035 occupied C mklev.c:1810, js/apply.js:4148 2 live sites :4204 use_bell/:4783 candelabrum-burn instead of the live export js/hack.js:3434; C body in brief invocation_pos this session, clone bodies + sites + live body read this session; mklev→hack :166, apply→hack :83 edges ALREADY) — rewire sites to the live export, delete clones. **Addressed:** D-3353 `217726648`.


- [x] `mondata.h` unique_corpstat trap/teleport/zap/music.js clone removal — C mondata.h:174 G_UNIQ macro absent from js/ as a shared import (live export js/mon.js:2961, 3 live sites :374/:3011×2, + 4 identical clones: js/trap.js:232 2 sites :389/:396, js/teleport.js:155 2 sites :193/:407, js/zap.js:2898 2 sites :3033/:3308, js/music.js:174 `?? 0` shape 1 site :191; C body in brief unique_corpstat this session, clone bodies + sites + live body read this session; trap→mon :46, teleport→mon :92, zap→mon :264, music→mon :45 edges ALREADY) — rewire sites to the live export, delete clones. **Addressed:** D-3352 `85e8a632f`.
- [x] `mondata.c` attacktype engrave.js clone removal — C mondata.c:54–57 1-line fordmg call absent from js/engrave.js (local clone :559 with a raw `===` scan, 3 live sites :586/:587/:604 AT_ENGL/AT_HUGS arms instead of the live export js/mondata.js:79; C body in brief attacktype this session, clone body + sites read this session; engrave→mondata edge ABSENT — needs imports.mjs TDZ analysis like D-3335 before rewiring) — rewire sites to the live export, delete clone. **Addressed:** D-3352 `85e8a632f`.


- [x] `priest.c` histemple_at canonical export + shk/teleport rewire — C priest.c:153–158 ispriest+shroom+on_level absent from js/ as an export (3 identical clones, no live export: js/priest.js:86 C-home 2 sites :112/:293, js/shk.js:4683 1 site :4701, js/teleport.js:373 1 site :397; C body in brief histemple_at this session, clone bodies + sites read this session; callees in_rooms js/hack.js:1950 + on_level js/dungeon.js:1812 live; teleport→priest edge ALREADY :98, shk→priest edge ABSENT — needs imports.mjs TDZ analysis like D-3335 before rewiring) — export the canonical body at C-home js/priest.js:86, rewire shk/teleport sites, delete clones. **Addressed:** D-3351 `c7c586e3c`.


- [x] `mondata.c` attacktype artifact.js clone removal + live-export port — C mondata.c:54–57 1-line fordmg call absent from js/artifact.js (local clone :2849 with an inlined mattk scan instead of calling fordmg, sole live site :2930 Mb_hit AT_MAGC arm instead of a live export; C body in brief attacktype this session, clone body + site read this session; NO live export yet — 9 clones, none exported — port the 1-line body as `export function attacktype` at C-home js/mondata.js; artifact→mondata edge ALREADY :147, mondata→uhitm edge ABSENT — needs imports.mjs TDZ analysis like D-3335 before wiring) — port the live export, rewire site to it, delete clone. **Addressed:** D-3350 `350dcff17`
- [x] `mondata.c` attacktype dog.js clone removal — C mondata.c:54–57 1-line fordmg call absent from js/dog.js (local clone :164 with a raw `===` scan without |0 folding, 2 live sites :274/:708 AT_WEAP tamedog arms instead of the live export; C body in brief attacktype this session, clone body + sites read this session; live export shipped by the first attacktype row at js/mondata.js — port it there per that row if absent; dog→mondata edge ALREADY :58) — rewire sites to the live export, delete clone. **Addressed:** D-3350 `350dcff17`
- [x] `mondata.c` attacktype wizard.js clone removal — C mondata.c:54–57 1-line fordmg call absent from js/wizard.js (local clone :65 with a raw `===` scan without |0 folding, 2 live sites :113/:150 nasty AT_MAGC arms instead of the live export; C body in brief attacktype this session, clone body + sites read this session; live export shipped by the first attacktype row at js/mondata.js — port it there per that row if absent; wizard→mondata edge ABSENT — needs imports.mjs TDZ analysis like D-3335 before rewiring) — rewire sites to the live export, delete clone. **Addressed:** D-3350 `350dcff17`
- [x] `mondata.c` attacktype eat.js wrapper removal — C mondata.c:54–57 1-line fordmg call absent from js/eat.js as an import (local wrapper :388 calling the fordmg import directly, sole live site :2108 AT_MAGC arm C eat.c:1311 instead of the live export; C body in brief attacktype this session, wrapper body + site read this session; live export shipped by the first attacktype row at js/mondata.js — port it there per that row if absent; eat→mondata edge ALREADY :75) — rewire site to the live export, delete wrapper. **Addressed:** D-3350 `350dcff17`


- [x] `dungeon.c` Invocation_lev mklev.js clone removal — C dungeon.c:2017–2021 In_hell+deepest-1 absent from js/mklev.js as an import (local clone :20842 identical body, 2 live sites :20861 invocation_pos_mk + :27483 hellfill VS/stair instead of the ALREADY-imported live export js/mklev.js:150; C body in brief Invocation_lev this session, clone body + sites + live body read this session; same-module live uses :3235/:3245; mklev→dungeon edge ALREADY :150) — rewire sites to the live export, delete clone. **Addressed:** D-3349 `d0e3ce01b`
- [x] `dungeon.c` Invocation_lev apply.js clone removal — C dungeon.c:2017–2021 In_hell+deepest-1 absent from js/apply.js (local clone :4146 with a `lev || game.u?.uz` defaulting arm vs live's `!lev` guard, sole live site :4156 invocation_pos_apply no-arg call instead of importing live js/dungeon.js:2392; C body in brief Invocation_lev this session, clone body + site + live body read this session; apply→dungeon edge ABSENT — needs imports.mjs TDZ analysis like D-3335 before rewiring) — rewire site to `Invocation_lev(game.u?.uz)` if TDZ-safe, else late-bind, delete clone. **Addressed:** D-3349 `d0e3ce01b`


- [x] `mon.c` m_in_air port + do/teleport/trap.js rewire — C mon.c:2130–2136 flyer/floater/clinger-ceiling absent from js/mon.js as an export (4 clones, no live export: js/do.js:560 flyer/floater SUBSET 1 site :1009, js/mon.js:2313 C-home 4 sites :2911/:2950/:3089/:3091, js/teleport.js:207 2 sites :507/:520, js/trap.js:1157 5 sites :2966/:3774/:4130/:5928/:6002; C body in brief m_in_air this session, clone docs + sites read this session; do→mon :106, teleport→mon :92, trap→mon :46 edges ALREADY) — port the FULL C body at js/mon.js (C home), rewire do/teleport/trap sites, delete clones. **Addressed:** D-3348 `3d3580f61`


- [x] `priest.c` mon_aligntyp teleport.js clone removal — C priest.c:280–289 EPRI/EMIN/maligntyp absent from js/teleport.js (local clone :342 with an EPRI-fallback arm vs live's `?? 0` guards, sole live site :355 is_lminion instead of importing live js/priest.js:150; C body in brief mon_aligntyp this session, clone body + site + live body read this session; teleport→priest edge ABSENT — clone comment :340 documents the priest→makemon→teleport cycle (D-1110), needs imports.mjs TDZ analysis like D-3335 before rewiring) — rewire site to the live export if TDZ-safe, else late-bind, delete clone. **Addressed:** D-3347 `7c9d1a96d`


- [x] `mondata.c` attacktype_fordmg apply.js clone removal — C mondata.c:42–50 mattk scan absent from js/apply.js (local clone :4559 without live's |0 param folding, sole live site :4685 ustuck-engulf-blind instead of importing live js/uhitm.js:609; C body in brief attacktype_fordmg this session, clone body + site + live body read this session; apply→uhitm edge ALREADY :110) — rewire site to the live export, delete clone. **Addressed:** D-3346 `a99f09d15`
- [x] `mondata.c` attacktype_fordmg eat.js clone removal — C mondata.c:42–50 mattk scan absent from js/eat.js (local clone :394 without live's |0 param folding, 3 live sites :387/:872/:2170 instead of importing live js/uhitm.js:609; C body in brief attacktype_fordmg this session, clone body + sites + live body read this session; eat→uhitm edge ABSENT — needs imports.mjs TDZ analysis like D-3335 before rewiring) — rewire sites to the live export if TDZ-safe, else late-bind, delete clone. **Addressed:** D-3346 `a99f09d15`
- [x] `mondata.c` attacktype_fordmg mon.js clone removal — C mondata.c:42–50 mattk scan absent from js/mon.js (local clone :300 without live's |0 param folding, 2 live sites :351/:352 breath-weapon arms instead of importing live js/uhitm.js:609; C body in brief attacktype_fordmg this session, clone body + sites + live body read this session; mon→uhitm edge ABSENT — needs imports.mjs TDZ analysis like D-3335 before rewiring) — rewire sites to the live export if TDZ-safe, else late-bind, delete clone. **Addressed:** D-3346 `a99f09d15`
- [x] `mondata.c` attacktype_fordmg region.js clone removal — C mondata.c:42–50 mattk scan absent from js/region.js (local clone :320 without live's |0 param folding, 2 live sites :356/:357 instead of importing live js/uhitm.js:609; C body in brief attacktype_fordmg this session, clone body + sites + live body read this session; region→uhitm edge ABSENT — needs imports.mjs TDZ analysis like D-3335 before rewiring) — rewire sites to the live export if TDZ-safe, else late-bind, delete clone. **Addressed:** D-3346 `a99f09d15`


- [x] `invent.c` useupf zap.js clone removal — C invent.c:4763–4783 floor-pile consume absent from js/zap.js (local clone :879 subset without the at_u/hideunder arms, sole live site :941 burn_floor_objects delquan instead of importing live js/invent.js:4869; C body in brief useupf this session, clone body + site read this session; zap→invent edge ALREADY :240; live keeps the shop-bill named omit) — rewire site to the live export, delete clone. **Addressed:** D-3345 `cd0939656`


- [x] `dungeon.c` Invocation_lev hack.js clone removal — C dungeon.c:2017–2021 In_hell+deepest-1 absent from js/hack.js (local clone :3397 identical body, sole live site :3447 invocation_pos instead of importing live js/dungeon.js:2392; C body in brief Invocation_lev this session, clone body + site + live body read this session; hack→dungeon edge ALREADY :77) — rewire site to the live export, delete clone.


- [x] `mkroom.c` somex dog.js clone removal — C mkroom.c:666–669 rn1(hx-lx+1,lx) absent from js/dog.js (local clone :876, 3 live sites :907/:922/:928 instead of importing live js/mklev.js:32977; C body in brief somex this session, clone body + sites read this session; dog→mklev edge ABSENT — clone comment :873-875 documents mklev→trap→dog cycle, needs imports.mjs cycle/TDZ analysis like D-3335 before rewiring) — rewire sites to the live export if TDZ-safe, else late-bind, delete clone.


- [x] `rm.h` m_at teleport.js clone removal — C rm.h:510–511 MON_AT-grid m_at absent from js/teleport.js (local clone :133 fmon-scan without the live steed-skip arm, 7 live sites :493/:501/:601/:774/:1163/:1383/:2728 instead of using the ALREADY-imported live js/mon.js:1745 as mon_m_at :92; C macro + refs in brief m_at this session, clone body + sites + live body read this session, teleport→mon edge ALREADY :92 this session — mon→teleport back-edge :66 exists, same-SCC hoisted-fn shape per D-3335) — rewire sites to mon_m_at, delete clone.
- [x] `dungeon.c` dunlev fountain.js clone removal — C dungeon.c:1325–1328 lev->dlevel absent from js/fountain.js (local clone :977 `lev?.dlevel ?? 1`, sole live site :1328 dipfountain case-29 mkgold line instead of importing live js/dungeon.js:1089; C body in brief dunlev this session, clone body + site read this session; fountain→dungeon edge ABSENT — `imports.mjs --can` SAFE this session, hoisted fn, verify judges TDZ like D-3339) — rewire site to the live export, delete clone.
- [x] `dungeon.c` dunlev trap.js clone removal — C dungeon.c:1325–1328 lev->dlevel absent from js/trap.js (local clone :636 `lev?.dlevel ?? 1`, 2 live sites :675/:4216 instead of importing live js/dungeon.js:1089; C body in brief dunlev this session, clone body + sites read this session, trap→dungeon edge ALREADY :129 this session; sibling dunlevs_in_dungeon clone :639 stays for its own row) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` dunlevs_in_dungeon dokick.js clone removal — C dungeon.c:1332–1335 num_dunlevs absent from js/dokick.js (local clone :185, sole live site :593 kick-hole depth check instead of importing live js/dungeon.js:1094; C body + census in brief dunlevs_in_dungeon this session, clone body + site read this session, dokick→dungeon edge ALREADY :36 this session — sibling dunlev already live-imported there per D-3336) — rewire site to the live export, delete clone.
- [x] `dungeon.c` dunlevs_in_dungeon fountain.js clone removal — C dungeon.c:1332–1335 num_dunlevs absent from js/fountain.js (local clone :980, sole live site :1328 dipfountain case-29 mkgold line instead of importing live js/dungeon.js:1094; C body + census in brief dunlevs_in_dungeon this session, clone body + site read this session; fountain→dungeon edge ABSENT — `imports.mjs --can` SAFE this session, hoisted fn, verify judges TDZ like D-3339; sibling dunlev clone :977 stays for its own row) — rewire site to the live export, delete clone.
- [x] `dungeon.c` dunlevs_in_dungeon teleport.js clone removal — C dungeon.c:1332–1335 num_dunlevs absent from js/teleport.js (local clone :2249, 4 live sites :2276/:2286/:2577/:2586 instead of importing live js/dungeon.js:1094; C body + census in brief dunlevs_in_dungeon this session, clone body + sites read this session, teleport→dungeon edge ALREADY :60-63 this session) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` dunlevs_in_dungeon trap.js clone removal — C dungeon.c:1332–1335 num_dunlevs absent from js/trap.js (local clone :639, sole live site :651 level-teleport bottom instead of importing live js/dungeon.js:1094; C body + census in brief dunlevs_in_dungeon this session, clone body + site read this session, trap→dungeon edge ALREADY :129 this session; sibling dunlev clone :636 stays for its own row) — rewire site to the live export, delete clone.


- [x] `dungeon.c` ledger_no do.js clone removal — C dungeon.c:1376–1379 dlevel+ledger_start absent from js/do.js (local clone :1367, 5 live sites :1613/:1686/:1725/:1836/:3565 instead of importing live js/dungeon.js:1097; C body in brief ledger_no this session, clone body + sites read this session, do→dungeon edge ALREADY :100 this session — file already live-imports dunlev/dunlevs_in_dungeon :97; 5 further clones — mon/muse/potion/shknam/teleport — stay for their own rows) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` ledger_no mon.js clone removal — C dungeon.c:1376–1379 dlevel+ledger_start absent from js/mon.js (local clone :1766, 2 live sites :1958/:2035 instead of importing live js/dungeon.js:1097; C body in brief ledger_no this session, clone body + sites read this session, mon→dungeon edge ALREADY :71 this session; 4 further clones — muse/potion/shknam/teleport — stay for their own rows) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` ledger_no muse.js clone removal — C dungeon.c:1376–1379 dlevel+ledger_start absent from js/muse.js (local clone :2181 |0-coerced dnum/dlevel read, 12 live sites :2542/:2609/:2672/:2679/:2690/:2696/:2707/:2717/:2727/:2734/:2741/:3103 instead of importing live js/dungeon.js:1097; C body in brief ledger_no this session, clone body + sites read this session, muse→dungeon edge ALREADY :95 this session; 3 further clones — potion/shknam/teleport — stay for their own rows) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` ledger_no potion.js clone removal — C dungeon.c:1376–1379 dlevel+ledger_start absent from js/potion.js (local clone :1733 |0-coerced dlevel+ledger_start read, 2 live sites :1778/:1803 instead of importing live js/dungeon.js:1097; C body + clone body in brief ledger_no this session, sites read this session, potion→dungeon edge ALREADY :201 this session; 2 further clones — shknam/teleport — stay for their own rows) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` ledger_no shknam.js clone removal — C dungeon.c:1376–1379 dlevel+ledger_start absent from js/shknam.js (local clone :268 ledger_start+dlevel read, sole live site :519 nameWanted shknam arm instead of importing live js/dungeon.js:1097; C body + clone census in brief ledger_no this session, clone body + site read this session, shknam→dungeon edge ALREADY :44 this session — file already live-imports Is_special; 1 further clone — teleport — stays for its own row) — rewire site to the live export, delete clone.
- [x] `dungeon.c` ledger_no teleport.js clone removal — C dungeon.c:1376–1379 dlevel+ledger_start absent from js/teleport.js (local clone :2839 |0-coerced dnum/dlevel locals, sole live site :3096 migrate_to_level instead of importing live js/dungeon.js:1097; C body + clone census in brief ledger_no this session, clone body + site read this session, teleport→dungeon edge ALREADY :60-63 this session; last of the 6 clones) — rewire site to the live export, delete clone.


- [x] `do_name.c` Amonnam fountain.js clone removal — C do_name.c:1159–1165 highc(a_monnam) absent from js/fountain.js (local clone :197 x_monnam flags-0 call dropping the live SUPPRESS_SADDLE-when-named arm, 2 live sites :214/:219 yells arm instead of importing live js/do_name.js:1234; C body in brief Amonnam this session, clone body + sites read this session, fountain→do_name edge ALREADY :102 this session) — rewire sites to the live export, delete clone.
- [x] `do_name.c` Amonnam mhitu.js clone removal — C do_name.c:1159–1165 highc(a_monnam) absent from js/mhitu.js (local clone :3261 x_monnam flags-0 call dropping the live SUPPRESS_SADDLE-when-named arm, sole live site :3303 Amonbuf instead of importing live js/do_name.js:1234; C body in brief Amonnam this session, clone body + site read this session, mhitu→do_name edge ALREADY :38 this session) — rewire site to the live export, delete clone.
- [x] `do_name.c` Amonnam zap.js clone removal — C do_name.c:1159–1165 highc(a_monnam) absent from js/zap.js (local clone :810 mon_nam-based highc with ARTICLE_THE semantics instead of ARTICLE_A, dropping the live SUPPRESS_SADDLE-when-named arm, sole live site :3464 suddenly-appears instead of importing live js/do_name.js:1234; C body in brief Amonnam this session, clone body + site read this session, zap→do_name edge ALREADY :279 this session) — rewire site to the live export, delete clone.


- [x] `monmove.c` monflee music.js clone removal — C monmove.c:462–530 mflee + fleemsg + Vrock + track-clear absent from js/music.js (local async clone :187 dropping live's flees_light/immobile-flinch/Vrock/release_hero/mon_track_clear arms, sole live site :227 instead of importing live js/monmove.js:1109; C body in brief monflee this session, clone body + site read this session, no static music→monmove edge, imports.mjs SAFE this session — hoisted fn, verify judges TDZ) — rewire site to the live export, delete clone.


- [x] `mthrowu.c` m_useup zap.js clone removal — C mthrowu.c:1162–1170 quan>1 decrement+weight else m_useupall absent from js/zap.js (local clone :1563 with manual minvent unlink and NO weight() recompute on the quan>1 arm, 2 live sites :1774/:3390 instead of importing live js/mthrowu.js:184; C body in brief m_useup this session, clone body + sites read this session, zap→mthrowu edge ALREADY :280 this session; muse.js:1313 second clone with 9 sites stays for its own row) — rewire sites to the live export, delete clone.
- [x] `mthrowu.c` m_useup muse.js clone removal — C mthrowu.c:1162–1170 quan>1 decrement+weight else m_useupall absent from js/muse.js (local clone :1313 with NO weight() recompute on the quan>1 arm and manual minvent unlink instead of m_useupall on the else arm, 18 live sites :1083/:1529/:1751/:1756/:1788/:2369/:2397/:2440/:2673/:2791/:2802/:2815/:3121/:3133/:3141/:3176/:3257/:3272 instead of importing live js/mthrowu.js:184; C body in brief m_useup this session, clone body + sites read this session, muse→mthrowu edge ALREADY :29 this session) — rewire sites to the live export, delete clone.


- [x] `potion.c` healup zap.js clone removal — C potion.c:1428–1458 heal + blind/sick cure absent from js/zap.js (local sync clone :2620 writing u.Blinded/u.Sick directly, dropping live's make_blinded/make_deaf/make_vomiting/make_sick arms, sole live site :4575 SPE_HEALING instead of importing live async js/potion.js:2231; C body in brief healup this session, clone body + site read this session, zap→potion edge ALREADY :290 this session) — rewire site to the live export with await, delete clone. **Addressed:** D-3337 `99f3bd24a`


- [x] `dungeon.c` ledger_no dig.js clone removal — C dungeon.c:1376–1379 dlevel+ledger_start absent from js/dig.js (local clone :306, sole live site :1004 instead of importing live js/dungeon.js:1097; C body in brief ledger_no this session, clone body + site read this session, dig→dungeon edge ALREADY :73 this session; 6 further clones — do/mon/muse/potion/shknam/teleport — stay for their own rows) — rewire site to the live export, delete clone.
- [x] `dungeon.c` dunlev dokick.js clone removal — C dungeon.c:1325–1328 dlevel read absent from js/dokick.js (local clone :185 byte-identical to live js/dungeon.js:1089, sole live site :595 instead of importing it; C body in brief dunlev this session, clone body + site read this session, dokick→dungeon edge ALREADY :36 this session) — rewire site to the live export, delete clone.


- [x] `mkroom.c` somex teleport.js clone removal — C mkroom.c:666–669 rn1(hx-lx+1,lx) absent from js/teleport.js (local clone :945, 2 live sites :959/:963 instead of importing live js/mklev.js:32977; C body in brief somex this session, clone body + sites read this session, no static teleport→mklev edge — dynamic-import only + D-1101 cycle comment :342, imports.mjs SAFE this session — hoisted fn, verify judges TDZ; dog.js:876 second clone with 3 sites stays for its own row) — rewire sites to the live export, delete clone.


- [x] `trap.c` t_at steed.js clone removal — C trap.c:6502–6512 ftrap-chain scan absent from js/steed.js (local clone :163 reading game.ftrap vs live js/trap.js:1119 reading game.level?.traps, sole live site :573; C body in brief t_at this session, clone body + site read this session, steed→trap edge ALREADY :61 this session) — confirm both trap chains alias, then rewire site to the live export, delete clone.


- [x] `do_name.c` Amonnam teleport.js clone removal — C do_name.c:1159–1165 highc(a_monnam) absent from js/teleport.js (local clone :101 x_monnam flags-0 call dropping the live SUPPRESS_SADDLE-when-named arm, sole live site :1145 instead of importing live js/do_name.js:1234; C body in brief Amonnam this session, clone body + site read this session, teleport→do_name edge ALREADY :66 this session) — rewire site to the live export, delete clone. **Addressed:** D-3333 `b98ade69c`


- [x] `hack.c` money_cnt sit.js clone removal — C hack.c:4514–4522 first-COIN_CLASS-quan walk absent from js/sit.js (local clone :1084 array-only walk with no null-elem guard, no |0 folding, no nobj-chain arm, sole live site :1225 `money_cnt(game.invent)` instead of importing live js/shk.js:4767; C body in brief money_cnt this session, clone body + site read this session, imports.mjs SAFE this session despite the stale "end/shk cycles" comment — a cycle alone is not a blocker) — rewire site to the live export, delete clone. **Addressed:** D-3332 `08e30b12c`


- [x] `dungeon.c` on_level teleport.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/teleport.js (local clone :359 with !!a&&!!b guard, 4 live sites :401/:417/:2606/:2651 instead of importing live js/dungeon.js:1810; C body in brief on_level this session, clone body + sites read this session, teleport→dungeon edge ALREADY :63 this session) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` on_level shk.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/shk.js (local clone :4752 with !!a&&!!b guard, 5 live sites :342/:2049/:4687/:5203/:5236 instead of importing live js/dungeon.js:1810; C body in brief on_level this session, clone body + sites read this session, shk→dungeon edge ALREADY :128 this session) — verify no site passes nullish pair (C NONNULLARG12; sites pass eshk?/epri? shoplevel/shrlevel vs u.uz), then rewire sites to the live export, delete clone.
- [x] `dungeon.c` on_level priest.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/priest.js (local clone :55 with !!a&&!!b guard, 2 live sites :98/:773 instead of importing live js/dungeon.js:1810; C body in brief on_level this session, clone body + sites read this session, imports.mjs SAFE this session — in-SCC hoisted-name shape, verify judges TDZ) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` on_level getpos.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/getpos.js (local clone :556 WITHOUT the !!a&&!!b guard — unguarded |0 shape identical to live js/dungeon.js:1810, sole live site :568 instead of importing it; C body in brief on_level this session, clone body + site read this session, imports.mjs SAFE this session — in-SCC hoisted-name shape, verify judges TDZ) — rewire site to the live export, delete clone.
- [x] `dungeon.c` on_level vault.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/vault.js (local clone :142 with !!a&&!!b guard, 2 live sites :178/:1092 instead of importing live js/dungeon.js:1810; C body in brief on_level this session, clone body + sites read this session, imports.mjs SAFE this session — in-SCC hoisted-name shape, verify judges TDZ) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` on_level muse.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/muse.js (local clone :2208 WITHOUT the !!a&&!!b guard — unguarded |0 shape identical to live js/dungeon.js:1810, sole live site :3115 instead of importing it; C body in brief on_level this session, clone body + site read this session, muse→dungeon edge ALREADY :95 this session) — rewire site to the live export, delete clone.


- [x] `rm.h` m_at uhitm.js clone removal — C rm.h:510–511 MON_AT-gated lookup call absent from js/uhitm.js (local clone :465 fmon-only scan with no dead/steed/offmap/seg arms, 5 live call sites :3616/:3695/:4215/:4262/:5100 instead of importing live js/mon.js:1745; C body in brief m_at this session, clone body + sites read this session, imports.mjs ALREADY this session) — rewire sites to the live export, delete clone.
- [x] `rm.h` m_at dig.js clone removal — C rm.h:510–511 MON_AT-gated lookup call absent from js/dig.js (local clone :224 fmon scan with mhp>0 arm only, 4 live call sites :751/:789/:1728/:2690 instead of importing live js/mon.js:1745; clone body in brief m_at output this session, sites read this session, imports.mjs SAFE this session despite the stale `:223 ↔ mon.js cycle` comment — a cycle alone is not a blocker) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` on_level dokick.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/dokick.js (local clone :1779 `!!(a&&b&&…)` guard, sole live site :1792 `on_level(u.uz, game.qstart_level)` instead of importing live js/dungeon.js:1810; C body + 79 refs in brief on_level this session, clone body + site read this session, imports.mjs SAFE this session — in-SCC hoisted-name shape, verify judges TDZ) — rewire site to the live export, delete clone.


- [x] `dungeon.c` Is_branchlev — C dungeon.c:1464–1473 branches-scan loop absent from js/ (no export; brief this session; sole same-name JS is local clone js/end.js:624; 11 C call sites incl bones/mklev/mkmaze/restore; callee live js/dungeon.js:1809) — port to C locus + rewire clone.
- [x] `dungeon.c` has_ceiling clone removal — C dungeon.c:1689–1698 endgame-non-earth gate absent from js/dothrow.js + js/mon.js + js/potion.js (local clones :1223/:3944/:642 instead of importing live js/dungeon.js:1330; brief this session: 13 code refs + decl, C-locus body read this session) — rewire clone call sites to the C-locus export, delete clones.
- [x] `dungeon.c` on_level quest.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/quest.js (local clone :54 with !!a&&!!b guard, 6 live call sites :62/:67/:72/:208/:475/:526 instead of importing live js/dungeon.js:1809; C body + 79 refs in brief on_level this session, clone body + sites read this session, quest→dungeon edge ALREADY this session) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` on_level dig.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/dig.js (local clone :1647 with !!a&&!!b guard, 3 live call sites :2260/:2778/:2839 instead of importing live js/dungeon.js:1809; C body in brief on_level + clone body in brief JS BODY this session, sites read this session, imports.mjs ALREADY this session) — rewire sites to the live export, delete clone.
- [x] `dungeon.c` on_level do.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/do.js (local clone :1374 WITHOUT the !!a&&!!b guard — `(a?.dnum|0)===(b?.dnum|0)&&...`, 7 live call sites :1385/:1721/:1735/:1740/:2481/:2502/:3468 instead of importing live js/dungeon.js:1809; C body in brief on_level this session, clone body + sites read this session, imports.mjs ALREADY this session) — verify no site passes nullish (C is NONNULLARG12), then rewire sites to the live export, delete clone.
- [x] `dungeon.c` on_level end.js clone removal — C dungeon.c:1439–1443 dnum+dlevel equality absent from js/end.js (local clone :609 with !!a&&!!b guard, sole live site :618 inside the Is_branchlev clone — the queued `dungeon.c` Is_branchlev row — instead of importing live js/dungeon.js:1809; C body in brief on_level this session, clone body + sites read this session, end→dungeon edge ALREADY this session) — rewire with the Is_branchlev row or retire when it deletes the clone.


- [x] `dungeon.c` Is_special end/quest clone removal — C dungeon.c:1448–1457 sp_levchn scan call absent from js/end.js + js/quest.js (local clones :616/:61 instead of importing live js/dungeon.js:2871; brief this session: 14 C call sites, callee live js/dungeon.js:1809) — rewire clone call sites to the C-locus export, delete clones.


- [x] `rm.h` m_at shknam.js clone removal — C rm.h:510–511 MON_AT-gated lookup call absent from js/shknam.js (local clone :268 with 2 live call sites :624/:677 instead of importing live js/mon.js:1749; C body + 188 refs in brief this session, JS read this session); rewire both sites to the live export, delete clone.


- [x] `do.c` badspot — C do.c:1400–1406 `typ!=ROOM/AIR/CORR || MON_AT` absent from js/ (no symbol; brief this session; sole C ref is the commented-out decl :25 — dead in C) — resolve by-design or port module-local (C static).
- [x] `shknam.c` free_eshk — C shknam.c:569–576 `free ESHK + isshk=0` absent from js/ (no symbol; brief this session; sole src ref is extern.h:2981 decl — dead in src, util/sfctool.c twin is tooling) — resolve by-design (GC) or port.
- [x] `vault.c` free_egd — C vault.c:35–42 `free EGD + isgd=0` absent from js/ (no symbol; brief this session; sole src ref is extern.h:3548 decl — dead in src, util/sfctool.c twin is tooling) — resolve by-design (GC) or port.
- [x] `hacklib.c` dist2 mon.js duplicate removal — C hacklib.c:673–678 `dx*dx+dy*dy` call absent from js/ importers (duplicate export js/mon.js:1124 instead of live js/hacklib.js:23; brief this session: 2 exports, 10 importers on the wrong-locus mon.js edge + 2 internal mon.js uses); rewire all to the C-locus export, delete duplicate.

## 2026-10-02

- [x] `coloratt.c` get_nhcolor_from_256_index — C coloratt.c:1024–1031 `IndexOk → color_256_definitions[idx].value else NO_COLOR|NH_BASIC_COLOR` absent from js/ (no symbol; brief this session; 0 C refs — dead in C) — resolve by-design or port. **Addressed:** D-3326 `0e60ede85`


- [x] `pager.c` domenucontrols — C pager.c:2820–2827 `create_nhwindow + show_menu_controls(cwin,FALSE) + display + destroy` absent from js/ (no symbol; brief this session; sole C ref is the decl-only :48 — dead in C; callee live js/dokeylist.js:210) — port module-local (C staticfn) or resolve by-design.
- [x] `allmain.c` early_init — C allmain.c:33–45 `program_state_init + decl/objects/monst/sys/runtime inits` absent from js/ (no symbol; brief this session; sole caller unixmain.c:66 port entry; callees live incl js/decl.js:97 + js/sys.js:37 + js/monsters.js:222) — port or resolve by-design.


- [x] `hacklib.c` distmin shknam.js clone removal — C hacklib.c:657–669 max(|dx|,|dy|) call absent from js/shknam.js (local clone :268 inlines it instead of importing the live export js/hacklib.js:19; brief this session: `!! ALSO 1 LOCAL CLONE(S)`; second export js/mon.js:1130 needs the C-locus decision); rewire its call site(s) to the C-locus export, delete clone.
- [x] `hacklib.c` nh_snprintf — C hacklib.c:854–875 varargs `vsnprintf + nul-terminate` absent from js/ (no symbol; brief this session; refs are decls + date.c:11/mdlib.c:311 macro uses; impossible arm `#if 0`) — resolve by-design (JS strings need no snprintf) or port.


- [x] `music.c` awakener a_monnam clone removal (re-queued D-3323: D-3322 archived its refill unshipped — both clones still present, brief-verified this session) — C do_name.c:1151–1156 `has_mgivenname ? SUPPRESS_SADDLE : 0` arm absent from js/music.js:266 (passes suppress `0` + invented `|| 'it'`) serving C music.c:124; live js/do_name.js:1221; rewire js/music.js:350 (ALREADY edge js/music.js:43), delete clone; same-file companion js/music.js:158 Amonnam twin inlines the same suppress-0 call (C Amonnam do_name.c:1158–1165 is highc(a_monnam), live js/do_name.js:1234; rewire js/music.js:632 serving C music.c:376), delete clone.


- [x] `trap.c` animate_statue a_monnam clone removal (audit 2269–2275) — C do_name.c:1151–1156 ARTICLE_A semantics (an/a selection, SUPPRESS_SADDLE, hallu/invisible arms) absent from js/trap.js:247 (naive `a ${mon_nam}`) serving C trap.c:847; live js/do_name.js:1221; rewire js/trap.js:452 (ALREADY edge), delete clone.
- [x] `hack.c` moverock_core a_monnam clone removal (audit 2269–2275) — C do_name.c:1151–1156 ARTICLE_A arms (SUPPRESS_SADDLE, hallu/invisible/named-pet; own doc defers them) absent from js/hack.js:300 serving C hack.c:462; live js/do_name.js:1221; rewire js/hack.js:1056 (ALREADY edge), delete clone (distinct arm from archived D-2739/D-1859).


- [x] `do_wear.c` fingers_or_gloves eat.js clone removal (audit 2269–2275) — C do_wear.c:59–65 check_gloves=FALSE arm absent from js/eat.js:2720 (clone ignores the flag, returns 'gloves' when uarmg set, so C eat.c:1774 start_tin "tin slips" prints gloves vs C fingers; gauntlets + poly-finger arms absent too); rewire js/eat.js:3825/:3993 to live js/do_wear.js:3981 (ALREADY edge), delete clone.


- [x] `end.c` really_done — C-correct first-stack return absent from js/end.js:1225 (local summing clone js/end.js:458; C hack.c:4513–4522 money_cnt returns the first stack, live js/shk.js:4767; same rewire + whole-body brief-check as the shipped fountain twin).
- [x] `shk.c` finish_paybill — C-correct first-stack return absent from js/end.js:1331 (local summing clone js/end.js:458; C hack.c:4513–4522, live js/shk.js:4767; C shk.c:2723; same rewire + whole-body brief-check as the shipped fountain twin).
- [x] `monmove.c` set_apparxy — C-correct first-stack return absent from js/monmove.js:1021 (local summing clone js/monmove.js:743; C hack.c:4513–4522, live js/shk.js:4767; C monmove.c:2198; same rewire + whole-body brief-check as the shipped fountain twin).


- [x] `fountain.c` dipfountain — C :442 `set_levltyp(u.ux,u.uy,ROOM)` inlined as typ+flags+looted+counts at js/fountain.js:1269–1279 (brief 2026-10-02; live js/trap.js:881; CAN_OVERWRITE rm.h:320 passes: never LADDER/STAIRS here) + case-28 `money_cnt` sums via local clone js/fountain.js:243 while C hack.c:4513–4522 returns the first stack (live js/shk.js:4767).
- [x] `fountain.c` dryup — C :231 `set_levltyp(x,y,ROOM)` inlined at js/fountain.js:761–766 (brief 2026-10-02; live js/trap.js:881); 7/7 C callers wired (cmd.c:921→js/polyself.js:3033 domonability gremlin arm).
- [x] `fountain.c` breaksink — C :586 `set_levltyp(x,y,FOUNTAIN)` inlined at js/fountain.js:330–340 (brief 2026-10-02; live js/trap.js:881).
- [x] `fountain.c` gush — C :152 `set_levltyp(x,y,POOL)` inlined at js/fountain.js:695–699 (brief 2026-10-02; live js/trap.js:881; C staticfn → module-local kept).
- [x] `fountain.c` wash_hands — local `fingers_or_gloves` clone js/fountain.js:966 vs live js/do_wear.js:3981 (brief 2026-10-02; same predicate/shape modulo body_part latebind — rewire to the export, delete clone).
- [x] `fountain.c` drinksink — local `a_monnam` clone js/fountain.js:293 (naive a/an over data.name; hallu/named diverge) vs live js/do_name.js:1221 `x_monnam ARTICLE_A` (brief 2026-10-02; case-3 sewer-rat arm).

- [x] `fountain.c` floating_above — missing arm: C fountain.c:25–30 utrap/TT_INFLOOR||TT_LAVA "trapped in the %s" + surface() arm absent from js/fountain.js:273 floating_above (default message only; brief 2026-10-02; surface js/sit.js:475 live) @d1f323f2b **Addressed:** D-3318 `e33fbee37`


- [x] `mon.c` mondied — missing arm: C mon.c:3258–3260 `(accessible(mx,my) || is_pool(mx,my))` corpse gate absent from js/mhitm.js:3980 mondied (self-named omit "floor tiles always attempt"; brief 2026-10-02; callees accessible js/monmove.js:840 + is_pool js/hack.js:2080 live) @d1f323f2b **Addressed:** D-3317 `1f248868c`


- [x] `alloc.c` dupstr_n — C `alloc.c:253–261` absent from js/ (no symbol; extern global.h:314, 0 call refs — dead in C; LARGEST_INT panic guard + lenout + alloc/strcpy, callee live js/alloc.js:52; sibling of the dupstr PARTIAL panic-guard gap) — resolve by-design or port (brief 2026-10-02) @9332ca054 **Addressed:** D-3316 `d1f323f2b`


- [x] `invent.c` safeq_xprname — C `invent.c:2180–2184` absent from js/ (no symbol; C staticfn xprname wrapper with safeq_xprn_ctx let/dot, decl-only :27 — dead in C; callee live js/objnam.js:3807) — resolve by-design or port (brief 2026-10-02) @bdd35be25
- [x] `invent.c` safeq_shortxprname — C `invent.c:2188–2192` absent from js/ (no symbol; C staticfn, decl-only :28 — dead in C; xprname over ansimpleoname, callees live js/objnam.js:3807 + :3007) — resolve by-design or port (brief 2026-10-02) @bdd35be25
- [x] `invent.c` any_obj_ok — C `invent.c:1710–1715` absent from js/ (no symbol; 0 refs in C — dead in C; getobj callback obj→GETOBJ_SUGGEST else EXCLUDE, callee-free) — resolve by-design or port (same C file as safeq pair; brief 2026-10-02) @9332ca054
- [x] `invent.c` worn_wield_only — C `invent.c:5309–5325` absent from js/ (no symbol; C staticfn, decl-only :17 — dead in C; query_objlist callback owornmask!=0 `#if 1` arm with `#else` dead, callee-free) — resolve by-design or port (brief 2026-10-02) @9332ca054


- [x] `cfgfiles.c` cnf_line_GDBPATH — C `cfgfiles.c:1082–1094` absent from js/ (no symbol; C staticfn, decl-only :82 — dead in C; PANICTRACE-gated file_exists + sysopt.gdbpath free/dupstr, callees live js/cfgfiles.js:425 + js/dungeon.js:267) — resolve by-design or port (brief 2026-10-02) @bdd35be25
- [x] `cfgfiles.c` cnf_line_GREPPATH — C `cfgfiles.c:1097–1109` absent from js/ (no symbol; C staticfn, decl-only :83 — dead in C; same shape as GDBPATH, sysopt.greppath) — resolve by-design or port (brief 2026-10-02) @bdd35be25
- [x] `cfgfiles.c` cnf_line_SOUNDDIR — C `cfgfiles.c:1222–1228` absent from js/ (no symbol; USER_SOUNDS-gated C staticfn, decl-only :98 — dead in C; sounddir free + dupstr, callee live js/dungeon.js:267) — resolve by-design or port (same C file as GDBPATH head; brief 2026-10-02) @9332ca054
- [x] `cfgfiles.c` cnf_line_SOUND — C `cfgfiles.c:1231–1235` absent from js/ (no symbol; C staticfn, decl-only :99 — dead in C; add_sound_mapping(bufp) + TRUE, callee live js/sounds.js:253) — resolve by-design or port (brief 2026-10-02) @9332ca054


- [x] `cmd.c` do_rush_northwest — C `cmd.c:1468–1472` absent from js/ (no symbol; `set_move_cmd(DIR_NW,3)` + ECMD_TIME, callee live js/cmd.js:577); 6 do_rush siblings C :1461–1514 same shape (do_rush_west ported D-3296) — port whole (brief 2026-10-02) @4265100f0
- [x] `cmd.c` do_rush_north — C `cmd.c:1475–1479` absent from js/ (no symbol; `set_move_cmd(DIR_N,3)` + ECMD_TIME, callee live js/cmd.js:577) — port whole (brief 2026-10-02) @4265100f0
- [x] `cmd.c` do_rush_northeast — C `cmd.c:1482–1486` absent from js/ (no symbol; `set_move_cmd(DIR_NE,3)` + ECMD_TIME, callee live js/cmd.js:577) — port whole (brief 2026-10-02) @4265100f0
- [x] `cmd.c` do_rush_east — C `cmd.c:1489–1493` absent from js/ (no symbol; `set_move_cmd(DIR_E,3)` + ECMD_TIME, callee live js/cmd.js:577) — port whole (brief 2026-10-02) @4265100f0
- [x] `cmd.c` do_rush_southeast — C `cmd.c:1496–1500` absent from js/ (no symbol; `set_move_cmd(DIR_SE,3)` + ECMD_TIME, callee live js/cmd.js:577) — port whole (brief 2026-10-02) @4265100f0
- [x] `cmd.c` do_rush_south — C `cmd.c:1503–1507` absent from js/ (no symbol; `set_move_cmd(DIR_S,3)` + ECMD_TIME, callee live js/cmd.js:577) — port whole (brief 2026-10-02) @4265100f0
- [x] `cmd.c` do_rush_southwest — C `cmd.c:1510–1514` absent from js/ (no symbol; `set_move_cmd(DIR_SW,3)` + ECMD_TIME, callee live js/cmd.js:577) — port whole (brief 2026-10-02) @4265100f0
- [x] `cmd.c` rnd_extcmd_idx — C `cmd.c:3601–3604` absent from js/ (no symbol; `rn2(extcmdlist_length+1)-1`, 0 refs in C — dead in C; callee live js/rng.js:111) — resolve by-design or port (same C file as do_rush head; brief 2026-10-02) @bdd35be25


- [x] `sfbase.c` sf_init — C `sfbase.c:647–655` absent from js/ (no symbol; procs-table init: sfoprocs/sfiprocs invalid+historical, sfofl/sfifl exportascii); sole C caller options.c:7129 — resolve by-design (no sf procs layer in JS) or port (brief 2026-10-02) @b2e34fd56
- [x] `sfbase.c` sfvalue_any — C `sfbase.c:449–457` absent from js/ (no symbol; static-buf PRId64 of a_int64); C refs fwd decl :23 + `Sfvalue_any` macro :53 only — resolve by-design or port (brief 2026-10-02) @b2e34fd56


- [x] `monst.c` monst_globals_init missing erinys-reset effect — C `monst.c:74` memcpy restores ALL of mons[] incl. mons[PM_ERINYS] written by live `adj_erinys` (mon.c:5918–5966), but js/monsters.js:monst_globals_init clears only the pm_fixup overlay (erinys mutates baseline arrays via js/monsters.js:adj_erinys, reset by reset_erinys :270 which is never called here) — call same-module reset_erinys() inside + fix sole/only/immutable wording; verify full 44/44 + adj_erinys(60)→init→baseline probe. Source: reviews/loop-unattended/2266-2bcda1027-monst-globals-init.md @2bcda1027 **Addressed:** D-3311 `bdd35be25`


- [x] `options.c` handler_symset — C `options.c:6321–6328` absent from js/ (no symbol; `staticfn` do_symset wrapper + opt_need_redraw, callee symbols.c:do_symset by-design); 2 C callers options.c:3583,:4228 — port whole, callee named (brief 2026-10-02) @c50c91230


- [x] `zap.c` wish_history_flush — C `zap.c:6259–6270` absent from js/ (no symbol; body entirely `#ifdef DEBUG`, free wish_history[] + reset idx); sole C caller save.c:1136 — resolve by-design (ifdef-off) or port (brief 2026-10-02) @c50c91230 **Addressed:** D-3309 `886cc35b5`


- [x] `monst.c` monst_globals_init — C `monst.c:72–76` absent from js/ (no symbol; memcpy mons_init→mons); C callers allmain.c:42, makemon.c:1841 — port whole (brief 2026-10-02) @f5743f596 **Addressed:** D-3308 `2bcda1027`


- [x] `cmd.c` extcmd_initiator — C `cmd.c:457–460` absent from js/ (no symbol; `return gc.Cmd.extcmd_char`); 1 C caller win/tty/getline.c:310 — port whole (brief 2026-10-02) @56ef5b381 **Addressed:** D-3307 `9e5e83838`
- [x] `cmd.c` do_run_north — C `cmd.c:1532–1536` absent from js/ (no symbol; `set_move_cmd(DIR_N,1)` + ECMD_TIME, callee live js/cmd.js:577); 15 do_run/do_rush siblings C :1468–1571 same shape — port whole (brief 2026-10-02) @56ef5b381 **Addressed:** D-3307 `9e5e83838`
- [x] `cmd.c` cmdbind_freeall — C `cmd.c:2180–2191` absent from js/ (no symbol; free cmdbinds list incl. params); sole C caller save.c:1134 — resolve by-design (GC) or port (brief 2026-10-02) @f5743f596 **Addressed:** D-3307 `9e5e83838`


- [x] `role.c` genl_player_selection — C `role.c:2177–2185` absent from js/ (no symbol; setup-or-terminate; callees live js/player_selection.js:1323 async + js/end.js:1039) — port whole (brief 2026-10-02) @56ef5b381 **Addressed:** D-3306 `4265100f0`


- [x] `iactions.c` ia_addmenu — C `iactions.c:127–136` absent from js/ (no symbol; `staticfn` add_menu wrapper, zeroany+act); 69 C refs — port whole (brief 2026-10-02) @42c45189d **Addressed:** D-3305 `7dfa2aad1`
- [x] `decl.c` sa_victual — C `decl.c:1199–1203` absent from js/ (no symbol; static-analyzer no-op, `return;` UNUSED param); sole C caller eat.c:3136 — resolve by-design or port (brief 2026-10-02) @42c45189d **Addressed:** D-3305 `7dfa2aad1`


- [x] `sp_lev.c` l_register_des — C `sp_lev.c:6435–6441` absent from js/ (no symbol; Lua `des` table registration); sole C caller nhlua.c:2347 — resolve by-design (no Lua runtime in JS) or port (brief 2026-10-02) @42c45189d **Addressed:** D-3304 `b2e34fd56`


- [x] `vision.c` get_viz_clear — C `vision.c:105–110` absent from js/vision.js (no symbol; `isok && !viz_clear` boolean); sole C caller wizcmds.c:1453 — port whole (brief 2026-10-02) @42c45189d **Addressed:** D-3303 `c50c91230`


- [x] `topten.c` discardexcess — C `topten.c:208–215` absent from js/topten.js (no symbol; `staticfn` FILE* drain-to-newline); sole C caller topten.c:246 — resolve by-design (no FILE* score stream) or port (brief 2026-10-02) @42c45189d
- [x] `topten.c` nsb_mung_line — C `topten.c:1471–1476` absent from js/topten.js (no symbol; space→`|` in score name/death); 2 C call sites :312–313 — port whole (brief 2026-10-02) @42c45189d
- [x] `topten.c` nsb_unmung_line — C `topten.c:1479–1484` absent from js/topten.js (no symbol; `|`→space); 3 C call sites :285–286,:329 — port whole (brief 2026-10-02) @42c45189d


- [x] `mklev.c` pos_to_room — C `mklev.c:1677–1687` absent from js/mklev.js (no symbol; `staticfn` rooms scan via live `inside_room` js/mklev.js:32964, NULL fallthrough); 1 C caller — port whole (brief 2026-10-02) @42c45189d **Addressed:** D-3301 `3442eb4d9`
- [x] `mklev.c` makevtele — C `mklev.c:821–824` absent from js/mklev.js (no symbol; `staticfn` `makeniche(TELEP_TRAP)`, callee local js/mklev.js:33193); sole C caller mklev.c:1333 — port whole (brief 2026-10-02) @42c45189d **Addressed:** D-3301 `3442eb4d9`


- [x] `objnam.c` nextobuf — C `objnam.c:142–146` absent from js/objnam.js (no symbol; `staticfn` rotates static `obufs[obufidx]`); 17 same-file C callers — resolve by-design (JS returns fresh strings) or port (brief 2026-10-02) @42c45189d


- [x] `pline.c` There — C `pline.c:425–433` `vpline(YouMessage(tmp, "There ", line), args)`; canonical `js/display.js:7915` complete but `js/do.js:505` carries a single-arg local clone via `pline` (drops format args; sole caller `do.js:752` passes one preformatted string; `pline≡vpline` display.js:8274) — remove clone, import export (brief 2026-10-02) @42c45189d **Addressed:** D-3299 `8859c7e6d`


- [x] `topten.c` topten_print — C topten.c:165–171 absent from js/ (no same-named symbol; 12 call sites topten.c:730–1106; WIN_ERR→raw_print else putstr ATR_NONE). **Stale:** ledger ported — raw-panel arm inlined as emit(x,false) at all 12 C sites (js/topten.js outheader:662, outentry:788/805, topten:897/947/948/972/975/980/1007, wizard arm:853-857) → render_topten_lines:626; toptenwin/putstr branch is the topten doc-block named omit.
- [x] `topten.c` topten_print_bold — C topten.c:174–180 absent from js/ (no same-named symbol; callers topten.c:1079,1104; WIN_ERR→raw_print_bold else putstr ATR_BOLD). **Stale:** ledger ported — raw-panel arm inlined as emit(x,true) at both C sites (js/topten.js outentry:787/804) → render_topten_lines:626; toptenwin branch named omit.
- [x] `display.c` type_to_name — C display.c:3108–3111 absent from js/ (no same-named symbol; caller display.c:3117; `type<0||>=MAX_TYPE ? "unknown" : type_names[type]`). **By-design:** ledger by-design — WA_VERBOSE compiled out (display.c:138 commented); body + sole caller inside the :3091–3121 ifdef.
- [x] `display.c` glyphinfo_at — C display.c:2487–2491 absent from js/ (no same-named symbol; via Glyphinfo_at macro display.c:1647; callee map_glyphinfo live js/display.js:4032). **By-design:** ledger by-design — UNBUFFERED_GLYPHINFO never defined; default !UNBUFFERED gbuf macro live (display.c:1637–1643, JS display.js:7007).
- [x] `dogmove.c` wantdoor — C dogmove.c:1418–1427 absent from js/ (no same-named symbol; do_clear_area callback dogmove.c:630; nearest-door distu/gx/gy update). **Stale:** ledger ported — C body complete as the do_clear_area arrow in dog_goal (js/dogmove.js:795–802; dist2 ≡ distu macro hack.h:1531); sole site dogmove.c:630; arrow shape review-blessed (review 754).
- [x] `decl.c` program_state_init — C decl.c:1074–1077 absent from js/ (no same-named symbol; caller allmain.c:35; `program_state = init_program_state`). **Addressed:** D-3298 `42c45189d`
- [x] `display.c` error4 — C display.c:3114–3120 absent from js/ (no same-named symbol; callers display.c:3150,3257; pline async + type_to_name row above; set_wall_state bad_count report). **By-design:** ledger by-design — WA_VERBOSE compiled out (display.c:138 commented); body + both call sites ifdef-gated (:3145/:3256).


- [x] `hacklib.c` digit — C hacklib.c:62–65 absent from js/ (no same-named symbol; 25 call sites botl.c/cmd.c/coloratt.c/invent.c/objnam.c/options.c/pager.c/read.c/teleport.c/topten.c; `boolean ('0'<=c && c<='9')`). **Addressed:** D-3297 `1896adcef`
- [x] `hacklib.c` letter — C hacklib.c:69–72 absent from js/ (no same-named symbol; 11 call sites cmd.c/hacklib.c/invent.c/objnam.c/options.c/shknam.c/sounds.c; `@A-Z`+`a-z` incl `@`, excl `[`). **Addressed:** D-3297 `1896adcef`


- [x] `cmd.c` levltyp_to_name — C cmd.c:1089–1094 absent from js/ (no same-named symbol; callers mon.c:226, nhlua.c:551). **Addressed:** D-3296 `b23f261b5`
- [x] `cmd.c` do_rush_west — C cmd.c:1461–1465 absent from js/ (no same-named symbol; dispatch-table refs cmd.c:2026,2071; callee set_move_cmd live js/cmd.js:558; `set_move_cmd(DIR_W, 3)` + ECMD_TIME). **Addressed:** D-3296 `b23f261b5`
- [x] `cmd.c` cmdq_reverse — C cmd.c:373–384 absent from js/ (no same-named symbol; caller cmd.c:401; iterative _cmd_queue reversal). **Addressed:** D-3296 `b23f261b5`


- [x] `getpos.c` getpos_getvalids_selection — C getpos.c:102–115 absent from js/ (no same-named symbol; callers getpos.c:53,56).
- [x] `selvar.c` selection_force_newsyms — C selvar.c:802–810 absent from js/ (no same-named symbol; caller getpos.c:62; callees selection_getpoint + newsym_force live).


- [x] `rnd.c` whichrng — C rnd.c:32–40 absent from js/ (no same-named symbol; caller rnd.c:47 rng-provenance index).


- [x] `stairs.c` stairway_find — C stairs.c:50–61 absent from js/ (no same-named symbol; caller dog.c:536). **Addressed:** D-3293 `3df1abeb4`
- [x] `mkobj.c` nomerge_exception — C mkobj.c:3278–3286 absent from js/ (no same-named symbol; caller mkobj.c:3259 nomerge gate). **Addressed:** D-3293 `3df1abeb4`


- [x] `monmove.c` vamp_shift — C monmove.c:2377–2394 absent from js/ (no same-named symbol; caller monmove.c:1496; callee newcham live js/makemon.js:2066). **Addressed:** D-3292 `cb217f88d`


- [x] `polyself.c` dropp — C polyself.c:1123–1154 absent from js/ (no same-named symbol; 11 call sites polyself.c:1187–1299 in break_armor(); js/polyself.js break_armor calls dropx directly, invent-scan guard absent).


- [x] `display.c` swallow_to_glyph — C display.c:2437–2446 absent from js/ (no same-named symbol; 8 call sites display.c:1360–1380 in swallowed(); js/display.js:5480 swallow_cell inlines the hallu draw with raw u.Hallucination instead of what_mon/Hallucination()). **Addressed:** D-3290 `5de0db04b`
- [x] `display.c` see_objects — C display.c:1558–1571 update_inventory() arm absent from js/display.js:5595 see_objects (deferred as "no glyph invent UI"; live export js/invent.js:4802). **Addressed:** D-3290 `5de0db04b`


- [x] `dungeon.c` u_on_rndspot — C dungeon.c:1614 `On_W_tower_level(&u.uz)` gate absent from js/mklev.js:u_on_rndspot (:738 `was_in_W_tower && dndest.nlx` takes the tower branch off-tower and misses nlx==0 on-tower; doc :739 names it; brief-verified @7bdcd631d; canonical On_W_tower_level live js/dungeon.js:1291) **Addressed:** D-3289 `be60a5eca`


- [x] `mkobj.c` discard_minvent — C mkobj.c:2532–2535 artifact arm (`if (uncreate_artifacts && otmp->oartifact) artifact_exists(...)` + obfree) absent from js/mon.js:discard_minvent (:3630–3640 loop extracts+unlinks only, flag param ignored; doc :3628 names it; brief-verified @7bdcd631d; artifact_exists/safe_oname/obfree all live sync) **Addressed:** D-3288 `e7c3c5cda`


- [x] `do.c` goto_level — C do.c:1695–1697 discarded-level arm (VISITED check + `impossible("returning to discarded level?")` + clear) absent from js/do.js:goto_level (`if (!exists)` :1982 goes straight to mklev; C+JS-read) @1b0ae0968 **Addressed:** D-3287 `f49c6cdfa`
- [x] `do.c` goto_level — C do.c:1731–1740 portal-missing distinction (qexpelled quest return vs fuzzer-gated `impossible("no corresponding portal")`) absent from js/do.js:goto_level (:2075 one rndspot for both sub-arms; C+JS-read) @1b0ae0968 **Addressed:** D-3287 `f49c6cdfa`


- [x] `mthrowu.c` m_carrying youmonst→invent branch — C mthrowu.c:1409 (`(mtmp==&gy.youmonst) ? gi.invent : minvent`) absent from js/mon.js:m_carrying (:419–424 minvent-only loop; full body read in brief @e3c036ca2; no youmonst.minvent↔invent alias in js/; porter's first check: live hero caller vs latent) **Addressed:** D-3286 `d8fa56ce0`


- [x] `makemon.c` makemon ptr-arm G_GENOD veto — C makemon.c:1204–1212 (`if (ptr)` monsndx + `mvflags & G_GENOD → return 0` + wizard G_EXTINCT debugpline) absent from js/makemon.js:makemon (no GENOD/G_EXTINCT in brief body; ledger omit D-3278; brief-verified @e3c036ca2) **Addressed:** D-3285 `7bdcd631d`


- [x] `steal.c` relobj — C steal.c:883–890 vault-guard gold arm (findgold + vanish pline + obj_extract_self/obfree) absent from js/dogmove.js:relobj (:937 doc "vault-guard gold omitted"; brief-verified; D-2407 measured relobj as obj_resists writer — sibling flooreffects gap is the parked mdrop_obj row, not this one) @9cdc961f3 **Addressed:** D-3284 `f52a2d2fb`.
- [x] `do.c` goto_level — C do.c:1501–1502 newlevel dlevel clamp (`dunlev(newlevel) > dunlevs_in_dungeon(newlevel)` → clamp) absent from js/do.js:goto_level (entry :1642 goes straight to tutorial/newdungeon; C+JS-read) @a6213509c **Addressed:** D-3284 `f52a2d2fb`.
- [x] `do.c` goto_level — C do.c:1504–1509 endgame-entry arm (!amulet return, wizard bypass, assign earth_level) absent from js/do.js:goto_level (`if (newdungeon)` :1659 handles tutorial only; C+JS-read) @a6213509c **Addressed:** D-3284 `f52a2d2fb`.
- [x] `do.c` goto_level — C do.c:1803 plain `else` arm (trap door/level_tele/In_endgame rndspot for at_stairs arrivals) absent from js/do.js:goto_level (`else if (!at_stairs)` :2154 skips u_on_rndspot when at_stairs && In_endgame; C+JS-read; left untouched as out of scope) @a6213509c **Addressed:** D-3284 `f52a2d2fb`.


- [x] `pickup.c` encumber_msg — blocks 1/953 (scen-trap-Valkyrie-94041 step 80 kind=screen: C «You falter under your heavy load. Movement is very hard.» vs JS «You stagger under your heavy load. Movement is very hard.») @9cdc961f3 **Addressed:** D-3283 `1b0ae0968`


- [x] `priest.c` p_coaligned — C priest.c:372 `mon_aligntyp(priest)` call absent from js/priest.js:p_coaligned (:273 raw-shralign compare, no sign normalization) + same-logic duplicate js/mklev.js:28518; canonical mon_aligntyp live js/priest.js:155; brief-verified @faf4b9296 **Addressed:** D-3282 `7589db4a3`


- [x] `dog.c` migrate_to_level — C dog.c:906 `relmon(mtmp, &gm.migrating_mons)` call absent from js/teleport.js:migrate_to_level (:2887–2894 inline fmon splice + unshift; doc :2871–2876 names take-off-map, sync caller; C+JS-read) @b7d842138 **Addressed:** D-3281 `e3c036ca2`
- [x] `dog.c` migrate_to_level — C dog.c:898–901 leash arm (`mtmp->mtame--; m_unleash(mtmp, TRUE)`) absent from js/teleport.js:migrate_to_level (no mleashed/m_unleash in body; live m_unleash async — D-1648 mixed shape, 16 async sites await, sync migrate_orc path never mleashed; C+JS-read) @b15c3087f **Addressed:** D-3281 `e3c036ca2`


- [x] `dog.c` migrate_to_level — C dog.c:928–931 emits_light→vision_recalc(0) tail absent from js/teleport.js:migrate_to_level (:2925–2926 ends at mx=my=0; doc :2871 names vision_recalc; callees live: emits_light + js/vision.js:vision_recalc — sync shippable, brief-verified) @3d8fe9bf9 **Addressed:** D-3280 `1d636ae22`


- [x] `dog.c` keepdogs — C dog.c:862–863 `relmon(mtmp, &gm.mydogs)` call absent from js/dog.js:keepdogs follower arm (:522–537 inline fmon splice + unshift; doc :525–529 names take-off-map; naive await regressed 6 REACH + public RNG — needs measured delta, C+JS-read) @b7d842138 **Addressed:** D-3279 `b15c3087f`


- [x] `makemon.c` makemon — C makemon.c:1295 `place_monster(mtmp, x, y)` grid-place call absent from js/makemon.js:makemon (:3475–3482 deferred comment only; callee live js/steed.js; C+JS-read; warn: naive grid write regresses per comment — movement parity first) @675a0c998 **Addressed:** D-3278 `3d8fe9bf9`


- [x] `do.c` goto_level — C do.c:1541–1570 Gehennom amulet mysteryforce arm (rn2 gate, assign_rnd_level, W-tower diff=0, pline, mysteryforce increment, same-level safe_teleds/next_to_u return) absent from js/do.js:goto_level (:1675 named; blocks same-level safe_teleds per D-2815 omit) @4f422de21 **Addressed:** D-3277 `e14cd5d30`
- [x] `do.c` goto_level — C do.c:1804 `u_on_rndspot((up?1:0)|(was_in_W_tower?2:0))` W-tower bit 2 absent from js/do.js:goto_level (:2112 passes `up?1:0` only; named D-1179; callee js/mklev.js:u_on_rndspot already decodes bit 2; adjacent ballfall/selftouch live — D-3261 omit text stale on ballfall) @4f422de21 **Addressed:** D-3277 `e14cd5d30`


- [x] `end.c` container_contents — C end.c:1609 update_inventory() after cknown absent from js/pickup.js:container_contents single-box clone (:2532 sets cknown :2534 with no call; doc :2528 stale "deferred like js/end.js" — end.js has it since D-3260; D-3260 named the drift) @4f422de21 **Addressed:** D-3276 `715abdc4c`


- [x] `uhitm.c` hmon_hitmon — C uhitm.c:1876–1877 `if (hmd.silvermsg) hmon_hitmon_msg_silver(&hmd,mon,obj)` weapon path absent from js/uhitm.js:hmon_hitmon (:2176 gates on barehand_silver_rings>0 only, so melee/ranged silvermsg never prints; callee live; D-3262 follow-up) @4f422de21 **Addressed:** D-3275 `9cdc961f3`


- [x] `priest.c` priestname — C priest.c:301–367 `priestname()` 67-line body canonical export absent from js/priest.js (C home; only clone js/do_name.js:929; caller do_name.c:898; brief-verified) @a2542cfc9 **Addressed:** D-3274 `51548d8db`


- [x] `mon.c` relmon — C mon.c:2559–2594 `relmon()` fmon-list surgery canonical export absent from js/mon.js (C home; only clone js/dog.js:751; callers dog.c:618/863/906; brief-verified) @a2542cfc9 **Addressed:** D-3273 `faf4b9296`
- [x] `mon.c` replmon — C mon.c:2538–2543 emits_light new_light_source/del_light_source swap absent from js/mon.js:replmon (:3672–3716 jumps place_wsegs→fmon prepend; doc-named; D-3246 ruled out as trap-Wizard cause — port, not diagnosis) @4f422de21 **Addressed:** D-3273 `faf4b9296`


- [x] `makemon.c` mbirth_limit — C makemon.c:1541–1551 `mbirth_limit(int mndx)` canonical export absent from js/makemon.js (2 local clones js/dog.js:165 + js/makemon.js:1568; C callers dog.c:117/makemon.c:961/mon.c:5298; brief-verified) @a2542cfc9 **Addressed:** D-3272 `b7d842138`


- [x] `zap.c` exclam — C zap.c:3546–3553 `exclam(int force)` canonical export absent from js/zap.js (C home; 3 local clones js/mthrowu.js:286, js/uhitm.js:441, js/zap.js:1541; C callers in 5 files incl muse.c/spell.c with no JS clone; brief-verified) @a2542cfc9 **Addressed:** D-3271 `675a0c998`


- [x] `attrib.c` exercise — blocks 1/953 (scen-death-Tourist-92095 step 66/111 kind=rng: C rn2(19)=15@exercise(attrib.c:509) vs JS rn2(5)=4@distfleeck(monmove.js:1140) after rn2(82)=74@moveloop_core; steps 0–66 screens all match; rescore + rng-diff + show this commit — visible in `hidden-proxy queue` once this commits; owner-tagged RNG divergence, not the parked presence-only/encumbrance claim) @d947745c9 **Addressed:** D-3270 `2798e7602`


- [x] `vault.c` invault — C vault.c:495–498 guard-arrival `if (gm.multi>0){nomul(0);unmul((char*)0)}` — unmul(0) absent from js/vault.js:invault (:763–765 nomul-only; unmul live async js/hack.js:1766; brief-verified) @d947745c9 **Addressed:** D-3269 `0dd9bcfeb`


- [x] `apply.c` use_stethoscope — C apply.c:430–431 M_AP_FURNITURE defsyms[mappearance].explanation absent from js/apply.js:use_stethoscope (:598–600 keeps C default 'thing'; no JS defsyms table; named omit D-2594/ledger partial; prior whole-body row DONE:1437 left this arm) @6ea16ae6e **Addressed:** D-3268 `6796c72b6`


- [x] `trap.c` trapeffect_fire_trap — C trap.c:1746–1753 surface(mx,my) in both erupt plines + :1736 seetrap(trap) hero branch absent from js/trap.js:trapeffect_fire_trap (:4840 const surf = 'floor' // surface() deferred; hero :4829–4832 dofiretrap-only; surface live js/sit.js, seetrap live js/trap.js) @6ea16ae6e **Addressed:** D-3267 `4f422de21`


- [x] `hack.c` check_capacity — C hack.c:4402–4406 pline1(str)/You_cant immediate-message arms absent from js/pickup.js:check_capacity (:4716 local-only clone; :4719 fire-and-forget game._check_capacity_msg; C has 13 call sites incl apply/dothrow/eat/engrave/pickup/read/spell/teleport/trap/uhitm/zap) @6ea16ae6e


- [x] `zap.c` boomhit — C zap.c:4148 boomhit :4202–4210 boomerang self-hit arm (thitu "boomerang" + endmultishot(TRUE)) absent from js/zap.js (no boomhit/boomerang in file; queued as bhit 4fbb3512e, pinned-C bhit zap.c:3827–4139 holds no such arm; endmultishot live js/dothrow.js:862) @4fbb3512e **Addressed:** D-3265 `a2542cfc9` (stale: whole body live js/dothrow.js:2116, D-1301)
- [x] `do.c` boulder_hits_pool — C do.c:148–151 pushing useupf(otmp, quan) absent from js/do.js:boulder_hits_pool (:1057 inlines the obfree path for both arms; useupf live js/invent.js:4851) @5a869cf51 **Addressed:** D-3265 `a2542cfc9`
- [x] `do.c` boulder_hits_pool — C do.c:137 burn_away_slime() in the lava arm absent from js/do.js:boulder_hits_pool (:1046 molten-lava arm without it; burn_away_slime live js/timeout.js:1709) @5a869cf51 **Addressed:** D-3265 `a2542cfc9`


- [x] `allmain.c` moveloop_core — blocks 1/953 (scen-death-Tourist-92095 step 49/111 kind=screen+rng: post-lifesave turn re-loops in JS — extra movemon + 2nd once-per-turn block incl. mcalcmove/maybe_generate_rnd_mon/2nd dosounds trio, +95 draws — while C exits after u_wipe_engr rn2(82); pet (48,15)→(48,14) paints I vs C floor; savelife/done set no loop state, u_calc_moveamt clone verbatim — gap in do-while `umovement < NORMAL_SPEED` turn accounting, allmain.c:196–380) @4fbb3512e **Addressed:** D-3264 `c94c66b65`
- [x] `end.c` done — C end.c:1098–1100 amulet-arm formatkiller + livelog_printf(LL_LIFESAVE) "averted death" absent from js/end.js:done (:2174 "livelog_printf deferred"; formatkiller live :518, livelog_printf live js/pline.js:44) @5a869cf51 **Addressed:** D-3264 `c94c66b65`


- [x] `apply.c` use_mirror — C apply.c:1132–1138 Medusa mon_reflects gate + stoned/killed + :1155–1166 nymph takes-it/setnotworn/freeinv/mpickobj/tele_restrict rloc absent from js/apply.js:use_mirror (:872/:888 pline-only) @571bbecf7 **Addressed:** D-3263 `d947745c9`


- [x] `uhitm.c` hmon_hitmon_stagger — C uhitm.c:1580–1585 canspotmon stagger pline + mhurtle_to_doom absent from js/uhitm.js:hmon_hitmon_stagger (:1020 "canspotmon stagger pline + mhurtle_to_doom deferred"; rnd(100) gate live) @571bbecf7 **Addressed:** D-3262 `6ea16ae6e`
- [x] `uhitm.c` hmon_hitmon_weapon_melee — C uhitm.c:1035–1036 silver-weapon silvermsg/silverobj flags absent from js/uhitm.js:hmon_hitmon_weapon_melee (:1216 "stays named"; ranged/misc paths set them, melee doesn't) @571bbecf7 **Addressed:** D-3262 `6ea16ae6e`


- [x] `do.c` goto_level — C do.c:1619–1620,1622 fill_pit / set_ustuck / u.uundetected absent from js/do.js:goto_level (:1699 "still named"; set_uinwater live) @35e5e8f94 **Addressed:** D-3261 `a7d88d8ff`
- [x] `do.c` boulder_hits_pool — C do.c:74–77 DRAWBRIDGE_UP drawbridgemask floor morph + :89–91 mondied(mtmp) absent from js/do.js:boulder_hits_pool (:993 "treat as ROOM"; :1003 "clear trapped only") @571bbecf7 **Addressed:** D-3261 `a7d88d8ff`
- [x] `end.c` done — C end.c:1113 `iflags.last_msg = PLNMSG_OK_DONT_DIE` in the Die? arm + :1050–1051 done_seq/hero_seq absent from js/end.js:done (brief: :2174–2183 Die? arm sets no last_msg; no done_seq write in :2104–2195 body) @4fbb3512e **Addressed:** D-3261 `a7d88d8ff`


- [x] `end.c` savelife — C end.c:744–745 `if (!mon_moving) endmultishot(FALSE)` absent from js/end.js:savelife (:2069 "stays named (not live)"; no endmultishot call in file) @35e5e8f94 **Addressed:** D-3260 `5a869cf51`
- [x] `end.c` container_contents — C end.c:1609 update_inventory() after cknown/lknown absent from js/end.js:container_contents (:768 "update_inventory deferred") @571bbecf7 **Addressed:** D-3260 `5a869cf51`


- [x] `zap.c` zap_over_floor — C zap.c:5300–5306 TT_LAVA Passes_walls arm (`reset_utrap(TRUE)` / `set_utrap(INFLOOR)` + "now-solid"/"cooling rock" msgs) absent from js/zap.js:zap_over_floor (:1060; no 'cooling rock'/'now-solid'/'firmly stuck' in js/zap.js) @35e5e8f94 **Addressed:** D-3259 `571bbecf7`
- [x] `zap.c` zap_map — C zap.c:3730,3732 int `oldglyph = glyph_at(x, y)` compare around show_map_spot absent from js/zap.js:zap_map (:6529–6537 disp `${ch}|${kind}|${color}` string compare; misses id-only glyph swaps when flipping learn_it) @1fe3dcc2a **Addressed:** D-3259 `571bbecf7`
- [x] `zap.c` zap_map — C zap.c:3752–3754 SCORR `unblock_point(x, y)` (unconditional) absent from js/zap.js:zap_map (:6553 calls `recalc_block_point`; SDOOR arm :6543 correctly uses recalc per C :3740) @1fe3dcc2a **Addressed:** D-3259 `571bbecf7`


- [x] `read.c` seffect_magic_mapping — C read.c:2128–2129 Rogue blessed-scroll `unblock_point(x, y)` absent from js/read.js:seffect_magic_mapping (:320; :344 calls vision_recalc(1) instead + per-sdoor newsym :345 with no C counterpart) @e4afe5879 **Addressed:** D-3258 `1b5b36bb7`


- [x] `detect.c` show_map_spot — C detect.c:1410–1413 oldglyph trap/object restore (glyph_at read + show_glyph + hero_memory lev->glyph) absent from js/detect.js:show_map_spot (:938; :970 "restore deferred", no oldglyph read) @e4afe5879 **Addressed:** D-3257 `e42cd0047`
- [x] `detect.c` do_mapping — C detect.c:1432–1442 !hero_memory||unconstrained arm (flush_screen/browse_map/map_redisplay, else reconstrain_map) absent from js/detect.js:do_mapping (:985; :1000–1003 "deferred", no reconstrain; :988 inline unconstrain skips save/clear vs live :1043) @e4afe5879 **Addressed:** D-3257 `e42cd0047`


- [x] `uhitm.c` passive_obj — C uhitm.c:6170–6173 AD_RUST erode_obj + :6180–6186 AD_ENCH drain_item + :6193–6195 update_inventory tail absent from js/uhitm.js:passive_obj (:3142; :3180 "ERODE_RUST deferred", :3194 "drain_item deferred", no tail call) @b3c50cbeb **Addressed:** D-3256 `1fe3dcc2a`
- [x] `uhitm.c` passive — C uhitm.c:5916–5921 M_SEEN markers (:5916/:5918) + erode_armor (:5921) + :5925–5927 AT_KICK uarmf corrode absent from js/uhitm.js:passive (:3272 case AD_ACID; :3284/:3290 "deferred") @35e5e8f94 **Addressed:** D-3256 `1fe3dcc2a`


- [x] `trap.c` reset_utrap — msg/Levitation/Flying restore ported + 19 TRUE awaits + delfloortrap/buried async + 4 wirings (domove_core, teleds, savelife, goto_level); zap.c:5303 queued as its own row **Addressed:** D-3255 `2716a3ced`


- [x] `weapon.c` enhance_weapon_skill — STALE: C body whole at js/weapon.js:1148 (ledger ported); s225 residual is row-0 menu-prompt centering (painter, out of scope) **Addressed:** D-3255 `2716a3ced`
- [x] `trap.c` trapeffect_landmine — STALE: C body whole at js/trap.js:5851 (ledger ported); s132 toplines unrelated to landmines, C never called at step (region-heuristic misattribution) **Addressed:** D-3255 `2716a3ced`


- [x] `read.c` seffect_magic_mapping — blocks 1/953 (scen-normal-Tourist-92061, step 18, kind=screen) @2ad1aa828 **Addressed:** D-3254 `35e5e8f94`


- [x] `dog.c` abuse_dog — blocks 1/953 (scen-ranged-Ranger-94128, step 62, kind=rng) @1634fa4fa **Addressed:** D-3253 `e4afe5879`


- [x] `do.c` doup — C do.c:1301 set_move_cmd + :1303–1304 u_rooted + :1318–1320 stucksteed + :1326–1331 near_capacity load gate absent from js/do.js:doup (:3437; doc "Omits: rooted, stucksteed, encumbrance load gate") @b3c50cbeb **Addressed:** D-3252 `495619f68`
- [x] `do.c` dowipe — C do.c:2394 + :2401 body_part(FACE) absent from js/do.js:dowipe (:3653/:3656 hardcoded 'face'; doc "Named omissions: body_part poly face noun") @b3c50cbeb **Addressed:** D-3252 `495619f68`


- [x] `potion.c` make_stunned — blocks 1/953 (scen-ride-Samurai-94407, step 159, kind=screen; C "You miss it. You wobble in the saddle." vs JS "You miss it.") @012413194 **Addressed:** D-3251 `b3c50cbeb`
- [x] `uhitm.c` passive AD_STUN — missing arm: C :6085–6088 make_stunned deferred js/uhitm.js:3418; moved scen-ride-Samurai-94407 s159→s171 @135e9a8dd **Addressed:** D-3251 `b3c50cbeb`
- [x] `uhitm.c` passive_obj AD_ACID — missing arm: C :6164–6168 erode_obj deferred js/uhitm.js:3172; scen-engulf-Samurai-94392 s46→PASS @135e9a8dd **Addressed:** D-3251 `b3c50cbeb`


- [x] `do.c` dowipe — blocks 1/953 (scen-terrain-Valkyrie-94240, step 117, kind=screen) @2ad1aa828 (audit 2203–2211: session PASS on full rescore, healed in D-3245–D-3250 window; no writer needed) **Addressed:** audit-2203–2211


- [x] `minion.c` msummon — blocks 1/953 (scen-engulf-Monk-94052, step 90, kind=screen) @2ad1aa828 **Addressed:** D-3250 `8dee36c`

## 2026-10-01

- [x] `steal.c` stealgold — blocks 1/953 (scen-special-Priest-94137, step 69, kind=screen) @2b9efeed4 (D-3249: session moved to do_statusline2 s69 via known_hitum; body complete js/steal.js:125, ledger stale-ported — 1-call skip, kept Open for the 8-band per D-3248 precedent) **Addressed:** D-3249 `0843952`
- [x] `uhitm.c` check_caitiff — blocks 1/953 (scen-ride-Samurai-94407, step 125, kind=screen) @2ad1aa828 (D-3249: session moved to make_stunned s159 via known_hitum; body exact js/uhitm.js:536, ledger stale-ported — 1-call skip, kept Open for the 8-band per D-3248 precedent) **Addressed:** D-3249 `0843952`


- [x] `steal.c` stealgold — blocks 1/953 (scen-special-Priest-94137, step 69, kind=screen) @2b9efeed4 **Addressed:** D-3249 `0843952`
- [x] `uhitm.c` check_caitiff — blocks 1/953 (scen-ride-Samurai-94407, step 125, kind=screen) @2ad1aa828 **Addressed:** D-3249 `0843952`
- [x] `uhitm.c` known_hitum — blocks 1/953 (scen-special-Priest-94137, step 69, kind=screen; scoreboard owner stealgold is misattributed: C "You miss it" vs JS "You miss the kitten" under OPTIONS=!verbose) @37d6d3fe7; C uhitm.c:604–610 (override_confirmation verbose arm + missum call) absent from js/uhitm.js:known_hitum (:3077; inline pline :3089 drops the canspotmon/verbose gate) **Addressed:** D-3249 `0843952`


- [x] `mhitm.c` mdisplacem — blocks 1/953 (scen-special-Ranger-94277, step 157, kind=rng) @f572fe77c **Addressed:** D-3248 `0124131`


- [x] `cmd.c` set_move_cmd — blocks 1/953 (scen-dig-Archeologist-94035, step 44, kind=screen) @caf1b5991 **Addressed:** D-3247 `37d6d3fe7`
- [x] `dig.c` dig — blocks 1/953 (scen-terrain-Rogue-94040, step 70, kind=screen) @caf1b5991 **Addressed:** D-3247 `37d6d3fe7`
- [x] `dig.c` use_pick_axe2 — blocks 2/953 (scen-dig-Archeologist-94215, step 32, kind=screen) @2b9efeed4 **Addressed:** D-3247 `37d6d3fe7`


- [x] `js` js-throw lev_json.js:452 relink_light_sources "no monster 0" — blocks 1/953 (scen-special-Samurai-94217, step 6, kind=screen, error in restoreOtherLedgers/deserLevel; cf D-3244 GIGO note — confirm throw precedes the step-6 diff) @2ad1aa828 **Addressed:** D-3246 `f0a64859`


- [x] `muse.c` use_defensive — blocks 1/953 (scen-hazard-Monk-94153, step 57, kind=screen) @caf1b5991 **Addressed:** D-3245 `14db57058`


- [x] `makemon.c` m_initinv — blocks 1/953 (scen-special-Samurai-94217, step 5, kind=rng) @a308a919b **Addressed:** D-3244 `2ad1aa828`


- [x] `lock.c` doforce — blocks 1/953 (scen-container-Barbarian-94366, step 200, kind=screen) @a308a919b **Addressed:** D-3243 `f247f6b3c`


- [x] `mhitu.c` mswings_verb — blocks 1/953 (scen-caster-Wizard-94389, step 252, kind=screen) @a308a919b **Addressed:** D-3242 `1634fa4fa`.


- [x] `fountain.c` dowaterdemon — `ReferenceError: mhis is not defined` at js/fountain.js:595 (wish message; `mhis`/`mhe` never imported) voids scen-terrain-Monk-94060 (rngM 0/scrM 0, misattributed owner randomize_gem_colors step 0) @2b9efeed4 **Addressed:** D-3241 `ea58ae969`.
- [x] `o_init.c` randomize_gem_colors — blocks 1/953 (scen-terrain-Monk-94060, step 0, kind=rng) @a308a919b **Addressed:** D-3241 `ea58ae969`.


- [x] `do.c` flooreffects — blocks 2/953 (scen-dig-Archeologist-94275, step 30, kind=screen) @07cfb4831 **Addressed:** D-3240 `2b9efeed4`


- [x] `pager.c` self_lookat — blocks 2/953 (scen-ride-Knight-94415, step 109, kind=screen) @07cfb4831 **Addressed:** D-3239 `9e990eefc`


- [x] `trap.c` water_damage — blocks 3/953 (scen-terrain-Caveman-94220, step 121, kind=rng) @07cfb4831 **Addressed:** D-3238 `25100632c`
- [x] `engrave.c` wipeout_text — blocks 2/953 (scen-caster-Priest-94149, step 70, kind=rng) @07cfb4831 **Addressed:** D-3238 `25100632c`


- [x] `dig.c` digactualhole — blocks 6/953 (scen-dig-Archeologist-94215, step 28, kind=screen) @07cfb4831 **Addressed:** D-3237 `0148914f2`
- [x] `dig.c` dig_up_grave — blocks 3/953 (scen-dig-Archeologist-94035, step 39, kind=screen) @07cfb4831 **Addressed:** D-3237 `0148914f2`


- [x] `engrave.c` read_engr_at — blocks 11/953 (scen-engrave-Ranger-94398, step 95, kind=screen) @07cfb4831 **Addressed:** D-3236 `caf1b599`


- [x] `do.c` better_not_try_to_drop_that — coverage PARTIAL (C 8 code L `do.c:947–962` / JS 5 code L in js/do.js; hops —, callers 1, RNG 0, msg 0) @b4ca336ef
- [x] `sp_lev.c` lspo_exclusion — coverage PARTIAL (C 25 code L `sp_lev.c:5498–5532` / JS 16 code L in js/mklev.js; hops —, callers 0, RNG 0, msg 0) @b4ca336ef


- [x] `region.c` create_gas_cloud_selection — coverage PARTIAL (C 15 code L `region.c:1313–1336` / JS 10 code L in js/region.js; hops —, callers 1, RNG 0, msg 0) @b4ca336ef


- [x] save_light_sources peel bad-type classification — C `light.c:454–459` forces bad-type → local; JS `js/mkobj.js` peel falls through `light_is_local`'s `return false` (global), inverted for both ranges; the "already maps bad-type → local" comment is false. Force local for bad-type-with-id + correct the comment. Falsifier: `{ type: 99, id: {} }` must be peeled at RANGE_LEVEL, kept at RANGE_GLOBAL. Source: reviews/loop-unattended/2184-f41c159c9-save-light-sources.md.


- [x] s_suffix 8-home second wave — `C hacklib.c:344–359` lowercase-'s'-only + case-insensitive it/you absent from js/objnam.js:2802 s_suffix_objnam, js/apply.js:3223 s_suffix_apply, js/apply.js:4347 s_suffix_fig, js/timeout.js:2271 s_suffix_hatch (`|| endsWith('S')`), js/weapon.js:1823 s_suffix_towel, js/apply.js:1445 s_suffix_leash, js/mhitu.js:1086 s_suffix_poison, js/invent.js:4355 s_suffix_inv (pre-fix shapes); falsifier `grep -rn "function s_suffix" js/` = 20 defs all C-equal to the export. Source: reviews/loop-unattended/2170-b9de54524-s-suffix-second-wave.md **Addressed:** D-3217 `cdbc41097`


- [x] vision_clears "quickly" text — C `Your1(vision_clears)` = "Your vision quickly clears." (decl.c 10th positional "vision quickly clears.", struct hack.h:267–272) but 12× `pline('Your vision clears.')` in js/dothrow.js:1672, js/eat.js:2487, js/potion.js:2950, js/mthrowu.js:1445, js/zap.js:4475, js/detect.js:2570, js/engrave.js:1688, js/mcastu.js:359, js/mhitu.js:771/2002/3711/3822 + `VISION_CLEARS` const js/trap.js:537; falsifier `grep -rn "Your vision clears" js/` empty. Source: reviews/loop-unattended/2174-f9a10fead-uhitm-x5-vision-text.md **Addressed:** D-3216 `002545e23`


- [x] `s_suffix` suffixed clones keep pre-D-3200 C-wrongs — C `hacklib.c:344–359` `*(eos(buf)-1)=='s'` is lowercase-only but `|| endsWith('S')` survives in `js/eat.js:3392` s_suffix_eat, `js/mhitm.js:5814` s_suffix_mm, `js/dothrow.js:872` s_suffix_throw_gold, `js/potion.js:3010` s_suffix_pot; `js/zap.js:2688` s_suffix_zap additionally lacks the you arm and keeps z/x/ch/sh + falsy passthrough (all 5 doc'd "C ref: hacklib.c s_suffix"; eat sites are eat.c:622/625/630 brain plines; D-3200 closed the ledger split on the 6 plain homes). Fix in place or import canonical `js/do_name.js:411`. Source: reviews/loop-unattended/2160-6e06fa8e7-s-suffix.md


- [x] `savebones` removal-skip via `iter_mons` — C `mon.c:4527–4540` caches `mtmp2` before each callback (splice-safe) but `js/mon.js:2973` iterates live `game.fmon`; D-3202 replaced savebones' snapshotted loop with `iter_mons(remove_mon_from_bones)` whose `mongone` splices (`js/mon.js:3650`) — a qualifying mon (wiz/Medusa/nemesis-voice/leader-voice/Vlad/displaced-Oracle, `js/end.js:1624`) immediately following a removed one is skipped and wrongly kept on the bones level. Fix `iter_mons` (cache-next/snapshot + correct the "no nmon unlink hazard" JSDoc) or re-snapshot in savebones. Falsifier: bones save with two adjacent qualifying mons, both must leave. Source: reviews/loop-unattended/2162-a5f89dd93-savebones.md **Addressed:** D-3209 `6b304d1a2`


- [x] `from_what` negative INVIS + CLAIRVOYANT cases stubbed — C `attrib.c:977–997` returns " because of X" for three negative props but `js/attrib.js:1224–1231` handles only BLINDED (row says ported-stale 2026-09-09): wizard cornuthaum-blocked clairvoyance drops D-3205's "if not for X" suffix, and W_ARMC-blocked invisibility drops its wrapping suffix. Port the two missing cases. Source: reviews/loop-unattended/2165-9cc52a0d2-enlightenment.md **Addressed:** D-3208 `c70774a6c`


- [x] `attributes_enlightenment` pray else-arm absent from `enlightenment()` — C `insight.c:1937–1955` emits "can [not] safely pray" (+ wizard ublesscnt) when !ugangr && !final; `js/invent.js:7208–7218` has the ugangr `if` with no `else` (overlay-only arm at :8313; D-3205 claims "whole/none"). Reachable via `enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS)` (`js/potion.js:1998`, `js/zap.js:2787` ← C potion.c:710/zap.c:2529). Mirror the overlay else-arm with the !final gate. Falsifier: enlightenment potion with !ugangr shows the line. Source: reviews/loop-unattended/2165-9cc52a0d2-enlightenment.md **Addressed:** D-3207 `8a149124b`


- [x] `sp_lev.c` lspo_room → get_table_roomtype_opt validation/message closure — C :4003–4020 calls get_table_str_opt (nhlua.c:1053–1076) then synchronous impossible; JS coerces raw type and discards impossible promise before build_room RNG. Extracted C `type=true` errors before rn2(100), function returning ordinary resolves; JS builds after impossible in both. Import canonical string reader and propagate diagnostic completion through callers. Source: reviews/loop-unattended/2145-c88e33eda-special-level-closure.md.


- [x] `mon.c` mpickstuff verbose gate flipped to truthy — C tests decl-TRUE `flags.verbose` before the "%s picks up %s." message; js/monmove.js:535 (D-3176) uses truthy `game.flags.verbose` (also dropped `?.`), suppressing the message when flags are uninitialized. Prior code was `game.flags?.verbose !== false`. Restore `!== false` with `?.`. Source: reviews/loop-unattended/2150-949324ac1-post-d3190-review-followup.md. **Addressed:** D-3192 `24e6bea47`


- [x] `invent.c` prinv verbose gate flipped to truthy — C gates the "(N in total)" suffix on decl-TRUE `flags.verbose`; js/invent.js:7692 (D-3186) uses `game.flags?.verbose ?`, suppressing the suffix when the flags bag is still undefined ("JS never ran allopt_array_init", js/options.js:10137). Prior code and every sibling site (js/invent.js:7641,9188,9205; js/options.js:2331,2797,3021) use `!== false`. Restore `!== false`. Same-iteration hardening, same file: js/iactions.js:958 post-menu scan dropped its `o &&` guard (null hole now throws); js/invent.js:7861 `indexOf(otmp)+1` restarts at head on removal — guard the -1 case. Source: reviews/loop-unattended/2150-949324ac1-post-d3190-review-followup.md. **Addressed:** D-3191 `4a2447e2`


- [x] `sp_lev.c` get_table_xy_or_coord → get_coord integer transport and gas narrowing — C :3187–3204/:5318–5366 retains lua_Integer until destination cast; JS object fields round `"9223372036854775807"`, so lspo_room :4027–4116 builds/draws rn2(100) instead of rejecting mixed −1/0; lspo_gas_cloud :4928–4965 turns BigInt array x=−1 into 0 via Number(tx). Preserve exact object/array integers and cast at the C destinations; compare extracted C. Source: reviews/loop-unattended/2145-c88e33eda-special-level-closure.md. **Addressed:** D-3190 `c64bdefb7`


- [x] `mon_break_armor` continuation order: missing waits at C worn.c:1196–1201 and the subsequent armor/drop/riding arms; JS worn.js:546–549 consumes armor before its queued message starts at :674 (actual suspension probe: armor consumed → message waiting). Restart the whole body in C order, verify m_lose_armor closure and callers; ship alone. Source: reviews/loop-unattended/2149-c47034f0d-ledger-sample.md. **Addressed:** D-3189 `447ada6e3`

## 2026-09-30

- [x] `options.c` initoptions noreturn closure — C options.c:7078–7115, :7100/:7112 terminate; changed JS wrapper continues into config_error_done/initoptions_finish. Builtin-phase invalid-sysconf probe exits=1 but initializes fruit/clears opt_initial. Stop after fatal second read/assure/deferred-showpaths, verify finish unreachable. Source: reviews/loop-unattended/2132-d10e96661-startup-exit.md. **Addressed:** D-3182 `5e7475cd1`


- [x] `mon.c` normal_shape → new_were message continuation — C mon.c:4430–4462/were.c:95–138 emits visible transformation pline before set_mon_data/heal/armor; js/were.js:164 starts void pline then mutates immediately. Await in normal_shape only observes armor chain. Complete/propagate message boundary before mutation and mimic processing; verify input suspension. Source: reviews/loop-unattended/2136-ae5beffe4-monster-closure.md. **Addressed:** D-3181 `b230d7c85`


- [x] `sp_lev.c` lspo_teleport_region/lspo_levregion validation — C sp_lev.c:5442–5460/:5471–5494 and nhlua.c:1078–1104/:1121–1133 reject invalid dir/type and numeric boolean 2; JS l_teleport_region/l_levregion silently default/coerce. Re-port shared adapters in C order including padding/name. Source: reviews/loop-unattended/2126-2b25db15c-special-level-bindings.md. **Addressed:** D-3175 `3f8f47e04`


- [x] `sp_lev.c` nhl_abs_coord/cvt_to_abscoord signed-16 semantics — C sp_lev.c:4810–4836/:4771–4788 and global.h:71 narrow coordxy; JS retains int32 (65536→65536, 32767+1→32768 instead of 0/-32768). Fix input and room/map offset narrowing, establish Lua integer conversion behavior. Source: reviews/loop-unattended/2128-e79d836f7-absolute-coordinate-width.md. **Addressed:** D-3174 `adc5a35c2`


- [x] `options.c` option-error callee closure — bad_negation/optfn_menuinvertmode/msghistory/name and D-3167/3169 error arms reach no-op botl.config_error_add. C options.c:6692–6697 → cfgfiles.c:1864–1890 must format/enqueue. Export/wire the real sink, verify every affected error arm, correct false live-sink claims. Source: reviews/loop-unattended/2131-f02c9df5f-playmode-config-closure.md; reviews/loop-unattended/2129-0f8744c49-option-error-stubs.md; reviews/loop-unattended/2127-c8af100c3-option-nine.md. **Addressed:** D-3173 `b5e29a0ee`


- [x] `options.c` initoptions_init startup sysconf ordering — C options.c:7118–7305 initializes defaults before read_config_file and checks failure (:7293–7296). JS NethackGame.start reads system OPTIONS then overwrites flags/name: VFS OPTIONS=!autopickup,name:SysName loses pickup=false/SysName. Preserve system settings through rc initialization and handle failed system config in C order. Source: reviews/loop-unattended/2131-f02c9df5f-playmode-config-closure.md. **Addressed:** D-3172 `1b3985d44`


- [x] `worn.c` wornmask_to_armcat — coverage MISSING (C 24 code L `worn.c:218–246` / JS no symbol; hops —, callers 0, RNG 0, msg 0) @deff666da


- [x] `options.c` parsebindings extcmd-miss must return FALSE — JS `js/options.js` miss arm returns `ret` (TRUE on clean tail), C `options.c:7670–7671` returns FALSE after the error; committed test pins the wrong value twice (`parsebindings.test.mjs` `"a:boguscmd"`, `"mouse1:boguscmd"` → `true`). Fix arm + both pins, re-run 22/22 + neighbors. Source: reviews/loop-unattended/2111-836f908c6-parsebindings.md. **Addressed:** D-3154 `779a41942`


- [x] `worn.c` nxt_unbypassed_loot — coverage PARTIAL (C 10 code L `worn.c:1159–1174` / JS 7 code L in js/pickup.js; hops 6, callers 1, RNG 0, msg 0) @8e8a996ab


- [x] `questpgr.c` find_quest_artifact — coverage PARTIAL (C 23 code L `questpgr.c:89–120` / JS 11 code L in js/quest.js; hops 5, callers 1, RNG 0, msg 0) @e5816afe0

## 2026-09-29

- [x] `max_passive_dmg` elemental arm uses bits-only resists_* locals — C `resists_*` ≡ `Resists_Elem` (mondata.c:129–197) artifact `:173–176` + worn/carried `:178–196` arms absent from js/mhitm.js:2318–2322 (locals :407–431 test bits only); full `Resists_Elem` live at js/mondata.js:240, already imported by mhitm.js:15. Call `Resists_Elem(magr, *_RES)` or name the omit. Source: reviews/loop-unattended/2070-d27c7b945-max-passive-dmg-cluster.md. **Addressed:** D-3118 `c1be7a049`


- [x] `mondata.c` max_passive_dmg — coverage PARTIAL (C 39 code L `mondata.c:720–767` / JS 28 code L in js/mhitm.js; hops 3, callers 1, RNG 0, msg 0) @cb3b01855


- [x] `selvar.c` selection_getbounds — coverage PARTIAL (C 13 code L `selvar.c:77–95` / JS 9 code L in js/region.js; hops 6, callers 16, RNG 0, msg 0) @ffb380a5c


- [x] `wizcmds.c` wiz_show_vision + wiz_mon_diff extcmd runners — C cmd.c:1928–1929 "vision" (unconditional) and C cmd.c:1985–1987 "wizmondiff" (live: pinned patchlevel.h:35–37 defines DEBUG) dispatch to the D-3085 exports, but js/getline.js EXT_CMDS has no runnable rows, so typed #vision/#wizmondiff are wizard-mode dead ends (extcmd_run_by_txt → null); D-2779 wired wizseenv/migratemons/stats runners in-commit and named the "0 references" trap this repeats. Fix: add both EXT_CMDS rows (wiz:true, autocomplete:true, lazy import). Source: reviews/loop-unattended/2045-590ebd616-wiz-mon-diff-pair.md. **Addressed:** D-3092 `5428c6c98`


- [x] `wizcmds.c` wiz_custom + wiz_kill extcmd runners — C cmd.c:1951–1952 "wizcustom" (IFBURIED|WIZMODECMD|NOFUZZERCMD) and C cmd.c:1967–1969 "wizkill" (+AUTOCOMPLETE|CMD_M_PREFIX), both unconditional, dispatch to the D-3089 exports, but js/getline.js EXT_CMDS has no runnable rows, so typed #wizcustom/#wizkill are wizard-mode dead ends (same family as the vision/wizmondiff line below; D-2779 wired siblings in-commit). Fix: add both EXT_CMDS rows (wiz:true; autocomplete false for wizcustom, true for wizkill; lazy import). Source: reviews/loop-unattended/2049-d1541778d-wiz-custom-cluster.md. **Addressed:** D-3091 `da4f12710`


- [x] `insight.c` doborn — coverage MISSING (C 24 code L `insight.c:3145–3176` / JS no symbol; hops —, callers 0, RNG 0, msg 3) @643ef6af3 **Addressed:** D-3087 `ffb380a5c`


- [x] `read.c` create_particular_creation class-`d` — C read.c:3279–3282 `whichpm = mkclass(d->monclass, 0)` absent from js/read.js:create_particular_creation (never reads d.monclass; creates urole.mnum placeholder instead of a random class member for ^G class letters). Source: reviews/loop-unattended/2035-3a3d73a50-create-particular-parse.md. **Addressed:** D-3083 `a2037c0d5`


- [x] `cfgfiles.c` get_uchars wait_synch — C cfgfiles.c:433 `wait_synch()` dropped from the error arm behind a false empty-macro claim (the `#define` is `#ifdef SFCTOOL`-only, :116–120; game build calls the real window sync, winprocs.h:140, which blocks — wintty.c:3624–3631); name the omit + ledger partial (D-3079 precedent) or wire live tty_wait_synch. Source: reviews/loop-unattended/2041-7ec9a24df-cfgfiles-family.md. **Addressed:** D-3082 `e09865e97`


- [x] `query_color` PICK_ONE menu-earlier — C coloratt.c:505–508 returns menu-earlier(preselected, explicit) (tty toggle-and-finish + menu-order picks, wintty.c:1755–1759/:2808–2817) but js/options.js `query_color` returns the explicit pick: dflt X≠NO_COLOR + letter-Y-after-X yields X in C, Y in JS (D-3071 "provably dead" proof insufficient — gate-dead ⟹ menu-earlier, not explicit). Fix: index-compare, return X when Y sorts strictly after X; headless test both orders. Source: reviews/loop-unattended/2031-7e25e3c42-coloratt-cluster.md **Addressed:** D-3073 `107847759`

## 2026-09-28

- [x] `wizcmds.c` wizcustom_callback — coverage MISSING (C 29 code L `wizcmds.c:1987–2027` / JS no symbol; hops —, callers 1, RNG 0, msg 1) @73b53df4b **Addressed:** D-3029 `da6d0e8ae`


- [x] `cmd.c` dokeylist — coverage MISSING (C 100 code L `cmd.c:2867–3013` / JS no symbol; hops —, callers 0, RNG 0, msg 25; dead callees: spkey_name; split? cited 30× in js/ — brief first) @5affd05cd


- [x] `options.c` freeroleoptvals — coverage MISSING (C 4 code L `options.c:787–794` / JS no symbol; hops 4, callers 2, RNG 0, msg 0; dead callees: unsaveoptstr) @8b6526ecd
- [x] `options.c` saveoptvals — coverage MISSING (C 13 code L `options.c:801–819` / JS no symbol; hops 4, callers 1, RNG 0, msg 0; dead callees: freeroleoptvals) @0bb1eb02e
- [x] `options.c` initoptions — coverage MISSING (C 12 code L `options.c:7079–7115` / JS no symbol; hops —, callers 3, RNG 0, msg 0; dead callees: assure_syscf_file, do_deferred_showpaths) @73b53df4b


- [x] `teleport.c` mtele_trap screen flip — audit rescore 2026-09-28T09:17Z: scen-tour-Samurai-91113 PASS→FAIL (step 54, kind=screen, owner mtele_trap); port SHAs since last full board (fda3d415d): 2af820a38, 8b6526ecd, 32055fa52, 9f89fd978, 5c0b84ad9, 0cb4128d8, 20875982e, 5a77080f1, 1cc7d605d. Diagnose which SHA's arm moved the paint (suspects: pet-AI pathing 32055fa52, singlemon clears 2af820a38, show_glyph guards 8b6526ecd), port the writer. Source: reviews/loop-unattended/1972-1980 audit (rescore flip). **Addressed:** D-3021 `5affd05cd`


- [x] `mkroom.c` rest_rooms — coverage MISSING (C 8 code L `mkroom.c:893–906` / JS no symbol; hops 3, callers 1, RNG 0, msg 0; dead callees: rest_room) @7cd5d050b


- [x] `options.c` doset_simple_menu — coverage THIN (C 121 code L `options.c:8536–8702` / JS 43 code L in js/options.js; hops —, callers 1, RNG 0, msg 1; dead callees: is_wc2_option) @2bf11e0a4 **Addressed:** D-3009 `70c901367`


- [x] `mon.c` `mcalcmove` — blocks 1/953 corpus sessions, PASS→FAIL since `309d58ccc`: `tour-Ranger-70021-d5-8-15-17-22` @44, both sides «The shocking sphere explodes at a spot in thin air! Boom!» but JS adds `--More--` (owner locus `mon.c:1164`, last matched draw in `mon_explodes`). Probe: `node scripts/hidden-proxy.mjs verify mcalcmove`. Source: 2026-09-28 full corpus rescore. **Addressed:** D-3000 `63aec4509`

## 2026-09-27

- [x] `steed.c` `use_saddle` — blocks 2/953 corpus sessions, PASS→FAIL since the 2026-09-25 full board (`309d58ccc`): `scen-intrinsic-Ranger-92193` @61 and `scen-normal-Rogue-92209` @33, C «I see nobody there.» vs JS «Your leg is in no shape for riding.» (owner locus `steed.c:56`; JS checks wounded legs before C's target check). Suspect ports since then: `686ccd9e7` (D-2813 `mount_steed`), `b05a6b770` (D-2817). Probe: `node scripts/hidden-proxy.mjs verify use_saddle`. Source: 2026-09-28 full corpus rescore (recorder rebuilt; 43/44 public sessions re-record byte-identical). **Addressed:** D-2999 `9600a44`.


- [x] `alloc.c` nhalloc — coverage MISSING (C 9 code L `alloc.c:152–166` / JS no symbol; hops 3, callers 2, RNG 0, msg 0; dead callees: heapmon_init) @9b244f090


- [x] `iactions.c` `itemactions_pushkeys` — missing arm: C `iactions.c:207–212` `IA_QUAFF_OBJ` queues `cmdq_add_ec(CQ_CANNED, do_reqmenu)` then `dodrink` then the invlet. `js/iactions.js:123–127` queues only `dodrink` and the invlet, so `#quaff` does not ignore a fountain or sink. Source: reviews/loop-unattended/1935-25beec7af-cmdq-add-key.md **Addressed:** D-2979 `68cdee2bb`


- [x] `cmd.c` `ext_func_tab_from_func` — missing arm: `FUNCT_TXT` (`js/cmd.js:1669`) has no `doloot` or `dotip`. C `cmd.c:1762` `"loot"` and `cmd.c:1905` `"tip"` are `AUTOCOMPLETE|CMD_M_PREFIX` (flags 130). `js/cmd.js:2415–2416` (`act_on_act_here`) and `js/iactions.js:204` (`IA_TIP_CONTAINER`) therefore store empty `txt` and flags 0. Source: reviews/loop-unattended/1936-8d2439c0f-cmdq-add-ec.md **Addressed:** D-2978 `4ce18a4e0`


- [x] `timeout.c` remove_timer — coverage MISSING (C 16 L `timeout.c:2483–2502` / JS no symbol; hops 3, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn remove_timer` (reach regression must be 0). Measured `port-coverage.mjs --name remove_timer` 2026-09-27 @ 8d00a95a8. **Addressed:** D-2961 `a30a7de84`


- [x] `do_wear.c` Shirt_off — coverage THIN (C 16 L `do_wear.c:778–794` / JS 4 L in js/do_wear.js; hops 3, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Shirt_off` (reach regression must be 0). Measured `port-coverage.mjs --name Shirt_off` 2026-09-27 @ 8d00a95a8.


- [x] `dungeon.c` In_W_tower — coverage PARTIAL (C 15 L `dungeon.c:1923–1938` / JS 7 L in js/dungeon.js; hops 2, callers 19, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn In_W_tower` (reach regression must be 0). Measured `port-coverage.mjs --name In_W_tower` 2026-09-27 @ 3f2358d79. **Addressed:** D-2959 `1021345f2`


- [x] `objnam.c` yname — coverage PARTIAL (C 15 L `objnam.c:2359–2374` / JS 8 L in js/music.js; hops 3, callers 65, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn yname` (reach regression must be 0). Measured `port-coverage.mjs --name yname` 2026-09-27 @ 3f2358d79. **Addressed:** D-2958 `d8cf4ec1c`


- [x] `dothrow.c` tmiss — coverage PARTIAL (C 16 L `dothrow.c:1951–1967` / JS 10 L in js/dothrow.js; hops 5, callers 6, RNG 1, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn tmiss` (reach regression must be 0). Measured `port-coverage.mjs --name tmiss` 2026-09-27 @ 3f2358d79. **Addressed:** D-2957 `936dc8938`


- [x] `mon.c` mon_animal_list — coverage MISSING (C 23 L `mon.c:4829–4852` / JS no symbol; hops 5, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mon_animal_list` (reach regression must be 0). Measured `port-coverage.mjs --name mon_animal_list` 2026-09-27 @ 96146725a. **Addressed:** D-2956 `fb0bc9e00`


- [x] `mkobj.c` is_flammable — coverage PARTIAL (C 16 L `mkobj.c:2270–2286` / JS 8 L in js/mkobj.js; hops 3, callers 11, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn is_flammable` (reach regression must be 0). Measured `port-coverage.mjs --name is_flammable` 2026-09-27 @ 96146725a. **Addressed:** D-2955 `a193f8063`


- [x] `attrib.c` redist_attr — coverage PARTIAL (C 20 L `attrib.c:740–760` / JS 14 L in js/attrib.js; hops 4, callers 2, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn redist_attr` (reach regression must be 0). Measured `port-coverage.mjs --name redist_attr` 2026-09-27 @ 96146725a. **Addressed:** D-2954 `98553289c`


- [x] `region.c` add_mon_to_reg — coverage THIN (C 25 L `region.c:161–186` / JS 6 L in js/region.js; hops 3, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn add_mon_to_reg` (reach regression must be 0). Measured `port-coverage.mjs --name add_mon_to_reg` 2026-09-27 @ 96146725a. **Addressed:** D-2953 `8d00a95a8`


- [x] `wintty.c` `tty_putstr` — the message arm clears `WIN_NOSTOP` on every call (`:2300`). `js/display.js` `putstr` clears it only when this call set `ATR_URGENT`. `wintty.c:119` sets `WC2_URGENT_MESG | WC2_SUPPRESS_HIST` on tty `wincap2`; the scored port leaves `windowprocs.wincap2` unset, so `putmesg` never sets that attribute and `urgent_pline` keeps `WIN_NOSTOP` through the vpline trailer. Set those two bits and clear `_win_nostop` at the end of every message `putstr`. Source: reviews/loop-unattended/1903-836e0baaf-putmesg.md **Addressed:** D-2952 `7661793ac`


- [x] `do_name.c` `hliquid` — the gate calls `do_name.js:260` `Hallucination`, which returns true on sticky `u.Hallucination` before resistance and never reads `uprops[HALLUC]`. C `youprop.h:116–120` is `u.uprops[HALLUC].intrinsic && !Halluc_resistance` (timeout only). `display.js:1095` is that reader, and `do_name.js` already imports `display.js` (`imports.mjs --can` → ALREADY). Use it from `hliquid` (`do_name.c:1496`). Source: reviews/loop-unattended/1902-9ce3f2138-hliquid.md **Addressed:** D-2951 `49ff0d6f5`


- [x] `mklev.c` mkfount — coverage PARTIAL (C 15 L `mklev.c:2285–2300` / JS 10 L in js/mklev.js; hops 2, callers 1, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mkfount` (reach regression must be 0). Measured `port-coverage.mjs --name mkfount` 2026-09-27 @ 96146725a. **Addressed:** D-2950 `1a25073d1`


- [x] `lock.c` maybe_reset_pick — coverage THIN (C 16 L `lock.c:269–285` / JS 7 L in js/shk.js; hops 3, callers 5, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn maybe_reset_pick` (reach regression must be 0). Measured `port-coverage.mjs --name maybe_reset_pick` 2026-09-27 @ fa30d863c. **Addressed:** D-2949 `515ca9981`


- [x] `do_wear.c` Shirt_on — coverage THIN (C 16 L `do_wear.c:759–775` / JS 6 L in js/do_wear.js; hops 3, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Shirt_on` (reach regression must be 0). Measured `port-coverage.mjs --name Shirt_on` 2026-09-27 @ fa30d863c. **Addressed:** D-2948 `dc6fd838d`


- [x] `dungeon.c` dungeon_branch — coverage THIN (C 16 L `dungeon.c:1870–1886` / JS 6 L in js/dungeon.js; hops 2, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dungeon_branch` (reach regression must be 0). Measured `port-coverage.mjs --name dungeon_branch` 2026-09-27 @ fa30d863c. **Addressed:** D-2947 `e96457f1e`


- [x] `questpgr.c` deliver_by_window — coverage THIN (C 17 L `questpgr.c:439–456` / JS 6 L in js/questpgr.js; hops 4, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn deliver_by_window` (reach regression must be 0). Measured `port-coverage.mjs --name deliver_by_window` 2026-09-27 @ fa30d863c. **Addressed:** D-2946 `3f2358d79`


- [x] `pickup.c` reset_justpicked — coverage THIN (C 16 L `pickup.c:616–632` / JS 6 L in js/pickup.js; hops 2, callers 5, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn reset_justpicked` (reach regression must be 0). Measured `port-coverage.mjs --name reset_justpicked` 2026-09-27 @ fa30d863c. **Addressed:** D-2945 `84f6850bd`


- [x] `pline.c` putmesg — coverage MISSING (C 15 L `pline.c:65–80` / JS no symbol; hops 3, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn putmesg` (reach regression must be 0). Measured `port-coverage.mjs --name putmesg` 2026-09-27 @ 75f0544f8. **Addressed:** D-2944 `836e0baaf`


- [x] `do_name.c` hliquid — coverage PARTIAL (C 16 L `do_name.c:1493–1510` / JS 11 L in js/do_name.js; hops 2, callers 86, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hliquid` (reach regression must be 0). Measured `port-coverage.mjs --name hliquid` 2026-09-27 @ 75f0544f8. **Addressed:** D-2943 `9ce3f2138`
- [x] `do_name.c` rndorcname — coverage PARTIAL (C 16 L `do_name.c:1538–1554` / JS 11 L in js/do_name.js; hops 4, callers 3, RNG 3, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rndorcname` (reach regression must be 0). Measured `port-coverage.mjs --name rndorcname` 2026-09-27 @ 75f0544f8. **Addressed:** D-2943 `9ce3f2138`


- [x] `monmove.c` `can_fog` — `Protection_from_shape_changers` in `js/monmove.js` reads only the `H` / `E` flats. C `youprop.h:355–360` is `uprops[PROT_FROM_SHAPE_CHANGERS].intrinsic || .extrinsic`. `were.js:58` already ORs the flats with `uprops`, and `imports.mjs --can js/monmove.js js/were.js Protection_from_shape_changers` is SAFE (hoisted). Call that export from `can_fog` (`monmove.c:2366–2369`). Source: reviews/loop-unattended/1892-21446265f-stuff-prevents-passage.md **Addressed:** D-2942 `96146725a`


- [x] `pline.c` You_hear — coverage PARTIAL (C 16 L `pline.c:436–452` / JS 8 L in js/dbridge.js; hops 2, callers 139, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn You_hear` (reach regression must be 0). Measured `port-coverage.mjs --name You_hear` 2026-09-27 @ 75f0544f8. **Addressed:** D-2941 `e2b2ded6d`


- [x] `teleport.c` noteleport_level — coverage PARTIAL (C 17 L `teleport.c:30–47` / JS 12 L in js/teleport.js; hops 1, callers 25, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn noteleport_level` (reach regression must be 0). Measured `port-coverage.mjs --name noteleport_level` 2026-09-27 @ 75f0544f8. **Addressed:** D-2940 `8946c6456`


- [x] `objnam.c` helm_simple_name — coverage THIN (C 15 L `objnam.c:5513–5528` / JS 3 L in js/do_wear.js; hops 2, callers 25, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn helm_simple_name` (reach regression must be 0). Measured `port-coverage.mjs --name helm_simple_name` 2026-09-27 @ 75f0544f8. **Addressed:** D-2939 `e7f613e86`


- [x] `shk.c` append_honorific — coverage PARTIAL (C 18 L `shk.c:3602–3620` / JS 13 L in js/shk.js; hops 5, callers 1, RNG 1, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn append_honorific` (reach regression must be 0). Measured `port-coverage.mjs --name append_honorific` 2026-09-27 @ f36a7b952. **Addressed:** D-2938 `17ee8fa4f`


- [x] `mklev.c` mkaltar — coverage PARTIAL (C 18 L `mklev.c:2332–2350` / JS 10 L in js/mklev.js; hops 2, callers 1, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mkaltar` (reach regression must be 0). Measured `port-coverage.mjs --name mkaltar` 2026-09-27 @ f36a7b952. **Addressed:** D-2937 `fa30d863c`


- [x] `end.c` dealloc_killer — coverage PARTIAL (C 19 L `end.c:1738–1757` / JS 11 L in js/end.js; hops 1, callers 8, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dealloc_killer` (reach regression must be 0). Measured `port-coverage.mjs --name dealloc_killer` 2026-09-27 @ f36a7b952. **Addressed:** D-2936 `4dd4bd973`


- [x] `lock.c` obstructed — coverage PARTIAL (C 27 L `lock.c:926–953` / JS 16 L in js/lock.js; hops 4, callers 3, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn obstructed` (reach regression must be 0). Measured `port-coverage.mjs --name obstructed` 2026-09-27 @ 4df3fffc0. **Addressed:** D-2935 `ffc2c8e96`


- [x] `glyphs.c` shuffle_customizations — coverage MISSING (C 51 L `glyphs.c:591–642` / JS no symbol; hops 3, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn shuffle_customizations` (reach regression must be 0). Measured `port-coverage.mjs --name shuffle_customizations` 2026-09-27 @ b1c8b3093. **Addressed:** D-2934 `75f0544f8`


- [x] `monmove.c` stuff_prevents_passage — coverage MISSING (C 34 L `monmove.c:2319–2353` / JS no symbol; hops 3, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn stuff_prevents_passage` (reach regression must be 0). Measured `port-coverage.mjs --name stuff_prevents_passage` 2026-09-27 @ b1c8b3093. **Addressed:** D-2933 `21446265f`


- [x] `objnam.c` erosion_matters — coverage THIN (C 20 L `objnam.c:1195–1215` / JS 6 L in js/mkobj.js; hops 4, callers 7, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn erosion_matters` (reach regression must be 0). Measured `port-coverage.mjs --name erosion_matters` 2026-09-27 @ 2d07e01a7. **Addressed:** D-2932 `3fc42e995`
- [x] `objnam.c` ansimpleoname — coverage PARTIAL (C 24 L `objnam.c:2446–2470` / JS 11 L in js/objnam.js; hops 3, callers 17, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn ansimpleoname` (reach regression must be 0). Measured `port-coverage.mjs --name ansimpleoname` 2026-09-27 @ b1c8b3093. **Addressed:** D-2932 `3fc42e995`


- [x] `mklev.c` chk_okdoor — coverage MISSING (C 21 L `mklev.c:1198–1219` / JS no symbol; hops 2, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn chk_okdoor` (reach regression must be 0). Measured `port-coverage.mjs --name chk_okdoor` 2026-09-27 @ 2d07e01a7. **Addressed:** D-2931 `f36a7b952`
- [x] `mklev.c` mkstairs — coverage PARTIAL (C 34 L `mklev.c:2159–2197` / JS 22 L in js/mklev.js; hops 2, callers 7, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mkstairs` (reach regression must be 0). Measured `port-coverage.mjs --name mkstairs` 2026-09-27 @ 4df3fffc0. **Addressed:** D-2931 `f36a7b952`


- [x] `do_wear.c` Shield_off — coverage THIN (C 23 L `do_wear.c:733–756` / JS 4 L in js/do_wear.js; hops 3, callers 5, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Shield_off` (reach regression must be 0). Measured `port-coverage.mjs --name Shield_off` 2026-09-27 @ 2d07e01a7. **Addressed:** D-2930 `5b794196c`
- [x] `do_wear.c` learnring — coverage PARTIAL (C 27 L `do_wear.c:1193–1220` / JS 13 L in js/do_wear.js; hops 4, callers 11, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn learnring` (reach regression must be 0). Measured `port-coverage.mjs --name learnring` 2026-09-27 @ b1c8b3093. **Addressed:** D-2930 `5b794196c`


- [x] `pager.c` whatdoes_help — coverage PARTIAL (C 24 L `pager.c:2421–2445` / JS 17 L in js/pager.js; hops 4, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn whatdoes_help` (reach regression must be 0). Measured `port-coverage.mjs --name whatdoes_help` 2026-09-27 @ 2d07e01a7. **Addressed:** D-2929 `4df3fffc0`


- [x] `steal.c` worn_item_removal — coverage PARTIAL (C 38 L `steal.c:294–334` / JS 26 L in js/steal.js; hops 4, callers 10, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn worn_item_removal` (reach regression must be 0). Measured `port-coverage.mjs --name worn_item_removal` 2026-09-27 @ 54bbae9a5. **Addressed:** D-2928 `167e8ab44`


- [x] `cmd.c` end_of_input — coverage PARTIAL (C 26 L `cmd.c:5183–5209` / JS 18 L in js/cmd.js; hops 1, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn end_of_input` (reach regression must be 0). Measured `port-coverage.mjs --name end_of_input` 2026-09-27 @ 54bbae9a5. **Addressed:** D-2927 `84b9c5dc9`


- [x] `spell.c` rejectcasting — coverage THIN (C 21 L `spell.c:687–708` / JS 8 L in js/spell.js; hops 6, callers 2, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rejectcasting` (reach regression must be 0). Measured `port-coverage.mjs --name rejectcasting` 2026-09-27 @ 54bbae9a5. **Addressed:** D-2926 `5be96e3ee`.


- [x] `do_wear.c` Shield_on — coverage THIN (C 25 L `do_wear.c:705–730` / JS 6 L in js/do_wear.js; hops 3, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Shield_on` (reach regression must be 0). Measured `port-coverage.mjs --name Shield_on` 2026-09-27 @ 54bbae9a5. **Addressed:** D-2925 `b1c8b3093`


- [x] `worn.c` extract_from_minvent — coverage PARTIAL (C 35 L `worn.c:1377–1417` / JS 22 L in js/worn.js; hops 2, callers 15, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn extract_from_minvent` (reach regression must be 0). Measured `port-coverage.mjs --name extract_from_minvent` 2026-09-27 @ ce04557f4. **Addressed:** D-2924 `2d07e01a7`


- [x] `mon.c` maybe_unhide_at — coverage PARTIAL (C 22 L `mon.c:4698–4720` / JS 12 L in js/monmove.js; hops 2, callers 21, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn maybe_unhide_at` (reach regression must be 0). Measured `port-coverage.mjs --name maybe_unhide_at` 2026-09-27 @ 4c8d21966. **Addressed:** D-2923 `c558457f9`


- [x] `wield.c` cant_wield_corpse — coverage MISSING (C 15 L `wield.c:138–153` / JS no symbol; hops 4, callers 2, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn cant_wield_corpse` (reach regression must be 0). Measured `port-coverage.mjs --name cant_wield_corpse` 2026-09-27 @ 4c8d21966. **Addressed:** D-2922 `b88b8599f`


- [x] `trap.c` deltrap — coverage PARTIAL (C 18 L `trap.c:6531–6549` / JS 13 L in js/trap.js; hops 2, callers 56, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn deltrap` (reach regression must be 0). Measured `port-coverage.mjs --name deltrap` 2026-09-27 @ 4c8d21966. **Addressed:** D-2921 `54bbae9a5`


- [x] `do_wear.c` cursed — coverage MISSING (C 24 L `do_wear.c:1893–1917` / JS no symbol; hops 6, callers 16, RNG 0, msg 2; split? cited 906× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn cursed` (reach regression must be 0). Measured `port-coverage.mjs --name cursed` 2026-09-27 @ 4c8d21966. **Addressed:** D-2920 `34f7d154e`


- [x] `light.c` find_mid — coverage THIN (C 19 L `light.c:376–395` / JS 8 L in js/mon.js; hops 3, callers 9, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn find_mid` (reach regression must be 0). Measured `port-coverage.mjs --name find_mid` 2026-09-27 @ af40498ad. **Addressed:** D-2919 `0a6f86d9b`


- [x] `bones.c` fix_ghostly_obj — coverage MISSING (C 19 L `bones.c:796–815` / JS no symbol; hops 3, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn fix_ghostly_obj` (reach regression must be 0). Measured `port-coverage.mjs --name fix_ghostly_obj` 2026-09-27 @ af40498ad. **Addressed:** D-2918 `270a11ee8`
- [x] `bones.c` sanitize_name — coverage THIN (C 22 L `bones.c:198–220` / JS 9 L in js/bones.js; hops 2, callers 6, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn sanitize_name` (reach regression must be 0). Measured `port-coverage.mjs --name sanitize_name` 2026-09-27 @ af40498ad. **Addressed:** D-2918 `270a11ee8`


- [x] `mail.c` ckmailstatus — coverage MISSING (C 18 L `mail.c:461–479` / JS no symbol; hops 2, callers 1, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn ckmailstatus` (reach regression must be 0). Measured `port-coverage.mjs --name ckmailstatus` 2026-09-27 @ af40498ad. **Addressed:** D-2917 `ce04557f4`


- [x] `do_name.c` christen_monst — coverage PARTIAL (C 19 L `do_name.c:133–152` / JS 10 L in js/do_name.js; hops 2, callers 17, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn christen_monst` (reach regression must be 0). Measured `port-coverage.mjs --name christen_monst` 2026-09-27 @ 4039cf023. **Addressed:** D-2916 `d179e940b`


- [x] `mkobj.c` mk_tt_object — coverage THIN (C 19 L `mkobj.c:2227–2248` / JS 8 L in js/dig.js; hops 3, callers 5, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mk_tt_object` (reach regression must be 0). Measured `port-coverage.mjs --name mk_tt_object` 2026-09-27 @ 4039cf023. **Addressed:** D-2915 `a4cc08e9a`


- [x] `timeout.c` region_dialogue — coverage MISSING (C 15 L `timeout.c:554–569` / JS no symbol; hops 1, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn region_dialogue` (reach regression must be 0). Measured `port-coverage.mjs --name region_dialogue` 2026-09-27 @ 4039cf023. **Addressed:** D-2914 `e379902e8`
- [x] `timeout.c` end_burn — coverage PARTIAL (C 18 L `timeout.c:1804–1822` / JS 12 L in js/timeout.js; hops 3, callers 27, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn end_burn` (reach regression must be 0). Measured `port-coverage.mjs --name end_burn` 2026-09-27 @ 4039cf023. **Addressed:** D-2914 `e379902e8`


- [x] `sp_lev.c` flip_vault_guard — coverage MISSING (C 28 L `sp_lev.c:926–958` / JS no symbol; hops 5, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn flip_vault_guard` (reach regression must be 0). Measured `port-coverage.mjs --name flip_vault_guard` 2026-09-27 @ cb7ff4a26. **Addressed:** D-2913 `4c8d21966`


- [x] `objnam.c` readobjnam_init — coverage MISSING (C 28 L `objnam.c:3933–3961` / JS no symbol; hops 4, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn readobjnam_init` (reach regression must be 0). Measured `port-coverage.mjs --name readobjnam_init` 2026-09-27 @ cb7ff4a26. **Addressed:** D-2912 `a5d5677e6`

## 2026-09-26

- [x] `mhitm.c` engulf_target — coverage PARTIAL (C 38 L `mhitm.c:807–845` / JS 21 L in js/mhitm.js; hops 3, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn engulf_target` (reach regression must be 0). Measured `port-coverage.mjs --name engulf_target` 2026-09-27 @ cb7ff4a26. **Addressed:** D-2911 `af40498ad`


- [x] `pray.c` align_gname — coverage THIN (C 25 L `pray.c:2530–2555` / JS 11 L in js/roles.js; hops 4, callers 22, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn align_gname` (reach regression must be 0). Measured `port-coverage.mjs --name align_gname` 2026-09-27 @ 6aacaa7b4. **Addressed:** D-2910 `884da82f5`


- [x] `do_wear.c` some_armor — coverage PARTIAL (C 23 L `do_wear.c:2630–2653` / JS 13 L in js/do_wear.js; hops 5, callers 3, RNG 4, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn some_armor` (reach regression must be 0). Measured `port-coverage.mjs --name some_armor` 2026-09-27 @ 6aacaa7b4. **Addressed:** D-2909 `4039cf023`


- [x] `wield.c` drop_uswapwep — coverage PARTIAL (C 22 L `wield.c:809–831` / JS 15 L in js/wield.js; hops 3, callers 3, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn drop_uswapwep` (reach regression must be 0). Measured `port-coverage.mjs --name drop_uswapwep` 2026-09-27 @ ba089151c. **Addressed:** D-2908 `1490a6d6b`


- [x] `eat.c` eating_conducts — coverage THIN (C 23 L `eat.c:576–599` / JS 10 L in js/eat.js; hops 5, callers 3, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn eating_conducts` (reach regression must be 0). Measured `port-coverage.mjs --name eating_conducts` 2026-09-27 @ ba089151c. **Addressed:** D-2907 `d912391e3`


- [x] `dungeon.c` ceiling — coverage PARTIAL (C 33 L `dungeon.c:1714–1747` / JS 19 L in js/trap.js; hops 2, callers 27, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn ceiling` (reach regression must be 0). Measured `port-coverage.mjs --name ceiling` 2026-09-27 @ 795c5410f. **Addressed:** D-2906 `cb7ff4a26`


- [x] `dothrow.c` omon_adj — coverage PARTIAL (C 34 L `dothrow.c:1913–1947` / JS 21 L in js/dothrow.js; hops 3, callers 3, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn omon_adj` (reach regression must be 0). Measured `port-coverage.mjs --name omon_adj` 2026-09-27 @ 795c5410f. **Addressed:** D-2905 `d475b25e1`


- [x] `zap.c` learnwand — coverage PARTIAL (C 28 L `zap.c:123–151` / JS 13 L in js/zap.js; hops 3, callers 14, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn learnwand` (reach regression must be 0). Measured `port-coverage.mjs --name learnwand` 2026-09-27 @ 795c5410f. **Addressed:** D-2904 `6aacaa7b4`


- [x] `polyself.c` livelog_newform — coverage MISSING (C 26 L `polyself.c:307–333` / JS no symbol; hops 4, callers 2, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn livelog_newform` (reach regression must be 0). Measured `port-coverage.mjs --name livelog_newform` 2026-09-26 @ e4e898f54. **Addressed:** D-2903 `2f8cea8dd`.


- [x] `do.c` u_collide_m — coverage PARTIAL (C 33 L `do.c:1412–1445` / JS 24 L in js/do.js; hops 3, callers 2, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn u_collide_m` (reach regression must be 0). Measured `port-coverage.mjs --name u_collide_m` 2026-09-26 @ e24078a71. **Addressed:** D-2902 `ba089151c`


- [x] `shk.c` shop_keeper — coverage THIN (C 28 L `shk.c:1052–1080` / JS 9 L in js/shk.js; hops 3, callers 63, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn shop_keeper` (reach regression must be 0). Measured `port-coverage.mjs --name shop_keeper` 2026-09-26 @ e24078a71. **Addressed:** D-2901 `9a80efcd8`
- [x] `shk.c` money2u — coverage THIN (C 26 L `shk.c:186–212` / JS 10 L in js/shk.js; hops 4, callers 2, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn money2u` (reach regression must be 0). Measured `port-coverage.mjs --name money2u` 2026-09-26 @ e4e898f54. **Addressed:** D-2901 `9a80efcd8`


- [x] `monmove.c` m_move_aggress — coverage PARTIAL (C 29 L `monmove.c:2088–2117` / JS 16 L in js/monmove.js; hops 2, callers 2, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn m_move_aggress` (reach regression must be 0). Measured `port-coverage.mjs --name m_move_aggress` 2026-09-26 @ 149143cd5. **Addressed:** D-2900 `795c5410f`


- [x] `cmd.c` can_do_extcmd — coverage PARTIAL (C 26 L `cmd.c:463–489` / JS 17 L in js/cmd.js; hops 1, callers 3, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn can_do_extcmd` (reach regression must be 0). Measured `port-coverage.mjs --name can_do_extcmd` 2026-09-26 @ 149143cd5. **Addressed:** D-2899 `9cb813fe5`
- [x] `cmd.c` cmd_from_func — coverage PARTIAL (C 30 L `cmd.c:3036–3066` / JS 19 L in js/dokeylist.js; hops 1, callers 43, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn cmd_from_func` (reach regression must be 0). Measured `port-coverage.mjs --name cmd_from_func` 2026-09-26 @ e24078a71. **Addressed:** D-2899 `9cb813fe5`


- [x] `sp_lev.c` `flip_visuals` — the wall / `SDOOR` arm reads and writes `lev.glyph` (`js/mklev.js`). `makeLocation()` has no `glyph` field; `levl[x][y].glyph` is `remembered_glyph.glyph`, and `show_memory_glyph` paints `remembered_glyph.ch`. `glyph_is_cmap(undefined)` is false, so `back_to_glyph` never runs (`sp_lev.c:489–493`). Test the memory id and store the rebuilt cmap the way `map_background` does (`remember_shown_glyph`). Source: reviews/loop-unattended/1848-ef40ca579-flip-visuals.md **Addressed:** D-2898 `93cce8666`


- [x] `do_wear.c` toggle_displacement — coverage PARTIAL (C 26 L `do_wear.c:148–178` / JS 17 L in js/do_wear.js; hops 1, callers 4, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn toggle_displacement` (reach regression must be 0). Measured `port-coverage.mjs --name toggle_displacement` 2026-09-26 @ 149143cd5. **Addressed:** D-2897 `37fb9f7ea`


- [x] `eat.c` eatmupdate — coverage MISSING (C 32 L `eat.c:181–213` / JS no symbol; hops 2, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn eatmupdate` (reach regression must be 0). Measured `port-coverage.mjs --name eatmupdate` 2026-09-26 @ 3afe3adc0. **Addressed:** D-2896 `d2c713008`


- [x] `polyself.c` ugolemeffects — coverage PARTIAL (C 28 L `polyself.c:2160–2188` / JS 19 L in js/mhitu.js; hops 3, callers 15, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn ugolemeffects` (reach regression must be 0). Measured `port-coverage.mjs --name ugolemeffects` 2026-09-26 @ 3afe3adc0. **Addressed:** D-2895 `e4e898f54`


- [x] `uhitm.c` mhitm_ad_conf — coverage THIN (C 34 L `uhitm.c:3690–3726` / JS 11 L in js/mhitm.js; hops 4, callers 1, RNG 2, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_conf` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_conf` 2026-09-26 @ 3afe3adc0. **Addressed:** D-2894 `e4c6400a6`


- [x] `calendar.c` time_from_yyyymmddhhmmss — coverage THIN (C 55 L `calendar.c:120–175` / JS 6 L in js/calendar.js; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn time_from_yyyymmddhhmmss` (reach regression must be 0). Measured `port-coverage.mjs --name time_from_yyyymmddhhmmss` 2026-09-26 @ 64f8ebc04. **Addressed:** D-2893 `008e05138`


- [x] `hacklib.c` unicodeval_to_utf8str — coverage MISSING (C 37 L `hacklib.c:882–919` / JS no symbol; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn unicodeval_to_utf8str` (reach regression must be 0). Measured `port-coverage.mjs --name unicodeval_to_utf8str` 2026-09-26 @ 64f8ebc04. **Addressed:** D-2892 `e24078a71`


- [x] `cmd.c` there_cmd_menu_self — coverage MISSING (C 85 L `cmd.c:4435–4520` / JS no symbol; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn there_cmd_menu_self` (reach regression must be 0). Measured `port-coverage.mjs --name there_cmd_menu_self` 2026-09-26 @ 64f8ebc04. **Addressed:** D-2891 `a628445d8`


- [x] `role.c` plsel_startmenu — coverage MISSING (C 39 L `role.c:2806–2845` / JS no symbol; hops —, callers 6, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn plsel_startmenu` (reach regression must be 0). Measured `port-coverage.mjs --name plsel_startmenu` 2026-09-26 @ 64f8ebc04. **Addressed:** D-2890 `149143cd5`


- [x] `sp_lev.c` flip_visuals — coverage MISSING (C 37 L `sp_lev.c:458–495` / JS no symbol; hops 5, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn flip_visuals` (reach regression must be 0). Measured `port-coverage.mjs --name flip_visuals` 2026-09-26 @ 64f8ebc04. **Addressed:** D-2889 `ef40ca579`
- [x] `sp_lev.c` mapfrag_fromstr — coverage THIN (C 26 L `sp_lev.c:227–253` / JS 8 L in js/mklev.js; hops —, callers 3, RNG 0, msg 0; dead callees: stripdigits, str_lines_maxlen). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mapfrag_fromstr` (reach regression must be 0). Measured `port-coverage.mjs --name mapfrag_fromstr` 2026-09-26 @ 64f8ebc04. **Addressed:** D-2889 `ef40ca579`


- [x] `allmain.c` do_positionbar — coverage MISSING (C 39 L `allmain.c:933–972` / JS no symbol; hops 2, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn do_positionbar` (reach regression must be 0). Measured `port-coverage.mjs --name do_positionbar` 2026-09-26 @ 64f8ebc04. **Addressed:** D-2888 `941017b03`


- [x] `do_name.c` obj_pmname — coverage THIN (C 38 L `do_name.c:1321–1359` / JS 14 L in js/trap.js; hops 3, callers 8, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn obj_pmname` (reach regression must be 0). Measured `port-coverage.mjs --name obj_pmname` 2026-09-26 @ d921aef05. **Addressed:** D-2887 `3afe3adc0`


- [x] `invent.c` let_to_name — coverage PARTIAL (C 39 L `invent.c:4800–4839` / JS 21 L in js/invent.js; hops 3, callers 11, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn let_to_name` (reach regression must be 0). Measured `port-coverage.mjs --name let_to_name` 2026-09-26 @ d921aef05. **Addressed:** D-2886 `f2ba5333b`


- [x] `mkobj.c` curse — coverage PARTIAL (C 36 L `mkobj.c:1783–1819` / JS 19 L in js/mkobj.js; hops 2, callers 45, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn curse` (reach regression must be 0). Measured `port-coverage.mjs --name curse` 2026-09-26 @ d921aef05. **Addressed:** D-2885 `703e0821e`


- [x] `dungeon.c` surface — coverage PARTIAL (C 38 L `dungeon.c:1750–1788` / JS 26 L in js/dokick.js; hops 2, callers 97, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn surface` (reach regression must be 0). Measured `port-coverage.mjs --name surface` 2026-09-26 @ d921aef05. **Addressed:** D-2884 `457f75d7b`


- [x] `vision.c` does_block — coverage PARTIAL (C 49 L `vision.c:153–202` / JS 28 L in js/vision.js; hops 3, callers 16, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn does_block` (reach regression must be 0). Measured `port-coverage.mjs --name does_block` 2026-09-26 @ 59a5900cf. **Addressed:** D-2883 `64f8ebc04`
- [x] `vision.c` vision_reset — coverage PARTIAL (C 54 L `vision.c:211–265` / JS 40 L in js/vision.js; hops 3, callers 6, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn vision_reset` (reach regression must be 0). Measured `port-coverage.mjs --name vision_reset` 2026-09-26 @ 59a5900cf. **Addressed:** D-2883 `64f8ebc04`


- [x] `trap.c` trapeffect_vibrating_square — coverage MISSING (C 36 L `trap.c:2725–2764` / JS no symbol; hops 4, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn trapeffect_vibrating_square` (reach regression must be 0). Measured `port-coverage.mjs --name trapeffect_vibrating_square` 2026-09-26 @ 8ddebb670. **Addressed:** D-2882 `b41dbfcd5`


- [x] `sp_lev.c` get_table_int_or_random — coverage MISSING (C 30 L `sp_lev.c:3407–3437` / JS no symbol; hops —, callers 2, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn get_table_int_or_random` (reach regression must be 0). Measured `port-coverage.mjs --name get_table_int_or_random` 2026-09-26 @ 8ddebb670. **Addressed:** D-2881 `c9abe5dc0`


- [x] `files.c` `proc_wizkit_line` — after `readobjnam(buf)`, a real non-`hands_obj` result records that same `buf` (`files.c:2568–2573`). `readobjnam` has already run `mungspaces` (`objnam.c:4919`) and rewritten `bp`. `js/files.js` `wish_history_add(line)` records the length-clipped input, so a later wizard wish prefix-matches different text. Pass the post-parse buffer. Source: reviews/loop-unattended/1832-f7125aef2-wish-history-add.md **Addressed:** D-2880 `a0c180a68`


- [x] `zap.c` do_osshock — coverage PARTIAL (C 37 L `zap.c:1637–1674` / JS 24 L in js/zap.js; hops 6, callers 2, RNG 3, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn do_osshock` (reach regression must be 0). Measured `port-coverage.mjs --name do_osshock` 2026-09-26 @ 8ddebb670. **Addressed:** D-2879 `539f2fe06`
- [x] `zap.c` bhitpile — coverage PARTIAL (C 74 L `zap.c:2428–2506` / JS 55 L in js/zap.js; hops 4, callers 7, RNG 0, msg 0; dead callees: recreate_pile_at). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn bhitpile` (reach regression must be 0). Measured `port-coverage.mjs --name bhitpile` 2026-09-26 @ 59a5900cf. **Addressed:** D-2879 `539f2fe06`


- [x] `exper.c` more_experienced — coverage PARTIAL (C 34 L `exper.c:169–203` / JS 23 L in js/exper.js; hops 3, callers 19, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn more_experienced` (reach regression must be 0). Measured `port-coverage.mjs --name more_experienced` 2026-09-26 @ 3ff465fee. **Addressed:** D-2878 `d921aef05`


- [x] `hacklib.c` strstri — coverage THIN (C 39 L `hacklib.c:740–779` / JS 8 L in js/attrib.js; hops 2, callers 131, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn strstri` (reach regression must be 0). Measured `port-coverage.mjs --name strstri` 2026-09-26 @ 3ff465fee. **Addressed:** D-2877 `59a5900cf`


- [x] `wield.c` setuwep — coverage PARTIAL (C 35 L `wield.c:100–135` / JS 21 L in js/wield.js; hops 3, callers 22, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn setuwep` (reach regression must be 0). Measured `port-coverage.mjs --name setuwep` 2026-09-26 @ 3ff465fee. **Addressed:** D-2876 `eb441a29a`


- [x] `mon.c` monkilled — coverage PARTIAL (C 38 L `mon.c:3377–3418` / JS 20 L in js/mhitm.js; hops 2, callers 30, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn monkilled` (reach regression must be 0). Measured `port-coverage.mjs --name monkilled` 2026-09-26 @ 3ff465fee. **Addressed:** D-2875 `40e1ad634`


- [x] `dungeon.c` overview_stats — coverage MISSING (C 37 L `dungeon.c:2761–2801` / JS no symbol; hops —, callers 1, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn overview_stats` (reach regression must be 0). Measured `port-coverage.mjs --name overview_stats` 2026-09-26 @ 9d403156e. **Addressed:** D-2874 `048c1316e`


- [x] `zap.c` wish_history_add — coverage MISSING (C 28 L `zap.c:6227–6255` / JS no symbol; hops 3, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn wish_history_add` (reach regression must be 0). Measured `port-coverage.mjs --name wish_history_add` 2026-09-26 @ 9d403156e. **Addressed:** D-2873 `f7125aef2`


- [x] `uhitm.c` hmon_hitmon_msg_hit — coverage MISSING (C 20 L `uhitm.c:1637–1660` / JS no symbol; hops 5, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hmon_hitmon_msg_hit` (reach regression must be 0). Measured `port-coverage.mjs --name hmon_hitmon_msg_hit` 2026-09-26 @ 9d403156e. **Addressed:** D-2872 `8ddebb670`
- [x] `uhitm.c` mhitm_ad_pest — coverage MISSING (C 24 L `uhitm.c:3808–3834` / JS no symbol; hops 4, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_pest` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_pest` 2026-09-26 @ 9d403156e. **Addressed:** D-2872 `8ddebb670`
- [x] `uhitm.c` hmon_hitmon_splitmon — coverage MISSING (C 27 L `uhitm.c:1604–1634` / JS no symbol; hops 5, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hmon_hitmon_splitmon` (reach regression must be 0). Measured `port-coverage.mjs --name hmon_hitmon_splitmon` 2026-09-26 @ 9d403156e. **Addressed:** D-2872 `8ddebb670`


- [x] `cmd.c` `extcmd_via_menu` — after a prefix, a menu cancel (`n != 1` && `matchlevel`) sets `ret = 0` and `matchlevel = 0` and leaves `cbuf` (`cmd.c:884–887`). The next header is still `Extended Command:` plus that prefix (`:870`). JS `extcmd_via_menu` (`js/getline.js:1375–1378`) also sets `cbuf = ''`. Stop clearing `cbuf` on that arm. Source: reviews/loop-unattended/1822-4913f8580-keylist-putcmds.md **Addressed:** D-2871 `1ad43f20e`


- [x] `mkmaze.c` set_levltyp_lit — coverage MISSING (C 20 L `mkmaze.c:125–145` / JS no symbol; hops —, callers 8, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn set_levltyp_lit` (reach regression must be 0). Measured `port-coverage.mjs --name set_levltyp_lit` 2026-09-26 @ 9d403156e. **Addressed:** D-2870 `bde9dd8fa`


- [x] `steal.c` maybe_absorb_item — coverage MISSING (C 35 L `steal.c:772–810` / JS no symbol; hops 5, callers 1, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn maybe_absorb_item` (reach regression must be 0). Measured `port-coverage.mjs --name maybe_absorb_item` 2026-09-26 @ 9d403156e. **Addressed:** D-2869 `3f8d66fcb`


- [x] `do.c` engulfer_digests_food — coverage MISSING (C 39 L `do.c:849–888` / JS no symbol; hops 4, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn engulfer_digests_food` (reach regression must be 0). Measured `port-coverage.mjs --name engulfer_digests_food` 2026-09-26 @ 4b46eed9c. **Addressed:** D-2868 `3ff465fee`


- [x] `shk.c` special_stock — coverage THIN (C 38 L `shk.c:3103–3144` / JS 12 L in js/shk.js; hops 5, callers 1, RNG 0, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn special_stock` (reach regression must be 0). Measured `port-coverage.mjs --name special_stock` 2026-09-26 @ 4b46eed9c. **Addressed:** D-2867 `d039fda06`
- [x] `shk.c` shkcatch — coverage MISSING (C 32 L `shk.c:4362–4396` / JS no symbol; hops 4, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn shkcatch` (reach regression must be 0). Measured `port-coverage.mjs --name shkcatch` 2026-09-26 @ 9d403156e. **Addressed:** D-2867 `d039fda06`


- [x] `mklev.c` themerooms_post_level_generate — coverage MISSING (C 20 L `mklev.c:1174–1194` / JS no symbol; hops 1, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn themerooms_post_level_generate` (reach regression must be 0). Measured `port-coverage.mjs --name themerooms_post_level_generate` 2026-09-26 @ 4b46eed9c. **Addressed:** D-2866 `8fbf942b1`


- [x] `uhitm.c` mhitm_ad_deth — coverage THIN (C 54 L `uhitm.c:3837–3894` / JS 7 L in js/mhitm.js; hops 4, callers 1, RNG 2, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_deth` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_deth` 2026-09-26 @ 8800eafbb. **Addressed:** D-2865 `9d403156e`
- [x] `uhitm.c` first_weapon_hit — coverage THIN (C 26 L `uhitm.c:1963–1989` / JS 10 L in js/uhitm.js; hops 5, callers 2, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn first_weapon_hit` (reach regression must be 0). Measured `port-coverage.mjs --name first_weapon_hit` 2026-09-26 @ 4b46eed9c. **Addressed:** D-2865 `9d403156e`
- [x] `uhitm.c` hmon_hitmon_msg_lightobj — coverage MISSING (C 25 L `uhitm.c:1702–1730` / JS no symbol; hops 5, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hmon_hitmon_msg_lightobj` (reach regression must be 0). Measured `port-coverage.mjs --name hmon_hitmon_msg_lightobj` 2026-09-26 @ 4b46eed9c. **Addressed:** D-2865 `9d403156e`


- [x] `dungeon.c` init_dungeon_levels — coverage PARTIAL (C 64 L `dungeon.c:797–864` / JS 31 L in js/dungeon.js; hops 3, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn init_dungeon_levels` (reach regression must be 0). Measured `port-coverage.mjs --name init_dungeon_levels` 2026-09-26 @ d15d25c20. **Addressed:** D-2864 `8dccc7d47`


- [x] `cmd.c` keylist_putcmds — coverage PARTIAL (C 59 L `cmd.c:2802–2863` / JS 43 L in js/dokeylist.js; hops —, callers 6, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn keylist_putcmds` (reach regression must be 0). Measured `port-coverage.mjs --name keylist_putcmds` 2026-09-26 @ d15d25c20. **Addressed:** D-2863 `4913f8580`
- [x] `cmd.c` extcmd_via_menu — coverage MISSING (C 130 L `cmd.c:752–882` / JS no symbol; hops —, callers 0, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn extcmd_via_menu` (reach regression must be 0). Measured `port-coverage.mjs --name extcmd_via_menu` 2026-09-26 @ d15d25c20. **Addressed:** D-2863 `4913f8580`


- [x] `sp_lev.c` get_coord — coverage MISSING (C 47 L `sp_lev.c:5319–5366` / JS no symbol; hops —, callers 10, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn get_coord` (reach regression must be 0). Measured `port-coverage.mjs --name get_coord` 2026-09-26 @ d15d25c20. **Addressed:** D-2862 `4b46eed9c`


- [x] `cmd.c` reset_commands — coverage MISSING (C 132 L `cmd.c:3344–3476` / JS no symbol; hops —, callers 3, RNG 0, msg 0; dead callees: cmdbind_swapkeys). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn reset_commands` (reach regression must be 0). Measured `port-coverage.mjs --name reset_commands` 2026-09-26 @ d15d25c20. **Addressed:** D-2861 `4373171cb`


- [x] `potion.c` peffect_oil — coverage THIN (C 34 L `potion.c:1260–1294` / JS 13 L in js/potion.js; hops 4, callers 1, RNG 1, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn peffect_oil` (reach regression must be 0). Measured `port-coverage.mjs --name peffect_oil` 2026-09-26 @ ae37117bd. **Addressed:** D-2860 `905870b38`


- [x] `timeout.c` fall_asleep — coverage THIN (C 23 L `timeout.c:951–974` / JS 9 L in js/hack.js; hops 1, callers 10, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn fall_asleep` (reach regression must be 0). Measured `port-coverage.mjs --name fall_asleep` 2026-09-26 @ ae37117bd. **Addressed:** D-2859 `41bf49099`


- [x] `botl.c` status_initialize — coverage MISSING (C 36 L `botl.c:1683–1720` / JS no symbol; hops 3, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn status_initialize` (reach regression must be 0). Measured `port-coverage.mjs --name status_initialize` 2026-09-26 @ ae37117bd. **Addressed:** D-2858 `d2761e4d9`


- [x] `ball.c` unplacebc_core — coverage MISSING (C 30 L `ball.c:147–177` / JS no symbol; hops 4, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn unplacebc_core` (reach regression must be 0). Measured `port-coverage.mjs --name unplacebc_core` 2026-09-26 @ ae37117bd. **Addressed:** D-2857 `8800eafbb`


- [x] `mhitm.c` pre_mm_attack — coverage THIN (C 31 L `mhitm.c:41–72` / JS 5 L in js/mhitm.js; hops 4, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn pre_mm_attack` (reach regression must be 0). Measured `port-coverage.mjs --name pre_mm_attack` 2026-09-26 @ adbd6bd68. **Addressed:** D-2856 `2c0c6d7ee`


- [x] `uhitm.c` mhitm_ad_stck — coverage MISSING (C 26 L `uhitm.c:3306–3334` / JS no symbol; hops 4, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_stck` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_stck` 2026-09-26 @ adbd6bd68. **Addressed:** D-2855 `72aae4086`
- [x] `uhitm.c` nohandglow — coverage MISSING (C 22 L `uhitm.c:6315–6337` / JS no symbol; hops 5, callers 1, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn nohandglow` (reach regression must be 0). Measured `port-coverage.mjs --name nohandglow` 2026-09-26 @ adbd6bd68. **Addressed:** D-2855 `72aae4086`


- [x] `shk.c` block_entry — coverage MISSING (C 32 L `shk.c:5826–5858` / JS no symbol; hops 3, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn block_entry` (reach regression must be 0). Measured `port-coverage.mjs --name block_entry` 2026-09-26 @ adbd6bd68. **Addressed:** D-2854 `ddddc6312`


- [x] `quest.lua` nemesis speech texts — `nemesis_speaks` calls `qt_pager` with `nemesis_wantsit` / `nemesis_first` / `nemesis_next` / `nemesis_other` / `discourage`, but `QUEST_ROLE_TEXT` (`js/questpgr.js:571–584`) has none of those keys. C's first `com_pager_core(urole.filecode, …)` (`questpgr.c:629–634`) hits the per-role tables (`dat/quest.lua`, Archeologist `discourage` array `:232–242`, `nemesis_first` `:354`). JS misses, retries `"common"`, and so runs `nhl_nhlib_align_shuffle` twice (`rn2(3)`+`rn2(2)` each) and never draws the `discourage` array `rn2(nelems)`. Embed those role tables so the first lookup hits. Source: reviews/loop-unattended/1805-8b1fae943-nemesis-speaks.md **Addressed:** D-2853 `d15d25c20`


- [x] `mkobj.c` start_glob_timeout — coverage THIN (C 16 L `mkobj.c:1473–1491` / JS 7 L in js/mkobj.js; hops 4, callers 6, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn start_glob_timeout` (reach regression must be 0). Measured `port-coverage.mjs --name start_glob_timeout` 2026-09-26 @ adbd6bd68. **Addressed:** D-2852 `81fd2232b`


- [x] `objnam.c` rnd_otyp_by_wpnskill — coverage MISSING (C 20 L `objnam.c:3432–3452` / JS no symbol; hops 4, callers 2, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rnd_otyp_by_wpnskill` (reach regression must be 0). Measured `port-coverage.mjs --name rnd_otyp_by_wpnskill` 2026-09-26 @ 686390b2d. **Addressed:** D-2851 `cc7992cc4`
- [x] `objnam.c` maybereleaseobuf — coverage MISSING (C 31 L `objnam.c:167–198` / JS no symbol; hops 3, callers 4, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn maybereleaseobuf` (reach regression must be 0). Measured `port-coverage.mjs --name maybereleaseobuf` 2026-09-26 @ ae37117bd. **Addressed:** D-2851 `cc7992cc4`


- [x] `vision.c` get_unused_cs — coverage MISSING (C 25 L `vision.c:274–299` / JS no symbol; hops 1, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn get_unused_cs` (reach regression must be 0). Measured `port-coverage.mjs --name get_unused_cs` 2026-09-26 @ 686390b2d. **Addressed:** D-2850 `e6d1ac649`


- [x] `spell.c` confused_book — coverage MISSING (C 18 L `spell.c:189–207` / JS no symbol; hops —, callers 2, RNG 1, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn confused_book` (reach regression must be 0). Measured `port-coverage.mjs --name confused_book` 2026-09-26 @ 686390b2d. **Addressed:** D-2849 `ae37117bd`


- [x] `trap.c` maybe_finish_sokoban — coverage MISSING (C 36 L `trap.c:7059–7095` / JS no symbol; hops 3, callers 2, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn maybe_finish_sokoban` (reach regression must be 0). Measured `port-coverage.mjs --name maybe_finish_sokoban` 2026-09-26 @ 2c9559331. **Addressed:** D-2848 `53c5b4ebc`


- [x] `botl.c` exp_percent_changing — coverage MISSING (C 35 L `botl.c:2090–2125` / JS no symbol; hops 4, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn exp_percent_changing` (reach regression must be 0). Measured `port-coverage.mjs --name exp_percent_changing` 2026-09-26 @ 2c9559331. **Addressed:** D-2847 `c9492411c`


- [x] `quest.c` nemesis_speaks — coverage MISSING (C 19 L `quest.c:403–422` / JS no symbol; hops 2, callers 1, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn nemesis_speaks` (reach regression must be 0). Measured `port-coverage.mjs --name nemesis_speaks` 2026-09-26 @ 2c9559331. **Addressed:** D-2846 `8b1fae943`


- [x] `cmd.c` enter_explore_mode — coverage MISSING (C 31 L `cmd.c:952–983` / JS no symbol; hops 2, callers 1, RNG 0, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn enter_explore_mode` (reach regression must be 0). Measured `port-coverage.mjs --name enter_explore_mode` 2026-09-26 @ 2c9559331. **Addressed:** D-2845 `adbd6bd68`


- [x] `dungeon.c` dumpit — coverage MISSING (C 53 L `dungeon.c:91–144` / JS no symbol; hops 2, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dumpit` (reach regression must be 0). Measured `port-coverage.mjs --name dumpit` 2026-09-26 @ 8e53e2c60. **Addressed:** D-2844 `a2fe5c1c5`


- [x] `mon.c` iter_mons_safe — coverage MISSING (C 22 L `mon.c:4500–4522` / JS no symbol; hops 1, callers 1, RNG 0, msg 0; dead callees: alloc_itermonarr). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn iter_mons_safe` (reach regression must be 0). Measured `port-coverage.mjs --name iter_mons_safe` 2026-09-26 @ 8e53e2c60. **Addressed:** D-2843 `9e67c4a79`


- [x] `options.c` handler_msgtype — coverage MISSING (C 68 L `options.c:6502–6570` / JS no symbol; hops —, callers 1, RNG 0, msg 3; dead callees: msgtype_count, query_msgtype, free_one_msgtype). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handler_msgtype` (reach regression must be 0). Measured `port-coverage.mjs --name handler_msgtype` 2026-09-26 @ 8e53e2c60. **Addressed:** D-2842 `686390b2d`


- [x] `mkmaze.c` fixup_special — coverage PARTIAL (C 134 L `mkmaze.c:570–704` / JS 71 L in js/mklev.js; hops 2, callers 3, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn fixup_special` (reach regression must be 0). Measured `port-coverage.mjs --name fixup_special` 2026-09-26 @ 8e53e2c60. **Addressed:** D-2841 `fab716a35`


- [x] `ball.c` placebc_core — coverage MISSING (C 24 L `ball.c:120–144` / JS no symbol; hops 3, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn placebc_core` (reach regression must be 0). Measured `port-coverage.mjs --name placebc_core` 2026-09-26 @ 8eb83b375. **Addressed:** D-2840 `dcaae0c59`


- [x] `uhitm.c` mhitm_ad_legs — coverage THIN (C 62 L `uhitm.c:4425–4489` / JS 8 L in js/mhitm.js; hops 4, callers 1, RNG 4, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_legs` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_legs` 2026-09-26 @ db4f455db. **Stale:** existing park 2026-09-25 (split live).
- [x] `uhitm.c` hmon_hitmon_poison — coverage MISSING (C 25 L `uhitm.c:1510–1538` / JS no symbol; hops 5, callers 1, RNG 3, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hmon_hitmon_poison` (reach regression must be 0). Measured `port-coverage.mjs --name hmon_hitmon_poison` 2026-09-26 @ 8eb83b375. **Addressed:** D-2839 `b2801e780`
- [x] `uhitm.c` mhitm_ad_dren — coverage MISSING (C 22 L `uhitm.c:2418–2442` / JS no symbol; hops 4, callers 1, RNG 3, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_dren` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_dren` 2026-09-26 @ 8eb83b375. **Addressed:** D-2839 `b2801e780`
- [x] `uhitm.c` hmon_hitmon_jousting — coverage MISSING (C 23 L `uhitm.c:1541–1567` / JS no symbol; hops 5, callers 1, RNG 1, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hmon_hitmon_jousting` (reach regression must be 0). Measured `port-coverage.mjs --name hmon_hitmon_jousting` 2026-09-26 @ 8eb83b375. **Addressed:** D-2839 `b2801e780`
- [x] `uhitm.c` hmon_hitmon_barehands — coverage MISSING (C 44 L `uhitm.c:838–882` / JS no symbol; hops 6, callers 1, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hmon_hitmon_barehands` (reach regression must be 0). Measured `port-coverage.mjs --name hmon_hitmon_barehands` 2026-09-26 @ 8e53e2c60. **Addressed:** D-2839 `b2801e780`


- [x] `options.c` handler_autopickup_exception — coverage MISSING (C 73 L `options.c:6331–6404` / JS no symbol; hops —, callers 1, RNG 0, msg 1; dead callees: add_autopickup_exception, remove_autopickup_exception). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handler_autopickup_exception` (reach regression must be 0). Measured `port-coverage.mjs --name handler_autopickup_exception` 2026-09-26 @ fb4f1bf7d. **Addressed:** D-2838 `2c9559331`


- [x] `pager.c` setopt_cmd — coverage MISSING (C 49 L `pager.c:2908–2957` / JS no symbol; hops —, callers 1, RNG 0, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn setopt_cmd` (reach regression must be 0). Measured `port-coverage.mjs --name setopt_cmd` 2026-09-26 @ fb4f1bf7d. **Addressed:** D-2837 `8e53e2c60`


- [x] `mkmaze.c` `place_lregion` — tele `put_lregion_here` (`mkmaze.c:444–455`) must finish `rloc(mtmp, RLOC_NOMSG)`, `m_into_limbo`, and `u_on_newpos` before return. JS returns a Promise. `u_on_rndspot` awaits it; `mklev.js:2398` (`mkmaze.c:606`) and the other sync `place_lregion` calls do not. Verify `node scripts/verify.mjs --fn place_lregion`. Source: reviews/loop-unattended/1790-8eb83b375-place-lregion.md D-2836 **Addressed:** D-2836 `e41959f29`


- [x] `mcastu.c` `mcast_insects` — unseen-success `!Deaf` (`mcastu.c:694–698`) must be `youprop.h:123–125` (`HDeaf || EDeaf || u.uroleplay.deaf`). `insects_Deaf` (`mcastu.js:639`) and `You_hear` (`hack.js:179`) both OR sticky `u.Deaf`, so a sticky-only deaf hero takes the visual `pline` instead of `You hear`. Verify `node scripts/verify.mjs --fn mcast_insects`. Source: reviews/loop-unattended/1787-4d4432b8f-mcast-insects.md **Addressed:** D-2835 `57e3529ab`
- [x] `mcastu.c` `mcast_insects` — `seecaster` (`mcastu.c:677`) must use `youprop.h:190` `Detect_monsters` (`H || E` only). The file clone `mcastu.js:144` ORs sticky `u.Detect_monsters`, so that hero takes `pline_mon` instead of the unseen `You_hear` arm. Verify `node scripts/verify.mjs --fn mcast_insects`. Source: reviews/loop-unattended/1787-4d4432b8f-mcast-insects.md **Addressed:** D-2835 `57e3529ab`
- [x] `mcastu.c` `mcast_insects` — `insects_Displaced` (`mcastu.js:676`) and `insects_BInvis` (`:655`) must be the macros (`youprop.h:204` and `:198`). Drop the worn-cloak and worn-wrapping disjuncts. `confer_oc_oprop` and `w_blocks` already write those bits. Verify `node scripts/verify.mjs --fn mcast_insects`. Source: reviews/loop-unattended/1787-4d4432b8f-mcast-insects.md **Addressed:** D-2835 `57e3529ab`


- [x] `insight.c` youhiding — coverage PARTIAL (C 54 L `insight.c:2022–2077` / JS 40 L in js/polyself.js; hops 2, callers 4, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn youhiding` (reach regression must be 0). Measured `port-coverage.mjs --name youhiding` 2026-09-26 @ fb4f1bf7d. **Addressed:** D-2834 `236be808b`


- [x] `role.c` genl_player_setup — coverage THIN (C 519 L `role.c:2206–2725` / JS 175 L in js/player_selection.js; hops —, callers 1, RNG 0, msg 4; dead callees: randgend). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn genl_player_setup` (reach regression must be 0). Measured `port-coverage.mjs --name genl_player_setup` 2026-09-26 @ fb4f1bf7d. **Addressed:** D-2833 `92e997504`


- [x] `polyself.c` set_uasmon — coverage PARTIAL (C 89 L `polyself.c:38–127` / JS 51 L in js/polyself.js; hops 2, callers 11, RNG 0, msg 0; dead callees: valid_vampshiftform). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn set_uasmon` (reach regression must be 0). Measured `port-coverage.mjs --name set_uasmon` 2026-09-26 @ fb4f1bf7d. **Addressed:** D-2832 `53a5e85c8`


- [x] `mkmaze.c` place_lregion — coverage PARTIAL (C 50 L `mkmaze.c:356–410` / JS 31 L in js/mklev.js; hops 3, callers 6, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn place_lregion` (reach regression must be 0). Measured `port-coverage.mjs --name place_lregion` 2026-09-26 @ fb4f1bf7d. **Addressed:** D-2831 `8eb83b375`
- [x] `mkmaze.c` setup_waterlevel — coverage PARTIAL (C 45 L `mkmaze.c:1812–1857` / JS 22 L in js/mklev.js; hops 3, callers 1, RNG 5, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn setup_waterlevel` (reach regression must be 0). Measured `port-coverage.mjs --name setup_waterlevel` 2026-09-26 @ fb4f1bf7d. **Addressed:** D-2831 `8eb83b375`


- [x] `options.c` optfn_sortloot — coverage MISSING (C 39 L `options.c:3914–3955` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_sortloot). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_sortloot` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_sortloot` 2026-09-26 @ 4d4432b8f. **Addressed:** D-2830 `db4f455db`
- [x] `options.c` optfn_runmode — coverage MISSING (C 37 L `options.c:3627–3666` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_runmode). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_runmode` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_runmode` 2026-09-26 @ 4d4432b8f. **Addressed:** D-2830 `db4f455db`
- [x] `options.c` optfn_pickup_types — coverage MISSING (C 91 L `options.c:3308–3401` / JS no symbol; hops —, callers 0, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_pickup_types` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_pickup_types` 2026-09-26 @ 4d4432b8f. **Addressed:** D-2830 `db4f455db`
- [x] `options.c` optfn_scores — coverage MISSING (C 89 L `options.c:3669–3760` / JS no symbol; hops —, callers 0, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_scores` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_scores` 2026-09-26 @ 4d4432b8f. **Addressed:** D-2830 `db4f455db`
- [x] `options.c` optfn_boulder — coverage MISSING (C 73 L `options.c:1171–1246` / JS no symbol; hops —, callers 0, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_boulder` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_boulder` 2026-09-26 @ 4d4432b8f. **Addressed:** D-2830 `db4f455db`


- [x] `trap.c` rescued_from_terrain — coverage PARTIAL (C 41 L `trap.c:5014–5055` / JS 25 L in js/trap.js; hops 3, callers 3, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rescued_from_terrain` (reach regression must be 0). Measured `port-coverage.mjs --name rescued_from_terrain` 2026-09-26 @ 678f36702. **Addressed:** D-2829 `fb4f1bf7d`


- [x] `mcastu.c` mcast_insects — coverage PARTIAL (C 81 L `mcastu.c:645–726` / JS 58 L in js/mcastu.js; hops 3, callers 1, RNG 1, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mcast_insects` (reach regression must be 0). Measured `port-coverage.mjs --name mcast_insects` 2026-09-26 @ 678f36702. **Addressed:** D-2828 `4d4432b8f`


- [x] `hack.c` `inv_weight` — missing arm: C `hack.c:4359–4360` `otyp != BOULDER || !throws_rocks(youmonst.data)` absent from `js/invent.js:1117` (non-coin arm always adds `owt`). `hurtle_step` (`dothrow.c:826`, D-2819) sums `inv_weight()+weight_cap()`, so a rock-thrower counts boulder weight C skips. Verify `node scripts/verify.mjs --fn inv_weight`. Source: reviews/loop-unattended/1778-678f36702-weight-cap.md **Addressed:** D-2827 `f5cea8a9c`


- [x] `hack.c` `domove_fight_empty` — hallucinated-statue arm (`hack.c:2258–2261`) calls `Hallucination` from `js/do_name.js:255`, which returns on sticky `u.Hallucination` before resistance and ignores `uprops[HALLUC]`. C `youprop.h:120` is `HHallucination && !Halluc_resistance`. Re-point the `js/cmd.js` import to `js/display.js:1091` (D-2817). Verify `node scripts/verify.mjs --fn domove_fight_empty`. Source: reviews/loop-unattended/1784-b60cf8e62-fight-empty.md **Addressed:** D-2826 `38097d48c`


- [x] `hack.c` domove_fight_empty — coverage PARTIAL (C 109 L `hack.c:2229–2338` / JS 61 L in js/cmd.js; hops 2, callers 2, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn domove_fight_empty` (reach regression must be 0). Measured `port-coverage.mjs --name domove_fight_empty` 2026-09-26 @ 678f36702. **Addressed:** D-2825 `b60cf8e62`


- [x] `mon.c` dmonsfree — coverage PARTIAL (C 24 L `mon.c:2487–2511` / JS 11 L in js/mon.js; hops 1, callers 15, RNG 0, msg 0; dead callees: dealloc_monst). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dmonsfree` (reach regression must be 0). Measured `port-coverage.mjs --name dmonsfree` 2026-09-26 @ 678f36702. **Addressed:** D-2824 `40264ce0a`.


- [x] `makemon.c` rndmonst_adj — coverage PARTIAL (C 73 L `makemon.c:1659–1732` / JS 43 L in js/makemon.js; hops 4, callers 3, RNG 4, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rndmonst_adj` (reach regression must be 0). Measured `port-coverage.mjs --name rndmonst_adj` 2026-09-26 @ 678f36702. **Addressed:** D-2823 `8a86cd50e`


- [x] `options.c` optfn_windowborders — coverage MISSING (C 54 L `options.c:4797–4853` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_windowborders). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_windowborders` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_windowborders` 2026-09-26 @ 75a5d7683. **Addressed:** D-2822 `7a0f166d7`
- [x] `options.c` optfn_menustyle — coverage MISSING (C 53 L `options.c:2320–2375` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_menustyle). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_menustyle` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_menustyle` 2026-09-26 @ 75a5d7683. **Addressed:** D-2822 `7a0f166d7`
- [x] `options.c` optfn_pickup_burden — coverage MISSING (C 47 L `options.c:3256–3305` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_pickup_burden). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_pickup_burden` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_pickup_burden` 2026-09-26 @ 75a5d7683. **Addressed:** D-2822 `7a0f166d7`
- [x] `options.c` optfn_sortdiscoveries — coverage MISSING (C 46 L `options.c:3863–3911` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: get_sortdisco). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_sortdiscoveries` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_sortdiscoveries` 2026-09-26 @ 75a5d7683. **Addressed:** D-2822 `7a0f166d7`
- [x] `options.c` optfn_align_message — coverage MISSING (C 45 L `options.c:923–970` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_align_misc). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_align_message` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_align_message` 2026-09-26 @ 75a5d7683. **Addressed:** D-2822 `7a0f166d7`
- [x] `options.c` optfn_align_status — coverage MISSING (C 44 L `options.c:973–1019` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_align_misc). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_align_status` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_align_status` 2026-09-26 @ 75a5d7683. **Addressed:** D-2822 `7a0f166d7`
- [x] `options.c` optfn_whatis_filter — coverage MISSING (C 44 L `options.c:4748–4794` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_whatis_filter). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_whatis_filter` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_whatis_filter` 2026-09-26 @ 75a5d7683. **Addressed:** D-2822 `7a0f166d7`


- [x] `options.c` optfn_paranoid_confirmation — coverage MISSING **Addressed:** D-2821 `6fb805b57`. (C 223 L `options.c:2818–3043` / JS no symbol; hops —, callers 0, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_paranoid_confirmation` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_paranoid_confirmation` 2026-09-26 @ 75a5d7683.


- [x] `vision.c` view_from — coverage PARTIAL (C 83 L `vision.c:2002–2091` / JS 48 L in js/vision.js; hops 1, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn view_from` (reach regression must be 0). Measured `port-coverage.mjs --name view_from` 2026-09-26 @ 9dcef1d65. **Addressed:** D-2820 `3c5dbb972`


- [x] `hack.c` weight_cap — coverage PARTIAL (C 51 L `hack.c:4295–4346` / JS 30 L in js/invent.js; hops 2, callers 8, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn weight_cap` (reach regression must be 0). Measured `port-coverage.mjs --name weight_cap` 2026-09-26 @ 9dcef1d65. **Addressed:** D-2819 `678f36702`


- [x] `detect.c` level_distance — STALE 2026-09-26: body already live at js/detect.js:2486 (every ll/indun/rn2 arm); caller detect.c:1356 → js/detect.js:2692; ratio 0.40. Measured `port-coverage.mjs --name level_distance` 2026-09-26 @ 9dcef1d65.
- [x] `mkobj.c` set_corpsenm — coverage PARTIAL (C 49 L `mkobj.c:1318–1367` / JS 32 L in js/mkobj.js; hops 3, callers 22, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn set_corpsenm` (reach regression must be 0). Measured `port-coverage.mjs --name set_corpsenm` 2026-09-26 @ 9dcef1d65. **Addressed:** D-2818 `fc6ad8bdf`


- [x] `steed.c` `mount_steed` hallucination gate calls `do_name.js` `Hallucination` (`:255`), which returns true on `u.Hallucination` before `Halluc_resistance` and does not read `uprops[HALLUC].intrinsic`. C `youprop.h:120` is `HHallucination && !Halluc_resistance` (`HHallucination` is `uprops[HALLUC].intrinsic`, `:116`). `display.js:1091` is that test. Source: reviews/loop-unattended/1772-686ccd9e7-mount-steed.md. Verify `node scripts/verify.mjs --fn mount_steed` (reach regression must be 0). **Addressed:** D-2817 `b05a6b770`


- [x] `artifact.c` retouch_equipment — coverage PARTIAL (C 64 L `artifact.c:2640–2705` / JS 35 L in js/artifact.js; hops 2, callers 8, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn retouch_equipment` (reach regression must be 0). Measured `port-coverage.mjs --name retouch_equipment` 2026-09-26 @ 9dcef1d65. **Addressed:** D-2816 `5dd7c4a90`

## 2026-09-25

- [x] `teleport.c` safe_teleds — coverage PARTIAL (C 53 L `teleport.c:717–770` / JS 38 L in js/teleport.js; hops 3, callers 11, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn safe_teleds` (reach regression must be 0). Measured `port-coverage.mjs --name safe_teleds` 2026-09-26 @ 7041ab3e4. **Addressed:** D-2815 `75a5d7683`


- [x] `pickup.c` allow_category — coverage THIN (C 69 L `pickup.c:523–592` / JS 27 L in js/pickup.js; hops 2, callers 6, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn allow_category` (reach regression must be 0). Measured `port-coverage.mjs --name allow_category` 2026-09-25 @ 7215d8d6a. **Addressed:** D-2814 `30a1b86dc`


- [x] `steed.c` mount_steed — coverage PARTIAL (C 184 L `steed.c:197–383` / JS 137 L in js/steed.js; hops —, callers 1, RNG 2, msg 23). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mount_steed` (reach regression must be 0). Measured `port-coverage.mjs --name mount_steed` 2026-09-25 @ 7215d8d6a. **Addressed:** D-2813 `686ccd9e7`


- [x] `steal.c` remove_worn_item — coverage PARTIAL (C 75 L `steal.c:213–290` / JS 47 L in js/do_wear.js; hops 2, callers 38, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn remove_worn_item` (reach regression must be 0). Measured `port-coverage.mjs --name remove_worn_item` 2026-09-25 @ 7215d8d6a. **Addressed:** D-2812 `9dcef1d65`


- [x] `getpos.c` coord_desc — coverage PARTIAL (C 40 L `getpos.c:595–635` / JS 22 L in js/display.js; hops 2, callers 8, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn coord_desc` (reach regression must be 0). Measured `port-coverage.mjs --name coord_desc` 2026-09-25 @ 7215d8d6a. **Addressed:** D-2811 `4bf3b26b6`


- [x] `js/display.js` `petattr_to_tty` returns 0 for wintype `ATR_ITALIC` (3) and `ATR_BLINK` (5). `s_atr2str` (`termcap.c:1343–1364`) with `ZH`/`MB`/`MD` null and `nh_US`/`nh_HI` set (`termcap.c:157–158`) paints italic as underline and blink as bold. Dim stays 0 (`:1370–1374`). Source: reviews/loop-unattended/1758-7a4911ae6-petattr-to-tty.md. Verify `node scripts/verify.mjs --fn optfn_petattr` (reach regression must be 0). **Addressed:** D-2810 `302f02151`


- [x] `js/do_wear.js` `Boots_on` `FUMBLE_BOOTS` adds `rnd(20)` with `(sum & TIMEOUT)`. C `incr_itimeout` (`potion.c:55–85`) saturates at `TIMEOUT` (`0x00FFFFFF`) via `itimeout`. A sum past `0x00FFFFFF` wraps. `js/potion.js` `incr_itimeout` already clamps; mirror `HFumbling` from the slot. Source: reviews/loop-unattended/1762-a48dbe85b-cloak-boots.md. Verify `node scripts/verify.mjs --fn Boots_on` (reach regression must be 0). **Addressed:** D-2809 `27a017b11`


- [x] `js/mhitu.js` `unstuck` skips `placebc` when a swallowed iron ball kills the engulfer. C `mon.c:3448–3453`: after `set_ustuck(0)`, if swallowed and `Punished && uchain->where != OBJ_FLOOR`, `placebc()` before `vision_full_recalc`. `thitmonst` (`dothrow.c:2240–2241`, `js/dothrow.js:758`) then returns 1 so the caller does not place `uball` again. JS sets `ux`/`uy` and `docrt` and leaves the ball unplaced. Source: reviews/loop-unattended/1763-b5e93433b-thitmonst.md. Verify `node scripts/verify.mjs --fn unstuck` (reach regression must be 0). **Addressed:** D-2808 `79c71b903`


- [x] `zap.c` bhito — coverage PARTIAL (C 305 L `zap.c:2119–2424` / JS 173 L in js/zap.js; hops 5, callers 3, RNG 0, msg 12). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn bhito` (reach regression must be 0). Measured `port-coverage.mjs --name bhito` 2026-09-25 @ 7215d8d6a. **Addressed:** D-2807 `e1ef155a9`


- [x] `invent.c` addinv_core0 — coverage MISSING (C 90 L `invent.c:1056–1148` / JS no symbol; hops 3, callers 5, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn addinv_core0` (reach regression must be 0). Measured `port-coverage.mjs --name addinv_core0` 2026-09-25 @ 5df2d266b. **Addressed:** D-2806 `7041ab3e4`


- [x] `artifact.c` arti_invoke — coverage PARTIAL (C 101 L `artifact.c:2131–2232` / JS 62 L in js/artifact.js; hops 4, callers 4, RNG 2, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn arti_invoke` (reach regression must be 0). Measured `port-coverage.mjs --name arti_invoke` 2026-09-25 @ 5df2d266b. **Addressed:** D-2805 `7215d8d6a`


- [x] `dothrow.c` thitmonst — coverage PARTIAL (C 291 L `dothrow.c:2011–2304` / JS 210 L in js/dothrow.js; hops 4, callers 4, RNG 3, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn thitmonst` (reach regression must be 0). Measured `port-coverage.mjs --name thitmonst` 2026-09-25 @ 5df2d266b. **Addressed:** D-2804 `b5e93433b`


- [x] `do_wear.c` Cloak_off — coverage PARTIAL (C 48 L `do_wear.c:383–431` / JS 23 L in js/do_wear.js; hops 3, callers 10, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Cloak_off` (reach regression must be 0). Measured `port-coverage.mjs --name Cloak_off` 2026-09-25 @ 75144e146. **Addressed:** D-2803 `a48dbe85b`
- [x] `do_wear.c` Boots_on — coverage PARTIAL (C 72 L `do_wear.c:187–259` / JS 39 L in js/do_wear.js; hops 3, callers 4, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Boots_on` (reach regression must be 0). Measured `port-coverage.mjs --name Boots_on` 2026-09-25 @ 84dbed10c. **Addressed:** D-2803 `a48dbe85b`


- [x] `js/mhitm.js` `resists_poison_mm` is only `mresists|mextrinsics|mintrinsics`. `mhitm_ad_drst` (you→mon and `mhitm_really_poison`) calls it. C `resists_poison` is `Resists_Elem` (`mondata.c:127–197`): those bits, then wielded artifact `defends`, worn/carried `oc_oprop`, alchemy smock, and `defends_when_carried`. A smock or poison-defending artifact does not resist. Source: reviews/loop-unattended/1756-5df2d266b-mhitm-ad-drst.md. Verify `node scripts/verify.mjs --fn mhitm_ad_drst` (reach regression must be 0). **Addressed:** D-2802 `8af23c12b`


- [x] `js/mkobj.js` `start_timer` stores string `MELT_ICE_AWAY` as func_index 0 (`action | 0`), which is `ROT_ORGANIC`. C `timeout_funcs` index 8 is `melt_ice_away` (`timeout.c:1978–1990`). `run_timers` then calls `rot_organic` on a level timer (`mkobj.js:1545`) and the string compare never runs. Store index 8 and call `melt_ice_away` on the packed long. Source: reviews/loop-unattended/1753-2b10e06e1-start-timer.md. Verify `node scripts/verify.mjs --fn start_timer` (reach regression must be 0). **Addressed:** D-2801 `67ccc0b33`


- [x] `js/do.js` `dodown` ceiling-hider and `u_locomotion` call the local `Flying()` (`do.js:449`) which drops the steed-flyer. `youprop.h` `Flying` is `(HFlying || EFlying || (u.usteed && is_flyer(u.usteed->data))) && !BFlying`. `mhitu.js` `Flying` already has that arm and `do.js` already imports `mhitu.js`. Source: reviews/loop-unattended/1752-f176b8c0a-dodown.md. Verify `node scripts/verify.mjs --fn dodown` (reach regression must be 0). **Addressed:** D-2800 `24d4c0ac1`


- [x] `js/display.js` `petattr_to_tty` passes wintype attribute numbers through the terminal bitfield — `wintype.h` `ATR_BOLD` is 1 and terminal `ATR_INVERSE` is 1, so a stored bold paints inverse; `ATR_DIM` 2 paints terminal bold (`ATR_BOLD` 2); italic 3 and blink 5 alias inverse|bold and inverse|underline. Map none→0, bold→2, underline→4, inverse→1; dim/italic/blink must not pass through. C `options.c:3163` stores `match_str2attr`'s wintype value; paint is `js/display.js` `mon_map_attr` / `glyph_tty_attr`. Source: reviews/loop-unattended/1751-75144e146-optfn-petattr.md. Verify `node scripts/verify.mjs --fn optfn_petattr` (reach regression must be 0). **Addressed:** D-2799 `7a4911ae6`


- [x] `zap.c` fracture_rock — coverage PARTIAL (C 41 L `zap.c:5537–5578` / JS 20 L in js/dig.js; hops 3, callers 9, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn fracture_rock` (reach regression must be 0). Measured `port-coverage.mjs --name fracture_rock` 2026-09-25 @ 75144e146. **Addressed:** D-2798 `0cf2f655d`


- [x] `uhitm.c` mhitm_ad_drst — coverage MISSING (C 41 L `uhitm.c:3122–3165` / JS no symbol; hops 4, callers 1, RNG 5, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_drst` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_drst` 2026-09-25 @ 75144e146. **Addressed:** D-2797 `5df2d266b`


- [x] `mthrowu.c` thitu — coverage PARTIAL (C 76 L `mthrowu.c:75–155` / JS 48 L in js/mthrowu.js; hops 3, callers 9, RNG 1, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn thitu` (reach regression must be 0). Measured `port-coverage.mjs --name thitu` 2026-09-25 @ 75144e146. **Addressed:** D-2796 `84dbed10c`


- [x] `mkobj.c` mkcorpstat — coverage PARTIAL (C 46 L `mkobj.c:2067–2118` / JS 30 L in js/mkobj.js; hops 2, callers 14, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mkcorpstat` (reach regression must be 0). Measured `port-coverage.mjs --name mkcorpstat` 2026-09-25 @ 38d6c8a36. **Addressed:** D-2795 `5f09ad2ca`


- [x] `timeout.c` start_timer — coverage PARTIAL (C 41 L `timeout.c:2247–2292` / JS 29 L in js/mkobj.js; hops 2, callers 15, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn start_timer` (reach regression must be 0). Measured `port-coverage.mjs --name start_timer` 2026-09-25 @ 38d6c8a36. **Addressed:** D-2794 `2b10e06e1`


- [x] `do.c` dodown — coverage THIN (C 163 L `do.c:1131–1294` / JS 48 L in js/do.js; hops —, callers 0, RNG 3, msg 13; dead callees: artifact_has_invprop, goto_hell). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dodown` (reach regression must be 0). Measured `port-coverage.mjs --name dodown` 2026-09-25 @ 38d6c8a36. **Addressed:** D-2793 `f176b8c0a`


- [x] `options.c` optfn_petattr — coverage MISSING (C 54 L `options.c:3138–3194` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_petattr). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_petattr` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_petattr` 2026-09-23 @ e93d269e7. **Addressed:** D-2792 `75144e146`


- [x] `js/options.js` `parseNethackrc` role/race/gender/align do_set arms never set `duplicateOpt` — C `parseoptions` `:621` sets `duplicate` before the optfn, and `parse_role_opt` `:7987–7990` then rejects a positive value when the same-phase saved string starts with `'!'`. Source: reviews/loop-unattended/1745-6864eb3d8-optfn-gender-family.md. Verify `node scripts/verify.mjs --fn optfn_gender` (reach regression must be 0). **Addressed:** D-2791 `38d6c8a36`


- [x] `js/options.js` `nmcpy` copies `slice(0, maxlen-1)` and keeps commas — C `options.c:6859–6871` stops before `','` or `'\0'` and does not store the comma (`fruit:apple,banana` → `apple`). Callers `optfn_fruit` (`:1748`, `:1753`) and `optfn_role` (`:3610` `pl_character`). Source: reviews/loop-unattended/1742-40c2ca295-optfn-fruit.md. Verify `node scripts/verify.mjs --fn optfn_fruit` (reach regression must be 0). **Addressed:** D-2790 `167912450`


- [x] `coloratt.c` basic_menu_colors — coverage PARTIAL (C 47 L `coloratt.c:530–580` / JS 22 L in js/options.js; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn basic_menu_colors` (reach regression must be 0). Measured `port-coverage.mjs --name basic_menu_colors` 2026-09-23 @ e93d269e7. **Addressed:** D-2789 `309d58ccc`


- [x] `options.c` optfn_disclose — coverage MISSING (C 116 L `options.c:1442–1560` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: handler_disclose). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_disclose` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_disclose` 2026-09-23 @ e93d269e7. **Addressed:** D-2788 `086317c06`


- [x] `cfgfiles.c` rcfile_interface_options — coverage MISSING (C 16 L `cfgfiles.c:1960–1976` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: disregard_all_options, disregard_all_config_statements, heed_all_config_statements, heed_all_options). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rcfile_interface_options` (reach regression must be 0). Measured `port-coverage.mjs --name rcfile_interface_options` 2026-09-23 @ e93d269e7. **Addressed:** D-2787 `9d6d893ca`
- [x] `cfgfiles.c` parse_conf_str — coverage MISSING (C 27 L `cfgfiles.c:1810–1837` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: cnf_parser_init, cnf_parser_done). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn parse_conf_str` (reach regression must be 0). Measured `port-coverage.mjs --name parse_conf_str` 2026-09-23 @ e93d269e7. **Addressed:** D-2787 `9d6d893ca`


- [x] `options.c` optfn_gender — coverage MISSING (C 30 L `options.c:1777–1812` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: parse_role_opt, saveoptstr, get_cnf_role_opt). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_gender` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_gender` 2026-09-23 @ e93d269e7. **Addressed:** D-2786 `6864eb3d8`
- [x] `options.c` optfn_race — coverage MISSING (C 30 L `options.c:3507–3542` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: parse_role_opt, saveoptstr, get_cnf_role_opt). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_race` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_race` 2026-09-23 @ e93d269e7. **Addressed:** D-2786 `6864eb3d8`
- [x] `options.c` optfn_role — coverage MISSING (C 30 L `options.c:3589–3624` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: parse_role_opt, saveoptstr, get_cnf_role_opt). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_role` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_role` 2026-09-23 @ e93d269e7. **Addressed:** D-2786 `6864eb3d8`
- [x] `options.c` optfn_alignment — coverage MISSING (C 29 L `options.c:885–919` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: parse_role_opt, saveoptstr, get_cnf_role_opt). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_alignment` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_alignment` 2026-09-23 @ e93d269e7. **Addressed:** D-2786 `6864eb3d8`


- [x] `options.c` optfn_soundlib — coverage MISSING (C 34 L `options.c:3824–3860` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: get_soundlib_name, soundlib_id_from_opt, assign_soundlib). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_soundlib` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_soundlib` 2026-09-23 @ 181b4b4ff. **Addressed:** D-2785 `51c8c5714`


- [x] `options.c` optfn_sortvanquished — coverage MISSING (C 50 L `options.c:3958–4010` / JS no symbol; hops —, callers 0, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_sortvanquished` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_sortvanquished` 2026-09-23 @ 181b4b4ff. **Addressed:** D-2784 `310accbad`


- [x] `options.c` optfn_fruit — coverage MISSING (C 66 L `options.c:1706–1774` / JS no symbol; hops —, callers 0, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_fruit` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_fruit` 2026-09-23 @ 181b4b4ff. **Addressed:** D-2783 `40c2ca295`


- [x] `js/options.js` parseNethackrc valueless `menu_objsyms` arm passes lowercased `lname` as `opts` — C `options.c:2249` `strncmp(opts,"use_menu_glyphs",15)` is case-sensitive on the case-preserved string, so valueless `USE_MENU_GLYPHS` (any non-lowercase) sets headers(1) in C but entries(2) in JS. Pass `stripped` (msg_window site-2 precedent). Source: reviews/loop-unattended/1733-d61d9e62a-menu-objsyms.md. Verify `node scripts/verify.mjs --fn optfn_menu_objsyms` (reach regression must be 0). **Addressed:** D-2782 `315a5ae66`

## 2026-09-24

- [x] `js/options.js` doset_compound_via_getlin number_pad arm never marks `opt_set_in_config` — C `doset_simple_menu` (`options.c:8668–8669`) marks `opt_set_in_config[k]=TRUE` on `optn_ok` (handler returns OPTN_OK even on cancel, so C marks on every pick). Capture the result and mark `opt_set_in_config[allopt_idx('number_pad')]` on OPTN_OK (D-2773 full-doset else-arm pattern; same one line suits the three sibling hasHandler arms). Source: reviews/loop-unattended/1737-1adad9065-number-pad.md. Verify `node scripts/verify.mjs --fn handler_number_pad` (reach regression must be 0). **Addressed:** D-2781 `47eba199b`

## 2026-09-23

- [x] `glyphs.c` purge_all_custom_entries — coverage MISSING (C 7 L `glyphs.c:751–758` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: purge_custom_entries). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn purge_all_custom_entries` (reach regression must be 0). Measured `port-coverage.mjs --name purge_all_custom_entries` 2026-09-23 @ 181b4b4ff. **Addressed:** D-2780 `35cb25d77`


- [x] `wizcmds.c` wiz_show_seenv — coverage MISSING (C 41 L `wizcmds.c:576–617` / JS no symbol; hops —, callers 0, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn wiz_show_seenv` (reach regression must be 0). Measured `port-coverage.mjs --name wiz_show_seenv` 2026-09-23 @ 66cce8590. **Addressed:** D-2779 `e93d269e7`
- [x] `wizcmds.c` wiz_migrate_mons — coverage MISSING (C 57 L `wizcmds.c:1873–1930` / JS no symbol; hops —, callers 0, RNG 0, msg 1; dead callees: list_migrating_mons). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn wiz_migrate_mons` (reach regression must be 0). Measured `port-coverage.mjs --name wiz_migrate_mons` 2026-09-23 @ 181b4b4ff. **Addressed:** D-2779 `e93d269e7`


- [x] `options.c` handler_number_pad — coverage MISSING (C 57 L `options.c:5893–5950` / JS no symbol; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handler_number_pad` (reach regression must be 0). Measured `port-coverage.mjs --name handler_number_pad` 2026-09-23 @ 66cce8590. **Addressed:** D-2778 `1adad9065`


- [x] `coloratt.c` closest_color — coverage MISSING (C 24 L `coloratt.c:997–1021` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: color_distance). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn closest_color` (reach regression must be 0). Measured `port-coverage.mjs --name closest_color` 2026-09-23 @ 66cce8590. **Addressed:** D-2777 `b7046f564`
- [x] `coloratt.c` alt_color_spec — coverage MISSING (C 54 L `coloratt.c:1111–1165` / JS no symbol; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn alt_color_spec` (reach regression must be 0). Measured `port-coverage.mjs --name alt_color_spec` 2026-09-23 @ 66cce8590. **Addressed:** D-2777 `b7046f564`
- [x] `coloratt.c` color_attr_parse_str — coverage MISSING (C 40 L `coloratt.c:261–301` / JS no symbol; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn color_attr_parse_str` (reach regression must be 0). Measured `port-coverage.mjs --name color_attr_parse_str` 2026-09-23 @ 66cce8590. **Addressed:** D-2777 `b7046f564`


- [x] `sounds.c` add_sound_mapping — coverage MISSING (C 70 L `sounds.c:1556–1626` / JS no symbol; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn add_sound_mapping` (reach regression must be 0). Measured `port-coverage.mjs --name add_sound_mapping` 2026-09-23 @ d0dce8186. **Addressed:** D-2776 `181b4b4ff`
- [x] `sounds.c` base_soundname_to_filename — coverage MISSING (C 64 L `sounds.c:2084–2152` / JS no symbol; hops —, callers 0, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn base_soundname_to_filename` (reach regression must be 0). Measured `port-coverage.mjs --name base_soundname_to_filename` 2026-09-23 @ d0dce8186. **Addressed:** D-2776 `181b4b4ff`


- [x] `options.c` handler_whatis_coord — coverage MISSING (C 70 L `options.c:6206–6276` / JS no symbol; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handler_whatis_coord` (reach regression must be 0). Measured `port-coverage.mjs --name handler_whatis_coord` 2026-09-23 @ d0dce8186. **Addressed:** D-2775 `93090310b`


- [x] `options.c` handler_menu_objsyms — coverage MISSING (C 34 L `options.c:5795–5829` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: set_menuobjsyms_flags). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handler_menu_objsyms` (reach regression must be 0). Measured `port-coverage.mjs --name handler_menu_objsyms` 2026-09-23 @ d0dce8186. **Addressed:** D-2774 `d61d9e62a`


- [x] `options.c` doset do_handler for msg_window / paranoid_confirmation / versinfo — **Addressed:** D-2773 `55da228b3` — C `optlist.h:509/556/816` declare all three `has_handler`; C `doset` calls `allopt[k].optfn(idx, do_handler, …)` (csym `doset` body line 179–180), reaching `handler_msg_window` `:5831–5890`, `handler_paranoid_confirmation` `:5952–6008`, `handler_versinfo` `:6572–6617` + the `optfn_versinfo` `:4513–4516` "changed to / not changed, still %u" pline. JS `doset` pushes the three rows without `handler: true` and with hardcoded values (`js/options.js:3688/3691/3709`), so picks are dropped at `:3751`; the three D-2765 handlers have no JS caller. Wire them in the handler loop (`:3766`, perminv_mode precedent) and render msg_window/versinfo values via their REQ_GET_VAL. Verify `node scripts/verify.mjs --fn handler_msg_window`. Source: reviews/loop-unattended/1724-1b02bce10-optfn-msg-window-family.md


- [x] `insight.c` vanqsort_cmp MCLS arms — C `insight.c:2658–2699` (inside `vanqsort_cmp` `:2620–2714`): signed numeric mlet compare with the `punctclasses` remap (`S_LIZARD, S_EEL, S_GOLEM, S_GHOST, S_DEMON, S_HUMAN` placed past `S_ZOMBIE`), Riders sorted before demons on a class tie (`is_rider(2) - is_rider(1)`), then `mlevel` low→high (negated for VANQ_MCLS_HTOL), mndx tiebreak. JS `js/insight.js:843–849` returns `res = 0` (mndx fallback) while D-2769 made `list_vanquished` class/Rider headers live on top of it, so class-mode lists mis-order and can repeat the demon header. Verify `node scripts/verify.mjs --fn vanqsort_cmp`. Source: reviews/loop-unattended/1728-66cce8590-list-vanquished.md


- [x] `artifact.c` Mb_hit — coverage PARTIAL (C 179 L `artifact.c:1249–1434` / JS 128 L in js/artifact.js; hops 4, callers 1, RNG 8, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Mb_hit` (reach regression must be 0). Measured `port-coverage.mjs --name Mb_hit` 2026-09-23 @ 22b0e07c3. **Addressed:** D-2771 `385103f98` (STALE-parked: body live js/artifact.js:2608, caller wired js:2846; see Parked Stale).
- [x] `glyphs.c` add_custom_nhcolor_entry — coverage MISSING (C 40 L `glyphs.c:484–528` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: find_matching_customization). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn add_custom_nhcolor_entry` (reach regression must be 0). Measured `port-coverage.mjs --name add_custom_nhcolor_entry` 2026-09-23 @ f2293766c. **Addressed:** D-2771 `385103f98`
- [x] `glyphs.c` wizcustom_glyphids — coverage MISSING (C 13 L `glyphs.c:808–821` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: find_glyphid_in_cache_by_glyphnum, wizcustom_callback). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn wizcustom_glyphids` (reach regression must be 0). Measured `port-coverage.mjs --name wizcustom_glyphids` 2026-09-23 @ d0dce8186. **Addressed:** D-2771 `385103f98`
- [x] `end.c` done_in_by — coverage PARTIAL (C 159 L `end.c:185–344` / JS 119 L in js/end.js; hops 3, callers 6, RNG 0, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn done_in_by` (reach regression must be 0). Measured `port-coverage.mjs --name done_in_by` 2026-09-23 @ 22b0e07c3. **Addressed:** D-2770 `af4f4ca65`


- [x] `insight.c` list_vanquished — coverage PARTIAL (C 165 L `insight.c:2784–2949` / JS 91 L in js/insight.js; hops 4, callers 4, RNG 0, msg 15). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn list_vanquished` (reach regression must be 0). Measured `port-coverage.mjs --name list_vanquished` 2026-09-23 @ 22b0e07c3. **Addressed:** D-2769 `66cce8590`


- [x] `pickup.c` reverse_loot — coverage MISSING (C 76 L `pickup.c:2350–2426` / JS no symbol; hops 6, callers 1, RNG 4, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn reverse_loot` (reach regression must be 0). Measured `port-coverage.mjs --name reverse_loot` 2026-09-23 @ 22b0e07c3. **Addressed:** D-2768 `72249caf4`


- [x] `uhitm.c` mhitm_ad_legs — coverage THIN (C 62 L `uhitm.c:4425–4489` / JS 8 L in js/mhitm.js; hops 4, callers 1, RNG 4, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_legs` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_legs` 2026-09-23 @ 22b0e07c3. **Addressed:** D-2767 `8f6ef128e`


- [x] `wizcmds.c` wiz_smell — coverage MISSING (C 54 L `wizcmds.c:885–939` / JS no symbol; hops —, callers 0, RNG 0, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn wiz_smell` (reach regression must be 0). Measured `port-coverage.mjs --name wiz_smell` 2026-09-23 @ ed9d7b7ad. **Addressed:** D-2766 `40908907f`


- [x] `options.c` optfn_msg_window — coverage MISSING (C 62 L `options.c:2456–2520` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: handler_msg_window). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_msg_window` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_msg_window` 2026-09-23 @ ed9d7b7ad.
- [x] `options.c` handler_paranoid_confirmation — coverage MISSING (C 55 L `options.c:5953–6008` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: cmdname_from_func). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handler_paranoid_confirmation` (reach regression must be 0). Measured `port-coverage.mjs --name handler_paranoid_confirmation` 2026-09-23 @ f2293766c.
- [x] `options.c` optfn_symset — coverage MISSING (C 67 L `options.c:4167–4236` / JS no symbol; hops —, callers 0, RNG 0, msg 1; dead callees: read_sym_file, handler_symset, apply_customizations). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn optfn_symset` (reach regression must be 0). Measured `port-coverage.mjs --name optfn_symset` 2026-09-23 @ f2293766c.
- [x] `options.c` handler_versinfo — coverage MISSING (C 44 L `options.c:6573–6617` / JS no symbol; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handler_versinfo` (reach regression must be 0). Measured `port-coverage.mjs --name handler_versinfo` 2026-09-23 @ f2293766c.
- [x] `options.c` warning_opts — coverage MISSING (C 17 L `options.c:7521–7538` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: string_for_env_opt, assign_warnings). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn warning_opts` (reach regression must be 0). Measured `port-coverage.mjs --name warning_opts` 2026-09-23 @ f2293766c.


- [x] `cfgfiles.c` handle_config_section — coverage MISSING (C 30 L `cfgfiles.c:552–582` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: is_config_section, free_config_sections). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handle_config_section` (reach regression must be 0). Measured `port-coverage.mjs --name handle_config_section` 2026-09-23 @ ed9d7b7ad.


- [x] `coloratt.c` add_menu_coloring — coverage MISSING (C 43 L `coloratt.c:617–660` / JS no symbol; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn add_menu_coloring` (reach regression must be 0). Measured `port-coverage.mjs --name add_menu_coloring` 2026-09-23 @ ed9d7b7ad. **Addressed:** D-2763 `c959009f8`


- [x] `cmd.c` handler_rebind_keys — coverage MISSING (C 38 L `cmd.c:2408–2446` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: count_bind_keys, handler_rebind_keys_add). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handler_rebind_keys` (reach regression must be 0). Measured `port-coverage.mjs --name handler_rebind_keys` 2026-09-23 @ ed9d7b7ad. **Addressed:** D-2762 `9ecb98fe8`


- [x] `pager.c` waterbody_name — coverage PARTIAL (C 50 L `pager.c:561–611` / JS 31 L in js/hack.js; hops 3, callers 14, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn waterbody_name` (reach regression must be 0). Measured `port-coverage.mjs --name waterbody_name` 2026-09-23 @ 6080165a9. **Addressed:** D-2761 `f846d399b`


- [x] `dog.c` dogfood — coverage PARTIAL (C 139 L `dog.c:995–1134` / JS 75 L in js/dogmove.js; hops 3, callers 10, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dogfood` (reach regression must be 0). Measured `port-coverage.mjs --name dogfood` 2026-09-23 @ 6080165a9. **Addressed:** D-2760 `666cb5405`


- [x] `hack.c` lookaround — coverage PARTIAL (C 161 L `hack.c:3898–4059` / JS 110 L in js/cmd.js; hops 2, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lookaround` (reach regression must be 0). Measured `port-coverage.mjs --name lookaround` 2026-09-23 @ 6080165a9. **Addressed:** D-2759 `22b0e07c3`


- [x] `spell.c` getspell — coverage THIN (C 68 L `spell.c:715–783` / JS 21 L in js/spell.js; hops 6, callers 3, RNG 0, msg 3; dead callees: spell_let_to_idx). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn getspell` (reach regression must be 0). Measured `port-coverage.mjs --name getspell` 2026-09-23 @ 14f1ff816. **Addressed:** D-2758 `a93c20957`


- [x] `botl.c` status_hilite_menu_choose_updownboth — coverage MISSING (C 73 L `botl.c:3811–3887` / JS no symbol; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn status_hilite_menu_choose_updownboth` (reach regression must be 0). Measured `port-coverage.mjs --name status_hilite_menu_choose_updownboth` 2026-09-23 @ fca6b4457. **Addressed:** D-2757 `41ea307c3`
- [x] `botl.c` status_hilite_remove — coverage MISSING (C 49 L `botl.c:4305–4354` / JS no symbol; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn status_hilite_remove` (reach regression must be 0). Measured `port-coverage.mjs --name status_hilite_remove` 2026-09-23 @ fca6b4457. **Addressed:** D-2757 `41ea307c3`
- [x] `botl.c` status_hilite_menu — coverage MISSING (C 80 L `botl.c:4498–4578` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: status_hilites_viewall, status_hilite_menu_fld, reset_status_hilites). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn status_hilite_menu` (reach regression must be 0). Measured `port-coverage.mjs --name status_hilite_menu` 2026-09-23 @ 14f1ff816. **Addressed:** D-2757 `41ea307c3`


- [x] `dungeon.c` u_on_newpos steed-share/visibility tail — missing arm: C `dungeon.c:1567–1601` (isok validate + cliparound + uundetected=0 + usteed share + level-change map_location/terrain_typ + see_nearby_objects + earth_sense) absent from js/mklev.js (`u_on_newpos` :508 sets ux/uy only) — thin clone also feeds the mhurtle_step steed arm (caller-side steed sync per the cmd.js pattern) + cmd.js/mklev callers. Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn u_on_newpos` (reach regression must be 0). Brief-verified 2026-09-23 @ 49fb30909 (C + JS bodies read this session). **Addressed:** D-2756 `ed9d7b7ad`


- [x] `lock.c` pick_lock !IS_DOOR DID_NOTHING half — missing arm: C `lock.c:578–593` (`res` stays DID_NOTHING when feel_location changes neither lev->glyph nor mapseen) absent from js/lock.js (pick_lock 1134–1399; always LEARNED, named in the D-log pick_lock whole-body entry + map). Needs a C-side measurement of the exact glyph-id transition that takes the turn with no JS-visible delta (cell-glyph and shown-tuple compares both miss it — port falsified twice, detail in that D-log entry) before porting. Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn pick_lock` (reach regression must be 0). Row queued by the whole-body revert (two-fix rule). **Addressed:** D-2755 `7cd2543a4`


- [x] `mhitm.c` mdamagem touch-petrify head — C `mhitm.c:1032–1055` (`touch_petrifies(pd)` or `AD_DGST`+Medusa, `attk_protection`/wornitems, then `monstone(magr)`) absent from `js/mhitm.js` `mdamagem` (`:4193` starts at `AD_STCK`/`AD_POLY`). D-2742 labeled this site `mhitm.js:1717`, which is `do_stone_mon` (`uhitm.c:3963`). Wire the head. Verify `node scripts/verify.mjs --fn mdamagem`. Source: reviews/loop-unattended/1701-09e6ef90d-monstone-whole-body.md **Addressed:** D-2754 `a4348216d`


- [x] `mon.c` monstone invisible-unmap — C `mon.c:3358` `glyph_is_invisible(levl[x][y].glyph)` (`display.h:773`, `(glyph)==GLYPH_INVISIBLE`) absent as that predicate from `js/mhitm.js` `monstone` (`:3304` calls `glyph_is_invisible(loc)`, `display.js:1366`, which also matches `disp_glyph` and `remembered_glyph.invisible`; D-1774). Use `memory_glyph_is_invisible(loc)` or `glyph_is_invisible_id` on the memory glyph; keep the `x>0` removal. Verify `node scripts/verify.mjs --fn monstone`. Source: reviews/loop-unattended/1701-09e6ef90d-monstone-whole-body.md **Addressed:** D-2753 `4bd644114`


- [x] `uhitm.c` attack_checks pool reveal — C `uhitm.c:289` `Blind || (is_pool && !Underwater)` with `youprop.h:279` `Underwater` ≡ `u.uinwater` absent as that test from `js/uhitm.js` `attack_checks` (`:4247` uses `!game.u.Underwater`, the field `trap.js:3597` records as never written). Use `u.uinwater`. Verify `node scripts/verify.mjs --fn attack_checks`. Source: reviews/loop-unattended/1706-777f948a6-attack-checks-whole-body.md **Addressed:** D-2752 `937267d19`


- [x] `steal.c` nothing_to_steal Blind — C `steal.c:384` `else if (Blind)` (`youprop.h:103` `(HBlinded || EBlinded) && !BBlinded`) absent as that predicate from `js/steal.js` `steal` (`:381` calls file-local `Blind_steal` `:813`, `u.Blind || u.ublind`). `Blind` is already exported from `js/invent.js:359` and `steal.js` already imports `invent.js`. Use `Blind()`. Verify `node scripts/verify.mjs --fn steal`. Source: reviews/loop-unattended/1707-49fb30909-steal-whole-body.md **Addressed:** D-2751 `c5539a510`


- [x] `uhitm.c` mhitm_knockback / `dothrow.c` mhurtle_step — `scen-genesis-Archeologist-91135` PASS at scoreboard `49fb30909` → FAIL screen step 178 (RNG still 6017/6017; owner `mhitm_knockback` `uhitm.c:5357`; both toplines `You knock the chickatrice backward with a powerful strike!`). The only `js/` commit after that stamp is `1b2e6cd12` (`mhurtle_step` `rloc_to` → `remove_monster`/`place_monster` plus petrify arms). Fix the hurtle so this session matches again. Verify `node scripts/verify.mjs --fn mhurtle_step`. Source: reviews/loop-unattended/1708-1b2e6cd12-mhurtle-step-whole-body.md **Addressed:** D-2750 `14f1ff816`


- [x] `dothrow.c` mhurtle_step move/bump arms — missing arm: C `dothrow.c:1003–1019` (remove_monster/place_monster + newsyms, steed u_on_newpos + vision_recalc, set_apparxy, is_waterwall stop) + `:1027–1066` (touch_petrifies both directions, Some_Monnam hero bump, stop_occupation, Upolyd/instapetrify hero-petrify) absent from js/dothrow.js (`mhurtle_step` 3149–3179; rloc_to thin + Monnam bump + wakeup live, rest named-deferred at :3144). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhurtle_step` (reach regression must be 0). Brief-verified 2026-09-21 @ 09e6ef90d (C + JS bodies read this session).

## 2026-09-22

- [x] `steal.c` steal — coverage PARTIAL (C 271 L `steal.c:343–614` / JS 178 L in js/steal.js; hops 3, callers 2, RNG 5, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn steal` (reach regression must be 0). Measured `port-coverage.mjs --name steal` 2026-09-21 @ d44374fc8. **Addressed:** D-2748 `49fb30909`

## 2026-09-21

- [x] `uhitm.c` attack_checks — coverage PARTIAL (C 136 L `uhitm.c:189–327` / JS 63 L in js/uhitm.js; hops 3, callers 9, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn attack_checks` (reach regression must be 0). Measured `port-coverage.mjs --name attack_checks` 2026-09-21 @ e975f7583. **Addressed:** D-2747 `777f948a6`


- [x] `do_wear.c` Boots_off property arms — missing arm: C `do_wear.c:274–306` (SPEED_BOOTS slow-down, WATER_WALKING_BOOTS drown-check + spoteffects, FUMBLE_BOOTS clear, LEVITATION_BOOTS float_down) absent from js/do_wear.js (`Boots_off` 922–945; setworn + ELVEN toggle_stealth live, rest `// deferred` at :940). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Boots_off` (reach regression must be 0). Brief-verified 2026-09-21 @ 289e5ec2c (C + JS bodies read this session). **Addressed:** D-2746 `09c5d65ab`


- [x] `weapon.c` possibly_unwield — coverage THIN (C 48 L `weapon.c:747–795` / JS 21 L in js/weapon.js; hops 3, callers 7, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn possibly_unwield` (reach regression must be 0). Measured `port-coverage.mjs --name possibly_unwield` 2026-09-21 @ e975f7583. **Addressed:** D-2745 `db6e0c3f6` (STALE-parked: body live js/weapon.js:141+164, 6 callers wired).
- [x] `objnam.c` distant_name gameover o_id wipe — missing arm: C `objnam.c:382–383` C `objnam.c:382–383` (`save_oid = obj->o_id; if (program_state.gameover) obj->o_id = 0;`) + `:406` (`obj->o_id = save_oid;` restore) absent from js/objnam.js (`distant_name` 1125–1139; near/far + distantname counter live, wipe named but unwired). JS xname reads o_id for T-shirt/apron/hawaiian/candy text (objnam.js:562–623), so gameover names leak suppressed text. Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn distant_name` (reach regression must be 0). Brief-verified 2026-09-21 @ 289e5ec2c (C + JS bodies read this session). **Addressed:** D-2745 `db6e0c3f6`.


- [x] `lock.c` pick_lock — coverage PARTIAL (C 294 L `lock.c:358–656` / JS 218 L in js/lock.js; hops 4, callers 4, RNG 0, msg 18). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn pick_lock` (reach regression must be 0). Measured `port-coverage.mjs --name pick_lock` 2026-09-21 @ e975f7583. **Addressed:** D-2744 `51018d7f6`


- [x] `objnam.c` safe_qbuf — coverage PARTIAL (C 67 L `objnam.c:5624–5698` / JS 36 L in js/objnam.js; hops 2, callers 25, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn safe_qbuf` (reach regression must be 0). Measured `port-coverage.mjs --name safe_qbuf` 2026-09-21 @ e975f7583. **Addressed:** D-2743 `8eb4bf416`


- [x] `mon.c` monstone — coverage PARTIAL (C 86 L `mon.c:3287–3373` / JS 60 L in js/mhitm.js; hops 3, callers 8, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn monstone` (reach regression must be 0). Measured `port-coverage.mjs --name monstone` 2026-09-21 @ e975f7583. **Addressed:** D-2742 `09e6ef90d`


- [x] doread FORTUNE_COOKIE arm calls the divergent local `useup` clone (`js/read.js:260` — drops C `update_inventory()` + `useupall` `setnotworn`/`freeinv`/`obfree`) while live `useup` is already imported as `useup_live` in the same file: call `useup_live(scroll)`. Source: reviews/loop-unattended/1688-c453b9ca9-outrumor-cookie-caller.md **Addressed:** D-2741 `d44374fc8`


- [x] `apply.c` jump — coverage PARTIAL (C 176 L `apply.c:1988–2164` / JS 85 L in js/apply.js; hops 5, callers 3, RNG 7, msg 23). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn jump` (reach regression must be 0). Measured `port-coverage.mjs --name jump` 2026-09-21 @ e975f7583. **Addressed:** D-2740 `acefaa812`


- [x] `hack.c` moverock_core — coverage PARTIAL (C 290 L `hack.c:348–638` / JS 138 L in js/hack.js; hops 4, callers 1, RNG 1, msg 14; dead callees: rock_disappear_msg). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn moverock_core` (reach regression must be 0). Measured `port-coverage.mjs --name moverock_core` 2026-09-21 @ e975f7583. **Addressed:** D-2739 `289e5ec2c`


- [x] `polyself.c` newman — coverage PARTIAL (C 130 L `polyself.c:336–466` / JS 79 L in js/polyself.js; hops 3, callers 7, RNG 6, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn newman` (reach regression must be 0). Measured `port-coverage.mjs --name newman` 2026-09-21 @ e975f7583. **Addressed:** D-2738 `03aaa7573`.


- [x] `sp_lev.c` lspo_map — coverage MISSING (C 244 L `sp_lev.c:6075–6319` / JS no symbol; hops —, callers 0, RNG 2, msg 0; dead callees: mapfrag_free, l_push_wid_hei_table; split? cited 43× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_map` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_map` 2026-09-21 @ 88cc54b29.
- [x] `sp_lev.c` lspo_replace_terrain — coverage MISSING (C 92 L `sp_lev.c:5051–5143` / JS no symbol; hops —, callers 0, RNG 2, msg 0; dead callees: mapfrag_error, mapfrag_free; split? cited 44× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_replace_terrain` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_replace_terrain` 2026-09-21 @ 88cc54b29.
- [x] `sp_lev.c` lspo_region — coverage MISSING (C 131 L `sp_lev.c:5584–5715` / JS no symbol; hops —, callers 0, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_region` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_region` 2026-09-21 @ 88cc54b29.


- [x] `sp_lev.c` lspo_trap — coverage MISSING (C 73 L `sp_lev.c:4397–4470` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: get_traptype_byname, get_table_traptype_opt). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_trap` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_trap` 2026-09-21 @ 88cc54b29.


- [x] `mon.c` golemeffects — C `mon.c:5680–5707` whole body split-cloned heal-only (`js/mhitm.js:2145` golemeffects_mm + `js/uhitm.js:3336` golemeffects_you); slow arms (flesh FIRE/COLD, iron ELEC via mon_adjust_speed) absent — review 365 named; mhitm cold arm deferred D-2718. Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn golemeffects` (reach regression must be 0). **Addressed:** D-2735 `88cc54b29`


- [x] `mkobj.c` place_object obj_no_longer_held arm — missing arm: C `mkobj.c:2330` obj_no_longer_held(otmp) (Has_contents recursion + CRYSKNIFE costly_alteration/revert, do.c:893–920) absent from js/mkobj.js place_object (named omit in the c-js-map data.md place_object line + the top divergence-log entry; async costly_alteration chain blocks a sync port — 91 sites in 32 files; both bodies read via `brief.mjs place_object` 2026-09-21 @ addccb0a7, no DONE/PARKED/live hit). Port the arm — every callee live or named in the map, every affected caller wired. Verify `node scripts/verify.mjs --fn place_object` (reach regression must be 0). **Addressed:** D-2734 `4a4497a0c`


- [x] `invent.c` learn_unseen_invent — missing arm: C `invent.c:2750–2775` cleric-bknown + archeologist-scroll skip gates, per-item `addinv_core2` and `invupdated`/`update_inventory` tail — C `invent.c:2750–2775` absent from js/invent.js:3176 (Blind gate + dknown-only skip + observe_object only; both bodies read via `brief.mjs learn_unseen_invent` 2026-09-21 @ 6fc07aef5, no DONE/PARKED/live hit). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn learn_unseen_invent` (reach regression must be 0).


- [x] `mkobj.c` place_object — coverage PARTIAL (C 61 L `mkobj.c:2305–2366` / JS 28 L in js/mkobj.js; hops 2, callers 89, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn place_object` (reach regression must be 0). Measured `port-coverage.mjs --name place_object` 2026-09-21 @ 6fc07aef5. **Addressed:** D-2732 `673004346`


- [x] `questpgr.c` com_pager_core — coverage THIN (C 149 L `questpgr.c:468–621` / JS 39 L in js/questpgr.js; hops 3, callers 5, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn com_pager_core` (reach regression must be 0). Measured `port-coverage.mjs --name com_pager_core` 2026-09-21 @ 6fc07aef5. **Addressed:** D-2731 `addccb0a7`


- [x] `uhitm.c` mhitm_ad_fire — coverage THIN (C 100 L `uhitm.c:2521–2623` / JS 41 L in js/mhitm.js; hops 4, callers 1, RNG 1, msg 7). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_fire` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_fire` 2026-09-21 @ 6fc07aef5. **Addressed:** D-2730 `dd14f257f`


- [x] `rumors.c` outrumor — coverage PARTIAL (C 43 L `rumors.c:529–574` / JS 23 L in js/rumors.js; hops 4, callers 5, RNG 3, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn outrumor` (reach regression must be 0). Measured `port-coverage.mjs --name outrumor` 2026-09-21 @ 6fc07aef5.


- [x] `dogmove.c` dog_eat — coverage PARTIAL (C 123 L `dogmove.c:218–345` / JS 75 L in js/dogmove.js; hops 3, callers 4, RNG 0, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dog_eat` (reach regression must be 0). Measured `port-coverage.mjs --name dog_eat` 2026-09-21 @ 6fc07aef5. **Addressed:** D-2728 `d61cfd75f`


- [x] `shknam.c` shkname — coverage THIN (C 41 L `shknam.c:856–897` / JS 15 L in js/shknam.js; hops 3, callers 37, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn shkname` (reach regression must be 0). Measured `port-coverage.mjs --name shkname` 2026-09-21 @ 6fc07aef5. **Addressed:** D-2727 `e381a6676`


- [x] `sp_lev.c` create_object — C `sp_lev.c:2284–2285` recharged + `:2294–2295` tknown + `:2304–2341` invent_carrying_monster/saddle + container-NULL artifact-uncreate + `:2356–2389` Medusa statue fill + `:2391–2420` achievement prizes + `:2428–2437` buried bury_an_obj absent from `js/mklev.js:20203` create_object (128 L vs C 247 L; doc-named omits, both bodies read 2026-09-21). Port the arms in C order. Verify `node scripts/verify.mjs --fn create_object` (reach regression must be 0). **Addressed:** D-2726 `6fc07aef5`


- [x] `allmain.c` welcome remainder — C `allmain.c:856` l_nhcore_call + `:865–874` doomed-restore early return + `:878–880` Hallu + `:920–927` restore tail (hellish_smoke_mesg + print_level_annotation) absent from js/allmain.js:673; `restore.c:948` welcome(FALSE) unwired (no JS caller; `allmain.c:843` wired `js/allmain.js:865`). Port the arms in C order, wire the restore caller. Verify `node scripts/verify.mjs --fn welcome` (reach regression must be 0). **Addressed:** D-2725 `360259cf5`


- [x] `end.c` done_object_cleanup remainder — C `end.c:854` inven_inuse(TRUE) + `:886–890` uchain placebc (`lift_covet_and_placebc`) + `:894–897` perm_invent clear absent from js/end.js:517 local clone (doc-named omissions; thrown/kicked arms live); unexported; `save.c:98` + `save.c:1111` callers unwired (`js/save.js:722` named omit), `end.c:1157` wired `js/end.js:984`. Export + port the arms in C order, wire all three callers. Verify `node scripts/verify.mjs --fn done_object_cleanup` (reach regression must be 0). **Addressed:** D-2724 `1f40ed0e3`


- [x] `dokick.c` dokick — coverage PARTIAL (C 213 L `dokick.c:1257–1470` / JS 141 L in js/dokick.js; hops —, callers 0, RNG 2, msg 15). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dokick` (reach regression must be 0). Measured `port-coverage.mjs --name dokick` 2026-09-21 @ 1204bc94.


- [x] `dog.c` losedogs kops-dismiss head — C `dog.c:310–356` absent from `js/dog.js:1170` losedogs (dismissKops migrating_mons/mydogs scans + `make_happy_shoppers(TRUE)`; remainder live per `brief.mjs losedogs` 2026-09-21, doc-named omission, no DONE/PARKED disposition). Port the head in C order; callers `do.c:1816`→`js/do.js:1952` + `cmd.c:1047`→`js/wizcmds.js:610` already wired. Verify `node scripts/verify.mjs --fn losedogs` (reach regression must be 0). **Addressed:** D-2722 `43540888a`


- [x] `do_wear.c` destroy_arm — blocks 1/553 (scen-poly-Caveman-92202 step 240/265 kind=rng: C draws `rn2(4)=0` in destroy_arm vs JS `rn2(5)=2` from distfleeck(monmove.js:992)). Later owner: the monhp_per_lvl handoff's `verify --fn` moved the same session 197 → 240 this iteration. Fix: the C destroy_arm body in C order. Verify `node scripts/verify.mjs --fn destroy_arm` (recorded owner: expect Caveman → PASS or later owner). Queued from `hidden-proxy queue --limit 30` 2026-09-21 (1 untagged-eligible of 24; rest open/parked/archived). **Addressed:** D-2721 `1204bc94`


- [x] `eat.c` eatfood meal-progress uhs/botl timing lembas pair (D-2425 W2) — blocks 2/553 (scen-wish-Healer-92092 step 59/144 + scen-wish-Tourist-91125 step 83/189, kind=screen: C `Xp:N Satiated` vs JS bare `Xp:N`, toplines identical («hard time getting all of it down»); MEASURED D-2425: C stepFns empty both, RNG fully matched (92092 3078/3078) — deterministic; C flips+paints Satiated at the hard-time turn; JS prefix probe + uhs-scan shows `uhs`=0=SATIATED already after the first bite («delicious») yet paints Satiated a turn late («stop eating» — state converges +1 step); `newuhs` eatfood early-return (`js/eat.js:562–568`) sets `uhs` with no botl). Fix: C-order audit of first-bite lesshungry/newuhs vs botl in the eatfood/maybe_finished_meal path (both live: `js/eat.js:551`/:2101 — ordering, not a missing fn). Verify `node scripts/verify.mjs --fn do_statusline2` (recorded owner: expect both → PASS or later owner). Do not re-port `do_statusline1/2`. See parked `botl.c` do_statusline2 lembas pair (retire on ship if the port confirms the mechanism). **Addressed:** D-2720 `54325651`


- [x] `makemon.c` monhp_per_lvl — blocks 1/553 (scen-poly-Caveman-92202 step 197/265 kind=rng: C draws `rnd(4)=3` in monhp_per_lvl vs JS `rnd(1)=1` from newhp(attrib.js:658)). Same session previously blocked at distfleeck@116 behind the overload gate; now the later owner. Fix: the poly level-up HP writer in C order (C `monhp_per_lvl` vs JS `newhp` path). Verify `node scripts/verify.mjs --fn monhp_per_lvl` (recorded owner: expect Caveman → PASS or later owner). Queued from `hidden-proxy queue --limit 30` 2026-09-21 @12e8b259 (1 untagged-eligible of 23; rest open/parked/archived). **Addressed:** D-2719 `a13b86e4`


- [x] `uhitm.c` mhitm_ad_cold `:2661` (void)-discard Healer (D-2425 W1) **Addressed:** D-2718 `546f6b39` — blocks 1/553 (scen-poly-Healer-92107 step 126/321 kind=screen: C `HP:7(33)` vs JS `HP:2(33)`, toplines identical; MEASURED D-2425: one lich-touch turn spans captures s123–s126 — to-hit `rnd(20)=3` + base `d(3,6)=10` in s123 bucket both sides; destroy-A quan-1 `rnd(4)=3` losehp 22→19; destroy-B quan-3 `rnd(4)=2` losehp 19→17; recorder s126 dump = knockback×2+passiveum+spell-choice identical both sides; instrumented /tmp js/ copy logging mdamageu/losehp callers: JS `mdamageu(10+5=15)`@hitmu after `losehp(2)`@maybe_destroy_item vs C `mdamageu(10+0)` — JS `mhitm_ad_cold_u` (`js/mhitu.js:913`) adds the destroy return that C discards (`(void)`, hero already losehps inside); Δ5 = destroy total 3+2; only adjacent monster = master lich (38,18 vs hero-owlbear 37,17)). Fix: discard the return in `mhitm_ad_cold_u` per C `:2661` (fire_u `:953` already discards; elec_u body deferred, keep). Verify `node scripts/verify.mjs --fn do_statusline2` (recorded owner: expect Healer → PASS or later owner). Do not re-port `do_statusline1/2`; do not touch `mhitm.js` monster-defender arms (destroy deferred, pre-existing). Falsified: destroy-pagination, hidden d(N,1)/d(N,0), knockback FALSE, passiveum tmp=0, no cast, half-phys, permdmg.


- [x] hero overload attack-gate Caveman (D-2420 W6) — blocks 1/553 (scen-poly-Caveman-92202 step 116/265 kind=rng flat#6619: C `rn2(5)=3`@distfleeck vs JS `rn2(20)=18`@gethungry, prev makemon matched; C «You cannot fight while so heavily loaded» + m_lined_up/m_move vs JS hmonas/passive combat «You miss Slasher…»; C step 65 draws; MEASURED D-2420 vs JS probe; BoH-blessed row is the opposite direction — check cursed-bag/container state first). Fix: the inv_weight/capacity attack gate in C order. Verify `node scripts/verify.mjs --fn distfleeck` (recorded owner: expect Caveman → PASS or later owner). Do not re-port `distfleeck` or `inv_weight` beyond the gate. **Addressed:** D-2717 `f72cbdb1`


- [x] `mklev.c` traptype_rnd — coverage PARTIAL (C 60 L `mklev.c:1938–1998` / JS 36 L in js/mklev.js; hops —, callers 0, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn traptype_rnd` (reach regression must be 0). Measured `port-coverage.mjs --name traptype_rnd` 2026-09-21 @ 0b705b5f. **Addressed:** D-2716 `12e8b259`


- [x] `lock.c` autokey — coverage THIN (C 55 L `lock.c:289–344` / JS 17 L in js/lock.js; hops 4, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn autokey` (reach regression must be 0). Measured `port-coverage.mjs --name autokey` 2026-09-21 @ 0b705b5f. **Addressed:** D-2715 `2a3c61e5`


- [x] `doopen_indir` extra rnl Wizard (D-2420 W5) — blocks 1/553 (scen-normal-Wizard-92127 step 101/114 kind=rng flat#3271: C `rn2(5)=3`@distfleeck vs JS `rnl(20)=3`@doopen_indir, prev moveloop_core matched; JS-extra-single-draw proven; C step 18 draws; MEASURED D-2420 vs JS probe). Fix: the open-action RNG gate in C order. Verify `node scripts/verify.mjs --fn distfleeck` (recorded owner: expect Wizard → PASS or later owner). Do not re-port `distfleeck`. **Addressed:** D-2714 `70a4bf39`


- [x] `sp_lev.c` lspo_wall_property — coverage MISSING (C 32 L `sp_lev.c:5876–5908` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: get_table_coords_or_region). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_wall_property` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_wall_property` 2026-09-21 @ ee23c6dc.
- [x] `sp_lev.c` lspo_level_flags — coverage MISSING (C 72 L `sp_lev.c:3759–3831` / JS no symbol; hops —, callers 0, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_level_flags` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_level_flags` 2026-09-21 @ ee23c6dc.
- [x] `sp_lev.c` lspo_engraving — coverage MISSING (C 55 L `sp_lev.c:3881–3936` / JS no symbol; hops —, callers 0, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_engraving` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_engraving` 2026-09-21 @ ee23c6dc.


- [x] `sp_lev.c` lspo_feature — coverage MISSING (C 79 L `sp_lev.c:4844–4923` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: l_table_getset_feature_flag). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_feature` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_feature` 2026-09-21 @ ee23c6dc. **Addressed:** D-2712 `a673b5e4`


- [x] `shk.c` unpaid_cost — coverage PARTIAL (C 43 L `shk.c:3260–3305` / JS 23 L in js/shk.js; hops 4, callers 8, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn unpaid_cost` (reach regression must be 0). Measured `port-coverage.mjs --name unpaid_cost` 2026-09-21 @ c3da9d13. **Addressed:** D-2711 `a8cd211c`


- [x] `sp_lev.c` lspo_drawbridge — coverage MISSING (C 43 L `sp_lev.c:5720–5763` / JS no symbol; hops —, callers 0, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_drawbridge` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_drawbridge` 2026-09-21 @ 6f93ac06.
- [x] `sp_lev.c` lspo_finalize_level — coverage MISSING (C 50 L `sp_lev.c:6014–6064` / JS no symbol; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_finalize_level` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_finalize_level` 2026-09-21 @ c3da9d13.
- [x] `sp_lev.c` lspo_gold — coverage MISSING (C 42 L `sp_lev.c:4480–4522` / JS no symbol; hops —, callers 0, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_gold` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_gold` 2026-09-21 @ c3da9d13.
- [x] `sp_lev.c` lspo_room — coverage MISSING (C 88 L `sp_lev.c:4028–4116` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: spo_endroom). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_room` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_room` 2026-09-21 @ c3da9d13.


- [x] `selvar.c` selection_do_grow — coverage PARTIAL (C 46 L `selvar.c:321–367` / JS 29 L in js/mklev.js; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn selection_do_grow` (reach regression must be 0). Measured `port-coverage.mjs --name selection_do_grow` 2026-09-21 @ 1e6811b7.
- [x] `selvar.c` selection_do_ellipse — coverage MISSING (C 78 L `selvar.c:456–538` / JS no symbol; hops —, callers 0, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn selection_do_ellipse` (reach regression must be 0). Measured `port-coverage.mjs --name selection_do_ellipse` 2026-09-21 @ 29baae20.


- [x] `dbridge.c` create_drawbridge — coverage PARTIAL (C 48 L `dbridge.c:235–283` / JS 29 L in js/mklev.js; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn create_drawbridge` (reach regression must be 0). Measured `port-coverage.mjs --name create_drawbridge` 2026-09-21 @ 2dfc3677. **Addressed:** D-2708 `c3da9d13`


- [x] `u_init.c` skills_for_role — coverage THIN (C 50 L `u_init.c:1040–1090` / JS 16 L in js/u_init.js; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn skills_for_role` (reach regression must be 0). Measured `port-coverage.mjs --name skills_for_role` 2026-09-21 @ 2dfc3677. **Addressed:** D-2707 `6f93ac06`

## 2026-09-20

- [x] `cmd.c` there_cmd_menu_common — coverage MISSING (C 11 L `cmd.c:4639–4654` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: mcmd_addmenu). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn there_cmd_menu_common` (reach regression must be 0). Measured `port-coverage.mjs --name there_cmd_menu_common` 2026-09-21 @ 2dfc3677. **Addressed:** D-2706 `29baae20`


- [x] `dungeon.c` query_annotation — coverage PARTIAL (C 67 L `dungeon.c:2500–2567` / JS 41 L in js/dungeon.js; hops 5, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn query_annotation` (reach regression must be 0). Measured `port-coverage.mjs --name query_annotation` 2026-09-21 @ 2dfc3677. **Addressed:** D-2705 `51e65db7`


- [x] `weapon.c` add_skills_to_menu — coverage PARTIAL (C 73 L `weapon.c:1229–1302` / JS 46 L in js/weapon.js; hops 5, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn add_skills_to_menu` (reach regression must be 0). Measured `port-coverage.mjs --name add_skills_to_menu` 2026-09-21 @ 2dfc3677. **Addressed:** D-2704 `1e6811b7`


- [x] `invent.c` reroll_menu — coverage MISSING (C 64 L `invent.c:2552–2616` / JS no symbol; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn reroll_menu` (reach regression must be 0). Measured `port-coverage.mjs --name reroll_menu` 2026-09-21 @ 2dfc3677.


- [x] `cmd.c` key2extcmddesc — coverage PARTIAL (C 60 L `cmd.c:2561–2621` / JS 36 L in js/pager.js; hops 3, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn key2extcmddesc` (reach regression must be 0). Measured `port-coverage.mjs --name key2extcmddesc` 2026-09-21 @ 3de22e5b. **Addressed:** D-2702 `2dfc3677`


- [x] `sp_lev.c` set_wallprop_in_selection — coverage MISSING (C 21 L `sp_lev.c:5911–5932` / JS no symbol; hops —, callers 2, RNG 0, msg 0; dead callees: selection_clear). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn set_wallprop_in_selection` (reach regression must be 0). Measured `port-coverage.mjs --name set_wallprop_in_selection` 2026-09-21 @ 471b8f58.


- [x] `mondata.c` mstrength — coverage MISSING (C 69 L `mondata.c:428–497` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: mstrength_ranged_attk). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mstrength` (reach regression must be 0). Measured `port-coverage.mjs --name mstrength` 2026-09-21 @ 471b8f58.


- [x] `u_init.c` pauper_reinit — coverage MISSING (C 55 L `u_init.c:870–925` / JS no symbol; hops —, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn pauper_reinit` (reach regression must be 0). Measured `port-coverage.mjs --name pauper_reinit` 2026-09-21 @ 471b8f58. **Addressed:** D-2699 `befd3a1a`


- [x] `cmd.c` domouseaction — coverage MISSING (C 90 L `cmd.c:4916–5006` / JS no symbol; hops —, callers 0, RNG 0, msg 0; dead callees: On_stairs_up, On_stairs_dn). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn domouseaction` (reach regression must be 0). Measured `port-coverage.mjs --name domouseaction` 2026-09-21 @ 3e86b108. **Addressed:** D-2698 `eb298d17`
- [x] `cmd.c` dotoggleoption — coverage MISSING (C 8 L `cmd.c:1376–1384` / JS no symbol; hops —, callers 0, RNG 0, msg 1; dead callees: toggle_bool_option). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dotoggleoption` (reach regression must be 0). Measured `port-coverage.mjs --name dotoggleoption` 2026-09-21 @ 3e86b108. **Addressed:** D-2698 `eb298d17`


- [x] `sp_lev.c` sel_set_door `:4659` orientation missing from remaining coord-form des.door closures — C `sp_lev.c:4659` (`set_door_orientation(x, y)`) absent after the typ write in `js/mklev.js` kniDoor/rogDoor/samDoor×2/heaDoor/heaLocaDoor/touStrtDoor/touLocaDoor/touGoalDoor/ranGoalDoor/monDoor/knoxDoor/barGoalDoor/twDoor×2/astralDoor/tnDoor×3/castleDoor/valleyDoor/asmoDoor/orcusDoor/wiz2Door/sanctDoor (+tower3/medusa-2/val_strt/cav_strt/tut2 inline sites); D-2695 wired 15 of 41, claimed "each". No-epilogue loaders (castle/quests/gehennom/minetn) leave `horizontal` unset where C writes 0/1 (door-glyph path). Fix: same one-liner in C `:4659` position per closure; wall-form create_door sites excluded per C. Verify `node scripts/verify.mjs --fn set_door_orientation` (reach regression must be 0) + full 44 (shared file). Source: reviews/loop-unattended/1654-471b8f58-set-door-orientation-wiring.md.


- [x] `selvar.c` selection_recalc_bounds — coverage THIN (C 66 L `selvar.c:99–165` / JS 19 L in js/mklev.js; hops —, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn selection_recalc_bounds` (reach regression must be 0). Measured `port-coverage.mjs --name selection_recalc_bounds` 2026-09-20 @ bddd66f8. **Addressed:** D-2696 `8ed1abd3`


- [x] `sp_lev.c` set_door_orientation — coverage PARTIAL (C 43 L `sp_lev.c:1042–1085` / JS 27 L in js/mklev.js; hops 4, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn set_door_orientation` (reach regression must be 0). Measured `port-coverage.mjs --name set_door_orientation` 2026-09-20 @ 1c6afce8.


- [x] `u_init.c` ini_inv — coverage PARTIAL (C 65 L `u_init.c:1301–1366` / JS 40 L in js/u_init.js; hops —, callers 36, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn ini_inv` (reach regression must be 0). Measured `port-coverage.mjs --name ini_inv` 2026-09-20 @ 1c6afce8. **Addressed:** D-2694 `3e86b108`


- [x] `spell.c` percent_success — coverage PARTIAL (C 119 L `spell.c:2173–2292` / JS 80 L in js/spell.js; hops 6, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn percent_success` (reach regression must be 0). Measured `port-coverage.mjs --name percent_success` 2026-09-20 @ 40ce1e84. **Addressed:** D-2693 `f913dcee`


- [x] `mon.c` adj_erinys — coverage PARTIAL (C 44 L `mon.c:5922–5966` / JS 29 L in js/monsters.js; hops 4, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn adj_erinys` (reach regression must be 0). Measured `port-coverage.mjs --name adj_erinys` 2026-09-20 @ 40ce1e84. **Addressed:** D-2692 `bddd66f8`


- [x] `explode.c` explosionmask — coverage PARTIAL (C 86 L `explode.c:26–115` / JS 58 L in js/explode.js; hops 4, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn explosionmask` (reach regression must be 0). Measured `port-coverage.mjs --name explosionmask` 2026-09-20 @ 40ce1e84. **Addressed:** D-2691 `597fb4f9`


- [x] `eat.c` edibility_prompts — coverage PARTIAL (C 104 L `eat.c:2627–2731` / JS 70 L in js/eat.js; hops —, callers 1, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn edibility_prompts` (reach regression must be 0). Measured `port-coverage.mjs --name edibility_prompts` 2026-09-20 @ 40ce1e84. **Addressed:** D-2690 `fd3686f4`.


- [x] `trap.c` immune_to_trap — coverage PARTIAL (C 151 L `trap.c:2783–2934` / JS 111 L in js/trap.js; hops 3, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn immune_to_trap` (reach regression must be 0). Measured `port-coverage.mjs --name immune_to_trap` 2026-09-20 @ 40ce1e84. **Addressed:** D-2689 `1c6afce8`


- [x] `nhmd4.c` nhmd4_body — coverage MISSING (C 94 L `nhmd4.c:83–180` / JS no symbol; hops —, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn nhmd4_body` (reach regression must be 0). Measured `port-coverage.mjs --name nhmd4_body` 2026-09-20 @ 92dd436d. **Addressed:** D-2688 `ea9e272a`


- [x] `sounds.c` growl mx==0 wake arm — absent from js/sounds.js:growl: C `sounds.c:421` `wake_nearto(mtmp->mx, mtmp->my, mtmp->data->mlevel * 18)` unconditional inside `if (growl_verb)` vs `js/sounds.js:854-856` `if (mtmp.mx)` guard that skips the wake at mx 0 (verified reading both bodies 2026-09-20; sides: `brief.mjs growl_sound` + `sed -n '400,470p' sounds.c`). Port the C `:404–425` tail in C order. Verify `node scripts/verify.mjs --fn growl` (reach regression must be 0).
- [x] `sounds.c` growl permadeaf Deaf arm — absent from js/sounds.js:growl: C `Deaf` is `HDeaf || EDeaf || u.uroleplay.deaf` (`youprop.h:125`, OPTIONS=permadeaf `optlist.h:268`) vs `js/sounds.js:846` local `Deaf` (`u.Deaf/HDeaf/EDeaf`, no uroleplay read; zero `.Deaf =` writes in `js/`; house idiom `js/hack.js:173` includes `u.uroleplay?.deaf`) — permadeaf hero sees growl plines C suppresses (verified reading both bodies 2026-09-20). Port the C `:404–425` Deaf gate in C order. Verify `node scripts/verify.mjs --fn growl` (reach regression must be 0).


- [x] `pray.c` blocked_boulder — coverage PARTIAL (C 42 L `pray.c:2677–2719` / JS 26 L in js/pray.js; hops 2, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn blocked_boulder` (reach regression must be 0). Measured `port-coverage.mjs --name blocked_boulder` 2026-09-20 @ 14d94914. **Addressed:** D-2686 `fc32ff23`


- [x] `monmove.c` m_balks_at_approaching — coverage PARTIAL (C 42 L `monmove.c:1181–1224` / JS 31 L in js/monmove.js; hops 2, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn m_balks_at_approaching` (reach regression must be 0). Measured `port-coverage.mjs --name m_balks_at_approaching` 2026-09-20 @ 14d94914. **Addressed:** D-2685 `40ce1e84`


- [x] `selvar.c` selection_do_gradient — coverage MISSING (C 47 L `selvar.c:570–622` / JS no symbol; hops —, callers 0, RNG 2, msg 0; dead callees: line_dist_coord). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn selection_do_gradient` (reach regression must be 0). Measured `port-coverage.mjs --name selection_do_gradient` 2026-09-20 @ 14d94914.


- [x] `dungeon.c` fixup_level_locations — coverage PARTIAL (C 60 L `dungeon.c:1122–1182` / JS 34 L in js/dungeon.js; hops 2, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn fixup_level_locations` (reach regression must be 0). Measured `port-coverage.mjs --name fixup_level_locations` 2026-09-20 @ 14d94914. **Addressed:** D-2683 `26e9fbcf`


- [x] `o_init.c` dodiscovered — coverage THIN (C 109 L `o_init.c:764–873` / JS 45 L in js/invent.js; hops —, callers 0, RNG 0, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dodiscovered` (reach regression must be 0). Measured `port-coverage.mjs --name dodiscovered` 2026-09-20 @ 14d94914. **Addressed:** D-2682 `7e004acf`


- [x] `role.c` rigid_role_checks — coverage PARTIAL (C 46 L `role.c:1235–1281` / JS 33 L in js/player_selection.js; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rigid_role_checks` (reach regression must be 0). Measured `port-coverage.mjs --name rigid_role_checks` 2026-09-20 @ 4307ede7. **Addressed:** D-2681 `793d8311`


- [x] `pickup.c` out_container — coverage PARTIAL (C 50 L `pickup.c:2727–2777` / JS 28 L in js/pickup.js; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn out_container` (reach regression must be 0). Measured `port-coverage.mjs --name out_container` 2026-09-20 @ 4307ede7. **Addressed:** D-2680 `ef7739c1`


- [x] `shk.c` corpsenm_price_adj — coverage MISSING (C 41 L `shk.c:4275–4316` / JS no symbol; hops 6, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn corpsenm_price_adj` (reach regression must be 0). Measured `port-coverage.mjs --name corpsenm_price_adj` 2026-09-20 @ 14d94914.


- [x] `uhitm.c` hmon_hitmon_dmg_recalc — coverage PARTIAL (C 71 L `uhitm.c:1436–1507` / JS 32 L in js/uhitm.js; hops 5, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hmon_hitmon_dmg_recalc` (reach regression must be 0). Measured `port-coverage.mjs --name hmon_hitmon_dmg_recalc` 2026-09-20 @ 4307ede7.


- [x] `dogmove.c` find_friends — coverage PARTIAL (C 41 L `dogmove.c:694–735` / JS 27 L in js/dogmove.js; hops 4, callers 1, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn find_friends` (reach regression must be 0). Measured `port-coverage.mjs --name find_friends` 2026-09-20 @ 4307ede7. **Addressed:** D-2677 `c9e4449a`


- [x] `lock.c` chest_shatter_msg — coverage PARTIAL (C 42 L `lock.c:1276–1318` / JS 29 L in js/lock.js; hops —, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn chest_shatter_msg` (reach regression must be 0). Measured `port-coverage.mjs --name chest_shatter_msg` 2026-09-20 @ f0550a81. **Addressed:** D-2676 `6319ffdd`


- [x] `wield.c` doswapweapon — coverage PARTIAL (C 40 L `wield.c:461–501` / JS 29 L in js/wield.js; hops —, callers 2, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn doswapweapon` (reach regression must be 0). Measured `port-coverage.mjs --name doswapweapon` 2026-09-20 @ f0550a81. **Addressed:** D-2675 `d0c80b36`.


- [x] `invent.c` dfeature_at — coverage PARTIAL (C 62 L `invent.c:4037–4099` / JS 45 L in js/invent.js; hops 3, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dfeature_at` (reach regression must be 0). Measured `port-coverage.mjs --name dfeature_at` 2026-09-20 @ f0550a81. **Addressed:** D-2674 `1c867f31`


- [x] `uhitm.c` find_roll_to_hit — coverage PARTIAL (C 57 L `uhitm.c:365–427` / JS 37 L in js/uhitm.js; hops 4, callers 7, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn find_roll_to_hit` (reach regression must be 0). Measured `port-coverage.mjs --name find_roll_to_hit` 2026-09-20 @ f0550a81. **Addressed:** D-2673 `231e4785`


- [x] `role.c` role_selection_prolog — coverage MISSING (C 86 L `role.c:1726–1812` / JS no symbol; hops —, callers 0, RNG 0, msg 10). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn role_selection_prolog` (reach regression must be 0). Measured `port-coverage.mjs --name role_selection_prolog` 2026-09-20 @ f0550a81.


- [x] `sp_lev.c` flip_encoded_dir_bits — coverage MISSING (C 15 L `sp_lev.c:499–514` / JS no symbol; hops 5, callers 2, RNG 0, msg 0; dead callees: swapbits). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn flip_encoded_dir_bits` (reach regression must be 0). Measured `port-coverage.mjs --name flip_encoded_dir_bits` 2026-09-20 @ f0550a81.


- [x] `worm.c` worm_cross — coverage PARTIAL (C 44 L `worm.c:898–942` / JS 22 L in js/worm.js; hops 3, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn worm_cross` (reach regression must be 0). Measured `port-coverage.mjs --name worm_cross` 2026-09-20 @ 4559dcf9. **Addressed:** D-2670 `8f5cd3c6`


- [x] `dig.c` buried_ball — coverage PARTIAL (C 47 L `dig.c:1885–1932` / JS 23 L in js/dig.js; hops 3, callers 5, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn buried_ball` (reach regression must be 0). Measured `port-coverage.mjs --name buried_ball` 2026-09-20 @ 4559dcf9. **Addressed:** D-2669 `f6d363e1`


- [x] `sp_lev.c` get_table_region — coverage MISSING (C 29 L `sp_lev.c:5282–5316` / JS no symbol; hops —, callers 5, RNG 0, msg 0; dead callees: get_table_intarray_entry). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn get_table_region` (reach regression must be 0). Measured `port-coverage.mjs --name get_table_region` 2026-09-20 @ a505c4ce. **Addressed:** D-2668 `f0550a81`
- [x] `sp_lev.c` create_corridor — coverage MISSING (C 54 L `sp_lev.c:2671–2725` / JS no symbol; hops —, callers 2, RNG 0, msg 0; dead callees: search_door). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn create_corridor` (reach regression must be 0). Measured `port-coverage.mjs --name create_corridor` 2026-09-20 @ 4559dcf9. **Addressed:** D-2668 `f0550a81`


- [x] `objnam.c` paydoname — coverage PARTIAL (C 42 L `objnam.c:2313–2355` / JS 26 L in js/objnam.js; hops 6, callers 5, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn paydoname` (reach regression must be 0). Measured `port-coverage.mjs --name paydoname` 2026-09-20 @ a505c4ce. **Addressed:** D-2667 `873be5f1`


- [x] `light.c` write_ls — coverage MISSING (C 68 L `light.c:634–702` / JS no symbol; hops 6, callers 1, RNG 0, msg 0; dead callees: whereis_mon). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn write_ls` (reach regression must be 0). Measured `port-coverage.mjs --name write_ls` 2026-09-20 @ a505c4ce. **Addressed:** D-2666 `0c0acef3`


- [x] `selvar.c` selection_floodfill — coverage PARTIAL (C 54 L `selvar.c:395–452` / JS 32 L in js/mklev.js; hops 4, callers 6, RNG 0, msg 0; dead callees: sel_flood_havepoint). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn selection_floodfill` (reach regression must be 0). Measured `port-coverage.mjs --name selection_floodfill` 2026-09-20 @ a505c4ce. **Addressed:** D-2665 `f0f09e81`


- [x] `artifact.c` invoke_create_portal — coverage PARTIAL (C 64 L `artifact.c:1867–1931` / JS 46 L in js/artifact.js; hops 5, callers 1, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn invoke_create_portal` (reach regression must be 0). Measured `port-coverage.mjs --name invoke_create_portal` 2026-09-20 @ a505c4ce.


- [x] `worn.c` racial_exception — coverage THIN (C 13 L `worn.c:1360–1373` / JS 5 L in js/worn.js; hops 4, callers 3, RNG 0, msg 0; dead callees: raceptr). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn racial_exception` (reach regression must be 0). Measured `port-coverage.mjs --name racial_exception` 2026-09-20 @ 4559dcf9. **Addressed:** D-2663 `18f68dac`


- [x] `spell.c` propagate_chain_lightning — coverage PARTIAL (C 46 L `spell.c:952–1000` / JS 33 L in js/spell.js; hops 6, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn propagate_chain_lightning` (reach regression must be 0). Measured `port-coverage.mjs --name propagate_chain_lightning` 2026-09-20 @ 4559dcf9.


- [x] `mhitu.c` magic_negation intrinsic floor drops the hero-polyform disjunct — C `:1130–1134` applies `mon->data == &mons[PM_ALIGNED_CLERIC] || is_minion(mon->data)` to the hero too (mon == &youmonst, data == polyform); JS `if (is_you) {HProtection-only} else if (aligned||minion)` gives mc 0 where C gives 1 for a hero poly'd into couatl/Aleax (M2_MINION, polyok). Fix: evaluate the aligned/minion disjunct on the hero's form when is_you. Verify `node scripts/verify.mjs --fn magic_negation` (reach regression must be 0). Source: reviews/loop-unattended/1617-2a8be1e7-magic-negation.md.


- [x] `mon.c` mon_give_prop — coverage PARTIAL (C 48 L `mon.c:1726–1774` / JS 31 L in js/mon.js; hops 4, callers 2, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mon_give_prop` (reach regression must be 0). Measured `port-coverage.mjs --name mon_give_prop` 2026-09-20 @ 4559dcf9. **Addressed:** D-2660 `ff9ae02a`


- [x] `dogmove.c` dog_nutrition — coverage PARTIAL (C 58 L `dogmove.c:156–214` / JS 39 L in js/dogmove.js; hops 3, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dog_nutrition` (reach regression must be 0). Measured `port-coverage.mjs --name dog_nutrition` 2026-09-20 @ a9b0ff62. **Addressed:** D-2659 `e34aa845`


- [x] `mhitu.c` magic_negation — coverage MISSING (C 48 L `mhitu.c:1089–1137` / JS no symbol; hops 6, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn magic_negation` (reach regression must be 0). Measured `port-coverage.mjs --name magic_negation` 2026-09-20 @ a9b0ff62. **Addressed:** D-2658 `2a8be1e7`


- [x] `uhitm.c` mhitm_ad_poly — coverage PARTIAL (C 43 L `uhitm.c:3729–3774` / JS 29 L in js/mhitm.js; hops 4, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_poly` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_poly` 2026-09-20 @ a9b0ff62. **Addressed:** D-2657 `8affcbef`


- [x] `dothrow.c` return_throw_to_inv — coverage THIN (C 50 L `dothrow.c:1855–1909` / JS 16 L in js/dothrow.js; hops 3, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn return_throw_to_inv` (reach regression must be 0). Measured `port-coverage.mjs --name return_throw_to_inv` 2026-09-20 @ a9b0ff62. **Addressed:** D-2656 `dccf43f5`


- [x] `mondata.c` same_race — coverage PARTIAL (C 100 L `mondata.c:771–871` / JS 63 L in js/mondata.js; hops 3, callers 5, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn same_race` (reach regression must be 0). Measured `port-coverage.mjs --name same_race` 2026-09-20 @ c2b834cd. **Addressed:** D-2655 `4559dcf9`


- [x] `mkobj.c` check_contained — coverage MISSING (C 42 L `mkobj.c:3374–3416` / JS no symbol; hops 4, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn check_contained` (reach regression must be 0). Measured `port-coverage.mjs --name check_contained` 2026-09-20 @ c2b834cd. **Addressed:** D-2654 `2a7efc6b`


- [x] `date.c` populate_nomakedefs — coverage MISSING (C 79 L `date.c:52–131` / JS no symbol; hops —, callers 2, RNG 0, msg 0; dead callees: case_insensitive_comp, bannerc_string). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn populate_nomakedefs` (reach regression must be 0). Measured `port-coverage.mjs --name populate_nomakedefs` 2026-09-20 @ c2b834cd. **Addressed:** D-2653 `12de9b19`


- [x] `earlyarg.c` scores_only — coverage MISSING (C 35 L `earlyarg.c:406–441` / JS no symbol; hops —, callers 4, RNG 0, msg 0; dead callees: config_error_done, panictrace_setsignals, opt_terminate). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn scores_only` (reach regression must be 0). Measured `port-coverage.mjs --name scores_only` 2026-09-20 @ c2b834cd.


- [x] `options.c` shared_menu_optfn — coverage MISSING (C 21 L `options.c:2052–2074` / JS no symbol; hops —, callers 13, RNG 0, msg 0; dead callees: check_misc_menu_command, spcfn_misc_menu_cmd). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn shared_menu_optfn` (reach regression must be 0). Measured `port-coverage.mjs --name shared_menu_optfn` 2026-09-20 @ d2132aa7. **Addressed:** D-2651 `e3df8cae`


- [x] `topten.c` writexlentry — coverage MISSING (C 51 L `topten.c:340–391` / JS no symbol; hops 4, callers 1, RNG 0, msg 0; dead callees: encodeconduct, encodeachieve, encode_extended_achievements, encode_extended_conducts, timet_to_seconds, encodexlogflags). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn writexlentry` (reach regression must be 0). Measured `port-coverage.mjs --name writexlentry` 2026-09-20 @ d2132aa7. **Addressed:** D-2650 `6f7dcc63`
- [x] `topten.c` encode_extended_achievements — coverage MISSING (C 90 L `topten.c:491–581` / JS no symbol; hops 5, callers 1, RNG 0, msg 0; dead callees: add_achieveX). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn encode_extended_achievements` (reach regression must be 0). Measured `port-coverage.mjs --name encode_extended_achievements` 2026-09-20 @ d2132aa7. **Addressed:** D-2650 `6f7dcc63`


- [x] `botl.c` parse_status_hl2 — coverage MISSING (C 292 L `botl.c:2814–3106` / JS no symbol; hops —, callers 2, RNG 0, msg 0; dead callees: fldname_to_bl_indx, parse_condition, is_fld_arrayvalues, is_ltgt_percentnumber, s_to_anything, has_ltgt_percentnumber, …). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn parse_status_hl2` (reach regression must be 0). Measured `port-coverage.mjs --name parse_status_hl2` 2026-09-20 @ d2132aa7. **Addressed:** D-2649 `85f84b7b`


- [x] `topten.c` readentry — coverage MISSING (C 78 L `topten.c:220–298` / JS no symbol; hops 4, callers 3, RNG 0, msg 0; dead callees: discardexcess). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn readentry` (reach regression must be 0). Measured `port-coverage.mjs --name readentry` 2026-09-20 @ d76b7205. **Addressed:** D-2648 `c2b834cd`


- [x] `pickup.c` query_category — coverage PARTIAL (C 277 L `pickup.c:1226–1508` / JS 198 L in js/pickup.js; hops 4, callers 4, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn query_category` (reach regression must be 0). Measured `port-coverage.mjs --name query_category` 2026-09-20 @ d76b7205. **Addressed:** D-2647 — coverage PARTIAL (C 277 L `pickup.c:1226–1508` / JS 198 L in js/pickup.js; hops 4, callers 4, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn query_category` (reach regression must be 0). Measured `port-coverage.mjs --name query_category` 2026-09-20 @ d76b7205. `b2908a8e`


- [x] `objnam.c` singplur_lookup — coverage MISSING (C 68 L `objnam.c:2708–2779` / JS no symbol; hops 2, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn singplur_lookup` (reach regression must be 0). Measured `port-coverage.mjs --name singplur_lookup` 2026-09-20 @ d76b7205. **Addressed:** D-2646 `d2132aa7`


- [x] `sp_lev.c` lspo_monster — coverage MISSING (C 186 L `sp_lev.c:3214–3400` / JS no symbol; hops —, callers 0, RNG 3, msg 0; dead callees: get_table_montype, get_table_monclass). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lspo_monster` (reach regression must be 0). Measured `port-coverage.mjs --name lspo_monster` 2026-09-20 @ d012b82b.
- [x] `sp_lev.c` create_altar — coverage MISSING (C 40 L `sp_lev.c:2446–2486` / JS no symbol; hops —, callers 1, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn create_altar` (reach regression must be 0). Measured `port-coverage.mjs --name create_altar` 2026-09-20 @ d012b82b.


- [x] `light.c` relink_light_sources — coverage MISSING (C 46 L `light.c:517–563` / JS no symbol; hops 3, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn relink_light_sources` (reach regression must be 0). Measured `port-coverage.mjs --name relink_light_sources` 2026-09-20 @ d012b82b. **Addressed:** D-2644 `c1f00cd4`


- [x] `sp_lev.c` sp_level_coder_init — coverage MISSING (C 40 L `sp_lev.c:6336–6376` / JS no symbol; hops 3, callers 1, RNG 0, msg 0; dead callees: update_croom). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn sp_level_coder_init` (reach regression must be 0). Measured `port-coverage.mjs --name sp_level_coder_init` 2026-09-20 @ d012b82b. **Addressed:** D-2643 `d76b7205`.


- [x] `polyself.c` change_sex — coverage THIN (C 30 L `polyself.c:273–303` / JS 12 L in js/polyself.js; hops 4, callers 3, RNG 0, msg 0; dead callees: max_rank_sz). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn change_sex` (reach regression must be 0). Measured `port-coverage.mjs --name change_sex` 2026-09-20 @ d62c8935. **Addressed:** D-2642 `b582bb36`


- [x] `exper.c` experience — coverage PARTIAL (C 81 L `exper.c:85–166` / JS 46 L in js/exper.js; hops 2, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn experience` (reach regression must be 0). Measured `port-coverage.mjs --name experience` 2026-09-20 @ d62c8935. **Addressed:** D-2641 `4171e6d7`


- [x] `read.c` seffect_destroy_armor — coverage PARTIAL (C 72 L `read.c:1324–1396` / JS 51 L in js/read.js; hops 5, callers 1, RNG 1, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn seffect_destroy_armor` (reach regression must be 0). Measured `port-coverage.mjs --name seffect_destroy_armor` 2026-09-20 @ d62c8935. **Addressed:** D-2640 `01b46bc9`


- [x] `region.c` rest_regions — coverage MISSING (C 93 L `region.c:799–892` / JS no symbol; hops 3, callers 1, RNG 0, msg 0; dead callees: reset_region_mids). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rest_regions` (reach regression must be 0). Measured `port-coverage.mjs --name rest_regions` 2026-09-20 @ d62c8935. **Addressed:** D-2639 `c48fc89f`


- [x] `hack.c` avoid_trap_andor_region — coverage PARTIAL (C 67 L `hack.c:2515–2582` / JS 49 L in js/hack.js; hops 2, callers 1, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn avoid_trap_andor_region` (reach regression must be 0). Measured `port-coverage.mjs --name avoid_trap_andor_region` 2026-09-20 @ d62c8935. **Addressed:** D-2638 `d012b82b`


- [x] `monmove.c` onscary — coverage PARTIAL (C 62 L `monmove.c:241–303` / JS 37 L in js/mon.js; hops 2, callers 20, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn onscary` (reach regression must be 0). Measured `port-coverage.mjs --name onscary` 2026-09-20 @ d62c8935.


- [x] `player_selection.js:875` RS_ROLE loop `i !== f` (module fn, always true) kills `"filter forces role"` vs C `role.c:1840–1844`. Fix: `→ i !== fsel`. Source: reviews/loop-unattended/1592-d62c8935-role-menu-extra.md. **Addressed:** D-2636 `271ceca1`


- [x] `botl.c` cond_menu — coverage MISSING (C 78 L `botl.c:1376–1454` / JS no symbol; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn cond_menu` (reach regression must be 0). Measured `port-coverage.mjs --name cond_menu` 2026-09-20 @ f6b591c3. **Addressed:** D-2635 `fe53547d`


- [x] `muse.c` m_use_undead_turning — coverage THIN (C 40 L `muse.c:1300–1340` / JS 8 L in js/muse.js; hops 2, callers 1, RNG 0, msg 0; dead callees: necrophiliac). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn m_use_undead_turning` (reach regression must be 0). Measured `port-coverage.mjs --name m_use_undead_turning` 2026-09-20 @ f6b591c3. **Addressed:** D-2634 `b358bb84`


- [x] `role.c` role_menu_extra — coverage MISSING (C 144 L `role.c:1816–1960` / JS no symbol; hops —, callers 24, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn role_menu_extra` (reach regression must be 0). Measured `port-coverage.mjs --name role_menu_extra` 2026-09-20 @ f6b591c3. **Addressed:** D-2633 `d62c8935`


- [x] `do_wear.c` inaccessible_equipment — coverage PARTIAL (C 54 L `do_wear.c:3342–3400` / JS 31 L in js/apply.js; hops —, callers 6, RNG 0, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn inaccessible_equipment` (reach regression must be 0). Measured `port-coverage.mjs --name inaccessible_equipment` 2026-09-20 @ a5342d8b. **Addressed:** D-2632 `360933ad`


- [x] `eat.c` consume_oeaten — coverage THIN (C 64 L `eat.c:3808–3872` / JS 15 L in js/eat.js; hops 3, callers 7, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn consume_oeaten` (reach regression must be 0). Measured `port-coverage.mjs --name consume_oeaten` 2026-09-20 @ a5342d8b. **Addressed:** D-2631 `0c7ee796`.


- [x] `dungeon.c` insert_branch — coverage THIN (C 45 L `dungeon.c:463–508` / JS 18 L in js/dungeon.js; hops 2, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn insert_branch` (reach regression must be 0). Measured `port-coverage.mjs --name insert_branch` 2026-09-20 @ a5342d8b. **Addressed:** D-2630 `c2f1d178`


- [x] `end.c` build_english_list — coverage MISSING (C 36 L `end.c:1823–1859` / JS no symbol; hops —, callers 1, RNG 0, msg 3; dead callees: wordcount, bel_copy1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn build_english_list` (reach regression must be 0). Measured `port-coverage.mjs --name build_english_list` 2026-09-20 @ a5342d8b. **Addressed:** D-2629 `95820570`


- [x] `pickup.c` pick_obj — coverage PARTIAL (C 45 L `pickup.c:1897–1942` / JS 24 L in js/pickup.js; hops 3, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn pick_obj` (reach regression must be 0). Measured `port-coverage.mjs --name pick_obj` 2026-09-20 @ 7e80d890.


- [x] `o_init.c` init_objects — coverage PARTIAL (C 84 L `o_init.c:151–235` / JS 39 L in js/o_init.js; hops —, callers 3, RNG 2, msg 0; dead callees: shuffle_tiles). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn init_objects` (reach regression must be 0). Measured `port-coverage.mjs --name init_objects` 2026-09-20 @ 7e80d890. **Addressed:** D-2627 `f6b591c3`


- [x] `invent.c` sortloot_cmp **Addressed:** D-2626 — coverage MISSING (C 144 L `invent.c:403–547` / JS no symbol; hops 4, callers 1, RNG 0, msg 0; dead callees: maybereleaseobuf). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn sortloot_cmp` (reach regression must be 0). Measured `port-coverage.mjs --name sortloot_cmp` 2026-09-20 @ 7e80d890.


- [x] `cmd.c` readchar_core — coverage MISSING (C 59 L `cmd.c:5213–5272` / JS no symbol; hops 3, callers 2, RNG 0, msg 0; dead callees: click_to_cmd). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn readchar_core` (reach regression must be 0). Measured `port-coverage.mjs --name readchar_core` 2026-09-20 @ 7e80d890. **Addressed:** D-2625 `a5342d8b`


- [x] `trap.c` trapeffect_hole — coverage PARTIAL (C 51 L `trap.c:2013–2067` / JS 30 L in js/trap.js; hops 4, callers 2, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn trapeffect_hole` (reach regression must be 0). Measured `port-coverage.mjs --name trapeffect_hole` 2026-09-20 @ c7e7e767. **Addressed:** D-2624 `355a663e`


- [x] `quest.c` chat_with_leader — coverage PARTIAL (C 86 L `quest.c:282–368` / JS 42 L in js/quest.js; hops 3, callers 2, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn chat_with_leader` (reach regression must be 0). Measured `port-coverage.mjs --name chat_with_leader` 2026-09-20 @ c7e7e767. **Addressed:** D-2623 `868f140c`


- [x] `mkobj.c` obj_meld — coverage PARTIAL (C 46 L `mkobj.c:3768–3814` / JS 29 L in js/mkobj.js; hops 4, callers 2, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn obj_meld` (reach regression must be 0). Measured `port-coverage.mjs --name obj_meld` 2026-09-20 @ c7e7e767. **Addressed:** D-2622 `17b44606`


- [x] `invent.c` loot_xname — coverage THIN (C 78 L `invent.c:309–387` / JS 3 L in js/invent.js; hops 5, callers 2, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn loot_xname` (reach regression must be 0). Measured `port-coverage.mjs --name loot_xname` 2026-09-20 @ c7e7e767. **Addressed:** D-2621 `e1a1ff90`


- [x] `cmd.c` act_on_act — coverage MISSING (C 178 L `cmd.c:4658–4838` / JS no symbol; hops —, callers 2, RNG 0, msg 0; dead callees: there_cmd_menu_far, cmdq_add_userinput, cmdq_add_dir). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn act_on_act` (reach regression must be 0). Measured `port-coverage.mjs --name act_on_act` 2026-09-20 @ 28b6f89f. **Addressed:** D-2620 `d0319e92`


- [x] `botl.c` get_hilite — coverage THIN (C 202 L `botl.c:2364–2570` / JS 3 L in js/botl.js; hops 4, callers 2, RNG 0, msg 0; dead callees: noneoftheabove). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn get_hilite` (reach regression must be 0). Measured `port-coverage.mjs --name get_hilite` 2026-09-20 @ 28b6f89f. **Addressed:** D-2619 `84e0e295`


- [x] `invent.c` doorganize_core — coverage PARTIAL (C 218 L `invent.c:5068–5286` / JS 157 L in js/invent.js; hops —, callers 3, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn doorganize_core` (reach regression must be 0). Measured `port-coverage.mjs --name doorganize_core` 2026-09-20 @ 28b6f89f. **Addressed:** D-2618 `7e80d890`


- [x] `pickup.c` carry_count — coverage PARTIAL (C 127 L `pickup.c:1570–1701` / JS 69 L in js/pickup.js; hops 3, callers 2, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn carry_count` (reach regression must be 0). Measured `port-coverage.mjs --name carry_count` 2026-09-20 @ 28b6f89f. **Addressed:** D-2617 `aea3bb71`


- [x] `dbridge.c` e_died — coverage PARTIAL (C 76 L `dbridge.c:402–480` / JS 56 L in js/dbridge.js; hops 4, callers 6, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn e_died` (reach regression must be 0). Measured `port-coverage.mjs --name e_died` 2026-09-20 @ 28b6f89f. **Stale-parked:** body already live `js/dbridge.js:462`, see Parked Stale.
- [x] `invent.c` loot_classify — coverage MISSING (C 156 L `invent.c:149–305` / JS no symbol; hops 5, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn loot_classify` (reach regression must be 0). Measured `port-coverage.mjs --name loot_classify` 2026-09-20 @ 28b6f89f. **Addressed:** D-2616 `c7e7e767`


- [x] `dothrow.c` throw_obj — coverage PARTIAL (C 206 L `dothrow.c:87–293` / JS 134 L in js/dothrow.js; hops —, callers 2, RNG 2, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn throw_obj` (reach regression must be 0). Measured `port-coverage.mjs --name throw_obj` 2026-09-20 @ 28b6f89f.


- [x] `mcastu.c` mcast_spell — coverage PARTIAL **Addressed:** D-2614 (C 96 L `mcastu.c:801–897` / JS 64 L in js/mcastu.js; hops 2, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mcast_spell` (reach regression must be 0). Measured `port-coverage.mjs --name mcast_spell` 2026-09-20 @ 28b6f89f.


- [x] `mhitm.c` fightm — coverage THIN (C 66 L `mhitm.c:106–172` / JS 29 L in js/mhitm.js; hops —, callers 2, RNG 3, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn fightm` (reach regression must be 0). Measured `port-coverage.mjs --name fightm` 2026-09-20 @ dba7a580. **Addressed:** D-2613 `e4f72681`


- [x] `pickup.c` tipcontainer — coverage PARTIAL (C 153 L `pickup.c:3688–3841` / JS 81 L in js/pickup.js; hops —, callers 3, RNG 1, msg 7). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn tipcontainer` (reach regression must be 0). Measured `port-coverage.mjs --name tipcontainer` 2026-09-20 @ 79669e02. **Addressed:** D-2612 `b615180f`


- [x] `mon.c` vamp_stone — coverage PARTIAL (C 64 L `mon.c:3766–3830` / JS 32 L in js/mhitm.js; hops 4, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn vamp_stone` (reach regression must be 0). Measured `port-coverage.mjs --name vamp_stone` 2026-09-20 @ 79669e02. **Addressed:** D-2611 `a51e30dc`


- [x] `insight.c` weapon_insight primary two-weapon compare drops C's leading space **Addressed:** D-2610 — C `insight.c:1355–1369` builds sfx `" limited by ..."` but `js/invent.js:5391–5401` builds `` `limited by ...` `` (two literals), printing `islimited/waslimited by` on both enlightenment builders whenever the primary compare arm is taken (overlay regressed: the deleted inline code had the space). Fix: restore the leading space in both primary sfx literals (secondary arms + enhance esfx already have theirs). Verify `node scripts/verify.mjs --fn weapon_insight` + a two-weapon enlightenment text probe. Fortress breach at this SHA: full `sessions` 43/44, `seed0107-samurai-twoweapon-enhance` screens 97/98 with RNG 2902/2902 (expected `is limited`, JS prints `islimited`; parent dba7a580 was 44/44). Source: reviews/loop-unattended/1568-28b6f89f-weapon-insight.md.


- [x] `insight.c` weapon_insight — coverage MISSING (C 195 L `insight.c:1270–1465` / JS no symbol; hops 6, callers 1, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn weapon_insight` (reach regression must be 0). Measured `port-coverage.mjs --name weapon_insight` 2026-09-20 @ 79669e02. **Addressed:** D-2609 `28b6f89f`


- [x] `display.c` wall_angle — coverage THIN **Addressed:** D-2608 (C 274 L `display.c:3513–3787` / JS 37 L in js/display.js; hops 2, callers 2, RNG 0, msg 0; dead callees: t_warn). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn wall_angle` (reach regression must be 0). Measured `port-coverage.mjs --name wall_angle` 2026-09-20 @ 79669e02.


- [x] `mkobj.c` remove_object — coverage MISSING (C 13 L `mkobj.c:2508–2521` / JS no symbol; hops 3, callers 14, RNG 0, msg 0; dead callees: extract_nexthere). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn remove_object` (reach regression must be 0). Measured `port-coverage.mjs --name remove_object` 2026-09-20 @ 79669e02. **Addressed:** D-2607 `72bfcc06`


- [x] `bones.c` resetobjs — coverage THIN (C 142 L `bones.c:51–193` / JS 52 L in js/bones.js; hops 2, callers 6, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn resetobjs` (reach regression must be 0). Measured `port-coverage.mjs --name resetobjs` 2026-09-20 @ d89bb259. **Addressed:** D-2606 `a1eb50e1`


- [x] `eat.c` floorfood — coverage THIN (C 150 L `eat.c:3579–3731` / JS 6 L in js/eat.js; hops —, callers 4, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn floorfood` (reach regression must be 0). Measured `port-coverage.mjs --name floorfood` 2026-09-20 @ d89bb259. **Addressed:** D-2605 `d46334a6`


- [x] `mondata.c` can_blnd — coverage THIN (C 89 L `mondata.c:305–398` / JS 20 L in js/uhitm.js; hops 3, callers 11, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn can_blnd` (reach regression must be 0). Measured `port-coverage.mjs --name can_blnd` 2026-09-20 @ d89bb259. **Addressed:** D-2604 `ae6f9027`

## 2026-09-19

- [x] `rumors.c` outoracle — coverage PARTIAL (C 53 L `rumors.c:640–693` / JS 31 L in js/rumors.js; hops 4, callers 1, RNG 1, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn outoracle` (reach regression must be 0). Measured `port-coverage.mjs --name outoracle` 2026-09-20 @ d89bb259. **Addressed:** D-2603 `7a1bbc96`


- [x] `insight.c` fmt_elapsed_time — coverage MISSING (C 44 L `insight.c:314–358` / JS no symbol; hops 5, callers 1, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn fmt_elapsed_time` (reach regression must be 0). Measured `port-coverage.mjs --name fmt_elapsed_time` 2026-09-20 @ d89bb259. **Addressed:** D-2602 `6a6edff6`


- [x] `worn.c` update_mon_extrinsics — coverage PARTIAL (C 129 L `worn.c:579–712` / JS 84 L in js/worn.js; hops 3, callers 6, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn update_mon_extrinsics` (reach regression must be 0). Measured `port-coverage.mjs --name update_mon_extrinsics` 2026-09-20 @ d89bb259. **Addressed:** D-2601 `fe944357`


- [x] `objnam.c` readobjnam_postparse3 — coverage MISSING (C 172 L `objnam.c:4727–4899` / JS no symbol; hops 4, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn readobjnam_postparse3` (reach regression must be 0). Measured `port-coverage.mjs --name readobjnam_postparse3` 2026-09-20 @ d89bb259. **Addressed:** D-2600 `79669e02`


- [x] `mail.c` read_simplemail — coverage MISSING (C 91 L `mail.c:589–680` / JS no symbol; hops —, callers 1, RNG 0, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn read_simplemail` (reach regression must be 0). Measured `port-coverage.mjs --name read_simplemail` 2026-09-20 @ d89bb259. **Addressed:** D-2599 `98667b02`


- [x] `mhitm.c` failed_grab — coverage PARTIAL (C 40 L `mhitm.c:597–640` / JS 28 L in js/mhitm.js; hops 2, callers 9, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn failed_grab` (reach regression must be 0). Measured `port-coverage.mjs --name failed_grab` 2026-09-20 @ d89bb259. **Addressed:** D-2598 `6e42a59a`


- [x] `mklev.c` topologize — coverage THIN (C 56 L `mklev.c:1597–1656` / JS 23 L in js/mklev.js; hops 2, callers 8, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn topologize` (reach regression must be 0). Measured `port-coverage.mjs --name topologize` 2026-09-19 @ c0bfe985. **Addressed:** D-2597 `848601a7`


- [x] `pickup.c` in_container — coverage PARTIAL (C 154 L `pickup.c:2558–2712` / JS 85 L in js/pickup.js; hops —, callers 7, RNG 1, msg 10). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn in_container` (reach regression must be 0). Measured `port-coverage.mjs --name in_container` 2026-09-19 @ c0bfe985. **Addressed:** D-2596 `4c7679b9`


- [x] `pickup.c` lift_object — coverage PARTIAL (C 86 L `pickup.c:1705–1795` / JS 47 L in js/pickup.js; hops 3, callers 3, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn lift_object` (reach regression must be 0). Measured `port-coverage.mjs --name lift_object` 2026-09-19 @ c0bfe985. **Addressed:** D-2595 `2cfe062a`


- [x] `apply.c` use_stethoscope — coverage PARTIAL (C 152 L `apply.c:318–470` / JS 102 L in js/apply.js; hops —, callers 1, RNG 2, msg 14; dead callees: init_dummyobj). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn use_stethoscope` (reach regression must be 0). Measured `port-coverage.mjs --name use_stethoscope` 2026-09-19 @ c0bfe985. **Addressed:** D-2594 `86483571`


- [x] `pickup.c` tipcontainer_checks — coverage MISSING (C 98 L `pickup.c:3954–4055` / JS no symbol; hops —, callers 2, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn tipcontainer_checks` (reach regression must be 0). Measured `port-coverage.mjs --name tipcontainer_checks` 2026-09-19 @ 028f5be4.


- [x] `read.c` seffect_light — coverage THIN (C 44 L `read.c:1741–1785` / JS 18 L in js/read.js; hops 5, callers 1, RNG 1, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn seffect_light` (reach regression must be 0). Measured `port-coverage.mjs --name seffect_light` 2026-09-19 @ 028f5be4. **Addressed:** D-2592 `d27e5a6a`


- [x] `shk.c` shk_fixes_damage — coverage MISSING (C 21 L `shk.c:4556–4577` / JS no symbol; hops 3, callers 1, RNG 0, msg 2; dead callees: find_damage). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn shk_fixes_damage` (reach regression must be 0). Measured `port-coverage.mjs --name shk_fixes_damage` 2026-09-19 @ 028f5be4. **Addressed:** D-2591 `0a3136de`


- [x] `attrib.c` exerchk — coverage PARTIAL (C 79 L `attrib.c:598–677` / JS 55 L in js/allmain.js; hops 2, callers 1, RNG 2, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn exerchk` (reach regression must be 0). Measured `port-coverage.mjs --name exerchk` 2026-09-19 @ d57c144b.


- [x] `uhitm.c` mhitm_ad_rust — coverage MISSING (C 52 L `uhitm.c:2281–2335` / JS no symbol; hops 4, callers 1, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_rust` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_rust` 2026-09-19 @ d57c144b. **Addressed:** D-2589 `8c2867e4`
- [x] `uhitm.c` hitum_cleave — coverage MISSING (C 78 L `uhitm.c:651–731` / JS no symbol; hops 4, callers 1, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hitum_cleave` (reach regression must be 0). Measured `port-coverage.mjs --name hitum_cleave` 2026-09-19 @ 028f5be4. **Addressed:** D-2589 `8c2867e4`


- [x] `invent.c` freeinv_core — coverage THIN (C 43 L `invent.c:1356–1399` / JS 8 L in js/invent.js; hops 3, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn freeinv_core` (reach regression must be 0). Measured `port-coverage.mjs --name freeinv_core` 2026-09-19 @ d57c144b. **Addressed:** D-2588 `8c4c1b1f`


- [x] `uhitm.c` mhitm_ad_tlpt — coverage THIN (C 94 L `uhitm.c:2859–2955` / JS 28 L in js/mhitm.js; hops 4, callers 1, RNG 0, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_tlpt` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_tlpt` 2026-09-19 @ d57c144b. **Addressed:** D-2587 `028f5be4`


- [x] `mkmaze.c` pick_vibrasquare_location — coverage PARTIAL (C 51 L `mkmaze.c:1042–1093` / JS 30 L in js/mklev.js; hops 2, callers 2, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn pick_vibrasquare_location` (reach regression must be 0). Measured `port-coverage.mjs --name pick_vibrasquare_location` 2026-09-19 @ 09224e39. **Addressed:** D-2586 `32dc9380`
- [x] `mkmaze.c` stolen_booty — coverage PARTIAL (C 90 L `mkmaze.c:799–889` / JS 49 L in js/mklev.js; hops 3, callers 1, RNG 10, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn stolen_booty` (reach regression must be 0). Measured `port-coverage.mjs --name stolen_booty` 2026-09-19 @ 09224e39. **Addressed:** D-2586 `32dc9380`


- [x] `topten.c` topten — coverage PARTIAL (C 298 L `topten.c:628–926` / JS 165 L in js/topten.js; hops 3, callers 4, RNG 0, msg 0; dead callees: unlock_file, writexlentry). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn topten` (reach regression must be 0). Measured `port-coverage.mjs --name topten` 2026-09-19 @ 09224e39. **Addressed:** D-2585 `ef4f1c76`


- [x] `objnam.c` Master-Key wish regression (D-2577) — regressed 2/553 (scen-wish-Priest-92163 step 234/320 + scen-wish-Rogue-92221 step 92/107 kind=rng, owner next_ident mkobj.c:521: C `You are blasted by the key named the Master Key of Thievery's power!` vs JS `Nothing fitting that description exists in the game.`; both PASS on js@a90eb521, FAIL on js@1ff074ca — worktree-bisected; readobjnam-only revert does not fix). Fix: wish `cursed the Master Key of Thievery` now matches Monk rank title `Master` at the :1230 corpse block (mntmp 336, C-agreed) but the truncated bp never reaches `artifact_name` → `touch_artifact` blast; repair the postparse1→postparse3 wish flow (actualn/dn vs truncation, C `:4431–4435` + `:4872–4878`), not the matcher. Verify `node scripts/hidden-proxy.mjs score --ids scen-wish-Priest-92163,scen-wish-Rogue-92221` → both PASS on the fix. Source: reviews/loop-unattended/1536-1ff074ca-name-to-monplus.md. **Addressed:** D-2584 `c50782ea`


- [x] `light.c` del_light_source rehumanize regression (D-2574) — regressed 1/553 (scen-poly-Rogue-92026 step 164/266 kind=screen: C `It hits! You return to human form! You can see again.` vs JS `It hits! del_light_source: not found type=2, id=...`; PASS on js@bb229073 3094/3094 RNG, FAIL on js@8d3ce13a — worktree-bisected; per-SHA reach missed it: del_light_source draws no RNG so the session kept a stale PASS). Fix: the youmonst LS_MONSTER entry missing from light_base at rehumanize (polyself.c:1395) — attach it per C (new_light_source path or stale-identity scan miss), never silence the `:135–137` arm. Verify `node scripts/hidden-proxy.mjs score --ids scen-poly-Rogue-92026` → PASS on the fix. Source: reviews/loop-unattended/1533-8d3ce13a-del-light-source.md. **Addressed:** D-2583 `5a8a1f73`


- [x] `files.c` read_tribute — coverage PARTIAL (C 169 L `files.c:3474–3645` / JS 122 L in js/files.js; hops 4, callers 2, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn read_tribute` (reach regression must be 0). Measured `port-coverage.mjs --name read_tribute` 2026-09-19 @ 09224e39.


- [x] `read.c` seffect_enchant_armor — coverage PARTIAL (C 175 L `read.c:1115–1290` / JS 118 L in js/read.js; hops 5, callers 1, RNG 4, msg 7). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn seffect_enchant_armor` (reach regression must be 0). Measured `port-coverage.mjs --name seffect_enchant_armor` 2026-09-19 @ d56627bd.
- [x] `read.c` wand_explode — coverage THIN (C 43 L `read.c:2414–2457` / JS 19 L in js/read.js; hops 5, callers 3, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn wand_explode` (reach regression must be 0). Measured `port-coverage.mjs --name wand_explode` 2026-09-19 @ 09224e39.


- [x] `files.c` make_converted_name — coverage MISSING (C 63 L `files.c:2090–2153` / JS no symbol; hops 4, callers 1, RNG 0, msg 1; dead callees: contains_directory, c_eos). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn make_converted_name` (reach regression must be 0). Measured `port-coverage.mjs --name make_converted_name` 2026-09-19 @ d56627bd. **Addressed:** D-2580 `86020ad6`


- [x] `insight.c` basics_enlightenment — coverage MISSING (C 95 L `insight.c:728–823` / JS no symbol; hops 5, callers 1, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn basics_enlightenment` (reach regression must be 0). Measured `port-coverage.mjs --name basics_enlightenment` 2026-09-19 @ d56627bd. **Addressed:** D-2579 `c5d8dfce`


- [x] `mkobj.c` weight — coverage PARTIAL (C 88 L `mkobj.c:1888–1976` / JS 48 L in js/mkobj.js; hops 2, callers 104, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn weight` (reach regression must be 0). Measured `port-coverage.mjs --name weight` 2026-09-19 @ d56627bd. **Addressed:** D-2578 `09224e39`


- [x] `mondata.c` name_to_monplus — coverage THIN (C 189 L `mondata.c:893–1085` / JS 83 L in js/mondata.js; hops 2, callers 3, RNG 0, msg 0; dead callees: title_to_mon). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn name_to_monplus` (reach regression must be 0). Measured `port-coverage.mjs --name name_to_monplus` 2026-09-19 @ d56627bd. **Addressed:** D-2577 `1ff074ca`


- [x] `pickup.c` do_loot_cont — coverage PARTIAL (C 71 L `pickup.c:2088–2162` / JS 32 L in js/pickup.js; hops 5, callers 3, RNG 1, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn do_loot_cont` (reach regression must be 0). Measured `port-coverage.mjs --name do_loot_cont` 2026-09-19 @ f18ac024. **Addressed:** D-2576 `a90eb521`


- [x] `uhitm.c` mhitm_ad_sedu — coverage PARTIAL (C 123 L `uhitm.c:4623–4748` / JS 60 L in js/mhitu.js; hops 4, callers 4, RNG 1, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_sedu` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_sedu` 2026-09-19 @ f18ac024. **Addressed:** D-2575 `e4cd69b0`


- [x] `light.c` del_light_source — coverage THIN (C 39 L `light.c:99–138` / JS 9 L in js/light.js; hops 2, callers 14, RNG 0, msg 0; dead callees: delete_ls). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn del_light_source` (reach regression must be 0). Measured `port-coverage.mjs --name del_light_source` 2026-09-19 @ f18ac024. **Addressed:** D-2574 `8d3ce13a`


- [x] `pline.c` raw_printf — coverage MISSING (C 9 L `pline.c:549–558` / JS no symbol; hops 3, callers 76, RNG 0, msg 0; dead callees: vraw_printf). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn raw_printf` (reach regression must be 0). Measured `port-coverage.mjs --name raw_printf` 2026-09-19 @ f18ac024. **Addressed:** D-2573 `d56627bd`


- [x] `dungeon.c` level_difficulty — coverage THIN (C 57 L `dungeon.c:2027–2084` / JS 16 L in js/fountain.js; hops 2, callers 29, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn level_difficulty` (reach regression must be 0). Measured `port-coverage.mjs --name level_difficulty` 2026-09-19 @ 30fd2ce7. **Addressed:** D-2572 `77f5c448`


- [x] `zap.c` create_polymon — coverage MISSING (C 87 L `zap.c:1546–1633` / JS no symbol; hops 5, callers 1, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn create_polymon` (reach regression must be 0). Measured `port-coverage.mjs --name create_polymon` 2026-09-19 @ 30fd2ce7. **Addressed:** D-2571 `e84600e8`


- [x] `shknam.c` shkinit — coverage PARTIAL (C 64 L `shknam.c:628–692` / JS 45 L in js/shknam.js; hops 3, callers 1, RNG 3, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn shkinit` (reach regression must be 0). Measured `port-coverage.mjs --name shkinit` 2026-09-19 @ 30fd2ce7. **Addressed:** D-2570 `f18ac024`


- [x] `mkroom.c` mkshop — coverage THIN (C 121 L `mkroom.c:95–216` / JS 44 L in js/mklev.js; hops 2, callers 1, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mkshop` (reach regression must be 0). Measured `port-coverage.mjs --name mkshop` 2026-09-19 @ 30fd2ce7. **Addressed:** D-2569 `eee66204`


- [x] `objnam.c` readobjnam_postparse2 — coverage MISSING (C 58 L `objnam.c:4666–4724` / JS no symbol; hops 4, callers 1, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn readobjnam_postparse2` (reach regression must be 0). Measured `port-coverage.mjs --name readobjnam_postparse2` 2026-09-19 @ 30fd2ce7. **Addressed:** D-2568 `549891fb`


- [x] `engrave.c` make_engr_at — coverage PARTIAL (C 44 L `engrave.c:408–457` / JS 23 L in js/engrave.js; hops 2, callers 8, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn make_engr_at` (reach regression must be 0). Measured `port-coverage.mjs --name make_engr_at` 2026-09-19 @ 90ae7d1d. **Addressed:** D-2567 `eb5f9f62`


- [x] `options.js` OPT_NEGATEOK_NO missing `travel_debug` (review 1520 QUALITY-RISK) — C `optlist.h:794–796` non-DEBUG arm has negateok `No` (64 negateok-No rows under the contest-linux `cc -E` set); JS `OPT_NEGATEOK_NO` lists 63. Fix: add `'travel_debug'` + a negated-`travel_debug` bad-negation case in `scripts/parseoptions.test.mjs`. Source: reviews/loop-unattended/1520-1832a9e7-parseoptions.md.


- [x] `pager.js` strip_newline splice-vs-truncate (review 1517 QUALITY-RISK) **Addressed:** D-2565 `318ca3cd` — C `hacklib.c:180–190` truncates at the last `'\n'` (`*p = '\0'`, tail dropped); JS `js/pager.js` `strip_newline` splices the newline out (`slice(0,end) + slice(i+1)`, tail kept): `"a\nb"` → C `"a"`, JS `"ab"`. Fix: return `str.slice(0, end)`; extend coverage with an interior-newline case. Source: reviews/loop-unattended/1517-90ae7d1d-doextversion.md.


- [x] `insight.c` show_achievements — coverage MISSING (C 159 L `insight.c:2243–2403` / JS no symbol; hops 5, callers 1, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn show_achievements` (reach regression must be 0). Measured `port-coverage.mjs --name show_achievements` 2026-09-19 @ 90ae7d1d.
- [x] `insight.c` background_enlightenment — coverage MISSING (C 254 L `insight.c:468–722` / JS no symbol; hops 5, callers 1, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn background_enlightenment` (reach regression must be 0). Measured `port-coverage.mjs --name background_enlightenment` 2026-09-19 @ 30fd2ce7.


- [x] `weapon.c` select_rwep — coverage THIN (C 143 L `weapon.c:533–676` / JS 50 L in js/weapon.js; hops 1, callers 4, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn select_rwep` (reach regression must be 0). Measured `port-coverage.mjs --name select_rwep` 2026-09-19 @ 90ae7d1d. **Addressed:** D-2563 `fe99f208`


- [x] `dog.c` mon_catchup_elapsed_time — coverage PARTIAL (C 95 L `dog.c:627–724` / JS 50 L in js/dog.js; hops 3, callers 3, RNG 4, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mon_catchup_elapsed_time` (reach regression must be 0). Measured `port-coverage.mjs --name mon_catchup_elapsed_time` 2026-09-19 @ 90ae7d1d. **Addressed:** D-2562 `30fd2ce7`


- [x] `options.c` parseoptions — coverage MISSING (C 199 L `options.c:489–691` / JS no symbol; hops —, callers 11, RNG 0, msg 0; dead callees: length_without_val, determine_ambiguities, match_optname, duplicate_opt_detection, complain_about_duplicate, string_for_opt, …). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn parseoptions` (reach regression must be 0). Measured `port-coverage.mjs --name parseoptions` 2026-09-19 @ c90a495f. **Addressed:** D-2561 `1832a9e7`


- [x] `shk.c` shk_move — coverage PARTIAL (C 113 L `shk.c:4880–4993` / JS 81 L in js/shk.js; hops 2, callers 1, RNG 1, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn shk_move` (reach regression must be 0). Measured `port-coverage.mjs --name shk_move` 2026-09-19 @ c90a495f. **Addressed:** D-2560 `c9038a65`


- [x] `mklev.c` dosdoor — coverage PARTIAL (C 61 L `mklev.c:615–676` / JS 42 L in js/mklev.js; hops 3, callers 3, RNG 7, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dosdoor` (reach regression must be 0). Measured `port-coverage.mjs --name dosdoor` 2026-09-19 @ c90a495f. **Addressed:** D-2559 `da30a4b6`


- [x] `version.c` doextversion — coverage THIN (C 108 L `version.c:169–277` / JS 10 L in js/pager.js; hops —, callers 2, RNG 0, msg 6; dead callees: strip_newline, insert_rtoption). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn doextversion` (reach regression must be 0). Measured `port-coverage.mjs --name doextversion` 2026-09-19 @ c90a495f. **Addressed:** D-2558 `90ae7d1d`


- [x] `spell.c` deadbook — coverage MISSING (C 108 L `spell.c:231–339` / JS no symbol; hops —, callers 1, RNG 3, msg 9). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn deadbook` (reach regression must be 0). Measured `port-coverage.mjs --name deadbook` 2026-09-19 @ e07bd9bc. **Addressed:** D-2557 `ef8921fe`


- [x] `rumors.c` rumor_check — coverage MISSING (C 106 L `rumors.c:196–302` / JS no symbol; hops —, callers 1, RNG 0, msg 8; dead callees: couldnt_open_file). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rumor_check` (reach regression must be 0). Measured `port-coverage.mjs --name rumor_check` 2026-09-19 @ e07bd9bc. **Addressed:** D-2556 `a689a335`


- [x] `files.c` create_levelfile — coverage MISSING (C 49 L `files.c:621–670` / JS no symbol; hops 4, callers 3, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn create_levelfile` (reach regression must be 0). Measured `port-coverage.mjs --name create_levelfile` 2026-09-19 @ e07bd9bc. **Addressed:** D-2555 `bdd6846f`


- [x] `do_wear.c` Helmet_off — coverage THIN (C 46 L `do_wear.c:518–564` / JS 9 L in js/do_wear.js; hops 3, callers 6, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Helmet_off` (reach regression must be 0). Measured `port-coverage.mjs --name Helmet_off` 2026-09-19 @ e07bd9bc. **Addressed:** D-2554 `22c8d3f1`


- [x] `cfgfiles.c` do_write_config_file [campaign 7/7] — C `cfgfiles.c:165–211` absent from js/ (no #saveoptions command; sole caller of the [campaign 1/7] parent). Port in C order incl. paranoid_query gate; persist via storage.js VFS (Rule #2, no fopen). Final activation of the parent family. Verify `node scripts/verify.mjs --fn do_write_config_file` (reach regression must be 0). **Addressed:** D-2553 `c90a495f`


- [x] `botl.c` all_options_statushilites [campaign 6/7] — C `botl.c:4477–4495` absent from js/ (no hilite gather/done store; named omit of the [campaign 1/7] parent, STATUS_HILITES on per config.h:616). Port status_hilite_linestr gather/done + all_options_statushilites in C order. Verify `node scripts/verify.mjs --fn all_options_statushilites` (reach regression must be 0). **Addressed:** D-2552 `ac266d5e`


- [x] `symbols.c` parsesymbols producer [campaign 5/7] — C `symbols.c:773–848` absent from js/ (savedSymbols registry + savedsym_strbuf live in the [campaign 1/7] parent, always empty). Port parsesymbols in C order + wire cfgfiles `:1193`/`:1204` + options `:663` callers. Verify `node scripts/verify.mjs --fn parsesymbols` (reach regression must be 0). **Addressed:** D-2551 `3ca7a5b8`


- [x] `cmd.c` get_changed_key_binds [campaign 4/7] — C `cmd.c:2235–2287` absent from js/ (Cmd_bind userbind-delta shape differs from dokeylist map; named omit of the [campaign 1/7] parent, unconditional call there). Port in C order incl. sbuf-null display arm or name it. Verify `node scripts/verify.mjs --fn get_changed_key_binds` (reach regression must be 0). **Addressed:** D-2550 `70089ac6`


- [x] `options.c` all_options_conds [campaign 3/7] — C `options.c:9556–9591` absent from js/options.js (no opt_next_cond/cond store; named omit of the [campaign 1/7] parent, guarded by opt_set_in_config[215] — unix OPTCOUNT is 217, the 248 count is the cross-platform textual superset). Port opt_next_cond + all_options_conds in C order. Verify `node scripts/verify.mjs --fn all_options_conds` (reach regression must be 0). **Addressed:** D-2549 `c9884cd8`


- [x] `options.c` get_option_value + allopt registry [campaign 2/7] — C `options.c:8481–8505` absent from js/options.js (no allopt[]/opt_set_in_config[] table; named omit of the all_options_strbuf [campaign 1/7] parent shipped this iteration). Port optlist.h NHOPT_PARSE table (OPTCOUNT 248, entry shape in the parent D-log entry) + get_option_value in C order; activates the parent BoolOpt/CompOpt loop (opt_set_in_config writes at `:640`/`:5010`/`:8438` come with config parsing — name or wire). Verify `node scripts/verify.mjs --fn get_option_value` (reach regression must be 0).


- [x] `options.c` all_options_strbuf BoolOpt/CompOpt loop `break`→`continue` (D-2544 follow-up) — C `options.c:9691–9721` arms use switch-`break` (skip entry, next iteration); JS `js/options.js` all_options_strbuf uses loop-`break` (aborts the whole loop at the first obsolete/non-config entry once [2/7] fills allopt → silent config truncation). Fix: two `break`→`continue`. Verify `node scripts/verify.mjs --fn all_options_strbuf` (reach regression must be 0). Source: reviews/loop-unattended/1503-f01391aa-all-options-strbuf.md.


- [x] `polyself.c` polyman — coverage PARTIAL (C 68 L `polyself.c:200–268` / JS 41 L in js/polyself.js; hops 2, callers 3, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn polyman` (reach regression must be 0). Measured `port-coverage.mjs --name polyman` 2026-09-19 @ 1c1e08cc. **Addressed:** D-2546 `e07bd9bc`


- [x] `objnam.c` readobjnam_preparse — coverage MISSING (C 209 L `objnam.c:3966–4175` / JS no symbol; hops 4, callers 1, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn readobjnam_preparse` (reach regression must be 0). Measured `port-coverage.mjs --name readobjnam_preparse` 2026-09-19 @ 1c1e08cc. **Addressed:** D-2545 `23cb328e`


- [x] `options.c` all_options_strbuf — coverage MISSING (C 70 L `options.c:9678–9748` / JS no symbol; hops —, callers 2, RNG 0, msg 1; dead callees: strbuf_append, get_option_value, all_options_conds, all_options_palette, get_changed_key_binds, all_options_menucolors, …). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn all_options_strbuf` (reach regression must be 0). Measured `port-coverage.mjs --name all_options_strbuf` 2026-09-19 @ 1c1e08cc. **Addressed:** D-2544 ([campaign 1/7] shipped; follow-ups queued below).


- [x] `rumors.c` init_CapMons — coverage THIN (C 106 L `rumors.c:829–935` / JS 32 L in js/objnam.js; hops 3, callers 1, RNG 0, msg 2; dead callees: free_CapMons). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn init_CapMons` (reach regression must be 0). Measured `port-coverage.mjs --name init_CapMons` 2026-09-19 @ 1c1e08cc. **Addressed:** D-2543 `8b02a9f1`


- [x] `uhitm.c` mhitm_ad_elec — coverage MISSING (C 53 L `uhitm.c:2684–2739` / JS no symbol; hops 4, callers 1, RNG 1, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_elec` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_elec` 2026-09-19 @ 1c1e08cc. **Addressed:** D-2542 `3bd853d7`


- [x] `uhitm.c` mhitm_ad_ston — coverage THIN (C 57 L `uhitm.c:4203–4262` / JS 5 L in js/mhitm.js; hops 4, callers 1, RNG 2, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_ston` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_ston` 2026-09-19 @ 1bfac98a.


- [x] `uhitm.c` mhitm_ad_blnd — coverage THIN (C 50 L `uhitm.c:2958–3012` / JS 18 L in js/mhitm.js; hops 4, callers 2, RNG 1, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_blnd` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_blnd` 2026-09-19 @ 1bfac98a. **Addressed:** D-2540 `c5b28b45`


- [x] `uhitm.c` mhitm_ad_slim — coverage THIN (C 72 L `uhitm.c:3526–3600` / JS 22 L in js/mhitm.js; hops 4, callers 1, RNG 2, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_slim` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_slim` 2026-09-19 @ 1bfac98a. **Addressed:** D-2539 (STALE — parked, split bodies complete; see Parked Stale).
- [x] `version.c` check_version — coverage MISSING (C 45 L `version.c:374–423` / JS no symbol; hops 4, callers 1, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn check_version` (reach regression must be 0). Measured `port-coverage.mjs --name check_version` 2026-09-19 @ 1bfac98a. **Addressed:** D-2539 `625932f0`
- [x] `version.c` uptodate — coverage MISSING (C 33 L `version.c:713–746` / JS no symbol; hops 3, callers 1, RNG 1, msg 0; dead callees: compare_critical_bytes, check_version). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn uptodate` (reach regression must be 0). Measured `port-coverage.mjs --name uptodate` 2026-09-19 @ 1bfac98a. **Addressed:** D-2539 `625932f0`


- [x] `files.c` set_savefile_name — coverage THIN (C 103 L `files.c:1020–1123` / JS 4 L in js/save.js; hops 5, callers 7, RNG 0, msg 4; dead callees: fname_encode). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn set_savefile_name` (reach regression must be 0). Measured `port-coverage.mjs --name set_savefile_name` 2026-09-19 @ ca74dad2. **Addressed:** D-2538 `1c1e08cc`.


- [x] `mthrowu.c` thrwmu — coverage THIN (C 90 L `mthrowu.c:1174–1264` / JS 11 L in js/mthrowu.js; hops 2, callers 1, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn thrwmu` (reach regression must be 0). Measured `port-coverage.mjs --name thrwmu` 2026-09-19 @ ca74dad2. **Addressed:** D-2537 `29318908`


- [x] `dig.c` draft_message — coverage THIN (C 40 L `dig.c:1504–1544` / JS 5 L in js/dig.js; hops 5, callers 3, RNG 2, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn draft_message` (reach regression must be 0). Measured `port-coverage.mjs --name draft_message` 2026-09-19 @ ca74dad2. **Addressed:** D-2536 `0e4e2b9b`


- [x] `mdlib.c` build_options — coverage MISSING (C 161 L `mdlib.c:669–830` / JS no symbol; hops —, callers 1, RNG 0, msg 4; dead callees: build_savebones_compat_string, datamodel, opt_out_words, count_and_validate_winopts, count_and_validate_soundlibopts). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn build_options` (reach regression must be 0). Measured `port-coverage.mjs --name build_options` 2026-09-19 @ ca74dad2. **Addressed:** D-2535 `f152ba19`


- [x] `getpos.c` getpos_menu — coverage MISSING (C 60 L `getpos.c:665–725` / JS no symbol; hops 2, callers 2, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn getpos_menu` (reach regression must be 0). Measured `port-coverage.mjs --name getpos_menu` 2026-09-19 @ ca74dad2. **Addressed:** D-2534 `1bfac98a`


- [x] `invent.c` merged — coverage THIN (C 134 L `invent.c:814–948` / JS 40 L in js/mkobj.js; hops 3, callers 13, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn merged` (reach regression must be 0). Measured `port-coverage.mjs --name merged` 2026-09-19 @ ca74dad2. **Addressed:** D-2533 `32ba8af0`


- [x] `trap.c` dofiretrap — coverage PARTIAL (C 80 L `trap.c:4233–4314` / JS 53 L in js/trap.js; hops 5, callers 3, RNG 7, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dofiretrap` (reach regression must be 0). Measured `port-coverage.mjs --name dofiretrap` 2026-09-19 @ 95d26622. **Addressed:** D-2532 `9406729d`


- [x] `dothrow.c` breakobj — coverage PARTIAL (C 90 L `dothrow.c:2480–2574` / JS 66 L in js/dothrow.js; hops 3, callers 9, RNG 1, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn breakobj` (reach regression must be 0). Measured `port-coverage.mjs --name breakobj` 2026-09-19 @ 95d26622. **Addressed:** D-2531 `ecdbec66`


- [x] `wizcmds.c` misc_stats — coverage MISSING (C 113 L `wizcmds.c:1284–1399` / JS no symbol; hops —, callers 1, RNG 0, msg 9; dead callees: engr_stats, light_stats, timer_stats, region_stats). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn misc_stats` (reach regression must be 0). Measured `port-coverage.mjs --name misc_stats` 2026-09-19 @ 95d26622.


- [x] `do_wear.c` Amulet_off — coverage PARTIAL (C 99 L `do_wear.c:1090–1189` / JS 54 L in js/do_wear.js; hops 3, callers 4, RNG 0, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Amulet_off` (reach regression must be 0). Measured `port-coverage.mjs --name Amulet_off` 2026-09-19 @ 95d26622.


- [x] `options.c` show_menu_controls — coverage MISSING (C 104 L `options.c:9070–9174` / JS no symbol; hops —, callers 2, RNG 0, msg 19; dead callees: get_menu_cmd_key). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn show_menu_controls` (reach regression must be 0). Measured `port-coverage.mjs --name show_menu_controls` 2026-09-19 @ 95d26622.


- [x] `do.c` dosinkring — coverage MISSING (C 163 L `do.c:498–661` / JS no symbol; hops —, callers 1, RNG 2, msg 10; dead callees: teleport_sink). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dosinkring` (reach regression must be 0). Measured `port-coverage.mjs --name dosinkring` 2026-09-19 @ 95d26622. **Addressed:** D-2527 `ac4246db`.


- [x] `exper.c` losexp — coverage PARTIAL (C 83 L `exper.c:207–291` / JS 62 L in js/exper.js; hops 4, callers 8, RNG 0, msg 3; dead callees: fuzzer_savelife). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn losexp` (reach regression must be 0). Measured `port-coverage.mjs --name losexp` 2026-09-19 @ 7b5fbce5. **Addressed:** D-2526 `dec0bcad`


- [x] `objnam.c` vtense — coverage THIN (C 90 L `objnam.c:2563–2653` / JS 27 L in js/objnam.js; hops 2, callers 87, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn vtense` (reach regression must be 0). Measured `port-coverage.mjs --name vtense` 2026-09-19 @ 7b5fbce5. **Addressed:** D-2525 `d9247324`


- [x] `sounds.c` dochat — coverage PARTIAL (C 152 L `sounds.c:1257–1409` / JS 72 L in js/sounds.js; hops 4, callers 2, RNG 1, msg 12; dead callees: shop_object). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dochat` (reach regression must be 0). Measured `port-coverage.mjs --name dochat` 2026-09-19 @ 7b5fbce5.


- [x] `do.c` canletgo — coverage PARTIAL (C 46 L `do.c:665–711` / JS 33 L in js/do.js; hops 2, callers 13, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn canletgo` (reach regression must be 0). Measured `port-coverage.mjs --name canletgo` 2026-09-19 @ 7b5fbce5. **Addressed:** D-2523 `4cc8a6c0`


- [x] `sounds.c` tiphat — coverage MISSING (C 110 L `sounds.c:1427–1537` / JS no symbol; hops —, callers 1, RNG 4, msg 11; dead callees: responsive_mon_at). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn tiphat` (reach regression must be 0). Measured `port-coverage.mjs --name tiphat` 2026-09-19 @ 7b5fbce5. **Addressed:** D-2522 `f3923d8e`


- [x] `pager.c` look_engrs — coverage PARTIAL (C 84 L `pager.c:2144–2228` / JS 59 L in js/pager.js; hops 1, callers 2, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn look_engrs` (reach regression must be 0). Measured `port-coverage.mjs --name look_engrs` 2026-09-19 @ ab1ae274. **Addressed:** D-2521 `8d4ef240`


- [x] `mkobj.c` insane_object — coverage MISSING (C 21 L `mkobj.c:3314–3339` / JS no symbol; hops 3, callers 29, RNG 0, msg 1; dead callees: where_name). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn insane_object` (reach regression must be 0). Measured `port-coverage.mjs --name insane_object` 2026-09-19 @ ab1ae274. **Addressed:** D-2520 `95d26622`


- [x] `mklev.c` makerooms — coverage THIN (C 69 L `mklev.c:367–436` / JS 30 L in js/mklev.js; hops 1, callers 2, RNG 1, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn makerooms` (reach regression must be 0). Measured `port-coverage.mjs --name makerooms` 2026-09-19 @ ab1ae274. **Addressed:** D-2519 `31bd0727`


- [x] `uhitm.c` mhitm_ad_drli — coverage THIN **Addressed:** D-2518 (C 71 L `uhitm.c:2445–2518` / JS 22 L in js/mhitm.js; hops 4, callers 2, RNG 5, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_drli` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_drli` 2026-09-19 @ ab1ae274.


- [x] `dothrow.c` gem_accept — coverage MISSING (C 73 L `dothrow.c:2309–2382` / JS no symbol; hops 5, callers 1, RNG 3, msg 10). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn gem_accept` (reach regression must be 0). Measured `port-coverage.mjs --name gem_accept` 2026-09-19 @ ab1ae274. **Addressed:** D-2517 `7b5fbce5`


- [x] `wizcmds.c` wiz_map_levltyp — coverage MISSING (C 142 L `wizcmds.c:693–835` / JS no symbol; hops —, callers 2, RNG 0, msg 36). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn wiz_map_levltyp` (reach regression must be 0). Measured `port-coverage.mjs --name wiz_map_levltyp` 2026-09-19 @ a263d08e. **Addressed:** D-2516 `aa0ca8b2`
- [x] `wizcmds.c` wiz_levltyp_legend #terrain legend Valkyrie — blocks 1/553 (scen-tour-Valkyrie-92162 step 129 kind=screen: C «#terrain encodings:» vs JS «»; untagged owner in `hidden-proxy queue`, eligible as-is). Fix: port the owning C arm in wiz_levltyp_legend (brief wiz_levltyp_legend first; never read seed/step/coords into logic). Verify `node scripts/verify.mjs --fn wiz_levltyp_legend` (expect Valkyrie-92162 → PASS or later owner). **Addressed:** D-2516 `aa0ca8b2`


- [x] `botl.c` bot_via_windowport — coverage MISSING (C 317 L `botl.c:962–1279` / JS no symbol; hops 1, callers 1, RNG 0, msg 0; dead callees: botl_score, weapon_status, armor_status). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn bot_via_windowport` (reach regression must be 0). Measured `port-coverage.mjs --name bot_via_windowport` 2026-09-19 @ a263d08e. **Addressed:** D-2515 `32a1691b`


- [x] `restore.c` restmon — coverage MISSING (C 66 L `restore.c:307–373` / JS no symbol; hops 4, callers 3, RNG 1, msg 0; dead callees: newmextra, new_mgivenname, newebones). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn restmon` (reach regression must be 0). Measured `port-coverage.mjs --name restmon` 2026-09-19 @ a263d08e. **Addressed:** D-2514 `02a067fe`


- [x] `rumors.c` getrumor — coverage THIN (C 71 L `rumors.c:117–191` / JS 21 L in js/rumors.js; hops 3, callers 4, RNG 1, msg 0; dead callees: init_rumors, couldnt_open_file). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn getrumor` (reach regression must be 0). Measured `port-coverage.mjs --name getrumor` 2026-09-19 @ a263d08e. **Addressed:** D-2513 `ab1ae274`


- [x] `options.c` menu-colors C-wrong trio in `js/options.js` — empty-menu exit returns 1, C `options.c:9227–9231` returns 3 (`a_int++` precedes the skip); list suffix `"PAT"\\=color`, C `:6466–6477` renders `"PAT"\"=color`; PICK_ANY finish-empty returns, C `:6495` re-loops. Port the three C lines in C order. Verify `node scripts/verify.mjs --fn handler_menu_colors` (reach regression must be 0). Source: reviews/loop-unattended/1465-e27f24bf-handler-menu-colors.md. **Addressed:** D-2512 `3322beff`.


- [x] `uhitm.c` mhitm_ad_heal — coverage THIN (C 87 L `uhitm.c:4296–4385` / JS 4 L in js/mhitm.js; hops 4, callers 1, RNG 11, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_heal` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_heal` 2026-09-19 @ e131537d. **Addressed:** D-2511 `fc62ea8a`
- [x] `uhitm.c` mhitm_ad_acid — coverage MISSING (C 42 L `uhitm.c:2742–2786` / JS no symbol; hops 4, callers 1, RNG 3, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_acid` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_acid` 2026-09-19 @ a263d08e. **Addressed:** D-2511 `fc62ea8a`


- [x] `hack.c` domove_swap_with_pet — coverage PARTIAL (C 125 L `hack.c:2098–2225` / JS 83 L in js/hack.js; hops 2, callers 1, RNG 1, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn domove_swap_with_pet` (reach regression must be 0). Measured `port-coverage.mjs --name domove_swap_with_pet` 2026-09-19 @ e131537d. **Addressed:** D-2510 `9d045456`


- [x] `insight.c` record_achievement — coverage PARTIAL (C 65 L `insight.c:2407–2472` / JS 45 L in js/insight.js; hops 2, callers 32, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn record_achievement` (reach regression must be 0). Measured `port-coverage.mjs --name record_achievement` 2026-09-19 @ e131537d. **Addressed:** D-2509 `a263d08e`


- [x] `pager.c` look_all — coverage PARTIAL (C 93 L `pager.c:1979–2074` / JS 59 L in js/pager.js; hops 1, callers 4, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn look_all` (reach regression must be 0). Measured `port-coverage.mjs --name look_all` 2026-09-19 @ e131537d. **Addressed:** D-2508 `a5b15a53`


- [x] `mthrowu.c` ohitmon — coverage PARTIAL (C 175 L `mthrowu.c:321–502` / JS 102 L in js/mthrowu.js; hops 4, callers 4, RNG 4, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn ohitmon` (reach regression must be 0). Measured `port-coverage.mjs --name ohitmon` 2026-09-19 @ e131537d. **Addressed:** D-2507 `e8a1702e`


- [x] `options.c` handler_menu_colors — coverage MISSING (C 92 L `options.c:6407–6499` / JS no symbol; hops —, callers 1, RNG 0, msg 4; dead callees: count_menucolors, handle_add_list_remove, test_regex_pattern, query_color, query_attr, add_menu_coloring_parsed, …). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn handler_menu_colors` (reach regression must be 0). Measured `port-coverage.mjs --name handler_menu_colors` 2026-09-19 @ e131537d. **Addressed:** D-2506 `e27f24bf`


- [x] `do_wear.c` Amulet_on — coverage PARTIAL (C 124 L `do_wear.c:963–1087` / JS 59 L in js/do_wear.js; hops 3, callers 4, RNG 1, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn Amulet_on` (reach regression must be 0). Measured `port-coverage.mjs --name Amulet_on` 2026-09-19 @ e131537d. **Addressed:** D-2505 `a66b03ae`


- [x] `teleport.c` rloc_to_core — coverage MISSING (C 120 L `teleport.c:1645–1768` / JS no symbol; hops 2, callers 4, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rloc_to_core` (reach regression must be 0). Measured `port-coverage.mjs --name rloc_to_core` 2026-09-19 @ 4131ec6e. **Addressed:** D-2504 `52eaabd8`


- [x] `muse.c` precheck — coverage PARTIAL (C 101 L `muse.c:59–160` / JS 62 L in js/muse.js; hops 2, callers 3, RNG 5, msg 10). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn precheck` (reach regression must be 0). Measured `port-coverage.mjs --name precheck` 2026-09-19 @ e0c364ed. **Addressed:** D-2503 `e131537d`


- [x] `trap.c` trapeffect_web — coverage THIN (C 167 L `trap.c:2106–2276` / JS 65 L in js/trap.js; hops 4, callers 1, RNG 6, msg 7). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn trapeffect_web` (reach regression must be 0). Measured `port-coverage.mjs --name trapeffect_web` 2026-09-19 @ e0c364ed. **Addressed:** D-2502 `31ee9a50`


- [x] `mkmaze.c` movebubbles — coverage PARTIAL (C 146 L `mkmaze.c:1539–1685` / JS 80 L in js/mklev.js; hops 2, callers 3, RNG 3, msg 0; dead callees: lift_covet_and_placebc). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn movebubbles` (reach regression must be 0). Measured `port-coverage.mjs --name movebubbles` 2026-09-19 @ e0c364ed. **Addressed:** D-2501 `e600e6c5`


- [x] `read.c` recharge — coverage PARTIAL (C 279 L `read.c:729–1008` / JS 190 L in js/read.js; hops 4, callers 3, RNG 17, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn recharge` (reach regression must be 0). Measured `port-coverage.mjs --name recharge` 2026-09-19 @ d6cf97e2. **Addressed:** D-2500 `4131ec6e`


- [x] `mon.c` m_consume_obj — coverage THIN (C 61 L `mon.c:1392–1453` / JS 16 L in js/mon.js; hops 2, callers 6, RNG 1, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn m_consume_obj` (reach regression must be 0). Measured `port-coverage.mjs --name m_consume_obj` 2026-09-19 @ d6cf97e2. **Addressed:** D-2499 `62a8e932`

## 2026-09-18

- [x] `botl.c` evaluate_and_notify_windowport — coverage MISSING (C 57 L `botl.c:1621–1680` / JS no symbol; hops 2, callers 1, RNG 0, msg 0; dead callees: eval_notify_windowport_field). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn evaluate_and_notify_windowport` (reach regression must be 0). Measured `port-coverage.mjs --name evaluate_and_notify_windowport` 2026-09-19 @ d6cf97e2. **Addressed:** D-2498 `e0c364ed`


- [x] `objnam.c` doname_base — coverage MISSING (C 526 L `objnam.c:1223–1751` / JS no symbol; hops 3, callers 4, RNG 0, msg 16; dead callees: sitoa; split? cited 39× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn doname_base` (reach regression must be 0). Measured `port-coverage.mjs --name doname_base` 2026-09-19 @ d6cf97e2. **Addressed:** D-2497 `2a0c6559`


- [x] `steal.c` mpickobj — coverage THIN (C 67 L `steal.c:618–685` / JS 9 L in js/makemon.js; hops 2, callers 46, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mpickobj` (reach regression must be 0). Measured `port-coverage.mjs --name mpickobj` 2026-09-18 @ 6b72742e. **Addressed:** D-2496 `d6cf97e2`


- [x] `cmd.c` help_dir — coverage PARTIAL (C 122 L `cmd.c:4171–4296` / JS 64 L in js/lock.js; hops 1, callers 2, RNG 0, msg 20). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn help_dir` (reach regression must be 0). Measured `port-coverage.mjs --name help_dir` 2026-09-18 @ 6b72742e. **Addressed:** D-2495 `c6909a83`


- [x] `mon.c` setmangry — coverage PARTIAL (C 53 L `mon.c:4265–4318` / JS 28 L in js/mon.js; hops 2, callers 18, RNG 1, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn setmangry` (reach regression must be 0). Measured `port-coverage.mjs --name setmangry` 2026-09-18 @ 6b72742e. **Addressed:** D-2494 `12fef55e`


- [x] `display.c` see_monsters — coverage PARTIAL (C 42 L `display.c:1487–1529` / JS 26 L in js/display.js; hops 1, callers 39, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn see_monsters` (reach regression must be 0). Measured `port-coverage.mjs --name see_monsters` 2026-09-18 @ 6b72742e. **Addressed:** D-2493 `aad9f117`
- [x] `display.c` flush_screen — coverage PARTIAL (C 59 L `display.c:2208–2267` / JS 35 L in js/display.js; hops 1, callers 36, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn flush_screen` (reach regression must be 0). Measured `port-coverage.mjs --name flush_screen` 2026-09-18 @ 6b72742e. **Addressed:** D-2493 `aad9f117`


- [x] `mkmaze.c` makemaz — coverage PARTIAL (C 96 L `mkmaze.c:1127–1223` / JS 51 L in js/mklev.js; hops 1, callers 5, RNG 6, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn makemaz` (reach regression must be 0). Measured `port-coverage.mjs --name makemaz` 2026-09-18 @ 6b72742e. **Addressed:** D-2492 `f43f2ae7`


- [x] `objnam.c` corpse_xname — coverage PARTIAL (C 93 L `objnam.c:1824–1920` / JS 66 L in js/objnam.js; hops 2, callers 26, RNG 0, msg 4; dead callees: releaseobuf). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn corpse_xname` (reach regression must be 0). Measured `port-coverage.mjs --name corpse_xname` 2026-09-18 @ 6b72742e. **Addressed:** D-2491 `1f5ce2fe`


- [x] `uhitm.c` mhitm_ad_legs — coverage MISSING (C 62 L `uhitm.c:4425–4489` / JS no symbol; hops 4, callers 1, RNG 4, msg 6). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_legs` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_legs` 2026-09-18 @ f8881130. **Addressed:** D-2490 `86faaeed`


- [x] `ball.c` bc_sanity_check — coverage MISSING (C 68 L `ball.c:1034–1102` / JS no symbol; hops 2, callers 1, RNG 2, msg 0; dead callees: safe_typename). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn bc_sanity_check` (reach regression must be 0). Measured `port-coverage.mjs --name bc_sanity_check` 2026-09-18 @ f8881130. **Addressed:** D-2489 `655fdad6`


- [x] `dogmove.c` quickmimic — coverage MISSING (C 69 L `dogmove.c:1472–1541` / JS no symbol; hops 3, callers 1, RNG 1, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn quickmimic` (reach regression must be 0). Measured `port-coverage.mjs --name quickmimic` 2026-09-18 @ f8881130. **Addressed:** D-2488 `c46e4014`


- [x] `glyphs.c` parse_id — coverage MISSING (C 336 L `glyphs.c:824–1162` / JS no symbol; hops —, callers 3, RNG 0, msg 15; dead callees: find_glyph_in_cache, fix_glyphname, add_glyph_to_cache). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn parse_id` (reach regression must be 0). Measured `port-coverage.mjs --name parse_id` 2026-09-18 @ f8881130. **Addressed:** D-2487 `db42061d`


- [x] `uhitm.c` hmon_hitmon_misc_obj — coverage MISSING (C 261 L `uhitm.c:1119–1383` / JS no symbol; hops 6, callers 1, RNG 8, msg 12). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn hmon_hitmon_misc_obj` (reach regression must be 0). Measured `port-coverage.mjs --name hmon_hitmon_misc_obj` 2026-09-18 @ f8881130. **Addressed:** D-2486 `3a3a69fb`


- [x] `mon.js` sanity_check_single_mon missing `has_egd` import — `ReferenceError` when a vault guard (`isgd`) is checked (used `js/mon.js:477`, live export `js/const.js:3141`, never imported; latent until `mon_sanity_check` ships). Fix: add `has_egd` to the const.js import in `js/mon.js`. Verify `node scripts/verify.mjs --fn sanity_check_single_mon`. Source: reviews/loop-unattended/1438-30195dcb-sanity-check.md. **Addressed:** D-2485 `d58ca60a`


- [x] `zap.c` wishcmdassist — coverage MISSING (C 54 L `zap.c:6165–6219` / JS no symbol; hops 3, callers 2, RNG 0, msg 7). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn wishcmdassist` (reach regression must be 0). Measured `port-coverage.mjs --name wishcmdassist` 2026-09-18 @ f8881130. **Addressed:** D-2484 `6b72742e`


- [x] `objnam.c` xname_flags — coverage MISSING (C 446 L `objnam.c:581–1029` / JS no symbol; hops 3, callers 2, RNG 0, msg 17; dead callees: releaseobuf; split? cited 29× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn xname_flags` (reach regression must be 0). Measured `port-coverage.mjs --name xname_flags` 2026-09-18 @ f8881130. **Addressed:** D-2483 `c4e28dcc`


- [x] `uhitm.c` mhitm_ad_heal — coverage MISSING (C 87 L `uhitm.c:4296–4385` / JS no symbol; hops 4, callers 1, RNG 11, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_heal` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_heal` 2026-09-18 @ 34ef28ed.


- [x] `role.c` role_init — coverage MISSING (C 137 L `role.c:1980–2117` / JS no symbol; hops 3, callers 5, RNG 2, msg 0; dead callees: randrole_filtered, randrace, randalign; split? cited 23× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn role_init` (reach regression must be 0). Measured `port-coverage.mjs --name role_init` 2026-09-18 @ 34ef28ed. **Addressed:** D-2481 `01b3e393`


- [x] `cmd.c` randomkey — coverage MISSING (C 61 L `cmd.c:3517–3578` / JS no symbol; hops 3, callers 3, RNG 11, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn randomkey` (reach regression must be 0). Measured `port-coverage.mjs --name randomkey` 2026-09-18 @ 34ef28ed. **Addressed:** D-2480 `1d36d74a`


- [x] `mon.c` sanity_check_single_mon — coverage MISSING **Addressed:** D-2479 (C 179 L `mon.c:73–255` / JS no symbol; hops 3, callers 2, RNG 2, msg 0; dead callees: pet_sanity_check, levltyp_to_name). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn sanity_check_single_mon` (reach regression must be 0). Measured `port-coverage.mjs --name sanity_check_single_mon` 2026-09-18 @ 34ef28ed.


- [x] `mail.c` newmail — coverage MISSING (C 57 L `mail.c:399–456` / JS no symbol; hops 3, callers 1, RNG 0, msg 4; dead callees: md_start, md_stop, md_rush). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn newmail` (reach regression must be 0). Measured `port-coverage.mjs --name newmail` 2026-09-18 @ 838c6b6e. **Addressed:** D-2478 `67ecc58a`


- [x] nobj-chain walk over array-model `game.invent` (D-2470 follow-up) — `js/trap.js:5169` hero carried-artifact scan in `trapeffect_anti_magic` (`for (otmp = game.invent; …; otmp = otmp.nobj)`) runs once against the array itself, so the carried non-quest `defends(AD_MAGM)` `rnd(4)` never fires (C draws it; `js/invent.js:369`: invent is an array, minvent stays chains). Same dead pattern at `js/trap.js:1721` (`trap_immune` RUST_TRAP hero walk) — co-fix. Fix: swap both to the `(game.invent || [])` array idiom used at 10 other trap.js sites. Verify with a carried-MR-artifact anti-magic probe (RNG draw present) + gates. Source: reviews/loop-unattended/1429-3d84b5d4-trapeffect-anti-magic.md. **Addressed:** D-2477 `1ba77343`


- [x] `vpline` re-scan of verbatim-text call sites (D-2471 follow-up) — `js/engrave.js` read-back interpolates runtime engraving text into single-arg `pline` (C `engrave.c:396` passes it as a `%s` arg; engraving `%s` now prints empty, `%d` → `0`, `%%` → `%`). Same family: `js/rumors.js` outrumor `pline(line)` (C `pline1` = verbatim macro `hack.h:1026`), `js/pager.js` `pline(outH.s)`, `zap.js You(rest)` pre-format + re-scan for its 7 importers. Fix: route each through the `%s` arm (verbalize/impossible precedent in D-2471); merge the duplicate `zap.js:859 You` into `display.js:7441`. Verify with a `%s`-engraving read-back probe + full 44 + `hidden-proxy score` (message-text class: reach is vacuous). Source: reviews/loop-unattended/1430-01c936c3-vpline-rescan.md.


- [x] `topten.c` prscore — coverage MISSING (C 159 L `topten.c:1194–1353` / JS no symbol; hops —, callers 5, RNG 0, msg 7; dead callees: fopen_datafile, score_wanted, free_dungeons, free_ttlist). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn prscore` (reach regression must be 0). Measured `port-coverage.mjs --name prscore` 2026-09-18 @ 838c6b6e. **Addressed:** D-2475 `f8881130`


- [x] `priest.c` ghod_hitsu — coverage MISSING **Addressed:** D-2474 (C 78 L `priest.c:796–874` / JS no symbol; hops 3, callers 2, RNG 2, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn ghod_hitsu` (reach regression must be 0). Measured `port-coverage.mjs --name ghod_hitsu` 2026-09-18 @ 838c6b6e.


- [x] `artifact.c` retouch_object — coverage THIN (C 81 L `artifact.c:2508–2591` / JS 9 L in js/artifact.js; hops 3, callers 7, RNG 2, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn retouch_object` (reach regression must be 0). Measured `port-coverage.mjs --name retouch_object` 2026-09-18 @ 838c6b6e. **Addressed:** D-2473 `34ef28ed`


- [x] `files.c` open_levelfile — coverage MISSING (C 43 L `files.c:673–716` / JS no symbol; hops 3, callers 6, RNG 1, msg 0; dead callees: set_levelfile_name, new_nhfile, viable_nhfile). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn open_levelfile` (reach regression must be 0). Measured `port-coverage.mjs --name open_levelfile` 2026-09-18 @ 838c6b6e. **Addressed:** D-2472 `467d4280`


- [x] `pline.c` vpline — coverage MISSING (C 138 L `pline.c:153–291` / JS no symbol; hops 2, callers 16, RNG 0, msg 3; split? cited 26× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn vpline` (reach regression must be 0). Measured `port-coverage.mjs --name vpline` 2026-09-18 @ 78b9ec99. **Addressed:** D-2471 `01c936c3`


- [x] `trap.c` trapeffect_anti_magic — coverage MISSING (C 124 L `trap.c:2323–2450` / JS no symbol; hops 4, callers 1, RNG 10, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn trapeffect_anti_magic` (reach regression must be 0). Measured `port-coverage.mjs --name trapeffect_anti_magic` 2026-09-18 @ 78b9ec99.


- [x] `mklev.c` fill_ordinary_room — coverage PARTIAL (C 230 L `mklev.c:939–1171` / JS 151 L in js/mklev.js; hops 1, callers 1, RNG 23, msg 0; dead callees: mksink). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn fill_ordinary_room` (reach regression must be 0). Measured `port-coverage.mjs --name fill_ordinary_room` 2026-09-18 @ 78b9ec99. **Addressed:** D-2469 `838c6b6e`


- [x] `pager.c` do_look — coverage PARTIAL (C 290 L `pager.c:1673–1963` / JS 163 L in js/pager.js; hops 0, callers 2, RNG 0, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn do_look` (reach regression must be 0). Measured `port-coverage.mjs --name do_look` 2026-09-18 @ 78b9ec99. **Addressed:** D-2468 `981a50f7`


- [x] `mklev.c` mkinvokearea — coverage MISSING (C 87 L `mklev.c:2410–2497` / JS no symbol; hops 3, callers 2, RNG 0, msg 1; dead callees: mkinvk_check_wall, mkinvpos). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mkinvokearea` (reach regression must be 0). Measured `port-coverage.mjs --name mkinvokearea` 2026-09-18 @ 78b9ec99. **Addressed:** D-2467 `8299d47b`


- [x] `trap.c` sink_into_lava — coverage MISSING (C 43 L `trap.c:6991–7034` / JS no symbol; hops 2, callers 2, RNG 2, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn sink_into_lava` (reach regression must be 0). Measured `port-coverage.mjs --name sink_into_lava` 2026-09-18 @ 78b9ec99. **Addressed:** D-2466 `c08a88b9`


- [x] `eat.c` fpostfx — coverage MISSING (C 90 L `eat.c:2510–2600` / JS no symbol; hops 4, callers 2, RNG 7, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn fpostfx` (reach regression must be 0). Measured `port-coverage.mjs --name fpostfx` 2026-09-18 @ 78b9ec99.


- [x] `pline.c` verbalize — coverage THIN (C 14 L `pline.c:476–490` / JS 4 L in js/display.js; hops 2, callers 148, RNG 0, msg 2; dead callees: You_buf). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn verbalize` (reach regression must be 0). Measured `port-coverage.mjs --name verbalize` 2026-09-18 @ 78b9ec99. **Addressed:** D-2464 `4238093f`


- [x] `teleport.c` rloco — coverage THIN (C 85 L `teleport.c:2102–2187` / JS 19 L in js/teleport.js; hops 3, callers 8, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rloco` (reach regression must be 0). Measured `port-coverage.mjs --name rloco` 2026-09-18 @ cc6372c7. **Addressed:** D-2463 `f14d4535`


- [x] `mhitu.c` gulpmu — coverage PARTIAL (C 298 L `mhitu.c:1289–1587` / JS 219 L in js/mhitu.js; hops 2, callers 2, RNG 8, msg 19). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn gulpmu` (reach regression must be 0). Measured `port-coverage.mjs --name gulpmu` 2026-09-18 @ cc6372c7. **Addressed:** D-2462 `99e86dae`


- [x] `display.c` docrt_flags — coverage MISSING (C 64 L `display.c:1709–1773` / JS no symbol; hops 1, callers 3, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn docrt_flags` (reach regression must be 0). Measured `port-coverage.mjs --name docrt_flags` 2026-09-18 @ cc6372c7. **Addressed:** D-2461 `111d92e0`
- [x] `display.c` feel_location — coverage PARTIAL (C 163 L `display.c:746–909` / JS 102 L in js/display.js; hops 1, callers 22, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn feel_location` (reach regression must be 0). Measured `port-coverage.mjs --name feel_location` 2026-09-18 @ cc6372c7. **Addressed:** D-2461 `111d92e0`


- [x] `weapon.c` mon_wield_item — coverage PARTIAL (C 133 L `weapon.c:801–934` / JS 75 L in js/weapon.js; hops 1, callers 10, RNG 0, msg 9). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mon_wield_item` (reach regression must be 0). Measured `port-coverage.mjs --name mon_wield_item` 2026-09-18 @ cc6372c7. **Addressed:** D-2460 `78b9ec99`


- [x] `dog.c` mon_arrive — coverage MISSING (C 203 L `dog.c:420–623` / JS no symbol; hops 2, callers 12, RNG 5, msg 0; split? cited 22× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mon_arrive` (reach regression must be 0). Measured `port-coverage.mjs --name mon_arrive` 2026-09-18 @ cc6372c7. **Addressed:** D-2459 `4cc1fd66`


- [x] `potion.c` make_hallucinated — coverage PARTIAL (C 66 L `potion.c:369–438` / JS 49 L in js/potion.js; hops 1, callers 15, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn make_hallucinated` (reach regression must be 0). Measured `port-coverage.mjs --name make_hallucinated` 2026-09-18 @ cc6372c7.


- [x] `timeout.c` slip_or_trip — coverage PARTIAL (C 119 L `timeout.c:1222–1341` / JS 59 L in js/timeout.js; hops 1, callers 2, RNG 6, msg 12). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn slip_or_trip` (reach regression must be 0). Measured `port-coverage.mjs --name slip_or_trip` 2026-09-18 @ cc6372c7.


- [x] `mkmaze.c` mv_bubble — coverage MISSING (C 155 L `mkmaze.c:1952–2107` / JS no symbol; hops 3, callers 3, RNG 5, msg 5). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mv_bubble` (reach regression must be 0). Measured `port-coverage.mjs --name mv_bubble` 2026-09-18 @ cc6372c7.


- [x] `dogmove.c` dog_move — coverage PARTIAL (C 379 L `dogmove.c:977–1358` / JS 240 L in js/dogmove.js; hops 2, callers 2, RNG 9, msg 3; dead callees: undesirable_disp). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dog_move` (reach regression must be 0). Measured `port-coverage.mjs --name dog_move` 2026-09-18 @ e19b6d0a. **Addressed:** D-2455 `4cff7e98`


- [x] `zap.c` destroy_items — coverage THIN (C 128 L `zap.c:5965–6097` / JS 36 L in js/zap.js; hops 2, callers 36, RNG 2, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn destroy_items` (reach regression must be 0). Measured `port-coverage.mjs --name destroy_items` 2026-09-18 @ e6289b5b. **Addressed:** D-2454 `cc6372c7`


- [x] `hack.c` domove_core — coverage MISSING **Addressed:** D-2453 (C 279 L `hack.c:2712–2991` / JS no symbol; hops 1, callers 1, RNG 0, msg 1). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn domove_core` (reach regression must be 0). Measured `port-coverage.mjs --name domove_core` 2026-09-18 @ e6289b5b.


- [x] `cmd.c` yn_function — coverage PARTIAL (C 108 L `cmd.c:5471–5583` / JS 70 L in js/getline.js; hops 1, callers 40, RNG 5, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn yn_function` (reach regression must be 0). Measured `port-coverage.mjs --name yn_function` 2026-09-18 @ e6289b5b. **Stale-parked:** see Parked Stale yn_function (no js/; shipped make_blinded D-2452 in the same iteration).
- [x] `potion.c` make_blinded — coverage PARTIAL (C 70 L `potion.c:261–331` / JS 49 L in js/do.js; hops 1, callers 39, RNG 0, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn make_blinded` (reach regression must be 0). Measured `port-coverage.mjs --name make_blinded` 2026-09-18 @ e6289b5b. **Addressed:** D-2452 `e19b6d0a`


- [x] `pager.c` checkfile dbase-side `" ("` strip (charges/`(lit)`/aum, C `:977–981`) absent from `checkfile_split_names` in js/pager.js — lit/charged lookups miss where C hits (probe: `"oil lamp (lit)"` keeps suffix; reachable via objnam.c:1477–1490). Fix: truncate dbase at first `" ("` mirroring C. Verify lit-lamp lookup + `node scripts/verify.mjs --fn checkfile`. Source: reviews/loop-unattended/1402-74dc5699-checkfile-whole-body.md item 1. **Addressed:** D-2451 `c393792a`


- [x] `mon.c` xkilled holder-release mis-layered/mis-ordered/over-broad (js/uhitm.js:745–750 runs after the lifesaved return and on the stoned path; C releases inside mondead via mon_leaving_level :2702–2703, before the lifesave check, never via monstone :3286–3373 — lifesaved holders stay stuck + rnd(2) skipped, stoned path releases+draws). Fix: move the two lines after `game.disintegested=false`, gated on `!was_stoned`. Verify `node scripts/verify.mjs --fn xkilled`. Source: reviews/loop-unattended/1403-f57848fc-xkilled-disintegrate-mon.md item 1.


- [x] `pager.c` do_screen_description cmap scan uses showsyms (DEC) byte on the unlooked `/`-query path (js/pager.js:1540; C compares `looked ? showsyms : defsyms` — DEC user typing `/` `|` misses where C hits: DEC_CMAP_BYTE[S_vwall]=0xF8 vs Primary `|`). Fix: compare against the Primary DEFSYMS_CH byte when `!looked`. Verify unlooked `/` query under DEC + `node scripts/verify.mjs --fn do_screen_description`. Source: reviews/loop-unattended/1406-d32f725f-do-screen-description-whole-body.md item 1. **Addressed:** D-2449 `ef8abf5a`


- [x] `vault.c` gd_move — coverage PARTIAL (C 313 L `vault.c:888–1201` / JS 232 L in js/shk.js; hops 2, callers 4, RNG 1, msg 13; dead callees: gd_pick_corridor_gold). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn gd_move` (reach regression must be 0). Measured `port-coverage.mjs --name gd_move` 2026-09-18 @ e6289b5b. **Addressed:** D-2448 `38249822`


- [x] `pager.c` do_screen_description — coverage MISSING (C 376 L `pager.c:1247–1627` / JS no symbol; hops 1, callers 5, RNG 0, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn do_screen_description` (reach regression must be 0). Measured `port-coverage.mjs --name do_screen_description` 2026-09-18 @ e6289b5b. **Addressed:** D-2447 `d32f725f`


- [x] `insight.c` mstatusline — coverage THIN (C 123 L `insight.c:3275–3398` / JS 24 L in js/insight.js; hops 3, callers 8, RNG 1, msg 22; dead callees: wseg_at). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mstatusline` (reach regression must be 0). Measured `port-coverage.mjs --name mstatusline` 2026-09-18 @ e6289b5b. **Addressed:** D-2446 `232ff9b1`


- [x] `pager.c` look_at_monster — coverage MISSING (C 130 L `pager.c:422–555` / JS no symbol; hops 2, callers 2, RNG 0, msg 20; dead callees: coyotename). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn look_at_monster` (reach regression must be 0). Measured `port-coverage.mjs --name look_at_monster` 2026-09-18 @ a35f6369.


- [x] `mon.c` xkilled — coverage PARTIAL (C 261 L `mon.c:3477–3740` / JS 143 L in js/uhitm.js; hops 3, callers 37, RNG 2, msg 14). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn xkilled` (reach regression must be 0). Measured `port-coverage.mjs --name xkilled` 2026-09-18 @ a35f6369. **Addressed:** D-2444 `f57848fc`


- [x] `pager.c` checkfile — coverage THIN (C 295 L `pager.c:830–1129` / JS 35 L in js/pager.js; hops 1, callers 4, RNG 0, msg 5; dead callees: strip_newline). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn checkfile` (reach regression must be 0). Measured `port-coverage.mjs --name checkfile` 2026-09-18 @ a35f6369. **Addressed:** D-2443 `74dc5699`


- [x] `polyself.js` dospinweb PIT arm missing `bury_objs` import — ReferenceError throw (D-2436 `js/polyself.js:2584`; live `js/dig.js:450` ASYNC; edge ALREADY, add to existing `./dig.js` import). Fix: one line. Verify `node scripts/verify.mjs --fn dospinweb`. Source: reviews/loop-unattended/1395-c9f61087-dogaze-dospinweb-rehumanize.md. **Addressed:** D-2442 `eebc6dc2`


- [x] `polyself.js` dogaze missing `setmangry` import — ReferenceError throw (D-2436 `js/polyself.js:2439`, no import/local/global; live `js/mon.js:1120` ASYNC; edge ALREADY, add to existing `./mon.js` import). Fix: one line. Verify `node scripts/verify.mjs --fn dogaze`. Source: reviews/loop-unattended/1395-c9f61087-dogaze-dospinweb-rehumanize.md. **Addressed:** D-2441 `5f5f6f7a`


- [x] `lock.js` getdir zeroes up/down dz — corpus PASS→FAIL ×3 (D-2434 `apply_dirsym('<'/'>')` sets `u.dz=∓1` and returns `!dz=false` per C `movecmd`, then the caller `if (!applied) u.dz = 0` destroys it; every `</>` at a direction prompt prints "cmdassist: Invalid direction key!"+help and fails where C returns 1; flipped Wizard-92187/exercise, Arch-92190/distfleeck, Arch-92012/could_untrap — bisected PASS@c2935846+acf54d66 → FAIL@1d21e3be). Fix: delete `if (!applied) { u.dz = 0; }` (`apply_dirsym` zeroes dz on true failure, D-1387 kept). Verify the 3 sessions PASS + `verify.mjs --fn getdir`. Source: reviews/loop-unattended/1393-1d21e3be-getdir-whole-body.md. **Addressed:** D-2440 `678a0821`


- [x] `hack.c` test_move — coverage MISSING (C 261 L `hack.c:991–1255` / JS no symbol; hops 2, callers 19, RNG 0, msg 14; split? cited 79× in js/ — brief first). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn test_move` (reach regression must be 0). Measured `port-coverage.mjs --name test_move` 2026-09-18 @ a35f6369. **Addressed:** D-2439 `e6289b5b`


- [x] `attrib.c` adjattrib — coverage PARTIAL (C 79 L `attrib.c:117–199` / JS 53 L in js/attrib.js; hops 1, callers 33, RNG 2, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn adjattrib` (reach regression must be 0). Measured `port-coverage.mjs --name adjattrib` 2026-09-18 @ a35f6369. **Addressed:** D-2438 `a28c8688`


- [x] `dungeon.c` init_dungeons — coverage THIN (C 114 L `dungeon.c:1205–1319` / JS 46 L in js/dungeon.js; hops 1, callers 5, RNG 0, msg 7; dead callees: free_proto_dungeon, dumpit). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn init_dungeons` (reach regression must be 0). Measured `port-coverage.mjs --name init_dungeons` 2026-09-18 @ a35f6369. **Addressed:** D-2437 `f3b5aaa5`


- [x] `polyself.c` dogaze — coverage MISSING (C 131 L `polyself.c:1642–1773` / JS no symbol; hops 1, callers 1, RNG 4, msg 14). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dogaze` (reach regression must be 0). Measured `port-coverage.mjs --name dogaze` 2026-09-18 @ a35f6369.
- [x] `polyself.c` rehumanize — coverage THIN (C 51 L `polyself.c:1367–1418` / JS 20 L in js/polyself.js; hops 1, callers 29, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn rehumanize` (reach regression must be 0). Measured `port-coverage.mjs --name rehumanize` 2026-09-18 @ a35f6369.
- [x] `polyself.c` dospinweb — coverage MISSING (C 124 L `polyself.c:1497–1621` / JS no symbol; hops 1, callers 1, RNG 0, msg 11). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn dospinweb` (reach regression must be 0). Measured `port-coverage.mjs --name dospinweb` 2026-09-18 @ a35f6369.


- [x] `end.c` really_done — coverage THIN (C 460 L `end.c:1130–1590` / JS 189 L in js/end.js; hops 2, callers 5, RNG 1, msg 9). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn really_done` (reach regression must be 0). Measured `port-coverage.mjs --name really_done` 2026-09-18 @ a35f6369. **Addressed:** D-2435 `3a25da21`


- [x] `cmd.c` getdir — coverage THIN (C 161 L `cmd.c:3958–4119` / JS 60 L in js/lock.js; hops 2, callers 29, RNG 5, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn getdir` (reach regression must be 0). Measured `port-coverage.mjs --name getdir` 2026-09-18 @ a35f6369. **Addressed:** D-2434 `1d21e3be`


- [x] `mon.c` newcham — coverage THIN (C 254 L `mon.c:5278–5535` / JS 84 L in js/makemon.js; hops 2, callers 40, RNG 2, msg 4). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn newcham` (reach regression must be 0). Measured `port-coverage.mjs --name newcham` 2026-09-18 @ a35f6369. **Addressed:** D-2433 `acf54d66`


- [x] `polyself.c` polymon — coverage PARTIAL (C 336 L `polyself.c:735–1071` / JS 201 L in js/polyself.js; hops 2, callers 26, RNG 7, msg 27; dead callees: check_strangling). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn polymon` (reach regression must be 0). Measured `port-coverage.mjs --name polymon` 2026-09-18 @ a35f6369. **Addressed:** D-2432 `3ea4873c`

## 2026-09-16

- [x] `mon.c` fox death/detach lifecycle Tourist (D-2420 W4) — blocks 1/553 (scen-normal-Tourist-92061 step 3/169 kind=rng flat#2785: C `rn2(5)=4`@distfleeck vs JS `rn2(3)=0`@corpse_chance, prev destroy_items matched; JS branch next_ident+rndmonst_adj creation vs C distfleeck×N; JS topline «m_detach: fox <65,14> is already detached?» (`mon.c:2792`) vs C «little dog misses newt»; MEASURED D-2420 vs JS probe). Fix: the fox mondead/mongone/`m_detach` path in C order. Verify `node scripts/verify.mjs --fn distfleeck` (recorded owner: expect Tourist → PASS or later owner). Do not re-port `distfleeck`. **Addressed:** D-2431 `c2935846`


- [x] `monmove.c` dochug/m_move loop C-extra-distfleeck (D-2420 W1) — blocks 2/553 (scen-tour-Rogue-92030 step 76/95 kind=rng flat#12214: C `rn2(5)=1`@distfleeck vs JS `rn2(3)=2`@m_move:1843 stalker, prev distfleeck matched; scen-intrinsic-Samurai-92239 step 96/130 kind=rng flat#2853: C `rn2(5)=0`@distfleeck vs JS `rnd(20)=1`@mattacku, prev u_maybe_impaired matched; both single-draw shifts, types align after; MEASURED D-2420: recorder step dumps — Rogue 346 draws distfleeck×76/m_move×183, Samurai 20 draws — vs JS flat/slice probe; Samurai topline «figurine writhes and shatters» → `apply.c:2398 fig_transform` lead, Rogue has no such event). Fix: the extra monster dochug (creation or JS early-skip) in C order. Verify `node scripts/verify.mjs --fn distfleeck` (recorded owner: expect both → PASS or later owner). Do not re-port `distfleeck` scared arms (parked SYMPTOM) or the `m_move` MAIL arm. **Addressed:** D-2430 `f768f270`


- [x] `mklev.c` mktrap trap-kind die (Ranger downstream of the shkinit insurance port) — blocks 1/553 (scen-tour-Ranger-92033 step 98 kind=rng: C `rnd(4)=2`@mktrap vs JS `rn2(3)=2`@induced_align(mklev.js:25312); surfaced at HEAD when the shkinit insurance port moved Ranger rloc@70 → mktrap@98; untagged owner in `hidden-proxy queue`, eligible as-is). Fix: port the owning C arm in mktrap trap selection (brief mktrap first; never read seed/step/coords into logic). Verify `node scripts/verify.mjs --fn mktrap` (expect Ranger → PASS or later owner).


- [x] monmove.c `can_fog` → mon.c `mfndpos` closed-door arm (m_move Valkyrie track-check writer) — blocks 2/553 (scen-tour-Valkyrie-92040 step 113 kind=rng flat#30031: C `rn2(24)=7` vs JS `rn2(20)=15` @m_move:2003/1941, prev `rn2(3)=2`@1882 matched; scen-tour-Valkyrie-92162 step 72 flat#8893: C `rn2(20)=0` vs JS `rn2(16)=8`, prev `rn2(3)=1` matched; MEASURED D-2424: temp C fprintf post-`mfndpos` (reverted, re-record byte-identical) vs neutral worker-cloned JS prefix probe — both movers wild vampire-bat lev7 cham=227 (vampire leader), appr=1, flag=0x80040000, mtrack/u/moves/terrain identical; C cnt=6 vs JS cnt=5; extra C cell FREE door — (19,14) D_CLOSED info=0, (47,13) D_LOCKED info=NOTONL — zero occupants either 8-neighbourhood both sides; C `can_fog` all-true (fogmvflags=16/G_GENOD clear, protshape=0, stuffprev=0)). Fix: wire live `can_fog` (`js/monmove.js:761`, 3 of 4 C conditions with `stuff_prevents_passage` deferred) into the `mfndpos` door gate (`js/mon.js:2691–2693` `/* || can_fog(mon) */`, C `mon.c:2232–2238`) in C order (brief `can_fog` + `mfndpos` first; `imports.mjs --can` before the new mon.js→monmove.js edge; consider the `stuff_prevents_passage` deferral inside `can_fog` — C-true on both sessions). Verify `node scripts/verify.mjs --fn m_move` (recorded owner: expect both → PASS or later owner). Do not re-port the `m_move` body, the D-2409 MON_AT arm, or the `cant_squeeze_thru` `can_fog` arm (`js/mon.js:191`, diagonal-only, no session evidence). Falsified: occupant pair; mtrack timing.


- [x] `mkmaze.c` mk_bubble ini-time colli direction flips (collect_coords Tourist writer, MEASURED D-2426) — blocks 1/553 (scen-tour-Tourist-92100 step 131 kind=rng flat#24995: C `rn2(24)=1` vs JS `rn2(17)=4` @collect_coords ring-3; same eel 554, same pickup (7,2), same bubble #1 at (4,2); MEASURED D-2426: temp C fprintf (reverted line-exact, VALUES-IDENTICAL re-record) vs neutral /tmp JS prefix probe — C `mk_bubble:1924 mv_bubble(b,0,0,TRUE)` runs the `:2086–2108` boing switch unconditionally (only default redirect ini-gated): corner bubble colli=3 flips dy −1→+1 (dx −0); first-turn mdy=2→sgn→+1, cons (7,2)→(7,3), enexto (7,3) ring-3 full 24; JS `mk_bubble` (`js/mklev.js:15997`, `void dx;void dy` no-op, `mv_bubble` unported per brief) never flips → (0,0) → (7,2) ring-3 clipped 17; all 20 birth (dx,dy) + positions match in order). Fix: apply the boing-switch colli flips on the JS ini path in C order (after dx/dy draws, before chain link; flips only — default redirect stays ini-gated; unblock/block paint arms stay named, maps matched). Verify `node scripts/verify.mjs --fn collect_coords` (recorded owner: expect Tourist-92100 → PASS or later owner). Do not re-port `collect_coords` (live, parked SYMPTOM) or `get_location`/`mkclass_aligned` (presence-only parks). Falsified: eel-cell difference, (43,18) center (post-div JS fIdx 25424), clamps, hero-steer, boing redirect, order/chain. **Addressed:** D-2427 `bbe672c4`


- [x] [measure] `collect_coords` ring-state residuals — blocks 1/553 (scen-tour-Tourist-92100 step 131 kind=rng: C `rn2(24)=1`@collect_coords vs JS `rn2(17)=4`@collect_coords(`js/teleport.js:611`); same fn both sides, positional prefix fully matched → upstream content/ring-state per the `get_location`/`mkclass_aligned` presence-only parks). Deliverable: C per-step draw-owner dump (which C function draws what at the blocked step on the recorder, temp RNG-tag instrumentation reverted) vs the JS prefix-state probe, then the writer's Open row. Do not re-port `collect_coords` (live, parked SYMPTOM) or `get_location`/`mkclass_aligned` (presence-only parks). Probe: `node scripts/hidden-proxy.mjs verify collect_coords`.


- [x] [measure] `do_statusline2` HP residuals — blocks 3/553 (scen-poly-Healer-92107, scen-wish-Healer-92092, scen-wish-Monk-92194; identical toplines, first diff row 23 HP: C `HP:7(33)` vs JS `HP:2(33)`; top parked owner with no Open row). Deliverable: C per-step draw-owner dump (which C function draws what at each blocked step on the recorder, temp RNG-tag instrumentation reverted) vs the JS prefix-state probe, then the writer's Open row. Do not re-port `do_statusline1/2` (painters proven faithful, parked). Probe: `node scripts/hidden-proxy.mjs verify do_statusline2`. **Addressed:** D-2425 `5dee71f0`


- [x] [measure] `m_move` Valkyrie track-check residuals — blocks 2/553 (scen-tour-Valkyrie-92040 step 113: C `rn2(24)`@m_move vs JS `rn2(20)`@m_move; scen-tour-Valkyrie-92162 step 72: C `rn2(20)` vs JS `rn2(16)`; same track-check cnt-off-by-occupant signature as D-2409's Caveman-92202, whose `mfndpos` ALLOW_M arm shipped — the occupant pair here is still unflipped). Deliverable: C per-turn dump of the moving monster + the extra occupant's species/tame/level/size/ALLOW flags at those steps (temp RNG-tag instrumentation, reverted) vs the JS prefix-state probe, then the writer's Open row. Do not re-port `m_move` (live) or `mfndpos` (D-2409). Probe: `node scripts/hidden-proxy.mjs verify m_move`. **Addressed:** D-2424 `accddd87`


- [x] `insight.c` `attributes_enlightenment` Unchanging shape-change arms — blocks 1/553 (scen-wish-Monk-92013 step 135/146 kind=screen, recorded owner `one_characteristic`: row 17 C «You couldn't change from your current form because of your amulet of» vs JS « You were fast innately.»; MEASURED 2026-09-16: C temp-fprintf in `enlightenment()` (reverted, re-record byte-identical) vs JS disclosure probe — invent identical 10/10 items (otyp/quan/owt/worn/bless), wcap 775 + invwt -508 both sides, uamul=207 (amulet of unchanging) worn W_AMUL both sides, Upolyd=0/umonnum=336 both → C `insight.c:1837–1842` `!Upolyd` arm fires, JS skips it (in-code named deferral `js/invent.js:5796` «Unchanging / Polymorph deferred»; the `:1892–1893` Upolyd arm likewise deferred at `:5829`). Fix: port `:1837–1856` + `:1892–1893` in C order (brief the writer first; Protection_from_shape_changers `:1834–1836` only if still absent). Verify `node scripts/verify.mjs --fn one_characteristic` (recorded owner: expect Monk-92013 → PASS or later owner). Do not re-port `one_characteristic` (parked MISATTRIBUTED).


- [x] `mkobj.c` `weight()` Bag-of-Holding bless/curse factor — blocks 1/553 (scen-wish-Caveman-92148 step 245/257 kind=screen, recorded owner `one_characteristic`: row 5 C « You were unencumbered <-247>.» vs JS «<-210>.»; MEASURED 2026-09-16: C temp-fprintf in `enlightenment()` (reverted, re-record byte-identical) vs JS disclosure probe — invent identical 10/10 items incl. bless/cursed/worn, wcap 950 both sides, bag otyp 219 blessed both sides with identical contents (otyp 366 ×1 owt 50): C bag owt=28 = 15 + (50+3)/4 vs JS owt=65 = 15 + 50, Δ37 = the whole disclosure Δ). C `mkobj.c:1932–1934` (`cursed ? cwt*2 : blessed ? (cwt+3)/4 : (cwt+1)/2`) absent from `js/mkobj.js:268` `weight()` (in-code named deferral «BoH factor deferred»; DELTA_CWT likewise named at `js/pickup.js:1139,2308`). Fix: the divisor arms in C order. Verify `node scripts/verify.mjs --fn one_characteristic` (recorded owner: expect Caveman-92148 → PASS or later owner). Do not re-port `one_characteristic` (parked MISATTRIBUTED) or `inv_weight` (Δ fully accounted by the bag).


- [x] `makemon.c` makemon `dochugw` occupation arm — blocks 1/553 (scen-tour-Barbarian-92079 step 62, recorded owner `mon_adjust_speed`: identical toplines, row 5 C `·@·` vs JS `Y@'`; measured, no instrumentation needed — the RNG-tag log IS the per-turn dump: C-62 ends mid-`nasty` at 161 draws [`rn2(100)=91 @ makemon:1447` saddle] and C-63 opens with `rnd(4)=1 @ nasty:695` `mspec_used` + `rn2(44)=35 @ pick_nasty` (same call's outer continuation); C-63 topline «You stop searching. Monsters appear from nowhere!»; JS-62 draws 395 = C-62 head verbatim + C-63 summon head, fmon 33→38: ettin(8,5, pick-1, malign 0) + orange-dragon(6,5, pick-35) + storm-giant/owlbear/golem — C `makemon.c:1502–1504` `if (go.occupation) (void) dochugw(mtmp, FALSE)` stops the searching hero mid-turn («You stop searching» → MORE split) vs JS `js/makemon.js:3490–3492` newsym-only (named omit `js/makemon.js:3503` + map data.md:485 «dochugw still omit»), so JS never splits and completes C's two-phase turn in one step. Falsified: glyph-visibility theory (both sides `newsym` immediately; C-62 ettin paints H both sides), `nasty` break (C breaks inner correctly on malign-0 ettin; outer pick-35 continuation is C-correct), `mon_adjust_speed` re-port (D-0871). Fix: `dochugw(mtmp, FALSE)` after the appear block in C order (threat gate `monmove.c` dochugw; needs async `pline` propagation — cf. `js/teleport.js:706` dynamic-import pattern; `makemon` is sync with many callers). Verify `node scripts/verify.mjs --fn mon_adjust_speed` (recorded owner: expect Barbarian-92079 → PASS or later owner). Do not re-port `mon_adjust_speed`, `nasty`, or the MORE machinery. **Addressed:** D-2421 `cb17ead7`


- [x] [measure] `distfleeck` residual writers — blocks 7/553 (scen-intrinsic-Samurai-92239 step 96, scen-normal-Tourist-92061 step 3, scen-normal-Wizard-92127 step 101, scen-poly-Caveman-92202 step 116, scen-tour-Healer-92055 step 104, scen-tour-Rogue-92030 step 76, scen-tour-Samurai-92161 step 37; the Knight-92112 mail-daemon writer shipped with the `m_move` MAIL arm this iteration → PASS, see the D-log top entry). Deliverable: C per-step draw-owner dump (which C function draws what at each blocked step on the recorder, temp RNG-tag instrumentation reverted) vs the JS prefix-state probe, then the writer's Open row (grouped by writer). Do not re-port `distfleeck` (live, parked SYMPTOM) or the `m_move` MAIL arm. Probe: `node scripts/hidden-proxy.mjs verify distfleeck`. **Addressed:** D-2420 fa0c5f89


- [x] `mkmaze.c` migrate_orc ORC_LEADER destination — blocks 1/553 (scen-tour-Healer-92042 step 73: level-tele arrival uz=2:8; C `losedogs → mon_arrive` After_you MIGR_RANDOM `rloc` for the stolen_booty ORC_LEADER orc-captain (mnum=77, migflags=8192, from 2:3 → dest 2:8; measured on instrumented recorder, reverted, re-record byte-identical; mydogs empty, put_lregion-oneshot silent) — vs JS which queued all 6 gang migrants at step 53 (prefix probe: 74/75/74→2:4, 72/74→2:5 match C; C step-53 `rn2(40)`@migrate_orc matched) but holds the captain at mux=3,muy=0 (vs C 2:8), so JS `losedogs` never delivers and draws `rn2(12)`@mcalcmove where C draws `rnd(79)`@rloc). Fix: JS `migrate_orc` leader `nlev=max_depth → get_level → ledger_no` path (`js/mklev.js:993–1012`; gang arm verified live). Do not re-port `rloc` (D-0686), `stolen_booty` creation, or `mon_arrive` delivery (both live). **Addressed:** D-2419 `470f6f36` Probe: `node scripts/hidden-proxy.mjs show scen-tour-Healer-92042`; verify `node scripts/verify.mjs --fn migrate_orc` (blocked owner is `rloc`: expect Healer → PASS or later owner).


- [x] `shknam.c` shkinit MON_AT insurance rloc — blocks 1/553 (scen-tour-Ranger-92033 step 70: wizard `#levelchange` pick 'w' = minetn, NEW uz=2:4 at moves=24; C `shkinit :658–660` insurance `rloc`s the shk-spot squatter before each shopkeeper `makemon` — mountain nymph mnum=69 @(31,12) then lynx mnum=35 @(45,15), 2 tries each ((31,13)/(57,7) and (76,13)/(36,11)); measured on instrumented recorder (reverted, re-record byte-identical; `mon_arrive`/oneshot/`baalz` probes silent; `rloc_to_core→set_apparxy` orientation accounts the 401 following draws) — vs JS `js/shknam.js:642–646` which zeroes blocker mx/my (0 RNG; verified via `brief.mjs shkinit` at enqueue) so JS draws `rnd(2)`@next_ident where C draws `rnd(79)`@rloc). Fix: route through canonical async `rloc` (`js/teleport.js:1236`; `imports.mjs --can` first — async propagation through level-gen callers). Do not re-port `rloc` (D-0686). **Addressed:** D-2418 Probe: `node scripts/hidden-proxy.mjs show scen-tour-Ranger-92033`; verify `node scripts/verify.mjs --fn shkinit` (blocked owner is `rloc`: expect Ranger → PASS or later owner). **Addressed:** D-2418 `2f0f9f76`


- [x] `dogmove.c` `dog_invent` underfoot-eat state (Knight pony) — blocks 1/553 (scen-normal-Knight-92182 step 95 kind=rng: C `rn2(100)=18`@obj_resists vs JS `rn2(5)`@distfleeck (C's later draw); C «Your saddled pony eats an uncursed apple.» vs JS «You miss the saddled pony.»; MEASURED 2026-09-16, D-2414: 70th draw moves=20, APPLE otyp 277 (0,95) rate + splitobj `next_ident` + apport re-rate (0,95)=87 + same-apple (0,0)=97 (sub-call open); geom-probe @95 0 cells). Fix: JS state probe first (pony edog hungrytime/apport/meating + apple at square @ step 95), then the gating — not `dogfood`/`dog_eat` (live). Verify `node scripts/verify.mjs --fn obj_resists` (expect Knight → PASS or later owner). Do not re-port `obj_resists` (live) or `distfleeck` (parked SYMPTOM). **Addressed:** D-2417 `8547ab87`


- [x] [measure] `obj_resists` Knight/Arch/Healer burn writers — blocks 3/553 post-ship (scen-normal-Knight-92182 step 95 kind=rng: C `rn2(100)=18`@obj_resists vs JS `rn2(5)`@distfleeck; scen-wish-Archeologist-92238 step 166; scen-wish-Healer-92173 step 230; the Samurai/Wizard lava writers shipped with the death-drop port). Deliverable: C per-step burn dump (which obj burns/survives + lava/fire/frost context at each step on the recorder, temp instrumentation reverted) vs the JS prefix-state probe, then the writer's Open row (DELIVERED 2026-09-16 as the three writer rows below — detail in D-2413/2414/2415 + NOTES Active; the 3 sessions stay blocked pending those ports). Do not re-port `obj_resists` (live) or `distfleeck` (parked SYMPTOM). Probe: `node scripts/hidden-proxy.mjs verify obj_resists`.
- [x] `read.c` `seffect_destroy_armor` cursed→`disintegrate_arm` arm — blocks 1/553 (scen-wish-Healer-92173 step 230 kind=rng: C `rn2(100)=64`@obj_resists vs JS no draw; C «Your gloves vanish!» vs JS gloves stay; MEASURED 2026-09-16, D-2413: 15th/15 draw moves=12, LEATHER_GLOVES otyp 159 (0,90) destroyed, single draw (only uarmg worn); JS `js/read.js:1214` names `else disintegrate_arm deferred`, live `js/do_wear.js:3388` unwired). Fix: call live `disintegrate_arm(otmp)` in the cursed `else` arm in C order (`read.c:1380–1383`, mirror the return-0 fallthrough). Verify `node scripts/verify.mjs --fn obj_resists` (expect Healer → PASS or later owner). Do not re-port `obj_resists`/`disintegrate_arm` bodies (live) or the destroy_arm erosion path. **Addressed:** D-2416 `51ee14c5`


- [x] `insight.c` `list_genocided` ngone>0 menu arm — blocks 1/553 (scen-wish-Samurai-92088 step 272: C «Do you want a list of species genocided? [ynaq] (n)» vs JS «Do you want to see your conduct and achievements? [ynq] (n)»). C `insight.c:3007–3131` full menu body absent from `js/insight.js:846` stub (verified via `brief.mjs list_genocided` at enqueue: in-progress empty path only; `num_extinct`/`num_gone`/`set_vanq_order` NOT FOUND in `js/`). Port the ngone>0 arm in C order. Probe: `node scripts/brief.mjs list_genocided`; verify `node scripts/verify.mjs --fn list_genocided`. **Addressed:** D-2412 `eb69ebb7`


- [x] `eat.c` `losehp` death-path bypass at the two corpse-damage sites: C `eat.c:1926–1942` `losehp`-call arms absent from js/eat.js:eatcorpse (verified via `brief.mjs losehp` at enqueue: canonical `losehp` live at `js/hack.js:1228` sync, 0 blocked, no row names it) — C `eat.c:1926` `losehp(rnd(15), "acidic corpse"/"acidic glob", …)` + `:1942` `losehp(rnd(8), "cadaver"/"rotted glob", KILLED_BY_AN)` vs JS inline `uhp -= rnd(15)/rnd(8)` + `botl` flag only (D-2402), so Upolyd/mh handling, `end_running`, killer attribution and the death path never run. Fix: route both sites through canonical `losehp` (`imports.mjs --can eat.js hack.js losehp` → ALREADY, no new edge). **Addressed:** D-2411 `59b0f846`


- [x] [measure] enlightenment Status/Attributes value writers (top parked owner `one_characteristic` post-ship, 2/553: scen-wish-Caveman-92148 step 245 row 5 C «You were unencumbered <-247>.» vs JS «<-210>.»; scen-wish-Monk-92013 step 135 row 17 C «You couldn't change from your current form because of your amulet of» vs JS «You were fast innately.»; both steps list `chwepon(wield.c:940)` in cMsgOwners — fresh `verify one_characteristic` this iteration). Deliverable: C per-step u-state dump (utrap/utraptype/ustuck/uswallow/Upolyd/umonnum/amulet/inv_weight + invent otyp/owt list) at both steps on the recorder (temp fprintf in `enlightenment()`, reverted) vs the JS prefix-state probe, then the writer's Open row (weight arithmetic vs item generation vs Unchanging-form arm). Do not re-port `one_characteristic` (parked MISATTRIBUTED) or the shipped status utrap/held arms. Probe: `node scripts/hidden-proxy.mjs show scen-wish-Caveman-92148`.


- [x] [measure] `worn.c` mon_adjust_speed Barbarian-92079 glyph writer — blocks 1/553 (scen-tour-Barbarian-92079 step 62, kind=screen: identical toplines, row 5 C `·@·` vs JS `Y@'`; parked MISATTRIBUTED — body arm-for-arm D-0871, 0 RNG draws, proven no-movement). Deliverable: C per-turn dump (mons pos/minvis + levl glyphs at step 62 on the recorder, temp instrumentation reverted) naming the summon-path glyph writer, then the writer's Open row. Do not re-port `mon_adjust_speed`. Probe: `node scripts/hidden-proxy.mjs show scen-tour-Barbarian-92079`; archive row `worn.c mon_adjust_speed` for the full proof.


- [x] `monmove.c` `m_move` MAIL_DAEMON departure — blocks 1/553 (scen-genesis-Knight-92112 step 96 kind=rng: C `rn2(5)=1`@distfleeck vs JS `rn2(10)=1`@m_move:1845; measured: temp-fprintf `distfleeck` stream (reverted; VALUES-IDENTICAL re-record 100 steps/3221 draws/screens/cursors) shows mail daemon mndx=314 @15,5 peace=1 `distfleeck` seq=144 then MAILDAEMON «I'm late!»+mongone (draw-free) then dragon seq=145 `distfleeck`, vs JS daemon alive @15,5 taking peaceful-getitems `rn2(10)`; JS arm absent — `js/monmove.js:1783`→`:1785` jumps shk/gd/priest to Tengu, no MAIL_STRUCTURES arm (map turns.md:2785 MAIL_DAEMON deferred)). Fix: port `monmove.c:1829–1838` (verbalize + mongone + MMOVE_DIED) via canonical `mongone` (`js/mon.js:3017`; `imports.mjs --can` first). Verify: `node scripts/verify.mjs --fn m_move` + `verify distfleeck` (expect Knight-92112 → PASS or later owner). Probe: `/tmp/probe_distfleeck.mjs` K=95/96. **Addressed:** D-2410 `2201c4e6`


- [x] [measure] `distfleeck` invocation stream (top parked corpus owner post-rescore, 7/553: scen-genesis-Knight-92112 step 96, scen-intrinsic-Samurai-92239, scen-normal-Tourist-92061 — C draws `rn2(5)=1` in `distfleeck`, JS `rn2(10)=1` from `m_move` (monmove.js:1827)). Deliverable: temp C dump of the `distfleeck` call stream (which monster flees, from/to cells) across Knight-92112 step 96 vs the JS replay + the writer's Open row (no `js/`; commit and push — "empty port pushed" expected).


- [x] `mon.c` `mm_aggression`/`mm_displacement` ALLOW_M arms into `mfndpos` — blocks 3/553 (scen-poly-Caveman-92202 step 103 kind=rng: C `rn2(20)=5` vs JS `rn2(16)=13` @ track-check `m_move(monmove.c:2003/JS:1927)`, first draw of that call, `appr!=0` both; scen-tour-Valkyrie-92040 step 113: C `rn2(24)` vs JS `rn2(20)`; scen-tour-Valkyrie-92162 step 72: C `rn2(20)=0` vs JS `rn2(16)=8`). Measured 2026-09-16 (delivered `[measure]` row below): C MEAS n=5551 (temp fprintf, reverted; re-record VALUES-IDENTICAL: 10999/10999 draws same fn/args/values, 265/265 screens; only caller line refs shifted) vs scratch-JS JMEAS n=5551 (scored `js/` untouched): goblin@22,6 `appr=1` `gg=72,8` `flag=4456448` both sides, `cnt` C5 vs JS4, `mtrack=[22,7;22,8;21,8;20,8]` IDENTICAL, C extra `(21,5)/ALLOW_M` = wild kobold-zombie occupant (JS `m_at(21,5)` truthy, dropped at raw-flag gate). C arm `mon.c:2299–2317` (`mmflag = flag | mm_aggression(mon, mtmp2)`; reverse-direction `mm_2way_aggression` zombie pair grants ALLOW_M) vs `js/mon.js:2680–2684` (`if (!(flag & ALLOW_M)) continue`, `mm_aggression`/`ALLOW_MDISP` comment-deferred; map `turns.md:2766` names the ALLOW_MDISP omit). Falsified, do not re-check: `mtrack` history shift, `mon_track_add`/`mon_track_clear` timing. Fix: port `mm_aggression :2428` + `mm_2way_aggression :2387` + `mm_displacement :2451` into the `mfndpos` MON_AT arm. Probes kept out of tree: `/tmp/meas.log`, `/tmp/jmeas.log`, `/tmp/probe_align2.mjs`. Verify `node scripts/verify.mjs --fn m_move` (expect Caveman + Valkyrie pair → PASS or later owner).


- [x] `insight.c` utrap-steed verb: C `:1094–1096` passes `anchored ? are/were : is/was`, JS `js/invent.js` utrap block always `are/were` (review-caught, no corpus session in steed+trap state; anchored BURIEDBALL arm correct). Fix: mirror C's ternary in the verb + correct the comment quote. Source: reviews/loop-unattended/1372-3e4e31f8-enlightenment-utrap-held.md


- [x] [measure] `monmove.c` m_move Caveman-92202 `cnt-j` split — blocks 3/553 (scen-poly-Caveman-92202 step 103: C `rn2(20)=5` vs JS `rn2(16)=13`, first draw of that `m_move` call, `appr!=0` both sides, candidate count differs by exactly 1; Wizard-92076 writer `dohide` shipped). Candidates left by the park: one extra `mfndpos` candidate in C, an `mtrack` history shift (all 6 C `mon_track_clear` sites have JS counterparts — verify they fire at the same turns), a `mon_track_add` timing gap. Deliverable: C `mfndpos` position list + `mtrack[]` dump at step 103 on the recorder (temp fprintf, reverted) vs the JS prefix-state probe, then the writer's Open row. Do not re-port the selection loop (faithful, parked). Probe: `node scripts/hidden-proxy.mjs show scen-poly-Caveman-92202`.


- [x] [measure] `teleport.c` rloc migrant creation — blocks 2/553 (scen-tour-Healer-92042 step 73 + scen-tour-Ranger-92033 step 70). DELIVERED 2026-09-16 (no js/): C temp-fprintf dump (losedogs/migrating list, mon_arrive, mon_arrive→rloc, put_lregion-oneshot, rloc entry + call-count; reverted, re-record byte-identical) + JS prefix probes → two writer Open rows below (migrate_orc leader-dest, shkinit insurance). Do not re-port `rloc` (D-0686).


- [x] `steal.c` relobj death-drop `flooreffects` arm — blocks 2/553 (scen-tour-Samurai-92032 step 59 kind=rng: C `lava_damage`+`delobj_core` 3× `rn2(100)`@obj_resists for a nymph death-drop [potion312+mirror230] onto lava (61,9) vs JS silent place; scen-tour-Wizard-92219 step 115: same, orc [potion315+knife40] at (63,3)). C `steal.c:874–898` relobj → `mdrop_obj` → `flooreffects(...,"fall")` → `lava_damage`; JS `mkobj.js:2311` `relobj_on_death` runs `place_object` directly ("`flooreffects` omitted"). Measured on instrumented recorder (reverted; VALUES-IDENTICAL): fmon/traps match, only the burn draws differ. Fix: route `relobj_on_death` through `flooreffects` (+ test: lava death-drop burns potion). Verify `verify obj_resists` (both must PASS/move past). NOTE: Knight/Arch/Healer `obj_resists` blocks are other writers. **Addressed:** D-2407 `0a008ef1`


- [x] [measure] `zap.c` obj_resists S2/S3 writers — blocks 6/553 (scen-tour-Samurai-92032 step 59: C 3× `rn2(100)`@obj_resists mid-`m_move` vs JS `rn2(5),rn2(1),rn2(2)` then reconvergence — fire-trap `burnarmor`/`destroy_items` event C ran and JS skipped?; scen-tour-Wizard-92219 step 115: C `obj_resists` ×3 with no preceding dochug draw vs JS HORSE/APE moves + gel cube skipped despite `movement=12` — fmon-order / move-gate split). S1 (savebones) shipped. Deliverable: a C-side per-turn dump (temp `fprintf` in `movemon`/`dochug` of fmon order + `movement` + trap state at those steps on the recorder, reverted after) naming the writer for each session, then the writer's Open row. Do not re-port `obj_resists` (body faithful, parked). Probe: `node scripts/hidden-proxy.mjs show scen-tour-Wizard-92219`; archive row `zap.c obj_resists` for the falsified candidates (do not re-check them).


- [x] [measure] enlightenment Status/Attributes value writers (top parked owner `one_characteristic` post-D-2406, 2/553: scen-wish-Caveman-92148 step 245 row 5 C «You were unencumbered <-247>.» vs JS «<-210>.»; scen-wish-Monk-92013 step 135 row 17 C «You couldn't change from your current form because of your amulet of» vs JS «You were fast innately.»; both steps list `chwepon(wield.c:940)` in cMsgOwners — fresh `verify one_characteristic` this iteration). Deliverable: C per-step u-state dump (utrap/utraptype/ustuck/uswallow/Upolyd/umonnum/amulet/inv_weight + invent otyp/owt list) at both steps on the recorder (temp fprintf in `enlightenment()`, reverted) vs the JS prefix-state probe, then the writer's Open row (weight arithmetic vs item generation vs Unchanging-form arm). Do not re-port `one_characteristic` (parked MISATTRIBUTED) or status utrap/held arms (live D-2406). Probe: `node scripts/hidden-proxy.mjs show scen-wish-Caveman-92148`. **Addressed:** D-2406 `3e4e31f8`


- [x] `insight.c` status_enlightenment held-by/holding + `trap_predicament` utrap arms — blocks 3/553 (scen-genesis-Knight-92002 step 81, scen-wish-Caveman-92148, scen-wish-Monk-92013; owner `one_characteristic` is the region heuristic — `hidden-proxy queue` shows the differing screen row: C «You were held by a pit fiend (north).» vs JS «You weren't hungry <891>.»). C `insight.c:1086–1098` (`u.utrap` → `trap_predicament(predicament, final, wizard)` + steed/anchored `enl_msg` vs `you_are`) and `:1124–1131` (`else if (u.ustuck)`: `ustick = Upolyd && sticks(youmonst.data)`, `"%s %s (%s)"` holding/held by + `heldmon` + `dxdy_to_dist_descr(dx, dy, TRUE)`, `you_are`) absent from `js/invent.js:5077–5097` status_enlightenment (its own comment defers both; only the `uswallow` arm is live). `trap_predicament` (`insight.c:233`) has no JS body; `dxdy_to_dist_descr` is live (`js/display.js:7158`). Port both arms in C order (utrap block before the ustuck/uswallow block). Probe: `node scripts/brief.mjs status_enlightenment`; verify `node scripts/verify.mjs --fn one_characteristic` (expect Knight-92002 → PASS or later owner) + `#enlightenment`/death-disclosure cohort (seed0030). **Addressed:** D-2406 `3e4e31f8`


- [x] [campaign botl-parity 3/3] UNMASKED by D-2405 (mask was "step-2 gate ships" — shipped, full 44/44): ship the `eat.c` `stop_occupation` meal gate (`js/eat.js:2101` live wiring verified NO MOVEMENT pre-gate). Evidence: post-D-2405 `verify do_statusline2` holds the lembas pair one step out (scen-wish-Healer-92092 step 59, scen-wish-Tourist-91125 step 83, same owner) against the step-60 meal effect. Falsifier: gate on → pair reaches step 60+ or a later owner. **Addressed:** D-2405 `a01e8b84`


- [x] [campaign botl-parity 2/3]: ship the moveloop gate — `bot()` on `disp.botl|botlx`, `timebot()` on `time_botl` (D-2400 local-gate probe: full `sessions` 38/44 → 43/44, all screen-only with RNG/cursors fully matched; seed0007-T stale-time residual needs its C-side flag trace). Pops after the docrt early-path Must-fix (review 1366) — the gate would stale swallow/water/buried paths without it. Falsifier: `verify do_statusline2` moving the 4 remaining sessions (scen-poly-Healer-92107 step 126, scen-wish-Healer-92092 step 58, scen-wish-Monk-92194 step 88, scen-wish-Tourist-91125 step 82). **Addressed:** D-2405 `a01e8b84`


- [x] `mthrowu.c` `u_catch_thrown_obj` guard calls divergent `freehand` clone (mthrowu.js:292 `oc_big`/`uswapwep`, no welded check) instead of C `engrave.c:472–477` (sole C `freehand`, extern.h:1018; clone's "invent.c" home does not exist): welded weapon → C FALSE vs JS TRUE, big+swap → C TRUE vs JS FALSE; `imports.mjs --can mthrowu.js engrave.js freehand` → SAFE. Fix: import canonical, retire clone, keep 44/44 + cohort. Source: reviews/loop-unattended/1365-0c7b4556-u-catch-thrown-obj.md.


- [x] `display.c` `docrt()` uswallow/underwater/buried arms return without `botlx`, but C `goto post_map` (`:1724–1736` → `:1766–1769`) sets it on every non-maponly call ("skip it as in C" is C-false; step-2 gate would stale those paths). Fix: set `botlx` on the three early arms, note redrawonly-arm botlx in the map omit. Source: reviews/loop-unattended/1366-d1747cfa-botl-parity-sites.md.

## 2026-09-15

- [x] `polyself.c` `polymon` find_ac:890-vs-capture order — blocks 1/553 (scen-death-Tourist-92095, step 46, kind=screen): C `Dlvl:1 $:605 HP:15(15) Pw:2(2) AC:6 HD:6 Burdened Blind` vs JS AC:10, identical `Your shirt rips to shreds!` toplines; JS u.uac=6 post-step (state correct — find_ac HAS the mons[umonnum].ac form-base arm) but the step-46 capture lands pre-find_ac (JS find_ac deferred post-encumber_msg, js/polyself.js:1305) while C lands post-find_ac (polyself.c:888–890). Caution: prior AC:9 session needed the deferral (js/polyself.js:1292–1296) — fix flush/More timing, not just find_ac position. Probe: `node scripts/hidden-proxy.mjs show scen-death-Tourist-92095`.


- [x] `mon.c` can_carry strong-flat cap + Knight worker spin `[measure]` — blocks 1/553 (scen-normal-Knight-92182, step 13; mattackm/can_carry parks 2026-09-08). C `can_carry` allows a 640-wt chest for a strong flat monster (cap 1000); JS stub caps at 448, so `dog_move` goal differs and `rn2(++chcnt)` draws shift. Importing the canonical `can_carry` (`monmove.js:248`) fixes step 13 **but the worker then spins** (`verify mattackm` → ETIMEDOUT), same class as the ready_weapon Knight-92204 spin. Deliverable: profile/stack of the spinning worker (`node --cpu-prof` or `--inspect` on the replay command from `hidden-proxy show scen-normal-Knight-92182`, prefix moves past step 13) naming the sync loop; then an Open row for that loop (a hang forfeits every later screen — Must-fix class). No `js/` unless the loop is found and is one C-cited fix. **Delivered 2026-09-16 (no js/): no spin at HEAD — import live at js/dogmove.js:17, Knight-92182 replays 0.3 s to step 95 (parked obj_resists); `verify mattackm` vacuous, cohort 7/7; writer already parked, no new row.**


- [x] `dogmove.c` `droppables` pet flooreffects/vault-gold arms (data.md:286) — **unverified at enqueue**: stale check first. Probe: `node scripts/brief.mjs droppables`. **Addressed:** D-2401 `eb9ad04a`


- [x] `allmain.c` moveloop_core `[campaign botl-parity 2/3]` — gate `bot()`/`timebot()` exactly per `allmain.c:473–479`, delete the `_statusSuppressed` / status-snapshot shims the gate makes dead (D-1831 class), full `sessions` 44/44 + `node scripts/verify.mjs --fn do_statusline2` (expect the lembas pair Healer-92092/Tourist-91125 → step 60 or later; value-residual sessions move or PASS). Pop only after step 1 shipped. (Step 1 D-2400 remainder: seed0007 travel-T run=8 — RDO fires LEAP+time yet `time_botl` never reaches the gate; needs a C-side per-turn flag trace to name the writer.) **Addressed:** D-2400 `d1747cfa`


- [x] `allmain.c` moveloop_core `[campaign botl-parity 1/3]` — blocks 10/553 (do_statusline2 owner; parked 2026-09-07/09 with byte-exact probes). **Addressed:** D-2400 `d1747cfa` C repaints status only when `disp.botl || disp.botlx` (`bot()`) or `disp.time_botl` (`timebot()`) — `allmain.c:473–479`; JS `bot()` runs unconditionally each iteration (`allmain.js:1158`) and hides it behind `_statusSuppressed` / status-snapshot shims. Applying the C gate locally regressed 7 fortress sessions (menu-close blank ×4 `process_menu_window` row 22; stale `T` seed0007; stale HP seed0002 sick; stale `$` seed0399 wish) — each is a **missing JS `disp.botl`/`botlx`/`time_botl` set** or the missing `docrt`-class redraw after a full-screen menu closes. Step 1: with the gate applied **locally only**, run full `sessions`, and port the C set sites (cite each: the `context.botl = TRUE` / `botlx` / `time_botl` line C executes on those paths, and the menu-close redraw C performs) until 44/44 holds; ship the set sites **without** the gate if a regression remains after two fixes, naming the remaining sessions in the row for step 2. Probe: `node scripts/brief.mjs moveloop_core`; `rg -n 'botl' js/allmain.js js/display.js`.


- [x] `mthrowu.c` m_throw flight stop + `u_catch_thrown_obj` catch — blocks 1/553 (scen-tour-Samurai-92161, step 35, kind=screen; spoteffects park 2026-09-08 named this writer). Evidence from the park: JS `mthrowu.js:1070-1071` draws `forcehit = !rn2(5)` then discards it (C `m_throw` stop condition via `MT_FLIGHTCHECK`, C `:798` region), so landing squares diverge with identical dice; JS `u_catch_thrown_obj` success returns silently (`mthrowu.js:1036-1039`) without C's `hold_another_object` («You catch the shuriken!»). Read C `m_throw`/`u_catch_thrown_obj` bodies + callers; port both arms. Probe: `node scripts/brief.mjs m_throw`; verify `node scripts/verify.mjs --fn spoteffects` (`--base <sha the park cites>` if vacuous at HEAD; expect Samurai-92161 → PASS or later owner). **Addressed:** D-2399 `0c7b4556`.


- [x] `dothrow.c` throwit landing misses `obj_no_longer_held` (call miswired into `throw_gold`, which C never calls it from; C `dothrow.c:1808` is in `throwit` between `flooreffects` and pick-snatch/snuff). Move the canonical `do.js` call from `throw_gold` into JS `throwit` landing (`js/dothrow.js` ~:2316–2340, after the `flooreffects` block). Probe: throw a crysknife and check worm-tooth revert on landing. Source: reviews/loop-unattended/1359-b7216a99-obj-no-longer-held.md.


- [x] `do_wear.c` Gloves_off misses the `:687/696` `wielding_corpse` pair (new live export wired only for yellow-DSM doff; gloves-doff CORPSE-gated pair unnamed in map). Capture `gloves` + `on_purpose` pre-clear per C `:647–651`, add the pair, make `Gloves_off` async with caller cascade (`js/do_wear.js` :1373/:1391/:1868). Probe: wield cockatrice corpse, doff gloves, check petrify. Source: reviews/loop-unattended/1361-af4fb4cc-dragon-armor-wielding-corpse.md. **Addressed:** D-2397 `484c303d`


- [x] `timeout.c` slimed_to_death (corpus queue 1/553: scen-death-Valkyrie-92229 step 37 kind=screen, C «You feel even worse» vs JS «You feel much worse» after Demogorgon lifesave; never own-row live/archived/parked). Probe: `node scripts/brief.mjs slimed_to_death`. **Addressed:** D-2396 `a00fc90c`


- [x] `do_wear.c` dragon_armor_handling color/arti_light arms (turns.md:1067-1069 D-0636 deferred: gold make_hallucinated, red see_monsters, yellow wielding_corpse, arti_light burn; never own-row live/archived/parked). Probe: `node scripts/brief.mjs dragon_armor_handling`. **Addressed:** D-2395 `af4fb4cc`


- [x] `topten.c` outentry astral/choked/poisoned/crushed/petrified arms (D-2122-named residual; C topten.c:946–1107; local clone in js/; never own-row live/archived/parked). Probe: `node scripts/brief.mjs outentry`. **Addressed:** D-2394 `bb704c9c`


- [x] `do.c` obj_no_longer_held (D-2060-named residual; C do.c:893–920; not in js/; never own-row live/archived/parked). Probe: `node scripts/brief.mjs obj_no_longer_held`. **Addressed:** D-2393 `b7216a99`


- [x] `uhitm.c` mhitm_ad_slow mhitm-arm + dispatch (D-2043-named residual; mhitu arm live as mhitm_ad_slow_u; C uhitm.c:3652–3687 not in js/; never own-row live/archived/parked). Probe: `node scripts/brief.mjs mhitm_ad_slow`. **Addressed:** D-2392 `48716eb3`


- [x] `weapon.c` autoreturn_weapon always_toss (turns.md:3426-named; C weapon.c:520–529; 3 local clones in js/; never own-row live/archived/parked). Probe: `node scripts/brief.mjs autoreturn_weapon`. **Addressed:** D-2391 `3b146232`


- [x] `vault.c` wallify_vault body (turns.md:3746; move_gold D-1946 caller omitted; local clone in js/; never own-row live/archived/parked). Probe: `node scripts/brief.mjs wallify_vault`. **Addressed:** D-2390 `48e528df`


- [x] `do_wear.c` better_not_take_that_off (D-1602-named residual; C do_wear.c:2990–3010 stoning-corpse/gloves-name arms; not in js/; never own-row live/archived/parked). Probe: `node scripts/brief.mjs better_not_take_that_off`. **Addressed:** D-2389 `515afbee`


- [x] `pickup.c` floor TRADITIONAL query_classes (turns.md:1543 D-1620; D-2350 FOLLOW chain live; never own-row live/archived/parked). Probe: `node scripts/brief.mjs query_classes`. **Addressed:** D-2388 `585f3720`


- [x] `mhitu.c` gulpmu BLND visored-helmet + flat/uprops mirror (turns.md:3048 named residual, debt R-1076; gulpmu DGST/PHYS/ACID/DREN/DISE shipped D-1993/D-2110/D-2151/D-2161/D-2356; residual never own-row live/archived/parked). Probe: `node scripts/brief.mjs gulpmu`. **Addressed:** D-2387 `5c766aef`


- [x] `hack.c` handle_tip TIP_GETPOS arm (turns.md:410 deferred; TIP_ENHANCE D-1963 shipped; never own-row live/archived/parked). Probe: `node scripts/brief.mjs handle_tip`. **Addressed:** D-2386 `74e2f96f`


- [x] `weapon.c` use_skill may-advance arm (turns.md:410 deferred; give_may_advance_msg D-1963 shipped; never own-row live/archived/parked). Probe: `node scripts/brief.mjs use_skill`. **Addressed:** D-2385 `f285c65c`


- [x] `trap.c` back_on_ground full surface matrix (D-1011 deferred thin lava-rescue; turns.md:1617; never own-row live/archived/parked). Probe: `node scripts/brief.mjs back_on_ground`. **Addressed:** D-2384 `d6462205`


- [x] `region.c` region_danger/region_safety geometric residual (turns.md:1599; envelope D-1011/D-1169 shipped; residual never own-row live/archived/parked). Probe: `node scripts/brief.mjs region_safety`. **Addressed:** D-2383 `c30e0585`


- [x] `hack.c` findtravelpath TEST_TRAV/guess/travelmap (TOP30 #29: C 257 vs JS absent; travel `_` adjacent/greedy only; never own-row live/archived/parked). Probe: `node scripts/brief.mjs findtravelpath`. **Addressed:** D-2382 `87c59279`


- [x] `trap.c` float_up body (debt.md:14 D-0956 Ring_gone/float_up; never own-row live/archived/parked). Probe: `node scripts/brief.mjs float_up`. **Addressed:** D-2381 `828e88b4`


- [x] `lock.c` stumble_on_door_mimic PfSC clone drops uprops extrinsic (review 1339 QUALITY-RISK; `js/lock.js:618` flats-only vs C `youprop.h:355–360` H||E: worn PfSC ring sets uprops extrinsic with no E-flat mirror, clone stumbles where C is FALSE). Fix: import `js/were.js:57` export (`--can` SAFE). Probe: wear ring, open at door mimic. Source: reviews/loop-unattended/1339-ae5c5da2-stumble-on-door-mimic.md.


- [x] `potion.c` peffect_levitation body (debt.md:23 D-1419 POT/SPE_LEVITATION; never own-row live/archived/parked). Probe: `node scripts/brief.mjs peffect_levitation`. **Addressed:** D-2379 `ff517412`


- [x] `artifact.c` set_artifact_intrinsic W_ART-off invoked-toggle reversal via arti_invoke (C artifact.c:880-885; sync locus js/artifact.js:848 + js/invent.js:7361 freeinv_core with 25 freeinv sites incl. local shadows; async arti_invoke needs propagation vehicle; zap-poly half shipped alongside D-2371). Probe: `node scripts/brief.mjs set_artifact_intrinsic`. **Addressed:** D-2378 `e3d36021`


- [x] `potion.c` peffect_water body (debt.md:23 potionbreathe POT_WATER lycan residual; never own-row live/archived/parked). Probe: `node scripts/brief.mjs peffect_water`. **Addressed:** D-2377 `7c83a6ca`


- [x] `mkobj.c` shrink_glob body (data.md:287 thin shrink_glob with globby_bill_fixup; never own-row live/archived/parked). Probe: `node scripts/brief.mjs shrink_glob`. **Addressed:** D-2376 `f4c8bef2`


- [x] `do_name.c` minimal_monnam body (data.md:388 omit with mongone FALSE caller; never own-row live/archived/parked). Probe: `node scripts/brief.mjs minimal_monnam`. **Addressed:** D-2375 `aaaa5508`


- [x] `shk.c` globby_bill_fixup body (data.md:287 deferred with shrink ice-eat; never own-row live/archived/parked). Probe: `node scripts/brief.mjs globby_bill_fixup`. **Addressed:** D-2374 `12c4cda0`


- [x] `trap.c` stumble_on_door_mimic body (no `stumble_on_door_mimic` symbol in `js/`; data.md:176 named with move_into_trap; never own-row live/archived/parked). Probe: `node scripts/brief.mjs stumble_on_door_mimic`. **Addressed:** D-2373 `ae5c5da2`


- [x] `trap.c` move_into_trap body (no `move_into_trap` symbol in `js/`; data.md:176 named with stumble_on_door_mimic; never own-row live/archived/parked). Probe: `node scripts/brief.mjs move_into_trap`. **Addressed:** D-2372 `12cae556`


- [x] `artifact.c` arti_invoke on-drop invoke + zap-poly addinv_core1 (live js/artifact.js:1945; Deferred invoke-touch family; never own-row live/archived/parked). Probe: `node scripts/brief.mjs arti_invoke`. **Addressed:** D-2371 `1e326cc7`


- [x] `artifact.c` artitouch quest-artifact touch arms (no `artitouch` symbol in `js/`; Deferred invoke-touch family; never own-row live/archived/parked). Probe: `node scripts/brief.mjs artitouch`. **Addressed:** D-2370 `02f97953`


- [x] `spell.c` spelleffects non-standard cast otyps + oc_charged (D-2369 split: dovspell swap/sort shipped; remainder is turns.md:2961 named omits — remaining peffects mix/potionhit/potionbreathe, scroll-duplicate REMOVE_CURSE/CONFUSE_MONSTER/CAUSE_FEAR/IDENTIFY/CHARM_MONSTER, SPE_DRAIN_LIFE, doorlock/zap_updown/steed, traditional getspell yn, CQ_REPEAT/amulet drain; never own-row live/archived/parked). Probe: `node scripts/brief.mjs spelleffects`. **Addressed:** D-2369 `229bdd8a`


- [x] `spell.c` dovspell VIEW swap/sort + non-standard cast otyps/oc_charged (debt.md:20 residual; live js/spell.js:1310; never own-row live/archived/parked). Probe: `node scripts/brief.mjs dovspell`. **Addressed:** D-2369 `229bdd8a`


- [x] `sp_lev.c` is_ok_location HOT/WET/SOLID humidity arms + Is_waterlevel short-circuit (data.md:910 named; local clone js/mklev.js:18515, get_location park names the short-circuit unreached; never own-row live/archived/parked). Probe: `node scripts/brief.mjs is_ok_location`. **Addressed:** D-2368 `4b4edfa4`


- [x] `pray.c` bestow_artifact body + caller wiring (no `bestow_artifact` symbol in `js/`; archived #77/D-2337 shipped the `mk_artifact` callee only with caller unwired per its text; D-2345 names the corpse-gift path untouched as its own row; `js/pray.js:25` header-named; prayer/sacrifice family reached by the corpus — pat_on_head gifts own Open row; never own-row live/archived/parked). Probe: `node scripts/brief.mjs bestow_artifact`. **Addressed:** D-2367 `72c7ee76`


- [x] `zap.c` resist tell-shield `shieldeff_mon` arm (C zap.c:6143-6144 `if (tell)`; turns.md:563 residual "tell-shield stay deferred"; archived D-2116 row is the rn2-roll/alev arms, not this arm; zap.js export defers it per D-2357; never own-row live/parked). Probe: `node scripts/brief.mjs resist`. **Addressed:** D-2366 `80a89d3e`


- [x] `monmove.c` mon_would_consume_item body (underfoot/can_carry family turns.md:2768, D-0183/D-0223 shipped the wiring; never own-row live/archived/parked). Probe: `node scripts/brief.mjs mon_would_consume_item`. **Addressed:** D-2365 `dc39711c`


- [x] `muse.c` searches_for_item FOOD corpse/tin/egg + can_blow polish (D-0598 shipped potion/wand/scroll/amulet/tool subset; Is_container/Is_mbag D-0861; turns.md:2768; never own-row live/archived/parked). Probe: `node scripts/brief.mjs searches_for_item`. **Addressed:** D-2364 `f35ffe91`


- [x] `mhitm.c` sleep_monst trap-path clone defended/shieldeff (trap.js `sleep_monst` keeps its own named omit, turns.md:2000; sleep-gas/steed callers pass how=-1 so C still checks resists_sleep/defended + shieldeff, data.md:1065 D-0256; music path live D-2357; never own-row live/archived/parked). Probe: `node scripts/brief.mjs sleep_monst`. **Addressed:** D-2363 `d26385df`


- [x] `pray.c` pleased pat_on_head gift cases 1-4/6/7-8 + give_spell (named turns.md:410 + js/pray.js:19-21; case-5 shipped D-2219; never own-row live/archived/parked). Probe: `node scripts/brief.mjs pat_on_head`. **Addressed:** D-2362 `135bb101`


- [x] `eat.c` doeat Strangled/uedibility/retouch-blast/rustproof arms (named turns.md:1816-1818 deferred; check_capacity/hands_obj/worn/slow-digestion/nonfood live; never own-row live/archived/parked). Probe: `node scripts/brief.mjs doeat`. **Addressed:** D-2361 `719c1a6a`


- [x] `zap.c` break_statue STATUE_TRAP activate (named debt.md D-0997; never live/archived/parked). Probe: `node scripts/brief.mjs break_statue`. **Addressed:** D-2360 `2c1456a0`


- [x] `zap.c` melt_ice/melt_ice_away/start_melt_ice_timeout + burn_floor_objects (named debt.md D-0965; never live/archived/parked). Probe: `node scripts/brief.mjs melt_ice`.


- [x] `mthrowu.c` hits_bars thrown-through-bars (named debt.md D-0990; never live/archived/parked). Probe: `node scripts/brief.mjs hits_bars`. **Addressed:** D-2358 `cb0e739f`


- [x] `music.c` charm_snakes/calm_nymphs/charm_monsters flute/harp (named debt.md D-0974; never live/archived/parked). Probe: `node scripts/brief.mjs charm_monsters`. **Addressed:** D-2357 `d8cfa25c`


- [x] `apply.c` Blindf_on/Blindf_off BLINDFOLD/LENSES (named debt.md D-1013; never live/archived/parked). Probe: `node scripts/brief.mjs Blindf_on`. **Addressed:** D-2356 `c7041cb5`


- [x] `apply.c` use_lamp residual (named debt.md D-1023/D-1052; use_candle D-1025 + DONE arms shipped; never own-row live/parked). Probe: `node scripts/brief.mjs use_lamp`. **Addressed:** D-2355 `aba73268`


- [x] `makemon.c` bagotricks BAG_OF_TRICKS (named debt.md D-1023 family; never live/archived/parked). Probe: `node scripts/brief.mjs bagotricks`. **Addressed:** D-2354 `2ac37870`


- [x] `invent.c` getobj prompt/filter machinery (TOP30 #13, 334/133, in_doagain + prompt/filter; every "What do you want" prompt; archived ALLOWCNT arm D-1530 only; never live/parked). Probe: `node scripts/brief.mjs getobj`. **Addressed:** D-2353 `589d9acb`


- [x] `pickup.c` query_objlist_pickup count-N PICK_ONE arm runs the PICK_ANY-only FEEL_COCKATRICE abort + SORTLOOT_PETRIFY augment (C gates both on `qflags & FEEL_COCKATRICE`, set only at `pickup.c:774-776`). Fix: gate `sortflags |= SORTLOOT_PETRIFY` and the will_feel abort on `how === PICK_ANY`. Source: reviews/loop-unattended/1316-b214fb72-pickup-floor-pickup-body.md. **Addressed:** D-2352 `9cc2b25f`


- [x] `end.c` done_in_by vampire-bat arm fires on `!==` where C fires on equality (`!strcmp(fakenm, "vampire bat")`, `end.c` imitator arm) — shifted-vampire epitaphs contradict C in both directions (bat form keeps "vampire bat", fog form forced to "bat"). Fix: `js/end.js:1241` `!==` → `===`. Source: reviews/loop-unattended/1314-aa08fdb3-done-in-by-imitator-predicate.md. **Addressed:** D-2351 `736bd185`


- [x] `pickup.c` pickup floor-pickup body (TOP30 honourable mention, 238/135; reached by 374 corpus traces; archived rows are narrow arms safe_qbuf D-1654/observe_quantum_cat D-1535; never live/parked). Probe: `node scripts/brief.mjs pickup`. **Addressed:** D-2350 `b214fb72`


- [x] `apply.c` use_grease CAN_OF_GREASE (named debt.md:16 D-1026; never live/archived/parked). Probe: `node scripts/brief.mjs use_grease`. **Addressed:** D-2349 `18f6e38f`


- [x] `end.c` done_in_by imitator predicate uses JS object identity (`mptr !== champtr`, `js/end.js:1208`) where C compares permonst pointers (`end.c:184-190`) — true-form shifters (birth-state `cham == mndx`, `makemon.c:1355-1359`) wrongly take the D-2341 imitator arm ("chameleon imitating a chameleon") and lose G_UNIQ "the ". Fix: compare `mndx` indices. Source: reviews/loop-unattended/1307-c22b911d-death-disclosure-epitaphs.md. **Addressed:** D-2348 `aa08fdb3`


- [x] `uhitm.c` mhitm_knockback attack-selection (fresh corpus owner 2026-09-15: scen-wish-Priest-92163 step 248 kind=rng, C `rn2(3)` in mhitm_knockback vs JS `rn2(8)` from mhitm_ad_drst_u; knockback body full since D-1932 per archived D-2035/D-2091 — this row is the arm-selection upstream, not the body; no live/parked owner row, archived rows are other sessions). Probe: `node scripts/hidden-proxy.mjs verify mhitm_knockback`. **Addressed:** D-2347 `e2d16801`


- [x] `apply.c` do_break_wand explode-type/inert + create-monster + dig pay_for_damage (named debt.md:16, D-0949/D-0950 residual; never live/archived/parked). Probe: `node scripts/brief.mjs do_break_wand`. **Addressed:** D-2346 `3f6c64d3`


- [x] `pray.c` offer_real_amulet/offer_fake_amulet amulet offering arms (named turns.md:399 dosacrifice family; never live/archived/parked). Probe: `node scripts/brief.mjs offer_real_amulet`. **Addressed:** D-2345 `dd78cfac`


- [x] `pray.c` angry_priest temple-priest anger (named turns.md:399 dosacrifice family; never live/archived/parked). Probe: `node scripts/brief.mjs angry_priest`. **Addressed:** D-2344 `c2a2a6fd`


- [x] `pray.c` offer_different_alignment_altar altar-wrath offering (named turns.md:399 dosacrifice family; never live/archived/parked). Probe: `node scripts/brief.mjs offer_different_alignment_altar`. **Addressed:** D-2343 `b52af340`


- [x] `sp_lev.c` spo_end_moninvent m_dowear for Kni-strt King Arthur + Mon-strt Grand Master custom invents (follow-up to the shipped Pelias/Lord Carnarvon/Arch Priest quest-invent wear row; still deferred at the Kni/Mon loaders in js/mklev.js; never live/archived/parked). Probe: `node scripts/brief.mjs m_dowear`. **Addressed:** D-2342 `c2fdbd1f`


- [x] `dungeon.c` save_dungeon — blocks 8/553 corpus sessions (first at step 113): C «The Dungeons of Doom:» vs JS «The Dungeons of Doom:». Probe: `node scripts/hidden-proxy.mjs verify save_dungeon` (scen-genesis-Barbarian-91118, scen-normal-Caveman-92140, scen-poly-Archeologist-92119; queue refill 2026-09-15 — top unarchived weight; 09-07 MISATTRIBUTED park predates scoreboard, next iter measures the C overview-menu writer or re-parks). **Addressed:** D-2341 `c22b911d`


- [x] `monmove.c` can_hide_under_obj coins/pet-cursed/cockatrice (named data.md:462, D-0630 residual; mon.c hideunder callers; never live/archived/parked). Probe: `node scripts/brief.mjs can_hide_under_obj`. **Addressed:** D-2340 `09146ec5`


- [x] `mon.c` mongone MM_NOCOUNTBIRTH born tally (named data.md:1098, D-0538 residual; savebones/mdrop_special_objs are other rows; never live/archived/parked). Probe: `node scripts/brief.mjs mongone`. **Addressed:** D-2339 `abcd52ce`


- [x] `trap.c` blow_up_landmine fill_pit/drawbridge/which_armor-iron-shoes/steedintrap (named data.md:1070, D-0874 residual; mintrap/teleds/scatter arms are other rows; never live/archived/parked). Probe: `node scripts/brief.mjs blow_up_landmine`. **Addressed:** D-2338 `a5d8009f`


- [x] `pray.c` bestow_artifact gift chance + mk_artifact call (named turns.md:399, D-2337 follow-up — callee shipped, caller unwired; pray.js:2200 comment; never live/archived/parked). Probe: `node scripts/brief.mjs bestow_artifact`. **Addressed:** D-2337 `0b271ba2`


- [x] `artifact.c` mk_artifact by_align/gift_value/gen_spe (named data.md:272, D-0759 residual; never live/archived/parked). Probe: `node scripts/brief.mjs mk_artifact`. **Addressed:** D-2337 `0b271ba2`


- [x] `sp_lev.c` flip_level lregion coord update (named data.md:773; never live/archived/parked). Probe: `node scripts/brief.mjs flip_level`. **Addressed:** D-2336 `c5f1048b`


- [x] `mon.c` m_dowear Pelias/Lord Carnarvon/Arch Priest quest specials (named data.md:785; worn.c m_dowear_type is a different fn; never live/archived/parked). Probe: `node scripts/brief.mjs m_dowear`. **Addressed:** D-2335 `5076ec8d`


- [x] `sp_lev.c` map_cleanup deltrap/del_engr arms (named data.md:667, D-0774 residual; never live/archived/parked). Probe: `node scripts/brief.mjs map_cleanup`. **Addressed:** D-2334 `d8a41af3`


- [x] `apply.c` dorub #rub/wield_tool envelope (named turns.md:1911 re-queue, D-0710; never live/archived/parked). Probe: `node scripts/brief.mjs dorub`. **Addressed:** D-2333 `0d320968`


- [x] `pray.c` angrygods high-anger arms (named absent.md:13, post-D-0969 residual; 0–8/default-zap shipped; never live/archived/parked). Probe: `node scripts/brief.mjs angrygods`. **Addressed:** D-2332 `ce42f088`


- [x] `apply.c` use_royal_jelly full body (named absent.md:34 + turns.md:2014 deferred, D-1021; JS local-only partial; never live/archived/parked). Probe: `node scripts/brief.mjs use_royal_jelly`. **Addressed:** D-2331 `e39f3bf8`


- [x] `trap.c` launch_obj closed-door crash-through arm (named D-2318 residual, C trap.c:3533–3541; C arm is that small; never live/archived/parked). Probe: `node scripts/brief.mjs launch_obj`. **Addressed:** D-2330 `4d1f4fce`


- [x] `ball.c` drop_ball punish-drop (TOP30 queue-mapping named; no JS symbol; never live/archived/parked). Probe: `node scripts/brief.mjs drop_ball`. **Addressed:** D-2329 `e23e920d`


- [x] `steed.c` use_saddle (named absent.md:29, D-1008; never live/archived/parked). Probe: `node scripts/brief.mjs use_saddle`. **Addressed:** D-2328 5622d826


- [x] `dig.js` `surface` clone drawbridge-under nouns (C `dungeon.c` `surface` `:1749–1788` via `SURFACE_AT` `rm.h:146` + `db_under_typ`/`is_pool`/`is_lava`/`is_ice` `dbridge.c`; clone prints "ground" where C prints water/molten lava/ice on the D-2323 `DRAWBRIDGE_UP` cop-out — message-only, 0 blocks). Probe: pickaxe-down on closed drawbridge with failed `fillholetyp` fluid rolls. Source: reviews/loop-unattended/1289-0e191fab-dighole-magical-drawbridge-bymagic.md. **Addressed:** D-2327 `348a7846`


- [x] `invent.js` `u_adtyp_resistance_obj` dwarvish-cloak 90 arm (C `zap.c:5690–5694`; helper comment admits "deferred", map-unnamed; new D-2325 `erode_obj` BURN gate draws no `rn2(100)` where C wards 90 — RNG-live). Probe: dwarvish cloak worn + `ERODE_BURN` hero invent. Source: reviews/loop-unattended/1291-d43e86c1-erode-obj-full-body.md.


- [x] `trap.c` erode_obj rust/verbose + grease/towel/container/acid-boom arms (named data.md:1078, post-D-2186 residual; never live/archived/parked). Probe: `node scripts/brief.mjs erode_obj`. **Addressed:** D-2325 `d43e86c1`


- [x] `mkobj.c` mergable FOOD `oeaten`/`orotten` + unpaid/erosion/candle arms (named data.md:264, D-0923; never live/archived/parked). Probe: `node scripts/brief.mjs mergable`.


- [x] `dig.c` DRAWBRIDGE_UP-ice + dothrow hurtle + u_on_rndspot + objnam-wish residuals (named debt.md:17 dig.js row; post-D-2323/D-2321/D-2319; never live/archived/parked). Probe: `node scripts/brief.mjs zap_dig`. **Addressed:** D-2323 `0e191fab`


- [x] `dig.c` DRAWBRIDGE_UP-ice + dothrow hurtle + u_on_rndspot + objnam-wish residuals (named debt.md:17 dig.js row; post-D-2323/D-2321/D-2319; never live/archived/parked). Probe: `node scripts/brief.mjs zap_dig`. **Addressed:** D-2323 `0e191fab`


- [x] `dig.c` dighole DRAWBRIDGE_UP + magical-trap explode arms (JS-doc named omit js/dig.js dighole; C dig.c:885 dighole). Probe: `node scripts/brief.mjs dighole`. **Addressed:** D-2323 `0e191fab`


- [x] `dig.c` zap_dig swallowed-pierce arm (JS early-return `if (u.uswallow)` js/dig.js zap_dig; C dig.c:1569-1582 pierce pline + mhp + expels). Probe: `node scripts/brief.mjs zap_dig`. **Addressed:** D-2322 `3782e831`


- [x] `dig.c` zap_dig pitdig branch via adj_pit_checks/pit_flow (JS stub `if (pitdig) break` + `pit_flow deferred` in zap_dig; C dig.c:1617-1662 branch + :1763 adj_pit_checks + :1844 pit_flow). Probe: `node scripts/brief.mjs adj_pit_checks`. **Addressed:** D-2321 `95c162ad`


- [x] `dokick.c` kick_door shop/watchman arms (debt.md D-0947; C dokick.c kick_door). Probe: `node scripts/brief.mjs kick_door`. **Addressed:** D-2320 `031ebb3a`


- [x] `dig.c` watch_dig shop-dig arms (debt.md D-0941; C dig.c watch_dig). Probe: `node scripts/brief.mjs watch_dig`. **Addressed:** D-2319 `df21066c`


- [x] `dokick.c` ship_object + otransit_msg ship-floor polish (debt.md D-0984; C dokick.c ship_object). Probe: `node scripts/brief.mjs ship_object`. **Addressed:** D-2318 `f028aee2`


- [x] `trap.c` openholdingtrap/openfallingtrap + Punished boxlock arms (debt.md D-0981; C trap.c:6101 openholdingtrap). Probe: `node scripts/brief.mjs openholdingtrap`. **Addressed:** D-2317 48f96186


- [x] `dbridge.c` open_drawbridge/close_drawbridge + music passtune (debt.md D-0977; C dbridge.c:840 open_drawbridge). Probe: `node scripts/brief.mjs open_drawbridge`. **Addressed:** D-2316 `cb720cc9`


- [x] `music.c` do_earthquake quake arms (debt.md D-0972; C music.c:344 do_earthquake). Probe: `node scripts/brief.mjs do_earthquake`. **Addressed:** D-2315 `f5d3798f`


- [x] `dig.c` impact_drop/down_gate/drop_to HOLE wire (debt.md D-0961; C dig.c impact_drop). Probe: `node scripts/brief.mjs impact_drop`. **Addressed:** D-2314 `00e88b95`


- [x] `dig.c` destroy_drawbridge/find/is_wall + dig wires (debt.md D-0959; C dig.c destroy_drawbridge). Probe: `node scripts/brief.mjs destroy_drawbridge`. **Addressed:** D-2313 00ed5bbc


- [x] `dig.c` dig_typ/pick_can_reach/is_digging pick-axe occupation residuals (debt.md D-0951; C dig.c dig_typ). Probe: `node scripts/brief.mjs dig_typ`. **Addressed:** D-2312 `8fd36dc4`


- [x] `dig.c` dig_check/fillholetyp/maybe_dunk_boulders hole-typing residuals (debt.md D-0950; digactualhole switch_terrain archived D-1269; liquid_flow ice/unearth rides the bury row). Probe: `node scripts/brief.mjs dig_check`. **Addressed:** D-2311 `4d8e68fb`


- [x] `trap.c` conjoined_pits/xytodir + autodig quiet + dighole boulder-fill/delfloortrap (debt.md D-0962; C trap.c:6551 conjoined_pits). Probe: `node scripts/brief.mjs conjoined_pits`.


- [x] `pray.c` desecrate_altar/god_zaps_you/fry_by_god + dig wire (debt.md D-0963; C pray.c:609 god_zaps_you). Probe: `node scripts/brief.mjs god_zaps_you`. **Addressed:** D-2309 `6ce28063`.


- [x] `shk.c` shopdig warn/snatch (debt.md D-0958; C shk.c:5018 shopdig; dig-shop damage/anger unwired). Probe: `node scripts/brief.mjs shopdig`. **Addressed:** D-2308 `ef75880a`


- [x] `dig.c` bury family: bury_an_obj/bury_objs/unearth_objs/rot_organic + liquid_flow ice/unearth (debt.md D-0967; C dig.c:1982 bury_an_obj; no JS bury/unearth/rot_organic). Probe: `node scripts/brief.mjs bury_an_obj`. **Addressed:** D-2307 `4fac3591`


- [x] `cmd.c` rhack `-`→fight binding (fresh rescore 2026-09-14: **Addressed:** D-2306 `29aedc7f`, ownerless screen step, C«» vs JS«Unknown command '-'» — C number_pad map binds `-` to fight, cmd.c:2772, consumed via cmdbind_get in rhack :3679; no `'-'` binding in js/cmd.js so JS falls to the Unknown-command arm js/cmd.js:3074). Probe: `node frozen/ps_test_runner.mjs .cache/hidden/sessions/random-seed0015-valk-level2-pit-dog-wait-eb7e90ad.session.json` (step 33/72) + `node scripts/brief.mjs rhack`.


- [x] `trap.c` untrap floor disarm_*/box residuals (data.md:176; D-1495 shipped the UNTRAP door-force callee; disarm_holdingtrap/disarm_landmine/disarm_shooting_trap/disarm_box/help_monster_out still named). Probe: `node scripts/brief.mjs untrap`. **Addressed:** D-2305 `9881e89f`


- [x] `mkmaze.c` populate_maze trap loop (data.md:923; D-2216 shipped the live tail + fallback; loop needs mktrap — no JS mktrap — plus dmonsfree/SPLEVTYPE-getenv). Probe: `node scripts/brief.mjs populate_maze`. **Addressed:** D-2304 `4581ce02`

## 2026-09-14

- [x] `explode.c` scatter MAY_FRACTURE boulder restack-to-top (data.md:1065; D-2282 shipped the shop-bill arms; C explode.c:776-790 fracture_rock + sobj_at restack). Probe: `node scripts/brief.mjs scatter`. **Addressed:** D-2303 `3010c0c3`


- [x] `light.c` do_light_sources hero at_hero_range trim (data.md:968; D-2157 shipped the circle_ptr exact ring). Probe: `node scripts/brief.mjs do_light_sources`. **Addressed:** D-2302 `d961718b`


- [x] `trap.c` armor-erode materialnm helm prefix (data.md:1076; D-2186 canonicalized the burn/water/rock stubs; helm-prefix arm still named). Probe: `node scripts/brief.mjs materialnm`. **Addressed:** D-2301 `775e5959`


- [x] `worm.c` place_wsegs restore/replmon callers (data.md:627; D-1573 shipped wormgone + toss_wsegs; restore/replmon place_wsegs sites still named). Probe: `node scripts/brief.mjs place_wsegs`. **Addressed:** D-2300 `d8b36251`


- [x] `makemon.c` makemon place_monster grid (data.md:528; D-2299 deferred grid write; needs movement remove+place parity). Probe: `node scripts/brief.mjs makemon`. **Addressed:** D-2299 `d633d068`


- [x] `mon.c` place_monster cutworm/makemon callers (data.md:523; D-1565 shipped clone_mon 2D grid; cutworm/makemon sites still named). Probe: `node scripts/brief.mjs place_monster`. **Addressed:** D-2299 `d633d068`


- [x] `pager.c` doidtrap `^` single-cell trap examine (turns.md farlook + D-2298 named; C pager.c:2335+ glyph trap/chest/door arms + ftrap-chain tseen examination; no JS doidtrap). Probe: `node scripts/brief.mjs doidtrap`. **Addressed:** D-2298 `dee0904f`


- [x] `detect.c` trapped_chest_at/trapped_door_at glyph callers pass ttyp not glyph_to_trap (data.md:1003-1009; D-1779 shipped trap_description; C detect.c:135-197). Probe: `node scripts/brief.mjs trapped_chest_at`. **Addressed:** D-2298 `dee0904f`


- [x] `region.c` create_region box/nrects (data.md:952; D-1962 shipped inside_rect/inside_region). Probe: `node scripts/brief.mjs create_region`. **Addressed:** D-2297 `bc47b92b`


- [x] `worm.c` wormgone mondead/dog callers (data.md:623-624; D-1573 shipped body + toss_wsegs + newcham head-back; mon.c:2787 / dog.c:755 still named). Probe: `node scripts/brief.mjs wormgone`. **Addressed:** D-2296 `71b0e959`


- [x] `cmd.c` makemap_prepost kill_genocided_monsters (data.md:350; D-1097/D-1190 residual; do.c goto_level caller shipped D-1190; C cmd.c:1048). Probe: `node scripts/brief.mjs makemap_prepost`. **Addressed:** D-2295 `66311ced`


- [x] `makemon.c` birth knowledge residuals — mpeaceful MM_ANGRY arm + mwandexp save/restore (data.md:531; D-2107 shipped the Sokoban/stronghold/leader/mwandexp core, makemon.c:1283-1294). Probe: `node scripts/brief.mjs makemon`. **Addressed:** D-2294 `e6f16d72`


- [x] `wizcmds.c` wish count-prefix + unavailcmd + make_blinded talk variants (D-2283 residuals). Probe: `node scripts/brief.mjs do_wish`. **Addressed:** D-2293 `ef5edc3c`


- [x] `artifact.c` spec_dbon/spec_applies SPFX_DRLI destroy/ignite arms (data.md:119-120; live `js/artifact.js:156/598/2426` defer BEHEAD/DRLI). Probe: `node scripts/brief.mjs artifact_hit`. **Addressed:** D-2292 `6e17d879`


- [x] `artifact.c` artilist DFLAG2 yours/Upolyd/ulycn arms (data.md:107; D-2220 shipped DFLAG1 mflags1; live `js/artifact.js:1931` names the DFLAG2 residual). Probe: `node scripts/brief.mjs spec_applies`. **Addressed:** D-2291 `08a179ab`


- [x] `trap.c` steedintrap dart/arrow/landmine/poly caller wiring (data.md:1063-1064; D-2258 helper is full but dart/arrow `!rn2(2)` steedintrap / landmine / poly trapeffects still do not call it). Probe: `node scripts/brief.mjs steedintrap`. **Addressed:** D-2290 `10178807`


- [x] `apply.c` splash_lit pot_acid_damage boom + SPE_NOVEL blank_novel residuals (data.md trap section; D-1337 shipped the body; live `js/trap.js:5058/5084/5126` defer both arms). Probe: `node scripts/brief.mjs splash_lit`. **Addressed:** D-2289 `48180ad1`


- [x] `trap.c` mlevel_tele_trap — MAGIC_PORTAL/LEVEL_TELEP arms (data.md:1085; valley/stronghold dest; monster level-teleport messages + RNG). Probe: `node scripts/brief.mjs mlevel_tele_trap`. **Addressed:** D-2288 `e210b23d`


- [x] `fountain.c` dipfountain residuals — Excalibur body + uncurse arms (C fountain.c:441; data.md:1230-1236, D-1107/D-1114 residuals: lawful oname/discover/bless, unaligned curse + spe--, `update_inventory`, artidisco save/rest, coins-not-skipped, luck/lamplit). Probe: `node scripts/brief.mjs dipfountain`. **Addressed:** D-2287 `f08d0f46`


- [x] `lock.c` pick_lock — feel/see arms (C lock.c:591/:851/:1015 `Blind ? "feel" : "see"`; corpus-reached scen-normal-Samurai-92071 step 175/205 «You feel/see no door there»; JS `lock.js:861/868` hardcodes "see", Blind feel_location/mapseen named at :822; adjattrib-park falsifier). Probe: `node scripts/brief.mjs pick_lock`. **Addressed:** D-2286 `790ef0a4`


- [x] `invent.c` sobj_at residual clones — exact-name clones in dbridge/music/steed + 7 renamed same-body variants (monmove/shk/apply×2/dothrow/pager/mon; follow-up to the D-log sobj_at canonical entry, 9 of 12 retired — 10-file cap cut). Probe: `node scripts/brief.mjs sobj_at`. **Addressed:** D-2285 `1d169d4a`


- [x] `trap.c` drown — crawl-out / Amphibious / inventory-burn arms (TOP30 #23; 14 C callers; pit/water sessions). Probe: `node scripts/brief.mjs drown`. **Addressed:** D-2284 `8c4803e9`


- [x] `end.c` really_done — death-disclosure tail arms (TOP30 #21; reached by every scen-death session). Probe: `node scripts/brief.mjs really_done`. **Addressed:** D-2283 `7942532c`


- [x] `shk.c` credit_report — shop credit/debit report (C shk.c:628; no live export; named data.md:1049, D-2274 residual). Probe: `node scripts/brief.mjs credit_report`. **Addressed:** D-2282 `8d7e09a9`


- [x] `invent.c` sobj_at residual clones — exact-name clones in dbridge/music/steed + 7 renamed same-body variants (sobj_at_monmove/shk/nexthere/otyp×2/hurtle/look; D-2281 retired 9 of 12 to the `js/mkobj.js` canonical, cut by the 10-file cap). Probe: `node scripts/brief.mjs sobj_at`. **Addressed:** D-2281 `203f6f60`


- [x] `invent.c` sobj_at canonical export — boulder-restack pile scan (12 local clones, no canonical export; named data.md:1049, D-2274 residual). Probe: `node scripts/brief.mjs sobj_at`. **Addressed:** D-2281 `203f6f60`


- [x] `timeout.c` obj_move_timers — migrating-object timer carry (C timeout.c:2339; named data.md:239, D-1572 envelope; copy_oextra-envelope residual). Probe: `node scripts/brief.mjs obj_move_timers`. **Addressed:** D-2280 `93fca552`


- [x] `light.c` obj_split_light_source — light-source split on stack split (named data.md:300 "light", js/mkobj.js:349, js/apply.js:4853; copy_oextra-envelope residual). Probe: `node scripts/brief.mjs obj_split_light_source`. **Addressed:** D-2279 `03e14d51`


- [x] `shk.c` splitbill — unpaid split billing on stack split (named data.md:300, debt.md:14 eat.js "unpaid splitbill", js/mkobj.js:349; copy_oextra-envelope residual). Probe: `node scripts/brief.mjs splitbill`. **Addressed:** D-2278 `80a22605`


- [x] `monmove.c` mb_trapped dig/lock twins — trapped-door `mondied`/lifesave + `mon_learns_traps(TRAPPED_DOOR)` still stubs in `dig.js:940` + `lock.js:794` (canonical export shipped this iteration in `monmove.js`; lock's keeps `wake_nearto`, dig's lacks it; corpus reaches trapped-door arms via monmove door-smash + dig/lock paths). Probe: `node scripts/brief.mjs mb_trapped`. **Addressed:** D-2277 `3fcfefe2`


- [x] `insight.c` attributes_enlightenment Upolyd foreign-shape arm — blocks 2/553 corpus sessions: C « You were polymorphed into a yeti (106).» vs JS « You were fast innately.» (one-row menu shift; the «polymorphed into %s» + wizard `(mtimedone)` row, insight.c:1866–1878, is missing from both `invent.js` builders — named deferred js/invent.js:5675–5698). Probe: `node scripts/hidden-proxy.mjs verify chwepon` (scen-poly-Samurai-91106@133, scen-poly-Monk-92213@109; recorded owner `chwepon` wield.c:940 is the draw-free `exercise` tie-break — true printers are the poly-form arms, chwepon park). **Addressed:** D-2276 `1237c4d4`


- [x] `mkobj.c` copy_oextra / dealloc_oextra / extract_nobj tails — oextra copy/free + nobj-list extract in the delobj path (named data.md:300-301). Probe: `node scripts/brief.mjs copy_oextra`. **Addressed:** D-2275 `64fb2e96`


- [x] `explode.c` scatter — landmine `blow_up_landmine` object-scatter arm (named data.md:1046). Probe: `node scripts/brief.mjs scatter`. **Addressed:** D-2274 `075d9c80`


- [x] `mon.c` vamprises door-trap kill arm — vampire smashing a trapped door (door smash shipped D-2231; data.md:372-373). Probe: `node scripts/brief.mjs vamprises`. **Addressed:** D-2273 `b5711dd9`


- [x] `shk.c` shkgone damage + has_shop arms (named in mondead-tail D-2231 row; data.md:373). Probe: `node scripts/brief.mjs shkgone`. **Addressed:** D-2272 `7a2ef83e`


- [x] `steal.c` thiefdead stealarm arm — stolen-goods restoration when a thief dies (named in mondead-tail D-2231 row; data.md:373). Probe: `node scripts/brief.mjs thiefdead`. **Addressed:** D-2271 `0f159258`


- [x] `questpgr.c` stinky_nemesis — nemesis stinking-cloud gas arm (named in `mon.c` mondead-tail D-2231 row; data.md:373). Probe: `node scripts/brief.mjs stinky_nemesis`. **Addressed:** D-2270 `04af89bd`


- [x] `insight.c` enlightenment — blocks 1/553 corpus sessions (first at step 226): C «Wizard the Rogue's attributes:» vs JS «Wizard the Rogue's attributes:». Probe: `node scripts/hidden-proxy.mjs verify enlightenment` (scen-wish-Rogue-92037). **Addressed:** D-2269 `a7db375d`


- [x] `hacklib.c` s_suffix — `js/uhitm.js` local `s_suffix` appends `'` after z/x/ch/sh; C appends `'` only after `s` (`it`→`its`, `you`→`your`, else `'s`). Import `do_name.js` `s_suffix` for the uhitm callers (cream-pie splash, shatter, face, grease). No corpus block (D-2261 Next). Probe: `node scripts/brief.mjs s_suffix`. **Addressed:** D-2268 `1f904287`


- [x] `do_wear.c` Cloak_on — blocks 1/553 corpus sessions (first at step 129): C «The slippery cloak fits very tightly.--More--» vs JS «You are now wearing a slippery cloak.» (oilskin arm). Probe: `node scripts/hidden-proxy.mjs verify Cloak_on` (scen-wish-Rogue-92137). **Addressed:** D-2267 `d739cce2`


- [x] `cmd.c` there_cmd_menu_next2u — blocks 1/553 corpus sessions (first at step 77): C «Ia remembered, unseen, creature» vs JS «La lich (it)» (remembered-invisible glyph vs seen monster in the next-to-you menu). Probe: `node scripts/hidden-proxy.mjs verify there_cmd_menu_next2u` (scen-tour-Wizard-91112). **Addressed:** D-2266 `9ac4640d`


- [x] `mkobj.c` mksobj_init — per-class object init arms vs C (`mkobj.c:868–1175`). Corpus reach: in 2 failing sessions' diverged-step traces (scen-tour-Healer-92042, scen-tour-Tourist-92100; committed scoreboard f7aec9b3). Probe: `node scripts/brief.mjs mksobj_init`. **Addressed:** D-2265 `8c1c209d`


- [x] `makemon.c` makemon_rnd_goodpos — random-placement loop vs C (`makemon.c:1075–1137`). Corpus reach: in 2 failing sessions' diverged-step traces (scen-intrinsic-Barbarian-92165, scen-poly-Caveman-92202; committed scoreboard f7aec9b3). Probe: `node scripts/brief.mjs makemon_rnd_goodpos`. **Addressed:** D-2264 `b805da3c`


- [x] `read.c` litroom gremlin light hits + Punished `move_bc` — litroom deferrals named D-2250 (gremlin `light_hits_gremlin` loop, ball-and-chain redisplay). No corpus block. Probe: `node scripts/brief.mjs litroom`. **Addressed:** D-2263 `70358552`

## 2026-09-10

- [x] `polyself.c` polymon were `do_shift` + draconian `do_merge`/uskin merge + `POLY_REVERT` — polymorph-control arms still named (D-2248). No corpus block — port the named arms. Probe: `node scripts/brief.mjs polymon`. **Addressed:** D-2262 `635fe331`


- [x] `uhitm.c` damageum_adtyping hero-poly arms SGLD/CURS/DCAY/SLIM — `damageum_adtyping` (`js/uhitm.js:1735`) lacks them (purse grab + `exercise(A_DEX)`, `night() && !rn2(10)` chuckle/cancel, rot `xkilled` + `erode_armor`, `!rn2(4)` `munslime`/`newcham` green slime). Named in `c-js-map/turns.md` hitmu→mhitm_adtyping line. No corpus block. Probe: `node scripts/brief.mjs damageum_adtyping`. **Addressed:** D-2261 `3c20f022`


- [x] `uhitm.c` mhitm_ad_curs/dcay/deth mhitm (mon→mon) arms — `mdamagem` (`js/mhitm.js`) has no AD_CURS/AD_DCAY/AD_DETH case (gremlin `rn2(10)` cancel + clay-golem `mondied`, `completelyrots` `monkilled` + `erode_armor(ERODE_ROT)`, Death undead `rnd(dmg/2)` + drli). Named in `c-js-map/turns.md` hitmu→mhitm_adtyping line. No corpus block — port the named arms. Probe: `node scripts/brief.mjs mhitm_ad_curs`. **Addressed:** D-2260 `9d218d29`


- [x] `uhitm.c` mhitm_ad_curs/dcay/slim mhitu PM identity — JS `mtmp.data === mons[PM_GREMLIN]` / `pd === mons[PM_WOOD_GOLEM|LEATHER_GOLEM|GREEN_SLIME]` is always false (`mons()` is a fresh-object factory; `mons[n]` is undefined). Daytime gremlin still draws `rn2(10)` (C returns first). Use `(data?.mndx | 0) === PM_*` like `hates_light` / `is_wooden`. Same one-liner already dead in `rust_u` / `fire_u`. Source: reviews/loop-unattended/1217-c8fbe227-mhitm-adtyping-mhitu-arms.md. **Addressed:** D-2259 `e277f895`


- [x] `trap.c` trapeffect_magic_trap — magic-trap effect thin vs C (`trap.c:2292–2320` staticfn). Corpus reach: in 2 failing sessions' diverged-step traces (committed scoreboard f7aec9b3, 2026-09-09). Probe: `node scripts/brief.mjs trapeffect_magic_trap`. **Addressed:** D-2258 `a74f318a`


- [x] `mthrowu.c` m_lined_up — lined-up predicate thin vs C (`mthrowu.c:1375–1393` staticfn; buzzmu-adjacent, distinct function). Corpus reach: in 2 failing sessions' diverged-step traces (committed scoreboard f7aec9b3, 2026-09-09). Probe: `node scripts/brief.mjs m_lined_up`. **Addressed:** D-2257 `9ea0c9bc`


- [x] `sp_lev.c` splev_initlev — level-init dispatch thin vs C (`sp_lev.c:2981–3018` staticfn; tour-arrival path). Corpus reach: in 3 failing sessions' diverged-step traces (committed scoreboard f7aec9b3, 2026-09-09). Probe: `node scripts/brief.mjs splev_initlev`. **Addressed:** D-2256 `ea39a7f9`


- [x] `bones.c` getbones — bones-loading path on tour arrivals (`bones.c:629–756`; NHFILE I/O — check the Rule #2 analogue before porting). Corpus reach: in 3 failing sessions' diverged-step traces (committed scoreboard f7aec9b3, 2026-09-09). Probe: `node scripts/brief.mjs getbones`. **Addressed:** D-2255 `ae53dac2`


- [x] `mon.c` decide_to_shapeshift — shapeshifter-change decision thin vs C (`mon.c:4871–4938`; newcham-adjacent). Corpus reach: in 4 failing sessions' diverged-step traces (committed scoreboard f7aec9b3, 2026-09-09). Probe: `node scripts/brief.mjs decide_to_shapeshift`. **Addressed:** D-2254 `15959643`


- [x] `mcastu.c` choose_monster_spell — spell-list picker thin vs C (`mcastu.c:88–123` staticfn; castmu-adjacent). Corpus reach: in 4 failing sessions' diverged-step traces (committed scoreboard f7aec9b3, 2026-09-09). Probe: `node scripts/brief.mjs choose_monster_spell`. **Addressed:** D-2253 `c5027d75`


- [x] `muse.c` buzzmu real zap path — `lined_up` + `rn2(3)` + buzz pline/effects (named D-2233; stub still returns MISS). No corpus block — port the named path. Probe: `node scripts/brief.mjs buzzmu`. **Addressed:** D-2252 `62c6ea9f`


- [x] `uhitm.c` mhitm_adtyping remaining arms — SGLD/CURS/DCAY/SLIM/DGST/HALU/DETH + default (named D-2247; ACID/DREN/CONF live since e8c22613). No corpus block — port the named arms. Probe: `node scripts/brief.mjs mhitm_adtyping`. **Addressed:** D-2251 `c8fbe227`


- [x] `potion.c` dip bless/curse light adjust — dip sets bless/curse flags inline (`potion.js:3246–3247`, never calls `bless()`/`curse()`) so dipped lit artifacts skip `maybe_adjust_light` (named D-2244). No corpus block — wire the named dip path. Probe: `node scripts/brief.mjs maybe_adjust_light`. **Addressed:** D-2250 `04e8aae6`

## 2026-09-09

- [x] `sp_lev.c` special-level shapeshifter fixup — second C caller of `select_newcham_form` (`sp_lev.c:2067`, named D-2245). No corpus block — port the named caller. Probe: `node scripts/brief.mjs select_newcham_form`. **Addressed:** D-2249 `8a595f61`


- [x] `polyself.c` polymorph-control `mkclass_poly` callers — `:542`/`:598` unwired (named D-2245; function live since a71ff501). No corpus block — port the named callers. Probe: `node scripts/brief.mjs mkclass_poly`. **Addressed:** D-2248 `6a0bf305`


- [x] `mhitu.c` hitmu — monster-vs-hero hit envelope thin vs C (`mhitu.c:1144`, 123/72; honourable-mention band). Corpus reach: in 14 failing sessions' diverged-step C draws. Probe: `node scripts/brief.mjs hitmu`. **Addressed:** D-2247 e8c22613


- [x] `allmain.c` moveloop_core — per-turn spine dead callees (`do_storms`, `glibr`, `mkot_trap_warn`, `end_of_input`, `do_positionbar`, `runmode_delay_output`, …; PORT-GAP #10). Corpus reach: in 21 failing sessions' diverged-step C draws. Probe: `node scripts/brief.mjs moveloop_core`. **Addressed:** D-2246 `72a51dc6`


- [x] `mon.c` wiz_force_cham_form — interactive wizard `mon_polycontrol` body (`getlin` prompt loop + `mkclass_poly`/`validvamp` callees) still named (narrow-down of the data.md:439 family; wizard arm deferred by the newcham port); no JS symbol. No corpus block — port the named family. Probe: `node scripts/brief.mjs wiz_force_cham_form`. **Addressed:** D-2245 `a71ff501`


- [x] `mkobj.c` maybe_adjust_light — bless/curse caller wiring of live `obj_adjust_light_radius` still named (data.md:936); no JS symbol. No corpus block — port the named family. Probe: `node scripts/brief.mjs maybe_adjust_light`. **Addressed:** D-2244 `611866fc`


- [x] `steed.c` poly_steed — steed-polymorph body still named (data.md:447 `poly_steed` async-or-missing arm of `newcham`); no JS symbol. No corpus block — port the named family. Probe: `node scripts/brief.mjs poly_steed`. **Addressed:** D-2243 `1fb930b1`


- [x] `getpos.c` getpos — blocks 1/553 corpus sessions (first at step 72): C «You detect the presence of objects. (For instructions type a» vs JS «You detect the presence of objects.--More--». Probe: `node scripts/hidden-proxy.mjs verify getpos` (scen-normal-Wizard-92127). **Addressed:** D-2242 `15a3a8df`


- [x] `timeout.c` learn_egg_type — egg-knowledge context still named (data.md:235,332). No corpus block — port the named family. Probe: `node scripts/brief.mjs learn_egg_type`. **Addressed:** D-2241 `53872d1b`


- [x] `hack.c` pooleffects — drawbridge/lava arms still named (turns.md:1094). No corpus block — port the named family. Probe: `node scripts/brief.mjs pooleffects`. **Addressed:** D-2240 `66b8bd60`


- [x] `mon.c` egg_type_from_parent — sit `#sit` FALSE roll + polyself `learn_egg_type` TRUE caller arms still named (data.md:331). No corpus block — port the named family. Probe: `node scripts/brief.mjs egg_type_from_parent`. **Addressed:** D-2239 `b95a28db`


- [x] `pray.c` pray_revive — p_type −2/−1/1/2 + `pray_revive` still named (turns.md:406); no JS body. No corpus block — port the named family. Probe: `node scripts/brief.mjs pray_revive`. **Addressed:** D-2238 `fc302b4f`


- [x] `wizard.c` intervene — udemigod `intervene`/`amulet()` still named (turns.md:94); no JS body. No corpus block — port the named family. Probe: `node scripts/brief.mjs intervene`. **Addressed:** D-2237 `bb6224f0`


- [x] `mon.c` m_into_limbo — limbo migration still named (data.md:744). No corpus block — port the named family. Probe: `node scripts/brief.mjs m_into_limbo`. **Addressed:** D-2236 `dda478bc`


- [x] `mon.c` newcham wizard arms — dragon-armor ordinary arm / `mon_polycontrol` / RECORD `tt_doppel` entries still named (data.md:439). No corpus block — port the named family. Probe: `node scripts/brief.mjs tt_doppel`. **Addressed:** D-2235 `13abf9ae`


- [x] `shk.c` SHOPTYPE/veggy — Izchak/wizard SHOPTYPE + `veggy_item` tin/corpse obj-path still named (data.md:1417). No corpus block — port the named family. Probe: `node scripts/brief.mjs veggy_item`. **Addressed:** D-2234 `920a0a32`


- [x] `muse.c` M_SEEN gates — buried `m_canseeu`/other M_SEEN arms + `monstunseesu_prop` still named (data.md:195). No corpus block — port the named family. Probe: `node scripts/brief.mjs m_canseeu`. **Addressed:** D-2233 `38f6bbbc`


- [x] `zap.c` zhitu — acid-damage body still named (data.md:1223). No corpus block — port the named family. Probe: `node scripts/brief.mjs zhitu`. **Addressed:** D-2232 `00f20f4a`


- [x] `mon.c` mondead tail — `lifesaved_monster`/`vamprises`/`grddead`/`logdeadmon`/full `m_detach` still named (data.md:358). No corpus block — port the named family. Probe: `node scripts/brief.mjs m_detach`. **Addressed:** D-2231 `0a07f32a`


- [x] `eat.c` maybe_finished_meal — eatfood-completion predicate still named (c-js-map turns.md:1824). No corpus block — port the named family (the `allmain.c` stop_occupation gate stays deferred per the lembas park). Probe: `node scripts/brief.mjs maybe_finished_meal`. **Addressed:** D-2230 `5ec34ec0`


- [x] `timeout.c` nh_timeout — blocks 1/553 corpus sessions (first at step 108): C «You no longer feel secure from petrification.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify nh_timeout` (scen-wish-Rogue-91119). **Addressed:** D-2229 `7bffd9f5`


- [x] `mkobj.c` next_ident — blocks 1/553 corpus sessions (first at step 48): C draws `rnd(2)=1` in next_ident, JS `rn2(5)=1` from distfleeck(monmove.js:904). Probe: `node scripts/hidden-proxy.mjs verify next_ident` (scen-death-Wizard-92187). Distinct block from archived D-2001 row (that shipped order+gender for 92175/92103/92130). **Addressed:** D-2228 `a3d13f73`


- [x] `worn.c` m_dowear_type — blocks 1/553 corpus sessions (first at step 142): C «The goblin puts on a pair of fencing gloves.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify m_dowear_type` (scen-intrinsic-Samurai-92017). **Addressed:** D-2227 `daf781a8`


- [x] `extralev.c` LVLINIT_ROGUE/ROGUEOPTS — rogue-level init + impossible wall checks still named (data.md:631). No corpus block — port the named family. **Addressed:** D-2226 `59983ef9`


- [x] `track.c` SFCTOOL — save_track/rest_track flag still named (data.md:898). No corpus block — port the named family. **Addressed:** D-2225 `820594ec`


- [x] `worn.c` mon_set_minvis — muse/mon local clones still named (data.md:606-607; canonical export is `js/worn.js`). No corpus session currently blocks on it — port the named family (import the export, no new clone). **Addressed:** D-2224 `46fde86e`


- [x] `eat.c` cant_finish_meal — meal-interrupt predicate still named (debt.md:15). No corpus block — port the named family. **Addressed:** D-2223 `e0280149`


- [x] `worm.c` flip_worm_segs_vertical/flip_worm_segs_horizontal — save/rest segment-flip family still named (data.md:606). No corpus block — port the named family. **Addressed:** D-2222 `b6fb3939`


- [x] `wield.c` weldmsg — blocks 1/553 corpus sessions (first at step 158): C «Your grappling hook is welded to your hand!» vs JS «Your weapon is welded to your hand!». Probe: `node scripts/hidden-proxy.mjs verify weldmsg` (scen-wish-Priest-92041). **Addressed:** D-2221 `b3f4d2f8`


- [x] `artifact.c` defended()/DFLAG1 (named data.md:106; per-adtyp neighbors shipped D-1862). Defense message + RNG surface. **Addressed:** D-2220 `42fe12f1`


- [x] `pray.c` pleased gifts (named debt.md:23). Gift-grant message surface. **Addressed:** D-2219 `9a72fe17`


- [x] `shk.c` u_entered_shop Soundeffect/Hallu shkname remainder (named absent.md:16; deserted/angry/Invis/doorway shipped D-1080). Shop-welcome message surface. **Addressed:** D-2218 `44843418`


- [x] `sounds.c` dosounds feature gates — findgd migrating / Is_sanctum / Soundeffect / temple Hallu pantheon RNG still deferred (named absent.md:16). C RNG + You_hear message surface. **Addressed:** D-2217 `5f8b7477`


- [x] `mkmaze.c` walkfrom/maze0xy/populate_maze/create_maze — maze-walk builder callers deferred (named data.md:883; `is_solid` retired, `mazexy` live). C RNG surface: maze construction draws. No corpus block — port the named family. **Addressed:** D-2216 `e6ad2c9b`


- [x] `worn.c` m_dowear_type — blocks 1/553 corpus sessions (first at step 142): C «The goblin puts on a pair of fencing gloves.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify m_dowear_type` (scen-intrinsic-Samurai-92017; rests here after D-2215 moved it past dosearch@54). **Addressed:** D-2215 `addb22dd`


- [x] `detect.c` dosearch — blocks 4/553 corpus sessions (first at step 54): C «You are hit by an orcish dagger. You stop searching.» vs JS «You are hit by an orcish dagger. Hachi bites the goblin.--Mo». Probe: `node scripts/hidden-proxy.mjs verify dosearch` (scen-intrinsic-Samurai-92017, scen-normal-Archeologist-92012, scen-normal-Wizard-92127). **Addressed:** D-2215 `addb22dd`


- [x] `eat.c` givit — blocks 1/553 corpus sessions (first at step 70): C «You feel less concerned about becoming petrified. The grid b» vs JS «You feel less concerned about becoming petrified The grid bu». Probe: `node scripts/hidden-proxy.mjs verify givit` (scen-wish-Rogue-91119). **Addressed:** D-2214 `68ea2480`


- [x] `apply.c` use_grapple — blocks 1/553 corpus sessions (first at step 146): C «You are yanked toward the stairs!» vs JS «You are yanked toward the furniture!». Probe: `node scripts/hidden-proxy.mjs verify use_grapple` (scen-wish-Priest-92041). **Addressed:** D-2213 `430852e1`


- [x] `detect.c` dosearch0 — blocks 1/553 corpus sessions (first at step 179): C «What are you looking for? The exit?» vs JS «What are you looking for? The exit?--More--». Probe: `node scripts/hidden-proxy.mjs verify dosearch0` (scen-wish-Knight-92130). **Addressed:** D-2212 `5cd7c741`


- [x] `muse.c` use_misc — blocks 1/553 corpus sessions (first at step 145): C «You lash the fire vortex. Your bullwhip smoulders!--More--» vs JS «You lash the fire vortex. You are suddenly very hot!--More--». Probe: `node scripts/hidden-proxy.mjs verify use_misc` (scen-wish-Archeologist-92004). **Addressed:** D-2211 `27d71d60`


- [x] `insight.c` ustatusline — blocks 1/553 corpus sessions (first at step 141): C «Status of wizard (fervently neutral): Level 20 HP 114(114) A» vs JS «Status of wizard (fervently neutral): Level 20 HP 114(114) A». Probe: `node scripts/hidden-proxy.mjs verify ustatusline` (scen-wish-Archeologist-92004). **Addressed:** D-2210 `0a5b0256`


- [x] `uhitm.c` steal_it — blocks 1/553 corpus sessions (first at step 152): C «You steal: l - a pair of old gloves. You miss the watchman.-» vs JS «You miss the watchman. You hit the watchman.--More--». Probe: `node scripts/hidden-proxy.mjs verify steal_it` (scen-poly-Priest-92097). **Addressed:** D-2209 `32f374ab`


- [x] `insight.c` enlightenment — blocks 1/553 corpus sessions (first at step 108): C «Wizard the Monk's attributes:» vs JS «Wizard the Monk's attributes:». Probe: `node scripts/hidden-proxy.mjs verify enlightenment` (scen-poly-Monk-92213). **Addressed:** D-2208 `5112743c`


- [x] `invent.c` prinv — blocks 1/553 corpus sessions (first at step 67): C «c - an uncursed flint stone (in quiver pouch) (19 in total).» vs JS «f - an uncursed flint stone.». Probe: `node scripts/hidden-proxy.mjs verify prinv` (scen-normal-Caveman-92059). **Addressed:** D-2207 d375dcfa


- [x] `trap.c` trapeffect_sqky_board — blocks 1/553 corpus sessions (first at step 72): C «A board beneath the kitten squeaks a B flat loudly.--More--» vs JS «A board beneath your kitten squeaks a B flat loudly.--More--». Probe: `node scripts/hidden-proxy.mjs verify trapeffect_sqky_board` (scen-normal-Barbarian-92064). **Addressed:** D-2206 `a234ca48`


- [x] `getpos.c` getpos — blocks 1/553 corpus sessions (first at step 36): C «Unknown direction: 'r' (aborted). Done.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify getpos` (scen-normal-Healer-91124). **Addressed:** D-2205 `7b15eaf9`


- [x] `stairs.c` stairs_description — blocks 1/553 corpus sessions (first at step 208): C «There is a staircase up out of the dungeon here.» vs JS «The fire vortex engulfs you!--More--». Probe: `node scripts/hidden-proxy.mjs verify stairs_description` (scen-poly-Healer-92109). **Addressed:** D-2204 `ea4547d5`


- [x] `potion.c` make_stunned — blocks 1/553 corpus sessions (first at step 112): C «The baluchitherium hits again! You feel a bit steadier now.» vs JS «The baluchitherium hits again!». Probe: `node scripts/hidden-proxy.mjs verify make_stunned` (scen-poly-Archeologist-92226). **Addressed:** D-2203 `2b917b52`


- [x] `mkobj.c` next_ident residual (D-2202) — blocks 1/553 corpus sessions (first at step 48): C draws `rnd(2)` in next_ident with no newmonhp in-step, JS `rn2(5)` from distfleeck(monmove.js). Probe: `node scripts/hidden-proxy.mjs verify next_ident` (scen-death-Wizard-92187). Falsifier: ordered C step-48 tag dump naming the firing next_ident call site (clone/mkobj/restore/nextoid), then port that writer. **Addressed:** D-2202 `51fb6091`


- [x] `mkobj.c` next_ident — blocks 5/553 corpus sessions (first at step 57): C draws `rnd(2)=2` in next_ident, JS `rn2(5)=4` from drop_upon_death(end.js:1311). Probe: `node scripts/hidden-proxy.mjs verify next_ident` (scen-death-Wizard-92120, scen-death-Wizard-92187, scen-genesis-Knight-92068). **Addressed:** D-2202 `51fb6091`


- [x] `potion.c` make_hallucinated — blocks 1/553 corpus sessions (first at step 17): C «Oh wow! Everything looks so cosmic! Timeout for sleepy set to 30.--More--» vs JS «Oh wow! Everything looks so cosmic! Timeout for sleepy set to 30.--More--» (identical toplines; first cell diff row 16 map/menu C `&` vs JS `·`). Probe: `node scripts/hidden-proxy.mjs verify make_hallucinated` (scen-intrinsic-Caveman-92052). **Addressed:** D-2200 `fda2efaf`


- [x] `polyself.c` float_vs_flight — map-driven (c-js-map data.md; def `polyself.c:131`): Levitation-vs-Flying I_SPECIAL toggle still named. Probe: `node scripts/brief.mjs float_vs_flight`. **Addressed:** D-2199 `d271ffb6`


- [x] `do.c` heal_legs — map-driven (c-js-map data.md:1048; def `do.c:2449` `heal_legs(int how)` 0 ordinary / 1 dismount / 2 stone): wounded-legs heal path (`disp.botl`, ATEMP DEX restore) still named. Probe: `node scripts/brief.mjs heal_legs`. **Addressed:** D-2198 `fb866daa`
- [x] `do.c` legs_in_no_shape — blocks 1/553 corpus sessions (first at step 27): C «Your right leg is in no shape for riding.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify legs_in_no_shape` (scen-normal-Healer-91123). **Addressed:** D-2198 `fb866daa`


- [x] `fountain.c` gush steed + engulfed-hero arms — map-driven (c-js-map data.md): steed Flying/Levitation, `engulfing_u` flush, `mdrop_special_objs` worn/saddle/`extract_from_minvent` still named. Probe: `node scripts/brief.mjs gush`. **Addressed:** D-2197 `ab784680`


- [x] `sounds.c` dosounds deferred room/guard arms — map-driven (c-js-map absent.md): swamp You1 / barracks/court You_hear / temple_priest / oracle canseemon / other MS_* still deferred. Probe: `node scripts/brief.mjs dosounds`. **Addressed:** D-2196 `1223ac2f`


- [x] `dothrow.c` thitm stone_missile/passes_rocks harmless arm — map-driven (c-js-map data.md): `stone_missile`/`passes_rocks` harmless arm in `thitm` still named. Probe: `node scripts/brief.mjs thitm`. **Addressed:** D-2195 `ea5bcd4b`


- [x] `trap.c` m_harmless_trap residual arms — map-driven (c-js-map data.md): anti-magic/webmaker/`defended` resists, flyer check_in_air + SLP/FIRE/BEAR/WEB/RUST/VIBRATING/PIT done-arms, Deaf+mindless silent, empty-door `pline_mon`, drawbridge-under pool/lava (`disturb_buried_zombies` already addressed — out of scope). Probe: `node scripts/brief.mjs m_harmless_trap`. **Addressed:** D-2194 `7c48caec`


- [x] `invent.c` look_here — blocks 1/553 corpus sessions (first at step 121): C «You try to feel what is lying here on the floor.--More--» vs JS «It hits!». Probe: `node scripts/hidden-proxy.mjs verify look_here` (scen-genesis-Wizard-92223). **Addressed:** D-2193 `caa4ff0d`


- [x] `do_wear.c` accessory_or_armor_on — blocks 1/553 corpus sessions (first at step 58): C «You finish your dressing maneuver.--More--» vs JS «You finish your dressing maneuver.». Probe: `node scripts/hidden-proxy.mjs verify accessory_or_armor_on` (scen-genesis-Tourist-92144). **Addressed:** D-2192 `3fbdad72`.


- [x] `mon.c` unstuck — blocks 1/553 corpus sessions (first at step 52): C draws `rnd(2)=2` in unstuck, JS `rn2(5)=1` from distfleeck(monmove.js:861). Probe: `node scripts/hidden-proxy.mjs verify unstuck` (scen-genesis-Knight-92002). **Addressed:** D-2191 `ad7c3c30`


- [x] `trap.c` burnarmor case 3 gloves noun — pass the literal `"gloves"`, not `gloves_simple_name(item)`: C `trap.c:143–146` prints "Your gloves smoulders!" even for dknown gauntlets; D-2186's stub deletion regressed the previously-correct constant stub. Probe: fire-trap burnarmor with worn identified leather gauntlets (`rn2(5)=3`). Source: reviews/loop-unattended/1152-46171803-armor-simple-names.md. **Addressed:** D-2190 `74944545`


- [x] `monmove.c` monflee — blocks 1/553 corpus sessions (first at step 80): C draws `rn2(25)=24` in monflee, JS `rnd(6)=5` from trapeffect_pit(trap.js:2052). Probe: `node scripts/hidden-proxy.mjs verify monflee` (scen-tour-Monk-91117). **Addressed:** D-2189 `d22f6c29`


- [x] `dothrow.c` hurtle_step — blocks 1/553 corpus sessions (first at step 110): C «You bump into a little dog. You stagger... The baluchitheriu» vs JS «You bump into the little dog. You stagger...--More--». Probe: `node scripts/hidden-proxy.mjs verify hurtle_step` (scen-poly-Archeologist-92226). **Addressed:** D-2188 `60a971cb`


- [x] `eat.c` start_tin — blocks 1/553 corpus sessions (first at step 118): C «Using your 6 orcish daggers you try to open the tin.--More--» vs JS «Using your orcish daggers you try to open the tin.--More--». Probe: `node scripts/hidden-proxy.mjs verify start_tin` (scen-normal-Rogue-92115). **Addressed:** D-2187 `4e0fe784`


- [x] `trap.c` erode_obj — blocks 1/553 corpus sessions (first at step 86): C «Your robe smoulders!» vs JS «Your cloak smoulders!». Probe: `node scripts/hidden-proxy.mjs verify erode_obj` (scen-normal-Priest-92020). **Addressed:** D-2186 `46171803`


- [x] `mcastu.c` mcast_disappear — blocks 1/553 corpus sessions (first at step 121): C «The lich suddenly becomes transparent!» vs JS «The lich suddenly becomes transparent!». Probe: `node scripts/hidden-proxy.mjs verify mcast_disappear` (scen-wish-Monk-92013). **Addressed:** D-2185 `fb69e76e`


- [x] `mkmaze.c` mv_bubble — blocks 1/553 corpus sessions (first at step 131): C `rn2(24)=1` vs JS `rn2(17)=4` in the `mnearto`→`enexto` near-collect after bubble deposit (rings 1–2 full 8/16 both sides; ring 3 full in C, edge-clipped in JS — cons center off by one near an edge; JS probe: cx=43 cy=18 ns=[8,16,17]). Re-homed from D-2184 (collect_coords body + mnearto proven faithful). Suspect missing `b->x = gbxmin`-style hard clamps (`mkmaze.c:1980–1997`) in JS `mv_bubble_move` — unproven. Probe: `node scripts/hidden-proxy.mjs verify mv_bubble` (scen-tour-Tourist-92100). **Addressed:** D-2184 `3e7e762a`


- [x] `teleport.c` collect_coords — blocks 3/553 corpus sessions (first at step 77): C draws `rn2(8)=4` in collect_coords, JS `rn2(3)=2` from mhitm_knockback(mhitm.js:2029). Probe: `node scripts/hidden-proxy.mjs verify collect_coords` (scen-genesis-Knight-92185, scen-poly-Wizard-92169, scen-tour-Tourist-92100). **Addressed:** D-2184 `3e7e762a`


- [x] `insight.c` show_conduct — blocks 6/553 corpus sessions (first at step 859): C «Ebenezum walked before me along the closest thing we could» vs JS «More info about "human wizard"? [yn] (n)». Probe: `node scripts/hidden-proxy.mjs verify show_conduct` (random-seed0360-wizard-world-tour-e115a25b, scen-genesis-Knight-92002, scen-genesis-Knight-92112). **Addressed:** D-2183 `38ec30d9`


- [x] `wield.c` ready_weapon — blocks 8/553 corpus sessions (first at step 20): C «You cannot wield a two-handed weapon while wearing a shield.» vs JS «e - a dwarvish mattock (weapon in hands).». Probe: `node scripts/hidden-proxy.mjs verify ready_weapon` (scen-genesis-Valkyrie-92166, scen-wish-Knight-92204, scen-wish-Monk-92063). **Addressed:** D-2182 `3c6e66d1`


- [x] `end.c` savelife — RESTORED to Open: finish-iteration checked this row off by bare iteration-id mention although scen-wish-Valkyrie-92014 is still blocked on touch_artifact@49 (see the quest-arm commit's D-log Next bullet, 0b6f3f56; the DONE entry is kept for audit, not as proof of fix — lesson: never cite the current D-id inside a NEW queue row). Lifesave-decline More-state: step 49/66 kind=screen at artifact.c:966: C «The bow named the Longbow of Diana evades your grasp!» vs JS same + `--More--`. RNG matched through step 48 incl. C `rn2(1)=0 @ readobjnam(objnam.c:5374)` (Longbow non-quest, both sides roll) + `d(4,10)=32` blast + death + Die?-decline; step-49 C `rn2(100)=85 @ makewish(zap.c:6421)` (= JS ublesscnt `rn1(100,50)`, js/zap.js:6728, C order kept) then evade on a clean topline. JS evade text+position correct, only stale More pending → writer is the Die?-decline message state (end.c savelife / display More), NOT touch_artifact/readobjnam/makewish (all C-faithful here; cf. D-2051 family). Probe: `node scripts/hidden-proxy.mjs verify touch_artifact` (expect Valkyrie-92014 → PASS or a later owner after a savelife/More-state port; never re-pop touch_artifact for this More). No seed/step/coordinate gates. **Addressed:** D-2181 `c313ff42`


- [x] `mkobj.c` next_ident — blocks 7/553 corpus sessions (first at step 57): C draws `rnd(2)=2` in next_ident, JS `rn2(5)=4` from drop_upon_death(end.js:1286). Probe: `node scripts/hidden-proxy.mjs verify next_ident` (scen-death-Wizard-92120, scen-death-Wizard-92187, scen-genesis-Knight-92068).


- [x] `detect.c` find_trap — blocks 1/553 corpus sessions (first at step 75): C «You find an anti-magic field.--More--» vs JS «You find an anti-magic field.--More--» (identical toplines; map rows 2–7 blank in JS — geometry owner, geom-probe first per runbook §7; cf. doturn park). Probe: `node scripts/hidden-proxy.mjs verify find_trap` (scen-intrinsic-Priest-92096). **Addressed:** D-2179 `58d11e0f`


- [x] `muse.c` you_aggravate — blocks 1/553 corpus sessions (first at step 88): C «You feel aggravated at the master lich.--More--» vs JS «You feel aggravated at the master lich.». Probe: `node scripts/hidden-proxy.mjs verify you_aggravate` (scen-wish-Wizard-92048). **Addressed:** D-2178 `19724e2f`


- [x] `potion.c` peffect_polymorph — blocks 1/553 corpus sessions (first at step 175): C «You feel a little strange.--More--» vs JS «You feel a little strange. You turn into a plains centaur!». Probe: `node scripts/hidden-proxy.mjs verify peffect_polymorph` (scen-poly-Ranger-92133). **Addressed:** D-2177 `e93f109a`


- [x] `engrave.c` doengrave — blocks 1/553 corpus sessions (first at step 191): C draws `rn2(11)=7` in doengrave, JS `rn2(25)=8` from doengrave(engrave.js:1366). Probe: `node scripts/hidden-proxy.mjs verify doengrave` (scen-normal-Samurai-92071). **Addressed:** D-2176 `a0957c9d`


- [x] `uhitm.c` mhitm_mgc_atk_negated — blocks 1/553 corpus sessions (first at step 79): C «The lich touches you! You avoid harm.--More--» vs JS «The lich touches you! You avoid harm.». Probe: `node scripts/hidden-proxy.mjs verify mhitm_mgc_atk_negated` (scen-wish-Monk-92013). **Addressed:** D-2175 `a018f317`


- [x] `js` js-throw — blocks 2/553 corpus sessions (first at step undefined): C «» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify js-throw` (scen-normal-Knight-92182, scen-wish-Knight-92034). **Addressed:** D-2173 `d23fde89`


- [x] `end.c` savelife — lifesave-decline More-state residual of the D-2172 touch_artifact row: scen-wish-Valkyrie-92014 step 49/66 kind=screen at artifact.c:966: C «The bow named the Longbow of Diana evades your grasp!» vs JS same + `--More--`. RNG matched through step 48 incl. C `rn2(1)=0 @ readobjnam(objnam.c:5374)` (Longbow non-quest, both sides roll) + `d(4,10)=32` blast + death + Die?-decline; step-49 C `rn2(100)=85 @ makewish(zap.c:6421)` (= JS ublesscnt `rn1(100,50)`, js/zap.js:6728, C order kept) then evade on a clean topline. JS evade text+position correct, only stale More pending → writer is the Die?-decline message state (end.c savelife / display More), NOT touch_artifact/readobjnam/makewish (all C-faithful here; cf. D-2051 family). Probe: `node scripts/hidden-proxy.mjs verify touch_artifact` (expect Valkyrie-92014 → PASS or a later owner after a savelife/More-state port; never re-pop touch_artifact for this More). No seed/step/coordinate gates. **Addressed:** D-2172 `71c6e030`


- [x] `artifact.c` touch_artifact — blocks 1/553 corpus sessions (first at step 92): C draws `d(4,10)=22` in touch_artifact, JS `rn2(1)=0` from readobjnam(readobjnam.js:1280). Probe: `node scripts/hidden-proxy.mjs verify touch_artifact` (scen-wish-Rogue-92221). **Addressed:** D-2172 `71c6e030`


- [x] `teleport.c` goodpos — blocks 1/553 corpus sessions (first at step 131): C draws `rn2(13)=5` in goodpos, JS `rn2(3)=0` from movebubbles(mklev.js:16122). Probe: `node scripts/hidden-proxy.mjs verify goodpos` (scen-tour-Tourist-92100). **Addressed:** D-2171 `d316606c`


- [x] `hack.c` domove_bump_mon — blocks 2/553 corpus sessions (first at step 32): C «Pardon me, Slasher.» (`hack.c:1942` m-prefix bump arm) vs JS «You swap places with Slasher.» + spurious `rn2(7)`@do_attack; «Pardon me» absent from scored js/ (named omission js/cmd.js:3145). Probe: `node scripts/hidden-proxy.mjs verify distfleeck` (scen-normal-Caveman-92053, scen-normal-Healer-92218; expect PASS or later owner). **Addressed:** D-2170 `4a0daf23`


- [x] `attrib.c` exercise — blocks 2/553 corpus sessions (first at step 48): C draws `rn2(2)=1` in exercise, JS `rn2(100)=7` from makewish(zap.js:6638). Probe: `node scripts/hidden-proxy.mjs verify exercise` (scen-wish-Valkyrie-92014, scen-wish-Valkyrie-92206). **Addressed:** D-2169 `1d79b32e`

## 2026-09-08

- [x] `polyself.c` newman — blocks 1/553 corpus sessions (first at step 127): C draws `rn2(5)=0` in newman, JS draws nothing. Probe: `node scripts/hidden-proxy.mjs verify newman` (scen-poly-Samurai-91106). **Addressed:** D-2168 `48fb0115`
- [x] `wield.c` chwepon — blocks 1/553 corpus sessions (first at step 133): C « You were polymorphed into a yeti (106).» vs JS « You were fast innately.» (enlightenment menu row 19; full RNG 3608/3608). Probe: `node scripts/hidden-proxy.mjs verify chwepon` (scen-poly-Samurai-91106). Source: D-2168 verified movement (was newman@127). **Addressed:** D-2168 `48fb0115`


- [x] `lock.c` pick_lock feel/see no-door arm — blocks 1/553 corpus sessions (first at step 175): C «You feel no door there.» vs JS «You see no door there.». Probe: `node scripts/hidden-proxy.mjs verify pick_lock` (scen-normal-Samurai-92071). **Addressed:** D-2167 `4508ab31`


- [x] `dig.c` use_pick_axe — blocks 1/553 corpus sessions (first at step 11): C «In what direction do you want to dig? [yku>]» vs JS «In what direction do you want to dig? [kyu>]». Probe: `node scripts/hidden-proxy.mjs verify use_pick_axe` (scen-kit-Archeologist-92022). **Addressed:** D-2166 `fae41579`


- [x] `cmd.c` yn_function — blocks 1/553 corpus sessions (first at step 111): C «Die? [yn] (n)» vs JS «You die...--More--». Probe: `node scripts/hidden-proxy.mjs verify yn_function` (scen-wish-Barbarian-92054). **Addressed:** D-2165 `f567ecfb`


- [x] `zap.c` maybe_destroy_item — blocks 1/553 corpus sessions (first at step 164): C draws `rnd(4)=2` in maybe_destroy_item, JS `rn2(3)=1` from mhitm_knockback(mhitm.js:2029). Probe: `node scripts/hidden-proxy.mjs verify maybe_destroy_item` (scen-tour-Tourist-91101). **Addressed:** D-2164 `3b27be21`


- [x] `makemon.c` newmonhp — blocks 1/553 corpus sessions (first at step 47): C draws `d(13,8)=55` in newmonhp, JS `d(1,8)=2` from newmonhp(makemon.js:931). Probe: `node scripts/hidden-proxy.mjs verify newmonhp` (scen-tour-Tourist-92134). **Addressed:** D-2163 `b128b07a`


- [x] `botl.c` do_statusline1 — blocks 1/553 corpus sessions (first at step 253): C «i - a war hammer named Ogresmasher (weapon in right hand).» vs JS «i - a war hammer named Ogresmasher (weapon in right hand).». Probe: `node scripts/hidden-proxy.mjs verify do_statusline1` (scen-wish-Valkyrie-92206). **Addressed:** D-2162 `242a4641`


- [x] `mhitu.c` gulpmu — blocks 1/553 corpus sessions (first at step 87): C draws `rn2(4)=3` in gulpmu, JS `rn2(5)=4` from distfleeck(monmove.js:840). Probe: `node scripts/hidden-proxy.mjs verify gulpmu` (scen-wish-Monk-92194). **Addressed:** D-2161 `b46928ff`


- [x] `timeout.c` sickness_dialogue — blocks 1/553 corpus sessions (first at step 65): C «You are at Death's door.--More--» vs JS «You are at Death's door.». Probe: `node scripts/hidden-proxy.mjs verify sickness_dialogue` (scen-intrinsic-Rogue-91111). **Addressed:** D-2160 `344fe348`


- [x] `eat.c` fprefx — blocks 1/553 corpus sessions (first at step 99): C draws `rn2(2)=0` in fprefx, JS `rn2(70)=2` from maybe_generate_rnd_mon(allmain.js:349). Probe: `node scripts/hidden-proxy.mjs verify fprefx` (scen-wish-Knight-92105). **Addressed:** D-2159 `43f6a519`


- [x] `hack.c` escape_from_sticky_mon — blocks 1/553 corpus sessions (first at step 247): C draws `rn2(40)=4` in escape_from_sticky_mon, JS `rn2(20)=4` from gethungry(eat.js:698). Probe: `node scripts/hidden-proxy.mjs verify escape_from_sticky_mon` (scen-wish-Caveman-92183). **Addressed:** D-2158 `cb8412fa`


- [x] `apply.c` use_lamp — blocks 1/553 corpus sessions (first at step 220): C «Your lamp is now on. The guardian naga bites!--More--» vs JS «Your lamp is now on. The guardian naga bites!--More--». Probe: `node scripts/hidden-proxy.mjs verify use_lamp` (scen-wish-Valkyrie-92206). **Addressed:** D-2157 `756b0fe9`


- [x] `mkobj.c` hornoplenty — blocks 2/553 corpus sessions (first at step 146): C «Oops! The boulder drops to the floor!» vs JS «Oops! The a boulder drops to the floor!». Probe: `node scripts/hidden-proxy.mjs verify hornoplenty` (scen-wish-Ranger-92212, scen-wish-Samurai-91102). **Addressed:** D-2156 `bfebf129`


- [x] `uhitm.c` mhitm_mgc_atk_negated — blocks 2/553 corpus sessions (first at step 84): C draws `rn2(10)=5` in mhitm_mgc_atk_negated, JS `rn2(6)=3` from xkilled(uhitm.js:683). Probe: `node scripts/hidden-proxy.mjs verify mhitm_mgc_atk_negated` (scen-poly-Monk-92164, scen-wish-Monk-92013). **Addressed:** D-2155 `017f6ec2`


- [x] `insight.c` list_vanquished — blocks 2/553 corpus sessions (first at step 73): C «Vanquished creatures:» vs JS «Vanquished creatures:». Probe: `node scripts/hidden-proxy.mjs verify list_vanquished` (scen-genesis-Archeologist-92157, scen-genesis-Barbarian-92111). **Addressed:** D-2154 `717dca72`


- [x] `potion.c` peffect_paralysis — blocks 1/553 corpus sessions (first at step 26): C «Your feet are frozen to the stairs! The little dog misses th» vs JS «Your feet are frozen to the floor! The little dog misses the». Probe: `node scripts/hidden-proxy.mjs verify peffect_paralysis` (scen-wish-Valkyrie-92091). **Addressed:** D-2153 `34b6810b`


- [x] `uhitm.c` hmon_hitmon_weapon_melee — blocks 1/553 corpus sessions (first at step 122): C draws `rnd(1)=1` in hmon_hitmon_weapon_melee, JS `rn2(8)=3` from abuse_dog(dog.js:1220). Probe: `node scripts/hidden-proxy.mjs verify hmon_hitmon_weapon_melee` (scen-normal-Rogue-92146). **Addressed:** D-2152 `a56c8567`


- [x] `mhitu.c` diseasemu — blocks 1/553 corpus sessions (first at step 23): C «Demogorgon hits! You feel deathly sick. Demogorgon hits!» vs JS «Demogorgon hits!» (C `rn2(16)=6 @ diseasemu(mhitu.c:1039)` vs JS `rn2(3)=2 @ mhitm_knockback(mhitm.js:2060)`). Probe: `node scripts/hidden-proxy.mjs verify diseasemu` (scen-death-Valkyrie-92229). **Addressed:** D-2151 `13a2969a`


- [x] `read.c` do_class_genocide — blocks 1/553 corpus sessions (first at step 78): C «What class of monsters do you want to genocide? [enter the s» vs JS «What class of monsters do you want to genocide? [enter '?' t». Probe: `node scripts/hidden-proxy.mjs verify do_class_genocide` (scen-wish-Tourist-92230). **Addressed:** D-2150 `144563ef`


- [x] `dogmove.c` dog_goal — blocks 1/553 corpus sessions (first at step 168): C draws `rn2(4)=3` in dog_goal, JS `rn2(3)=0` from dog_move(dogmove.js:978) (empty toplines both sides; step-168 follow-player `!rn2(4)` gate). Re-queued from the addressed dog_goal@136 row (the refuse-arm dropy fix moved it past step 136). Probe: `node scripts/hidden-proxy.mjs verify dog_goal` (scen-wish-Priest-92136). **Addressed:** D-2149 `3c229022`


- [x] `botl.c` do_statusline2 — blocks 9/553 corpus sessions (first at step 46): C «Your shirt rips to shreds!--More--» vs JS «Your shirt rips to shreds!--More--». Probe: `node scripts/hidden-proxy.mjs verify do_statusline2` (scen-death-Tourist-92095, scen-genesis-Tourist-92044, scen-intrinsic-Caveman-92138). (Re-queued post-D-2148: Priest-91137 + Rogue-92026 PASS; per-session writers in D-2148 Next.) **Addressed:** D-2148 `04072151`


- [x] `botl.c` do_statusline2 — blocks 1/553 corpus sessions (first at step 214): C `HP:44(50)` vs JS `HP:43(50)` on the status line (otherwise identical; step-214 damage path drew matched RNG — symptom owner). Re-queued from fired `weapon.c` dmgval row (D-2139 tree moved it past step 123; cf. archived D-2024 row for an earlier step). Probe: `node scripts/hidden-proxy.mjs verify do_statusline2` (scen-poly-Priest-91137). **Addressed:** D-2148 `04072151`


- [x] `mon.c` mondead — blocks 1/553 corpus sessions (first at step 81): C draws `rnd(5)=1` in mondead, JS `rn2(6)=2` from xkilled(uhitm.js:669). Probe: `node scripts/hidden-proxy.mjs verify mondead` (scen-genesis-Barbarian-92111). **Addressed:** D-2147 `5cd14621`.


- [x] `artifact.c` Mb_hit — blocks 1/553 corpus sessions (first at step 110): C draws `rn2(11)=5` in Mb_hit, JS `rn2(3)=0` from mhitm_knockback(mhitm.js:2015). Probe: `node scripts/hidden-proxy.mjs verify Mb_hit` (scen-wish-Archeologist-91134). **Addressed:** D-2146 `bda8c297`


- [x] `mkobj.c` start_corpse_timeout — blocks 1/553 corpus sessions (first at step 39): C draws `rn2(1000)=899` in start_corpse_timeout, JS `rn2(100)=99` from makewish(zap.js:6638). Probe: `node scripts/hidden-proxy.mjs verify start_corpse_timeout` (scen-wish-Barbarian-92102). **Addressed:** D-2145 `0bed4afc`


- [x] `artifact.c` artifact_hit — blocks 1/553 corpus sessions (first at step 104): C draws `rn2(2)=0` in artifact_hit, JS `rn2(3)=2` from mhitm_knockback(mhitm.js:2015). Probe: `node scripts/hidden-proxy.mjs verify artifact_hit` (scen-genesis-Rogue-92214). **Addressed:** D-2144 `bb24a32f`


- [x] NEXT (owner-scheduled 2026-09-08) `hack.c` runmode_delay_output — SUPPLEMENTAL Anim only, blocks 0 sessions: all callees live, zero RNG/state surface, feeds the parked botl-gate measurement. Port the C movement-delay display (`hack.c:2995`) + hook into domove/moveloop/continue_run at the 4 C call sites. Full spec: `docs/proposals/2026-09-08-runmode-animation-frames.md`. Baseline 123/1483; bellwether seed0014-dequa-fountain-explore 3/995. Verify: runner animFrames totals rise with no session falling, 44/44 + 11,405 screens + RNG unchanged. **Addressed:** D-2143 `fc5f4794`


- [x] `uhitm.c` passive — blocks 1/553 corpus sessions (first at step 107): C draws `rn2(3)=1` in passive, JS `d(1,7)=5` from damageum(uhitm.js:1467). Probe: `node scripts/hidden-proxy.mjs verify passive` (scen-poly-Archeologist-92226). **Addressed:** D-2142 `d850333f`


- [x] `dogmove.c` dog_goal — blocks 1/553 corpus sessions (first at step 136): C draws `rn2(8)=4` in dog_goal, JS `rn2(1)=0` from dog_move(dogmove.js:976). Probe: `node scripts/hidden-proxy.mjs verify dog_goal` (scen-wish-Priest-92136). **Addressed:** D-2141 `79844c1c`


- [x] `mcastu.c` castmu — blocks 1/553 corpus sessions (first at step 124): C «The Angel of Chih Sung-tzu casts a spell at you!--More--» vs JS «The Angel of Chih Sung-tzu casts a spell at you!». Probe: `node scripts/hidden-proxy.mjs verify castmu` (scen-wish-Monk-92063). **Addressed:** D-2140 `e13647e8`


- [x] `mcastu.c` cursetxt — blocks 1/553 corpus sessions (first at step 166): C draws `rn2(4)=0` in cursetxt, JS `rn2(5)=2` from dochug(monmove.js:2401). Probe: `node scripts/hidden-proxy.mjs verify cursetxt` (scen-poly-Tourist-92047). **Addressed:** D-2137 `b9b2fdef`


- [x] `makemon.c` makemon — blocks 1/553 corpus sessions (first at step 4): C «You ready: $ - 1093 gold pieces.--More--» vs JS «In what direction?». Probe: `node scripts/hidden-proxy.mjs verify makemon` (scen-normal-Healer-91123). **Addressed:** D-2139 `eb7ec1cb`


- [x] `allmain.c` moveloop_core — blocks 1/553 corpus sessions (first at step 88): C draws `rn2(85)=24` in moveloop_core, JS `rn2(20)=14` from gethungry(eat.js:698). Probe: `node scripts/hidden-proxy.mjs verify moveloop_core` (scen-poly-Archeologist-92226). **Addressed:** D-2138 `1602fc13`


- [x] `objnam.c` readobjnam_postparse1 — blocks 1/553 corpus sessions (first at step 126): C «One of your potions of extra healing freezes and shatters!--» vs JS «One of your potions of extra healing freezes and shatters!». Probe: `node scripts/hidden-proxy.mjs verify readobjnam_postparse1` (scen-poly-Healer-92107). **Addressed:** D-2137 `b9b2fdef`


- [x] `teleport.c` level_tele — blocks 1/553 corpus sessions (first at step 108): C «You materialize on a different level!» vs JS «You materialize on a different level!». Probe: `node scripts/hidden-proxy.mjs verify level_tele` (scen-tour-Tourist-92100). **Addressed:** D-2136 `51283e0c`


- [x] `trap.c` burnarmor — blocks 1/553 corpus sessions (first at step 73): C draws `rn2(5)=3` in burnarmor, JS `rn2(6)=5` from xkilled(uhitm.js:694). Probe: `node scripts/hidden-proxy.mjs verify burnarmor` (scen-wish-Ranger-92212). **Addressed:** D-2135 `55848b87`


- [x] `artifact.c` touch_artifact — blocks 1/553 corpus sessions (first at step 73): C «The pair of lenses named the Eyes of the Overworld evades yo» vs JS «The pair of lenses named the Eyes of the Overworld evades yo». Probe: `node scripts/hidden-proxy.mjs verify touch_artifact` (scen-genesis-Valkyrie-92094). **Addressed:** D-2134 `1bb96408`


- [x] `zap.c` dobuzz — blocks 2/553 corpus sessions (first at step 65): C draws `d(6,50)=119` in dobuzz, JS `rn2(19)=8` from exercise(attrib.js:196). Probe: `node scripts/hidden-proxy.mjs verify dobuzz` (scen-wish-Samurai-92087, scen-wish-Wizard-92048). **Addressed:** D-2133 `33a49868`


- [x] `mhitu.c` gazemu — blocks 1/553 corpus sessions (first at step 163): C «You are blinded by the Archon's radiance! You falter... It h» vs JS «You are blinded by the Archon's radiance! You stagger... It ». Probe: `node scripts/hidden-proxy.mjs verify gazemu` (scen-poly-Tourist-92047). **Addressed:** D-2132 `4d859c92`


- [x] `polyself.c` uunstick — blocks 1/553 corpus sessions (first at step 207): C «The fire giant hits! The fire giant is no longer in your clu» vs JS «The fire giant hits! You return to elven form!». Probe: `node scripts/hidden-proxy.mjs verify uunstick` (scen-poly-Ranger-91131). **Addressed:** D-2131 `98e0bb9e`


- [x] `mhitu.c` mattacku — blocks 1/553 corpus sessions (first at step 163): C draws `rnd(20)=9` in mattacku, JS `rn2(2)=0` from mswings_verb(mhitu.js:321). Probe: `node scripts/hidden-proxy.mjs verify mattacku` (scen-poly-Rogue-92026). **Addressed:** D-2130 `8c0e9448`


- [x] `pray.c` prayer_done — blocks 1/553 corpus sessions (first at step 105): C draws `rnl(10)=4` in prayer_done, JS `rn2(5)=4` from distfleeck(monmove.js:840). Probe: `node scripts/hidden-proxy.mjs verify prayer_done` (scen-tour-Healer-92198). **Addressed:** D-2129 `7fca2bb6`


- [x] `uhitm.c` mhitm_ad_plys — blocks 1/553 corpus sessions (first at step 78): C draws `rn2(3)=0` in mhitm_ad_plys, JS `d(3,6)=3` from passive(uhitm.js:1451). Probe: `node scripts/hidden-proxy.mjs verify mhitm_ad_plys` (scen-poly-Monk-92005). **Addressed:** D-2128 `a7ae28e5`


- [x] `zap.c` zhitm — blocks 1/553 corpus sessions (first at step 64): C draws `rnd(50)=37` in zhitm, JS `rn2(3)=2` from zhitm(zap.js:1841). Probe: `node scripts/hidden-proxy.mjs verify zhitm` (scen-wish-Samurai-92087). **Addressed:** D-2127 `86cd47fa`


- [x] `potion.c` self_invis_message — blocks 1/553 corpus sessions (first at step 62): C «Gee! All of a sudden, you can't see yourself.--More--» vs JS «Gee! All of a sudden, you can't see yourself.--More--». Probe: `node scripts/hidden-proxy.mjs verify self_invis_message` (scen-wish-Healer-92010). **Addressed:** D-2126 `c0bd7edc`


- [x] `light.c` arti_light_description — blocks 1/553 corpus sessions (first at step 161): C «The long sword named Sunsword shines brilliantly in the Arch» vs JS «The Archon swings his long sword named Sunsword. The Archon ». Probe: `node scripts/hidden-proxy.mjs verify arti_light_description` (scen-poly-Tourist-92047). **Addressed:** D-2125 `137e650f`


- [x] `uhitm.c` missum — blocks 1/553 corpus sessions (first at step 118): C «You miss it. It screams! It kicks! It kicks again!--More--» vs JS «You miss it. It kicks! It kicks again! It is frozen by you.». Probe: `node scripts/hidden-proxy.mjs verify missum` (scen-poly-Knight-92220). **Addressed:** D-2124 `05fba4ac`


- [x] `invent.c` getobj — blocks 1/553 corpus sessions (first at step 61): C «What do you want to wear? [*]» vs JS «What do you want to wear? [q or ?*]». Probe: `node scripts/hidden-proxy.mjs verify getobj` (scen-poly-Wizard-92169). **Addressed:** D-2123 `d43bbc14`


- [x] `end.c` really_done — blocks 2/553 corpus sessions (first at step 19): C «» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify really_done` (scen-normal-Barbarian-92208, scen-tour-Wizard-92103). **Addressed:** D-2122 `10ea68f1`


- [x] `invent.c` inuse_classify — blocks 2/553 corpus sessions (first at step 84): C «Weapons» vs JS «Weapons». Probe: `node scripts/hidden-proxy.mjs verify inuse_classify` (scen-genesis-Knight-92068, scen-wish-Caveman-92148). **Addressed:** D-2121 `d484a5f8`


- [x] `insight.c` attributes_enlightenment — blocks 2/553 corpus sessions (first at step 50): C «You were petrification resistant from your creature form.» vs JS «You were petrification resistant from your creature form.». Probe: `node scripts/hidden-proxy.mjs verify attributes_enlightenment` (scen-death-Wizard-92120, scen-tour-Barbarian-92079). **Addressed:** D-2120 `6a8cb884`


- [x] `dogmove.c` dog_move — blocks 1/553 corpus sessions (first at step 48): C draws `rn2(1)=0` in dog_move, JS `rn2(5)=1` from distfleeck(monmove.js:808). Probe: `node scripts/hidden-proxy.mjs verify dog_move` (scen-normal-Rogue-92146). **Addressed:** D-2119 `8985b7aa`


- [x] `eat.c` gethungry — blocks 1/553 corpus sessions (first at step 104): C draws `rn2(20)=16` in gethungry, JS `rn2(73)=69` from moveloop_core(allmain.js:1069). Probe: `node scripts/hidden-proxy.mjs verify gethungry` (scen-tour-Healer-92198). **Addressed:** D-2118 `fcc6e805`


- [x] `cmd.c` getdir — blocks 1/553 corpus sessions (first at step 115): C «In what direction?» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify getdir` (scen-poly-Healer-92109). **Addressed:** D-2117 `26431cce`


- [x] `zap.c` resist — blocks 2/553 corpus sessions (first at step 59): C draws `rn2(119)=42` in resist, JS `rn2(20)=16` from zap_hit(zap.js:1335). Probe: `node scripts/hidden-proxy.mjs verify resist` (scen-tour-Priest-92235, scen-wish-Ranger-92212). **Addressed:** D-2116 `12ef27f6`


- [x] `dig.c` zap_dig — blocks 1/553 corpus sessions (first at step 20): C «The beam bounces off the stairs and hits the ceiling.--More-» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify zap_dig` (scen-death-Wizard-92187). **Addressed:** D-2115 `590e414f`


- [x] `quest.c` prisoner_speaks — blocks 1/553 corpus sessions (first at step 146): C «The prisoner speaks: "I'm finally free!"» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify prisoner_speaks` (scen-wish-Rogue-92210). **Addressed:** D-2114 `229b25e1`


- [x] `were.c` were_change — blocks 2/553 corpus sessions (first at step 69): C «The jackal bites!» vs JS «The jackal bites!». Probe: `node scripts/hidden-proxy.mjs verify were_change` (scen-intrinsic-Healer-92124, scen-tour-Ranger-92177). **Addressed:** D-2113 `7a8bf664`


- [x] `wield.c` chwepon — blocks 2/553 corpus sessions (first at step 68): C «Your dexterity was 9.» vs JS «Your dexterity was 9.». Probe: `node scripts/hidden-proxy.mjs verify chwepon` (scen-death-Monk-92000, scen-death-Wizard-92120). **Addressed:** D-2112 `6d4e021f`


- [x] `objnam.c` readobjnam — blocks 2/553 corpus sessions: C resolves slime-mold wishes with zero draws, JS draws `rn2(76)` @ rnd_otyp_by_namedesc(readobjnam.js:245). Probe: `node scripts/hidden-proxy.mjs verify readobjnam` (scen-wish-Archeologist-92238 step 42 "3 slime mold", scen-wish-Knight-92130 step 90 "cursed slime mold"→2). Falsifier: C-recorder wish experiment (D-2021/D-2022/D-2111 — documented paths exhausted, do not re-read). **Addressed:** D-2111 `cc3dcaae`
- [x] `hack.c` spoteffects — blocks 1/553 corpus sessions (first at step 35): screen-first with RNG matched ~361 draws past the D-2111 fix point; C owner `spoteffects` `hack.c:3434` falling-object arm (was `next_ident`@34). Probe: `node scripts/hidden-proxy.mjs verify spoteffects` (scen-tour-Samurai-92161). **Addressed:** D-2111 `cc3dcaae`


- [x] `mkobj.c` next_ident — blocks 3/553 corpus sessions (first at step 34): C draws `rnd(2)=2` in next_ident, JS `rnd(1)=1` from monmulti(weapon.js:1460). Probe: `node scripts/hidden-proxy.mjs verify next_ident` (scen-tour-Samurai-92161, scen-wish-Archeologist-92238, scen-wish-Knight-92130). **Addressed:** D-2111 `cc3dcaae`


- [x] `invent.c` dolook — blocks 1/553 corpus sessions (first at step 108): C «You can't see in here!» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify dolook` (scen-genesis-Wizard-92223). **Addressed:** D-2110 `9ee606c1`


- [x] `insight.c` one_characteristic — blocks 1/553 corpus sessions (first at step 168): C « You were wielding a mattock.» vs JS « You were wielding a pick-axe.». Probe: `node scripts/hidden-proxy.mjs verify one_characteristic` (scen-wish-Priest-92180). **Addressed:** D-2109 `c8488149`


- [x] `dog.c` makedog — blocks 1/553 corpus sessions (first at step 31): C «tame little dog called Slasher» vs JS «tame Slasher». Probe: `node scripts/hidden-proxy.mjs verify makedog` (scen-normal-Caveman-92053). **Addressed:** D-2108 `20e09ee9`


- [x] `zap.c` zap_hit — blocks 1/553 corpus sessions (first at step 59): C draws `rn2(20)=1` in zap_hit, JS `rn2(5)=1` from distfleeck(monmove.js:840). Probe: `node scripts/hidden-proxy.mjs verify zap_hit` (scen-tour-Priest-92235). **Addressed:** D-2107 `67985652`


- [x] `dokick.c` ghitm — blocks 2/553 corpus sessions (first at step 16): C «You harmlessly attack a statue.» vs JS «You attack thin air.». Probe: `node scripts/hidden-proxy.mjs verify ghitm` (scen-genesis-Caveman-92199, scen-poly-Ranger-92090). **Addressed:** D-2106 `7b29e91a`


- [x] `end.c` disclose — blocks 3/553 corpus sessions (first at step 110): C «Do you want to see your conduct and achievements? [ynq] (n)» vs JS «Do you want to see your conduct? [ynq] (n)». Probe: `node scripts/hidden-proxy.mjs verify disclose` (scen-genesis-Barbarian-91118, scen-wish-Monk-92031, scen-wish-Priest-92098). **Addressed:** D-2105 `aa1e6c57`


- [x] `insight.c` enlightenment — blocks 4/553 corpus sessions (first at step 67): C «Wizard the Monk's attributes:» vs JS «Wizard the Monk's attributes:». Probe: `node scripts/hidden-proxy.mjs verify enlightenment` (scen-death-Monk-92000, scen-death-Wizard-92120, scen-wish-Healer-92147). **Addressed:** D-2104 `f297d61d`


- [x] `objnam.c` wishymatch — blocks 1/553 corpus sessions (first at step 70): C «@a human or elf or you (dwarven valkyrie called wizard)--Mor» vs JS «@a human or elf or you (dwarven valkyrie called wizard)». Probe: `node scripts/hidden-proxy.mjs verify wishymatch` (scen-tour-Valkyrie-92040). **Addressed:** D-2103 `cc1595b7`


- [x] `end.c` done_in_by — blocks 2/553 corpus sessions (first at step 47): C «The vampire bat bites! You stop searching.--More--» vs JS «You stop searching. The vampire bat bites!--More--». Probe: `node scripts/hidden-proxy.mjs verify done_in_by` (scen-tour-Barbarian-92024, scen-tour-Ranger-92177). **Addressed:** D-2102 `5ca3ad86`.


- [x] `sp_lev.c` ensure_way_out rescan order — `js/mklev.js` `ensure_way_out` uses an inner `break` (exits y-loop only, x-scan continues) where C `sp_lev.c:5241–5251` uses `goto outhere` (exits both loops, do-while rescans from x=1): with ≥2 disjoint inaccessible regions stacked in one column plus a further-right region, JS joins R3a→R5→R3b where C joins R3a→R3b→R5, shifting the `selection_rndcoord` drain dice. Latent on minetn-6's observed layout (671 drain draws still match) but the D-log "verbatim" claim is false. Fix: labeled `break outer` + re-verify `selection_rndcoord`. Source: reviews/loop-unattended/1065-65152c55-ensure-way-out.md (Actionable 1). **Addressed:** D-2101 `c8d25c72`


- [x] `detect.c` find_trap — blocks 1/553 corpus sessions (first at step 81): C «You find a small mimic.» vs JS «You already found a monster. Use 'm' prefix to force another». Probe: `node scripts/hidden-proxy.mjs verify find_trap` (scen-genesis-Wizard-92223). **Addressed:** D-2100 `3516098b`.
- [x] `wield.c` dowield — blocks 1/553 corpus sessions (first at step 8): C «You have 40 darts readied. Wield one? [ynq] (q)» vs JS «You have 40 dart readied. Wield one? [ynq] (q)». Probe: `node scripts/hidden-proxy.mjs verify dowield` (scen-kit-Tourist-91126). **Addressed:** D-2099 `3516098b`.
- [x] `pager.c` checkfile — blocks 3/553 corpus sessions (first at step 92): C «f - a figurine of a newt.» vs JS «f - a figurine.». Probe: `node scripts/hidden-proxy.mjs verify checkfile` (scen-intrinsic-Samurai-92239, scen-wish-Priest-92179, scen-wish-Priest-92180). **Addressed:** D-2098 `3516098b`.
- [x] `potion.c` peffect_sleeping — blocks 1/553 corpus sessions (first at step 62): C «You yawn.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify peffect_sleeping` (scen-intrinsic-Rogue-92172). **Addressed:** D-2097 `8fffc930`


- [x] `teleport.c` goodpos — blocks 1/553 corpus sessions (first at step 67): C draws `rn2(13)=11` in goodpos, JS `rnd(2)=1` from next_ident(makemon.js:429). Probe: `node scripts/hidden-proxy.mjs verify goodpos` (scen-wish-Rogue-91119). **Addressed:** D-2096 `213658d3`


- [x] `selvar.c` selection_rndcoord — blocks 1/553 corpus sessions (first at step 70): C draws `rn2(670)=351` in selection_rndcoord, JS `rn2(2)=1` from flip_level_rnd(mklev.js:16741). Probe: `node scripts/hidden-proxy.mjs verify selection_rndcoord` (scen-tour-Ranger-92033). **Addressed:** D-2095 `65152c55`


- [x] `trap.c` float_down — blocks 1/553 corpus sessions (first at step 43): C «You float gently to the stairs.» vs JS «You float gently to the floor.». Probe: `node scripts/hidden-proxy.mjs verify float_down` (scen-intrinsic-Samurai-92017). **Addressed:** D-2094 `670a1b21`


- [x] `mon.c` unstuck — blocks 1/553 corpus sessions (first at step 120): C draws `rnd(2)=1` in unstuck, JS `rn2(6)=2` from xkilled(uhitm.js:686). Probe: `node scripts/hidden-proxy.mjs verify unstuck` (scen-wish-Rogue-92210). **Addressed:** D-2093 `08eb8798`.


- [x] `do_name.c` x_monnam — blocks 2/553 corpus sessions (first at step 36): C «@a human or elf or you (orcish barbarian called wizard)--Mor» vs JS «@a human or elf or you (orcish barbarian called wizard)». Probe: `node scripts/hidden-proxy.mjs verify x_monnam` (scen-tour-Barbarian-92024, scen-wish-Knight-91128). **Addressed:** D-2092 `48742ea2`


- [x] `uhitm.c` mhitm_knockback — blocks 2/553 corpus sessions (first at step 236): C draws `rn2(3)=2` in mhitm_knockback, JS `rn2(6)=5` from mhitm_knockback(mhitm.js:2027). Probe: `node scripts/hidden-proxy.mjs verify mhitm_knockback` (scen-poly-Ranger-92090, scen-poly-Wizard-92076). **Addressed:** D-2091 `c5939ae8`


- [x] `monmove.c` dochug — blocks 2/553 corpus sessions (first at step 59): C draws `rn2(5)=1` in dochug, JS `rn2(40)=11` from dochug(monmove.js:2154). Probe: `node scripts/hidden-proxy.mjs verify dochug` (scen-tour-Priest-92235, scen-tour-Wizard-92103). **Addressed:** D-2090 `068dfccc`


- [x] `objnam.c` readobjnam gold-block fall-through on tin-typed `bp` **Addressed:** D-2089 `fd3f5f38`: wish `tin of gold piece` returns GOLD_PIECE where C (`return 2` → typfnd, skips Case 3) makes a tin — guard the `isGold` block in `js/readobjnam.js` with `!d.typ`. Probe: wish `tin of gold piece` and compare object class. Source: reviews/loop-unattended/1054-4d3d5dd3-postparse1-of-arm.md (review 1054, C-wrong 1).


- [x] `do_name.c` roguename — blocks 1/553 corpus sessions (first at step 89): C «Michael Toy's ghost wakes up! You stop searching.--More--» vs JS «You stop searching. Michael Toy's ghost touches you!». Probe: `node scripts/hidden-proxy.mjs verify roguename` (scen-tour-Tourist-91101). **Addressed:** D-2088 `444f29eb`


- [x] `trap.c` burnarmor — blocks 1/553 corpus sessions (first at step 72): C draws `rn2(5)=2` in burnarmor, JS `rn2(6)=0` from trapeffect_fire_trap(trap.js:4042). Probe: `node scripts/hidden-proxy.mjs verify burnarmor` (scen-tour-Wizard-91112). **Addressed:** D-2087 `25328721`


- [x] `muse.c` rnd_misc_item — blocks 1/553 corpus sessions (first at step 70): C draws `rn2(6)=2` in rnd_misc_item, JS `rn2(100)=94` from makemon(makemon.js:3065). Probe: `node scripts/hidden-proxy.mjs verify rnd_misc_item` (scen-tour-Ranger-92033). **Addressed:** D-2086 `ab5c291b`


- [x] `mon.c` mpickstuff — blocks 1/553 corpus sessions (first at step 100): C draws `rn2(25)=2` in mpickstuff, JS `rn2(5)=2` from distfleeck(monmove.js:826). Probe: `node scripts/hidden-proxy.mjs verify mpickstuff` (scen-tour-Tourist-92100). **Addressed:** D-2085 `f042b695`


- [x] `objnam.c` rnd_otyp_by_namedesc — blocks 2/553 corpus sessions (first at step 92): C draws `rn2(26)=7` in rnd_otyp_by_namedesc, JS `rn2(5)=4` from distfleeck(monmove.js:808). Probe: `node scripts/hidden-proxy.mjs verify rnd_otyp_by_namedesc` (scen-intrinsic-Samurai-92239, scen-wish-Priest-92179). **Addressed:** D-2084 `4d3d5dd3`


- [x] `potion.c` peffect_sickness — blocks 2/553 corpus sessions (first at step 47): C «(But in fact it was biologically contaminated slime mold jui» vs JS «(But in fact it was biologically contaminated slime mold jui». Probe: `node scripts/hidden-proxy.mjs verify peffect_sickness` (scen-kit-Rogue-92225, scen-normal-Rogue-92209). **Addressed:** D-2083 `23e6ac54`


- [x] `pickup.c` tipcontainer_gettarget — blocks 2/553 corpus sessions (first at step 130): C «Where to tip the contents of a locked chest» vs JS «Where to tip the contents of a chest». Probe: `node scripts/hidden-proxy.mjs verify tipcontainer_gettarget` (scen-wish-Healer-92092, scen-wish-Knight-92045). **Addressed:** D-2082 `4d63176a`


- [x] `detect.c` monster_detect — blocks 2/553 corpus sessions (first at step 51): C «You sense the presence of monsters. (For instructions type a» vs JS «You sense the presence of monsters.--More--». Probe: `node scripts/hidden-proxy.mjs verify monster_detect` (scen-normal-Priest-91108, scen-normal-Priest-92020). **Addressed:** D-2081 `e55af311`


- [x] `read.c` doread — blocks 2/553 corpus sessions (first at step 27): C «As you read the scroll, it disappears. Nothing interesting h» vs JS «That scroll is not implemented yet.». Probe: `node scripts/hidden-proxy.mjs verify doread` (scen-wish-Knight-92105, scen-wish-Rogue-92019). **Addressed:** D-2080 `3580bf12`


- [x] `polyself.c` rehumanize — blocks 2/553 corpus sessions (first at step 90): C «You hear some noises. You return to human form! You can see » vs JS «You hear some noises. You return to human form!--More--». Probe: `node scripts/hidden-proxy.mjs verify rehumanize` (scen-poly-Archeologist-92119, scen-poly-Wizard-92076). **Addressed:** D-2079 `2d94d42e`


- [x] `spell.c` spelleffects_check — blocks 2/553 corpus sessions (first at step 22): C «You don't have enough energy to cast that spell yet.» vs JS «You don't have enough energy to cast that spell.». Probe: `node scripts/hidden-proxy.mjs verify spelleffects_check` (scen-kit-Priest-92122, scen-normal-Priest-92113). **Addressed:** D-2078 `620d57b0`


- [x] `do_wear.c` armoroff — blocks 2/553 corpus sessions (first at step 49): C «You finish taking off your helm.» vs JS «You finish taking off your helmet.». Probe: `node scripts/hidden-proxy.mjs verify armoroff` (scen-kit-Knight-92106, scen-normal-Knight-92215). **Addressed:** D-2077 `6a12bc6f`


- [x] `wield.c` can_twoweapon — blocks 2/553 corpus sessions (first at step 43): C «Your battle-axe isn't one-handed.» vs JS «battle-axe isn't one-handed.». Probe: `node scripts/hidden-proxy.mjs verify can_twoweapon` (scen-kit-Barbarian-92001, scen-kit-Samurai-92145). **Addressed:** D-2076 `3a388782`


- [x] `uhitm.c` mhitm_ad_stun — blocks 2/553 corpus sessions (first at step 67): C draws `rn2(4)=2` in mhitm_ad_stun, JS `rn2(3)=2` from mhitm_knockback(mhitm.js:2014). Probe: `node scripts/hidden-proxy.mjs verify mhitm_ad_stun` (scen-genesis-Archeologist-91127, scen-genesis-Barbarian-91118). **Addressed:** D-2075 `4e4cce99`


- [x] `uhitm.c` mhitm_ad_samu — blocks 2/553 corpus sessions (first at step 53): C draws `rn2(20)=6` in mhitm_ad_samu, JS `rn2(3)=0` from mhitm_knockback(mhitm.js:2015). Probe: `node scripts/hidden-proxy.mjs verify mhitm_ad_samu` (scen-tour-Samurai-91113, scen-tour-Wizard-92103). **Addressed:** D-2074 `8598abcf`


- [x] `engrave.c` doengrave — blocks 2/553 corpus sessions (first at step 51): C «Do you want to add to the current engraving? [ynq] (y)» vs JS «You add to the writing in the dust with your fingertip.--Mor». Probe: `node scripts/hidden-proxy.mjs verify doengrave` (scen-kit-Valkyrie-91116, scen-normal-Samurai-92078). **Addressed:** D-2073 `2831f984`


- [x] `muse.c` use_misc — blocks 2/553 corpus sessions (first at step 77): C «The pit fiend drinks a dark green potion! The pit fiend look» vs JS «The pit fiend drinks a dark green potion! The pit fiend look». Probe: `node scripts/hidden-proxy.mjs verify use_misc` (scen-wish-Healer-92125, scen-wish-Healer-92173). **Addressed:** D-2072 `37cebe60`


- [x] `uhitm.c` erode_armor — blocks 2/553 corpus sessions (first at step 74): C draws `rn2(5)=1` in erode_armor, JS `rn2(3)=1` from mhitm_knockback(mhitm.js:2015). Probe: `node scripts/hidden-proxy.mjs verify erode_armor` (scen-genesis-Knight-92185, scen-genesis-Tourist-92044). **Addressed:** D-2071 `357757d9`


- [x] `objnam.c` xname_flags — blocks 2/553 corpus sessions (first at step 38): C «Hachi drops a scroll labeled XIXAXA XOXAXA XUXAXA. You yawn.» vs JS «Hachi drops a scroll labeled XIXAXA XOXAXA XUXAXA.--More--». Probe: `node scripts/hidden-proxy.mjs verify xname_flags` (scen-intrinsic-Samurai-92017, scen-wish-Priest-92035). **Addressed:** D-2070 `55a129a8`


- [x] `polyself.c` dohide — moves 1/2 m_move-blocked sessions (scen-poly-Wizard-92076 step 94): C «You are now hiding on the ceiling.» (dohide sets u.uundetected=1 + insight.c:2022 youhiding(FALSE,0)) vs JS «Any special ability you may have is purely reflexive.» (named omission js/polyself.js:1527/1562; D-1898 shipped the other five #monster arms, dohide never ported). uundetected forces m_move appr=0 draw-free (C chcnt ladder vs JS track checks). Split from parked `monmove.c` m_move 2026-09-08 (see Parked). Probe: port dohide + youhiding + `node scripts/hidden-proxy.mjs verify m_move` (Wizard-92076 must PASS or move to a later owner; Caveman-92202 stays — parked cnt/mtrack writer). **Addressed:** D-2069 `fd96761c`


- [x] `bones.c` savebones remove_mon_from_bones + LEAVESTATUE statue arm — blocks 1/553 corpus sessions: C 2× `rn2(100)`@obj_resists (mongone Medusa via mdrop_special_objs) + statue (`next_ident`+`rndmonst_adj`+`rn2(2)`) where JS skips both (named omissions js/end.js:1222-1226). Probe: `node scripts/hidden-proxy.mjs verify obj_resists` (scen-genesis-Valkyrie-92074 step 75). Split from parked `zap.c obj_resists` 2026-09-08 (see Parked). **Addressed:** D-2068 `37fe9ecd`


- [x] `mhitu.c` wildmiss — blocks 2/553 corpus sessions (first at step 186): C draws `rn2(3)=1` in wildmiss, JS `rn2(5)=4` from distfleeck(monmove.js:808). Probe: `node scripts/hidden-proxy.mjs verify wildmiss` (scen-wish-Healer-92147, scen-wish-Ranger-92155). **Addressed:** D-2067 `b9138d02`


- [x] `const.js` M_AP_TYPE mask — moves 1/3 mcalcmove-blocked sessions (scen-wish-Archeologist-92216 step 180) **Addressed:** D-2066 `64048333`: C `M_AP_TYPE(m) ((m)->m_ap_type & M_AP_TYPMASK)` (monst.h) skips the mimicking Large Mimic in monster_nearby, JS `M_AP_TYPE` (const.js:3184) returns raw `m_ap_type=10` (OBJECT|F_DKNOWN) so rest-safety blocks ('.'→ECMD_OK, no time) where C rests (ECMD_TIME) and runs the block. Split from parked `mon.c` mcalcmove 2026-09-08 (see Parked). Probe: port the mask + `node scripts/hidden-proxy.mjs verify mcalcmove` (Archeologist must PASS or move to a later owner; Rogue/Knight stay — parked slime writer).


- [x] `zap.c` zapyourself — blocks 2/553 corpus sessions (first at step 17): C «You've set yourself afire! Your gloves smoulder!--More--» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify zapyourself` (scen-death-Knight-92188, scen-wish-Rogue-92210). **Addressed:** D-2065 `dd88a89c`


- [x] `polyself.c` polyself — blocks 2/553 corpus sessions (first at step 63): C «You can't polymorph into Croesus.--More--» vs JS «You can't polymorph into a Croesus.--More--». Probe: `node scripts/hidden-proxy.mjs verify polyself` (scen-poly-Archeologist-92119, scen-poly-Caveman-91133). **Addressed:** D-2063 `84dc0e34`


- [x] `insight.c` one_characteristic — blocks 3/553 corpus sessions (first at step 14): C «Your constitution was 18 (limit:18).» vs JS «Your constitution was 18 (limit:18).». Probe: `node scripts/hidden-proxy.mjs verify one_characteristic` (scen-normal-Barbarian-92208, scen-normal-Caveman-92006, scen-normal-Tourist-91122).


- [x] `end.c` really_done — blocks 3/553 corpus sessions (first at step 23): C «Do not pass Go. Do not collect 200 zorkmids.--More--» vs JS «Do you want your possessions identified? [ynq] (n)». Probe: `node scripts/hidden-proxy.mjs verify really_done` (scen-death-Ranger-92114, scen-genesis-Archeologist-91132, scen-wish-Monk-91136). **Addressed:** D-2061 `9151bc52`


- [x] `bones.c` drop_upon_death — blocks 3/553 corpus sessions (first at step 95): C draws `rn2(5)=1` in drop_upon_death, JS `rn2(1000)=746` from start_corpse_timeout(mkobj.js:1395). Probe: `node scripts/hidden-proxy.mjs verify drop_upon_death` (scen-death-Knight-92203, scen-intrinsic-Caveman-92070, scen-intrinsic-Healer-91105). **Addressed:** D-2060 `69ae5b11`


- [x] `apply.c` use_pole — blocks 3/553 corpus sessions (first at step 62): C «You miss Pestilence.--More--» vs JS «You miss Pestilence.». Probe: `node scripts/hidden-proxy.mjs verify use_pole` (scen-genesis-Archeologist-91127, scen-genesis-Barbarian-91118, scen-wish-Rogue-91138). **Addressed:** D-2059 `0a8386e7`


- [x] `drawing.c` def_char_is_furniture — blocks 3/553 corpus sessions (first at step 49): C «branch staircase up» vs JS «unexplored area». Probe: `node scripts/hidden-proxy.mjs verify def_char_is_furniture` (scen-kit-Archeologist-92170, scen-normal-Knight-91100, scen-normal-Rogue-92209). **Addressed:** D-2058 `61843507`


- [x] `botl.c` do_statusline1 — blocks 3/553 corpus sessions (first at step 119): C «You were wearing an uncursed +2 ring of gain strength (on ri» vs JS «You were wearing an uncursed +2 ring of gain strength (on ri». Probe: `node scripts/hidden-proxy.mjs verify do_statusline1` (scen-normal-Wizard-91114, scen-poly-Priest-92097, scen-wish-Archeologist-92038). **Addressed:** D-2057 `a223472a`


- [x] `dothrow.c` dofire — blocks 3/553 corpus sessions (first at step 38): C «You ready: b - a +0 short sword.--More--» vs JS «In what direction?». Probe: `node scripts/hidden-proxy.mjs verify dofire` (scen-normal-Barbarian-92036, scen-normal-Valkyrie-92237, scen-tour-Rogue-92030). **Addressed:** D-2056 `72cf8c52`


- [x] `objnam.c` readobjnam — blocks 3/553 corpus sessions (first at step 59): C draws `rn2(2)=1` in readobjnam, JS `rn2(100)=29` from makewish(zap.js:6638). Probe: `node scripts/hidden-proxy.mjs verify readobjnam` (scen-wish-Caveman-92148, scen-wish-Priest-92136, scen-wish-Rogue-91119). **Addressed:** D-2055 `df50c05e`

## 2026-09-07

- [x] `teleport.c` level_tele — blocks 3/553 corpus sessions (first at step 51): C «You materialize on a different level!--More--» vs JS «You materialize on a different level!». Probe: `node scripts/hidden-proxy.mjs verify level_tele` (scen-tour-Barbarian-92129, scen-tour-Samurai-92161, tour-Samurai-70015-d5-8-15-17-22). **Addressed:** D-2054 `48101789`


- [x] `spell.c` study_book — blocks 2/553 corpus sessions (first at step 83): C draws `rnd(25)=6` in study_book, JS `rn2(70)=50` from maybe_generate_rnd_mon(allmain.js:349). Probe: `node scripts/hidden-proxy.mjs verify study_book` (scen-wish-Healer-92029, scen-wish-Healer-92066). **Addressed:** D-2053 `ac555b16`


- [x] `uhitm.c` passive — blocks 3/553 corpus sessions (first at step 121): C draws `rn2(3)=1` in passive, JS `d(1,6)=5` from damageum(uhitm.js:1285). Probe: `node scripts/hidden-proxy.mjs verify passive` (scen-poly-Healer-92107, scen-poly-Rogue-92026, scen-wish-Wizard-92153). **Addressed:** D-2052 `0e04e7bc`


- [x] `hack.c` losehp — blocks 4/553 corpus sessions (first at step 23): C «You die...--More--» vs JS «The bow named the Longbow of Diana evades your grasp!--More-». Probe: `node scripts/hidden-proxy.mjs verify losehp` (scen-genesis-Archeologist-91132, scen-genesis-Ranger-92126, scen-wish-Tourist-92081). **Addressed:** D-2051 `d1f26ab3`


- [x] `do_wear.c` Blindf_off — blocks 2/553 corpus sessions (first at step 211): C «You turn into a ghoul! You can see again.» vs JS «You turn into a ghoul!». Probe: `node scripts/hidden-proxy.mjs verify Blindf_off` (scen-poly-Ranger-92090, scen-poly-Ranger-92133). **Addressed:** D-2050 `b11c9f44`


- [x] `uhitm.c` mhitm_ad_were — blocks 2/553 corpus sessions (first at step 41): C draws `rn2(4)=1` in mhitm_ad_were, JS `rn2(3)=2` from mhitm_knockback(mhitm.js:2015). Probe: `node scripts/hidden-proxy.mjs verify mhitm_ad_were` (scen-genesis-Knight-92149, scen-wish-Rogue-92184). **Addressed:** D-2049 `59751376`


- [x] `invent.c` addinv_core0 quiver fill fires on merge (review-measured): C merges `goto added`, skipping `:1128–1140` (fresh-insert only); JS also fills on merge. Fix: delete that hunk. Source: reviews/loop-unattended/1014-a101cf0e-simpleonames-quiver.md (1014 C-wrong 1). **Addressed:** D-2048 `f5587f13`


- [x] `monmove.c` m_search_items — blocks 2/553 corpus sessions (first at step 59): C draws `rn2(25)=12` in m_search_items, JS `rn2(1)=0` from m_move(monmove.js:1813). Probe: `node scripts/hidden-proxy.mjs verify m_search_items` (scen-tour-Samurai-92032, scen-tour-Tourist-92100). **Addressed:** D-2047 `d0c254aa`


- [x] `music.c` do_play_instrument — blocks 3/553 corpus sessions (first at step 63): C «Improvise? [ynq] (q)» vs JS «Improvise? [ynq] (y)». Probe: `node scripts/hidden-proxy.mjs verify do_play_instrument` (scen-intrinsic-Healer-92168, scen-wish-Caveman-92174, scen-wish-Ranger-92156). **Addressed:** D-2046 `376d29e8`


- [x] `mondata.c` name_to_monclass — blocks 3/553 corpus sessions (first at step 59): C «fa cat or other feline (tame kitten)» vs JS «ka kitten». Probe: `node scripts/hidden-proxy.mjs verify name_to_monclass` (scen-genesis-Wizard-92223, scen-kit-Monk-92007, scen-normal-Knight-91100). **Addressed:** D-2045 `29aff746`


- [x] `wield.c` doquiver_core — blocks 3/553 corpus sessions (first at step 18): C «Your alternate weapon is 6 orcish daggers. Ready 5 of them? » vs JS «Your alternate weapon is 6 orcish dagger. Ready 5 of them? [». Probe: `node scripts/hidden-proxy.mjs verify doquiver_core` (scen-normal-Rogue-92115, scen-normal-Valkyrie-92200, scen-tour-Rogue-92030). **Addressed:** D-2044 `a101cf0e`


- [x] `uhitm.c` mhitm_knockback — blocks 3/553 corpus sessions (first at step 77): C draws `rn2(3)=2` in mhitm_knockback, JS `d(3,4)=10` from hitmu(mhitu.js:2431). Probe: `node scripts/hidden-proxy.mjs verify mhitm_knockback` (scen-tour-Wizard-92219, scen-wish-Valkyrie-92142, scen-wish-Valkyrie-92206). **Addressed:** D-2035 `0a7a7fc4` (stale: all 3 moved at 0a7a7fc4 per committed scoreboards — 92142 PASS, 92219 → obj_resists@115, 92206 RNG→screen use_lamp@220; `verify --fn mhitm_knockback --base ee5d6d71` PROGRESS, 0 blocked at HEAD; no js/ — body full since D-1932, hitmu order verified C-exact mhitu.c:1187–1194)


- [x] `uhitm.c` mhitm_mgc_atk_negated — blocks 4/553 corpus sessions (first at step 127): C draws `rn2(10)=1` in mhitm_mgc_atk_negated, JS `rn2(3)=2` from mhitm_knockback(mhitm.js:1997). Probe: `node scripts/hidden-proxy.mjs verify mhitm_mgc_atk_negated` (scen-genesis-Caveman-92118, scen-poly-Valkyrie-92195, scen-wish-Archeologist-92038). **Addressed:** D-2043 `62183c30`


- [x] `dokick.c` kick_monster caitiff float — `js/dokick.js:860` calls now-async `check_caitiff` without await (C `dokick.c:68` synchronous; the 9 other sites were awaited in D-2036). Probe: add await, Knight/Samurai kick replay. Source: reviews/loop-unattended/1006-4c3db33a-do-attack-cluster.md (C-wrong 3). **Addressed:** D-2042 `d01aa3bb`


- [x] `uhitm.c` ranged silver predicate — D-2036 tests `hates_silver(mon.data)`, dropping C's `is_vampshifter(mon)` disjunct (`mondata.c:516–520`); exact callee `mon_hates_silver` live in `js/monsters.js:833`. Probe: import + swap, silver-vs-vampshifter replay. Source: reviews/loop-unattended/1006-4c3db33a-do-attack-cluster.md (C-wrong 2). **Addressed:** D-2041 `f536bbde`


- [x] `uhitm.c` hmon_hitmon_weapon_ranged boomerang tail `:901–917` — unported, unnamed in D-2036: `!thrown && obj==uwep && BOOMERANG && rnl(4)==3` → splinter pline + `uwepgone`/`useup` + `hittxt` + `dmg++` (RNG + state surface; all callees live: `rnl` sync, `uwepgone` async-await, `useup` sync). Probe: port the arm, `node scripts/verify.mjs --fn do_attack` + wield-boomerang replay. Source: reviews/loop-unattended/1006-4c3db33a-do-attack-cluster.md (C-wrong 1). **Addressed:** D-2040 `e2c5bc79`.


- [x] `end.c` disclose — blocks 5/553 corpus sessions (first at step 102): C «Do you want your possessions identified? [ynq] (n)» vs JS «Well done, mortal! But now thou must face the final Test...-». Probe: `node scripts/hidden-proxy.mjs verify disclose` (scen-intrinsic-Rogue-92089, scen-normal-Barbarian-92208, scen-normal-Healer-92227). **Addressed:** D-2039 `55de4d0e`


- [x] `do_name.c` x_monnam — blocks 6/553 corpus sessions (first at step 38): C «human ranger called wizard» vs JS «Can't find dungeon feature '<'.». Probe: `node scripts/hidden-proxy.mjs verify x_monnam` (scen-genesis-Ranger-92126, scen-normal-Caveman-92006, scen-normal-Caveman-92117). **Addressed:** D-2038 `2d18057e`


- [x] `mthrowu.c` monshoot — blocks 3/553 corpus sessions (first at step 8): C «You find an arrow trap.--More--» vs JS «You find an arrow trap.». Probe: `node scripts/hidden-proxy.mjs verify monshoot` (scen-kit-Archeologist-92190, scen-kit-Knight-92106, scen-normal-Wizard-91114). **Addressed:** D-2037 `e650e3d1`


- [x] `uhitm.c` do_attack — blocks 3/553 corpus sessions (first at step 30): C «You begin bashing monsters with your crossbow.--More--» vs JS «You begin bashing monsters with your crossbow. You hit the g». Probe: `node scripts/hidden-proxy.mjs verify do_attack` (scen-genesis-Monk-91115, scen-kit-Samurai-91129, scen-poly-Tourist-92047). **Addressed:** D-2036 `4c3db33a`


- [x] `detect.c` dosearch residual (post-D-2035: strangulation pair PASS) — blocks 3/553 corpus sessions: grid-bug `x` at different map cells with matched RNG (scen-normal-Archeologist-92012 step 10; scen-normal-Wizard-92127 step 31: C `·········│` vs JS `x········│` row 7 col 57) + gremlin round one attack short in JS (scen-tour-Archeologist-92023 step 65: C «The gremlin bites!--More--» vs JS «The gremlin bites!»; suspect `mattacku` attack count — own brief, not this row). Probe: `node scripts/hidden-proxy.mjs verify dosearch` (scen-normal-Archeologist-92012, scen-normal-Wizard-92127, scen-tour-Archeologist-92023). **Addressed:** D-2035 `0a7a7fc4`


- [x] `detect.c` dosearch — blocks 5/553 corpus sessions (first at step 40): C «You suffocate. You stop searching.--More--» vs JS «You suffocate. You stop searching.». Probe: `node scripts/hidden-proxy.mjs verify dosearch` (scen-death-Monk-92121, scen-death-Monk-92191, scen-normal-Archeologist-92012). **Addressed:** D-2035 `0a7a7fc4`


- [x] `bones.c` give_to_nearby_mon — blocks 5/553 corpus sessions (first at step 81): C draws `rn2(1)=0` in give_to_nearby_mon, JS `rn2(5)=1` from drop_upon_death(end.js:1162). Probe: `node scripts/hidden-proxy.mjs verify give_to_nearby_mon` (scen-genesis-Barbarian-92201, scen-genesis-Caveman-91109, scen-genesis-Ranger-91139). **Addressed:** D-2034 `b87c6332`


- [x] `uhitm.c` mhitm_ad_famn — blocks 1/553 corpus sessions: scen-wish-Tourist-92067 step 140/234 C `d(8,8)@hitmu` + `rn2(2)@exercise` (`:3793` mhitu arm) + `rn2(40)@mhitm_ad_famn(:3795)` «Famine reaches out, and your body shrivels.» vs JS «You hit Famine.» (no AD_FAMN dispatch in `mhitu.js`; `verify mhitm_ad_famn` is vacuous until rescore re-attributes it from `exercise`). **Addressed:** D-2033 `7d22c4f3`


- [x] `read.c` seffect_fire — blocks 1/553 corpus sessions: scen-wish-Ranger-92212 step 66/152 C `rn2(19)@exercise` (seffects head `:2199–2200`) + `rn2(3)@seffect_fire(:1864)` + `rn2(19)@exercise` vs JS «That scroll is not implemented yet.» (doread allowlist lacks SCR_FIRE; `verify seffect_fire` is vacuous until rescore re-attributes it from `exercise`). **Addressed:** D-2032 `40b275ef`


- [x] `potion.c` dodrink — blocks 3/553 corpus sessions (first at step 118): C «If you can't breathe air, how can you drink liquid?» vs JS «What do you want to drink? [di or ?*]». Probe: `node scripts/hidden-proxy.mjs verify dodrink` (scen-intrinsic-Priest-92096, scen-wish-Knight-91128, scen-wish-Rogue-92137). **Addressed:** D-2031 `ee5d6d71`


- [x] `wizard.c` tactics/target_on — covetous pursuit + STRAT_HEAL branch deferred **Addressed:** D-2030 `525cbba9` (JS `tactics` HEAL arm is a mavenge-only stub; `strategy` bands 2–3 return HEAL/NONE where C `target_on` pursues M3_WANTS*); 4 ex-`collect_coords` sessions diverge here: C first draw of step is `collect_coords` `rn2(8)` with zero tactics draws in stepFns, JS draws `tactics` `rn2(5/33)` / `distfleeck` `rn2(5)` at the same index (C `mnearto`→`enexto` is RNG-free pre-shuffle: `goodpos`/`noteleport_level`/`mnearto` draw nothing on these paths). Probe: `node scripts/hidden-proxy.mjs verify collect_coords` (scen-poly-Healer-92107, scen-tour-Priest-92235, scen-tour-Samurai-91113, scen-tour-Wizard-92103).


- [x] `hack.c` trapmove — blocks 3/553 corpus sessions (first at step 85): C «You are a statue.--More--» vs JS «You are a statue. You can move again.». Probe: `node scripts/hidden-proxy.mjs verify trapmove` (scen-death-Knight-92203, scen-death-Monk-92123, scen-intrinsic-Caveman-92070). **Addressed:** D-2029 `4bda180d`


- [x] `pickup.c` use_container — blocks 4/553 corpus sessions (first at step 84): C «Your sack is empty. Do what with it?» vs JS «Your sack is empty. Do what with it?». Probe: `node scripts/hidden-proxy.mjs verify use_container` (scen-intrinsic-Rogue-92089, scen-kit-Rogue-92225, scen-normal-Rogue-92160). **Addressed:** D-2028 `92eedfe1`


- [x] `wizard.c` pick_nasty juvenile alt gate **Addressed:** D-2027 `3dee5419` — blocks 1/553 corpus sessions: scen-genesis-Caveman-92118 step 97/167 C «A green dragon appears next to you.» vs JS «A baby green dragon appears next to you.» (ROLL_FROM matches on GREEN_DRAGON; C `big_to_little` juvenile name-string gate keeps the adult, JS `pick_nasty` doc-named omission always accepts the non-geno baby alt; `newmonhp` is now verbatim so only the mndx input differs — see latest D-log entry). Probe: `node scripts/hidden-proxy.mjs show scen-genesis-Caveman-92118` (replay in output; `verify pick_nasty` is vacuous until rescore re-attributes it from `newmonhp`).


- [x] `eat.c` lesshungry — blocks 5/553 corpus sessions (first at step 7): C «You're finally finished.» vs JS «You finish eating the food ration.». Probe: `node scripts/hidden-proxy.mjs verify lesshungry` (scen-kit-Archeologist-92190, scen-kit-Monk-92139, scen-kit-Valkyrie-91116). **Addressed:** D-2026 `d4d3c77f`


- [x] `insight.c` one_characteristic — blocks 5/553 corpus sessions (first at step 54): C «Your constitution was 14 (limit:18).» vs JS «Your constitution was 14 (limit:18).». Probe: `node scripts/hidden-proxy.mjs verify one_characteristic` (scen-genesis-Ranger-91139, scen-genesis-Ranger-92073, scen-genesis-Ranger-92151).


- [x] `botl.c` do_statusline2 — blocks 5/553 corpus sessions (first at step 63): C «The jackal bites! The jackal bites!» vs JS «The jackal bites! The jackal bites!». Probe: `node scripts/hidden-proxy.mjs verify do_statusline2` (scen-poly-Monk-92164, scen-poly-Priest-91137, scen-poly-Tourist-92047). **Addressed:** D-2024 `b488e0f5`


- [x] `attrib.c` exercise — blocks 5/553 corpus sessions (first at step 60): C draws `rn2(2)=1` in exercise, JS `rn2(300)=129` from dosounds(sounds.js:344). Probe: `node scripts/hidden-proxy.mjs verify exercise` (scen-death-Monk-92000, scen-death-Tourist-92095, scen-death-Wizard-92120). **Addressed:** D-2023 `b18a67bd`


- [x] `objnam.c` readobjnam — "cursed slime mold" prefixed-food zero-draw path (D-2021 Next-(a) + D-2022 leftover) — blocks 1/553 corpus sessions: scen-wish-Knight-92130 step 90/205: C zero draws + «j - 2 slime molds.» vs JS `rn2(76)` @ rnd_otyp_by_namedesc(readobjnam.js:245) + «j - a slime mold.». Probe: `node scripts/hidden-proxy.mjs show scen-wish-Knight-92130` (falsifier: C-recorder wish experiment per D-2021/D-2022 — do not re-read the parse, run the experiment). **Addressed:** D-2022 `d7b4d542`


- [x] `mkobj.c` next_ident — blocks 6/553 corpus sessions (first at step 157): C draws `rnd(2)=1` in next_ident, JS `rn2(5)=2` from distfleeck(monmove.js:808). Probe: `node scripts/hidden-proxy.mjs verify next_ident` (scen-poly-Priest-92021, scen-tour-Wizard-92103, scen-wish-Archeologist-92038). **Addressed:** D-2022 `d7b4d542`


- [x] `pager.c` describe_looked self '@' found-count — C `pager.c:1346–1355` `found += append_str(out_str, "you")` takes found 1→2 so `do_look :1941` (`found == 1`) skips checkfile; JS keeps `found: 1` so verbose (`:`) look at own square as dwarf/gnome/orc with help on emits `More info about "dwarven archeologist"?` (data keys `archeolog*`/`* valkyrie`/`* ranger`/`* wizard` pmatch the simplified self-lookat string; measured vs embedded dat_text.js) where C prints nothing. Fix: `found: orYou ? 2 : 1` in the self branch. Probe: verbose-look own square as dwarven hero, watch for the extra yn prompt. Source: reviews/loop-unattended/983-488f18ab-pager-or-you-found.md. **Addressed:** D-2020 `923fadb9`


- [x] `detect.c` dosearch0 counted-search multi lifecycle — blocks 1/553 corpus sessions: scen-death-Monk-92191 step 30/70 C «Searching doesn't feel like a good idea right now.» vs JS «» (safety gate itself now faithful per D-log latest entry; C's second `20s` multi-search ends within step 29 with no `You stop searching` print while JS burns ~16 STRANGLED turns across steps 24–29, so the step-30 `s` never reaches the gate in JS). Probe: `node scripts/hidden-proxy.mjs verify cmd_safety_prevention` then prefix-replay steps 29–30. Falsifier needed: C moveloop multi/occupation trace at steps 29–30 (silent `nomul(0)`-on-find vs occupation stop). **Addressed:** D-2019 `2ae51922`


- [x] `pickup.c` tipcontainer_gettarget — blocks 4/553 corpus sessions (first at step 63): C «Where to tip the contents of an empty uncursed sack» vs JS «The bag is empty.». Probe: `node scripts/hidden-proxy.mjs verify tipcontainer_gettarget` (scen-normal-Archeologist-92211, scen-normal-Archeologist-92228, scen-normal-Archeologist-92236). **Addressed:** D-2018 `1453da16`


- [x] `makemon.c` newmonhp — blocks 4/553 corpus sessions (first at step 83): C draws `d(10,8)=52` in newmonhp, JS `d(29,8)=116` from newmonhp(makemon.js:926). Probe: `node scripts/hidden-proxy.mjs verify newmonhp` (scen-genesis-Barbarian-91118, scen-genesis-Caveman-92118, scen-genesis-Knight-92149). **Addressed:** D-2017 `e6c464a4`


- [x] `do.c` doup — blocks 4/553 corpus sessions (first at step 9): C «Beware, there will be no return! Still climb? [yn] (n)» vs JS «You can't go up here.». Probe: `node scripts/hidden-proxy.mjs verify doup` (scen-normal-Barbarian-92208, scen-normal-Healer-92227, scen-normal-Rogue-92160). **Addressed:** D-2016 `72fbe787`


- [x] `end.c` disclose — blocks 5/553 corpus sessions (first at step 73): C «Do you want to see your conduct and achievements? [ynq] (n)» vs JS «Do you want to see your conduct? [ynq] (n)». Probe: `node scripts/hidden-proxy.mjs verify disclose` (scen-genesis-Caveman-91109, scen-genesis-Priest-92082, scen-genesis-Valkyrie-92074). **Addressed:** D-2015 `e495002e`


- [x] `engrave.c` engrave — blocks 5/553 corpus sessions (first at step 88): C «You finish writing in the dust.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify engrave` (scen-intrinsic-Samurai-92043, scen-kit-Priest-92085, scen-normal-Caveman-92006). **Addressed:** D-2014 `a1c71d43`


- [x] `objnam.c` wishymatch — blocks 5/553 corpus sessions (first at step 65): C «@a human or elf or you (dwarven archeologist called wizard)» vs JS «@a human or elf (dwarven archeologist called wizard)». Probe: `node scripts/hidden-proxy.mjs verify wishymatch` (scen-genesis-Archeologist-92175, scen-genesis-Archeologist-92205, scen-tour-Archeologist-92023). **Addressed:** D-2013 `488f18ab`


- [x] `allmain.c` regen_hp — blocks 6/553 corpus sessions (first at step 42): C «You are in full health.--More--» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify regen_hp` (scen-death-Ranger-92234, scen-genesis-Archeologist-92084, scen-intrinsic-Barbarian-92008). **Addressed:** D-2012 `c2d980de`


- [x] `do.c` cmd_safety_prevention — blocks 7/553 corpus sessions (first at step 19): C «Searching doesn't feel like a good idea right now.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify cmd_safety_prevention` (scen-death-Caveman-92159, scen-death-Monk-92121, scen-death-Monk-92191). **Addressed:** D-2011 `0e408b9f`


- [x] `artifact.c` touch_artifact — blocks 7/553 corpus sessions (first at step 22): C draws `d(4,10)=28` in touch_artifact, JS `rn2(100)=7` from makewish(zap.js:6638). Probe: `node scripts/hidden-proxy.mjs verify touch_artifact` (scen-genesis-Archeologist-91132, scen-genesis-Archeologist-91135, scen-genesis-Priest-91110). **Addressed:** D-2010 `dad22c02`


- [x] `allmain.c` moveloop / `cmd.c` multi-turn count accounting — blocks 1/553: scen-intrinsic-Caveman-92150 step 92 `^X` shows C `You entered the dungeon 62 turns ago.` vs JS 61 with identical RNG/screens before it (D-1997 residual, not page order). Recipe forensics: `#levelchange` is XP-set (not a level jump), `^W` is wizard-wish, `20s` blocks are count-20 `dosearch` repetitions — exactly one zero-RNG turn among steps 44–91 counted by C, not JS (suspect: multi-turn `dosearch` count/interrupt edge). Falsifier first: JS-side per-step moves trace vs C RNG log to name the turn, then port the `context.move`/`multi` gate owner. Do NOT `+1` the disclosure line. Probe: `node scripts/hidden-proxy.mjs verify enlightenment` (scen-intrinsic-Caveman-92150). **Addressed:** D-2009 `d7411fbf`


- [x] `surface()` stairs arm — blocks 1/553 (at step 91): C `Your helm falls to the stairs!` (`break_armor` nohands helm arm via `surface(u.ux,u.uy)`) vs JS `falls to the floor`; hero stands on stairs on both sides (screens match through step 90). Diagnosed residual of the drop_weapon port. Probe: `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-poly-Ranger-92133.session.json` then `node scripts/hidden-proxy.mjs verify drop_weapon`. **Addressed:** D-2008 `6d8641bf`


- [x] `polyself.c` polymon verbose-tip block — blocks 3/553: **Addressed:** D-2007 `450fd66d` C `Use the command #sit to lay an egg.` (Valkyrie-92195 step 108 soldier ant, Ranger-92049 step 86 raven) / `Use the command #monster to hide.` (Wizard-92076 step 85 rock piercer) from the `polymon` `flags.verbose` arms (breath/spit/nymph/gaze/hide/web/were/gremlin/unicorn/mindflayer/shriek/vampire/sit-egg with `lays_eggs`+female+eel/`eggs_in_water` gates); JS `polymon` (`js/polyself.js`) has the breath tip only. Diagnosed residual of the drop_weapon port (that function's text now byte-exact; the pending `--More--` is the missing tip). Probe: `node frozen/ps_test_runner.mjs .cache/hidden/sessions/scen-poly-Valkyrie-92195.session.json` then `node scripts/hidden-proxy.mjs verify drop_weapon` (residuals still attributed there until the tip lands).


- [x] `mkroom.c` somex / `themerms.lua` themed-room fills at Dlvl 1 — blocks 4/553 at step 0 (15.7k RNG) plus 5 `unattributed` step-0 rows (`rn2(27) @ nhlib.lua random parent=contents(themerms.lua:183)` vs JS `rnd_rect`): a themed room C fills that the port skips. Geometry owner → `node scripts/geom-probe.mjs scen-genesis-Monk-92025` first, then port the missing `themerms.lua` room/fill from `nethack-c/upstream/dat/themerms.lua` (26 rooms; check which `name =` entries `js/mklev.js` lacks). Probe: `node scripts/hidden-proxy.mjs verify somex` (scen-genesis-Monk-92025, scen-genesis-Rogue-92069, scen-poly-Caveman-91133). **Addressed:** D-2006 `c9f485f3`


- [x] `uhitm.c` mhitm_mgc_atk_negated — blocks 5/553 (first at step 26): C draws `rn2(10)` in `mhitm_mgc_atk_negated :87` (the `AD_*` magic-attack negation gate before knockback) where JS is already in `mhitm_knockback`. Probe: `node scripts/hidden-proxy.mjs verify mhitm_mgc_atk_negated` (scen-genesis-Tourist-92003, scen-poly-Caveman-92050, scen-wish-Caveman-92183). **Addressed:** D-2005 `cb634081`


- [x] `read.c` create_particular_creation — blocks 5/553 (first at step 14): `^G` of a unique / genocided / not-yet-eligible monster: C `Creating doppelganger instead; force Demogorgon? [yn] (n)` (`read.c:3267` `create_particular_creation` uniqueness / `mvitals` gate) vs JS creating it directly. Probe: `node scripts/hidden-proxy.mjs verify create_particular_creation` (scen-death-Valkyrie-92229, scen-genesis-Barbarian-91118, scen-genesis-Knight-92149). **Addressed:** D-2004 `b528f06c`


- [x] `read.js` create_particular_parse gender-term search: drop the leading-space pad and match C bare `strstri` (`read.c:3186–3195`; `shemale …` misses MALE in JS, hits in C) + align the blanking splice with the C `memset` width. Probe: replica of the parse blanking on `shemale elf-lord` (expect fem=0/MALE). Source: reviews/loop-unattended/971-d9e7079e-gendered-name-flags.md. **Addressed:** D-2003 `e673cee4`


- [x] `lock.c` pick_lock / `apply.c` use_pick_axe on an occupied square — blocks 5/553 (first at step 6): C `I don't think the kitten would appreciate that.` (`lock.c:567` `pick_lock` direction arm with a monster there) vs JS `You see no door there.`. Probe: `node scripts/hidden-proxy.mjs verify pick_lock` (scen-kit-Rogue-92225, scen-kit-Tourist-91126, scen-wish-Barbarian-92102). **Addressed:** D-2002 `4a48e698`


- [x] `makemon.c` makemon → `mkobj.c` next_ident order + monster gender — blocks 5/553 (first at step 34) **Addressed:** D-2001 `d9e7079e`: C `An elf-lord appears next to you.` / `Elvenking` vs JS `elf-lady` / `Elvenqueen`; C draws `rnd(2)` in `next_ident :521` (object creation inside `m_initweap`/`m_initinv`) where JS draws `rn2(2)` in `m_initweap` first — the gender roll and the object ident draw are in the wrong order. Read `makemon :1494` (`m_initgrp`, `mkobj_at` ident) and `pmnames[]` gendered naming. Probe: `node scripts/hidden-proxy.mjs verify next_ident` (scen-genesis-Archeologist-92175, scen-tour-Wizard-92103, scen-wish-Knight-92130).


- [x] `steed.c` doride / mount_steed — blocks 6/553 (first at step 51): C `Force the mount to succeed? [yn] (n)` (wizard-mode arm of `mount_steed`, `steed.c:185`) vs JS `I see nobody there.`; saddle / `#ride` toward an adjacent monster. Probe: `node scripts/hidden-proxy.mjs verify doride` (scen-intrinsic-Ranger-92193, scen-kit-Valkyrie-92131, scen-normal-Healer-92231). **Addressed:** D-2000 `136921ce`


- [x] `monmove.c` set_apparxy — blocks 6/553 (first at step 7): C draws `rn2(4)` in `set_apparxy :2280` (displacement / `mtmp->mux` notseen gate) where JS is in `m_initinv`; a freshly created (`^G`) monster's first move. Probe: `node scripts/hidden-proxy.mjs verify set_apparxy` (scen-genesis-Ranger-92126, scen-genesis-Ranger-92151, scen-wish-Healer-92147). **Addressed:** D-1999 `d8b4a676`


- [x] `wizcmds.c` wiz_intrinsic — blocks 7/553 (first at step 16): C `You feel deathly sick.--More--` then `Timeout for fatally sick set to 30.`; JS prints the timeout line first and draws `rn2(12)` from `mcalcmove` where C draws `rn2(2)` in `wiz_intrinsic :1036` (the `make_sick`/`set_itimeout` + `incr` arms). Probe: `node scripts/hidden-proxy.mjs verify wiz_intrinsic` (scen-death-Archeologist-92015, scen-death-Knight-92203, scen-intrinsic-Barbarian-92008). **Addressed:** D-1998 `878f1d22`


- [x] `insight.c` enlightenment family — `enlightenment` blocks 7/553 (^X attributes screen), `one_characteristic` 5 (`Your wisdom was 18 (limit:18).` row set), `status_enlightenment` 3 (`You are turning into slime.`): one falsifier (`^X` / death disclosure), one file. Port the C page order arm by arm (`insight.c:398` `enlightenment` sections, `:926` characteristics, status). Probe: `node scripts/hidden-proxy.mjs verify enlightenment` (scen-death-Valkyrie-92176, scen-intrinsic-Caveman-92150, scen-normal-Knight-92215), then `verify one_characteristic`, `verify status_enlightenment`. **Addressed:** D-1997 `47b51e37` (page-order arms; Valkyrie+Priest PASS; Caveman turn-count residual → own row below).


- [x] `invent.js` missing `DEAF` import — D-1995 calls `from_what(DEAF)` (`:4882`) without importing it (`const.js:2561`); deaf `^X` throws `ReferenceError`, fortress 43/44 (seed0002). Fix: add to the existing `./const.js` import. Probe: `ps_test_runner.mjs sessions/seed0002.session.json`. Source: reviews/loop-unattended/965-f8079012-enlightenment-family-slimed.md. **Addressed:** D-1996 `ea1f4401`


- [x] `attrib.c` exercise residual (post-D-1993 gulpmu) **Addressed:** D-1994 `c36a197c` — blocks 7/553: D-1993 shipped the `gulpmu` DGST/PHYS/ACID arms (Samurai-92083 PASS, Samurai-92110 → one_characteristic@68). Remaining first-divergences still owned by `exercise`: exerper-tick/moves-drift class (scen-genesis-Archeologist-92084 step 48 turn-1 wear tick; scen-intrinsic-Healer-92124 step 48 jackal-bite INC; scen-intrinsic-Rogue-92158 step 42; scen-kit-Monk-92139 step 27 Monk-satiated double-dec) + read/wish/inc-arm callers (scen-wish-Archeologist-92216 step 79 decipher; scen-wish-Valkyrie-92206 step 118 amulet ID; scen-kit-Monk-92007 step 37 glow+INC). Probe: `node scripts/hidden-proxy.mjs verify exercise` (scen-genesis-Archeologist-92084, scen-intrinsic-Healer-92124, scen-kit-Monk-92139).


- [x] `attrib.c` exercise — blocks 8/553 (first at step 48): C draws `rn2(19)` in `exercise :509` (the `attrib.c` exercise/exerchk gate after dressing / fighting) where JS is already in `mcalcmove`. Read `exercise`, `exerper`, `exerchk` and their callers (`do_wear.c` `Armor_on`, `uhitm.c`, `allmain.c`). Probe: `node scripts/hidden-proxy.mjs verify exercise` (scen-genesis-Archeologist-92084, scen-genesis-Samurai-92083, scen-genesis-Samurai-92110). **Addressed:** D-1993 `976cbe23` (gulpmu arms; 1 PASS + 1 moved, 7 remain — residual row restored to the live queue).

## 2026-09-06

- [x] `polyself.c` drop_weapon — blocks 4/553 (first at step 93, 12.5k RNG): C `You find you must drop your dagger!` names the weapon (`:1331` `yname`/`aobjnam` arm, `alone` flag, twoweapon and `nohands` cases); JS says `your weapon`. Ship after `break_armor` (same file, shared falsifier `scen-poly-*`). Probe: `node scripts/hidden-proxy.mjs verify drop_weapon` (scen-poly-Ranger-91131, scen-poly-Ranger-92090, scen-poly-Valkyrie-92195). **Addressed:** D-1992 `c0801fb9`


- [x] `polyself.c` break_armor — blocks 9/553 (first at step 54): `You turn into a gelatinous cube!  You break out of your armor!` — C `break_armor :1171` message/RNG order per armor slot (cloak vs body armor first, `Your cloak tears apart`, shield/helmet/gloves/boots drop arms, `polyself.c:1189` clasp arm). Probe: `node scripts/hidden-proxy.mjs verify break_armor` (scen-poly-Knight-92220, scen-poly-Monk-92005, scen-poly-Priest-91137). **Addressed:** D-1991 `ab0522c0`


- [x] `botl.c` do_statusline2 — blocks 11/553 (first at step 16): row 23 C `… Xp:1 Strngl` vs JS without the condition; `#wizintrinsic` strangling / sliming / stoning / sickness / vomiting etc. Port the full `bot2` condition list in C order (`botl.c:130` onwards, `bl_conditions` order + width truncation), not just Hunger/Conf/Blind. Probe: `node scripts/hidden-proxy.mjs verify do_statusline2` (scen-death-Caveman-92141, scen-death-Caveman-92159, scen-death-Monk-92121). **Addressed:** D-1990 `a5c65a9e`


- [x] `calendar.c` getlt / phase_of_the_moon — blocks **51**/553 corpus sessions at step 0 (every recipe dated `20000206000000`): C prints `Be careful!  New moon tonight.` (so the welcome line ends `--More--`), JS prints nothing. `phase_of_the_moon` bodies match; the gap is `getlt()`: C = `localtime(getnow())` where patch 001 `time_from_yyyymmddhhmmss` fills `struct tm` from the **recording machine's current** `localtime` (tm_isdst = 1, EDT) then `mktime`, so a winter civil stamp lands one hour earlier in EST (`2000-02-06 00:00` → `Feb 5 23:00`, tm_yday −1, moon phase 0). JS `getlt()` returns the civil components unshifted. Port: civil stamp → epoch as EDT (UTC−4, the `lt_for_date` precedent in `js/calendar.js`) → `localtime` under America/New_York DST rules (2000: first Sun Apr → last Sun Oct; 2007+: second Sun Mar → first Sun Nov) — plain arithmetic, no Node APIs (Rule #2). Cohort: seed0013 (Friday 13th 09:00) must stay PASS. Verify with the **owner name**: `node scripts/verify.mjs --fn welcome` (`--fn getlt` is vacuous). Probe: `node scripts/hidden-proxy.mjs verify welcome` (scen-death-Monk-92123, scen-death-Tourist-92222, scen-genesis-Barbarian-92201). **Addressed:** D-1989 `7ed1c205`


- [x] `muse.c` find_defensive / use_defensive, `read.c` seffect_enchant_armor, `eat.c` newuhs — 4 missing JS imports (ReferenceError) kill 8 corpus sessions at their first step (rng-lost ≈104k): `is_pit` at `js/muse.js` find_defensive (`scen-tour-Barbarian-92129`, `scen-tour-Tourist-92134`, `scen-tour-Wizard-91112`), `FORCEBUNGLE` at `js/muse.js` use_defensive (`scen-tour-Monk-91117`), `otense` at `js/read.js` seffect_enchant_armor (`scen-intrinsic-Healer-92124`, `scen-wish-Archeologist-92238`), `STARVED` at `js/eat.js` newuhs (`scen-poly-Archeologist-92119`, `scen-wish-Knight-92034`; that replay also takes ~128 s — note the slow path in the D-log). Import the existing exports (`js/const.js` is_pit/FORCEBUNGLE/STARVED; `js/objnam.js` otense — `sym.mjs` each), no clones. Probe: `node scripts/hidden-proxy.mjs verify randomize_gem_colors` (the throw rows are attributed to the first C draw) then `node scripts/hidden-proxy.mjs score --ids scen-tour-Barbarian-92129,scen-tour-Monk-91117,scen-intrinsic-Healer-92124,scen-poly-Archeologist-92119 --jobs 4`. Source: human corpus audit 2026-09-06 (`docs/HIDDEN-PROXY.md` §5). **Addressed:** D-1988 `08b77b57`


- [x] `display.c`/`getpos.c` map_frame_color store — gw.wsettings.map_frame_color + getpos HiliteBackground wiring (named in D-1973; no JS symbol anywhere in js/). **Addressed:** D-1987 `03b0ab93`


- [x] `display.c` clear_glyph_buffer nul_gbuf.gnew dynamic computation — C derives 0-or-1 from the unexplored rendering vs nul_gbuf (named D-1985/D-1986; JS keeps gnew = 1; c-js-map turns.md). **Addressed:** D-1986 `97752af4`
- [x] `display.c` flush_screen map_glyphinfo glyphmap-base re-derive `:2250` (named D-1984/D-1986; tty transform already applied at show_glyph_cell store; c-js-map turns.md). **Addressed:** D-1986 `97752af4`


- [x] `display.c` flush_screen span-gated grid paint — `:2241–2257` gate + no blanket clear (deferred D-1984; needs overlay full-resync). **Addressed:** D-1986 `97752af4`


- [x] `display.c` flush_screen dirty-span loop — gbuf_start/gbuf_stop + reset_glyph_bbox (bbox tracked since D-1984; span-gated paint deferred below). **Addressed:** D-1985 `d1e71302`


- [x] `display.c` map_glyphinfo ov_* override tables — accessibility overseer sym tables (named in D-1972; no JS symbol anywhere in js/). **Addressed:** D-1983 `a18cf0dd`


- [x] `display.c` cliparound + CLIPPING clipx/clipy — tty pan offsets (named in row_refresh/get_bkglyph_and_framecolor/redraw_map; no JS symbol anywhere in js/). **Addressed:** D-1982 `ff608bf9`


- [x] `display.c` under_water/under_ground — docrt engulfed-water/buried map arms (docrt named omit in js/display.js; no JS symbol anywhere in js/). **Addressed:** D-1981 `7456f908`


- [x] `sounds.c` domonnoise verbl_msg_mcan + oracle_loc — cancelled-speech epilogue + save-rest depth (TOP30 #17 depth; mcan arm + oracle_loc; c-js-map turns.md #chat omit). **Addressed:** D-1980 `4fda73b4`


- [x] `sounds.c` domonnoise MS_NURSE/GUARD — nurse/guard depth (TOP30 #17 depth; uwep/armor gates + money_cnt; c-js-map turns.md #chat omit). **Addressed:** D-1979 `816104a5`


- [x] `sounds.c` domonnoise MS_BRIBE/CUSS/SPELL — demon/caster depth (TOP30 #17 depth; demon_talk/cuss absent per brief; c-js-map turns.md #chat omit). **Addressed:** D-1978 `af9b2323`


- [x] `sounds.c` domonnoise MS_VAMPIRE — vampire seduction depth (TOP30 #17 depth; night/midnight/kindred/nightchild + rn2 + body_part/pmname/an; c-js-map turns.md #chat omit). **Addressed:** D-1977 `d73b94aa`
- [x] `sounds.c` domonnoise MS_DJINNI/ARREST/SOLDIER — speaking-table depth (TOP30 #17 depth; WATER_DEMON/PRISONER gates + rn2(3) soldier tables; c-js-map turns.md #chat omit). **Addressed:** D-1977 `d73b94aa`


- [x] `display.c` curs_on_u/doredraw — cursor-on-hero + redraw pair (HELDOUT Tier C; no JS symbol anywhere in js/). **Addressed:** D-1976 `a8ddccf9`


- [x] `display.c` reglyph_darkroom — darkroom reglyph singleton (HELDOUT Tier C; no JS symbol anywhere in js/). **Addressed:** D-1975 `381b7706`


- [x] `display.c` redraw_map — cliparound pan-resend singleton (HELDOUT Tier C; no JS symbol anywhere in js/). **Addressed:** D-1974 `eacb0e50`


- [x] `display.c` get_bkglyph_and_framecolor — background/frame singleton (HELDOUT Tier C; no JS symbol, named omit in js/display.js). **Addressed:** D-1973 `0a81d48f`


- [x] `display.c` map_glyphinfo — glyphinfo render singleton (HELDOUT Tier C; no JS symbol, named omit in js/display.js row_refresh force source). **Addressed:** D-1972 `22f18ded`


- [x] `hack.c` findtravelpath — travel pathfinder absent (TOP30 #29; TEST_TRAV/GUESS/travelmap deferred). **Addressed:** D-1971 `b05d6229`


- [x] `muse.c` use_defensive — hurt-monster defensive-item depth (TOP30 #18; 12% ported; dead callees mreadmsg/reveal_trap/mon_escape). **Addressed:** D-1970 `de4686d7`


- [x] `sounds.c` domonnoise — speaking-monster/chat depth (TOP30 #17; dead callees genus/doconsult/shk_chat, FULL_MOON howl). **Addressed:** D-1969 `6eb83672`


- [x] `mkmaze.c` maybe_adjust_hero_bubble — water-level hero-bubble adjust (HELDOUT Tier C mkmaze row; named omit in js/mklev.js). **Addressed:** D-1968 `88050324`


- [x] `dbridge.c` do_entity — drawbridge crush/jump/relocate driver (HELDOUT Tier C; named omit in js/dbridge.js, set_entity live). **Addressed:** D-1967 `fb655752`


- [x] `nhlsel.c` l_selection_iterate — selection-iterate Lua-C singleton (HELDOUT Tier C singletons; no JS symbol, comment-only refs in js/mklev.js). **Addressed:** D-1966 `5b112530`


- [x] `allmain.c` init_sound_disp_gamewindows — window-system init singleton (HELDOUT Tier C singletons; no JS symbol anywhere in js/). **Addressed:** D-1965 `e8ba2bb7`


- [x] `display.c` row_refresh — glyph-row repaint singleton (HELDOUT Tier C singletons; no JS symbol, comment-only refs in js/display.js). **Addressed:** D-1964 `08a778fe`


- [x] `weapon.c` give_may_advance_msg — skill-advance message singleton (HELDOUT Tier C singletons; no JS symbol, named omit in js/weapon.js). **Addressed:** D-1963 `b3282b83`


- [x] `region.c` inside_rect — rect-containment predicate singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1962 `5e47ff6a`


- [x] `dungeon.c` avoid_ceiling — ceiling-ambiguity predicate singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1961 `100914d5`


- [x] `do.c` better_not_try_to_drop_that — corpse-drop guard singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1960 `0af4de34`


- [x] `dogmove.c` mnum_leashable — leashable-monster predicate singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1959 `57b55f0e`


- [x] `mail.c` readmail — mail-read singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1958 `6b3204c6`


- [x] `timeout.c` spot_time_expires — spot-timeout predicate singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1957 `46ce6177`


- [x] `light.c` obj_adjust_light_radius — light-radius singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1956 `423cce10`


- [x] `vision.c` new_angle — vision-angle singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1955 `03e241c8`


- [x] `strutil.c` pmatch — glob-match predicate singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1954 `c176ca28`


- [x] `eat.c` tin_variety_txt — tin-variety text singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1953 `22555a16`


- [x] `mkmaze.c` mazexy + is_solid — maze solidity predicates (HELDOUT Tier C mkmaze row remainder; no JS symbol). **Addressed:** D-1952 `615d3ea7`


- [x] `o_init.c` doclassdisco — class discovery singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1951 `4f597828`


- [x] `stairs.c` On_ladder — ladder predicate singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1950 `c5b4a1f4`


- [x] `steed.c` exercise_steed — steed exercise singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1949 `80d833fb`


- [x] `mondata.c` mon_hates_light — light-hatred predicate singleton (HELDOUT Tier C singletons; no JS symbol).


- [x] `mthrowu.c` ucatchgem — thrown-gem catch singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1947 `b92c4714`


- [x] `vault.c` move_gold — vault gold-move singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1946 `d5311a1e`


- [x] `steal.c` stealamulet — amulet-steal singleton (HELDOUT Tier C singletons; no JS symbol). **Addressed:** D-1945 `31f18e8a`


- [x] `sp_lev.c` lspo_* + selvar selection primitives (HELDOUT Tier C misc row remainder; no JS symbol). **Addressed:** D-1944 `bbd62daf`


- [x] `dbridge.c` e_at/m_to_e/u_to_e/e_nam/E_phrase entity family (HELDOUT Tier C dbridge row; no JS symbol). **Addressed:** D-1943 `82cffe79`


- [x] `do_wear.c` Armor_gone/count_worn_armor/any_worn_armor_ok — remaining do_wear armor-count family (HELDOUT Tier C do_wear row remainder; no JS symbol). **Addressed:** D-1942 `48c80d04`


- [x] `getpos.c` gloc_filter_init/_done/_floodfill/_floodfill_matcharea/_classify_glyph — getpos filter family (HELDOUT Tier C getpos row; no JS symbol). **Addressed:** D-1941 `78298ee6`


- [x] `pray.c` gcrownu/at_your_feet — crowning/vicinity family (HELDOUT Tier C misc row; no JS symbol). **Addressed:** D-1940 `628d0ae3`


- [x] `zap.c` polyuse/mon_spell_hits_spot/wish_history_menu — zap misc family (HELDOUT Tier C misc row; no JS symbol). **Addressed:** D-1939 `53deed83`


- [x] `pickup.c` boh_loss/do_boh_explosion/mbag_item_gone — bag-of-holding/forbidden-item loss family (HELDOUT Tier C misc row; no JS symbol). **Addressed:** D-1938 `9cafb38d`


- [x] `uhitm.c` backstabbable/disguised_as_mon/disguised_as_non_mon — backstab/disguise family (HELDOUT Tier C uhitm row; no JS symbol). **Addressed:** D-1937 `23674982`


- [x] `artifact.c` spec_ability — special-ability checks (HELDOUT Tier C misc row; no JS symbol). **Addressed:** D-1936 `efc7a95b`


- [x] `artifact.c` find_artifact/found_artifact — artifact discovery tracking (HELDOUT Tier C misc row; no JS symbol).


- [x] `do_wear.c` ia_dotakeoff — takeoff one-at-a-time arm (HELDOUT Tier C do_wear row; no JS symbol). **Addressed:** D-1934 `82034fab`


- [x] `trap.c` m_easy_escape_pit — pit-fiend identity arm dead (file-local `js/trap.js:1802` compares `data === mons[PM_PIT_FIEND]` but `mons` is a function, so the lookup is undefined; pit fiend msize 3 < MZ_HUGE 4, C `ptr == &mons[PM_PIT_FIEND]` always escapes; spotted while porting the mintrap body). **Addressed:** D-1933 `cc217718`


- [x] `uhitm.c` mhitm_knockback — hurtle/steadfast/size/weapon body (named deferred in js/mhitm.js stub + turns.md). **Addressed:** D-1932 `35c8eba4`


- [x] `objnam.c` mshot_xname — Nth/xname arms (turns.md named omit). **Addressed:** D-1931 `e9543922`


- [x] `weapon.c` select_hwep — HTH weapon-select arms (turns.md named omit). **Addressed:** D-1930 `63add93d`


- [x] `weapon.c` hitval — blessed/spear/trident/pick/silver remaining arms (named still-deferred in D-1793; spec_abon is D-0611). **Addressed:** D-1929 `aa665cb9`


- [x] `zap.c` bhit — beam-hit body remaining arms (TOP30 honourable mention, 306/223; archived rows are named bits only). **Addressed:** D-1928 `3d1a2e9f`


- [x] `invent.c` getobj — prompt/filter remaining arms (TOP30 #13; corpus screen-first owner). **Addressed:** D-1927 `35d8be59`


- [x] `options.c` AUTOPICKUP_EXCEPTION — apelist option parsing feeding `check_autopickup_exceptions` (named omit in D-1926; live-but-dormant arm, no `game.apelist` producer in `js/`). **Addressed:** D-1926 `a3aa0f8d`
- [x] `pickup.c` pickup — engulfer minvent chain (`objchain_p`/`traverse_how` stay floor-only) + count-N PICK_ONE/`n_or_more` menu (named omits in D-1926). **Addressed:** D-1926 `a3aa0f8d`


- [x] `pickup.c` pickup — pickup body remaining arms (TOP30 honourable mention, 238/135; archived rows are sub-arms only). **Addressed:** D-1926 `a3aa0f8d`


- [x] `explode.c` explode — explosion body remaining arms (TOP30 honourable mention; archived D-1760 is the named map_invisible bit only). **Addressed:** D-1925 `7571aee9`


- [x] `trap.c` dotrap — hero/monster trap dispatch body (TOP30 honourable mention; archived untrap/pit-hole/spoteffects rows explicitly Not dotrap). **Addressed:** D-1924 `b87ddc27`


- [x] `objnam.c` makeplural — plural-name envelope, ch_ksound dead callee (TOP30 honourable mention, 186/59; never queued). **Addressed:** D-1923 `53b920c5`


- [x] `trap.c` mintrap — monster-trapped dispatch body (TOP30 honourable mention, 107/54; archived rows are rloc_to callers, not the body). **Addressed:** D-1922 `7868cc8b`


- [x] `uhitm.c` mhitm_knockback — hurtle/steadfast/size/weapon body (named deferred in js/mhitm.js stub + turns.md; hitmu D-1921 wires the youmonst defender). **Addressed:** D-1921 `eb154b73`


- [x] `mhitu.c` hitmu — hero hit-by-thrown-object envelope (TOP30 honourable mention, 123/72; archived D-1795 mattacku row is explicitly Not hitmu). **Addressed:** D-1921 `eb154b73`


- [x] `makemon.c` grow_up remaining arms — monster growth HP/dice escalation (TOP30 honourable mention, 127/67; never queued). **Addressed:** D-1920 `240139ea`


- [x] `mhitm.c` mattackm remaining arms — monster-vs-monster attack dispatch (TOP30 honourable mention, 297/175; never queued). **Addressed:** D-1919 `55ee2d4d`


- [x] `trap.c` lava_effects post-boots-burn Wwalking re-read **Addressed:** D-1918 `4a49397f` — `heroWwalking` snapshotted at entry (`js/trap.js:5047`); C re-reads the `Wwalking` macro (`youprop.h:260`) after the boots-burst, so WW-via-burnable-boots flips true→false mid-function. C falls+burns (likely death) / sinks (Fire case); JS burns-you+walks-on / skips sink. Fix in lava_effects alone (slot clears synchronously via deconfer; flats never written): live re-read at the three post-boots points. Falsifier: WW boots, no Fire, lava step → fall path. Source: reviews/loop-unattended/883-05c03076-lava-effects-wwalking.md


- [x] `worn.c` mon_break_armor — absent, 23 messages (TOP30 honourable mention; no archive row). **Addressed:** D-1917 `29b2c5c5`


- [x] `uhitm.c` hmonas remaining arms — polymorphed-hero attack-type envelope (TOP30 #27, under half ported; archived troll_baned/silver named bits only). **Addressed:** D-1916 `9b35a3ff`


- [x] `steed.c` dismount_steed remaining arms — poly/engulfed/water/lava steed death (TOP30 #26; archived DISMOUNT_THROWN named only). **Addressed:** D-1915 `f1e5da6a`


- [x] `mon.c` newcham remaining body arms — NC_VIA_WAND_OR_SPELL mon_break_armor, boulder arms, monst_to_any dead callee (TOP30 #25; archived rows are await-wiring/named bits only). **Addressed:** D-1914 `37492b36`


- [x] `trap.c` lava_effects remaining arms — Fire_resistance/Wwalking survival, inventory burn flags, sink-and-die sequence (TOP30 #24, 11% ported; drown shipped D-1814, lava never queued). **Addressed:** D-1913 `05c03076`


- [x] `role.c` setup_rolemenu/racemenu/gendmenu/algnmenu extraction — C add_menu/winid builders; both filtering and reset-preselect arms already inline in pick_*_menu/reset_role_filtering, extraction must keep byte-identical menus (role.c follow-up). **Addressed:** D-1912 `9b416bde`


- [x] `mkmap.c` finish_map — wallify/lit/lava-ice + is_maze_lev/is_cavernous_lev flags (mkmap.c follow-up; needs wallify_map). **Addressed:** D-1911 `373f2920`


- [x] `mkmap.c` join_map + join_map_cleanup — flood-fill regions + dig_corridor joins (mkmap.c follow-up; flood_fill_rm/add_room live in mklev.js; needs somexy/dig_corridor). **Addressed:** D-1910 `f7ff03a3`


- [x] `pager.c` `Inhell_pager` drops the C `In_hell` predicate — checks `dnum === GEHENNOM` instead of the dungeon `hellish` flag (`dungeon.c:1941–1945`; siblings `do.js:1202`/`trap.js:604` read the flag); guards the vibrating-square arm in `add_cmap_descr`. Fix to the flag read in one iter. Source: reviews/loop-unattended/873-ed90f87f-pager-descr-arms.md. **Addressed:** D-1909 `7924e8a5`


- [x] `mkmap.c` mkmap + init_map/init_fill — cavern assembly + RNG fill envelope (mkmap.c follow-up; N_P1_ITER/N_P2_ITER/N_P3_ITER driver + new_locations ownership; caller sp_lev.c:3010 level_init INIT styles). **Addressed:** D-1908 `8d0304fd`


- [x] `uhitm.c` hmon_hitmon hero-attack helpers — hmon_hitmon_do_hit/jousting/poison/potion/weapon/splitmon (split remainder of the D-1907 AD-arms row; mhitm AD_SGLD/TLPT/WERE/SLIM mon→mon arms shipped). **Addressed:** D-1907 `d0baca4d`


- [x] `uhitm.c` missing mhitm AD arms — AD_SLIM, AD_TLPT, AD_WERE, AD_SGLD plus hmon_hitmon_do_hit/jousting/poison/potion/weapon/splitmon helpers (HELDOUT Tier C). **Addressed:** D-1907 `d0baca4d`


- [x] `mkmaze.c` makemaz `val-*` — Valkyrie quest 0/5 (Valkyrie 3/44 sessions). From `dat/val-*.lua` (371 ln, HELDOUT Tier B). **Addressed:** D-1852 `e84fa9d3`
- [x] `mkmaze.c` makemaz `sam-*` — Samurai quest 0/5 (Samurai 3/44 sessions). From `dat/sam-*.lua` (447 ln, HELDOUT Tier B). **Addressed:** D-1858 `cc99daee`


- [x] `mkmaze.c` makemaz `wiz-goal` — completes Wizard quest 4/5 → 5/5 (Wizard is 11/44 public sessions). From `dat/wiz-goal.lua` (132 ln, HELDOUT Tier A #1). **Addressed:** D-1906 `84c1dad5`


- [x] `objnam.c` suit_simple_name dragon arms — blocks 1/278 corpus sessions (random-seed0360-wizard-world-tour-4ac145da step 838; D-1884 named deferral). Probe: `node scripts/hidden-proxy.mjs verify suit_simple_name`. **Addressed:** D-1905 `59ec58c9`


- [x] `role.c` role-select parsers — str2role, str2race, str2gend, str2align, setup_rolemenu/racemenu/gendmenu/algnmenu, root_plselection_prompt (HELDOUT Tier C). **Addressed:** D-1904 `ccd53519`


- [x] `pager.c` history/descr arms — dohistory, add_cmap_descr, add_quoted_engraving, look_region_nearby, hmenu_dowhatis, dispfile_* (HELDOUT Tier C). **Addressed:** D-1903 `ed90f87f`


- [x] `mkmap.c` cavern generator — get_map, pass_one, pass_two, pass_three, remove_room, remove_rooms (HELDOUT Tier C; called from sp_lev.c:3010 level_init styles).


- [x] `polyself.c` `domindblast` invented gaze-retaliation blocks — delete the floating-eye freeze (`nomul` + early return) and Medusa stoning (`done(STONING)`) blocks; C `polyself.c:1893–1938` never calls `passive()` from `domindblast` (gaze fires on melee only), and the Medusa block lacks any Blind/stone-resistance gate. Source: reviews/loop-unattended/868-3ef6abec-domonability-arms.md. **Addressed:** D-1901 `a094dbe0`


- [x] `wizard.c` clonewiz family — clonewiz, mon_has_arti, other_mon_has_arti, which_arti, on_ground, wizdeadorgone, plus quest.c leaddead, nemdead, nemesis_stinks (HELDOUT Tier C). **Addressed:** D-1900 `29ce55d7`


- [x] `muse.c` slime/stone cures — cures_sliming, cures_stoning, munslime, muse_unslime, green_mon, m_sees_sleepy_soldier (HELDOUT Tier C). **Addressed:** D-1899 `54ccff4c`


- [x] `polyself.c` remaining arms (D-1898 follow-up) — dogaze, dohide, dospinweb, armor_to_dragon, check_strangling, livelog_newform (HELDOUT Tier C; steed `pet_ranged_attk`). **Addressed:** D-1898 `3ef6abec`


- [x] `polyself.c` missing domonability arms — dopoly, dohide, dogaze, dospit, dospinweb, dosummon, domindblast, doremove, armor_to_dragon, check_strangling, livelog_newform (HELDOUT Tier C). **Addressed:** D-1898 `3ef6abec`


- [x] `hack.c` findtravelpath — absent; travel is adjacent/greedy only (TOP30 #29). **Addressed:** D-1897 `1eda4b05`


- [x] `read.c` missing seffect_* arms — scroll effects (seffect_amnesia, seffect_charging, seffect_confuse_monster, seffect_earth, seffect_enchant_armor, seffect_mail, seffect_scare_monster, seffect_stinking_cloud, do_stinking_cloud, can_center_cloud, p_glow3) (HELDOUT Tier C). **Addressed:** D-1896 `eb2fae2f`

## 2026-09-05

- [x] `mcastu.c` missing mcast_* arms — clerical-caster switch (mcast_clone_wiz, mcast_confuse_you, mcast_death_touch, mcast_destroy_armor, mcast_disappear, mcast_fire_pillar, mcast_geyser, mcast_insects, mcast_lightning, mcast_paralyze, mcast_stun_you, mcast_weaken_you, touch_of_death, death_inflicted_by). Every clerical caster desyncs the RNG on cast (HELDOUT Tier C). **Addressed:** D-1825 `637890a4`


- [x] `mkmaze.c` makemaz `tut-2` — tutorial second variant (27 ln, trivial; completes the tutorial pair). From `dat/tut-2.lua` (HELDOUT Tier B). **Addressed:** D-1895 `1cc129db`


- [x] `mhitu.c` hitmsg — blocks 1/278 corpus sessions (first at step 43): C «The wraith touches you! Farvel level 1.--More--» vs JS «The wraith touches you! Farvel level 1.». Probe: `node scripts/hidden-proxy.mjs verify hitmsg` (tour-Valkyrie-70014-d5-8-15-17-22). Fresh block after archived D-1261. **Addressed:** D-1894 `72786e7d`


- [x] `mkmaze.c` Cav quest missing `des.wallify()` — `load_cav_strt`/`loca`/`goal` omit the lua-final `des.wallify()` (Cav-strt.lua:94, Cav-loca.lua:93, Cav-goal.lua:59 → `lspo_wallify` `sp_lev.c:5965` → `wallify_map` over map extents, STONE→HWALL/VWALL per `sp_lev.c:2865`); cave perimeters stay STONE. Fix: Tou-goal/Ran-goal epilogue line (`wallify_map` on splev extents before wallification→flip→fixup) in all three loaders; no RNG impact. Source: reviews/loop-unattended/861-b405a225-cav-quest-loaders.md. **Addressed:** D-1893 `04dd88ea`


- [x] `botl.c` do_statusline1 — blocks 1/278 corpus sessions (first at step 821): C «Logged events:» vs JS «Logged events:». Probe: `node scripts/hidden-proxy.mjs verify do_statusline1` (random-seed0360-wizard-world-tour-4ac145da). Fresh block after archived D-1842. **Addressed:** D-1892 `60215712`


- [x] `mkmaze.c` makemaz `cav-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Caveman quest 0/5 (330 ln; Caveman 1/44 sessions). From `dat/cav-*.lua` (HELDOUT Tier B). **Addressed:** D-1891 `b405a225`


- [x] `mkmaze.c` makemaz `mon-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Monk quest 0/5 (402 ln; Monk 2/44 sessions). From `dat/mon-*.lua` (HELDOUT Tier B). **Addressed:** D-1890 `fcdb286b`


- [x] `mkmaze.c` makemaz `ran-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Ranger quest 0/5 (360 ln; Ranger 3/44 sessions). From `dat/ran-*.lua` (HELDOUT Tier B).


- [x] `mkmaze.c` makemaz `tou-strt` — Tourist quest start 4/5 (134 ln; Twoflower + branch levregion; loca/goal/fila/filb shipped Tourist 4/5). From `dat/Tou-strt.lua` (HELDOUT Tier B). **Addressed:** D-1888 `eed83e3c`


- [x] `objnam.c` readobjnam_postparse1 — 1 corpus block screen-first (topline) at step 345 («%a piece of food (a food ration)--More--» vs «·a doorway or the floor of a room or the dark part of a room or ice»; random-seed0367-priest-quest-tour-01388a3a; follow-up owner after the getpos_help port above). **Addressed:** D-1886 `43cb30b8`


- [x] `mkmaze.c` makemaz `hea-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Healer quest 0/5 (388 ln; Healer 2/44 sessions, incl. active tour-Healer corpus session). From `dat/hea-*.lua` (HELDOUT Tier B). **Addressed:** D-1885 `b344cc6f`


- [x] `iactions.c` itemactions — 1 corpus block screen-first at step 853 («Do what with the cloak of magic resistance?» vs same-plus; explore-seed0360-wizard-world-tour-5dfef5c4; new symptom, distinct from archived D-1833 Engrave/Write). **Addressed:** D-1884 `3dadc461`


- [x] `uhitm.c` erode_armor — 1 corpus block RNG-first at step 47 (C `rn2(5)` in erode_armor vs JS `rn2(3)` mhitm_knockback; tour-Healer-70025-d5-8-15-17-22; unblocked by the climb_pit port above). **Addressed:** D-1883 `c9e049a8`


- [x] `invent.c` dolook — 1 corpus block screen-first at step 18 («You see here a historic statue of a forest centaur.» vs «You see here a statue of a forest centaur.»; tour-Archeologist-70010-d3-6-10-11-12). **Addressed:** D-1882 `db5d8f30`


- [x] `mdlib.c` version_id_string — 1 corpus block screen-first at step 83 («MacOS NetHack Version 5.0.0 - last build May 2 2026 12:00:00» vs «Unknown command 'V'.»; random-seed0900-tourist-explore-actions-614da9aa). **Addressed:** D-1881 `b5fbc93d`


- [x] `getpos.c` getpos_help — 1 corpus block screen-first at step 342 («Use 'h', 'j', 'k', 'l' to move the cursor to a m» vs same-plus; random-seed0367-priest-quest-tour-01388a3a). **Addressed:** D-1880 `5ba0bdf9`


- [x] `wintty.c` process_menu_window — 1 corpus block screen-first at step 838 («What do you want to take off?» vs same-plus; random-seed0360-wizard-world-tour-b1a64b99). **Addressed:** D-1879 `c209ccc7`


- [x] `insight.c` show_gamelog — 1 corpus block screen-first at step 821 («Logged events:» vs same-plus; random-seed0360-wizard-world-tour-4ac145da). **Addressed:** D-1878 `baf24c95`


- [x] `pager.c` do_look — 1 corpus block screen-first at step 116 («What do you want to look at:» vs empty; random-seed0116-wizard-wear-shop-1021c3a5). **Addressed:** D-1877 `2183ee64`


- [x] `trap.c` climb_pit — 1 corpus block RNG-first at step 46 (C `rn2(2)` in climb_pit vs JS `rn2(5)` distfleeck; tour-Healer-70025-d5-8-15-17-22). **Addressed:** D-1876 `305998a7`


- [x] `mkmaze.c` makemaz `kni-strt`/`-loca`/`-fila`/`-filb` — Knight quest 1/5 → 5/5 (only `kni-goal` exists; Knight is 5/44 sessions). From `dat/kni-*.lua` (HELDOUT Tier A #10). **Addressed:** D-1829 `a9ebaa40`
- [x] `mkmaze.c` makemaz `rog-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Rogue quest 0/5 → 5/5 (largest 0/5 role, 6/44 sessions). From `dat/rog-*.lua` (HELDOUT Tier A #11). **Addressed:** D-1830 `ab55b818`


- [x] `do_wear.c` glibr — 1 corpus block screen-first at step 29 («Your kitten eats a goblin corpse.» vs empty; ind-Tourist-666025142-d17728db). True owner `dogmove.c` `dog_eat` message gate (D-1875); `glibr` body needed no change. **Addressed:** D-1875 `ef2bf265`


- [x] `trap.c` trapeffect_rolling_boulder_trap — 1 corpus block screen-first at step 347 («^a trap (rolling boulder trap)» vs «^a rolling boulder trap»; explore-seed0367-priest-quest-tour-b0096089). **Addressed:** D-1874 `b26671b1`


- [x] `artifact.c` artifact_hit — 2 corpus blocks; screen-first at artifact.c:1515 («The massive hammer hits the Aleax.» vs empty; explore-seed0360-wizard-world-tour-19199bfa step 848, 5dfef5c4 step 842). Same-step continuation after the hitum `spec_abon` phantom roll was removed (see DIVERGENCE-LOG D-1862 Next; restored to live queue — never addressed). **Addressed:** D-1873 `d6db25d5`.


- [x] `objnam.c` minimal_xname — 1 corpus block screen-first at step 827 («d - an uncursed +1 ring of gain constitution» vs «Amulets»). **Addressed:** D-1872 `8e602b91`


- [x] `sounds.c` zoo_mon_sound — 1 corpus block screen-first at step 134 («You hear a sound reminiscent of a seal barking.» vs empty). **Addressed:** D-1871 `a631bae4`


- [x] `uhitm.c` mhitm_mgc_atk_negated — 1 corpus block; C `rn2(10)` vs JS `mhitm_knockback` `rn2(6)`. **Addressed:** D-1870 `605a8e85`


- [x] `mkroom.c` mkswamp — 1 corpus block; C `rn2(5)` vs JS `fill_ordinary_room` `rn2(3)`. **Addressed:** D-1869 `b0f702a1`


- [x] `monmove.c` m_move — 1 corpus block; C `rn2(4)` vs JS `distfleeck` `rn2(5)`. **Addressed:** D-1868 `30f0e9b7`


- [x] `allmain.c` maybe_generate_rnd_mon — 1 corpus block; C `rn2(70)` vs JS `rn2(50)`. **Addressed:** D-1867 `5c2cb3be`


- [x] `do_wear.c` menu_remarm — 2 corpus blocks screen-first at step 42 (take_off path was D-1630). **Addressed:** D-1866 `26386bd7`


- [x] mhitu `mhitm_ad_phys_u` weapon arm passes `null` defender to `dmgval` (`js/mhitu.js:717`) — C `weapon.c:215` derefs `mon->data` unconditionally and this call site passes `mdef` (`&youmonst`); polymorphed-big hero takes small-dice `wsdam` instead of `wldam` (+ bonus-draw counts diverge). Fix: `dmgval(otmp, game.youmonst)`. Falsifier: polymorph hero big, take a monster battle-axe hit. Source: reviews/loop-unattended/834-8ab2608f-mhitm-ad-phys.md **Addressed:** D-1865 `11f88a30`


- [x] `uhitm.c` mhitm_ad_phys knockback — 2 corpus blocks; C `rnd(2)` vs JS `mhitm_knockback` `rn2(3)`. **Addressed:** D-1864 `8ab2608f`


- [x] `mthrowu.c` linedup — 1 corpus block; C `rn2(2)` vs JS `m_move` `rn2(16)`. **Addressed:** D-1863 `cde16427`
- [x] `trap.c` climb_pit — follows D-1863 (tour-Healer-70025 step 45, C `rn2(2)=0 @ climb_pit(trap.c:4197)` vs JS `distfleeck` `rn2(5)`); port `climb_pit` `:4183–4232` into `trapmove` TT_PIT arm (Passes_walls/fill_pit/crevice `rn2(2)`+`sobj_at`/Flying-clinger/Sokoban/`--utrap`+`m_easy_escape_pit`(missing)/`u.dz||verbose` Norep); falsifier `node scripts/hidden-proxy.mjs verify climb_pit`. **Addressed:** D-1863 `cde16427`


- [x] `uhitm.c` hitum — 1 corpus block; C `rnd(20)` vs JS `spec_abon` `rnd(5)`. **Addressed:** D-1862 `c0ed9964`


- [x] `dungeon.c` induced_align — 1 corpus block; C `rn2(3)` vs JS `rnd_rect` `rn2(4)`. **Addressed:** D-1861 `5e4b0423`


- [x] `mkroom.c` fill_zoo — 1 corpus block; C `rn2(3)` vs JS `next_ident` `rnd(2)`. **Addressed:** D-1860 `bea18bd9`.


- [x] `hack.c` moverock_core — 2 corpus blocks; C «The boulder won't roll diagonally on this floor.» vs JS «With great effort you move the boulder.». **Addressed:** D-1859 `b22e00db`


- [x] `mkmaze.c` makemaz `Sam-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Samurai quest, 0/5. From `dat/Sam-*.lua`. **Addressed:** D-1858 `cc99daee`


- [x] `uhitm.c` mhitm_ad_slee — 1 corpus block; C `rn2(5)` vs JS `mhitm_knockback` `rn2(3)`. **Addressed:** D-1857 `e1e7dce0`


- [x] `sp_lev.c` lspo_replace_terrain — 1 corpus block; C `rn2(100)` vs JS `get_location_random` `rn2(75)`. **Addressed:** D-1856 `3ca95421`


- [x] `pager.c` dowhatdoes — 2 corpus blocks; C «Ask about '&' or '?' to get more info.» vs JS «Unknown command '&'.». **Addressed:** D-1855 `5983e72d`


- [x] `pager.c` do_screen_description — 4 corpus blocks; C «can be many things (unexplored area)» vs JS «unexplored area». **Addressed:** D-1854 `532d3c44`


- [x] `mkmaze.c` makemaz `knox` — Fort Ludios magic-portal vault. From `dat/knox.lua` (167 ln). **Addressed:** D-1853 `64050628`


- [x] `mkmaze.c` makemaz `Val-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Valkyrie quest, 0/5. From `dat/Val-*.lua`. **Addressed:** D-1852 `e84fa9d3`


- [x] `dothrow.c` dofire — 2 corpus blocks; C `"You have no ammunition readied."` vs fire `getobj` prompt. **Addressed:** D-1851 `8759553e`


- [x] `invent.c` inuse_classify — 2 corpus blocks; C `"Weapons"` vs JS empty worn-class header. **Addressed:** D-1850 `46021314`


- [x] `mklev.c` mineralize — 2 corpus blocks; C `rn2(1000)` vs JS `place_lregion` `rn2(79)`. **Addressed:** D-1849 `fc3c7c8b`


- [x] `pager.c` lookat — S_room/S_darkroom extra arms contradict C default `defsyms[]`; DARKROOMSYM belongs in `newsym` (D-0812), not lookat. Source: reviews/loop-unattended/813-70d84800-lookat.md. **Addressed:** D-1848 `d1d76d7e`


- [x] `teleport.c` level_tele — 2 corpus blocks; named-level `^V` materialize (screen match, later RNG). **Addressed:** D-1846 `5d89cc96`


- [x] `getpos.c` getpos — 2 corpus blocks; "Can't find dungeon feature '/'." vs unknown direction. **Addressed:** D-1845 `6d5ca30d`


- [x] `mhitu.c` summonmu — 2 corpus blocks; C were-summon `rn2(5)` vs JS `rnd(20)` in `mattacku`. **Addressed:** D-1844 `e3ccc72b`


- [x] `pager.c` lookat — 3 corpus blocks; "unexplored area" vs "unexplored". **Addressed:** D-1843 `70d84800`


- [x] `botl.c` do_statusline1 — 4 corpus blocks; leftover WIN_STATUS under item-action menu (same step as D-1833 re-attr). **Addressed:** D-1842 `9dc829a9`


- [x] `mkmaze.c` makemaz `fakewiz1`/`fakewiz2` — Wizard-of-Yendor path; 44+44 ln. From `dat/fakewiz{1,2}.lua`. **Addressed:** D-1841 `4f6a3bcc`


- [x] `selvar.c` selection_filter_percent — 2 corpus blocks; C themed-room `rn2(100)` vs JS `rnd_rect` (level-content cliff). **Addressed:** D-1840 `bf310d98`


- [x] `insight.c` attributes_enlightenment — 3 corpus blocks; quest-leader telepathy name vs colon. **Addressed:** D-1839 `65036888`


- [x] `hack.c` pickup_checks — 3 corpus blocks; "The stairs are solidly affixed." vs "There is nothing here to pick up." **Addressed:** D-1838 `27758e2a`


- [x] `pickup.c` doloot_core — 4 corpus blocks; "You don't find anything here to loot." vs "You see no door there." **Addressed:** D-1837 `13150e4c`


- [x] `sp_lev.c` build_room — 4 corpus blocks; C themed-room script vs JS `rnd_rect` (level-content cliff). **Addressed:** D-1836 `c9b87e23`

## 2026-09-04

- [x] `pickup.c` describe_decor — 5 corpus blocks; "There is a pit here." before the object list. **Addressed:** D-1835 `16668da3`


- [x] `invent.c` getobj — 7 corpus blocks; "You don't have anything else to wear." vs re-prompt. **Addressed:** D-1834 `68aa6457`


- [x] `iactions.c` itemactions — 14 corpus blocks; Engrave vs Write, cookie vs cookies. **Addressed:** D-1833 `6a441166`


- [x] `wintty.c` process_menu_window — D-1831 regression (12 corpus blocks, e.g. `ind-Healer-264813587-946e8e73` step 22, `explore-seed0200-monk-north-search-70435b72` step 47): the `_snapshotStatusGrid` restore in `js/display.js` `_buildScreenOutput` copies rows 22–23 that `js/iactions.js` `itemactions`' per-key `docrt()`→`cls()`→`clearScreen()` already blanked, so WIN_STATUS goes blank on the frame after a corner-menu re-prompt. C `process_menu_window` loops on `tty_nhgetch` **without redraw** on an unhandled key. Port that: no `docrt` on invalid/unhandled keys in `itemactions` (and the other corner-menu loops), keep the D-0467 post-fullscreen blank via `_statusSuppressed` (seed0002 @530 / seed5002 @277 are that case), then delete `_snapshotStatusGrid` / `_restoreStatusGrid`. Falsifier: `node scripts/verify.mjs --fn process_menu_window --base ab55b818` → the 21 baseline sessions PASS (the 2 `seed0116` rows may stay `do_statusline1`), green, full 44/44. Source: `docs/2026-09-05-continuation-postmortem-2238-2240.md`. **Addressed:** D-1832 `690100e3`


- [x] `wintty.c` process_menu_window — 21 corpus blocks; tty menu clears only from its own left column. **Addressed:** D-1831 `55c6736d`


- [x] `mkmaze.c` makemaz `Rog-strt`/`-loca`/`-goal`/`-fila`/`-filb` — Rogue quest, 0/5. Rogue is 6/44 public sessions, the largest uncovered role (503 ln total). **Addressed:** D-1830 `ab55b818`


- [x] `mkmaze.c` makemaz `Kni-strt`/`-loca`/`-fila`/`-filb` — Knight quest; only `Kni-goal` exists. Knight is 5/44 public sessions (321 ln total). **Addressed:** D-1829 `a9ebaa40`


- [x] `mkmaze.c` makemaz `astral` — endgame plane 5 of 5. From `dat/astral.lua` (187 ln). **Addressed:** D-1828 `c306d211`


- [x] `mkmaze.c` makemaz `water` + `mkmaze.c` save_waterlevel/restore_waterlevel/unsetup_waterlevel/set_wportal — endgame plane 4 of 5. From `dat/water.lua` (102 ln). **Addressed:** D-1827 `e782f134`


- [x] `mkmaze.c` makemaz `medusa-2`/`-4` — completes Medusa 4/4; 50% blank → 0%. From `dat/medusa-{2,4}.lua` (129/152 ln). **Addressed:** D-1826 `159fda3d`


- [x] `mcastu.c` castmu remaining spell arms: the 14 `mcast_*` / `touch_of_death` cases past the `default:` fallthrough. Not buzzmu. **Addressed:** D-1825 `637890a4`


- [x] Match C `dat/Bar-goal.lua` `:44–57` fourteen `des.object()` after the Heart, instead of `load_bar_goal` looping 15 extra `splev_create_object` / `mkobj_at` RNG. Source: reviews/loop-unattended/789-fc103c7f-bar-goal.md **Addressed:** D-1824 `f2b2b513`


- [x] `mkmaze.c` makemaz `minend-3` — third Mine's End variant; 33% blank → 0%. From `dat/minend-3.lua` (107 ln). **Addressed:** D-1823 `171f6b02`


- [x] `mkmaze.c` makemaz `bigrm-1`/`-10`/`-13` — completes Big Room 13/13; 46% blank → 0%. From `dat/bigrm-{1,10,13}.lua` (81/61/82 ln). **Addressed:** D-1822 `7c76fdb5`


- [x] `mkmaze.c` makemaz `bigrm-5`/`-6`/`-11` — three smallest Big Room variants. From `dat/bigrm-{5,6,11}.lua` (54/48/39 ln). **Addressed:** D-1821 `0c3e8ca5`


- [x] `mkmaze.c` makemaz `soko2-2` — second `soko2` variant; removes a 50% blank-level coin flip on Sokoban 2. From `dat/soko2-2.lua` (72 ln). **Addressed:** D-1820 `42afdca4`


- [x] `mkmaze.c` makemaz `Bar-goal` — completes Bar 4/5→5/5. From `dat/Bar-goal.lua` (95 ln). **Addressed:** D-1819 `fc103c7f`


- [x] `mkmaze.c` makemaz `Wiz-goal` — Wizard quest goal, completes Wiz 4/5→5/5. Wizard is 11/44 public sessions. Port from `dat/Wiz-goal.lua` (132 ln). **Addressed:** D-1818 `2c339c26`


- [x] Match C `timeout.c` / `wizcmds.c:1029` so `#wizintrinsic` does not paint `deafness [2]` when C’s `u.uprops[DEAF].intrinsic & TIMEOUT` is 0 (seed4500 13 screens; D-1792 leftover `HDeaf` dual-storage). Read `docs/2026-09-04-fortress-regression-42-44.md` §2 before coding. Not drown. Not count-prefix. Not Open `lava_effects`. **Addressed:** D-1817 `bac0ae69`


- [x] Match C `mhitu.c` `mattacku` `:938–950` so the NATTK loop aborts when `done()` has ended the game (C `done` longjmp never returns to `i=1`), instead of a second attack `rnd(20+i)` / `d(damn,damd)` / knockback after `can_make_bones` (seed0030 Maganasipi “hits again”). Read `docs/2026-09-04-fortress-regression-42-44.md` §1 before coding. Not gem colors. Not `usleep`. Not Open `lava_effects`. **Addressed:** D-1816 `f144982f`


- [x] Match C `cmd.c` `getdir` `:4098` `iflags.cmdassist` (Options/`O` writes `game.iflags`) so `!cmdassist` skips `help_dir` and takes the strange-direction pline, instead of `game.flags?.cmdassist !== false`. Source: reviews/loop-unattended/775-2ac1a112-getdir.md **Addressed:** D-1815 `462e1338`


- [x] `trap.c` drown remaining: rnd_nextto_goodpos / emergency_disrobe / crawl-out. Not lava_effects. **Addressed:** D-1814 `b596f337`


- [x] `trap.c` untrap remaining: disarm_holdingtrap / disarm_landmine / disarm_shooting_trap / disarm_box / help_monster_out. Not dotrap. **Addressed:** D-1813 `373d8905`


- [x] `end.c` really_done remaining: fixup_death / force_launch_placement / clearlocks / free_pickinv_cache / timet_delta / clearpriests / paygd. Not DUMPLOG. **Addressed:** D-1812 `12298526`


- [x] `muse.c` use_misc remaining: muse_newcham_mon / mloot_container / poly / bag / you_aggravate. Not use_defensive. **Addressed:** D-1811 `9b42dedf`


- [x] `muse.c` use_offensive remaining wand / horn / scroll cases. Not use_defensive. **Addressed:** D-1810 `5009dae1`


- [x] `muse.c` use_defensive remaining: mreadmsg / reveal_trap / mon_escape / mon_consume_unstone. Not use_offensive. **Addressed:** D-1809 `0f18f2db`


- [x] `sounds.c` domonnoise remaining: genus / mon_is_gecko / doconsult / shk_chat / priest_talk. Not beg. **Addressed:** D-1808 `f18f1523`


- [x] `pline.c` vpline msgtype_type / execplinehandler / maybe_play_sound. Not pline wrapper. **Addressed:** D-1807 `3d82312d`


- [x] `cmd.c` getdir help_dir / cmdassist / strange-direction NEED_MORE / dxdy_moveok. Not confdir. **Addressed:** D-1806 `2ac1a112`


- [x] `cmd.c` yn_function remaining body including RNG arms. Not getlin. **Addressed:** D-1805 `3ff0752d`


- [x] `invent.c` getobj in_doagain / prompt+filter machinery. Not display_pickinv. **Addressed:** D-1804 `fa5f3acc`


- [x] `do_name.c` x_monnam saddle / ARTICLE_* / M2_PNAME / Wizard article + nextmbuf. Not mon_nam_too. **Addressed:** D-1803 `248e8d60`


- [x] `objnam.c` xname_flags tshirt_text / apron_text / hawaiian_motif / xcalled. Not xname article arms. **Addressed:** D-1802 `5c960c16`


- [x] `allmain.c` moveloop_core per-turn callees: do_storms, glibr, mkot_trap_warn, end_of_input. Not nh_timeout. **Addressed:** D-1801 `e532a792`


- [x] `hack.c` test_move + domove_core: water_friction, avoid_running_into_trap_or_liquid, domove_fight_ironbars/web, mention_walls. Not lookaround. **Addressed:** D-1800 `b9a72263`


- [x] `hack.c` spoteffects recursion guards / levitation timeout / Warning ice `:3312–3462`. Not dotrap. **Addressed:** D-1799 `638c92dd`


- [x] `monmove.c` dochug remaining arms + wormhitu callee. Not m_move. **Addressed:** D-1798 `8767a241`

## 2026-09-03

- [x] Match C `hack.c` `nomul` `:4160–4173` / `unmul` `:4177–4198` so `u.usleep = 0` and `nomul`’s `u.uinvulnerable = FALSE` actually run, instead of leaving those fields sticky so D-1795 `mattacku` sleep-wakeup `rn2(10)` (`mhitu.c:939–943`) fires on every hit after the first sleep. Source: reviews/loop-unattended/764-efcb3fd4-mattacku.md. **Addressed:** D-1797 `819bccab`


- [x] `mon.c` xkilled LEVEL_SPECIFIC_NOCORPSE + accessible||is_pool gate + artifact un-create. Not make_corpse. **Addressed:** D-1796 `b14236d6`


- [x] `mhitu.c` mattacku remaining attack-type arms `:491–952`. Not hitmu. **Addressed:** D-1795 `efcb3fd4`


- [x] `mon.c` make_corpse special-corpse table (dragon scales / unicorn horn / worm tooth) — 19 C draws. Not mondied. **Addressed:** D-1794 `22bc5c1e`


- [x] `weapon.c` dmgval blessed/axe/silver/artifact_light bonus rnd() + greatest_erosion (RNG). Not spec_abon. **Addressed:** D-1793 `07fb471c`


- [x] `timeout.c` nh_timeout property dialogues: stoned/slime/vomiting/choke/sickness/levitation/phaze + stone_luck. Not make_blinded. **Addressed:** D-1792 `9c160502`


- [x] `eat.c` newuhs hunger messages + faint/starve + end_running (JS is a field-update stub). Not gethungry. **Addressed:** D-1791 `2619827e`


- [x] `do_name.c` mon_nam_too + monverbself (named; mhitm.js clone). Not pronoun_gender. **Addressed:** D-1790 `31181641`


- [x] `dog.c` keepdogs must not `for-of` live `fmon` while `migrate_to_level` splices it. Source: reviews/loop-unattended/752-22730962-keepdogs.md **Addressed:** D-1789 `3cb13f27`


- [x] `spell.c` `SPE_DETECT_FOOD` must call `seffects(pseudo)` (skilled bless FALLTHROUGH). Source: reviews/loop-unattended/750-28f02a82-food-detect.md **Addressed:** D-1788 `09159ed0`


- [x] `pager.c` lookat trap tnum = `glyph_to_trap(glyph_at)`, not `t_at&&tseen`. Source: reviews/loop-unattended/748-e8515402-trap-description.md **Addressed:** D-1787 `01562c50`


- [x] `do.c`/`trap.c` ballfall callers: gate on `u.uball` (C `Punished` ≡ `uball != 0`), not sticky `u.Punished` which is never set. Source: reviews/loop-unattended/747-c4a32e7c-ballfall.md **Addressed:** D-1786 `be1cef1a`


- [x] `vision.c` do_clear_area off-hero view_from + detect.js clone (named). Not couldsee. **Addressed:** D-1785 `da520eda`


- [x] `display.c` ridden_mon_to_glyph usteed (named). Not map_monst. **Addressed:** D-1784 `7870c5c6`


- [x] `dog.c` keepdogs leash (named). Not losedogs. **Addressed:** D-1783 `22730962`


- [x] `detect.c` object_detect clear_stale_map caller (named). Not food_detect. **Addressed:** D-1782 `fe542a1d`


- [x] `detect.c` food_detect (named). Not object_detect. **Addressed:** D-1781 `28f02a82`


- [x] `teleport.c` lev_by_name (named). Not heaven u_left_shop. **Addressed:** D-1780 `45f35a52`


- [x] `pager.c` trap_description (named). Not trapname Hallu. **Addressed:** D-1779 `e8515402`


- [x] `ball.c` ballfall (named). Not set_bc. **Addressed:** D-1778 `c4a32e7c`


- [x] `ball.c` unplacebc Blind glyph restore (named). Not set_bc. **Addressed:** D-1777 `cd3e1091`
- [x] `ball.c` move_bc Blind glyph (named). Not set_bc. **Addressed:** D-1777 `cd3e1091`


- [x] `end.c` DUMPLOG (named). Not companion pet HP. **RETIRED — false omission:** `nethack-c/macosx-minimal` passes no `-DDUMPLOG`, so every `end.c` `#ifdef DUMPLOG` block is compiled out of the scored build; the surviving `DUMPLOG_CORE` `saved_plines[]` ring is write-only (only reader is `report.c` crash path) and `dump_everything` needs the banned filesystem. **Addressed:** D-1776 `24ced3ef`
- [x] `mhitu.c` noit_mhim Hallu (named). Not hero_Deaf. **Addressed:** D-1776 `24ced3ef`


- [x] `detect.c` findone (named). Not gold_detect. **Addressed:** D-1775 `b4d526e9`


- [x] `eat.c` eatcorpse rot age `rn2(20)` (`:1884–1887`; seed0014 @43789 C vs JS `rn2(5)`). Diagnose skipped `!nonrotting_corpse` / corpsenm; JS arm exists. No FORCE / gbuf. Not findone. **Addressed:** D-1774 `1f5d551a`


- [x] `detect.c` gold_detect (named). Not sense_trap. **Addressed:** D-1773 `c206da54`


- [x] `mon.c` peacefuls_respond / MS_ARREST Halt (named). Not beg. **Addressed:** D-1772 `81276343`


- [x] `eat.c` useup+useupf hybrid (named). Not delete_contents. **Addressed:** D-1771 `dd090eaf`


- [x] `zap.c` delete_contents clone (named). Not delobj extract. **Addressed:** D-1770 `1fbbe0c0`


- [x] `ball.c` Punished set_bc (named). Not Unaware talk. **Addressed:** D-1769 `3baada67`


- [x] `potion.c` make_blinded Unaware talk=FALSE (named). Not Sting(-1). **Addressed:** D-1768 `566ab3d4`


- [x] `display.c` `show_glyph` always overwrites `gbuf.glyph`; JS `show_glyph_cell` leaves stale `loc.disp_glyph` on tty-only paints, so `see_traps` / `glyph_is_invisible` / `do_vicinity_map` extra-or-skip `newsym` (`tseen`/`erevealed`/I-keep). Not usteed. Source: reviews/loop-unattended/726-3b34b789-glyph-offsets.md **Addressed:** D-1767 `148dc4da`


- [x] `do_wear.c` cancel_doff (named). Not setworn oc_oprop. **Addressed:** D-1766 `bb71f9ff`


- [x] `display.h` integer GLYPH_*_OFF / map_monst (named). Not pet_to_glyph. **Addressed:** D-1765 `3b34b789`


- [x] `teleport.c` heaven u_left_shop caller (named). Not SetVoice. **Addressed:** D-1764 `8f3f4280`


- [x] `sounds.c` beg (named). Not maybe_gasp. **Addressed:** D-1763 `70493bec`


- [x] `sounds.c` maybe_gasp (named). Not sound_speak. **Addressed:** D-1762 `ac94ec34`


- [x] `sounds.c` sound_speak (named). Not set_voice. **Addressed:** D-1761 `45bb8ff3`


- [x] `explode.c` map_invisible !canspotmon (named). Not explosion_to_glyph. **Addressed:** D-1760 `a23a8ec8`


- [x] `display.h` random_trap_to_glyph (named). Not cmap_to_glyph trap. **Addressed:** D-1759 `01499c3f`


- [x] `mhitu.c` doseduce/mayberem `hero_Deaf` drops `EDeaf` and `uroleplay.deaf` (C `youprop.h:125`), so Cha `rn2`/`y_n` fire on C’s Deaf arms. Source: reviews/loop-unattended/711-b6c42dd0-doseduce.md. **Addressed:** D-1758 `0b5f451a`


- [x] `worn.c` setworn oc_oprop (named). Not possibly_unwield. **Addressed:** D-1757 `2d66f69e`


- [x] `mkobj.c` delobj extract (named). Not dealloc_obj. **Addressed:** D-1756 `d07fc56a`


- [x] `potion.c` make_blinded Sting_effects(-1) (named). Not see_monsters MON_STILL_ARRIVING. **Addressed:** D-1755 `5455d0cb`


- [x] `end.c` companion pet HP score (named). Not get_valuables. **Addressed:** D-1754 `7d76ad12`


- [x] `detect.c` sense_trap (named). Not monster_detect. **Addressed:** D-1753 `088de957`


- [x] `sounds.c` set_voice / SetVoice (named). Not doseduce. **Addressed:** D-1752 `1e18143c`


- [x] `dokick.c` hidden_gold(TRUE) kick (named). Not vault hidden_gold. **Addressed:** D-1751 `97f49d11`

## 2026-09-02

- [x] `mhitu.c` doseduce (named). Not getyear. **Addressed:** D-1750 `b6c42dd0`


- [x] `display.c` feel_location is_worm_tail (named). Not Blind levitate-arm. **Addressed:** D-1749 `d17e4f35`


- [x] `display.c` display_monster pet_to_glyph / detected_mon_to_glyph (named). Not Protection sensed. **Addressed:** D-1748 `1f6d5487`


- [x] `display.c` show_mon_or_warn I-glyph unmap_object (named). Not map_object observe. **Addressed:** D-1747 `a85a8aac`


- [x] `display.c` see_monsters MON_STILL_ARRIVING skip (named). Not newsym Detect_monsters. **Addressed:** D-1746 `df2bec69`


- [x] `display.c` newsym !cansee display_monster DETECTED (named). Not cansee Detect_monsters. **Addressed:** D-1745 `20426583`


- [x] `worn.c` possibly_unwield (named). Not setworn oc_oprop. **Addressed:** D-1744 `a2be8560`


- [x] `invent.c` dealloc_obj (named). Not useupall. **Addressed:** D-1743 `5a8392de`


- [x] `calendar.c` getyear (named). Not hhmmss. **Addressed:** D-1742 `3f9a8e48`


- [x] `end.c` get_valuables (named). Not artifact_score. **Addressed:** D-1741 `522aeec1`


- [x] `shk.c` shopper_financial_report / shop_debt (named). Not hidden_gold. **Addressed:** D-1740 `b712f3b6`


- [x] `display.c` mimic map_object observe (named). Not M_AP_OBJECT glyph. **Addressed:** D-1739 `3c4dafe8`


- [x] `display.c` cmap_to_glyph trap/zap/expl (named). Not furniture lastseentyp. **Addressed:** D-1738 `8a58906e`


- [x] `display.c` newsym Detect_monsters cansee arm (named). Not display_monster furniture. **Addressed:** D-1737 `5d1f9fb6`


- [x] `display.c` display_monster Protection_from_shape_changers sensed (named). Not M_AP_FURNITURE. **Addressed:** D-1736 `3afed6b0`

## 2026-08-30

- [x] `write.c` dowrite `useup(paper)` still invent-splice; C invent.c `useup` `:1320–1333` → `useupall`. Not full `dealloc_obj`. Source: reviews/loop-unattended/688-a6d468cc-useupall-obfree.md. **Addressed:** D-1735 `8b2be954`


- [x] `display.c` display_monster M_AP_MONSTER what_mon (named). Not M_AP_FURNITURE lastseentyp. **Addressed:** D-1734 `4bc17535`


- [x] `shk.c` choose_stairs / u_left_shop leave verbalize (named). Not remote_burglary. **Addressed:** D-1733 `9f6de017`


- [x] `objects.h` is_multigen / is_poisonable (named). Not oc_merge. **Addressed:** D-1732 `438c0380`


- [x] `invent.c` doprgold hidden_gold (named). Not currency. **Addressed:** D-1731 `fbce2b1c`


- [x] `end.c` artifact_score (named). Not hidden_gold. **Addressed:** D-1730 `02c2d6e0`


- [x] `cmd.c` getdir CQ_REPEAT (named). Not yn_function_menu. **Addressed:** D-1729 `578b7088`


- [x] `cmd.c` yn_function_menu query_menu (named). Not yn_function addcmdq. **Addressed:** D-1728 `aad60753`


- [x] `invent.c` useupall / obfree (named). Not observe_object FIRST_OBJECT skip. **Addressed:** D-1727 `a6d468cc`


- [x] `display.c` display_monster M_AP_FURNITURE cmap_to_glyph lastseentyp (named). Not update_lastseentyp. **Addressed:** D-1726 `a0c81cc6`


- [x] `calendar.c` hhmmss (named). Not yyyymmddhhmmss. **Addressed:** D-1725 `32c02560`


- [x] `dungeon.c` recalc_mapseen sokosolved / roguelevel / quest flags (named). Not DRAWBRIDGE_UP lastseentyp. **Addressed:** D-1724 `7ee8ad1d`


- [x] `sp_lev.c` lspo_object non-merge quan repeat (named). Not oc_merge. **Addressed:** D-1723 `a9697aa8`


- [x] `dog.c` cant_go_back FREEING (named). Not update_mlstmv. **Addressed:** D-1722 `55932af9`


- [x] `cmd.c` getdir yn_function (named). Not yn_function_menu. **Addressed:** D-1721 `48ddbfc8`


- [x] `shk.c` Hallu currency ROLL_FROM (named). Not arti_cost. **Addressed:** D-1720 `7381e463`


- [x] `shk.c` arti_cost (named). Not gem glass pseudo-ID. **Addressed:** D-1719 `7466d184`


- [x] `shk.c` get_cost gem glass pseudo-ID (named). Not remote_burglary. **Addressed:** D-1718 `ee797b68`


- [x] `shk.c` remote_burglary (named). Not bill_box_content. **Addressed:** D-1717 `ed4800ed`


- [x] `shk.c` dopay mute/Deaf thank-you nod (named). Not getpos. **Addressed:** D-1716 `0c720b98`


- [x] `shk.c` pay_billed_items traditional itemize ynq (named). Not FullyUsedUp. **Addressed:** D-1715 `a197ef44`


- [x] `shk.c` FullyUsedUp/PartlyUsedUp (named). Not bill_box_content. **Addressed:** D-1714 `33cc30c0`


- [x] `invent.c` observe_object FIRST_OBJECT skip (named). Not undiscover_object. **Addressed:** D-1713 `4f0957ff`


- [x] `objects.h` oc_merge extract (named). Not oc_charged. **Addressed:** D-1712 `00f70d3d`


- [x] `dungeon.c` update_lastseentyp DRAWBRIDGE_UP / furniture-mimic (named). Not knox/drawbridge. **Addressed:** D-1711 `f187612b`


- [x] `dungeon.c` cemetery yyyymmddhhmmss when[] (named). Not cemetery JSON. **Addressed:** D-1710 `b5cb56e6`


- [x] `dog.c` `update_mlstmv`: skip `DEADMONSTER` / `mon_offmap` like `iter_mons` (`mon.c:4531–4535`). Not cant_go_back FREEING. Source: `reviews/loop-unattended/656-c33608ff-savelev-stash-lights-billobjs.md` **Addressed:** D-1709 `2353e6fb`


- [x] `light.c` `save_light_sources` LS_MONSTER: `light_is_local` must be `mx > 0` (`light.c:373` / `:453` / `maybe_write_ls` `:586`), not timeout.c `mon_is_local` migrating/mydogs. Same predicate in `js/lev_json.js` `snapshotLocalLights` / `snapshotGlobalLights` (D-1696/D-1698). Keep timeout.c helpers for timers and LS_OBJECT. Do not restore `clear_light_sources` on `goto_level`. Source: `reviews/loop-unattended/656-c33608ff-savelev-stash-lights-billobjs.md` **Addressed:** D-1708 `0c0f29fe`


- [x] `dungeon.c` recalc_mapseen Blind bigroom / oracle / valley / sanctum (named). Not knox/drawbridge. **Addressed:** D-1707 `7b26f699`


- [x] `getline.c` yn_function addcmdq (named). Not Traditional itemize. **Addressed:** D-1706 `1567e9bf`


- [x] `shk.c` bill_box_content (named). Not contained_cost. **Addressed:** D-1705 `7d0a0ddc`


- [x] `shk.c` dopay multi-shk getpos (named). Not shk_names_obj. **Addressed:** D-1704 `68f8585b`


- [x] `shk.c` shk_names_obj makeknown (named). Not buy_container. **Addressed:** D-1703 `3d728adf`


- [x] `shk.c` buy_container (named). Not cheapest_item. **Addressed:** D-1702 `c7648ccf`


- [x] `options.c` wizmgender glyph-reset (named). Not wizweight. **Addressed:** D-1701 `f7a10b6f`


- [x] `options.c` mO perminv_mode compound row (named). Not optfn_perminv_mode. **Addressed:** D-1700 `3ab2697c`

## 2026-08-29

- [x] `dungeon.c` print_mapseen knox/drawbridge (named). Not cemetery JSON. **Addressed:** D-1693 `605f0f2e`


- [x] `artifact.c` wield restrict_name (named). Not do_oname slip. **Addressed:** D-1692 `ac1199da`


- [x] `o_init.c` undiscover_object / gem_learned (named). Not oc_uses_known. **Addressed:** D-1691 `93fcd877`


- [x] `objects.h` oc_charged extract (named). Not oc_merge. **Addressed:** D-1690 `0458e7cc`


- [x] `engrave.c` doengrave non-hands stylus (named). Not IA_ENGRAVE pushkeys. **Addressed:** D-1689 `658cd53c`


- [x] `shk.c` cheapest_item early return (named). Not Traditional itemize. **Addressed:** D-1688 `ac894764`


- [x] `invent.c` Traditional itemize yn (named). Not cheapest_item. **Addressed:** D-1687 `bad8cbd6`


- [x] `iactions.c` remaining pushkeys rub/swap/whatis (named). Not two-weapon. **Addressed:** D-1686 `300d7098`


- [x] `dungeon.c` save_mapseen cemetery JSON (named). Not print_mapseen cemetery. **Addressed:** D-1685 `69a1451f`


- [x] `pay_billed_items` (`shk.c:2042–2097`): delete `pay_take_canned_billed`. After IA_BUY_OBJ, take the C `via_menu` arm into `menu_pick_pay_items`; do not skip that menu because a canned KEY equals `obj.invlet`. Leftover `CMDQ_KEY` after `dopay` is C `rhack` `:3642–3651`. Do not port `cheapest_item` / Traditional itemize / `buy_container`. Source: `reviews/loop-unattended/637-6441842f-ia-buy-obj.md` **Addressed:** D-1684 `01f25fda`


- [x] `sit.c` special_throne_effect grease spray (named). Not use_grease. **Addressed:** D-1683 `d2bcd227`


- [x] `do_name.c` docallcmd #if 0 EXCLUDE (named). Not `'i'` getobj_name. **Addressed:** D-1682 `3a2c9f83`


- [x] `do_name.c` `'i'` getobj_name clone (named). Not #if 0 EXCLUDE. **Addressed:** D-1681 `86cefef1`


- [x] `do_name.c` oname via_naming livelog (named). Not wield restrict_name. **Addressed:** D-1680 `c8309c01`


- [x] `pickup.c` choose_tip_container_menu (named). Not tip getobj. **Addressed:** D-1679 `1b08a2d9`


- [x] `pray.c` offer_corpse (named). Not floorfood sacrifice getobj. **Addressed:** D-1678 `8a8124d1`


- [x] `iactions.c` IA_TWOWEAPON (named). Not offer/tip/invoke. **Addressed:** D-1677 `478f2710`


- [x] `iactions.c` IA_BUY_OBJ shop pay (named). Not offer/tip/invoke. **Addressed:** D-1676 `6441842f`


- [x] `iactions.c` remaining pushkeys unwield/name/eat/engrave (named). Not offer/tip/invoke. **Addressed:** D-1675 `9613be3b`


- [x] `o_init.c` oc_uses_known extract (named). Not rename_disco. **Addressed:** D-1674 `115570e2`


- [x] `do_name.c` distant_monnam astral high-cleric (named). Not do_mgivenname. **Addressed:** D-1673 `39af0ea7`


- [x] `do_name.c` docall sink-fluid / safe_qbuf (named). Not `'o'` getobj. **Addressed:** D-1672 `1e88c3d3`


- [x] `do_name.c` docallcmd cmdq_pop canned (named). Not `'o'` getobj. **Addressed:** D-1671 `16fd4cbc`


- [x] `do_name.c` do_oname artifact_name slip / restrict_name / wipeout_text (named). Not `'o'` getobj. **Addressed:** D-1670 `6453e043`


- [x] `options.c` wizweight optfn_boolean after-change (named). Not fixinv. **Addressed:** D-1669 `1de9cec2`


- [x] `invent.c` `noarmor` uskin (named). Not doprarm. **Addressed:** D-1668 `81f571d0`


- [x] `dosacrifice` (`pray.c:1874–1892`) after a successful `floorfood` pick of `CORPSE` / `AMULET_OF_YENDOR` / `FAKE_AMULET_OF_YENDOR` must `return ECMD_TIME`, not `ECMD_OK`. Do not port `offer_corpse` in that iter. Source: `reviews/loop-unattended/626-784e3060-iactions-pushkeys.md` **Addressed:** D-1667 `0cc9e178`


- [x] `can_set_perm_invent` (`options.c:5507–5508`) must import `InvOptOn` from `const.js`. Do not rewrite can_set, add `strncmpi` #4, or insert the mO row. Source: `reviews/loop-unattended/622-536904b4-optfn-perminv-mode.md` **Addressed:** D-1666 `3c77e49a`


- [x] `iactions.c` remaining pushkeys offer/tip/invoke (named). Not use_grease. **Addressed:** D-1665 `784e3060`


- [x] `wizcmds.c` `sanity_check` gold/invlet (named). Not check_invent_gold. **Addressed:** D-1664 `88a989f0`


- [x] `invent.c` `dounpaid` (named). Not invlet_constant. **Addressed:** D-1663 `c1e99a17`


- [x] `questpgr.c` qt_pager common fallback (named). Not convert_arg. **Addressed:** D-1662 `101d9d0b`


- [x] `options.c` `optfn_perminv_mode` (named). Not doperminv. **Addressed:** D-1661 `536904b4`


- [x] `do_name.c` docallcmd `'o'` getobj call (named). Not lookup_novel. **Addressed:** D-1660 `7504982e`


- [x] `dungeon.c` cemetery bones list (named). Not dooverview. **Addressed:** D-1659 `f88e0665`


- [x] `dungeon.c` print_mapseen altar-god coalign (named). Not dooverview PICK_ONE. **Addressed:** D-1658 `2ec50652`


- [x] `cmd.c` overlay BIND= on if/else keys (named). Not cmdbind_get default. **Addressed:** D-1657 `ee4f922a`


- [x] `apply.c` `use_grease` (named). Not consume_obj_charge. **Addressed:** D-1656 `9ac19d6f`


- [x] `invent.c` `invlet_constant` (named). Not check_invent_gold. **Addressed:** D-1655 `d34f23ee`


- [x] `pickup.c` `safe_qbuf` (named). Not floor query_classes. **Addressed:** D-1654 `e53a5df9`


- [x] `sounds.c` Death_quote / `u_have_novel` (named). Not read_tribute. **Addressed:** D-1653 `7e407046`


- [x] `sit.c` `eyecount` (named). Not confer_oc_oprop. **Addressed:** D-1652 `105c91aa`


- [x] `do_name.c` `lookup_novel` (named). Not do_mgivenname. **Addressed:** D-1651 `41ac42ac`


- [x] `dungeon.c` `dooverview` PICK_ONE (named). Not doextlist. **Addressed:** D-1650 `f92f0d66`


- [x] `questpgr.c` `convert_arg` (named). Not convert_line %Xh. **Addressed:** D-1649 `90077834`


- [x] Await `newcham` at remaining sync `NO_NC_FLAGS` sites when mleashed `m_unleash` or Elbereth `monflee` returns a Promise (C `mon.c` `newcham` `:5386–5398` / `:5517–5532` finishes before `return 1`). Not `m_unleash` body. Source: reviews/loop-unattended/606-cc8a839c-newcham-mleashed.md **Addressed:** D-1648 `979dd522`


- [x] `o_init.c` `rename_disco` (named). Not do_mgivenname. **Addressed:** D-1647 `69534fd4`


- [x] `win/tty/wintty.c` MENU_SEARCH / `tty_wait_synch` (named). Not kill_char. **Addressed:** D-1646 `48758020`


- [x] `mon.c` newcham mleashed (named). Not restore_cham. **Addressed:** D-1645 `cc8a839c`


- [x] `do.c` ACH_ASTR (named). Not reset_hostility. **Addressed:** D-1644 `d48909a2`


- [x] `cmd.c` BIND= M('?') (named). Not doextlist. **Addressed:** D-1643 `e1171a1a`


- [x] `invent.c` tty WIN_INVEN / `#perminv` (named). Not consume_obj_charge. **Addressed:** D-1642 `a95b0aa6`


- [x] `invent.c` `check_invent_gold` (named). Not adjust_split. **Addressed:** D-1641 `429ab7b7`


- [x] `steed.c` `landing_spot` KNOCKED preferred-dir (named). Not DISMOUNT_THROWN. **Addressed:** D-1640 `78fc5011`


- [x] `getline.c` `hooked_tty_getlin` ESC-nonempty must fall through to else `tty_nhbell` (and `intr`/`doprev`), not `continue` after clear. Same in `get_ext_cmd`. Source: reviews/loop-unattended/593-20fa20b3-kill-char.md **Addressed:** D-1639 `d5474f87`


- [x] `do_name.c` `do_mgivenname` (named). Not kill_char. **Addressed:** D-1638 `f9bed6be`


- [x] `mon.c` `restore_cham` (named). Not normal_shape. **Addressed:** D-1637 `f4cae40b`


- [x] `nhlua.c` `restore_luadata` (named). Not restore_gamelog. **Addressed:** D-1636 `7f506ccd`


- [x] `invent.c` ggetobj drop (named). Not takeoff/identify. **Addressed:** D-1635 `9eb563b8`


- [x] `questpgr.c` `convert_line` pronoun `%Xh` (named). Not com_pager_core. **Addressed:** D-1634 `b111beb6`


- [x] `files.c` tribute (named). Not putmsghistory. **Addressed:** D-1633 `e476fe74`


- [x] `getline.c` `kill_char` (named). Not EDIT_GETLIN. **Addressed:** D-1632 `20fa20b3`


- [x] `topl.c` `tty_yn_function` `tty_nhbell` (named). Not post-answer toplines. **Addressed:** D-1631 `4b50b2e9`


- [x] `do_wear.c` `menu_remarm` (named). Not take_off occupation. **Addressed:** D-1630 `a2992805`


- [x] `dog.c` `free_edog` (named). Not initedog ogoal. **Addressed:** D-1629 `54c89bcc`


- [x] `restore.c` `restore_gamelog` (named). Not restore_msghistory. **Addressed:** D-1628 `7af8fe5b`


- [x] `steed.c` `dismount_steed` DISMOUNT_THROWN (named). Not dog_move Conflict. **Addressed:** D-1627 `15041ea2`


- [x] `sounds.c` MS_BOAST hostile giants (named). Not MS_HUMANOID. **Addressed:** D-1626 `c020e463`


- [x] `cmd.c` `doextlist` (named). Not #seeall EXT_CMDS. **Addressed:** D-1625 `1d6a8b20`


- [x] `getline.c` EDIT_GETLIN (named). Not getline ^P. **Addressed:** D-1624 `3e6bf20d`


- [x] `topl.c` `tty_yn_function` post-answer `toplines=prompt+key` (named). Not yn ^P. **Addressed:** D-1623 `935c8220`


- [x] `questpgr.c` `com_pager_core` synopsis (named). Not restore_msghistory. **Addressed:** D-1622 `fdb4ed5d`


- [x] `invent.c` `adjust_split` GC_ECHOFIRST|GC_CONDHIST caller (named). Not get_count. **Addressed:** D-1621 `5f2c5f4d`


- [x] `pickup.c` floor `query_classes` (named). Not traditional_loot. **Addressed:** D-1620 `cb4d8a91`


- [x] `do_wear.c` `take_off` occupation (named). Not ggetobj. **Addressed:** D-1619 `597fd9ba`


- [x] `sounds.c` peaceful MS_HUMANOID (named). Not mplayer_talk. **Addressed:** D-1618 `c98a5fab`


- [x] `dogmove.c` Conflict `lose_guardian_angel` caller (named). Not gain_guardian_angel. **Addressed:** D-1617 `5c66e2ab`


- [x] `mon.c` `reset_hostility` (named). Not gain_guardian_angel. **Addressed:** D-1616 `6d7584b0`


- [x] `apply.c` `consume_obj_charge` `update_inventory` (named). Not perm_invent InvInUse. **Addressed:** D-1615 `6a08939b`


- [x] `restore.c` `restore_msghistory` (named). Not putmsghistory. **Addressed:** D-1614 `68c0f298`


- [x] `cmd.c` `get_count` historicmsg (named). Not putmsghistory. **Addressed:** D-1613 `587c52ad`


- [x] `topl.c` `tty_yn_function` ^P (named). Not command ^P. **Addressed:** D-1612 `7012e194`

## 2026-08-28

- [x] `getline.c` getlin ^P `tty_doprev_message` (named). Not command ^P. **Addressed:** D-1611 `21441f2e`


- [x] `dog.c` `initedog` ogoal `-1` (named). Not has_edog. **Addressed:** D-1610 `35d8e512`


- [x] `mon.c` `m_unleash` (named). Not newcham. **Addressed:** D-1609 `c3d43f93`


- [x] `minion.c` `gain_guardian_angel` (named). Not create_mplayers. **Addressed:** D-1608 `43209cfb`


- [x] `makemon.c` mongets mplayer-sword spe (named). Not show_transient_light. **Addressed:** D-1607 `233abaea`


- [x] `mplayer.c` `mplayer_talk` (named). Not create_mplayers. **Addressed:** D-1606 `f9d27e3f`


- [x] `cmd.c` `#seeall` EXT_CMDS (named). Not doprinuse. **Addressed:** D-1605 `44151244`


- [x] `zap.c` `bhit` `show_transient_light` `!Blind` must use youprop `(HBlinded||EBlinded)&&!BBlinded` (`youprop.h:103`), not `zap.js` sticky `u.Blind||u.ublind`. Source: reviews/loop-unattended/558-9244ce75-show-transient-light.md **Addressed:** D-1604 `49933ea8`


- [x] `allmain.c` new-game `program_state.beyond_savefile_load = 1` (`:71`, “for TTY_PERM_INVENT”) and `restore.c` `:942` after load. JS `sync_perminvent` gates `pickinv_build_perm` on that field but never sets it, so D-1600 InvInUse filter is dead. Source: reviews/loop-unattended/561-fb87326a-perm-invent-inv-inuse.md **Addressed:** D-1603 `d1a832a1`


- [x] `pickup.c` ggetobj takeoff/identify askchain (named). Not traditional_loot. **Addressed:** D-1602 `b9710bcf`


- [x] `topl.c` `tty_doprev_message` (named). Not putmsghistory. **Addressed:** D-1601 `fd0ada3f`


- [x] `invent.c` perm_invent InvInUse (named). Not inuse_only. **Addressed:** D-1600 `fb87326a`


- [x] `invent.c` SORTLOOT_PETRIFY (named). Not inuse_only. **Addressed:** D-1599 `95ad0f11`


- [x] `makemon.c` `has_mcorpsenm` (named). Not set_mimic_sym. **Addressed:** D-1598 `9a4cbd04`


- [x] `makemon.c` `show_transient_light` (named). Not ndemon. **Addressed:** D-1597 `9244ce75`


- [x] `mplayer.c` `create_mplayers` (named). Not mk_mplayer. **Addressed:** D-1596 `fa152acc`


- [x] `dog.c` tamedog `initedog` has_edog vs `!mtame` (named). Not FULL_MOON. **Addressed:** D-1595 `ab70af21`


- [x] `mon.c` `normal_shape` must await `newcham(..., NC_SHOW_MSG)` (C `:4438`) so PfSC `rescham`/`restore_cham`/zap cancel print the shapeshift pline before `cham=NON_PM`/`newsym`/clay-golem, not as a dropped Promise. Source: reviews/loop-unattended/547-9cdc66f5-newcham-nc-show-msg.md **Addressed:** D-1594 `dc1d6d94`


- [x] `dog.c` tamedog ustuck expels/unstuck (named). Not FULL_MOON. **Addressed:** D-1593 `4b34b340`


- [x] `pickup.c` more_containers `n` (named). Not traditional_loot. **Addressed:** D-1592 `c4be5135`


- [x] `invent.c` `display_used_invlets` (named). Not gacc. **Addressed:** D-1591 `92bbf63b`


- [x] `invent.c` wizid unid_cnt>0 PICK_ANY (named). Not gacc. **Addressed:** D-1590 `094af60d`


- [x] `invent.c` sortloot inuse_only (named). Not gacc. **Addressed:** D-1589 `7415056f`


- [x] `invent.c` putmsghistory (named). Not gacc. **Addressed:** D-1588 `a3325fe0`


- [x] `display.c` `mimic_light_blocking` See_invisible block/unblock (named). Not seemimic. **Addressed:** D-1587 `5e46f730`


- [x] `mon.c` `newcham` NC_SHOW_MSG `pline_mon` (named). Not Protection cancel. **Addressed:** D-1586 `9cdc66f5`


- [x] `dog.c` FULL_MOON S_DOG `rn2(6)` (named). Not wake_nearto. **Addressed:** D-1585 `d5c9430a`


- [x] `makemon.c` `mk_mplayer` (named). Not ndemon. **Addressed:** D-1584 `05c69d9b`


- [x] `vision.c` `nv_range` circle (named). Not unblock_point. **Addressed:** D-1583 `7843458b`


- [x] `cmd.c` PREFIXCMD / `cmdq_shift` (named). Not do_repeat. **Addressed:** D-1582 `6c996e15`


- [x] `pickup.c` traditional_loot askchain (named). Not `'r'` reversed. **Addressed:** D-1581 `fd458754`


- [x] `invent.c` gacc / `'0'` ball class (named). Not mime_action. **Addressed:** D-1580 `d7879b7c`


- [x] `invent.c` mime_action (named). Not force_invmenu. **Addressed:** D-1579 `51d877a8`


- [x] `invent.c` force_invmenu `*`/`?` redo (named). Not hands/xtra. **Addressed:** D-1578 `c4019a30`


- [x] `worm.c` `redraw_worm` (named). Not cutworm. **Addressed:** D-1577 `38c61b34`


- [x] `region.c` `add_region` / `remove_region` / `expire_gas_cloud` per-cell `block_point`/`unblock_point` (C `:326–328` / `:375–376` / `:1071–1072`). D-1574 made `recalc_block_point` incremental; JS still one-corner `recalc` (expire pass 1 empty). First public FAIL: seed4500 at `1ba35e31` (RNG 88490/108275). Source: reviews/loop-unattended/535-1ba35e31-unblock-point.md **Addressed:** D-1576 `7131dc25`


- [x] `makemon.c` `ndemon` aligned `mkclass` (named). Not rndmonst_adj. **Addressed:** D-1575 `d13bf416`


- [x] `vision.c` `unblock_point`/`dig_point` (named). Not block_point. **Addressed:** D-1574 `1ba35e31`


- [x] `mon.c` `newcham` Protection_from_shape_changers cancel (named). Not set_mimic_sym early-out. **Addressed:** D-1573 `423b6b29`


- [x] `timeout.c` `attach_egg_hatch_timeout` (named). Not Plan-B. **Addressed:** D-1572 `6d7adcc6`


- [x] `vision.c` `vision_recalc` xray IN_SIGHT (named). Not howmonseen. **Addressed:** D-1571 `9772b028`


- [x] `worm.c` `cutworm` (named). Not worm_known. **Addressed:** D-1570 `3ace1611`


- [x] `invent.c` pickinv hands/xtra_choice (named). Not `&ctmp`. **Addressed:** D-1569 `934f168b`


- [x] `invent.c` getobj eat/read/zap/tin NOFLAGS (named). Not ALLOWCNT. **Addressed:** D-1568 `413df120`


- [x] `pickup.c` `'r'` reversed put-in then take-out (named). Not stash. **Addressed:** D-1567 `b2827fe2`


- [x] `makemon.c` `rndmonst_adj` rogue/elem filters (named). Not mkclass. **Addressed:** D-1566 `72735008`


- [x] `makemon.c` `clone_mon` `place_monster` 2D grid (named). Not HP split. **Addressed:** D-1565 `224bd3a6`


- [x] `makemon.c` `set_mimic_sym` Protection_from_shape_changers early-out (named). Not DELPHI. Not block_point. **Addressed:** D-1564 `e8cc4c96`
- [x] `makemon.c` `set_mimic_sym` slime-mold `flags.made_fruit` (named). Not DELPHI. **Addressed:** D-1564 `e8cc4c96`
- [x] `makemon.c` `set_mimic_sym` nocorpse/hatch/tin Plan-B (named). Not DELPHI. **Addressed:** D-1564 `e8cc4c96`


- [x] `cmd.c` getobj CQ_REPEAT / `in_doagain` (named). Not canned CMDQ_INT. **Addressed:** D-1563 `1504ead1`


- [x] `vision.c` `howmonseen` (named). Not worm_known. **Addressed:** D-1562 `a54cb31b`


- [x] `pickup.c` stash getobj ALLOWCNT (named). Not CMDQ_INT. **Addressed:** D-1561 `c60475f1`


- [x] `wield.c` `finish_splitting` / `unsplitobj` (named). Not CMDQ_INT. **Addressed:** D-1560 `67d0c50c`


- [x] `invent.c` `display_pickinv` `&ctmp` menu count (named). Not CMDQ_INT. **Addressed:** D-1559 `30c83eb9`


- [x] `artifact.c` SEARCH/REGEN/XRAY conferral (named). Not cspfx. **Addressed:** D-1558 `599494b3`

## 2026-08-26

- [x] `makemon.c` `set_mimic_sym` `block_point` (named). Not DELPHI. **Addressed:** D-1557 `0f5e4df5`


- [x] `makemon.c` `set_mimic_sym` DELPHI `S_fountain` (named). Not furnsyms. **Addressed:** D-1556 `f8a7cea2`


- [x] `do_name.c` `namefloorobj` (named). Not that_is_a_mimic. **Addressed:** D-1555 `1c43e64c`


- [x] `pager.c` `mhidden_description` (named). Not that_is_a_mimic. **Addressed:** D-1554 `1918ea61`


- [x] `sp_lev.c` `splev_create_monster` RANDOM-only (named). Not mk_roamer. **Addressed:** D-1553 `9ed46432`


- [x] `cmd.c` INTERNALCMD Eyes `is_plural` (named). Not #altdip. **Addressed:** D-1552 `4383ae0a`


- [x] `invent.c` canned CMDQ_INT (named). Not ALLOWCNT. **Addressed:** D-1551 `73321d0c`


- [x] `mon.c` `monkilled`: `js/trap.js` clone still `cansee(head)`; use `wormno ? worm_known : cansee(head)` like `mhitm.js`. Source: reviews/loop-unattended/509-9b53440e-worm-known.md **Addressed:** D-1550 `27feb511`


- [x] `detect.c` `map_monst` / `monster_detect`: compare long-worm by `mndx`/`mnum`, not `mtmp.data === mons(PM_LONG_WORM)` (`mons()` allocates a new ptr so `detect_wsegs` never runs). Source: reviews/loop-unattended/506-adfba7fc-detect-wsegs.md **Addressed:** D-1549 `34013957`


- [x] `worm.c` `worm_known` (named). Not detect_wsegs. **Addressed:** D-1548 `9b53440e`


- [x] `pager.c` getpos fakeobj (named). Not that_is_a_mimic. **Addressed:** D-1547 `0461e305`


- [x] `dog.c` `tamedog` `wake_nearto` (named). Not is_covetous. **Addressed:** D-1546 `da06ac60`


- [x] `worm.c` `detect_wsegs` (named). Not see_wsegs. **Addressed:** D-1545 `adfba7fc`


- [x] `pager.c` `that_is_a_mimic` (named). Not object_from_map. **Addressed:** D-1544 `c9f09e97`


- [x] `makemon.c` `set_mimic_sym` furnsyms real S_* (named). Not door S_hcdoor. **Addressed:** D-1543 `caae0b20`


- [x] `themerms.lua` Light source fill oil lamp (named). Not create_object o->lit. **Addressed:** D-1542 `e5188ba2`


- [x] `restore.c` `ghostfruit` (named). Not goodfruit. **Addressed:** D-1541 `21ccdfde`


- [x] `shk.c` `make_happy_shk` (`:1395–1435`): port `adjalign` (non-Rogue), `!inhishop` `home_shk` / `mdrop_special_objs`+`migrate_to_level`+`dismiss_kops`, and `make_happy_shoppers` (`kops_gone`/`pacify_guards`) so `tamedog` `:1235–1238` matches C, not pacify+“calms down” only. Source: reviews/loop-unattended/493-81e04089-tamedog-covetous.md **Addressed:** D-1540 `53f71db1`


- [x] `artifact.c` cspfx W_ART (named). Not SPFX_WARN. **Addressed:** D-1539 `719506a4`


- [x] `dog.c` wander/`somexy` (named). Not is_covetous. **Addressed:** D-1538 `e7574dc9`


- [x] `cmd.c` INTERNALCMD `#altdip` (named). Not dip_into. **Addressed:** D-1537 `4508a3cb`


- [x] `makemon.c` `set_mimic_sym` door `S_hcdoor` (named). Not furnsyms. **Addressed:** D-1536 `2778c077`


- [x] `pickup.c` `observe_quantum_cat` FOOT (named). Not HEAD. **Addressed:** D-1535 `455020ed`


- [x] `mcastu.c` `mcast_blind_you` EYE (named). Not PSI_BOLT HEAD. **Addressed:** D-1534 `289573bc`


- [x] `sp_lev.c` `create_object` `o->lit` (named). Not mktrap_victim. **Addressed:** D-1533 `9d2ba80e`


- [x] `dog.c` `tamedog` is_covetous (named). Not leftovers. **Addressed:** D-1532 `81e04089`


- [x] `sp_lev.c` `create_monster` / `load_pri_strt`: `align!=RANDOM` aligned cleric must `mk_roamer` (`MM_EMIN`, `min_align=A_NONE`) like C `:1983–1984` + `priest.c:738–746`, not `makemon(..., 0)`, so D-1526 emin `rn2(3)` does not fire on Pri-strt. Source: reviews/loop-unattended/487-4e78ca90-emin-roaming.md **Addressed:** D-1531 `3c112783`


- [x] `invent.c` `getobj` GETOBJ_ALLOWCNT count prefix (named). Not Palantir. **Addressed:** D-1530 `a5d779b7`


- [x] `worm.c` `see_wsegs` (named). Not worm_move. **Addressed:** D-1529 `72c1fcdd`


- [x] `display.c` `show_region` (named). Not Hallu/Warn_of_mon. **Addressed:** D-1528 `aa4d11f5`


- [x] `timeout.c` `visible_region_summary` (named). Not any_visible_region. **Addressed:** D-1527 `d53c5cd1`


- [x] `makemon.c` emin roaming (named). Not dprince. **Addressed:** D-1526 `4e78ca90`


- [x] `makemon.c` `set_mimic_sym` altar Align2amask MCORPSENM (named). Not maze/shop. **Addressed:** D-1525 `e234a41b`


- [x] `pager.c` look SLIME_MOLD `spe = current_fruit` (named). Not xname. **Addressed:** D-1524 `2c688c98`


- [x] `bones.c` `goodfruit` (named). Not fruit_from_indx. **Addressed:** D-1523 `e13f38ae`


- [x] `objnam.c` `reorder_fruit` (named). Not fruit_from_indx. **Addressed:** D-1522 `aac21a74`


- [x] `objnam.c` doname_base slime-mold fake_arti (named). Not fruit_from_indx. **Addressed:** D-1521 `6a42c40e`


- [x] `options.c` fruitadd should call objnam `fruit_from_name` (not the exact-only walker). Not fruit_from_indx. **Addressed:** D-1520 `5dd0ba20`


- [x] `mklev.c` `mktrap_victim` gnome candle `begin_burn` (named). Not `m_initinv`. **Addressed:** D-1519 `d5799f73`


- [x] `makemon.c` dprince MS_BRIBE / raven BEC_DE_CORBIN (named). Not emin. **Addressed:** D-1518 `527815fb`


- [x] `makemon.c` `set_mimic_sym` maze/sokoban/`in_town` (named). Not shop arm. **Addressed:** D-1517 `8bfe0bc8`


- [x] `makemon.c` non-salamander S_LIZARD `m_initweap` (named). Not S_KOP. **Addressed:** D-1516 `cf3c5701`


- [x] `makemon.c` S_KOP `m_initweap` specials (named). Not throws_rocks. **Addressed:** D-1515 `3a5f062e`

## 2026-08-25

- [x] `artifact.c` SPFX_WARN conferral / MATCH_WARN (named). Not Sting_effects. **Addressed:** D-1514 `9a50ef27`


- [x] `mklev.js` `load_minetn_7` town-room gnomes: C `dat/minetn-7.lua` has three `des.monster("gnome")` then gnome lord + two monkeys; JS calls `splev_room_monster('gnome')` four times (extra `induced_align(80)`+`makemon`). Source: reviews/loop-unattended/465-eeb0e912-minetn-7-bazaar-town.md **Addressed:** D-1513 `2f5f7fd1`


- [x] `display.c` `any_visible_region` (named). Not Hallu/Warn_of_mon. **Addressed:** D-1512 `79744185`


- [x] `objnam.c` `fruit_from_indx` (named). Not the(). **Addressed:** D-1511 `85c341a7`


- [x] `zap.c` `poly_obj` worn `set_wear` (named). Not potion_dip. **Addressed:** D-1510 `57d22857`


- [x] `potion.c` `potion_dip` lichen corpse / acid-erode (named). Not H2O useeit. **Addressed:** D-1509 `7092fab7`


- [x] `polyself.c` `body_part` aliases: `body_part_head` (mcastu.js), `body_part_hand` (pickup.js). Deferred for scope. zap.js is D-1496. **Addressed:** D-1508 `be542317`


- [x] `makemon.c` `throws_rocks` Sokoban first-try (named). Not gnome candle. **Addressed:** D-1507 `a4a370f4`


- [x] `makemon.c` gnome candle `begin_burn` after `!mpickobj` (named). Not add_to_minv. **Addressed:** D-1506 `1e1d1864`


- [x] `dog.c` `mon_arrive` `MIGR_LEFTOVERS` DF_ALL (named). Not stolen_booty. **Addressed:** D-1505 `cac06f86`


- [x] `mklev.c` minetn-7 load_special (named). Not minetn-6. **Addressed:** D-1504 `eeb0e912`


- [x] `mklev.c` minetn-6 load_special (named). Not minetn-1. **Addressed:** D-1503 `1f64431d`


- [x] `artifact.c` `doinvoke` TAMING / CHARGE_OBJ / CREATE_PORTAL / BANISH (named). Not HEALING/storm. **Addressed:** D-1502 `89b85fcc`


- [x] `potion.c` `H2Opotion_dip` useeit `ublindf && Blindfolded_only` (named). Not mix. **Addressed:** D-1501 `83b29455`


- [x] `potion.c` `dip_into` (named). Not dodip. **Addressed:** D-1500 `b96ac27f`


- [x] `potion.c` `potion_dip` `poly_obj`/`obj_unpolyable` (named). Not mixtype. **Addressed:** D-1499 `089a9829`


- [x] `potion.c` `potion_dip` oil/lamp (named). Not poison-coat. **Addressed:** D-1498 `51ea77da`


- [x] `potion.c` `potion_dip` poison-coat / healing unpoison (named). Not unicorn mix. **Addressed:** D-1497 `377302b9`


- [x] `artifact.c` `invoke_untrap` is on the live cost+switch list while `trap.js` `untrap` always returns 0 (`void force`; door/floor disarm deferred). Either port C `untrap(TRUE,0,0,NULL)` success (`:1838–1845`) or keep UNTRAP named (no cost) until the callee can return true. Source: reviews/loop-unattended/449-00d5d4d6-arti-invoke-remaining.md **Addressed:** D-1495 `4722df06`


- [x] `artifact.c` `invoke_healing` first `You_feel("better.")` gate must use C `Blinded` as 0/1 (`HBlinded && !BBlinded`, `youprop.h:92`) vs `ucreamed`, not the full `HBlinded` word (`artifact.c :1787`). Keep the second `BlindedTimeout` gate. Not ENERGY. Source: reviews/loop-unattended/449-00d5d4d6-arti-invoke-remaining.md **Addressed:** D-1494 `27a1f4b6`


- [x] `allmain.c` `see_monsters` Hallu / Warn_of_mon (named). Not DETECT_MONSTERS timeout. **Addressed:** D-1493 `8669b5b8`


- [x] `makemon.c` `add_to_minv` merge (named). Not stolen_booty. **Addressed:** D-1492 `b303c111`


- [x] `worm.c` `worm_move` (named). Not initworm. **Addressed:** D-1491 `f26e11aa`


- [x] `mklev.c` `minetn-1` load_special (named). Not minetn-5. **Addressed:** D-1490 `69080895`


- [x] `zap.c` `zap_map` lateral drawbridge / bhit (named). Not engraving. **Addressed:** D-1489 `83fa138f`


- [x] `artifact.c` `doinvoke` remaining `inv_prop` (named). Not BLINDING_RAY. **Addressed:** D-1488 `00d5d4d6`


- [x] `objnam.c` `the()` fruit_from_name + artifact_name (named). Not CapitalMon. **Addressed:** D-1487 `8d41bd04`


- [x] `potion.c` `potion_dip` unicorn/amethyst mix (named). Not mixtype. **Addressed:** D-1486 `9f784a5c`


- [x] `zap.c` `zap_updown` `default` must `break` into shared down `bhitpile`+`zap_map` (C `:3378–3389`) so unmounted down POLY/cancel/invis/tele hit D-1476’s arms. Not probing. Not lateral `bhit`. Source: reviews/loop-unattended/437-747e6616-zap-map-engraving-cancel-trap.md **Addressed:** D-1485 `e98c0be8`


- [x] `muse.c` `mbhit` doorlock (named). Not hero `bhit`. **Addressed:** D-1484 `dba2c79a`


- [x] `zap.c` `bhito` poly-arm boxlock `reset_pick` (named). Not uchain. **Addressed:** D-1483 `49826707`


- [x] `zap.c` `bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT (named). Not LOCKING. **Addressed:** D-1482 `f0cb5942`


- [x] `zap.c` `bhito` uchain unpunish WAN_OPENING (named). Not boxlock. **Addressed:** D-1481 `4642b8b1`


- [x] `zap.c` `zap_steed` SPE_CURE_SICKNESS via bhitm (named). Not SPEED. **Addressed:** D-1480 `a65834a1`


- [x] `zap.c` `zap_steed` WAN_SPEED_MONSTER via bhitm (named). Not SLOW. **Addressed:** D-1479 `7c918806`


- [x] `zap.c` `zap_steed` WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via bhitm (named). Not STRIKING. **Addressed:** D-1478 `713e0441`


- [x] `potion.c` `potionbreathe` remaining otyps (named). Not potionhit. **Addressed:** D-1477 `c3f67016`


- [x] `zap.c` `zap_map` engraving/cancel trap (named). Not probing. **Addressed:** D-1476 `747e6616`


- [x] `zap.c` `bhit` doorlock WAN_LOCKING/SPE_WIZARD_LOCK (named). Not OPENING. **Addressed:** D-1475 `a3a2d65a`


- [x] `zap.c` `zap_steed` WAN_STRIKING/SPE_FORCE_BOLT via bhitm (named). Not INVIS. **Addressed:** D-1474 `dfd88d1b`


- [x] `zap.c` `zap_steed` WAN_MAKE_INVISIBLE via bhitm (named). Not POLY. **Addressed:** D-1473 `e6a44782`


- [x] `potion.c` `potionhit` (named from D-1457). Not mixtype. **Addressed:** D-1472 `71a0a3d5`


- [x] `zap.c` `zap_steed` WAN_POLYMORPH/SPE_POLYMORPH via bhitm (named). Not CANCEL. **Addressed:** D-1471 `36a4e811`


- [x] `zap.c` `zap_steed` WAN_CANCELLATION/SPE_CANCELLATION via bhitm (named). Not OPENING. **Addressed:** D-1470 `444e2080`


- [x] `spell.c` `spelleffects` SPE_HEALING/SPE_EXTRA_HEALING directional weffects (named). Not TELE. **Addressed:** D-1469 `245c783d`


- [x] `spell.c` `spelleffects` SPE_TELEPORT_AWAY IMMEDIATE wand-duplicate weffects (named). Not STONE. **Addressed:** D-1468 `3b4c39e2`


- [x] `zap.c` `bhito` boxlock WAN_OPENING/WAN_LOCKING (named). Not doorlock. **Addressed:** D-1467 `1003ab88`


- [x] `zap.c` `zap_updown` WAN_STONE_TO_FLESH (named). Not LOCKING. **Addressed:** D-1466 `3605a281`


- [x] `zap.c` `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK (named). Not STRIKING. **Addressed:** D-1465 `a52401a6`


- [x] `zap.c` `zap_steed` SPE_DRAIN_LIFE via bhitm (named). Not OPENING. **Addressed:** D-1464 `89aab16d`


- [x] `zap.c` `zap_steed` WAN_OPENING/SPE_KNOCK via bhitm (named). Not teleport. **Addressed:** D-1463 `99a31c84`


- [x] `zap.c` `bhit` doorlock WAN_OPENING/SPE_KNOCK (named). Not boxlock. **Addressed:** D-1462 `2173fc2d`


- [x] `zap.c` `weffects` SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate (named). Not mix. **Addressed:** D-1461 `e4d98eb1`


- [x] `zap.c` `weffects` SPE_CANCELLATION IMMEDIATE wand-duplicate (named). Not STONE. **Addressed:** D-1460 `f071b0ad`


- [x] `zap.c` `weffects` SPE_POLYMORPH IMMEDIATE wand-duplicate (named). Not CANCELLATION. **Addressed:** D-1459 `7634fd61`


- [x] `zap.c` `weffects` SPE_TURN_UNDEAD IMMEDIATE wand-duplicate (named). Not POLYMORPH. **Addressed:** D-1458 `01edf8b9`


- [x] `potion.c` remaining mix alchemy (named from D-1439). Not peffects. **Addressed:** D-1457 `c2736f3e`


- [x] `zap.c` `zap_updown` WAN_STRIKING/SPE_FORCE_BOLT (named). Not OPENING. **Addressed:** D-1456 `91e3e8a8`


- [x] `zap.c` `zap_steed` WAN_TELEPORTATION (named). Not probing. **Addressed:** D-1455 `ad3eca95`


- [x] `zap.c` `zap_updown` WAN_OPENING/SPE_KNOCK (named). Not probing. **Addressed:** D-1454 `68635edb`


- [x] `zap.c` `bhito` SPE_DRAIN_LIFE `drain_item` (named). Not probing. **Addressed:** D-1453 `291aea0a`


- [x] `zap.c` `weffects` SPE_WIZARD_LOCK IMMEDIATE wand-duplicate (named). Not POLYMORPH. **Addressed:** D-1452 `41c16bfe`


- [x] `zap.c` `weffects` SPE_SLOW_MONSTER IMMEDIATE wand-duplicate (named). Not LOCK. **Addressed:** D-1451 `5c8b73c5`


- [x] `zap.c` `weffects` SPE_KNOCK IMMEDIATE wand-duplicate (named from D-1427). Not SLOW. **Addressed:** D-1450 `de69d3f9`


- [x] `spell.c` SPE_FINGER_OF_DEATH wand-duplicate RAY (named from D-1440). Not MAGIC_MISSILE. **Addressed:** D-1449 `70c2b8e6`


- [x] `spell.c` SPE_MAGIC_MISSILE wand-duplicate RAY (named from D-1440). Not FINGER. **Addressed:** D-1448 `20f59004`


- [x] `uhitm.c` `mhitm_ad_phys` poison leftover (named from D-1415). Not rustm. **Addressed:** D-1447 `4dde6eeb`


- [x] `zap.c` `zapyourself` SPE_DRAIN_LIFE (named). Not bhitm drain. **Addressed:** D-1446 `ed218e86`


- [x] `zap.c` `bhito` WAN_PROBING (named). Not updown. **Addressed:** D-1445 `7628b03e`


- [x] `zap.c` `zap_updown` WAN_PROBING (named). Not steed. **Addressed:** D-1444 `ae0cf7f4`


- [x] `zap.c` `zap_steed` WAN_PROBING (named). Not zapyourself. **Addressed:** D-1443 `4a0aa5cc`


- [x] `uhitm.c` `mhitm_ad_phys` rustm leftover (named from D-1415). Not poison. **Addressed:** D-1442 `892be171`


- [x] `zap.c` `weffects` SPE_DIG wand-duplicate (named from D-1427). Not IMMEDIATE. **Addressed:** D-1441 `b8ef02c3`


- [x] `zap.c` `weffects` SPE_SLEEP wand-duplicate (named from D-1427). Not DIG. **Addressed:** D-1440 `530eaa3c`


- [x] `potion.c` `peffect_hallucination` (named). Not remaining mix. **Addressed:** D-1439 `f6dd492b`


- [x] `potion.c` `peffect_gain_ability` (named). Not hallucination. **Addressed:** D-1438 `abdbcad6`


- [x] `potion.c` `peffect_sleeping` (named). Not remaining peffects. **Addressed:** D-1437 `af184f1e`


- [x] `zap.c` `bhitm` SPE_DRAIN_LIFE (named). Not zapyourself slow. **Addressed:** D-1436 `e413754d`


- [x] `zap.c` `zapyourself` WAN_PROBING (named). Not drain. **Addressed:** D-1435 `ebe912e0`


- [x] `zap.c` `zapyourself` WAN_LOCKING (named). Not probing self. **Addressed:** D-1434 `4488f535`


- [x] `zap.c` `zapyourself` WAN_SLOW_MONSTER (named from D-1424). Not locking self. **Addressed:** D-1433 `07c5ee30`


- [x] `potion.c` `peffect_blindness` (named). Not sleeping. **Addressed:** D-1432 `b19bcf7a`

## 2026-08-24

- [x] `potion.c` `peffect_gain_level` (named). Not blindness. **Addressed:** D-1431 `66254727`


- [x] `potion.c` `peffect_acid` (named). Not gain level. **Addressed:** D-1430 `3e742468`


- [x] `potion.c` `peffect_gain_energy` (named). Not acid. **Addressed:** D-1429 `4a16af4e`


- [x] `potion.c` `peffect_polymorph` (named). Not gain energy. **Addressed:** D-1428 `19c24f62`


- [x] `zap.c` `zapnodir` remaining SPE_LIGHT wand-duplicate (named from D-1412). Not detect unseen. **Addressed:** D-1427 `91c11733`


- [x] `zap.c` `bhitm` WAN_PROBING (named from D-1369). Not locking. **Addressed:** D-1426 `e50968db`


- [x] `zap.c` `bhitm` WAN_LOCKING (named from D-1369). Not probing. **Addressed:** D-1425 `8f334efb`


- [x] `zap.c` `bhitm` WAN_SLOW_MONSTER (named). Not speed. **Addressed:** D-1424 `faa5f3f3`


- [x] `zap.c` `bhitm` WAN_MAKE_INVISIBLE `knowninvisible` must use C `See_invisible`/`Detect_monsters` (`H||E` ≡ `uprops[SEE_INVIS]`/`DETECT_MONSTERS`) so a conferral ring-of-see-invisible still takes the transparent+learnwand arm, not vanish. Source: reviews/loop-unattended/374-f968904d-bhitm-wan-make-invisible.md **Addressed:** D-1423 `1200fdb0`


- [x] `zap.c` `bhitm` WAN_SPEED_MONSTER (named from D-1410). Not slow. **Addressed:** D-1422 `9f2a3a08`


- [x] `spell.c` `spelleffects` SPE_INVISIBILITY peffects (named from D-1408). Not amulet drain. **Addressed:** D-1421 `d6d910c2`


- [x] `spell.c` `spelleffects` SPE_RESTORE_ABILITY peffects (named from D-1408). Not INVISIBILITY. **Addressed:** D-1420 `9ab114b4`


- [x] `spell.c` `spelleffects` SPE_LEVITATION peffects (named from D-1408). Not RESTORE_ABILITY. **Addressed:** D-1419 `89f05e45`

## 2026-08-22

- [x] `spell.c` `spelleffects` SPE_DETECT_MONSTERS peffects (named from D-1408). Not LEVITATION. **Addressed:** D-1418 `e611ef84`


- [x] `spell.c` `spelleffects` SPE_DETECT_TREASURE peffects (named from D-1408). Not DETECT_MONSTERS. **Addressed:** D-1417 `e78d7780`


- [x] `zap.c` `backfire` (named). Not zapyourself. **Addressed:** D-1416 `22e87b3b`


- [x] `uhitm.c` `mhitm_ad_phys` artifact_hit leftover (named from D-1403). Not rustm. **Addressed:** D-1415 `081c5c6a`


- [x] `zap.c` `bhitm` WAN_MAKE_INVISIBLE (named from D-1369). Not zapyourself speed. **Addressed:** D-1414 `f968904d`


- [x] `potion.c` `peffect_enlightenment` (named from D-1395). Not full healing. **Addressed:** D-1413 `285218b2`


- [x] `zap.c` `zapnodir` SPE_DETECT_UNSEEN (named from D-1404). Not stasis. **Addressed:** D-1412 `fb872749`


- [x] `potion.c` `peffect_full_healing` (named). Not haste. **Addressed:** D-1411 `71ee9186`


- [x] `zap.c` `zapyourself` WAN_SPEED_MONSTER (named from D-1369). Not make invisible. **Addressed:** D-1410 `55259f2b`


- [x] `spell.c` `spell_backfire` (named). Not peffects. **Addressed:** D-1409 `fa039634`


- [x] `spell.c` `spelleffects` SPE_HASTE_SELF peffects (named). Not mapping. **Addressed:** D-1408 `5c71fc34`


- [x] `spell.c` `spelleffects` SPE_MAGIC_MAPPING seffects (named). Not create monster. **Addressed:** D-1407 `6ec1c72d`


- [x] `mhitm.c` `mhitm_ad_wrap` brush (named from D-1348). Not uhitm wrap. **Addressed:** D-1406 `61936a70`


- [x] `uhitm.c` `mhitm_ad_fire` leftover (named from D-1385). Not STUN. **Addressed:** D-1405 `7c3921f2`

## 2026-08-21

- [x] `zap.c` `zapnodir` WAN_STASIS (named from D-1380). Not enlightenment. **Addressed:** D-1404 `cc7284d4`


- [x] `uhitm.c` `mhitm_ad_phys` AT_KICK thick_skinned (named). Not mwep. **Addressed:** D-1403 `d9134735`


- [x] `uhitm.c` `mhitm_ad_phys` mwep dmgval (named). Not shade_miss. **Addressed:** D-1402 `2a3da9b9`


- [x] `spell.c` `spelleffects` SPE_CREATE_MONSTER seffects (named). Not chain. **Addressed:** D-1401 `88587b68`


- [x] `spell.c` `spelleffects` SPE_CHAIN_LIGHTNING (named). Not cure. **Addressed:** D-1400 `dce9ac86`


- [x] `spell.c` `spelleffects` SPE_CURE_BLINDNESS (named). Not sickness. **Addressed:** D-1399 `64d4d089`


- [x] `spell.c` `spelleffects` SPE_CURE_SICKNESS (named). Not jumping. **Addressed:** D-1398 `a938a5b9`


- [x] `spell.c` `spelleffects` SPE_JUMPING (named). Not clairvoyance. **Addressed:** D-1397 `f5e00af7`


- [x] `mhitm.c` `mdamagem` AD_STUN leftover (named from D-1352). Not CONF. **Addressed:** D-1396 `66018a5a`


- [x] `zap.c` `zapnodir` WAN_ENLIGHTENMENT (named from D-1380). Not stasis. **Addressed:** D-1395 `05f8c1a1`


- [x] `uhitm.c` `mhitm_ad_phys` shade_miss (named from D-1341). Not hmon. **Addressed:** D-1394 `91827af6`


- [x] `zap.c` `bhit` WEB stick (named from D-1383). Not M_AP_OBJECT. **Addressed:** D-1393 `7863ae2a`


- [x] `zap.c` `bhit` M_AP_OBJECT skip (named from D-1383). Not WEB. **Addressed:** D-1392 `adfd4533`


- [x] `spell.c` `spelleffects` SPE_CLAIRVOYANCE (named). Not protection. **Addressed:** D-1391 `a4923869`


- [x] `spell.c` `cast_protection` SPE_PROTECTION (named). Not familiar. **Addressed:** D-1390 `b5b5eb34`


- [x] `spell.c` `spelleffects` SPE_CREATE_FAMILIAR (named). Not force bolt. **Addressed:** D-1389 `5e8d1fbd`


- [x] `spell.c` `spelleffects` SPE_FORCE_BOLT (named). Not fireball. **Addressed:** D-1388 `c6af8407`


- [x] `spell.c` unskilled SPE_FIREBALL/CONE `getdir` cancel must leave previous `u.dx/u.dy/u.dz` like C `getdir((char*)0)` (`cmd.c` `:4095–4111`); `getdir_spell` zeros then always self-zaps. Use live `lock.js` `getdir` or stop zeroing. Do not add trailing `confdir` to shared `getdir`. Source: reviews/loop-unattended/346-1f94d5e3-unskilled-fireball-weffects.md. **Addressed:** D-1387 `c3d768d1`


- [x] `spell.c` unskilled SPE_FIREBALL/CONE FALLTHROUGH weffects (named from D-1378). Not skilled scatter. **Addressed:** D-1386 `1f94d5e3`


- [x] `mhitm.c` `mdamagem` AD_CONF leftover (named from D-1352). Not STON. **Addressed:** D-1385 `5be02746`


- [x] `uhitm.c` `hmon` `shade_miss` caller (named from D-1354). Not zap. **Addressed:** D-1384 `ec703f48`


- [x] `zap.c` `shade_miss` caller (named from D-1354). Not mthrowu. **Addressed:** D-1383 `970c6097`


- [x] `mthrowu.c` `shade_miss` caller (named from D-1354). Not uhitm hmon. **Addressed:** D-1382 `6077050a`


- [x] `uhitm.c` `do_attack` leprechaun evade (named from D-1373). Not wipe. **Addressed:** D-1381 `e0594454`


- [x] `zap.c` `zapnodir` WAN_WISHING (named). Not create. **Addressed:** D-1380 `ef8a60b0`


- [x] `zap.c` `zapnodir` WAN_CREATE_MONSTER (named). Not light. **Addressed:** D-1379 `ad7b89c7`


- [x] `spell.c` skilled SPE_FIREBALL scatter (named from D-1365). Not zapyourself explode. **Addressed:** D-1378 `12953730`


- [x] `artifact.c` `invoke_blinding_ray` (named from D-1366). Not camera. **Addressed:** D-1377 `e785f5bb`


- [x] `muse.c` MUSE_CAMERA `lightdamage` (named from D-1366). Not zapnodir. **Addressed:** D-1376 `61c15769`


- [x] `dig.c` `u_wipe_engr` caller (named from D-1360). Not dothrow. **Addressed:** D-1375 `8a2a32bd`


- [x] `dothrow.c` `u_wipe_engr` caller (named from D-1360). Not uhitm. **Addressed:** D-1374 `08007958`


- [x] `uhitm.c` `u_wipe_engr` attacker caller (named from D-1360). Not allmain. **Addressed:** D-1373 `d5614c8a`


- [x] `allmain.c` `u_wipe_engr` DEX timeout caller (named from D-1360). Not dokick. **Addressed:** D-1372 `b3fe3015`


- [x] zap.js maybe_destroy_item AD_ELEC Shock_resistance() must use youprop.h uprops[SHOCK_RES] (invent hero_Shock_resistance / D-1089), not zap.js sticky-only clone — worn ring of shock resistance still takes exploding-wand rnd(10) HP instead of "You aren't hurt!". Same helper already gates WAN_LIGHTNING. Do not rewrite confer_oc_oprop. Source: reviews/loop-unattended/328-9df30ee3-maybe-destroy-item-elec.md **Addressed:** D-1371 `211485a0`


- [x] `dokick.c` kick_ouch/kick_dumb airlevel/Levitation `hurtle` (named from D-1361). Not no_kick. **Addressed:** D-1370 `90eca343`


- [x] `zap.c` `zapyourself` WAN_MAKE_INVISIBLE (named). Not lightning. **Addressed:** D-1369 `46c4e1b0`


- [x] `zap.c` `maybe_destroy_item` AD_ELEC (named). Not zapyourself lightning. **Addressed:** D-1368 `9df30ee3`


- [x] zap.c zapyourself WAN/SPE_MAGIC_MISSILE Antimagic() must use youprop.h uprops[ANTIMAGIC] (D-1089 / invent hero_Antimagic), not zap.js sticky-only clone — cloak-of-MR / gray DSM still take d(4,6). Source: reviews/loop-unattended/324-17a0937c-zapyourself-magic-missile.md **Addressed:** D-1367 `463e151d`


- [x] `zap.c` `lightdamage` (named; WAN_LIGHT/camera). Not flashburn lightning. **Addressed:** D-1366 `9a144895`


- [x] `zap.c` `zapyourself` SPE_FIREBALL (named). Not lightning. **Addressed:** D-1365 `d8f4fba6`


- [x] `zap.c` `zapyourself` WAN_MAGIC_MISSILE (named). Not WAN_LIGHTNING. **Addressed:** D-1364 `17a0937c`


- [x] `dokick.c` `obj_delivery` stolen_booty / `mksobj_migr_to_species` (named from D-1177). **Addressed:** D-1363 `c10f4246`


- [x] `dokick.c` no_kick poly/steed/lizard/uinwater/boulder (named from D-0786). Not Wounded_legs. **Addressed:** D-1362 `a979a9ac`


- [x] `dokick.c` kick_ouch drawbridge `find_drawbridge` remap (named from D-1343). **Addressed:** D-1361 `a895ac7e`


- [x] `dokick.c` `u_wipe_engr` caller (C `:1384`; body D-1051). Not knockback. **Addressed:** D-1360 `bdf4c27e`


- [x] `fountain.c` `drinkfountain` fate<10 `uhunger += rnd(10)` + `newuhs(FALSE)` (C `:279–282`; "don't choke on water"). Not eat.c lesshungry. Source: reviews/loop-unattended/318-6fd45ec4-lesshungry-bite-choke.md **Addressed:** D-1359 `0ff8d15e`


- [x] `dokick.c` `wake_nearby` caller (C `:1383` after maybe_kick; callee live). Not knockback. **Addressed:** D-1358 `fbfc72d9`


- [x] `objnam.c` `the()` CapitalMon (named from D-1335). Not warn_obj. **Addressed:** D-1357 `0be5135b`


- [x] `eat.c` lesshungry/bite choke callers (named from D-1344). Not zap. **Addressed:** D-1356 `6fd45ec4`


- [x] `zap.c` `zapyourself` WAN_LIGHTNING (named). Not killer_xname. **Addressed:** D-1355 `0be6d98e`


- [x] `weapon.c` `dmgval` shade/`shade_glare` (named from D-1341). Not hitmm shade_miss. **Addressed:** D-1354 `6570ddba`


- [x] `zap.c` `ureflects` W_AMUL/W_ARM/dragon (named from D-1342). Not W_WEP. **Addressed:** D-1353 `03e578b1`


- [x] `mhitm.c` `mdamagem` AD_STON leftover (named from D-1338). Not shade_miss. **Addressed:** D-1352 `160de986`


- [x] `mhitm.c` hitmm silver sear (named from D-0887). Not shade_miss. **Addressed:** D-1351 `48f2f0a2`


- [x] `dokick.c` martial knockback (named from D-1332). Not abuse_dog. **Addressed:** D-1350 `d3f2a9e5`


- [x] `dokick.c` `abuse_dog` (named from D-1332). Not kickstr. **Addressed:** D-1349 `533e732f`


- [x] `uhitm.c` `m_slips_free` AD_WRAP (uhitm you-as-agr; named from D-1331). Not mhitu wrap. **Addressed:** D-1348 `dde5f91b`


- [x] `objnam.c` warn_obj glow (named from D-1322). Not killer_xname. **Addressed:** D-1347 `1651816e`


- [x] `dothrow.c` throwit `losehp` `killer_xname` (C `:1747`). Not zap. **Addressed:** D-1346 `15b20ab4`


- [x] `zap.c` zapyourself `killer_xname` (remaining). Not eat choke. **Addressed:** D-1345 `2a5e72e0`


- [x] `eat.c` choke `killer_xname` (remaining caller). Not dokick kickobjnam. **Addressed:** D-1344 `5195acee`


- [x] `dokick.c` `kickstr` (named; kick_ouch still raw kickobjnam). Not maybe_mnexto. **Addressed:** D-1343 `946d719d`


- [x] `artifact.c` `arti_reflects` W_WEP (named from D-1328). Not gazemu. **Addressed:** D-1342 `34de9f33`


- [x] `mhitm.c` hitmm `shade_miss` (named from D-0887). Not AT_HUGS. **Addressed:** D-1341 `e3a30202`


- [x] `mhitm.c` AT_HUGS (named from D-1327). Not explmm. **Addressed:** D-1340 `85eee14d`


- [x] `mhitm.c` explmm (named from D-1326). Not gazemm. **Addressed:** D-1339 `fdb30435`


- [x] `mhitm.c` gazemm (named from D-1328). Not AD_WRAP. **Addressed:** D-1338 `2368dc58`


- [x] `apply.c` `splash_lit` (named from D-1242). Not snuff_candle. **Addressed:** D-1337 `2bd70a77`


- [x] `dokick.c` `maybe_mnexto` evade (named from D-1310). Not kickstr. **Addressed:** D-1336 `a7ac5e52`


- [x] `dokick.c` `killer_xname` (kickobjnam still xname). Not special_dmgval. **Addressed:** D-1335 `31d32cad`


- [x] `mthrowu.c` `snuff_candle` (C `:942` notcaught land). Not throwit land. **Addressed:** D-1334 `487daa2f`


- [x] `dothrow.c` throwit land `snuff_candle` (C `:1818`). Not mthrowu. **Addressed:** D-1333 `b82375a7`


- [x] `dokick.c` kickdmg `special_dmgval` (named from D-1310). Not snuff_candle. **Addressed:** D-1332 `e430e099`


- [x] `mhitu.c` `u_slip_free` AD_WRAP (named from D-1307). Not AD_DRIN. **Addressed:** D-1331 `ea5df558`


- [x] `mhitm.c` AD_DRIN (named from D-1307). Not mhitu AD_DRIN. **Addressed:** D-1330 `cfc95500`


- [x] `mhitu.c` AD_DRIN (named from D-1309). Not gazemu. **Addressed:** D-1329 `a7a5a835`


- [x] `mhitu.c` gazemu (named from D-1314). Not explmu. **Addressed:** D-1328 `b21765a2`

## 2026-08-20

- [x] `mhitu.c` AT_HUGS (named). Not explmu. **Addressed:** D-1327 `2c9dff6a`


- [x] `mhitu.c` explmu (named). Not AT_HUGS. **Addressed:** D-1326 `9570f32a`


- [x] `dokick.c` snuff_candle (named from D-1242). Not throwit_mon_hit. **Addressed:** D-1325 `2cdf2b1f`


- [x] `dothrow.c` thitmonst vanish pline (named from D-1312). Not leader catch. **Addressed:** D-1324 `1d5b0b66`


- [x] `zap.c` bhit THROWN_TETHERED_WEAPON / isqrt (named from D-1311). Not throwit tether. **Addressed:** D-1323 `b50daaea`


- [x] `objnam.c` doname W_WEP `!mrg_to_wielded` + AKLYS `"tethered to"` (C `:1561–1595`; this SHA rewrote the if). Source: reviews/loop-unattended/283-b7a0c3c7-doname-wep-body-part.md. Not warn_obj. **Addressed:** D-1322 `843343cc`


- [x] `objnam.c` doname W_WEP `body_part(HAND)` poly (named from D-1295). Not MEAT_RING. **Addressed:** D-1321 `b7a0c3c7`


- [x] `objnam.c` doname POTION POT_OIL (lit) (named from D-1308). Not candle. **Addressed:** D-1320 `cf309315`


- [x] `objnam.c` doname LEASH attached (named from D-1308). Not candle. **Addressed:** D-1319 `cd867647`


- [x] `objnam.c` doname TOOL W_TOOL|W_SADDLE worn (named from D-1308). Not candle. **Addressed:** D-1318 `ccdc8670`


- [x] `objnam.c` doname CANDELABRUM (n of 7) (named from D-1308). Not candle. **Addressed:** D-1317 `9b1b4ba4`


- [x] `dothrow.c` throwit ACURRSTR urange (named). Not tether. **Addressed:** D-1316 `75c08164`


- [x] `dothrow.c` throwit must call `throwit_mon_hit` (not `thitmonst`) after bhit/swallow so `snuff_candle` and shk `hot_pursuit` fire. Source: reviews/loop-unattended/275-27751021-throwit-mon-hit-snuff.md **Addressed:** D-1315 `44a786aa`


- [x] `mon.c` m_respond (named from D-1301). Not snuff_candle. **Addressed:** D-1314 `a1d48196`


- [x] `dothrow.c` throwit_mon_hit snuff_candle / hot_pursuit (named from D-1301). Not m_respond. **Addressed:** D-1313 `27751021`


- [x] `dothrow.c` thitmonst leader catch / finish_quest (named). Not vanish pline. **Addressed:** D-1312 `77606a78`


- [x] `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK (named from D-1303). Not leader catch. **Addressed:** D-1311 `3633eb61`


- [x] `dokick.c` poly AT_KICK loop (named). Not hmonas pit kick. **Addressed:** D-1310 `734449dc`


- [x] `mhitu.c` AT_TENT melee (named from D-1261). Not mswings. **Addressed:** D-1309 `07ac10e0`


- [x] `objnam.c` candle `partly used` (named from D-1295). Not MEAT_RING. **Addressed:** D-1308 `2b9c2c6a`


- [x] `uhitm.c` mhitm_ad_drin helmet / m_slips_free (named from D-1298). Not eat_brains. **Addressed:** D-1307 `b97b1fc6`


- [x] `eat.c` eat_brains (named from D-1298). Not helmet. **Addressed:** D-1306 `49dab44b`


- [x] `mhitu.c` mswings `pline_mon` (named from D-1291). Not wildmiss. **Addressed:** D-1305 `b82b15a8`


- [x] `objnam.c` wizterrainwish secret corridor (named from D-1290). Not door/wall. **Addressed:** D-1304 `909ef3dc`


- [x] `dothrow.c` sho_obj_return_to_u (named from D-1282). Not boomhit. **Addressed:** D-1303 `2b1a575c`


- [x] `dothrow.c` throw_gold swallow (named from D-1283). Not boomhit. **Addressed:** D-1302 `1a7839f7`


- [x] `dothrow.c` boomhit (named from D-1282). Not steed. **Addressed:** D-1301 `18fa6c89`


- [x] `trap.c` maketrap shop add_damage (named from D-1280). Not DRAWBRIDGE_UP ice. **Addressed:** D-1300 `376a5a0d`


- [x] `hack.c` swap-with-pet `seemimic` (named from D-1275). Not display_self. **Addressed:** D-1299 `eca3330c`


- [x] `uhitm.c` skipdrin / pit kick (named from D-1266). Not altwep. **Addressed:** D-1298 `086eb03d`


- [x] `dothrow.c` throwit steed potion (named from D-1283). Not slip. **Addressed:** D-1297 `6dfb7d2c`


- [x] `trap.c` maketrap DRAWBRIDGE_UP ice (named from D-1280). Not shop add_damage. **Addressed:** D-1296 `993e17ea`


- [x] `objnam.c` doname MEAT_RING (named from D-1276). Not candle. **Addressed:** D-1295 `dd02dc1b`


- [x] `hack.c` moverock next_boulder (named from D-1281). Not Blind feel. **Addressed:** D-1294 `c37bd683`


- [x] `dothrow.c` throwit stamina (named from D-1283). Not slip. **Addressed:** D-1293 `31e55930`


- [x] `dothrow.c` throwit slip (named from D-1283). Not stamina. **Addressed:** D-1292 `2e893032`


- [x] `mhitu.c` wildmiss `set_msg_xy` then `pline` (named from D-1286 / D-1261). Not `pline_mon`. Not missmu. **Addressed:** D-1291 `c6fa1420`


- [x] `objnam.c` wizterrainwish door/wall (named from D-1279). Not traps. **Addressed:** D-1290 `67c863ad`


- [x] `objnam.c` wizterrainwish traps (named from D-1279). Not door/wall. **Addressed:** D-1289 `44b22432`


- [x] `cmd.c` wiz-level `u_on_rndspot` (named from D-1278). Not sstairs. **Addressed:** D-1288 `b741fb93`


- [x] `stairs.c` `u_on_sstairs` → `u_on_rndspot` (named from D-1278). Not cmd wiz. **Addressed:** D-1287 `04b325fd`


- [x] `mhitu.c` `missmu` `pline_mon` (named from D-1261). Not wildmiss. **Addressed:** D-1286 `9486280d`


- [x] `mon.c` `meatcorpse` (named from D-1271). Not meatobj. **Addressed:** D-1285 `965d2beb`


- [x] `mon.c` `meatobj` (named from D-1271). Not meatcorpse. **Addressed:** D-1284 `433ad843`


- [x] `dothrow.c` throwit swallowit (named from D-1274). Not returning_missile. **Addressed:** D-1283 `5b4788e1`


- [x] `dothrow.c` throwit returning_missile (named from D-1274). Not swallowit. **Addressed:** D-1282 `7d61ee8b`


- [x] `hack.c` Blind unseen boulder feel (named from D-1262). Not next_boulder. **Addressed:** D-1281 `7a783c86`


- [x] `trap.c` `maketrap` PIT/HOLE `set_levltyp` (named from D-1269). Not liquid_flow. **Addressed:** D-1280 `5f8a620a`


- [x] `objnam.c` wish `switch_terrain` (named from D-1129). Not doname EGG. **Addressed:** D-1279 `12d815ca`


- [x] `dungeon.c` `u_on_rndspot` `switch_terrain` (named from D-1129). Not dothrow hurtle. **Addressed:** D-1278 `851d3e08`


- [x] `dothrow.c` `hurtle_step` `switch_terrain` (named from D-1129). Not u_on_rndspot. **Addressed:** D-1277 `20c69ccf`


- [x] `objnam.c` doname EGG (named from D-1255). Not MEAT_RING. **Addressed:** D-1276 `2860794e`


- [x] `display.c` `display_self` U_AP_TYPE glyphs (named from D-1260). Not seemimic. **Addressed:** D-1275 `18bec04d`


- [x] `dothrow.c` `toss_up` (named from D-1263). Not hold_another_object. **Addressed:** D-1274 `b166de10`


- [x] `pickup.c` highdrop `hitfloor` (named from D-1263). Not toss_up. **Addressed:** D-1273 `2a6bf680`


- [x] `invent.c` `hold_another_object` `hitfloor(FALSE)` (named from D-1263). Not pickup highdrop. **Addressed:** D-1272 `175707ca`


- [x] `monmove.c` `meatmetal` (named from D-1247). Not switch_terrain. **Addressed:** D-1271 `3925f2b3`


- [x] `hack.c` hero `test_move` `passes_bars` (named from D-1258). Not ALLOW_BARS. **Addressed:** D-1270 `a4aa34d3`


- [x] `dig.c` `digactualhole` `switch_terrain` (named from D-1129). Not dissolve_bars. **Addressed:** D-1269 `76f7018d`


- [x] `hack.c` `spoteffects` `switch_terrain` (named from D-1129). Not dissolve_bars. **Addressed:** D-1268 `26fb4aa0`


- [x] `hack.c` `set_uinwater` `switch_terrain` (named from D-1129). Not dissolve_bars. **Addressed:** D-1267 `f7676db6`


- [x] `uhitm.c` altwep / `uswapwep` (named from D-1252). Not AT_ENGL. **Addressed:** D-1266 `42d50a53`


- [x] `uhitm.c` fight_empty `explum` (named from D-1251). Not AT_ENGL. **Addressed:** D-1265 `9859426c`


- [x] `uhitm.c` AT_ENGL `gulpum` (named from D-1251). Not fight_empty. **Addressed:** D-1264 `d86fe2fe`


- [x] `do.c` hitfloor `dropz(TRUE)` (named from D-1249). Not container_impact. **Addressed:** D-1263 `6a950d81`

## 2026-08-19

- [x] `hack.c` nopick `m<dir>` over/against (named from D-1253). Not giant pickup. **Addressed:** D-1262 `72757d4c`


- [x] `mhitu.c` `hitmsg` (named from D-1240). Not remaining uhitm `pline_mon`. **Addressed:** D-1261 `8e2808ad`


- [x] `hack.c` mimic unhide (named from D-1245). Not hideunder. **Addressed:** D-1260 `8729fa24`


- [x] `hack.c` `switch_terrain` from `dissolve_bars` (named from D-1247). Not ALLOW_BARS. **Addressed:** D-1259 `78707282`


- [x] `monmove.c` ALLOW_BARS rust/corr/metallivore (named from D-1247). Not gelcube. **Addressed:** D-1258 `c63ac778`


- [x] `monmove.c` `gelcube_digests` (named from D-1246). Not `mon_yells`. **Addressed:** D-1257 `466adf3e`


- [x] `trap.c` landmine·pit mid-roll (named from D-1237). Not rolling-boulder TELEP. **Addressed:** D-1256 `03e8b10c`


- [x] `objnam.c` glob / doname CXN_ARTICLE|CXN_NOCORPSE (named from D-1234). Not unique/pname adjective. **Addressed:** D-1255 `25a81ff1`


- [x] `weapon.c` `special_dmgval` `mon_hates_silver` must match C `mondata.c` `hates_silver` (shade, S_VAMPIRE, imp except tengu, were, demon) + `is_vampshifter`, not the local M2_WERE|M2_DEMON clone. Source: reviews/loop-unattended/212-87b4705a-hmonas-at-hugs.md **Addressed:** D-1254 `fd5ebd92`


- [x] `hack.c` giant pickup/maneuver (named from D-1239). Not cannot_push. **Addressed:** D-1253 `d384e339`


- [x] `makemon.c` `demonpet` spawn (named from D-1233). Not AT_EXPL. **Addressed:** D-1252 `f7714f94`


- [x] `uhitm.c` AT_EXPL (named from D-1233). Not AT_HUGS. **Addressed:** D-1251 `e097a5df`


- [x] `uhitm.c` AT_HUGS (named from D-1233). Not remaining `pline_mon`. **Addressed:** D-1250 `87b4705a`


- [x] `hack.c` `container_impact_dmg` (named from D-1229). Not hideunder. **Addressed:** D-1249 `7f54b762`


- [x] `monmove.c` `mon_yells` (named). Not iron bars. **Addressed:** D-1248 `6e18c402`


- [x] `monmove.c` postmov iron bars (named). Not bee_eat. **Addressed:** D-1247 `4dfec66a`


- [x] `monmove.c` `bee_eat_jelly` (named). Not mind_blast. **Addressed:** D-1246 `2cce0dc8`

## 2026-08-18

- [x] `hack.c` hideunder after impact (named from D-1229). Not container_impact. **Addressed:** D-1245 `6115dc58`


- [x] `mhitm.c` gulpmm AD_DGST eat (named). Not passivemm. **Addressed:** D-1244 `293059d0`


- [x] `mhitm.c` gulpmm `!goodpos` return-home (named). Not snuff_lit. **Addressed:** D-1243 `729b03dc`


- [x] `mhitm.c` gulpmm `snuff_lit` minvent (named). Not `m_at` swap. **Addressed:** D-1242 `509b1355`


- [x] `mhitm.c` `passivemm` AD_RBRE shock `monkilled` (named). Not troll_baned. **Addressed:** D-1241 `9b5bd39d`


- [x] `uhitm.c` remaining `pline_mon` (named). Not troll_baned. **Addressed:** D-1240 `d8f28958`


- [x] `hack.c` cannot_push squeeze (named from D-1226). Not run>=2 boulder. **Addressed:** D-1239 `51a337e7`


- [x] `monmove.c` `mind_blast` (named). Not msg_mon_movement. **Addressed:** D-1238 `6d2735b0`


- [x] `teleport.c` rolling-boulder TELEP `pline_xy` (named). Not `#teleport`. **Addressed:** D-1237 `d81367e2`


- [x] `options.c` `optlist` `&a11y.mon_movement` (named). Not spot_monsters. **Addressed:** D-1236 `5c860b0e`


- [x] `options.c` `optlist` `&a11y.spot_monsters` (named). Not glyph_updates. **Addressed:** D-1235 `f631610d`


- [x] `do.c` `revive_corpse` unique/pname `corpse_xname` adjective (named). Not Soundeffect. **Addressed:** D-1234 `e0ea385e`


- [x] `uhitm.c` `hmonas` `troll_baned` `mkcorpstat_norevive` (named). Not hmon_hitmon. **Addressed:** D-1233 `976094e5`


- [x] `uhitm.c` `hmon_hitmon` `troll_baned` around `killed` (named). Not hmonas. **Addressed:** D-1232 `83624a46`


- [x] `mhitm.c` gulpmm `m_at` swap (named). Not passivemm. **Addressed:** D-1231 `5cd4ab5c`


- [x] `teleport.c` `#teleport` `doextcmd` (named from D-1209). Not energy-spellcast. **Addressed:** D-1230 `a3c04dd7`


- [x] `hack.c` `impact_disturbs_zombies` (named from D-1214). Not hideunder. **Addressed:** D-1229 `0ddfb189`


- [x] `hack.c` `msg_mon_movement` (named). Not pline_mon. **Addressed:** D-1228 `23f3f19e`


- [x] remaining `pline.c` `pline_mon` callers (named). Not msg_mon_movement. **Addressed:** D-1227 `1da251ee`


- [x] `hack.c` run>=2 boulder `pline_dir` (named). Not mention_walls. **Addressed:** D-1226 `7998cb1e`


- [x] `spell.c` energy/`spelleffects` teleport (named from D-1209). Not `#teleport` doextcmd. **Addressed:** D-1225 `89588300`


- [x] `teleport.c` LEVEL_TELEP `y_n` (named from D-1209). Not energy-spellcast. **Addressed:** D-1224 `790ca8b7`


- [x] `mhitm.c` `troll_baned` `mkcorpstat_norevive` (named). Not gulpmm. **Addressed:** D-1223 `d4f9b432`


- [x] `do.c` `revive_corpse` `Soundeffect` se_scratching (named). Not BURIED pit. **Addressed:** D-1222 `7b0f9da7`


- [x] `display.c` `show_glyph` / JS `gbuf_show_kind`: do not re-call `mon_glyph`/`obj_glyph` (Hallu `rn2_on_display_rng`) on every `show_glyph_cell`. C classifies the already-chosen glyph. Keep mention_map addr. seed0383. Source: reviews/loop-unattended/181-925e5b77-show-glyph-glyph-updates.md **Addressed:** D-1221 `c7071a4a`


- [x] `do.c` `revive_corpse` BURIED `!is_zomb` FALLTHROUGH `impossible` (named). Not Soundeffect. **Addressed:** D-1220 `b09b013d`


- [x] `display.c` `show_glyph_change` glyph_updates (named). Not opt_accessiblemsg. **Addressed:** D-1219 `925e5b77`


- [x] `options.c` `opt_accessiblemsg` wire `a11y.accessiblemsg` (named). Not dolookaround. **Addressed:** D-1218 `b59f294b`


- [x] `cmd.c` `dolookaround` (named). Not glyph_updates. **Addressed:** D-1217 `dc34d705`


- [x] `pline.c` `set_msg_dir` (named). Not pline_xy. **Addressed:** D-1216 `517cb217`


- [x] `pline.c` `pline_xy`/`pline_mon` (named). Not set_msg_dir. **Addressed:** D-1215 `eaf10f2d`


- [x] `hack.c` `disturb_buried_zombies` (named). Not zombify_mon. **Addressed:** D-1214 `b44c4847`


- [x] `dig.c` `rot_corpse` invent/minvent worn plines (named). Not REVIVE. **Addressed:** D-1213 `c85424f4`


- [x] `do.c` `revive_corpse` OBJ_MINVENT / OBJ_CONTAINED (named). Not BURIED. **Addressed:** D-1212 `fc314871`


- [x] `mhitm.c` `gz.zombify` at monkilled (named). Not make_corpse. **Addressed:** D-1211 `481e005b`


- [x] `mon.c` `zombie_maker` + `gz.zombify` at `make_corpse` (named). Not mhitm. **Addressed:** D-1210 `f1a3518a`


- [x] `teleport.c` `dotelecmd` m-prefix mode menu (named). Not energy gate. **Addressed:** D-1209 `b3c0d228`


- [x] `teleport.c` `dotele` trap-at-feet teledest (named). Not vault_tele. **Addressed:** D-1208 `bd8c2161`


- [x] `pline.c` `vpline` accessiblemsg consume (named). Not set_msg_xy. **Addressed:** D-1207 `08d2e6b0`


- [x] `teleport.c` `scrolltele` steed whobuf (named). Not unconscious. **Addressed:** D-1206 `319bf51c`


- [x] `teleport.c` `scrolltele` unconscious (named). Not Override yn. **Addressed:** D-1205 `f389c2b4`


- [x] `eat.c` `eatspecial` (named). Not doeat_nonfood. **Addressed:** D-1204 `dbd3a08b`


- [x] `cmd.c` `wiz_level_change` (named). Not notice_mon_off. **Addressed:** D-1203 `a16884ab`


- [x] `timeout.c` REVIVE/ZOMBIFY (named). Not run_timers. **Addressed:** D-1202 `dfed1743`


- [x] `artifact.c` `init_artifacts` (named). Not wizkit. **Addressed:** D-1201 `4ffc2264`


- [x] `allmain.c` `newgame` `notice_mon_off` (named). Not wizkit. **Addressed:** D-1200 `15cb4a37`


- [x] `dog.c` `mon_arrive` `my=xyflags` before rloc (named). Not migrate bit. **Addressed:** D-1199 `4dc76022`


- [x] `dog.c` `migrate_to_level` `In_W_tower` xyflags bit 2 (named). Not mon_arrive. **Addressed:** D-1198 `2f8f7d9f`


- [x] `teleport.c` `scrolltele` W-tower Override yn (named). Not make_blinded. **Addressed:** D-1197 `7deb2670`

## 2026-08-17

- [x] `teleport.c` `rloc_to_core` `set_msg_xy` (named). Not makeknown. **Addressed:** D-1196 `d0cbc6e3`


- [x] `teleport.c` `rloc_to_core` wand `makeknown` (named). Not ustuck-together. **Addressed:** D-1195 `143f9a46`


- [x] `do.c` `goto_level` `notice_mon_off` (named). Not docrt. **Addressed:** D-1194 `c4c57ac1`


- [x] `dokick.c` `deliver_obj_to_mon` (named). Not obj_delivery. **Addressed:** D-1193 `2d2e68c7`


- [x] `allmain.c` `newgame` wizkit `obj_delivery(FALSE)` (named). Not goto_level. **Addressed:** D-1192 `cf9eb066`


- [x] `do.c` `goto_level` `run_timers` (named). Not kill_genocided. **Addressed:** D-1191 `cc7d0ef5`


- [x] `do.c` `goto_level` `kill_genocided_monsters` (named). Not run_timers. **Addressed:** D-1190 `9a2cbc27`


- [x] Human canary seed8243: `cmd.c` rhack `Unknown command` `visctrl(key)` so Ctrl-C is `^C` not raw ETX. Not maybe_smudge_engr. Not kill_genocided. **Addressed:** D-1189 `15dddffe`


- [x] Human canary seed8243: `teleport.c` `domagicportal` `"You activated a magic portal!"` / tutorial ATSTAIRS stunmsg. Not maybe_smudge_engr. Not kill_genocided. **Addressed:** D-1188 `c58efd08`


- [x] Human canary seed8243: `hack.c` `avoid_trap_andor_region` ParanoidTrap `"Really step into that magic portal?"` yn. Not maybe_smudge_engr. Not kill_genocided. **Addressed:** D-1187 `77ead396`


- [x] Human canary seed8243: `cmd.c` `g` rush prefix (until something interesting) vs JS Unknown command. Not maybe_smudge_engr. Not offx. **Addressed:** D-1186 `4dd396cc`


- [x] Human canary (no review stamp): `private-sessions/seed8243-samurai-tutorial.session.json`. Chargen `\e[72C` was truncated capture; local C H2344 `\e[40C` already matched JS (do not revert D-0078). First real miss: `do_wear.c` `doddoremarm` `A` empty-worn. **Addressed:** D-1185 `4750946a`


- [x] `teleport.c` `scrolltele` make_blinded (named). Not W-tower amulet. **Addressed:** D-1184 `1b94d8d3`


- [x] `teleport.c` `rloc_to_core` ustuck-together pline (named). Not telemsg. **Addressed:** D-1183 `d2512b22`


- [x] `teleport.c` `rloc_pos_ok` mx==0 updest/dndest (named). Not room lock. **Addressed:** D-1182 `01c8c41f`


- [x] `teleport.c` `rloc` `RLOC_ERR` impossible() (named). Not vanish-msg. **Addressed:** D-1181 `0b488053`


- [x] `teleport.c` `rloc_to_core` telemsg vanishes-and-reappears (named). Not RLOC_ERR. **Addressed:** D-1180 `665bbe09`


- [x] `do.c` `goto_level` `do_fall_dmg` (named). Not fix_shop_damage. **Addressed:** D-1179 `5f08f9e5`


- [x] `do.c` `goto_level` `fix_shop_damage` (named). Not obj_delivery. **Addressed:** D-1178 `4a700d08`


- [x] `do.c` `goto_level` `obj_delivery` (named). Not in_out_region. **Addressed:** D-1177 `36e0ce72`


- [x] `dothrow.c` `mhurtle_step` `m_in_out_region` (named). Not hurtle_step. **Addressed:** D-1176 `b652fbf3`


- [x] `allmain.c` `m_everyturn_effect` youmonst (named). Not m_postmove_effect. **Addressed:** D-1175 `7188da5b`


- [x] `mhitm.c` `mdisplacem` `update_monster_region` (named). Not rloc_to. **Addressed:** D-1174 `e5ec6685`


- [x] `mon.c` `mnexto` `control_mon_tele` (named). Not rloc. **Addressed:** D-1173 `e07eeae7`


- [x] `teleport.c` `rloc` steed `tele()` (named). Not Wizard stair. **Addressed:** D-1172 `e7c5c8ac`


- [x] `teleport.c` `rloc_pos_ok` isshk/ispriest room lock (named). Not make_angry_shk. **Addressed:** D-1171 `822498d3`


- [x] `teleport.c` `rloc_to` occupation `dochugw` (named). Not mintrap. **Addressed:** D-1170 `5a6be1fe`


- [x] `region.c` `run_regions` `hero_inside` bit (named). Not walk caller. **Addressed:** D-1169 `0f1ce7c6`


- [x] `allmain.c` `moveloop` `fumaroles` (named). Not mklev. **Addressed:** D-1168 `0ff54fb4`


- [x] `hack.c` `m_postmove_effect` youmonst (named). Not in_out_region. **Addressed:** D-1167 `d6ba6ede`


- [x] `do.c` `goto_level` `in_out_region` (named). Not walk. **Addressed:** D-1166 `0cb3acbe`


- [x] `dothrow.c` `hurtle_step` `in_out_region` (named). Not walk. **Addressed:** D-1165 `6d44ab7f`


- [x] `teleport.c` `rloc_to` trapped `mintrap` (named). Not occupation. **Addressed:** D-1164 `6f7e188b`


- [x] `teleport.c` `rloc_to` minvent shop bill (named). Not shk-home. **Addressed:** D-1163 `d24ff150`


- [x] `teleport.c` `rloc_to` shk `make_angry_shk` (named). Not vanish-msg. **Addressed:** D-1162 `38353d8a`


- [x] `teleport.c` `rloc_to` `update_monster_region` (named). Not set_apparxy. **Addressed:** D-1161 `4dfadf3a`


- [x] `teleport.c` `rloc_to` `set_apparxy` (named). Not vanish-msg. **Addressed:** D-1160 `8efa62e9`


- [x] `mon.c` `m_poisongas_ok` mfndpos vamp/eel/breath (named). Not inside_f. **Addressed:** D-1159 `e42ace32`


- [x] `region.c` `create_gas_cloud_selection` (named). Not BFS create. **Addressed:** D-1158 `7cc347fc`


- [x] `hack.c` walk `in_out_region` (named). Not teleds. **Addressed:** D-1157 `ed28eef1`


- [x] `mklev.c` `fumaroles` `clear_heros_fault` / Norep whoosh (named). Not expire dissipation. **Addressed:** D-1156 `16e8d88b`


- [x] `region.c` `expire_gas_cloud` dissipation plines (named). Not inside_gas HP. **Addressed:** D-1155 `df99ab32`


- [x] `mkmaze.c` `inv_pos` / VIBRATING_SQUARE (named from invocation_pos). Not teleds. **Addressed:** D-1154 `10904562`


- [x] `teleport.c` `vault_tele` `tele()` fallback (named). Not teleds. **Addressed:** D-1153 `b332516f`


- [x] `teleport.c` `rloc_to` `maybe_unhide_at` (named). Not vanish-msg. **Addressed:** D-1152 `9b5ce7b3`


- [x] `hack.c` `classify_terrain` (named from switch_terrain). Not invocation. **Addressed:** D-1151 `6bdf4d49`


- [x] `hack.c` `domove` `invocation_message` (named). Not teleds. **Addressed:** D-1150 `505df513`


- [x] `mon.c` `mongone` `mdrop_special_objs` then discard (elemental_clog victim). Not worn extract. Source: reviews/loop-unattended/109-27274b3b-overcrowding.md **Addressed:** D-1149 `cdaccd3a`


- [x] `fountain.c` `gush` `deal_with_overcrowding` (named). Not lava xkilled. **Addressed:** D-1148 `27274b3b`


- [x] `do_name.c` `rndcolor` (named from hcolor). Not sit/apply identity stubs. **Addressed:** D-1147 `5c43dbc9`


- [x] `region.c` `inside_gas_cloud` damage (named). Not enveloped pline. **Addressed:** D-1146 `fe5cefad`


- [x] `fountain.c` Excalibur `:441` `update_inventory` (named). Not artidisco save. **Addressed:** D-1145 `623bc861`


- [x] `potion.c` `djinni_from_bottle` `mongrantswish` (named). Not bottle chance RNG. **Addressed:** D-1144 `1c1f7ccb`


- [x] `region.c` `in_out_region` enter_msg / leave_msg (named). Not update_player_regions. **Addressed:** D-1143 `bb8585ec`


- [x] `teleport.c` `teleds` `notice_mon_off` / `notice_all_mons` (named). Not invocation. **Addressed:** D-1142 `52194cc9`


- [x] `teleport.c` `teleds` `invocation_message` (named). Not vault_guard. **Addressed:** D-1141 `4d71520e`


- [x] `teleport.c` `teleds` `vault_guard` `uleftvault` (named). Not swallow docrt. **Addressed:** D-1140 `36fb8797`


- [x] `teleport.c` `teleds` swallow `docrt` (named). Not hideunder. **Addressed:** D-1139 `4071a74d`


- [x] `fountain.c` `gush` lava `fire_damage_chain` / `xkilled` (named). Not minliquid. **Addressed:** D-1138 `068e78df`


- [x] `region.c` `make_gas_cloud` enveloped pline (named). Not create_gas_cloud size-1. **Addressed:** D-1137 `50136436`


- [x] `fountain.c` `mongrantswish` `tmp_at` glyph hide (named). Not dowaterdemon makemon. **Addressed:** D-1136 `52aea3d1`


- [x] `do_name.c` `hcolor` Hallucination drinksink synonyms (named). Not hliquid. **Addressed:** D-1135 `b166bda5`


- [x] `fountain.c` `dipfountain` `update_inventory` after switch (named). Not Excalibur gift. **Addressed:** D-1134 `5f55ceba`


- [x] `teleport.c` `tele()` / trap teledest (named). Not tele_trap wrenching. **Addressed:** D-1133 `a956e990`


- [x] `teleport.c` `teleds` `buried_ball_to_punishment` (named). Not Punished ball. **Addressed:** D-1132 `a8d04dd2`


- [x] `teleport.c` `teleds` `hideunder` / mimic (named). Not swallow docrt. **Addressed:** D-1131 `00956ae8`


- [x] `teleport.c` `teleds` `update_player_regions` (named). Not teleok in_out_region. **Addressed:** D-1130 `6dd7a794`


- [x] `teleport.c` `teleds` `switch_terrain` (named). Not fill_pit. **Addressed:** D-1129 `410f22a2`


- [x] `potion.c` pool dip yn (named from dipsink). Not drinkfountain. **Addressed:** D-1128 `5b3923d7`


- [x] `eat.c` `vomit` cantvomit/Sick/acid poly arms (named from drinkfountain). Not dryup. **Addressed:** D-1127 `b4954c6f`


- [x] `fountain.c` `drinkfountain` case 24 `update_inventory` (named). Not enlightenment. **Addressed:** D-1126 `6497347e`


- [x] `fountain.c` `dowatersnakes` Hallucination `rndmonnam` (named). Not gush. **Addressed:** D-1125 `2fc408c0`

## 2026-08-16

- [x] `fountain.c` `drinksink` case 13 `create_gas_cloud` (named). Not polyself. **Addressed:** D-1124 `3b7606b3`


- [x] `teleport.c` `rloc_to` worm / ustuck-swallow `docrt` (named). Not newsym. **Addressed:** D-1123 `a55c4b24`


- [x] `teleport.c` `rloc` Wizard stair / `mon_telecontrol` (named). Not RLOC_MSG. **Addressed:** D-1122 `5a2f96ca`


- [x] `teleport.c` `teleds` `fill_pit` (named). Not Punished ball. **Addressed:** D-1121 `803a7f5c`


- [x] `teleport.c` `tele_trap` Antimagic wrenching pline (named). Not vault_tele. **Addressed:** D-1120 `acfb0167`


- [x] `teleport.c` `teleok` `tele_jump_ok` / `in_out_region` (named). Not vibrating. **Addressed:** D-1119 `26560ccf`


- [x] `fountain.c` `drinksink` case 10 `polyself` (named). Not dipsink. **Addressed:** D-1118 `8a01c200`


- [x] `fountain.c` `gush` `minliquid` body (named). Not dogushforth. **Addressed:** D-1117 `afb86487`


- [x] `fountain.c` `drinkfountain` enlightenment body (named). Not dryup. **Addressed:** D-1116 `19e4be31`


- [x] `fountain.c` `dipfountain` case 29 `mkgold` coins (named). Not wash_hands. **Addressed:** D-1115 `79438232`


- [x] `fountain.c` `dipfountain` cases 17–20 uncurse (named). Not Excalibur. **Addressed:** D-1114 `e30a51f2`


- [x] `fountain.c` `dipsink` (named). Not wash_hands. **Addressed:** D-1113 `c67f09d1`


- [x] `teleport.c` `mlevel_tele_trap` MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP arms (named). Not hole path. **Addressed:** D-1112 `bb552fba`


- [x] `teleport.c` `teleok` vibrating / pit-fly (named). Not `rloc`. **Addressed:** D-1111 `b0847b88`


- [x] `teleport.c` `goodpos` live-mon `onscary` when `m_id != 0` (named). Not `goodpos_onscary`. **Addressed:** D-1110 `fd738eab`


- [x] `sp_lev.c` `lspo_exclusion` populate `exclusion_zones` from `des.exclusion` (named). Not `goodpos`. **Addressed:** D-1109 `5bf81ca7`


- [x] `fountain.c` `wash_hands` (named). Not Excalibur. **Addressed:** D-1108 `62b93acb`


- [x] `fountain.c` `dipfountain` Excalibur LONG_SWORD body (named). Not wash_hands. **Addressed:** D-1107 `0633a261`


- [x] `fountain.c` `dryup` cansee cloud-glyph skip of dryup pline (named). Not angry_guards. **Addressed:** D-1106 `127c045c`


- [x] `fountain.c` `watchman_warn_fountain` Deaf shake/wave (named). Not dryup yn. **Addressed:** D-1105 `b4930cb9`


- [x] `fountain.c` `dryup` `angry_guards` after real dryup (named). Not wizard yn. **Addressed:** D-1104 `7458a5b8`


- [x] `dbridge.c` `db_under_typ` / `hack.c` `waterbody_name` SURFACE_AT (named from D-1077 review 38). Not `goodpos`. **Addressed:** D-1103 `130e7e21`


- [x] `teleport.c` `goodpos_onscary` Elbereth / SCR_SCARE_MONSTER / altar-vampire (named). Not `is_pool`. **Addressed:** D-1102 `ebe1f041`


- [x] `teleport.c` `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone` (named). Not `onscary`. **Addressed:** D-1101 `a7302142`


- [x] `teleport.c` `goodpos` `passes_walls` + `may_passwall` early-out (named). Not youmonst swim. **Addressed:** D-1100 `305ad188`


- [x] `teleport.c` `goodpos` youmonst Swimming/Amphibious/Levitation/Flying/Wwalking pool and lava arms (named). Not `passes_walls`. **Addressed:** D-1099 `a6934a3d`


- [x] `read.c` `seffects` SCR_GENOCIDE (named from sit). Not kill_eggs. **Addressed:** D-1098 `cdb72162`


- [x] `mon.c` `kill_eggs` after genocide (named from sit D-1034). Not seffects SCR_GENOCIDE. **Addressed:** D-1097 `d1e7ae23`


- [x] `fountain.c` `dryup` wizard yn (named). Not angry_guards. **Addressed:** D-1096 `bd16c130`


- [x] `potion.c` `split_mon` trap rust / `minliquid` / uhitm AD_COLD callers (named from D-1078). Not sit clone_mon. **Addressed:** D-1095 `a86a7111`


- [x] `makemon.c` `m_initweap` MS_NEMESIS mitem `ptr.msound` not `urole.neminum` (named). Not S_ORC peace. **Addressed:** D-1094 `46775b20`


- [x] `dogmove.c` pal/target tests must compare numeric `ptr.msound` not string `'MS_LEADER'` (named from D-1053 review 14). **Addressed:** D-1093 `e0b68f1d`


- [x] `makemon.c` S_ORC / S_ELF / unicorn mlet peace override after `m_initweap` (named omit on makemon row). **Addressed:** D-1092 `c3f28bfd`


- [x] `teleport.c` `goodpos` must call `is_pool()` / `is_lava()` not `IS_POOL` / `IS_LAVA` macros (named from D-1077 review 38). **Addressed:** D-1091 `278521f1`


- [x] `dbridge.c` `is_pool` / `is_moat` DRAWBRIDGE_UP + `DB_MOAT` (named from D-1077). Not `is_lava`. **Addressed:** D-1090 `43caa8ff`


- [x] `sit.c` `rndcurse` `Antimagic()` must be C `youprop.h` Antimagic ≡ `uprops[ANTIMAGIC]` intrinsic||extrinsic (invent.js `hero_Antimagic` shape), not `HAntimagic`/`EAntimagic` flats that `confer_oc_oprop` never writes. Worn `CLOAK_OF_MAGIC_RESISTANCE` / gray DSM must `shieldeff` and use the reduced `rnd(6/(Antimagic+Half+1))` count. Do not rewrite `confer_oc_oprop`. Not `update_inventory` / hcolor. Not `is_pool`. Source: reviews/loop-unattended/48-d5038ac7-rndcurse-shieldeff.md **Addressed:** D-1089 `f91650c0`


- [x] `makemon.c` `m_initweap` `ptr.msound` for MS_GUARDIAN / MS_PRIEST (still mndx after D-1079). Not peace_minded. **Addressed:** D-1088 `049af16e`


- [x] `sit.c` `rndcurse` `shieldeff` (named omit). Not update_inventory / hcolor. **Addressed:** D-1087 `d5038ac7`


- [x] `steal.c` `remove_worn_item` armor `*_off` / `unpunish` / `setnotworn` pointer-walk (named from sit take_gold D-1049). **Addressed:** D-1086 `89a97acc`


- [x] `engrave.c` `can_reach_floor` `Flying()` must be C `youprop.h` Flying via `uprops[FLYING]` (intrinsic||extrinsic||steed `is_flyer`)&&!blocked, not `HFlying`/`EFlying` flats that `confer_oc_oprop` never writes. Worn `AMULET_OF_FLYING` must skip `check_pit`. Copy `eat.js` `Flying()` shape. Do not rewrite `confer_oc_oprop`. Not steal.c `remove_worn_item`. Source: reviews/loop-unattended/43-453e759c-can-reach-floor-ceiling-hider.md **Addressed:** D-1085 `3e1a74e8`


- [x] `sit.c` `throne_sit_effect` wizard getlin "Throne sit effect (1..13)" (named). Not Analyze y_n. **Addressed:** D-1084 `83a3ada5`


- [x] `engrave.c` `can_reach_floor(check_pit)` teeter/shaft (named from D-1073). Not ceiling_hider. **Addressed:** D-1083 `e6167027`


- [x] `engrave.c` `can_reach_floor` ceiling_hider / MZ_HUGE (named from D-1069/D-1071). Not check_pit. **Addressed:** D-1082 `453e759c`


- [x] `eat.c` `cprefx` `revive_corpse` after rider lifesave (debt.md). **Addressed:** D-1081 `cd5af20a`


- [x] `shk.c` `u_entered_shop` deserted / angry / Invis / pickaxe doorway (named D-0307). **Addressed:** D-1080 `0a4a5df3`


- [x] `makemon.c` `peace_minded` / `set_malign` read `ptr.msound` (`msounds[]` exists, D-1053). **Addressed:** D-1079 `d7d679c1`


- [x] `sit.c` `split_mon` monster `clone_mon` arm (JS named omit). **Addressed:** D-1078 `c7dcd80a`


- [x] `hack.c` `is_lava` includes DRAWBRIDGE_UP + `DB_LAVA` (named from D-1060). **Addressed:** D-1077 `a9e819a4`


- [x] `trap.c` hero pit/hole bodies under `dotrap` `VIASITTING` (named omit from D-1039). **Addressed:** D-1076 `87b4b7cb`


- [x] `sit.c` `dosit` `lay_an_egg` at end of function. Not hider / reach / ustuck. **Addressed:** D-1075 `f21410e1`


- [x] `sit.c` `dosit` dragon coin hoard: `money_cnt(invent)` meager vs `ulevel * 1000` (JS always bare “hoard”). **Addressed:** D-1074 `962e07a9`


- [x] `sit.c` `dosit` OBJ_AT gate: skip picnic when `uteetering_at_seen_pit` or `uescaped_shaft` like C. **Addressed:** D-1073 `1f21183f`


- [x] `sit.c` `dosit` ustuck `!sticks` lap (`Monnam` / `mhis`). Not swallow combat. **Addressed:** D-1072 `55906000`


- [x] `engrave.c` `can_reach_floor` ustuck AT_HUGS + `!sticks` (`mondata.c` `sticks`). Makes dosit sit-on-air reachable; ship before ustuck lap. Not ceiling_hider / MZ_HUGE. **Addressed:** D-1071 `aa96e08c`


- [x] `engrave.c` `can_reach_floor` Levitation + `sit.js` `dosit` message `Levitation()` must be C `youprop.h` `(HLevitation||ELevitation)&&!BLevitation`, not sticky `u.Levitation` only. Worn boots / potion `#sit` must tumble. Do not pull hugs / ceiling_hider / MZ_HUGE. Source: reviews/loop-unattended/30-872d1d93-dosit-can-reach-floor.md **Addressed:** D-1070 `9d3545c9`


- [x] `sit.c` `dosit` `can_reach_floor(FALSE)`: swallow “no seats” / Levitation tumble / sitting on air. Replace JS Levitation-only early return. **Addressed:** D-1069 `872d1d93`


- [x] `sit.c` `dosit` hider: `u.uundetected && is_hider` except trapper clears ceiling hide. Not `can_reach_floor` / ustuck. **Addressed:** D-1068 `990b06a8`


- [x] `dosit` steed message: C `mon_nam(usteed)`, not `"your steed"`. Source: D-1033 risk 4 (named, not a Must-fix). **Addressed:** D-1067 `2e50b318`


- [x] tut-1 nhcore callback disable on enter/leave. **Addressed:** D-1066 `7e330128`


- [x] tut-1 `tut_key` / eckey only. **Addressed:** D-1065 `296bc792`


- [x] tut-1 `place_lregion` only. **Addressed:** D-1064 `dc354c44`


- [x] tut-1 food objects only. **Addressed:** D-1063 `3f376b74`


- [x] tut-1 large-box contents only. **Addressed:** D-1062 `3ca1b544`


- [x] tut-1 stairs only. **Addressed:** D-1061 `05915d9b`


- [x] `dosit` lava/ice sit Fire_resistance/Cold_resistance must read C `youprop.h` (`u.uprops[FIRE_RES]`/`[COLD_RES]` intrinsic||extrinsic). `sit.js` clones H||E flats; `confer_oc_oprop` writes FIRE_RES/COLD_RES only to uprops (`EFire`/`ECold` unmirrored). Worn fire-resistance ring must take `d(2,10)` not `d(10,10)`. Do not rewrite `confer_oc_oprop` this iter; do not pull DRAWBRIDGE_UP+DB_LAVA `is_lava`. Source: reviews/loop-unattended/19-27f0a233-dosit-lava-ice.md **Addressed:** D-1060 `ecd37108`


- [x] tut-1 `des` kelp only. Not stairs / box / key / `place_lregion`. **Addressed:** D-1059 `c0d5279a`


- [x] `sit.c` `dosit` lava / ice / drawbridge sit (terrain, not trap-lava already in D-1039). **Addressed:** D-1058 `27f0a233`


- [x] `sit.c` `dosit` sink / altar / grave / stairs / ladder sit messages only. **Addressed:** D-1057 `e1852e71`


- [x] `dosit` water predicates must use C `Underwater` (`u.uinwater`, `youprop.h:279`), not the unset `u.Underwater` alias. Early pool `goto in_water` and muddy/cushions both read the dead field. Source: reviews/loop-unattended/16-e13735f8-dosit-in-water.md **Addressed:** D-1056 `2e79451d`


- [x] `sit.c` `dosit` water / pool / gremlin sit (after trap, before sink). Not the furniture list. **Addressed:** D-1055 `e13735f8`


- [x] `get_obj_location` flags: JS `0` must not accept CONTAINED when C hatch passes `0`. Source: D-1036 risk 4. **Addressed:** D-1054 `3f8469fe`


- [x] `cry_sound`: monster `msound` must be C `monflag.h` numbers, not empty → always-chitter. Source: `reviews/loop-2026-08-15/D-1036-2ae43a8b-hatch-egg.md` risk 3. **Addressed:** D-1053 `178d60f2`
- [x] Cursed-lamp `make_glib`: JS `(u.Glib|0)&TIMEOUT` must match C `HGlib|EGlib` timeout. Source: `reviews/loop-2026-08-15/D-1023-aaac3f9d-lamp-trap-bot.md` `use_lamp` gap. **Addressed:** D-1052 `1710bd41`
- [x] `u_wipe_engr` / `tmp_at` no-ops in apply: wire or stop calling them as if they were C. Source: D-1022 risk 7. **Addressed:** D-1051 `7e389050`
- [x] `pickup_object` honors `telekinesis` like C (whip/grapple pull-in). Source: D-1022 risk 6. **Addressed:** D-1050 `4e55ff2f`

## 2026-08-15

- [x] `take_gold` must `remove_worn_item` like C `sit.c`. Source: `reviews/loop-2026-08-15/D-1034-63e86f5a-ordinary-throne.md` risk 3. **Addressed:** D-1049 `9e24f61a`


- [x] Vlad special case 10: C sets `HConfusion` only; JS must not also force flat `u.Confusion`. Source: `reviews/loop-2026-08-15/D-1033-a59caac8-vlad-throne.md` risk 2. **Addressed:** D-1048 `e395bb74`


- [x] `consume_obj_charge` unpaid/shop path (not `spe--` only). Source: D-1023 risk 3. **Addressed:** D-1047 `2ca2ccd7`


- [x] `light_cocktail` must take/update `struct obj **` like C `apply.c` `light_cocktail`. Source: `reviews/loop-2026-08-15/D-1023-aaac3f9d-lamp-trap-bot.md` risk 4. **Addressed:** D-1046 `3371ddf0`


- [x] Whip/pole/grapple names: real `yname` / `Amonnam` / `mbodypart` (not local apply clones). Source: D-1022 risk 5. **Addressed:** D-1045 `e8884a53`.


- [x] `special_obj_hits_leader` must use C `is_quest_artifact` (`urole.questarti`), not `u.questarti`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1044 `d9febc3c`.

- [x] `find_mac` must walk monster `minvent` worn `ARM_BONUS` / amulet of guarding like C `worn.c` (thitmonst tmp). Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1042 `19e907f5`.
- [x] `should_mulch_missile` hero blessed save must be `rnl(4)` not `rn2(4)` like C `dothrow.c`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1043 `d3fac215`.
- [x] Pole targeting: `glyph_is_poleable_at` / `find_poleable_mon` must follow C `apply.c` `use_pole` (live `m_at` / map, not a glyph-only stand-in). Source: `reviews/loop-2026-08-15/D-1022-7f952620-whip-grapple-pole.md` risk 3. **Addressed:** D-1040 `12458fe9` `12458fe9`.
- [x] Pole `thitmonst` hit-vs-miss envelope for `use_pole` (combat RNG). Source: D-1022 risk 4. **Addressed:** D-1041 `eb3469ae`.
