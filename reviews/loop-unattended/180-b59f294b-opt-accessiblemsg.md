# Review 180 — b59f294b — options.c `opt_accessiblemsg` → `a11y.accessiblemsg` (D-1218)

## Metadata
- Full / short hash: `b59f294b8adace1cabcce1035340328ecbbe09ac` / `b59f294b`
- Parent: `dc34d705` (D-1217). This file audits **this SHA only**. Archive row **Addressed:** D-1218 `b59f294b` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 12:05:09 +0200
- D-id: **D-1218**
- Stats: 14 files, +210 / −70 — `js/options.js` +87 / −12; `js/jsmain.js` +8; comments in display/hack.
- Claims to close: Open queue `options.c` `opt_accessiblemsg` wire `a11y.accessiblemsg` (named from D-1207 / review **169** / **178**). Not dolookaround. `reviews/loop-2026-08-15/` has no unpaid accessiblemsg Must-fix.
- JS / map: `options.js` `DOSET_BOOL_ADDR` + `parseNethackrc` + `optfn_boolean_do_set`; `jsmain.js` rc apply. `c-js-map/startup.md`. `spot_monsters`/`mon_movement`/`glyph_updates` addr still named at this SHA. Next Open was `show_glyph_change`.
- Prior reviews this SHA claims to close: **169** / **178** Actionable “`opt_accessiblemsg` wire `a11y.accessiblemsg` (already Open).”

## Intent vs deliverable

Git subject promises: “Match C options.c opt_accessiblemsg so doset and OPTIONS= write a11y.accessiblemsg and in-game toggles zero msg_loc, instead of storing flags.accessiblemsg that vpline never reads.”

After D-1207, `vpline` prefixes from `game.a11y.accessiblemsg`. JS doset/`OPTIONS=` still wrote `flags.accessiblemsg`, so On never reached consume. C `optlist.h:140–142` `NHOPTB(accessiblemsg, … Off, …, &a11y.accessiblemsg)`. `optfn_boolean` (`options.c:5286`) `*(addr) = !negated`; in-game (`:5428–5430`) `opt_accessiblemsg` zeros `a11y.msg_loc`; then (`:5438–5440`) toggle pline.

The diff **does** retarget `DOSET_BOOL_ADDR.accessiblemsg` to `{ obj: 'a11y', key: 'accessiblemsg' }`, parse uncoloned `OPTIONS=accessiblemsg` / `!accessiblemsg` and colon true/yes/on/1, apply rc in jsmain, and zero `msg_loc` on in-game doset before the toggle pline. It does **not** wire `spot_monsters`/`mention_map`/`mon_movement`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `DOSET_BOOL_ADDR.accessiblemsg` | C addr, **fixed** | was `flags`; now `a11y.accessiblemsg` |
| `optfn_boolean_do_set` | C `optfn_boolean` do_set, **new helper** | used for **all** doset bool toggles, not only accessiblemsg |
| `optfn_boolean_word` | C `strncmpi` true/yes/on/1, **clone** | prefix length like C `:5224–5233` |
| `parse_a11y_accessiblemsg` | rc bag, **new** | `result.a11y.accessiblemsg` |
| jsmain rc apply | C config → `a11y`, **new** | only if boolean present; default Off |
| in-game `msg_loc` zero | C `:5428–5430`, **new** | `!opt_initial` only |
| `flags.accessiblemsg` | **removed** from this addr | grep `js/`: no remaining `flags.accessiblemsg` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No RNG.**

## C ↔ JS fidelity

Pinned C `optfn_boolean` do_set (`options.c:5199–5442`):

1. `*(allopt[optidx].addr) = !negated` (`:5286`).
2. After-change switch (botl for showexp/time/…; **accessiblemsg zeros loc** at `:5428–5430`).
3. `if (go.opt_initial) return` **before** that in-game switch (`:5327–5328`) — config does **not** zero loc and does **not** pline.
4. Toggle pline after (`:5438–5440`) `'%s' option toggled %s.` with `!negated ? "on" : "off"`.

