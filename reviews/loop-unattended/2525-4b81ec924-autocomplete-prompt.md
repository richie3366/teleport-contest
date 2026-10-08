# Review 2525 — 4b81ec924 — handler_change_autocompletions prompt inverse + blank (D-3646)

- SHA: `4b81ec924` (2026-10-08) — cliffs-head `handler_change_autocompletions`
- D-entry: D-3646; Ledger: `handler_change_autocompletions` ported
  (D-3646 prepended; "audited D-3402: whole vs C" note kept)
- js diff: `js/cmd.js` +6/−2 (header attr + blank item + comment); new
  `scripts/autocomplete-prompt.test.mjs`
- Type: cliff (≤10 functions → whole Method per function)

## Intent vs deliverable

Promise: same sibling fix as D-3645 — the end_menu prompt header missed
the tty inverse + blank separator, shifting the 8-page item list up one
row; adding both takes Barbarian-94251 170→PASS (end of its chain).

Diff actually adds: `attr: ATR_INVERSE` on the prompt header, one blank
item, C-cite comment. Promise = deliverable; nothing else in `js/`.

## Inventory

| JS function | Status | C range |
|---|---|---|
| `handler_change_autocompletions` (js/cmd.js) | prompt header + blank added | cmd.c:2448–2515 (csym), prompt `:2483` |

## C ↔ JS fidelity

C body (`cmd.c:2448–2515`): build one row per adjustable command
(SELECTED iff AUTOCOMPLETE), `end_menu(win, "Which commands
autocomplete?")` at :2483, PICK_ANY select, parseautocomplete per pick.
JS already had the rows + select; this SHA completes the end_menu prompt
paint — the same two-item tty construction verified for D-3645
(wintty.c:2680–2689: blank prepended, then prompt with
`tty_menu_promptstyle`, final order prompt/blank/items).

The screen evidence matches: C prompt inverse over cols 1–28, blank at
row 1, items from row 2 with the `(1 of 8)` footer — JS had items at row
1. RNG 5110/5110 matched: pure screen writer, no RNG either side.

Same named omission as D-3645 (hardcoded default inverse vs dynamic
`menu_headings` read): family-wide convention, no session evidence
against it, disclosed in the D-log. No helpers, clones, or re-points —
no `sym.mjs` re-point check applies.

Committed test pins the C-recorded paint; ran green here (1/1).

One ledger hygiene note (not a C-wrong): the row keeps note "audited
D-3402: whole vs C" while D-3646 just proved an arm was missing. The
`d` array now records D-3646, so the history is traceable; the stale
"whole" adjective is a note, not a status lie. No action.

## Hallucinations / overclaim

None. "Verbatim the D-3403/D-3645 sibling pattern" is accurate. The PASS
claim names the exact session; no dispatch-over-stub (handler body was
whole, prompt paint was the gap).

## Density

Cliff phase: owner was the cliffs head; the Barbarian chain
151→169→170→PASS closes across D-3644→D-3646, one cliff per iteration,
each with its own Ledger entry and movement. No bundled file. Not a no-op.

## Verification

Rule #2: iteration-wide `imports.mjs --rulecheck` → clean. Diff grep:
only the commit message's self-statement — no production trace logic.

Re-measure (this audit):
`hidden-proxy.mjs verify handler_change_autocompletions
--base 4b81ec924~1 --reach-all` →

- `verify handler_change_autocompletions: 1 PASS, 0 moved past,
  0 unchanged, 0 worse → PROGRESS` (Barbarian-94251: PASS)
  + REACH-OK (smoke 24/24)

Exactly the ship-time claim, reproduced. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
