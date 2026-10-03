# Review 2347 — 4ea047f25 — repopulate_perminvent + only_here; 2339.1 falsified

**SHA:** `4ea047f25` — "`invent.c` repopulate_perminvent + only_here port; Must-fix 2339.1 falsified (D-3392)."
**Scope:** js/invent.js +58/−9 (1 export, 1 local, 1 restructure) + node:test ×5. Two functions, one C file.
**Prior reviews closed:** 2339 (stamped `**Addressed:** D-3392`, hash-less per rule — hash filled by D-3393 ✓).

## Intent vs deliverable

Promise: (a) falsify 2339.1 with git evidence (no js/), (b) port `repopulate_perminvent` via the `:3094` dispatch against live splits, (c) port staticfn `only_here` + rewire `display_binventory` to C shape. Delivered all three; the restructure deletes the stale `go.only coord filter` omit line. No drift.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | `repopulate_perminvent` js/invent.js:4377 (async export) | whole body via live splits (0 direct callees) | invent.c:3455–3460 |
| 2 | `only_here` js/invent.js:4564 (local; C staticfn) | whole body, 0 callees | invent.c:5476–5480 |
| 3 | `display_binventory` buried section :4607–4628 | C-shape restructure (count + set/filter/reset) | invent.c:5527–5543 |
| 4 | scripts/repopulate-only-here.test.mjs | headless test ×5 | — |

No deletion/re-point; no re-point sym owed. Callee sym: `display_pickinv_reply :3884 ASYNC` (awaited ✓), `pickinv_build_perm :3785` + `display_pickinv_wizid :4286` in-file locals (same-file D-1559 splits, not cross-file clones — no new edge). `game.only` has exactly 4 refs (def-use + set/reset), no conflicts.

## C ↔ JS fidelity

**2339.1 falsification — Correct.** At reviewed SHA `bec62f3b9`, `postmov` entry already reads `if (mmoved !== MMOVE_MOVED && mmoved !== MMOVE_DONE) return mmoved;` (verified in `git show bec62f3b9:js/monmove.js`), so the D-3384 call fires exactly on MOVED|DONE — review 2339's Actionable 1 (and its "whole tail unguarded" context) misread the entry guard. `:2355` NOTHING entries return at entry. Closing the row as falsified is right; the reverted redundant guard confirms it.

**repopulate_perminvent — Confirm with one inherited micro-gap (debt).** C body is a single `display_pickinv(NULL,0,0,FALSE,FALSE,0)`; with those args `:3084` usextra=FALSE and the `:3094` condition reduces to `wizid || WIN_INVEN==WIN_ERR` exactly as JS dispatches ✓. Cached branch mirrors `display_inventory`'s post-cmdq sequence (`:4382` reassign ≡ C `:3145–3147`, wizid→wizid-split else reply-split with `want_reply:false`) ✓. PERMINV branch mirrors `sync_perminvent`'s epilogue (flag set, `pickinv_build_perm` ≡ C `:3109–3112` prepare + invmode bits, entries/listed, flag clear) ✓. `in_sync_perminvent` is write-only in both languages on this path (C's only reader is the commented-out `:3096`) — neutral. **Gap:** C's `:3145–3147` reassign sits in the *shared* tail (fires in the PERMINV path too: n forced 2, no early return), but JS has it only in the cached branch — inherited from the D-1559 split (`sync_perminvent` :4855 lacks it as well). Latent here (0 callers both sides — C never calls this function), pre-existing in the live path. Debt item below, not Must-fix.

**only_here + binventory — Confirm.** `obj->ox == go.only.x && obj->oy == go.only.y` ≡ the `|0` triple-equals ✓ (`decl.h:721 coord only` ✓; `?.` undefined ≡ C zero-init). Restructure matches C order: count loop (`:5527–5533`, observe + n++) → `if (n)` set `:5536–5537` → filter `:5540–5541` → reset `:5543` → `return n+n2` ✓. Local (not exported) matches C staticfn + `worn_wield_only` precedent ✓. Sole callback site `:5541` wired ✓. No RNG anywhere.

## Hallucinations / overclaim

None. "0 C callers" confirmed via csym (0 refs); the brief's "no live callers" miss on the `:5541` function-pointer use is honestly disclosed. "TTY_PERM_INVENT holds a commented-out line only" verified (:3096).

## Density

Two whole functions, one C file, plus a zero-diff falsification (docs-only Must-fix bundled with a coverage cluster — no code interference, acceptable). One `Ledger:` entry per function. No Must-fix *code* bundled. Test ×5 included. Per-function verdicts: repopulate_perminvent ACCEPT-WITH-DEBT (PERMINV reassign gap, Actionable 1) · only_here ACCEPT.

## Verification

Re-measured (`verify repopulate_perminvent,only_here --base 4ea047f25~1 --reach-all`): both 0 blocked + vacuous note + REACH-OK — matches the D-log. Verbatim:

```text
smoke repopulate_perminvent: no RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS, 0 regressed → REACH-OK
smoke only_here: no RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS, 0 regressed → REACH-OK
```

Headless test re-run: 5/5 PASS. At-SHA guard proof (`git show bec62f3b9:js/monmove.js`): postmov entry `if (mmoved !== MMOVE_MOVED && mmoved !== MMOVE_DONE) return mmoved;` with the D-3384 call at :1878–1881 inside — the falsification is decisive. D-log shows green/strict/cohort/full gates. Diff grep: no FORCE/DIAG/RNG-log/fastforward/seed/coordinate hits. Rule #2: clean (iteration-wide run).

## Actionable C-wrongs

1. **repopulate_perminvent PERMINV arm lacks shared-tail reassign (C :3145–3147).** JS `:4382` reassign sits only in the cached branch; C fires it in both (n forced 2 in PERMINV, no early return). Latent (0 callers both sides) and inherited from the D-1559 split (`sync_perminvent` :4855 has the same shape — the live-path half needs its own brief before queuing). Fix in one iter: one-line reassign mirror in the PERMINV branch (or inside `pickinv_build_perm`) + `verify.mjs --fn repopulate_perminvent` incl. full (shared file). Map-named debt, not Must-fix. Source: reviews/loop-unattended/2347-4ea047f25-… (debt).

Verdict: **ACCEPT-WITH-DEBT**
