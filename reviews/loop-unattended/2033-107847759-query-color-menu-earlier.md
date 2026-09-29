# Review 2033 — 107847759 — query_color PICK_ONE menu-earlier (D-3073 Must-fix)

Metadata: SHA `107847759`, D-3073, js/options.js (+13/−3) +
new test scripts/query-color-pick-one.test.mjs (53 L). Must-fix
from review 2031, ships alone.

## Intent vs deliverable

Promise: fix the 2031 C-wrong — dflt X≠NO_COLOR + explicit
letter pick Y sorting strictly after X yields X in C but Y in
JS. Diff adds the MENU_COLORNAMES index-compare gate plus a
5-case headless test; nothing else. Kept.

## Inventory

- `query_color` (CHANGED js/options.js:5209, async): added the
  `:505–508` pick_cnt==2 menu-earlier arm; Enter/ESC/NO_COLOR
  paths untouched. No new helpers, no deleted symbols (no
  `sym.mjs` re-point output required).

## C ↔ JS fidelity

C coloratt.c:474–518 (csym range): `:505–508` i=picks[0],
redirect iff pick_cnt==2 && i==NO_COLOR; `:509–511`
pick_cnt==0 → dflt; `:512` else −1. wintty.c:1755–1759
verified exact (letter toggles row on + finished, preselected
stays selected); picks gathered in menu order (loop head
:2806, cite :2808–2817 starts mid-loop — loose cite, substance
confirmed). So count==2 ≡ menu-earlier(X,Y) ✓.

MENU_COLORNAMES matches colornames[] pre-alias rows 1:1
(black…white, "no color" last; aliases/transparents correctly
excluded — C loop breaks at the null sentinel). All 16 colors
distinct, so findIndex is exact. Case walk: Y after X → dflt
(C picks[0]=X≠NO_COLOR ✓); Y before X → y ✓; Y = "no color"
row → dflt (C picks[0]=X ✓); dflt NO_COLOR → y always
(C picks[0]=Y since preselected sorts last ✓); own-letter →
toggle-off ≡ pick_cnt==0 ≡ dflt in both ✓; dflt absent from
table (idxD<0) → y (C count==1 ≡ Y ✓). NO_COLOR redirect
dead in C as claimed. Confirm.

Callers (all 3 C sites named): coloratt.c:308 → js:5283
wired ✓; options.c:6439 → js:5576 wired, passes NO_COLOR →
unaffected ✓; botl.c:4234 inside status_hilite_menu_add named
omission (js/botl.js:1368) ✓.

## Hallucinations / overclaim

None. "Whole readback now C-faithful" holds arm-by-arm; the
:2808–2817 cite is 2 lines loose but the quoted behavior is
real. Test claims re-checked below.

## Density

One-function Must-fix, ships alone ✓. `Ledger:` query_color
ported. Verdict ACCEPT.

## Verification

Re-ran `node --test scripts/query-color-pick-one.test.mjs`:
5/5 pass on this tree ✓. Re-measured `hidden-proxy verify
query_color --base 107847759~1 --reach-all`: 0 blocked with
the vacuous note (honest — audit-found, no queue row cited
blocks) + smoke 24/24 → REACH-OK ✓. Ban-grep: only hit is
the commit message naming strict sessions; no seed/coords in
control flow. `imports.mjs --rulecheck`: Rule #2 clean ✓.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
