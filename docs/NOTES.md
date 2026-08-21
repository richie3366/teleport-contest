# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1379; cadence **#1750** `12953730`
  (Scr **11,405** RNG 100% speed `38+0.31/turn`). Next: Open
  `zap.c` `zapnodir` WAN_WISHING (named). Not create.
  Reviews **335–338** ACCEPT-WITH-DEBT; Must-fix empty. Do not
  skip D-1379…D-1229. No FORCE. Do not wrap `wildmiss`.
- Do not revert D-1217–D-1379. `see_monsters` warn_obj_cnt /
  `Sting_effects` / SPFX_WARN / ARMOR gloves `:1412` still named.
  fruit_from_name + artifact_name in `the()` still named.
  minetn-1 loader / dog leftovers / `add_to_minv` merge named.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1379.
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
  nhcore (D-1066). Do not skip D-1067…D-1379 (index).
- Do not skip D-1071…D-1379 (index). Named still: hitmm artifact
  wep; mthrowu/zap/hmon
  `shade_miss` callers; mdamagem CONF/STUN/FIRE leftover;
  mhitm wrap brush;
  `do_attack` leprechaun evade.
  Do not restore fountain `lesshungry` (D-1359). No ALIGN/FORCE
  on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1379: `zap.c` `zapnodir` WAN_CREATE_MONSTER `:2569–2574`
  `create_critters(rn2(23)?1:rn1(7,2),NULL,FALSE)` +
  `makemon.c` `:1556–1590` eel `enexto` / seen known.
  Wish/enlighten/stasis + scroll/spell create named.
- D-1378: `spell.c` skilled SPE_FIREBALL/CONE `throwspell`
  `:1655–1701` + scatter `:1419–1454` `rnd(8)+1` explode olet 0
  + `spell_damage_bonus`. Unskilled FALLTHROUGH weffects named.
- D-1377: `artifact.c` `invoke_blinding_ray` `:2054–2086` —
  getdir ray / dz `litroom` radius-0 / self `lightdamage`+
  `flashburn`; cost `SPELL_LEV_PW(5)`/`rnz(100)`/`d(3,10)`.
  Extract `inv_prop`. Other specials named.
- D-1376: `muse.c` MUSE_CAMERA find `!rn2(6)` + use
  `make_blinded`/`lightdamage(TRUE,5)`/`spe--`/return 1.
- D-1375: `dig.c` `use_pick_axe2` axe-scratch `u_wipe_engr(3)`
  unless LANDMINE/BEAR_TRAP. Callee D-1051.
- D-1374: `dothrow.c` `throw_obj` `:138` `u_wipe_engr(2)` after
  self refuse.
- D-1373: `uhitm.c` `do_attack` `:551` `u_wipe_engr(3)` after
  STR exercise; leprechaun evade still named.
- D-1372: `allmain.c` `moveloop` DEX `!rn2(40+ACURR(A_DEX)*3)`
  then `u_wipe_engr(rnd(3))`.
- D-1371: zap.js `Shock_resistance()` uprops[SHOCK_RES]; did
  not rewrite confer. Explode/pray/sit clones named.
- D-1370: `dokick.c` kick_dumb/ouch air/Lev `hurtle`.
- D-1369: `zapyourself` WAN_MAKE_INVISIBLE `incr_itimeout`.
- D-1366: `lightdamage` live; camera D-1376; Sunsword D-1377.


