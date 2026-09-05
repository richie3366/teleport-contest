# Review 859 — c55669a4 — mkmaze.c makemaz Ran quest 5/5 (D-1889)

Metadata: SHA `c55669a4`, D-1889. Files: `js/mklev.js` (+~560: 5
loaders + 5 dispatch arms). Next index 859.

Intent vs deliverable: subject promises Ran-strt/-loca/-goal/-fila/-filb
(Ranger 0/5 → 5/5; 360 lua lines, ships whole). The diff delivers all
five + dispatch; no new module edges.

Inventory: file-local `load_ran_strt/loca/goal/fila/filb`. One inline
~20-line map-application block in strt duplicating
`splev_apply_centered_map`'s body with the pre-existing
`splev_map_aligned_start` (mklev.js:11628, not new) — duplication nit,
behaviorally identical modulo start (same lit-clear, same SpLev_Map
bookkeeping). Callees otherwise pre-existing LIVE
(`lspo_replace_terrain_region`, `l_create_object`, `mkobj_at`,
`splev_create_trap` typed form, `maketrap`, `mktrap_seen_victim`,
`wallify_map`).

**C ↔ JS fidelity** (confirm):

- Strt: ROOM solidfill + triple flags + arboreal; ROOM/ROOM mines
  lit/smoothed/joined/unwalled; replace_terrain(0,0,76,19,ROOM,TREE,5)
  BEFORE the map per lua order (absolute region, pre-map field —
  matches C's draw order); 41×21 left/center map (halign left →
  xstart=1 per C `SPLEV_LEFT` + `splev_init_present`,
  `sp_lev.c:6195`); lit rect (00,00,40,20); down stair map-relative
  (10,10) — the map-relative convention verified at the C source
  (`get_location` adds xstart/ystart to explicit coords,
  `sp_lev.c:1224`; `rndcoord` returns map-relative, `nhlsel.c:413`).
  Orion (20,10) + leather armor/yumi/ya×50 via string ids
  (pre-existing `find_objtype`; `ya` quantity through the D-1723
  non-merge loop) + chest + 8 hunters at lua coords; rect nondiggable
  (00,00,40,20); fixed arrow/arrow/pit via maketrap+seen_victim +
  typed random spiked/bear/bear; asleep minotaur (33,9) + 18 placed
  centaurs + 6 random plains + 2 scorpions, all hostile per the lua
  keys. Absolute islev rect `place_lregion(51,2,77,18,LR_BRANCH)`
  post-flip (Val-strt shortcut; same shared flip-order note as review
  855(b), now a named omit as of D-1890).
- Loca: STONE solidfill, 55×20 centered map, lit rect (00,00,54,19),
  stairs (25,5)/(27,18), rect nondiggable, 8 objects, paired typed
  traps in lua order (spiked×2/telep×2/arrow×2), asleep wumpus (27,18)
  + 4 bats/4 forest/8 mountain/4 scorpions/2 s, all hostile ✓.
- Goal: bow artifact (Tou-goal card idiom: id/x/y/buc/spe/name) +
  chest + 8 coord-fixed `mkobj_at(RANDOM_CLASS)` with erosion clearing
  — verified against C `sp_lev.c:2273–2283` (`mkobj` may generate
  eroded, then `create_object` zeroes all three fields when
  `eroded==0`; JS mirrors exactly including RNG parity) + 5 random
  objects; 6 random traps; 14 doors (4 locked + 10 closed — D-log
  prose says "3 locked", the code is correct at 4); Scorpius + 6
  placed forest + 6 placed mountain + 2+2 randoms + 2 C + 6 placed
  scorpions at exact lua coords + 2 random + s (lua tail verified to
  line 104); trailing `des.wallify()` → `wallify_map` on splev
  extents ✓.
- Fila/filb: TREE (fila) / STONE (filb) bg mines, noflip, stairs →
  objects (7/11) → traps (4/4) → hostiles in lua order (fila
  2 mountain + 3 forest + C + scorpion; filb 4 mountain + C +
  2 scorpions) ✓.
- Maps: all content rows match lua; the Ran maps strip trailing
  whitespace, proven harmless by a 9-map centering audit under the C
  formula (`2+(78-2-w)/2` + odd-gate, `sp_lev.c:6202`): identical
  xstart with/without trailing spaces in every case (Ran-goal 76→75
  still xstart 3), and padEnd+skip makes stripped cells no-ops.
- Observation (series-wide, unmeasured, noted not queued): the
  leader-invent `give()` burns floor-placement RNG draws C never
  makes (container-context creation) — shared Sato/Hippocrates/
  Twoflower/Orion idiom.

Hallucinations / overclaim: none — vacuous verify stated explicitly;
the "3 locked" prose nit doesn't touch code.

Density: 5 small loaders, one quest family — coherent.

Verification: D-log `verify.mjs --fn makemaz` → PASS (syntax, rule2,
green 2/2, strict, cohort 7/7, full 44/44 auto) + rtrim map probe
(21×41, 20×55, 20×76 → 0 mismatches). Re-measured myself:
`hidden-proxy.mjs verify makemaz --base c55669a4~1` → 0 blocked at
baseline and HEAD → vacuous, shipped on public gates per the proxy
instruction. No banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
