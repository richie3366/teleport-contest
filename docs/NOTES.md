# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#923 D-0802:** minetn-5/minend-2 `des.region(sel,"lit")` →
  `light_region` wall-expand. seed0360 Scr **589→616**/833;
  prefix **180→231**.
- **Hypothesis next:** @231 C `You cannot pass that way.` vs JS
  `You try to move the boulder, but in vain.` — sokoban/boulder
  push path (`still_chewing` / `dopush` / `moverock`), not FORCE.
- **Falsify:** C vs JS branch at boulder cell when key `u` after
  minend explore.
- **Don’t:** FORCE CLOSE/mov/umov; leave DIAG; invent screen queues.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0802 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only.
- seed5002 **PASS**; D-0743…D-0790 peels done.
- D-0770: flyers ignore floor_trigger traps; mfndpos poisoncloud only.
- wake_nearby must skip G_UNIQ (D-0791); dothrow was `~0x07` not WAITMASK.
- Wizard had no `ldrnum` → no `leader_m_id` (D-0792).
- Clearing Neferet CLOSE at thr≤112000 regresses (#908).
- `makemon` mux≠spawn (D-0793); FlipY moves `mx/my` not `mux/muy` (C).
- FORCE Neferet CLOSE @112243 is coincidence (D-0794).
- D-0794 “PRE skip” falsified — root was deferred HASTE_SELF (D-0796).
- @112279 fleeck/umov falsified — quest Home `ok_to_quest` (D-0798).
- @112857 fleeck vs set_apparxy — missing `can_fog` (D-0799).
- @113103 shuffle vs rn2(79) — missing Wiz-loca/fila/filb (D-0800).
- @164 missing `--More--` — missing Valley/smoke plines (D-0801).
- @180 blank walls — missing lit grow (D-0802), not map-mem FORCE.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** / **seed0108** / **seed5002** **PASS** (suite **37/44**
  @#920 Scr **8525** RNG **644653**/81.31%; seed0360 Scr **616** @#923).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest: seed0367 **PASS**. seed0014 @50259 mfndpos (D-0708 open).
- S_KOP / minetn / **medusa-2/4** / eel hideunder deferred;
  **Wiz-goal**; hellfill/fakewiz deferred; `LVLINIT_ROGUE` deferred.
- Mumak **lacks** M2_ROCKTHROW; linedup uses handling=2.
- **wizard2** (D-0771); **Wiz-strt** FlipY (D-0776/D-0782);
  **m_move mux-image** (D-0790); **WAITMASK** (D-0791);
  **Wizard ldrnum** (D-0792); **makemon mux=0** (D-0793);
  **HASTE_SELF** (D-0796); **acurr GoP** (D-0797);
  **quest Home ok_to_quest** (D-0798); **can_fog** (D-0799);
  **Wiz-loca/fila/filb** (D-0800); **Valley/smoke/Geh wall** (D-0801);
  **lit grow minetn/minend** (D-0802).
  `special_obj_hits_leader` deferred; other `mcast_spell` deferred;
  nymph CHA / Ogresmasher CON deferred; `stuff_prevents_passage` deferred.
