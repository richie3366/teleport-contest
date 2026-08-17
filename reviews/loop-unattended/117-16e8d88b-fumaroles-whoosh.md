# Review 117 — 16e8d88b — fumaroles clear_heros_fault / Norep whoosh (D-1156)

## Metadata
- Full / short hash: `16e8d88b71ba69b19743a64f3dc8873ad4485ac1` / `16e8d88b`
- Parent: `df99ab32` (D-1155). This file audits **this SHA only**. The fix stamped **Addressed:** D-1156 without the short hash; this review commit fills `16e8d88b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 13:08:18 +0200
- D-id: **D-1156**
- Stats: 12 files, +133 / −49 — `js/mklev.js` +30 / −7 (`fumaroles` whoosh + Deaf clone); `js/region.js` +5 / −1 (`clear_heros_fault` export); `js/fountain.js` comment.
- Claims to close: Open queue `mklev.c` `fumaroles` `clear_heros_fault` / Norep whoosh (named). Not expire dissipation. Reviews **98** / **107** named the whoosh. `reviews/loop-2026-08-15/` has no open fumaroles Must-fix.
- JS / map: `mklev.js` `fumaroles`; `region.js` `clear_heros_fault`; caller `do.js` `goto_level` already awaited. `c-js-map/data.md` fire/hell. `allmain.c` `moveloop_core` caller, `create_gas_cloud_selection` still named.
- Prior reviews this SHA claims to close: **98** / **107** named `clear_heros_fault` / Norep; D-1155 next-port.

## Intent vs deliverable

Git subject promises: “Match C mkmaze.c fumaroles so a lava burst clears heros_fault and Noreps a whoosh, instead of blaming the hero and staying silent.”

Old JS `fumaroles` already `await create_gas_cloud` on `LAVAPOOL` (D-1137 made that async). `make_gas_cloud` `set_heros_fault` when `!in_mklev && !mon_moving` (`region.c:1187–1188`), so an arrival burst was the hero’s (`killed` vs `monkilled`). C `mkmaze.c:1503–1513` then `clear_heros_fault(r)` and, if any burst and `!Deaf`, `Norep("You hear a %swhoosh!", loud ? "loud " : "")` with `loud` iff any origin `distu<15`.

The diff **does** export `clear_heros_fault`, call it on the returned cloud, track `snd`/`loud`, and Norep. It does **not** wire `allmain.c:376–377` `moveloop_core` (JS `allmain.js` has no fumaroles call). Named. `goto_level` already `else if (flags.fumaroles) await fumaroles()` (`do.c:1833–1834` / `do.js:1658–1659`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `fumaroles` `clear_heros_fault` | C body, **new call** | `mkmaze.c:1506` / `region.h:22` |
| `fumaroles` `snd`/`loud` / Norep | C body, **new** | `mkmaze.c:1507–1513` |
| `clear_heros_fault` | C macro, **exported** | `player_flags \|= REG_NOT_HEROS` (0x02) |
| `create_gas_cloud` | C callee, **imported** | D-1124/D-1137; returns the cloud |
| `Norep` | C callee, **imported** | `display.js`; PLINE_NOREPEAT vs `_prevmsg` |
| `dist2` / `distu` | C macro, **imported** | `hack.h` `dist2(x,y,u.ux,u.uy)`; JS `hacklib.js` |
| `Deaf_fumaroles` | C `youprop.h` Deaf, **clone** | `HDeaf \|\| EDeaf \|\| uroleplay.deaf`; extra `u.Deaf` bag like fountain.js |
| `Is_firelevel` / `temperature>0` | C body, **untouched** | already incremented `nmax`/`sizemin` |
| `allmain` moveloop caller | C caller, **named omit** | `allmain.c:376–377` |
| `goto_level` caller | C caller, **pre-existing** | already awaited |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `distu<15` is C’s squared-distance gate, not a recorded cell. Rule #2 clean.

**New RNG on this path:** none beyond the existing `rn2(3)` / `rn1(COLNO-4,3)` / `rn1(ROWNO-4,3)` / two `rn1(10,…)` per lava hit (already D-1137). Norep / `clear_heros_fault` are not RNG. Path **public-unhit** on whoosh (0373 fire arrival already matched without a lava hit, or with matching silent `nmax`).

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not skip `clear_heros_fault` after player-made `set_heros_fault`. Do not Norep when Deaf. Do not use `is_lava` here — C tests `typ == LAVAPOOL` exactly (`:1503`). Do not pull moveloop into this peel.

## C ↔ JS fidelity

### Loop then whoosh

C `mkmaze.c:1484–1514`:

```
nmax = rn2(3); sizemin = 5; snd = FALSE; loud = FALSE;
if (Is_firelevel(&u.uz)) { nmax++; sizemin += 5; }
if (svl.level.flags.temperature > 0) { nmax++; sizemin += 5; }
for (n = nmax; n; n--) {
    x = rn1(COLNO - 4, 3);
    y = rn1(ROWNO - 4, 3);
    if (levl[x][y].typ == LAVAPOOL) {
        NhRegion *r = create_gas_cloud(x, y, rn1(10, sizemin), rn1(10, 5));
        clear_heros_fault(r);
        snd = TRUE;
        if (distu(x, y) < 15) loud = TRUE;
    }
}
if (snd && !Deaf)
    Norep("You hear a %swhoosh!", loud ? "loud " : "");
