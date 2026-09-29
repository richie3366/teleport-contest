# Review 2056 — 1a48fe148 — validspecmon + isspecmon cham-form gate (D-3096)

Metadata: SHA `1a48fe148`, D-3096, 2-function mon.c cluster.
js/makemon.js (+32/−2). (Follow-up `773e13c9a` is ledger-sha +
CURRENT only — no js/, not a separate review.)

## Intent vs deliverable

Promise: add the missing isspecmon arm to validspecmon (notake /
nohead reject for specmon polymorph candidates) + new file-local
isspecmon. Diff delivers exactly that (+2 imports on the existing
monsters.js edge). Promise kept.

## Inventory (per function)

- `isspecmon` (NEW file-local js/makemon.js:1241): isshk/ispriest/
  isgd → true; else nonzero-guarded leader m_id match. No callees.
- `validspecmon` (restarted :1252, file-local like C's staticfn):
  NON_PM → true; !accept_newcham_form → false; isspecmon arm with
  mons(mndx), inlined notake, !has_head short-circuit. Callees:
  accept_newcham_form (file-local, pre-existing), isspecmon (this
  commit), mons/has_head/M1_NOTAKE (live monsters.js imports).
  notake is mondata.h macro `#define notake(ptr)
  (((ptr)->mflags1 & M1_NOTAKE) != 0L)` — inlining is correct, no
  export exists to import. No stubs; no deleted symbols.

## C ↔ JS fidelity (per function)

validspecmon (C mon.c:4990–5011): NON_PM ✓; accept gate ✓
(truthiness pre-established); isspecmon arm ✓;
`(mflags1&M1_NOTAKE)` truthy ≡ `!=0L` ✓; live has_head ≡ C
macro `((mflags1&M1_NOHEAD)==0)` (verified js/monsters.js:367)
✓; short-circuit order ✓; comments verbatim incl. msound ✓;
trailing TRUE ✓. No RNG. Confirm.

isspecmon (C mon.c:4982–4987): field arms ✓; leader arm adds a
nonzero guard (`!!lid && m_id===lid`) over C's raw `==`. PROVED
behavior-preserving: C idents start at 2 (allmain.c:773, "id 1
reserved"), youmonst.m_id=1 both sides (polyself.c:44 /
polyself.js:803), JS next_ident stream ≥1 — no live mon carries
m_id 0 either side, so the guard only differs where C has no
live input (restore.c:1519's `m_id=0` is transient bones
handling, never a live mon). C's own mon.c:554 does the raw
comparison in a macro; the guard matches the established
mhitm.js precedent. Confirm.

Callers: validspecmon C sites :5032 (validvamp) / :5219
(select_newcham_form loop) ≡ JS :1285 / :1484 ✓ (unchanged lines,
verified present). isspecmon sole C caller :5001 ≡ JS :1255 ✓.

`sym.mjs` output (Method §3 — no deletions; note the mislabel):

```text
has_head         js/monsters.js:367   sync
M1_NOTAKE        js/monsters.js:143   sync   export const
mons             js/monsters.js:203   sync
validspecmon / isspecmon: "NOT EXPORTED — LOCAL CLONE" — wrong:
C declares both staticfn; file-local JS is the faithful shape.
```

## Hallucinations / overclaim

None. The "no live mon carries m_id 0" claim re-proved from both
sides' ident init above (the D-log asserted it; it holds).

## Density

One C file, 2 whole functions, closure ported ✓. `Ledger:` both
ported ✓. Per-function: both ACCEPT → SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify validspecmon,isspecmon --base
  1a48fe148~1 --reach-all`: both `0 blocked (0/0)` + `smoke
  24/24, 0 regressed → REACH-OK`. Matches; honestly vacuous.
- Ban-grep: 0. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
