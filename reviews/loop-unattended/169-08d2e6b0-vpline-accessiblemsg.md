# Review 169 — 08d2e6b0 — pline.c `vpline` `msg_loc` consume (D-1207)

## Metadata
- Full / short hash: `08d2e6b0d78ff1bc47500d50f01990d76613728a` / `08d2e6b0`
- Parent: `319bf51c` (D-1206). This file audits **this SHA only**. Archive row **Addressed:** D-1207 `08d2e6b0` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 07:14:39 +0200
- D-id: **D-1207**
- Stats: 12 files, +220 / −46 — `js/display.js` +97 / −2; `js/const.js` +13; `js/hack.js` comment.
- Claims to close: Open queue `pline.c` `vpline` accessiblemsg consume (named from D-1196 / review **158**). Not `set_msg_xy`. `reviews/loop-2026-08-15/` has no unpaid consume Must-fix.
- JS / map: `display.js` `pline`/`Norep`; `const.js` `directionname`; `hack.js` comment. `c-js-map/turns.md` pline row. `pline_xy` / `set_msg_dir` / `opt_accessiblemsg` still named (already Open).
- Prior reviews this SHA claims to close: **158** ACCEPT-WITH-DEBT “`vpline` consume named, not Must-fix”; D-1196 leftover dest coords until the next store.

## Intent vs deliverable

Git subject promises: “Match C pline.c vpline so every message snapshots and clears a11y.msg_loc, and accessiblemsg prefixes coord_desc, instead of leaving dest coords until the next set_msg_xy.”

After D-1196, JS `set_msg_xy` stored dest and `pline` never read it, so `msg_loc` leaked. C `pline.c:162–189` always copies `a11y.msg_loc` then zeros it (empty / Norep-suppressed / Off included). If `a11y.accessiblemsg && isok(saved)`, it prefixes `coord_desc` + `": "` and re-enters `vpline`.

The diff **does** snapshot+reset on `pline` and `Norep`, and prefixes via new `coord_desc` / `dxdy_to_dist_descr` / `directionname`. It does **not** add `pline_xy`/`pline_mon`/`set_msg_dir` writers or wire doset `flags.accessiblemsg` onto `a11y.accessiblemsg`. Named. Default remains Off, so public strings do not gain a prefix.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `vpline_consume_msg_loc` | C `vpline` head, **new** | `:162–189` |
| `pline` / `Norep` call it | C sites, **new** | Norep always enters `vpline` (`:327–335`) |
| `coord_desc` | C callee, **new** in `display.js` | `getpos.c:595–635`; not pager look_all pad |
| `dxdy_to_dist_descr` | C callee, **new** | `getpos.c:557–588` |
| `directionname` | C callee, **new** in `const.js` | `cmd.c:4313–4322` |
| `You_feel` / `verbalize` / `urgent_pline` | C wrappers → `vpline` | non-empty paths call `pline` now |
| `pager.js` `coord_desc` | **pre-existing clone** | MAP y<10 space / compass stub; not this prefix path |
| `opt_accessiblemsg` / `pline_xy` | C, **named omit** | already Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No RNG** in consume/prefix (`hcolor` not involved). `xytodir` is a table walk.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Consume vs `pline.c:162–189`

C:

```
    a11y_mesgxy = a11y.msg_loc;
    a11y.msg_loc.x = a11y.msg_loc.y = 0;

    if (!line || !*line)
        return;
    …
    if (a11y.accessiblemsg && isok(a11y_mesgxy.x, a11y_mesgxy.y)) {
        dirstr = coord_desc(…,
                            ((iflags.getpos_coords == GPCOORDS_NONE)
                             ? GPCOORDS_COMFULL : iflags.getpos_coords));
        … vpline(tmp, the_args); return;
    }
```

JS `vpline_consume_msg_loc`: copy x/y, write 0,0, **then** empty return, **then** prefix if `a11y.accessiblemsg && isok`. `isok` rejects x=0 (`cmd.c:4329` x>=1), so a zeroed loc never prefixes. NONE or `null` `getpos_coords` → COMFULL (`flag.h:177–181` `'n'`/`'f'`). Recurse in C is a second `vpline` that consumes already-zero loc; JS prefixes the already-interpolated string once. Equivalent for JS’s pre-formatted `pline` model.

`Norep`: C sets `PLINE_NOREPEAT` then `vpline` (consume **before** `MSGTYP_NOREP`/`strcmp(prevmsg)` at `:246–263`). JS consumes (and maybe prefixes) then compares `_prevmsg` then `pline_after_consume` (no second consume). Empty Norep still resets. Match.

`pline("")`: consume then return. Match.

### `coord_desc` / `dxdy_to_dist_descr` / `directionname`

`getpos.c:557–588`: `(0,0)` → `"here"`; `xytodir != -1` → `directionname` (unit `"east"`, not `"1e"`); else counted `n/s/w/e` or `north/…` with comma when both, 9999 clamp, `dirnames[(dy>0)]` (dy>0 is south). JS `display.js:3463–3488` matches that index (`dy > 0 ? 1 : 0` → s). `xytodir` only walks `N_DIRS` (8); unit diagonal hits the name table.

