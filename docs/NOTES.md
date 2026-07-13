# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** seed0103 Scr residual after D-0213 RNG-full ride; or
  seed0104 @2841 `mattacku` while mounted; or D-0211 typ dump.
- **Hypothesis (seed0103 Scr):** riding display/botl/map under `usteed`
  (RNG **2640**/2640; Scr **2**/60; strict short 58 vs 60 screens).
- **Hypothesis (seed0104 @2841):** C `mattacku` `rn2(2)` vs JS extra
  `mcalcmove`/`dog_move` while mounted — check steed movement skip /
  hero-under-steed attack path after D-0213.
- **Hypothesis (D-0211):** kitten `dog_move` — JS `mfndpos` includes SW
  that C skips; poison-gas falsified; need C typ dump.
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
- **seed0030 @13987 was NOT missing dig/`rnd(12)` alone** — C
  `trapeffect_rocktrap` `t_missile(ROCK)`→`next_ident`; JS dwarf walked
  to (28,6) (D-0181).
- **Hostile gettrack without `goto_level` initrack is wrong** — stale
  prior-level tracks redirect newt @10676; C `savelev`→`save_track`→
  `initrack` clears on leave (D-0181).
- **Dwarf @13987 is NOT missing gettrack redirect** — no adjacent track
  in current-level ring (3 cells) nor in full stale ring (D-0181).
- **Dwarf @13987 was missing `m_search_items`** — ROCKTRAP (27,6) pile
  (CORPSE/SLIME_MOLD/glass) redirects gg; mux-nearer dig (28,6) loses
  (D-0182). Do not re-chase mfndpos exclude of (28,6).
- **@14026 was NOT actor-order / cnt drift** — PM_GNOME @(57,11) on
  WORTHLESS_BLUE_GLASS returned underfoot `MMOVE_DONE` (JS postmov
  ignored DONE→no mpickstuff) while C continued to mtrack `rn2(28)`
  (D-0183). Do not re-chase fleeck actor skips.
- **@14056 was NOT wrong catch_chance / DEX** — JS never reached
  `u_catch`; C threw via `muse` `use_offensive` POT_SLEEPING while JS
  `thrwmu` ARROW + URETREATING `rn2(5)` aborted (D-0184). Do not
  “fix” catch_chance from the coincident `rn2(5)` values.
- **`potionhit` must `obfree` not `delobj`** — `delobj` burns
  `obj_resists` `rn2(100)`; C `obfree` does not (D-0184).
- **`makeknown` after vapor needs flight `observe_object`** — thrower
  `!cansee` still IDs potion when missile crosses visible cells (D-0184).
- **@14118 was NOT missing wall openers / join / dig / pass_two** — C
  also has TRCORNER/BRCORNER at `(56,9)/(56,10)` with cnt=6 when gnome
  is at `(57,10)`. Real split: silent gg after `(59,8)` — C `gg=(59,12)`
  vs JS `gg=(57,11)` because JS never `mpickstuff`’d floor glass
  (D-0185). Do not FORCE-open walls or re-peel mkmap.
- **@14151 was NOT missing distfleeck** — PM_GNOME hands + quan=2
  WORTHLESS_VIOLET_GLASS: JS `can_carry` always returned 1 for quan>1 →
  `splitobj`/`next_ident`; C only returns 1 for `M1_NOHANDS` (D-0186).
- **@14231 was NOT missing second-hit / double_punch** — Tourist bare
  hands: JS `weapon_hit_bonus` stubbed 0 vs C unskilled b.h. **+1**, so
  `tmp<=dieroll` miss while C hit→`exercise` (D-0187). Do not re-chase
  distfleeck-before-hit theories.
- **@14235 was NOT missing distfleeck** — after a live hit, C `hitum`
  always calls `passive` which burns `rn2(3)` for any AT_NONE slot
  (incl. NO_ATTK fillers) when `malive && !mcan` (D-0188).
- **@14296 was NOT missing dmgval switch alone** — stand-in map defaulted
  missing otyps to `rnd(1)`; C `objects[].oc_wsdam` for BULLWHIP/
  WORM_TOOTH is **2** (D-0189). Extractor already had the fields unread.
