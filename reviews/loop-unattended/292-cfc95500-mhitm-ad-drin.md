# Review 292 — cfc95500 — uhitm.c mhitm_ad_drin mhitm (mon→mon) (D-1330)

## Metadata
- Full / short hash: `cfc95500f8dfd539db9a0ebbc500941c50edacfb` / `cfc95500`
- Parent: `6b844816` (reviews **288–291** + cadence **#1685**). This file audits **this SHA only**. Archive **Addressed:** D-1330 `cfc95500` already has the short hash (filled by D-1331).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 02:53:24 +0200
- D-id: **D-1330**
- Stats: 14 files, +173 / −39 — `js/mhitm.js` +77; `js/eat.js` / `js/uhitm.js` / `js/mhitu.js` comments.
- Claims to close: Open `mhitm.c` AD_DRIN (named from D-1307 / review **291**). Not mhitu AD_DRIN. `reviews/loop-2026-08-15/` has no unpaid mhitm-AD_DRIN Must-fix.
- JS / map: `mhitm.js` `mhitm_ad_drin` + `mattackm` `AT_TENT` + `hitmm` tentacles + `mdamagem` AD_DRIN; `c-js-map/turns.md` + `debt.md`. mhitu AD_WRAP / gazemm / explmm / mhitm AT_HUGS / `shade_miss` still named at this SHA.
- Prior reviews this SHA claims to close: **291** named the mhitm arm after mhitu AD_DRIN; **269** / **271** named mhitm after uhitm helmet / AT_TENT melee.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_drin so a mind-flayer tentacle actually eats another monster's brain (helm/skipdrin), instead of dropping AT_TENT out of mattackm.”

C `mhitm_ad_drin` mhitm (`uhitm.c:3272–3301`) after the mhitu (monster→you) arm:

```
    } else {
        if (gn.notonhead || !has_head(pd)) {
            if (gv.vis && canspotmon(mdef))
                pline_mon(mdef, "%s doesn't seem harmed.", Monnam(mdef));
            mhm->damage = 0;
            gs.skipdrin = TRUE;
            return;
        }
        if ((mdef->misc_worn_check & W_ARMH) && rn2(8)) {
            if (gv.vis && canspotmon(magr) && canseemon(mdef))
                pline("%s helmet blocks %s attack to %s head.", …);
            return;
        }
        amu = which_armor(mdef, W_AMUL);
        lifsav = amu && amu->otyp == AMULET_OF_LIFE_SAVING;
        mhm->hitflags = eat_brains(magr, mdef, gv.vis, &mhm->damage);
        if (lifsav && !which_armor(mdef, W_AMUL))
            gs.skipdrin = TRUE;
    }
```

Caller `mdamagem` (`mhitm.c:1059`) `mhitm_adtyping` `case AD_DRIN`. `mattackm` (`:387`) skipdrin continue; (`:425`) `AT_TENT` with claw/kick/bite; `hitmm` (`:687–689`) tentacles suck. `eat_brains` mhitm (`eat.c:725–745`) already live (D-1306). No `m_slips_free` on this arm (uhitm-only).

Old JS: `mattackm` dropped `AT_TENT` into default (`strike=0`); `mdamagem` never called drain.

The diff **does** add `case AT_TENT` on the melee fallthrough, the tentacles-suck `hitmm` arm, export `mhitm_ad_drin`, and a `mdamagem` AD_DRIN block matching the POLY/DGST pattern (adtyping → knockback → leftover HP / `mdamagem_monkilled` / `grow_up`). It does **not** port mhitu AD_WRAP. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_drin` | C `:3272–3301`, **new** in `mhitm.js` | not the uhitm.js hero→mon function |
| `mattackm` `AT_TENT` | C `:425`, **wired** | was default miss |
| `mattackm` skipdrin | C `:387`, **pre-existing** | D-1298; this SHA now sets it |
| `hitmm` AT_TENT | C `:687–689`, **wired** | `s_suffix(Monnam)` tentacles suck `mon_nam_too` |
| `has_head` | C `mondata`, **imported live** | |
| `which_armor(W_AMUL)` | C `worn.c`, **imported live** | `worn.js` |
| `eat_brains(..., mhm)` | C `:3297` `&mhm->damage`, **imported live** | `add_brain_dmg` mutates `.damage` |
| `s_suffix_mm` / `mhis_disp` | C `s_suffix` / `mhis`, **clone** | hallu `mhis` is `PRONOUN_HALLU` `rn2(4)` |
| `pline_mon` headless | C `:3277–3278`, **imported live** | helm block is bare `pline` |
| gazemm / explmm / AT_HUGS / `shade_miss` | C, **named omit** | |
| mhitu AD_WRAP | C `:3376–3417`, **named omit** | next Open at this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on mhitm AD_DRIN:** helm `(misc_worn_check&W_ARMH)&&rn2(8)` only when a helm bit is set; `eat_brains` still `rnd(10)` xtra at entry (pre-existing) plus mindless skip / rider / pet `rnd(60)` nutrit. Headless returns **before** helm `rn2(8)` and **before** `eat_brains`. No helm bit: skip `rn2(8)` (C `W_ARMH &&`).

## C ↔ JS fidelity

Order is headless/`notonhead` vis `pline_mon` + zero dice + skipdrin → helm `W_ARMH&&rn2(8)` return (dice kept, no skipdrin, always `"helmet"`) → snapshot amulet → `eat_brains(gv.vis, &damage)` → lifsav skipdrin if the amulet vanished. That is C `:3276–3301` call-for-call. `_mm_vis` is C `gv.vis` (see attacker or defender). `game.notonhead` is C `gn.notonhead`. Helm/slip do **not** exist on this arm — no `m_slips_free`. Leftover AT_TENT+AD_DRIN still try after a helm block because skipdrin is unset — C comment at `:3177–3183`; `mattackm` `:387` continue only after headless or used-up life.

`mdamagem` AD_DRIN copies the DGST leftover path: knockback, `done`, `!damage` return, `mhp -=`, `mdamagem_monkilled` (gulpmm swap / troll_baned / zombify — AT_TENT skips those aatyp gates), lifesave return, `grow_up`. C `:1059–1094` after `mhitm_adtyping`. Tentacle kill is not AT_WEAP/CLAW zombify. Match for this adtyp.

`eat_brains` mhitm: mindless vis `"doesn't notice"` + `M_ATTK_MISS` (dice kept); else `*dmg_p += rnd(10)` already rolled at entry; rider `mondied` then extra anyway; last-thought pline when `*dmg_p >= mhp`. JS `add_brain_dmg(mhm, xtra)` matches `&mhm->damage`. Passing the `mhm` object is the int* stand-in, not a dropped extra.

`hitmm` tentacles: C `Snprintf` `"%s tentacles suck"` + `pline("%s %s.", buf, mon_nam_too)`. JS one template. Same string. C melee also has `unsolid && failed_grab` and wielded-vs-cockatrice instinct before `hitmm`. JS melee case still omits both. **AT_TENT+AD_DRIN does not enter `failed_grab`** (only HUGS/WRAP/STCK/DGST). Instinct needs `mwep`. Not a drain-arm C-wrong. Do not Must-fix it as “Match C eel wrap grab.”

Hallucination check: “Match C dispatch, callee is a stub” is **false** for `eat_brains` / `which_armor` / `has_head` / `pline_mon`.

## Hallucinations / overclaim

Subject + D-1330 say a mind-flayer tentacle actually eats another monster's brain (helm/skipdrin) instead of dropping AT_TENT out of `mattackm`. **The case label plus this arm plus `hitmm` tentacles plus the `mdamagem` AD_DRIN leftover are the hunk.** Stamping **Addressed:** D-1330 is fair. Do **not** stamp “Match C mhitu AD_WRAP.” Do **not** stamp “Match C gazemm / explmm / mhitm AT_HUGS.” Do **not** stamp “Match C `shade_miss`.” Do **not** treat fortress PASS as `"The orc's brain is eaten!"`.

## Density

One C arm plus the dispatch and hit-pline that arm needs (`AT_TENT`, tentacles suck). One JS module that already owns `mdamagem`. ~70 executable JS lines. mhitu WRAP correctly not glued. Right size (§2b).

## Branch-by-branch confirm

1. Headless / `notonhead`: vis `pline_mon` “doesn't seem harmed,” dice 0, skipdrin, no `rn2(8)`, no `eat_brains`. Match `:3276–3284`.
2. Helm bit + `rn2(8)` hit: literal helmet pline when vis&&spot magr&&see def; return; leftover tentacles still try. Match `:3286–3292`.
3. No W_ARMH: skip `rn2(8)`. Match C `&&`.
4. `eat_brains` vis: `_mm_vis`. Match `:3297`.
5. Mindless: MISS, leftover dice still apply. Match `eat.c:729–732` + mdamagem `!damage` only after drain zeros.
6. Headed + brains: xtra on leftover then HP. Match.
7. Lifsav amulet used up: skipdrin. Match `:3299–3301`.
8. `mattackm` later AT_TENT+AD_DRIN `continue` when skipdrin. Pre-existing `:387`.
9. mhitu AD_WRAP / gazemm. Still omitted. Named.
10. **Public-unhit** unless two monsters fight and one is a mind flayer.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./eat.js')` is an ESM cycle. Plain ESM. `misc_worn_check&W_ARMH` is C, not a recorded helm otyp.

## Verification

Journal: private canary **14**/14; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on mon→mon drain. Cadence this audit: full `sessions` at HEAD `b82375a7` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not evidence helm `rn2(8)` or `eat_brains` fired between monsters.

## Actionable C-wrongs

None for Must-fix. Headless → helm `rn2(8)` → `eat_brains` → lifsav skipdrin matches C `:3272–3301`. Callee is live. `AT_TENT` no longer falls out of `mattackm`.

Named omits (map, not Must-fix):

1. mhitu AD_WRAP (`uhitm.c:3376–3417`) — next Open at this SHA
2. gazemm / explmm / mhitm AT_HUGS / `shade_miss`
3. melee `unsolid&&failed_grab` / cockatrice instinct (pre-existing; not AD_DRIN)

Do not Must-fix “export `mhitm_ad_drin` from uhitm.js” (this SHA correctly put the mon→mon arm next to `mdamagem`). Do not Must-fix always-`"helmet"` (C does not call `helm_simple_name` here).

## Callers / RNG ledger

C: `mattackm` AT_TENT+AD_DRIN → `hitmm` → `mdamagem` → `mhitm_ad_drin` mhitm. JS: `mhitm_adtyping` equivalent is the new `mdamagem` AD_DRIN block. Public fortress is not evidence helm `rn2(8)` or brain xtra `rnd(10)`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a mind-flayer tentacle now drains another monster (headless skipdrin / helm `rn2(8)` / live `eat_brains`); mhitu AD_WRAP stays named.
- Must-fix stays empty for this SHA.
