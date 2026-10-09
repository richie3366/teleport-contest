# Review 2586 — 92f67cdaf — hideunder S_EEL Underwater disjunct

SHA: `92f67cdaf` (D-3716). Underwater-idiom family residual, 1
function, `js/mon.js` only (+5/−2). Ledger: hideunder ported.

## Intent vs deliverable

Promise: C hides the eel only under
`is_pool && !Is_waterlevel && (!Underwater || !couldsee)` (:4746–4747);
JS read dead-false sticky `u.Underwater` → disjunct now reads live
`(u.uinwater | 0)`, same expression as the monmove.js:1466 clone. Diff
actually adds: the one-disjunct rewire + C-cite comment. Promise
matches diff.

## Inventory

- `hideunder` (js/mon.js:3952 export, S_EEL arm :3970–3978) ↔ C
  nethack-c/upstream/src/mon.c:4726–4802 (ledger range), S_EEL arm
  :4742–4751. Live callers of this export: teleport.js:1470,
  zap.js:5810/:7059, explode.js:1077, mkobj.js:1819, pickup.js:2118
  (hero path); monmove.js keeps its parallel local for postmov.

## C ↔ JS fidelity

C :4746–4747 `undetected = (is_pool && !Is_waterlevel(&u.uz) &&
(!Underwater || !couldsee(x, y)))` confirmed verbatim, with the C
comment ("they don't do so … when hero is also under water unless some
obstacle blocks line-of-sight") matching the subject's delta
description. JS now character-identical to the monmove clone. The
adjacent `locomo = "dive"` (:4751) is absent from this export — checked
and NOT a C-wrong: locomo only feeds the `You_see("%s %s under %s")` +
`set_msg_xy` block, which is this export's documented named omission
(async boundary; the monmove clone shows it), while the live remainder
(last-hide record under C's exact condition) never reads locomo. No RNG
in the arm. `Is_waterlevel(u.uz)` / `is_pool` / `couldsee` untouched.

## Hallucinations / overclaim

None. "Zero writers" for the sticky flat was verified in 2585's grep;
D-log states the vacuous verify plainly.

## Density

One whole disjunct + focused test (2/4 → 4/4 claimed) + ledger + verify
on an empty queue. Right-sized.

## Verification

Re-measured: `verify hideunder --base 92f67cdaf~1 --reach-all` → 0
blocked (vacuous, as stated) + `smoke: 24 run, 24 PASS, 0 regressed →
REACH-OK`. Matches the D-log. Rule #2 clean (no imports touched). Diff
grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
