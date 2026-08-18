# Review 179 — dc34d705 — cmd.c `dolookaround` / `#lookaround` (D-1217)

## Metadata
- Full / short hash: `dc34d7055220b3a1a31ee3b8361ad464fec73c53` / `dc34d705`
- Parent: `75640337` (review **175–178**). This file audits **this SHA only**. Archive row **Addressed:** D-1217 `dc34d705` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 11:51:00 +0200
- D-id: **D-1217**
- Stats: 14 files, +495 / −66 — `js/cmd.js` +301 / −10; `js/getpos.js` +59; `js/getline.js` +10; `js/allmain.js` +6; `js/hack.js` comment.
- Claims to close: Open queue `cmd.c` `dolookaround` (named). Not glyph_updates. `reviews/loop-2026-08-15/` has no unpaid dolookaround Must-fix.
- JS / map: `cmd.js` `dolookaround`; `getpos.js` `GLOC_INTERESTING`/`GLOC_VALID`; `getline.js` `#lookaround`; `allmain.js` newgame then-arm. `c-js-map/turns.md`. corridor-goes-to / integer `glyph_at` / full `do_screen_description` / `GFILTER_AREA` still named. Next Open at this SHA was `opt_accessiblemsg`.
- Prior reviews this SHA claims to close: **178** “Next Open is already `cmd.c` `dolookaround`.”

## Intent vs deliverable

Git subject promises: “Match C cmd.c dolookaround so #lookaround and the glyph_updates newgame arm describe the seen room and interesting tiles in text, instead of leaving that extended command and then-arm empty.”

After D-1216, JS had `pline_xy`/`pline_dir` but `#lookaround` was missing from `EXT_CMDS` and `allmain.js` newgame left the `a11y.glyph_updates` then-arm as a comment. C `dolookaround` (`cmd.c:1309–1368`) forces `a11y.accessiblemsg`, describes the current room (or doorway-adjacent rooms, or corridor-next-to-you), then scans the map with `GFILTER_VIEW` + `GLOC_INTERESTING` and `pline_xy("%s.", firstmatch)`.

The diff **does** port that envelope: local selvar floodfill + `lookaround_known_room` + scan + `#lookaround` + `await dolookaround()` in the newgame then-arm. It does **not** wire `OPTIONS=`/`doset` `mention_map` (that is D-1219) and does **not** replace `auto_describe_text` with pager `do_screen_description`. Named.

At this SHA, `g.a11y?.glyph_updates` is still unset from rc (addr still `flags.mention_map` until D-1219), so the newgame then-arm stays dead on public paths. `#lookaround` is live if typed.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dolookaround` | C function, **new** | `cmd.c:1309–1368`; exported |
| `lookaround_known_room` | C callee, **new** | `:1275–1306`; `u.urooms[0]` even for adjacent doorway rooms (C quirk) |
| `dolookaround_floodfill_findroom` | C callee, **new** | `:1262–1272` |
| `look_sel_*` | **clone** of `selvar.c` | new / getpoint / setpoint / bounds / floodfill / irregular / size; local to cmd.js |
| `u_have_seen_whole_selection` | C callee, **new** | `:1194–1208`; unexplored via seenv+blank stand-in |
| `u_have_seen_bounds_selection` | C callee, **new** | `:1212–1241` outline only |
| `u_can_see_whole_selection` | C callee, **new** | `:1245–1258`; live `cansee` |
| `shown_corr_cmap` | **clone** of `glyph_is_cmap` S_corr/S_litcorr | `typ===CORR` && `ch==='#'`; DEC `#` named |
| `gather_locs_interesting` GLOC_INTERESTING / GLOC_VALID | C callee, **wired** | `getpos.c:482–503`; was `default: false` |
| `known_vibrating_square_at` | C callee, **new** | `getpos.c:422–432`; live `invocation_pos` + `t_at` |
| `shown_boring_cmap` | **clone** of boring cmap list | typ+`look_shown_at`; integer cmap IDs named |
| `auto_describe_text` | **clone** of `do_screen_description` | already getpos lookat; **exported** as firstmatch |
| `#lookaround` EXT_CMDS | C extcmdlist, **wired** | `:1760–1761` `IFBURIED\|GENERALCMD`, no AUTOCOMPLETE |
| newgame then-arm | C caller, **wired** | `allmain.c:845–848` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates in this SHA’s `js/` hunks. Rule #2 clean. **No new gameplay RNG.** Dynamic `import('./cmd.js')` from getline is ESM, not `fs`.

## C ↔ JS fidelity

Pinned C `dolookaround` (`cmd.c:1317–1368`):

