# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** D-0114/D-0115 cleared: msg_window extract + Primary
  ASCII vs `symset:DECgraphics`. Public still **10/44**; Scr **851**.
- **Hypothesis:** seed0106 next Scr peel @ screen 13 is angrygods
  second-sentence quotes + `--More--` (not map glyphs). seed2200 next
  real peel after parked RC path @158 is help `j` → `dokeylist` @184
  (`(key list stub)`).
- **Falsifier / next:**
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0106-priest-extcmd-sweep.session.json
  node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json
  ```
- **Parked deep canary:** D-0006 pet movement — do not implement until C
  state/candidate capture exists.

## Don’t re-check

- Do not reject the dart in `can_carry`; an earlier C turn APPORTs it.
- Do not treat `LOST_THROWN` as a carry rejection; C does not.
- Do not gate on raw RNG index/coordinates.
- Role `mnum` must be monster-table IDs (`PM_ROGUE=338`), never roles[] index.
- **roles[] order must match C** (Rogue before Ranger) — pantheon
  `randrole` uses roles[] indices.
- Do not hardcode Tourist `Aloha` / `neutral` / `HP:10` in `allmain`.
- Do not auto-submit unique `#` extcmds without Enter — regresses
  `#levelchange` (seed0361).
- Binding `'f'`→`dofire` **without** fireassist swap when bow is only in
  `uswapwep` makes `l` a real shot; C eats `l` in swap `prinv` `--More--`
  (D-0069).
- seed0102 @ 4451 was `udist` from leaked `l`, not APPORT/`can_carry` or
  `dog_goal` formula (D-0069).
- seed0102 Scr 0/25 was not topline-only: map `?` was missing MLET_CH /
  furniture terrain (D-0070).
- getdir invalid key must **not** retry after `help_dir` (C returns 0);
  topline pline+`--More--` is wrong — need NHW_TEXT (D-0071).
- Legacy Book overlay: `maxcol = strlen+1` (tty_putstr), not bare strlen;
  NHW_MENU paints leading pad then text at `offx+1` (D-0071).
- **lookaround must not `end_running` on ahead STONE/wall** — C treats
  IS_OBSTRUCTED as uninteresting and may corridor-turn for run==1 (D-0072).
- seed2200 help `g` stub was **not** missing opthelp file — real
  `option_help` NHW_TEXT from `allopt[]` (D-0091). RC path line is
  harness `$HOME` (elided by `verify-rerecord`); do not bake in
  recording absolute paths.
- **seed2200 Scr 162 msg_window `(not applicable)` was extractor bug** —
  `#if PREV_MSGS /* tty or curses */` comments made `eval_expr` fail →
  False → else branch (D-0114). Do not hardcode the descr.
- **seed0106 Scr 5 was NOT enhance/overview-first** — JS forced DEC
  walls/floors without `symset:DECgraphics`; C Primary ASCII (D-0115).
  All current PASS cohort sessions set `symset:DECgraphics`.
- seed0106 @13 after D-0115: C quotes both angrygods clauses +
  `--More--`; JS merges second sentence without quotes/more.
- seed0106 extcmd typing shows full `# chat` early; C paints progressive
  `# c` / `# ch` (getline/extcmd UI).
- seed0106 potion `!` yellow vs NO_COLOR may be `iflags.use_color`
  when `OPTIONS=color` absent — diagnose before forcing monochrome.
- Door open: C `recalc_block_point` before vision sees through;
  DECgraphics open door = meta-a / CLR_BROWN; ASCII open door uses
  `horizontal` → `|` / `-` (D-0113/D-0115).

## Landmarks

- EGG typed: `!rn2(3)` then up to 200× `can_be_hatched(rndmonnum())`;
  oviparous path rolls `!rn2(77)` (BREEDER_EGG) except killer bee/
  gargoyle fast path (D-0068).
- Wizard `^V` → `wiz_level_tele` → `level_tele` → `?\n` menu → letter
  `y` = Quest start (`*-strt`); needs `goto_level` + `makemaz`/`splev`.
- `wintty.c` **`#define H2344_BROKEN`** (always on): NHW_MENU
  `offx = min(min(82, cols/2), cols-maxcol-1)`; fullscreen only on
  `maxrow>=rows || !menu_overlay`.
- option_help: `next_opt` bool pack; compounds `%-20s` unless line
  would exceed CO (then unpadded); OthrOpt leading space; epilog
  leading blank; wrap-forcing config path for pagination (D-0091).
- Default Primary showsyms = ASCII walls `|`/`-`, floor `.`, open door
  `|`/`-` by `horizontal`; `symset:DECgraphics` → VT100 SO/SI glyphs
  (D-0115).
- `#pray` / `ublesscnt=300` → `can_pray` p_type **0** (too soon) even
  on coaligned altar; `prayer_done` → `rnz(250)` + `change_luck(-3)` +
  `gods_upset` → `angrygods` (D-0101).
