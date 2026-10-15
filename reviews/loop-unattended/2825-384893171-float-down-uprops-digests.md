# Review 2825 — 384893171 — float_down clears uprops slot; uswallow uses live digests

- SHA: `384893171` (D-3980)
- Files: `js/trap.js` only (+~16/−3), focused test
  `scripts/float-down-clears-uprops-slot.test.mjs`
- Method: cliff writer (1 function: `float_down`); whole Method on it.
- Cites: C `trap.c:4024–4083` read directly (mask clear `:4032–4033`,
  uswallow `:4066–4071`); `youprop.h:235–240`; `mondata.h:71–72`.

## Intent vs deliverable

Promise: the `:4032–4033` mask clear missed the uprops slot so
`nh_timeout` re-levitated the hero a turn later (Barbarian 1071→1354,
Tourist 944→1734); the uswallow arm used `is_animal` where C calls
`digests` (Monk PASS). Diff actually does: slot clear added alongside
the flats, `digests` imported from `mhitu.js` and used at the uswallow
site, `LEVITATION` added to the const import. Promise and diff agree
on behavior; one wording claim does not (see Hallucinations).

## Inventory

- `float_down` — `js/trap.js:3387` (export async) vs C
  `trap.c:4024–4179`. Status: two arms repaired; rest re-checked,
  ledger-ported D-3610.

## C ↔ JS fidelity

- Mask clear: C `:4032–4033` (`HLevitation &= ~hmask; ELevitation &=
  ~emask`) where H/E **are** `uprops[LEVITATION].intrinsic/.extrinsic`
  (`youprop.h:235–236`, single storage) ✓. JS now clears flats and
  slot together — the D-3978 dual-write idiom, same direction C's
  single write has. The resurrection mechanism was measured (temp
  accessor trap, reverted; pre-fix HLev=272+Lev row, post-fix 0+clean).
- uswallow: C `:4066–4071` — `digests(u.ustuck->data) ? "swallowed" :
  "engulfed"`, `encumber_msg()`, `return 1` ✓ JS now exact (comment
  cites `:4065–4070`, off by one — trivial).
- `digests`: C `mondata.h:71–72` (`dmgtype_fromattack(ptr, AD_DGST,
  AT_ENGL)`); JS `mhitu.js:1068` loops `mattk` for AT_ENGL+AD_DGST ✓
  exact. `sym.mjs` (required: call site re-pointed):
  `digests js/mhitu.js:1068 sync`; `is_animal js/monsters.js:682
  sync`. Import edge `trap.js→mhitu.js` pre-existed (`set_ustuck`) —
  no new edge. LIVE callee, verified.
- RNG: `float_down` draws none; none added. Branch order below the
  clear untouched.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/`fastforward`/coordinates.
Rule #2 clean (this-iteration `--rulecheck`).

## Hallucinations / overclaim

The subject says "the is_animal stand-in is deleted (D-1849 class)".
That is false: `is_animal` is a **live import** (`trap.js:58`, defined
`monsters.js:682`), still imported and still used at `trap.js:584` and
`:3328`. Nothing was deleted; the float_down site was re-pointed from
the wrong (but live and correct-elsewhere) predicate to the live
`digests`. I checked the remaining `:3328` use: it is `float_up`'s
swallowed-by-animal `surface()` arm (C `trap.c:3980`), a C-correct use
of `is_animal` — not a missed sibling. Behavior change is C-exact, so
this stays an overclaim note, not a C-wrong. (Also: `:4065–4070` and
the `:4032–4033`-vs-comment cites are each off by one line.)

## Density

Cliff writer for the `do_statusline2` head: one cause, writer repaired
whole (both touched arms verified + rest re-checked), `Ledger:`
updated with the two pre-existing doc omissions restated, focused test
added. No second file, no bundled work.

## Verification

Ship-time: `verify float_down: 1 PASS (Monk full), 0 moved, 0
no-movement`; `verify do_statusline2: 0 PASS, 2 moved (Barbarian
1071→savelife@1354, Tourist 944→distfleeck@1734), 13 no-movement`;
smoke REACH-OK ×2; green/strict/cohort green.
Re-measure (`verify float_down,do_statusline2 --base 384893171~1 --jobs 4`
on HEAD): `float_down: 1 PASS, 0 moved, 0 unchanged, 0 worse →
PROGRESS` (Monk exact) + smoke 24/24 REACH-OK; `do_statusline2: 2 PASS,
2 moved past, 11 unchanged, 0 worse → PROGRESS` — both claimed moves
present at the claimed steps/owners; the 2 PASS are later SHAs'
(Valkyrie D-3983, Wizard D-3982) visible on HEAD code. No REGRESSED
session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
