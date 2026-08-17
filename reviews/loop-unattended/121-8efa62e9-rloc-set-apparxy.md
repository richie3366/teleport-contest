# Review 121 — 8efa62e9 — teleport.c `rloc_to` `set_apparxy` dest (D-1160)

## Metadata
- Full / short hash: `8efa62e96e4b6bec1ff9d6761cb8ce63f7183ac5` / `8efa62e9`
- Parent: `e42ace32` (D-1159). This file audits **this SHA only**. The fix stamped **Addressed:** D-1160 without the short hash; this review commit fills `8efa62e9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 14:25:05 +0200
- D-id: **D-1160**
- Stats: 11 files, +109 / −44 — `js/teleport.js` +14 / −6 (`rloc_to`); `js/monmove.js` +1 comment.
- Claims to close: Open queue `teleport.c` `rloc_to` `set_apparxy` (named). Not vanish-msg. Review **113** named omit 2 (`set_apparxy` after dest `newsym`). `reviews/loop-2026-08-15/` has no open `set_apparxy` Must-fix.
- JS / map: `teleport.js` `rloc_to`; `monmove.js` `set_apparxy` (export already D-0267). `c-js-map/turns.md` `teleport.c`. vanish-msg, `update_monster_region`, shk-home, shop bill, trapped `mintrap` still named.
- Prior reviews this SHA claims to close: **113** named `set_apparxy` after `maybe_unhide_at`; D-1159 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core so a relocated monster runs set_apparxy after dest newsym, instead of writing mux=hero at place and skipping Invis/Displacement re-orient.”

Old JS `rloc_to` wrote `mux`/`muy` = hero at place (stand-in so `u_at(mux,muy)` always early-exited) and never called `set_apparxy`. C `place_monster` (`steed.c:929–931`) sets `mx`/`my` + occupancy only; `rloc_to_core` orients **after** dest `newsym` (`teleport.c:1700–1702`). Stale or zero mux then hits Invis `rn2(3)` / Displacement `rn2(4)` / the `rn2(2*displ+1)` loop.

The diff **does** drop the mux=hero write and, after `maybe_unhide_at` + dest `newsym`, dynamic-import `set_apparxy` (same `monmove.js` cycle as D-1152). It does **not** port vanish-msg (`:1703–1714`), `update_monster_region` (`:1685`, **between** place and worm tail), shk-home, shop bill, or trapped `mintrap`. Named. Next Open is `update_monster_region`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_to` drop mux=hero | C `place_monster`, **fix** | `steed.c:929`; mx/my only |
| `rloc_to` `set_apparxy(mtmp)` | C caller, **new call** | `teleport.c:1702` |
| `set_apparxy` | C callee, **imported** | `monmove.c:2198–2266`; not a stub |
| `maybe_unhide_at` / `newsym` | C callees, **pre-existing** | D-1152 / D-0149 |
| `place_worm_tail_randomly` | C callee, **pre-existing** | D-1123 |
| `update_monster_region` | C callee, **named omit** | `region.c:598–611`; next Open |
| vanish / appear plines | C body, **named omit** | async `rloc` still has RLOC_MSG (D-0885) |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

**New RNG on this path:** `set_apparxy` `!rn2(3)` (notseen) or `!rn2(4)` (Displacement) then possibly two `rn2(2*displ+1)` per try. Pets / ustuck / `u_at(mux,muy)` still early-exit with **no** RNG (`monmove.c:2211–2215`). Path **public-unhit** on Invis/Displaced rloc with stale mux (public rlocs are mostly pets / already-know).

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. Dest `(x,y)` is the `rloc_to` argument, not a traced cell.

## Constitution / playbook

Grep of this SHA’s `js/` hunks: no trace-index gates. Do not restore mux=hero at place (that **is** the C-wrong this peel removes). Do not call `set_apparxy` before dest `newsym`. Do not invent vanish-msg in `rloc_to` (C `RLOC_NOMSG` path is this function; messages live on `rloc`). Do not pull `update_monster_region` into this peel.

## C ↔ JS fidelity

### Order vs `teleport.c:1683–1702`

C:

```
mon_track_clear(mtmp);
place_monster(mtmp, x, y);
update_monster_region(mtmp);
if (mtmp->wormno)
    place_worm_tail_randomly(mtmp, x, y);
/* ustuck swallow / unstuck */
maybe_unhide_at(x, y);
newsym(x, y);
set_apparxy(mtmp);
```

JS `teleport.js:675–716`: track clear; `mx`/`my` only (no mux write); worm tail; ustuck; `maybe_unhide_at`; `newsym`; `set_apparxy`. `update_monster_region` still missing **between** place and worm tail. Named. The new call is after dest `newsym`, not after place. Match the Open **set_apparxy** line.

Same-cell: C `:1658–1659` early return. JS `:660`. No `set_apparxy`. Match.

`place_monster` occupancy: C `level.monsters[x][y] = mon`. JS `m_at` scans `fmon` by `mx`/`my` (pre-existing). Dropping mux does not change occupancy.

### Callee is not a stub

`set_apparxy` (`monmove.js:645–716` / `monmove.c:2198–2266`):

