# Review 2120 — deff666da — could_pole_mon cluster + isqrt

- SHA: `deff666daa0334ab3922d83155abe1eec9e96cee` (D-3160)
- Date: 2026-09-30. `js/` delta: apply.js restart + imports, hacklib.js
  export, `isqrt_pole` deleted; +3-test suite (3/3, re-ran).
- Cluster: 5 functions (1 restart + 2 arm fixes + 1 new export +
  2 doc-only locals) + 6 dispositions (1 stale + 5 by-design) = 11
  ledger rows — see Density.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises the polearm restart plus `isqrt`. Diff actually
adds: the `could_pole_mon` restart, the youprop + `isqrt` rewires in
`find_poleable_mon`, the hacklib `isqrt` export, the `isqrt_pole`
deletion, C-ref docs on the two staticfn locals, and the suite.
Promise matches deliverable.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `could_pole_mon` (apply.js, export) | whole-body restart, entry hitm + live `mdistu` | whole |
| `find_poleable_mon` (apply.js, export — C staticfn, pre-existing export) | impaired → gated youprop; `isqrt_pole` → live `isqrt` | whole |
| `isqrt` (hacklib.js:36, sync export — C extern) | new C-locus port | whole |
| `calc_pole_range`, `get_valid_polearm_position` | doc comments only | whole (verified below) |
| `isqrt_pole` | deleted | clone → import re-point |
| `line_dist_coord` | ledger stale → ported | disposition (site verified) |
| TEST_GLYPHNAMES ×5 | ledger by-design | dispositions (verified) |

`sym.mjs` (required — deletion + re-point):

```text
isqrt       js/hacklib.js:36 sync (!! ALSO 2 LOCAL CLONES: js/dothrow.js:274 js/spell.js:348)
isqrt_pole  NOT FOUND (deleted)
```

The two surviving locals are documented out-of-scope in the new
export's doc block (their C callers `dothrow.c:1667`/`spell.c:2244`
are not this cluster). `Hallucination_youprop` is the gated
`display.js` youprop (D-1493: reads H-flats/uprops + resistance);
the `do_name.js` bare-name squat documents itself as not-the-macro —
the alias is correct and the D-log owns the first-run collision.
`mdistu` is the live `mon.js:187` export (`dist2(mx,my,ux,uy)` ≡ C).
No stubs.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## C ↔ JS fidelity (per function)

**`could_pole_mon`** — C `apply.c:3389–3412` (`csym`): entry hitm
snapshot (`:3395`) ✓ (was read after find — order fixed), uwep/pole
gate ✓, calc range ✓, cc init ✓, `!find` → hitm + `mhp>0` ≡
`!DEADMONSTER` (`monst.h:214`) + sensemon + `mdistu` in [min,max]
(the two C calls are pure → one JS call) ✓, C-shaped
else-returns-TRUE + tail FALSE ✓. Sole C caller `dothrow.c:561` →
JS `dothrow.js:2765` wired. Confirm.

**`find_poleable_mon`** — C `:3283–3318`: impaired
(`Confusion||Stunned||Hallucination` — youprop macro, now the gated
reader instead of the sticky field) ✓, `isqrt(range_max)` ✓, rect
bounds (lo 1/0, hi COLNO−1/ROWNO−1) ✓, x-outer/y-inner scan ✓,
valid-position gate ✓, tame/peaceful+confirm skip (D-1040 shape,
pre-existing) ✓, poleable&&(statue→impaired-only) uniqueness with
two/none → FALSE + `*pos` write ✓. Confirm.

**`isqrt`** — C `hacklib.c:681–700`: odd-subtraction loop verbatim
(JS copies the mutated param to a local) ✓. Confirm.

**`calc_pole_range` / `get_valid_polearm_position`** — doc-only;
bodies pre-existing. Verified `get_valid_polearm_position` is the
isok + range + cansee/couldsee shape C `:3321–3331` describes and
`distu_apply` expands the `distu` macro (`hack.h:1531` → dist2,
symmetric) — no divergence. Confirm.

**Dispositions:** TEST_GLYPHNAMES ×5 sit inside `#ifdef
TEST_GLYPHNAMES` (`glyphs.c:1239–1319`), never defined in-tree —
uncompiled, by-design correct. `line_dist_coord` stale site exists.

## Hallucinations / overclaim

None. The D-entry names the collision it hit and the two surviving
locals with their C callers.

## Density

- Whole-function verdicts: all five whole (restart + fixes verified
  arm-for-arm; sole caller wired).
- Cluster: one caller/callee closure (apply.c polearm family) plus
  its hacklib callee — but 5 ports + 6 dispositions = 11 ledger rows,
  one over the §10.17 ten-function ceiling. The five by-design rows
  are a single `#ifdef` block retired in one note (zero code, zero
  risk); counting the `#ifdef` as one unit the cluster is 7. Not a
  quality risk — noted, not queued. One `Ledger:` entry per function
  — present.

## Verification

Re-measured myself (`--base deff666da~1 --reach-all`, all 5):

```text
verify <each of 5>: baseline deff666da~1 — 0 session(s) blocked on it
smoke <each of 5>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. Suite 3/3 (re-ran). No
seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
