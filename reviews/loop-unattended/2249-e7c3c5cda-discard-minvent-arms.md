# Review 2249 — e7c3c5cda — discard_minvent artifact+obfree + rewirings

Metadata: SHA `e7c3c5cda44fa4dba3323ed99a1b6b013ff96cee` (D-3288,
2026-10-02). `js/mon.js` (+28/−11: arms +
4 same-edge names), `js/mklev.js` (1-line
rewire), `js/shknam.js` (rewire + import
swap). One function whole: `discard_minvent`
(C mkobj.c:2524–2536) + 2 caller rewirings.

Intent vs deliverable: subject promises the
:2532–2534 arms + caller rewirings. The diff
ships the artifact arm, the obfree arm, the
flag rename (`_uncreate_artifacts` →
`uncreate_artifacts`), both rewires, and
retires both doc omit lines. Delivers all.

Inventory:

- Arms (:3650–3653): `if (uncreate_artifacts
  && otmp.oartifact) artifact_exists(otmp,
  safe_oname(otmp), false, ONAME_NO_FLAGS)` +
  `obfree(otmp, null)`, in C order after
  extract. Unlink guard + stale nulls kept.
- mklev.js:4122: sync stand-in loop →
  `discard_minvent(mtmp, true)` (import
  pre-exists :124 ✓).
- shknam.js:826: Orcus inline loop →
  `discard_minvent(mtmp, false)` + new mon.js
  import (:50); `obj_extract_self` dropped
  from the mkobj import — verified zero
  remaining uses in the file ✓.
- mon.js import additions are same-edge names
  (const/do_name/shk/artifact edges
  pre-exist) ✓. `sym.mjs`: artifact_exists
  artifact.js:1467 sync, obfree shk.js:4121
  sync, safe_oname do_name.js:1374 sync,
  discard_minvent mon.js:3646 sync — all
  single LIVE exports, no clones ✓.

**C ↔ JS fidelity**: body ≡ C :2524–2536: while
re-reads minvent, extract(TRUE,TRUE) per item,
then the artifact arm — C passes
`safe_oname(otmp)` + `ONAME_NO_FLAGS` itself,
JS matches all four args ✓ — then obfree
("dealloc_obj() isn't sufficient") ✓. No RNG
✓. Callee closure LIVE: artifact_exists body
is a real artilist scan with the mod?assign:
uncreate path (read :1467–1492) ✓; obfree
body has the leash/food/spbook/contents/
boulder + billing arms (read :4121–4165) ✓;
both sync-called-from-sync ✓. Callers: all 5
C direct sites mapped in the D-log; the two
rewired here verified — sp_lev.c:2181 TRUE ≡
mklev.js:4122 TRUE ✓; Orcus shknam.c:797
`mongone(mtmp)` confirmed at the cited lines
(:794–797 ghost-town hack) → FALSE ≡
shknam.js:826 ✓. shknam→mon edge: new in
this commit (only mon.js import in the file),
hoisted sync fn, runtime use — D-log SAFE
claim stands; fortress green confirms.

Hallucinations / overclaim: none. "No corpus
divergence — C-fidelity residual" disclosed;
no corpus PASS claimed.

Density: one whole 13-line C body + its 2-call
caller closure; sub-80 exception documented
(generator 0 eligible). `Ledger:
discard_minvent ported` ✓, one Verify ✓.

Verification: D-log Verify shows hidden-vacuous
+ smoke 24/24 + green/strict/cohort/full.
Re-measured (`verify discard_minvent --base
e7c3c5cda~1 --reach-all`): `0 blocked` +
vacuous note + `smoke 24 PASS, 0 regressed →
REACH-OK`. Exact match; zero REGRESSED.
Banned-pattern grep: clean. Rule #2 clean
(iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
