# Review 1360 — bb704c9c — topten.c outentry death/astral arms (D-2394)

- SHA: `bb704c9c`, D-2394 (D-2122-named residual). JS files:
  `js/topten.js` (+~40/−~12). Committed test
  `scripts/outentry.test.mjs` (170 lines, 4 tests, 4/4 re-run here).
- Prior reviews closed: none (map-driven residual, 0 blocks).

## Intent vs deliverable

Subject promises the four death arms + astral switch in exact C order
with the `strncmp` lens. Diff adds exactly that, nothing else; the
dungeon branch is byte-untouched; the doc header retires both
`outentry` map omissions ("Named omissions: none"). Promise kept.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `outentry` (topten.js, file-local) | changed, 4 arms + astral block | LIVE (C is `staticfn` — file-local is the faithful shape) |
| death-arm chain | new `else if` ladder | LIVE, C order + lens |
| astral switch | new, two fmt strings | LIVE, C order + strings |
| dungeon branch | untouched | LIVE (pre-existing) |

Required checks: no new/changed imports or edges (game-only reads,
same-file locals); no symbols deleted or re-pointed → no `sym.mjs`
obligation; no callees at all (pure string building) → no
LIVE/CLONE/STUB table owed.

## C ↔ JS fidelity

C locus opened: `outentry` (`topten.c:945–1107`, csym range). Arm walk,
C order vs JS:

- quit/4, "died of st"/10: `startsWith` ≡ `strncmp` at full-literal
  length; `second_line=FALSE` both sides. ✓
- "choked"/6 → `choked on h{er|is} food` with `plgend[0]==='F'`
  (JS `?.` is defensive on a C fixed-array field — same outcome on
  all real inputs); `second_line` stays TRUE both sides. ✓
- "poisoned"/8 → `was poisoned`; "crushed"/7 → `was crushed to
  death`; "petrified by "/13 → `turned to stone`; else `died` —
  order, lens (`slice(0,N)` ≡ `strncmp` N), and strings exact. ✓
- Astral gate `deathdnum == astral_level.dnum` then the
  `-5…-1`/default switch: `-5` Astral with ` on the %s Plane`, `-4`
  Water, `-3` Fire, `-2` Air, `-1` Earth, default Void with
  ` on the Plane of %s` — exact, `replace('%s',arg)`
  single-substitution ≡ `Sprintf(fmt,arg)`. (JS null-guards
  `astral_level`/`knox_level`; C structs can't be null — defensive,
  same outcome when present.) ✓
- No RNG anywhere in this function; nothing to walk call-for-call.
- The `escaped`-arm astral fixup (`deathdnum == astral_level.dnum ?
  '\0' : ' '`, C `:978–980`) and the wrap/Hp columns are pre-existing
  and untouched by this diff — out of scope for this SHA. The
  `ascended`-arm gender line above the hunk already used plain
  `t1.plgend[0]` (no `?.`); the new arms' `?.` is the same outcome on
  all real inputs (C `plgend` is a fixed char array, never NULL). ✓
- `strncmp` stops at embedded NUL while `startsWith`/`slice` do not —
  moot here: death strings arrive via JSON scoreboard/record structs
  and cannot contain NUL. ✓

## Hallucinations / overclaim

None. D-log states the vacuous verify honestly ("0 blocked, vacuous
not a PASS") and claims only map-residual retirement, which the
turns.md line update supports. The committed test asserts the new
arms end-to-end through `topten()`.

## Density

One small pure function + committed test + map retirement in one
handoff. Right-sized (§2b).

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|hardcod` → 0.
- Re-measured: `verify outentry --base bb704c9c~1` →
  `0 session(s) blocked (0 at baseline, 0 working)`. Matches D-log.
- `node --test scripts/outentry.test.mjs` re-run here → 4 pass,
  0 fail.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
