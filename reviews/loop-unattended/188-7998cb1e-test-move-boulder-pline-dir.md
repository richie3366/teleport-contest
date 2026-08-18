# Review 188 — 7998cb1e — hack.c `test_move` run>=2 boulder `pline_dir` (D-1226)

## Metadata
- Full / short hash: `7998cb1ee1ca8ece956bd2a6941090cd3bc11f86` / `7998cb1e`
- Parent: `b4c0d4a6` (reviews **183–187**). This file audits **this SHA only**. Archive row **Addressed:** D-1226 `7998cb1e` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 20:11:20 +0200
- D-id: **D-1226**
- Stats: 12 files, +199 / −57 — `js/hack.js` +79 / −8; `js/cmd.js` +25 / −8; `js/display.js` comments.
- Claims to close: Open `hack.c` run>=2 boulder `pline_dir` (named from D-1216 / review **178** / group review `b4c0d4a6`). Not mention_walls `"It's %s."`. `reviews/loop-2026-08-15/` has no unpaid boulder-abort Must-fix.
- JS / map: `hack.js` `could_move_onto_boulder` + abort helpers; `cmd.js` `domove` DO_MOVE arm; `test_move_viable` TEST_MOVE silent. `c-js-map/turns.md`. cannot_push squeeze still named.
- Prior reviews this SHA claims to close: **178** named omit item 1 (`hack.c:1220`).

## Intent vs deliverable

Git subject promises: “Match C hack.c test_move run>=2 boulder pline_dir so g/G/travel abort with optional mention_walls instead of always calling moverock.”

Old JS: dest boulder → always `moverock()` (vain push / STR exercise / rumble RNG on g/G/travel). C `test_move` (`hack.c:1216–1230`): `sobj_at(BOULDER) && (Sokoban || !Passes_walls)`; then if `mode != TEST_TRAV && run >= 2 && !(Blind || Hallucination) && !could_move_onto_boulder` return FALSE; DO_MOVE + `flags.mention_walls` prints `pline_dir(xytodir(dx,dy), "A boulder blocks your path.")`. Caller `domove_core:2843–2848` then `move=0; nomul(0)` when `!door_opened`.

The diff **does** that abort on DO_MOVE (`domove`) and TEST_MOVE (`test_move_viable`), ports `could_move_onto_boulder` (`:145–163`), and copies the caller `nomul` because JS has no unified `test_move`. It does **not** pull cannot_push squeeze / `sokoban_guilt` / giant pickup. Named.

`g` is C `do_rush` `run=2`; `G` is `do_run` `run=3`; travel is `run=8`. All `>= 2`. Capital-dir `do_run_*` is `run=1` and must **not** abort (C). JS `cmd.js:1612` matches those PREFIXCMD values.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `could_move_onto_boulder` | C callee `:145–163`, **new** (was static) | phaze / steed / giant flanks / tiny / light pack |
| `squeezeablylightinvent` | C macro `:139–140`, **clone** | `!invent \|\| inv_weight() <= -WT_SQUEEZABLE_INV` (850) |
| `Passes_walls_prop` | C `youprop.h` H\|\|E, **clone** | `_uprop_he_st`; no B (C has none) |
| `Sokoban_here` | C `rm.h` `sokoban_rules`, **clone** | also ORs `game.Sokoban` mirror |
| `test_move_boulder_is_blocking` | C `:1216` outer gate | `Sokoban \|\| !Passes_walls` |
| `test_move_run_blocked_by_boulder` | C `:1217–1221`, **new** | no `TEST_TRAV` caller |
| `domove` abort | C caller `:2843–2848`, **wired** | `pline_dir` then `nomul(0)` |
| `test_move_viable` | C TEST_MOVE, **wired** | silent FALSE; clears `door_opened` |
| `pline_dir` / `xytodir` | C callees, **already live** | D-1216 |
| `cannot_push` squeeze | C `:304`, **named omit** | still always `-1` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (abort **avoids** moverock rumble/`rn2`).

## C ↔ JS fidelity

Pinned C (`hack.c:1216–1221` + caller `:2843–2848`):

```
    if (sobj_at(BOULDER, x, y) && (Sokoban || !Passes_walls)) {
        if (mode != TEST_TRAV && svc.context.run >= 2
            && !(Blind || Hallucination) && !could_move_onto_boulder(x, y)) {
            if (mode == DO_MOVE && flags.mention_walls)
                pline_dir(xytodir(dx,dy), "A boulder blocks your path.");
            return FALSE;
        }
        if (mode == DO_MOVE) { … moverock() < 0 → FALSE; }
    }
        if (!test_move(…, DO_MOVE)) {
            if (!svc.context.door_opened) {
                svc.context.move = 0;
                nomul(0);
            }
```

JS `domove` (`cmd.js:2151–2163`): outer blocking gate; abort helper; `pline_dir(xytodir(u.dx,u.dy), …)` when `mention_walls`; `!door_opened` → `move=0` + `nomul(0)`. C `test_move` always zeros `door_opened` on entry (`:1001`); the boulder arm never sets it, so the caller **always** nomuls. JS door handling returns **before** the boulder arm (`cmd.js:2054–2084`), so leftover `door_opened` cannot skip this nomul on a boulder dest. `nomul(0)` zeros `context.run` (`hack.js:573–576`) ≡ C `end_running`. **Callee `pline_dir` is live.** Not a stub dispatch.

Pinned C `could_move_onto_boulder` (`hack.c:145–163`):

```
    if (Passes_walls) return TRUE;
    if (u.usteed) return FALSE;
    if (throws_rocks(gy.youmonst.data))
        return (!u.dx || !u.dy || !(IS_OBSTRUCTED(levl[u.ux][sy].typ)
                                    && IS_OBSTRUCTED(levl[sx][u.uy].typ)));
    if (verysmall(gy.youmonst.data)) return TRUE;
    return squeezeablylightinvent();
```

