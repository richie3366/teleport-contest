# Review 1756 — 5df2d266b — mhitm_ad_drst (D-2797)

- SHA: `5df2d266b` (`uhitm.c` mhitm_ad_drst whole-body port, D-2797)
- Files: `js/mhitm.js` (+100), `js/mhitu.js`, `js/uhitm.js` (split bodies deleted)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

**Addressed:** D-2802 `8af23c12b`

## Intent vs deliverable

Subject promises one `mhitm_ad_drst`: magic-cancellation first, then
you→mon (`!rn2(8)`, resist message, else `!rn2(10)` deadly or
`rn1(10, 6)`), mon→you (`hitmsg` then `poisoned(..., 30, FALSE)`),
else mon→mon (`!rn2(8)` then `mhitm_really_poison`). The three
dispatchers call it. Diff does that. `damageum_ad_drst`,
`mhitm_ad_drst_u`, and `mpoisons_subj_u` are gone.
`mpoisons_subj_mm` now reads `uwep` for youmonst.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `mhitm_ad_drst` | C body | `uhitm.c:3121–3165` |
| `mhitm_mgc_atk_negated` | imported | `uhitm.c:74–99` |
| `mpoisons_subj_mm` | local clone, matches | `mhitu.c:144–159` |
| `mpoisons_subj` | leftover local in `mhitu.js` | no youmonst `uwep` (named) |
| `resists_poison_mm` | **clone, bits only** | `Resists_Elem` `mondata.c:127–197` |
| `mhitm_really_poison` | local, matches | `uhitm.c:3103–3119` |
| `hitmsg` / `poisoned` | imported | live |
| `pmname` / `Mgender` | imported | `do_name.c` |

`csym --callers`: `uhitm.c:4811` via fallthrough of `AD_DRST` /
`AD_DRDX` / `AD_DRCO` (`:4809–4811`). JS: `mhitm.js:5198`,
`mhitu.js:3112`, `uhitm.js:2386`.

`sym.mjs` (deleted and re-pointed):

```
mhitm_ad_drst       js/mhitm.js:1860   ASYNC
damageum_ad_drst    NOT FOUND
mhitm_ad_drst_u     NOT FOUND
mpoisons_subj_u     NOT FOUND
mpoisons_subj       NOT EXPORTED — 1 LOCAL js/mhitu.js:1053
resists_poison_mm   js/mhitm.js:1816   sync
poisoned            js/attrib.js:403   ASYNC
hitmsg              js/mhitu.js:416    ASYNC
pmname              js/do_name.js:620  sync
Mgender             js/do_name.js:598  sync
mhitm_really_poison NOT EXPORTED — 1 LOCAL js/mhitm.js:1830
mhitm_mgc_atk_negated js/mhitm.js:2657 ASYNC
```

## C ↔ JS fidelity

Gate: `mhitm_mgc_atk_negated(..., false)`. A youmonst defender is
passed as null so the hero MC path runs. That helper returns true on
`magr.mcan` with no `rn2` (`:2659`). C skips `mcan` when the attacker
is youmonst (`uhitm.c:82–84`). `game.youmonst.mcan` is unset, so the
hero-attacker roll still happens. Then `rn2(10) >= 3 * armpro` is the
same test. `verbosely` is false, so no "avoids harm" line.

You→mon, only when `!negated && !rn2(8)`: "Your %s was poisoned!",
then `resists_poison_mm`. Resist prints the no-effect line and adds
no damage. Else `!rn2(10)` sets `damage = mhp` and "Your poison was
deadly...", else `damage += rn1(10, 6)`. One of those two rolls, not
both. Matches `:3130–3142` except the resist callee below.

Mon→you: `ptmp` is `A_STR`, then `AD_DRDX` → `A_DEX`, `AD_DRCO` →
`A_CON`. `hitmsg`, then `!negated && !rn2(8)` calls
`poisoned(reason, ptmp, pmname(pa, Mgender(magr)), 30, false)`.
`poisoned` (`attrib.c:316–408`) uses `Poison_resistance`, then
`rn2(fatal)` when `fatal` is non-zero. The call matches. G_UNIQ
killer polish inside `poisoned` is a pre-existing deferral
(`attrib.js:422`).

Mon→mon: `!negated && !rn2(8)` then `mhitm_really_poison`. That helper
uses `_mm_vis` (set in `mattackm` at `:5808`). Spot the attacker, then
resist message only when both are spotted, else `rn1(10, 6)` and
"The poison was deadly..." when the total reaches `mhp`. No second
`rn2(10)`. Matches `:3103–3119` except the resist callee.

`mpoisons_subj_mm` matches `mhitu.c:145–158`: youmonst weapon is
`uwep`, otherwise `MON_WEP`; `opoisoned` selects "weapon" vs "attack";
touch / gaze / bite / sting follow.

`resists_poison_mm` (`:1816–1821`) returns
`mresists | mextrinsics | mintrinsics` masked with `MR_POISON`.
C `resists_poison` is `Resists_Elem(mon, POISON_RES)`
(`mondata.c:127–197`): those bits, then a wielded artifact that
`defends`, then worn or carried `oc_oprop`, an alchemy smock, and
`defends_when_carried`. The you→mon arm and `mhitm_really_poison`
both call this clone. A smock or a poison-defending artifact does not
resist. The subject names the gap. A clone that returns the wrong
answer is a C-wrong, not an omit.

## Hallucinations / overclaim

The three arms and the three call sites are real. `AD_DRDX` /
`AD_DRCO` were not in the old `damageum_ad_drst` (AD_DRST only); they
are in this body, matching the C fallthrough. "Whole-body" still
routes monster resistance through the bit test.

## Density

The 45-line function is one body, and the mon→mon arm is wired. The
resist callee in two live arms is the partial clone.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify mhitm_ad_drst --base
5df2d266b~1 --reach-all`. Parent board is the 12-row file (stamp
field `5f09ad2ca`):

```
verify mhitm_ad_drst: baseline 5df2d266b~1 (scoreboard at 5f09ad2ca, 2026-09-25T19:38:12.412Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mhitm_ad_drst: no corpus session is blocked on it at 5df2d266b~1 — a vacuous verify is NOT a corpus PASS. …
smoke mhitm_ad_drst: no RNG-tagged reach; fixed smoke spread (12 run, 4.4s): 12 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session. D-log "smoke 12/12" is that board.

## Actionable C-wrongs

1. `resists_poison_mm` must follow `Resists_Elem` (`mondata.c:127–197`)
   at both call sites in this function (you→mon and
   `mhitm_really_poison`): intrinsic bits, wielded `defends`, worn or
   carried `oc_oprop`, alchemy smock, `defends_when_carried`.

Verdict: **QUALITY-RISK**
