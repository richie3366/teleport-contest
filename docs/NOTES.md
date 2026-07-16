# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0007 / D-0487:** @3219 C `rn2(100) @ picklock` vs JS
  `rn2(5) @ distfleeck` (after D-0485 peel 2832→3219).
  ```bash
  node scripts/rng-diff.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
  Next: lock/`#force`/`a` occupation path after H/Y run.
- **Leaderboard gap:** local **28/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch next cron for seed0013 restore.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 / forced-gettrack / `!couldsee` hacks.
- **Parked:** D-0006; seed2200 @158 RC path.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0486
  done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).
- Charged-ring `oc_uses_known` must zero `known` in `mksobj` (D-0482).
- Empty-quiver `f` must not More-eat invent letter (D-0484).
- seed0007 @2832 was **not** lookaround/dog_move/gettrack — it was
  dofire ready-More + getdir rejecting capital `H` (D-0485).
- C/JS upstairs spawn both `(38,18)` for seed0007.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #540 score: **28/44**, Scr 5014, RNG 289809 (36.55%), `24+0.14/turn`
  (flat vs #535).
- Capital `H` = multi-step run inside one session key (`continue_run`).
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- D-0485: post-quiver `mark_topline_seen` + getdir MV_ANY capitals.
