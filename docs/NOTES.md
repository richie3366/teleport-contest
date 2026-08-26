# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress after audit **#1930** (Scr **11,405**
  RNG **792,838**/792,838 = 100%). seed0367 FULL.
  **Hypothesis:** next work is Open `dog.c` `tamedog` `wake_nearto`
  (named). Not is_covetous. Must-fix empty. D-1545 closed
  `detect_wsegs` via `map_monst` showtail.
  **Falsify:** port `wake_nearto` so taming clears nearby
  `msleeping` like C `dog.c` `:1160–1161`, not a local sleep
  clear only.
  **Next:** Open `wake_nearto`. Not FULL_MOON S_DOG.
  Do not skip D-1531…D-1545. Do not glue `worm_known`. No
  FORCE / `wildmiss` wrap / trailing `confdir` in shared `getdir`.
- Named still: getpos fakeobj; `worm_known`;
  `mhidden_description`; `namefloorobj`. Palantir `#if 0`.
  CMDQ_INT / pickinv count. `splev_create_monster` RANDOM-only.
  `tamedog` `wake_nearto` / FULL_MOON S_DOG / ustuck. Other
  mcast_spell; sit/pray `eyecount` always-2. muse quantum-loot;
  escape cat HP. Eyes `is_plural`; other INTERNALCMD.
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
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1545.
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
  nhcore (D-1066). Do not skip D-1067…D-1545 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1545 (index). Do not
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
  Do not glue getpos fakeobj / `namefloorobj` / `mhidden_description`.
  Do not import `uhitm.js`→`pager.js` statically. Do not zero
  `cspfx` when `W_ART` (D-1539). Do not candify ghostfruit.
  Do not skip Light source via `mksobj_at` without `o->lit`.
  Do not skip `detect_wsegs` `show_glyph` (D-1545) or glue
  `worm_known`.

## Landmarks (≤15)

- D-1545: `detect_wsegs` `what_mon` once + `show_glyph` body
  segs; `map_monst` showtail; `S_WORM_TAIL` class. Not newsym.
  `worm_known` / cutworm / map_monst head pet/detected named.
- D-1544: `that_is_a_mimic` live `object_from_map` + defsyms
  PCHAR desc + `MIM_OMIT_WAIT`. Dynamic pager import. getpos
  fakeobj / `namefloorobj` / `mhidden_description` named.
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
- D-1538: `mon_arrive` wander/`somexy`; EXACT_XY zeros wander;
  mkroom clone. kops / `Wiz_arrive` named.
- D-1537: INTERNALCMD `#altdip`; typed `#` unknown. Eyes
  `is_plural` / other INTERNALCMD named.
- D-1536: door/wall `S_hcdoor` left-connect / rogue `S_hwall`.
  Furnsyms is D-1543.
- D-1535: `observe_quantum_cat` FOOT latebound + loot/tip/disclose.
  muse/escape HP named.
- D-1534: `mcast_blind_you` EYE + `make_blinded` 200/100.
  Blinded `H&&!B`.
- D-1533: `create_object` `o->lit` `begin_burn` after `stackobj`.
  Light source fill is D-1542.
- D-1532: `tamedog` is_covetous envelope. `make_happy_shk` is
  D-1540. `wake_nearto` named.
- D-1531: Pri-loca `align=noalign` `mk_roamer_splev` (`MM_EMIN`,
  `A_NONE`). Emin kept.
