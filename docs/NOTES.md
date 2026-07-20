# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#981:** Post-expel Hallu objs (D-0847). Expel at **moves=12**, once-per-
  input see_* at **moves=13** (prior “moves=11” was wrong). With gulpmu
  flush: firstMiss **@172**, Scr **175**, ndiff **4** only (mons match).
- **Burn map (flush on):** docrt 47 (42×383 + 4×462 + 1×5); mnexto 1×383;
  gap→see_mon 2; see_mon 23 (22×383 + 1×5); see_obj **5** (1×5 + 4×462).
- **see_objects:** first burn is `rn2(5)` at kelp **(23,13)** — yellow
  light (PM 118), `!cansee`, `covers_objects` (typ pool), `mon_warning`
  → `display_warning`. Then 4 ROOM tops: slime/towel/shock/tinning.
  JS @172 chars `+?=\[` vs C `)+[[` (towel class OK, color wrong).
- **Falsified:** +N×462 before see_objects for N=0..40 never yields
  `)+[[`; skipping (23,13) newsym also fails (still wrong 4). So not a
  simple pre-see_objects stream offset.
- **Next:** why C’s see_objects Hallu burns differ despite matching mons —
  compare C vs JS which fobj tops take Hallu obj path (vision/TEMP_LIT
  from yellow-light emitter; extra 462s); or docrt’s 4×462 cell set.
  Don’t flush until objs fixed.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0846 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; seed0360 **PASS**; D-0743…D-0846 peels done.
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
- **#979–#981:** +N before see_objects / underfoot / NUM_OBJECTS dims /
  skip kelp(23,13) newsym — all falsified for `)+[[`.

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
- Fog vapor: `reg.monsters` + `inside_gas_cloud` ttl+5 (D-0834).
- `#wizintrinsic` → `make_hallucinated` (D-0835); unstuck→`docrt` (D-0838).
- `initedog`→`set_malign` (D-0839); `mpickstuff`→`distant_name` (D-0840).
- DEC swallow SO-form o/s (D-0842/43); Hallu statue memory burn (D-0844).
- `see_traps` glyph_is_trap (D-0845); `rloc_to` newsym (D-0846).
- Post-expel see_obj: kelp+YL warn burn before 4 ROOM Hallu objs.
