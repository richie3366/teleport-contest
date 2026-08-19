# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1255 glob / doname CXN (review **212**
  cadence **#1590** `d384e339`). Next: Open landmine·pit mid-roll
  (named from D-1237). Not rolling-boulder TELEP. Do not skip
  D-1255…D-1229. Do not pull nopick m-dir / hitfloor `dropz(TRUE)` /
  mimic unhide / AT_ENGL gulpum / fight_empty `explum` / altwep /
  `gelcube_digests` / ALLOW_BARS rust / unported `mhitm_ad_*`
  `pline_mon` / mhitu `hitmsg` / `dmgval` silver / doname EGG.
  Do not wrap `msg_mon_movement` as `pline_mon`. No FORCE.
- Do not revert D-1217–D-1255. Named omits stay map, not Must-fix.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1255.
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
- Do not skip D-1071…D-1255 (index). Named still: landmine·pit;
  nopick m-dir; mimic unhide; hitfloor `dropz(TRUE)`; AT_ENGL gulpum;
  fight_empty explum; `gelcube_digests`; mhitu `hitmsg`;
  `dmgval` silver; doname EGG. Do not “fix” seed0383 with ALIGN/FORCE.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / vision.c `notice_all_mons` /
  `makemap_prepost` / `wiz_makemap` / `restore_artifacts`.
  Default `spot_monsters`/`glyph_updates`/`mon_movement` Off.
  Do not treat `dothrow` `game.thrownobj` as wired (review **172**).
  Do not Must-fix `DIR_UP`/`DIR_DOWN` const swap (review **178**).

## Landmarks (≤15)

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
- D-1247: postmov IRONBARS eat/`dissolve_bars`/Norep. ALLOW_BARS named.
- D-1246: `bee_eat_jelly` + grow_up killer-bee `!victim` → queen.
- D-1245: `domove` hideunder after tread. mimic unhide named.
- D-1244: gulpmm AD_DGST eat. gulpmu invent / Medusa named.
- D-1243: gulpmm `!goodpos` return-home.
- D-1242: gulpmm `snuff_lit` minvent.
- Review **212–215** (212 QUALITY-RISK, D-1254). Cadence **#1590**
  **44**/44. Next audit @**#1595**.
