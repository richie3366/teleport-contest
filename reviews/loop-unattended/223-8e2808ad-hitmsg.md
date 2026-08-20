# Review 223 — 8e2808ad — mhitu.c hitmsg (D-1261)

## Metadata
- Full / short hash: `8e2808ad6a3be276772385604bc5a7d75a6e1215` / `8e2808ad`
- Parent: `8729fa24` (D-1260). This file audits **this SHA only**. Archive row **Addressed:** D-1261 `8e2808ad` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 09:34:22 +0200
- D-id: **D-1261**
- Stats: 10 files, +138 / −40 — `js/mhitu.js` +67 / −13; comment `js/display.js`.
- Claims to close: Open `mhitu.c` `hitmsg` (named from D-1240 / review **202**). Not remaining uhitm `pline_mon`. `reviews/loop-2026-08-15/` has no unpaid hitmsg Must-fix.
- JS / map: `mhitu.js` `hitmsg`; `c-js-map/turns.md`. `missmu`/`wildmiss`/`mswings` stay `pline`; `mattacku` AT_TENT / `explmu` still named.
- Prior reviews this SHA claims to close: **202** named omit mhitu `hitmsg` / `missmu`.

## Intent vs deliverable

Git subject promises: “Match C mhitu.c hitmsg so monster-hit lines use pline_mon and include tentacle, explode, and thick-skinned kick wording, instead of a bare pline plus the default hits verb.”

C `hitmsg` (`mhitu.c:29–81`): `could_seduce` smile/talk/touch via `pline_mon`; else aatyp verb + `" again"` + punct. AT_TENT: `s_suffix(Monnam)` + `"tentacles suck your brain"`. AT_EXPL/BOOM: `"explodes"`. AT_KICK + `thick_skinned(youmonst.data)`: punct `"."`. Callers: `hitmu` damage arms and `explmu` when `ufound` (`:1612`). `s_suffix` (`hacklib.c:345–358`): it→its, you→your, last char `'s'` → `'`, else `'s`. `missmu` (`:84–99`) is a **sibling** that already uses `pline_mon` in C — named omit this SHA.

Old JS: `pline` + bite/kick/sting/butt/touch/hits; tentacle/explode/kick-punct omitted.

The diff **does** `pline_mon`, the three missing arms, and a local `s_suffix` that matches hacklib (not the uhitm z/x/ch/sh clone). It does **not** switch `missmu`/`wildmiss`/`mswings` or add `mattacku` `case AT_TENT` / `explmu`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hitmsg` | C `:29–81`, **rewired** | was `pline`; now exported |
| `pline_mon` | C `pline.c:137–150`, **imported live** | D-1215 |
| `s_suffix_hitmsg` | C `hacklib.c:345–358`, **clone** | matches C; not `s_suffix_poison` |
| `thick_skinned` | C `mondata.h`, **imported live** | `M1_THICK_HIDE` |
| `AT_TENT`/`AT_EXPL`/`AT_BOOM` | C `monattk.h` 16/13/14, **imported live** | from `mhitm.js` |
| `could_seduce` | C, **imported live** | D-0887 |
| `missmu` / `wildmiss` / `mswings` | C still `pline_mon`/`pline`, **named omit** | JS still `pline` |
| `mattacku` `case AT_TENT` | C `:800`, **named omit** | JS melee switch lacks it |
| `explmu` | C `:1591`, **named omit** | C calls `hitmsg` when `ufound` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in `hitmsg`. Consecutive `" again"` still uses `_indx` (D-0840 stand-in for `mattk == prev+1`).

## C ↔ JS fidelity

Pinned C (`mhitu.c:37–77`):

```
    if ((compat = could_seduce(mtmp, &gy.youmonst, mattk)) != 0
        && !mtmp->mcan && !mtmp->mspec_used) {
        pline_mon(mtmp, "%s %s you %s.", Monst_name,
              !Blind ? "smiles at" : !Deaf ? "talks to" : "touches",
              (compat == 2) ? "engagingly" : "seductively");
    } else {
        ...
        pline_mon(mtmp, "%s %s%s%s", Monst_name, verb, again, punct);
    }
