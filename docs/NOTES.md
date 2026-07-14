# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** seed0030 seg6 @4080 — C `rn2(12)` `m_move` vs JS
  `rn2(5)` `distfleeck` (after FIGURINE D-0244; seg6 **2638→4080**).
- **Falsifier:** dump actor list / fleeck vs m_move order at that EOT —
  which mon burns `rn2(12)` track in C while JS still fleecks.
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
- **seed0104 @3031 was NOT upstairs / create_room origin drift** —
  create_room RNG+rects matched C through place_branch; early screens
  matched. Real split: capital-`L` lookaround turned diagonally into an
  **open** door; C `test_move` forbids diagonal into intact doorways
  (D-0218 rejected; D-0219 fixed). Do not re-chase makerooms rects for
  that peel.
- **seed0104 Scr 39/43 was NOT a botl/Ride residual** — dismount omitted
  C `float_down`→`pickup`→`look_here` multi NHW_MENU; space meant for
  pony `--More--` became `Unknown command` (D-0220).
- **D-0211 was NOT mfndpos skipping SW / poison-gas / typ drift** — C
  recorder dump: cnt=8 including `(72,8)`; peel was `dog_goal` `gg`
  via `!couldsee`→`ogoal`/`wantdoor` (JS always fell back to hero).
- **seed0030 seg2 @2930 was NOT invent-letter `y` / missing `rn2(20)` in
  eatcorpse** — C `floorfood` yn "There is a kobold corpse here; eat it?";
  JS invent-only getobj never reached eatcorpse (D-0221).
- **seed0030 seg2 @3207 was NOT pet dog_invent first** — C
  `done_eating`→`useupf`→`delobj`→`obj_resists(0,0)` before next
  `distfleeck` (D-0222). Invent `useup` must not call `delobj`
  (`addinv` often omits `where=OBJ_INVENT`; split children not in
  `game.invent`).
- **seed0030 seg2 @5939 was NOT dog_invent APPORT / invent-eat /
  gettrack / meating** — symptom `rn2(20)` was hostile `m_move` track
  after leftover floor glass redirected `gg`; root was skipped underfoot
  `m_search_items`→`MMOVE_DONE` (D-0183 deferred until postmov
  `mpickstuff` existed; restored D-0223).
- **seed0030 seg2 @6060 was NOT upstairs create_room drift** — C tty
  screen col/row ≠ map xy (`setCell(x-1,y+1)`); C map stairs **(66,2)**
  matched JS. Real peel: unbound `F` forcefight (D-0224 rejected
  geometry; D-0225 fixed). Do not re-chase split_rects for that peel.
- **seed0030 seg3 @4527 was NOT a blind `rn2(100)` themerms chance** —
  Nesting rooms contents evaluates `nh.rn2(4)` w/h **before**
  `build_room`’s `rn2(100)`; JS fell through as plain random create_room
  (D-0226). Nested create_subroom/door still deferred (outer often fails
  after 100 positioned tries).
- **seed0030 seg3 @7617 was NOT a missing `known_hitum` flee `rn2(25)`** —
  C `hmon` weapon `maybe_knockback`→`mhitm_knockback` burns `rn2(3)`+
  `rn2(6)` before flee; JS skipped the call (D-0227).
- **seed0030 seg3 @7935 was NOT missing melee/`hitum` on the grid bug** —
  grid bug was adjacent; peel was key desync: C safety-rejected `s`/`.`
  (0 RNG) then `h`; JS ran real searches (D-0228). Do not re-chase
  `do_attack`/`overexertion` for that peel.
- **seed0030 seg3 @8561 was NOT corpse_chance arity alone** — C
  `!rn2(6)` then `mkobj(RANDOM_CLASS)` (`rnd(100)`/`rnd(1000)`/
  `next_ident`); JS burned the gate then skipped the body (D-0229).
- **seed0030 seg3 @9166 was NOT key desync / missing safety** — C
  attacked goblin at (26,6); JS goblin at (25,6) because
  `m_search_items` redirected `gg` to a gnome CORPSE with `owt=1`.
  C `weight(CORPSE)` uses `mons[corpsenm].cwt` (D-0230). Do not
  re-chase `cmd_safety` for that peel.
- **seed0030 seg3 @9299 was NOT missing dosearch/safety/key desync** —
  C blocked `j` into adjacent SDOOR (0 RNG) then `s`→`rnl(7)`; JS
  `blocksMove` allowed walk onto SDOOR (typ=14) because it only
  checked STONE/walls/closed DOOR, not `IS_OBSTRUCTED` (D-0231).
