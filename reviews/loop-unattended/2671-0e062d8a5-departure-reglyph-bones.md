# Review 2671 — 0e062d8a5 — level_tele writer: departure shutdown + reglyph + bones paint

Metadata: SHA `0e062d8a5`, D-3807, cliff row-2 `teleport.c` level_tele
writer (@16a795551; row-1 void-barred, falsifier live-checked). JS:
do.js (+28/−12), display.js (+23/−6), bones.js (+13/−2). Test:
`scripts/rogue-departure-unseen-blank.test.mjs`.

## Intent vs deliverable

Promise: 3 screen blocks (C blank stone vs JS remembered floor after
level departure); five-part writer fix — unconditional departure
shutdown, arrival reglyph_darkroom, C-exact feel id, S_DARKROOM tty
equate, bones-yn paint gating. Claimed: 2 PASS, 95214 178→342 getobj.
Diff actually does all five, nothing else. Match.

## Inventory

- `goto_level` departure (js/do.js:1799) — Hallu gate removed, shutdown
  unconditional. C `do.c:1631` + `vision.c:820–836`.
- `goto_level` arrival (js/do.js:2093) — new `reglyph_darkroom()` call.
  C `do.c:1715`.
- `feel_location` id arm (js/display.js:5817) — flag pick, not
  rogue-aware. C `display.c:896–897`.
- `cmap_idx_to_tty` S_DARKROOM (js/display.js:1900) — S_room equate /
  blank. C `display.c:1850–1853`.
- `getbones` (js/bones.js:765/796) — Terminal paint moved before the
  wizard Get-yn. C `bones.c:671/740`.
- No new helpers; `reglyph_darkroom` (display.js:7936, sync, LIVE) joins
  do.js's existing display.js edge. No deletes, no new edges.

## C ↔ JS fidelity

(1) vision.c:820–836 not_in_sight arm newsyms old IN_SIGHT||COULD_SEE
cells with NO Hallu gate — the removed D-0852 gate was an under-port;
unconditional shutdown matches C. do.c:1631 runs it before savelev —
JS site (do.js:1819) likewise precedes the stash. (2) do.c:1715 calls
`reglyph_darkroom()` after the getlev/mklev join, before
set_uinwater/vision_reset — JS call sits exactly there; the rogue arm
(display.c:1836–1841: S_darkroom + !waslit → GLYPH_NOTHING on rogue)
is what blanks 95240 (50,11). (3) display.c:896–897 stores
`dark_room ? S_darkroom : S_stone`, flag-based — JS now does exactly
that (paint ch/color untouched, id-only). (4) display.c:1850–1853
equates showsyms[S_darkroom] to S_room under dark_room+color else
NOTHING — JS tty arm mirrors it (DEC `~`/NO_COLOR vs blank). (5)
bones.c:671/740 `y_n("Get/Unlink bones?")` are the only prompt flush
sites; silent load/discard flushes nothing — JS paint now gated to
just before Get-yn with a leave-level guard (game-start getbones has
none). No RNG in any touched arm; `vision_off_newsym_gbuf` is idem-
potent at both call sites. `_leave_viz_burned` now always set on the
departure path; the bones fallback stays for non-departure paths.
Gap: none. Five-for-five C-cited confirm.

## Hallucinations / overclaim

None. The D-log discloses the stale-working-score artifact (`show`
reading uncommitted PASS before the fix) and rests the claim on
live-worker verify output only — honest instrumentation hygiene.
Mechanism measured (ten-diverse-deaths seg9: JS painted shutdown-
yellow branch stair where recorded C[335] shows default). No
dispatch-vs-callee mismatch: owner level_tele verified symptom-only
(ledger ported), writers are the port.

## Density

Cliff-phase: one mechanism (departure memory + arrival reglyph +
prompt paint), same 3 probes — cohesive single cliff, not bundled
C files. Whole-function: goto_level gains the two cited call sites
(Ledger `goto_level partial`, restgamestate :926 stays named);
getbones ported. #992 risk addressed: narrowing kept for
non-departure shutdowns, full 44/44 + cohort run. Verify bullet:
movement + REACH-OK 10/10 + green + strict + cohort + auto full.
Not unreached: all 3 sessions moved.

## Verification

Added-lines grep: clean. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify level_tele --base 0e062d8a5~1 --reach-all`
→ `2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` (95240/
95218 PASS; 95214 178→342 getobj) and `reach 10/10 → REACH-OK` —
exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
