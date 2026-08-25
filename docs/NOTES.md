# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1493; cadence **#1880** `8669b5b8`
  (Scr **11,405** RNG 100%, `39+0.30/turn`). Next: Must-fix
  `artifact.c` `invoke_healing` Blinded 0/1 vs `ucreamed`
  (`youprop.h:92` / `:1787`). Not ENERGY. Not `potion_dip`.
  Second Must-fix: `invoke_untrap` vs stub `untrap` (review **449**).
  Do not skip D-1493…D-1229. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`.
- Do not revert D-1217–D-1493. Named still: `any_visible_region`;
  `see_monsters` worm segs / MATCH_WARN / SPFX_WARN conferral;
  minetn-6/7 / dog leftovers;
  TAMING / CHARGE_OBJ / CREATE_PORTAL / BANISH.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1493.
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
  nhcore (D-1066). Do not skip D-1067…D-1493 (index).
- Named still: worm-shrieker; potion_dip poison-coat / oil/lamp;
  minetn-6/7 load_special; TAMING / CHARGE_OBJ /
  CREATE_PORTAL / BANISH; fruit_from_indx / options fruitadd walker.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.

## Landmarks (≤15)

- D-1493: allmain once-per-input Hallu (H&&!resist) /
  Warn_of_mon; see_monsters warntype.obj count +
  Sting_effects. `any_visible_region` / SPFX_WARN named.
- D-1492: `add_to_minv` merge then prepend; gnome
  `begin_burn` / dog leftovers named. stolen_booty D-1363.
- D-1491: `worm_move`/`shrink_worm`/`worm_nomove`;
  cutworm / see_wsegs named. initworm D-0544.
- D-1490: minetn-1 Orcish Town `load_special`; minetn-6/7
  named. minetn-5 D-0754.
- D-1489: `zap_map` lateral drawbridge + `bhit` ZAPPED_WAND.
  force_decor named. Engraving D-1476.
- D-1488: `arti_invoke` remaining specials + W_ARTI xor.
  TAMING/CHARGE_OBJ/CREATE_PORTAL/BANISH named.
- D-1487: `the()` fruit_from_name + artifact_name.
  fruit_from_indx named. CapitalMon D-1357.
- D-1486: `potion_dip` unicorn/amethyst mixtype.
  Poison-coat / oil/lamp / `poly_obj` / `dip_into` named.
- D-1485: `zap_updown` default break into down bhitpile+zap_map.
- D-1484: `mbhit` doorlock OPENING/LOCKING/STRIKING.
- D-1483: `bhito` poly-arm boxlock `reset_pick`. Boxlock D-1467.
- D-1482: `bhit` doorlock STRIKING/FORCE. LOCKING D-1475.
- D-1481: `bhito` uchain WAN_OPENING unpunish.
- D-1480: `zap_steed` SPE_CURE_SICKNESS via bhitm.
- Review **449** QUALITY-RISK Must-fix: Staff HEALING Blinded
  0/1; Master Key UNTRAP stub `untrap` (next port).
