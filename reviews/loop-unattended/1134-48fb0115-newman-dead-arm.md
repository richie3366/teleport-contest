# Review 1134 — 48fb0115 — polyself.c newman dead arm (D-2168)

Metadata: SHA `48fb0115`, js/ +11/−4 in `polyself.js` only (+ map
row). D-log D-2168. Subject promises: dead arm gets urgent_pline +
done(DIED) lifesave (row named newman, 1 session moved past).

Intent vs deliverable: promise matches diff. Actually adds:
`urgent_pline` replacing plain `pline`, killer `KILLED_BY_AN` /
"unsuccessful polymorph", `await done(DIED)`, lifesaved
`newuhs(false)` + `encumber_msg()` + return. `newuhs` joins the
existing `eat.js` import line. No scope creep.

Inventory: no new functions; one arm reworked. Callee closure — all
LIVE and correctly awaited: `urgent_pline` (pline import block,
`polyself.js:8`), `done` → `js/end.js:1593` ASYNC, `newuhs` →
`js/eat.js:541` ASYNC (`--can` → ALREADY, existing edge, hoisted
export), `encumber_msg` → `js/invent.js:1046` ASYNC (import :47),
`KILLED_BY_AN` (import :151). No deleted/re-pointed symbols.

**C ↔ JS fidelity**: confirm against pinned C (`polyself.c:335–466`
via `csym.mjs newman`; dead label at `:424–434`, read at HEAD):

```c
 dead:      /* we come directly here if experience level went to 0 or less */
            urgent_pline(
                     "Your new form doesn't seem healthy enough to survive.");
            svk.killer.format = KILLED_BY_AN;
            Strcpy(svk.killer.name, "unsuccessful polymorph");
            done(DIED);
            /* must have been life-saved to get here */
            newuhs(FALSE);
            encumber_msg(); /* used to be done by redist_attr() */
            return; /* lifesaved */
```

JS ports all six statements in exact order. Placement is correct:
C reaches `dead` via `goto` from the `newlvl > 127 || newlvl < 1`
check (`:343–346`), which precedes the `u.ulevel` assignment (`:357`)
— so the old level stays intact for lifesaving; JS's early branch
likewise precedes any `u.ulevel` write. (The `dead` label sits
textually inside the `else` (no-Polymorph_control) block, but the
goto enters it directly — the early-branch placement is the faithful
rendering.) `done` return-on-lifesave matches the rehumanize
precedent; killer via the `game.killer` idiom. No RNG in this arm —
none added. Docstring retires exactly the shipped omission
(death/lifesave) and keeps the rest (Sick/Stoned, Slimed, livelog,
retouch, uhp clamp).

Hallucinations / overclaim: none. D-log correctly notes the queue's
rng-first text was stale (the `!polyok` gate shipped in D-2063),
identifies `:426` as the true printer (a real `urgent_pline`, not a
comment literal), and keeps the remaining arms as named omits.

Density: ~15 insertions for a 13-line C arm — right-sized per §2b.

Verification: D-log cites `verify.mjs --fn newman` → 0 PASS,
1 moved past (Samurai-91106 127→133 chwepon), green 2/2, cohort 7/7.
Re-measured independently: `hidden-proxy.mjs verify newman --base
48fb0115~1` → baseline 1 blocked, `0 PASS, 1 moved past, 0
unchanged, 0 worse → PROGRESS` (127→133, later step and owner;
residual is screen-first with full positional RNG per D-log). Claim
true, not vacuous. Zero FORCE/DIAG/getRngLog hits in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
