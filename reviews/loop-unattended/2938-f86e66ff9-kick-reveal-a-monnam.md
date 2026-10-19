# Review 2938 — f86e66ff9 — kick_monster reveal names the target with a_monnam

- SHA: `f86e66ff9` (cliff, writer behind board owner `describe_decor`)
- D-entry: D-4097; Ledger: dokick.c (`kick_monster`, D-4097)
- `js/` diff: `js/dokick.js` +3/−2 (import + one call)

## Intent vs deliverable

Promise: when a kick reveals a hidden target or a mimic, JS printed
«There is the small mimic here.». It used `mon_nam`, but C uses
`a_monnam`. Diff: `a_monnam` is added to the existing do_name.js import
and used in the reveal pline. Promise = diff.

## Inventory

- `kick_monster` reveal block — dokick.js:940–952; C dokick.c
  `kick_monster` :162–175.
- Callee `a_monnam` — do_name.js export (the import edge already
  existed). LIVE.

## C ↔ JS fidelity

```c
if (mon->mundetected || (M_AP_TYPE(mon) && M_AP_TYPE(mon) != M_AP_MONSTER)) {
    if (M_AP_TYPE(mon)) seemimic(mon);
    mon->mundetected = 0;
    if (!canspotmon(mon)) map_invisible(x, y); else newsym(x, y);
    There("is %s here.", canspotmon(mon) ? a_monnam(mon) : "something hidden");
}
```

The JS block follows this branch for branch: the guard, `seemimic`, the
mundetected clear, the `map_invisible` / `newsym` split, and the
`canspotmon` choice. Only the naming function was wrong, and now it is
C's `a_monnam`. `There()` is the «There » prefix over pline. The
literal `There is ${who} here.` gives the same text. No RNG in this
block. The Levitation miss arm just above it (`rn2(3)` gate, passive)
is unchanged and matches C.

The board owner `describe_decor` was a misattribution: the
region heuristic matched pickup.c's "There is %s here." format. The
D-log names the real writer, dokick.c. This is the same lesson as
the die-decline owner misattribution: the owner label is a format
match, not the writer.

## Hallucinations / overclaim

None.

## Density

One C call, at its C site. One Ledger bullet.

## Verification

```text
verify describe_decor (--base f86e66ff9~1): 3 blocked
  sweep-Barbarian-50556029, worldtour-Archeologist-50056028,
  worldtour-Wizard-50850024: PASS
verify describe_decor: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify kick_monster: 0 blocked (vacuous; owner label is describe_decor)
```

Exact match with the D-log. Public 44/44 at HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
