# Review 89 — 5b3923d7 — potion.c dodip pool yn (D-1128)

## Metadata
- Full / short hash: `5b3923d71580fb9ffe0f6d075a8753a3ba6b572e` / `5b3923d7`
- Parent: `b4954c6f` (D-1127). This file audits **this SHA only**. The fix stamped **Addressed:** D-1128 without the short hash; this review commit fills `5b3923d7`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 02:52:38 +0200
- D-id: **D-1128**
- Stats: 13 files, +181 / −65 — `js/potion.js` +69 / −22 (pool yn + `Levitation()` + `is_pool`); `js/steed.js` +18 (`rider_cant_reach`); `js/fountain.js` +9 / −4 (`floating_above` export).
- Claims to close: Open queue `potion.c` pool dip yn (named from dipsink). Not drinkfountain. Review **74** named pool; D-1127 next-port. `reviews/loop-2026-08-15/` has no open pool-dip Must-fix.
- JS / map: `potion.js` `dodip`; `fountain.js` `floating_above` / `wash_hands`; `steed.js` `rider_cant_reach`; `trap.js` `water_damage` (untouched). `c-js-map/turns.md` potion. `potion_dip`, `drink_ok_extra`, `pot_acid_damage` boom+delobj still named.
- Prior reviews this SHA claims to close: **74** named omit pool dip (`potion.c:2335–2361`).

## Intent vs deliverable

Git subject promises: “Match C potion.c dodip so standing on a pool asks yn and then wash_hands or water_damage, instead of cancelling the command.”

Old JS `dodip` set `at_pool` from `IS_POOL(here)` and left the pool arm as `// pool dip still named` then `ECMD_CANCEL`. Fountain/sink yn already existed (D-1113). C `potion.c:2335–2361` asks yn with `waterbody_name`, then Levitation `floating_above`, unskilled non-swimmer steed `rider_cant_reach`, hands/uarmg `wash_hands`, else `water_damage` (POT_ACID `in_use` then `useup` if not `ER_DESTROYED`). Outer gate for all three floor features is `!can_reach_floor(FALSE)`, not sticky `u.Levitation`. `at_pool` is `is_pool(u.ux,u.uy)`, not `IS_POOL(typ)`.

