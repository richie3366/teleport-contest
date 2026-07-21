## 2026-07-21 00:53 — #1078 D-0927 rhack F-prefix reject
- Objective: seed4500 @87803 C `distfleeck` `rn2(5)` vs JS `rn2(20)`.
- C locus: `cmd.c` `rhack` / `do_fight` (PREFIXCMD + CMD_gGF_PREFIX).
- Change: F-prefix + non-movement must pline and **not** execute the
  next command (was silent-clear then still run `#` → key desync so
  `h` walked/attacked instead of wield letter). Root not distfleeck.
- Verification: prefix **87803→88377** RNG **88484** Scr **808**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800
  PASS (7/7).
- Next: @88377 C `linedup` `rn2(2)` vs JS `rn2(5)`; cadence @#1080.

## 2026-07-21 00:48 — #1077 D-0926 mhitm_ad_blnd mhitu
- Objective: seed4500 @87218 C `distfleeck` `rn2(5)` vs JS `rn2(8)`.
- C locus: `uhitm.c` `mhitm_ad_blnd` (youmonst); `mondata.c`
  `can_blnd` AT_CLAW; `potion.c` `make_blinded`.
- Change: port mhitu `mhitm_ad_blnd_u` + wire `AD_BLND`. Root: omitted
  raven claw blind → no `It` hitmsgs → extra `--More--` → key ahead
  → premature minotaur `collect_coords` (not a distfleeck bug).
- Verification: prefix **87218→87803** RNG **88082** Scr **794**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800
  PASS (7/7).
- Next: @87803 C `distfleeck` `rn2(5)` vs JS `rn2(20)`; cadence @#1080.

## 2026-07-21 00:37 — #1076 D-0925 breamm / AT_BREA
- Objective: seed4500 @86672 C `breamm` `rn2(3)` vs JS `rn2(5)`.
- C locus: `mthrowu.c` `breamm`/`breamu`; `mhitu.c` AT_BREA;
  `zap.c` `dobuzz`/`zap_over_floor` ZT_FIRE pool; `mondata.c`
  `get_atkdam_type`/`cvt_adtyp_to_mseenres`.
- Change: port `breamm`/`breamu` + wire AT_BREA; export `dobuzz` with
  fire-pool steam + poison-gas 1×1 trail; `zhitm` fire `burnarmor`.
  Root: skipped monster breath after distfleeck (omit since D-0900).
- Verification: prefix **86672→87218** RNG **87347** Scr **759**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1500/1800
  PASS. (Door-absorb pline kept for type≥0 — seed0002 screen).
- Next: @87218 C `distfleeck` `rn2(5)` vs JS `rn2(8)`; cadence @#1080.
