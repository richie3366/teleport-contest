# Review 2279 — c944311a4 — music.c awakener a_monnam/Amonnam clone removals

- SHA: `c944311a4` (D-3323)
- Files: `js/music.js` only (~2 insertions / ~13 deletions)
- Insertions: below the ~80 bar; rewire-to-live shape

## Intent vs deliverable

Subject promises: "music.c awakener a_monnam/Amonnam clone removals
(re-queued — D-3322 mis-archived its refill unshipped)". The diff delivers
exactly that: extends the `do_name.js` import with both names, deletes
both clones, adds one C-cite comment per site. Site expressions unchanged.
No DIAG/FORCE/seed; Rule #2 clean (iteration-wide rulecheck).

## Inventory

- Two deleted clones (music.js:266-then `a_monnam`, :158-then `Amonnam`
  twin), one extended import. No new/changed bodies; live exports
  re-verified here.

## C ↔ JS fidelity

C `a_monnam` (do_name.c:1151–1156) re-confirmed: `x_monnam(mtmp,
ARTICLE_A, 0, has_mgivenname ? SUPPRESS_SADDLE : 0, FALSE)`. C `Amonnam`
(do_name.c:1158–1165): `*bp = highc(*bp); return bp` over `a_monnam`.
Live JS (do_name.js:1221/1234): exact wrapper + `highc_name(a_monnam(...))`
— C-exact. Both deleted clones passed suppress `0` always and invented an
`|| 'it'` fallback: named saddled monsters showed the saddle where C
suppresses it — two genuine C-wrongs, now fixed. Sites: :338 `You notice
… swaying with the music` ≡ music.c:124; :621 `%s is shaken loose from
the ceiling!` ≡ music.c:376. Required `sym.mjs` output (both re-pointed
symbols):

```
a_monnam         js/do_name.js:1221   sync
Amonnam          js/do_name.js:1234   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/fountain.js:197  js/mhitu.js:3261  js/teleport.js:101  js/zap.js:810
```

The 4 remaining `Amonnam` locals are pre-existing, out of row scope, and
untouched — not this SHA's debt. Nit (unqueued, no behavior):
`ARTICLE_A` in the music.js const import (:30) is now unused;
`SUPPRESS_SADDLE` is still used (:534).

## Hallucinations / overclaim

None. The "mis-archived refill" note is process-honest (D-3322 queued the
row but archived it; D-3323 re-queued and shipped it). "Named saddled
monsters showed the saddle" follows from the deleted suppress-0 call.

## Density

Two-function rewire; defended exception shape. `Ledger:` a_monnam +
Amonnam entries. Per-function Verify lines present.

## Verification

Re-measured (`hidden-proxy.mjs verify a_monnam,Amonnam --base
c944311a4~1 --reach-all`): both 0 blocked (vacuous; rows cited 0 blocks,
honestly noted) + smoke 24/24 each, 0 regressed → REACH-OK — the D-log
tail verbatim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
