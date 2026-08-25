# Review 417 — c2736f3e — potion.c mixtype / potion_dip mix (D-1457)

## Metadata
- Full / short hash: `c2736f3e50f5775cfdf3b0b8d8a5fbd41478c3af` / `c2736f3e`
- Parent: `91e3e8a8` (D-1456). This file audits **this SHA only** (eighth of nine `js/` commits since review **409**). Archive **Addressed:** D-1457 `c2736f3e` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 07:42:46 +0200
- D-id: **D-1457**
- Stats: 10 files, +469 / −50 — `js/potion.js` +385 / −28. Largest JS delta in this audit window.
- Claims to close: Open `potion.c` remaining mix alchemy (named from D-1439). Not peffects. `reviews/loop-2026-08-15/` has no unpaid mixtype Must-fix.
- JS / map: `potion.js` `dodip` / `potion_dip` / `mixtype` / `dip_potion_explosion` / `hold_potion`. `c-js-map/turns.md` + `debt.md`. Unicorn/amethyst dip, poison-coat, acid-erode, oil/lamp, `poly_obj`, `dip_into` still named.
- Prior reviews this SHA claims to close: D-1439 named mix alchemy after peffects.

## Intent vs deliverable

Git subject promises: “Match C potion.c mixtype/potion_dip so #dip mixing two potions follows C recipes and explosion instead of cancelling after the floor prompt.”

C `dodip` `:2365–2371`: after fountain/sink/pool yn `'n'` (`drink_ok_extra++`), `getobj("dip … into", drink_ok, GETOBJ_NOFLAGS)` then `potion_dip`. Old JS printed Never mind and `ECMD_CANCEL` after the floor prompt (the named omit). `potion_dip` `:2441–2593`: Klein; hands; `H2Opotion_dip`; poly `obj_unpolyable`/`poly_obj`; else potion-potion `mixtype` `:2120–2209` (catalyst swap; healing FALLTHROUGH unicorn neutralize; `rn2(3)` on gain+confusion and enlightenment+levitation); stack `rnd` subset; mix pline; `useup` dippee; `dip_potion_explosion(amt + rnd(9))` (`:2416–2437` — cursed/acid/lit-oil skip `rn2(10/30)`); BUC wipe; result otyp or `rnd(8)` water/sickness/`mkobj`/`obfree`/evaporate; dilute; look pline; `freeinv`+`hold_potion` `:2242–2261`. Unicorn/amethyst dip is **after** the mix `else if` (`:2726–2787`). `dip_into` `:2374–2404` still a second caller.

The diff **does** wire `getobj_dip_into` after `'n'`, port `mixtype` recipes, the mix branch, explosion (always-eval `rnd(9)`), `hold_potion`, Klein/hands, and the poly **gate** as `nothing_happens`. It **does not** port `poly_obj`, unicorn/amethyst dip, poison-coat, acid-erode, oil/lamp, or `dip_into`. Named. It **does not** `obfree` the `mkobj` scratch potion (C `:2567`). Scratch stays `OBJ_FREE` (not on the floor).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mixtype` | C `:2120–2209`, **ported** | swap + FALLTHROUGH + `rn2(3)` |
| `potion_dip` mix arm | C `:2503–2593`, **ported** | |
| `dodip` → `getobj_dip_into` | C `:2365–2371`, **wired** | `drink_ok` clone |
| `dip_potion_explosion` | C `:2416–2437`, **ported** | |
| `hold_potion` | C `:2242–2261`, **ported** | callee `hold_another_object` **imported live** |
| `poof` | C `:2407–2413`, **ported** | |
| `H2Opotion_dip` | C, **imported live** | caller `useeit` simplified |
| `splitobj` / `mkobj` / `fixup_oil` / `useup` | C, **imported live** | `mkobj` scratch not `obfree`d |
| `useupall_pot` / `freeinv_pot` | C `useupall` / `freeinv`, **clones** | `setnotworn` named |
| `getobj_dip_into` | C `getobj`+`drink_ok`, **clone** | potions only |
| `Yobjnam2_pot` / `Deaf_pot` / `otense_pot` | C, **clones matching C** | |
| `poly_obj` / unicorn dip / poison / oil / `dip_into` | C `:2468–2787` / `:2374`, **named omit** | poly gate always `nothing_happens` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `mixtype` `rn2(3)`; stack `rnd`; `amt+rnd(9)` always; explosion `rn2(10\|30)` unless cursed/acid/lit; `rnd(8)` / `mkobj` on STRANGE. Public fortress does not `#dip` two potions.

