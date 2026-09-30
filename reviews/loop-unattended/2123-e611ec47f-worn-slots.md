# Review 2123 — e611ec47f — worn slots

SHA `e611ec47f`, D-3163; 2026-09-30. Historical code tested in detached
worktree. No prior-review closure claimed.

## Intent vs deliverable

Subject promises “wornmask_to_armcat + allunworn”. Diff adds both exports
and W_ARMOR import (+55 JS lines).

## Inventory — wornmask_to_armcat

Whole leaf; no helpers or C callers (`csym --callers`: 0).

## C ↔ JS fidelity — wornmask_to_armcat

C worn.c:217–246: zero category, mask by W_ARMOR, seven exact slot cases in
identical order, no default, return category. JS preserves multi-bit
rejection. No RNG.

## Inventory — allunworn

Whole leaf; sixteen slot names implement the worn[] table, not a helper
clone.

## C ↔ JS fidelity — allunworn

C worn.c:187–201 clears twoweap before nulling pointers without touching
owornmask; JS matches worn.c:18–34 slot order. Sole caller is actually
save.c:820 in saveobjchn, guarded by release_data(nhfp) and is_invent
(:817–821), not savegamestate as D-log claims. Binary teardown omission is
named. No RNG.

## Hallucinations / overclaim

Caller function name is inaccurate; caller locus and omission are valid. No
stub dispatch. No deleted/re-pointed symbols. Diff anti-pattern scan empty;
scored-tree Rule #2 clean.

## Density

wornmask_to_armcat: ACCEPT; Ledger: ported. allunworn: ACCEPT; Ledger:
ported. Two whole same-file functions; short-cluster exception documents no
further measured Open gap. Individual Verify bullets include vacuous notes
and REACH-OK, green/strict/cohort.

## Verification

Re-run on this SHA: `verify wornmask_to_armcat,allunworn --base e611ec47f~1
--reach-all`:

```text
verify wornmask_to_armcat: 0 blocked
smoke wornmask_to_armcat: 24 PASS, 0 regressed → REACH-OK
verify allunworn: 0 blocked
smoke allunworn: 24 PASS, 0 regressed → REACH-OK
```

No corpus movement claimed; smoke does not prove teardown reach.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
