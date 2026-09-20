# Review 1617 — 2a8be1e7 — mhitu.c magic_negation whole-body port (D-2658)

**Metadata:** SHA `2a8be1e7`, `mhitu.c` `magic_negation`,
D-2658. JS: `js/mhitm.js` (unified `magic_negation` export +
two one-line delegates) + `js/artifact.js` (+19: new
`protects` export). Retires the D-1405 mon-arm omits.

## Intent vs deliverable

Subject promises: canonical `magic_negation(mon)` export in
C order, mon-arm omits retired, delegates keep
names/signatures, same-edge joins only. Diff delivers all of
it — except one predicate narrowing in the intrinsic-floor
arm (see C-wrong 1). Promise otherwise matches deliverable.

## Inventory

- `magic_negation(mon)` (mhitm.js:2412, sync, exported) —
  C `mhitu.c:1088–1137` (50 L).
- `protects(otmp, being_worn)` (artifact.js:631, sync,
  exported) — C `artifact.c:697–709` (13 L).
- `magic_negation_you` / `magic_negation_mon` → one-line
  delegates (names/signatures kept; `mon` local was already
  file-local — no caller rewiring needed).
- Joins: `protects`→artifact.js, `W_ACCESSORY`/`W_WEP`→
  const.js (`--can` ALREADY per subject), `is_minion`→
  monsters.js, `PM_ALIGNED_CLERIC` file idiom. `sym.mjs`:

```text
protects         js/artifact.js:631   sync
is_minion        js/monsters.js:615   sync
```

No deleted symbols, no re-points.

## C ↔ JS fidelity

C loci read in full: `magic_negation :1088–1137`,
`protects :697–709`, `is_minion` (mondata.h:142 =
`mflags2 & M2_MINION`), `polyok` (mondata.h:93 =
`!(mflags2 & M2_NOPOLY)`). No RNG either side. Confirm:

- `is_you` ≡ `mon == &youmonst` (null idiom + youmonst
  identity) ✓; `gotprot` init (EProtection vs
  `monsndx(mon.data) === PM_HIGH_CLERIC`) ✓; single
  C-order walk (invent array / minvent chain, order-
  identical) ✓; armor `a_can` max `:1101–1103`,
  amulet-of-guarding latch `:1104–1106`, `is_you ||
  gotprot` skip `:1107–1109`, wearmask + `W_WEP`
  `:1111–1114`, live `protects` `:1115–1116` ✓;
  extrinsic `+1/+2`, cap 3 `:1119–1123` ✓.
- `protects` ≡ C `:697–709` token-for-token (worn
  oc_oprop gate, `list[ART_NONARTIFACT]` identity,
  cspfx-always / spfx-when-worn) ✓ — exact new export.
- **C-wrong 1 (intrinsic floor, `:1130–1134`):** C is one
  `if` — `(is_you && ((HProtection && ublessed>0) ||
  uspellprot)) || (mon->data == &mons[PM_ALIGNED_CLERIC]
  || is_minion(mon->data))` — so the aligned/minion
  disjunct applies to the hero too (mon == &youmonst,
  data == polyform). JS splits it into `if (is_you)
  {HProtection-only} else if (aligned||minion)`,
  dropping the hero-poly'd-as-minion case. Reachable:
  couatl and Aleax are M2_MINION without M2_NOPOLY
  (monsters.h), hence `polyok`, and JS `polyok`
  (monsters.js:782) ports C exactly — a hero poly'd
  into couatl/Aleax with mc<1, no gotprot, no
  HProtection/spellprot gets mc 0 where C gives 1
  (changed `rn2(10) >= 3*armpro` odds downstream).
  One-line fix, queueable next iter (see Must-fix).

## Hallucinations / overclaim

"D-1405 mon-arm omits retired" is true for amulet/
protects/cleric-floor/minion-floor as coded — except the
hero-form corner above, which the "Named: none" claim
misses. Named as C-wrong 1 rather than overclaim.

## Density

Breadth phase: unification + one 13 L callee export (137
ins, 2 files, same edges) — right-sized.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 · hidden
note · REACH-OK smoke 24/24 · green · strict · cohort).
Re-measured here: `hidden-proxy.mjs verify magic_negation
--base 2a8be1e7~1 --reach-all` → 0 blocked both sides
(vacuous note, correctly labeled coverage row) + smoke
24/24 PASS, 0 regressed → REACH-OK. Claim true (the
C-wrong is a narrow state no smoke session covers).
Diff grep: 0 hits for FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

1. Intrinsic floor drops the hero-polyform disjunct
   (`mhitm.js` magic_negation `else if (mc < 1)`):
   evaluate `monsndx(data) === PM_ALIGNED_CLERIC ||
   is_minion(data)` on the hero's form when `is_you`
   (null → `game.youmonst.data`), per C `:1130–1134`.

Verdict: **QUALITY-RISK**
