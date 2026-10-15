# Review 2811 — d796afcd4 — confer_oc_oprop FREE_ACTION E-flat mirror

- **SHA:** `d796afcd4` (Wed 2026-10-14) — cliffs-head writer (D-3965).
- **D-entry:** D-3965. **Ledger:** `setworn` ported (D-3965 appended).
- **Diff size:** `js/do_wear.js` +7/−1 (one arm + doc line); +1 test.
- **Method:** cliff (1 writer arm) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: 3 of 7 distfleeck-blocked sessions share one
writer — the hero wears a ring of free action, C resists (yawn /
disoriented, no draw) where JS does not (fall_asleep `rn2(10)`,
`rnd(5)` nomul, `d(6,4)`), forking RNG at the next distfleeck — because
`confer_oc_oprop` never mirrored `uprops[FREE_ACTION].extrinsic` into
the `EFree_action` flat the seven behavioral readers consume. The fix
is the one arm, FAST-shaped; the other 4 sessions keep their own
writers. 3→PASS.

The diff is exactly the arm plus the doc-line update. Promise and
diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `confer_oc_oprop` FREE_ACTION arm: set/clear `u.EFree_action` with mask | youprop.h:383 `Free_action ≡ uprops[FREE_ACTION].extrinsic`; worn.c setworn :72–145 (wear arm :117–125 `extrinsic \|= mask`) | C-exact, FAST-identical shape |
| 2 | doc Named list adds FREE_ACTION | — | updated ✓ |
| 3 | `confer-free-action.test.mjs` (put-on sets both, take-off clears both, two-ring independence) | — | test-only |

No helper, no import change (FREE_ACTION already imported), no symbol
re-pointed (`sym.mjs` not required). Callee closure: none — straight-line
flat writes. Diff grep: no banned patterns. Rule #2 clean (2808).

## C ↔ JS fidelity

**Macro and confer path (confirmed).** youprop.h:383 reads exactly
`#define Free_action u.uprops[FREE_ACTION].extrinsic` ✓. `csym
setworn` (worn.c :72–145): the wear arm sets `u.uprops[p].extrinsic
|= wp->w_mask` with `p = oc_oprop` (:117–125) and the removal arm
clears symmetrically ✓ — the JS arm's set/clear with `mask` is the
same operation on the mirrored flat, inheriting all 76 C call sites
through the one pre-wired JS `setworn` ✓.

**Readers (confirmed ×2, mechanism holds).** C potion.c
peffect_sleeping: `if (Sleep_resistance || Free_action) yawn / else
fall_asleep` ✓; mcastu.c mcast_stun_you: `if (Antimagic ||
Free_action) disoriented / else damage` ✓ — both match the symptom
table's C-vs-JS pairs draw-for-draw. The JS `Free_action()` clones
(potion.js:2031, mcastu.js:123 — both read) consume `u.Free_action ||
u.HFree_action || u.EFree_action`, flats only ✓, so an unmirrored
ring conferral was indeed invisible to them. Two-ring independence
falls out of mask-bit set/clear ✓ (W_RINGL vs W_RINGR).

**Named omissions (proper).** Remaining E-flat mirrors, artifact-conferred
FREE_ACTION, and the 4 unchanged sessions' writers are all named with
per-session causes in the D-log — no silent stubs.

## Hallucinations / overclaim

None. "Owner verified whole per D-3559/ledger, not re-ported" is the
correct writer-not-symptom discipline, and the 4 unchanged sessions
are itemized with distinct writers rather than swept into the fix.

## Density

One cliff writer, whole (wear + remove symmetric through the shared
helper), with its Ledger entry and a focused test that fails pre-fix
on exactly the new asserts. No bundled work. The `Next:` line
correctly refuses re-work (all 3 PASS) and aims the regenerated row
at the pool-fall pair.

## Verification

Re-measured myself (`verify distfleeck,setworn --base d796afcd4~1
--reach-all`), one call — the blocked set reproduces the D-log
**exactly** (same 3 PASS, same 4 unchanged steps/causes):

```
verify distfleeck: 3 PASS, 0 moved past, 4 unchanged, 0 worse → PROGRESS
smoke setworn: fixed smoke spread (24 run, 18.5s): 24 PASS, 0 regressed → REACH-OK
```

(`verify setworn` is vacuous, as the D-log says.) The mandated
`--reach-all` widened the D-log's 80-spread to 3124 baseline-PASS
sessions (2449s) and flagged one:

```
reach distfleeck: 3124 run: 3123 PASS, 1 regressed → REACH-REGRESSION
  scen-sweep-Priest-582706: REGRESSED — screen@1166 owner=nhl_gamestate
```

This is **not** a port regression — it is the D-3885-parked recorder
flake with a *changed recording*: baseline board (07097a089) has it
PASS on a **truncated** recording (1166 steps, C aborted mid-record),
while the current `.cache` recording runs the full 1238 steps and
fails at the documented UNPORTABLE step (nhl_gamestate, nhlua.c:1738
— the malloc-reuse signature, byte-identical owner/loc to the park).
Boards flip-flop PASS↔FAIL with recording length across this window
(1d6305025 already showed the 1238-step FAIL). The REGRESSED rule
assumes a same-recording comparison; here the C side changed under
it, and the park + row-eligibility rules bar a Must-fix for this
session ("Never a port row"). No C-wrong introduced: 3123/3124,
0 worse on the blocked set.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
