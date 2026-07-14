# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** seed0030 seg2 @6060 — C `rnd(20) @ mattacku` vs JS
  `rn2(8)` after D-0223 underfoot `m_search_items`→`MMOVE_DONE`. /
  seed0361/0373 quest `getbones` (need `^V`→`goto_level`→`makemaz`).
- **Falsifier:** seg2 rng-diff @6060; dump attacking mon / hero adjacency /
  `mattacku` branch before attributing to fleeck arity.
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
- **`monattk.h`: AT_WEAP=254, AT_MAGC=255, AT_SPIT=10** — never use 10 for
  weapon (D-0179).
- Hostile `m_move`: before place, `m_digweapon_check` may return
  MMOVE_DONE (wield pick/axe); hero-square returns MMOVE_NOTHING so
  dochug can `mattacku` (D-0180).

## Landmarks

- STAIRS glyph: `known_branch_stairs(stairway_at)` → CLR_YELLOW;
  else CLR_GRAY (tty NO_COLOR); direction from `ladder & LA_DOWN`
  (D-0162). Dlvl1 upstairs is traversed branch.
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
- `clear_level_structures` / `goto_level`: clear `fobj` **and**
  `_objects_at` (C `level.objects[][]=0`) and `head_engr` (D-0161).
- Monster ROCKTRAP: `t_missile(ROCK)`→`mksobj` `next_ident`+`rn1(6,6)`
  then `thitm(..., d(2,6))`; seetrap only if `canseemon` (D-0181).
- Hostile `m_move` should_see: `couldsee(omx,omy) && (goal.lit ||
  !mon.lit) && dist2<=36`; else `can_track`→`gettrack` redirects gg
  (D-0181).
- `goto_level` must `initrack` like C savelev release (D-0181).
- `can_track` ≡ `haseyes` (Excalibur named omission) (D-0181).
- Hostile getitems: `(!peaceful || !rn2(10))` + `!Rogue` →
  `m_search_items` may redirect gg to floor loot (D-0182).
- Underfoot loot claim in `m_search_items` → DONE + `mpickstuff`
  (D-0223); distant redirects still set gg.
- `can_carry`: peaceful non-pets return 0 (D-0183); **quan>1 → 1 only
  for `M1_NOHANDS` non-glomper** — hands monsters take full stack
  (D-0186).
- Offensive potions: `mattacku`→`find_offensive`/`use_offensive` before
  AT_WEAP; `m_throw` POTION→`potionhit` (not `thitu`); vapor
  `makeknown` needs flight `observe_object` (D-0184).
- Digger postmov: `tunnels` && !Rogue → `can_tunnel`; `ALLOW_DIG` in
  mfndpos; every moved digger with `may_dig` calls `mdig_tunnel` which
  **always** burns `rnd(12)` first (D-0178).
- Mines `fill_lvl`/`makemaz(minefill)` + dungeon align `&7` (D-0171).
- **postmov MOVED|DONE must `mpickstuff`** — without it floor loot
  stays and later `m_search_items` gg diverges silently (same RNG
  signature, different dest) (D-0185).
- **`weapon_hit_bonus(NULL)` bare-hand unskilled = +1** (not 0);
  Monk/Samurai martial `rnd(4)` barehands (D-0187).
- **`hitum` must call `passive`** — live `malive && !mcan && rn2(3)`
  even when AT_NONE is a NO_ATTK filler (D-0188).
- **`objects[].oc_wsdam`/`oc_wldam` extracted** — do not revive name→sdam
  stand-in defaults (D-0189).
- **`mdamageu` must `done_in_by` not `losehp`** — C never routes monster
  kill blows through `losehp`; `can_make_bones` lives in `really_done`
  (D-0190). `runSegment` must stop on `gameover`.
- **`xkilled` must `make_corpse` when `corpse_chance`** — not burn-only
  (D-0191). Treasure `mkobj(RANDOM_CLASS)` still deferred.
- **`,` → `dopickup`** with menu AUTOSELECT_SINGLE for one floor object
  (D-0192); multi-object query_objlist still deferred.
- **CORPSE `eatcorpse`** rotting `rn2(20)` + `start_eating`/`eatfood`
  occupation (D-0193); `mons[].cwt`/`cnutrit` extracted; Monk form
  fails `carnivorous` so palatable skips `rn2(10)`.
- **^X weapon_insight:** `empty_handed()` uses `uarmg`→"empty handed";
  skill line uses real `P_SKILL` + martial `P_NAME` (D-0194).
- **NHW_MENU must flush NEED_MORE** before paint (D-0195); nhgetch
  marks NEED_MORE→NON_EMPTY not EMPTY.
- **CANDY_BAR `mksobj_init`:** `assign_candy_wrapper` → `spe = 1 +
  rn2(12)` before quan `!rn2(6)` (D-0196).
