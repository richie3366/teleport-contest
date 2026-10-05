# Review 2373 — 77a859fd3 — Must-fix launch_obj wall-stop + stackobj (D-3428)

- SHA: `77a859fd3` — "Must-fix review 2372: launch_obj wall-stop + tail stackobj extras (2 deletions) (D-3428)."
- D-entry: D-3428. Diff: js/trap.js (+3/−3: 2 code deletions + doc envelope), new scripts/launch-obj-wallstop.test.mjs (147 lines), ledger trap.c row, review stamp 2372.2, docs + scoreboard.
- ≤10-function SHA: the whole Method runs on the single function `launch_obj`.

## Intent vs deliverable

Promise (review 2372 Actionable 2): delete (a) `|| IS_OBSTRUCTED(typ)`
from the launch_obj lookahead wall-stop (C trap.c:3556 stops at
STWALL/TREE only) and (b) the tail `stackobj` (C :3568–3572 has none),
plus a targeted boulder-vs-secret-door test.

Diff actually delivers: exactly those 2 deletions, a doc-envelope
update with C cites, and a 4-case maintained test. No imports changed,
no signature changes. `stackobj` remains used ×8 elsewhere in trap.js
(:840/:932/:1260/:2469/:2538/:4073/:5829/:7378 — claim verified), so no
dead import; `IS_OBSTRUCTED` remains at the C-faithful bmsg arm.

## Inventory

```text
launch_obj | ported | js/trap.js:2634 | trap.c:3259-3575 (csym range)
```

## C ↔ JS fidelity

Walked the JS roll tail against pinned C (trap.c:3505–3575 read with
line numbers; csym range trap.c:3259-3575; callers hack.c:612,
trap.c:2672/2695):

- Wall-stop: C :3557 `} else if (IS_STWALL(typ) || IS_TREE(typ)) {` —
  JS :2930 is now character-equivalent. `IS_STWALL` is `typ <= DBWALL`
  (js/const.js:2322) ≡ C rm.h:118 `(typ) <= DBWALL`. Boulders now roll
  through SDOOR/SCORR like C; STWALL still stops. Exact.
- Rest tail: C :3568–3572 `otrapped = 0; place_object; newsym;
  return 1` — JS :2946–2949 matches with no stackobj. `return 2` tail
  also present. Exact.
- Kept `IS_OBSTRUCTED`: C :3518 uses it for the boulder-meets-boulder
  bmsg choice; JS keeps it at the same arm — genuine C, correctly kept.
- Callers: all 3 C sites wired — hack.c:612 → js/hack.js:1193
  (`ROLL | LAUNCH_KNOWN`, verified in body); trap.c:2672/2695 →
  `trapeffect_rolling_boulder_trap` js/trap.js:2953+ (verified launch_obj
  calls with trap launch coords). No helper classification needed (pure
  deletion; no new symbols — `sym.mjs launch_obj` → single async export,
  no clones).
- Thump!/wake arm at the stop (:2931–2933: `!Deaf` pline + wake_nearto
  16) matches C :3559–3561.

## Hallucinations / overclaim

None. The D-log's rock-vs-boulder nuance (rocks merge mrg=1 so the
deleted stackobj was observable there; boulders never merge oc_merge=0)
is accurate and correctly frames why the deletion moves toward C for
every otyp. Pre-fix measurements (SDOOR rest (12,10), rock q2) are
consistent with the deleted code paths.

## Density

Must-fix iteration (ships alone, no manifest): one function, whole,
both contradictions deleted. No Left open, no bundled items, no drive-bys.

```text
launch_obj ACCEPT (ported; both 2372.2 contradictions deleted)
```

## Verification

- Re-measured (`verify launch_obj --base 77a859fd3~1 --reach-all`): 0
  blocked at baseline (vacuous, as D-logged — review-cited, not
  corpus-cited) + fixed smoke 24/24, 0 regressed → REACH-OK. Matches
  the D-log claim line for line; no D-1831 vacuous-PASS issue.
- `node --test scripts/launch-obj-wallstop.test.mjs`: 4/4 PASS (this
  review's run). Test uses a harness seed (2372) for its own RNG init —
  unit-test scaffolding, not production seed logic.
- `imports.mjs --rulecheck`: Rule #2 clean across scored `js/`.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.

## Actionable C-wrongs

None. Review 2372 Actionable 2 is fully closed; the **Addressed:**
D-3428 stamp on review 2372 stands (hash `77a859fd3` filled by a later
commit per protocol — filled in this audit's grouped commit).

Verdict: **ACCEPT**
