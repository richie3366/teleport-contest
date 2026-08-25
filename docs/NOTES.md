# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1445; cadence **#1810** `530eaa3c`
  (Scr **11,405** RNG 100% speed `36+0.30/turn` R² 0.857). Next:
  Open `zap.c` `zapyourself` SPE_DRAIN_LIFE (named). Not bhitm drain.
  Do not skip D-1445…D-1229. No FORCE. Do not wrap `wildmiss`.
  Do not add trailing `confdir` to shared `getdir`.
- Do not revert D-1217–D-1445. Named still: `see_monsters`
  warn_obj / Sting / SPFX_WARN / ARMOR gloves; fruit_from_name
  + artifact_name in `the()`; minetn-1 / dog leftovers /
  `add_to_minv` merge.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1445.
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
  nhcore (D-1066). Do not skip D-1067…D-1445 (index).
- Named still: poison leftover / worm-shrieker; remaining mix /
  potionhit / potionbreathe;
  remaining wand-duplicate MAGIC_MISSILE / FINGER / IMMEDIATE;
  zapyourself SPE_DRAIN;
  bhito drain_item; artifact invoke. No fountain
  `lesshungry` (D-1359). No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1445: `bhito` WAN_PROBING
  `res=!dknown` + observe; container/statue
  peek (`display_cinventory`) / tin / egg;
  learn iff res. Callee invent.c.
  drain_item / other updown otyps named.
- D-1444: `zap_updown` WAN_PROBING
  ceiling/beneath + `bhitpile` + `zap_map`
  probing + `display_binventory`. Always
  disclose. Callees D-1426 observe /
  D-1443 zap_steed prefix. Other updown
  otyps / force_decor named.
- D-1443: `zap_steed` WAN_PROBING
  `probe_monster(u.usteed)` + `learnwand` +
  weffects disclose; `notonhead` FALSE.
  Callee D-1426. Teleport / bhitm-routed
  zap_steed named.
- D-1442: `mhitm_ad_phys` rustm leftover
  `if (damage) rustm(mdef, mwep)` after artifact_hit;
  callee `mhitm.c` rustm AD_CORR / AD_RUST / AD_FIRE
  except steam vortex then `erode_obj` GREASE|VERBOSE.
  mhitu rustm / poison / worm-shrieker named.
- D-1441: SPE_DIG RAY wand-duplicate
  `wand_duplicate_weffects` → `weffects` zap_dig;
  self-dir zapyourself no-op. MAGIC_MISSILE /
  FINGER / IMMEDIATE named. Swallow pierce named
  on zap_dig.
- D-1440: SPE_SLEEP RAY wand-duplicate
  `wand_duplicate_weffects` → `weffects` ubuzz
  BZ_U_SPELL nd=ulevel/2+1; self-dir zapyourself
  already live.
- D-1439: `peffect_hallucination` resist return;
  else already-hallu nothing then still
  make_hallucinated rn1(200, 600-300*bcsign);
  blessed !rn2(3) else !cursed !rn2(6) MAGIC
  enlightenment. Mix/potionhit named.
- D-1438: `peffect_gain_ability` cursed Ulch+unkn;
  Fixed_abil nothing; else blessed adjattrib all /
  uncursed rn2 tries. Mix named.
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
  Blind; make_blinded rn1 timeout.
- D-1431: `peffect_gain_level` cursed unkn;
  Can_rise_up / pluslvl / blessed rndexp.


