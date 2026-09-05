# Review 857 — 803a82c3 — mkmaze.c makemaz Tou-loca/goal/fila/filb (D-1887)

Metadata: SHA `803a82c3`, D-1887. Files: `js/mklev.js` (+536).
Next index 857.

Intent vs deliverable: subject promises Tou-loca/-goal/-fila/-filb
(Tourist 1/5 → 4/5), holding Tou-strt for its own row because the
combined row exceeded the insertion cap. The diff delivers the 4
loaders + 4 dispatch arms; no new module edges. Process note:
finish-iteration falsely archived the combined tou row citing D-1887;
follow-up `7ce969df` (docs-only, correctly out of scope here) already
re-added the narrowed tou-strt row, and D-1888 ships it — no action
needed in this review.

Inventory: file-local `load_tou_loca/goal/fila/filb`; callees all
pre-existing LIVE (`add_room`, `topologize`, `add_doors_to_room` —
link-only, no RNG — `light_region`, `litstate_rnd`,
`selection_*`, `traptype_rnd`, `maketrap`, `mktrap_seen_victim`,
`rnddoor`, `l_create_object`, `wallify_map`, `wallification`,
`flip_level_rnd`, `fixup_special`).

**C ↔ JS fidelity** (confirm):

- Maps byte-identical, loca and goal (20 lines each — re-measured
  with node; trailing-newline handling via shared `mapfrag_fromstr`).
- Loca: 8 typed rooms at exact lua coords/lit/rtype with FILL_NORMAL
  (morgue unlit (1,1,4,5); shops (15,3,20,5),(62,3,71,4); barracks
  (1,17,11,18),(12,9,20,10),(63,14,72,16); zoo (53,11,59,14); temple
  (32,14,40,16)) — lua `filled=1` → needfill 1, the correct raw-value
  reading of `sp_lev.c:5600`. All 24 ordinary rects in lua order as
  lighting-only with `litstate_rnd(-1)` — this is C's own
  `room_not_needed` path (`sp_lev.c:5643–5662`: ordinary + rect + no
  arrival-room + not-themed → `light_region`, no room created), and
  `litstate_rnd` matches `mkmap.c:443` draw-for-draw
  (`rnd(1+|depth|)<11 && rn2(77)`, `&&` short-circuit preserved).
  Unlit area (73,5,74,5) + lit area (35,11,36,12) in order. Stairs up
  (10,4)/down (73,5). 35 doors in lua order (31 closed + 4 locked —
  verified head and tail). 14 objects + 2× blank paper at (71,12).
  9 traps on '.' minus exactly the lua shop rects
  (15,3,20,5)+(62,3,71,4) via `filter_mapchar` + `rndcoord(1)`.
  16 spiders + 2 s.
- Goal: rooms/areas in lua order (3 barracks + morgue FILL_NORMAL, 2
  lit shops), up stair (70,8), 27 doors with `rnddoor()` at exactly
  the 7 lua "random" cells (verified: `rnddoor` ≡ `sp_lev.c:1148`,
  same 5-state table, uniform, one draw; lua `"random"` → msk −1 →
  `rnddoor()`, `:4702`). Credit card + 14 random objects. 6 traps
  minus the lua shop band (60,14,71,18). Monsters in lua order: MoT
  hostile (4,1), 16 spiders, 2 s, 6 ladies at exact coords, 9 Kops at
  exact coords, 3 prisoners, hostile watchman (33,10).
  `des.wallify()` → `wallify_map` on splev extents.
- Fila/filb: mines fg="." bg=" " smoothed/joined/walled with omitted
  lit key, noflip (flip skipped), stairs → objects (7/11) → traps
  (4/4) → hostiles in lua order (fila 5 soldiers+H+C; filb
  soldier+2 captains+2H+C+s).
- Checked and cleared: filb `splev_create_monster('s', 0)` vs lua
  `des.monster("s")` (no peaceful key) looks hostile-vs-default, but
  C default is BOOL_RANDOM→`makemon` default (`sp_lev.c:3293`,
  `:2126`) and `makemon` defaults to `peace_minded`
  (`makemon.c:1299`), FALSE for spiders — explicit 0 and default
  coincide. Benign.
- Doc nit (prose only, code complete): D-log/docstring say "19
  ordinary rects"; actual count is 24 in both lua and JS.

Hallucinations / overclaim: none — hidden verify labeled vacuous
explicitly, which is what the proxy instructs for 0-block rows.

Density: 536 insertions for 4 loaders (one quest family); splitting
strt out is exactly the §2b-compliant call.

Verification: D-log `verify.mjs --fn makemaz` → PASS (syntax, rule2,
green 2/2, strict, cohort 7/7, full 44/44 auto) + embedded-map probe
(which caught and fixed a drafted Tou-strt row before the split).
Re-measured myself: `hidden-proxy.mjs verify makemaz --base
803a82c3~1` → 0 blocked at baseline and HEAD → vacuous, shipped on
public gates per the proxy instruction. No banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
