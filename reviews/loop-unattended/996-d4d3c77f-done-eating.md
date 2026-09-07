# Review 996 — d4d3c77f — done_eating nomovemsg + consuming (D-2026)

Metadata: SHA `d4d3c77f`, D-2026, Open-row port
(lesshungry-symptom writer, 4 PASS + 3 moved). js/
touches `js/eat.js` (+11/−2: nomovemsg arm + consuming
variant). No stamp owed.

## Intent vs deliverable

Subject promises: a stored nomovemsg wins over the
finish-eating line (always cleared); fire-elemental
heroes "consume". Six kit/normal sessions first-diverge
at the end of a multi-turn meal (C `You're finally
finished.` vs JS `You finish eating the food ration.`,
kind=screen at `eat.c:3315`). Diff actually adds: exactly
that if / else-if in C order. Promise == diff.

## Inventory

- Changed JS function: `done_eating` head only. No new
  helpers, no new imports (`Upolyd` + `PM_FIRE_ELEMENTAL`
  already module-local). No deletes / re-points, no STUB /
  clone / no-op.
- Named: `start_eating` `:2048–2062` old/save_nomovemsg
  dance around the bite-finish `done_eating(FALSE)`
  (pre-existing — all 7 checked sessions finish via the
  `eatfood` `done_eating(TRUE)` path, so the scope claim
  is falsifiable and matches the verify set);
  `done_eating` `!piece` defensive early return
  (pre-existing; C assumes non-null); `useup` / `useupf` +
  victual-reset tail unchanged.

## C ↔ JS fidelity

Against `eat.c:543–573`, read directly:

```
if (gn.nomovemsg) {
    if (message)
        pline1(gn.nomovemsg);
    gn.nomovemsg = 0;
} else if (message) {
    You("finish %s %s.",
        (gy.youmonst.data == &mons[PM_FIRE_ELEMENTAL]) ? "consuming"
        : "eating",
        food_xname(piece, TRUE));
}
```

JS preserves both halves C couples in the first arm —
print-gated-on-message AND unconditional clear (the
`unmul` citation in `hack.js` is the same shape) ✓, and
the `consuming` / `eating` split in the else arm ✓, with
the data-pointer check rendered via the `Upolyd(u) &&
umonnum === PM_FIRE_ELEMENTAL` idiom (third use in this
batch after 993/994, same set_uasmon justification,
`timeout.js:694` precedent) ✓. Writer side confirmed
live: `eat.js:909` stores `"You're finally finished."`
under the `:3315` lesshungry gate (`uhunger >= 1500`,
`!fullwarn`) — coherent end to end, which is why the fix
converts 4 sessions to full PASS. One non-observable
nuance, not charged: C prints via `pline1` (no history
save); `js/display.js` has no `pline1` primitive and the
whole file uses `pline`. Screens and RNG identical either
way; history-only.

## Hallucinations / overclaim

None. The scope-bounding claim (TRUE-path only) is
checkable, and the full-skip rationale (eat.js is not a
shared file) follows the verify matrix.

## Density

Two arms of one C function head. Right-sized.

## Verification

Re-measured myself:

```
node scripts/hidden-proxy.mjs verify lesshungry --base d4d3c77f~1
→ 7 session(s) blocked (7 at baseline, 0 working)
→ 4 PASS, 3 moved past, 0 unchanged, 0 worse → PROGRESS
```

Reproducing the D-log exactly (Monk-92139 / 92236 /
92077 / 92108 PASS; kit-Archeologist-92190 → monshoot@8;
kit-Valkyrie-91116 → doengrave@51; normal-
Archeologist-92228 → use_container@80 — all three moved
rows are live Open queue rows, i.e. correctly triaged
downstream owners). js/ hunk grep: no banned patterns.
Rule #2 clean (global re-run). Cited green + strict ×2,
cohort 7/7.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