1. pet / ustuck / `u_at(mux,muy)` → mux=hero, return (no RNG).
2. `notseen = !mcansee \|\| (Invis && !perceives)`.
3. `notthere = Displaced && not displacer beast`.
4. Underwater → `displ=1`; else notseen → xorn+gold `0` else `1`; else notthere → `couldsee(mux,muy) ? 2 : 1`; else `0`.
5. `!displ` → mux=hero, return.
6. `gotu = notseen ? !rn2(3) : notthere ? !rn2(4) : FALSE`.
7. `!gotu`: loop `rn2(2*displ+1)` twice until `isok` / not own cell (unless displ==2) / accessible-or-ooze-fog door / `couldsee`; 200-try punt to hero.
8. `gotu`: mux=hero.

`m_move` already calls this (D-0267). Wiring `rloc_to` is the missing **caller**, not a new body.

JS Invis is `!!(u.Invis)` vs C `((HInvis \|\| EInvis) && !BInvis)`. Displacement uses `Displaced()` H/uprops/cloak (pre-existing clone; C is `H\|\|E`). Underwater is `!!(u.Underwater)` vs C `u.uinwater`. Those clones predate this SHA and already run every `m_move`. Public suite matching means the bags are kept in line on scored paths. Not a new rloc C-wrong; do not Must-fix the youprop clones here. `money_cnt(invent)` for xorn matches C `money_cnt(gi.invent)`.

Dynamic `import('./monmove.js')`: same cycle as D-1152 `maybe_unhide_at`. After first load, `await` is a microtask; order of `maybe_unhide` / `newsym` / `set_apparxy` stays C.

### What mux=hero was hiding

If mux already equals hero, C `u_at(mx,my)` early-exits — JS after the drop does the same. If mux is 0 or a previous cell, C re-orients (possible `rn2`). Old JS forced the early exit. That stand-in was the C-wrong. Removing it is the peel.

Pets still skip RNG. ustuck still skips. Already-know (`u_at` old mux) still skips. Match.

### `update_monster_region` is the next Open, not a miss of this wire

C `:1685` runs membership **before** worm tail so a teleported head is in `reg->monsters` at the dest before `place_worm_tail_randomly`. JS still relies on later `m_in_out_region` / create-time `m_at` scan. A monster `rloc_to`’d into a live poisoncloud can miss `run_regions` inside_f until something else adds `m_id`. That is the Open **next** row (`region.c:598–611`), not a stub of `set_apparxy`. Do not Must-fix it onto this SHA.

## Hallucinations / overclaim

D-log / CURRENT / subject say a relocated monster runs `set_apparxy` after dest `newsym` instead of writing mux=hero at place. **That is the hunk:** delete two assignments + one imported call. Stamping **Addressed:** D-1160 is fair for the Open **set_apparxy** line. Fill hash `8efa62e9` in this commit. Do **not** stamp it as “Match C vanish-msg” or “Match C `update_monster_region`.” This is **not** “Match C dispatch, callee is a stub”: `set_apparxy` is the real `m_move` helper with the `rn2(3)` / `rn2(4)` / loop body.

## Density

One C call site + deleting the stand-in that made the callee a no-op. ~10 JS lines. Thin vs §2b, but the queue item is exactly that wire (not vanish-msg, not region membership). Not a second hypothesis. Not QUALITY-RISK for thinness under “do not combine items.”

## Verification

Journal: private canary **33**/33 (null; same-cell skip; already-know; mux0 displ0; pet; ustuck; Invis skip vs `rn2(3)`; `!mcansee`; Displacement skip vs `rn2(4)`; displacer beast; xorn+gold; oldx0; Underwater; other mon; onto-hero); green+strict seed8000/0900; cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002. Path **public-unhit** on Invis/Displaced rloc with stale mux.

C read of `teleport.c:1645–1702`, `steed.c:898–932`, `monmove.c:2198–2266`; JS SHA `rloc_to` + existing `set_apparxy`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1475**) **44**/44 — public rlocs stay pet/already-know (no extra `rn2(3)`/`rn2(4)`).

| Case | C | JS after |
|------|---|---------|
| place | mx/my only | **same** |
| after dest newsym | `set_apparxy` | **same** |
| pet / ustuck / already-know | no RNG | **same** |
| Invis stale mux | `!rn2(3)` then maybe loop | **same** |
| Displacement stale mux | `!rn2(4)` then maybe loop | **same** |
| same-cell | no call | **same** |
| `update_monster_region` | after place, before tail | **named skip** |
| vanish-msg | after `set_apparxy` if `domsg` | **named skip** (`rloc` async) |

## Actionable C-wrongs

None that Must-fix this next iter. The Open dest call matches `teleport.c:1702` / `steed.c:929`. `set_apparxy` is the real C function.

Named omits / do-nots (map / Open, not Must-fix):

1. `update_monster_region` after place (`teleport.c:1685` / `region.c:598–611`). Open **next**.
2. vanish / appear plines (`:1703–1714`); shk-home; minvent shop bill; trapped `mintrap`.
3. `set_apparxy` youprop clones (`u.Invis` bag vs `H\|\|E && !B`; `u.Underwater` vs `uinwater`) — pre-existing on `m_move`.
4. Do not restore mux=hero. Do not skip `rn2(3)`/`rn2(4)` when mux is stale. Do not call `set_apparxy` before dest `newsym`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc_to` now leaves mux alone at place and runs the real `set_apparxy` after dest `newsym`, so Invis/Displacement can re-orient instead of a mux=hero stand-in.
- Must-fix stays empty for this SHA; next port pops Open `rloc_to` `update_monster_region`. This review fills archive hash `8efa62e9`. Not vanish-msg.
