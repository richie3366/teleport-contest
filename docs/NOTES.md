# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1321 `objnam.c` doname W_WEP
  `body_part(HAND)` poly (cadence **#1670** `ccdc8670`; reviews
  **277–280** ACCEPT-WITH-DEBT; **275** caller is D-1315). Next:
  Open `zap.c` bhit THROWN_TETHERED_WEAPON / isqrt. Not throwit
  tether. Do not skip D-1321…D-1229. Do not pull gazemu / explmu /
  AT_HUGS / mhitu AD_DRIN / thitmonst vanish pline / dokick
  snuff_candle. Do not wrap `wildmiss` or `msg_mon_movement` as
  `pline_mon`. No FORCE.
- Do not revert D-1217–D-1321. Named omits stay map, not Must-fix.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1321.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483).
- Don't skip painting spaces or emit mid-row space runs >4 (D-0931).
- Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
- Do not blanket-restore overlay `_pending_message` (D-0929).
- Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball pointers (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053).
- Do not restore tut-1 hardcoded keys (D-1065) / skip `tutorial()`
  nhcore (D-1066) / dosit `"your steed"` (D-1067) / skip hider clear
  (D-1068) / Levitation-only `dosit` (D-1069) / sticky `u.Levitation`
  in `can_reach_floor` (D-1070).
- Do not skip D-1071…D-1321 (index). Named still: mhitu+mhitm
  AD_DRIN / AD_WRAP `m_slips_free`; explmu / AT_HUGS; mattackm
  AT_TENT; AT_ENGL gulps/lunges; zap bhit tether/isqrt.
  No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1321: `objnam.c` doname W_WEP `:1578–1595` `body_part(HAND)` +
  bimanual `makeplural` / URIGHTY; SWAPWEP `:1616`; RING `:1499`.
  Late-bind (objnam↔polyself). **AKLYS tether / warn_obj named**.
- D-1320: `objnam.c` doname POTION POT_OIL `:1488–1491` `lamplit`
  Concat `" (lit)"` (no known gate). xname bare.
- D-1319: LEASH `:1431–1445` after worn; `find_mid(FM_FMON)` skip-dead
  `" (attached to %s)"` `noit_mon_nam`; else `leashmon=0`. Worn skip.
- D-1318: TOOL W_TOOL|W_SADDLE `:1427–1429` `" (being worn)"` then
  break (skips leash/candelabrum/lamp/charges).
- D-1317: CANDELABRUM `:1447–1454` `" (n of 7 candle%s)"` +
  unlit `" attached"` / lit `", lit"`; break before lamp.
- D-1316: throwit ACURRSTR urange `:1613–1682` (crossbow 18 / owt /
  uball / ammo / hurtle / boulder / Mjollnir / underwater). **isqrt named**.
- D-1315: throwit `:1695` → `throwit_mon_hit` after swallow/bhit/boomhit.
  TRUE MINVENT shk → `throwit_return(TRUE)`. Helper D-1313.
- D-1314: `m_respond` shriek/`aggravate`/Medusa AT_GAZE (**gazemu named**)
  / Erinys. Callers dochug/boomhit/bhitm.
- D-1313: throwit_mon_hit `snuff_candle` then `thitmonst` then shk
  `hot_pursuit` (`inside_shop` / `*ushops` NUL). Lamps not snuffed.
- D-1312: thitmonst leader catch / `finish_quest` (questarti/unique/AoY;
  keep invoked unique or `!mpeaceful`). offeredit bodies named.
- D-1311: throwit tethered DISP_TETHER / BACKTRACK (`arw->tethered &&
  W_WEP`). zap bhit THROWN_TETHERED / isqrt named.
- D-1310: `kick_monster` poly AT_KICK loop `rnd(20)` /
  `special_dmgval(W_ARMF)` / `damageum`+`passive`. kickdmg named.
- D-1309: `mattacku` AT_TENT melee with claw/kick/bite. explmu /
  AT_HUGS / mhitu AD_DRIN named.
- D-1308: TOOL lamp/candle `partly used ` (`age`/peek `< 20*oc_cost`)
  + `" (lit)"`. mksobj tallow 200 / wax 400.