JS `optfn_boolean_do_set` (`options.js:1418–1446`): write `game[addr.obj][addr.key] = !negated`; if `initial` return; botl for the same five names; if name is `accessiblemsg`, zero `msg_loc`. `doset` (`:1613–1617`): `negated = doset_bool_value(name)` (old value), then `optfn_boolean_do_set(name, negated, false)`, then pline with `!negated`. Match C toggle polarity.

Config: C `opt_initial` true skips the in-game switch. JS jsmain applies the boolean without zeroing loc and without a toggle pline. Match.

### Boolean words (`:5224–5233`)

C: `strncmpi(op, "true", ln)` / `"yes"` / exact `"on"` / digit && `atoi==1` → On (`negated = FALSE`). `"false"` / `"no"` / exact `"off"` / `atoi==0` → Off. JS `optfn_boolean_word`: `ln <= 4 && 'true'.startsWith(low)` etc.; `low === 'on'` exact; `/^\d/` + `parseInt === 1`. `"t"` is On in both. `"n"` is Off in both (`'no'.startsWith('n')` with `ln<=2`). `"on"` is not a prefix of `"only"` (exact). Match the words C documents.

Negated **with** a parameter (`OPTIONS=!accessiblemsg:true`): C `config_error` + `optn_silenterr` (`:5216–5220`). JS `if (negated) continue` — does not set. Silent skip vs C config error string. Same net: do not write the addr. Named thin clone of `config_error_add`, not a C-wrong of the addr.

`valok` for accessiblemsg is `No` (`optlist.h` `Off, Yes, No, No` → negateok Yes, valok No). Invalid word → C silenterr, no set. JS `parsed == null) continue`. Match.

Uncoloned `OPTIONS=accessiblemsg` / `!accessiblemsg`: JS boolean branch `value = !negated` then `parse_a11y_accessiblemsg`. Match `*(addr) = !negated`.

Default Off: `a11y_state()` still initializes `accessiblemsg: false`. rc omit leaves it Off. Match `optlist.h` Off.

### Consume interaction

Zero loc **then** toggle pline. D-1207 consume on that pline sees `(0,0)`. `isok(0,0)` is false → no `coord_desc` prefix on the toggle line. C same (zero then pline). Match.

`vpline` reads `game.a11y.accessiblemsg` only (D-1207). After this SHA, doset/`OPTIONS=` write that field. The claimed envelope is **not** a stub: consume is live.

jsmain: `if (typeof opts.a11y?.accessiblemsg === 'boolean')` then ensure `g.a11y` and assign. Empty `a11y: {}` from parseNethackrc does not overwrite with `undefined`. Match “only if the rc mentioned it.”

C `NHOPTB` macro (`optlist.h:75–77`) stores `bp` as `allopt[].addr`. accessiblemsg `bp` is `&a11y.accessiblemsg`, not `&flags.accessiblemsg`. `flag.h:221–222` still *declares* `accessiblemsg` on the struct; the option table does not point there. JS deleting the flags addr is the C table, not a dropped field.

`give_opt_msg` (`options.c:5438`): JS always plines the doset toggle (pre-existing D-0499). C can suppress for some options (`idlecheckpoint`). accessiblemsg is not in that suppress set. Match this option.

`doset` menu `%-Ns [val]` still reads `doset_bool_value` → `game.a11y.accessiblemsg`. The `[on]/[off]` shown in `#optionsfull` tracks the same bag `vpline` reads. Before this SHA the menu could show On while consume stayed Off. That was the C-wrong this SHA removes.

Colon vs uncoloned: C `string_for_opt` then the word parser. JS splits `OPTIONS=` on comma, then `key:val` vs boolean. `accessiblemsg:on` does not also take `!`. Match C “negated boolean must not have a parameter.”

## Hallucinations / overclaim

Subject + D-1218 say doset/`OPTIONS=` write `a11y.accessiblemsg` and in-game toggles zero `msg_loc`. **Addr + words + zero + jsmain are the hunk.** Stamping **Addressed:** D-1218 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C `spot_monsters` → `a11y.mon_notices`” or “Match C `mention_map` → `glyph_updates`” or “Match C every `optfn_boolean` after-change arm” (lit_corridor vision, etc. still the pre-existing thin doset helper).

`optfn_boolean_do_set` wrapping **all** doset bools is a refactor of the previous inline `!doset_bool_value` write. Polarity matches the old JS and C. Not a new skip of showexp botl.

