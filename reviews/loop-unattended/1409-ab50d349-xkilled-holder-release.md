# Review 1409 — ab50d349 — xkilled holder-release re-order + stoned gate (D-2450)

Metadata: SHA `ab50d349`, `js/uhitm.js` only (+7/−6, pure move + gate).
Prior review: 1403 item 1 (QUALITY-RISK Must-fix). D-log: D-2450.

## Intent vs deliverable

Promise: the `mtrapped = 0` + `unstuck` pair moves from after the
lifesaved return to right after `game.disintegested = false`, gated on
`!was_stoned`. Diff actually does exactly that — one block deleted,
one block added, plus the stale "before the rn2(6) draw" comment
replaced with the `mon_leaving_level`/`monstone` cite. No signature,
export, or edge change (mhitu dynamic import pre-exists).

## Inventory

- Moved: `mtmp.mtrapped = 0` + `await unstuck(mtmp)` (mhitu live import).
- No new functions, no deleted symbols (`sym.mjs` re-point check n/a —
  `unstuck` stays `js/mhitu.js:1672` ASYNC, still awaited).

## C ↔ JS fidelity

C ordering (`mon.c`): `mondead` at `:3548–3549` runs before the
lifesaved check at `:3552–3561`. `mondead :3175` calls
`m_detach`, which calls `mon_leaving_level :2756`, whose first two
statements are `mon->mtrapped = 0; unstuck(mon);` (`:2702–2703`).
So in C the release happens on **every** dead path **including**
lifesaved (lifesave is decided inside `mondead`/`lifesaved_monster`,
after the release). Old JS ran the pair after the lifesaved `return` —
a lifesaved holder stayed stuck: confirmed C-wrong, now fixed.
Stoned path: C `monstone :3286–3373` contains **no** `unstuck` call
(verified by grep of the full range); its `:3307` `mdef->mtrapped = 0`
is already ported inside JS `monstone` (`js/mhitm.js:2765`, with the
lifesave-first shape of C `:3302–3307`). The `!was_stoned` gate is
therefore exactly right — no double-release, no missing reset.
No RNG in the moved lines (`mtrapped` store + `unstuck` walk of
`u.ustuck`/`uswallow`); the `rn2(6)` treasure draw stays after
`be_sad` in both sides. Branch-by-branch confirm.

## Hallucinations / overclaim

None. Subject promises move + gate; diff is move + gate. D-log admits
0 blocked / vacuous rather than claiming a corpus catch.

## Density

Must-fix single-block repair: right-sized. No second subsystem.

## Verification

- `imports.mjs --rulecheck`: Rule #2 clean (global re-run, this review).
- `hidden-proxy verify xkilled --base ab50d349~1 --reach-all` (re-run):
  0 blocked at baseline and working tree (vacuous, as D-log states);
  reach 125/125 PASS, 0 regressed → REACH-OK. Matches the D-log claim.
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Ordering and gate both match C.

Verdict: **ACCEPT**
