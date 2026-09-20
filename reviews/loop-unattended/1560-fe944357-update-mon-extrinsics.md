# Review 1560 — fe944357 — worn.c update_mon_extrinsics whole-body port (D-2601)

**Metadata:** SHA `fe944357`, `worn.c` `update_mon_extrinsics`, D-2601.
Next index 1560. JS: `js/worn.js` (+151/−~100), `js/mon.js`, `js/steed.js`,
`js/trap.js` (await/call-site wiring).

## Intent vs deliverable

Subject promises: whole-body port with live FAST speed, saddle dismount,
steed caller wired. Diff actually adds: C-order restart of
`update_mon_extrinsics` with `:line` cites; deleted local clone
`sync_mon_speed_from_boots`; new import of live async `mon_adjust_speed`
(muse.js); new `update_mon_maybe_blocks` tail-returning helper with live
`dismount_steed(DISMOUNT_FELL)`; `await` added at 3 async call sites;
new sync call at `put_saddle_on_mon` (steed.c:162). Matches the promise.

## Inventory

- `update_mon_extrinsics` (restart, `js/worn.js:709`) — on/off switches,
  rescan loop, again-goto, maybe_blocks tail.
- `update_mon_maybe_blocks` (new local, `js/worn.js:806`) — C `:693–711`.
- Deleted: `sync_mon_speed_from_boots` (local FAST clone).
- Call sites touched: `mdrop_obj` (mon.js:1838, now awaited),
  `trapeffect_poly_trap` (trap.js:5480, now awaited),
  `m_dowear_type` ×2 (worn.js:950/978, now awaited),
  `put_saddle_on_mon` (steed.js:299, new sync call).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/worn.c:578–712` (135 lines, via
`node scripts/csym.mjs update_mon_extrinsics`). Branch-by-branch:

- Unseen snapshot `:591`, early `goto maybe_blocks` `:592–593`: live.
- On-switch `:597–632`: INVIS `:598–599` (`minvis = !invis_blkd`), FAST
  `:601–607` (in_mklev guard + `mon_adjust_speed(mon,0,obj)`), no-op groups
  `:610–628` (ANTIMAGIC/REFLECTING/PROTECTION, CLAIRVOYANT/STEALTH/TELEPAT,
  LEVITATION/FLYING/WWALKING, DISPLACED/FUMBLING/JUMPING), default
  `:629–630` (`mextrinsics |= res_to_mr`). All live, C order kept.
- Off-switch `:634–683`: INVIS `:635–637` (`minvis = perminvis`), FAST
  `:638–644`, resistance rescan `:646–680` incl. smock dual-pass comment
  and `altprop` second source `:675–676`, clear-only-when-absent
  `:678–679`, default no-op `:681–682`. Live.
- Again-goto `:686–690`: live (`which = altwhich; continue`).
- maybe_blocks `:697–711`: `w_blocks(obj,~0)` INVIS arm, SADDLE dismount
  `:706–707`, newsym `:710–711`. Live.
- Types: `minvis = !mon.invis_blkd` yields boolean vs C 0/1; no strict
  `===` consumer of `minvis` in `js/` (grep clean), `perminvis` stays
  numeric. Cosmetic, unobservable.

Caller closure (6 C sites, `--callers` output): steal.c:845 is inside
`mdrop_obj` → wired js/mon.js:1838; steed.c:162 → newly wired
steed.js:299; trap.c:2514 → wired trap.js:5480; worn.c:962/992 →
wired worn.js:950/978; worn.c:1406 (`extract_from_minvent`) → wired
worn.js:662 (sync, floats tail — documented in-body). All 6 wired.

Callee closure: `mon_adjust_speed` LIVE (`js/muse.js:2819`, ASYNC —
`node scripts/sym.mjs` output pasted in review notes);
`dismount_steed` LIVE (`js/steed.js:808`, ASYNC); `w_blocks`,
`res_to_mr`, `altprop`, `canseemon`, `newsym` in-file/live.
Deleted clone `sync_mon_speed_from_boots` → import: required `sym.mjs`
check done (no remaining local clone; single exporter each).

Async-order note (debt, not Must-fix): C `mon_adjust_speed` is sync;
JS is async so the FAST pline tail and the dismount tail float as a
returned promise. 4 of 6 call sites await; `extract_from_minvent`
(worn.js:662) floats it, so `newsym` runs before a floated dismount
where C dismounts first. Documented in-body; reachable only when a
saddle leaves `usteed` via that path; zero corpus signal (0 blocked,
smoke 24/24). Debt item 1 below.

## Hallucinations / overclaim

None. "Named: none new" is accurate — every arm is live or inlined
macro/idiom. No dispatch-with-stubbed-callee. No clone divergence
(the one clone was deleted, not kept).

## Density

Breadth-phase whole-function port, one C family, 4 JS files, ~150
insertions. Right-sized. No second subsystem.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate reads.
- D-log Verify bullet claims PASS with smoke-spread REACH-OK (no
  RNG-tagged reach). Re-measured here:
  `node scripts/hidden-proxy.mjs verify update_mon_extrinsics
  --base fe944357~1 --reach-all` → 0 blocked at baseline and working
  tree (vacuous-note path, correctly stated as smoke evidence, not a
  corpus PASS) + `smoke 24/24 PASS, 0 regressed → REACH-OK`. Claim
  confirmed, no REGRESSED session.

## Actionable C-wrongs

1. (Debt, unqueued) Sync-float ordering: `extract_from_minvent`
   (js/worn.js:662) floats the speed-pline/dismount tail, inverting C
   dismount→newsym order on that path. One-iter fix: thread await
   through (make `extract_from_minvent` async at its callers) or
   document as permanent map omit.

Verdict: **ACCEPT-WITH-DEBT**
