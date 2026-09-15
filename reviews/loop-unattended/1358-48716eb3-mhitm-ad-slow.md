# Review 1358 — 48716eb3 — mhitm_ad_slow both arms (D-2392)

- SHA: `48716eb3`, D-2392. JS files: `js/mhitm.js` (+52),
  `js/uhitm.js` (+37), one doc line in `js/mhitu.js`. No test file
  (slow-branch needs monster-vs-monster game state; sessions are the
  suite — same rationale as neighboring arms).
- Prior reviews closed: none (Open queue row `mhitm_ad_slow`; 0 blocks).

## Intent vs deliverable

Subject promises the two slow branches (mon→mon, hero→mon) behind the
D-2043 mhitu arm, including the previously-skipped `rn2(10)` gate. Diff
delivers both arms plus both dispatch rows, nothing else. Matches.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `mhitm_ad_slow` (mhitm.js:1088) | new, exported async | LIVE (C is extern, `extern.h:3419` — export correct) |
| `damageum_ad_slow` (uhitm.js:1590) | new, file-local async | LIVE (matches the `damageum_ad_*` family pattern) |
| `mdamagem` AD_SLOW block | new dispatch, C `mhitm.c:1061–1071` tail | LIVE |
| `damageum_adtyping` AD_SLOW row | new dispatch, after AD_PLYS | LIVE |
| `mon_adjust_speed` (muse.js:2757) | C callee, existing edges extended | LIVE, async awaited |
| `MSLOW` (const.js:1576) | const, existing edges | LIVE |
| `AD_SLOW = 13` file-local ×2 | `monattk.h:55` confirms 13 | LIVE |

Required checks: `sym.mjs mhitm_ad_slow → js/mhitm.js:1088 ASYNC`;
`damageum_ad_slow → 1 local` (family convention, not drift);
`mon_adjust_speed → js/muse.js:2757 ASYNC`; `MSLOW → const.js:1576`;
`--can js/mhitm.js js/muse.js` and `--can js/uhitm.js js/muse.js` →
ALREADY both (pre-existing cycle, hoisted declarations, call-time use
only). Nothing deleted.

## C ↔ JS fidelity

C loci opened with bodies: `mhitm_ad_slow` (`uhitm.c:3651–3687`, 37
lines, csym range), `mhitm_mgc_atk_negated` (`:74–99`),
`mhitm_adtyping` dispatch (`:4782`, `case AD_SLOW :4819`), `mhitm.c`
tail (`:1059–1071`), `damageum` tail (`:4854–4859`).

- C is one function with three arms; JS ports the two missing ones
  against the live `mhitm_ad_slow_u` (verified in tree: hitmsg +
  `HFast && !rn2(4)` + `u_slow_down`, matching the mhitu arm). All
  three arms now live, each at its own dispatcher — the established JS
  split for the shared `mhitm_adtyping` (called from `mhitm.c:1059`,
  `mhitu.c:1191`, `damageum :4854`).
- Uhitm arm (`damageum_ad_slow`): gate → adjust → plain `pline` on
  change when `canseemon`, no WAITFORU. Correct — C `damageum :4859`
  clears WAITFORU in its tail for every arm (verified), so the arm must
  not.
- Mhitm arm (`mhitm_ad_slow`): gate → `|0` mspeed/MSLOW guard →
  oldspeed snapshot → adjust → WAITFORU clear → `pline_mon` when
  changed + `_mm_vis && canspotmon`. `_mm_vis` is the file's
  established vis mirror (same idiom at `:726`). ✓
- `mdamagem` block mirrors the accepted AD_PLYS shape: the arm never
  sets done and never zeroes leftover (`void mhm`, matching C's
  `UNUSED`), so it falls to the shared knockback + HP tail exactly as
  C `:1061–1071` runs knockback unconditionally after adtyping. ✓
- RNG: the `mhitm_mgc_atk_negated(FALSE)` gate always burns `rn2(10)`
  (`:88`, unless magr-cancelled) and now runs on both paths — the
  claimed D-2043-class fix is real; pre-change JS drew nothing.
- Sole delta is `defended(mdef, AD_SLOW)` (`:3659–3660`): RNG-free
  (wielded-artifact / blue-scales), named identically in all three arm
  docstrings with the D-2043 family — OMIT, not Must-fix.
- Callee closure: all LIVE or OMIT; no STUB in a live arm.

## Hallucinations / overclaim

None. D-log discloses the comment-only follow-up edit (`:4855`→`:4859`)
with a `node --check` re-run and no behavior touched.

## Density

One C function, two arms — right-sized §2b.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed` → clean.
- Re-measured: `verify mhitm_ad_slow --base 48716eb3~1` →
  `0 session(s) blocked (0 at baseline, 0 working)`. Matches D-log.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
