# Review 258 — 993e17ea — trap.c maketrap DRAWBRIDGE_UP ice→DB_FLOOR (D-1296)

## Metadata
- Full / short hash: `993e17ea14622287faf90685e089fa12b05b40bd` / `993e17ea`
- Parent: `dd02dc1b` (D-1295). This file audits **this SHA only**. Archive row **Addressed:** D-1296 `993e17ea` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 18:15:53 +0200
- D-id: **D-1296**
- Stats: 12 files, +115 / −47 — `js/trap.js` +33 / −12; comments `js/dig.js` / `js/music.js`.
- Claims to close: Open `trap.c` maketrap DRAWBRIDGE_UP ice (named from D-1280 / reviews **242** / **256**). Not shop `add_damage`. `reviews/loop-2026-08-15/` has no unpaid ice-morph Must-fix.
- JS / map: `trap.js` `maketrap` / `is_pool_or_lava`; `c-js-map/turns.md` + `data.md`. Shop `add_damage` named.
- Prior reviews this SHA claims to close: **242** named omit DRAWBRIDGE_UP ice→floor after PIT/HOLE `set_levltyp`.

## Intent vs deliverable

Git subject promises: “Match C trap.c maketrap so a PIT or HOLE on a closed ice drawbridge span becomes floor under-type, instead of leaving ice in place.”

C `maketrap` PIT/SPIKED/HOLE/TRAPDOOR (`trap.c:514–565`): shop `add_damage` first (named omit); `clear_flags = TRUE`; **if `lev->typ == DRAWBRIDGE_UP`** (checked **before** `IS_ROOM`, because closed spans pass `IS_ROOM`): keep `drawbridgemask`, `was_ice = (mask & DB_UNDER) == DB_ICE`, `mask &= ~DB_UNDER`, `mask |= DB_FLOOR`, if `was_ice` then `obj_ice_effects(x,y,TRUE)` + `spot_stop_timers(MELT_ICE_AWAY)`. Else D-1280 `set_levltyp` arms. Early create-gate (`:477–482`) uses `is_pool_or_lava(x,y)` which C `dbridge.c:77–80` defines as `is_pool || is_lava`. `IS_POOL(typ)` is `(typ) >= POOL && (typ) <= DRAWBRIDGE_UP` — **every** closed span — so a typ-macro clone of the gate rejects ice/floor spans too. C `is_pool` only treats DRAWBRIDGE_UP as pool when under-type is `DB_MOAT`; `is_lava` when `DB_LAVA`. Ice/floor spans accept a **new** pit; moat/lava still reject. Overwrite (`t_at` existing) skips the gate and still runs the morph.

Old JS: D-1280 `set_levltyp` live; DRAWBRIDGE_UP only `clear_flags=false`; local `is_pool_or_lava` used `IS_POOL(typ) || IS_LAVA(typ)`, so **new** traps never reached the ice arm.

The diff **does** the mask morph + ice melt, and retargets `is_pool_or_lava` at live `is_pool`/`is_lava`. It does **not** port shop `add_damage`. Named. Comment-only `dig.js` / `music.js`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| DRAWBRIDGE_UP mask morph | C `:532–545`, **new** | keep dir bits; force `DB_FLOOR` |
| `was_ice` melt | C `:540–544`, **new** | live `obj_ice_effects` / `spot_stop_timers` |
| `is_pool_or_lava` | C `dbridge.c:77–80`, **rewired** | was typ-macro clone |
| `is_pool` / `is_lava` | C D-1090 / D-1077, **imported live** | `hack.js` |
| `DB_UNDER`/`DB_ICE`/`DB_FLOOR` | C `rm.h:291–295`, **imported** | 28 / 8 / 16 |
| `set_levltyp` else | C `:546–559`, **pre-existing** | D-1280 |
| shop `add_damage` | C `:523–527`, **named omit** | |
| overwrite `reset_utrap` | C `:470–475`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** on the ice arm (`obj_ice_effects` retimes existing timers; `hole_destination` `rn2(4)` was already live).

## C ↔ JS fidelity

Pinned C (`trap.c:532–545` + `dbridge.c:77–80`):

