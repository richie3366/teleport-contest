# Review 2770 — 1651cae7f — Arc gotit quest text behind Orb wish

- SHA: `1651cae7f` (D-3917)
- Scope: `js/questpgr.js` +10/−1 (data only), 1 test, ledger
  `questpgr.c.jsonl`
- Method: cliff commit (1 data writer); full Method + re-measure

## Intent vs deliverable

Promise: cliffs-head `objnam.c` wishymatch (Arch-587315 s378) is
misattributed (`wishymatch` prints nothing; the `:3249` "detect "
literal matched "Detection"); the writer is the missing Arc `gotit`
text behind the Orb-of-Detection wish (C gotit window + More vs JS
straight to the pickup listing, plus the D-1662 retry's extra shuffle).
Claimed: probe PASS.

Diff actually adds: `QUEST_GOTIT.Arc` body + `QUEST_MSG_META.gotit.Arc`
(`output:'text'` + synopsis) + doc role-list word. Nothing else.

## Inventory

- `QUEST_GOTIT.Arc` + meta + doc (js/questpgr.js:689–693, :919–922):
  source `dat/quest.lua` Arc `gotit` :283–289. New data.
- No functions added/changed; no symbols deleted or re-pointed; no new
  edges. Trigger chain (wish→addinv→artitouch→qt_pager("gotit"),
  quest.c:133) pre-wired and measured to fire on the JS side.

## C ↔ JS fidelity

Byte-compared myself (`cat -A`) against pinned quest.lua :283–289:
3-line body verbatim including the double space after «body!»; synopsis
`[The power of %o flows through your body!  You must return it to %l.]`
verbatim including its own double space; `output = "text"` exact. Raw
`%o`/`%l` matches the shipped-conversion pattern (same render path as
the Rog body and all other roles). No RNG, no prints authored — pure
data restoring the C window and its More; the desync mechanism (extra
nhl_init shuffle on the miss path) is removed the same way as D-3914.

## Hallucinations / overclaim

None. "TEXT EQUAL + SYN EQUAL" verified true at the byte level.

## Density

Cliff-phase: wishymatch was the head at the parent (6a87ce504 block:
1 block, RNG lost 34406, s377 — verified in the parent tree). Owner
stands (prints nothing), writer ported with its session measured (JS
granted the artifact identically; only the pager missed). One cliff,
one file, code + ledger + test + verify in one handoff. `Ledger:
com_pager_core ported` present. Not a no-op, not unreached (probe PASS).

## Verification

Re-measured myself (`verify wishymatch --base 1651cae7f~1 --reach-all`):

- `verify wishymatch: 1 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS` (587315 PASS)
- `smoke: 24/24 → REACH-OK`; zero `worse`/REGRESSED. Matches the D-log
  Verify bullet exactly.

Grep of added lines: clean. Rule #2 clean (iteration-wide
`imports.mjs --rulecheck`). No seed/step/coordinate reads. New test red
pre-fix on the C head line per the log; sibling Rog test still 1/1 per
the log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
