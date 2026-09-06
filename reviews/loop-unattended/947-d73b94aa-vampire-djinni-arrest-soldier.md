# Review 947 — d73b94aa — sounds.c domonnoise MS_VAMPIRE/DJINNI/ARREST/SOLDIER chat depth (D-1977)

- SHA: `d73b94aa` — "sounds.c domonnoise MS_VAMPIRE/DJINNI/ARREST/SOLDIER chat depth (D-1977)."
- D-id: D-1977. JS: `js/sounds.js` (+147/−34). C locus: `nethack-c/upstream/src/sounds.c` `domonnoise` `:678–1242`, arms `:744–821`, `:991–1004`, `:1129–1141`, `:1179–1191`.
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises four chat arms in C switch order with exact RNG
discipline. Diff actually adds: MS_VAMPIRE / MS_DJINNI / MS_ARREST /
MS_SOLDIER else-if arms, PM_* index consts, import-name extensions
(`pmname`, `an`, `Upolyd`/`BLOOD`/`FEMALE`/`MALE`, `body_part`,
`midnight`), deferred-list comment update. Promise matches deliverable.

## Inventory

- New: 4 arms inside `domonnoise` (no new functions), 9 PM_* consts.
- Changed: deferred comment (VAMPIRE/DJINNI/ARREST/SOLDIER struck).
- No deletions/re-points. Arm placement is cosmetic anyway: disjoint
  `msound ===` checks cannot diverge by order.

## C ↔ JS fidelity

All four arms walked against the C text (csym range + `sed` of the
cited spans):

- VAMPIRE `:744–821` ✓: isnight/kindred/nightchild/racenoun predicates
  exact (racenoun female→f→m→noun chain ✓); tame kindred + tame
  nightchild/midnight/isnight strings verbatim ✓; peaceful three
  branches verbatim ✓; hostile kindred string is the exact C
  concatenation ✓; silver-dragon Fool/Young Fool + sheen sentence is
  the exact C Sprintf ✓; `rn2(SIZE(vampmsg))` → `rn2(2)` with 0/1
  branches and the unreachable third arm dropped (documented — SIZE is
  2 in C, verified in the fetched body) ✓; index-1
  `Upolyd ? an(pmname(mons[umonnum], sex)) : an(racenoun)` ✓.
  `&mons[]` pointer gates → `.mndx` compares: sound adaptation
  (JS `mons()` is fresh per call; `mndx` rides `set_mon_data`), named
  in-comment ✓.
- DJINNI `:991–1004` ✓: tame apologies / peaceful water-demon gurgle
  vs freedom / hostile threat vs prisoner vagueness — all four strings
  and both `ptr` gates exact.
- ARREST `:1129–1141` ✓ with one structural note: C's peaceful arm
  speaks *immediately* (`SetVoice` + `verbalize`) leaving verbl_msg
  NULL, while JS routes through the epilogue's SetVoice+verbalize.
  Identical today — SetVoice is a live-imported no-op both sides
  (D-1752 premise, re-confirmed import at sounds.js:57), no pline_msg
  to reorder against, and the mcan arm is unimplemented in the JS
  epilogue so C's mcan-proof immediacy is preserved by accident. The
  D-log states exactly this. Landmine for the future `verbl_msg_mcan`
  consumption row: when the epilogue learns mcan, ARREST-peaceful must
  keep speaking (C does) — flagged here, not a wrong today.
- SOLDIER `:1179–1191` ✓: both 3-tables verbatim, `mpeaceful`
  selection, single `rn2(3)` ✓.

RNG call-for-call: one draw in exactly the three C-draw arms (hostile
stranger vampire, hostile kop, soldier either way); `night()`/
`midnight()` verified pure time reads (calendar.js:177/183, no RNG);
`body_part` → `mbodypart` verified RNG-free over its full body (no
rn2/rnd/random). D-log's "RNG order is C-exact" holds.

Callee closure: `Monnam`/`pmname` (do_name edge), `an`/`vtense`
(objnam edge), `night`/`midnight` (calendar edge), `Upolyd`/consts
(const edge), `body_part` (polyself edge) — `--can` re-checked:
sounds.js→polyself.js is ALREADY (D-log's "new edge" means new *name*,
minor wording), all others extend existing edges. `ptr` was already in
scope (sounds.js:859). No STUBs, no clones introduced.

## Hallucinations / overclaim

"RNG order C-exact" verified true above. No dispatch/stub mismatch.
Map updated in-commit: remaining BRIBE+CUSS/SPELL/NURSE/GUARD +
verbl_msg_mcan + oracle_loc stay named ✓.

## Density

+147/−34, one C function family (four switch arms), one module.
Right-size per §2b.

## Verification

Honest vacuous note (0 blocks, no corpus-PASS claimed); green + strict
+ cohort + full 44/44. Re-measured: `verify domonnoise --base
d73b94aa~1` → 0 blocked at baseline and now. The 8/8 headless probe
(seeded RNG + queued keys, deleted after) exercises the unreached arms
including ECMD_TIME returns. `imports.mjs --rulecheck` clean (re-run
this review). Added-line grep: no banned tokens.

## Actionable C-wrongs

None. (Future-row note: keep ARREST-peaceful speaking when the mcan
epilogue consumption lands.)

Verdict: **ACCEPT**
