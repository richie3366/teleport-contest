# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-20 — D-2673 `uhitm.c` find_roll_to_hit role/race arms (monk spelarmr/bare-hand + orc-vs-elf; mtele_trap STALE-parked same iteration)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2672 `role.c` role_selection_prolog whole-body port (five-line prolog as line array; windowport-only callers)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2671 `sp_lev.c` flip_encoded_dir_bits whole-body port (+ hacklib swapbits; conjoined-pit flip arms wired)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2670 `worm.c` worm_cross whole-body restart (impossible arm + live distmin, C-order cites)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — Audit d19d4373..f6d363e1 (reviews 1620–1628: 9 ACCEPT, 0 Must-fix) + cadence 44/44

Review-only iteration (no js/ edits). Re-audited all 9 SHAs since bbba58ec against pinned C, one SHA at a time, each file written to disk as its SHA finished. 1620 D-2661 magic_negation polyform floor (single C if restored, form reads hero polyform; monsndx/is_minion null-safe LIVE). 1621 D-2662 propagate_chain_lightning (defended live in :975 arm, C short-circuit order). 1622 D-2663 racial_exception + live raceptr (race-vs-form; 3 C callers pre-wired; new test 4/4 run here). 1623 D-2664 invoke_create_portal (4 dynamic→static hoists; --can ALREADY on both new edges; tutorial_dnum always valid so the null guard is adaptation). 1624 D-2665 selection_floodfill generic restart (both clones deleted, 11 call sites on the 4-arg form; generate_way_out_method relies on the :5225 install — sole C caller is ensure_way_out; new test 5/5 run here). 1625 D-2666 write_ls + whereis_mon (FM flags byte-equal; fixup/verify/restore arms verbatim; lev_json edge ALREADY). 1626 D-2667 paydoname (article-strip + BUFSZ−PREFIX guard; XNAME_PREFIX 80 = C PREFIX; doname ≡ doname_base(obj,0)). 1627 D-2668 table-region readers + search_door/create_corridor (create_corridor unwired in JS — its 2 C callers map-named in-commit). 1628 D-2669 buried_ball trapmove wiring (all 5 C callers wired; dist2 → C-home hacklib despite the pre-existing mon.js duplicate). Every per-SHA --reach-all re-run: 0 blocked (honest vacuous) + REACH-OK, no REGRESSED. Rule #2 clean. Cadence: public 44/44 (RNG 792,838/792,838, Scr 11,405/11,405, 67+0.42/turn R² 0.78); held-out 11/44 unchanged (5,972 pts, RNG 26.7%, screens 53.0%); corpus 497/540 (92.0%) +0/−0. Next cluster rotated to worm_cross (buried_ball shipped).
## 2026-09-20 — D-2669 `dig.c` buried_ball: wire last C caller (trapmove radius-1 + wriggle_free); dist2 clone → live hacklib export; 2 stale parks

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
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
