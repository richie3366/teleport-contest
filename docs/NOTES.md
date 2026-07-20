# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#997 D-0853:** `dochug` Hallu `newsym` on NOTHING/DONE/NOMOVES after
  2nd `distfleeck` → dim LCP **553→555**, first cell miss **198→199**,
  Scr still **201**, RNG FULL. Closed C call 17281 `~drn2(383)`.
- **Hypothesis:** next gap abs 555 — C fleeck `Monnam` `~drn2(430)` vs
  JS `mon_glyph(383)` (extra idle Hallu newsym or missing flee pline).
  Falsifier: caller at JS burn 555 + C line @17308 window.
- Do not retry gulpmu flush/warn/vision_off alone (D-0852).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0852 done.
- **#977/@172:** dochug NOTHING/DONE Hallu newsym Scr−2 — superseded by
  D-0853 at @198 window (no Scr regression after #996).
- **#979–#984:** +N / underfoot / dim-hack / kelp / flush-as-glyph —
  falsified; cause was SCR_MAIL (D-0848).
- Extra post-`docrt` `vision_recalc(0)` not @195 cause (0 burns).
- Skip menu-dismiss `docrt` not @195 cause (Scr−2).
- **#991:** HWarning missing is NOT the warn-burn gap (HW set).
- **#992:** global ctrl=2 loop → Scr 174; non-Hallu vision_off regress.
- **#993:** gulpmu Hallu vision_off alone → Scr 174 — do not retry.
- **#994:** gulpmu warn-only×8 alone → Scr 174 — do not retry.
- **#996:** flush+warns together is the C order; works Scr+5.
- HI_METAL≡CLR_CYAN (6); Warning Hallu burn correct; EOT fmon ok.
- seed5002/0360 **PASS**; D-0743…D-0850 peels done.
- Runner `Screen N/M` = total matches, not prefix length.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#995 Scr **8998**/11405 RNG **666643**/792838;
  seed0383 RNG **FULL**; Scr **201**/219; first cell miss **@199**.
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest seed0367 **PASS**; seed0014 @50259 mfndpos (D-0708 open).
- S_KOP / medusa-2/4 / eel / Wiz-goal / hellfill deferred.
- Mumak **lacks** M2_ROCKTHROW; linedup handling=2.
- Traps live on `level.traps[]` (maketrap); `ftrap` often empty.
- `^F` wiz_map + do_mapping; show_map_spot must `map_trap` not newsym.
- Fog vapor: `reg.monsters` + `inside_gas_cloud` ttl+5 (D-0834).
- `#wizintrinsic` → `make_hallucinated` (D-0835); unstuck→`docrt` (D-0838).
- `initedog`→`set_malign` (D-0839); `mpickstuff`→`distant_name` (D-0840).
- DEC swallow SO-form o/s (D-0842/43); Hallu statue memory burn (D-0844).
- `see_traps` glyph_is_trap (D-0845); `rloc_to` newsym (D-0846).
- **D-0848:** objects extract `-DMAIL_STRUCTURES` → NUM_OBJECTS=481 /
  Hallu random_object dim 463; SCR_MAIL=364.
- **D-0849:** `hliquid` / `hliquids[]` via display-rng; `hcolor` deferred.
- **D-0850:** `xkilled` tame → `x_monnam(..., "poor", ...)`.
- **D-0851:** `goto_level` no post-docrt `vision_recalc(0)`.
- **D-0852 #996:** gulpmu flush_topl_more + Hallu vision_off together.
- **D-0853 #997:** dochug Hallu newsym NOTHING/DONE/NOMOVES; LCP 555;
  next C Monnam fleeck vs JS mon @555.
