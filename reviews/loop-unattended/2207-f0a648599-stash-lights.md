# Review 2207 — f0a648599 — stash light re-write + statue-donor del

Metadata: SHA `f0a648599`, D-3246, `js/lev_json.js` (+70/−4) +
`js/trap.js` (+11/−2). Parent `14db57058`.

## Intent vs deliverable

Subject promises: fix js-throw "relink_light_sources: no
monster 0" via stash-aware re-write (Samurai) + statue-trap
donor light del (trap-Wizard). Delivered both, with the two
causes separately MEASURED (save-time probe with monster
identity; donor lifecycle trace to `mongone_statue_donor`).
The "row undercounted" note (same message in 2 sessions) is
honest scope, not creep — one message, one restore path.

## Inventory

- `write_ls` fix (at its stash call site, body untouched):
  new `serStashLight` (lev_json.js:410) resolving stashed
  pointers against stash roots; `serLevel` threads
  `{fobj, buried, fmon}`; `serLightList` skips null-id for
  both types + routes through `serStashLight`.
- `mongone` donor arm: `mongone_statue_donor` dels an
  emitting donor's light before mx zero; trap.js gains
  `{emits_light, del_light_source}` (light.js) +
  `monst_to_any` (hack.js) + `LS_MONSTER` (const.js).

## C ↔ JS fidelity

`write_ls` — C light.c:633–702 (csym; D-log range exact).
JS `write_ls` itself untouched (stays the live writer —
verified: `serLight` is a `write_ls` passthrough, so every
serStashLight fallback is live behavior bit-for-bit).
serStashLight transposes C onto stash roots: bad type →
serLight (C :699–701 impossible-only, unwritten) ✓;
numeric id writes through (C :641–642 NEEDS_FIXUP) ✓;
OBJECT: o_id + `find_oid_in_blob === otmp` identity over
frozen fobj/buried/minvent (C :646–654, :650 check; never
billobjs) ✓, silent on resolve like C ✓, else serLight
✓; MONSTER: m_id + `find_mid_in_blob === mtmp` over stash
fmon (C :655–687, :677 check; whereis_mon transposed —
stash holds no migrating/mydogs; youmonst falls to the
live FM_YOU arm) ✓, else serLight ✓. The design claim
(C fixes ids at STASH time, save_light_sources :433–439;
dosave never re-verifies) matches the C I read ✓.
`serLightList` null-id skip for both types ≡ C
maybe_write_ls :576–578 (`!ls->id.a_monst → continue`,
either type) ✓ — silence is deliberate (avoids the
double-impossible latch crash observed pre-fix) and the
persisted record is identical (unwritten either way).
Named: the :678–681 dead-monster impossible TEXT is not
reproduced on the stash path (same latch rationale;
record identical) ✓. Sole stash re-writer chain
(serOtherLevels ← dosave0) per the D-log; live snapshots
keep serLight. Verdict: whole, correctly sited.

`mongone` donor arm — C trap.c:413 full `mongone(mtmp)`
on the donor (verified in the invent-move context
:405–413) → m_detach light arm mon.c:2744–2745: `if (mx >
0 && emits_light(mptr)) del_light_source(LS_MONSTER,
monst_to_any(mtmp))`. JS: `if (emits_light(mtmp.data))
del_light_source(LS_MONSTER, monst_to_any(mtmp))` before
the mx zero ✓ — the mx>0 gate is implied (donor placed,
in fmon, zeroed after); emits_light/monst_to_any/
del_light_source all live (light.js:46/121, hack.js:212).
del_light_source not-found impossibles (C :135–137) — same
existence assumption C makes for emitting placed
monsters. Timers/worm/shop stay deferred (pre-existing
names). Verdict: arm exact.

Helpers: no clones added; find_*_in_blob are pre-existing
in-file helpers (identity-check shape matches C). Import
edge: parent trap.js had NO light.js import, so "new edge"
was accurate at ship; current `--can` reads ALREADY (this
edge), hoisted fns, runtime use only ✓. No re-points.

## Hallucinations / overclaim

None. "Neither session blocked on these fns" is stated as
a note with owner+throw cited, not a PASS. The Rogue-92030
FAIL→PASS is disclosed as stale with the falsifier
(replay-with-fix-stashed), not claimed as a win.

## Density

Must-fix js-throw ships alone ✓ (two causes, one message —
one Must-fix family). Own C-locus/Callers/Verify/Named
bullets per function; `Ledger: write_ls ported` (+ the
donor arm under mongone, named). No unrelated bundling.

## Verification

- Banned-pattern grep on the js hunks (`^+` lines): clean
  (the naive `git show` grep hits commit prose "seed0013",
  not code).
- Re-measured in one call: `hidden-proxy.mjs verify
  write_ls,mk_trap_statue --base f0a648599~1 --reach-all` →
  both vacuous (0 blocked, as logged) + smoke 24/24
  REACH-OK each. Zero REGRESSED.
- Independently corroborated from the committed boards
  (parent vs this SHA, `sessions` map): PASS→FAIL **none**;
  FAIL→PASS exactly scen-tour-Rogue-92030 (the disclosed
  stale +1); both sessions' `error` fields go from
  "relink_light_sources: no monster 0" to null; **zero**
  sessions gain a new error. Board `full: true`.
- No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
