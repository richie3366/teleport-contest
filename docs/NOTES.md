# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#916 D-0796:** seed0360 @112243 was missing `castmu` `HASTE_SELF`
  (not a bare PRE skip). Peaceful apprentice MFAST → EOT `mcalcmove`
  mmove=16 adj=4 → `+=24` → pass1 leftover → pass2 fleeck. Prefix
  **112279**; focused RNG **112326**.
- **Hypothesis next:** @112279 C `distfleeck` `rn2(5)` vs JS `rn2(3)`
  right after matched EOT62 once-per-turn arm — next mon path /
  remaining deferred `mcast_spell` / fleeck site.
- **Falsify:** `rng-diff` + C locus for the mon that fleecks first after
  EOT62; don’t FORCE CLOSE/mov.
- **Don’t:** FORCE CLOSE/mov; leave DIAG; re-clear CLOSE ≤112000.

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
- C pass1 moves=62 fleecks all 8 apprentices (not a mid-pass skip).
- D-0794 “PRE skip” falsified — root was deferred HASTE_SELF (D-0796).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** / **seed0108** / **seed5002** **PASS** (suite **37/44**
  @#915 Scr **8397** RNG **643814**/81.20%; seed0360 **112326**/391).
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
  **HASTE_SELF** (D-0796 closes D-0794); **movemon early exits** (D-0795).
  `special_obj_hits_leader` deferred; other `mcast_spell` deferred.
