# Review 1044 — 8598abcf — mhitm_ad_samu three arms (D-2074)

## Metadata

- SHA: `8598abcf` — `uhitm.c mhitm_ad_samu never ported: Wizard AD_SAMU fell into mhitm_adtyping_u default, so JS drew knockback rn2(3) where C drew the rn2(20) steal roll (queue owner mhitm_ad_samu) (D-2074).`
- JS diff: `js/mhitm.js` +36/−1 (`AD_SAMU`, `mhitm_ad_samu`, `mdamagem` case), `js/mhitu.js` +27/−3 (`mhitm_ad_samu_u`, dispatch case, imports), `js/uhitm.js` +9/−2 (`damageum_adtyping` arm, import).
- Docs: D-2074 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1044.

## Intent vs deliverable

Subject promises: all three `mhitm_ad_samu` arms ported (mhitu
hitmsg + rn2(20) steal; uhitm/mhitm damage-zero), with knockback
still burning its rn2(3) in the mhitm path per C order. Diff actually
adds all three arms plus the `mdamagem` dispatch case. Promise ==
diff.

## Inventory

- New: file-local `AD_SAMU = 252` (mhitm.js:270, monattk.h cite) +
  export-list row; sync `mhitm_ad_samu`; `mhitm_ad_samu_u` (mhitu.js);
  uhitm `else if (adtyp === AD_SAMU)` arm (uhitm.js:1369, after DRST —
  no earlier arm matches 252).
- Changed: `mdamagem` AD_SAMU case; two dispatch doc-lists.
- Imports join existing statements (`AD_SAMU` into the `./mhitm.js`
  import in mhitu.js/uhitm.js; `stealamulet` into the `./steal.js`
  import in mhitu.js). No new module edge: steal.js imports neither
  mhitu nor mhitm (import list read directly, lines 20–49). No TDZ.
- No deleted symbols. Diff grep: no `FORCE`/`DIAG`/seed/step reads, no
  `fastforward`, no coordinates.

## C ↔ JS fidelity

C `mhitm_ad_samu` (`uhitm.c:4569–4589`, via `csym.mjs`): uhitm arm
(`:4573–4576`) zeroes damage only; mhitu arm (`:4577–4586`) is
`hitmsg` always + `if (!rn2(20)) stealamulet(magr)`, leftover kept;
mhitm arm (`:4587–4588`) zeroes damage, no message. `AD_SAMU = 252`
confirmed in monattk.h:91.

JS arm-for-arm: uhitm `mhm.damage = 0` (no message, no steal roll —
comment cites the split correctly); mhitu `await hitmsg` + `if
(!rn2(20)) await stealamulet(mtmp)` + `void mhm` (leftover kept —
this is the visible fix: the missing «hits!» plus the rn2(20)-for-
rn2(3) swap); mhitm sync zero. `stealamulet` is `js/steal.js:425`
async — awaited. Callee closure: all LIVE.

`mdamagem` order verified against C `mhitm.c:1060–1072` (read
directly): C runs `mhitm_adtyping` → `mhitm_knockback` (rn2(3)
burns first) → `if (!mhm.damage) return mhm.hitflags`. JS runs the ad
func → `await mhitm_knockback` → `return mhm.hitflags`, with the
HIT/DEF_DIED preempt correctly noted dead (hitflags stays MISS) —
the AD_PHYS zero-damage precedent. Branch/RNG order confirm.

Named: none new — all three arms live. `stealamulet`'s own singleton
omission (D-1945) is pre-existing; neither blocked session draws the
steal (both nonzero), so the steal body rides its existing callers.

## Hallucinations / overclaim

None. «No new cycle» verified by reading steal.js's import list;
«knockback rn2(3) still burns exactly where C burns it» verified
against mhitm.c:1061.

## Density

102 insertions across 3 files for one C function × three arms — one
queue row, one falsifier pair, callee closure complete. Right-sized
(the combined-arm shape §2b expects exactly this).

## Verification

D-log Verify bullet: `verify --fn mhitm_ad_samu` → `1 PASS, 1 moved
past` (91113 PASS; 92103 99→dochug@100) + green + strict + cohort
7/7. Re-measured myself: `hidden-proxy.mjs verify mhitm_ad_samu
--base 8598abcf~1` → `1 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS`, both rows identical. No WORSE, no vacuous check.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
