# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1502; cadence **#1880** `8669b5b8`
  (Scr **11,405** RNG 100%, `39+0.30/turn`). Next: Open
  `mklev.c` minetn-6 load_special (named). Not minetn-1.
  Do not skip D-1502…D-1229. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`. `body_part` is
  `polyself.js` (wield via `body_part_latebound`; zap
  appends the existing import). `body_part_head` / `_hand`
  deferred for scope.
- Do not revert D-1217–D-1502. Named still: `any_visible_region`;
  `see_monsters` worm segs / MATCH_WARN / SPFX_WARN conferral;
  minetn-6/7 / dog leftovers; GETOBJ_ALLOWCNT count prefix;
  tamedog is_covetous / is_demon-vs-hero; lichen/acid-erode /
  worn `set_wear` on poly_obj; INTERNALCMD `#altdip`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1502.
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
  nhcore (D-1066). Do not skip D-1067…D-1502 (index).
- Named still: worm-shrieker; lichen/acid-erode;
  minetn-6/7 load_special; GETOBJ_ALLOWCNT / tamedog
  is_covetous; fruit_from_indx / options fruitadd walker.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`→`polyself.js` for `body_part`
  (use `objnam.js` `body_part_latebound`).

## Landmarks (≤15)

- D-1502: `arti_invoke` TAMING/CHARGE_OBJ/CREATE_PORTAL/BANISH;
  `seffect_taming`/`charge_ok`/`recharge`; `tamedog` MANFOOD.
  GETOBJ_ALLOWCNT named. Palantir `#if 0`. H2O dip D-1501.
- D-1501: `H2Opotion_dip` useeit `ublindf && Blindfolded_only`
  (`youprop.h` Blindfolded≡EBlinded); unpaid POT_WATER
  `alter_cost`/`costly_alteration`; `mentioned_water`
  `makeknown`; towel soak; `water_damage` invent container/
  grease plines. lichen/acid-erode named. dip_into D-1500.
- D-1500: `dip_into` `#altdip` reverse getobj (canned
  `drink_ok` then `dip_ok` GETOBJ_PROMPT); IA_DIP_OBJ;
  ignores floor. poly_obj D-1499.
- D-1499: `potion_dip` `obj_unpolyable` then `poly_obj(STRANGE_OBJECT)`
  + polypiles/`prinv`/`poof`. Callee invent `replace_object` +
  erosion/oil/lamp polish. Worn `set_wear` named. Oil/lamp is D-1498.
- D-1498: `potion_dip` POT_OIL lit `fire_damage` / cursed
  `make_glib` / gleam or rust-corrode `--`; `more_dips`
  OIL_LAMP/MAGIC_LAMP fill (empty MAGIC→OIL; age>1000 full
  else `4/3 * age/2` clamp 1500). `is_ammo` is arrows/bolts
  not darts. Brass lantern skip.
- D-1497: `potion_dip` sickness coats `is_poisonable`
  (`-P_SHURIKEN`..`-P_BOW` or Grimtooth); healing/extra/full
  strip `!permapoisoned`. Local clone — do not change mkobj
  named-missile RNG `is_poisonable`. Unicorn mix is D-1486.
- D-1496: `body_part` clones → `polyself.js`; trap `mbodypart(mon)`;
  zap appends existing import. wield `body_part_latebound`.
  `body_part_head` / `_hand` named.
- D-1495: `untrap` door D_TRAPPED find/disarm uses `force`
  (`has_magic_key`→force). Floor disarm_*/box named.
  invoke_healing Blinded 0/1 is D-1494.
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
  TAMING/CHARGE/PORTAL/BANISH is D-1502.
- D-1487: `the()` fruit_from_name + artifact_name.
  fruit_from_indx named. CapitalMon D-1357.
