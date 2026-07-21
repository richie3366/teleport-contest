# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard live **32**/44 @14:49Z vs local **43**/44. D-0930 +
  D-0931 (AIR flush + mid-row space CUF) shipped — await cron PASS lift.
- Falsifier: next `data.json` public.passing / gap-session screens.
- Residual strict SGR: seed0030 bold-bleed on spaces (14× `aC2_aJ0`)
  — not D-0931 scope.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483); D-0930 is
  space+attr0+CLR_GRAY only.
- Don't skip painting `disp_ch===' '` in flush — breaks S_air (D-0931).
- Don't emit mid-row space runs >4 as literal spaces when contest CUFs
  (D-0931); keep inv/uline spaces (D-0129).
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not HEAVY_IRON_BALL `owt!=0` weight short-circuit (#1194).
- Do not treat @1808 as page-count shim (#1194).
- Do not treat @1799 as heat/smoke / lev_message order (#1193).
- Do not treat @1770 as Norep/parse-clear alone (#1192).
- Older don't-rechecks: D-0928/NOTES archive / journal.

## Landmarks (≤15)

- suite **43**/44 Scr **11404**/11405 RNG **100%** @**#1195**;
  speed `31+0.26/turn`; sole miss seed2200 229/230 parked.
- Live LB richie3366 **32**/44 public pts **11259**/11405
  lastScored 2026-07-21T14:49Z; seed0013 PASS on judge.
- **D-0931 #1197:** flush paints S_air; serialize mid-row space CUF >4;
  seed0373 strict `sp_C6_J8` **154→0**.
- **D-0930 #1196:** serialize space+attr0+CLR_GRAY → NO_COLOR;
  seed0007 j37 **7080→0**.
- **D-0928 #1194:** ^X rank==role + eaten_stat; seed4500 **PASS**.
- **D-0929 #1156:** look_here-only `keep_message_leftover`; suite
  **38→42**.
