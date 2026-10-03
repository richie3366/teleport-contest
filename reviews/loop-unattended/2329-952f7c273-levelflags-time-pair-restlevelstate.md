# Review 2329 — 952f7c273 — levelflags time pair + restlevelstate

**SHA:** `952f7c273` — "`restore.c`/`save.c` levelflags time pair + restlevelstate (live exports, wire-format omissions, dorecover no-ops wired) (D-3374)."
**Scope:** js/restore.js +18, js/save.js +27/−5, scripts/adjust-levelflags.test.mjs (new, 81 lines). No `sym.mjs` re-point (no clone deleted) — sym output below is export-shape confirmation only.
**Prior reviews closed:** none (no Must-fix cited; queue head coverage row).

## Intent vs deliverable

Promise: live same-name exports for `rest_adjust_levelflags`, `save_adjust_levelflags`, `restlevelstate`, with the two `dorecover` no-op sites wired and a maintained test.
Diff actually adds: exactly that — 3 exports (2 one-line converter calls, 1 empty body), 2 `restlevelstate()` call sites in `try_restore_save`, import extension on the existing save.js→restore.js edge, and the 7-case test. No scope drift.

## Inventory

| # | JS symbol | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | `rest_adjust_levelflags` js/restore.js:153 | C callee port (whole body) | restore.c:1313–1318 |
| 2 | `save_adjust_levelflags` js/save.js:469 | C callee port (whole body) | save.c:569–574 |
| 3 | `restlevelstate` js/restore.js:333 | C callee port (whole body, empty in C) | restore.c:740–749 |
| — | `relative_time_to_moves` / `moves_to_relative_time` js/restore.js:133/:119 | pre-existing LIVE callees, unwired before | restore.c converters |

`sym.mjs` (current tree): `rest_adjust_levelflags js/restore.js:153 sync`, `save_adjust_levelflags js/save.js:469 sync`, `restlevelstate js/restore.js:333 sync`, both converters sync. All exported, sync like C (`void`, no I/O).

## C ↔ JS fidelity

**`rest_adjust_levelflags`** (C restore.c:1313–1318): 1-line body `relative_time_to_moves(&svl.level.flags.stasis_until)`. JS calls the live converter on `game.level && game.level.flags, 'stasis_until'` — exact pointer analogue plus a missing-level guard the test pins. Callers per `--callers`: restore.c:1117 (getlev) + save.c:522 (savelev post-write restore) — both match the D-log, both NAMED as wire-format omissions (JSON holds absolute `stasis_until`; lev_json.js serLevel :800 spread-verbatim / deserLevel :859 copy-back verified in prior reviews; a literal add-back would double). The restmon edog `:355–356` precedent for the same skip is real (js/restore.js:197–200). No RNG. **Confirm.**

**`save_adjust_levelflags`** (C save.c:569–574): 1-line body `moves_to_relative_time(&svl.level.flags.stasis_until)`. JS mirrors it. Sole caller save.c:520, NAMED for the same absolute wire (no ser relativize step exists). **Confirm.**

**`restlevelstate`** (C restore.c:740–749, staticfn): intentionally empty (`:744–747` note + `:748` bare return). JS is an empty exported function — whole body. Both C callers (dorecover :827 + :900, `--callers` confirms; the other 3 refs are fwd-decl, comment, comment) are wired: JS :1029 sits after restgamestate+init_oclass_probs analogues before the restlevelfile loop (C :827 context verified: unconditional, after `init_oclass_probs()`, before `restlevelfile`), JS :1070 after current-level install before the Rogue arm (C :900 context verified: unconditional, after `getlev`+`close_nhfile`, before `something_worth_saving=1` and the :905 Rogue arm). No guarding `if` on either C site; no JS site calls from a function C never calls from. Empty body ⇒ zero behavioral risk. **Confirm.**

Callee closure: each arm's single callee is LIVE (converters) or none (empty body). No clones, no stubs, no OMIT-in-arm.