- **`dogfood` CORPSE:** lichen/vegan → `herbi ? CADAVER : MANFOOD` (not
  always CADAVER); age poison skips lizard/lichen/fungus-pet; acidic/
  poisonous → POISON (`resists_*` stubbed false) (D-0197).
- **`hitmu` must `mhitm_adtyping`** — AD_ELEC → `mhitm_mgc_atk_negated`
  `rn2(10)` + destroy_items gate `rn2(20)`; PHYS keeps prior path
  (D-0198). Other adtyps still zero-out.
- **`monnear`:** `dist2<3`, but `dist2==2 && NODIAG(PM_GRID_BUG)` →
  false (D-0199). Do not use bare `distmin<=1` for grid bugs.
- **Themed rectangular rooms:** "Default/Unlit/Both … themed fill" must
  `create_room(THEMEROOM)` then `themeroom_fill` (D-0200). Mimic
  `makemon` burns `set_mimic_sym` before invent; Storeroom `appear_as`
  overrides afterward.
- **`mkshop`:** eligible OROOM + doorct==1 + `!invalid_shop_shape` +
  `rnd(100)` shtypes + `rtype=SHOPBASE+i` + `needfill` before fillable
  countdown (D-0201).
- **`maketrap` ROLLING_BOULDER:** `mkroll_launch`→`find_random_launch_coord`
  `rn1(5,4)`+`rn2(8)` + `isclearpath` both ways; fail → launch at trap
  (victim skipped) (D-0202).
- **`stock_room`/`shkinit`:** `makemon(PM_SHOPKEEPER,MM_ESHK)` + shopkeeper
  `m_initinv` kit + `rnd_misc_item` + `mkmonmoney` + tribute
  `rnd(stockcount)` novel + `mkshobj_at`/`get_shop_item` (D-0203).
  `shkveg`/health-food and Izchak still deferred.
- **`dosounds`:** after vault, roll beehive/morgue/barracks/zoo/**shop**/
  temple/oracle gates; shop always `return`s when gate hits (D-0204).
  **Vault gate hit:** `search_special(VAULT)` + `gd_sound`→`rn2(2)+hallu`
  then return (D-0208); You_hear plines / gold_in_vault still deferred.
- **`m_move` isshk/isgd/ispriest:** call `shk_move`/`gd_move`/`pri_move`
  before getitems; peaceful shk near home often returns 0 with no RNG
  (D-0205). `gd_move`/`pri_move` bodies still stubbed.
- **`movemon_singlemon` hiders:** after deducting NORMAL_SPEED, if
  `is_hider` and (`M_AP_OBJECT`/`M_AP_FURNITURE` or `mundetected`),
  skip `dochug` (D-0206). `restrap`/`hideunder`/`minliquid` still deferred.
- **`do_attack` disguised mimic:** `attack_checks`→`stumble_onto_mimic`
  →`that_is_a_mimic`/`object_from_map` `mksobj(FALSE)` `next_ident`
  **before** `overexertion` (D-0207).
- **`gd_sound`:** `!(vault_occupied(urooms) || findgd())`; `urooms`
  maintenance and `findgd` migrating_mons still deferred (D-0208).
- **`make_grave`:** null str → `get_rnd_text(EPITAPHFILE)` (chunk
  24075) + HEADSTONE; bell str skips draw (D-0209). Contest provenance
  may mis-attribute pointer-`rn2` calls to an unrelated `rn2` site.
- **Elf Instrument:** `ROLL_FROM(trotyp)` is eager at array construction
  (before `ini_inv`/`trquan`); lazy `trotyp()` reorders RNG (D-0210).
- **Pet `dog_move` selection `rn2(12)`:** each worse `mfndpos` candidate
  with `appr!=0 && !whappr` (D-0211). Extra candidate ⇒ fleeck arity split.
- **Knight pony:** `makedog` `NO_MINVENT` then `put_saddle_on_mon(NULL)`
  → `mksobj(SADDLE)` (D-0212); domestic `!rn2(100)` in `makemon` same helper.
- **`#ride`/`doride`/`mount_steed`:** slip gate `ulevel+mtame < rnd(20)`;
  fatal slip → `done`/`can_make_bones`; clear `umoved` before rhack
  (D-0213). `dog_goal` returns -2 for `usteed`.
- **`pet_color` ≡ `mons[].mcolor`** — never force white for all tame;
  `hilite_pet` is tty attr only (D-0214). Riding → steed mlet+color;
  botl `Ride`; `x_monnam` `"saddled "` when `W_SADDLE`.
- **Tutorial PICK_ONE:** invalid letter stays open; space/return with no
  pick → rebuild + Please choose (D-0215).
- **`really_done`:** `flush_topl_more` then `disclose` possessions yn
  before returning (D-0216); `pline("You die...")` alone does not wait.
- **Mounted `mattacku`:** before hero melee, `rn2(is_orc?2:4)` may redirect
  to `mattackm(mtmp, usteed)` + steed retaliation; steed never attacks
  rider; `m_at` skips `usteed` (D-0217).
