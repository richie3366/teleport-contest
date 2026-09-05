# Review 834 — 8ab2608f — uhitm.c mhitm_ad_phys mhitu weapon arm (D-1864)

Metadata: SHA `8ab2608f`, D-1864, `js/mhitu.js` (+63/−9, arm + imports/consts),
`js/mhitm.js` (+2/−2 doc), `js/sit.js` + `js/uhitm.js` (export keywords).
Must-fix was empty; this review prepends one.

## Intent vs deliverable

Subject promises the mhitu AT_WEAP arm in C order (corpse/GOP/artifact/silver/
soak/split/rustm/poison + ustuck disjunct). Diff delivers all listed elements.
Matches, with one wrong argument inside (item 1).

## Inventory

Changed: `mhitm_ad_phys_u` (rewritten weapon arm); newly imported LIVE callees:
`artifact_hit` (sync ✓, called sync), `permapoisoned` (sync), `rustm` (async,
awaited ✓), `cloneu` (async, awaited ✓), `Hate_silver` (body matches C macro),
`mons`, `Mgender`, `W_ARMG`, `NEUTRAL`, `SILVER`. Export-only: `cloneu`,
`Hate_silver`. No deleted symbols.

## C ↔ JS fidelity

C locus `uhitm.c:4021–4126` (read whole mhitu branch via csym; full function
`uhitm.c:3980–4200`). Arm-by-arm confirm: hug pre-arm untouched; `was_poisoned`
read before corpse ✓; corpse sets damage=1 + corpse pline + guarded
`do_stone_u` ✓ (guard duplicates the clone's own check — harmless); GOP
`rn1(4,3)` + min-1 ✓; artifact_hit-or-hitmsg with dmgBox + `mhitu_dieroll` ✓;
damage-0 return ✓; silver sear + `exercise(A_CON)` ✓; soak `rnd(−uac)`/min-1/
`maybe_half_phys` (≡`(tmp+1)/2` ✓); pudding split (mh−tmp>1, IRON=11/METAL=12
per `objclass.h:24–25` ✓, botl flags, damage=0, `cloneu`) ✓; `rustm` ✓;
`poisoned()` on `dieroll<=5` ✓; non-weapon `|| mtmp !== u.ustuck` disjunct ✓.
`--can`: `mhitu.js` already statically imports `sit.js` (no new edge), and
`mhitu` loads clean in Node (re-checked). No STUB in the arm; knockback
stub-burns named in map. No FORCE/DIAG/seed hits.

C-wrong (live arm): `mhm.damage += dmgval(otmp, null)`. C `weapon.c:215`
unconditionally dereferences `mon->data`, and this call site passes `mdef`
(`&youmonst`). JS `bigmonst(undefined)` is `false` (measured), so a
polymorphed-big hero (dragon/giant) takes small-dice `wsdam` instead of
`wldam`, and bonus-draw counts diverge too (e.g. battle-axe `d(2,4)` vs
`rnd(4)`). Every sibling passes a real defender (`mhitm.js:1176`
`dmgval(mwep, mdef)`; `uhitm.js:874`); the `null` (pre-existing, kept through
this rewrite) is the anomaly. One-word fix — Must-fix item 1.

Debt (not Must-fix): file-local `do_stone_u` clone (`mhitu.js:1804`,
pre-existing, shared with the ston arm) drops C's killer attribution
(`make_stoned(5,0,kformat,kname)`, `uhitm.c:3923–3942`) — eventual stoning
death message diverges. Needs `make_stoned` plumbing; map debt.

## Hallucinations / overclaim

"Port the arm in C order" holds for 12/13 elements; the `dmgval` step keeps a
wrong defender argument. Said explicitly above, not waved through.

## Density

One arm, ~65 lines, four already-coupled modules. Right-sized.

## Verification

D-log: syntax, rule2, hidden 2 PASS, green, strict ×2, cohort 7/7, forced full
44/44 (shared-file heuristic had skipped it — good catch by the porter).
Re-ran `hidden-proxy.mjs verify mhitm_ad_phys --base 8ab2608f~1` myself:
`2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (5f79bc6a, c87ff7c9).
Claim true. (The corpus pair does not cover polymorphed-big defenders, which is
why item 1 survived verification.)

## Actionable C-wrongs

1. **`mhitm_ad_phys_u`: pass the hero to `dmgval`.** Change
   `dmgval(otmp, null)` → `dmgval(otmp, game.youmonst)` (`js/mhitu.js:717`),
   matching C `dmgval(otmp, mdef)` with `mdef == &youmonst`. Falsifier: polymorph
   hero into a big monster, take a monster battle-axe hit — C rolls large dice,
   JS rolls small. Re-run `hidden-proxy.mjs verify mhitm_ad_phys --base
   8ab2608f~1` (must stay 2 PASS) + green gate.
2. (Debt, map only) `do_stone_u` clone: add killer attribution via
   `make_stoned` args.

Verdict: **QUALITY-RISK**

**Addressed:** D-1865
