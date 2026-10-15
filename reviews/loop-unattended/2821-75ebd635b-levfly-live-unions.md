# Review 2821 — 75ebd635b — lev/fly gates read live prop unions

- **SHA:** `75ebd635b` (Thu 2026-10-15) — cliffs-head writers (D-3976).
- **D-entry:** D-3976. **Ledger:** `hack.c` (`u_simple_floortyp`, `pooleffects`, re-stamped ported).
- **Diff size:** `js/hack.js` −1/+6 (gate + 2 export keywords), `js/pickup.js` ±3 gates + import; +1 test.
- **Method:** cliff (two writers, one row) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the `distfleeck` cliff row's moat fork
(scen-sweep-Archeologist-50255246 s1886: C floats over the moat
silently, JS prints «You avoid floating into the moat» and blocks,
then sinks) is caused by two dead-flat reads of the C
`Levitation`/`Flying` macros — `u_simple_floortyp`'s `u_in_air`
(C `:1835`) and `pooleffects`' entering gate (C `:3272`) plus its
leaving pop-outs (`:3251`/`:3253`). The fix ORs the live
`Levitation_st()`/`Flying_st()` unions at all four sites. 3 PASS.

The diff is exactly that: one gate widened in `js/hack.js`, two
`export` keywords, one import line + three gates in `js/pickup.js`.
Promise and diff agree.

## Inventory

- `js/hack.js` `u_simple_floortyp` (~:2274): `uInAir` now
  `u.Levitation || Levitation_st() || u.Flying || Flying_st() ||
  !grounded(…)` with the `:1835` cite.
- `js/hack.js` `Levitation_st` (:3310), `Flying_st` (:3321):
  `function` → `export function` (additive, no body change).
- `js/pickup.js` `pooleffects` (~:2217-2245): leaving pop-outs
  read `u.Levitation || Levitation_st()` / `u.Flying ||
  Flying_st()`; entering gate reads the `levitating`/`flying`
  locals. Import line gains the two names.
- `scripts/swim-move-danger-levitation.test.mjs` (new, 5 its).

No function added, deleted, renamed, or re-pointed; no clone
created or removed. Required step-3 `sym.mjs` output (the two
symbols gained an export):

```text
Levitation_st    js/hack.js:3310   sync
Flying_st        js/hack.js:3321   sync
```

No clones listed. `imports.mjs --can pickup.js hack.js
Levitation_st` → `ALREADY: pickup.js already statically imports
hack.js. No new edge needed.` — the D-log's edge claim is exact.
Diff grep: no `FORCE`, `DIAG`, `getRngLog`, seed names,
`fastforward`, or hardcoded coordinates. Contest Rule #2 across
all of scored `js/`: `imports.mjs --rulecheck` → clean (run once
for this iteration, cited here and in 2822).

## C ↔ JS fidelity

C `u_simple_floortyp` (`nethack-c/upstream/src/hack.c:1832-1848`
per `csym.mjs`): `u_in_air = (Levitation || Flying ||
!grounded(gy.youmonst.data))` at `:1835` — cite exact. The macros
(`youprop.h:240`, `:253-255`, read directly):

```c
#define Levitation ((HLevitation || ELevitation) && !BLevitation)
#define Flying ((HFlying || EFlying || (u.usteed && is_flyer(u.usteed->data))) && !BFlying)
```

JS `Levitation_st()` is `(H/E flats || uprops
intrinsic/extrinsic) && !blocked` with blocked = `BLevitation
flat | uprops.blocked` — the established D-1070/D-3810 union
shape covering both storage forms; `Flying_st()` adds the
steed `is_flyer` term per the macro. Both verified body-whole at
`js/hack.js:3300-3327`, not trusted from the D-log.

Dead-flat premise verified independently: repo-wide search for
`.Levitation =` / `.Flying =` / `Levitation:` / `Flying:` in
`js/` returns zero hits — the combined flats are never written,
so `u.Levitation || Levitation_st()` ≡ C `Levitation` exactly,
and keeping the flat ORs is harmless. Branch order unchanged
(deletion-free widening of two `||` chains).

C `pooleffects` (`nethack-c/upstream/src/hack.c:3231-3309` per
`csym.mjs`; JS lives in `pickup.js` as a split port): leaving
arms `} else if (Levitation) {` at `:3251` and `} else if
(Flying) {` at `:3253`, entering gate `if (!u.ustuck &&
!Levitation && !Flying && is_pool_or_lava(…))` at `:3272` — all
three line pins verified by direct read. JS pairs each with the
matching union in C order; the `wwalking`, steed, and
ceiling-hider arms are untouched.

Named omissions (audited, in-map, not Must-fix):
(1) leaving pop-out arms session-unreached — true, and they are
the same two-line idiom as the reached entering gate, so the
risk of shipping them together is nil.
(2) `drown`'s wade gate already union-clean — verified:
`js/trap.js:6640` reads `hero_Swimming() || hero_Amphibious()
|| hero_Breathless()` (live `dbridge.js` imports).
(3) ParanoidSwim default-true C-correct — a falsification note,
not an omission; `options.c:7173` cite is the subject's, and the
corpus PASS is consistent with the avoid-gate firing correctly
once `newtyp` is right.

## Hallucinations / overclaim

None. No "Match C" is claimed for any dispatch — the change is
four gate widenings plus two export keywords, with both callees
live in-file readers. The mid-fix exposure signature (jsOwner
`mattackm`→`water_damage`, rngM −7) is disclosed as exposure,
not hidden. The "1/3 pre-fix" test claim is honest about the two
green-only pooleffects guards and names the corpus session as
the red proof. The temp-C/temp-JS hooks are stated reverted;
the tree shows no residue.

## Density

Cliff phase: the owner is the `distfleeck` cliffs head at the
parent SHA — verified in the committed queue (`4722dc249`
snapshot: distfleeck head, 7 blocks). The port is its writer
pair, one cause (dead lev/fly flats), shipped together per the
D-3974 precedent. The owner is explicitly proven already-whole
(ledger ported D-3559 + D-3975 JS-side proof) and NOT re-ported.
Code + ledger + verify in one handoff; rows re-stamped, not
newly claimed whole. No bundled file, no sweep, no self-filed
row. The four unchanged sessions keep their named writers
(D-3975 measure, ghoul, dog-combat pair) — correct scoping.

## Verification

Re-measured by this audit
(`hidden-proxy.mjs verify
u_simple_floortyp,pooleffects,distfleeck --base 75ebd635b~1
--reach-all`, ~50 min, one call):

- `verify u_simple_floortyp` / `verify pooleffects`: 0 blocked
  at parent — vacuous for the writers, disclosed as such in the
  D-log; smoke 24/24 + 24/24 → REACH-OK.
- `verify distfleeck: 3 PASS, 0 moved past, 4 unchanged, 0
  worse → PROGRESS` — exact match to the claim: PASS
  50255246 (full 1939), 49950029, 620037; unchanged
  50455535@110, 50456037@802 (ghoul), 50255043@552 +
  50455043@97 (dog-combat), each with the topline the D-log
  names.
- `reach distfleeck: 3869 baseline-PASS session(s) reach it
  (3869 run): 3869 PASS, 0 regressed → REACH-OK` — full
  `--reach-all`, zero regressions.
- Focused test 5/5 at HEAD. D-log gates: syntax, rule2, green
  2/2, strict ×2, cohort 7/7, full 44/44. The audit's
  end-of-iteration rescore re-covers the fortress.

No seed/step/coordinate/RNG-index reads; no trace shaping.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
