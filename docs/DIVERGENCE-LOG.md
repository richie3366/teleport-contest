# Divergence log

Evidence-backed history of important C↔JS divergences. Active speculation stays
small in `NOTES.md`; once a cause is proved or a dead end is expensive enough
to preserve, record it here.

## Record format

Each entry should include:

- **Status:** open / parked / fixed / rejected hypothesis
- **Observed:** session, channel, first meaningful divergence
- **C locus:** file + function (line numbers optional and version-sensitive)
- **Cause/evidence:** why the diagnosis is established
- **Change:** JS semantic unit changed, without trace alignment
- **Verification:** focused, green, cohort, and full-run commands/results
- **General lesson:** only when reusable

Do not record a guessed cause as fixed merely because an RNG prefix moved.

## Index

| ID | Status | Area | Short result |
|---|---|---|---|
| D-0001 | fixed | input/messages | Missing blocking `--More--` reassigned later keys |
| D-0002 | fixed | object generation | Vault gold must merge rather than allocate again |
| D-0003 | fixed | startup/eat | Tutorial answer and cookie rumor key ownership |
| D-0004 | fixed | starting pet | `apport` derives from pre-attribute `ACURR(A_CHA)` |
| D-0005 | fixed | throwing | `bhit` stops before non-`ZAP_POS` terrain |
| D-0006 | parked | pet movement | Needs reproducible C state/candidate capture |
| D-0007 | fixed | startup/role IDs | Role/race `mnum` must be PM_* not array index |
| D-0008 | fixed | startup/welcome | Tourist Aloha/neutral/HP:10 hardcodes block Rogue first screen |
| D-0009 | fixed | legacy/botl/calendar | Legacy %d/%G + menu offx; showexp/time; moon/friday preamble |
| D-0010 | fixed | makemon invent | `is_armed`+`m_initweap` ordinary envelope; was skipping to `rn2(50)` |
| D-0011 | fixed | corpse timers | `mkcorpstat` must restart timeout when `special_corpse(old)` |
| D-0012 | fixed | weapon init | `is_poisonable` is missiles only — not dagger/spear |
| D-0013 | fixed | container init | starting SACK still calls `mkbox_cnts` → `rn2(1)` |
| D-0014 | fixed | mineralize | `!rn2(3)` must `add_to_buried` (not always `place_object`) |
| D-0015 | fixed | dogfood | tainted CORPSE `age+50<=moves` → POISON (not CADAVER) |
| D-0016 | fixed | mktrap_victim | trap ammo/possessions must `place_object` onto `fobj` |
| D-0017 | fixed | dog_move | `uncursedcnt` + `cursemsg`/`rn2(13*uncursedcnt)` cursed skip |
| D-0018 | fixed | trap/postmov | pet step → `mintrap` dart `t_missile`; `m_cansee`=`clear_path` |
| D-0019 | fixed | --More--/dog_invent | cursemsg+thitm plines; real pickup; drop RNG; tseen trap skip |
| D-0020 | fixed | mon_allowflags | OPENDOOR only if `!(nohands\|\|verysmall)`; was inflating mfndpos cnt |
| D-0021 | fixed | apply/lock | Missing `doapply`/`pick_lock` deferred post-`l` movemon (seed1500 @ 2702) |
| D-0022 | fixed | display | `newsym` omitted floor objects + SDOOR→`?` (seed1500 Scr 1→34) |
| D-0023 | fixed | tutorial menu | `ask_do_tutorial` used title-center pad; C uses NHW_MENU offx |
| D-0024 | fixed | invent/doname/disco | corner invent + doname suffixes; disco `*`/encounter + classes |
| D-0025 | fixed | getobj throw/apply | COIN_CLASS `$` suggest; missing-letter `continue`+`--More--`; clear getdir prompt |
| D-0026 | fixed | legacy + look stairs | Corner legacy keeps map; `look_here`/`stairs_description` Dlvl1 up |
| D-0027 | fixed | u_init orc | orc `Xtra_food` + `inv_subs` after Rogue blindfold |
| D-0028 | fixed | dog_invent/splitobj | nohands partial pickup → `splitobj`/`next_ident` |
| D-0029 | fixed | dog_invent/relobj | pet `relobj`/`mdrop_obj` clears minvent for APPORT |
| D-0030 | fixed | dog_goal/couldsee | `in_masters_sight` must use real `couldsee`, not stub true |
| D-0031 | fixed | dokick/kick_dumb | Ctrl-D empty-space kick → `exercise(A_DEX,FALSE)` before monmove |
| D-0032 | fixed | dogmove/dokick | seed0060 @ 2997: missing m_avoid_kicked_loc after kick |
| D-0033 | fixed | cmd/donull | seed0060 @ 3016: `.` wait missing → skipped turns |
| D-0034 | fixed | makemon/rnd | seed0060 @ 3105: stubbed `makemon(NULL,0,0)` skipped placement RNG |
| D-0035 | fixed | losehp/regen_hp | seed0060 @ 3536: wall kick must `losehp` + EOT `regen_hp` |
| D-0036 | fixed | race hpadv + mon_color | orc `hpadv` + `mon_glyph` mcolors; seed0060 Scr 0→5 |
| D-0037 | fixed | doname COIN + mondied newsym | "a gold piece" + death `newsym`; Scr 5→6 |
| D-0038 | fixed | cansee pline + wall_angle + `>` color | seed0060 Scr 6→37 (silent pickup; unfinished corner; dnstair) |
| D-0039 | fixed | newsym infrared + postmov | orc Infravision shows pet in dark; Scr 37→38 |
| D-0040 | fixed | disco OBJ_DESCR + obj_typename | extracted descr/name strs; Scr 38→39 |
| D-0041 | fixed | ^X enlightenment | autopickup/limits/weapon_descr; Scr 39→41 PASS |
| D-0060 | fixed | mfndpos | BOULDER/`ALLOW_ROCK` + `NODIAG` (grid bug); seed0700 RNG full |
| D-0061 | fixed | exper/levelup | `newhp`/`newpw` level-up + `pluslvl` + `#levelchange`; roles `xlev` |
| D-0062 | fixed | detect/search | `dosearch0` + Searching EOT; next was takeoff then wish |
| D-0063 | fixed | do_wear/takeoff | `T`/`dotakeoff` + delay-0 `armoroff`; seed0361 past `TcTd` |
| D-0064 | fixed | wish/readobjnam | `^W`/`makewish`/`readobjnam` + artifacts; seed0361 past 3 wishes |
| D-0065 | fixed | wield | `w`/`dowield`/`ready_weapon`/`setuwep`/`retouch_object`; seed0361 past Grayswandir wield |
| D-0066 | fixed | wear | `W`/`dowear`/`canwearobj`/`setworn`/`oc_delay`/`nomul`; seed0361 past SDSM dress |
| D-0067 | fixed | puton | `P`/`doputon`/`Amulet_on` + accessory path; seed0361 past ALS; next `getbones` |
| D-0068 | fixed | mkobj/egg | EGG `can_be_hatched` retry + growth helpers; seed0102 1281→4451 |
| D-0069 | fixed | fire/`f` | fireassist swap+cmdq; seed0102 RNG full (udist via no leaked `l`) |
| D-0070 | fixed | display/xprname | full MLET_CH + furniture terrain + prinv `dot`; seed0102 Scr 0→17 |
| D-0071 | fixed | getdir/legacy | `help_dir` NHW_TEXT + no-retry; Book `maxcol=strlen+1`/pad; seed0102 PASS |
| D-0072 | fixed | lookaround | run==1 corridor-turn; seed0017 prefix 2775→3132 |
| D-0073 | fixed | potion/quaff | `q`/`dodrink`/`peffect_oil`; seed2200 2724→2733 |
| D-0074 | fixed | zap/findit | `z`/`dozap` NODIR secret-door/`findit`; seed2200 2733→2772 |
| D-0075 | fixed | read/mapping | `r`/`doread` SCR_MAGIC_MAPPING + `do_mapping`; seed2200 2772→2925 |
| D-0076 | fixed | engrave | `E`/`doengrave` fingertip DUST Elbereth + occupation; seed2200 2925→2979 |
| D-0077 | fixed | whatis/help | `/`/`dowhatis` + `?`/`dohelp`/`get_lua_version`; seed2200 RNG full |
| D-0078 | fixed | tty/botl | H2344 NHW_MENU offx + `get_strength_str`; seed0700 Scr 2→44 |
| D-0079 | fixed | Samurai invent | `makedog` Hachi + Japanese display + lacquer + observe; seed0700 PASS |
| D-0080 | fixed | display/statue | `obj_glyph` STATUE → mons[corpsenm].mlet + `obj_color(STATUE)`; seed2200 Scr 1→11 |
| D-0081 | fixed | display/map | `magic_map_background` dark_room → keep floor · (not blank); seed2200 Scr 11→89 |
| D-0082 | fixed | getpos tip | `nhl_text` NHW_MENU corner offx (not fullscreen blank); seed2200 Scr 89→90 |
| D-0083 | fixed | farlook stairs | `lookat` cmap `S_brupstair` + getpos curs-after-flush; seed2200 Scr 90→109 |
| D-0084 | fixed | getpos rush | `HJKLYUBN`/`C(dir)` → 8× `truncate_to_map`; seed2200 Scr 109→113 |
| D-0085 | fixed | pager/checkfile | NHW_MENU `process_text_window` + CR/tabexpand; seed2200 Scr 113→117 |
| D-0086 | fixed | objnam/doname | SCR/SPE/RIN/WAN `… of` + bimanual `hands` + `oc_big`; invent @i |
| D-0087 | fixed | pager look_all | NHW_TEXT more@23 + coords/glyph + shown-filter + statue/engr |
| D-0088 | fixed | version/doextversion | OPTIONS_AT_RUNTIME options+windowing+soundlib+Lua license pages |
| D-0089 | fixed | NHW_TEXT dmore | `xwaitforspace(quitchars)` — non-space keys stay on page |
| D-0090 | fixed | pager/dowhatdoes | tip+`What command?`+`key2extcmddesc`; seed2200 Scr 167→176 |
| D-0091 | fixed | options/help | `option_help`/`next_opt` + optlist extract; seed2200 Scr 176→199 |
| D-0092 | fixed | mklev/themerooms | `in_mk_themerooms` for `check_room` abort; seed0017 still @3132 |
| D-0093 | fixed | dothrow/getdir | flush `--More--` before getdir + Caveman multishot; seed1150 3032→3042 |
| D-0094 | fixed | invent/stackobj | throw landing `stackobj` merge; seed1150 RNG full |
| D-0095 | fixed | pickup/Monnam | `spoteffects`/`check_here` + given-name Monnam; seed1150 Scr 22→27 |
| D-0096 | fixed | display/newsym | out-of-sight litcorr→corr; seed1150 Scr 27→46 |
| D-0097 | fixed | objnam/throw/^X | GemStone xname + volley + gender/MC; seed1150 PASS |
| D-0098 | fixed | dog_move mtrack | `goto nxti` candidate skip (was inner `continue`) |
| D-0099 | fixed | dog_goal gettrack | `!couldsee` → gettrack gg; not missing (30,4) terrain |
| D-0100 | fixed | mklev wallification | post-fill full-map `wallification` like C `themerooms_post`; not (30,4) |
| D-0101 | fixed | `#pray` / prayer_done | unbound extcmd; p_type 0 → rnz(250)+angrygods |
| D-0102 | fixed | askname + ParanoidPray | no-name splash/`Who are you?`; default pray yn |
| D-0103 | fixed | `#chat` / dochat | unbound extcmd; getdir `l` became move → fake `do_attack` peel |
| D-0104 | fixed | dokick/kick_door | CLOSED door used kick_ouch stand-in; need exercise TRUE + rnl(35) |
| D-0105 | fixed | mthrowu/monmulti | MMOVE_MOVED must fall through to thrwmu when !nearby+AT_WEAP |
| D-0106 | fixed | combat/mhitu | `mattacku` melee HTH/`hitmu` for adjacent AT_WEAP |
| D-0107 | fixed | combat/uhitm | hero `do_attack`→`overexertion`/`hitum`/`xkilled` |
| D-0108 | fixed | mon/relobj | `mondead`→`m_detach` must `relobj` minvent onto fobj |
| D-0109 | fixed | sit/dip | `#sit`/`#dip`/`dipfountain`; seed0106 4097→4141 |
| D-0110 | fixed | extcmd menus | `#offer`/`#enhance`/`#annotate`/`#overview`/`#version`; seed0106 RNG full |
| D-0111 | fixed | chargen | `player_selection`/`genl_player_setup`; seed0077 100→1475 |
| D-0112 | fixed | mklev/vault | `do_vault` `create_vault` fallback (not one `rnd_rect`); seed0077 RNG full |
| D-0113 | fixed | vision/lock/display | door `recalc_block_point` + `pick_lock` D_ISOPEN + DEC open-door `a`; seed0077 PASS |
| D-0114 | fixed | options/extract | `#if PREV_MSGS /*…*/` comment broke extract → stale `(not applicable)` msg_window |
| D-0115 | fixed | display/symset | Honor `symset:DECgraphics`; default Primary ASCII walls/floors/open doors |
| D-0116 | fixed | pray/attrib/pline | angrygods `verbalize` + `adjattrib` You_feel → quote/`--More--`; seed0106 Scr 32→34 |
| D-0117 | fixed | getline/extcmd AC | full AUTOCOMPLETE uniqueness for NEWAUTOCOMP; seed0106 Scr 34→38 |
| D-0118 | fixed | display/glyph | `obj_is_generic` + tty gray/black→NO_COLOR; seed0106 Scr 38→46 |
| D-0119 | fixed | mthrowu/uhitm msg | `canseemon`+`thitu` an/exclam/miss; melee skip hit when destroyed; seed0106 Scr 46→49 |
| D-0120 | fixed | display/newsym | `_map_location` memory under visible mon; seed0106 Scr 49→250 |
| D-0121 | fixed | yn/doname | leave yn prompt after answer; cleric skip `"uncursed "`; seed0106 Scr 250→253 |
| D-0122 | fixed | skill/#enhance | `skill_init` + `add_skills_to_menu` paged PICK_NONE; seed0106 Scr 253→254 |
| D-0123 | fixed | dungeon/overview | `lastseentyp`/`recalc_mapseen` + overview feature line; TAB vs PREFIX; seed0106 Scr 254→255 |
| D-0124 | fixed | insight/#chronicle | `do_gamelog`/`show_gamelog` + livelog wire; seed0106 Scr 255→257 |
| D-0125 | fixed | insight/#conduct | `doconduct`/`show_conduct` + `initedog` pets++; seed0106 Scr 257→259 |

D-0001 through D-0005 predate the strict-length/cohort runbook. Their focused
causes are preserved, but generic "green sessions held" is historical evidence,
not enough to promote an entire function to `parity`. Re-run focused + green +
cohort gates if those functions are touched again.

## D-0001 — blocking `--More--` owns input keys

- **Observed:** `seed0900-tourist-explore-actions`, RNG divergence near 2936.
- **C locus:** `pline.c`/tty `more()` and callers in pet combat.
- **Cause/evidence:** C blocked on topline `--More--` and consumed 59 reject
  keys followed by ESC. JS lacked the blocking prompt, so those keys became
  later gameplay commands.
- **Change:** ported `pline`/`more` input behavior and combat messages; async
  propagation reaches `nhgetch` without reordering physics.
- **Verification:** seed0900 RNG 2983/2983 and screens 84/84; seed8000 remained
  fully green.
- **Lesson:** map keys to input boundaries before attributing an RNG mismatch
  to game logic.

## D-0002 — vault gold merge

- **Observed:** seed1800 divergence around RNG 1057.
- **C locus:** C gold placement/merge path (`mkgold` and object lists).
- **Cause/evidence:** C merged into an existing gold stack; JS allocated a new
  object and consumed `next_ident`/`rnd(2)`.
- **Change:** use the C merge path and preserve object-list semantics.
- **Verification:** focused seed1800 prefix advanced; both green sessions held.

## D-0003 — tutorial and fortune cookie input ownership

- **Observed:** seed1800 divergence around 2362.
- **C locus:** startup tutorial prompt and `eat.c` rumor path.
- **Cause/evidence:** the rc did not disable the tutorial. `n` answered its
  yes/no prompt; it was not a north command. Later `e b` ate the cookie and
  entered `outrumor`/`getrumor`.
- **Change:** ported the prompt/key ownership and cookie rumor path.
- **Verification:** focused seed1800 advanced through the cookie sequence;
  green sessions held.

## D-0004 — starting-pet apport

- **Observed:** seed1800 divergence around 2403.
- **C locus:** `dog.c:makedog`/`initedog`, `attrib.c:acurr`.
- **Cause/evidence:** `makedog` runs before initial attributes are established.
  Non-Strength `ACURR` clamps to 3, so the starting pet gets `apport=3`.
  A JS `|| 10` fallback changed the later `rn2(8)` decisions.
- **Change:** ported the clamp and removed the invented fallback.
- **Verification:** focused seed1800 advanced; green sessions held.

## D-0005 — thrown object stops before blocked terrain

- **Observed:** JS embedded the dart in a wall; C placed it on stairs at
  `(47,18)` in the current seed1800 trace.
- **C locus:** `zap.c:bhit`, called by `dothrow.c:throwit`.
- **Cause/evidence:** C backs up/stops when the next cell is not `ZAP_POS` or is
  a closed door. JS only treated stone as blocking.
- **Change:** use the C terrain predicate/order.
- **Verification:** dart landing and RNG advanced to the current pet-movement
  divergence; green sessions held.
- **Lesson:** the coordinate is evidence, not the implementation rule.

## D-0006 — pet selection after dart APPORT

- **Status:** parked. Do not spend another loop iteration on it until the C
  state/candidate-set falsifier below is executable.
- **Observed:** `seed1800-tourist-eat-throw`, first RNG divergence at index
  2417. C calls `rn2(1)` in `dog_move`; JS calls `dogfood`/`obj_resists` on the
  dart first.
- **C locus:** `dogmove.c:dog_goal`, `dog_move`, and `mon.c:mfndpos`.
- **Established state:** JS pet `(48,17)`, hero `(48,18)`, APPORT goal dart
  `(47,18)`, squared `udist=1`, `mconf=0`, `mflee=0`, pet `apport=3`.
- **Rejected hypotheses:**
  - reject the dart in `can_carry`: contradicted by an earlier C APPORT success;
  - gate behavior on raw RNG index/coordinates: advanced the trace but broke
    seed0900 and violates the Constitution;
  - treat `LOST_THROWN` as a general carry rejection: not present in C.
- **Useful experiment (not shipped):** forcing `appr=0`, omitting candidate
  `(47,16)`, and ending selection after dart `dogfood` reached RNG 2435. This
  narrows the state/candidate-set question but is not a fix.
- **Next falsifier:** build/verify the recorder, add local-only instrumentation
  (never a production JS oracle) for C pet position, `gg`, `appr`, and exact
  `mfndpos` candidates/flags at this turn, then compare branch-by-branch before
  changing selection. No verified recorder binary/instrumentation command is
  currently available, so `rng-diff` alone is insufficient.
- **Required gate:** seed8000 + seed0900 remain fully green.

## D-0007 — role/race `mnum` identity (array index vs PM_*)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** 33/44 public sessions threw `u_init_role: role not ported`.
  Even Tourist matched only via `mnum === 10` (roles[] index) or name fallback.
- **C locus:** `role.c` `roles[].mnum` / `races[].mnum`; `u_init.c`
  `Role_switch` / `Race_switch` (`PM_ROGUE`, `PM_TOURIST`, `PM_HUMAN`, …).
- **Cause/evidence:** JS stored roles[] indexes (`Rogue=8`, `Tourist=10`,
  `human=0`) where C stores monster-table IDs (`338`, `340`, `260`).
- **Change:** `js/roles.js` uses generated `PM_*` constants; Rogue attrs/gods/
  `petnum`; `u_init.js` ports Rogue `trobj` + blindfold/`knows_object(SACK)` /
  dagger `knows_class` stand-in + wield/wear for short sword / leather armor.
- **Omissions named in C-JS-MAP:** `Skill_R`; full `knows_class` needs
  `oc_skill` in objects extractor; other roles still throw.
- **Verification:** green exact-length PASS; Rogue cohort no longer throws
  `role not ported` (seed1500 RNG 1173/2768; seed0013 519/4838). Role throws
  on full suite now **29/44**.
- **Lesson:** identity fields that drive `switch (Role_switch)` must come from
  the monster table, not the roles[] enumeration order.

## D-0008 — Tourist welcome/HP/align hardcodes vs Rogue first screen

- **Status:** fixed (verified 2026-07-12).
- **Observed:** after Rogue `u_init_role` existed, `allmain.js` still emitted
  `Aloha … neutral …` and forced `HP:10` / `ualign.type=0`. Rogue sessions
  expect `Hello … chaotic … Rogue` and `HP:12(12)`.
- **C locus:** `role.c:Hello`; `allmain.c:welcome`; `attrib.c:newhp` +
  `exper.c:newpw` at `u.ulevel==0`; `u_init.c` align from
  `aligns[flags.initalign]`; `insight.c` pantheon/`wallet` lines.
- **Cause/evidence:** Tourist-shaped literals ignored role `hpadv` (Rogue
  infix 10 + human 2 = 12) and rc `align:chaotic`.
- **Change:** `Hello(mnum)`, role/race `hpadv`/`enadv`, `newhp`/`newpw`, rc
  align → `ualign`, `welcome()`, invent pantheon + empty wallet.
- **Verification:** green PASS + strict lengths; Rogue step0/1 show
  `Hello … Rogue` and `HP:12` (remaining cell diffs = attrs/map after mklev
  RNG diverge).
- **Lesson:** shared startup display must read role/race/rc tables, not the
  first green seed’s literals.

## D-0009 — Rogue legacy pantheon/layout, botl flags, moon/friday

- **Status:** fixed (verified 2026-07-12).
- **Observed:** Rogue legacy `Book of Mog` vs C `Kos`; status always
  `Xp:N/0 T:T` vs C `Xp:N` when `!showexp`/`!time`; welcome `--More--`
  skipped before tutorial; seed0013 missing full-moon / Friday-13 plines.
- **C locus:** `quest.lua` `%d`/`%G` + `questpgr.c:convert_arg`;
  `pray.c:align_gname`/`align_gtitle`; `wintty.c` NHW_MENU `offx`;
  `botl.c` plname capitalize + `flags.showexp`/`flags.time`;
  `calendar.c:phase_of_the_moon`/`friday_13th`; `allmain.c:moveloop_preamble`.
- **Change:** `js/questpgr.js` alignment deity + offx layout; Tourist
  `ngod='_The Lady'`; `status_line_2` gates Xp/T; `flush_topl_more` before
  tutorial menu paint; `js/calendar.js` + preamble moon/friday + `change_luck`.
- **Verification:** green PASS + strict; seed1500 legacy/welcome text+cursor
  match (attrs still diverge); seed0013 moon/friday message lines match.
- **Next peel:** cleared by D-0010; then `start_corpse_timeout` (idx 1194).
- **Lesson:** shared startup UI must follow C convert_arg / tty menu geometry
  and datetime calendar, not Tourist-shaped constants.

## D-0010 — makemon skipped `m_initweap` (ordinary armed envelope)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **1112**: C `rn2(4)` @
  `m_initweap` (S_KOBOLD darts) vs JS `rn2(50)` @ `m_initinv_tail` only.
- **C locus:** `mondata.h:is_armed` / `attacktype(AT_WEAP)`;
  `makemon.c:m_initweap` / `m_initthrow` / `mongets`; call from `makemon`
  when `allow_minvent`.
- **Cause/evidence:** JS never called `m_initweap`; kobold shaman lacks
  AT_WEAP so mlet-only `is_armed` would be wrong — extractor now emits
  `has_at_weaps`.
- **Change:** `scripts/extract-monsters.py` + `has_at_weaps`; `is_armed` in
  `monsters.js`; `m_initthrow`/`mongets`/`m_initweap` ordinary envelope in
  `makemon.js` (S_KOBOLD/S_ORC/S_OGRE/S_GIANT/S_CENTAUR/S_WRAITH/S_ZOMBIE/
  S_HUMANOID + default; trailing `rn2(75)` offensive gate).
- **Verification:** green PASS + strict; seed1500 first mismatch moves to
  idx **1194** `start_corpse_timeout`; runner 1275/2768; seed0060 2464/3626;
  full suite 2/44, RNG 25334/792838, screens 108/11405.
- **Omissions:** S_HUMAN/S_ANGEL/S_KOP/S_DEMON/S_TROLL/S_LIZARD specials;
  `m_initinv` body; `add_to_minv` merge; demon→default FALLTHROUGH;
  `rnd_offensive_item` hard-helmet FALLTHROUGH.
- **Lesson:** gate invent on real AT_WEAP, not mlet; port throw/mongets
  before invent-tail RNG.

## D-0011 — `mkcorpstat` skipped timeout restart after special random corpse

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **1194**: C `rn2(1000)` @
  `start_corpse_timeout` vs JS `rn2(8)` (already into next room fill). DIAG:
  random `mksobj` CORPSE picked `PM_LICHEN` → first timeout no-ops; C
  `mkcorpstat` override to trap victim restarts because
  `special_corpse(old)`; JS overrode corpsenm without restart.
- **C locus:** `mkobj.c:start_corpse_timeout`, `special_corpse`,
  `mkcorpstat` ptr-override restart; `mklev.c:mktrap_victim`.
- **Change:** full `start_corpse_timeout` RNG envelope (lizard/lichen,
  `rnz(rot_adjust)`, rider/troll branches); `special_corpse` +
  `mkcorpstat` restart; `age` on `mksobj`; trap-victim `TAINT_AGE` age
  adjust. Timer fire / `zombie_form` still deferred.
- **Verification:** green PASS + strict; seed1500 first mismatch → idx
  **2223** (`m_initinv` vs `m_initinv_tail`); runner 2255/2768, screen 1/40;
  seed0060 2464/3626; full suite 2/44, RNG 26314/792838, screens 109/11405.
- **Lesson:** lichen/lizard/troll/rider random corpses force a second
  `start_corpse_timeout` after `mkcorpstat` override — skipping the restart
  drops the entire `rnz` leaf.

## D-0012 — `is_poisonable` wrongly included daggers

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **2223**: C `rn2(10)` @
  `trquan` (Rogue dagger `ini_inv_adjust_obj`) vs JS `rn2(100)` still inside
  dagger `mksobj_init`. Prior notes misread provenance as `m_initinv`.
- **C locus:** `obj.h:is_poisonable` (missile `oc_skill` in
  `-P_SHURIKEN..-P_BOW`, or `permapoisoned`); `mkobj.c:mksobj_init`
  `is_poisonable && !rn2(100)`.
- **Cause/evidence:** DIAG stack at 2223 was `mksobj_init` poison roll.
  JS listed `DAGGER`/`SPEAR` as poisonable; C does not. Short sword already
  skipped the roll (not in the bad list), so invent matched until dagger.
- **Change:** `js/mkobj.js` `is_poisonable` ≡ `is_multigen` (name-list stand-in
  for the missile skill window); `permapoisoned` (Grimtooth) deferred.
- **Verification:** prefix moved to idx **2240** (sack); after D-0013 →
  **2298**. Green PASS + strict; cohort seed1500 2348/2768, seed0060
  2478/3626; full suite 2/44, RNG 26409/792838, screens 109/11405.
- **Lesson:** trust C macros over “weapons that can be poisoned in play”;
  `trquan` provenance mid-mklev timeline is invent after `makedog`, not
  monster invent.

## D-0013 — starting SACK omitted `mkbox_cnts`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2240** after D-0012: C `rn2(1)` @ `trquan`
  (sack adjust) vs JS already at blindfold `rn2(5)`. C had an extra
  `mkbox_cnts` `rn2(1)` with `n=0` for empty starting sack.
- **C locus:** `mkobj.c:mksobj_init` TOOL_CLASS FALLTHROUGH `SACK` →
  `mkbox_cnts`; `mkbox_cnts` empty-sack when `moves<=1 && !in_mklev` still
  does `rn2(n+1)`.
