# Review 901 — e9543922 — mshot_xname Nth/xname arms (D-1931)

Metadata: SHA `e9543922`, D-1931. Files: `js/objnam.js`
(+19: `mshot_xname`), `js/hacklib.js` (+12: canonical
`ordin`), call-site wiring in `js/dothrow.js`,
`js/mthrowu.js`, `js/uhitm.js` (one line each + import).
Map-driven Open row, 0 corpus blocks cited. Next index 901.

Intent vs deliverable: subject promises the `mshot_xname`
export, a canonical `ordin` home, and three wired call
sites. The diff delivers exactly that; nothing else.
Promise ≡ diff.

Inventory: `mshot_xname` → `objnam.js:1003 sync`, single
canonical export. `ordin` → `hacklib.js:294 sync` (C's
home); the one remaining file-local clone
(`dothrow.js:722`, endmultishot) named in-commit, not
re-cloned. Callees `xname` (same module) and `ordin`
(objnam→hacklib edge pre-exists: upstart/highc) — no new
edge; the three objnam-consumer imports all ride existing
edges. No stub, no new omit.

**C ↔ JS fidelity** (`objnam.c:1089–1102` via csym):
xname first, then `m_shot.n > 1 && m_shot.o == otyp`
with `| 0` int semantics, `` `the ${i}${ordin(i)} ` ``
prefix — C `strprepend` is concat in JS, exact. `ordin`
matches C's teen-exception structure (`dd==0 || dd>3 ||
tens==1 → th`), confirmed by the D-log's 13-case probe
sweep (0/11–13/111–112). Call sites: `tmiss`
(`dothrow.c:1951` — was xname with a deferred comment, now
`mshot_xname`); `hmon` thrown arm (`uhitm.c:1646–1647`,
cited range matches the wired arm); `thitu`
(`mthrowu.c:89–90` — `quan > 1 ? singular : mshot_xname`
takes the C branch shape, with `doname` kept deferred and
named). No RNG in any shipped arm either side. Named
in-commit in turns.md: sink/miss end-of-path, stone-missile
no-harm, destroyed+multishot gate, monster-side m_shot,
thitu quan>1 doname.

Hallucinations / overclaim: none. The D-log does not
overstate the probe (volley + ordin sweep only) and names
five remaining arms with C ranges.

Density: ~40 insertions across 5 files, one C locus
family — small like 897/899, justified as arm completion.

Verification: re-measured `hidden-proxy verify mshot_xname
--base e9543922~1` → `0 session(s) blocked on it (0 at
baseline, 0 in the working scoreboard)` — vacuous as
stated, nothing owed. Rule #2 clean. D-log gates: green
2/2 + strict, cohort 7/7. Added/removed lines grep: zero
banned-pattern hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
