# Review 100 — 4071a74d — teleds swallow set_ustuck + docrt (D-1139)

## Metadata
- Full / short hash: `4071a74d59dc9f4bb47c9001183c1236e8155ed7` / `4071a74d`
- Parent: `068e78df` (D-1138). This file audits **this SHA only**. Archive row **Addressed:** D-1139 `4071a74d` was filled by D-1140.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 05:58:59 +0200
- D-id: **D-1139**
- Stats: 9 files, +101 / −24 — `js/teleport.js` +39 / −10 (`teleds` was_swallowed / `set_ustuck` / `docrt`).
- Claims to close: Open queue `teleport.c` `teleds` swallow `docrt` (named). Not hideunder. Review **92** named omit 3; **84** swallow `docrt` on `rloc_to` already D-1123. `reviews/loop-2026-08-15/` has no open teleds-swallow Must-fix.
- JS / map: `teleport.js` `teleds`; `mhitu.js` `set_ustuck` (untouched); `display.js` `docrt` (untouched). `c-js-map/turns.md` teleport. vault_guard `uleftvault`, `invocation_message`, `notice_mon_*` still named.
- Prior reviews this SHA claims to close: **92** named `set_ustuck` / swallow `docrt`; D-1138 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleds so leaving a swallow runs set_ustuck(Null) then docrt at the origin (Punished ball_active, not unstuck), instead of keeping the gulp view.”

Old JS cleared utrap, called `hideunder`, and never snapshotted `u.uswallow`. C `teleport.c:487–504` always `set_ustuck((struct monst *) 0)` (which clears `uswallow` / `uswldtim`), then if `was_swallowed` forces Punished `ball_active` (ball&chain are off map while swallowed) and `docrt()` **at the origin** so the gulp view is replaced by the dungeon map before `drag_ball` / `u_on_newpos`. Calling `unstuck` would be wrong: that `u_on_newpos`s onto the engulfer, `placebc`s early, and may `rnd(2)` `mspec_used`.

The diff **does** snapshot `was_swallowed`, `set_ustuck(null)`, move `ux0/uy0` to after that call (C order), then `docrt` + Punished flags when swallowed. It does **not** call `unstuck`, port vault_guard `uleftvault`, `invocation_message`, or `notice_mon_*`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleds` swallow block | C body, **new** | `teleport.c:487–504` |
| `set_ustuck` | C callee, **imported** | `mhitu.js:670–678`; `mon.c:3421–3435` |
| `docrt` | C callee, **imported** | `display.js:2522–2554`; uswallow already 0 → map |
| `was_swallowed` | C local, **new** | snapshot before clear |
| Punished ball flags | C body, **new** | `u.uball` ≡ C `Punished` |
| `unstuck` | C sibling, **correctly unused** | would `rnd(2)` + `u_on_newpos` to engulfer |
| `hideunder` | C callee, **untouched order** | still after `set_ustuck`, before drag |
| vault_guard / invocation | C later arms, **named omit** | next SHAs / Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Origin `ox/oy` are live `u.ux/u.uy` captured at entry. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in `set_ustuck` or `docrt`’s map arm. Hallu `docrt` may still burn display-rng on the vision_recalc(2) off-newsym path (pre-existing D-0852); swallow teleds is **public-unhit**. `unstuck`’s `rnd(2)` is **not** taken. `hideunder` RNG unchanged.

## Constitution / playbook

Grep of the teleport hunk: no trace-index gates. Contest Rule #2: in-process ESM; dynamic `import('./mhitu.js')` is cycle-breaking. Do not call `unstuck` from `teleds`. Do not `docrt` on grab-without-swallow (C only when `was_swallowed`). Do not pull vault_guard into this SHA. One await boundary still `nhgetch` (`docrt` → `cls` is display).

## C ↔ JS fidelity

### Order around swallow

C `teleport.c:487–504`:

```
reset_utrap(FALSE);
was_swallowed = u.uswallow; /* set_ustuck(Null) clears uswallow */
set_ustuck((struct monst *) 0);
u.ux0 = u.ux;
u.uy0 = u.uy;
if (!hideunder(&gy.youmonst) && gy.youmonst.data->mlet == S_MIMIC)
    gy.youmonst.m_ap_type = M_AP_NOTHING;
