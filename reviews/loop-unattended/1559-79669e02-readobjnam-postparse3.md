# Review 1559 — 79669e02 — `objnam.c` readobjnam_postparse3 whole-body port (D-2600)

- Commit: `79669e02` (2026-09-20) — "`objnam.c` readobjnam_postparse3 whole-body port (wish srch: Japanese / armor-retry / spinach / gated spellings) (D-2600)."
- Queue row: coverage gap (wish `srch:` arms missing).
- JS touched: `js/readobjnam.js` (249-line hunk), `js/objnam.js` (+17 export).

## Intent vs deliverable

Subject promises the whole postparse3 body with C return codes + caller loop rework. Diff actually delivers: exported `readobjnam_postparse3(d)` (codes 0/2/6), new `japanese_otyp_by_name` export, deleted inlined subset replaced by `srch:`/`retry:` loop, two named omits. Promise matches diff.

## Inventory

New exports: `readobjnam_postparse3`, `japanese_otyp_by_name`. Reworked: `readobjnam` srch/retry loop. Deleted: old inlined gem/namedesc/fruit/artifact subset (all arms preserved in the new function — verified below). No other symbols deleted (`sym.mjs`: `readobjnam_postparse3 js/readobjnam.js:1102 sync`, `japanese_otyp_by_name js/objnam.js:3639 sync`, `artifact_name js/artifact.js:1029 sync` — all resolve; readobjnam→objnam edge pre-existing).

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/objnam.c:4726–4899` (csym; body `:4731–4898`). Sole caller `readobjnam` `srch:` `:4958–4967`.

Arm-by-arm confirm:

- Gem real-names + "tin" (`:4732–4748`): `game.bases[GEM_CLASS]..LAST_REAL_GEM` + generated `objectNameStrs` (≡ `OBJ_NAME`, `objclass.h:190`) with strcmpi, then "tin"→TIN — exact, return 2.
- namedesc chain (`:4749–4759`): four `rnd_otyp_by_namedesc` calls with `||` short-circuit, `d.typ` assigned on each, `d.typ = 0` after (`:4760`) — exact. Pointer→value guard change (`dn`/`origbp` `!==` by value): RNG-safe, proven — C draws `rn2(maxprob)` only `if (n > 0 && maxprob)` (objnam.c `:3552`, hit-only; miss draws nothing), and a same-content redundant call can only reproduce the already-observed hit (which short-circuits) or miss (no draw). `d.un` stays unconditional like C; JS `rnd_otyp_by_namedesc` null-guards (`if (!name)`, covering C `:3467–3468`) — the `d.un` NULL note holds.
- Japanese walk (`:4762–4772`): `japanese_otyp_by_name` walks all 13 C `Japanese_items[]` entries in order (verified 1:1, plus terminator excluded), case-insensitive, otyp-or-0; `if (jtyp)` ≡ C (real items nonzero). New arm, exact. Scratch probe `tanko → 2/PLATE_MAIL` confirms the arm fires.
- Armor retry (`:4773–4781`): `oclass==ARMOR && strstri(bp,"mail")==null → bp += " mail"`, return 6 — exact (`strstri` returns null on no-match, `js/hacklib.js:298–305`).
- Spinach (`:4782–1786`... `:4782–4786`): strcmpi + contents=TIN_SPINACH + typ=TIN, return 2 ✓.
- Fruit (`:4805–4870`): prefix-strip loop (an/a, digit-gated-on-!cntf, blessed/cursed/uncursed/partly/partially, else break; digit arm's slice+continue ≡ C `l=0` + fall-through `fp+=0`) ✓; case-sensitive exact/singular/plural match (strcmp, not wishymatch — grapefruit/grape comment cited) ✓; blessed/iscursed/uncursed/halfeaten/cnt (`2→1`, `3→2` when !cntf)/ftype=fid ✓, return 2. Carried over from the deleted inline verbatim in behavior.
- Artifact-name (`:4872–4881`): `!oclass && actualn` + `artifact_name(actualn, out, TRUE)` → name/typ ✓.
- Alt spellings (`:4883–4896`): `oclass && !typ` + class-gated `wishymatch(bp, sp, TRUE)` over the extractor table (46/46 resolve, `N_ALT_SPELLINGS = 46`, generated — sanctioned path) ✓.
- return 0 ✓.

Caller loop vs C `:4947–4967`: `for(;;){ rc3; if (rc3!==6) break; rc2 = postparse2; if (rc2===3) return otmp; if (d.typ) break; }` — case 6 → retry(postparse2) → {3: return otmp; typ-set: typfnd; 0/1-unset: srch} exactly mirrors the C retry-switch (case 0 fall-through and case 1 both reach srch; JS postparse2 provably returns only 0/1/2/3, so retry cases 4/5 are unreachable). Postparse3 provably returns only 0/2/6 (only those literals in the body), so the srch-switch cases 1/3/4/5 are unreachable too. Deleted-subset audit: old inline covered gem/tin/namedesc/fruit/artifact — every arm present in the new function with identical first-hit-wins semantics (old `break`/guarded-ifs ≡ new early `return 2`s).

Callee closure: all LIVE (namedesc, Japanese helper, wishymatch, makesingular/makeplural, artifact_name, game tables). No stubs. Named omits (`postparse1 grey-spell`, `d.un` NULL) are accurate and map-owned.

## Hallucinations / overclaim

None. The RNG-safety argument for the guard change is proven from C draw placement, not asserted.

## Density

Whole staticfn + caller loop, 2 files, 177 insertions — right-sized breadth work.

## Verification

- Banned-pattern grep: 0. RNG use is C-ordered (`rn2` inside namedesc on hits only; glass `rn2` untouched in postparse2).
- Re-ran here: `hidden-proxy.mjs verify readobjnam_postparse3 --base 79669e02~1 --reach-all` → 0 blocked at parent (vacuous note, pre-stated) + smoke 24/24 REACH-OK. Matches D-log.

## Cited evidence

C gems + namedesc chain (`objnam.c:4732–4760`, verified against `js/readobjnam.js:1105–1138`):

```c
/* check real names of gems first */
if (!d->oclass && d->actualn) {
    for (i = svb.bases[GEM_CLASS]; i <= LAST_REAL_GEM; i++) {
        const char *zn;

        if ((zn = OBJ_NAME(objects[i])) != 0 && !strcmpi(d->actualn, zn)) {
            d->typ = i;
            return 2; /*goto typfnd;*/
        }
    }
    /* "tin of foo" would be caught above, but plain "tin" has
       a random chance of yielding "tin wand" unless we do this */
    if (!strcmpi(d->actualn, "tin")) {
        d->typ = TIN;
        return 2; /*goto typfnd;*/
    }
}

