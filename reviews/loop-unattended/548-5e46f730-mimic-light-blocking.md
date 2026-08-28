# Review 548 — 5e46f730 — display.c mimic_light_blocking See_invisible (D-1587)

## Metadata
- Full / short hash: `5e46f73044db2fd20a67218713e7b8f8dc0b07a5` / `5e46f730`
- Parent: `9cdc66f5` (D-1586). This file audits **this SHA only** (third of nine `js/` commits since review **545**). Archive **Addressed:** D-1587 `5e46f730`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 19:12:00 +0200
- D-id: **D-1587**
- Stats: `js/vision.js` +18/−6. Band **150–350** (js/ insertions **18**).
- Claims to close: Open `mimic_light_blocking` See_invisible after D-1574/D-1576. Not `seemimic`. Not `nv_range`. `reviews/loop-2026-08-15/` has no unpaid mimic-light Must-fix.
- JS / map: `vision.js` local `mimic_light_blocking`; live `set_mimic_blocking`. `c-js-map/data.md` / `turns.md`.
- Prior reviews this SHA claims to close: **535** / **537** / **544** named this helper still `recalc`.

## Intent vs deliverable

Git subject promises: invisible lightblocker mimics call `block_point` or `unblock_point` instead of `recalc_block_point`.

Pinned C `display.c` `mimic_light_blocking` `:1531–1540`. Caller `set_mimic_blocking` `:1547–1551` `iter_mons`. Macro `youprop.h:150–152` `See_invisible = HSee_invisible || ESee_invisible` (`uprops[SEE_INVIS]`, `prop.h:49` = 29). Callees `vision.c` `block_point` / `unblock_point` (D-1557 / D-1574). `is_lightblocker_mappear` `monst.h:233–239`. `--callers mimic_light_blocking` only the static proto `:136` (staticfn); the body call is `iter_mons(mimic_light_blocking)` `:1550`. `--callers set_mimic_blocking`: `do_wear.c:1290` / `:1388`; `eat.c:2293`; `polyself.c:250`; `potion.c:871`; `sit.c:709`; `timeout.c:769`.

```1531:1540:nethack-c/upstream/src/display.c
staticfn void
mimic_light_blocking(struct monst *mtmp)
{
    if (mtmp->minvis && is_lightblocker_mappear(mtmp)) {
        if (See_invisible)
            block_point(mtmp->mx, mtmp->my);
        else
            unblock_point(mtmp->mx, mtmp->my);
    }
}
```

Old JS: early-out `!minvis` / `!is_lightblocker_mappear` then `recalc_block_point(mx,my)` (`does_block` terrain, not See_invisible).

The diff **does** replace that with C’s if/else on See_invisible. It **does not** wire potion / timeout / polyself `set_mimic_blocking`, nor change `does_block`’s sticky-only `game.u.See_invisible`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mimic_light_blocking` | C `:1531–1540`, **LIVE this SHA** | existing local; not clone #2 |
| `set_mimic_blocking` | C `:1547–1551`, **LIVE** | `fmon` stand-in for `iter_mons` |
| `block_point` | C `vision.c`, **LIVE** D-1557 | same module |
| `unblock_point` | C `vision.c`, **LIVE** D-1574 | same module |
| `is_lightblocker_mappear` | C `:233–239`, **LIVE** | |
| `See_invisible` | C `youprop.h:152`, **CLONE inline** | uprops H\|\|E + JS H/E/sticky; not clone #7 |
| `SEE_INVIS` | C `prop.h:49`, **LIVE** | `const.js` 29 |
| `recalc_block_point` | **not used here** | leftover for other sites |
| potion / timeout / polyself callers | **OMIT named** | |
| `does_block` sticky-only See_invis | **OMIT named** | not this helper |
| `iter_mons` `mon_offmap` | **OMIT named** | JS `mhp<=0` |

`node scripts/csym.mjs mimic_light_blocking` → `:1531-1540`. `set_mimic_blocking` → `:1547-1551`. `is_lightblocker_mappear` → `monst.h:233-239`. `block_point` / `unblock_point` already cited in **535**.

RNG: **none**. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
mimic_light_blocking NOT EXPORTED — 1 LOCAL js/vision.js:116
  => Do NOT write clone #2.
set_mimic_blocking js/vision.js:134   sync
block_point      js/vision.js:391   sync
unblock_point    js/vision.js:401   sync
is_lightblocker_mappear js/vision.js:100   sync
SEE_INVIS        js/const.js:2390   sync   export const
See_invisible    NOT EXPORTED — 6 LOCAL CLONE(S)
               js/mhitm.js:1058  js/muse.js:870  js/potion.js:763
               js/sit.js:162  js/timeout.js:610  js/trap.js:3804
  => Do NOT write clone #7.
```

