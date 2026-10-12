# Review 2732 — 7f356b471 — quest goal_first Hea+Val + sobj_at (D-3872)

## Metadata

- SHA: `7f356b471` (cliffs-head writer port, level_tele row: 4 blocks)
- D-entry: D-3872; Ledger: `com_pager_core ported; xkilled ported`
- js diff: `js/questpgr.js` (+21/−2: 2 bodies + 2 meta + docs),
  `js/quest.js` header (+1/−1), `js/uhitm.js` (+1/−1 import) + 2 tests
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: Hea+Val goal_first arrival texts behind level_tele
(3 PASS) + the `sobj_at` import unblocker for xkilled's pit-boulder arm.

The diff actually adds: exactly that — two quest-text bodies + meta
entries + role-list docs, and `sobj_at` added to uhitm.js's existing
`./mkobj.js` import. No new module edge. Promise == deliverable.

## Inventory

- `QUEST_GOAL_FIRST.Hea` / `.Val` (`js/questpgr.js:571–581`, data) —
  new bodies.
- `QUEST_MSG_META.goal_first.{Hea,Val}` (`js/questpgr.js:839–846`) —
  output+synopsis entries, Cav/Ran precedent.
- `xkilled` (`js/uhitm.js:799`) — unchanged body; its `sobj_at` call now
  resolves to the live `js/mkobj.js:3335` export (same `(otyp,x,y)`
  signature; `sym.mjs sobj_at` confirms the live export). Import-only
  fix at the single use site — no re-point paste beyond this.

## C ↔ JS fidelity

Data half, verified byte-for-byte by this audit against pinned
`dat/quest.lua`: Hea goal_first `:954–963` → 260 chars equal; Val
`:2725–2730` → 184 chars equal (double spaces incl.); both synopses
equal (`[You have reached the lair of %n. …]`, `[This is the lair of
%n.]`). `%n/%l/%o/%x` conversions are the previously shipped path
(exercised by Arc/Bar/Kni). The C order claim (goal text THEN
heat/smoke) matches the recorded screens (Val s305 goal, s306
heat/smoke).

Unblocker half: C `xkilled` calls `sobj_at(BOULDER, x, y)` for the
pit-boulder nocorpse arm — confirmed via csym (relative lines 41–42).
CITE NIT (not a C-wrong, not queueable): the D-log cites
"uhitm.c xkilled :3515–3524" but `csym.mjs xkilled` resolves to
`nethack-c/upstream/src/mon.c:3476–3740` — right line numbers, wrong
file. The JS fix itself (importing the live export) is correct
regardless. RNG: none in either half.

## Hallucinations / overclaim

None material. The "byte-verbatim" claim re-verified true. One
prediction proved wrong but honestly reported: the D-log said
Knight-578306 "re-attributes under its map writer" — this audit's
`show` still reports `owner: level_tele @859` (RNG 81958/81958 full).
The Verify bullet reported "3 PASS, 1 unchanged" without claiming the
4th moved, so this is a wrong forecast, not a false movement claim.
No markers in the hunks; Rule #2 clean (review 2727 scan).

## Density

Cliff-head writer port with movement on 3/4 probe sessions (PROGRESS).
The 4th (Knight-578306) is outside the shipped arm by construction — a
Hea/Val text-table addition cannot move a Knight map-row divergence —
with measured proof (identical toplines, full RNG, map-row-only diff);
it stays on the board for its own writer row. That is PROGRESS-with-proof,
not NO-MOVEMENT packaging. Two `Ledger` entries for the two units.
The `sobj_at` import is a same-row unblocker (ReferenceError on the
newly reached true path), not a bundled second cliff.

## Verification

Re-measured by this audit
(`verify level_tele --base 7f356b471~1 --reach-all`):

- `verify level_tele: 3 PASS, 0 moved past, 1 unchanged, 0 worse →
  PROGRESS` (Hea-582617, Hea-582636, Val-582628 PASS; Knight-578306
  still level_tele@859 — the documented case).
- `reach level_tele: 17/17 PASS → REACH-OK`.

No REGRESSED session. The "3 PASS + 1 documented unchanged" claim is
confirmed exactly on current code.

## Actionable C-wrongs

None. (The xkilled file cite is a docs nit for whoever next touches
D-3872, not a queue row.)

Verdict: **ACCEPT**
