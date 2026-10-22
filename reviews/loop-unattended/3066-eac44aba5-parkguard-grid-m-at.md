# Review 3066 — eac44aba5 — parkguard tests the raw grid at <0,0>

- SHA: `eac44aba5` (cliffs row obj_resists: scen-vault-Samurai-53456057
  step 562, reserve, picked after a rescore of 19 failing rows)
- D-entry: D-4226; Ledger: parkguard ported
- `js/` diff: vault.js +7 −4 (one import, one test re-pointed, doc
  comment)

## Intent vs deliverable

Promise: vault.c parkguard places the guard only `if (m_at(0, 0) !=
grd)` (`:165–166`), and C m_at is the raw `level.monsters` cell (rm.h
`:516`, the `#else` branch; the mburied variant is `#if 0`). findgd's
migrating arm (`:216–230`) relinks a guard onto fmon with mx = my = 0
but leaves it off the grid. parkguard then has to call place_monster so
that `mstate = MON_FLOOR`. JS mon.js m_at falls back to an fmon
coordinate scan, which found the relinked guard itself, so
place_monster was skipped, MON_MIGRATING stayed set, and movemon's
parked arm never ran gd_move, so mongone's five obj_resists draws never
happened.

Diff: `import { level_mon_at } from './worm.js'`, and the test now
reads `level_mon_at(0, 0) !== grd`. The stale "Named omission: … grid"
comment is replaced by the reason. The diff matches the promise.

## Inventory

- parkguard — js/vault.js:258 (C vault.c `:154–171`).
- Re-pointed symbol (m_at → level_mon_at at this one site):

```text
$ node scripts/sym.mjs level_mon_at
level_mon_at     js/worm.js:65   sync
$ node scripts/sym.mjs m_at
m_at             js/mon.js:1726   sync
```

  Both are single exports with no clones, and both are sync, so there
  is no await issue. `imports.mjs --can vault.js worm.js level_mon_at`
  → `ALREADY: vault.js already statically imports worm.js`. m_at stays
  imported (vault.js:59) for the other four sites.
- Callees: remove_monster / place_monster (steed.js, LIVE ports of
  steed.c `:897–932`), newsym, EGD. Callers (`csym.mjs --callers
  parkguard`): grddead `:183`, findgd `:229`, gd_move_cleanup `:854`.
  All three are wired in JS.

## C ↔ JS fidelity

C `:159–170`, arm by arm:

- `grd == polearm.hitmon` → clear. JS `:261–263` does the same.
- `if (grd->mx) { remove_monster; newsym }`. JS `:265–268` gates on mx
  only, as C does.
- `if (m_at(0,0) != grd) place_monster(grd, 0, 0)`. JS `:270`.
  level_mon_at is the grid map `game._level_monsters`, but it filters
  usteed, `mhp <= 0`, MON_OFFMAP, and stale heads whose mx/my moved
  off the cell. That makes it a near-raw read, not an exact one. I
  checked the cases that differ:
  - Relinked migrant (the measured case): it is not in the grid, so
    both C and JS get no match, and place_monster runs. Matches.
  - Live guard already parked at <0,0>: both see grd and skip.
    Matches.
  - grddead `:182–183` (`grd->mhp = 0; parkguard`) on a guard already
    parked by gd_move_cleanup `:854`: C m_at returns grd and skips.
    JS gets null (mhp 0) and calls place_monster. place_monster's
    defunct gate exempts `isgd && <0,0>`. Its "over" test re-reads
    level_mon_at (null), so it raises no impossible. It rewrites
    mx/my = 0 and `mstate = MON_FLOOR`. grddead runs before m_detach
    (mon.c `:3109`, `:3273`), so mstate is still MON_FLOOR and the
    result is net-identical. No RNG, no output.
- `EGD->ogx/ogy = grd->mx/my`. JS `:272–276` matches.

findgd's migrating arm (JS vault.js findgd) matches C `:216–230` line
for line: splice, unshift onto fmon, mon_track_clear, mux/muy, mx/my =
0, parkguard.

No RNG in parkguard. The restored draws are downstream: movemon parked
arm → gd_move → gd_move_cleanup → restfakecorr → mongone →
mdrop_special_objs → obj_resists ×5.

## Same-bug-class sites

- teleport.js relmon `mon_m_at(0, 0) === mtmp` (mon.c relmon). The
  D-entry names it and leaves it. That is another C file, so leaving it
  is correct under same-C-file scope. No corpus row is blocked there.
- vault.js's other m_at reads (`:192` fcx/fcy, `:340`, `:952/:958`
  nx/ny) are all at map squares with x ≥ 1. A guard relinked to <0,0>
  cannot match them, and the fmon fallback only adds monsters whose
  mx/my was moved without place_monster, which is a project-wide m_at
  design (D-1565/D-1231), not this bug. Leaving them is correct.

## Hallucinations / overclaim

None. "C m_at is the raw grid" is right (rm.h `:516`). The comment's
claim that level_mon_at is "the JS reading of C's level.monsters"
holds up to the dead/offmap filters, which I checked above as
net-identical on every parkguard caller.

## Density

One owner, one line of logic, and it is the writer, not the parked
symptom: the D-entry traced the C backtrace to the gd_move chain. It
was taken after a rescore had cleared stale rows. Right-sized.

## Verification

```text
hidden-proxy verify obj_resists,parkguard --base eac44aba5~1 --no-reach
  verify obj_resists: baseline eac44aba5~1 (scoreboard at 607412de2) —
    1 session(s) blocked on it
    scen-vault-Samurai-53456057: PASS
  verify obj_resists: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  verify parkguard: 0 session(s) blocked (vacuous, as expected: the row
    was owned by obj_resists)
```

D-log: frozen runner PASS (RNG 70123/70123, Screen 887/887), green
2/2, strict ×2, cohort 7/7, full 44/44, sweep 754 baseline-PASS 0
regressed → REACH-OK. Rule #2 `--rulecheck` is clean. The diff has no
coordinate or seed reads: <0,0> is C's own literal.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
