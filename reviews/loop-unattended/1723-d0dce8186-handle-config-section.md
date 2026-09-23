# Review 1723 — d0dce8186 — handle_config_section whole-body port (D-2764)

- SHA: `d0dce8186` (`cfgfiles.c` handle_config_section + is_config_section + free_config_sections, D-2764)
- Files: `js/cfgfiles.js` (+89), docs
- Queue row: Open (coverage MISSING), 0 corpus blocks cited
- Banned grep (FORCE/DIAG/getRngLog/seed/fastforward/coords): 0 hits.
  `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the section filter plus its two staticfn callees as
whole bodies. Diff adds exactly three exported functions in C order and
two imports (`trimspaces`, `config_error_add`). Promise kept, with one
structural caveat (below): no JS call site exists yet.

## Inventory

| JS symbol | Class | C counterpart (csym range) |
|-----------|-------|----------------------------|
| `free_config_sections` | C body | `cfgfiles.c:506–517` |
| `is_config_section` | C body | `cfgfiles.c:520–549` |
| `handle_config_section` | C body | `cfgfiles.c:551–582` |
| `trimspaces` (import) | C callee LIVE | `hacklib.c:163–176` |
| `config_error_add` (import) | named sink | options.c; `js/botl.js:1152` no-op |

`sym.mjs`: `config_error_add js/botl.js:1152 sync`, `trimspaces
js/hacklib.js:340 sync` — single exports, no clones. Nothing deleted or
re-pointed.

## C ↔ JS fidelity

- `is_config_section` `:530–548`: `trimspaces` JS returns the slice
  with leading and trailing space/tab removed — C strips trailing in
  place and returns past leading; the returned string is identical ✓.
  `*a++ != '['` on empty reads NUL → fail; JS `a[0]` undefined → fail ✓.
  `strchr(a, ']')` first `]` ≡ `indexOf` ✓. Spaces-only (not tabs) skip
  `*c == ' '` ✓. `*c && *c != '#'` ≡ `tail !== '' && !startsWith('#')`
  ✓. Cut at `]` then `trimspaces(a)` ✓.
- `handle_config_section` `:554–581`: pointer test `if (sect)` — the
  JS `!== null` is correct because `"[]"` yields a non-NULL empty
  string in C ✓. Free current before the CHOOSE check (`:557–558`) ✓.
  `!chosen` → error + TRUE (`:560–563`) ✓. `*sect` → dupstr current,
  else `free_config_sections` (which also clears `chosen`, as C does)
  ✓. Return TRUE ✓. Non-section arm: current set → `!chosen` TRUE,
  `strcmp` nonzero TRUE ✓; FALSE ✓.
- `free_config_sections` `:509–516`: both fields nulled ✓.
- No RNG in any of the three.

The C input mutation (`*z = '\0'` and trailing strip on `str`) is only
observable to the caller's FALSE path in `parse_conf_buf`; with no JS
caller it is correctly named rather than faked.

## Hallucinations / overclaim

None. The D-log says "whole C body live" for the three functions, which
is true. It does not claim the section filter is live in the game; the
startup map row states the `parse_conf_buf :1768` caller is absent.
The other six `free_config_sections` callers (`:1635`, `:1641`,
`:1816`, `:1834`, `:1849`, `:1858`) all sit in the same unported
read_config_file chain, so leaving them unwired is consistent.

## Density

89 insertions for 74 lines of C across three functions: right-sized for
a small-file port. The whole family is dead code until the config-file
reader is ported; that is a breadth-phase property of the row, not a
fidelity defect.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify handle_config_section
--base d0dce8186~1 --reach-all`:
- `0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)` (vacuous, matches the row's 0 blocks)
- `smoke … 24 run, 3.0s: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log Verify bullet.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
