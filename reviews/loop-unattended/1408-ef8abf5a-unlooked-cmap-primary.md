# Review 1408 — ef8abf5a — do_screen_description unlooked cmap Primary byte (D-2449)

Metadata: SHA `ef8abf5a`, `js/pager.js` only (+8/−1 in the cmap scan).
Prior review: 1406 item 1 (QUALITY-RISK Must-fix). D-log: D-2449.

## Intent vs deliverable

Promise: unlooked `/`-query cmap scan compares against the Primary
defsyms byte, not the DEC showsyms byte, per C `pager.c:1472`.
Diff actually adds: a `looked ?` branch on the single `sym === ...`
comparison — `cmap_showsym_code(altI)` when looked, `DEFSYMS_CH[altI]`
Primary byte (with `-1` fallback) when unlooked. Nothing else touched.

## Inventory

- Changed: `do_screen_description` cmap-scan match expression only.
- No new functions, no new imports, no new edges.

## C ↔ JS fidelity

C `pager.c:1472` (cited range confirmed via csym body + direct read):

```c
if (sym == (looked ? gs.showsyms[alt_i] : defsyms[alt_i].sym)) {
```

Branch-by-branch: looked arm — JS keeps `cmap_showsym_code(altI)`,
the file-local clone of `gs.showsyms` (DEC byte when active, else
Primary, plus the `S_darkroom` runtime rewrite). Unchanged by this diff.
Unlooked arm — JS now uses `DEFSYMS_CH[altI]`, the exported Primary
PCHAR column (`js/getpos.js:235`), matching `defsyms[alt_i].sym`.
The `-1` fallback fires only when the slot has no Primary char; C `sym`
(a typed key byte) can never equal it, so no false hit. The S_pool
second-look inherits the corrected match. Monster/object/warning arms
use the same `looked ?` shape in C (`:1514` warnsyms; mon/obj arms
above) and were already branched — untouched here, correctly.
Confirm: the fix is exactly the cited C ternary, no RNG, no order
change. `sym.mjs`: `cmap_showsym_code` local clone (`js/pager.js:1234`),
`DEFSYMS_CH` live export — no clone-count change, nothing to paste
beyond this (no symbol deleted or re-pointed).

## Hallucinations / overclaim

None. Subject says one-branch fix; diff is one branch. D-log admits
the corpus cannot catch it (0 blocked, vacuous) instead of claiming a
corpus PASS — honest.

## Density

Must-fix single-branch repair of a review-pinned C-wrong: right-sized
by definition (§2b exempts Must-fix). No padding, no second subsystem.

## Verification

- `imports.mjs --rulecheck`: Rule #2 clean (re-run this review).
- `hidden-proxy verify do_screen_description --base ef8abf5a~1 --reach-all`
  (re-run): 0 blocked at baseline and working tree — vacuous, as the
  D-log states; smoke 24/24 PASS, 0 regressed → REACH-OK. No REGRESSED
  session. Claim matches.
- D-log probe (`/tmp/probe-dec-looked.mjs`, DECgraphics): unlooked `|`
  finds the wall description, raw `0xF8` correctly finds nothing.
  Plausible and consistent with the C ternary; not independently re-run
  (throwaway probe, not committed — acceptable for a 6-line branch).
- Grep of diff: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. The shipped branch matches C `:1472` exactly.

Verdict: **ACCEPT**
