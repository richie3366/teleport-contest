# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard live **31**/44 @16:41Z (pts **11351**/11405) vs local
  suite **44**/44 @**#1200** (D-0930…D-0934). Await cron PASS lift.
- Falsifier: next `data.json` public.passing / gap-session screens.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483); D-0930 is
  space+attr0+CLR_GRAY only.
- Don't skip painting `disp_ch===' '` in flush — breaks S_air (D-0931).
- Don't emit mid-row space runs >4 as literal spaces when contest CUFs
  (D-0931); keep inv/uline spaces (D-0129); leading bold pads (D-0932).
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not HEAVY_IRON_BALL `owt!=0` weight short-circuit (#1194).
- Do not treat @1808 as page-count shim (#1194).
- Do not treat @1799 as heat/smoke / lev_message order (#1193).
- Do not treat @1770 as Norep/parse-clear alone (#1192).
- Judge does **not** elide RC path (D-0933); §1.2 allows recorder
  `get_configfile` only (D-0934) — do not extend carve-out.
- Older don't-rechecks: D-0928/NOTES archive / journal.

## Landmarks (≤15)

- Suite @**#1200**: **44**/44 Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` (seed2200 suite-confirmed D-0934).
- Live LB richie3366 **31**/44 public pts **11351**/11405
  lastScored 2026-07-21T16:41Z (pre D-0930…).
- **D-0934:** CONSTITUTION §1.2 + `get_configfile` recorder path.
- **D-0933 #1199:** NHW_TEXT paint ≤cols−1.
- **D-0932 #1198:** serialize leading bold spaces.
- **D-0931 #1197:** flush S_air + mid-row space CUF >4.
- **D-0930 #1196:** serialize space+attr0+CLR_GRAY → NO_COLOR.
- **D-0928 #1194:** ^X rank==role + eaten_stat; seed4500 **PASS**.
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**.
