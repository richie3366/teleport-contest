# Review 2524 — ca4598a0b — handler_whatis_filter prompt inverse + blank (D-3645)

- SHA: `ca4598a0b` (2026-10-08) — cliffs-head `handler_whatis_filter`
- D-entry: D-3645; Ledger: `handler_whatis_filter` ported (D-3645 appended)
- js diff: `js/options.js` +8/−1 (header attr + blank item + comment); new
  `scripts/whatis-filter-prompt.test.mjs`
- Type: cliff (≤10 functions → whole Method per function)

## Intent vs deliverable

Promise: the end_menu prompt header missed the tty inverse and the wintty
blank separator, shifting items up one row (126 cell diffs); adding both —
verbatim the D-3403 sibling pattern — moves Barbarian-94251 169→170.

Diff actually adds: `attr: ATR_INVERSE` on the prompt header, one blank
`{ text: '', selectable: false }` item, and a C-cite comment. Promise =
deliverable; nothing else in `js/`.

## Inventory

| JS function | Status | C range |
|---|---|---|
| `handler_whatis_filter` (js/options.js) | prompt header + blank added | options.c:6278–6318 (csym), prompt `:6310–6312` |

## C ↔ JS fidelity

C body (`options.c:6278–6318`, via csym + direct read): create window,
three `add_menu` rows with `a_char = GFILTER_* + 1` and SELECTED flags,
`end_menu(tmpwin, "Select location filtering …:")`, PICK_ONE select with
the pick[1]-quirk arms, destroy, return optn_ok. JS already had the arms;
this SHA only completes the end_menu prompt paint.

The paint claim verified in pinned C (`win/tty/wintty.c:2680–2689`):
after reversing the list, tty_end_menu prepends two items — a blank `""`
with ATR_NONE, then the prompt with `tty_menu_promptstyle.attr/color`.
Since `tty_add_menu` prepends, final order is prompt, blank, items —
exactly the JS shape (header + blank + rows). The ship-time screen diff
(C prompt inverse from col 10, items one row lower with `(end)` at row 5)
matches this construction.

`tty_menu_promptstyle` defaults from `menu_headings` (default
inverse — `options.c:2197`), synced core→tty at wintty.c:2905. JS
hardcodes ATR_INVERSE, i.e. the default; the dynamic read is a **named
omission** (D-log), consistent with the family-wide sibling convention,
and no corpus session changes menu_headings before opening this menu
(RNG 5110/5110 matched at the divergence — pure screen writer). D-3648
ships the relay for doset/query prompts; this prompt keeps the named
default, which is honest, not a C-wrong.

RNG: none on this path either side. No helpers added, no clones, no
re-points — `sym.mjs` check not applicable (no symbol deleted/re-pointed).

Committed test pins the C-recorded prompt paint; ran green here (1/1).

## Hallucinations / overclaim

None. "Verbatim the D-3403 sibling pattern" is accurate (same two-item
construction). No dispatch-over-stub: the handler body was already whole;
this completes its prompt paint.

## Density

Cliff phase: owner `handler_whatis_filter` was the cliffs head (the
Barbarian session walked 151→169→170 down this chain); deliverable is the
owner's missing prompt arms, shipped with measurement (/tmp decode probe:
68 attr + 58 ch cells). Ledger entry present. No bundled file. Movement +
REACH-OK in the Verify bullet (re-measured below). Not a no-op.

## Verification

Rule #2: iteration-wide `imports.mjs --rulecheck` → clean. Diff grep:
only the commit message's "No DIAG/FORCE/seed gates" — no production
trace logic.

Re-measure (this audit):
`hidden-proxy.mjs verify handler_whatis_filter --base ca4598a0b~1
--reach-all` →

- `verify handler_whatis_filter: 1 PASS, 0 moved past, 0 unchanged,
  0 worse → PROGRESS` (Barbarian-94251: PASS) + REACH-OK (smoke 24/24)

Stronger than ship-time (169→170): current HEAD code composes D-3646's
later move of the same session to PASS. No REGRESSED. Claim true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
