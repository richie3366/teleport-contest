# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#743:** D-0670 Pri `goal_first`/`nexttime`/`othertime` + Pri-goal
  `light_region` lava lit + `quest_portal` `deliver_by_pline`.
  Scr **305**/324 prefix **258**. RNG FULL.
- **Falsify next:** @258 intemple — C `A nearby voice intones` vs JS
  `The priest intones` (`canspotmon`/Monnam). Do not reopen D-0670.
- **Leaderboard gap:** local **34/44** vs judge **22**; D-0483 await cron.
- **Don’t:** reopen D-0474…D-0670; invent put_lregion reject; re-add
  rect roomno gate without C cite; hx=39 alone; naive add_doors;
  wear `[*?]`; stub `^V?`; empty wish ESC; skip amulet_wish; Wizard
  Norep; maze `rn2(2)` Sokoban; TELE on occupied mon; skip
  `were_change`/`m_avoid_soko_push_loc`; `dlevel` in traptype_rnd;
  hardcode PARTISAN; skip LONG_WORM/S_MUMMY; sticky `urole.rank` for
  `%r` (now `rank_of`); omit bones `utrack`; skip Blindf_on / confused
  mispronounce / wizard yn / identify `more_experienced(0,10)`;
  `vision_recalc(2)` newsym loop; D-0480 coerce; frame-align; raw
  RNG-index/coord hacks; force doorct/THEMEROOM; invent boulder-mimic
  retry (D-0605); vamp-only `select_newcham_form`; extract without
  `-DMAIL_STRUCTURES`; skip minend-1 when `makemaz` picks it; map Lua
  `"("`→WEAPON; omit `ranged_attk_available` in MMOVE_MOVED; omit
  `m_move` cnt==0 tryescape `use_defensive`; omit `hitval` `spec_abon`;
  omit mfndpos diagonal squeeze; omit `artifact_hit`/`spec_dbon` after
  dmgval; omit `on_start` nexttime/othertime after first_start; force
  all qt_pager through NHW_TEXT; raw `rn2(sx)` tower1 candles; invent
  15th Arc-goal `des.object`; stub `on_goal`; skip bigrm-7; skip getlev
  `restrap`/hide_monst viz; skip fog `m_everyturn`/cham shapeshift;
  skip movemon `restrap`; skip Arc firsttime; invent vision blank for
  getpos floor; check `flags.wizard` alone for C `wizard`; force
  mundetected on all S_SNAKE; omit `questarti` on `game.urole`; omit
  non-pit trap in makemon snake hideunder; omit `is_weptool` /
  `distant_name` / attrs Hallu… / `ublesscnt--` / gethungry case 8 /
  garlic_breath / blue DSM / Priest kit retrospectives; invent
  intemple without Pri-strt MAGIC_PORTAL; pre-set `u.urooms` in
  `teleds`; skip `#chat` MS_LEADER; omit AD_SPEL/AD_CLRC / castmu;
  omit Pri-loca/MORGUE/fill_zoo roomno/m_initinv S_DEMON…
  retrospectives; invent place_lregion for @19994/@26691; invent
  S_ANGEL/quest_portal/medusa-1; skip align_shift oldmoves / set
  moves=1 before mklev; invent goodpos pool reject for flyers; invent
  accept first Medusa statue makemon (resists_ston); invent skip
  Pri-fila morgue rooms; skip vamp decide_to_shapeshift arms; skip
  special-room enter plines (D-0660); skip W_WEP `(wielded)` (D-0661);
  skip Pri firsttime (D-0662); skip `mon_warning` (D-0663);
  skip `self_lookat` gender (D-0664); skip TREE defsym (D-0665);
  skip altar_color (D-0666); skip `see_monsters` in teleds (D-0667);
  skip Pri-loca map lit clear (D-0668); skip `tp_sensemon` (D-0669);
  skip Pri goal/`quest_portal` pline/lava lit (D-0670);
  globalize `sel_set_ter(false)`.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0670 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**.
- D-0602: playmode:debug → `flags.debug`; pick_room must test it (≡C wizard).
- D-0658: hx=39 alone or link_doors + rect roomno gate → @14403;
  door skips + C-faithful fill (no rect roomno) required together.
- D-0665: TREE typ with non-blank `disp_ch` still needs cmap `"tree"`.
- D-0666: altar `{` color is altarmask (unaligned→RED), not DEC alone;
  `diffCell` ignores decgfx for `{` (not in DEC_MAP).
- D-0667: Warning floats are gbuf-only; `teleds` needs `see_monsters`
  so out-of-range warns clear before materialize `--More--`.
- D-0668: global `sel_set_ter(false)`≡C clears lit → seed0009 FAIL;
  Pri-loca-only SpLev_Map clear is the safe envelope.
- D-0669: @203 C W/blank/& vs warn is telepathy (ESP), not nv_range;
  ghost physical glyph is `' '`; zombies mindless → still Warning.
- D-0670: Pri-goal unlit region must use `light_region` (lava stays lit);
  `quest_portal` is explicit `output=pline` (not newline→window).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361**
  **PASS** (suite **34/44** @#740; Scr 7021 RNG 465040 / 58.66%).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest: seed0367 RNG FULL Scr 305; @258 intemple voice peel next.
- S_KOP / minetn-1/3–7 / **medusa-2/3/4** deferred;
  eel hideunder / I_SPECIAL deferred; SWAMP deferred;
  `temperature_shift` stub; worn/artifact STONE_RES deferred;
  youmonst pool·lava / passes_walls in goodpos deferred;
  exclusion_zones save/rest deferred.
- Rolling boulder: `launch_obj` + rolling-boulder trap (D-0599).
- C: `#define wizard flags.debug`. SPECIAL_PM=330 needs MAIL_DAEMON.
- defsym: `')'`=WEAPON, `'('`=TOOL; Arc-goal **14** `des.object()`.
- Quest `"M"`→S_MUMMY; `"m"`→S_MIMIC. Python S_SNAKE !M1_CONCEAL.
