# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** seed0030 seg3 @9881 — C `rn2(8)` `use_offensive`
  vs JS `rn2(5)` `distfleeck` (hostile muse offense before move?).
- **Falsifier:** dump which mon reaches `use_offensive` / fleeck at
  matched prefix; expect C `find_offensive` spend-turn vs JS fall-through.
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
