# Review 1325 — 035b9842 — melt_ice deferred arms + trap_ice_effects (D-2359)

Metadata: SHA `035b9842`, `js/trap.js` (+20: new `trap_ice_effects`) and
`js/zap.js` (melt_ice arms + import extends). No new modules. D-log:
D-2359, debt-named row, 0 sessions blocked on all five names.

## Intent vs deliverable

Subject promises four latent C-wrongs fixed in otherwise-live `melt_ice`
(trapped-mon free / landmine-or-beartrap convert / other-trap remove;
Underwater `vision_recalc(1)`; boulder settle loop; hero `spoteffects`)
plus arm-for-arm re-verification (no change) of `start_melt_ice_timeout`,
`melt_ice_away`, `burn_floor_objects`. Diff actually adds exactly those
four arms and retires the three `deferred` comments; `burn_floor_objects`
hunk is docstring-only. Matches the promise.

## Inventory

- `trap_ice_effects(x, y, ice_is_melting)` — new exported async in
  `js/trap.js:702` (C home: next to `undestroyable_trap`). C callee
  (real C function), not a clone.
- `melt_ice` — four arms wired in C position; `minliquid` dynamic import
  replaced by the existing static `./mon.js` edge; `spoteffects` joins a
  pre-existing static `pickup.js` edge (`--can`: ALREADY, no new edge).

## C ↔ JS fidelity

`trap_ice_effects` vs C `trap.c:7175–7194` (range cited from the doc;
body re-read above): `t_at` null-gate + `ice_is_melting` conjunct →
`m_at` + `mtrapped` set 0 → LANDMINE/BEAR_TRAP `cnv_trap_obj(otyp, 1,
ttmp, TRUE)` with the falls-into-water comment → else
`!undestroyable_trap` → `deltrap`. Conjunct-for-conjunct. Confirm.

`melt_ice` vs C `zap.c:5040–5079` (body re-read above): convert →
`spot_stop_timers` → `if (t_at) trap_ice_effects(TRUE)` → 
`obj_ice_effects` → `unearth_objs` → Underwater `vision_recalc(1)` →
`newsym` → `cansee||u_at` Norep → boulder `An(xname) settles...` +
extract/`boulder_hits_pool`/impossible loop → trailing `newsym` →
`u_at ? spoteffects(TRUE) : is_pool&&m_at ? minliquid`. JS `for(;;)`
with `if (!is_pool) break; otmp = sobj_at; if (!otmp) break` is exactly
C's `do...while (is_pool && (otmp = sobj_at) != 0)` short-circuit.
Branch-by-branch confirm.

Callee closure: every name in the new arms (`t_at`, `m_at`,
`cnv_trap_obj`, `deltrap`, `undestroyable_trap`, `vision_recalc`,
`boulder_hits_pool`, `impossible`, `sobj_at`, `obj_extract_self`,
`spoteffects`, `minliquid`) is a live import; no stub in a live arm.
`sym.mjs trap_ice_effects` → `js/trap.js:702 ASYNC`, awaited at the one
call site. Confirm.

## Hallucinations / overclaim

None. D-log marks the verify vacuous explicitly and discloses the probe
seeding (`initRng(1234)` probe-only) plus the LANDMINE-only coverage of
the shared LANDMINE/BEAR_TRAP path (same code path, acceptable).

## Density

Two files, one C locus family (`trap_ice_effects` + its sole caller
arm) — right-sized per §2b.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coords`: no hit.
- `imports.mjs --can js/zap.js ./pickup.js spoteffects` → ALREADY (no
  new edge); Rule #2 covered by the iteration-wide `--rulecheck` (clean,
  cited in 1324).
- Re-measured: `verify melt_ice --base 035b9842~1` → `0 session(s)
  blocked (0 at baseline, 0 working)` — vacuous as disclosed; row cited
  0 blocks so no older `--base` owed. Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn melt_ice` → VERIFY:
  PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
