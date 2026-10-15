# Review 2817 — 0ec553554 — des-place helpers gain C's stackobj

- **SHA:** `0ec553554` (Thu 2026-10-15) — cliffs-head writer (D-3971).
- **D-entry:** D-3971. **Ledger:** `sp_lev.c` (`create_object`, split, re-stamped).
- **Diff size:** `js/mklev.js` 14 hunks, +16 stackobj call lines across 15 helpers; +1 test.
- **Method:** cliff (one C line family across its split ports) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the `m_move` cliff row (3 corpus blocks —
C `rn2(4k)` at `monmove.c:1963` vs JS `rn2(5)` from
`distfleeck`, one-die offset on the same turn) is caused by 15
des-loader place helpers bypassing the canonical `create_object`
port without its `:2422-2423` `stackobj`, leaving split piles
(minend-2) that lag `m_search_items` by a turn. The fix adds the
missing `stackobj` at all 15 floor sites. 3 PASS outright.

The diff is exactly that: `stackobj(otmp)` after the attribute
sets in the `placeObj`-shaped helpers, `stackobj(mkobj_at(…))`
around the `placeClass`-shaped ones, each with the `:2422-2423`
cite. Promise and diff agree.

## Inventory

15 helpers in `js/mklev.js` (14 hunks; the minend-2 hunk holds two
helpers, the `splev_room_object` if/else two call lines — hence 16
added call lines for 15 sites, count reconciled): `load_sam_loca`
(placeClass), `load_tower2`, `load_tower3`, `load_minend_1`,
`load_minend_2` (placeObj + placeClass), `load_minend_3`
(placeObj + placeObjRnd), `tut1_object`, `splev_room_object`,
`load_castle`, `load_asmodeus`, `load_juiblex` (the `placeClassAt`
hunk whose context header is `xxx…` — Juiblex level by its
`lemure` neighbor), `load_baalz`, `load_orcus`.
Plus `scripts/minend-des-object-stack.test.mjs`.

No function added, deleted, renamed, or re-pointed. The step-3
sym-run requirement is vacuous. `sym.mjs stackobj` →
`js/mkobj.js:3318 sync`, imported live at `js/mklev.js:116` — LIVE,
not a clone. Diff grep: no `FORCE`, `DIAG`, `getRngLog`, seed
names, `fastforward`, or hardcoded coordinates.

## C ↔ JS fidelity

C `create_object` (`nethack-c/upstream/src/sp_lev.c:2192-2440` per
`csym.mjs fn create_object`) ends, after the content/container and
Medusa-statue handling:

```c
if (!(o->containment & SP_OBJ_CONTENT)) {   /* :2422 */
    stackobj(otmp);                          /* :2423 */
    if (o->lit) begin_burn(otmp, FALSE);
    …
```

The cite is exact, including the gate: stacking applies to
non-content floor placements only. The 10 skipped content/invent
sites (statue/chest `addContent`, quest-start mon invent,
candle/amulet) are correctly skipped — C removes the object from
the floor (`remove_object`/`obj_extract_self`) on the content path
and never stacks it there.

Per-site fidelity:

- Order: C stacks after all attribute assignment (quan/erosion/
  traps/grease). JS places `stackobj` after the `oeroded/
  oeroded2/oerodeproof` sets (and after `quan` where the helper
  sets it) — C order.
- Null-safety: C `otmp` is non-NULL on the stacking path (the
  content `obfree` path returns NULL earlier). JS
  `mkobj_at`/`mksobj_at` can return null, but the live
  `stackobj` (`js/mkobj.js:3318`) opens with
  `if (!obj || obj.where !== OBJ_FLOOR) return;` — the wrapping
  is safe, and the one guarded site (`if (_o) stackobj(_o)`)
  is belt-and-braces.
- `stackobj` itself is a whole live port (floor loop + `merged`
  with the C `*potmp` reassignment kept). No RNG inside; the
  behavioral effect (merged piles → different `m_search_items`
  timing) is emergent, not drawn — consistent with the one-die
  offset story.

Named omissions (audited here, in-map, not Must-fix):
(1) `splev_create_boulder` unstacked — true no-op, boulders have
`oc_merge = 0` and `merged()` cannot fire.
(2) `mksobj` gem quan/`o_id` cosmetics — same totals, no corpus
evidence; correctly left alone.
(3) random-scatter parity unaudited — no evidence either way;
naming it without a row is right.
(4) `rebuildObjectsAt` restore-stacking "inferred, not separately
traced" — the one soft spot: the Healer PASS is attributed to the
castle fix plus restore preservation without a dedicated trace.
It is disclosed as inference, and the session PASSES, so there is
no open divergence hiding behind it. Acceptable.

## Hallucinations / overclaim

None. No "Match C" is claimed for any dispatch — the change is 16
call insertions into existing helpers, each citing the same two C
lines, and the callee is the live export. The temp-C/temp-JS
measurement hooks are stated reverted with md5s and a string-free
rebuild check; the working tree at this SHA contains no DIAG
(the diff grep is clean and `mklev.js`/`mkobj.js` show no
`TENDRUN`-shaped residue). The causal chain (split piles →
search-lag → `m_move:1963` offset) is long but each link was
measured, and the outcome (3 outright PASS) is the strongest
possible corroboration.

## Density

Cliff phase: the owner is the `m_move` cliff row (head at the
parent SHA per the D-log Status), and the port is its writer —
the `create_object` stacking family, shipped whole across every
split port in one commit rather than arm-by-arm. One cliff, one C
line family, code + ledger + verify in one handoff. The ledger
`split` row lists all 15 JS sites (verified against the diff).
No bundled file, no sweep, no self-filed row.

## Verification

Re-measured by this audit
(`hidden-proxy.mjs verify m_move --base 0ec553554~1 --reach-all`):

- `verify m_move: 3 PASS, 0 moved past, 1 unchanged, 0 worse →
  PROGRESS` — the exact three claimed sessions PASS
  (Tourist-50055019, Caveman-49956036, Healer-50055087). The one
  "unchanged" row (scen-shop-Rogue-50450077, still m_move@425)
  postdates the baseline (Grow #10) and is not a regression.
- `reach m_move: 3357 baseline-PASS session(s) reach it (3357
  run): 3357 PASS, 0 regressed → REACH-OK` — full `--reach-all`
  on a hot function, zero regressions.
- D-log gates: syntax, rule2, green 2/2, strict ×2, cohort 7/7,
  full 44/44 (shared file). The audit's end-of-iteration rescore
  re-covers the fortress.

No seed/step/coordinate/RNG-index reads; no trace shaping.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
