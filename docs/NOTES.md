# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after audit **#1910** HEAD `6a42c40e`
  (Scr **11,405** RNG 100%, `36+0.31/turn` R² 0.86).
  **Next:** Open `dog.c` `tamedog` is_covetous.
  Not leftovers.
  D-1530 getobj ALLOWCNT count prefix. D-1529 `see_wsegs` +
  `is_worm_tail`. D-1528 `show_region`. D-1527 `#timeout`
  visible_region_summary. D-1526 emin.
  restore `ghostfruit` named. Do not skip D-1530…D-1229.
  No FORCE / `wildmiss` wrap / trailing `confdir` in shared
  `getdir`. pickup `body_part` latebound; no
  pickup→polyself.
- Do not revert D-1217–D-1530. Named still: tamedog
  is_covetous; `#altdip`; wander/`somexy`;
  `create_object` `o->lit`; door `S_hcdoor`;
  furnsyms real S_*; `mcast_blind_you` EYE; quantum-cat
  FOOT; cspfx W_ART; ghostfruit; getpos fakeobj;
  `that_is_a_mimic`; detect_wsegs; `worm_known`.
  Palantir `#if 0`. CMDQ_INT / pickinv count /
  `finish_splitting` named.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1530.
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
  nhcore (D-1066). Do not skip D-1067…D-1530 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089). Do not restore exact-only fruit walker (D-1520) or
  always-a/an slime-mold doname (D-1521). Do not omit
  `reorder_fruit` or call it from production ^X (D-1522). Do not
  omit `goodfruit` / `savefruitchn` fid>=0 (D-1523). Do not skip
  fake look SLIME_MOLD `spe = current_fruit` (D-1524). Do not
  stub TEMPLE `S_altar` or skip Align2amask `MCORPSENM` (D-1525).
  Do not skip emin roaming after LONG_WORM (D-1526). Do not skip
  `#timeout` `visible_region_summary` (D-1527) or `show_region`
  overlay (D-1528). Do not skip `see_wsegs` / `is_worm_tail`
  (D-1529). Do not skip getobj ALLOWCNT count prefix (D-1530).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for
  `body_part` (use `objnam.js` `body_part_latebound`).
- Do not import `makemon.js`→`hack.js` for `in_town` (D-1517)
  or `makemon.js`→`artifact.js` for `u_wield_art` (D-1518)
  or `makemon.js`→`minion.js` for `Inhell` (D-1525; hellish).
  Do not call `fruitadd` at init after objects exist;
  `init_fruit_chain` only. No fourth town gnome (D-1513).

## Landmarks (≤15)

- D-1530: getobj ALLOWCNT digit `get_count` + throw-one +
  split_otmp. `splittable` loadstone/welded. Child after
  parent on invent[]. Charge/drop/throw/wield/ready/adjust.
  Palantir / CMDQ_INT / pickinv count / finish_splitting
  / stash getobj named.
- D-1529: `see_wsegs` newsyms body segs except dummy.
  `is_worm_tail` paints `PM_LONG_WORM_TAIL` `~`.
  Callers see_monsters / mon_set_minvis / postmov minvis.
  Occupancy `_level_monsters`. minvis hides tails.
  detect_wsegs / `worm_known` / feel_location named.
- D-1528: `show_region` paints S_cloud / S_poisoncloud.
  newsym cansee ACCESSIBLE|pool/lava unless
  `mon_overrides_region`. `_map_location` overlay
  show&&!Blind. DRAWBRIDGE_UP under named.
- D-1527: `#timeout` `wiz_timeout_queue` + `visible_region_summary`.
  Gate `any_visible_region`; ttl+1; poison gas vs vapor; box
  from rects. tid `timer_id++` from 1.
- D-1526: emin roaming after LONG_WORM. Cleric/high
  `!(MM_EPRI|MM_EMIN)` always; angel `!(MM_EMIN)&&!rn2(3)`.
  `newemin`+`isminion`+`min_align=rn2(3)-1`+renegade XOR
  peace. Flagged callers skip. Door `S_hcdoor` named.
- D-1525: TEMPLE mimic `S_altar` (33); `MCORPSENM`
  `(Inhell && rn2(3)) ? AM_NONE : Align2amask(rn2(3)-1)`;
  hellish not minion `Inhell`; stale `has_mcorpsenm`
  `NON_PM`. Door `S_hcdoor` / furnsyms named.
- D-1524: object_from_map fake SLIME_MOLD `spe =
  current_fruit`; mimic MCORPSENM override. look_at_object
  distant_name+doname; brief_at/look_all. Glyphotyp not
  integer glyph. that_is_a_mimic / getpos fakeobj named.
- D-1523: goodfruit `fruit_from_indx(-id)` then fid=id.
  savebones negate-all; drop/resetobjs SLIME_MOLD;
  savefruitchn fid>=0; getlev oldfruit then free.
  ghostfruit named.
- D-1522: reorder_fruit `allfr[1+127]` fid sort. Forward TRUE
  chain 1,2,3…; bad/dup fid unsorted. Insight DEBUG dump named.
- D-1521: doname_base slime-mold fake_arti. `artifact_name(bp,0,FALSE)`;
  force_the `"the "` else no a/an. xname `:1011` the-strip.
  Local `artifact_name_objnam`.
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
