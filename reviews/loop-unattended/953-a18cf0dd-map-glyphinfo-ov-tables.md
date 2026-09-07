# Review 953 — a18cf0dd — display.c map_glyphinfo ov_* override tables (D-1983)

- SHA: `a18cf0dd` — "display.c map_glyphinfo ov_* accessibility override tables (D-1983)."
- D-id: D-1983. JS: `js/display.js` (+66/−6). C locus: `nethack-c/upstream/src/display.c` `map_glyphinfo` `:2593–2655` (hero arm `:2637–2644`), `hack.h:1080–1085` offset chain, `sym.h` enums, `symbols.c` init/update (cited ranges, bodies spot-checked this review).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the ov_* accessibility tables plus the hero arm.
Diff actually adds: `SYM_OFF_X`/`SYM_MAX`, two lazy tables, four
init/update exports, the live hero arm. Promise matches deliverable.

## Inventory

- New: 2 constants, 2 local table accessors, 4 exported functions, 1 live arm.
- Changed: two doc comments retiring the "gate reads shut" note.
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

Offset arithmetic verified through the C define chain:
`SYM_OFF_X = 0+105+18+61+6 = 190`, `SYM_MAX = 190+6 = 196` ✓
(`S_expl_br = 104` fencepost ⇒ MAXPCHARS 105 confirmed in
defsym.h:247; WARNCOUNT 6 at sym.h:174; MAXOTHER trailing the
`SYM_HERO_OVERRIDE = 5` enum, matching const.js:2810 ✓).
Hero arm `:2637–2644` ✓: `accessibility == 1 &&
!(NOOVERRIDE)` gate kept in C order; offset
`SYM_HERO_OVERRIDE + SYM_OFF_X` ✓; rogue-vs-primary table
picked by live `Is_rogue_level` (already imported, display.js:59)
standing in for the `glyphmap_perlevel_flags` cache — named ✓.
One adaptation, documented: C writes `symidx = offset` (later
resolved through showsyms[]); JS has no showsyms machinery
(named omit), so it writes the override char directly into
`out.ch`. Same visible result on the only path that can paint it.
`update_*_symset` normalizes uchar→0/single-char, matching C's
"0 means none" ✓. No RNG.

Callee closure: `SYM_HERO_OVERRIDE` extends the existing const.js
edge (ALREADY); no new module edges. No STUBs, no clones.

## Hallucinations / overclaim

None. Deferred machinery (`get_othersym`, showsyms copy, per-level
cache, pet arm, lookat loop, options wiring) named with loci.

## Density

+66/−6, one tight C family in one module. Right-size per §2b.

## Verification

Honest vacuous note; green + strict + cohort 7/7 + full 44/44
(auto: shared file). Re-measured:
`verify map_glyphinfo --base a18cf0dd~1` → "0 session(s)
blocked (0 at baseline, 0 in the working scoreboard)".
`--rulecheck` clean (re-run). Added-line grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
