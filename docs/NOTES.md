# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1344; cadence **#1700** `e3a30202`
  (Scr **11,405** RNG 100% speed `36+0.29/turn`). Reviews **300–303**
  ACCEPT-WITH-DEBT (no Must-fix). Next: Open `zap.c` zapyourself
  `killer_xname` (remaining). Not eat choke. Do not skip
  D-1344…D-1229. Do not wrap `wildmiss` as `pline_mon`. No FORCE.
- Do not revert D-1217–D-1344. warn_obj / `artifact_light` `)`
  rewrite still named. zap/pray ureflects W_AMUL/W_ARM/dragon and
  mcastu ureflects still named.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1344.
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
- Do not skip D-1071…D-1344 (index). Named still: hitmm silver
  sear; `dmgval` shade/`shade_glare`; mthrowu/zap/hmon
  `shade_miss` callers; uhitm/mhitm wrap arms; `abuse_dog` /
  martial knockback; zap/dothrow `killer_xname`.
  No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1344: `eat.c` `choke` `:268–284` — non-coin `killer_xname` +
  `KILLED_BY`; coins `"very rich meal"`; null `"quick snack"`.
  eataccessory AoS live; lesshungry/bite + zap/dothrow named.
- D-1343: `dokick.c` `kickstr` `:794–830` + `kick_ouch` `:903`
  `"kicking "` + kickobjnam or terrain noun. `game.maploc` null =
  nowhere. Drawbridge remap named.
- D-1342: `artifact.c` `arti_reflects` `:537–550` + SPFX_REFLECT
  W_WEP `:867–872`. `mon_reflects` MON_WEP; hero `EReflecting&W_WEP`.
  cspfx / zap·pray W_AMUL·ARM / mcastu ureflects named.
- D-1341: `uhitm.c` `shade_miss` `:2016–2051` + `mhitm.c` `hitmm`
  `:659–661` `!compat` → `M_ATTK_MISS`. `dmgval` shade / silver
  sear / mthrowu·zap·hmon callers named.
- D-1340: `mhitm.c` `mattackm` AT_HUGS `:476–490` auto-hit iff prev
  two `res[]==M_ATTK_HIT`; `hitmm` `:691–695` squeezes unless
  `magr==u.ustuck`.
- D-1339: `mhitm.c` `explmm` `:970–1010` — distmin>1 skip; mcan
  miss; FIRE/COLD/ELEC `mon_explodes`; else mdamagem then mondead.
- D-1338: `mhitm.c` `gazemm` `:736–803` — vis gaze; Medusa
  `mon_reflects`/`monstone(magr)`; Archon `mhitm_ad_blnd`+`rn2(2)`.
- D-1337: `apply.c` `splash_lit` `:1518–1572` — rust-trap lantern
  stays lit; dunk snuffs+age drain; else `snuff_lit`.
- D-1336: `mon.c` `maybe_mnexto` `:3998–4017` + dokick evade
  `:267–285`. `abuse_dog` / martial knockback named.
- D-1335: `objnam.c` `killer_xname` `:1942–2005` — dokick `:498` +
  petrify `:551–554`. eat choke D-1344; zap/dothrow remaining.
- D-1334: `mthrowu.c` `return_from_mtoss` `:942` snuff then ship
  then flooreffects. Tethered AKLYS `return_flightpath`.
- D-1333: `dothrow.c` throwit land `:1818` flooreffects then
  `snuff_candle` (not `snuff_lit`).
- D-1332: `dokick.c` `kickdmg` `:56`/`:90` `special_dmgval(W_ARMF)`
  after shade. `abuse_dog` / martial knockback named.
- D-1331: `uhitm.c` `mhitm_ad_wrap` mhitu `:3376–3417` slip/`!rn2(10)`
  coil; pool drown / AT_HUGS crush. uhitm/mhitm wrap arms named.
- D-1330: `uhitm.c` `mhitm_ad_drin` mhitm `:3272–3301` + `mattackm`
  AT_TENT. Helmet `rn2(8)`; `eat_brains(gv.vis)`.
