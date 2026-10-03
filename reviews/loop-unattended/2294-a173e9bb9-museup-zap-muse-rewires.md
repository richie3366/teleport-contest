# Review 2294 — a173e9bb9 — m_useup zap+muse clone removals

Metadata: SHA `a173e9bb9`, D-3338, C `mthrowu.c:1161–1170`,
JS live `js/mthrowu.js:184` (untouched), rewired `js/zap.js`, `js/muse.js`.
Stat: 12 files, js hunks `muse.js -20/+1`, `zap.js -20/+3`
(import extensions + 2 site comments + test file).

Intent vs deliverable: subject promises "`mthrowu.c` m_useup zap.js +
muse.js clone removals (20 sites → live js/mthrowu.js export)". Diff
actually delivers: extends the ALREADY mthrowu imports in zap.js
(`rnd_hallublast, m_useup`) and muse.js (`..., m_throw, m_useup`),
deletes both local `m_useup` clones, adds 2 C-cite site comments in
zap.js + 1 import-line comment in muse.js covering the 18 identical
call lines. No new function, no behavior-neutral-only change (see
fidelity: two real C-wrongs fixed). Matches promise.

Inventory: 1 function touched: `m_useup` (clone→import rewire ×2
files). Deleted: `js/muse.js` ~20-line clone, `js/zap.js` ~20-line
clone. Live `js/mthrowu.js:184` pre-existed and is untouched by this
SHA. "20 sites" = 18 muse + 2 zap; muse sites keep identical call
names under the extended import.

C ↔ JS fidelity: C `m_useup` (`mthrowu.c:1161–1170`, via `csym.mjs`):

```c
m_useup(struct monst *mon, struct obj *obj)
{
    if (obj->quan > 1L) {
        obj->quan--;
        obj->owt = weight(obj);
    } else {
        m_useupall(mon, obj);
    }
}
```

Two arms, no RNG. Live JS (`js/mthrowu.js:184–193`):

```js
export function m_useup(mon, obj) {
    if (!mon || !obj) return;
    if ((obj.quan | 0) > 1) {
        obj.quan = (obj.quan | 0) - 1;
        obj.owt = weight(obj);
    } else {
        return m_useupall(mon, obj);
    }
}
```

Arm-for-arm exact: quan>1 decrements + `weight()` recompute; else
`m_useupall` → `extract_from_minvent` (C's `m_useupall` = extract +
obfree; JS has no manual free, GC covers the detached object). The
`!mon||!obj` guard is extra vs C (NONNULLARG12) but benign, and both
deleted clones carried it, so no site behavior changes on that axis.
Behavior delta vs the deleted clones is C-faithful as claimed: the
clones skipped the `weight()` recompute and did a bare `nobj` unlink
instead of `m_useupall→extract_from_minvent` — both were C-wrongs in
the clones, fixed by this rewire. `return m_useupall(...)` where C
returns void is a harmless JS-ism (callers ignore the value).
Branch-by-branch confirm.

Hallucinations / overclaim: none. The D-log Verify bullet says
"hidden note (0 blocked — normal for coverage) · REACH-OK" — matches
my re-measure exactly. The two zap site cites (`zap.c:5933`,
`zap.c:1116`) are both real `m_useup` call sites per `--callers`.

Density: single-function clone-removal iteration (not a cluster). One
Inventory block, one fidelity block, one `Ledger: m_useup` entry in
D-3338. Not under-density for a rewire: the delta (weight recompute +
extract path) is real C fidelity, plus a maintained test
(`scripts/museup-rewire.test.mjs`, whose recompute case fails against
either deleted clone by construction). Verdict for the function:
ACCEPT.

Verification: `hidden-proxy verify m_useup --base a173e9bb9~1
--reach-all` → "0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)" + "no RNG-tagged reach; fixed smoke spread (24
run): 24 PASS, 0 regressed → REACH-OK". D-log claim confirmed, no
REGRESSED session. `imports.mjs --rulecheck` → Rule #2 clean.
`--can zap→mthrowu` and `muse→mthrowu` both ALREADY (no new edge).
Diff grep: no FORCE/DIAG/getRngLog/fastforward/coords. `sym.mjs`
output (required paste):

```text
m_useup          js/mthrowu.js:184   sync
```

Single live definer, zero clones left (both deleted by this SHA).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