## C ↔ JS fidelity

`drink_ok` `:505–521` suggests potions only; `!obj` uses `drink_ok_extra` for the “else” empty string. JS `getobj_dip_into` + `drinkable_lets` match that subset (`GETOBJ_NOFLAGS` empty → message, no key). Fountain/sink/pool `'n'` now increments `drink_ok_extra` (was deferred). **Not** a dispatch-stub: the mix arm runs `mixtype` then explosion then `hold_another_object`.

`mixtype` copies C branch order: catalyst swap when `o1` is a potion and `o2` is gain/heal/enlighten/juice; `POT_HEALING`+speed → extra healing then FALLTHROUGH; heal family + gain → upgrade; FALLTHROUGH `UNICORN_HORN` neutralize sickness→juice / hallu-blind-conf→water; amethyst+booze; gain+confusion `rn2(3)? booze : enlightenment`; juice/enlighten tables; else `STRANGE_OBJECT`. Healing+sickness is the unicorn FALLTHROUGH (canary). **Call-for-call** `rn2(3)` only on those two arms.

Mix stack: `amt > (diluted?2 : magic?3 : 7)` then `amt=2` / `rnd(min(amt,8)-2)+2` / `rnd(amt-6)+6` then `splitobj`. C `obj = splitobj(obj, amt)` (`:2529`); JS assigns the child. `qbuf` `"The"` vs `"N of the"`. Mix pline uses `simpleonames` / `otense` / `one of` / `thesimpleoname`. `useup(potion)` before explosion. Match `:2512–2542`.

Explosion: caller **always** evaluates `amt + rnd(9)` (C `:2541`). Then cursed **or** acid **or** lit oil **or** `!rn2(smock?30:10)`. `BOOM!` unless `Deaf`; `wake_nearto(BOLT_LIM+1)²`; `exercise(STR,false)`; `potionbreathe` if `!breathless \|\| haseyes`; `useupall`; `losehp` alchemic blast. **`potionbreathe` / `wake_nearto` are live, not stubs.** Cursed skip `rn2` then still consumed `rnd(9)`. Match `:2416–2437`.

Post-boom: BUC wipe; Blind/Hallu clear `dknown`; mixture otyp or `odiluted?1:rnd(8)` water / sickness / `mkobj`+`fixup_oil` / evaporate `useupall`. C `obfree(otmp)` (`:2567`) — JS leaves an `OBJ_FREE` scratch (not placed; RNG already consumed). Dilute iff not water. Look pline; `freeinv`; `hold_potion` bumps `pickup_burden` to `near_capacity` then `hold_another_object("You drop %s!", doname)`. Match `:2544–2593` except the missing `obfree`.

Same otyp skips mix (`otyp !=`) and hits the named tail `Interesting...` (`:2790`). Match.

Hallucination check: “Match C mixtype recipes + explosion” while those functions are **ported** is **not** a dispatch-stub lie. “Match C `poly_obj`” **would** be (gate is always `nothing_happens`). “Match C unicorn-horn `mixtype` dip” **would** be (that caller is `:2726`, not this mix `else if`). “Match C `H2Opotion_dip` useeit including `ublindf && Blindfolded_only`” **would** overclaim (`:2461` vs JS `!Blind()` only).

## Hallucinations / overclaim

