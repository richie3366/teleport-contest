# Review 737 — c4a32e7c — ball.c ballfall + do_wear.c hard_helmet (D-1778)

## Metadata
- Full / short hash: `c4a32e7cdc3f518905e043c2597cb5724fc84aae` / `c4a32e7c`
- Parent: `cd3e1091` (D-1777). Tenth of ten `js/` commits this audit. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 18:04:05 +0200
- D-id: **D-1778**
- Stats: `js/ball.js` +49/−4; `js/do_wear.js` +14/−2; `js/do.js` +6/−3; `js/trap.js` +10/−15; clones deleted in dothrow/mhitu/potion/uhitm/zap. Total `js/` insertions **88** <250. Band **150–350**.
- Claims to close: Open `ball.c` ballfall. Not `drop_ball`. Not remaining `is_helmet` in u_init/worn. Review **736** named ballfall. `reviews/loop-2026-08-15/` has no unpaid ballfall Must-fix.
- JS / map: `ball.js` `ballfall`; `do_wear.js` `hard_helmet`/`is_helmet`; callers `do.js`/`trap.js`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1778 `c4a32e7c`.

## Intent vs deliverable

Git subject promises: Match C `ball.c` `ballfall` so a Punished hero falling to a new level takes the iron ball on the head, instead of two deferred comments where the call belongs.

`node scripts/csym.mjs ballfall` → `ball.c:42–67`. `--callers`: `do.c:1807`; `trap.c:1957`. `hard_helmet` → `do_wear.c:567–573`. `is_helmet` → `obj.h:283`.

```42:67:nethack-c/upstream/src/ball.c
void
ballfall(void)
{
    boolean gets_hit;
    if (!uball || (uball && carried(uball) && welded(uball)))
        return;
    gets_hit = (((uball->ox != u.ux) || (uball->oy != u.uy))
                && ((uwep == uball) ? FALSE : (boolean) rn2(5)));
    ballrelease(TRUE);
    if (gets_hit) {
        int dmg = rn1(7, 25);
        /* hard_helmet cap 3 / verbose Yname2; losehp Maybe_Half_Phys */
    }
}
```

Parent: `// deferred` at both C sites; six `hard_helmet` clones (dothrow/trap **skipped** `is_helmet` and inlined IRON..MITHRIL). The diff **does** port `ballfall` with C evaluation order, wire both callers, export `hard_helmet`/`is_helmet` from `do_wear.js`, delete six clones. It **does not** port `drop_ball`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `ballfall` | LIVE new | `:42–67` |
| `hard_helmet` | LIVE new (was 6 clones) | `:567–573` |
| `is_helmet` | LIVE new | obj.h; u_init/worn clones remain |
| `is_metallic` / `is_crackable` | LIVE | mkobj.js |
| `ballrelease` | LIVE | D-0918 |
| `welded` / `carried` | LIVE / local clone | ball.js `carried` already |
| `Yname2` | LIVE import | objnam.js |
| `losehp` / `maybe_half_phys` / `finish_maybe_wail` | LIVE | |
| `do.c` `:1805–1809` | LIVE repaired | falling rndspot |
| `trap.c` `:1955–1958` | LIVE repaired | unplacebc / ballfall / placebc |
| `drop_ball` | OMIT named | |
| u_init/worn `is_helmet` | CLONE leftover | Open row |

`node scripts/sym.mjs` (clone → import):

```
ballfall         js/ball.js:99   ASYNC — await required
hard_helmet      js/do_wear.js:181   sync
is_helmet        js/do_wear.js:171   sync
             !! ALSO 2 LOCAL CLONE(S)
               js/u_init.js:995  js/worn.js:104
is_metallic      js/mkobj.js:2704   sync
is_crackable     js/mkobj.js:604   sync
ballrelease      js/ball.js:76   ASYNC — await required
welded           js/wield.js:178   sync
carried          js/eat.js:1960   sync + ball.js:43 clone
Yname2           js/objnam.js:1891   sync
```

