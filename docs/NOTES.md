# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** D-0152 cleared seed0101 `Q`/`doquiver_core` → throw
  `next_ident`/`obj_resists`. Prefix **2302**/2371; Scr **10**/27.
- **Hypothesis / next:** seed0101 `_` travel unbound @2302
  (`distfleeck` vs missing) / seed0015 Scr @21 /
  seed0016 eat-stack `next_ident` @2493 / seed0030 `maybe_smudge_engr`.
  Prefer shared travel or eat-split over baking seed0015 screens alone.
- **Falsifier / next:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0101-ranger-quiver-throw-travel-engrave.session.json
  # expect dotravel / getpos vs missing after throw
  node scripts/rng-diff.mjs sessions/seed0016-healer-newmoon-eat-zap.session.json
  # expect next_ident vs JS mcalcmove (eat split)
  ```
- **Parked deep canary:** D-0006 pet movement — do not implement until C
  state/candidate capture exists.
- **Parked seed2200 @158:** RC config path — harness `$HOME`, not a port bug.

## Don’t re-check

- Do not reject the dart in `can_carry`; an earlier C turn APPORTs it.
- Do not treat `LOST_THROWN` as a carry rejection; C does not.
- Do not gate on raw RNG index/coordinates.
- Role `mnum` must be monster-table IDs (`PM_ROGUE=338`), never roles[] index.
- **roles[] order must match C** (Rogue before Ranger) — pantheon
  `randrole` uses roles[] indices.
- **roles `name.f` is null where C has 0** — only Caveman/Priestess keep
  distinct `f`. Welcome gender uses `!name.f` **and** both-genders
  allow mask (D-0138). Do not restore same-string `f===m` proxy.
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
- **seed0106 @261 was missing kill XP + hardcoded attributes wording** —
  not botl/Xp alone. `xkilled` must call `experience`/`more_experienced`
  (kobold = 6 via AT_WEAP); energy uses `all N` when pwmax>2 (D-0130).
  Do not hardcode `both energy` or `0 experience`.
- **seed2200 help `j` was not a missing dat/hh file** — real dynamic
  `dokeylist` from extcmdlist + default !num_pad binds (D-0131). Do not
  display static hh. `reset_commands` only rebinds N_DIRS=8 (not `<>`).
- **usagehlp empty final `--More--` was display_file over-stripping** —
  keep intentional trailing blank from `\n\n`; only pop split artifact
  (D-0131). Do not strip all trailing empties.
- **seed2200 disco @222 missing `*` books was NOT invent `knows_object`**
  — Wizard `skill_based_spellbook_id` after `skill_init` discovers by
  school skill without `oc_encountered` (D-0132). Do not copy Tourist
  disco or hardcode book lists.
- **seed2200 `:` @229 was NOT missing make_engr_at** — engraving existed;
  `look_here`/`check_here` deferred `read_engr_at` so printed
  `You see no objects here.` (D-0133).
- **seed0501/0105 wipeout_text was NOT graffiti random_engraving** —
  vault `makevtele` → `makeniche(TELEP_TRAP)` → `"ad aerarium"` DUST
  + `wipe_engr_at(5)` (D-0134). Do not stub wipe_engr_at.
- **seed0501 @2205 was unbound `Z`/`docast`** — not percent_success math;
  C `spelleffects_check` `rnd(100)` then SPE_HEALING `getdir`+`zapyourself`
  (D-0135). Spell getdir: `.` is self (success), not cancel.
- **seed0501 @2217 was NOT dog_move candidate/`appr`** — JS stubbed
  `study_book` so `r`/`g` returned early; `y#turn\rn` leaked as movement
  and pet/`udist` diverged before search. C kept `--More--` then
  `Refresh your memory anyway?` (D-0136). Do not “fix” dog_move from
  rng-diff arity alone when keys leaked earlier.
- **seed0501 ^X Priest vs Priestess was always `.m`** — C uses
  `urole.name.f` / `rank.f` when female (D-0137).
- **seed0105 welcome `female` was NOT missing allow alone** — JS had
  `name.f='Valkyrie'` (C has 0) and used `f===m` ⇒ add gender; C adds
  gender only for `!name.f` + both-genders roles (D-0138). Copy
  `urole.allow` from roles[].
- **seed0105 bright-blue `` ` `` was NOT a gem/boulder** — vault niche
  engraving `S_engroom` (`` ` `` + CLR_BRIGHT_BLUE); set `erevealed` on
  cansee then map_engraving (D-0139). Do not invent floor objects.
- **seed0105 Scr @10 blank was deferred wall chat** — C `dochat` wall/
  SDOOR pline when no mon (D-0140). Do not invent a fake floor talker.
- **seed0105 apply `[*]` vs "don't have anything"** — empty SUGGEST must
  early-return like C `getobj` (D-0141); do not prompt `[*]`.
