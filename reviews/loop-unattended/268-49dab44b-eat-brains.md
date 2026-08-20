# Review 268 — 49dab44b — eat.c eat_brains (D-1306)

## Metadata
- Full / short hash: `49dab44b83c49cdb6c0d192eaff2e105ca5c5f40` / `49dab44b`
- Parent: `b82b15a8` (D-1305). This file audits **this SHA only**. Archive **Addressed:** D-1306 lacked the short hash; this review commit fills `49dab44b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 20:37:32 +0200
- D-id: **D-1306**
- Stats: 15 files, +281 / −42 — `js/eat.js` +187 / −~4; `js/uhitm.js` +15 / −~4.
- Claims to close: Open `eat.c` eat_brains (named from D-1298 / review **260**). Not helmet. `reviews/loop-2026-08-15/` has no unpaid tentacle Must-fix.
- JS / map: `eat.js` `eat_brains`; `uhitm.js` `mhitm_ad_drin`; `c-js-map/turns.md` + `data.md` + `debt.md`. Helmet `rn2(8)` / `m_slips_free` / lifsav skipdrin / mhitu+mhitm callers named.
- Prior reviews this SHA claims to close: **260** named headed DRIN as dice-only (`eat_brains` omit after headless skipdrin).

## Intent vs deliverable

Git subject promises: “Match C eat.c eat_brains so a poly'd mind flayer's tentacle eats the target's brain (nutrition, INT recover, extra damage), instead of applying only damageum dice.”

C `eat_brains` (`eat.c:601–754`): `xtra_dmg = rnd(10)` in the declarator **before** `DEADMONSTER(magr)`; noncorporeal miss; three attacker/defender plines; `flesh_petrifies`; hero arm `eating_conducts` / mindless miss / rider `done(DIED)` / else `morehungry(-rnd(30))` + ABASE INT recover + `exercise(A_WIS)` + `*dmg_p += xtra` then `maybe_cannibal`; mhitu INT-floor / Lifesaved / scarecrow; mhitm mindless / rider `mondied` / else extra dmg + last-thought; tame `EDOG->hungrytime += rnd(60)`. Caller `uhitm.c` `mhitm_ad_drin` uhitm (`:3185–3220`): headless return `:3202`; then `m_slips_free`; helmet `which_armor(W_ARMH) && rn2(8)`; then `eat_brains(&youmonst, mdef, TRUE, &mhm->damage)`; lifsav skipdrin after. mhitu+mhitm arms of that same function named.

Old JS: D-1298 headless skipdrin live; headed fallthrough with dice only.

The diff **does** port the whole C function and wires the headed uhitm call. It does **not** port helmet / `m_slips_free` / lifsav skipdrin / mhitu+mhitm `mhitm_ad_drin` callers (`if (magr !== youmonst) return` still). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `eat_brains` | C `:601–754`, **new** | full function, not a dispatch stub |
| uhitm headed call | C `:3216`, **wired** | after headless return |
| `rnd(10)` xtra | C `:611`, **live** | before DEADMONSTER |
| `noncorporeal` / `mindless` / `is_rider` / `flesh_petrifies` | C `mondata.h`, **imported live** | |
| `eating_conducts` | C `eat.c`, **imported live** | livelog named on that helper |
| `morehungry` | C `eat.c`, **imported live** | negative num = nutrition |
| `maybe_cannibal` | C `:756–788`, **same-file live** | static `ate_brains` ≡ `context.eat_ate_brains` |
| `make_stoned` / `done` / `exercise` / `You_feel` | C, **imported live** | |
| `monstone` / `mondied` | C `mon.c` via `mhitm.js`, **imported live** | lifesaved_monster named on `monstone` |
| `s_suffix_eat` | C `hacklib.c:345–359`, **clone** | it/you/`s`; extra `'S'` vs C last-char `'s'` |
| `hero_Lifesaved_eat` | C `Lifesaved` (`youprop.h:387` extrinsic), **clone** | then zeros E+I like C |
| `add_brain_dmg` | C `*dmg_p +=`, **adapter** | `mhm.damage`; null-safe for mhitu `(int*)0` |
| helmet / `m_slips_free` | C `:3204–3212`, **named omit** | headed always reaches eat_brains |
| lifsav skipdrin | C `:3213–3220`, **named omit** | |
| mhitu+mhitm callers | C `:3222–3301`, **named omit** | branches exist, unreachable from JS |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG (hero path):** `rnd(10)` always; `morehungry(-rnd(30))`; INT `rnd(4)` when ABASE<AMAX; `maybe_cannibal` `rn1(4,2)` on own-race; pet `rnd(60)` only on mhitu/mhitm give_nutrit (unreachable until those callers). `DEADMONSTER` still burns `rnd(10)` then returns — matches C declarator order.

## C ↔ JS fidelity

Pinned C start (`eat.c:609–631`):

```
    int result = M_ATTK_HIT, xtra_dmg = rnd(10);
    if (magr != &gy.youmonst && DEADMONSTER(magr))
        return M_ATTK_AGR_DIED;
    if (noncorporeal(pd)) { … return M_ATTK_MISS; }
    else if (magr == &gy.youmonst)
        You("eat %s brain!", s_suffix(mon_nam(mdef)));
    …
