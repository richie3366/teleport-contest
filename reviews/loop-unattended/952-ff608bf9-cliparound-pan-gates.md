# Review 952 — ff608bf9 — wintty.c CLIPPING cliparound pan + tty gates (D-1982)

- SHA: `ff608bf9` — "wintty.c CLIPPING cliparound pan offsets + tty consumer gates (D-1982)."
- D-id: D-1982. JS: `js/display.js` (+153/−11). C locus: `nethack-c/upstream/win/tty/wintty.c` statics `:186–193`, `newclipping` `:471–485`, `setclipped` `:3806–3814`, `tty_cliparound` `:3817–3842`, print gate `:3869–3873`, `docorner` `:3696–3705`, `tty_curs` `:2119–2124`; `winprocs.h:141–142` (all fetched this review).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises CLIPPING pan offsets plus tty consumer gates. Diff
actually adds: `clipping/clipx/clipxmax/clipy/clipymax` statics,
`clip_screen_size`, `setclipped`, `newclipping`, `tty_cliparound`,
`cliparound`, plus four consumer gates (cursor, `_paint_gbuf_cell`,
`docorner` ×2). Promise matches deliverable.

## Inventory

- New: 5 functions (2 exported async, 1 exported sync, 1 local), 5 statics.
- Changed: cursor site, paint gate, docorner arms, three doc comments.
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

All six C sites walked, branch-by-branch confirm:
`setclipped` ✓ verbatim (`clipxmax = CO`, `clipymax = LI − 1 −
statuslines`). `newclipping` ✓ verbatim incl. the else branch
zeroing only `clipx/clipy` (C leaves the maxes — JS does too).
`tty_cliparound` ✓ arm-for-arm: `!clipping` early return, x
hysteresis (`+5`/`−5`, ∓20, COLNO clamp), y hysteresis (half
viewport, C `/2` truncation ≡ `| 0` on non-negatives), moved-origin
→ `redraw_map(TRUE)` ✓. Print gate ✓ character-exact
(`x <= clipx || y < clipy || x >= clipxmax || y >= clipymax`).
`docorner` ✓ (`y + clipy > ROWNO` skip, `row_refresh(xmin +
clipx − offx, …, y + clipy − offy)` with JS offx 0/offy 1).
`tty_curs` ✓ (`x −= clipx`, `y −= clipy` under clipping).
No RNG on any path. `?? 2` statuslines matches the JS options
default ('2' when unset, options.js:1551) ✓.

Callee closure: zero new cross-module imports (all same-module) —
the "no `--can` owed" claim holds. No STUBs, no clones. At 80x24
every gate is shut by construction, so the full-suite green is
explained, not just observed.

## Hallucinations / overclaim

None. Unwired core call sites named with file:line; no corpus claim.

## Density

+153/−11, one tight C family in one module. Right-size per §2b.

## Verification

Honest vacuous note; green + strict + cohort 7/7 + full 44/44
(auto: shared file). Re-measured:
`verify cliparound --base ff608bf9~1` → "0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)". `--rulecheck`
clean (re-run). Added-line grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
