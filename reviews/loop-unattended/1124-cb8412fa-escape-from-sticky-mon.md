# Review 1124 — cb8412fa — escape_from_sticky_mon sticky-holder escape (D-2158)

Metadata: SHA `cb8412fa`, js/ +56 in `hack.js` plus wiring in
`cmd.js` (1 import name, 3-line call site, 2 omission-comment
trims). D-log D-2158. Subject promises: the missing sticky-holder
escape roll (`hack.c:2639–2692`), previously a named omission in
`domove`; scen-wish-Caveman-92183 PASS (was RNG-first at
`hack.c:2664`, C `rn2(40)=4` vs JS `rn2(20)=4 @ gethungry`).

Intent vs deliverable: promise matches diff. Actually adds:
(1) new exported async `escape_from_sticky_mon(x, y)` in
`js/hack.js:2068` (C-faithful home for the C static); (2) the call
in `domove` after `avoid_running_into_trap_or_liquid`, before
`m_at`; (3) removal of the name from two omission comments,
including the swallowed arm whose comment now lists only
air/slippery (correct per C — swallowed has no escape call). No
scope creep.

Inventory: one new function, one call site. Callee closure all
LIVE per `sym.mjs`: `set_ustuck → js/mhitu.js:1602 sync`,
`Conflict → js/mhitu.js:206 sync`, `sticks → js/engrave.js:348
sync`, plus house `y_monnam`/`pline`/`nomul`. Both new static
import edges (`mhitu.js`, `engrave.js`) are ALREADY per
`imports.mjs --can` — no new edge, no TDZ question. On `sticks`
specifically: `sym.mjs` warns of multiple exports + local clones
(`monmove.js:1586`, `mhitu.js:1104`, `uhitm.js:2083`), and this
commit imports the right one — `engrave.js:348` is the C-faithful
`mondata.c` port whose header explicitly disqualifies monmove's
variant. Nothing deleted or re-pointed (clone → import), so no
further `--can` owed.

**C ↔ JS fidelity**: confirmed against
`nethack-c/upstream/src/hack.c:2637–2692` (csym range), arm for
arm. Guard `u.ustuck && (x != mx || y != my)` (JS negated
early-false) → `!m_next2u` fled arm → `sticks(youmonst.data)`
release arm → `switch (rn2(!mcanmove ? 8 : 40))` with case-3 wake
(`mfrozen=1`, `msleeping=0`) + FALLTHROUGH, default
`Conflict || mconf || !mtame` cannot-escape arm (`nomul(0)`,
return TRUE), cases 0–2 pull-free. Branch order, short-circuit,
and both FALLTHROUGHs match. `m_next2u` inlined as
`dx*dx+dy*dy > 2` is the `you.h:560` macro expansion
(distu ≤ 2), not a clone. Call-site order checked against C
`:2745–2765`: water_turbulence → move_out_of_bounds →
avoid_running_into_trap_or_liquid → escape_from_sticky_mon → m_at
— JS matches exactly, so the turn-spend semantics ("escape spends
the turn before m_at/attack") hold. Single RNG draw `rn2(8/40)`
call-for-call; this is the draw the session was missing.

Hallucinations / overclaim: none. "C-faithful home" is accurate
(C static → `js/hack.js`, not a convenience module).

Density: ~60 js/ insertions for a 56-line C function plus wiring
— right-sized single-locus iteration.

Verification: D-log bullet shows `verify.mjs
--fn escape_from_sticky_mon` → syntax + rule2 + hidden PASS +
green/strict + cohort 7/7 + full 44/44 (auto: shared file
changed). Re-measured: `hidden-proxy.mjs verify
escape_from_sticky_mon --base cb8412fa~1` → "1 PASS, 0 moved
past, 0 unchanged, 0 worse → PROGRESS" (Caveman-92183 PASS). True
claim. Diff grep: no FORCE/DIAG/seed/coordinate gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
