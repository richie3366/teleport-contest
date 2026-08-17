# Review 132 — 822498d3 — teleport.c `rloc_pos_ok` shk/priest room lock (D-1171)

## Metadata
- Full / short hash: `822498d3c76f8f2e592eadba62816bf709c93cad` / `822498d3`
- Parent: `5a6be1fe` (D-1170). This file audits **this SHA only**. Archive row **Addressed:** D-1171 `822498d3` was filled by D-1172.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 19:00:25 +0200
- D-id: **D-1171**
- Stats: 10 files, +115 / −37 — `js/teleport.js` +25 / −7 (`rloc_pos_ok` on-map arm; `rloc` comment).
- Claims to close: Open queue `teleport.c` `rloc_pos_ok` isshk/ispriest room lock (named). Not make_angry_shk. Review **123** named dest filter as distinct from angry. `reviews/loop-2026-08-15/` has no open rloc_pos_ok Must-fix.
- JS / map: `teleport.js` `rloc_pos_ok`; local `inhishop` / `inhistemple` clones (pre-existing; D-1162). `c-js-map/turns.md` `teleport.c`. Migrating `mx==0` updest/dndest still named.
- Prior reviews this SHA claims to close: D-1170 next-port; D-0686 / map named omit of the room lock.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_pos_ok so a shopkeeper or temple priest already in their room is not offered a teleport dest outside it, instead of treating every goodpos cell as viable.”

Old JS after `goodpos(GP_CHECKSCARY)` jumped to `tele_jump_ok` for on-map monsters. C `:1620–1626` rejects a dest whose `levl.roomno` is not `ESHK.shoproom` / `EPRI.shroom` (unsigned char) when the monster is already in-shop / in-temple. Skipping it offered corridor cells C would not count as `rloc_pos_ok` (caller may still goodpos-fallback).

