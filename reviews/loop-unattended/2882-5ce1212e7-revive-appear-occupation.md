# Review 2882 — 5ce1212e7 — revive awaits makemon tail + shop naming (D-4041)

- SHA: `5ce1212e7` (cliff, 1 C family: `revive` + `montraits`)
- D-entry: D-4041; Ledger: zap.c (revive / montraits)
- `js/` diff: `js/zap.js` +38/−5 (3 import names + 3 awaits + naming
  arm); test `scripts/revive-appear-occupation.test.mjs` (new, 1 test)

## Intent vs deliverable

Promise: revive_corpse/3 writer — C prints «You stop searching. The
troll rises!» but JS reversed the order and ran a troll attack, because
JS `makemon` defers its in-body appear+dochugw tail while C runs it
inline before revive's post-creation steps; await `makemon_appear_msg`
after each of the 3 creation arms. Same-C-file companion: the by_hero
shop arm used an invented `carried ? 'your ' : 'the '` + bare xname —
replace with live `shk_your` + `corpse_xname(CXN_NO_PFX)` + the C
quan++/−− plural shape. Diff actually does both. No new helpers,
clones, or edges. Promise = diff.

## Inventory

- `montraits` (js/zap.js:3139–3146): changed — await after creation.
- `revive` cant_revive arm (:3418–3423) + normal arm (:3450–3456):
  changed — awaits after creation.
- `revive` by_hero shop arm (:3480–3494): changed — live naming.
  C: `zap.c:883–1140` revive (range per `csym.mjs revive`),
  `makemon.c:1472–1507` in-body tail, `zap.c:727–734` montraits flags —
  all verified in pinned source.

## C ↔ JS fidelity

(a) Makemon tail. C `makemon.c:1472–1507` (verified): newsym, appear
Norep unless MM_NOMSG (:1474–1500), then `if (go.occupation)
dochugw(mtmp, FALSE)` (:1502–1504). C revive passes
NO_MINVENT|MM_NOWAIT|MM_NOMSG (:892) at :985/:1008, montraits the same
(:727–734) — JS flags match arm-for-arm, so per C the Norep is skipped
but the occupation stop still runs: exactly the claimed «stop before
rises» mechanism. `makemon_appear_msg` is LIVE (`sym.mjs` →
js/makemon.js:3898 ASYNC, awaited at all 3 sites); its body gates the
Norep on !MM_NOMSG (:3968) and runs `dochugw(mtmp, false)` (:3997–4001)
— C order. `imports.mjs --can zap makemon` → "ALREADY … No new edge
needed" (output pasted in evidence; the D-log's ALREADY claim is
verbatim true). Position: before revive's post-makemon steps
(free_omid/newcham, mundetected clear) = C in-body order.

(b) Shop naming. C `zap.c:1034–1049` (verified): `shk_your(buf,
corpse)` + `if (one_of) corpse->quan++` + `corpse_xname(corpse, 0,
CXN_NO_PFX)` + `quan--` + "glows iridescently". JS mirrors all five
elements including the comment-quoted ownership variants. Callees
LIVE: `shk_your` js/objnam.js:2837 sync, `corpse_xname`
js/objnam.js:1273 sync, `CXN_NO_PFX` js/const.js:1781 export const
(all per `sym.mjs`); all three added to pre-existing import
statements. The deleted code was JS-invented (two-branch ownership,
bare xname) — a strict fidelity gain. No RNG in either part either
side. No symbol deleted or re-pointed (pure additions to existing
edges).

## Hallucinations / overclaim

None. The "identical shape ×3" is pinned to session/step pairs with
quoted toplines both sides, and the rng-diff index (2867 = step 345
local 0, RNG matched through the divergence step) plus the reverted-JS
occupation probe (REVIVE_MON at moves=27, stop after) make the
mechanism measured, not inferred. revive_corpse explicitly untouched
(whole per D-1234), not claimed.

## Density

Cliff-phase: revive_corpse-row writer + same-C-file companion (both in
zap.c revive, one commit — allowed companion shape). All 3 creation
arms covered (no arm-only port), `Ledger` updated. Montraits standing
omits named untouched. Not a no-op: `js/` + test + 4 PASS.

## Verification

- Re-measure (this review, one call):
  `hidden-proxy.mjs verify revive_corpse,revive --base 5ce1212e7~1
  --no-reach` → `revive_corpse: 3 PASS, 0 moved past, 0 unchanged, 0
  worse` (51257051, 50350086, 50950094 all PASS) and `revive: 1 PASS,
  0 moved past, 0 unchanged, 0 worse` (620021 PASS) — exact match to
  both D-log lines. Non-vacuous (3+1 blocked).
- Focused test re-run: `# pass 1, # fail 0`.
- D-log Verify bullet: REACH-OK smokes + montraits 1/1, syntax, rule2,
  green + strict ×2, cohort 7/7, forced full 44/44 — shipped; final
  rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); no
  FORCE/DIAG/seed/coordinate gates in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
