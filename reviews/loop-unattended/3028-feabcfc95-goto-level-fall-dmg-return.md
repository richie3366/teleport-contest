# Review 3028 — feabcfc95 — goto_level falls through to pickup(1) after a survived fall

- SHA: `feabcfc95` (cliff; board row slimed_to_death,
  scen-sweep-Valkyrie-50362023 s1003, where the topline-literal owner is a
  C comment, see D-3821)
- D-entry: D-4188; Ledger: goto_level ported
- `js/` diff: do.js +10 −5

## Intent vs deliverable

Promise: do.c goto_level ends with the hole/trapdoor fall damage and then
`pickup(1)` (`:1989–1996`). losehp runs done(DIED) inline, and done()
returns on lifesave or a declined wizard «Die?». JS returned
unconditionally after draining the deferred finisher, so the survived
fall skipped pickup(1).

Diff: the drain condition becomes `_losehp_needs_done || gameover`, and
the unconditional `return` becomes `if (program_state.gameover) return`.
The comment now cites hack.c losehp and the D-4092 idiom. The promise
matches the diff. The real writer is goto_level, not the symptom owner
slimed_to_death, and the D-log names it.

## Inventory

- goto_level — do.js:2490–2510 (C do.c:1478–1998, fall arm `:1988–1996`).
- No helper is added or deleted. `finish_losehp_done` (end.js) and
  `finish_maybe_wail` are existing imports.

## C ↔ JS fidelity

C `:1988–1997`:

```c
if (do_fall_dmg) {
    int dmg = d(max(dist, 1), 6);
    dmg = Maybe_Half_Phys(dmg);
    losehp(dmg, "falling down a mine shaft", KILLED_BY);
}
(void) pickup(1);
return;
```

JS: `d(Math.max(dist | 0, 1), 6)` is one RNG call with the same
argument, then maybe_half_phys, then losehp. JS models losehp's inline
done() as a deferred finisher, so the drain sits where C's call returns.
After that, C always reaches `pickup(1)` unless done() never returned.
JS now returns only on `program_state.gameover`, which is exactly the
never-returns case. The lifesave and declined-Die paths now reach
pickup(1), as in C.

Same-file sweep: the two other do.c losehp sites in JS (boulder squish
do.js:854–858, lava boulder :1077–1081) already used the identical
drain-then-gameover-return shape. All three now agree.

## Hallucinations / overclaim

None. The old comment ("losehp is noreturn on death so skip pickup") was
true only for a real death. The D-log quotes it and explains why it was
wrong for done()'s returning arms.

## Density

A 3-line control-flow change on the writer of the cliffs-head row.
Right-sized.

## Verification

```text
verify slimed_to_death,goto_level --base feabcfc95~1 --no-reach
  slimed_to_death: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
                   (scen-sweep-Valkyrie-50362023: PASS)
  goto_level:      0 blocked (vacuous; the row is owned by slimed_to_death)
```

This reproduces the D-log Verify bullet. Regressions in the window are
checked by the audit's single full rescore.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
