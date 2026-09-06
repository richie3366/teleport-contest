# Review 906 — efc7a95b — spec_ability predicate + SPFX header gap (D-1936)

Metadata: SHA `efc7a95b`, D-1936. Files: `js/artifact.js`
(`spec_ability` + 6 SPFX_* consts + `confers_luck`
reroute), `js/detect.js` (live SEARCH fund), `js/sit.js`
(INTEL arm reroute). Map-driven Open row (data.md), 0
corpus blocks cited.

Intent vs deliverable: subject promises the shared
predicate plus retiring three local derivations (inline
identity+bit test, INTEL clone, hardcoded `fund = 0`).
The diff delivers exactly that. Promise ≡ diff.

Inventory: one new sync export `spec_ability`
(`artifact.js:502`; single definition). Two reroutes
(clone → import, both verified below). One behavior
fix: SEARCH-artifact wielders now get `uwep->spe` fund.
No stub, no new omit.

**C ↔ JS fidelity**: `spec_ability`
(`artifact.c:515–522` via csym) — `arti !=
&artilist[ART_NONARTIFACT] && (spfx & abil)` becomes
`arti !== list[ART_NONARTIFACT] && ((spfx|0)&(abil|0))`
— order and short-circuit exact. Identity soundness
checked: `artilist()` returns the stable `_artilist`
(`artifact.js:292–295`) and `get_artifact` returns its
elements, so `!==` is the true C pointer comparison;
the idiom already pervades the file (`:553`, `:1952`,
`:1977`). SPFX_* values checked against
`artifact.h:14–43`: SPEAK 0x08, SEEK 0x10, DEFN 0x80,
DRLI 0x100, BEHEAD 0x400, PROTECT 0x08000000 — all
exact. Callers, each C-cited in-commit: `confers_luck`
(`:525–533` via csym — `obj->oartifact &&
spec_ability(obj, SPFX_LUCK)`) now verbatim;
`detect.c:2027` fund ternary — locus confirmed, JS
keeps C short-circuit order; `sit.c:609` INTEL arm —
locus confirmed, C order (`oartifact && spec_ability
&& rn2(10)<8`, rn2 last) kept; old `oart &&` guard was
vacuous anyway (`get_artifact` never returns null).
No RNG in the predicate; call-site draws untouched.

Hallucinations / overclaim: none. D-log again marks
its own hidden-verify vacuous.

Density: ~34/−18 across three modules for one
predicate family — right-sized per §2b.

Verification: re-measured `hidden-proxy verify
spec_ability --base efc7a95b~1` → `0 session(s) blocked
(0 at baseline, 0 working)` — vacuous as stated.
Rule #2 clean (suite-wide re-check this iteration).
Diff grep: zero banned hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
