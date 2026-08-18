# Review 198 — 5c860b0e — options.c `optlist` `mon_movement` → `a11y.mon_movement` (D-1236)

## Metadata
- Full / short hash: `5c860b0e1ce3a4e03eb22be8d12d48e65726fea7` / `5c860b0e`
- Parent: `f631610d` (D-1235). This file audits **this SHA only**. Archive row **Addressed:** D-1236 `5c860b0e` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 23:10:41 +0200
- D-id: **D-1236**
- Stats: 12 files, +130 / −47 — `js/options.js` +27 / −5; `js/jsmain.js` +13 / −4; `js/hack.js` / `js/monmove.js` comments.
- Claims to close: Open `options.c` `optlist` `&a11y.mon_movement` (named from D-1228 / D-1218 / D-1219 / D-1235 / review **190**). Not spot_monsters. `reviews/loop-2026-08-15/` has no unpaid movement-option Must-fix.
- JS / map: `options.js` `DOSET_BOOL_ADDR` + `parseNethackrc`; `jsmain.js` rc apply. `c-js-map/startup.md`. rolling-boulder TELEP `pline_xy` still named at this SHA (D-1237 next).
- Prior reviews this SHA claims to close: **190** named omit optlist `&a11y.mon_movement` (still `flags` at D-1228).

## Intent vs deliverable

Git subject promises: “Match C options.c optlist mon_movement so doset and OPTIONS= write a11y.mon_movement, instead of storing flags.mon_movement that msg_mon_movement never reads.”

After D-1228, `msg_mon_movement` reads `game.a11y.mon_movement` and dest-`pline_xy`. JS doset/`OPTIONS=` still wrote `flags.mon_movement`, so On never reached the writer. C `optlist.h:493–494` `NHOPTB(mon_movement, … Off, …, &a11y.mon_movement)`. `optfn_boolean` `:5286` `*(addr)=!negated`. There is **no** `case opt_mon_movement` in either after-change switch. `opt_initial` returns before the in-game switch. Unlike `opt_accessiblemsg`, toggling does **not** zero `msg_loc`.

The diff **does** retarget `DOSET_BOOL_ADDR.mon_movement` to `{ obj: 'a11y', key: 'mon_movement' }`, parse uncoloned + colon true/yes/on/1, and apply rc in jsmain. It does **not** pull rolling-boulder TELEP, `worm_move`, or remaining `pline_mon`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `DOSET_BOOL_ADDR.mon_movement` | C addr, **fixed** | was `flags`; now `a11y.mon_movement` |
| `parse_a11y_mon_movement` | rc bag, **new** | `result.a11y.mon_movement` |
| `optfn_boolean_word` / `optfn_boolean_do_set` | C, **already live** | D-1218; no new after-change arm |
| jsmain rc apply | C config → `a11y`, **wired** | only if boolean present |
| `msg_mon_movement` | C callee, **already live** | D-1228 dest `pline_xy`; not a stub |
| `flags.mon_movement` | **removed** from this addr | leftover flags ignored by consume |
| rolling-boulder TELEP `pline_xy` | **named omit** at this SHA | D-1237 |
| `worm_move` | C after msg, **named omit** | already named at D-1228 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No RNG.**

## C ↔ JS fidelity

Pinned C (`optlist.h:493–494` + `options.c:5286` + `:5327–5328`):

```
    NHOPTB(mon_movement, Advanced, 0, opt_in, set_in_game,
           Off, Yes, No, No, NoAlias, &a11y.mon_movement, Term_False,
           "message when hero sees monster movement")
        *(allopt[optidx].addr) = !negated;
        if (go.opt_initial)
            return optn_ok;
```

JS doset: `game.a11y.mon_movement = !negated`. Name and field are both `mon_movement` (unlike spot_monsters → `mon_notices`). `doset_bool_value` / menu `[true]/[false]` now track the bag `msg_mon_movement` reads.

No after-change: helper still only zeros loc for `accessiblemsg`. `mon_movement` does not. Match C (no `case opt_mon_movement`). Config: jsmain writes without toggle pline / loc zero. Match `opt_initial`.

