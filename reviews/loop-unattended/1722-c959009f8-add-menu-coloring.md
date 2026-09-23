# Review 1722 — c959009f8 — add_menu_coloring whole-body port (D-2763)

- SHA: `c959009f8` (`coloratt.c` add_menu_coloring: whole-body port, D-2763)
- Files: `js/options.js` (+58), `js/botl.js` (2× local→export)
- D-log: D-2763; queue row: Open (coverage MISSING), 0 corpus blocks
- Banned grep: 0 hits

## Intent vs deliverable

Subject promises the MENUCOLOR line parser + `match_*` exports. Diff
ports `add_menu_coloring` in C order, exports the two match helpers,
and narrows the parsed guard to NULL-only. Promise kept.

## Inventory

| JS symbol | Class | C counterpart |
|-----------|-------|---------------|
| `add_menu_coloring` (export) | C body | `coloratt.c:616–660` (csym range) |
| `match_str2clr/attr` (now exported) | C callee, was local | `coloratt.c:348–389` |
| `mc_isspace` (local) | C idiom | `isspace((uchar))` at `:652` |

Required re-point output: `match_str2clr js/botl.js:1243 sync`,
`match_str2attr js/botl.js:1267 sync` — single exports, no remaining
clones; bodies unchanged, now also imported by options.js.

## C ↔ JS fidelity

Walked all ten steps vs `:616–660`: NO_COLOR/ATR_NONE init
(MC_ATR_NONE=0 ≡ `wintype.h:128`) ✓; BUFSZ−1 copy ✓; first-`=` split
with Malformed→FALSE (sink named per file precedent) ✓;
mungspace-then-first-`&` split ✓; color validated before the attr arm
(suppress-FALSE/complain-TRUE preserved) ✓; regexp half truncated
unmungspaced ✓; quote-strip backing over ASCII isspace before matching
the closer, with `mc_isspace` mirroring the `(uchar)` cast (six chars)
and a `j>=0` guard where C would underflow-read ✓;
`add_menu_coloring_parsed` tail ✓. Re-pointed callees verified
arm-for-arm: fuzzy loop, digit+atoi tail (`!matched` gate ≡
`i==SIZE`), CLR_MAX/−1 rejects with the sink predicates ✓.
Parsed-guard narrowing (`!str` → null/undefined-only) is exactly C's
`:595` NULL check; verified both pre-existing callers can never pass
`''` (O-menu `mcbuf.length>0` short-circuit at options.js:2006,
basic_menu_colors passes color names), so only the new C path compiles
empty patterns — matching C. Sole C caller `cnf_line_MENUCOLOR`
named (no JS config dispatch yet). No RNG. Ran my own 8-case smoke
(malformed/basic/attr/quotes/bad-color/bad-attr/unbalanced/empty) →
8/8, including C's unbalanced-quote passthrough and empty-pattern
compile.

## Hallucinations / overclaim

None. The 18-case smoke claim is plausible and my independent 8-case
run agrees on every overlapping arm.

## Density

~68 insertions for a 45-line C body + verified re-point: right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify add_menu_coloring --base c959009f8~1
--reach-all` → 0 blocked, smoke 24/24 REACH-OK. Matches the bullet.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
