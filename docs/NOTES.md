# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1374; cadence **#1745** `08007958`
  (Scr **11,405** RNG 100% speed `40+0.33/turn`). Next: Open
  `dig.c` `u_wipe_engr` caller (named from D-1360).
  Not dothrow. Reviews **331–334** ACCEPT-WITH-DEBT; Must-fix
  empty. Do not skip D-1374…D-1229. No FORCE. Do not wrap
  `wildmiss`.
- Do not revert D-1217–D-1374. `see_monsters` warn_obj_cnt /
  `Sting_effects` / SPFX_WARN / ARMOR gloves `:1412` still named.
  fruit_from_name + artifact_name in `the()` still named.
  minetn-1 loader / dog leftovers / `add_to_minv` merge named.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1374.
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
  nhcore (D-1066). Do not skip D-1067…D-1374 (index).
- Do not skip D-1071…D-1374 (index). Named still: hitmm artifact
  wep; mthrowu/zap/hmon
  `shade_miss` callers; mdamagem CONF/STUN/FIRE leftover;
  mhitm wrap brush; dig `u_wipe_engr`;
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

- D-1374: `dothrow.c` `throw_obj` `:138` — after self refuse
  (`dx=dy=dz=0`) `u_wipe_engr(2)` before petrify/welded/wet-towel
  / multishot. Callee D-1051; dokick(2) D-1360; allmain DEX
  D-1372; uhitm(3) D-1373. No extra RNG with no engraving /
  HEADSTONE / BURN-on-stone / Levitation. canletgo / Mjollnir /
  too-heavy still named (C returns before wipe). dig.c still
  named.
- D-1373: `uhitm.c` `do_attack` `:551–553` — after `exercise(A_STR,TRUE)`
  `u_wipe_engr(3)` before leprechaun/hitum. Callee D-1051;
  dokick(2) D-1360; allmain DEX D-1372; dothrow is D-1374.
  No extra RNG with no engraving / HEADSTONE / BURN-on-stone /
  Levitation. dig.c caller and leprechaun evade still named.
- D-1372: `allmain.c` `moveloop` `:360–361` — after invault
  (amulet named) `!rn2(40+ACURR(A_DEX)*3)` then
  `u_wipe_engr(rnd(3))`. Callee D-1051; dokick(2) D-1360.
  `rnd(3)` always on fire; no extra RNG with no engraving /
  HEADSTONE / BURN-on-stone / Levitation. uhitm is D-1373;
  dothrow is D-1374; dig still named.
- D-1371: zap.js `Shock_resistance()` — C `youprop.h:42–44`
  H||E via `uprops[SHOCK_RES]` (invent `hero_Shock_resistance`
  / D-1089). confer ring/shield extrinsic only; exploding-wand
  `"You aren't hurt!"` (still `rnd(10)`) + WAN_LIGHTNING
  unharmed. Did not rewrite confer. explode/pray/sit clones
  named. AD_ELEC destroy body is D-1368.
- D-1370: `dokick.c` `kick_dumb` `:876–877` + `kick_ouch`
  `:904–905` — air/Lev `hurtle`. Dumb: `(Is_airlevel ||
  Levitation) && rn2(2)` range 1. Ouch: after `losehp`
  (noreturn skip) `rn1(2,4)`. Levitation is youprop
  `(H||E)&&!B` (D-1070). Callee `dothrow.js` `hurtle`.
  Monster recoil / `kick_object` air still named.
- D-1369: `zap.c` `zapyourself` WAN_MAKE_INVISIBLE `:2825–2842`
  — snapshot `!Invis && !Blind && !BInvis`; wrapping
  `You_feel` itchy absorb; else `incr_itimeout(&HInvis,
  rn1(15,31))`; msg → learn + `newsym` + `self_invis_message`.
  BInvis stand-in: worn `MUMMY_WRAPPING` (setworn w_blocks
  named). bhitm / zap_updown / zap_steed still named.
- D-1368: `zap.c` `maybe_destroy_item` AD_ELEC `:5858–5879` +
  `destroyable` `:5641–5644` — RIN_SHOCK/WAN_LIGHTNING immune;
  worn non-metallic gloves skip; charged ring `rn2(3)`
  `recharge(obj,0)` RING spin/`rn2(7)` explode; else dust;
  wand `rnd(10)` explode + Shock `aren't hurt`. Worn
  `Ring_gone`/`setnotworn`. Full read.c wand/tool recharge
  named. WAN_SPEED/SLOW/DRAIN_LIFE still named.
- D-1367: `zap.js` `Antimagic()` — C `youprop.h` H||E via
  `uprops[ANTIMAGIC]` (invent `hero_Antimagic` / sit D-1089).
  confer_oc_oprop cloak-of-MR / gray DSM extrinsic only; bounce
  MAGIC_MISSILE (no `d(4,6)`) and WAN_STRIKING `"Boing!"`.
  Did not rewrite confer. shieldeff/monstseesu still named.
- D-1366: `zap.c` `lightdamage` `:3024–3056` — gremlin
  `rnd`/`cap`/`Ow`/`losehp(Maybe_Half_Phys)` zapped/blasted +
  `ansimpleoname`. zapnodir WAN/SPE_LIGHT `litroom` then amt 5.
  zapyourself WAN_LIGHT `d(spe,25)` FALLTHROUGH CAMERA +
  `rnd(25)` `flashburn(FALSE)` damage 0. Live `js/zap.js` +
  `read.js` seffect_light. muse camera / Sunsword invoke /
  WAN_MAKE_INVISIBLE named.
- D-1365: `zap.c` `zapyourself` `:2748–2751` SPE_FIREBALL —
  `You` explode on self then `explode(ux,uy,11,d(6,6),WAND_CLASS,EXPL_FIERY)`.
  No `learn_it`; return 0 (explode owns HP). Live `js/zap.js`
  + `explode.js`. WAN_MAKE_INVISIBLE /
  spell.c skilled scatter named.

