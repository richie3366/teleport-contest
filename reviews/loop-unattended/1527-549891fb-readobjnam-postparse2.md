# Review 1527 — 549891fb — objnam.c readobjnam_postparse2 (D-2568)

## Metadata

- SHA: `549891fb`
- D-id: D-2568. Next index: 1527.
- Files: `js/readobjnam.js` (+114/−~6: `O_RANGES` + glass consts + exported `readobjnam_postparse2` + `retry:`-site wiring, 2 import joins).
- C locus: `nethack-c/upstream/src/objnam.c:4665–4724` (`readobjnam_postparse2`, 60 L; `csym.mjs` range), `o_ranges[]` `:3346–3363`, retry site `:4947–4955`, postparse1 wrp arm `:4567+`.

## Intent vs deliverable

Subject promises: whole-body port in C order with `:line` cites + wiring at the `retry:` site, with an honestly reported mid-iteration regression (unconditional wiring regressed 6 smoke + cohort seed0383; gated on `!classWord`; re-verify PASS). Diff delivers that. Promise matches deliverable.

## Inventory

- New: `readobjnam_postparse2(d)` (exported sync, `js/readobjnam.js:1041`), `O_RANGES` (19 rows), `FIRST/LAST/NUM_GLASS_GEMS`.
- Import joins (ALREADY-edges, `sym.mjs` confirmed live): `rnd_class` (`js/mkobj.js:783`), `VENOM_CLASS` (objects.js). Reused file-local `bstrcmpi_end`/`strncmpi_start` (no new `strncmpi` clone) + live `strstri`/`rn2`. No deleted symbols.

## C ↔ JS fidelity

`O_RANGES` 19 rows in exact C order (`:3346–3363`, verified row-for-row above) ✓. Body vs C `:4666–4724`, in order: o_ranges exact-match → `rnd_class` → return 2 ✓; `BSTRCMPI` stone/gem arms with the 4/6 cut, `GEM_CLASS`, `dn = actualn = bp`, return 1 ✓; `looking glass` empty arm ✓; glass arm — broken-glass return 3 (`d.broken|0`, `strstri !== null`) ✓, worthless/piece-of/colored/coloured strips ✓, bare-glass `FIRST_GLASS_GEM + rn2(NUM_GLASS_GEMS)` with the oc_class re-check and punt-to-0 ✓, canonical rebuild ✓; tail `actualn = bp`, `dn` default, return 0 ✓. RNG call-for-call (single `rnd_class` / single `rn2` at C positions). Retry wiring: C falls from the postparse1 switch (`case 0`/default) into `retry:` while a wrp match returns 1 (verified `:4571–4579` region returns `1 /*goto srch*/`) — JS `if (!d.typ && !classWord)` with boolean-returning `readobjnam_parse_class_words` is exactly that gate ✓; codes 3/2/0/1 handled per the C switch (4/5 unreachable from this body, noted in the JSDoc) ✓. Nit (not a C-wrong): the commit message cites `O_RANGES (:1006)` but the table is at `:3346` — the in-code JSDoc cite is correct.

## Hallucinations / overclaim

None — the opposite: the D-log discloses its own mid-iteration regression and the gating fix, with the owner (`rnd_otyp_by_namedesc`) and mechanism (tail clobbering class-words `actualn`) named.

## Cited evidence

C table (`nethack-c/upstream/src/objnam.c:3346–3363`, 19 rows — JS keeps C order exactly):

```c
static NEARDATA const struct o_range o_ranges[] = {
    { "bag", TOOL_CLASS, SACK, BAG_OF_TRICKS },
    { "lamp", TOOL_CLASS, OIL_LAMP, MAGIC_LAMP },
    ...
    { "sword", WEAPON_CLASS, SHORT_SWORD, KATANA },
    { "venom", VENOM_CLASS, BLINDING_VENOM, ACID_VENOM },
    { "gray stone", GEM_CLASS, LUCKSTONE, FLINT },
    { "grey stone", GEM_CLASS, LUCKSTONE, FLINT },
};
```

Glass bounds (`objclass.h:181` + `mon.c:659` precedent): `NUM_GLASS_GEMS = (LAST_GLASS_GEM - FIRST_GLASS_GEM + 1)` — JS computes the same difference from `objectNames` indices (9 contiguous). Retry switch (`objnam.c:4947–4955`): `case 0: break; case 1: goto srch; case 2: goto typfnd; case 3: return d.otmp; case 4: goto any; case 5: goto wiztrap` — codes 4/5 unreachable from postparse2's 0–3 range, as the JSDoc notes.

Caller-gate proof (the regression fix): postparse1's wrp scan returns `1 /*goto srch*/` (verified in the `:4567+` region), and C's postparse1 switch (`case 0: break` falls into `retry:`, `case 1: goto srch` skips it) — so JS `if (!d.typ && !classWord)` with boolean-returning `readobjnam_parse_class_words` (`js/readobjnam.js:340`, pre-existing) is exactly the C gate. The pre-gate tree regressed 6 smoke sessions + cohort seed0383 under owner `rnd_otyp_by_namedesc`; the gated tree re-verifies PASS.

Symbols + verify (re-run here):

```text
readobjnam_postparse2 js/readobjnam.js:1041   sync   # single export, no clone
rnd_class             js/mkobj.js:783         sync   # ALREADY-edge, live
verify readobjnam_postparse2: baseline 549891fb~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke readobjnam_postparse2: no RNG-tagged reach; fixed smoke spread (24 run, 3.7s): 24 PASS, 0 regressed → REACH-OK
```

Nit (not a C-wrong, recorded here so it is not re-found): the commit message cites `O_RANGES (:1006)` but the table is at `:3346` — the in-code JSDoc cite (`:3346–3365`) is correct.

## Density

One 60-line C function + data tables + wiring, one file, ~114 insertions. Right-sized per §2b. Scoreboard hunk is a commit/at re-stamp only.

## Verification

- D-log: `verify.mjs --fn readobjnam_postparse2` → PASS (after the gating fix; tail pasted verbatim).
- Re-run here: `hidden-proxy.mjs verify readobjnam_postparse2 --base 549891fb~1 --reach-all` → 0 blocked both trees (vacuous, honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK. Matches. The 6-session smoke regression the D-log describes was pre-gate (this SHA's final tree is the gated one).
- `imports.mjs --rulecheck`: clean (re-run this iteration). Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates.

## Actionable C-wrongs

None. Named omits (postparse3 case-6 re-entry, single-char class code, paperback-family typ arms) are pre-existing gaps, map-named — not Must-fix.

Verdict: **ACCEPT**
