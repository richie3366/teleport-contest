# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1460; cadence **#1840** `01edf8b9`
  (Scr **11,405** RNG 100%). Next: Open `zap.c` `weffects`
  SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate (named). Not
  mix.
  Do not skip D-1460…D-1229. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`.
- Do not revert D-1217–D-1460. Named still: `see_monsters`
  warn_obj / Sting; fruit_from_name + artifact_name in
  `the()`; minetn-1 / dog leftovers / `add_to_minv`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1460.
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
  nhcore (D-1066). Do not skip D-1067…D-1460 (index).
- Named still: worm-shrieker; unicorn/amethyst mix / potionhit /
  potionbreathe; wand-duplicate IMMEDIATE STONE/TELE;
  zap_steed bhitm-routed; zap_updown LOCKING/STONE; artifact invoke.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.

## Landmarks (≤15)

- D-1460: SPE_CANCELLATION IMMEDIATE wand-duplicate → weffects
  bhit; bhitm/zapyourself cancel_monst already live.
  STONE named.
- D-1459: SPE_POLYMORPH IMMEDIATE wand-duplicate → weffects
  bhit; bhitm resist/newcham; self-dir !Unchanging polyself.
- D-1458: SPE_TURN_UNDEAD IMMEDIATE wand-duplicate → weffects
  bhit; bhitm dbldam + spell_damage_bonus; POLY is D-1459.
- D-1457: `mixtype` / `potion_dip` potion-potion mix +
  `dodip` potion getobj; Klein/hands/H2O; unicorn dip named.
- D-1456: `zap_updown` WAN_STRIKING/SPE_FORCE_BOLT destroy
  drawbridge / ceiling rock / trapdoor→HOLE; rock does not
  disclose; LOCKING still named.
- D-1455: `zap_steed` WAN/SPE_TELEPORT `tele()` together
  (not bhitm); learnwand on post-`teleds` ux0; disclose still learns.
- D-1454: `zap_updown` WAN_OPENING/SPE_KNOCK portcullis /
  quest ripple / holding+falling traps then bhitpile+zap_map.
- D-1453: `bhito` SPE_DRAIN `drain_item` spe-- after
  defends(AD_DRLI)/obj_resists; COST_DRAIN; worn ABON.
- D-1452: SPE_WIZARD_LOCK IMMEDIATE wand-duplicate → weffects bhit.
- D-1451: SPE_SLOW_MONSTER IMMEDIATE wand-duplicate → weffects bhit.
- D-1450: SPE_KNOCK IMMEDIATE wand-duplicate → weffects bhit.
- D-1449: SPE_FINGER_OF_DEATH RAY wand-duplicate → ubuzz ZT_DEATH.
- D-1448: SPE_MAGIC_MISSILE RAY wand-duplicate → ubuzz.
- D-1447: `mhitm_ad_phys` poison leftover after rustm →
  `mhitm_really_poison` vis / resist / rn1(10,6)+deadly.
- D-1446: `zapyourself` SPE_DRAIN `!Drain_resistance` + losexp.
