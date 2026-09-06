# Review 881 — 373f2920 — mkmap.c finish_map wallify/lit/lava-ice + live MINES cutover to js/mkmap.js (D-1911)

Metadata: SHA `373f2920`, D-1911. Files: `js/mkmap.js` (+71/−17:
canonical `finish_map`, local finish call), `js/mklev.js`
(−440/+~200: 13 cavern clones deleted, `wallify_map` +1 `export`
word, `mkmap` import, 36 functions sync→async with awaits),
review-878 stamp (`Addressed: D-1911`, completing the 878
condition), queue row archived. Next index 881.

Intent vs deliverable: subject promises canonical `finish_map`
plus the live MINES cutover. The diff delivers both, plus the
required async propagation. Promise ≡ diff.

Inventory: 1 new function (`export function finish_map`), 13
deleted clones (`mkmap_init_map/_fill`, `MKMAP_DIRS`, `mkmap_get`,
`pass_one/two/three`, `join_map_cleanup`, `join_map_dig_pass`,
`join_map_fixed`, local `finish_map`, local `mkmap`), 2 re-pointed
to import (`wallify_map` now imported by mkmap.js; `mkmap` now
imported by mklev.js), 36 sync→async.

**C ↔ JS fidelity** (`csym finish_map` →
`mkmap.c:330–363`, 34 lines, read in full): `walled →
wallify_map(1,0,COLNO-1,ROWNO-1)` ✓; lit loop bounds + the exact
4-term `||` (`!IS_OBSTRUCTED` fg/bg, TREE, `walled && IS_WALL`) ✓;
`rlit=1` over `nroom` (null-guard on dense array, unobservable) ✓;
unconditional lava light ✓; `icedpools ? ICED_POOL : ICED_MOAT`
with `const.js:1390–1391` = 8/16 ✓. The retired-clone
C-wrong claim verifies: parent SHA `:17895` reads
`icedpools ? 1 : 2` — real divergence, now fixed. No RNG in
`finish_map` (C draws none) ✓. Callee closure: `wallify_map`
(`sp_lev.c:2864–2891` via csym, live `mklev.js:17662` export),
`IS_OBSTRUCTED`/`IS_WALL` live `const.js` — all LIVE, no stubs,
no new omits. Zero dangling refs: grep of the SHA tree for all 13
deleted names returns nothing.

Cutover audit (the risky half): all 36 newly-async names
enumerated from the diff; every call site in `js/` awaits except
6 `splev_initlev(` calls inside sync `load_bigrm_2/3/4/5/6/11`.
Checked each: 5 pass `LVLINIT_SOLIDFILL`, 1 (`bigrm_11`)
`LVLINIT_MAZE`, and `splev_initlev`'s body contains exactly one
`await` — the MINES-arm `await mkmap(linit)`. Async functions with
no encountered await run fully synchronously, so all 6 calls are
behaviorally identical (floating resolved promises, no suspension).
Fragile-looking but provably safe at this SHA; the D-log should
have named it, but it is not a C-wrong. New `mklev↔mkmap` cycle:
mkmap.js top-level is imports + consts only, bindings used at call
time — cycle-safe, and the live cutover (MINES now runs canonical
code, not dead code) passing full 44/44 proves it loads.

Hallucinations / overclaim: none. "All 30 live MINES sites pass
`icedpools: false`" is consistent with zero session delta and full
greens before/after.

Density: one C locus family + its forced cutover propagation —
the envelope rule's canonical reason for a larger diff. Fine.

Verification: D-log gates PASS (green 2/2 + strict ×2, cohort 7/7,
full 44/44 auto on shared-file change — and this time the shared
change is genuinely live). Re-measured:
`hidden-proxy.mjs verify finish_map --base 373f2920~1` → 0
blocked at baseline and now — vacuous as stated, map-driven row.
Diff grep: no FORCE/DIAG/seed/coordinate patterns.
`imports.mjs --rulecheck` → clean (at HEAD). `sym.mjs`: deleted
names gone without orphans; `finish_map` canonical in mkmap.js.

**Actionable C-wrongs**: none. (Nit, not queueable: name the 6
sync bigrm callers in the map so a future await on a non-MINES
`splev_initlev` path doesn't silently float.)

Verdict: **ACCEPT**
