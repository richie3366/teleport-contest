# Review 2767 — 62b25e99c — Rog gotit quest text behind Master Key wish

- SHA: `62b25e99c` (D-3914)
- Scope: `js/questpgr.js` +16/−0 (data only), 1 test, ledger
  `questpgr.c.jsonl`
- Method: cliff commit (1 data writer); full Method + re-measure

## Intent vs deliverable

Promise: cliffs-head `objnam.c` readobjnam_postparse1 is
symptom-only/misattributed (topline-literal tie-break on the "master
key" guard); the writer for sweep-Rogue-587201 s631 is the missing Rog
`gotit` quest text (C gotit window + More vs JS straight to the pickup
listing, plus an RNG desync from the D-1662 retry's extra shuffle).
Probe claimed to move 631 → erode_obj@1128; the second blocked session
(Monk-587316 s340) named as a separate writer, unchanged.

Diff actually adds: `QUEST_GOTIT` table with the Rog body +
`QUEST_MSG_META.gotit.Rog` (`output:'text'` + synopsis) + the
`QUEST_ROLE_TEXT` registry line. Nothing else.

## Inventory

- `QUEST_GOTIT.Rog` (js/questpgr.js:689–694) + meta (:914–919) +
  registry (:943): source `dat/quest.lua` Rog `gotit` :2060–2067. New data.
- No functions added/changed; no symbols deleted or re-pointed; no new
  edges. Caller chain (wish→addinv→artitouch→qt_pager) pre-wired and
  measured to fire on both sides.

## C ↔ JS fidelity

Byte-compared myself against pinned `dat/quest.lua` :2060–2067: body
verbatim including both double spaces («out.  At», «hands.  Somehow»)
and all four line breaks; synopsis `[You pick up %o and know that %l
should not have it.]` and `output = "text"` exact. Raw `%o`/`%n`/`%ls`
in the table matches the shipped-conversion pattern (pre-existing
render path, same as every other role body). C trigger confirmed:
`artitouch` quest.c:124–136 (`csym` range; D-log cites :125–136, off by
one on the start line — trivia) calls `qt_pager("gotit")` at :133
inside the once-only `touched_artifact` gate. No RNG, no prints authored
here — pure data restoring the C window and its More. The RNG-desync
mechanism (extra nhl_init shuffle from the D-1662 miss retry) is
consistent with the diff: with the table hit, the retry path no longer
fires.

## Hallucinations / overclaim

None. "verbatim" verified true; the 1-unchanged session is disclosed in
the subject line itself with its own owner, not buried.

## Density

Cliff-phase: readobjnam_postparse1 was the head at the parent
(4eebfc7bf block: 2 blocks, RNG lost 54974, first at s631 — verified in
the parent tree). Owner-vs-writer discipline kept (owner stands
misattributed per the D-2137 class; D-2137 read once). One cliff, one
writer, code + ledger + test + verify in one handoff. `Ledger:
com_pager_core ported` present. The Monk-587316 no-movement is a
different writer by its divergence text (drowning topline, not a gotit
window — confirmed in my re-run below), so this is movement on the
row's probe session for this writer, not NO MOVEMENT sold as omission.

## Verification

Re-measured myself (`verify readobjnam_postparse1 --base 62b25e99c~1
--reach-all`):

- `verify readobjnam_postparse1: 0 PASS, 1 moved past, 1 unchanged, 0
  worse → PROGRESS` (587201: 631 → erode_obj@1128; 587316: still
  readobjnam_postparse1@340 with the drown topline)
- `smoke: 24 PASS, 0 regressed → REACH-OK`
- Zero `worse`/REGRESSED. Matches the D-log Verify bullet exactly.

Grep of added lines: clean (no FORCE/DIAG/getRngLog/fastforward/seed).
Rule #2 clean (iteration-wide `imports.mjs --rulecheck`). No
seed/step/coordinate reads. New test pins the C head line, red pre-fix
per the log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
