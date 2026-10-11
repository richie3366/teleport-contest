# Review 2658 — 6f999f526 — mzapwand restart + mergable opoisoned (D-3794)

Metadata. SHA `6f999f526` (2026-10-10), D-3794, parent
`1972bacc2`. js diff: `js/muse.js` mzapwand restart
(+14/−11) + `se_zap` import name; `js/mkobj.js`
mergable +1 predicate. Works cliffs row-2 look_here
(95343 moved, 95502 PASS). Two probes, two writers,
one row.

## Intent vs deliverable

Promise: (1) 95343@910 — under Hallu C names «a wand»
(dknown stays 0: observe_object skips ALL observing
while hallucinating) while JS pre-set dknown 1 («a
brass wand»); restart mzapwand C-whole. (2) 95502@607
— C's `opoisoned ≡ otrapped` single bit (obj.h:139)
kept a poisoned dart off the plain pile while JS
merged them; compare opoisoned too.

Diff delivers exactly both. Promise and diff match.

## Inventory

Changed JS (2 writers):

- mzapwand — `js/muse.js:2870` (module-local;
  `sym.mjs` says LOCAL CLONE but C is `staticfn`, so
  unexported is correct per the D-3764 precedent).
  C: `muse.c:163–191` (csym range).
- mergable — `js/mkobj.js:3107` (sync export).
  C: `invent.c:4378–4499` (csym range).

## C ↔ JS fidelity

**Both C-exact, branch by branch.** mzapwand: C
`:170–172` impossible guard, `:174–181` !canseemon
(range, `Soundeffect(se_zap,100)`, You_hear near/
distant, unknow_object), `:182–185` self arm,
`:186–188` else (`pline_mon` + `stop_occupation`),
`:190` spe−−. JS mirrors all five in order; the
deleted `if (!Blind) dknown = 1` pre-set is the
D-1849-shaped bug (dropped C's !Hallucination
predicate; redundant with live set_xname_observe →
observe_object). Soundeffect verified a no-op stub
both sides (contest !SND_LIB). mergable: C compares
the one `otrapped` bit; JS splits it into
otrapped+opoisoned fields, so the added `||` arm is
the faithful comparison (same otyp ⇒ same bit
semantics). The rest of mergable read whole in C
order (bknown/Cleric/Blind||Hallu, erosion, corpse/
egg/tin, MAIL_STRUCTURES, known gates all present).
Pre-existing nit, not this SHA: mergable's header
comment still claims an owornmask tail guard the
code no longer has — doc drift, no behavior.

## Hallucinations / overclaim

None. Diff grep: zero hits. The "whole vs C" claims
for both functions check out against the csym
ranges above.

## Density

Cliff-phase §2b: one row, its two probe writers, no
other-file work. Row-1 randomize falsifier re-verified
unfired live.

## Verification

D-log Verify: focused 2/3 → 3/3; look_here 1 PASS +
1 moved; reach 24/24 ×3; gates + cohort + full 44/44
PASS.

Re-measured by this audit (`verify
look_here,mergable,mzapwand --base 6f999f526~1
--reach-all`, re-run on HEAD code):

```text
verify look_here: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Caveman-95343: PASS
  scen-trek-Samurai-95502: PASS
smoke look_here/mergable/mzapwand: 24 PASS, 0 regressed → REACH-OK (each)
```

95343 reads PASS (not "moved") because D-3795 later
in this window carried it to PASS — the monotonic
scoreboard chain (1041 → 1042 here, +95502 only,
0 lost) confirms this SHA moved it and regressed
nothing. mergable/mzapwand vacuous at baseline, as
the D-log says.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
