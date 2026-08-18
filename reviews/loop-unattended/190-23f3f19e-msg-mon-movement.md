# Review 190 — 23f3f19e — monmove.c `msg_mon_movement` dest `pline_xy` (D-1228)

## Metadata
- Full / short hash: `23f3f19e7ba343f28e94d5273e9840965dd37309` / `23f3f19e`
- Parent: `1da251ee` (D-1227). This file audits **this SHA only**. Archive row **Addressed:** D-1228 `23f3f19e` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 21:07:18 +0200
- D-id: **D-1228**
- Stats: 11 files, +134 / −30 — `js/monmove.js` +43 / −3; comments in `display.js` / `hack.js`.
- Claims to close: Open `hack.c` `msg_mon_movement` (queue said hack.c; C is `monmove.c`; named from D-1215 / review **177** / D-1227). Not pline_mon. `reviews/loop-2026-08-15/` has no unpaid movement-msg Must-fix.
- JS / map: `monmove.js` `msg_mon_movement` after place in `m_move`. `c-js-map/turns.md`. optlist `&a11y.mon_movement` addr still named.
- Prior reviews this SHA claims to close: **177** named `msg_mon_movement`; **189** said not this SHA.

## Intent vs deliverable

Git subject promises: “Match C monmove.c msg_mon_movement so spotted monsters emit dest pline_xy closer/further messages when a11y.mon_movement is On, instead of staying silent after place_monster.”

C (`monmove.c:32–48`): if `a11y.mon_movement && canspotmon && mspotted`, `pline_xy(nix,niy, "%s %s%s.", Monnam, vtense(0, locomotion(data,"move")), where)` with where = next to you / closer / further away / in the distance. Caller `:2051–2053` after `place_monster` **before** `worm_move`. Default Off (`optlist` `&a11y.mon_movement`).

The diff **does** that function with dest `pline_xy` (not `pline_mon`), gates on `a11y.mon_movement` + `display.canspotmon` + `mspotted`, and calls it after assigning `mx,my`. It does **not** wire optlist addr (still `flags.mon_movement` in `options.js:1318`) or `worm_move`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `msg_mon_movement` | C callee `:32–48`, **new** | dest `pline_xy` |
| `m_move` caller | C `:2053`, **wired** | after place, before unhide |
| `pline_xy` | C callee, **already live** | D-1215 |
| `canspotmon` | C `display.c`, **imported** | `display.js` |
| `vtense(null, …)` | C `objnam.c`, **imported** | null subj → singular 3rd |
| `locomotion` | C `mondata.c:1380–1391`, **clone** | already in this file (hideunder) |
| `next2u` | C `you.h` `distu<=2` | JS `duNew <= 2` |
| `BOLT_LIM` | C 8 | `const.js` 8 |
| optlist `&a11y.mon_movement` | C addr, **named omit** | still `flags` |
| `worm_move` | C after msg, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.**

## C ↔ JS fidelity

Pinned C (`monmove.c:32–48`):

```
    if (a11y.mon_movement && canspotmon(mtmp) && mtmp->mspotted) {
        coordxy nix = mtmp->mx, niy = mtmp->my;
        boolean n2u = next2u(nix, niy),
            close = !n2u && (distu(nix, niy) <= (BOLT_LIM * BOLT_LIM)),
            closer = !n2u && (distu(nix, niy) <= distu(omx, omy));
        pline_xy(nix, niy, "%s %s%s.", Monnam(mtmp),
                 vtense((char *) 0, locomotion(mtmp->data, "move")),
                 n2u ? " next to you"
                 : (close && closer) ? " closer"
                 : (close && !closer) ? " further away"
                 : " in the distance");
    }
```

JS (`monmove.js:943–966`): same three-part gate; `nix,niy` from **already updated** `mx,my`; `dist2` ≡ C `distu`; `next2u` ≡ `distu<=2` (`you.h:558`); `close`/`closer` short-circuit `!n2u`; where strings include the leading space; format `Monnam + space + vtense + where + '.'` ≡ `"%s %s%s."`. **`pline_xy` not `pline_mon`** (C uses dest coords, not the mon pointer — review **187** / NOTES: do not wrap this as `pline_mon`).

`vtense(null, "move")` → `"moves"` (`objnam.js:1126–1134`; C null subj is singular 3rd). Flyer `"fly"` → `"flies"`; slithy `"slither"` → `"slithers"`.

