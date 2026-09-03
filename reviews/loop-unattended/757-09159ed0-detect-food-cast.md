# Review 757 — 09159ed0 — spell.c SPE_DETECT_FOOD seffects(pseudo) (D-1788)

## Metadata
- Full / short hash: `09159ed076e2450c16af46dbcfe00705d2f349dc` / `09159ed0`
- Parent: `01562c50` (D-1787). Claims to close review **750** QUALITY-RISK (`28f02a82` D-1781 helper live, `#cast` never called `seffects`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 22:32:48 +0200
- D-id: **D-1788**
- Stats: `js/spell.js` +25/−6. Total `js/` insertions **25** ≤250. Band **80–350**. Must-fix, one otyp.
- Claims to close: Must-fix **750** — `SPE_DETECT_FOOD` → `seffects(pseudo)` with skilled bless. Not the rest of the scroll-duplicate group.
- JS / map: `spell.js` `spelleffects`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1788 `09159ed0`.

## Intent vs deliverable

Git subject promises: Match C `spell.c` `SPE_DETECT_FOOD` so `#cast` hands a skilled-blessed pseudo to `seffects`, instead of spending energy and printing `Nothing happens`.

`node scripts/csym.mjs spelleffects` → `spell.c:1383–1603`. `seffects` `read.c:2192–2291`. `seffect_food_detection` `:2045–2052`. `--callers food_detect`: `read.c:2050` only.

```1516:1531:nethack-c/upstream/src/spell.c
    /* these are all duplicates of scroll effects */
    case SPE_REMOVE_CURSE:
    case SPE_CONFUSE_MONSTER:
    case SPE_DETECT_FOOD:
    case SPE_CAUSE_FEAR:
    case SPE_IDENTIFY:
    case SPE_CHARM_MONSTER:
        if (role_skill >= P_SKILLED)
            pseudo->blessed = 1;
        FALLTHROUGH;
    case SPE_MAGIC_MAPPING:
    case SPE_CREATE_MONSTER:
        (void) seffects(pseudo);
        break;
```

Parent: `seffects` already had `case SPE_DETECT_FOOD`. JS `spelleffects` only called `seffects` for mapping/create. The diff **does** add `SPE_DETECT_FOOD` to that arm and bless when `otyp === SPE_DETECT_FOOD && role_skill >= P_SKILLED`. Mapping/create still skip the bless. Remaining five scroll-duplicate otyps stay named. Subject is delivered for this otyp.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `spelleffects` DETECT_FOOD arm | LIVE repaired | `:1517–1531` |
| `seffects` | LIVE | dynamic import; D-1781 case |
| `seffect_food_detection` | LIVE | `read.js` local |
| `food_detect` | LIVE | D-1781 |
| `P_SKILL` / `P_SKILLED` | LIVE | `spell.js:353` still a `P_SKILL` clone (pre-existing; not this SHA) |
| `SPE_REMOVE_CURSE` … `SPE_CHARM_MONSTER` | OMIT named | same C case; still else-arm |
| `edibility_prompts` | OMIT named | |

`node scripts/sym.mjs` (no clone deleted; dispatch re-point):

```
seffects         js/read.js:1250   ASYNC — await required
seffect_food_detection NOT EXPORTED — 1 LOCAL js/read.js:1070
food_detect      js/detect.js:1642   ASYNC — await required
spelleffects     js/spell.js:1898   ASYNC — await required
P_SKILLED        js/const.js:2925   sync
P_SKILL          js/weapon.js:984   sync
             !! ALSO 2 LOCAL CLONES including js/spell.js:353 — do NOT add #3
```

`--can spell.js read.js seffects`: **IN-SCC SAFE** (hoisted function; SHA keeps the existing dynamic `import('./read.js')`, no new static edge). FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**FALLTHROUGH shape — match this otyp.** C skilled-blesses six otyps then falls into `seffects` with mapping/create (those two are **after** FALLTHROUGH, so they never take the bless). JS: bless **only** `SPE_DETECT_FOOD` when skilled, then `seffects` for food+mapping+create. **Match C for the three live otyps.** Do not bless mapping/create.

**`role_skill`.** C `:1410` `role_skill = P_SKILL(spell_skilltype(otyp))` after `mksobj` pseudo (`quan=20`, bless/cursed 0). JS `:1914–1920` the same. Threshold `P_SKILLED`. **Match.**

**Callee is not a stub.** `read.c:2252–2253` `SCR_FOOD_DETECTION` / `SPE_DETECT_FOOD` → `seffect_food_detection` → `food_detect`. JS `read.js:1306–1308` the same. `food_detect` has **no** `rn2`/`rnd`. Skilled bless is how `u.uedibility` is reached from `#cast`. Probe: unskilled underfoot smell, no tingle; skilled underfoot tingle+`uedibility`; skilled nothing-found `uedibility`; `SPE_REMOVE_CURSE` still `Nothing happens.` **Match.**

**Callee closure (DETECT_FOOD arm).** LIVE: `seffects`, `seffect_food_detection`, `food_detect`. OMIT named: five sibling `#cast` otyps; `edibility_prompts`. STUB **inside this arm**: **none**. “Dispatch ported, callee stubbed” is **false** here (it was true of D-1781). Remaining siblings are **not** in the live arm.

**`pseudo->quan = 20`.** C comment: do not let `useup` get it. Unchanged this SHA. Spell path does not restore the unimplemented food-scroll gate.

## Hallucinations / overclaim

Subject “hands a skilled-blessed pseudo to `seffects`, instead of … `Nothing happens`” is **true** for `SPE_DETECT_FOOD`. D-log does **not** claim the rest of `:1517–1522`. Do **not** stamp “Match C `SPE_IDENTIFY` `#cast`.” Do **not** stamp “Match C `edibility_prompts`.” Public-unhit (`#cast` food-detect); probed 13/13.

## Density

§2b Must-fix: one otyp into an existing arm. +25. Did **not** glue IDENTIFY/CHARM. Allowed.

## Verification

D-log: green+strict; cohort incl. seed2200 wizard; probe 13/13; `SPE_REMOVE_CURSE` still named-omit. save-oracle `spell.c:spelleffects` untagged skip. Rule #2 clean. This audit: `csym` `:1516–1531` / `read.c:2252–2253` vs HEAD `js/spell.js:2052–2064`.

## Actionable C-wrongs

None for Must-fix. Named: `SPE_REMOVE_CURSE` / `SPE_CONFUSE_MONSTER` / `SPE_CAUSE_FEAR` / `SPE_IDENTIFY` / `SPE_CHARM_MONSTER` (`:1517–1522`); `eat.c` `edibility_prompts`; `spell.js` `P_SKILL` clone. Do **not** search buried in `food_detect`. Do **not** bless `SPE_MAGIC_MAPPING` / `SPE_CREATE_MONSTER`.

Verdict: **ACCEPT-WITH-DEBT**
