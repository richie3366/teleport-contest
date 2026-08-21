# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1354; cadence **#1720** `6570ddba`
  (Scr **11,405** RNG 100% speed `37+0.31/turn`). Reviews
  **313–316** ACCEPT-WITH-DEBT (no Must-fix). Next: Open `zap.c`
  `zapyourself` WAN_LIGHTNING (named). Not killer_xname.
  Do not skip D-1354…D-1229. Do not wrap
  `wildmiss` as `pline_mon`. No FORCE.
- Do not revert D-1217–D-1354. `see_monsters` warn_obj_cnt /
  `Sting_effects` / SPFX_WARN / ARMOR gloves `:1412` still named.
  mcastu ureflects still named.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1354.
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
- Do not skip D-1071…D-1354 (index). Named still: hitmm artifact
  wep; mthrowu/zap/hmon
  `shade_miss` callers; mdamagem CONF/STUN/FIRE leftover;
  mhitm wrap brush; `wake_nearby` / `u_wipe_engr` kick
  callers. No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1354: `weapon.c` `dmgval` `:307–308` shade
  `!shade_glare` tmp=0; `artifact.c` `shade_glare`
  `:555–571` silver or SPFX_DFLAG2+M2_UNDEAD.
  Dice still burn. Blessed/thick-skin/hmon ranged named.
- D-1353: muse.c `ureflects` `:2850–2864` W_AMUL
  medallion+makeknown, W_ARM armor/`uskin` luster,
  PM_SILVER_DRAGON scales. zap/pray clones share
  `mhitu.js`. mcastu named.
- D-1352: `uhitm.c` `mhitm_ad_ston` mhitm `:4254–4261` +
  `do_stone_mon` `:3944–3978` via `mdamagem` leftover.
  Cancelled keeps `d()`; else poly golem / `monstone` /
  resist leftover 0. `munstone` named.
- D-1351: `mhitm.c` `hitmm` `:706–726` — vis `!compat` after
  hit pline; `weaponhit` AT_WEAP or AT_CLAW+mwep; silver
  `oc_material`; `mon_hates_silver` then `simpleonames`
  sears; flesh unless `noncorporeal`/`amorphous`; self
  himself→his own. Artifact wep named.
- D-1350: `dokick.c` `kickdmg` `:96–113` — after HP, martial
  `!bigmonst` `!rn2(3)` then `mcanmove`/`!ustuck`/`!mtrapped`.
  `goodpos(...,0)` then reels pline, `m_in_out_region`,
  remove/place, `set_apparxy`, `mintrap` Trap_Killed_Mon
  skips `killed`. Not mhurtle. `wake_nearby` named.
- D-1349: `dokick.c` `kickdmg` `:70–76` — tame `abuse_dog` then
  still-tame `monflee(dmg?rnd(dmg):1)` else `mflee=0`, after
  caitiff and before `rnd(dmg)`. Callees already D-0836.
- D-1348: `uhitm.c` `mhitm_ad_wrap` `:3344–3375` — uhitm you-as-agr
  (`m_slips_free`; C `tailmiss=!gn.notonhead`; coil/swing,
  pool `!cant_drown`, AT_HUGS crush, verbose brush). mhitu
  wrap is D-1331; mhitm brush named.
- D-1347: `objnam.c` `doname_base` `:1599–1609` — W_WEP else
  overwrite `)` with `glow_verb`/`glow_color` or
  `arti_light_description` lit. `see_monsters` cnt / SPFX_WARN /
  ARMOR `:1412` / Hallu `hcolor` named.
- D-1346: `dothrow.c` `throwit` `:1747–1748` — returning-missile
  arm-hit `losehp(Maybe_Half_Phys, killer_xname, KILLED_BY)`.
  Not `xname`. throw_obj `:147` petrify / pickup / wield named.
- D-1345: `zap.c` `dozap` `:2658–2663` — self-zap `losehp`
  `"zapped "+uhim()+"self with "+killer_xname` + `NO_KILLER_PREFIX`.
  Not `xname` / `u.female`. throwit `:1747` is D-1346.
- D-1344: `eat.c` `choke` `:268–284` — non-coin `killer_xname` +
  `KILLED_BY`; coins `"very rich meal"`; null `"quick snack"`.
  eataccessory AoS live; lesshungry/bite + throw_obj petrify named.
- D-1343: `dokick.c` `kickstr` `:794–830` + `kick_ouch` `:903`
  `"kicking "` + kickobjnam or terrain noun. `game.maploc` null =
  nowhere. Drawbridge remap named.
- D-1342: `artifact.c` `arti_reflects` `:537–550` + SPFX_REFLECT
  W_WEP `:867–872`. `mon_reflects` MON_WEP; hero `EReflecting&W_WEP`.
  cspfx / mcastu ureflects named (zap/pray W_AMUL·ARM D-1353).
- D-1341: `uhitm.c` `shade_miss` `:2016–2051` + `mhitm.c` `hitmm`
  `:659–661` `!compat` → `M_ATTK_MISS`. `dmgval` shade is D-1354;
  mthrowu·zap·hmon callers named.
- D-1340: `mhitm.c` `mattackm` AT_HUGS `:476–490` auto-hit iff prev
  two `res[]==M_ATTK_HIT`; `hitmm` `:691–695` squeezes unless
  `magr==u.ustuck`.
