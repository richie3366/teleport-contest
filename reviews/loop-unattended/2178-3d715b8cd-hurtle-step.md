# Review 2178 — 3d715b8cd — dothrow hurtle_step whole-body restart

SHA `3d715b8cd`, D-3218; 2026-10-01; `js/dothrow.js` only (+193/−75,
restart same name/signature). Single-function cluster + 4 stale pops.
Closes no prior review.

## Metadata

- Subject: "dothrow.c hurtle_step whole body (Passes_walls/!may_pass,
  Sokoban halt, drag_ball, room/pool/trap arms, delay) (D-3218)".
- Promises: exact-C-order restart; via_jumping/stopping_short;
  Passes_walls/may_passwall outer skip + universe-edge arm; Sokoban
  halt via the level flag; uball-gated drag_ball/move_bc;
  check_special_room; pool/lava drown + Norep; trap subset in C arm
  order; nh_delay_output; "all 43 C callees live, every arm ported".

## Intent vs deliverable

Kept. The diff is the promised restart: 9 new arms in C positions,
15 imports (7 existing edges extended + ball.js), pre-existing gates/
monster-bump/move-core kept byte-identical in their C slots.

## Inventory — hurtle_step

Restarted `hurtle_step` (dothrow.js:2982). New imports, all LIVE per
`sym.mjs` (usages await-correct): Norep (display, async, awaited);
Passes_walls_prop/check_special_room (async, awaited)/is_pool/is_lava/
is_moat (hack.js); may_passwall (mon.js); drown/dotrap (async,
awaited)/trapname (trap.js); Levitation/Flying (mhitu.js);
hero_Wwalking (dbridge.js); drag_ball (async, awaited)/move_bc
(ball.js, new edge, `--can` SAFE hoisted per message); consts
MAGIC_PORTAL/VIBRATING_SQUARE/FIRE_TRAP/NO_TRAP_FLAGS/is_pit/is_hole.
Deleted/re-pointed: none (no clone→import in this SHA).

## C ↔ JS fidelity — hurtle_step

C `dothrow.c:772–972` (csym range), walked in order:

- Gates `:783–793`: isok/in_out_region/range==0 kept ✓; `via_jumping
  = (EWwalking & I_SPECIAL)` ✓ (I_SPECIAL pre-imported, line 45);
  `stopping_short = via_jumping && range < 2` ✓. Caller `hurtle_jump`
  sets the bit (dothrow.js:2957) ✓ — caller wired.
- Outer skip `:796`: `!Passes_walls_prop() || !(may_pass =
  may_passwall(x, y))` — short-circuit exact, may_pass starts true ✓.
- Why-chain `:801–847`: tree/wall/door-frame/closed-door, iron bars,
  boulder (`You bump into a %s. Ouch!` shape kept), NEW !may_pass
  universe-edge (`You smack into something!`), diagonal crevice
  squeeze — order exact ✓. `dmg = rnd(2+range)` single RNG call in
  C position → `losehp(maybe_half_phys(dmg), why, KILLED_BY)` +
  wake_nearto + FALSE ✓ (only direct RNG in C; callees own theirs).
- Monster bump `:849–876`: untouched pre-existing block, #if 0
  exceptions correctly excluded ✓.
- Sokoban diagonal `:878–885`: bad_rock pair + `level.flags.
  sokoban_rules` (C `Sokoban ≡ svl.level.flags.sokoban_rules`,
  rm.h:538 ✓) → abrupt halt + FALSE ✓. The `|| game.Sokoban`
  mirror is lockstep-maintained at all 3 write sites (restore sync
  do.js:1917, gen mklev.js:20636, solve trap.js:1685) — cannot
  disagree; harmless.
- Punished `:889–899`: `u.uball` ≡ C `Punished (uball != 0)`
  (youprop.h:77 ✓); `drag_ball(x, y, true)` + `if (drag.ok)
  move_bc(0, …)` matches C's TRUE-arg shape and the established
  in-repo pattern (cmd/teleport/trap call sites identical) ✓;
  FALSE skips move_bc only, hurtle continues ✓.
- Move core `:901–917`: u_on_newpos/newsym/vision/flush +
  switch_terrain on typ change kept ✓.
- Room `:924`: `await check_special_room(false)` in C position ✓.
- Pool/lava `:926–937`: waterwall || !(Lev||Fly||Wwalk) → multi=0
  + drown + FALSE; elif !waterlevel && !stopping_short → Norep
  moat/pool; lava + !stopping_short → Norep ✓. `hero_Wwalking`
  bakes `!Is_waterlevel` — C-exact, since C `Wwalking ≡ (HW||EW)
  && !Is_waterlevel` (youprop.h:260, read in pinned C) ✓.
- Traps `:944–967`: stopping_short skip; portal dotrap + FALSE;
  vibrating pline + dotrap; fire dotrap; Sokoban pit/hole
  (!via_jumping dotrap, `range = 0`, TRUE); else tseen pass-over
  ✓ — all in C arm order with exact returns.
- Tail `:968–972`: decrement + clamp kept, NEW `nh_delay_output()`
  while range remains ✓.

Kept clones: `closed_door_hurtle` is byte-identical to canonical
`closed_door` (hack.js:156) — exact, not divergent (nit: dothrow
already imports hack.js, so a future import would drop the 11th
clone; not a C-wrong, unqueued).

Diff grep: 4 hits, all benign (message text + WT_TOOMUCH_DIAGONAL
const ×3). Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "All 43 C callees live" holds for the 15 newly wired imports
(sym-verified above); the remainder were live before this SHA and
the restart kept their call sites.

## Density

One whole C function (201 C lines → 193 js changed lines), one C
file, no Must-fix bundled. Four stale pops (obj_no_longer_held
do.js:711, rumor_check rumors.js:382, readmail mail.js:288,
choose_monster_spell mcastu.js:300) — all loci exist with
substantive bodies, each with D-evidence; detour-shaped, allowed.

- Ledger: hurtle_step ported — ACCEPT.

## Verification

Re-measured (current tree incl. this SHA):

```text
verify hurtle_step: baseline 3d715b8cd~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke hurtle_step: no RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note with "row cited 0 blocks" +
REACH-OK, green/strict/cohort PASS). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
