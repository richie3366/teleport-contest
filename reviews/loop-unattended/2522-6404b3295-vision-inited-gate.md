# Review 2522 — 6404b3295 — vision_off_newsym_gbuf vision_inited gate (D-3643)

- SHA: `6404b3295` (2026-10-08) — cliffs-head disclose writer
- D-entry: D-3643; Ledger: `vision_recalc` ported (D-3643 appended)
- js diff: `js/vision.js` +9/−0 (gate + C-cite comment); new
  `scripts/vision-inited-gate.test.mjs` (node:test, Rogue-94310 replay pin)
- Type: cliff (≤10 functions → whole Method per function)

## Intent vs deliverable

Promise (subject + D-log): the extracted `vision_recalc(2)` loop in
`vision_off_newsym_gbuf` bypassed C's `!vision_inited` gate, so the
post-gameover disclose docrt rewrote hero memory S_litcorr→S_corr while C
(`really_done` sets vision "inoperative") runs zero newsyms; gating the
helper moves scen-impaired-Rogue-94310 step 260 → PASS.

Diff actually adds: exactly that one gate —
`if (game.in_mklev || !game.iflags?.vision_inited) return;` — with a
comment citing C `vision.c:531–534` and the measured vinit=0 disclose
docrt, plus the replay test. No other JS touched. Promise = deliverable.

## Inventory

| JS function | Status | C range |
|---|---|---|
| `vision_off_newsym_gbuf` (js/vision.js:1370) | gate added, body otherwise untouched | vision.c:511–857 (`vision_recalc`; gate :532) |
| `vision_recalc` (js/vision.js:1082) | unchanged (already gated :1088) | same |
| `really_done` vision_inited=false (js/end.js:1054) | unchanged, cited as the flag writer | end.c:1151–1152 |

## C ↔ JS fidelity

`node scripts/csym.mjs vision_recalc` → `vision.c:511–857`; the gate is
verbatim at :532:

```c
if (gi.in_mklev || program_state.in_getlev || !iflags.vision_inited)
    return;
```

The JS helper is an extraction of the control==2 update loop (D-0583/D-0852
split, documented in its header comment because JS cannot run that loop
inside ordinary `vision_recalc(2)` without painting cleared gbuf on later
flushes). C's gate sits above the *whole* function, so every extracted loop
must honor it — the added line mirrors `vision_recalc`'s own JS gate
(`:1088`, identical `game.in_mklev || !game.iflags?.vision_inited`), minus
`in_getlev` (pre-existing named omission: `program_state` has no JS
counterpart, same as `:1087`).

Branch order / RNG: the gate takes no RNG on either side; when vinit=1
(in-game) the helper runs exactly as before — all four JS callers
(docrt Hallu `js/display.js:6433`, goto_level leave, engulf Hallu,
getbones) are vinit=1 paths, so behavior changes only where C's loop does
not run (post-gameover, mklev). The rewrite mechanism is C-plausible:
`newsym` `:1087–1089` reclassifies under `!waslit || (dark_room &&
use_color)`, and the helper newsyms with swapped-dark viz (cansee=false).
TEMP-C (vinit=0, zero loop visits, zero newsyms at the disclose docrt,
reverted + md5-verified) corroborates.

Helper classification: `vision_off_newsym_gbuf` is a **C callee
extraction** (the control==2 loop), not a clone — no local re-def, no stub.
No symbols deleted or re-pointed, so no `sym.mjs` re-point check applies;
`sym.mjs vision_off_newsym_gbuf` → `js/vision.js:1370 sync`, single def.

Test: `scripts/vision-inited-gate.test.mjs` replays the full session and
pins r15c29 `#`/15 at step 260 with a `#`/15 control at 256. Ran green
here (1/1). D-log claims FAIL pre-fix 0/1 — plausible (the gate is the
only behavior delta on that path) and the replay pin is C-recorded paint,
not a JS self-check.

## Hallucinations / overclaim

None. D-log says "1 PASS" for the one probe session and separately notes
"vision_recalc (none blocked at baseline)" — no claim that the vacuous
leg is corpus evidence. "Verbatim mirror" is accurate (same two disjuncts,
same named omission). No "Match C" dispatch-over-stub: the helper body is
the live loop, already shipped.

## Density

Cliff phase (§10.18): owner `end.c` disclose was the parked-SYMPTOM cliffs
head; D-3626/D-3627 read once (different session, different writer — the
fullscreen-text-dismiss docrt, not the corner dismiss). Deliverable is the
writer's missing gate, shipped whole with its measurement; Ledger entry
present (`vision_recalc` ported). No bundled file, no re-port of the
symptom owner. Verify bullet shows movement + REACH-OK (re-measured
below). Not a no-op: js diff + moved session + committed test.

## Verification

Rule #2: `node scripts/imports.mjs --rulecheck` → "Rule #2 clean" across
scored `js/` (this iteration). Diff grep for FORCE/DIAG/RNG-log/seed/coords:
only the commit message's "(reverted)" mention — no production trace logic.

Re-measure (this audit):
`node scripts/hidden-proxy.mjs verify disclose,vision_recalc
--base 6404b3295~1 --reach-all` →

- `verify disclose: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (scen-impaired-Rogue-94310: PASS) + `REACH-OK` (smoke 24/24)
- `verify vision_recalc: no corpus session is blocked on it` (vacuous, as
  the D-log itself notes) + `REACH-OK` (smoke 24/24)

No REGRESSED. Movement claim true; the vacuous leg is disclosed, not sold.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