if (was_swallowed) {
    if (Punished) {
        ball_active = TRUE;
        ball_still_in_range = allow_drag = FALSE;
    }
    docrt();
}
```

JS `1237–1270`: utrap clear (messages still deferred); `was_swallowed = !!(u.uswallow)`; `set_ustuck(null)`; `u.ux0/uy0 = ox/oy` (**moved** from before hideunder — old JS set them before `set_ustuck`; C sets them after); hideunder + mimic `M_AP_NOTHING`; if swallowed: `if (u.uball)` force `ball_active` / no-drag; `await docrt()`. Match. Grab without swallow: `set_ustuck` still runs (C always), no `docrt`. Match.

`Punished` is `uball != 0`. JS `u.uball` is the same test. C then `ball_active = TRUE` even if the ball was `OBJ_FREE` while swallowed — JS same (`ball_active = true`).

After the swallow block, C `:505–521` only `drag_ball`s when `ball_active && (ball_still_in_range || allow_drag)`. Swallow forced both flags false, so **no** drag at the origin; later `u_on_newpos` then `placebc` if `uchain->where == OBJ_FREE` (`:527–528`). JS `1272–1299` same: swallow path skips the drag `if`, then dest place + `placebc` when chain is `OBJ_FREE`. Match. Grab-without-swallow does not force those flags, so an in-range ball may still drag — C same (`was_swallowed` false).

`reset_utrap(FALSE)` messages stay deferred (pre-existing). `u.ux0` after `set_ustuck` uses the **origin** (still `ox/oy`); swallow `docrt` therefore paints the gulp-exit cell, not the destination. `u_on_newpos` remains after drag (`:1284–1289`).

### `set_ustuck` is not a stub

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `mon.c:3421–3435`:

```
disp.botl = TRUE;
u.ustuck = mtmp;
if (!u.ustuck) {
    u.uswallow = 0;
    u.uswldtim = 0;
}
```

JS `mhitu.js:670–678`: `flags.botl = true`; `u.ustuck = mtmp || null`; if !ustuck clear `uswallow`/`uswldtim`. Sanity `m_next2u` `impossible` skipped (debug). Nulling therefore drops swallow **before** `docrt`. Match.

### `docrt` at origin with uswallow already 0

`display.js:2522–2528`: if `u.uswallow` then `cls` + `swallowed(1)` and return; else vision_recalc(2), `cls`, memory glyphs, vision_recalc(0), `see_monsters`. After `set_ustuck(null)`, the gulp arm is **not** taken — dungeon map at the **origin** (`u.ux` still ox,oy; `u_on_newpos` is later). That is C’s comment: `docrt` after `set_ustuck` so `uswallow` is already 0. Match.

`unstuck` (`mhitu.js:686–705`) would set `u.ux/uy` to the engulfer, `vision_full_recalc`, `docrt`, and maybe `mspec_used = rnd(2)`. `teleds` does not call it. Match the “not unstuck” claim. `gm.mswallower` is cleared only in `unstuck`; C `teleds` also leaves it (the swallower is still on the map at the origin). Named, not a miss of `set_ustuck`.

Hideunder still runs **before** the swallow `docrt`, at the origin, after `set_ustuck` (C `:493–496` then `:498–504`). D-1131 order preserved.

## Hallucinations / overclaim

D-log / CURRENT / subject say leaving a swallow runs `set_ustuck(Null)` then `docrt` at the origin, Punished `ball_active` not `unstuck`, instead of keeping the gulp view. That is the hunk: snapshot, import, ux0 after clear, swallow `docrt`, Punished flags. They name vault_guard, invocation, `notice_mon_*`. Stamping **Addressed:** D-1139 is fair for the Open **swallow** line. Hash `4071a74d` is on the archive row (filled by D-1140). Do **not** stamp it as a close of `unstuck` `mspec_used` or vault `uleftvault`. Do not read “Match C docrt” as “Match C `notice_mon_off`.”

## Density

One C locus (`teleds` swallow) plus the existing `set_ustuck`/`docrt` callees. ~30 JS lines. Not a one-`if` peel and not “finish teleds.” vault_guard left for the next SHA (D-1140).

## Verification

Journal: private canary **21**/21 (swallow clears flags + `docrt` at origin; grab no `docrt`; plain skip; Punished `placebc` dest; hideunder after `set_ustuck`; not `unstuck`); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0004 scroll + 0007 snake + 0009 swim + 0360/0367/0373/4500/2200 + strict 0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path **public-unhit** on swallowed teleds. This audit’s full `sessions` (cadence **#1450**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression, still not a swallow-teleds hit.

C read of `teleport.c:448–504`, `mon.c:3421–3435`, `unstuck` `:3438–3455`; JS `teleport.js:1237–1270`, `mhitu.js:670–705`, `display.js:2522–2554`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| swallowed teleds | clear + `docrt` origin map | **same** |
| grab, not swallow | `set_ustuck` only | **same** (no `docrt`) |
| not stuck | `set_ustuck(Null)` no-op-ish | **same** |
| Punished + swallow | force `ball_active`, no drag | **same** (`u.uball`) |
| `unstuck` `rnd(2)` | not called | **same** |
| hideunder vs `docrt` | hide then `docrt` | **same** |
| vault_guard | after switch_terrain | **named skip** (next SHA) |

## Actionable C-wrongs

None that Must-fix this next iter. Swallow matches `teleport.c:487–504`. `set_ustuck` and `docrt` are real callees. `unstuck` is correctly not used.

Named omits / do-nots (map / Open, not Must-fix):

1. `teleds` vault_guard `uleftvault` — **Addressed:** D-1140 `36fb8797` (next SHA).
2. `invocation_message` / `notice_mon_off` / `notice_mon_on` / `notice_all_mons` (`teleport.c:540, 569–571`). Live Open invocation.
3. `unstuck` `mspec_used` / `gm.mswallower` (not this path).
4. Do not restore the gulp view. Do not call `unstuck` from `teleds`. Do not `docrt` on grab-only. Do not `placebc` before `docrt` on swallow.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `teleds` now snapshots swallow, always `set_ustuck(null)`, and `docrt`s the origin map when leaving a gulp (Punished ball forced on-map later), without taking `unstuck`’s engulfer `u_on_newpos` / `rnd(2)`.
- Must-fix stays empty for this SHA; next port popped Open `teleds` vault_guard `uleftvault`. **Addressed:** D-1140 `36fb8797`. Not invocation.
