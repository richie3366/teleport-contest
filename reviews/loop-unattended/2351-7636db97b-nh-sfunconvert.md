# Review 2351 — 7636db97b — nh_sfunconvert unconvert hook

**SHA:** `7636db97b` — "files.c nh_sfunconvert unconvert hook (D-3396)."
**Scope:** js/files.js +12/−1 (1 export + doc touch-up). Single function.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: new exported `nh_sfunconvert` in C order after `nh_sfconvert`, whole 1-line body mirroring the sibling with TRUE, retiring the ships-with doc clause. Delivered exactly. No drift.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | `nh_sfunconvert` js/files.js:2368 (sync export) | whole body, 1 live callee | files.c:2078–2082 |
| 2 | doconvert_file doc :2316–2317 | ships-with clause retired | — |

No deletion/re-point; no re-point sym owed. Callee sym: `doconvert_file :2341` same-file local (C staticfn — correctly local, not exported) ✓ same-file call, no new edge, no clone.

## C ↔ JS fidelity

**Confirm.** csym body (`files.c:2078–2082`):

```c
void
nh_sfunconvert(const char *filename)
{
    (void) doconvert_file(filename, 0, TRUE);
}
```

C `:2081` ≡ JS `doconvert_file(filename, 0, true);` verbatim modulo the boolean literal ✓. Guard verified: the block opens with `#ifndef SFCTOOL` (:2056) — game build, so the D-log's "game-build hook" is right (the `#else /* !SFCTOOL */` after :2082 is C's own confusing label for the tool-side externs, read both sides). 0 C refs (csym) — no wiring owed ✓. Sibling `nh_sfconvert` (`(filename, 0, false)`) is the exact FALSE mirror ✓. C-order placement right after the sibling ✓. (D-log cites :2079–2082; csym starts :2078 — the `void` line, trivial.) No RNG. Required sym output (sole callee, same-file local):

```text
doconvert_file   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/files.js:2341
```

(C staticfn → correctly module-local; the "clone" flag is sym's stock wording for same-file locals, not drift.)

## Hallucinations / overclaim

None. "0 C call sites", "same-file call, no new import or clone", and the D-3389 callee attribution all check out.

## Density

One 1-line function (+12/−1) — far below bar, but the exception holds: parent queue (8 unchecked rows) held exactly one files.c row (this head), and the sole callee was already live, so neither same-file growth nor callee growth existed; opening a second C file is explicitly out (playbook §2a). Verified from `git show 7636db97b~1:docs/LOOP-QUEUE.md`. The D-log should have stated the exception (2339-norm) — nit only. One `Ledger:` entry. Compliant-thin.

## Verification

Re-measured (`verify nh_sfunconvert --base 7636db97b~1 --reach-all`): 0 blocked + vacuous note + REACH-OK — matches the D-log. Verbatim:

```text
smoke nh_sfunconvert: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
```

D-log shows green/strict/cohort gates (no full — single non-shared file change; verify decides full, consistent). Parent-queue proof for the Density exception: `git show 7636db97b~1:docs/LOOP-QUEUE.md` holds 8 unchecked rows, exactly 1 files.c (this head) — same-file growth impossible. Diff grep: no FORCE/DIAG/RNG-log/fastforward/seed hits. Rule #2: clean (iteration-wide run).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
