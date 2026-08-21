# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1395; cadence **#1760** `05f8c1a1`
  (Scr **11,405** RNG 100% speed `37+0.30/turn` R² 0.85). Next:
  Open `mhitm.c` `mdamagem` AD_STUN leftover (named from D-1352).
  Not CONF. Reviews **347–355** ACCEPT-WITH-DEBT (no Must-fix);
  **346** QUALITY-RISK shipped D-1387. Do not skip D-1395…D-1229.
  No FORCE. Do not wrap `wildmiss`. Do not add trailing
  `confdir` to shared `getdir`.
- Do not revert D-1217–D-1395. `see_monsters` warn_obj_cnt /
  `Sting_effects` / SPFX_WARN / ARMOR gloves `:1412` still named.
  fruit_from_name + artifact_name in `the()` still named.
  minetn-1 loader / dog leftovers / `add_to_minv` merge named.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1395.
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
  nhcore (D-1066). Do not skip D-1067…D-1395 (index).
- Do not skip D-1071…D-1395 (index). Named still: hitmm artifact
  wep; `mhitm_ad_phys` shade_miss is D-1394 (kick thick / mwep
  dmgval / worm-shrieker named; hmon is D-1384; zap bhit shade
  is D-1383; M_AP_OBJECT skip is D-1392; WEB stick is D-1393;
  mthrowu is D-1382); zapnodir enlighten is D-1395 (stasis
  named; potion peffect_enlightenment named);
  mdamagem STUN/FIRE leftover; mhitm wrap brush.
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

- D-1395: `zap.c` `zapnodir` WAN_ENLIGHTENMENT `:2586–2590` —
  `known=!!dknown` then `do_enlightenment_effect` `:2525–2532`
  You_feel / WIN_MESSAGE flush / MAGIC `enlightenment` /
  pline_The / `exercise(A_WIS)`. Callee live `invent.js`
  D-1116. Potion peffect / artifact invoke / WAN_STASIS named.
  Wish is D-1380.
- D-1394: `uhitm.c` `mhitm_ad_phys` mhitm `:4128–4137` —
  `MON_WEP` then null unless AT_WEAP/AT_CLAW, `shade_miss`
  vis=`canseemon` both zeros leftover `d()`. Caller
  `mdamagem` AD_PHYS; explmm skips hitmm so this is the
  shade gate. Callee D-1341. Kick thick / mwep dmgval /
  worm-shrieker named. hmon is D-1384.
- D-1393: `zap.c` `bhit` `:3926–3938` — empty WEB +
  thrown/kicked `!rn2(3)` Yname2 stuck pline + tseen/newsym
  + clear returning then break. Callee D-1383 shade after.
  throwit fly / skiprange / shkcatch named.
- D-1392: `zap.c` `bhit` `:3986–3992` — thrown/kicked
  `M_AP_OBJECT` && !glyph_is_monster/warning/invisible (or
  FLASHED_LIGHT M_AP_OBJECT) clears mtmp keep flying. JS
  gbuf `disp_kind`+I+warnsym analogue. WEB is D-1393.
- D-1391: `spell.c` `spelleffects` `:1572–1580` SPE_CLAIRVOYANCE
  `!BClairvoyant` skilled bless + `do_vicinity_map(pseudo)`;
  else cornuthaum `body_part(HEAD)` hat. Callee `detect.c`
  `:1448–1585` 9×5 `show_map_spot` + observe/map_monst;
  unskilled hero_memory silent; allmain seer_turn named.
  JUMPING / CURE still named.
- D-1390: `spell.c` `cast_protection` `:1104–1177` SPE_PROTECTION
  log2(ulevel)+1 gain vs uspellprot/(4-min(3,natac)); expert
  `uspmtime` 20 else 10; `find_ac`; callee `timeout.c`
  `:652–661` usptime tick. Dynamic `u_init` find_ac.
  CLAIRVOYANCE is D-1391.
- D-1389: `spell.c` `spelleffects` `:1569–1571` SPE_CREATE_FAMILIAR
  `make_familiar(NULL, u.ux, u.uy, FALSE)`. Callee `dog.c`
  `pick_familiar_pm` `!rn2(3)` `pet_type` else `rndmonst_adj`
  (D-1029). Dynamic import (dog→weapon→spell). PROTECTION
  is D-1390.
- D-1388: `spell.c` `spelleffects` `:1458–1514` SPE_FORCE_BOLT
  `physical_damage` then getdir + `zapyourself`/`weffects`
  IMMEDIATE `bhit(rn1(8,6))`. Callee `zap.c` `bhitm` `:208–209`
  `spell_damage_bonus`. Not RAY `ubuzz`. CREATE_FAMILIAR is
  D-1389.
- D-1387: `cmd.c` `getdir` `:4095–4111` + `spell.c` `:1488–1510` —
  unskilled FIREBALL/CONE cancel leaves leftover `u.dx/dy/dz`;
  JS live `lock.js` `getdir` (no trailing `confdir`). `.` still
  SELF-zero. D-1386 FALLTHROUGH weffects. FORCE_BOLT is D-1388.
- D-1386: `spell.c` `spelleffects` `:1454–1514` — unskilled
  SPE_FIREBALL/CONE FALLTHROUGH FORCE_BOLT `physical_damage` then
  getdir + `zapyourself` / `weffects`; callee `zap.c` `:3461–3462`
  RAY `ubuzz(BZ_U_SPELL(BZ_OFS_SPE(otyp)), ulevel/2+1)`. Skilled
  scatter is D-1378. Cancel leftover dirs is D-1387. FORCE_BOLT
  is D-1388. zhitm bonus named.
- D-1385: `uhitm.c` `mhitm_ad_conf` mhitm `:3713–3724` via
  `mhitm.c` `mdamagem` `:1059` — `!mcan && !mconf && !mspec_used`
  vis `"looks confused."` + `mconf=1` + clear WAITFORU; leftover
  `d()` kept (not HALU/BLND zero). uhitm/mhitu named. STUN/FIRE
  leftover named. STON is D-1352.
- D-1384: `uhitm.c` `hmon_hitmon` `:1812–1822` — melee/applied
  `shade_miss(&youmonst,mon,obj,FALSE,TRUE)` + barehands shade
  dmg 0. Thrown/kicked skip (D-1383). Callee D-1341; dmgval
  shade D-1354. `mhitm_ad_phys` is D-1394.
- D-1383: `zap.c` `bhit` `:3972–3992` — thrown/kicked
  `shade_miss(&youmonst,mtmp,obj,TRUE,TRUE)` clears mtmp and
  keeps flying. ZAPPED_WAND still fhitm. Callee D-1341;
  mthrowu is D-1382. M_AP_OBJECT skip is D-1392. WEB is D-1393.
  throwit fly named.
- D-1382: `mthrowu.c` `m_throw` `:680–686` —
  `mtmp && shade_miss(..., TRUE, TRUE)` skip `ohitmon` keep
  flying. Callee D-1341; dmgval shade D-1354. Zap is D-1383;
  hmon is D-1384; `mhitm_ad_phys` is D-1394.
- D-1381: `uhitm.c` `do_attack` `:555–563` —
  `S_LEPRECHAUN` `!rn2(7)` `m_move(0)` then stumble/
  `return FALSE`. Wipe is D-1373. check_capacity /
  twoweapon named.
