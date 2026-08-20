# Review 221 — 78707282 — monmove.c dissolve_bars switch_terrain (D-1259)

## Metadata
- Full / short hash: `78707282db5def70d76a408415e34e63bf3053d2` / `78707282`
- Parent: `c63ac778` (D-1258). This file audits **this SHA only**. Archive row **Addressed:** D-1259 `78707282` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 08:44:49 +0200
- D-id: **D-1259**
- Stats: 12 files, +119 / −52 — `js/hack.js` +10 / −8; awaits `js/monmove.js` / `js/mthrowu.js` / `js/zap.js`.
- Claims to close: Open `hack.c` `switch_terrain` from `dissolve_bars` (named from D-1247 / review **209**). Not ALLOW_BARS. `reviews/loop-2026-08-15/` has no unpaid dissolve Must-fix.
- JS / map: `hack.js` `dissolve_bars`; `c-js-map/turns.md`. `set_uinwater` / `spoteffects` / `digactualhole` `switch_terrain` still named.
- Prior reviews this SHA claims to close: **209** named omit `dissolve_bars` `switch_terrain` when the hero stands on the cell.

## Intent vs deliverable

Git subject promises: “Match C monmove.c dissolve_bars so dissolving iron bars under the hero calls switch_terrain, instead of leaving Lev/Fly FROMOUTSIDE stuck.”

C `dissolve_bars` (`monmove.c:2170–2178`): typ = edge==1 ? DOOR : (Is_special || in_rooms) ? ROOM : CORR; `flags = 0` (doormask D_NODOOR); `newsym`; `if (u_at(x,y)) switch_terrain()`. Callers: `still_chewing` (`hack.c:784`), `postmov` (`monmove.c:1634`), `zap.c:5362`, `hit_bars` (`mthrowu.c:1444` / `:1487`). Body `switch_terrain` (`hack.c:3178–3217`) already live (D-1129 / D-1151): `blocklev` = IS_OBSTRUCTED / closed_door / WATERWALL / LAVAWALL; else clear `BLevitation`/`BFlying` `FROMOUTSIDE` and maybe `float_up` / “start flying”; `flags.terrainstatus` → `classify_terrain`. IRONBARS is **not** `IS_OBSTRUCTED` (C `test_move` tests the two separately), so the usual on-hero dissolve is the unblock arm.

Old JS: `// switch_terrain deferred` after `newsym`.

