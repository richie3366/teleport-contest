# Review 470 — 7092fab7 — potion.c potion_dip lichen / acid-erode (D-1509)

## Metadata
- Full / short hash: `7092fab72a6b0f2a8745ef06ef0dcac62be7de34` / `7092fab7`
- Parent: `be542317` (D-1508). This file audits **this SHA only** (sixth of nine `js/` commits since review **464**). Archive **Addressed:** D-1509 `7092fab7`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 00:45:56 +0200
- D-id: **D-1509**
- Stats: 10 files, +123 / −28 — `js/potion.js` +38 / −5. Band 150–350.
- Claims to close: Open `potion.c` `potion_dip` lichen corpse / acid-erode (named from D-1501 / D-1498 / reviews **462** / **459**). Not worn `set_wear`. `reviews/loop-2026-08-15/` has no unpaid lichen Must-fix.
- JS / map: `potion.js` `potion_dip`; callee `trap.js` `erode_obj`. `c-js-map/turns.md` / `debt.md`.
- Prior reviews this SHA claims to close: **458**/**459**/**462** named `:2596` and `:2638`.

## Intent vs deliverable

Git subject promises: acid on a lichen corpse wrinkles or colors the edges without consuming the potion, and other acid dips corrode via `erode_obj`.

Pinned C `potion.c` `potion_dip` after mix (`:2596–2606`) then towel (`:2608`) then poison (`:2615`) then acid erode (`:2638–2643`) then oil (`:2645`). Lichen: `POT_ACID && CORPSE && corpsenm==PM_LICHEN` → `The(cxname)` `otense("turn")` + `Blind ? "wrinkled" : odiluted ? hcolor(NH_ORANGE) : hcolor(NH_RED)` around the edges; `in_use=FALSE`; `dknown` `trycall`; **no poof**. Acid: `erode_obj(obj, 0, ERODE_CORRODE, EF_GREASE) != ER_NOTHING` → `poof`. `obj.h` `ERODE_CORRODE=3` `EF_GREASE=0x1` `ER_NOTHING=0`. Callee `trap.c` `erode_obj` `:171+`.

Old JS: comments at those line numbers, then towel/poison/oil.

The diff **does** insert both `if`s in that C order. Dynamic `import('./trap.js')` `erode_obj` (potion↔trap cycle). It **does not** port `inventory_resistance_check(AD_ACID)` or `grease_protect` wear-off. Named (existing trap omit). It **does not** port worn `set_wear`. Named (next D-1510).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| lichen `if` | C `:2596–2606`, **LIVE this SHA** | |
| acid `erode_obj` `if` | C `:2638–2643`, **LIVE this SHA** | |
| `erode_obj` | C `:171+`, **LIVE** async import | D-0978 family; AD_ACID resist named omit inside |
| `trycall` / `hcolor` | C `do_name.c`, **LIVE** | imported |
| `The` / `cxname` | C `objnam.c`, **LIVE** | |
| `otense_pot` | C `otense`, **CLONE** | quan≠1 → verb; else `vtense` |
| `poof` | C potion.c, **LIVE** local | |
| `Blind()` | C `Blind` macro, **CLONE** pre-existing | potion.js:2081 |
| `grease_protect` | C, **OMIT named** | `sym` NOT FOUND; JS `erode_obj` returns `ER_GREASED` anyway |
| `inventory_resistance_check` | C AD_ACID, **OMIT named** | `sym` NOT FOUND |

`node scripts/sym.mjs erode_obj trycall hcolor The cxname otense_pot poof potion_dip grease_protect inventory_resistance_check`:

```
erode_obj        js/trap.js:3479   ASYNC — await required
trycall          js/do_name.js:849   ASYNC — await required
hcolor           js/do_name.js:246   sync
The              js/objnam.js:1300   sync
cxname           js/objnam.js:950   sync
otense_pot       NOT EXPORTED — 1 LOCAL js/potion.js:2913
poof             NOT EXPORTED — 1 LOCAL js/potion.js:3081
potion_dip       NOT EXPORTED — 1 LOCAL js/potion.js:3226
grease_protect   NOT FOUND in js/**
inventory_resistance_check NOT FOUND in js/**
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Dynamic `import('./trap.js')` is ESM, not Node `fs`.

**New gameplay RNG:** `hcolor` may `rn2_on_display_rng` under Hallu. `erode_obj` `rnl(4)` on blessed proof. Lichen Blind path has no dice. Public-unhit until `#dip` acid.

## C ↔ JS fidelity

Order. JS: mix return → lichen → towel → poison → acid erode → oil. **Match `:2596` then `:2608` then `:2615` then `:2638` then `:2645`.** Lichen `return` skips erode. **Match.**

Lichen predicate. `potion.otyp===POT_ACID && obj.otyp===CORPSE && corpsenm===PM_LICHEN`. **Match.** Newt corpse skips. **Match.**