- **seed0030 seg3 @9778 was NOT an extra hostile actor / mtrack arity** —
  shopkeeper at (10,8) with charged `WAN_SPEED_MONSTER` + `mspeed!=MFAST`
  within dist≤36: C `find_misc`→`use_misc` spends the turn (no post
  fleeck); JS fell through to `shk_move` + post fleeck, inserting
  `rn2(5)` before the grid bug’s `m_move` track `rn2(8)` (D-0232).
- **seed0030 seg3 @9850 was NOT invent walk / wrong IS_ROOM filter /
  inhishop false** — shk at home (10,9), hero on door (11,9),
  `avoid`+`uondoor`, `appr=0`: C `mfndpos` marks online cells NOTONL
  so `move_special` skips all but one → only `rn2(1)`; JS never set
  NOTONL so burned `rn2(1..4)` (D-0233).
- **seed0030 seg3 @9881 was NOT missing muse alone** — Maganasipi stayed
  peaceful after miss because JS `missum`/`hmon` never called
  `wakeup`→`setmangry`; C angers then `use_offensive` WAN_STRIKING
  (`rn1(8,6)` + Antimagic Boing → `makeknown`→`exercise`). Also need
  worn MR cloak as Antimagic when `oc_oprop` unset (D-0234).
- **seed0030 seg3 @9887 was NOT position/spe/extra m_move** — after
  Antimagic Boing, C `monstseesu(M_SEEN_MAGR)` so Maganasipi’s MFAST
  second dochug skips WAN_STRIKING and melees; JS re-zapped (D-0235).
- **seed0030 seg4 @2369 was NOT trquan arity / second-ring mkobj skip** —
  Wizard `UNDEF_SPE` charged ring with `spe<=0` after `cursed=0` clear:
  C `ini_inv_adjust_obj` else-branch `rne(3)`; JS omitted the branch
  and jumped to next `trquan` `rn2(1)` (D-0236).
- **seed0030 seg4 @6630 was NOT invent getobj/`rn2(5)` fleeck first** —
  C `q`→fountain yn→`y`→`drinkfountain` `rnd(30)`; JS skipped fountain
  prompt so `y` cancelled getobj (0 turn) and later move fleeck landed
  at C’s fountain index (D-0237).
- **seed0030 seg4 @7554 was NOT walk `exercise` / exerchk / wall bump** —
  C `k` into adjacent boulder → `moverock`/`dopush` →
  `exercise(A_STR,TRUE)` then advance; JS walked onto the boulder with
  no push (D-0238). Session `steps[i].key` is `moves[i-1]` (key that
  produced the step), not `moves[i]`.
- **seed0030 seg5 @3076 was NOT mineralize/`rn2(12)` first** — C hero
  `spoteffects`→`dotrap`→`trapeffect_dart_trap` `t_missile(DART)` then
  miss/`place_object`; JS never called dotrap so EOT landed on
  `mcalcmove` `rn2(12)` (D-0239). Screen: “A little dart shoots out at
  you!  A little dart misses you.”
- **seed0030 seg5 @3096 was NOT pet glass-wand / APPORT/`next_ident`
  order** — look_here NHW_MENU `--More--` dismissed on any key in JS;
  C `dmore`/`xwaitforspace(quitchars)` ignores `l`/`k` so space closes
  the pile, then `b` moves SW. JS treated the second `l` as a real east
  move onto an adjacent second dart trap → extra `t_missile`/`rnd(2)`
  (D-0240). Two dart traps at (74,4)/(75,4).
- **seed0030 seg5 @4174 was NOT dog_move mfndpos cnt / `>=5` mtrack** —
  symptom C `rn2(12)` vs JS fleeck looked like mtrack at distmin=5;
  forcing `>=5` advanced prefix but was wrong. Real cause: JS `hitmm`
  always plined pet bites in the dark → bite+destroyed forced topline
  `more()` which discarded movement `h` until a later space → key desync
  (D-0241). Do not change mtrack `>5` gate.
- **seed0030 seg5 @4372 was NOT a missing thrwmu-only call** — hostile
  `m_move` getitems `lined_up`→`linedup`; JS `couldsee` stayed true
  because vision `_blocks` ignored BOULDER, so the boulderhandling
  `rn2(2+spots)` path never ran (D-0242). Porting linedup alone is
  insufficient without `does_block` boulder opacity.
- **seed0030 seg6 @339 was NOT build_room `rn2(100)` / map-fill chance** —
  reservoir picked **Blocked center**; C `des.map`→`lspo_map` (`rn2(68)`
  for wid=11) + percent/shuffle/`replace_terrain` L→wall|pool; JS lacked
  that map entry and fell through to rectangular `rn2(100)` (D-0243).
- **seed0030 seg6 @2638 was NOT `align_shift` / maxmlev drift** — C
  weight seq `2,4,5,8,…` is FIGURINE `rndmonnum_adj(5,10)` (minmlev=5,
  maxmlev=11); JS omitted TOOL FIGURINE init so post-init fell through
  to plain `rndmonnum()` → `rn2(3)` jackal pool (D-0244). Do not
  re-chase dungeon align for that peel.
