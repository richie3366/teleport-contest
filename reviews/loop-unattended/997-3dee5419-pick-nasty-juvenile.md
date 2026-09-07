# Review 997 — 3dee5419 — pick_nasty juvenile name-string gate (D-2027)

Metadata: SHA `3dee5419`, D-2027, Open-row port
(genesis-symptom writer, 1 moved). js/ touches
`js/makemon.js` (+13/−3: gate body + 2 import names +
doc). No stamp owed.

## Intent vs deliverable

Subject promises: verbatim port of the `:567–579`
non-juvenile gate on the `big_to_little` alt
(Caveman-92118: C `d(15,4)=30 @ newmonhp` + adult green
dragon vs JS `d(13,8)=53` + baby — `newmonhp` verbatim
since D-2017, so only the `pick_nasty` mndx input
differs). Diff actually adds: exactly that gate, retiring
the juvenile omission from the doc comment. Promise ==
diff.

## Inventory

- Changed JS function: `pick_nasty` alt-accept arm only.
  No new helpers; no deletes / re-points. `pmnames` +
  `NEUTRAL` extend the pre-existing `./monsters.js`
  static import (`--can`: ALREADY, no new edge).
- No STUB / clone / no-op. Named: rogue-level monsym
  uppercase re-ROLL (`:545–547`, monsym table not wired
  in makemon.js — pre-existing, draw-affecting but
  out of this arm).

## C ↔ JS fidelity

Against `wizard.c:567–579`, operator-for-operator:

```
const char *mnam = mons[alt].pmnames[NEUTRAL],
           *lastspace = strrchr(mnam, ' ');
if (strncmp(mnam, "baby ", 5)
    && (!lastspace
        || (strcmp(lastspace, " hatchling")
            && strcmp(lastspace, " pup")
            && strcmp(lastspace, " cub"))))
    res = alt;
```

`strncmp(mnam,"baby ",5)` (nonzero = differ) ≡
`!startsWith('baby ')` — including the short-string edge
(C's 5th-char NUL-vs-space mismatch reads "differ" =
accept; JS `startsWith` is false = accept) ✓.
`strrchr(mnam,' ')` (pointer from the LAST space) ≡
`slice(lastIndexOf(' '))`, NULL ≡ `null` ✓. Chained
`strcmp && &&` (≠0) ≡ `!== && &&` ✓. `&&`
short-circuit shape identical (baby-prefix skips the
suffix reads) ✓. Index basis verified: JS `NEUTRAL = 2`
(`monsters.js:70`) matches C's `pmnames[NEUTRAL]` slot
and the table rows are `[male, female, neutral]` triples
(spot-checked kitten row) ✓. Pure string ops, zero RNG —
the corpus `d(15,4)` vs `d(13,8)` split is fully
explained by the mndx input differing, not by dice. The
D-log's direct replay (RNG 6371→6489/6758, screens
105→128/167) independently confirms the adult is now
picked.

## Hallucinations / overclaim

None. D-log calls the `verify pick_nasty` vacuous by
name (row predicts 0 blocks) and verifies through the
real owner (`newmonhp`) instead — the honest pattern.

## Density

One C gate, one arm. Right-sized.

## Verification

Re-measured myself:

```
node scripts/hidden-proxy.mjs verify newmonhp --base 3dee5419~1
→ 1 session(s) blocked (1 at baseline, 0 working)
→ 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

Reproducing the D-log (Caveman-92118 →
mhitm_mgc_atk_negated@127 was 97). js/ hunk grep: no
banned patterns. Rule #2 clean (global re-run). Cited
green + strict ×2, cohort 7/7, full 44/44.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
