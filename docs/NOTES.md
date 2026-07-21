# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @**101710**. #1109 landed
  `set_uasmon` BLINDED FROMFORM (prefix **101641→101710**; runner
  RNG **101871** Scr **928**). Next: C `rn2(5) @ postmov` vs JS
  `rn2(8)`. Focused:
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

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
- Do not omit peffect_extra_healing / BLINDED nh_timeout /
  learn_unseen_invent (#1098); @90543 was wish Blind dknown/makeknown.
- Do not FORCE `ualign.abuse=2` — missing path was `check_caitiff` (#1100).
- Do not treat @101641 nhlib shuffle vs rn2(61) as missing `#version`
  binding — was Blind FROMFORM / Monnam "It" (#1109).
- Do not omit `set_uasmon` BLINDED `!haseyes` FROMFORM (#1109).

## Landmarks (≤15)

- suite **42/44** @#1105 Scr **10514**/11405 RNG **786142**/792838
  (99.16%); speed `32+0.25/turn`; next cadence @**#1110**.
- **D-0928 #1109:** Blind FROMFORM; prefix **101710**; RNG **101871**
  Scr **928**.
- **D-0928 #1108:** eel mfndpos nexttry; was @**101641**.
- **D-0928 #1107:** eel hideunder; was @**101616**.
- **D-0928 #1106:** `u_rooted`; was @**101608**.
- **D-0928 #1105:** passiveum + mhitm_ad_ston; was @**101391**.
- **D-0928 #1104:** nolimbs ring put-on + doread check_capacity;
  was @**101373**.
- **D-0928 #1103:** polyself NOFLAGS + zap poly + nohands + drink
  empty-getobj; was @**100699**.
- **D-0928 #1102…#1092:** goodpos / water / caitiff / Blind/wish /
  wait / dobuzz / I-glyph / flip (see DIVERGENCE-INDEX).
- **D-0927…D-0921:** F-prefix / blnd / breamm / invent / wakeup /
  minetn-4 (see DIVERGENCE-INDEX).
