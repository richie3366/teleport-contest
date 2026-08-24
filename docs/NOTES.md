# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1425; cadence **#1790** `9f2a3a08`
  (Scr **11,405** RNG 100% speed `38+0.30/turn` R² 0.83). Next:
  Open `zap.c` `bhitm` WAN_PROBING (named from D-1369). Not locking.
  Do not skip D-1425…D-1229. No FORCE. Do not wrap `wildmiss`.
  Do not add trailing `confdir` to shared `getdir`.
- Do not revert D-1217–D-1425. Named still: `see_monsters`
  warn_obj / Sting / SPFX_WARN / ARMOR gloves; fruit_from_name
  + artifact_name in `the()`; minetn-1 / dog leftovers /
  `add_to_minv` merge.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1425.
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
  nhcore (D-1066). Do not skip D-1067…D-1425 (index).
- Named still: rustm / poison / worm-shrieker; remaining peffects
  (polymorph/gain energy/acid/gain level/blindness/sleeping); remaining
  SPE_LIGHT wand-duplicate; artifact invoke. No fountain
  `lesshungry` (D-1359). No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

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
- D-1416: `backfire` explode + `d(spe+2,6)` + `useupall`.
- D-1415: mhitm artifact_hit leftover after dmgval.
- D-1414: `bhitm` WAN_MAKE_INVISIBLE minvis; conferral is D-1423.
- D-1412: zapnodir SPE_DETECT_UNSEEN shares `findit`.
- D-1410: zapyourself WAN_SPEED `speed_up(rn1(25,50))`.
- D-1409: `spell_backfire` `rn2(10)` then `rnd(energy)`.
- D-1408: SPE_HASTE_SELF `speed_up` `rn1(10,100+60*bcsign)`.
