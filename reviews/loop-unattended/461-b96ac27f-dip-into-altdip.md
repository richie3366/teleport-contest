# Review 461 — b96ac27f — potion.c dip_into #altdip (D-1500)

## Metadata
- Full / short hash: `b96ac27fe323fed8b6c0be6c01f12cc2d14a7290` / `b96ac27f`
- Parent: `089a9829` (D-1499). This file audits **this SHA only** (seventh of ten `js/` commits since review **454**). Archive **Addressed:** D-1500 `b96ac27f`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 22:35:36 +0200
- D-id: **D-1500**
- Stats: 13 files, +425 / −154 — `js/potion.js` +221 / −11; `js/iactions.js` +10; `js/apply.js` export-only. Journal rotate in this SHA.
- Claims to close: Open `potion.c` `dip_into` (named from D-1499). Not H2O `useeit`. `reviews/loop-2026-08-15/` has no unpaid dip_into Must-fix.
- JS / map: `potion.js` `dip_into`; `iactions.js` IA_DIP_OBJ. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **447** named `dip_into` `:2374`.

## Intent vs deliverable

Git subject promises: inventory item-action dip on a potion asks what to dip into it first (reverse getobj, ignoring floor water) instead of a no-op pushkeys.

Pinned C `potion.c` `dip_into` `:2374–2405`. `cmdq_peek(CQ_CANNED)` else `impossible`. `drink_ok_extra=0`. `getobj("dip", drink_ok, GETOBJ_NOFLAGS)`; cancel / not POTION_CLASS → `ECMD_CANCEL`. Prompt `dip into %s%s` with `is_plural` `"one of "` + `thesimpleoname`. `getobj(..., dip_ok, GETOBJ_PROMPT)`. `inaccessible_equipment(obj,"dip",FALSE)` → `ECMD_OK`. Else `potion_dip`. Caller `iactions.c` `:159–166` `cmdq_add_ec(dip_into)` + invlet. Ignores fountain/sink (no `do_reqmenu` m-prefix). `INTERNALCMD` `"altdip"` in `cmd.c` is a second caller. `dip_ok` `:2214–2227`: null DOWNPLAY, gold EXCLUDE, `inaccessible_equipment(obj,NULL,FALSE)` → EXCLUDE_INACCESS.

Old JS: IA_DIP_OBJ fell through; `getobj_dip_into` was only dodip’s second potion prompt.

The diff **does** export `dip_into`, queue it from IA_DIP_OBJ, export `inaccessible_equipment` / `equipment_is_inaccessible`, and add `getobj_dip_ok` + `dip_ok`. It **does not** add extcmd `#altdip`. Named. It **does not** use C `is_plural` Eyes-of-Overworld (`obj.h:421–426`); `is_plural_dip` is `quan!=1` only. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dip_into` | C `:2379–2405`, **LIVE this SHA** | |
| `drink_ok` / `getobj_drink_ok` | C + invent getobj NOFLAGS, **LIVE** | canned invlet pop |
| `dip_ok` | C `:2214–2227`, **LIVE this SHA** | |
| `getobj_dip_ok` | C invent getobj PROMPT, **CLONE subset** | compactify/`ALLOWCNT` named |
| `inaccessible_equipment` | C `do_wear.c`, **LIVE export** | was local |
| `equipment_is_inaccessible` | C predicate, **LIVE export** | dip_ok callback |
| `potion_dip` | C, **LIVE** | D-1497–D-1499 arms |
| `thesimpleoname` | C, **LIVE** | |
| `cmdq_add_ec` / peek / pop | C `cmd.c`, **CLONE** iactions | |
| `is_plural_dip` | C `obj.h:421`, **CLONE minus Eyes** | named |
| `#altdip` INTERNALCMD | C `cmd.c:2063`, **OMIT named** | |

`node scripts/sym.mjs dip_into drink_ok dip_ok inaccessible_equipment equipment_is_inaccessible potion_dip thesimpleoname cmdq_add_ec`:

```
dip_into         js/potion.js:2646   ASYNC
drink_ok         NOT EXPORTED — 1 LOCAL js/potion.js:262
dip_ok           NOT EXPORTED — 1 LOCAL js/potion.js:2535
inaccessible_equipment js/apply.js:2193   ASYNC
equipment_is_inaccessible js/apply.js:2173   sync
potion_dip       NOT EXPORTED — 1 LOCAL js/potion.js:3221
thesimpleoname   js/objnam.js:1840   sync
cmdq_add_ec      NOT EXPORTED — 5 LOCAL CLONES
             => Do NOT write clone #6.
```

apply.js **re-pointed** the two wear helpers from local → export (no new clone). No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** in `dip_into` itself; `potion_dip` may roll (oil/poly) after.

## C ↔ JS fidelity

Peek / extra. C `:2384–2391` peek else fail; `drink_ok_extra=0` (never asked about a floor feature). JS `cmdq_peek_canned` + same extra. **Match.** Floor water is not consulted. **Match the ignore-floor claim.**

