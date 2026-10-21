# Review 3043 — cffce336a — trap.c Flying / Levitation through the youprop.h readers

- SHA: `cffce336a` (cliffs head, owner nh_timeout:
  scen-sweep-Caveman-50055035 step 1109)
- D-entry: D-4203; Ledger: float_down, fall_through,
  trapeffect_bear_trap, trapeffect_landmine ported
- `js/` diff: trap.js +14 −25

## Intent vs deliverable

Promise: trap.c reads Flying / Levitation through the youprop.h macros,
whose home is `u.uprops[FLYING/LEVITATION]` (`:237–255`). trap.js kept
flat-only clones (Flying_fu, Levitation_fd, fall_through's locals, the
bear-trap / landmine `u.Levitation || u.Flying` reads). A hero flying
only via a worn amulet (slot extrinsic W_AMUL, no EFlying flat) got «You
float gently to the floor.» where C says «You have stopped levitating
and are now flying.»

Diff: both clones are deleted. Their five call sites and the two
trap-effect guards use `hero_Flying` / `hero_Levitation`, which trap.js
already imports as `Levitation_st as hero_Levitation, Flying_st as
hero_Flying` from hack.js (trap.js:129). float_down's BFlying test also
reads the slot. FLYING is imported. The promise matches the diff.

## Inventory

- float_down — trap.js:3405 (C trap.c:4024–4179): Levitation gate,
  BFlying/Flying arm, `!Flying` ustuck arm.
- fall_through locals — trap.js:4282–4284 (C `:602–696`).
- trapeffect_bear_trap — `:3807`; trapeffect_landmine — `:5942` guards.
- sym.mjs on the deleted / re-pointed symbols:

```text
Flying_fu        NOT FOUND in js/** (no export, no local function/const).
Levitation_fd    NOT FOUND in js/** (no export, no local function/const).
Flying_st        js/hack.js:3288   sync
Levitation_st    js/hack.js:3277   sync
hero_Flying      NOT EXPORTED — but 1 LOCAL CLONE(S): js/dbridge.js:342
hero_Levitation  NOT EXPORTED — but 1 LOCAL CLONE(S): js/dbridge.js:353
```

The `hero_*` names in trap.js are import aliases of the hack.js exports,
not clones. dbridge.js's two same-named locals are older (D-1967),
pre-existing and equivalent (flat or slot H/E, either blocked source,
steed flyer). They are not this SHA's debt.

## C ↔ JS fidelity

- Gate `:4034` `if (Levitation) return 0;` after the H/E mask clears:
  JS `hero_Levitation()` after the same two slot writes. Before this,
  Levitation_fd missed a slot-only extrinsic, so a second levitation
  source (boots in the slot) would have fallen through.
- `:4049–4055` `if (BFlying) { float_vs_flight(); if (Flying) «…now
  flying.»; encumber_msg(); return 1; }`: JS now reads the flat
  (float_vs_flight's store, polyself.js:685–687) or the slot. Flying is
  Flying_st, which reads the W_AMUL slot extrinsic. This is the measured
  fix.
- `:4086` `if (!Flying)` ustuck arm, fall_through's `Levitation` /
  `Flying`, and bear-trap / landmine `(Levitation || Flying) &&
  !forcetrap`: all now use the macro readers. The landmine's `rn2(3)`
  sits after the guard, so RNG order is unchanged when the guard's value
  is unchanged.
- Sticky reads removed safely: no `js/` code writes `u.Flying` or
  `u.Levitation` (grep of `\.(Flying|Levitation) =` is empty), so those
  terms were always false.

Note: float_down's `if (u.BLevitation | 0)` (C `:4036`, BLevitation ≡
slot.blocked) still reads the flat only. That is net-identical:
LEVITATION's slot `.blocked` is written only by the invent.js
save/restore pairs, and apply_w_blocks never targets LEVITATION (C
w_blocks has no levitation blocker). So it is not queued, but the D-log
line «no flat-only Flying/Levitation read is left» overstates it by this
one B read.

## Hallucinations / overclaim

Minor. Apart from the BLevitation note above, the deleted Flying_fu
leaves an orphan JSDoc line, `/** C youprop.h Flying subset for
float_up. */`, at trap.js:3280 above float_up's real doc block. It is
cosmetic. The named omission (mhitu.js's exported flat-only
`Levitation()`, mhitu.c's own copy) is true and is another C file.

## Density

One mirror family in one C file, five functions. Right-sized.

## Verification

```text
verify nh_timeout,float_down,fall_through,trapeffect_bear_trap,trapeffect_landmine --base cffce336a~1 --no-reach
  nh_timeout: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
    scen-sweep-Caveman-50055035: PASS
  the other four: 0 blocked (vacuous)
```

D-log: reach REACH-OK ×5 (bear_trap 21, landmine 35 tagged), green 2/2,
strict ×2, cohort 7/7, full 44/44, sweep 676 baseline-PASS 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
