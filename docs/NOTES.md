# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 ^V24 medusa-3 land. **X-only.**
  C kelp `water_has_kelp` count **940** (=JS sum81 kelpW); C `>`(31,16)
  / `@(42,6)` need FlipX **sum80**. DIAG stone78 (clear preflip col78
  → extends maxx=78 sum80): land `(42,6)` dndest`[39..44]×[3..8]`
  dn`(31,16)` kelpW=940 place OK; then desync @**83695** (missing edge
  water). Need C-cited last=77 / col78 STONE at flip **without** losing
  that column’s water for later turns.
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/mux/@88377 coords — place first (D-0928).
- Do not treat place/`collect_coords` RNG mismatch as cause — they
  match; look at `dndest` bounds / post-place geometry (D-0928 #1080).
- Do not treat C land as (39,5) — arrival cursor **[42,7]** = map
  **(42,6)** (D-0928 #1081/#1087).
- Do not treat whole-map Y+1 as real — tty row = map y+1 (#1087).
- Do not FORCE FlipX minx=1 / maxx=78 alone — kelpW 940→959, place
  desync @82419 (#1083/#1087/#1088).
- Do not split FlipX (coords sum80 / terrain sum81) — upstairs place
  breaks @80989 (#1088).
- Do not permanently STONE-clear col78 — land OK then @83695 (#1088).
- Do not FORCE ystart=2 / ysize=19 — clamp or C rn2(20) (#1084/#1086).
- Do not silent-clear F-prefix then still run `#` (D-0927).
- Do not omit mhitm_ad_blnd / breamm AT_BREA / invent[] splice
  (D-0924…D-0926; see index).

## Landmarks (≤15)

- suite **42/44** @#1085 Scr **10398**/11405 RNG **773047**/792838
  (97.50%); next cadence @**#1090**.
- **D-0928 #1088:** C kelp=940; stone78→land(42,6) then @83695;
  maxx78/minx1 kelp959 @82419; coords-only FlipX @80989.
- **D-0928 #1087:** Y+1 falsified (tty/map); land X-only; @88377.
- **D-0928 #1086:** C ysize=20; ystart=2+shrink falsified; mx=3,my=1.
- **D-0928 #1083–84:** FORCE minx1 / ystart2 falsified.
- **D-0928 #1080–82:** place RNG OK; flp=2 sum81; medusa epilogue.
- **D-0927…D-0921:** F-prefix / blnd / breamm / invent / wakeup /
  minetn-4 (see DIVERGENCE-INDEX).
