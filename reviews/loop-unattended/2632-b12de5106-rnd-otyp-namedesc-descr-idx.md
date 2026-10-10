# Review 2632 — b12de5106 — rnd_otyp_by_namedesc shuffled descr slots (D-3766)

Metadata. SHA `b12de5106` (2026-10-10), D-3766, parent
`702b46212`. js diff: `js/readobjnam.js` +4/−2 (two
lookups + comment) +
`scripts/rnd-otyp-namedesc-descr-idx.test.mjs` (new, 3
its). Ledger: `rnd_otyp_by_namedesc` ported (D-3766
prepended; range unchanged). Works its parent queue's
cliffs head (`mkmaze.c` migrate_orc, 1 blocked: 95348
— verified head of the parent queue @a50db7286).

## Intent vs deliverable

Promise (subject + D-log): 95348@408 kind=rng —
both sides inside the uncharged-ring `rn2(10)` arm
for the orc-captain's shiny ring, but C
short-circuited on a NAMED ring while JS fell to the
`!rn2(9)` tail: same flow, different picked otyp.
Cause: `rnd_otyp_by_namedesc` matched against
unshuffled `objectNameStrs[i]`/`objectDescrs[i]`
while C reads via `oc_name_idx`/`oc_descr_idx`
(shuffled at init). Fix: both lookups via the idx
fields.

Diff actually adds exactly the two indexed lookups.
Promise and diff match. No import change.

## Inventory

Changed JS (2 lookups in 1 function):

- rnd_otyp_by_namedesc name/desc match —
  `js/readobjnam.js:379/389`
  (`objectNameStrs[objs[i]?.oc_name_idx ?? i]`,
  `objectDescrs[objs[i]?.oc_descr_idx ?? i]`).
  C: `objnam.c:3493/3507` (`OBJ_NAME`/`OBJ_DESCR` —
  csym range `objnam.c:3454–3529` read) +
  `objclass.h:190–191` (macros read: `obj_descr[
  (obj).oc_name_idx].oc_name`, same for descr).

## C ↔ JS fidelity

**Lookups C-exact.** C `OBJ_NAME`/`OBJ_DESCR` are
pure idx indirections; JS now does the same over
`game.objects` (`objs`, `:361`). The idx fields are
live: `js/o_init.js:283` inits both to identity and
`:149–151` swaps `oc_descr_idx` in the shuffle —
the same shape every other site uses (D-log cites
objnam.js:765, artifact.js:1400). The `?? i`
fallback only fires pre-init (empty tables), where C
has no defined state either. `oc_name_idx` is never
shuffled in JS, so the name-side change is
behavior-neutral but macro-exact in form — correct
to ship together. Rest of the loop (wishymatch arms,
valid[]/maxprob accumulation, `rn2(maxprob)` pick)
untouched and already whole per D-3403.

**Callees:** none touched. No symbol deleted or
re-pointed, so no sym.mjs paste is owed. Callers
(shiny_obj → mklev.js:2540; wish paths) inherit the
fix; migrate_orc itself untouched (whole per D-2419,
read once).

**Test.** 3 its, rn2-independent single-match picks
per C `:3523–3526` shape; 0/3 pre-fix (stash-proven)
→ 3/3 is the authentic shape.

## Hallucinations / overclaim

None. Diff grep (FORCE / DIAG / getRngLog /
fastforward): zero hits. The "same upstream draws,
different valid[]" inference is sound: identical
shuffle draws + identical `rn2(maxprob)` with
different candidate sets splits exactly here.

## Density

Cliff-phase §2b: parent head migrate_orc, writer
shipped (not a symptom re-port). One cliff, one C
locus (`objnam.c:3493/3507` + `objclass.h:190–191`),
no bundling. Full gates ran (`--reach-all --full`
475/475 + 44/44 in the D-log tail).

## Verification

D-log Verify: migrate_orc 0 PASS + 1 moved
(408→seffect_enchant_armor@694), reach 5/5;
rnd_otyp vacuous + 80/80 spread; gates PASS.

Re-measured by this audit (`verify
migrate_orc,rnd_otyp_by_namedesc --base b12de5106~1
--reach-all`):

```text
verify migrate_orc: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Caveman-95348: PASS
reach migrate_orc: 5 baseline-PASS session(s) reach it (5 run, 6.5s): 5 PASS, 0 regressed → REACH-OK
verify rnd_otyp_by_namedesc: no corpus session is blocked on it at b12de5106~1 — […] vacuous […]
reach rnd_otyp_by_namedesc: 475 baseline-PASS session(s) reach it (475 run, 242.6s): 475 PASS, 0 regressed → REACH-OK
```

95348 reads PASS on HEAD code (later SHAs, incl.
D-3770, moved it past the D-log's 694 leg —
strictly later, not a contradiction). Full
non-spread reach on the writer: all 475, 0
regressed. The vacuous rnd_otyp line is honestly
labeled in the D-log (row cited migrate_orc's 1;
that session itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
