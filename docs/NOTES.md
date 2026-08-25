# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1477; cadence **#1860** `a3a2d65a`
  (Scr **11,405** RNG 100%, `40+0.32/turn`). Next: Open `zap.c`
  `zap_steed` WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via bhitm
  (named). Not STRIKING.
  Do not skip D-1477…D-1229. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`.
- Do not revert D-1217–D-1477. Named still: `see_monsters`
  warn_obj / Sting; fruit_from_name + artifact_name in
  `the()`; minetn-1 / dog leftovers / `add_to_minv`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1477.
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
  nhcore (D-1066). Do not skip D-1067…D-1477 (index).
- Named still: worm-shrieker; unicorn/amethyst mix;
  zap_steed bhitm-routed slow/speed/SPE_CURE_SICKNESS;
  zap_map lateral drawbridge / bhit; bhit doorlock STRIKING;
  bhito uchain / poly-arm boxlock; artifact invoke.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.

## Landmarks (≤15)

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
  STRIKING named. OPENING is D-1462.
- D-1474: `zap_steed` WAN_STRIKING/SPE_FORCE_BOLT via
  bhitm; easy-hit d(2,12)+disclose; miss still disclose;
  SPE_FORCE_BOLT SPBOOK skip makeknown. Slow named.
- D-1473: `zap_steed` WAN_MAKE_INVISIBLE via bhitm;
  minvis+vanish; See_invisible transparent; already
  minvis still disclose. Striking is D-1474.
- D-1472: `potionhit` remaining otyp switch + shop unpaid
  (hero OIL explode / POLY !Unchanging&&!Antimagic; mon
  heal FALLTHROUGH + Pestilence illness/heal; sickness;
  conf/invis/sleep/para/speed/blind/oil/acid; poly via
  bhitm). C-commented GAIN_LEVEL named. potionbreathe is D-1477.
- D-1471: `zap_steed` WAN/SPE_POLYMORPH via bhitm;
  mr=0 disclose (bhitm resist/`newcham`); high-mr
  resist still disclose; SPBOOK skip makeknown.
  Invis is D-1473.
- D-1470: `zap_steed` WAN/SPE_CANCELLATION via bhitm;
  mr=0 `mcan`; saddle stays (`self_cancel` FALSE); high-mr
  resist still disclose; SPBOOK skip makeknown. Poly is D-1471.
- D-1469: SPE_HEALING/SPE_EXTRA_HEALING skilled bless then
  wand-duplicate weffects bhit; bhitm healmon + extra/skilled
  mcureblindness; Pestilence resist; zap_steed via bhitm;
  zapyourself healup already D-0135. TELE is D-1468.
- D-1468: SPE_TELEPORT_AWAY IMMEDIATE wand-duplicate → weffects
  bhit; bhitm u_teleport_mon; zapyourself tele(); bhito rloco;
  zap_steed tele() is D-1455. HEALING is D-1469.
- D-1467: `bhito` WAN_OPENING/WAN_LOCKING/SPE_KNOCK/
  SPE_WIZARD_LOCK `boxlock`; learn iff Klunk/Klick;
  SPBOOK skips makeknown; uchain / poly-arm named.
- D-1466: `zap_updown` SPE_STONE_TO_FLESH (C has no WAN_);
  air/water/Underwater/qstart-up nothing; up Blood face; down
  !OBJ_AT + !ENGRAVE blood/nothing then bhitpile+zap_map;
  disclose stays false. zap_map engraving is D-1476.
- D-1465: `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK close
  drawbridge / closeholdingtrap / hole→trapdoor; rock skipped;
  STONE is D-1466.
- D-1464: `zap_steed` SPE_DRAIN_LIFE via bhitm; mr=0
  m_lev-- + weaker; undead resists still disclose; SPBOOK
  skip makeknown. Cancel is D-1470.
- D-1463: `zap_steed` WAN_OPENING/SPE_KNOCK via bhitm; saddle
  drop + knock-back/stun + disclose. Drain is D-1464.
