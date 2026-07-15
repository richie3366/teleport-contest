# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 01:56 — #367 D-0345 hitum twoweapon second swing

- Objective: seed0107 @40 miss-only vs C miss+kill (CURRENT primary).
- C locus: `uhitm.c` `hitum` `gt.twohits` / `known_hitum(uswapwep)`;
  `double_punch` / `mon_maybe_unparalyze`.
- Change: port second swing path; Cleaver cleave + hmon twohits dbon deferred.
- Verification: Scr **42→96**/98; RNG **full 2902**; green+strict;
  cohort 20 PASS. First miss `@85` sit-on-corpse.
- Next: `sit.c` `dosit` CORPSE `the(xname)` + comfort pline.

## 2026-07-15 01:51 — #366 D-0344 `#twoweapon` / dotwoweapon

- Objective: seed0107 `@15` unknown `#twoweapon`.
- C locus: `wield.c` `dotwoweapon`/`can_twoweapon`; `cmd.c` flags 0.
- Change: EXT_CMDS body + helpers; not EXT_CMD_AC (unique `#tw` expand).
- Verification: Scr **36→42**/98 RNG **2684→2846**; green+strict;
  cohort 20 PASS. @40 next: `hitum` twohits kill after miss.
- Next: `uhitm.c` `hitum` secondary `uswapwep` swing.
