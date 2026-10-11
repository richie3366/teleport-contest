# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
