# Review 136 — 7188da5b — allmain.c youmonst `m_everyturn_effect` (D-1175)

## Metadata
- Full / short hash: `7188da5bdd5c54bb6fb431b2900a482bae81501a` / `7188da5b`
- Parent: `e5ec6685` (D-1174). This file audits **this SHA only**. Archive row **Addressed:** D-1175 `7188da5b` was filled by D-1176.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 20:11:17 +0200
- D-id: **D-1175**
- Stats: 15 files, +138 / −49 — `js/allmain.js` +6 (youmonst await); `js/monmove.js` +19 / −8 (helper `is_u` + await create); `js/mon.js` +1 (await monster caller); comments in `cmd.js` / `region.js`.
- Claims to close: Open queue `allmain.c` `m_everyturn_effect` youmonst (named). Not m_postmove_effect. Review **128** named fog at **current** `u.ux` as a different C family from the Hezrou/Steam `ux0` trail. Review **129** named the youmonst everyturn caller. `reviews/loop-2026-08-15/` has no open everyturn Must-fix.
- JS / map: `allmain.js` `moveloop_core`; `monmove.js` `m_everyturn_effect`; callee `region.js` `create_gas_cloud` (D-1137). `c-js-map/turns.md` / `debt.md`. udemigod `intervene` / `amulet()` / `glibr` / `do_storms` / `mkot_trap_warn` still named.
- Prior reviews this SHA claims to close: **128** / **129** / **130** named omit; D-1174 next-port.

## Intent vs deliverable

Git subject promises: “Match C allmain.c m_everyturn_effect so a polyed Fog Cloud leaves size-1 vapor at u.ux each input, instead of skipping the youmonst caller.”

Old JS `moveloop_core` after bot/flush set `context.move=1` with no C `m_everyturn_effect(&youmonst)`, and the helper always used `mtmp.mx/my` with `mnum` first. A polyed Fog Cloud therefore left no size-1 vapor at **current** `u.ux`. Monster `movemon_singlemon` already called the helper (D-0623). Walk Hezrou/Steam trail is D-1167 (`u.ux0`, not this function).

The diff **does** await the helper after flush and before `context.move = 1`, and rewrites the helper: `mtmp === youmonst` → `(u.ux,u.uy)` else `(mx,my)`; `data.mndx` then `mnum`; await `create_gas_cloud(x,y,1,0)` when Fog and `!closed_door && !visible_region_at`. Human form is a no-op (no RNG). `movemon_singlemon` now awaits the same helper (JS More boundary). It does **not** pull udemigod `intervene`, `amulet()`, `Glib` `glibr`, `do_storms`, `mkot_trap_warn`, or `mhurtle_step`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `moveloop_core` youmonst call | C caller, **new** | `allmain.c:481` |
| `m_everyturn_effect` | C callee, **rewritten** | `monmove.c:650–663` |
| `create_gas_cloud(x,y,1,0)` | C callee, **imported** | D-1137; size-1 no expand RNG, ttl `rn1(3,4)` |
| `closed_door` | C callee, **local** | `monmove.js:594–598`; `IS_DOOR` + CLOSED\|LOCKED |
| `visible_region_at` | C callee, **imported** | `region.js`; skip if a cloud already covers the cell |
| `movemon_singlemon` await | C caller, **pre-existing + await** | `mon.c` before movement gate; even if idle |
| `m_postmove_effect` | C sibling, **untouched** | Hezrou/Steam at `ux0`; D-1167 |
| udemigod / `amulet()` / `glibr` / storms | C neighbors, **named omit** | between wipe and this slot / later EOT |
| occupation `umoved` order | C vs JS, **named omit** | JS still sets `umoved=false` before occupation |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Fog cell is live `u.ux/u.uy`, not a traced square. Rule #2 clean. `allmain.js` still has the delete-only `fastforward_pre_mklev` hook; this SHA does not add burns.

**New RNG on this path:** Fog + `!closed_door && !visible_region_at` → ttl `rn1`. Size-1 skips the cardinal `rn2` expand. Human form returns before that. Path **public-unhit** on polyed Fog. Cadence fortress is not a Fog-vapor proof.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not plant Fog at `u.ux0` (that is the Hezrou trail). Do not use youmonst `mx/my` for the hero. Do not skip `visible_region_at` (C avoids stacking vapor on an existing cloud). Do not pull `mhurtle_step` into this peel.

