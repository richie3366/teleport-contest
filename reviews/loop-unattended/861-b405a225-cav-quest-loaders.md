# Review 861 — b405a225 — mkmaze.c makemaz Cav quest 5/5 (D-1891)

Metadata: SHA `b405a225`, D-1891. Files: `js/mklev.js` (+~560: 5
loaders + 5 dispatch arms). Next index 861.

Intent vs deliverable: subject promises Cav-strt/-loca/-goal/-fila/-filb
(Caveman 0/5 → 5/5; 330 lua lines). The diff delivers all five +
dispatch; no new module edges. One lua-cited call is missing in all
three mapped loaders (see C-wrong 1) — the only defect found across
all nine SHAs this iteration.

Inventory: file-local `load_cav_strt/loca/goal/fila/filb`; callees
pre-existing LIVE.

**C ↔ JS fidelity**: mostly confirm, one gap. Strt: STONE solidfill +
triple flags; irregular temple (13,1,40,5) lit=1 `filled=1` →
FILL_NORMAL via the flood path (correct raw-value reading of
`sp_lev.c:5600`; flood seeds are the lua region corners,
`rlit = litstate_rnd(1)` draws nothing in both impls,
smeq/bounds/add_room/topologize matches C's irregular branch) + 6
irregular ordinary rects with needfill 0 (no `filled` key) ✓; stair
(2,3); locked door (19,6); coaligned shrine via
`sp_amask_to_amask(AM_SPLEV_CO)` + priestini + SHRINE + has_temple
(Kni idiom) ✓; Karnov + armor/club +5 + chest (34,2) + 8 default
neanderthals ✓; whole-map nondiggable; 2 fixed PIT + 4 random traps;
12 hostile bugbears at exact lua coords ✓. Loca: mazelevel/hardfloor
(no noteleport ✓), irregular ordinary (52,6,73,15), locked door
(28,11), stairs (4,3)/(73,10), 15 objects, 6 traps, 13+4 bugbears +
h + H + 3+4 hill giants + H in exact lua order ✓. Goal:
solidfill-only init ✓, oval map, lit whole, random up stair, Sceptre
mace (lenses idiom), 14 objects, asleep Dragon (peace key absent —
`peace_minded` FALSE, moot) + 3 shriekers ✓. Fila/filb: Ran-idiom
counts verified (fila 7/4/5+h+giant; filb 12/4/4+2h+2giants) ✓. Maps
content-identical, same dims/centering (3/3/3). Named omits
(humidity, ensure_way_out, m_dowear, flip-lregion) carried with cites.

**Actionable C-wrongs**:

1. Missing `des.wallify()` in `load_cav_strt`, `load_cav_loca`,
   `load_cav_goal` — one C-wrong family, queueable in one port iter.
   All three lua files end with `des.wallify()` (strt `:94`, loca
   `:93`, goal `:59`); C `lspo_wallify` with no args runs
   `wallify_map(xstart-1, ystart-1, xstart+xsize+1, ystart+ysize+1)`
   (`sp_lev.c:5965`), which converts cave-perimeter STONE adjacent to
   ROOM/CROSSWALL into HWALL/VWALL (`sp_lev.c:2865` — JS
   `wallify_map` mirrors it exactly). The commit contains zero
   `wallify_map` calls, so cave edges stay STONE in JS. Not a
   substitute: `wallification()` (`mkmaze.c:290` = `wall_cleanup` +
   `fix_wall_spines`) operates on existing walls only and never
   converts STONE. Not named anywhere (D-log Named list, map rows —
   checked both). Fix: the Tou-goal/Ran-goal epilogue line
   (`wallify_map` on splev extents, before wallification → flip →
   fixup) added to all three loaders; pure terrain pass, no RNG
   impact. Flip-invariance holds (mirroring preserves HWALL/VWALL),
   so the pre-flip epilogue slot matches Tou-goal. Must-fix prepended
   to LOOP-QUEUE; CURRENT Next cluster set to it.

Hallucinations / overclaim: none besides the gap — hidden verify
labeled vacuous explicitly, and the D-log's per-loader claims all
checked out.

Density: 5 loaders, one quest family — coherent; the fix rides as
one Must-fix item, alone, per the Must-fix rule.

Verification: D-log `verify.mjs --fn makemaz` → PASS (syntax, rule2,
green 2/2, strict, cohort 7/7, full 44/44 auto) + map probe (all
20×76, 0 mismatches). Re-measured myself:
`hidden-proxy.mjs verify makemaz --base b405a225~1` → 0 blocked at
baseline and HEAD → vacuous, shipped on public gates per the proxy
instruction. No banned patterns. Verification is green; this verdict
rests solely on C-wrong 1 above, which no gate covers (no corpus
session reaches quest levels).

Verdict: **QUALITY-RISK**

**Addressed:** D-1893
