# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1278 `dungeon.c` `u_on_rndspot`
  after place `switch_terrain` (reviews **233–236** cadence **#1615**
  `b166de10`). Next: Open `objnam.c` wish `switch_terrain`
  (named from D-1129). Not doname EGG. Do not skip D-1278…D-1229.
  Do not pull skipdrin / pit kick / missmu / mattacku AT_TENT /
  explmu / AT_HUGS / unported `mhitm_ad_*` `pline_mon` / MEAT_RING /
  candle `partly used` / swap-with-pet `seemimic` / Blind unseen
  boulder feel / throwit returning_missile / swallow / slip /
  stamina / steed potion / objnam wish / `maketrap` PIT/HOLE
  `set_levltyp` / Underwater bars / rock Passes_walls / `meatobj` /
  meatcorpse / find_trap cls / muse `display_self` / On_W_tower /
  sstairs / cmd wiz. Do not wrap `msg_mon_movement` as
  `pline_mon`. No FORCE.
- Do not revert D-1217–D-1278. Named omits stay map, not Must-fix.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1276.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483).
- Don't skip painting spaces or emit mid-row space runs >4 (D-0931).
- Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
- Do not blanket-restore overlay `_pending_message` (D-0929).
- Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not push shared `maketrap` PIT morph (D-0972).
- Do not memcpy gi worn/ball pointers (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053).
- Do not restore tut-1 hardcoded keys (D-1065) / skip `tutorial()`
  nhcore (D-1066) / dosit `"your steed"` (D-1067) / skip hider clear
  (D-1068) / Levitation-only `dosit` (D-1069) / sticky `u.Levitation`
  in `can_reach_floor` (D-1070).
- Do not skip D-1071…D-1278 (index). Named still: skipdrin /
  pit kick; missmu/explmu; doname MEAT_RING / candle `partly used`;
  launch_obj down_gate / boulder-chain; `meatobj` / meatbox /
  meatcorpse; objnam wish; `maketrap` PIT/HOLE `set_levltyp`;
  Underwater bars / rock Passes_walls; Blind unseen boulder feel;
  throwit returning_missile / swallow / steed potion; find_trap
  cls / muse `display_self`; swap-with-pet `seemimic`; On_W_tower
  / sstairs / cmd wiz. Do not “fix” seed0383 with ALIGN/FORCE.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / vision.c `notice_all_mons` /
  `makemap_prepost` / `wiz_makemap` / `restore_artifacts`.
  Default `spot_monsters`/`glyph_updates`/`mon_movement` Off.
  Do not treat `dothrow` `game.thrownobj` as wired (review **172**).
  Do not Must-fix `DIR_UP`/`DIR_DOWN` const swap (review **178**).

## Landmarks (≤15)

- D-1278: `dungeon.c` `u_on_rndspot` after `place_lregion` →
  `switch_terrain` (C `:1636–1637` unconditional). ROOM/AIR/CORR
  landing clears leftover BLev/BFly FROMOUTSIDE. On_W_tower_level
  / stairs `u_on_sstairs` / cmd wiz named. **objnam wish named.**
- D-1277: `dothrow.c` `hurtle_step` dest-typ ≠ origin after
  `flush_screen` → `switch_terrain` (C `:916–917`). ROOM→ROOM skips;
  STONE→ROOM clears leftover BLev/BFly FROMOUTSIDE; WATER/LAVAWALL
  block. Drown / check_special_room / traps / Passes_walls named.
- D-1276: `objnam.c` `doname_base` FOOD EGG — `ismnum(corpsenm)` and
  `(known || MV_KNOWS_EGG)` prepend `pmnames[NEUTRAL]`; `spe==1`
  `(laid by you)` after named. Generic/`#if 0` stale stay "an egg".
  MEAT_RING / candle `partly used` still named.
