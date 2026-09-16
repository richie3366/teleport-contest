# Review 1370 — 63941e67 — u_catch_thrown_obj canonical freehand (D-2404)

- SHA: `63941e67`, D-2404 (review 1365 Must-fix). JS file:
  `js/mthrowu.js` only (+2/−9: one import, one deleted clone).
- Prior reviews closed: 1365 (C-wrong 1: guard runs divergent
  `freehand` clone; `--can` SAFE → Must-fix).

## Intent vs deliverable

Subject promises the canonical import, clone deletion, and a C-cited
guard, with guard/RNG order untouched. Diff delivers exactly that.
Promise kept.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `freehand` import (mthrowu.js:71) | clone → canonical import | LIVE — `sym.mjs freehand` → `js/engrave.js:610 sync` |
| deleted local `freehand` (was mthrowu.js:292) | divergent clone | REMOVED (the C-wrong itself) |
| `u_catch_thrown_obj` guard | untouched order | LIVE — short-circuit/RNG order kept |

Required `sym.mjs` output (symbol the diff re-points): `freehand →
js/engrave.js:610 sync; ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT
the export` (`js/pickup.js:3219 js/pray.js:379 js/spell.js:1101
js/steed.js:176`). Pasted as required; audited below.

## C ↔ JS fidelity

C locus: `freehand` (`engrave.c:472–477`, read in pinned source):
`return (!uwep || !welded(uwep) || (!bimanual(uwep) &&
(!uarms || !uarms->cursed)))` — the only `freehand` in C
(`extern.h:1018`, per review 1365's `src/*.c` grep).

- Canonical JS (`js/engrave.js:610–616`) matches C line-for-line:
  `!uwep || !welded → true`; `!bimanual && (!uarms || !cursed) →
  true`; else false. ✓
- The deleted clone (`oc_big`/`uswapwep`, no welded check) had the
  exact observable divergence review 1365 named (welded → C FALSE vs
  clone TRUE; big+swap → C TRUE vs clone FALSE). Deletion removes it
  from the guard. ✓
- Sibling clones (D-log discloses as out-of-scope): `pickup`/`pray`/
  `steed` are C-faithful local copies (same three-term shape; only
  the `bimanual` helper spelling varies) — verified CLONEs, not
  C-wrongs. `spell.js:1101` keeps the OLD divergent shape
  (`oc_big`/`uswapwep`, no welded) and is live at `:1120`
  (`if (!freehand() && … QUARTERSTAFF)`). Pre-existing, untouched by
  this diff, no corpus session blocked on it, and its C caller arm is
  unverified here — an observation for a future `brief.mjs`, not a
  row this SHA owes (see Verdict).

## Hallucinations / overclaim

None. D-log states the vacuous basis up front, requotes the exact
divergence pair, and discloses (not hides) the sibling clones. The
"`--can` → SAFE / 1866 edges" claim is now `ALREADY` (the import
exists post-commit) — same substance, no cycle either way.

## Density

+2/−9 for a Must-fix: one item, alone, per §2b. Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit);
  `--can mthrowu.js engrave.js freehand` → ALREADY, no new edge.
- Re-measured: `hidden-proxy verify spoteffects --base 63941e67~1`
  → `0 blocked (0 at baseline, 0 in working)` — vacuous, matching
  the D-log; Samurai-92161 sits past at `distfleeck`@37 on both
  sides, so same-or-better holds with nothing to regress.
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted (no shared
  file → full-suite skip is legitimate).

## Actionable C-wrongs

None from this SHA. Review 1365's C-wrong 1 is fully addressed:
canonical import live, clone deleted, guard C-cited.

Verdict: **ACCEPT**
