# Review 2778 — f8fd1f07d — passiveum AD_ACID erosion wiring

- **SHA:** `f8fd1f07d` (Tue 2026-10-13) — cliffs-head `trap.c` erode_obj writer (D-3925).
- **D-entry:** D-3925. **Ledger:** `passiveum` ported (mhitu split home).
- **Diff size:** `js/mhitu.js` +8/−4 (2 calls + import name + comments); new test `scripts/passiveum-acid-arm.test.mjs`.
- **Method:** cliff commit, 1 arm — whole Method on the AD_ACID arm + callee closure.

## Intent vs deliverable (promise vs diff)

The subject promises: passiveum's AD_ACID arm drew the `rn2(30)`/`rn2(6)`
gates but left both erosion calls as `// deferred` comments, so C's
`acid_damage(MON_WEP)` → `erode_obj` `rnl(4)` draw never happened in JS
(Rogue-587201 s1128); the fix wires both live callees under the unchanged
gates; probe goes 1128→PASS.

The diff actually adds: `await erode_armor(mtmp, ERODE_CORRODE)` under
`!rn2(30)`, `await acid_damage(MON_WEP(mtmp))` under `!rn2(6)`,
`acid_damage` in the existing trap.js import, a C-cite comment, and a doc
Named-omissions update dropping the shipped arm. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | AD_ACID arm gates (mhitu.js:3057-3064) | mhitu.c:2477-2480 | wired (was deferred) |
| 2 | `acid_damage` import (mhitu.js:111) | trap.js:4701 export | new name, existing edge |
| 3 | test `passiveum-acid-arm.test.mjs` | Rogue-587201 s1128 | new, in scripts/ |

No symbol deleted or re-pointed (a deferred comment → import is not a
clone removal — no local clone existed); no `sym.mjs` re-point output is
required.

## C ↔ JS fidelity

C locus: `mhitu.c:2434-2613` (`csym.mjs passiveum` range); AD_ACID arm at
:2464-2481, walked call-for-call:

```c
if (!rn2(2)) { pline_mon(...splash...); if (resists_acid(mtmp)) { ...; tmp = 0; } }
else tmp = 0;
if (!rn2(30)) erode_armor(mtmp, ERODE_CORRODE);
if (!rn2(6)) acid_damage(MON_WEP(mtmp));
return assess_dmg(mtmp, tmp);
```

JS (mhitu.js:3043-3065) matches in order: `rn2(2)` splash with the
`!Upolyd ? '' : 'your '` + `hliquid('acid')` interpolation (same bytes as
C's format), `resists_mr(mtmp, MR_ACID)` (live equivalent of
`resists_acid`, pre-existing), `tmp = 0` on both paths, then the two newly
wired gates in C order, then `return assess_dmg(mtmp, tmp)`. RNG
call-for-call: `rn2(2)`, `rn2(30)`, `rn2(6)` — identical sequence.
("AD_ACID now whole vs C `:2464–2481`" — true.)

Callee closure (step 3):

- `erode_armor` — LIVE: `sym.mjs` → js/mhitm.js:2463 async export, already
  imported (mhitu.js:99), awaited. No new edge.
- `acid_damage` — LIVE: `sym.mjs` → js/trap.js:4701 async export, added to
  the existing trap.js import line, awaited. The D-log's "mhitm edge
  ALREADY per `imports.mjs --can`" is consistent (mhitu→trap edge
  pre-exists at line 111).
- `MON_WEP` — LIVE import from weapon.js (mhitu.js:45), used across the file.
- No STUB, no CLONE, no OMIT in the arm. The doc comment drops exactly the
  shipped arm from Named omissions; the remaining list (drain_item,
  golemeffects, mon_reflects, paralyze_monst, AT_BOOM rehumanize,
  split_mon) names other arms, correctly kept.

## Hallucinations / overclaim

- The D-log labels `verify passiveum` "writer, none blocked" and hangs
  movement on `verify erode_obj` — honest framing; my re-measure confirms
  the erode_obj PASS it claims.
- "both callees are live" — verified above via `sym.mjs` (both async
  exports, both awaited). The downstream proof is the PASS itself: C's
  `rnl(4)=0` in erode_obj now draws identically in JS. No overclaim found.

## Density

Cliff phase (§10.18): the parent's generated cliffs head was `trap.c`
erode_obj blocking scen-sweep-Rogue-587201 at step 1128 (verified in
`f8fd1f07d~1:docs/LOOP-QUEUE.md`, top row, RNG lost 16348). Owner stands
whole per D-3876 (read once per tag — the divergence is the missing
*caller* `acid_damage`, correctly identified); this commit wires exactly
the named writer calls with their own Ledger row. The D-log explicitly
refuses to sweep the standing deferred arms ("no probe sessions; do not
sweep") — correct cliff discipline. One cliff, code + ledger + verify in
one handoff. Rule #2: `imports.mjs --rulecheck` → clean (run this
iteration, cited for all 9 SHAs).

## Verification

Re-measured myself:

```
verify erode_obj: baseline f8fd1f07d~1 — 1 session(s) blocked on it
  scen-sweep-Rogue-587201: PASS
verify erode_obj: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
reach erode_obj: 53 baseline-PASS session(s) reach it: 53 PASS, 0 regressed → REACH-OK
```

D-log's "1 PASS" reproduced exactly; reach 53/53 with zero regressions.
No REGRESSED session. Movement + REACH-OK: satisfied. New test 1/1
post-fix per the D-log.

## Actionable C-wrongs

None. The arm is now whole vs C with a fully live callee closure, and the
corpus claim re-measures clean.

Verdict: **ACCEPT**
