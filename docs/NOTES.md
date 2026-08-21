# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1340; cadence **#1695** `2bd70a77`
  (Scr **11,405** RNG 100% speed `36+0.30/turn`). Reviews **296–299**
  ACCEPT-WITH-DEBT (no Must-fix). Next: Open `mhitm.c` hitmm
  `shade_miss` (named from D-0887). Not AT_HUGS. Do not skip
  D-1340…D-1229. Do not wrap `wildmiss` as `pline_mon`. No FORCE.
- Do not revert D-1217–D-1340. warn_obj / `artifact_light` `)`
  rewrite still named on the same W_WEP envelope.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1340.
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
  nhcore (D-1066) / dosit `"your steed"` (D-1067) / skip hider clear
  (D-1068) / Levitation-only `dosit` (D-1069) / sticky `u.Levitation`
  in `can_reach_floor` (D-1070).
- Do not skip D-1071…D-1340 (index). Named still: uhitm/mhitm
  wrap arms; `shade_miss`; `abuse_dog` /
  martial knockback; `kickstr`; eat/zap/dothrow `killer_xname`.
  No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1340: `mhitm.c` `mattackm` AT_HUGS `:476–490` — auto-hit iff
  prev two `res[]==M_ATTK_HIT`; `failed_grab` else `hitmm` no
  wep/dieroll 0. `hitmm` `:691–695` squeezes unless
  `magr==u.ustuck`. `shade_miss` / silver sear named.
- D-1339: `mhitm.c` `explmm` `:970–1010` — AT_EXPL `distmin>1`
  continue; `mcan` miss before `d()`; `cansee` `"explodes!"`
  else `noises`; FIRE/COLD/ELEC `mon_explodes` + AGR_DIED;
  else `mdamagem` then `mondead`; tame melancholy; leashed
  slack. Caller `mattackm` `:497–508`. mdamagem AD_HALU mhitm
  arm (eyeless skip, zero dice). `shade_miss` named.
- D-1338: `mhitm.c` `gazemm` `:736–803` — AT_GAZE vis pline,
  cancelled/blind-target/invis/sleep miss, Medusa `mon_reflects`
  then `monstone(magr)`, Archon extra `mhitm_ad_blnd` + `rn2(2)`
  stun then mdamagem leftover dice zero. Caller `mattackm`
  `:492–495` strike=0, no distmin skip. `shade_miss` /
  ston/conf/stun/fire leftover named.
- D-1337: `apply.c` `splash_lit` `:1518–1572` — brass lantern
  rust-trap/nymph-carry stays lit (crackle/flicker); dunk
  snuffs then `age -= age>200?100:age/2`; else `snuff_lit`.
  Callers `trap.c` water_damage `:4722` + rust-trap invent/
  minvent walks. JS stub was `lamplit=0`. gulpmu invent /
  gulpum / litroom / pickup `obj_is_burning` named.
- D-1336: `mon.c` `maybe_mnexto` `:3998–4017` — 20× `enexto` +
  `couldsee` + `NODIAG` then `rloc_to` (no montelecontrol).
  Caller `dokick.c` `kick_monster` `:267–285` else of block:
  relocate → unmap_invisible + teleports/floats/swoops/slides/
  jumps evade pline + `passive` return. Stay-put falls through
  to `kickdmg`. `abuse_dog` / martial knockback / `kickstr`
  named.
- D-1335: `objnam.c` `killer_xname` `:1942–2005` — dokick
  kickobjnam `:498` + petrify `:551–554` (not `xname`). Artifact
  `bare_artifactname`; CORPSE/SLIME_MOLD; restore known/uname.
  eat/zap/dothrow remaining; `kickstr` named.
- D-1334: `mthrowu.c` `return_from_mtoss` `:942` — notcaught
  `snuff_candle` then `ship_object` then `flooreffects("drop")`.
  Tethered AKLYS `m_throw` sets `return_flightpath` (before
  unwield). Lamps stay lit. `thrwmu` always_toss / polearm named.
- D-1333: `dothrow.c` throwit land `:1818` — after flooreffects
  (pick-snatch named) before `ship_object`; `snuff_candle` not
  `snuff_lit`. Miss-land never hits throwit_mon_hit's snuff.
- D-1332: `dokick.c` `kickdmg` `:56` / `:90` —
  `special_dmgval(&youmonst, mon, W_ARMF, NULL)` after shade
  `dmg=0`, before `!specialdmg` `pline_The` return; then
  `dmg += specialdmg`. Blessed boots vs undead/demon `rnd(4)`.
  Poly-loop call already D-1310. `abuse_dog` / martial
  knockback named. `maybe_mnexto` evade is D-1336.
- D-1331: `uhitm.c` `mhitm_ad_wrap` mhitu `:3376–3417` —
  `(!mcan || ustuck==magr) && !sticks`; `!ustuck && !rn2(10)`
  `u_slip_free` else `set_ustuck` + coil/swing; held pool drown /
  AT_HUGS crush; verbose brush zeros dice. uhitm/mhitm wrap arms
  named.
- D-1330: `uhitm.c` `mhitm_ad_drin` mhitm `:3272–3301` — headless
  `pline_mon` skipdrin, helm `misc_worn_check&W_ARMH&&rn2(8)`
  literal helmet, `eat_brains(gv.vis)`, lifsav skipdrin.
  `mattackm` AT_TENT FALLTHROUGH + hitmm tentacles suck.
- D-1329: `uhitm.c` `mhitm_ad_drin` mhitu `:3222–3271` — hitmsg,
  `defends(AD_DRIN,uwep)`/`!has_head` skipdrin, `u_slip_free`,
  `uarmh&&rn2(8)` hat/helm, Half then `mdamageu`+zero dice,
  `eat_brains` unless DUNCE_CAP, `adjattrib(A_INT,-rnd(2),FALSE)`,
  1/5 `losespells` / 1/5 `drain_weapon_skill`. Full `defends()`
  dragon-armor switch named.
- D-1328: `mhitu.c` `gazemu` `:1668–1898` + `mattacku` AT_GAZE
  `:832–837` skip Medusa (mndx) + `mon.c` `m_respond_medusa`.
  AD_STON reflect/stone, CONF/STUN/BLND/FIRE, cancelled looks-X,
  Hallu `rn2(4)`. `#ifdef PM_BEHOLDER` AD_SLEE/AD_SLOW compiled
  out (`#if 0` MON). gazemm is D-1338; arti_reflects W_WEP named.
- D-1327: `mhitu.c` `mattacku` AT_HUGS `:823–830` + `uhitm.c`
  `mhitm_ad_phys` `:4023–4037` + `u_slip_free` `:1045–1085`.
  Auto-hit if prev two succeeded or ustuck; `failed_grab` pline;
  `rn2(2)` grab / crush / rope-golem choke. mhitu AD_WRAP D-1331.
- D-1326: `mhitu.c` `explmu` `:1591–1664` + `mattacku` AT_EXPL
  `:839–842`. `mcan` miss before `d()`; thin-air/`empty water`;
  COLD/FIRE/ELEC `mon_explodes`; BLND visible skip-`rnd`; HALU
  kaleidoscope then `mondead`. `defended` named.
