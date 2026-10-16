# Review 2868 — 3f524089b — domove run-stop fires under forcefight

## Metadata

- SHA: `3f524089baf7adc3683aae4a5059233c13160cb7` (D-4026)
- Cliff: unattributed scen-questtour-Priest pair
  (50950030 s32 + 50157004 s112 @bf7208009, rows 4+5)
- js/ diff: `js/cmd.js` +7/-4 (condition + comment);
  `scripts/domove-runstop-forcefight.test.mjs` (new)
- Method: full per-function (cliff commit, 1 function)

## Intent vs deliverable

Promise: D-0440's JS-invented `&& !forcefight` on the
run-stop contradicts C — delete it so the condition matches
`hack.c:2766–2776` exactly; temp-C measured `ff=1 run=8`
stopping silently at the zombie turn. Both probes FULL PASS.

Diff actually: the one condition + a comment citing the C
range and the measurement. Promise == diff. No new
functions, helpers, or imports.

## Inventory

- `domove` (`js/cmd.js:6704`, merged port of C `domove` +
  `domove_core`): run-stop gate now `mtmp &&
  !is_safemon(mtmp) && game.context?.run`, inner
  `(!Blind && mon_visible && seenAsMon) || sensemon` →
  `nomul(0)`, `move = 0`, silent return.

## C ↔ JS fidelity

- C `domove_core` (`nethack-c/upstream/src/hack.c:2711-2991`
  per `csym.mjs`; run-stop read at `:2763-2776`): outer
  `if (mtmp && !is_safemon(mtmp))`, comment trio incl.
  `We should never get here if forcefight`, inner
  `if (svc.context.run && ((!Blind && mon_visible(mtmp)
  && ((M_AP...) || Protection_from_shape_changers)) ||
  sensemon(mtmp)))` → `nomul(0); move = 0; return`.
  No forcefight term anywhere in the condition — the
  deletion is C-exact, comment included.
- Branch order preserved: the gate still sits after
  `escape_from_sticky_mon` and before the `:2780-2781`
  `ux0/uy0` trail write (read `js/cmd.js:6770-6800`).
  Inner predicate order (Blind → mon_visible → M_AP →
  sensemon) matches C's short-circuit shape.
- Caller: C `hack.c:2700` (`domove` wrapper → `domove_core`,
  sole call site per `csym.mjs --callers`) → JS
  `js/cmd.js:6704 domove` (async, pre-existing; `sym.mjs
  domove` confirms the canonical export, untouched).
- Callee closure of the touched arm: `is_safemon`,
  `mon_visible`, `sensemon`, `nomul` — all live, none
  touched. No symbol deleted or re-pointed, so the
  required `sym.mjs` re-point paste is N/A.
- Grep of the `js/` hunk: the only seed-shaped hit is the
  *removed* comment line (`seed0002 @11309`); no FORCE,
  DIAG, `getRngLog`, `fastforward`, or coordinates added.
  `imports.mjs --rulecheck`: Rule #2 clean.

## Hallucinations / overclaim

None. "Matches C exactly" is claimed only for the
condition, and verified above. The function is not sold
as whole: D-log `Ledger: domove_core partial` plus the
standing-omits Named list (displacer swap, mundetected
Wait!, mon_visible prop, D-3850 furniture park).

## Density

Legitimate cliff slot: parent block shows rows 1–3 as
symset-s0 (D-4016 kin) and rows 4+5 as this pair — the
first non-park rows, one cause shipped together. Kin
skip spot-checked first-hand: the 50059025 recipe
carries `OPTIONS=msg_window:reversed` twice. Temp-C
measurement (moves/ff/run dump, sources reverted,
912/912 + 32636/32636 re-record identical) is the
right evidence grade for a comment-vs-code dispute.
`Ledger:` entry updated (D-4026 + omit text).

## Verification

- Re-measured `--base 3f524089b~1 --no-reach`: `verify
  domove_core: 0 session(s) blocked on it` — vacuous, as
  the D-log discloses (unattributed owners match no C
  fn; D-4015 precedent). Not presented as movement.
- Movement re-run independently on HEAD's code: `score
  --ids` both probes → 2 FULL PASS with the exact
  claimed totals (32636/32636 RNG + 912/912 scr;
  38857/38857 RNG + 1030/1030 scr).
- Focused test: 1/1 on HEAD. The 389-session F-superset
  sweep (0 flips) is not re-run here; the audit's final
  full rescore is the regression check for the window.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