```
a11y.accessiblemsg = TRUE;
if (levl[u.ux][u.uy].typ == CORR) {
    corr_next2u = TRUE;
} else if (IS_DOOR(levl[u.ux][u.uy].typ)) {
    for (i = DIR_W; i < N_DIRS; i += 2)
        if (isok(x,y) && IS_ROOM(levl[x][y].typ))
            lookaround_known_room(x, y);
    corr_next2u = TRUE;
} else {
    lookaround_known_room(u.ux, u.uy);
}
iflags.getloc_filter = GFILTER_VIEW;
/* scan x=1..COLNO-1; skip u_at; GLOC_INTERESTING || iscorr */
do_screen_description(...); pline_xy(x, y, "%s.", firstmatch);
/* restore filter + accessiblemsg; return ECMD_OK */
```

JS `dolookaround` (`cmd.js:899–946`) matches that order: force accessiblemsg; CORR / IS_DOOR cardinals `i += 2` (`DIR_W=0` → W,N,E,S) / else hero cell; then `GFILTER_VIEW` scan; restore. `ECMD_OK`. **C callee, not a stub of the command.**

### Room size / floodfill

C `lookaround_known_room` (`:1278–1295`): `u.urooms[0] - ROOMOFFSET` even when `(x,y)` is the **adjacent** doorway room. JS `rooms.charCodeAt(0) - ROOMOFFSET` or `-ROOMOFFSET` if empty. `rmno >= 0` → `"room"` else `"area"`. C quirk, not a JS invention.

`selection_floodfill` (`selvar.c:395–447`): seed `SEL_FLOOD` **without** `check_func`; neighbors `isok` + check + not already in tmp/stack. Diagonals when TRUE. JS `look_sel_floodfill` same. `dolookaround_floodfill_findroom` stop set matches C `:1267–1270` (STWALL/DOOR/TREE/WATERWALL/LAVAWALL/IRONBARS/SCORR/SDOOR/DRAWBRIDGE_UP). CORR and ROOM pass. Seed-on-altar (furniture, not those types) is included. Match.

`selection_size_description` (`selvar.c:764–777`): irregular vs square vs rectangular, `"%s %i by %i"`. JS `look_sel_size_description` same string. `an()` imported from `objnam.js`. C `You("%s %s %s.", verb, an(size), kind)`. JS `You ${verb} ${an(size)} ${kind}.` Match.

Seen tests: C `glyph_at == GLYPH_UNEXPLORED`. JS `look_glyph_unexplored_at` is `!seenv && blank disp_ch`. **Clone / named integer glyph.** Whole-selection vs outline-only vs `cansee` whole match the three C loops (`:1194–1258`). `set_msg_xy` when `!u_at` then `You`/`pline` — consume D-1207 with accessiblemsg forced. Match.

### Interesting-tile scan

C `gather_locs_interesting(..., GLOC_INTERESTING)` (`getpos.c:487–503`): `GLOC_DOOR` **or** not (boring cmap **or** nothing **or** unexplored) **or** known VS. Boring cmap: wall/tree/bars/ice/air/cloud/lava/water/`S_ndoor`/room/corr. Engravings (`S_engroom`/`S_engrcorr`) are **not** in that list → interesting. JS: `GLOC_DOOR` via existing `shown_door_cmap`; `shown_boring_cmap` skips `look_shown_at` overlay and `erevealed`; ROOM/CORR/wall/tree/bars/ice/air/cloud/lava/water. `S_ndoor` is GLOC_DOOR so still interesting. `glyph_is_nothing` is the named integer-glyph hole: a blank **explored** furniture cell could be interesting in JS and nothing in C. Stand-in, named.

`GLOC_VALID` (`:482–485`): if `getpos_getvalid` then that callback, else FALLTHROUGH into INTERESTING. JS same (`getpos.js:822–832`). This also turns on getpos `aA` INTERESTING gathering (was `default: false`). That is **toward C**, not a new skip.

`corr_next2u` extra: C `glyph_is_cmap` && (`S_corr` || `S_litcorr`). JS `shown_corr_cmap`: CORR typ, not erevealed, `ch==='#'`. DEC corridor that is not `#` would miss the extra iscorr arm. Public Primary ASCII `#` matches. Named.

firstmatch: C `do_screen_description(cc, TRUE, ...)`. JS `auto_describe_text(x,y)` — the existing getpos lookat clone (partial table already named in getpos.js). **This is not pager `do_screen_description`.** Say so: the **scan and writer** are C; the **string table** is the lookat clone.

### `#lookaround` / newgame

C extcmdlist `:1760–1761`: `"lookaround"`, `IFBURIED | GENERALCMD`, NULL (no AUTOCOMPLETE). JS `getline.js` `autocomplete: false`, `wiz: false`. Buried gate in JS extcmd dispatch is still the pre-existing IFBURIED story (comment only). Not a new skip of the command.

C `allmain.c:845–848`: `if (a11y.glyph_updates) (void) dolookaround(); else notice_all_mons(TRUE);` JS same await. At this SHA the option addr is still wrong, so the then-arm does not fire from rc. D-1219 fixes the addr. Not this SHA’s lie: the **call** is present.

## Hallucinations / overclaim

