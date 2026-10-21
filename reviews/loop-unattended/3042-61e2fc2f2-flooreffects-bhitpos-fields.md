# Review 3042 — 61e2fc2f2 — flooreffects writes gb.bhitpos fields, never swaps the object

- SHA: `61e2fc2f2` (cliffs head, owner label xkilled, region heuristic:
  scen-questtour-Archeologist-50361020 step 400)
- D-entry: D-4202; Ledger: flooreffects ported
- `js/` diff: do.js +9 −3

## Intent vs deliverable

Promise: do.c flooreffects saves gb.bhitpos, writes the drop square into
it, and restores it before returning (`:182–183`, `:357`). That is a
struct copy into one global. JS replaced `game.bhitpos` with a new object
on both the set and the restore, so zap.js bhit's alias went stale after
mondead → relobj → mdrop_obj → flooreffects. bhitm's reveal_invis then
mapped `I` on the dead student's square. This closes the review-2982
ledger omission.

Diff: the set writes `game.bhitpos.x/.y` (the object is created only if
it is missing, C's zeroed static); the restore writes the saved fields
back. The promise matches the diff.

## Inventory

- flooreffects — do.js:745–979 (C do.c:162–359); set `:784–787`,
  restore `:975–977`.
- No helper added, deleted or re-pointed (sym.mjs not required).

## C ↔ JS fidelity

C:

```c
save_bhitpos = gb.bhitpos;
gb.bhitpos.x = x, gb.bhitpos.y = y;
...
gb.bhitpos = save_bhitpos;
return res;
```

- Save: JS copies the two ints into a fresh `save`, the same value
  semantics as C's struct copy.
- Set/restore: now field writes on the one global object, so every alias
  (zap.js bhit's `bhitpos` local, the dothrow.js:927 pattern) sees both
  writes, as C code reading `gb.bhitpos` does.
- Early exits: C has no `return` between `:183` and `:357`. The single
  JS early return (do.js:862, `if (gameover) return true` after a fatal
  boulder losehp) is C's noreturn done(), so skipping the restore there
  changes nothing observable.

No RNG change: the fix only changes which object is read.

## Hallucinations / overclaim

None. The measurement (an mx/my trap and a game.bhitpos accessor trap
naming do.js `:783`/`:971` on every dropped item) is consistent with the
code. The named omissions are true on HEAD: `apply.js:3818` and `:3987`
still assign `game.bhitpos = { x: cc.x, y: cc.y }` (use_pole /
use_grapple), plus the zap.js dobuzz save/restore. They are other C
files and no failing row reaches them; memory note
`bhitpos-object-swap` covers the idiom.

## Density

Two statements in one function, measured with a write trap. Right-sized.

## Verification

```text
verify xkilled,flooreffects --base 61e2fc2f2~1 --no-reach
  xkilled: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
    scen-questtour-Archeologist-50361020: PASS
  flooreffects: 0 blocked (vacuous; the row is labelled xkilled)
```

D-log: reach flooreffects REACH-OK (7 tagged), green 2/2, strict ×2,
cohort 7/7, full 44/44, sweep 675 baseline-PASS 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
