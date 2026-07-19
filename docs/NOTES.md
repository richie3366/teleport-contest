# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#911 D-0794:** @112243 is **leftover apprentice**, not Neferet CLOSE.
- Step 732 `.`: after bats, JS Neferet CLOSE skip → EOT `mcalcmove`.
  C next is peaceful `distfleeck`/`m_move` `rn2(10)`.
- **Falsified:** FORCE Neferet CLOSE+mux=hero matching was signature
  coincidence (any peaceful fleeck). Suppress Neferet + boost first
  apprentice (`mov=12`, mux already @hero) → mismatch **112247**,
  RNG matched **112279**.
- Step 706 `l`: both sides 7× peace `rn2(10)` + 1× castmu; JS still
  **8** apprentice dochugs → all `mov=0` @112194; C keeps one with
  `mov≥12`. Neferet mmove=15 (can be 24); apprentices mmove=12.
- Session `#chat` → SELF (never cleared CLOSE). Hero Displaced.
- **Next:** which apprentice idles on C in step 706 / why JS spends
  that mon; not FORCE CLOSE or mov.
- **Don’t:** FORCE clear CLOSE; boost movement; leave DIAG.

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
  **apprentice leftover** (D-0794). `special_obj_hits_leader` deferred.
