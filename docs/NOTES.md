# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1327; cadence **#1680** `2cdf2b1f`
  (Scr **11,405** RNG 100% speed `37+0.30/turn`). Reviews **284–287**
  ACCEPT-WITH-DEBT (**283** closed). Next: Open `mhitu.c` gazemu
  (named from D-1314). Not explmu. Not mhitu AD_DRIN / kickdmg
  `special_dmgval`. Do not skip D-1327…D-1229. Do not wrap
  `wildmiss` as `pline_mon`. No FORCE.
- Do not revert D-1217–D-1327. warn_obj / `artifact_light` `)`
  rewrite still named on the same W_WEP envelope.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1327.
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
- Do not skip D-1071…D-1327 (index). Named still: mhitu+mhitm
  AD_DRIN / AD_WRAP `u_slip_free` caller; gazemu;
  throwit land / mthrowu `snuff_candle`; kickdmg `special_dmgval`.
  No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1327: `mhitu.c` `mattacku` AT_HUGS `:823–830` + `uhitm.c`
  `mhitm_ad_phys` `:4023–4037` + `u_slip_free` `:1045–1085`.
  Auto-hit if prev two succeeded or ustuck; `failed_grab` pline;
  `rn2(2)` grab / crush / rope-golem choke. AD_WRAP caller /
  gazemu named.
- D-1326: `mhitu.c` `explmu` `:1591–1664` + `mattacku` AT_EXPL
  `:839–842`. `mcan` miss before `d()`; thin-air/`empty water`;
  COLD/FIRE/ELEC `mon_explodes`; BLND visible skip-`rnd`; HALU
  kaleidoscope then `mondead`. `defended` / gazemu named.
- D-1325: dokick `really_kick_object` `:733–736` extract then
  `snuff_candle` then newsym then `bhit(KICKED_WEAPON)`. Candles /
  candelabrum only (not `snuff_lit`). Throwit land `:1818` /
  mthrowu `:942` / killer_xname still named.
- D-1324: thitmonst swallow vanish pline C `:2276–2298` — wakeup,
  cockatrice `minstapetrify`/`delobj` if `!uswallow`, then
  `Tobjnam` vanish + digests entrails / whirly currents.
  Weapon/hmon swallow path unchanged. potionhit / ball / boulder
  still named.
- D-1323: `zap.c` bhit THROWN_TETHERED remap + DISP_TETHER, skip
  END for caller; throwit `min(range, isqrt(arw->range))` and
  calls bhit (C `:1664–1677` / `:3863–4127`). THROWN_WEAPON fly
  stand-in named.
- D-1322: `objnam.c` doname W_WEP `:1561` `!mrg_to_wielded` +
  `:1591–1595` AKLYS `"tethered to"` (review **283**). Pickup
  `pickup_prinv` flag already live. **warn_obj named**.
- D-1321: `objnam.c` doname W_WEP `:1578–1595` `body_part(HAND)` +
  bimanual `makeplural` / URIGHTY; SWAPWEP `:1616`; RING `:1499`.
  Late-bind (objnam↔polyself).
- D-1320: `objnam.c` doname POTION POT_OIL `:1488–1491` `lamplit`
  Concat `" (lit)"` (no known gate). xname bare.
- D-1319: LEASH `:1431–1445` after worn; `find_mid(FM_FMON)` skip-dead
  `" (attached to %s)"` `noit_mon_nam`; else `leashmon=0`. Worn skip.
- D-1318: TOOL W_TOOL|W_SADDLE `:1427–1429` `" (being worn)"` then
  break (skips leash/candelabrum/lamp/charges).
- D-1317: CANDELABRUM `:1447–1454` `" (n of 7 candle%s)"` +
  unlit `" attached"` / lit `", lit"`; break before lamp.
- D-1316: throwit ACURRSTR urange `:1613–1682` (crossbow 18 / owt /
  uball / ammo / hurtle / boulder / Mjollnir / underwater).
- D-1315: throwit `:1695` → `throwit_mon_hit` after swallow/bhit/boomhit.
  TRUE MINVENT shk → `throwit_return(TRUE)`. Helper D-1313.
- D-1314: `m_respond` shriek/`aggravate`/Medusa AT_GAZE (**gazemu named**)
  / Erinys. Callers dochug/boomhit/bhitm.
- D-1313: throwit_mon_hit `snuff_candle` then `thitmonst` then shk
  `hot_pursuit` (`inside_shop` / `*ushops` NUL). Lamps not snuffed.
- D-1312: thitmonst leader catch / `finish_quest` (questarti/unique/AoY;
  keep invoked unique or `!mpeaceful`). Vanish pline D-1324.
