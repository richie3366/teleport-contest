# Review 1343 — 7c83a6ca — potion.c peffect_water blessed-cure make_sick call

- SHA: `7c83a6ca`, D-2377. JS files: `js/potion.js` (2-line change + doc).
- Prior reviews closed: none. Also pops its own queue row + refills 5 Open rows
  (discipline clean; refill rows match live debt citations).

## Intent vs deliverable

Subject promises: replace the blessed-cure `u.Sick = 0` shortcut with the live
`make_sick(0, NULL, TRUE, SICK_ALL)` call (C `potion.c:750`). Diff actually does
exactly that (plus doc touch-up). Promise == diff; no extra scope.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `make_sick(0, null, true, SICK_ALL)` call site | C line `:750`, same-file callee (`potion.js:936`, live) | LIVE |
| `peffect_water` other arms | untouched (D-1004) | out of scope |

No new/disappearing symbol — no `sym.mjs` re-point owed (nothing deleted or
re-pointed). `SICK_ALL` rides the file's existing const import (`potion.js:136`).

## C ↔ JS fidelity

C `peffect_water` (`csym` → `potion.c:716–768`): the blessed non-hater arm is
`You_feel("full of awe.")` → `make_sick(0L, NULL, TRUE, SICK_ALL)` →
`exercise(A_WIS, TRUE)` → `exercise(A_CON, TRUE)` → `you_unwere(TRUE)`. JS now
reads identically in the same order (diff context confirms the surrounding lines
untouched). Arg mapping exact: `0L→0`, `(char*)0→null`, `TRUE→true`, `SICK_ALL`.
The shortcut's deficit (no `usick_type` clear, no talk=TRUE "cured. What a relief!"
/ "somewhat better.", no `botl`, no SICK-killer dealloc) is exactly what the live
callee's cure branch does (`potion.js:954–980`: mask clear, talk-gated messages,
`botl`, `dealloc_killer` when `!u.Sick`). No RNG either side. Branch order and RNG
call-for-call: trivially exact — one call replacing one assignment.

## Hallucinations / overclaim

Verify bullet claims only green/cohort + an explicitly non-PASS hidden note —
honest. No dispatch-with-stub shape (callee fully live). No overclaim.

## Density

2 changed lines on a non-Must-fix row is below the §2b ~40-line kendaraan — but C
is literally one call and the queue row was exactly this residual; popping it alone
is correct (gluing an unrelated arm would violate the one-locus rule). Acceptable.

## Verification

- `imports.mjs --rulecheck` → Rule #2 clean (this review). Same-file callee: no new
  edge, no TDZ surface.
- Diff grep `FORCE|DIAG|getRngLog|fastforward` → 0 code hits (message says "No …" —
  accurate).
- Re-measured: `hidden-proxy verify peffect_water --base 7c83a6ca~1` → "0 at
  baseline, 0 working" — row cited 0 blocks, vacuous note correctly labeled.
  No seed/step/coordinate reads in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
