# Review 526 — 224bd3a6 — steed.c place_monster / clone_mon 2D grid (D-1565)

## Metadata
- Full / short hash: `224bd3a6d0b24ee2037ac1f7e669006352dddb12` / `224bd3a6`
- Parent: `e8cc4c96` (D-1564). This file audits **this SHA only** (eighth of nine `js/` commits since review **518**). Archive **Addressed:** D-1565 `224bd3a6`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 06:03:26 +0200
- D-id: **D-1565**
- Stats: `js/steed.js` +83 / −2, `js/worm.js` +22 / −2, `js/makemon.js` +9 / −19, `js/teleport.js` +9 / −9, `js/mon.js` +7 / −7, `js/display.js` +5 / −6, `js/region.js` +5 / −2, `js/mhitm.js` +3 / −22. Band 150–350 (js/ insertions **143**).
- Claims to close: Open `clone_mon` `place_monster` 2D after D-1078 / D-1564. Not HP split. `reviews/loop-2026-08-15/` has no unpaid place_monster Must-fix.
- JS / map: `steed.js` `place_monster`/`remove_monster`; `makemon.js` `clone_mon`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **39** (HP split live, occupancy named); **525** named 2D grid.

## Intent vs deliverable

Git subject promises: a clone occupies `level.monsters[][]` instead of only fmon mx/my, and the mhitm mx/my-only `place_monster` clone is retired.

Pinned C `steed.c` `place_monster` `:897–932`. `clone_mon` caller `makemon.c:898` (after HP split). `makemon()` itself `:1295` is **not** this SHA. `rm.h` `remove_monster` `:526–534` / `:534`. `MON_AT` / `m_at` `:515–516` (grid pointer). `DEADMONSTER` `monst.h:214` (`mhp < 1`). gulpmm / mdamagem already called JS locals.

```897:932:nethack-c/upstream/src/steed.c
void
place_monster(struct monst *mon, coordxy x, coordxy y)
{
    ...
    if (!isok(x, y) && (x != 0 || y != 0 || !mon->isgd)) {
        ... x = y = 0;
    }
    if ((mon == u.usteed && !gi.in_steed_dismounting)
        || (DEADMONSTER(mon) && !(mon->isgd && x == 0 && y == 0))) {
        ...
        return;
    }
    if ((othermon = svl.level.monsters[x][y]) != 0) {
        impossible(...); /* still writes below */
    }
    mon->mx = x, mon->my = y;
    svl.level.monsters[x][y] = mon;
    mon->mstate = MON_FLOOR;
}
```

Old JS: `clone_mon_occupied` fmon+worm scan; mhitm local mx/my only; `_level_monsters` mostly worm segs.

The diff **does** export C-home `place_monster`/`remove_monster`, call it from `clone_mon`, retire the mhitm locals, and route `m_at` readers through `level_mon_at`. It **does not** call `place_monster` from `makemon()` `:1295` or `cutworm`. Named. Mixed occupancy (fmon fallback + `MON_OFFMAP`) stays for heads that never hit the grid.

**No core RNG** in `place_monster` / `remove_monster`. `clone_mon` `rn2` tame/peace is pre-existing (D-1078).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `place_monster` | C `:897–932`, **LIVE this SHA** | steed.js; Map key `"x,y"` ≡ `level.monsters[x][y]` |
| `remove_monster` | C `rm.h:534`, **LIVE this SHA** | plus JS `MON_OFFMAP` on fmon head (D-1231 mixed occupancy) |
| `clone_mon` place | C `:898`, **LIVE this SHA** | occupancy via `m_at` ≡ C `MON_AT` + fmon fallback |
| `clone_mon_occupied` | **deleted** | do not resurrect |
| mhitm local place/remove | **retired → import** | gulpmm / mdamagem |
| `level_mon_at` | JS helper, **LIVE this SHA** | worm segs + matching mx/my; ignore stale heads |
| `place_mon_nam` | C `minimal_monnam`, **CLONE** | diags only |
| `m_at` fmon walk | JS, **kept** | C is grid-only (`rm.h:516`) |
| region/teleport `m_at` | **CLONE** (pre-existing) | now call `level_mon_at`; do not add #5 |
| `makemon()` `:1295` | **OMIT named** | |
| `cutworm` | **OMIT named** | |
| worm `remove_monster_xy` | **CLONE** | tail cells; head mx/my is not the tail |

`node scripts/csym.mjs place_monster` → `steed.c:897-932`. `--callers`: 53 sites including `makemon.c:898` and `:1295`. `remove_monster` → `rm.h:526` / `:534`. `clone_mon` → `makemon.c:836-944`. No `rn2` in `place_monster`.

`node scripts/sym.mjs` on new / re-pointed / deleted names:

```
place_monster    js/steed.js:849   sync
remove_monster   js/steed.js:893   sync
level_mon_at     js/worm.js:55   sync
m_at             js/mon.js:1221   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/dig.js:189  js/shknam.js:264  js/teleport.js:107  js/uhitm.js:314
clone_mon        js/makemon.js:2783   ASYNC — await required
clone_mon_occupied NOT FOUND in js/**
place_mon_nam    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/steed.js:832
```

