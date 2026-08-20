# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1314 `mon.c` `m_respond` (cadence
  **#1660** `734449dc`; reviews **269–272** ACCEPT-WITH-DEBT, no
  Must-fix). Next: Open `dothrow.c` throwit ACURRSTR urange (named).
  Not tether. Do not skip D-1314…D-1229. Do not pull gazemu /
  explmu / AT_HUGS / mhitu AD_DRIN / candelabrum / zap bhit
  `THROWN_TETHERED_WEAPON` isqrt / thitmonst vanish pline /
  dokick snuff_candle.
  Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
  No FORCE.
- Do not revert D-1217–D-1314. Named omits stay map, not Must-fix.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1314.
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
- Do not skip D-1071…D-1314 (index). Named still: mhitu+mhitm
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

- D-1314: `mon.c` `m_respond`. Adjacent `MS_SHRIEK` `!um_dist(1)`:
  `!Deaf` pline+`stop_occupation`; `!rn2(10)` then `rn2(13)?NULL:purple/baby`
  `makemon(0,0)`; always `aggravate`. Medusa `couldsee` first AT_GAZE
  (**gazemu named**). Hostile Erinys `m_canseeu` `aggravate`. Callers
  dochug (DEADMONSTER return), boomhit, bhitm after wakeup + `!*ushops`
  `hot_pursuit`. Compare mndx. ACURRSTR urange named.
- D-1313: `dothrow.c` throwit_mon_hit `snuff_candle` then
  `thitmonst` then shk `hot_pursuit` when `!inside_shop(u)` or
  `!strchr(in_rooms(SHK,SHOPBASE),*ushops)` (NUL = terminator).
  Lamps not snuffed (`snuff_lit` is other callers). Early MINVENT
  shk-holds TRUE. `inside_shop` exported. **m_respond D-1314**.
- D-1312: `dothrow.c` thitmonst leader catch / `quest.c`
  `finish_quest`. Thrown/kicked questarti/unique/fake AoY;
  `!HMON_APPLIED`; `mcanmove` catch; keep if invoked unique
  (not AoY) or `!mpeaceful` else `finish_quest` + hands/tosses
  + `!next2u` `sho_obj_return_to_u` + addinv. offeredit bodies
  named. **tether D-1311**.
- D-1311: `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK.
  `arw->tethered && W_WEP`; swallow + fly `tmp_at(DISP_TETHER,
  obj_glyph)`; empty cells step+delay; monster cell not painted;
  success `DISP_END, BACKTRACK` (`sidx>1` delay sidx-1);
  fail/consumed `DISP_END, 0`. `tether_glyph` zap type 2 toward @.
  Leader catch D-1312. zap bhit THROWN_TETHERED / isqrt named.
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
  Helmet / `m_slips_free` D-1307. mswings D-1305.

