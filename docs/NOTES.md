# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** D-0174 cleared seed0030 @12968 — `m_initinv` skipped
  `likes_gold`/`!rn2(5)`/`mkmonmoney` so JS hit `peace_minded` while C
  burned `rn2(5)` (dwarf GREEDY). Prefix **12968→13007**; positional
  **13339**/105529; Scr **168**/1953; public Scr **1405**, RNG **134796**;
  still **15/44**.
- **Hypothesis / next:** seed0030 @13007 — C `induced_align` `rn2(3)` vs
  JS `rn2(9)` (mkclass-shaped arity) on the next minefill spawn; or
  seed0101 Scr residual (RNG full), or seed0200 combat `@3382`.
- **Falsifier / next:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0030-ten-diverse-deaths.session.json
  # expect first mismatch past 13007 if induced_align/create_monster order advances
  node frozen/ps_test_runner.mjs sessions/seed0101-ranger-quiver-throw-travel-engrave.session.json
  # expect Scr >21/27 if residual display peel advances
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
- **seed0101 @2302 was NOT search/`set_apparxy` first** — `_` was
  unbound so keys desynced through tip/`E`/`-`/getpos; C `dotravel`→
  getpos tip PICK_NONE then cancel (D-0153). Tip must stay open for
  non-dismiss keys.
- **seed0101 @2309 was NOT NODIAG/`xdir` 4-vs-8** — C `set_apparxy`
  Displacement `!rn2(4)` (Ranger cloak); JS stub always set mux=hero
  with no RNG so next call was `distfleeck` `rn2(5)` (D-0154). Do not
  invent 4-dir movement from arity alone.
- **seed0016 @2493 was NOT missing eat alone** — JS rejected
  STETHOSCOPE so `.` became `donull` and burned `mcalcmove` before
  `e`/`j`; C `use_stethoscope` first use is free (`hero_seq` gate) and
  `.` is self→`ustatusline` (D-0155). Eat still needed `touchfood`→
  `splitobj`→`next_ident` for the apple stack.
- **seed0016 @2551 was NOT missing RAY weffects/`buzz`** — Healer
  `z`/`WAN_SLEEP`/`.` is self `zapyourself` → `fall_asleep(-rnd(50))`
  (D-0156). After sleep, Unaware `gethungry` burns `rn2(10)` before
  `rn2(20)` — do not “fix” by inventing hungrier accessory rolls.
- **seed0016 Scr @3 `[c or ?*]` was NOT empty-SUGGEST / stethoscope** —
  JS `apply_ok` only TOOL_CLASS; C SUGGEST all WAND/SPBOOK too →
  Healer `cfghi` (D-0157). Do not shrink apply letters to ported tools.
- **seed0016 invent @24 Coins col was NOT bare H2344 offx bug** — missing
  `pair of` gloves shortened maxcol so invent shifted right; disco also
  needed `obj_typename` pair-of (D-0158). Do not pad invent offx.
- **seed0016 ^X missing INT page was NOT wrong attr order** — missing
  `There is a new moon in effect.` before XP; continuous 23-row paging
  then puts INT on page 2 (D-0158). Do not hardcode INT→page2 always.
- **seed0015 Scr @13 blank vs "You hear a door open." was deferred
  `postmov` door** — not dosounds; C opens CLOSED doors after step
  (D-0159). Do not invent a fake hear without UnblockDoor.
- **seed0015 Scr @19 missing `--More--` / early Dlvl:2 was NOT missing
  descend text** — C `flush_screen(-1)` + `docrt`→`cls` forces more on
  the stale map before redraw (D-0160). Do not rebuild from new
  `game.level` during that more(); reset topline state per runSegment.
- **seed0015 Scr @20 gold `$` on wall was NOT mineralize-on-HWALL** —
  dlvl1 `mkgold` at ROOM (63,6) left a stale `_objects_at` entry; dlvl2
  HWALL at same coords painted that ghost gold (D-0161). Clearing
  `fobj` alone is not enough — must clear `_objects_at` (+ `head_engr`).
- **seed0015 Scr @21 yellow `<` was NOT “always upstairs yellow”** —
  that matched Dlvl1 known-branch only. C `known_branch_stairs` →
  yellow; ordinary same-dungeon stairs CLR_GRAY→NO_COLOR (D-0162).
  Do not hardcode upstairs=yellow from fixtures.
- **seed0015 Scr @22 missing SQKY hear was NOT dosounds** — deferred
  `trapeffect_sqky_board` You_hear out-of-sight (D-0163). trap.js
  `canseemon` must use real `cansee`, not always-true. `just_an("F note")`
  is letter+space → `an` via `aefhilmnosx` (not vowel-only).
- **seed0015 ^X `female human Valkyrie` was NOT missing name.f alone** —
  `doattributes` must use same both-genders / initgend gate as welcome
  (D-0164). Hardcoded `on level 1` also ignored `depth(u.uz)`.
