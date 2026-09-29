# Review 2060 — e028921a0 — wiz_show_wmodes + wiz_objprobs dump pair

- SHA: `e028921a0` (D-3100)
- Subject: "wizcmds.c wiz_show_wmodes + wiz_objprobs: wizard dump pair + # runners (coverage)"
- js/ insertions: ~134 (wizcmds.js +111, getline.js +23) + scripts test
- Prior index: 2059; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port the two extcmd-dispatched wizard debug dumps (`#wmode`
wall-mode map, `#wizobjprobs` object probability table) whole, with
EXT_CMDS runners wired in the same commit (explicitly avoiding the
D-3085 → review-2045 Must-fix repeat).

Diff actually adds: `wiz_show_wmodes` + `wiz_objprobs` async exports in
js/wizcmds.js, two EXT_CMDS runner rows in js/getline.js, extended
const.js/objects.js imports, and a 3-case runner test. Matches the
promise; no extra scope.

## Inventory

Per-function (cluster of 2, both new):

- `wiz_show_wmodes` (js/wizcmds.js:2243) — C wizcmds.c:656–689 (csym range).
  Whole body: istty gate, blank top line, ROWNO×(COLNO-1) cell dump,
  display/destroy, ECMD_OK.
- `wiz_objprobs` (js/wizcmds.js:2297) — C wizcmds.c:1831–1868.
  Whole body: oclass init, class totals, placeholder skip, class-break
  blanks, Snprintf row, display/destroy, ECMD_OK.
- Runners: getline.js:991 `wmode` (wiz+autocomplete), getline.js:1003
  `wizobjprobs` (wiz, no autocomplete). Test pins both + siblings.

Helpers: all C callees/macros LIVE — `show_text_pages` (pager.js dynamic
import, file idiom), `IS_WALL`/`IS_ROOM`/`IS_DOOR`/`WM_MASK`/`SDOOR`/`CORR`
(const.js), `u_at` (pre-existing import), `objectNameStrs`/
`FIRST_OBJECT`/`MAXOCLASSES`/`NUM_OBJECTS` (objects.js/generated). No
local clones, no stubs, no deleted/re-pointed symbols (imports only
extended — `sym.mjs` re-point check not triggered).

## C ↔ JS fidelity

C callers: `csym --callers` returns 0 references for both — extcmd-table
dispatch only, as the D-log states. Both JS runners wired, so no unwired
caller.

`wiz_show_wmodes` (C :656–689), branch order verified:
- `:663` `istty = WINDOWPORT(tty)` → `const istty = true` in C position.
  Scored port is unconditionally tty (windowport_tty idiom); no RNG or
  branch divergence possible. Acceptable constant, position kept.
- `:666–667` tty blank top line → `lines.push('')`. Exact.
- `:669–681` cell loop with `:684` `&row[1]` print → JS builds x=1..79
  directly. Column 0 is dropped from output on both sides; skipping its
  computation is unobservable. Exact output.
- 5-arm chain `:671–680` verbatim: `@` / `IS_WALL||SDOOR` → digit /
  `CORR` → `#` / `IS_ROOM||IS_DOOR` → `.` / else `x`. Digit arm:
  `48 + ((lev?.wall_info || 0) & WM_MASK)` ≡ `'0' + (wall_info & WM_MASK)`.
- STONE unloaded guard: C `IS_WALL` is `((typ) && (typ) <= DBWALL)`
  (rm.h:117), STONE=0 → false; JS `typ >= VWALL && typ <= DBWALL`
  (const.js:2309–2311) with VWALL=1 → false. Both render STONE `x`.
  Verified, not trusted from the message.
- `:686–688` display/destroy → `show_text_pages`, `ECMD_OK`. File idiom.

`wiz_objprobs` (C :1831–1868), call-for-call (no RNG in body):
- `:1838` oclass init, `:1841–1843` totals over every otyp including
  placeholders (prob 0, add nothing) → both loops exact.
- `:1847–1849` `!OBJ_NAME` skip before the `:1851–1854` class-break test
  → `if (!name) continue` in the same position. Blank lines track named
  rows only, both sides.
- `:1856–1862` `"%4d / %4d (%6.2f%%): %s"`: C float arithmetic
  `(float)prob * 100.f / (float)total` vs JS
  `Math.fround((prob*100)/total).toFixed(2)` — single-round vs
  double-round placement can differ in theory, but the objects table is
  fixed data and the D-log's byte-identity check (455 lines vs a C
  program with the exact Snprintf, empty diff) is measured evidence on
  the real input. Widths: `padStart(4)`/`padStart(6)` never truncate,
  matching `%4d`/`%6.2f`. Accept.
- `:1864–1867` display(FALSE)/destroy → `show_text_pages`. The TRUE/FALSE
  repaint nuance is a windowport artifact, subsumed by the file idiom.

Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.

## Hallucinations / overclaim

None. The "Match C" shape is earned: both bodies are whole, runners ship
in-commit (the D-3085 failure mode is explicitly addressed and closed),
and the one dormant path (typed-`#` for wizobjprobs, missing generated
EXTCMDLIST row under the extractor's DEBUG=False premise) is named in
the D-log with the cmdbind path live — same documented state as the
ACCEPTed wizmondiff/wizdispmacros runners.

## Density

Breadth-phase cluster: 2 whole C functions, one C file (wizcmds.c),
~134 js/ insertions — above the ~80 failed-density line. Each function
has its own Inventory block here, its own `Ledger:` entry (both
`ported`), and its own Verify lines. Not over 10 functions, no bundled
Must-fix, no second C file. Stale pops (bogusmon, collect_obj_classes,
get_dgn_flags) are ledger `set ported` with stale notes, same iteration —
per §2b. Verdict per function: ACCEPT / ACCEPT.

## Verification

Re-measured at this SHA (`--base e028921a0~1 --reach-all`, one call):

- `verify wiz_show_wmodes`: 0 blocked at baseline and working tree;
  vacuous note printed; smoke spread 24 run, 24 PASS, 0 regressed → REACH-OK.
- `verify wiz_objprobs`: 0 blocked; vacuous note printed; smoke 24/24 → REACH-OK.

Matches the D-log bullets exactly ("note hidden … normal for a coverage
row" + REACH-OK + smoke 24/24). No REGRESSED session. Shared gates in
the D-log: syntax, rule2, green 2/2, strict ×2, cohort 7/7, VERIFY PASS,
runner test 3/3. No corpus blocks were cited by the queue rows, so the
vacuous check is correctly labeled, not a D-1831-style false PASS.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
