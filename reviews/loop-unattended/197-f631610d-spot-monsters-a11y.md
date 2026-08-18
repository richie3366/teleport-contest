# Review 197 — f631610d — options.c `optlist` `spot_monsters` → `a11y.mon_notices` (D-1235)

## Metadata
- Full / short hash: `f631610db4a057236658f25c6e3914b3c08d3a04` / `f631610d`
- Parent: `e0ea385e` (D-1234). This file audits **this SHA only**. Archive row **Addressed:** D-1235 `f631610d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 23:04:31 +0200
- D-id: **D-1235**
- Stats: 11 files, +135 / −46 — `js/options.js` +25 / −3; `js/jsmain.js` +14 / −5; `js/hack.js` comments.
- Claims to close: Open `options.c` `optlist` `&a11y.spot_monsters` (queue wording; C addr is `&a11y.mon_notices`; named from D-1142 / D-1200 / D-1218 / D-1219 / review **180** / **181**). Not glyph_updates. `reviews/loop-2026-08-15/` has no unpaid spot_monsters Must-fix.
- JS / map: `options.js` `DOSET_BOOL_ADDR` + `parseNethackrc`; `jsmain.js` rc apply. `c-js-map/startup.md`. `mon_movement` addr still named at this SHA (D-1236 next).
- Prior reviews this SHA claims to close: **180** named omit `spot_monsters` → `&a11y.mon_notices`.

## Intent vs deliverable

Git subject promises: “Match C options.c optlist spot_monsters so doset and OPTIONS= write a11y.mon_notices, instead of storing flags.spot_monsters that notice_mon never reads.”

After D-1142, `notice_mon` / `notice_all_mons` read `game.a11y.mon_notices`. JS doset/`OPTIONS=` still wrote `flags.spot_monsters`, so On never reached consume. C `optlist.h:708–710` `NHOPTB(spot_monsters, … Off, …, &a11y.mon_notices)`. `optfn_boolean` (`options.c:5286`) `*(addr)=!negated`. There is **no** `case opt_spot_monsters` in either after-change switch (`:5289` / `:5330`); `opt_initial` returns before the in-game switch (`:5327–5328`). Unlike `opt_accessiblemsg`, toggling does **not** zero `msg_loc`.

The diff **does** retarget `DOSET_BOOL_ADDR.spot_monsters` to `{ obj: 'a11y', key: 'mon_notices' }`, parse uncoloned `OPTIONS=spot_monsters` / `!spot_monsters` and colon true/yes/on/1, and apply rc in jsmain. It does **not** wire `mon_movement`, add an after-change arm, or pull vision.c `notice_all_mons` callers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `DOSET_BOOL_ADDR.spot_monsters` | C addr, **fixed** | was `flags`; now `a11y.mon_notices` |
| `parse_a11y_mon_notices` | rc bag, **new** | `result.a11y.mon_notices` |
| `optfn_boolean_word` | C `strncmpi`, **already live** | D-1218 clone; not reimplemented |
| `optfn_boolean_do_set` | C do_set, **already live** | no new after-change arm |
| jsmain rc apply | C config → `a11y`, **wired** | only if boolean present |
| `notice_mon` / `notice_all_mons` | C callee, **already live** | D-1142; not a stub |
| `flags.spot_monsters` | **removed** from this addr | leftover flags ignored by consume |
| `mon_movement` addr | **named omit** at this SHA | D-1236 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No RNG.**

## C ↔ JS fidelity

Pinned C (`optlist.h:708–710` + `options.c:5286` + `:5327–5328`):

```
    NHOPTB(spot_monsters, Advanced, 0, opt_in, set_in_game,
           Off, Yes, No, No, NoAlias, &a11y.mon_notices, Term_False,
           "message when hero spots a monster")
        *(allopt[optidx].addr) = !negated;
        if (go.opt_initial)
            return optn_ok;
```

JS doset: `game.a11y.mon_notices = !negated` via the shared helper. Name `spot_monsters` (optlist) vs field `mon_notices` (`flag.h` `struct accessibility_data`) — C table does that remap; JS addr key is the C field. `doset_bool_value` / `#optionsfull` `[true]/[false]` now read the same bag `notice_mon` reads. Before this SHA the menu could show On while consume stayed Off.

No after-change: JS helper only zeros `msg_loc` when `name === 'accessiblemsg'`. `spot_monsters` does not. Match C (no `case opt_spot_monsters`; accessiblemsg is `:5428–5430` only). Config/`opt_initial`: jsmain writes without a toggle pline and without loc zero. Match.

Boolean words: same D-1218 `optfn_boolean_word` (`true`/`yes`/`on`/`1`, `false`/`no`/`off`/`0`, `"t"` On). Negated-with-param: JS `if (negated) continue` vs C `config_error` + `optn_silenterr`. Net: do not write the addr. Named thin clone of `config_error_add`, not a C-wrong of the addr. valok No: invalid word `parsed == null) continue`. Match silent skip.

