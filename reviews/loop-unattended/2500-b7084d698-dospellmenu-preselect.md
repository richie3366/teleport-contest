# Review 2500 — b7084d698 — dospellmenu preselected '*' (D-3619)

SHA: `b7084d698` — cliffs-head dovspell writer dospellmenu. D-3619.

## Intent vs deliverable

Promise: on the dovspell swap call, C marks the splaction row SELECTED and
tty paints `*`; JS baked `-` on every row. Fix paints `*` on the matching
row: 5 PASS + 1 moved.

Diff actually adds: `js/spell.js` (+6/−1 in the `dospellmenu` loop) +
`scripts/dospellmenu-preselect.test.mjs` (1 case). No other `js/`.

## Inventory

- `dospellmenu` row-paint loop (`js/spell.js:1717–1725`, changed) — C
  `spell.c:2127–2132` SELECTED flag + `wintty.c:1468–1473` initial paint.
  Status: fixed.

## C ↔ JS fidelity

C `spell.c:2127–2132` verified: `add_menu(..., (splnum == splaction) ?
MENU_ITEMFLAGS_SELECTED : MENU_ITEMFLAGS_NONE)`. tty initial paint
(`wintty.c:1468–1473`): position 2, nonzero identifier + selected →
`'*'` when count is -1 (dospellmenu sets no counts; identifier is
`splnum+1`, always nonzero). JS `splnum === splaction ? '*' : '-'` is the
exact paint equivalent.

All four call shapes checked against C (`spell.c:8–11`, `:2027–2038`):
VIEW (-1, first call) → no loop row matches, sort entry gets NONE (`:2140–
2142`) → JS all-`-` plus the hardcoded `+ - [sort spells]` row is exact;
swap (book index ≥ 0, second call) → exactly one row matches on both sides;
CAST (-2) / DUMP (-3) → no match either side; SORT (MAXSPELL) can never
equal a `splnum` (0..MAXSPELL-1). The JS call sites (`spell.js:1668` DUMP,
`:1857/:1865` VIEW/swap, `:1957` CAST) pass exactly these values. D-2369's
named arms (de-select, `n > 1`, sort-menu marker) are untouched and still
named — no re-port, no silent widening.

Helper class: inline paint arm, no callee. No clone touched, no new import.
No FORCE/DIAG/seed/coordinate in the hunk.

## Hallucinations / overclaim

None. The D-log's `:1182 '+' is interactive-toggle, not initial paint`
distinction is correct and rules out the alternative marker.

## Density

Cliff commit, one arm of the writer, writer correctly chosen (owner proven
faithful by D-2369, read once per the history tag). Ledger: `dospellmenu`
already ported; D-3619 appended — fine. Own head per its HEAD queue.

## Verification

Re-measured: `hidden-proxy.mjs verify dovspell --base b7084d698~1
--reach-all` → `6 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(all 5 D-log PASS sessions still PASS; Monk-94249 now PASS via the later
D-3622, whose bullet names it); smoke reach 24/24 → REACH-OK. Strict
superset of the D-log claim, 0 worse. Unit test: 1 pass, 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
