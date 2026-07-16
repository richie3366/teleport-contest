# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0007 / D-0485:** @2832 C `rn2(1) @ dog_move:1255` vs JS
  `distfleeck`. JS state: pet (38,17), goal (36,17), appr=1, whappr=1,
  mconf=0, kickedloc cleared, 8 ROOM mfndpos cands. Selection: (37,16)
  then (37,17) both `j<0` — never `j==0`/`rn2(1)`. C needs `j==0` ⇒
  omit/silent-skip (37,17) so after (37,16) nidist=2, (37,18) same-dist
  hits `rn2(1)`. Falsified: pool terrain (typs ROOM); JS mconf; couldsee
  false. Next: why C skips (37,17) — silent ALLOW_M balk / mfndpos
  omission / other silent continue; compare mon occupancy.
  ```bash
  node scripts/rng-diff.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
- **Leaderboard gap:** local **28/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch next cron for seed0013 restore.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index gates.
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
- seed0007 @2832: not “whappr blocks all RNG” alone — JS never reaches
  `j==0`; poolok omission not the (37,17) skip (typ ROOM).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #535 score: **28/44**, Scr 5014, RNG 289809 (36.55%), `24+0.13/turn`.
