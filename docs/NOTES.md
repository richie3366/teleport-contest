# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` R² 0.87) after cadence **#1360**;
  next @**#1365**.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Must-fix empty (reviews **31**/**32** ACCEPT D-1070/D-1071).
  Keep 8–12 open rows; refill from the map when below 8.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: **D-1071** `can_reach_floor` ustuck `AT_HUGS` + `!sticks`
  (review **32** ACCEPT). Hug → sit-on-air; eel WRAP still
  reaches; hero `sticks` still reaches. Lap still named. Do not
  import `monmove.js` `sticks` for lap (AT_HUGS/AT_ENGL 6/7 ≠ C 7/11).
- **Next cluster:** Open `sit.c` `dosit` ustuck `!sticks` lap
  (`Monnam` / `mhis`). Not swallow combat. Helper hugs already
  D-1071. Do not pull ceiling_hider / MZ_HUGE.
- **Hypothesis:** hugged `!sticks` hero who *can* reach the floor
  (eel WRAP, not AT_HUGS) still sits in JS, while C offers no lap
  (`Monnam` / `mhis`) and returns `ECMD_OK`.

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
  treat eel WRAP as hugs. Do not import `monmove.js` `sticks` for
  dosit lap (AT numbers 6/7 ≠ C `AT_HUGS=7`/`AT_ENGL=11`).

## Landmarks (≤15)

- Suite after cadence **#1360**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `31+0.27/turn` (R² 0.87). Next @**#1365**.
- **D-1071:** helper hugs `AT_HUGS`+`!sticks`. Sit-on-air reachable.
  Eel WRAP reaches; python hugs does not. Lap still named.
- **D-1070:** `can_reach_floor` + sit message `Levitation()` =
  `(H||E)&&!B`. Not sticky `u.Levitation`.
- **D-1069:** `dosit` three-message envelope + swallow. Helper
  Levitation was sticky — fixed D-1070.
- **D-1068:** `dosit` after usteed: `u.uundetected && is_hider`
  && `umonnum != PM_TRAPPER` → `u.uundetected=0`. No `newsym`.
- **D-1067:** `dosit` steed `You("… %s.", mon_nam(usteed))` ARTICLE_THE.
  Unnamed saddled `"the saddled pony"`; named bare. Not `y_monnam`.
- **D-1066:** tut-1 `tutorial()` → `l_nhcore_call` ENTER/LEAVE then
  both `nhcore_call_available` FALSE. Lua NHCB cmd_before/`tutorial_turn`
  still named. Knight jump / leftover `obfree` / `update_inventory` named.
- **D-1065:** tut-1 `tut_key` → `nh.eckey`/`cmd_from_ecname`.
  Kick `Ctrl-D`; loot `M-l`; tip `Alt-T`; untrap `M-u`;
  twoweapon `X`. Knight jump still deferred.
- **D-1064:** tut-1 `des.teleport_region` `{9,3,9,3}` →
  `levregion_add` + `fixup_special` dest copy. `place_lregion`
  from `u_on_rndspot`. Review **25** ACCEPT `dc354c44`.
