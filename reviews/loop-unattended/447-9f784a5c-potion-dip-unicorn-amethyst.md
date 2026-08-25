# Review 447 — 9f784a5c — potion.c potion_dip unicorn/amethyst mixtype dip (D-1486)

## Metadata
- Full / short hash: `9f784a5cc1f33775f6ed16aefc194caa969c1864` / `9f784a5c`
- Parent: `e98c0be8` (D-1485). This file audits **this SHA only** (second of nine `js/` commits since review **445**). Archive **Addressed:** D-1486 `9f784a5c` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 17:09:51 +0200
- D-id: **D-1486**
- Stats: 11 files, +158 / −31 — `js/potion.js` +80 / −8. Also fills review **437** Addressed hash (docs only).
- Claims to close: Open `potion.c` `potion_dip` unicorn/amethyst mix (named from D-1457 / review **417**). Not mixtype tables. `reviews/loop-2026-08-15/` has no unpaid dip Must-fix.
- JS / map: `potion.js` `potion_dip`; callee `mixtype` already D-1457; `hold_potion` already live. `c-js-map/turns.md` + `debt.md`.
- Prior reviews this SHA claims to close: **417** named unicorn/amethyst dip after potion-potion mix; **438** named mix unicorn after potionbreathe.

## Intent vs deliverable

Git subject promises: “Match C potion.c potion_dip so dipping a unicorn horn or amethyst into a potion follows mixtype (sickness to fruit juice, hallu/blind/conf to water) instead of always printing Interesting...”

Pinned C `potion_dip` after the skipped oil/lamp arms:

```2726:2752:nethack-c/upstream/src/potion.c
    potion->in_use = FALSE; /* didn't go poof */
    if ((obj->otyp == UNICORN_HORN || obj->otyp == AMETHYST)
        && (mixture = mixtype(obj, potion)) != STRANGE_OBJECT) {
        char oldbuf[BUFSZ], newbuf[BUFSZ];
        short old_otyp = potion->otyp;
        boolean old_dknown = FALSE;
        boolean more_than_one = potion->quan > 1L;
        ...
        costly_alteration(singlepotion, COST_NUTRLZ);
        singlepotion->otyp = mixture;
        singlepotion->blessed = 0;
        if (mixture == POT_WATER)
            singlepotion->cursed = singlepotion->odiluted = 0;
        else
            singlepotion->cursed = obj->cursed; /* odiluted left as-is */
```

Callee `mixtype` `:2151–2164`: `UNICORN_HORN` sickness→juice, hallu/blind/conf→water; `AMETHYST` booze→juice. No `rn2` on those arms. Caller `dodip` `:2371`. `dip_into` `:2374–2404` is a second caller, still named.

Old JS after D-1457: mix `else if` then `in_use=false` then always `Interesting...`.

The diff **does** port `:2726–2787`: mixtype gate, quan>1 `splitobj`, `COST_NUTRLZ`, otyp rewrite, BUC/dknown, `observe_object`, clears/turns/`Something happens`, optional `docall` of the old type, `hold_potion` juggle. It **does not** port poison-coat `:2615–2636`, acid-erode, oil/lamp, `poly_obj`, lichen/towel, or `dip_into`. Named. It **does not** change `mixtype` (D-1457). Healing+sickness remains the mix-arm FALLTHROUGH, not this horn caller.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `potion_dip` unicorn/amethyst arm | C `:2726–2787`, **wired this SHA** | |
| `mixtype` | C `:2120–2209`, **C callee already live (D-1457)** | not a clone |
| `hold_potion` | C `:2242–2261`, **already live** | |
| `costly_alteration` / `COST_NUTRLZ` | C `mkobj.c` / `hack.h:294`, **imported live** (`shk.js`; enum 10) | dynamic `import('./shk.js')` — still the real function |
| `splitobj` | C `mkobj.c`, **imported live** | `\|\| potion` if null |
| `observe_object` | C `o_init.c` `:442–451`, **imported live** | |
| `docall` | C `do_name.c`, **imported live** | fakeobj not `zeroobj` |
| `hcolor` / `potion_descr` | C `OBJ_DESCR`, **local descr helper** | same as mix arm |
| poison-coat / oil / `poly_obj` / `dip_into` | C `:2615–2724` / `:2468` / `:2374`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Dynamic `import('./shk.js')` is ESM, not Node `fs`. **New gameplay RNG in this SHA:** none. `mixtype` horn/gem arms have no `rn2`; mix-arm `rn2(3)` is D-1457. Public fortress does not `#dip` a unicorn horn or amethyst.

## C ↔ JS fidelity

`mixtype(obj, potion)` with `obj` a horn/gem: o1 is not `POTION_CLASS`, so no catalyst swap. Switch hits `UNICORN_HORN` or `AMETHYST` directly. Sickness→`POT_FRUIT_JUICE`; hallu/blind/conf→`POT_WATER`; amethyst+booze→juice; else `STRANGE_OBJECT` → `Interesting...`. **Call-for-call dice: none.** Hallucination check: “Match C `mixtype`” while **D-1457 already ported the tables** is **not** a dispatch-stub lie.

`is_poisonable` is missile WEAPON_CLASS or `permapoisoned` (`obj.h:264–268`). Unicorn horn is `TOOL_CLASS` WEPTOOL (`objects.h:1013–1016`), not that window. Horn+sickness therefore does **not** take C poison-coat `:2616–2626`; it reaches neutralize. JS skipping poison-coat does not steal this arm. Amethyst is a gem. Same.

