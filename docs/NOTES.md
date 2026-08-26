# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress after audit **#1940** (Scr **11,405**
  RNG **792,838**/792,838 = 100%; `39+0.32/turn`). seed0367 FULL.
  **Hypothesis:** Open `pager.c` `mhidden_description` is still
  named (not that_is_a_mimic). `splev_create_monster` amask is
  D-1553.
  **Falsify:** `node scripts/csym.mjs` mhidden_description vs
  `js/pager.js` / `js/uhitm.js`.
  **Next:** Open `mhidden_description`. Not `namefloorobj`.
  Do not skip D-1531…D-1553. Do not glue howmonseen / cutworm.
  No FORCE / `wildmiss` wrap / trailing `confdir` in shared
  `getdir`.
- Named still: `howmonseen`; cutworm; `mhidden_description`;
  `namefloorobj`. Palantir `#if 0`.
  pickinv `&ctmp`; `finish_splitting`; stash getobj;
  `in_doagain` REPEAT; eat/read/zap/tin NOFLAGS getobj.
  `mk_mplayer` role-id.
  FULL_MOON S_DOG / ustuck / `redraw_worm`. Other
  mcast_spell; sit/pray `eyecount` always-2. muse quantum-loot;
  escape cat HP. other INTERNALCMD.
  defn/cary resist; SEARCH/REGEN/XRAY/PROTECT; inv_prop drop;
  questart `artitouch`. shk mnearto / occupancy / losedogs.
  ghostfruit impossible / age. Ice/Boulder fills. Protection /
  `block_point` / DELPHI `S_fountain`. map_monst head
  pet/detected glyphs.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1553.
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
  nhcore (D-1066). Do not skip D-1067…D-1553 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1553 (index). Do not
  delete emin (review **487**). Do not stub `make_happy_shk` as
  pacify+“calms down” only (D-1540 / **493**). Do not import
  bones→options for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for
  `body_part` (use `objnam.js` `body_part_latebound`).
- Do not import `makemon.js`→`hack.js`/`artifact.js`/`minion.js`.
  No `fruitadd` after objects exist. No fourth town gnome.
  Do not stub door `appear=0` (D-1536) or furnsyms 0..5 (D-1543).
  Do not glue `namefloorobj` / `mhidden_description`. Do not
  let remembered-object otyp win over a displayed monster
  glyph (D-1547). Do not import `uhitm.js`→`pager.js`
  statically. Do not zero `cspfx` when `W_ART` (D-1539). Do
  not candify ghostfruit. Do not skip Light source via
  `mksobj_at` without `o->lit`. Do not skip `detect_wsegs`
  `show_glyph` (D-1545). Do not treat `data === mons()` as a
  long-worm test (D-1549). Do not skip `worm_known` in
  `_canseemon`/`monkilled` (D-1548) or leave trap `monkilled`
  on head `cansee` (D-1550 / **509**). Do not glue `howmonseen` /
  cutworm / `redraw_worm`. Do not skip `tamedog`
  `wake_nearto` (D-1546) or glue FULL_MOON S_DOG / ustuck.
  Do not skip getpos `look_at_object` (D-1547). Do not skip
  canned `CMDQ_INT` then KEY in getobj (D-1551). Do not skip
  Eyes `is_plural` / `undiscovered_artifact` (D-1552). Do not
  skip `splev_create_monster` amask (D-1553) or stub
  `mk_mplayer` / always `induced_align(80)`.

## Landmarks (≤15)

- D-1553: `splev_create_monster` `sp_amask_to_amask` +
  non-RANDOM `mk_roamer`. Room clones wrappers. Pri-loca/
  sanctum via dispatcher. `mk_mplayer` / appear_as named.
- D-1552: `is_plural` Eyes + `undiscovered_artifact` artidisco.
  `otense` / `not_fully_identified` / `obj_is_pname` /
  `fully_identify_obj` `discover_artifact`. iactions
  `the_unique_obj`. other INTERNALCMD named.
- D-1551: `getobj_from_cmdq` canned CMDQ_INT then KEY +
  split_otmp. ALLOWCNT throw/drop/wield/ready/charge/adjust +
  apply/grease/jelly/rub KEY. eat/read/zap/tin / pickinv
  `&ctmp` / `in_doagain` named.
- D-1550: trap.js `monkilled` clone `wormno ? worm_known :
  cansee(head)` (review **509**). pit/fire/rust. Clone stays
  local. `howmonseen` / cutworm named.
- D-1549: `map_monst` / `monster_detect` long-worm via
  `data.mndx ?? mnum` (not `mons()` ptr). `detect_wsegs` reachable.
  Head pet/detected glyphs named.
- D-1548: `worm_known` any wseg `cansee`; `_canseemon` skips
  infrared when `wormno`; mhitm `monkilled` same.
  `howmonseen` / cutworm / `redraw_worm` named.
- D-1547: lookat getpos `look_at_object` + `glyph_to_obj_at`
  (gbuf; displayed mon wins). `map_object` stores otyp.
  `namefloorobj` / `mhidden_description` named.
- D-1546: `tamedog` live `wake_nearto(mx,my,1)` (wake_msg +
  STRAT_WAITMASK + disturb; dist2<1). Not local sleep clear.
  FULL_MOON S_DOG / ustuck / `redraw_worm` named.
- D-1545: `detect_wsegs` body is C; identity is D-1549. Head
  pet/detected glyphs named.
- D-1544: `that_is_a_mimic` live `object_from_map` + defsyms
  PCHAR desc + `MIM_OMIT_WAIT`. Dynamic pager import. getpos
  fakeobj is D-1547. `namefloorobj` / `mhidden_description`
  named.
- D-1543: furnsyms real S_* (`:2490–2497` ROLL_FROM cmap not
  levl.typ). Not stub 0..5. Protection / `block_point` / DELPHI
  named. Door is D-1536.
- D-1542: themerms Light source `l_create_object` OIL_LAMP
  `lit=true` (Lua `:204–209`). Not `mksobj_at`. `o->lit` is D-1533.
- D-1541: `ghostfruit` oldfruit fid→fname then fruitadd else
  (no `current_fruit`). Clone in bones.js. goodfruit is D-1523.
- D-1540: `make_happy_shk` adjalign / home or migrate+kops /
  shoppers. mnearto / occupancy named. Covetous is D-1532.
- D-1539: cspfx W_ART ESP/STLTH/TCTRL/WARN/EREGEN/HSPDAM/HPHDAM;
  invent callers. defn/cary / SEARCH/REGEN/XRAY named.
