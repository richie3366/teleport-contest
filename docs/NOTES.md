# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0014 Scr 623/714** — RNG FULL; D-0879 fixed @212 compare-items.
  Next: screen@383 cells match; C cursor `[1,1,1]` vs JS `[80,0,1]` on
  `Dip a … into the fountain? [yn] (n)`. Falsifier: focused seed0014.
- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0879 done.
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
- Do not omit dipfountain case 28 bath/`somegold`/`exercise` (D-0877).
- Do not use PAPER=1/GLASS=11/WOOD=13 in shatter — objclass.h 5/19/8 (D-0878).
- Do not skip invent merge known/bknown/rknown compare pline (D-0879).
- gulpmu flush+vision_off pair required (#996); alone falsified.

## Landmarks (≤15)

- suite **40/44** @#1030 Scr **9480**/11405 RNG **676373**/792838
  (85.31%); next cadence @#1035.
- **D-0879 #1032:** addinv merged compare-learn; Scr **621→623**.
- **D-0878 #1031:** chest_shatter Blind+PAPER mats; Scr **620→621**.
- **D-0877 #1029:** dipfountain bath+somegold; seed0014 RNG **FULL**.
- **D-0876 #1028:** watch_on_duty + has_town/in_town; **58462→59074**.
- **D-0875 #1027:** minetn-3 Alley Town; seed0014 **52043→58462**.
- STAIRS yellow via `known_branch_stairs`; cursor=(ux−1, uy+1).
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Quest seed0367 **PASS**; seed0014 next @383 yn cursor.
- `#wizintrinsic` → `make_hallucinated` (D-0835).
- **D-0848:** `-DMAIL_STRUCTURES`; NUM_OBJECTS=481; SCR_MAIL=364.
- **D-0858:** doattributes Hallu+Antimagic; seed0383 PASS.
- Fog vapor: `reg.monsters` + `inside_gas_cloud` ttl+5 (D-0834).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
