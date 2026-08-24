# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1422; cadence **#1790** `9f2a3a08`
  (Scr **11,405** RNG 100% speed `38+0.30/turn` R² 0.83). Next:
  Must-fix `zap.c` `bhitm` WAN_MAKE_INVISIBLE `knowninvisible`
  conferral `See_invisible` (review **374**). Not slow.
  Reviews **375–382** ACCEPT-WITH-DEBT; **374** QUALITY-RISK.
  Do not skip D-1422…D-1229. No FORCE. Do not wrap `wildmiss`.
  Do not add trailing `confdir` to shared `getdir`.
- Do not revert D-1217–D-1422. Named still: `see_monsters`
  warn_obj / Sting / SPFX_WARN / ARMOR gloves; fruit_from_name
  + artifact_name in `the()`; minetn-1 / dog leftovers /
  `add_to_minv` merge.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1422.
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
  nhcore (D-1066). Do not skip D-1067…D-1422 (index).
- Named still: rustm / poison / worm-shrieker;
  remaining peffects (polymorph/gain energy/acid/gain level/blindness);
  remaining wand-duplicate SPE_LIGHT
  cast; artifact invoke enlightenment. mhitm artifact_hit
  is D-1415; bhitm WAN_MAKE_INVISIBLE is D-1414;
  peffect_enlightenment is D-1413; SPE_DETECT_UNSEEN
  is D-1412; full healing D-1411; zapyourself WAN_SPEED D-1410;
  bhitm WAN_SPEED is D-1422; spell_backfire D-1409; haste D-1408;
  zap backfire D-1416; DETECT_TREASURE D-1417; DETECT_MONSTERS D-1418;
  LEVITATION D-1419; RESTORE_ABILITY D-1420; INVISIBILITY D-1421. No fountain
  `lesshungry` (D-1359). No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1422: `zap.c` `bhitm` WAN_SPEED_MONSTER `:233–242`
  `!resist` NOTELL then `seemimic` + `mon_adjust_speed(+1,otmp)`
  + `check_gear_next_turn`; `helpful_gesture` always.
  Callee worn.c `:488–564` / muse.js D-0871. Sleeping skips
  pline/learnwand. WAN_SLOW / zap_steed still named.
  zapyourself speed is D-1410.
- D-1421: `spell.c` SPE_INVISIBILITY peffects `:1544–1546`
  FALLTHROUGH `peffects` (no skilled bless). Callee
  `potion.c` `peffect_invisibility` `:811–838` wrapping
  itchy return; else Invis/Blind/BInvis `potion_nothing`
  else `self_invis_message`; blessed `!rn2(HInvis?15:30)`
  `HInvis |= FROMOUTSIDE` else `incr_itimeout`
  `d(6-3*bcsign,100)+100`; cursed aggravate + strip
  FROMOUTSIDE. Expiry `timeout.c` `:759–767` newsym + You.
  bhitm speed is D-1422; locking still named.
- D-1420: `spell.c` SPE_RESTORE_ABILITY peffects `:1534–1546`
  skilled bless then `peffects`; callee `potion.c`
  `peffect_restore_ability` `:646–693` cursed Ulch else
  Wow good/better/great; `rn2(A_MAX)` ABASE=AMAX + AEXE
  max 0; potion `pluslvl(FALSE)`; apply.c
  `unfixable_trouble_count`. Invisibility is D-1421.
- D-1419: `spell.c` SPE_LEVITATION peffects `:1534–1546`
  skilled bless then `peffects`; callee `potion.c`
  `peffect_levitation` `:1165–1221` `set_itimeout(1)`+
  `float_up` else `potion_nothing++`; cursed `~I_SPECIAL`
  then upstairs `doup` or ceiling `rnd`/`losehp`; blessed
  `rn1(50,250)`+`I_SPECIAL`; uncursed `rn1(140,10)`.
  Expiry `float_down`. Restore is D-1420.
- D-1418: `spell.c` SPE_DETECT_MONSTERS peffects `:1534–1546`
  skilled bless then `peffects`; callee `potion.c`
  `peffect_monster_detection` `:914–952` blessed
  `incr_itimeout` HDetect_monsters then lonely else
  `monster_detect`; empty → `strange_feeling` threatened /
  hallu heebie jeebies return 1. Expiry `see_monsters`.
  Cursed wake / blessed WIN_MAP still named.
- D-1417: `spell.c` SPE_DETECT_TREASURE peffects `:1534–1546`
  skilled bless then `peffects`; callee `potion.c`
  `peffect_object_detection` `:954–961` `object_detect(otmp,0)`
  then `exercise(WIS)`; empty → `strange_feeling` return 1;
  blessed potion/spbook `do_dknown` invent+floor.
  buried / minvent still named.
- D-1416: `zap.c` `backfire` `:2605–2614` in_use +
  `The(xname)` explode + `d(spe+2,6)` + `losehp`
  exploding wand `KILLED_BY_AN` + `useupall`; caller
  `dozap` `:2647–2652` cursed `!rn2(100)` then
  `exercise(STR,FALSE)` TIME. Dust spe<0 still named.
- D-1415: `mhitm_ad_phys` artifact_hit leftover `:4158–4180`
  after dmgval; hitmm skips default hits; `gv.vis` delayed
  hit iff `!artifact_hit`; DEADMONSTER `grow_up` then done.
  Callee D-0613. rustm / poison / worm-shrieker named.
- D-1414: `zap.c` `bhitm` WAN_MAKE_INVISIBLE `:348–368`
  snapshot `Monnam`; `mon_set_minvis(FALSE)`; transparent+learn
  iff `!oldinvis && knowninvisible` else vanish iff
  `couldsee && !canseemon`. Callee worn.c `:474–484`.
  zap_updown / zap_steed still named; speed is D-1422.
- D-1413: `potion.c` `peffect_enlightenment` `:794–808`
  cursed `potion_unkn`+uneasy+`exercise(WIS,FALSE)`; else
  blessed `adjattrib` INT then WIS then `do_enlightenment_effect`
  (D-1395). Caller `peffects` `:1349`. Artifact invoke / mix named.
- D-1412: `zap.c` `zapnodir` SPE_DETECT_UNSEEN `:2552–2558`
  shares SECRET_DOOR `findit` + `known=!!dknown`; SPBOOK
  skips `learnwand`. Caller spell.c `:1474` NODIR `weffects`.
  Remaining SPE_LIGHT cast named.
- D-1411: `potion.c` `peffect_full_healing` `:1144–1162`
  `healup(400,4+4*bcsign,!cursed,TRUE)`; blessed lost-level
  `ulevelmax--` then `pluslvl(FALSE)`; hallu; STR then CON;
  wounded legs blessed even riding. potionhit/breathe/mix named.
- D-1410: `zap.c` `zapyourself` WAN_SPEED_MONSTER `:2845–2849`
  `speed_up(rn1(25,50))` always learn. Callee D-1408. bhitm is D-1422.
- D-1409: `spell.c` `spell_backfire` `:1179–1217`; caller
  `spelleffects_check` `:1251–1260` `spellknow<=0` then `rnd(energy)`.
- D-1408: `spell.c` SPE_HASTE_SELF skilled bless then `peffects`;
  callee `peffect_speed`/`speed_up` `rn1(10,100+60*bcsign)`.
