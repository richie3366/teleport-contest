# Review 1074 — 20e09ee9 — distant_monnam ARTICLE_NONE delegates to live x_monnam

Metadata: SHA `20e09ee9`, D-2108, `js/do_name.js` only
(14 changed lines, net −4).
Prior index ends at 1073 (`67985652`); `a31403a9` between is
docs-only (audit), skipped per the JS-touching rule.

Intent vs deliverable: the subject promises that farlook of a named pet
prints "little dog called Slasher", not bare "Slasher".
The diff delivers exactly that and nothing else: it deletes the 4-line
local subset (isshk / ghost / mgivenname / plain-name) from
`distant_monnam_none` and returns
`x_monnam(mtmp, ARTICLE_NONE, null, 0, true)`.
No new helper, no import, no RNG touch.

Inventory: one changed function (`distant_monnam_none`);
zero added functions; deleted code only.

**C ↔ JS fidelity**: C `distant_monnam`
(`nethack-c/upstream/src/do_name.c:1168–1186`, 19 lines) is:

- the astral high-cleric conceal gate (`:1176–1181`), else
- `x_monnam(mon, article, NULL, 0, TRUE)` (`:1183–1186`).

Branch-by-branch:

1. Astral arm — kept first via the pre-existing
   `astral_high_cleric_distant_nam` (do_name.js:694), shared with the
   ARTICLE_THE caller at :737, untouched by this diff.
   Its gate (PM_HIGH_CLERIC mndx-compare, `Hallucination()`,
   `Is_astralevel`, dx²+dy²≤2 adjacency ≡ `m_next2u`, female
   priestess wording) matches C `:1176–1181`.
2. Else arm — now exactly C `:1183–1186` (`article` passed through,
   NULL adjective, 0, TRUE).
   The live `x_monnam` (do_name.js:828, sync, same module) owns the
   isshk arm, the ghost arm, and the `called` named arm
   (`` `${pm_name} called ${name}` ``), so every deleted subset line is
   subsumed by the canonical callee.
   This is delete-clone + call-C-shape, the playbook §9 preferred repair.

Required `sym.mjs` output (symbols the diff deletes / re-points):

```text
x_monnam         js/do_name.js:828   sync
shkname          js/shknam.js:446   sync
named_ghost_monnam NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_name.js:396
```

`x_monnam` is live and same-module; `shkname` stays live for its other
callers; the ghost clone at do_name.js:396 is still defined — only call
sites were removed, so no dead def and no clone #2 were created.
RNG-neutral claim holds: the taken arm (tame named dog, no hallu /
unseen) draws nothing on either side, and the `nextmbuf` ring note
matches C's own `x_monnam` consumption.

Hallucinations / overclaim: none.
The subject says "delegates to the live x_monnam" — true.
The D-log honestly notes the `x_monnam_tame` bare-name subset stays for
other callers rather than claiming a global fix.

Density: 14-line diff, below the §2b ~40-insertion guideline, but this
is a net-negative clone deletion into a canonical call, not a new port —
C locus is 19 lines and there is nothing more to port.
Acceptable, not a handoff failure.

Verification: D-log Verify bullet cites `verify.mjs --fn makedog` →
hidden 0 PASS / 1 moved past / PROGRESS (Caveman-92053 → distfleeck@32)
+ green + cohort.
Re-measured myself (`--base 20e09ee9~1`):

```text
scen-normal-Caveman-92053: moved → distfleeck at step 32 (was 31)
verify makedog: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

Matches exactly — no vacuous check, no regression.
No seed / step / coordinate read in the diff; Rule #2 scan clean
(`imports.mjs --rulecheck`: "no bare/node specifiers or fs calls").

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
