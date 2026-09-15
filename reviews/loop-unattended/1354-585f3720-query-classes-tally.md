# Review 1354 — 585f3720 — query_classes canonical tally (D-2388)

- SHA: `585f3720`, D-2388. JS files: `js/pickup.js` (+42/−38 in the
  hunk, net small) + one-line comment in `js/invent.js`; new
  `scripts/query-classes-tally.test.mjs` (61 lines, 3 tests).
- Prior reviews closed: none (Open queue row `query_classes`; 0 blocks).

## Intent vs deliverable

Subject promises three latent C-wrongs in `query_classes` fixed (priest
B/U/C ilets, `m_seen` persistence across look-agains,
`simple_look(null)` impossible). Diff delivers exactly that: the local
`tally_BUCX_list` deleted and replaced by the canonical import, the
in-loop `m_seen = false` removed, the null arm gains
`await impossible`. Promise matches diff; no scope creep.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `query_classes` (pickup.js:3366) | changed, C `pickup.c:141–262` | LIVE |
| `simple_look` (pickup.js:3332) | changed null arm, C `:76–98` | LIVE |
| `tally_BUCX_list` | deleted local clone | retired |
| `tally_BUCX` (invent.js:1166) | C callee, newly imported | LIVE, canonical |
| `impossible` (display.js:7531) | C callee, pre-imported | LIVE, async awaited |

Required checks: `sym.mjs tally_BUCX → js/invent.js:1166 sync`;
`sym.mjs tally_BUCX_list → NOT FOUND in js/**` (clone fully retired);
`imports.mjs --can js/pickup.js js/invent.js tally_BUCX` → ALREADY, no
new edge. Nothing re-pointed except the one call site.

## C ↔ JS fidelity

C loci opened with bodies: `query_classes` `:141–262` (122 lines),
`simple_look` `:76–98`, `tally_BUCX` (`invent.c:3580–3616`).

- Priest force: C `:3593–3595` sets
  `list->bknown = (oclass != COIN_CLASS)` — including clearing coins to
  0. Canonical JS (`invent.js:1172`) does
  `obj.bknown = obj.oclass !== COIN_CLASS ? 1 : 0`, identical, and walks
  `nexthere`/`nobj` per `by_nexthere` like C `:3596`. The deleted clone
  dropped exactly this arm — a real C-wrong (priest prompt lost B/U/C,
  pile kept bknown clear into later naming), now closed.
- `m_seen`: C sets it once at `:158`; `ask_again :198–201` resets
  oclasses/one_at_a_time/everything/not_everything/filtered but NOT
  `m_seen`. JS inits once (`pickup.js:3371`) with no in-loop reset, and
  the consumer (`:245–249` `-2/-3` + return FALSE) is intact as
  `ok: false`. An 'm' before a ':'/'i' look-again now survives. ✓
- `simple_look(null)`: C `:83–84` calls `impossible`; JS now awaits it.
  Note C then falls through into a NULL deref (would crash); JS returns
  — strictly safer, unobservable in any non-crashing run, not
  actionable.
- ESC: C `*inbuf == '\033'` (first-char) vs JS `=== '\x1b'`. `getlin`
  returns exactly `'\x1b'` only on empty-ESC cancel; nonempty ESC clears
  and redraws (`getline.js` esc arm, verified). Observationally
  identical, documented in the docstring, not churned. Accept.
- Callee closure: all LIVE or deleted; no STUB in a live arm.

## Hallucinations / overclaim

None. D-log claims no corpus PASS, states the vacuous verify honestly,
names the pre-change failure state, and says which arms the unit test
cannot cover (interactive getlin) and why.

## Density

~15 code lines, but the C delta is three one-line arms in one function
family — right-sized §2b, not padding. Own-row residual, not Must-fix.

## Verification

- Diff grep `FORCE|DIAG|getRngLog|fastforward|seed|gx|gy` → clean
  (sole hit is the commit message itself).
- Re-measured: `verify query_classes --base 585f3720~1` →
  `0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)`. Matches D-log; row cited 0 blocks so no queue-age
  `--base` owed.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).
- D-log's green 2/2 + strict ×2 + cohort 7/7 + full 44/44 accepted
  (unit test 3/3 covers the priest arm headlessly).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