## C ↔ JS fidelity

### Slot vs `allmain.c:473–483`

C, once per player input, after `bot()`/`timebot()` + `curs_on_u()`, **before** `svc.context.move = 1` / occupation / rhack:

```
m_everyturn_effect(&gy.youmonst);
svc.context.move = 1;
```

JS (`allmain.js:958–971`): `await bot(); await flush_screen(1); await m_everyturn_effect(game.youmonst);` then `umoved=false` then `context.move=1` then occupation/rhack. JS always bots (pre-existing) and flushes for capture (pre-existing). The **new** await sits after that display block and before `context.move`, which is C `:481`. `flush_screen(1)` is not in C at this line; Fog pline (enveloped, D-1137) still happens before rhack `nhgetch`, same as C pline-then-getch. Human form does not pline. Match the claimed slot.

C comment (`monmove.c:647–648`): every living on-map monster **and the hero**. Monster caller is `movemon_singlemon` before the `movement < NORMAL_SPEED` gate — fog even if idle. JS already had that call; this SHA only `await`s it so `create_gas_cloud` More is the JS boundary. Not a second youmonst plant at `mx/my`.

### Helper vs `monmove.c:650–663`

C:

```
boolean is_u = (mtmp == &gy.youmonst);
coordxy x = is_u ? u.ux : mtmp->mx, y = is_u ? u.uy : mtmp->my;
if (mtmp->data == &mons[PM_FOG_CLOUD]) {
    if (!closed_door(x, y) && !visible_region_at(x, y))
        create_gas_cloud(x, y, 1, 0); /* harmless vapor */
}
```

JS (`monmove.js:1081–1092`): `is_u = mtmp === game.youmonst`; coords from `u.ux/uy` vs `mx/my`; `mnum = data?.mndx ?? mnum`; Fog only; same door/region gate; `await create_gas_cloud(x,y,1,0)`. Pointer identity with `game.youmonst` is the live `&gy.youmonst` (`set_uasmon` keeps `youmonst.data` at `mons(umonnum)` **with** `mndx`). Preferring `data.mndx` over `mnum` matches C’s `mtmp->data`, not a stale role `mnum`. Match.

Not Hezrou, not Steam, not `mcan`. Those stay `m_postmove_effect` (D-1167) at **origin** `ux0` / old `mx`. Fog everyturn is **current** cell so a standing polyed Fog still vapors; a walking Hezrou trails behind. Two functions. This SHA must not be stamped as a second trail.

`closed_door`: `IS_DOOR` && (CLOSED|LOCKED). C same. Fog flowing under a closed door skips vapor so vision messages do not mix (C comment `:657–659`). `visible_region_at`: first visible region covering the cell. After the first size-1 cloud, later inputs skip until `run_regions` expires it — C same, not a ttl-every-turn leak.

`create_gas_cloud` size-1: no expand `rn2`, only ttl. Damage 0 is `S_cloud` (mfndpos does not avoid it; poisoncloud is damage>0). Hero standing in the new 1×1: `make_gas_cloud` sets `REG_HERO_INSIDE`; D-1137 enveloped You once. C plants at `u.ux` on purpose (unlike postmove’s anti-spam `ux0`). Match.

`set_heros_fault` when `!in_mklev && !mon_moving`: hero Fog is the player’s cloud; monster Fog during `movemon` is not. Pre-existing in `create_gas_cloud`. This SHA does not add a fumaroles-style clear.

| Case | C | JS after |
|------|---|---------|
| human once-per-input | no cloud, no RNG | **same** |
| Fog poly, open cell, no cloud | size-1 dmg 0 at `u.ux` | **same** |
| Fog poly, already in vapor | skip (`visible_region_at`) | **same** |
| Fog poly, closed door | skip | **same** |
| Hezrou/Steam | not this fn | **same** |
| monster Fog idle | vapor at `mx/my` before move gate | **same** (now awaited) |
| walk trail | `m_postmove` `ux0` | **same** (D-1167) |

