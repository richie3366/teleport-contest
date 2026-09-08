# Review 1023 — ac555b16 — study_book dull-book sleep arm (D-2053)

Metadata: SHA `ac555b16`, D-2053, Open-row port
(queue owner `study_book`, RNG-first `rnd(25)` +
a topline-more sibling, 2 sessions). js/ touches 1
file: `spell.js` (+42/−... ). No stamp owed.

## Intent vs deliverable

Subject promises: the dull arm in exact C order
(after context creation, before the
interrupted-continue arm), with H||E+flat sleep
resistance, `rnd(25)`/resume-`rnd(oc_level)` draws,
eye pluralization, dull pline, `rnd(2*oc_level)` +
`fall_asleep` + return 1. Diff actually adds
exactly that, plus six import-name extensions on
pre-existing edges. Promise ≡ diff.

## Inventory

- Changed JS: `study_book` (`js/spell.js:789+`),
  async (one new awaited pline; `fall_asleep` is
  sync so no await — correct).
- `sym.mjs`: `fall_asleep js/hack.js:1038 sync`,
  `objdescr_is js/apply.js:1046 sync`,
  `body_part js/polyself.js:416 sync`,
  `eyecount js/monsters.js:980 sync`,
  `makeplural js/objnam.js:1975 sync` — all LIVE.
  Right call on `objdescr_is`: the export is
  imported, not a fourth local clone (3 exist in
  eat/muse/steed — anti-D-1849 ✓).
- No symbol deleted or re-pointed. Module-header
  and envelope Named lists drop "dull sleep"
  together — no orphan omit claim.

## C ↔ JS fidelity

C locus `spell.c:472-495` (study_book head, read
directly). Conjunct-by-conjunct confirm:

- Gate `!confused && !Sleep_resistance &&
  objdescr_is(spellbook,"dull")` ✓. C macro
  (`youprop.h:36`) is H||E; JS adds the flat
  `Sleep_resistance` fallback — the same idiom as
  `mhitu.js:2219`, not an invention ✓.
- `dullbook = rnd(25) - ACURR(A_WIS)` ✓; resume
  `dullbook -= rnd(oc_level)` gated on
  `spbook.delay && book===spbook.book` ✓ —
  placed before the interrupted-continue arm, so
  the draws happen even when the hero stays awake,
  exactly the load-bearing RNG fact (92029:
  `rnd(25)=6` was the first divergence).
- `eyes = body_part(EYE); if
  (eyecount(youmonst.data) > 1) pluralize` ✓;
  pline text verbatim ✓; `dullbook +=
  rnd(2*oc_level); fall_asleep(-dullbook, TRUE);
  return 1;` ✓.

Callee closure: all six callees LIVE sync;
`confused_book` stays a named omit (neither
blocked session reaches the confused arm).

## Hallucinations / overclaim

None. The second session (92066, topline-more at
`:632`, no study_book draw in stepFns) is
presented as "moved", not "explained" — the
D-log does not claim the dull draw caused a
draw-less step.

## Density

One arm, one function, one falsifier pair.
Right-sized.

## Verification

- Diff-hunk grep: the single FORCE/DIAG hit is
  the commit message quoting its own Verify line;
  zero hits in code. No seed/getRngLog/coords.
- Re-measured `hidden-proxy verify study_book
  --base ac555b16~1`: `1 PASS, 1 moved past,
  0 unchanged, 0 worse → PROGRESS` (92029 PASS;
  92066 → one_characteristic@51 was 40) — matches
  the D-log owner-for-owner, step-for-step.
- Green 2/2 + strict ×2, cohort 7/7 per pasted
  `verify.mjs` tail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
