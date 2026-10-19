# Review 2958 — 40626768e — lookat's save_uswallow gate compares glyph ids

- SHA: `40626768e` (cliff, live-queue owner `mstatusline`, 1 row; writer = pager.c lookat)
- D-entry: D-4118; Ledger: lookat ported
- `js/` diff: `js/pager.js` +3/−1

## Intent vs deliverable

Promise: lookat skips its self arm when monster detection has the
engulfed hero "unconstrained" (`iflags.save_uswallow && glyph ==
mon_to_glyph(u.ustuck, …)`). JS compared the integer `glyph` with
mon_to_glyph's banked **record**, so the test was always false. Browsing
the hero's square printed «human tourist called wizard» where C prints
«lurker above, engulfing you». Diff: the comparison takes `.glyph`.
Promise = diff.

## Inventory

- `lookat` — pager.js:2129–2137; C pager.c:657–700 (gate :665–668).
- Callee `mon_to_glyph` — display.js:770 (returns
  `glyph_from_mnum(...)`, a `{glyph, ch, color, …}` record).

## C ↔ JS fidelity

```c
glyph = glyph_at(x, y);
if (u_at(x, y) && canspotself()
    && !(iflags.save_uswallow
         && glyph == mon_to_glyph(u.ustuck, rn2_on_display_rng))
    && (!iflags.terrainmode || (iflags.terrainmode & TER_MON) != 0)) {
```

The JS gate is now C's: an int compared with an int. Short-circuit
order is the same, so `mon_to_glyph`'s `what_mon` display-RNG draw
happens only when `save_uswallow` is set, as in C. JS's extra
`u.ustuck &&` cannot change the result, because save_uswallow is set only
while engulfed. When the gate is true, the monster arm (:707–711 →
look_at) describes the engulfer, which is what C prints.

Same-class sweep: I listed every JS `mon_to_glyph(` call site. The
others (display.js:1635, :2244, :5520; detect.js:649/656/1244;
muse.js:1357/3108) all use the record's fields (`mg.ch`, `mg.glyph`) or
pass the record to record-taking callees (flash_glyph_at,
show_glyph_cell). None of them compares the record with an integer, so
the bug was one site.

## Hallucinations / overclaim

None. The subject's "always false" holds: a JS object is never `===` a
number.

## Density

One operator in the writer. Small, exact, and C-cited.

## Verification

```text
verify mstatusline (--base 40626768e~1): 1 blocked
  scen-sweep-Tourist-50255248: PASS
verify mstatusline: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify lookat: 0 blocked (vacuous; the owner was the symptom)
```

Exact match with the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
