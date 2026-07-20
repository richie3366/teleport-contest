# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#960 score:** suite **38/44** Scr **8937**/11405 RNG **660490**/792838
  (83.31%); Δ vs #955 Scr **−1** RNG **+59** (= D-0832 seed0383).
- **Next @10608:** after matched wipe_engr `rn2(82)` (DEX→82), C
  `overexertion`→`gethungry` `rn2(20)=12` then `exercise`/`hitum`; JS
  `rn2(5)=2`. Hypothesis: JS Confusion `u_maybe_impaired` (or non-attack
  path) while C melee-attacks; not a metabolic `gethungry` bug.
- **Falsify:** at n=10608 dump JS Confusion/Stunned + whether `do_attack`
  / `domove` runs; expect C-matching attack → prefix past 10608, or name
  why Confusion/action differs.
- **Don't:** FORCE skip; leave DIAG; re-break D-0822…D-0832.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0832 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; seed0360 **PASS**; D-0743…D-0832 peels done.
- EOT fmon `156,165,108` mcalcmove signature matches (#951).
- **#953:** spawn order / unshift timestamps 165 vs 108 — not @10374.
- **#954:** post-swallow mcalcmove +12 / MSLOW / minliquid ROOM — not cause.
- **#956:** JS mcanmove/sleep/WAITMASK/I_SPECIAL clear at EE act — not cause;
  closed by D-0832 (missing equip path).
- D-0770 flyers / poisoncloud; WAITMASK mid-pass (#952); Wizard ldrnum.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).
- HASTE_SELF (D-0796); ok_to_quest (D-0798); can_fog (D-0799).
- Wiz-loca…Valley/smoke; lit grow; squeeze; flip objects (D-0800…04).
- Rogue graphics; mazewalk ROOM; lava lit; Wiz firsttime (D-0805…08).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#960 Scr **8937**/11405 RNG **660490**/792838;
  seed0383 prefix **10608** Scr **141**/219 RNG 10821 (D-0832).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest seed0367 **PASS**; seed0014 @50259 mfndpos (D-0708 open).
- S_KOP / medusa-2/4 / eel / Wiz-goal / hellfill deferred.
- Mumak **lacks** M2_ROCKTHROW; linedup handling=2.
- Traps live on `level.traps[]` (maketrap); `ftrap` often empty.
- `^F` wiz_map + do_mapping; show_map_spot must `map_trap` not newsym.
- ok_to_quest (D-0798); blocked staircase lookat rewrite (D-0814).
- TRAVP_VALID BFS hero→dest (D-0813); getpos DOOR + visctrl (D-0815).
- tele_restrict More mid-movemon; wildmiss triggers prior More (D-0816).
- `js/worn.js`: mon `m_dowear`/`check_gear`/`I_SPECIAL` (D-0832).
