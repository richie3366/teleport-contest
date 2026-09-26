# Review 1813 — ddddc6312 — block_entry (D-2854)

- SHA: `ddddc6312` (coverage; `shk.c` `block_entry`)
- Files: `js/shk.js` (new function), `js/hack.js`, `js/cmd.js`, `js/getpos.js`, `js/steed.js`, `js/trap.js`, `js/mhitm.js` (comments)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can js/hack.js js/shk.js block_entry` reports the static import already exists. `block_entry` is only called inside functions, not at module init.

## Intent vs deliverable

Subject promises one `block_entry`: hero on a door with `doormask == D_BROKEN`, first byte of `in_rooms(x, y, SHOPBASE)` as a signed char, `IS_SHOP` without subtracting `ROOMOFFSET`, then `shop_keeper` / `inhishop`, `shd` equals the hero, keeper on `shk` and not `helpless`, destination on `sx±1` or `sy±1`, then `Invis` / carried pick / carried mattock / `u.usteed`, then the `Shknam` line. The diff adds that function and replaces the three `false /* block_entry deferred */` sites (`test_move`, `domove`, `travel_test_move`). Travel helpers that now await it are async.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `block_entry` | async export `shk.js:802` | `shk.c:5824–5858` |
| `in_rooms` | LIVE `hack.js:1848` | `hack.c:3497–3560` |
| `IS_SHOP` | local clone `shk.js:790` | `shk.c:56` `rooms[x].rtype >= SHOPBASE` |
| `shop_keeper` | LIVE export `shk.js:257` | `shk.c:1051–1080` |
| `inhishop` | export `shk.js:750` (pre-existing body) | `shk.c:1038–1048` |
| `carrying` | local clone `shk.js:4193` | `invent.c:1494–1504` |
| `Invis` | LIVE import `timeout.js:1544` | `youprop.h` |
| `Shknam` | LIVE `shknam.js:502` | `shknam.c:842–850` |
| `helpless` | local inline `shk.js:209` | `monst.h:251` |

`sym.mjs`:

```
block_entry      js/shk.js:802   ASYNC — await required
in_rooms         js/hack.js:1848   sync
shop_keeper      js/shk.js:257   sync
inhishop         js/shk.js:750   sync
carrying         js/hack.js:3287   sync
             !! ALSO 3 LOCAL CLONE(S): js/dog.js:89  js/quest.js:311  js/shk.js:4193
Invis            js/timeout.js:1544   sync
Shknam           js/shknam.js:502   sync
IS_SHOP          NOT EXPORTED — 2 LOCAL CLONES: js/hack.js:1839  js/shk.js:790
```

Nothing was deleted. `block_entry` calls the `shk.js` `carrying` clone, which walks `game.invent` for `otyp` and returns the object. That is `invent.c:1494–1504`. Truthiness matches the pointer. `IS_SHOP` in this file is the same macro as `shk.c:56` (index by the raw room char, no `ROOMOFFSET`).

## C ↔ JS fidelity

`csym` body is `shk.c:5824–5858`. The only C call is `hack.c:1209`, inside `test_move`:

```
if (dx && dy && !Passes_walls && IS_DOOR(ust->typ)
    && (!doorless_door(ux, uy) || block_entry(x, y)))
```

`doorless_door` (`hack.c:4062–4074`) is true for `D_NODOOR` and `D_BROKEN`, so an intact door never calls `block_entry`. A broken door does. No `rn2` in the function.

JS `test_move` (`hack.js:563–564`) is that guard, including `!Passes_walls_prop()` around both the intact-door arm and the call. `travel_test_move` (`cmd.js:2840–2845`) is the same guard. `domove` (`cmd.js:5351–5354`) puts `!Passes_walls_prop()` only around `block_entry`. An intact door there still rejects a diagonal step when `Passes_walls` is set. The subject names that. The broken-door call itself is skipped when `Passes_walls` is set, which is what the outer `&&` does in C.

Inside `block_entry`, order matches `:5832–5857`. `D_BROKEN` is `0x01` (`rm.h:234`); the mask test is `==`, not a bit test. Empty `in_rooms` leaves `roomno` 0 (`*ptr` on the trailing NUL). A first byte above 127 becomes negative. `roomno < 0` returns. `IS_SHOP(roomno)` indexes `rooms[roomno]`. `shop_keeper` then subtracts `ROOMOFFSET` (`shk.c:1056`, `shk.js:258–260`). `shd` must equal `u.ux,u.uy`. The cross is C's `||` of `x == sx±1` and `y == sy±1`, not a one-cell ring. `Invis` is read again for the message, as in the `pline` format. No RNG.

`inhishop` (`shk.c:1038–1048`) is `on_level(shoplevel, u.uz)` then `strchr(in_rooms(mx, my, SHOPBASE), shoproom)`. The JS body compares `levl[mx][my].roomno` to `shoproom` and skips `on_level`. That helper predates this commit (its comment already says the `in_rooms` / `on_level` form is deferred). For this caller the keeper must also be standing on `shk`, which is inside the shop, so `roomno == shoproom` is the same boolean as `strchr` on a non-shared cell. `shop_keeper` still skips `rile_shk` when `ANGRY` (`shk.c:1059–1061`); that deferral is on the helper, not a new stub.

`helpless` is `msleeping || !mcanmove` (`monst.h:251`). The local inline uses `mcanmove === 0`, which matches a 0/1 field.

Callers of the one C site: `test_move` at `hack.js:564` (mount `steed.js:703`, trap `trap.js:7208`, knockback `mhitm.js:2780`). The DO_MOVE and TEST_TRAV copies are the existing splits, not a second C call. `findtravelpath_*`, `is_valid_travelpt`, and `auto_describe_suffix` await the new async path. `test_move_ok` (`steed.js:148`, dismount landing at `:575`) still does not call it. Named.

## Hallucinations / overclaim

The subject says `test_move`, `domove`, and travel all grew the call. C has one textual call; the other two are the JS splits of that condition, and the D-log says so. The `Passes_walls` sentence about `domove` matches the diff. "Match C" is true of `block_entry`'s own `if`s. It is not a claim that `inhishop` or `rile_shk` were rewritten.

## Density

The whole `block_entry` body and the one C call, wired through the three JS copies of that `if`. `block_door` stays the named stub. Under the 200-line density floor because the C function is 35 lines.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify block_entry --base ddddc6312~1 --reach-all`.

```
verify block_entry: baseline ddddc6312~1 (scoreboard at e5f623739) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke block_entry: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Green, cohort, and full 44 were not re-run in this audit.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
