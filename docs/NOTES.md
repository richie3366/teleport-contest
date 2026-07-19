# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#943 D-0820:** Wiz `locate_first` from quest.lua. seed0360
  Scr **830→832**/833; @780/@781 materialize More + wisps fixed.
- **Hypothesis next:** @828 ^X Attributes — C lists Displacement
  from cloak before Teleport_control; JS omits displaced line
  (and speed boots says "worn equipment" vs "your speed boots").
- **Falsify:** port enlightenment Displacement extrinsic
  (`u.uprops` / cloak otyp) + boots cause string; expect @828 match.
- **Don’t:** FORCE CLOSE/mov/umov; leave DIAG; invent screen
  queues; re-break D-0819/D-0820 getpos/locate.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0820 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; D-0743…D-0820 peels done.
- D-0770 flyers / poisoncloud; WAITMASK; Wizard ldrnum; makemon mux=0.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).
- HASTE_SELF (D-0796); ok_to_quest (D-0798); can_fog (D-0799).
- Wiz-loca…Valley/smoke; lit grow; squeeze; flip objects (D-0800…04).
- Rogue graphics; mazewalk ROOM; lava lit; Wiz firsttime (D-0805…08).
- travel path; setworn AC; CLOUD; darkroom; TRAVP stone (D-0809…13).
- wiz_map traps + show_map_spot map_trap (D-0814); door/visctrl (D-0815).
- tele_restrict pline + wildmiss displaced (D-0816).
- blank S_stone non-travel + TER_DETECT guard (D-0817).
- feature matching `_`/furniture/traps; `#` not feature (D-0818).
- getpos_help NHW_MENU + show_goal_msg (D-0819).
- Wiz locate_first/next qt_pager (D-0820).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **37/44** @#940 Scr **8834**/11405; seed0360 **832**/833 @828.
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
- tele_restrict More mid-movemon; wildmiss triggers prior More (D-0816).
