# Review 257 — dd02dc1b — objnam.c doname MEAT_RING goto ring (D-1295)

## Metadata
- Full / short hash: `dd02dc1b46d68515a799492498c51feeaf115ac2` / `dd02dc1b`
- Parent: `25fd80e4` (reviews **253–256**). JS parent `c37bd683` (D-1294). This file audits **this SHA only**. Archive row **Addressed:** D-1295 `dd02dc1b` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 18:05:45 +0200
- D-id: **D-1295**
- Stats: 10 files, +220 / −141 — `js/objnam.js` +31 / −6; journal rotate inflates docs.
- Claims to close: Open `objnam.c` doname MEAT_RING (named from D-1276 / review **256**). Not candle. `reviews/loop-2026-08-15/` has no unpaid MEAT_RING Must-fix.
- JS / map: `objnam.js` `doname`; `c-js-map/turns.md`. Candle `partly used` / full `mbodypart` named.
- Prior reviews this SHA claims to close: **256** named next Open doname MEAT_RING, not candle; **238** named omit FOOD MEAT_RING `goto ring`.

## Intent vs deliverable

Git subject promises: “Match C objnam.c doname so a worn meat ring shows on the left or right hand like a ring, instead of skipping FOOD MEAT_RING goto ring.”

C `doname_base` FOOD (`objnam.c:1504–1538`): `oeaten` prefix; CORPSE; EGG; **else if `obj->otyp == MEAT_RING` `goto ring`**. Label `ring:` (`:1492–1503`): `W_RINGR` Concat `" (on right "`; `W_RINGL` `" (on left "`; `W_RING` (either) `ConcatF1("%s)", body_part(HAND))`; then `known && objects[].oc_charged` spe on prefix. `objects.h` MEAT_RING `BITS(..., chrg=0, ...)` so the spe arm is idle. Callers: invent `doname` / `xname` does **not** take this arm (`xname` FOOD is pretty_base).

Old JS: FOOD oeaten / CORPSE / EGG live (D-1276); RING worn was ungated complete strings `" (on right hand)"` / `" (on left hand)"`; MEAT_RING never entered that suffix.

The diff **does** FOOD MEAT_RING `known && is_charged_otyp` spe (idle) plus worn gated to `RING_CLASS || isMeatRing` with C’s three Concat and hardcoded humanoid `"hand)"`. It does **not** port candle `partly used` or poly `body_part(HAND)` variants. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| FOOD MEAT_RING spe prefix | C `:1500–1502` via `goto ring`, **new** | `BITS` chrg=0 idle |
| worn three Concat | C `:1494–1499`, **rewired** | was two complete strings |
| gate `RING_CLASS \|\| isMeatRing` | C `ring:` label, **new** | non-meat FOOD with W_RINGR no longer suffixes |
| `W_RING` | C `obj.h`, **imported live** | `W_RINGL \| W_RINGR` |
| `is_charged_otyp` | C `oc_charged`, **pre-existing** | meat chrg=0 |
| `body_part(HAND)` | C `mbodypart`, **named omit** | humanoid `"hand)"` like W_WEP |
| candle `partly used` | C TOOL, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.**

## C ↔ JS fidelity

Pinned C (`objnam.c:1492–1538`):

```
    case RING_CLASS:
 ring:  /* normal rings reach here 'naturally'; meat ring jumps here */
        if (obj->owornmask & W_RINGR)
            Concat(bp, 0, " (on right ");
        if (obj->owornmask & W_RINGL)
            Concat(bp, 0, " (on left ");
        if (obj->owornmask & W_RING)
            ConcatF1(bp, 0,"%s)", body_part(HAND));
        if (known && objects[obj->otyp].oc_charged) {
            Sprintf(eos(prefix), "%+d ", obj->spe);
        }
        break;
        /* FOOD: oeaten / CORPSE / EGG then */
        } else if (obj->otyp == MEAT_RING) {
            goto ring;
        }
```

JS `oname === 'MEAT_RING'` is `objectNames[otyp]`, the analog of `obj->otyp == MEAT_RING`. Spe is applied on prefix **after** oeaten and **before** `bp = prefix + base`; worn Concat is later on `bp`. C applies worn to `bp` then spe onto `prefix`; final order is still prefix(+spe) + name + worn. `W_RINGR` then `W_RING` yields `" (on right hand)"` for a single right ring, same as the old complete string. Both bits set (canary) concatenates C’s `" (on right  (on left hand)"` rather than two full suffixes — that is the C Concat, not a miss.

Gating worn to RING_CLASS or meat ring matches `ring:` (C never suffixes a meatball that somehow has W_RINGR). `is_charged_otyp` on meat is false (`BITS` chrg=0); the spe `if` is present and idle like C.

This is **not** “Match C dispatch, callee is a stub.” `doname` is live; worn bits are live `owornmask`. Hardcoded `"hand)"` is the same humanoid default W_WEP already uses, named as full `mbodypart`.

## Hallucinations / overclaim

Subject + D-1295 say a worn meat ring shows on left/right hand like a ring. **The FOOD MEAT_RING arm + gated three Concat are the hunk.** Stamping **Addressed:** D-1295 is fair. Do **not** stamp “Match C `body_part(HAND)` poly paw/claw.” Do **not** stamp “Match C candle `partly used`.” Do **not** stamp “Match C `oc_charged` spe on a meat ring” (chrg=0 idle). Do **not** stamp “Match C `xname` of a meat ring” (`xname` never took `ring:`).

## Density

One C `goto` plus the `ring:` worn/+spe envelope that jump requires. ~25 JS lines. Did not glue candle. Right size.

## Branch-by-branch confirm

1. Unworn meat ring: no hand suffix. Match FOOD without worn bits.
2. Worn `W_RINGR`: `" (on right hand)"`. Match `:1494–1499`.
3. Worn `W_RINGL`: `" (on left hand)"`. Match.
4. `W_RING` after a side Concat closes `hand)`. Match `W_RING` either-hand.
5. `known && oc_charged` spe: meat chrg=0 skips. Match idle `:1500`.
6. `oeaten` then worn: `"partly eaten "` still before the name. Match FOOD then `goto ring`.
7. RING_CLASS worn still suffixes (rewired Concat, same humanoid string). Match `ring:` natural entry.
8. Non-meat FOOD with W_RINGR: no suffix (new gate). Match C (never in `ring:`).
9. Candle `partly used` still skipped. Named. Public-unhit unless a session wears a meat ring.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session wears a meat ring. Cadence this audit: full `sessions` at HEAD `086eb03d` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. `goto ring` analog, three Concat, `W_RING` close, idle spe, and RING_CLASS gate match C `:1492–1538`.

Named omits (map, not Must-fix):

1. candle `partly used` / `iflags.partly_eaten_hack`
2. full `mbodypart` / `body_part(HAND)` poly variants
3. `food_xname`; invent `learn_egg_type`

Do not Must-fix “dedicated Concat vs old complete strings.” Do not Must-fix “spe `if` present while chrg=0.” Do not pull DRAWBRIDGE ice this SHA.

## Callers / RNG ledger

C: `doname` ← invent / messages. JS same. No new positional RNG. Public fortress is not evidence a meat ring printed `" (on right hand)"`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: worn meat rings now take C’s `ring:` hand suffix; candle `partly used` and poly hands stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1295 `dd02dc1b`.