- **`monattk.h`: AT_WEAP=254, AT_MAGC=255, AT_SPIT=10** — never use 10 for
  weapon (D-0179).
- Hostile `m_move`: before place, `m_digweapon_check` may return
  MMOVE_DONE (wield pick/axe); hero-square returns MMOVE_NOTHING so
  dochug can `mattacku` (D-0180).

## Landmarks

- STAIRS glyph: `known_branch_stairs(stairway_at)` → CLR_YELLOW;
  else CLR_GRAY (tty NO_COLOR); direction from `ladder & LA_DOWN`
  (D-0162). Dlvl1 upstairs is traversed branch.
- **`goto_level` descend:** `stairway_find_from(&u.uz0, at_ladder)` then
  mark `u_traversed`; not bare `u_on_upstairs`/`find_dir` (D-0224).
- **tty map coords:** screen col = map_x − 1; screen row = map_y + 1
  (message row 0). Never treat session screen (65,3) as map (65,3).
- **Session step key:** `steps[i].key === moves[i-1]` (RNG/screen after
  that key); `moves[i]` is the key about to be read at capture (D-0238).
- **`F`/`do_fight`:** PREFIXCMD sets `forcefight`; next move dir attacks
  (empty → `domove_fight_empty` “thin air” / solid); no turn on F alone
  (D-0225).
- **Nesting rooms:** `w=9+rn2(4)`, `h=9+rn2(4)` then `build_room`
  `rn2(100)` then positioned `create_room` (`rnd(5)`/`rnd(3)` loop);
  fail → `themeroom_failed` (D-0226).
- **`create_room` positioned:** when not all-`-1`, `rnd(5)`×2 + size
  `rn1` if needed + `rnd(3)`×2 align + `get_rect`/`check_room` up to
  100 tries (D-0226).
- **`hmon` weapon knockback:** `!unarmed && dmg>1 && !thrown && !Upolyd
  && !twoweap && uwep` → `mhitm_knockback` after survive (burns
  `rn2(3)`+`rn2(6)` before gates; hurtle deferred) (D-0227).
- **`cmd_safety_prevention`:** `flags.safe_wait` (default On) +
  `monster_nearby` → reject `s`/`.` with Norep, no time; `m` prefix /
  `multi` skip (D-0228).
- **`xkilled` treasure:** `!rn2(6)` + !G_NOCORPSE + not hero tile +
  !S_KOP + !mcloned → `mkobj(RANDOM_CLASS,TRUE)`; food (non-COLLECT)
  or small-mon oversized → `delobj`; else place+stack. flooreffects
  non-floor arms deferred (D-0229).
- **`weight(CORPSE)`:** `quan * mons[corpsenm].cwt` (LARGEST_INT clamp);
  not `objects[CORPSE].oc_weight` / `(quan+1)/2` (D-0230). Wrong owt
  lets `can_carry` succeed and `m_search_items` divert hostiles off
  gettrack/hero gg.
- **`blocksMove` / `test_move`:** `IS_OBSTRUCTED(typ)` (`typ < POOL`) +
  IRONBARS + closed/locked DOOR — includes TREE/SDOOR/SCORR (D-0231).
  STONE/walls-only was wrong and let the hero walk onto secret doors.
- **`dochug` muse:** after first `distfleeck`, `find_defensive` else
  `find_misc`; nonzero `use_*` returns before `m_move` (no post fleeck)
  (D-0232). `find_misc` dist≤36; `WAN_SPEED_MONSTER` needs `spe>0` and
  `mspeed!=MFAST`.
- **`mfndpos` NOTONL:** `monseeu && monlineu(nx,ny)` → mark (or skip if
  unicorn `flag&NOTONL`); `move_special` with `avoid` skips NOTONL
  candidates (D-0233). `monlineu` = `online2` vs `mux`/`muy`.
- **`missum`/`wakeup`/`setmangry`:** miss (and survive hit) →
  `wakeup(TRUE)` → peaceful→hostile + “gets angry!”; without it shk
  stays peaceful and never `use_offensive` (D-0234).
- **`use_offensive` WAN_STRIKING:** `mzapwand` + `mbhit(rn1(8,6))` +
  Antimagic Boing → `makeknown`→`exercise(A_WIS)`; worn
  `CLOAK_OF_MAGIC_RESISTANCE` counts as Antimagic while oc_oprop
  deferred (D-0234).
- **`monstseesu` / `m_seenres`:** Antimagic Boing sets `M_SEEN_MAGR` on
  LOS monsters; `find_offensive` WAN_STRIKING requires
  `!m_seenres(..., M_SEEN_MAGR)`. Without it MFAST shk re-zaps instead
  of melee (D-0235).