`coord_desc`: COMFULL/COMPASS wrap `(dxdy…)`; MAP `<%d,%d>` **without** pager `y<10` trailing space (that pad is `pager.c` `look_all`, not `vpline`); SCREEN `[y+2,x]` width 2 vs 3 from `ROWNO-1+2 < 100`. Default/unknown → `""`. JS same. `pager.js:182–192` remains a **different** clone (MAP pad, compass stub `(here)`). vpline does not call it.

`directionname` (`cmd.c:4315–4318`): west…southwest, **down**, **up**. JS `const.js:138–144` copies that array. C `hack.h:639–650` enum is `DIR_SW, DIR_DOWN, DIR_UP` so index 8 is **down**. Pre-existing JS `DIR_UP = 8` / `DIR_DOWN = 9` is **swapped vs C** and vs this name table. This SHA’s `dxdy_to_dist_descr` only feeds `xytodir` 0–7, so the prefix path does not index 8/9. Adjacent const debt, not a vpline C-wrong. Do not Must-fix `DIR_UP` here (would steal `dotelecmd`).

### Wrappers: not “every message” if they return before `pline`

`You_feel` / `verbalize` / `urgent_pline` non-empty all `await pline(...)`, so they consume. C `You_feel` always builds `"You feel "` and enters `vpline` even if the suffix is empty. JS `You_feel`: `if (msg == null \|\| msg === '') return` **before** `pline` — empty You_feel skips consume. Same for empty `verbalize` / `urgent_pline`. Rare; dest-msg uses `pline` after `set_msg_xy` (D-1196). Not a stub: `coord_desc` is live. Overclaim is the word “every.”

`vpline_consume_msg_loc` if `!game.a11y` allocates `{ accessiblemsg: false, msg_loc }`. `hack.js` `a11y_state()` allocates the full struct (`mon_notices`, `mon_notices_blocked`, …). First `pline` before `a11y_state` would leave a thin object; `a11y_state` then sees `game.a11y` and only backfills `mon_notices_blocked` when `typeof !== 'number'`. Default `mon_notices` Off so `notice_mon` still no-ops. Cycle-avoiding init, not a consume-order bug. Named as debt, not Must-fix.

Option: doset still writes `flags.accessiblemsg`. Prefix reads `a11y.accessiblemsg`. Turning the option On in JS does not enable the prefix. **Named omit**, already Open `opt_accessiblemsg`. Default Off matches C optlist, so public screens stay unprefixed in both.

### `isok` / GPCOORDS / SCREEN pad (call-for-call)

C `isok`: `x >= 1 && x <= COLNO-1 && y >= 0 && y <= ROWNO-1` (`cmd.c:4326–4330`). Saved `(0,0)` after reset never prefixes; a dest `set_msg_xy` on a legal map cell can. JS `isok` is the same helper already imported into `display.js`.

`iflags.getpos_coords == GPCOORDS_NONE` (`'n'`) → COMFULL (`'f'`). JS `gpc == null \|\| gpc === GPCOORDS_NONE` also treats unset as COMFULL. MAP `'m'`, COMPASS `'c'`, SCREEN `'s'` match `flag.h:177–181`.

SCREEN: C builds `[%02d,%02d]` (or 03) once, then `Sprintf(outbuf, screen_fmt, y+2, x)` — map line 0 is screen row 2, column is x not x+1. JS `padStart(yw,'0')` on `y+2` and `x`. `ROWNO` 21 → `21-1+2=22 < 100` → width 2. Match.

Counted compass: C `dirnames[4][2] = {{"n","north"},{"s","south"},{"w","west"},{"e","east"}}` then `dirnames[(dy>0)][fulldir]` / `dirnames[2+(dx>0)][fulldir]`. In NetHack, +y is south. JS `dirnames[dy>0 ? 1 : 0]` is south when dy>0. Comma only when `dx` after a `dy` part. Match.

### Norep vs dest-msg leftover (why D-1196 needed this)

After D-1196, `rloc_to_core` stored dest `msg_loc` then printed together/telemsg/appear via `pline`. C’s that `pline` **consumed** the loc (reset to 0,0) even with accessiblemsg Off. JS left dest coords. A later `notice_mon` `set_msg_xy` would overwrite; a later consume port would have prefixed the **old dest** onto an unrelated message if On. D-1207 closes that. Off path still resets — that is the public-relevant half, even though scored screens never show the prefix.

C `You`/`Your`/`You_cant`/`There`/`The` all enter `vpline`. JS mostly inlines `"You …"` into `pline`. Those go through consume. `custompline` in C also enters `vpline`; JS yn prompts use `show_topl` / `topl_wrap_echo` (SUPPRESS_HISTORY), **not** `pline`, so they do not consume. C yn is not `vpline` either (window port). Not a miss.

### Anti-pattern grep (this SHA `js/`)