The diff **does** `u_at` → await live `switch_terrain`, and awaits at the four C caller sites. It does **not** add `set_uinwater` / `spoteffects` / `digactualhole` callers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dissolve_bars` | C `:2170–2178`, **rewired** | now `async`; body already had typ/newsym |
| `u_at` | C, **imported live** | `const.js` ux/uy |
| `switch_terrain` | C `:3178–3217`, **imported live** | D-1129; not a stub |
| `newsym` | C, **imported live** | before the call, like C |
| `still_chewing` | C `:784`, **await** | already async |
| `postmov` IRONBARS | C `:1634`, **await** | D-1247 eat path |
| `zap_over_floor` | C `zap.c:5362`, **await** | |
| `hit_bars` | C `:1444`/`:1487`, **await** | both dissolve sites |
| `set_uinwater` / `spoteffects` / `digactualhole` | C other callers, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `switch_terrain` has no `rn2`. Making the function `async` is the JS await boundary for `You_cant` / `float_up` plines, not an extra input wait.

## C ↔ JS fidelity

Pinned C (`monmove.c:2170–2178`):

```
void
dissolve_bars(coordxy x, coordxy y)
{
    levl[x][y].typ = (levl[x][y].edge == 1) ? DOOR
        : (Is_special(&u.uz) || *in_rooms(x, y, 0)) ? ROOM : CORR;
    levl[x][y].flags = 0; /* doormask = D_NODOOR */
    newsym(x, y);
    if (u_at(x, y))
        switch_terrain();
}
```

JS keeps edge/Is_special/in_rooms typ, zeros `flags` and `doormask`, `newsym`, then `if (u_at(x, y)) await switch_terrain()`. Off-hero dissolve does not call it. Match.

`switch_terrain` in `hack.js:1899–1945` is the D-1129 body: `Levitation_st`/`Flying_st` (youprop.h, not sticky `u.Levitation`), `BLevitation |= FROMOUTSIDE` on `blocklev`, else `&= ~FROMOUTSIDE` and live `float_up` / `float_vs_flight`. `classify_terrain` when `terrainstatus`. This is **not** “Match C dispatch, callee is a stub”: dissolving bars on `u.ux,u.uy` runs that function. IRONBARS → ROOM/CORR/DOOR with `D_NODOOR` is not `blocklev`, so leftover FROMOUTSIDE from rock can clear — the D-log’s “usual effect.”

Grep of `js/` after this SHA: every `dissolve_bars(` is `await`ed (still_chewing, postmov, zap, two `hit_bars` sites). C has the same five call sites.

## Hallucinations / overclaim

Subject + D-1259 say dissolving bars under the hero calls `switch_terrain` instead of leaving Lev/Fly FROMOUTSIDE stuck. **`u_at` + live `switch_terrain` + awaited callers are the hunk.** Stamping **Addressed:** D-1259 is fair. Do **not** stamp “Match C `set_uinwater`/`spoteffects`/`digactualhole`.” Do not claim IRONBARS itself sets FROMOUTSIDE — C `blocklev` does not include bars; the call still matters for leftover bits and `classify_terrain`. `async` is not an invented await-for-input.

## Density

One C function plus awaiting the callers C already has. ~10 JS lines in the body, rest await churn. Right size. Did not glue mimic unhide.

## Branch-by-branch confirm

1. Off-hero rust eat (`postmov`): typ changes, no `switch_terrain`. Match.
2. On-hero rust eat: `u_at` true, await `switch_terrain`. Match.
3. `still_chewing` finish bars: await. Match.
4. Zap acid/fire melt bars: await. Match.
5. `hit_bars` wand dissolve / hero break-apart: both await. Match.
6. Edge==1 → DOOR + D_NODOOR; `closed_door` false; not `blocklev`. Match.
7. In-room → ROOM; maze → CORR. Match.
8. On-hero with leftover `BLevitation` FROMOUTSIDE: unblock + maybe `float_up`. Match D-1129.
9. On-hero HFlying after clear: “You start flying.” Match.
10. `terrainstatus` Off: skip `classify_terrain`. Match.
11. Hero `test_move` onto remaining bars: still named. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./trap.js')` inside live `switch_terrain` is ESM cycle breaking, not Node `fs`. Plain ESM.

## Verification

Journal: private canary **18**/18 (C body+callers; JS `u_at` await; off-hero bits stay; on-hero BLev/BFly clear; edge DOOR / in-room ROOM / maze CORR; HFlying resume; postmov rust on hero cell; leftover BLev bits; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless bars dissolve on the hero cell. Cadence this audit: full `sessions` at HEAD `e2aa4dbe` **44**/44 Scr **11405**/11405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. The callee is live `switch_terrain`, not a comment. Missed awaits would have been a C-wrong; grep shows none.

Named omits (map, not Must-fix):

1. `set_uinwater` `switch_terrain`
2. `spoteffects` `switch_terrain`
3. `digactualhole` `switch_terrain`
4. dothrow / `goto_level` still named historically
5. `meatmetal`

Do not Must-fix “JS `dissolve_bars` is async.” Do not Must-fix “IRONBARS is not `IS_OBSTRUCTED`.”

## Callers / RNG ledger

C: still_chewing, postmov, zap_over_floor, hit_bars ×2. JS same five, all awaited. No RNG in dissolve or switch_terrain. Public fortress is not evidence bars dissolved under the hero.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: dissolving bars on the hero cell now awaits live `switch_terrain`; other terrain callers stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1259 `78707282`.
