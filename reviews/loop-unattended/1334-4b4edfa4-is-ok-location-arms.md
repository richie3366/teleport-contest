# Review 1334 — 4b4edfa4 — is_ok_location waterlevel/pool/lava arms (D-2368)

Metadata: SHA `4b4edfa4`, `js/mklev.js` only (local clone rework, ~10
lines + docstring). `is_pool`/`is_lava` join the existing `./hack.js`
import; `Is_waterlevel` already imported (`mklev.js:79`,
`const.js:3212`). D-log: D-2368, map-named row, 0 blocked. Full 44/44
auto-run (shared file) quoted.

## Intent vs deliverable

Subject promises three latent C-wrongs in the otherwise-live local
`is_ok_location` clone (`js/mklev.js:18515`): missing `Is_waterlevel`
accept-any head, WET missing the drawbridge-DB_MOAT arm, HOT missing
the drawbridge-DB_LAVA arm. Diff adds the head, restores the C TODO
comment, reshapes the boulder boolean to C text, and routes WET/HOT
through `is_pool`/`is_lava`. Matches the promise.

## Inventory

- `is_ok_location` — clone rework (one function). No new helpers.

## C ↔ JS fidelity

Vs C `sp_lev.c:1280–1308` (body re-read above): `Is_waterlevel`
accept-any head → ANY_LOC → SOLID+OBSTRUCTED → DRY|SPACELOC+SPACE_POS
with `(bould && (humidity & SOLID))` → WET+is_pool → HOT+is_lava →
FALSE. Now line-for-line in C order/conjuncts, including the restored
diggable/passwall TODO. The old boulder shape (`!bould || (humidity &
SOLID)`) was already equivalent; the new shape is textual fidelity.
Confirm.

Callee classification: `is_pool` (`hack.js:1411`, POOL/MOAT/WATER +
is_moat incl. Juiblex nuance, D-1090) and `is_lava` (`:1428`,
LAVAPOOL/LAVAWALL + DRAWBRIDGE_UP/DB_LAVA, D-1077) are LIVE sync
imports, both RNG-free pure typ checks — no draw moves on levels
without drawbridges. `Is_waterlevel(uz)` handles undefined via `??`
fallback; C callers guarantee in-bounds while the JS `isok` guard plus
the callees' own `isok` gates make it dead-safe (disclosed). The
`is_ok_location_func` global stays emulated via `ok_fn` params (sole C
setter `l_create_stairway`, disclosed named). No stub in a live arm.
Confirm.

## Hallucinations / overclaim

None. The "ALREADY on both" import claim verified: `Is_waterlevel` at
`mklev.js:79` pre-dates this diff; only `is_pool`/`is_lava` names were
added to the existing `./hack.js` import line.

## Density

~10 lines, one clone function — minimal and exactly the C locus.
Acceptable.

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify is_ok_location --base 4b4edfa4~1` → `0 blocked
  (0 at baseline, 0 working)` — vacuous as disclosed; row cited 0
  blocks. Confirm.
- Green/strict/cohort (+full 44/44) per D-log `verify.mjs --fn
  is_ok_location` → VERIFY: PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
