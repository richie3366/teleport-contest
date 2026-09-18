# Review 1418 — 4cc1fd66 — mon_arrive whole-body completion (D-2459)

Metadata: SHA `4cc1fd66`, `js/dog.js` (+212/−37) + `js/wizard.js`
resurrect arm. Coverage gap (0 blocked at baseline), not a corpus fix.
D-log: D-2459.

## Intent vs deliverable

Promise: the missing head (worm/isshk), Wiz_arrive, debug_fuzzer portal +
no-portal impossible, the failed_to_place tail, and the Before_you +
resurrect callers. Diff ships all five, plus a module-local `relmon`,
an exported `mon_arrive` dispatcher, and the losedogs Before_you loop +
failed_arrivals drain. No second subsystem.

## Inventory

- Added (dog.js, module-local like C's file scope): `Before_you/With_you/
  After_you/Wiz_arrive` consts (C `dog.c:15–19` values 0/1/2 + −1),
  `failed_arrivals`, `relmon`, `arrive_stairway_find_dir`,
  `mon_arrive_link`; exported dispatcher `mon_arrive`.
- Reused, not added: `mon_arrive_with_you` / `mon_arrive_after_you` bodies
  (head calls factored into `mon_arrive_link`).
- New static edges: `get_wormno`/`initworm` (worm.js, both sync — safe in
  the sync link fn), `set_residency` (shk.js, sync; `--can`: ALREADY),
  `Is_qstart` (quest.js), `builds_up` (hacklib.js),
  `mon_leaving_level`/`m_into_limbo` (mon.js, both async, both awaited).
  wizard.js→dog.js edge ALREADY existed (`--can`: no new edge).
- `sym.mjs` on re-pointed symbols: no local clone was deleted or
  re-pointed to an import; `mnearto_no_yank`/`arrive_track_clear` remain
  the single in-file helpers, awaited at the new call sites.

## C ↔ JS fidelity

C `dog.c:419–623` vs JS, arm by arm:

- Head (`:430–442` via `mon_arrive_link`): STILL_ARRIVING + fmon prepend
  (`unshift` = `nmon` prepend), isshk → `set_residency(FALSE)`, long-worm
  `get_wormno`/`initworm(num_segs)` else `wormno = 0` — exact, including
  the baby-worm no-`is_longworm` shape.
- Shared middle (`:454–464`): STRAT_ARRIVE, `~(MIGRATING|LIMBO)`, mux/muy,
  mtrack read, track clear, `restore_cham`, usteed early return — exact in
  both helpers.
- With_you (`:466–478`): `!MON_AT && !rn2(tame?10:peaceful?5:2)` gate,
  `rloc_to`/else `mnexto`, STILL_ARRIVING clear + return — pre-existing
  body intact, verified present.
- Wiz_arrive (`:481–485`): `xyloc0 = MIGR_WITH_HERO` override — exact.
- Catchup/wander + xyloc switch + LEFTOVERS + `mx=0/my=xyflags` +
  `mnearto`/`rloc` place — pre-existing, untouched.
- Portal arm (`:551–571`): endgame rn1 (pre-existing) + new fuzzer
  `stairway_find_dir(!builds_up)` arm + `qexpelled && (Is_qstart(uz0) ||
  Is_qstart(uz))` impossible + FALLTHROUGH comment — exact. The local
  `arrive_stairway_find_dir` is a verified CLONE of `stairs.c:78–86`
  (first `up`-matching stairway); mklev.js's same-named loop (`:389`) is
  itself module-local, so no import existed to reuse — documented in the
  comment, loop matches C line-for-line.
- Tail (`:607–622`): `failed_to_place` return capture (previously
  discarded), `when != Wiz_arrive` → `relmon` else `m_into_limbo`,
  STILL_ARRIVING clear — exact.
- `relmon` vs C `mon.c:2559–2594`: `mon_leaving_level` ("take off the
  map") + fmon unlink + list prepend (`unshift`) + C panics as
  `impossible` — exact. (Nit, not a wrong: JS still unshifts onto the
  list after the not-found impossible where C would have aborted; the
  arm is unreachable by construction.)
- losedogs vs C `dog.c:303–416`: per-call `failed_arrivals` reset;
  Before_you EXACT_XY loop (`:366–374`) with in-loop unlink; mydogs drain
  (`:379–383`, for-copy over `[]`-reset = C while-pop); After_you
  non-EXACT loop (`:390–399`); drain re-links onto fmon before
  `m_into_limbo` (`:403–415`, C comment mirrored) — exact. Kops-dismiss
  scan stays named with its line range.
- resurrect vs C `wizard.c:730–756`: iswiz + no-amulet + `elapsed > 0`
  search, catchup, `LARGEST_INT` clamp, `elapsed/50` trunc, msleeping
  `rn2(elapsed+1)`, `mfrozen==1` unfreeze, `helpless` =
  `msleeping||!mcanmove` (`monst.h:251`, inlined + cited), pre-arrival
  splice, `mon_arrive(−1)`, `!mx → null`, break — exact, RNG in C order.
  SetVoice/Deaf acoustics stay named (pre-existing).

## Hallucinations / overclaim

None. "0 blocked" is framed as a coverage gap; every deferred item is
named with a C line range. The `--reach-all` 123/123 figure is real
(re-run below).

## Density

One C function family (dispatcher + 4 call sites), two already-coupled
modules, 209 insertions: right-sized.

## Verification

- `hidden-proxy verify mon_arrive --base 4cc1fd66~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); 123 baseline-PASS
  reachers, 123 PASS, 0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Whole family ports C in order.

Verdict: **ACCEPT**
