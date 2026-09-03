# Review 747 — c4a32e7c — ball.c ballfall + do_wear.c hard_helmet (D-1778)

## Metadata
- Full / short hash: `c4a32e7cdc3f518905e043c2597cb5724fc84aae` / `c4a32e7c`
- Parent: `cd3e1091` (D-1777). **Re-audit** of review **737** (ACCEPT-WITH-DEBT). Independent pinned-C walk. **737 was wrong:** both live callers are dead.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 18:04:05 +0200
- D-id: **D-1778**
- Stats: `js/ball.js` +49/−4; `js/do_wear.js` +14/−2; `js/do.js` +6/−3; `js/trap.js` +10/−15; clones deleted in dothrow/mhitu/potion/uhitm/zap. Total `js/` insertions **88** ≤250. Band **150–350**.
- Claims to close: Open `ball.c` ballfall. Not `drop_ball`. Not remaining `is_helmet` in u_init/worn. Review **736** named ballfall.
- JS / map: `ball.js` `ballfall`; `do_wear.js` `hard_helmet`/`is_helmet`; callers `do.js`/`trap.js`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1778 `c4a32e7c` — stamp is the helper; the **callers** contradict C.

## Intent vs deliverable

Git subject promises: Match C `ball.c` `ballfall` so a Punished hero falling to a new level takes the iron ball on the head, instead of two deferred comments where the call belongs.

`node scripts/csym.mjs ballfall` → `ball.c:42–67`. `--callers`: `do.c:1807`; `trap.c:1957`. `hard_helmet` → `do_wear.c:567–573`. `is_helmet` → `obj.h:283`. C `youprop.h:77`: **`#define Punished (uball != 0)`**.

```42:67:nethack-c/upstream/src/ball.c
void
ballfall(void)
{
    if (!uball || (uball && carried(uball) && welded(uball)))
        return;
    gets_hit = (((uball->ox != u.ux) || (uball->oy != u.uy))
                && ((uwep == uball) ? FALSE : (boolean) rn2(5)));
    ballrelease(TRUE);
    if (gets_hit) { /* rn1(7,25); hard_helmet cap 3 */ }
}
```

Parent: `// deferred` at both C sites; six `hard_helmet` clones. The diff **does** port `ballfall` with C evaluation order, export `hard_helmet`/`is_helmet`, delete six clones. It **does** write the two C call sites — behind **`u.Punished`**, a sticky flag that **is never assigned** in `js/`. The helper cannot run from `goto_level` falling or pit plunge. Subject “takes the iron ball on the head” is false on every shipped caller.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `ballfall` | LIVE new | `:42–67`; RNG order **matches** |
| `hard_helmet` | LIVE new (was 6 clones) | `:567–573` |
| `is_helmet` | LIVE new | obj.h; u_init/worn clones remain |
| `do.c` `:1805–1809` | LIVE repaired **dead gate** | `u.Punished` never set |
| `trap.c` `:1955–1958` | LIVE repaired **dead gate** | same |
| `drop_ball` | OMIT named | |

`node scripts/sym.mjs` (clone → import):

```
ballfall         js/ball.js:99   ASYNC — await required
hard_helmet      js/do_wear.js:181   sync
is_helmet        js/do_wear.js:171   sync
             !! ALSO 2 LOCAL CLONE(S)
               js/u_init.js:995  js/worn.js:104
is_metallic      js/mkobj.js:2704   sync
ballrelease      js/ball.js:76   ASYNC — await required
welded           js/wield.js:178   sync
carried          js/eat.js:1960   sync + ball.js:43 clone
Yname2           js/objnam.js:1891   sync
```

