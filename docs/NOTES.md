# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 RNG complete; Scr **995**/1814;
  prefix **@521**. C discoveries weapon list `--More--` vs JS map.
  Focused:
  `node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`

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
- Do not treat @107646 `rn2(79)` as ordinary fill root — missing
  `Kni-goal` loader (#1134).
- Do not treat @372 `KIRJEs` as xname typo — missing `singplur_compound`
  (#1140).
- Do not treat @517 iron-chain look as display bug — was `check_here`
  counting `uchain` (#1141).

## Landmarks (≤15)

- suite **42/44** @#1140 Scr **10560**/11405 RNG **792838**/792838
  (**100%**); speed `31+0.26/turn`; next cadence @**#1145**.
- **D-0928 #1141:** BALL `very `/`(chained to you)` + check_here skip
  uchain; Scr **970→995**; prefix **@517→@521**.
- **D-0928 #1140:** makeplural `singplur_compound`; Scr **969→970**.
- **D-0928 #1139:** hideunder You_see + statue simpleonames; Scr
  **966→969**.
- **D-0928 #1138:** doset fruit getlin + menu `>` page; Scr **954→966**.
- **D-0928 #1137:** getpos dirty flush last-glyph curs; Scr **950→954**.
- **D-0928 #1136:** getpos look_at_object; Scr **949→950**.
- **D-0928 #1135:** getpos `S_ss1` `'0'`; Scr **947→949**.
- **D-0928 #1134:** `Kni-goal` load_special; RNG **complete 108275**.
- **D-0928 #1133:** You-die `notdied` short-circuit; was @**107645**.
- **D-0928 #1132:** unmul more ate ^V; You-die skip + yn WIN_STOP.
- **D-0928 #1131:** mhitm_ad_legs mhitu; was @**107470**.
- **D-0928 #1130:** vamp dochng/newcham mndx; was @**107304**.
- **D-0928 #1129:** nasty + SUMMON_MONS; was @**106852**.
- **D-0928 #1128:** STRAT_APPEARMSG + mnexto rloc_to_flag; was @**106838**.
