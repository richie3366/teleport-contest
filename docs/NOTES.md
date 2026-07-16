# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0007 / D-0485:** @2832 C `rn2(1) @ dog_move:1255` vs JS
  `distfleeck`. JS: kitten (38,17), hero/goal (36,17), appr=1,
  whappr=1, couldsee, 8 ROOM cands. JS picks (37,16) then (37,17)
  via `j<0` — never `j==0`. **Force-skip `(37,17)` → prefix 2832→2838**
  (next `obj_resists`). C omits that cell. Falsified: JS pool typ;
  mconf; couldsee false; hero-still-on-(37,17) at dog_goal (would
  skip `rn2(4)`); JS mon at cell. Next: C mfndpos/dog_move silent
  omit gate — not a coordinate hack.
  ```bash
  node scripts/rng-diff.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
- **Leaderboard gap:** local **28/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch next cron for seed0013 restore.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord gates for (37,17).
- **Parked:** D-0006; seed2200 @158 RC path.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0484
  done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).
- Charged-ring `oc_uses_known` must zero `known` in `mksobj` (D-0482).
- Empty-quiver `f` must not More-eat invent letter (D-0484).
- seed0007 @2832: not “whappr blocks all RNG” alone — JS never
  reaches `j==0`; poolok not the skip (JS typ ROOM / DEC `~` =
  S_room); force-skip proves omit without needing mon/pool in JS.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #535 score: **28/44**, Scr 5014, RNG 289809 (36.55%), `24+0.13/turn`.
- seed0007 mismatch step is moves `Y` (run diagonal) after `>`/`H`.
