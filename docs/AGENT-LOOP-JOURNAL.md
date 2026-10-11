# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-11 — D-3828 cliffs-head writer Infravision: poly'd hero kept racial infravision via the ungated D-0039 fallback, hiding C's Warning `1` (95346 778→PASS)

**C locus:** `include/display.h:184–186` (H/E/Infravision ≡ H||E); `polyself.c` set_uasmon `:84–85` (PROPSET(INFRAVISION, infravision(Upolyd ? mdat : &mons[urace])) — the race default applies only while human); `display.c` newsym `:1046–1056` (can't-see: infrared+mon_visible → display_monster, else mon_warning → display_warning); `drawing.c` def_warnsyms[1] (`1`, CLR_RED).
**JS:** js/display.js:1698–1707 (comment + gate); new scripts/poly-infravision.test.mjs (4 its: poly'd gnome→dragon loses racial infrared; human gnome keeps it; HInfravision flat grants it poly'd; non-infra race without flat has none).
**Change:** one `if (Upolyd(game.u)) return false;` before the race fallback (Upolyd already imported in display.js — no new edge), with the C cites. File-local predicate, single caller.
**Verify:** `node --test scripts/poly-infravision.test.mjs` → 3/4 pre-fix (authentic fail: poly'd case `true !== false`), 4/4 post-fix. `node scripts/verify.mjs --fn polymon` → PASS syntax (1 file js/display.js) · rule2 · hidden `verify polymon: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-sweep-Healer-95346: PASS) · reach polymon 80/80 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file) · VERIFY: PASS.
**Named:** none new (race fallback retained for !Upolyd pre-set_uasmon windows; set_uasmon PROPSET otherwise whole per D-3429; EInfravision extrinsic preserved as-is).
**Next:** probe joins the PASS set on regen; pop the next Open — cliffs head.
## 2026-10-11 — D-3827 cliffs-head writer `display.c` feel_location: Levitation gate read the flat `u.Levitation` mirror, never set under FROMFORM (95342 1197→PASS)

**C locus:** `feel_location` nethack-c/upstream/src/display.c:746–909, gate `:777` (`if (!can_reach_floor(FALSE))`); `can_reach_floor` nethack-c/upstream/src/engrave.c:187–213 (`:198` Levitation property, `:206` Flying || msize).
**JS:** js/display.js +import `:173`, gate `:5683–5691`; new focused test scripts/feel-levitate-gate.test.mjs (mfind0-warn-flush replay precedent: prefix to 1197, pins topline + C rows 9/10/11 + Blind status).
**Change:** D-3822/D-3825 pattern — import the live `Levitation`/`Flying` exports from mhitu.js (`imports.mjs --can display.js mhitu.js Levitation` VERDICT: SAFE, hoisted functions, cycle-safe; one clone fewer) and read them in the gate. Doc comment cites engrave.c:187 + the cycle rationale; msize arm newly named.
**Verify:** `node scripts/verify.mjs --fn feel_location,mfind0` → VERIFY: PASS (syntax 1 file js/display.js; rule2; `verify mfind0: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` — scen-sweep-Healer-95342: PASS; REACH-OK both, smoke 24/24 ×2; green 2/2; strict ×2; cohort 7/7; full 44/44 auto on shared-file change). Focused `node --test scripts/feel-levitate-gate.test.mjs`: failed pre-fix on row 9 (`'        .%.'` vs `'         %'`), 1/1 green post-fix.
**Named:** `feel_can_reach_floor` = can_reach_floor(FALSE) minus: usteed P_RIDING < P_BASIC (C :201), ustuck-hugs (:192–197), uundetected ceiling-hider (:203) — pre-existing, untouched; youmonst msize >= MZ_HUGE (:206) — newly named (no session evidence; probe form small). check_pit tail (:209) correctly skipped (FALSE arg).
**Next:** probe joins the PASS set on regen; pop the next Open — cliffs head.
## 2026-10-11 — D-3826 cliffs head display_minventory: PICK_NONE analog omitted tty "X - " prefixes + prompt blank (offx 38 vs C 37); xname food tail used lossy macro name ("c ration") (95327 → PASS)

**C locus:** `invent.c` display_minventory `:5340–5386` → `pickup.c` query_objlist `:1130–1139` (identifier items, ch `# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
/0) → `wintty.c` tty_add_menu `:2602` ("%c - " prefix) + tty_end_menu `:2680–2690` (prompt prepends "" then title) + `:2716–2726` (menu letters a..z/A.. in menu order, per-page reset; `# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
 kept) + `:2728–2762` (maxcol = max strlen+2) + tty_display_nhwindow `:1914` (offx = max(10, cols-maxcol-1)); `objnam.c` xname_flags FOOD `:789` Concat(actualn) / ROCK `:823` Strcpy(actualn) with actualn = OBJ_NAME ("C-ration", objects.h:1113).
**JS:** `js/invent.js` display_minventory analog + doc (named omits updated: letters claim dropped, sortloot-order now explicit) and `js/objnam.js` pretty_base tail; `scripts/display-minventory-pick-none.test.mjs` (prefix/blank/geometry composition, probe-exact offx-37 geometry, C/K-ration xname).
**Change:** analog builds `[hdr, "", ...]` and bakes C's prefixes into item text: first-item gold keeps `# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
 (query_objlist `:1133–1135`), else menu letters a..z/A.. in menu order with per-page reset at n%lmax==0 over every list slot (tty_end_menu `:2716–2726`); MINV_NOLET comment corrected (C ignores it here; monst.h:42 = no inventory letters, menu letters instead). pretty_base tail now `PRETTY[n] || objectNameStrs[otyp] || lossy` (house pattern, C's actualn).
**Verify:** focused test 0/1 pre-fix (row 1 `Coins`, no prefixes) → 3/3 post-fix. `verify display_minventory: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-sweep-Caveman-95327: PASS). REACH-OK display_minventory smoke 24/24; xname_flags smoke 24/24 (its other blocked session scen-worldtour-Caveman-95234 stays xname_flags@624 — separate cliffs row, map-row region owner, untouched arm; 0 worse). green 2/2 + strict ×2 + cohort 7/7; syntax (2 files) + Rule #2 PASS → VERIFY: PASS.
**Named:** none new (INCLUDE_HERO fake rows + sortloot order in the analog and invdisp polish stand from D-3401; pretty_base "next boulder" next_boulder arm still absent — no corpus row shows it).
**Next:** scen-worldtour-Caveman-95234 xname_flags@624 (cliffs row: identical toplines, map row 1 differs — region owner, writer TBD at that step, not the food tail).
## 2026-10-11 — D-3825 cliffs head You_see writer: convert_arg %x read dead Blind flats, missed the worn blindfold (95337 → PASS)

**C locus:** `questpgr.c` convert_arg `:311` `case 'x': str = Blind ? "sense" : "see";` with `Blind ≡ (HBlinded || EBlinded) && !BBlinded` (youprop.h:103).
**JS:** `js/questpgr.js` (import + `%x` arm `Blind() ? 'sense' : 'see'`, cite comment) and `scripts/convert-arg-blind.test.mjs` (extrinsic-blind, intrinsic-blind, sighted, blocked).
**Change:** D-3822 pattern — import the live `Blind()` export from invent.js (imports.mjs VERDICT: SAFE, hoisted function, cycle-safe) and read it in the `%x` arm; dead-flat line deleted.
**Verify:** focused test failed 2/4 pre-fix (both sense cases), 4/4 post-fix. `verify.mjs --fn You_see,convert_arg`: hidden verify You_see: 1 PASS, 0 moved, 0 no-movement (scen-sweep-Barbarian-95337: PASS); REACH-OK both spreads (24/24 each); green 2/2; strict both; cohort 7/7; syntax + Rule #2 PASS; VERIFY: PASS.
**Named:** none new (convert_arg otherwise whole per D-1649 audit).
**Next:** sibling dead-flat Blind reads (apply.js:5845, hack.js:3089, music.js:215, timeout.js:1727) are future cliff writers only if a board row names them — not queued, not swept.
## 2026-10-11 — D-3824 cliffs head `randomize_gem_colors` is a phantom: D-3823 committed a stale scoreboard that re-failed 95230/95244/95231/95210 — all 4 PASS live, board re-scored, 3 rows leave (no js/)

**C locus:** none (no C change; owner o_init.c:85–109 whole; writer end.c:394–480 panic whole per D-3820).
**JS:** none.
**Change:** re-scored the 4 rows through the sanctioned scorer only (`verify.mjs --fn randomize_gem_colors,slimed_to_death,doname_base` rewrote the working rows live) — no hand-edit of the board, no full rescore (targeted repair: a full rescore risks env-drift rewrites per D-3820's 14 deltas, and D-3823's diff proves the corruption is exactly these 4).
**Verify:** `verify randomize_gem_colors: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (95230 + 95244 PASS); `verify slimed_to_death: 1 PASS` (95231); `verify doname_base: 1 PASS` (95210). REACH-OK all three (randomize_gem_colors 80/80 spread of 1078; slimed/doname_base 24/24 smoke each). green 2/2 + strict ×2 + cohort 7/7; syntax + Rule #2 PASS → VERIFY: PASS. Frozen 13-session spot-check at HEAD: the 4 repaired PASS (95230 16599/511, 95244 12547/723, 95231 62600/1055, 95210 64598/975, all full), the other 9 probes FAIL exactly as the board says (95337 RNG-full 1247/1248 — the You_see row is real; rest RNG-full screen-short).
**Named:** none (no port).
**Next:** 3 rows leave via regen (randomize_gem_colors, slimed_to_death, doname_base block 0); true head is You_see (95337@798, live-confirmed). Process: review should confirm verify-after-last-edit before commit (D-1831) — D-3820…D-3823 are still unreviewed (last audit covered D-3811…D-3819).
## 2026-10-11 — D-3823 pray.c dosacrifice off-altar prep: dead u.Levitation/u.Flying flats always said "on" — live mhitu exports (95337 step 729 → 798)

**C locus:** `pray.c` dosacrifice `:1854–1896` — `:1857` altaralign first, `:1860–1864` `You("are not %s an altar.", (Levitation || Flying) ? "over" : "on")`; `youprop.h:240` Levitation ≡ (H||E)&&!B, `:253–256` Flying ≡ (H||E||steed)&&!B, all over uprops. No direct C call sites — extcmd dispatch only (`cmd.c:72` extern).
**JS:** `js/pray.js` dosacrifice (`:2745–2785`); import `:68`.
**Change:** prep reads the live `mhitu.js` `Levitation()`/`Flying()` exports (added to pray.js's existing mhitu edge — `imports.mjs` ALREADY, no new edge); altaralign moved above the guards in C order (`a_align` is a pure level read). Rest of the body already whole (D-1667 ECMD_TIME arms, D-1678 offer_corpse, D-2345 amulet arms).
**Verify:** `verify dosacrifice: 1 moved past, 0 unchanged, 0 worse` → PROGRESS (scen-sweep-Barbarian-95337: moved → You_see at step 798, was 729). REACH-OK (no RNG-tagged reach; smoke 24/24). green 2/2 + strict + cohort 7/7; syntax + Rule #2 PASS. Focused: `scripts/dosacrifice-levitation-prep.test.mjs` 1/1 (replays the recipe prefix, asserts «over»; pre-fix /tmp probe showed JS «on»).
**Named:** none new (mhitu `Levitation()` reads H/E flats only, no slot — complete today since every levitation slot write derives from the flats; see Next).
**Next:** same-file `at_your_feet` `js/pray.js:1679` reads dead `u.Levitation` (`beneath`/`at`, C `pray.c:788–802`) — same disease, left for its own row; widen mhitu `Levitation()` to the D-1085 slot union if a slot-only levitation writer ever appears (Flying already is).
## 2026-10-11 — D-3822 cliffs row `doname_base` writer: flats-only Warning/Searching readers never saw a worn ring — no warning digits, no ring autosearch (95210 → PASS)

**C locus:** `youprop.h:163–165` Warning ≡ `u.uprops[WARNING].intrinsic || .extrinsic`; `:175–177` Searching ≡ `u.uprops[SEARCHING].intrinsic || .extrinsic`; `display.h:64–66` _mon_warning (Warning && !mpeaceful && mdistu < 100 && m_lev/4 ≥ warnlevel); `do_wear.c` Ring_on RIN_WARNING → see_monsters; `allmain.c:342` `Searching && !noautosearch && multi >= 0` → dosearch0(1); `insight.c` attributes_enlightenment Searching arm.
**JS:** `js/display.js` (+3/−2), `js/attrib.js` (+7/−2), `js/invent.js` (export only); new `scripts/warning-searching-uprops-union.test.mjs`.
**Change:** `js/display.js` mon_warning calls the live `hero_Warning` (now exported from `js/invent.js` — display.js already imports invent.js, no new edge; one clone fewer); `js/attrib.js` Searching reads `uprops[SEARCHING]` intrinsic/extrinsic plus the flats (adjabil writes `HSearching`, artifact.js writes `ESearching`), same shape as its `Fast()` neighbour. Searching is shared: the moveloop autosearch and both enlightenment copies (invent.js enlightenment + doattributes) now see a worn ring of searching like C.
**Verify:** focused test 2/5 failing on unpatched js (stash-proven: the two worn-ring cases) → 5/5 post-fix. Frozen runner on 95210: mon_warning alone 955→973/975 (moved → one_characteristic@965), + Searching → **PASS** 64598/64598, 975/975. `node scripts/verify.mjs --fn doname_base,Searching,mon_warning --full` → PASS syntax (3 js files) · PASS rule2 · PASS hidden (`verify doname_base: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`) · REACH-OK doname_base / Searching / mon_warning 24/24 smoke each · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 → VERIFY: PASS.
**Named:** the remaining flats-only property clones (the 294-clone drift) are not swept here — only the two this session measured. The ring autosearch now runs in JS as in C; no corpus session moved on it (no hidden spot next to a ring-of-searching wearer), so its dosearch0 draws have no new corpus witness.
**Next:** row leaves via regen (doname_base blocks 0). Parked index: the 2026-09-08 `objnam.c` doname_base line retired as stale (probe scen-wish-Rogue-92037 PASS; ledger note set) — the stale park is what tagged this row MISATTRIBUTED.
## 2026-10-11 — D-3821 cliffs row `slimed_to_death` writer: losehp's JS-only gameover marker leaked into done() — savelife named the unseen holder (95231 → PASS)

**C locus:** `hack.c:4283–4288` losehp fatal (`urgent_pline("You die..."); done(DIED);` — gameover still FALSE) · `end.c:1112–1117` done Die? decline → savelife · `end.c:749–753` savelife `pline("%s releases you.", Monnam(u.ustuck))` · `do_name.c:863–865` x_monnam `do_it` requires `!program_state.gameover` · `end.c:1144` really_done is the only gameover writer on this path.
**JS:** `js/hack.js` (+5), `js/end.js` (+9); new `scripts/losehp-done-gameover.test.mjs`.
**Change:** `js/hack.js:1954` losehp records `game._losehp_gameover = true` only when it flips gameover from false (the marker it invents); `js/end.js:2013–2016` finish_losehp_done drops that marker (gameover false) before «You die...»/done(DIED), so done() runs on C state. A real gameover is never cleared: `really_done` (js/end.js:1146) and the rehumanize-death arm of `finish_losehp_rehumanize` (js/hack.js:1994) reset the marker. Callers between losehp and the finisher still see gameover true and bail as before (unchanged).
**Verify:** focused test 0/1 on unpatched js (stash-proven, exact probe symptom «The barbed devil releases you.») → 1/1 post-fix. `node scripts/verify.mjs --fn slimed_to_death,losehp --full` → PASS syntax (2 changed js files) · PASS rule2 · PASS hidden (`verify slimed_to_death: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`) · REACH-OK slimed_to_death 24/24 smoke · note hidden losehp (nothing blocked at baseline) · REACH-OK losehp 24/24 smoke · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 → VERIFY: PASS. Full corpus rescore (`hidden-proxy score`, 1113/1113 entries): **1081/1113** (HEAD board 1080) — gained 95231, 0 lost, 0 worse, 0 better.
**Named:** `finish_losehp_done` still prints «You die...» with plain `pline` where C uses `urgent_pline` (hack.c:4287) — pre-existing, not this divergence (no corpus row shows it); left for a measured follow-up. Scorer: the topline-literal owner matcher still scores C comments (`timeout.c:508`) — the source of both slimed_to_death misattributions.
**Next:** row leaves via regen (slimed_to_death blocks 0). Parked index: the 2026-09-08 `timeout.c` slimed_to_death line retired as stale (its probe scen-death-Valkyrie-92229 PASSes on the committed board; ledger note set) — the stale park is what tagged this row MISATTRIBUTED. Scorer follow-up: drop comment-only literals from the topline owner match so a `Die?`-decline topline is attributed to its real writer.
## 2026-10-11 — audit 2675–2683 @bc0bec095: review D-3811..D-3819 (9A/0D/0Q, 0 Must-fix) + full rescore 1078/1113

**Reviews:** 2675/Antimagic-no-worn, 2676/piletop-generic, 2677/sermon-ebones, 2678/sticks-import, 2679/rottenfood-triple, 2680/doattributes-flush, 2681/overview-pager, 2682/domonability-chain, 2683/domove-tunnels — all ACCEPT; every D-log movement claim re-measured live (`--base HASH~1 --reach-all`), all confirmed (D-3816/D-3818 moved-pasts confirmed via committed boards, now PASS under later SHAs), zero regressed. Rule #2 clean iteration-wide. Ledger: snapshot appended; 5 seeded ported rows briefed (readobjnam_init, ohitmon, dungeon_branch, retouch_equipment, dowhatdoes_core) — all stand, no `ledger.mjs set` (`ledger.mjs sql` unrunnable here: node v20 lacks node:sqlite; sampled via sqlite3 CLI).
**Score:** public 44/44 (Scr 11,405/11,405, RNG 792,838/792,838, `351+1.57/turn`); corpus 1078/1113 (+10 vs 1068: 9 claimed + 95411 predicted D-3812 bonus, 0 PASS→FAIL, `full: true` 08:26Z); marathons 139/160 (sweep 40/50, worldtour 39/50, chain 40/40, trek 20/20). Held-out 21/44, pts 8,956 (±0), RNG 51.6 % (±0pp) at judge 07:20Z — flat while corpus gained +10; §10.19 falsifier watch stays open.
**Observed (not Must-fix):** per-commit scoreboard headers lag one SHA (each commit's board stamps its parent) — verify-row content is current, only the header trails; harmless.
**Next:** port slot pops the regenerated cliffs head (row-1 randomize_gem_colors still void-barred per D-3767/D-3768).
## 2026-10-11 — D-3819 cliffs row-2 still_chewing caller: domove never chewed rock — tunnels arm missing from the inline test_move (95329 → PASS)

**C locus:** `hack.c:1037–1042` (tunnels && !needspick → still_chewing, "Eat the rock") + domove_core `:2843–2848` (FALSE → move=0, nomul(0)).
**JS:** `js/cmd.js` (+22/−2) + 1 test file.
**Change:** new arm in domove after the IRONBARS chew, in C order: obstructed && !bars && !uinwater (:1017 gate preserved — its message stays deferred) && tunnels && !needspick → still_chewing; truthy → move=0/nomul/return; falsy (chewed through) → falls past the bump to occupy the fresh cell (later at() reads are fresh, like C's live tmpr). No new imports (tunnels/needspick/still_chewing/nomul/IS_OBSTRUCTED already in cmd.js); Deferred doc line updated. New focused test `scripts/still-chewing-domove-tunnels.test.mjs` (prefix-1164 replay asserts the chew message + digging.chew at (50,6) + hero held at (49,7)).
**Verify:** focused test 0/1 pre-fix (stash-proven, exact probe symptom: no chew message) → 1/1 post-fix. `node scripts/verify.mjs --fn still_chewing` → PASS syntax (1 changed js file: js/cmd.js) · PASS rule2 · PASS hidden (verify still_chewing: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS; scen-sweep-Barbarian-95329: PASS) · PASS reach (no RNG-tagged reach; 24/24 smoke → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (not shared). VERIFY: PASS.
**Named:** none new — door (:1090) / boulder (:1227) tunnels arms, Passes_walls+may_passwall (:1014), Underwater message (:1017), autodig (:1043), db_wall/soko bump prose stay deferred as before (turns.md:401); the uinwater gate in the new arm preserves their C order without porting them.
**Next:** row leaves via regen (still_chewing blocks 0 after this board); row-1 still randomize_gem_colors voids pending D-3733 tooling (scorer C-panic exclusion or crash-free re-record).
## 2026-10-11 — D-3818 cliffs row-2 `cmd.c` domonability: shriek/gremlin arms fell through to a shared reflexive tail — C's Upolyd arms are chain members (95329 1075→1164)

**C locus:** `cmd.c:890–949` domonability — the Upolyd `:943–944` / normal-form `:945–947` arms are else-if chain members, reached only when no earlier arm matched; the gremlin `:923–933` and shriek `:937–942` arms have no return and fall to the bare `return ECMD_OK` (`:948`).
**JS:** `js/polyself.js` (+5/−9) + 1 test file.
**Change:** `tail()` deleted; the Upolyd/normal arms are chain members after the steed arm in C order (`:943–947` cites); the chain ends in bare `return ECMD_OK` (`:948` cite). Message strings byte-identical; export name/signature unchanged. New focused test `scripts/domonability-reflexive-tail.test.mjs` (4 its, real permonst rows, message capture mirrors fprefx-stale-egg): poly shrieker → exactly «You shriek.» (probe), dry-land gremlin → exactly «no fountain here» (same fall-through class), poly grid bug → reflexive line (control), human normal form → no-ability line (control).
**Verify:** focused test 2/4 pre-fix (shrieker reflexive-tail text + gremlin More-prompt throw) → 4/4 post-fix. `node scripts/verify.mjs --fn domonability` → PASS syntax (1 changed js file: js/polyself.js) · PASS rule2 · PASS hidden (verify domonability: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS; scen-sweep-Barbarian-95329 → still_chewing at step 1164, was 1075) · PASS reach (no RNG-tagged reach; 24/24 smoke → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (polyself.js not shared). VERIFY: PASS.
**Named:** none new (domonability otherwise whole per D-3402/D-1898/D-2069; all 19 callees live per brief).
**Next:** 95329's new owner still_chewing@1164 (own future row); row-1 still randomize_gem_colors voids pending D-3733 tooling (scorer C-panic exclusion or crash-free re-record).
## 2026-10-11 — D-3817 cliffs row-2 do_statusline2 writer: show_overview PICK_NONE bypassed the menu pager — corner painter hardcoded '(end) ', no 23/page (95306 + 95323 → PASS)

**C locus:** `dungeon.c:3304–3340` show_overview whole re-read (`:3318` NHW_MENU, `:3327` end_menu, `:3328` select_menu PICK_NONE for why!=-1) + `win/tty/wintty.c` paging: tty_end_menu `:2692–2694` (lmax = min(52, rows-1) = 23, npages = ceil(nitems/23)), tty_display_nhwindow menu loop `:1537–1547` (`Sprintf(morestr, "(%d of %d)")` when npages>1, else `(end)`), dmore `:1154–1172`, erase_menu_or_text dismiss. Owner `botl.c:130` untouched.
**JS:** `js/dungeon.js` (+7/−8) + 1 test file.
**Change:** `js/dungeon.js` show_overview now `await select_menu_pick_none(entries)` (live `js/invent.js:3265` export — C-exact lmax/npages/morestr/fullscreen/dismiss/keys, cursor `[morestr.length+1, page.length]` = C's [9,23]); D-1849 pattern, no pager clone. Same function-local dynamic invent.js edge (`imports.mjs --can`: IN-SCC, hoisted cycle-safe); removed the now-unused paint_corner/dismiss/nhgetch locals. New test `scripts/overview-pick-none-pager.test.mjs` (95306: 1226 ynq setup + 1227 byte-exact incl « (1 of 2)» + 1228 bones dismiss).
**Verify:** pre-fix failure observed on unmodified code (/tmp replay probe: J row 23 `\x1b[7CSome fountains.` vs C ` (1 of 2)`); focused test 1/1 post-fix. `node scripts/verify.mjs --fn do_statusline2,show_overview` → PASS syntax (1 changed js file: js/dungeon.js) · PASS rule2 · PASS hidden (`verify do_statusline2: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`; 95306 PASS, 95323 PASS) · REACH-OK do_statusline2 (smoke 24/24) · note hidden show_overview (writer, none blocked) · REACH-OK show_overview (smoke 24/24) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (not shared) → VERIFY: PASS. Full `sessions`: 44/44 (speed `351+1.60/turn` R² 0.787).
**Named:** none new in the probe path (show_overview display now the shared C-exact path; why==-1 PICK_ONE arm unchanged). Other `paint_corner_nhw_menu(entries, '(end) ')` callers (do_name/teleport/spell/shk/detect) untouched — own future rows only on their own evidence, never a sweep. end.c:605 DUMPLOG caller stays unwired by design.
**Next:** cliffs block regenerates from the committed board (do_statusline2 row resolved by the 2 PASSes). Row-1 falsifier stands: `verify randomize_gem_colors` naming a non-void (rngM>0) session. Do not re-port show_overview display / select_menu_pick_none for these sessions.
