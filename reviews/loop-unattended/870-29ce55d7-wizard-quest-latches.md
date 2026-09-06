# Review 870 — 29ce55d7 — wizard.c clonewiz family + quest latches (D-1900)

Metadata: SHA `29ce55d7`, D-1900. Files: `js/wizard.js` (+95/−4:
`which_arti/mon_has_arti/other_mon_has_arti/on_ground/
wizdeadorgone` + const extensions), `js/quest.js` (+47:
`nemdead/leaddead/nemesis_stinks` + 1 import). Next index 870.

Intent vs deliverable: subject promises the five covetous-helpers
plus three quest death latches in C order. The diff delivers all
eight, nothing else. Promise ≡ diff.

Inventory: 8 new functions (C-public ones exported, C-statics
file-local — correct). Callee closure: `create_gas_cloud`
(region.js:851 async, awaited ✓) joins the existing quest.js→
region.js edge (`--can` ALREADY); M3 consts extend the live
monsters.js edge (values confirmed: 0x0001/2/4/8);
`ART_ORB_OF_DETECTION=21` from generated leaf-data (const-only,
no cycle surface); `rn1` extends rng.js; `qt_pager`
pre-imported. Nothing deleted or re-pointed.

**C ↔ JS fidelity** (each vs its `csym` range): `which_arti` ≡
`wizard.c:141–157` (exact 4-arm switch, default→0 with the quest-
artifact meaning, incl. M3_WANTSARTI/combined masks as
disclosed) ✓; `mon_has_arti` ≡ `:164–177` (minvent loop, otyp
arm `|0`-compared, else `any_quest_artifact` ≡ `obj.h:271`
`oartifact >= ART_ORB_OF_DETECTION` — verified, 1/0 returns)
✓; `other_mon_has_arti` ≡ `:183–195` (fmon walk, `!==` self,
no-DEADMONSTER-check comment preserved, null miss) ✓;
`on_ground` ≡ `:201–213` (fobj chain, same two arms) ✓;
`wizdeadorgone` ≡ `:813–822` (unconditional census −1, udemigod
latch + `rn1(250,50)` — the only RNG call, exact) ✓; `nemdead`
≡ `quest.c:106–113` (latch + pager) ✓; `leaddead` ≡ `:115–122`
(C TODO stays a comment — correct, no pager ships) ✓;
`nemesis_stinks` ≡ `:425–438` (save/set/restore `mon_moving`,
cloud 5,8, caller-picks-stinky documented) ✓. Object-const
lookup via `objectNames.indexOf` matches the file's existing
PM_* convention.

Hallucinations / overclaim: none. The "all nine checked"
hidden note is explicit that zero are blocked (vacuous, not a
PASS); callers (`strategy`, `stinky_nemesis` picker, mon.c
wiring) are named in the map rows that own them rather than
claimed.

Density: 142 insertions, one two-file family (wizard+quest
death bookkeeping) — coherent.

Verification: D-log gates PASS; `skip full` per the tool.
Re-measured myself: `hidden-proxy.mjs verify wizdeadorgone
--base 29ce55d7~1` → `0 blocked (0 at baseline, 0 working)` —
vacuous as stated; HELDOUT Tier C row cited no blocks, public
gates carry it. Diff grep: no banned patterns (hit is the
message's own "no DIAG/FORCE/seed gates" text).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
