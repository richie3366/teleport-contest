# Review 1421 — 99e86dae — gulpmu whole-body port (D-2462)

Metadata: SHA `99e86dae`, `js/mhitu.js` only (163 insertions, restart of
`gulpmu` in C order). Coverage gap (0 blocked), not a corpus fix.
D-log: D-2462.

## Intent vs deliverable

Promise: the whole first-swallow second half (Punished ball, steed
dismount, leashes, petrify, snuff_lit, Slow_digestion,
ugolemeffects/monstseesu) + un-simplified elemental/fog/acid arms. Diff
ships all of it in C order. No second subsystem.

## Inventory

- Restarted: `gulpmu` (module-local, correct — C staticfn).
- Added: module-local `Slow_digestion` (H||E — byte-matches
  `youprop.h:291`; eat.js:514 holds the only other copy and exports
  nothing, so no import existed — verified CLONE, stated in the D-log).
- Reused pre-existing in-file helpers: `Breathless`/`Amphibious`
  (C-cited, match `youprop.h:272–278`), in-module async `ugolemeffects`.
- New static edges, all import-the-export: `t_at`/`reset_utrap`/
  `minstapetrify` (trap.js; minstapetrify async, awaited),
  `dismount_steed` (steed.js, async, awaited), `unplacebc`/`placebc`
  (ball.js), `Punished` (pray.js, sync), `sobj_at` (mkobj.js),
  `number_leashed`/`unleash_all`/`snuff_lit` (apply.js; snuff async,
  awaited), `reset_occupations` (do.js, async, awaited), `vtense`
  (objnam.js), consts (`is_pit`, `M_SEEN_ELEC/COLD`, `DISMOUNT_ENGULFED`,
  `TT_WEB`, `OBJ_FREE`, `BOULDER`). No deleted/re-pointed clones for
  `sym.mjs` beyond the above.

## C ↔ JS fidelity

C `mhitu.c:1288–1587` vs JS, arm by arm:

- Head: `t_at` before the `d()` roll, `omx/omy` captured pre-engulf,
  pit+boulder MISS — exact. (`engulf_target(mtmp, true)` second arg is a
  pre-existing line, untouched by this SHA.)
- Place: `Punished → unplacebc`, `remove_monster(omx,omy)` + `mtrapped=0`
  + `place_monster(ux,uy)` (replaces the direct mx/my set — real fix),
  ustuck + newsym — exact.
- Steed: `mon_nam` buf + `Some_Monnam … lunges/whirls/flows/oozes/surges`
  chain in C order via `urgent_pline` (was `pline` + `u.usteed = null` —
  both fixed; `dismount_steed(DISMOUNT_ENGULFED)`) — exact.
- `stop_occupation` + `reset_occupations`, TT_WEB utrap release via
  `reset_utrap(FALSE)` (was inline clear + hardcoded `7` — fixed), leash
  `vtense`-snap + `unleash_all` (= `pline_The`, exact) — exact.
- Petrify arm: remove-at-(ux,uy) + place-back + `minstapetrify(TRUE)` +
  `placebc` iff Punished + `set_ustuck(null)` + `mhp<1 ? AGR_DIED : MISS`
  (= `DEADMONSTER`, `monst.h:214`) — exact.
- `uswldtim` DGST/other formulae + `swallowed(1)` pre-existing, intact;
  snuff_lit invent loop snapshots array-or-linked with a Set guard =
  C's nextobj pre-fetch — exact.
- `ustuck` re-check, Punished OBJ_FREE limbo (null-guarded; C invariant
  holds), `uswldtim--` — exact.
- DGST: Slow_digestion early-out + total-digest `Half_physical ×2`
  (`Half_physical_damage` = H||E per `youprop.h:341`; flats equivalent) —
  exact. PHYS fog chain (flaming/Breathless/amphibious 4-way + tmp=0
  gate) — exact. ACID goo+seesu / Hallu-slime+unseesu — exact. ELEC/COLD/
  FIRE: `!mcan && rn2(2)` gate, shieldeff, chilly/hot `You_feel`,
  seesu/unseesu, `ugolemeffects`, FIRE `burn_away_slime` inside the gate
  arm (verified at `js/mhitu.js:2115` — the diff hunk only *looked* like a
  deletion) — exact.
- Physical block: `uac<0 → rnd` + `tmp<0 → 1` hoisted out of the uac arm
  per C + `Maybe_Half_Phys` — exact. `mswallower`-wrapped `mdamageu`,
  `if (tmp) stop_occupation` — exact. Petrify-regurgitate + timer/size
  expel + verbose Slow taste ("Obviously … doesn't like your taste.")
  with the 3.6.2 comment — exact.
- RNG (`d` → `rn2(20)` → `rn2(2)`/`rn2(4)` → `rnd(-uac)`) in C order;
  nothing added.

## Hallucinations / overclaim

None. "Named: none new" is accurate; the kept locals (`gulpmu_can_blnd`,
`display_nhwindow` adaptation) are justified with C ranges in the jsdoc.

## Density

One 300-line C function, one module, 163 insertions: right-sized.

## Verification

- `hidden-proxy verify gulpmu --base 99e86dae~1 --reach-all` (re-run):
  0 blocked both sides (vacuous, as stated); 9 baseline-PASS reachers,
  9 PASS, 0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Whole body ports C in order.

Verdict: **ACCEPT**
