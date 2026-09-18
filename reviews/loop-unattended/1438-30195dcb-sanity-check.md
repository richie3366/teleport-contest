# Review 1438 — 30195dcb — sanity_check_single_mon whole-body port (D-2479)

Metadata: SHA `30195dcb`, `js/mon.js` (+207) + one-word `export`
on `monsndx` in `js/mondata.js`. C `mon.c:56–70`
(`pet_sanity_check`) + `:72–255` (`sanity_check_single_mon`),
both staticfn. D-log: D-2479.

## Intent vs deliverable

Promise: whole per-monster `#sanity` validator + edog helper,
module-local in C order, no clones. Diff delivers that — except
one unbound name on a live arm (below).

## Inventory

- Added (module-local, matching C staticfn): `pet_sanity_check`,
  `sanity_check_single_mon`.
- Import widening only (const/monsters/mondata/do_name/trap/
  hack/monmove/worn/apply edges); one-word `export` on `monsndx`.
- `sym.mjs` (required): `monsndx → js/mondata.js:124 sync`
  (single definition, no clones); `enexto`/`accessible`/`mongone`
  N/A here. New edge `get_mleash` (apply.js:1289): `imports.mjs
  --can` reports mon.js already statically imports apply.js — no
  new edge, call-time use only, no TDZ risk. No deleted symbols.

## C ↔ JS fidelity

Walked C `:56–255` arm-by-arm against the diff — exact except item 1:

- pet check (droptime vs `game.moves`, TODO kept), range arm
  (pointer comparison → `mndx < LOW_PM || > NUMMONS-1`;
  HIGH_PM=NUMMONS-1 confirmed at dogmove.js:1414; `0x` hex per
  D-2375), mnum fixup, HP bounds with the gremlin comment kept
  commented-out like C, dead-monster early return with the `#if 0`
  fmon/guard arm kept commented-out like C, genocided/tame
  (`pmname`/`Mgender`), shk/priest/guard/minion extras, tame→
  `pet_sanity_check`, steed saddle arms (same `ns`/`nt` shape and
  format), worm TODO/`t_at` trapped arm, frozen arm, full hiding
  arm (eel/ceiling/non-pit — ceiling set matches C's five types +
  `accessible` verbatim), full mimic arm (`migr` vs Protection
  arms verbatim — macro `youprop.h:359` is
  H||E-intrinsic||extrinsic, JS reads `uprops[…]` the same —
  non-mimic pose arm, `#if 0` inaccessible-location arm kept
  commented-out like C), leash arms with the `distu>90` `#if 0`
  kept commented-out like C.
- `DEADMONSTER` as `(mhp|0)<1` (do.js idiom); `%u`/`%ld` as `%d`
  (named); `panic` as loud throw (lev_json precedent, `panic`
  itself an unported own-row callee — named).
1. (Must-fix, queued) **`has_egd` used but never imported.**
   `js/mon.js:477` `if (mtmp.isgd && !has_egd(mtmp))` — the name
   appears nowhere in mon.js imports (usage is the only hit); the
   live export exists at `js/const.js:3141` alongside the imported
   `has_emin/has_epri/has_eshk`. Short-circuit means it throws
   `ReferenceError` only when a vault guard is checked — latent
   today (function unwired; C callers `mon_sanity_check` fmon/migr
   sites unported and named), but a guaranteed throw on the first
   guarded `#sanity` run after the caller ships. One-word fix in
   the const.js import line.

## Hallucinations / overclaim

"All callees live" is true of every callee — but liveness ≠
binding, and `has_egd` proves the distinction. Otherwise accurate;
`--can` claim verified (edge pre-exists).

## Density

Right-sized: one C function pair, one module + one-word export.

## Verification

- `hidden-proxy verify sanity_check_single_mon --base 30195dcb~1
  --reach-all` (re-run): 0 blocked both sides (vacuous, as
  stated); smoke 24/24 → REACH-OK. Matches.
- `node --check` + dynamic `import()` of `js/mon.js`: both pass —
  neither catches an unbound free variable (fails only at call
  time on the `isgd` path), which is why the grep above is the
  operative check.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords.

## Actionable C-wrongs

1. (Must-fix, queued) `has_egd` import miss — `js/mon.js:477`
   vs live `js/const.js:3141`; add to the const.js import.

Verdict: **QUALITY-RISK**

**Addressed:** D-2485
