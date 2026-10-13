# Review 2787 — ec0e2af9b — clear_no_charge_obj OBJ_BURIED import

- **SHA:** `ec0e2af9b` (Tue 2026-10-13) — cliffs-head randomize_gem_colors writer (D-3934).
- **D-entry:** D-3934. **Ledger:** `clear_no_charge` + `clear_no_charge_obj` ported.
- **Diff size:** `js/shk.js` +1 name (import line) + new test (2 its). Board: 3 rows.
- **Method:** cliff commit — whole Method on the import + the C-exact body claim.

## Intent vs deliverable (promise vs diff)

The subject promises: `clear_no_charge_obj` was C-exact but read
never-imported `OBJ_BURIED`, so the first setpaid over a no_charge
item threw `ReferenceError`, voiding 3 step-0 sessions misattributed to
the first C draw; adding the name moves 2 → PASS and 1 → pickup@722
(2 place_object throw-voids stay, own writer).

The diff actually adds: `OBJ_BURIED` to the existing const.js import —
nothing else. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | import +`OBJ_BURIED` (shk.js:59) | obj.h:81 `#define OBJ_BURIED 6` | new edge on existing line (ALREADY) |
| 2 | `clear_no_charge_obj` body (:1867–1896, unchanged) | shk.c:328–373 (csym) | C-exact, verified arm-for-arm |
| 3 | test (setpaid-clear-no-charge-buried, 2 its) | recorded throw stack | new, 2/2 green at HEAD |

No function added, changed, deleted, or re-pointed; no `sym.mjs`
re-point output required. Values: C `OBJ_BURIED 6` ≡ JS const.js:1358
`6`. ✓

## C ↔ JS fidelity

C body (csym :328–373; D-log :329, off-by-one start): contents
recursion :334 → no_charge gate → clear-if `!shkp` / where∉
{FLOOR,CONTAINED,BURIED} :354–356 / `get_obj_location(…, CONTAINED |
BURIED)` fails :357 / !isok / roomno / !SHOP / deserted / rival.
JS restructures the OR-chain into early returns in the same order
(:1871–1896, cites :333–362 all land) — semantically identical, and
its doc comment already documented the :357 locflags subtlety before
the import existed, confirming the body was written C-exact with a
dropped name. No RNG either side. ✓

Throw mechanics check out: the ReferenceError fires at the where-gate
evaluation, reached only for no_charge items with non-null shkp (the
shkp-null path returns first on both sides) — matching the recorded
`setpaid → clear_no_charge → clear_no_charge_obj` stack. Same-family
sweep: all 8 `OBJ_*` names used in shk.js are now imported (audited by
enumeration); no second missing name. Callers ride pre-wired sites
(contents :1869, pets :1910, setpaid :4871–4872, hot_pursuit :1956 —
all present). ✓

Diff grep: one import token; no FORCE/DIAG/`getRngLog`/seed/
fastforward/coords. Rule #2: clean (this iteration, cited for all 8
SHAs).

## Hallucinations / overclaim

- "Focused test 1/2 pre-fix (authentic ReferenceError …) → 2/2":
  2/2 green at HEAD (re-ran); the const-value it pins C obj.h:81. ✓
- The void-paradox attribution (throw-void misattributed to C's first
  draw) is proven by the fix itself: an import-only change moves all
  three voids. Board diff: exactly the 3 claimed rows (2 →PASS,
  620021 →pickup@722), nothing else. ✓
- Nit: D-log cites the row "@4b12e08cd" but the 5/2296 numbers match
  the parent cef7a4808's board — stale tag, right row (same pattern as
  D-3931/D-3932).

## Density

Cliff phase (§10.18): parent head was randomize_gem_colors 5/2296
(verified in `ec0e2af9b~1:docs/LOOP-QUEUE.md`); Must-fix empty. Owner
proven whole and not re-ported (D-3932 read once per the history tag);
this ports the writer the first divergence names. One cliff, ledger
rows, movement + REACH-OK + full 44/44 in one handoff. The 2 unchanged
are correctly left for their own writer (place_object, named in Next
with the falsifier). ✓

## Verification

Re-measured myself (`--base ec0e2af9b~1 --reach-all`, current code):

```
verify randomize_gem_colors: baseline ec0e2af9b~1 — 5 session(s) blocked on it (5 at baseline, 2 in the working scoreboard)
  scen-shop-Priest-49959525: PASS
  scen-shop-Ranger-49959616: PASS
  scen-sweep-Wizard-620021: moved → pickup at step 722 (was 0)
  scen-worldtour-Wizard-49955018: still randomize_gem_colors at step 0
  scen-worldtour-Wizard-49955024: still randomize_gem_colors at step 0
verify randomize_gem_colors: 2 PASS, 1 moved past, 2 unchanged, 0 worse → PROGRESS
reach randomize_gem_colors: 2116 baseline-PASS session(s) reach it (2116 run, 1333.7s): 2116 PASS, 0 regressed → REACH-OK
```

The D-log's "2 PASS, 1 moved past, 2 unchanged" reproduces exactly,
session for session. Reach 2116/2116 with zero regressions — the 582706
flake from reviews 2784–2785 is correctly absent here (already FAIL at
this SHA's baseline, so outside the baseline-PASS reach set),
consistent with the trace that its flip predates this commit.

## Actionable C-wrongs

None. One-name fix, C-exact body verified, import family complete,
movement and full reach reproduce clean.

Verdict: **ACCEPT**
