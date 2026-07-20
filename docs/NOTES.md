# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#979:** With gulpmu flush: firstMiss **@172** (0-based; NOTES “@173”
  was 1-based), Scr **175**, RNG cascades. Exactly **4** Hallu obj cells:
  slime mold (22,3) / tinning kit (25,3) / shock shield (33,6) / towel
  (58,16). Frames 160–171 match.
- **Paradox (D-0847):** at moves=11 post-expel, `see_monsters` burns
  22×NUMMONS + 1×WARN (no underfoot objs); map mons match C. Then
  `see_objects` burns exactly 4×462 in fobj order — glyphs still all
  wrong. Dummy +N×462 before those burns never hits C’s `)+[[`.
- **Falsified:** simple stream offset before see_objects; mon-underfoot
  at that frame; fobj cansee set ≠ those 4; NUM_OBJECTS/FIRST_OBJECT
  mismatch (ARROW=18 CORPSE=265 STATUE=475 ≡ C).
- **Next:** display-RNG between expelled-More → expels/unstuck/docrt/
  mnexto and once-per-input see_* (double see_monsters?); or
  `Sting_effects`/`Warn_of_mon` after mon loop (named omit — pline path
  unlikely display-RNG). Don’t flush until objs fixed.
- **Falsifier:** instrument display burns from More-return through
  see_objects; compare count/moduli to C path.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0846 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; seed0360 **PASS**; D-0743…D-0846 peels done.
- EOT fmon `156,165,108` mcalcmove signature matches (#951).
- **#953–#970:** spawn/mcalcmove/Confusion/fog/wizintrinsic/abuse_dog/
  getmattk / Monnam / unstuck / initedog malign — closed; see journal.
- **#969:** @13689 was pet `malign` (+3 vs −9), not peace_minded
  formula / early return.
- D-0770 flyers / poisoncloud; WAITMASK mid-pass (#952); Wizard ldrnum.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).
- gulpmu flush alone → display-RNG (D-0841/43; don't retry until objs).
- `steps[i].key = moves[i-1]` (not key-at-More).
- HI_METAL≡CLR_CYAN (6) not gray — extractor was wrong (D-0843).
- Gas region at (68,3) not in post-expel FOV — not @173 cause.
- Skipping Warning Hallu burn worsens @173 — warn burn is correct.
- **#977:** dochug NOTHING/DONE Hallu newsym → Scr−2; rloc_to without
  flush → Scr−2 (re-evaluated: needed with flush for mons).
- Expelled More @171 is still **stomach** (pline before `expels`).
- **#979:** +N dummy before see_objects @moves=11 does not recover C
  obj glyphs; underfoot@see_mon empty that frame.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#980 Scr **8976**/11405 RNG **666600**/792838;
  seed0383 RNG **FULL**; Scr **174**/219 w/o flush; **175** w/ flush.
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
- Fog vapor: `reg.monsters` + `inside_gas_cloud` ttl+5 (D-0834).
- `#wizintrinsic` → `make_hallucinated` (D-0835); hallu exerper WIS.
- unstuck swallow → `docrt`; docrt memory = remembered glyphs (D-0838).
- `initedog` must `set_malign` after tame (D-0839).
- `mpickstuff` must `distant_name` (D-0840); hitmsg consecutive again.
- DEC swallow: `/o\ x@x \s/` keep SO-form o/s (D-0842/43); Primary `/-\ |@| \-/`.
- Hallu statue: display = mon+gender; memory = separate random_obj (D-0844).
- `see_traps` only if shown glyph is trap (D-0845); `rloc_to` newsym (D-0846).
