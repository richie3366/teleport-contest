# Review 2538 — 3ea3d48c3 — des class monsters female clobber

Metadata: SHA `3ea3d48c337213d2815837d691c01e88527341d9`, D-3659, cliff-head
`mcastu.c` mcast_death_touch via writer `sp_lev.c` create_monster.
js diff +14/−2 in `js/mklev.js` (3 one-line clobbers + comments; + focused
test `scripts/des-monster-class-female.test.mjs`).

## Intent vs deliverable

Promise: C "he's" vs JS "she's" with zero pronoun-path draws → caster
female differs (C 0 / JS 1); des.monster class letters keep the
`tmpmons.female = 0` default, and C `create_monster :2125` clobbers the
makemon birth draw — the three loader-local placeClassAt clones never did.
Add `if (mtmp) mtmp.female = 0;` in C order in all three. Diff does exactly
that (plus two behavior-preserving `if (!pm) return` restructures to
capture mtmp). Matches; nothing bundled.

## Inventory

- Three loader-local `placeClassAt` clones in `js/mklev.js` (`load_wiz_strt`
  `:6898`, `load_minetn_5` `:17907`, `load_wizard3` `:27306`) — one line
  each. C: `create_monster`, `sp_lev.c:1924–2187` (per `csym.mjs`); the
  class path is `m->id==NON_PM → mkclass(class, G_NOGEN)` + `makemon`, and
  the unconditional `mtmp->female = m->female` at `:2125` (verified by
  direct read), peaceful at `:2126–2130`.
- No helpers added/removed/re-pointed; no new imports. `sym.mjs
  create_monster`: NOT FOUND in js/ — correct, JS loads special levels via
  hand loaders + `splev_create_monster` (D-0873), not a create_monster port.

## C ↔ JS fidelity

- Default: `tmpmons.female = 0;` at `sp_lev.c:3230` verified by direct read
  ✓. Class letters carry no gender (unlike named `MONSTER:` lines), so
  `m->female` is 0 on the class path and `:2125` clobbers the birth draw.
- Each clone mirrors the C class path: class letter → mlet → `mkclass(mlet,
  G_NOGEN)` → `makemon(pm,…,0)` ✓; the clobber now follows makemon, before
  the peaceful arm where present (wiz_strt) — C order `:2125`→`:2126` ✓.
- Exactly three `mtmp.female = 0` sites exist in `js/mklev.js` (grep:
  `:6908/:17919/:27323`) ✓ — no stray fourth, and the named path keeps des
  gender (`placeNamedAt`, Ixoth-style `r.female`), correctly distinguished.
- Pronoun chain verified end-to-end: `mcast_death_touch` plines
  `mhe(mtmp)` (`js/mcastu.js:476`) → `pronoun_gender(PRONOUN_HALLU)` →
  non-hallu spotted humanoid non-neuter → `mtmp.female ? she : he`
  (`js/mondata.js:1235`). The C step-71 dice (`rn2(27)` + `d(8,6)`, zero
  `rn2(4)`) confirm non-hallu, so female is the sole decider ✓.
- RNG: the clobber is a plain assignment — draw order untouched, consistent
  with RNG flat 17006/17006 ✓.
- Callee closure: `mkclass`, `makemon`, `splev_resolve_occupied` all live;
  the change adds no calls.

Residuals (both honestly Named, other-file/pre-existing): (1) the
enumerated bare mkclass+makemon sites stay unaudited for des-vs-random
attribution — correctly NOT clobbered blindly, since random-fill sites
must keep birth female; (2) the 4-arg clone's mpeaceful still lacks C
`:2127–2130` set_malign. Neither is introduced here.

## Hallucinations / overclaim

None — including the flagged label oddity. The D-log discloses that verify
labels the step-81 landing `js-throw@81` while direct replay + `show` read
kind=screen error=null. This review re-ran both: `show` at HEAD reads
`kind=screen, error=null, owner=null` (JS "Save bones? [yn] (n)" vs C
empty topline, RNG flat), and my own re-verify reproduces the `js-throw`
label for the same step — i.e. the label is a verify artifact on
owner-null landings, not a hidden throw. The disclosure is accurate and the
follow-up (bones-prompt timing cliff) is genuinely separate work.

## Density

Cliff-phase §2b: one cliff, writer correctly chosen (the pronoun writer is
the level loader, not the spell). Whole-arm port (all three clones, C
order). Ledger entry updated. No bundling. Per-clone: each ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward` in `js/`.
  Rule #2: no new imports.
- D-log Verify: mcast 71→81 moved + reach 1/1 + create_monster reach 20/20
  + green/strict/cohort + full 44/44.
- Re-measure: `verify mcast_death_touch,create_monster --base 3ea3d48c3~1
  --reach-all` → `0 PASS, 1 moved past (71→81), 0 unchanged, 0 worse →
  PROGRESS` + reach 1/1 and 20/20 REACH-OK. Claim reproduced exactly;
  no REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
