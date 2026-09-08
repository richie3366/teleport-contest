# Review 1117 — 13a2969a — mhitm_ad_dise mhitu arm + gulpmu AD_DISE (D-2151)

Metadata: SHA `13a2969a`, js/ +22/−1 in `mhitu.js` only. D-log D-2151.
Subject promises: Demogorgon disease hits now sicken; 1 session moved
past (scen-death-Valkyrie-92229 diseasemu@23 → slimed_to_death@37).

Intent vs deliverable: promise matches diff. Actually adds: (1) new
file-local `mhitm_ad_dise_u` wired as `AD_DISE` in `mhitm_adtyping_u`;
(2) `gulpmu` AD_DISE split out of the AD_DREN fallthrough into its own
`diseasemu`-gated arm; (3) dispatch comment gains DISE.

Inventory: one new function (mhitu-arm port, verified CLONE of the
`:4604–4608` arm), one arm split, one comment line. No imports added,
no cross-module edge. `sym.mjs`: `mhitm_ad_dise_u → local js/mhitu.js:2494`,
`diseasemu → local js/mhitu.js:2468` (file-local placement is correct —
callers are same-module; "LOCAL CLONE" is sym's standard label for
non-exports, not drift).

**C ↔ JS fidelity**: confirmed against `uhitm.c:4592–4619` (csym range)
and `mhitu.c:1533–1536` (read directly). mhitu arm: C `hitmsg(magr,
mattk)` unconditional, then `if (!diseasemu(pa)) mhm->damage = 0`
with `pa = magr->data` (attacker data — sickness keeps leftover hitmu
d(), resistance zeroes). JS passes `mtmp?.data` in the attacker
position, consistent with sibling `_u` arms' wiring. gulpmu: C
`if (!diseasemu(mtmp->data)) tmp = 0` — JS verbatim, and the split is
load-bearing: previously AD_DISE fell into AD_DREN's unconditional
`tmp = 0`, skipping the sickness dice entirely, which is exactly the
reported RNG-first divergence (`rn2(16)` vs knockback `rn2(3)`).
Unshipped arms (uhitm `:4599–4603` with its own cannot-happen comment,
mhitm `:4610–4618` S_FUNGUS/GHOUL/defended) stay named in the map in
this commit. No STUB in a live arm — previously-live AD_DISE behavior
was damage-zero-without-dice, now a real arm, so no
"dispatch ported, callee stubbed" shape. The newly-live callee
`diseasemu` (`mhitu.c:1032–1043`, read here) is itself a two-arm
function: Sick_resistance → `You_feel("a slight illness.")` + FALSE
(no RNG); else `make_sick(Sick ? Sick/3+1 : rn1(ACURR(A_CON),20),
mdat->pmnames[NEUTRAL], TRUE, SICK_NONVOMITABLE)` + TRUE — so the
sicken path draws the RNG the session was missing (C step dice
`rn2(16)`-family inside diseasemu's range) while the resist path draws
nothing, exactly the shape C shows. `hitmsg` is unconditional in this
arm like the neighboring SAMU/WERE `_u` arms (message-only, no draw),
so the order hitmsg-then-diseasemu burns dice in C order. Dispatch
context: the `AD_DISE` case lands in `mhitm_adtyping_u`, the
monster→you typing switch fed by the hitmu path — Demogorgon's two
`ATTK(AT_CLAW, AD_DISE, 1, 6)` (monsters.h per D-log) flow through
`hitmu` d() for the leftover damage that sickness preserves, which is
why the message pair changes from bare «Demogorgon hits!» to
«Demogorgon hits! You feel deathly sick. Demogorgon hits!». Continuity:
the next owner `slimed_to_death@37` is already an Open queue row, so
the moved-past session has a live writer waiting.

Hallucinations / overclaim: none. D-log claims "moved past", not PASS —
honest, and the named next owner (slimed_to_death@37) is a real Open row.

Density: 22 insertions, one tight caller/callee cluster in one module.
Right-sized (C locus is two short arms).

Verification: D-log bullet shows `verify.mjs --fn diseasemu` → hidden
0 PASS / 1 moved past + green/strict/cohort. Re-measured:
`hidden-proxy.mjs verify diseasemu --base 13a2969a~1` →
"0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS"
(Valkyrie-92229 → slimed_to_death at 37, was 23). Matches the claim;
movement is forward to a later owner, not a vacuous re-report.
Banned-pattern grep over js/ hunks: no code hits (one prose line).
Rule #2 covered by D-log verify PASS (no new imports at all).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
