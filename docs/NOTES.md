# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** seed0017 @ 3132 terrain (D-0092 set
  `in_mk_themerooms` but did **not** move the peel). Prefer seed0017
  room geometry / seed1150 `throw_obj` @ 3032 / seed2200 post-help.
- **Hypothesis (seed0017 @ 3132):** JS room at creation-order[0] is
  `lx=31,hx=35` (east door 36, fountain 32, west VWALL @30,4). C map
  (DEC `~`≡room floor) has east door **35**, fountain **31**, walkable
  **(30,4)** — same relative fill, absolute x shifted/narrower. Not
  mtrack; not `in_mk_themerooms` shrink (no effect this seed). Find
  non-RNG or earlier create_room/`split_rects` geometry cause.
- **Falsifier / next probe:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json
  ```
  Dump C-vs-JS first-room `dx`/`xabs` (or compare east-door x after
  `makecorridors`). Or peel seed1150 @ 3032 `throw_obj` vs JS `rn2(5)`.
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
  DECgraphics floor `·` ambiguous doorway/floor/dark/ice; `#`
  corridor → `can be many things (corridor)`.
- seed2200 Scr 109 @ screen 65 was **not** tip/ccp drift after
  corridor look — capital `H` is getpos `MV_RUN` → `8*u.dx` via
  `truncate_to_map` (D-0084). Lowercase-only DIR map ignored it.
- seed2200 Scr 113 @ screen 80 was **not** NHW_TEXT fullscreen —
  `checkfile` uses NHW_MENU `putstr` → `process_text_window`; also
  strip `\r` or maxcol/offx shifts left by 1 (D-0085).
- seed2200 Scr invent `@i` was **not** menu geometry — `pretty_base`
  emitted `scr`/`spe`/`rin`/`wan` tokens; C xname uses
  `scroll/spellbook/ring/wand of <actualn>`; quarterstaff is
  bimanual → `(weapon in hands)` via `oc_big` (D-0086).
- seed2200 Scr 117 @ screen 87 was **not** NHW_MENU corner geometry —
  `look_all` is NHW_TEXT (`--More--` on row 23); lines need MAP
  `%8s` coords + glyph + `look_at_monster`/`self_lookat`; filter
  by currently shown glyphs not raw `objects_at` (D-0087).
- seed2200 Scr 167 @ screen 109 was **not** license `display_file` —
  About `doextversion` truncated options + wrong Permission indent
  (D-0088). Screen 110 is page-2 Lua MIT text.
- seed2200 history stay on Benson for `?`/`e` was **not** a shorter
  history file — NHW_TEXT `dmore` ignores non-quitchars (D-0089).
- seed2200 help `f` was **not** `display_file('keyhelp')` — real
  `dowhatdoes` tip + `What command?` + `key2extcmddesc` (D-0090).
- seed2200 help `g` stub was **not** missing opthelp file — real
  `option_help` NHW_TEXT from `allopt[]` (D-0091). RC path line is
  harness `$HOME` (elided by `verify-rerecord`); do not bake in
  recording absolute paths. Over-long `%-20s` compounds (glyph /
  whatis_filter) display unpadded to fit CO.
- seed0017 DEC `~` is **room floor** (`screen-decode` maps DEC `~`→`·`),
  not pool. D_NODOOR also paints as `~`. (30,4) walkable in C vs JS
  VWALL; `in_mk_themerooms` alone does not fix (D-0092).
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
- getpos rush: `highc(dir)` → `movecmd(MV_RUN)`; `C(dir)` →
  `MV_RUSH`; both use `dx=8*u.dx` when `!getloc_moveskip`, then
  `truncate_to_map` (D-0084).
- checkfile: NHW_MENU putstr → `process_text_window`; leading pad at
  offx, text at offx+1, dmore `--More--` at offx+1, cursor
  offx+1+8; tabexpand after one leading tab; strip `\r` (D-0085).
- doname W_WEP bimanual → `(weapon in hands)` via `oc_big`; xname
  SCR/SPE/RIN/WAN → `… of <actualn>` from `objectNameStrs` (D-0086).
- look_all: NHW_TEXT more on row 23; MAP `%8s` + y<10 pad; filter
  `look_shown_at` (cansee/mon_visible); STATUE `of a <pm>`;
  look_engrs: no y-pad, one space after glyph, S_engroom `` ` ``,
  `remembered text` + obscured-by (D-0087).
- doextversion: blank before outdented headers; Lua Permission uses
  5-space continuation indent (D-0088).
- NHW_TEXT `dmore`: quitchars only; ESC cancels remaining pages
  (D-0089).
- dowhatdoes: once tip + more; `What command? ` cursor col 14;
  `%-8s` key + `ef_desc (#ef_txt).` (D-0090).
- option_help: `next_opt` bool pack; compounds `%-20s` unless line
  would exceed CO (then unpadded); OthrOpt leading space; epilog
  leading blank; wrap-forcing config path for pagination (D-0091).
- `gi.in_mk_themerooms` must be true for the whole themerms
  `themerooms_generate` call so `check_room` aborts (no shrink) on
  non-STONE (D-0092).
