# Review 2844 — b8862755e — drinksink case-2 losehp drain + MB-amulet extrinsic mirror

## Metadata

- SHA: `b8862755e9cc1e2d4283de1f63ad5ae1427ec448` (D-4000)
- Cliff: `fountain.c` drinksink head @28130c7ea, 2 blocks, two writers
- js/ diff: `js/fountain.js` +11 (drain idiom), `js/do_wear.js` +7/-1
  (MAGICAL_BREATHING mirror arm + import + comment); new
  `scripts/drinksink-drain-mb-extrinsic.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: (1) Ranger-50550065 s606: fatal scalding-sip losehp set
gameover + `_losehp_needs_done` and never drained, so the run
ended before the scalding render was captured — drain via the
peffect_oil/dothrow idiom, then `monstunseesu` on survival in C
order. (2) Tourist-50050066 s576: `confer_oc_oprop` never
mirrored `EMagical_breathing`, so a worn MB amulet left the flat
0, `m_poisongas_ok` failed, and JS printed the enveloped line +
gas damage C skips — add the symmetric mirror arm.

Diff actually: the drain idiom in the case-2 else arm; the
`MAGICAL_BREATHING` else-if arm in `confer_oc_oprop` (+ const
import, Named-comment line). Promise == diff.

## Inventory

- `drinksink` case-2 else arm (`js/fountain.js:376-388`, C
  `fountain.c:594-712` via `csym.mjs`, arm `:611-621`): losehp
  drain + wail + survival fall-through added.
- `confer_oc_oprop` MB arm (`js/do_wear.js:445-452`, house
  helper under C `worn.c` setworn `:72-145`): new else-if arm,
  on/off symmetric, following the six shipped E-flat arms.

## C ↔ JS fidelity

Drinksink arm:
- C `:617-618` (`fountain.c` read): `losehp(rnd(6), "sipping
  boiling water", KILLED_BY); monstunseesu(M_SEEN_FIRE);` ✓ —
  JS calls `losehp(rnd(6), …)` with identical args/order, then
  the deferred-done drain (`finish_losehp_done`, both LIVE async
  per `sym.mjs`: `js/end.js:2015`, `js/hack.js:2007`), returns
  only on real gameover, else falls through to
  `monstunseesu(M_SEEN_FIRE)` — exactly C's noreturn-then-
  continue shape (C continues past `done()` via lifesave /
  wizard Die? decline; JS via the drained flag).
- `finish_maybe_wail` in the non-fatal else ✓ — matches the
  D-3998 ruling (C `hack.c:4290` else-if; wail non-fatal only)
  and the potion/dothrow/dig/eat/dokick/trap caller family the
  D-log cites.
- Sole C caller `potion.c:556` (`--callers` output) is the wired
  `potion.js:2482` sink-yn path (D-log Callers bullet; probe
  path unchanged). No RNG reorder: `rnd(6)` still the first and
  only draw in the arm.

MB mirror arm:
- C `setworn` `:118-125` (read): `p = oc_oprop;
  u.uprops[p].extrinsic |= wp->w_mask` ✓ — JS `confer_oc_oprop`
  already writes `uprops[p].extrinsic` identically (`:419-420`)
  and the new arm extends the flat mirror to
  `MAGICAL_BREATHING`, on/off symmetric, same `| mask` /
  `& ~mask` shape as the BLINDED/FAST/TELEPAT/STEALTH/
  LEVITATION/FREE_ACTION arms. Called from both JS setworn
  sites (`:689` off, `:703` on).
- C `Amulet_on` MB arm (`do_wear.c:978-995` read): mask out
  `EMagical_breathing`, test `region_danger()`, restore
  unconditionally ✓ — JS (`do_wear.js:3147-3156` read) does the
  same test-then-restore on the flat; the `hadMB` guard is now
  provably always-true on this path (confer wrote `W_AMUL` for
  the worn MB amulet at the `:703` site just above via
  `setworn`), hence identical to C's unconditional restore.
  The D-log names the guard rather than deleting it — honest,
  and the equivalence argument checks out.
- Behavioral readers confirmed: `mon.js:308` and
  `region.js:1236` both read `HMagical_breathing ||
  EMagical_breathing` flats — the flat was the missing link,
  and the /tmp prefix probe (flat 0 from the s285 don) measured
  rather than inferred it.

Diff grep clean (no FORCE/DIAG/seed/coordinate reads);
iteration-wide `imports.mjs --rulecheck` clean. No symbol
deleted or re-pointed — no `sym.mjs` paste required.

## Hallucinations / overclaim

None. "Owner verified whole via brief, not re-ported" is
corroborated by the all-cases-live claim holding for the two
probe paths; the commit ships the two writers, not the owner,
and says so. The "6 E-flats" count and the Amulet_off
region_danger note check against the read bodies.

## Density

Cliff commit on its HEAD's head: drinksink owned 2 blocks, both
probe sessions named, both writers ported whole (arm + callee
closure: drain helpers LIVE, confer sites pre-wired). Two
writers in one commit is within the one-cliff rule — one head
row, both sessions moved. Ledger: `drinksink ported` +D-4000,
`setworn ported` +D-4000 (confer is setworn's house helper;
its own entry would be ledger noise). Committed test 2/2 green
(re-run this review).

## Verification

D-log: `verify drinksink: 2 PASS, 0 moved past, 0 unchanged, 0
worse → PROGRESS`; REACH 12/12; green 2/2; strict ×2; cohort
7/7. Re-measure (`verify drinksink --base b8862755e~1
--no-reach`, HEAD code): **2 PASS, 0 moved past, 0 unchanged, 0
worse** — both probes PASS end-to-end, exact match, no vacuous
baseline (2 sessions blocked at the parent baseline).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
