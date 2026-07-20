# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0014 @59074** (D-0876 watch_on_duty closed @58462). C
  `exercise` `rn2(2)` @attrib.c:509 after dipfountain vs JS `rn2(3)`.
  Falsifier: focused seed0014 + rng-diff @59074.
- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0876 done.
- Do not re-FORCE WEB/mfndpos omit for D-0731 (closed D-0861).
- Do not expect mon_track_clear alone @10157 (#1006: !mflee).
- Do not drop makesingular `as_is` / hold_another_object encumber_msg.
- Do not “always rn2” in `obj_resists` for Bell/Book/Amulet/Candelabrum.
- Do not read only `wall_info` for W_NONDIGGABLE — OR `flags` (D-0865).
- Do not stub WEB trapeffect — mon must set `mtrapped` (D-0866).
- Do not skip `tmiss` on thitmonst else (D-0867).
- Do not re-defer Lifesaved in `done` (D-0868).
- Do not stub mhitu `poisoned` as rn2(30)-only (D-0869).
- Do not drop adjattrib in_moveloop STR/CON encumber_msg (D-0870).
- Do not omit MUSE_POT_SPEED `mquaffmsg` / mon_adjust give_msg (D-0871).
- Do not drop unique `!nn && uses_known` → `known=0` (D-0872).
- Do not keep makemon rn2 gender after `des.monster()` (D-0873 overwrite).
- Do not omit LANDMINE in trapeffect_selector (D-0874).
- Do not omit minetn-3 load_special (D-0875).
- Do not omit `watch_on_duty` / `has_town` for Mine Town (D-0876).
- gulpmu flush+vision_off pair required (#996); alone falsified.

## Landmarks (≤15)

- suite **39/44** @#1020 Scr **9433**/11405 RNG **667614**/792838
  (84.21%); next full score @#1030 (missed #1025). Local: seed0399 PASS.
- **D-0876 #1028:** watch_on_duty + has_town/in_town; seed0014
  **58462→59074**.
- **D-0875 #1027:** minetn-3 Alley Town; seed0014 **52043→58462**.
- **D-0874 #1026:** landmine weight gate; seed0014 **50259→52043**.
- **D-0873 #1023:** create_monster female overwrite; seed0399 **PASS**.
- STAIRS yellow via `known_branch_stairs`; cursor=(ux−1, uy+1).
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Quest seed0367 **PASS**; seed0014 next @59074 exercise.
- `#wizintrinsic` → `make_hallucinated` (D-0835).
- **D-0848:** `-DMAIL_STRUCTURES`; NUM_OBJECTS=481; SCR_MAIL=364.
- **D-0858:** doattributes Hallu+Antimagic; seed0383 PASS.
- Fog vapor: `reg.monsters` + `inside_gas_cloud` ttl+5 (D-0834).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