Quoted C (csym ranges — the entire bodies under review):

```c
/* restore.c:1313–1318 */  void rest_adjust_levelflags(void) {
    /* adjust timestamps */
    relative_time_to_moves(&svl.level.flags.stasis_until); }
/* save.c:569–574 */       void save_adjust_levelflags(void) {
    /* adjust any timestamps */
    moves_to_relative_time(&svl.level.flags.stasis_until); }
/* restore.c:740–749 */    staticfn void restlevelstate(void) {
    /* Note: restoring steed and engulfer/holder/holdee is now handled
     * in getlev() and there's nothing left for restlevelstate() to do. */
    return; }
```

C converter semantics (the behavior the exports inherit): `moves_to_relative_time` = `*ts = prevts - moves`; `relative_time_to_moves` = `*ts = moves + prevts` — JS adds only `|0` coercion and a null-holder guard. dorecover wiring contexts (both unconditional, no guarding `if`): :827 follows `init_oclass_probs()` before the `restlevelfile` loop; :900 follows `getlev`+`close_nhfile` before `something_worth_saving=1` and the :905 Rogue arm — JS :1029/:1070 preserve both positions.

| Callee | Status | Evidence |
|---|---|---|
| relative_time_to_moves | LIVE | js/restore.js:133, pre-existing export |
| moves_to_relative_time | LIVE | js/restore.js:119, pre-existing export |
| restlevelstate callees | none | empty body in C |

## Hallucinations / overclaim

None. "Whole C bodies" is literally true (1-line / 1-line / empty). Verify bullet says "hidden note (0 blocked … normal for coverage)" — correctly not a PASS claim. Wire-format omissions are named in the D-log **and** the map-adjacent doc comments, with mechanism citations.

## Density

Breadth phase, §2b: 3 whole C functions of one restore/save closure (the :520–522 pair halves + the dorecover no-op), each with its own C-locus / Callers / Verify / Named-omissions sub-bullets and its own `Ledger:` entry (all three `ported`). ~60 js/ insertions is below the ~80 bar; the D-log Status states the density exception with the D-3371/review-2326 precedent (head's file holds only `restore_menu` more Open, excluded with a Rule #2 design reason). Not one-C-file-pure (save.c ships as the pair half) but a genuine callee closure, ≤10 fns, no Must-fix bundled. Verdicts: fn1 whole, fn2 whole, fn3 whole — SHA verdict is the best/worst unanimous.

## Verification

Re-measured myself (`hidden-proxy.mjs verify <all three> --base 952f7c273~1 --reach-all`): per function, "0 session(s) blocked" + vacuous-note + "smoke … 24 PASS, 0 regressed → REACH-OK". Matches the D-log exactly; no REGRESSED, no WORSE. Verbatim summary lines:

```text
verify rest_adjust_levelflags: … 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke rest_adjust_levelflags: no RNG-tagged reach; fixed smoke spread (24 run, 11.0s): 24 PASS, 0 regressed → REACH-OK
verify save_adjust_levelflags: … 0 session(s) blocked … (identical shape)
smoke save_adjust_levelflags: … 24 PASS, 0 regressed → REACH-OK
verify restlevelstate: … 0 session(s) blocked … (identical shape)
smoke restlevelstate: … 24 PASS, 0 regressed → REACH-OK
``` Cohort/green/strict claims are the verify.mjs tail (7/7 cohort, seed0013 pair 2/2 PASS with exact RNG counts) — plausible and consistent with the empty-body/unwired nature of the change. `imports.mjs --rulecheck` run at iteration end (see review 2337). Diff grep: no FORCE/DIAG/getRngLog/fastforward; the two `seed0013` hits are the commit message and a pre-existing comment, not control flow. Scoreboard hunk in this SHA rewrites only the header (`full:false` stamp), no row edits — no vacuous-baseline rewrite.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
