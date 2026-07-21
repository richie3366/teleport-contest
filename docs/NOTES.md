# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard live **31**/44 @16:41Z (pts **11351**/11405) vs local
  **43**/44. D-0930…D-0932 + D-0933 shipped — await cron PASS lift.
- seed2200 @158: D-0933 paint ≤cols−1 done; remaining miss is recording
  `get_configfile` absolute path (Constitution — do not hardcode).
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
- Do not hardcode davidbau / recording `$HOME` into `get_configfile`.
- Judge does **not** elide RC path (D-0933); `verify-rerecord` only.
- Older don't-rechecks: D-0928/NOTES archive / journal.

## Landmarks (≤15)

- suite **43**/44 Scr **11404**/11405 RNG **100%** @**#1195**;
  speed `31+0.26/turn`; sole miss seed2200 229/230 (path string).
- Live LB richie3366 **31**/44 public pts **11351**/11405
  lastScored 2026-07-21T16:41Z (pre D-0930…D-0932).
- **D-0933 #1199:** NHW_TEXT paint cols−1; seed2200 path residual.
- **D-0932 #1198:** serialize leading bold spaces; seed0030
  `aC2_aJ0` **14→0**.
- **D-0931 #1197:** flush paints S_air; serialize mid-row space CUF >4;
  seed0373 strict `sp_C6_J8` **154→0**.
- **D-0930 #1196:** serialize space+attr0+CLR_GRAY → NO_COLOR;
  seed0007 j37 **7080→0**.
- **D-0928 #1194:** ^X rank==role + eaten_stat; seed4500 **PASS**.
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**.