- **@14299 was NOT JS survival** — HP did go to 0 via `losehp`; missing
  was `done_in_by`→`can_make_bones` + stopping `runSegment` (D-0190).
  Do not re-chase `dmgval`/knockback damage amounts.
- **@3387 was NOT missing treasure `mkobj`** — `rn2(6)=3` skipped
  treasure; C then `make_corpse`→`next_ident` while JS only burned
  `corpse_chance` (D-0191).
- **@3547 was NOT missing distfleeck / fleeck gate** — JS unbound `,`
  (unknown, move=0) skipped the pickup turn; next keys raced to Ctrl-D
  `dokick`→`exercise` `rn2(2)` while C `dopickup`→monsters→`distfleeck`
  (D-0192). Do not re-chase fleeck/APPORT for this index.
- **@3565 was NOT missing exercise / fleeck** — JS refused CORPSE; C
  `eatcorpse` (D-0193). Monk form is not carnivorous → no palatable
  `rn2(10)`.
- **seed0200 Scr residual was NOT guilty+taste topline join** — ^X
  attributes: hardcoded "bare handed"/"unskilled bare handed combat"
  vs C `empty_handed()` (gloves→empty) + `P_BASIC` martial arts
  (D-0194).
- **seed0101 Scr residual was NOT tip PICK_NONE key loop alone** — tip
  painted without C's NHW_MENU `NEED_MORE` flush; travel pline
  `--More--` skipped (D-0195). `mark_topline_seen` must be NON_EMPTY
  not EMPTY.
- **seed0030 seg1 @1238 was NOT missing quan/`rn2(6)` alone** — FOOD
  `CANDY_BAR` must `assign_candy_wrapper` (`rn2(12)`) before quan
  (D-0196). Do not re-chase fill_ordinary_room order for that index.
- **seed0030 seg1 @3347 was NOT missing APPORT/`can_carry`/`m_cansee`**
  — lichen CORPSE: JS `dogfood` returned CADAVER; C vegan(fptr)→MANFOOD
  so `dog_goal` APPORT branch rolls `rn2(8)` (D-0197).
- **seed0030 seg1 @3466 was NOT missing passive `rn2(3)`** — grid bug
  AD_ELEC: C `mhitm_adtyping`→`mhitm_ad_elec` burns `mhitm_mgc_atk_negated`
  `rn2(10)` then destroy_items gate `rn2(20)`; JS `hitmu` only did PHYS
  (D-0198). Do not re-chase knockback-before-adtyping.
- **seed0030 seg1 @3497 was NOT position drift / wrong actor order** —
  grid bug diagonal to hero: JS `monnear` used `distmin<=1` so nearby→
  `mattacku`; C `monnear` returns 0 when `dist2==2 && NODIAG` so
  want_move→`m_move` (D-0199). Do not re-chase mux/hero coord theories
  for that index.
- **seed0030 seg1 @3870 was NOT wrong create_room args / next-room
  reservoir** — pick was "Default room with themed fill"; JS never called
  `themeroom_fill` after `create_room` (D-0200). Do not re-chase litstate
  or nhlib shuffle for that index.
- **seed0030 seg1 @5220 was NOT missing stock_room first** — JS skipped
  eligible shop rooms without `rnd(100)`/`rtype`, so fillable count was
  `rn2(7)` vs C `rn2(6)` after shop claim (D-0201). Do not skip
  `invalid_shop_shape` when porting.
- **seed0030 seg1 @5255 was NOT arrow/dart launch** — `traptype_rnd`
  `rnd(25)=7` is `ROLLING_BOULDER_TRAP`; C `maketrap`→`mkroll_launch`→
  `find_random_launch_coord` `rn1(5,4)`/`rn2(8)` while JS jumped to
  victim `rnd(4)` (D-0202).
- **seed0030 seg1 @5381 was NOT mineralize early** — C `fill_special_room`
  → `stock_room`→`shkinit`→`makemon(PM_SHOPKEEPER)` `next_ident`; JS
  skipped stocking (D-0203). Do not re-chase vault `rn2(200)` order.
- **seed0030 seg1 @6561 was NOT gethungry/`rn2(20)` arity** — after shop
  stock, C `dosounds` rolls `has_shop` `rn2(200)` (sounds.c:313); JS
  stopped after vault so `gethungry` landed early (D-0204). Do not
  re-chase vault-only dosounds.
