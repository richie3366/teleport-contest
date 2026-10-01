# Review 2141 — b230d7c85 — were message continuation

SHA `b230d7c85`, D-3181; 2026-10-01; +28/-55 JS. Closes review 2136.

## Intent vs deliverable

“Await were transformation messages before mutation” restarts new_were and
awaits both summonmu calls; normal_shape itself is unchanged.

## Inventory — new_were

Changed async export. counter_were, monsndx, impossible, canseemon,
Hallucination, Monnam, pmname, Mgender, set_mon_data, healmon, newsym,
mon_break_armor, possibly_unwield, onscary, monnear, monflee are LIVE;
helpless is a verified macro expansion. No added clone/no-op.

## C ↔ JS fidelity — new_were

were.c:95–138: protection → invalid-counter diagnostic → visible message
→ mutation → wake → truncating quarter-heal → redraw → armor → unwield
→ scared-tail rn1(9,2) matches. Seven executable callers from csym await;
potion.c:1844/1852 retain blessed/cursed guards, were.c:18/42 form guards.

## Inventory — summonmu

Changed private async caller; predicates, msummon, new_were, were_summon,
pline_mon/pline/You_feel, name helpers LIVE; inherited msummon omissions mapped.

## C ↔ JS fidelity — summonmu

mhitu.c:955–1030 preserves demon rn2(10/16), human rn2(5−2×night),
beast protection short-circuit/rn2(30), refresh, rn2(10), then seen/unseen
message arms. Await now precedes refreshed data and summon draw.
Caller :733 retains !mcan/!range2/cham guards.

## Inventory — normal_shape

Unchanged closure owner; newcham/new_were/seemimic/finish_meating LIVE.

## C ↔ JS fidelity — normal_shape

mon.c:4430–4462 cham/cancellation → were → mimic/meal order now awaits
the complete transformation. :4653 and zap.c:3199 remain awaited.

## Hallucinations / overclaim

2136’s message gap closes. No stubbed dispatch. Required re-pointed sym output:

```text
monsndx js/mondata.js:152 sync
healmon js/mon.js:2327 sync; ALSO 1 LOCAL CLONE: js/muse.js:1295
pmname js/do_name.js:660 sync
Mgender js/do_name.js:638 sync
Hallucination js/display.js:1108 sync; js/do_name.js:264 sync
!! multiple exports — import the C-locus one; do NOT add another
!! ALSO 8 LOCAL CLONE(S) in 8 files — IMPORT the export; do NOT add another
js/artifact.js:1894 js/dig.js:1605 js/do.js:456 js/mcastu.js:102
js/mon.js:1383 js/music.js:117 …and 2 more
impossible js/display.js:8578 ASYNC — await required
```

Full Rule #2 clean; diff has no trace gates. No cycle-forced claim.

## Density

Ledger: new_were ported — ACCEPT; normal_shape ported — ACCEPT;
summonmu caller repair — ACCEPT. One Must-fix closure. Both ledger
Verify bullets present; green/strict, relevant monster cohort 7/7, full 44/44.

## Verification

Historical `verify normal_shape,new_were,summonmu --base b230d7c85~1 --reach-all`:
normal_shape: 0 blocked (vacuous); smoke 24 PASS/0 regressed, REACH-OK.
summonmu: 0 blocked (vacuous); reach 19 PASS/0 regressed, REACH-OK. new_were: 0 PASS/1 moved/0 unchanged/0 worse, PROGRESS;
smoke 24 PASS/0 regressed, REACH-OK. Monk-94153 moves 52→57.
Suspension tests 2/2 pass.

## Actionable C-wrongs

None found.

Verdict: **ACCEPT**
