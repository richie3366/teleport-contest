# Review 1853 — e4c6400a6 — mhitm_ad_conf (D-2894)

- SHA: `e4c6400a6` (coverage; `uhitm.c` `mhitm_ad_conf`)
- Files: `js/mhitm.js` (three arms), `js/mhitu.js` (wrapper), `js/uhitm.js` (`damageum_adtyping` row)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can mhitu.js mhitm.js mhitm_ad_conf` and the same for `uhitm.js` → `ALREADY` (static import, no new edge).

## Intent vs deliverable

Subject promises one `mhitm_ad_conf` with the hero-attacker arm, then the hero-defender arm, then the monster arm. The old export was only the monster arm. `mhitm_ad_conf_u` was a second body, and `damageum_adtyping` had no `AD_CONF` row. The diff replaces the wrapper with a call and adds the hero row. `sym.mjs`:

```
mhitm_ad_conf    js/mhitm.js:1040   ASYNC
mhitm_ad_conf_u  NOT EXPORTED — 1 local js/mhitu.js:2874
make_confused    js/potion.js:876   ASYNC
hitmsg           js/mhitu.js:416   ASYNC
canseemon        js/display.js:1060   sync
Monnam           js/do_name.js:1265   sync
```

`mhitm_ad_conf_u` is now `await mhitm_ad_conf(mtmp, mattk, game.youmonst, mhm)`. It is not a second confusion body.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `mhitm_ad_conf` | export `mhitm.js:1040` | `uhitm.c:3690–3726` |
| `is_youmonst` | local identity | `magr == &gy.youmonst` / `mdef == &gy.youmonst` |
| `hitmsg` / `canseemon` / `Monnam` | live | mhitu message and uhitm/mhitm pline |
| `make_confused` | live import | `potion.c`; awaited; no RNG |
| `rn2` | live | `!rn2(4)` then `rn2(6)` |
| `damageum_adtyping` | caller | `uhitm.c:4854` (`magr` = youmonst) |
| `mhitm_ad_conf_u` | caller | `mhitu.c:1191` (`mdef` = youmonst) |
| `mhitm.js:4869` | caller | `mhitm.c:1059` |

## C ↔ JS fidelity

`csym` body is `uhitm.c:3690–3726`. `mhitm_adtyping`'s `AD_CONF` case is the only direct call (`uhitm.c:4820`). That dispatcher is called from `uhitm.c:4854`, `mhitu.c:1191`, and `mhitm.c:1059`.

Hero as `magr` (`:3696–3702`): `!mdef->mconf`, then `canseemon` `pline("%s looks confused.", Monnam(mdef))`, then `mconf = 1`. No `mcan` test. Damage is not cleared. JS returns after that arm. `is_youmonst` is `m === game.youmonst` or `m._youmonst` (`mhitm.js:600`). `damageum_adtyping` passes `game.youmonst`.

Monster attacking you (`:3703–3712`): `hitmsg` always. Then `!mcan && !rn2(4) && !mspec_used`. A cancelled monster does not roll. A nonzero `rn2(4)` does not read `mspec_used` and does not roll `rn2(6)`. On a hit, `mspec_used` becomes `mspec_used + (damage + rn2(6))`. `Confusion` is `HConfusion` (`youprop.h:83–84`). Nonzero `u.HConfusion` selects "You are getting even more confused."; otherwise "You are getting confused." `You()` is that sentence. `make_confused(HConfusion + damage, false)` follows. `mhm.damage = 0` runs whether or not the gate passed. `mhitu.js:3073` is this case.

Monster vs monster (`:3713–3724`): `!mcan && !mconf && !mspec_used`. `mspec_used` is not stored. `gv.vis && canseemon` is `_mm_vis && canseemon`, the same flag the other `mhitm_ad_*` arms in this file use, then `pline_mon`. `mconf = 1`. `mstrategy &= ~STRAT_WAITFORU` (`0x20000000`, `const.js:1578`). Damage stays. `mhitm.js:4869` is the `mhitm.c:1059` call, before `mhitm_knockback`.

## Hallucinations / overclaim

`gazemu`'s `AD_CONF` (`mhitu.js:3706`) is the gaze attack: `rn2(5)`, `d(3, 4)`, "gaze confuses you". It does not call `mhitm_ad_conf`. The line number in the commit message has moved since later edits; the case is still the gaze arm. The subject does not claim that gaze was ported here.

## Density

The whole three-arm function and the three `mhitm_adtyping` callers. The old monster-only body is not left beside the new one.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify mhitm_ad_conf --base e4c6400a6~1 --reach-all`.

```
verify mhitm_ad_conf: baseline e4c6400a6~1 (scoreboard at e24078a71) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke mhitm_ad_conf: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. No baseline-PASS corpus log names this function, so the smoke spread is the reach gate. The `rn2(4)` / `rn2(6)` order is in the body above, not in a session trace.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
