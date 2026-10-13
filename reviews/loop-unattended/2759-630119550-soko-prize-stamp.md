# Review 2759 — 630119550 — soko prize-oid stamp in both soko1 loaders

- SHA: `630119550a791064ef5a71e6c9b7c58323d700fd`
- Subject: D-3906 create_object soko prize-oid stamp (Knight-585504 s841 → PASS)
- Type: cliff (≤10 functions), whole Method on the changed sites
- D-entry: `## D-3906` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: the soko1 loaders placed the achievement prize without
recording achieveo, so `is_soko_prize` stayed FALSE and monsters chased
the prize amulet. Fix inlines the soko_prize_oid/otyp + nomerge=1 stamp
in both loaders with C's else-impossible arm; Knight-585504 → PASS.

Diff actually adds: `js/mklev.js` load_soko1_1/load_soko1_2 prize capture
+ stamp (+44/−20) + new focused test
`scripts/soko-prize-achieveo.test.mjs`. No other `js/` hunks, no new
edge (`impossible` already in scope).

## Inventory

| JS site | C locus | Status |
|---|---|---|
| load_soko1_1 prize site (js/mklev.js:14895) | sp_lev.c:2404–2412 (csym) + dat/soko1-1.lua | changed: stamp added |
| load_soko1_2 prize site (js/mklev.js:15079) | sp_lev.c:2404–2412 (csym) + dat/soko1-2.lua | changed: stamp added |

## C ↔ JS fidelity

C (`sp_lev.c:2192–2440`, csym; achievement arm `:2391–2420`, soko
`:2404–2412`): `if (o->achievement)` → `Is_sokoend_level` →
`if (!achieveo.soko_prize_oid)` stamp oid+otyp and `nomerge = 1`, else
`impossible("multiple prizes on %s level", "sokoban end")`. The curse
switch (`:2239`) precedes the arm.

JS mirrors it exactly at both sites: prize captured across the
bag/amulet branches, `uncurse` before the stamp (C order), lazy
`achieveo`, `!ao.soko_prize_oid` guard, oid+otyp+nomerge, else
`impossible('multiple prizes on %s level', 'sokoban end')` — verbatim
C strings. Shape matches the minend house stamps (js/mklev.js:16656,
16884) and the generic clone's whole `:2391–2420` arm (:22838+). RNG:
none in the arm either side.

Callers (csym `--callers`: sole call sp_lev.c:3735 lspo_object): the
soko loaders are handwritten lua-twins, not routed through the generic
clone — the inline stamp is the correct linkage point, and both
alternative layouts are covered. Consumers (`is_soko_prize`
js/mkobj.js:4125, addinv_core1, wizmode revoke, prize-otyp announce)
wired pre-existing.

Helper classification: no helpers added; `impossible`/`uncurse`/`percent`
are LIVE same-file callees. Nothing deleted or re-pointed — no sym
paste owed. Grep: zero `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seeds.

## Hallucinations / overclaim

None. "Ports the D-3904-named writer" is exact — D-3904's TEMP-C trace
measured soko_oid=950 vs JS achieveo null, and the focused test pins
oid=950. The save/restore-achieveo boundary is honestly named as
unaudited (shared with the long-live mines stamps, no save in the probe).

## Density

Cliff phase: mbodypart row-2 with the head UNPORTABLE-terminal; owner
verified symptom-only (D-3903/D-3904), writer measured in C, shipped
whole with its impossible arm. `Ledger: create_object split` present.
Not a no-op.

## Verification

D-log: `verify mbodypart: 1 PASS`, both smokes 24/24, green/strict/
cohort, full 44/44.
Audit re-measure (`verify mbodypart,create_object --base 630119550~1
--reach-all`): `scen-sweep-Knight-585504: PASS`;
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (1 blocked at
baseline — not vacuous); both smokes 24/24 → REACH-OK. Claim confirmed
verbatim. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
