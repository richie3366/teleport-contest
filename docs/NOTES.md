# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** after D-0083 seed2200 Scr **90→109**/230
  (farlook `lookat` stairs + getpos curs-after-flush). Prefer
  seed2200 @ screen 65 getpos continue / seed0017 @ 3132 terrain /
  seed1150 `dog_move`.
- **Hypothesis (seed2200 Scr 109/230):** screen 65 — after corridor
  `.` look, next getpos tip C `"floor of a room"` cursor `[17,13]`;
  JS still `"corridor"` at `[25,13]`. Cursor/position not tracking
  continued farlook moves (or wrong cell typ at target).
- **Falsifier / next probe:**
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json
  ```
  Diff screen 65; cite C `getpos` loop preserving `ccp` +
  `auto_describe` after move — not stairs/`lookat` cmap.
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
- seed2200 @ 2925 was **not** movement/`Unknown` — `E`+`-`+Elbereth
  → `doengrave` DUST mix-up `rn2(25)` then occupation `make_engr_at`
  Elbereth `exercise(A_WIS,TRUE)` (D-0076).
- seed2200 @ 2979 was **not** moveloop/`distfleeck` — unbound `/` let
  `.` become `donull` (timed). C 0-RNG `/` whatis through step 108;
  step 109 `?`/`a` About → `get_lua_version` nhlib `shuffle(align)`
  (D-0077).
- seed0700 Scr 0 was **not** botl-only — stock `max(10,cols-maxcol-1)`
  forced fullscreen for long Amaterasu lines; C `#define H2344_BROKEN`
  uses `min(cols/2, cols-maxcol-1)` so offx=7 stays corner (D-0078).
  Also `St:19` must be `get_strength_str` → `18/01`.
- seed0700 remaining Scr was **not** invent-geometry-only — missing
  `makedog` christen `Hachi`, Japanese doname/disco, lacquer
  `SPLINT_MAIL`, and invent `observe_object` for wakizashi encounter
  (D-0079). Invent offx drift was a maxcol side-effect of English names.
- seed2200 Scr 1 `` ` `` vs `x` was **not** ROCK_CLASS remapping /
  DECgraphics — it was STATUE of grid bug; C `statue_to_glyph` uses
  `mons[corpsenm].mlet` + `obj_color(STATUE)` white (D-0080).
  Coords are (col=16,row=11), not (11,16).
- seed2200 Scr 11 @ screen 10 was **not** whatis/overlay clear —
  `magic_map_background` blanked `!waslit` ROOM floors; C
  `dark_room`+color keeps DARKROOMSYM≡S_room floor (D-0081).
- seed2200 Scr 89 @ screen 36 was **not** NHW_TEXT fullscreen —
  `nhl_text` creates NHW_MENU + `select_menu` PICK_NONE; H2344
  corner offx=9, cursor [16,8], map left of panel intact (D-0082).
- seed2200 Scr 90 @ screen 46 was **not** only tip text —
  `lookat` cmap `S_brupstair` **"branch staircase up"** (not
  `stairs_description` Dlvl1), **and** getpos must `curs` after
  flush (`_buildScreenOutput` resets to hero) (D-0083).
- `more()` word-wrap of message text must only fire when len≥CO —
  wrapping at CO-8 breaks welcome `--More--` (seed0900).

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
- `E`/`doengrave` fingertip DUST: getobj `-` (space after `-` in prompt),
  `"You write in the dust with your fingertip."` `--More--`, getlin
  Elbereth, 8× `rn2(25)` mix-up, `set_occupation` → `make_engr_at`
  Elbereth exercises WIS; setup returns ECMD_OK (D-0076).
- `/` whatis is ECMD_OK (no turn). First getpos shows nhcore tip.
  About NetHack calls `get_lua_version` → `nhl_init` → nhlib
  `shuffle(align)` once (`rn2(3)`+`rn2(2)`) (D-0077).
- `wintty.c` **`#define H2344_BROKEN`** (always on): NHW_MENU
  `offx = min(min(82, cols/2), cols-maxcol-1)`; fullscreen only on
  `maxrow>=rows || !menu_overlay` — **not** `offx==10` (D-0078).
- botl `get_strength_str`: st>18 → `18/%02d` / `18/**` / `%2d`
  (st-100); Samurai Str 19 displays `18/01` (D-0078).
- Samurai `makedog`: little-dog defaults `Hachi`; `christen_monst` →
  bare name in ARTICLE_YOUR swap pline (D-0079). Japanese
  `obj_typename`/`doname` + `disco_typename` brackets; lacquer
  `SPLINT_MAIL` when `moves<=1`; invent `observe_object` before
  `xprname` (D-0079).
- STATUE map: `statue_to_glyph` → monster letter + white (D-0080);
  boulder still ROCK_CLASS `` ` `` / `S_boulder`.
- Magic map out-of-sight `!waslit` ROOM: `dark_room`+color →
  DARKROOMSYM painted as S_room floor ·; else GLYPH_NOTHING (D-0081).
- getpos tip: `nhcore.lua` `show_getpos_tip` → `nhl_text` →
  NHW_MENU corner (not NHW_TEXT); longest line 68 → maxcol 70 →
  offx 9; morestr `"(end) "`; cursor [16,8] (D-0082).
- Farlook stairs: `known_branch_stairs` → glyph `S_brupstair` →
  lookat `"branch staircase up"`; `auto_describe` prints that
  firstmatch; getpos must set map cursor **after** flush (D-0083).
  DECgraphics floor `·` ambiguous doorway/floor/dark/ice; `#`
  corridor → `can be many things (corridor)`.
