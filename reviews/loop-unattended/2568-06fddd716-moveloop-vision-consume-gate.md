# Review 2568 — 06fddd716 — moveloop vision-consume gate (D-3698)

## Metadata

- SHA: `06fddd71662f227d15b3bfb76985a436b2fcaf13` (2026-10-09, D-3698)
- Scope: ≤10-function cliff-writer commit — whole Method on `moveloop_core`
- Diff: `js/allmain.js` +11/−5, new `scripts/moveloop-vision-gate.test.mjs` (69 lines), ledger D-tag append, Parked RECORDER-ARTIFACT line → REFUTED, scoreboard row Priest-94382 → PASS
- Prior precedent: review 2567 (D-3697, same probe family) ACCEPT

## Intent vs deliverable

Subject promises: C nests the `vision_full_recalc` consume inside
`if (!mv || Blind)` (allmain.c:470–471) while JS consumed unconditionally
outside the gate with a non-C post-clear; nest it in C order after the see
arms, drop the post-clear; parked mon_wield_item probe → FULL PASS;
RECORDER-ARTIFACT park refuted. The diff delivers exactly that: 4 added
lines (comment + `if` + call) inside the gate, 4 removed lines (old
unconditional consume + post-clear) outside it, plus comment updates. No
other `js/` touched, no new imports. Promise matches deliverable.

## Inventory

- `moveloop_core` (`js/allmain.js`, gate region :1445–1479): consume moved
  inside the gate; no new JS function, no helper added.
- `vision_recalc` (`js/vision.js:1082` sync, single definition per
  `sym.mjs`; imported at `js/allmain.js:16`): pre-existing LIVE callee, no
  re-point. Nothing deleted or re-pointed, so no re-point `sym.mjs` paste
  is owed beyond this: `vision_recalc js/vision.js:1082 sync`.
- No `--can` question: zero import changes.
- Focused test asserts hook#100 `couldsee(24,6) === true` on a headless
  Priest-94382 replay (`scripts/moveloop-vision-gate.test.mjs:22–66`).

## C ↔ JS fidelity

C locus (`csym.mjs moveloop_core`): `nethack-c/upstream/src/allmain.c:176–564`.
Gate verified against pinned lines: `:453` find_ac, `:454`
`if (!svc.context.mv || Blind) {`, see arms `:456–469`, `:470–471`
`if (gv.vision_full_recalc) vision_recalc(0);`, close `:472`, bot arms
`:473–479`. JS now mirrors this exactly: find_ac, gate, hallu/else arms,
consume, bot comment — in C order.

- Gate predicate: JS `!g.context.mv || Blind` ≡ C `!svc.context.mv || Blind`.
  `g` is `game` (`js/allmain.js:1171` `const g = game`); `context.mv` is the
  standard moved flag written on the rhack path (`js/cmd.js:4931` etc.).
  Pre-existing; untouched.
- Dropped post-clear: C has no post-clear at either consume site, because
  `vision_recalc` resets on entry — `vision.c` head
  (`csym.mjs vision_recalc` range `:511–857`):
  `gv.vision_full_recalc = 0; /* reset flag */` before the
  `in_mklev/in_getlev/!vision_inited` guard. JS `vision_recalc` likewise
  clears on entry (`js/vision.js:1085`, before its mklev/vision_inited
  guard). Dropping the post-clear is exactly C. Branch-by-branch confirm.
- RNG call-for-call: no RNG drawn by the moved lines on either side; the
  change only shifts *when* a recalc runs (deferred past a moved turn),
  which is the C semantics being restored.
- Second consume: C `:541–542` unconditional after deferred_goto matches JS
  `:1577–1580` (D-log's cite `:1570–1575` is stale by ~5 lines, comment
  region — harmless). Nit, not a C-wrong: the second site keeps a redundant
  `g.vision_full_recalc = 0` post-clear the first site dropped. Behaviorally
  identical (callee already cleared), but the two sites now disagree
  stylistically — next port iter touching this region folds in the deletion.
- Edge noted, out of scope: JS `vision_recalc` returns before its reset
  when `!u || !game.level`, while C resets before its guard. Unreachable
  from moveloop (u/level always live); pre-existing, stands.

## Hallucinations / overclaim

None. The D-log's capture-point reversal (More waits emit markers via
xwaitforspace→tty_nhgetch; C recalc'd pre-More) is corroborated by the
mechanism it cites and — decisively — by the FULL PASS it predicted: a
game-code-only change with no hook edit moved the probe. "REFUTED" is
earned, and the archive proof is kept as history rather than rewritten.
No dispatch-over-stub: the only callee is live and verified.

## Density

Cliff-phase writer port, textbook shape: the cliffs head (mon_wield_item,
Priest-94382 step 99) was parked with six measures; this commit ports the
writer the seventh measurement named, in the same C file family
(`js/allmain.js` only + its test), with movement. `Ledger: moveloop_core
ported` entry present (D-tag append; already ported, stays ported). Not a
re-port of the symptom owner, not another file's work, not a no-op.

## Verification

- Focused test: `node --test scripts/moveloop-vision-gate.test.mjs` → 1/1
  pass (ran here; D-log claims RED pre-fix, GREEN post-fix).
- Re-measure (`verify mon_wield_item,moveloop_core --base 06fddd716~1
  --reach-all`): `verify mon_wield_item: 1 PASS, 0 moved past, 0 unchanged,
  0 worse → PROGRESS` (Priest-94382: PASS — the FULL PASS claim is true);
  `reach moveloop_core: 924 baseline-PASS session(s) reach it (924 run):
  924 PASS, 0 regressed → REACH-OK` — full reach, stronger than the D-log's
  80-run spread. Zero regressions. (moveloop_core's own row is a vacuous
  0-blocked verify, correctly reported as such by the tool, not claimed.)
- Hygiene: diff greps clean (no FORCE/DIAG/getRngLog/fastforward/seeds/
  coords); `imports.mjs --rulecheck` → Rule #2 clean across scored `js/`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
