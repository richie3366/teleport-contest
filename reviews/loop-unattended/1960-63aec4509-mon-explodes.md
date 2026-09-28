# Review 1960 — 63aec4509 — Must-fix mcalcmove via mon_explodes (D-3000)

Metadata: SHA `63aec4509`, D-3000, Must-fix for the rescore row
(`mcalcmove` blocking 1 corpus session, spurious `--More--`).
Stat: `js/explode.js` (+7/−3), `js/mon.js` (+5/−1), `js/worm.js`
(+5/−1), two new test files. No prior review file on disk.

## Intent vs deliverable

Subject promises: Must-fix `mcalcmove` block — the
`mon_explodes` inline kill skipped the purge count (spurious
`--More--`); gallop arm ported. The body traces the stall to a
`dmonsfree` mismatch topline overflowing into `more()`, proved
the rounding arm faithful at step 43, and names `mon_explodes`
as the writer.

Diff actually adds: `await mondead(mon)` in the live-monster
gate, `await impossible(...)` in the unknown-adtyp arm, the
`mcalcmove` gallop arm, and its worm-clone mirror. Promise and
diff match.

## Inventory

- `mon_explodes` (CHANGED, `js/explode.js:811`): unknown arm +
  kill gate; +1 import (`mondead`).
- `mcalcmove` (CHANGED, `js/mon.js:990`): gallop arm replaces
  the "deferred" comment.
- `worm_mcalcmove` (CHANGED, `js/worm.js:404`): gallop mirror
  in the D-1491 deliberate clone.

## C ↔ JS fidelity

`mon_explodes`, `csym` range `explode.c:1018–1067`. Unknown arm
(C `:1044–1047` `impossible(...); return;`) → `await
impossible('unknown type for mon_explode %d', ad); return;` —
`ad` is `mattk.adtyp|0`, `impossible` is ASYNC and awaited ✓.
Kill gate (C `:1049–1054`, `if (!DEADMONSTER(mon))
mondead(mon);`) → `if ((mon.mhp|0) >= 1) await mondead(mon);`
— `!DEADMONSTER ⇔ mhp>=1` ✓, `mondead` ASYNC (`js/mhitm.js:3812`)
awaited ✓. This is the fix: C never inlines `mhp=0`; `mondead`
→ m_detach sets MON_DETACH and counts the purge. RNG: the `d()`
damage arms above are untouched and were already exact.

`mcalcmove` gallop arm, C `mon.c:1148–1153`: `if (mon ==
u.usteed && u.ugallop && svc.context.mv) mmove = ((rn2(2) ? 4
: 5) * mmove) / 3;` → identical predicate
(`mon===game.u?.usteed && ugallop!==0 && game.context?.mv`)
and formula with `Math.trunc` division, in C position (after
MFAST, before the `m_moving` rounding). One `rn2(2)`,
call-for-call exact. The worm mirror is line-identical modulo
the parameter name.

Callee closure: `mondead` LIVE (imported, awaited); `impossible`
LIVE; `rn2` LIVE. No stub, no omit. `sym.mjs` (no symbol
deleted; one new import binding):

```text
mondead          js/mhitm.js:3812   ASYNC — await required
```

Callers (re-derived, matching the D-entry): C `mhitm.c:985` →
`js/mhitm.js:6032` ✓; C `mhitu.c:1619` → `js/mhitu.js:3831` ✓;
C `mon.c:3233` (mdestroy gas-spore path) → `js/mhitm.js:3004` +
`js/uhitm.js:693`, the pre-existing split halves on exclusive
paths (verified: swallowed-youmonst returns early in the uhitm
half, monster-engulfer in the mhitm half, `mon_explodes` after
— C's shape). `mcalcmove`: allmain sites pre-existing;
`worm.c:226` served by the mirrored clone.

Import safety: explode→mhitm closes the explode↔mhitm cycle
(mhitm.js:133 imports mon_explodes back). `mondead` is a hoisted
`export async function` called only at runtime inside
mon_explodes — no top-level TDZ read; `--can` on this tree
reports ALREADY and post-commit full 44/44 passed. For the kept
worm clone, `imports.mjs --can worm.js mon.js mcalcmove` returns
SAFE (hoisted fn) — so the clone is a D-1491 design carryover,
not a hard constraint. The mirror is exact, so this is a note,
not a C-wrong; no import churn is owed in a Must-fix.

Diff grep: the one `DIAG` hit is the commit message narrating
the removed temp worker DIAG, not code (`js/explode.js:0`,
`js/worm.js:0`; the 11 `js/mon.js` hits are all pre-existing
NODIAG/DIAGONAL identifiers). No FORCE/getRngLog/seed/TODO.
Rule #2 re-verified clean under 1956.

## Hallucinations / overclaim

None. "Temp worker DIAG (removed)" is honest — zero DIAG in the
touched files. The positional-owner analysis (step 43 proof,
last-matched-draw chain) is measurement, and the re-measure
below confirms the writer call.

## Density

Must-fix ships alone: one block, writer + the gallop arm it
owns (the arm C executes at the divergence point,
`mon.c:1164`-adjacent). Both Ledger entries (`mcalcmove
ported; mon_explodes ported`); Verify names both functions with
per-function reach lines, plus a `--reach-all --full` second
pass. Focused tests 6/8 pre-fix → 8/8 post-fix.

- `mon_explodes`: kill gate + unknown arm now C-exact → OK.
- `mcalcmove` gallop arm: C-order, exact → density OK.

## Verification

D-log: session replay 21932/21932 RNG, 50/50 screens;
`verify.mjs --fn mcalcmove,mon_explodes` → 1 PASS → PROGRESS,
reach 80/80 sample + 14/14, then 613/613 `--reach-all` + full
44/44. Re-measured here in one call:

```text
verify mcalcmove: baseline 63aec4509~1 — 1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard)
  tour-Ranger-70021-d5-8-15-17-22: PASS
verify mcalcmove: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
reach mcalcmove: 613 baseline-PASS session(s) reach it (613 run, 265.1s): 613 PASS, 0 regressed → REACH-OK
reach mon_explodes: 14 baseline-PASS session(s) reach it (14 run, 31.4s): 14 PASS, 0 regressed → REACH-OK
```

The named session PASSes; zero REGRESSED across 627 re-runs. No
seed/step/coordinate/RNG-index reads. The Must-fix queue now
stands empty (both rescore rows closed).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
