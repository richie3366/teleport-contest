# Review 2246 — 7bdcd631d — makemon remainder (5 arms)

Metadata: SHA `7bdcd631d79e7bd678e532c5d323634447a994bf` (D-3285,
2026-10-02). `js/makemon.js` only (+40/−16, no import
changes). One function: `makemon` (C
makemon.c:1155–1470 region; closes all 5 D-3278 Named
arms).

Intent vs deliverable: subject promises the GENOD
veto + debug_mongen/isok gates + discard-minvent else
+ new* C order. The diff ships all five at C-cited
positions. Delivers what it promises.

Inventory:

- Entry gate (:3311): `iflags.debug_mongen |||
  (!rndmongen && !ptr)` disjunct added.
- isok gate (:3333): `void impossible('makemon
  trying to create a monster at <%d,%d>?', x, y)` +
  return null, between enexto and MON_AT.
- `if (!ptr)` → `if (ptr)/else` restructure (:3364):
  GENOD veto in the ptr branch; random loop
  untouched in else.
- new* reorder (:3435): EPRI ahead of ESHK/EMIN.
- discard else (:3748): `if (minvent)
  discard_minvent(mtmp, true); minvent = null`.
- No symbol deleted, re-pointed, or imported (all
  names pre-imported — verified; zero import-line
  changes) → no required `sym.mjs` paste; ran
  anyway: monsndx/discard_minvent/newepri sync,
  impossible async (fire-and-forget ✓), G_GENOD
  const — all LIVE ✓.

**C ↔ JS fidelity**: entry gate ≡ C :1168 verbatim
(no wizard check either side — checked) ✓; isok
gate ≡ C :1188–1191 verbatim incl. message text
(JS impossible takes printf args via vpline_expand
✓) ✓; ptr arm ≡ C :1202–1212 (monsndx + GENOD
veto + return; `?? 0` absent-entry reads zero like
C's array; established `:4048`-class idiom) ✓;
new* ≡ C :1237–1245 order ✓; discard else ≡ C
:1454–1459 verbatim incl. the unconditional null
("caller expects this") ✓. Omitted debugpline1
(:1208–1211) + debugpline0 (random arm) verified
`#ifdef DEBUG`-gated (lint.h:31 `ifdebug`) —
absent from judged builds, correctly omitted ✓.
Restructure preserves the random arm byte-for-byte
in behavior (same loop, same tryct/Sokoban/goodpos
shape) ✓. No RNG in any new arm. Pre-existing
callee note (unqueued, out of cluster): JS
discard_minvent ignores `_uncreate_artifacts`
where C :2529 uncreates — the makemon arm passes
TRUE like C and is dormant for fresh births; the
gap belongs to the callee's own row.

Hallucinations / overclaim: none. The VERIFY: FAIL
is disclosed in the D-log (hidden-NO-MOVEMENT
alone) with the D-3278 precedent cited — not
hidden, and the operative gates (REACH-OK +
fortress) are green.

Density: single-function remainder (~40 ins),
exception documented. `Ledger: makemon partial` +
Verify ✓.

Verification: D-log Verify shows NO MOVEMENT (same
3 D-3278 symptoms) + reach 701/701 + green/strict/
cohort/full 44/44. Re-measured (`hidden-proxy.mjs
verify makemon --base 7bdcd631d~1 --reach-all`):
same 3 sessions at same steps (container ×2 +
Healer s26) → NO MOVEMENT + reach 701/701 →
REACH-OK. Zero worse/regressed. The dormancy
argument holds: C prints the appear message in all
3 (C's makemon succeeded, so C's vetoes didn't
fire), and 701/701 + 44/44 prove JS's mirrors
didn't fire anywhere either. Honest NO MOVEMENT
with C-proof, not a disguise. Banned-pattern grep:
clean. Rule #2 clean (2238).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
