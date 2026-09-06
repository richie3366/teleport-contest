# Review 894 — b87ddc27 — dotrap full dispatch body (D-1924)

Metadata: SHA `b87ddc27`, D-1924. Files: `js/trap.js` (+33/−15:
`dotrap` preamble, Sokoban arm, escape gate, steed learn).
Map-driven Open row, 0 corpus blocks cited. Next index 894.

Intent vs deliverable: subject promises FAILEDUNTRAP force,
fixed-tele force, the Sokoban air arm, plunge/conj/adj blocks,
the clinger disjunct, the `Fumbling()` macro, a locomotion verb,
and steed learning. The diff delivers all nine with zero import
changes (every name was already on an existing edge). Promise ≡
diff.

Inventory: no new helpers, no clones, no stubs, no omits beyond
the pre-existing named one — poly-form verbs beyond Lev/Fly stay
inside file-local `u_locomotion_pit` while C calls full
`u_locomotion("step")` (named in the doc comment + D-log + map;
that helper's own deferral, not this SHA's). Callees all LIVE and
sync: `sym.mjs Fumbling` → `js/attrib.js:843 sync`,
`sym.mjs mon_learns_traps` → `js/monsters.js:555 sync`
(correctly un-awaited), `sym.mjs is_clinger` →
`js/monsters.js:468 sync` (all pasted as required).

**C ↔ JS fidelity** (`csym dotrap` → `trap.c:2995-3060`, read in
full): decl order incl. `conjoined_pits(trap, t_at(ux0,uy0),
TRUE)` computed before `nomul(0)`, fixed-tele flag mutation
threaded to both `check_in_air` and the selector (local `let`
copy ≡ C param mutation), Sokoban message with
`a_your[madeby_u]` + `trapname(ttype,TRUE)` + fall-through and no
return, `else if (!forcetrap)` structure, floor-trigger/in-air
step-over with early return, escape gate with `!plunged &&
!conj_pit && !adj_pit` and `(!rn2(5) || (is_pit && is_clinger))`
short-circuit — the `rn2(5)` draw count is unchanged and the
clinger disjunct draws nothing — steed `mon_learns_traps`,
`mons_see_trap`, selector with the mutated `trflags` — all exact.
The old `u.Fumbling` sticky read → macro reader is a strict
improvement toward C. No RNG reordered.

Hallucinations / overclaim: none. No corpus claim, no probe —
correctly scoped for a 0-block row whose arms are off-corpus but
line-for-line; the D-log says exactly that instead of inventing a
falsifier.

Density: 48-line single-function body — right-sized per §2b.

Verification: re-measured `hidden-proxy verify dotrap --base
b87ddc27~1` → `0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)` — vacuous as stated, nothing owed.
`imports.mjs --rulecheck` → Rule #2 clean (HEAD). D-log gates:
green 2/2 + strict ×2, cohort 7/7. Diff grep: no FORCE/DIAG/seed/
coordinate patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
