# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-20 — D-2683 `dungeon.c` fixup_level_locations whole-body port (C-order cites + live-callee wiring + headless pin)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2682 `o_init.c` dodiscovered whole-body port (discosort o/c/a/s + relic/artifact pseudo-classes + sortloot_descr key)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
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
