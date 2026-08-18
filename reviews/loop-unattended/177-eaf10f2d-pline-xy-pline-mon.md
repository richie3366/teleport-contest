# Review 177 — eaf10f2d — pline.c `pline_xy` / `pline_mon` (D-1215)

## Metadata
- Full / short hash: `eaf10f2d3b12f402bf3bfe1ebc5f8c7a6c8bf3e0` / `eaf10f2d`
- Parent: `b44c4847` (D-1214). This file audits **this SHA only**. Archive row **Addressed:** D-1215 `eaf10f2d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 10:51:37 +0200
- D-id: **D-1215**
- Stats: 16 files, +174 / −72 — `js/display.js` +41 / −2; re-export `hack.js`; callers weapon/muse/dogmove/monmove/dig.
- Claims to close: Open queue `pline.c` `pline_xy`/`pline_mon` (named from D-1207 / review **169**). Not `set_msg_dir`. `reviews/loop-2026-08-15/` has no unpaid pline_xy Must-fix.
- JS / map: `display.js` writers; `hack.js` re-exports `set_msg_xy`. `c-js-map/turns.md`. Remaining `pline_mon` sites / `msg_mon_movement` / rolling-boulder TELEP `pline_xy` / `set_msg_dir` still named. Next Open at this SHA was `set_msg_dir`.
- Prior reviews this SHA claims to close: **169** Actionable “`pline_xy` / `pline_mon` / `set_msg_dir` writers. Already Open.”

## Intent vs deliverable

Git subject promises: “Match C pline.c pline_xy/pline_mon so a message stores a11y.msg_loc (youmonst as 0,0) before vpline, instead of always printing through bare pline.”

After D-1207, JS `pline` consumed `msg_loc` but almost no caller **wrote** it except `set_msg_xy` in `hack.js` (dest-msg D-1196 / `notice_mon`). C sites that go through `pline_xy`/`pline_mon` used JS `pline`, so loc stayed 0,0.

C `pline.c:126–150`: `pline_xy` → `set_msg_xy(x,y)` then `vpline`; `pline_mon` → `&gy.youmonst` stores **(0,0)** else `mx,my`, then `vpline`. `set_msg_xy` (`:93–97`) is the store.

The diff **does** move `set_msg_xy` next to consume in `display.js`, add both writers, re-export from `hack.js`, and wire already-ported callers: `weapon.c` wield (`:892`), `muse.c` `mzapwand` (`:187`), `steal.c` `mdrop_obj` (`:836`, JS `dogmove.js` clone), `dogmove.c` pickup `pline_xy` (`:460`), `monmove.c`/`dig.c` `mb_trapped` see-arm (`:58`). It does **not** `set_msg_dir`, remaining `pline_mon`, `msg_mon_movement`, or TELEP `pline_xy`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `set_msg_xy` | C callee, **moved** | `pline.c:93–97`; was `hack.js` `a11y_state()` |
| `pline_xy` | C function, **new** | `:126–135` then live `pline` |
| `pline_mon` | C function, **new** | `:137–150`; youmonst pointer → (0,0) |
| `hack.js` `export { set_msg_xy }` | re-export | dest-msg / notice_mon keep the name |
| `mon_wield_item` / `mzapwand` / `mdrop_obj` / pickup / `mb_trapped` | C callers, **wired** | already-ported sites |
| remaining `pline_mon` | C other functions, **named omit** | uhitm/worn/trap/… |
| `msg_mon_movement` `pline_xy` | C `monmove.c:41`, **named omit** | |
| `set_msg_dir` | C sibling, **named omit** | next Open at this SHA |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `(0,0)` is C youmonst sentinel (`isok` rejects x=0), not a recorded hero cell.

Grep of this SHA’s `js/` hunks: no banned gates. C `va_list` format vs JS pre-formatted `msg` is the existing `pline` model (D-1207). Prefix (when On) applies to the already-interpolated string. Equivalent.

`dig.js` `Unaware()` vs `monmove.js` `game.u?.Unaware`: pre-existing clone split of `mb_trapped`, not this SHA. Both see-arms now go through `pline_mon`. Hear-arms stay `pline` / ``You hear`` because C is `You_hear`, which still enters `vpline` and would consume loc — but C never stored loc on that arm (`pline_mon` is only the KABOOM). JS hear-arm never stores. Match.

`dogmove.js` pickup `pline_xy` is C `dogmove.c:460`, not `steal.c`. Drop is C `steal.c:836` living in the JS dogmove clone. Two C files, one JS module that already owned both messages. Density still one writer family.

## C ↔ JS fidelity

Pinned C (`pline.c:91–150`):

```
void set_msg_xy(coordxy x, coordxy y) {
    a11y.msg_loc.x = x;
    a11y.msg_loc.y = y;
}
void pline_xy(coordxy x, coordxy y, const char *line, ...) {
    set_msg_xy(x, y);
    vpline(line, the_args);
}
void pline_mon(struct monst *mtmp, const char *line, ...) {
    if (mtmp == &gy.youmonst)
        set_msg_xy(0, 0);
    else
        set_msg_xy(mtmp->mx, mtmp->my);
    vpline(line, the_args);
}
```

JS `display.js:3521–3569`: store `|0`; `pline_xy` store then `await pline`; `pline_mon` `mtmp === game.youmonst` → (0,0) else `mx,my` then `pline`. **C callees, not glyph stand-ins.** Consume remains D-1207 `vpline_consume_msg_loc` inside `pline`. Writers are not stubs of consume.

`hack.js` **deletes** the old `a11y_state()` store and re-exports `display.js`. Dest-msg still calls `set_msg_xy` from `hack.js`. One implementation. `notice_mon` still uses `a11y_state()` for `mon_notices`; it does not need the display store to allocate the full struct first. If a `pline_mon` runs before `a11y_state()`, loc is written on the thin object; later `a11y_state()` keeps that `msg_loc`. Consume still zeros it. Match.

Thin `game.a11y = { accessiblemsg: false, msg_loc }` when unset: same cycle-avoiding init as D-1207 consume. `a11y_state()` sees `game.a11y` and only backfills `mon_notices_blocked`. Default `mon_notices` Off so `notice_mon` still no-ops. Review **169** already named this; moving the store does not newly skip `spot_monsters`. Not Must-fix.

### youmonst (0,0) vs hero `ux,uy`

C pointer identity `&gy.youmonst`, **not** `u_at(mx,my)`. A poly hero whose `youmonst.mx` were `ux` would still store 0,0. `isok` (`cmd.c:4326–4330`) requires `x>=1`, so (0,0) never prefixes. JS `game.youmonst` is the singleton. Canary: youmonst vs a different object at the same coords. Match. Do **not** restore `ux,uy` (NOTES / CURRENT).

Null `mtmp`: C would deref; JS throws. Not a production caller. Named N/A.

### Wired callers vs C

`weapon.c:892`: `canseemon` → `pline_mon("%s wields %s%c", Monnam, doname, !|.)`. JS (`weapon.js:448–452`) same gate, `pline_mon(mon, …)` **before** final `owornmask |= W_WEP` (C comment: before weld/artifact_light). Drop / tries-to-wield / tether `pline_mon` still named.

`muse.c` `mzapwand`: `pline_mon("%s zaps %s!", Monnam, an(xname))`. JS (`muse.js:984`) `pline_mon`. Match. `stop_occupation` still deferred (pre-existing).

`steal.c:835–836` `mdrop_obj`: `verbosely && cansee(omx,omy)` → `pline_mon`. JS `dogmove.js:589–591` is that clone (no `steal.js` `mdrop_obj`). Wiring the clone is the C site. Match. C then `flooreffects` / `place_object`; JS drop path already had that order. This SHA only swaps `pline` for `pline_mon` on the verbose line.

`dogmove.c:459–461`: `flags.verbose` → `pline_xy(omx, omy, "%s picks up %s.", …)` **before** extract. JS (`dogmove.js:655–661`) `pline_xy(omx, omy, …)`. Match. Other `pline_xy` (TELEP, `msg_mon_movement`) named.

`monmove.c:56–61` `mb_trapped`: verbose + `canseeit && !Unaware` → `pline_mon` KABOOM; else `You_hear`. JS `monmove.js` and `dig.js` clones: see-arm `pline_mon`; hear-arm stays `pline` (C is `You_hear`, not `pline_mon`). Match. C `wake_nearto` after the messages is pre-existing mb_trapped partial.

C `weapon.c` also `pline_mon`s drop (`:766`), tries-to-wield (`:877`), and tether (`:896`). JS `mon_wield_item` is still the thin NEED_WEAPON switch; those arms were already named weld/artifact_light deferrals. Wiring only the live `wields` line is the C site this function currently prints. Do not Must-fix “finish `mon_wield_item`.” `lock.c:1216` `mb_trapped` is another C caller; JS lock may use a local clone — remaining, named with other `pline_mon` sites.

## Hallucinations / overclaim

Subject + D-1215 say those writers store loc (youmonst as 0,0) before vpline instead of bare `pline`. **Writers + live consume + the five already-ported call sites are the hunk.** Stamping **Addressed:** D-1215 is fair. This is **not** “Match C dispatch, callee is a stub”: `pline` still consumes. Do **not** stamp “Match C every `pline_mon` in uhitm/worn/trap” or “Match C `msg_mon_movement`” or “Match C `set_msg_dir`” or “Match C doset `a11y.accessiblemsg`.” Say so: wield/zap/drop/pickup/KABOOM loc is C; remaining sites still bare `pline`.

## Density

`set_msg_xy` + two writers + the live already-ported callers is one caller/callee cluster. §2b right size. Did not “finish pline.c.” `set_msg_dir` correctly stayed next Open.

## Branch-by-branch confirm

1. `pline_xy(3,5,"…")` then `pline` consume → loc 3,5 for that message, then 0,0. Match.
2. `pline_mon(youmonst)` → (0,0); `isok` no prefix even if On. Match.
3. `pline_mon(other)` → `mx,my`. Match.
4. Same coords, different object than `game.youmonst` → `mx,my` not (0,0). Match C pointer test.
5. Empty `pline` after store still resets (D-1207). Match.
6. `mb_trapped` hear-arm does **not** use `pline_mon`. Match C `You_hear`.
7. Pickup `pline_xy` uses floor `omx,omy`, not hero. Match.
8. Remaining uhitm `pline_mon` → still JS `pline`. **Named.**

C `pline_mon` of a mimicked monster still uses `mtmp->mx,my` (the monster struct), not the appearance glyph cell. JS same. `msg_mon_movement` (`monmove.c:41`) uses `pline_xy(nix,niy, …)` for the **destination** of a step, not `pline_mon`. Wiring `pline_mon` on movement would be a C-wrong. Named omit is the right miss.

`set_msg_xy` `|0` is coordxy truncation, not a roll. No `rn2`/`rnd`/`rn1`/`d` in the writers. Call-for-call RNG: **none**. Default `accessiblemsg` Off matches C optlist; public screens stay unprefixed in both after this SHA.

C `pline_mon` format is `va_list` into `vpline`; JS interpolates first then `pline`. Consume/prefix see the final string. `Monnam`/`doname`/`an(xname)` on the wired sites are the same helpers C used. Match the store, not a second namer peel.

## Anti-pattern / Rule #2 (this SHA `js/`)

`git show eaf10f2d -- js/` has no `FORCE`, `DIAG`, `getRngLog(`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names, or recorded cells in control flow. `(0,0)` is C’s youmonst sentinel. Contest Rule #2: `display.js` stays importable in Chrome.

## Verification

Journal: private canary **31**/31 (Off consume; On NONE→COMFULL; (0,0) no prefix; youmonst vs same-coords pointer; MAP/SCREEN; unit east; `|0`; empty reset; leftover consume; hack re-export identity; null throws; no fs); green+strict seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0360/4500/2200/0014/0004/0060. **Public-unhit** unless `accessiblemsg` is On (default Off). Admit that. Off path still stores then consume-resets — public strings stay unprefixed. This audit’s full `sessions` `__RESULTS_JSON__` at `517cb217`: **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `31+0.27/turn` (R² 0.873). Default Off means scored screens do not show `coord_desc` prefixes even after the writers.

C `muse.c:187` is the seen-other `mzapwand` arm (`!self`); the `self` arm is `pline("%s with %s!", monverbself, …)` not `pline_mon`. JS wired the seen-other arm. Match. Do not wrap the self-zap in `pline_mon`.

## Actionable C-wrongs

Named omits (map / already Open), not Must-fix:

1. Remaining C `pline_mon` sites (uhitm/worn/trap/weapon drop·tether).
2. `msg_mon_movement` `pline_xy` (`monmove.c:41–46`).
3. Rolling-boulder TELEP `pline_xy`.
4. `set_msg_dir` / `pline_dir` — **next Open** at this SHA, not this envelope.
5. Thin `a11y` init vs `a11y_state()` full struct — D-1207 debt; default notices Off.

Do not Must-fix “youmonst should use ux,uy.” That contradicts C `:142–143`.

C `pline_xy` other live-ish sites the public suite still does not need: `teleport.c` rolling-boulder TELEP; `hack.c` some look/region messages; `monmove.c:41` `msg_mon_movement`. Those stay `pline` in JS. Wiring them without the C guards (cansee, closer/further, n2u) would print loc on the wrong messages. Named omit.

`Norep` is not wrapped as `pline_xy`. C `Norep` is `PLINE_NOREPEAT` then `vpline` (consume, no extra store). JS `Norep` already consumes (D-1207). A caller that C writes as `pline_mon` + Norep would need the store **before** Norep; none of this SHA’s wired sites are Norep. Match.

C `dogmove.c:459–461` stores loc at the **floor** cell `(omx,omy)` before extract. After pickup the object is in minvent; loc still names where the hero saw it. JS `dogmove.js:655–661` same order (store, then extract). Wiring `pline_mon(mtmp)` here would be a C-wrong (C used `pline_xy`, not the pet’s `mx,my` after step). Named omit of other `pline_xy` does not license swapping writers.

C `You_hear` (`pline.c`) is a `vpline` wrapper with `"You hear "` prefix; it does **not** call `set_msg_xy`. JS hear-arm `pline('You hear …')` / ``You hear`` matches that (consume without a new store). `mb_trapped` Deaf skip is C `else if (!Deaf)` on the hear arm; JS clones already had that gate. This SHA does not newly print explosion for Deaf.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: already-ported wield/zap/drop/pickup/KABOOM messages now store `a11y.msg_loc` like C `pline_xy`/`pline_mon` (youmonst is (0,0), not the hero cell); remaining callers and `set_msg_dir` stay named, not Must-fix.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1215 `eaf10f2d`. Next port in this window popped Open `set_msg_dir`. Not `opt_accessiblemsg`, not `dolookaround`.