- **`ini_inv_adjust_obj` UNDEF_SPE rings:** after `cursed=0`, charged
  ring with `spe<=0` → `spe = rne(3)` (D-0236). Charged set =
  ADORNMENT/GAIN_STR/GAIN_CON/INCREASE_ACC/INCREASE_DAM/PROTECTION
  (`oc_charged` not yet in extractor).
- **`dodrink` fountain:** before getobj, yn “Drink from the fountain?”
  → `drinkfountain`; `fate = rnd(30)` **before** Levitation return
  (D-0237).
- **`moverock`/`dopush`:** dest boulder → push to `ux+2*dx,uy+2*dy` if
  clear; “great effort” + `exercise(A_STR,TRUE)` then hero advances onto
  vacated cell (D-0238). Do not walk onto boulders.
- **Hero `dotrap` dart:** `spoteffects` non-pit pickup then `dotrap`;
  `t_missile(DART)` before poison/`dmgval`/`thitu`; miss →
  `place_object`+`observe_object`+`stackobj` (D-0239). Pit/arrow/rock/
  sqky hero arms and `poisoned()` still deferred.
- **NHW_MENU putstr `dmore`:** `xwaitforspace(quitchars)` =
  space/CR/LF/ESC only; movement letters stay on the page (each is still
  an nhgetch capture). Corner `offx≠0` paints all rows then one dmore;
  fullscreen pages at `rows-1` (D-0240). Same helper as NHW_TEXT
  `text_page_wait`.
- **mhitm `gv.vis`:** `hitmm`/`missmm` pline only when
  `(cansee∧canspotmon)(magr) ∨ (cansee∧canspotmon)(mdef)`; else
  `noises()` deferred. `mondied` pline only when `cansee` (D-0241).
  Dark-corridor pet fights must not force topline `more()` or movement
  keys are discarded until space.
- **`linedup` boulderhandling:** when `!couldsee`/`!clear_path`, walk
  the ray counting `sobj_at(BOULDER)`; `bh==2` → `rn2(2+spots)<2`
  (D-0242). Vision `_blocks` must treat BOULDER as opaque or couldsee
  never fails and the rn2 path is skipped. `lined_up` uses mux/muy +
  ignore via throws_rocks/WAN_STRIKING. `objects_at` is a nexthere
  chain head, not an array.
- **Blocked center themerms:** map 11×11 with central 3×3 lava; contents
  `percent(30)` → `shuffle({"-","P"})` → `replace_terrain` region
  {1,1,9,9} from L (only matching cells burn `rn2(100)`); then
  `filler_region(1,1)`. Wid 11 → `lspo_map` `rn2(COLNO-1-11)=rn2(68)`
  (D-0243).
- **FIGURINE `mksobj_init`:** `rndmonnum_adj(5,10)` then reject
  `is_human` (tryct 30) + `blessorcurse(4)` (D-0244). Plain
  `rndmonnum()` is wrong — adj expands minmlev/maxmlev by +5/+10.
- **`test_move` diagonal into DOOR:** only `doorless_door` (D_NODOOR /
  D_BROKEN) allowed; open/closed/locked block diagonal entry/exit
  (D-0219). Same rule in `domove` and steed `landing_spot`/`test_move_ok`.
- **Dismount BYCHOICE:** `teleds` under `in_steed_dismounting` (skip
  spoteffects pickup) then `float_down(0,W_SADDLE)`→`pickup(1)` once;
  multi floor objs → `look_here` NHW_MENU after WIN_MESSAGE `--More--`
  (D-0220).
- **`dog_goal` !couldsee:** gettrack → else reuse `edog.ogoal` → else
  `do_clear_area(pet,9,wantdoor)` closest clear cell to hero, store
  ogoal (D-0211). Omitting wantdoor forced hero-gg and wrong fleeck arity.
- **`doeat` → `floorfood`:** edible floor pile ynq before invent getobj;
  poison path burns `poison_strdmg(rnd(4),rnd(15))` (D-0221).
- **Floor meal finish:** `done_eating` → `useupf` → `delobj` →
  `obj_resists(0,0)` (D-0222). Invent `useup` never rolls.
- **`m_search_items` underfoot:** interesting loot under mon → return
  TRUE → `postmov(MMOVE_DONE)` → `mpickstuff` (D-0223). Skipping leaves
  floor loot for later distant `gg` redirects (silent arity peel).
- **`dog_invent` underfoot eat:** edible ≤ CADAVER (or starving ACCFOOD)
  → `dog_eat` before APPORT; return 1 → `MMOVE_MOVED` (C `goto newdogpos`).
- Key attribution ≠ RNG order: 0-RNG `--More--` / safety-reject keys can
  sit between matched EOT RNG and the next gameplay command (D-0228).
