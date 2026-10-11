# Review 2697 — becfa3357 — quest arrival texts (Mon/Ran/Tou)

Metadata: SHA `becfa3357`, D-3834, cliffs-head `teleport.c`
level_tele writer (symptom owner stands whole since
D-1846/D-2054/D-2136). JS: `js/questpgr.js` (+34/−6: 3 bodies +
2 meta + docs), `js/quest.js` (header role lists only). Tests:
3 new `scripts/quest-arrival-*.test.mjs`.

## Intent vs deliverable

Promise: 3/4 sessions screen-first at teleport.c:1427 with C's
materialize-More hiding a quest arrival text behind it (Mon
firsttime text window, Ran locate_first text window, Tou
goal_first pline); port the three bodies verbatim from
quest.lua + 2 QUEST_MSG_META entries (Tou deliberately none —
lua has neither key, default pline arm like D-3738's Wiz).
Claims 2 PASS + 1 moved (45→1109). Diff actually does: exactly
that, data only, no new imports/edges. Match.

## Inventory

- `QUEST_FIRSTTIME.Mon` (js/questpgr.js:329–333) — new. Pinned
  C: `nethack-c/upstream/dat/quest.lua:1388–1395` (firsttime
  block; `grep -n` + `sed` read): synopsis `[You have reached
  %H but something is wrong.  %lC needs your aid.]`,
  output=text, 4-line text. JS body byte-identical including
  the `here.  Strange` double space and the truly-empty blank
  line.
- `QUEST_LOCATE_FIRST.Ran` (js/questpgr.js:464–475) — new.
  quest.lua:1914–1928: synopsis `[This is %i.  There are bats
  nearby.  Beware the wumpus!]`, output=text, 10-line text. JS
  identical including `tunnels.  Your`, `arrows.  Good luck.`,
  `cave.  There are` double spaces and both blank lines.
- `QUEST_GOAL_FIRST.Tou` (js/questpgr.js:552) — new.
  quest.lua:2507–2509: text-only `You sense the presence of
  %o.` — no output/synopsis keys, so the default pline arm is
  correct (same shape as the shipped Wiz entry).
- `QUEST_MSG_META` firsttime.Mon + locate_first.Ran
  (js/questpgr.js:709–712, 769–772) — new, synopses verbatim
  from the same lua blocks. No goal_first.Tou entry — correct.
- Conversions %H/%l/%lC/%i/%o previously shipped (not
  re-audited; the recorded C screens in the D-log show them
  converted). No helpers, no re-points — nothing for `sym.mjs`.

## C ↔ JS fidelity

All three bodies and both synopses verified character-level
against pinned quest.lua (cites above; the D-log's
:1389–1395/:1914–1928/:2507–2509 ranges check out — block
opener at :1388). The delivery mechanism (text window vs
default pline) follows the presence/absence of output/synopsis
keys in lua, matching the established D-3738/D-3762 pattern.
No RNG; message-only. Gap: none.

## Hallucinations / overclaim

None. History tags honored by name (D-2054, D-3738, D-3762
arms distinguished as different writers), the cMsgOwners
matches are correctly dismissed as comment literals per
D-3558, and the 1 unchanged session gets a NO-MOVEMENT PROOF
with a falsifiable shape (identical toplines, RNG 74116/74116
matched, map-row-9-only diff) rather than silence.

## Density

Cliff-phase: head writer correct (quest arrival msgids, not a
re-port of level_tele). Three bodies in one C-file family —
one cliff, not three. Ledger: `com_pager_core ported`.
Verify bullet: 2 PASS + 1 moved + proof + REACH-OK + green +
strict + cohort + forced full 44/44 (same code state). Not
unreached: 3 of 4 probes move.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine, default spread + all blocked): `verify
level_tele --base becfa3357~1` → `2 PASS, 2 moved past
(2 still level_tele at a later step), 1 unchanged, 0 worse`
(Ranger-578310 PASS; Tourist-578104 PASS; Monk-578207 45→1109
still level_tele, 1064 later — the D-log's 4 probes exactly;
Knight-578306 → level_tele@859 joined via the later D-3835;
Wiz-578116 unchanged@226 with identical toplines as proven);
reach 14/14 REACH-OK. Zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
