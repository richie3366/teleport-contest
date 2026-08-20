# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1286 missmu `pline_mon`
  (cadence **#1625** `7d61ee8b`; reviews **241–244**
  ACCEPT-WITH-DEBT, no Must-fix). Next: Open `stairs.c`
  `u_on_sstairs` → `u_on_rndspot` (named from D-1278). Not cmd
  wiz. Do not skip D-1286…D-1229. Do not pull skipdrin / pit
  kick / wildmiss `set_msg_xy` / MEAT_RING / seemimic /
  next_boulder / slip / stamina / steed potion /
  wizterrainwish traps / DRAWBRIDGE_UP ice. Do not wrap
  `msg_mon_movement` as `pline_mon`. No FORCE.
- Do not revert D-1217–D-1286. Named omits stay map, not Must-fix.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1286.
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
- Do not skip D-1071…D-1286 (index). Named still: skipdrin / pit
  kick; wildmiss `set_msg_xy`; MEAT_RING; throwit slip /
  stamina / steed; next_boulder. No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` / `makemap_prepost`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1286: `missmu` both arms `pline_mon` (seduce pretend +
  verbose `"just "` miss). wildmiss C is `set_msg_xy` then
  `pline`; mswings / AT_ENGL gulps/lunges named.
- D-1285: `meatcorpse` — corpse_eater `sobj_at(CORPSE)` vegan/petrify
  skip; rider `revive_corpse`; `splitobj` quan>1; `m_consume_obj`.
  `mon_would_consume_item` still named.
- D-1284: `meatobj` cube floor — prize skip; rider revive; rock/ball/
  scare/petrify-corpse skip; engulf `mpickobj` vs devour
  `m_consume_obj`; YUM YUM. **meatcorpse D-1285**.
- D-1283: throwit swallowit — `u.uswallow` before `u.dz`;
  `mpickobj(ustuck)`; fail-path swallowit. slip / stamina / steed /
  boomhit / throw_gold swallow / vanish pline named.
- D-1282: throwit returning_missile — AutoReturn / throwit_return /
  ceiling-return / post-bhit `rn2(100)` addinv+setuwep. **swallowit
  D-1283**. boomhit / `sho_obj_return_to_u` named.
- D-1281: `moverock_core` Blind unseen feel before next_boulder /
  nopick. JS `remembered_glyph.boulder`. next_boulder named.
- D-1280: `maketrap` PIT/HOLE `set_levltyp`. DRAWBRIDGE_UP ice /
  shop add_damage / liquid_flow named.
- D-1279: `wizterrainwish` → `switch_terrain`. Traps / door/wall
  named.
- D-1278: `u_on_rndspot` → `switch_terrain`. On_W_tower / sstairs /
  cmd wiz named.
- D-1277: `hurtle_step` dest-typ `switch_terrain`. Drown /
  Passes_walls named.
- D-1276: doname EGG `ismnum`+laid. MEAT_RING / candle named.
- D-1275: `display_self` U_AP_TYPE glyphs. find_trap / seemimic
  named.
- D-1274: `toss_up` + throwit `u.dz`. **returning_missile D-1282**.
  **swallowit D-1283**. slip / stamina / steed named.
- D-1273: `tipcontainer` highdrop `hitfloor(TRUE)`.
- D-1272: `hold_another_object` `hitfloor(FALSE)`.
