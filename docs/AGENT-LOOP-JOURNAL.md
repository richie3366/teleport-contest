# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-20 — D-2681 `role.c` rigid_role_checks whole-body port (ROLE_RANDOM fallback now randrole_filtered)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2680 `pickup.c` out_container whole-body port (impossible gate + artifact/corpse/icebox/bill/pick arms + shk pick_pick)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2679 `shk.c` corpsenm_price_adj whole-body port (tin/egg/corpse intrinsic-table surcharge wired into getprice)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — Audit 8f5cd3c6..14d94914 (reviews 1629–1637: 9 ACCEPT, 0 Must-fix) + cadence 44/44

9 JS-touching SHAs since review 1628 (D-2670…D-2678), each audited against
pinned C with per-SHA `hidden-proxy verify --reach-all` re-runs: all
REACH-OK, no REGRESSED, no vacuous-PASS overclaims (all 0-blocked notes
honest). Notable checks: 1633 `/ ice$/i` ≡ C first-space strcmpi on the
reachable ice_descr set; 1636 file-local isok body-verified vs C;
1637 PROJECTILE macro + 5/5 FALSE arms + retired apply.js clone confirmed
single-export. Cadence: full sessions 44/44 (Scr 11405/11405, RNG
792838/792838); held-out 11/44 unchanged (5972 pts, RNG 26.7 %, screens
53.0 %); corpus 497/540 (92.0 %) +0/−0. Queue refilled to 12 coverage
(@14d94914, 7 fresh in tool order). Next: `shk.c` cost_per_charge.
## 2026-09-20 — D-2678 `uhitm.c` hmon_hitmon_dmg_recalc whole-body port (get_dmg_bonus gate + PROJECTILE skillwep + uwep_skill_type export)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2677 `dogmove.c` find_friends whole-body port (perceives invis-tame arm + isok call)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2676 `lock.c` chest_shatter_msg whole-body port (potion You hear/see + bottlename + potionbreathe; C-order switch + An)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2675 `wield.c` doswapweapon whole-body port (cantwield arm + live prinv/You)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2674 `invent.c` dfeature_at whole-body port (throne/lava/ice/pool/drawbridge/altar arms; invented STAIRS arm removed)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
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
