# Review 220 — c63ac778 — mondata.c passes_bars / ALLOW_BARS (D-1258)

## Metadata
- Full / short hash: `c63ac7781361270dc67acf05fddf380b6fe813d6` / `c63ac778`
- Parent: `be8cc41b` (reviews **216–219** + cadence **#1595**). JS parent `466adf3e` (D-1257). This file audits **this SHA only**. Archive row **Addressed:** D-1258 `c63ac778` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 07:41:45 +0200
- D-id: **D-1258**
- Stats: 12 files, +154 / −49 — `js/monsters.js` +37; `js/mon.js` +24 / −11; comments `js/monmove.js`.
- Claims to close: Open `monmove.c` ALLOW_BARS rust/corr/metallivore (named from D-1247 / review **209**). Not gelcube. `reviews/loop-2026-08-15/` has no unpaid bars Must-fix.
- JS / map: `monsters.js` `passes_bars` / `dmgtype` / `slithy`; `mon.js` `mon_allowflags` / `mfndpos`; `c-js-map/turns.md` / `debt.md`. Hero `test_move` `passes_bars` still named.
- Prior reviews this SHA claims to close: **209** named omit ALLOW_BARS rust/corr/metallivore in `mon_allowflags`.

## Intent vs deliverable

Git subject promises: “Match C mon.c mon_allowflags / mondata.c passes_bars so rust/corr/metallivorous (and slithy-small) monsters can path onto iron bars, instead of only wallwalk/amorphous/whirly/verysmall.”

C `passes_bars` (`mondata.c:552–563`) is walls / amorphous / unsolid / whirly / verysmall / `dmgtype` RUST or CORR / metallivorous / (`slithy && !bigmonst`). `mon_allowflags` (`mon.c:2104–2109`) ORs `ALLOW_BARS` from that predicate unless `mtmp == u.ustuck` carrying the hero, in which case only `unsolid || verysmall` youmonst (not full `passes_bars(youmonst.data)`). `mfndpos` (`mon.c:2225–2230`) continues past IRONBARS when `!(flag & ALLOW_BARS)` **or** `(wall_info & W_NONDIGGABLE)` and rust/corr `dmgtype`. `ALLOW_BARS` is `0x10000000` (`mfndpos.h:23`). `AD_RUST` 24 / `AD_CORR` 42 (`monattk.h`). Hero `hack.c` `test_move` `:1032` still named.

Old JS: ALLOW_BARS only for walls/amorphous/whirly/verysmall (no unsolid, no rust/corr/metallivore/slithy-small). `mfndpos` skipped IRONBARS solely on `!(flag & ALLOW_BARS)`.

The diff **does** the canonical predicate, the ustuck subset, and the W_NONDIGGABLE rust/corr continue. It does **not** wire hero `test_move` `passes_bars` / still_chewing. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `passes_bars` | C `:552–563`, **new** | eight-arm OR |
| `dmgtype` | C `:712–715`, **new export** | AT_ANY walk of `mattk` |
| `slithy` | C `mondata.h` macro, **new** | `M1_SLITHY` |
| `unsolid` / `amorphous` / `is_whirly` / `verysmall` / `metallivorous` / `passes_walls` / `bigmonst` | C, **imported live** | |
| `mon_allowflags` ALLOW_BARS | C `:2104–2109`, **rewired** | was truncated subset |
| ustuck gate | C `:2105–2108`, **new** | unsolid/verysmall youmonst |
| `mfndpos` IRONBARS | C `:2225–2230`, **rewired** | W_NONDIGGABLE rust/corr skip |
| `AD_RUST`/`AD_CORR` | C `monattk.h`, **local consts** | 24 / 42 |
| hero `test_move` `passes_bars` | C `hack.c:1032`, **named omit** | |
| `meatmetal` | C `monmove.c`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `dmgtype` has no `rn2`. Local `dmgtype` clones in `monmove.js` / `mhitu.js` / others are pre-existing and match this AT_ANY walk.

## C ↔ JS fidelity

Pinned C (`mondata.c:554–562`):

```
boolean
passes_bars(struct permonst *mptr)
{
    return (boolean) (passes_walls(mptr) || amorphous(mptr) || unsolid(mptr)
                      || is_whirly(mptr) || verysmall(mptr)
                      || dmgtype(mptr, AD_RUST) || dmgtype(mptr, AD_CORR)
                      || metallivorous(mptr)
                      || (slithy(mptr) && !bigmonst(mptr)));
}
```

JS is the same eight-arm OR. `dmgtype` walks `ptr.mattk` for `adtyp === dtyp`. C `dmgtype` is `dmgtype_fromattack(..., AT_ANY)` over `mattk[0]..NATTK`. Empty slots are `adtyp` 0, not rust/corr. Match.

`mon_allowflags`: `passes_bars(mtmp.data) && (mtmp !== u.ustuck || unsolid(youmonst.data) || verysmall(youmonst.data))`. JS uses `game.u?.ustuck` and `game.youmonst?.data`. Null ptr → predicates false. Match the subset (not full hero `passes_bars`).

`mfndpos`: C `levl[nx][ny].wall_info & W_NONDIGGABLE`. JS ORs `wall_info | flags` (pre-existing JS encoding; review **209** said do not Must-fix). Metallivore with ALLOW_BARS still paths onto nondiggable bars; rust/corr do not. Match C’s comment.

This is **not** “Match C dispatch, callee is a stub”: `passes_bars` is the C predicate; `ALLOW_BARS` is the live `mfndpos` bit (`0x10000000`).

## Hallucinations / overclaim

Subject + D-1258 say rust/corr/metallivore (and slithy-small) can path onto bars instead of the wallwalk/amorphous/whirly/verysmall subset. **Canonical `passes_bars` + ALLOW_BARS + W_NONDIGGABLE continue are the hunk.** Stamping **Addressed:** D-1258 is fair. Do **not** stamp “Match C hero `test_move` `passes_bars`” or “Match C `meatmetal`.” Unsolid is in C `passes_bars` and was also missing from the old JS subset; shipping it is part of matching C, not extra scope. `dissolve_bars` `switch_terrain` is the next SHA, not this one.

## Density

One predicate plus the two C callers that consume ALLOW_BARS (`mon_allowflags`, `mfndpos`). ~37 + ~20 JS lines. Right size. Did not glue `switch_terrain`.

## Branch-by-branch confirm

1. Xorn / wallwalk: ALLOW_BARS. Match.
2. Fog cloud / whirly / unsolid: ALLOW_BARS. Match (unsolid was the old hole).
3. Grid bug / verysmall: ALLOW_BARS. Match.
4. Rust monster (`AD_RUST`): ALLOW_BARS. Match (was omitted).
5. Gray ooze / black pudding (`AD_CORR`): ALLOW_BARS. Match.
6. Rock mole / metallivorous: ALLOW_BARS. Match.
7. Garter snake (`slithy && !big`): ALLOW_BARS. Match.
8. Python if `bigmonst`: slithy arm false; no rust → no ALLOW_BARS unless another arm. Match C `!bigmonst`.
9. Jackal / cube: no arm → no ALLOW_BARS. Match.
10. Ustuck engulfer + ordinary hero: no ALLOW_BARS even if the monster `passes_bars`. Match.
11. Ustuck + poly’d verysmall/unsolid hero: ALLOW_BARS. Match.
12. Rust + W_NONDIGGABLE bars: `mfndpos` continue. Match.
13. Mole + W_NONDIGGABLE: still a candidate. Match.
14. Hero walking onto bars: still named (`test_move`). Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `AD_RUST`/`AD_CORR` are C enum values, not recorded coordinates. Plain ESM.

## Verification

Journal: private canary **40**/40 (C body+callers; rust/ooze/pudding/mole/xorn/fog/garter; jackal/python/cube skip; ustuck; W_NONDIGGABLE rust vs mole; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a bars-passer `mfndpos`s toward IRONBARS. Cadence this audit: full `sessions` at HEAD `e2aa4dbe` **44**/44 Scr **11405**/11405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. ALLOW_BARS now follows C `passes_bars`, including rust/corr/metallivore/slithy-small/unsolid. The W_NONDIGGABLE `flags` OR is the established JS wall encoding, not a new truncated clone.

Named omits (map, not Must-fix):

1. Hero `hack.c` `test_move` `passes_bars` / still_chewing (`:1024–1036`)
2. `meatmetal`
3. `m_can_break_boulder` still named on ALLOW_ROCK

Do not Must-fix “JS ORs `flags` into `wall_info`.” Do not Must-fix “local `dmgtype` clones remain in other files.” Do not pull `switch_terrain`.

## Callers / RNG ledger

C: `mon_allowflags` (dochug / dogmove / priest) and `mfndpos`. JS `mon.js` same two. Hero `test_move` still named. No RNG in the new functions. Public fortress is not evidence a rust monster path’d onto bars.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: rust/corr/metallivore/slithy-small/unsolid monsters now get ALLOW_BARS like C; hero `test_move` `passes_bars` stays named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1258 `c63ac778`.
