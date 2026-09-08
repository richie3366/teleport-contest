# Review 1107 — 79844c1c — hold_another_object refuse-arm dropy (D-2141)

Metadata: SHA `79844c1c`, `js/invent.js` only (+9/−4 in `js/`).
Queue row fired: Open `dogmove.c dog_goal` (1 session,
scen-wish-Priest-92136 step 136). No prior review claimed closed.

## Intent vs deliverable

Subject promises `await dropy(obj)` after `obj_extract_self(obj)`
in the artifact-refuse arm (C `:1229`). Diff delivers exactly
that: one added call line, the `dropy` import on the existing
`do.js` edge, and a comment update retiring the "dropy deferred"
note. Promise matches diff; nothing extra.

## Inventory

Zero new functions; one added call line; one extended import.
Single callee: `dropy` LIVE (`do.js:2265`, async, awaited) on a
pre-existing edge (`setnotworn` already imported from it) — no new
edge, no TDZ risk. No symbol deleted or re-pointed.

## C ↔ JS fidelity

Audited against `invent.c:1207–1306` (via `csym`), refuse arm
`:1227–1231`. C is:

```c
if (!touch_artifact(obj, &gy.youmonst)) {
    obj_extract_self(obj); /* remove it from the floor */
    dropy(obj);            /* now put it back again :-) */
    return obj;
}
```

JS (`invent.js:7194–7199`) is now line-identical in order and in
silence — no pline on this arm, matching C:

```js
if (!(await touch_artifact(obj, youmonst))) {
    obj_extract_self(obj);
    await dropy(obj);
    return obj;
}
```

D-2134 supplied the
silence (removing the wrong `drop_fmt` pline); this iter supplies
the `dropy`. Together the arm is complete: extract → drop →
return. The neighboring arms are untouched and correctly so: the
wasUpolyd revert-grip arm and the crysknife otyp/oerodeproof
restore stay map-named, and neither can fire on this path (no
poly, no crysknife in the failing session — wished PYEC). The
success-path `obj_extract_self` below is untouched, matching C
`:1237`. Branch-by-branch confirm complete.

## Hallucinations / overclaim

None. D-log reports same-owner movement (dog_goal@136 →
dog_goal@168) as PROGRESS with rngM/scrM deltas, not PASS. That
restraint matters: the method flags "still `<fn>` at a later step"
presented as PASS, and this entry does the opposite.

## Density

Nine insertions retiring a named omission, completing an arm the
previous iter left half-live. Minimal and complete — the small
size is the C unit's size, not a thin iter (cf. D-2139 precedent).

## Verification

D-log bullet shows `verify.mjs --fn dog_goal` → PROGRESS + green
2/2 + strict ×2 + cohort 7/7. Re-measured myself:
`hidden-proxy verify dog_goal --base 79844c1c~1` → `0 PASS, 1
moved past (still dog_goal at a later step), 0 unchanged, 0 worse
→ PROGRESS` (Priest-92136 step 136 → 168, +32 steps). This is the
explicitly accepted "later step" form of movement, and the D-log
claims nothing stronger — no vacuous check, no false PASS.
Post-fix first-diff detail (C `rn2(8)=7` now matching JS at the
new point before diverging at the next `:575` gate) corroborates
forward movement rather than re-report noise. Added-line grep: 0
banned-pattern hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
