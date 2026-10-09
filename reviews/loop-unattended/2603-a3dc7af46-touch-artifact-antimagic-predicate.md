# Review 2603 — a3dc7af46 — touch_artifact-head writer Antimagic predicate (D-3734)

Metadata. SHA `a3dc7af46` (2026-10-09), D-3734, parent `c7ac23d04`
(D-3733 no-js park). js diff: `js/artifact.js` +5/−7 (delete local
clone, add canonical import); new
`scripts/touch-artifact-blast-antimagic.test.mjs`. Ledger:
`touch_artifact` ported (D-3734 appended). No prior review claimed
closed.

## Intent vs deliverable

Promise (subject + D-log): cliffs-head `touch_artifact` (4
worldtour sessions, kind=rng, identical blast toplines): C
`d(2,4)=8` vs JS `d(4,4)=12` at `artifact.c:953`, gate `rn2(4)`
at `:945` agreeing — owner body already C-whole (D-2172/D-2134/
D-2010), so the deliverable is the `:953` `(Antimagic ? 2 : 4)`
predicate writer: artifact.js's local `Antimagic_hero` read flats
only while the hero's worn cloak-of-MR lives in
`uprops[ANTIMAGIC].extrinsic` (confer path writes uprops, no flat
mirror). Fix: delete the drifted clone, import canonical
`Antimagic` from mcastu.js. Claimed: 0 PASS + 4 moved + 0 worse,
REACH-OK.

Diff actually adds: the import (with youprop.h cite + `--can`
note) and the deletion of the 6-line local clone; both call sites
unchanged. Promise and diff match.

## Inventory

Changed JS functions (1 + 1 deletion):

- `touch_artifact` — `js/artifact.js:1569+` (call sites unchanged;
  predicate now canonical). C:
  `nethack-c/upstream/src/artifact.c:907–974` (`csym.mjs` range),
  gate `:945`, damage `:953`.
- Deleted: local `Antimagic_hero` (flat-only clone).
  C: `youprop.h:57` (`Antimagic ≡ HAntimagic || EAntimagic`).
- Imported: `Antimagic` — `js/mcastu.js:97` (canonical port).

Ledger line present: `touch_artifact` ported, `at` + D-3734.

## C ↔ JS fidelity

C `artifact.c:945`: `(badalign && (!yours || !rn2(4)))` — gate
agrees both sides (D-log states matched prefix 2613 + gate match;
the focused test pins the post-gate draw). C `:953`: `dmg =
d((Antimagic ? 2 : 4), (self_willed ? 10 : 4))` (verified by read).
C `youprop.h:57`: `#define Antimagic (HAntimagic || EAntimagic)`
with H/E ≡ `u.uprops[ANTIMAGIC].intrinsic/extrinsic` (verified).
RNG call-for-call: the predicate selects ndice 2 vs 4 — C draws
`d(2,4)`, JS drew `d(4,4)`; fixing the predicate restores the C
keystream from `:953` on.

Deleted clone: `!!((u.Antimagic|0) || (u.HAntimagic|0) ||
(u.EAntimagic|0))` — flats only, missing uprops. Canonical
`mcastu.js:97–102` (verified by read): flats OR
`uprops[ANTIMAGIC].intrinsic/extrinsic` — a strict superset, so the
"no behavior change when flats already true" claim holds by
construction; the only behavior change is uprops-only cases (worn
cloak-MR, gray DSM) flipping false → true, which is C. Branch order
and all other arms untouched.

Clone classification: textbook local-clone → LIVE-import repair
(playbook §9: `sym.mjs` first, IMPORT the export). Callee
`Antimagic` LIVE. No STUB. Remaining flat-only `Antimagic` clones
in 8 other files are out of scope; `mhitm.js:588` is explicitly
named-with-reason in the D-log (different trigger, touch-of-death
path already imports mcastu's) — correct "ship if a board row
names it" handling.

`sym.mjs` (REQUIRED — symbol the diff re-points, local → import):

```text
Antimagic        js/mcastu.js:97   sync
             !! ALSO 8 LOCAL CLONE(S) in 8 files — IMPORT the export; do NOT add another
               js/explode.js:171  js/mhitm.js:588  js/muse.js:466  js/potion.js:1706  js/pray.js:240  js/sit.js:187  …and 2 more
```

The deleted artifact.js clone is gone from the list; the canonical
export stands. Import check: `imports.mjs --can artifact.js
mcastu.js Antimagic` → "ALREADY: artifact.js already statically
imports mcastu.js" — stronger than the D-log's "SAFE" claim: an
import-name addition on an existing edge, no new edge, no cycle/TDZ
question at all.

## Hallucinations / overclaim

None. Owner-vs-writer discipline is explicit (owner proven whole,
predicate named as deliverable, all 4 probes at the same `:953`
locus with per-session artifacts listed). The D-2172 history tag is
distinguished by arm (wishing-deny short-circuit vs damage
predicate), not hand-waved. Diff grep: no `FORCE`, `DIAG`,
`getRngLog`, `fastforward`, or coordinate/seed conditionals. Rule
#2: clean (global re-check this audit).

## Density

Cliff-phase §2b: at the parent commit the generated cliffs head is
`touch_artifact` — 4/1113 sessions, RNG lost 273974, top row
(verified via `git show c7ac23d04:docs/LOOP-QUEUE.md`). This commit
works its HEAD's cliffs head through the writer the divergence
names — legitimate §10.18/§10.19. One cliff, one predicate, code +
ledger + verify + focused test in one handoff. Whole-function
question: owner body already whole per ledger + cited D-rows; the
shipped unit (predicate writer) is the correct atomic deliverable,
not an arm sold as the function.

## Verification

D-log Verify (`verify.mjs --fn touch_artifact`): focused test
pre-fix FAIL with the exact stray draw → post-fix 1/1 PASS;
`touch_artifact`: 0 PASS + 4 moved + 0 worse → PROGRESS with
per-session targets; reach 19/19 → REACH-OK; syntax/rule2/green/
strict/cohort PASS → VERIFY: PASS.

Re-measured by this audit
(`verify touch_artifact --base a3dc7af46~1 --reach-all`;
`js/artifact.js` + `js/mcastu.js` untouched between this SHA and
HEAD):

```text
verify touch_artifact: 0 PASS, 4 moved past, 0 unchanged, 0 worse → PROGRESS
reach touch_artifact: 19 baseline-PASS session(s) reach it (19 run): 19 PASS, 0 regressed → REACH-OK
```

Per-session targets identical to the ship claim (95213 →
swim_move_danger@813; 95216 → mattackm@726; 95235 →
mattackm@480; 95237 → inside_gas_cloud@393 — all strictly later
steps), 0 worse, 0 regressed, 0 sessions blocked on the owner in
the working scoreboard. No vacuous check (row cited 4; all 4 moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
