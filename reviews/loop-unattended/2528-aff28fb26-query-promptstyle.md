# Review 2528 — aff28fb26 — query prompts read relayed promptstyle (D-3649)

- SHA: `aff28fb26` (2026-10-08) — cliffs-head `handler_petattr` writer
- D-entry: D-3649; Ledger: `handler_petattr` + `query_attr`/`query_color`
  D-3649 appended
- js diff: `js/options.js` 2 lines (`attr: ATR_INVERSE` →
  `...menu_prompt_style()` in both query prompts);
  `scripts/menu-promptstyle-relay.test.mjs` +1 case
- Type: cliff (≤10 functions → whole Method per function)

## Intent vs deliverable

Promise: D-3648 built the relay but the two coloratt.c prompt sites still
hardcoded the default inverse, so after the session set menu_headings to
light-blue + inverse, C painted the query_attr prompt light-blue while JS
painted NO_COLOR. Spreading the live relayed style takes Caveman-94011
77→PASS.

Diff actually adds exactly those two spreads. Promise = deliverable.

## Inventory

| JS function | Status | C range |
|---|---|---|
| `query_color` / `query_attr` prompt rows | live style spread | coloratt.c:474–518 / :396–472; paint via wintty.c:2685–2689 |

## C ↔ JS fidelity

The C rule was verified for D-3648: every tty end_menu prompt paints with
the relayed `tty_menu_promptstyle` snapshot (`wintty.c:2685–2689`), which
the session's menu_headings pick (light-blue + inverse) had updated via
the `:5790` relay. The owner `handler_petattr`
(`options.c:6151–6164` via csym) just calls `query_attr` with "Select pet
highlight attribute" — a 14-line pass-through, already whole; the two
prompt rows were the only hardcoded sites on this path.

The spread reads the D-3648 `menu_prompt_style()` snapshot (no gameover
gate — matches C, the relay snapshots unconditionally). Non-selectable
color threading was already in place from D-3648, so no painter change is
needed. Default behavior (menu_headings untouched) is identical:
snapshot = {NO_COLOR, inverse} = the old hardcode. Branch order / RNG:
none on this path (3438/3438 matched).

No helpers, clones, stubs, or re-points — `sym.mjs` re-point check not
applicable.

Committed test: the relay test gains the step-77 case (col 41 color 12);
ran green here (2/2). D-log claims pre-fix 1/2 — the new case fails on
the old hardcode by construction.

## Hallucinations / overclaim

None. "Verbatim the doset prompt precedent" is accurate (same spread).
Vacuous writer legs disclosed. The ~70→~68 countdown of remaining sites
is consistent (2 closed here).

## Density

Cliff phase: owner `handler_petattr` was the cliffs head; the writer
(the two prompt rows) shipped with Ledger entries for owner + both query
functions. One cliff, same menu-paint family, no bundle. Movement +
REACH-OK re-measured below. The Caveman chain 58→65→77→PASS closes across
D-3647→D-3649. Not a no-op.

## Verification

Rule #2: iteration-wide clean. Diff grep: only the commit message's
self-statement — no production trace logic.

Re-measure (this audit):
`hidden-proxy.mjs verify handler_petattr,query_attr,query_color
--base aff28fb26~1 --reach-all` →

- `verify handler_petattr: 1 PASS … → PROGRESS` (Caveman-94011: PASS)
  + REACH-OK (smoke 24/24)
- query_attr / query_color: vacuous (disclosed) + REACH-OK ×2

Exactly the ship-time claim, reproduced. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
