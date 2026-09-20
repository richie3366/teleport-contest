# Review 1659 — a3547b34 — `mondata.c` mstrength whole body (D-2700)

Metadata: commit `a3547b34`, D-2700, `js/mondata.js` only (+101/−4). Pops the first Open-coverage row. No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole C body of `mstrength`. Diff actually adds `mstrength` (exported) plus its static helper `mstrength_ranged_attk` (file-local, like C) with extended live imports. Promise matches deliverable.

## Inventory

New JS: `mstrength` (`js/mondata.js:1095`, sync per `sym.mjs`), file-local `mstrength_ranged_attk`. No deleted/re-pointed symbols. All constants reuse live edges (`mhitm.js`, `monsters.js`, `const.js`, file-local `monattk.h` consts); runtime-use imports, no new module pair, no TDZ.

## Callee closure

```text
mstrength        js/mondata.js:1095   sync
wiz_mon_diff     NOT FOUND in js/** (no export, no local function/const).
```

No symbol deleted or re-pointed. Every constant reuses a live edge; the
runtime values were dumped and checked against the D-log's C claims:

```text
SPIT 10 BREA 12 WEAP 254 MAGC 255 GAZE 15 PHYS 0 DRLI 15 STON 18 DRDX 30 DRCO 31 WERE 29
```

All match (`monattk.h` values quoted in the D-log: 10/12/254/255,
0/15/18/30/31/29). `G_SGROUP/G_LGROUP/M2_STRONG` from the existing
`monsters.js` import, `NATTK` from the existing `const.js` import, AD_
fire/cold/elec/drst from the file-local `monattk.h` consts
(`js/mondata.js:51–58`). No STUB in any live arm. The sole code caller
`wiz_mon_diff` is absent → named omission in-commit, function exported
for wiring when it lands.

## C ↔ JS fidelity

C locus: `mstrength` `mondata.c:425–497` (csym, 73 L) + `mstrength_ranged_attk :500–512` (csym, 13 L) — both whole bodies read, plus callers (`wizcmds.c:1807` live call, `:419` comment, `extern.h:1919` decl). Walked call-for-call (RNG: none both sides):

- Level clamp `2*(tmp-6)/4` → `Math.trunc((2*(tmp-6))/4)`; operands non-negative (`tmp>49`), exact ✓.
- Group bits (`!!` → ternary), ranged arm, AC arms (`ac<4`, `ac<0`), speed arm (`mmove>=18`) ✓.
- Attack loop: `tmp2>0`, `==AT_MAGC`, `==AT_WEAP && mflags2&M2_STRONG` (C `&&` yields 0/1; JS ternary exact), AT_EXPL sphere arms (+3 cold/fire, +5 elec) ✓.
- Damage loop: six drain/petrify arms → +2; grid-bug `strcmp` → `!==` (equality-exact); heavy-damage `damd*damn>23` ✓.
- Leprechaun −2, bee/ant +2 (halves to +1 per C comment) ✓.
- Level adjust `n==0 → −1`, `n<6 → +n/3+1`, else `+n/2` with `Math.trunc` (n>0 in both live branches) ✓; non-negative floor ✓.
- Helper: mask, assignment-in-condition split, `j<32` shift guard, TRUE/FALSE — exact ✓.
- `pmnames[NEUTRAL]` hoisted with `mndx` table fallback (`js/mon.js:485` shape); `ptr` never mutated, hoist exact ✓.

Constants verified at runtime against the D-log's C claims: AT_SPIT 10, AT_BREA 12, AT_WEAP 254, AT_MAGC 255, AT_GAZE 15, AD_PHYS 0, AD_DRLI 15, AD_STON 18, AD_DRDX 30, AD_DRCO 31, AD_WERE 29 — all match. Confirm.

Callee closure: no stubs — every name is LIVE or a verified file-local. Caller `wiz_mon_diff` absent in JS (`sym.mjs` NOT FOUND) → named omission in-commit; function exported for wiring when it lands, no call invented. Confirm.

## Hallucinations / overclaim

None. Hand-computed probe values (bee 6, grid bug 1, spheres 9/10, wizard 13) are an independent oracle, not corpus-shaped.

## Density

Breadth phase: one whole C function + its static helper, ~101 lines, one module. Right-sized.

## Verification

Full verify transcript (both summary lines cited):

```text
verify mstrength: baseline a3547b34~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mstrength: no corpus session is blocked on it at a3547b34~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke mstrength: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, as disclosed. No REGRESSED. Integer-division
audit: every C truncating division in the body operates on provably
non-negative operands (`tmp > 49` guard, `n > 0` in both live adjust
branches), so `Math.trunc` is exact, not an approximation. The
hand-computed probe (bee 6, grid bug 1, spheres 9/10, wizard 13) is an
independent oracle computed from the C rules, not corpus-shaped. Diff
grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
