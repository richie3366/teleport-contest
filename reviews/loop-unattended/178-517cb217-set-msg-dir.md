# Review 178 — 517cb217 — pline.c `set_msg_dir` / `pline_dir` (D-1216)

## Metadata
- Full / short hash: `517cb217296b86483fd32eb93176dff2e23fc005` / `517cb217`
- Parent: `eaf10f2d` (D-1215). This file audits **this SHA only**. Archive row **Addressed:** D-1216 lacked the short hash; this review commit fills `517cb217`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 11:05:25 +0200
- D-id: **D-1216**
- Stats: 14 files, +178 / −58 — `js/display.js` +39 / −4; `js/const.js` `dirtocoord`; callers `cmd.js` mention_walls, `zap.js` dobuzz.
- Claims to close: Open queue `pline.c` `set_msg_dir` (named from D-1207 / D-1215 / review **169** / **177**). Not `pline_xy`. `reviews/loop-2026-08-15/` has no unpaid set_msg_dir Must-fix.
- JS / map: `const.js` `dirtocoord`; `display.js` `set_msg_dir`/`pline_dir`; `cmd.js` / `zap.js`. `c-js-map/turns.md`. run≥2 boulder `pline_dir` / remaining `pline_mon` / `msg_mon_movement` / `opt_accessiblemsg` / `dolookaround` still named. Next Open is `dolookaround`.
- Prior reviews this SHA claims to close: **169** / **177** “`set_msg_dir` writers. Already Open.”

## Intent vs deliverable

Git subject promises: “Match C pline.c set_msg_dir/pline_dir so a direction message stores a11y.msg_loc at hero+dir before vpline, instead of always printing through bare pline.”

After D-1215, JS had xy/mon writers but no direction writer. C `pline_dir` sites used JS `pline`, so loc stayed 0,0.

C `pline.c:82–89` `set_msg_dir`: `dirtocoord(&a11y.msg_loc, dir)` then `+= u.ux` / `u.uy`. `pline_dir` (`:113–123`) that then `vpline`. `cmd.c:3858–3865` `dirtocoord`: if `dd > DIR_ERR && dd < N_DIRS_Z` write `xdir`/`ydir`; **invalid dir is a no-op** (does not zero `cc`). Live already-ported callers: `hack.c:1069` mention_walls `"It's %s."` via `xytodir(dx,dy)`; `zap.c:4964` dobuzz `"%s hits you!"` via `xytodir(-dx,-dy)`.

