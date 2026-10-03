# Review 2322 — 2c22a94c3 — dobuzz steed-redirect tail-skip

Metadata: SHA `2c22a94c3`, D-3367, Must-fix for review 2317
C-wrong 1. C `zap.c:4956–4991` (goto target :4867). Stat:
js/zap.js only (+53/−52, reindent-heavy) + test +2 cases.

Intent vs deliverable: subject promises "dobuzz
steed-redirect tail-skip". Diff actually: restructures
the u_at block into if(steed)/else(hero-hit chain +
tail), sweeps both stale comments. Matches promise;
closes the queued Must-fix exactly as specified.

Inventory: 0 new functions; 1 restructured **C callee**
arm (`dobuzz` u_at block, js/zap.js:2578–2641). No
import change, no stub, no clone. `buzzmonst` stays a
closure (sym.mjs has no module-level entry — expected,
not a miss).

C ↔ JS fidelity: confirm against C :4940–4995 (read
direct, csym misses the K&R signature). C: `nomul(0)`
:4955, then steed `if … goto buzzmonst` (exits the whole
u_at branch — goto target sits in the `if (mon)` arm),
else hero-hit / `!Blind` / lightning else-if chain
(:4960–4987), then the unconditional tail
`flashburn(d(nd,50))` :4988–4989 + `stop_occupation()`
:4990 + `nomul(0)` :4991. JS now: `nomul(0)` before the
steed test ✓, steed arm ends the branch after buzzmonst
(Rider/PM_DEATH `break` preserved) ✓, else-nest holds
the identical chain + tail ✓. Arm text verified
reindent-only from the diff (pline_dir/reflect/
shieldeff/zhitu/gameover/monstunseesu/whizzes/tingles
lines unchanged). RNG call-for-call: `rn2(3)` still
drawn only when mounted, in C position; the extra
`d(nd,50)` on the steed path is gone ✓. Non-steed paths
byte-identical in behavior (nesting-only change).

Hallucinations / overclaim: none. The "reindented only"
claim holds; the test's pre-fix 6/7 replay is the
falsifier.

Density: 1-function Must-fix, alone ✓. One `Ledger:`
entry, one Verify line + focused test 7/7 (redirect +
control).

Verification: re-measured — `verify dobuzz --base
2c22a94c3~1 --reach-all` → "0 blocked at baseline +
working" + "reach: 40 baseline-PASS reach it: 40 PASS,
0 regressed → REACH-OK". Matches the D-log exactly
(40/40). D-log's "expected — Must-fix, not corpus"
names the vacuous check ✓. Diff grep: 0 banned hits.
`sym.mjs` (required paste; nothing re-pointed):

```text
mon_reflects     js/mhitu.js:3501   ASYNC — await required
```

Steed-guard callee LIVE, awaited ✓.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