First getobj. C `"dip"` + `drink_ok` + **no** `GETOBJ_PROMPT` (empty invent: no key, fail). JS `getobj_drink_ok('dip')` already had that empty-suggest behavior. Canned invlet from `cmdq_add_key` is popped by `cmdq_pop_getobj_key(drink_ok)` **before** a prompt — that is how the item-action letter answers the first question. **Match `:2392` + iactions `:164–165`.** Non-potion canned letter → `ECMD_CANCEL`. **Match `:2393–2394`.**

Second prompt. C `Snprintf(..., "dip into %s%s", is_plural?"one of ":"", thesimpleoname)`. JS template same with `is_plural_dip`. Eyes artifact with quan 1: C `"one of "` (plural name), JS not. **Named omit.** `GETOBJ_PROMPT` always asks. JS `getobj_dip_ok` loops `nhgetch`. Hands `-` → `hands_obj` (DOWNPLAY). Gold → cannot. ESC → Never mind / cancel. **Match the PROMPT flag.** Count prefix `GETOBJ_ALLOWCNT` is **not** in C’s ctrlflags here — skipping it is **Match**, not the charge-obj omit.

`dip_ok` vs later messages. C getobj uses `dip_ok` → `inaccessible_equipment(obj,NULL,FALSE)` to hide worn-under-cloak from the letter list. Then `:2402` messages with verb `"dip"`. JS `dip_ok(..., equipment_is_inaccessible)` then `inaccessible_equipment(obj,'dip',false)`. **Match two-phase.** Shop `shk_owns` prefix still named on the apply.js helper (pre-existing).

`potion_dip`. Same function dodip uses. **LIVE.** Klein bottle / hands / H2O / poly / mix / poison / oil follow.

IA_DIP_OBJ. C queues ec + key. JS `cmdq_add_ec(dip_into)` + `cmdq_add_key(invlet)`. Menu line already existed (`iactions.js:333`). Pushkeys was the hole. **Match `:159–166`.**

Callee closure. LIVE: `drink_ok`, `potion_dip`, `inaccessible_equipment`, `thesimpleoname`, `nhgetch`. CLONE matched: getobj subsets, `dip_ok`, cmdq. OMIT named: INTERNALCMD, Eyes `is_plural`. STUB: none. **Arm may ship.**

## Hallucinations / overclaim

Subject reverse getobj, ignore floor, not a no-op pushkeys: **true**. D-log “canned `getobj_drink_ok` then `getobj_dip_ok`”: **true**. Stamping **Addressed:** D-1500 for **IA_DIP_OBJ → dip_into** is fair. Do **not** stamp “Match C `#altdip` extcmd.” Do **not** stamp “Match C Eyes `is_plural`.” Do **not** treat fortress PASS as inventory `a` on a potion (public-unhit). dodip’s own `inaccessible_equipment` is **still named** (different caller).

This is **not** “dispatch ported, callee stubbed.” `potion_dip` is the live dip body.

## Density

One C function + its getobj callbacks + the iactions caller. +233 JS (local getobj clone is bulky). Playbook §2b “two modules that already call each other.” Did not glue H2O `useeit`. Acceptable.

## Branch-by-branch confirm

1. Item-action `a` on a potion: canned invlet selects that potion, then “dip into the potion of X?” **Match.**
2. No canned queue (bare `dip_into`): `impossible` / `ECMD_FAIL`. **Match `:2384–2386`.**
3. Cancel second getobj: `ECMD_CANCEL`, potion not used. **Match `:2400–2401`.**
4. Worn suit under cloak: excluded from letters; if forced, take-off message, `ECMD_OK`. **Match `:2223–2224` + `:2402–2403`.**
5. Hands `-`: `hands_obj` into `potion_dip` (can’t fit hands). **Match DOWNPLAY.**
6. Gold `$`: cannot. **Match EXCLUDE.**
7. Adjacent fountain: **not** asked (unlike `#dip`). **Match ignore-floor.**
8. Then poly/oil/sickness: existing `potion_dip`. **Match.**
9. `#altdip` typed as extcmd: JS no INTERNALCMD. **Named omit.**
10. **Public-unhit.**

## Callers / RNG ledger

C: iactions + INTERNALCMD. JS: iactions only. No dice in `dip_into`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. Dynamic `import('./apply.js')` is cycle avoidance (apply already imports potion). No fs. No FORCE.

## Verification

D-log: private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for inventory `a` on a potion. Cohort does not prove reverse getobj.

## Actionable C-wrongs

None that belong on Must-fix. The pushkeys hole is closed. Remaining named (map / Open): INTERNALCMD `#altdip`; Eyes `is_plural`; dodip `inaccessible_equipment`; getobj compactify/`ALLOWCNT` (not this ctrlflags); H2O `useeit` (next D-1501). Do not Must-fix “should have used invent.js `getobj`.” Do not Must-fix “count prefix on dip.”

Verdict: **ACCEPT-WITH-DEBT**
