# Review 1359 — b7216a99 — do.c obj_no_longer_held canonical export (D-2393)

- SHA: `b7216a99`, D-2393 (D-2060-named residual). JS files:
  `js/do.js` (+27), `js/apply.js` (−17/+2), `js/dothrow.js` (+6),
  `js/end.js` (+async cascade). No test file (`/tmp` probes only,
  stated in D-log — sessions are the harness).
- Prior reviews closed: none (named residual, 0 blocks).

## Intent vs deliverable

Subject promises "canonical crysknife-revert export + whip/throw/bones
wiring". Diff delivers the canonical export, the clone deletion, the
whip swap, and the bones gate. The "throw" wiring lands in the wrong
function (see C-wrong 1): `throw_gold` gets a dead call while the real
C call site in `throwit` stays unwired. Promise two-thirds kept.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `obj_no_longer_held` (do.js:651) | new, exported async | LIVE (C is extern in `do.c`; export correct) |
| `obj_no_longer_held_apply` (apply.js) | local clone, **deleted** | retired — grep confirms zero refs left |
| whip call (`apply.js:3334`) | clone → canonical import | re-pointed, order kept |
| `throw_gold` landing (`dothrow.js:871`) | new call | MISWIRED (dead — see below) |
| `drop_upon_death` / `finish_paybill` (end.js) | sync → async cascade | LIVE, all 5 call sites awaited, file-local |
| `costly_alteration` (do.js import) | C callee, existing edge extended | LIVE (`--can` → ALREADY, no new edge) |
| `is_undead` (end.js import) | C callee, live edge | LIVE (import, not clone) |
| `CRYSKNIFE`/`WORM_TOOTH` consts | moved apply.js → do.js | moved, not duplicated |

Required checks: `sym.mjs obj_no_longer_held → js/do.js:651 ASYNC —
await required`; `sym.mjs obj_no_longer_held_apply → NOT FOUND`
(deletion complete); `imports.mjs --can do.js shk.js
costly_alteration → ALREADY`. Nothing else deleted.

## C ↔ JS fidelity

C locus opened: `obj_no_longer_held` (`do.c:891–920`, csym range),
callers (`--callers`: apply.c:3237, bones.c:280, dothrow.c:1808,
mkobj.c:768/799 comment, mkobj.c:2330, mkobj.c:2683, steal.c:834
comment, worn.c:1413).

- Canonical body vs `:891–920` is branch-exact: null return;
  `Has_contents` recursion over the `cobj`/`nobj` chain (C's `else if`
  ≡ sequential-`if` after return); `(otyp|0)===CRYSKNIFE`;
  `!oerodeproof || !rn2(10)` short-circuit so normal crysknives draw
  zero RNG and fixed draw exactly one `rn2(10)` (matches C's comment
  arms; `/tmp` probe confirms 0 vs 1 draw); `!mon_moving &&
  !gameover` → `await costly_alteration(obj, COST_DEGRD)`; then
  `otyp=WORM_TOOTH` + `oerodeproof=0`. ✓
- Whip site matches C `apply.c:3237` order exactly
  (`obj_no_longer_held(otmp)` → `place_object` → `stackobj`). ✓
- Bones gate matches C `bones.c:279–280` verbatim (`!mtmp ||
  is_undead(mtmp->data)`), verified against the `drop_upon_death`
  `:258–303` body; SLIME_MOLD `goodfruit` stays after the call as in
  C. (JS does `owornmask=0` before the call vs after in C — order is
  unobservable: the callee never reads `owornmask`. Not a gap.) ✓
- Named omits are legitimate: `mkobj.c:2330/2683` + `worn.c:1413`
  (sync cores, map-named in turns.md do.c section);
  `steal.c:834` is correctly a non-arm (C comment: done by
  `place_object`). ✓
- RNG walk: no other RNG in the touched paths; the `/tmp` seeded
  probe (`initRng(1234)`, fixed draws 1× `rn2(10)=4`) matches C `||`
  order. ✓

## Hallucinations / overclaim

D-log Verify bullet is honest — states the vacuous verify explicitly
("NOT a corpus PASS", "ship is on the C citation + public gates").
No overclaim there. But the subject's "throw landing (dothrow.c:1808)"
overclaims: no `throwit` call was added (C-wrong 1).

## Density

One C function + its caller cluster, code + map + verify in one
handoff. Right-sized (§2b).

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|hardcod` → 0.
- Re-measured: `verify obj_no_longer_held --base b7216a99~1` →
  `0 session(s) blocked (0 at baseline, 0 working)`. Matches D-log.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).
- D-log's green 2/2 + strict ×2 + cohort 7/7 + full 44/44 accepted
  (shared-file change triggers full; ran after last js/ edit).

## Actionable C-wrongs

1. `obj_no_longer_held` wired into `throw_gold`, missing from
   `throwit` landing. C `dothrow.c:1808` sits in `throwit`
   (neighbors verified in pinned source: `flooreffects` → pick-snatch
   → `snuff_candle` → `ship_object` → `place_object` +
   `container_impact_dmg`). C `throw_gold` (`:2656+`) never calls it —
   gold is never CRYSKNIFE, so the added call is dead code, while a
   genuinely thrown crysknife landing via JS `throwit`
   (`js/dothrow.js:2072`, landing block ~:2316–2340 mirroring the same
   neighbors) still never reverts. Fix (one iter): move the call from
   `throw_gold` into `throwit` between the `flooreffects` block and
   the snuff/ship arms (C `:1808` position).

Verdict: **QUALITY-RISK**
