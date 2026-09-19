# Review 1545 — 32dc9380 — mkmaze.c vibrasquare + stolen_booty fidelity (D-2586)

## Metadata

- SHA: `32dc9380`
- D-id: D-2586. Next index: 1545.
- Files: `js/mklev.js` (+48/−17). No script/test files.
- C locus:
  - `nethack-c/upstream/src/mkmaze.c:1041–1093`
    (`pick_vibrasquare_location`), via `node scripts/csym.mjs`
    plus direct read of `:1060–1093`.
  - `nethack-c/upstream/src/mkmaze.c:799–889` (`stolen_booty`,
    staticfn) — cited in JS header, body logic untouched by this
    diff (pre-existing port; cites only).

## Intent vs deliverable

Subject promises a cite-order restart of `pick_vibrasquare_location`,
a named D_DEBUG-only omit, and retiring the `upstart_maz` clone in
`stolen_booty` for the live export. Diff delivers exactly that:
comment-only re-framing plus one clone deletion and one call-site
re-point. No logic lines change except the clone swap. Promise
matches deliverable.

## Inventory

- Restarted/cited: `pick_vibrasquare_location` (`js/mklev.js:18155`,
  export retained).
- Deleted: file-local `upstart_maz` (D-1849-class clone of
  `hacklib.js` `upstart`). Required `sym.mjs` output:
  - `upstart_maz NOT FOUND in js/** (no export, no local
    function/const)` — deletion confirmed, no second copy in mklev.
  - `upstart js/hacklib.js:200 sync` — LIVE single export.
  - Note (pre-existing debt, not this SHA): 8 other local `upstart`
    clones remain (apply, do_name, monmove, mthrowu, pickup, read,
    +2). This commit retires only the mklev one; the rest are untouched.
- Re-pointed caller: `stolen_booty` `:817` gang-cap line
  (`upstart_maz(gang)` → `upstart(gang)`), sole caller — verified the
  only `upstart_maz` use died with the definition.
- Clone equivalence checked independently (not trusted from the
  subject): old `str.charAt(0).toUpperCase() + slice(1)` with `!str`
  guard vs live `highc(charAt(0)) + slice(1)` with null/empty guard.
  `highc` is ASCII-only where `toUpperCase` is Unicode-wide, but the
  input domain is `rndorcname` gang names (ASCII) — benign. Guards
  equivalent (both pass through null/empty unchanged).
- `--can` not re-run (existing hacklib.js import extended — same
  ALREADY pattern); `imports.mjs --rulecheck` clean this iteration
  (see review 1542).
- RNG: `rn1` × 2 per loop iteration both sides (see below).

## C ↔ JS fidelity

`pick_vibrasquare_location` (`js/mklev.js:18155–18192`) vs C
`:1060–1093`, walked in order:

- Margin/distance consts (4/3/11) and `x_range`/`y_range` formulas.
  Match.
- Small-maze guard (`:1069–1072`): C body is `debugpline2` ONLY —
  the condition has no RNG/state effect. Named omit legitimate
  (D_DEBUG-only `ifdebug` pline, D-2586 precedent). Match-by-omit.
- `inv_pos = 0` init, then `do { rn1 pair; if (++trycnt > 1000) break;
  } while (...)`. Match, same order.
- Loop condition: `stairway_find_dir(TRUE)`, row/col/diagonal,
  `distmin <= 11`, `!SPACE_POS`, `occupied` — all six terms present
  in C order. Match.
- Writeback `:1087–1088`. Match.
- `stolen_booty`: no logic change in this diff, so no new fidelity
  claim is owed; the `:817` re-point is the verified clone swap above.

## Hallucinations / overclaim

None. The `christen_monst` no-op-reassign note and the
`DEADMONSTER ≡ (mhp|0)<1` note are documented in-body as JS-array
consequences, not claimed as C text. The `stairway_find_dir`
file-local clone and the `makemaz("")` caller note stay named.

## Density

48 insertions for a cite-restart + clone retire across two same-file
functions — below the ~40 floor only if read as a coverage port, but
this is a fidelity/clone-hygiene iteration on already-live bodies;
the value is the retired D-1849-class clone, not line count.

## Verification

- D-log claims `verify.mjs --fn pick_vibrasquare_location` → VERIFY:
  PASS (coverage row, 0 blocked at baseline — honestly stated).
- Re-ran here (required):
  - `hidden-proxy verify pick_vibrasquare_location --base
    32dc9380~1 --reach-all`
  - → 0 blocked both sides (vacuous note, expected — maze
    Invocation levels unreached in corpus)
  - → smoke 24/24 REACH-OK.
- Claim confirmed, not vacuous-by-rewrite.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
