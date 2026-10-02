# Review 2228 — 4f422de21 — trapeffect_fire_trap whole-body completion

Metadata: SHA `4f422de21e5ce0b32f9c4d31c56a56b129f3f2a7` (D-3267,
2026-10-02). `js/trap.js` only (+11/−9). Single function, one C
file. Method below (C trap.c:1729–1822).

Intent vs deliverable: subject promises "trapeffect_fire_trap
whole-body completion (hero seetrap, surface() erupt wording,
shieldeff, pline_mon; retires surface omit)". The diff delivers
all four plus the You('smell smoke.') exactness. Delivers what it
promises.

Inventory:

- `trapeffect_fire_trap` (`js/trap.js:4831`): +hero seetrap(trap)
  (C :1736); `surf` now surface(mx,my) (C :1746–1753) in both
  erupt plines; seen erupt via pline_mon with C's exact format
  (C :1743–1746); +shieldeff in the resists_fire arm (C :1756);
  smell via You('smell smoke.') (C :1809).
- No import changes at all (surface :176 pre-existing sit edge;
  seetrap same-file; pline_mon/shieldeff/You in-scope).
  `sym.mjs`: seetrap trap.js:1301 sync (un-awaited ✓); surface
  sit.js:475 sync ✓; pline_mon display.js:7820 ASYNC awaited ✓;
  shieldeff display.js:4756 ASYNC awaited ✓. No symbols deleted
  or re-pointed. No clones added. TOWER_OF_FLAME='tower of
  flame' both (trap.c:79).

**C ↔ JS fidelity — `trapeffect_fire_trap`** (whole body walked,
JS :4831–4920 vs C :1735–1821)

- New arms: hero seetrap+dofiretrap+Finished ✓; surface() in
  both plines ✓; pline_mon format `A %s erupts from the %s
  under %s!` + (tower, surf, mon_nam) exact ✓ (restores the
  msg_xy C sets); shieldeff before the uninjured pline inside
  in_sight ✓; You('smell smoke.') ✓.
- Pre-existing arms (re-walked): in_sight/see_it gates ✓;
  You_see 'a %s erupt…' (C's "erupt", not "erupts") ✓; golem
  if-chain paper/straw/wood/leather (immolate + mhpmax,
  >>1/>>2/>>3 ≡ /2//4//8 for non-negative mhpmax) ✓;
  `alt>num→num` ✓; thitm(0,mtmp,null,num,immolate) →
  trapkilled else mhpmax−=rn2(num+1) + mhp clamp ✓;
  `burnarmor || rn2(3)` short-circuit (dynamic zap import,
  pre-existing cycle-avoidance) → destroy_items(AD_FIRE,
  orig_dmg) + ignite + xtradmg + monkilled('',AD_FIRE) in C
  order ✓; burn_floor_objects && !see_it && dist2≤9 smell
  (dist2 ≡ distu hero-form) ✓; melt_ice ✓; DEADMONSTER
  (mhp≤0) → trapkilled ✓; see_it && t_at → seetrap tail ✓;
  Killed/Caught/Finished return chain ✓. RNG order d(2,4) →
  thitm → rn2(num+1) → rn2(3) matches C ✓.

Hallucinations / overclaim: none. "Whole C body live" verified
by a full re-walk, not just the hunks.

Density: 1 function whole, 1 file, +11/−9 — below the ~80
floor with the exception documented (trap.c all-ok, closure
live). `Ledger: trapeffect_fire_trap ported` + Verify line
present.

Verification: D-log Verify shows green/strict/cohort + vacuous +
reach-REACH-OK (full skipped — trap.js unshared). Re-measured
(`hidden-proxy.mjs verify trapeffect_fire_trap --base
4f422de21~1 --reach-all`): vacuous at baseline (row cited 0 —
correctly a note) + `reach … 15/15 → REACH-OK`. Zero regressed.
Banned-pattern grep on js/ hunks: clean. Rule #2 clean (2221).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
