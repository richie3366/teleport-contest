# Review 2736 — 0cd844353 — water_damage Luck gate (D-3876)

## Metadata

- SHA: `0cd844353` (cliff-head writer port)
- D-entry: D-3876; Ledger: `water_damage ported js=trap.js:water_damage`
- js diff: `js/trap.js` (+3/−1), one gate expression
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: the `water_damage` luck gate read dead
`game.u.Luck` (always 0), silently skipping the battle-axe rust at
scen-sweep-Barbarian-582708 s377; fix moves the session 377→385.

The diff actually adds: one `const luck = uluck + moreluck` line with
a you.h:464 cite and the gate reading `(luck + 5)`. Promise ==
deliverable.

## Inventory

- `water_damage` (`js/trap.js:6374`, async) — expression-only change
  inside the `:4771` gate; signature, callers, and every other arm
  untouched. No new function, no new helper, no import.
- Classification: no helper involved — the fix inlines the C macro
  expansion at the single use site (same shape as the `trap.js:6711`
  idiom `(u.uluck|0) + (u.moreluck|0)`). No symbol deleted or
  re-pointed, so no `sym.mjs` paste is required. The chest-trap
  `Luck_chest` twin (`js/trap.js:8037`, same expansion) stays
  untouched — correct, it is a different C call path (untrap chest),
  not this gate.

## C ↔ JS fidelity

C loci, read from pinned C: `water_damage` body
`trap.c:4710–4852` (`csym.mjs` range), the gate `:4771`
(`else if (!force && (Luck + 5) > rn2(20))`), `you.h:464`
(`#define Luck (u.uluck + u.moreluck)`).

Branch-by-branch confirm:

- C gate: `!force && (Luck+5) > rn2(20)` → `ER_NOTHING`, else fall
  through to damage. JS now: `!force && (luck+5) > rn2(20)` →
  `ER_NOTHING`, else fall through. Identical — same guard order
  (`!force` first, so no RNG draw when forced on either side), same
  comparison, one `rn2(20)` call-for-call.
- `luck` expansion matches the macro exactly (`|0` on each half is
  the JS undefined-guard; both fields are live game flats).
- The old read `(game.u?.Luck|0)` was C-wrong as claimed: this audit
  greps zero `.Luck` readers or writers anywhere in `js/` — the field
  existed nowhere, so every unforced call ran with Luck 0. The
  D-log's arithmetic fits: C `rn2(20)=4` with Luck≤−1 proceeds
  (Luck+5≤4, axe rusts); JS 5>4 skipped it. RNG-identical,
  branch-divergent — matches the kind=screen symptom.

## Hallucinations / overclaim

None. The D-log labels the `water_damage` hidden line `note` (0
blocked, "NOT a corpus PASS") and claims movement only on
`erode_obj` (0 PASS, 1 moved). No FORCE/DIAG/seed markers in the
hunk (3-line expression change); Rule #2 clean (review 2735 scan
covers all of scored `js/`).

## Density

Cliff-head writer port with movement — right density. Owner
`erode_obj` was already whole per D-2325 (briefed, not re-ported —
correct writer discipline); the deliverable is the writer the
divergence named. `Ledger: water_damage ported` — right owner.
One cliff, code + ledger + verify in one handoff.

## Verification

Re-measured by this audit
(`verify water_damage,erode_obj --base 0cd844353~1 --reach-all`):

- `verify water_damage`: 0 blocked — vacuous, as the D-log states.
- `reach water_damage`: 27/27 PASS → REACH-OK.
- `verify erode_obj`: 0 PASS, 1 moved past, 0 worse → PROGRESS
  (Barbarian-582708: 377 → disintegrate_arm@472).
- `reach erode_obj`: 41/41 PASS → REACH-OK.

No REGRESSED session. Note the audit re-run lands the session at
step 472, not the ship-time 385: the re-measure runs current HEAD
code, and the two later SHAs in this window (D-3877 s385→,
D-3878) moved the same session further. That is strictly-later
movement on top of this SHA's fix, consistent with the D-3876
"Next:" pointer (induced_align s385) — the ship-time claim is
confirmed, not contradicted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
