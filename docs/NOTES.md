# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0007 / D-0485:** @2832 C `rn2(1) @ dog_move:1255` vs JS
  `distfleeck`. Omitted cell **`(37,17) === u.ux0,u.uy0`** (hero just
  left via `H`). JS: kitten `(38,17)`, hero `(36,17)`, `mux=hero`,
  `cnt=8` ROOM, selects `(37,16)` then `(37,17)` via `j<0` — never
  `j==0`. Force-skip / ux0-skip → prefix **2832→2838**.
  **mfndpos proof:** with `mux=ux0` temporarily, `cnt=7` and `(37,17)`
  dropped via C `ALLOW_U` gate (`nx==mux && !ALLOW_U`). JS
  `set_apparxy` already sets pet `mux=u.ux` before `dog_move`, so JS
  never hits that gate. Next: why C would still see `mux==ux0` at
  `mfndpos` (or another silent omit) — not a coord/ux0 production hack.
  ```bash
  node scripts/rng-diff.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
- **Leaderboard gap:** local **28/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch next cron for seed0013 restore.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 gates for (37,17).
- **Parked:** D-0006; seed2200 @158 RC path.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 gates in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0484
  done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).
- Charged-ring `oc_uses_known` must zero `known` in `mksobj` (D-0482).
- Empty-quiver `f` must not More-eat invent letter (D-0484).
- seed0007 @2832: not pool/mconf/kicked/mon balk; force-skip /
  mux==ux0 both reproduce C omit; JS mux already hero after
  set_apparxy — do not re-DIAG those falsifiers.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #535 score: **28/44**, Scr 5014, RNG 289809 (36.55%), `24+0.13/turn`.
- seed0007 mismatch on `H` step (rng in step 48); next key `Y`.
- `mfndpos` ALLOW_U: `u_at || (nx,ny)==(mux,muy)` without ALLOW_U → omit.
