# Review 2282 — 0e60ede85 — get_nhcolor_from_256_index port + stale trio

- SHA: `0e60ede85` (D-3326)
- Files: `js/options.js` (+18/−0), ledger bookings for 3 pre-existing bodies
- Insertions: below the ~80 bar; 4-line leaf + bookings

## Intent vs deliverable

Subject promises: "`coloratt.c` get_nhcolor_from_256_index live-export
port + 3 same-file stale-complete bookings". The diff delivers exactly
that: one new export with C-line cites, zero new imports/edges, no caller
wired. No DIAG/FORCE/seed; Rule #2 clean (iteration-wide rulecheck).

## Inventory

- `get_nhcolor_from_256_index` (options.js:6152): NEW whole-body port.
- `attr2attrname` (:5854), `free_one_menu_coloring` (:5875),
  `color_distance` (:6096): stale-complete bookings, no `js/` change —
  each body re-verified against C below.

## C ↔ JS fidelity

C body (coloratt.c:1023–1031): `retcolor = NO_COLOR|NH_BASIC_COLOR`;
`if (IndexOk(idx, color_256_definitions)) retcolor = table[idx].value`.
JS is line-for-line: same default, `idx|0`, `0 <= i < length`, `.value`.
IndexOk ≡ `0<=idx<SIZE` and the table holds exactly 240 entries
(counted), matching C SIZE=240; `NO_COLOR|NH_BASIC_COLOR` = `8|0x1000000`
is non-negative int32, so no uint32 coercion is needed — the D-log's
claim verified. 0 C callers confirmed (`csym --callers`: 0 references);
the export ships unwired per D-2393 (wiring from a site C never calls
from would be the C-wrong) on the D-2776 precedent. Correct.

Stale trio, each checked against its C locus: `attr2attrname`
(coloratt.c:319–328) — JS first-match scan over MENU_ATTRNAMES; C
attrnames carries 3 aliases after the null entry, but primaries precede
them so first-match results are identical, and MC_ATR_* values
(0,1,2,3,4,5,7) equal C ATR_* (wintype.h:128–134) — booking correct.
`free_one_menu_coloring` (coloratt.c:683–706) — JS walk/unlink/
`regex_free` matches C arm-for-arm (frees ≡ GC) — correct.
`color_distance` (coloratt.c:978–994) — JS redmean matches including the
return expression; intermediates ≤ ~50M, int32-safe; `>>>`/`>>` usage
sound — correct. Caller tables (4/4, 1/1, 1/1 wired) accepted as stated;
all three were pre-existing live code, not this SHA's wiring. Nit
(unqueued, cosmetic): the table doc at options.js:5996–6001 still calls
`get_nhcolor_from_256_index` "unported (map-named)" — stale since this
SHA. Required `sym.mjs` output:

```
get_nhcolor_from_256_index js/options.js:6152   sync
```

## Hallucinations / overclaim

None. "0 blocked on all four", "dead in C, compiles in contest C", and
the SIZE=240 claim all re-measured true.

## Density

Single 4-line leaf + 3 bookings; defended (head's file holds nothing
more Open: 18 ported, 3 partials with kept omits, 3 by-design). `Ledger:`
4 entries. Per-function Verify lines present.

## Verification

Re-measured all four (`hidden-proxy.mjs verify
get_nhcolor_from_256_index,attr2attrname,free_one_menu_coloring,color_distance
--base 0e60ede85~1 --reach-all`): every function 0 blocked (vacuous;
rows cited 0 blocks, honestly noted) + smoke 24/24, 0 regressed →
REACH-OK — the D-log tail verbatim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
