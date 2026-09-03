# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress (cadence **#2170** at `2d66f69e`, R² 0.846).
  Save-oracle for tagged restore Open. B0: catchup 26/30 red; shop
  35/35 no unpaid. **Next:** Open `sounds.c` `sound_speak`.
  Not explode `map_invisible`. Falsify: C sounds.c `sound_speak`.
  Do not skip D-1531…D-1760. Do not re-port
  D-1675…D-1760. Do not rewrite `confer_oc_oprop`. Do not invent
  3.6 `random_trap_to_glyph` on trap cmap.
- Named still: Palantir `#if 0`; pit/underwater; clone yn;
  keepdogs leash/`mon_has_amulet`; tip-spill; hideunder; Punished
  float_down; water/lava steed; interned `'yn'`; mthrowu/uhitm poison;
  `sound_speak`; `beg`/`maybe_gasp`/MS_ARREST; remaining
  vault/priest/sit SetVoice; heaven `u_left_shop`; STRAT_HEAL;
  `swallow_cell` sticky Hallu; eat.js useup+useupf; Unaware
  make_blinded talk=FALSE; Punished `set_bc`; `cancel_doff`;
  pager `trap_description`; hallu explode `rndmonnam`; integer
  `GLYPH_*_OFF` / `map_monst`; findone flash/`foundone`/mimic;
  `gold_detect`; DUMPLOG; zap `delete_contents` clone; invent
  Array vs nobj; `noit_mhim` Hallu.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1760.
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
  nhcore (D-1066). Do not skip D-1067…D-1760 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1760. Do not delete emin (**487**). Do not stub
  `make_happy_shk` pacify-only (D-1540). Do not import bones→options
  for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / binary savelev-freeing / lua `lspo_reset_level`.
  JSON `cant_go_back` analogue is D-1722. JSON `restore_artifacts` is
  D-1698. Default `spot_monsters` Off. Do not keep timeout.c
  `mon_is_local` for LS_MONSTER lights (D-1708). Do not stamp every
  `fmon` in `update_mlstmv` (D-1709).
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No static `end.js`←`dog.js`
  (`keepdogs` dynamic import). No makemon→hack/`artifact`/`minion`.
  No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`.   No yn ^P glue / `ing_suffix` clone #3 / InvInUse
  poke (D-1603) / zap sticky Blind (D-1604). No `dat/tribute` indent=2.
  No static `files.js`←`spell.js` (TDZ). REST_LEVELS where getlev
  catchup reads it.   Do not re-port D-1682…D-1760. D-1760 is explode 3x3
  `map_invisible` !canspotmon / You_hear vs Boom! /
  `engulfer_explosion_msg` (not `sound_speak` / hallu `rndmonnam`).
  D-1759 is
  `trapname` Hallu / `trap_to_glyph` no Hallu (not pager
  `trap_description`). D-1758 is
  `hero_Deaf` youprop (not `noit_mhim` Hallu). D-1757 is
  `setworn` oc_oprop/`w_blocks`/weapon gate (`setuwep` calls `setworn`;
  not `cancel_doff`). D-1756 is `delobj`/`delobj_core` extract+`obfree`
  (not zap `delete_contents` clone / invent Array nobj). D-1755 is
  `toggle_blindness` Sting(-1) (not Unaware/`set_bc`). D-1754 is
  companion pet HP / live-cat `d()` (not DUMPLOG). D-1753 is
  `sense_trap` (not `gold_detect` / findone flash). D-1752 is SetVoice
  empty without SND_LIB (not `sound_speak`/`beg`). D-1751 is `ghitm`
  `hidden_gold(TRUE)`. D-1750 `doseduce`. D-1749 feel_location.
  D-1748 pet/detected glyphs. No trailing `confdir` in shared `getdir`.

## Landmarks (≤15)

- D-1760: `explode` `:378–452` 3x3 `map_invisible` when
  `cansee && !canspotmon` else `unmap_invisible`; `You_hear` vs
  Boom! / generic `"explosion"`; `engulfer_explosion_msg` `:117–179`
  + `seemimic`. Live `explode.js`+`se_blast`. Named: hallu
  `rndmonnam`; You_hear Underwater/Unaware; TRAP_EXPLODE killer.
- D-1759: `trapname` `:7098–7155` Hallu display rng + 62 names +
  role/rank `" trap"`; C `trap_to_glyph` no Hallu; `see_traps`
  `glyph_is_trap`. Live `trap.js`+`display.js`. Named: pager
  `trap_description`.
- D-1758: `hero_Deaf` `:youprop.h:125` `HDeaf||EDeaf||uroleplay.deaf`
  in doseduce/mayberem Cha `rn2`/`y_n`; hitmsg/You_hear/sedu/ston.
  Live `mhitu.js`. Named: `noit_mhim` Hallu. doseduce is D-1750.
- D-1757: `setworn` `:72–145` worn[] + SWAPWEP/QUIVER skip +
  `WEAPON_CLASS||is_weptool||mask!=W_WEP` + `w_blocks` blocked +
  `monstunseesu_prop`; `setuwep` calls `setworn`. Live `do_wear.js`+
  `worn.js` `w_blocks`+`wield.js`+`mondata.js`. Named: `cancel_doff`.
- D-1756: `delobj`/`delobj_core` `:1429–1462` `obj_resists` then extract
  + floor maybe_unhide/`newsym` + `obfree`; `extract_nobj` /
  `container_weight`; revive `delobj_core(,TRUE)`. Live `mkobj.js`+
  `zap.js`. Named: zap `delete_contents` clone; invent Array vs nobj.
- D-1755: `toggle_blindness` `:334–364` Stinging `see_monsters` then
  `Sting_effects(-1)`; `make_blinded` Hallu talk + Eyes vismsg/itch;
  Blindf_on/off; clones retired. Live `do.js`+`do_wear.js`. Named:
  Unaware talk=FALSE; Punished `set_bc`.
- D-1754: `really_done` `:1293–1295` `keepdogs(TRUE)`; `:1453–1476`
  mydogs `mtame` `mhp` + live-cat `d(adj_lev,8)`; two-line putstr;
  pets_only `:799–809`. Live `end.js`+`dog.js`+`adj_lev`. Named:
  DUMPLOG; keepdogs migrate/leash/`mon_has_amulet`.
- D-1753: `sense_trap` `:864–897` Hallu/cursed GOLD/`random_object(rn2)`
  quan; `display_trap_map`/`trap_detect`; findone trap/door/chest. Live
  `detect.js`. Named: flash/`foundone`/mimic; `gold_detect`.
- D-1752: `set_voice` `:2160–2182` + `SetVoice` empty without SND_LIB.
  Live `sounds.js`+`sndprocs.js`. Named: `sound_speak`; `beg`/`maybe_gasp`.
- D-1751: `ghitm` `:294–407` `hidden_gold(TRUE)` `:361`; `throw_gold`
  `:2712`. Vault helper D-1731. Live `dokick.js`. Named: unsplitobj.
- D-1750: `doseduce` `:1984–2305` / `mayberem` / `ld()`. Live `mhitu.js`.
  Deaf is D-1758. Named: uhitm seducer; mhitm mon-mon; SEDUCE=0 `c_sa_no`.
- D-1749: `feel_location` `:901–908` is_worm_tail + Blind `dopush`.
  Live `display.js`+`hack.js`. Named: levitate-arm.
- D-1748: `display_monster` `:587–618` pet_to_glyph / detected_mon.
  Live `display.js`. Named: `GLYPH_*_OFF`; `map_monst`; ridden.
- D-1747: `show_mon_or_warn` `:481–496` unmap I then cansee `vobj_at`.
  Live `display.js`. Sting(-1) is D-1755.
- D-1746: `see_monsters` `:1508–1509` MON_STILL_ARRIVING continue.
  Live `display.js`+`dog.js`. Sting(-1) is D-1755.

