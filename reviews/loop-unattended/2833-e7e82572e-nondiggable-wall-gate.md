# Review 2833 — e7e82572e — des non_diggable loops gain the C wall gate

- SHA: `e7e82572e` (D-3988)
- Files: `js/mklev.js` (+34/−17, 17 hunks), focused test
  `scripts/des-nondiggable-wall-gate.test.mjs` (new, 44 lines)
- Method: cliff writer (1 C gate × 17 applications); whole Method.
- Cites: C `sp_lev.c:985–995` (sel_set_wall_property), `muse.c:659`,
  `rm.h:213–221` union — read directly.

## Intent vs deliverable

Promise: 17 `des.non_diggable` inline loops set W_NONDIGGABLE on every
cell including floors; C gates on stone/tree/bars. The wrongly flagged
floors flipped the ogre's WAN_DIGGING defense evaluation → stream
shift at find_defensive. Fix: add the C `:989–993` gate to all 17
loops. Diff: 17 identical one-line gates + cite comments (grep count
17/17 hunks). Promise and diff agree.

## Inventory

- 17 `load_*` loops — `js/mklev.js` (bigrm-2/3/4/7/8/9/12, medusa-1/3,
  bar/arc_strt, tower-1/2, +3 more in the tail) vs C
  `sp_lev.c:985–995`. Status: gate added at each.

## C ↔ JS fidelity

C, verified line by line:

- `sp_lev.c:989–993`: `if (IS_STWALL || IS_TREE || typ == IRONBARS)
  levl[x][y].wall_info |= prop` ✓ — the JS gate expression is verbatim
  (modulo accessor), and matches the pre-existing `splev_non_diggable`
  sibling (`mklev.js:4518`) character for character ✓.
- C writes `wall_info`; JS writes `flags`. Sound: `wall_info` aliases
  `flags` (`rm.h:215`), and every gameplay reader goes through the
  union `rm_wall_info` (`wall_info | flags`, dig.js:188 / zap.js:828)
  ✓ — "union-correct for every OR-reader" holds. Direct
  `loc.wall_info` readers are level-gen-internal passes on a different
  phase; census corroborates (flags8 1679→338, wallinfo8 160
  unchanged).
- Causal cite `muse.c:659` `if (has_defense && !rn2(3)) break` in the
  minvent loop ✓ — matches the "set on item 1, break on item 2" story.
- No RNG in the gate; branch order elsewhere untouched. No symbol
  deleted or re-pointed → `sym.mjs` N/A. Diff grep clean.

Nit: the message's "sibling :4515" is a js/mklev.js line (now :4518
post-edit), not a C line — cite-domain drift, harmless.

## Hallucinations / overclaim

None. "No find_defensive change (owner faithful)" is accurate — the
diff touches only mklev.js loops.

## Density

Cliff head of its parent (`find_defensive` x4) ✓. One gate, whole
family applied (17/17 + the already-gated sibling/solidify sites
enumerated in Named), `Ledger:` entry touched (`sp_lev.c.jsonl`),
focused test, full 44/44 (shared file) ✓.

## Verification

Ship-time: `verify find_defensive: 3 PASS, 1 moved past, 0 unchanged,
0 worse` + reach 70/70; green/strict/cohort.
Re-measure (`verify find_defensive --base e7e82572e~1 --no-reach` on
HEAD): `3 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` —
identical sessions and landing (50255201 →background_enlightenment
@1734, was 995). Exact match. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
