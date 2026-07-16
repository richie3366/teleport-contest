## 2026-07-16 00:26 — #454 seed0004 @297 autodescribe stairs (D-0423)
- Objective: seed0004 @297 PRIMARY — C `staircase down` vs JS blank
  after travel `_>` getpos.
- C locus: `optlist.h` autodescribe default On; `getpos.c`
  `auto_describe` → lookat cmap; `defsym.h` S_*stair explanations.
- Change: `jsmain` default `iflags.autodescribe: true`; `getpos`
  `auto_describe_text` stairs/ladder firstmatch.
- Verification: seed0004 Scr **391→395**/409; @297 fixed; miss
  @310 `dart trap`; RNG full; green+strict; cohort **25/25**.
- Next: seed0004 @310 whatis `brief_at` / trap_description.

