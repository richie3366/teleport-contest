# Runmode animation frames — port spec (supplemental Anim metric)

Status: unstarted. Baseline measured 2026-09-08: **123 / 1483** public
animation frames (`node frozen/ps_test_runner.mjs sessions`,
`__RESULTS_JSON__` → sum of `results[].metrics.animFrames.matched`).
44/44 sessions passing, 11,405 / 11,405 screens — the work below must
keep both green. Anim never folds into `passed`
(`frozen/ps_test_runner.mjs:399`); this is leaderboard-visibility work,
not PASS work. Do not pop it ahead of Must-fix or corpus-blocking rows
unless the queue is otherwise empty.

## Why this, why now

The `animationFrame()` hook (`js/jsmain.js:79`) and `nh_delay_output()`
(`js/display.js:4353`) are live, with call sites for zap beams
(`js/zap.js:2125,5742`), thrown-object flight (`js/display.js:4194` and
the `flash_glyph_at` family `:4388,4419,4484,4498`), monster flashes
(`js/muse.js:1303`) and spells (`js/spell.js:1693`). What is missing is
the largest source: **movement-delay frames**. C exposes the
intermediate screen during multi-turn running/travel/occupations via
`runmode_delay_output()`; we never call its equivalent. Bellwether:
`seed0014-dequa-fountain-explore` sits at **3 / 995** — a long
exploration session whose canonical frames are overwhelmingly
every-7th-move run updates. Of the 1,360 currently unmatched frames,
the dominant share is this one function.

## C reference (read this, port from this)

- Definition: `nethack-c/upstream/src/hack.c:2995–3018`.
  Semantics, in order:
  1. Gate: `(svc.context.run || gm.multi) && flags.runmode != RUN_TPORT`,
     else return silently.
  2. Leap gate: `flags.runmode != RUN_LEAP || !(svm.moves % 7L)` —
     teleport shows nothing until movement stops, leap updates every
     7th turn-counter step ("ought to be to start of running" per the C
     comment — port the turn-counter version verbatim, not the
     ought-to-be), walk/crawl update every step.
  3. `disp.time_botl = flags.time` (moveloop suppresses the status clock
     while running; the delay output re-arms it — mirror with the
     `end_running` pattern at `js/hack.js:986–990`, setting both
     `game.flags.time_botl` and `game.disp.time_botl`).
  4. `curs_on_u()` (= `flush_screen(1)`; live at `js/display.js:5240`),
     then `nh_delay_output()` (live at `js/display.js:4353`, already
     guards a missing hook and awaits `game.animationFrame()`).
  5. Crawl mode: four additional `nh_delay_output()` calls.
- Call sites (all four, in C order):
  1. `hack.c:2990` — last statement of `domove()`, after the
     ball-drag `cause_delay`/`nomul(-2)` block.
  2. `allmain.c:381` — moveloop `gm.multi < 0` (immobile) branch,
     **before** `++gm.multi`.
  3. `allmain.c:509` — moveloop post-occupation, after the
     `monster_nearby()` → `stop_occupation()` check, before `return`.
  4. `allmain.c:517` — moveloop `gm.multi > 0` running branch, after
     `lookaround()`, before the `if (!gm.multi)` check.
- Option value: `options.c:3626–3659` (`optfn_runmode`), choices
  `options.c:217–219` (`teleport/run/walk/crawl`), enum
  `include/flag.h:548–551` (`RUN_TPORT=0, RUN_LEAP, RUN_STEP,
  RUN_CRAWL`). C matches by **case-insensitive prefix**
  (`str_start_is`); negated option means TPORT; unknown value is a
  config error; missing value is a config error. JS default is already
  `'run'` (`js/options.js:2381`).

## JS work (three parts, ship together)

### 1. New `runmode_delay_output()` in `js/hack.js`

C-faithful home (`src/hack.c` → `js/hack.js`), placed after the
`domove*` family with a one-line provenance comment
(`// src/hack.c:2995 runmode_delay_output()`). Import `RUN_TPORT,
RUN_LEAP, RUN_CRAWL` from `./const.js` (live at `js/const.js:1152–1155`)
and `curs_on_u, nh_delay_output` from `./display.js` (extend the import
block at `js/hack.js:37–42`; neither is imported there today).

- `game.context.run` / `game.multi` already exist (cf.
  `js/allmain.js:398`, `:1084`). `game.moves` already exists
  (`js/allmain.js:997`); use `game.moves % 7` for the leap gate.
- `game.flags.runmode` is **never populated today** (nothing reads it;
  the raw string arrives via the generic string-option path,
  `else result.flags[key] = val` in `js/options.js`). Normalize inside
  the new function with C's prefix table
  (`teleport→RUN_TPORT, run→RUN_LEAP, walk→RUN_STEP, crawl→RUN_CRAWL`,
  case-insensitive); fall back to `RUN_LEAP` (the C/JS default) for
  anything unrecognized — sessions only ever carry valid values.
- Async like every other display path in this tree (`await curs_on_u()`,
  `await nh_delay_output()`); the extra crawl frames are four more
  awaits. No RNG draws anywhere in this function — display only.

### 2. Four call sites (exact insertion points)

1. `js/cmd.js` `domove()` (`:3083`): at the end of the try body, after
   the `cause_delay` block (`:3522–3525`), matching C `:2990` (domove's
   last statement). Do **not** move the `finally` smudge (C smudges at
   `:2703`, before; the finally structuring is D-0359's — leave it).
2. `js/allmain.js:1084–1092` (`multi < 0`): first statement inside the
   branch, **before** `g.multi++` (C calls before `++gm.multi`).
3. `js/allmain.js:1172–1179` (occupation): after the
   `monster_nearby()` → `stop_occupation()` line, before `return`.
   Do **not** touch the `reset_eat` deferral (named, out of scope).
4. `js/cmd.js` `continue_run()` (`:1677` — this tree's home of C
   `allmain.c:513–519`): after `lookaround();`, before the
   `if (!(game.multi > 0) || !game.context.run)` check (C runs the
   delay output before testing whether lookaround cleared multi).

### 3. Constraints (Constitution: faithful port, no fakes)

- One function, C name, C order, C gates. No session/seed/step
  conditions anywhere near this code.
- The function draws zero RNG and mutates no game state (sets only the
  `time_botl` repaint flags C sets); screens/RNG must be byte-identical
  before/after. If any screen moves, the port is wrong — revert, do not
  adjust the scorer or sessions.
- Frames are captured from terminal state *after* `curs_on_u()`; do not
  reorder paint vs capture.

## Verification recipe

```bash
node frozen/ps_test_runner.mjs sessions 2>err.txt | tee out.txt
# parse __RESULTS_JSON__: sum results[].metrics.animFrames.{matched,total}
```

Accept iff **all** hold: (a) 44/44 passing, 11,405/11,405 screens,
792,838/792,838 RNG — unchanged; (b) anim total rises, led by
`seed0014-dequa-fountain-explore` (baseline 3/995); (c) no other
session's anim count *falls* (a fall means a frame is emitted at the
wrong step — misplacement, not progress). Suggested follow-up for the
audit iterations (not this item): add an Anim row to the Score table in
`docs/CURRENT.md` so the metric stays visible.
