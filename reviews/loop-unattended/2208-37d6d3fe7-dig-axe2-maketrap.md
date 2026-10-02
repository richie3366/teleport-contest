# Review 2208 — 37d6d3fe7 — dig/use_pick_axe2 completion + maketrap untrap

Metadata: SHA `37d6d3fe7`, D-3247, `js/dig.js` (+62/−35) +
`js/trap.js` (+13/−1) + `js/sndprocs.js` (+2) + new
`scripts/maketrap-oldplace-untrap.test.mjs`. Parent `f0a648599`.

## Intent vs deliverable

Subject promises: `dig` + `use_pick_axe2` whole-body
completion + the `maketrap` oldplace-untrap writer (1 PASS,
1 later owner). Delivered: 2 whole dig.c bodies closed (2 +
7 gaps), the trap.c writer arm, one stale (`set_move_cmd`)
closed with evidence, and a committed 5-case unit test. The
session mechanism (pit-blind paint → maketrap reset_utrap →
pline-time vision recalc) is MEASURED via temp C dumps
(reverted), not inferred.

## Inventory

- `dig` (js/dig.js): case-1 `Soundeffect(se_bang_weapon_side,
  100)`; statue/boulder `sobj_at` hoisted into else-if
  conditions (C fall-through).
- `use_pick_axe2` (js/dig.js): swallowed `&&` short-circuit
  with miss fall-through; `u.uinwater` Turbulence arm; OBJ_NAME
  killer; `Soundeffect(se_clash, 40)`; LAVAWALL `fire_damage`;
  teeter/shaft `dotrap(FORCEBUNGLE)` arm; two
  `cant_reach_floor` replacements; `Yobjnam2` scratch.
- `maketrap` (js/trap.js): C :466–473 oldplace disjunction →
  `reset_utrap(false)`.
- `set_move_cmd`: closed stale (no body change).

## C ↔ JS fidelity

`dig` — C dig.c:299–568 (csym; D-log 300–568). Changed arms:
case-1 `Soundeffect(se_bang_weapon_side, 100)` → pline →
`wake_nearby(FALSE)` now in C order (:352–356) ✓;
statue/boulder `digtyp == … && (obj = sobj_at(…)) != 0`
with break/fracture/restack bodies exact (:447–463) ✓.
Rest of the 270-line body pre-existing, untouched here.
Callers: staticfn, exactly 2 `set_occupation(dig, …)`
setters at js/dig.js:2806+2858 ≡ C :1311+:1356 ✓ (1:1,
verified by grep). Verdict: whole exact.

`use_pick_axe2` — C dig.c:1161–1359 (csym; D-log 1162–1359).
All 7 gaps vs C: swallowed `u.uswallow && do_attack(ustuck)`
with miss fall-through ✓ (JS `u.ustuck` null guard is
defensive-unreachable); Underwater = u.uinwater per
youprop.h:279, read at site, Turbulence text exact ✓;
self-hit `rnd(2)+dbon()+spe`, killer `"%s own %s"` with
OBJ_NAME = obj_descr oc_name ≡ generated objectNameStrs
✓; `!isok → Soundeffect(se_clash, 40)` + "Clash!" ✓;
LAVAWALL `fire_damage(uwep, FALSE, rx, ry)` ✓ (async,
awaited, dynamic do.js import = file convention);
teeter/shaft `(trap = t_at) && (uteetering || uescaped)` →
dotrap(FORCEBUNGLE) → `!utrap → cant_reach_floor(…,TRUE,…)`
✓; `!can_reach_floor(FALSE) → cant_reach_floor(…,FALSE,…)`
✓; axe-down scratch `Yobjnam2(obj, null)` ✓ (live objnam
export — the right side of the sym "IMPORT the export"
warning). Pre-existing self-hit "You hit yourself" pline
(C: You) is text-identical, untouched, out of scope.
Callers 4/4 wired (js/cmd.js:3776, dig.js:2629,
do.js:3364, hack.js:490; one prose line-number off,
sites confirmed); signature unchanged. Verdict: whole exact.

`maketrap` arm — C trap.c:466–473 verified verbatim; JS is
the identical disjunction (TT_BEARTRAP/≠BEAR_TRAP,
TT_WEB/≠WEB, TT_PIT/!is_pit, TT_LAVA/!is_lava(x,y)) →
`reset_utrap(false)` at the same position (post-oldplace,
pre-"old tx,ty" comment region) ✓. All names in scope
(imports :66/:72/:92/:122). Framed honestly as "the writer
fix, not a whole-function port". Verdict: arm exact.

`set_move_cmd` stale — verified, not trusted: C cmd.c:1386–
1400 vs js/cmd.js:558–571, field-for-field identical
(dz/dx/dy, nopick, travel pair, run/domove gate). Verdict:
correctly closed stale.

Helpers: uteetering_at_seen_pit/uescaped_shaft (sync),
dotrap (async, awaited), cant_reach_floor, uhis, Yobjnam2 —
all LIVE; sndprocs re-exports are generated consts
(!SND_LIB no-ops); dig→sndprocs `--can` reads ALREADY (this
edge). No clones, no stubs, no re-points.

## Hallucinations / overclaim

One doc-citation slip, code unaffected: the new JS comment
labels the statue/boulder arms "C dig.c:474-490" — the arms
are at C dig.c:447–463 (474+ is the wall-damage region).
Correction stands as review text.

## Density

2 whole dig.c functions + 1 same-subsystem writer arm + 1
verified stale — coherent cluster, ≤10, one C file plus
the measured writer. Under the floor with the evidenced
exception (coverage 0 rows, no other dig.c residuals).
Own bullets + `Ledger:` entries per function; the maketrap
arm is not sold as a whole function. New committed test
5/5 (re-ran here: pass 5, fail 0).

## Verification

- Banned-pattern grep on `^+` hunk lines: the only "FORCE"
  hits are the C constant `FORCEBUNGLE` (import + dotrap
  call) — clean.
- Re-measured in one call: `hidden-proxy.mjs verify
  use_pick_axe2,dig,maketrap --base 37d6d3fe7~1 --reach-all`
  → use_pick_axe2 "1 PASS, 1 moved past" (94135 PASS;
  94215 32→dosounds@61 ✓); dig 3/3 REACH-OK; maketrap
  smoke 24/24; dig/maketrap vacuous as logged. Zero
  REGRESSED. Dig cited session confirmed re-attributed
  (Rogue-94040 s70 owner `dig_up_grave` at HEAD).
- No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
