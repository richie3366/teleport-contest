# Review 1386 — bbe672c4 — mk_bubble ini-time boing colli flips (D-2427)

- SHA: `bbe672c4`, D-2427 (Open row: scen-tour-Tourist-92100 step
  131/167 kind=rng, `collect_coords` ring-3 writer). JS files:
  `js/mklev.js` (+33/−8 approx: colli compute + boing switch in
  `mk_bubble`) plus a new `scripts/` unit-test file for an
  unrelated guard (see below).
- Prior reviews closed: none (corpus-owner writer row, 1 block).

## Intent vs deliverable

Subject promises the `mkmaze.c:1924 mv_bubble(b,0,0,TRUE)` ini-time
direction flips: colli from border contact per `:1971–1978`, the
`:2088–2106` switch verbatim, redirect staying ini-gated. Diff
delivers exactly that inside the existing air-`rn2(6)` gate, `dx`/`dy`
`const`→`let`, flipped values stored into the bubble record. No new
import, no new edge. Promise == diff.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `mk_bubble` colli + switch (`js/mklev.js`) | changed branch | LIVE — C `mv_bubble` `:1971–1978` + `:2088–2106` |
| `mv_bubble` non-ini drift/deposit | not ported | OMIT — named in D-2427 (D-2171 map note), no session evidence |
| `unblock_point`/`block_point` ini paint arms | not ported | OMIT — named in D-2427 (D-2171), no session evidence |

No symbols deleted or re-pointed (file-local `mk_bubble`; nothing to
run `sym.mjs` on).

## C ↔ JS fidelity

C locus: `mk_bubble` (`mkmaze.c:1872–1925`, via `csym.mjs`) ends with
`mv_bubble(b, 0, 0, TRUE)` (`:1924`). `mv_bubble` (`:1951–2107`):
the `:1959` move block runs with dx=dy=0 (sgn/bounce/position all
no-ops; air `rn2(6)` still drawn), then the boing switch flips
`b->dx`/`b->dy` for cases 1/2/3 unconditionally — only the default
redirect is ini-gated (`:2102 !ini`).

Branch-by-branch confirm:

- Gate `!Is_airlevel || !rn2(6)`: JS keeps the identical
  short-circuit, so water draws nothing new and air keeps its single
  `rn2(6)`. Same RNG shape.
- colli bits: JS `bx <= gbxmin → |=2`, `by <= gbymin → |=1`,
  `(bx+bm[0]-1) >= gbxmax → |=2`, `(by+bm[1]-1) >= gbymax → |=1`
  match C `:1971–1978` line-for-line (operands are the clamped
  coords both sides; C's clamp-with-`pline` block is a no-op here
  since `mk_bubble` already clamped).
- Switch: case 1 dy-flip / case 3 dy-flip + fallthrough to case 2
  dx-flip / default break — verbatim C `:2088–2106`, redirect
  correctly absent at ini.
- Omitted bounce arms (`b->x == gbxmin && dx < 0`, …): no-ops with
  dx=dy=0 — correct to skip. Omitted cons-replace: `cons=0` at ini —
  correct to skip.
- Flipped `dx`/`dy` land in the stored bubble record
  (`js/mklev.js` object literal), i.e. C's `b->dx`/`b->dy`. The
  `-0`-from-flipping-`0` note holds: downstream uses are
  sign/addition only.
- Pre-existing (not this commit): C's `impossible`/`panic` n-guard
  arms stay silent clamps; `mk_bubble` takes bounds as params vs C
  globals. Untouched, out of scope.

## Hallucinations / overclaim

None. D-log says "switch verbatim … redirect stays ini-gated" and
that is what the hunk contains. No "Match C" dispatch-over-stub:
the callee (`mv_bubble` ini path) is inlined, not stubbed.

## Density

~25 net JS lines for one measured writer arm on a live corpus owner
— right-sized per §2b (below the 80-line band only because C is that
small: the whole locus is one switch). Code + map + verify in one
handoff. The `scripts/fire-trap-xtradmg-guard.test.mjs` file in this
SHA belongs to D-2431's locus, not this one — odd placement, harmless
(docs/test-only, no `js/` effect).

## Verification

D-log claims `hidden-proxy verify collect_coords` → PROGRESS
(Tourist-92100: `collect_coords`@131 → `level_tele`@132) + green +
cohort + full 44/44. Re-measured myself at the parent baseline:

`node scripts/hidden-proxy.mjs verify collect_coords --base bbe672c4~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-tour-Tourist-92100: moved → level_tele at step 132, was 131).

Claim confirmed line-for-line — not vacuous (baseline shows the
1-block, working tree shows it moved strictly later to a different
owner). `imports.mjs --rulecheck`: Rule #2 clean. Diff grep:
no FORCE/DIAG/getRngLog/fastforward/seed gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