if (((d->typ = rnd_otyp_by_namedesc(d->actualn, d->oclass, 1))
     != STRANGE_OBJECT)
    || (d->dn != d->actualn
        && ((d->typ = rnd_otyp_by_namedesc(d->dn, d->oclass, 1))
            != STRANGE_OBJECT))
    ...
    return 2; /*goto typfnd;*/
d->typ = 0;
```

C hit-only draw (`objnam.c:3550–3554`, the RNG-safety proof for the pointer→value guard change):

```c
if (n > 0 && maxprob) {
    prob = rn2(maxprob);
    ...
    return validobjs[i];
}
return STRANGE_OBJECT;
```

A miss draws nothing in C (and in JS: `rn2(maxprob)` only under `valid.length > 0 && maxprob`), so skipping a redundant same-content call removes no draw; a hit short-circuits the `||` chain in both versions.

C `srch:`/`retry:` switches (`objnam.c:4946–4967`, verified against the JS `for(;;)` loop at `js/readobjnam.js:1508–1514`):

```c
retry:
    switch (readobjnam_postparse2(&d)) {
    default:
    case 0: break;          /* falls through to srch: */
    case 1: goto srch;
    case 2: goto typfnd;
    case 3: return d.otmp;
    case 4: goto any;
    case 5: goto wiztrap;
    }

srch:
    switch (readobjnam_postparse3(&d)) {
    default:
    case 0: break;
    ...
    case 6: goto retry;
    }
```

JS postparse2 provably returns only 0/1/2/3 (only those literals at `:1047/:1058/:1068/:1082/:1093`) and postparse3 only 0/2/6 — so retry cases 4/5 and srch cases 1/3/4/5 are unreachable, and the JS loop (`6 → postparse2 → {3: return; typ-set: break; else: loop}`) covers every reachable C edge.

Tables: all 13 C `Japanese_items[]` entries present in order in `JAPANESE_ITEMS` (verified 1:1, terminator excluded); `N_ALT_SPELLINGS = 46` (extractor-generated, all resolve). Deleted-subset audit: old inline covered gem/tin/namedesc/fruit/artifact — every arm present in the new function with identical first-hit-wins semantics.

Tool outputs pasted (required):

```
$ node scripts/sym.mjs japanese_otyp_by_name
japanese_otyp_by_name js/objnam.js:3639   sync
$ node scripts/sym.mjs readobjnam_postparse3
readobjnam_postparse3 js/readobjnam.js:1102   sync
$ node scripts/sym.mjs artifact_name
artifact_name    js/artifact.js:1029   sync
$ node scripts/hidden-proxy.mjs verify readobjnam_postparse3 --base 79669e02~1 --reach-all
verify readobjnam_postparse3: baseline 79669e02~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke readobjnam_postparse3: no RNG-tagged reach; fixed smoke spread (24 run, 3.6s): 24 PASS, 0 regressed → REACH-OK
```

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
