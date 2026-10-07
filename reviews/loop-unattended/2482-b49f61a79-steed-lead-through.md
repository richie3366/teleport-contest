# Review 2482 — b49f61a79 — steed lead-through arm (D-3601)

**Metadata.** SHA `b49f61a79` (2026-10-07, D-3601). Type: **cliff**:
writer fix for the cliffs head `monmove.c dochug` (1 corpus
block) — the first divergence sits in the hero-phase door bump
(hack.c:1116), not in dochug. `js/` insertions: 9 (`js/cmd.js`
+9/−5) + new test.

## Intent vs deliverable

Promise: port the `u.usteed` lead-through arm into the live
DO_MOVE inline block in cmd.js domove (the whole-function
hack.js port already has it but is unreachable from this path);
ride-Samurai → PASS.

Diff actually adds: `y_monnam` import name + the steed if/else +
comment. Promise matches diff. No symbols deleted or
re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | test_move orthogonal-bump steed arm (in domove) | ported | [cmd.js](/home/debian/dev/teleport-contest/js/cmd.js:6628) | hack.c:1112–1132 + do_name.c:1116–1129 |

Helpers: `y_monnam` — C callee, live import
([do_name.js](/home/debian/dev/teleport-contest/js/do_name.js:1278)).

## C ↔ JS fidelity

**C arm confirmed.** hack.c:1112–1132 (read): impaired gate
(`Blind||Stunned||DEX<10||Fumbling`) → `u.usteed`?
`You_cant("lead %s through that closed door.",
y_monnam(u.usteed))` (:1115–1117) : Ouch + `exercise(A_DEX,
FALSE)` (:1118–1120); then `door_opened=move=TRUE` (:1127) +
`nomul(0)` (:1130); else «That door is closed.» ✓. JS
[cmd.js](/home/debian/dev/teleport-contest/js/cmd.js:6623)
reproduces every line in C order, including the shared
door_opened/move/nomul tail and the else message ✓. The message
string is byte-identical to C's `You_cant` expansion ✓, and to
the pre-existing hack.js:565–566 rendering of the same arm
(re-read — same template), so the two sites cannot diverge ✓.

**Callee is live and exact.** `y_monnam` JS mirrors C
do_name.c:1116–1129 (read): tame→ARTICLE_YOUR, SUPPRESS_SADDLE
when named or `== u.usteed` ✓. `sym.mjs y_monnam` →
`js/do_name.js:1278 sync`, no clones. cmd.js already imported
six names from do_name.js → no new edge ✓.

Ledger note (not a C-wrong): the `test_move` row's `js:`
locator still names only `js/hack.js:test_move` while this arm
landed in cmd.js domove — the D-log documents the split home
honestly; the locator is indicative, not wrong about C.

## Hallucinations / overclaim

None. "Both sides rode" is argued from matched screens (Ride
status) + a move-key step — stated as proof, not a probe, and
the resulting PASS corroborates it. dochug's "body whole"
listing is explicit about the pre-existing demon_talk omit.

## Density

Cliff §10.18: parent queue head is dochug (1 block, RNG 450 —
re-read from `b49f61a79~1:docs/LOOP-QUEUE.md`) ✓. One cliff,
own `Ledger:` touch (D-3601 on test_move), probe → PASS.
Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (import + if/else + cites).
- Rule #2: `imports.mjs --rulecheck` clean (run this iteration).
- Committed test `domove-steed-door.test.mjs`: PASS now.
- Re-measure (mine): `verify dochug --base b49f61a79~1
  --reach-all` → **1 PASS, 0 moved past, 0 unchanged, 0
  worse** (ride-Samurai-94407 PASS) + reach 403/403 REACH-OK.
  Matches the D-log exactly. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
