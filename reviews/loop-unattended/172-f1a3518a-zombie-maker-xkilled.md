# Review 172 — f1a3518a — mon.c `zombie_maker` + xkilled `gz.zombify` (D-1210)

## Metadata
- Full / short hash: `f1a3518aa73366cb369849a60a0799cc0e73d5b3` / `f1a3518a`
- Parent: `b3c0d228` (D-1209). This file audits **this SHA only**. Archive row **Addressed:** D-1210 `f1a3518a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 08:50:51 +0200
- D-id: **D-1210**
- Stats: 13 files, +142 / −50 — `js/mon.js` +25; `js/uhitm.js` +17 / −3; comments in `mhitm.js` / `timeout.js`.
- Claims to close: Open queue `mon.c` `zombie_maker` + `gz.zombify` at `make_corpse` (named from D-1202 / review **164**). Not mhitm. `reviews/loop-2026-08-15/` has no unpaid zombify-setter Must-fix.
- JS / map: `mon.js` `zombie_maker`; `uhitm.js` `xkilled` wrap. `c-js-map/data.md`. mhitm `mdamagem` setter still named at this SHA (D-1211 next).
- Prior reviews this SHA claims to close: **164** ACCEPT-WITH-DEBT “`gz.zombify` at `make_corpse` (live Open).”

## Intent vs deliverable

Git subject promises: “Match C mon.c zombie_maker and xkilled gz.zombify around make_corpse so a poly zombie/lich barehand kill queues ZOMBIFY_MON, instead of leaving the producer unset.”

After D-1202, `start_corpse_timeout` already had `game.zombify && zombie_form && !norevive → ZOMBIFY_MON` + `rn1(15,5)`. No producer set the flag. C `mon.c:362–379` `zombie_maker`; `xkilled` `:3619–3624` sets `gz.zombify` around `make_corpse`.

The diff **does** both. It does **not** wrap mhitm `monkilled`. Named. Comments in `make_corpse` / `zombify_mon` say so.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zombie_maker` | C callee, **new** | `:362–379`; mndx not pointer (`mons()` allocates) |
| `xkilled` `game.zombify` wrap | C site, **new** | `:3619–3624` around `make_corpse` |
| `zombie_form` | C callee, **imported** | D-1202; already-S_ZOMBIE → `NON_PM` |
| `make_corpse` / `mkcorpstat` / `start_corpse_timeout` | C callees, **imported** | zombify arm live since D-1202 |
| `youmonst` | C `&gy.youmonst` | `set_uasmon` points `data` at poly form |
| mhitm `monkilled` setter | C sibling, **named omit** | D-1211 |
| `wasinside` skip | C, **named omit** | pre-existing xkilled hole |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**RNG:** this SHA adds **none**. The `rn1(15,5)` die lives in `start_corpse_timeout` (D-1202) and only fires when the new flag is true. `corpse_chance` / treasure `!rn2(6)` unchanged.

## C ↔ JS fidelity

Pinned C (`mon.c:360–379` and `xkilled` `:3617–3624`):

```
boolean zombie_maker(struct monst *mon) {
    if (mon->mcan) return FALSE;
    switch (pm->mlet) {
    case S_ZOMBIE:
        if (pm == &mons[PM_GHOUL] || pm == &mons[PM_SKELETON]) return FALSE;
        return TRUE;
    case S_LICH: return TRUE;
    }
    return FALSE;
}
/* inside !wasinside && corpse_chance: */
gz.zombify = (!gt.thrownobj && !gs.stoned && !uwep
             && zombie_maker(&gy.youmonst)
             && zombie_form(mtmp->data) != NON_PM);
cadaver = make_corpse(...);
gz.zombify = FALSE;
```

Callers of `zombie_maker` in C: `xkilled` (this SHA) and `mdamagem` (D-1211, still named at this parent). No `rn2` in the maker. The `rn1(15,5)` die is **not** this SHA: `mkobj.js:1114–1117` `start_corpse_timeout` already queues `ZOMBIFY_MON` when `game.zombify && zombie_form && !norevive`.

