# Review 750 — 28f02a82 — detect.c food_detect / SPE_DETECT_FOOD (D-1781)

## Metadata
- Full / short hash: `28f02a825da38fa1197ac561d364c4c43edafcf4` / `28f02a82`
- Parent: `45f35a52` (D-1780). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 19:32:55 +0200
- D-id: **D-1781**
- Stats: `js/detect.js` +159/−1; `js/read.js` +32/−3. Total `js/` insertions **187** ≤250. Band **150–350**.
- Claims to close: Open `detect.c` `food_detect`. Subject includes **spell**. `spell.c` `#cast` still does not call `seffects` for `SPE_DETECT_FOOD`.
- JS / map: `detect.js` `food_detect`; `read.js` `seffect_food_detection` + `seffects` cases + `doread` gate. `c-js-map/turns.md`.
- Archive **Addressed:** D-1781 `28f02a82` — scroll path; spell path is dead.

## Intent vs deliverable

Git subject promises: Match C `detect.c` `food_detect` so **scroll and spell** of food detection actually work, instead of printing “not implemented yet” without even using the scroll up.

`node scripts/csym.mjs food_detect` → `detect.c:478–594`. `--callers food_detect`: **1** site, `read.c:2050`. C `seffects` `:2252–2253` is `SCR_FOOD_DETECTION` **and** `SPE_DETECT_FOOD`. C `spell.c:1517–1531` is a **separate** caller of `seffects(pseudo)` (skilled bless, then FALLTHROUGH with mapping/create-monster).

```1516:1531:nethack-c/upstream/src/spell.c
    case SPE_REMOVE_CURSE:
    case SPE_CONFUSE_MONSTER:
    case SPE_DETECT_FOOD:
    /* ... */
        if (role_skill >= P_SKILLED)
            pseudo->blessed = 1;
        FALLTHROUGH;
    case SPE_MAGIC_MAPPING:
    case SPE_CREATE_MONSTER:
        (void) seffects(pseudo);
```

Parent: both otyps fell through `seffects` default; `doread` gated `SCR_FOOD_DETECTION` before `seffects`. The diff **does** port `food_detect` whole, wire `seffect_food_detection`, add both `seffects` cases, and drop the scroll from the unported gate. It **does not** call `seffects` from `spell.js` for `SPE_DETECT_FOOD`. JS `spelleffects` only calls `seffects(pseudo)` for `SPE_MAGIC_MAPPING || SPE_CREATE_MONSTER`. Casting still spends energy and prints `Nothing happens.` Subject’s “spell … actually work” is not delivered.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `food_detect` | LIVE new | `:478–594`; confused **or cursed** → `POTION_CLASS` |
| `seffect_food_detection` | LIVE new | C staticfn `:2045–2052` |
| `seffects` SCR+SPE cases | LIVE repaired | food no longer in default |
| `doread` unported gate | LIVE repaired | `SCR_FOOD_DETECTION` removed |
| `o_in` / `clear_stale_map` | LIVE | D-1773 |
| `u.uedibility` consumers | OMIT named | `eat.c` `edibility_prompts` |
| `spell.c` `SPE_DETECT_FOOD` → `seffects` | **unwired** | C `:1517–1531` |

`node scripts/sym.mjs`:

```
food_detect      js/detect.js:1648   ASYNC — await required
seffect_food_detection NOT EXPORTED — 1 LOCAL js/read.js:1070
o_in             js/detect.js:1456   sync
clear_stale_map  NOT EXPORTED — local
strange_feeling  js/detect.js:227   ASYNC
useup            js/invent.js:3983   sync
             !! ALSO 4 LOCAL CLONES including js/detect.js — do NOT add #5
NOSE             js/const.js:578   sync
```

`--can read.js detect.js food_detect`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**. `food_detect` has **no** `rn2`/`rnd`.

## C ↔ JS fidelity

**Confused-or-cursed class (`:484–486`).** `Confusion || (sobj && sobj->cursed)` then `oclass = confused ? POTION_CLASS : FOOD_CLASS` **once** at the top. JS `u.HConfusion || u.Confusion || (sobj && sobj.cursed)` then the same ternary. **Match.** Cursed sober scroll ignores food and maps potions.

