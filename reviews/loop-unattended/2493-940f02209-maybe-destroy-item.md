# Review 2493 — 940f02209 — maybe_destroy_item drain-before-exercise (D-3612)

- SHA: `940f0220996824f2f591cd26733a2bd2e22f4967`
- Subject: cliffs-head can_make_bones writer: fatal burn drew exercise before
  the losehp drain (Barbarian-94326 → PASS) (D-3612)
- Type: cliff (1 C function), js +10/−3 in `js/zap.js` + new test
- Prior reviews closed: none

## Intent vs deliverable

Promise: drain+bail before `exercise(A_STR)` at the :5947 site; lifesave
continues to exercise; Barbarian-94326 → PASS. Diff does exactly that, no new
imports. Matches.

## Inventory

- `maybe_destroy_item` (`js/zap.js:1766+`) — changed, 1 site. C:
  `nethack-c/upstream/src/zap.c:5790-5954` (`csym` range); tail :5940–5954
  read directly.
- No new/deleted symbols; `finish_losehp_done` already imported (js :285).

## C ↔ JS fidelity

C :5947–5949: `losehp(...)` (noreturn on death) then `exercise(A_STR, FALSE)`;
C :5953 `return dmg`. Old JS ran exercise unconditionally after the deferred
fatal losehp, emitting the extra `rn2(2)` at keystream slot 3764 that the
D-log diagnoses. New JS drains done(), bails `return dmg` while gameover
(C's noreturn + return value both preserved), and on lifesave falls through
to exercise — exactly C order on all three paths (death / lifesave /
survival). RNG call-for-call: no draws added or removed, only the
death-path exercise (which C never reaches) suppressed.

Debt (pre-existing, not introduced here): the "bare idiom" has no
`else finish_maybe_wail()` — on survival with low HP, C wails inside losehp
(hack.c:4290) while JS leaves `_needs_maybe_wail` set (drained only by
`finish_maybe_wail`, hack.js:2000 — no other drain site exists in js/) until
some later finisher prints it late with live HP against the 50-move throttle
(hack.c:4217). The subject normalizes this as the file's idiom and claims
"Named: none"; the gap predates this SHA (old code also lacked the drain),
is session-invisible here (death path sets no wail flag; probe PASSED with
screens 96/96), and needs a file-wide zap.js sweep to fix — so it is review
debt, not a Must-fix against this SHA. See Actionable 1.

Cheat grep: clean. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

Only the "Named: none ... all whole" phrasing, which papers over the
pre-existing wail gap noted above. The arm enumeration
(AD_COLD/AD_FIRE/AD_ELEC + chargeit + cnt + potionbreathe + worn/wand + useup
+ tail) matches the C body shape; the keystream diagnosis ([3763] matched,
extra draw at [3764], one-slot-late realignment at [3765]) is precise and
consistent with the fix.

## Density

Cliff phase: owner can_make_bones → writer maybe_destroy_item from the
divergence; one function, probe PASS. Per-function verdict:
maybe_destroy_item — ACCEPT (delta), debt carried for the file idiom.

## Verification

Re-measured myself: `verify can_make_bones,maybe_destroy_item --base
940f02209~1 --reach-all` → Barbarian-94326 PASS, `1 PASS → PROGRESS`;
reach can_make_bones 176/176 (full, vs the D-log's 80 spread), reach
maybe_destroy_item 10/10, 0 regressed. Matches.

## Actionable C-wrongs

1. (Debt, map-tracked, one port iter) zap.js bare-idiom losehp sites never
   drain `finish_maybe_wail()` on survival — add the else-branch drain at
   each site (maybe_destroy_item :5947 first) so a low-HP survival wails in
   C position instead of leaking `_needs_maybe_wail` to a later finisher.
   Pre-existing; no session currently distinguishes it.

Verdict: **ACCEPT-WITH-DEBT**
