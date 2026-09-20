# Review 1650 — 597fb4f9 — `explode.c` explosionmask remainder (D-2691)

Metadata: commit `597fb4f9`, D-2691, `js/explode.js` only (net
-4 lines: clone deletions offset the two `impossible` arms). No
prior review claimed closed. Pops the brief-verified PARTIAL
`explosionmask` row and parks `adj_erinys` STALE in the same
iteration (playbook-legal stale-pop; see note below).

## Intent vs deliverable

Subject promises: impossible defaults + canonical resists_magm.
Diff actually delivers: local `resists_magm` clone + orphaned
`dmgtype` helper deleted, `resists_magm` joins the pre-existing
`./mondata.js` import, `await impossible(...)` in both `default`
arms, `explosionmask` sync→async with both call sites awaited.
Matches the promise.

## Inventory

Changed JS: `explosionmask` (js/explode.js:241) — MAGM arm
re-point + two defaults. Deleted: local `resists_magm` clone
(was :216) + local `dmgtype` (sole users were the clone's
species gates per D-log; canonical `dmgtype` export lives at
js/monsters.js:531 — sym.mjs output pasted in-session).
Re-pointed: `resists_magm` → `js/mondata.js:183` sync export
(sym.mjs pasted; the mhitm.js/zap.js clones pre-date it and are
out of scope). `AD_MAGM`/`AD_RBRE`/`PM_BABY_GRAY_DRAGON` consts
stay — still used elsewhere in file (grep: :247/:277/:474/:566).

## C ↔ JS fidelity

C locus: `explosionmask` `explode.c:25–115` (csym, 91 L — whole
body read). Callers: C `:366` hero / `:375` mtmp → the only two
JS call sites (:519, :525), both awaited; `explode()` is async.
No other `explosionmask` caller exists (grep this session), so
the sync→async flip strands nothing. `impossible` was already
imported (js/explode.js:42); `await` on it is harmless either
way. No RNG in C.

- Defaults: C `default: impossible("explosion type %d?", adtyp);
  break` with `res` staying `EXPL_NONE` → JS `await impossible`
  + `return EXPL_NONE`. C's early-return shape vs C's
  set-then-return shape are equivalent on every arm (each case
  assigns at most once and breaks). Confirm.
- Monster MAGM: old clone tested species gates only
  (AD_MAGM/baby-gray/AD_RBRE); C `mondata.c:214–244` adds the
  wielded-weapon `defends(AD_MAGM)` + worn/carried `ANTIMAGIC`
  `oc_oprop` / carried-artifact scan. The canonical import
  (body read in-session) ports the full scan. A monster
  carrying magic-resisting gear now reads `EXPL_MON` per C.
  Confirm.
- Hero MAGM (`Antimagic` → `EXPL_HERO`) and the other six adtyp
  arms are D-0968/0971/0973, byte-unchanged here. Confirm by
  diff (only MAGM-import line + defaults + awaits changed).

Classify: `resists_magm`/`impossible` = LIVE imports; no CLONE
added; no STUB in any live arm. The map comment drops the
"resists_magm worn/artifact ANTIMAGIC scan" omit line (observed
in the map diff) — correct retirement, not silent.

Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide check at end of audit).

## Hallucinations / overclaim

None on `explosionmask`. One adjacent note (not this commit's
overclaim, tracked for the next SHA): this iteration parked
`adj_erinys` STALE ("restgamestate caller in unported
save-infra") — the very next commit `bddd66f8` (D-2692) is
titled "corrects D-2691 Stale park", i.e. the park's caller
audit missed a wireable restore caller. The park's body-live
claim is assessed under review 1651; the correction existing
one commit later is the process working, but the Stale falsifier
("rescore blocking on adj_erinys") should have been
caller-complete before parking.

## Density

Net-negative remainder close-out of the row's last two gaps
(D-0968/0971/0973 shipped the eight arms). Same density logic
as review 1649: the row is now fully shipped, nothing left to
pad with. Acceptable.

## Verification

D-log Verify pattern per siblings. Re-ran
`hidden-proxy.mjs verify explosionmask --base 597fb4f9~1
--reach-all`: "0 blocked (0 at baseline…)" — vacuous note
properly stated — plus "24 PASS, 0 regressed → REACH-OK". No
REGRESSED. Queue row cited 0 blocks, so honest, not D-1831.

## Actionable C-wrongs

None in this commit. (The adj_erinys caller question belongs to
review 1651, where D-2692 ships the fix.)

Verdict: **ACCEPT**
