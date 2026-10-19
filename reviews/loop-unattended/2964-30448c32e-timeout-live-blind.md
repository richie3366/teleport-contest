# Review 2964 — 30448c32e — timeout.js drops its Blind() clone for invent.js Blind

- SHA: `30448c32e` (Must-fix from Review 2960; reach-only, no blocked row)
- D-entry: D-4124; Ledger: nh_timeout, slip_or_trip, slime_dialogue,
  burn_object ported
- `js/` diff: `js/timeout.js` +3/−9

## Intent vs deliverable

Promise: timeout.c tests the youprop.h `Blind` macro at six sites, and
timeout.js used a file-local clone that read the stale `u.Blind` mirror,
the phantom `u.HBlind`/`u.EBlind`, and no `!BBlinded`. Diff: the clone is
deleted and `Blind` is imported from invent.js. slip_or_trip's
`!u.Blind` and its first `u.Hallucination` become `Blind()` and
`Hallucination()`. Promise = diff, for Blind.

## Inventory

- Deleted `Blind` — timeout.js (was :1728). `sym.mjs`-style check:
  `grep -n "function Blind" js/timeout.js` → none. The import is at :54.
- Blind call sites now on the live export: slime_dialogue :737 (C
  :~470), nh_timeout haze :1071 (C :658), INVIS expiry :1347 (C :761),
  slip_or_trip :203 (C :1243), burn_object canseeit :2100 (C :1428), candle
  flames :2309 (C :1629). That is all six C `Blind` sites in timeout.c
  outside the BLINDED-expiry arm.
- BLINDED-expiry arm `was_blind` — timeout.js:1167–1176; C :744–749.

## C ↔ JS fidelity

invent.js:372 `Blind()` is `(HBlinded || EBlinded) && !BBlinded`, the
macro at youprop.h:103 (plus a roleplay arm that agrees, Review 2959).
Every C `Blind` test in timeout.c now reaches it. The BLINDED-expiry arm
keeps an inline expression `((HBlinded || EBlinded) && !BBlinded) ||
roleplay`. That is the same macro, evaluated before and after
`set_itimeout(&HBlinded, 1)` / `make_blinded(0, TRUE)` as in C :744–748.

`slip_or_trip` (C :1221–1341) is ledgered `ported` and is only half
converted. The first `Hallucination` (C :1242) is now live, but the same
function still reads the `u.Hallucination` mirror at timeout.js:211
(Egads arm, C :1249), :267 (own elbow, C :1306) and :272 (banana peel, C
:1309). display.js:1367 `Hallucination()` is already imported here, and
its own comment says the sticky mirror "is not sufficient (D-1493)". The
mirror is recomputed only by timeout/make_hallucinated writers, so a
change in Halluc_resistance (Grayswandir wielded mid-hallucination) leaves
it stale. The petrifying-corpse test reads `u.Stone_resistance ||
u.HStone_resistance || u.EStone_resistance` flats. C's :65 macro is
`uprops[STONE_RES].intrinsic || .extrinsic`, and there is no canonical
export (`sym.mjs Stone_resistance`: one clone, in mhitu.js). Neither arm
draws RNG differently.

## Hallucinations / overclaim

"Named omissions: none in these functions" is not quite true for
slip_or_trip, which keeps three mirror reads. No corpus row reaches them
(0 blocked; `sweep slip_or_trip` 0 regressed). As in Review 2951, that is
debt and the ledger row goes partial. It is not a Must-fix.

## Density

The Must-fix, done as asked: one file, the clone deleted.

## Verification

```text
verify nh_timeout,slime_dialogue,slip_or_trip,burn_object (--base 30448c32e~1):
  0 blocked each (reach-only fix; the D-log says so)
```

The D-log's `sweep` (656 baseline-PASS, 0 regressed) is the reach claim.
This audit's full rescore covers it again.

## Actionable C-wrongs

1. (debt, unreached) slip_or_trip :211/:267/:272 `u.Hallucination` →
   `Hallucination()`, and the Stone_resistance flats → uprops. The ledger
   is set to partial.

Verdict: **ACCEPT-WITH-DEBT**
