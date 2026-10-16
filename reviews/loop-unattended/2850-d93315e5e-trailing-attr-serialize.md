# Review 2850 — d93315e5e — serializer keeps trailing attr spaces + trailing-run CUF

## Metadata

- SHA: `d93315e5e6f8a294be7b9713805b96fa7deb4397` (D-4006)
- Cliff writer: `level_tele` head, 3 blocks (1 moved
  471→1926 + 2 own-writer no-movement)
- js/ diff: `js/display.js` +24/-6 (lastCol/lastRow attr rule
  + run-gate); new
  `scripts/trailing-inverse-space-serialize.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: Caveman-50350081 s471, RNG fully synced, one cell
differs — C paints the detected rogue ghost's trailing
inverse space (`\x1b[34C.@. \x1b[7m \x1b[0m`) while
`serialize_for_scoring` stopped lastCol/lastRow at the last
non-space glyph. Extend both scans with `(attr & 0x7)`,
mirroring the D-0129 firstCol rule; extend run-CUF to
trailing inv/uline runs (menu-heading byte-proof); keep
mid-row inv/uline runs literal.

Diff actually: the two scans + the run gate + comments.
Promise == diff.

## Inventory

- `serialize_for_scoring` (`js/display.js:7662-7725`,
  capture model under C `wintty.c` tty_print_glyph
  `:3855-3977` + patch-006 `nomux_capture_screen`): attr
  rule + gate added. No C function ported; the "C" is
  recorder capture behavior.

## C ↔ JS fidelity

- Ghost paint path ✓ — C `win/tty/wintty.c:3930-3936`
  (read): `MG_DETECT` (+BW_*) with `use_inverse` →
  `term_start_attr(ATR_INVERSE)`; the D-log's measured
  `HDetect_monsters=56` + hostile/unseen ghost puts C on
  exactly this arm. JS grid already held `{ch:' ',attr:1}`
  (measured, paint correct) — the drop was capture-side.
- End-scan rule exact ✓ — patch-006 `nomux_capture_screen`
  (read): `while (end >= 0 && (ch==' '||ch==0) && attr==0
  && (fg==7||fg==0)) end--`. JS `attr & 0x7` reproduces the
  attr half bit-for-bit: nomux bits are inv=1/bold=2/uline=4
  and JS `terminal.js:26-28` defines `ATR_INVERSE=1,
  ATR_BOLD=2, ATR_UNDERLINE=4` — identical assignment. The
  lastCol/lastRow scans now mirror the firstCol scan
  (`display.js:7685-7690` read: same `ch !== ' ' || (attr &
  0x7)` test) — the promised D-0129 symmetry holds verbatim.
- The fg half (`fg∉{7,0}` kept) is disclosed Named omission
  (2), not a miss — the patch text corroborates it exists in
  C's scan, and no session evidences it. Same for mid-row
  inv/uline runs (Named 1; D-0129 stands).
- Run gate ✓ — `runLen > 4 && (!(wantAttr & 0x5) || end ===
  lastCol)`: mid-row plain runs compress exactly as before
  (D-0931 preserved); inv/uline runs compress only when
  trailing, grounded in the menu recording proof
  (` General\x1b[24C`). The in-iteration refinement (first
  attempt regressed 4 public menu sessions by emitting
  trailing inv padding literally) is disclosed in the commit;
  fortress re-greened to 44/44 (re-verified in this audit's
  overlay).
- Byte-exactness: the committed test asserts the full C row
  `\x1b[34C.@. \x1b[7m \x1b[0m` plus the decoded inverse cell
  — green on re-run (1/1).

Diff grep clean; Rule #2 iteration-wide clean (review 2844).
No symbol deleted/re-pointed.

## Hallucinations / overclaim

None. "C bytes exactly" is pinned by the test, not asserted.
The 2 unchanged sessions' own writers are celldiff-measured
and quoted (r12c39 `@`/orange vs `~`/water; s11 pool tiles
vs blank) — checkable, distinct causes.

## Density

Cliff writer on its HEAD's head: 1 moved 1455 steps (471→
1926, RNG 103298/103298 held) + 2 named own-cause
no-movement — legitimate movement, not a stall. Ledger:
`tty_print_glyph partial` +D-4006 with the three omits.
**Ledger nit repaired in this review commit:** the D-4006
ledger write had clobbered the row's `js` loci (paint
functions `show_glyph_cell`/`map_screen_cell` replaced by
`serialize_for_scoring` alone); restored all three via
`ledger.mjs set` per the playbook's in-iteration rule (docs,
not `js/`). The replaced old omit (KIND-input garbage) stands
replaced — its content lives in the D-3996 OSC-marker park.

## Verification

D-log: `verify level_tele: 0 PASS, 1 moved past, 2 unchanged,
0 worse → PROGRESS` (Caveman 471→1926). Re-measure (`--base
d93315e5e~1 --no-reach`, HEAD code): **0 PASS, 1 moved past,
2 unchanged, 0 worse** — `moved → process_menu_window at step
1926 (was 471)`, both others still level_tele at steps 11/419
with identical toplines. Exact match.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
