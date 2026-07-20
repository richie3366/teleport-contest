# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#970:** public score cadence — suite **38/44**; Scr **8948**/11405
  (+2); RNG **666600**/792838 (84.08%, +5478 vs #965). Soaks
  D-0837…D-0839. No port patch.
- **Next:** seed0383 **screen** peel (RNG FULL 16915; Scr **146**/219;
  cursors 205/219). First cell/cursor miss after matched PRNG.
- **Hypothesis:** post-pet-kill / later Hallu map cells or status
  differ while core RNG stays locked.
- **Falsify:** first mismatched screen frame cells/cursor vs C
  capture; cite display/docrt/newsym path.
- **Don't:** FORCE peace/malign; re-break D-0838/D-0839.
- **Open:** trap hallu glyphs; `potionbreathe`; HALLUC expiry; AD_FIRE
  hero; peace_minded MS_LEADER/GUARDIAN/NEMESIS/ERINYS.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0839 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; seed0360 **PASS**; D-0743…D-0839 peels done.
- EOT fmon `156,165,108` mcalcmove signature matches (#951).
- **#953–#968:** spawn/mcalcmove/Confusion/fog/wizintrinsic/abuse_dog/
  getmattk / Monnam / unstuck docrt — closed; see journal.
- **#969:** @13689 was pet `malign` (+3 vs −9), not peace_minded
  formula / early return.
- D-0770 flyers / poisoncloud; WAITMASK mid-pass (#952); Wizard ldrnum.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#970 Scr **8948**/11405 RNG **666600**/792838;
  seed0383 RNG **FULL**; Scr **146**/219 (screen peel next).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest seed0367 **PASS**; seed0014 @50259 mfndpos (D-0708 open).
- S_KOP / medusa-2/4 / eel / Wiz-goal / hellfill deferred.
- Mumak **lacks** M2_ROCKTHROW; linedup handling=2.
- Traps live on `level.traps[]` (maketrap); `ftrap` often empty.
- `^F` wiz_map + do_mapping; show_map_spot must `map_trap` not newsym.
- ok_to_quest (D-0798); blocked staircase lookat rewrite (D-0814).
- TRAVP_VALID BFS hero→dest (D-0813); getpos DOOR + visctrl (D-0815).
- Fog vapor: `reg.monsters` + `inside_gas_cloud` ttl+5 (D-0834).
- `#wizintrinsic` → `make_hallucinated` (D-0835); hallu exerper WIS.
- unstuck swallow → `docrt`; docrt memory = remembered glyphs (D-0838).
- `initedog` must `set_malign` after tame (D-0839).
