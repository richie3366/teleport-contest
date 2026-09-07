# Review 991 — 8f9bd758 — readobjnam zero-draw exact paths (D-2021)

Metadata: SHA `8f9bd758`, D-2021, Open-row port
(next_ident-symptom writers, 6 corpus sessions). js/
touches `js/readobjnam.js` (+77/−6: real/fake preparse,
Amulet block, makesingular + srch guards, alt-spellings
loop, gem-exact/tin) plus new leaf
`js/generated/alt_spellings.js` (46 pairs) via new
`scripts/extract-alt-spellings.py` (dat_text/artifacts
precedent). No stamp owed.

## Intent vs deliverable

Subject promises: JS `srch` drew RNG (via
`rnd_otyp_by_namedesc`) where C resolves with no RNG,
desyncing the downstream `next_ident` o_id/m_id draw.
Diff actually adds: five zero-draw resolution arms ahead
of the srch chain — real/fake preparse, Amulet real/fake,
makesingular skip, alt-spellings loop, gem-exact + tin.
Promise == diff.

## Inventory

- Changed JS function: `readobjnam` only (pre-srch
  envelope). No deleted / re-pointed symbols — no
  `sym.mjs` audit required. No STUB / clone / no-op.
- New artifacts: `ALT_SPELLINGS` (46 `[sp, OBNAME]`
  pairs, C order) + `ALT_SPELLINGS_RESOLVED` (ob names →
  indices once); extractor re-run emits a byte-identical
  file (verified — also confirms the tree is clean after
  my probe run). Table head rows match C `spellings[]`
  order exactly (`pickax/PICK_AXE`, `whip/BULLWHIP`,
  `saber/SILVER_SABER` …).
- Callee closure: imports extend pre-existing edges
  (`hacklib.js` `strstri`, objects consts,
  `objects_data.js` `LAST_REAL_GEM`); the generated table
  is a leaf (no imports → no cycle / TDZ possible).
- Named omits kept: `named` / `called` / `labeled` / `of
  spinach` strips; `o_ranges` + postparse2 stone/gem/glass
  branches; fruit path; postparse1 remainder (pair-of,
  globs, scales, holy water, paperback, unlabeled
  scroll/spellbook, orange, single-char class code);
  typfnd `!wizard` remaps beyond this arm's Amulet→fake
  (BELL / CANDELABRUM / Book / MAGIC_LAMP / `oc_nowish`);
  `d.real` conduct use; `rnd_otyp_by_namedesc`
  `oc_uname` arm (C `:3513–3514` — JS name/of-name/descr
  only, pre-existing match-set gap); `dn` / `origbp`
  POINTER-vs-value srch-skip nuance (C `!=` on pointers
  re-draws for value-equal `X labeled X`; JS
  string-compare skips — rare, untouched).

## C ↔ JS fidelity

Checked each arm against pinned C, in C order. Real/fake
preparse matches `objnam.c:4125–4133` verbatim, including
the don't-negate-fake note (`"real fake amulet"` stays
fake) ✓. Amulet block matches `:4284–4309`: cheap /
plastic / imitation folds, `d.real = !d.fake` force, then
`d.typ = real ? AMULET : FAKE` — with the `:5002–5006`
typfnd non-wizard→fake fold inlined as `(d.real &&
wizardMode()) ? AMULET_OF_YENDOR : FAKE_AMULET_OF_YENDOR`
(outcome-equivalent: C routes AMULET through typfnd to
FAKE when `!wizard`), and the tail `if (d.typ) d.oclass =
…` (`readobjnam.js:960`) covers typfnd's oclass set ✓.
Makesingular skip via `!d.typ` is the `return 2`
(`goto typfnd`) equivalent for the Amulet / alt-spelling
arms ✓. Alt-spellings loop matches `:4457–4467`
(`wishymatch(bp, sp, TRUE)`, first hit wins → `break`)
✓. Gem-exact + tin matches `:4731–4747`: `!oclass`
gate ✓, `bases[GEM_CLASS]..LAST_REAL_GEM` bounds ✓ —
verified `LAST_REAL_GEM = 460` ≡ C
`MARKER(LAST_REAL_GEM, JADE)` (`objectNameStrs[460] ===
"jade"`), `objectNameStrs` ≡ `OBJ_NAME` order, strcmpi ≡
lower-compare ✓. srch chain guarded by `!d.typ` (C
reaches `srch:` solely via `goto srch`) ✓; the chain
itself (actualn → dn → un → origbp) is pre-existing
shape, only the guard is new. Unit oracle (D-log,
bare-game harness + caller-tagged RNG log): six wishes
(`diamond`→440, `uncursed luckstone`→470, `3 cheap
plastic imitation of the Amulet of Yendor`→212,
`tin`→296, `saber`→51, `cursed slime mold`→285) — all
exact otyps with zero pre-`mksobj` srch draws.
**Gap (debt, §Actionable):** the two bp normalizations
immediately after the spellings loop — `:4469–4470`
"grey spell"→"gray spell" and the "armour"→"armor" shave
below it — are neither ported (no `grey spell` /
`armour` handling anywhere in `js/readobjnam.js`) nor
named. Same zero-draw envelope, British-spelling wishes
only; exotic, zero corpus coverage.

## Hallucinations / overclaim

None. D-log correctly demotes `next_ident` to symptom
owner with the 8-call-site audit (incl. the
`makemon.js:424` clone sharing `game.context.ident`),
kills the mksobj-order swap hypothesis by measurement,
and names the remainder gaps. No "Match C" claim beyond
the ported arms.

## Density

Five arms + extractor in one envelope — one C locus
family (`readobjnam` pre-srch), one falsifier
(`next_ident` first-divergence on six wishes).
Right-sized.

## Verification

Re-measured myself:

```
node scripts/hidden-proxy.mjs verify next_ident --base 8f9bd758~1
→ 0 PASS, 5 moved past, 1 unchanged, 0 worse → PROGRESS
```

Strictly better than the D-log's 3-moved (D-2022 later
moved tour-Wizard-92103 and poly-Priest-92021 past
`next_ident` too; 0 worse either way) — claim CONFIRMED.
Remainder Knight-92130 still `next_ident`@90 is the known
slime-mold writer (NOTES C-recorder falsifier owed, now a
D-2022 "unchanged" too). Rule #2 clean (global re-run).
Cited green + strict ×2, cohort 7/7.

## Actionable C-wrongs

1. Port or name the `:4469–4477` bp fixups ("grey
   spell", "armour") — same zero-draw envelope as the
   ported spellings loop, currently unnamed. One-port-iter
   unit-oracle fix; map-naming suffices if the corpus
   never reaches them.

Verdict: **ACCEPT-WITH-DEBT**
