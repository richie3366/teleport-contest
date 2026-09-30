# Review 2098 — 042bdf039 — glyphs.c glyphrep + match_glyph (closes 1510 Debt 1)

- SHA: `042bdf039511e6cfd97e0b5ccca53c2a3c9635f0` (D-3138)
- Parent: `1edc89993`
- Files: `js/glyphs.js` (+33), `js/options.js` (+2/−2 import + G_ arm + doc); docs + ledger otherwise
- Cluster: 2 whole C functions, one C file; closes review 1510's single Debt item (read for this review)

## Intent vs deliverable

Subject promises: "glyphrep + match_glyph ports, parsesymbols G_ arm wired".
Diff actually adds: both exports in `js/glyphs.js` in C order, `NO_GLYPH` on the existing
display edge, `match_glyph` on the existing glyphs edge in options.js, the G_ arm call now live,
plus doc-comment updates. Promise matches deliverable.

## Inventory

| JS function | kind | C locus (csym) |
|---|---|---|
| `match_glyph` | new export | `glyphs.c:457–467` |
| `glyphrep` | new export | `glyphs.c:469–481` |

No clones; no deleted symbols. `sym.mjs`: `glyphrep_to_custom_map_entries js/glyphs.js:735 sync` (LIVE),
`NO_GLYPH js/display.js:229 export const` (`= MAX_GLYPH` ≡ C display.h:548 `#define NO_GLYPH MAX_GLYPH`).

## C ↔ JS fidelity

**match_glyph** (`glyphs.c:457–467`) — confirm. C copies buf→workbuf (`:465`) then `return glyphrep(workbuf)`
(`:466`). JS `return glyphrep(buf)` elides the copy; the elision is proved safe here, not assumed:
the JS callee re-copies at its `:126` step (`String(op ?? '')`, glyphs.js:737) and never mutates its
input (JS strings immutable; callee works on slices). Callers: symbols.c:825 parsesymbols → wired
(options.js:10937, previously the bare call — the ReferenceError is gone); symbols.c:486 parse_sym_line →
unported, named in the doc comment and D-log (travels with its own future row). No RNG.

**glyphrep** (`glyphs.c:469–481`) — confirm, line-for-line: `reslt = 0, glyph = NO_GLYPH` (`:472`);
`if (!glyphidCache) reslt = 1` (`:474–475`, debugger-only, faithfully kept even though dead);
`:476 nhUse` elided with cite (lint no-op); `reslt = glyphrep_to_custom_map_entries(op, &glyph)` (`:477`)
with the `{ v }` box per the file precedent; `if (reslt) return 1; return 0` (`:478–480`).
C never reads `glyph` after the call (body-verified), so discarding the box is exact.
Sole C caller match_glyph `:466` → wired same-module. Callee LIVE (D-3002), so review 1510's
"do NOT fix with silent stubs" direction is satisfied: whole-body ports, no stubs.

Grep: no FORCE/DIAG/getRngLog/seed-gates/fastforward/coords. Rule #2: clean (see 2096).

## Hallucinations / overclaim

None. The smoke-probe claim (unknown id → glyphrep 0, parsesymbols FALSE via C `:829`
`if (!symp && !is_glyph) return false`) follows from the verified bodies.

## Density

Breadth-phase cluster: 2 whole C functions, one C file, 43 js insertions. Below the ~80 soft floor,
but the D-log justifies it (head's file holds no further Open rows, callee already ported) and the
SHA also closes a live-path ReferenceError — legitimate density. Ledger: both ported, own entries.
Per-function verdicts: match_glyph ACCEPT, glyphrep ACCEPT.

## Verification

Re-measured: `hidden-proxy.mjs verify match_glyph,glyphrep --base 042bdf039~1 --reach-all` → both
`0 session(s) blocked` (vacuous, correctly labelled "expected for coverage") + `smoke 24 PASS,
0 regressed → REACH-OK`. No REGRESSED. Matches the D-log Verify bullet.

## Actionable C-wrongs

None.

Observation (not a C-wrong, not queued): two map mega-lines still name these functions as omits —
`docs/c-js-map/data.md:2017` ("named omits: `match_glyph` + …") and `docs/c-js-map/turns.md:2569`
("named: … `glyphrep`, `match_glyph`, …"). Both are now ported and the G_ caller is wired; the lines
are stale as they pertain to these two symbols (other members named there remain genuinely unported).
Map drift for a future touch of those sections, not Must-fix (JS contradicts nothing in C).

## Verdict

Verdict: **ACCEPT**
