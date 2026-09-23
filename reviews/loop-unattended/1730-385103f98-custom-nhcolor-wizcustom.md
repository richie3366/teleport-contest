# Review 1730 — 385103f98 — add_custom_nhcolor_entry + wizcustom_glyphids (D-2771)

- SHA: `385103f98` (`glyphs.c` customization entries, D-2771)
- Files: `js/glyphs.js` (+123), docs
- Queue rows: two Open coverage rows (MISSING), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises "whole-body ports" of `add_custom_nhcolor_entry` and
`wizcustom_glyphids`. Diff adds a module-local `sym_customizations`
grid, the `graphics_sets` / `customization_types` constants, exported
`find_matching_customization`, exported `add_custom_nhcolor_entry`,
module-local `find_glyphid_in_cache_by_glyphnum`, and exported
`wizcustom_glyphids`. The first function has real behavior. The second
is a loop whose only statement, the `wizcustom_callback` call, is a
comment.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `find_matching_customization` | C body | `glyphs.c:735–748` |
| `add_custom_nhcolor_entry` | C body | `glyphs.c:483–528` |
| `find_glyphid_in_cache_by_glyphnum` | C body (staticfn) | `glyphs.c:417–432` |
| `wizcustom_glyphids` | C body, sole callee OMIT | `glyphs.c:807–821` |
| `wizcustom_callback` | OMIT (named in `turns.md` this commit) | `wizcmds.c:1986–2027` |
| `sym_customizations` | data, `[NUM_GRAPHICS+1][custom_count]` | `decl.h:857–860` |

Callers: `add_custom_nhcolor_entry` ← `glyphs.c:94`
`to_custom_symset_entry_callback` (unported); `wizcustom_glyphids` ←
`wizcmds.c:1967` `wiz_custom` (unported). Both are named. Nothing
deleted or re-pointed.

## C ↔ JS fidelity

- Enums vs `sym.h:125–139`: PRIMARYSET 0, ROGUESET 1, NUM_GRAPHICS 2,
  UNICODESET = NUM_GRAPHICS; custom_none..custom_count = 0..4 ✓. The
  grid is `3 × 4` (custom_count = 4) ✓. The D-log and the map row
  say `[3][5]`, which is wrong in the docs only.
- `find_matching_customization`: custtype equality, non-NULL name
  (JS `!== null`), strcmp equality ✓.
- `add_custom_nhcolor_entry`: lazy header init when `!gdc->details` ✓;
  find → walk → update `nhcolor` on matching `glyphidx`, return 1 ✓;
  else append at `details_end`, `count++`, return 1 ✓. The C write of
  `glyphidx` through the `urep` arm hits the same union offset as
  `ccolor.glyphidx` (both are the first `int`), so folding it into one
  `ccolor` record is exact ✓. `uint32` as `>>> 0` ✓.
- `find_glyphid_in_cache_by_glyphnum`: NULL-cache guard, linear scan,
  `id != 0` ✓. JS cache buckets are pre-filled `{glyphnum: 0, id:
  null}` (`glyphs.js:162–165`), so no undefined access.
- `wizcustom_glyphids`: guard, `0..MAX_GLYPH-1` loop, scan, `if (id)`
  gate ✓ — then nothing. `wizcustom_callback` reads
  `glyphmap[glyphnum].customcolor` / `.sym`, i.e. the glyphmap table
  behind `reset_glyphmap`, which CURRENT's "Do not" list keeps out.
  So this is a legitimate OMIT, not a stub hiding portable code.
- No RNG anywhere.

## Hallucinations / overclaim

"Whole-body port" for `wizcustom_glyphids` is an overclaim: the JS
function has no observable effect until `wizcustom_callback` and
`wiz_custom` exist. The commit does name the callback, so this is
debt, not a hidden stub. Doc slip: `sym_customizations[3][5]` in the
D-log, CURRENT recent line, NOTES landmark and turns.md; the code is
`[3][4]`, which is correct.

## Density

123 insertions for ~90 lines of C across four functions plus the data:
fine. Both exports are dead code until their unported C callers land.
That is expected in the breadth phase, but it moves no held-out
session.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify <fn> --base 385103f98~1
--reach-all` for both:
- `add_custom_nhcolor_entry`: `0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)`; `smoke … 24 PASS, 0 regressed → REACH-OK`
- `wizcustom_glyphids`: `0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)`; `smoke … 24 PASS, 0 regressed → REACH-OK`

Matches the D-log.

## Actionable C-wrongs

None that are C-wrongs. Debt (map, not Must-fix): the
`wizcustom_callback` call site is empty until the glyphmap table is
reopened; the `[3][5]` doc text should read `[3][4]` the next time
turns.md is touched.

Verdict: **ACCEPT-WITH-DEBT**