- **seed0030 @6732 was NOT a stray `rn2(5)`** — C `domove` after
  successful walk calls `maybe_smudge_engr` → `wipe_engr_at(..., rnd(5))`
  on old and/or new cell (D-0165). Call **after** `spoteffects`.
- **seed0030 @6889 was NOT Storeroom/`rn2(1)` leftover** — reservoir
  picked Teleportation hub; need `2+rn2(3)` + room-floor rndcoord
  queue + `post_level_generate` `make_a_trap` teledest + `mktrap`
  victim-gate `rnd(4)` even though TELEP rejects the body (D-0166).
- **seed0030 @10584 was NOT broken `next_ident`/`rnd(1)`** — C
  `mondied`→`make_corpse`→`mkcorpstat`→`next_ident` `rnd(2)`; JS mhitm
  burned `corpse_chance` only so `grow_up` `rnd(m_lev+1)`=`rnd(1)`
  landed next (D-0167). Trap-path already had make_corpse; hero
  `xkilled` still burns chance without corpse.
- **seed0030 @10608 was NOT missing floor pile / poisonous newt** —
  JS early-returned from edible `newdogpos` without `dog_eat`; C
  `dog_eat` re-rolls `dogfood`/`obj_resists` then `delobj`/`obj_resists(0,0)`
  (D-0168). Do not invent extra `fobj` scans from arity alone.
- **seed0030 @10620 was NOT wanderer `dochug` `rn2(4)` / IS_ROOM** —
  pet was `meating` after prior `dog_eat`; C `m_move` decrements and
  returns `MMOVE_DONE` before `dog_move`; JS skipped that gate and hit
  `dog_goal` follow `!rn2(4)` (D-0169). Do not “fix” dog_goal from
  distfleeck arity alone when the pet just ate.
- **seed0030 @10803 was NOT xkilled/`rn2(6)` first** — after barehands
  `rnd(2)=2` (`dmg > 1`), C `hmon_hitmon_stagger` always burns
  `rnd(100)` before damage/kill (D-0170). Do not jump from barehands
  to `xkilled`.
- **seed0030 @10861 was NOT ordinary Medusa `rn2(5)` / themerms reload**
  — hero took Mines branch stairs; C `fill_lvl`→`makemaz(minefill)` →
  nhlib shuffle + `splev_initlev` + `mkmap` `init_fill`. JS ignored
  `fill_lvl` (D-0171). Also dungeon `flags.align` must be `dgn_align&7`
  (C 3-bit truncates `D_ALIGN_LAWFUL=0x40`→0) or `induced_align` burns
  `rn2(100)` instead of `rn2(3)`.
- **seed0030 @12757 was NOT `m_initweap` `rnd(14)` vs `rn2(16)`** —
  C gnome default already `rnd(14)`; JS burned human×gnome
  `peace_minded` co-align because extractor zeroed `M2_GNOME` and
  races lacked `hatemask` (D-0172). Then need S_GNOME `m_initinv`
  `rn2(20)` candle before tail.
- **seed0030 @12907 was NOT induced_align dungeon-align/`rn2(2)`** —
  C went straight to `rn2(3)` for gnome lord; JS burned `find_montype`
  `rn2(2)` because `"gnome lord"` prefix-matched `"gnome"` without NAMS
  `pmnames[MALE]` (D-0173). Do not “fix” induced_align from arity alone.
- **seed0030 @12968 was NOT peace_minded/`rn2(100)` first** — C
  `m_initinv` trailing `likes_gold`/`!rn2(5)` then optional
  `mkmonmoney`/`d(level_difficulty(),…)`; dwarves have `M2_GREEDY`,
  ordinary gnomes do not (D-0174). Do not skip gold just because
  S_GNOME candle path has no GREEDY.

## Landmarks

- STAIRS glyph: `known_branch_stairs(stairway_at)` → CLR_YELLOW;
  else CLR_GRAY (tty NO_COLOR); direction from `ladder & LA_DOWN`
  (D-0162). Dlvl1 upstairs is traversed branch.
- `clear_level_structures` / `goto_level`: clear `fobj` **and**
  `_objects_at` (C `level.objects[][]=0`) and `head_engr` (D-0161).
- `goto_level` descend: `flush_screen(-1)` postpone → You/pline NEED_MORE →
  losedogs → `docrt`→`cls`→`more()` on stale Dlvl:N → clear/redraw →
  `flush_screen(-1)` un-postpone (D-0160).
- Module `_toplin`/`_delay_flushing` must reset in `runSegment` start —
  NEED_MORE leak across sessions makes next `docrt` eat keys (D-0160).
- `postmov` door: amorphous squeeze msg; LOCKED+key unlock; exact
  `doormask == D_CLOSED` open; else smash (`rn2(2)` locked→NODOOR);
  UnblockDoor = doormask+newsym+recalc_block_point+vision_recalc(0)
  (D-0159).
