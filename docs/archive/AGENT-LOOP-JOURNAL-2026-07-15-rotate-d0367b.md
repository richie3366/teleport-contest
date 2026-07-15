# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 07:32 — D-0367 save_track/rest_track (seed0012 @6952)
- Objective: seed0012 @6952 C rn2(12) vs JS rn2(1) (wrong dog_goal gg).
- C locus: track.c save_track/rest_track; dogmove.c dog_goal gettrack.
- Change: in-memory save_track/rest_track on goto_level stash (D-0367).
  Was wipe-only initrack → gettrack null → wantdoor gg=(62,16).
- Verification: prefix 6952→7288; RNG 7202→7495; green+strict; cohort 24/24.
- Next: seed0012 @7288 C dog_move rn2(1) vs JS obj_resists.
