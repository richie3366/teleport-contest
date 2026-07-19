## 2026-07-19 18:05 — #894 D-0779/D-0781 quasit CLOUD skip fleeck
- Objective: seed0360 @101022 quasit 2nd fleeck vs bat `!rn2(3)`.
- C locus: `monmove.c` `dochug`/`postmov` `mon_offmap`; CLOUD step.
- Change: D-0781 `mon_offmap` in `dochug`/`postmov`. Falsified:
  df-only/`want_move` false (FORCE →101025 only). FORCE DIED-after-
  CLOUD → **101228**/Scr387 — C moves then skips 2nd fleeck; no
  trap/gas at dest; offmap setter still missing.
- Verification: green+strict PASS; cohort 6/6 PASS; peel still @101022.
- Next: C-state postmov after CLOUD (`m_in_out_region` omitted).

## 2026-07-19 17:45 — human pause: strategy reflection (post-#893)
- Objective: explain stuck feel; decide if peel strategy needs change.
- C locus: n/a (meta). See `archive/REFLECTION-2026-07-19-seed0360-peel.md`.
- Change or falsified theory: strategy **keep**; tactics adjust — after
  2 falsifications require C-state / site-shift checklist; PASS flat at
  37 is lagging (seed0360 still FAIL). Diagnose burn @98492 and @100738
  was real; loader peels #743–#881 were healthy. #893 open: C quasit
  df-only vs JS 2nd fleeck (not bat gate).
- Verification: docs only; human paused loop then cleared stop latch.
- Next: #894+ peel packet in reflection file (C quasit df-only).
