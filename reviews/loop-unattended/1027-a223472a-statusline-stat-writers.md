# Review 1027 — a223472a — statusline stat writers (D-2057)

**SHA:** `a223472a` · **D-id:** D-2057 · **Files:** `js/attrib.js`,
`js/do_wear.js`, `js/polyself.js` (~20 insertions)

## Intent vs deliverable

Subject promises: "statusline stat writers: acurr CHA floor + poly giant
Str + ring-takeoff ABON (queue owner do_statusline1)". Three
screen-first row-22 divergences, toplines identical, one per hunk:

- scen-normal-Wizard-91114 step 119: row 22 C `St:9` vs JS `St:11`
  (delta 2 = ring spe, takeoff path).
- scen-poly-Priest-92097 step 125: C `Ch:18` vs JS `Ch:11` after
  incubus poly (CHA floor).
- scen-wish-Archeologist-92038 step 185: C `St:19` vs JS `St:18/**`
  after fire-giant poly (giant max-Str).

Diff actually adds: (1) CHA-floor arm in `acurr`; (2) `liveH`
giant branch in `uasmon_maxStr`; (3) ring path in
`armor_or_accessory_off` re-pointed from inline removal to
`Ring_off`. Promise matches diff. No unrelated edits.

## Inventory

| JS function | Change |
|---|---|
| `acurr` (attrib.js) | new CHA arm |
| `armor_or_accessory_off` (do_wear.js) | ring arm: inline removal → `await Ring_off(obj)` |
| `uasmon_maxStr` (polyself.js) | strongmonst branch gains `liveH` |

## C ↔ JS fidelity

**1. `acurr` CHA arm — confirms branch-for-branch.**
C `attrib.c:1197–1241`, arm at `:1219–1222`:

```c
} else if (chridx == A_CHA) {
    if (tmp < 18 && (gy.youmonst.data->mlet == S_NYMPH
                     || u.umonnum == PM_AMOROUS_DEMON))
        result = 18;
```

JS mirrors it exactly: `tmp < 18`, `mlet === 'S_NYMPH'`,
`umonnum === PM_AMOROUS_DEMON`, `result = 18`. No invented
incubus/succubus special-case beyond C (C keys off the single
`PM_AMOROUS_DEMON` monnum; JS does the same). `PM_AMOROUS_DEMON`
resolves via `monsterNames.indexOf` → 290, verified live. No RNG.

**2. `uasmon_maxStr` giant branch — confirms verbatim.**
C `polyself.c:1074–1119`, decisive line `:1112`:

```c
newMaxStr = R ? R->attrmax[A_STR] : live_H ? STR19(19) : STR18(100);
```

with `live_H = is_giant(ptr) && !is_undead(ptr)` (`:1103`).
JS: `const liveH = is_giant(ptr) && !is_undead(ptr); return R ?
(R.attrmax[A_STR] | 0) : liveH ? STR19(19) : STR18(100)`.
Identical, including R-takes-precedence order. `STR18/STR19`
(`const.js:413–414`) match C encoding (`18+x`, `100+y`).
Orc/elf/dwarf/gnome remap + `#if 0` human passthrough retained
untouched above — named correctly.

**3. Ring takeoff — clone deleted in favor of the LIVE callee.**
C `do_wear.c:1809–1817`: `off_msg(obj); Ring_off(obj);` for
`obj == uright || obj == uleft`. Old JS was a **clone**: manual
`confer_oc_oprop` + `owornmask` clear + `uleft/uright = null`,
which skipped the full `Ring_off_or_gone` switch (ABON /
`adjust_attrib` side effects — exactly the observed St delta 2).
`Ring_off` is LIVE (`js/do_wear.js:2647`, async, thin wrapper over
`Ring_off_or_gone` at :2558). `sym.mjs` confirms both still
exported with correct async shape; `confer_oc_oprop` (:326) is
retained for its other callers — nothing deleted that others need.
Replacement `await off_msg(obj); await Ring_off(obj); return 1`
is C order verbatim. This is the delete-wrong-JS + import pattern
the playbook prefers.

Callee closure: `is_giant` / `is_undead` / `strongmonst` (monsters.js),
`STR18/STR19` (const.js), `monsterNames` (generated), `Ring_off` —
all LIVE imports on pre-existing edges. No new module edge, no
clone kept, no stub in any live arm.

## Hallucinations / overclaim

None. Subject says "Match C" nowhere it shouldn't; the queue owner
(`do_statusline1`) is correctly framed as symptom owner with the
writers ported. Named omits (Ogresmasher CON→25, orc/elf remap,
amulet/blindfold paths, pad/score arms) are pre-existing map omits,
untouched, each named in the D-log.

## Density

~20 `js/` insertions across three 2–4-line C arms. Below the
~40-line guideline, but each C locus is genuinely that small
(CHA arm 4 lines, `live_H` 2 lines, ring arm 2 lines) and the three
share one symptom envelope (row-22 stat writers, one falsifier
family). Right-sized; splitting would be three waste iters.

## Verification

D-log Verify bullet claims `hidden-proxy verify do_statusline1` →
PROGRESS (91114 PASS; 92097 125→steal_it@152; 92038
185→newcham@188), green 2/2, strict ×2, cohort 7/7, full 44/44.
Re-measured myself:

```text
node scripts/hidden-proxy.mjs verify do_statusline1 --base a223472a~1
verify do_statusline1: 1 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-normal-Wizard-91114: PASS
  scen-poly-Priest-92097: moved → steal_it at step 152 (was 125)
  scen-wish-Archeologist-92038: moved → newcham at step 188 (was 185)
```

Byte-identical to the claim — not vacuous, no D-1831 regression
shape. `imports.mjs --rulecheck`: Rule #2 clean. Diff grep: no
FORCE/DIAG/RNG-log/seed/coordinate gates (the one grep hit is the
commit message quoting "no DIAG/FORCE/seed gates"). No RNG calls
added anywhere in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
