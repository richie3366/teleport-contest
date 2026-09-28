# Review 2022 — 000445a8b — hack.c spot_checks + dump_weights

Metadata: SHA `000445a8b`, D-3062, js/hack.js (+147/−~8) + js/dig.js
(+17) + js/trap.js (+10/−) + scripts/spot-checks.test.mjs (+186,
committed). Two-function same-C-file cluster. Per-function blocks
below; SHA verdict is the worst of them.

## Intent vs deliverable

Subject promises "spot_checks + dump_weights". Diff actually adds
both exports (+ file-local `cmp_weights`, + `dump_weights_lines`
builder), wires `blow_up_landmine` `:3218` and every `dighole` exit,
and ships an 11-case harness. Matches promise.

## Inventory

- `spot_checks` (new export js/hack.js:3836, sync) — C hack.c:4524–4547.
- `cmp_weights` (new file-local js/hack.js:3862, sync) — C
  hack.c:4485–4493 (staticfn → file-local ✓).
- `dump_weights_lines` (new export js/hack.js:3889, sync) +
  `dump_weights` (new export js/hack.js:3942, sync) — C
  hack.c:4420–4483.
- Wiring: 13 `spot_checks(dig_x, dig_y, old_typ)` sites in dighole
  (grep-counted ✓) + trap.js `:3218` (`void old_typ` removed).
- No deleted symbols, no clone→import re-points.

## C ↔ JS fidelity

`spot_checks` vs C `:4524–4547`: new_typ/db_ice_now init ✓;
DRAWBRIDGE_UP arm (mask check) with FALLTHROUGH into ICE ✓;
`(new_typ != old_typ) || (old == DB_UP && !db_ice_now)` ✓;
spot_time_left gate → spot_stop_timers ✓; obj_ice_effects(x,y,false)
✓; break ✓. Callees all LIVE sync (mkobj.js:1625/1634/3563). C
callers dig.c:1022 + trap.c:3218 (grep-confirmed; csym body ranges
cited) — both wired ✓. C dighole has exactly two returns (:902 isok
early-out, :1023 post-spot_checks) — verified by awk — so "every
path but :902" is TRUE, and JS mirrors it: the `:902`-equivalent
`if (!isok) return false` carries no call ✓, all 13 other exits do
✓. Verdict: exact.

`dump_weights` vs C `:4420–4483`: alloc→[] ✓; decl_globals_init +
init_objects in C order ✓ (both LIVE sync, js/decl.js:82,
js/o_init.js:265); monster loop (LONG_WORM_TAIL skip, (int)cwt,
idx/wtyp = 1, G_UNIQ unique bit, `%07u` padStart ✓,
CapitalMon(pmnames[NEUTRAL]) with NEUTRAL = 2 = C `enum mgender`
(monflag.h:214) ✓, 'the body of ' + cm?the:unique?bare:an nest in C
`:4447–4449` order ✓); object loop (slime-mold literal per D-3061,
`wt && oc_name` gate, oc_unique, `oc_name_known = 1` mutation as in
C, simple_typename, `%07u` + the/an ✓); sort(cmp_weights) with
strcmp-on-nm (`wt−wt` stays commented out in C too ✓); header ✓;
rows `    %7u%s /* %*s */` with −49 → padEnd(49), last-row ' '/‘,’
✓, nm[7:] slice ✓; `};` + blank ✓ (raw_print→raw_printf named —
raw_print unported ✓); freedynamicdata `:4482` named (by-design
save-freeing) ✓. Callees: mons, pmnames, objects, objectNames,
objectNameStrs, the/an, CapitalMon (objnam.js:1603), simple_typename
(objnam.js:3880), raw_printf (display.js:8157 sync) — all LIVE.
C caller earlyarg.c:539 (verified by sed) stays a named omit in
js/earlyarg.js:281 ("wiring it is earlyarg.c's row") — allowed per
the callers-table rule; Ledger `partial` is honest. Verdict: exact
body, caller named.

Debt note (not a C-wrong, not queued): js/earlyarg.js:281 still
reads "Named omission: hack.c:4421 dump_weights" with no note the
function is now live — same stale-cite class as D-3061's :3181
miss. One-line refresh for the next touch.

sym.mjs (all new edges): spot_time_left / spot_stop_timers /
obj_ice_effects / raw_printf / simple_typename / CapitalMon /
decl_globals_init / init_objects — all sync LIVE. Nothing deleted
or re-pointed.

## Hallucinations / overclaim

None. The "13 dighole returns" and "single-exit C, :902 excepted"
claims both re-verified true. The qsort-vs-sort stability note is
accurate (ties unspecified in C).

## Density

Two whole hack.c functions + dual-file caller wiring + harness,
~174 `js/` insertions. Same-file closure per §2b, each with Ledger
entry (`spot_checks ported; dump_weights partial`) and Verify line.
Right-sized.

## Verification

Re-measured both (`--base 000445a8b~1 --reach-all`): 0 blocked +
24/24 smoke REACH-OK each — matches the D-log, honestly vacuous.
Re-ran the harness: `node --test scripts/spot-checks.test.mjs` →
11 pass / 0 fail. Banned-pattern grep: clean outside CURRENT
boilerplate. No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
