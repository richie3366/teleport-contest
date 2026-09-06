# Review 863 — 04dd88ea — mkmaze.c Cav quest des.wallify() (D-1893)

Metadata: SHA `04dd88ea`, D-1893. Files: `js/mklev.js` (+27/−0, three
9-line blocks). Must-fix from review 861. Next index 863.

Intent vs deliverable: subject promises the missing `des.wallify()`
epilogue in `load_cav_strt`/`loca`/`goal`, closing review 861's single
C-wrong. The diff delivers exactly that: three identical
`wallify_map(...)` calls, no new functions, no new imports, no RNG
touch. Promise ≡ diff.

Inventory: no new/changed JS functions — three call insertions only.
Callee `wallify_map` is the pre-existing local clone at
`js/mklev.js:17842` (`sym.mjs wallify_map` → NOT EXPORTED, 1 local
clone; nothing deleted or re-pointed, so no further `sym` output to
paste). Callers of the loaders unchanged.

**C ↔ JS fidelity** (confirm): `csym.mjs lspo_wallify` →
`nethack-c/upstream/src/sp_lev.c:5964–5989`: no-arg call skips the
table branch and invokes `wallify_map(gx.xstart-1, gy.ystart-1,
gx.xstart+gx.xsize+1, gy.ystart+gy.ysize+1)`. The JS epilogue passes
`(g.splev_xstart|0)-1, (g.splev_ystart|0)-1,
(g.splev_xstart|0)+(g.splev_xsize|0)+1,
(g.splev_ystart|0)+(g.splev_ysize|0)+1` — exact arg shape, and
byte-identical to the pre-existing Tou-goal epilogue (`js/mklev.js:2912`
block shown in-commit idiom). `csym.mjs wallify_map` →
`sp_lev.c:2864–2891`: STONE cell with an IS_ROOM/CROSSWALL neighbour
in the 3×3 becomes HWALL iff the neighbour row differs else VWALL,
clamped to 1..COLNO-1, 0..ROWNO-1 — the reused clone was already
matched to this body in review 861. Lua tails confirm the call exists
in all three files (`Cav-strt.lua` ends `des.wallify()`,
`Cav-loca.lua:93 des.wallify()`, `Cav-goal.lua` ends `des.wallify()`),
and slot order is right in all three hunks: after the last monster,
before the `wallification → flip_level_rnd → fixup_special` comment —
matching C `load_special` (lua runs first, wallification after). No
RNG calls in either C function, so "no RNG impact" holds.

Hallucinations / overclaim: none. The D-log Verify bullet quotes the
vacuous-hidden note verbatim instead of claiming a corpus PASS, and
names the zero-block queue row explicitly.

Density: 27 insertions, one Must-fix item alone — correct per the
Must-fix rule.

Verification: D-log `verify.mjs --fn makemaz` → syntax, rule2, green
2/2 + strict, cohort 7/7, full 44/44. Re-measured myself:
`hidden-proxy.mjs verify makemaz --base 04dd88ea~1` → `0 session(s)
blocked on it (0 at baseline, 0 in the working scoreboard)` —
vacuous, as stated; no quest level is corpus-reached, so public gates
carry it. Diff grep: no FORCE/DIAG/seed/coordinate literals. This SHA
also stamps review 861 `**Addressed:** D-1893 04dd88ea` and archives
the Must-fix row in-commit — proper closure.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