`--can vision.js vision.js block_point`: same-module hoisted function, SAFE (not TDZ). `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates.

## C ↔ JS fidelity

Gate. `minvis && is_lightblocker_mappear`. **Match `:1534`.** Boulder / door / wall / tree appearance. **Match `monst.h:233–239`.** `!mtmp` early-out is JS (C `NONNULLARG1`). Harmless.

See_invisible. C is **only** `H || E` (`youprop.h:152`), not a third boolean. JS ORs `uprops[SEE_INVIS].intrinsic/extrinsic`, `HSee_invisible`, `ESee_invisible`, **and** sticky `u.See_invisible`. Dual-store, same pattern as the six named clones. If sticky is true with H=E=0 this helper would `block_point` when C `unblock_point`s. That is conferral/expiry debt (potion/timeout named), not a silent `recalc` stand-in.

Then. See_invisible → `block_point(mx,my)`; else `unblock_point`. **Match `:1535–1538`.** Not `does_block` / `recalc_block_point`. **That is the C delta vs parent.**

`set_mimic_blocking`. C `iter_mons(mimic_light_blocking)`. JS walks `fmon`, skips `mhp<=0`. **Match live mons; off-map `iter_mons` skip named.** Live JS callers: `do_wear` Ring on/off, `eat` RIN_SEE_INVISIBLE accessory, `sit` fountain. **Match those three C sites.** Missing vs C: `potion.c:871`, `timeout.c:769`, `polyself.c:250`. Named.

Callee closure (this helper). LIVE: `is_lightblocker_mappear`, `block_point`, `unblock_point`. CLONE verified: See_invisible inline (H\|\|E + sticky). OMIT named: potion/timeout/polyself callers, `does_block` sticky, `mon_offmap`. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `block_point`/`unblock_point` instead of `recalc`: **true of the helper body.** D-log “do not write clone #2 / #7”: **true** (`sym` 1 local helper, 6 See_invisible clones). Do **not** stamp “Match C every See_invisible toggle” — potion expiry / timeout / polymon still omit `set_mimic_blocking`. Do **not** stamp “Match C `does_block` See_invisible” (`vision.js:167` still sticky-only). Do **not** stamp “Match C `seemimic`” (D-1574). Do **not** stamp “See_invisible is only H\|\|E in this helper” — sticky is extra. Helper is **not** a stub: callees are the live D-1557/D-1574 functions.

## Density

One 10-line C static + the See_invisible predicate it uses. +18 JS. Playbook §2b “unless C is that small.” Did not glue potion/timeout/polyself callers (named). OK.

## Branch-by-branch confirm

1. Visible mimic (`!minvis`): no-op. **Match.**
2. Invisible non-lightblocker: no-op. **Match.**
3. Invisible lightblocker + See_invisible: `block_point`. **Match** when H\|\|E (or sticky) is set.
4. Invisible lightblocker + !See_invisible: `unblock_point`. **Match** when H=E=0 and sticky false.
5. `set_mimic_blocking` walks live `fmon`. **Match `iter_mons` for on-map.**
6. Potion / timeout / polymon toggle. **Named.**
7. `does_block` occupancy See_invisible. **Named.**

## Callers / RNG ledger

C helper is only reached from `set_mimic_blocking` when See_invisible **changes**. JS same for wired sites. No RNG. Extra `vision_full_recalc` from `block_point`/`unblock_point` is those callees’ C body, not a seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Keep the local next to `is_lightblocker_mappear` (C `display.c`; JS vision already owns `does_block`). Do not add `mimic_light_blocking` #2 in `display.js`. Do not add See_invisible clone #7. Do not restore `recalc_block_point` here. Do not revert D-1574 `dig_point`/`seemimic`.

## Verification

D-log private canary **21**/21; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a public session toggles See_invisible while an invisible boulder/door/wall mimic is on the map. `does_block` sticky path is not this SHA.

## Actionable C-wrongs

None for Must-fix. Named: `potion.c:871` / `timeout.c:769` / `polyself.c:250` `set_mimic_blocking`; `does_block` sticky-only See_invisible; `iter_mons` off-map; sticky vs H\|\|E-only if conferral leaves `u.See_invisible` set with H=E=0. Do not add See_invisible #7. Do not treat `recalc` at unrelated dokick/zap sites as this helper.

Verdict: **ACCEPT-WITH-DEBT**
