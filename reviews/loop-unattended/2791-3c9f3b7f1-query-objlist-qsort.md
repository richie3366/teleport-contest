# Review 2791 — 3c9f3b7f1 — query_objlist price text + sortloot qsort order

- **SHA:** `3c9f3b7f1` (Wed 2026-10-14) — pickup-row writer (D-3938).
- **D-entry:** D-3938. **Ledger:** `pickup.c` + `invent.c` rows touched.
- **Diff size:** `js/invent.js` +41/−1 (new `glibc_qsort` + 1 call),
  `js/pickup.js` +7/−2 (two text sites), new 6-it test.
- **Method:** cliff commit (≤10 fns) — whole Method on both changes.

## Intent vs deliverable (promise vs diff)

The subject promises two writer fixes for the pickup-menu divergence:
(a) both `query_objlist_pickup` text sites render
`doname_with_price` (C :1137) instead of `doname`; (b) sortloot sorts
with a glibc-msort-pattern `glibc_qsort` instead of V8 `Array.sort`,
moving Barbarian-610017→PASS and Wizard-620021 722→763.

The diff does exactly that: no new modules, no import changes, one
new exported helper, one call-site swap, two text swaps. Promise and
diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | menu text `doname_with_price` ×2 (pickup.js:1791/1799) | pickup.c query_objlist :1024–1216, text :1137 | whole arm vs C |
| 2 | `glibc_qsort` (invent.js:2543) + sortloot call | invent.c sortloot `:592–643` (`qsort` :634); glibc 2.36 msort | verified vs real libc |
| 3 | `scripts/sortloot-qsort-order.test.mjs` (new, 6 it) | — | passes 6/6 (ran) |

No symbol deleted or re-pointed — no required re-point output.
`doname_with_price` was already imported (pickup.js:111) and used by
the live `query_objlist` (:881/:915): LIVE callee, zero new edges. ✓

## C ↔ JS fidelity

Menu text: C :1137 passes `doname_with_price(curr)` to `add_menu`;
the JS clone now calls it at both display sites. Exact. ✓

Sort: C :634 is libc `qsort` with `sortloot_cmp` (:402–547), whose
spe key is gated on **obj1's** otyp `oc_uses_known` only (:530–536,
verified in pinned C) — genuinely inconsistent, and the JS
comparator keeps the same asymmetric gate (invent.js:2500–2506),
untouched. ✓ The new `glibc_qsort` matches the msort pattern
(top-down, mid=(lo+hi)/2, take-left on cmp≤0). I verified it against
an **independent oracle**: real glibc 2.36 `qsort` (this machine, the
cited version) with the same parametric comparator — 2700 seeded
cases (2400 adversarial tied-key n≤14 + 300 n≤60), **0 mismatches**
(/tmp/qdiff{mjs,c}, throwaway). The "stable sort for consistent
inputs" claim holds (both sides stable ⇒ identical output), so only
inconsistent pairs reorder. The malloc-fallback named omit is the
genuinely unreproducible path. ✓

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (iteration-wide, SHA 2790).

## Hallucinations / overclaim

Prose nit only: the subject/D-log say 80000 differential cases, the
code comment says 60000 — the counts disagree (harness in /tmp,
unrerunnable). Substance confirmed by my own 2700-case differential
above. "query_objlist whole" is fair: both divergences (text + order)
shipped, pre-existing clone gaps named, not silently kept.

## Density

Cliff phase (§10.18): parent head was pickup 2/2296 (verified in
`3c9f3b7f1~1:docs/LOOP-QUEUE.md`), Must-fix empty. Writer pair ported
with movement on both probes; own Ledger rows; untouched arms named.
✓

## Verification

Re-measured myself (`--base 3c9f3b7f1~1 --reach-all --jobs 8`, current code):

```
verify pickup: 1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  (610017 PASS; 620021 moved → do_statusline2 at step 763, was 722)
smoke pickup: 24 PASS, 0 regressed → REACH-OK
verify sortloot: 0 blocked (vacuous, as the D-log discloses)
smoke sortloot: 24 PASS, 0 regressed → REACH-OK
```

The D-log's "1 PASS, 1 moved" reproduces exactly; the sortloot
vacuous-verify is disclosed in the D-log, not presented as a PASS.
No REGRESSED session.

## Actionable C-wrongs

None. Both arms C-exact, order proven against real libc, movement
and reach reproduce clean.

Verdict: **ACCEPT**
