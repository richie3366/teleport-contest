# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** D-0129 cleared: `initialspell` + `dovspell` VIEW +
  `age_spells` (seed0106 Scr 266/267).
- **Hypothesis:** seed0106 last Scr peel @261 is `^X`/`doattributes` —
  JS `a Aspirant` / `0 experience` / `both energy points` vs C
  `an Aspirant` / `6 experience` / `all 8 energy points`.
- **Falsifier / next:**
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0106-priest-extcmd-sweep.session.json
  # expect Scr 267/267 if attributes page1 matches C; green cohort must stay PASS
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
- **seed2200 Scr 162 msg_window `(not applicable)` was extractor bug**
  — `#if PREV_MSGS /* tty or curses */` comments made `eval_expr` fail →
  False → else branch (D-0114). Do not hardcode the descr.
- **seed0106 Scr 5 was NOT enhance/overview-first** — JS forced DEC
  walls/floors without `symset:DECgraphics`; C Primary ASCII (D-0115).
  All current PASS cohort sessions set `symset:DECgraphics`.
- **seed0106 @13 was verbalize + adjattrib You_feel** — not map glyphs
  (D-0116). Bare `pline` for relearn + silent adjattrib skipped quotes
  and the `more()` forced by `You feel foolish!`.
- **seed0106 @16 `# c`→`# chat` was runnable-subset autocomplete** — full
  C AUTOCOMPLETE has chat/chronicle/conduct so `"c"`/`"ch"` stay unexpanded
  until `"cha"` (D-0117). Do not shrink AC names to ported runners.
- **seed0106 potion `!` yellow vs NO_COLOR was NOT missing OPTIONS=color**
  — C has color (yellow `<`, white `@`/pet). Cause was `obj_is_generic`
  (`!dknown` potions → GENERIC_POTION CLR_GRAY → tty NO_COLOR) (D-0118).
  Do not force all yellow `!` → NO_COLOR.
- **seed0106 @40 dart topline was NOT missing articles alone** — JS
  `canseemon` used `couldsee` so printed throw while kobold off-screen;
  C only `You are hit by a dart.` (D-0119). Do not suppress throw by seed.
- **seed0106 @43 kill topline was NOT message concat** — C
  `hmon_hitmon_msg_hit` skips melee hit when destroyed (D-0119).
- **seed0106 Scr @44 `)` vs `#` was NOT missing death-drop place** —
  object was on floor; pet stood on it while cansee then cell left sight;
  JS remembered terrain under monster instead of C `_map_location`
  object (D-0120). Do not “fix” by forcing newsym on drop alone.
- **Do not map `_map_location` under hero / infrared yet** — hero-underfoot
  memory regresses seed0060 gold `$` (named omission).
- Door open: C `recalc_block_point` before vision sees through;
  DECgraphics open door = meta-a / CLR_BROWN; ASCII open door uses
  `horizontal` → `|` / `-` (D-0113/D-0115).
- **seed0106 @110 blank Dip yn was NOT missing dodip** — silent
  `dipfountain` case 16 + no dryup; JS cleared yn prompt on answer while
  C leaves `TOPLINE_NON_EMPTY` (D-0121). Do not invent a fake pline.
- **seed0106 @116 garlic `"uncursed "` was NOT short_oname length** —
  priest `Role_if(PM_CLERIC)` skips uncursed in `doname` (D-0121).
- **seed0106 @133 enhance was NOT H2344 offx** — stub showed
  `(no skills ready to advance)` corner overlay; C needs `skill_init` +
  `add_skills_to_menu` fullscreen page 1 of 2 (D-0122). Do not pad stub.
- **seed0106 @165 overview was NOT missing Level indent alone** — C
  `print_mapseen` OF_INTEREST feature line (`A fountain.`) from
  `lastseentyp`/`recalc_mapseen`; Level uses TAB (3 spaces), features
  use PREFIX (6) — wrong TAB→PREFIX collapses H2344 offx (D-0123).
- **seed0106 @188 was `#chronicle` unbound** — C `do_gamelog` →
  `show_gamelog(ENL_GAMEINPROGRESS)` NHW_TEXT `Logged events:` + Turn
  column; needs `gamelog_add` at welcome/pray/losexp/weaphit/killer
  (D-0124). Do not invent a static list.
- **seed0106 @199 was `#conduct` unbound** — C `doconduct` →
  `show_conduct(0)` NHW_MENU `Voluntary challenges:`; foodless when
  `!uconduct.food`; petless omitted after `initedog` pets++ (D-0125).
  Do not invent static conduct text.
