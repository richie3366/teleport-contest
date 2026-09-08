# Review 1131 — f567ecfb — zap.c zhitu ZT_DEATH non-breath arm (D-2165)

Metadata: SHA `f567ecfb`, js/ +11/−8 in `zap.js` only (one
import name + arm rewrite + header-doc update). D-log D-2165.
Subject promises: bounced death ray printed a spurious «You
die...» before the wizard «Die? [yn] (n)» prompt —
scen-wish-Barbarian-92054 step 111/127, screen-first at
`cmd.c:5569` (C «Die? [yn] (n)» vs JS «You die...--More--»).

Intent vs deliverable: promise matches diff. Actually adds:
the C arm in exact order — `monstunseesu(M_SEEN_MAGR)`,
killer `KILLED_BY_AN` + beam text, `ugrave_arise = NON_PM`,
`await done(DIED)`, `return` — replacing the old
`losehp(uhp+1)` + `finish_losehp_done()` routing whose
contract prints the extra pline. No scope creep.

Inventory: no new functions; one rewritten arm. Callee
closure: `done → js/end.js:1593 ASYNC` (awaited),
`monstunseesu → js/mondata.js:633 sync` — both LIVE.
`done` joins the existing static `end.js` import (edge
already present via `finish_losehp_done`, still used at 5
other sites — no dead import); call-time use only, no TDZ.
Constants `M_SEEN_MAGR/NON_PM/KILLED_BY_AN/DIED` already
imported (:324–368). The breath arm
(`zap.c:4465–4490`) is OMIT with a C citation in the header.
No deleted/redirected symbols.

**C ↔ JS fidelity**: confirm against pinned C
(`zap.c:4494–4509`, via `csym.mjs zhitu` + direct read).
Remaining-arm order matches (nonliving/demon →
Antimagic → shared tail; breath arm first in C, named-omit
here). Tail matches call-for-call: `monstunseesu(M_SEEN_MAGR)`,
`killer.format = KILLED_BY_AN`, name = beam text, `ugrave_arise
= NON_PM` (C's `-3` applies only when `type == -BREATH`,
which never reaches this arm — disclosed simplification),
`done(DIED)`, `return /* lifesaved */`. The old code's two
defects (extra pline; HP zeroed before `done()`'s `bot()`
where C bots at full HP) are both retired by construction.
Observation (pre-existing, not this diff, no Must-fix): the
untouched nonliving/Antimagic arms omit C's `shieldeff(sx,sy)`
(+ `monstseesu` on the Antimagic arm) — display/seen-flag
only, zero corpus surface (this session PASSED with them
absent); suggest naming them in the map header on a future
touch, not a queue row.

Hallucinations / overclaim: none. Owner-vs-writer explicit
(yn_function is the notice point, zhitu the writer); "Match C"
claimed for dispatch + callee together, both live.

Density: ~11 insertions, one arm. C-small exception applies.

Verification: D-log Verify bullet shows `verify.mjs --fn
yn_function` → hidden Barbarian-92054 PASS + green + strict +
cohort 7/7. Re-measured myself:
`hidden-proxy.mjs verify yn_function --base f567ecfb~1` →
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` —
true PASS confirmed. No FORCE/DIAG/seed-gate in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
