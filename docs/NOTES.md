# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#927 D-0805:** Rogue arrival — seed0360 Scr **633**/833;
  prefix **301→318**.
- **Hypothesis next:** @318 materialize+hot (Dlvl:33) — sole cell
  C `·` vs JS `#` at map (3,18). Same topline/botl/cursor.
- **Falsify:** terrain/memory at that cell after `goto_level` /
  `docrt` / dark_room / corr waslit on hot dest.
- **Don’t:** FORCE CLOSE/mov/umov; leave DIAG; invent screen queues;
  RogueIBM full showsyms unless C-cited for this cell.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0805 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; D-0743…D-0805 peels done.
- D-0770 flyers / poisoncloud; WAITMASK; Wizard ldrnum; makemon mux=0.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).
- HASTE_SELF (D-0796); ok_to_quest (D-0798); can_fog (D-0799).
- Wiz-loca/fila/filb (D-0800); Valley/smoke/Geh (D-0801).
- lit grow minetn/minend (D-0802); Sokoban squeeze after obstruct (D-0803).
- @249 `%` vs `/` — flip fobj rebuild inverted piles (D-0804).
- @301 More/`*:0`/`.` — Rogue pline + assign_graphics (D-0805).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **37/44** @#925; seed0360 Scr **633** @318 (D-0805).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest seed0367 **PASS**; seed0014 @50259 mfndpos (D-0708 open).
- S_KOP / medusa-2/4 / eel / Wiz-goal / hellfill deferred.
- Mumak **lacks** M2_ROCKTHROW; linedup handling=2.
- Wiz-strt FlipY (D-0782); mux-image (D-0790); ok_to_quest (D-0798);
  can_fog (D-0799); Wiz-loca (D-0800); Valley/smoke (D-0801);
  lit grow (D-0802); squeeze (D-0803); flip objects (D-0804);
  Rogue graphics (D-0805).
