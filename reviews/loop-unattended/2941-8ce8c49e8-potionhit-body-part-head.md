# Review 2941 — 8ce8c49e8 — potionhit names body_part(HEAD); one evaporate line

- SHA: `8ce8c49e8` (cliff, owner `potionhit`)
- D-entry: D-4100; Ledger: potion.c (`potionhit`, D-4100)
- `js/` diff: `js/potion.js` +5/−6

## Intent vs deliverable

Promise: when a potion hits the hero, JS hardcoded «crashes on your
head», but C names `body_part(HEAD)` (a headless form reads «body», a
vortex «central core»). It also folds the hero's hand-written
«The X evaporates.» into C's single `Tobjnam(obj, "evaporate")`. The
commit also records two stale rows that D-4098 had already flipped.
Diff: one `body_part(HEAD)` interpolation, and the hero/monster
evaporate split collapsed into one `Tobjnam_pot` call. Promise = diff.

## Inventory

- `potionhit` hero arm — potion.js:4078–4090; C potion.c
  `potionhit` :1633–1641.
- `potionhit` evaporate line — potion.js:4130–4134; C :1677–1679.
- Callees: `body_part` (imported from polyself.js, LIVE). `Tobjnam_pot`
  (potion.js:3221) is a **local clone** of objnam.c `Tobjnam`
  :2289–2299. `sym.mjs`:

```text
Tobjnam          js/objnam.js:1845   sync
             !! ALSO 6 LOCAL CLONE(S) in 6 files — IMPORT the export
Tobjnam_pot      NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s): js/potion.js:3221
```

## C ↔ JS fidelity

```c
pline_The("%s crashes on your %s and breaks into shards.", botlnam, body_part(HEAD));
losehp(Maybe_Half_Phys(rnd(2)), (how == POTHIT_OTHER_THROW) ? "propelled potion" : "thrown potion", KILLED_BY_AN);
…
if (obj->otyp != POT_OIL && !hit_saddle && cansee(tx, ty))
    pline("%s.", Tobjnam(obj, "evaporate"));
```

The hero arm now matches C's text. The `rnd(2)` losehp draw and the
killer strings are unchanged. The evaporate gate (`!POT_OIL &&
!hit_saddle && cansee(tx, ty)`) matches C, and so does the single call.

Clone check: `Tobjnam_pot` = `The(xname(obj))` + `otense_pot`, which is
C Tobjnam. `otense_pot` tests `quan !== 1`, while C `otense` tests
`is_plural`, i.e. quan ≠ 1 **or** an identified Eyes of the Overworld.
The artifact clause can't apply to a potion, so on this path the clone
is a verified CLONE, not a C-wrong. The old hero line was a third
hand-written variant with no otense, and it is gone, so the clone
count does not change. Importing objnam.js `Tobjnam` would retire one
of seven copies. That is clone-drift map debt, not a Must-fix.

## Hallucinations / overclaim

None. The «+2 stale D-4098 flips» are real (chain-Priest-50950058 and
symset-Valkyrie-50150047 are `passed: true` on HEAD), and the commit
labels them as D-4098's movement, not its own.

## Density

Two C statements fixed at their C sites. One Ledger bullet.

## Verification

```text
verify potionhit (--base 8ce8c49e8~1): 2 blocked
  scen-sweep-Knight-50055042, scen-sweep-Samurai-50055059: PASS
verify potionhit: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
show chain-Priest-50950058 / symset-Valkyrie-50150047: passed true
```

Exact match with the D-log. Public 44/44 at HEAD.

## Actionable C-wrongs

None. (Clone debt `Tobjnam_pot` → import objnam.js `Tobjnam`: map
debt, not queued.)

Verdict: **ACCEPT**
