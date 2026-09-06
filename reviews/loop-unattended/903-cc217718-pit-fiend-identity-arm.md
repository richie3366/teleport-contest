# Review 903 — cc217718 — m_easy_escape_pit pit-fiend identity arm (D-1933)

Metadata: SHA `cc217718`, D-1933. Files: `js/trap.js`
only (+3/−2: identity arm `=== mons[]` → `mndx ===
PM_PIT_FIEND`). Map-driven Open row, 0 corpus blocks
cited. Next index 903.

Intent vs deliverable: subject promises the pit-fiend
identity arm fix. The one-line diff delivers exactly that
plus a corrected doc comment; nothing else. Promise ≡
diff.

Inventory: no new functions, no new imports
(`PM_PIT_FIEND` const at `trap.js:195`, `MZ_HUGE` already
imported), no new edge. `m_easy_escape_pit` stays
file-local — C is staticfn, faithful shape.

**C ↔ JS fidelity** (`trap.c:3725–3730` via csym):
`data == &mons[PM_PIT_FIEND] || msize >= MZ_HUGE` —
JS keeps C short-circuit order with the pointer-identity
arm rendered as `(data?.mndx | 0) === PM_PIT_FIEND`.
The rendering is correct and necessary: `mons` in this
file is the `monsters.js:201` factory function (returns a
fresh literal per call), so the old `data ===
mons[PM_PIT_FIEND]` indexed a function object —
`undefined` — and the arm was permanently dead, not
merely snapshot-mismatched. One nit: the new comment's
"fresh snapshot per call" explanation is imprecise for
exactly that reason, but diagnosis (arm never fired) and
fix are right. The `mndx === PM_*` idiom is precedented
in-repo (`do.js:3008` riders; same-file `trap.js:1969`
`umonnum === PM_PIT_FIEND`). No RNG either side.
`?.` null-guards are pure hardening (C would fault on
null data; no caller passes null). Named: none new —
correct, the arm completes the row.

Hallucinations / overclaim: none material (see the
snapshot-vs-undefined nit above — wording only).

Density: 3 lines fixing a named row — minimal and
complete per §2b.

Verification: re-measured `hidden-proxy verify
m_easy_escape_pit --base cc217718~1` → `0 session(s)
blocked on it (0 at baseline, 0 in the working
scoreboard)` — vacuous as stated, nothing owed. Rule #2
clean (no imports touched). D-log gates: preflight green
2/2 + strict before the change, post-change green 2/2 +
strict ×2, cohort 7/7; full skipped (single-file, same
edges) — legitimate. Inline probe values check out
(PM_PIT_FIEND=300 per generated data; msize 3 < HUGE 4).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
