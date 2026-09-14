# Review 1247 — 203f6f60 — invent.c sobj_at canonical + 9 clone retirements

- SHA: `203f6f60` — "`invent.c` sobj_at: canonical export, 9 of 12 clones
  retired (D-2281)"
- D-log: D-2281. Queue row: `invent.c` sobj_at (D-2274 residual). Row
  cited 0 blocks.
- Character: clone-retirement (delete locals, re-point to import) + one
  canonical export. No corpus divergence.

## Intent vs deliverable

Subject promises: one canonical `sobj_at` in `js/mkobj.js` in C position,
9 exact-name clones deleted with the name joining each file's existing
mkobj import, 3 clones + 7 renamed variants left as a named Open row
(10-file cap cut). Diff actually does exactly that across 10 files
(+21/−78): canonical +12 in mkobj.js, nine ~9-line local deletions each
replaced by one import token. Promise matches diff exactly.

## Inventory

- Added JS: `export function sobj_at(otyp, x, y)` (`js/mkobj.js`, now
  `:2184` per `sym.mjs`, sync), directly before `nxtobj`.
- Deleted JS: 9 file-local `function sobj_at` in detect/dig/dokick/
  fountain/hack/mklev/mthrowu/teleport/trap. Zero call-site changes (same
  signature, same walk).
- Required `sym.mjs` output (re-run myself, pasted): `sobj_at
  js/mkobj.js:2184  sync` + `!! ALSO 3 LOCAL CLONE(S) in 3 files —
  js/dbridge.js:121 js/music.js:498 js/steed.js:161` — exactly the 3
  residuals the D-log names. Renamed variants confirmed present as named:
  `sobj_at_monmove`, `sobj_at_shk`, `sobj_at_nexthere`, `sobj_at_otyp` ×2
  (apply + mon), `sobj_at_hurtle`, `sobj_at_look` — all 7 accounted for.
- Required `--can` output: `ALREADY: mklev.js already statically imports
  mkobj.js.` — pasted, confirmed (representative edge; all 9 files
  already import mkobj per the D-log, same SCC, call-time use only).

## C ↔ JS fidelity

C locus `invent.c:1465–1475` (11 lines via `csym.mjs`; D-log cites
`:1466`, same body): walk `svl.level.objects[x][y]` nexthere chain,
`otmp->otyp == otyp`, return first match else NULL. Canonical JS walks
`objects_at(x, y)` (the live head-of-chain accessor every clone already
used) with `(otmp.otyp|0) === (otyp|0)`, returns first match else null.
Branch order identical; single predicate.

The `|0` question: C compares C ints with `==`. For int otyps
`(a|0)===(b|0)` ≡ `a===b` exactly — and every C call site passes int
otyp constants (100 C references, all `SOBJ_AT(CONSTANT, …)` shape). Five
of the deleted clones used plain `===`; four used `|0`. Standardizing on
the C-exact-for-int form is a tightening, not a fork — and full 44/44
green (auto-run, shared file changed) confirms zero behavior change at
every rewired call site. The D-log's "C-exact for int otyps" qualifier is
honest and correctly scoped.

Home-file choice (mkobj.js over invent.js): justified in-commit — sibling
`nxtobj` + `objects_at` already live there, all 12 clone files already
import mkobj, invent.js would need new edges. C position (`:1466` before
`:1479` neighbor) is approximated inside the JS module that owns the
neighbors. Reasonable, disclosed.

## Hallucinations / overclaim

None. "Several mis-cited as mkobj.c/hack.c" is visible in the deleted
lines themselves (detect.js: `-/** C ref: mkobj.c sobj_at …` while C is
invent.c — confirmed in the hunk). No dispatch-with-stubbed-callee shape:
the canonical's only dependency (`objects_at`) is live, and retiring a
clone to an import adds no new behavior by construction.

## Density

§2b ok — arguably the ideal density case: one C function, 9-file dedup,
net −57 lines, full suite auto-run. The 10-file cap cut (3 clones +
renames deferred to their own Open row) is disclosed and queueable.

## Verification

- Added-line banned-pattern scan: 0 hits. Rule #2 clean (re-checked this
  iteration).
- Re-measured corpus claim myself: `verify sobj_at --base 203f6f60~1` →
  0 blocked at baseline and working — matches the D-log's vacuous note,
  correctly not called a PASS.
- Full 44/44 PASS auto-ran (shared file changed) + green/strict/cohort
  per D-log. No hand probes — justified: signature-identical re-pointing
  with full-suite green is the complete oracle here. No maintained unit
  test, disclosed with rationale.

## Actionable C-wrongs

None. Residual clones are named in the map-adjacent Open row (`invent.c`
sobj_at residual clones — already the live queue row), not Must-fix.

Verdict: **ACCEPT**
