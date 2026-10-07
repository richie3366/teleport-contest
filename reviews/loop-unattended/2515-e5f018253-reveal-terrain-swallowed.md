# Review 2515 — e5f018253 — reveal_terrain swallowed classification (D-3635)

## Metadata

- SHA: `e5f018253` (2026-10-07) — cliffs-head writer, D-3635
- D-entry: D-3635 (reveal_terrain_getglyph swallowed path)
- js diff: `js/display.js` +23/−1; no helper added, deleted, or re-pointed
- Type: cliff (≤10 functions) — whole Method per function + movement re-measure

## Intent vs deliverable

Promise (subject + D-log): `#terrain` while swallowed paints a remembered
weapon `)` where C paints stairs `<` (scen-engulf-Archeologist-94292 step
252), because the swallowed branch copied `levl_glyph` but never ran C's
mon/warning/swallow classification or the obj/trap/invisible restore+strip
arms; classify the memory int in C order so the existing arms fire.
1 corpus PASS.

Diff actually adds: in the `swallowed` branch, `kind = 'mon'` on the
engulfer arm, else an `else` block computing `was_mon` + `kind`
(invisible/obj/trap) from the memory id via the live `glyph_is_*`
predicates. No signature changes, no RNG-adjacent code.

## Inventory

| # | JS change | C locus | Status |
|---|-----------|---------|--------|
| 1 | `js/display.js:4728` engulfer arm + `kind='mon'` | `detect.c:2211–2212` | ports C |
| 2 | `js/display.js:4729–4752` swallowed else-classify | `detect.c:2213–2218` | ports C |
| 3 | cite correction `:2213–2215` → `:2211–2212` | `detect.c:2211–2212` | correct |

`Ledger:` reveal_terrain_getglyph ported — body now complete; consistent.

## C ↔ JS fidelity

C `detect.c:2210–2218` (counted from the pinned body; `csym` locus
`detect.c`, function `reveal_terrain_getglyph`):

```c
glyph = !swallowed ? glyph_at(x, y) : levl_glyph;
if (keep_mons && u_at(x, y) && swallowed) {          /* :2211–2212 */
    glyph = mon_to_glyph(u.ustuck, rn2_on_display_rng);
} else if ((!keep_mons && (glyph_is_monster(glyph)   /* :2213–2218 */
                         || glyph_is_warning(glyph)))
           || glyph_is_swallow(glyph)) {
    glyph = levl_glyph;
    was_mon = TRUE;
}
```

JS branch-by-branch:

- Engulfer arm: guard `keep_mons && ux===x && uy===y && ustuck` matches
  `keep_mons && u_at && swallowed` (swallowed is the outer branch; `ustuck`
  is implied by swallowed in C, and the guard predates this diff).
  `mon_to_glyph(uu.ustuck)` defaults to `rn2_on_display_rng`
  (`js/display.js:639`, verified) — matches C `:2212`. New `kind='mon'`
  is safe: the later `!keep_mons && kind==='mon'` block
  (`js/display.js:4876`) cannot fire since this arm requires keep_mons,
  mirroring C's if/else-if exclusivity; restore/strip arms keying on
  obj/trap/invisible/was_mon correctly skip, as in C.
- Else arm: `((!keep_mons && (monster||warning)) || swallow)` reproduces
  C `:2213–2215` exactly (`&&` binds tighter in both languages);
  `was_mon=true` with glyph left as the levl copy reproduces `:2216–2217`
  (assignment is a no-op when swallowed). `kind` from `GLYPH_INVISIBLE` /
  `glyph_is_object` / `glyph_is_trap` on the memory int reproduces the
  `glyph` operand C's `:2219–2224` restore and `:2225+` strip arms read.
- Downstream arms (`js/display.js:4905–4925`): restore
  `((!keep_objs && obj) || invisible) && keep_traps && !covers_traps` and
  strip `(!keep_objs && obj) || (!keep_traps && trap) || invisible || (reg
  && was_mon)` match C `:2219–2231` predicate-for-predicate; the new
  classification feeds them identically to the !swallowed path.

All six names resolve LIVE (`sym.mjs`: `glyph_is_monster/warning/swallow/
object/trap` + `mon_to_glyph` all sync in `js/display.js`, same file —
no import, no clone, no stub). New code draws no RNG (range predicates
only); `mon_to_glyph` call unchanged.

Named omit claimed («gascloud-memory needs no arm») is C-true for the
swallowed path: C keys the gascloud clause on the displayed glyph, and
the swallowed glyph is never a cloud — the JS `glyph_shows_cloud` block
is explicitly `!swallowed`-gated (`js/display.js:4859`). Kept in the map,
correctly not a Must-fix.

## Hallucinations / overclaim

None. The D-log correctly identifies the owner as the region heuristic and
ports the writer; the `u.uswallow` transient discussion cites
`unconstrain_map :70–81` / `reconstrain_map` and claims C-parity rather
than a second fix — consistent with the session reaching PASS. No
dispatch-vs-callee overclaim (single function, whole).

## Density

Cliff phase §10.18: one cliff, one C function arm family, one `Ledger:`
entry, code + verify in one handoff. Owner-vs-writer decision explicit
(painter C-whole per D-3556, writer = swallowed arm). No foreign-file
work, no re-audit, no ledger-text content. Right-sized.

## Verification

D-log claims: `verify reveal_terrain: 1 PASS` (scen-engulf-Archeologist-
94292), REACH-OK (smoke 24/24), green + strict + cohort, full 44/44
(shared file). Focused test present.

Re-measured:
`node scripts/hidden-proxy.mjs verify reveal_terrain --base e5f018253~1 --reach-all`:

- `verify reveal_terrain: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (scen-engulf-Archeologist-94292: PASS)
- `smoke reveal_terrain: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK`

PASS claim reproduces exactly; no REGRESSED. Rule #2 clean globally
(`imports.mjs --rulecheck`); diff grep for FORCE/DIAG/getRngLog/
fastforward/coords: 0 hits. No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