```

JS `mklev.js:7989–8017`: same `nmax`/`sizemin` gates (pre-existing), `snd`/`loud` init, `LAVAPOOL` typ (not `is_lava`), `await create_gas_cloud` then `clear_heros_fault(r)`, `snd=true`, `dist2(x,y,u.ux,u.uy)<15` → `loud`, then `snd && !Deaf_fumaroles()` `Norep(\`You hear a ${loud ? 'loud ' : ''}whoosh!\`)`. C format `"You hear a %swhoosh!"` with `"loud "` or `""` is the same two strings. Match.

`create_gas_cloud` always returns the cloud object (C `NhRegion *`; JS `:746 return cloud`). `clear_heros_fault` on that object after `make_gas_cloud` may have cleared `REG_NOT_HEROS`. Arrival is `!in_mklev && !mon_moving` → set then clear. `in_mklev` bursts stay `REG_NOT_HEROS` (create_region default) then clear is idempotent. Match.

### `clear_heros_fault` vs `set_heros_fault`

C `region.h:21–22`: set = `&= ~REG_NOT_HEROS`; clear = `|= REG_NOT_HEROS`. `heros_fault` is `!(flags & REG_NOT_HEROS)`. JS `:103–108` same bit ops; `REG_NOT_HEROS=0x02`. Match. This is a C macro export, not a stub.

### Deaf / distu

C `youprop.h:125`: `HDeaf || EDeaf || u.uroleplay.deaf`. JS clone ORs `u.Deaf` as other JS Deaf clones do (fountain.js). Extra bag true without H/E/roleplay would silence a whoosh C would print. Pre-existing clone pattern, not a new control-flow gate. `dist2` is C squared Euclidean. `u.ux`/`u.uy` are the live hero (JS uses those fields throughout). Match `distu`.

### Callers

C `do.c:1833–1834`:

```
if (Is_waterlevel(&u.uz) || Is_airlevel(&u.uz))
    movebubbles();
else if (svl.level.flags.fumaroles)
    fumaroles();
```

before `vision_reset` / `docrt`. JS `do.js:1655–1659` same. C `allmain.c:376–377` is the once-per-turn twin after `nh_timeout`/`run_regions` would have aged clouds — JS `allmain.js` awaits `run_regions` but has **no** fumaroles call. Named. The function also early-returns `if (!lf?.fumaroles)` (pre-existing; C callers already gate). Double-check burns no RNG when the flag is off. Match the Open **arrival** line.

### `set_heros_fault` then clear — killed vs monkilled

C `inside_gas_cloud` uses `heros_fault(reg)` to choose `killed` vs `monkilled` on a monster death. Player-made clouds (`!in_mklev && !mon_moving`) set the bit so the hero is blamed. Natural fumaroles must not. Order: `create_gas_cloud` → `make_gas_cloud` may `set_heros_fault` → `clear_heros_fault`. JS same two functions, same `REG_NOT_HEROS`. `in_mklev` create already starts `REG_NOT_HEROS`; clear is idempotent. Fire.lua sets the fumaroles flag; `Is_firelevel` bumps `nmax`/`sizemin`. Temperature>0 (hell `clear_level_structures`) same. `typ==LAVAPOOL` only — DRAWBRIDGE lava does not burst in C either.

## Hallucinations / overclaim

D-log / CURRENT / subject say a lava burst clears `heros_fault` and Noreps a whoosh instead of blaming the hero and staying silent. **That is the hunk:** export + one call + `snd`/`loud` + Norep. Stamping **Addressed:** D-1156 is fair for the Open **whoosh** line. Fill hash `16e8d88b` in this commit. Do **not** stamp it as “Match C moveloop fumaroles” or “walk uses `hero_inside`.” This is **not** “Match C dispatch, callee is a stub”: `create_gas_cloud` / `Norep` / `clear_heros_fault` are real.

## Density

One C function’s trailing clear + message, plus export of an existing macro. ~30 JS. Thin vs §2b, but the queue item is exactly that trailer (not selection create, not moveloop). Not a second hypothesis. Not QUALITY-RISK for thinness under “do not combine items.”

## Verification

Journal: private canary **36**/36 (src order; bit; player-made then clear; fire+hot REG_NOT_HEROS + template; Deaf/EDeaf/uroleplay silent; no lava / !flag; far not-loud; close loud; sticky; in_mklev; temp0 nmax=0); green+strict seed8000/0900; cohort **14**/14 (0373 fire + 0002 drinksink + 0014 fountain + 0361/0383 fog + 0360/2200/0004/0006/0012/1500/1800/0030/0108) + strict 8000/0900/0373/0002/0014/0361/0383/0360/2200/0030/0004/0006 + 0012. Path **public-unhit** on whoosh. Cadence 0373 fire arrival still matches.

C read of `mkmaze.c:1484–1514`, `region.h:16–22`, `region.c:1187–1190`, `do.c:1833–1834`, `allmain.c:376–377`, `youprop.h:125`, `hack.h` `distu`; JS SHA `fumaroles` + exported macro. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| lava hit, !in_mklev | set_heros_fault then clear | **same** |
| any lava hit, !Deaf | Norep whoosh / loud whoosh | **same** |
| Deaf | silent | **same** |
| no lava in nmax samples | no Norep | **same** |
| goto_level fumaroles flag | call before vision_reset | **same** |
| moveloop once-per-turn | call | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. Arrival fumaroles match `mkmaze.c:1503–1513`.

Named omits / do-nots (map / Open, not Must-fix):

1. `allmain.c` `moveloop_core` fumaroles (`:376–377`).
2. `create_gas_cloud_selection`; geometric `hero_inside` bit.
3. Deaf clone’s extra `u.Deaf` bag (same as fountain.js).
4. Do not restore silent whoosh. Do not skip `clear_heros_fault`. Do not burst on DRAWBRIDGE lava (`typ==LAVAPOOL` only). Do not invent a moveloop peel as Must-fix.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: a lava fumarole now clears `REG_NOT_HEROS` after `make_gas_cloud`’s player-made set and Noreps C’s whoosh / loud whoosh when `!Deaf`.
- Must-fix stays empty for this SHA; next port pops Open `hack.c` walk `in_out_region`. This review fills archive hash `16e8d88b`. Not moveloop.