**Count / nothing-found / underfoot / map.** Floor `o_in` → `ctu` if `u_at` else `ct`; `fmon` at most one minvent match; no buried walk. Nothing-found: `return !stale` (tells `seffect_food_detection` that `strange_feeling` already used the scroll). Blessed sets `u.uedibility` in stale nothing-found, twitch, underfoot, and map. Map arm: `cls`, `unconstrain_map`, `browse_map`. JS the same. **Match the helper.** Extra `flush_topl_more` is **not** in this C arm.

**Scroll useup.** `seffect_food_detection`: `if (food_detect(sobj)) *sobjp = 0`. Success: `doread` `!sr` → `useup`. Failure nothing/not-stale: `strange_feeling` already used it. Food otyps no longer hit `That scroll is not implemented yet.` **Match the read.c caller.**

**`spell.c:1516–1531` — not wired.** JS `:2039` `SPE_MAGIC_MAPPING || SPE_CREATE_MONSTER` only. The new `seffects` `case SPE_DETECT_FOOD` is **dead from `#cast`**. Skilled bless never happens. Comment even says “skilled-bless FALLTHROUGH (that is REMOVE_CURSE through CHARM_MONSTER)” and then does not include those otyps. **Missed C caller.** C `seffects` `:2252–2253` already lists both scroll and spell; that switch is live. The miss is `spelleffects` never handing `pseudo` over.

**`food_detect` has no `rn2`/`rnd`.** Class switch is `Confusion || (sobj && cursed)` then one ternary. JS adds `HConfusion` (this port’s timeout bit). **Match the live class.** Buried objects are **not** searched (C doesn’t). Nothing-found returns `!stale` so `seffect_food_detection` knows `strange_feeling` already used the scroll.

**Callee closure (`food_detect`).** LIVE: `o_in`, `clear_stale_map`, `strange_feeling`, `map_object`, `browse_map`, `exercise`. OMIT named: `uedibility` readers. STUB **inside** `food_detect`: **none**. The spell miss is a missing **caller**.

## Hallucinations / overclaim

“Match C `food_detect`” is true for the helper and `read.c:2050`. “scroll … actually work” is true. “**spell** of food detection actually work” is **false**. Journal/D-log “wired for both the scroll and the spell” is true only of the `seffects` switch, not of `spell.c`. Do **not** stamp “Match C `edibility_prompts`.” Fortress 44/44 is no-regression; no public session reads this scroll (admitted). Spell path was **not** probed — and would fail.

## Density

§2b: one C helper + its `seffects` caller + the doread gate. +187. Did **not** glue `object_detect`. Did **not** wire the `spell.c` scroll-duplicate group (that is the miss, not extra density).

## Verification

D-log: green+strict; 44/44; helper probes (nothing-found `!stale`, class switch, `uedibility`). `browse_map`/`getpos` not probe-covered. Spell path not probed. This audit read `spell.js:2039–2045` vs `spell.c:1516–1531`.

## Actionable C-wrongs

1. **`spell.c` `SPE_DETECT_FOOD` still does not call `seffects`.** C `:1517–1531`: skilled `pseudo->blessed = 1` then `seffects(pseudo)`. JS `spelleffects` else-arm prints `Nothing happens.` One port iter: add `SPE_DETECT_FOOD` to the existing `seffects(pseudo)` arm (bless when `role_skill >= P_SKILLED`). Same C group still unwired: `SPE_REMOVE_CURSE` / `SPE_CONFUSE_MONSTER` / `SPE_CAUSE_FEAR` / `SPE_IDENTIFY` / `SPE_CHARM_MONSTER` — do not pretend those were this row, but do not claim food-spell works until this otyp is in that arm.

Named: `u.uedibility` readers (`eat.c`); `detect.js` `useup` clone. Do **not** search buried in `food_detect` (C doesn’t). Do **not** restore the unimplemented food-scroll gate. Do **not** `return 1` on stale nothing-found (C is `!stale`).

**Pinned-C walk this overlay.**
`csym.mjs food_detect` → `detect.c:478–594`.
`--callers food_detect`: one site, `read.c:2050`.
C `spell.c:1516–1531` is a **separate** `seffects(pseudo)` caller
(skilled bless FALLTHROUGH with mapping/create-monster).
HEAD `js/spell.js:2039` is `SPE_MAGIC_MAPPING || SPE_CREATE_MONSTER`
only.
Scroll path: `seffect_food_detection` + `doread` gate drop — **Match**.
Spell path: energy spent, `Nothing happens.`
Helper itself has no `rn2`/`rnd`.

Verdict: **QUALITY-RISK**
