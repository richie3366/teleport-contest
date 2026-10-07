# Review 2470 — 4a3125515 — hitpointbar Sprintf + repaint + pad rule (D-3588)

**Metadata.** SHA `4a3125515` (2026-10-07, D-3588). Type: **cliff**:
writer port for the cliffs head `botl.c do_statusline1`. `js/`
insertions: 48 (`js/botl.js` +36/−4, `js/display.js` +12/−5) +
committed test.

## Intent vs deliverable

Promise: three gaps in the hitpointbar chain — (1) the `:4513`
fmt applied by `replace('%s')` stored the `%-30.30s` literal;
(2) the flush repaint blanked rows 22–23 plain, clobbering the
inverse bar; (3) pad spaces painted with inverse where the
CUF-compressed capture shows blanks. Fixed by a Sprintf subset
helper, a per-cell repaint, and a >4-run attr rule. Probe
Healer-94271 →PASS, Archeo-94051 8→44.

Diff actually adds: the helper + call site, the run rule, the
per-cell repaint. Promise matches diff. No symbols deleted or
re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | tty_status_update `:4513` Sprintf arm | ported | [botl.js](/home/debian/dev/teleport-contest/js/botl.js:391) | wintty.c:4503–4517, botl.c:683–744/:1714 |
| 2 | tty_putstatusfield space-run rule | ported | [botl.js](/home/debian/dev/teleport-contest/js/botl.js:764) | wintty.c:4803–4840, 5155–5177 |
| 3 | _buildScreenOutput status repaint | ported (flush_screen row) | [display.js](/home/debian/dev/teleport-contest/js/display.js:7119) | display.c:2208–2267, wintty.c:4992 |

Helpers: one added — `sprintf_percent_s`, module-local, single
def + single use (grep). It is a faithful C-subset clone (see
below), not a stub. No clone→import re-point, so no `sym.mjs`
re-point output is required.

## C ↔ JS fidelity

**(1) The subset covers every live fieldfmt.** C :4513 (read) is
full `Sprintf(status_vals, fmt, text)`; botl.c:1714 (read) makes
BL_TITLE's fmt `%-30.30s` under hitpointbar. All 30 initblstats
fmts (botl.c:704–740, read) carry exactly one bare `%s` plus
literals (` St:`, `(%s)`, `/%s`) — the helper's single-conversion
+ literal-preserved shape covers each, with `-`/width/precision
only exercised by the bar override ✓. `%%`-adjacent fmts degrade
identically to C (regex finds the real conversion) ✓. No RNG.

**(2) The >4 rule mirrors the capture layer, verified end to
end.** C paints the bar pad UNDER inverse (:5159–5166
Begin_Attr→putstatusfield(bar)→End_Attr, read); the recorder
compresses the 12-run to `\x1b[12C`; frozen screen-decode
(screen-decode.mjs:46–48, read) advances past CUF without writing
cells, so skipped cells stay attr-0 blanks ✓. The >4 threshold is
established precedent (display.js:6510–6512 gap rule emits CUF
when gap > 4; :6829 serialize rule), now mirrored on the
windowport path ✓. Short runs (intra-name spaces) stay verbatim
with attrs like C's putchar ✓. Uniform rule, no session/seed
gate — capture normalization, not trace-shaping. Boundary note
(not a C-wrong): runs are maximal *within* one field string, so a
>4 run spanning a field boundary would keep its attr — the
conservative direction (toward C paint), no session evidence.

**(3) Per-cell repaint is strictly closer to C.** Old code
unconditionally clobbered row attrs plain; new code restores only
ch-disagreeing cells (overlay residue, docrt/cls blanks, shrunk
tails via past-end `' '`) and keeps render_status's attrs
otherwise ✓. Direction is cache→grid, never grid→grid —
D-1831-clean ✓. The reverted skip-repaint attempt (5 public + 2
REACH blanks) is disclosed with its mechanism (JS over-clear vs
C bot() repaint) ✓. Same-ch-stale-attr is the only uncovered
case, and it was wrong-before-too (worse: everything plain) —
no new risk class. Nit: the sentence "so blank-then-paint erases
a shrunk status" now describes replaced code (one-line stale).

## Hallucinations / overclaim

None. The D-log names the "js-throw at step 44" label artifact
itself; I re-confirmed error-null via `show` (screen-first, RNG
2543/2543).

## Density

Cliff §10.18: cliffs-head writer, three arms of three ported
rows, own `Ledger:` touch (all three gain D-3588). Per-function
verdicts ACCEPT ×3 → SHA ACCEPT.

## Verification

- Added-code grep: only hit is the commit message text — code
  clean.
- Rule #2: clean this iteration (see 2462).
- Committed test `tty-status-hitpointbar-fmt.test.mjs`: 2/2 PASS
  now (0/2 pre-fix claimed in-ship).
- Re-measure (mine): `verify
  do_statusline1,tty_status_update --base 4a3125515~1 --reach-all`
  → do_statusline1 **1 PASS, 1 moved past, 1 unchanged, 0 worse**
  + smoke 24/24 REACH-OK; tty_status_update vacuous (0 blocked)
  + smoke REACH-OK — the D-log's lines exactly.
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
