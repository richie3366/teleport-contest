# Review 1329 — d26385df — sleep_monst trap-path defended/shieldeff (D-2363)

Metadata: SHA `d26385df`, `js/trap.js` only (+11/−9). No new modules or
edges (`defended` already imported from `./mondata.js`, `shieldeff` from
`./display.js`, both already used in-file). D-log: D-2363, map-named
row, 0 blocked.

## Intent vs deliverable

Subject promises two latent C-wrongs in the otherwise-live file-local
`trap.js` `sleep_monst` clone: defended-vs-sleep monsters wrongly slept
(missing `defended(mon, AD_SLEE)` conjunct), and no `shieldeff` flash on
genuine resistance. Diff adds the conjunct + `await shieldeff`, makes
the clone async, and awaits both call sites. Matches the promise.

## Inventory

- `sleep_monst(mon, amt, how)` — clone rework (one function, file-local,
  not exported). No new helpers.

## C ↔ JS fidelity

Vs C `mhitm.c:1222–1246` (body re-read above): C checks
`resists_sleep(mon) || defended(mon, AD_SLEE) || (how>=0 &&
resist(...))` → `shieldeff` + return 0. Both D-0256 callers pass
`how=-1` (verified in-diff at `:1894` steed arm and `:4768` gas arm),
so the third disjunct is dead on this path and the ported
`resists_sleep || defended → shieldeff + return 0` is exact for every
reachable call. The how>=0 `seemimic`/`resist` arms stay named omits
with the music path live (D-2357); `finish_meating` thinness
pre-existing. Clone verified against C here, not diverged. Confirm.

Async safety: the clone is file-local (never exported), and the only
two code call sites (`:1894`, `:4768`) both `await` it; `zap.js:1840`
is a comment. `defended` is sync (`mondata.js:135`), `shieldeff`
awaited as elsewhere in-file. RNG-free (`defended`) + display-only
(`shieldeff`), so no draw moves. Confirm.

## Hallucinations / overclaim

None. D-log discloses the missing standalone probe and why (full level
state needed; both callees already live in-file with identical C-order
use). No "Match C" overclaim beyond the verified path.

## Density

11 insertions, one clone conjunct — minimal but the C locus is exactly
that small; acceptable (right-sized, not padding).

## Verification

- Added-line banned grep: clean.
- `sym.mjs defended` → `js/mondata.js:135 sync` (LIVE import, no new
  clone). No deleted/re-pointed symbols in this diff, so no further
  sym output owed.
- Re-measured: `verify sleep_monst --base d26385df~1` → `0 blocked (0
  at baseline, 0 working)` — vacuous as disclosed; row cited 0 blocks.
  Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn sleep_monst` →
  VERIFY: PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
