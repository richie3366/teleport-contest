# Review 486 — e234a41b — makemon.c set_mimic_sym TEMPLE S_altar Align2amask (D-1525)

## Metadata
- Full / short hash: `e234a41ba358913d366c514fa5543af9d403c9f9` / `e234a41b`
- Parent: `2c688c98` (D-1524). This file audits **this SHA only** (fourth of nine `js/` commits since review **482**). Archive **Addressed:** D-1525 `e234a41b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 04:14:37 +0200
- D-id: **D-1525**
- Stats: 9 files, +129 / −43 — `js/makemon.js` +25 / −8. Band 150–350 (js/ insertions 25).
- Claims to close: Open `makemon.c` `set_mimic_sym` altar Align2amask MCORPSENM (named from D-1517 / review **478**). Not maze/shop. `reviews/loop-2026-08-15/` has no unpaid altar-mimic Must-fix.
- JS / map: `makemon.js` `set_mimic_sym`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **478** named altar Align2amask after maze `in_town`.

## Intent vs deliverable

Git subject promises: a temple mimic appears as `S_altar` and stores Align2amask (or Inhell `AM_NONE`) in `MCORPSENM`, not appear 0 with no amask.

Pinned C `makemon.c` `set_mimic_sym` `:2458–2460` TEMPLE `appear = S_altar`. After `mappearance` is written, `:2538–2546`:

```2538:2546:nethack-c/upstream/src/makemon.c
    } else if (ap_type == M_AP_FURNITURE && appear == S_altar) {
        int algn = rn2(3) - 1; /* -1 (A_Cha) or 0 (A_Neu) or +1 (A_Law) */

        newmcorpsenm(mtmp);
        MCORPSENM(mtmp) = (Inhell && rn2(3)) ? AM_NONE : Align2amask(algn);
    } else if (has_mcorpsenm(mtmp)) {
        /* don't retain stale value from a previously mimicked shape */
        MCORPSENM(mtmp) = NON_PM;
    }