Subject + D-1217 say `#lookaround` and the glyph_updates then-arm describe the seen room and interesting tiles. **Body + `#lookaround` + then-arm call are the hunk.** Stamping **Addressed:** D-1217 is fair for the command. This is **not** “Match C dispatch, callee is a stub” of `dolookaround` itself. It **is** “Match C firstmatch, callee is `auto_describe_text` not `do_screen_description`.” Do **not** stamp “Match C `mention_map` addr” (D-1219) or “Match C integer `glyph_at`.” Corridor-goes-to TODO in C (`:1321–1322`) stays TODO.

## Density

`dolookaround` + its selvar helpers + the `GLOC_INTERESTING` gather it calls. §2b high end (`cmd.js` +301) but one family. Did not pull `show_glyph_change`. Right size.

## Branch-by-branch confirm

1. Hero in ROOM, fully seen, `cansee` whole → `"You are in a … room."` Match `:1291–1295`.
2. Hero in ROOM, seen but not currently visible whole → `"You remember this as …"`. Match.
3. Doorway, adjacent `IS_ROOM` cardinal → `lookaround_known_room` on that cell; `u.urooms[0]` still names room vs area. Match C quirk.
4. Diagonals of doorway not scanned (`i += 2`). Match.
5. CORR: skip room paragraph; `corr_next2u`; scan includes `#` corridors. Match.
6. Fountain/altar/stairs: not boring cmap → INTERESTING → `pline_xy`. Match intent of `:487–503`.
7. ROOM/CORR/wall/ice: boring unless door/VS/overlay. Match.
8. Hero cell skipped in scan (`!u_at`). Match `:1350`.
9. `GFILTER_VIEW` + `!cansee` → not interesting. Match `:444–445`. Filter restored. Match.
10. `accessiblemsg` restored after scan. Match `:1365–1366`.
11. Empty `urooms` → `"area"`. Match `rmno < 0`.
12. VS at `invocation_pos` + tseen → interesting even if boring cmap. Match `:503`.
13. Corridor-goes-to rooms TODO still absent. **Named (C TODO).**
14. `look_sel_bounds` empty (`lx >= COLNO`) → full map 0..COLNO-1 like `selection_getbounds` (`selvar.c:84–88`). A successful floodfill sets bounds; empty only if seed not `isok`. Match.
15. Irregular room (L-shape): `look_sel_is_irregular` true → `"irregularly shaped Dx by Dy"`. Match `selvar.c:747–776`.
16. `GLOC_VALID` with `getpos_getvalid` unset → FALLTHROUGH INTERESTING. Match `:482–487`.
17. Scan x starts at 1, y at 0. Match `:1341–1342`. Column 0 never described.

Call-for-call RNG on this SHA’s new code: **none**. `selection_floodfill` is not RNG. `auto_describe_text` may call Hallu lookat helpers **only when** `#lookaround` / then-arm runs (Off by default).

## Anti-pattern / Rule #2 (this SHA `js/`)

`git show dc34d705 -- js/` has no `FORCE`, `DIAG`, `getRngLog(`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names, or recorded coordinates. Floodfill coords are live map cells, not captured public squares. Contest Rule #2: `cmd.js`/`getpos.js` stay plain ESM.

## Verification

Journal: private canary (GLOC_INTERESTING ROOM/CORR/unexplored vs FOUNTAIN; viz off/on room size; restore filter; doorway More); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0102/0108. **Public-unhit** unless `#lookaround` or `glyph_updates` On (default Off; addr still `flags` at this SHA). Admit that. Off path: newgame still `notice_all_mons`. This audit’s full `sessions` at HEAD is **not** a proof of `#lookaround` strings. Cohort did **not** include seed0383 (Hallu). D-1217 gather does not call `mon_glyph`; the later D-1219 classifier does.

## Actionable C-wrongs

Named omits (map / already Open), not Must-fix:

1. C TODO corridor-goes-to rooms (`cmd.c:1321–1322`)
2. Integer `glyph_at` / `GLYPH_UNEXPLORED` / `glyph_is_nothing` vs seenv+blank
3. Full pager `do_screen_description` table (firstmatch is `auto_describe_text`)
4. `GFILTER_AREA` / `gloc_filter_map` still named
5. DEC corridor `ch==='#'` stand-in for `S_corr`/`S_litcorr`
6. `opt_accessiblemsg` / `mention_map` addr — next Open at this SHA, shipped as D-1218/D-1219

Do not Must-fix “`u.urooms[0]` should be the room at `(x,y)`.” That would contradict C `:1279`.

Do not Must-fix “export `u_at` instead of `look_u_at`.” Both are hero-cell equality; `|0` vs strict `===` is not a public FAIL.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `#lookaround` and the newgame glyph_updates **call** now run C `dolookaround` (floodfill room size + VIEW interesting scan + `pline_xy`); firstmatch is the lookat clone, not pager `do_screen_description`, and `mention_map` rc still did not arm the then-arm until D-1219.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1217 `dc34d705`. Next Open at this SHA was `opt_accessiblemsg`.
