# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress (cadence **#2120** at `0c720b98`). Save-oracle
  required for tagged restore Open. Private B0: trap-same-floor 17/17;
  ledger 26/26; wait-save catchup 30/30; catchup-after-restore 26/30
  red; trap-ledger 38/38; shop template 35/35 (no unpaid). Reviews
  **669–677** ACCEPT-WITH-DEBT (no Must-fix). **Next:** Open `calendar.c`
  hhmmss (named). Not yyyymmddhhmmss.
  Do not skip D-1531…D-1724. Do not re-port D-1675…D-1724.
  Falsify: `hhmmss` date formatting, not `yyyymmddhhmmss`.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; setworn oc_oprop; keepdogs/grow_up leash;
  light-scroll `initedog`; tip-spill/squeaky; hideunder;
  display_monster furniture lastseentyp; guardian remaps; Punished
  float_down; water/lava steed; uhitm `u.dx`; map_menu_cmd;
  `context.novel`; walk-key / PREFIXCMD overlay;
  `possibly_unwield` / `mon_break_armor`; sync `newcham`; array rn2
  / pauper_legacy / killed_nemesis; spell dull / zap rider eyecount;
  perm_invent can_set; polyself `uskin=`; steal/muse
  `unknow_object`; Hallu `obj_to_glyph` query; invent.c `useupall` /
  `obfree`; `yn_function_menu`; getdir CQ_REPEAT / mouse getpos;
  `hhmmss`; `is_multigen`/`is_poisonable`; choose_stairs /
  `u_left_shop`; `artifact_score`; hidden_gold; `free_luathemes`;
  other load_* `des.object`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1724.
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
  nhcore (D-1066). Do not skip D-1067…D-1724 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1724. Do not delete emin (**487**). Do not stub
  `make_happy_shk` pacify-only (D-1540). Do not import bones→options
  for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / binary savelev-freeing / lua `lspo_reset_level`.
  JSON `cant_go_back` analogue is D-1722. JSON `restore_artifacts` is
  D-1698. Default `spot_monsters` Off.
  Do not keep timeout.c `mon_is_local` for LS_MONSTER lights (D-1708).
  Do not stamp every `fmon` in `update_mlstmv` (D-1709).
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`. D-1576…D-1724 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  D-1682…D-1724 (index). D-1724 is recalc sokosolved/rogue/quest
  flags (not DRAWBRIDGE_UP lastseentyp). D-1723 is non-merge quan
  do-while (not D-1712 extract). D-1722 is FREEING JSON analogue
  (not binary NHFILE). D-1721 getdir is yn_function then clear
  (no trailing confdir).

## Landmarks (≤15)

- D-1724: `recalc_mapseen` `:3099–3134` sokosolved / roguelevel /
  quest_summons / questing / notreachable. Live `js/dungeon.js`.
  Named: display_monster furniture lastseentyp.
- D-1723: `lspo_object` `:3725–3740` non-merge quan do-while. Live
  `js/mklev.js`. Named: other load_* `des.object`.
- D-1722: `goto_level` `:1640–1664` `cant_go_back` FREEING. Live
  `js/do.js` + `delete_levelfile` / `remdun_mapseen` /
  `discard_migrations`. Named: `free_luathemes`.
- D-1721: `getdir` `:3987–4011` yn_function then clear. Live
  `js/lock.js` + throw/zap/dig clones. Named: CQ_REPEAT.
- D-1720: `currency` Hallu `ROLL_FROM`. Live `js/invent.js`.
- D-1719: `arti_cost` + `artilist.cost`. Live `js/artifact.js`.
- D-1718: glass `get_cost` `ubirthday` table. Live `js/shk.js`.
- D-1717: `remote_burglary` + `rob_shop`/`call_kops`. Live `js/shk.js`.
- D-1716: mute/Deaf nod `hero_deaf`/`muteshk`. Live `js/shk.js`.
- D-1715: Traditional itemize ynq + dopayobj y_n. Live `js/shk.js`.
- D-1714: FullyUsedUp/PartlyUsedUp dummy billobjs. Live `js/shk.js`.
- D-1713: `observe_object` FIRST_OBJECT skip. Live `js/invent.js`.
- D-1712: objects.h BITS `oc_merge`. Named: `is_multigen`.
- D-1711: `update_lastseentyp` DRAWBRIDGE_UP / furniture-mimic.
- D-1710: `yyyymmddhhmmss` cemetery `when[]`. Named: `hhmmss`.
