# Review 235 — 2a6bf680 — pickup.c tipcontainer highdrop (D-1273)

## Metadata
- Full / short hash: `2a6bf6800cf6ca6aaae60f8b3bbf7161ac902be0` / `2a6bf680`
- Parent: `175707ca` (D-1272). This file audits **this SHA only**. Archive row **Addressed:** D-1273 `2a6bf680` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 12:06:28 +0200
- D-id: **D-1273**
- Stats: 11 files, +125 / −46 — `js/pickup.js` +40 / −8; comments `js/dothrow.js` / `js/invent.js`.
- Claims to close: Open `pickup.c` highdrop `hitfloor` (named from D-1263 / review **225**). Not toss_up. `reviews/loop-2026-08-15/` has no unpaid tip Must-fix.
- JS / map: `pickup.js` `tipcontainer`; live `hitfloor(true)` / `can_reach_floor`; `c-js-map/turns.md`. Altarizing / dropy terse list / invent getobj tip named.
- Prior reviews this SHA claims to close: **225** named omit pickup highdrop after drop/horn `hitfloor(TRUE)`.

## Intent vs deliverable

Git subject promises: “Match C pickup.c tipcontainer highdrop so a floor-unreachable hero's tipped contents use hitfloor(TRUE), instead of a gentle place_object.”

C `tipcontainer` (`pickup.c:3688–3825`): `get_obj_location` snaps box to hero (named skip); `highdrop = !can_reach_floor(TRUE)`, `altarizing = IS_ALTAR`; `u.uswallow` clears both; `terse = !(highdrop || altarizing || costly_spot)`; spill `:` if terse else `.`; loop extract, `otmp->ox/oy = box`; ice-box / cursed mbag / shop / `targetbox` named; `else if (highdrop)` `:3807–3810` `how_lost=LOST_DROPPED` then `hitfloor(otmp, TRUE)`; else altar `doaltarobj` or terse/dropy. Callers: invent getobj (named) and floor ynq (`able_to_loot` usually blocks highdrop).

Old JS: colon spill + `place_object` + per-item `doname` for every content.

The diff **does** the highdrop predicate, swallow clear, spill `.` vs `:`, and `how_lost`+`hitfloor(true)`. Non-highdrop keeps the fortress colon+`place_object` path. It does **not** port altarizing `doaltarobj` or C’s comma-list `dropy`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `highdrop` | C `:3732`, **wired** | `!can_reach_floor(TRUE)` |
| swallow clear | C `:3739–3740`, **wired** | highdrop only; altarizing named |
| spill `.` vs `:` | C `:3753–3755`, **wired** | highdrop is the live terse-breaker |
| `how_lost=LOST_DROPPED` | C `:3808`, **wired** | |
| `hitfloor(otmp, true)` | C `:3810`, **imported live** | D-1263 |
| `can_reach_floor` | C `engrave.c`, **imported live** | Flying true before pit check |
| ox/oy | C `:3760` then hitfloor uses `u.ux`, **partial clone** | JS `box.ox \|\| u.ux`; `hitfloor` still `u.ux` |
| altarizing `doaltarobj` | C `:3812–3813`, **named omit** | highdrop still hits `hitfloor` which handles altars |
| dropy terse comma-list | C `:3817–3819`, **named omit** | |
| invent getobj tip / ice-box / mbag / shop / BoH | C other arms, **named omit** | |
| export `tipcontainer` | mechanical | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in the highdrop arm; `hitfloor`/`hero_breaks` reuse existing break RNG.

## C ↔ JS fidelity

Pinned C highdrop (`pickup.c:3732–3741` and `:3807–3810`):

```
        boolean terse, highdrop = !can_reach_floor(TRUE),
                altarizing = IS_ALTAR(levl[ox][oy].typ),
                ...
        if (u.uswallow)
            highdrop = altarizing = FALSE;
        terse = !(highdrop || altarizing || costly_spot(...));
        ...
            } else if (highdrop) {
                otmp->how_lost = LOST_DROPPED;
                hitfloor(otmp, TRUE);
```

