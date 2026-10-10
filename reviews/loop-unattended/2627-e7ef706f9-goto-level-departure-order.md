# Review 2627 — e7ef706f9 — goto_level departure order (D-3761)

Metadata. SHA `e7ef706f9` (2026-10-10), D-3761, parent
`63beb35a8`. js diff: `js/do.js` +9/−9 (pure reorder
of the departure block; zero logic lines changed) +
`scripts/goto-level-leave-order.test.mjs` (new, 1 it).
Ledger: `goto_level` partial (D-3761 appended). Works
its HEAD's cliffs head (`shk.c` rob_shop, 1 blocked:
95323 — verified head of the parent queue @5fa95f0c5;
row shows C `uu` vs JS `u?`, exactly this symptom).

## Intent vs deliverable

Promise (subject + D-log): 95323@772 kind=screen,
toplines identical («You escaped the shop without
paying!--More--»); first differing cell (71,12): C `u`
vs JS `?`. Geom-probe: both tame unicorns on the map
at 771; at 772 the mnum-104 pet sits in mydogs
(mx=0,my=0) while C keeps both `u` through 774. Root
cause: JS ran keepdogs before check_special_room, so
pets left fmon before the leave-shop robbery messages
paginated. Reorder the departure block to C order; no
other relative-order changes, no new imports.

Diff actually adds exactly the reorder (keepdogs block
+ recalc_mapseen moved down; all lines between
untouched). Promise and diff match.

## Inventory

Changed JS (1 reorder):

- goto_level departure — `js/do.js:1766–1788`.
  C: `do.c` goto_level `:1615–1629` +
  `vision_recalc(2)` (body read): check_special_room
  (TRUE) `:1615` → unplacebc (Punished) → reset_utrap
  (FALSE) `:1618` → fill_pit `:1619` → set_ustuck →
  set_uinwater `:1621` → uundetected `:1622` →
  keepdogs `:1623–1624` → recalc_mapseen `:1625` →
  vision_recalc(2).

## C ↔ JS fidelity

**Order exact.** JS now runs check_special_room(true)
→ unplacebc (Punished gate `u.uball || u.Punished`,
pre-existing) → reset_utrap(false) → fill_pit →
set_ustuck(null) → set_uinwater(0) → uundetected=0 →
keepdogs(false) (unless nofollowers) → recalc_mapseen
→ (leave-viz snapshot, pre-existing) → vision_recalc —
C's sequence call-for-call. The moved hunk boundaries
confirm "no other relative-order changes": the
intervening trap/ustuck cleanup lines are byte-identical
context, not rewrites.

**Mechanism C-true.** keepdogs migrates pets off fmon;
check_special_room(TRUE) paginates the robbery
messages mid-turn. C's order keeps both `u` on the map
through the --More-- repaint; JS's old inverted order
dropped the pet first (the `?`). The fix is a pure
ordering port — no RNG, no new draws, no branch
changes.

**Callees:** all LIVE in do.js (check_special_room,
unplacebc, reset_utrap, fill_pit, set_ustuck,
set_uinwater, keepdogs, recalc_mapseen); zero imports
added, zero stubs. No symbol deleted or re-pointed, so
no sym.mjs paste is owed.

**Test.** Corpus-replay style: red pre-fix (`?` vs
`u`), green post-fix (D-log). Re-ran: 1/1 (this
audit).

## Hallucinations / overclaim

None. Diff grep (FORCE / DIAG / getRngLog / fastforward
/ seed / coords): zero hits. The "no other
relative-order changes" claim verifies from the hunk
boundaries.

## Density

Cliff-phase §2b: parent head rob_shop (1 blocked, RNG
lost 37669); this commit ships the writer (goto_level's
departure order — owner region-heuristic, writer = the
pet-placement order) with 1 moved (+37 at ship). One
cliff, one C locus (`do.c:1615–1625`), no bundling.
Correct gates incl. full 44/44 on the shared file
(claimed in D-log).

## Verification

D-log Verify (`verify.mjs --fn rob_shop,goto_level`):
95323 772→level_tele@809; reach rob_shop 24-smoke +
goto_level 42/42 → REACH-OK; gates + full PASS.

Re-measured by this audit (`verify rob_shop,goto_level
--base e7ef706f9~1 --reach-all`; HEAD code includes 3
later SHAs):

```text
verify rob_shop: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Valkyrie-95323: moved → wiz_intrinsic at step 1082 (was 772)
smoke rob_shop: no RNG-tagged reach; fixed smoke spread (24 run, 13.1s): 24 PASS, 0 regressed → REACH-OK
verify goto_level: no corpus session is blocked on it at e7ef706f9~1 — a vacuous verify is NOT a corpus PASS. […]
reach goto_level: 42 baseline-PASS session(s) reach it (42 run, 56.5s): 42 PASS, 0 regressed → REACH-OK
```

95323 now sits at wiz_intrinsic@1082 — strictly past
the ship-time level_tele@809 (later SHAs moved it
further). Forward progress, not a contradiction; 0
worse. No vacuous check (row cited 1; that session
itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
