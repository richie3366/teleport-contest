# Review 1990 — 2972f3ad5 — objnam.c bare_artifactname whole + ch_ksound stale-retire (D-3030)

Metadata: SHA `2972f3ad5` (D-3030). Two-function cluster
(`bare_artifactname` restart + `ch_ksound` stale-retire, same
C file). Subject promises the non-artifact `xname` fallback
with live callees and no new import edge.

## Intent vs deliverable

Promise: restarted `bare_artifactname` whole in C order —
`artiname(oartifact)` with `The `→`the `, else `xname(obj)`;
`--can` reports the artifact→objnam edge ALREADY exists;
null-obj keeps the house `'something'`; `nextobuf()` named.
Diff actually adds exactly that (one `js/artifact.js` hunk,
25 lines). Promise kept.

## Inventory

- `bare_artifactname` (js/artifact.js:802, exported sync):
  restarted whole.
- `ch_ksound` (js/objnam.js:2129, local clone): untouched;
  ledger stale-retire only.
- No deleted symbols.

## C ↔ JS fidelity

### bare_artifactname — verdict: exact-C, ACCEPT

C (`objnam.c:2501–2515`, csym range) whole:

```c
if (obj->oartifact) {
    outbuf = nextobuf();
    Strcpy(outbuf, artiname(obj->oartifact));
    if (!strncmp(outbuf, "The ", 4))
        outbuf[0] = lowc(outbuf[0]);
} else {
    outbuf = xname(obj);
}
return outbuf;
```

JS walks both arms in C order. `artiname` is same-file
live (js/artifact.js:479) and returns `''` on out-of-range
index — matching C's `artiname()` fallback string copy, so
the D-log "`\"\"` on out-of-range" claim holds. `| 0` on
`oartifact` matches C `int`. The `The ` guard uses exact-case
`slice(0,4)` + first-char lower — identical to
`strncmp`+`lowc(outbuf[0])`. Else-arm calls the live `xname`
import (line 123, pre-existing — no new edge, verified in
tree). No RNG. `nextobuf()` elision named in the D-entry
(JS strings immutable; fresh string per call).

Null-obj: C is NONNULLARG1, so `'something'` is a JS-only
guard, honestly labeled as house convention (killer_xname),
not as C. Acceptable — no caller passes null.

### ch_ksound (stale-retire) — verdict: verified CLONE, ACCEPT

C (`objnam.c:3167–3191`, csym range): `*ch_k[]` table +
`strlen < 4 → FALSE` + case-insensitive suffix scan via
`BSTRCMPI` (short-base guard: `ptr < base` ⇒ no match).
JS clone (js/objnam.js:2117–2135): table identical
word-for-word (19 entries, same order); `length < 4` guard
present; `toLowerCase()+endsWith` ≡ case-insensitive
suffix compare, and a base shorter than a key returns
`false` from `endsWith` exactly like the `ptr < base` arm.
Sole C caller `:3003` wired at js/objnam.js:2297 with the
same `len >= 4` + `lowc == 'c'` gate. Stale-retire earned.

### Callee closure — verdict: ACCEPT

Brief lists no other C callees for either function.
`artiname`/`xname` LIVE, `nextobuf` OMIT (named, this
commit), `ch_ksound` verified CLONE. No stub in a live arm.

### Caller — verdict: wired, ACCEPT

`bare_artifactname` keeps its export name/signature, so all
17 C call sites' JS counterparts keep calling it; the
restart changed semantics (non-artifact now `xname`, not
`'something'`), which is the shipped fix. `sym.mjs`:

```text
bare_artifactname js/artifact.js:802   sync
artiname         js/artifact.js:479   sync
xname            js/objnam.js:1001   sync
ch_ksound        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/objnam.js:2129
```

Single definitions; the one clone is the C-matched staticfn
above, not drift.

### Imports — verdict: no new edge, ACCEPT

`xname` import pre-exists at js/artifact.js:123. No `--can`
needed (nothing re-pointed). Rule #2 clean repo-wide
(`imports.mjs --rulecheck`, this audit).

## Hallucinations / overclaim

None. The vacuous hidden note is labeled as such; the
`/tmp` probe is honestly a probe, not a corpus PASS.

## Density

Restart + verified stale-retire in one C file. Right-sized
(§2b: coverage singles ship small).

## Verification

Re-measured (`hidden-proxy.mjs verify
bare_artifactname,ch_ksound --base 2972f3ad5~1 --reach-all`):

```text
verify bare_artifactname: 0 session(s) blocked (vacuous, honest)
smoke bare_artifactname: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
verify ch_ksound: 0 session(s) blocked (vacuous, honest)
smoke ch_ksound: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches the pasted tail exactly.

## Actionable C-wrongs

None.

Ledger: `bare_artifactname` ported, REACH-OK via smoke.
Verify lines: hidden vacuous (honest) + smoke, both fns.

Verdict: **ACCEPT**
