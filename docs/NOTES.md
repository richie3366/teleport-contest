# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0007 / D-0496 (next):** @16339 C `rn2(5) @ distfleeck` vs JS
  `rnd(20)`. After D-0495 snakes, prefix 16339/16373; Scr still **60**/302.
  Falsifier:
  ```bash
  node scripts/rng-diff.mjs sessions/seed0007-rogue-snake-swamp.session.json
  ```
- **Leaderboard gap:** local **28/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch next cron for seed0013 restore.
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel.
- **Parked:** D-0006; seed2200 @158 RC path.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0495
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
- D-0490 `#loot` take-out gold (`$` before TRIPE).
- D-0491 `SCR_DESTROY_ARMOR` / `destroy_arm` / `erode_obj` burn.
- D-0492 `eye_of_newt_buzz` via `cpostfx` after newt corpse.
- D-0493 @15284 was stale `travel=1` after `_` (not dochug nearby).
- D-0494 `Amulet_on` RESTFUL_SLEEP `rnd(98)` → HSleepy TIMEOUT.
- D-0495 `dowatersnakes` `rn1(5,2)` drink case 22 / dip case 23.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #550 score: **28/44**, Scr 5054, RNG 302184 (38.11%), `25+0.13/turn`.
- Capital `H` = multi-step run; `set_move_cmd` must clear travel.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- D-0487: default `flags.autounlock=AUTOUNLOCK_APPLY_KEY`.
- D-0488: `mO` keeps `menu_requested` for `O`; `doset` sets
  `pickup_types=$"?!=/`.
- D-0489: `#loot` → `do_loot_cont` box `pick_lock` (chance 4*DEX+25).
- D-0490: MENU_FULL take-out + accept lootabc `a`; invent `$` gold.
- D-0491: `SCR_DESTROY_ARMOR` + `destroy_arm` + `erode_obj` burn.
- D-0492: `done_eating`→`cpostfx`→`eye_of_newt_buzz` (AT_MAGC||NEWT).
- Rogue `petnum` NON_PM → `rn2(2)` kitten/dog (NH 5.0); seed0007 kitten.
