# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#994 D-0852:** C ice-gulp DISP: Monnam `~drn2(430)+~(2)` then
  **8×~drn2(5)** then `rnd` uswldtim then swallowed. JS burn-only×8
  (skip `u_at` engulfer) → core FULL but Scr **196→174**, breaks @195.
  Do not add gulp warns alone. Baseline @195 matches without them.
- **Hypothesis:** JS has other display-rng advances that net-align @195
  despite warn 38 vs C 45; OR need `display_nhwindow` More + warns
  together. Falsifier: JS vs C `~drn2` inventory gulp→@195 (all dims).
- Flush still parked @141–174 (D-0841).

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0851 done.
- gulpmu flush alone → display-RNG (D-0841/43; don't retry until objs).
- **#977:** dochug NOTHING/DONE Hallu newsym → Scr−2.
- **#979–#984:** +N / underfoot / dim-hack / kelp / flush-as-glyph —
  falsified; cause was SCR_MAIL (D-0848).
- Extra post-`docrt` `vision_recalc(0)` not @195 cause (0 burns).
- Skip menu-dismiss `docrt` not @195 cause (Scr−2).
- **#991:** HWarning missing is NOT the warn-burn gap (HW set).
- **#992:** global ctrl=2 loop → Scr 174; non-Hallu vision_off regress.
- **#993:** gulpmu Hallu vision_off → Scr 174; burn-only → core 11527 —
  do not retry.
- **#994:** gulpmu warn-only×8 (skip u_at) → Scr 174 / @195 break —
  do not retry alone.
- HI_METAL≡CLR_CYAN (6); Warning Hallu burn correct; EOT fmon ok.
- seed5002/0360 **PASS**; D-0743…D-0850 peels done.
- Runner `Screen N/M` = total matches, not prefix length.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#995 Scr **8998**/11405 RNG **666643**/792838;
  seed0383 RNG **FULL**; Scr **196**/219 after D-0852 Hallu vision_off.
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
- **D-0852:** Hallu vision_off at docrt+goto leave only; gulpmu
  vision_off + warn-only×8 falsified (#993/#994 Scr174).
