# Review 2699 — 0ef078814 — passive Free_action ring extrinsic

Metadata: SHA `0ef078814`, D-3836, cliffs-head `worn.c`
clear_bypasses writer (owner proven already-whole, ledger
ported D-3153; cMsgOwners are comment-word misattributions).
JS: `js/uhitm.js` (+7/−1: union + cite + import name). Test:
`scripts/passive-free-action-ring.test.mjs` (new, 1 `it`).

## Intent vs deliverable

Promise: Monk-578305@391: C takes passive()'s floating-eye
stiffen path (worn free-action ring), JS the freeze path +
nomul abort — because the JS `Free_action` read saw only the
`u.Free_action/H/E` flats, which no ring path sets. Union the
live `uprops[FREE_ACTION].extrinsic` (invent.js:7441
enlightenment precedent); session moves 391→447. Diff actually
does: exactly the union + FREE_ACTION import (const.js edge
already exists). Match.

## Inventory

- `passive` (js/uhitm.js:3264–3269) — changed: the
  `Free_action` const only. C: `uhitm.c:6021–6048` (read):
  eye arm `canseemon → mcansee → ureflects → Hallucination +
  rn2(4) → Free_action ? stiffen : freeze + nomul((WIS>12 ||
  rn2(4)) ? -tmp : -127) + multi_reason + nomovemsg=0`; and
  `youprop.h:383 #define Free_action
  u.uprops[FREE_ACTION].extrinsic`. JS eye arm (js/uhitm.js:3434+
  read) matches the chain branch-for-branch including the
  rn2(4)/rn2(2)×2/WIS-short-circuit order; only the predicate
  was blind. The union keeps the flats (vestigial — the probe
  showed all three undefined; sole EFree_action writer is the
  orange-DSM arm) and adds the C-exact extrinsic read. Both
  AD_PLYS arms (eye + cube) share the const — covered together.
- No new helpers, no re-points — nothing for `sym.mjs`.

## C ↔ JS fidelity

C's predicate is extrinsic-only; JS now reads flats ∪
extrinsic. The extrinsic disjunct is the verbatim C macro; the
flats are dead in practice (measured undefined at 108/314/391
with uprops[66].extrinsic = 131072 = the worn ring), so the
union cannot misfire on any live path — the D-3822 flats-drift
idiom, accepted in review 2686. No RNG added. Gap: none.

## Hallucinations / overclaim

None. The misattribution call is evidenced (both cMsgOwners
verified as comment lines; clear_bypasses prints/draws
nothing), the ring lifecycle is measured (wished + put on
@108, tele ring removed @314, still worn @391 — /tmp prefix
probe, with an honest note about the early stale-binding
misread), and the 12 sibling flats-only readers are explicitly
not swept per the one-probe-session rule.

## Density

Cliff-phase: head writer correct (passive gaze predicate, not
a re-port of the symptom owner). One predicate, whole on its
path. Ledger: `passive ported` + D-3836 stamp (verified
`docs/ledger/uhitm.c.jsonl`).
Verify bullet: 1 moved + REACH-OK ×2 + green + strict +
cohort. Not unreached: probe moves 391→447.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine, default spread + all blocked): `verify
passive,clear_bypasses --base 0ef078814~1` → passive: 0
blocked (writer, expected), reach 80/80 REACH-OK;
clear_bypasses: 1 blocked at parent → `0 PASS, 1 moved past,
0 unchanged, 0 worse` (Monk-578305 → getobj@447 — exact step
as claimed); smoke 24/24 REACH-OK. Zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
