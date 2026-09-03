# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 43/44** after D-1767 `show_glyph` gbuf stamp (full `sessions`).
  Recovered seed0006/0030/4500. **Hypothesis:** seed0014 is not stale
  `disp_glyph` (same 43831/59178 prefix as D-1765 after the stamp).
  Falsify: do not re-check gbuf overwrite. **Next:** Open
  `detect.c` gold_detect. Not sense_trap. Do not invent a seed0014
  FAIL peel. Do not skip D-1531…D-1772.
- Named still: Palantir `#if 0`; pit/underwater; clone yn; keepdogs
  leash/`mon_has_amulet`; tip-spill; hideunder; Punished float_down;
  water/lava steed; interned `'yn'`; mthrowu/uhitm poison;
  `dog_hunger`/`dog_move` wire; `qst_guardians_respond`; Elbereth
  hypocrite; remaining vault/priest/sit SetVoice; STRAT_HEAL;
  `swallow_cell` sticky Hallu; Blind `move_bc`
  glyph; `unplacebc` Blind restore; ballfall; pager `trap_description`;
  hallu explode `rndmonnam`; findone flash/`foundone`/mimic;
  `gold_detect`; DUMPLOG; trap.js `delete_contents_chest`; mklev.js
  `create_object_delete_contents`; invent Array vs nobj; `noit_mhim`
  Hallu; `lev_by_name`; Nowhere yn; Quest·mines·sanctum clamp;
  `ridden_mon_to_glyph` usteed; swallow cmap; `map_glyphinfo`;
  setnotworn `monstunseesu_prop`/`update_inventory`; zap.js useupf
  clone; detect/potion/read/spell useup clones; useupf shop bill.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not re-check 40/44 at D-1765 `3b34b789` or D-1766 `bb71f9ff`;
  D-1767 recovered three of those four FAILs. seed0014 unchanged.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1772.
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
  nhcore (D-1066). Do not skip D-1067…D-1772 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not delete emin
  (**487**). Do not stub `make_happy_shk` pacify-only (D-1540). Do
  not import bones→options for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / binary savelev-freeing / lua
  `lspo_reset_level`. JSON `cant_go_back` is D-1722;
  `restore_artifacts` is D-1698. Default `spot_monsters` Off. No
  timeout.c `mon_is_local` for LS_MONSTER (D-1708). No stamp every
  `fmon` in `update_mlstmv` (D-1709).
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No static `end.js`←`dog.js`.
  No makemon→hack/`artifact`/`minion`. No fourth town gnome. Do not
  stub door/furnsyms/DELPHI (D-1536/D-1543/D-1556). Do not skip
  `block_point` (D-1557). Do not revert D-1574 `dig_point`/`seemimic`
  or global `recalc` as `vision_reset`. No yn ^P glue / `ing_suffix`
  clone #3 / InvInUse poke (D-1603) / zap sticky Blind (D-1604). No
  `dat/tribute` indent=2. No static `files.js`←`spell.js` (TDZ).
  REST_LEVELS where getlev catchup reads it. Do not re-port
  D-1682…D-1772. D-1772 is `peacefuls_respond` Halt (not
  `qst_guardians_respond` / Elbereth / victim growl / beg D-1763).
  D-1771 is invent.c `useupf` + eat.c `carried` hybrid (not zap.js
  useupf clone / detect/potion/read/spell useup clones / shop bill).
  D-1770 is zap `delete_contents` import (not trap.js
  `delete_contents_chest` / mklev.js `create_object_delete_contents`).
  D-1769 is Punished `set_bc` (not Blind `move_bc`
  glyph / `unplacebc` restore). D-1768 is Unaware talk=FALSE (not
  Punished `set_bc`). D-1767 is `show_glyph` gbuf stamp (not usteed /
  `map_glyphinfo`). D-1766 is `cancel_doff` (not setnotworn
  `monstunseesu_prop`). D-1765 is integer `GLYPH_*_OFF` / `map_monst`
  (not `pet_to_glyph` tty D-1748, not `ridden_mon_to_glyph` usteed).
  D-1764 is heaven `u_left_shop` (not `lev_by_name` / Nowhere yn).
  D-1763 is `beg`. D-1762 is `maybe_gasp`. D-1761 is `sound_speak`.
  No trailing `confdir` in shared `getdir`.

