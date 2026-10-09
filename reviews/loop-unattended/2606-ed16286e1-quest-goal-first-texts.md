# Review 2606 — ed16286e1 — quest goal_first texts Cav/Ran/Wiz (D-3738)

Metadata. SHA `ed16286e1` (2026-10-09), D-3738, parent `f858ca1bc`
(audit 2600–2605). js diff: `js/questpgr.js` +28/−1 (3
`QUEST_GOAL_FIRST` bodies + 2 `QUEST_MSG_META` entries + header),
`js/quest.js` +2/−1 (header role list), 1 test
(`scripts/quest-goal-first-cav-ran-wiz.test.mjs`, 3 cases). Ledger:
`com_pager_core` ported (D-3738 appended, note unchanged). Works its
HEAD's cliffs head (`teleport.c` level_tele, 6 blocked — verified in
the parent queue).

## Intent vs deliverable

Promise (subject + D-log): the level_tele head's 3 text probes are
screen-first at `teleport.c:1427` because C prints the quest-goal
`goal_first` text behind the arrival `--More--` while JS stays
silent (role miss → common-retry miss); ship the Cav/Ran/Wiz bodies
verbatim from quest.lua so all three move. Claimed: 0 PASS + 3 moved
(95234 357→moveloop_core@397, 95231 116→menu_identify@152, 95228
235→getobj@936), 3 unchanged with outside-the-arm proofs, REACH-OK,
44/44 forced.

Diff actually adds exactly those 3 bodies + 2 meta entries +
headers. Promise and diff match. No JS function bodies changed
(data tables only); no new imports/edges.

## Inventory

Changed JS (data, no functions):

- `QUEST_GOAL_FIRST.Cav/Ran/Wiz` — `js/questpgr.js:488–495,
  513–522` (3 bodies). C: `dat/quest.lua` Cav `goal_first`
  `:730–740`, Ran `:1833–1842`, Wiz `:2947–2949`.
- `QUEST_MSG_META.goal_first.Cav/Ran` — `js/questpgr.js:737–740,
  753–756` (`{output:'text', synopsis}`). C: same lua stanzas
  (synopsis/output keys); Wiz stanza has neither key (verified).
- Header role lists — `js/questpgr.js:477–480`,
  `js/quest.js:9–10` (comments only).

C delivery path: `quest.c on_goal :61–87` (`csym`; first-visit arm
`:65–68` calls `qt_pager("goal_first")`, set made_goal) ←
`onquest` ← `goto_level do.c:1891–1892`. Delivery: questpgr.c
com_pager_core `:468–621` (output=text window + synopsis;
no-output key → deliver_by_pline).

## C ↔ JS fidelity

**Bodies verbatim.** `cat -A` of the lua stanzas: Cav text
matches JS char-for-char (blank lines truly empty, `%nC … %nh`
intact); Cav synopsis `[You enter a large cavern.  %nC is
present.]` — double space after the period, JS identical. Ran text
+ synopsis (`[You descend into a subterranean complex.  Hooves
clatter in the distance.]`, double space) identical. Wiz
`text = "You feel your mentor's presence; perhaps %o is nearby."`
identical, and the stanza carries no `output`/`synopsis` keys —
so omitting the META entry is C-exact, not a gap.

**Wiz default arm.** `howtoput2i` (`js/questpgr.js:1176–1178`,
verified): absent output → `'default'` → 0; Wiz text is
single-line and short, so the `:1390–1396` window-promotion does
not fire and `:1399–1400` delivers via `deliver_by_pline` (LIVE,
`js/questpgr.js:1272`). Matches C (no-output single line →
pline). `%nC`/`%nh`/`%o` conversions are shared convert_line
machinery already exercised by shipped bodies (Bar/Kni/Cav
killed_nemesis entries use `%nC`); the focused test asserts the
converted strings on real recipe prefixes.

**Callers.** C `do.c:1892` goto_level→onquest → `js/do.js:2322`
(pre-existing); C `quest.c:101`→on_goal → `js/quest.js:211`;
`qt_pager('goal_first')` → `js/quest.js:184`; lookup/output →
`lookup_quest_entry:1197` / `howtoput2i:1176` /
`com_pager_core:1343` — all pre-existing, now hit for 3 more
roles. level_tele body untouched (already whole per D-2136, read
not re-ported — correct under the row tag).

**Named omissions** (in-map, not Must-fix): Hea/Mon/Rog/Tou/Val
goal_first bodies (lua lines cited, no session reaches them);
goal_next beyond Arc/Bar/Pri/Kni (pre-existing); the 3 map-writer
sessions (own future rows). Ledger bump appends D-3738 to the
standing `com_pager_core` ported row — a data closure on an
already-whole body, legitimate.

## Hallucinations / overclaim

None. The "C prints heat-smoke too, two acks later" re-read is
stated as measured (recorded next-step screens), and the Cav probe
moving past confirms the ordering claim. `cMsgOwners`
Sting_effects/goto_level dismissed as comment-literal matches per
D-3558 — plausible and immaterial (screen-first divergence, no
RNG claim). Diff grep: `DIAG`/`FORCE` hits are only the
commit-message sentence "no DIAG/FORCE/seed gates" and a
pre-existing `seed0367` session-id comment — no control-flow use.
No symbol deleted or re-pointed, so no `sym.mjs` paste required;
nothing kept is cycle-claimed. Rule #2: global `imports.mjs
--rulecheck` → clean (this audit).

## Density

Cliff-phase §2b: parent head is level_tele (6 blocked); this
commit ships the writer the 3 text probes' divergences name
(C-text-behind-More vs JS-silence), whole for the reached roles,
with the unreached roles named. Not an idiom sweep, not a
successor lead, not ledger text. The 3 no-movement sessions carry
structural outside-the-arm proofs (identical bare-materialize
toplines, no More either side — the arm always emits a message +
More when it fires), and the re-measure below confirms they sit
exactly where named. Correct gates (green/strict/cohort + forced
full 44/44).

## Verification

D-log Verify (`verify.mjs --fn level_tele`): 0 PASS + 3 moved + 3
unchanged + 0 worse → PROGRESS; reach 2/2 → REACH-OK; green 2/2,
strict ×2, cohort 7/7; full 44/44 forced. New test 0/3 → 3/3.

Re-measured by this audit (`verify level_tele --base
ed16286e1~1 --reach-all`; HEAD code includes 8 later SHAs, so
later movement is expected — the check is the 3 text probes):

```text
verify level_tele: 0 PASS, 5 moved past (2 still level_tele at a later step), 3 unchanged, 0 worse → PROGRESS
reach level_tele: 2 baseline-PASS session(s) reach it (2 run): 2 PASS, 0 regressed → REACH-OK
```

95231 → menu_identify@152 and 95228 → getobj@936 land exactly as
claimed; 95234 → xname_flags@624 (past the claimed
moveloop_core@397 — D-3741 moved it further, strictly later, no
contradiction). The 3 unchanged are exactly the named map-writer
sessions (95238 s315, 95214 s178, 95218 s345, identical toplines).
The 2 extra "still level_tele at a later step" (95334 534→569,
95240 475→488) entered the block via D-3743 — later-SHA
attribution, not this commit's claim. 0 worse, 0 regressed. No
vacuous check (row cited 6; all 6 itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