- **Change:** call `mkbox_cnts` for `SACK`/`OILSKIN_SACK`/`BAG_OF_HOLDING`/
  `ICE_BOX`; port empty-starting-sack `n=0` branch.
- **Verification:** with D-0012; seed1500 first mismatch → idx **2298**
  (`dog_goal`); green + strict PASS; full suite as in D-0012.
- **Lesson:** empty containers can still consume RNG; TOOL_CLASS fallthrough
  into `mkbox_cnts` is not chest-only.

## D-0014 — mineralize always placed gold/gems on `fobj`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2298**: C `rn2(8)` @ `dog_goal` vs JS
  `rn2(100)` (extra `obj_resists`). DIAG: first in-bbox floor object was
  gold on STONE behind a wall — `can_reach_location` false — so JS skipped
  APPORT and rolled `dogfood` on the next object.
- **C locus:** `mklev.c:mineralize` — `!rn2(3) ? add_to_buried : place_object`;
  `mkobj.c:add_to_buried` threads `buriedobjlist`, not `fobj`.
- **Cause:** JS consumed `rn2(3)` but always `place_object`, so buried mineral
  gold stayed on `fobj` and polluted `dog_goal` scans.
- **Change:** `js/mkobj.js` `add_to_buried`; `js/mklev.js` mineralize gold/gem
  branch matches C bury-vs-place; set `ox`/`oy`/`owt` before bury/place.
- **Verification:** idx **2298** `rn2(8)` matches; next break **2300**. Green
  PASS + strict; cohort seed1500 2343/2768, seed0060 2494/3626; full suite
  2/44, RNG 26445/792838, screens 109/11405.
- **Lesson:** RNG-consuming stubs that ignore the branch still change later
  observable state (`fobj` membership), not just the log.

## D-0015 — tainted CORPSE must be POISON in `dogfood`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** after D-0014, JS set `gtyp=CADAVER` over APPORT for room
  corpse (`corpsenm=PM_ORC`, `age=-50` from mklev `age -= TAINT_AGE+1`), then
  entered follow-player `rn2(4)` while C kept APPORT and continued scanning.
- **C locus:** `dog.c:dogfood` — `peek_at_iced_corpse_age(obj)+50 <= moves`
  → POISON (before CADAVER return).
- **Change:** `js/dogmove.js` CORPSE case age check; also port
  `cursed_object_at` into `dog_goal` (was omitted).
- **Verification:** JS no longer takes follow `rn2(4)` here; mismatch is C
  `rn2(100)` vs JS `rn2(5)` @ idx **2300** (3 missing `obj_resists`). Green
  + strict PASS; suite as D-0014.
- **Lesson:** mklev-tainted corpses are intentionally inedible; treating them
  as CADAVER lets food goals clobber APPORT and desync the follow branch.
- **Named omission:** full `poisonous`/`acidic`/`carnivorous` via `mflags1`
  still deferred (age path covers this corpse).

## D-0016 — `mktrap_victim` created loot but never placed it

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2300**: C three extra `obj_resists` before
  `distfleeck`; JS `fobj` bbox had only APPORT gold + tainted CORPSE.
- **C locus:** `mklev.c:mktrap_victim` — `place_object` for trap ammo
  (ARROW/DART/ROCK) and each cursed possession; gnome candle likewise;
  PIT (ex-landmine) uses `breaktest` then dealloc instead of place.
- **Cause:** JS `mksobj`/`mkobj`+`curse` consumed creation RNG but left
  objects off `fobj`, so `dog_goal` never `dogfood`’d them. seed1500 trap
  was DART_TRAP with two possessions (food+gem) → exactly 3 missing scans.
- **Change:** `js/mklev.js` `mktrap_victim` places ammo/possessions/candle;
  local `mktrap_breaktest` for PIT debris (RNG-consuming like C `breaktest`).
- **Verification:** first mismatch **2300→2517** (`dog_move` cursed-square
  `rn2(39)`); runner seed1500 2518/2768, seed0060 2494/3626; green PASS +
  strict; full suite 2/44, RNG 26624/792838, screens 109/11405.
- **Lesson:** levelgen helpers that “create for flavor” without C’s
  `place_object`/`add_to_buried` desync later pet scans even when creation
  RNG already matched.
- **Named omission:** `mkgrave_room` still skips `add_to_buried` for its
  gold/loot; `begin_burn` for unlit gnome candles deferred.

## D-0017 — `dog_move` cursed-square `uncursedcnt` / `cursemsg`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2517**: C `rn2(39)` @ `dogmove.c:1238`
  (`rn2(13*uncursedcnt)` with `uncursedcnt==3`); JS `rn2(1)` (approach
  `!rn2(++chcnt)` — never took the cursed continue).
- **C locus:** `dogmove.c:dog_move` — pre-loop `uncursedcnt` skips
  blocked `MON_AT` and `cursed_object_at`; candidate loop sets
  `cursemsg[i]` on cursed pile objects; then
  `cursemsg[i] && !mleashed && uncursedcnt>0 && rn2(13*uncursedcnt)` continue.
- **Cause:** JS counted every `mfndpos` slot as uncursed and skipped cursed
  food objects without setting `cursemsg`, so the cursed-square RNG never ran.
- **Change:** `js/dogmove.js` `dog_move` ports the count loop, `cursemsg`,
  and cursed continue (food-eat still collapses to immediate move).
- **Verification:** first mismatch **2517→2522** (`next_ident` + WEAPON
  `mksobj_init`); runner seed1500 2526/2768, seed0060 2494/3626; green PASS
  + strict; full suite 2/44, RNG 26664/792838, screens 109/11405.
- **Lesson:** pets’ “avoid cursed unless forced” is two-phase (count then
  probabilistic skip); inventing approach RNG without that skip desyncs
  quietly even when `dog_goal` APPORT already matches.
- **Named omission:** food `goto newdogpos` / eat side effects still partial;
  leash / trap / displace / minion branches deferred.

## D-0018 — pet `postmov` dart trap + `m_cansee` clear_path

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2522**: C `rnd(2)` @ `next_ident` then WEAPON
  `mksobj_init` (`rn2(6)`/`rn2(11)`/`rne(3)`) + erosions +
  `trapeffect_dart_trap`/`thitm`; JS `rnd(5)` from `score_targ`.
- **C locus:** `monmove.c:m_move` → `postmov` → `mintrap`;
  `trap.c:trapeffect_dart_trap` → `t_missile(DART)`; `vision.h:m_cansee` ≡
  `clear_path`. Provenance after approach selection: dart create, not
  `mongets`.
- **Cause:** (1) JS `m_move` returned `dog_move` without `postmov`/`mintrap`.
  (2) `find_targ` stubbed `m_cansee` always-true, so `pet_ranged_attk` scored
  a newt through walls (`rnd(5)`) before the step.
- **Change:** `js/trap.js` dart monster path (`t_at`/`t_missile`/`thitm`/
  `mintrap`); `js/monmove.js` `postmov` after pet `dog_move`;
  `js/vision.js` export `clear_path`/`m_cansee`; `js/dogmove.js` use
  `m_cansee` in `find_targ`/`find_friends`, return `MMOVE_MOVED` when
  stay-put (C).
- **Verification:** first mismatch **2522→2563** (`dog_invent` `rn2(udist)`
  4 vs 10); runner seed1500 2598/2768, seed0060 2494/3626; green PASS +
  strict; full suite 2/44, RNG 26687/792838, screens 109/11405.
- **Lesson:** post-move weapon RNG is often trap ammo (`t_missile`), not
  monster invent; LOS stubs that always see through walls inject
  `score_targ` fuzz RNG before the real caller.
- **Named omission:** non-dart `trapeffect_*`; `thitm` hit/`dmgval`/
  `monkilled`; `stackobj` merge; `dog_invent` real pickup (`mpickobj`).

## D-0019 — cursemsg/--More-- keys + dog_invent pickup + seen-trap skip

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2563**: C `rn2(4)` @ `dog_invent` vs JS
  `rn2(10)` (udist 4 vs 10). Pet stayed put after dart; hero should be
  ortho dx=2 after `k`, but JS hero had walked during pending `--More--`.
- **C locus:** `dogmove.c:dog_move` cursemsg `pline` (reluctantly onto);
  `trap.c:thitm` miss `pline` (almost hit); `dog_invent` `mpickobj` +
  droppables/`rn2(udist+1)`; `mfndpos` `ALLOW_TRAPS` + `seetrap`/`tseen`
  `rn2(40)` skip.
- **Cause:** (1) Missing cursemsg + thitm plines → no `--More--`, so keys
  `l,l,j,j,h,h,.` moved the hero instead of being eaten (udist diverged).
  (2) `dog_invent` only stubbed pickup RNG → no minvent → wrong APPORT
  `rn2(8)` / drop path. (3) No `tseen`/`ALLOW_TRAPS` candidate skip.
- **Change:** cursemsg + thitm miss plines; `obj_extract_self`/`mpickobj`;
  `droppables` + drop RNG; dog_goal lit/`m_cansee` APPORT gates; `seetrap`;
  mfndpos `ALLOW_TRAPS`; dog_move `rn2(40)` skip; CORPSE `doname` corpsenm.
- **Verification:** first mismatch **2563→2618** (wild `m_move` track
  `rn2(20)` vs `rn2(24)`); runner seed1500 **2700/2768**, seed0060
  2493/3626; green PASS + strict; full suite 2/44, RNG **26858**/792838,
  screens 109/11405.
- **Lesson:** message `--More--` is position-critical; invent stubs that
  skip `mpickobj` still break later `dog_has_minvent` gating.
- **Named omission:** `relobj` body; `splitobj`; `couldsee` for
  `in_masters_sight`; full `droppables` tool-keeping; `m_harmless_trap`;
  non-pet `mon_knows_traps` skip in mfndpos.

## D-0020 — mon_allowflags OPENDOOR for nohands/verysmall

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2618**: C `rn2(20)` @ `m_move` track vs JS
  `rn2(24)`. DIAG at mismatch: newt at (70,7) with `cnt=6` including closed
  door (70,8) `D_CLOSED`; C `cnt=5`.
- **C locus:** `mon.c:mon_allowflags` `can_open =
  !(nohands(data)||verysmall(data))`; `mfndpos` skips closed doors without
  `OPENDOOR`.
- **Cause:** JS always `| OPENDOOR`. Newts are verysmall+nohands → must not
  open doors → closed-door neighbors must be omitted from `mfndpos`.
- **Change:** extract `mflags1` (`scripts/extract-monsters.py`);
  `nohands()`; `mon_allowflags` gates `OPENDOOR` on `can_open`.
- **Verification:** first mismatch **2618→2702** (JS log ends after
  wipe_engr; C continues `distfleeck`); runner seed1500 **2702/2768**,
  seed0060 2489/3626; green PASS + strict; full suite 2/44, RNG
  **26889**/792838, screens 109/11405.
- **Lesson:** `mfndpos` cnt is allowflags-sensitive; never grant OPENDOOR
  to all species.
- **Named omission:** full `mon_allowflags` (unlock/bust/dig/bars); 
  `mon_knows_traps` skip; `m_harmless_trap`; `bad_rock` diagonal squeeze.

## D-0021 — missing `doapply` / lock-pick turn (deferred movemon)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first mismatch at idx **2702**: C `distfleeck` after
  wipe_engr; JS RNG log ended. Hypothesis that JS exited early for
  `umovement`/`encumbrance` was **falsified** (DIAG: `cap=0`, `umove_after=12`).
- **Cause:** JS treated `a`/`e`/`l` as unknown / eat / move. C sequence is
  `doapply` → getobj lock pick (`e`) → `pick_lock` direction (`l`) →
  "You see no door there." → `PICKLOCK_LEARNED_SOMETHING` → `ECMD_TIME` →
  following `movemon`. Without that turn, JS deferred the post-`l` monster
  slice until later `s` keys, then stopped one search-turn short of C.
- **C locus:** `apply.c:doapply` (`LOCK_PICK` case); `lock.c:pick_lock`
  non-door branch; `cmd.c:get_adjacent_loc` / `getdir`.
- **Change:** `js/apply.js` + `js/lock.js`; wire `a` in `cmd.js`.
- **Verification:** `rng-diff` seed1500 **RNG OK (2768)**; runner
  2768/2768 RNG, screens 1/40; seed0060 still 2489/3626; green PASS +
  strict; full suite 2/44, RNG **26980**/792838, screens 109/11405.
  seed1800 also RNG OK (2458) in this measure (display still 0/26).
- **Lesson:** free-looking keys can be getobj/getdir replies; attribute
  menus and apply prompts own nhgetch keys. Do not diagnose post-EOT
  `umovement` until key ownership matches C.
- **Named omission:** `feel_location` / `update_mapseen_for` glyph gating
  (no-door always LEARNED/TIME); container-at-feet pick; real door
  lock occupation; non-pick apply tools (sack, etc.).

## D-0022 — `newsym` omitted floor objects; SDOOR drew as `?`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **1/40** with RNG complete. First fail at
  welcome `--More--` (screen idx 1): C showed `%`/`$` on the starting room
  floor and a continuous bottom wall; JS showed floor dots and `└?─…`.
- **Cause:** JS `newsym` painted hero/monster/terrain only — never
  `vobj_at` / `map_object`. Separately, `terrain_glyph` lacked `SDOOR`/
  `SCORR`, so secret doors fell through to default `?`. CORPSE map color
  must use `mon_color(corpsenm)` (orc → CLR_RED), not
  `objects[CORPSE].oc_color` (brown).
- **C locus:** `display.c:newsym` / `_map_location` / `map_object` /
  `back_to_glyph` (SDOOR→wall); `display.h:vobj_at`/`covers_objects`;
  glyph color `mon_color` for `GLYPH_BODY_*`.
- **Change:** `js/display.js` object layer + SDOOR/SCORR; extractor
  `mcolors` + `js/monsters.js` export for corpse colors.
- **Verification:** seed1500 **34/40** screens (RNG 2768); seed1800
  screens **0→10**/26; green PASS + strict; full suite 2/44, RNG
  26980/792838, screens **156**/11405.
- **Lesson:** screen coords use `setCell(x-1, y+1)`; diagnose map glyph
  misses before UI. Object creation RNG matching does not imply objects
  are drawn.
- **Named omission:** trap glyphs in `newsym`; full `wall_angle` for
  SDOOR junctions; pile-top glyph flags; hallucination/`newsym_rn2`.

## D-0023 — tutorial menu was title-centered, not C NHW_MENU offx

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **34/40** after D-0022. First fails at
  idx 2–3: C title at col 21 with full y/n/OPTIONS/(end) menu and cursor
  `[27,6]`; JS centered only the title (`pad=(80-23)/2` → col 28) and left
  leftover text after `n`.
- **Cause:** `ask_do_tutorial` never built a real corner `NHW_MENU`. C
  `tty_end_menu` sets `maxcol = max(strlen+2)` (OPTIONS footer → 59) and
  `offx = max(10, 80-maxcol-1)` → 20; `process_menu_window` paints a
  leading space at offx then text (title via `menu_headings` /
  `ATR_INVERSE` after `adjust_menu_promptstyle(WIN_INVEN)`).
- **C locus:** `options.c:ask_do_tutorial`; `wintty.c:tty_end_menu` /
  `tty_display_nhwindow(NHW_MENU)` / `process_menu_window`;
  `allmain.c`/`options.c` `menu_headings` default inverse.
- **Change:** `js/invent.js` `nhw_menu_geometry` + `paint_corner_nhw_menu`;
  `js/allmain.js:ask_do_tutorial` builds C line order and uses corner paint
  + `docrt` on dismiss.
- **Verification:** seed1500 Scr **36/40** (RNG 2768); seed1800 Scr
  **12/26**; green PASS + strict; full suite 2/44, RNG 26980/792838,
  screens **160**/11405.
- **Lesson:** menu geometry is driven by longest padded line, not title
  centering. Corner menus must not `clearScreen` the map.
- **Named omission:** invent `display_inventory` still fullscreen-clears /
  approximate `xprname`; discoveries class list; enlightenment plname /
  wielded-weapon body; fullscreen `NHW_MENU` path in the new helper.

## D-0024 — invent/doname/discoveries incomplete for Rogue screens

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **36/40** after D-0023. Fails at invent `i`
  (idx 28), discoveries `\` (32), enlightenment `^X` (34–35).
- **Cause:** (1) `display_inventory` used `paint_overlay` `clearScreen` with
  approximate startCol instead of corner `NHW_MENU`; (2) `doname` missed
  empty-container prefix, wield/swapwep suffixes, `potion of X`, and
  implicit-uncursed skip for known charged weapons; (3) `dodiscovered`
  only walked scroll/potion/wand and always used `  ` prefix; missing
  `oc_encountered` and `interesting_to_discover` OBJ_DESCR gate;
  (4) enlightenment lacked plname capitalize and `weapon_insight` lines.
- **C locus:** `invent.c:display_inventory` / `wintty.c` corner menu;
  `objnam.c:doname`; `u_init.c:ini_inv_adjust_obj` cknown;
  `o_init.c:discover_object`/`dodiscovered`/`interesting_to_discover`;
  `insight.c:weapon_insight`.
- **Change:** corner invent via `paint_corner_nhw_menu`; doname prefixes /
  wield strings; container `cknown`; `discover_object(..., encountered)`;
  disco walks `DEF_INV_ORDER` with `*`/`  `; ^X capitalize + wield body.
- **Verification:** seed1500 **PASS** RNG 2768/2768 Scr **40/40** + strict;
  green PASS + strict; seed1800 Scr still **12/26** (RNG 2458); full suite
  **3/44**, RNG 26980/792838, screens **165**/11405.
- **Lesson:** corner invent must keep the map; disco `*` vs spaces is
  `oc_encountered`, and only OBJ_DESCR types are interesting.
- **Named omission:** fullscreen invent path; full `oc_charged`/`oc_skill`
  in objects extractor; full `weapon_descr`/skill table; disco Japanese /
  unique/artifact classes; many enlightenment sections.

## D-0025 — getobj throw/apply: gold suggest + missing-letter loop

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1800 RNG 2458/2458 but screens **12/26**. Diffs: throw
  prompt `[a or ?*]` vs C `[$a or ?*]`; post-throw stale `In what direction?`;
  apply bad letter returned immediately so later keys (`i`/`+`/`\`/`^X`) ran
  as top-level commands while C stayed in getobj/`--More--`.
- **Cause:** (1) `throw_ok` omitted `COIN_CLASS` (C `GETOBJ_SUGGEST`);
  (2) getobj helpers `return null` on missing invlet instead of C `continue`;
  (3) re-prompt never called `flush_topl_more`, so no `--More--`;
  (4) `getdir` left `_pending_message` for the next command-loop capture.
- **C locus:** `dothrow.c:throw_ok` / `dothrow`; `invent.c:getobj` missing
  letter → `You("don't have that object.")` + `continue`; `cmd.c:getdir`.
- **Change:** invent-order `$`+weapons in throw suggest; getobj_throw /
  getobj_apply loop + `flush_topl_more`; clear direction prompt after answer;
  same clear in `lock.js` getdir. `throw_gold` body still deferred.
- **Verification:** seed1800 Scr **24/26** (RNG 2458); green + seed1500 PASS
  + strict lengths; full suite **3/44**, RNG **27161**/792838, screens
  **177**/11405.
- **Lesson:** getobj must loop on missing letters; screen matches are not a
  contiguous prefix (legacy map can fail idx 0 while later frames match).
- **Named omission:** `throw_gold` body; getobj `?`/`*` menus; eat getobj
  still single-shot. (look `:` / legacy map cleared by D-0026.)

## D-0026 — legacy corner map + look staircase feature

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1800 RNG 2458/2458, screens **24/26**. Idx 0: Book text
  matched but room rows blank (no DEC map under menu). Idx 25: `:` gave
  `You see no objects here.` vs C `There is a staircase up out of the
  dungeon here.--More--`.
- **Cause:** (1) `com_pager_legacy` always `clearScreen()`, wiping the map
  that `docrt` had painted; C corner NHW_MENU (`offx>10`) uses
  `process_text_window` which only `cl_end`s from `offx` and leaves lower
  map rows. (2) `dolook` stubbed; C `look_here` → `dfeature_at` →
  `stairs_description` for known Dlvl1 branch stairs with `u_traversed`
  (set in `mklev` after `place_branch`).
- **C locus:** `wintty.c:process_text_window` / `tty_display_nhwindow`
  NHW_MENU; `questpgr.c:deliver_by_window`; `invent.c:dfeature_at` /
  `look_here` / `dolook`; `stairs.c:stairs_description` /
  `known_branch_stairs`; `mklev.c` Dlvl1 `u_traversed`.
- **Change:** corner legacy paints from `offx` without clearing the map;
  `stairway_at` + `stairs_description` + Dlvl1 `u_traversed`; `dfeature_at`
  + `look_here` feature pline (no “no objects” when dfeature present);
  export `an`/`vtense`.
- **Verification:** seed1800 **PASS** 2458/2458 Scr **26/26** + strict;
  green + seed1500 PASS + strict; full suite **4/44**, RNG **27161**/792838,
  screens **179**/11405.
- **Lesson:** corner menus must not fullscreen-clear; look messages come
  from dungeon features before the no-objects fallback.
- **Named omission:** Blind feel path; engraving; multi-object look menu;
  `doname_with_price`; full altar/lava/ice/pool dfeature; Elemental Planes
  amulet destination strings beyond no-amulet Dlvl1 case.

## D-0027 — orc `u_init_race` Xtra_food + `inv_subs`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2341**: C `rn2(1)` @
  `trquan(u_init.c)` after Rogue `!rn2(5)` blindfold check; JS
  `rn2(100)` from `init_attr` (skipped race kit).
- **Cause:** `u_init_race` was human-only no-op. Orc non-wizard path must
  `ini_inv(Xtra_food)` (2× `FOOD_CLASS` `UNDEF_TYP`) before attrs. Race
  substitutions (`inv_subs`) were also absent — `ini_inv_obj_substitution`
  after `mksobj` (Rogue short sword/dagger → orcish; food CRAM/LEMBAS →
  tripe). Weapon `mksobj_init` RNG matched without subs because substitution
  is post-`mksobj` in C.
- **C locus:** `u_init.c:u_init_race` (`PM_ORC`); `Xtra_food[]`;
  `inv_subs[]`; `ini_inv_obj_substitution`; `ini_inv`.
- **Change:** port orc/elf/dwarf/gnome `u_init_race` switch (elf instrument
  `ROLL_FROM`); `Xtra_food`; full `inv_subs` + call from `ini_inv`.
- **Verification:** rng-diff first mismatch **2341 → 2476**; seed0060 runner
  **2489 → 2584**/3626; green + seed1500 + seed1800 PASS + strict; full
  suite **4/44**, RNG **27256**/792838, screens **179**/11405.
- **Lesson:** race kits run after role `ini_inv`; missing `trquan` before
  attrs is the fingerprint. Post-`mksobj` otyp swap does not change creation
  RNG.
- **Named omission:** `ini_inv_mkobj_filter` full reject list (incl. orc
  `RIN_POISON_RESISTANCE`); other roles still throw. (splitobj → D-0028)

## D-0028 — `dog_invent` partial-stack `splitobj` / `next_ident`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2476**: C `rnd(2)` @
  `next_ident(mkobj.c)` after `dog_invent` APPORT rolls; JS `rn2(4)` (took
  whole stack, skipped split).
- **Cause:** nohands pets `can_carry` returns `1` when `quan > 1`. C then
  `splitobj(obj, carryamt)` → `nextoid` → `next_ident` (`rnd(2)`). JS
  stubbed the partial split and picked up the entire floor stack.
- **C locus:** `dogmove.c:dog_invent`; `mkobj.c:splitobj` / `nextoid` /
  `next_ident`.
- **Change:** export real `splitobj` from `js/mkobj.js` (quan/owt, floor
  `nobj`/`nexthere` insert, `next_ident` for child oid); wire
  `dog_invent`; reuse from `dothrow.js` (remove local copy).
- **Verification:** rng-diff first mismatch **2476 → 2643**; seed0060
  runner **2584 → 2761**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27433**/792838, screens **179**/11405.
- **Lesson:** partial-stack pickup is an object-identity/RNG event, not
  just inventory bookkeeping.
- **Named omission:** `nextoid` shop-price oid search; unpaid/`splitbill`;
  timers/light/`copy_oextra`; `relobj` body (→ D-0029).

## D-0029 — `dog_invent` pet `relobj` / `mdrop_obj`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2643**: C `rn2(8)` @
  `dog_goal` APPORT vs JS `rn2(100)` `obj_resists`. Drop RNG at 2640–2641
  matched, but JS never emptied minvent.
- **Cause:** `dog_invent` updated apport/droptime without calling `relobj`.
  `dog_has_minvent` stayed true → APPORT branch skipped. Also
  `add_to_minv` used string `'MINVENT'` and `obj_extract_self` only unlinked
  floor piles.
- **C locus:** `steal.c:relobj` / `mdrop_obj`; `mkobj.c:obj_extract_self`
  (`OBJ_MINVENT`); `dogmove.c:dog_invent`.
- **Change:** `obj_extract_self` minvent unlink + `OBJ_MINVENT` in
  `add_to_minv`; pet-path `mdrop_obj`/`relobj` in `js/dogmove.js` (place on
  floor, optional verbose drop pline); wire from `dog_invent`.
- **Verification:** rng-diff first mismatch **2643 → 2663**; seed0060
  runner **2761 → 2771**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27445**/792838, screens **179**/11405.
- **Lesson:** drop tracking without releasing minvent falsifies every later
  `!dog_has_minvent` gate.
- **Named omission:** `flooreffects` / `stackobj` merge; vault-guard gold;
  worn/saddle/shop/`update_mon_extrinsics` in `mdrop_obj`; `couldsee` for
  `in_masters_sight` → D-0030.

## D-0030 — `dog_goal` `in_masters_sight` via real `couldsee`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2663**: C `rn2(100)`
  `obj_resists` (continued floor scan) vs JS `rn2(8)` APPORT. DIAG at pet
  `(12,12)` / hero `(15,13)`: `couldsee(pet)=false`, lit gate OK, no
  minvent, `m_cansee` OK — stub `in_masters_sight=true` forced the roll.
- **Cause:** `dog_goal` hardcoded `in_masters_sight = true` instead of C
  `couldsee(omx, omy)` (`viz_array & COULD_SEE`). When false, C skips the
  APPORT branch before `rn2(8)` and keeps scanning `fobj`.
- **C locus:** `dogmove.c:dog_goal`; `vision.h:couldsee`.
- **Change:** `js/dogmove.js` imports `couldsee` and sets
  `in_masters_sight = couldsee(omx, omy)`.
- **Verification:** rng-diff first mismatch **2663 → 2979**; seed0060
  runner **2771 → 3039**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27859**/792838, screens **179**/11405.
- **Lesson:** vision stubs that always-true gate RNG-consuming APPORT
  short-circuits; real `couldsee` already existed in `vision.js`.
- **Named omission:** `dog_goal` gettrack/FARAWAY when goal is hero and
  `!in_masters_sight`; next peel @ 2979 is C `exercise` `-rn2(2)` vs JS
  `distfleeck`.

## D-0031 — dokick empty-space `kick_dumb` / `exercise`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2979**: C `rn2(2)`
  `exercise(attrib.c:509)` vs JS `rn2(5)` `distfleeck`. Keys: Ctrl-D
  then `j`; C screen "You kick at empty space." Prefix matched through
  `gethungry` / wipe-engr `rn2(94)`.
- **Cause:** JS had no `#kick` (`dokick`); Ctrl-D was "Unknown command"
  and `j` was ordinary movement, so the turn never called
  `exercise(A_DEX, FALSE)` from `kick_dumb`. Not `exerper` (that runs
  before wipe-engr in the prior EOT block).
- **C locus:** `dokick.c:dokick` / `kick_dumb`; `cmd.c` bind `C('d')`.
- **Change:** `js/dokick.js` — `dokick` + `kick_dumb` (DEX≥16 empty-space
  and low-DEX strain envelope) + open-door→dumb / wall→ouch routing;
  wire Ctrl-D in `js/cmd.js`; export `getdir` from `js/lock.js`.