Horn+`POT_OIL`: C `is_weptool` takes the oil gleam/useup arm `:2645–2685` and never reaches `:2726`. JS named-skips oil, then mixtype is `STRANGE_OBJECT`, then `Interesting...` without `useup`. That is the **already-queued oil/lamp omit**, not a false fire of this arm.

Split: quan>1 `splitobj(potion, 1)` else the same pointer. JS `splitobj(...) || potion` only matters if `splitobj` returns null (`cobj` / `quan<=num`). A carried potion stack should split. Not a Must-fix.

`costly_alteration(..., COST_NUTRLZ)` before otyp rewrite. `COST_NUTRLZ===10` matches `hack.h:294` (“neutralized via unicorn horn”). Verb table index 10 is `neutralize`. Unpaid shop potion: bill. Not unpaid: early return. Match. Callee is **not** a stub.

Rewrite: `blessed=0`; water clears cursed+odiluted; else `cursed=obj.cursed` (horn/gem), odiluted left. `bknown=0`, `dknown=0` provisionally. Then `!Blind`: `!Hallucination` → `observe_object` (sets `dknown` + `discover_object`). Water && `dknown` → `clears`; else `turns ${hcolor(descr)}`. Empty newbuf → `Something happens.` `pline_The("%spotion%s %s.")` vs JS ``The ${oldbuf}potion${dipped-into} ${newbuf}.`` — same English. `more_than_one` is pre-split.

`old_dknown && !oc_name_known && !oc_uname` → `docall` of a fake potion of the **old** otyp with `dknown=1`. C copies `cg.zeroobj` (quan 0). JS builds `{dknown:1, otyp, oclass, quan:1}`. Prompt can differ on count (`a foo potion` vs quan-0 xname). Message-only; not a control-flow C-wrong.

`hold_potion(singlepotion, "You juggle and drop %s!", doname(singlepotion), 0)` after rewrite. JS snapshots `doname` then awaits. Match `:2783–2787`. Returns `ECMD_TIME`. Unmatched mixtype falls through `Interesting...`.

`observe_object` callee also gates `game.u?.Hallucination` (sticky) and skips `FIRST_OBJECT`; C uses `!Hallucination` + `oindx >= FIRST_OBJECT`. Caller already uses `Hallucination()`. Pre-existing invent/`o_init` debt, not this arm’s recipe.

## Hallucinations / overclaim

Subject says dipping a unicorn horn or amethyst follows mixtype (sickness→juice, hallu/blind/conf→water) instead of always Interesting... **True** for those recipes and for amethyst+booze→juice. **False until named** for poison-coat, oil-on-horn gleam, acid-erode, `poly_obj`, `dip_into`. Stamping **Addressed:** D-1486 for `:2726–2787` is fair. Do **not** stamp “Match C `potion_dip` through oil/lamp.” Do **not** treat fortress PASS as a `#dip` of a horn. Do **not** claim the mix-arm healing FALLTHROUGH moved (it did not).

## Density

One C arm plus live `mixtype`/`hold_potion`/`costly_alteration`. ~70 JS lines. Playbook §2b. Did not glue poison-coat. Acceptable.

## Branch-by-branch confirm

1. Horn + sickness: juice, `COST_NUTRLZ`, cursed from horn, `hold_potion`. **Match `:2153–2154` / `:2746–2752`.**
2. Horn + hallu/blind/conf: water, cursed+odiluted cleared, `clears` if observed. **Match `:2155–2158` / `:2749–2760`.**
3. Amethyst + booze: juice. **Match `:2161–2163`.**
4. Horn + healing / unmatched: `STRANGE_OBJECT` → Interesting... **Match.**
5. Amethyst + sickness: STRANGE → Interesting... **Match** (only booze transforms).
6. quan>1: split one, “that you dipped into”. **Match `:2732` / `:2739–2744` / `:2765–2767`.**
7. Blind: skip observe/turns/docall; still rewrite + juggle. **Match `:2755`.**
8. Hallu: skip `observe_object`; may still `turns` color. **Match `:2756–2763`.**
9. Potion-potion mix still D-1457. Unchanged.
10. Horn + oil: C weptool oil arm. JS Interesting... **Named oil omit.**
11. Weapon + sickness: C poison-coat. JS would only hit this arm if otyp is horn/gem. **Named poison-coat; not this object.**
12. `dip_into` still named.
13. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `COST_NUTRLZ` is the C enum, not a seed. Dynamic import of `shk.js` is allowed ESM.

## Verification

Journal: private canary **16**/16 (C/JS grep; Rule #2; horn+sickness juice; hallu/blind/conf water+clears; amethyst+booze juice; unmatched Interesting; cursed copy vs water wipe; quan>1 split+dipped-into; Blind skip turns; same-otyp mix regression; peffects stay); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None in this arm’s control flow / RNG. Named omits (map / Open, not Must-fix):

1. `potion_dip` poison-coat / healing unpoison — Open already
2. `potion_dip` oil/lamp (includes horn+oil gleam)
3. `potion_dip` `poly_obj`/`obj_unpolyable`
4. `dip_into`
5. `H2Opotion_dip` `useeit` `ublindf && Blindfolded_only`

Do not Must-fix “`mixtype` is a stub” (D-1457). Do not Must-fix “horn+sickness should poison-coat” (`is_poisonable` false). Do not Must-fix “fakeobj quan vs zeroobj” as a cluster of its own this iter.

## Callers / RNG ledger

C callers: `dodip` → `potion_dip`; `dip_into` still named. JS `dodip` already calls `potion_dip` (D-1457). New dice: none. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
