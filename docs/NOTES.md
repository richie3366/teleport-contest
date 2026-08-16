# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `32+0.27/turn` R² 0.87) after cadence **#1375**;
  next @**#1380**.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Must-fix empty (review **39** ACCEPT D-1078; **40** ACCEPT
  D-1079; **41** ACCEPT-WITH-DEBT D-1080 — youprop sticky /
  `in_rooms` pointer named, not Must-fix). Keep 8–12 open rows;
  refill from the map when below 8.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (review + full `sessions` together every 5).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: **D-1082** `can_reach_floor` ceiling_hider / Flying||MZ_HUGE.
  Cadence **#1375** fortress held. Reviews **39–41**.
- **Next cluster:** Open `engrave.c` `can_reach_floor(check_pit)`
  teeter/shaft (named from D-1073). Not ceiling_hider.
- **Hypothesis:** `can_reach_floor(check_pit)` still no-ops
  `uteetering_at_seen_pit` / `uescaped_shaft`.

## Don't re-check (≤15)

- Do not predict / amend / extra-commit **Addressed** HASH (chicken-egg).
  Stamp `D-NNNN` in the fix commit; the next real commit fills
  `git log --format=%h` of that fix. No stamp-only SHAs. Live
  `LOOP-QUEUE.md` is unchecked-only — run
  `node scripts/archive-loop-queue-done.mjs` in the same commit.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483); D-0930 is
  space+attr0+CLR_GRAY only.
- Don't skip painting `disp_ch===' '` in flush — breaks S_air (D-0931).
- Don't emit mid-row space runs >4 as literal spaces when contest CUFs
  (D-0931); keep inv/uline spaces (D-0129); leading bold pads (D-0932).
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen / SpLev_Map flip (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not HEAVY_IRON_BALL `owt!=0` weight short-circuit (#1194).
- Judge does **not** elide RC path (D-0933); §1.2 allows recorder
  `get_configfile` only (D-0934) — do not extend carve-out.
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.
- Do not push shared `maketrap` PIT IS_ROOM→ROOM morph without full
  suite — keep morph in music `do_pit` (D-0972).
- Do not memcpy gi worn/ball pointers with struct you (D-1035).
  Do not drive `setnotworn` from `owornmask`/`setworn(null)` (D-1020).
  Do not `delobj` tutorial loot on leave. Do not fire off-level
  object timers (D-1037). Do not omit `msounds[]` (D-1053).
- Do not restore hardcoded tut-1 key strings vs `nh.eckey`/`tut_key`
  (D-1065). Do not skip `tutorial()` `nhcore_call_available` disable
  or raw-`nhl_gamestate` from `goto_level` (D-1066). Do not restore
  dosit `"your steed"` vs `mon_nam(usteed)` / do not swap in
  `y_monnam` (D-1067). Do not skip `dosit` hider clear / do not
  clear trapper `uundetected` (D-1068). Do not restore Levitation-
  only `dosit` return (D-1069). Do not treat sticky `u.Levitation`
  as C `youprop.h` `Levitation` in `can_reach_floor` (D-1070).
  Do not skip helper hugs `AT_HUGS`+`!sticks` (D-1071). Do not
  skip ceiling_hider / restore sticky `u.Flying` in
  `can_reach_floor` (D-1082). Do not
  skip dosit ustuck lap (D-1072). Do not treat eel WRAP as hugs.
  Do not import `monmove.js` `sticks` for dosit lap (AT numbers
  6/7 ≠ C `AT_HUGS=7`/`AT_ENGL=11`). Do not skip dosit OBJ_AT
  picnic on `uteetering_at_seen_pit`/`uescaped_shaft` (D-1073).
  Do not restore dragon sit always-bare “hoard” (D-1074); C
  `money_cnt` is first `COIN_CLASS`, not a sum. Do not restore
  oviparous `#sit` having-fun (D-1075); do not skip male/hunger/
  tetra/Sargasso `ECMD_OK`; do not put `egg_type_from_parent` in
  sit.js (C `mon.c`; `force_ordinary` short-circuits `rn2(77)`).
  Do not restore hero `trapeffect_pit` early-return / skip
  `Can_fall_thru` on hole / sticky `u.Levitation` in `check_in_air`
  (D-1076). Do not restore `is_lava` LAVAPOOL/LAVAWALL-only (D-1077).
  Do not restore sit `split_mon` monster `return null` (D-1078);
  trap/mon/uhitm callers still named. Do not skip
  `peace_minded`/`set_malign` `ptr.msound` (D-1079);
  `m_initweap` still mndx. Do not skip `u_entered_shop` deserted /
  angry / Invis / pickaxe doorway (D-1080). Do not skip `cprefx`
  rider `revive_corpse` after lifesave / do not restore apply-local
  `revive_corpse` (D-1081); MINVENT/CONTAINED/BURIED still named.

## Landmarks (≤15)

- Suite after cadence **#1375**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `32+0.27/turn` (R² 0.87). Next @**#1380**.
- **D-1082:** `can_reach_floor` ceiling_hider FALSE then
  Flying||MZ_HUGE TRUE (`engrave.c`). check_pit still named.
- **D-1081:** `cprefx` rider `revive_corpse` after lifesave (`eat.c` /
  `do.c`). Tin skip; `zero_victual`; floor rider suffixes. MINVENT/
  CONTAINED/BURIED + Adjmonnam still named.
- **D-1080:** `u_entered_shop` deserted/angry/Invis/pickaxe doorway (`shk.c`).
  Review **41** ACCEPT-WITH-DEBT (youprop sticky / `in_rooms` pointer named).
- **D-1079:** `peace_minded`/`set_malign` `ptr.msound` (MS_LEADER −20). Review **40** ACCEPT.
- **D-1078:** sit `split_mon` monster `clone_mon` (`makemon.c`); trap/mon/uhitm callers named. Review **39** ACCEPT.
- **D-1077:** `is_lava` DRAWBRIDGE_UP+`DB_LAVA` (`dbridge.c`). Review **38** ACCEPT. `is_pool`/`is_moat` DRAWBRIDGE_UP+DB_MOAT still named.
- **D-1076:** hero pit/hole `dotrap` VIASITTING; Punished `ballfall` still omit.
