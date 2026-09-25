# Review 1733 — d61d9e62a — menu_objsyms option (D-2774)

- SHA: `d61d9e62a` (`options.c` handler_menu_objsyms + optfn_menu_objsyms + set_menuobjsyms_flags, D-2774)
- Files: `js/options.js` (+164/−2), docs
- Queue row: Open coverage (MISSING), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (re-run this audit).

**Addressed:** D-2782

## Intent vs deliverable

Subject promises the three functions plus the option going live. Diff
delivers: `objsymvals`, `set_menuobjsyms_flags`, `optfn_menu_objsyms`
(do_init/do_set/get_val, do_handler async-split), `handler_menu_objsyms`,
the `doset_optfn_do_handler` arm, allopt optfn wiring, doset row with
live value + handler, and parseNethackrc do_init + two do_set sites.
The bodies are whole and C-ordered; one call site breaks C case
semantics (below).

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `objsymvals` (new) | C table | `options.c:273–280` (struct `:242–246`) |
| `set_menuobjsyms_flags` (new) | C body | `options.c:7444–7451` |
| `optfn_menu_objsyms` (new, export) | C body minus do_handler arm | `options.c:2224–2287` |
| `handler_menu_objsyms` (new, export) | C body | `options.c:5794–5829` |
| doset arm + allopt optfn + rc sites | C callers | doset `:8935`, do_init loop `:7426–7431`, parseoptions `:636` |

Nothing deleted or re-pointed. Callees LIVE: `optStrncasecmp`
(C-strncmp semantics incl. NUL padding, verified),
`select_menu_pick_one`, `set_optbuf`, `doset_compopt_get_val`,
`allopt_idx`. C `digit()` (`hacklib.c:62–64`) is exactly
`'0'<=c<='9'` ✓; optlist.h `:451` carries the `use_menu_glyphs`
alias ✓; C match is case-insensitive (`match_optname` uses
`strncmpi`) while the do_set `strncmp` is case-sensitive.

## C ↔ JS fidelity

- Table: all 6 num/nam/descr rows match C verbatim ✓. Flags setter:
  bit 1 → head, bits 2|4 → glyphs, exact ✓.
- do_init 4 ✓; do_set `negated → 0` unconditional ✓ (negateok=Yes);
  `op === EMPTY_OPTSTR` ⟺ C `op == empty_optstr`: C reaches the optfn
  only via `string_for_opt`, which returns `empty_optstr` for a bare
  colon (verified), and JS `val` is `''` exactly then ✓; digit arm
  with `>= SIZE → optn_err` before the store (prior value kept) ✓;
  name loop `k>=4 → l=k`, per-row `l=len(nam)`, `i==5` alt
  `one-or-the-other` ✓ (spot-checks `both→3`, `5→5`, `9→err`,
  `ent→0` all reproduce C); get_val name ✓; do_handler split into
  `doset_optfn_do_handler` with the arm added ✓.
- Handler walked against `:5794–5829`: sep ✓, `%-12.12s%c%.60s` ✓,
  a_int/selector/gacc/preselect ✓, `n>1` fold named (msg_window
  precedent) ✓, `nul_glyphinfo`/NO_COLOR named ✓.
- do_init runs before the `!rc` early return and `g.iflags` spreads
  `opts.iflags` last, so `menuobjsyms` is always initialized ✓.

**C-wrong (call site breaks case semantics).** C `:2249` is
`!strncmp(opts, "use_menu_glyphs", 15)` — case-sensitive, on the
case-preserved `opts` (parseoptions never lowercases). The site-1 rc
arm correctly passes `stripped`, but the site-2 valueless arm passes
lowercased `lname`. So valueless `USE_MENU_GLYPHS` (any
non-lowercase): C matches the alias case-insensitively, then the
sensitive `strncmp` fails → headers (1); JS `startsWith` on the
lowercased copy succeeds → entries (2). The neighboring msg_window
site-2 arm passes `stripped` — this site should too. One-word fix.

## Hallucinations / overclaim

None. "Whole C bodies in C order" holds for all three functions; the
gap is the caller's argument, not a body.

## Density

~140 behavior lines for three C functions + wiring: in range. Named
omits (`config_error_add` sink, glyph columns, `n>1` fold, invent.js
readers) are in the map in this commit.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify handler_menu_objsyms
--base d61d9e62a~1 --reach-all`: 0 blocked + vacuous note (expected —
coverage row, 0 blocks) + smoke 24/24 REACH-OK. Matches the D-log
(green/strict/cohort/full 44/44 also claimed).

## Actionable C-wrongs

1. `js/options.js` parseNethackrc valueless `menu_objsyms` arm: pass
   `stripped`, not `lname`, as `opts` to `optfn_menu_objsyms`, so the
   C `:2249` case-sensitive `strncmp` sees the case-preserved string
   (msg_window site-2 precedent in the same function).

Verdict: **QUALITY-RISK**
