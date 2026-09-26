# Review 1800 — fab716a35 — fixup_special (D-2841)

- SHA: `fab716a35` (coverage; `mkmaze.c` `fixup_special`)
- Files: `js/mklev.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `fixup_special`: water or air zeroes `hero_memory` and calls `setup_waterlevel` before the region walk; branch, portal, stairs, and tele follow the C switch; the else-if tail sets Medusa statues, the two graveyards, `baalz_fixup`, and `stolen_booty`; `Is_special` sets the town flag; the region list is dropped. Air and water return that function after flip. The diff is that body plus those two returns. The extra `!game.made_branch` on the branch fallback is in the Named paragraph, not in the C `if`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `fixup_special` | `mklev.js:2415` | `mkmaze.c:569–704` |
| `fixup_special_tail` | local split of the tail | `:652–699` |
| `setup_waterlevel` | local `mklev.js:17862` | water/air arm |
| `place_lregion` | LIVE (D-2836) | `:606–611` and `:645` |
| `find_level` | LIVE `dungeon.js:867` | `:602` |
| `baalz_fixup` | local `mklev.js:831` | `:693` |
| `stolen_booty` | LIVE `mklev.js:2342` | `:695` |
| `Is_special` | LIVE `dungeon.js:2167` | `:698` |
| `Is_baal_level` | LIVE `const.js:3293` | `on_level(&baalzebub_level)` |
| `poly_when_stoned` / `pm_resistance` | LIVE `monsters.js` | Medusa loops |
| `place_it` / `release_rname` / `afterPending` | local scheduling | no C names |

`sym.mjs`:

```
setup_waterlevel NOT EXPORTED — local js/mklev.js:17862
baalz_fixup      NOT EXPORTED — local js/mklev.js:831
stolen_booty     js/mklev.js:2342   sync
Is_special       js/dungeon.js:2167   sync
find_level       js/dungeon.js:867   sync
```

No symbol was deleted or re-pointed onto a different module. `Is_special` used here is the dungeon export, not the `end.js` / `quest.js` clones.

## C ↔ JS fidelity

`csym` callers are `sp_lev.c:6050` and `:6491` (the comment at `mklev.c:1558` is not a call). Both are the load epilogue after flip, before `premap_detect`. JS special loaders return `fixup_special()` at that point. `load_air` and `load_water` do too, and they leave `lregions` populated, so the walk is not the old empty-list call.

Water or air: `hero_memory = 0`, then `setup_waterlevel`, then the walk. `uz` is read once at entry. Region placement during level build does not change `u.uz`.

`LR_BRANCH` sets `added_branch` and `place_lregion` with a null level (C's `lev` is unread on that arm). `LR_PORTAL`: first character `'0'`–`'9'` copies `u.uz` and sets `dlevel` from `parseInt` (`atoi`); else `find_level` and that `dlevel`. A null `find_level` leaves `lev` null. Named. Then `place_lregion`. Stairs pass null. Tele copies `inarea` / `delarea` into `updest` and/or `dndest` and does not place. `LR_TELE` writes both. Each region's name is cleared (`rname.str = 0`, or a string `rname` zeroed). `afterPending` waits out a tele Promise before the next region and before the tail.

The fallback is `!added_branch && !game.made_branch && is_branchlev()` then `place_lregion(0,…, LR_BRANCH, null)`. C is only `!added_branch && Is_branchlev`. When `nroom > 0`, C's `place_lregion` calls `place_branch` and returns before the 200 `rn1` (`mkmaze.c:370–374`). When `nroom == 0` and the latch is already set, C still enters that loop and `place_branch` returns inside `put_lregion_here`. JS skips the call. The commit names that skip. `is_branchlev` is the local end1/end2 walk, used as a boolean.

The tail is one else-if. Medusa uses `rooms[0]`. A missing room skips the statues. Named. `rnd(4)` tries, `somex`/`somey`, `goodpos`, `mk_tt_object(STATUE)`, then `poly_when_stoned` or `MR_STONE` up to 100 `rndmonnum` / `set_corpsenm`. Then `rn2(2)` chooses `mk_tt_object` or `mkcorpstat(..., CORPSTAT_NONE)`, and the retry predicate is `MR_STONE` or `poly_when_stoned` (the opposite order). `poly_when_stoned` is passed `game.mvitals`, which is `svm.mvitals`. Cleric is `urole.mnum == PM_CLERIC` (`you.h:247`; `PM_CLERIC` is 337) and `In_quest`, then `graveyard`. Stronghold sets `graveyard`. `Is_baal_level` is `on_level` against `baalzebub_level`, false when that level is unset, then `baalz_fixup`. Mines and `game.ransacked` call `stolen_booty`. `Is_special` with `flags.town` sets `has_town`. Then `lregions` and `num_lregions` clear. A missing `game.level` skips the flag writes. Named. No other `rn2` in the tail.

## Hallucinations / overclaim

The subject says the branch fallback runs after the name clear and before the else-if. It does, with the extra `!game.made_branch` the Named paragraph states. It says water and air return `fixup_special()` after flip so setup runs once, first. `load_air` and `load_water` do not call `setup_waterlevel` themselves. It says the town flag is `Is_special`. The call is the dungeon export.

## Density

The whole `fixup_special` body, including the tail that used to be a separate function and the two plane returns. Not an arm-only port.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify fixup_special --base fab716a35~1 --reach-all`.

```
verify fixup_special: baseline fab716a35~1 (scoreboard at b2801e780) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke fixup_special: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2841's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None. The roomless branch fallback still skips C's 200 `rn1` when `made_branch` is already set. That conjunct is named, and it is the `place_lregion` early-out already recorded on D-2836, not a new silent arm.

Verdict: **ACCEPT**
