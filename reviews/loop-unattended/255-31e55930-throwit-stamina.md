# Review 255 — 31e55930 — dothrow.c throwit stamina drop (D-1293)

## Metadata
- Full / short hash: `31e55930ed423b42e7bd59298415b8d6af9f6400` / `31e55930`
- Parent: `2e893032` (D-1292). This file audits **this SHA only**. Archive row **Addressed:** D-1293 `31e55930` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 17:34:13 +0200
- D-id: **D-1293**
- Stats: 9 files, +112 / −38 — `js/dothrow.js` +27 / −5.
- Claims to close: Open `dothrow.c` throwit stamina (named from D-1283 / reviews **244** / **245** / **254**). Not slip. `reviews/loop-2026-08-15/` has no unpaid stamina Must-fix.
- JS / map: `dothrow.js` `throwit`; live `invent.js` `calc_capacity`; `c-js-map/turns.md`. steed potion / boomhit / `sho_obj_return_to_u` named.
- Prior reviews this SHA claims to close: **254** named omit stamina after slip before thrownobj.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit so a low-HP encumbered heavy throw drops at the hero's feet, instead of always flying the chosen direction.”

C `throwit` (`dothrow.c:1549–1560`) **after** slip, **before** `gt.thrownobj`:

```
    if ((u.dx || u.dy || (u.dz < 1))
        && calc_capacity((int) obj->owt) > SLT_ENCUMBER
        && (Upolyd ? (u.mh < 5 && u.mh != u.mhmax)
                   : (u.uhp < 10 && u.uhp != u.uhpmax))
        && obj->owt > (unsigned) ((Upolyd ? u.mh : u.uhp) * 2)
        && !Is_airlevel(&u.uz)) {
        You("have so little stamina, %s drops from your grasp.",
            the(xname(obj)));
        exercise(A_CON, FALSE);
        u.dx = u.dy = 0;
        u.dz = 1;
    }
```

`calc_capacity` (`hack.c:4372–4382`): `inv_weight()+xtra_wt`, `cap=(wt*2/wc)+1`. Object already `freeinv`’d so extra `owt` is the thrown weight. `You` expands to `pline("You "…)`. Then thrownobj / AutoReturn / swallow / `u.dz` hitfloor. Down-only (`dz>=1` and no dx/dy) skips the `if`. Slip-to-feet already has `dz=1` and zero dx/dy, so stamina would not run on that vector.

Old JS: named omit after D-1292; thrownobj used getdir or slipped vector.

The diff **does** the five-conjunct `if`, live `calc_capacity(owt)`, `You` via `pline`, `exercise(A_CON,false)`, and `dx=dy=0` `dz=1`. It does **not** port steed `rn2(6)`, boomhit, or `sho_obj_return_to_u`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| stamina `if` | C `:1549–1560`, **new** | after slip, before thrownobj |
| `calc_capacity` | C `hack.c:4372`, **imported live** | `invent.js`; extra `owt` |
| `SLT_ENCUMBER` | C `1`, **imported** | `const.js` |
| `Upolyd` | C `you.h`, **imported live** | `mtimedone > 0` |
| `Is_airlevel` | C dungeon macro, **imported live** | `Is_airlevel(u.uz)` |
| `the`/`xname` | C `objnam.c`, **imported live** | |
| `exercise` | C `attrib.c:489`, **imported live** | CON dec `−rn2(2)`; Upolyd skip |
| `You` | C macro, **expanded `pline`** | same string |
| steed / boomhit | C `u.dz>0` / boom, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG** only inside live `exercise` (`rn2(2)` on CON dec; C also `encumber_msg` after STR/CON — JS `exercise` still omits that trailing call, pre-existing on dopush too).

## C ↔ JS fidelity