Local `locomotion` vs `mondata.c:1380–1391`: for lowercase `"move"` (`locoindx` 0) C returns float / fly (small **and** large; `flys[0]==flyl[0]=="fly"`) / slither / ooze / wiggle / crawl / else def. JS same chain (`is_floater` / flyer+`MZ_SMALL` / flyer / `M1_SLITHY` / `amorphous` / `!mmove` / `nolimbs` / def). Stagger indices 2/3 unused (C `msg_mon_movement` calls `locomotion` not `stagger`). Clone matches this caller.

Pinned C caller (`monmove.c:2047–2060`):

```
        m_postmove_effect(mtmp);
        remove_monster(omx, omy);
        place_monster(mtmp, nix, niy);
        msg_mon_movement(mtmp, omx, omy);
        if (mtmp->wormno)
            worm_move(mtmp);
        maybe_unhide_at(mtmp->mx, mtmp->my);
```

JS: `m_postmove_effect` already awaited; assigns `mx,my`; **msg**; `maybe_unhide_at`. Worm reconnect named. Non-worms: msg sees new coords. Match. `options.js` `mon_movement: { obj: 'flags', key: 'mon_movement' }` still writes `flags` (C `optlist.h` `&a11y.mon_movement`). Default `a11y.mon_movement: false` in `a11y_state()`. Match default Off; addr named.

`mspotted` is set by `notice_mon` when `a11y.mon_notices` (C `hack.c` notice_mon). Default both Off. C requires **already** spotted; first notice is `notice_mon`, not this closer/further line. JS same. `dist2` is imported from `mon.js` (C `hack.h` `dist2` / `distu`). `BOLT_LIM=8` (`hack.h`); JS `const.js` 2770. `vtense((char *)0, …)`: C `objnam.c` null subject is singular 3rd-person (“moves”, not the raw “move”). JS comment at `objnam.js:1112` same special case.

**This is not “Match C dispatch, callee is a stub.”** `pline_xy` writes loc and prints. The **option addr** still writes `flags` so OPTIONS cannot turn `a11y.mon_movement` On — that is the already-Open optlist row, not a fake `pline_xy`.

## Hallucinations / overclaim

Subject + D-1228 say dest `pline_xy` when `a11y.mon_movement` is On. **The function + `m_move` call are the hunk.** Stamping **Addressed:** D-1228 is fair. Do **not** stamp “Match C optlist `&a11y.mon_movement`” or “Match C `worm_move`.” Queue filename `hack.c` was wrong; C is `monmove.c` (D-log already said so).

## Density

One C function + its only caller. ~43 lines. Right size. Did not glue optlist addr or remaining uhitm `pline_mon`.

## Branch-by-branch confirm

1. `a11y.mon_movement` Off (default): return. Match.
2. On but `!canspotmon` or `!mspotted`: return. Match.
3. On, spotted, `distu<=2`: “next to you” via `pline_xy(nix,niy)`. Match.
4. On, `2 < distu <= 64`, closer than old: “closer”. Match.
5. On, in bolt range, farther: “further away”. Match.
6. On, beyond bolt: “in the distance”. Match even if closer in raw dist.
7. n2u true: `close`/`closer` unused. Match.
8. Flyer: “flies”. Match `locomotion`+`vtense`.
9. Default walk: “moves”. Match.
10. `worm_move` still named; msg still fires at new head. Match C order for the msg.
11. shk/priest/dog special movers that skip this `m_move` place: no msg (C only calls from `m_move`). Match.
12. `pline_mon` not used. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `BOLT_LIM=8` is C, not a recorded radius.

## Verification

Journal: private canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `mon_movement` On (default Off) **and** already `mspotted`. Admit that. Cadence this audit: **44**/44.

## Actionable C-wrongs

None for Must-fix. Writer is live `pline_xy`.

Named omits (map, not Must-fix):

1. `options.c` optlist `&a11y.mon_movement` addr — already Open
2. `worm_move` after this call
3. remaining uhitm/worn/trap `pline_mon` — already Open
4. rolling-boulder TELEP `pline_xy` — already Open

Do not Must-fix “wrap as `pline_mon`.” Do not treat default-Off as a stub.

## Callers / RNG ledger

C only `m_move` after `place_monster`. JS same one site. No `rn2`. `notice_mon` that sets `mspotted` is pre-existing (D-1200 family). Public fortress is not evidence the dest line prints.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `m_move` now emits C’s dest `pline_xy` closer/further line when `a11y.mon_movement` and already spotted; optlist addr stays named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1228 `23f3f19e`.
