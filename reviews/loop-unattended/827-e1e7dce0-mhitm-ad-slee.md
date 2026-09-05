# Review 827 — e1e7dce0 — uhitm.c mhitm_ad_slee sleep attack (D-1857)

Metadata: SHA `e1e7dce0`, D-1857, files `js/mhitm.js` (+122), `js/mhitu.js` (+38),
`js/uhitm.js` (+8/−2). Next index 827, no Must-fix open.

## Intent vs deliverable

Subject promises the `mhitm_ad_slee` sleep attack in three arms (uhitm / mhitu /
mhitm) with C branch/RNG order. Diff actually adds: `AD_SLEE`/`MR_SLEEP` consts,
`Blind_slee`, `resists_sleep_slee`, `sleep_slee_mm`, `slept_slee_mm`,
exported `mhitm_ad_slee` (uhitm + mhitm arms), `mdamagem` AD_SLEE case,
`mhitm_ad_slee_u` + `mhitm_adtyping_u` case, `damageum_adtyping` arm. Matches
the promise; no scope creep.

## Inventory

New/changed JS functions: `Blind_slee`, `resists_sleep_slee`, `sleep_slee_mm`,
`slept_slee_mm`, `mhitm_ad_slee`, `mhitm_ad_slee_u` (+3 wiring sites).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/uhitm.c:3478–3522` (`csym mhitm_ad_slee`).
Branch-by-branch confirm:

- uhitm arm (C `:3484–3491`): `!msleeping && !mgc_negated(FALSE) && sleep_monst(rnd(10),-1)`,
  then `!Blind` pline + `slept_monst`. JS identical order, short-circuit `&&`
  preserving the `rn2(10)`-then-`rnd(10)` burn order.
- mhitu arm (C `:3492–3507`): unconditional `hitmsg`, then `multi>=0 && !rn2(5) &&
  !mgc_negated(TRUE)`, `Sleep_resistance ? monstseesu : monstunseesu +
  fall_asleep(-rnd(10),TRUE)` + Blind-dependent You pline. JS `mhitm_ad_slee_u`
  matches call-for-call, including hitmsg-before-gate (the missing «bites!»
  topline cause). `fall_asleep`/`monstseesu`/`hitmsg` all LIVE imports (`sym.mjs`).
- mhitm arm (C `:3508–3520`): double `sleep_monst(rnd(10),-1)` — JS evaluates
  both `rnd(10)` args in order even though the second always fails post-freeze,
  then `vis&&canspotmon` pline + `STRAT_WAITFORU` clear + slept. Confirmed.
- `mdamagem` AD_SLEE case: C `mhitm.c:1059` routes shared `mhitm_adtyping`
  (→ mhitm arm), then knockback, then leftover `d()` damage (`mhitm.c:1016–1115`
  read). JS slee-before-knockback with leftover kept is correct; `!!mwep` matches
  all 9 sibling arms' convention (C `MON_WEP(magr)!=0` is a pre-existing gap,
  not this commit's).
- `helpless` macro (`monst.h:251` `msleeping || !mcanmove`) ported exactly;
  `MR_SLEEP 0x04` matches `monflag.h:64`. `how=-1` correctly skips the
  seemimic/`resist(how)` legs of `sleep_monst` (`mhitm.c:1222–1246` read).

Clones: `sleep_slee_mm`/`slept_slee_mm` are file-local inlines (unexported,
`sym.mjs` confirms no clone #2). `defended(AD_SLEE)` + `shieldeff` + `sticks()`
are named omits in D-log and map. No STUB in any live arm. `rulecheck` clean;
no FORCE/DIAG/seed/coordinate reads in the diff.

## Hallucinations / overclaim

None. "Match C" claim covers dispatch + callee; all callees LIVE or named.

## Density

~168 JS insertions: one C function, three arms, three modules that already call
each other. Right-sized per §2b.

## Verification

D-log Verify: `verify.mjs --fn mhitm_ad_slee` → PASS (hidden 1 moved past,
green 2/2, strict, cohort 7/7). Re-ran `hidden-proxy.mjs verify mhitm_ad_slee
--base e1e7dce0~1` myself: `0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS (tour-Caveman-70016-d5-8-15-17-22: moved → mkswamp at step 42, was
16)`. Claim true, no regression.

## Actionable C-wrongs

1. `sleep_slee_mm` uses `mon.meating = 0` where C `finish_meating`
   (`dogmove.c:1447–1457`) also resets `m_ap_type`/`mappearance` + `newsym` for
   a disguised non-mimic that was eating. Vanishingly narrow (disguised + eating
   + slept same turn); record as map debt, not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
