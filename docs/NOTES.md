# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** seed0102 RNG full after D-0069 fireassist; next is
  **screen** peel (Scr 0/25) or other shared peels (seed0017 @ 2775 /
  seed0700 Scr 2/51).
- **Hypothesis:** seed0102 screen gap is `prinv`/`more`/`getdir` topline
  vs C during fireassist swap (RNG already matches).
- **Falsifier / next probe:**
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0102-ranger-name-cancel.session.json
  # or: node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json
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

## Landmarks

- EGG typed: `!rn2(3)` then up to 200× `can_be_hatched(rndmonnum())`;
  oviparous path rolls `!rn2(77)` (BREEDER_EGG) except killer bee/
  gargoyle fast path (D-0068).
- Wizard `^V` → `wiz_level_tele` → `level_tele` → `?\n` menu → letter
  `y` = Quest start (`*-strt`); needs `goto_level` + `makemaz`/`splev`.
