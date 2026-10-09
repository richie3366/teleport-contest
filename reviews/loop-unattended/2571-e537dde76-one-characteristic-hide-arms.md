# Review 2571 — e537dde76 — one_characteristic hide arms (D-3701)

## Metadata

- SHA: `e537dde76dccdc71286c64ffaf1748745711f25b` (2026-10-09, D-3701)
- Scope: ≤10-function cliff-phase refill — whole Method on
  `one_characteristic` (+ its extracted helper)
- Diff: `js/invent.js` +73/−25, new
  `scripts/characteristics-hide-innate.test.mjs` (170 lines), ledger
  `one_characteristic` partial → ported
- Context: supervisor-ordered map refill; queue empty, batch no gap
  (D-3699/D-3700 refill precedent)

## Intent vs deliverable

Subject promises: extract `one_characteristic_hide_innate(attrindx, mode)`
in C order (Upolyd → Fixed_abil/stuck-ring short-circuit → 7-way switch
with cites → MAGIC clearing unless poly'd); both line builders take mode
and early-return the plain value when hidden; mode threaded at both call
sites. The diff delivers exactly that: one new export, two builders
gaining a `mode` param, two widened imports + one generated-data import +
3 otyp consts. No other `js/` touched. Promise matches deliverable.

## Inventory

- `one_characteristic_hide_innate` (`js/invent.js:5269`, new, sync): the
  C `:860–893` hide computation. Single definition, no conflicts.
- `one_characteristic_line` (`:5323`) / `one_characteristic_line_final`
  (`:7655`): file-local → exported (test seam), each +mode param + hide
  early-return. Single definitions, no clones.
- Callees/consts, all LIVE, no clones introduced: `Upolyd`
  (`js/const.js:3216`), `stuck_ring` (`js/do_wear.js:4381`),
  `u_wield_art` (`js/artifact.js:921` — the export, correctly IMPORTed
  despite 4 local clones elsewhere), `MAGICENLIGHTENMENT`
  (`js/const.js:1934`, already imported at invent.js:287).
- Edges: artifact.js and do_wear.js both `--can ALREADY` (verified
  output); `artifacts_data.js` is a zero-import generated const leaf (new
  edge, no cycle/TDZ possible — same shape as the pre-existing
  monsters_data.js edge; `--can` reports it "unknown" as a tool blind
  spot). Nothing deleted or re-pointed.

## C ↔ JS fidelity

C locus (`csym.mjs one_characteristic`):
`nethack-c/upstream/src/insight.c:845–936`. Hide block `:860–893` walked
arm by arm:

- `:860–866`: Upolyd → hide; else Fixed_abil + stuck sustain ring either
  hand → hide. C `Fixed_abil` is extrinsic-only
  (`youprop.h:385` confirmed) — JS `(u.EFixed_abil|0)` is exactly that. ✓
- `:868–871` STR cursed gauntlets, `:872–873` DEX none, `:874–877` CON
  `u_wield_art(ART_OGRESMASHER) && uwep->cursed`, `:878–885` INT/WIS cursed
  dunce, `:886–887` CHA none — JS mirrors all six, including the unguarded
  `u.uwep.cursed` (safe: `u_wield_art` ≡ `is_art(uwep,·)` is true only
  with uwep wielding it). `Upolyd` ≡ `umonnum != umonster` (you.h:554);
  `stuck_ring` mirrors C's identity+otyp+stuck chain. ✓
- `:891–893` MAGIC clearing unless poly'd — JS identical, with `mode`
  threaded from a proper bitmask at both sites (doattributes `:7775–7777`
  BASIC|MAGIC-when-wizard/discover; enlightenment's own param). ✓
- `:899` hidden → plain value: both builders early-return the plain line. ✓
- `default:` (`:888–889`): C returns with NO output; JS `return false`
  (→ full line emitted). Deliberate, disclosed (commit message + code
  comment), unreachable (both call sites pass fixed A_STR..A_CHA arrays —
  verified in the diff), and pinned in-test. Not a C-wrong on any
  reachable path; no Must-fix.
- RNG: none drawn either side (pure predicate + formatting).
  Branch-by-branch confirm.

## Hallucinations / overclaim

None. The D-log opens "no corpus divergence — C-fidelity residual",
claims no movement, and quotes the tool's own `note hidden` line. The
0/9→9/9 test story (incl. the self-caught `innate`-prefix expectation)
is consistent with the shipped test.

## Density

Legitimate refill under the D-3699 precedent: one C function family,
`js/invent.js` only + its test, ledger omit fully retired,
`Ledger: one_characteristic ported` present. Plus a full 44/44 public run
in the D-log (public sessions press ^X; 0 corpus recipes contain \x18).
Not a no-op, no bundling.

## Verification

- Focused test: `node --test
  scripts/characteristics-hide-innate.test.mjs` → 9/9 pass (ran here).
- Re-measure (`verify one_characteristic --base e537dde76~1 --reach-all`):
  0 blocked at baseline (matches the D-log); `smoke: no RNG-tagged reach;
  fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK`. Zero
  regressions.
- Hygiene: diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2568).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