Monster Fog during `movemon` (`context.mon_moving`) does not set `heros_fault`. Hero Fog once-per-input does. Size-1 at `u.ux` with the hero standing there: `create_gas_cloud`’s `u_at && cloudsize===1 && !damage` arm treats the hero as already inside for envelop suppression (`region.js:753–757` / C `create_gas_cloud` same). Harmless vapor still exists as a region; `run_regions` `inside_f` uses the bit (D-1169). Do not “fix” envelop by planting at `ux0` — that would be the wrong C function.

JS `umoved=false` between everyturn and `context.move` is extra vs C’s immediate `context.move=1`. D-log names occupation `umoved` order. A Fog pline still happens before rhack. Not a Must-fix of the claimed slot.

## Hallucinations / overclaim

D-log / CURRENT / subject say a polyed Fog Cloud leaves size-1 vapor at `u.ux` each input instead of skipping the youmonst caller. **That is the hunk:** one await at C `:481` plus the helper’s `is_u` split. Stamping **Addressed:** D-1175 is fair for the Open **youmonst everyturn** line. Hash `7188da5b` is on the archive row (filled by D-1176). Do **not** stamp it as “Match C `m_postmove_effect`” or “Match C `intervene`/`amulet()`” or “Fog now trails at `ux0`.” This is **not** “Match C dispatch, callee is a stub”: `create_gas_cloud` is D-1137; the helper body is C `:656–662`, not a no-op.

`data.mndx` vs `&mons[PM_FOG_CLOUD]` is the established JS clone. Not a hallucination of “Match C pointer compare.”

## Density

One C call plus the helper’s `is_u` coord split the youmonst caller requires (without it, Fog would plant at unset youmonst `mx` or at `ux0`). ~20 JS lines. Right-size §2b. Awaiting the pre-existing monster caller is the same helper, not a second hypothesis. Did not pull EOT fumaroles neighbors. Not QUALITY-RISK.

## Verification

Journal: private canary **27**/27 (C/JS after bot before `context.move`; helper `is_u` ux not ux0; import; await create; data.mndx first; null; human no cloud/RNG; Hezrou/Steam not this function; fog ux not ux0/not mx; size-1 dmg 0; ttl `rn1`; heros_fault; hero_inside; no envelop on skip; thenable; door skip; visible_region skip; monster mx/my; stale mnum; `mon_moving`; region elsewhere; no fs/FORCE); green+strict seed8000/0900; cohort **43**/43 (CURRENT shared + 0014/0383/4500/2600 + green) + strict 0101/0012/0360/4500/2200/0014/0004/0103/0104/0367/0373/0002/0700/0015/0116/0106. Path **public-unhit** on polyed Fog.

C read of `allmain.c:473–483`, `monmove.c:647–683`, `mon.c` `movemon_singlemon` everyturn-before-gate; JS SHA `moveloop_core` + helper + `mon.js` await. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1495**) **44**/44 — human-form no-op did not inject ttl RNG.

## Actionable C-wrongs

None that Must-fix this next iter. The Open youmonst call matches `allmain.c:481`. Coords match `:653–654`. Callee is real.

Named omits / do-nots (map / Open, not Must-fix):

1. udemigod `intervene` (`allmain.c:362–368`).
2. `amulet()` / `Glib` `glibr` / `do_storms` / `mkot_trap_warn`.
3. occupation `umoved` order vs C (JS still clears `umoved` before occupation).
4. `any_visible_region` see_monsters (named on the bot block).
5. Do not plant Fog at `ux0`. Do not restore `mnum`-first. Do not skip `visible_region_at`. Do not pull `mhurtle_step` into this SHA — **Addressed:** D-1176 `b652fbf3`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: once-per-input `m_everyturn_effect(youmonst)` now plants Fog vapor at current `u.ux` when the cell is not a closed door and not already in a visible region, matching C `:481` / `:656–662`, while Hezrou/Steam stay the `ux0` trail.
- Must-fix stays empty for this SHA; next port in this window popped Open `mhurtle_step`. **Addressed:** D-1175 `7188da5b`. Not postmove, not `intervene`.
