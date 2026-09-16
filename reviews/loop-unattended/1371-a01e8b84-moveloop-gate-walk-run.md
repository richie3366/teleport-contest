# Review 1371 — a01e8b84 — moveloop status gate + walk run=0 (D-2405)

- SHA: `a01e8b84`, D-2405 ([campaign botl-parity 2/3]). JS files:
  `js/allmain.js` (+16/−1), `js/cmd.js` (+5/−0).
- Prior reviews closed: none (campaign step; b9166ebc diagnosed the
  gate-alone 43/44 and deferred the writer to this commit).

## Intent vs deliverable

Subject promises the C gate verbatim on the live store plus the live
walk path's `run = 0` under the exact C guard, with the RUSH arm
untouched. Diff delivers both, with the 43/44-alone diagnosis
honestly carried in the message. Promise kept.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `moveloop_core` gate (allmain.js:1204–1219) | new branch | LIVE — C `allmain.c:473–479` verbatim |
| `bot` / `timebot` / `curs_on_u` (display.js:6938/6955/5241) | C callees, joined to live edge | LIVE, all async, awaited |
| `rhack` walk path (cmd.js:2694–2703) | new `run = 0` write | LIVE — C `cmd.c:1396–1399` guard |
| `menu_requested→nopick` arm | still unported | OMIT — named at `turns.md:280` |

No symbols deleted or re-pointed. No new module edge (names join the
existing `display.js` import; all three callees hoisted async fns, so
no TDZ question) — `--can` correctly not owed. No `sym.mjs` owed
beyond the three resolutions above.

## C ↔ JS fidelity

C loci read in pinned source: moveloop gate (`allmain.c:473–479`),
`set_move_cmd` (`cmd.c:1386–1400`), `flush_screen` inner gate
(`display.c:2237–2240`).

- Gate exact: `disp.botl||botlx → bot()+curs_on_u()`,
  `else time_botl → timebot()+curs_on_u()` — JS mirrors branch order
  on `g.flags` (the file's `const g = game` idiom; the store
  `bot()`/`flush_screen` already gate on). Post-gate
  `m_everyturn_effect` order kept (`:481`). ✓
- Unconditional `flush_screen(1)` kept: pre-existing line, and C's
  inner gate (`:2237–2240`, same two branches, verified above) makes
  the second pass a no-op after the arm consumes the flags. The
  `curs_on_u ≡ flush_screen(1)` gloss is loose (cursor-place vs
  flush) but the composition is proven by exact screens, not by the
  gloss. ✓
- Writer exact: C `:1396` `if (!gd.domove_attempting && !u.dz)` sets
  `run = run` (walk callers pass 0) and the WALK bit; JS writes
  `run = 0` under `!attempting && !u.dz`, leaving the g/G RUSH arm's
  run 2/3 and the pre-existing `DOMOVE_WALK` set untouched. The
  mechanism (travel's run=8 suppressing EOT `time_botl`) explains the
  seed0007 stale-T the gate alone showed. ✓
- `menu_requested→nopick` (`:1393–1394`, adjacent line, same body)
  stays a named omit with its own-row condition — verified present
  at `turns.md:280`. ✓ No RNG touched by either hunk. ✓

## Hallucinations / overclaim

None. The message discloses the gate-alone 43/44 failure that
motivated the writer, the mid-iter rule2 fix-up (seed token in a
comment — removed, re-ran green; added `js/` lines re-grepped clean
this audit), and reports the two same-owner +1 moves as +1 moves,
not PASSes.

## Density

Gate + its suppression writer, two files that already call each
other, one falsifier (stale-T). Campaign-step sized; the b9166ebc
diagnose-then-ship split is the playbook's measure-then-port, not
bloat.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify do_statusline2 --base a01e8b84~1`
  → `0 PASS, 2 moved past (2 still do_statusline2 at a later step),
  2 unchanged, 0 worse → PROGRESS` — reproduces the D-log
  line-for-line (Healer-92092 58→59, Tourist-91125 82→83; 92107@126
  and 92194@88 unchanged as the next layer). Genuine movement, no
  D-1831 regression shape.
- D-log's green 2/2 + strict ×2 + cohort 7/7 + full 44/44 accepted;
  seed0007 302/302 + RNG 16373/16373 corroborate the writer fix
  rather than a gate-around.

## Actionable C-wrongs

None. Both arms match C; the one adjacent omit is named with a
falsifier condition.

Verdict: **ACCEPT**
