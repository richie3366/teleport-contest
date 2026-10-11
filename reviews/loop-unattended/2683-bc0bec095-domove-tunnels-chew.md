# Review 2683 — bc0bec095 — domove tunnels arm via still_chewing

Metadata: SHA `bc0bec095`, D-3819, cliff row-2 `hack.c`
still_chewing caller (@6e7e9bf7a). JS: `js/cmd.js` (one arm in
domove + Deferred doc). Test:
`scripts/still-chewing-domove-tunnels.test.mjs`.

## Intent vs deliverable

Promise: domove inlines the test_move arms but only wired the
IRONBARS chew, so a tunneling polyform bumped rock silently; new
arm in C order (obstructed && !bars && !uinwater && tunnels &&
!needspick → still_chewing; truthy → move=0/nomul/return, falsy
falls through to occupy). Claimed: 95329 → PASS. Diff actually
does: one gated arm + doc line, no new imports. Match.

## Inventory

- `domove` (js/cmd.js:6746) — changed: tunnels arm after the
  IRONBARS chew, before testdiag/bump. C `hack.c:1037–1042`
  (verified) + gate context `:1010–1025` + `domove_core:2842–2848`
  (verified).
- Callees all live, all pre-existing in cmd.js scope:
  `still_chewing` (hack.js:3721 ASYNC, awaited; already used by
  the IRONBARS arm above), `tunnels`/`needspick` (monsters.js;
  cmd.js:63 import), `nomul`, `IS_OBSTRUCTED`. No new helpers, no
  deletes, no re-points, no new edges.

## C ↔ JS fidelity

C `test_move :1010–1043` gate order (verified by direct read):
OBSTRUCTED||BARS → feel (Blind) → Passes_walls pass → Underwater
block → IRONBARS chew/pass → **tunnels && !needspick → "Eat the
rock", DO_MOVE && still_chewing → FALSE** → autodig. JS arm
matches the bolded arm exactly, placed after the wired IRONBARS
arm and before testdiag/bump; the `!uinwater` gate preserves C's
Underwater-blocks-first order without porting its message, and
`destTyp !== IRONBARS` keeps the D-1270 arm authoritative. Truthy
path (move=0, nomul(0), return) matches C `domove_core :2842–2848`
(`!test_move && !door_opened → move=0; nomul(0); return`;
door_opened false here — door arms returned earlier). Falsy path
verified safe: `blocksMove` (cmd.js:3689) and the bump's `bloc`
both read `game.level?.at` fresh, so a chewed-through cell passes
like C's live tmpr — no stale-`destTyp` use below the arm.
Diagnosis measured: /tmp prefix probe (1163 moves: umber hulk
225, tunnels, !needspick, digging unset) + reverted temp DIAG
(test_move DO_MOVE never fires on this path). No RNG; none
added. Gap: none. Gate-by-gate confirm.

## Hallucinations / overclaim

None. Deferred arms (door/boulder tunnels, Passes_walls,
Underwater message, autodig, db_wall/soko) stay named in turns.md
with the new arm preserving their C order — the uinwater gate is
a real ordering guard, not a port of the message.

## Density

Cliff-phase: writer correct (domove inline, not re-porting
still_chewing which was already live). Row-2 head of its HEAD.
Ledger: test_move/domove arm. Verify bullet: 1 PASS + REACH-OK +
green + strict + cohort + forced full 44/44 for the domove
change. Named: none new. Not unreached: probe PASSES.

## Verification

js-hunk grep: 1 hit, commit-message prose only ("Temp DIAG
(reverted)") — no DIAG/FORCE in the code. Rule #2 clean
(iteration-wide run). Re-measure (mine): `verify still_chewing
--base bc0bec095~1 --reach-all` → `1 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS` (95329 PASS) and `smoke 24/24 →
REACH-OK` — exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