Message. C `The(cxname)` + `otense("turn")` + edge + `" around the edges."`. JS the same via `The`/`cxname`/`otense_pot`. Quan>1 `"turn"` not `"turns"`. **Match `otense`.** Edge ternary Blind / diluted orange / else red. **Match.** `NH_RED`/`NH_ORANGE` are `'red'`/`'orange'` (`decl.h` `c_red`/`c_orange`). `hcolor` LIVE. Hallu randomizes. **Match do_name.c.**

No poof. `in_use=false`; `dknown` `trycall`; `return ECMD_TIME`. **Match.** Acid is not used up.

Acid erode. `erode_obj(obj, null, ERODE_CORRODE, EF_GREASE) !== ER_NOTHING` → `poof`. Constants 3 / 0x01 / 0 **Match `obj.h`.** C `ostr=0` → callee `cxname`; JS `null` → callee `xname`. Pre-existing `erode_obj` seam, not this `if`. `ER_GREASED` (1) and `ER_DAMAGED` (2) both poof. **Match C `!= ER_NOTHING`.** Greased: JS returns `ER_GREASED` without `grease_protect` `rn2` wear-off. D-log canary “poof no wear”. Potion side **Match**; grease RNG **named omit**.

`ER_NOTHING` (proof / not corrodeable / `!erosion_matters`): no poof, fall through to oil/unicorn. **Match.** Ring+acid → Interesting keep potion (canary).

AD_ACID invent resist. C `:221–223` `uvictim && inventory_resistance_check(AD_ACID)` → `ER_NOTHING` (no poof). JS comment deferred. Hero with acid res would corrode+poof in JS. **Named omit inside a live callee**, same pattern as oil’s brass lantern / poly gem `rnd`. Not a stub of `erode_obj`.

Callee closure (lichen arm). LIVE: `The`, `cxname`, `hcolor`, `trycall`, `Blind` clone. CLONE: `otense_pot`. STUB: none. **Arm may ship.**

Callee closure (erode arm). LIVE: `erode_obj` (partial), `poof`. OMIT named: `grease_protect` body, AD_ACID resist. STUB: none. **Arm may ship** for non-resistant, non-grease-RNG cases.

## Hallucinations / overclaim

Subject lichen wrinkles/colors without consuming the potion: **true**. Subject other acid dips corrode via `erode_obj`: **true** when the callee does not hit the named resist omit. D-log “both `if`s in C order”: **true**. Stamping **Addressed:** D-1509 for **`:2596–2606` + `:2638–2643`** is fair. Do **not** stamp “Match C `inventory_resistance_check`.” Do **not** stamp “Match C `grease_protect` wear-off.” Do **not** stamp “Match C worn `set_wear`.” Do **not** treat fortress PASS as `#dip` acid.

This is **not** “dispatch ported, callee stubbed.” `erode_obj` is exported and already corrodes.

## Density

Two adjacent `potion_dip` arms, same function. +38 JS. Playbook §2b. Did not glue `set_wear`. Acceptable.

## Branch-by-branch confirm

1. Acid + lichen corpse, seeing, undiluted → red edges, keep potion, `trycall` if `dknown`. **Match.**
2. Diluted → orange. **Match.**
3. Blind → wrinkled, no `hcolor` rng. **Match.**
4. Quan>1 `"turn"`. **Match otense.**
5. Newt corpse → not lichen; may erode or fall through. **Match.**
6. Acid + iron, `ER_DAMAGED` → poof. **Match.**
7. `ER_NOTHING` (proof / MAX / not metal) → no poof. **Match.**
8. Greased → `ER_GREASED` poof, no wear-off rng. **Potion Match; grease named.**
9. Acid-res invent. **Named omit.**
10. **Public-unhit** until `#dip` acid.

## Callers / RNG ledger

C `dodip` / `dip_into` → `potion_dip`. JS same. New dice: Hallu `hcolor`; `erode_obj` `rnl(4)`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log: private canary **17**/17 (grep, Rule #2, lichen red/orange/Blind/quan, newt skip, iron `oeroded2++` poof, MAX/proof/ring keep, greased poof, oil/sickness regressions). Green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** until `#dip` acid. Cohort is not a dip session.

## Actionable C-wrongs

None that belong on Must-fix. Both cited `if`s match C; `erode_obj` is LIVE with named inner omits.

Remaining named (map / Open, already queued worn `set_wear` as next): `grease_protect` polish rng; `inventory_resistance_check` AD_ACID; INTERNALCMD `#altdip`; `erode_obj` `ostr` `cxname` vs `xname`. Do not Must-fix “should have statically imported trap.js.” Do not Must-fix “`otense_pot` should be `objnam.js` `otense`” this iter (oil already uses it). Do not Must-fix “lichen should poof.”

Verdict: **ACCEPT-WITH-DEBT**
