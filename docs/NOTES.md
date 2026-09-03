# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress (cadence **#2170** at `2d66f69e`, R² 0.846).
  Save-oracle for tagged restore Open. B0: catchup 26/30 red; shop
  35/35 no unpaid. **Next:** Open `teleport.c` heaven `u_left_shop`.
  Not `beg`. Falsify: C `u_left_shop` heaven caller. Do not skip
  D-1531…D-1763. Do not rewrite `confer_oc_oprop`. Do not invent
  3.6 `random_trap_to_glyph`.
- Named still: Palantir `#if 0`; pit/underwater; clone yn; keepdogs
  leash/`mon_has_amulet`; tip-spill; hideunder; Punished float_down;
  water/lava steed; interned `'yn'`; mthrowu/uhitm poison;
  `dog_hunger`/`dog_move` wire; `peacefuls_respond` / MS_ARREST Halt;
  remaining vault/priest/sit SetVoice; heaven `u_left_shop`; STRAT_HEAL;
  `swallow_cell` sticky Hallu; eat.js useup+useupf; Unaware
  make_blinded talk=FALSE; Punished `set_bc`; `cancel_doff`; pager
  `trap_description`; hallu explode `rndmonnam`; integer `GLYPH_*_OFF`
  / `map_monst`; findone flash/`foundone`/mimic; `gold_detect`; DUMPLOG;
  zap `delete_contents` clone; invent Array vs nobj; `noit_mhim` Hallu.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1763.
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
  nhcore (D-1066). Do not skip D-1067…D-1763 (index).
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
  D-1682…D-1763. D-1763 is `beg` (not `dog_hunger` /
  `peacefuls_respond`). D-1762 is `maybe_gasp`. D-1761 is
  `sound_speak`. No trailing `confdir` in shared `getdir`.

## Landmarks (≤15)

- D-1763: `beg` `:518–542` helpless/diet; animal `domonnoise`;
  humanoid I-glyph+SetVoice+verbalize; middle famished. Live
  `sounds.js`. Named: `dog_hunger` wire; `peacefuls_respond`.
- D-1762: `maybe_gasp` `:545–610` Exclam `ROLL_FROM`/`NULL`; other-role
  GUARDIAN / cross priest → SILENT; CUSS+emin → HUMANOID; always-gasp
  vs same-`mlet`. Live `sounds.js`. Named: `peacefuls_respond`.
- D-1761: `sound_speak` `:2184–2220` !SND_SPEECH no-op; Death `:1235`
  `sound_speak(tmpbuf)`; empty `SoundSpeak`. Live `sounds.js`.
- D-1760: `explode` `:378–452` 3x3 `map_invisible` when
  `cansee && !canspotmon`; `You_hear` vs Boom!; `engulfer_explosion_msg`.
- D-1759: `trapname` `:7098–7155` Hallu display rng; C `trap_to_glyph`
  no Hallu; `see_traps` `glyph_is_trap`. Named: pager `trap_description`.
- D-1758: `hero_Deaf` youprop in doseduce/mayberem. Named: `noit_mhim`.
- D-1757: `setworn` oc_oprop/`w_blocks`/weapon gate; `setuwep` calls
  `setworn`. Named: `cancel_doff`.
- D-1756: `delobj`/`delobj_core` extract+`obfree`. Named: zap
  `delete_contents` clone.
- D-1755: `toggle_blindness` Sting(-1). Named: Unaware/`set_bc`.
- D-1754: companion pet HP / live-cat `d()`. Named: DUMPLOG.
- D-1753: `sense_trap` Hallu/cursed GOLD. Named: `gold_detect`.
- D-1752: `set_voice` / SetVoice empty without SND_LIB.
- D-1751: `ghitm` `hidden_gold(TRUE)`. Named: unsplitobj.
- D-1750: `doseduce` / `mayberem` / `ld()`. Deaf is D-1758.
- D-1749: `feel_location` is_worm_tail + Blind `dopush`.
