# Review 3023 — 5fa7a7f1f — hand loaders apply lspo_engraving's guardobjects tail

- SHA: `5fa7a7f1f` (cliff; board row obj_resists,
  scen-questwalk-Monk-51660016 s97, xorn eats the Mon-loca tins in C)
- D-entry: D-4183; Ledger: lspo_engraving
- `js/` diff: mklev.js +40 −4 (four sites)

## Intent vs deliverable

Promise: sp_lev.c lspo_engraving always ends with
`ep->guardobjects = guardobjs; ep->nowipeout = !wipeout;`
(`:3930–3934`). guardobjs defaults to FALSE and no dat/*.lua names it,
so C undoes make_engr_at's in_mklev rule (engrave.c:446–447) that a
level-gen "Elbereth" guards objects. Four hand loaders called
make_engr_at directly and kept guardobjects=1.

Diff: Mon-loca, soko1-1, soko1-2 and castle keep make_engr_at's
returned `ep` and set `guardobjects = 0`, `nowipeout = 0`. The promise
matches the diff.

## Inventory

- load_mon_loca — mklev.js:12776; load_soko1_1 — :14978;
  load_soko1_2 — :15169; load_castle — :25067. Each applies the
  lspo_engraving tail (C sp_lev.c:3880–3936) inline.
- lspo_engraving itself (mklev.js:1777) is unchanged and already ends
  with the C tail via `engr_at(x, y)`.

## C ↔ JS fidelity

```c
make_engr_at(x, y, txt, NULL, 0L, etyp);
ep = engr_at(x, y);
if (ep) { ep->guardobjects = guardobjs; ep->nowipeout = !wipeout; }
```

C make_engr_at deletes any old engraving at (x,y) first, so `engr_at`
returns the new one, which is the same object JS's return value gives.
For these four tables `degrade` is absent (wipeout TRUE → nowipeout 0)
and `guardobjects` is absent (FALSE). JS writes those values.

Completeness: by grep, the dat/*.lua files with "Elbereth" are exactly
Mon-loca, castle, soko1-1 and soko1-2. Those are the four sites. Other
direct make_engr_at calls in loaders (oracle-style "X marks the spot",
minetn wine cellar, tutorial, themerms "Dig…") have non-Elbereth text,
so make_engr_at never sets guardobjects for them. They already apply
the nowipeout half or rely on make_engr_at's zeroed default.

## Hallucinations / overclaim

None. The D-log says the castle/soko change only matters once their
cursed scare-monster scroll is gone, which is correct: onscary() is
already TRUE because of the scroll.

## Density

Four 8-line copies of one 2-statement tail. A shared helper would have
been tidier, but each copy is exact. Right-sized for a cliff.

## Verification

```text
verify obj_resists,lspo_engraving --base 5fa7a7f1f~1 --no-reach
  obj_resists:    1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  lspo_engraving: 0 blocked (vacuous)
```

This reproduces the D-log (scen-questwalk-Monk-51660016 PASS). The
audit's full rescore shows 0 PASS→FAIL.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