Boolean words / negated-with-param / valok No: same clone as D-1218 / D-1235. `"t"` On. Invalid colon skip. Uncoloned `OPTIONS=mon_movement` / `!mon_movement` write `!negated`. Default Off: `a11y_state()` `mon_movement: false`. Public rc does not enable it — dest closer/further lines stay off.

**This is not “Match C dispatch, callee is a stub.”** D-1228 already emits dest `pline_xy` (not `pline_mon`) when On + `canspotmon` + `mspotted`. Review **190** said the writer was live and the **addr** was the named omit. This SHA is that addr. Leftover `flags.mon_movement` cannot enable dest lines.

Do not wrap `msg_mon_movement` as `pline_mon` (C uses `nix,niy`; NOTES / review **190**). This SHA does not.

jsmain: `typeof opts.a11y?.mon_movement === 'boolean'` then assign. Empty bag does not write `undefined`. Match.

`Term_False`: same as D-1235 — value from the a11y bag, not a second store.

`mspotted` still comes from `notice_mon` when `a11y.mon_notices` is On (D-1235 just wired that addr). Default both Off. C requires **already** spotted; first notice is `notice_mon`, not this closer/further line. Turning only `mon_movement` On without `spot_monsters` still needs `mspotted` from some prior notice_mon. C same (two independent optlist bits). Match. Do not Must-fix “mon_movement should set mspotted.”

## Hallucinations / overclaim

Subject + D-1236 say doset/`OPTIONS=` write `a11y.mon_movement` so `msg_mon_movement` can see On. **Addr + words + jsmain are the hunk.** Stamping **Addressed:** D-1236 is fair. Do **not** stamp “Match C rolling-boulder TELEP `pline_xy`” or “Match C `worm_move`” or “Match C remaining `pline_mon`.”

## Density

One option addr, sibling of D-1235. Queue forbids combining Open rows; §2b would prefer one optlist cluster. Peel-thin but queue-correct. Did not glue TELEP traps.

## Branch-by-branch confirm

1. `OPTIONS=mon_movement` → `a11y.mon_movement === true`. Match.
2. `OPTIONS=!mon_movement` → false. Match.
3. Colon `true`/`yes`/`on`/`1`/`t` → true. Match.
4. Colon `false`/`no`/`off`/`0` → false. Match.
5. `OPTIONS=!mon_movement:true` → skip. Match C silenterr net.
6. Invalid colon + valok No → skip. Match.
7. doset toggle: write a11y, **no** `msg_loc` zero. Match.
8. Config/rc: write, no toggle pline. Match `opt_initial`.
9. Default omit: Off; `msg_mon_movement` returns at the three-part gate. Match public.
10. Leftover `flags.mon_movement` does not enable dest `pline_xy`. Match consume.
11. `spot_monsters` still `a11y.mon_notices` (D-1235). Unchanged this SHA.
12. Writer still `pline_xy(nix,niy)`, not `pline_mon`. Match D-1228 / C `:32–48`.

Call-for-call RNG: **none**.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **35**/35 (OPTIONS= On/Off/combo; colon words including `t`; negated/invalid colon not flags; doset addr; no msg_loc zero; `opt_initial`; leftover flags ignored; jsmain-like apply); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `mon_movement` is On (default Off). Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. The addr now matches C `NHOPTB` `&a11y.mon_movement`; dest `pline_xy` is live.

Named omits (map, not Must-fix):

1. rolling-boulder TELEP `pline_xy` (D-1237 at next SHA)
2. `worm_move` after `msg_mon_movement`
3. Remaining `optfn_boolean` after-change arms / `config_error_add` strings
4. Remaining uhitm/worn/trap `pline_mon`

Do not Must-fix “force FALSE into flags as well.” C does not write `flags.mon_movement` from this table (`flag.h` may still declare a field; the option table does not point there).

Do not restore `DOSET_BOOL_ADDR.mon_movement` → `flags`.

## Callers / RNG ledger

C this addr: doset / OPTIONS= / rc. JS same. Consume: `msg_mon_movement` after `place_monster` (D-1228). Public fortress is not evidence a closer/further line printed.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: doset/`OPTIONS=` now write `a11y.mon_movement` like C `optlist.h`, so live dest `pline_xy` can see On; default Off stays silent; rolling-boulder TELEP was still named at this SHA.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1236 `5c860b0e`.