The diff **does** that dest `roomno` lock in the `xx` (on-map) arm, after `goodpos`, before `tele_jump_ok`, `isshk && inhishop` else-if `ispriest && inhistemple`. It does **not** use `in_rooms` for the dest (C uses `levl[x][y].roomno`). It does **not** port migrating `mx==0` updest/dndest bit flags. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_pos_ok` room lock | C body, **new** | `teleport.c:1620–1626` |
| `goodpos(GP_CHECKSCARY)` | C callee, **pre-existing** | first; unchanged |
| `inhishop` | C callee, **local clone** | `shk.c:1039–1048`; D-1162; cycle vs `shk.js` |
| `inhistemple` / `histemple_at` / `has_shrine` | C callees, **local clones** | `priest.c:161–171` |
| dest `levl.roomno` | C field, **new read** | `game.level.at(x,y).roomno & 0xff` |
| `ESHK.shoproom` / `EPRI.shroom` | C fields | `& 0xff` ≡ `(unsigned char)` |
| `tele_jump_ok` | C callee, **pre-existing** | after the lock |
| `in_rooms` dest | **not used** | C dest is `roomno`, not `in_rooms` |
| mx==0 updest/dndest | C arms, **named omit** | `:1592–1615` |
| `make_angry_shk` | C caller, **not this** | D-1162 dest `!inhishop` after place |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dest `(x,y)` is the candidate from `rnd`/`rn2` or candy, not a traced square. Rule #2 clean.

**New RNG on this path:** none in the predicate. Callers still 50× `rnd(COLNO-1)` / `rn2(ROWNO)` then candy `rn2` (D-1122). More `rloc_pos_ok` failures → more tries / earlier candy — that is C. Path **public-unhit** on resident shk/priest dest filter (public rloc of ordinary mons still matches).

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not `in_rooms` the dest. Do not lock when `!inhishop` / `!inhistemple`. Do not skip `goodpos` first. Do not skip `tele_jump_ok` after the lock. Do not pull `rloc` steed `tele()` into this peel.

## C ↔ JS fidelity

### Order vs `teleport.c:1575–1633`

C: `goodpos` → `xx = mx` → `if (!xx)` migrating restricted-arrival **else** room lock then `tele_jump_ok(xx,yy,x,y)` → TRUE.

JS (`teleport.js:976–998`): `goodpos` → `xx = mx|0` → `if (xx)` room lock then `tele_jump_ok` → TRUE; else fall through (mx==0 named). Match the on-map arm. Migrating arms stay named (Open `rloc_pos_ok` mx==0).

### Room lock vs `:1620–1626`

C:

```
if (mtmp->isshk && inhishop(mtmp)) {
    if (levl[x][y].roomno != (unsigned char) ESHK(mtmp)->shoproom)
        return FALSE;
} else if (mtmp->ispriest && inhistemple(mtmp)) {
    if (levl[x][y].roomno !=  (unsigned char) EPRI(mtmp)->shroom)
        return FALSE;
}
```

JS: dest `(level.at(x,y).roomno | 0) & 0xff` vs `(ESHK.shoproom | 0) & 0xff` / `EPRI.shroom`. `NO_ROOM=0`, `SHARED=1`, `ROOMOFFSET=3` match `const.js` / C `mkroom.h`. Doorway `SHARED` ≠ shoproom → reject, like C. `mklev.js` writes `roomno` (`NO_ROOM` / `SHARED` / `rmno`) the same way C `add_room` does. This is not a clone of `in_rooms` for dest.

`isshk` else-if `ispriest`: a monster that is both (impossible) takes the shk arm. Match.

### `inhishop` / `inhistemple` clones (gate, not dest)

C `inhishop` (`shk.c:1039–1048`): `on_level(shoplevel, uz)` then `strchr(in_rooms(mx,my,SHOPBASE), shoproom)`. JS clone (`teleport.js:359–366`): `on_level` first (no RNG; short-circuit order irrelevant), then `in_rooms` `.includes(String.fromCharCode(shoproom))`. Pre-existing; review **123** accepted it for D-1162. Dest lock does **not** go through this clone — only the “already in their room” gate.

C `inhistemple`: `histemple_at(mx,my)` then `has_shrine`. JS clones (`:372–397`) match that pair. Pre-existing.

`!inhishop` (shk already outside, wrong shoplevel, no shrine): no dest lock; `tele_jump_ok` only. C same. Angry after a successful out-of-shop place remains D-1162, not this filter.

### Caller fallback

C `rloc` (`:1880–1890`): if no `rloc_pos_ok` spot, use `goodpos` backup (ignores onscary and this room lock). JS candy loop already does that. The lock is “try to keep in-room,” not full prevention — C comment `:1617–1619`. Match. Do not Must-fix candy placing a shk outside after the filter exhausted in-room cells.

`control_mon_tele(..., TRUE)` uses `rloc_pos_ok` (`:1922`). Wizard-mode; public Off. `mnexto` passes `FALSE` and `goodpos` — named Open, not this SHA.

`tele_jump_ok` (`teleport.c: ~1500s` / `teleport.js:948–967`) still runs **after** the room lock for on-map mons. A dest inside the shop that crosses a restricted TELE region still fails. Order is goodpos → room lock → jump. Swapping jump before the lock would still reject most out-of-shop cells via jump **or** lock, but C does lock first so an in-shop cell that fails jump never reaches “room ok.” JS keeps C order. No RNG in either predicate.

`unsigned char` cast: C `eshk.shoproom` is `char`; dest `levl.roomno` is `unsigned char`. Negative shoproom would become 255. JS `| 0` then `& 0xff` on both sides. Shoproom is `ROOMOFFSET+index` (3…), never negative in live mkroom. `SHARED_PLUS` (2) dest is also ≠ shoproom → reject, like C.

`rloc` 50-try (`:1849–1854`) calls this predicate each `rnd`/`rn2` pair. A resident shk on a busy shop floor fails more random dests; candy then `rloc_pos_ok` again; then `goodpos` backup. Extra failed tries **are** C (more `rnd`/`rn2` consumed only if the 50-try would have accepted an out-of-room cell that JS now rejects — then JS burns the remaining tries C would have skipped by `goto found_xy`). That is the intended dest filter, not a prefix hack. Public sessions do not rloc a resident shk, so the 50-try prefix is unchanged on the fortress.

## Hallucinations / overclaim

D-log / CURRENT / subject say a resident shk/priest is not offered a dest outside their room, instead of treating every `goodpos` cell as viable. **That is the hunk:** dest `roomno` vs shoproom/shroom. Stamping **Addressed:** D-1171 is fair for the Open **room lock** line. Hash `822498d3` is on the archive row (filled by D-1172). Do **not** stamp it as “Match C `make_angry_shk`” (D-1162) or “Match C mx==0 updest” or “Match C `in_rooms` dest.” This is **not** “Match C dispatch, callee is a stub”: `goodpos` / `inhishop` / `tele_jump_ok` are live; the new compare is C’s `levl.roomno` field.

## Density

One C `if` / `else if` inside `rloc_pos_ok`. ~20 JS lines. Thin vs §2b; queue said “Not make_angry_shk.” Correct split from D-1162 (post-place angry) vs this pre-place dest filter. Not QUALITY-RISK for thinness.

## Verification

Journal: private canary **25**/25 (C/JS order; dest roomno vs shoproom/shroom not `in_rooms`; unsigned char; mx==0 still deferred; no angry/fs/FORCE; resident stay in-room; ordinary/`!inhishop`/`!shrine` not locked; candy goodpos-fallback; SHARED dest skipped; isshk else-if; tele_jump after; goodpos first; thenable); green+strict seed8000/0900; cohort **41**/41 + strict. Path **public-unhit** on resident shk/priest dest filter.

C read of `teleport.c:1575–1633` (`:1620–1626`), `shk.c:1039–1048`, `priest.c:161–171`; JS SHA `rloc_pos_ok` + existing clones. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1490**) **44**/44 — ordinary rloc 50-try still matches.

| Case | C | JS after |
|------|---|---------|
| resident shk, dest `roomno==shoproom` | ok (then jump) | **same** |
| resident shk, dest corridor / SHARED | FALSE | **same** |
| `!inhishop` / wrong shoplevel | no lock | **same** |
| priest `inhistemple`, dest `shroom` | ok | **same** |
| isshk else-if ispriest | shk arm | **same** |
| `mx==0` migrating | updest/dndest | **named skip** |
| `goodpos` first / `tele_jump_ok` after | yes | **same** |
| candy `goodpos` fallback | may leave room | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open on-map lock matches `teleport.c:1620–1626`. Dest is `levl.roomno`, not `in_rooms`.

Named omits / do-nots (map / Open, not Must-fix):

1. migrating `mx==0` updest/dndest (`teleport.c:1592–1615`). Open.
2. `rloc` steed `tele()`. Next port in this window.
3. `mnexto` `control_mon_tele(..., FALSE)`. Open.
4. Do not `in_rooms` the dest. Do not lock `!inhishop`. Do not restore dest-any-`goodpos` for resident shk. Do not pull steed `tele()` into this SHA — **Addressed:** D-1172 `e7c5c8ac`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: on-map `rloc_pos_ok` now rejects dest cells whose `roomno` is not the resident shk/priest room, matching C `:1620–1626`, while migrating `mx==0` restricted arrival stays named.
- Must-fix stays empty for this SHA; next port in this window popped Open steed `tele()`. **Addressed:** D-1171 `822498d3`. Not `in_rooms`, not angry.
