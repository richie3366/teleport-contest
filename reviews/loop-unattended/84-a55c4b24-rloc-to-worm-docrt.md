# Review 84 — a55c4b24 — `rloc_to` worm / ustuck-swallow `docrt` (D-1123)

## Metadata
- Full / short hash: `a55c4b240c7bbece645a339a149ea6ccfde350fe` / `a55c4b24`
- Parent: `5a2f96ca` (D-1122). This file audits **this SHA only**. Archive row **Addressed:** D-1123 `a55c4b24` was filled by D-1124.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 01:32:10 +0200
- D-id: **D-1123**
- Stats: 14 files, +183 / −60 — `js/teleport.js` +67 / −22 (`rloc_to` async worm + ustuck); `js/worm.js` +21 / −1 (`remove_worm`); await at apply/dothrow/mon + in-file callers.
- Claims to close: Open queue `teleport.c` `rloc_to` worm / ustuck-swallow `docrt` (named). Not newsym. Review **81** / D-1122 next-port. `reviews/loop-2026-08-15/` has no open worm-rloc Must-fix.
- JS / map: `teleport.js` `rloc_to`; `worm.js` `remove_worm` / existing `place_worm_tail_randomly`. `c-js-map/turns.md` teleport + worm. shk-home, `maybe_unhide_at`, `set_apparxy`, `update_monster_region`, shop bill still named.
- Prior reviews this SHA claims to close: none as Must-fix. Named Open after D-1122.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core so long-worm relocation removes and re-places the tail and a swallowed hero follows via docrt.”

Old JS `rloc_to` always zeroed `mx`/`my` and `newsym(old)` (fmon occupancy), then placed the head. C `teleport.c:1675–1697`: if `wormno`, `remove_worm` (every wseg off the grid + `newsym`); after `place_monster`, `place_worm_tail_randomly`; if `u.ustuck == mtmp`, swallow → `u_on_newpos` / `check_special_room(FALSE)` / `docrt`, else `!m_next2u` → `unstuck`.

