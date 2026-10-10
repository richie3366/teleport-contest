# Review 2623 — 4ddfa4bb2 — makemon cham Protection guard (D-3757)

Metadata. SHA `4ddfa4bb2` (2026-10-10), D-3757, parent
`9fec5d504`. js diff: `js/makemon.js` +5/−2 (guard +
import) + `js/display.js` 1-word `export`. No test file
(pinned by the recorded session + gates, D-3244
precedent). Ledger: `makemon` partial (D-3757
appended). Works its HEAD's cliffs head (`makemon.c`
m_initinv, 1 blocked: 95316 — verified head of the
parent queue @da1091aa9).

## Intent vs deliverable

Promise (subject + D-log): 95316@542 C `rn2(50)=20 @
m_initinv:826` (tail defensive gate) vs JS `rn2(4)=2 @
pickvampshape` — measured prefix-identical through
`female rn2(2)=0`, then C drew zero (cham stayed NON_PM,
allow_minvent TRUE; no newcham) while JS shifted the
themed-room vampire at birth. pm_to_cham agrees both
sides, so C's skip forces hero
Protection-from-shape-changers ON — a guard JS's cham
condition lacked. Add it in C order.

Diff actually adds exactly the guard plus the 1-word
export. Promise and diff match.

## Inventory

Changed JS (1 gate + 1 export):

- makemon cham gate — `js/makemon.js:3646` (`if
  (!Protection_from_shape_changers() && mcham !==
  NON_PM)`).
  C: `makemon.c` `:1355–1357` (`if
  (!Protection_from_shape_changers && (mcham =
  pm_to_cham(mndx)) != NON_PM)`); Vlad/cham setup
  `:1352–1368`; else-if tail `:1368–1381` (Wizard,
  Ghost+christen, Croesus, MS_NEMESIS, Pestilence).
- `Protection_from_shape_changers` export —
  `js/display.js:1289` (body `:1289–1296`: H || E ||
  sticky fallback || uprops I/E — youprop.h shape).

## C ↔ JS fidelity

**Guard exact in C order.** C evaluates
`!Protection_from_shape_changers` first, then the
pm_to_cham assignment; JS hoists `pm_to_cham` above the
`if` — behaviorally nil because `pm_to_cham`
(`js/makemon.js:1118`, body read) is a pure table
lookup (range check + `is_shapeshifter`, no RNG, no
side effects). Vlad exclusion (`mndx !=
PM_VLAD_THE_IMPALER` → no newcham, cham still set) and
`allow_minvent_local = false` on `newcham` success are
untouched and match `:1358–1367`. The D-log's
consequence note (cham stays NON_PM, no newcham,
allow_minvent TRUE so m_initinv runs) is C-true.

**Separate-if vs C else-if — verified nil (this audit).**
C's cham arm excludes the Wizard/Ghost/Croesus/Nemesis/
Pestilence tail only when it *fires* (Protection off +
shapeshifter). Shapeshifter set (M2_SHAPESHIFTER:
chameleon, doppelganger, vampires, Vlad — Vlad's C
entry `monsters.h:2313–2323` read: M2_SHAPESHIFTER,
msound MS_VAMPIRE) intersects none of {Wizard, Ghost,
Croesus, Pestilence} and none carries MS_NEMESIS; so
JS's chain evaluates identically in every firing case.
Ghost/christen (the only RNG in the tail,
`rndghostname`) sits earlier as a separate if
(`:3537–3540`, pre-existing) and Ghost is not a
shapeshifter — same draws either structure. The D-log's
"behaviorally nil" claim holds.

**Callees:** Protection_from_shape_changers (LIVE
import; display.js already imported, no new edge),
pm_to_cham (LIVE, pure), newcham (LIVE, untouched). No
stubs, no clones. sym.mjs on the newly exported symbol
(required paste):

```text
Protection_from_shape_changers js/display.js:1289   sync
                 js/were.js:58   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/wizard.js:227
```

Pre-existing multiplicity (were.js export + wizard.js
clone untouched); this SHA adds no clone — it exports
the youprop-family copy and imports it. No action.

## Hallucinations / overclaim

None. Diff grep (FORCE / DIAG / getRngLog / fastforward
/ seed / coords): zero hits. The causal inference
(Protection ON in C) is measurement-backed (draw-count
prefix equality + zero-draw gap), and the movement
below confirms the mechanism. No committed unit test is
disclosed with precedent; the corpus session pins it.

## Density

Cliff-phase §2b: parent head m_initinv (1 blocked, RNG
lost 42329); this commit ships the writer (makemon's
cham guard — owner m_initinv already whole per D-3244,
read once) with 1 moved (+139). One cliff, one C locus,
no bundling. Correct gates incl. full 44/44 on the
shared file (claimed in D-log).

## Verification

D-log Verify (`verify.mjs --fn m_initinv,makemon`):
95316 542→681 (RNG 20133→62462/62462, screen-first
castmu); reach 80/80 spreads → REACH-OK; makemon
vacuous + 80/80 reach; green/strict/cohort/full PASS.

Re-measured by this audit (`verify m_initinv,makemon
--base 4ddfa4bb2~1 --reach-all`; HEAD code includes 7
later SHAs):

```text
verify m_initinv: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Priest-95316: moved → castmu at step 681 (was 542)
reach m_initinv: 1005 baseline-PASS session(s) reach it (1005 run, 513.8s): 1005 PASS, 0 regressed → REACH-OK
verify makemon: no corpus session is blocked on it at 4ddfa4bb2~1 — a vacuous verify is NOT a corpus PASS. […]
reach makemon: 1015 baseline-PASS session(s) reach it (1015 run, 510.2s): 1015 PASS, 0 regressed → REACH-OK
```

Movement matches the D-log exactly (542→681, castmu);
full (non-spread) reach on both functions totals 2020
sessions with 0 regressed. No vacuous check (row cited
1; that session itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