### `zombie_maker` vs `mon.c:362–379`

C: `if (mon->mcan) return FALSE`; switch `pm->mlet`: `S_ZOMBIE` unless `pm == &mons[PM_GHOUL] \|\| PM_SKELETON`; `S_LICH` true; else false.

JS (`mon.js:577–593`): null/`!data` false (C always has a `mon`); `mon.mcan`; `ptr.mlet === 'S_ZOMBIE'` / `'S_LICH'` (this port’s generated mlets, same as `zombie_form`); ghoul/skeleton via `ptr.mndx === pm('GHOUL')` — **mndx is the faithful stand-in**; pointer `=== mons()` would be wrong because `mons()` allocates. Cancelled hero poly: `youmonst.mcan` unset is falsy. Match. `S_ZOMBIE`/`S_LICH` are not hardcoded glyphs; they are the same generated `mlet` strings `zombie_form` already switched on in D-1202.

`set_uasmon` (`polyself.js:443–450`) sets `youmonst.data` / `mnum` from `u.umonnum`. Unpoly tourist is `S_HUMAN` → maker false. Poly zombie/lich → true unless cancelled. That is the hero producer C uses (`zombie_maker(&gy.youmonst)`).

`pm('GHOUL')` / `pm('SKELETON')` are the same mndx helpers `zombie_form` uses. Comparing `ptr === mons('GHOUL')` would fail every time in this port.

### `xkilled` wrap vs `:3617–3624`

C (inside `if (!wasinside && corpse_chance(...))`):

```
gz.zombify = (!gt.thrownobj && !gs.stoned && !uwep
             && zombie_maker(&gy.youmonst)
             && zombie_form(mtmp->data) != NON_PM);
cadaver = make_corpse(...);
gz.zombify = FALSE;
```

JS (`uhitm.js:507–513`): same five conjuncts then `make_corpse` then `false`, inside `corpse_chance` only. Stoned path already `goto cleanup` in C (`gs.stoned` then FALSE); JS `was_stoned` skips the `else if (!nocorpse)` corpse block, so `!game.context?.stoned` on the live arm is redundant like C’s `!gs.stoned` after the goto. `game.context.stoned` is the established `gs.stoned` mapping (same function, petrify arm). `!game.u?.uwep` ≡ `!uwep`.

JS wrap (`uhitm.js:507–513`) is the five conjuncts, `make_corpse`, then `false`, inside `corpse_chance` only. `game.youmonst` is C `&gy.youmonst` after `set_uasmon`. `NON_PM` is the live const.

`wasinside` skip is still named: JS may `make_corpse` (and now maybe zombify) when C would not. Pre-existing xkilled hole, not a new stub of `zombie_maker`.

Anti-pattern grep of this SHA’s `js/` hunks: empty (`FORCE`/`DIAG`/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names). `thrownobj` is a field name, not a recorded coordinate.

### Callee is not a stub

`make_corpse` → `mkcorpstat` (`mkobj.js:2274–2278`): if `game.zombify \|\| special_corpse` then `obj_stop_timers` + `start_corpse_timeout`. That function’s zombify arm (`:1114–1117`) queues `ZOMBIFY_MON` with `rn1(15,5)` when `zombie_form(ptr) !== MON_NON_PM && !norevive`. **Live since D-1202.** This SHA is the **producer**. Do not confuse “flag was unset” with “timer dispatch is a no-op.”

Undead killer of a living species: `make_corpse` `undead_to_corpse` leaves a living-species corpse; `zombie_form(victim.data)` is on the **victim**, so a poly zombie killing a human still sets the flag. C same (`zombie_form(mtmp->data)` of the corpse-to-be). Already-zombie victim: `zombie_form` `NON_PM` → flag false. Ghoul/skeleton maker false. Wielded `uwep` false.

`mondied` (`mhitm.js:1033–1036`) still calls `make_corpse` **without** setting the flag. C `mondied` does not; only `xkilled` and `mdamagem` do. Correct omission at this SHA.

