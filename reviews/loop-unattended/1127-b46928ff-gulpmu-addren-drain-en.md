# Review 1127 — b46928ff — mhitu.c gulpmu AD_DREN + trap.c drain_en (D-2161)

Metadata: SHA `b46928ff`, js/ +53/−4 across `mhitu.js` (import
name + 4-line arm + omission-doc update) and `trap.js` (new
exported `drain_en`). D-log D-2161. Subject promises: the engulf
energy-drain draw — scen-wish-Monk-92194 step 87/135, RNG-first
at `mhitu.c:1539` (C `rn2(4)=3 @ gulpmu` vs JS `rn2(5)=4 @
distfleeck`), C topline «You feel your magical energy drain
away.--More--» vs JS «».

Intent vs deliverable: promise matches diff. Actually adds: (1)
`drain_en` import name on the existing mhitu→trap edge, (2) the
`case AD_DREN` wiring `if (!(mtmp.mcan | 0) && rn2(4)) await
drain_en(tmp, false)`, (3) new exported async `drain_en(n,
max_already_drained)` in `js/trap.js`. No scope creep.

Inventory: one new function (`drain_en`, C callee — real
`trap.c:5201–5244` port), one changed arm (AD_DREN dispatch).
`sym.mjs drain_en` → `js/trap.js:2576 ASYNC`, single definition,
no clones. `imports.mjs --can mhitu.js trap.js drain_en` →
ALREADY (same existing edge, no new edge). No deleted/redirected
symbols, so no further `sym.mjs` resolution needed.

**C ↔ JS fidelity**: branch-by-branch confirm against pinned C.
Dispatch (`mhitu.c:1537–1542`): C `/* AC magic cancellation
doesn't help when engulfed */ if (!mtmp->mcan && rn2(4))
drain_en(tmp, FALSE); tmp = 0;` — JS matches exactly
(short-circuit order, `rn2(4)` drawn at the right index,
`tmp = 0` unconditional after). Body (`trap.c:5201–5244`):
`punct` init, `uenmax < 1` zero-out + paranoia + botl, else
throttle `n = rnd(n)` when `n > (uen+uenmax)/3` (`Math.trunc`
for the non-negative C `/3` — correct), `!` punct when
`n > uen`, `uen -= n` with `uenmax -= rnd(-uen)` spill + clamps,
`uen = uenmax` cap, `disp.botl`, then `You_feel` after state so
status repaints first — all in C order with `|0` int reads.
Callees `rnd`, `You_feel`, `game.disp.botl` all LIVE in
`trap.js` (rng.js:19, display import :32). Other C `drain_en`
callers (`trap.c:2398` mintrap, `uhitm.c:2433`) are different
arms, not omissions of this one. Bonus: the omission-doc edit
also drops `diseasemu`, correct — D-2151 already shipped that
arm live (visible in the diff hunk context).

Hallucinations / overclaim: none. "Match C" is claimed for the
arm + callee together and both are live; no dispatch-behind-stub.
"Every C branch of AD_DREN + drain_en is live" verified true.

Density: ~50 insertions, one C locus family (arm + its callee),
code + map + verify in one handoff. Right-sized per §2b.

Verification: D-log Verify bullet shows `verify.mjs --fn gulpmu`
→ hidden moved gulpmu@87 → do_statusline2@88 + green 2/2 +
strict ×2 + cohort 7/7. Re-measured myself:
`hidden-proxy.mjs verify gulpmu --base b46928ff~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-wish-Monk-92194 moved → do_statusline2 at step 88, was
87) — matches the claim exactly, later owner, no regression.
Diff grepped: no FORCE/DIAG/getRngLog/seed-gate/fastforward
(the lone "seed" hit is prose "no … seed gates").

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
