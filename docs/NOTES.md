# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0007 / D-0485:** @2832 C `rn2(1) @ dog_move` vs JS `distfleeck`.
  Force **gettrack** (even with JS `couldsee`) → goal=`ux0` `(37,17)` →
  prefix **2832→2846**. Force-skip cell alone → only **2838**. JS peel
  state: lit roomno 6, both in rooms[3], `couldsee(pet)=true`,
  `gettrack→(37,17)`, `mux=hero`, `utrap=0`. Role Rogue on **dlvl 1**
  (not `Is_rogue_level` / D-0486). Next: why C `!couldsee(pet)` (or
  other silent omit) — no coord/gettrack production hacks.
  ```bash
  node scripts/rng-diff.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
- **Leaderboard gap:** local **28/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch next cron for seed0013 restore.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 / forced-gettrack gates.
- **Parked:** D-0006; seed2200 @158 RC path.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0484
  done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).
- Charged-ring `oc_uses_known` must zero `known` in `mksobj` (D-0482).
- Empty-quiver `f` must not More-eat invent letter (D-0484).
- seed0007 @2832: not pool/mconf/kicked/mon balk; not stale mux after
  tame `set_apparxy`; not missing `rogue_vision` (dlvl1). mux=ux0 and
  force-gettrack both reproduce C’s first `rn2(1)` — prefer gettrack.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #535 score: **28/44**, Scr 5014, RNG 289809 (36.55%), `24+0.13/turn`.
- seed0007 mismatch on `H` step (rng in step 48); next key `Y`.
- `dog_goal` `!couldsee` → `gettrack` redirects `gg` (D-0099/D-0485).
- D-0486: `rogue_vision` on `Is_rogue_level` only.
