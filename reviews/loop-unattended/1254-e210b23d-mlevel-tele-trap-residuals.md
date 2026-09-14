# Review 1254 — e210b23d — mlevel_tele_trap hole residuals + clone retire

Metadata: SHA `e210b23d`, D-2288, queue row `trap.c mlevel_tele_trap`.
js/: 2 files, +43/−62 (teleport.js arms + trap.js new export).

Intent vs deliverable: subject promises valley assign, botlevel avoids
pline, pline_mon conversions, live impossible, canonical clamp, and 3 clone
retires. Diff delivers all six, nothing else.

Inventory: changed `mlevel_tele_trap` (`js/teleport.js:2818`); new sync
export `clamp_hole_destination` (`js/trap.js:639`); deleted teleport-local
`seetrap`/`mon_has_amulet`/`is_home_elemental`, replaced by static imports.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/teleport.c:2005–2098` (`csym`, 94 lines):

- Stronghold (`:2018`): C unconditionally `assign_level(&tolevel,
  &valley_level)`. JS now copies unconditionally (`v?.dnum | 0` idiom —
  the `?.` only avoids a TypeError if dungeon state were unset; the old
  early-return-Finished is gone). Control flow now matches C. ✓
- Botlevel (`:2021–2029`): `in_sight && trap->tseen` gate (trap non-null
  whenever `is_hole(tt)`; JS `trap?.tseen` is safe-equivalent), noun
  `(tt==HOLE)?"hole":"trap"` (TRAPDOOR→"trap" ✓), then Finished. ✓
- All five in_sight lines (avoids `:2024`, shimmer `:2040`, disoriented
  `:2061`, shudder `:2069`, Suddenly `:2084`) via `pline_mon` — C uses
  `pline_mon` at every one of these sites, so the conversions are faithful,
  not idiom drift. (Disoriented was already `pline_mon`; no miss.) ✓
- Unexpected-type else (`:2079–2081`): previously a comment-only fallthrough
  risk; now `await impossible` with the C format `(%d, tt)` + return
  Finished. ✓
- Hole clamp: canonical `clamp_hole_destination` matches C
  `trap.c:591–599` (`min(dlevel,bottom)` ≡ the `if (>)` assign; returns the
  pointer both sides) over file-local `dng_bottom` — correctly local, since
  C `dng_bottom` is a `trap.c:417–438` staticfn (verified via csym), not a
  portable export. Quest-locate/hell arms ride the existing local. ✓
- Clone retire: `sym.mjs` → `seetrap js/trap.js:1262 sync`,
  `mon_has_amulet js/apply.js:1359 sync`, `is_home_elemental
  js/makemon.js:525 sync`; all three `--can` → ALREADY (no new edge).
  Deleted bodies were behavior-identical walks/switches. Kept-local
  `onscary` is justified, not debt: C `monmove.c:240–303` applies the
  shk/priest own-room resist outside the auditory gate, so it covers
  `(0,0)` — the C citation in the code comment is real. (mon.js:1447/1456
  clones of two of these names pre-date this SHA and live in another file —
  out of scope.)
- RNG: `rn2(7)` portal arm untouched, position preserved. No RNG added.

Hallucinations / overclaim: none. Every C citation resolves to a real line
range.

Density: one function + its clamp helper, net −19 lines — §2b right-sized.

Verification: strongest of the five SHAs — D-log reports a 13/13 hand probe
(valley dest, botlevel seen/unseen + trapdoor noun, clamp simple/no-op/
quest/hell cutoffs, impossible-arm Finished, amulet stay, portal dest +
mconf) plus green/strict/cohort, with an honest vacuous hidden note.
Re-measured: `hidden-proxy verify mlevel_tele_trap --base e210b23d~1` → 0
blocked baseline and working. Diff grep: no banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
