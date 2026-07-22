# Rotated journal crumbs (#1249)

## 2026-07-22 00:26 — #1233 D-0963 desecrate_altar / god_zaps

- Objective: map-driven — retire dig `desecrate_altar`/`god_zaps_you`
  under fortress.
- C locus: `pray.c` `desecrate_altar`/`god_zaps_you`/`fry_by_god`;
  `do_wear.c` `disintegrate_arm`; `minion.c` `lminion`/`summon_minion`;
  caller `dig.c` `digactualhole`.
- Change: port wrath cluster + armor strip + minion summon; wire
  hero/obj altar dig after furniture-fall msg (D-0963). Deferred:
  angrygods cases 4–8; music.c desecrate; shieldeff/SetVoice;
  ureflects non-shield; selftouch/cancel_don.
- Verification: green+strict PASS; dig/pray cohort 16/16 PASS
  (incl. seed0017 altar-pray). Suite fortress held (no full cadence;
  next @#1235).
- Next: revive container/buried; ice melt / burn_floor_objects /
  fireball; Ring_off polish. Cadence @#1235.
