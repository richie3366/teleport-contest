# Review 2593 — e54b702b5 — use_saddle Underwater gate

SHA: `e54b702b5` (D-3723). Underwater-idiom family residual, 1 gate,
`js/steed.js` only (+5/−1). Ledger: use_saddle ported
(D-2999/D-2328 stand).

## Intent vs deliverable

Promise: C short-circuits to Never_mind/ECMD_CANCEL for a
submerged hero applying a saddle (steed.c:46); JS read dead-false
sticky `u.Underwater` → gate reads live `(u.uinwater | 0)`. Diff
actually adds: the one-disjunct rewire + C-cite comment. Promise
matches diff.

## Inventory

- `use_saddle` (js/steed.js:272, async) ↔ C
  nethack-c/upstream/src/steed.c:35–139 (csym range), gate :46.

## C ↔ JS fidelity

C `:46` `if (u.uswallow || Underwater || !getdir((char *) 0))`
confirmed verbatim. JS now `if (u.uswallow || (u.uinwater | 0)
|| !(await getdir(null)))` — same three disjuncts in the same
short-circuit order (the `await` preserves position; getdir is
the last arm either side), same Never_mind + ECMD_CANCEL tail.
Underwater ≡ u.uinwater verified 2591. `sym.mjs use_saddle` →
`js/steed.js:272 ASYNC` — the canonical export, no clone, no
STUB, nothing deleted or re-pointed, no import. C caller is the
single apply.c:4301 site; untouched by this SHA (gate body
only).

## Hallucinations / overclaim

None. D-log states the vacuous hidden line alongside the real
14-session reach line.

## Density

One whole gate + focused test + ledger + verify on an empty
queue. Right-sized; successor lead (D-3724 dismount_steed)
named.

## Verification

Re-measured: `verify use_saddle --base e54b702b5~1 --reach-all`
→ 0 blocked (vacuous, as stated) + `reach use_saddle: 14
baseline-PASS session(s) reach it (14 run, 5.5s): 14 PASS, 0
regressed → REACH-OK`. Matches the D-log exactly. Rule #2
clean. Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
