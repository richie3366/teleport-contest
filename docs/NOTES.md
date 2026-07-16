# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0007 / D-0493:** @15284 C `dog_move` rn2(12) vs JS rn2(4).
  **Falsified:** bare mfndpos/cnt / dog_move selection arity as first cause.
  **DIAG:** kitten `@ (22,16)` `u=(22,15)` nearby=1 mflee=0 mpeaceful=1
  wanderer=true → JS `dochug` want_move burns wanderer `rn2(4)`; C goes
  straight to `dog_move` rn2(12) (early `!nearby`/`mflee`/… short-circuit).
  Peaceful-before-wanderer reorder **breaks** @2837 (C still needs
  `dochug` rn2(4)). Force JS `!nearby` → next miss JS `obj_resists`
  (invent/goal) vs C selection. Falsifier:
  ```bash
  node scripts/rng-diff.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
- **Leaderboard gap:** local **28/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch next cron for seed0013 restore.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; ship lootabc display-only for one
  seed (accept both `a`/`o` input; display classic `o/i/b`).
- **Parked:** D-0006; seed2200 @158 RC path.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0492
  done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).
- Charged-ring `oc_uses_known` must zero `known` in `mksobj` (D-0482).
- Empty-quiver `f` must not More-eat invent letter (D-0484).
- seed0007 @2832 was **not** lookaround/dog_move/gettrack — it was
  dofire ready-More + getdir rejecting capital `H` (D-0485).
- C/JS upstairs spawn both `(38,18)` for seed0007.
- seed0007 @3219 was missing locked-door autounlock/`picklock`
  occupation (D-0487) — not a mid-run pet peel.
- seed0007 @6414 was **not** eatcorpse acid/sick — it was `mO` not
  reaching `doset`, empty `pickup_types` autopick-all corpse (D-0488).
- seed0007 @7066 was **not** a second door — it was `#loot` locked
  chest box `pick_lock` (D-0489).
- D-0490 was **not** invent TRIPE/CARROT order or cand geometry — it
  was missing `#loot` take-out gold (`$` before TRIPE in invent scan).
- D-0491 @7175 was **not** umovement/encumbrance extra movemon — it
  was unimplemented `SCR_DESTROY_ARMOR` (FOOBIE BLETCH → smoulders).
- D-0492 @13259 was **not** corpse_intrinsic — missing
  `eye_of_newt_buzz` after finishing newt corpse.
- query_category single-class skips menu (seed0012 bag gold-only).
- D-0493 @15284 was **not** dog_move cand cnt alone — JS wanderer
  `dochug` rn2(4) while C early-short-circuits want_move.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #550 score: **28/44**, Scr 5054, RNG 302184 (38.11%), `25+0.13/turn`
  (Δ vs #545: Scr 0, RNG +7454).
- Capital `H` = multi-step run inside one session key (`continue_run`).
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- D-0485: post-quiver `mark_topline_seen` + getdir MV_ANY capitals.
- D-0487: default `flags.autounlock=AUTOUNLOCK_APPLY_KEY`.
- D-0488: `mO` keeps `menu_requested` for `O`; `doset` sets
  `pickup_types=$"?!=/`.
- D-0489: `#loot` → `do_loot_cont` box `pick_lock` (chance 4*DEX+25).
- D-0490: MENU_FULL take-out + accept lootabc `a`; invent `$` gold.
- D-0491: `SCR_DESTROY_ARMOR` + `destroy_arm` + `erode_obj` burn.
- D-0492: `done_eating`→`cpostfx`→`eye_of_newt_buzz` (AT_MAGC||NEWT).
- Rogue `petnum` NON_PM → `rn2(2)` kitten/dog (NH 5.0); seed0007 kitten.
