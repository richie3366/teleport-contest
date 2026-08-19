# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1258 `passes_bars` ALLOW_BARS (reviews
  **216–219** cadence **#1595** `466adf3e`). Next: Open
  `hack.c` `switch_terrain` from `dissolve_bars` (named from D-1247).
  Not ALLOW_BARS. Do not skip D-1258…D-1229. Do not pull nopick
  m-dir / hitfloor `dropz(TRUE)` / mimic unhide / AT_ENGL gulpum /
  fight_empty `explum` / altwep / hero `test_move` `passes_bars` /
  unported `mhitm_ad_*` `pline_mon` / mhitu `hitmsg` / doname EGG.
  Do not wrap `msg_mon_movement` as `pline_mon`. No FORCE.
- Do not revert D-1217–D-1258. Named omits stay map, not Must-fix.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1258.
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
- Do not skip D-1071…D-1258 (index). Named still: nopick m-dir;
  mimic unhide; hitfloor `dropz(TRUE)`; AT_ENGL gulpum; fight_empty
  explum; mhitu `hitmsg`; doname EGG; launch_obj
  down_gate / boulder-chain; `meatobj` / meatbox; `switch_terrain`;
  hero `test_move` `passes_bars`. Do not “fix” seed0383 with ALIGN/FORCE.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / vision.c `notice_all_mons` /
  `makemap_prepost` / `wiz_makemap` / `restore_artifacts`.
  Default `spot_monsters`/`glyph_updates`/`mon_movement` Off.
  Do not treat `dothrow` `game.thrownobj` as wired (review **172**).
  Do not Must-fix `DIR_UP`/`DIR_DOWN` const swap (review **178**).

## Landmarks (≤15)

- D-1258: `mondata.c` `passes_bars` + `mon.c` `mon_allowflags`
  ALLOW_BARS rust/corr/metallivore/slithy-small + ustuck subset;
  `mfndpos` W_NONDIGGABLE rust/corr skip. Hero `test_move` named.
- D-1257: `monmove.c` `gelcube_digests` first organic non-artifact
  non-prize minvent; `eaten_stat` + `extract_from_minvent` +
  `m_consume_obj` heal/`delobj`. `meatobj` / meatbox / poly still named.
- D-1256: `trap.c` `launch_obj` ROLL LANDMINE `rn2(10)>2` KAABLAMM /
  `fracture_rock`/`scatter` + PIT/SPIKED/HOLE/TRAPDOOR `flooreffects`
  + `dist=-1`. down_gate / boulder-chain / post-switch flooreffects
  still named.
- D-1255: `objnam.c` glob OBJ_NAME + xname size prefixes + doname
  CORPSE skip-article `corpse_xname(prefix, CXN_ARTICLE|CXN_NOCORPSE)`.
  EGG / MEAT_RING / candle `partly used` still named.
- D-1254: `mondata.c` `hates_silver`/`mon_hates_silver` in
  `monsters.js` (were / S_VAMPIRE / demon / shade / imp-except-tengu
  + `is_vampshifter`). Review **212**. `dmgval` silver still named.
- D-1253: `hack.c` `cannot_push` giant pickup/maneuver + `return 0`;
  Sokoban maneuver + `sokoban_guilt`; unskilled riding skips guilt.
  nopick m-dir still named.
- D-1252: `uhitm.c` `demonpet` 1/6 `ndemon` else `youmonst.data`;
  `makemon` NO_MM_FLAGS + `tamedog` FALSE. AT_ENGL/fight_empty/altwep named.
- D-1251: `uhitm.c` `explum` + hmonas AT_EXPL dhit=-1 rehumanize.
- D-1250: `uhitm.c` hmonas AT_HUGS grab/crush/throttle + `special_dmgval`.
  Silver clone D-1254.
- D-1249: `container_impact_dmg` dropz/throwit. hitfloor `dropz(TRUE)` named.
- D-1248: `mon_yells` watch_on_duty + dokick Deaf waves vs verbalize1.
- D-1247: postmov IRONBARS eat/`dissolve_bars`/Norep. ALLOW_BARS D-1258.
- D-1246: `bee_eat_jelly` + grow_up killer-bee `!victim` → queen.
- D-1245: `domove` hideunder after tread. mimic unhide named.
- Reviews **216–219** all ACCEPT-WITH-DEBT (D-1254 closed **212**).
  Cadence **#1595** **44**/44. Next audit @**#1600**.
