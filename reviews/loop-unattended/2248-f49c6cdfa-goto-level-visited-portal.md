# Review 2248 — f49c6cdfa — goto_level discarded-level + portal-missing arms

Metadata: SHA `f49c6cdfa15091f644beb67f05cf953b51ffacb5` (D-3287,
2026-10-02). `js/do.js` only (+22/−3: import,
doc, two arms). Campaign function `goto_level`
(C do.c:1478–1998; this SHA: :1695–1697,
:1731–1740).

Intent vs deliverable: subject promises the two
arms. The diff ships both at C-cited positions +
doc Ported lines. Delivers what it promises.

Inventory:

- VISITED arm (:1985–1991): inside `if (!exists)`,
  before `mklev()`: flag+clear+`await impossible`.
- Portal-missing (:2084–2096): qexpelled+Is_qstart
  silent rndspot vs fuzzer-gated impossible +
  rndspot; replaces the single-rndspot comment.
- `Is_qstart` added to the pre-existing quest.js
  import (:167) — edge pre-exists, zero new
  module edges. No symbol deleted or re-pointed
  → ran `sym.mjs` anyway: `Is_qstart
  js/quest.js:69 sync`, single LIVE export ✓.

**C ↔ JS fidelity**: VISITED arm ≡ C :1695–1697
verbatim (confirmed line-for-line): same guard
position inside the `!LFILE_EXISTS` branch,
identical message text, same `&= ~VISITED`
clear ✓. Missing-entry read (`info?.flags|0`
→ 0) matches C's zeroed array slot, and the
arm can't fire on missing info so the
`info.flags =` write is null-safe ✓.
Portal-missing ≡ C :1731–1740 verbatim:
qexpelled short-circuit order kept,
`Is_qstart(uz0) || Is_qstart(uz)` disjunct,
identical "no corresponding portal!" text,
`debug_fuzzer` gate (a C `iflags` field, not
seed logic) ✓. `impossible` awaited (async
✓); `u_on_rndspot` pre-imported ✓. No RNG in
either arm ✓. Callers: in-body arms only, no
call edge moved; C call sites wired in
D-3277/D-3284 (disclosed, out of diff).

Hallucinations / overclaim: none. D-log
discloses "no corpus divergence — C-fidelity
residuals" and rows without `blocks N`; no
corpus PASS is claimed.

Density: campaign-function step (D-3261/D-3277/
D-3284 precedent); sub-80 exception documented
(generator 0 eligible globally). `Ledger:
goto_level partial` ✓, one Verify bullet ✓,
remaining Deferred arms stay doc-listed (NHFILE,
RMPORTAL, Wizard resurrect, Lua, MICRO).

Verification: D-log Verify shows hidden-vacuous
+ reach 33/33 + green/strict/cohort/full 44/44.
Re-measured (`hidden-proxy.mjs verify goto_level
--base f49c6cdfa~1 --reach-all`): `0 session(s)
blocked` + vacuous note + `reach 33/33 PASS →
REACH-OK`. Matches exactly; zero REGRESSED.
Banned-pattern grep: clean. Rule #2 clean
(iteration-wide `--rulecheck`).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
