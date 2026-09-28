# Review 1959 — 9600a44be — Must-fix use_saddle WOUNDED_LEGS mirror (D-2999)

Metadata: SHA `9600a44be`, D-2999, Must-fix for the 2026-09-28
rescore row (`use_saddle` blocking 2 corpus sessions). Stat:
`js/timeout.js` (+14/−1), `js/trap.js` (+11), `js/steed.js`
(doc-only +3/−1), `scripts/wounded-legs-mirror.test.mjs` (new).
No prior review file for this SHA on disk.

## Intent vs deliverable

Subject promises: Must-fix `use_saddle` blocks — the
`nh_timeout` WOUNDED_LEGS flat-only tick + `heal_legs` flat-only
clear left the uprops slot stuck so mount_steed refused sound
legs. The body corrects the queue row's order theory with C
cites, names cut-probe measurements (slot stuck at 30/8 while
flats read clean), and scopes the fix to the ticker arm plus the
ticker-bypass heal.

Diff actually adds: OR-read + dual-write in the WOUNDED_LEGS
ticker arm, slot TIMEOUT clear in `heal_legs`, one import name on
the existing trap→const edge, and the D-1008 doc retirement.
Promise and diff match; `use_saddle` itself untouched by design.

## Inventory

- `nh_timeout` WOUNDED_LEGS arm (CHANGED, `js/timeout.js:1046`):
  flat-only `--` → flat‖slot OR-read + dual-write of `next`.
- `heal_legs` (CHANGED, `js/trap.js:3577`): flat zeroing + slot
  TIMEOUT-field clear (masked).
- `use_saddle` doc (CHANGED, comment only): two D-1008 omits
  retired stale. No body change.

## C ↔ JS fidelity

Decisive C fact, `nethack-c/upstream/include/youprop.h:136`:
`#define HWounded_legs u.uprops[WOUNDED_LEGS].intrinsic` — single
storage. JS keeps dual storage (flat + slot), so the mirror is
the faithful rendering, and it follows the in-tree DEAF idiom
(`js/timeout.js:1123`, D-1817) line for line: OR-read, `next =
hw-1`, flat write, slot write masked to TIMEOUT (non-TIMEOUT
slot bits preserved), expiry → `heal_legs(0)` +
`stop_occupation()` matching C `timeout.c:774–777` case
WOUNDED_LEGS. The reader side confirms the diagnosis:
`mount_steed`'s `woundedNow()` (`js/steed.js:616`) OR-reads
flat‖slot‖`Wounded_legs`, so a stuck slot refused the mount
exactly as observed. RNG: none on either side of these arms.

`heal_legs`, `csym` range `do.c:2448–2486` (JS lives in trap.js,
a file split): C `:2472` zeroes the single field
(`HWounded_legs = EWounded_legs = 0L`). JS zeroes the three
flats and now masks the slot TIMEOUT field — the same zeroing
step, in position between the flats and the `how==0`
`encumber_msg()` gate. Full-body spot-check: Wounded gate, botl,
DEX++, usteed/how!=2 suppression, body_part(LEG) + BOTH_SIDES
plural, vtense message all present in C order. Callees
(`pline`, `encumber_msg`) LIVE; no new callee, no clone, no
stub. Nothing deleted or re-pointed (WOUNDED_LEGS joins the
pre-existing trap→const edge — parent tree already imports from
`./const.js`), so no re-point `sym.mjs` output is owed.

Stale-retirement facts re-checked: `update_mon_extrinsics(mtmp,
saddle, true, false)` does run at `js/steed.js:290` inside
put_saddle_on_mon per C `steed.c:163` ✓; `body_part`/`HAND`
absent from C `steed.c:36–139` ✓. Callers per the D-entry
(`apply.c:4301`→`js/apply.js:2599`, `steed.c:187`→doride→
mount_steed) are pre-existing and unmoved.

Diff grep: one `DIAG` hit is the const name
WT_TOOMUCH_DIAGONAL — false positive, no diagnostic left. No
FORCE/getRngLog/fastforward/seed/TODO. Rule #2 re-verified
clean under 1956; no new edge, no `--can` owed.

## Hallucinations / overclaim

None — the entry actively falsifies: the queue row's "JS checks
wounded legs before C's target check" is corrected (C checks
wounded first too, `steed.c:228–238`), with cut-probe
measurements replacing the theory. "2 PASS → PROGRESS" is
reproduced verbatim below. The untouched CONFUSION arm
(same flat-only shape, no witness) is disclosed as not touched
rather than silently shipped.

## Density

Must-fix ships alone: one item (the WOUNDED_LEGS mirror) across
ticker + heal + doc. `Ledger: use_saddle ported`; Verify names
all three functions with per-function reach lines. Full 44/44
public suite run in-iteration (shared ticker file).

- `nh_timeout` WOUNDED_LEGS arm: C-single-storage rendered → OK.
- `heal_legs` addition: C zeroing mirrored → density OK.

## Verification

D-log: focused test 0/3 pre-fix (stash) → 3/3 post-fix;
`verify.mjs --fn use_saddle,heal_legs,nh_timeout` → PASS
(use_saddle 2 PASS → PROGRESS; reach 3/3, smoke 24/24, 14/14;
green 2/2; strict ×2; cohort 7/7) + full 44/44. Re-measured
here in one call:

```text
verify use_saddle: baseline 9600a44be~1 — 2 session(s) blocked on it (2 at baseline, 0 in the working scoreboard)
  scen-intrinsic-Ranger-92193: PASS
  scen-normal-Rogue-92209: PASS
verify use_saddle: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
reach use_saddle: 3 baseline-PASS session(s) reach it (3 run, 2.3s): 3 PASS, 0 regressed → REACH-OK
smoke heal_legs: no RNG-tagged reach; fixed smoke spread (24 run, 8.5s): 24 PASS, 0 regressed → REACH-OK
reach nh_timeout: 14 baseline-PASS session(s) reach it (14 run, 19.3s): 14 PASS, 0 regressed → REACH-OK
```

Both named sessions PASS; zero REGRESSED anywhere. No
seed/step/coordinate/RNG-index reads. The archived DONE row
carries `**Addressed:** D-2999`; the sibling mcalcmove row
correctly stays open for D-3000.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
