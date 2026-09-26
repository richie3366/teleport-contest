# Review 1860 — 9a80efcd8 — shop_keeper (D-2901)

- SHA: `9a80efcd8` (coverage; `shk.c` `shop_keeper`, plus `money2u`, `block_door`, `invent.c` `merge_choice`)
- Files: `js/shk.js` (body, `money2u`, `block_door`), `js/files.js` (`merge_choice`), `js/apply.js`, `js/cmd.js`, `js/dungeon.js`, `js/hack.js`, `js/pickup.js`, `js/shknam.js`, `js/trap.js` (callers)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. The only `DIAG` substring is the C macro `NODIAG` in the `crawl_destination` comment. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can` `files.js`→`shk.js` and `shk.js`→`files.js`: `ALREADY`.
- The diff deletes the `cmd.js` `block_door` stub that returned false, and the local `findgold_minvent`. `sym.mjs`:

```
shop_keeper      js/shk.js:264   sync
block_door       js/shk.js:830   ASYNC — await required
findgold         js/steal.js:98   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/makemon.js:2740  js/monmove.js:179
merge_choice     js/files.js:76   sync
rile_shk         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/shk.js:4821
money2u          js/shk.js:2641   ASYNC — await required
```

`rile_shk` is C `staticfn` (`shk.c:1361–1377`). One local is that function, not a second body. The `findgold` clones are not this call. `money2u` calls the `steal.js` export.

## Intent vs deliverable

Subject promises one `shop_keeper`: signed-char `rmno`, `rile_shk` when angry and not yet surcharged, `impossible` then null when the resident has no eshk. It also promises `money2u` (`findgold`, full-inventory `dropy`) and `block_door` at the movement gates. The diff does that, and it fills the shop `SetVoice` / `verbalize` arms in `use_candle`, `use_lamp`, `light_cocktail`, `catch_lit`, and `use_tinning_kit`. `SetVoice` (`sndprocs.js:52–57`) is the empty `!SND_LIB` macro.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `shop_keeper` | export `shk.js:264` | `shk.c:1051–1080` |
| `rile_shk` | local, one body | `shk.c:1361–1377` |
| `has_eshk` / `ESHK` / `ANGRY` | live helpers | `mextra.h:230` / `:221`; `shk.c:55` `!mpeaceful` (`NOTANGRY` is `mpeaceful`, `shk.c:54`) |
| `money2u` | export | `shk.c:185–212` |
| `findgold` | live import, replaces the minvent clone | `steal.c:44–52` (`otyp == GOLD_PIECE` only) |
| `merge_choice` | export `files.js:76` | `invent.c:772–810` |
| `block_door` | export, replaces the false stub | `shk.c:5790–5821` |
| `Invis` | live import `timeout.js:1561` | `youprop.h:198` |

## C ↔ JS fidelity

`csym` body is `shk.c:1051–1080`. `rmno` is a `char`. A byte above 127 becomes negative (`code > 127` then `-= 256`) before `code < ROOMOFFSET` (`mkroom.h:91`, 3). Below that, null. Otherwise `rooms[code - ROOMOFFSET].resident`. No resident, null. `has_eshk` then `ANGRY` and `!ESHK->surcharge` calls `rile_shk` (peaceful cleared, surcharge set, each bill price gains `(price + 2) / 3`). No eshk: `impossible` with `"shopkeeper career change"` or `"shop resident not shopkeeper"`, `rmno`, `rtype`, `mnum`, and `MGIVENNAME` or `"anonymous"`, then null. The function stays sync, so `impossible` is not awaited. That is the same shape as the commit's `unpaid_cost` note. No RNG.

`money2u` (`shk.c:185–212`): `amount <= 0` is `impossible("%s payment in money2u!")` with `"negative"` or `"zero"`. A short or missing purse is `impossible("%s paying without %s gold?")` via `a_monnam` and `"enough"` or `""`. C calls `findgold(mon->minvent)` before the amount test. That walk has no side effect, and the amount arm does not use its result, so doing the amount test first still prints the same `impossible`. A null `mon` with a positive amount returns without the second `impossible`. C would read `mon->minvent`. Callers pass a monster. A larger pile `splitobj`s, then `obj_extract_self`. `!merge_choice(invent, mongold) && inv_cnt(FALSE) >= invlet_basic` (`hack.h:584`, 52) is `You("have no room for the gold!")` and `dropy`. Else `addinv` and `flags.botl` (the store `bot()` reads for `disp.botl`). Extracted gold is not `OBJ_FLOOR`, so `merge_choice`'s shop arm does not run.

`merge_choice`: null list or `SCR_SCARE_MONSTER` returns null. On `invent` and `OBJ_FLOOR`, `shop_keeper(inside_shop(ox, oy))`. If that is set, `no_charge` is cleared for the scan, or `inhishop` returns null without restoring `no_charge`. C's early return is that same `else` (`invent.c:798–799`), and `no_charge` was already clear there. A later match restores `no_charge`. The walk is the invent array. The commit names that the C `nobj` chain is not walked.

`block_door`: `*in_rooms(x, y, SHOPBASE)` with the same signed-char adjust. `roomno < 0` or `!IS_SHOP(roomno)` is false. `IS_SHOP` is `rooms[x].rtype >= SHOPBASE` (`shk.c:56`) with no `ROOMOFFSET` subtract. Not a door, or `roomno != *u.ushops`, false. `shop_keeper((char) roomno)` and `inhishop`. Then the keeper is on `eshk.shk`, the door is `eshk.shd`, not `helpless`, and `debit` or `billct` or `robbed`: `pline` with `Shknam` and `Invis ? " senses your motion and" : ""`. Callers `await` it: `test_move` (`hack.c:1141` and `:1145`, `js/hack.js` and `js/cmd.js` `travel_test_move` / `domove`) and `crawl_destination` (`hack.c:4095`). `rnd_nextto_goodpos` awaits `crawl_destination`; `drown` awaits that. `crawl_destination` still starts from its own floor checks. `goodpos`, `NODIAG`, `Passes_walls`, and the `bad_rock` squeeze (`hack.c:4082–4100`) stay named.

`recalc_mapseen` (`dungeon.c:3140–3141`) sets `untended` from `!shop_keeper(uroom) || !inhishop`. The temple `findpriest` arm is still the resident. `stock_room` (`shknam.c:729`, `rmno = (sroom - rooms) + ROOMOFFSET`) now calls `shop_keeper(rmno)` on Orcus. It still does not call `mongone`. The commit names that. `zap.c:1967` stays unwired. The apply shop sentences match `apply.c:1450–1453`, `:1615–1617`, `:1694`, `:1750`, and the tinning `you_buy_it` arms.

## Hallucinations / overclaim

The subject says an angry keeper is riled and a resident with no eshk is rejected. That is the body above. It does not say every one of the 64 C call sites was added in this diff. Sites that already called `shop_keeper` now get `rile_shk`. The newly filled shop sentences are the apply / pickup / mapseen / Orcus ones in the diff. `SetVoice` does not play audio. "Fire-and-forget `impossible`" matches the sync function; the message is not ordered ahead of a caller's next `pline`.

## Density

`shop_keeper` is the whole 30-line body. `money2u` and `block_door` are the same file, and `merge_choice` is the callee `money2u` now actually runs. The false `block_door` stub is gone. Named gaps (`zap.c:1967`, Orcus `mongone`, `crawl_destination`'s other arms, invent `nobj`) are not stubs inside `shop_keeper`. About 213 js insertions.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify shop_keeper --base 9a80efcd8~1 --reach-all`.

```
verify shop_keeper: baseline 9a80efcd8~1 (scoreboard at 9cb813fe5, 2026-09-26T21:41:48.148Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify shop_keeper: no corpus session is blocked on it at 9a80efcd8~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke shop_keeper: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line.

## Actionable C-wrongs

None. Signed `rmno`, `rile_shk`, the no-eshk `impossible`, `money2u`'s full-inventory `dropy`, and `block_door`'s door test match the cited C. The named omits stay named.

Verdict: **ACCEPT**
