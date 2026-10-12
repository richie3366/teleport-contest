# Review 2714 — ad9fa3ee0 — quest nexttime Mon + Rog (D-3853)

Metadata: SHA `ad9fa3ee0`, D-3853, cliffs-head `teleport.c`
level_tele writer (home-revisit arrival texts; symptom owner
whole since D-1846, untouched). JS: `js/questpgr.js` (+10/−3:
two data bodies + docs) + `js/quest.js` (header role-list
comment). Tests: two recipe-prefix files (Monk/Rogue, one
prefix each per D-3762).

## Intent vs deliverable

Promise: 2 of the 4 level_tele blocks are screen-first at
teleport.c:1427 with bare materialize where C shows a
home-revisit nexttime behind the More (Monk-578207 s1109,
Rogue-578205 s1211); add both bodies verbatim from quest.lua
with no META entries (lua has neither output nor synopsis
key → default pline arm, Wiz precedent); both probes PASS
while the 2 map-writer sessions provably stay. Diff actually
does that. Match.

## Inventory

- QUEST_NEXTTIME.Mon (questpgr.js:497): `Once again, you stand
  before %H.` Lua: quest.lua `:1503–1505` (read):
  `nexttime = { text = "Once again, you stand before %H.", }`
  — no output/synopsis keys. Verbatim.
- QUEST_NEXTTIME.Rog (questpgr.js:499): two-line body with the
  double space after «Ransmannsby.» and `%l is waiting`. Lua
  `:2157–2160` (read) — verbatim including spacing and the
  line break; no output/synopsis keys.
- Chain: C do.c:1892 `onquest()` inside `:1891–1892` (read) →
  on_start home-revisit `qt_pager("nexttime")` → table wired
  at questpgr.js:892 (read). No function changed, no imports,
  no edges. %H/%l conversions pre-shipped (Arc/Bar exercise
  them in this same table).

## C ↔ JS fidelity

Byte-for-byte confirm against pinned lua (both bodies
re-read here, not trusted from `cat -A` claims). Delivery
arm is right: C's recorded screens show Monk Home-1 as a
single pline and Rogue Home-1 as a 2-line pline + More —
exactly the default-pline-arm shape, not a TEXT window, so
the deliberate META absence matches C's presentation. The
miss→silence mechanism explains the pre-fix collapse (role
lookup miss → common retry miss → silence: no second
message, no More) and both probes PASSing post-fix proves
the new bodies deliver through the pre-wired path.

## Hallucinations / overclaim

None. The NO-MOVEMENT PROOF for Knight-578306 s859 +
Wiz-578116 s226 is measured (toplines identical, blockedRng
0, map-row-only diffs) and constructionally sound — a
message-table addition cannot move sessions whose message
streams already match. Both re-split under their map writers
on regen as predicted (current queue shows exactly that).

## Density

Cliff-phase: parent HEAD was level_tele (4 blocks, first
1109 — verified in a98ee8462 queue); writer port for the 2
sessions the arm reaches, symptom owner stands. Ledger:
com_pager_core ported + D-3853. Reached: 2 probes PASS, 2
provably outside the arm.

## Verification

js-hunk grep: 0 code hits (message-only "no DIAG/FORCE/seed
gates"). Rule #2 clean (iteration-wide run). Re-measure
(mine): `verify level_tele --base ad9fa3ee0~1 --reach-all` →
`4 session(s) blocked on it (4 at baseline, 2 in the working
scoreboard)`, Monk-578207 + Rogue-578205 PASS, Knight-578306
s859 + Wiz-578116 s226 still level_tele with identical
toplines, `2 PASS, 0 moved past, 2 unchanged, 0 worse →
PROGRESS`; reach 15/15 REACH-OK. Zero regressed. The claim
is exactly true, unchanged sessions included.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
