# Review 858 — eed83e3c — mkmaze.c makemaz Tou-strt (D-1888)

Metadata: SHA `eed83e3c`, D-1888. Files: `js/mklev.js` (+~180:
loader + dispatch arm + `LOW_BOOTS`/`HAWAIIAN_SHIRT` consts +
docstring row). Next index 858.

Intent vs deliverable: subject promises Tou-strt (Tourist 4/5 → 5/5),
split from D-1887 on size grounds. The diff delivers the loader +
dispatch; no new module edges.

Inventory: file-local `load_tou_strt`; callees pre-existing LIVE.
Two otyp consts added.

**C ↔ JS fidelity** (confirm):

- Map byte-identical (20 lines incl. the `\\`-escaped backslash door
  row — re-measured with node).
- Flags solidfill-STONE + mazelevel/noteleport/hardfloor, matching
  the lua `level_flags` line.
- Morgue (14,1,20,3) unlit `filled=1` → FILL_NORMAL (correct
  raw-value mapping, same as D-1887's rooms).
- 7 unlit + 1 lit selection rects in lua order:
  (7,10,11,12),(4,16,8,18),(17,16,21,18),(27,2,32,4),(34,2,39,4),
  (41,2,53,4),(55,2,60,4) unlit + (62,2,67,4) lit.
- Down stair (66,3); whole-map nondiggable; 18 doors in lua order
  (11 locked + 4 closed + 3 `D_ISOPEN` for lua "open" — verified
  against the lua door block line by line, including the trailing
  (35,7),(36,7) locked pair).
- Siege in lua order: 12 spiders + 2 s + 8 centaurs + C.
- Twoflower at (64,3) with `splev_discard_default_minvent` +
  `l_create_object`/`mpickobj` give-pattern (Sato/Hippocrates idiom);
  id resolution verified against `objects.h:700`
  (`BOOTS("low boots","walking shoes")` — the lua description-id
  resolves to LOW_BOOTS, unambiguous in the table) and `:603`
  (`ARMOR("Hawaiian shirt",NoDes)` → HAWAIIAN_SHIRT), spe 3 both.
- Chest at (64,3); 11 guides + 2 watchmen + eel/2 piranhas/2 krakens
  at exact lua coords; 9 `splev_create_trap` (lua has 9 `des.trap()`).
- Post-flip single-cell branch `place_lregion` at (68,14) — same
  Kni/Sam-strt shortcut noted in review 855(b): C flips lua-placed
  lregions, shared unmeasured question, no corpus block, and D-1890
  now carries it as a named omit. Not a Keep'd C-wrong here.

Dispatch: the `Tou-strt` arm sits in `load_special_proto` order with
the other four Tourist arms; the makemaz docstring row lists all five.
`sym.mjs load_tou_strt` → file-local single definition (same-file
dispatch — no clone question).

Two series-wide observations carried here (both unmeasured, no corpus
reach, noted — not queued): (a) the leader-invent `give()` burns
floor-placement RNG draws C never makes (C creates into invent via
the container context; JS creates at a random floor spot via
`l_create_object` then `obj_extract_self` + `mpickobj`) — shared
Sato/Hippocrates/Twoflower/Orion idiom, identical in all four
loaders; (b) the post-flip branch levregion (see fidelity note
above). Both need a quest-level corpus falsifier before any port
touches the shared shape.

Hallucinations / overclaim: none — hidden verify labeled vacuous
explicitly.

Density: one loader, right-sized; the D-1887 split is §2b-compliant.

Verification: D-log `verify.mjs --fn makemaz` → PASS (syntax, rule2,
green 2/2, strict, cohort 7/7, full 44/44 auto) + runtime map probe
(20×76, `\\` unescaped, CRLF stripped). Re-measured myself:
`hidden-proxy.mjs verify makemaz --base eed83e3c~1` → 0 blocked at
baseline and HEAD → vacuous, shipped on public gates per the proxy
instruction. No banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