JS (`hack.js:169–183`): `Passes_walls` true; `usteed` false; `throws_rocks` uses **`u.dx`/`u.dy`** (C, not dest-relative); cardinal giant true; diagonal false only if **both** flanks `IS_OBSTRUCTED`; `verysmall`; else `squeezeablylightinvent`. `sx,sy` only for those flanks. Match. C `Sokoban` is `svl.level.flags.sokoban_rules` (`rm.h:538`); JS ORs `game.Sokoban` (goto_level already syncs that flag — D-0557). Extra true Sokoban only keeps the boulder arm on (safer, still C-shaped).

`WT_SQUEEZABLE_INV = 850` (`weight.h:24`). Empty pack: C `!gi.invent`; JS `!inv` (linked-list head). Match.

C `test_move` after a non-abort boulder (`:1223–1230`): DO_MOVE may chew (`tunnels && !needspick && !Sokoban` + `still_chewing`) else `moverock() < 0` → FALSE. JS skips chew (named) and still `await moverock()`. TEST_MOVE does not push (C); JS `test_move_viable` returns false on abort and true otherwise **without** moverock. Match TEST_MOVE. Invent: C `!gi.invent` is a linked-list null; JS `game.invent` is that head (the `Array.isArray` empty-array arm is dead for this port’s invent). `inv_weight() <= -850` is C `WT_SQUEEZABLE_INV * -1`.

TEST_TRAV: C skips the abort (`mode != TEST_TRAV`) then may refuse Sokoban or consecutive boulders without a dig/phaze/squeeze way through (`:1231–1248`). JS helper is only called from `domove` (DO_MOVE) and `test_move_viable` (TEST_MOVE). `findtravelpath_bfs` keeps its own boulder-node skip. Match the C split.

Passes_walls && !Sokoban: C skips the **whole** boulder arm (walk onto it, no moverock). JS `test_move_boulder_is_blocking` false → same. Sokoban still blocks even when phazing (C `Sokoban || !Passes_walls`).

## Hallucinations / overclaim

Subject + D-1226 say g/G/travel abort with optional mention_walls instead of always `moverock`. **The abort + live `pline_dir` + live `could_move_onto_boulder` are the hunk.** Default `mention_walls` Off is silent (C). Do **not** stamp “Match C cannot_push squeeze” or “Match C unified `test_move`.” Capital-dir `run=1` still pushes (C). Stamping **Addressed:** D-1226 is fair.

`Hallucination()` (`do_name.js:170–178`) extra sticky vs C `H && !resist`; Blind ORs `u.Blind`/`ublind` besides `Blind_im` (C `(H\|\|E)&&!B`). Extra true → **skip** abort (fail-open toward moverock). Pre-existing youprop clones; not a stub of `pline_dir`. Do not Must-fix “rewrite Hallucination().”

## Density

Abort gate + the C function it calls (`could_move_onto_boulder`) + TEST_MOVE silent twin. ~79 + 25 JS lines. Right size (§2b). Did not glue cannot_push.

## Branch-by-branch confirm

1. `run < 2` (walk, capital-dir `run=1`): no abort; `moverock`. Match.
2. `g` `run=2` / `G` `run=3` / travel `run=8`, cannot squeeze, !Blind, !Hallu: abort; optional `pline_dir`; `nomul`; no moverock. Match.
3. `mention_walls` Off: silent abort still `nomul`. Match.
4. Blind or Hallu: no abort; `moverock`. Match C `!(Blind \|\| Hallucination)`.
5. `could_move_onto_boulder` true: no abort; JS still `moverock` then cannot_push `-1`. **Named** squeeze omit (C would squeeze in `cannot_push`).
6. Passes_walls && !Sokoban: skip arm; walk onto boulder. Match.
7. Sokoban + Passes_walls: still enter arm. Match.
8. TEST_MOVE `avoid_trap`: silent FALSE; no pline. Match.
9. TEST_TRAV pathfinding: helper unused. Match.
10. Steed: cannot squeeze. Match.
11. Giant cardinal: can; diagonal both-obstructed cannot. Match `u.dx`/`u.dy`.
12. Tiny / empty pack / `inv_weight() <= -850`: can. Match.
13. `xytodir(u.dx,u.dy)` ≡ C `xytodir(dx,dy)` from `x-ux,y-uy`. Match.
14. Chew-before-push (`tunnels && !needspick && !Sokoban`) still named. Pre-existing.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `WT_SQUEEZABLE_INV` is `weight.h`, not a recorded mass.

## Verification

Journal: private canary **35**/35; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless g/G/travel onto a boulder (mention_walls On for the pline). Admit that. Cadence this audit: **44**/44.

## Actionable C-wrongs

None for Must-fix. `pline_dir` is live; `could_move_onto_boulder` is the C body.

Named omits (map, not Must-fix):

1. `cannot_push` squeeze pline + `sokoban_guilt` (`hack.c:304`) — **Addressed:** D-1239
2. Giant pickup / maneuver-over in `cannot_push`
3. Unified `test_move` TEST_TRAV consecutive-boulder walk
4. Blind/Hallu sticky vs C H\|\|E / H&&!resist (youprop clones)

Do not Must-fix “finish `test_move` chew/autodig.” Do not restore always-`moverock` on G.

## Callers / RNG ledger

C abort lives only in `test_move`. JS wired the two modes that must stop a run (`DO_MOVE`, `TEST_MOVE`). No `rn2` in the helper. Public fortress is not evidence the pline is live — default mention_walls Off.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: g/G/travel now abort a blocking boulder like C (`pline_dir` live; squeeze still named in cannot_push).
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1226 `7998cb1e`.
