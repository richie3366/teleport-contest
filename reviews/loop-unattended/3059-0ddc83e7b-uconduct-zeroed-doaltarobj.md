# Review 3059 — 0ddc83e7b — u_init_misc zeroes u.uconduct; doaltarobj back in C shape

- SHA: `0ddc83e7b` (Must-fix/cliffs head at the parent: `insight.c`
  show_gamelog, scen-symset-Ranger-53050029 step 261, @857fe4c5d)
- D-entry: D-4219; Ledger: u_init_misc ported; doaltarobj ported
- `js/` diff: do.js +8 −13, u_init.js +10

## Intent vs deliverable

Promise: u_init.c u_init_misc `memset`s the whole `struct you` (`:954`),
so `u.uconduct` exists with every counter at 0 from turn 1. JS created
`u.uconduct` lazily and doaltarobj skipped the conduct arm when it was
absent, so the first altar drop never livelogged «eschewed atheism, by
dropping … on an altar» and `#chronicle` was one row short.

Diff:

- u_init_misc now assigns `g.u.uconduct` an object with the 18
  `struct u_conduct` fields, all 0.
- doaltarobj's conduct arm is collapsed to
  `!mon_moving && !(game.u.uconduct.gnostic++)` → livelog. The `if (uc)`
  guard is gone.

The promise matches the diff. The queue row named show_gamelog (the
painter, by the region heuristic); the commit fixes the writer, which
is what the row asked for.

## Inventory

- u_init_misc — js/u_init.js:1966–1978 (only the new block); C
  u_init.c `:943–1036`, memset `:954`.
- doaltarobj — js/do.js:724–756; C do.c `:362–390`.
- Callees: livelog_printf (pline.js, LIVE), doname (LIVE), and Blind
  (local do.js:462 clone, unchanged by this diff, see below).
- Callers (unchanged): `csym --callers doaltarobj` → do.c:317
  (flooreffects), do.c:793 (dropz), dothrow.c:615, mkobj.c:2924,
  pickup.c:3813. u_init_misc ← allmain.js:892 (newgame).
- Deleted / re-pointed symbols: none. The removed code is the local
  variables `uc` / `wasGnostic` inside doaltarobj.

```text
$ node scripts/sym.mjs doaltarobj
doaltarobj       js/do.js:729   ASYNC — await required
```

## C ↔ JS fidelity

C do.c `:368–373`:

```c
if (obj->oclass != COIN_CLASS) {
    /* KMH, conduct */
    if (!svc.context.mon_moving && !u.uconduct.gnostic++)
        livelog_printf(LL_CONDUCT,
                       "eschewed atheism, by dropping %s on an altar",
                       doname(obj));
} else {
```

- Short-circuit: in C, `gnostic++` runs only when `!mon_moving`. The old
  JS also nested the increment under `!mon_moving`, so this was never
  the bug. The new one-liner keeps the same order: JS `&&` short-circuits
  exactly like C.
- Post-increment: `!(x++)` is true only when the old value was 0, and it
  increments in both cases. Identical.
- Coin arm, the blessed/cursed «flash» line and `bknown` tails are
  unchanged and still follow C `:374–389` (checked above the hunk).
- Entry guard `if (!obj || Blind()) return;`. C is `if (Blind) return;`
  with NONNULLARG1. The extra `!obj` cannot fire from any C caller.

C you.h `:147–167` struct u_conduct: unvegetarian, unvegan, food,
gnostic, weaphit, killer, literate, polypiles, polyselfs, wishes,
wisharti, hf_reserved1, sokocheat, pets, reserved1–4 (18 fields). The
JS object has exactly these 18 names, in C order, all 0. That matches
what the memset leaves.

Placement: the JS block runs after `flags.female` / `flags.beginner`,
which is where C's memset runs (`:948–954`). Nothing before
u_init_misc in allmain.js writes uconduct. The only pre-existing writer
in u_init.js (`:970`, the Archeologist decipher-label literate conduct)
runs during play and keeps its lazy guard, which now never fires.

The new code dereferences `game.u.uconduct` without a guard. It is
created on every new-game path (allmain.js:892), and JS has no restore
path that rebuilds `u` (no uconduct in restore/save). So it cannot
throw in a scored replay.

RNG: none in either function. No draw is added or removed.

Not in the diff: doaltarobj's `Blind()` is a local clone (do.js:462).
`sym.mjs Blind` lists it among 25 local clones of the invent.js:372
export. Its body matches the export: `(H||E) && !B`, plus the export's
`uroleplay.blind` early return. That return is redundant with C, where
u_init.c `:1027` sets `HBlinded |= FROMOUTSIDE` for roleplay-blind
heroes. This is clone debt, not a C-wrong this commit introduced.

## Hallucinations / overclaim

None. The D-log says that about 20 lazy `if (!u.uconduct) u.uconduct =
{}` guards in other files are now dead and were left in place. My grep
found 41 such sites (`grep -an 'uconduct\s*='`). The count is
understated, but the claim (dead, harmless) is true now that
u_init_misc always runs first. The named omission "u_init_misc does not
reset the rest of u" is honest. JS starts each game from a fresh `game`
object, so the memset's other effects come from `| 0` reads.

## Density

One writer fix (C's struct initialiser), with the C-shaped conduct arm
that reads it. It moved the measured row. Right-sized for a cliff.

## Verification

```text
$ node scripts/hidden-proxy.mjs verify show_gamelog,doaltarobj,u_init_misc --base 0ddc83e7b~1 --no-reach
verify show_gamelog: baseline 0ddc83e7b~1 (scoreboard at 857fe4c5d) — 1 session(s) blocked on it
  scen-symset-Ranger-53050029: PASS
verify show_gamelog: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify doaltarobj: 0 blocked (vacuous: not an owner)
verify u_init_misc: 0 blocked (vacuous: not an owner)
```

D-log: frozen runner PASS (RNG 24550/24550, Screen 908/908), REACH-OK
×3, green 2/2, strict ×2, cohort 7/7, full 44/44, sweep 711
baseline-PASS 0 regressed. The full rescore at the end of this audit
re-checks the window.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
