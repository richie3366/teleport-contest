# Review 2239 — 3d8fe9bf9 — makemon grid place + move parity + leak fixes

Metadata: SHA `3d8fe9bf9dd10b8569d6feb118ac43b911bf9b5c` (D-3278,
2026-10-02). `js/makemon.js`, `js/monmove.js`,
`js/dogmove.js`, `js/bones.js`, `js/shk.js` (+~62/−~20).
Five C sites, one grid-occupancy closure: makemon.c:1295,
monmove.c:2051–2053, dogmove.c:1295–1297 + :1351–1352,
restore.c ghostly getlev :1177–1198, mon.c m_detach
take-off-map.

Intent vs deliverable: subject promises the makemon
birth-cell place + move parity + bones/shk leak fixes.
The diff wires `place_monster` at all five sites with
own-cell clears, a bones grid memset + place loop, and a
mongone_nonlocal cell clear. The queue head row warned
"movement parity first" — the parity + leak fixes are
the row's own requirement (wiring place alone regressed
seed0030 + 4 corpus mutants + public 43/44, all fixed in
the SHA). Delivers what it promises.

Inventory:

- `makemon` (makemon.js:3478): `place_monster(mtmp, x,
  y)` before mcansee; import pre-existed.
- `m_move` (monmove.js:2358): own-cell clear +
  `place_monster(nix,niy)` after m_postmove_effect,
  before msg_mon_movement; new monmove→steed edge
  (post-commit `--can`: ALREADY).
- `dog_move` (dogmove.js:1594 + :1655): same shape at
  the newdogpos site (after wasseen) and the leash
  `cc` site (at current mx/my, before newsym).
- `getlev_bones` (bones.js:662 + :671): `_level_monsters
  = new Map()` after fmon install, then place each
  restored mon after rest_worm; bones→steed ALREADY.
- `mongone_nonlocal` (shk.js:5062): cell clear on
  fmon splice.
- No symbol deleted or re-pointed → no required
  `sym.mjs` paste.

**C ↔ JS fidelity — `makemon`**: C makemon.c:1295
`place_monster(mtmp, x, y)` sits after mwandexp,
before `mcansee = mcanmove = TRUE` — JS position
identical ✓. **`m_move`**: C monmove.c:2051–2053
`remove_monster(omx,omy)` + `place_monster(nix,niy)`
+ `msg_mon_movement` — JS order identical ✓.
**`dog_move`**: C dogmove.c:1296–1297 (after
wasseen) and :1351–1352 (at mtmp->mx/my, before
newsym/set_apparxy) — JS matches both ✓ (cited
ranges exact). **Callee closure**: `place_monster`
LIVE, guards match C steed.c:897–932 (isok/isgd,
steed, dead, stacking) ✓; C `remove_monster` is
grid-only (rm.h:526–534) ✓ so the JS
`get(...)===mtmp` guard ≡ C in every C-reachable
state (cell always holds the mover) while not
sticking steed.js's gulpmm OFFMAP mark on a stacked
non-mover — verified steed.js:1233 shape ✓.
**`getlev_bones`**: C restore.c:1177–1179 memset +
per-mon place (:1180–1198) — JS reset placement
(before rest_worm, so seg cells survive — verified
worm.js writes `_level_monsters`) + place loop
match ✓; steed-off-map: JS relies on place_monster's
steed guard (fires impossible where C skips
silently — bones+active-steed corner, unreachable:
steed migrates with the hero); residency/hideunder
pre-existing gaps, disclosed in D-log Named ✓.
**`mongone_nonlocal`**: C mongone (mon.c:3266–3283)
→ m_detach → mon_leaving_level takes the mon off
the map — JS clear-on-splice matches the net effect
✓. No RNG in any hunk (pure occupancy).

Hallucinations / overclaim: none. The ghost census
(5 grid entries on no list) and the seed0030
`rn2(28)` vs `rn2(24)` mechanism are consistent with
the fixed leaks. The m_move "2 PASS PROGRESS" line
describes transient iteration mutants (regressed-
then-fixed), honestly labeled — at the committed
parent baseline m_move is 0 PASS, which my re-run
confirms; not a claim about the committed record.

Density: five files but one invariant (grid ⟺ fmon +
remove/place parity) + fortress-blocking fixes; the
queue row's own warn demanded the parity. Splitting
would have meant shipping 43/44. Acceptable as one
closure. `Ledger: makemon partial` + per-function
Named lines ✓.

Verification: D-log Verify shows per-function hidden
+ reach-all-80 + green/strict/cohort/full 44/44.
Re-measured (`hidden-proxy.mjs verify
makemon,m_move,dog_move --base 3d8fe9bf9~1
--reach-all`, full reach): makemon 0/0/3/0 NO
MOVEMENT + reach 701/701 → REACH-OK; m_move 0/0/3/0
+ reach 629/629 → REACH-OK; dog_move 0/0/3/0 +
reach 482/482 → REACH-OK. Zero worse/regressed
anywhere. The 9 stuck sessions match the D-log's
per-session evidence exactly (2 container
use-prompt timing + pet-Healer s26; engulf/ride/trap;
sokoban/descent rows) — honestly reported NO
MOVEMENT with same-step proof of off-cluster
symptoms, not a named-omission disguise.
Banned-pattern grep: clean (hits are commit-message
narrative only). Rule #2 clean (2238).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