The diff **does** that arm and switches the shared floor gate to `can_reach_floor(false)`. It does **not** port `potion_dip` alchemy, `drink_ok_extra++` then potion getobj after `'n'`, or `pot_acid_damage` boom+delobj (`water_damage` still returns `ER_DESTROYED` without delete). Named. `floating_above` utrap INFLOOR/LAVA override named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dodip` pool yn | C body, **new** | `potion.c:2335–2361` |
| `at_pool` | C predicate, **rewritten** | `is_pool(ux,uy)` not `IS_POOL(here)` (D-1090) |
| `can_reach_floor(false)` | C callee, **imported** | outer gate for fountain/sink/pool; was sticky `u.Levitation` |
| `Levitation()` | C macro, **clone** | local; `(H\|\|E)&&!B` (D-1070); inner `floating_above` |
| `waterbody_name` | C callee, **imported** | `hack.js`; SURFACE_AT / `db_under_typ` D-1103 |
| `floating_above` | C callee, **imported** | now exported; utrap surface named |
| `rider_cant_reach` | C callee, **new** | `steed.c:17–20`; `y_monnam(usteed)` |
| `is_swimmer` / `P_SKILL(P_RIDING)` | C callees, **imported** | `monsters.js` / `weapon.js`; `P_BASIC=2` |
| `wash_hands` | C callee, **imported** | D-1108; C `(void) wash_hands()` |
| `water_damage` | C callee, **imported** | `trap.js`; POT_ACID boom named |
| local `useup` | C callee, **clone** | pre-existing potion.js quan/splice |
| `potion_dip` / `drink_ok_extra` | C arms, **named omit** | `'n'` still `ECMD_CANCEL` like fountain/sink |
| `pot_acid_damage` | C callee, **named omit** | ER_DESTROYED leaves the potion |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `u.ux`/`u.uy` are the live hero cell. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in the yn / Levitation / rider / wash arms. `water_damage(..., true)` may burn grease `rn2(2)` / luck (skipped because `force`) / dilute — that is the existing helper (D-0109/D-0683), not a new fountain lottery.

## Constitution / playbook

Grep of the three JS hunks: no trace-index gates. Contest Rule #2: in-process ESM. One await boundary still `nhgetch` (`yn_function`). Do not restore `IS_POOL(here)` for `at_pool`. Do not skip `can_reach_floor` for Flying/air-lev. Do not pull `potion_dip` into this SHA.

## C ↔ JS fidelity

### Outer gate + `at_pool`

C `potion.c:2274–2277` / `:2310–2313`: `at_pool = is_pool(u.ux,u.uy)`; `if (!can_reach_floor(FALSE)) ;` else fountain / sink / pool. JS `1087–1116`: `is_pool(u.ux,u.uy)` (D-1090 DRAWBRIDGE_UP+`DB_MOAT`; lava bridge is **not** a pool); `!can_reach_floor(false)` empty then `else if` fountain/sink/pool. Old JS used sticky `u.Levitation` which missed Flying/air-level / BLevitation. This SHA matches C’s shared gate. `can_reach_floor` is the D-1070 helper (`(HLevitation\|\|ELevitation)&&!BLevitation`, hugs, Flying\|\|MZ_HUGE).

Raised lava `DRAWBRIDGE_UP+DB_LAVA`: C `is_pool` false → no pool yn. JS same. Moat bridge: both true.

### Pool yn `'y'` order

C `potion.c:2335–2359`:

```
pooltype = waterbody_name(u.ux, u.uy);
if (y_n(qbuf) == 'y') {
    if (Levitation) floating_above(pooltype);
    else if (u.usteed && !is_swimmer(u.usteed->data)
             && P_SKILL(P_RIDING) < P_BASIC)
        rider_cant_reach();
    else if (is_hands || obj == uarmg) {
        if (!is_hands) obj->pickup_prev = 0;
        (void) wash_hands();
    } else {
        obj->pickup_prev = 0;
        if (obj->otyp == POT_ACID) obj->in_use = 1;
        if (water_damage(obj, 0, TRUE) != ER_DESTROYED && obj->in_use)
            useup(obj);
    }
    return ECMD_TIME;
}
++drink_ok_extra;
```

JS `1135–1155`: same prompt (`verbose ? obuf : shortestname`), same four-way, `return ECMD_TIME`. Inner `Levitation()` is youprop H\|\|E && !B, not sticky — needed on air/water where `can_reach_floor` can be true while Levitation is also true (canary air-lev float). `rider_cant_reach` (`steed.js:59–64`) is `You aren't skilled enough to reach from ${y_monnam(u.usteed)}.` ≡ C `steed.c:19` (`You(...)` + `y_monnam`). `y_monnam` is the real do_name export (ARTICLE_YOUR / SUPPRESS_SADDLE). `P_SKILL` reads `weapon_skills[type].skill`. `is_swimmer` is `M1_SWIM`. `wash_hands` is D-1108 (C casts void). Match on the Open line.

`'n'`: C `++drink_ok_extra` then potion `getobj`. JS `return ECMD_CANCEL` — **same named skip as fountain/sink** (D-1113). Not a new C-wrong family.

### Callees are not stubs

`waterbody_name` is D-1103 (SURFACE_AT / `db_under_typ`). `wash_hands` is D-1108. `water_damage` is the real trap.js helper (dilute / rust / grease / container). `floating_above` C `:21–32` also overrides when `utrap` INFLOOR/LAVA → `"are trapped in the %s."` + `surface()`. JS export is only `"You are floating high above the ${what}."` D-log names utrap surface. Pool-at-feet + INFLOOR is exotic; named omit, not Must-fix of the yn.

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” Hands/gloves wash. Non-hands run `water_damage`. Rider pline runs. Levitation float pline runs.

### `pot_acid_damage` (named, newly reachable)

C `water_damage` on `POT_ACID` typically `pot_acid_damage` (boom + `delobj`) then `ER_DESTROYED` so dodip skips `useup`. JS `trap.js:4187–4189` returns `ER_DESTROYED` **without** delete; dodip then skips `useup` because `=== ER_DESTROYED` → **potion remains**. D-log: “ER_DESTROYED leaves the potion.” Same helper gap dipsink already walks (review **74** ACCEPT, named). Newly load-bearing on pool, still a **named omit** of `pot_acid_damage`, not a miss of the Open yn. Do not Must-fix it as if this SHA claimed the boom.

