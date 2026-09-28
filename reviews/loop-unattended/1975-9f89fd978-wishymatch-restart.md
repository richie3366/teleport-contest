# Review 1975 — 9f89fd978 — objnam wishymatch restarted whole

Metadata: SHA `9f89fd978` (D-3015). Scored diff: `js/readobjnam.js` only
(+111/−~25, restart). Subject promises: restart `wishymatch` whole from C
`objnam.c:3243–3338` (fuzzy + of-inversion + dwarvish/elven/helm/gauntlets/
detect/detection/ability/aluminum arms), delete the local `fuzzymatch`
clone for the hacklib export.

## Intent vs deliverable

Promise: all ten arms in C order against live exports, import joins on
existing edges, `!u_str || !o_str` guard removal (C NONNULL).
Diff actually adds exactly that. Promise kept.

## Inventory

- `wishymatch` (js/readobjnam.js:249, file-local — correct linkage: C
  `:3242–3338` is `staticfn`): restarted whole.
- Deleted: 2-arg local `fuzzymatch` clone. No other scored file touched.

## C ↔ JS fidelity — verdict: exact-C per arm, ACCEPT

Walked against `nethack-c/upstream/src/objnam.c:3242–3338` (csym range):

- Fuzzy head + `retry_inverted` of-inversion (`:3254–3275`): `strstri`
  tail semantics exact — `u_of.slice(4)` ≡ `u_of+4`,
  `copynchars(u_str, u_str.length - u_of.length)` ≡ `(u_of - u_str)`,
  newline-stop preserved via live `copynchars`. Confirm.
- dwarvish/elven (`:3281–3288`): case-SENSITIVE `strncmp` on `o_str` →
  JS `slice ===` ✓; case-insensitive `strncmpi` prefixes on `u_str` ✓;
  slices 8/9, 7/6, 6/6 ✓.
- helm/gauntlets (`:3289–3297`): `BUFSZ-1` / `BUFSZ-1-3` caps ✓,
  `strsubst` reassigned ✓, recursion forced `TRUE` ✓.
- detect (`:3298–3311`): `!*(p+10)` tail-to-end → `p.length === 10` ✓;
  `*p='\0'` truncation → immutable `head` slice ✓;
  `strcmpi(head,"monster")` → `strncmpi(head,'monster',-1)` (global.h
  `strcmpi` macro) ✓; `*p=' '` restore subsumed (no mutation) ✓.
- detection inverse (`:3312–3323`): `strncmpi(…,7)` gate ✓,
  `makesingular` ✓, `maybereleaseobuf(p)` for `releaseobuf` with order
  preserved (GC no-op, named) ✓.
- ability (`:3324–3332`): exact-head `slice` — C uses `strncpy`, not
  `copynchars`, and the port honors that — plus trailing check
  `p.length === 9` ✓.
- aluminum (`:3333–3337`): case-sensitive `===` for `o_str` (`!strcmp`)
  ✓, full `strncmpi(-1)` for `aluminium` (`!strcmpi`) ✓, `slice(9)` /
  `slice(8)` ✓.
- One if/else-if chain with fall-through-to-FALSE (`:3328…:3338`); the
  `:3277–3280` note about missed-prefix fall-through is preserved.
- Removed `!u_str || !o_str` guard is sound: C is NONNULL, null
  normalizes to `''`, empties fall through to FALSE.
RNG: none in C body, none added.

### Callee closure — all LIVE

Required `sym.mjs` outputs (deleted clone → re-point check):

```text
fuzzymatch       js/hacklib.js:356   sync     (readobjnam clone gone)
copynchars       js/hacklib.js:246   sync
maybereleaseobuf js/objnam.js:3979   sync
makesingular     js/objnam.js:1899   sync
```

Remaining `fuzzymatch`/`copynchars` clones (artifact.js:1136,
topten.js:55) are pre-existing elsewhere, untouched by this SHA.
`fuzzymatch(s1,s2,' -',true)` ≡ C `(" -",TRUE)` (signature inspected:
`(s1, s2, ignore_chars = ' -_', caseblind = true)`). `strncmpi` body
matches C `:723–729` including the `n=-1` full-compare path (inspected).
`imports.mjs --can` ALREADY ×2 — no new edges. No stubs.

## Hallucinations / overclaim

None. D-log correctly scopes the old gap (12 vs 60 code L,
STRANGE_OBJECT consequence) and names the `eos` + `releaseobuf`
handling. Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate logic.

## Density

Breadth-phase: one whole function (60 C lines → ~100 JS lines with
cites), single file, no shared-file full-suite needed. Compliant; nothing
deferred except the two named buffer-idiom items.

## Verification

Re-measured (`hidden-proxy.mjs verify wishymatch --base 9f89fd978~1
--reach-all`):

```text
verify wishymatch: 0 session(s) blocked at baseline (vacuous, honest)
smoke wishymatch: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches D-log.

## Actionable C-wrongs

None.

Ledger: `wishymatch` ported, REACH-OK via smoke.
Verify lines: hidden vacuous (honest) + smoke + green/cohort per D-log,
re-run confirms.

Verdict: **ACCEPT**
