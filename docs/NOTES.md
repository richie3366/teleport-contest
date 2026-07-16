# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **D-0571 done:** `movebubbles` air_pos stamps `remembered_glyph`
  S_cloud (`#`/CLR_GRAY); `setup_waterlevel` S_air/S_water memory;
  `terrain_glyph` AIR/CLOUD. seed0373 Scr **111→122**/124; @110 Air
  map matches. Do **not** omit air_pos glyph (docrt paints lev->glyph).
- **seed0373 next:** @118 enlightenment Background — C
  `endgame, on the Elemental Plane of Air` vs JS wrong dungeon line;
  @119 attributes score page. Falsify: `insight.c`
  `background_enlightenment` / `describe_dungeon`.
- **seed0116 residual:** screen/cursor miss (113/127) after full RNG.
- **D-0515 residual:** seed5006 still @8468 `dosounds` (RNG 8508).
- **#630 score:** **30/44**, Scr **6378**/11405, RNG **353648**
  (44.61%), `31+0.15/turn`. D-0569…71 after #630 — refresh at %5.
- **Leaderboard gap:** local **30/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch cron for seed0013 restore.
- **Gameplay next:**
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0373-barbarian-quest-tour.session.json
  node scripts/rng-diff.mjs sessions/seed5006-tourist-stress-disaster.session.json
  node frozen/ps_test_runner.mjs sessions/seed0116-wizard-wear-shop.session.json
  ```
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel; batch doset toggle plines (D-0499);
  steal hero cursor for leftover getobj text in `flush_screen`;
  reopen D-0474…D-0571; stub-cancel `^V?` as if menu (breaks 0373);
  treat empty wish ESC as cancel (C → `any` random); skip amulet_wish
  once-per-input; skip Wizard appear Norep / hot temperature msg
  (More key timing for wish getlin); template `\.` in map strings;
  burn maze `rn2(2)` in `set_mimic_sym` on Sokoban; fill inside
  `load_special` loaders; accept TELE on occupied mon cell;
  skip `were_change` in `m_calcdistress`; stub `m_avoid_soko_push_loc`;
  skip Bar-strt after randline; skip onquest firsttime/on_locate nhl
  shuffle; treat noteleport as blocking covetous (Vlad); compare `mons()`
  objects by reference in pickvampshape (use mndx); use `dlevel` in
  `traptype_rnd` (must be `level_difficulty`); stub S_TROLL m_initweap;
  skip In_quest `*-fila`/`*-filb`; leave stale `splev_*` after map load;
  skip quest `rndmonst_adj`→`qt_montype`; skip EGG `attach_egg_hatch_timeout`;
  skip WEB `makemon(PM_GIANT_SPIDER)` when `!MKTRAP_NOSPIDERONWEB`;
  always return SCR_EARTH on `rnd_offensive_item` case 0;
  skip `MON_AT`→`enexto` in `splev_create_monster`; skip mineralize
  In_quest gold/gem divide; skip STATUE_TRAP `mk_trap_statue`;
  skip `bigrm-8` when `rnd(13)=8`; hardcode PARTISAN for soldier
  polearm (must `rn1` + skill filter); skip S_HUMAN `is_elf` kit;
  skip S_QUANTMECH `m_initinv` `rn2(20)` SchroedingersBox;
  skip `soko1-2` when `makemaz` `rnd(2)=2`; skip LONG_WORM `initworm`;
  treat fill_zoo `rn2(100)` @25654 as missing gold roll (D-0545);
  skip S_MUMMY `rn2(7)` wrapping; skip `soko2-1` / `soko3-*` / `soko4-2`;
  accept DRY `get_location` on boulder cells; skip soko4 hardfloor /
  SCR_EARTH / branch levregion; skip endgame Amulet grant on `^V?`
  force_dest (D-0549); omit endgame `level_difficulty` / fire.lua
  (D-0550); burn `d(m_lev,8)` for adult dragons in endgame (D-0551);
  always DRY-place fire-plane flyers/lava-likers (D-0552);
  skip S_GIANT `m_initinv` gem/`WAN_DIGGING` (D-0553);
  burn `d(m_lev,8)` for golems (D-0554); single-loop WET search for
  amphibious before DRY (D-0555); stub S_LIZARD salamander weap
  (D-0556); leave sticky `g.Sokoban` after leaving Sokoban (D-0557);
  skip endgame `resurrect` Wizard on newdungeon+amulet (D-0558);
  reject all In_endgame `level_tele` (must `llimit+newlev`); skip
  `air.lua` / `setup_waterlevel` / `movebubbles` boing `rn2(20)`;
  skip air_pos S_cloud glyph stamp (D-0571); sticky `urole.rank=title[0]`
  on botl (must `rank_of`); omit tty_end_menu blank after
  `print_dungeon` prompt; emit `Dlvl:depth` on quest (must `Home
  dunlev`); Unicode-convert DEC `g`/`|` in scoring grid (must keep raw
  like `{`/`\``); lit bigrm interior without `light_region` wall expand;
  skip spider/snake `hideunder` after `mkobj_at`; leave stalker/black
  light visible; map extractor `HI_LORD`→13 (must CLR_MAGENTA=5); skip
  Sokoban `premap_detect`/`solidify_map`/`fix_wall_spines`; Sokoban
  walls CLR_GRAY (must CLR_BLUE); iterate only `ftrap` for premap;
  Options `clear_committed_status` on fullscreen pick (breaks 0012);
  skip CORPSE article in doname (breaks 1500); global
  `sel_set_ter(false)` force-unlit (breaks seed0009).

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0571 done.
- Runner `Screen N/M` = total matches, not prefix length.
- getbones `rn2(3)` gap was unbound level change — D-0515/18.
- D-0519…D-0571 makemaz/endgame/air_pos/rank/menu — see index.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- seed0006/0007/0398 **PASS**; LB gap 14 cells / 4 sessions.
- #630 score: **30/44**, Scr 6378, RNG 353648 (44.61%).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- wizgenesis flags=5 — do not add to EXT_CMD_AC.
- seed0373 RNG **full**; Scr **122**/124 after D-0571; next @118.
