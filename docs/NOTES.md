# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @89775 C `rn2(20) @ gethungry`
  vs JS `rn2(67)` (JS already in `moveloop_core`). #1094 fixed @88399:
  `dobuzz` `type < 0` must `monkilled` (not `xkilled` treasure `rn2(6)`).
  Falsify next: C `gethungry` call order vs JS hunger/occupation path.
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/mux/@88377 coords — place matched (D-0928).
- Do not treat place/`collect_coords` RNG mismatch as cause (D-0928 #1080).
- Do not chase last=77 / FlipX sum80 — C dump falsifies (#1092).
- Do not treat screen `>`@31 as stairway x — C stairway **(32,16)** (#1092).
- Do not FORCE FlipX minx=1 / maxx=78 / stone78 / exclude78 (#1088–#1089).
- Do not FORCE ystart=2 / ysize=19 — clamp or C rn2(20) (#1084/#1086).
- Do not silent-clear F-prefix then still run `#` (D-0927).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not re-blame place/flip for @88377 — fight_empty I (#1093).
- Do not treat @88399 as `corpse_chance` tmp formula — was kill path
  (`xkilled` vs `monkilled`) (#1094).
- Do not omit mhitm_ad_blnd / breamm AT_BREA / invent[] splice
  (D-0924…D-0926; see index).

## Landmarks (≤15)

- suite **42/44** @#1090 Scr **10398**/11405 RNG **773047**/792838
  (97.50%); speed `31+0.25/turn`; next cadence @**#1095**.
- **D-0928 #1094:** dobuzz `type < 0` `monkilled`; prefix **89775**;
  RNG **89881**/108275 Scr **807**/1814.
- **D-0928 #1093:** `domove_fight_empty` I-glyph; prefix was **88399**.
- **D-0928 #1092:** C flip sum81 + stair(32,16) + place(40..45)×(3..8)
  = JS; last=77 theory dead; Flip_coord inFlipArea gate restored.
- **D-0927…D-0921:** F-prefix / blnd / breamm / invent / wakeup /
  minetn-4 (see DIVERGENCE-INDEX).
