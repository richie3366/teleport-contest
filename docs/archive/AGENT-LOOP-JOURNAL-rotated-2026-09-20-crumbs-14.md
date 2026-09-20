# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-20 — D-2668 `sp_lev.c` get_table_region + intarray-entry unpacked ports wired into lregion/exclusion callers; same-file search_door + create_corridor

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-09-20 — D-2667 `objnam.c` paydoname whole-body restart (doname_base direct + BUFSZ-PREFIX guard, per-arm cites)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-09-20 — D-2666 `light.c` write_ls whole-body port (save pointer→id fixup + chain verification, wired into serLight)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-09-20 — D-2665 `selvar.c` selection_floodfill whole-body restart (generic C predicate replaces two clones)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-09-20 — D-2664 `artifact.c` invoke_create_portal whole-body restart (import hoist + per-arm cites)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-09-20 — D-2663 `worn.c` racial_exception race-vs-form fix (dead callee raceptr ported live)

**C locus:** ``nethack-c/upstream/src/worn.c:1359–1373`` (racial_exception) + callee ``mondata.c:1359–1365`` (raceptr: hero && !Upolyd → ``&mons[urace.mnum]``, else ``mtmp->data``) + ``is_elven_armor`` (obj.h:299–302; live js/worn.js:156) + callers ``worn.c:887`` (m_dowear W_ARM racialexception gate) / ``do_wear.c:2053`` (canwearobj which-gate) / ``polyself.c:1199`` (break_armor sliparm uarm).
**JS:** ``raceptr`` js/mondata.js:68 (+14 with cites); const import js/mondata.js:30 (+1 name); ``racial_exception`` js/worn.js:688 (restart, +8/-5 with cites); import js/worn.js:45 (+1 name). Durable test scripts/racial-exception.test.mjs (4 its: hobbit-hero race-not-form, non-elven refusal, poly uses form, monster + human-hero).
**Change:** new live ``raceptr(mtmp)`` export in C-home js/mondata.js with per-arm cites — hero idiom ``=== game.youmonst || _youmonst`` (worn.js:409 / mondata.js:142), ``!Upolyd(game.u)`` (polyself.js:735 precedent), ``mons(urace.mnum)`` race table; ``Upolyd`` joins the existing const.js import (same edge); ``racial_exception`` restarted in C order with ``:line`` cites reading ``raceptr(mon)``; ``raceptr`` joins the existing mondata import in worn.js (``imports.mjs --can`` ALREADY on both edges — no new edge; hoisted fns, no top-level TDZ read). ``mndx`` comparison kept: JS ``mons()`` returns fresh objects so C ``:1366`` pointer-compare ≡ mndx-compare. Export names/signatures kept.
**Verify:** ``node scripts/verify.mjs --fn racial_exception`` → VERIFY: PASS — syntax 2 files (js/mondata.js js/worn.js), Rule #2, hidden note (no corpus session blocked — normal for a coverage row), REACH-OK (no RNG-tagged reach; smoke 24/24, 0 regressed), green 2/2 + strict ×2, cohort 7/7. Full ``sessions`` 44/44 (mondata.js is shared). New test 4/4 (pre-fix run failed on the missing export; the hobbit-hero case returns 0 on the old body by construction — mon.data is the role form).
**Named:** none — every callee live; ``?.mndx ?? -1`` + ``mtmp?.data`` null guards are JS-only (C takes NONNULLARG12); the ``_youmonst`` disjunct is the established JS hero idiom, noted in-body.
**Next:** pop the next Open — coverage row.