Do **not** add `place_monster` #2 or `m_at` #5. Do **not** resurrect `clone_mon_occupied`. `node scripts/imports.mjs --can` makemon/mhitm→steed `place_monster`, steed/mon/region/display/teleport→worm `level_mon_at`: ALREADY or new edge on the existing 82-module SCC. `place_monster` / `level_mon_at` are hoisted `export function`. No TDZ.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/` (`impossible` strings use live `x,y`, not session traces). `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`isok` / vault `<0,0>`. Non-isok and not (0,0+isgd) → `impossible`, snap to 0,0, still attempt place. **Match `:908–913`.**

Steed / DEADMONSTER. Steed unless `in_steed_dismounting`; `mhp < 1` unless isgd at 0,0 → `impossible` and **return without writing**. **Match `:914–921`.** `impossible` is voided so the helper stays sync like C.

Overlap. C: raw grid non-NULL → `impossible`, **then write anyway**. JS: Map hit **and** `level_mon_at` (skip stale mx/my-only leftovers) → `impossible`, then write. **Match the write.** The extra stale gate is mixed-occupancy debt until `makemon()` places. Worm segs (`wormno`, mx/my is the head) still count. **Match C worm occupancy.**

Write. mx/my, Map set, `MON_FLOOR`. **Match `:930–932`.** JS dropped the pre-place `mstate = MON_FLOOR` in `clone_mon` so only this function sets it.

`remove_monster`. C clears the cell; mx/my unchanged. JS deletes the Map key. Extra: first living fmon at that mx/my gets `MON_OFFMAP` so the fmon fallback of `m_at` matches C’s empty grid (D-1231 gulpmm). **Not C text.** Named mixed occupancy. Worm tails use `remove_monster_xy` (delete only). **Correct** — tail cells are not the head’s mx/my.

`clone_mon`. Occupancy `m_at` (grid + fmon) instead of `clone_mon_occupied`. Then `place_monster(m2, m2.mx, m2.my)` after HP split / flag clear. **Match `:898`.** `makemon()` still does not call `place_monster`. Ordinary births stay fmon-only until some other path places them. **Named.**

gulpmm / mdamagem. Same call sites, now the steed export (grid write), not mx/my-only. mdamagem still `mhp=1` around re-place so DEADMONSTER does not early-return. **Match C `:1078` comment.**

`level_mon_at`. Live if mx/my match or `wormno`; skip steed / dead / `MON_OFFMAP` / stale heads. C `m_at` is the raw pointer. JS `m_at` still walks fmon after a miss. **Do not stamp Match C `m_at` grid-only.**

Callee closure (`clone_mon` place arm). LIVE: `place_monster`, `isok`, `DEADMONSTER` (`mhp<1`), `MON_FLOOR`, `m_at`/`enexto`. CLONE: `place_mon_nam`; `level_mon_at`; Map vs 2D array. OMIT named: `makemon()` `:1295`, `cutworm`. STUB: **none** on the clone place arm. Arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject clone on `level.monsters[][]` + retire mhitm clone: **true**. D-log “not HP split”: **true** (halving unchanged). Do **not** stamp “Match C `makemon()` `place_monster` `:1295`.” Do **not** stamp “Match C `m_at` is grid-only.” Do **not** stamp “Match C `remove_monster` sets `MON_OFFMAP`.” This is **not** “dispatch ported, callee stubbed” on the clone arm.

## Density

One C place + its `clone_mon` caller + retire the gulpmm clone that would diverge. +143 JS. Did not glue `makemon()` `:1295` or `cutworm`. §2b OK.

## Branch-by-branch confirm

1. `clone_mon` after HP split: clone on Map at mx/my, `MON_FLOOR`. **Match `:898`.**
2. Second clone / `m_at` on that cell: grid hit. **Match the claimed occupancy.**
3. `mhp<=1` / extinct: no place. **Match D-1078** (unchanged).
4. Occupied + `enexto` fail: null, no place. **Match.**
5. Steed place while mounted: return, no write. **Match.**
6. Dead non-isgd: return. **Match.** isgd at 0,0: write. **Match.**
7. Overlap: impossible, still write. **Match.**
8. gulpmm remove+place: grid, not mx/my-only. **Match this SHA’s retire.**
9. `remove_monster` then `m_at`: empty (OFFMAP + Map delete). **Match occupancy, not the macro text.**
10. `makemon()` birth: still fmon fallback. **Named.**

## Callers / RNG ledger

C `place_monster`: 53 sites; this SHA wires `clone_mon` + gulpmm/mdamagem. Public-unhit for a second clone on the grid. No seed gate. **No core RNG** in the new helpers.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `level_mon_at` lives in worm.js because segs already used the Map — not a cycle dodge. `void impossible(...)` keeps C’s sync signature.

## Verification

D-log canary **24**/24 (C/JS locus; grid write; m_at; DEADMONSTER; steed; dismount; isgd 0,0; remove OFFMAP; stale ignore; clone occupy+HP 4/5 of 9; MON_AT no stack; mhp<=1 fail; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `makemon()` `place_monster` `:1295`; `cutworm`; `rndmonst_adj` rogue/elem (next Open); `newcham` Protection cancel. Do not add `place_monster` #2. Do not resurrect `clone_mon_occupied`. Do not add `m_at` clone #5. Do not drop the fmon fallback until `:1295` is live.

Verdict: **ACCEPT-WITH-DEBT**
