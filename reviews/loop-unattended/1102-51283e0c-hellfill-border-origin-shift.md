# Review 1102 — 51283e0c — hellfill hells[7] border misses coder-origin shift (D-2136)

Metadata: SHA `51283e0c`, `js/mklev.js` +30/−? only (one module).
Queue row `teleport.c` level_tele, scen-tour-Tourist-92100 step
108/167, screen-first at `teleport.c:1427`: identical toplines «You
materialize on a different level!», first cell diff arrival-screen
row 6 col 77. Owner `level_tele` is the symptom owner
(topline-literal tie-break across level_tele/goto_level/
Sting_effects); the body is fully ported and the message matches —
the divergence is the arrival level's terrain. `geom-probe`: 12
cells, RNG fully matched (23027/23027), extends identical,
mineralize-eligible 0. No prior review claimed closed.

## Intent vs deliverable

Subject promises: JS hand-rolled the lua `selection.rect(0,0,78,20)`
frame at raw coords while C shifts it by the coder origin, landing
12 lava/room cells wrong. Diff actually does: builds the border with
the shared `selection_rect_rel` + `selection_iterate`/`sel_set_ter`
and applies C's lit rule explicitly. Promise matches diff.

## Inventory

Changed JS: `hellfill_style_open_cavern` border block only. Callees:
`selection_rect_rel` (mklev.js:25458, hoisted sibling — same module,
no new edge, no TDZ risk), `selection_iterate`, `sel_set_ter`,
`IS_LAVA` — all pre-existing. `selection_do_line` Bresenham already
verbatim per D-log. No stub, no clone, no omit in the arm; sibling
hell styles need no change (only hells[7] occurrence of the
hand-rolled pattern in mklev.js). Rulecheck clean at HEAD.

## C ↔ JS fidelity

Mechanism verified end to end against pinned sources, not the commit
message. Lua (`upstream/dat/hellfill.lua:424`): `selection.rect(0,0,
78,20)` then `des.terrain(border, wter, lit=0)`. C `nhlsel.c:540-543`
(`l_selection_rect`) routes both explicit corners through
`get_location_coord`, and `sp_lev.c:1216-1224` (`get_location`) adds
`mx = gx.xstart` to explicit coords with `gx.xstart = 1` ("column
[0] is off limits") / `gy.ystart = 0` (`sp_lev.c:208`). So the C
frame lands at (1,0)–(79,20): west lava at x=1 over the grown fringe,
east edge at x=79 leaving x=78 rooms intact — exactly the recorded
12-cell diff. JS `get_location_coord` (mklev.js:18639) adds
`splev_xstart/ystart`, reset to 1/0 like C
(`splev_reset_xystart_size_keep_spmap`, mklev.js:2108), so
`selection_rect_rel(0,0,78,20)` reproduces the shift. Old code
painted x=0/x=78 — the reported bug, deleted. Lit: C
`mkmaze.c:125-142` (`set_levltyp_lit`) forces lit=1 for lava, else
takes lit (lua passes 0); JS `sel_set_ter` treats tlit 0 as nochange
for non-lava (mklev.js:24852 comment documents the gap), so the
explicit `bloc.lit = IS_LAVA(wter)` line is a faithful, cited
compensation — and it matters, since `wter` is stone 50% of runs.
Branch order (iterate → set ter → lit → wallify) preserved.

## Hallucinations / overclaim

None. The entry resists the tempting misattribution (does not touch
`level_tele`, correctly kept as symptom owner) and ships the writer
(the lua-driven terrain path) with a probe-measured cell list. "Only
hells[7] occurrence" is a grep-able claim about mklev.js, plausible
and narrow.

## Density

One C locus family (lua selection-origin + terrain-lit rule), one JS
module, +30/−8ish. Right-sized per §2b.

## Verification

D-log Verify bullet shows `verify.mjs --fn level_tele` → hidden 0
PASS, 1 moved past (Tourist-92100 level_tele@108 → goodpos@131) +
green + strict + cohort + full 44/44 (auto: shared mklev.js
changed). Re-measured: `hidden-proxy.mjs verify level_tele --base
51283e0c~1` → `0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (Tourist-92100: moved → goodpos at step 131, was 108).
Claim true; later step + later owner is PROGRESS. No seed reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
