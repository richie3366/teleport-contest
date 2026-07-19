# Rotated from AGENT-LOOP-JOURNAL.md (#843 / D-0747)

## 2026-07-19 — #821 use_stethoscope adjacent res TIME (D-0735)
- Objective: seed5002 seg1 @5668 dog_goal invent vs rn2(4).
- C locus: `apply.c` `use_stethoscope` adjacent return `res`.
- Change: adjacent was ECMD_OK stub; `anh` spent no turn; later
  mirror-absent `aph` leaked `h`→domove west → udist=2. Port isok/
  m_at/empty + return `res`. Named: full mstatusline, mirror/camera.
- Verification: green+strict PASS; cohort 6/6; seed5002 continuous
  **5668→5739** (positional 6172→6176).
- Next: seed5002 @5739 (mirror/camera getdir); or D-0731/D-0708.

