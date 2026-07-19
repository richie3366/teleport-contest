# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#913 D-0794/D-0795:** @112243 after matched bat fleecks, C
  `distfleeck` (mux-at-hero apprentice) vs JS Neferet CLOSE spend→EOT.
- **JS state (DIAG, removed):** EOT 704 PRE all mov=0; POST Neferet
  mmove=15 → **+24** (last `rn2(12)=2<3`); 8 apprentices **+12**.
  Step 706 umov=12 → one movemon pass: apprentices 12→0; Neferet
  24→12; bats 24→12 leftover. Carries to 732 (no mon RNG 707–731).
- **Paradox resolved to entry budgets:** C after 706 must have
  **Neferet mov=0** and **one apprentice mov≥12** (same bat leftovers).
  Apprentice +24 needs **PRE leftover at EOT 704** (mmove=12 never
  alone yields 24). Neferet +12 needs her mcalcmove roll **≥3** (or
  different mmove/mspeed).
- **Falsify next:** C skip of one apprentice spend before EOT 704
  (silent: frozen/`mon_offmap`/`utotype` stop) while fleeck RNG still
  matches; and/or Neferet’s mcalcmove slot. D-0795 ports utotype/
  mon_offmap/isgd skips — did not move @112243.
- **Don’t:** FORCE CLOSE/mov; leave DIAG.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0793 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only.
- seed5002 **PASS**; D-0743…D-0790 peels done.
- D-0770: flyers ignore floor_trigger traps; mfndpos poisoncloud only.
- wake_nearby must skip G_UNIQ (D-0791); dothrow was `~0x07` not WAITMASK.
- Wizard had no `ldrnum` → no `leader_m_id` (D-0792).
- Clearing Neferet CLOSE at thr≤112000 regresses (#908).
- `makemon` mux≠spawn (D-0793); FlipY moves `mx/my` not `mux/muy` (C).
- FORCE Neferet CLOSE @112243 is coincidence (D-0794).
- Step 706 fleeck-identical ≠ identical mov budgets (silent CLOSE spends).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** / **seed0108** / **seed5002** **PASS** (suite **37/44**
  @#910 Scr **8397** RNG **643814**/81.20%; seed0360 **112272**/391).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest: seed0367 **PASS**. seed0014 @50259 mfndpos (D-0708 open).
- S_KOP / minetn / **medusa-2/4** / eel hideunder deferred;
  **Wiz-loca/goal**; hellfill deferred; `LVLINIT_ROGUE` deferred.
- Mumak **lacks** M2_ROCKTHROW; linedup uses handling=2.
- **wizard2** (D-0771); **Wiz-strt** FlipY (D-0776/D-0782);
  **m_move mux-image** (D-0790); **WAITMASK** (D-0791);
  **Wizard ldrnum** (D-0792); **makemon mux=0** (D-0793);
  **apprentice leftover** (D-0794); **movemon early exits** (D-0795).
  `special_obj_hits_leader` deferred.
