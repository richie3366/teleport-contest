# Review 1350 — d6462205 — back_on_ground surface matrix + ice_descr

- SHA: `d6462205`, D-2384. JS files: `js/trap.js` only (+85/−13).
- Prior reviews closed: none (Open queue row; 0 blocks).

## Intent vs deliverable

Subject promises the full `back_on_ground` wording matrix plus a new
exported `ice_descr`. Diff delivers exactly that: matrix arms in C
order, the verbose/`Back` gate, the `ICETYP` table + `ice_descr`, and
four import-line extensions (`surface`, `spot_time_left`, `SURFACE_AT`,
`is_ice`). Promise matches diff; no scope creep.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `back_on_ground` (trap.js) | changed, C `trap.c:4975–5008` | LIVE |
| `ice_descr` (trap.js) | new export, C `pager.c:613–650` | LIVE |
| `surface` (sit.js:475) | C callee (D-2008 home), newly imported | LIVE, canonical |
| `is_ice` (zap.js:869) | C callee, newly imported | LIVE, canonical (5 clones elsewhere, none added) |
| `hero_Levitation/Flying` (trap.js:1456+) | C youprop macros, file-local | LIVE, pre-existing |
| `an`/`the` (objnam.js) | already imported (`trap.js:36`) | LIVE |
| `spot_time_left` / `SURFACE_AT` | newly imported names | LIVE (see --can) |

Required checks: `sym.mjs spot_time_left → js/mkobj.js:1251 sync`;
`SURFACE_AT → js/hack.js:1483 sync`; `is_ice → js/zap.js:869 sync`;
`surface → js/sit.js:475 sync`. Nothing deleted. `imports.mjs --can`
on all four (trap.js → sit.js/mkobj.js/hack.js/zap.js) → ALREADY each —
name-only, no new edges, no TDZ surface. `imports.mjs --rulecheck` →
Rule #2 clean.

## C ↔ JS fidelity

C loci opened with bodies: `back_on_ground` `:4975–5008`,
`ice_descr` `:613–650`, `surface` `dungeon.c:1749–1788` (full 40
lines), `hliquid` `do_name.c:1492–1510`.

- Matrix arm-for-arm in C order: ice-first ✓; floor/ground → "solid
  ground" ✓; bridge/altar/headstone → `an()` ✓; stairs/lava/bottom →
  `the()` ✓; else (cloud/air/air-bubble/wall/fountain/doorway) →
  air?`the()`:an() + preposit `in` ✓. `strcmpi` vs `===` justified: I
  re-read the whole JS `surface()` — air/cloud/pool-bottom/ice/lava/
  bridge/altar/headstone/fountain/stairs/wall/doorway/floor/ground all
  present in C order; the sole gap is the uswallow maw/husk arm, named
  here and in the sit.js D-2008 note (fires only while swallowed).
- `hliquid('lava')` returns `'lava'` non-hallucinating on both sides (JS
  `do_name.js:372`, C `:1492–1510`), so the `=== 'lava'` arm fires
  exactly when C's `strcmpi` arm fires — including the shared
  hallucinated-liquid path, since both sides call `hliquid` before
  comparing. A subtle point the D-log doesn't spell out, but the code
  is right on both sides.
- rescued/verbose gate: `game.flags?.verbose !== false` ≡ C
  `flags.verbose` (default-true; the trap.js idiom) ✓; `last_msg`
  write unchanged ✓.
- `ice_descr`: table strings/order ✓; `r`/`neardist` formula ✓;
  `ice_rating=-1` first ✓; `[ice:%d?]` non-ICE arm with `(lev?.typ|0)`
  ✓; far/unseen → `waterbody_name` with
  `distu>neardist || (!cansee && (!u_at || Levitation))` ✓ (`dist2`
  symmetric; `hero_Levitation()` ≡ C `Levitation`); rating ladder
  thresholds (0/>1000/>100/>50/>14) ✓. Out-param→return justified
  (every C caller uses the return value); the other C callers' JS
  wording explicitly named as own rows.
- Callee closure: all LIVE or pre-existing locals; no STUB in a live
  arm. Named: uswallow arm (shared D-2008 note); other `ice_descr`
  callers (own rows).

## Hallucinations / overclaim

None. "Full surface matrix" holds modulo the one named uswallow arm.
The /tmp 9/9 probe is supplement. No corpus PASS claimed.

## Density

One C function pair, one file, ~85 js lines. Right-sized §2b.

## Verification

- Diff grep `FORCE|DIAG|getRngLog|fastforward` → 0 hits.
- Re-measured: `verify back_on_ground --base d6462205~1` → 0 blocked at
  baseline and working. Matches; no WORSE/relocation.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log accepted (wording-only,
  RNG-free change; corpus half re-run here).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
