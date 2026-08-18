# Review 199 — d81367e2 — trap.c `launch_obj` TELEP/LEVEL_TELEP `pline_xy` (D-1237)

## Metadata
- Full / short hash: `d81367e209a7dcc9603ccbdf41c97798cc326154` / `d81367e2`
- Parent: `5c860b0e` (D-1236). This file audits **this SHA only**. Archive row **Addressed:** D-1237 lacked the short hash; this review commit fills `d81367e2`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 23:23:29 +0200
- D-id: **D-1237**
- Stats: 12 files, +297 / −182 — `js/trap.js` +65 / −8; comments `js/display.js` / `js/teleport.js`. Journal rotate in the same SHA.
- Claims to close: Open `teleport.c` rolling-boulder TELEP `pline_xy` (queue said teleport.c because relocate is `rloco`; C writer is `trap.c` `launch_obj`; named from D-1215 / D-1228 / D-1230 / review **192** / **198**). Not `#teleport`. `reviews/loop-2026-08-15/` has no unpaid launch_obj Must-fix.
- JS / map: `trap.js` `launch_obj` ROLL mid-cell; `rloco` / `random_teleport_level` already in `teleport.js`. `c-js-map/turns.md`. Landmine / pit / `flooreffects` still named.
- Prior reviews this SHA claims to close: **192** named omit rolling-boulder TELEP `pline_xy`.

## Intent vs deliverable

Git subject promises: “Match C trap.c launch_obj TELEP/LEVEL_TELEP so a rolling boulder that hits a teleport trap uses pline_xy then rloco (or migrates), instead of rolling through the trap to rest.”

C `launch_obj` (`trap.c:3423–3508`) `style==ROLL` + `t_at` + `otyp==BOULDER` switch: LANDMINE `rn2(10)>2` KAABLAMM; LEVEL_TELEP `random_teleport_level()` same-depth `break` else FALLTHROUGH; TELEP_TRAP `pline_xy` (cansee) else `You_hear` (!Deaf), `otrapped=0`, TELEP `rloco` else `add_to_migration`+`get_level`+`owornmask=MIGR_RANDOM`, `seetrap`, `used_up`, `launch_drop_spot`; PIT/SPIKED/HOLE/TRAPDOOR `flooreffects` + `dist=-1`.

Old JS: comment “Mid-roll trap interactions (landmine/telep/pit) deferred”; boulder continued to `place_object` at rest.

The diff **does** TELEP always and LEVEL_TELEP unless `newlev==depth(u.uz)`, `pline_xy` / `You_hear`, `rloco` vs migrate, `seetrap`, `used_up` + `break`. It does **not** pull landmine `rn2(10)`, pit `flooreffects`, `down_gate`/`ship_object`, boulder-on-boulder, or `launch_drop_spot`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `launch_obj` TELEP/LEVEL_TELEP | C `:3460–3488`, **wired** | FALLTHROUGH via `telep` flag |
| `pline_xy` | C callee, **already live** | D-1215; not a stub |
| `rloco` | C `teleport.c:2100–2187`, **imported** | goodpos+`place_object` live; Rider/`flooreffects`/shop/W-tower named |
| `random_teleport_level` | C `:2190–`, **imported** | `!rn2(5)` / Knox / endgame stay |
| `add_to_migration` | C `mkobj.c`, **imported** | OBJ_MIGRATING chain |
| `get_level` | C `dungeon.c`, **imported** | dest dnum/dlevel |
| `seetrap` | C callee, **already live** | |
| `Deaf` | C `youprop.h`, **pre-existing local** | trap.js |
| LANDMINE / PIT `flooreffects` | C `:3437–3501`, **named omit** | no `rn2(10)` burned |
| `launch_drop_spot` | C bones, **named omit** | |
| `down_gate` / `ship_object` | C `:3424–3429`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. New RNG on this path: LEVEL_TELEP `random_teleport_level` (`!rn2(5)` then maybe `rn2`/`rnd`); TELEP_TRAP `rloco` `rn1(COLNO-3,2)`/`rn2(ROWNO)` goodpos loop. Landmine `rn2(10)` **not** consumed (named skip of that arm).

## C ↔ JS fidelity

Pinned C TELEP/LEVEL_TELEP (`trap.c:3460–3488`):

```
                case LEVEL_TELEP:
                    newlev = random_teleport_level();
                    if (newlev == depth(&u.uz))
                        break;
                    FALLTHROUGH;
                case TELEP_TRAP:
                    if (cansee(x, y))
                        pline_xy(x, y,
                                 "Suddenly the rolling boulder disappears!");
                    else if (!Deaf)
                        You_hear("a rumbling stop abruptly.");
                    singleobj->otrapped = 0;
                    if (t->ttyp == TELEP_TRAP) {
                        (void) rloco(singleobj);
                    } else {
                        add_to_migration(singleobj);
                        get_level(&dest, newlev);
                        singleobj->ox = dest.dnum;
                        singleobj->oy = dest.dlevel;
                        singleobj->owornmask = (long) MIGR_RANDOM;
                    }
                    seetrap(t);
                    used_up = TRUE;
                    launch_drop_spot((struct obj *) 0, 0, 0);
                    break;
```

JS: `ttyp===TELEP_TRAP` → `telep`; `LEVEL_TELEP` → `newlev=random_teleport_level()`, `telep = newlev !== depth(u.uz)`. Same-depth skips the message (C `break` out of the case, not the while — then `used_up||dist==-1` is false, roll continues). Off-depth falls through: `ttyp` is still LEVEL_TELEP so migrate, not `rloco`. TELEP_TRAP never calls `random_teleport_level`. Match FALLTHROUGH + `t->ttyp == TELEP_TRAP` test.

