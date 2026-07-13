# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** D-0103 `#chat` cleared seed0106 @ 2639. Next:
  seed0106 @ **2713** `kick_door`/`exercise` (Ctrl-D), or seed2200 Scr
  **199**/230, or seed0077 `player_selection`.
- **Hypothesis:** seed0106 @ 2713 is incomplete `dokick` door path
  (C `exercise` then `kick_door`; JS emits `rn2(2)`).
- **Falsifier / next:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0106-priest-extcmd-sweep.session.json
  ```
- **Parked deep canary:** D-0006 pet movement — do not implement until C
  state/candidate capture exists.
- **Named next for no-name sessions:** seed0077 needs `player_selection`
  after askname (Scr 6/33).

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
  not pool. D_NODOOR also paints as `~`. (D-0092).
- **seed0017 room x-shift falsified** — `create_room` first room
  `xabs=31` matches C RNG; display `setCell(x-1)`; C screen fountain
  col 31 ≡ JS map (32,3); “east door col 35” is screen for map 36
  (D-0092/93/99).
- **seed0017 @3132 was NOT missing walkable (30,4)** — C recorder dump:
  `levl[30][4].typ=VWALL` same as JS; peel was `!couldsee` →
  `gettrack` → `gg=(29,5)` → 3× `rn2(12)` after nidist update (D-0099).
  Probe CORR@(30,4)→3142 was a false positive (extra farther cell).
- **Post-fill `wallification` is not the (30,4) writer** (D-0100).
- **seed0017 @3327 was unbound `#pray`** — C `prayer_done` `rnz(250)`
  (p_type 0 too-soon) → `gods_upset`/`angrygods` (D-0101).
  `doextcmd` must return callee `ECMD_TIME` so `#pray` keeps `move`.
- **seed0017 Scr 2 was NOT Book/legacy text** — first screens are
  copyright + `Who are you?` when rc omits `name:`; do **not**
  `flush_screen` during askname (clears splash) (D-0102). Default
  `PARANOID_PRAY` requires yn before prayer.
- **seed0106 @2639 was NOT incomplete `do_attack`** — unbound `#chat`
  made getdir `l` a real east move → `distfleeck` `rn2(5)` while C
  chats empty then `h` into pet → `do_attack` `rn2(7)` (D-0103).
- seed1150 @ 3032 was **not** missing `f` binding — getdir saw a
  space that C used for pet-drop `--More--` because JS
  `getdir`/`yn_function` skipped `more()` on `TOPLINE_NEED_MORE`
  (D-0093). Also needed Caveman `multishot_class_bonus` + `rnd(multishot)`.
- seed1150 @ 3042 was **not** pet position / gold@(54,16) bbox —
  two unmerged FLINT `fobj` nodes after volley; C `throwit`→`stackobj`
  (D-0094).
- seed1150 Scr 22 blank topline was **not** glyph — `!autopickup`
  needs `domove`→`spoteffects`→`pickup`→`check_here`→`look_here`
  (D-0095). Pet was already christened `Slasher`; dogmove `Monnam`
  ignored `MGIVENNAME` (D-0095).
- **Do not** force corridor `#` to `NO_COLOR` under `lit_corridor` —
  raises seed1150 Scr but drops seed0900 (C wants CLR_WHITE there).
  Real fix is out-of-sight `S_litcorr`→`S_corr` remap (D-0096).
- seed1150 Scr 38 was **not** invent overlay geometry — volley used
  `doname` (`15 uncursed flints…`) and omitted GemStone `" stone"`;
  C `throw_obj` uses `xname` → `"flint stones"` (D-0097). ^X omits
  gender when `urole.name.f` distinct; MC `"warded"` is under
  Attributes after piousness (not Status).
- `more()` word-wrap of message text must only fire when len≥CO —
  wrapping at CO-8 breaks welcome `--More--` (seed0900).
- **Recorder build on Darwin:** upstream `text=auto` checks out CRLF;
  strip `\r` across the recorder tree and install `sysconf` (comment
  out missing `GDBPATH=/usr/bin/gdb`) before rerecord works.

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
- DECgraphics floor `·` ambiguous doorway/floor/dark/ice; `#`
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
- C `tty_yn_function` / getdir: if `toplin == TOPLINE_NEED_MORE`,
  call `more()` **before** printing the direction prompt (D-0093).
- Caveman sling flint: `multishot_class_bonus` +1 for `-P_SLING` /
  `P_SPEAR`; then `multishot = rnd(multishot)` (D-0093).
- `throwit` must `stackobj` after `place_object` — multishot ammo
  merges so `dog_goal` `dogfood`s once per pile (D-0094).
- `!autopickup` move: `spoteffects`→`pickup(1)`→`check_here`→
  `look_here` `"You see here …"` (D-0095). `Monnam`/`noit_Monnam`
  use bare `MGIVENNAME` when set (Caveman `Slasher`).
- Out-of-sight CORR: `lit_corridor` paints `S_litcorr`/CLR_WHITE while
  `cansee`; `newsym` remaps to `S_corr`/NO_COLOR when `!waslit` (or
  dark_room+color). Set `waslit=(lit!=0)` on cansee (D-0096).
  Map term row = map y+1 (message line).
- Volley pline: `You shoot N %s` with `xname`/`singular`, not `doname`;
  `GemStone` appends `" stone"` (FLINT → flint stone[s]) (D-0097).
  ^X: omit gender when `name.f` distinct from `name.m`; MC
  `"warded"` via worn armor `a_can` (`oc_level`) under Attributes.
- seed0017 dog_goal: when `!couldsee(pet)` and goal is hero, C
  `gettrack` redirects `gg` to an adjacent track cell (D-0099).
  After selecting a closer cell, former equal-distance cells become
  farther → extra `rn2(12)`.
- `#pray` / `ublesscnt=300` → `can_pray` p_type **0** (too soon) even
  on coaligned altar; `prayer_done` → `rnz(250)` + `change_luck(-3)` +
  `gods_upset` → `angrygods` (D-0101). With `initrecord>=STRIDENT(4)`
  and Luck=-3 after change, `maxanger=4`. Cases 0/1 displeased; 2/3
  `godvoice` `rn2(4)` then relearn/`losexp` (no RNG) then `rnz(300)`.
- No `OPTIONS=name`: `plnamesuffix`→`askname` on copyright splash
  (rows 4–7 banners, prompt row 12). Paint BASE grid only — never
  `flush_screen` (rebuilds empty map/botl). Default
  `paranoia_bits` includes `PARANOID_PRAY` → yn before `#pray`
  (D-0102).
- `#chat`/`dotalk`/`dochat`: getdir; empty tile → ECMD_OK (0 RNG);
  dog → `domonnoise` MS_BARK → `"The little dog barks."` + ECMD_TIME
  (D-0103). Generated monsters lack `msound`; infer S_DOG→MS_BARK.
