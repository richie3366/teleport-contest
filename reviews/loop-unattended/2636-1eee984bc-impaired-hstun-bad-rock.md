# Review 2636 — 1eee984bc — impaired writers HStun + bad_rock (D-3772)

Metadata. SHA `1eee984bc` (2026-10-10), D-3772, parent
`b39d64036`. js diff: `js/hack.js` +17/−19 (HStun
arm + live-bad_rock swap + `tries++` + clone
delete) + `scripts/u-maybe-impaired-hstun.test.mjs`
(new, 5 its). Ledger: `u_maybe_impaired`,
`impaired_movement` ported (D-3772 appended ×2).
Works the parent queue's row-2 (`cmd.c` confdir, 1
blocked: 95347 — verified; row-1 randomize
exhausted, skipped per precedent).

## Intent vs deliverable

Promise: 95347@485 — hero is a HStun-stunned
stalker (FROMFORM grant synced HStun+slot but not
the `u.Stunned` mirror), JS read only the mirror →
walked into a wall instead of the impaired path.
Second: the thin `bad_rock_hero` clone accepted a
Sokoban-boulder square C rejects. Fix: dual-flat
Stun read + live `bad_rock` + C-order `tries++`.

Diff delivers exactly the three changes in one
file. Promise and diff match. No new edge
(bad_rock already imported).

## Inventory

Changed JS (2 writers, 1 file):

- u_maybe_impaired Stunned arm —
  `js/hack.js:2604` (`(u.HStun|0) || u.Stunned`).
  C: `hack.c:2417–2421` (`Stunned ||
  (Confusion && !rn2(5))` — csym read) +
  `youprop.h:80–81` (`Stunned ≡ HStun` — read).
- impaired_movement reject + tries —
  `js/hack.js:2634–2653` (`bad_rock(
  game.youmonst?.data, x, y)`, `tries++ > 50`).
  C: `hack.c:2424–2441` (postfix `tries++`,
  `bad_rock(gy.youmonst.data)` — csym read) +
  `hack.c:939–946` (Sokoban arm first — read).

## C ↔ JS fidelity

**Both bodies now C-exact.** Stun arm: C reads
HStun only; JS reads HStun OR the legacy mirror —
the OR is harmless (mirror set only alongside
stun; the observed desync was stale-false, which
the HStun disjunct fixes) and matches the
house-canonical shape (botl.js:3470 + 6 clones).
Short-circuit preserved: no `rn2(5)` when Stunned
or not Confused, exactly like C. impaired loop:
postfix tries (51 draws max, was 50), live
`bad_rock` over `game.youmonst.data` ≡ C's
`gy.youmonst.data`. The live callee
(`js/mon.js:208`, read) ports C whole — Sokoban
boulder scan first, then obstructed + dig/pass
arms. LIVE callee, no stubs.

**sym.mjs (required — deleted clone):**

```text
bad_rock_hero    NOT FOUND in js/** (no export, no local function/const).
bad_rock         js/mon.js:208   sync
```

Delete clean (sole caller was impaired_movement;
no other refs — the symbol is gone from the
index). Callers pre-wired (confdir :2614/:2636,
domove cmd.js:6551); confdir's 6 C sites listed
wired with file:lines. Signatures kept.

**Test.** 5 its incl. the boulder re-roll
sequence ending SE. 3/4 → 5/5 (+13/13 with the
sibling suites) is the authentic shape.

## Hallucinations / overclaim

None. Diff grep: zero code hits (only the commit
message's own assertion). The measured chain
(HStun=0x10000000/Stunned=undefined, live
bad_rock=true vs clone=false on (29,7),
mention_walls-off silent bump) explains both the
missing draws and the exact re-roll acceptance.
Named omits (door arms, PROPSET unsync, Confusion
slot) carry the no-session-evidence discipline —
correctly not Must-fix.

## Density

Cliff-phase §2b: one row, two writers in one C
file (`hack.c:2417–2441` + the already-live
`:939–946`) — one cliff, no bundling. 95347
485→m_move@492 per the D-log (+7 with the full
impaired path restored: confdir×2 + attack chain).

## Verification

D-log Verify: confdir 0 PASS + 1 moved
(485→492); reach 29/29 + 12/12; green/strict/
cohort/full PASS. rng-diff flat +66 (no zeroing).

Re-measured by this audit (`verify
confdir,u_maybe_impaired,impaired_movement --base
1eee984bc~1 --reach-all`):

```text
verify confdir: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Wizard-95347: moved → explode at step 824 (was 485)
reach confdir: 29 baseline-PASS session(s) reach it (29 run, 21.1s): 29 PASS, 0 regressed → REACH-OK
reach u_maybe_impaired: 12 baseline-PASS session(s) reach it (12 run, 12.8s): 12 PASS, 0 regressed → REACH-OK
smoke impaired_movement: 24 PASS, 0 regressed → REACH-OK (fixed spread, no RNG-tagged reach)
```

95347 reads 485→explode@824 on HEAD (later SHA
D-3773 moved it past the D-log's 492 leg —
strictly later, not a contradiction). No
REGRESSED anywhere; the two writer-vacuous lines
are honestly labeled.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
