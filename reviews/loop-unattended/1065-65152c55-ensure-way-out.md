# Review 1065 — 65152c55 — ensure_way_out port (D-2095)

Metadata: SHA `65152c55`, `js/mklev.js` +193/−8 + one-word export on
`js/trap.js`, queue owner selection_rndcoord (1 session). D-log D-2095.

## Intent vs deliverable

Subject promises: `ensure_way_out` never ran on minetn-6; port it
(floodfill predicate + selection flood + way-out method + driver)
pre-wallification. Diff actually adds exactly that, reusing live
imports and extending the existing trap.js edge. Promise == deliverable.

## Inventory

New JS: `floodfillchk_match_accessible`,
`selection_floodfill_accessible`, `generate_way_out_method`,
`ensure_way_out` (all file-local); 4 otyp consts via the file's
`objectNames.indexOf` idiom. Re-pointed: `undestroyable_trap`
(local → exported; `sym.mjs → js/trap.js:663 sync`, single def; mklev
already held the trap.js edge). `is_hole` used by the new code resolves
to the pre-existing mklev-local clone (:346; `sym.mjs` notes the
`js/const.js:2532` export — pre-existing drift, `t===HOLE||t===TRAPDOOR`
matches the C macro, not this delta).

## C ↔ JS fidelity

Verified verbatim against C: floodfill predicate (`sp_lev.c:4600–4605`
ACCESSIBLE||SDOOR||SCORR); flood stack shape (`selvar.c:395–452` —
LIFO pop order, seed added unconditionally on pop, neighbours
isok+predicate+not-visited, diagonals param; JS `seen`-at-push ≡ C
`tmp`-at-pop + `sel_flood_havepoint`, both block duplicate pushes);
secret-door +x/−x/+y/−y order with `!getpoint/+IS_WALL/getpoint/
+ACCESSIBLE` (`sp_lev.c:5150–5185`); `rn2(2) ? HOLE : TRAPDOOR`;
escape-item list identical 6 items in order with `ROLL_FROM =
array[rn2(SIZE)]` (`hack.h:1493`) ≡ `escapeitems[rn2(length)]`;
third-arm `rndcoord(ov2, FALSE)`; stairs + undestroyable/hole trap seed
loop; `x = 1` start (`sp_lev.c:5217–5255`, csym range :5216–5255).
`selection_rndcoord` removeit drain (`selvar.c` bounds walk,
`rn2(idx)`, clear-on-remove) is pre-existing JS corroborated by the
draw-level match below. Confirm all of the above.

**C-wrong 1 (the driver loop):** C `:5241–5251` ends the match arm with
`goto outhere`, whose label sits *outside both loops* — one join exits
the x-scan entirely and the do-while rescans from `x = 1`. JS uses a
bare inner `break`, which exits only the y-loop; the x-scan continues
rightward and same-column stragglers (`(x0, y>y0)` still
ACCESSIBLE-not-in-ov) wait for the next full pass. With ≥2 disjoint
inaccessible regions sharing a column with a further-right region
pending, C joins R3a→R3b→R5 while JS joins R3a→R5→R3b — different
`selection_rndcoord` drain sequences, different dice. The D-log's
"inner-`break` = C `goto outhere`" is factually wrong. Latent, not
active: minetn-6's observed layout never stacks disjoint regions this
way (671 drain draws + `rn2(2)` hole + `rn2(4)` hole_destination + flip
dice + place_lregion all match positionally per the D-log's
`hidden-proxy show`, and my re-run confirms the session moved). Fix is
one iter: labeled `break outer` (or equivalent) + re-verify. → Must-fix
below; Actionable 1.

## Hallucinations / overclaim

One: "verbatim" for `ensure_way_out` overclaims given C-wrong 1, and
the "Named: … draw-free on this path" for `map_cleanup` /
`count_level_features` / `link_doors_rooms` extras is asserted from "C
shows no draws between the hole arm and the flip dice" — true on the
observed path, but those extras *move walls/doors*, i.e. they change
flood geometry on other seeds; the draw-free claim needs the
geometry-invariance argument, which the D-log does not make. Not a
wrong today (draws match), but the next minetn-6-seed divergence must
re-open those three first. Noted, not queued.

## Density

~200 insertions, one C family, one owner — at the §2b ceiling, single
envelope. OK.

## Verification

- Rule #2 clean (global rulecheck). Ban grep 0.
- Re-measured `hidden-proxy.mjs verify selection_rndcoord --base
  65152c55~1`: "0 PASS, 1 moved past (1 re-attributed at the same step),
  0 unchanged, 0 worse → PROGRESS" (Ranger-92033 → rloc same step 70)
  — matches D-log. Same-step re-attribution with full positional draw
  match through the level-gen run is genuine PROGRESS here, not
  re-report noise (rngM 15152→15701 per D-log).
- Green/strict/cohort/full-44/44 recorded (shared-file change ran full).

## Actionable C-wrongs

1. `ensure_way_out` rescan order: inner `break` must become
   both-loops exit (`break outer` / flag) to match C `goto outhere`
   (`sp_lev.c:5241–5251`); re-run `verify --fn selection_rndcoord`
   plus a second minetn-6 seed if reachable. One port iter. →
   Must-fix prepended to LOOP-QUEUE.md; CURRENT Next cluster set.

Verdict: **QUALITY-RISK**
