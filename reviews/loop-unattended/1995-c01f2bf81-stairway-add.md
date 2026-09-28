# Review 1995 — c01f2bf81 — stairs.c stairway_add whole (D-3035)

Metadata: SHA `c01f2bf81` (D-3035). Single-function cluster
(export promotion + C-order restart). Subject promises the
extern export with `|0`/`!!` coercions and
assign_level-exact `tolev`.

## Intent vs deliverable

Promise: restarted export (js/mklev.js:400) — memset-zero
fresh node, `|0` on x/y, `!!` on up/isladder (all readers
truthiness), `tolev` dnum/dlevel only, prepend. Diff adds
exactly that (one 20-line hunk). Promise kept.

## Inventory

- `stairway_add` (js/mklev.js:400, newly exported sync):
  restarted whole.
- No helpers, no deleted symbols.

## C ↔ JS fidelity

### Body — verdict: exact-C, ACCEPT

C (`stairs.c:7–24`, csym range) whole:

```c
stairway *tmp = (stairway *) alloc(sizeof (stairway));
(void) memset((genericptr_t) tmp, 0, sizeof (stairway));
tmp->sx = x; tmp->sy = y;
tmp->up = up; tmp->isladder = isladder;
tmp->u_traversed = FALSE;
assign_level(&(tmp->tolev), dest);
tmp->next = gs.stairs; gs.stairs = tmp;
```

JS mirrors every arm: fresh literal ≡ alloc+memset-zero;
`|0` ≡ `coordxy`; `!!` ≡ `boolean`; `u_traversed: false`
≡ FALSE. The `tolev` fix is the substance: the old body
spread `{...dest}` (caller's extra fields leaked in); the
new body copies `dnum`/`dlevel` only — exactly what
`assign_level` does. Prepend order preserved. No RNG.

`!!` safety verified, not assumed: every repo-wide reader
of `.up`/`.isladder` coerces before comparing
(`!!s.up === want` in mklev.js:445/454, dog.js:755/819,
teleport.js:1192–1193, potion.js:1763) or uses a ternary
(mklev.js:500) — no `=== 1` / `=== 0` reader exists that
the boolean coercion could break.

### Callee closure — verdict: ACCEPT

`assign_level` is a two-field macro, inlined exactly. No
stub, no clone, no omit in the body. The two restore.c
call sites (`:978` NHFILE loop + `u_traversed` fixup,
`:1252` castle fixup) are named in this commit as
getlev-row/restore work — correctly out of this function's
scope (they are callers, not arms).

### Caller — verdict: wired, ACCEPT

Export promotion matches C `extern` (extern.h:3101).
`sym.mjs`: single definition, `stairway_add
js/mklev.js:400 sync`. Live JS call sites cover the C
live callers (mklev builders for `:1736`/`:2193`, sp_lev
ladder arms for `:4198`/`:4205`, e.g. js/mklev.js:22697
passing `!!up`). No new module edge (same-file callers).

## Hallucinations / overclaim

None. The full-44/44 gate claim is plausible for a shared
file (mklev.js) and the re-measured REACH below
corroborates no regression.

## Density

One whole 18-line C function. Right-sized (§2b).

## Verification

Re-measured (`hidden-proxy.mjs verify stairway_add --base
c01f2bf81~1 --reach-all`):

```text
verify stairway_add: 0 session(s) blocked (vacuous, honest)
smoke stairway_add: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches the pasted tail.

## Actionable C-wrongs

None.

Ledger: `stairway_add` ported, REACH-OK via smoke.
Verify lines: hidden vacuous (honest) + smoke.

Verdict: **ACCEPT**
