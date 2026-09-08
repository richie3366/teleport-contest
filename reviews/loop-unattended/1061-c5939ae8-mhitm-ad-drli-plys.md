# Review 1061 — c5939ae8 — mhitm_ad_drli + mhitm_ad_plys uhitm arms (D-2091)

Metadata: SHA `c5939ae8`, `js/uhitm.js` + `js/mhitm.js` (one-word
export ×2), queue owner mhitm_knockback (2 sessions). D-log D-2091.

## Intent vs deliverable

Subject promises: port the two missing poly-hero uhitm arms (their
skipped `!rn2(3)` was shifting knockback dice one slot early). Diff
actually adds: `damageum_ad_drli`, `damageum_ad_plys`, two dispatch
wires, `paralyze_monst` + `AD_DRLI` exports on the existing mhitm edge,
`resists_drli` import from `./zap.js`. Promise == deliverable.

## Inventory

New JS: `damageum_ad_drli`, `damageum_ad_plys` (both file-local,
dispatched from `damageum_adtyping`). Re-pointed: `paralyze_monst`
(local → exported; `sym.mjs` → single def `js/mhitm.js:1636 sync`, no
clone); `AD_DRLI` (single declaration `js/mhitm.js:261 = 15`, now
exported; no duplicate in uhitm.js by grep — `sym.mjs AD_DRLI` prints
NOT FOUND, stale index, grep governs). `resists_drli → js/zap.js:3521
sync` LIVE. No deleted symbols.

## C ↔ JS fidelity

`mhitm_ad_drli`, `uhitm.c:2444–2518` (csym). uhitm arm verbatim:

```
if (!rn2(3) && !(resists_drli(mdef) || defended(mdef, AD_DRLI))
    && !mhitm_mgc_atk_negated(magr, mdef, TRUE)) {
    mhm->damage = d(2, 6); ... "becomes weaker!" ...
    mhpmax floor ... mhp -= damage ...
    if (DEADMONSTER(mdef) || !mdef->m_lev) { expires/dies; xkilled NOMSG }
    else mdef->m_lev--; mhm->damage = 0;
```

JS walks the same order with `|0` ints; kill condition
`(mhp|0)<1 || !(m_lev|0)` ≡ `DEADMONSTER || !m_lev`; nonliving
expires/dies + `XKILL_NOMSG` + `m_lev--` + damage zeroed all present.
`defended(mdef, AD_DRLI)` worn-item walk is the one dropped predicate —
explicitly named (carried on every defended site), not a silent clone.
Calorie check on C nuance: hero heals nothing (Stormbringer comment) —
JS heals nothing. Confirm.

`mhitm_ad_plys`, `uhitm.c:3430–3476` (csym). uhitm arm verbatim:
`!rn2(3) && damage < mhp && !mgc_negated(TRUE)` → `!Blind` "frozen by
you!" → `paralyze_monst(mdef, rnd(10))`, leftover damage kept. JS
identical incl. kept damage (`Blind_that()` is the file's hero-blind
helper). Confirm. Combined-arm closure: `resists_drli`,
`mhitm_mgc_atk_negated`, `paralyze_monst`, `xkilled`, `Monnam`,
`nonliving` all LIVE; `defended` OMIT (named). Both arms ship.

## Hallucinations / overclaim

None. "imports.mjs SAFE — same 90-module SCC, hoisted function decl,
call-time use" for the zap edge: `resists_drli` is a sync function
declaration called at hit time — accurate. No dispatch-over-stub.

## Density

One C family (uhitm adtyping arms), one owner, two files — right-sized.

## Verification

- Rule #2 clean (global rulecheck this iteration).
- Ban grep on added lines (`FORCE|DIAG|getRngLog|fastforward|seed-gate|
  coordinate`): 0 hits.
- Re-measured `hidden-proxy.mjs verify mhitm_knockback --base
  c5939ae8~1`: "1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS"
  (Wizard-92076 PASS; Ranger-92090 → ghitm step 238) — matches D-log.
- Green/strict/cohort/full-44/44 recorded (shared-file change ran full).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
