# Review 3018 — b9da9a8b4 — Ring_off_or_gone's "Strange... I didn't know you had that ring."

- SHA: `b9da9a8b4` (cliff; board row do_statusline2,
  scen-worldtour-Valkyrie-49955041 s543, HP shown 3 screens early)
- D-entry: D-4178; Ledger: Ring_off_or_gone ported, setworn ported
- `js/` diff: do_wear.js +18 −13

## Intent vs deliverable

Promise: Ring_off_or_gone opens with `if (!(u.uprops[oc_oprop].extrinsic
& mask)) impossible("Strange…")` (`:1353–1354`). JS lacked the arm. When
an eel's shock dusted a worn ring of free action (its extrinsic already
0 in both C and JS), JS skipped the impossible and its two follow-up
lines.

Diff: the head now runs in C order: takeoff.mask clear, the extrinsic
test + impossible, then setnotworn (gone) or `setworn(null,
owornmask)` (off). The slot-identity fallback is deleted.
confer_oc_oprop now writes `uprops[p].extrinsic` before its `!p` return,
so prop-0 rings keep C's uprops[0] bits. The promise matches the diff.
Per the user rule, the C bug path is imitated, not avoided.

## Inventory

- Ring_off_or_gone — do_wear.js:3942 (C do_wear.c:1346–1437): head
  rewritten.
- confer_oc_oprop — do_wear.js:410 (JS helper behind setworn/setnotworn;
  C worn.c:96–98, :120–121, :168–169 inline uprops writes): prop-0
  write moved before the return.

## C ↔ JS fidelity

C (do_wear.c:1349–1358):

```c
long mask = (obj->owornmask & W_RING);
svc.context.takeoff.mask &= ~mask;
if (!(u.uprops[objects[obj->otyp].oc_oprop].extrinsic & mask))
    impossible("Strange... I didn't know you had that ring.");
if (gone) setnotworn(obj);
else setworn((struct obj *) 0, obj->owornmask);
```

JS matches it line for line, with `await impossible` (async).

C setworn (worn.c:73–125) writes `u.uprops[p].extrinsic` for every `p`,
including 0. JS's old `if (!p) return` skipped the write, so for the
four prop-0 rings the new test would have read 0 and fired falsely. The
reorder keeps uprops[0] in step, while the E* flats still skip p = 0.
This is a needed companion edit, not scope creep.

The deleted fallback handled `owornmask` already clear. C has no such
path: with mask 0, C's test reads `extrinsic & 0` and fires the
impossible. So removing the fallback is C-correct. Any JS caller that
clears owornmask early would now print the impossible, and that would
be a real JS divergence to surface, not mask.

Restore keeps the state: save.js serHero serializes `u.uprops`
(save.js:887–906), so a ring removal after a restore reads restored
bits, not zeros.

## Hallucinations / overclaim

None. The D-log's measurement logged otyp 192, mask W_RINGR and extrinsic
0 at the JS head. That is the exact state C's test fires on, so the
missing arm is the writer, not the extrinsic state.

## Density

One arm plus its one required companion. Right-sized.

## Verification

```text
verify do_statusline2,Ring_off_or_gone,setworn --base b9da9a8b4~1 --no-reach
  do_statusline2: 1 PASS (scen-worldtour-Valkyrie-49955041) → PROGRESS
  Ring_off_or_gone / setworn: 0 blocked (vacuous)
```

This reproduces the claim. D-4179's board note also credits this arm
with healing scen-worldtour-Wizard-50255512 (recharge's Ring_off). The
audit rescore keeps that row PASS (archived), and shows 0 PASS→FAIL with
every ring removal now running the test.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
