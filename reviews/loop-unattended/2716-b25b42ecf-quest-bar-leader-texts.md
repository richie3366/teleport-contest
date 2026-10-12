# Review 2716 — b25b42ecf — quest Bar leader_first + badalign (D-3855)

Metadata: SHA `b25b42ecf`, D-3855, cliffs-head `muse.c`
mquaffmsg writer (lookup miss collapsed the 6-step leader
chat into one step). JS: `js/questpgr.js` (2 data bodies + 2
META + doc lists). Test:
`scripts/quest-chat-barbarian-leader-first.test.mjs` (new,
recipe-prefix, pins the s370 + s373 C strings).

## Intent vs deliverable

Promise: Barbarian-578309@369 — C spreads the first leader
chat over s369–374 (chugging+More, leader_first window,
is_pure, yn, badalign, expulsion) while JS, missing the Bar
bodies, skipped both windows and ran everything in-step;
add both bodies verbatim from quest.lua with META
output/synopsis (lua HAS both keys here); session FULL
PASS. Diff actually does that. Match.

## Inventory

- QUEST_LEADER_FIRST.Bar (questpgr.js:340): 4-line body with
  the blank line before the quoted second paragraph. Lua
  `:562–569` (read) — verbatim; synopsis `[\"At last you have
  returned. …\"]` + output=text in META — verbatim.
- QUEST_BADALIGN.Bar (questpgr.js:378): 4-line body
  (`%pC! … path of the %a!` … `%n …`). Lua `:443–450`
  (read) — verbatim; synopsis + output=text in META —
  verbatim.
- No function changed, no imports, no edges. %p/%pC/%a/%n
  conversions pre-shipped (Arc/Pri exercise them in these
  same tables). Keys land under the matching msgids
  (leader_first/badalign table + META sections, read).

## C ↔ JS fidelity

Byte-for-byte confirm against pinned lua (both bodies +
both synopses re-read here). The TEXT-window delivery arm
is right: C s370/s373 show text windows with 0/2 RNG while
the surrounding steps carry the chat's other draws — the
META output=text entries route through deliver_by_window →
flush_topl_more + show_text_pages (pre-existing, whole),
which is exactly the pacing the D-log describes (wintty
flush-then-block). The collapse mechanism explains the
pre-fix shape (silent-FALSE after the C shuffle, no window,
no block) and the FULL PASS proves both windows now open
and block in C order.

## Hallucinations / overclaim

None. "%p→wizard via the set_playmode rename" is a live-code
cite (options.js:911 per D-log), consistent with the
Barbarian session showing «Ah, wizard.» — no fudging of the
role/text mismatch. Named omissions (remaining role bodies
per table) are correctly scoped as unreached.

## Density

Cliff-phase: parent HEAD was mquaffmsg (1 block, first 369 —
verified in 85f57e3f5 queue); owner read whole (9-line body,
not re-ported), writer port. Ledger: com_pager_core ported
+ D-3855. Reached: probe FULL PASS.

## Verification

js-hunk grep: 0 code hits (message-only "no DIAG/FORCE/seed
gates"). Rule #2 clean (iteration-wide run). Re-measure
(mine): `verify mquaffmsg --base b25b42ecf~1 --reach-all` →
`1 session(s) blocked on it (1 at baseline, 0 in the working
scoreboard)`, Barbarian-578309 PASS, `1 PASS, 0 moved past,
0 unchanged, 0 worse → PROGRESS`; smoke 24/24 REACH-OK (no
RNG-tagged reach). Zero regressed. The FULL-PASS claim is
exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
