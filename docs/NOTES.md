# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1332; cadence **#1685** `a7a5a835`
  (Scr **11,405** RNG 100% speed `37+0.30/turn`). Reviews **288–291**
  ACCEPT-WITH-DEBT (**283** closed). Next: Open `dothrow.c` throwit
  land `snuff_candle` (C `:1818`). Not mthrowu. Not killer_xname.
  Do not skip D-1332…D-1229. Do not wrap `wildmiss` as `pline_mon`.
  No FORCE.
- Do not revert D-1217–D-1332. warn_obj / `artifact_light` `)`
  rewrite still named on the same W_WEP envelope.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1332.
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
- Do not skip D-1071…D-1332 (index). Named still: uhitm/mhitm
  `mhitm_ad_wrap` arms; throwit land / mthrowu `snuff_candle`.
  No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1332: `dokick.c` `kickdmg` `:56` / `:90` —
  `special_dmgval(&youmonst, mon, W_ARMF, NULL)` after shade
  `dmg=0`, before `!specialdmg` `pline_The` return; then
  `dmg += specialdmg`. Blessed boots vs undead/demon `rnd(4)`.
  Poly-loop call already D-1310. `maybe_mnexto` / `abuse_dog` /
  martial knockback named.
- D-1331: `uhitm.c` `mhitm_ad_wrap` mhitu `:3376–3417` —
  `(!mcan || ustuck==magr) && !sticks`; `!ustuck && !rn2(10)`
  `u_slip_free` else `set_ustuck` + coil/swing; held pool drown /
  AT_HUGS crush; verbose brush zeros dice. uhitm/mhitm wrap arms
  named.
- D-1330: `uhitm.c` `mhitm_ad_drin` mhitm `:3272–3301` — headless
  `pline_mon` skipdrin, helm `misc_worn_check&W_ARMH&&rn2(8)`
  literal helmet, `eat_brains(gv.vis)`, lifsav skipdrin.
  `mattackm` AT_TENT FALLTHROUGH + hitmm tentacles suck.
- D-1329: `uhitm.c` `mhitm_ad_drin` mhitu `:3222–3271` — hitmsg,
  `defends(AD_DRIN,uwep)`/`!has_head` skipdrin, `u_slip_free`,
  `uarmh&&rn2(8)` hat/helm, Half then `mdamageu`+zero dice,
  `eat_brains` unless DUNCE_CAP, `adjattrib(A_INT,-rnd(2),FALSE)`,
  1/5 `losespells` / 1/5 `drain_weapon_skill`. Full `defends()`
  dragon-armor switch named.
- D-1328: `mhitu.c` `gazemu` `:1668–1898` + `mattacku` AT_GAZE
  `:832–837` skip Medusa (mndx) + `mon.c` `m_respond_medusa`.
  AD_STON reflect/stone, CONF/STUN/BLND/FIRE, cancelled looks-X,
  Hallu `rn2(4)`. `#ifdef PM_BEHOLDER` AD_SLEE/AD_SLOW compiled
  out (`#if 0` MON). gazemm / arti_reflects W_WEP named.
- D-1327: `mhitu.c` `mattacku` AT_HUGS `:823–830` + `uhitm.c`
  `mhitm_ad_phys` `:4023–4037` + `u_slip_free` `:1045–1085`.
  Auto-hit if prev two succeeded or ustuck; `failed_grab` pline;
  `rn2(2)` grab / crush / rope-golem choke. mhitu AD_WRAP D-1331.
- D-1326: `mhitu.c` `explmu` `:1591–1664` + `mattacku` AT_EXPL
  `:839–842`. `mcan` miss before `d()`; thin-air/`empty water`;
  COLD/FIRE/ELEC `mon_explodes`; BLND visible skip-`rnd`; HALU
  kaleidoscope then `mondead`. `defended` named.
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
