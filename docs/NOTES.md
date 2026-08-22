# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1404; cadence **#1770** `cc7284d4`
  (Scr **11,405** RNG 100% speed `39+0.31/turn` R² 0.85). Next:
  Open `uhitm.c` `mhitm_ad_fire` leftover (named from D-1385).
  Not STUN. Reviews **356–364** ACCEPT-WITH-DEBT (no
  Must-fix). Do not skip
  D-1404…D-1229. No FORCE. Do not wrap `wildmiss`. Do not add
  trailing `confdir` to shared `getdir`.
- Do not revert D-1217–D-1404. Named still: `see_monsters`
  warn_obj / Sting / SPFX_WARN / ARMOR gloves; fruit_from_name
  + artifact_name in `the()`; minetn-1 / dog leftovers /
  `add_to_minv` merge.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1404.
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
  nhcore (D-1066). Do not skip D-1067…D-1404 (index).
- Named still: hitmm artifact wep; artifact_hit / rustm /
  poison / worm-shrieker; zapnodir SPE_DETECT_UNSEEN;
  potion peffect_enlightenment; mdamagem FIRE leftover;
  mhitm wrap brush; engrave NODIR `zapnodir` still named.
  Stasis is D-1404. kick thick is
  D-1403. mwep dmgval is D-1402. CREATE_MONSTER is D-1401.
  CURE_SICKNESS is D-1398. CURE_BLINDNESS is D-1399. CHAIN is
  D-1400 (peffects named). JUMPING is D-1397. No fountain
  `lesshungry` (D-1359). No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1404: `zap.c` `zapnodir` WAN_STASIS `:2559–2568` —
  silent `stasis_until` max `moves+rn1(21,10)`; `known`
  stays FALSE. Consumers `noteleport_level` / whistle /
  displacer revive already live. SPE_DETECT_UNSEEN /
  potion peffect / artifact invoke named. Enlighten is
  D-1395.
- D-1403: `uhitm.c` `mhitm_ad_phys` mhitm `:4138–4141` after
  D-1394 shade — AT_KICK `thick_skinned(pd)` zeros leftover
  `d()` (mwep already nulled). Youmonst already in
  `damageum_ad_phys`. artifact_hit / rustm / poison /
  worm-shrieker named. mwep dmgval is D-1402.
- D-1402: `uhitm.c` `mhitm_ad_phys` mhitm `:4142–4157` after
  D-1394 shade — AT_WEAP/AT_CLAW `mwep` corpse `do_stone_mon`
  then `dmgval` + GOP `rn1(4,3)` + min 1. Kick thick is
  D-1403. artifact_hit / rustm / poison / worm-shrieker
  named. CREATE_MONSTER is D-1401.
- D-1401: `spell.c` `:1528–1531` SPE_CREATE_MONSTER
  `(void) seffects(pseudo)` (no skilled bless). Callee
  `read.c` `seffect_create_monster` `:1608–1624` count
  `1+(conf||cursed?12:0)+(blessed||rn2(73)?0:rnd(4))`,
  confused acid blob, `create_critters` D-1379. MAGIC_MAPPING
  seffects / peffects named. CHAIN is D-1400.
- D-1400: `spell.c` `:1588–1590` SPE_CHAIN_LIGHTNING
  `cast_chain_lightning()`; body `:1002–1100` BFS queue, peaceful
  skip, `zhitm(BZ_U_SPELL(AD_ELEC-1),2)`, swallow TODO. Callee
  `zap.c` `zhitm`. peffects named. CURE_BLINDNESS is
  D-1399. CREATE_MONSTER is D-1401.
- D-1399: `spell.c` `:1549–1551` SPE_CURE_BLINDNESS
  `healup(0,0,FALSE,TRUE)`. Callee `potion.c` `healup`
  `:1444–1450` cream=0, `make_blinded(0,TRUE)`, `make_deaf(0,TRUE)`.
  CHAIN is D-1400. CURE_SICKNESS is D-1398.
- D-1398: `spell.c` `:1552–1567` SPE_CURE_SICKNESS capture
  Sick/Slimed, `healup(0,0,TRUE,FALSE)` then ill/slime plines.
  Callee `potion.c` `healup` `:1452–1455` `make_vomiting` +
  `make_sick(SICK_ALL)`. CURE_BLINDNESS is D-1399. JUMPING
  is D-1397.
- D-1397: `spell.c` `:1584–1587` SPE_JUMPING `jump(max(role_skill,1))`;
  !TIME → nothing_happens. Callee `apply.c` `jump` magic bounce /
  swish / writhe + tame pull-free / Lev+air/waterlevel flail.
  Dynamic `apply.js`. #jump known_spell / trap-escape / hurtle_jump
  named. CURE_SICKNESS is D-1398. CLAIRVOYANCE is D-1391.
- D-1396: `uhitm.c` `mhitm_ad_stun` `:4410–4420` via `mdamagem`
  `:1059` — `mcan` keeps leftover `d()`; else stagger + `mstun=1`
  then phys (shade may zero). uhitm/mhitu / FIRE leftover named.
- D-1395: `zap.c` `zapnodir` WAN_ENLIGHTENMENT `:2586–2590` —
  `known=!!dknown` then `do_enlightenment_effect`. Stasis is
  D-1404. potion peffect / artifact invoke named. Wish is D-1380.
- D-1394: `uhitm.c` `mhitm_ad_phys` `:4128–4137` — null mwep unless
  AT_WEAP/AT_CLAW then `shade_miss` zeros leftover `d()`. Kick
  thick named; mwep dmgval is D-1402. hmon is D-1384.
- D-1393: `zap.c` `bhit` `:3926–3938` empty WEB + thrown/kicked
  `!rn2(3)` stick. throwit fly / skiprange / shkcatch named.
- D-1392: `zap.c` `bhit` `:3986–3992` thrown/kicked `M_AP_OBJECT`
  skip keep flying. WEB is D-1393.
- D-1391: `spell.c` `:1572–1580` SPE_CLAIRVOYANCE `do_vicinity_map`;
  blocked cornuthaum hat. JUMPING is D-1397; CURE_SICKNESS is D-1398.
- D-1390: `spell.c` `cast_protection` `:1104–1177` log2(ulevel)
  gain; `uspmtime` 20 expert else 10; timeout usptime tick.
