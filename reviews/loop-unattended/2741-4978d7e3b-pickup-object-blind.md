# Review 2741 — 4978d7e3b — pickup_object Blind gate (D-3883)

## Metadata

- SHA: `4978d7e3b` (cliff-head writer port)
- D-entry: D-3883; Ledger: `pickup_object` in `pickup.c`
- js diff: `js/pickup.js` (+3/−1), one predicate
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: the `:1817` gate read the stale `u.Blind`
flat, so a blind `,` pickup observed the wished artifact and the
second blast named it at Monk-582601 s722; reading live
`Blind()` moves the session s722→PASS.

The diff actually adds: `if (!game.u?.Blind)` →
`if (!Blind())` with the youprop.h cite + staleness cause.
Promise == deliverable.

## Inventory

- `pickup_object` (`js/pickup.js:1609`, async) — predicate-only
  change; signature, callers, and all other arms untouched.
- Classification: no helper added — re-point from a dead flat
  read to a **LIVE** callee, the canonical `Blind()` export
  (`js/invent.js:371`). Required `sym.mjs` paste:

```
Blind            js/invent.js:371   sync
         !! ALSO 30 LOCAL CLONE(S) in 30 files — IMPORT the export; do NOT add another
           js/apply.js:1056  js/artifact.js:1910  js/detect.js:134  ...
```

No clone was added (the import already existed at `:23`, no new
edge — `--can` ALREADY as claimed); the 30 clones elsewhere are
pre-existing, correctly out of scope.

## C ↔ JS fidelity

C loci, read from pinned C: `pickup_object` body
`pickup.c:1802–1888` (`csym.mjs` range), the gate `:1817`
(`if (!Blind) observe_object(obj);`), `youprop.h:103`
(`#define Blind ((HBlinded || EBlinded) && !BBlinded)`).

Branch-by-branch confirm:

- Live `Blind()` (`js/invent.js:371–375`) reads
  `((HBlinded||EBlinded) && !BBlinded)` from live flats (+ the
  roleplay arm) — the macro exactly. The worn blindfold carries
  extrinsic `EBlinded`, which this read sees.
- The old flat read was C-wrong as claimed: this audit greps
  only three `u.Blind =` writers in all of `js/` (a do.js
  flash-context sync and a lock.js sticky save/restore pair) —
  no worn-blindfold sync — so the flat was stale-false under the
  worn blindfold and the blind pickup wrongly observed. The
  symptom fits: first blast (wish-grant path, no observe)
  matched; only the `,` pickup path diverged, and only in the
  artifact-name half of the topline.

No RNG in this gate on either side.

## Hallucinations / overclaim

None. The D-log claims the `touch_artifact` hidden PASS plus the
vacuous `pickup_object` line reported as vacuous (not a PASS),
and a focused test red→green. No cheat markers in the hunk;
Rule #2 clean (review 2735 scan).

## Density

Cliff-head writer port with a full PASS — right density. Owner
`touch_artifact` (artifact.c:951 divergence) correctly not
re-ported; the writer is the observe gate one frame up.
`pickup_object` stays whole vs C `:1802–1888` with every arm
named live. One cliff, code + ledger + verify in one handoff.

## Verification

Re-measured by this audit
(`verify touch_artifact,pickup_object --base 4978d7e3b~1 --reach-all`):

- `verify touch_artifact`: 1 PASS, 0 worse → PROGRESS
  (Monk-582601: PASS — exactly the ship-time landing).
- `reach touch_artifact`: 69/69 PASS → REACH-OK.
- `verify pickup_object`: 0 blocked — vacuous, as stated.
- `smoke pickup_object`: 24/24 PASS → REACH-OK.

No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
