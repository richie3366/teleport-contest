# Review 232 — a4aa34d3 — hack.c test_move IRONBARS passes_bars (D-1270)

## Metadata
- Full / short hash: `a4aa34d36ff656f1329ea145a659b601560c8bfc` / `a4aa34d3`
- Parent: `76f7018d` (D-1269). This file audits **this SHA only**. Archive row **Addressed:** D-1270 lacked the short hash; this review commit fills `a4aa34d3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 11:06:30 +0200
- D-id: **D-1270**
- Stats: 12 files, +150 / −43 — `js/hack.js` +34 / −7 (helpers + `test_move_viable`); `js/cmd.js` +19 / −4 (`blocksMove` + DO_MOVE chew); comment `js/monsters.js`.
- Claims to close: Open `hack.c` hero `test_move` `passes_bars` (named from D-1258 / reviews **220**/**221**). Not ALLOW_BARS. `reviews/loop-2026-08-15/` has no unpaid hero-bars Must-fix.
- JS / map: `hack.js` `test_move_hero_passes_bars` / `test_move_hero_chews_bars`; `cmd.js` `blocksMove` / `domove` chew; live `still_chewing` / `passes_bars`; `c-js-map/turns.md` + `debt.md`. Underwater / rock Passes_walls / tunnels / autodig named.
- Prior reviews this SHA claims to close: **220** named omit hero `test_move` after monster ALLOW_BARS.

## Intent vs deliverable

Git subject promises: “Match C hack.c test_move so a passes_bars (or Passes_walls) hero can occupy iron bars, and rust/corr/metallivores chew on DO_MOVE, instead of treating every IRONBARS cell as blocked.”

C `test_move` (`hack.c:1011–1036`): outer `IS_OBSTRUCTED || typ==IRONBARS`; `Passes_walls && may_passwall` empty continue (bars are not `IS_STWALL`, so `may_passwall` is true — `rm.h:118` `IS_STWALL` is `typ<=DBWALL`, IRONBARS=22); else Underwater abort; else IRONBARS: `mode==DO_MOVE && (AD_RUST\|\|AD_CORR\|\|metallivorous) && still_chewing` → `return FALSE`; then `!(Passes_walls \|\| passes_bars(youmonst.data))` abort with optional mention_walls “cannot pass through the bars.” TEST_MOVE/TEST_TRAV never chew. Caller `domove_core` `:2843–2848` `move=0; nomul(0)` when `!test_move && !door_opened`. `still_chewing` (`:647–2415`) live. `passes_bars` live D-1258.

Old JS: `IS_OBSTRUCTED || IRONBARS` always blocked in `blocksMove` / `test_move_viable`.

The diff **does** allow via Passes_walls \|\| `passes_bars`, and DO_MOVE rust/corr/metallivore awaits live `still_chewing`. It does **not** port Underwater-on-bars, generic rock Passes_walls, tunnels/autodig, or `domove_fight_ironbars`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `test_move_hero_passes_bars` | C `:1032`, **condition clone** | Passes_walls \|\| `passes_bars` |
| `test_move_hero_chews_bars` | C `:1025–1028`, **condition clone** | skip if Passes_walls |
| `still_chewing` | C `:647`, **imported live** | finish `dissolve_bars` D-1259 |
| `passes_bars` | C `mondata.c:552`, **imported live** | D-1258 |
| `dmgtype` / `metallivorous` | C, **imported live** | |
| `Passes_walls_prop` | C `youprop.h:286`, **local youprop** | H\|\|E, no B |
| `AD_RUST` 24 / `AD_CORR` 42 | C `monattk.h:66,84`, **local const** | |
| `blocksMove` / `test_move_viable` | C TEST_TRAV / TEST_MOVE, **wired** | |
| `domove` chew | C DO_MOVE arm, **wired** | then C `:2843` |
| Underwater / rock Passes_walls / tunnels / autodig | C `:1016–1047`, **named omit** | |
| `domove_fight_ironbars` | C `:1996–2016`, **named omit** | forcefight `hit_bars` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in the helpers; `still_chewing` finish still `rnd(20)` nutrition (pre-existing).

## C ↔ JS fidelity

Pinned C (`hack.c:1024–1036`):

```
        } else if (tmpr->typ == IRONBARS) {
            if (mode == DO_MOVE
                && (dmgtype(gy.youmonst.data, AD_RUST)
                    || dmgtype(gy.youmonst.data, AD_CORR)
                    || metallivorous(gy.youmonst.data))
                && still_chewing(x, y)) {
                return FALSE;
            }
            if (!(Passes_walls || passes_bars(gy.youmonst.data))) {
                if (mode == DO_MOVE && flags.mention_walls)
                    You("cannot pass through the bars.");
                return FALSE;
            }
```

JS splits the unified `test_move` the port already lacked: TEST_MOVE/TRAV/`blocksMove` use `test_move_hero_passes_bars()` (no chew). DO_MOVE in `cmd.js` `domove` **before** testdiag/`blocksMove`: if dest IRONBARS and `test_move_hero_chews_bars()`, await `still_chewing`; if still eating, `move=0; nomul(0); return`. Passes_walls skips chew (C first obstacle branch). After a finished chew, `dissolve_bars` has replaced typ so `blocksMove` is not bars; if bars remain, rust is `passes_bars` and occupy. Match C chew-then-allow.

`still_chewing` is the live function (nondiggable teeth, metallivore full, start/continue effort, finish boulder/wall/tree/bars/`dissolve_bars`). This is **not** “Match C dispatch, callee is a stub.” Helpers are C predicates, not a second chew body.

`may_passwall` on bars: C `!(IS_STWALL && W_NONPASSWALL)`; IRONBARS is not STWALL, so the first branch is Passes_walls alone. JS does not call `may_passwall` for bars. Match.

Human block: C mention_walls “cannot pass through the bars.” JS `mention_walls_obstructed` already has that IRONBARS arm when `blocksMove` rejects. Match DO_MOVE wording if `flags.mention_walls`.

Generic rock: JS `blocksMove` still `IS_OBSTRUCTED` → true even for Passes_walls. Named. `domove_fight_ironbars` (F+weapon `hit_bars`) is before `test_move` in C and unwired in JS — not this SHA’s occupancy hunk.

## Hallucinations / overclaim

Subject + D-1270 say a bars-passer occupies and rust/corr/metallivores chew on DO_MOVE. **Allow + live `still_chewing` are the hunk.** Stamping **Addressed:** D-1270 is fair. Do **not** stamp “Match C Underwater obstacle on bars” or “Match C Passes_walls through STONE” or “Match C `domove_fight_ironbars` `hit_bars`” or “Match C `meatmetal`.” `AD_RUST==24` is C’s enum, not a trace index. Do not claim JS now has a full `test_move` symbol — it still splits.

## Density

One C arm plus the TEST_MOVE/TRAV clones C uses with the same predicate, and the DO_MOVE chew C puts in that arm. ~40 JS lines. Right size. Did not glue `meatmetal`.

## Branch-by-branch confirm

1. Fog / xorn Passes_walls: no chew, occupy. Match.
2. Garter / slithy-small / amorphous cube: `passes_bars`, no chew, occupy. Match.
3. Rust / gray ooze / rock mole DO_MOVE: chew; still eating → abort + nomul. Match.
4. Same, chew finishes: bars dissolved or occupy via `passes_bars`. Match.
5. Passes_walls rust (if ever): skip chew. Match first branch.
6. Jackal / human: block; mention_walls bars pline. Match.
7. TEST_MOVE / travel `blocksMove`: allow passers, never chew. Match.
8. Underwater bars: JS may allow/chew; C aborts. Named skip.
9. Passes_walls into STONE: still blocked. Named skip.
10. Forcefight bars + weapon: still not `hit_bars`. Named skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Chew coords are dest `newx,newy` from `u.dx/u.dy`, not a recorded cell. Plain ESM.

## Verification

Journal: private canary **17**/17 (C chew-then-passes_bars order; JS helpers + cmd chew before `blocksMove`; fog/garter pass no chew; rust/ooze/mole chew; jackal/python-big/human block; Passes_walls skip chew; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session Upolyd-walks onto IRONBARS. Cadence this audit: full `sessions` at HEAD `a4aa34d3` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. Occupancy goes through live `passes_bars`; chew goes through live `still_chewing` (can `dissolve_bars`). Condition clones match C’s gates, including Passes_walls skip-chew.

Named omits (map, not Must-fix):

1. Underwater bars abort (`hack.c:1016–1023`)
2. generic rock Passes_walls / `may_passwall` W_NONPASSWALL; tunnels `still_chewing`; autodig `use_pick_axe2`
3. `domove_fight_ironbars` `hit_bars`; Blind `feel_location`; `crawl_destination` goodpos bars; `meatmetal`

Do not Must-fix “JS split `test_move` into `blocksMove` + cmd chew.” Do not Must-fix `AD_RUST` local const. Do not pull `meatmetal` as a false Must-fix.

## Callers / RNG ledger

C: `domove_core` DO_MOVE; ParanoidTrap TEST_MOVE; `findtravelpath` TEST_TRAV. JS `domove` / `test_move_viable` / `blocksMove` travel. RNG only inside pre-existing `still_chewing` on the chew path. Public fortress is not evidence a rust monster ate bars.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: Passes_walls / `passes_bars` heroes can occupy bars and rust/corr/metallivores chew through live `still_chewing`; Underwater and rock phasing stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1270 `a4aa34d3`.