- **seed0030 seg1 @6565 was NOT fleeck arity / wrong first actor** — C
  `m_move`→`shk_move` for isshk (return 0, no RNG) then second fleeck;
  JS burned peaceful getitems `rn2(10)` (D-0205). Do not re-chase
  meating/`dog_goal` apport for that index.
- **seed0030 seg1 @6568 was NOT leftover ant movement allotment** — C
  shopkeeper mmove=16 got +24 and acted twice (2 fleecks×2); disguised
  mimics (`is_hider`+`M_AP_OBJECT`) deduct movement **without** `dochug`.
  JS called `dochug` on mimics → extra fleecks before EOT (D-0206).
  Do not re-chase fmon-order / mcalcmove assignment for that index.
- **seed0030 seg1 @7007 was NOT missing EOT spawn / wipe_engr** — key
  `n` into chest-mimic: C `attack_checks`→`stumble_onto_mimic`→
  `object_from_map`/`mksobj(FALSE)` `next_ident` before overexertion;
  JS went straight to `overexertion`→`gethungry` (D-0207). Do not
  re-chase gethungry/wipe after matched EOT for that index.
- **seed0030 seg1 @7189 was NOT missing shop/`gethungry`** — vault gate
  `rn2(200)=0` requires `gd_sound`→`rn2(2)+hallu` before return; JS
  early-returned without the message roll (D-0208). Do not re-chase
  beehive/shop order for that index.
- **seed0030 seg2 @1272 was NOT room-height / create_room / somey** —
  C `rn2(24075)` is `get_rnd_text(EPITAPHFILE)` via `rn2` function
  pointer (provenance mis-attributed to somey); JS `make_grave` stub
  skipped epitaph (D-0209). Do not re-chase somexy room bbox.
- **seed0030 seg2 @2217 was NOT Xtra_food / skipped elf branch** — C
  `ROLL_FROM(trotyp)` at Instrument construction (before `ini_inv`→
  `trquan`); JS deferred `rn2(6)` inside lazy `trotyp()` after `trquan`
  so order was `rn2(1)` then `rn2(6)` (D-0210). Do not re-chase orc
  `Xtra_food` for Wizard-elf.
- **seed0030 seg2 @2408 was NOT actor-order / extra dochug** — same
  kitten `dog_move` after matched `obj_resists`×3; JS one extra
  `rn2(12)` vs C fleeck (D-0211). Do not re-chase fleeck/mcalcmove
  allotment for that index. Do not FORCE-omit cells by recorded coords
  in production.
- **seed0030 seg2 @2408 is NOT poison-gas `visible_region_at`** — no
  gas/cloud/region RNG provenance anywhere in seg2 before 2408; JS
  dump shows empty ROOM at `(72,8)` (D-0211). Do not port gas regions
  hoping to fix this peel without a C typ dump.
- **seed0103 @2337 was NOT `trquan` order / lazy trotyp** — missing
  Knight pony `put_saddle_on_mon`→`mksobj(SADDLE)` `next_ident` after
  `makedog`/`NO_MINVENT` (D-0212).
- **seed0103 @2440 was NOT missing saddle alone** — unbound `#ride` →
  need `doride`/`mount_steed` (`rnd(20)` slip + `rn2(5)` losehp) and
  `dismount_steed`/`landing_spot`; also clear `u.umoved` before rhack
  so steed `u_calc_moveamt` does not double-`mcalcmove` (D-0213).
- **`monattk.h`: AT_WEAP=254, AT_MAGC=255, AT_SPIT=10** — never use 10 for
  weapon (D-0179).
- Hostile `m_move`: before place, `m_digweapon_check` may return
  MMOVE_DONE (wield pick/axe); hero-square returns MMOVE_NOTHING so
  dochug can `mattacku` (D-0180).

## Landmarks

- STAIRS glyph: `known_branch_stairs(stairway_at)` → CLR_YELLOW;
  else CLR_GRAY (tty NO_COLOR); direction from `ladder & LA_DOWN`
  (D-0162). Dlvl1 upstairs is traversed branch.
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
- Underfoot loot claim in `m_search_items` deferred until
  postmov `mpickstuff` (D-0183); distant redirects still set gg.
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
