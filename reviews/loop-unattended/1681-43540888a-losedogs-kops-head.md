# Review 1681 — 43540888a — `dog.c` losedogs kops-dismiss head (D-2722)

Metadata: commit `43540888a`, D-2722, `js/dog.js` (head port) + `js/shk.js` (doc line) + new `scripts/losedogs-kops-head.test.mjs` (4 tests). Coverage row (0 corpus blocks — stated, not sold). No prior review claimed closed.

## Intent vs deliverable

Subject promises: port the `:310–356` kops-dismiss head in C order ahead of the live `:366` block (vote/reset/veto/keep-looping/mydogs-break/`make_happy_shoppers(true)`), retiring the doc-named omission so the whole `:303–415` body is live. Diff delivers exactly that. Promise matches deliverable.

## Inventory

Changed JS: `losedogs` head (new scan block, `js/dog.js:1171`); `make_happy_shoppers` joins the existing `./shk.js` import; `shk.js` doc line. New unit test (outside scored `js/`). No deleted symbols; one named-omit re-pointed to a live import.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (named omit → live import = re-point):

```text
make_happy_shoppers js/shk.js:1853   ASYNC — await required
losedogs         js/dog.js:1171   ASYNC — await required
```

`--can` per message ALREADY (existing `./shk.js` static import extended). Await discipline: `await make_happy_shoppers(true)` in async `losedogs` ✓. No STUB in the head.

## C ↔ JS fidelity

C locus read: `losedogs dog.c:303–416` (csym range), head `:310–356` read in full above. No RNG in the head — nothing to walk call-for-call.

- migrating_mons scan: `mux/muy == u.uz` gate ✓; `isshk` → `ESHK→dismiss_kops` vote (`==0 → =1`) + reset-to-false ✓; `else if (!mpeaceful)` → veto `-1` with keep-looping (no break — later monsters may still need the ESHK reset) ✓. `ESHK(mtmp)?.` nullable is the file's house convention; C dereferences unguarded, so the `?.` differs only where C would segfault — defensive, not divergent.
- mydogs scan: no level gate (accompanying hero) ✓; hostile shk → veto ✓; C's `dismissKops >= 0` loop condition folded to top-of-loop `break` ✓ equivalent (checked before each element, same as the `for` condition).
- `dismissKops > 0 → make_happy_shoppers(TRUE)` before placement ✓ — the ordering rationale (hero may be displaced by a later re-place) is even quoted in the comment.
- Both C callers wired per doc (`do.c:1816` → do.js, `cmd.c:1047` → wizcmds.js); pre-existing, untouched.
- Named: none new — whole body live. D-2459 keeps its names (mnearto yank, SetVoice) — disclosed, separate scope.

## Hallucinations / overclaim

None. "None on the corpus" is stated up front for the motivation (a latent-behavior port, not a session fix). No FORCE/DIAG/seed gates.

## Density

Coverage head-completion (46-line C region) + doc + 4-test unit file, two modules, no new edges. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 43540888a~1 --reach-all`) — both lines, matching the D-log:

```text
verify losedogs: baseline 43540888a~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify losedogs: no corpus session is blocked on it at 43540888a~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke losedogs: no RNG-tagged reach; fixed smoke spread (24 run, 3.3s): 24 PASS, 0 regressed → REACH-OK
```

The D-log correctly reports "hidden note (0 blocked, normal for coverage row)" — vacuous stated, not sold. Committed test re-run this iteration: 4 pass, 0 fail. Full 44/44 per D-log (shared `shk.js` import line touched); Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