```
        if (lev->typ == DRAWBRIDGE_UP) {
            clear_flags = FALSE;
            was_ice = (lev->drawbridgemask & DB_UNDER) == DB_ICE;
            lev->drawbridgemask &= ~DB_UNDER;
            lev->drawbridgemask |= DB_FLOOR;
            if (was_ice) {
                obj_ice_effects(x, y, TRUE);
                spot_stop_timers(x, y, MELT_ICE_AWAY);
            }
        }
boolean is_pool_or_lava(coordxy x, coordxy y) {
    if (is_pool(x, y) || is_lava(x, y))
        return TRUE;
```

JS copies that order: DRAWBRIDGE_UP **before** `IS_ROOM`; `clear_flags=false` so dir bits survive; `&= ~DB_UNDER`; `|= DB_FLOOR`; melt only when under-type **was** ice. Already-floor span: `was_ice` false, mask stays floor. Moat/lava **new** trap: live `is_pool`/`is_lava` reject (DB_MOAT is 0; ice is 8; floor is 16). Overwrite of an existing trap on a lava span still enters the morph (gate skipped) and becomes floor — C same, including the comment that terrain becomes floor “even if it was moat, lava, or ice.”

`obj_ice_effects` / `spot_stop_timers` are imported live from `mkobj.js` (D-0975 ice timers), not stubs. `is_pool` already includes DRAWBRIDGE_UP+`DB_MOAT` (D-1090); `is_lava` DRAWBRIDGE_UP+`DB_LAVA` (D-1077).

This is **not** “Match C dispatch, callee is a stub.” The morph callees run. Shop `add_damage` is a prior named omit **above** this arm, not a fake ice dispatch.

Other `is_pool_or_lava` callers in `trap.js` (launch distance) now match C’s function rather than `IS_POOL(typ)`. That is a C-fix of the clone, not a new theory.

## Hallucinations / overclaim

Subject + D-1296 say a PIT/HOLE on a closed **ice** span becomes floor under-type. **The mask morph + gate retarget are the hunk.** Stamping **Addressed:** D-1296 is fair. Do **not** stamp “Match C shop `add_damage`.” Do **not** stamp “Match C overwrite `reset_utrap`.” Do **not** stamp “Match C `IS_POOL` ≡ `is_pool`.” Do **not** stamp “new moat/lava pits now morph” — new ones still **reject**.

## Density

One C `if` plus the gate clone that blocked it. ~20 JS lines. Did not glue shop holes. Right size. Comment-only dig/music.

## Branch-by-branch confirm

1. New PIT on ice span: gate allows (`is_pool` false); mask → `DB_FLOOR`; melt timers. Match `:532–545` + `:77–80`.
2. New PIT on floor span: allow; `was_ice` false; still `|= DB_FLOOR`. Match.
3. New PIT on moat/lava span: `is_pool`/`is_lava` true; `maketrap` null. Match create-gate.
4. Overwrite trap on lava span: skip gate; morph to floor. Match oldplace.
5. MAGIC_PORTAL on DRAWBRIDGE_UP: still rejected (`:480`). Match.
6. STONE/SCORR PIT: still `set_levltyp` CORR (D-1280). Match else.
7. Shop hole `add_damage` still skipped. Named. Public-unhit unless a session pits a closed ice drawbridge.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Ice/floor vs moat/lava is C’s under-mask, not a recorded coordinate.

## Verification

Journal: private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session pits a closed ice drawbridge. Cadence this audit: full `sessions` at HEAD `086eb03d` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Morph, melt, `is_pool||is_lava` gate, and DRAWBRIDGE_UP-before-ROOM match C `:532–545` / `:77–80`.

Named omits (map, not Must-fix):

1. shop `add_damage` on hole/door/wall
2. overwrite `reset_utrap`; Knox `LEVEL_TELEP`; Sokoban finish
3. `mongone` full body (unrelated trap delete)

Do not Must-fix “typ-macro `IS_POOL` retired.” Do not Must-fix “comment-only dig/music.” Do not pull throwit steed this SHA.

## Callers / RNG ledger

C: `maketrap` ← wizard wish / digging / bones. JS same. No new positional RNG on the ice arm. Public fortress is not evidence an ice span became `DB_FLOOR`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: closed ice (and floor) spans now accept a pit and force `DB_FLOOR` like C; shop `add_damage` stays named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1296 `993e17ea`.
