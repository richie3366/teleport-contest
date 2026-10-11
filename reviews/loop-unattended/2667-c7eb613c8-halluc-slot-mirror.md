# Review 2667 — c7eb613c8 — peffect_sickness writer: HALLUC slot mirror

Metadata: SHA `c7eb613c8`, D-3803, cliff row-2 `potion.c`
peffect_sickness writer (@bc0c961c3; row-1 void-barred per D-3767/D-3768,
falsifier live-checked). JS: `js/potion.js` (+14/−1). Test:
`scripts/hallucination-uprops-mirror.test.mjs`.

## Intent vs deliverable

Promise: `make_hallucinated` cleared only the flat, so
`display.js` Hallucination() (flat || slot) still saw Hallu and the
:425 repaint painted hallu glyphs; the else arm now mirrors
`itimeout(xtime)` into uprops[HALLUC] on onset and clear. Movement
claimed: 95323 1163→1297. Diff actually adds: HALLUC import, slot-ensure
+ mirror lines, doc touch. Nothing else. Match.

## Inventory

- `make_hallucinated` else arm (js/potion.js:1196) — changed: slot
  mirror added. C `potion.c:368–438` (csym range), else arm :390–396.
- No new helpers, no deleted symbols, no re-points (HALLUC joins the
  existing const.js edge; hunk potion.js:132–135).

## C ↔ JS fidelity

C: `youprop.h:116` — `HHallucination ≡ u.uprops[HALLUC].intrinsic`,
single storage; `Hallucination (HHallucination &&
!Halluc_resistance)`. Else arm (:390–396): `changed` gated on
`!EHalluc_resistance && (!!HHallucination != !!xtime)`, then
`set_itimeout(&HHallucination, xtime)` (TIMEOUT bits only). JS else arm
keeps the changed gate (`u.EHalluc_resistance`, `!!old !== !!xtime`),
writes flat `(old & ~TIMEOUT) | itimeout(xtime)`, and now writes the
slot identically — the D-3802 make_confused shape, cited inline. No RNG
in the C body; none added. Mask arm needs no mirror (extrinsic-only
writes; already mirrored per the doc). The doc comment enumerates the
whole C order (mask / else / changed with see_* before pline);
unchanged lines not reordered.
Callers: D-log maps all 14 C caller sites to live JS sites (incl. the
probe site potion.c:1009 → potion.js:599 and the nh_timeout HALLUC
expiry arm, argued correct-under-fix since both end at 0).
`sym.mjs make_hallucinated` → `js/potion.js:1168 ASYNC`. No clone.
Gap: none. Branch-by-branch confirm.

## Hallucinations / overclaim

None. Owner peffect_sickness verified whole (js/potion.js:521–601 arms
listed) and explicitly not re-ported; D-2083's omission ("no blocked
session reaches it") is now reached, so the writer port is the honest
scope. Geom-probe evidence (RNG 77628/77628 identical, 3 cells C=`C`
vs JS hallu, ^F `Hallu` stuck) is measured, not inferred.

## Density

Cliff-phase: writer correct — hallu-clear arm fired on both sides
(toplines identical), divergence was the display reader's stuck Hallu.
Whole-function: else arm now whole vs C :390–396; full caller table
wired by inheritance (signature unchanged). Ledger: `make_hallucinated
ported`. Named omits: none new; standing ones (artifact.c:794 sync,
HALLUC expiry arm, sibling flats) named with rationale. Verify bullet:
movement + REACH-OK ×2 (11/11, 24/24 smoke) + green + strict + cohort
+ manual 44/44. Not unreached: probe session moved +134 steps.

## Verification

js-diff grep: clean. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify peffect_sickness --base c7eb613c8~1
--reach-all` → `0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(95323 → do_statusline2@1297 was 1163) and `reach 11/11 → REACH-OK` —
exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