JS copies short-circuit order: vector (`dx||dy||dz<1`) then `calc_capacity(owt)>SLT` then poly mh / uhp gates (`<5`/`<10` **and** `!== max`) then `owt > hp*2` then `!Is_airlevel`. `throw_obj` still `freeinv`s first, so extra `owt` is not double-counted. `Math.trunc((wt*2)/wc)+1` matches C integer `wt*2/gw.wc`. Full HP, `uhp==uhpmax`, `owt==hp*2` (not `>`), empty leftover (`!dx&&!dy&&dz>=1`), and airlevel all skip. Upolyd uses `mh`/`mhmax`. Upward (`dz<0`) can still drop (C `dz<1`). After the drop, `u.dz===1` takes the existing hitfloor arm, not ceiling-return (`dz<0 && returning && !impaired`).

This is **not** “Match C dispatch, callee is a stub.” `calc_capacity`, `exercise`, `Is_airlevel`, `the`/`xname` are live. Expanding `You` to `pline("You have so little stamina, …")` matches the macro, not a missing You() engine.

`exercise` still skips `encumber_msg()` that C `:516–517` runs for STR/CON. That trailing call is a pre-existing `exercise` omit (dopush `exercise(A_STR,TRUE)` already lives without it). It is **not** a stamina-dispatch stub. Do not Must-fix it on this SHA.

## Hallucinations / overclaim

Subject + D-1293 say a low-HP encumbered heavy throw drops at the feet. **The five-conjunct `if` is the hunk.** Stamping **Addressed:** D-1293 is fair. Do **not** stamp “Match C steed potionhit `rn2(6)`.” Do **not** stamp “Match C boomhit.” Do **not** stamp “Match C `exercise` `encumber_msg`.” Do **not** stamp “Match C unsigned `owt` vs negative HP.”

## Density

One C `if` immediately after the D-1292 slip site, plus the callees that arm already required. ~15 JS lines. Did not glue steed. Right size.

## Branch-by-branch confirm

1. Low HP, load>SLT, heavy, east: You drop + CON exercise + hitfloor. Match `:1549–1560`.
2. Full HP / `uhp==max`: skip. Match `!= max`.
3. `owt == hp*2`: skip (`>`). Match.
4. Down-only: skip (`dz<1` false, no dx/dy). Match.
5. Slip-to-0,0: skip (dz already 1). Match interaction with D-1292.
6. Upward + stamina: becomes `dz=1` hitfloor, not toss_up. Match `dz<1` then force down.
7. Upolyd `mh<5` and `mh!=mhmax`: uses mh. Match.
8. Airlevel: skip. Match last conjunct.
9. After drop, AutoReturn ceiling gate does not fire (`dz` not `<0`). Match.
10. Steed / boomhit still skipped. Named. Public-unhit unless a session throws while HP is low and encumbered above SLT with a heavy object.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. HP/owt thresholds are C’s, not recorded coords.

## Verification

Journal: private canary **15**/15; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws while HP is low and encumbered above SLT with a heavy object. Cadence this audit: full `sessions` at HEAD `c37bd683` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Order after slip, five conjuncts, live `calc_capacity`/`exercise`/`Is_airlevel`, and force-down match C `:1549–1560`.

Named omits (map, not Must-fix):

1. steed potionhit `rn2(6)` on `u.dz>0`
2. boomhit; `sho_obj_return_to_u` / tethered `tmp_at`
3. throw_gold swallow; thitmonst vanish; objsplit unsplit
4. `exercise` trailing `encumber_msg` (pre-existing callee omit)

Do not Must-fix “`You` expanded to `pline`.” Do not Must-fix “`Upolyd` uses `>0` not `!=0`.” Do not pull next_boulder this SHA.

## Callers / RNG ledger

C: `throw_obj` after `freeinv`. JS same. New: `exercise` `rn2(2)` when the `if` fires and not Upolyd. Public fortress is not evidence a heavy dart dropped from low HP.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: low-HP encumbered heavy throws now drop at the feet after slip like C; steed/boomhit stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1293 `31e55930`.
