# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#988 / D-0851:** removed extra `goto_level` `vision_recalc(0)` after
  `docrt` (C only recalcs inside `docrt`). Scr still **194**; not @195 cause
  (extra pass burned 0 display-rng in measure).
- **@195 Hallu map hypothesis:** between levtport menu @194 and materialize
  `docrt`, `select_menu_pick_one` → `docrt()` burns **~45** display-rng on
  the **old** Dlvl:12 map (`20×383` vision + `20×383` see_mon + `4×463` obj
  + `1×5` warn). C `erase_menu_or_text` also `docrt()` — count may still
  differ (which mons/objs newsym). Then new-level `docrt` +4, once-per-input
  Hallu see +3 → @195. Core RNG FULL; glyphs `@`/color + `*` vs `[`.
- **Falsifier:** instrument C `~drn2` (patch 005) across menu dismiss→
  materialize, or count JS burns per caller on dismiss vs visible set.
- Do not skip menu-pick `docrt` globally (Scr 194→192; other menus).
- Flush still parked @141–174 (D-0841).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0851 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; seed0360 **PASS**; D-0743…D-0850 peels done.
- EOT fmon `156,165,108` mcalcmove signature matches (#951).
- **#953–#970:** spawn/mcalcmove/Confusion/fog/wizintrinsic/abuse_dog/
  getmattk / Monnam / unstuck / initedog malign — closed; see journal.
- **#969:** @13689 was pet `malign` (+3 vs −9), not peace_minded.
- D-0770 flyers / poisoncloud; WAITMASK mid-pass (#952); Wizard ldrnum.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).
- gulpmu flush alone → display-RNG (D-0841/43; don't retry until objs).
- `steps[i].key = moves[i-1]` (not key-at-More).
- HI_METAL≡CLR_CYAN (6) not gray — extractor was wrong (D-0843).
- Gas region (68,3) not @173; Warning Hallu burn is correct.
- **#977:** dochug NOTHING/DONE Hallu newsym → Scr−2; rloc_to needed w/ flush.
- Expelled More @171 still **stomach** (pline before `expels`).
- **#979–#984:** +N / underfoot / NUM_OBJECTS-as-dim-hack / skip kelp /
  post-expel-as-@172 / flush-as-glyph / docrt cls / region-over-Hallu —
  falsified; real cause was missing SCR_MAIL (D-0848).
- Extra post-`docrt` `vision_recalc(0)` was not @195 cause (0 burns).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#985 Scr **8986**/11405 RNG **666582**/792838;
  seed0383 RNG **FULL**; Scr **194**/219 after D-0850/51.
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
