# Review 2688 — 8c982316b — convert_arg %x reads live Blind()

Metadata: SHA `8c982316b`, D-3825, cliffs head `pline.c` You_see
writer (You_see untouched — painter). JS: `js/questpgr.js`
(import + one arm). Test: `scripts/convert-arg-blind.test.mjs`.

## Intent vs deliverable

Promise: the `%x` arm read dead `u.Blind/u.HBlind/u.EBlind`
flats and missed the worn blindfold ("see" for "sense"); import
the live `Blind()` export. Claimed: 95337 → PASS. Diff actually
does: exactly that — dead inline deleted, `Blind() ? 'sense' :
'see'`. Match.

## Inventory

- `convert_arg` (js/questpgr.js:906) — changed: `%x` arm only.
  C `questpgr.c:235–325` (csym): `case 'x': str = Blind ?
  "sense" : "see"`; single C call site `convert_line :343` →
  JS convert_line (unchanged, pre-wired).
- `Blind` (js/invent.js:371, sync) — imported (questpgr→invent
  edge ALREADY; `--can` confirms no new edge). `sym.mjs Blind`
  → `Blind js/invent.js:371 sync` + 30 remaining local clones
  elsewhere — untouched, correctly not swept (D-log Next names
  only the four measured-dead ones as future-row candidates).
- C `Blind ≡ (HBlinded || EBlinded) && !BBlinded`
  (`youprop.h:103`, read).

## C ↔ JS fidelity

Arm-for-arm exact: `str = Blind() ? 'sense' : 'see'` ≡ C `:311`.
Dead-read claim verified: zero writers of `u.HBlind`/`u.EBlind`
in `js/`; the `u.Blind` sticky is written only by make_blinded
(do.js:3780) plus a lock.js save/restore — never by the
extrinsic blindfold path. The shared `Blind()` body ≡ the C
macro over the flats, plus a pre-existing `uroleplay?.blind`
arm: C-equivalent in outcome — C's permablind flows through
`HBlinded |= FROMOUTSIDE` at `u_init.c:1027–1028` (read), so both
sides answer true there; and the probe state (`HBlinded=0,
EBlinded=524288, BBlinded=0` → true) matches C's macro directly.
No branch-order or RNG surface (pure substitution). No other arm
touched (D-1649 whole-audit stands). Gap: none.

## Hallucinations / overclaim

None. Owner-vs-writer right (You_see paints; `%x` writes).
Pre-fix 2/4 → post-fix 4/4 on the focused test is the honest
shape (both sense cases failed).

## Density

Cliff-phase: head writer correct, one arm, one clone fewer,
sibling clones deliberately left for board-named rows (right —
no sweep). Ledger: `convert_arg ported`. Verify bullet: 1 PASS
+ REACH-OK ×2 + green + strict + cohort. Not unreached: probe
PASSES.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify You_see,convert_arg --base
8c982316b~1 --reach-all` → `verify You_see: 1 PASS, 0 moved
past, 0 unchanged, 0 worse → PROGRESS` (95337 PASS), smoke
24/24 REACH-OK ×2; convert_arg vacuous at baseline (as the D-log
says). Exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
