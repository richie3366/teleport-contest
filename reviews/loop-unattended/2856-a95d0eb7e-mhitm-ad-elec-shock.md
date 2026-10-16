# Review 2856 — a95d0eb7e — mhitm_ad_elec mhitu arm reads worn-ring uprops

## Metadata

- SHA: `a95d0eb7eccb8328d910442728036106e0a889c3` (D-4012)
- Cliff writer: `mhitm_ad_elec` head @a01cb7062 (1 block),
  mhitu arm predicate
- js/ diff: `js/mhitu.js` +7/-1 (predicate union + cite); new
  `scripts/mhitm-ad-elec-shock-uprops.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: the arm's `Shock_resistance` union ORs
`uprops[SHOCK_RES].intrinsic/extrinsic`, since worn gear writes
uprops only — flats alone missed a worn ring (Samurai 521→830).

Diff actually: the two union terms + comment. Promise == diff.

## Inventory

- `mhitm_ad_elec_u` (`js/mhitu.js:860`, C
  `nethack-c/upstream/src/uhitm.c:2683-2739` via `csym.mjs`,
  mhitu arm `:2704-2723`): predicate widened.

## C ↔ JS fidelity

- C mhitu arm (read): `hitmsg` → negate gate → `You("get
  zapped!")` → `if (Shock_resistance)` — JS order matches.
- Macro (`youprop.h:42-44` read): `HShock_resistance ≡
  uprops[SHOCK_RES].intrinsic`, `EShock_resistance ≡
  .extrinsic`, `Shock_resistance ≡ H || E`. In C there is no
  separate flat — the JS union (flats + both uprops slots) is
  the house idiom for the dual-store mirror, byte-identical in
  shape to the in-file `:1842` union. `SHOCK_RES` was already
  imported; no import change.
- Surrounding arms untouched per the D-log (uhitm/mhitm use
  monster-side `resists_elec`/`defended`, no hero-prop read —
  consistent with the C body read). `sym.mjs` N/A — no symbol
  deleted or re-pointed.

## Hallucinations / overclaim

None. Movement claim (521→830, no PASS) is exactly what the
re-measure reproduces.

## Density

Cliff commit: owner was the generated head (verified
`a01cb7062:LOOP-QUEUE.md` row 1); one `Ledger:` entry
(mhitm_ad_elec ported). No FORCE/DIAG/seed reads; Rule #2 clean
(see 2853).

## Verification

Re-measured on HEAD code, `--base a95d0eb7e~1 --no-reach`:

- `verify mhitm_ad_elec: 0 PASS, 1 moved past, 0 unchanged, 0
  worse` — Samurai 521 → dfeature_at@830. Claim holds exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
