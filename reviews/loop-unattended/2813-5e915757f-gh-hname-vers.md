# Review 2813 — 5e915757f — gh.hname 'nethack' for the VI_NAME VERS arm

- **SHA:** `5e915757f` (Thu 2026-10-15) — cliffs-head writer (D-3967).
- **D-entry:** D-3967. **Ledger:** `status_version` ported.
- **Diff size:** `js/decl.js` +5/−1 (one functional line); comments in botl/earlyarg; +1 test.
- **Method:** cliff (1 C global) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: 1 of 17 do_statusline2 sessions
(scen-options-Valkyrie-50355010 s101, versinfo=3 =
VI_NUMBER|VI_NAME) diverges only in the VERS field content — C
«Shield nethack 5.0.0» vs JS «Shield 5.0.0», end-anchored both sides —
because `game.gh` was `{}` while C sets `gh.hname = argv[0]`
(unixmain.c:100) and `status_version` takes `nh_basename(gh.hname)`.
The fix sets `game.gh = { hname: 'nethack' }` at decl init (C's value:
recorder argv[0] basename in every recording, and C's own :497
fallback). 1→PASS.

The diff is the one line plus stale-comment updates. Promise and diff
agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `game.gh = { hname: 'nethack' }` in `reset_instance_globals` | unixmain.c main: early_init `:66`, `gh.hname = argv[0]` `:100` (nothing reads it between — straight-line on Linux) | C value, C order |
| 2 | comment updates (botl.js showname arm, earlyarg `:497` ternary) | status_version :99–104 (`nh_basename(gh.hname)`; VERS_GAME_NAME ifdef never defined anywhere — compiled path confirmed); dump_version_info :497 `gh.hname ? … : "nethack"` | comments only |
| 3 | `status-version-gamename.test.mjs` (hname, versinfo 3/1 shapes) | Valkyrie-50355010 s101 | test-only |

No helper, no import change, no symbol re-pointed (`sym.mjs` not
required). Diff grep: no banned patterns. Rule #2 clean (2808). The
literal is C-grounded (C's captured screen + C fallback), not trace
tailoring.

## C ↔ JS fidelity

**Assignment and value (confirmed).** unixmain.c `:66` + `:100` read
exactly as cited ✓; folding the store into the decl reset is
unobservable (no reader between) ✓. The value 'nethack' is triple-
sourced: C's own captured row («Shield nethack 5.0.0»), C :497's
fallback, and the recorder argv[0] basename ✓.

**Reader closure (complete).** `hname` readers in all of `js/`:
botl.js:3131 (status_version name arm → basename 'nethack', feeding
the BL_VERS field painter and, indirectly, the options.js:4359
versinfo menu text via `status_version()` ✓) and earlyarg.js:598
(dump ternary yields 'nethack' either way — output provably unchanged
✓). topten.js:1257 is a comment. No writers of other `game.gh` props
exist, so replacing `{}` breaks nothing ✓.

**Named omissions (proper).** showbranch `git_branch` (C shownum
fallback covers), the untouched `_statusLine2` ledger omit, and the 16
other writers — all named, none silent.

## Hallucinations / overclaim

None. The "end-anchored, tails align" observation correctly scopes
the divergence to field content (not layout), and the park-tag
discipline is explicit (painter never re-ported; D-3966 read once as
a different writer).

## Density

One writer, minimal (one functional line into a pre-wired arm),
Ledger tagged, pre-fix-failing test. No bundled work. `Next:` aims
the regenerated row at the digging-T pair + pickup-menu — the actual
following SHAs (D-3968/D-3969) confirm the queue reading.

## Verification

Re-measured myself (`verify do_statusline2 --base 5e915757f~1
--reach-all`) on HEAD code:

```
verify do_statusline2: 1 PASS, 2 moved past, 14 unchanged, 0 worse → PROGRESS
smoke do_statusline2: fixed smoke spread (24 run, 20.7s): 24 PASS, 0 regressed → REACH-OK
```

vs the claimed 1/0/16. Same pattern as 2812: the committed board
*at* `5e915757f` shows exactly the 1 claimed PASS (Valkyrie-50355010)
with questtour@518 and shop@384 still blocked — the 2 extra moves are
D-3968/D-3969, reviewed next. This SHA's deliverable verifies
exactly; 0 worse.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
