# Review 2259 — 42c45189d — program_state_init zero-reset + jsmain wiring

Metadata: SHA
`42c45189ddca952d95f03c93ede552dea5304f92`
(D-3298, 2026-10-02). `js/decl.js`
(+15: export) and `js/jsmain.js`
(+1 call, import widened). One
function new whole + 6
ledger-only retirements.

Intent vs deliverable: subject
promises the early_init
zero-reset port with jsmain
wiring and 6 queue rows retired.
The diff ships the export, the
wired call in C order, and the
6 ledger rows. Delivers what it
promises.

Inventory:

- `export function
  program_state_init()`
  (decl.js:53): `game.
  program_state = {}`.
- jsmain.js start(): call
  inserted after resetGame(),
  before decl_globals_init()
  (:130); import widened on the
  existing ./decl.js edge.
- No symbol deleted or
  re-pointed. `sym.mjs
  program_state_init`:
  js/decl.js:53 sync, single.

**C ↔ JS fidelity**:

Body ≡ C decl.c:1073–1077 per
csym (`program_state =
init_program_state`, sole
statement) ✓. `init_program_
state = { 0 }` confirmed at
decl.c:1001; sinfo (hack.h:776)
is all ints ✓.

`{}` ≡ `{ 0 }` verified, not
assumed: every sampled JS reader
uses the falsy-default idiom
(`?.`, `|| {}`, `| 0` —
gameover, in_moveloop,
done_hup, restoring,
something_worth_saving,
config_error_ready,
beyond_savefile_load); no
`Object.keys`/`in`/JSON/
save-serialization of
program_state exists; the
`const ps =` captures are all
function-local within a turn,
never held across start().
The only strict-`===` readers
compare `input_state` against
enum members (cmd.js:979,1034,
1192) — pre-existing, and
first-boot behavior is
unchanged (undefined before
and after); the SHA only makes
same-process restarts match C
instead of leaking stale
flags. Unconditional assign,
never merge, like C ✓. No RNG
✓.

Caller: sole C caller
allmain.c:35, first in
early_init before
decl_globals_init (:40) —
csym early_init :32–45
confirms the order ✓. JS
mirrors it: resetGame() →
program_state_init() →
decl_globals_init() →
sys_early_init() ✓. (C's
objects/monst globals inits
between are pre-existing
split-name territory, not this
SHA.)

Ledger retirements (6):
spot-verified the falsifiable
claims — `/*#define
WA_VERBOSE*/` commented at
display.c:138 ✓ (type_to_name/
error4 compiled out);
UNBUFFERED_GLYPHINFO never
defined anywhere in pinned
src/include ✓ (glyphinfo_at);
wantdoor's do_clear_area arrow
at dogmove.js:795–802 ✓;
topten emit sites at the SHA:
10 `emit(x,false)` lines +
2 `{bold:false}` rows direct
into render_topten_lines
(:852–857) = 12 sites, plus 2
`emit(x,true)` — the note's
"853-857" wording is loose
(direct rows, not via emit)
but the substance (every C
site funnels to
render_topten_lines) holds.
Nit only, no action.

Hallucinations / overclaim:
none. The D-log states the
queue went EMPTY and names the
refill-dry evidence; the
verify line claims full 44/44
for this shared-file change,
which is the right gate.

Density: 1 whole C function +
6 evidenced ledger rows. The
js delta is 16 lines, but the
iteration's bulk is the 6
retirements with C+JS cites,
and the D-log Next audits why
nothing more was shippable.
Own `Ledger:` + Verify ✓.

Verification: D-log Verify
(syntax 2 files, rule2,
hidden 0, smoke 24/24, green,
strict ×2, cohort 7/7, full
44/44). Re-measured
(`hidden-proxy verify
program_state_init --base
42c45189d~1 --reach-all`): `0
blocked` + `smoke 24 PASS, 0
regressed → REACH-OK`. Match;
zero REGRESSED. The `getRngLog`
grep hit is the pre-existing
jsmain import context line,
not a gate. Rule #2 clean
(iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