- **Verification:** rng-diff first mismatch **2979 → 2997**; seed0060
  runner **3039 → 3064**/3626, cursors **18 → 41**/41; green + seed1500
  + seed1800 PASS + strict; full suite **4/44**, RNG **27765**/792838,
  screens **179**/11405.
- **Lesson:** attribute `exercise` after matching EOT often comes from
  the *next* command (kick/search/combat), not `exerper`; use the key
  map and topline before blaming `moves%10`.
- **Named omission:** `kick_monster`/`kick_object`/closed-door Whammm/
  SDOOR-SCORR open rolls/furniture; `martial()`; `wake_nearby`/
  `u_wipe_engr` effects; `losehp`/`set_wounded_legs` bodies; next peel
  @ 2997 diagnosed as missing kick-avoid (D-0032), not missing `distfleeck`.

## D-0032 — seed0060 dog_move cnt 4 vs 3 (missing kick-avoid)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2997**: C `rn2(5)`
  `distfleeck` vs JS `rn2(4)`. Matched through kick `exercise` and
  dog_move `rn2(1/2/3)`.
- **Rejected:** post-kick fleeck/ALLOW_*/missing `distfleeck` body;
  mklev “extra CORR west of pet” / reading C `#` as wall — NetHack `#` is
  corridor; JS and C both have `CORR` at `(22,12)` (screen `#######f@`).
  Diagonal `bad_rock` squeeze does not drop any of the four open
  candidates for a kitten.
- **Cause/evidence:** C `dokick` sets `gk.kickedloc` to the kicked cell
  before resolution; `dog_move` / `m_move` call `m_avoid_kicked_loc` so
  peaceful/tame monsters skip that adjacent cell. Hero kicked south →
  `(24,13)`. JS never set or consulted `kickedloc`, so `mfndpos` kept
  four `appr=0` slots → extra `rn2(4)` before `distfleeck`.
- **C locus:** `dokick.c` (`kickedloc =`); `monmove.c:m_avoid_kicked_loc`;
  `dogmove.c` candidate loop; clear on `hack.c:domove` /
  `cmd.c` non-`dokick` timed commands.
- **Change:** `game.kickedloc` in `dokick`; `m_avoid_kicked_loc` (+ Sokoban
  stub) in `mon.js`; wire into `dog_move`; clear on successful `domove` and
  other timed non-kick commands in `cmd.js`.
- **Verification:** rng-diff first mismatch **2997 → 3016**; seed0060
  runner **3064 → 3086**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27787**/792838, screens **179**/11405.
- **Lesson:** after a kick, compare pet candidate skips to `kickedloc`
  before blaming terrain glyphs; `#` in tty is corridor, not wall.
- **Next:** peel @ **3105** (`maybe_generate_rnd_mon` → `makemon(NULL,0,0)`
  body; C `makemon_rnd_goodpos` vs JS stub falling through to `dosounds`).

## D-0033 — seed0060 missing donull (`.` wait)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3016**: C `rn2(5)`
  `distfleeck` vs JS `rn2(2)`. Matched through kick-avoid turn end
  (3015 = moveloop `rn2(94)`).
- **Rejected:** post-kick pet cell west-vs-south / `mtrack` candidate-skip /
  fleeck arity as the 3016 cause — kick-turn dog_move RNG already matched
  C through 3015; JS’s next call was `exercise` arity 2 (second kick), not
  a wrong `distfleeck` arity.
- **Cause/evidence:** moves include `\u0004j..`; JS `rhack` had no `.`
  branch so wait was “Unknown command” with `context.move=0`. C `donull`
  returns `ECMD_TIME` → monster turns start with `distfleeck` `rn2(5)`.
  Skipping both `.` waits made the next kick’s `exercise` `rn2(2)` land at
  3016. Timed non-kick commands also clear `gk.kickedloc` (`cmd.c`).
- **C locus:** `do.c:donull`; `cmd.c` (`.` → wait; clear `kickedloc` when
  `ECMD_TIME && func != dokick`).
- **Change:** `js/do.js` `donull`; `js/cmd.js` `.` → timed wait + clear
  `kickedloc`. Omit `cmd_safety_prevention` (named in C-JS-MAP).
- **Verification:** rng-diff first mismatch **3016 → 3105**; seed0060
  runner **3086 → 3151**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27922**/792838, screens **179**/11405.
- **Lesson:** when C’s next call is `distfleeck` and JS shows a *different
  function’s* arity (here `exercise`/`rn2(2)`), check whether an intervening
  timed command key (`.` wait) was dropped as unknown.
- **Next:** peel @ **3105** — port `maybe_generate_rnd_mon`’s
  `makemon(NULL,0,0)` path (`makemon_rnd_goodpos` / `rndmonst`).

## D-0034 — seed0060 makemon(NULL,0,0) / makemon_rnd_goodpos

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3105**: C `rn2(77)`
  `makemon_rnd_goodpos` vs JS `rn2(300)` `dosounds`. Matched through
  `maybe_generate_rnd_mon` gate (3104 = `rn2(70)=0`).
- **Cause/evidence:** JS consumed the gate roll then stubbed the body.
  C calls `makemon(NULL,0,0)` → `makemon_rnd_goodpos` (`rn1(COLNO-3,2)` /
  `rn2(ROWNO)`, reject `cansee` when `!in_mklev`) → `rndmonst` → create →
  `G_SGROUP`/`m_initgrp` → invent. Also fixed wrong `MM_NOGRP=2` in
  `monsters.js` (C/`const.js` is `0x2000`) so group suppression matches.
- **C locus:** `allmain.c:maybe_generate_rnd_mon`; `makemon.c:makemon`,
  `makemon_rnd_goodpos`, `m_initgrp`; `teleport.c:enexto_gpflags`.
- **Change:** `js/makemon.js` placement-before-`rndmonst`,
  `makemon_rnd_goodpos`, `m_initgrp`/`G_SGROUP`/`G_LGROUP`, early `fmon`
  link; `js/teleport.js` `enexto_gpflags`; `js/allmain.js` real
  `makemon(null,0,0)`; `js/monsters.js` `G_SGROUP`/`G_LGROUP`, drop fake
  `MM_NOGRP`.
- **Verification:** rng-diff first mismatch **3105 → 3536**; seed0060
  runner **3151 → 3562**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **28497**/792838, screens **179**/11405.
- **Lesson:** for `makemon(NULL,0,0)`, C picks coordinates *before*
  `rndmonst`; stubbing after the spawn gate is not RNG-equivalent.
- **Next:** peel @ **3536** — port `regen_hp` in the once-per-turn block
  before `dosounds`.

## D-0035 — seed0060 losehp + regen_hp (wall kick turn)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3536**: C `rn2(100)`
  `regen_hp` vs JS `rn2(300)` `dosounds`. Step 28 is wall kick
  ("Ouch!  That hurts!") after empty-space kicks; RNG OK through 3535
  (`maybe_generate_rnd_mon` miss).
- **Cause/evidence:** Two coupled gaps. (1) JS `kick_ouch` burned
  `rnd(CON?3:5)` but never applied `losehp`, so `uhp` stayed at max and
  C's `regen_hp` gate never opened. (2) JS once-per-turn block skipped
  `regen_hp` entirely before `dosounds`. Post-ouch session screens can
  still show `HP:11(11)` when same-turn heal equals damage — not proof
  that `losehp` was absent in C.
- **C locus:** `dokick.c:kick_ouch` → `losehp(Maybe_Half_Phys(dmg),…)`;
  `hack.c:losehp`; `allmain.c:regen_hp` / once-per-turn call before
  `dosounds`.
- **Change:** new `js/hack.js` `losehp`/`maybe_half_phys`; `dokick.js`
  applies damage; `allmain.js` `regen_hp` + `interrupt_multi` + call
  site when `uhp < uhpmax` (or mh when Upolyd).
- **Verification:** rng-diff **RNG OK 3626**; seed0060 runner
  **3626**/3626 RNG, Scr **0**/41, cursors **41**/41; green + seed1500
  + seed1800 PASS + strict; full suite **4/44**, RNG **28511**/792838,
  screens **179**/11405.
- **Lesson:** a missing HP mutation can look like a missing EOT RNG call;
  check whether the regen *gate* (`uhp < uhpmax`) can ever be true.
- **Next:** seed0060 screen idx 0 cells (legacy/botl); cursors already match.

## D-0036 — seed0060 orc hpadv + mon_glyph mcolor (screens 0–4)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 RNG **3626**/3626, screens **0**/41 (cursors
  41/41). Idx 0 had three cell diffs: botl `HP:12(12)` vs C `HP:11(11)`,
  and newt `:` color green vs yellow.
- **Cause/evidence:** (1) `roles.js` orc (and elf/dwarf/gnome) lacked
  `hpadv`/`enadv`, so `setup_role_race_from_rc` fell back to human
  `{infix:2}` → Rogue+orc HP **12**; C `role.c` orc is `{1,0,0,1,0,0}` →
  HP **11**. (2) `mon_glyph` used mlet-only `S_LIZARD→CLR_GREEN`; C
  `mons[PM_NEWT].mcolor` is `CLR_YELLOW` (11).
- **C locus:** `role.c` `races[]` orc/elf/dwarf/gnome `hpadv`/`enadv`;
  `attrib.c:newhp`; `display.c` / `mon_color(monsndx)`.
- **Change:** ported race `hpadv`/`enadv` (+ attrmin/attrmax) in
  `js/roles.js`; `mon_glyph` uses `mcolors[mnum]` (pets `CLR_WHITE`).
- **Verification:** seed0060 Scr **5**/41 (idx 0–4 match), RNG still
  **3626**/3626; green + seed1500/1800 PASS + strict; full **4/44**,
  screens **184**/11405 (+5), RNG **28511**/792838.
- **Lesson:** race table stubs that silently inherit human `hpadv` corrupt
  botl on every frame; mlet-only monster colors fail as soon as two
  species share a letter.
- **Next:** seed0060 idx 5+ (invent letter / map wall / downstairs color).

## D-0037 — seed0060 gold doname + mondied newsym (screen 5)

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **5**/41. Idx 5 had
  two cell diffs: topline `"1 gold piece"` vs `"a gold piece"`, and map
  newt cell still `:` (yellow) while C showed floor `·`.
- **Cause/evidence:** (1) `doname` short-circuited `COIN_CLASS` to
  `` `${quan} gold piece` ``; C `doname_base` uses quan==1 article `"a "`
  + xname `"gold piece"`. (2) `mondied` removed the monster from `fmon`
  and zeroed `mx`/`my` without `newsym`, leaving a stale live glyph; C
  `mondead`→`mon_leaving_level` refreshes the cell (newt
  `corpse_chance` was false → floor, not `%`).
- **C locus:** `objnam.c:doname_base`; `mon.c:mondied`/`mondead`/
  `mon_leaving_level`.
- **Change:** `js/objnam.js` coin path uses the shared quan/article
  prefix; `js/mhitm.js` `mondead` keeps coords and calls `newsym`.
  Incomplete `make_corpse` via `mkcorpstat` was tried and **reverted** —
  it cut aggregate RNG by ~900 without a faithful special-case body.
- **Verification:** seed0060 Scr **6**/41 (idx 0–5), RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **4/44**, screens
  **185**/11405 (+1), RNG **28511**/792838.
- **Lesson:** idx-5 `"1"` vs `"a"` was gold English, not invent letters;
  death without `newsym` looks like a lingering live monster. Do not ship
  a partial `make_corpse` that invents `mksobj` RNG.
- **Next:** seed0060 idx 6+ (drop then re-pickup pline / premature wall).

## D-0038 — seed0060 cansee invent pline + wall_angle + downstairs color

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **6**/41. Idx 6 had
  (1) topline extra "The kitten picks up a gold piece." after a drop,
  (2) premature wall `┌` at map (17,14) / screen (16,15), and later
  (3) downstairs `>` yellow vs C NO_COLOR.
- **Cause/evidence:** (1) C `mdrop_obj`/`dog_invent` gate drop/pickup
  plines on `cansee`; a second invent after an extra pet move picks up
  at (13,13) with `cansee=false` — C silent, JS always printed.
  (2) `set_wall_state` was a no-op and `terrain_glyph` mapped wall
  `typ` straight to DEC corners; C `back_to_glyph` uses
  `wall_angle(seenv)` — TLCORNER with `WM_C_OUTER` and seenv=SV0 alone
  yields `S_stone` (blank) until more octants are seen.
  (3) Public recordings paint upstairs `<` CLR_YELLOW and downstairs
  `>` NO_COLOR (not defsym gray for either).
- **C locus:** `steal.c:mdrop_obj`; `dogmove.c:dog_invent`;
  `display.c:set_wall_state`/`xy_set_wall_state`/`wall_angle`/
  `back_to_glyph`.
- **Change:** gate pet drop/pickup plines on `cansee`; port
  `set_wall_state` cluster in `mklev.js`; port `wall_angle` into
  `display.js` terrain glyphs; downstairs `>` uses `NO_COLOR`.
- **Verification:** seed0060 Scr **37**/41 (idx 22/33/35/36 remain),
  RNG **3626**/3626; green + seed1500/1800 PASS + strict; full
  **4/44**, screens **216**/11405 (+31), RNG **28511**/792838.
- **Lesson:** silent out-of-sight invent still mutates state; unfinished
  exterior corners must stay stone until seenv warrants a glyph; do not
  force downstairs to match upstairs yellow.
- **Next:** seed0060 idx 22 (pet `f` vs corridor `#`).

## D-0039 — seed0060 idx 22 pet via orc infravision

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **37**/41. Sole map
  miss at idx 22: C white pet `f` at map (22,12) / term (21,13); JS
  corridor `#`. Pet position and RNG matched; glyph missing.
- **Cause/evidence:** hero at (24,12) in a dark corridor — `cansee(22,12)`
  false (only adjacent night-vision IN_SIGHT), but `couldsee` true.
  Orc race has `M3_INFRAVISION`; kitten has `M3_INFRAVISIBLE`. C
  `newsym` still `display_monster` when `!cansee` via
  `see_with_infrared && mon_visible`. JS `newsym` only drew monsters
  under `cansee`. Also `postmov` omitted C's final
  `newsym(mtmp->mx, mtmp->my)` after `mintrap`.
- **C locus:** `display.h:_see_with_infrared` / `_mon_visible`;
  `display.c:newsym` (!cansee branch); `monmove.c:postmov`;
  `monflag.h` M3_INFRA*; `polyself.c` race Infravision via
  `mons[urace.mnum]`.
- **Change:** extract `mflags3` (`scripts/extract-monsters.py`);
  `infravision`/`infravisible` in `monsters.js`; `newsym` infrared
  path + race Infravision in `display.js`; `postmov` newsym of new
  cell in `monmove.js`.
- **Verification:** seed0060 Scr **38**/41 (idx 22 cleared; 33/35/36
  disco/^X remain), RNG **3626**/3626; green + seed1500/1800 PASS +
  strict; full **4/44**, screens **217**/11405 (+1), RNG
  **28511**/792838.
- **Lesson:** dark-corridor pet glyphs for orcs are infrared, not FOV;
  do not treat `!cansee` as “draw terrain only” when sensing macros
  exist. Extract full M3 flags before inventing race hardcodes.
- **Next:** seed0060 idx 33 disco class layout (then ^X idx 35–36).

## D-0040 — seed0060 idx 33 disco OBJ_DESCR / obj_typename

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **38**/41. idx 33
  disco menu showed only elven/orcish dagger + potion + sack; C listed
  full orc racial knowledge (short sword, arrow, bow, spear, armor).
- **Cause/evidence:** `knows_object` already registered the orcish
  types. `interesting_to_discover` requires `OBJ_DESCR != NULL`; JS
  only knew a tiny FIXED_DESCRS / scroll-potion-wand map, so most
  orcish weapons/armor were filtered out. After extracting descrs,
  naming still mismatched (`uruk hai` / bare `sickness`) until
  `obj_typename` used `OBJ_NAME` + class prefixes.
- **C locus:** `objclass.h:OBJ_DESCR`/`OBJ_NAME`; `objects.c`
  `OBJECTS_DESCR_INIT`; `o_init.c:interesting_to_discover` /
  `dodiscovered`; `objnam.c:obj_typename`.
- **Change:** `scripts/extract-objects.py` emits `objectDescrs` +
  `objectNameStrs`; `invent.js` disco uses real descr gate +
  `obj_typename`; `u_init.js:has_descr` uses `objectDescrs`.
- **Verification:** seed0060 Scr **39**/41 (idx 33 cleared; 35–36
  ^X remain), RNG **3626**/3626; green + seed1500/1800 PASS +
  strict; full **4/44**, screens **218**/11405 (+1), RNG
  **28511**/792838.
- **Lesson:** discovery UI needs the full `obj_descr[]` table, not
  seed-shaped appearance maps. Prefer extractor fields over FIXED_*
  hand lists.
- **Next:** seed0060 idx 35–36 enlightenment (autopickup, attr
  limits, weapon_descr skill naming).

## D-0041 — seed0060 idx 35–36 ^X enlightenment

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **39**/41. idx 35–
  36 (^X) mismatched Autopickup (`off` vs `on for '$' plus thrown`),
  race attr limits (`(current; limit:18/50)` etc.), and weapon lines
  (`orcish short sword` vs skill `short sword`).
- **Cause/evidence:** `doattributes` hard-coded Autopickup off and
  plain attr numbers; `weapon_descr` used otyp display name instead of
  C `P_NAME(weapon_type(uwep))`. Session rc has
  `autopickup,pickup_types:$`; orc `ATTRMAX` differs from human 18 /
  `STR18(100)`.
- **C locus:** `insight.c` `basics_enlightenment` autopickup /
  `one_characteristic` / `weapon_insight`; `weapon.c` `weapon_descr` /
  `weapon_type` / `skill_name`; `attrib.h` `ATTRMAX`.
- **Change:** extract `oc_skill` in objects table; invent.js
  autopickup from flags, attr limit paren, `weapon_type`/`skill_name`
  /`weapon_descr` via skill category.
- **Verification:** seed0060 Scr **41**/41 PASS, RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **5/44**, screens
  **220**/11405 (+2), RNG **28511**/792838.
- **Lesson:** enlightenment text is option/race/skill semantics, not
  invent layout. Prefer `oc_skill` + `P_NAME` over otyp strings for
  wield descriptions.
- **Next:** next unported role `u_init_role`, or seed0013 Lua/`sp_lev`.

## D-0042 — Wizard `u_init_role` + `ini_inv_mkobj_filter` + Dark One gender

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  seed2200 still diverges later in mklev.
- **Observed:** **29/44** sessions threw `u_init_role: role not ported
  (Wizard)` (≈10 Wizard sessions). After port, **20/44** role throws
  remain (no Wizard). seed2200 rng-diff first mismatch moved from throw
  → idx **199** (missing Dark One `rn2(100)`) → idx **1283**
  (`choose_trapnote` vs `rnd(4)`).
- **Cause/evidence:** Wizard kit was absent; scaffold lacked pantheon/
  attrs/`hpadv`/`enadv`/`neminum`. Random UNDEF wand/ring/potion/scroll/
  book needed C `ini_inv_mkobj_filter` (reject list + `oc_level` +
  `Skill_W` discipline). Dark One has no fixed gender →
  `role_init` `rn2(100)<50`. Cloak wear/`a_ac` needed for AC:9.
- **C locus:** `u_init.c` `Wizard[]` / `u_init_role` / `ini_inv` /
  `ini_inv_mkobj_filter` / `Skill_W` / `restricted_spell_discipline`;
  `role.c` Wizard entry + `role_init` nemesis gender; `objclass.h`
  `oc_level`/`a_ac`.
- **Change:** extract `a_ac`/`oc_level`; Wizard roles + inventory +
  filter + `Skill_W`; cloak wear + `find_ac` via `a_ac`;
  `role_init_nemesis_gender` for random-gender nemeses.
- **Verification:** green + seed1500/1800/0060 PASS + strict; seed2200
  RNG **2756**/3018 Scr **1**/230 (prefix **1283**); full **5/44**,
  screens **239**/11405 (+19), RNG **44848**/792838; role throws
  **20**/44.
- **Omissions named:** `initialspell`; full `role_init` beyond nemesis
  gender; other role kits; seed2200 `choose_trapnote` (next peel).
- **Lesson:** unlocking a role is identity + inventory filter + any
  role_init RNG the nemesis gender path consumes — not kit tables alone.
- **Next:** peel seed2200 idx 1283 `choose_trapnote`, or next unported
  role (Priest/Knight clear 4 throws each).

## D-0043 — Priest `u_init_role` + pantheon `randrole` + shield wear

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Priest sessions still diverge later in mklev/moveloop.
- **Observed:** **20/44** role throws after D-0042; 4 Priest sessions
  threw. After port, **17/44** remain (no Priest). seed0501 rng-diff
  prefix **1153** (`wipeout_text`); seed0106 **2566** (`dog_move`);
  seed0030 advances past Priest into Knight throw.
- **Cause/evidence:** Priest kit absent; Priest has no fixed deities →
  `role_init` pantheon loop `randrole` until a role with `lgod`; JS
  roles[] had Ranger before Rogue (wrong pantheon indices) and lacked
  gods on scaffold roles; random SPBOOK needed `Skill_P`; SMALL_SHIELD
  needed `is_shield`/`W_ARMS` wear for AC.
- **C locus:** `u_init.c` `Priest[]` / `Lamp[]` / `Skill_P` /
  `u_init_role` / `ini_inv_use_obj` shield; `role.c` Priest entry +
  pantheon selection + `SPE_LIGHT`→`P_CLERIC_SPELL`; roles[] order.
- **Change:** C-ordered roles[] + pantheon gods on all roles; Priest
  attrs/`hpadv`/`enadv`/`neminum`; `role_init_pantheon` + SPE_LIGHT
  override; Priest inventory + Magicmarker/Lamp + `knows_object(POT_WATER)`;
  `Skill_P` in filter; shield wear + `uarms`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; seed2200
  prefix still **1283**; full **5/44**, screens **240**/11405 (+1),
  RNG **50470**/792838; role throws **17**/44.
- **Omissions named:** `initialspell`; helm/gloves/boots wear paths;
  other role kits; seed0501 `wipeout_text`; seed0106 dog_move.
- **Lesson:** Priest unlock is pantheon RNG + correct roles[] indices/
  gods, not inventory alone — missing gods on other roles would
  over-consume `randrole`.
- **Next:** Knight `u_init_role` (5 throws), or seed2200
  `choose_trapnote`, or seed0501 makeniche engraving.

## D-0044 — Knight `u_init_role` + knows_class + helm/gloves wear

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Knight sessions still diverge later in mklev (`mkclass_aligned`).
- **Observed:** **17/44** role throws after D-0043; 5 Knight sessions
  threw (seed0103/0104/4500/5006 + seed0030 at Knight). After port,
  **13/44** remain (no Knight). seed0103 rng-diff prefix **1185**
  (`mkclass_aligned` vs `rn2(398)`); seed0030 advances past Knight into
  Samurai throw.
- **Cause/evidence:** Knight kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `knows_class(WEAPON/ARMOR)` walks
  `bases[]` (all non-magic, incl. polearms for Knight; skip
  CORNUTHAUM/DUNCE_CAP/SMALL_SHIELD). Helmet/gloves needed
  `ini_inv_use_obj` `W_ARMH`/`W_ARMG` wear (also boots path). Intrinsic
  `HJumping |= FROMOUTSIDE` for chess-like mobility.
- **C locus:** `u_init.c` `Knight[]` / `Skill_K` / `u_init_role` /
  `knows_class` / `ini_inv_use_obj` helm/gloves/boots; `role.c` Knight
  entry; `youprop.h` `HJumping`.
- **Change:** Knight roles attrs/`hpadv`/`enadv`/`initrecord`; Knight
  inventory; `Skill_K` in `skills_for_role`; bases[] `knows_class` for
  Knight; helm/gloves/boots wear + `uarmh`/`uarmg`/`uarmf` clear;
  `HJumping |= FROMOUTSIDE`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **243**/11405 (+3), RNG **58004**/792838; role
  throws **13**/44; seed0103 RNG **2126**/2640 Scr **0**/60 (prefix
  **1185**); seed0104 **2401**/3223 Scr **1**/43.
- **Omissions named:** `skill_init` still stubbed (Skill_K table only);
  `initialspell`; other role kits; seed0103 `mkclass_aligned`; seed2200
  `choose_trapnote`; seed0501 `wipeout_text`.
- **Lesson:** Knight unlock needs full-class discovery + armor-slot wear
  beyond suit/shield/cloak — helm/gloves were already a named Priest
  omission and block correct AC.
- **Next:** Samurai `u_init_role` (4 throws), or seed0103
  `mkclass_aligned`, or seed2200/seed0501 mklev peels.

## D-0045 — Samurai `u_init_role` + Japanese discovery + ammo quiver

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Samurai sessions still diverge later (mklev / moveloop).
- **Observed:** **13/44** role throws after D-0044; 4 Samurai throws
  (seed0017/0107/0700 + seed0030 at Samurai). After port, **10/44**
  remain (no Samurai). seed0700 rng-diff prefix **1718**
  (`mkclass_aligned`); seed0017 **2672** / seed0107 **2652**
  (`u_calc_moveamt`); seed0030 advances past Samurai into Healer throw.
- **Cause/evidence:** Samurai kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `knows_class` for Samurai matches Knight
  (bases[] weapons+armor, incl. polearms). Optional Blindfold `!rn2(5)`.
  Japanese-name items pre-discovered via `Japanese_item_name` loop
  (skip `oc_magic`). YA ammo needed `is_ammo` quiver path (not dart-only
  `is_missile` name list).
- **C locus:** `u_init.c` `Samurai[]` / `Skill_S` / `u_init_role` /
  `knows_class` / `ini_inv_use_obj` ammo; `objnam.c` `Japanese_items` /
  `Japanese_item_name`; `role.c` Samurai entry; `obj.h` `is_ammo`.
- **Change:** Samurai roles attrs/`hpadv`/`enadv`/`initrecord`; Samurai
  inventory + Blindfold; `Skill_S` in `skills_for_role`; bases[]
  `knows_class` for Samurai; `Japanese_item_name` + discovery loop;
  `is_ammo`/`is_missile` via `oc_skill` for quiver.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **245**/11405 (+2), RNG **65208**/792838; role
  throws **10**/44; seed0700 RNG **1731**/3230 Scr **1**/51.
- **Omissions named:** `skill_init` still stubbed; display-path Japanese
  names in `obj_typename`/`doname`; other role kits; seed0700/0103
  `mkclass_aligned`; seed2200 `choose_trapnote`; seed0501 `wipeout_text`.
- **Lesson:** Samurai unlock needs Japanese pre-discovery + real ammo
  quiver semantics, not kit tables alone — YA would otherwise sit
  unwielded and skew invent/AC screens.
- **Next:** Valkyrie/Healer/Ranger (2 throws each; Healer also seed0030),
  or shared `mkclass_aligned`, or seed2200/0501 mklev peels.

## D-0046 — Healer `u_init_role` + gold `rn1` + Lamp + full-healing know

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Healer sessions still diverge later (mklev trap peels).
- **Observed:** **10/44** role throws after D-0045; 2 dedicated Healer
  throws (seed0016 + seed0030). After port, **8/44** remain (no Healer).
  seed0016 rng-diff prefix **1341** (`hole_destination`); seed0030
  **5127** (`choose_trapnote`). seed0002 already past init (prefix
  unchanged at 1652).
- **Cause/evidence:** Healer kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C sets `u.umoney0 = rn1(1000, 1001)`, optional
  Lamp `!rn2(25)`, and `knows_object(POT_FULL_HEALING)`. Kit uses typed
  spellbooks (no UNDEF SPBOOK filter path); gloves `+1` via `trspe`.
- **C locus:** `u_init.c` `Healer[]` / `Skill_H` / `u_init_role`
  `PM_HEALER`; `role.c` Healer entry.
