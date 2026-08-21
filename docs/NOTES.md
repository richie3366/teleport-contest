# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1362; cadence **#1730** `a979a9ac`
  (Scr **11,405** RNG 100% speed `37+0.30/turn`). Reviews
  **321/322** ACCEPT-WITH-DEBT (no Must-fix). Next: Open
  `dokick.c` `obj_delivery` stolen_booty /
  `mksobj_migr_to_species` (named from D-1177). Do not skip
  D-1362…D-1229. Do not wrap `wildmiss` as `pline_mon`. No FORCE.
- Do not revert D-1217–D-1362. `see_monsters` warn_obj_cnt /
  `Sting_effects` / SPFX_WARN / ARMOR gloves `:1412` still named.
  fruit_from_name + artifact_name in `the()` still named.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1362.
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
  nhcore (D-1066). Do not skip D-1067…D-1362 (index).
- Do not skip D-1071…D-1362 (index). Named still: hitmm artifact
  wep; mthrowu/zap/hmon
  `shade_miss` callers; mdamagem CONF/STUN/FIRE leftover;
  mhitm wrap brush; allmain/uhitm/dothrow/dig `u_wipe_engr`.
  Do not restore fountain `lesshungry` (D-1359). No ALIGN/FORCE
  on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1362: `dokick.c` `dokick` `:1265–1310` — no_kick
  nolimbs/slithy, verysmall, steed yn+`kick_steed`, wounded
  (D-0786), encumber, S_LIZARD, `uinwater && !rn2(2)`, utrap
  pit `Passes_walls` / WEB|BEARTRAP, boulder `!Passes_walls`.
  Steed `'n'` is ECMD_OK without More. `kick_steed` in
  `steed.js`. Swallow/pit-brace/Lev after getdir named.
- D-1361: `dokick.c` `kick_ouch` `:892–897` — `is_drawbridge_wall`
  then `pline_The` unaffected, `find_drawbridge` remaps `gm.maploc`
  (and x,y for `wake_nearto 5*5`) to the span so `kickstr` is
  `"kicking a drawbridge"` not IS_STWALL `"a wall"`. Live
  `dbridge.js` callees. Air/Lev `hurtle` named.
- D-1360: `dokick.c` `dokick` `:1384` — after `wake_nearby(FALSE)`,
  `u_wipe_engr(2)` (hero cell; body D-1051). Declined peaceful
  returns first. No RNG when no engraving. allmain/uhitm/
  dothrow/dig callers named.
- D-1359: `fountain.c` `drinkfountain` `:279–282` — fate<10
  `uhunger += rnd(10)` + `newuhs(FALSE)` (don't choke on
  water). Not `lesshungry`. mgkftn still returns after
  refresh. `newuhs` messages named.
- D-1358: `dokick.c` `dokick` `:1383` — after maybe_kick,
  `wake_nearby(FALSE)` (`ulevel*20`, petcall FALSE) before
  `u_wipe_engr` / `kick_monster`. Callee live. Declined
  peaceful returns first. Wipe is D-1360.
- D-1357: `objnam.c` `the()` + `rumors.c` `CapitalMon`/
  `init_CapMons` — G_UNIQ titles/types (Oracle, Archon)
  get `"the "`; pname uniques (Medusa) do not; first-space
  `" of "` + PYEC. fruit_from_name + artifact_name named.
- D-1356: `eat.c` `lesshungry` `:3289–3333` + `bite` `:3133–3140`
  choke if canchoke/`!iseating` at 2000; fullwarn 1500;
  `doeat` canchoke SATIATED snapshot; force_save_hs first bite.
  adj_victual_nutrition / `do_reset_eat` touchfood named.
- D-1355: `zap.c` `zapyourself` WAN_LIGHTNING `:2730–2746`
  learn + `d(12,6)` + Shock shock/exercise vs unharmed;
  `destroy_items` AD_ELEC; `flashburn(rnd(100),TRUE)`.
  ugolemeffects / AD_ELEC body / MAGIC_MISSILE / FIREBALL /
  `lightdamage` named.
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
  skips `killed`. Not mhurtle. `wake_nearby` is D-1358.
- D-1349: `dokick.c` `kickdmg` `:70–76` — tame `abuse_dog` then
  still-tame `monflee(dmg?rnd(dmg):1)` else `mflee=0`, after
  caitiff and before `rnd(dmg)`. Callees already D-0836.
- D-1348: `uhitm.c` `mhitm_ad_wrap` `:3344–3375` — uhitm you-as-agr
  (`m_slips_free`; C `tailmiss=!gn.notonhead`; coil/swing,
  pool `!cant_drown`, AT_HUGS crush, verbose brush). mhitu
  wrap is D-1331; mhitm brush named.
