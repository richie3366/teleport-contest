# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#985 / D-0848:** C `NETHACK_RNGLOG_DISP=1` rerecord of seed0383 showed
  free-window @172 = **66×383 + 8×463 + 2×5** — same *counts* as JS
  inventory (#984) but JS used **462** (`NUM_OBJECTS−FIRST_OBJECT` w/o
  `SCR_MAIL`). Root: `extract-objects.py` lacked `-DMAIL_STRUCTURES`
  (monsters extractor already had it since D-0606). Fixed → `NUM_OBJECTS`
  480→481, Hallu `rn2(463)`. seed0383 Scr **174→184**; suite Scr **+10**.
- **Next:** first miss now **@184** (RNG still FULL). Capture screen
  diffs @184; flush still parked. Do not drop MAIL_STRUCTURES.
- seed0399 RNG **−18** after D-0848 (otyp shift after SCR_MAIL); still
  non-PASS @~10157.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0848 done.
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
- **#979–#984:** +N / underfoot / NUM_OBJECTS-as-dim-hack / skip kelp /
  post-expel-as-@172 / flush-as-glyph / docrt cls / region-over-Hallu —
  falsified; real cause was missing SCR_MAIL (D-0848).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#985 Scr **8986**/11405 RNG **666582**/792838;
  seed0383 RNG **FULL**; Scr **184**/219.
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