JS: `highdrop = !can_reach_floor(true)`; swallowed forces false; spill uses `.` iff highdrop (C terse is false whenever highdrop, so `.` — match that arm). Loop: extract; highdrop sets `how_lost` and awaits live `hitfloor(otmp, true)` (verbose “hit the floor” / WAN_STRIKING “strike” / `hero_breaks` / `ship_object` / `dropz(TRUE)`). Soft/water/swallow inside `hitfloor` still `dropy`. Altar under highdrop: C `hitfloor` `doaltarobj` then continues to breaks — JS the same live function. This is **not** “Match C dispatch, callee is a stub.”

Non-highdrop: JS still colon + `place_object` + `doname.` per item. C would `dropy` with a comma-list when terse. Named. Floor tip while standing on the box: `able_to_loot` usually requires reaching the floor, so public floor-ynq highdrop is rare; invent `#tip` while levitating is the live C caller (still named as getobj tip in the map, but `tipcontainer` itself is now the C body for any caller that reaches it). Grep: JS floor path already calls `tipcontainer`.

`otmp.ox = (box.ox|0) || (u.ux|0)` vs C always `u.ux` after `get_obj_location`. `hitfloor` ignores `obj.ox` and uses `u.ux,u.uy`. Idle for shatter. Not a Must-fix.

Flying: `can_reach_floor` returns true before `check_pit` (C / D-1082). Not highdrop. Levitation (not air/water): false → highdrop. Match.

## Hallucinations / overclaim

Subject + D-1273 say unreachable-floor tipped contents use `hitfloor(TRUE)` instead of gentle `place_object`. **The highdrop arm is the hunk.** Stamping **Addressed:** D-1273 is fair. Do **not** stamp “Match C altarizing `doaltarobj` on the dropy path” or “Match C terse comma-list” or “Match C invent getobj `#tip` menu.” Do not stamp “Match C toss_up.” Highdrop-on-altar is covered by live `hitfloor`, not the named altarizing omit.

## Density

One C arm plus the predicate/swallow/terse-breaker C puts next to it. ~30 JS lines. Right size. Did not glue `toss_up`.

## Branch-by-branch confirm

1. Standing, can reach floor: colon, `place_object`, no verbose hit. Match the kept fortress path.
2. Levitation, not swallowed: `.` spill, `LOST_DROPPED`, `hitfloor(true)`. Match.
3. Swallowed: highdrop cleared, not `hitfloor`. Match.
4. Two contents, highdrop: each `hitfloor(true)`. Match.
5. WAN_STRIKING highdrop: “strike” via live `hitfloor`. Match.
6. Glass highdrop: `hero_breaks` may destroy, no `dropz`. Match.
7. Flying: not highdrop (`can_reach_floor` true). Match.
8. Highdrop on altar: `hitfloor` `doaltarobj` then breaks. Match C highdrop, not the named dropy-altar omit.
9. Ice-box / cursed mbag / shop / target bag: still named. Match the skip.
10. Invent getobj tip wiring: still named. Match the skip of that caller polish.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `u.ux` fallback is C’s feet, not a recorded session cell. Plain ESM.

## Verification

Journal: private canary **10**/10 (C order; JS `hitfloor` true; reachable floor no verbose hit; Lev `LOST_DROPPED`+hits-floor; swallow clear; two contents; WAN_STRIKING; glass `hero_breaks`; Flying not highdrop; Lev+swallow); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session tips while `!can_reach_floor(TRUE)` and not swallowed. Cadence this audit: full `sessions` at HEAD `b166de10` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. Highdrop goes through live `hitfloor(TRUE)`. ox/oy clone is idle because `hitfloor` uses hero feet. Non-highdrop colon+`place_object` is the named fortress keep, not a silent `dropy` skip of shatter on the highdrop path.

Named omits (map, not Must-fix):

1. altarizing `doaltarobj` on the non-highdrop path; dropy terse comma-list
2. invent getobj `#tip`; `tipcontainer_gettarget`
3. ice-box / cursed mbag / shop / BoH explode; toss_up

Do not Must-fix “JS exports `tipcontainer`.” Do not Must-fix missing `get_obj_location`. Do not pull `toss_up` this SHA.

## Callers / RNG ledger

C: `dotip` invent + floor. JS floor `tipcontainer` call; invent getobj still named. RNG only inside `hitfloor`. Public fortress is not evidence a levitating hero shattered tipped glass.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: unreachable-floor tip now `how_lost`+live `hitfloor(TRUE)`; reachable-floor colon+`place_object` and altarizing dropy stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1273 `2a6bf680`.
