# Review 2710 — e78b87757 — poly_gender import + Antimagic uprops OR (D-3849)

Metadata: SHA `e78b87757`, D-3849, cliffs-head `uhitm.c`
mhitm_knockback writers (owner C-whole per D-3759; both
divergences name other functions). JS: `js/mhitm.js` (+16/−12:
thin clone deleted → import; two predicates widened).
Test: `scripts/poly-gender-antimagic-uprops.test.mjs` (new,
source-pinning, 4 `it`s).

## Intent vs deliverable

Promise: (1) Rogue-578129@263 — poly'd acid-blob hero read
gender 0 via the thin clone, so could_seduce=1 ran full
doseduse where C poly_gender=2 skips; import the whole
export. (2) Wizard-578319@181 — cloak-of-MR extrinsic lives
only in uprops, flats-only Antimagic() missed the mon_poly
shield arm and JS polyselfed; OR the live slot. Both probes
PASS. Diff actually does that. Match.

## Inventory

- poly_gender (mhitm.js:2144 deleted): thin clone (`flags.female`
  only) removed; `import { polyself, poly_gender } from
  './polyself.js'` (same line, no new edge). C: polyself.c
  `:2148–2157` (`is_neuter || !humanoid → 2`, else flags.female).
- Antimagic (mhitm.js:595), Unchanging (:606): flats OR +
  `uprops[ANTIMAGIC|UNCHANGING].intrinsic|extrinsic`. C:
  youprop.h `:57` / `:370–371` (H||E ≡ uprops slots). Const
  imports from `./const.js` (pre-existing edge).
- Callers per D-log: uhitm.c:4762 ssex gate → mhitm.js:1580
  via could_seduce :2156; mhitm.c:1128/1130 → mon_poly :648/650
  (read both — wiring unchanged, predicates now whole-input).

## C ↔ JS fidelity

Branch-by-branch confirm. JS export polyself.js:890
(`is_neuter(ptr) || !humanoid(ptr) → 2`, else flags.female)
is C `:2148–2157` verbatim; C could_seduce (mhitu.c
`:1933–1981`, read) returns 1 only when `genagr == 1-gendef`,
so blob-gen 2 can never seduce — the doseduce→knockback
reroute is C-forced, not tuned. C mon_poly hero arm
(mhitm.c `:1121–1207`, read): Antimagic → shieldeff only
(drawless flash), Unchanging → silent `;`, else polyself;
JS :666–676 matches arm-for-arm including the ulycn chain.
Flats-superset is safe: `EAntimagic =` / `EUnchanging =` have
zero writes in `js/` (searched), so the OR only flips
false→true where C's own uprops storage is set — exactly the
cloak-MR case. No RNG/prints added; movement comes from
taking C's arms.

Required `sym.mjs` (deleted clone → import):

```text
poly_gender      js/polyself.js:890   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/apply.js:671  js/detect.js:278  js/dokick.js:217  js/sounds.js:1355
```

## Hallucinations / overclaim

Two nits, neither a C-wrong. (1) D-log "Named omissions"
lists three standing thin clones but `sym.mjs` shows four —
sounds.js:1355 (read: same flags.female-only shape with its
own "Named omission" comment) is unmentioned. The omit is
still named at the site; only the enumeration is short.
(2) mhitm.js keeps local Antimagic/Unchanging clones though
`imports.mjs --can js/mhitm.js js/mcastu.js Antimagic` →
ALREADY (no new edge needed). Now C-equal, so standing debt
against the D-1849 import discipline, not divergence.

## Density

Cliff-phase: parent HEAD was mhitm_knockback (2 blocks, RNG
lost 58256 — verified in 06cc6f81f queue), owner read whole
per D-3759, writers ported one per probe session. Ledger:
mon_poly ported + D-3849; poly_gender ported→split on a
single js site (odd status, harmless — ledger text, no row).
Reached: both probes PASS.

## Verification

js-hunk grep: 0 hits (message-only DIAG/FORCE mentions).
Rule #2 clean (iteration-wide run). Re-measure (mine):
`verify mhitm_knockback --base e78b87757~1 --reach-all` →
`2 session(s) blocked on it (2 at baseline, 0 in the working
scoreboard)`, both probes PASS, `2 PASS, 0 moved past,
0 unchanged, 0 worse → PROGRESS`; reach 785/785 REACH-OK
(503s). Zero regressed. The 2-PASS claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
