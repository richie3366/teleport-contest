# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1468; cadence **#1850** `3605a281`
  (Scr **11,405** RNG 100%). Next: Open `spell.c`
  `spelleffects` SPE_HEALING/SPE_EXTRA_HEALING directional
  weffects (named). Not TELE.
  Do not skip D-1468…D-1229. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`.
- Do not revert D-1217–D-1468. Named still: `see_monsters`
  warn_obj / Sting; fruit_from_name + artifact_name in
  `the()`; minetn-1 / dog leftovers / `add_to_minv`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1468.
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
  nhcore (D-1066). Do not skip D-1067…D-1468 (index).
- Named still: worm-shrieker; unicorn/amethyst mix / potionhit /
  potionbreathe; directional HEALING weffects;
  zap_steed bhitm-routed cancel/poly; zap_map engraving;
  bhit doorlock LOCKING/STRIKING; bhito uchain / poly-arm
  boxlock; artifact invoke.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.

## Landmarks (≤15)

- D-1468: SPE_TELEPORT_AWAY IMMEDIATE wand-duplicate → weffects
  bhit; bhitm u_teleport_mon; zapyourself tele(); bhito rloco;
  zap_steed tele() is D-1455. HEALING directional named.
- D-1467: `bhito` WAN_OPENING/WAN_LOCKING/SPE_KNOCK/
  SPE_WIZARD_LOCK `boxlock`; learn iff Klunk/Klick;
  SPBOOK skips makeknown; uchain / poly-arm named.
- D-1466: `zap_updown` SPE_STONE_TO_FLESH (C has no WAN_);
  air/water/Underwater/qstart-up nothing; up Blood face; down
  !OBJ_AT + !ENGRAVE blood/nothing then bhitpile+zap_map;
  disclose stays false. zap_map engraving named.
- D-1465: `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK close
  drawbridge / closeholdingtrap / hole→trapdoor; rock skipped;
  STONE is D-1466.
- D-1464: `zap_steed` SPE_DRAIN_LIFE via bhitm; mr=0
  m_lev-- + weaker; undead resists still disclose; SPBOOK
  skip makeknown. Cancel/poly named.
- D-1463: `zap_steed` WAN_OPENING/SPE_KNOCK via bhitm; saddle
  drop + knock-back/stun + disclose. Drain is D-1464.
- D-1462: `bhit` doorlock WAN_OPENING/SPE_KNOCK; SDOOR appear
  + locked unlock + picking_at; JS had typ===STONE. LOCKING/
  STRIKING named; boxlock is D-1467.
- D-1461: SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate → weffects
  bhit; bhitm golem/mimic; zapyourself polymon/Stoned/invent;
  bhito stone_to_flesh_obj. TELE is D-1468.
- D-1460: SPE_CANCELLATION IMMEDIATE wand-duplicate → weffects
  bhit; bhitm/zapyourself cancel_monst already live.
  STONE is D-1461.
- D-1459: SPE_POLYMORPH IMMEDIATE wand-duplicate → weffects
  bhit; bhitm resist/newcham; self-dir !Unchanging polyself.
- D-1458: SPE_TURN_UNDEAD IMMEDIATE wand-duplicate → weffects
  bhit; bhitm dbldam + spell_damage_bonus; POLY is D-1459.
- D-1457: `mixtype` / `potion_dip` potion-potion mix +
  `dodip` potion getobj; Klein/hands/H2O; unicorn dip named.
- D-1456: `zap_updown` WAN_STRIKING/SPE_FORCE_BOLT destroy
  drawbridge / ceiling rock / trapdoor→HOLE; rock does not
  disclose; LOCKING is D-1465.
- D-1455: `zap_steed` WAN/SPE_TELEPORT `tele()` together
  (not bhitm); learnwand on post-`teleds` ux0; disclose still learns.
- D-1454: `zap_updown` WAN_OPENING/SPE_KNOCK portcullis /
  quest ripple / holding+falling traps then bhitpile+zap_map.
