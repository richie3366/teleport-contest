# Review 1194 — a3d13f73 — falling-rock lifesave resume in zap_dig + zap_updown (D-2228)

Metadata: SHA `a3d13f73`, `js/dig.js` +8/−4, `js/zap.js` +4/−1, comment-only
otherwise. Queue row: Open `mkobj.c` next_ident, 1 blocked
(scen-death-Wizard-92187 step 48, lifesave turn).

## Intent vs deliverable

Subject promises: after a fatal-but-lifesaved falling rock, the rock still
lands (return only on true death) at both the `dig.c` and `zap.c` sites.
Diff actually adds: exactly that — `if (game.program_state?.gameover)
return` after `finish_losehp_done()` at both sites, replacing the
unconditional `return` / `return disclose`. No new functions, no new
imports/edges, no scope creep. Matches the promise.

## Inventory

- `js/dig.js zap_dig` u.dz rock arm: resume-on-lifesave gate.
- `js/zap.js zap_updown` striking rock arm: same gate (returns `disclose`
  only on true death).

## C ↔ JS fidelity

`dig.c:1596–1604`: C runs `losehp(...)` then unconditionally
`mksobj_at(ROCK, u.ux, u.uy, FALSE, FALSE)` + `xname`/`stackobj`/`newsym` —
there is no early return between them; `done(DIED)` returning (lifesave:
wizard `Die?` decline / amulet via `savelife`) means execution continues
into the rock creation. JS now models exactly that: `finish_losehp_done()`
clears `game.program_state.gameover` on the survive path (`js/end.js:1732`,
pre-existing, C-cited) and the new gate returns only when the flag is
still set (true death via `really_done`). `zap.c:3308–3318`: same shape —
C `losehp` then unconditional `mksobj_at(ROCK, x, y, ...)`; JS gates the
`return disclose` identically. True-death path is byte-identical to before
(`return` preserved). The D-log's claim that the other two zap.js losehp
sites already resume correctly is structural (fall-through to `return dmg`;
function-end) and untouched. Branch-by-branch confirm; no RNG touched.

Helper class: none added — pure control-flow on pre-existing imports
(`mksobj_at`/`xname`/`stackobj`/`newsym` already imported at both sites,
as claimed).

## Hallucinations / overclaim

None. The "Match C" reading is the plain C sequence (creation
unconditional after `losehp`); the corpus C trace corroborates (rock
draws present post-lifesave). No dispatch-vs-stub shape here.

## Density

~12 insertions fixing a 1-block corpus row (543 RNG + 14 screens). Small
but the C locus is two lines of control flow — "C is that small" applies.
In-band.

## Verification

Re-measured myself: `hidden-proxy.mjs verify next_ident --base a3d13f73~1`
→ `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(Wizard-92187 fully PASS). True, not vacuous. No-regression argument is
sound (changed lines execute only post-fatal-rockfall; a
lifesave-after-rockfall previously skipped C-mandated creation, so no
passing session could contain one). No FORCE/DIAG/seed/coordinate reads
in the diff (grepped clean).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