```

JS Blind/Deaf ternary is De Morgan-equivalent. Seduce string has the same spaces/period. Non-seduce: `${Monst_name} ${verb}${again}${punct}` — no space before `again` or punct. AT_KICK sets `punct = '.'` before `verb = 'kicks'`. AT_TENT rewrites `Monst_name` then verb. AT_EXPL and AT_BOOM share `"explodes"`. Default `"hits"` (claw/weap). Match the **function**.

`s_suffix_hitmsg`: `toLowerCase()==='it'|'you'` keeps original case then `s`/`r`; `endsWith('s')` is case-sensitive like C `*(eos-1)=='s'` (not `'S'`). Distinct from `s_suffix_poison`. Match hacklib.

`pline_mon` is live (`set_msg_xy` then `vpline`). Accessiblemsg Off still consume-resets. This is **not** “Match C dispatch, callee is a stub.”

`mattacku` JS melee is `AT_CLAW/KICK/BITE/STNG/TUCH/BUTT` only — no `AT_TENT`. C includes tentacles in that group, then `hitmu` → `hitmsg`. The AT_TENT arm in `hitmsg` is C-faithful and **unreachable** until that case is ported (named). `explmu` does not exist in JS; AT_EXPL/BOOM arms wait on that caller (named). Thick-skinned kick **is** reachable: AT_KICK is in `mattacku` and `hitmu` already calls `hitmsg`.

## Hallucinations / overclaim

Subject + D-1261 say hit lines use `pline_mon` and include tentacle/explode/thick-skin wording instead of bare `pline` + default hits. **`pline_mon` + the three arms in `hitmsg` are the hunk.** Stamping **Addressed:** D-1261 is fair for the function. Do **not** stamp “Match C `mattacku` AT_TENT” or “Match C `explmu`” or “Match C `missmu` `pline_mon`.” The git subject reads as if tentacle/explode lines now fire in combat; they fire only if something already calls `hitmsg` with those aatyps. Kick punct does fire. Private canary exercised the function directly — admit that.

## Density

One C function plus the `s_suffix` it actually calls. ~55 JS lines. Sibling `missmu` is a named omit of another function, not a second unrelated subsystem. Right size. Did not glue nopick m-dir.

## Branch-by-branch confirm

1. Ordinary bite, `accessiblemsg` Off: `pline_mon` consume-reset, `"The jackal bites!"`. Match.
2. Same, On: prefix from mx,my. Match `pline_mon`.
3. Seduce, sighted: smiles at … seductively. Match.
4. Seduce, Blind+!Deaf: talks to. Match.
5. Seduce, Blind+Deaf: touches. Match.
6. AT_KICK vs human: `"kicks!"`. Match.
7. AT_KICK vs dragon (`thick_skinned`): `"kicks."`. Match. Live via `mattacku`.
8. AT_TENT: `"The mind flayer's tentacles suck your brain!"` **if** `hitmsg` is called. `mattacku` still skips. Named.
9. AT_EXPL/BOOM: `"explodes!"` **if** called. `explmu` named.
10. Consecutive same aatyp `_indx+1`: `" again"`. Match D-0840.
11. `missmu`: still `pline`. Named; C is `pline_mon`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Local `s_suffix` is not a seed-shaped string. Plain ESM.

## Verification

Journal: private canary **19**/19 (C arms; JS `pline_mon`; bite prefix; Off no prefix; tentacles; BOOM/EXPL; human `!`; dragon `.`; again; seduce smile; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `accessiblemsg` On or AT_TENT/EXPL/BOOM / thick-skinned kick (default Tourist human). Cadence this audit: full `sessions` at HEAD `e2aa4dbe` **44**/44 Scr **11405**/11405 RNG **100%**. Fortress does not prove tentacle/`explmu` lines.

## Actionable C-wrongs

None for Must-fix. `hitmsg` matches C branch-for-branch. Unreachable tentacle/explode arms are named caller omits, not a clone that prints `"hits!"` for those aatyps. `missmu` still `pline` is a named sibling, not a hitmsg that still uses `pline`.

Named omits (map, not Must-fix):

1. `missmu` / `wildmiss` / `mswings` `pline_mon` (`mhitu.c:93–97`)
2. `mattacku` `case AT_TENT` (`:800`)
3. `explmu` (`:1591`) including `hitmsg` when `ufound`
4. AT_HUGS in `mattacku`; remaining unported `mhitm_ad_*`

Do not Must-fix “`s_suffix_hitmsg` instead of importing a shared helper.” Do not wrap `msg_mon_movement` as `pline_mon`.

## Callers / RNG ledger

C: `hitmu` paths + `explmu`. JS: `mhitm_ad_*_u` / `hitmu` already calling `hitmsg`. No RNG in the function. Public fortress is not evidence `accessiblemsg` On fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `hitmsg` now goes through live `pline_mon` with C’s tentacle/explode/kick-punct arms; `mattacku` AT_TENT / `explmu` / `missmu` stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1261 `8e2808ad`.
