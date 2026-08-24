# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1431; cadence **#1800** `66254727`
  (Scr **11,405** RNG 100% speed `37+0.30/turn` R² 0.85). Next:
  Open `potion.c` `peffect_blindness` (named). Not sleeping.
  Do not skip D-1431…D-1229. No FORCE. Do not wrap `wildmiss`.
  Do not add trailing `confdir` to shared `getdir`.
- Do not revert D-1217–D-1431. Named still: `see_monsters`
  warn_obj / Sting / SPFX_WARN / ARMOR gloves; fruit_from_name
  + artifact_name in `the()`; minetn-1 / dog leftovers /
  `add_to_minv` merge.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1431.
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
  nhcore (D-1066). Do not skip D-1067…D-1431 (index).
- Named still: rustm / poison / worm-shrieker; remaining peffects
  (blindness/sleeping/gain ability);
  remaining wand-duplicate SLEEP/DIG; artifact invoke. No fountain
  `lesshungry` (D-1359). No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1431: `peffect_gain_level` cursed potion_unkn++ then
  ledger 1+amulet → earth_level else Can_rise_up →
  get_level(depth-1); same-level It tasted bad; else
  You rise through ceiling + goto_level else uneasy;
  pluslvl(FALSE); blessed uexp=rndexp(TRUE). Callee
  dungeon.c Can_rise_up. Blindness still named.
  potionhit/mix named.
- D-1430: `peffect_acid` Acid_resistance tastes tangy/sour else
  burns a little/a lot/like acid; d(cursed?2:1, blessed?4:8)
  losehp Maybe_Half_Phys KILLED_BY_AN; exercise CON FALSE;
  Stoned eat.c fix_petrification; potion_unkn++. Gain level
  is D-1431. potionhit/mix named.
- D-1429: `peffect_gain_energy` cursed lackluster else Magical
  energies; d(blessed?3:!cursed?2:1,6) ±uenmax + 3*num uen
  clamp 0/max; uenpeak; botl; exercise WIS TRUE. Acid is
  D-1430. potionhit/mix named.
- D-1428: `peffect_polymorph` You_feel little strange/normal;
  `!Unchanging` POLY_NOFLAGS unless blessed original form
  POLY_CONTROLLED|POLY_LOW_CTRL then mtimedone min rn2(15)+10.
  Callee POLY_LOW_CTRL forcecontrol downgrade. potionhit
  named. Gain energy is D-1429.
- D-1427: SPE_LIGHT NODIR wand-duplicate `weffects` →
  zapnodir litroom+lightdamage. SPBOOK skips `learnwand`.
  SLEEP / DIG / IMMEDIATE still named.
- D-1426: `bhitm` WAN_PROBING `:376–381` wake FALSE,
  reveal_invis, `probe_monster`, always learn. Callee
  `probe_objchain` observe + container lknown/cknown (not
  SchroedingersBox cknown) + tin known; `display_minventory`
  MINV_ALL|MINV_NOLET|PICK_NONE. notonhead skips minvent.
  zapyourself / zap_steed / zap_updown / bhito named.
- D-1425: `bhitm` WAN_LOCKING/SPE_WIZARD_LOCK `:370–375`
  `box_or_door` + `closeholdingtrap` (wake = trap-hit).
  Callee `trap.c` `:6210–6247`. that_is_a_mimic pline named.
  zapyourself WAN_LOCKING / probing named.
- D-1424: `bhitm` WAN_SLOW/SPE_SLOW `:218–232`
  `!resist` NOTELL then `seemimic` +
  `mon_adjust_speed(-1)` + `check_gear_next_turn` +
  whirly expels. No `helpful_gesture` (can anger).
  zapyourself WAN_SLOW / locking / probing named.
- D-1423: `knowninvisible` ORs `uprops[SEE_INVIS]` /
  `DETECT_MONSTERS` (`youprop.h` H||E). Conferral SI
  transparent+learn, not vanish. No `canseemon` /
  `confer_oc_oprop` rewrite. WAN_SLOW is D-1424.
- D-1422: `bhitm` WAN_SPEED `:233–242` `!resist` NOTELL then
  `seemimic` + `mon_adjust_speed(+1)` + `check_gear_next_turn`;
  `helpful_gesture` always. WAN_SLOW is D-1424; zap_steed named.
- D-1421: SPE_INVISIBILITY FALLTHROUGH `peffects` (no skilled
  bless); wrapping itchy; timeout/FROMOUTSIDE; cursed aggravate.
- D-1420: SPE_RESTORE_ABILITY skilled bless then `peffects`;
  ABASE=AMAX; potion `pluslvl`. Invisibility is D-1421.
- D-1419: SPE_LEVITATION `float_up` + timeout/`I_SPECIAL`;
  cursed ceiling. Restore is D-1420.
- D-1418: SPE_DETECT_MONSTERS blessed TIMEOUT else
  `monster_detect`. Treasure is D-1417.

