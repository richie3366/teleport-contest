# Review 2691 — 6b6afdc03 — Infravision race fallback gated on Upolyd

Metadata: SHA `6b6afdc03`, D-3828, cliffs head `polyself.c`
polymon writer (polymon untouched — whole). JS: `js/display.js`
(one gate line + comment). Test:
`scripts/poly-infravision.test.mjs`.

## Intent vs deliverable

Promise: poly'd hero kept racial infravision via the ungated
D-0039 fallback, so newsym painted the sensed monster `f`
instead of C's Warning `1`; gate the fallback on Upolyd.
Claimed: 95346 → PASS. Diff actually does: exactly that — one
`if (Upolyd(game.u)) return false;`, no new edge. Match.

## Inventory

- `hero_has_infravision` (js/display.js:1702) — changed: gate
  inserted between the H/E-flat check and the race fallback.
  Single caller (:1718, `see_with_infrared`). C: `Infravision ≡
  H||E` (`youprop.h:184–186` — the D-log's "display.h" file is a
  typo; the JS comment cites youprop.h correctly);
  `PROPSET(INFRAVISION, infravision(Upolyd ? mdat :
  &mons[urace]))` (`polyself.c:92` — the cited `:84–85` is
  drift); `newsym :1046–1056` (read): infrared+visible →
  display_monster, else mon_warning → display_warning.
- `Upolyd` (js/const.js:3216) — verified ≡ C `you.h:554`
  (`umontnum != umonster`), pre-imported in display.js.
- No new helpers, imports, deletes, or re-points — nothing for
  `sym.mjs`.

## C ↔ JS fidelity

C's rule is total: while poly'd, infravision comes only from
the property (set_uasmon manages FROMFORM); the race default
applies only while human (`Upolyd ? mdat : &mons[urace]`). The
JS gate implements exactly that split: poly'd → flats only;
human → flats + race fallback. Order inside the predicate is
correct (flats first — EInfravision extrinsic preserved as-is).
The retained human fallback is dead-or-needed only in
pre-set_uasmon windows (JS set_uasmon manages HInfravision
FROMFORM per D-3429); either way the outcome matches C. At the
probe state (poly'd dragon, HInfravision 0, Warning on,
unseen hostile at (63,5)) the predicate flips true→false, so
newsym takes the `:1055` display_warning arm — the measured red
`1`. No RNG; none added. Gap: none in behavior; two cite
typos (file + line) are doc-only.

## Hallucinations / overclaim

None. The D-log's C cites have the right numbers in the wrong
file (`display.h` for `youprop.h`) and a wrong PROPSET line
(`:84–85` for `:92`) — I verified the semantics against the
real lines; the code comment gets the file right. Ledger-text
class: never a row.

## Density

Cliff-phase: head writer correct (property predicate, not a
re-port of polymon). One line, one clone-site fixed, sibling
paths untouched. Ledger: `see_with_infrared ported`. Verify
bullet: 1 PASS + REACH-OK + green + strict + cohort + full 44
(auto on shared-file change). Not unreached: probe PASSES.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify polymon --base 6b6afdc03~1
--reach-all` → `verify polymon: 1 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS` (95346 PASS) and `reach …
84/84 PASS, 0 regressed → REACH-OK` (superset of the D-log's
80/80 spread). Exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
