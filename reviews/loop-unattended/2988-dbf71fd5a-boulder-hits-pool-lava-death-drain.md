# Review 2988 — dbf71fd5a — boulder_hits_pool drains a fatal lava splash

- SHA: `dbf71fd5a` (cliff; owner boulder_hits_pool, 1 row)
- D-entry: D-4148; Ledger: boulder_hits_pool ported
- `js/` diff: js/do.js +10

## Intent vs deliverable

Promise: do.c boulder_hits_pool's lava arm calls `losehp(Maybe_Half_Phys(
dmg), "molten lava", KILLED_BY)` (`:138–140`). On a fatal hit, C losehp
prints «You die...» and runs `done(DIED)` inline (the D-log's hack.c
`:4325–4330` are recorder-tree lines; pinned upstream is `:4283–4288`).
JS losehp only flags `_losehp_needs_done`, and boulder_hits_pool never
drained it, so a fire giant's lava splash ended the game silently.

Diff: after the losehp, `await finish_maybe_wail()`. If
`_losehp_needs_done || gameover`, `finish_losehp_done()` is called via a
dynamic import of end.js. Then `return true` when the game really
ended. The promise matches the diff.

## Inventory

- `boulder_hits_pool` — do.js:984–1091; C do.c:50–155 (lava arm
  :132–141, boulder gone :148–152).
- Callees: `losehp` (live; C hack.c:4255–4292 pinned, fatal arm :4283–4288), `finish_maybe_wail` /
  `finish_losehp_done` (the JS split of C losehp's inline tail; the same
  idiom as D-4092's flooreffects squish in this file).

## C ↔ JS fidelity

C arm order: «You are hit by molten lava%c» (`'.'` with
Fire_resistance) → burn_away_slime → `dmg = d(Fire_resistance ? 1 : 3,
6)` → losehp. If the hero survives, or wizard «Die? n» returns, control
falls to `obfree(otmp)` / `useupf` and `return TRUE`. JS order is the
same. Its `return true` on real gameover skips obfree, which C never
reaches either: done(DIED) does not return.

- `next2u(rx, ry)` is `distu <= 2` in C (you.h:558). JS's `distu(rx, ry) <=
  2` is exact, though its comment calls it an approximation.
- JS still keeps a local `Fire_resistance` constant (do.js:1066): `u.
  Fire_resistance || u.HFire_resistance || u.EFire_resistance`. Its body
  is the same as the exported `Fire_resistance()` (trap.js:5033,
  zap.js:587). attrib.js:1043 maps FIRE_RES to the flat
  `HFire_resistance` field, so the value is live, not phantom. It is a
  duplicate, not a C-wrong.
- The drain order: `finish_maybe_wail` (hack.js:1970) flushes the
  deferred showdamage and rehumanize, then the wail only if JS losehp
  flagged it. C losehp calls showdamage before the `u.uhp < 1` arm
  (`:4280`) and maybe_wail only in the non-fatal `else if` (`:4289–4290`).
  So on a death JS shows the damage and then runs «You die...», as C
  does.

## Hallucinations / overclaim

None. The Named line is honest and useful: it reports 46 `await losehp(`
sites with no drain within 12 lines and names two unmeasured do.js
candidates (goto_level's stair fall, dodown's contusion). No corpus row
blocks on them in this audit's rescore.

## Density

A one-arm fix on the owner. Another site of a known drain family.

## Verification

```text
verify boulder_hits_pool (--base dbf71fd5a~1): scen-worldtour-Wizard-50250008 PASS → PROGRESS
```

Exact match with the D-log (612/612).

## Actionable C-wrongs

None in this SHA. The losehp drain family stays a Named omission until
the board names a site.

Verdict: **ACCEPT**
