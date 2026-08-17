# Review 90 — 410f22a2 — teleds switch_terrain dest-typ (D-1129)

## Metadata
- Full / short hash: `410f22a2eb658148906aeda5a0bfb6899389ec11` / `410f22a2`
- Parent: `f7b57226` (review **86–89** + cadence #1435). This file audits **this SHA only**. Archive row **Addressed:** D-1129 `410f22a2` was filled by D-1130.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 03:22:27 +0200
- D-id: **D-1129**
- Stats: 11 files, +201 / −45 — `js/hack.js` +89 / −2 (`switch_terrain` + Lev/Fly clones); `js/teleport.js` +23 / −6 (dest-typ gate after materialize).
- Claims to close: Open queue `teleport.c` `teleds` `switch_terrain` (named). Not fill_pit. Review **89** next-port; review **82** named omit 2. `reviews/loop-2026-08-15/` has no open switch_terrain Must-fix.
- JS / map: `hack.js` `switch_terrain`; `teleport.js` `teleds`; `trap.js` `float_up`; `polyself.js` `float_vs_flight`. `c-js-map/turns.md` teleport + hack. `classify_terrain`, `set_uinwater` / dissolve_bars / dig / dothrow / goto_level callers still named.
- Prior reviews this SHA claims to close: **89** named next Open `teleds` `switch_terrain`.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleds so a dest-typ change after vision runs switch_terrain, blocking or restoring levitation and flight via FROMOUTSIDE instead of skipping the terrain gate.”

Old JS `teleds` ran vision + verbose materialize then `spoteffects(TRUE)`. Comment named `switch_terrain` deferred. C `teleport.c:548–552` compares `levl[u.ux][u.uy].typ` vs origin `levl[u.ux0][u.uy0].typ` **after** `vision_recalc(0)` and the materialize pline, then calls `switch_terrain()` so a You_cant / float_up message paints the new map. `hack.c:3178–3217` blocks on obstructed / closed door / waterwall / lavawall via `B* |= FROMOUTSIDE` and **skips** `float_down`; unblock clears FROMOUTSIDE then `float_up` / `float_vs_flight`.

The diff **does** that gate and ports the helper. It does **not** port `classify_terrain` (`flags.terrainstatus`), nor wire `set_uinwater` / `dissolve_bars` / `digactualhole` / `dothrow` / `goto_level`. Named. It does **not** pull `update_player_regions` (next SHA).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleds` dest-typ gate | C body, **new** | `teleport.c:551–552` after materialize |
| `switch_terrain` | C callee, **new** | `hack.c:3178–3217`; not a comment stub |
| `Levitation_st` / `Flying_st` | C macros, **clone** | youprop `(H\|\|E)&&!B`; Flying adds steed `is_flyer` (D-1070/D-1085) |
| `_uprop_he_st` | C H/E, **clone** | flats + `uprops[idx]` (confer may not mirror `E*`) |
| `closed_door` | C callee, **imported** | same-file; `D_CLOSED\|D_LOCKED` |
| `IS_OBSTRUCTED` / `IS_WATERWALL` / `LAVAWALL` | C macros, **imported** | `const.js` |
| `float_up` | C callee, **imported** | `trap.js`; real body, not a no-op |
| `float_vs_flight` | C callee, **imported** | `polyself.js`; toggles `BFlying` `I_SPECIAL` |
| `FROMOUTSIDE` | C bit, **imported** | `prop.h:139` `0x04000000` |
| `classify_terrain` | C arm, **named omit** | `flags.terrainstatus` |
| other `switch_terrain` callers | C callers, **named omit** | `set_uinwater` still named on dissolve_bars |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `u.ux`/`u.uy`/`u.ux0`/`u.uy0` are live hero cells. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in the typ compare or the block/unblock bit ops. `float_up` may `encumber_msg` on the **unblock** arm only (BLevitation had FROMOUTSIDE). Public tourist teleds ROOM↔CORR with `B*=0` is a no-op besides the xor. Wall-teleport Lev/Fly **public-unhit** (journal).

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. `FROMOUTSIDE` is the C prop bit, not a recorded mask. Contest Rule #2: in-process ESM; dynamic `import('./trap.js')` / `polyself.js` is cycle-breaking, not `fs`. One await boundary still `nhgetch` (pline inside `switch_terrain`). Do not pull `classify_terrain` or `update_player_regions` into this SHA. Do not call `float_down` when blocking — C skips it.

## C ↔ JS fidelity

### Caller order

C `teleport.c:536–552`:

```
newsym(u.ux0, u.uy0);
see_monsters();
gv.vision_full_recalc = 1;
nomul(0);
notice_mon_off();
vision_recalc(0);
if (is_teleport && flags.verbose)
    You("materialize in %s location!", ...);
if (levl[u.ux][u.uy].typ != levl[u.ux0][u.uy0].typ)
    switch_terrain();
```

JS `1281–1305`: `newsym(ox,oy)` **and** extra dest `newsym` (pre-existing, not this SHA); `see_monsters`; `vision_full_recalc`; `nomul(0)`; **no** `notice_mon_off` (named); `vision_recalc(0)`; materialize; then dest typ vs origin typ → `await switch_terrain()`. Gate is after materialize, before `spoteffects`. Match on the Open line. `notice_mon_*` / vault_guard stay named.

Same-typ skip: ROOM→ROOM does not enter the helper. ROOM→STONE / STONE→ROOM does. C integer `typ`; JS `| 0`.

### `switch_terrain` block / unblock

C `hack.c:3180–3213`:

```
blocklev = IS_OBSTRUCTED(lev->typ) || closed_door(u.ux,u.uy)
        || IS_WATERWALL(lev->typ) || lev->typ == LAVAWALL;
was_levitating = !!Levitation; was_flying = !!Flying;
if (blocklev) {
    if (Levitation) You_cant("levitate in here.");
    BLevitation |= FROMOUTSIDE;
} else if (BLevitation) {
    BLevitation &= ~FROMOUTSIDE;
    if (Levitation || BLevitation) float_up();
}
if (blocklev) {
    if (Flying) You_cant("fly in here.");
    BFlying |= FROMOUTSIDE;
} else if (BFlying) {
    BFlying &= ~FROMOUTSIDE;
    float_vs_flight();
    if (Flying) You("start flying.");
}
if ((!!Levitation ^ was_levitating) || (!!Flying ^ was_flying))
    disp.botl = TRUE;
```

JS `1418–1457`: same `blocklev` four-disjunct; same two `if (blocklev) / else if (B*)` pairs; skip `float_down` on block; `You can't levitate/fly in here.` ≡ `You_cant`; `You start flying.` ≡ `You("start flying.")`. Unblock `float_up` when `Levitation_st() || u.BLevitation` after clearing FROMOUTSIDE (I_SPECIAL buried-ball chain still calls `float_up` — C comment at `:3193–3195`). `float_vs_flight` then maybe start-flying. botl on xor of was vs now. Match branch-for-branch minus named `classify_terrain`.

C `BLevitation` **is** `u.uprops[LEVITATION].blocked` (`youprop.h:239`). JS writes `u.BLevitation`, the field sit / engrave / `float_down` already read (D-1070). That is the live blocked word in this port, not a second invent. `Levitation_st` ORs `prop.blocked` so a confer-only blocked bit would still suppress the You_cant, then the write still lands on `u.BLevitation`. Dual-storage is the established clone, not a miss of the Open gate.

### Callees are not stubs

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `switch_terrain` runs. `float_up` (`trap.js:1957–2021`) is the real utrap / uinwater / swallow / Hallu / air / default body plus `float_vs_flight` + `encumber_msg`. `float_vs_flight` toggles `I_SPECIAL` on `BFlying`/`BLevitation` from H/E levitation and non-pit utrap. `closed_door` is the D_CLOSED|D_LOCKED helper.

`classify_terrain` is the named omit, not a silent no-op of the Open call.

### Callers of `teleds`

C: `vault_tele`, `safe_teleds`, `tele_to_rnd_pet`, cursed whistle, `tele_trap` teledest (named). JS already `await teleds` on those wired paths. This SHA does not add a caller. Every existing `teleds` now runs the typ gate. `tele_trap` teledest still named (live Open after D-1132).

## Hallucinations / overclaim

D-log / CURRENT / subject say dest-typ ≠ origin after vision+materialize runs `switch_terrain`, blocking or restoring Lev/Fly via FROMOUTSIDE instead of skipping the gate. That is the hunk: the compare, the helper, You_cant, `B* |= FROMOUTSIDE` without `float_down`, unblock `float_up` / `float_vs_flight`. They name `classify_terrain` and other callers. Stamping **Addressed:** D-1129 is fair for the Open **call**. Hash `410f22a2` is on the archive row (filled by D-1130). Do **not** stamp it as a close of `classify_terrain` or `set_uinwater`.

## Density

One C function plus the teleds call site that C places after materialize. Not “finish hack.c movement” and not a one-`if` FAIL peel. Related `update_player_regions` left named. ~89+23 JS. Right size (§2b caller/callee cluster).

## Verification

Journal: private canary **46**/46 (obstructed/door/waterwall/lavawall/pool/corr; confer uprops; sticky ignore; steed flyer; same-typ skip / ROOM→STONE / STONE→ROOM / materialize order / fill_pit ux0); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0004 scroll + 0360/0367/0373/4500/2200 + strict 0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path **public-unhit** on wall-teleport Lev/Fly. Cadence fortress is not a passes-walls stone proof. This audit’s full `sessions` (cadence **#1440**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `teleport.c:536–552`, `hack.c:3178–3217`, `youprop.h:239–255`, `prop.h:139`; JS `hack.js:1376–1459`, `teleport.js:1281–1305`, `trap.js:1957–2021`, `polyself.js:413–432`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| same typ | skip helper | **same** |
| ROOM→STONE, Lev | You_cant; `BLev \|= FROMOUTSIDE`; no float_down | **same** |
| STONE→ROOM, BLev FROMOUTSIDE | clear bit; `float_up` if Lev\|\|B | **same** |
| block Fly | You_cant fly; `BFly \|= FROMOUTSIDE` | **same** |
| unblock Fly | clear; `float_vs_flight`; maybe start flying | **same** |
| `classify_terrain` | if `flags.terrainstatus` | **named skip** |
| `notice_mon_off` | before vision | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open call matches `teleport.c:551–552`. The helper matches `hack.c:3178–3213` minus named `classify_terrain`.

Named omits / do-nots (map / Open, not Must-fix):

1. `classify_terrain` when `flags.terrainstatus` (`hack.c:3215–3216`).
2. Other callers: `set_uinwater`, dissolve_bars, `digactualhole`, dothrow, `goto_level`.
3. `teleds` `notice_mon_off` / `notice_mon_on` / `notice_all_mons` (`teleport.c:540,570–571`). Live Open.
4. `teleds` `update_player_regions` — **Addressed:** D-1130 `6dd7a794` (next SHA).
5. Do not restore the skip of dest-typ `switch_terrain`. Do not `float_down` on the block arm. Do not pull vault_guard into this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `teleds` now calls real `switch_terrain` after vision+materialize when dest typ ≠ origin, blocking or restoring levitation and flight via `B* FROMOUTSIDE` without `float_down` on the block arm, while `classify_terrain` and other callers stay named.
- Must-fix stays empty for this SHA; next port popped Open `teleds` `update_player_regions`. **Addressed:** D-1130 `6dd7a794`. Not teleok `in_out_region`.
