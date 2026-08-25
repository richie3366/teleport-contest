# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1454; cadence **#1820** `70c2b8e6`
  (Scr **11,405** RNG 100% speed `36+0.30/turn` R² 0.857). Next:
  Open `zap.c` `zap_steed` WAN_TELEPORTATION
  (named). Not probing.
  Do not skip D-1454…D-1229. No FORCE. Do not wrap `wildmiss`.
  Do not add trailing `confdir` to shared `getdir`.
- Do not revert D-1217–D-1454. Named still: `see_monsters`
  warn_obj / Sting / SPFX_WARN / ARMOR gloves; fruit_from_name
  + artifact_name in `the()`; minetn-1 / dog leftovers /
  `add_to_minv` merge.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1454.
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
  nhcore (D-1066). Do not skip D-1067…D-1454 (index).
- Named still: worm-shrieker; remaining mix /
  potionhit / potionbreathe;
  remaining wand-duplicate IMMEDIATE TURN/…;
  zap_steed TELEPORT; zap_updown STRIKING; artifact invoke. No fountain
  `lesshungry` (D-1359). No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1454: `zap_updown` WAN_OPENING/SPE_KNOCK
  stairs walk then `is_db_wall`+`open_drawbridge`
  else quest downstairs ripple; down
  `openholdingtrap` / `openfallingtrap(FALSE)`;
  then down `bhitpile`+`zap_map` / up hideunder
  bhito. Callees dbridge.c + trap.c D-0981.
  STRIKING/LOCKING/STONE named. Probing is D-1444.
- D-1453: `bhito` SPE_DRAIN_LIFE `drain_item`
  `spe--` after defends(AD_DRLI)/obj_resists(10,90);
  COST_DRAIN; worn ring/helm ABON. Callees
  artifact.c defends + defn/cary extract.
  uhitm/mhitu/mhitm AD_ENCH callers named.
  Probing is D-1445; self-drain is D-1446.
- D-1452: SPE_WIZARD_LOCK IMMEDIATE wand-duplicate
  `wand_duplicate_weffects` → `weffects` bhit
  rn1(8,6); bhitm D-1425 / zapyourself D-1434
  already live. TURN still named. doorlock /
  zap_updown LOCKING / bhito boxlock named.
- D-1451: SPE_SLOW_MONSTER IMMEDIATE wand-duplicate
  `wand_duplicate_weffects` → `weffects` bhit
  rn1(8,6); bhitm D-1424 / zapyourself D-1433
  already live. LOCK is D-1452. doorlock /
  zap_updown OPENING / bhito boxlock named.
- D-1450: SPE_KNOCK IMMEDIATE wand-duplicate
  `wand_duplicate_weffects` → `weffects` bhit
  rn1(8,6); bhitm/zapyourself already D-0981.
  SLOW is D-1451. LOCK is D-1452. doorlock /
  zap_updown OPENING / bhito boxlock named.
- D-1449: SPE_FINGER_OF_DEATH RAY wand-duplicate
  `wand_duplicate_weffects` → `weffects` ubuzz
  BZ_U_SPELL nd=ulevel/2+1; BZ_OFS 4 (ZT_DEATH);
  self-dir zapyourself already D-0156. MAGIC_MISSILE
  is D-1448; KNOCK is D-1450. Sleep/dig are
  D-1440/D-1441.
- D-1448: SPE_MAGIC_MISSILE RAY wand-duplicate
  `wand_duplicate_weffects` → `weffects` ubuzz
  BZ_U_SPELL nd=ulevel/2+1; self-dir zapyourself
  already D-1364 / Antimagic D-1367. IMMEDIATE
  named. Sleep/dig are D-1440/D-1441.
- D-1447: `mhitm_ad_phys` poison leftover
  after rustm `(opoisoned||permapoisoned)
  && !rn2(4)` → `mhitm_really_poison`
  vis pline / resist skip / rn1(10,6)+deadly.
  Grimtooth permapoisoned. mhitu poisoned /
  mhitm_ad_drst 1/8 / worm-shrieker named.
- D-1446: `zapyourself` SPE_DRAIN_LIFE
  `!Drain_resistance` (youprop H||E /
  uprops[DRAIN_RES]) then learn +
  `losexp("life drainage")`; damage 0.
  Callee exper.c. Undead still no-ops
  in losexp. bhito drain_item is D-1453.
- D-1445: `bhito` WAN_PROBING
  `res=!dknown` + observe; container/statue
  peek (`display_cinventory`) / tin / egg;
  learn iff res. Callee invent.c.
  Other updown otyps named.
- D-1444: `zap_updown` WAN_PROBING
  ceiling/beneath + `bhitpile` + `zap_map`
  probing + `display_binventory`. Always
  disclose. Callees D-1426 observe /
  D-1443 zap_steed prefix. Other updown
  otyps / force_decor named.
- D-1443: `zap_steed` WAN_PROBING
  `probe_monster(u.usteed)` + `learnwand` +
  weffects disclose; `notonhead` FALSE.
  Callee D-1426. Teleport / bhitm-routed
  zap_steed named.
- D-1442: `mhitm_ad_phys` rustm leftover
  `if (damage) rustm(mdef, mwep)` after artifact_hit;
  callee `mhitm.c` rustm AD_CORR / AD_RUST / AD_FIRE
  except steam vortex then `erode_obj` GREASE|VERBOSE.
  mhitu rustm / mhitm_ad_drst / worm-shrieker named.
- D-1441: SPE_DIG RAY wand-duplicate
  `wand_duplicate_weffects` → `weffects` zap_dig;
  self-dir zapyourself no-op. MAGIC_MISSILE is D-1448;
  FINGER is D-1449; IMMEDIATE named. Swallow pierce named
  on zap_dig.
- D-1440: SPE_SLEEP RAY wand-duplicate
  `wand_duplicate_weffects` → `weffects` ubuzz
  BZ_U_SPELL nd=ulevel/2+1; self-dir zapyourself
  already live.
