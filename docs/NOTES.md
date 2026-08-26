# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after audit **#1910** HEAD `6a42c40e`
  (Scr **11,405** RNG 100%, `36+0.31/turn` R² 0.86).
  **Next:** Open `objnam.c` `reorder_fruit`. Not
  fruit_from_indx. D-1521 doname_base slime-mold fake_arti
  (`artifact_name` FALSE; force_the `"the "` else no a/an;
  xname the-strip). D-1520 fruitadd live
  `fruit_from_name(FALSE)`. Bones/restore ghostfruit named.
  Do not skip D-1521…D-1229. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`. pickup `body_part`
  latebound; do not import pickup→polyself.
- Do not revert D-1217–D-1521. Named still: worm segs;
  `visible_region_summary`; `show_region`; GETOBJ_ALLOWCNT;
  tamedog is_covetous; `#altdip`; `goodfruit` /
  `reorder_fruit`; wander/`somexy`; `create_object` `o->lit`;
  emin; altar Align2amask; `mcast_blind_you` EYE;
  quantum-cat FOOT; cspfx W_ART.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1521.
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
  nhcore (D-1066). Do not skip D-1067…D-1521 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089). Do not restore exact-only fruit walker (D-1520) or
  always-a/an slime-mold doname (D-1521).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for
  `body_part` (use `objnam.js` `body_part_latebound`).
- Do not import `makemon.js`→`hack.js` for `in_town` (D-1517)
  or `makemon.js`→`artifact.js` for `u_wield_art` (D-1518).
  Do not call `fruitadd` at init after objects exist;
  `init_fruit_chain` only. No fourth town gnome (D-1513).

## Landmarks (≤15)

- D-1521: doname_base slime-mold fake_arti. `artifact_name(bp,0,FALSE)`;
  force_the `"the "` else no a/an. xname `:1011` the-strip.
  Local `artifact_name_objnam`. `reorder_fruit` named.
- D-1520: fruitadd live objnam `fruit_from_name` FALSE +
  max fid. Prefix reuse; tin/corpse/egg candify; `rnd(127)`.
  Orc `fruitadd_orc` same walker. ghostfruit named.
- D-1519: gnome trap-victim candle: `place_object` then
  `!levl.lit` → live `begin_burn`. Not minvent D-1506.
- D-1518: `is_dprince && MS_BRIBE` peace+invis; Excalibur/
  Demonbane hostile; raven+bec peace. Local `u_wield_art`.
- D-1517: maze statue `!(In_mines && in_town(u.ux,u.uy))`
  then `!In_sokoban` then `rn2(2)`. Local `in_town` clone.
- D-1516: non-salamander S_LIZARD unarmed; ninja SHURIKEN|
  DART then SHORT_SWORD|AXE. Live `mongets`.
- D-1515: S_KOP `!rn2(4)` cream pies then `!rn2(3)` CLUB|
  RUBBER_HOSE. G_NOGEN until `makekops`.
- D-1514: SPFX_WARN `spec_m2` → EWarn_of_mon + warntype.obj;
  else EWarning. MATCH_WARN in sensemon/newsym.
- D-1513: minetn-7 three town `gnome` then lord + two
  monkeys. No fourth `splev_room_monster`.
- D-1512: `any_visible_region` first `visible && ttl != -2`;
  allmain OR after Warn_of_mon. C is `region.c`.
- D-1511: `fruit_from_indx` by fid; slime mold `fname` /
  `"fruit"` / quan ick; `init_fruit_chain` fid 1.
- D-1510: `poly_obj` worn remap W_WEAPONS keep slot else
  `wearslot&old`; `set_wear` async.
- D-1509: lichen+acid wrinkle no-poof; else `erode_obj`
  ERODE_CORRODE EF_GREASE. H2O is D-1501.
- D-1508: `body_part` HEAD via polyself; HAND latebound
  in pickup. EYE/FOOT named.
- D-1507: Sokoban first-try `throws_rocks` reject before
  `goodpos`. Later tries fair.
