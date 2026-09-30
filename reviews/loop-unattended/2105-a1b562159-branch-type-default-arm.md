# Review 2105 — a1b562159 — dungeon correct_branch_type default arm

- SHA: `a1b5621596b0479f2e2e6c088425c0830fd47045` (D-3145)
- Date: 2026-09-30. `js/` delta: +7/−1 (`js/dungeon.js` only).
- Cluster: `correct_branch_type` default-arm completion + `traverse_mapseenchn`
  stale + queue-head `obj_erode_type` stale.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "`dungeon.c` branch-type default arm + mapseen traverse
stale (coverage)". Diff actually adds: a C-ref comment (`:494–496`) and a
`default:` arm calling `void impossible('correct_branch_type: unknown branch
type')` before `return BR_STAIR` (`:502–505`). No new functions, no new
helpers, no import changes. Promise matches deliverable exactly.

## Inventory

| JS function | Change | Class |
|---|---|---|
| `correct_branch_type` (dungeon.js:497, local — C is `staticfn`) | +`impossible` in default arm | whole-C-function completion (1 arm was missing) |
| `traverse_mapseenchn` (dungeon.js:3070, local — C is `staticfn`) | none (stale proof) | pre-existing, verified below |
| `obj_erode_type` (do_wear.js:3488, local — C is `staticfn`) | none (stale proof) | pre-existing, verified below |

Callee closure of the changed function: sole C callee is `impossible`
(dungeon.c:452) — LIVE (`js/display.js:8483`, async export, already imported
at dungeon.js:154; `void`-fired so the predicate stays sync, In_W_tower
precedent). No clones, no stubs, no omits.

`sym.mjs` output (required — no symbol deleted/re-pointed this SHA, but both
locals checked since `sym` flags them):

```text
correct_branch_type NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:497
impossible       js/display.js:8483   ASYNC — await required
traverse_mapseenchn NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:3070
obj_erode_type   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_wear.js:3488
```

All three C functions are `staticfn`, so file-local JS is the correct shape,
not clone drift.

## C ↔ JS fidelity

**`correct_branch_type`** — C `dungeon.c:439–454` (`csym` range cited):

```c
    switch (tbr->type) {
    case TBR_STAIR:   return BR_STAIR;
    case TBR_NO_UP:   return tbr->up ? BR_NO_END1 : BR_NO_END2;
    case TBR_NO_DOWN: return tbr->up ? BR_NO_END2 : BR_NO_END1;
    case TBR_PORTAL:  return BR_PORTAL;
    }
    impossible("correct_branch_type: unknown branch type");
    return BR_STAIR;
```

JS (`:497–506`) ports all four cases in C order with identical ternary
polarity, and the new `default:` arm runs `impossible` with the exact C
string then returns `BR_STAIR`. C has no `default:` label — control falls
out of the switch iff no case matches, which is exactly `default:`
semantics. No RNG in C; none in JS. Caller: sole C call site dungeon.c:527
(`add_branch`) → JS add_branch dungeon.js:635 wires `correct_branch_type`
(unchanged, confirmed by grep). Branch-by-branch confirm — no gap.

**`traverse_mapseenchn` (stale)** — C `dungeon.c:3343–3365`: loop over
`svm.mapseenchn`, `viewendgame ^ In_endgame` skip, `why != 0 ||
interest_mapseen` gate, showheader compare + `print_mapseen` + `*lastdun_p`
update. JS (`:3070–3079`): same loop, `!!viewendgame !== !!In_endgame(...)`
(XOR-equivalent on the 0/1 domain), same gate, same three tail statements
with the file's established `win→entries/ctx`, `int*→{v}` adaptation.
Stale-complete claim holds.

**`obj_erode_type` (stale head)** — C `do_wear.c:3259–3273`: 5-predicate
else-if chain + `ERODE_NONE` fallthrough. JS (`:3488–3495`): same 5
predicates in C order as sequential if-returns (equivalent to the else-if
chain) + same fallthrough. Stale claim holds.

Diff grep: no `FORCE`, `DIAG`, `getRngLog`, seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. No import added, so no
`--can`/TDZ question. Rule #2: `node scripts/imports.mjs --rulecheck` →
`Rule #2 clean: no bare/node specifiers or fs calls in js/.` (run this
iteration at HEAD; this SHA's 7-line diff adds no specifier).

## Hallucinations / overclaim

None. D-3145 says "default arm now void impossible … then return BR_STAIR"
— exactly what the diff does. No "Match C" dispatch-vs-callee split exists
(the only callee is live). Verify bullet reports hidden-note + smoke counts
that my re-run reproduces (below).

## Density

- Whole-function check: `correct_branch_type` is now the whole C body
  (4 cases + tail); every callee live; sole caller wired. No arm-only sale,
  no silent stub. Verdict line: whole.
- Cluster coherence: one C file (`dungeon.c`) + stale proofs; 1 changed
  function, well under the 10-function ceiling; no Must-fix bundled.
- Ledger: D-entry lists `correct_branch_type ported; traverse_mapseenchn
  ported` (plus the stale head) — one entry per function. Verify bullet
  shows both functions with hidden-note + REACH lines.
- Size note (not a C-wrong): +7/−1 is far below the 200–800-line breadth
  target and the ~80 floor. The head's closure is genuinely thin here (leaf
  predicate + two stale proofs), but no same-file Open row was pulled in to
  dense it up. Waste, not risk — no verdict consequence per the review
  triggers.

## Verification

Re-measured myself (`--base a1b562159~1 --reach-all`, one call, both fns):

```text
verify correct_branch_type: baseline a1b562159~1 — 0 session(s) blocked on it
smoke correct_branch_type: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
verify traverse_mapseenchn: baseline a1b562159~1 — 0 session(s) blocked on it
smoke traverse_mapseenchn: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Both summary lines per function cited; zero `REGRESSED`. The D-log's
"no corpus session blocked" + "REACH smoke 24/24 PASS" matches exactly —
the vacuous verify is correctly labeled a hidden note, not a corpus PASS.
Green/cohort claims (2/2, strict ×2, 7/7) are the standard `verify.mjs`
gates, consistent with the +7-line footprint. No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
