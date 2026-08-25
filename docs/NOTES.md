# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1437; cadence **#1800** `66254727`
  (Scr **11,405** RNG 100% speed `37+0.30/turn` R² 0.85). Next:
  Open `potion.c` `peffect_gain_ability` (named).
  Not hallucination.
  Do not skip D-1437…D-1229. No FORCE. Do not wrap `wildmiss`.
  Do not add trailing `confdir` to shared `getdir`.
- Do not revert D-1217–D-1437. Named still: `see_monsters`
  warn_obj / Sting / SPFX_WARN / ARMOR gloves; fruit_from_name
  + artifact_name in `the()`; minetn-1 / dog leftovers /
  `add_to_minv` merge.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1437.
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
  nhcore (D-1066). Do not skip D-1067…D-1437 (index).
- Named still: rustm / poison / worm-shrieker; remaining peffects
  (gain ability/hallucination);
  remaining wand-duplicate SLEEP/DIG; zapyourself SPE_DRAIN;
  zap_steed/zap_updown/bhito WAN_PROBING; artifact invoke. No fountain
  `lesshungry` (D-1359). No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1437: `peffect_sleeping` resist yawn +
  monstseesu else fall_asleep -rn1(10,
  25-12*bcsign) TRUE. potionhit/breathe named.
- D-1436: `bhitm` SPE_DRAIN_LIFE seemimic +
  monhp_per_lvl/dbldam/bonus; resists_drli shield
  else !resist then mhpmax+m_lev-- / killed.
  spell.c weffects. zapyourself drain named.
- D-1435: `zapyourself` WAN_PROBING invent
  probe_objchain + update_inventory + learn +
  ustatusline (not probe_monster). Array D-1017.
- D-1434: `zapyourself` WAN_LOCKING utrap ||
  !closeholdingtrap then boxlock_invent.
- D-1433: `zapyourself` WAN_SLOW HFast
  TIMEOUT|INTRINSIC → u_slow_down.
- D-1432: `peffect_blindness` potion_nothing if
  Blind; make_blinded rn1 timeout. Gain ability named.
- D-1431: `peffect_gain_level` cursed unkn;
  Can_rise_up / pluslvl / blessed rndexp.
- D-1430: `peffect_acid` resist taste vs losehp
  dice; Stoned fix_petrification.
- D-1429: `peffect_gain_energy` d(n,6) uenmax
  ±uen 3*num; exercise WIS.
- D-1428: `peffect_polymorph` !Unchanging
  POLY_NOFLAGS; blessed LOW_CTRL.
- D-1427: SPE_LIGHT NODIR weffects → zapnodir
  litroom+lightdamage. SLEEP/DIG named.
- D-1426: `bhitm` WAN_PROBING wake FALSE
  probe_monster always learn.
- D-1425: `bhitm` WAN_LOCKING wake =
  closeholdingtrap.
- D-1424: `bhitm` WAN_SLOW !resist then
  mon_adjust_speed(-1) + whirly expels.
- D-1423: `knowninvisible` See_invisible
  H||E uprops. No confer_oc_oprop rewrite.

