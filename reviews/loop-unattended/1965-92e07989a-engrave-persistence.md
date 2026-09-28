# Review 1965 — 92e07989a — engrave.c persistence family (D-3005)

Metadata: SHA `92e07989a`, D-3005, five-function `engrave.c`
cluster. Stat: `js/engrave.js` +142 (five ports in C order),
plus one-line caller wirings in `js/bones.js`, `js/do.js`,
`js/end.js`, `js/lev_json.js`, `js/save.js` and a
local→export flip in `js/display.js`. No prior review file
on disk. Cluster commit → Method per function below.

## Intent vs deliverable

Subject promises five whole-body ports with "all C callers
wired". Diff actually adds the five exports plus six
call-site edits and the `engr_can_be_felt` export flip.
Promise and diff match.

## Inventory (per function)

- `forget_engravings` (NEW, `js/engrave.js:164`): bones-save
  reset loop.
- `save_engravings` (NEW, `:183`): savelev snapshot writer,
  returns head-first plain records (JS extension: C is
  void; the return feeds the JSON snapshot callers).
- `rest_engravings` (NEW, `:230`): getlev reader, sets
  `game.head_engr`, returns it (JS extension); accepts an
  array or a legacy `nxt_engr` chain via file-local
  `chainToArray` (leniency helper, not a C callee).
- `see_engraving` (NEW, `:276`): newsym repaint.
- `feel_engraving` (NEW, `:288`): felt-gated read/reveal +
  map_engraving + newsym.
- Support: `map_engraving, engr_can_be_felt` added to the
  existing engrave→display import (no new edge —
  `imports.mjs --can`: ALREADY); `engr_can_be_felt`
  local→exported in display.js (`:4840`).

## C ↔ JS fidelity (per function)

`forget_engravings`, `csym` via D-log `engrave.c:1509–1521`
(sole caller `bones.c:449` confirmed by `--callers`):
`ep->erevealed = ep->eread = 0` (assigns eread first) →
JS `ep.eread = 0; ep.erevealed = 0` in the same order ✓;
text states untouched per the C note ✓. Caller
`bones.c:449` → `js/end.js` bones path calls
`forget_engravings()` ✓ (replaces the Named omit).
Verdict: OK.

`save_engravings`, `csym` `engrave.c:1550–1580` (read
whole): head-first walk with `ep2` pre-take ✓; gate
`engr_alloc && actual[0] && update_file` → alloc-skip +
empty-actual-skip (update_file always true in JS) ✓;
Sfo binary encode ⇔ plain-record copy is the named
§1.6-JSON omission (rest_regions precedent) ✓; the
post-write text-pointer re-basing is serialization-local
and content-neutral — correctly not replicated ✓;
release arm (`:1572–1579` free + head=0) stays at callers:
verified `js/do.js:1834` nulls `head_engr` in the
goto_level teardown, and dosave snapshots keep the game
going ✓. Caller `save.c:548` → `js/do.js` snapshot uses
`save_engravings()` ✓; `js/lev_json.js` re-serializes via
the live chain when live, keeps the stored array as-is
otherwise (avoids double-filtering) ✓. No stub.
Verdict: OK.

`rest_engravings`, `csym` `engrave.c:1583–1619` (read
whole): `head_engr = 0` drop ✓; `lth==0` terminator ⇔
null/empty input ⇒ null head ✓; per-record prepend
(`:1597–1599`, live order reverses vs stored — JS
comment states the same flip) ✓; blank-skip on actual +
remembered only (`:1610–1613`; pristine keeps blanks —
JS slices exactly those two) ✓; `engr_time = svm.moves`
⇔ `game.moves` with the bones rationale cited ✓; arena
alloc ⇔ fresh literal (GC idiom, sizes kept on record)
✓. Caller `restore.c:1174` → three JS getlev paths
(bones/do/end... actually `js/bones.js`, `js/do.js`,
`js/save.js` per the wiring hunks) call
`rest_engravings(info.head_engr)` ✓. No stub.
Verdict: OK.

`see_engraving`, `csym` `engrave.c:1724–1727`: single
newsym repaint ✓; `--callers` shows declaration only, no
C call sites — nothing to wire ✓. Verdict: OK.

`feel_engraving`, `csym` `engrave.c:1730–1741` (read
whole, incl. the "isn't actually used anywhere?" note):
`engr_can_be_felt` gate + eread/erevealed = 1 +
`map_engraving(ep,1)` + newsym, in C order ✓. Callee
closure: `sym.mjs` → `engr_can_be_felt
js/display.js:4840 sync`, `map_engraving js/display.js:2152
sync` — both LIVE imports, no clone ✓; no C call sites
to wire ✓. Verdict: OK.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed hits.
Rule #2 clean (re-verified 1963, same tree state class).

## Hallucinations / overclaim

None. "Exact loop/bodies" holds for forget/see/feel
against the short C bodies read above; the two
admitted extensions (save/rest return values,
chainToArray leniency) are labeled as JS extensions in
comments, not sold as C. No dispatch-over-stub.

## Density

One-C-file callee closure (save/restore/bones/repaint of
one struct), 5 functions, +142 lines of port + 6
one-line wirings — inside the §2b envelope. Per-function
verdicts: all five OK. SHA verdict: best = worst = OK.

## Verification

D-log: `verify.mjs --fn (all 5)` → syntax · rule2 · 5×
note hidden + REACH-OK (smoke 24 each) · green 2/2 ·
strict ×2 · cohort 7/7 · full 44/44 · VERIFY: PASS.
Re-measured here in one call
(`--base 92e07989a~1 --reach-all`, all five): each
reports 0 blocked at baseline and in the working
scoreboard with `fixed smoke spread (24 run): 24 PASS,
0 regressed → REACH-OK` (captured in-session; tail
pasted for save/forget/see/feel, rest identical).
Honest vacuous notes for coverage rows. Zero REGRESSED.
No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
