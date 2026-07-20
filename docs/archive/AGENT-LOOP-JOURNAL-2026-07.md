## 2026-07-17 19:28 — #740 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score docs only).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: **34/44** PASS; Scr **7021**/11405 (+62 vs #735);
  RNG **465040**/792838 (58.66%, +0); speed `33+0.16/turn` (R² 0.80);
  green+strict PASS. seed0367 still RNG FULL Scr 267/324 @203.
- Next: seed0367 @203 level-teleport materialize map peel.


## 2026-07-20 15:10 — #1003 doattributes Hallu+Antimagic (D-0858)
- Objective: seed0383 Scr 217/219; first miss @213 Ctrl-X attrs.
- C locus: insight.c status_enlightenment Hallucination;
  attributes_enlightenment Antimagic before Fire.
- Diagnosis: Status missing hallucinating; Attributes missing
  magic-protected (GDSM); hungry already present → (1 of 2)≠(1 of 3).
- Change: invent.js status_core_lines + doattributes Antimagic/from_what.
- Verification: seed0383 **PASS** 219/219 RNG FULL strict; green+strict;
  cohort 38/38.
- Next: seed0399 @10157 (D-0731) or seed0014 @50259; score @#1005.