```

JS: `const xtra_dmg = rnd(10)` then `(magr?.mhp|0)<1` (`DEADMONSTER` is `mhp<1`). Noncorporeal: `Your` vs `s_suffix(Monnam)`. Hero eat line: `pline("You eat ${s_suffix(mon_nam)} brain!")` ≡ `You()`. Cube mindless: conducts then `"doesn't notice"` then `M_ATTK_MISS` **without** `maybe_cannibal` / extra dmg. Rider: killer `NO_KILLER_PREFIX`, `done(DIED)`, `exercise(A_WIS,false)`, then `*dmg_p += xtra`. Else: `morehungry(-rnd(30))`; `ABASE(A_INT) += rnd(4)` clamped to `AMAX`; `exercise(A_WIS,true)`; extra dmg; then `maybe_cannibal(monsndx(pd), TRUE)`. JS `pd.mndx ?? mdef.mnum`. `ABASE`/`AMAX` are `u.acurr.a` / `u.amax.a` (`attrib.h:21,29`).

`maybe_cannibal` matches C `:766–768`: same-turn `ate_brains` stamp **before** the race test (comment: ate_anything). `change_luck(-rn1(4,2))`. Pre-existing helper, now the C callee.

Helmet: JS headed path calls `eat_brains` immediately. C would `rn2(8)` bounce on helm and **not** skipdrin. Omitting the gate means JS eats brains (and burns `rnd(10)` / `rnd(30)` / …) when C would return after one `rn2(8)`. That is a **named caller omit**, not a clone that claims to be helmet. Do not stamp “Match C helm `rn2(8)`.”

mhitu/mhitm **bodies** in JS follow C (`Lifesaved` extrinsic-only; `ATTRMIN` via `urace.attrmin` default 3, same as `attrib.js`; mhitm last-thought when `*dmg_p >= mhp`; pet `rnd(60)` before the EDOG null check so the burn still happens). They are unreachable (`mhitm_ad_drin` returns unless `magr===youmonst`). Named callers, not a fake “Match C monster-flayer vs hero.”

`monstone` still names `lifesaved_monster`: Medusa-brain vs a life-saved flayer will not take C’s `M_ATTK_MISS` continue-eating skip. Named on that callee. `s_suffix_eat` also treats a trailing `'S'` as possessive-s; C checks `== 's'` only. Same clone looseness review **264** refused to Must-fix.

This is **not** “Match C eat_brains dispatch, callee is a stub.” `morehungry`, `eating_conducts`, `maybe_cannibal`, `make_stoned`, `done` run on the wired hero path.

## Hallucinations / overclaim

Subject + D-1306 say a poly mind flayer’s tentacle eats the brain (nutrition, INT recover, extra damage). **The function plus the headed uhitm call are the hunk.** Stamping **Addressed:** D-1306 is fair. Do **not** stamp “Match C helmet / `m_slips_free`.” Do **not** stamp “Match C mhitu `adjattrib(-rnd(2))` / `losespells`.” Do **not** stamp “Match C `monstone` life-save.” Do **not** stamp “Match C `You()` as a distinct more-owner.”

## Density

One C function plus the uhitm caller that must not run it headless. ~172 JS lines. Helmet/mhitm arms correctly not glued. Right size (§2b one function). Unreachable mhitu/mhitm bodies are the rest of that same function, not a second cluster.

## Branch-by-branch confirm

1. Dead magr, not youmonst: `rnd(10)` then `M_ATTK_AGR_DIED`. Match `:611–616`.
2. Ghost/shade: `"brain is unharmed."`, miss, no xtra applied. Match `:619–623`.
3. Headless uhitm: return before `eat_brains`. Match `:3189–3202` (D-1298).
4. Headed newt: eat pline, conducts, `morehungry(-rnd(30))`, maybe INT `rnd(4)`, WIS exercise, `mhm.damage += rnd(10)`, `maybe_cannibal`. Match `:659–691`.
5. Headed cube (mindless): conducts, `"doesn't notice"`, miss, no hunger/cannibal. Match `:664–667`.
6. Headed rider: fatal ingest, extra dmg if survived. Match `:668–676`.
7. Cockatrice flesh: `make_stoned(5,…)` then **continues** to conducts (C does not return). Match `:633–657` then `:659`.
8. Helmet worn: JS still eats. Named omit of `:3207–3211` (`rn2(8)`).
9. mhitu/mhitm `mhitm_ad_drin`: JS `return`. Named. Function bodies sit idle.
10. **Public-unhit** unless a poly mind flayer lands a headed tentacle.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./mhitm.js')` is cycle avoidance, not a stub. Plain ESM.

## Verification

Journal: private canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a poly mind flayer lands a headed tentacle. Cadence this audit: full `sessions` at this HEAD `49dab44b` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Hero `rnd(10)`-first, noncorporeal, conducts/mindless/rider/hunger/INT/`maybe_cannibal`, and the headed uhitm call match C `:601–754` / `:3189–3216`.

Named omits (map, not Must-fix):

1. `m_slips_free`; helmet `which_armor(W_ARMH) && rn2(8)`
2. lifsav skipdrin after `eat_brains`
3. mhitu + mhitm `mhitm_ad_drin` callers (INT drain / `losespells` / `drain_weapon_skill`)
4. `mattacku` AT_TENT melee; `monstone` `lifesaved_monster`

Do not Must-fix “`s_suffix_eat` also matches `'S'`.” Do not Must-fix “`add_brain_dmg` null-check.” Do not Must-fix dynamic import of `monstone`. Do not wrap `wildmiss` as `pline_mon`. Next Open is `uhitm.c` mhitm_ad_drin helmet / `m_slips_free`.

## Callers / RNG ledger

C: uhitm / mhitu / mhitm `mhitm_ad_drin`. JS: uhitm headed only. Public fortress is not evidence a poly flayer ate a brain.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: poly flayer tentacles now run C `eat_brains` (nutrition, INT recover, extra dmg); helmet bounce and monster-flayer callers stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1306 `49dab44b`.
