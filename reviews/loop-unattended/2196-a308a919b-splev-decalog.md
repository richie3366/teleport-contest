# Review 2196 — a308a919b — sp_lev decalog: exclusion rework + location failure arms

Metadata: SHA `a308a919b`, D-3235, js/mklev.js only (+54/−35),
10-fn single-file cluster. Parent baseline `6c82dd6e1`.

## Intent vs deliverable

Subject promises: "lspo_exclusion C-order rework + get_location
failure arms + pm_good_location (coverage)". Delivered exactly that,
plus 7 same-file siblings declared whole under split names and one
do.c stale (`better_not_try_to_drop_that`, review 930). The
below-~80 size is disclosed with a file-exhaustion justification and
a 0-row-block corroboration. No scope drift.

## Inventory

- `lspo_exclusion` restarted in C order: `create_des_coder`,
  `lcheck_param_table`, live `ez_types` option index, unpacked
  region, `game.gc.coder.croom`, prepend. Local `EZ_TYPES` deleted.
- `get_location_random`: total-failure arm now `NO_LOC_WARN → -1,-1`
  else `void impossible("get_location:  can't find a place!")` +
  keep last scan cell (was: maze-max).
- `get_location_in_room`: last-try scan unconditional; then
  `NO_LOC_WARN → -1,-1` else impossible + `{croom.hx, croom.hy}`
  (was: scan skipped under NO_LOC_WARN, bare -1,-1).
- New `pm_good_location` (1-liner) + `priestini` rewire (was inline
  `is_ok_location(px, py, DRY)`).
- Declared-whole splits: `get_location` main, `spo_end_moninvent`,
  `noncoalignment`, `mapfrag_canmatch`, `get_traptype_byname`,
  `update_croom`, `flip_dbridge_horizontal/vertical`.

## C ↔ JS fidelity

`lspo_exclusion` — C sp_lev.c:5497–5532. JS order matches:
create_des_coder (:5510), lcheck (:5511), option index into the
4-entry table (:5512–5513; `luaL_checkoption` throws on unknown like
C — verified js/dungeon.js:293; all 9 baked sites pass
'monster-generation'), unpacked region (:5514), two location calls
with `ANY_LOC|NO_LOC_WARN` + coder croom (:5516–5525), prepend
(:5529–5530). `opts.croom` removal is C-faithful: C reads only
`gc.coder->croom`, and no baked caller passed `croom` (all 9 grep'd:
`{type, region}` only). Direct `get_location` in place of
`get_location_coord` is equivalent here: C :1336–1353 shows
non-random packed coords take exactly one `get_location` call with
defhumidity and no double-try. Verdict: exact.

`get_location` — C sp_lev.c:1202–1269. The reworked arms are C-exact:
the last-try scan is unconditional in C (:1242–1250 — the old JS
gate was the C-wrong); on total failure C keeps the last scan cell
(`*x=mx+xx` leaves `mx+sx-1, my+sy-1`) with impossible (:1251–1255),
which is `{x,y}` in the map half and `{croom.hx, croom.hy}` in the
room half; `NO_LOC_WARN` yields -1,-1. Impossible string matches
byte-for-byte (two spaces). Packed arm (`x>=0` origin add) and the
ANY_LOC/isok clamp (:1260–1268, warning kept commented) verified
live in the main body. RNG: `rn2(sx)/rn2(sy)` and somexy dispatch
unchanged. Verdict: exact.

`pm_good_location` — C sp_lev.c:1310–1314, 1-liner, exact. Sole C
caller priest.c:236 confirmed; JS `priestini` now calls it with
in-scope `prim` (HIGH/ALIGNED_CLERIC). Neutrality: `pm_to_humidity`
returns DRY for traitless S_HUMAN (all trait gates live mondata
checks; D-log probed both clerics). Verdict: exact.

`spo_end_moninvent` — C :3030–3036. Split live at `l_create_monster`
(:23292–23295: m_dowear-if-set + clear, exact) and baked loaders
(Pelias :6590 spot-checked: m_dowear after custom invent). Verdict:
whole across split.

`noncoalignment` — C :1851–1860. JS :21761: `rn2(2)`, `!alignment →
k?-1:1`, else `k?-alignment:0`. Caller `sp_amask_to_amask` :21777
wired. Exact.

`mapfrag_canmatch` — C :274–278. Inline at :1918 as the negated odd
test inside `mapfrag_error`, matching C :287's use. Exact.

`get_traptype_byname` — C :4378–4388. `lspo_traptype_byname` :1486:
lowercased loop (≈ strcmpi for ASCII names), NO_TRAP default.
Exact.

`update_croom` — C :6323–6333. JS :3076: coder guard, n_subroom
top-of-stack else NULL. Exact.

`flip_dbridge_horizontal/vertical` — C :427–439/:441–453. JS
:19286/:19297: IS_DRAWBRIDGE gate, W↔E / N↔S mask mirrors, exact
bit ops with C line cites. Exact.

Helpers: `get_table_option` (dungeon.js:423 sync export), `impossible`
pre-existing edge, `void`-unawaited per sync precedents. Deleted
`EZ_TYPES` confirmed gone (no other refs). `sym.mjs` notes
`lcheck_param_table`/`create_des_coder` as single locals — they are
the C nhlua/sp_lev helpers' sole homes, not drift. Stale do.c row:
export now js/do.js:2687, caller :2939 (shifted from cited :2640/:2892
by later commits — same symbols). No stubs, no clones added.

## Hallucinations / overclaim

None. "NOT corpus PASSes" is said twice; vacuous notes disclosed;
probes disclosed as /tmp scratch with the no-harness note.

## Density

10 functions, one C file, ≤10 cap met, no Must-fix bundled. Per-function
C-locus, Callers, Verify and Named-omissions bullets plus individual
`Ledger:` entries all present. Below-guideline size justified by
file exhaustion (remaining sp_lev.c unknowns measured-ok or
#if 0/Lua-only/caller-unported — named, not hand-waved).

## Verification

- Banned-pattern grep on the js diff: clean. Rule #2 covered by the
  iteration-wide `imports.mjs --rulecheck` (clean).
- Re-measured all 10 in one call with `--base a308a919b~1 --reach-all`:
  every function "0 session(s) blocked" (vacuous, as logged) and
  REACH-OK — get_location 114/114 reaching baseline-PASS (D-log's
  80/80 was the spread-capped default; --reach-all runs all 114),
  other nine smoke 24/24 each. Zero regressed. No false PASS claim.
- Failure arms are total-failure-only, unreached by any session;
  probe-proven per D-log. No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
