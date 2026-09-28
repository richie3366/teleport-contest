# Review 1973 — 8b6526ecd — show_glyph guard/diagnostic arms

Metadata: SHA `8b6526ecd` (D-3013). Scored diff: `js/display.js` only
(+76/−~5). Subject promises: port C `display.c:1886` suppress gate +
`:1894–2000` bad-pos/bad-glyph diagnostic arms into `show_glyph_cell`, add
exact-C `glyph_is_normal_generic_obj`, retire `wall_angle`/`flush_screen`
stale.

## Intent vs deliverable

Promise: the suppress `return`, the full `:1906–1990` offset chain with
per-arm `:line` cites, both `impossible` reports, the new helper.
Diff actually adds exactly that; the live paint body below is untouched.
Promise kept.

## Inventory

- `glyph_is_normal_generic_obj` (js/display.js:901, new export): 1
  function, 3 lines.
- `show_glyph_cell` (js/display.js:~4020): guard arms prepended ahead of
  the existing `game.level?.at` read.

## C ↔ JS fidelity

### Offset chain + suppress gate — verdict: exact-C, ACCEPT

Checked against `nethack-c/upstream/src/display.c:1876–2072` (csym range)
arm-for-arm. C head:

```c
/* don't process map glyphs when saving, restoring, or in_mklev */
if (_suppress_map_output())
    return;
/* column 0 is invalid, but it's often used as a flag, so ignore it */
if (x == 0)
    return;
```

JS: `if (suppress_map_output()) return;` first, then the `!isok` branch
with the `x === 0` silent return — identical. The `:1906–1990` chain
reproduces all ~40 arms **in C order** (invalid → nothing → unexplored →
piletop statues/body/obj → statues → warning → 8 explosions → swallow →
cmap C → zap → cmap B → altar → cmap A → soko/knox/geh/mines/main/stone →
obj → ridden → body → detect → invis → pets → monsters), both generic
ternaries present with exact macro semantics. Both `impossible` format
strings exact, including the double space in `show_glyph:  bad pos`, and
the `return` after each report matches C (`:1994`, `:2000`).

`glyph_is_normal_generic_obj` matches `display.h:839–840` exactly:

```c
#define glyph_is_normal_generic_obj(glyph) \
    ((glyph) > GLYPH_OBJ_OFF && (glyph) < GLYPH_OBJ_OFF + FIRST_OBJECT - 1)
```

```js
return g != null && g > GLYPH_OBJ_OFF && g < GLYPH_OBJ_OFF + FIRST_OBJECT - 1;
```

RNG: none in these arms in C, none added.

### Deliberate adaptation — bad-glyph NO_GLYPH gate, ACCEPT (documented)

C `:1996–2000` fires unconditionally on a valid location with
`glyph < 0 || glyph >= MAX_GLYPH` (and C `NO_GLYPH == MAX_GLYPH`). JS
gates on a real integer id, skipping `NO_GLYPH`/id-less pre-decoded
paints. On every C-reachable input (C callers always pass a banked int)
behavior is identical; without the gate, JS-only id-less paints would
spuriously report. Code-commented + D-log-described, zero screen effect
on reachable states. A correct adaptation for the split-caller
convention, not a silent divergence.

### Callee closure — all LIVE

Required `sym.mjs` outputs:

```text
glyph_is_normal_generic_obj js/display.js:901   sync
suppress_map_output js/display.js:4940   sync
impossible       js/display.js:8407   ASYNC — await required
```

`isok` resolves to the const.js export (display.js:69 import,
`from './const.js'`), whose body
(`x >= 1 && x <= COLNO-1 && y >= 0 && y <= ROWNO-1`) is byte-identical to
C `cmd.c:4325–4330` — the D-log's "verified identical" claim holds
(inspected both bodies; the pre-existing const/hacklib duplicate-export
situation is untouched by this SHA). `impossible` is awaited; no clones,
no stubs, no new import edges.

### Stale flips — ledger bookkeeping, omits retained

`flush_screen` partial→ported (body pre-existing per D-2493, sole omit
carried in the ledger note); `wall_angle` partial→ported with the six
cite-only `impossible` arms carried in the note (body split across
file-locals per D-2608). Pre-existing bodies, omits retained in writing —
no silent stub.

## Hallucinations / overclaim

D-log claims "zero screen effect on reachable states" — true (both
reports fire only on invalid input). No "Match C" claim over a stubbed
callee. Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate logic.
Rule #2 clean (run this iteration; no imports touched here).

## Density

Breadth-phase: one function's guard arms whole + one exact-C helper + two
stale retirements, ~70 insertions. Complete as scoped (the int→paint core
stays explicitly Named behind the glyphmap table). Not quality-risk.

## Verification

Re-measured
(`hidden-proxy.mjs verify show_glyph,wall_angle,flush_screen
--base 8b6526ecd~1 --reach-all`):

```text
smoke show_glyph/wall_angle/flush_screen: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked at baseline ×3 — vacuous, honestly labeled in D-log as coverage
rows. Zero REGRESSED. D-log's full-44/44 on the shared file stands
(fortress still 44/44 per CURRENT).

## Actionable C-wrongs

None.

Ledger: `show_glyph` split (guard arms in `show_glyph_cell`; int→paint
core Named), REACH-OK via smoke.
Verify lines: hidden vacuous ×3 (honest) + smoke REACH-OK +
green/cohort/full per D-log, re-run confirms.

Verdict: **ACCEPT**
