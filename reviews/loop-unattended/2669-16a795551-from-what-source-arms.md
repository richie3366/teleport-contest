# Review 2669 — 16a795551 — one_characteristic writer: from_what source arms

Metadata: SHA `16a795551`, D-3805, cliff row-2 `insight.c`
one_characteristic writer (@4fb06f715; row-1 void-barred, falsifier
live-checked). JS: `js/attrib.js` (+24/−8). Test:
`scripts/from-what-blinded-source.test.mjs`.

## Intent vs deliverable

Promise: JS printed bare `" You were temporarily blind (5)."` missing
the from_what(BLINDED) suffix; port the three missing arms (birth /
Blindfolded_only / goop) in C order. Claimed: goop pair PASS, Antimagic
pair unchanged (separate writer). Diff actually adds: birth arm,
Blindfolded_only arm, goop arm, DEAF/FACE + body_part imports, `const
u` hoist. Match.

## Inventory

- `from_what` (js/attrib.js:1288) — changed: 3 arms added in C chain
  position. C `attrib.c:904–1001` (csym range).
- No new helpers; `body_part` imported LIVE from polyself.js:613 (sync,
  existing edge extended); DEAF/FACE join the const.js block. No
  deletes, no re-points, no new edges.

## C ↔ JS fidelity

C chain (attrib.c:936–968): birth `:936–938` FIRST → innateness →
FAST → what_gives → Blindfolded_only `:962–963` → goop `:964–968` →
pair-of strip. JS inserts the birth arm before the innateness
else-chain (`uroleplay.blind/deaf`, `' from birth'` — verbatim) and the
two BLINDED arms after what_gives, preserving C precedence exactly.
Blindfolded_only: C `youprop.h:97` = `EBlinded && !(HBlinded &&
!BBlinded)`; JS `((u.EBlinded|0) && !((u.HBlinded|0) &&
!(u.BBlinded|0)))` — exact expansion. Goop: all four C conjuncts
verbatim (`ucreamed`, `BlindedTimeout==ucreamed`, `!EBlinded`,
`!(HBlinded&~TIMEOUT)`), template `due to goop covering your %s` with
no leading space (C-verbatim; glue confirmed against recorded C
screens), live `body_part(FACE)`. `const u` hoist: function is sync
(no awaits), so the single `game.u || {}` is the identical object the
FAST arm read. H/E/B read the flats — the same store the Blind painter
(invent.js:6219–6243) reads, so writer and painter agree. No RNG in C
:904–1001; none added. Callers inherit (signature unchanged); probe
site insight.c:1073 → invent.js:6243 already wired.
Gap: none. Arm-by-arm confirm; from_what now whole vs C.

## Hallucinations / overclaim

None. Owner correctly identified as misattributed (it prints the
matching topline; the differ is the status_enlightenment Blind arm's
from_what suffix). The Antimagic pair is not swept under the change:
diagnosed as a separate writer (JS Antimagic true where C false, full
C menus dumped) with a Next-row diagnosis plan — honest scope split.

## Density

Cliff-phase: writer correct, whole-function (three arms complete the
chain; "Named omissions: none"). Ledger: `from_what ported`. Verify
bullet: 2 PASS + REACH-OK ×2 + green + strict + cohort + manual 44/44.
The 2 unchanged are a different writer, documented — not NO-MOVEMENT;
the row's goop half fully PASSes. Not unreached: 2 sessions PASS.

## Verification

js-diff grep: clean. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify one_characteristic --base 16a795551~1
--reach-all` → `2 PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS`
(95206/95242 PASS; 95208@285, 95221@621 unchanged) and `smoke 24/24 →
REACH-OK` — exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