`--can ball.js do_wear.js hard_helmet`: **ALREADY**. `--can do.js ball.js ballfall`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`: **none** (diff hit SPE_FORCE_BOLT minus-comment only). `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Early return (`:47–48`).** No ball, or carried **and** welded. JS `!uball || (carried && welded)`. **Match.** Welded carried ball draws **zero** `rn2` and stays in invent.

**`gets_hit` then `ballrelease` (`:50–53`).** Position off hero **and** (`uwep==uball` ? FALSE : `rn2(5)`). Ternary short-circuit: wielded ball **does not** draw. Then `ballrelease(TRUE)` **always** if past the early return. JS computes `gets_hit` first with the same `?:`. **Match RNG order.** Parenthetical C `(uball && carried && welded)` does not change this.

**Hit arm (`:54–66`).** `rn1(7,25)`; pline HEAD; if `uarmh`: `hard_helmet` → dmg=3 else verbose `Yname2`; `losehp(Maybe_Half_Phys, …, NO_KILLER_PREFIX)`. JS `finish_maybe_wail` is this port’s `--More--` split of `maybe_wail`. **Match.**

**`hard_helmet` (`:569–572`).** `!obj || !is_helmet` → FALSE; else metallic or crackable. **Match.** Deleted dothrow/trap clones were C-wrong (no `is_helmet`, IRON..MITHRIL). Only called with `uarmh` so the miss was inert — still a real clone lie. One export now. `sym.mjs` `hard_helmet` 0 clones.

**`is_helmet`.** ARMOR_CLASS + `ARM_HELM`. **Match obj.h.** Do not write clone #3.

**`do.c:1805–1808`.** `falling` after `u_on_rndspot`: `Punished && !welded(uball)` then `selftouch` then `do_fall_dmg`. JS `:1801` uses `u.Punished`. C `Punished` is `uball != 0` (`youprop.h:77`). Nearby `goto_level` comments say do **not** trust sticky `u.Punished`. If the flag stays synced with `uball`, the arm matches; if they diverge, this caller skips a live ball. Not Must-fix without a desync proof — **do not** treat `u.Punished` as the spec on the next ball peel; prefer `u.uball`.

**`trap.c:1955–1958`.** `Punished && !carried(uball)` → `unplacebc(); ballfall(); placebc();` then `selftouch`. JS the same order. **Match.** `carried` here is the eat.js import (comment: not clone #5).

**Callee closure (`ballfall`).** LIVE: `ballrelease`, `hard_helmet`, `is_helmet`, `is_metallic`, `is_crackable`, `welded`, `carried`, `Yname2`, `losehp`, `rn2`/`rn1`. OMIT named: `drop_ball`. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “Match C `ballfall`” is true for the helper and both C call sites. “instead of two deferred comments” is true. D-log probe RNG counts match C short-circuit. Do **not** stamp “Match C `drop_ball`.” Do **not** stamp “every `is_helmet` clone is gone.” Journal 44/44 is no-regression; Punished-while-falling **public-unhit**.

## Density

§2b: `ballfall` + its `hard_helmet` callee + both C callers + delete the six clones that callee needed. +88 / net smaller. Consecutive? One Open row plus related clone retirement. Did **not** glue `drop_ball` / litter hitfloor. Did **not** invent a FAIL peel.

## Verification

D-log: green+strict seed8000/0900; full `sessions` **44**/44; per-session strict seed4500/0030/0012/0014/0360; direct rng-log short-circuit + `hard_helmet` object-table canary (long sword / iron shoes false). save-oracle skip (untagged). Rule #2 clean. Suite cannot hit this arm. Admit that.

## Actionable C-wrongs

None for Must-fix (`ballfall` / `hard_helmet` / callers match C; leftovers named). Named: `drop_ball`; u_init/worn `is_helmet`; ball.js `carried` clone. Do **not** draw `rn2(5)` after `ballrelease`. Do **not** draw when ball is on the hero or is `uwep`. Do **not** restore dothrow/trap material-range `hard_helmet`. Do **not** write `is_helmet` clone #3. Do **not** skip `is_helmet` inside `hard_helmet`. Do **not** re-port D-1777 Blind `move_bc`.

Verdict: **ACCEPT-WITH-DEBT**
