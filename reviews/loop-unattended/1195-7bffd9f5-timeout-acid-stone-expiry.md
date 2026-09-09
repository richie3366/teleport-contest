# Review 1195 — 7bffd9f5 — nh_timeout ACID_RES/STONE_RES expiry arms (D-2229)

Metadata: SHA `7bffd9f5`, `js/eat.js` +22, `js/timeout.js` +37/−2.
Queue row: Open `timeout.c` nh_timeout, 1 blocked (scen-wish-Rogue-91119
step 108: C «You no longer feel secure from petrification.» vs JS «»,
blockedRng 0, RNG 6704/6704 matched).

## Intent vs deliverable

Subject promises: meal-extension + expiry messages for the two arms. Diff
actually adds: `eating_dangerous_corpse(res)` in eat.js, TIMEOUT_FLAT
mirror entries, both expiry arms in the generic loop. Matches the promise.
Named defers (wielding_corpse pair, FIRE_RES/WWALKING messages) stay named.

## Inventory

- `eating_dangerous_corpse` (new export, eat.js:1680): must live there —
  gates on module-local `eatfood` identity (same constraint as D-2223
  `cant_finish_meal`).
- ACID_RES / STONE_RES arms in `nh_timeout` generic loop.
- Imports: `set_itimeout` (potion.js:531, live), `Unaware` (eat.js:497,
  live canonical — 8 local clones elsewhere NOT touched, correct),
  `eating_dangerous_corpse` (same-file, no edge). `carried` live;
  `obj_here` is eat.js's own pre-existing local (same module, no new clone).

## C ↔ JS fidelity

`eating_dangerous_corpse`, `eat.c:472–493`: branch/short-circuit order
exact (occupation → piece → CORPSE → LOW_PM → carried/obj_here →
res-specific `acidic`/`flesh_petrifies`, Medusa comment preserved).
ACID_RES arm vs `timeout.c:813–825`: `!Acid_resistance` via the house
triple idiom (youprop.h:61 `H || E`, consistent with the gain site at
eat.js:1646) → extension (`set_itimeout` slot + flat `(... & ~TIMEOUT) |
1`, coherent with `itimeout()` clamping and the flat-countdown scheme;
repeats till meal ends) else Unaware-gated message. STONE_RES arm vs
`:826–843`: same shape, verbatim message. No RNG in either arm.
Named (not stubbed): the STONE_RES `wielding_corpse(uwep/uswapwep)`
pair, cited with C lines in D-log + map — a named omit in this commit,
not a live-arm stub.

## Hallucinations / overclaim

None. "Match C" is earned for the shipped arms; the unshipped pair is
named, not silently dropped.

## Density

One C locus family, ~60 insertions, 1 corpus block. In-band §2b.

## Verification

Re-measured myself: `hidden-proxy.mjs verify nh_timeout --base 7bffd9f5~1`
→ `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (Rogue-91119
fully PASS, RNG 6704/6704 + screens 275/275). True, not vacuous. (Procedural
note, not a C-wrong: the commit message records `finish-iteration.mjs
--commit` aborting on pre-existing `check-hot-docs` cap FAILs and a manual
commit with the identical path set — process debt for the supervisor, the
tree content is unaffected.) No seed/coordinate/RNG-index reads in the
diff (grepped clean).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
