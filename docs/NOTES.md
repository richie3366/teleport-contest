# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Gameplay next:** seed0398 post-rust — RNG **2853**/3026, Scr 0.
  First miss @2852: C `weffects` `rn2(8)` vs JS `rn2(5)` (wand zap).
  Falsifier:
  ```bash
  node scripts/rng-diff.mjs sessions/seed0398-wizard-wandpoly-pile.session.json
  ```
- **Leaderboard gap:** local **29/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch next cron for seed0013 restore.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel; batch doset toggle plines (D-0499).
- **Parked:** D-0006; seed2200 @158 RC path.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0508
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
- D-0490…D-0507 RNG/botl/loot/AC/tin/erosion/enlightenment/wish done.
- D-0508: @2838 “rust vs distfleeck” was arity coincidence — selector
  omitted `RUST_TRAP` (JS fleeck matched C rust `rn2(5)`).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482; seed0007 **PASS** after D-0506.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #565 score: **29/44**, Scr 5296, RNG 303302 (38.26%), `25+0.13/turn`.
- Capital `H` = multi-step run; `set_move_cmd` must clear travel.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- D-0487: default `flags.autounlock=AUTOUNLOCK_APPLY_KEY`.
- D-0502: `find_ac` ARM_BONUS; Scr 126→291.
- D-0506: Sleepy + Poison_res + Stealth enlightenment → **PASS**.
- Water moccasin is `hides_under` (M1_CONCEAL) — postmov hide roll.
- Rogue start leather is `+1` → AC 7 unless eroded (ARM_BONUS).