JS `xkilled` still omits C’s `burycorpse ? CORPSTAT_BURIED : CORPSTAT_NONE` on `make_corpse` (`mon.c:3622–3623`) — pre-existing burial flag, not a stub of `zombie_maker`. Treasure `!rn2(6)` (`uhitm.js:504`) is unchanged by this wrap.

### `thrownobj` field (debt, not a stub maker)

C `throwit` (`dothrow.c:1562`) sets `gt.thrownobj = obj` for the flight. JS `dothrow.js` **reads** `game.thrownobj` (`:579`) but this tree has **no** `game.thrownobj =` in `dothrow.js` (monster throws use `game._thrownobj` in `mthrowu.js`; explode sets `game.thrownobj` around hero-kill). A poly-zombie hero who throws their last weapon (uwep already extracted) can see `!thrownobj && !uwep` and queue ZOMBIFY when C would not. C `dothrow.c:1562` `gt.thrownobj = obj` for the flight; JS `dothrow.js:579` **reads** `game.thrownobj` but this tree has **no** `game.thrownobj =` in `dothrow.js` (monster throws use `game._thrownobj` in `mthrowu.js`). The **predicate is C**; the throw tracker is incomplete. Map / later `dothrow` peel — not Must-fix on this SHA (would steal `rot_corpse`). Canary billed “wielded skip,” not throw-kill.

## Hallucinations / overclaim

Subject + D-1210 say poly zombie/lich **barehand** kill queues `ZOMBIFY_MON`. **Maker + xkilled wrap + live `start_corpse_timeout` arm are the hunk.** Stamping **Addressed:** D-1210 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C mhitm `gz.zombify`” (D-1211) or “Match C `wasinside`” or “Match C `dothrow` `gt.thrownobj`.” Say so: barehand melee producer is C; throw-in-flight tracker is still thin.

## Density

One C function + the one `xkilled` site that uses it. ~40 lines of JS. Right size. mhitm correctly left for the next Open.

## Branch-by-branch confirm

| Case | C | JS after |
|------|---|---------|
| unpoly tourist melee | maker false | **same** |
| poly zombie, `!uwep`, human victim | flag true; `rn1(15,5)` | **same** |
| poly lich, kobold victim | `KOBOLD_ZOMBIE` form | **same** (`zombie_form` D-1202) |
| ghoul / skeleton / cancelled | maker false | **same** (mndx / `mcan`) |
| already zombie victim | `zombie_form` NON_PM | **same** |
| `uwep` set | flag false | **same** |
| stoned `xkilled` | no corpse block | **same** (`was_stoned`) |
| mhitm claw kill | unset at this SHA | **named** (D-1211) |

No extra die on the wrap itself.

## Verification

Journal: private canary **36**/36 (maker truth table; xkilled assignment; human corpse `when` in 5..19; wielded skip); green+strict seed8000/0900; cohort **12**/12 + strict lengths. **Public-unhit** unless a public seed poly-zombies and barehand-kills. Admit that. Cadence at `fc314871` **44**/44 does not prove the arm.

`corpse_chance` still runs before the wrap (C same). This SHA does not add or skip that die. `youmonst.mcan` unset is falsy, matching an uncancelled hero. `set_uasmon` (`polyself.js:443–450`) is the producer of `youmonst.data` for poly form.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `rot_corpse` or D-1211 which already shipped).

C-wrong / debt remaining (map, not new Must-fix):

1. Hero `throwit` should set/clear `game.thrownobj` like `dothrow.c:1562` / `throwit_return` so xkilled’s `!thrownobj` is not vacuously true.
2. `xkilled` `wasinside` skip around corpse + zombify (`mon.c:3617`).

Named: mhitm setter (D-1211, next SHA). `disturb_buried_zombies`. `set_corpsenm` `oeaten` rescale (review **164**).

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: poly zombie/lich barehand `xkilled` now sets C’s `gz.zombify` around live `make_corpse`; mhitm and `dothrow` `thrownobj` stay named, not Must-fix.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1210 `f1a3518a`. Next port in this window popped Open mhitm zombify. Not `rot_corpse`, not `wasinside`.
