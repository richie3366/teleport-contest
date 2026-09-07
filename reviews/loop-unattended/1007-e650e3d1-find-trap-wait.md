# Review 1007 — e650e3d1 — detect.c find_trap clutter redraw wait (D-2037)

Metadata: SHA `e650e3d1`, D-2037, Open-row port (3
screen-first rows; queue row owner `monshoot`,
openly called misattributed in the subject). js/
touches `js/detect.js` (+31/−5). Also rescores
`hidden-corpus/scoreboard.json`. No stamp owed.

## Intent vs deliverable

Subject promises: `find_trap` in C order —
feel_newsym; Hallucination-or-glyph-mismatch →
cls/map_trap/display_self; set_msg_xy; pline;
cleared → more + docrt. Diff actually adds:
exactly that, plus `more`/`set_msg_xy` import
names on the pre-existing display.js edge.
Promise == diff. No deletes / re-points.

## Inventory

- Changed JS: `find_trap` (static, detect.js).
- `sym.mjs`: `glyph_at js/display.js:793 sync`,
  `trap_to_glyph js/display.js:1967 sync`,
  `feel_newsym js/display.js:4704 sync`,
  `set_msg_xy js/display.js:7112 sync`,
  `more js/display.js:6856 ASYNC` (awaited ✓).
  No STUB / clone / no-op. Named: none new —
  monshoot drift stays map debt (untouched,
  unreached).

## C ↔ JS fidelity

Against `detect.c:1934–1962` (csym range; commit
cites `:1936–1962`, 2 lines off — the `void
find_trap` header), statement-for-statement
confirm:

- `tseen = 1; exercise(A_WIS, TRUE)` ✓;
  `newsym` → `feel_newsym` (the actual fix core —
  C never called newsym here) ✓.
- `Hallucination || levl glyph != trap_to_glyph`
  → `Hallucination() || glyph_at(tx,ty) !== tgid`
  ✓. Read both ends: `glyph_at` returns the
  displayed glyph id (`disp_glyph`, the JS analogue
  of `levl[][].glyph`); `trap_to_glyph` returns a
  `trap_glyph` object, hence the
  number-vs-`.glyph` normalization — the same
  pattern the `foundone` precedent uses. No
  invented predicate.
- `cls(); map_trap(trap,1); display_self();
  cleared=TRUE` ✓; `set_msg_xy` before the
  message ✓; `You("find %s.")` → pline ✓;
  `cleared → display_nhwindow(WIN_MAP,TRUE);
  docrt()` → `await more(); await docrt()` ✓
  (WIN_MAP-wait → more() is the eat.js mimic-arm
  mapping, cited in-code).
- RNG: none drawn in this envelope — consistent
  with the full-session RNG matches cited (e.g.
  3575/3575).

## Hallucinations / overclaim

None. The subject discloses the misattribution
(queue row said monshoot; the writer was
find_trap) instead of claiming a monshoot port,
and the Named paragraph keeps monshoot drift as
map debt. The 2-line C-range slip is citation
noise, not substance.

## Density

~31 insertions, one 29-line C function, one
falsifier (three sessions, same screen). Right-sized.

## Verification

- `imports.mjs --rulecheck`: clean (whole-tree).
  Added-line grep for FORCE/DIAG/getRngLog/
  fastforward: 0 hits.
- Re-measured `hidden-proxy verify monshoot --base
  e650e3d1~1`: `1 PASS, 2 moved past, 0 unchanged,
  0 worse → PROGRESS` — matches the D-log exactly
  (Archeologist-92190 PASS; Knight-92106 → armoroff
  step 49; Wizard-91114 → do_statusline1 step
  119). No vacuous PASS: the bullet names the moved
  owners and steps.
- Green 2/2 + strict ×2, cohort 7/7 per D-log;
  full suite skipped (no shared file — detect.js is
  leaf-ward; accepted).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
