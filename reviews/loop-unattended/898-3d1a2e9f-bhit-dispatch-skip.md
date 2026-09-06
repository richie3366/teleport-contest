# Review 898 — 3d1a2e9f — bhit monster-hit dispatch + rock skip (D-1928)

Metadata: SHA `3d1a2e9f`, D-1928. Files: `js/zap.js` only
(+156/−38: `bhit_skiprange`, rock setup, DISP_BEAM open,
`:3994–4039` dispatch, no-obj-gate erase/tmp/END,
pay-on-`!bhit_done`). Map-driven Open row, 0 corpus blocks
cited. Next index 898.

Intent vs deliverable: subject promises the monster-hit
dispatch arms plus the thrown-rock skip window with its
2–3 missing RNG draws. The diff delivers exactly those
arms; nothing else. Promise ≡ diff.

Inventory: one new file-local `bhit_skiprange` (C
`skiprange` is staticfn with the single caller bhit, so
file-local is the faithful shape, not a clone).
`flash_hits_mon` → `uhitm.js:2696` ASYNC, awaited — LIVE.
Five added import names all same-edge (`--can` ALREADY ×5:
display ×2, const, monsters, mon). `perceives` and
`M_IN_WATER` as inline expansions over canonical imports —
verified exact below, no clone. No stub, no new omit.

**C ↔ JS fidelity** (`zap.c:3579–3588`, `:3832–4139`, read
directly — csym has no bhit definition): skiprange math
exact (`Math.trunc` non-negative division, `rnd` 1..n both
sides, `end >= tmp → tmp-1` clamp) with C call order kept
(skiprange draws, then `!rn2(3)`). Rock window `:3855–3858`
before beam opens; FLASHED opens DISP_BEAM `:3861–3862`.
Skip `:3946–3970` arm-for-arm (pool+`!mtmp` open with
skip/blind-hear wording, `start > end+1` decrement,
`r <= end` close with `r > 3` rebounce, eel/cant_drown
pass-over nulling mtmp). Dispatch `:3994–4044`:
notonhead lifted before the arms (applies to every mtmp
hit, as C); FLASHED minvis `ox/oy` + flash pass-through vs
visible END+stop; INVIS `!minvis || perceives` stop with
`perceives` (`mondata.h:81`) expanded exactly as
`(mflags1 & M1_SEE_INVIS) !== 0`; thrown/kicked END-unless-
tethered + `cansee && !canspotmon → map_invisible`;
ZAPPED nonzero-fhitm stop (old code dropped the return
value) else `r -= 3`; PROBING unmap+newsym. Erase/tmp
`:4081–4094` now obj-gateless like C; END `:4125–4127`
including the returning-missile disjunct; pay `:4129–4130`
as `shopdoor && !bhit_done`, equivalent to C's
goto-skips-bill since only stop paths set the flag. RNG
walk: `rnd(tr)`/`rnd(3)`/`rn2(3)` at C positions, C order.
Named in-commit in turns.md: throwit fly, shkcatch pick,
HEAVY_IRON_BALL stop, apply.js mirror clones.

Hallucinations / overclaim: none. No corpus claim; the
"2–3 draws missing" count matches the C draw sites.

Density: 156 insertions, one function envelope — §2b-clean.

Verification: re-measured `hidden-proxy verify bhit --base
3d1a2e9f~1` → `0 session(s) blocked on it (0 at baseline, 0
in the working scoreboard)` — vacuous as stated, nothing
owed. `imports.mjs --rulecheck` → Rule #2 clean (HEAD).
D-log gates: green 2/2 + strict ×2, cohort 7/7, full 44/44.
Added/removed lines grep: zero banned-pattern hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
