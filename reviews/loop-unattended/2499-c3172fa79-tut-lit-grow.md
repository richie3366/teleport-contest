# Review 2499 — c3172fa79 — tut lit rect grow (D-3618)

SHA: `c3172fa79` — cliffs-head read_engr_at writer lspo_region. D-3618.

## Intent vs deliverable

Promise: baked tut-1/tut-2 `des.region(area(1,1,73,16),"lit")` inlines lit
the ungrown rect, leaving the map's wall ring unlit (blank at tty r4c7–15);
C grows the selection one cell before `sel_set_lit`. Fix grows both loops to
(0,0)-(74,17): 5 PASS + 3 moved.

Diff actually adds: `js/mklev.js` (+11/−5, two loop bounds in `load_tut1` /
`load_tut2`) + `scripts/tut-lit-grow.test.mjs` (1 case). No other `js/`.

## Inventory

- `load_tut1` lit loop (`js/mklev.js:20169`, changed) — C `sp_lev.c:5612–5630`
  2-arg `lspo_region` + `dat/tut-1.lua:55`. Status: fixed.
- `load_tut2` lit loop (`js/mklev.js:20548`, changed) — same C arm +
  `dat/tut-2.lua:18`. Status: fixed.

## C ↔ JS fidelity

C `sp_lev.c:5612–5630` (argc==2 arm): `rlit = checkoption("lit")` over
`{"unlit","lit"}`; `if (rlit) selection_do_grow(sel, W_ANY)` (`:5624–5626`);
then `selection_iterate(sel, sel_set_lit, &rlit)`. `selection_do_grow`
(`selvar.c:321–357`) adds the full 8-neighborhood ring, clamped to the map —
so `area(1,1,73,16)` becomes exactly (0,0)-(74,17), matching the new loop
bounds (`ystart..ystart+17`, `xstart..xstart+74`, clamped by `< ROWNO/COLNO`).

`sel_set_lit` (`sp_lev.c:5535–5540`) is `lit = (IS_LAVA(typ) || lit) ? 1 : 0`;
neither tut-1.lua nor tut-2.lua contains lava, so plain `loc.lit = true` is
exactly equivalent — the lava-equivalence claim holds. Grow is 2-arg-only:
`selection_do_grow` has a single call site in C (`:5625`), so the table-form
`des.region` sites are correctly untouched, and the unlit arms (rlit=0, no
grow) still run after in .lua order — `match("#"/" ")` at `mklev.js:20269–71`
(lua:122–123), `area(53,1,59,3)` at `:20472–77` (lua:325). Quest-loader
2-arg lit inlines deliberately left ungrown are named in the D-entry with
per-site observability notes (Kni-loca flagged as the next visible one) —
named omissions, not silent stubs.

Helper class: baked .lua-des inlines (no callee import involved); the shared
`lspo_region` (`mklev.js:2095`) was already whole. No clone touched. No
FORCE/DIAG/seed/coordinate in the hunk.

## Hallucinations / overclaim

None. The odd "Monk-94139 → js-throw@161" line is explicitly caveated in the
D-log, and `hidden-proxy show` confirms `error: null`, kind=screen,
owner=null, JS topline `Really save? [yn] (n)` vs C `""` — a null-owner
rendering artifact in verify output, not a throw. (Verify's label is a
tooling nit, out of scope for Must-fix.)

## Density

Cliff commit, own head (`engrave.c` read_engr_at, 9 blocks) per its HEAD
queue; writer correctly chosen (owner proven faithful by D-3236). Ledger:
`lspo_region ported` (was already ported; D-3618 appended) — fine. The
Knight-94259 boulder residual became a live `[measure]` row rather than a
third patch — correct cliff discipline. The "masked-not-regressed" argument
for the three moved sessions (RNG fully matched post-fix; lit draws no RNG)
is sound: matched RNG totals under fixed keys rule out control-flow
divergence from flag-only changes.

## Verification

Re-measured: `hidden-proxy.mjs verify read_engr_at --base c3172fa79~1
--reach-all` → `6 PASS, 2 moved past, 1 unchanged, 0 worse → PROGRESS`
(all 5 D-log PASS sessions still PASS; Monk-94079 now PASS via the later
D-3622, whose bullet names it; Samurai-94239 still display_pickinv@78;
Knight-94259 still read_engr_at@4; Monk-94139 still the @161 save-prompt
screen); smoke reach 24/24 → REACH-OK. A strict superset of the D-log claim,
0 worse. Unit test: 1 pass, 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