- **Change:** Healer roles attrs/`hpadv`/`enadv`/`initrecord`; Healer
  inventory + Lamp + gold `rn1` + `POT_FULL_HEALING` know; `Skill_H` in
  `skills_for_role`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **251**/11405 (+6), RNG **67533**/792838; role
  throws **8**/44; seed0016 RNG **2258**/3656 Scr **0**/36.
- **Omissions named:** `skill_init` / `initialspell` still stubbed;
  other role kits; seed0016 `hole_destination`; seed0030/2200
  `choose_trapnote`; seed0700/0103 `mkclass_aligned`; seed0501
  `wipeout_text`.
- **Lesson:** Healer unlock is mostly kit + money RNG; do not invent
  Tourist-shaped inventory or skip `rn1(1000,1001)` gold.
- **Next:** Valkyrie/Ranger (2 throws each), or remaining 1-throw roles,
  or shared mklev peels (`mkclass_aligned` / `choose_trapnote` /
  `hole_destination` / `wipeout_text`).

## D-0047 — Valkyrie `u_init_role` + Lamp + weapon/armor `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Valkyrie sessions still diverge later (mklev peels).
- **Observed:** **8/44** role throws after D-0046; 2 dedicated Valkyrie
  throws (seed0015 + seed0105). After port, **6/44** remain (no Valkyrie).
  seed0015 rng-diff prefix **337** (`lspo_map`); seed0105 **974**
  (`wipeout_text`).
- **Cause/evidence:** Valkyrie kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `ini_inv(Valkyrie)` (spear+1, dagger,
  small shield+3, food ration), optional Lamp `!rn2(6)`, and
  `knows_class(WEAPON_CLASS)` (excludes polearms) + `knows_class(ARMOR_CLASS)`.
  JS `knows_class` bases[] walk had to admit Valkyrie (was Knight/Samurai
  only).
- **C locus:** `u_init.c` `Valkyrie[]` / `Skill_V` / `u_init_role`
  `PM_VALKYRIE` / `knows_class`; `role.c` Valkyrie entry.
- **Change:** Valkyrie roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  Valkyrie inventory + Lamp + weapon/armor `knows_class`; `Skill_V` in
  `skills_for_role`; `knows_class` gate includes `PM_VALKYRIE`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **252**/11405 (+1), RNG **68885**/792838; role
  throws **6**/44; seed0015 RNG **364**/8563 Scr **1**/44; seed0105
  RNG **988**/2499 Scr **0**/30.
- **Omissions named:** `skill_init` still stubbed; Ranger/Monk/
  Archeologist/Barbarian/Caveman kits; seed0015 `lspo_map`; seed0105/
  0501 `wipeout_text`; seed0700/0103 `mkclass_aligned`; seed2200/0030
  `choose_trapnote`; seed0016 `hole_destination`.
- **Lesson:** Valkyrie unlock needs bases[] `knows_class` with polearm
  skip — do not leave the Knight/Samurai-only gate or skip the Lamp
  `rn2(6)` branch.
- **Next:** Ranger (2 throws), or remaining 1-throw roles, or shared
  mklev peels.

## D-0048 — Ranger `u_init_role` + launcher/ammo/spear `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Ranger sessions still diverge later (moveloop / mklev peels).
- **Observed:** **6/44** role throws after D-0047; 2 dedicated Ranger
  throws (seed0101 + seed0102). After port, **4/44** remain (no Ranger:
  Monk/Archeologist/Barbarian/Caveman). seed0101 rng-diff prefix
  **2293** (`next_ident`); seed0102 **1281** (`rndmonst_adj`).
- **Cause/evidence:** Ranger kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `ini_inv(Ranger)` (dagger+1, bow+1, two
  arrow stacks, cloak of displacement+2, cram×4) and
  `knows_class(WEAPON_CLASS)` filtered to launchers/ammo/spears via
  `is_launcher`/`is_ammo`/`is_spear` (not full weapon class).
- **C locus:** `u_init.c` `Ranger[]` / `Skill_Ran` / `u_init_role`
  `PM_RANGER` / `knows_class`; `obj.h` launcher/ammo/spear macros;
  `role.c` Ranger entry.
- **Change:** Ranger roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  Ranger inventory; `Skill_Ran` in `skills_for_role`; `knows_class`
  admits `PM_RANGER` with launcher/ammo/spear filter; added
  `is_launcher`/`is_spear` helpers.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405 (+4), RNG **72474**/792838; role
  throws **4**/44; seed0101 RNG **2304**/2371 Scr **3**/27; seed0102
  RNG **1285**/4485 Scr **1**/25.
- **Omissions named:** `skill_init` still stubbed; Monk/Archeologist/
  Barbarian/Caveman kits; seed0101 `next_ident`; seed0102
  `rndmonst_adj`; seed0015 `lspo_map`; seed0105/0501 `wipeout_text`;
  seed0700/0103 `mkclass_aligned`; seed2200/0030 `choose_trapnote`;
  seed0016 `hole_destination`.
- **Lesson:** Ranger `knows_class` is not full-weapon discovery — port
  the launcher/ammo/spear filter; do not reuse Valkyrie/Knight's
  broader walk.
- **Next:** Monk/Archeologist/Barbarian/Caveman (1 throw each), or
  shared mklev/moveloop peels.

## D-0049 — Monk `u_init_role` + spellbook RNG + armor `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Monk sessions still diverge later (`lspo_map` / early peels).
- **Observed:** **4/44** role throws after D-0048; 1 dedicated Monk
  throw (seed0200). After port, **3/44** remain (Archeologist/
  Barbarian/Caveman). seed0200 rng-diff prefix **377** (`lspo_map`);
  positional RNG **1545**/3822.
- **Cause/evidence:** Monk kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `ini_inv(Monk)` (gloves+2, robe+1, random
  scroll, healing×3, rations/fruit/cookies) then
  `ini_inv(M_spell[rn2(90)/30])` (Healing/Protection/Confuse Monster),
  Magicmarker `!rn2(4)` else Lamp `!rn2(10)`, `knows_class(ARMOR)`,
  `knows_object(SHURIKEN)`.
- **C locus:** `u_init.c` `Monk[]` / `M_spell` / `Skill_Mon` /
  `u_init_role` `PM_MONK` / `knows_class`; `role.c` Monk entry.
- **Change:** Monk roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  Monk inventory + spellbook extras; `Skill_Mon` in `skills_for_role`;
  `knows_class` admits `PM_MONK` for armor walk.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405, RNG **74019**/792838; role throws
  **3**/44; seed0200 RNG **1545**/3822 Scr **0**/40.
- **Omissions named:** `skill_init` / `initialspell` still stubbed;
  Archeologist/Barbarian/Caveman kits; seed0200/0015 `lspo_map`;
  seed0105/0501 `wipeout_text`; seed0700/0103 `mkclass_aligned`;
  seed2200/0030 `choose_trapnote`; seed0016 `hole_destination`;
  seed0101 `next_ident`; seed0102 `rndmonst_adj`.
- **Lesson:** Monk spell choice is `rn2(90)/30` (three books), not a
  free `rn2(3)`; Magicmarker precedes Lamp with distinct odds.
- **Next:** Archeologist/Barbarian/Caveman (1 throw each), or shared
  mklev/moveloop peels.

## D-0050 — Archeologist `u_init_role` + tin opener/lamp/marker + SACK/TOUCHSTONE

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Archeologist session still diverges later (`hole_destination`).
- **Observed:** **3/44** role throws after D-0049; 1 dedicated
  Archeologist throw (seed0361). After port, **2/44** remain
  (Barbarian/Caveman). seed0361 rng-diff prefix **1280**
  (`hole_destination`); positional RNG **2478**/53865.
- **Cause/evidence:** Archeologist kit absent; scaffold lacked attrs/
  `hpadv`/`enadv`/`initrecord=10`. C `ini_inv(Archeologist)` (whip+2,
  leather jacket, fedora, rations×3, pick-axe, tinning kit, touchstone,
  sack) then Tinopener `!rn2(10)` else Lamp `!rn2(4)` else Magicmarker
  `!rn2(5)`, `knows_object(SACK/TOUCHSTONE)` — no `knows_class`.
- **C locus:** `u_init.c` `Archeologist[]` / `Skill_A` / `u_init_role`
  `PM_ARCHEOLOGIST`; `role.c` Archeologist entry.
- **Change:** Archeologist roles attrs/`hpadv`/`enadv`/`initrecord`/
  titles; Archeologist inventory + optional tool chain; `Skill_A` in
  `skills_for_role`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405, RNG **76497**/792838; role throws
  **2**/44; seed0361 RNG **2478**/53865 Scr **0**/366.
- **Omissions named:** `skill_init` still stubbed; Barbarian/Caveman
  kits; seed0361/0016 `hole_destination`; seed0200/0015 `lspo_map`;
  seed0105/0501 `wipeout_text`; seed0700/0103 `mkclass_aligned`;
  seed2200/0030 `choose_trapnote`; seed0101 `next_ident`; seed0102
  `rndmonst_adj`.
- **Lesson:** Archeologist optional extras are a three-way else-if chain
  (tin opener → lamp → marker), not independent rolls; discovery is
  object-specific, not a class walk.
- **Next:** Barbarian/Caveman (1 throw each), or shared mklev/moveloop
  peels.

## D-0051 — Barbarian `u_init_role` + kit RNG + Lamp + weapon/armor `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Barbarian session still diverges later (`choose_trapnote`).
- **Observed:** **2/44** role throws after D-0050; 1 dedicated
  Barbarian throw (seed0373). After port, **1/44** remains (Caveman).
  seed0373 rng-diff prefix **1327** (`choose_trapnote`); positional
  RNG **2277**/35386.
- **Cause/evidence:** Barbarian kit absent; scaffold lacked attrs/
  `hpadv`/`enadv`/`initrecord=10`. C `rn2(100)>=50` →
  `ini_inv(Barbarian_0)` (two-handed sword, axe, ring mail, ration)
  else `Barbarian_1` (battle-axe, short sword, ring mail, ration),
  then Lamp `!rn2(6)`, `knows_class(WEAPON)` excluding polearms +
  `knows_class(ARMOR)`.
- **C locus:** `u_init.c` `Barbarian_0`/`Barbarian_1` / `Skill_B` /
  `u_init_role` `PM_BARBARIAN`; `role.c` Barbarian entry.
- **Change:** Barbarian roles attrs/`hpadv`/`enadv`/`initrecord`/
  titles; both kit tables + Lamp; enable `PM_BARBARIAN` in
  `knows_class` bases[] walk; `Skill_B` in `skills_for_role`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405, RNG **78774**/792838; role throws
  **1**/44; seed0373 RNG **2277**/35386 Scr **0**/124.
- **Omissions named:** `skill_init` still stubbed; Caveman kit;
  seed0373/2200/0030 `choose_trapnote`; seed0361/0016
  `hole_destination`; seed0200/0015 `lspo_map`; seed0105/0501
  `wipeout_text`; seed0700/0103 `mkclass_aligned`; seed0101
  `next_ident`; seed0102 `rndmonst_adj`.
- **Lesson:** Barbarian weapon kit uses `rn2(100)>=50` (not `rn2(2)`)
  per C comment about skewed generators; polearm exclusion matches
  Valkyrie `knows_class` path.
- **Next:** Caveman (last role throw), or shared mklev/moveloop peels.

## D-0052 — Caveman `u_init_role` + `Cave_man[]` + FLINT/ROCK quiver

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Caveman session still diverges later (GEM `rnd_class` sum).
- **Observed:** **1/44** role throws after D-0051; 1 dedicated
  Caveman throw (seed1150). After port, **0/44** remain.
  seed1150 rng-diff prefix **1118** (`rnd_class` C `rnd(999)` vs JS
  `rnd(1000)`); positional RNG **2937**/3137 Scr **22**/51.
- **Cause/evidence:** Caveman kit absent; scaffold lacked attrs/
  `hpadv`/`enadv`/`initrecord=10`. C `ini_inv(Cave_man)` only (club+1,
  sling+2, flint 10–20 stacks, rock ×3 merges to 18..33, leather);
  **no** `knows_class`/Lamp. Also needed `ini_inv_use_obj` to quiver
  FLINT/ROCK (C includes them beside WEAPON/`is_weptool`) and
  graystone quan=1 except FLINT in `ini_inv_adjust_obj`.
- **C locus:** `u_init.c` `Cave_man[]` / `Skill_C` / `u_init_role`
  `PM_CAVE_DWELLER` / `ini_inv_use_obj` / `ini_inv_adjust_obj`;
  `role.c` Caveman entry.
- **Change:** Caveman roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  `Cave_man` trop table; `Skill_C` in `skills_for_role`; FLINT/ROCK
  quiver + graystone quan fix in shared `ini_inv_*` helpers.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **278**/11405, RNG **81711**/792838; role throws
  **0**/44; seed1150 RNG **2937**/3137 Scr **22**/51.
- **Omissions named:** `skill_init` still stubbed; seed1150 GEM
  `oclass_prob_totals` off-by-one; seed0373/2200/0030
  `choose_trapnote`; seed0361/0016 `hole_destination`; seed0200/0015
  `lspo_map`; seed0105/0501 `wipeout_text`; seed0700/0103
  `mkclass_aligned`; seed0101 `next_ident`; seed0102 `rndmonst_adj`.
- **Lesson:** Caveman flint/rock are GEM ammo that must still enter
  the quiver path; rock quantity comes from outer trop count ×
  `mksobj` `rn1(6,6)`, not a single trop quan range.
- **Next:** shared mklev/moveloop peels, or GEM prob-total 999 vs 1000.

## D-0053 — `mkclass`/`mkclass_aligned` + Wizard `A_NONE` extractor

- **Status:** fixed (verified 2026-07-13) for makeniche iron-bars
  human-corpse selection; later peels remain.
- **Observed:** seed0700/0103 first mismatch was C `rn2(9)` @
  `mkclass_aligned` vs JS `rn2(398)` stub in `makeniche`. After real
  `mkclass` alone, prefix stuck at ~1723 because Wizard of Yendor had
  extractor fallback difficulty **0**, scrambling `mongen_order`.
- **Cause/evidence:** (1) JS burned a single `rn2(398)` instead of
  C `mkclass(S_HUMAN,0)` → `mkclass_aligned` (per-candidate `rn2(9)`
  hell/nohell mask, `montoostrong` `rn2(2)` break, weighted `rnd(num)`).
  (2) `extract-monsters.py` LVL regex rejected `A_NONE`, so WoY used
  the zeroed fallback and sorted first among humans.
- **C locus:** `makemon.c` `mkclass`/`mkclass_aligned`/`mk_gen_ok`/
  `init_mongen_order`; `mklev.c` `makeniche`; `mondata.h`
  `is_placeholder`; `monsters.h` Wizard `LVL(..., A_NONE)`.
- **Change:** port `mkclass`/`mkclass_aligned` (+ mongen_order,
  `mk_gen_ok`, `is_placeholder`, `G_IGNORE`); wire `makeniche`; parse
  `A_NONE`/`A_*` in monster extractor and regenerate
  `monsters_data.js`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **279**/11405, RNG **82967**/792838; seed0700
  prefix **1888** (`rndmonst_adj`); seed0103 **2337**
  (`next_ident`/`trquan`); positional seed0700 **2769**/3230,
  seed0103 **2344**/2640.
- **Omissions named:** `mkclass` alignment/`G_IGNORE` callers beyond
  niche (e.g. `ndemon`); `m_initinv` body; seed0700 `rndmonst_adj`
  weight arity; seed0103 pony/makemon invent; `choose_trapnote` /
  `hole_destination` / `wipeout_text` / `lspo_map`; SPBOOK_no_NOVEL
  (later D-0055).
- **Lesson:** a wrong extracted difficulty is enough to desync
  `mkclass` even when the control-flow port looks right — falsify
  table data early when `rn2(9)` count before `rn2(2)` is short.
- **Next:** peel `rndmonst_adj` (seed0700) or pony invent
  (seed0103), or other shared mklev blockers.

## D-0054 — `maketrap` `choose_trapnote` + `hole_destination`

- **Status:** fixed (verified 2026-07-13) for SQKY_BOARD note pick and
  HOLE/TRAPDOOR destination RNG; fuller `maketrap` still partial.
- **Observed:** seed2200/0030/0373 first mismatch C `rn2(12)` @
  `choose_trapnote` vs JS skipping to mktrap victim `rnd(4)`.
  seed0016/0361 C `rn2(4)` @ `hole_destination` vs same JS `rnd(4)`.
- **Cause/evidence:** JS `maketrap` was a push-only stub — never set
  `tnote` or `dst`, so squeaky-board and hole traps omitted C RNG.
- **C locus:** `trap.c` `choose_trapnote` / `hole_destination` /
  `dng_bottom` / `maketrap` switch for `SQKY_BOARD` and
  `HOLE`/`TRAPDOOR`.
- **Change:** port helpers into `js/trap.js`; export real `maketrap`;
  `mklev` imports it. Quest/Gehennom `dng_bottom` cutoffs included;
  overwrite/furniture/statue/boulder/shop/terrain morph named omissions.
- **Verification:** green + seed1500/1800/0060 PASS + strict; seed2200
  prefix **1283→2724**; seed0016 **1341→2493**; seed0373 **1327→1401**
  (pre-D-0055); seed0361 **1280→1432**.
- **Lesson:** missing `maketrap` switch arms look like “wrong next
  call” arity drift at the victim gate — check trap-type RNG before
  fill_ordinary_room.
- **Next:** D-0055 cleared the follow-on SPBOOK misread; peel
  moveloop/`rndmonst_adj`/`peace_minded` next.

## D-0055 — `mkobj(SPBOOK_no_NOVEL)` → `rnd_class` through blank paper

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed1150/0030 (and post-D-0054 seed0373) showed
  C `rnd(999)` @ `rnd_class` vs JS `rnd(1000)`. Notes wrongly called
  this GEM `oclass_prob_totals`.
- **Cause/evidence:** C `SPBOOK_no_NOVEL` is `-SPBOOK_CLASS`; `mkobj`
  uses `rnd_class(bases[SPBOOK], SPE_BLANK_PAPER)` (sum **999**, novel
  prob 1 excluded). JS used fake class `11`, remapped to
  `SPBOOK_CLASS`, and rolled the full class total **1000**. Statue
  book path also used bare `SPBOOK_CLASS`.
- **C locus:** `objclass.h` `SPBOOK_no_NOVEL`; `mkobj.c` `mkobj`;
  `objnam.c` `rnd_class`; `mklev.c` supply-chest `extra_classes`.
- **Change:** `mkobj` honors `SPBOOK_no_NOVEL`; mklev uses
  `0 - SPBOOK_CLASS` and passes it through; statue path matches.
- **Verification:** green + cohort PASS; full **5/44**, screens
  **290**/11405, RNG **85043**/792838; seed1150 prefix **1118→2301**
  (`peace_minded`), positional **2941**/3137; seed0030 **5127→6305**;
  seed0373 **1327→2512**; seed2200 positional **2772**/3018.
- **Lesson:** provenance `rnd_class` + arity 999 is spellbook-without-
  novel, not gem totals — check `mkobj` fake-class branches before
  retuning `setgemprobs`.
- **Next:** D-0056 cleared Caveman `peace_minded` arity; peel
  seed0700 `rndmonst_adj` / seed2200 `exercise` / seed1150
  `dog_move` @ 2915.

## D-0056 — roles[] `initrecord` match C (Caveman/Valkyrie/Rogue)

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed1150 first mismatch C `rn2(16)` @
  `peace_minded` vs JS `rn2(26)` — same call site, wrong arity.
- **Cause/evidence:** C `role.c` `initrecord` after `xlev`: Caveman
  **0**, Valkyrie **0**, Rogue **10**. JS had Caveman/Valkyrie **10**
  and Rogue **0**. `u_init` copies `urole.initrecord` into
  `u.ualign.record`; `peace_minded` rolls `rn2(16 + record)`.
- **C locus:** `role.c` roles[] `initrecord`; `makemon.c`
  `peace_minded`; `u_init.c` ualign init.
- **Change:** `js/roles.js` initrecord: Caveman 10→0, Valkyrie
  10→0, Rogue 0→10.
- **Verification:** green + seed1500/1800/0060 PASS + strict;
  seed1150 rng-diff prefix **2301→2915** (`dog_move`); positional
  **2941→2942**/3137 Scr 22/51; full **5/44**, screens **290**,
  RNG **85042**/792838. Rogue cohort still PASS (paths rarely hit
  co-aligned `peace_minded` with the bad Rogue record).
- **Lesson:** landmarks that say “initrecord 10” for every combat
  role are wrong — read the field after `/* Energy */` (=xlev) in
  `role.c`. Wrong record looks like a `peace_minded` formula bug.
- **Next:** seed0700 `rndmonst_adj` @ 1888 (likely `align_shift`);
  seed2200 `exercise` @ 2724; seed1150 `dog_move` @ 2915;
  seed0103 `next_ident`/`trquan` @ 2337.

## D-0057 — CORPSE `mksobj_init` `undead_to_corpse` + `G_NOCORPSE` retry

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0700/0361 first mismatch after a complete z1
  `rndmonst_adj` ending at `rn2(21)`: C `rn2(3)` (new `rndmonst_adj`)
  vs JS `rn2(2)` (`mksobj` gender). NOTES guessed `align_shift`.
- **Cause/evidence:** DoD is `alignment = "unaligned"` → `align_shift`
  returns 0; z1 pool freq-only totals are 3…21 for both. C
  `mksobj_init` CORPSE does
  `do { corpsenm = undead_to_corpse(rndmonnum()); } while (mvitals &
  G_NOCORPSE)` (tryct 50). Grid bug is in the z1 eligible set with
  `G_NOCORPSE`; when reservoir picks it, C burns a second full
  `rndmonst_adj`. JS took one `rndmonnum()` and fell through to
  gender `rn2(2)`. Also missing `allmain` mvitals init
  (`mvflags = geno & G_NOCORPSE`).
- **Rejected:** `align_shift` / `temperature_shift` as the seed0700
  arity gap on ordinary DoD dlvl1 (AM_NONE, temperature 0).
- **C locus:** `mkobj.c` `mksobj_init` FOOD/CORPSE; `mon.c`
  `undead_to_corpse`; `allmain.c` mvitals init.
- **Change:** `js/mon.js` `undead_to_corpse`; `js/allmain.js` mvitals
  init; `js/mkobj.js` CORPSE retry + TIN `undead_to_corpse`/`mvitals`
  check.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **290** RNG **85090**/792838; seed0700 prefix
  **1888→2733** (`u_calc_moveamt`); seed0361 **1432→2924** (`newhp`);
  positional seed0700 **2796**/3230, seed0361 **2972**/53865.
- **Lesson:** after a matching `rndmonst_adj` that ends at newt/`rn2(21)`,
  the next `rn2(3)` vs `rn2(2)` is often a **second** `rndmonnum` from
  CORPSE retry — not dungeon align. seed0102 @ 1281 after egg
  `!rn2(3)` is still the EGG `can_be_hatched` multi-retry peel.
- **Next:** seed0700 `u_calc_moveamt` @ 2733; seed0361 `newhp` @
  2924; seed0102 egg `can_be_hatched`; seed2200 `exercise` @ 2724;
  seed1150 `dog_move` @ 2915.

## D-0058 — `adjabil` L1 Fast + `u_calc_moveamt` `rn2(3)`

- **Symptom:** seed0700 rng-diff @ **2733**: C `rn2(3)` @
  `u_calc_moveamt` vs JS `rn2(200)` @ `dosounds`.
- **Cause/evidence:** Samurai `sam_abil[]` grants `HFast` at level 1
  via `adjabil(0,1)` in `u_init_misc` (also Monk L1 Fast; Rogue
  Stealth; etc.). JS never called `adjabil` and omitted the
  Fast/Very_fast branches in `u_calc_moveamt`, so the first EOT after
  matching `maybe_generate_rnd_mon` jumped straight to dosounds.
  Tourist has no L1 Fast → green sessions unaffected.
- **Rejected:** dosounds arity reorder / missing fountain rolls as the
  primary gap at 2733 (C provenance is explicitly `u_calc_moveamt`).
- **C locus:** `attrib.c` `adjabil`/`role_abil`/`sam_abil`;
  `u_init.c` `u_init_misc`; `allmain.c` `u_calc_moveamt`;
  `youprop.h` Fast/Very_fast.
- **Change:** `js/attrib.js` innate tables + `adjabil`/`Fast`/
  `Very_fast`; `js/u_init.js` `adjabil(0,1)` before `ulevel=1`;
  `js/allmain.js` Fast/Very_fast `rn2(3)` in `u_calc_moveamt`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **291** RNG **85494**/792838; seed0700 prefix
  **2733→3141** (`rnl`/`doopen_indir`); positional **3146**/3230
  Scr **2**/51; seed0017 **2831**/3465 prefix **2711** (`m_move`).
- **Lesson:** role L1 intrinsics are not optional flavor — Fast changes
  every EOT RNG for Samurai/Monk. Port `adjabil` with the full innate
  tables, not a Samurai-only HFast hardcode.
- **Next:** seed0700 `rnl`/`doopen_indir` @ 3141; seed0361 `newhp` @
  2924; seed0102 egg `can_be_hatched`; seed2200 `exercise` @ 2724;
  seed1150 `dog_move` @ 2915.

## D-0059 — `rnl` + autoopen `doopen_indir`

- **Symptom:** seed0700 rng-diff @ **3141**: C `rnl(20)` @
  `doopen_indir` vs JS `rn2(7)`.
- **Cause/evidence:** Walking into a CLOSED door with default
  `flags.autoopen` runs `hack.c` → `doopen_indir` → `rnl(20)` then
  (on resist) `exercise(A_STR)`. JS `domove` only treated closed doors
  as blocked (`move=0`) with no open attempt, so the next unrelated
  call (`rn2(7)`) sat at 3141. Three consecutive `l` resists in the
  session each emit only `rnl`+`exercise` and do **not** advance T.
- **Rejected:** treating the arity gap as pet/`distfleeck` reorder
  before the door bump; inventing a turn-consuming open on resist.
- **C locus:** `rnd.c` `rnl`; `lock.c` `doopen_indir`; `hack.c`
  `test_move` autoopen; `attrib.c` `acurrstr`/`exercise`.
- **Change:** `js/rng.js` `rnl` (Luck bias + logged internal `rn2`);
  `js/attrib.js` exported `acurrstr`; `js/lock.js` `doopen_indir`
  CLOSED success/resist; `js/cmd.js` autoopen wiring in `domove`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85803**/792838; seed0700 prefix
  **3141→3207** (`m_move`); positional **3229**/3230 Scr **2**/51;
  seed0030 **6876**/105529 Scr **39**/1953.
- **Omissions named:** interactive `o`/`doopen` getdir; `b_trapped`/
  autounlock/mapseen/`feel_newsym` detail; display-stream RNG still
  absent.
- **Lesson:** missing shared wrappers (`rnl`) look like late combat
  arity bugs when walk-into-door never consumes the open RNG.
- **Next:** seed0700 `m_move` @ 3207; seed0361 `newhp` @ 2924;
  seed0102 egg `can_be_hatched`; seed2200 `exercise` @ 2724;
  seed1150 `dog_move` @ 2915.

## D-0060 — `mfndpos` BOULDER + `NODIAG`

- **Symptom:** seed0700 rng-diff @ **3207**: C `rn2(16)` @
  `m_move` track skip vs JS `rn2(20)` (same site). seed0017 @ **2711**:
  C `rn2(16)` vs JS `rn2(32)`.
- **Cause/evidence:** (1) Newt at (65,4) had a corridor boulder neighbor;
  C `mfndpos` skips `sobj_at(BOULDER)` without `ALLOW_ROCK`, so
  `cnt=4` → `rn2(4*(cnt-j))=rn2(16)`. JS included the boulder cell
  (`cnt=5` → `rn2(20)`). (2) Grid bugs use `NODIAG(PM_GRID_BUG)` —
  C omits diagonals (`cnt=4`); JS allowed all 8 neighbors (`cnt=8` →
  `rn2(32)`).
- **Rejected:** inventing `appr`/`mtrack` order hacks; treating arity as
  a dog_move/`distfleeck` reorder (prefix through pet + fleeck matched).
