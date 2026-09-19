# Review 1477 — ec68b067 — uhitm mhitm_ad_drli defended gap (D-2518)

Metadata: SHA `ec68b067`, `js/zap.js` + `js/uhitm.js` (2-line-class change). Coverage THIN → complete. NN 1477.

## Intent vs deliverable

Subject promises closing the last open predicate: `resists_drli` returning `false` instead of C's `defended(mon, AD_DRLI)` tail, plus mirroring C's disjunction at the uhitm caller. Diff actually does both and retires the two map "named omit" comments. Matches the promise; no scope creep.

## Inventory

Changed JS: `resists_drli` tail (`false` → `defended(mon, AD_DRLI)`); `damageum_ad_drli` guard gains `|| defended(mdef, AD_DRLI)`; `defended` joins the existing mondata import edge. No symbols deleted or re-pointed.

## C ↔ JS fidelity

Checked against pinned C `mondata.c:201–211` and `uhitm.c:2451/2495` (+ callers):

- `resists_drli` ends `return defended(mon, AD_DRLI)` (`:210`) — JS now exact; the old `return false` was the C-wrong. ✓
- The uhitm caller `!(resists_drli(mdef) || defended(mdef, AD_DRLI))` looks redundant (resists_drli now subsumes defended) but is C-verbatim (`uhitm.c:2451`) — mirroring C exactly, both pure predicates, no RNG effect. ✓
- Second C site `:2495` (mhitm arm) already carries the full disjunction at `js/mhitm.js:3720` (pre-existing) — both call sites now match. The mhitu arm's `Drain_resistance` form is the live split-name arm (D-1870), untouched. ✓
- Other `resists_drli` callers (`artifact.c:1052`, `exper.c:216`, `mhitu.c:2204`, `zap.c:529`) all benefit from the corrected tail with no call-site edits needed; none draw RNG inside the predicate, so no keystream shift.

Callee closure: `defended` LIVE (existing mondata edge, `--can` ALREADY). No clones, no stubs, no FORCE/DIAG/coords/seeds.

## Evidence detail

Full `resists_drli` caller list (`csym --callers`, 10 refs): `artifact.c:1052` (`!(yours ? Drain_resistance : resists_drli(mtmp))`), `exper.c:216` (`losexp` draining arm), `mhitu.c:2204` (hero drain check), `mondata.c:162` (plural-monster predicate), `polyself.c:77` (`PROPSET(DRAIN_RES, …)` — the polyself `resists_drli_you` local keeps its C-cited uwep-suppressed form per `:73`, unaffected by this change), `uhitm.c:2451` + `:2495`, `zap.c:529` (`bhitm` SPE_DRAIN_LIFE). All receive the corrected tail with no call-site edits; the predicate draws no RNG, so no keystream moves anywhere.

Both disjunction sites: `:2451` (uhitm `damageum_ad_drli` — this diff) and `:2495` (mhitm arm — pre-existing at `js/mhitm.js:3720`, verified present with the identical `!(resists_drli(mdef) || defended(mdef, AD_DRLI))` shape). The C redundancy (resists_drli already ends in defended) is preserved rather than "simplified" — correct call, since the task is to mirror C, and both predicates are pure.

Map-comment hygiene: the diff retires the "Named omit: defended(mdef, AD_DRLI) worn-item walk" lines on both `damageum_ad_drli` and `resists_drli` and updates the `bhitm` drain comment to "(defended AD_DRLI via resists_drli tail)" — no stale omit text left behind.

## Hallucinations / overclaim

None. "0 blocked" presented as a coverage gap; reach-8 reproduced below (real reach line, not smoke — stronger than claimed).

## Density

Minimal Must-fix-adjacent gap closure: two predicates, two modules, full-44 re-run. Appropriate.

## Verification

- Re-ran `hidden-proxy.mjs verify mhitm_ad_drli --base ec68b067~1 --reach-all`: 0 blocked (vacuous, correctly labeled) + reach 8 baseline-PASS sessions reach it, 8 PASS, 0 regressed → REACH-OK. Matches the D-log.
- D-log cites green 2/2, strict ×2, cohort 7/7, plus full 44/44.

## Actionable C-wrongs

None. (The sibling `defended(AD_COLD)`-style omits named in the message are other predicates' gaps, each needing its own coverage row — not this diff's scope.)

## Reach note

The reach-8 line is genuine reach (baseline-PASS sessions executing `mhitm_ad_drli`), not the fixed smoke spread used for RNG-untagged functions: 8 run, 8 PASS, 0 regressed. Combined with the D-log's full-44 re-run, this two-line predicate change is verified on both axes.

Verdict: **ACCEPT**
