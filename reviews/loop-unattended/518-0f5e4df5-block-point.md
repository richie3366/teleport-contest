# Review 518 — 0f5e4df5 — makemon.c set_mimic_sym does_block / block_point (D-1557)

## Metadata
- Full / short hash: `0f5e4df58289dbcd3a49b2996832d55607f10280` / `0f5e4df5`
- Parent: `f8a7cea2` (D-1556). This file audits **this SHA only** (ninth of nine `js/` commits since review **509**). Archive **Addressed:** D-1557 `0f5e4df5`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 14:17:14 +0200
- D-id: **D-1557**
- Stats: `js/makemon.js` +8 / −5, `js/vision.js` +113 / −17. Band 150–350 (js/ insertions **121**).
- Claims to close: Open `block_point` after D-1556. Not Protection. Not Plan-B. Not `made_fruit`. Not `recalc_block_point`→`unblock_point`. `reviews/loop-2026-08-15/` has no unpaid mimic-LOS Must-fix.
- JS / map: `makemon.js` `set_mimic_sym`; `vision.js` `does_block` / `fill_point` / `block_point`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **504** / **517** named `block_point`.

## Intent vs deliverable

Git subject promises: a boulder/door mimic calls `does_block` then `block_point`/`fill_point` instead of leaving `viz_clear` open.

Pinned C `makemon.c` `set_mimic_sym` tail `:2548–2549`. Callees `vision.c` `does_block` `:152–202`, `block_point` `:864–891`, `fill_point` `:1050–1128` (only caller `block_point` `:878` `fill_point(y, x)`). `does_block` callers include makemon `:2548`; vision_reset `:233`; lock/zap/region/sp_lev/mklev/mon/dbridge/dig. `block_point` callers include makemon `:2549`; display, lock, mkobj, region, vault, zap (JS those still `recalc_block_point`).

```2548:2549:nethack-c/upstream/src/makemon.c
    if (does_block(mx, my, &levl[mx][my]))
        block_point(mx, my);
```

Old JS: `// block_point deferred`. Private `_blocks` was a boolean `does_block` clone used only by `vision_reset` (`typ < POOL` ≡ `IS_OBSTRUCTED`; TREE=13 < POOL=16 so the extra TREE arm is redundant in this enum; DOOR=23 is not IS_OBSTRUCTED, closed-mask only). Occupancy was already fmon (skip steed). Gas returned boolean true, not 2.

The diff **does** export `does_block` (C 0/1/2), delete `_blocks`, port `fill_point` + `block_point`, and wire the `set_mimic_sym` tail with the same `loc` as `&levl[mx][my]`. `vision_reset` uses `!!does_block` so int 2 still flips `block`. It **does not** port `unblock_point` / `dig_point`, Underwater `is_moat`, Protection early-out, Plan-B, `made_fruit`. Named. `recalc_block_point` still full `vision_reset` (Keep). **No RNG.**

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `set_mimic_sym` tail | C `:2548–2549`, **LIVE this SHA** | was comment |
| `does_block` | C `:152–202`, **LIVE this SHA** | was `_blocks` clone; exported |
| `block_point` | C `:864–891`, **LIVE this SHA** | new export |
| `fill_point` | C `:1050–1128`, **LIVE this SHA** | one local; leftover `i` |
| `_blocks` | **deleted** | re-point → `does_block` |
| occupancy | C `m_at` `rm.h:516`, **CLONE** | fmon; Keep; not TDZ |
| `visible_region_at` | C gas return 2, **LIVE** | region.js |
| `is_lightblocker_mappear` | C, **LIVE** | vision.js |
| Underwater `is_moat` | C `:174–175`, **OMIT named** | |
| DEBUG `seethru` | C `block_point` / `does_block`, **OMIT** | wizard |
| `unblock_point` / `dig_point` | C, **OMIT named** | |
| `recalc_block_point` | still `vision_reset()`, **named** | Keep |

`node scripts/csym.mjs does_block` → `vision.c:152-202`. `--callers does_block`: dbridge `:961`; dig `:520`; makemon `:2548`; mklev `:2591`; mon `:4423`; region `:375`/`:1071`; sp_lev `:2121`; vision `:233`/`:873`/`:913`; wizcmds `:1453`; zap `:1954`/`:1960`/`:5569`. `csym.mjs block_point` → `:864-891`. `--callers block_point`: makemon `:2549`; display `:1536`; lock `:1043`/`:1153`/`:1189`; mkobj `:2333`; region `:328`; … `csym.mjs fill_point` → `:1050-1128`. `--callers fill_point`: vision `:878` only.

`node scripts/sym.mjs` on every deleted / re-pointed / new name:

```
does_block       js/vision.js:123   sync
block_point      js/vision.js:281   sync
fill_point       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/vision.js:199
             => Do NOT write clone #2.
_blocks          NOT FOUND in js/**
recalc_block_point js/vision.js:292   sync
unblock_point    NOT FOUND
dig_point        NOT FOUND
set_mimic_sym    js/makemon.js:2553   sync
is_lightblocker_mappear js/vision.js:88   sync
visible_region_at js/region.js:79   sync
```

`node scripts/imports.mjs --can vision.js mon.js m_at`: **SAFE** — `m_at` is a hoisted function; cycle-safe. A cycle alone is not a blocker. D-log “no vision→mon.js `m_at`” is **not** a TDZ reason. Occupancy stays fmon because JS has no `level.monsters[][]` (`clone_mon` `place_monster` is a named omit). Do **not** add `fill_point` clone #2. Do **not** replace `recalc_block_point` with `unblock_point` in this review.

