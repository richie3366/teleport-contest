# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @**106838** track `rn2` is
  symptom. C/JS dumps: wolf cnt 5 vs 8 because **u** C(68,17) vs
  JS(67,14). @106679 `'l'`: C east; JS nhgetch got **`k`** (stream
  behind). #1127: C `pickup` multi/!pickup/notake gate + incapable
  pline (fires @106194 S_FUNGUS) — prefix unchanged. Next falsify:
  JS calls `pickup(1)` **twice** @106194 (goto_level + teleds?) →
  extra More vs C’s one incapable screen; compare nhgetch keys
  106194–106539 to session. Focused:
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not silent-clear F-prefix then still run `#` (D-0927).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not “fix” gethungry / clear invuln to hide early `#pray` (#1095).
- Do not FORCE `ualign.abuse=2` — missing path was `check_caitiff` (#1100).
- Do not treat @103155 getlev/`^V` as root; no inediate FOOD reject (#1113).
- Do not treat @104217 as wrong `exercise` modulus — was stub `mfind0`
  + unwired `#wizwhere` (#1115).
- Do not treat @104241 as Fast umov surplus / FORCE VF — was missing
  `carrying_too_much` (#1117).
- Do not treat @104705 as fleeck rn2(4)/fmon-order alone — was missing
  S_BAT Inhell MFAST; don’t FORCE bat@46 +12 (#1118–#1119).
- Do not treat @106304 fleeck vs lined_up as root — was missing
  covetous `tactics` + fire-trap `destroy_items` (#1120).
- Do not treat @106531–@106540 as invent-letter Put-on mismatch —
  C `W` while nohands → Don't even bother; JS deferred (#1123–#1124).
- Do not treat @106838 as missing literal `rn2(32)` or mfndpos-only —
  C dump: hero/u already diverged; keystream/`k` vs `'l'` (#1127).

## Landmarks (≤15)

- suite **42/44** @#1125 Scr **10529**/11405 RNG **791421**/792838
  (99.82%); speed `31+0.25/turn`; next cadence @**#1130**.
- **D-0928 #1127:** C dump @106838 wolf cnt5/u(68,17) vs JS cnt8/u(67,14);
  pickup notake gate ported; prefix still **106838**.
- **D-0928 #1124:** dowear verysmall/nohands; was @**106540**;
  prefix **106540→106838**; runner RNG **106858** Scr **939**.
- **D-0928 #1123:** PSI_BOLT mdamageu/rehumanize; Unchanging wear
  was #1124.
- **D-0928 #1122:** AT_MAGC castmu; was @**106536**.
- **D-0928 #1121:** set_uasmon MR_* + getmattk lich cold; was @**106531**.
- **D-0928 #1120:** tactics + fire destroy_items; was @**106304**.
- **D-0928 #1119:** S_BAT Inhell MFAST; was @**104705**.
- **D-0928 #1118:** @104705 early shapeshift; bat MFAST omit (→#1119).
- **D-0928 #1117:** carrying_too_much; was @**104241**.
- **D-0928 #1116:** break_armor nohands shed; was @**104241**.
- **D-0928 #1115:** mfind0 + wizwhere; was @**104217**.
- **D-0928 #1114:** hitmu hidden-under; was @**104217** exercise.
- **D-0928 #1113:** eat key-desync misread (More not empty eat).
