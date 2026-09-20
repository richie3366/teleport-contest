# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
