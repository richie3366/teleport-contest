# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1249 `dokick.c` `container_impact_dmg`
  at dropz `with_impact` + throwit `!IS_SOFT` (throw origin
  `u.ux,u.uy`; kick Is_box already D-0989). Cadence
  **#1585** (`7f54b762`) reviews **208–211** ACCEPT-WITH-DEBT.
  Next: Open `uhitm.c` AT_HUGS (named from D-1233). Not remaining
  `pline_mon`. Must-fix empty.
  Do not skip D-1249…D-1229. Do not pull giant pickup/maneuver /
  glob / doname CXN_ARTICLE|CXN_NOCORPSE / hitfloor `dropz(TRUE)` /
  mimic unhide / AT_EXPL/ENGL /
  altwep / `demonpet` / landmine·pit mid-roll /
  unported uhitm `mhitm_ad_*` `pline_mon` /
  mhitu `hitmsg` / gulpmu invent / litroom / pickup snuff /
  digest-Medusa stone / `newcham` NC_SHOW_MSG pline /
  `grow_up` little_to_big / `gelcube_digests` / ALLOW_BARS
  rust/corr/metallivore / `watch_dig` SetVoice+verbalize.
  Do not wrap `msg_mon_movement` as
  `pline_mon`. Do not restore Hallu `gbuf_show_kind`. No FORCE.
- Do not revert D-1217–D-1249. Do not Must-fix named omits
  (glob/doname CXN / other Soundeffect / unported `pline_mon` /
  giant pickup / mimic unhide / hitfloor `dropz(TRUE)`).

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / hero
  `domagicportal` / `undestroyable_trap` / `mktrap` dst /
  `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip
  D-1190…D-1249 (CURRENT keep; `container_impact_dmg` D-1249).
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483).
- Don't skip painting spaces or emit mid-row space runs >4 (D-0931).
- Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
- Do not blanket-restore overlay `_pending_message` (D-0929).
- Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not push shared `maketrap` PIT morph (D-0972).
- Do not memcpy gi worn/ball pointers (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053).
- Do not restore tut-1 hardcoded keys (D-1065) / skip `tutorial()`
  nhcore (D-1066) / dosit `"your steed"` (D-1067) / skip hider clear
  (D-1068) / Levitation-only `dosit` (D-1069) / sticky `u.Levitation`
  in `can_reach_floor` (D-1070).
- Do not skip D-1071…D-1248. Keep se_scratching; `troll_baned`
  wraps; `#teleport` doextcmd; gulpmm `m_at` swap; unique/pname
  `corpse_xname` adjective / rot CXN_NO_PFX; `spot_monsters` →
  `a11y.mon_notices`; `mon_movement` → `a11y.mon_movement`;
  rolling-boulder TELEP `pline_xy` D-1237; `mind_blast` D-1238;
  cannot_push squeeze D-1239; remaining already-ported uhitm
  `pline_mon` D-1240; passivemm assess_dmg `monkilled(magr)`
  D-1241; gulpmm `snuff_lit` minvent D-1242; gulpmm `!goodpos`
  return-home D-1243; gulpmm AD_DGST eat D-1244; hideunder after
  tread D-1245; `bee_eat_jelly` D-1246; postmov IRONBARS D-1247;
  `mon_yells` D-1248; `container_impact_dmg` dropz/throwit D-1249.
  Glob / doname
  CXN_ARTICLE|CXN_NOCORPSE / mimic unhide /
  AT_HUGS / `demonpet` / landmine·pit mid-roll /
  giant pickup / unported `mhitm_ad_*`
  `pline_mon` / mhitu `hitmsg` still named. Do not “fix” seed0383
  with ALIGN/FORCE.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / vision.c `notice_all_mons` /
  `makemap_prepost` / `wiz_makemap` / `restore_artifacts`.
  Default `spot_monsters`/`glyph_updates`/`mon_movement` Off.
  Unported uhitm/worn/trap `pline_mon` / mhitu `hitmsg` / other
  Soundeffect / landmine·pit mid-roll named. Do not treat `dothrow`
  `game.thrownobj` as wired (review **172**). Do not Must-fix
  `DIR_UP`/`DIR_DOWN` const swap (review **178**).

## Landmarks (≤15)

- D-1249: `dokick.c` `container_impact_dmg` export + dropz
  `with_impact` + throwit `!IS_SOFT` at `u.ux,u.uy`. Kick Is_box
  already D-0989. hitfloor `dropz(TRUE)` still named.
- D-1248: `monmove.c` `mon_yells` body + `watch_on_duty` /
  dokick watchman: Deaf spotted `pline_mon` angrily waves/shakes;
  else `Amonnam` yells / You_hear someone yell then `verbalize1`.
  SetVoice empty (`!SND_LIB_INTEGRATED`). `gelcube_digests` /
  ALLOW_BARS rust / `watch_dig` still named.
- D-1247: `monmove.c` postmov IRONBARS else-if: rust/corr/
  metallivore `pline_mon` eat + `dissolve_bars` + return
  MMOVE_DONE (skips `mdig_tunnel` rnd(12)); else verbose
  `Norep` through/between; W_NONDIGGABLE skips eat.
  ALLOW_BARS rust/corr/metallivore / `gelcube_digests` /
  switch_terrain still named.
- D-1246: `monmove.c` `bee_eat_jelly` + `find_pmmonst`; grow_up
  killer-bee `!victim` → queen; freeze `m_delay`. IRONBARS
  D-1247; `gelcube_digests` / little_to_big still named.
- D-1245: `hack.c` `domove` hideunder after tread (`hides_under` ||
  S_EEL || dx || dy → `hideunder(&youmonst)`); mimic unhide /
  container_impact / hitfloor `dropz(TRUE)` named.
- D-1244: `mhitm.c` gulpmm AD_DGST eat (`mhitm_ad_dgst` +
  `mondead` + cham/slime/wraith/nurse/`mon_givit`); gulpmu
  invent / Medusa stone / NC_SHOW_MSG pline / little_to_big named.
- D-1243: `mhitm.c` gulpmm `!goodpos` return-home + `teleport.js`
  m_at skip dead/OFFMAP.
- D-1242: `mhitm.c` gulpmm `snuff_lit` minvent + `apply.c`
  `snuff_lit`/`snuff_candle`; flaming skip; gulpmu invent /
  litroom / pickup still named.
- D-1241: `mhitm.c` `passivemm` assess_dmg `monkilled(magr)` (no
  zombify; AD_ACID goto).
- D-1240: remaining already-ported `uhitm.c` `pline_mon`
  (gremlin light / xan nuzzle / sedu brag); unported `mhitm_ad_*` /
  mhitu `hitmsg` still named.
- D-1239: `hack.c` cannot_push squeeze + `sokoban_guilt`;
  giant pickup / nopick m-dir still named.
- D-1238: `monmove.c` `mind_blast` body + `set_apparxy`/`distfleeck`;
  bee_eat D-1246; IRONBARS D-1247; `mon_yells` D-1248.
- D-1237: rolling-boulder TELEP `pline_xy` + `rloco`/migrate;
  landmine/pit still named.
- D-1236: `mon_movement` addr `&a11y.mon_movement`; default Off.
- Review **208–211** ACCEPT-WITH-DEBT. Cadence **#1585** **44**/44
  including seed0383. Next audit @**#1590**.
