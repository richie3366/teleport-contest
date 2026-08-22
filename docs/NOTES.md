# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1412; cadence **#1770** `cc7284d4`
  (Scr **11,405** RNG 100% speed `39+0.31/turn` R² 0.85). Next:
  Open `potion.c` `peffect_enlightenment` (named from
  D-1395). Not full healing. Reviews **356–364**
  ACCEPT-WITH-DEBT (no Must-fix). Do not skip D-1412…D-1229.
  No FORCE. Do not wrap `wildmiss`. Do not add trailing
  `confdir` to shared `getdir`.
- Do not revert D-1217–D-1412. Named still: `see_monsters`
  warn_obj / Sting / SPFX_WARN / ARMOR gloves; fruit_from_name
  + artifact_name in `the()`; minetn-1 / dog leftovers /
  `add_to_minv` merge.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1412.
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
  nhcore (D-1066). Do not skip D-1067…D-1412 (index).
- Named still: artifact_hit / rustm / poison / worm-shrieker;
  peffect_enlightenment; remaining peffects; remaining
  wand-duplicate SPE_LIGHT cast. SPE_DETECT_UNSEEN is D-1412;
  full healing D-1411; zapyourself WAN_SPEED D-1410;
  spell_backfire D-1409; haste D-1408. No fountain
  `lesshungry` (D-1359). No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1412: `zap.c` `zapnodir` SPE_DETECT_UNSEEN `:2552–2558`
  shares SECRET_DOOR `findit` + `known=!!dknown`; SPBOOK
  skips `learnwand`. Caller spell.c `:1474` NODIR `weffects`.
  Remaining SPE_LIGHT cast named.
- D-1411: `potion.c` `peffect_full_healing` `:1144–1162`
  `healup(400,4+4*bcsign,!cursed,TRUE)`; blessed lost-level
  `ulevelmax--` then `pluslvl(FALSE)`; hallu; STR then CON;
  wounded legs blessed even riding. potionhit/breathe/mix named.
- D-1410: `zap.c` `zapyourself` WAN_SPEED_MONSTER `:2845–2849`
  `speed_up(rn1(25,50))` always learn. Callee D-1408. WAN_SLOW named.
- D-1409: `spell.c` `spell_backfire` `:1179–1217`; caller
  `spelleffects_check` `:1251–1260` `spellknow<=0` then `rnd(energy)`.
- D-1408: `spell.c` SPE_HASTE_SELF skilled bless then `peffects`;
  callee `peffect_speed`/`speed_up` `rn1(10,100+60*bcsign)`.
- D-1407: `spell.c` SPE_MAGIC_MAPPING `seffects` (no skilled bless);
  callee `seffect_magic_mapping` nommap + `do_mapping`. SCR D-0075.
- D-1406: `mhitm_ad_wrap` mhitm `:3418–3426` — `mcan` zeros leftover;
  vis brush iff leftover 0. uhitm D-1348 / mhitu D-1331.
- D-1405: `mhitm_ad_fire` `:2588–2621` MC zeros leftover; vis `on_fire`;
  paper/straw burn; resist then `destroy_items`+ignite.
- D-1404: `zapnodir` WAN_STASIS silent `stasis_until` `moves+rn1(21,10)`;
  `known` stays FALSE. SPE_DETECT_UNSEEN is D-1412.
- D-1403: `mhitm_ad_phys` AT_KICK `thick_skinned` zeros leftover `d()`.
  artifact_hit / rustm / poison / worm-shrieker named.
- D-1402: `mhitm_ad_phys` mwep `dmgval` + GOP `rn1(4,3)` + min 1 after
  shade. Kick thick is D-1403.
- D-1401: SPE_CREATE_MONSTER `seffects` → `create_critters` D-1379.
  MAGIC_MAPPING is D-1407. peffects named.
- D-1400: SPE_CHAIN_LIGHTNING BFS `zhitm(BZ_U_SPELL(AD_ELEC-1),2)`.
  Swallow TODO. CURE_BLINDNESS is D-1399.
- D-1399: SPE_CURE_BLINDNESS `healup(0,0,FALSE,TRUE)` cream+blind+deaf.
  CURE_SICKNESS is D-1398.
- D-1398: SPE_CURE_SICKNESS `healup(0,0,TRUE,FALSE)` then ill/slime.
  JUMPING is D-1397.
