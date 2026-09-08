# Review 1100 — 1bb96408 — hold_another_object refuse arm stops printing drop_fmt (D-2134)

Metadata: SHA `1bb96408`, `js/invent.js` +3/−1 only. Queue row
`artifact.c` touch_artifact, scen-genesis-Valkyrie-92094 step 73/113,
screen-first at `artifact.c:966`: C «The pair of lenses named the
Eyes of the Overworld evades your grasp!» vs JS the same topline +
`--More--`. Recipe: wish the Eyes, Enter at 72, space at 73. No
prior review claimed closed.

## Intent vs deliverable

Subject promises: JS printed a `drop_fmt` oops line where C prints
nothing, leaving a dangling `--More--`. Diff actually does: deletes
the `await hold_drop_msg()` call on the refuse arm, replacing it
with a C-cite comment. Promise matches diff — a pure deletion fix.

## Inventory

Changed JS: `hold_another_object` refuse arm (invent.js:7192).
Callees touched: none — one call removed (`hold_drop_msg`, kept for
`drop_it`). No new imports/edges, no TDZ risk, no DIAG/FORCE/seed
gates; `imports.mjs --rulecheck` clean at HEAD.

## C ↔ JS fidelity

C `hold_another_object` (`csym.mjs`, invent.c:1207–1306): the refuse
arm is `if (!touch_artifact(...)) { obj_extract_self(obj);
dropy(obj); return obj; }` — no pline; `drop_fmt` sounds only in the
`wasUpolyd && !Upolyd` arm below it. JS now returns after
`obj_extract_self` with no pline — matches C's observable message
behavior exactly. Residual gap, correctly not shipped as silent:
C's `dropy(obj)` (put-it-back-on-the-floor) stays deferred in JS,
and it is **named**, not hidden — `turns.md:1193` section records
"artifact-refuse arm prints nothing (D-2134...)" alongside the still
named "fatal wished corpse / artifact `dropy`+wasUpolyd+crysknife".
The rename from behavior to named-omission is therefore queueable
map debt, not a C-wrong: dropping the wrong message was the
session-blocking bug, and the floor-placement nuance affects no
recorded divergence this iter. The D-log's RNG account (C step-73
`rn2(100)=59 @ makewish` = `rn1(100,50)` after return; JS slice was
empty pre-fix behind the pending More) is consistent with a
message-timing, not logic, divergence.

## Hallucinations / overclaim

None. "Exact C order" holds for what ships (extract → return); the
entry does not claim `dropy` was ported. Touch_artifact itself is
correctly identified as symptom owner (evade pline byte-identical
both sides per D-2010), not re-ported.

## Density

+3/−1 against a 5-line C arm — C is that small. A deletion is the
whole fix; nothing more exists to port. Right-sized per §2b.

## Verification

D-log Verify bullet shows `verify.mjs --fn touch_artifact` → hidden
1 PASS (Valkyrie-92094) + green 2/2 + strict ×2 + cohort 7/7.
Re-measured: `hidden-proxy.mjs verify touch_artifact --base
1bb96408~1` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (Valkyrie-92094: PASS). Claim true. Bonus diligence in the
D-log (parked `dump_artifact_info` falsifier FIRED: Priest-92136
dump@126 → dog_goal@136 via the same fixed arm, re-queued under
dog_goal) is corroborating, not padding.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
