# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0007 / D-0501 (next):** after D-0500 botl hu_stat, Scr
  **116**/302; first miss @116 — `#loot` take-out menu: C
  `Take out what?` + Coins/`$ - 118 gold pieces` vs JS (category /
  class heading / gold line). RNG still full. Falsifier:
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
- **Leaderboard gap:** local **28/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch next cron for seed0013 restore.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel; batch doset toggle plines (D-0499).
- **Parked:** D-0006; seed2200 @158 RC path.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0500
  done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).
- Charged-ring `oc_uses_known` must zero `known` in `mksobj` (D-0482).
- Empty-quiver `f` must not More-eat invent letter (D-0484).
- seed0007 @2832 was dofire ready-More + getdir capitals (D-0485).
- C/JS upstairs spawn both `(38,18)` for seed0007.
- seed0007 @3219 locked-door autounlock/`picklock` (D-0487).
- seed0007 @6414 `mO`→`doset` pickup_types (D-0488).
- seed0007 @7066 `#loot` locked chest `pick_lock` (D-0489).
- D-0490…D-0497 RNG path done; D-0498/99 doset; D-0500 hu_stat.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #555 score: **28/44**, Scr 5054, RNG 303218 (38.24%), `26+0.14/turn`.
- Capital `H` = multi-step run; `set_move_cmd` must clear travel.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- D-0487: default `flags.autounlock=AUTOUNLOCK_APPLY_KEY`.
- D-0498: doset `%-23s [val]` + On defaults; Scr 60→84.
- D-0499: doset one `pline` per bool; Scr 84→85; @38 fixed.
- D-0500: botl `hu_stat` before enc_stat; Scr 85→116; @85 fixed.
- Water moccasin is `hides_under` (M1_CONCEAL) — postmov hide roll.
- Rogue `petnum` NON_PM → `rn2(2)` kitten/dog (NH 5.0); seed0007 kitten.
