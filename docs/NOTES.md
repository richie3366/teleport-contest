# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1610 (cadence `#2000` at `b9710bcf`).
  seed4500 still PASS.
  **Hypothesis:** Open `getline.c` getlin ^P `tty_doprev_message`
  (named) is the next map cluster. Not command ^P. Not `initedog`.
  **Falsify:** `node scripts/csym.mjs getlin`;
  `node scripts/sym.mjs getlin`.
  **Next:** Open getline ^P. D-1610 shipped `initedog` ogoal `-1`
  + first-pet livelog. Do not skip D-1531…D-1610. No FORCE /
  `wildmiss` wrap / trailing `confdir` in shared `getdir`.
- Named still: sit/pray `eyecount`; Palantir `#if 0`; pit/underwater;
  clone auto-open yn; floor `query_classes`;
  getline/yn ^P; restore_msghistory; `restore_cham` / `rescham`;
  peaceful MS_HUMANOID / `"threatens you."`; `take_off` /
  `menu_remarm`; ggetobj drop; `consume_obj_charge`
  `update_inventory`; get_count historicmsg; tty WIN_INVEN create
  (`allmain.c:726`); `#perminv`; `optfn_perminv_mode`;
  `doextlist` / BIND= `seeall`; `reset_hostility`; ACH_ASTR;
  dogmove Conflict `lose_guardian_angel` caller;
  newcham mleashed / keepdogs stay-behind / grow_up leash;
  `free_edog` / restore `newedog` / read.c light-scroll `initedog`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1610.
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
  nhcore (D-1066). Do not skip D-1067…D-1610 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1610. Do not delete emin
  (**487**). Do not stub `make_happy_shk` pacify-only (D-1540).
  Do not import bones→options for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level` /
  `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`. D-1576…D-1610 live in the index. Do not glue
  getline ^P / yn ^P. No `ing_suffix`
  clone #3. Do not poke `beyond_savefile_load` to “prove” InvInUse
  (D-1603 writers are preamble `:71` / `try_restore_save` `:942`).
  Do not restore zap `bhit` sticky `u.Blind||u.ublind` (D-1604).
  Do not re-port `doprinuse` for `#seeall` (D-1605). Do not
  re-port `mplayer_talk` (D-1606; peaceful / threatens you named).
  Do not re-port `mongets` sword spe (D-1607). Do not re-port
  `gain_guardian_angel` (D-1608; dogmove Conflict caller named).
  Do not re-port `m_unleash` (D-1609; newcham mleashed named).
  Do not re-port `initedog` ogoal / first-pet livelog (D-1610).

## Landmarks (≤15)

- D-1610: `initedog` ogoal `-1,-1` + livelog `!pets && in_moveloop`
  then `pets++`. `dog_goal` `ogoal.x` truthy sentinel. One
  `mon_pmname` export. `free_edog` / restore `newedog` named.
- D-1609: `m_unleash` `pline_mon` + `update_inventory`; `m_detach`
  FALSE in `mondead`; dogmove ALLOW_U; explmm slack after mondead.
  newcham mleashed / keepdogs stay-behind named.
- D-1608: `gain_guardian_angel` Conflict `lose_guardian_angel` +
  fervent `mk_roamer` angel; pets conduct gate; no tamedog.
  `Hear_again` / `mk_roamer` one export. dogmove caller named.
- D-1607: `mongets` mplayer-sword `spe=3+rn2(4)` plus demon /
  lminion / candelabrum / Bell / Book arms. One obj.h `is_sword`.
- D-1606: `mplayer_talk` hostile endgame `is_mplayer` `#chat`
  verbalize + one `rn2(3)`; mndx vs `urole.mnum`. SetVoice no-op.
  Peaceful MS_HUMANOID / `"threatens you."` named.
- D-1605: `#seeall` EXT_CMDS `doprinuse` typed runner +
  `accept_menu_prefix` CMD_M_PREFIX flag; sibling see*; `*` key
  D-0340. `doextlist` / BIND= named.
- D-1604: zap `bhit` `show_transient_light` `!Blind` is youprop
  `(H||E)&&!B` + `uroleplay.blind`, not sticky `u.Blind||u.ublind`
  (review **558**). Apply camera Blind unchanged. Worm tails named.
- D-1603: `beyond_savefile_load=1` new-game preamble + restore
  `try_restore_save`; perm_invent `update_inventory` after
  `in_moveloop`. Default Off no-op. tty WIN_INVEN create named.
- D-1602: `ggetobj` Traditional getlin then `askchain` for takeoff
  (`is_worn`/`select_off`) and identify. ident `'q'` `-1`; skip
  takeoff `"That was all."` `take_off`/`menu_remarm`/drop named.
- D-1601: `tty_doprev_message` WIN_MESSAGE + `gt.toplines`; `'s'`
  `redotoplin` NEED_MORE/`more` iff cury; `'f'`/`'c'`/`'r'` menu.
  cmd ^P / `#prevmsg`. getline/yn `inread` named.
- D-1600: perm_invent InvInUse helpers; writers D-1603.
  tty paint / `#perminv` named.
- D-1599: SORTLOOT_PETRIFY keeps `touch_petrifies` CORPSE when
  filter rejects FOOD; Blind `look_here`/`pickup` feel. eat/doloot
  named.
- D-1598: `has_mcorpsenm` `mextra && MCORPSENM != NON_PM`.
  object_detect / `altarmask_at` named.
- D-1597: `show_transient_light` camera range 0 + thrown lamplit
  `mtemplit`. **D-1604** zap `bhit` youprop Blind. Worm tails named.
- D-1596: `create_mplayers` class `rn1` + `goodpos` + `mk_mplayer`.
  `gain_guardian_angel` is D-1608. `mplayer_talk` is D-1606.