- **seed0105 eat missing-letter must `continue`** — C loops; next
  `yn_function` flushes NEED_MORE → `--More--` (D-0142). Do not return
  null on first bad letter.
- **seed0015/0200 @ lspo_map was NOT missing create_room chance** —
  map-shaped themerms call `des.map`→`lspo_map` (`rn2(COLNO-1-wid)`),
  never `build_room`’s `rn2(100)` (D-0143). Do not burn chance then
  `create_room` for L/S/T/Z/Cross/… maps.
- **seed0015 @357 was Ghost fill body, not dig_corridor** — reservoir
  picked Ghost; need `selection_rndcoord` + spawn/loot (D-0144). Do not
  skip to corridor join when fill name is set but contents empty.
- **`create_monster` always burns `induced_align(80)`** for
  `AM_SPLEV_RANDOM` even when `makemon` (not `mk_roamer`) is used
  (D-0144).
- **seed0015/0200 @ dig_corridor was NOT dig body** — `dig_corridor`
  already matched C; JS `finddpos_shift` omitted irregular inward walk
  so joins failed on map rooms (D-0145). Do not re-port dig from scratch.
- **seed0015 @2513 was missing OIL_LAMP `mksobj_init`** — Valkyrie
  `!rn2(6)` Lamp; C `rn1(500,1000)`+`blessorcurse(5)`; JS TOOL_CLASS
  skipped lamps entirely (D-0146). Do not skip lamp age as “spe-only”.
- **seed0200 @1672 was NOT irregular `somexy` alone** — gold room was
  ordinary `irreg=false`; C `somexyspace` retried after `occupied` saw
  a trap via `t_at`; JS `occupied` omitted traps (D-0147). Irregular
  `somexy`/`inside_room` still needed for flood-fill rooms.
- **seed0200 @1768 was NOT getrumor empty** — `!rn2(4)` short-circuits
  past getrumor into `get_rnd_text(ENGRAVEFILE)` `rn2(2894)`; JS stub
  re-called getrumor/`rn2(2)` (D-0148). Do not burn rumor as engrave
  fallback.
- **seed0015 @2918 was NOT getbones body/arity** — `>` was unbound;
  C `dodown`→`next_level`→`goto_level`→`mklev`→`getbones` `rn2(3)`.
  getbones stub already correct when reached (D-0149). Same lesson as
  D-0068 (`^V` vs getbones).
- **seed0015 @8499 was NOT hero `dotrap`** — C provenance is monster
  `trapeffect_pit` `thitm(..., rnd(6))` after pet steps into PIT;
  needs `monkilled`→`make_corpse` (D-0150). Do not port hero pit first.
- **seed0015 @8518 was NOT broken mtrack arity/`appr`** — C second
  `distfleeck` with 0-RNG `m_move` because hostile `mfndpos` skips
  known SQKY_BOARD; JS never `postmov`→`mon_learns_traps` so kept
  walking onto mtrack back onto the board (`rn2(12)`) (D-0151).
- **seed0101 @2293 was NOT missing throw `splitobj` alone** — `Q` was
  unbound so `Qbytdl` never reached quiver→throw; C `doquiver_core`
  readies uswapwep bow then hand-throw splits arrows (D-0152). Do not
  invent mkobj stubs from rng-diff without reading keys/screens.

## Landmarks

- `Q` → `doquiver_core("ready")`; uswapwep bow → ynq → `setuqwep`;
  throw ammo without launcher → hand-throw pline + half range (D-0152).
- Hostile `m_move` must `postmov`→`mintrap`→`mon_learns_traps`;
  `mfndpos` skips known harmful traps when `!(ALLOW_TRAPS)` (D-0151).
- Monster PIT: `mintrap`→`trapeffect_pit`→`thitm(0,NULL,rnd(6|10))`→
  `monkilled`→`mondied`→`make_corpse`/`mkcorpstat` (D-0150).
- Ordinary `>` → `dodown` → `next_level` → `goto_level` → `keepdogs` →
  `mklev`/`getbones` → `u_on_upstairs` → `losedogs`/`mon_arrive`
  `!rn2(mtame?10:…)` (D-0149).
- Dlvl2+ `makelevel`: after niches/vault, `rn2(u_depth)<3` →
  `do_mkroom(SHOPBASE)` even when mkshop finds no room (D-0149).
- Wizard `^V` → `wiz_level_tele` → `level_tele` → `?\n` menu → letter
  `y` = Quest start (`*-strt`); needs `goto_level` + `makemaz`/`splev`.
- ENGRAVEFILE chunk = 2894 after don't-edit; `!rn2(4)` skips getrumor;
  `get_rnd_text` → `rn2(2894)` then wipeout on drawn line (D-0148).
- `occupied`: `t_at` OR furniture OR lava/pool OR `invocation_pos`
  (D-0147). `invocation_pos` still always-false until wired.