- **C locus:** `mon.c` `mfndpos` / `mon_allowflags`; `hack.h` `NODIAG`;
  `mondata.h` `throws_rocks`/`passes_walls`.
- **Change:** `js/mon.js` boulder skip + `ALLOW_ROCK` bit; `NODIAG`
  diagonal reject; `mon_allowflags` sets `ALLOW_ROCK` for
  `throws_rocks`/`passes_walls`. `js/monsters.js` helpers + flags.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86026**/792838; seed0700 RNG
  **3230**/3230 Scr **2**/51; seed0017 prefix **2711→2775**
  positional **2840**/3465; seed0030 **7021**/105529.
- **Omissions named:** `m_can_break_boulder`; mfndpos pool/lava/garlic/
  `bad_rock` squeeze / temple / iron bars; `ALLOW_WALL`; hostile
  `m_avoid_kicked_loc` wiring.
- **Lesson:** `m_move` track `rn2(4*(cnt-j))` arity is an `mfndpos`
  candidate-count bug — dump `cnt`/`j`/neighbor objects before
  rewriting approach logic.
- **Next:** seed0700 screen peel (RNG full); seed0361 `newhp` @ 2924;
  seed0017 @ 2775; seed0102 egg; seed2200 `exercise`; seed1150
  `dog_move`.

## D-0061 — `newhp`/`newpw` level-up + `#levelchange`

- **Symptom:** seed0361 rng-diff @ **2924**: C `rnd(8)` @
  `newhp(attrib.c:1101)` vs JS `rn2(12)`. seed0373 @ **2512**: C
  `rnd(10)` vs JS `rn2(7)`.
- **Cause/evidence:** Provenance is the **level-up** branch (lornd), not
  init. Wizard tours type `#levelchange` → `20` → `wiz_level_change` →
  `pluslvl(FALSE)` loop. JS had only ulevel==0 `newhp`/`newpw`, no
  `pluslvl`, and `#` was an unknown command. Follow-on: Barbarian
  stalled at xlev because `setup_role_race_from_rc` omitted `xlev`
  (defaulted to 14 while C Barbarian is 10). Extcmd autocomplete must
  truncate-at-cursor like C NEWAUTOCOMP (append-after-expand garbled
  `levelchange`).
- **Rejected:** treating 2924 as init `newhp`/`rn2(12)` trap arity;
  Tourist-shaped level-up stubs; seed-specific level tables.
- **C locus:** `attrib.c` `newhp`; `exper.c` `newpw`/`enermod`/`pluslvl`;
  `wizcmds.c` `wiz_level_change`; `cmd.c` `doextcmd`;
  `win/tty/getline.c` `tty_get_ext_cmd`/`ext_cmd_getlin_hook`;
  `role.c` `roles[].xlev`.
- **Change:** `js/attrib.js` full `newhp` + async `adjabil` gainstr;
  `js/exper.js` `newpw`/`pluslvl`; `js/getline.js` `getlin`/`doextcmd`;
  `js/wizcmds.js` `wiz_level_change`; `js/cmd.js` `#`; `js/roles.js`
  `xlev` on all roles; `u_init` copies `xlev`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86020**/792838; seed0361 prefix
  **2924→2975** (`dosearch0`) positional **3044**/53865; seed0373
  **2512→2549** (`getbones`) positional **2573**/35386.
- **Omissions named:** `#levelchange` `losexp` drain; full `extcmdlist`;
  `pluslvl` achievements/livelog/`newuexp`/Upolyd; `adjabil` lose/
  `postadjabil`/`add_weapon_skill`.
- **Lesson:** tour peels after moveloop_preamble are often wizard
  `#levelchange`, not mklev; copy every RoleAdvance sibling field
  (`xlev`) when building `game.urole`.
- **Next:** seed0361 `dosearch0`/`rnl` @ 2975; seed0700 screen peel;
  seed0373 `getbones` @ 2549; seed0017 @ 2775; egg `can_be_hatched`.

## D-0062 — `dosearch0` + Searching autosearch

- **Symptom:** seed0361 rng-diff @ **2975**: C `rnl(8)` @
  `dosearch0(detect.c:2079)` vs JS `rn2(300)` dosounds.
- **Cause/evidence:** Archeologist L1 `HSearching` (via `adjabil`) makes
  C call `dosearch0(1)` every EOT when an adjacent unseen trap exists
  (`!rnl(8)`). JS never called `dosearch0` (search `s` only burned a
  turn; moveloop omitted Searching).
- **Rejected:** treating 2975 as a dosounds arity bug; seed-specific
  trap coordinates; implementing only the `s` command without EOT
  Searching.
- **Follow-on (not this unit):** after matching through wipe @ 2978,
  JS rhack reads wish-text `…blessed…` as commands (`e`/`s`) because
  **`^W` / wizard wish is unported** — next seed0361 peel is wish
  getlin, not another dosearch bug.
- **C locus:** `detect.c` `dosearch0`/`find_trap`/`cvt_sdoor_to_door`;
  `allmain.c` Searching EOT; `youprop.h` Searching; `cmd.c`/`detect.c`
  `dosearch`.
- **Change:** new `js/detect.js`; `Searching()` in `attrib.js`; EOT
  call in `allmain.js`; `s` + `continue_search` → `dosearch`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86037**/792838; seed0361 prefix
  **2975→2979** (wish-text `s`) positional **3051**/53865; seed0700
  RNG still full; seed0102 still egg @ 1281.
- **Omissions named:** feel_location/Blind/unmap_invisible; mfind0
  body; Hallucination/cls map_trap wait; activate_statue_trap; artifact
  SPFX_SEARCH fund; cmd_safety_prevention; warnreveal; `^W` wish.
- **Lesson:** L1 Searching roles (Arc/Ran) need EOT `dosearch0` even
  when the player never presses `s`; silent when no adjacent
  SDOOR/SCORR/unseen trap.
- **Next:** see D-0063 — first post-dosearch peel was `T` takeoff,
  not wish; wish follows once `TcTd` is consumed.

## D-0063 — `dotakeoff` (`T`) delay-0 armor

- **Symptom:** seed0361 rng-diff @ **2979**: C `rn2(5)` @
  `distfleeck` (post-takeoff turn) vs JS `rnl(8)` Searching. Key map
  is `TcTd\e^Wblessed…`; JS had no `T`, so `^W`/`blessed` leaked and
  `l`/`s` from the wish string became move/search.
- **Cause/evidence:** C `dotakeoff` — with 2 worn pieces (fedora +
  leather jacket) first `T` prompts getobj (`c` = fedora), second `T`
  auto-removes the remaining piece (`Narmorpieces == 1`). JS treated
  `T` as unknown.
- **Rejected:** claiming @ 2979 was solely `^W` wish (wish keys start
  at RNG **3011** after both takeoffs); treating wish-text `s` as the
  first peel without checking `TcTd`.
- **C locus:** `do_wear.c` `dotakeoff`/`count_worn_stuff`/
  `armor_or_accessory_off`/`armoroff`/`Helmet_off`/`Armor_off`/
  `off_msg`; `cmd.c` `'T'` → `dotakeoff`.
- **Change:** new `js/do_wear.js`; `cmd.js` `'T'` → `dotakeoff`.
  Delay-0 path only (`oc_delay` not in objects extractor); fedora
  Archeologist `change_luck(-1)`; accessories/cursed/layering basics.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86053**/792838; seed0361 prefix
  **2979→3011** (`next_ident` wish mksobj) positional **3054**/53865;
  seed0700 RNG still full.
- **Omissions named:** `oc_delay`/occupation `afternmv`; full
  `Helmet_off` magic helms; dragon armor; `setworn` prop side-effects;
  `ParanoidRemove`; welded/Glib glove gates; `A` takeoffall;
  **`^W`/`makewish`/`readobjnam`**.
- **Lesson:** after `#levelchange`, tour keys often strip armor before
  wizard wishes — missing `T` looks like wish-text leak at a later
  index.
- **Next:** `^W` `wiz_wish`/`makewish`/`readobjnam` for seed0361 @
  3011; or shared `getbones`/`^V` / egg / seed0700 screen.

## D-0064 — `^W` wish / `makewish` / `readobjnam` (seed0361 trio)

- **Symptom:** seed0361 rng-diff @ **3011**: C `rnd(2)` `next_ident`
  (Grayswandir `mksobj`) vs JS `rn2(5)` (wish text still leaked into
  rhack as movement/search).
- **Cause/evidence:** C `C('w')` → `wiz_wish` → `makewish` →
  `readobjnam` for `blessed +5 Grayswandir`, then SDSM, then ALS.
  JS had no `^W` binding and no wish parser. SDSM path is
  `name_to_monplus("silver dragon")` + `rnd_otyp_by_namedesc("scale
  mail")` (`rn2(67)`) then `SCALE_MAIL`→SDSM remap — not a direct
  full-name `rnd_otyp` (`rn2(1)`).
- **Rejected:** matching SDSM via exact `"silver dragon scale mail"`
  `rnd_otyp` (wrong arity); skipping `rn2(nartifact_exist())` in
  wizard mode (C still evaluates the `||` left side).
- **C locus:** `wizcmds.c` `wiz_wish`; `zap.c` `makewish`;
  `objnam.c` `readobjnam`/`rnd_otyp_by_namedesc`/`wishymatch`;
  `mondata.c` `name_to_monplus`; `artifact.c` `artifact_name`/
  `touch_artifact`/`nartifact_exist`; `do_name.c` `oname`;
  `invent.c` `hold_another_object`; `cmd.c` `C('w')`.
- **Change:** artifact extractor + `js/artifact.js`/`do_name.js`/
  `mondata.js`/`readobjnam.js`/`zap.js`; `wiz_wish`; `cmd.js` `^W`;
  `hold_another_object` + exported `addinv`; doname `named`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85938**/792838; seed0361 prefix
  **3011→3035** (`w` wield `touch_artifact`) positional **3087**/53865;
  seed0700 RNG still full; seed0108 wishlist positional **2690**.
- **Omissions named:** full `readobjnam` (fruits/traps/terrain/
  random/`o_ranges`/alt spellings/Japanese wish); `wishcmdassist`/
  history; livelog; `observe_object` beyond `dknown`; blast
  `losehp` in `touch_artifact`; `encumber_msg`; `#wizwish` extcmd;
  `w`/`W` wield/wear; `bane_applies`; artifact intrinsics on wield.
- **Lesson:** dragon scale mail wishes go through monster-name strip
  + generic `scale mail` probabilistic match, then otyp remap — do
  not short-circuit to the final otyp in `rnd_otyp_by_namedesc`.
- **Next:** `w`/`dowield` (seed0361 @ 3035) or shared
  `getbones`/`^V` / egg / seed0700 screen.

## D-0065 — `w`/`dowield` Grayswandir (seed0361)

- **Symptom:** seed0361 rng-diff @ **3035**: C `rn2(4)`
  `touch_artifact` vs JS `rn2(7)` (unknown-`w` desync).
- **Cause/evidence:** Session keys `wi` after wish trio. C
  `dowield` → `getobj` letter `i` → `ready_weapon` →
  `retouch_object` → `touch_artifact`. Neutral Archeologist +
  lawful Grayswandir → `badalign` → `rn2(4)` gate (`spfx` has
  `SPFX_RESTR|SPFX_HALRES`, not `SPFX_INTEL`). JS had no `'w'`
  binding.
- **Rejected:** treating wish-time `hold_another_object`
  `touch_artifact` (@ 3017) as the only touch — wield retouches
  again (@ 3035).
- **C locus:** `wield.c` `dowield`/`ready_weapon`/`setuwep`/
  `welded`; `artifact.c` `retouch_object`/`touch_artifact`;
  `cmd.c` `'w'`.
- **Change:** `js/wield.js` + `cmd.js` `'w'`; `retouch_object` in
  `artifact.js`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85896**/792838; seed0361 prefix
  **3035→3073** (`W` wear) positional **3103**/53865; seed0700
  RNG still full.
- **Omissions named:** `cantwield` poly; `cant_wield_corpse`;
  bimanual+shield; `will_weld` pline body; `doswapweapon`; quiver
  ynq; count-split/`finish_splitting`; `arti_speak`/
  `artifact_light`; `pushweapon`; blast `d()`/`losehp` when
  `rn2(4)==0`; silver-hate/bane in `retouch_object`; full
  `setworn` props; `W`/`dowear`.
- **Lesson:** alignment-restricted non-intelligent artifacts still
  roll `rn2(4)` on every retouch (wish and wield), not only once.
- **Next:** `W`/`dowear` (seed0361 @ 3073 SDSM) or shared
  `getbones`/`^V` / egg / seed0700 screen.

## D-0066 — `W`/`dowear` SDSM delay occupation (seed0361)

- **Symptom:** seed0361 rng-diff @ **3073**: C `rn2(5)`
  `distfleeck` vs JS `rn2(7)` (unknown-`W` then `j` as move).
- **Cause/evidence:** Session keys `Wj` after wield. C `dowear` →
  getobj `j` (SDSM) → `accessory_or_armor_on` → `setworn` +
  `nomul(-oc_delay)` with SDSM `oc_delay=5`. Moveloop skips
  `nhgetch` while `multi < 0`, attributing all 5 dressing turns
  (+ pet fleeck) to the `j` keystroke. JS lacked `'W'` and
  negative-`multi` occupation.
- **Rejected:** fleeck arity / pet geometry as the first cause —
  without wear, `j` was a south move with different pet path.
- **C locus:** `do_wear.c` `dowear`/`canwearobj`/
  `accessory_or_armor_on`/`Armor_on`; `worn.c` `setworn`;
  `hack.c` `nomul`/`unmul`; `allmain.c` `multi < 0`;
  `objects.h` `oc_delay`; `cmd.c` `'W'`.
- **Change:** extractor `oc_delay`; `js/do_wear.js` wear path;
  `js/hack.js` `nomul`/`unmul`; `js/allmain.js` occupation;
  `cmd.js` `'W'`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85752**/792838; seed0361 prefix
  **3073→3259** (`P` puton) positional **3262**/53865; seed0700
  RNG still full.
- **Omissions named:** `P`/`doputon` accessory bodies; `setworn`
  oc_oprop/extrinsic props; `dragon_armor_handling`; doff
  `oc_delay` occupation; poly/weld/trap `canwearobj` gates;
  `A` takeoffall; ring hand yn.
- **Lesson:** armor `oc_delay` is not optional for parity —
  delayed donning consumes multiple turns without further keys,
  and those turns share the selection keystroke's RNG segment.
- **Next:** `P`/`doputon` (seed0361 @ 3259 ALS) or shared
  `getbones`/`^V` / egg / seed0700 screen.

## D-0067 — `P`/`doputon` ALS put-on (seed0361)

- **Observed:** `seed0361-archeologist-tour`, first mismatch **3259**
  (`dog_move` `rn2(12)` vs JS `rn2(100)`).
- **Cause/evidence:** Session keys `Pk` after SDSM wear. C `doputon`
  → getobj → `accessory_or_armor_on` → `Amulet_on` (ALS is a no-op
  case + `on_msg`/`prinv`). JS lacked `'P'`, so `P`/`k` leaked into
  rhack. ALS puton itself emits no RNG; the turn's pet `dog_move`
  follows.
- **Rejected:** fleeck/dog_move formula as the first cause — without
  puton, keys never reached the post-puton movemon segment.
- **C locus:** `do_wear.c` `doputon`/`accessory_or_armor_on`/
  `Amulet_on`/`on_msg`; `worn.c` `setworn`; `invent.c` `prinv`;
  `objnam.c` amulet `(being worn)`; `cmd.c` `'P'`.
- **Change:** `js/do_wear.js` puton/amulet/ring-hand path;
  `js/cmd.js` `'P'`; `js/objnam.js` worn amulet/ring suffixes.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85792**/792838; seed0361 prefix
  **3259→3292** (`getbones`) positional **3295**/53865; seed0700
  RNG still full; seed0373 still `getbones` @ 2549.
- **Omissions named:** Ring_on learnring/attribs; Blindf_on
  specials; amulet change/strangle/sleep/flying/breathing bodies;
  ring Glib/cursed-gloves/welded gates; `setworn` oc_oprop;
  `dragon_armor_handling`; doff `oc_delay`; `A` takeoffall.
- **Lesson:** missing command letters look like late pet RNG gaps;
  confirm the key map (`Pk`) before peeling fleeck arity.
- **Next:** shared `getbones` (seed0361 @ 3292 / seed0373 @ 2549)
  or egg `can_be_hatched` / seed0700 screen.

## D-0068 — EGG can_be_hatched multi-retry

- **Status:** fixed
- **Observed:** seed0102 first mismatch @ **1281**: C continues
  `rndmonst_adj` `rn2(3)` (second `rndmonnum` in egg loop); JS
  `rn2(6)` after a one-shot stub. seed0361/0373 `getbones` @
  3292/2549 diagnosed as unbound `^V` → Quest `makemaz` (not a
  getbones body bug) — pivoted to egg.
- **Rejected:** getbones early-return / `flags.bones` — JS stub
  already emits `rn2(3)` when reached; tours never call `mklev`
  again without level-tele. CORPSE `G_NOCORPSE` retry — different
  peel (D-0057); egg is separate.
- **C locus:** `mkobj.c` `mksobj_init` EGG; `mon.c` `can_be_hatched`
  / `dead_species` / `BREEDER_EGG`; `mondata.c` `little_to_big` /
  `big_to_little` / `grownups`; `mondata.h` `lays_eggs` /
  `M1_OVIPAROUS`.
- **Cause:** typed-egg path must loop `can_be_hatched(rndmonnum())`
  until hatchable (or tryct); oviparous path consumes `!rn2(77)`.
  Stub broke after one `rndmonnum`.
- **Change:** `js/mon.js` `can_be_hatched`/`dead_species`;
  `js/mondata.js` grownups + growth helpers; `js/monsters.js`
  `M1_OVIPAROUS`/`lays_eggs`; `js/mkobj.js` real EGG retry loop.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **296** RNG **90837**/792838; seed0102 prefix
  **1281→4451** (`dog_goal`) positional **4459**/4485 Scr **2**/25;
  seed0700 RNG still full.
- **Omissions named:** `egg_type_from_parent`; hatch timers;
  `^V`/`level_tele`/`goto_level`/`makemaz`/`splev`.
- **Lesson:** when Notes say getbones but C never reaches `mklev`,
  check command bindings (`^V`) and special-level prerequisites
  before patching the stub that already matches.
- **Next:** seed0102 `dog_goal` @ 4451, or other shared peels;
  getbones waits on level-tele + special levels.

## D-0069 — seed0102 dog_goal udist / fireassist `f` key ownership

- **Status:** fixed
- **Observed:** seed0102 first mismatch @ **4451**: C `rn2(4)` @
  `dog_goal:575`; JS `rn2(100)` (invent `dogfood`/`obj_resists`).
- **Rejected:** APPORT/`can_carry` on LARGE_BOX; rewriting `dog_goal`
  appr; auto-submit unique `#` extcmds (broke seed0361); naïve
  `'f'`→`dofire` without fireassist (made `l` a real shot ~4442).
- **C locus:** `dothrow.c` `dofire` fireassist → `cmdq` `doswapweapon`
  + `dofire`; `wield.c` `ready_weapon`/`prinv` → `--More--` eats
  `l`/`i`; Esc ends More; swap `ECMD_TIME` then canned getdir;
  `dogmove.c` `dog_goal` `udist>1` → `rn2(4)` once hero stays put.
- **Cause:** Ranger starts with dagger wielded / bow in swap / arrows
  quivered. C `f` queues swap+retry; swap `prinv` shows
  `b - a +1 bow (weapon in right hand).--More--`; `l`/`i` bell in
  `more()`; Esc continues; turn passes; getdir then `+`/Esc cancel.
  JS treated unbound `f` as unknown then `l` as east move →
  `udist==1` → skipped `rn2(4)`.
- **Change:** `js/wield.js` `doswapweapon`/`setuswapwep`/
  `ammo_and_launcher`; `js/dothrow.js` fireassist `cmdq`;
  `js/cmd.js` `'f'`→`dofire` + canned `rhack` pop; `#name`/
  `docallcmd` stubs kept from prior peel.
- **Verification:** seed0102 RNG **4485/4485** (screen 0/25);
  green + seed1500/1800/0060 PASS + strict; full **5/44**,
  RNG **90863**/792838, screens **294**/11405.
- **Lesson:** fireassist swap More owns direction letters before
  getdir; do not bind bare `dofire` when launcher is only in
  `uswapwep`. Late `dog_goal` `udist` often means an earlier leaked
  movement key.
- **Next:** seed0102 **screen** peel (More/prinv display), or
  seed0017 @ 2775 / seed0700 screens.

## D-0070 — seed0102 map glyphs + prinv period

- **Status:** fixed
- **Observed:** seed0102 RNG full but Scr **0/25**. Persistent cells:
  kobold `?` vs C `k` (CLR_BROWN); sink `?` vs C `{` (CLR_WHITE).
- **C locus:** `defsym.h` MONSYM (`S_KOBOLD`→`'k'`); PCHAR
  (`S_sink`→`'{'` CLR_WHITE, fountain/throne/altar/grave); `invent.c`
  `prinv` → `xprname(..., dot=TRUE)` trailing period.
- **Cause:** `mon_glyph` MLET_CH covered only dog/feline/rodent/lizard/
  human → unknown mlets rendered `'?'`. `terrain_glyph` defaulted
  furniture (typ SINK=30 etc.) to `'?'`. `xprname` omitted `dot`, so
  fireassist swap More lacked `hand).--More--`.
- **Change:** `js/display.js` full MONSYM `MLET_CH` + furniture
  cases in `terrain_glyph`; `js/objnam.js` `xprname(..., dot)`;
  prinv callers in wield/do_wear/invent pass `dot=true`.
- **Verification:** seed0102 Scr **0→17**/25 (RNG still full);
  green + seed1500/1800/0060 PASS + strict; full **5/44**,
  RNG **90863**/792838, screens **311**/11405.
- **Named omission:** (retired by D-0071) Book overlay / cmdassist.
- **Next:** seed0017 @ 2775 / seed0700 screens / shared peels.

## D-0071 — seed0102 cmdassist help_dir + Book NHW_MENU offx

- **Status:** fixed
- **Observed:** seed0102 RNG full, Scr **17/25**. Scr 15: JS
  topline `cmdassist:…--More--` vs C fullscreen direction grid;
  later screens desynced because getdir **retried** after invalid
  keys and ate `\`, `^X`, etc. Scr 0: map glyphs under Book text
  (`k`, extra walls) where C blanks.
- **C locus:** `cmd.c` `getdir`/`help_dir`/`show_direction_keys`;
  `wintty.c` `tty_putstr` (`maxcol = strlen+1`),
  `tty_display_nhwindow`/`process_text_window` (NHW_MENU offx +
  leading pad); `quest.lua` legacy `output = "menu"`.
- **Cause:** (1) `getdir_cmdassist` used pline+more and looped on
  invalid keys; C shows NHW_TEXT then **returns 0** (only `?`
  retries). (2) Legacy `offx` used bare `strlen` without `+1` and
  painted text at `offx` without the leading pad space.
- **Change:** `js/dothrow.js` `help_dir`/`show_direction_keys` +
  getdir cancel-after-help / `?` retry / trailing-space prompt;
  `js/questpgr.js` `maxcol = strlen+1`, paint at `offx+1`,
  `moreCol = offx+1+8`.
- **Verification:** seed0102 **PASS** (4485/4485, 25/25) + strict;
  green + seed1500/1800/0060 PASS; full **6/44**, screens
  **320**/11405, RNG **90863**/792838.
- **Named omission:** `help_dir` Guidebook/`^letter` and nodiag
  grid-bug branch; other NHW_TEXT callers may still use wrong
  geometry.
- **Next:** seed0017 @ 2775 / seed0700 Scr 2/51 / seed2200
  `exercise`.

## D-0072 — seed0017 lookaround corridor-turn (run==1)

- **Status:** fixed
- **Observed:** seed0017 rng-diff @ **2775**: C `rn2(5)` @
  `distfleeck` vs JS `rn2(7)` @ `do_attack` (safemon bump). JS ended
  capital-`L` rush early, getch'd later keys (`j` into pet) while C
  kept running/monster phase.
- **C locus:** `hack.c` `lookaround` — STONE/IS_OBSTRUCTED are
  uninteresting (`continue`); run==1/3/8 corridor-follow updates
  `u.dx`/`u.dy` toward adjacent CORR when `corrct`/`i0` allow.
- **Cause:** JS `lookaround` called `end_running()` on
  `blocksMove(ahead)` (STONE typ=0 at dead-end). C does not stop for
  walls; it turns into the corridor. Premature run abort + Fast
  `umovement` left hero free to consume the next input mid-turn.
- **Change:** `js/cmd.js` `lookaround` — monster stop rules + run==1
  corridor-turn (`last_str_turn`, `corrct`/`i0`/`noturn`/`m0`).
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91263**/792838;
  seed0017 prefix **2775→3132** positional **3169**/3465; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** Blind early-return; traps/pools/NODIAG;
  `mon_visible`/M_AP furniture-object skip; AIR/ICE as uninteresting;
  run==2 corridor-widen stop; mention_walls plines.
- **Next:** seed0017 @ 3132 `dog_move`; seed0700 screen peel;
  seed2200 `exercise`.

## D-0073 — seed2200 `q`/`dodrink` POT_OIL (`peffect_oil`)

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2724**: C `rn2(2)` @
  `exercise(attrib.c:509)` vs JS `rn2(12)` @ `mcalcmove`. Session keys
  `q` then `h`; C screen `"That was smooth!"` / drink prompt
  `[fgh or ?*]`. JS unbound `q`, so `h` ran as west move from stairs.
- **C locus:** `potion.c` `dodrink` → `dopotion` → `peffects` →
  `peffect_oil` — uncursed unlit oil plines `"That was smooth!"` then
  `exercise(A_WIS, FALSE)` → `-rn2(2)`.
- **Cause:** no quaff path; movement key swallowed the potion letter.
- **Change:** `js/potion.js` (`dodrink`/`dopotion`/`peffect_oil` +
  drink getobj); `js/cmd.js` bind `'q'`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91220**/792838;
  seed2200 prefix **2724→2733** positional **2790**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** other `peffect_*`; Strangled; fountain/sink/
  underwater drink; milky-ghost/smoky-djinni; lit-oil burn/`likes_fire`;
  worn-stack split; `more_experienced` on discover; getobj `?`/`*` menus.
- **Next:** seed2200 @ 2733 `z`/`dozap`; seed0017 @ 3132 terrain;
  seed0700 screens.

## D-0074 — seed2200 `z`/`dozap` NODIR secret-door detect

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2733**: C `rn2(19)` @
  `exercise(attrib.c:509)` vs JS `rn2(5)` @ `distfleeck`. Session keys
  `z` then `c`; C screen `"You don't find anything."` / zap prompt
  `[c or ?*]`. JS unbound `z`, so `c` ran as SE move.
- **C locus:** `zap.c` `dozap` → `zappable` → `weffects` (always
  `exercise(A_WIS,TRUE)`) → `zapnodir` `WAN_SECRET_DOOR_DETECTION` →
  `detect.c` `findit` empty path.
- **Cause:** no zap path; movement key swallowed the wand letter.
- **Change:** `js/zap.js` (`dozap`/`zappable`/`weffects`/`zapnodir`/
  `learnwand` + zap getobj); `js/detect.js` `findit`/`findone`/
  hero-centered `do_clear_area`; `js/cmd.js` bind `'z'`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91222**/792838;
  seed2200 prefix **2733→2772** positional **2794**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** IMMEDIATE/RAY `weffects` (`bhit`/`ubuzz`/
  `zap_dig`); `zapyourself`; `backfire` body; other NODIR (light/
  create/wish/enlighten/stasis); wrest pline; `check_capacity`/
  `nohands`; `check_unpaid`; `more_experienced`; `update_inventory`;
  findone flash/mimic/hider/invis/chest-trap/trapped-door.
- **Next:** seed2200 @ 2772 `r`/`doread`; seed0017 @ 3132 terrain;
  seed0700 screens.

## D-0075 — seed2200 `r`/`doread` SCR_MAGIC_MAPPING

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2772**: C `rn2(19)` @
  `exercise(attrib.c:509)` vs JS `rn2(5)` @ `distfleeck`. Session keys
  `r` then `j`; C screen `"As you read the scroll, it disappears.  A
  map coalesces in your mind!"` / read prompt `[ijklm or ?*]`. JS
  unbound `r`, so `j` ran as south move.
