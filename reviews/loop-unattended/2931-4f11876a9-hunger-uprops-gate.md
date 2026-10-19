# Review 2931 — 4f11876a9 — status_enlightenment Hunger reads uprops

- SHA: `4f11876a9` (cliff, writer behind `one_characteristic`)
- D-entry: D-4090; Ledger: insight.c (`status_enlightenment`, D-4090)
- `js/` diff: `js/invent.js` +5 −1

## Intent vs deliverable

Promise: the Hunger line tested only the `u.HHunger`/`u.EHunger` flats.
A worn ring of hunger sets `uprops[HUNGER].extrinsic`, so disclosure
dropped «You hungered rapidly because of your ring of hunger.» (5
sessions). Diff: the gate also ORs `uprops[HUNGER].intrinsic ||
.extrinsic`. Promise = diff.

## Inventory

- `status_core_lines` Hunger arm — invent.js:6550–6562; C insight.c:1190-1194.

## C ↔ JS fidelity

```c
#define Hunger (HHunger || EHunger)          /* youprop.h:145-147, uprops[HUNGER] */
if (Hunger) {
    if (magic || cause_known(HUNGER))
        enl_msg(You_, "hunger", "hungered", " rapidly", from_what(HUNGER));
}
```

JS: `(flats || uprops H || uprops E) && (magic || cause_known(HUNGER))`.
C's nested `if` is the same as JS's single conjunction (no else). The
verb, the `final` tense, the " rapidly" suffix and `from_what(HUNGER)`
match. It sits before the hu_stat line, as in C. No RNG.

**Clone drift.** This is an inline copy of the youprop.h macro. The
commit says eat.js's `Hunger` isn't exported. Exporting it, rather than
adding another reader, would be the cleaner fix. It's the same family
as the 3 `Displaced` / 4 `Invis` / 7 `Flying` clones from reviews 2915
and 2919. Not a C-wrong: the inline union equals the macro.

## Hallucinations / overclaim

None. «11 remaining rows» is the corrected base after D-4089 (review
2930), and the 5 named sessions flip on this commit's board.

## Density

One condition. One Ledger bullet.

## Verification

```text
verify one_characteristic (--base 4f11876a9~1): 11 blocked → 10 PASS, 1 unchanged (HEAD code)
  this commit's board flips: wish-Valkyrie-50152027, worldtour-Wizard-50850040,
  sweep-Archeologist-51150009, sweep-Healer-50055041, worldtour-Monk-50450080
```

This is an exact match with the D-log's 5. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
