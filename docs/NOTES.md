# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1270 `hack.c` hero `test_move`
  IRONBARS `passes_bars` (reviews **225–228** cadence **#1605**
  `42d50a53`). Next: Open `monmove.c` `meatmetal` (named from
  D-1247). Not switch_terrain. Do not skip D-1270…D-1229.
  Do not pull skipdrin / pit kick / missmu / mattacku AT_TENT /
  explmu / AT_HUGS / unported `mhitm_ad_*` `pline_mon` / doname EGG /
  `display_self` U_AP_TYPE glyphs / swap-with-pet `seemimic` / Blind
  unseen boulder feel / invent hold_another_object hitfloor / pickup
  highdrop / toss_up / dothrow hurtle / `u_on_rndspot` / objnam wish /
  `maketrap` PIT/HOLE `set_levltyp` / Underwater bars / rock
  Passes_walls. Do not wrap `msg_mon_movement` as `pline_mon`.
  No FORCE.
- Do not revert D-1217–D-1270. Named omits stay map, not Must-fix.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1270.
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
- Do not skip D-1071…D-1270 (index). Named still: skipdrin /
  pit kick; missmu/explmu; doname EGG; launch_obj
  down_gate / boulder-chain; `meatobj` / meatbox; dothrow hurtle /
  `u_on_rndspot` / objnam wish; `maketrap` PIT/HOLE `set_levltyp`;
  Underwater bars / rock Passes_walls; `display_self` U_AP_TYPE glyphs;
  Blind unseen boulder feel; invent hold_another_object hitfloor;
  pickup highdrop; toss_up.
  Do not “fix” seed0383 with ALIGN/FORCE.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / vision.c `notice_all_mons` /
  `makemap_prepost` / `wiz_makemap` / `restore_artifacts`.
  Default `spot_monsters`/`glyph_updates`/`mon_movement` Off.
  Do not treat `dothrow` `game.thrownobj` as wired (review **172**).
  Do not Must-fix `DIR_UP`/`DIR_DOWN` const swap (review **178**).

## Landmarks (≤15)

- D-1270: `hack.c` hero `test_move` IRONBARS — Passes_walls ||
  `passes_bars(youmonst.data)` allow; DO_MOVE rust/corr/metallivore
  `still_chewing` then occupy if done. Underwater obstacle /
  generic rock Passes_walls / tunnels / autodig still named.
- D-1269: `dig.c` `digactualhole` PIT after `wake_nearby` and
  HOLE `at_u` → `switch_terrain` then Lev/Fly re-read. C
  `maketrap` PIT/HOLE `set_levltyp` STONE/SCORR→CORR still named
  (STONE stay blocklev). dothrow hurtle / `u_on_rndspot` / objnam
  wish named.
- D-1268: `hack.c` `spoteffects` dest-typ ≠ origin or
  `iflags.terrain_typ == MAX_TYPE` → `switch_terrain` before
  `pooleffects`.
- D-1267: `hack.c` `set_uinwater` — in_out ≠ (int)uinwater writes
  0/1 then `switch_terrain`. boulder_hits_pool dry-land, drown
  fail-crawl, goto_level leave+after-getlev. pooleffects leave /
  drown Amphibious wade / zap freeze named.
- D-1266: `uhitm.c` `hmonas` altwep / `uswapwep` — first AT_WEAP
  uses uwep then toggles to uswapwep when one-handed / no shield /
  not launcher-ammo-missile / not silver+Hate_silver; re-read slot
  after known_hitum; passivedone `drop_uswapwep` if cursed.
  skipdrin / pit kick named.
- D-1265: `hack.c` fight_empty Upolyd AT_EXPL `explum(null)` +
  wake_nearto(7*7) then mh=-1 `rehumanize`; You explode-at /
  futilely. pick-dig named.
- D-1264: `uhitm.c` AT_ENGL `gulpum` + `start_engulf`/`end_engulf`
  + `hmonas` `rnd(20+i)` (was `continue` with AT_NONE). altwep
  D-1266.
- D-1263: `dothrow.c` `hitfloor` `dropz(TRUE)` after hero_breaks /
  ship_object; drop `!can_reach_floor` + hornoplenty wired.
  invent hold_another_object / pickup highdrop / toss_up named.
- D-1262: `hack.c` `moverock_core` nopick `m<dir>` over/against
  before Levitation; giant `u_locomotion` over; squeeze Flying
  over/against; else in-way + glyph `door_opened`. Blind unseen
  start-of-loop / next_boulder / verysmall vain named.
- D-1261: `mhitu.c` `hitmsg` `pline_mon` + AT_TENT `s_suffix`
  tentacles + AT_EXPL/BOOM explodes + thick_skinned kick punct
  ".". missmu/wildmiss/mswings stay pline; mattacku AT_TENT /
  explmu named.
- D-1260: `hack.c` `domove_core` after hideunder: `(dx||dy)` +
  `U_AP_TYPE` OBJECT/FURNITURE → `m_ap_type=M_AP_NOTHING` (not
  `seemimic`). `display_self` U_AP_TYPE glyphs named.
- D-1259: `monmove.c` `dissolve_bars` `u_at` → `switch_terrain`
  after `newsym`. still_chewing / postmov / zap / hit_bars await.
  `spoteffects` dest-typ D-1268; `digactualhole` D-1269.
- D-1258: `mondata.c` `passes_bars` + `mon.c` `mon_allowflags`
  ALLOW_BARS rust/corr/metallivore/slithy-small + ustuck subset;
  `mfndpos` W_NONDIGGABLE rust/corr skip. Hero `test_move` D-1270.
- D-1257: `monmove.c` `gelcube_digests` first organic non-artifact
  non-prize minvent; `eaten_stat` + `extract_from_minvent` +
  `m_consume_obj` heal/`delobj`. `meatobj` / meatbox / poly still named.
- D-1256: `trap.c` `launch_obj` ROLL LANDMINE `rn2(10)>2` KAABLAMM /
  `fracture_rock`/`scatter` + PIT/SPIKED/HOLE/TRAPDOOR `flooreffects`
  + `dist=-1`. down_gate / boulder-chain / post-switch flooreffects
  still named.
