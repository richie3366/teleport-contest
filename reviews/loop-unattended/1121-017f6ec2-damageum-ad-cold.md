# Review 1121 — 017f6ec2 — mhitm_ad_cold uhitm arm (damageum_ad_cold) (D-2155)

Metadata: SHA `017f6ec2`, js/ +39/−3 in `uhitm.js` only. D-log D-2155.
Subject promises: poly-hero cold touch burns the MC gate; 1 session
PASS (scen-poly-Monk-92164) + 1 moved (scen-wish-Monk-92013 @75→@79).

Intent vs deliverable: promise matches diff. Actually adds: new
file-local async `damageum_ad_cold(mdef, mhm)` + `AD_COLD` wiring in
`damageum_adtyping`; `resists_cold`/`destroy_items` join the existing
zap.js edge, `shieldeff` the existing display edge
(`--can`: both ALREADY, no new edge).

Inventory: one new function (uhitm-arm port, verified CLONE of
`:2626–2652`), one dispatch line, one dispatch-comment line. No new
module edges.

**C ↔ JS fidelity**: confirmed against `uhitm.c:2625–2681` (csym range;
`:2625–2681` read directly). uhitm arm in exact order: `orig_dmg`
captured pre-gate; `mhitm_mgc_atk_negated(magr, mdef, TRUE)` first —
burns `rn2(10)`, negated → damage 0 + return (the reported first-diff
draw); `!Blind` frost pline via house `Blind_that()`; resists_cold arm
with shieldeff + chill pline then zero; unconditional
`damage += destroy_items(mdef, AD_COLD, orig_dmg)` — including after a
resist-zero, matching C (destroy adds to the zeroed leftover, and
`orig_dmg` is the pre-gate value on both sides). Async discipline:
`destroy_items` (`zap.js:1685` ASYNC) and `mhitm_mgc_atk_negated`
(`mhitm.js:2018` ASYNC) both awaited. `pline_The` capitalization
preserved ("The frost doesn't chill …!"). The gatekeeper
`mhitm_mgc_atk_negated` (`uhitm.c:75–99`, read here) is itself verified
faithful: attacker-cancelled (`mcan`, with the youmonst exception —
hero can't be cancelled) returns TRUE silently; else
`negated = !(rn2(10) >= 3*magic_negation(mdef))`, verbose TRUE printing
«You avoid harm.» / «%s avoids harm.» — so the uhitm arm burns exactly
one `rn2(10)` before anything else, which is the reported first-diff
draw (`rn2(10)=5` vs JS's old `rn2(6)` from the wrong tail). The
`destroy_items(mdef, AD_COLD, orig_dmg)` tail (`zap.js:1685` ASYNC,
awaited) runs on the post-gate leftover including the resist-zeroed
case, matching C's unconditional add — cold destroys potions/scrolls in
inventory even when the monster itself resists, a behavior the old
zero-damage default skipped along with its dice. Named omits, both
cited in the function docstring and map-touched in this commit:
`defended(mdef, AD_COLD)` worn walk (commented at the call site; same
omit on every defended site) and `golemeffects` flesh-golem slow
(named with `golemeffects_mm`); mhitu/mhitm arms stay named in the
`damageum_adtyping` header. No STUB in a live arm. Second-session note:
Monk-92013 advances 75→79 under the same owner — forward movement
through the same arm on a different poly form, consistent with the
arm now drawing its C dice; it stays blocked on a later
`mhitm_mgc_atk_negated` draw, i.e. a downstream arm, not a revert.

Hallucinations / overclaim: none. The second session's "moved → same
owner at a later step" is reported as movement, not PASS.

Density: 39 insertions, one C arm in one module. Right-sized.

Verification: D-log bullet shows `verify.mjs --fn mhitm_mgc_atk_negated`
→ hidden 1 PASS + 1 moved + green/strict/cohort. Re-measured with
`--base 017f6ec2~1` → "1 PASS, 1 moved past (1 still
mhitm_mgc_atk_negated at a later step), 0 unchanged, 0 worse → PROGRESS"
(Monk-92164 PASS; Monk-92013 @75→@79). Forward movement, true claim —
not the D-1831 vacuous pattern (baseline is the parent commit, and the
moved session advanced 4 steps). Banned-pattern grep: zero hits.
Rule #2 covered by D-log verify PASS.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
