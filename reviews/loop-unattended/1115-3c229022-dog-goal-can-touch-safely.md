# Review 1115 — 3c229022 — dog_goal APPORT can_carry vs blast artifacts (D-2149)

Metadata: SHA `3c229022`, js/ +125/−67 across 4 files
(`artifact.js`, `do_name.js`, `dogmove.js`, `monmove.js`). D-log D-2149.
Subject promises: port C monster touch refusal + `can_touch_safely`,
`dog_goal` uses the `can_carry` export; 1 session PASS
(scen-wish-Priest-92136, 2703/2703 RNG, 170/170 screens).

Intent vs deliverable: promise matches diff. Actually adds: (1) new sync
`touch_artifact_mon(obj, mon)` in `js/artifact.js`; (2) monster arm of
async `touch_artifact` delegates to it (hero path untouched);
(3) full `can_touch_safely` body in `js/monmove.js` (was a stub);
(4) deleted dogmove-local `max_mon_load` + `can_carry` clones, imports
`can_carry` from `monmove.js` at both `dog_goal` and `dog_invent` sites;
(5) `mon_aligntyp_nam` local→export in `js/do_name.js`.

Inventory: `touch_artifact_mon` (new export, C callee assembly),
`can_touch_safely` (stub→full port, verified CLONE made whole),
`can_carry` (clone→LIVE import; monmove body pre-existing, named
huge-quan `rn2` clamp unchanged), `mon_aligntyp_nam` (re-point
local→export, body unchanged).

**C ↔ JS fidelity**: confirmed branch-by-branch.
`touch_artifact` monster path (`artifact.c:907–974`, tail `:955–974`
read here): NONART gate, non-covetous role/align arms, covetous
pass-through, `bane_applies`, blast gate. For monsters `yours=FALSE`,
so C's `(badalign && (!yours || !rn2(4)))` reduces to `badalign`, and
JS's `if (((badclass||badalign) && self_willed) || badalign) return 0`
is exactly equivalent — including the no-RNG silent refuse
(short-circuit on `!yours`, no draw). C's final
`if (badclass && badalign && self_willed) return 0` is unreachable-extra
for monsters (blast gate already refused that conjunction), so JS
returning 1 past the gate matches. `touch_blasted=FALSE` reset stays in
async `touch_artifact` before the monster delegation (`artifact.js:1164`),
so flag semantics preserved. `can_touch_safely` matches
`mon.c:1957–1974` in order (cockatrice-corpse/W_ARMG/ston,
rider-corpse, silver/bell/covetous, `!touch_artifact` refuse).
`can_carry` (`mon.c:1989–2053`, callers incl. `dogmove.c:443,555`)
now LIVE with notake/touch/glomper/steed/shk/peaceful/rocks/nymph/weight
(`monmove.js:269–308`); deleted clone demonstrably diverged (no
notake/touch gates), so removal is a fix, not a loss.
Callee closure: `is_covetous`/`is_mplayer`/`bane_applies`/
`touch_petrifies`/`resists_ston`/`is_rider`/`mon_hates_silver` all LIVE;
`oselect`/`m_search_items` outer `can_touch_safely` calls + huge-quan
clamp stay named in map `turns.md` in this commit. One STUB nowhere in
a live arm. `sym.mjs` on re-pointed symbols:
`can_carry → js/monmove.js:269 sync`;
`touch_artifact_mon → js/artifact.js:1125 sync`;
`mon_aligntyp_nam → js/do_name.js:746 sync`;
`can_touch_safely NOT EXPORTED — 1 LOCAL in js/monmove.js:241`
(the verified body `can_carry` calls; no second clone written);
deleted dogmove `max_mon_load` leaves only monmove's live `:219`.
`--can` on all three new edges: ALREADY, no new edge.

Hallucinations / overclaim: none. "Match C" is for dispatch + callee
together, and both shipped; hero-path byte-identical claim is
structurally evident (else-branch only).

Density: one C locus family (touch-refusal envelope), 4 already-coupled
modules, code+map+verify in one handoff. Right-sized.

Verification: D-log Verify bullet shows `verify.mjs --fn dog_goal` →
hidden 1 PASS + green/strict/cohort/full 44/44. Re-measured:
`hidden-proxy.mjs verify dog_goal --base 3c229022~1` →
"1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS"
(scen-wish-Priest-92136 PASS). Claim true, no vacuity (PASS, not
NO MOVEMENT). Banned-pattern grep over the js/ hunks: hits only in
commit prose and one C-citing comment (`badalign && (!yours || !rn2(4))`
quoted as the short-circuit justification); no FORCE/DIAG/getRngLog/
seed/fastforward/coordinates in code. `imports.mjs --rulecheck`:
Rule #2 clean.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
