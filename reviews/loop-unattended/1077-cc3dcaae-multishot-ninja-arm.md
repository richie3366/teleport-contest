# Review 1077 — cc3dcaae — multishot_class_bonus PM_NINJA arm

Metadata: SHA `cc3dcaae`, D-2111, `js/weapon.js` only (4 insertions).
No prior review claims this SHA.

Intent vs deliverable: the subject promises the ninja shuriken / dart
volley arm (1→2).
The diff delivers exactly that: a `PM_NINJA` local const beside the
existing PM_PONY / SHADE / BALROG locals + one `case` falling into
SAMURAI. No other arm touched.

Inventory: one added case, one added const; zero helpers.

**C ↔ JS fidelity**: C `multishot_class_bonus`
(`nethack-c/upstream/src/dothrow.c:38–83`, 46 lines):

```c
case PM_NINJA:
    if (skill == -P_SHURIKEN || skill == -P_DART)
        multishot++;
    FALLTHROUGH;
    /*FALLTHRU*/
case PM_SAMURAI:
```

JS is textually identical, in exact C position (before SAMURAI, with
the FALLTHROUGH comment), using the file's established
`skill === -P_*` convention (same as the neighboring MONK arm).
`PM_NINJA` via `monsterNames.indexOf` matches the file's pre-existing
`monsters_data.js` edge — no new module, no TDZ.
No `sym.mjs` re-point applies (nothing deleted or re-pointed).
Correctly diagnosed as writer-behind-symptom: `next_ident` is faithful
per D-2021 while the volley count was the true writer (C `rnd(2)` vs JS
`rnd(1)` at `mkobj.c:521` follows from 1 vs 2 objects created).

Hallucinations / overclaim: none.
The mplayer `+1` and racial-bow arms are correctly left as named
deferrals (no corpus coverage; ninja is not mplayer).

Density: 4 insertions — far below the §2b guideline, but the C locus
for this arm is 3 lines and the arm ships complete with its
fallthrough. "Unless C is that small" applies. Acceptable.

Verification: D-log cites hidden 0 / 1-moved / 2-unchanged / PROGRESS
(Samurai-92161 → spoteffects@35).
Re-measured (`--base cc3dcaae~1`):

```text
scen-death-Wizard-92187: moved → next_ident at step 48 (was 20; still next_ident, 28 step(s) later)
scen-tour-Samurai-92161: moved → spoteffects at step 35 (was 34)
scen-wish-Archeologist-92238: still next_ident at step 42
scen-wish-Knight-92130: still next_ident at step 90
verify next_ident: 0 PASS, 2 moved past (1 still next_ident at a later step), 2 unchanged, 0 worse → PROGRESS
```

The extra mover vs the D-log (Wizard-92187 → next_ident@48) is
cumulative progress from the later D-2115 zap_dig port in this same
batch, not this SHA — this SHA's target (Samurai → spoteffects@35) and
both unchanged sessions match the D-log exactly.
No vacuous check, no regression.
Structural no-regression argument holds (PM_NINJA-gated; quest-genus
absent from the fortress). No seed / step / coordinate read.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
