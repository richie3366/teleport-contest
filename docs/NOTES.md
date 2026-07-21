# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @**104241**. #1116: `break_armor`
  nohands gloves/helm/shield/boots (C mold messages). Still @**104241**:
  JS hero `overexertion`→`gethungry` `rn2(20)` vs C `distfleeck`.
  Fungus Fast `rn2(3)=0` → JS `umov=12`; C continues mons (`umov<12`).
  Falsify: C dump `umovement`/`mvl_wtcap` at `u_calc` after that roll.
  Focused: `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/mux/@88377 coords — place matched (D-0928).
- Do not chase last=77 / FlipX sum80 — C dump falsifies (#1092).
- Do not treat screen `>`@31 as stairway x — C stairway **(32,16)** (#1092).
- Do not FORCE FlipX minx=1 / maxx=78 / stone78 / exclude78 (#1088–#1089).
- Do not silent-clear F-prefix then still run `#` (D-0927).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not “fix” gethungry / clear invuln to hide early `#pray` (#1095).
- Do not omit Count:N `.` timed_occupation / Blind feel (#1096).
- Do not FORCE `ualign.abuse=2` — missing path was `check_caitiff` (#1100).
- Do not treat @103155 getlev/`^V` as the cause — More/eat desync (#1113).
- Do not ship inediate `is_edible` reject for FOOD_CLASS (#1113).
- Do not treat @104217 as wrong `exercise` modulus — was stub `mfind0`
  + unwired `#wizwhere` leaking pager `s` (#1115).
- Do not treat @104241 as Very_fast vs Fast — C log is allmain.c:131 Fast;
  FORCE VF/umov0 is symptom-only; glove shed ≠ capacity tier root (#1116).

## Landmarks (≤15)

- suite **42/44** @#1115 Scr **10516**/11405 RNG **788815**/792838
  (99.49%); speed `31+0.24/turn`; next cadence @**#1120**.
- **D-0928 #1116:** break_armor nohands shed; still @**104241** fleeck
  vs overexertion; next u_calc umov fungus Fast.
- **D-0928 #1115:** mfind0 + wizwhere; prefix **104217→104241**.
- **D-0928 #1114:** hitmu hidden-under; was @**104217** exercise.
- **D-0928 #1113:** eat key-desync misread (More not empty eat).
- **D-0928 #1112:** ok_to_throw + mtimedone; was @**103155**.
- **D-0928 #1111:** select_newcham random while; was @**103071**.
- **D-0928 #1110…#1092:** eel / Blind FROMFORM / …
