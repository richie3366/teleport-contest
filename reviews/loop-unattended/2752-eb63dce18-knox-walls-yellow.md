# Review 2752 — eb63dce18 — Knox walls yellow under DECgraphics

- SHA: `eb63dce18386d0f07ea37e80d487daebcd359312`
- Subject: D-3896 level_tele-row writer Knox wall color (578306 s859 → PASS)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3896` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: Knox walls missed the symset-customcolor yellow arm — Fort
Ludios arrival corners painted default where C paints yellow; fix adds
the Knox arm to `wall_cmap_color` in C bank order with the sokoban-style
DEC gate, moving Knight-578306 to PASS.

Diff actually adds: `js/display.js` — one `else if` arm
(`Is_knox(uz) && use_decgraphics()` → CLR_YELLOW) + comments; new
`scripts/knox-walls-yellow.test.mjs`. No new import edge (`Is_knox`
already imported at display.js:62, `use_decgraphics` local at :3431).
No other `js/` hunks.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `wall_cmap_color` (js/display.js) | display.h:598–604 (cmap_walls_to_glyph, csym) + dat/symbols G_ overrides | changed, one arm |

## C ↔ JS fidelity

C order (`display.h:598–604`, csym): mines → hell → knox → soko → main.
JS order after the fix: mines → hellish → knox → sokoban → gray — exact
match, arm inserted in the right slot.

C color source: audited `dat/symbols` directly — DECgraphics block
(`start: DECgraphics` :689) carries all 11 `G_*_knox: /yellow` entries
(:754–764); IBMgraphics block has them too (:304–314). The DEC gate
mirrors the shipped sokoban precedent (ASCII carries no G_ entries →
gray, D-0729). TEMP-C measured `cust=0x100000B` on Knox glyphs per D-log.

Helper classification: no new helpers; arm uses two in-scope predicates.
The unported symset-G_ parse path (read_sym_file → details) is named in
the D-entry as by-design with the D-0283/D-0801/D-0729 precedent, with
the unreached cases (user GLYPHREP recolors, IBM/curses symsets) stated —
named, C-cited, session-evidenced ("no committed session reaches either").

Grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed/coords in `js/` hunk.

## Hallucinations / overclaim

None. "Live + memory paints both flow through wall_cmap_color" is
consistent with the diff (wall_glyph calls it; remember path stores
painted tty). TEMP-C hygiene (revert + pristine rebuild + byte-identical
re-record) explicitly stated.

## Density

Cliff phase: `level_tele` was the cliffs row-2 (head UNPORTABLE) —
override precedent, real `js/` + movement. `Ledger:` entries present
(coloratt.c + glyphs.c touched). One cliff, one function, no bundling.
Not a no-op.

## Verification

D-log: `verify level_tele: 1 PASS`, reach 19/19, green/strict/cohort/full.
Audit re-measure (`verify level_tele --base eb63dce18~1 --reach-all`):
578306 PASS; `1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS`;
reach 19/19 → REACH-OK. The 1 unchanged (Healer-585512, a post-commit
grow session, "1 in the working scoreboard") is still level_tele, not
worse — not a regression, just a newer session this SHA predates. No
REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
