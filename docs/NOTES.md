# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1311 `dothrow.c` throwit tethered
  DISP_TETHER / BACKTRACK (cadence **#1660** `734449dc`; reviews
  **269–272** ACCEPT-WITH-DEBT, no Must-fix). Next: Open `dothrow.c`
  thitmonst leader catch / finish_quest (named). Not vanish pline.
  Do not skip D-1311…D-1229. Do not pull explmu / AT_HUGS /
  mhitu AD_DRIN / candelabrum / ACURRSTR urange / zap bhit
  `THROWN_TETHERED_WEAPON` isqrt.
  Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
  No FORCE.
- Do not revert D-1217–D-1311. Named omits stay map, not Must-fix.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1311.
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
- Do not skip D-1071…D-1311 (index). Named still: mhitu+mhitm
  AD_DRIN / AD_WRAP `m_slips_free`; explmu / AT_HUGS; mattackm
  AT_TENT; candelabrum `(n of 7)` / leash / W_TOOL worn /
  POT_OIL `(lit)`; AT_ENGL
  gulps/lunges. No ALIGN/FORCE on seed0383.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- D-1311: `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK.
  `arw->tethered && W_WEP`; swallow + fly `tmp_at(DISP_TETHER,
  obj_glyph)`; empty cells step+delay; monster cell not painted;
  success `DISP_END, BACKTRACK` (`sidx>1` delay sidx-1);
  fail/consumed `DISP_END, 0`. `tether_glyph` zap type 2 toward @.
  Leader `finish_quest` / zap bhit THROWN_TETHERED / isqrt named.
  **poly AT_KICK D-1310**.
- D-1310: `dokick.c` `kick_monster` poly AT_KICK. `Upolyd &&
  attacktype(AT_KICK)` then `find_roll_to_hit` once + unparalyze
  + NATTK continue-only-KICK `rnd(20)` / `special_dmgval(W_ARMF)`
  / shade break / `damageum`+`passive` or `missum`+`passive`;
  `multi<0` / DEF_DIED break then return. kickdmg `special_dmgval`
  / `maybe_mnexto` evade named. **AT_TENT D-1309**.
- D-1309: `mhitu.c` `mattacku` AT_TENT melee. Same HTH arm as
  claw/kick/bite; pit kick; `!MON_WEP || mconf || Conflict ||
  !touch_petrifies`; unsolid `failed_grab` continue; thick-skinned
  kick skips `hitmu`. skipdrin continue already live. mhitu
  AD_DRIN / explmu / AT_HUGS / mattackm AT_TENT named.
  **candle D-1308**.
- D-1308: `objnam.c` doname TOOL lamp/candle. `partly used ` when
  remaining burn (`age`, lit `peek_timer(BURN_OBJECT)-moves`)
  `< 20*oc_cost`; then `" (lit)"`. `mksobj` tallow 200 / wax 400.
  Candelabrum / leash / W_TOOL worn / POT_OIL `(lit)` named.
  **helmet D-1307**.
- D-1307: uhitm helmet / `m_slips_free`. After headless return,
  AD_DRIN W_ARMH grease/oilskin slip (no skipdrin); then
  `which_armor(W_ARMH) && rn2(8)` helm/hat block; then eat_brains
  (D-1306); then lifsav skipdrin. mhitu `u_slip_free`/`uarmh` +
  mhitm + AD_WRAP caller named. **eat_brains D-1306**.
- D-1306: `eat.c` eat_brains. `rnd(10)` before DEADMONSTER /
  noncorporeal. Hero→mon: conducts, mindless miss, rider
  `done(DIED)`, else `morehungry(-rnd(30))` + INT recover +
  exercise WIS + `*dmg_p += xtra`; `maybe_cannibal`. uhitm
  headed caller live; headless still `return` before it.
  **mswings D-1305**.
- D-1305: `mswings` `pline_mon` (verbose + `!Blind` +
  `mon_visible`). Verb/quan/`mhis`/`xname` already live (D-0286).
  Did not wrap `wildmiss` (D-1291 `set_msg_xy` then `pline`).
  AT_ENGL gulps/lunges / AT_TENT / Snickersnee bash named.
- D-1304: `wizterrainwish` secret corridor. Suffix after wall
  before room; CORR→SCORR `"Secret corridor."`; else requires
  corridor location. Leftover BLev FROMOUTSIDE (SCORR obstructed).
  **drawbridge / lava pooleffects named**.
- D-1303: `dothrow.c` sho_obj_return_to_u — after `rn2(100)` success,
  non-tethered (Mjollnir) `tmp_at(DISP_FLASH, obj_to_glyph display rng)`
  then walk `bhitpos-dir` toward @ with `nh_delay_output`; dx=dy=0 or
  already-on-@ no-op. Wielded aklys BACKTRACK is D-1311. Leader
  `!next2u` still named. **throw_gold D-1302**.
- D-1302: `dothrow.c` throw_gold swallow — after self-cancel, `freeinv`
  then `add_to_minv(ustuck)` (not `swallowit`/`mpickobj`);
  `digests` → `s_suffix(mon_nam)` + `" entrails"`; `pline_The`.
  You() self / unsplit / dz / bhit / ghitm / quivered throwit named.
  **boomhit D-1301**.
- D-1301: `zap.c` boomhit 10-step curve from throwit
  `BOOMERANG && !Underwater`. `nhits=max(1,spe+1)`; URIGHTY
  counterclockwise; catch `!Fumbling && rn2(20)<ACURR(DEX)`
  → `return_throw_to_inv`; self-hit `thitu`+`endmultishot`;
  sink Klonk; `!ZAP_POS` backup. m_respond / Soundeffect /
  `sho_obj_return_to_u` named. **steed D-1297**.
- D-1300: `maketrap` shop `add_damage` before DRAWBRIDGE_UP /
  `set_levltyp`. `*in_rooms(SHOPBASE)` && (`is_hole` || door ||
  wall); cost `SHOP_HOLE_COST` iff door/wall && `!mon_moving`
  else 0. Snapshots original typ. overwrite `reset_utrap` /
  Knox / Sokoban finish named. **ice D-1296**.
- D-1299: `domove_swap_with_pet` park ux0, `mundetected=0`,
  `M_AP_TYPE`→`seemimic` before pit/NODIAG/boulder/mtrapped/
  mundisplaceable; occupy then swap; fail restores ux. `goodpos`
  / mintrap aftermath / bump_mon stumble named. **display_self
  D-1275**.