`--can ball.js do_wear.js hard_helmet`: **ALREADY**. `--can do.js ball.js ballfall`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`: **none** (`SPE_FORCE_BOLT` minus-comment only). Rule #2 **clean**.

## C ↔ JS fidelity

**Helper body — match C.** Early return: no ball, or carried **and** welded. JS `!uball || (carried && welded)`. **Match.** Welded carried ball draws **zero** `rn2`.

**`gets_hit` then `ballrelease` (`:50–53`).** Position off hero **and** (`uwep==uball` ? FALSE : `rn2(5)`). Ternary short-circuit: wielded ball **does not** draw. Then `ballrelease(TRUE)` **always** if past the early return. JS computes `gets_hit` first with the same `?:`. **Match RNG order.**

**Hit arm / `hard_helmet`.** `rn1(7,25)`; if `uarmh`: `hard_helmet` → dmg=3 else verbose `Yname2`; `losehp(Maybe_Half_Phys, …)`. `hard_helmet`: `!obj || !is_helmet` → FALSE; else metallic or crackable. Deleted dothrow/trap clones skipped `is_helmet`. **Match the helper.** One export. Do not write `is_helmet` clone #3.

**Live callers — C-wrong.** C `do.c:1805–1808`: `Punished && !welded(uball)` then `ballfall` then `selftouch` then fall dmg. C `Punished` is `uball != 0`. JS:

```1801:1801:js/do.js
            if (u.Punished && !welded(u.uball)) await ballfall();
```

C `trap.c:1955–1958`: `Punished && !carried(uball)` → `unplacebc(); ballfall(); placebc();`. JS:

```1909:1909:js/trap.js
            if (game.u?.Punished && !carried(game.u?.uball)) {
```

`rg 'Punished\s*=' js/` is empty. `u.Punished` is never written (not gstate init, not save/restore, not `punish`). Same function, ~40 lines earlier, stair-fall already documents the spec and uses `u.uball`:

```1759:1760:js/do.js
                // C: youprop.h Punished ≡ (uball != 0) — not sticky u.Punished
                || u.uball
```

`unplacebc`/`placebc` around the same `goto_level` use `u.uball || u.Punished` (the `uball` disjunct saves those). `ballfall` has **only** the sticky bit. Both new callers are dead. Review **737** waived this: “Not Must-fix without a desync proof.” The proof is zero writes.

**Callee closure of the helper.** LIVE: `ballrelease`, `hard_helmet`, `is_helmet`, `welded`, `carried`, `Yname2`, `losehp`. STUB inside `ballfall`: **none**. The C-wrong is the **dispatch** this SHA added, not a stubbed callee.

## Hallucinations / overclaim

Subject “a Punished hero falling … takes the iron ball on the head, instead of two deferred comments where the call belongs” is **false**. The comments became `if (u.Punished)` no-ops. D-log “wire both callers” is true as text and false as C. Direct rng-log short-circuit canaries of the **helper** do not exercise `goto_level`/`dotrap`. Review **737** ACCEPT-WITH-DEBT rubber-stamped a dead arm. Journal 44/44 cannot hit this path. Do **not** stamp “Match C `drop_ball`.” Do **not** stamp “every `is_helmet` clone is gone.”

## Density

§2b: `ballfall` + `hard_helmet` + both C callers + clone deletion. +88. The callers were in scope. Shipping them behind a never-set flag is not “named omit of Punished.”

## Verification

D-log: green+strict; full `sessions` 44/44; helper canary. save-oracle skip. Rule #2 clean. Suite cannot hit this arm — and JS cannot either, because the gate is stuck false. This re-audit grepped `js/` for `Punished` writes (none) and read `do.c:1805` / `trap.c:1955` vs `youprop.h:77`.

## Actionable C-wrongs

1. **`do.c:1805–1808` / `trap.c:1955–1958` — gate on `u.uball` (C `Punished`), not sticky `u.Punished`.** Keep `!welded(uball)` / `!carried(uball)` and the trap `unplacebc`/`ballfall`/`placebc` order. One port iter. Do not assign `u.Punished = true` as a second source of truth.

Named leftover: `u_init.js` / `worn.js` `is_helmet`; `ball.js` `carried` clone; other sticky `u.Punished` reads (`uhitm.js` `|| !rn2(7)`, `steed.js`, `dothrow.js`) — **not** this Must-fix. Do **not** draw `rn2(5)` after `ballrelease`. Do **not** draw when the ball is on the hero or is `uwep`. Do **not** restore dothrow/trap material-range `hard_helmet`.

Verdict: **QUALITY-RISK**
