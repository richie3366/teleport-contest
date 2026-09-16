# Review 1368 — ccbd68f2 — polymon find_ac C-order restore (D-2402)

- SHA: `ccbd68f2` (audit 1363–1367 + port). JS file: `js/polyself.js`
  only (+10/−9 within the 19-line hunk; rest of the SHA is docs-only
  reviews). Scoreboard touched (verify resale, not `js/`).
- Prior reviews closed: none (Open head row `polymon` find_ac order;
  operator-ordered ship after a no-`js/` iter).

## Intent vs deliverable

Subject promises restoring C `find_ac` order (`:890` post-drop_weapon,
`:967` pre-encumber_msg; D-0722 deferral misattributed to polymon's own
call). Diff delivers exactly that: first `find_ac()` added after
`drop_weapon(1)`, second moved before `encumber_msg()`, both comments
re-cited, stale deferral comment deleted. Promise kept.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `polymon` (polyself.js:1162) | changed fn, async export | LIVE — order-only edit, no new arms |
| `find_ac` (u_init.js:1340) | C callee, pre-existing import (:39) | LIVE, sync, RNG-free |
| `encumber_msg`, `see_monsters` | untouched neighbors | LIVE, order preserved |

Nothing deleted; no clone → import swaps (`sym.mjs find_ac` →
`js/u_init.js:1340 sync`; `sym.mjs polymon` → `js/polyself.js:1162
ASYNC`). No `sym.mjs` owed beyond that — no symbol re-pointed.

## C ↔ JS fidelity

C locus: `polymon` (`polyself.c:734–1071`, csym range); first call
`find_ac(); /* (repeated below) */` immediately after `drop_weapon(1)`
(line 890); second `find_ac();` (line 967) before the pool/spoteffects
block, `disp.botl = TRUE`, `see_monsters()`, `encumber_msg()` (line
1019). Callers (29 refs, `--callers`): golem-petrification sites +
`polyman`; none affected by call-order inside `polymon`.

- First call exact: JS `find_ac()` sits directly after
  `await drop_weapon(1)`, before the hideunder-deferred/eyeless arms —
  C `:888–892` order kept. ✓
- Second call C-faithful: JS places it after `see_monsters()`, still
  before `encumber_msg()`; C has it before the pool block + `botl` +
  `see_monsters`. Displacement is immaterial: `find_ac` is RNG-free
  and idempotent (recomputes `uac`, arms `botl` only on change —
  read `js/u_init.js:1340–1375`), `see_monsters` reads visibility not
  AC, C sets `disp.botl = TRUE` unconditionally two lines later, and
  the intervening pool/spoteffects arms are pre-existing named omits.
  Both sides end `botl` armed with identical `uac`. ✓
- D-0722 staleness claim checks out: the gnome AC:9 capture precedes
  the first `find_ac` in code order on both sides, so it stays stale
  as C shows it; the shreds-More flush now paints post-strip AC:6. ✓
- No RNG touched (`find_ac`/`see_monsters`/`encumber_msg` draw
  nothing). ✓

## Hallucinations / overclaim

None. D-log names the owner (`do_statusline2`), the mechanism
(capture-timing, state converges), and reports the vacuous
`verify polymon` honestly. "4 PASS + 2 moved past" undercounts my
re-run's 4 moved-past only because two moved to a later
`do_statusline2` step — same sessions, same direction, disclosed
steps. No "Match C" for a stubbed callee (no callee stubbed).

## Density

~10 added lines for a 2-line C locus — below the ~40 guideline but C
is literally two call sites; restoring both in one handoff is the
right size, shipped with map + verify + full suite.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0
  (only hunk-header `@@` line numbers).
- `imports.mjs --rulecheck` → Rule #2 clean on scored `js/`.
- Re-measured: `hidden-proxy verify do_statusline2 --base ccbd68f2~1`
  → `4 PASS, 4 moved past (2 still do_statusline2 at a later step),
  2 unchanged, 0 worse → PROGRESS`. Key moves reproduce the D-log:
  Tourist-92095 step 46 → `savelife` at 49; Valkyrie-92195 step 200
  → `peffect_polymorph` at 312. Genuine movement, 0 worse.
- D-log's green 2/2 + strict ×2 + cohort 7/7 + full 44/44 accepted
  (seed0108 303/303 holds per D-log; fortress re-checked at this
  audit's end).

## Actionable C-wrongs

None. The second-`find_ac` placement (post-`see_monsters` vs C
pre-pool-block) is observably equivalent, not a C-wrong; no queue
row warranted.

Verdict: **ACCEPT**
