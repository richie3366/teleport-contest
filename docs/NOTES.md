# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 @88377 linedup. **#1092 falsified
  last=77/sum80:** C recorder dump `flip_level` medusa-3 =
  minx=2 maxx=79 **sum81** flp=2; stair pre(49,16)→post(**32,16**);
  place rect **(40,3)-(45,8)** tries (45,6)/(43,8)/(43,6) — same as JS.
  Screen `>`@31 / cursor(42,6) are **not** FlipX sum80. Next: why
  linedup sees C hero/geometry ≠ JS despite matched place; or post-place
  ux drift. Do not re-chase last=77.
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/mux/@88377 coords — place first (D-0928).
- Do not treat place/`collect_coords` RNG mismatch as cause (D-0928 #1080).
- Do not treat C land as (39,5) — arrival cursor **[42,7]** = map
  **(42,6)** (D-0928 #1081/#1087) — but #1092: place tries land (43,6).
- Do not treat whole-map Y+1 as real — tty row = map y+1 (#1087).
- Do not FORCE FlipX minx=1 / maxx=78 / stone78 / exclude78 / restore
  (#1088–#1089) — C natural extends already sum81 (#1092).
- Do not chase last=77 / FlipX sum80 — C dump falsifies (#1092).
- Do not treat screen `>`@31 as stairway x — C stairway **(32,16)** (#1092).
- Do not FORCE ystart=2 / ysize=19 — clamp or C rn2(20) (#1084/#1086).
- Do not silent-clear F-prefix then still run `#` (D-0927).
- Do not omit mhitm_ad_blnd / breamm AT_BREA / invent[] splice
  (D-0924…D-0926; see index).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).

## Landmarks (≤15)

- suite **42/44** @#1090 Scr **10398**/11405 RNG **773047**/792838
  (97.50%); speed `31+0.25/turn`; next cadence @**#1095**.
- **D-0928 #1092:** C flip sum81 + stair(32,16) + place(40..45)×(3..8)
  = JS; last=77 theory dead; Flip_coord inFlipArea gate restored.
- **D-0928 #1091:** flip mgoal/EPRI/ESHK + ungated doors +
  `_level_monsters` swap; stone78@83695 track cnt8vs7; still @88377.
- **D-0928 #1089:** exclude78/restore @82639; stone78 best sum80 land.
- **D-0928 #1088:** C kelp=940; stone78→land(42,6) then @83695;
  maxx78/minx1 kelp959 @82419; coords-only FlipX @80989.
- **D-0928 #1087:** Y+1 falsified (tty/map); land X-only; @88377.
- **D-0928 #1086:** C ysize=20; ystart=2+shrink falsified; mx=3,my=1.
- **D-0928 #1080–82:** place RNG OK; flp=2 sum81; medusa epilogue.
- **D-0927…D-0921:** F-prefix / blnd / breamm / invent / wakeup /
  minetn-4 (see DIVERGENCE-INDEX).
