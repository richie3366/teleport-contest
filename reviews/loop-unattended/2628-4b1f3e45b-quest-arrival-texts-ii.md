# Review 2628 — 4b1f3e45b — quest arrival texts II (D-3762)

Metadata. SHA `4b1f3e45b` (2026-10-10), D-3762, parent
`e7ef706f9`. js diff: `js/questpgr.js` +18/−3 (3 text
bodies + 1 META entry + doc role lists) + `js/quest.js`
comment-only + 3 focused tests (1 it each). Data only;
no imports/edges. Works its HEAD's cliffs head
(`teleport.c` level_tele, 7 blocked — verified head of
the parent queue @63beb35a8).

## Intent vs deliverable

Promise (subject + D-log): 3 of the 7 level_tele
sessions are screen-first at `teleport.c:1427` with C
«You materialize on a different level!--More--» vs JS
bare (Val-95323 s809, Ran-95231 s536) or JS appending
«The heat and smoke are gone.» with no More (Wiz-95334
s569). Recorded C next-step screens show the quest
arrival text behind the More: Val firsttime window,
Wiz nexttime pline, Ran goal_next pline. Ship the three
bodies verbatim from quest.lua + the one META entry
lua carries (Val firsttime output=text + synopsis;
Wiz/Ran deliberately none — default pline arm).

Diff actually adds exactly that. Promise and diff
match.

## Inventory

Changed JS (data only):

- Val firsttime body — `js/questpgr.js` (~:319–326).
  C: `dat/quest.lua:2713–2722` (text + synopsis +
  output=text).
- Wiz nexttime body — (~:472). C: `quest.lua:3053–
  3055` (text only — no output/synopsis keys).
- Ran goal_next body — (~:544). C: `quest.lua:1843–
  1845` (text only — no output/synopsis keys).
- Val firsttime META — `QUEST_MSG_META` (~:684–686):
  {output:'text', synopsis}. C: `quest.lua:2714–2715`.

## C ↔ JS fidelity

**All three bodies verbatim (this audit, `cat -A`
re-read of the lua):** Val text matches byte-for-byte
including the double space after «hill.» and after
«%H.»; Val synopsis `[You arrive below %H.  Something
is wrong; there is lava present.]` matches with its
double space; output=text present. Wiz nexttime
`Once again, you are back at %H.` and Ran goal_next
`Once again, you enter the distorted castle of %n.`
match exactly, and both lua stanzas carry text only —
so the "deliberately no META entry → default pline
arm" decision is lua-true (same shape as D-3738's Wiz
goal_first). %H/%x/%n conversions are pre-existing
shipped machinery (untouched). No code paths changed:
no callee classification owed, no stubs. No symbol
deleted or re-pointed, so no sym.mjs paste is owed.

**Tests.** 3 single-prefix files (split post-fix after
a 0/3 combined pre-fix). Re-ran: 3/3 (this audit).

## Hallucinations / overclaim

None. Diff grep (FORCE / DIAG / getRngLog / fastforward
/ seed / coords): one hit, the commit message's own
"no DIAG/FORCE/seed gates" — zero code hits. The
Pri-95238 PASS is explicitly disclaimed as not-this-arm
(Priest cannot reach Val/Wiz/Ran role keys; attributed
to D-3761's reorder delta) — honest, and it does not
inflate the arm's count (2 PASS + 2 moved stands
without it: Wiz-95334 PASS + Val/Ran moved). The 3
unchanged sessions each carry a no-movement proof
(identical bare-materialize toplines, map-row diffs)
with their map writers named for re-attribution — a
documented split, not NO-MOVEMENT-as-omission (the arm
itself shows 2 PASS + 2 moved).

## Density

Cliff-phase §2b: parent head level_tele (7 blocked,
RNG lost 69008); this commit ships one message arm
behind the level_tele More with 2 PASS + 2 moved and
names the remaining writers (unreached role bodies +
3 map writers) for re-attribution. One cliff, one
locus (`quest.lua` arrival texts), no bundling.
Correct gates (green/strict/cohort + forced full
44/44 though no shared file changed).

## Verification

D-log Verify (`verify.mjs --fn level_tele`): 2 PASS +
2 moved + 3 unchanged, 0 worse; reach 4/4; gates +
full PASS.

Re-measured by this audit (`verify level_tele --base
4b1f3e45b~1 --reach-all`; HEAD code includes 2 later
SHAs):

```text
verify level_tele: 2 PASS, 2 moved past, 3 unchanged, 0 worse → PROGRESS
  scen-sweep-Valkyrie-95323: moved → wiz_intrinsic at step 1082 (was 809)
  scen-sweep-Wizard-95334: PASS
  scen-worldtour-Archeologist-95240: still level_tele at step 488 […]
  scen-worldtour-Priest-95238: PASS
  scen-worldtour-Ranger-95231: moved → mcalcmove at step 609 (was 536)
  scen-worldtour-Wizard-95214: still level_tele at step 178 […]
  scen-worldtour-Wizard-95218: still level_tele at step 345 […]
reach level_tele: 4 baseline-PASS session(s) reach it (4 run, 7.3s): 4 PASS, 0 regressed → REACH-OK
```

Identical to the D-log session-by-session (only
95323's owner advanced 809→1082 under later SHAs —
forward progress). The 3 unchanged show identical
toplines both sides, confirming they sit outside this
message arm. No vacuous check (row cited 7; all 7
itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
