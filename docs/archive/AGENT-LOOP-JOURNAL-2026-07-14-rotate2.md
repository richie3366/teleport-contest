# Agent loop journal archive (rotated 2026-07-14)

## 2026-07-14 17:45 — D-0282 topl wrap + redotoplin more

- Objective: seed0030 Scr 85/1953 (CURRENT primary); first miss @24.
- C locus: `engrave.c` `read_engr_at` BUFSZ maxelen; `topl.c`
  `update_topl` / `redotoplin`.
- Change: maxelen via BUFSZ+sizeof; `pline` inserts wrap `\n` and
  calls `more()` when multi-line (space no longer becomes a command).
- Verification: Scr@23–25 match; prefix miss **24→46**; Scr 85→87;
  RNG full; green+strict PASS; 19-session PASS cohort + strict.
- Next: Scr@46 wall color / botl HP after descend; or seed0013.

## 2026-07-14 17:39 — D-0281 `#quit` done2

- Objective: seed0030 seg8 trailing JS after C end (CURRENT primary).
- C locus: `end.c` `done2` / extcmdlist `quit` GENERALCMD.
- Change: DIAG — `#quit` AC-only → unknown; `y` vi-moved. Ported
  `done2` + EXT_CMDS `quit` (ParanoidQuit getlin / goodbye deferred).
- Verification: seg8 **FULL** 3476; positional **105529**/105529 Scr
  85/1953; green+strict PASS; 19-session PASS cohort + strict.
- Next: seed0030 Scr 85/1953 (RNG full); or seed0013 Scr 57/59.

## 2026-07-14 17:34 — D-0280 dodrink ECMD_TIME

- Objective: seed0030 seg5 trailing JS after C end (CURRENT primary).
- C locus: `potion.c` `dodrink` → `ECMD_CANCEL`; cmd only on `ECMD_TIME`.
- Change: DIAG — quaff cancel left `move=1` because `ECMD_CANCEL` is
  truthy. `rhack` `q` now uses `(drinkRes & ECMD_TIME)`.
- Verification: seg5 **FULL** 8397; segs 0–7 FULL; positional
  **88957**/105529; green+strict PASS; 19-session PASS cohort + strict.
- Next: seg8 trailing after `#quit` (3505 vs 3476); or seg9 @16582.

## 2026-07-14 17:29 — D-0279 no_bones_level

- Objective: seed0030 seg4 trailing `rn2(1)` after knockback (CURRENT primary).
- C locus: `bones.c` `no_bones_level` / `can_make_bones`; `getbones` gate.
- Change: DIAG showed `can_make_bones` depth rn2 on Mines-stair Dlvl2;
  C skips via `Is_branchlev && dlevel>1`. Ported `no_bones_level` +
  portal scan; wired into `can_make_bones` and `getbones`.
- Verification: seg4 **FULL** 8031; positional **55489**/105529; green+
  strict PASS; 17-session PASS cohort + strict lengths.
- Next: seg5 trailing JS after C end; or seg9 @16582 getbones open.

## 2026-07-14 17:22 — D-0278 dochug disturb

- Objective: seed0030 seg9 @16836 (CURRENT primary D-0277 follow-on).
- C locus: `monmove.c` `disturb` / `dochug` `msleeping && !disturb`.
- Change: JS early-returned on `msleeping`; ported `disturb` (couldsee /
  mdistu / Stealth / ettin / nymph|jabber|lep / Aggravate|dog|human /
  `rn2(7)`+mimic) and wired into `dochug`. `wake_msg` deferred.
- Verification: seg9 **16836→17104**/17104; green+strict PASS; 17-session
  PASS cohort + strict lengths; seed0030 **48194**/105529 Scr 85/1953.
- Next: seg4 trailing JS `rn2(1)` after C `mhitm_knockback` `rn2(6)`.

