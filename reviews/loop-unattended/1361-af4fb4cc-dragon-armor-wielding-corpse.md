# Review 1361 — af4fb4cc — dragon_armor_handling color/arti_light arms (D-2395)

- SHA: `af4fb4cc`, D-2395 (D-0636 deferred). JS files: `js/do_wear.js`
  only (+91/−16). (No D-id collision: CURRENT's "D-2395
  wielding_corpse" line describes this same commit.)
- Prior reviews closed: none (map-driven residual, 0 blocks).

## Intent vs deliverable

Subject promises the RED/GOLD/YELLOW/arti_light arms + canonical
`wielding_corpse`. Diff adds all of those, arm-for-arm, plus the
`Armor_on`/`Armor_off` envelope blocks. But it wires only 2 of the 4
live C call sites of the new function and names only the timeout
pair — the gloves-doff pair is neither wired nor named (C-wrong 1).

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `wielding_corpse` (do_wear.js:440) | new, exported async | LIVE (C is extern — export correct; single export, no prior clone) |
| `dragon_armor_handling` RED/GOLD/YELLOW | changed arms | LIVE |
| `Armor_on` (known + begin_burn) | changed | LIVE (`find_ac` kept, house-noted) |
| `Armor_off` (mask/cancelled/end_burn) | changed | LIVE |
| `touch_petrifies`/`mons` (monsters.js:71) | C callees, existing edge | LIVE |
| `instapetrify` (trap.js:76) | C callee, existing edge | LIVE |
| `Yname2/corpse_xname/killer_xname/arti_light_description` | existing objnam edge extended | LIVE |
| `begin_burn` (timeout) | existing edge extended | LIVE |
| `strsubst` (hacklib) | new file edge | SAFE, call-time use only |
| `make_hallucinated` (potion) | new file edge, awaited | SAFE (`--can` → ALREADY; ASYNC-await obeyed) |
| `see_monsters` (display) | already imported, now called | LIVE, sync — matches C `void` |
| `is_gloves` (do_wear.js:225) | file-local helper | pre-existing, not a clone |
| `remove_worn_item` (file-local thin) | CLONE | review-47 pattern (W_WEP-only); documented in docstring |

Required checks: `sym.mjs wielding_corpse → js/do_wear.js:440 ASYNC`;
`sym.mjs make_hallucinated → js/potion.js:1018 ASYNC` (awaited at
call); `imports.mjs --can do_wear.js potion.js make_hallucinated →
ALREADY`. Nothing deleted.

## C ↔ JS fidelity

C loci opened: `wielding_corpse` (`do_wear.c:606–643`, csym range),
`dragon_armor_handling` + `Armor_on` + `Armor_off` (`:797–935`, read
in pinned source), callers (`--callers wielding_corpse`: do_wear.c
:687/:696 gloves, :869/:870 yellow, timeout.c :841/:842).

- `wielding_corpse` body vs `:606–643` is exact: null/non-CORPSE/
  `uarmg` return; uwep-or-(uswapwep+twoweap) gate with C's comment
  preserved; `touch_petrifies(mons(corpsenm))` + resistance gate;
  "now wield"/"are wielding" + `corpse_xname(obj,null,CXN_ARTICLE)`
  + `makeplural(body_part(HAND))` in the house `pline('You …')`
  idiom (19 same-file uses); removing/losing + gloves-name/`strsubst`
  hbuf ("resistance timing out" when `how` null); `while wielding
  killer_xname` kbuf; `await instapetrify`; re-checked remove via the
  weapon-thin helper. ✓
- RED: `see_monsters()` unconditionally both directions (C `:844`
  sits after the if/else). ✓ GOLD:
  `make_hallucinated(!puton, !restoring, W_ARM)` — `puton ? 0 : 1`
  and `!(restoring)` are exact. ✓ YELLOW: doff-only
  `wielding_corpse(uwep/uswapwep, otmp, on_purpose)` pair. ✓
- `Armor_on :886–900`: known→`update_inventory`, dragon TRUE/TRUE,
  gold `artifact_light && !lamplit` → `begin_burn(FALSE)` +
  `Yname2/otense/arti_light_description` pline — C order. ✓
- `Armor_off :909–930`: snapshot → mask clear → `setworn(NULL)` →
  `cancelled_don=FALSE` → `was && !artifact_light` → `end_burn(FALSE)`
  + `Tobjnam stop shining` → dragon FALSE/TRUE — C order, including
  the non-fatal-before-fatal comment rationale. ✓
- Resistance-gate audit (flats-only triple-OR vs C `Stone_resistance`
  ≡ H||E single storage, `youprop.h:63–65`): the new clone matches
  the pre-existing `Stone_resistance_hero()` shape; the fuller
  `hero_Stone_resistance` (flats+uprops) is file-local in invent.js
  (not importable without refactor); and every STONE_RES writer at
  this SHA co-writes the flat (`eat.js` gain via
  `incr_itimeout_prop(HStone_resistance)`, `timeout.js:1209` sets flat
  alongside uprops, mirror is flat→uprops only) — no reachable split
  state, so no divergence here. (If a future path sets
  uprops[STONE_RES] without the flat, all three readers need the
  fuller shape — noted, not Actionable now.)
- Caller closure: yellow pair wired ✓; timeout.c:841–842 pair named
  in map (turns.md:45 + timeout.js header) ✓; gloves :687/:696 pair
  neither wired nor named ✗ (C-wrong 1). No RNG in these arms.

## Hallucinations / overclaim

D-log Verify bullet honest (vacuous, NOT a PASS). But "Named
omissions: none new" is false comfort given the unnamed gloves
caller below.

## Density

One C family (function + one switch + two envelopes), code + map +
verify. Right-sized (§2b).

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|hardcod` → 0.
- Re-measured: `verify dragon_armor_handling --base af4fb4cc~1` →
  `0 session(s) blocked (0 at baseline, 0 working)`. Matches D-log.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted.

## Actionable C-wrongs

1. `Gloves_off` misses the C `do_wear.c:687/696`
   `wielding_corpse` pair. C `Gloves_off` calls
   `wielding_corpse(uwep/uswapwep, gloves, on_purpose)` under the
   CORPSE gates when gloves come off; JS `Gloves_off`
   (`js/do_wear.js:791`) is still bare `clear_worn` with no call, and
   no map line names it (map names only the `timeout.c:841–842`
   pair). Doffing gloves while wielding a cockatrice corpse skips the
   petrify check C runs. Fix (one iter): capture `gloves` +
   `on_purpose = !mon_moving && !in_use` pre-clear per C `:647–651`,
   add the gated pair, make `Gloves_off` async and fix its callers
   (`:1373` afternmv, `:1391`, `:1868`). Other `Gloves_off`
   thin-stub gaps (Fumbling/Power/Dexterity arms, Glib, encumber) are
   pre-existing, out of scope.

Verdict: **QUALITY-RISK**

**Addressed:** D-2397
