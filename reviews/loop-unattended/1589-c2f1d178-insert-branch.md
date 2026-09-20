# Review 1589 — c2f1d178 — dungeon.c insert_branch whole-body port (D-2630)

**Metadata:** SHA `c2f1d178`, `dungeon.c` `insert_branch`, D-2630.
JS: `js/dungeon.js` only (+18/−6).
Coverage row (partial → live). No prior review claimed closed.

## Intent vs deliverable

Subject promises: extract-not-found panic (`:474–475`), the
`prev_val` sort guard (`:498`), and wired callers. Diff delivers
all three. The message additionally discloses a mid-iteration
dropped-`insertAt` regression that verify caught (4 REACH
regressions + cohort 6/7, stash control proving old code passed
seed0383, assignment restored, 4 sessions replayed to full PASS).
Promise matches deliverable, and the disclosed stumble strengthens
rather than weakens the handoff.

## Inventory

- `insert_branch()` — restarted export, C order with per-arm cites.
- `branch_val` helper pre-existing, untouched.
- No new imports (`game`/`MAXLEVEL`/`MAXDUNGEON` already in file).
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C locus `dungeon.c:462–508` (47 L, via `csym.mjs insert_branch`).
Full C body read here. Arm-by-arm confirm:

- Extract identity scan `:469–472` (`curr == new_branch`) ⇔
  `indexOf` — exact.
- Missing → `throw new Error('insert_branch: not found')` for C
  `:474–475` panic (throw≡panic per the botl.js compare_blstats
  precedent — JS has no sync abort) — exact; old code silently
  skipped, now panics.
- Unlink `:476–479` (prev->next / head) ⇔ `splice` — exact.
- `new_branch->next = 0` (`:481`) — exact.
- Sort scan `:493–500`: `prev_val = -1`, per-iteration `curr_val`,
  `prev_val < new_val && new_val <= curr_val` break with the
  `prev_val` step *after* the break check — order matches C's
  increment-clause update exactly. The old code's missing guard is
  the C-wrong fixed.
- Link `:501–507` (prev ? after-prev : head) ⇔ indexed `splice` —
  exact. `.next` staying null is save-safe (save.js JSON-copies
  branches; a linked chain would duplicate/cycle on save) and
  map-named; no JS reader traverses `branch.next`.

Caller wiring: all 3 C sites wired — `:534` → dungeon.js:367,
`:1156` → dungeon.js:976, `mklev.c:2655` → mklev.js:25247. Exact.

Callee closure: none beyond file-local `branch_val` — "Named: none"
accurate; C next-pointer surgery ⇔ array splice is map-named here.

## Hallucinations / overclaim

None. The commit message's regression narrative is falsifiable and
fully resolved in the final tree (my re-run below confirms
REACH-OK, and the 4 named sessions' full-PASS replays are quoted
with exact screen/RNG counts).

## Density

47-line C function, one module, +18/−6. Right-sized. Throwaway
probes `/tmp/ib_probe*.mjs` (sorted/extract-reinsert/panic 3/3,
not committed) are honest probe discipline.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed names/
  hardcoded coordinates in control flow.
- Re-measured: `hidden-proxy.mjs verify insert_branch --base
  c2f1d178~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled) + `fixed smoke spread (24 run): 24 PASS,
  0 regressed → REACH-OK`. Both summary lines cited; the
  mid-iteration REGRESSED sessions are gone from the final tree —
  fixed in-commit, not parked.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