- **seed0106 @213 was `#vanquished` unbound + missing `mvitals.died++`**
  — C `list_vanquished('y')` NHW_MENU; needs `mondead` census (D-0126).
  Do not hardcode kobold/lichen lines.
- **seed0106 @226 empty `#genocided` was unbound** — C
  `list_genocided` pline when `ngone==0` (D-0126). Menu body when
  genocides exist still deferred.
- **seed0106 @235 was `#adjust` unbound** — C `doorganize` →
  `getobj("adjust")` then destination `yn_function` (D-0127). Do not
  invent a static letter map; destination list blanks used non-mergable
  slots then `compactify`.
- **seed0106 @253 was `#terrain` unbound** — C `doterrain` →
  `View which?` PICK_ONE with `a *` preselected; Esc cancels (D-0128).
  Do not skip the menu and jump to `reveal_terrain`; contest nomux
  paints selected as `*` not `+`.
- **seed0106 @257 was empty dovspell stub + missing initialspell** —
  Priest SPBOOK kit must call `initialspell`; Fail%/Retention need
  role `spel*` + `age_spells` each turn (D-0129). Do not hardcode
  detect monsters / remove curse lines.
- **Fullscreen menu leading pad must be attr 0** — painting
  ` ${header}` with ATR_INVERSE on the whole string makes col-0 inverse;
  C tty pad is plain. With `serialize_for_scoring` (emits leading
  inverse spaces), that regresses enhance headers (D-0129).

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
- angrygods case 2/3: `pline` quote + `verbalize` relearn +
  `adjattrib(A_WIS,-1,FALSE)` → `You feel foolish!` forces `--More--`
  on the quote line (D-0116).
- `ext_cmd_getlin_hook`: unique among **all** AUTOCOMPLETE `ef_txt`
  (wizard-gated); `"c"`≠chat, `"cha"`→chat (D-0117).
- Contest nomux: CLR_GRAY and CLR_BLACK record as NO_COLOR (8); yellow
  hilite works (`\033[93m`). `!dknown` potions use generic class glyph
  color, not shuffled `oc_color` (D-0118).
- `_canseemon` = `(cansee||infrared) && mon_visible` — not `couldsee`
  (D-0119). Melee kill: no `You hit` when already destroyed.
- C `newsym` with visible monster: `_map_location(x,y,FALSE)` then
  `display_monster` — memory keeps object under mon (D-0120).
- `tty_yn_function` leaves prompt on WIN_MESSAGE after answer; `rhack`
  clears after next-command capture (D-0121).
- Cleric `doname`: never print `"uncursed "` (BUC always known) (D-0121).
- `#enhance`: `skill_init` then `add_skills_to_menu`; tty_end_menu
  prompt+blank; lmax=23 → `(1 of 2)`; `\n` dismisses without page 2
  (D-0122).
- `#overview` features: `update_lastseentyp` on cansee map; overview
  calls `recalc_mapseen`; Level=`TAB`/`   `, feat=`PREFIX`/`      `
  (D-0123).
- `#chronicle`: `show_gamelog(0)` → `Logged events:` + ` Turn` +
  `%5ld: %s`; first_weapon_hit before kill so order is hit then killed
  (D-0124).
- `#conduct`: `show_conduct(0)` NHW_MENU; `enlght_line` leading space +
  period; `initedog` always `uconduct.pets++` (starting pet clears
  petless); `show_achievements` skipped unless final||wizard (D-0125).
- `#vanquished`: `list_vanquished('y')` NHW_MENU; `mvitals.died` from
  `mondead`; default `VANQ_MLVL_MNDX`; `"a "` lines get pfx=2 spaces;
  total line when `ntypes>1` (D-0126).
- `#genocided` empty: `pline("No creatures have been genocided.")`
  when `ngone==0` (D-0126).
- `#adjust`: `doorganize` → getobj suggest non-gold → destination
  blanks used non-mergable letters → `compactify` → Esc Never mind
  (D-0127).
- `#terrain`: `doterrain` → `recalc_mapseen` → View which? a/b/c
  (`a *` preselected; nomux `*`) → Esc cancel or reveal_terrain
  (D-0128).
- `+` spells: `initialspell` at SPBOOK ini_inv_use; `age_spells` each
  EOT; Priest Fail% uses robe−spelarmr + shield + spelspec/heal;
  Retention intervals from P_SKILL (D-0129).
