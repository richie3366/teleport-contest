# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#919 D-0799:** `set_apparxy` `can_fog` for vampshifter Displacement.
  seed0360 prefix **112857→113103**; Scr **519**; RNG **113111**.
- **Falsified:** mux-at-hero early exit / fleeck order as @112857 root —
  C accepted locked-door image via `can_fog`; JS stub rejected.
- **Hypothesis next:** @113103 after matched `getbones` `rn2(3)` — C
  lua `nhlib.shuffle` vs JS `rn2(79)` (wrong post-bones path / level).
- **Falsify:** compare getbones return + which level loads next; C vs JS
  stack at 113103.
- **Don’t:** FORCE CLOSE/mov/umov; leave DIAG; re-clear CLOSE ≤112000.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0799 done.
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

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** / **seed0108** / **seed5002** **PASS** (suite **37/44**
  @#920 Scr **8525** RNG **644653**/81.31%; seed0360 **113111**/519).
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
  **HASTE_SELF** (D-0796); **acurr GoP** (D-0797);
  **quest Home ok_to_quest** (D-0798); **can_fog** (D-0799).
  `special_obj_hits_leader` deferred; other `mcast_spell` deferred;
  nymph CHA / Ogresmasher CON deferred; `stuff_prevents_passage` deferred.
