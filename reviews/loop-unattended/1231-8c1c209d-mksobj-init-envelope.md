# Review 1231 — 8c1c209d — mksobj_init envelope + mkbox_cnts BoH (D-2265)

Metadata: SHA `8c1c209d` (D-2265). Pops the Open row `mkobj.c`
mksobj_init (trace reach, 0 owned blocks). js/ only in
`js/mkobj.js` (TIN/scalars/CHEST/SPBOOK/samurai/BoH arms).

## Intent vs deliverable

Subject promises: TIN cnutrit gate + canonical
`set_tin_variety`, scalar inits, CHEST `tknown`, samurai
`In_quest`, and the `mkbox_cnts` BoH arm. Diff actually adds
all six plus the `set_tin_variety`/`In_quest`/`SPINACH_TIN`/
`RANDOM_TIN` imports. Promise matches diff.

## Inventory

New: BoH arm block; scalar-init lines. Changed: TIN arm body
(inline clone → canonical import). New imports: `set_tin_variety`
(eat.js:2458 sync `export function` — hoisted declaration, and
the mkobj→eat edge already exists at HEAD per `--can`, so no
new cycle risk), `In_quest`/`SPINACH_TIN`/`RANDOM_TIN`
(const.js:3205/1920–1921, existing edge). No symbol deleted or
re-pointed (the inline tin code is replaced by the canonical
call — a clone removal, the desired direction). Callee closure
— all LIVE: `set_tin_variety`, `undead_to_corpse`,
`rndmonnum`, `rnd_class` (same-module, mkobj.js:747),
`weight`, `add_to_container`, `curse`, `blessorcurse`,
`In_quest(uz)` (dnum compare, matches C `In_quest(&u.uz)`).
No STUB in any live arm.

## C ↔ JS fidelity

- TIN vs `mkobj.c:926–941` (fetched): `corpsenm = NON_PM`
  "empty (so far)" up front, `!rn2(6)` spinach fork,
  `undead_to_corpse(rndmonnum())` loop gated on
  `mons[mndx].cnutrit && !(mvflags & G_NOCORPSE)` — JS
  `(mons(mndx)?.cnutrit | 0) && …` is exactly C's nonzero
  test (the `?.` guard only hardens out-of-range mndx).
  Before, a zero-cnutrit draw stopped the loop early (fewer
  `rndmonnum` draws + wrong contents); now it redraws like C.
  Canonical `set_tin_variety` (eat.js:2458–2480, read this
  audit) matches `eat.c:1460–1486` (fetched) arm-for-arm:
  SPINACH → NON_PM + spe 1; RANDOM → `rn2(TTSZ-1)` with the
  ROTTEN→HOMEMADE remap for nonrotting corpses — the remap
  the old inline clone (`spe = -(r+1)`) skipped. Ordering
  matters and is right: the loop sets `corpsenm` first, then
  `set_tin_variety(RANDOM_TIN)` reads it as `mnum`. C.
- BoH vs `mkobj.c:371–379` (fetched): gated on the *box*
  being `BAG_OF_HOLDING`; `Is_mbag` (`obj.h:339`: BoH ||
  BoT) → SACK + spe 0 + `weight()` recompute; **else**
  `while (CANCELLATION) rnd_class(WAN_LIGHT,
  WAN_LIGHTNING)` — C's `else` + `while` reproduced exactly,
  including *no* `weight()` recompute after the wand re-roll
  (C has none either). C.
- Scalars vs cited lines (all confirmed via grep this audit):
  FOOD `oeaten = 0` (`:896`, arm top both sides); TIN NON_PM
  (`:926`); GEM `corpsenm = 0` (`:977`, LOADSTONE hack);
  SPBOOK `spestudied = 0` (`:1082`, before `blessorcurse`);
  CHEST `tknown = otrapped && !rn2(100)` (`:1014`) — JS
  ternary preserves the short-circuit (no `rn2(100)` draw
  when untrapped) and the always-assign (old code left stale
  `tknown`); samurai `moves <= 1 || In_quest` (`:1105`). C.

## Hallucinations / overclaim

None. The "four live C-arms diverged with state/RNG
consequences" claim is demonstrated arm-by-arm above; the
Verify bullet labels the corpus check vacuous and pastes the
`--base f7aec9b3` re-run tail.

## Density

One-function envelope (mksobj_init + its box helper), one JS
module. In-band.

## Verification

Re-measured myself: `hidden-proxy verify mksobj_init --base
8c1c209d~1` → 0 blocked at baseline and working scoreboard
(vacuous, as labeled); `verify.mjs --fn mksobj_init` at HEAD
→ rule2 PASS, green 2/2, strict ×2, cohort 7/7, VERIFY: PASS.
Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None. The `panic`/timers/bless/weight/VENOM tails stay named
defers, not Must-fix.

Verdict: **ACCEPT**