Local `useup` (`potion.js:209–218`) is a pre-existing quan/splice clone (no shop `setnotworn`). It only runs when `in_use` and not `ER_DESTROYED` — C’s acid-survived path. Named with the boom.

## Hallucinations / overclaim

D-log / CURRENT / subject say standing on a pool asks yn then `wash_hands` or `water_damage` instead of cancelling. That is the hunk: `is_pool`, `can_reach_floor(FALSE)`, `waterbody_name` yn, Levitation youprop, rider, wash, water_damage + acid `in_use`/`useup`. They name `potion_dip`, `drink_ok_extra`, `pot_acid_damage`. Stamping **Addressed:** D-1128 is fair for the Open **yn**. Fill hash `5b3923d7` in this commit. Do **not** stamp it as a close of alchemy or acid explosion.

## Density

One C arm (`potion.c:2335–2361`) plus `rider_cant_reach` and exporting `floating_above` — the named Open row. Switching fountain/sink to `can_reach_floor(FALSE)` is the **same** C `if` that guards all three, not a second hypothesis. `potion_dip` left named. ~69 potion + 18 steed. Right size (§2b).

## Verification

Journal: private canary **64**/64 (`is_pool` vs `IS_POOL`; `waterbody_name` pool/moat/wall; `can_reach_floor` lev/rider; `floating_above`; `rider_cant_reach`; `wash_hands`; dilute/acid/water `water_damage`; yn n/y; hands/gloves; air-lev float; sticky Levitation ignored; BLevitation reaches; lava-bridge skip; moat-bridge; m-prefix); green+strict seed8000/0900; cohort **22**/22 including 0014/0002/0004/0103/0104/0009/0360/4500/2200/0030; path **public-unhit**. Cadence fortress is not a pool-dip proof. This audit’s full `sessions` (cadence **#1435**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `potion.c:2267–2371`, `fountain.c:21–32` / wash_hands, `steed.c:17–20`, `engrave.c` `can_reach_floor`, `youprop.h:240`; JS `potion.js:1062–1164`, `steed.js:55–64`, `fountain.js:259–262`, `hack.js:740–751`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| pool + reach + yn `'y'` + hands/gloves | `wash_hands` | **same** |
| else non-hands | `water_damage(..., TRUE)` | **same** |
| Levitation (air/water may still reach) | `floating_above` | **youprop clone** |
| unskilled non-swimmer steed | `rider_cant_reach` | **same pline** |
| lava bridge | not `at_pool` | **same** (`is_pool`) |
| yn `'n'` | `drink_ok_extra++` then getobj | **named cancel** |
| POT_ACID | boom+delobj | **named**; potion may remain |
| `!can_reach_floor` | skip all floor yn | **same** (was sticky Lev only) |

## Actionable C-wrongs

None that Must-fix this next iter. The Open yn matches `potion.c:2335–2361` minus the named `'n'` getobj / acid boom already on dipsink.

Named omits / do-nots (map / Open, not Must-fix):

1. `drink_ok_extra++` then potion `getobj` / `potion_dip` after `'n'` (`potion.c:2361–2371`). Fountain/sink share this skip.
2. `pot_acid_damage` boom+`delobj` (`trap.c` water_damage POT_ACID).
3. `floating_above` utrap INFLOOR/LAVA → trapped-in-`surface` (`fountain.c:25–30`).
4. `pair_of` → `"them"`; `inaccessible_equipment`.
5. Next Open: `teleport.c` `teleds` `switch_terrain`. Not fill_pit.
6. Do not restore pool `ECMD_CANCEL`. Do not use `IS_POOL(here)` for `at_pool`. Do not restore sticky `u.Levitation` as the outer floor gate. Do not skip `rider_cant_reach` when `P_SKILL < P_BASIC`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `#dip` on a pool now asks yn with `waterbody_name` and then Levitation float, unskilled-rider refuse, `wash_hands`, or `water_damage` instead of cancelling, with `is_pool`/`can_reach_floor(FALSE)` matching C, while potion alchemy, `'n'` getobj, and acid boom stay named.
- Must-fix stays empty for this SHA; next port pops Open `teleport.c` `teleds` `switch_terrain`. Not fill_pit.
