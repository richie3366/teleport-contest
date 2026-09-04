# Review 780 — 9b42dedf — muse.c use_misc poly / bag / you_aggravate (D-1811)

## Metadata
- Full / short hash: `9b42dedf94ea4f193ec4cf3669627ab2ed28d2e8` / `9b42dedf`
- Parent: `5009dae1` (D-1810 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 06:53:09 +0200
- D-id: **D-1811**
- Stats: `js/muse.js` +308/−31; mkobj/monmove/teleport/trap export +2 each. `js/` insertions **316** >250 → ceiling **450**. Band **80–350**.
- Claims to close: Open `muse.c` `use_misc` remaining poly / bag / `you_aggravate`. Not `really_done`.
- JS / map: `muse.js` find+use remaining arms; four C-callee exports. `c-js-map/turns.md`. Archive **Addressed:** D-1811 `9b42dedf`.

## Intent vs deliverable

Git subject promises: Match C `muse.c` `use_misc` so remaining poly, bag, and `you_aggravate` actually run, instead of gain-level-plus-invis-plus-whip-plus-speed with default return 0.

`node scripts/csym.mjs use_misc` → `muse.c:2382–2626`. `find_misc` `:2094–2245`. `muse_newcham_mon` `:2248–2261`. `mloot_container` `:2263–2378`. `you_aggravate` `:2630–2651`. `removed_from_icebox` `pickup.c:2780–2799`. `--callers use_misc`: `monmove.c:798`. `--callers you_aggravate`: `muse.c:2478` (this peel). `--callers mloot_container`: `muse.c:2548`.

Parent: those four `case`s fell through to `return 0`; `if (!m.misc) return 0` also skipped object-less `MUSE_POLY_TRAP`. The diff **does** select and run poly trap/wand/potion, bag loot, and cursed-invis aggravate. Subject is delivered.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `use_misc` / `find_misc` | LIVE repaired | POLY_TRAP before `nohands` |
| `muse_newcham_mon` | LIVE local | C `staticfn`; dragon armor inlined |
| `mloot_container` | LIVE local | C `staticfn`; cursed mbag **OMIT named** (C returns 0) |
| `you_aggravate` | LIVE local | C `staticfn`; CLIPPING **OMIT named** |
| `removed_from_icebox` | CLONE | C `pickup.c`; ice-troll `data` vs `mndx` named |
| `newcham` / `rndmonst` | LIVE | `makemon.js` |
| `can_carry` | LIVE | export `monmove.js` (dogmove clone remains) |
| `wearing_iron_shoes` | LIVE | export `trap.js` |
| `unconscious` | LIVE | export `teleport.js` (eat.js clone remains) |
| `start_corpse_timeout` / `start_glob_timeout` / `get_mtraits` | LIVE | `mkobj.js` |
| `SchroedingersBox` | LIVE | `pickup.js` |

`node scripts/sym.mjs` (clone → import / new):

```
use_misc         js/muse.js:2433   ASYNC
find_misc        js/muse.js:1747   sync
you_aggravate    NOT EXPORTED — 1 LOCAL muse.js:2405
mloot_container  NOT EXPORTED — 1 LOCAL muse.js:2321
muse_newcham_mon NOT EXPORTED — 1 LOCAL muse.js:2303
removed_from_icebox NOT EXPORTED — 1 LOCAL muse.js:2284 (C pickup.c)
newcham          js/makemon.js:1493   sync
can_carry        js/monmove.js:242   sync  !! ALSO dogmove.js:253
start_corpse_timeout js/mkobj.js:1376   sync
wearing_iron_shoes js/trap.js:1185   sync
unconscious      js/teleport.js:1682   sync  !! ALSO eat.js:432
SchroedingersBox js/pickup.js:178   !! ALSO end.js / zap.js
```

`--can muse.js` → pickup / makemon / trap / monmove / mkobj / timeout / teleport: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**`find_misc`.** Animal/mindless/swallow/`dist2>36`. Poly-trap walk **before** `nohands`: `!stuck && !immobile && !mtrapped && cham==NON_PM && difficulty<6`; `NODIAG` ≡ `pmidx !== PM_GRID_BUG` (`hack.h:1414`); boulder/`onscary`; `POLY_TRAP && !wearing_iron_shoes`. Then invent last-wins: gain-level, whip `!rn2(5)`, invis, speed, **new** poly wand/potion (`cham==NON_PM && difficulty<6`), bag `Is_container && !=BAG_OF_TRICKS && !rn2(5) && !SchroedingersBox && !has_misc && Has_contents && !olocked && !otrapped`. **Match the live selection.** Whip/invis/speed still use per-check `!==` rather than C `nomore` `continue` (skip rest of **this** object) — **named** in the JS header.

**Poly wand/potion (`:2500–2518`).** `mzapwand`/`mquaffmsg` + `newcham(muse_newcham_mon, NC_VIA_WAND_OR_SPELL|NC_SHOW_MSG)` vs `NC_SHOW_MSG`. Dragon scales/mail: `GRAY..YELLOW` + `PM_GRAY_DRAGON` offset ≡ `Dragon_scales_to_pm` / `Dragon_mail_to_pm`. Else `rndmonst()`. **Match.**

**POLY_TRAP (`:2519–2546`).** `t_at` / `seetrap` / `Some_Monnam` jump / `remove_monster` / `place_monster` / `maybe_unhide_at` / `worm_move` / `newcham(null, NC_SHOW_MSG)`. JS `if (!t) return 0` is extra vs C null deref. **Match the move+poly.**

**BAG (`:2547–2548`).** `mloot_container`. `rn2(10)` buckets 1/2/3/4 **match** C switch. `rn2(nitems+1)` throttle; extract; `can_carry` → icebox thaw + `mpickobj` else `add_to_container`. Cursed mbag **returns 0** as C FIXME. **Match.**

**`you_aggravate` (`:2630–2651`).** pline / `cls` / `mon_to_glyph(..., rn2_on_display_rng)` / `display_self` / `You_feel` / map wait / `docrt` / `unconscious` → `multi=-1`. CLIPPING **named**. C `display_nhwindow(WIN_MAP, TRUE)` → JS `flush_screen(1)` + `nhgetch` (**named** in the function comment). **Match the aggravate path that can fire.**

**Callee closure.** `newcham` LIVE (`makemon.js:1493`). `can_carry` / `wearing_iron_shoes` / `unconscious` / `start_corpse_timeout` LIVE exports. No silent stub in a live arm `find_misc` can select.

## Hallucinations / overclaim

Do **not** stamp “Match C `nomore()` on whip/invis/speed” — those still `!==` on this object. Do **not** stamp “Match C CLIPPING `cliparound`.” Do **not** stamp “Match C cursed bag-of-holding explosion” (C also returns 0). Do **not** add a second `removed_from_icebox` in `pickup.js` without deleting this clone. Public sessions rarely hit monster poly/bag; **public-unhit**.

## Density

§2b: remaining `use_misc` + the `find_misc` selection those arms need. +316. Did **not** glue `really_done`. Right size.

## Verification

D-log: save-oracle skip; find_misc probe; green + cohort 7/7. This audit: `csym` `:2382–2626` / `:2094–2245` / `:2263–2378` / `:2630–2651` vs HEAD `js/muse.js:1747–1871` and `:2433+`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: cursed mbag FIXME; CLIPPING; ice-troll `get_mtraits` `data` pointer vs `mndx`; leftover `can_carry` / `unconscious` / `SchroedingersBox` clones; `nomore` `!==` on already-ported whip/invis/speed.

Verdict: **ACCEPT-WITH-DEBT**