Subject says #dip mixing two potions follows C recipes and explosion instead of cancelling after the floor prompt. **True** for `dodip` getobj, Klein/hands, mixtype tables, stack split, always-`rnd(9)` boom, hold. **False until named** for `poly_obj`, unicorn/amethyst dip, poison/acid/oil/lamp, `dip_into`, `obfree` scratch, H2O `useeit` ublindf disjunct, `useupall` `setnotworn`. Stamping **Addressed:** D-1457 for `:2120–2209` + `:2503–2593` + `dodip` `:2365–2371` is fair. Do **not** stamp “Match C `potion_dip` through unicorn dip.” Do **not** treat fortress PASS as a two-potion `#dip`.

## Density

Caller `dodip` + callee `potion_dip` mix + `mixtype` + explosion + hold is **one** C cluster (`potion.c` dip mix), not peffects and not poison-coat. ~385 lines because C’s mix arm is that long. Did not glue oil/lamp. Playbook §2b. Acceptable. `getobj_dip_into` is the `drink_ok` getobj this caller needs.

## Branch-by-branch confirm

1. Fountain `'n'` then potion getobj → `potion_dip`. Match `:2324–2371`.
2. Klein `potion==obj && quan==1`: ECMD_OK. Match `:2448–2450`.
3. Hands: cannot fit `body_part(HAND)`. Match `:2452–2455`.
4. POT_WATER: `H2Opotion_dip` then `poof`. **`useeit` misses `ublindf && Blindfolded_only`.** Named.
5. Either side POLY: JS always `nothing_happens` (C `poly_obj` when polyable). Named.
6. Healing+speed → extra healing (swap or direct). Match `:2138–2140`.
7. Healing+sickness → fruit juice via unicorn FALLTHROUGH. Match `:2151–2154`.
8. Gain+confusion: `rn2(3)` booze vs enlightenment. Match `:2168–2169`.
9. Cursed mix: skip `rn2(10)`, still `rnd(9)`, boom. Match.
10. Alchemy smock: `rn2(30)`. Match.
11. Same otyp: `Interesting...`. Match `:2790`.
12. STRANGE `rnd(8)` default: evaporate, no hold. Match `:2569–2573`.
13. Unicorn-horn dip still `Interesting...`. Named.
14. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `getobj_dip_into` is a clone of `getobj`, not a recorded letter list.

## Verification

Journal: private canary **16**/16 (C/JS grep; Klein; hands; cursed boom skip `rn2(10)`+`rnd(9)`; healing+speed → extra healing; healing+sickness FALLTHROUGH fruit juice; same otyp Interesting; poly gate; fountain n dip-into; empty dip-into; oc_magic split; peffects stay; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `01edf8b9`. Fortress PASS is not a two-potion `#dip`.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `mixtype` / mix arm / explosion dice match C. Remaining gaps are named omits or caller polish, not a stub-dispatch lie.

Named omits (map / Open, not Must-fix):

1. `poly_obj` / `obj_unpolyable` (gate is always `nothing_happens`)
2. unicorn-horn / amethyst `mixtype` dip (`:2726–2787`)
3. poison-coat / acid-erode / oil / lamp
4. `dip_into` (inventory item-action, opposite getobj order)
5. `H2Opotion_dip` `useeit` `ublindf && Blindfolded_only` (`:2461`)
6. `obfree` of `mkobj` scratch (`:2567`); `useupall` `setnotworn`

Do not Must-fix “unicorn dip should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “healing+sickness skipped unicorn FALLTHROUGH” (it does not).

## Callers / RNG ledger

C callers: `dodip`; `dip_into` still named. Dice: `mixtype` `rn2(3)`; stack `rnd`; always `rnd(9)`; maybe `rn2(10\|30)`; STRANGE `rnd(8)` then maybe `mkobj` class dice. Public fortress does not hit this.

Verdict: **ACCEPT-WITH-DEBT**
