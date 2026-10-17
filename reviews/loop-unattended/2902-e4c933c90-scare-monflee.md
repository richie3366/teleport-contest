# Review 2902 — e4c933c90 — drinkfountain scare live monflee

- SHA: `e4c933c90` (cliff writer: 1 call site, rank-16 monflee)
- D-entry: D-4061; Ledger: fountain.c (`drinkfountain partial`,
  note + omit updated)
- `js/` diff: `js/fountain.js` +4/−9 (import + live call replacing
  the inline clone); new
  `scripts/drinkfountain-scare-monflee.test.mjs`

## Intent vs deliverable

Promise: case 29 stops inlining mflee/mfleetim/mtrack-zeroing
and calls live `monflee(mtmp, 0, false, false)` over fmon with a
DEADMONSTER-exact guard; Tourist-50150017 s320 → FULL PASS via
the restored vrock `rn2(25)`. Delivers exactly that. Promise =
diff.

## Inventory

- `drinkfountain` case 29 — fountain.js:930–941: guard +
  `await monflee(mtmp, 0, false, false)`. C: fountain.c:367–377.
- Import: `monflee` added to the existing `./monmove.js` import
  (ALREADY edge; `sym.mjs`: monmove.js:1118 ASYNC, awaited).
  LIVE callee — the deleted inline block was the CLONE.

## C ↔ JS fidelity

C (fountain.c:367–377):

```c
pline("This %s gives you bad breath!", hliquid("water"));
for (mtmp = fmon; mtmp; mtmp = mtmp->nmon) {
    if (DEADMONSTER(mtmp))
        continue;
    monflee(mtmp, 0, FALSE, FALSE);
}
```

JS is now line-identical in structure. Guard:
`DEADMONSTER(m) ≡ (m->mhp < 1)` (monst.h:214); JS
`(mtmp.mhp|0) < 1` — exact, and null-safe where the old
`mtmp.mhp <= 0` was not.

Callee audit (the point of the fix): C monflee (monmove.c)
does ustuck `release_hero`, the `!first || !mflee` gate,
fleetime-0 `mfleetim = 0`, the vrock arm `mspec_used = 75 +
rn2(25)` + `create_gas_cloud(mx, my, 5, 8)` (:521–523),
`mflee = 1`, and unconditional `mon_track_clear`. JS monflee
(monmove.js:1118–1162, pre-existing) carries every one of
these in C order — verified head (:468–475: DEADMONSTER
return, ustuck release, gate) and tail (:505–531: vrock,
mflee, track-clear) against C. The deleted clone skipped the
ustuck release and the vrock draw; the probe divergence (C
`rn2(25)=19 @ monflee` vs JS `rn2(3) @ dryup`) is exactly the
restored draw. RNG call-for-call on this arm now.

The board-rngM-vs-true-index note (16618 vs 16063, log-dump
verified) is measurement hygiene, honestly disclosed.

## Hallucinations / overclaim

None. The `VERIFY: FAIL solely on hidden-attribution` is
disclosed verbatim again (D-4060 precedent): the cliff
(`monflee`) is PROGRESS; `drinkfountain` shows the Foul-water
arm residual, a different arm.

## Density

Cliff writer (committed rank 16, first actionable past 17
re-verified dupe-rc kin + 95340) with FULL PASS on the owned
session. Whole-function holds for the arm. `Ledger:` accurate
— the old note ("JS monflee exists but is not called here")
predicted exactly this fix. Omit (1) verified true: uhitm.c
:4363/:4689 are `monflee(magr, …)` calls, the JS carriers are
`mhitm_ad_heal`/`mhitm_ad_sedu` (uhitm.c:4623–4748 port), and
js/mhitm.js has no monflee call (one comment mention only).

## Verification

Re-measure (`--base e4c933c90~1 --no-reach`):

```text
verify monflee: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Tourist-50150017: PASS
verify drinkfountain: 0 PASS, 0 moved past, 1 unchanged, 0 worse
  scen-shop-Wizard-50057049: still drinkfountain at 241
  C«The water is contaminated!--More--» J«»
```

Exact match — the residual is fountain.c:300 Foul-water, a
different arm in a different session, pre-existing at baseline.
Focused test 1/1 green. No FORCE/DIAG/seed strings. Rule #2
clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
