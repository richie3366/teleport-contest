# Review 2962 — 0c219c110 — goto_level reruns oinit() after getlev

- SHA: `0c219c110` (cliff, live-queue owner `pluslvl`, second of its 2 rows;
  writer = do.c goto_level :1713)
- D-entry: D-4122; Ledger: oinit ported; goto_level ported
- `js/` diff: `js/do.js` +3/−1, `js/o_init.js` +7, `js/mklev.js` +1/−7

## Intent vs deliverable

Promise: when the hero returns to a visited level, goto_level reruns
`oinit()` after getlev ("reassign level dependent obj probabilities").
JS skipped it, so GEM_CLASS odds stayed those of the last newly made
level. A random death drop on revisited Mines 4 rolled a citrine where
C's same roll gives a red gem. Diff: oinit moves from a mklev.js local to
o_init.js, its C home, as an export. mklev.js imports it, and goto_level's
revisit arm calls it right after `close_nhfile`. The comment that called
the call "pre-existing, no counterpart" is gone. Promise = diff.

## Inventory

- `oinit` — o_init.js:116; C o_init.c:368–372 (`setgemprobs(&u.uz)`).
- `goto_level` revisit arm — do.js:2123–2124; C do.c:1702–1714.
- C callers (`csym --callers oinit`): do.c:1713, mklev.c:1264,
  sp_lev.c:6007. JS callers: do.js:2124 (new), mklev.js:29134 (makelevel),
  mklev.js:2391 (sp_lev :6007). All three are wired.

## C ↔ JS fidelity

```c
reseed_random(rn2);
reseed_random(rn2_on_display_rng);
getlev(nhfp, svh.hackpid, new_ledger);
close_nhfile(nhfp);
oinit(); /* reassign level dependent obj probabilities */   /* :1713 */
}
reglyph_darkroom();                                          /* :1715 */
```

JS has the same order: getlev, close_nhfile, oinit, then the shared
reglyph_darkroom join. oinit is C's one-line body over the existing
`setgemprobs(dlev)` (ledger_no-dependent zeroing of the first
`9 − lev/3` gem probabilities, o_init.c:54–81, not changed here).
setgemprobs draws no RNG. The change is only to the oc_prob table that
later mkobj(RANDOM_CLASS) rolls index, which is what the session measured
(same RNG, different gem). Moving oinit into o_init.js removes a
file-local wrapper and leaves one export (`sym.mjs oinit`: one definition).

## Hallucinations / overclaim

None. The D-log Measurement (CITRINE o_id 381 from xkilled_treasure_drop
on dnum 2 / dlevel 4, last fresh level elsewhere) gives the mechanism.

## Density

One dropped C call plus the move to its C home: the right size.

## Verification

```text
verify pluslvl (--base 0c219c110~1): 0 blocked at the parent's board
  (vacuous here: the board at 1b20d976e predates the pluslvl rows being
  re-scored; Review 2961's verify --base 067c831df~1 shows
  scen-shop-Priest-49959522 PASS on HEAD, this SHA's row)
verify goto_level / oinit: 0 blocked (vacuous)
```

The D-log's own isolation run (`ps_test_runner` 807/807 with the change,
790/807 stashed) is the per-SHA evidence, and the 2961 re-measure
confirms the PASS on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
