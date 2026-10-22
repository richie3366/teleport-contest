# Review 3054 — 4498679f7 — doseduce's refused-payment line uses noit_mhim

- SHA: `4498679f7` (cliffs head `pronoun_gender`:
  scen-hallu-Healer-52850063 step 1086)
- D-entry: D-4214; Ledger: doseduce ported
- `js/` diff: mhitu.js +4 −4

## Intent vs deliverable

Promise: C doseduce's refused-payment line is `pline("%s demands that
you pay %s, but you refuse...", noit_Monnam(mon), noit_mhim(mon))`.
noit_mhim is pronoun_gender(PRONOUN_NO_IT | PRONOUN_HALLU), which draws
rn2(4) while the hero hallucinates. JS hard-coded `mon.female ? 'her' :
'him'`, so it skipped that draw and every later draw was off by one.

Diff: `noit_mhim` added to mhitu.js's existing mondata.js import, and
the template string now calls `noit_mhim(mon)`. The promise matches the
diff.

## Inventory

- doseduce — mhitu.js:1201 (C mhitu.c `:1984–2305`); one arm changed
  (C `:2264–2266`).
- Callee re-pointed from an inline ternary to an import:

```text
noit_mhim        js/mondata.js:1264   sync
```

  It is LIVE: `genders[pronoun_gender(mtmp, PRONOUN_NO_IT |
  PRONOUN_HALLU)].him`, which matches you.h `:328–329` exactly.
- No symbol deleted.

## C ↔ JS fidelity

C mondata.c pronoun_gender `:1188–1207`:

```c
if (hallu_rand && Hallucination) return rn2(4); /* 0..3 */
if (!override_vis && !canspotmon(mtmp)) return 2;
if (is_neuter(mtmp->data)) return 2;
return (humanoid(mtmp->data) || (mtmp->data->geno & G_UNIQ)
        || type_is_pname(mtmp->data)) ? (int) mtmp->female : 2;
```

JS mondata.js:1227–1237 has the same branches in the same order: hallu
rn2(4), override_vis/canspotmon, neuter, then humanoid/G_UNIQ/pname
gives female or 2. With NO_IT, the canspotmon arm is skipped in both.

- Hallucinating: C draws rn2(4) and picks he/she/it/they; JS now does
  the same. That is the measured draw (`rn2(4)=1 @ mondata.c:1200`).
- Not hallucinating: the old ternary gave the same text for the usual
  seducers (incubus/succubus/amorous demon are humanoid and not neuter).
  The fix also covers a non-humanoid seducer (a polymorphed or
  shapechanged monster with AD_SSEX), where C prints «it». The old
  ternary could never do that.
- Argument order: pline's arguments are noit_Monnam(mon) and then
  noit_mhim(mon). Under hallucination noit_Monnam can itself draw
  (rndmonnam). The JS template evaluates left to right. The recorded
  session passes RNG 12331/12331 after the fix, so the recorder build's
  order matches this one at this site.
- The rest of doseduce was checked for other inline pronouns. The
  headache line uses `mhe(mon)` (C `:1996`). `fem` is
  `PM_AMOROUS_DEMON && Mgender == FEMALE`, and monst.h:268 defines
  Mgender as `female ? FEMALE : MALE`. «sweet lady / nice guy» reads
  `flags.female` (C `:2142`). No other hard-coded gender is left in the
  function.

## Hallucinations / overclaim

None. The D-log's «Named omissions» calls out two local mhis clones in
other files (monmove.js `:1222–1233`, mhitm.js mhis_disp at :2228,
which sym.mjs confirms is file-local). They are not touched here and are
listed honestly as out of scope. They are clone drift in the sense of
Method step 3 (mhis_disp lacks pronoun_gender's canspotmon and
type_is_pname arms). No corpus row blocks on them now, so they belong in
an Open row if a cliff reaches them, not on this SHA.

## Density

One cliffs-head owner, one call site, one RNG draw restored. It is
small, but it is the whole C arm, and the owner row moved to PASS.
Right-sized for a cliff.

## Verification

```text
verify pronoun_gender,doseduce --base 4498679f7~1 --no-reach
  verify pronoun_gender: 1 session(s) blocked (1 at baseline)
    scen-hallu-Healer-52850063: PASS
  verify pronoun_gender: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  verify doseduce: 0 blocked (vacuous: the board names pronoun_gender)
```

The diff has no seed, step or coordinate reads. Rule #2 is clean (see
review 3053; this diff adds a `./mondata.js` import only). The D-log
lists green 2/2, strict ×2, cohort 7/7, full 44/44 and sweep 709/709
REACH-OK. The re-measure matches.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