- **C locus:** `read.c` `doread` → `seffects` (`exercise(A_WIS,TRUE)`
  when `oc_magic`) → `seffect_magic_mapping` → `detect.c`
  `do_mapping`/`show_map_spot` (second `exercise(A_WIS,TRUE)`).
- **Cause:** no read path; movement key swallowed the scroll letter.
- **Change:** `js/read.js` (`doread`/getobj-read/`seffects`/
  `seffect_magic_mapping`/`learnscroll`/`useup`); `js/detect.js`
  `do_mapping`/`show_map_spot`; `js/display.js`
  `magic_map_background`; `js/cmd.js` bind `'r'`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91390**/792838;
  seed2200 prefix **2772→2925** positional **2940**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** other `seffect_*`; `study_book`; fortune/shirt/
  credit/marker/coin/orb/candy; Blind Braille gates; nommap/
  Hallucination/`make_confused`; blessed-SDOOR convert edge cases;
  `notice_mon_off`/`on`; `browse_map`/unconstrain; `trycall`;
  `can_chant`; `check_capacity`; `room_discovered`; trap/engraving
  restore after furniture in `show_map_spot`; SPE_MAGIC_MAPPING.
- **Next:** seed2200 @ 2925 `E`/`doengrave`; seed0017 @ 3132 terrain;
  seed0700 screens.

## D-0076 — seed2200 `E`/`doengrave` fingertip Elbereth

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2925**: C `rn2(25)` @
  `doengrave(engrave.c:1223)` vs JS `rn2(5)`. Session keys `E` `-`
  (More) `Elbereth` Enter; C screen `"What do you want to write with?
  [- acden or ?*]`" then dust fingertip + getlin.
- **C locus:** `engrave.c` `doengrave` (DUST mix-up `!rn2(25)` per
  non-space) → `set_occupation(engrave)` → `make_engr_at` Elbereth
  `exercise(A_WIS,TRUE)`; `allmain.c` runs occupation before next
  `rhack`.
- **Cause:** `'E'` unbound → Unknown / movement; no engraving path.
- **Change:** `js/engrave.js` (`doengrave`/getobj-stylus/`make_engr_at`/
  occupation); `js/cmd.js` bind `'E'`; `js/allmain.js` occupation tick
  before `rhack`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **318**/11405, RNG **91443**/792838;
  seed2200 prefix **2925→2979** positional **2993**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** wand/weapon/marker/towel/gem/ring stylus sfx;
  grave/altar/jello/swallow; add-to/overwrite yn; multi-turn dulling;
  del_engr/rloc beyond replace; engraving glyphs in `newsym`;
  `u_wipe_engr` body; livelog; demon/vampire blood default.
- **Next:** seed2200 post-Elbereth 0-RNG `/` UI then Lua shuffle @
  2979; seed0017 @ 3132 terrain; seed0700 screens.

## D-0077 — seed2200 `/` whatis + `?` help / `get_lua_version`

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2979**: C `rn2(3)` @ nhlib
  `shuffle(align)` vs JS `rn2(5)` @ `distfleeck`. C emits no RNG from
  post-Elbereth through step 108; step 109 `?`/`a` About triggers Lua.
- **C locus:** `pager.c` `dowhatis`/`do_look`/`dohelp`; `getpos.c`
  `getpos` + `handle_tip(TIP_GETPOS)`; `version.c` `doextversion` →
  `get_lua_version` (`nhlua.c`) → `nhl_init` loads `nhlib.lua`
  `shuffle(align)`.
- **Cause:** `'/'`/`'?'` unbound → Unknown; following `.`/`hjkl` were
  timed `donull`/moves before C's 0-RNG UI finished.
- **Change:** `js/pager.js` (`do_look`/`dowhatis`/`dohelp`/`checkfile`/
  `doextversion`); `js/getpos.js`; `js/cmd.js` bind `'/'`/`'?'`;
  `invent_lines` export for invent-pick whatis.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **318**/11405, RNG **91280**/792838;
  seed2200 RNG **3018**/3018 Scr **1**/230; seed0700 RNG still full
  Scr **2**/51.
- **Named omission:** full `do_screen_description` glyph encyclopedia;
  tty NHW_TEXT geometry for help/`checkfile` pages; `whatdoes`
  keyhelp body beyond stub; `dokeylist`/`domenucontrols`/`option_help`
  /contact; PORT_HELP; getpos menu-jump/hilite/valids; lootabc true
  accelerators.
- **Next:** seed2200 screen peel / seed0017 @ 3132 terrain /
  seed0700 screens.

## D-0078 — H2344 NHW_MENU offx + botl get_strength_str

- **Status:** fixed
- **Observed:** seed0700 Scr **2**/51 with RNG full. First screen:
  Book of Amaterasu left-aligned (JS) vs pad-8 corner (C); botl
  `St:19` vs C `St:18/01`.
- **C locus:** `win/tty/wintty.c` `#define H2344_BROKEN` +
  `tty_display_nhwindow` NHW_MENU offx =
  `min(min(82, cols/2), cols-maxcol-1)` (fullscreen only when
  `maxrow>=rows || !menu_overlay`); `botl.c` `get_strength_str`.
- **Cause:** JS used stock `max(10, cols-maxcol-1)` then
  `offx==10 → fullscreen`, so long Amaterasu lines collapsed to
  col 0. Botl printed raw `acurr.a[A_STR]` (19) instead of
  `18/01`.
- **Change:** `js/questpgr.js` + `js/invent.js` `nhw_menu_geometry`
  H2344 offx; `js/attrib.js` `get_strength_str`; wired into
  `display.js` / `invent.js` / `questpgr.js` status lines.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **318→361**/11405, RNG **91280**/792838;
  seed0700 Scr **2→44**/51; seed2200 still Scr **1**/230.
- **Named omission:** Samurai starting-pet christen (`Hachi`);
  invent Weapons header still ~2 cols left on Japanese-name
  invent; display-path Japanese disco names; seed2200 map
  `` ` `` vs ASCII `x`.
- **Next:** seed0700 pet `Hachi` / invent offx / Japanese disco;
  or seed2200 map cell; or seed0017 @ 3132 terrain.

## D-0079 — seed0700 Samurai Hachi + Japanese invent/disco

- **Status:** fixed
- **Observed:** seed0700 Scr **44**/51 (RNG full). Swap pline
  "your little dog" vs C "Hachi"; invent English short sword /
  yas / missing rustproof + 2-col offx; disco missing
  `shito`/`wakizashi`/`ninja-to` bracket lines.
- **C locus:** `dog.c` `makedog` + `do_name.c` `christen_monst` /
  `x_monnam`; `hack.c` `domove_swap_with_pet`; `objnam.c`
  Japanese/`makeplural` ya / quiver / `add_erosion_words`;
  `mkobj.c` lacquered Samurai `SPLINT_MAIL`; `o_init.c`
  `interesting_to_discover` / `disco_typename` / `discover_object`
  Samurai gate + `observe_object`.
- **Cause:** starting pet never christened; invent/disco lacked
  Japanese display path; lacquer `oerodeproof` absent; invent
  never called `observe_object` so wakizashi stayed `*`.
- **Change:** `js/dog.js` role petnames + `christen_monst`;
  `js/do_name.js` christen + `x_monnam_tame`; `js/cmd.js` swap
  pline; `js/objnam.js` Japanese/`ya`/quiver/rustproof/
  `disco_typename`; `js/mkobj.js` lacquer; `js/invent.js`
  Samurai disco + `observe_object` in `invent_lines`.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **361→370**/11405, RNG
  **91280→91380**/792838; seed0700 **PASS** (51/51).
- **Named omission:** full `x_monnam` (hallu/invis/saddle/shk);
  pony saddle/`see_monster_closeup`; other erosion proofs;
  `In_quest` lacquer path; xname-path `observe_object` beyond
  invent_lines.
- **Next:** seed2200 map cell / seed0017 @ 3132 terrain /
  seed1150 `dog_move` / seed0016 `next_ident`.

## D-0080 — seed2200 STATUE map glyph (not ROCK_CLASS)

- **Status:** fixed
- **Observed:** seed2200 Scr **1**/230 (RNG full). First cell
  (16,11): C ASCII `x` CLR_WHITE vs JS ROCK_CLASS `` ` ``.
  Session has a floor STATUE of grid bug (`corpsenm` PM_GRID_BUG,
  mlet `S_XAN`).
- **C locus:** `display.h` `obj_to_glyph` → `statue_to_glyph`;
  `display.c` mapglyph statue branch uses `mons[offset].mlet` +
  `obj_color(STATUE)` (CLR_WHITE), not `S_rock`/ROCK_CLASS.
- **Cause:** JS `obj_glyph` always used `DEF_OC_SYM[ROCK_CLASS]`
  for statues; C since 3.6 shows the depicted monster letter.
- **Change:** `js/display.js` `obj_glyph` STATUE → `MLET_CH[mlet]`
  + statue `oc_color` (omit hallu/`random_monster` statue path).
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **370→380**/11405, RNG
  **91380**/792838; seed2200 Scr **1→11**/230.
- **Named omission:** hallucination statue `random_monster`;
  pile-top statue glyph flags; gender FEM statue offset.
- **Next:** seed2200 @ screen 10 whatis/overlay (room `·` vs
  gray blank) / seed0017 @ 3132 terrain / seed1150 `dog_move`.

## D-0081 — seed2200 magic_map dark_room floors

- **Status:** fixed
- **Observed:** seed2200 Scr **11**/230 (RNG full). Screen 10 after
  `r`+`j` SCR_MAGIC_MAPPING: 118 cells — C DEC floor `~`/NO_COLOR
  vs JS blank/`CLR_GRAY` in distant rooms (not hero room).
- **C locus:** `display.c` `magic_map_background`;
  `reglyph_darkroom` (`showsyms[S_darkroom]=showsyms[S_room]`);
  `detect.c` `show_map_spot`/`do_mapping`.
- **Cause:** JS always rewrote out-of-sight `!waslit` ROOM floors to
  GLYPH_NOTHING blank. C with default `dark_room`+color uses
  `DARKROOMSYM`, which paints as the room-floor glyph.
- **Falsified:** whatis/NHW overlay clear painting blanks over map
  (screen 10 is post-mapping before `/`).
- **Change:** `js/display.js` `magic_map_background` — blank only when
  `!(dark_room && use_color)`; else keep floor ·/NO_COLOR.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **380→458**/11405, RNG
  **91380**/792838; seed2200 Scr **11→89**/230.
- **Named omission:** `newsym` still omits `waslit=(lit!=0)` on
  cansee; full S_darkroom/CLR_BLACK vs showsym equate.
- **Next:** seed2200 getpos tip @ screen 36 / seed0017 @ 3132
  terrain / seed1150 `dog_move`.

## D-0082 — seed2200 getpos tip NHW_MENU corner

- **Status:** fixed
- **Observed:** seed2200 Scr **89**/230 (RNG full). Screen 36 tip:
  C text at col ~10 over intact map, cursor `[16,8]`; JS blanked
  rows 0–20, painted at col 0, cursor `[5,8]`.
- **C locus:** `dat/nhcore.lua` `show_getpos_tip` → `nhlua.c`
  `nhl_text` → `create_nhwindow(NHW_MENU)` + `select_menu`
  PICK_NONE; `wintty.c` H2344 corner
  `offx = min(min(82,cols/2), cols-maxcol-1)` (maxcol = strlen+2;
  morestr `"(end) "`).
- **Cause:** JS `show_getpos_tip` invented a fullscreen blank +
  col-0 paint; C uses the same corner NHW_MENU path as invent
  (`paint_corner_nhw_menu`). Longest tip line 68 → maxcol 70 →
  offx 9 → cursor col 16.
- **Change:** `js/getpos.js` `show_getpos_tip` →
  `paint_corner_nhw_menu(lines, '(end) ')`.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **458→459**/11405, RNG
  **91380**/792838; seed2200 Scr **89→90**/230.
- **Named omission:** getpos menu-jump/hilite/valids; farlook
  autodescribe still uses `dfeature_at`/`stairs_description`
  instead of cmap `lookat` (`S_brupstair`).
- **Next:** seed2200 farlook stairs @ screen 46 / seed0017 @ 3132
  terrain / seed1150 `dog_move`.

## D-0083 — seed2200 farlook stairs lookat + getpos cursor

- **Status:** fixed
- **Observed:** seed2200 Scr **90**/230 (RNG full). Screen 46 tip:
  C `"branch staircase up"` cursor `[21,10]`; JS
  `stairs_description` Dlvl1 text and/or cursor stuck at hero
  `[22,10]`.
- **C locus:** `pager.c` `lookat` cmap default →
  `defsyms[S_brupstair].explanation`; `display.c` `back_to_glyph`
  STAIRS when `known_branch_stairs`; `getpos.c` `auto_describe`
  prints **firstmatch** after lookat (not full out_str /
  `dfeature_at`); `curs(WIN_MAP)` **after** message paint.
- **Cause:** (1) farlook tip used `dfeature_at` →
  `stairs_description` ("… out of the dungeon") instead of cmap
  explanation; (2) `flush_screen`/`_buildScreenOutput` reset
  cursor to hero after getpos `setCursor`, undoing map cursor
  before `nhgetch` capture.
- **Change:** `js/pager.js` stair/wall/floor/self `lookat` subset +
  DECgraphics floor/corridor `do_screen_description` envelope;
  export `known_branch_stairs`; `js/getpos.js` set cursor after
  flush; `js/display.js` `more()` word-wrap only when len≥CO.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **459→478**/11405, RNG
  **91380**/792838; seed2200 Scr **90→109**/230.
- **Named omission:** full showsyms-driven cmap scan (ASCII
  ladder/`#` sets); getpos rush/run (D-0084).
- **Next:** seed2200 @ screen 65 getpos continue / seed0017 @ 3132
  terrain / seed1150 `dog_move`.

## D-0084 — seed2200 getpos capital rush (HJKLYUBN)

- **Status:** fixed
- **Observed:** seed2200 Scr **109**/230 (RNG full). Screen 65 key
  `"H"`: C cursor `[17,13]` `"floor of a room"`; JS stayed at
  `[25,13]` `"corridor"` (ignored uppercase).
- **C locus:** `getpos.c` `getpos` — `movecmd(c, MV_WALK)` one step;
  `movecmd(c, MV_RUN)` via `highc(dirchars)` / `MV_RUSH` via
  `C(dirchars)` → `dx = 8 * u.dx` when `!iflags.getloc_moveskip`,
  then `truncate_to_map`.
- **Cause:** JS DIR map was lowercase-only; capital `H` fell through
  as no-op, so continued getpos never reached the room floor cell.
- **Change:** `js/getpos.js` — `truncate_to_map`; `HJKLYUBN` and
  Ctrl-dir rush/run 8× step (moveskip Off path).
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **478→482**/11405, RNG
  **91380**/792838; seed2200 Scr **109→113**/230.
- **Named omission:** `getloc_moveskip` glyph-skip loop; menu jump /
  hilite / valids.
- **Next:** seed2200 @ screen 80 checkfile pager cursor /
  seed0017 @ 3132 terrain / seed1150 `dog_move`.

## D-0085 — seed2200 checkfile NHW_MENU process_text_window

- **Status:** fixed
- **Observed:** seed2200 Scr **113**/230 (RNG full). Screen 80 after
  `/`→`?` getlin `"fountain"` → `checkfile`: C cursor `[36,15]`
  corner overlay; JS fullscreen TEXT cursor `[8,15]` then (with
  corner attempt) `[35,15]` from trailing `\r` inflating maxcol.
- **C locus:** `pager.c` `checkfile` — `create_nhwindow(NHW_MENU)` +
  `putstr` + `display_nhwindow` → `wintty.c` `process_text_window`
  (H2344 offx, leading pad, dmore `--More--`); `hacklib.c`
  `tabexpand` after one leading tab on body lines.
- **Cause:** JS used fullscreen `show_text_pages` (NHW_TEXT-ish
  clearScreen); data.base `\r` left in lines shifted offx left by 1.
- **Change:** `js/pager.js` `show_nhw_menu_text` + CR-normalize
  `readDat` + tabexpand in `lookup_data_base`; `checkfile` calls
  NHW_MENU path.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **482→486**/11405 (with D-0086),
  RNG **91380**/792838; seed2200 Scr **113→117**/230.
- **Named omission:** tall checkfile fullscreen paging edge cases;
  `display_file` still NHW_TEXT-ish `show_text_pages`.
- **Next:** seed2200 look_all `m` @ screen 87 / seed0017 terrain /
  seed1150.

## D-0086 — seed2200 doname xname SCR/SPE/RIN/WAN + bimanual hands

- **Status:** fixed
- **Observed:** seed2200 invent pick (`/`→`i`): C
  `scroll/spellbook/ring/wand of …`, `(weapon in hands)`; JS
  `scr`/`spe`/`rin`/`wan` tokens and `(weapon in right hand)`.
- **C locus:** `objnam.c` `xname` SCROLL/SPBOOK/RING/WAND;
  `doname` W_WEP + `bimanual` (`obj.h` → `oc_bimanual`/`oc_big`);
  `objects.h` WEAPON `bi` bit.
- **Cause:** `pretty_base` lowercased enum tokens; W_WEP ignored
  bimanual; extractor omitted `oc_big`.
- **Change:** `scripts/extract-objects.py` + regenerate
  `oc_big`; `js/objnam.js` xname class prefixes + `bimanual` →
  `(weapon in hands)`.
- **Verification:** with D-0085; invent screen 83 matches; seed2200
  Scr **117**/230; green cohort PASS.
- **Named omission:** unlabeled/called/descr paths; ammo/missile
  `(wielded)` phrasing; tethered aklys; glow/artifact_light paren
  overwrite.
- **Next:** seed2200 look_all `m` @ screen 87 / seed0017 terrain /
  seed1150.

## D-0087 — seed2200 look_all / look_engrs NHW_TEXT

- **Status:** fixed
- **Observed:** seed2200 `/`→`m` screen 87: C cursor `[8,23]` and
  lines ` <23,9>   @  human wizard…` / ` <20,10>  f  tame kitten`;
  JS `--More--` on row 4, bare `    human wizard` / `tame monster`.
  Nearby objects listed every floor pile; C only glyph-shown.
- **C locus:** `pager.c` `look_all`/`look_engrs`/`self_lookat`/
  `look_at_monster`; `wintty.c` `tty_display_nhwindow(NHW_TEXT)` +
  `process_text_window` (more on `rows-1`); `getpos.c` `coord_desc`;
  `objnam.c` STATUE xname; `display.c` `newsym`/`glyph_at`.
- **Cause:** `show_text_pages` put `--More--` after content; look_all
  skipped coords/glyph and used `data.mname` + `loc.objects` instead
  of `data.name` + currently-shown (`cansee`/`mon_visible`) filter;
  STATUE pretty_base omitted corpsenm; look_engrs stringified
  `engr_txt` object.