`pline_xy` then `You_hear` else-if `!Deaf`. **Callee `pline_xy` is live** (sets `msg_loc`, `vpline`). Accessiblemsg prefix on the disappears line when On+`isok`. Blind+cansee still `pline_xy` (C `cansee`, not `!Blind`). Blind+!cansee+!Deaf: rumble. Deaf: silent. Match.

`used_up=true; break` exits the `while (dist-- > 0 && !used_up)` so the rest arm does not `place_object` at `xRest`. Match C `used_up` skip of the rest place. `launch_drop_spot` absent — bones drop-spot named.

`rloco` (`teleport.js:1814–1831`): extract, `rn1`/`rn2` until `goodpos(tx,ty,null,0)` or 4000, `place_object`, `newsym`. **Not a no-op stub.** C also: Rider `revive_corpse` before extract; `flooreffects` after pick (may destroy); shop bill; W-tower / `dndest` restricted_fall extra `goodpos` rejects. For a **boulder**, Rider does not fire. Restricted_fall / W-tower / `flooreffects` on the landing cell are named omits of **pre-existing** `rloco`, not a fake TELEP dispatch. Do not Must-fix “finish rloco” as this SHA’s wrap.

`add_to_migration` + `get_level` + `MIGR_RANDOM` (`0`): live chain; dest dnum/dlevel. Match C migrate arm.

`style === ROLL`: C `switch (style)` strips `LAUNCH_UNSEEN` / `LAUNCH_KNOWN` then `if (style == ROLL)`. JS strips the same bits then equality. Match.

Landmine/pit: JS does not enter those cases, so a boulder rolls through a landmine without `rn2(10)` and through a pit without `dist=-1`. **Named omit of those arms**, not a wrong TELEP implementation. C `down_gate`/`ship_object` before `t_at` also named.

## Hallucinations / overclaim

Subject + D-1237 say a rolling boulder that hits TELEP/LEVEL_TELEP `pline_xy` then `rloco` or migrate instead of resting through the trap. **The ROLL mid-cell TELEP/LEVEL_TELEP arm + live `pline_xy` + live `rloco`/migrate are the hunk.** Stamping **Addressed:** D-1237 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C landmine KAABLAMM/`fracture_rock`” or “Match C pit `flooreffects`” or “Match C `rloco` Rider/`flooreffects`/W-tower.”

Queue filename `teleport.c` was the Open row; C switch is `trap.c` `launch_obj` (D-log already said so).

## Density

C TELEP/LEVEL_TELEP cases + the relocate callees those cases actually call. ~41 JS lines in `launch_obj`. Right size. Did not glue landmine/pit.

## Branch-by-branch confirm

1. TELEP + cansee: `pline_xy` disappears; `rloco`; rest empty; `seetrap`. Match.
2. TELEP + !cansee + !Deaf: `You_hear` rumble; `rloco`. Match.
3. TELEP + !cansee + Deaf: silent; still `rloco`. Match.
4. LEVEL_TELEP same-depth (`!rn2(5)` / Knox / endgame): no message, keep rolling. Match C `break`.
5. LEVEL_TELEP off-depth: message; migrate not `rloco`; `ox/oy` dest; `MIGR_RANDOM`. Match FALLTHROUGH.
6. TELEP_TRAP does not call `random_teleport_level`. Match.
7. `used_up` skips rest `place_object`. Match.
8. LANDMINE: JS rolls through; C may `rn2(10)`. **Named.**
9. PIT/HOLE: JS rolls through; C `dist=-1`. **Named.**
10. `launch_drop_spot` / `down_gate`: **named.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `FORCETRAP` in trap.js is a pre-existing C flag name, not this SHA. `depth` imported from `hacklib.js`. Plain ESM.

## Verification

Journal: private canary **18**/18 (C FALLTHROUGH; JS `pline_xy`; cansee disappears + rest empty + seetrap + rloco; accessiblemsg prefix; Blind You_hear; Blind+Deaf silent; LEVEL_TELEP In_endgame skip; off-depth migrate); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a rolling boulder crosses TELEP/LEVEL_TELEP. Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. TELEP/LEVEL_TELEP relocate through live `pline_xy` + live `rloco`/`add_to_migration`. Landmine/pit skips are named omits of those switch arms, not a clone that implements them wrongly.

Named omits (map, not Must-fix):

1. LANDMINE `rn2(10)>2` KAABLAMM / `fracture_rock` / `scatter`
2. PIT/SPIKED_PIT/HOLE/TRAPDOOR `flooreffects` + stop roll
3. `down_gate` / `ship_object`; boulder-on-boulder chain; `launch_drop_spot`
4. `rloco` Rider revive / landing `flooreffects` / shop bill / W-tower `dndest`

Do not Must-fix “burn `rn2(10)` on landmine without the explosion.” Do not skip `seetrap` / `used_up`. Do not wrap this message as `pline_mon`.

## Callers / RNG ledger

C this switch: `launch_obj` ROLL only (`trapeffect_rolling_boulder_trap` / statue). JS same. TELEP_TRAP: `rloco` goodpos RNG. LEVEL_TELEP: `random_teleport_level` first (`!rn2(5)` …) then maybe migrate (no `rloco` RNG). Public fortress is not evidence a boulder hit TELEP.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a rolling boulder that hits TELEP/LEVEL_TELEP now `pline_xy` (or `You_hear`) then live `rloco` or migrate like C; landmine/pit/`flooreffects` stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1237 `d81367e2`.
