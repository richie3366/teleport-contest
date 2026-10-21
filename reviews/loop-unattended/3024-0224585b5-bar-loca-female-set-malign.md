# Review 3024 — 0224585b5 — Bar-loca placeMon ends like create_monster

- SHA: `0224585b5` (cliff; board row peace_minded,
  scen-questwalk-Barbarian-51660025 s230, `rn2(19)` vs `rn2(7)`)
- D-entry: D-4184; Ledger: create_monster (placeMon stand-in)
- `js/` diff: mklev.js +8 −3

## Intent vs deliverable

Promise: sp_lev.c create_monster ends every des.monster with
`mtmp->female = m->female`, then the peaceful override plus
`set_malign` (`:2125–2129`). Bar-loca's 14 `peaceful=0` ogres are
coaligned with a chaotic Barbarian, so makemon made them peaceful with
malign −9. In C the override resets malign to 3, and each kill costs 12
fewer alignment points.

Diff: placeMon sets `mtmp.female = female` unconditionally and wraps the
override in `{ mpeaceful = …; set_malign(mtmp); }`. The promise matches
the diff.

## Inventory

- load_bar_loca's placeMon — mklev.js:13950–13990 (stand-in for C
  sp_lev.c create_monster :1925–2187, tail :2125–2129). Callees:
  set_malign (LIVE, mon.c port), find_montype_gender (LIVE wrapper of
  find_montype). No symbol deleted or re-pointed.

## C ↔ JS fidelity

- **Tail.** C:

  ```c
  mtmp->female = m->female;
  if (m->peaceful > BOOL_RANDOM) {
      mtmp->mpeaceful = m->peaceful;
      /* changed mpeaceful again; have to reset malign */
      set_malign(mtmp);
  }
  ```

  JS now has the same statements in the same order.
- **What `female` holds.** For an `id` spec, lspo_monster
  (`:3342–3356`) takes `tmpmons.female = mgend` whenever the table's
  `female` is BOOL_RANDOM. find_montype (`:3142–3164`) always returns
  MALE or FEMALE for a valid id, drawing `rn2(2)` for a two-gender
  species. JS find_montype mirrors it line for line, and
  find_montype_gender passes `box.mgender` through, so the ogres get
  C's rolled sex. For a class-only spec, the safety net (`:3355–3356`)
  makes it 0, and JS's initial `female = 0` matches.
- **Before.** The old `if (spec.id)` guard let class-only monsters keep
  makemon's random sex. That was a second C-wrong, fixed here too.

## Hallucinations / overclaim

None. The D-log names placeMon as a stand-in whose asleep, name, appear
and amask arms Bar-loca.lua never uses. That is true: the Lua lines are
`{ id = "ogre", x=…, y=…, peaceful=0 }`.

## Density

Five changed lines on the cliff owner's writer. Right-sized.

## Verification

```text
verify peace_minded,create_monster --base 0224585b5~1 --no-reach
  peace_minded:   1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  create_monster: 0 blocked (vacuous)
```

This reproduces the D-log (scen-questwalk-Barbarian-51660025 PASS).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
