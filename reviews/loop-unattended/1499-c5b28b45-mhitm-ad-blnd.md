# Review 1499 — c5b28b45 — uhitm.c mhitm_ad_blnd (D-2540)

## Metadata

- SHA: `c5b28b45`
- D-id: D-2540. Next index: 1499.
- Files: `js/mhitm.js` (uhitm arm + export), `js/uhitm.js`
  (AD_BLND dispatch row).
- C locus: `nethack-c/upstream/src/uhitm.c:2957–3012`
  (`mhitm_ad_blnd`, 56 L).

## Intent vs deliverable

Subject promises: whole `mhitm_ad_blnd` in C order (THIN → live),
uhitm arm ported, both C callers wired. Diff actually adds: the
`:2964–2975` uhitm arm, the `export`, the `can_blnd` import
extension, and the uhitm.js AD_BLND row. Promise matches
deliverable. RNG 1 via the mhitm-arm `d()` (pre-existing, kept);
no new RNG.

## Inventory

- Changed: `mhitm_ad_blnd` file-local → exported async
  (`js/mhitm.js:832` — `sym.mjs` single hit, async).
- Changed: uhitm.js import line (+`mhitm_ad_blnd` on the existing
  uhitm.js→mhitm.js edge) + `damageum_adtyping` AD_BLND row.
- No deleted or re-pointed symbols → no clone→import audit needed.

## C ↔ JS fidelity

C body `:2957–3012` vs JS, arm by arm:

- uhitm (`:2964–2975`, new): `can_blnd(magr, mdef,
  mattk.aatyp|0, null)` ≡ C `can_blnd(…, (struct obj *)0)`;
  `!Blind_slee() && mcansee` pline `"%s is blinded."`;
  `mcansee=0`; `damage += mblinded` clamped 127 back into
  `mblinded`; `damage=0` unconditional. Branch order exact.
  `Blind_slee()` (mhitm.js:1189) ≡ youprop.h Blind
  (`(H||E)&&!B`) plus roleplay/ublind guards — the same gate the
  slee arm uses, not a fresh clone. Confirm.
- mhitu (`:2976–2985`): early-returns to the split
  `mhitm_ad_blnd_u` (mhitu.js:746, D-0926), which is itself
  routed from the hitmu AD_BLND dispatch (mhitu.js:3155) with
  the can_blnd gate + make_blinded + damage=0 + Your1 named.
  The `is_youmonst(mdef)` early return drops nothing on a live
  path: mon→you traffic reaches `_u` via hitmu, never via this
  function. Confirm.
- mhitm (`:2986–3011`, kept verbatim): vis/mcansee/canspotmon
  pline with the Archon `canseemon` radiance extra, fresh
  `d(damn,damd)+mblinded` clamp 127, `mcansee=0`,
  `~STRAT_WAITFORU`, `if (mhm) damage=0` null guard. Confirm.

Callee closure: uhitm arm uses live `can_blnd` (uhitm.js:316,
sync); the mhitm arm keeps the pre-existing file-local
`can_blnd_mm` light-attack gate (out of this SHA's scope —
kept, not added). Named omits (mhitu Your1/vision_clears,
can_blnd body gaps, `gv.vis`→`_mm_vis` convention) each carry
locus/reason. No STUB in any live arm.

Callers: C `:4802` (mhitm_adtyping) wired twice —
mhitm.js:3954 (mon→mon dispatch) and uhitm.js:2360 (damageum,
magr=youmonst, mhm non-null on that path); C mhitm.c:792
(hitm, null mhm) wired at mhitm.js:5084 with the null guard
holding. Both C callers wired. Confirm.

## Hallucinations / overclaim

None. "Dispatch ported, callee live" holds in both directions —
no stubbed callee behind a "Match C" claim.

## Density

One 56-line C function + one dispatch row, two files already
linked. Right-sized per §2b.

## Verification

- D-log: syntax (2 changed) · rule2 · hidden note (0 blocked) ·
  smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full skipped
  → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify mhitm_ad_blnd --base
  c5b28b45~1 --reach-all` → 0 blocked both trees (vacuous note,
  honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK.
  Matches.
- `imports.mjs --rulecheck`: clean. Diff grep: no FORCE/DIAG/
  getRngLog/fastforward/seed/coordinate logic.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
