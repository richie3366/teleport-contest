# Review 2915 — bdd0d4e9f — mcastu Displaced/Invis read the youprop.h macros

- SHA: `bdd0d4e9f` (cliff, owner `cursetxt`)
- D-entry: D-4074; Ledger: mcastu.c (`cursetxt`, D-4074)
- `js/` diff: `js/mcastu.js` +12 −5

## Intent vs deliverable

Promise: three mcastu.c sites (cursetxt, castmu's "casts a spell%s",
mcast_summon_mons's "appears") read the phantom `u.Displaced`/`u.Invis`
flats. A worn cloak of displacement sets only
`uprops[DISPLACED].extrinsic`, so C said «points and curses at your
displaced image» while JS said «points at you, then curses» (11 sessions).
Diff: the three sites now call `hero_Displaced()` (monmove.js) and
`hero_Invis()` (timeout.js). Promise = diff.

## Inventory

- `cursetxt` — mcastu.js:909–925; C mcastu.c:62-85.
- `castmu` where-suffix — mcastu.js:999–1013; C castmu :129-305 (the
  `pline_mon` at csym lines 88–98).
- `mcast_summon_mons` appear line — mcastu.js:403–415; C :420-447.

## C ↔ JS fidelity

C youprop.h:202–204: `Displaced (HDisplaced || EDisplaced)` over
`u.uprops[DISPLACED]`; :198 `Invis ((HInvis || EInvis) && !BInvis)`.

```text
Displaced  js/monmove.js:755  sync   (u.HDisplaced || uprops.intrinsic || uprops.extrinsic)
  !! 3 local clones: mhitu.js:239 shk.js:4706 teleport.js:338
Invis      js/timeout.js:1756 sync
  !! 4 local clones: mhitu.js:265 potion.js:774 trap.js:5022 zap.js:747
```

The monmove reader is a superset (it also ORs the `u.HDisplaced` flat).
It equals C whenever the flat is unset, which is the worn-cloak case.

Branch order, each site against C:
- cursetxt: undirected → Invis∧¬perceives∧mux≠u (+ mappear STRANGE /
  uundetected) → Displaced∧mux≠u → "at you". JS order is identical, and
  `canseemon && couldsee` gates it. The `rn2(4)` mumble arm is unchanged.
- castmu: `Invis && !perceives && !u_at(mux)` → «at a spot near you»;
  `Displaced && !u_at` → «at your displaced image»; else «at you». JS is
  the same.
- summon: Invis∧¬perceives∧mux≠u «%s %s a spot near you!» (at/around);
  Displaced∧mux≠u «… your displaced image!» (by/around); else «from
  nowhere!». JS is the same.

No RNG change: these are reads only.

## Hallucinations / overclaim

None. The Named line lists the other phantom readers (invent.js:5962,
timeout.js:1466, eat.js:2030, do_wear.js:1478) and the local
`insects_Displaced` union. These are reader drift, not new shapes.

## Density

Three sites in one C file, all on the same macro, with one `Ledger:`
bullet (cursetxt). castmu and mcast_summon_mons are call-site edits in
functions that were already ported, so they need no ledger bullet of
their own.

## Verification

Re-measure (`--base bdd0d4e9f~1 --no-reach`):

```text
verify cursetxt: 11 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify castmu: 1 PASS, 0 moved past, 2 unchanged, 0 worse
  scen-hallu-Ranger-51450008 s762 (hallucinated monnam — display RNG)
  scen-zapfest-Caveman-51150068 s585 («… casts a spell! You stop searching.»)
verify mcast_summon_mons: 0 blocked (vacuous; the D-log claims none)
```

cursetxt matches the D-log exactly. The two unchanged castmu rows are
different shapes (a hallucinated name; an occupation interrupt after the
cast). D-4074 does not claim them. No FORCE/DIAG/seed strings. Rulecheck
is clean.

## Actionable C-wrongs

None new. Debt: 3 `Displaced` + 4 `Invis` local clones (sym.mjs above)
are clone drift. Work one only when a session reaches it.

Verdict: **ACCEPT**