- Armor gloves/boots: `oc_armcat`/`oc_skill` → `pair of ` in
  `obj_typename`/`xname`; dragon scales window → `set of `; LENSES →
  `pair of `; makeplural keeps singular `pair of` (D-0158).
- ^X: moon/friday13 between entered and experience; tty pages 23 content
  rows + `(k of n)` (D-0158). night()/midnight still deferred.
- `apply_ok`: TOOL/WAND/SPBOOK SUGGEST; COIN DOWNPLAY; pick/axe/pole/
  whip SUGGEST; unknown potion DOWNPLAY; known oil SUGGEST; cream pie/
  eucalyptus/jelly SUGGEST; graystone SUGGEST unless known non-touch
  (D-0157).
- WAN_SLEEP self-zap: getdir `.` → `zapyourself` →
  `The sleep ray hits you!` → `fall_asleep(-rnd(50), TRUE)` (D-0156).
- Unaware (`multi < 0 && usleep`): `gethungry` always evaluates
  `!rn2(10)` before accessorytime `rn2(20)` (D-0156).
- STETHOSCOPE: getdir `.` = self (not cancel); first use/hero_seq free
  (`ECMD_OK`); `ustatusline` → `Status of N (fervently Neutral): …`
  (D-0155).
- `touchfood` quan>1 invent → `splitobj(1)` → `next_ident`; reqtime-1
  food finishes in `start_eating` without occupation (D-0155).
- Contest MACOS APPLE joke: `Delicious!  Must be a Macintosh!`
- Healer APPLE stack can be quan>5: `mksobj_init` `!rn2(6)`→quan=2 on
  one of the five `ini_inv` creates, then merge.
- `set_apparxy`: pet/ustuck/`u_at(mux,muy)` early-exit; else
  Displaced→`rn2(4)` / Invis→`rn2(3)` then optional displace loop
  `rn2(2*displ+1)` (D-0154). Cloak otyp stands in for EDisplaced until
  `oc_oprop`/`setworn` props.
- `_` → `dotravel` → pline Where → getpos(force) tip PICK_NONE →
  destination / ESC cancel; `#travel` same (D-0153).
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
- SQKY distant: out-of-sight `You_hear("%s squeak %s.", trapnote,
  nearby|distance)`; range = couldsee ? BOLT_LIM+1 : BOLT_LIM-3;
  `just_an` letter+space uses `aefhilmnosx` (D-0163).
- ^X gender: same gate as welcome — `!name.f` AND (both-genders OR
  innategend!=initgend); dungeon line uses `depth(u.uz)` (D-0164).
- `domove` success: after `spoteffects`, `maybe_smudge_engr(ux0,uy0,ux,uy)`
  → `wipe_engr_at(..., rnd(5))` when `can_reach_floor(TRUE)` and
  non-HEADSTONE engraving (D-0165).
- Teleportation hub: `2+rn2(3)` room-floor picks (skip rel_x≤0); queue
  coords as abs-1/abs_y; postprocess teledest until both axes differ;
  `maketrap`+tseen+teledest; then `mktrap` `rnd(4)` gate (D-0166).
- mhitm `mondied`: `corpse_chance` then ordinary `make_corpse`→
  `mkcorpstat(CORPSE,…,CORPSTAT_INIT)` → `next_ident` `rnd(2)` before
  `grow_up` (D-0167).
- Edible `newdogpos`: set `do_eat` + break (C `goto`); after move call
  `dog_eat` (re-`dogfood` + `m_consume_obj`/`delobj`); do **not**
  early-return from the candidate loop alone (D-0168).
- `m_move` meating: after `mtrapped`, before pet/`dog_move` — decrement
  and `return MMOVE_DONE` (dochug still recalcs `distfleeck`) (D-0169).
- Unarmed melee: `unarmed && dmg > 1 && !thrown && !obj && !Upolyd` →
  `hmon_hitmon_stagger` always `rnd(100)` before `mhp -= dmg` /
  `killed` (D-0170). Stun pline/`mhurtle_to_doom` only if skill gate.
- Mines `fill_lvl`/`makemaz(minefill)` + dungeon align `&7` (D-0171).
- Human hates gnome/orc (`hatemask`); extractor must keep M2_HUMAN…
  M2_ORC in `mflags2s` or `race_hostile` is a no-op (D-0172).
- Mines `m_initinv` S_GNOME: `rn2(20)` candle (else `rn2(60)`); then
  defensive/misc tail (D-0172).
- `name_to_monplus` matches `pmnames[MALE/FEMALE/NEUTRAL]` (NAM/NAMS);
  `"gnome lord"` → PM_GNOME_LEADER + MALE without `rn2(2)` (D-0173).
  Enum-token `"gnome leader"` alone is not enough for NAMS male/female.
- `m_initinv` after defensive/misc: `likes_gold` → `!findgold(minvent)`
  → `!rn2(5)` → `mkmonmoney`/`d(level_difficulty(), minvent?5:10)`
  (D-0174). Gnomes lack GREEDY; dwarves/orcs have it.
