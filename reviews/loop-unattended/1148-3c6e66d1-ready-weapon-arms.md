# Review 1148 — 3c6e66d1 — wield.c ready_weapon full arms (D-2182)

Metadata: SHA `3c6e66d1`, js/ +84/−~20 in `wield.js` only. D-log
D-2182. Subject promises: bimanual+shield gate, will_weld pline,
AKLYS tether, artifact shine, shop warning (5 corpus PASS, 3 move
to later owners).

Intent vs deliverable: promise matches diff. Actually adds: the
`:183–271` arms in C order (bimanual gate, weld pline vs
prinv+AKLYS, twoweap reread, shine, shop) + local otyp consts.
One C function, two corpus families (shield gate + weld pline).

Inventory: no new/deleted functions. New static imports
(`is_sword`, `RIGHT_HANDED`, `shop_keeper`, `inside_shop`,
`shkname`) + one dynamic (`artifact_light`, `begin_burn` from
timeout.js, runtime-only — same cycle-avoidance as `uwepgone`).
`sym.mjs`: all LIVE sync exports (objects.js:155, shk.js:249/
727, shknam.js:446, timeout.js:1280/1432, objnam.js:2363,
const.js:1601). No deleted/re-pointed symbols. Dynamic use =
no top-level TDZ read; `--can` not needed (no kept clone
claimed cycle-forced).

**C ↔ JS fidelity**: confirm against `wield.c:168–275`, arm by
arm.

- `!wep` empty/already-empty (1/0) and `retouch` fail → TIME:
  untouched, still correct.
- CORPSE+cant_wield_corpse → TIME: no code, comment only.
  OMIT — named in-commit in turns.md (+2 hunk: "D-2182;
  `cant_wield_corpse` petrification path / `arti_speak` rumor
  named") with C citation. Life-saved-only path; no corpus
  session reaches it. Ships legitimately.
- uarms+bimanual → FAIL: noun (`is_sword`?sword:BATTLE_AXE?
  axe:weapon) and message verbatim; 0 = no-turn in this file's
  0/1 scheme (FAIL≡OK here; `cmd.js 'w'` maps truthy→move).
- will_weld pline: tmp/`The ` prefix reduction, quan
  itself/themselves, URIGHTY dominant-hand, bimanual→plural —
  all verbatim. Gate `will_weld` is a pre-existing local clone
  (wield.js:162); matched to C here: `wield.c:68–69` macro =
  cursed && (erodeable_wep||TIN_OPENER), `wield.c:63–65` =
  WEAPON||is_weptool||BALL||CHAIN — the clone is exact.
  Verified CLONE, not a stub.
- `set_bknown(wep,1)` → `bknown=1; update_inventory()`.
  C `mkobj.c:1863–1873` gates the refresh (bknown-change +
  INVENT + moves>1); JS refreshes unconditionally.
  Display-only over-invalidation, no RNG/message surface —
  observation, not a C-wrong.
- else branch: owornmask kludge, AKLYS tether (condition shape
  kept, trivially true both sides as in C), prinv→xprname
  mapping pre-existing. setuwep, twoweap message (reread from
  `game.u` post-setuwep with the `uwep` null guard — matches
  C's comment), arti_speak omitted (OMIT, in-commit named; res
  already TIME so message-only), shine (`artifact_light` +
  `!lamplit` + `begin_burn` + `!Blind` pline verbatim), unpaid
  shop warning (verbatim), botl (pre-existing).
- `#if 0` elf/cold-iron arm correctly not ported.

RNG: none in this function either side.

Hallucinations / overclaim: none. "Dispatch ported, callee
stubbed" does not apply — every callee in the shipped arms is
LIVE or a verified CLONE; the two non-shipped arms are named
OMITs, not silent stubs.

Density: ~84 insertions, one C function — in-envelope.

Verification: D-log cites `verify.mjs --fn ready_weapon` → 5
PASS + 3 moved. Re-measured independently:
`hidden-proxy.mjs verify ready_weapon --base 3c6e66d1~1` →
baseline 8 blocked, `5 PASS, 3 moved past, 0 unchanged, 0 worse
→ PROGRESS` (92166/92204/92184/92181/92027 PASS; 92063→
save_dungeon@173; 92041→use_grapple@146; 92088→dodown@88).
Exact match. `rulecheck` clean (re-ran this iter). No
DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
