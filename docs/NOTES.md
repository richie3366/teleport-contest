# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** after D-0071 seed0102 **PASS** (6/44). Prefer
  seed0017 @ 2775 / seed0700 Scr 2/51 / seed2200 `exercise` /
  seed1150 `dog_move` / seed0501/0105 `wipeout_text` /
  seed0015/0200 `lspo_map` / seed0101 `next_ident` /
  seed0103 `next_ident`/`trquan` / seed0030 `maybe_smudge_engr` /
  seed0361/0373 `getbones` (needs `^V`→`goto_level`→`makemaz`).
- **Hypothesis:** next peel is whichever focused command shows first
  shared/call-order divergence — start with seed0017 or seed0700 screens.
- **Falsifier / next probe:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json
  # or screen-diff seed0700 after Scr 2
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

## Landmarks

- EGG typed: `!rn2(3)` then up to 200× `can_be_hatched(rndmonnum())`;
  oviparous path rolls `!rn2(77)` (BREEDER_EGG) except killer bee/
  gargoyle fast path (D-0068).
- Wizard `^V` → `wiz_level_tele` → `level_tele` → `?\n` menu → letter
  `y` = Quest start (`*-strt`); needs `goto_level` + `makemaz`/`splev`.
- C sink/fountain both `'{'`; sink CLR_WHITE, fountain CLR_BRIGHT_BLUE
  (`defsym.h` PCHAR).