`node scripts/imports.mjs --can makemon.js vision.js does_block`: ALREADY statically imported.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/`. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **No RNG** in the tail (`does_block` / `fill_point` / `block_point` have none).

## C ↔ JS fidelity

`does_block`. `IS_OBSTRUCTED || TREE || (IS_DOOR && closed/locked/trapped)` then CLOUD / WATERWALL / LAVAWALL then boulder `nexthere` then lightblocker mimic then `visible_region_at` → **2** else **0**. `!loc` → 1 is a JS guard (C `NONNULLARG3`). **Match `:166–201` except Underwater `is_moat` (named).** `IS_OBSTRUCTED` is `(typ) < POOL` (`rm.h:119`) — same as old `_blocks` first test. Return 2 is new vs boolean true; `vision_reset` `!!` keeps the boolean flip. **Match C `vision_reset` `:233`** (`IS_OBSTRUCTED || does_block` short-circuits the same cells `does_block` would return 1 for).

Occupancy. Live C `m_at` is `svl.level.monsters[x][y]` (`rm.h:515–516`; the `mburied` variant is `#if 0`). JS walks `game.fmon` for `mx,my`, skips `usteed`, then `minvis && !See_invisible`. C is `(!minvis || See_invisible) && is_lightblocker_mappear`. Same predicate. Steed skip is pre-existing `_blocks`, not a new gate. Worm tails live on C’s occupancy grid via `place_worm_seg`; JS fmon is heads. Mimics are not worms. **Verified CLONE for this caller.** Do not stamp “Match C `m_at`.”

`fill_point`. Function-scoped `let i` (not `for (let i)`). Early-out if already opaque. `viz_clear[row][col]=0`. col==0 / col==COLNO-1 / both-clear / left-clear / right-clear / both-blocked, including the leftover-`i` writes after the `i < col` and `i < right_ptrs…` loops. Caller `block_point(x,y)` → `fill_point(y,x)`. **Match `:1050–1128`.** Optional `viz_clear[row]?.[col]` is a JS softening (C indexes raw).

`block_point`. `fill_point(y,x)` then `if (viz_array[y][x]) vision_full_recalc=1`. **Match `:878–890`.** DEBUG `seethru` early-return omitted (named wizard).

`set_mimic_sym` tail. After MCORPSENM arms, `does_block(mx,my,loc)` then `block_point(mx,my)`. `loc` is `game.level.at(mx,my)` captured at entry — same cell C’s `&levl[mx][my]`. Gold ZOO `GOLD_PIECE` is not a lightblocker; `does_block` stays 0; no `fill_point`. Boulder / `S_hcdoor` furniture is. **Match.**

Callee closure (this tail). LIVE: `does_block`, `block_point`, `fill_point`, `is_lightblocker_mappear`, `visible_region_at`. CLONE: fmon occupancy (Keep). OMIT named: Underwater moat; `unblock_point`/`dig_point` (other C callers). STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.” Other C `block_point` sites still call `recalc_block_point` (full reset) — heavier, still rebuilds `does_block`; named incremental debt, not this arm.

## Hallucinations / overclaim

Subject boulder/door mimic `does_block` then `block_point`/`fill_point`: **true**. Stamping **Addressed:** D-1557 is fair for the **named omit**. Do **not** stamp “Match C `unblock_point`.” Do **not** stamp “Match C `m_at` occupancy grid.” Do **not** stamp “cycle-forced fmon” — `--can` is SAFE; fmon is the missing 2D grid, not TDZ. Do **not** stamp “Match C `recalc_block_point` is incremental `dig_point`.” Return-2 gas is real, not a comment-only.

## Density

+121 JS: C `fill_point` is 79 lines plus `does_block` int-return and the three-line tail. One semantic cluster (mimic LOS). Did not glue Protection / Plan-B / `made_fruit`. §2b OK.

## Branch-by-branch confirm

1. Boulder mimic, `viz_clear` was 1: `does_block` 1 → `fill_point` zeros the cell → `clear_path` blocked. **Match.**
2. Gold ZOO mimic: `does_block` 0 → no `block_point`. **Match.**
3. Open door terrain + `S_hcdoor` mappear: first `IS_DOOR` arm is 0 (open mask); mimic lightblocker returns 1. **Match.**
4. Closed-door terrain: `does_block` 1 even without mimic. **Match.**
5. Gas `visible_region_at`: return 2; `!!` still blocks in `vision_reset`. **Match.**
6. Underwater moat: C 1; JS falls through. **Named omit.**
7. `recalc_block_point` after this SHA: still `vision_reset()`. **Named Keep.**

## Callers / RNG ledger

C: `set_mimic_sym` after appearance is assigned. Public-unhit until a session has a boulder/closed-door/wall mimic before the next `vision_reset`. No seed gate. **No core RNG.**

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `fill_point` leftover `i` is C’s function-scoped quirk, not a recorded coordinate.

## Verification

D-log canary **29**/29 (C/JS grep; boulder mimic `fill_point` vs `clear_path`; gold ZOO does not unblock; open door + `S_hcdoor` blocks; closed-door terrain still 1; DELPHI/TEMPLE/D-1536 door live; leftover `i`; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** for the mimic tail. Admit it.

## Actionable C-wrongs

None for Must-fix. Named: Protection_from_shape_changers early-out; slime-mold `flags.made_fruit`; nocorpse/hatch/tin Plan-B; `unblock_point`/`dig_point`; Underwater moat in `does_block`; `place_monster` 2D grid (occupancy). Do not add `fill_point` #2. Do not import `m_at` “because cycle” — if occupancy is ported, it is the 2D grid, not a TDZ workaround.

Verdict: **ACCEPT-WITH-DEBT**
