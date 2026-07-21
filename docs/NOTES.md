# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @**107646** C `nhlib.lua`
  shuffle `rn2(3)` vs JS `rn2(79)` (after getbones matched).
  #1133 C dump: WIN_STOP+no-room `"You die"` leaves `notdied=1`
  (short-circuit); #1132 always-clear was wrong. Focused:
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
- Do not treat @107645 as missing `getbones` — #1132/#1133 Die?
  `notdied` short-circuit / WIN_STOP.
- Do not always-clear WIN_STOP on `"You die"` — C short-circuits
  `notdied` when no append room (#1133).

## Landmarks (≤15)

- suite **42/44** @#1130 Scr **10531**/11405 RNG **792061**/792838
  (99.90%); speed `30+0.25/turn`; next cadence @**#1135**.
- **D-0928 #1133:** You-die `notdied` short-circuit; was @**107645**;
  prefix **107645→107646**; runner RNG **107651** Scr **941**.
- **D-0928 #1132:** unmul more ate ^V; You-die skip + yn WIN_STOP;
  still @**107645** (always-clear wrong → #1133).
- **D-0928 #1131:** mhitm_ad_legs mhitu; was @**107470**;
  prefix **107470→107645**; runner RNG **107645** Scr **939**.
- **D-0928 #1130:** vamp dochng/newcham mndx; was @**107304**;
  prefix **107304→107470**; runner RNG **107498** Scr **941**.
- **D-0928 #1129:** nasty + SUMMON_MONS; was @**106852**;
  prefix **106852→107304**.
- **D-0928 #1128:** STRAT_APPEARMSG + mnexto rloc_to_flag; was @**106838**.
- **D-0928 #1127:** pickup notake gate; C also double incapable.
- **D-0928 #1124:** dowear verysmall/nohands; was @**106540**.
- **D-0928 #1123:** PSI_BOLT mdamageu/rehumanize; Unchanging wear
  was #1124.
- **D-0928 #1122:** AT_MAGC castmu; was @**106536**.
- **D-0928 #1121:** set_uasmon MR_* + getmattk lich cold; was @**106531**.
- **D-0928 #1120:** tactics + fire destroy_items; was @**106304**.
- **D-0928 #1119:** S_BAT Inhell MFAST; was @**104705**.
- **D-0928 #1118:** @104705 early shapeshift; bat MFAST omit (→#1119).
