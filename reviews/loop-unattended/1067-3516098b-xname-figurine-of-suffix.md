# Review 1067 — 3516098b — Audit fd3f5f38..213658d3 + D-2098 xname FIGURINE of-suffix

Metadata: SHA `3516098b`, D-2098 (+ retired-stale D-2099/D-2100, reviews 1059–1066). JS: `js/objnam.js` +11/−2 only. Next NN 1067.

## Intent vs deliverable

Subject promises an audit (reviews 1059–1066) plus one Open-head port (D-2098 FIGURINE) plus two stale retirements. Diff actually adds: one `FIGURINE` of-suffix block in `pretty_base` (TOOL arm) + map-comment update. D-2099/D-2100 retirements are docs/scoreboard-only, no js/. Promise matches deliverable; the js/ hunk is D-2098 alone.

This commit also lands the seven prior review files (1059–1064, 1066 ACCEPT, 1065 QUALITY-RISK with its Must-fix row already queued and Next cluster set). Those reviews are separate files under review here only insofar as this SHA carries them; the js/ audit below covers this SHA's own D-2098 hunk.

## Inventory

New/changed JS: `pretty_base` FIGURINE suffix (objnam.js:885–893). No new imports, no new exports, no deleted symbols (`sym.mjs` re-point run not required — nothing deleted or re-pointed from a clone to an import).

Callee liveness (`sym.mjs`, all live sync exports, same file or existing edge):

```text
obj_pmname_corpse js/objnam.js:1103   sync
just_an          js/objnam.js:2105   sync
ismnum           js/const.js:3196   sync
```

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/objnam.c:709–714` (`xname_flags` TOOL arm), read verbatim:

```c
if (typ == FIGURINE && omndx != NON_PM) {
    char anbuf[10]; /* [4] would be enough: 'a','n',' ','\0' */
    const char *pm_name = obj_pmname(obj);

    ConcatF2(buf, 0, " of %s%s", just_an(anbuf, pm_name), pm_name);
} else if (is_wet_towel(obj)) {
```

JS port (objnam.js:885–893), after the same dn/actualn/called selection:

```js
if (n === 'FIGURINE' && obj.corpsenm != null) {
    const omndx = obj.corpsenm | 0;
    if (omndx !== NON_PM && ismnum(omndx)) {
        const pm = obj_pmname_corpse(obj);
        buf += ` of ${just_an(pm)}${pm}`;
    }
}
```

Branch order confirmed: name selection → FIGURINE suffix → return; wet-towel stays a named omission and is mutually exclusive with FIGURINE in C (`if/else if`), so the standalone `if` cannot double-fire. No RNG in either arm — display-only, zero keystream effect.

Two micro-deltas, both benign: (1) JS adds `ismnum(omndx)` alongside `!== NON_PM`; C trusts corpsenm, but creation (`mkobj.js:1575` TOOL_CLASS FIGURINE sets `corpsenm = rndmonnum_adj(5,10)` minus humans) always writes a valid mnum, so the guard is dead defense, never a live divergence. (2) JS calls same-file `obj_pmname_corpse` (C-ref'd header: "do_name.c obj_pmname — CORPSE/STATUE/FIGURINE pmnames + gender") instead of C's `obj_pmname`; the FIGURINE path is the gender-aware `pmnames[mndx]` lookup C uses, and `just_an` matches modulo buffer plumbing. Callees: all LIVE, no clones, no stubs, no omits in the arm. Map row D-0418 retires the figurine half; wet-towel moist/wet + `permapoisoned` stay named there.

## Hallucinations / overclaim

None. D-2098 says "display was the only gap" — true, creation already faithful. No "Match C" dispatch-over-stub shape; this is a leaf display arm. The stale retirements (D-2099 credit D-2044, D-2100 inferred credit D-2092) are labeled inferred where inferred.

## Density

+11/−2, one 6-line C arm, map-named single (D-0418 figurine half retires). §2b minimum-size exception applies explicitly ("C is that small"). Audit + one head-row ship in one commit is the operator-ordered pattern, not scope creep.

## Verification

D-log Verify bullet claims `verify --fn checkfile` → 0 PASS, 3 moved past + hand probe 3/3 + green/strict/cohort PASS. Re-measured myself:

```text
verify checkfile: baseline 3516098b~1 — 3 session(s) blocked on it
  scen-intrinsic-Samurai-92239: moved → distfleeck at step 96 (was 92)
  scen-wish-Priest-92179: moved → disclose at step 100 (was 31)
  scen-wish-Priest-92180: moved → one_characteristic at step 168 (was 38)
verify checkfile: 0 PASS, 3 moved past, 0 unchanged, 0 worse → PROGRESS
```

Matches exactly, all strictly later steps and owners. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate reads. `imports.mjs --rulecheck` → Rule #2 clean on the working tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