Uncoloned `OPTIONS=spot_monsters` / `!spot_monsters`: boolean branch `value = !negated` then `parse_a11y_mon_notices`. Match `*(addr)=!negated`. Default Off: `a11y_state()` still `mon_notices: false`. rc omit leaves Off. Match `optlist.h` Off. Public `.nethackrc` does not enable it — scored screens stay unprefixed You-see.

**This is not “Match C dispatch, callee is a stub.”** `notice_mon` already prints `You see/notice` when On + `canspotmon` + `!mspotted`. The claimed envelope is the **addr**. Leftover `flags.spot_monsters` cannot enable catch-up (`notice_mon` does not read `flags`).

jsmain: `typeof opts.a11y?.mon_notices === 'boolean'` then assign. Empty `a11y: {}` does not overwrite with `undefined`. Match “only if the rc mentioned it.”

`Term_False` is the curses/tty termcap default helper, not a second store. JS has no Term_False; doset_bool_term still shows true/false from the a11y bag. Same as D-1218 for accessiblemsg.

On reset: `notice_all_mons(TRUE)` still clears `mspotted` when `!canspotmon` (D-1142). Toggling the option On does not itself walk fmon — C has no such after-change arm. Catch-up is the existing `notice_mon_on` / `notice_all_mons` callers (newgame / `goto_level` / `teleds`). Match “no after-change arm.”

## Hallucinations / overclaim

Subject + D-1235 say doset/`OPTIONS=` write `a11y.mon_notices` so `notice_mon` can see On. **Addr + words + jsmain are the hunk.** Stamping **Addressed:** D-1235 is fair. Do **not** stamp “Match C `mon_movement` addr” (next SHA) or “Match C every `optfn_boolean` after-change arm” or “Match C vision.c `notice_all_mons` from `vision_recalc`.”

## Density

One option addr + the C `optfn_boolean` bits that option needs (words, initial vs in-game, no loc zero). Sibling of `mon_movement` (D-1236). Queue forbids combining Open rows; §2b would prefer one optlist cluster. Peel-thin but queue-correct, same shape as D-1218. Did not glue `msg_mon_movement`.

## Branch-by-branch confirm

1. `OPTIONS=spot_monsters` → `a11y.mon_notices === true`. Match.
2. `OPTIONS=!spot_monsters` → false. Match.
3. `OPTIONS=spot_monsters:true` / `yes` / `on` / `1` / `t` → true. Match.
4. `OPTIONS=spot_monsters:false` / `no` / `off` / `0` → false. Match.
5. `OPTIONS=!spot_monsters:true` → skip (no set). Match C silenterr net.
6. `OPTIONS=spot_monsters:foo` + valok No → skip. Match.
7. doset toggle: write a11y, **no** `msg_loc` zero, then existing toggle pline. Match.
8. Config/rc: write, no loc zero, no toggle pline. Match `opt_initial`.
9. Default omit: Off; `notice_mon` returns immediately. Match public.
10. Leftover `flags.spot_monsters` does not enable You-see. Match consume.
11. `accessiblemsg` loc-zero arm unchanged. Match C separate case.
12. `mon_movement` still `flags` at this SHA. **Named.**

Call-for-call RNG: **none**. `optfn_boolean` has no `rn2`. `notice_mon` has no RNG.

## Anti-pattern / Rule #2 (this SHA `js/`)

`git show f631610d -- js/` has no banned gates. `AUTOUNLOCK_FORCE` in options.js is pre-existing, not this SHA. Plain ESM.

## Verification

Journal: private canary **36**/36 (OPTIONS= On/Off/combo; colon words including `t`; negated/invalid colon not flags; doset addr; no msg_loc zero; `opt_initial`; leftover flags ignored; On reset clears `mspotted` when `!canspotmon`; Off leaves mspotted; jsmain-like apply); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `spot_monsters` is On (default Off). seed0007 `O` still shows `[false]`. Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. The addr now matches C `NHOPTB` `&a11y.mon_notices`; consume is live.

Named omits (map, not Must-fix):

1. `mon_movement` → `&a11y.mon_movement` (D-1236 at next SHA)
2. Remaining `optfn_boolean` after-change arms (lit_corridor, color redraw, …)
3. C `config_error_add` strings for negated-with-param / invalid word
4. vision.c `notice_all_mons` caller

Do not Must-fix “config should zero `msg_loc`.” C `opt_initial` returns first, and this option has no loc arm even in-game.

Do not Must-fix “`"t"` should not parse as true.” C `strncmpi(..., ln)` with `ln=1` does.

## Callers / RNG ledger

C this addr: doset / OPTIONS= / rc. JS same three. Consume: `notice_mon` / `notice_all_mons` (already). Public fortress is not evidence You-see fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: doset/`OPTIONS=` now write `a11y.mon_notices` like C `optlist.h`, so live `notice_mon` can see On; default Off stays silent; `mon_movement` addr was still named at this SHA.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1235 `f631610d`.
