# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1488; cadence **#1870** `dba2c79a`
  (Scr **11,405** RNG 100%, `38+0.31/turn`). Next: Open
  `zap.c` `zap_map` lateral drawbridge / bhit (named).
  Not engraving.
  Do not skip D-1488…D-1229. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`.
- Do not revert D-1217–D-1488. Named still: `see_monsters`
  warn_obj / Sting; minetn-1 / dog leftovers / `add_to_minv`;
  TAMING / CHARGE_OBJ / CREATE_PORTAL / BANISH.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1488.
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
  nhcore (D-1066). Do not skip D-1067…D-1488 (index).
- Named still: worm-shrieker; potion_dip poison-coat / oil/lamp;
  zap_map lateral drawbridge / bhit; TAMING / CHARGE_OBJ /
  CREATE_PORTAL / BANISH; fruit_from_indx / options fruitadd walker.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.

## Landmarks (≤15)

- D-1488: `arti_invoke` remaining specials + property
  toggle (`artifact.c:1779–2051` / `:2154–2228`);
  HEALING half-HP + Sick/Slimed/BlindedTimeout;
  ENERGY clamp; UNTRAP; LEV_TELE; ENLIGHTENING;
  CREATE_AMMO `rnd`; FLING_POISON venom `throwit`;
  FIRE/SNOW temp `P_EXPERT` `spelleffects`; xor
  `W_ARTI` CONFLICT/LEVITATION/INVIS. TAMING /
  CHARGE_OBJ / CREATE_PORTAL / BANISH named.
  BLINDING_RAY is D-1377.
- D-1487: `the()` fruit_from_name + artifact_name
  (`objnam.c:2191–2193` / `:443–519`); named fruit
  takes `"the "` unless pname artifact (Excalibur);
  `"The "` arts still take `"the "`; local
  artifact_name copy (invent cycle). fruit_from_indx
  / options.js fruitadd walker named. CapitalMon is D-1357.
- D-1486: `potion_dip` unicorn/amethyst mixtype dip
  (`:2726–2787`); `COST_NUTRLZ` + `hold_potion` juggle.
  Sickness→fruit juice; hallu/blind/conf→water; amethyst
  booze→juice. Not mixtype potion-potion. Poison-coat /
  oil/lamp / `poly_obj` / `dip_into` named.
- D-1485: `zap_updown` `default` `break` into down
  `bhitpile`+`zap_map` (`:3378–3389`); unmounted POLY/
  cancel/invis/tele hit D-1476 arms. Not probing. Not
  lateral `bhit`. Riding-down still `zap_steed`.
- D-1484: `mbhit` doorlock WAN_OPENING/LOCKING/STRIKING
  (`:1785–1802`); zap_oseen `makeknown`; shop D_BROKEN
  `add_damage(0)`. Not hero `bhit` learnwand/`SHOP_DOOR_COST`.
  Callee doorlock already D-1462/D-1475/D-1482. fhito_loc /
  destroy_drawbridge / map_invisible named.
- D-1483: `bhito` poly-arm `Is_box` `boxlock` `reset_pick`
  after unpolyable, before shudder; callee POLY only
  when `xlock.box==obj` (res stays 1). uskin/unpolyable
  skips. polypiles/livelog + hideunder cover named.
  Boxlock is D-1467. Caller down POLY bhitpile is D-1485.
- D-1482: `bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT;
  SDOOR appear then continue; locked/closed smash
  D_BROKEN crash; trapped explode D_NODOOR;
  learnwand also if WAN_STRIKING && !Deaf; shop
  D_BROKEN add_damage+pay destroy. muse mbhit is
  D-1484. LOCKING is D-1475. OPENING is D-1462.
- D-1481: `bhito` uchain WAN_OPENING/SPE_KNOCK
  unpunish + learn_it; uball always res=0;
  other otyps on chain skip the switch (no
  boxlock/breaks). Boxlock is D-1467; poly-arm
  is D-1483. Callee `unpunish` already live.
- D-1480: `zap_steed` SPE_CURE_SICKNESS via bhitm;
  objects.h NODIR so weffects skips; bhitm has no arm
  (C default impossible); forced IMMEDIATE still disclose.
  Self-cast healup is D-1398. Speed is D-1479.
- D-1479: `zap_steed` WAN_SPEED_MONSTER via bhitm;
  mr=0 MFAST + disclose + helpful_gesture (stay
  tame); high-mr resist still disclose. Cure is D-1480.
  Slow is D-1478. Callee bhitm is D-1422.
- D-1478: `zap_steed` WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via
  bhitm; mr=0 MSLOW + disclose; high-mr resist still
  disclose; SPE_SLOW SPBOOK skip makeknown. Speed is
  D-1479. Striking is D-1474. Callee bhitm is D-1424.
- D-1477: `potionbreathe` remaining otyps; towel Half_gas_damage;
  restore/gain ABASE++; heal FALLTHROUGH +1 + make_blinded/make_deaf;
  sickness −5 (healer skip; Upolyd mh); hallu vision; conf
  `make_confused` rnd(5); speed HFast; blindness `make_blinded`
  rnd(5); acid/poly CON; trycall !kn; in_use save.
  C-commented GAIN_LEVEL/ENERGY/LEV/FRUIT/DETECT/OIL named.
  potionhit is D-1472.
- D-1476: `zap_map` down engraving + `maybe_explode_trap`;
  portal shield+tseen+learnwand; magical trap explode+deltrap;
  HEADSTONE skip; cancel/invis del_engr; poly random_engraving;
  tele `rloc_engr`; STONE ENGRAVE wipe; striking wipe.
  Lateral drawbridge / bhit named. Probing is D-1444.
- D-1475: `bhit` doorlock WAN_LOCKING/SPE_WIZARD_LOCK; SDOOR
  no-op; Rogue hide SDOOR; obstructed/trap abort; CLOSED/
  ISOPEN/BROKEN/NODOOR lock-shut; already-locked res FALSE.
  STRIKING is D-1482. OPENING is D-1462.
- D-1474: `zap_steed` WAN_STRIKING/SPE_FORCE_BOLT via
  bhitm; easy-hit d(2,12)+disclose; miss still disclose;
  SPE_FORCE_BOLT SPBOOK skip makeknown. Slow is D-1478.
