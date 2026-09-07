# Review 992 — d7b4d542 — mitem SPE_DIG + trapeffect_arrow_trap (D-2022)

Metadata: SHA `d7b4d542`, D-2022, Open-row port (two
next_ident-symptom writers). js/ touches `js/makemon.js`
(+5/−1: SPE_DIG gate) and `js/trap.js` (+57/−2: new
`trapeffect_arrow_trap` + `ARROW_TRAP` case + selector
comment). No stamp owed.

## Intent vs deliverable

Subject promises: (1) first-Wizard-on-earth mitem skips
one mksobj+bless pair (tour-Wizard-92103: rng-diff ±3
shows identical subsequent dice, stream offset by exactly
the 2 skipped draws — a skip, not a reorder); (2)
monster-stepped arrow trap skips the whole t_missile
sequence (poly-Priest-92021: different call sequence, not
a skip). Diff actually adds: the one-line gate plus a
dart-mirror arrow function wired into the selector.
Promise == diff.

## Inventory

- Changed JS functions: `makemon` wiz arm; new
  `trapeffect_arrow_trap` (local — `sym.mjs`: NOT
  EXPORTED, 1 local clone, correct since C is
  `staticfn`).
- Classification: the gate is a C-callee arm (`otyp`,
  pre-existing idiom, cf. neighboring `TWO_HANDED_SWORD`
  arm); the arrow function is a verified CLONE of the
  accepted dart shape (read both: line-for-line mirror —
  `t_missile(DART)` → `(ARROW)`, `thitu(7` → `(8`,
  `thitm(7` → `(8`, poison `rn2(6)` roll dropped, shoot
  pline reworded; miss-path place/observe/stack/newsym
  and gone-arm deltrap+newsym+Gone identical).
- No deleted / re-pointed symbols. No STUB in a live
  arm. Omissions each named in-commit: Soundeffect,
  steedintrap, gone-arm pline_mon, in_sight-gated seetrap,
  obfree resists (mirrored from the dart port);
  anti-magic trap effect (still selector-default); Wizard
  cham/Protection `if` vs C `else if :1356–1369` (no
  corpus coverage); other mitem arms.
- No new cross-module edges (all helpers already
  used in-file).

## C ↔ JS fidelity

mitem: `makemon.c:1371–1373` (`no_of_wizards == 1 &&
Is_earthlevel`, `mitem = SPE_DIG`) — verbatim, and the
comment's draw claim (mongets → mksobj o_id + SPBOOK
blessorcurse(17)) matches the corpus trace ✓. Arrow trap
vs `trap.c:1189–1248`, walked call-for-call. Hero arm:
gone-arm keeps `rn2(15)` with deltrap+newsym+Gone ✓
(Soundeffect sound-only, named); once / seetrap /
shoot-pline / `t_missile(ARROW)` / `dmgval(otmp,
youmonst)` order ✓; `thitu(8, Maybe_Half_Phys, &otmp)`
dice and box shape mirror the dart clone ✓; poison
`rn2(6)` correctly ABSENT (the roll lives in the C dart
arm, not the arrow arm) ✓; `obfree(otmp, 0)` → draw-free
no-op ✓ (`obfree` draws nothing — the named resists omit
is about `delobj`, not this call); miss path
place/observe/stack/newsym ✓. Monster arm: gone-arm
deltrap+newsym+Gone with `rn2(15)` kept ✓ (pline_mon
named); once / t_missile / seetrap / `thitm(8, …, 0,
FALSE)` / killed→trapped→finished ladder ✓. Unconditional
`seetrap` vs C `if (in_sight)` is draw-free display
simplification, named, mirrored from dart — not charged.
Process note (not a C-wrong): two different C functions
ship in one commit, at the §2b boundary; justified here
only because both are writers of the single `next_ident`
falsifier verified together — not a precedent for gluing
unrelated Open rows.

## Hallucinations / overclaim

None. "Dispatch ported, callee stubbed" does not apply —
every callee (`t_missile`, `thitu`, `thitm`, `dmgval`,
`seetrap`, `deltrap`) is live in-file, and the D-log
names each omission with its draw status.

## Density

One symptom, two writers, one verify. At the §2b
boundary but coherent.

## Verification

Re-measured myself:

```
node scripts/hidden-proxy.mjs verify next_ident --base d7b4d542~1
→ 0 PASS, 2 moved past, 1 unchanged, 0 worse → PROGRESS
```

Reproducing the D-log line exactly (tour-Wizard-92103 →
collect_coords@74 was 59; poly-Priest-92021 →
do_statusline2@180 was 157; Knight-92130 still
next_ident@90, the known slime-mold writer). js/ hunk
grep: no banned patterns. Rule #2 clean (global re-run).
Cited green + strict ×2, cohort 7/7, full 44/44.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
