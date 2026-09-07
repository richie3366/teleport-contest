# Review 1003 — 7d22c4f3 — mhitm_ad_famn Famine mhitu+mhitm arms (D-2033)

Metadata: SHA `7d22c4f3`, D-2033, Open-row port
(Famine reach-out writer behind an exercise-attributed
row; RNG past the arm, screen --More-- residual). js/
touches `js/mhitm.js` (+54/−) and `js/mhitu.js`
(+26/−). No stamp owed.

## Intent vs deliverable

Subject promises: `mhitm_ad_famn_u` (mhitu arm, no
hitmsg, pline_mon + exercise + conditional
morehungry, leftover d() kept) + AD_FAMN dispatch in
mhitm_adtyping_u; `mhitm_ad_famn` (mhitm arm,
non-eater zero) + mdamagem AD_FAMN epilogue. Diff
actually adds: exactly that + AD_FAMN consts,
carnivorous/herbivorous/metallivorous import names,
morehungry/is_fainted edge. Promise == diff. Two new
functions; no deletes / re-points.

## Inventory

- New JS: `mhitm_ad_famn` (static, mhitm.js),
  `mhitm_ad_famn_u` (static, mhitu.js). Changed:
  mdamagem dispatch block, mhitm_adtyping_u case.
- `sym.mjs`: `mhitm_knockback js/mhitm.js:2012
  ASYNC` (awaited ✓; the epilogue is the file-standard
  shape — 9 identical sibling call sites, not
  invented); `morehungry js/eat.js:780 ASYNC`
  (awaited ✓); `is_fainted js/eat.js:447 sync` ✓;
  diet predicates extend the pre-existing import
  (line 104). No STUB / clone / no-op. Named: none —
  dead uhitm arm documented in both callee docs.

## C ↔ JS fidelity

Against `uhitm.c:3776–3805`, arm-by-arm confirm:

- mhitu (`:3784–3792`): pline_mon reach-out verbatim
  («%s reaches out, and your body shrivels.»);
  `exercise(A_CON, FALSE)` ✓; `if (!is_fainted())
  morehungry(rn1(40,40))` — rn1 evaluated only when
  not fainted, C short-circuit kept; "plus the normal
  damage" honored (mhm untouched, dispatch case does
  not zero unlike `default:`). No hitmsg — C goes
  straight to pline_mon ✓.
- mhitm (`:3797–3804` via `mhitm_famn` label):
  `!(carnivorous||herbivorous||metallivorous)` →
  damage=0, else leftover stays ✓. No message ✓.
- uhitm (`:3780–3783`): dead per C comment ("hero
  can't polymorph into anything with this attack"),
  documented not ported ✓ — correct treatment.
- RNG: exercise rn2(2) + FAMN rn1(40,40) in C order;
  nothing else draws in this envelope.

## Hallucinations / overclaim

None. The D-log reports NO MOVEMENT honestly (not a
PASS), explains the re-attribution mechanism, and
discloses the residual as display timing it refuses
to fake (rule 4 — correct refusal).

## Density

~80 insertions on a 30-line C function + two
dispatch sites — one locus family (Famine), one
falsifier. Right-sized.

## Verification

- `imports.mjs --rulecheck`: clean. Diff grep: no
  FORCE/DIAG/getRngLog/fastforward/coords.
- Re-measured `hidden-proxy verify mhitm_ad_famn
  --base 7d22c4f3~1`: `0 PASS, 0 moved past,
  1 unchanged, 0 worse → NO MOVEMENT` — matches the
  D-log line-for-line (0 at baseline = vacuous
  pre-port since the row attributes to exercise;
  post-port rescore pins Tourist-92067 here on the
  screen residual: toplines byte-exact *sans
  --More--*). Not a false PASS; the D-log never
  claims one. Forward evidence is the disclosed
  rng-diff 5380→5386 (arm draws now match; first
  mismatch strictly later in mhitm_ad_stun) with
  0 worse.
- Green + strict ×2, cohort 7/7 per D-log.
- Note (not a wrong): the D-log's "queue material"
  pointer (mhitm_ad_stun mhitu arm, uhitm.c:4406)
  was not enqueued as an Open row this commit; the
  next port iter should take it from the queue
  refill, not from this sentence.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
