# Review 1417 — 0363023b — make_hallucinated whole-body port (D-2458)

Metadata: SHA `0363023b`, `js/potion.js` only (restart of
`make_hallucinated` + `peffect_sickness` caller re-point + `strange_feeling`
static import). Coverage PARTIAL → all arms live. D-log: D-2458.

## Intent vs deliverable

Promise: port the omitted arms — clear-without-toggle talk
(`strange_feeling` / Your-itch / flatten-normal), `update_inventory`,
`disp.botl`, the extrinsic-only changed gate, uprops extrinsic sync +
Hallucination re-mirror on the mask arm, live `Blind()` verb, and the
`peffect_sickness` C `:1009` caller. Diff ships all of them in C order,
plus a new `hallucResisted` predicate. No second subsystem.

## Inventory

- Restarted: `make_hallucinated` (exported, correct — C is global).
- Re-pointed: `peffect_sickness` inline flag-clear →
  `await make_hallucinated(0, false, 0)` (same-module, not a clone→import).
- Added: `hallucResisted` (module-local C-macro mirror, C-cited).
- New edge: static `strange_feeling` from `detect.js` (was unused by
  potion.js; no local clone added — correct per `sym.mjs`, which shows the
  canonical export at `js/detect.js:233` with the only clone in
  `wield.js:1150`, untouched).
- Converted: dynamic `await import('./display.js')` destructure →
  static `see_objects`/`see_traps`/`swallowed` on the existing display.js
  edge (no new edge).

## C ↔ JS fidelity

C `potion.c:368–438` vs JS, arm by arm:

- Unaware suppress (`:377–378`): `u.Unaware || Unaware()` — matches the
  file's `make_deaf` shape; `Unaware` is the live `eat.js` import
  (`js/potion.js:180`), `u.Unaware` the sticky flat. Exact.
- Verb (`:382`): `!Blind() ? 'looks' : 'feels'` — exact. `Blind()` is the
  pre-existing file-local `js/potion.js:2105` (C-cited D-0716,
  `(H||E)&&!B` — matches `youprop.h:103`). It is one of the 29 pre-existing
  clones `sym.mjs` reports, but this commit reuses rather than adds — no
  new clone.
- Mask arm (`:384–391`): `old`-gated changed, `|= mask` / `&= ~mask` on
  `EHalluc_resistance` plus the `uprops[HALLUC_RES].extrinsic` mirror
  (justified: `youprop.h:118`, E IS the uprops extrinsic slot) +
  Hallucination re-mirror. C needs no mirror (macro); JS stores the flat,
  so the mirror is required, not invented.
- Else arm (`:393–394`): changed gated on extrinsic-only
  `!(u.EHalluc_resistance|0)` — the actual fix (old code used full-resist).
  `set_itimeout` as `(old & ~TIMEOUT) | itimeout(xtime)` — same as before,
  correct.
- Clearing talk (`:398–411`): `!changed && !HHallucination && old && talk`
  gate exact; `!haseyes` → `strange_feeling(null, null)` (C `(0, 0)`);
  Blind arm `Your <eyes> momentarily itch` with `eyecount != 1` plural —
  byte-matches `eyemsg[] "%s momentarily %s."` (`potion.c:258`); else arm
  `Your vision seems to flatten for a moment but is normal now.` —
  byte-matches `vismsg[]` (`potion.c:257`) + `Your()`. All callees
  (`haseyes`, `eyecount`, `body_part`, `makeplural`, `vtense`) are live
  imports (`js/potion.js:120–121,159–160,188`).
- Changed arm (`:416–436`): `!Hallucination` eatmupdate gate kept live with
  the call named in-map (matches the D-log's Named line); `uswallow` →
  `swallowed(0)` else `see_*` BEFORE the pline — order now C-correct and
  static; `update_inventory()` (`:432`, live import `:115`);
  `disp.botl = true` (`:434`) plus the file's `flags.botl` status mirror
  (codebase idiom, harmless); talk pline last (`:436`). Exact.
- Caller (`potion.c:1009`): `peffect_sickness` now awaits the real
  `make_hallucinated(0, FALSE, 0L)` with talk FALSE per C — deletes a real
  inline-flag-clear divergence.
- `hallucResisted` checks intrinsic+extrinsic+H/HH/E flats. C
  `Halluc_resistance` (`youprop.h:119`) is intrinsic||extrinsic; the flats
  mirror uprops elsewhere, so the union is redundant but equivalent — no
  demonstrable divergence.
- No RNG in C; none in JS. Branch order preserved throughout.

## Hallucinations / overclaim

None. "0 blocked at baseline" is stated as a coverage gap, not a corpus
fix; the Named lines carry C citations with the live-gate/deferred-call
split explicit.

## Density

One C function restart + one caller re-point, one module: right-sized.

## Verification

- `hidden-proxy verify make_hallucinated --base 0363023b~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); no RNG-tagged
  reach, fixed smoke 24/24 PASS, 0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/seed/coordinate logic (only the commit message
  contains "No DIAG/FORCE/seed logic").

## Actionable C-wrongs

None. Whole body ports C in order.

Verdict: **ACCEPT**