The diff **does** export `remove_worm`, call `place_worm_tail_randomly`, and the ustuck split (`docrt` vs `unstuck`). `rloc_to` becomes async so those callees can await. It does **not** port shk `make_angry_shk`, `maybe_unhide_at`, `set_apparxy`, `update_monster_region`, or minvent shop bill. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_to` | C function, **rewritten** | `teleport.c:1771–1774` → `rloc_to_core` RLOC_NOMSG envelope |
| `remove_worm` | C function, **new** | `worm.c:714–726`; export |
| `place_worm_tail_randomly` | C callee, **imported** | pre-existing `worm.js:160–206` |
| `rnd_nextto_goodpos_mon` | C clone, **pre-existing** | `trap.c` `rnd_nextto_goodpos` minus hero/crawl; worms are never `&youmonst` |
| `check_special_room` | C callee, **imported** | `hack.js`; real |
| `docrt` | C callee, **imported** | `display.js`; swallow redraw |
| `unstuck` | C callee, **imported** | `mhitu.js` ≡ `mon.c:3438–3466`; Punished `placebc` named on that function |
| `distu_xy > 2` | C macro, **clone** | `you.h:560` `!m_next2u` ≡ `distu > 2` squared |
| `rloc_to_flag` / `mvault_tele` / `mtele_trap` / `u_teleport_mon` | C callers, **awaited** | in-file |
| apply grapple / dothrow hurtle / shapeshift | C callers, **awaited** | this SHA |
| `dog.js` `losedogs` `rloc_to` | C caller, **not awaited** | sync until first `await`; pets are not the swallower |
| `update_monster_region` / `set_apparxy` / `maybe_unhide_at` | C arms, **named omit** | after place |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on the worm path:** `place_worm_tail_randomly` → `rnd_nextto_goodpos_mon` Fisher–Yates `rn2(N_DIRS)` per remaining seg (C `worm.c:774–778` / `trap.c` shuffle). Dummy one-seg worm returns without extra `rn2`. Grab `unstuck` may `rnd(2)` `mspec_used` (C `mon.c:3462–3465`). Public-unhit on live worm rloc / swallow-teleport.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Worm `wx`/`wy` are live wseg cells. Contest Rule #2: dynamic `import('./mhitu.js')` is ESM, not `fs`. Making `rloc_to` async is a JS necessity for `check_special_room` / `docrt` / `unstuck`, not a new input boundary. Do not hardcode a worm head cell.

## C ↔ JS fidelity

### Pickup: worm vs ordinary

C `teleport.c:1661–1680`:

```
if (oldx) {
    if (domsg && canspotmon) { ... } /* RLOC_MSG; lives in rloc_to_flag */
    if (mtmp->wormno)
        remove_worm(mtmp);
    else {
        remove_monster(oldx, oldy);
        newsym(oldx, oldy);
    }
}
```

JS `656–667`: zero `mx`/`my` first (JS occupancy is fmon scan; C occupancy is the grid), then `remove_worm` or `newsym(old)`. Ordinary path is the pre-existing fmon stand-in for `remove_monster`. Worm path is new.

C `worm.c:714–726` `remove_worm`: walk `wtails[wormno]`; if `curr->wx`: `remove_monster`, `newsym`, `wx=0` (not `wy`). JS `105–117`: `remove_monster_xy` + `newsym` + `wx=0`. Match. Does not free the wseg chain or unlink `fmon`. Match.

JS zeros `mtmp.mx/my` **before** `remove_worm` because `m_at` is an `fmon` scan; C occupancy is `level.monsters[][]` and `remove_worm` clears that grid while `mx` is still the old cell. After pickup, JS `place_worm_tail_randomly` writes tail cells into `game._level_monsters` via `place_worm_seg`; the head is found by `mx/my`. That is the same occupancy split worm create already used. C `place_monster` then `place_worm_tail_randomly` (`teleport.c:1683–1688`) — JS sets coords then the same tail function. Head cell is not double-`place_worm_seg`’d on the dummy one-seg path (C `:749–761`).

### Place + tail

C: `mon_track_clear`; `place_monster`; `update_monster_region`; if `wormno` `place_worm_tail_randomly`. JS: clear `mtrack`; set `mx`/`my`/`mux`/`muy`; `place_worm_tail_randomly`. `update_monster_region` named. `mux`/`muy` = hero was already this function’s place stand-in; `set_apparxy` still named.

`place_worm_tail_randomly` is the existing reverse-seg walk: dummy co-located seg; else `rnd_nextto_goodpos` + `place_worm_seg` or `toss_wsegs`. This SHA **calls** it; it is not a new stub. Tail RNG is C’s.

### Ustuck: swallow vs grab

C `teleport.c:1690–1697`:

```
if (u.ustuck == mtmp) {
    if (u.uswallow) {
        u_on_newpos(mtmp->mx, mtmp->my);
        check_special_room(FALSE);
        docrt();
    } else if (!m_next2u(mtmp)) {
        unstuck(mtmp);
    }
}
```

JS `684–702`: swallow → `u.ux`/`u.uy`, `uundetected=0`, steed (C `u_on_newpos` `dungeon.c:1577–1585`; `see_nearby_objects` skipped while swallowed — C `:1597–1598`; `earth_sense` named); `await check_special_room(false)`; `await docrt()`. Else `distu_xy(mx,my) > 2` → `unstuck`.

`you.h:558–560`: `m_next2u(m)` ≡ `distu(mx,my) <= 2` (squared). JS `distu_xy` is `dx*dx+dy*dy`. `> 2` ≡ `!m_next2u`. Adjacent including diagonal (`distu==1` or `2`) stays grabbed. Match. Not a diverging clone.

`unstuck` (`mon.c:3438–3466`): `set_ustuck(0)`; swallow arm `placebc` if Punished (named on `mhitu.js`); `mspec_used = rnd(2)` for STCK/ENGL/HUGS. Grab path is not swallowed, so the named `placebc` does not fire here. `dmgtype(..., 19)` ≡ `AD_STCK`; `aatyp === AT_ENGL` / `7` ≡ `AT_HUGS`. Real callee, not a no-op.

`docrt` / `check_special_room` are the imported functions, not comments pretending to match C.

### Async callers

`rloc_to_flag`, `mvault_tele` success, `mtele_trap` teledest, `u_teleport_mon`, grapple, hurtle, shapeshift: `await rloc_to`. `mvault_tele` / `mtele_trap` fallback `rloc(mtmp, 0)` was already fire-and-forget before this SHA (`rloc` was already async). `dog.js` `mon_arrive_with_you` still calls `rloc_to` without await. Until the first `await` (only the ustuck branch), an async `rloc_to` still runs placement + worm RNG **synchronously**. Pets arriving with the hero are not `u.ustuck`. Latent hygiene, not a C contradiction on the claimed worm/swallow envelope. Name it; do not Must-fix.

### Callers of `rloc_to`

C `rloc_to` is the RLOC_NOMSG place: `rloc_to_core(..., RLOC_NOMSG)`. Message-bearing moves use `rloc_to_flag` / `rloc`. JS: `rloc_to_flag` awaits `rloc_to` then post-msg; `rloc` → `rloc_to_with_msg` → that. This SHA awaited apply grapple, dothrow hurtle, shapeshift `enexto`+`rloc_to`, `mvault_tele` success, `mtele_trap` teledest, `u_teleport_mon`. Guard: C `if (x == mx && y == my && m_at == mtmp) return` first; JS same. Worm arm is `if (mtmp->wormno)` after `if (oldx)` — JS same. Ustuck is after place, not before — JS same.

## Hallucinations / overclaim

D-log / subject say long-worm relocation removes and re-places the tail and a swallowed hero follows via `docrt`. That is the hunk: `remove_worm` + `place_worm_tail_randomly` + swallow `docrt` / grab `unstuck`. They name shk-home / `maybe_unhide_at` / `set_apparxy`. Stamping **Addressed:** D-1123 is fair. Hash `a55c4b24` is on the archive row (filled by D-1124). This is **not** “Match C dispatch, callee is a stub”: `remove_worm`, `place_worm_tail_randomly`, `check_special_room`, `docrt`, and `unstuck` are real.

## Density

One C function (`rloc_to_core` pickup/place/ustuck) plus `remove_worm`. Await conversions are the same cluster. ~90 JS lines. shk bill left named. Right size.

## Verification

Journal: private canary **27**/27 (null/same-cell; ordinary track; `remove_worm` grid vs chain; tailed rloc vacate+re-place; dummy no extra `rn2`; swallow hero/steed/`docrt`; adjacent grab stays; far grab `unstuck`); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0360/4500/0373/0367; path **public-unhit** on live worm rloc / swallow-teleport. Cadence fortress is not a worm-tail proof. This audit’s full `sessions` (cadence **#1430**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `teleport.c:1645–1697`, `worm.c:714–778`, `dungeon.c:1568–1601`, `mon.c:3438–3466`, `you.h:558–560`; JS `teleport.js:640–707`, `worm.js:105–206`, `mhitu.js:686–705`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| ordinary mon | `remove_monster` + `newsym` | **fmon zero + `newsym`** (pre-existing) |
| tailed worm | `remove_worm` + random tail | **same** |
| dummy one-seg | co-locate wx/wy; no shuffle | **same** |
| swallow `ustuck` | hero follows + `docrt` | **same** (subset `u_on_newpos`) |
| grab adjacent | stay stuck | **same** (`distu<=2`) |
| grab far | `unstuck` | **same** |
| shk leaves shop | `make_angry_shk` | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. Pickup/place/ustuck match `teleport.c:1675–1697` minus named region/apparxy/unhide.

Named omits / do-nots (map / Open, not Must-fix):

1. `update_monster_region` / `maybe_unhide_at` / `set_apparxy` (`teleport.c:1685`, `:1700–1702`).
2. resident shk `make_angry_shk` + minvent shop bill (`:1739–1758`).
3. `unstuck` Punished `placebc` on swallow release (`mon.c:3452–3453`) — not this `rloc_to` swallow-follow path.
4. `await rloc_to` in `dog.js` `losedogs` / leftover `rloc(...)` without await in `mvault_tele` fallback.
5. Do not restore always-`newsym(old)` for `wormno`. Do not use Chebyshev `distmin` for `m_next2u`. Do not pull drinksink gas into this SHA — **Addressed:** D-1124 `3b7606b3`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc_to` now takes a long worm off the grid with `remove_worm` and re-places the tail, and a swallowed hero follows with `check_special_room`/`docrt` (far grab `unstuck`), instead of only moving the head glyph, while shk-home and `set_apparxy` stay named.
- Must-fix stays empty for this SHA; next port popped Open drinksink case 13 `create_gas_cloud`. **Addressed:** D-1124 `3b7606b3`. Not polyself.
