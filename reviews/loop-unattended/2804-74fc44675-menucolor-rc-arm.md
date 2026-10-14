# Review 2804 — 74fc44675 — parseNethackrc gains the MENUCOLOR arm

- **SHA:** `74fc44675` (Wed 2026-10-14) — cliffs-head writer (D-3955).
- **D-entry:** D-3955. **Ledger:** `cnf_line_MENUCOLOR` re-tagged.
- **Diff size:** `js/options.js` +11 lines (one arm); +1 test file (2 its).
- **Method:** cliff (1 fn) — whole Method on the arm + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the O-menu painter `handler_menu_colors` is the
region heuristic; the real writer is the startup rc reader dropping
the `MENUCOLOR="cursed"=brown` line — add a top-level `MENUCOLOR=`
arm to `parseNethackrc` calling the live same-file
`add_menu_coloring` (29 symset sessions: 11 PASS + 18 moved).

The diff is exactly that arm plus the committed test. Promise and
diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `parseNethackrc` MENUCOLOR arm → `add_menu_coloring(bufp)` | cfgfiles.c:1163–1167 (`return add_menu_coloring(bufp)`), table :1365 | call-for-call |
| 2 | `scripts/menucolor-rc.test.mjs` — 2 its | coloratt.c:616–660 | happy + malformed |

No helper, no import change, no symbol deleted or re-pointed (same
file; `sym.mjs add_menu_coloring` → `js/options.js:6218 sync`, sole
definition — no clone anywhere).

## C ↔ JS fidelity

**Dispatch.** C `cnf_line_MENUCOLOR` (`:1163–1167`, via csym) is
`return add_menu_coloring(bufp);` — the JS arm does exactly that.
Table order claim verified: `CNFL_N(MENUCOLOR, 9)` at `:1365`
precedes `ROGUESYMBOLS` at `:1368`, and the arm sits before the
ROGUESYMBOLS arm (order is cosmetic — no line matches both — but the
cite is true). `bufp` = text after the first `=` (find_optparam
`:588–598`); the regex `/^MENUCOLOR=(.+)/i` captures exactly that,
case-insensitive per `match_optname`, full name per len 9. The
pre-existing `js/cfgfiles.js:747 cnf_line_MENUCOLOR` (`return
!!add_menu_coloring(bufp)`) calls the same callee — the new arm is a
second dispatch entry point for JS's second rc reader, not a
divergent clone.

**Callee (whole).** `js/options.js:6218 add_menu_coloring` mirrors C
`coloratt.c:616–660` statement-for-statement: BUFSZ-truncated copy,
`=` split + `config_error_add("Malformed MENUCOLOR")` + FALSE,
`mungspaces` past `=`, `&` split, `match_str2clr` + CLR_MAX gate,
`match_str2attr` + −1 gate, quote-strip with trailing-space
backtrack (`slice(1, j)` ≡ C's `*cs='\0'; tmps++`), then
`add_menu_coloring_parsed`. LIVE, verified. Corpus bufp
`"cursed"=brown` → pattern `cursed` + `brown` ✓.

**Standing micro-gap (not queued).** C accepts an empty bufp
("never Null but could be empty") and records `Malformed MENUCOLOR`;
the house `/^NAME=(.+)/i` idiom (shared by every top-level arm)
requires ≥1 char, and unmatched lines hit `if (!optMatch)
continue;` (options.js:4930) — silently ignored, no config error.
Unreachable (no corpus recipe carries an empty line) and house-wide,
not this SHA's invention — documented here, not a Must-fix.

**Named omissions** (`:`/space variants, line mungspaces, rv
propagation) are all genuine house-wide simplifications with the
"corpus uses `=`" justification — map-grade, correctly not queued.

Diff grep: no banned patterns (11-line diff + test, read whole).
Rule #2 clean iteration-wide (review 2803).

## Hallucinations / overclaim

None. The "4 owner-null moves labeled js-throw" note is accurate,
not an excuse: I re-checked all four landings with `show` myself —
`error: null, jsPanic: null, kind: screen, owner: null` on
50058510@170, 50155025@10, 50155042@404, 50059017@974. No real throw;
the harness mislabels owner-null moves. Not this SHA's code either
way (loop scripts are out of port scope).

## Density

Cliff discipline holds: one writer, the whole 29-session probe row
moves (11 PASS + 18 strictly later, 0 unchanged, 0 worse), owner
correctly left alone (D-2506 whole, honored). Ledger entry
re-tagged. No bundled work.

## Verification

Re-measured myself (`verify
handler_menu_colors,add_menu_coloring --base 74fc44675~1
--reach-all`) — reproduces the D-log **exactly**:

```
verify handler_menu_colors: 11 PASS, 18 moved past, 0 unchanged, 0 worse → PROGRESS
smoke handler_menu_colors: fixed smoke spread: 24 PASS, 0 regressed → REACH-OK
verify add_menu_coloring: 0 blocked (writer, expected) — vacuous note, not claimed as PASS
smoke add_menu_coloring: 24 PASS, 0 regressed → REACH-OK
```

Probe 50058510 → step 170; every landing strictly later. No
REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
