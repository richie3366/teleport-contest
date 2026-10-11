# Review 2681 — 08f125a34 — show_overview PICK_NONE via shared pager

Metadata: SHA `08f125a34`, D-3817, cliff row-2 `botl.c`
do_statusline2 writer (@67d359f56). JS: `js/dungeon.js`
(corner-painter loop → `select_menu_pick_none`). Test:
`scripts/overview-pick-none-pager.test.mjs`.

## Intent vs deliverable

Promise: show_overview's PICK_NONE arm bypassed the menu pager
(corner painter hardcoded '(end) ', no 23/page); now calls the
live shared export, D-1849 pattern, no pager clone. Claimed: 95306
+ 95323 → PASS. Diff actually does: dynamic-import swap + 5-line
loop → one awaited call + C cites; unused locals removed. Match.

## Inventory

- `show_overview` (js/dungeon.js:3266) — changed: PICK_NONE arm
  only; why===-1 PICK_ONE arm untouched. C `dungeon.c:3304–3340`
  (csym range; whole body verified below).
- Callee `select_menu_pick_none` (js/invent.js:3265, ASYNC,
  awaited) — pre-existing live export; body audited below. No new
  helpers, no deleted exports. Import is function-local dynamic
  on the pre-existing dungeon→invent edge.

`sym.mjs select_menu_pick_none` (record — newly imported callee):

```text
select_menu_pick_none js/invent.js:3265   ASYNC — await required
```

`imports.mjs --can js/dungeon.js js/invent.js
select_menu_pick_none` → `IN-SCC: ... already in the same
101-module import cycle` + TDZ note — function-local dynamic
import, no top-level read, hoisted cycle-safe as claimed.

## C ↔ JS fidelity

C `dungeon.c:3304–3340` (full csym body) vs JS: recalc_mapseen →
endgame-first traverse, `why > 0 || !In_endgame` dungeon traverse
(same gates) → PICK_NONE unless why===-1 → n>0 ledger-1 +
query_annotation → destroy. JS matches every step; the PICK_ONE
arm preserves `ledger = a_int - 1` + query_annotation exactly.
Pager audit (pre-existing, verified by read): lmax =
min(52, rows-1) = 23 at rows 24; npages; morestr `(N of M)` vs
`(end) ` with leading space; multi-page fullscreen vs single-page
corner overlay; cursor `[morestr.length+1, page.length]` = C's
[9,23] for "(1 of 2)"; NEED_MORE flush first; dismiss keys
ESC/Enter/space (+ C page keys, bell otherwise); erase via
corner-dismiss vs fullscreen docrt. Old inline loop's key set
(27/32/13/10) is a subset of the pager's — no behavior lost,
paging gained. C callers: dungeon.c:3298 dooverview (wired,
js/dungeon.js dooverview with menu_requested flag) + end.c:605/
696 disclose (probe path reaches it — both probes PASS through
"The Dungeons of Doom" disclose; the DUMPLOG caller stays
unwired by design, D-1776 retired). No RNG; none added. Gap:
none. Step-by-step confirm.

## Hallucinations / overclaim

None. "C-exact lmax/npages/morestr/fullscreen/dismiss/keys"
verified by read, and the focused test pins 1227 byte-exact incl
" (1 of 2)" + 1228 bones dismiss. Other corner-painter callers
honestly left for their own future rows, never a sweep.

## Density

Cliff-phase: writer correct (overview painter, not the statusline
owner — region-heuristic row). Ledger: show_overview arm. Verify
bullet: 2 PASS + REACH-OK ×2 + green + strict + cohort + full
44/44. Named: none new in probe path. Not unreached: both PASS.

## Verification

js-hunk grep: 0 hits (clean). Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify do_statusline2 --base 08f125a34~1
--reach-all` → `2 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (95306/95323 PASS) and `smoke 24/24 → REACH-OK` —
exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
