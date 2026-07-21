# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @**101373**. #1104 landed
  `nolimbs` ring put-on + `doread` `check_capacity` (symptom looked
  like `rnd_otyp_by_namedesc` vs `rn2(5)`). Prefix **100699→101373**.
  Next: C `d(2,6) @ passiveum` vs JS `rnd(21)`. Focused:
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
- Do not treat @100699 `rn2(46)` vs `rn2(5)` as namedesc — was
  `nolimbs` put-on + capacity (`#1104`).
- Do not omit `polyself` system-shock/`rn1` or prompt drink with
  zero potions (GETOBJ_NOFLAGS) (#1103).

## Landmarks (≤15)

- suite **42/44** @#1100 Scr **10516**/11405 RNG **785042**/792838
  (99.02%); speed `31+0.25/turn`; next cadence @**#1105**.
- **D-0928 #1104:** nolimbs ring put-on + doread check_capacity;
  prefix **101373**; RNG **101373** Scr **926**/1814.
- **D-0928 #1103:** polyself NOFLAGS + zap poly + nohands + drink
  empty-getobj; was @**100699**.
- **D-0928 #1102:** goodpos youmonst u_at; was @**100475**.
- **D-0928 #1101:** water_damage early arms; was @**100421**.
- **D-0928 #1100:** check_caitiff; was @**100395**.
- **D-0928 #1099:** adj_erinys infra; was @**95154**; FORCE→100395.
- **D-0928 #1098…#1092:** Blind/wish / wait / dobuzz / I-glyph / flip
  (see DIVERGENCE-INDEX).
- **D-0927…D-0921:** F-prefix / blnd / breamm / invent / wakeup /
  minetn-4 (see DIVERGENCE-INDEX).