- **Change:** NHW_TEXT `--More--` on row 23; look_all MAP prefixes +
  `look_shown_at`; statue `of a <pm>`; look_engrs remembered/
  obscured-by format + S_engroom `` ` ``.
- **Verification:** seed2200 Scr **117→167**/230; green + cohort
  PASS + strict; full **7/44**, screens **486→536**/11405, RNG
  **91379**/792838.
- **Named omission:** invis/warning glyphs; `object_from_map` fakeobj;
  compass/screen coord modes; look_traps format; `display_file`
  license page (seed2200 @ 110); S_engrcorr/grave headstone.
- **Next:** seed2200 `display_file`/license @ screen 110 /
  seed0017 terrain / seed1150.

## D-0088 — seed2200 doextversion runtime options / Lua license

- **Status:** fixed
- **Observed:** seed2200 Scr 167/230; first miss screen 109 — C has
  full options wrap through `browser…5.0.0 only`, windowing/soundlib/
  Lua copyright, then page 2 Permission block; JS truncated at
  `prefix, Lua interpreter version: 5.4` and mis-indented license.
- **C locus:** `version.c` `doextversion` OPTIONS_AT_RUNTIME +
  `mdlib.c` `build_options` / `do_runtime_info` / `lua_info[]`;
  outdented headers insert blank separators.
- **Change:** `doextversion_runtime_lines()` matching contest MacOS
  tty/nosound feature set + 5-space Permission continuation.
- **Verification:** with D-0089/D-0090; seed2200 Scr **167→176**/230.

## D-0089 — NHW_TEXT dmore quitchars

- **Status:** fixed
- **Observed:** history page at Benson: C stays for keys `?`/`e` then
  ESC; JS advanced on any key into Bill Dyer pages C never shows.
- **C locus:** `wintty.c` `dmore` → `getline.c` `xwaitforspace(quitchars)`
  with `quitchars=" \\r\\n\\033"` (`decl.c`); ESC → WIN_CANCELLED.
- **Change:** `text_page_wait()` / `show_text_pages` only accept
  space/CR/LF/ESC; other keys stay on page (capture boundaries kept).
- **Verification:** history pages through ESC match; green cohort PASS.

## D-0090 — seed2200 dowhatdoes

- **Status:** fixed
- **Observed:** after history, help `f`: C `Ask about…--More--` then
  `What command?` then `i       show your inventory (#inventory).`;
  JS stub dumped full keyhelp as NHW_TEXT.
- **C locus:** `pager.c` `dowhatdoes` / `dowhatdoes_core` /
  `whatdoes_help`; `cmd.c` `key2extcmddesc` / `key2txt`.
- **Change:** tip-once + more; yn-style prompt; `key2extcmddesc` for
  rhack-bound letters; `&`/`?` → stripped KEYHELP pages.
- **Verification:** seed2200 Scr **167→176**/230 (prefix through 157);
  green + cohort PASS + strict; full **7/44**, screens
  **536→545**/11405, RNG **91371**/792838.
- **Named omission:** full `key2extcmddesc` misc_keys/number_pad/
  rush-run; dokeylist; contact; cmdhelp `&?` conditionals (#if 0 in C).
- **Next:** seed2200 `option_help` @ screen 158 / seed0017 terrain /
  seed1150.

## D-0091 — seed2200 option_help

- **Status:** fixed (RC path harness-only residual)
- **Observed:** help `g` showed `(option help stub)`; C `option_help`
  NHW_TEXT lists booleans/compounds/others + epilog (screens 158–165).
- **C locus:** `options.c` `option_help` / `next_opt`; `optlist.h`
  `allopt[]`; `cfgfiles.c` `get_configfile`; tty wrap for long
  OPTIONS= intro. Contest flags: ALTMETA/CRASHREPORT/PREV_MSGS;
  no SCORE_ON_BOTL/TIMED_DELAY; tty WC/WC2 subset.
- **Change:** `scripts/extract-optlist.py` → `js/generated/optlist_data.js`;
  `option_help_lines()` + `next_opt` packing; help `g` →
  `show_text_pages`. Over-long `%-20s` compounds render unpadded to
  fit CO (glyph / whatis_filter). Wrap-forcing synthetic config path
  (not recording `$HOME`).
- **Verification:** seed2200 Scr **176→199**/230 (158 path cells only
  remaining option_help miss); green + cohort PASS + strict; full
  **7/44**, screens **545→568**/11405, RNG **91371**/792838.
- **Named omission:** recording-machine `get_configfile()` absolute
  path (`verify-rerecord` elides; do not hardcode); dokeylist;
  contact; full `doset`/`O` menu.
- **Next:** seed0017 @ 3132 terrain / seed1150 `dog_move` / seed2200
  post-help after accepting path residual.

## D-0092 — `in_mk_themerooms` for themerms `check_room`

- **Status:** fixed (seed0017 peel unchanged)
- **Observed:** seed0017 @ **3132**: C 3× `rn2(12)` @ `dog_move` vs JS
  2× then `rn2(5)` `distfleeck`. Pet (30,5) `mfndpos` cnt=4; missing
  walkable `(30,4)` (JS VWALL). C DEC screen: east door col **35**,
  fountain **31**, floor at **(30,4)** (DEC `~`≡room floor / possible
  D_NODOOR). JS room `lx=31,hx=35`, east door **36**, fountain **32**.
- **C locus:** `mklev.c` `makerooms` sets `gi.in_mk_themerooms` around
  Lua `themerooms_generate`; `sp_lev.c` `check_room` returns FALSE on
  non-STONE when `in_mk_themerooms` (no shrink).
- **Change:** `js/mklev.js` `themerooms_generate` toggles
  `game.in_mk_themerooms` for the call (was never set → JS could shrink
  where C aborts).
- **Verification:** green + cohort PASS + strict; full **7/44**,
  screens **568**/11405, RNG **91371**/792838. seed0017 still prefix
  **3132** — this flag alone is not the (30,4) cause for this seed.
- **Rejected:** “pool at (30,4)” — DEC `~` is floor. “mtrack/nxti” —
  inactive (`distminU=3`).
- **Next:** compare first-room `dx`/`xabs` / `split_rects` vs C map
  east-door x; or seed1150 @ 3032 `throw_obj`.

## D-0093 — getdir flush `--More--` + throw_obj multishot

- **Status:** fixed
- **Observed:** seed1150 @ **3032**: C `rnd(2)` @ `throw_obj` vs JS
  `rn2(5)` `distfleeck`. C sequence: fireassist swap `--More--`s,
  pet-drop `--More--`, getdir, `l` → “You shoot 2 flint stones.”
  JS skipped `more()` before getdir so the pet-drop space cancelled
  getdir and `l` walked.
- **C locus:** `cmd.c` `yn_function`/`tty_yn_function` (more when
  `TOPLINE_NEED_MORE`); `dothrow.c` `throw_obj` multishot +
  `multishot_class_bonus` (PM_CAVE_DWELLER −P_SLING/P_SPEAR).
- **Change:** `js/dothrow.js` `getdir_cmdassist` → `flush_topl_more()`
  before prompt; `throw_obj` ports volley calc + class bonus +
  `rnd(multishot)` + shoot pline.
- **Verification:** green + cohort PASS + strict; seed1800 PASS;
  seed1150 prefix **3032→3042** (rng-diff), positional **3070**/3137
  Scr **22**/51; full **7/44**, screens **568**/11405, RNG
  **91398**/792838.
- **Rejected:** “seed0017 room x-shift” — display `setCell(x-1)`;
  C screen fountain col 31 ≡ JS map x 32. seed0017 still @ 3132
  (`mfndpos` cnt).
- **Named omission:** full `xname`/`singular` for volley pline
  (doname stand-in); ACURRSTR crossbow gate; quest-artifact launcher
  bonus; `weapon_skills` init beyond defaults.
- **Next:** seed1150 @ 3042 extra `obj_resists` before `dog_move`;
  seed0017 mfndpos neighbour; seed2200 post-help.

## D-0094 — throw landing must `stackobj`

- **Status:** fixed
- **Observed:** seed1150 @ **3042**: C `rn2(12)` @ `dog_move` vs JS
  extra `rn2(100)` `obj_resists`. After sling volley of 2 flints,
  JS `dog_goal` `dogfood`'d two separate `fobj` FLINT nodes at
  `(51,14)` plus food + 2 golds (5 rolls); C merged the flints so
  only 4 `obj_resists` then selection RNG.
- **C locus:** `invent.c` `stackobj`/`merged`/`mergable`;
  `dothrow.c` `throwit` calls `stackobj` after `place_object`.
- **Cause:** JS `throwit` placed without merge; `dog_goal` walks
  `fobj` and always `dogfood`s in-bbox objects.
- **Change:** `js/mkobj.js` floor `mergable`/`merged`/`stackobj`
  (oc_merge approximated until extractor emits it); `throwit`,
  pet `mdrop_obj`, and trap miss-path call `stackobj`.
- **Verification:** green + cohort PASS + strict; seed1150
  **rng-diff OK** (3137/3137) Scr **22**/51 + strict lengths;
  full **7/44**, screens **568**/11405, RNG **91465**/792838.
- **Named omission:** `objects[].oc_merge` not in extractor (class
  heuristic + boulder/statue/boomerang denylist); full `mergable`
  shop/mail/globby/candle/erosion arms deferred.
- **Next:** seed1150 screen peel (Scr 22/51) / seed0017 @ 3132
  `mfndpos` / seed2200 post-help.

## D-0095 — seed1150 look_here + Monnam MGIVENNAME

- **Observed:** seed1150 Scr **22**/51 (RNG full): screen 6 C topline
  `"You see here a food ration."` vs JS blank; then pet plines
  `"The little dog picks/drops…"` vs C `"Slasher …"`.
- **C locus:** `hack.c` `spoteffects` → `pickup.c` `pickup`/
  `check_here` → `invent.c` `look_here`; `do_name.c` `Monnam`/
  `mon_nam` / `x_monnam` `MGIVENNAME` → `ARTICLE_NONE`.
- **Cause:** (1) JS `domove` never called `spoteffects`; with
  `!autopickup`, C always `check_here`→`look_here` on floor objects.
  (2) Caveman pet already christened `Slasher`, but dogmove `Monnam`
  hard-coded `"The <type>"`.
- **Change:** `js/pickup.js` `check_here`/`pickup`/`spoteffects`;
  `cmd.js` `domove` → `spoteffects(true)` after move; `do_name.js`
  export `Monnam`/`noit_Monnam`; dogmove imports them.
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700 PASS; seed1150 Scr **22→27**/51 RNG full; full **7/44**,
  screens **568→574**/11405, RNG **91465→91471**/792838.
- **Named omission:** autopick body / `,` menus; `mention_decor`/
  `describe_decor`; pool/trap/sink arms of `spoteffects`; full
  `x_monnam` hallu/invis/saddle/priest/shk.
- **Rejected:** forcing corridor `#` to `NO_COLOR` under
  `lit_corridor` (raises seed1150 Scr, drops seed0900 to 12/84).
- **Next:** seed1150 corridor `#` color (C 8 vs JS 15) without
  regressing seed0900; or seed0017 mfndpos / invent Scr 38+.

## D-0096 — out-of-sight lit corridor → dark corr

- **Symptom:** seed1150 Scr **27**/51: `#` CLR_WHITE(15) vs C
  NO_COLOR(8) at out-of-sight unlit CORR; seed0900 needs visible
  lit-corridor white.
- **C locus:** `display.c` `newsym` (`waslit=(lit!=0)`; `!cansee`
  remap `S_litcorr`→`S_corr` when `!waslit` or dark_room+color);
  `back_to_glyph` / `reset_glyphmap` (shared `#` → CLR_WHITE for
  litcorr; S_corr CLR_GRAY → tty NO_COLOR).
- **Cause:** JS kept remembered `S_litcorr`/CLR_WHITE when leaving
  sight; never set `waslit` on cansee. Blind “always NO_COLOR” is
  wrong — visible `lit_corridor` must stay white (seed0900).
- **Change:** `js/display.js` `newsym` sets `waslit`; `!cansee`
  remaps remembered lit `#`→NO_COLOR; `terrain_glyph` uses
  `waslit||lit_corridor`.
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700 PASS; seed1150 Scr **27→46**/51 RNG full; full **7/44**,
  screens **574→593**/11405, RNG **91471**/792838.
- **Named omission:** `newsym` ROOM→DARKROOMSYM memory arm;
  engraving/trap glyphs; hallu/`see_objects`.
- **Next:** seed1150 invent/UI @ screen 38 / seed0017 mfndpos /
  seed2200 post-help.

## D-0097 — GemStone xname + throw volley + ^X gender/MC

- **Symptom:** seed1150 Scr **46**/51 @ screen 38: JS
  `"You shoot 2 15 uncursed flints (in quiver pouch)."` vs C
  `"You shoot 2 flint stones."`; then ^X `"male human Caveman"` vs
  `"human Caveman"` and missing Attributes `"You are warded."`.
- **C locus:** `objnam.c` `GemStone` / `xname_flags` GEM_CLASS;
  `dothrow.c` `throw_obj` `You("%s %d %s.", … xname/singular)`;
  `insight.c` background gender omit when `urole.name.f`; 
  `attributes_enlightenment` `magic_negation` → warded/guarded/
  protected; `mhitu.c` `magic_negation` worn `a_can`.
- **Cause:** JS volley used `doname`; `pretty_base` omitted
  `" stone"`; ^X always printed gender; MC line absent / wrong
  section (Status vs Attributes).
- **Change:** `js/objnam.js` GemStone + GEM_CLASS `xname`/`singular`;
  `js/dothrow.js` volley uses `xname`; `js/invent.js` distinct-`name.f`
  gender omit + Attributes `magic_negation` (`oc_level` as `a_can`).
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700 PASS; seed1150 **PASS**; full **8/44**, screens
  **593→598**/11405, RNG **91471**/792838.
- **Named omission:** full `magic_negation` Protection/amulet bumps;
  roles.js `name.f=null` where C has 0 (still same-string proxy);
  full `xname` GEM unknown/called paths; armor pair-of in
  `obj_typename`.
- **Next:** seed0017 @ 3132 mfndpos / seed2200 Scr 199 / getbones.

## D-0098 — dog_move mtrack uses C `goto nxti`

- **Status:** fixed
- **Observed:** JS `dog_move` mtrack backtrack `continue` only advanced
  the inner `mtrack[]` loop; C `goto nxti` skips the candidate.
- **C locus:** `dogmove.c` `dog_move` mtrack loop → `goto nxti`.
- **Change:** `js/dogmove.js` labeled `candloop` + `continue candloop`
  when `rn2(MTSZ*(k-j))` says skip.
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700/1150 PASS; full **8/44**, screens **598**/11405, RNG
  **91410**/792838. seed0017 still @ **3132** (`distminU=3`, mtrack
  inactive on that peel).
- **Next:** seed0017 (30,4) terrain (D-0099).

## D-0099 — seed0017 dog_goal gettrack (!couldsee)

- **Status:** fixed
- **Observed:** seed0017 @ **3132**: C 3× `rn2(12)` @ `dog_move` vs JS
  2× then `rn2(5)` `distfleeck`. Pet **(30,5)** DOOR, hero **(29,8)**,
  `mfndpos` cnt=4 same cells as JS.
- **C recorder dump (after mklev):** `levl[30][4].typ=VWALL` — same as
  JS. Terrain-writer theory **falsified**.
- **C dump at peel (cc≈3130):** `couldsee(pet)=0`, `gg=(29,5)`,
  `gtyp=UNDEF`. After closer pick `(29,5)` updates `nidist`, former
  equal-distance `(29,6)` becomes farther → **3×** `rn2(12)`.
- **C locus:** `dogmove.c` `dog_goal` — when goal is hero and
  `!in_masters_sight`, `gettrack(omx,omy)` redirects `gg`; `track.c`
  `settrack` each new turn.
- **Cause:** JS `dog_goal` omitted the gettrack/ogoal/FARAWAY block;
  `track.c` was unported, so even with correct `couldsee` the goal
  stayed at the hero → only 2 farther cells.
- **Change:** `js/track.js` (`initrack`/`settrack`/`gettrack`);
  `allmain` calls `settrack` before `moves++`; `dog_goal` ports
  gettrack/ogoal (wantdoor `view_from` do_clear_area omitted → hero
  fallback).
- **Rejected:** missing walkable (30,4); room x-shift; wallification;
  mfndpos probe “extra neighbour” as the C map state.
- **Verification:** seed0017 prefix **3132→3327** (`prayer_done`);
  green+strict PASS; cohort seed1500/1800/0060/0102/0700/1150 PASS;
  full **8/44** Scr **598** RNG **91540**.
- **Next:** seed0017 @ 3327 `prayer_done` / `#pray`.

## D-0100 — post-fill full-map wallification

- **Status:** fixed (seed0017 peel unchanged)
- **Observed:** C `themerooms_post_level_generate` ends with
  `wallification(1,0,COLNO-1,ROWNO-1)` after Lua `post_level_generate`;
  JS `makelevel` omitted that call (Lua postprocess empty for default).
- **C locus:** `mklev.c` `themerooms_post_level_generate`
- **Change:** `js/mklev.js` `makelevel` calls `wallification` after
  special-room fill (no Lua postprocess queue yet — named omission).
- **Verification:** green+strict PASS; cohort seed1500/1800/0060/0102/
  0700/1150 PASS; full **8/44** Scr **598** RNG **91410**; seed0017
  still **3132** — wallification is not the (30,4) writer.
- **Next:** seed0017 @ 3327 `prayer_done` (D-0099 gettrack cleared 3132).

## D-0101 — seed0017 `#pray` / `prayer_done` / `angrygods`

- **Status:** fixed
- **Observed:** seed0017 @ **3327**: C `rn2(1000)` @ `prayer_done`
  (`rnz(250)`) vs JS missing. Moves `#pray\n` after altar approach.
- **C locus:** `pray.c` `dopray` / `can_pray` / `prayer_done` /
  `gods_upset` / `angrygods` / `godvoice`; `cmd.c` `doextcmd` returns
  callee `ECMD_*`.
- **Cause:** JS had no `#pray` extcmd and no `pray.js`. With
  `ublesscnt=300`, `can_pray` sets `p_type=0` (too soon) even on a
  coaligned altar → `prayer_done` does `rnz(250)` + `change_luck(-3)`
  + `gods_upset` → `angrygods`. Samurai `initrecord>=STRIDENT` +
  Luck=-3 → `maxanger=4`; case 0 displeased then `rnz(300)`.
- **Change:** new `js/pray.js` (`can_pray`/`dopray`/`prayer_done`/
  `water_prayer`/`gods_upset`/`angrygods` cases 0–3/`godvoice`);
  `getline.js` `#pray`; `doextcmd` returns ECMD; `cmd.js` `#` keeps
  `move` on `ECMD_TIME`.
- **Verification:** seed0017 RNG **3465**/3465 Scr **2**/67; seed0106
  prefix **→2639** (`do_attack`); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150 PASS; full **8/44** Scr **599** RNG
  **91965**.
- **Next:** seed0017 Scr (legacy/Book) / seed2200 Scr 199 / seed0106
  @ 2639 `do_attack`.

## D-0102 — askname splash + ParanoidPray yn

- **Status:** fixed
- **Observed:** seed0017 Scr **2**/67 with full RNG. Screen 0 C is
  copyright + `Who are you?` (no `OPTIONS=name`); JS skipped to Book.
  After askname, Scr **66**/67 — residual idx 46 C
  `Are you sure you want to pray? [yn] (n)` vs JS already on prayer
  `--More--` (ParanoidPray omitted).
- **C locus:** `wintty.c` `tty_init_nhwindows` / `tty_askname`;
  `role.c` `plnamesuffix`; `options.c` default
  `paranoia_bits = PARANOID_PRAY|…`; `pray.c` `dopray`;
  `topl.c` `tty_yn_function`; `cmd.c` `paranoid_query`.
- **Cause:** (1) JS invented `plname='Hero'` when rc omitted name, so
  typed `Akira` keys were eaten by Book's non-quitchar loop. (2)
  Default `PARANOID_PRAY` requires yn before prayer; JS skipped it so
  the confirm key only shifted one screen.
- **Change:** `js/askname.js` splash + `tty_askname` (grid paint only —
  no `flush_screen`); `jsmain` asks when `!opts.name` + default
  `paranoia_bits`; `getline.js` `yn_function`; `dopray` ParanoidPray
  confirm.
- **Verification:** seed0017 **PASS** RNG **3465**/3465 Scr **67**/67
  + strict; green+cohort PASS; full **9/44** Scr **718** RNG
  **91965**.
- **Next:** seed2200 Scr 199 / seed0106 @ 2639 `do_attack` /
  seed0077 chargen `player_selection`.

## D-0103 — seed0106 `#chat` / `dochat` / `domonnoise` MS_BARK

- **Status:** fixed
- **Observed:** seed0106 @ **2639**: C `rn2(7)` @ `do_attack`
  vs JS `rn2(5)` @ `distfleeck`. Keys after prayer: `#chat\n` +
  `l` + `h`. Screen: empty-east chat then swap with little dog.
- **C locus:** `sounds.c` `dotalk`/`dochat`/`domonnoise` MS_BARK;
  `cmd.c` extcmdlist `"chat"`; `getline.js` EXT_CMDS.
- **Cause:** JS had no `#chat`. C uses `l` as getdir (0 RNG, chat
  empty → ECMD_OK); JS treated `l` as move east → turn +
  `distfleeck`. Second `#chat`+`l` talks to dog after swap →
  `"The little dog barks."` + ECMD_TIME.
- **Change:** `js/sounds.js` (`dotalk`/`dochat`/`domonnoise`
  MS_BARK via S_DOG); `getline.js` EXT_CMDS `chat`.
- **Verification:** seed0106 prefix **2639→2713** (`kick_door`/
  `exercise`); green+strict PASS; cohort 1500/1800/0060/0102/
  0700/1150/0017 PASS; full **9/44** Scr **718** RNG
  **91887**/792838 (positional aggregate can drop when a wrong
  path’s accidental later matches disappear).
- **Named omission:** other MS_*; shop `price_quote`; wall/
  statue talk; `night()` howl; priest/`shk`/`quest` chat;
  `#chronicle`/`#conduct` still unknown.
- **Next:** seed0106 @ 2713 door kick / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0104 — seed0106 `kick_door` CLOSED/LOCKED bust

- **Status:** fixed
- **Observed:** seed0106 @ **2713**: C `rn2(19)` @ `exercise`
  then `rn2(40)`/`rnl(35)` @ `kick_door` vs JS `rn2(2)` (kick_ouch
  `exercise(A_DEX,FALSE)`).
- **C locus:** `dokick.c` `kick_door` (CLOSED/LOCKED after
  open/broken/nodoor → `kick_dumb`); `attrib.c` `exercise`;
  `rnd.c` `rnl`.
- **Cause:** JS `kick_door` deferred closed doors to `kick_ouch`
  (hurt path). C always `exercise(A_DEX,TRUE)` then
  `rnl(35) < avrg_attrib` (martial DEX bonus), then shatter /
  crash-open / Thwack-Whammm.
- **Change:** `js/dokick.js` `kick_door` CLOSED/LOCKED envelope
  (Levitation→ouch; DEX exercise; rnl bust; trap/shatter/crash;
  fail Thwack/Whammm).
- **Verification:** seed0106 prefix **2713→2912** (`monmulti`/
  `m_throw`); positional **2784→3159**/4194; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **718** RNG **92262**/792838.
- **Named omission:** `martial()`; giant doorbuster; shop
  `in_rooms`/`add_damage`/`pay_for_damage`; town watchman;
  `b_trapped` body; Blind `feel_location`; kick_monster/object/
  SDOOR-SCORR/furniture.
- **Next:** seed0106 @ 2912 `monmulti`/`mthrowu` / seed2200 Scr
  199 / seed0077 `player_selection`.

## D-0105 — seed0106 `thrwmu` / `monmulti` / move-then-shoot

- **Status:** fixed
- **Observed:** seed0106 @ **2912**: C `rnd(1)` @ `monmulti` then
  `next_ident`/`m_throw` `rn2(5)` vs JS still `m_move` `rn2(12)`.
- **C locus:** `monmove.c` `dochug` (MMOVE_MOVED fall-through);
  `mhitu.c` `mattacku` AT_WEAP `range2`; `mthrowu.c` `thrwmu`/
  `monshoot`/`monmulti`/`m_throw`/`thitu`/`u_catch_thrown_obj`/
  `drop_throw`; `weapon.c` `select_rwep`/`dmgval`;
  `dothrow.c` `should_mulch_missile`; `invent.c` `delobj`→
  `obj_resists(0,0)`.
- **Cause:** JS `dochug` returned early on `MMOVE_MOVED` and gated
  attacks on `nearby`, so ranged `thrwmu` never ran. C allows
  move-then-shoot when `!nearby && AT_WEAP`.
- **Change:** `js/monmove.js` fall-through; `js/mhitu.js` ranged
  `mattacku`; `js/mthrowu.js` + `js/weapon.js` throw envelope;
  `js/mkobj.js` `delobj`.
- **Verification:** seed0106 prefix **2912→2962** (`mattacku` melee);
  positional **3159→3217**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **92304**/792838.
- **Named omission:** melee `mattacku`/`hitmu`/`missmu`; polearm/
  spit/breath; `hold_another_object` on catch; `ohitmon`;
  `flooreffects`/ship; full `mattk[]`; elf/orc/gnome racial
  multishot; extractor `oc_wsdam` (table stand-in); `mon_wield`
  HTH; cursed slip path beyond roll.
- **Next:** seed0106 @ 2962 melee `mattacku` / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0106 — seed0106 `mattacku` melee / `hitmu`

- **Status:** fixed
- **Observed:** seed0106 @ **2962**: C `rnd(20)` @ `mattacku` then
  `hitmu` `d(1,4)` + `mhitm_knockback` vs JS `rn2(5)` `distfleeck`
  (no melee path). Screen: `"The kobold hits!"` HP 11→10.
- **C locus:** `mhitu.c` `mattacku` AT_WEAP `!range2` / `hitmu` /
  `hitmsg` / `mdamageu`; `uhitm.c` `mhitm_ad_phys` (mhitu bare /
  weapon); `uhitm.c` `mhitm_knockback`.
- **Cause:** JS `mattacku` only called `thrwmu` when `range2`;
  adjacent kobold (dart spent, `MON_WEP` null) needs melee
  `rnd(20+i)` → `hitmu`.
- **Change:** `js/mhitu.js` melee HTH + AT_WEAP envelope, `hitmu`/
  `hitmsg`/`missmu`/`mdamageu`, bare/`dmgval` ad_phys; export
  `get_mattk` / `mhitm_knockback` from `js/mhitm.js`.
- **Verification:** seed0106 prefix **2962→2982** (`hitum` next
  key); positional **3188**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **92375**/792838.
- **Named omission:** `hitval`/`mswings` (mixed-dir `rn2`);
  `mon_wield` HTH body; `wildmiss`/displace; `passiveum`;
  `summonmu`/were; hugs/gaze/expl/engl/brea/spit/magc; seduce
  hitmsg; undead midnight extra `d()`; `Half_physical_damage`/
  Mitre; `done_in_by`; full `mattk[]` beyond FIRST_ATTK table;
  knockback hurtle body.
- **Next:** seed0106 @ 2982 `hitum` / hero melee / seed2200 Scr
  199 / seed0077 `player_selection`.

## D-0107 — seed0106 `hitum` / hero melee

- **Status:** fixed
- **Observed:** seed0106 @ **2982**: C `rn2(20)` @ `gethungry` (via
  `overexertion`) then `exercise`/`hitum` `rnd(20)`/`dmgval`/
  `xkilled` vs JS `rn2(5)` `distfleeck` (hostile `do_attack`
  stubbed `return true` with no combat RNG).
- **C locus:** `hack.c` `overexertion` → `eat.c` `gethungry`;
  `uhitm.c` `do_attack` / `hitum` / `known_hitum` /
  `find_roll_to_hit` / `hmon`; `weapon.c` `dmgval`/`abon`;
  `mon.c` `killed`/`xkilled`/`corpse_chance`.
- **Cause:** JS `do_attack` only handled safemon; hostiles returned
  true without `overexertion`/`hitum`, so monsters still moved
  (`distfleeck`) while C resolved mace melee and killed the kobold.
- **Change:** `js/eat.js` export `gethungry`; `js/hack.js`
  `overexertion`; `js/uhitm.js` hostile `do_attack`→`hitum`/
  `hmon`/`xkilled`; `js/weapon.js` melee `OC_WSDAM` (MACE…);
  `js/cmd.js` `await do_attack`.
- **Verification:** seed0106 prefix **2982→2993** (post-kill
  `dog_goal`); positional **3201**/4194; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **718** RNG **92300**/792838.
- **Named omission:** `attack_checks` invis/mimic/peaceful yn;
  Cleaver/twoweapon/`double_punch`; full `hitval`/
  `weapon_hit_bonus`/`P_SKILL`; `dbon`/skill dam recalc;
  live knockback; `passive` counters; `make_corpse`/`mkobj`
  treasure bodies; `missum` near-miss flavor; `check_caitiff`;
  encumber `overexert_hp`.
- **Next:** seed0106 @ 2993 post-kill `dog_goal` / seed2200 Scr
  199 / seed0077 `player_selection`.

## D-0108 — seed0106 `mondead`→`relobj` minvent drop

- **Status:** fixed
- **Observed:** seed0106 @ **2993**: C `rn2(8)` @ `dog_goal` vs JS
  `rn2(100)` `obj_resists`. Kill RNG matched (`rn2(6)=2` no treasure,
  `rn2(3)=2` no corpse). C then had a second APPORT candidate; JS did
  not.
- **Rejected:** missing `make_corpse`/treasure body (this kill's rolls
  were false); rewriting `dog_goal` APPORT gates.
- **C locus:** `mon.c` `mondead` → `m_detach(due_to_death)` →
  `steal.c` `relobj(mtmp, 1, FALSE)`; `dogmove.c` `dog_goal` scans
  `fobj`.
- **Cause:** JS `mondead` removed the monster from `fmon` without
  dropping `minvent`. Kobold leftover darts never reached `fobj`, so
  post-kill `dog_goal` skipped the second APPORT `rn2(8)`.
- **Change:** `js/mkobj.js` `relobj_on_death`; wired from
  `js/uhitm.js` and `js/mhitm.js` `mondead` (before xkilled treasure/
  corpse RNG). Vault-guard gold / `flooreffects` omitted.
- **Verification:** seed0106 prefix **2993→4097** (`dipfountain`);
  positional **4114**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **93214**/792838.
- **Named omission:** vault-guard gold discard; `flooreffects` on
  death-drop; worn/saddle extrinsics update; `make_corpse` /
  xkilled treasure `mkobj` bodies still deferred.
- **Next:** seed0106 @ 4097 `dipfountain` / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0109 — seed0106 `#sit` + `#dip` / `dipfountain`

- **Status:** fixed
- **Observed:** seed0106 @ **4097**: C `rnd(30)` @ `dipfountain` vs JS
  `rn2(5)` `distfleeck`. Keys `#dip`→`d`→`y` on fountain; prior turn
  was `#sit` with `"Having fun sitting on the fountain?"`.
- **Rejected:** `#dip`-only without `#sit` (moves peel earlier to
  4073: JS `rnd(30)` while C still runs sit's monster-turn RNG).
- **C locus:** `sit.c` `dosit` default/`surface`; `potion.c` `dodip`;
  `fountain.c` `dipfountain`/`dryup`; `trap.c` `water_damage`
  (POT_WATER + force → ER_NOTHING); `objnam.c` holy-water xname/BUC.
- **Cause:** unbound `#sit`/`#dip` let later keys become moves. Fountain
  dip of holy water needs `water_damage` ER_NOTHING then `rnd(30)` /
  `dryup`.
- **Change:** `js/sit.js` `dosit`; `js/fountain.js` `dipfountain`/
  `dryup`; `js/potion.js` `dodip`; `js/trap.js` `water_damage`;
  `js/getline.js` extcmds `sit`/`dip`; `js/objnam.js` holy/unholy
  water naming.
- **Verification:** seed0106 prefix **4097→4141** (nhlib shuffle @
  `#version`); positional **4145**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **93267**/792838.
- **Named omission:** Excalibur LONG_SWORD body; wash_hands; dipfountain
  cases 17–29; potion_dip alchemy; sink/pool dips; town warn/
  angry_guards; grease/towel/container water_damage; `#offer`/
  `#enhance`/`#annotate`/`#overview`/`#version` bindings.
- **Next:** seed0106 @ 4141 `#offer`/`#enhance`/`#annotate` key
  ownership / seed2200 Scr 199 / seed0077 `player_selection`.

## D-0110 — seed0106 `#offer`/`#enhance`/`#annotate`/`#overview`/`#version`

- **Status:** fixed (RNG); screens residual
- **Observed:** seed0106 @ **4141**: C `rn2(3)` nhlib `shuffle(align)`
  via `#version`/`doextversion`/`get_lua_version` vs JS `rn2(5)`
  `distfleeck`. Keys after second dip: `#offer\n` `#enhance\n` ESC
  `#annotate\nTest level\n` `#overview\n` ESC `#version\n` (+ spaces).
- **Rejected:** treating only `#version` as missing without prior
  key-owning menus (unbound enhance ESC / annotate getlin / overview
  ESC become moves before version runs).
- **C locus:** `pray.c` `dosacrifice` (not-on-altar); `weapon.c`
  `enhance_weapon_skill` PICK_NONE; `dungeon.c` `donamelevel`/
  `query_annotation`/`dooverview`; `version.c` `doextversion`;
  `nhlua.c` `get_lua_version` → nhlib shuffle.
- **Cause:** unbound extcmds left ESC / `Test level` / overview ESC as
  free keys → movement RNG while C shows menus/getlin then `#version`
  shuffle (0 RNG until Enter on version).
- **Change:** `js/pray.js` `dosacrifice`; `js/weapon.js`
  `enhance_weapon_skill`; `js/dungeon.js` `donamelevel`/
  `query_annotation`/`dooverview` + lazy mapseen; `js/pager.js`
  export `doextversion`; `js/getline.js` EXT_CMDS bindings; `do_name`
  menu `a` → `donamelevel`.
- **Verification:** seed0106 RNG **4194**/4194 Scr **5**/267;
  strict lengths PASS; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **722** RNG **93316**/792838.
- **Named omission:** `floorfood` sacrifice body; enhance
  `add_skills_to_menu`/`can_advance`/`skill_advance`/wizard speedy;
  overview `traverse_mapseenchn`/`interest_mapseen`/feature lines;
  `#chronicle`/`#conduct`/`#vanquished`/`#genocided`/`#adjust`/
  `#terrain` (and other remaining extcmds).
- **Next:** seed0106 Scr residual / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0111 — seed0077 `player_selection` / `genl_player_setup`

- **Status:** fixed (chargen path); mid-mklev residual
- **Observed:** seed0077 after askname "Shade": C
  `Shall I pick…` → `n` → role/race/gender menus → confirm →
  first RNG `rn2(1)=0 @ pick_align` (Rogue→chaotic via
  `plsel_startmenu`→`rigid_role_checks`) then gem shuffle. JS skipped
  selection and started `o_init` at `rn2(2)` (prefix **100**, Scr **6**).
- **Rejected:** treating seed0077 as rc-specified Rogue (nethackrc has
  no role/race/gender/align); skip-path only for already-specified facets.
- **C locus:** `role.c` `genl_player_setup` / `rigid_role_checks` /
  `pick_align` / `ok_*` / `plsel_startmenu` / `setup_*menu` /
  `role_menu_extra`; `wintty.c` `tty_player_selection`; H2344
  fullscreen when `maxrow>=rows`.
- **Cause:** no `player_selection` after askname; roles/races lacked
  `allow`/`selfmask`; tall role menu `paint_corner_nhw_menu` returned
  null on fullscreen; corner menus called `flush_screen` and invented
  botl during `in_role_selection`.
- **Change:** `js/player_selection.js`; roles/races/genders/aligns
  allow masks; `jsmain` → `player_selection` before `newgame`;
  `setup_role_race_from_rc` prefers `flags.init*`; invent fullscreen
  NHW_MENU + no status flush under `in_role_selection`.
- **Verification:** seed0077 prefix **100→1475** (`rnd_rect`/
  themerms); Scr **6→11**/33 (chargen through confirm); green+strict
  PASS; cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **746** RNG **101108**/792838.
- **Named omission:** filter-reset UI body; rename-in-confirm
  (`plnamesuffix` re-ask); SELECTSAVED; full `maybe_skip_seps` for
  non-24 rows; `doset`/`O` player_selection option.
- **Next:** seed0077 @ 1465 themerms/`rnd_rect` / seed2200 Scr 199 /
  seed0106 Scr residual.

## D-0112 — seed0077 `do_vault` `create_vault` fallback

- **Status:** fixed (RNG); screen residual remains
- **Observed:** seed0077 @ **1465**: C `rn2(1)` @ `rnd_rect` vs JS
  `rn2(6)`. After niches, vault `check_room` fails (`rn2(3)=1`);
  C then `rnd_rect() && create_vault()` burns **102** `rnd_rect`
  calls (outer null-check + create_room trycnt≤100) with
  `rect_cnt=1` before giving up; JS stubbed
  `else if (rnd_rect()) { /* simplified */ }` and continued into
  fill/branch with a different `rn2(6)`.
- **Rejected:** themerms/`check_room`/`split_rects` leaving extra JS
  rectangles during makerooms — prefix through niches matched;
  peel was the post-niche vault fallback stub.
- **C locus:** `mklev.c` `makelevel` vault block (`do_vault` /
  `check_room` / `create_vault`); `sp_lev.c` `create_room` vault
  arm (trycnt loop + `rnd_rect`).
- **Change:** `js/mklev.js` ports real fallback —
  `rnd_rect() && create_vault()` then re-`check_room` → fill or
  `rooms[nroom].hx = -1`.
- **Verification:** seed0077 RNG **3242**/3242 Scr **19**/33 +
  strict lengths; green+strict PASS; cohort 1500/1800/0060/0102/
  0700/1150/0017 PASS; full **9/44** Scr **759** RNG
  **104563**/792838.
- **Named omission:** `makevtele` still `makeniche(TELEP_TRAP)`
  stand-in; full vault fill/`mk_knox_portal` edge cases.
- **Next:** seed0077 Scr **19**/33 / seed2200 Scr 199 /
  seed0106 Scr residual.

## D-0113 — seed0077 door vision + pick_lock + DEC open-door

- **Status:** fixed
- **Observed:** seed0077 Scr **19**/33 with RNG full. Screen 6:
  Shall-I-pick topline color 0 vs C NO_COLOR(8). Screens 17+:
  south room invisible after "The door opens."; open-door cell
  ASCII `|` vs C DEC `a`; apply lockpick → JS "This doorway has
  no door." vs C "You cannot lock an open door."
- **Rejected:** further mklev/vault terrain mismatch — RNG already
  full; room3 existed in `rooms[]` with seenv=0 because LOS still
  blocked.
- **C locus:** `vision.c` `recalc_block_point`/`unblock_point`;
  `lock.c` `doopen_indir` + `pick_lock` `switch (doormask)`;
  `dat/symbols` DECgraphics `S_hodoor`/`S_vodoor` = meta-a;
  tty topline NO_COLOR for yn prompt.
- **Change:** `vision.js` `recalc_block_point` → `vision_reset`;
  `lock.js`/`dokick.js` call it before `vision_recalc`; `pick_lock`
  NODOOR/ISOPEN/BROKEN cases; `display.js` open door DEC `a`+brown;
  `shall_i_pick_prompt` uses `NO_COLOR`.
- **Verification:** seed0077 **PASS** (3242/3242, 33/33) + strict;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017 PASS;
  full **10/44** Scr **788** RNG **104575**/792838.
- **Named omission:** `pick_lock` CLOSED/LOCKED occupation +
  autounlock/credit-card; incremental `dig_point` (full reset OK);
  ASCII `|`/`-` open-door orientation when not DECgraphics.
- **Next:** seed2200 Scr 199 (RC path @158) / seed0106 Scr 5.

## D-0114 — option_help msg_window PREV_MSGS extract

- **Status:** fixed
- **Observed:** seed2200 screen 162 compound list showed
  `` `msg_window' - (not applicable) `` while C has the real
  `PREV_MSGS` description for ^P behavior.
- **C locus:** `optlist.h` `#if PREV_MSGS /* tty or curses */`
  vs `#else` `(not applicable)`; `scripts/extract-optlist.py`
  `eval_expr` left C comments in the expression → Python `eval`
  failed → False → wrong branch.
- **Change:** strip `/* … */` / `//` from `#if` expressions before
  eval; regenerate `js/generated/optlist_data.js`.
- **Verification:** seed2200 Scr **199→200**/230; green+cohort PASS;
  full **10/44** Scr **851** RNG **104575**/792838.
- **Named omission:** recording `get_configfile` absolute path still
  harness-only (screen 158); `dokeylist` / menu-controls stubs.
- **Next:** seed0106 Scr / seed2200 `dokeylist` @184.

## D-0115 — Primary ASCII vs `symset:DECgraphics`

- **Status:** fixed
- **Observed:** seed0106 (no `symset` in rc) Scr **5**/267 with RNG
  full: JS painted DEC walls/floors (`┌`/`·`) while C used Primary
  ASCII (`-`/`|`/`.`). Green/PASS cohort all set `symset:DECgraphics`.
- **Rejected:** further seed0106 Scr as only enhance/overview stubs —
  first miss was map glyphs from forced DEC.
- **C locus:** `options.c` / `symbols.c` default Primary showsyms;
  `OPTIONS=symset:DECgraphics` loads H_DEC; `display.c`
  `back_to_glyph` DOOR uses `horizontal` → `S_hodoor`/`S_vodoor`
  (ASCII `|`/`-`; DEC both meta-a); `defsym.h` S_room `.` vs DEC `~`.
- **Change:** `jsmain.js` sets `iflags.decgraphics` from rc;
  `display.js` ASCII vs DEC wall/floor/ndoor/open-door tables;
  `options.js` parses boolean `DECgraphics`.
- **Verification:** seed0106 Scr **5→32**/267; seed0107 Scr **1→35**;
  green+cohort PASS + strict; full **10/44** Scr **788→851** RNG
  **104575**/792838.
- **Named omission:** full `load_symset`/IBM/UTF8; `iflags.use_color`
  gating of `obj_color`/`mon_color` when `OPTIONS=color` absent
  (seed0106 potion `!` yellow vs NO_COLOR); `dokeylist`.
- **Next:** seed0106 @13 angrygods quote/`--More--` split /
  extcmd progressive `# c` paint / seed2200 `dokeylist`.

## D-0116 — angrygods `verbalize` + `adjattrib` You_feel

- **Status:** fixed
- **Observed:** seed0106 Scr **32**/267 first miss @13: C
  `"Thou art arrogant, mortal."  "Thou must relearn thy lessons!"--More--`
  vs JS second clause unquoted and no `--More--`; next key became
  `Unknown command ' '.` instead of `You feel foolish!`.
- **C locus:** `pray.c` `angrygods` case 2/3; `pline.c` `verbalize`;
  `attrib.c` `adjattrib` (`msgflg<=0` → `You_feel("%s!", minusattr)`).
- **Cause:** JS used bare `pline` for the relearn line (no quotes) and
  silent `adjattrib`, so `You_feel("foolish!")` never ran and never
  forced `more()` on the combined quote topline.
- **Change:** `display.js` `verbalize`/`You_feel`; `attrib.js`
  `adjattrib` async messaging + ACURR gate; `pray.js` case 2/3 uses
  `verbalize` + `await adjattrib(..., false)`; `vary_init_attr`/
  `u_init_inventory_attrs` await the async path.
- **Verification:** seed0106 Scr **32→34**/267 (screens 13–15 match);
  next miss @16 progressive `# c` vs `# chat`; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44**
  Scr **851→853** RNG **104575**/792838.
- **Named omission:** Fixed_abil/Dunce/verbose adjattrib; Unaware
  You_feel dream prefix; angrygods 4+; progressive extcmd paint.
- **Next:** seed0106 extcmd `# c` progressive getline /
  seed2200 `dokeylist` @184.

## D-0117 — seed0106 progressive `# c` / `# ch` extcmd paint

- **Status:** fixed
- **Observed:** seed0106 Scr **34**/267 first miss @16: after `#` then
  `c`, C topline `# c` vs JS `# chat` (same cursor col 3); `@17` `# ch`
  vs `# chat`. Screens 18–19 (`a`/`t`) already matched after C also
  expands at `"cha"`.
- **C locus:** `win/tty/getline.c` `ext_cmd_getlin_hook` →
  `cmd.c` `extcmds_match(..., ECM_NOFLAGS)`; `extcmdlist[]` AUTOCOMPLETE
  names (chat/chronicle/conduct share `"c"`/`"ch"`).
- **Cause:** JS autocomplete uniqueness used only the runnable
  `EXT_CMDS` subset, so `"c"` uniquely matched `chat`. C matches against
  every AUTOCOMPLETE entry (wizard-gated), so expansion waits until
  `"cha"`.
- **Change:** `getline.js` `EXT_CMD_AC` = full C AUTOCOMPLETE name set
  for hook uniqueness; `EXT_CMDS` remains the runnable subset for Enter
  dispatch.
- **Verification:** seed0106 Scr **34→38**/267 (screens 16–17 and
  24–25 match); next miss @34 potion `!` color 11 vs NO_COLOR 8;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **10/44** Scr **853→857** RNG **104575**/792838.
- **Named omission:** full runnable `extcmdlist` bodies; `extcmds_match`
  ECM_IGNOREAC exact-enter for non-AC names; `iflags.use_color` mapglyph
  gating (next peel).
- **Next:** seed0106 `use_color` / potion glyph color @34 /
  seed2200 `dokeylist` @184.

## D-0118 — `obj_is_generic` + tty gray/black → NO_COLOR

- **Status:** fixed
- **Observed:** seed0106 Scr **38**/267 first miss @34: map potion `!`
  at (71,9) JS CLR_YELLOW(11) vs C NO_COLOR(8). RNG **full** match;
  fruit juice otyp 319 shuffled to golden/yellow; C raw `|...!|` had no
  `\033[93m` (unlike yellow `<` on scr 29–33).
- **Rejected:** missing `OPTIONS=color` / `iflags.use_color` off —
  same session paints yellow stairs and white `@`/pet; color default
  On; forcing all yellow `!`→NO_COLOR is a hack (seed0002 has real
  yellow `!` when `dknown`).
- **C locus:** `display.h` `obj_is_generic` / `obj_to_glyph` /
  `generic_obj_to_glyph` — `!dknown` potions (and gems/spellbooks) use
  `objects[oclass]` (GENERIC_POTION CLR_GRAY), not per-otyp `oc_color`.
  Contest `006-nomux-capture.patch`: CLR_GRAY and CLR_BLACK record as
  default fg → decoded NO_COLOR.
- **Change:** `js/display.js` `obj_is_generic` + generic class color in
  `obj_glyph`; `tty_map_color` in `show_glyph_cell` maps
  CLR_GRAY/CLR_BLACK → NO_COLOR.
- **Verification:** seed0106 Scr **38→46**/267; next miss combat
  dart topline; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; seed2200 Scr
  **200**/230 unchanged; full **10/44** Scr **857→916** RNG
  **104575**/792838 (seed0030 Scr **46→97**).
- **Named omission:** hallu `random_obj_to_glyph`; pile-top generic
  offsets; when floor see sets `dknown` (colored potions after known).
- **Next:** seed0106 mthrowu/hit dart pline @46 /
  seed2200 `dokeylist` @184.

## D-0119 — mthrowu `canseemon`/`thitu` + melee skip hit-on-kill

- **Status:** fixed
- **Observed:** seed0106 Scr **46**/267 first miss @40: C topline
  `You are hit by a dart.` vs JS
  `The kobold throws dart!  You are hit by dart!`. Map at that step
  has no visible `k` (kobold still off-screen). Later @43: C
  `You kill the kobold!` vs JS
  `You hit the kobold.  You kill the kobold!`.
- **Cause/evidence:** JS `monshoot` used `couldsee && !minvis` as
  `canseemon`, so dark-corridor LOS still printed the throw pline;
  C `_canseemon` needs `cansee`/`see_with_infrared` + `mon_visible`.
  `thitu` omitted `an()`/`exclam` and miss plines (`A dart misses you.`).
  Melee `hmon` always printed `You hit` before damage; C
  `hmon_hitmon_msg_hit` skips when `destroyed` (non-thrown).
- **C locus:** `display.h` `_canseemon`; `mthrowu.c` `monshoot`/`thitu`;
  `zap.c` `exclam`; `uhitm.c` `hmon_hitmon_msg_hit`.
- **Change:** `js/mthrowu.js` real `canseemon`, `thitu` an/exclam/miss,
  `monshoot` `an(singular)`; `js/uhitm.js` apply damage then skip hit
  pline when destroyed.
- **Verification:** seed0106 Scr **46→49**/267 (next: floor `)` vs `#`
  at death-drop cell); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **916→919** RNG **104575**/792838.
- **Named omission:** `mshot_xname` multishot "Nth"; `obj_is_pname`/
  `the()`; thrown multishot hit-when-destroyed; surviving-hit
  `canseemon ? exclam : "."`; death-drop map glyph/`newsym` after kill.
- **Next:** seed0106 death-drop floor glyph @44 /
  seed2200 `dokeylist` @184.

## D-0120 — `newsym` memory under visible monster (`_map_location`)

- **Status:** fixed
- **Observed:** seed0106 Scr **49**/267 first miss @44: C map `)` (thrown
  dart) vs JS corridor `#` at the same cell. Screens 42–43 already matched
  (`k@)` then `)@d`); the glyph vanished after the pet left the cell once
  it was out of `cansee` (dark corridor, two steps from hero).
- **Cause/evidence:** Object was on the floor (`drop_throw` + remaining
  minvent via `relobj_on_death`). When the pet stood on it while `cansee`,
  JS `newsym` painted the monster and set `remembered_glyph` to **terrain**.
  C `newsym` calls `_map_location(x,y,FALSE)` before `display_monster`, so
  hero_memory keeps the object glyph. After the cell left sight, JS replayed
  remembered `#` while C kept `$`/`)`.
- **C locus:** `display.c` `newsym` / `_map_location` (show=0 under mon).
- **Change:** `js/display.js` `map_location_memory` + call from the
  `cansee`+visible-monster arm of `newsym`.
- **Verification:** seed0106 Scr **49→250**/267; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **919→1120** RNG **104575**/792838.
- **Named omission:** hero-underfoot `_map_location` (still terrain-only;
  mapping under `@` regresses seed0060 gold `$`); infrared sensed-monster
  path still skips `_map_location`; traps/engravings in
  `map_location_memory`.
- **Next:** seed0106 `#dip` yn @110 / garlic doname @116 /
  seed2200 `dokeylist` @184.

## D-0121 — yn leave prompt + cleric skip `"uncursed "`

- **Status:** fixed
- **Observed:** seed0106 Scr **250**/267 first miss @110: C topline still
  `Dip 4 potions of holy water into the fountain? [yn] (n)` with hero
  cursor after a silent fountain curse (`rnd(30)=16`, `rn2(3)=1` no dryup);
  JS blank topline. @116: C `Dip 2 cloves of garlic…` vs JS
  `Dip 2 uncursed cloves of garlic…`.
- **Cause/evidence:** JS `yn_function` cleared `_pending_message` on every
  answer; C `tty_yn_function` leaves the prompt (`TOPLINE_NON_EMPTY`) until
  the next pline / `rhack` clear-after-capture. Holy-water case 16
  `curse()` is silent and dryup skipped, so the yn text must survive until
  the next-command nhgetch. Garlic BUC: C `doname` omits `"uncursed "` when
  `Role_if(PM_CLERIC)` (priest always knows BUC); JS always printed it for
  bknown uncursed non-charged items.
- **C locus:** `win/tty/topl.c` `tty_yn_function` clean_up;
  `objnam.c` `doname` uncursed + `!Role_if(PM_CLERIC)`.
- **Change:** `js/getline.js` `yn_function` keep prompt after answer;
  `js/objnam.js` `doname` skip uncursed for `PM_CLERIC`.
- **Verification:** seed0106 Scr **250→253**/267 (next: enhance menu
  offx @133); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1120→1123** RNG **104575**/792838.
- **Named omission:** `doname` uncursed still omits SCR_MAIL /
  AMULET_OF_YENDOR / FAKE_AMULET exclusions; `dodip` uses `doname` not
  `short_oname` length fallback.
- **Next:** seed0106 enhance menu @133 / seed2200 `dokeylist` @184.

## D-0122 — `#enhance` skill_init + add_skills_to_menu (paged PICK_NONE)

- **Status:** fixed
- **Observed:** seed0106 Scr **253**/267 first miss @133: C fullscreen
  `Current skills:` + Fighting/Weapon/Spellcasting skill list +
  `(1 of 2)`; JS corner overlay stub `(no skills ready to advance)`.
- **Cause/evidence:** `u_init_skills_discoveries` never called
  `skill_init`, so `weapon_skills[]` stayed unset; `enhance_weapon_skill`
  painted a three-line stub via corner NHW_MENU. C builds the real menu
  via `add_skills_to_menu` after invent→Basic / role maxes; tty_end_menu
  prepends prompt+blank; lmax=23 yields two pages; seed presses `\n` on
  page 1 (dismiss without page 2). Not an H2344 offx bug.
- **C locus:** `weapon.c` `skill_init` / `add_skills_to_menu` /
  `enhance_weapon_skill`; `wintty.c` `tty_end_menu` /
  `process_menu_window` PICK_NONE paging; `u_init.c`
  `u_init_skills_discoveries`.
- **Change:** `js/weapon.js` `skill_init`/`P_NAME`/`add_skills_to_menu`/
  enhance rewrite; `js/u_init.js` Skill_T/Skill_R + call `skill_init`;
  `js/invent.js` `select_menu_pick_none` (lmax=23, `(N of M)`).
- **Verification:** seed0106 Scr **253→254**/267 (next: overview
  features @165); seed0107 Scr **35→36**; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1123→1125** RNG **104575**/792838.
- **Named omission:** wizard speedy y_n; `can_advance`/`could_advance`/
  `peaked_skill` annotations; `skill_advance`; `skill_based_spellbook_id`;
  `unrestrict_weapon_skill(spelspec)`; `#chronicle`.
- **Next:** seed0106 `#overview` features @165 / seed2200 `dokeylist`
  @184.

## D-0123 — `#overview` mapseen features (`lastseentyp` / `recalc_mapseen`)

- **Status:** fixed
- **Observed:** seed0106 Scr **254**/267 first miss @165: C corner
  overview shows `A fountain.` under Level 1; JS only dungeon header +
  Level line + `(end)`. Header/`(end)` offx also short by 3 cols.
- **Cause/evidence:** `dooverview` never called `recalc_mapseen` /
  `print_mapseen` OF_INTEREST; `update_lastseentyp` was deferred in
  `newsym`/`magic_map_background`. Level line used PREFIX (6 spaces)
  instead of C TAB (3), so with a feature line H2344 `maxcol`/`offx`
  diverged even after adding the sentence.
- **C locus:** `dungeon.c` `update_lastseentyp` / `count_feat_lastseentyp`
  / `recalc_mapseen` / `show_overview` / `print_mapseen` (`TAB` vs
  `PREFIX` / `ADDNTOBUF`); `display.c` `_map_location` /
  `magic_map_background` call `update_lastseentyp`.
- **Change:** `js/dungeon.js` lastseentyp + feat count + overview
  feature sentence; Level `   ` TAB; `js/display.js` /
  `js/mklev.js` update/clear lastseentyp on map/level.
- **Verification:** seed0106 Scr **254→255**/267 (next: `#chronicle`
  @188); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1125→1126** RNG
  **104575**/792838.
- **Named omission:** shop/temple room traversal; `shop_string` /
  altar-to-god; altar `msalign`; DRAWBRIDGE_UP / furniture-mimic
  lastseentyp; `traverse_mapseenchn` / `interest_mapseen` / auto
  annotations; Blind bigroom / bones / valley/sanctum flags;
  `#chronicle`.
- **Next:** seed0106 `#chronicle` @188 / seed2200 `dokeylist` @184.

## D-0124 — `#chronicle` / `do_gamelog` / `show_gamelog`

- **Status:** fixed
- **Observed:** seed0106 Scr **255**/267 first miss @188: C NHW_TEXT
  `Logged events:` / ` Turn` / five lines (enter dungeon, rejected
  atheism, lost all experience, first weapon hit, first kill); JS
  `#chronicle: unknown extended command.`
- **Cause/evidence:** `#chronicle` was AUTOCOMPLETE-only (D-0117) with
  no `EXT_CMDS` runner; `gg.gamelog` / `livelog_printf` never written.
  Expected text matches C `show_gamelog(ENL_GAMEINPROGRESS)`.
- **C locus:** `cmd.c` extcmd → `insight.c` `do_gamelog` /
  `show_gamelog`; `pline.c` `gamelog_add` / `livelog_printf`;
  `allmain.c` `welcome` enter-dungeon; `pray.c` gnostic conduct;
  `exper.c` `losexp` ulevel==1; `uhitm.c` `first_weapon_hit`;
  `mon.c` `xkilled` killer conduct.
- **Change:** `js/pline.js` gamelog append; `js/insight.js`
  `do_gamelog`/`show_gamelog`; `js/getline.js` chronicle runner;
  wire welcome/pray/losexp/weaphit/killer; export `show_text_pages`.
- **Verification:** seed0106 Scr **255→257**/267 (next: `#conduct`
  @199); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1126→1128** RNG
  **104575**/792838.
- **Named omission:** `livelog_add` file write; final/Major
  `show_gamelog`; other livelog sites (wish/genocide/achieve/…);
  artifact/cursed-bknown `first_weapon_hit`; `#conduct`/
  `#vanquished`/`#genocided`.
- **Next:** seed0106 `#conduct` @199 / seed2200 `dokeylist` @184.

## D-0125 — `#conduct` / `doconduct` / `show_conduct`

- **Status:** fixed
- **Observed:** seed0106 Scr **257**/267 first miss @199: C NHW_MENU
  corner `Voluntary challenges:` + foodless/illiterate/genocide/
  polypile/polyself/wishless lines; JS `#conduct: unknown extended
  command.`
- **Cause/evidence:** `#conduct` was AUTOCOMPLETE-only with no
  `EXT_CMDS` runner. Expected overlay matches C `show_conduct(
  ENL_GAMEINPROGRESS)` with present-tense `enl_msg` + contractions;
  petless omitted because `initedog` bumps `u.uconduct.pets`.
- **C locus:** `cmd.c` extcmd → `insight.c` `doconduct` /
  `show_conduct` / `enlght_line` / `num_genocides` /
  `sokoban_in_play`; `dog.c` `initedog` `u.uconduct.pets++`.
- **Change:** `js/insight.js` `doconduct`/`show_conduct`; export
  `show_nhw_menu_text`; `js/getline.js` conduct runner; `js/dog.js`
  `initedog` pets++.
- **Verification:** seed0106 Scr **257→259**/267 (next: `#vanquished`
  @213); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1128→1130** RNG
  **104575**/792838.
- **Named omission:** `show_achievements` body (final/wizard only);
  livelog first-pet; food/vegan bump sites beyond existing counters;
  final disclosure `show_conduct`.
- **Next:** seed0106 `#vanquished` @213 / seed2200 `dokeylist` @184.

## D-0126 — `#vanquished` / `list_vanquished` + `mvitals.died` + empty `#genocided`

- **Status:** fixed
- **Observed:** seed0106 Scr **259**/267 first miss @213: C NHW_MENU
  corner `Vanquished creatures:` + `  a kobold` / `  a lichen` /
  `2 creatures vanquished.`; JS `#vanquished: unknown extended
  command.` (and `mvitals[].died` never incremented). Screen @226:
  C `No creatures have been genocided.`; JS unknown extcmd.
- **Cause/evidence:** `#vanquished`/`#genocided` were AUTOCOMPLETE-only
  with no runners. Even with a runner, `mondead` omitted C's
  `svm.mvitals[mndx].died++`, so the census would always be empty.
  Expected overlay matches traditional `VANQ_MLVL_MNDX` sort (both
  mlevel 0 → mndx kobold before lichen) with `an()` + 3-digit pfx
  padding.
- **C locus:** `cmd.c` extcmd → `insight.c` `dovanquished` /
  `list_vanquished` / `vanqsort_cmp` / `dogenocided` /
  `list_genocided`; `mon.c` `mondead` `mvitals[].died++`.
- **Change:** `js/mon.js` `record_mvitals_died`; call from
  `uhitm.js`/`mhitm.js` `mondead`; `js/insight.js`
  `dovanquished`/`list_vanquished`/`vanqsort_cmp` + empty
  `dogenocided`/`list_genocided`; `js/getline.js` runners;
  export `makeplural`; `M2_PNAME`.
- **Verification:** seed0106 Scr **259→262**/267 (next: `#adjust`
  @235); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1130→1133** RNG
  **104575**/792838.
- **Named omission:** `set_vanq_order` / `m #vanquished` force_sort;
  disclose yn ask; class-header / numeric-mlet MCLS modes; dumplog
  `'d'`; Hallucination footer; `#genocided` ngone>0 NHW_MENU +
  extinctions; cham/were restore before `monsndx` in `mondead`.
- **Next:** seed0106 `#adjust` @235 / seed2200 `dokeylist` @184.

## D-0127 — `#adjust` / `doorganize` getobj + destination cancel

- **Status:** fixed
- **Observed:** seed0106 Scr **262**/267 first miss @235: C
  `What do you want to adjust? [a-h or ?*]` then
  `Adjust letter to what [ai-zA-Z] (? see used letters)?` then
  Esc → `Never mind.`; JS `#adjust: unknown extended command.`
- **Cause/evidence:** `#adjust` was AUTOCOMPLETE-only (`EXT_CMD_AC`)
  with no `EXT_CMDS` runner. C `doorganize` → `getobj("adjust")` →
  `doorganize_core` destination `yn_function` (NULL resp).
- **C locus:** `cmd.c` extcmd → `invent.c` `doorganize` /
  `doorganize_core` / `adjust_ok` / `compactify` / `prinv`.
- **Change:** `js/invent.js` `doorganize`/`doorganize_core`/
  `getobj_adjust` (suggest non-gold, destination letter list,
  Esc cancel, move/collect/swap/merge without count-split);
  `js/getline.js` `#adjust` runner.
- **Verification:** seed0106 Scr **262→264**/267 (next: `#terrain`
  @253); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1133→1135** RNG
  **104575**/792838.
- **Named omission:** getobj count-split / `splitobj`;
  `display_used_invlets` / `display_pickinv` for `?`/`*`;
  `check_invent_gold` / wonky-gold `adjust_gold_ok`;
  `adjust_split` / itemactionsions; pack-full bump on split;
  floating `!invlet_constant` `reassign` truncate.
- **Next:** seed0106 `#terrain` @253 / seed2200 `dokeylist` @184.

## D-0128 — `#terrain` / `doterrain` View which? menu + Esc cancel

- **Status:** fixed
- **Observed:** seed0106 Scr **264**/267 first miss @253: C
  `View which?` / `a * known map without monsters, objects, and traps`
  / `b -` / `c -` / `(end)`; JS `#terrain: unknown extended command.`
- **Cause/evidence:** `#terrain` was AUTOCOMPLETE-only (`EXT_CMD_AC`)
  with no `EXT_CMDS` runner. Session Esc-cancels before
  `reveal_terrain` (moves `#terrain\n\x1b`).
- **C locus:** `cmd.c` `doterrain`; `detect.c` `reveal_terrain` /
  `browse_map` / `map_redisplay`; contest `006-nomux` selected → `*`.
- **Change:** `js/detect.js` `doterrain` (recalc_mapseen + PICK_ONE
  a/b/c + explore/wizard 4–6; Esc/`letter`/space-return) + partial
  `reveal_terrain`/`browse_map`/`map_redisplay`; `js/getline.js`
  `#terrain` runner.
- **Verification:** seed0106 Scr **264→265**/267 (next: `+` spells
  @257 / attributes @261); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1135→1136** RNG **104575**/792838.
- **Named omission:** `reveal_terrain_getglyph` / `show_glyph` map
  rewrite; `unconstrain_map` underwater/buried/swallow;
  `wiz_map_levltyp` / `wiz_levltyp_legend`; terrainmode autodescribe
  glyph path in getpos; TER_FULL explore map body.
- **Next:** seed0106 `+`/`dovspell`/`initialspell` @257 /
  seed2200 `dokeylist` @184.

