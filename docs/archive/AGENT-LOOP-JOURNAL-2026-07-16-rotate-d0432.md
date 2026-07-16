# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-16 01:45 — #463 SCR_REMOVE_CURSE (D-0432)
- Objective: seed0002 @6954 C `exercise` rn2(19) vs JS rn2(5) (PRIMARY).
- C locus: `read.c` `doread` nodisappear / `seffects` /
  `seffect_remove_curse`; `mkobj.c` `uncurse`; `do_name.c` `trycall`.
- Change: JS gated SCR_REMOVE_CURSE unimplemented; C cursed remove-curse
  read `v` exercises WIS, You_feel + disintegrates, then trycall
  (“helping you”). Ported seffect_remove_curse/uncurse + nodisappear +
  trycall wire.
- Verification: seed0002 prefix **6954→8609**; Scr **126→172**/595;
  RNG matched **8887**/27158; green+strict; cohort **24/24**.
- Next: seed0002 @8609 H-rush door bump `exercise` rn2(2) vs JS
  `doopen_indir` rnl(20).
