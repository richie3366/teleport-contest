# Review 98 — 50136436 — make_gas_cloud enveloped You (D-1137)

## Metadata
- Full / short hash: `501364369570b436639f17b3f2ad08814eb5da77` / `50136436`
- Parent: `35c65530` (review **94–97** + cadence #1445). This file audits **this SHA only**. Archive row **Addressed:** D-1137 `50136436` was filled by D-1138.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 05:27:43 +0200
- D-id: **D-1137**
- Stats: 15 files, +262 / −168 — `js/region.js` +48 / −7 (`make_gas_cloud` envelop + `set_heros_fault` + `create_gas_cloud` async); await sites in `fountain.js` / `zap.js` / `trap.js` / `mklev.js` `fumaroles` / `do.js` `goto_level`.
- Claims to close: Open queue `region.c` `make_gas_cloud` enveloped pline (named). Not create_gas_cloud size-1. Review **97** next Open; **85** named omit 1. `reviews/loop-2026-08-15/` has no open gas-envelop Must-fix.
- JS / map: `region.js` `make_gas_cloud` / `create_gas_cloud` / `is_hero_inside_gas_cloud`; callers `fountain.js` drinksink case 13, `zap.js` `zap_over_floor`, `trap.js` chest gas, `mklev.js` `fumaroles`. `c-js-map/data.md` fountain; `turns.md` region. `inside_gas_cloud` dam>0, `m_poisongas_ok` size-1 gate, fumaroles `clear_heros_fault` / Norep, walk `in_out_region` still named.
- Prior reviews this SHA claims to close: **97** next Open enveloped; **85** named skip after size-1 register.

## Intent vs deliverable

Git subject promises: “Match C region.c make_gas_cloud so a cloud covering the hero prints the enveloped You and sets PLNMSG_ENVELOPED_IN_GAS, instead of registering the region silently.”

Old JS `make_gas_cloud` pushed the region, set `inside_f`, and ignored `_inside_cloud`. C `region.c:1197–1203` after `add_region` prints `You("are enveloped in a cloud of %s!")` (noxious gas vs steam) and sets `iflags.last_msg = PLNMSG_ENVELOPED_IN_GAS` when `!gi.in_mklev && !inside_cloud && is_hero_inside_gas_cloud()`. Zap fire-on-pool already skipped the hiss `Norep` when that last_msg was set, but JS never wrote the enum.

The diff **does** await that You after the add_region analog, wire `set_heros_fault` when `!in_mklev && !mon_moving`, default `player_flags: REG_NOT_HEROS` (C `create_region` `clear_heros_fault`), and make `create_gas_cloud` async so drinksink/zap/chest/fumaroles can await the pline. It does **not** port `inside_gas_cloud` dam>0 HP, `m_poisongas_ok` on the size-1 damage>0 gate, fumaroles `clear_heros_fault`/Norep whoosh, `create_gas_cloud_selection`, or flip geometric `is_hero_inside_gas_cloud` to the `hero_inside` bit. Named. `monmove.js` fog/Hezrou/Steam still fire-and-forget (D-log: size-1 at the monster cell does not envelop).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `make_gas_cloud` envelop | C body, **rewritten** | `region.c:1182–1204`; now async for `pline` |
| `set_heros_fault` | C macro, **new** | `region.h:21` clear `REG_NOT_HEROS` |
| `create_region` default | C callee analog, **new field** | `player_flags: REG_NOT_HEROS` |
| `create_gas_cloud` | C callee, **async** | `region.c:1213–1308`; ttl `rn1(3,4)` unchanged |
| `is_hero_inside_gas_cloud` | C callee, **clone** | geometry `inside_region`, not `hero_inside` bit |
| `PLNMSG_ENVELOPED_IN_GAS` | C enum, **imported** | `flag.h:535`; `const.js` sequence matches |
| `inside_cloud` size-1 `!damage` | C probe, **kept** | `region.c:1233–1236` first conjunct |
| `m_poisongas_ok` size-1 dmg>0 | C probe arm, **named omit** | Breathless poly still messages |
| `inside_gas_cloud` dam>0 | C callback, **named no-op** | still `return false` when `arg>=1` |
| drinksink case 13 / zap / chest | C callers, **awaited** | not stubs of the envelop |
| `fumaroles` | C caller, **awaited** | `clear_heros_fault` / Norep still named |
| `m_everyturn_effect` / `m_postmove_effect` | C callers, **unawaited** | named; size-1 at mon cell |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in the envelop itself. Size-1 drinksink still skips BFS shuffle `rn2` (D-1124). Display/core logs unchanged for a public tourist who never hits fate 13. Zap steam `rnd(5)` / fountain `rnd(3)` already existed.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Contest Rule #2: in-process ESM; `await pline` is the existing display boundary, not a second gameplay `nhgetch`. Do not restore silent `make_gas_cloud`. Do not burn expand `rn2` on size 1. Do not pull `inside_f` HP or walk `in_out_region` into this SHA. Do not treat unawaited monmove size-1 as this Open line.

## C ↔ JS fidelity

### `make_gas_cloud` order

C `region.c:1187–1204`:

```
if (!gi.in_mklev && !svc.context.mon_moving)
    set_heros_fault(cloud);
cloud->inside_f = INSIDE_GAS_CLOUD;
cloud->expire_f = EXPIRE_GAS_CLOUD;
cloud->arg.a_int = damage;
cloud->visible = TRUE;
cloud->glyph = cmap_to_glyph(damage ? S_poisoncloud : S_cloud);
add_region(cloud);
if (!gi.in_mklev && !inside_cloud && is_hero_inside_gas_cloud()) {
    You("are enveloped in a cloud of %s!",
        damage ? "noxious gas" : "steam");
    iflags.last_msg = PLNMSG_ENVELOPED_IN_GAS;
}
```

JS `173–226`: `set_heros_fault` under `!game.in_mklev && !game.gi?.in_mklev && !game.context?.mon_moving`; `inside_f` tag; `expire_f` still the same gas marker (pre-existing stand-in: C `INSIDE_GAS_CLOUD=0` / `EXPIRE_GAS_CLOUD=1`, JS both `1`); `arg = damage`; `visible = true`; glyph tag `'S_poisoncloud'` / `'S_cloud'` (numeric cmap named); add_region analog (`set_hero_inside` from `inside_region`, `m_at` scan, `recalc_block_point`); then the same `!in_mklev && !inside_cloud && is_hero_inside_gas_cloud()` You + `last_msg`. `You(...)` ≡ `pline('You are enveloped in a cloud of …!')`. `last_msg` after the await, like C after `You`. Match on the Open **message + enum**.

`set_heros_fault` is `player_flags &= ~REG_NOT_HEROS` (`region.h:21`). `create_gas_cloud` now starts `player_flags: REG_NOT_HEROS` so `create_region`’s `clear_heros_fault` is present before the maybe-set. Player-made (`!in_mklev && !mon_moving`) clears NOT_HEROS; monster-made / mklev leaves it. Match.

`add_region` C `:303–337` scans the bounding box, `add_mon_to_reg` on `m_at`, `block_point` when `visible`, then sets or clears `hero_inside` from `inside_region(u.ux,u.uy)`. JS `:199–216` scans rects the same way, then `recalc_block_point` (full vision rebuild — named vs incremental `block_point`). Hero bit is set **before** the envelop test, like C. `cloud.visible = true` matches C; size-1 poison therefore blocks LOS the same as D-0674.

`zap.c:5186–5188` `if (iflags.last_msg == PLNMSG_ENVELOPED_IN_GAS) msggiven = true` skips the hiss `Norep` after fire-on-pool steam. JS `zap.js:575–579` already had that gate; until this SHA `last_msg` was never that enum, so the hiss always fired when the hero stood in the new steam. Now a covering steam cloud sets the enum during `await create_gas_cloud` and the hiss skip is live. Fountain steam (`rnd(3)`, damage 0) plus `Steam billows` is a **second** pline; C same (`create_gas_cloud` then billows). `ZT_POISON_GAS` size-1 dmg 8 and chest `rn2(3)` else size-1 dmg 8 now await too.

### `inside_cloud` probe

C `region.c:1229–1236` captures `is_hero_inside_gas_cloud()` **before** BFS, then forces TRUE when `!mon_moving && u_at(x,y) && cloudsize==1 && (!damage || m_poisongas_ok==OK)`. JS `391–396` same capture; size-1 force only for `!damage`. drinksink is size 1 **damage 4** on the hero: C does **not** force `inside_cloud` for a breathing hero (`m_poisongas_ok` fails), so the envelop fires. JS same (`!damage` false). Breathless poly size-1 damage>0 would skip in C and still message in JS. Named omit of the second conjunct, not a miss of drinksink/zap-on-hero.

Already-inside: `inside_cloud` true → skip You even if this new cloud also covers the hero. Both.

`create_gas_cloud` ttl is still `rn1(3,4)` then `ttl * cloudsize / newidx` (`region.c:1303–1305`). Size-1 → scale 1. That RNG is **before** `make_gas_cloud` and was already D-1124; this SHA does not add a second `rn1`. `fumaroles` still `rn1(COLNO-4,3)` / `rn1(ROWNO-4,3)` / lava typ / `rn1(10,sizemin)` size — awaiting the helper does not reorder those rolls.

### `is_hero_inside_gas_cloud` clone

C `region.c:1168–1176` walks `gr.regions` for `hero_inside(reg) && inside_f == INSIDE_GAS_CLOUD` (the **bit** `update_player_regions` / `add_region` write). JS `101–110` walks `inside_f === INSIDE_GAS_CLOUD && inside_region(reg, ux, uy)` (geometry). After this SHA’s add_region analog, the new cloud’s bit and geometry are set from the same `inside_region` test, so a fresh cloud on the hero matches. Stale bits vs live geometry on **older** clouds stay the named D-1130 leftover (walk `in_out_region` still not live). Do not Must-fix it as this envelop peel.

### Callers are not stubs

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `make_gas_cloud` now contains the C You + `last_msg`. `create_gas_cloud` is the real BFS+ttl helper (D-1124). `zap.js:575–579` already gated the hiss on `PLNMSG_ENVELOPED_IN_GAS`; this SHA makes that gate live. drinksink case 13 still `create_gas_cloud(u.ux,u.uy,1,4)` after the stench pline (`fountain.c:696–698`).

`inside_gas_cloud` (`157–165`) still returns false when `arg>=1` after the fog TTL bump. That is the **next** Open row (`inside_gas_cloud` damage), not a fake success of envelop.

## Hallucinations / overclaim

D-log / CURRENT / subject say a cloud covering the hero prints the enveloped You and sets `PLNMSG_ENVELOPED_IN_GAS` instead of registering silently, plus `set_heros_fault` for player-made clouds. That is the hunk. They name `m_poisongas_ok`, inside_f HP, fumaroles whoosh, geometric vs bit, monmove await. Stamping **Addressed:** D-1137 is fair for the Open **You + last_msg**. Hash `50136436` is on the archive row (filled by D-1138). Do **not** stamp it as “gas now damages” or “walk uses the bit.” Do not read “Match C make_gas_cloud” as “Match C `inside_gas_cloud` HP.”

## Density

One C function (`make_gas_cloud`) plus the `create_region` fault default and await plumbing at existing callers. Related deferrals (`m_poisongas_ok`, inside_f) stay named in that envelope. ~50 region.js lines + await one-liners. Not a one-`if` peel and not “finish region.c.” Async conversion is the JS `pline` boundary, not a second hypothesis.

## Verification

Journal: private canary **35**/35 (noxious at hero; steam size-1 skip; off-hero; in_mklev; mon_moving You+NOT_HEROS; already-inside skip; size-5 steam; last_msg; heros_fault); green+strict seed8000/0900; cohort **24**/24 including 0002 drinksink + 0014 fountain + 0016/2200 zap + 0373 + 0360/4500 + 0108 + strict those. Path **public-unhit** on fate 13 / zap envelop. This audit’s full `sessions` (cadence **#1450**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression, still not an envelop hit.

C read of `region.c:79–126`, `:284–338`, `:1168–1308`, `region.h:15–22`, `flag.h:530–536`, `fountain.c:696–698`, `zap.c:5186–5188`; JS `region.js:72–110`, `:173–226`, `:385–457`, `fountain.js:475–480`, `zap.js:575–611`, `const.js:931–936`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| size-1 dmg 4 on hero, not already inside | You noxious + last_msg | **same** |
| size-1 dmg 0 on hero | `inside_cloud` force; no You | **same** |
| steam `damage==0` covering hero | You steam | **same** |
| `in_mklev` | no You, no fault-set | **same** |
| `mon_moving` | You if covering; keep NOT_HEROS | **same** |
| already inside another gas | skip You | **same** (probe) |
| `m_poisongas_ok` size-1 dmg>0 | force skip | **named keep prior** |
| `inside_f` HP | callback | **named no-op** |
| fog/Hezrou `create_gas_cloud` | awaited in C | **unawaited** (named) |

## Actionable C-wrongs

None that Must-fix this next iter. The Open You + `last_msg` match `region.c:1197–1203`. `create_gas_cloud` is the real callee.

Named omits / do-nots (map / Open, not Must-fix):

1. `inside_gas_cloud` dam>0 hero/mon HP (`region.c` inside callback). Live Open.
2. `m_poisongas_ok` size-1 `inside_cloud` gate (`region.c:1233–1236`).
3. Flip `is_hero_inside_gas_cloud` to the `hero_inside` bit; walk `in_out_region`.
4. `fumaroles` `clear_heros_fault` / Norep whoosh; await fog/Hezrou/Steam in `monmove.js`.
5. Next Open after this SHA: `fountain.c` `gush` lava — **Addressed:** D-1138 `068e78df` (minliquid_core lava; C `gush` is pool-only).
6. Do not restore silent register. Do not `await` a sync helper. Do not pull inside_f damage into a fountain peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `make_gas_cloud` now prints C’s enveloped You and sets `PLNMSG_ENVELOPED_IN_GAS` after the add_region analog when the hero is newly covered, while inside_f damage and the `m_poisongas_ok` size-1 gate stay named.
- Must-fix stays empty for this SHA; next port popped Open gush lava / `fire_damage_chain`. **Addressed:** D-1138 `068e78df`. Not minliquid pool drown.