No `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names, or hardcoded coordinates in control flow. `coord_desc` MAP uses the live x,y, not a recorded cell.

## Hallucinations / overclaim

Subject + D-1207 say every message snapshots and clears, and On prefixes `coord_desc`. **Consume on `pline`/`Norep` is the hunk; prefix helpers are real C callees, not stubs.** Stamping **Addressed:** D-1207 is fair. Do **not** stamp “Match C `pline_xy`” or “Match C doset `a11y.accessiblemsg`” or “Match C pager `coord_desc` look_all columns.” Empty `You_feel` skip-consume is a wrapper gap, not a fake `coord_desc`.

## Density

`vpline` head + `coord_desc` + `dxdy_to_dist_descr` + `directionname` is one caller/callee cluster (§2b right size). Not “finish pline.c.” Related writers (`pline_xy`) correctly stayed named.

## Branch-by-branch confirm (required: not “seems fine”)

C `vpline` after consume:

1. empty line → return (loc already 0,0). JS `pline`/`Norep` same.
2. hangup / `wizkit_wishing` → return. JS has no hangup; wizkit wishing is not this SHA. Named N/A for Chrome/Node scored path.
3. `accessiblemsg && isok(saved)` → prefix + recurse `vpline`. JS prefix in one shot. Recurse would consume zeros and not double-prefix. Match.
4. `%` format / `"%s"` unwrap / vsnprintf. JS messages are already strings. Prefix applies to the interpolated text. Equivalent.
5. `in_pline` / `!window_inited` raw_print. Pre-existing JS has no raw_print early path. Not this hunk.
6. `PLINE_NOREPEAT` → `msgtype_type` / `MSGTYP_NOREP && !strcmp(prevmsg)` skip **putmesg** but loc already consumed. JS Norep compares after consume. Match.
7. `vision_recalc` / `flush_screen` / `putmesg` / `prevmsg = line`. JS `pline_after_consume`. Prefix is already in `line`/`msg` so `_prevmsg` is the prefixed string when On. C recurse stores prefixed `prevmsg` too.

`You_feel("disoriented for a moment.")` (D-1197 `scrolltele`): non-empty → `pline("You feel disoriented for a moment.")` → consume. If `set_msg_xy` ran just before, Off still clears. On would prefix. Default Off.

`set_msg_dir` still does not exist in JS (`hack.js` grep empty). C `pline_dir` would `set_msg_dir` then `vpline`. Named Open.

Review **158** told the next port to ship consume, not another `set_msg_xy`. This SHA does that. `hack.js` only updates the `set_msg_xy` comment (“vpline consume is D-1207”). No second store. `You_feel` in the D-1207 canary is the existing wrapper through `pline`, so Off dest coords clear on `You_feel("…")` too when the suffix is non-empty.

`directionname` out of range (including `DIR_ERR` −1) → `"invalid"`. `dxdy` never passes −1: it uses `xytodir !== -1` then `directionname(dst)`. Match C `:564–566`.

C `GPCOORDS_*` are chars (`flag.h:177–181`). JS `const.js:998–1002` already had `'n'/'m'/'c'/'f'/'s'` before this SHA; the hunk only **uses** them. No new seed-shaped cmode.

`Norep` in JS is a separate export, not `gp.pline_flags |= PLINE_NOREPEAT` then `pline()`. For JS callers that already use `Norep()`, consume is hooked. A future `pline` that wanted C’s flag would be a different port. Not this SHA’s lie.

## Verification

Private canary **36**/36 (Off reset; empty and Norep-suppress reset; (0,0) no prefix; unit east/north/west/NW; `(here)`; 2east vs 2e; mixed 2south,4east; MAP/SCREEN/NONE; second pline no leftover; Norep prefix vs prevmsg; `|0`; You_feel; 9999 clamp). Green+strict seed8000/0900. Cohort **7**/7 + strict 1500/0012/0360/4500/2200/0014/0004. **Public-unhit** unless `accessiblemsg` is On (default Off). Admit that. Dest-msg leftover after D-1196 is now cleared on the relocate `pline` even when Off — that **is** public-relevant if a later `notice_mon` store would have collided; default Off still means no prefix on scored screens.

## Actionable C-wrongs

Named omits (map / already Open), not Must-fix:

1. `options.c` `opt_accessiblemsg` must write `a11y.accessiblemsg` (doset still `flags.accessiblemsg`). Already Open. Not this SHA’s consume.
2. `pline_xy` / `pline_mon` / `set_msg_dir` writers. Already Open.
3. Empty `You_feel`/`verbalize`/`urgent_pline` return before consume — wrapper debt; dest-msg does not use them.
4. `vpline_consume` thin `a11y` vs `a11y_state()` full struct — init hygiene; default notices Off.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `pline`/`Norep` now snapshot and zero `msg_loc` like C `vpline`, and the On prefix uses a live `coord_desc` (not pager’s padded clone); option wiring and `pline_xy` stay named Open, not Must-fix.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1207 `08d2e6b0`. Next port in this window popped Open `dotele` trap-at-feet. Not `set_msg_xy`, not `dolookaround`.