## Landmarks (≤15)

- D-1772: `mon.c` `peacefuls_respond` `:4162–4257`; `setmangry`
  `:4317` `!mon_moving`; `big_little_match` `:1329–1351`; growl
  `PLNMSG_GROWL`. Live `mon.js`+`mondata.js`+`sounds.js`. Named:
  `qst_guardians_respond`; Elbereth hypocrite; victim growl.
- D-1771: `invent.c` `useupf` `:4762–4783`; eat.c `carried()?useup:useupf`.
  Live `js/invent.js` export; eat.js hybrid retired. Named: shop
  bill; zap.js useupf clone; detect/potion/read/spell useup clones.
- D-1770: `shk.c` `delete_contents` `:1174–1183`; caller `zap.c`
  `poly_obj` `:1827–1829`. Live `js/shk.js` export + `js/zap.js`
  import. Named: trap.js `delete_contents_chest`; mklev.js
  `create_object_delete_contents`; objnam empty.
- D-1769: `ball.c` `set_bc` `:379–424`; callers `potion.c` `:309`,
  `do_wear.c` `:1476`/`:1523`, `read.c` `:3059`. Live `ball.js`+
  `do.js`+`do_wear.js`+`read.js`. Named: Blind `move_bc` glyph,
  `unplacebc` Blind restore, ballfall.
- D-1768: `potion.c` `make_blinded` `:275–276` Unaware talk=FALSE;
  `eat.c` `is_fainted`; live `do.js`+`eat.js`. Punished `set_bc`
  is D-1769. Sting(-1) is D-1755.
- D-1767: `display.c` `show_glyph` `:2039` always overwrite gbuf;
  `back_to_glyph` `:2286–2427`; `see_traps` `glyph_is_trap` only;
  vicinity `!glyph_is_monster` without kind hybrid. Live
  `display.js`+`detect.js`. Named: usteed / swallow /
  `map_glyphinfo`; seed0014.
- D-1766: `do_wear.c` `cancel_doff` `:1643–1659` I_SPECIAL skip
  `cancel_don` then `takeoff.mask &= ~slotmask`; `setworn`/`setnotworn`
  callers; `doffing` accessory/wep `takeoff.what`. Live `do_wear.js`+
  `do.js`. Named: setnotworn `monstunseesu_prop`/`update_inventory`.
- D-1765: integer `GLYPH_*_OFF` / `map_monst` ternary. gbuf stamp
  is D-1767. Named: usteed / swallow / `map_glyphinfo`.
- D-1764: `level_tele` `:1321–1385` heaven `u_left_shop`+Cloud 9/
  fly-or-plummet/`done(DIED)`/dlevel 0; `goto_level` `done(ESCAPED)`;
  buried ball before next_to_u. Live `teleport.js`+`do.js`. Named:
  `lev_by_name`; Nowhere yn; Quest·mines·sanctum clamp.
- D-1763: `beg` `:518–542` helpless/diet; animal `domonnoise`;
  humanoid I-glyph+SetVoice+verbalize; middle famished. Live
  `sounds.js`. Named: `dog_hunger` wire. Halt is D-1772.
- D-1762: `maybe_gasp` `:545–610` Exclam `ROLL_FROM`/`NULL`; other-role
  GUARDIAN / cross priest → SILENT; CUSS+emin → HUMANOID; always-gasp
  vs same-`mlet`. Live `sounds.js`. Halt is D-1772.
- D-1761: `sound_speak` `:2184–2220` !SND_SPEECH no-op; Death `:1235`
  `sound_speak(tmpbuf)`; empty `SoundSpeak`. Live `sounds.js`.
- D-1760: `explode` `:378–452` 3x3 `map_invisible` when
  `cansee && !canspotmon`; `You_hear` vs Boom!; `engulfer_explosion_msg`.
- D-1759: `trapname` `:7098–7155` Hallu display rng; C `trap_to_glyph`
  no Hallu; `see_traps` `glyph_is_trap`. Named: pager `trap_description`.
- D-1758: `hero_Deaf` youprop in doseduce/mayberem. Named: `noit_mhim`.
