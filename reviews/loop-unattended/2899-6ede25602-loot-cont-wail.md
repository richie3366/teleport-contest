# Review 2899 — 6ede25602 — do_loot_cont wail drain

- SHA: `6ede25602` (cliff: deferred-wail drains at all 3 pickup.js
  losehp sites)
- D-entry: D-4058; Ledger: pickup.c (`do_loot_cont partial`,
  `in_container` + `tipcontainer` ported, D-4058 appended)
- `js/` diff: `js/pickup.js` +13/−1 (import + 3 drains + `export`);
  new `scripts/do-loot-cont-wail-drain.test.mjs`

## Intent vs deliverable

Promise: drain the D-3105 deferred wail after each of the 3
pickup.js losehp sites in C order; Priest-50456019 s500 → FULL
PASS; fatal path keeps its finish_losehp_done-only flow.
Delivers exactly that, plus a behavior-neutral `export` on
`do_loot_cont` for the test. Promise = diff.

## Inventory

- `do_loot_cont` bite site — pickup.js:4195: `await
  finish_maybe_wail()` after the fatal-check return, before
  `makeknown`. C: pickup.c:2154–2159 (losehp → makeknown →
  abort → return).
- `in_container` explosion — pickup.js:3245: drain after losehp,
  before `baggone`. C: pickup.c:2692–2693.
- `tipcontainer` explosion — pickup.js:5064: drain after losehp.
  C: pickup.c:3803.
- Import: `finish_maybe_wail` into the existing `./hack.js`
  import (ALREADY edge; `sym.mjs`: hack.js:2011 ASYNC, awaited
  at all 3 sites). LIVE callee, no clone, no stub.

## C ↔ JS fidelity

C losehp (hack.c): fatal `u.uhp < 1` → `done(DIED)` noreturn;
`else if (n > 0 && u.uhp*10 < u.uhpmax)` → `maybe_wail()`
(:4289–4291); poly arm :4273–4275 adds the `Unchanging`
conjunct. JS `losehp` (hack.js:1911, **sync**) mirrors this
with deferred flags: fatal sets `_losehp_needs_done` only
(:1956–1967), the else-if sets `_needs_maybe_wail` (:1968–1969;
poly :1939 with `Unchanging(u)`). Consequences verified:

- do_loot_cont: fatal returns before the drain (C never wails
  on fatal — noreturn `done`); non-fatal drains, then
  makeknown/abort — C order exact.
- in_container/tipcontainer have no fatal check, but the drain
  is still safe on fatal: the wail flag is never set there
  (else-if), so only the showdamage queue drains — and C prints
  showdamage before "You die..." too. No new wrongness.
- tipcontainer/do_loot_cont call `losehp(...)` without `await`
  (pre-existing style): harmless — the function is sync, the
  flag is set before the drain runs. No ordering bug.
- `grep losehp(` in pickup.js: exactly these 3 sites — the
  "each of the 3" claim is complete, not sampled.
- The probe fork is exact: C s500 bite + `maybe_wail`
  hack.c:4228 uhp==1 elf arm («Elf is about to die.»); JS
  printed the bite only. RNG fully matched at the divergence
  (wail draws nothing here — message-only arm).

## Hallucinations / overclaim

None. The `do_class_genocide` cMsgOwners entry is called
attribution noise with two concrete checks (no doread in
stepFns, no genocide text s497–504). The `export` is disclosed
as test-only with precedent. Monk-50850031's incidental PASS
is disclosed as a tool-rewritten committed row, not claimed as
caused movement (it was reserve FAIL kind=screen @89 at parent,
FULL PASS 12240/12240 + 699/699 on HEAD — consistent with a
wail-shaped screen heal, re-verified live here).

## Density

Cliff owner with movement (1 PASS, FULL). Parks re-verified
this iteration (stated in the commit). Whole-function holds
for all three touched functions; the survived-fatal
makeknown+abort skip stays a declared ledger omit (D-3998
class, untouched). `Ledger:` bullet names all 3 functions.
No unreached work (the two companion drains are same-file,
C-ordered, provably complete).

## Verification

Re-measure (`--base 6ede25602~1 --no-reach`):

```text
verify do_loot_cont: baseline 6ede25602~1 — 1 session(s) blocked on it
  scen-symset-Priest-50456019: PASS
verify do_loot_cont: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match. Focused test 2/2 green on HEAD. No FORCE/DIAG/seed
strings. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
