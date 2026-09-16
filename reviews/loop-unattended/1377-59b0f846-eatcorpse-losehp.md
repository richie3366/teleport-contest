# Review 1377 — 59b0f846 — eatcorpse acid/cadaver via canonical losehp (D-2411)

- SHA: `59b0f846`, D-2411 (contract gap, not a session diff: no
  corpus block). JS files: `js/eat.js` only (two arms rewired +
  `finish_maybe_wail` import join + `eatcorpse` export).
- Prior reviews closed: none.

## Intent vs deliverable

Subject promises both inline-HP arms (acidic corpse, cadaver)
routed through canonical sync `losehp` with C arg order and killer
strings, fatal → `finish_losehp_done` + `return 1`, else
`finish_maybe_wail`. Diff delivers exactly that.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `losehp` (hack.js:1228, sync) | C callee | LIVE — called un-awaited, correctly (sync) |
| `finish_maybe_wail` (hack.js:1281, async) | C callee | LIVE — awaited; C `hack.c:4275,4290` calls `maybe_wail()` inside `losehp` |
| `finish_losehp_done` (end.js:1620, async) | C callee | LIVE — dynamic import (house pattern, no static end.js edge), awaited |
| `eatcorpse` (eat.js:2220, now exported) | changed fn | LIVE — export for the test pin only |
| `KILLED_BY_AN` | const | already imported |

No symbols deleted or re-pointed. `finish_maybe_wail` joined the
existing static `./hack.js` edge (`--can` → ALREADY per D-log;
single-direction eat→hack, taken as stated).

## C ↔ JS fidelity

C loci read in pinned source: `eat.c:1922–1943` (csym range for
`eatcorpse` is `:1854–2018`).

- Acid: C `losehp(rnd(15), !glob ? "acidic corpse" : "acidic
  glob", KILLED_BY_AN)` ≡ JS `losehp(rnd(15), !glob ? 'acidic
  corpse' : 'acidic glob', KILLED_BY_AN)`. `rnd(15)` kept per C,
  not `1+rn2` (different draw names). ✓
- Cadaver: C `losehp(rnd(8), !glob ? "cadaver" : "rotted glob",
  KILLED_BY_AN)` ≡ JS verbatim. ✓
- Guards: acid `acidic(ptr) && !(H/E/intrinsic Acid_resistance)`
  ≡ C `acidic(&mons[mnum]) && !Acid_resistance` (macro covers the
  same three sources); cadaver rotted/Sick-gate untouched. The
  `if/else-if` chain shape is preserved. ✓
- Control flow: C `losehp` returns normally when non-fatal
  (execution continues to reqtime) and never returns when fatal
  (`done(DIED)`). JS models this with the real mechanism —
  `game._losehp_needs_done` is set by `losehp` itself
  (`hack.js:1248,1268`): fatal → dynamic `finish_losehp_done` +
  `return 1` (`dont_start`, no occupation/pline, matching C
  noreturn); non-fatal → `await finish_maybe_wail()` and fall
  through. The flag read is mechanism, not trace logic. ✓
- Named deferrals stay named (tainted `make_sick`,
  `showdamage`/`rehumanize` inside canonical `losehp`,
  poison-arm `poison_strdmg` clone untouched). ✓

## Hallucinations / overclaim

None. The D-log says plainly "no corpus block (contract gap, not
a session diff)" and claims only gates + unit pin — no corpus
PASS invented. (Nit, uncharged: the in-code "(D-2402 was inline)"
aside cites an unrelated D-id; harmless.)

## Density

~40 `js/` lines + a 2-case unit test for one contract gap with
four silent divergences closed (Upolyd/mh, rush state, killer,
death path). Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify eatcorpse --base 59b0f846~1`
  → 0 blocked at baseline and now, with the tool's vacuous
  warning — reproduces the D-log's "vacuous note" honestly; no
  D-1831 shape.
- `node --test scripts/eatcorpse-losehp.test.mjs` → 2/2 (re-run
  this audit). Green/cohort per D-log accepted as stated.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
