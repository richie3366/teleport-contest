# Review 102 — 4d71520e — teleds invocation_message (D-1141)

## Metadata
- Full / short hash: `4d71520e3386c0b91147ad5d7e4563b125f13fc1` / `4d71520e`
- Parent: `9cbe109e` (review **98–101** + cadence #1450). This file audits **this SHA only**. Archive row **Addressed:** D-1141 `4d71520e` was filled by D-1142.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 06:36:23 +0200
- D-id: **D-1141**
- Stats: 11 files, +214 / −46 — `js/hack.js` +101 / −1 (`invocation_pos` / `invocation_message` + local clones); `js/teleport.js` +14 / −3 (await after `spoteffects`).
- Claims to close: Open queue `teleport.c` `teleds` `invocation_message` (named). Not vault_guard. Review **101** next Open; **82** named omit. `reviews/loop-2026-08-15/` has no open invocation Must-fix.
- JS / map: `hack.js` `invocation_message` / `invocation_pos`; `teleport.js` `teleds`. `c-js-map/turns.md` teleport + hack. Walk `hack.c:2973`, `mkmaze.c` `inv_pos` / VIBRATING_SQUARE, apply.js local `invocation_pos` clone, shared `dungeon.c` `Invocation_lev` export still named.
- Prior reviews this SHA claims to close: **101** next-port invocation; **82** named omit after `spoteffects`.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleds so landing on the Invocation square (not a stair) runs invocation_message after spoteffects (nomul, You_feel vibration, uvibrated, lit 7-candle candelabrum throb/glow), instead of returning silently.”

Old JS returned after `spoteffects(true)`. C `teleport.c:568–569` calls `spoteffects(TRUE)` then `invocation_message()`. C `hack.c:3064–3085` gates `invocation_pos(u.ux,u.uy) && !On_stairs(...)`, then `carrying(CANDELABRUM_OF_INVOCATION)`, `nomul(0)`, buf (steed `y_monnam` / Levitation||Flying `"beneath you"` / `makeplural(body_part(FOOT))`), `You_feel("a strange vibration %s.", buf)`, `u.uevent.uvibrated = 1`, lit `spe==7` candelabrum pline (Blind throb vs glow).

The diff **does** that call and ports the body plus the four local clones C inlines via macros/helpers. It does **not** wire `hack.c:2973` walk `invocation_message` after `vision_recalc(1)`. Named (live Open). It does **not** place `svi.inv_pos` (`mkmaze.c`). Named. Unset `inv_pos` is not treated as `(0,0)`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleds` `invocation_message()` | C body, **new call** | `teleport.c:569` after `spoteffects` |
| `invocation_message` | C callee, **new** | `hack.c:3064–3085` |
| `invocation_pos` | C callee, **new** | `hack.c:982–986` |
| `Invocation_lev` | C callee, **clone** | `dungeon.c:2017–2021`; hellish + `dlevel == num_dunlevs-1` |
| `On_stairs` | C callee, **clone** | `stairs.c:148–151`; walk `game.stairs` |
| `carrying` | C callee, **clone** | `invent.c:1495–1504`; first invent `otyp` |
| `Blind_im` | C youprop, **clone** | `(H\|\|E) && !B` plus `uroleplay.blind` short-circuit |
| `Levitation_st` / `Flying_st` | C youprop, **imported** | already in `switch_terrain` (D-1129) |
| `nomul` / `You_feel` / `The` / `xname` / `y_monnam` / `body_part` | C callees, **imported** | real |
| walk `hack.c:2973` | C later caller, **named omit** | live Open |
| `mkmaze.c` `inv_pos` | C placement, **named omit** | live Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `inv_pos` compare is live `svi.inv_pos` / `game.inv_pos`, not a recorded cell. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none. `body_part(FOOT)` is a table lookup. Public suite never stands on Invocation_lev, so no extra pline/RNG. Path **public-unhit**.

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Contest Rule #2: in-process ESM; dynamic `import('./polyself.js')` only for `body_part` (cycle). Do not treat unset `inv_pos` as `(0,0)` matching column 0. Do not pull walk `hack.c:2973` or `mkmaze.c` placement into this SHA. Do not restore the silent `teleds` return after `spoteffects`.

## C ↔ JS fidelity

### `teleds` call site

C `teleport.c:567–571`:

```
spoteffects(TRUE);
invocation_message();
notice_mon_on();
notice_all_mons(TRUE);
```

JS after this SHA: `await spoteffects(true); await invocation_message();` then return. `notice_mon_*` still absent here (D-1142 next). Order of the Open **call** matches. Stay-off-square: `invocation_pos` false → immediate return, no `nomul`. Stair on the square: `On_stairs` true → skip (C `&& !On_stairs`).

### `invocation_pos`

C `hack.c:982–986`: `Invocation_lev(&u.uz) && x == svi.inv_pos.x && y == svi.inv_pos.y`. No null check; unset C coords are `(0,0)`, which is not a legal hero cell (`COLNO` starts at 1).

JS: `Invocation_lev(u.uz)` then `ip = game.svi?.inv_pos || game.inv_pos`; missing `ip` → false. That extra guard is equivalent on-map. `apply.js` `invocation_pos_apply` prefers `game.inv_pos` first — named remaining clone, not this Open miss.

### `Invocation_lev` / `On_stairs` / `carrying`

C `dungeon.c:2017–2021`: `In_hell(lev)` (`dungeons[dnum].flags.hellish`) && `dlevel == num_dunlevs - 1`. JS clone matches that arithmetic. Shared `dungeon.js` export still named.

C `On_stairs`: `stairway_at(x,y) != NULL` (ladders included). JS walks `game.stairs` `sx/sy`. Same occupancy as `mklev.js` `stairway_at`.

C `carrying`: first `gi.invent` `nobj` with `otyp == type`, not nested containers. JS first `game.invent[]` match. Same.

### `invocation_message` body

C `hack.c:3067–3084` vs JS (SHA, ~1529–1552): carrying **before** `nomul` (match); steed / Lev||Fly / feet buf (match; Flying includes steed-flyer via `Flying_st`); `You_feel` + period in the format (JS `You_feel(\`a strange vibration ${buf}.\`)` → `"You feel a strange vibration …."`); `uvibrated = 1` even with no candelabrum; candelabrum only if `otmp && spe==7 && lamplit`.

JS body (SHA, later shifted by D-1142 inserting `notice_*` above it):

```
if (!invocation_pos(u.ux, u.uy) || On_stairs(u.ux, u.uy)) return;
const otmp = carrying(CANDELABRUM_OF_INVOCATION);
nomul(0);
/* steed / Levitation_st||Flying_st / body_part(FOOT) */
await You_feel(`a strange vibration ${buf}.`);
u.uevent.uvibrated = 1;
if (otmp && (otmp.spe | 0) === 7 && otmp.lamplit) { /* The(xname) throb/glow */ }
```

De Morgan of C’s `if (pos && !On_stairs)` is the early return. Carrying before `nomul` matches. `You_feel` prefixes `"You feel "` (`display.js:3456–3458`); C `You_feel("a strange vibration %s.", buf)` with a period in the format is the same sentence.

`Blind_im` adds `uroleplay.blind` **before** `!BBlinded`. C `youprop.h:103` Blind is `(HBlinded || EBlinded) && !BBlinded` — PermaBlind is `HBlinded & FROMOUTSIDE`, so Eyes (`BBlinded`) still see. OPTIONS:blind + Eyes would throb in JS and glow in C. Named youprop clone, same class as review **86**; public-unhit. `Levitation_st`/`Flying_st` are the D-1129 youprop clones (`H||E` + blocked + steed-flyer), not sticky `u.Levitation`.

Walk caller C `hack.c:2964–2973`: after a successful step, `newsym(ux0,uy0); vision_recalc(1); invocation_message();`. JS `domove` still has no that call (live Open). Artifact.c / spell.c / apply.c other `invocation_pos && !On_stairs` sites are not this peel.

`nomul(0)` is `hack.js:418` (same file). Candelabrum otyp is `objectNames.indexOf('CANDELABRUM_OF_INVOCATION')` — table extract, not a seed constant. `The(xname(otmp))` matches C `The(xname(otmp))` before the Blind ternary. Unlit or `spe!=7` skips the second pline but still sets `uvibrated` (match). Hero on a ladder that is a `stairway` with `isladder` is still `On_stairs` in C and JS.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded `(x,y)` gates. Dynamic `import('./polyself.js')` is cycle-breaking, not a filesystem read.

## Hallucinations / overclaim

D-log / CURRENT / subject say landing on the Invocation square (not a stair) runs `invocation_message` after `spoteffects` (nomul, You_feel, `uvibrated`, lit 7-candle throb/glow). That is the hunk. They **name** walk `hack.c:2973` and `mkmaze.c` `inv_pos`. Stamping **Addressed:** D-1141 is fair for the Open **teleds call + body**. Hash `4d71520e` is on the archive row (filled by D-1142). Do **not** stamp it as “Match C walk invocation” or “inv_pos is now placed.” This is **not** “Match C dispatch, callee is a stub”: `invocation_message` is the real C function; `You_feel` / `nomul` / `carrying` are real or matching clones.

## Density

Caller `teleds` one call plus the C `invocation_message` envelope (pos + On_stairs + carrying + Blind). ~100 JS lines. One family. Related deferrals (walk caller, `inv_pos` placement) named, not a second hypothesis. Not “finish dungeon.c.”

## Verification

Journal: private canary **26**/26 (Invocation_lev match/mismatch; unset inv_pos; explicit (0,0); On_stairs skip; feet/lev/blocked-lev/fly/steed buf; spe==7 lit glow; Blind/uroleplay throb; spe!=7 and unlit skip candelabrum); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0367 Pri ^T + 0004 scroll + 0009 swim + 0360/0373/4500/2200 + strict 0012/0367/0004/0360/4500/2200/0030/0009/0002. Path **public-unhit** on Invocation_lev. This audit’s full `sessions` (cadence **#1455**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `teleport.c:448–572`, `hack.c:982–986`, `:3064–3085`, `dungeon.c:1941–2021`, `stairs.c:148–151`, `invent.c:1495–1504`, `youprop.h:103,240–255`; JS SHA `hack.js` clones + `invocation_message`, `teleport.js` call. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| dest Invocation_lev + inv_pos + not stair | nomul, You_feel, uvibrated | **same** |
| On_stairs on that cell | skip | **same** |
| no inv_pos / not hell last | skip | **same** |
| lit spe==7 candelabrum | throb vs glow | **same** (Eyes+PermaBlind named) |
| walk `domove` | `hack.c:2973` | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open call + body match `teleport.c:569` / `hack.c:3064–3085`.

Named omits / do-nots (map / Open, not Must-fix):

1. `hack.c:2973` walk `invocation_message` after `vision_recalc(1)`. Live Open.
2. `mkmaze.c` `inv_pos` / VIBRATING_SQUARE placement. Live Open.
3. Shared `dungeon.c` `Invocation_lev` export; `apply.js` still has `invocation_pos_apply`.
4. `Blind_im` `uroleplay.blind` short-circuit vs C `!BBlinded`. Map, not this Must-fix.
5. Do not restore the silent `teleds` return. Do not treat unset `inv_pos` as `(0,0)`. Do not pull `notice_mon_*` into this SHA — **Addressed:** D-1142 `52194cc9`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `teleds` now awaits real `invocation_message` after `spoteffects`, with Invocation_lev / On_stairs / carrying / vibration / uvibrated / lit candelabrum matching C, while walk and `inv_pos` placement stay named Open rows.
- Must-fix stays empty for this SHA; next port popped Open `teleds` `notice_mon_off` / `notice_all_mons`. **Addressed:** D-1142 `52194cc9`. Not walk invocation.
