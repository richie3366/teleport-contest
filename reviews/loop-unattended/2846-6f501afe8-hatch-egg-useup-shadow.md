# Review 2846 — 6f501afe8 — hatch_egg useup shadow deleted (throw-void healed)

## Metadata

- SHA: `6f501afe8376e44149db3b9edf3b29dc7df14f60` (D-4002)
- Cliff writer: `randomize_gem_colors` head, 1 block (D-4001's
  named own-pop)
- js/ diff: `js/timeout.js` 1 line removed + 2 comment lines;
  new `scripts/hatch-egg-carried-useup.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: Wizard-50056058's step-0 void was a JS throw, not a
missing draw — `TypeError: useup is not a function` at
`hatch_egg` when a carried killer-bee egg fully hatched:
the prologue's `const { useup } = await import('./eat.js')`
shadowed the correct static invent import with `undefined`
(eat.js imports useup for itself but exports none). Delete the
shadowing line; the `:2591` call resolves to the live export.

Diff actually: exactly that deletion + NB comment. Promise ==
diff.

## Inventory

- `hatch_egg` carried-consumed arm (`js/timeout.js:2589-2591`,
  C `timeout.c:1017-1189` via `csym.mjs`, arm `:1177-1178`):
  import shadow removed; body untouched.

## C ↔ JS fidelity

- C arm (`:1177-1178` read): `else if (carried(egg))
  useup(egg);` ✓ — JS (`:2589-2591` read) is the identical
  `else if (carried(egg)) { useup(egg); }` in the identical
  `quan > 0 → carried → else` chain (re-attach /
  container_weight, obj_extract_self/obfree_hatch + m_at /
  hideunder / cansee redraw — all present, C order). No
  control-flow, signature, or RNG change, as promised.
- The re-point target is LIVE ✓ — `sym.mjs useup` output:
  `useup  js/invent.js:5134  sync`, and the static import
  `import { inv_weight, update_inventory, useup, useupall }
  from './invent.js'` sits at `timeout.js:54` (read), already
  load-bearing at `:1414`. eat.js confirmed importer-only
  (`:122-124` import block read; no `useup` export anywhere in
  the file) — the deleted destructure necessarily bound
  `undefined`, so the TypeError mechanism is proven, not
  inferred.
- Sibling dynamic imports (enexto/makemon/tamedog/m_at/
  hideunder) untouched; all resolve to real exports per the
  D-log, and the session moving past the throw corroborates
  the prologue is now clean.
- `sym.mjs` also reports 4 pre-existing local `useup` clones
  (detect/potion/read/spell) — outside this SHA; the D-log
  Next already files the silent-undefined class as a standing
  warning. No divergence evidence for those clones here, so no
  queue row from this review.

Diff grep clean; Rule #2 iteration-wide clean (review 2844;
this commit removes an edge).

## Hallucinations / overclaim

None. "Rule #2 clean (no new edge — one fewer)" is exact.
The prefix bisection (894 clean / 895 throws) + stack trace +
red→green focused test is measured causation.

## Density

Cliff writer on its HEAD's head, shipped immediately after
D-4001 named it — the queue working as designed. One line of
`js/` healing a whole session's log is maximal density, not
under-density. Ledger: `hatch_egg ported` +D-4002 (unchanged
status, body-whole claim stands). Committed test re-run green
(1/1).

## Verification

D-log: `verify randomize_gem_colors: 0 PASS, 1 moved past, 0
unchanged, 0 worse → PROGRESS` (50056058 → goto_level@s346).
Re-measure (`--base 6f501afe8~1 --no-reach`, HEAD code): **0
PASS, 1 moved past, 0 unchanged, 0 worse** — `moved →
goto_level at step 346 (was 0)`, exact match. This also closes
review 2845's attribution note: the second session's movement
belongs to this SHA.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