## Density

One option addr + the C `optfn_boolean` bits that option needs (words, initial vs in-game, loc zero). §2b right size. Did not pull `show_glyph_change`.

## Branch-by-branch confirm

1. `OPTIONS=accessiblemsg` → `a11y.accessiblemsg === true`. Match.
2. `OPTIONS=!accessiblemsg` → false. Match.
3. `OPTIONS=accessiblemsg:true` / `yes` / `on` / `1` → true. Match.
4. `OPTIONS=accessiblemsg:false` / `no` / `off` / `0` → false. Match.
5. `OPTIONS=!accessiblemsg:true` → skip (no set). Match C silenterr net.
6. `OPTIONS=accessiblemsg:foo` + valok No → skip. Match.
7. doset toggle On→Off: write false, zero loc, pline `'accessiblemsg' option toggled off.`. Match.
8. Config/rc apply: write, **no** loc zero, **no** toggle pline. Match `opt_initial`.
9. Default omit: Off; `vpline` unprefixed. Match public.
10. `flags.accessiblemsg` no longer written by this addr; leftover `else result.flags[key]` does not catch `accessiblemsg` (handled earlier). Match.
11. `OPTIONS=accessiblemsg:t` (`ln=1`) → On. Match C `strncmpi("t","true",1)`.
12. `OPTIONS=accessiblemsg:none` → skip (not a boolean word, valok No). Match.
13. In-game toggle when already Off: `negated=false`, write true, zero loc, pline `toggled on`. Match.
14. `showexp` doset still sets `flags.botl` via the shared helper. Match C `:5345–5351` subset JS already had.
15. `a11y.msg_loc` missing → helper creates `{x:0,y:0}` then zeros. C loc always exists on the struct. Net (0,0). Match.

Call-for-call RNG: **none**. `optfn_boolean` has no `rn2`.

## Anti-pattern / Rule #2 (this SHA `js/`)

`git show b59f294b -- js/` has no banned gates. `AUTOUNLOCK_FORCE` in options.js is a pre-existing flag name, not this SHA. Contest Rule #2: `options.js`/`jsmain.js` stay plain ESM.

## Verification

Journal: private canary **42**/42; green+strict seed8000/0900; cohort **9**/9 + strict 0007/2200/1500/1800/0012/0360/4500/0014/0004. **Public-unhit** unless `accessiblemsg` is On (default Off). Admit that. Off still consumes/resets loc. This audit’s full `sessions` does not prefix scored screens. Cohort did not include seed0383; this SHA has no Hallu classifier.

## Actionable C-wrongs

Named omits (map / already Open), not Must-fix:

1. `spot_monsters` → `&a11y.mon_notices` still named
2. `mention_map` → `&a11y.glyph_updates` (D-1219, next Open at this SHA)
3. Remaining `optfn_boolean` after-change arms (lit_corridor, color redraw, …)
4. C `config_error_add` strings for negated-with-param / invalid word

Do not Must-fix “config should zero `msg_loc`.” C `opt_initial` returns first.

Do not Must-fix “`"t"` should not parse as true.” C `strncmpi(..., ln)` with `ln=1` does.

C `Term_False` on accessiblemsg (`optlist.h:141`) is the curses/tty termcap default helper, not a second store. JS has no Term_False; doset_bool_term still shows on/off from the a11y bag. Match the value, not the termcap pointer.

`opt_out` + default Off: the option is listed among opt-out help rows but starts Off. JS default Off. Public `.nethackrc` (Constitution §1.2) does not enable it. Scored screens stay unprefixed. Match.

`msg_loc` zero does not clear a pending topline; it only resets the next consume. A pline already in `--More--` is unaffected. C same. Do not Must-fix “zero should flush messages.”

## Verdict

- Verdict: **ACCEPT**
- One sentence: doset/`OPTIONS=` now write `a11y.accessiblemsg` like C `optlist.h` `&a11y.accessiblemsg`, and in-game toggles zero `msg_loc` before the toggle pline so `vpline` can prefix; default Off stays unprefixed.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1218 `b59f294b`. Next Open at this SHA was `show_glyph_change`.
