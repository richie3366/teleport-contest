# Review 1655 — 8ed1abd3 — `selvar.c` selection_recalc_bounds restart (D-2696)

Metadata: commit `8ed1abd3`, D-2696, `js/mklev.js` (+120/−41
family-wide) + `js/region.js` (+8/−2). No prior review claimed
closed. Pops the THIN `selection_recalc_bounds` row (removed
from the queue in this commit).

## Intent vs deliverable

Subject promises: whole-body restart (dirty protocol +
getbounds wiring). Diff actually restarts `selection_new`
(+wid/hei/dirty), `selection_setpoint` (clean-expand /
always-dirty-on-clear), `selection_free` (+dirty reset),
`selection_clone` (verbatim bounds+dirty), `selection_recalc_bounds`
(guard + wid/hei scans + conditional assign + dirty clear,
now exported), and wires `selection_getbounds` in region.js.
Matches the promise.

## Inventory

Changed JS: the five family functions (js/mklev.js:26546–26960
area) + `selection_getbounds` (js/region.js:1146). New export:
`selection_recalc_bounds` (was file-local; sym.mjs:
`js/mklev.js:26868` sync). Import edge region.js→mklev.js
pre-exists (`imports.mjs --can` returns ALREADY — stronger
than needed). N.b.: the D-log says "lazy function-body
import" but the diff adds a top-level static import
(region.js:57) — harmless inaccuracy, since the edge already
exists statically; no new cycle either way.

## C ↔ JS fidelity

C locus: `selvar.c:14–30` (new), `:42`/`:61` (free/clear),
`:64–73` (clone), `:76–95` (getbounds), `:98–165` (recalc),
`:180–208` (setpoint) — all read in-session (file read :1–96
and :97–181). Callers: `selvar.c:82` → wired js/region.js:1146;
`nhlsel.c:380` → pre-existing `selection_sub` tail call (kept);
`:351` xor / `:715` match-loop named omissions with own-row
pointers. No RNG in the changed lines.

- Recalc: guard `:104–105`, reset `:107–109`, left/right/top/
  bottom `selection_getpoint` scans over `wid`/`hei` with the
  `:125` gate, conditional assign `:161`, dirty clear `:164` —
  all in C order against the printed body. Getpoint-equivalent
  scans yield identical min/max. Confirm.
- Setpoint: clean-expand `:191–199` ✓; clear path: C's
  `else if (map[…] != 0)` ALWAYS dirties because `selection_new`
  memsets the map to 1 (`:26` — fresh cells are 1, never
  literal 0), so JS's unconditional `bounds_dirty = true` on
  clear is C-exact, including 0-writes onto fresh cells. The
  D-log states exactly this mechanism — verified against
  `:26`, not taken on trust. Confirm.
- Clone: struct-copy + dupstr (`:69–70`) → verbatim bounds +
  dirty + pts copy (fixes the old re-add loop that silently
  tightened dirty sources). Free: dirty reset (`:61`/`:42`).
  New: wid/hei/dirty/empty shape (`:19–24`). Confirm.
- Getbounds: recalc-first (`:82`) then `lx >= wid` → full map
  (JS compares against COLNO; wid is COLNO for every live
  selection — new() sets it, clone preserves it). Confirm.
- Flagless literals read as clean: verified tight by
  construction (`selection_from_mkroom`, filter fns compute
  min/max inline; placeAbs literals carry exact bounds —
  all read this session). Confirm.

Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide check at end of audit).

## Hallucinations / overclaim

None material. "Behavior on all live paths is unchanged" is
true (no setpoint-0 caller exists repo-wide — grep this
session; the single raw-delete path below is outcome-benign).
The "lazy import" wording (static in fact) is a doc nit, not
an overclaim.

## Density

~157 insertions for a 5-function protocol restart + caller
wiring: within the breadth-phase band. Not padded (comments
carry the `:line` cites the phase requires).

## Verification

D-log Verify pattern per siblings + full 44/44 (shared files
changed) + a `/tmp` differential smoke (kept uncommitted, per
protocol). Re-ran `hidden-proxy.mjs verify
selection_recalc_bounds --base 8ed1abd3~1 --reach-all`:
"0 blocked (0 at baseline…)" — vacuous note properly stated —
plus "24 PASS, 0 regressed → REACH-OK". No REGRESSED. Queue
row cited 0 blocks, so honest, not D-1831.

## Actionable C-wrongs

1. (Debt, unqueued — adjacent function, benign live)
   `selvar.c` `selection_rndcoord` removeit path
   (`:311–312`: `selection_setpoint(dx, dy, ov, 0)`) is a raw
   `sel.pts.delete(key)` in JS (js/mklev.js:26463) that
   bypasses the new dirty protocol: bounds stay clean-stale
   where C dirties (next getbounds would retighten). Pre-
   existing (not introduced here) and outcome-benign on its
   single live path (`selection_rndcoord(placeAbs, true)`
   js/mklev.js:21104 — castle wishing-chest, consumed once,
   extremes intact). Fix (own iter): route removeit through
   `selection_setpoint(x, y, sel, 0)`; verify with the recalc
   smoke + `verify.mjs --fn selection_rndcoord`. The cmd.js:2098
   raw delete belongs to the separately-owned look_sel_*
   family (named omission, never enters mklev's recalc).

Verdict: **ACCEPT-WITH-DEBT**