- D-1275: `display.h` `display_self` U_AP_TYPE — `maybe_display_usteed`
  then NOTHING `hero_glyph` / FURNITURE `cmap_to_glyph(mappearance)` /
  OBJECT `objnum_to_glyph` (not Hallu) / MONSTER `monnum_to_glyph`.
  `newsym` / `swallowed` / detect `monster_detect`. find_trap cls /
  muse / gender offsets / swap-with-pet `seemimic` still named.
- D-1274: `dothrow.c` `toss_up` + throwit `u.dz` — `t`+`<` `rn2(5)&&!Underwater`
  hits ceiling or the hero's head (potionhit / breaktest splat /
  harmless / dmgval+helmet / petrify `elementary physics`). getdir
  `<>` set dz. Downward `hitfloor(TRUE)`. returning_missile /
  swallowit / slip / stamina / steed potion still named.
- D-1273: `pickup.c` `tipcontainer` highdrop — `!can_reach_floor(TRUE)`
  (swallowed clears) then `how_lost=LOST_DROPPED` + `hitfloor(TRUE)`.
  Non-highdrop keeps fortress colon+`place_object`. Altarizing
  `doaltarobj` / dropy terse list / invent getobj tip still named.
  **toss_up D-1274**.
- D-1272: `invent.c` `hold_another_object` drop_it — Fumbling /
  invlet overflow / encumbrance>`pickup_burden` (cursed LOADSTONE
  excepted) then `dropx` if `can_reach_floor||uswallow` else
  `freeinv`+`hitfloor(FALSE)`. Autoquiver on stay. Fatal wished
  corpse / artifact dropy still named. **toss_up D-1274**.
- D-1271: `mon.c` `meatmetal` — non-pet metallivore eats top metallic
  floor object (`obj_resists(5,95)` + `touch_artifact`); rust monster
  skips !rustprone / rustproof spit+stun; leftover ROCK `rnd(25)<3`.
  Caller `postmov` OBJ_AT. meatobj / meatcorpse still named.
- D-1270: `hack.c` hero `test_move` IRONBARS — Passes_walls ||
  `passes_bars(youmonst.data)` allow; DO_MOVE rust/corr/metallivore
  `still_chewing` then occupy if done. Underwater obstacle /
  generic rock Passes_walls / tunnels / autodig still named.
- D-1269: `dig.c` `digactualhole` PIT after `wake_nearby` and
  HOLE `at_u` → `switch_terrain` then Lev/Fly re-read. C
  `maketrap` PIT/HOLE `set_levltyp` STONE/SCORR→CORR still named
  (STONE stay blocklev). **hurtle D-1277**; **u_on_rndspot D-1278**;
  objnam wish named.
- D-1268: `hack.c` `spoteffects` dest-typ ≠ origin or
  `iflags.terrain_typ == MAX_TYPE` → `switch_terrain` before
  `pooleffects`.
- D-1267: `hack.c` `set_uinwater` — in_out ≠ (int)uinwater writes
  0/1 then `switch_terrain`. boulder_hits_pool dry-land, drown
  fail-crawl, goto_level leave+after-getlev. pooleffects leave /
  drown Amphibious wade / zap freeze named.
- D-1266: `uhitm.c` `hmonas` altwep / `uswapwep` — first AT_WEAP
  uses uwep then toggles to uswapwep when one-handed / no shield /
  not launcher-ammo-missile / not silver+Hate_silver; re-read slot
  after known_hitum; passivedone `drop_uswapwep` if cursed.
  skipdrin / pit kick named.
- D-1265: `hack.c` fight_empty Upolyd AT_EXPL `explum(null)` +
  wake_nearto(7*7) then mh=-1 `rehumanize`; You explode-at /
  futilely. pick-dig named.
- D-1264: `uhitm.c` AT_ENGL `gulpum` + `start_engulf`/`end_engulf`
  + `hmonas` `rnd(20+i)` (was `continue` with AT_NONE). altwep
  D-1266.

