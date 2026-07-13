# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** after D-0075 seed2200 prefix **2772→2925** (pos
  **2940**/3018). Prefer seed2200 @ 2925 `E`/`doengrave` /
  seed0017 @ 3132 `dog_move` terrain / seed0700 Scr 2/51 /
  wipeout_text / lspo_map / next_ident / maybe_smudge_engr /
  getbones (needs `^V`→`makemaz`).
- **Hypothesis (seed2200):** @ 2925 C `rn2(25)` @ `doengrave` —
  JS has no `doengrave` (`E` unbound → movement/`Unknown`).
- **Falsifier / next probe:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed2200-wizard-quaff-zap-read.session.json
  ```
- **Parked seed0017 @ 3132:** JS `mfndpos` cnt=4 at pet (30,5); C emits
  3× `rn2(12)`. Adding walkable `(30,4)` yields exactly 3× `rn2(12)`.
  JS has VWALL at (30,4); C screen shows floor. Diagnose join/
  wallification — do not patch coordinates. `mtrack`/`nxti` inactive
  (`distminU=3`).
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
- seed2200 @ 2724 was **not** moveloop `exercise`/exerper — it was
  `q`+`h` quaff oil → `peffect_oil` `exercise(A_WIS,FALSE)` (D-0073).
  JS treated `h` as move because `q` was unbound.
- seed2200 @ 2733 was **not** directional zap — `z`+`c` NODIR
  WAN_SECRET_DOOR_DETECTION → `weffects` `exercise(A_WIS,TRUE)` +
  `findit` empty (D-0074).
- seed2200 @ 2772 was **not** moveloop exercise — `r`+`j` SCR_MAGIC_MAPPING
  → `seffects` + `do_mapping` dual `exercise(A_WIS,TRUE)` (D-0075).
  Second `r`+`j` is missing-letter getobj re-prompt (letter `j` used up).

## Landmarks

- EGG typed: `!rn2(3)` then up to 200× `can_be_hatched(rndmonnum())`;
  oviparous path rolls `!rn2(77)` (BREEDER_EGG) except killer bee/
  gargoyle fast path (D-0068).
- Wizard `^V` → `wiz_level_tele` → `level_tele` → `?\n` menu → letter
  `y` = Quest start (`*-strt`); needs `goto_level` + `makemaz`/`splev`.
- C sink/fountain both `'{'`; sink CLR_WHITE, fountain CLR_BRIGHT_BLUE
  (`defsym.h` PCHAR).
- Samurai L1 `HFast` → `u_calc_moveamt` `rn2(3)`; capital-letter rush
  `context.run==1` corridor-follows at dead ends (D-0072).
- Uncursed unlit `POT_OIL` → `"That was smooth!"` + `exercise(A_WIS,FALSE)`
  → `rn2(2)` (D-0073).
- NODIR secret-door wand: `weffects` always `exercise(A_WIS,TRUE)` before
  `zapnodir`/`findit`; empty find → `"You don't find anything."` (D-0074).
- SCR_MAGIC_MAPPING: `seffects` `exercise` then `do_mapping` `exercise`;
  `"A map coalesces in your mind!"`; getobj invent-order + missing-letter
  continue (D-0075).
