# Review 2059 — 463ebb0e2 — selection_getbounds canonical export (D-3099)

Metadata: SHA `463ebb0e2`, D-3099, single-function coverage cluster
+ 3 clone retirements. js/mklev.js (+90/−~50), js/cmd.js (+27/−~20),
js/region.js (+2/−21).

## Intent vs deliverable

Promise: canonical `selection_getbounds(sel, b)` export in C order,
retire 3 divergent clones + the lspo inline copy, route every
rect-reading caller through it. Diff delivers exactly that: 1 new
export, 3 deletions, 12 call sites converted to out-param form.
Promise kept.

## Inventory

- `selection_getbounds` (NEW export js/mklev.js:29715): `!sel||!b`
  guard, live selection_recalc_bounds, `(lx|0) >= (wid ?? COLNO)`
  empty test → full map, else stored bounds — out-param writes.
  Sole callee recalc LIVE ✓. No stubs.
- Deleted: mklev selvar_getbounds_rect, region 1-arg
  selection_getbounds (wrong `lx>=COLNO` + invented `!sel`
  full-map arm), cmd look_sel_bounds (no recalc) — all names
  NOT FOUND post-commit ✓. Converted: mklev ×6 (lspo, iterate_lua,
  rndcoord, filter_percent, iterate, filter_mapchar, grow ×2 —
  counting grow's two), cmd ×5, region ×1.
- Edges cmd→mklev, region→mklev: `--can` → ALREADY both (existing
  edges extended) ✓.

## C ↔ JS fidelity

C selvar.c:76–95 (csym range): guard ✓, recalc ✓, `bounds.lx >=
wid` (against sel->wid, not COLNO — the fix over two clones) ✓,
full-map vs stored writes ✓. No RNG in the function.

Call-site audit (all 17 C sites + decl, csym enumerated):

- Wired 14: cmd.c:1200/1218/1251 → cmd.js:3831/3846/3877;
  nhlsel.c:934 → mklev.js:4398; region.c:1323 → region.js:1218;
  selvar.c:335/359 → mklev.js:29751/29776 (C reuses one `rect` —
  JS reuses too ✓); selvar.c:237/259/294/737 → mklev.js:29215/
  30575/29128/29237; sp_lev.c:5121 → mklev.js:1819;
  selvar.c:752/769 → cmd.js:3891/3903 (JS's only irregular/size
  homes are the dolookaround locals — correct targets) ✓.
- selection_not :219: tmprect written, never read (returns s) —
  recalc-only; JS builds via setpoints, no call needed ✓.
- l_numpoints :210: C counts members over the rect; JS Set-size —
  equal (recalc'd bounds contain exactly all members) ✓.
- l_getbounds :459 Lua `sel:bounds()` bridge: named; zero repo
  callers (grep confirms) ✓.

Behavior deltas at converted sites (all C-faithful or identical):

- look_sel_* family (cmd ×5): objects carry no bounds_dirty →
  recalc no-ops; setpoint maintains tight bounds on add, loose on
  delete — identical before/after (old clone also never recalced),
  and loops re-test getpoint per cell, so looseness only costs
  iterations ✓.
- lspo: sel provably non-null (selection_new fallback) → the old
  `!sel` arm was dead; recalc ran before and runs now ✓.
- rndcoord/filter/iterate: recalc now runs where cached bounds
  were read — THE fix (dirty subsets missed cells C visits);
  any rn2-count change there is C-fidelity, disclosed ✓.
- Null-sel: old clones invented full-map-on-null; C's own guard
  returns with the rect unwritten and C would crash downstream —
  no live caller passes null; removal is faithful ✓.

`sym.mjs` output (Method §3 — 3 clones → import):

```text
selection_getbounds js/mklev.js:29715   sync
look_sel_bounds  NOT FOUND (retired)
selvar_getbounds_rect NOT FOUND (retired)
selection_recalc_bounds js/mklev.js:29597   sync
```

## Hallucinations / overclaim

None. The "16 C sites" subject counts 14 wired + 2 subsumed; the
D-log's per-site table accounts all 17 references individually —
verified each.

## Density

Single-function cluster, sole selvar.c row, 72 js insertions —
below the ~80 line with the real excuse (closure ported,
D-3096/3098 precedent) ✓. `Ledger:` ported ✓. SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify selection_getbounds --base
  463ebb0e2~1 --reach-all`: `0 blocked (0/0)` + `smoke 24/24, 0
  regressed → REACH-OK`. Matches; honestly vacuous.
- Ban-grep: 0. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