```

`S_altar` is `defsym.h` PCHAR **33**. `Inhell` is `In_hell(&u.uz)` → `dungeons[dnum].flags.hellish` (`dungeon.c:1942–1945`). `Align2amask` (`align.h:50–53`): `A_LAWFUL(1)→AM_LAWFUL(4)`, else `x+2` (`-1→1` chaotic, `0→2` neutral). Callers unchanged from D-1517. Consumer `pray.c` `altarmask_at`.

Old JS: TEMPLE `appear = 0`; no altar `MCORPSENM` arm (named after D-1517).

The diff **does** set TEMPLE `appear = 33`, roll `rn2(3)-1`, then `(hellish && rn2(3)) ? AM_NONE : Align2amask`, and clear stale `mcorpsenm` to `NON_PM`. It **does not** import `minion.js` `Inhell` (minion→makemon cycle; that export is also the wrong predicate). It **does not** fill `furnsyms[]` with real `S_*` (ordinary-room furniture rolls still stubs). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| TEMPLE `appear = S_altar` | C `:2458–2460`, **LIVE this SHA** | local `33` = defsym PCHAR |
| altar `MCORPSENM` | C `:2538–2542`, **LIVE this SHA** | |
| `Align2amask` | C `align.h:50`, **LIVE** | const.js |
| Inhell / `In_hell` | C `dungeon.c:1942`, **CLONE** | hellish flag; **not** minion.js |
| stale `has_mcorpsenm` | C `:2543–2545`, **LIVE this SHA** | inlined macro |
| `newmcorpsenm` | C alloc mextra, **CLONE** | `mextra = {}` |
| door/wall `S_hcdoor` | C `:2429–2438`, **OMIT named** | still `appear = 0` |
| furnsyms real `S_*` | C `:2491–2497`, **OMIT named** | stubs; ROLL_FROM not 33 |
| `block_point` | C `:2548`, **OMIT named** | |
| `flags.made_fruit` | C `:2537`, **OMIT named** | slime-mold |

`node scripts/sym.mjs set_mimic_sym Align2amask Inhell newmcorpsenm has_mcorpsenm`:

```
set_mimic_sym    js/makemon.js:2533   sync
Align2amask      js/const.js:183   sync
Inhell           js/minion.js:71   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/fountain.js:1060  js/pray.js:151  js/teleport.js:2124
newmcorpsenm     NOT FOUND
has_mcorpsenm    NOT FOUND
```

This SHA does **not** delete a symbol. `sym` “import minion.js `Inhell`” is the cycle CURRENT forbids. C `In_hell` is **hellish**, which this SHA inlines. Do **not** write Inhell clone #4. `newmcorpsenm` / `has_mcorpsenm` are macros/alloc inlined, not re-points.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** TEMPLE (and any `appear===33`) always burns `rn2(3)`; hellish burns a second `rn2(3)` (`&&` short-circuit skips it off-hell). **Public-unhit** until a TEMPLE mimic. seed0367 still **PASS** at this SHA (bisect: break is D-1526).

## C ↔ JS fidelity

TEMPLE glyph. C `:2459–2460` `S_altar`. JS `:2583` `appear = 33`. `defsym.h:129` PCHAR 33. **Match.** Old `appear = 0` was the C-wrong this SHA deletes.

Amask. C `:2539–2542`: `algn = rn2(3)-1` **always**, then `Inhell && rn2(3)`. JS `:2645–2648` the same two calls, `inhell` from `dungeons[uz.dnum].flags.hellish`. **Match `In_hell`.** Off-hell: one `rn2(3)`, never `AM_NONE` (algn is never `A_NONE(-128)`). Hell: second `rn2(3)` truthy → `AM_NONE` (~2/3). **Match short-circuit.** `Align2amask` live: lawful 1→4; chaotic -1→1; neutral 0→2. **Match.**

Stale. C `:2543–2545` `else if (has_mcorpsenm)` → `NON_PM`. JS `:2649–2651` `mextra && (mcorpsenm ?? NON_PM) !== NON_PM`. `AM_NONE` is 0, `NON_PM` is -1, so a prior altar `AM_NONE` is still “has” and clears when the new shape is not statue/slime/altar. **Match the canary ZOO path.** Statue/figurine `rndmonnum` Plan-B still named; that arm is not this SHA.

Callee closure (TEMPLE + altar MCORPSENM). LIVE: `Align2amask`, `rn2`, `AM_NONE`. CLONE: hellish `In_hell` matched here; `mextra` alloc. OMIT named: `S_hcdoor`, furnsyms, `block_point`. STUB: none. **Arm may ship.** Not “dispatch ported, callee stubbed.”

Furnsyms stubs remain 0..5. A **non-TEMPLE** ROLL_FROM furniture mimic still cannot be `appear===33`, so it does not take this amask arm. Named. TEMPLE does not use furnsyms. **Match the claimed room type.**

## Hallucinations / overclaim

Subject temple mimic `S_altar` + Align2amask / Inhell `AM_NONE`: **true of `rt===TEMPLE`**. **False as ordinary-room furniture `S_altar`** (stubs). D-log TEMPLE furniture+33; !hellish one `rn2(3)` Cha/Neu/Law never AM_NONE; hellish ~2/3 AM_NONE; ZOO gold no altar roll; stale ZOO → NON_PM: **true of that canary**. Stamping **Addressed:** D-1525 for **`:2458–2460` + `:2538–2546`** is fair. Do **not** stamp “Match C door `S_hcdoor`.” Do **not** stamp “imported `minion.js` `Inhell`.” Do **not** stamp “Match C furnsyms real S_*.” Do **not** treat fortress PASS as a temple mimic (public-unhit). `Align2amask` is **not** a stub.

## Density

+25 JS: TEMPLE assign + the C MCORPSENM else-if that stores the amask. Playbook §2b “C is that small.” Did not glue emin. Acceptable.

## Branch-by-branch confirm

1. TEMPLE: `M_AP_FURNITURE`, appear 33. **Match.**
2. !hellish: one `rn2(3)`; amask Cha/Neu/Law; never `AM_NONE`. **Match.**
3. hellish, `rn2(3)` truthy: `AM_NONE`; second roll consumed. **Match.**
4. hellish, `rn2(3)` 0: `Align2amask(algn)`. **Match.**
5. ZOO gold: no altar `rn2`; if stale mcorpsenm, `NON_PM`. **Match.**
6. SLIME_MOLD still current_fruit; `made_fruit` named. **Match the skip.**
7. Door/wall appear 0. **Named omit.**
8. **Public-unhit** until a TEMPLE (or real-S_altar furniture) mimic.

## Callers / RNG ledger

C: `makemon` S_MIMIC, `dosdoor`, restrap, zap heal. JS the same `set_mimic_sym`. New `rn2(3)` only when `appear===S_altar`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Hellish inline is C `In_hell`, not a Rule #2 hit.

## Verification

D-log: private canary **19**/19 (C/JS grep; TEMPLE 33; !hellish one `rn2(3)`; hellish two `rn2(3)` ~2/3 `AM_NONE`; ZOO; stale NON_PM; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** until a TEMPLE mimic. This SHA’s seed0367 still PASS. Honest.

## Actionable C-wrongs

None at the claimed TEMPLE/amask. Remaining **named** (map / Open): door/wall `S_hcdoor`; furnsyms real `S_*`; `Protection_from_shape_changers`; `block_point`; slime-mold `flags.made_fruit`; DELPHI `S_fountain`; nocorpse/hatch/tin Plan-B. Do not Must-fix “import `minion.js` `Inhell`” (cycle; wrong predicate). Do not Must-fix local `S_altar = 33` — that is `defsym.h`.

Verdict: **ACCEPT-WITH-DEBT**
