# Review 2459 — ac21ab5cc — rloc_to clears MON_OFFMAP on place (D-3577)

**Metadata.** SHA `ac21ab5cc` (2026-10-06, D-3577). Type: **cliff**:
writer port for the cliffs head `teleport.c collect_coords`. `js/`
insertions: 3 (`js/teleport.js` +3/−0) + 1 test file.

## Intent vs deliverable

Promise: one line in `rloc_to` at the mx/my set —
`mstate &= ~MON_OFFMAP` (C :1684 place grids the mon); placement ⟹
on-grid ⟹ visible; other bits preserved; probe Tourist-92100
131→132.

Diff actually adds: that one line + comment. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | rloc_to (place arm) | ported | [teleport.js](/home/debian/dev/teleport-contest/js/teleport.js:744) | teleport.c:1684 (rloc_to_core); place_monster steed.c:897–932 |

Helpers: none. MON_OFFMAP already imported; no signature change.

## C ↔ JS fidelity

**The invariant is real and C-enforced.** C `place_monster`
(steed.c:897–932 via `csym`, read to the end): `mon->mx = x, mon->my
= y; level.monsters[x][y] = mon; mon->mstate = MON_FLOOR;` — placement
floors mstate. C sanity (mon.c:287–289, read) impossible's on any
gridded mon with mstate set. The OFFMAP bit is set only at
mnearto:4051 (flagging-remove) and wizcmds:99; JS's mnearto
equivalent (mon.js:2179) sets it the same way, and JS `m_at` skips
OFFMAP mons — so a re-placed mon kept the bit and ghosted from `m_at`
exactly as diagnosed (C #626 gate FALSE via occupancy vs JS TRUE via
`occ=none`). The fix restores the flag⟺grid invariant at the exact C
site (JS order mx/my → region → worm tail matches C :1684–1687 ✓).

**Narrow-clear vs C's floor — observably identical.** C floors all
bits; JS clears only OFFMAP. The only other bit ever set on a
rloc_to-bound mon is MON_BUBBLEMOVE (mkmaze.c:1620, cleared by C on
the mnearto re-place): write-only in C (zero readers in src/) and
write-only in JS (set once in mklev.js, never read) — and JS has no
`mstate != MON_FLOOR` reader (searched), so a preserved bit is
unobservable. All 17 JS `rloc_to(` call sites pass level mons; none
can carry MIGRATING/LIMBO/DETACH/ENDGAME. Behavior: C-exact.

**But the parenthetical is false:** "(C never clears mstate on
place)" contradicts steed.c:931 (`mon->mstate = MON_FLOOR`). The code
comment ("clear the flagging-remove bit") is accurate; the D-log's
mechanism story should cite the FLOOR as the reason OFFMAP dies on
place. Doc nit, not a behavior C-wrong — no Must-fix (a future iter
can correct the sentence if it touches the D-entry; D-logs are not
rewritten for nits).

Ledger: `rloc_to` gains D-3577; oldest d-tag D-1160 rotated off the
6-entry list (same length as every other 6-tag row; history intact in
git) — by-design.

## Hallucinations / overclaim

The mstate parenthetical above. The steed/worm safety notes check out
(m_at steed check pre-existing; worm-tail order verified). The
TEMP-C measurement (md5-verified revert) is the right evidence grade
for a gate dispute.

## Density

Cliff §10.18: head writer, one line + test, own `Ledger:` touch.
Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (one statement + comment).
- Rule #2: clean this iteration (see 2453).
- Re-measure (mine): `verify collect_coords --base ac21ab5cc~1
  --reach-all` → **0 PASS, 1 moved** (Tourist-92100 131 →
  level_tele@132), **0 worse** + reach **729/729 REACH-OK** (full
  reach, stronger than the D-log's 80/80 smoke) — claim confirmed.
- Committed test pins m_at non-null post-place; forced full
  `sessions` 44/44 claimed in-ship, re-covered by this audit's gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