The diff **does** `dirtocoord`, `set_msg_dir`, `pline_dir`, and those two sites. It does **not** run≥2 boulder `pline_dir` (`hack.c:1220`), remaining `pline_mon`, `msg_mon_movement`, or dobuzz steed `rn2(3)`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dirtocoord` | C callee, **new** | `cmd.c:3858–3865`; `const.js` next to `xytodir` |
| `set_msg_dir` | C function, **new** | `pline.c:82–89` |
| `pline_dir` | C function, **new** | `:113–123` then live `pline` |
| mention_walls `"It's %s."` | C caller, **wired** | `hack.c:1069`; JS `cmd.js` dest−hero delta |
| dobuzz hits you | C caller, **wired** | `zap.c:4964`; `xytodir(-dx,-dy)` |
| run≥2 boulder `pline_dir` | C sibling, **named omit** | `hack.c:1220` |
| dobuzz steed `rn2(3)` | C before hit, **named omit** | `:4959–4961` |
| `xdir`/`ydir` | C `decl.c:77–78`, **imported** | 10 entries; up/down are 0,0 |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `dx = x - ux` is the attempted step, not a captured public cell.

Grep of this SHA’s `js/` hunks: no banned gates. `hack.js` comment only. `xytodir` still walks `N_DIRS` (8), not `N_DIRS_Z` — C `cmd.c:3851–3854` same. Up/down never come from `xytodir(dx,dy)` of a walk bump; they come only if a caller passes `DIR_UP`/`DIR_DOWN`. Wired callers pass `xytodir` of a step or of `-dx,-dy`. `zdir` is unused by `dirtocoord` (C also only writes x/y).

JS `mention_walls_obstructed` IRONBARS returns `"You cannot pass through the bars."` via `pline` **before** `pline_dir`. C `test_move` has a separate bars/chew arm; mention_walls `"It's %s."` is the rock/wall arm. Pre-existing JS bars string is not this SHA’s writer. The wall/stone path is the one that now uses `pline_dir`.

## C ↔ JS fidelity

Pinned C (`pline.c:82–89` / `cmd.c:3858–3865`):

```
void set_msg_dir(int dir) {
    dirtocoord(&a11y.msg_loc, dir);
    a11y.msg_loc.x += u.ux;
    a11y.msg_loc.y += u.uy;
}
void dirtocoord(coord *cc, int dd) {
    if (dd > DIR_ERR && dd < N_DIRS_Z) {
        cc->x = xdir[dd];
        cc->y = ydir[dd];
    }
}
```

JS `dirtocoord` (`const.js:139–144`): `dd > -1 && dd < N_DIRS_Z` (`DIR_ERR` is −1). Valid: overwrite `cc.x/y` from `xdir`/`ydir`. Invalid: **leave leftover**. `set_msg_dir` (`display.js:3536–3545`) then `+= ux,uy` with `|0`. `pline_dir` store then `await pline` (consume D-1207). **C callees, not stubs.**

`xdir`/`ydir` (`const.js:106–107`) match `decl.c:77–78` including indices 8/9 = 0,0. Comment at `const.js:105` says `"8=up, 9=down"` — that comment is **wrong vs C** (8 is down). The **arrays** are C-order. Up/down loc is the **hero cell** either way. `isok(ux,uy)` is true (`x>=1`), so On prefixes `"here"` (`dxdy_to_dist_descr` (0,0)). Match C. Do not Must-fix the comment; do not swap the arrays (they already match `decl.c`).

Invalid dir: leftover loc then still add hero. After consume loc is 0,0, so DIR_ERR → `(ux,uy)` (hero / `"here"`). If a prior `set_msg_xy` were not consumed, leftover+hero would be C’s same quirk. D-1207 always consumes on `pline`. Canary DIR_ERR leftover+ux,uy. Match. Do **not** zero loc on invalid dir (that would contradict `dirtocoord`).

### `DIR_UP` / `DIR_DOWN` constants vs C enum

C `hack.h:639–650`: `DIR_DOWN` then `DIR_UP` so index **8 is down**, **9 is up**. JS constants are swapped (`DIR_UP=8`, `DIR_DOWN=9`) — review **169** debt. `directionname[]` is C order (`down` then `up` at 8/9). `set_msg_dir` uses **numeric** `xytodir` 0–7 or DIR_ERR; up/down `xdir/ydir` are both 0,0 so the swapped constants would still store the hero cell. This SHA does not index `directionname` with `DIR_UP`. Do not Must-fix the const swap here (would steal unrelated callers). Named adjacent debt.

### mention_walls vs `hack.c:1049–1069`

C `test_move` DO_MOVE + `flags.mention_walls`: `back_to_glyph` → S_stone `"solid stone"` else `an(defsyms[].explanation)` then `pline_dir(xytodir(dx,dy), "It's %s.", buf)` with **test_move `dx,dy`** (the attempted step). JS `mention_walls_obstructed(newx,newy)` (`cmd.js:462–483`) is called from the `blocksMove` bump (`:1824–1826`) with dest = hero+step. `dx = newx-ux`, `dy = newy-uy` **is** that step. `xytodir` then `pline_dir`. Pre-existing buf is tree/wall/solid-stone (not full `back_to_glyph`). This SHA only replaces `pline(\`It's ${buf}.\`)` with `pline_dir`. String still `"It's ${buf}."` ≡ C `"It's %s."`. Match the writer. IRONBARS early `"You cannot pass through the bars."` stays `pline` (C has a different bars arm before mention_walls). Named glyph edge cases already were.

run≥2 boulder (`hack.c:1216–1220`) `pline_dir(xytodir(dx,dy), "A boulder blocks your path.")` — **named**, not this bump.

### dobuzz vs `zap.c:4957–4965`

C: `nomul(0)`; **then** `u.usteed && !rn2(3) && !mon_reflects(steed)` goto buzzmonst **named omit**; else `!forcemiss && zap_hit` → `range -= 2`; `pline_dir(xytodir(-dx,-dy), "%s hits you!", The(flash_str(fltyp, FALSE)))`. JS (`zap.js:1656–1664`): `nomul(0)` then no steed `rn2` (named); then `pline_dir(xytodir(-dx,-dy), \`The ${flash_str(fltyp)} hits you!\`)`. Incoming bolt: negate dir so loc is the cell **toward the source**. `flash_str` returns `"bolt of fire"` etc.; C `The(...)` → `"The bolt of fire"`; JS template already had `"The ${flash_str}"` before this SHA. Writer wrap only. Hallucination suppress (`flash_str(..., FALSE)`) pre-existing. **Not a stub of `pline_dir`.** Skipping `rn2(3)` when riding is named RNG omit, not introduced as a new skip of the hit line. C `mon_reflects` on the steed steal is part of that same named arm.

C `pline_dir` (`:113–123`) is only `set_msg_dir` then `vpline`. No extra flags. JS same. `whizzes by you` (`zap.c:4984`) is bare `pline` in C (`The(flash_str)` without `pline_dir`). JS miss-arm stayed `pline`. Do not “fix” the miss line to `pline_dir` — that would be a C-wrong. Only the **hit** uses `pline_dir`.

## Hallucinations / overclaim

Subject + D-1216 say a direction message stores loc at hero+dir before vpline. **`dirtocoord` + `set_msg_dir` + `pline_dir` + the two live sites are the hunk.** Stamping **Addressed:** D-1216 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C run≥2 boulder `pline_dir`” or “Match C dobuzz steed `rn2(3)`” or “Match C `DIR_UP` constant index” or “Match C `opt_accessiblemsg`.” Say so: It’s-wall and buzz-hits-you loc are C; boulder path-block and riding steal stay named.

## Density

`dirtocoord` + direction writer + the two already-ported C callers. §2b right size. Did not pull `dolookaround` / glyph_updates.

## Branch-by-branch confirm

1. `dirtocoord` east (4) → `xdir=1, ydir=0`; +ux,uy → adjacent east cell. Match.
2. Up/down → 0,0 + hero → hero cell / On `"here"`. Match.
3. DIR_ERR, loc 0,0 → hero cell. Match C no-op then +=.
4. DIR_ERR, leftover (3,5) → (3+ux, 5+uy). Match C leftover. Do not zero.
5. mention_walls bump east → `xytodir(1,0)` then `pline_dir`. Match.
6. dobuzz `dx=1` hit → `xytodir(-1,0)` west of hero. Match.
7. Off consume still resets; no public prefix. Match D-1207.
8. West from x=1: loc x=0; `isok` false; no prefix. Match (canary).
9. run≥2 boulder → still JS `pline` if ported at all. **Named.**
10. Empty `pline_dir` still consume-resets. Match.

C `pline_dir` uses `va_list` into `vpline`; JS `pline_dir(dir, msg)` is already interpolated. Consume/prefix see the same final string. `mention_walls` buf is still tree/wall/`solid stone` (pre-existing vs C `back_to_glyph`). This SHA does not claim glyph fidelity; it claims the **writer**. Match that claim.

`cmd.js` `xytodir` import: was already used elsewhere; this SHA adds it next to `xdir`/`ydir` and passes the bump delta. `zap.js` already had `-dx,-dy` for reflection; the hit line now stores loc along the incoming vector. Reflection still flips `dx,dy` **after** the hit pline (C same). Loc on the hit message is the inbound cell, not the outbound bounce. Match `:4964` before `:4973`.

Call-for-call RNG on the wired paths: **none**. Steed `rn2(3)` is the named skip **before** the hit, still unconsumed when riding.

C `xdir`/`ydir` index 4 is east `(1,0)`; index 0 is west `(-1,0)`. `xytodir(-dx,-dy)` of an eastbound bolt (`dx=1`) is west. Loc = hero + west = cell the bolt came from. Match `zap.c:4964`. A southbound bolt stores north of the hero. Same.

`flash_str(fltyp)` without the C `FALSE` hallucination-suppress arg is pre-existing zap.js; this SHA does not change the hit string besides wrapping `pline_dir`.

## Anti-pattern / Rule #2 (this SHA `js/`)

`git show 517cb217 -- js/` has no `FORCE`, `DIAG`, `getRngLog(`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names, or recorded coordinates. `dx = x - ux` is the live attempted step. Contest Rule #2: `const.js`/`display.js` stay plain ESM.

## Verification

Journal: private canary **43**/43 (dirtocoord 8+up/down; DIR_ERR leftover+ux,uy; `|0`; mention_walls east; buzz west; Off consume; On NONE→COMFULL / MAP / SCREEN; west x=1 no prefix; UP `(here)`; empty reset; leftover xy overwrite; no fs); green+strict seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0360/4500/2200/0014/0004/0060. **Public-unhit** unless `accessiblemsg` is On (default Off). Admit that. Off still stores+resets on those plines. This audit’s full `sessions` `__RESULTS_JSON__` at `517cb217`: **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `31+0.27/turn` (R² 0.873). Default Off: scored screens unprefixed.

C `zdir[]` (`decl.c:79`) is `{0…0, 1, -1}` — index 8 down, 9 up — matching JS `const.js:108`. `dirtocoord` does not write z. `directionname` is C order (`down` then `up`). The swapped `DIR_UP`/`DIR_DOWN` **constants** would mis-index `directionname` and `zdir` if a later caller used the names; this SHA’s writers pass `xytodir` 0–7. Named adjacent, already in Actionable #5.

## Actionable C-wrongs

Named omits (map / already Open), not Must-fix:

1. `hack.c:1220` run≥2 boulder `pline_dir` `"A boulder blocks your path."`
2. Remaining `pline_mon` / `msg_mon_movement` / TELEP `pline_xy`
3. `options.c` `opt_accessiblemsg` wire `a11y.accessiblemsg` (already Open)
4. dobuzz steed `rn2(3)` steal (`zap.c:4959–4961`)
5. JS `DIR_UP=8` / `DIR_DOWN=9` swapped vs C enum — coords for up/down still 0,0; do not steal this iter

Do not Must-fix “invalid dir should zero loc.” C `dirtocoord` is a no-op.

C `pline_dir` is used in exactly two other interesting places this review checked: `hack.c:1069` (wired) and `hack.c:1220` (named boulder). `grep pline_dir` on upstream `src/` is those plus the definition. This SHA did not miss a third already-ported caller.

`dirtocoord` for `dd == N_DIRS` (8) is **in range** (`< N_DIRS_Z` which is 10) and writes 0,0. `dd == N_DIRS_Z` (10) is out of range (no-op). JS same. `xytodir` never returns 8–9. Match.

Diagonal bump: `xytodir(1,-1)` is NE (index 3). Loc = hero + (1,-1). C `test_move` dx,dy on a diagonal walk is that pair. JS dest−hero on a diagonal `blocksMove` is the same. Match.

C mention_walls after buf (`hack.c:1062–1069`): `S_stone` → `"solid stone"`; else `an(defsyms[sym].explanation)`; else `"impossible [background glyph=%d]"`. JS tree/wall/`solid stone` is the pre-existing thinner buf; this SHA does not add the impossible-glyph arm. Do not Must-fix “port `back_to_glyph`” as the writer envelope — that would steal `dolookaround` / glyph_updates. The **dir** on `"It's ${buf}."` is C.

C `test_move` mention_walls is `mode == DO_MOVE` only. JS `mention_walls_obstructed` sits on the live bump (`blocksMove`), which is the DO_MOVE analogue. TEST_MOVE / travel probing that C would skip the pline still skip it in JS (the helper is not on TEST_MOVE). Match the live bump.

C `DIR_ERR` is `-1` (`hack.h:640`). JS `xytodir` returns `-1`; `dirtocoord` uses `dd > -1`. A non-compass delta (e.g. `(2,0)`) is DIR_ERR → leftover then +=hero. C same (`xytodir` only matches the 8 unit steps). `cmd.js` bump dest is always a unit step from `domove`, so mention_walls loc is never that leftover path. The canary for leftover is the writer itself, not the bump.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mention_walls “It’s …” and dobuzz “hits you!” now store `a11y.msg_loc` at hero+dir like C `pline_dir` (invalid dir leftover+hero; up/down is the hero cell); boulder path-block and `opt_accessiblemsg` stay named, not Must-fix.
- Must-fix stays empty for this SHA; fill **Addressed:** D-1216 `517cb217`. Next Open is already `cmd.c` `dolookaround`. Not glyph_updates, not remaining `pline_mon`.
